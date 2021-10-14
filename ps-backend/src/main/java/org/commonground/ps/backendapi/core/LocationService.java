package org.commonground.ps.backendapi.core;

import org.commonground.ps.backendapi.model.Location;

public interface LocationService {
  public Location byLatLong(Double latitude, Double longitude);
}
