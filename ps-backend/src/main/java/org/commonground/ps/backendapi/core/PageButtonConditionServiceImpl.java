package org.commonground.ps.backendapi.core;

import java.util.List;
import java.util.Optional;

import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.jpa.entities.PageButtonConditionEntity;
import org.commonground.ps.backendapi.jpa.entities.PageButtonEntity;
import org.commonground.ps.backendapi.model.PageButton;
import org.commonground.ps.backendapi.model.PageButtonCondition;
import org.springframework.stereotype.Service;

@Service
public class PageButtonConditionServiceImpl implements PageButtonConditionService {
	public void convertPageButtonConditions(PageButton pageButton, PageButtonEntity pageButtonEntity) throws BadRequestException {
				List<PageButtonCondition> conditions = pageButton.getConditions();
				List<PageButtonConditionEntity> conditionEntities = pageButtonEntity.getConditions();
				for (PageButtonCondition condition : conditions) {
					
					Optional<PageButtonConditionEntity> pageButtonConditionEntityOptional = conditionEntities.stream().filter(c -> c.getId() == condition.getId()).findFirst();
					if (condition.getId() != null && pageButtonConditionEntityOptional.isPresent()) {
						// Update
						PageButtonConditionEntity pageButtonConditionEntity = pageButtonConditionEntityOptional.get();
						pageButtonConditionEntity.setField(condition.getField());
						pageButtonConditionEntity.setOperator(condition.getOperator());
						pageButtonConditionEntity.setValue(condition.getValue());

					} else {
						// Insert
						PageButtonConditionEntity pageButtonConditionEntity = new PageButtonConditionEntity();
						pageButtonConditionEntity.setPageButton(pageButtonEntity);
						pageButtonConditionEntity.setField(condition.getField());
						pageButtonConditionEntity.setOperator(condition.getOperator());
						pageButtonConditionEntity.setValue(condition.getValue());

						conditionEntities.add(pageButtonConditionEntity);
					}
				}

				// Remove
				conditionEntities
					.removeIf(pageButtonConditionEntity -> 
						conditions.stream().noneMatch(c -> c.getId() == pageButtonConditionEntity.getId()));
	}

}
