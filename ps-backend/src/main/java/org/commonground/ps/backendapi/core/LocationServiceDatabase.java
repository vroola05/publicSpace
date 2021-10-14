package org.commonground.ps.backendapi.core;

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
	public Location byLatLong(Double latitude, Double longitude) {
		System.out.println("Bladibla: " + latitude +" - "+ longitude);
		Location location = new Location();
		Optional<GeoAddressEntity> geoAddressEntityOptional = geoAddressRepository.getAddressByLatitudeLongitude(latitude, longitude);
		if (geoAddressEntityOptional.isPresent()) {
			GeoAddressEntity geoAddressEntity = geoAddressEntityOptional.get();
			location.setStreet(geoAddressEntity.getStreet());
			location.setNumber(geoAddressEntity.getNumber());
			location.setLetter(geoAddressEntity.getLetter());
			location.setPostal(geoAddressEntity.getPostal());
			location.setCity(geoAddressEntity.getCity());
			location.setLatitude(geoAddressEntity.getLatitude());
			location.setLongitude(geoAddressEntity.getLongitude());

			//Point point = geoAddressEntity.getLocation();
			//double[] latLon = Geo.toLatLong(point.getX(), point.getY());
			//location.setLatitude(latLon[0]);
			//location.setLongitude(latLon[1]);
		}
		return location;
	}

}
