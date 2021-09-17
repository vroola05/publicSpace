package org.commonground.ps.backendapi.core;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.commonground.ps.backendapi.convertor.Convert;
import org.commonground.ps.backendapi.jpa.entities.ActionTypeEntity;
import org.commonground.ps.backendapi.jpa.entities.PageButtonEntity;
import org.commonground.ps.backendapi.jpa.entities.PageButtonRolesEntity;
import org.commonground.ps.backendapi.jpa.entities.PageButtonTypeEntity;
import org.commonground.ps.backendapi.jpa.entities.PageEntity;
import org.commonground.ps.backendapi.jpa.repositories.ActionTypeRepository;
import org.commonground.ps.backendapi.jpa.repositories.PageButtonTypeRepository;
import org.commonground.ps.backendapi.jpa.repositories.PageRepository;
import org.commonground.ps.backendapi.model.Page;
import org.commonground.ps.backendapi.model.PageButton;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PageButtonServiceImpl implements PageButtonService {

	@Autowired
	private PageRepository pageRepository;

	@Autowired
	private PageButtonTypeRepository pageButtonTypeRepository;

	@Autowired
	private ActionTypeRepository actionTypeRepository;

	public void updatePageButtons(String location, PageEntity pageEntity, List<PageButton> pageButtons) {
		List<PageButtonTypeEntity> pageButtonTypeEntities = pageButtonTypeRepository.findAllByOrderByNameAsc();
		List<ActionTypeEntity> actionTypeEntities = actionTypeRepository.findAll();
		long i = 0;
		for (PageButton pageButton : pageButtons) {
			if (pageButton.getId() != null) {
				Optional<PageButtonEntity> buttonEntityOptional = pageEntity.getPageButtons().stream()
						.filter(b -> b.getId() == pageButton.getId()).findFirst();
				if (buttonEntityOptional.isPresent()) {
					PageButtonEntity pageButtonEntity = buttonEntityOptional.get();
					convertPageButton(location, i, pageButton, pageButtonEntity, 
						pageButtonTypeEntities, actionTypeEntities);
				}
			} else {
				PageButtonEntity pageButtonEntity = new PageButtonEntity();
				pageButtonEntity.setPage(pageEntity);
				pageEntity.getPageButtons().add(convertPageButton(location, i, pageButton, pageButtonEntity,
				pageButtonTypeEntities, actionTypeEntities));
			}
			i++;
		};
	}

	public PageButtonEntity convertPageButton(String location, long order, PageButton pageButton, PageButtonEntity pageButtonEntity,
			List<PageButtonTypeEntity> pageButtonTypeEntities, List<ActionTypeEntity> actionTypeEntities) {
		pageButtonEntity.setName(pageButton.getName());
		pageButtonEntity.setRoute(pageButton.getRoute());
		pageButtonEntity.setSort(order);
		pageButtonEntity.setLocation(location);
		Optional<PageButtonTypeEntity> pageButtonTypeEntityOptional = pageButtonTypeEntities.stream()
				.filter(c -> c.getName().equalsIgnoreCase(pageButton.getType())).findFirst();
		if (pageButtonTypeEntityOptional.isPresent()) {
			pageButtonEntity.setButtonType(pageButtonTypeEntityOptional.get());
		}

		return pageButtonEntity;
	}
}
