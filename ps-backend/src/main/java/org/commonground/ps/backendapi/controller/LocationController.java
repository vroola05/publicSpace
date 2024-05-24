package org.commonground.ps.backendapi.controller;

import java.util.List;

import org.commonground.ps.backendapi.core.LocationService;
import org.commonground.ps.backendapi.core.security.Secured;
import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.exception.NotFoundException;
import org.commonground.ps.backendapi.model.Location;
import org.commonground.ps.backendapi.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/location", produces = { "application/json; charset=utf-8" })
public class LocationController {
  
  public LocationController() {
    
  }
  @Autowired
	private LocationService locationService;

  @Secured(identifier = "getLocationByStreet")
	@GetMapping("/street/{street}")
	public List<Location> getLocationByStreet(@PathVariable String street) {   
    return locationService.byStreet(street);
  }

  @Secured(identifier = "getLocationByStreetAndNumber")
	@GetMapping("/street/{street}/number/{number}")
	public Location getLocationByStreetAndNumber(@PathVariable String street, @PathVariable String number) throws BadRequestException, NotFoundException {
    if (StringUtil.isInteger(number)) {
      return locationService.byStreetAndNumber(street, Integer.parseInt(number));
    }
    throw new BadRequestException();
  }

  @Secured(identifier = "getLocationByCoordinates")
	@GetMapping("/x/{x}/y/{y}")
	public Location getLocationByCoordinates(@PathVariable Double x, @PathVariable Double y) throws NotFoundException {
    return locationService.byXY(x, y);
  }
}
