package org.commonground.ps.backendapi.jpa.repositories;

import java.util.List;
import java.util.Optional;

import org.commonground.ps.backendapi.jpa.entities.GeoAddressEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface GeoAddressRepository extends JpaRepository<GeoAddressEntity, Long> {
  @Query(value = "SELECT * FROM public.geo_address ORDER BY ST_Distance(ST_SetSRID(geo, srid), ST_SetSRID(ST_Point(:#{#x}, :#{#y}), srid)) limit 1", nativeQuery = true)
  Optional<GeoAddressEntity> getAddressByLatitudeLongitude(@Param("x") Double x, @Param("y") Double y);

  //@Query(value = "select sl.street from (select distinct(street) as street from geo_address) sl where levenshtein(lower(sl.street), lower(:#{#street})) <= 3", nativeQuery = true)
  //List<GeoAddressEntity> searchStreet(@Param("street") String street);
}
