package org.commonground.ps.backendapi.core.security;

import java.net.MalformedURLException;
import java.net.URL;

import javax.servlet.http.HttpServletRequest;

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
                URL url = new URL(referer);
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
