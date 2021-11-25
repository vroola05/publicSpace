package org.commonground.ps.backendapi.util;

import java.util.HashMap;
import java.util.Map;

public enum ActionEnum {
  ASSIGN_PERSON(0L, "Toewijzen persoon"),
  ASSIGN_GROUP(1L, "Toewijzen groep"),
  CALL_CREATE(2L, "Melding aanmaken"),
  CALL_CLOSE(3L, "Melding afsluiten"),
  CALL_KILL(4L, "Melding afbreken"),
  ORDER_CREATE(5L, "Opdracht aanmaken"),
  ORDER_ACCEPT(6L, "Opdracht accepteren"),
  ORDER_REJECT(7L, "Opdracht weigeren"),
  ORDER_DONE(8L, "Opdracht gereedmelden"),
  ORDER_DONE_REJECT(9L, "Opdracht goedkeuren"),
  ORDER_CLOSE(10L, "Opdracht afkeuren"),
  ORDER_CANCEL(11L, "Opdracht annuleren"),
  CANCEL(12L, "Terug"),
  BACK(13L, "Annuleren"),
  NEXT(14L, "Volgende");
  
  private static final Map<Long, ActionEnum> BY_ID = new HashMap<>();
  private static final Map<String, ActionEnum> BY_NAME = new HashMap<>();

  static {
      for (ActionEnum e : values()) {
        BY_ID.put(e.id, e);
        BY_NAME.put(e.name, e);
      }
  }

  public final Long id;
  public final String name;

  private ActionEnum(Long id, String name) {
      this.id = id;
      this.name = name;
  }

  public static ActionEnum valueOfId(Long number) {
    return BY_ID.get(number);
}

  public static ActionEnum valueOfName(String label) {
      return BY_NAME.get(label);
  }

  
}
