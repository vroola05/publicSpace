package org.commonground.ps.backendapi.controller;

import java.util.ArrayList;
import java.util.List;

import org.commonground.ps.backendapi.core.LocationService;
import org.commonground.ps.backendapi.core.security.Secured;
import org.commonground.ps.backendapi.model.Location;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/location", produces = { "application/json; charset=utf-8" })
public class LocationController {
  
  
  @Autowired
	private LocationService locationService;

  @Secured(identifier = "getLocationByStreet")
	@GetMapping("/street/{street}")
	public List<Location> getLocationByStreet(@PathVariable String street) {
    ArrayList<Location> locations = new ArrayList<Location>();
    
    Location location = new Location();
    location.setStreet("Stationstraat");
    location.setCity("Jeruzalem");
    locations.add(location);
    
    return locationService.byStreet(street);
  }

  @Secured(identifier = "getLocationByStreetAndNumber")
	@GetMapping("/street/{street}/number/{number}")
	public Location getLocationByStreetAndNumber(@PathVariable String street, @PathVariable String number) {
    Location location = new Location();
    location.setStreet("Stationstraat");
    location.setNumber("1");
    location.setPostal("1234AA");
    location.setCity("Jeruzalem");
    location.setX(31.772386);
    location.setY(35.203788);

    return location;
  }

  @Secured(identifier = "getLocationByCoordinates")
	@GetMapping("/x/{x}/y/{y}")
	public Location getLocationByCoordinates(@PathVariable Double x, @PathVariable Double y) {
    return locationService.byXY(x, y);
  }
}
