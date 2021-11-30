package org.commonground.ps.backendapi.core;

import java.util.List;

import org.commonground.ps.backendapi.exception.NotFoundException;
import org.commonground.ps.backendapi.model.Location;

public interface LocationService {
  public Location byXY(Double x, Double y) throws NotFoundException;
  public Location byStreetAndNumber(String street, Integer number) throws NotFoundException;
  public List<Location> byStreet(String street);
}
