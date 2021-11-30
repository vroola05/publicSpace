package org.commonground.ps.backendapi.util;

public class StringUtil {
    public static boolean isInteger(String input) { 
        try {  
          Integer.parseInt(input);  
          return true;
        } catch(NumberFormatException e){  
          return false;  
        }  
      }   
}
