package org.commonground.ps.backendapi.services.actioncenter;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicBoolean;

import org.commonground.ps.backendapi.jpa.entities.ActionQueueEntity;
import org.commonground.ps.backendapi.jpa.repositories.ActionQueueRepository;
import org.commonground.ps.backendapi.model.enums.ActionQueueState;



import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;


@Service
public class ActionQueueImpl implements ActionQueue {
    private final ActionQueueRepository actionQueueRepository;
    private final ActioncenterQueueExecutor actioncenterQueueExecutor;

    private AtomicBoolean running = new AtomicBoolean(false);

    public ActionQueueImpl(
            ActionQueueRepository actionQueueRepository,
            ActioncenterQueueExecutor actioncenterQueueExecutor) {
        this.actionQueueRepository = actionQueueRepository;
        this.actioncenterQueueExecutor = actioncenterQueueExecutor;
    }

    

    @Override
    @Async
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void post(UUID id) {
        try {
            actioncenterQueueExecutor.executeProcess(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        
    }

    
    
    // @Scheduled(cron = "*/15 * * * * *")
    public void consume() {
        if (!running.getAndSet(true)) {
            try {
                List<ActionQueueEntity> actionQueueEntities = actionQueueRepository.findAllByStateNot(ActionQueueState.END);
                for (ActionQueueEntity actionQueueEntity : actionQueueEntities) {
                    actioncenterQueueExecutor.executeProcess(actionQueueEntity.getId());
                }
            } finally {
                running.set(false);
            }
        }
    }

    
}
