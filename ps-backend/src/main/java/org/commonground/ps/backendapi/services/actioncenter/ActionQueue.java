package org.commonground.ps.backendapi.services.actioncenter;

import java.util.UUID;

public interface ActionQueue {
    public void post(UUID id);
    public void consume();
}
