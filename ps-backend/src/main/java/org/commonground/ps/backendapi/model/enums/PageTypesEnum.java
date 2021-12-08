package org.commonground.ps.backendapi.model.enums;

import java.util.HashMap;
import java.util.Map;

public enum PageTypesEnum {
    OVERVIEW(1, "overview"),
    DETAILS(2, "details"),
    ASSIGN(3, "assign"),
    NEW_LOCATION(4, "newLocation"),
    NEW_INFORMATION(5, "newInformation"),
    NEW_CONFIRM(6, "newConfirm"),
    ORDER_CREATION(7, "orderCreation"),
    ORDER_CONFIRM(8, "orderConfirm");

    private static final Map<Long, PageTypesEnum> BY_ID = new HashMap<>();
    private static final Map<String, PageTypesEnum> BY_NAME = new HashMap<>();
    
    static {
        for (PageTypesEnum e : values()) {
            BY_ID.put(e.id, e);
            BY_NAME.put(e.name, e);
        }
    }

    public final long id;
    public final String name;

    private PageTypesEnum(long id, String name) {
        this.id = id;
        this.name = name;
    }


    public static PageTypesEnum valueOfId(long id) {
        return BY_ID.get(id);
    }

    public static PageTypesEnum valueOfName(String label) {
        return BY_NAME.get(label);
    }


}
