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

  @Query(value = "select row_number() OVER () id, sl.street, '' as type, true as active, '2000-01-01' as start_date, '2000-01-01' as end_date, '' as government, '' as district, '' as number, '' as letter, '' as addition, '' as postal, '' as city, 0 as srid, null as geo from (select distinct(street) as street from geo_address) sl order by SIMILARITY(lower(sl.street), lower(:#{#street})) desc limit 5", nativeQuery = true)
  List<GeoAddressEntity> searchStreet(@Param("street") String street);
}
