package org.commonground.ps.backendapi.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import org.commonground.ps.backendapi.convertor.Convert;
import org.commonground.ps.backendapi.core.security.Secured;
import org.commonground.ps.backendapi.jpa.entities.CompanyEntity;
import org.commonground.ps.backendapi.jpa.repositories.CompanyRepository;
import org.commonground.ps.backendapi.model.Company;
import org.commonground.ps.backendapi.validators.PostCompanyValidator;
import org.commonground.ps.backendapi.validators.PutCompanyValidator;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
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
@RequestMapping(value = "/company", produces = { "application/json; charset=utf-8" })
public class CompanyController extends Controller {

	private final CompanyRepository companyRepository;

	public CompanyController(CompanyRepository companyRepository) {
		this.companyRepository = companyRepository;

	}

	@Secured(admin = true)
	@GetMapping()
	public List<Company> getCompany() {
		List<Company> companies = new ArrayList<>();
		List<CompanyEntity> companyEntities = companyRepository.findAll();
		companyEntities.forEach(companyEntity -> companies.add(Convert.companyEntity(companyEntity)));

		return companies;
	}

	@Secured(admin = true)
	@PostMapping(consumes = "application/json", produces = "application/json")
	public Company postCompany(@Valid @PostCompanyValidator @RequestBody Company company) {
		return Convert.companyEntity(companyRepository.saveAndFlush(Convert.company(company)));
	}

	@Secured(admin = true)
	@PutMapping(value = "/{id}", consumes = "application/json", produces = "application/json")
	public Company putCompany(@PathVariable @NotNull(message = "Waarde is verplicht") Long id,
			@Valid @PutCompanyValidator @RequestBody Company company) {

		Optional<CompanyEntity> optionalCompanyEntity = companyRepository.findById(id);
		if (optionalCompanyEntity.isPresent() && company.getId().equals(id)) {
			CompanyEntity companyEntity = optionalCompanyEntity.get();
			companyEntity.setName(company.getName());
			companyEntity.setSrid(company.getSrid());

			GeometryFactory geometryFactory = new GeometryFactory();
			Coordinate coordinate = new Coordinate();

			coordinate.x = company.getX();
			coordinate.y = company.getY();
			Point point = geometryFactory.createPoint(coordinate);
			point.setSRID(company.getSrid());
			companyEntity.setCenter(point);
			return Convert.companyEntity(companyRepository.save(companyEntity));
		}

		return null;
	}
}
