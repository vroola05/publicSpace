package org.commonground.ps.backendapi.jpa.repositories;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.commonground.ps.backendapi.jpa.entities.CategoryEntity;
import org.commonground.ps.backendapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
  
  @Query("select c from CategoryEntity c where c.mainCategory.id = :#{#mainCategoryId} and c.id = :#{#id} and c.mainCategory.domain.id = :#{#domainId}")
  Optional<CategoryEntity> getCategoryById(@Param("mainCategoryId") Long mainCategoryId, @Param("id") Long id, @Param("domainId") Long domainId);

  @Query("select c from CategoryEntity c where c.id = :#{#id} and c.mainCategory.domain.id = :#{#domainId}")
  Optional<CategoryEntity> getCategoryById(@Param("id") Long id, @Param("domainId") Long domainId);

  @Query("select c from CategoryEntity c where c.mainCategory.id = :#{#mainCategoryId} and c.name = :#{#name} and c.mainCategory.domain.id = :#{#domainId}")
  Optional<CategoryEntity> getCategoryByName(@Param("mainCategoryId") Long mainCategoryId, @Param("name") String name, @Param("domainId") Long domainId);

  @Query("select c from CategoryEntity c where c.active = true and c.startDate <= :#{#now} and (c.endDate is null or c.endDate >= :#{#now}) and c.mainCategory.id = :#{#id} and c.mainCategory.domain.id = :#{#user.domain.id} order by c.name asc")
  List<CategoryEntity> getCategories(@Param("id") Long id, @Param("now") Date now, @Param("user") User user);

  @Query("select c from CategoryEntity c where c.active = true and c.startDate <= :#{#now} and (c.endDate is null or c.endDate >= :#{#now}) and c.mainCategory.domain.id = :#{#domainId} order by c.name asc")
  List<CategoryEntity> getCategoriesByDomainId(@Param("domainId") Long domainId, @Param("now") Date now);

  @Query("select c from CategoryEntity c where c.mainCategory.id = :#{#id} and c.mainCategory.domain.id = :#{#user.domain.id} order by c.startDate asc, c.name asc")
  List<CategoryEntity> getCategoriesAll(@Param("id") Long id, @Param("user") User user);

  @Query("select c from CategoryEntity c where c.active = true and c.id = :#{#id} and c.mainCategory.domain.id = :#{#user.domain.id}")
  Optional<CategoryEntity> getCategory(@Param("id") Long id, @Param("user") User user);
}
