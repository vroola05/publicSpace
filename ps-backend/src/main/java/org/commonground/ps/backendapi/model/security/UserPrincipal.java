package org.commonground.ps.backendapi.model.security;

import java.util.Collection;

import org.commonground.ps.backendapi.model.User;
import org.commonground.ps.backendapi.model.template.Template;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

public class UserPrincipal implements Authentication {
  private static final long serialVersionUID = 1L;

  private boolean isAuthenticated = false;
  private String name;
  private User user;
  private Template template;
  private Collection<? extends GrantedAuthority> grantedAuthority;

  public void setName(String name) {
    this.name = name;
  }

  @Override
  public String getName() {
    return this.name;
  }

  public void setAuthorities(Collection<? extends GrantedAuthority> grantedAuthority) {
    this.grantedAuthority = grantedAuthority;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return this.grantedAuthority;
  }

  @Override
  public Object getCredentials() {
    // TODO Auto-generated method stub
    return null;
  }

  public void setDetails(Template template) {
    this.template = template;
  }

  @Override
  public Object getDetails() {
    return this.template;
  }

  public void setPrincipal(User user) {
    this.user = user;
  }

  @Override
  public User getPrincipal() {
    return this.user;
  }

  @Override
  public boolean isAuthenticated() {
    return this.isAuthenticated;
  }

  @Override
  public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {
    this.isAuthenticated = isAuthenticated;

  }
  
}
