package org.commonground.ps.backendapi.core;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.commonground.ps.backendapi.jpa.entities.GeoAddressEntity;
import org.commonground.ps.backendapi.jpa.repositories.GeoAddressRepository;
import org.commonground.ps.backendapi.model.Location;
import org.commonground.ps.backendapi.util.geocoding.Geo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Point;
import org.springframework.stereotype.Service;

@Service
public class LocationServiceDatabase implements LocationService {

	@Autowired
	private GeoAddressRepository geoAddressRepository;

	@Override
	public Location byXY(Double x, Double y) {
		Location location = new Location();
		Optional<GeoAddressEntity> geoAddressEntityOptional = geoAddressRepository.getAddressByLatitudeLongitude(x, y);
		if (geoAddressEntityOptional.isPresent()) {
			GeoAddressEntity geoAddressEntity = geoAddressEntityOptional.get();
			location.setStreet(geoAddressEntity.getStreet());
			location.setNumber(geoAddressEntity.getNumber());
			location.setLetter(geoAddressEntity.getLetter());
			location.setPostal(geoAddressEntity.getPostal());
			location.setCity(geoAddressEntity.getCity());
			if (geoAddressEntity.getGeo() != null && geoAddressEntity.getGeo().getCoordinate() != null) {
				location.setX(geoAddressEntity.getGeo().getCoordinate().x);
				location.setY(geoAddressEntity.getGeo().getCoordinate().y);
			}
		}
		return location;
	}

	@Override
	public List<Location> byStreet(String street) {
		ArrayList<Location> locations = new ArrayList<>();
		/*List<String> geoAddressEntities = geoAddressRepository.searchStreet(street);
		for(String geoAddressEntity : geoAddressEntities) {
			Location location = new Location();
			location.setStreet(geoAddressEntity.getStreet());
			locations.add(location);
		}*/
		return locations;
	}
}
