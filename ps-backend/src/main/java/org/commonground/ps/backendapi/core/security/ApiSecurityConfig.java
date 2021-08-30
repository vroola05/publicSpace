package org.commonground.ps.backendapi.core.security;

import java.util.ArrayList;
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
import org.commonground.ps.backendapi.model.template.DomainT;
import org.commonground.ps.backendapi.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.data.domain.Example;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

@Configuration
@EnableAspectJAutoProxy
@EnableWebSecurity
public class ApiSecurityConfig extends WebSecurityConfigurerAdapter {
  @Autowired
  private SessionRepository sessionRepository;

  @Value("${sec.header.apikey}")
  private String principalRequestHeader;

  @Value("${sec.session.time}")
  private int secSessionTime;

  @Autowired
  ConfigService configService;

  @Override
  protected void configure(HttpSecurity httpSecurity) throws Exception {
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

          DomainT domainT = configService.get(domain);

          UserPrincipal userPrincipal = new UserPrincipal();
          userPrincipal.setName((String) authentication.getPrincipal());
          userPrincipal.setPrincipal(user);
          userPrincipal.setDetails(domainT);
          userPrincipal.setAuthorities(getAuthorities(user.getRoles()));
          userPrincipal.setAuthenticated(true);
          return userPrincipal;
        } catch (SecurityException e) {
          throw new BadCredentialsException("The API key was not found or not the expected value.");
        }
      }
    });

    httpSecurity.authorizeRequests().antMatchers("/config").permitAll().antMatchers("/login/**").permitAll().and()
        .antMatcher("/**").csrf().disable().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and().addFilter(apiSecurityFilter).authorizeRequests().anyRequest().authenticated();
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
