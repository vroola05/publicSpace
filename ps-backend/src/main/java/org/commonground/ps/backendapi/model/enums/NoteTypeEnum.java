package org.commonground.ps.backendapi.model.enums;

public enum NoteTypeEnum {
    SYSTEM(1L),
    GENERIC(2L),
    EMAIL(3L);

    private final long id;
    private NoteTypeEnum(long id) {
        this.id = id;
    }

    public long getValue() {
        return id;
    }
}
