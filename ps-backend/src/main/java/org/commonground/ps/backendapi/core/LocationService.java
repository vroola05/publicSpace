package org.commonground.ps.backendapi.core;

import java.util.List;

import org.commonground.ps.backendapi.model.Location;

public interface LocationService {
  public Location byXY(Double x, Double y);
  public List<Location> byStreet(String street);
}
