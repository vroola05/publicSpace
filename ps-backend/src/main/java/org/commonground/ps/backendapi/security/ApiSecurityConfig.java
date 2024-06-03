package org.commonground.ps.backendapi.security;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import org.commonground.ps.backendapi.convertor.Convert;
import org.commonground.ps.backendapi.core.ConfigService;
import org.commonground.ps.backendapi.jpa.entities.UserEntity;
import org.commonground.ps.backendapi.model.User;
import org.commonground.ps.backendapi.model.UserSession;
import org.commonground.ps.backendapi.model.security.UserPrincipal;
import org.commonground.ps.backendapi.model.template.Template;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableAspectJAutoProxy
@EnableWebSecurity
@EnableMethodSecurity
@EnableRedisHttpSession
public class ApiSecurityConfig {

  @Value("${sec.header.apikey}")
  private String principalRequestHeader;

  @Value("${sec.session.time}")
  private int secSessionTime;

  @Value("${sec.allowed.origins}")
  private String secAllowedOrigins;

  @Autowired
  ConfigService configService;


  @Bean
	public LettuceConnectionFactory connectionFactory() {
		return new LettuceConnectionFactory(); 
	}


  @Bean
  public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {

    ApiSecurityFilter apiSecurityFilter = new ApiSecurityFilter(principalRequestHeader);
      apiSecurityFilter.setAuthenticationManager(new AuthenticationManager() {
        @Override
        public Authentication authenticate(Authentication authentication) throws AuthenticationException {
          try {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            if (userPrincipal == null) {
              throw new SecurityException("No session");
            }

            String apikey = (String) authentication.getCredentials();
            if (apikey == null || apikey.isEmpty() || userPrincipal.getReferer() == null || userPrincipal.getReferer().isEmpty()) {
              throw new SecurityException("No host or apikey: " + (String) authentication.getPrincipal());
            }

            if (!apikey.equals(userPrincipal.getApikey())) {
              throw new SecurityException("Invalid session");
            }

            User user = userPrincipal.getPrincipal();

            String domain = user.getDomain().getDomain();
            if (!configService.checkUserDomain(domain, userPrincipal.getReferer())) {
              throw new SecurityException("Wrong domain: " + userPrincipal.getReferer());
            }

            Template template = configService.get(domain);
            userPrincipal.setDetails(template);

            return userPrincipal;
          } catch (SecurityException e) {
            throw new BadCredentialsException("The API key was not found or not the expected value.");
          }
        }
      });

      return httpSecurity
              .csrf(csrf -> csrf.disable())
              .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                      .authorizeHttpRequests(requests -> requests.requestMatchers("/config").permitAll())
                      .authorizeHttpRequests(requests -> requests.requestMatchers("/login/**").permitAll())
                      .authorizeHttpRequests(requests -> requests.requestMatchers("/**").authenticated())
                      .sessionManagement(httpSecuritySessionManagementConfigurer -> 
                          httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.NEVER))
                      .addFilter(apiSecurityFilter)
                      .build();
  }

  private CorsConfigurationSource corsConfigurationSource() {
    final var configuration = new CorsConfiguration();
        String[] allowedOrigins = secAllowedOrigins.split(",");
        if (allowedOrigins != null && allowedOrigins.length > 0) {
          configuration.setAllowedOrigins(Arrays.asList(allowedOrigins));
        }

        configuration.setAllowedMethods(Arrays.asList("OPTIONS", "HEAD", "GET", "PUT", "POST", "DELETE", "PATCH"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("*"));
        
        final var source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
  }


  

}
