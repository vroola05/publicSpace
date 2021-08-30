package org.commonground.ps.backendapi.util;

import java.util.Date;

public class DateUtil {
  public static Date minusMinutes(int minutes){
		return new Date(System.currentTimeMillis() - minutes * 60 * 1000);
  }

  public static Date minusMinutes(Date date, int minutes){
		return new Date(date.getTime() - minutes * 60 * 1000);
  }

  public static Date plusMinutes(int minutes){
		return new Date(System.currentTimeMillis() + minutes * 60 * 1000);
  }

  public static Date plusMinutes(Date date, int minutes){
		return new Date(date.getTime() + minutes * 60 * 1000);
  }
}
