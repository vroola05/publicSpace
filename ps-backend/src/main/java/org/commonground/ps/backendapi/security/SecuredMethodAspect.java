package org.commonground.ps.backendapi.security;

import java.lang.reflect.Method;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.commonground.ps.backendapi.exception.ForbiddenException;
import org.commonground.ps.backendapi.model.enums.DomainTypeEnum;
import org.commonground.ps.backendapi.model.security.UserPrincipal;
import org.commonground.ps.backendapi.model.template.Template;
import org.commonground.ps.backendapi.model.template.EndpointT;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class SecuredMethodAspect {

  @Around("@annotation(org.commonground.ps.backendapi.core.security.Secured)")
	public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
    Secured secured = getAnnotation(joinPoint);
    boolean admin = secured.admin();
    String identifier = secured.identifier();
    DomainTypeEnum domainType = secured.domainType();

    UserPrincipal userPrincipal = getPricipal();
    if (admin) {
      if (userPrincipal.getPrincipal().isAdmin()) {
        return joinPoint.proceed();
      } else throw new ForbiddenException();
    } else {
      if (userPrincipal.getPrincipal().isAdmin()) {
        return joinPoint.proceed();
      }
    }
    
    if (
      domainType != DomainTypeEnum.NONE 
      && userPrincipal.getPrincipal() != null
      && userPrincipal.getPrincipal().getDomain() != null && domainType.id != userPrincipal.getPrincipal().getDomain().getDomainType().getId()) {
      throw new ForbiddenException();
    }

    Template template = (Template)userPrincipal.getDetails();
    HashMap<String, EndpointT> endpointsT = template.getEndpoints();
    if (endpointsT.containsKey(identifier)) {
      EndpointT endpointT = endpointsT.get(identifier);

      if (checkRoles(userPrincipal.getAuthorities(), endpointT.getRoles())) {
        return joinPoint.proceed();
      }
    }
    throw new ForbiddenException();
  }

  public boolean checkRoles(Collection<? extends GrantedAuthority> roles, List<String> granted) {
    if (roles != null && granted != null) {
      return roles.stream().anyMatch(element -> granted.contains(element.getAuthority()));
    }
    return false;
  }

  private Secured getAnnotation(ProceedingJoinPoint joinPoint) {
    MethodSignature signature = (MethodSignature) joinPoint.getSignature();
    Method method = signature.getMethod();
    return method.getAnnotation(Secured.class);
  }

  private UserPrincipal getPricipal() {
    return (UserPrincipal)SecurityContextHolder.getContext().getAuthentication();
  }
}
