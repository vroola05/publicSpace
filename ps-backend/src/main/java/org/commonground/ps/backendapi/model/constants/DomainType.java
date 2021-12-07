package org.commonground.ps.backendapi.model.constants;

import java.util.HashMap;
import java.util.Map;

public enum DomainType {
    GOVERNMENT(1),
    CONTRACTOR(2);

    private static final Map<Long, DomainType> BY_ID = new HashMap<>();
    
    static {
        for (DomainType e : values()) {
            BY_ID.put(e.id, e);
        }
    }

    public final long id;

    private DomainType(long id) {
        this.id = id;
    }

    public static DomainType valueOfId(long id) {
        return BY_ID.get(id);
    }
}
