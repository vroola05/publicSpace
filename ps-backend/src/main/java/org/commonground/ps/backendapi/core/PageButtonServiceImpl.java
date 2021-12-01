package org.commonground.ps.backendapi.core;

import java.util.List;
import java.util.Optional;

import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.jpa.entities.ActionTypeEntity;
import org.commonground.ps.backendapi.jpa.entities.PageButtonEntity;
import org.commonground.ps.backendapi.jpa.entities.PageButtonTypeEntity;
import org.commonground.ps.backendapi.jpa.entities.PageEntity;
import org.commonground.ps.backendapi.jpa.entities.PageOverviewEntity;
import org.commonground.ps.backendapi.jpa.repositories.ActionTypeRepository;
import org.commonground.ps.backendapi.jpa.repositories.PageButtonTypeRepository;
import org.commonground.ps.backendapi.model.PageButton;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PageButtonServiceImpl implements PageButtonService {
	@Autowired
	private PageButtonRoleService pageButtonRoleService;

	@Autowired
	private PageButtonConditionService pageButtonConditionService;

	@Autowired
	private PageButtonTypeRepository pageButtonTypeRepository;

	@Autowired
	private ActionTypeRepository actionTypeRepository;

	@Autowired
	private ActionService actionService;

	public void updatePageButtons(String location, PageEntity pageEntity, List<PageButton> pageButtons) {
		List<PageButtonTypeEntity> pageButtonTypeEntities = pageButtonTypeRepository.findAllByOrderByNameAsc();
		List<ActionTypeEntity> actionTypeEntities = actionTypeRepository.findAll();
		long i = 0;
		for (PageButton pageButton : pageButtons) {
			if (pageButton.getId() != null) {
				// Update
				Optional<PageButtonEntity> buttonEntityOptional = pageEntity.getPageButtons().stream()
						.filter(b -> b.getId() == pageButton.getId()).findFirst();
				if (buttonEntityOptional.isPresent()) {
					PageButtonEntity pageButtonEntity = buttonEntityOptional.get();
					convertPageButton(location, i, pageButton, pageButtonEntity, 
						pageButtonTypeEntities, actionTypeEntities);
				}
			} else {
				// Insert
				PageButtonEntity pageButtonEntity = new PageButtonEntity();
				pageButtonEntity.setPage(pageEntity);
				pageEntity.getPageButtons().add(convertPageButton(location, i, pageButton, pageButtonEntity,
				pageButtonTypeEntities, actionTypeEntities));
			}
			i++;
		};
	}

	public void updatePageButtons(String location, PageEntity pageEntity, PageOverviewEntity pageOverviewEntity, List<PageButton> pageButtons) {
		if (pageButtons == null) {
			return;
		}

		List<PageButtonTypeEntity> pageButtonTypeEntities = pageButtonTypeRepository.findAllByOrderByNameAsc();
		List<ActionTypeEntity> actionTypeEntities = actionTypeRepository.findAll();
		long i = 0;
		for (PageButton pageButton : pageButtons) {
			if (pageButton.getId() != null) {
				// Update
				Optional<PageButtonEntity> buttonEntityOptional = pageOverviewEntity.getPageButtons().stream()
						.filter(b -> b.getId() == pageButton.getId()).findFirst();
				if (buttonEntityOptional.isPresent()) {
					PageButtonEntity pageButtonEntity = buttonEntityOptional.get();
					convertPageButton(location, i, pageButton, pageButtonEntity, 
						pageButtonTypeEntities, actionTypeEntities);
				}
			} else {
				// Insert
				PageButtonEntity pageButtonEntity = new PageButtonEntity();
				pageButtonEntity.setPageOverview(pageOverviewEntity);
				pageOverviewEntity.getPageButtons().add(convertPageButton(location, i, pageButton, pageButtonEntity,
				pageButtonTypeEntities, actionTypeEntities));
				
			}
			i++;
		};
	}

	public PageButtonEntity convertPageButton(String location, long order, PageButton pageButton, PageButtonEntity pageButtonEntity,
			List<PageButtonTypeEntity> pageButtonTypeEntities, List<ActionTypeEntity> actionTypeEntities) throws BadRequestException {
		pageButtonEntity.setName(pageButton.getName());
		pageButtonEntity.setRoute(pageButton.getRoute());
		pageButtonEntity.setSort(order);
		pageButtonEntity.setLocation(location);
		Optional<PageButtonTypeEntity> pageButtonTypeEntityOptional = pageButtonTypeEntities.stream()
				.filter(c -> c.getName().equalsIgnoreCase(pageButton.getType())).findFirst();
		if (pageButtonTypeEntityOptional.isPresent()) {
			pageButtonEntity.setButtonType(pageButtonTypeEntityOptional.get());
		} else {
			throw new BadRequestException();
		}

		if (pageButton.getAction() != null) {
			ActionTypeEntity actionTypeEntity = actionService.getActionTypeEntity(pageButton.getAction().getId());
			if (actionTypeEntity != null) {
				pageButtonEntity.setActionType(actionTypeEntity);	
			}
		}

		pageButtonRoleService.convertPageButtonRoles(pageButton, pageButtonEntity);
		pageButtonConditionService.convertPageButtonConditions(pageButton, pageButtonEntity);

		return pageButtonEntity;
	}
}
