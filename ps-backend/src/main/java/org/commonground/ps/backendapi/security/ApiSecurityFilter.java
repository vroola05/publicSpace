package org.commonground.ps.backendapi.security;

import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import org.commonground.ps.backendapi.model.security.UserPrincipal;
import org.springframework.security.web.authentication.preauth.AbstractPreAuthenticatedProcessingFilter;

public class ApiSecurityFilter extends AbstractPreAuthenticatedProcessingFilter {
  private String principalRequestHeader;

    public ApiSecurityFilter(String principalRequestHeader) {
        this.principalRequestHeader = principalRequestHeader;
    }

    @Override
    protected Object getPreAuthenticatedPrincipal(HttpServletRequest request) {
        HttpSession httpSession = request.getSession(false);
        if (httpSession == null) {
            System.out.println("Geen sessie....");
            return null;
        }
        
        System.out.println("Sessieid" + httpSession.getId());

        UserPrincipal userPrincipal = (UserPrincipal)httpSession.getAttribute("userPrincipal");
        
        if (userPrincipal == null) {
            System.out.println("Geen userPrins....");
            return null;
        }
        userPrincipal.setReferer(getReferer(request.getHeader("referer")));
        return userPrincipal;
    }

    @Override
    protected Object getPreAuthenticatedCredentials(HttpServletRequest request) {
        return request.getHeader(principalRequestHeader);
    }

    public static String getReferer(String referer) {
        if (referer == null) 
            return null;

        try {
            URL url = URI.create(referer).toURL();
            return url.getHost() + url.getPath();
        } catch (MalformedURLException e) {}

        return null;
    }
}
