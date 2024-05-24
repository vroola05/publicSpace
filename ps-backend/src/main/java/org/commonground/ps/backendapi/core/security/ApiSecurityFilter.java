package org.commonground.ps.backendapi.core.security;

import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.security.web.authentication.preauth.AbstractPreAuthenticatedProcessingFilter;

public class ApiSecurityFilter extends AbstractPreAuthenticatedProcessingFilter {
  private String principalRequestHeader;

    public ApiSecurityFilter(String principalRequestHeader) {
        this.principalRequestHeader = principalRequestHeader;
    }

    @Override
    protected Object getPreAuthenticatedPrincipal(HttpServletRequest request) {
        String referer = request.getHeader("referer");
        if (referer != null) {
            try {
                URL url = URI.create(referer).toURL();
                return url.getHost() + url.getPath();
            } catch (MalformedURLException e) {
            }
        }

        return null;
    }

    @Override
    protected Object getPreAuthenticatedCredentials(HttpServletRequest request) {
        
        return request.getHeader(principalRequestHeader);
    }
}
