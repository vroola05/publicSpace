package org.commonground.ps.backendapi.core;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.commonground.ps.backendapi.convertor.Convert;
import org.commonground.ps.backendapi.exception.NotFoundException;
import org.commonground.ps.backendapi.jpa.entities.GeoAddressEntity;
import org.commonground.ps.backendapi.jpa.repositories.GeoAddressRepository;
import org.commonground.ps.backendapi.model.Location;
import org.springframework.stereotype.Service;

@Service
public class LocationServiceDatabase implements LocationService {

	private final GeoAddressRepository geoAddressRepository;

	public LocationServiceDatabase(GeoAddressRepository geoAddressRepository) {
		this.geoAddressRepository = geoAddressRepository;

	}

	@Override
	public Location byXY(Double x, Double y) throws NotFoundException {
		Optional<GeoAddressEntity> geoAddressEntityOptional = geoAddressRepository.getAddressByLatitudeLongitude(x, y);
		if (geoAddressEntityOptional.isPresent()) {
			return Convert.toLocation(geoAddressEntityOptional.get());
		}
		throw new NotFoundException();
	}

	@Override
	public Location byStreetAndNumber(String street, Integer number) throws NotFoundException {
		Optional<GeoAddressEntity> geoAddressEntityOptional = geoAddressRepository.getAddressStreetAndNumber(street, number);
		if (geoAddressEntityOptional.isPresent()) {
			return Convert.toLocation(geoAddressEntityOptional.get());
		}
		throw new NotFoundException();
	}
	
	@Override
	public List<Location> byStreet(String street) {
		ArrayList<Location> locations = new ArrayList<>();
		List<GeoAddressEntity> geoAddressEntities = geoAddressRepository.searchStreet(street);
		for(GeoAddressEntity geoAddressEntity : geoAddressEntities) {
			Location location = new Location();
			location.setStreet(geoAddressEntity.getStreet());
			locations.add(location);
		}
		return locations;
	}
}
