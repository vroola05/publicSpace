package org.commonground.ps.backendapi.core.security;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.commonground.ps.backendapi.convertor.Convert;
import org.commonground.ps.backendapi.core.ConfigService;
import org.commonground.ps.backendapi.jpa.entities.SessionEntity;
import org.commonground.ps.backendapi.jpa.entities.UserEntity;
import org.commonground.ps.backendapi.jpa.repositories.SessionRepository;
import org.commonground.ps.backendapi.model.User;
import org.commonground.ps.backendapi.model.security.UserPrincipal;
import org.commonground.ps.backendapi.model.template.Template;
import org.commonground.ps.backendapi.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.data.domain.Example;
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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableAspectJAutoProxy
@EnableWebSecurity
@EnableMethodSecurity
public class ApiSecurityConfig {
  @Autowired
  private SessionRepository sessionRepository;

  @Value("${sec.header.apikey}")
  private String principalRequestHeader;

  @Value("${sec.session.time}")
  private int secSessionTime;

  @Value("${sec.allowed.origins}")
  private String secAllowedOrigins;

  @Autowired
  ConfigService configService;


  @Bean
  public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
    
    ApiSecurityFilter apiSecurityFilter = new ApiSecurityFilter(principalRequestHeader);
      apiSecurityFilter.setAuthenticationManager(new AuthenticationManager() {
        @Override
        public Authentication authenticate(Authentication authentication) throws AuthenticationException {
          try {
            String referer = (String) authentication.getPrincipal();
            String apikey = (String) authentication.getCredentials();
            if (apikey == null || apikey.isEmpty() || referer == null || referer.isEmpty()) {
              throw new SecurityException("No host or apikey: " + (String) authentication.getPrincipal());
            }

            UserEntity userEntity = getUserByApikey(apikey);

            User user = Convert.userEntity(userEntity);

            String domain = user.getDomain().getDomain();
            if (!configService.checkUserDomain(domain, (String) authentication.getPrincipal())) {
              throw new SecurityException("Wrong domain: " + (String) authentication.getPrincipal());
            }

            Template template = configService.get(domain);

            UserPrincipal userPrincipal = new UserPrincipal();
            userPrincipal.setName((String) authentication.getPrincipal());
            userPrincipal.setPrincipal(user);
            userPrincipal.setDetails(template);
            userPrincipal.setAuthorities(getAuthorities(user.getRoles()));
            userPrincipal.setAuthenticated(true);
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
                      .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
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

  private UserEntity getUserByApikey(String apikey) throws SecurityException {
    Optional<SessionEntity> session = sessionRepository.findOne(Example.of(new SessionEntity(apikey)));
    if (!session.isPresent()) {
      throw new SecurityException("No session found.");
    }

    if (session.get().getDateModified().before(DateUtil.minusMinutes(secSessionTime))) {
      sessionRepository.delete(session.get());
      sessionRepository.flush();
      throw new SecurityException("Session expired.");
    }

    if (session.get().getUsers() == null) {
      throw new SecurityException("No user found.");
    }

    SessionEntity sessionEntity = session.get();//
    sessionEntity.setDateModified(new Date());

    sessionRepository.saveAndFlush(sessionEntity);

    return sessionEntity.getUsers();
  }

  private Collection<? extends GrantedAuthority> getAuthorities(List<String> roles) {
    List<GrantedAuthority> authorities = new ArrayList<>();
    for (String role : roles) {
      authorities.add(new SimpleGrantedAuthority(role));
    }
    return authorities;
  }

}
