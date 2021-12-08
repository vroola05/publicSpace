package org.commonground.ps.backendapi.model.enums;

import java.util.HashMap;
import java.util.Map;

public enum DomainTypeEnum {
    NONE(-1),
    GOVERNMENT(1),
    CONTRACTOR(2);

    private static final Map<Long, DomainTypeEnum> BY_ID = new HashMap<>();
    
    static {
        for (DomainTypeEnum e : values()) {
            BY_ID.put(e.id, e);
        }
    }

    public final long id;

    private DomainTypeEnum(long id) {
        this.id = id;
    }

    public static DomainTypeEnum valueOfId(long id) {
        return BY_ID.get(id);
    }
}
