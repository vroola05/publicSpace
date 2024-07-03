package org.commonground.ps.backendapi.core;

import java.util.Optional;

import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.jpa.entities.CallEntity;
import org.commonground.ps.backendapi.model.Call;
import org.commonground.ps.backendapi.model.Group;
import org.commonground.ps.backendapi.model.User;

public interface CallService {
    public Optional<Call> getCallById(User user, Long id);
    public Optional<CallEntity> getCallEntityById(User user, Long id);
    public Call save(User user, Call call) throws BadRequestException;
    public Optional<Call> setUser(User user, Long id, User userNew);
    public Optional<Call> setGroup(User user, Long id, Group groupNew);
    public Optional<Call> setGroupAndUser(User user, Long id, Long groupId, User userNew);
}
