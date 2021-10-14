package org.commonground.ps.backendapi.jpa.repositories;

import java.util.List;
import java.util.Optional;

import org.commonground.ps.backendapi.jpa.entities.GeoAddressEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface GeoAddressRepository extends JpaRepository<GeoAddressEntity, Long> {

  @Query(
  value = "SELECT id, "
  + "street, number, letter, postal, city, ST_X(ST_Transform(ST_SetSRID(geo, coord), coord)) as x, ST_Y(ST_Transform(ST_SetSRID(geo, coord), coord)) as y, "
  + "ST_X(ST_Transform(ST_SetSRID(geo, coord), 4326)) as latitude, ST_Y(ST_Transform(ST_SetSRID(geo, coord), 4326)) as longitude "
  + "FROM public.geo_address ORDER BY ST_Distance(ST_Transform(ST_SetSRID(geo, coord), coord), ST_Transform(ST_SetSRID(ST_Point(:#{#longitude}, :#{#latitude}), 4326), coord)) limit 1", nativeQuery = true)
  Optional<GeoAddressEntity> getAddressByLatitudeLongitude(@Param("latitude") Double latitude, @Param("longitude") Double longitude);
}
