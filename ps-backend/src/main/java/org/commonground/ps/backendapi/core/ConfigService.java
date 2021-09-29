package org.commonground.ps.backendapi.core;

import org.commonground.ps.backendapi.model.template.Template;

public interface ConfigService {
  public Template get(String domain) throws SecurityException;
  public void update(String domain) throws SecurityException;
  public static boolean isValidDomain(String domain) {
    return domain.matches("^([a-z0-9\\-]+)(\\.[a-z0-9\\-]+)*(/[a-z0-9\\-]+)*$");
  }
  public boolean checkUserDomain(String domain, String referer);
}
