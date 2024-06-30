package org.commonground.ps.backendapi.core;

import org.commonground.ps.backendapi.jpa.entities.ActionQueueEntity;

public interface ActionQueueService {
    public void execute(ActionQueueEntity actionQueueEntity);
}
