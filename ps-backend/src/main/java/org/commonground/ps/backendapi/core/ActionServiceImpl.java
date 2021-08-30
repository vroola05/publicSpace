package org.commonground.ps.backendapi.core;

import java.util.Optional;

import org.commonground.ps.backendapi.convertor.Convert;
import org.commonground.ps.backendapi.jpa.entities.ActionEntity;
import org.commonground.ps.backendapi.jpa.repositories.ActionRepository;
import org.commonground.ps.backendapi.model.Action;
import org.commonground.ps.backendapi.util.ActionEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActionServiceImpl implements ActionService {

  @Autowired
	private ActionRepository actionRepository;
  
  public Action get(Long domainId, ActionEnum actionEnum) {
    Optional<ActionEntity> actionEntity = actionRepository.getActionByDomainIdAndActionTypeId(domainId, actionEnum.id);
    return Convert.actionEntity(actionEntity.get());
  }
}
