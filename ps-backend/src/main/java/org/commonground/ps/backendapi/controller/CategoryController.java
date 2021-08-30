package org.commonground.ps.backendapi.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.commonground.ps.backendapi.convertor.Convert;
import org.commonground.ps.backendapi.core.security.Secured;
import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.exception.handler.FieldValue;
import org.commonground.ps.backendapi.jpa.entities.CategoryEntity;
import org.commonground.ps.backendapi.jpa.entities.CompanyEntity;
import org.commonground.ps.backendapi.jpa.entities.MainCategoryEntity;
import org.commonground.ps.backendapi.jpa.repositories.CategoryRepository;
import org.commonground.ps.backendapi.jpa.repositories.CompanyRepository;
import org.commonground.ps.backendapi.jpa.repositories.MainCategoryRepository;
import org.commonground.ps.backendapi.model.Category;
import org.commonground.ps.backendapi.model.MainCategory;
import org.commonground.ps.backendapi.model.User;
import org.commonground.ps.backendapi.validators.PostCategoryValidator;
import org.commonground.ps.backendapi.validators.PostMainCategoryValidator;
import org.commonground.ps.backendapi.validators.PutCategoryValidator;
import org.commonground.ps.backendapi.validators.PutMainCategoryValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping(value = "/company/{companyId}/maincategory", produces = { "application/json; charset=utf-8" })
public class CategoryController extends Controller {

  @Autowired
  private MainCategoryRepository mainCategoryRepository;

  @Autowired
  private CategoryRepository categoryRepository;

  @Autowired
  private CompanyRepository companyRepository;

  @Secured(identifier = "getMainCategories")
  @GetMapping()
  public List<MainCategory> getMainCategories(
    @PathVariable @NotNull(message = "Waarde is verplicht") Long companyId
  ) {

    isValid(companyId);

    List<MainCategory> mainCategories = new ArrayList<MainCategory>();

    List<MainCategoryEntity> mainCategoryEntities = mainCategoryRepository.getMainCategories(companyId);

    mainCategoryEntities.forEach(mainCategoryEntity -> {
      mainCategories.add(Convert.mainCategoryEntity(mainCategoryEntity));
    });

    return mainCategories;
  }

  @Secured(identifier = "postMainCategory")
  @PostMapping(consumes = "application/json")
  public MainCategory postMainCategory(
    @PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
    @Valid @PostMainCategoryValidator @RequestBody MainCategory mainCategory) throws BadRequestException {

    isValid(companyId);
    validateMainCategoryByName(mainCategory.getName(), companyId);

    Optional<CompanyEntity> companyEntity = companyRepository.findById(companyId);
    if (companyEntity.isPresent()) {
      MainCategoryEntity mainCategoryEntity = Convert.mainCategory(mainCategory);
      mainCategoryEntity.setCompany(companyEntity.get());
      return Convert.mainCategoryEntity(mainCategoryRepository.saveAndFlush(mainCategoryEntity));
    }
    throw new BadRequestException();
  }

  @Secured(identifier = "putMainCategory")
  @PutMapping(value = "/{mainCategoryId}", consumes = "application/json")
  public MainCategory putMainCategory(
    @PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
    @PathVariable @NotNull(message = "Waarde is verplicht") Long mainCategoryId,
    @Valid @PutMainCategoryValidator @RequestBody MainCategory mainCategory) throws BadRequestException {
    isValid(companyId);
    validateMainCategoryByName(mainCategory.getName(), companyId);

    if (mainCategoryId == mainCategory.getId()) {
      Optional<MainCategoryEntity> mainCategoryEntity = mainCategoryRepository.getMainCategoryById(mainCategoryId, companyId);
      if (mainCategoryEntity.isPresent()) {
        mainCategoryEntity.get().setName(mainCategory.getName());
        return Convert.mainCategoryEntity(mainCategoryRepository.save(mainCategoryEntity.get()));
      }
    }

    throw new BadRequestException();
  }

