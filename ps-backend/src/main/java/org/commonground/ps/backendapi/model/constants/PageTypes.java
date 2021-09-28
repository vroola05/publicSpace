package org.commonground.ps.backendapi.model.constants;

import java.util.HashMap;
import java.util.Map;

public enum PageTypes {
    OVERVIEW(1, "overview"),
    DETAILS(2, "details"),
    ASSIGN(3, "assign"),
    NEW_LOCATION(4, "newLocation"),
    NEW_INFORMATION(5, "newInformation"),
    NEW_CONFIRM(6, "newConfirm");

    private static final Map<Long, PageTypes> BY_ID = new HashMap<>();
    private static final Map<String, PageTypes> BY_NAME = new HashMap<>();
    
    static {
        for (PageTypes e : values()) {
            BY_ID.put(e.id, e);
            BY_NAME.put(e.name, e);
        }
    }

    public final long id;
    public final String name;

    private PageTypes(long id, String name) {
        this.id = id;
        this.name = name;
    }


    public static PageTypes valueOfId(long id) {
        return BY_ID.get(id);
    }

    public static PageTypes valueOfName(String label) {
        return BY_NAME.get(label);
    }


}
