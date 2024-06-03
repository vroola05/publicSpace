package org.commonground.ps.backendapi.security;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import org.commonground.ps.backendapi.model.enums.DomainTypeEnum;

import java.lang.annotation.ElementType;
import java.lang.annotation.RetentionPolicy;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Secured {
  String identifier() default "";
  boolean admin() default false;
  DomainTypeEnum domainType() default DomainTypeEnum.NONE;
}