  @Secured(identifier = "getCategories")
  @GetMapping(value = "/{mainCategoryId}/category", produces = "application/json")
  public List<Category> getCategories(
    @PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
    @PathVariable @NotNull(message = "Waarde is verplicht") Long mainCategoryId) {
    List<Category> categories = new ArrayList<Category>();

    User user = getUser();
    List<CategoryEntity> categoryEntities = categoryRepository.getCategories(mainCategoryId, new Date(), user);

    categoryEntities.forEach(categoryEntity -> {
      categories.add(Convert.categoryEntity(categoryEntity));
    });

    return categories;
  }

  @Secured(identifier = "getCategoriesFull")
  @GetMapping(value = "/{mainCategoryId}/category/full", produces = "application/json")
  public List<Category> getCategoriesFull(
    @PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
    @PathVariable @NotNull(message = "Waarde is verplicht") Long mainCategoryId) {
    List<Category> categories = new ArrayList<Category>();

    User user = getUser();
    List<CategoryEntity> categoryEntities = categoryRepository.getCategoriesAll(mainCategoryId, user);

    categoryEntities.forEach(categoryEntity -> {
      Category category = new Category();
      category.setId(categoryEntity.getId());
      category.setName(categoryEntity.getName());
      category.setStartDate(categoryEntity.getStartDate());
      category.setEndDate(categoryEntity.getEndDate());
      category.setActive(categoryEntity.getActive());
      categories.add(category);
    });

    return categories;
  }

  @Secured(identifier = "postCategory")
  @PostMapping(value = "/{mainCategoryId}/category", consumes = "application/json")
  public Category postCategory(
    @PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
    @PathVariable @NotNull(message = "Waarde is verplicht") Long mainCategoryId,
    @Valid @PostCategoryValidator @RequestBody Category category) throws BadRequestException {

    isValid(companyId);
    validateCategoryByName(category.getName(), companyId, mainCategoryId, null);

    Optional<MainCategoryEntity> mainCategoryEntity = mainCategoryRepository.getMainCategoryById(mainCategoryId, companyId);
    if (mainCategoryEntity.isPresent()) {
      CategoryEntity categoryEntity = Convert.category(category);
      categoryEntity.setMainCategory(mainCategoryEntity.get());
      return Convert.categoryEntity(categoryRepository.saveAndFlush(categoryEntity));
    }
    throw new BadRequestException();
  }

  @Secured(identifier = "putCategory")
  @PutMapping(value = "/{mainCategoryId}/category/{categoryId}", consumes = "application/json")
  public Category putCategory(
    @PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
    @PathVariable @NotNull(message = "Waarde is verplicht") Long mainCategoryId,
    @PathVariable @NotNull(message = "Waarde is verplicht") Long categoryId,
    @Valid @PutCategoryValidator @RequestBody Category category) throws BadRequestException {

    isValid(companyId);
    validateCategoryByName(category.getName(), companyId, mainCategoryId, categoryId);

    if (categoryId == category.getId()) {
      Optional<CategoryEntity> optionalCategoryEntity = categoryRepository.getCategoryById(mainCategoryId, categoryId, companyId);
      if (optionalCategoryEntity.isPresent()) {
        CategoryEntity categoryEntity = optionalCategoryEntity.get();
        categoryEntity.setStartDate(category.getStartDate());
        categoryEntity.setEndDate(category.getEndDate());
        categoryEntity.setActive(category.getActive());
        categoryEntity.setName(category.getName());
        categoryRepository.saveAndFlush(categoryEntity);
         
        return category;
      }
    }

    throw new BadRequestException();
  }

  private void validateMainCategoryByName(String name, Long companyId) throws BadRequestException {
    if (mainCategoryRepository.getMainCategoryByName(name, companyId).isPresent()) {
      BadRequestException badRequestException = new BadRequestException();
      badRequestException.addError(new FieldValue("name", "Waarde is niet uniek"));
      throw badRequestException;
    }
  }

  private void validateCategoryByName(String name, Long companyId, Long mainCategoryId, Long categoryId) throws BadRequestException {
    Optional<CategoryEntity> categoryEntity = categoryRepository.getCategoryByName(mainCategoryId, name, companyId);
    if (categoryEntity.isPresent() && (categoryId == null || categoryId != categoryEntity.get().getId())) {
      BadRequestException badRequestException = new BadRequestException();
      badRequestException.addError(new FieldValue("name", "Waarde is niet uniek"));
      throw badRequestException;
    }
  }
}
