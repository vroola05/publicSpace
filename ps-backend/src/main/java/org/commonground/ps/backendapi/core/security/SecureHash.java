package org.commonground.ps.backendapi.core.security;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.util.Base64;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

public class SecureHash {
  private static char[] RANDOM_CHARACTERS = { 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
      'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
      'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8',
      '9' };

  public String defaultHashFunction;
  public int defaultSaltLength;
  public int defaultIterationCount;
  public int defaultKeyLength;

  public SecureHash(String defaultHashFunction, int defaultSaltLength, int defaultIterationCount,
      int defaultKeyLength) {
        this.defaultHashFunction = defaultHashFunction;
        this.defaultSaltLength = defaultSaltLength;
        this.defaultIterationCount = defaultIterationCount;
        this.defaultKeyLength = defaultKeyLength;
  }

  public String generateHashBase64(String password, String salt, int iterationCount, int keyLength, String hashFunction)
      throws SecurityException {
    return Base64.getEncoder().encodeToString(generateHash(password, salt, iterationCount, keyLength, hashFunction));
  }

  public byte[] generateHash(String password, String salt, int iterationCount, int keyLength, String hashFunction)
      throws SecurityException {
    try {
      PBEKeySpec pbeKeySpec = new PBEKeySpec(password.toCharArray(), salt.getBytes("UTF-8"), iterationCount, keyLength);

      SecretKeyFactory secretKeyFactory = getSecretKeyFactory(hashFunction);
      return secretKeyFactory.generateSecret(pbeKeySpec).getEncoded();
    } catch (NoSuchAlgorithmException e) {
      throw new SecurityException("No such algorithm");
    } catch (InvalidKeySpecException e) {
      throw new SecurityException("Invalid key specs");
    } catch (UnsupportedEncodingException e) {
      throw new SecurityException("Unsupported encoding");
    }
  }

  public String generateSalt(int length) {
    SecureRandom secureRandom = new SecureRandom();

    char[] randomString = new char[length];
    for (int i = 0; i < length; i++) {
      randomString[i] = RANDOM_CHARACTERS[secureRandom.nextInt(RANDOM_CHARACTERS.length)];
    }

    return new String(randomString);
  }

  private SecretKeyFactory getSecretKeyFactory(String hashFunction) throws NoSuchAlgorithmException {
    // Option to have other secretkeyfactory's for later implementation, for now we
    // only support PBKDF2WithHmacSHA1
    if (!isNullOrEmpty(hashFunction) && !defaultHashFunction.equals(hashFunction)) {
      return SecretKeyFactory.getInstance(hashFunction);
    }
    // default if the function is undefined for our class
    return SecretKeyFactory.getInstance(defaultHashFunction);
  }

  private static boolean isNullOrEmpty(String str) {
    if (str != null && !str.isEmpty()) {
      return false;
    }
    return true;
  }

  // public static void main(String[] args) {

  //   String error = "Required parameters:\n"
  //     + "\t--function = either: \"salt\" or \"password\"\n"
  //     + "\t--password = Het wachtwoord\n"
  //     + "\t--hash-function = De hash functie\n"
  //     + "\t--salt = Alleen bij --function=\"password\". Geef de salt mee\n"
  //     + "\t--salt-length = de lengthe van de salt\n"
  //     + "\t--iteration-count = Aantal iteraties\n"
  //     + "\t--key-length = Grootte sleutel\n";
  //   if (args == null || (args.length != 12 && args.length != 14)) {
  //     System.out.println(error);
  //     return;
  //   }

  //   String function = "";
  //   String password = "";
  //   String defaultHashFunction = "";
  //   String salt = "";
  //   int defaultSaltLength = 20;
  //   int defaultIterationCount = 1000;
  //   int defaultKeyLength=512;

  //   try {
  //     for(int i = 0; i < args.length; i += 2) {
  //       if (args[i].equals("--function")) {
  //         function= args[i + 1];
  //       }
  //       else if (args[i].equals("--password")) {
  //         password=args[i + 1];
  //       }
  //       else if (args[i].equals("--hash-function")) {
  //         defaultHashFunction=args[i + 1];
  //       }
  //       else if (args[i].equals("--salt-length")) {
  //         defaultSaltLength= Integer.parseInt(args[i + 1]);
  //       }
  //       else if (args[i].equals("--salt")) {
  //         salt= args[i + 1];
  //       }
  //       else if (args[i].equals("--iteration-count")) {
  //         defaultIterationCount= Integer.parseInt(args[i + 1]);
  //       }
  //       else if (args[i].equals("--key-length")) {
  //         defaultKeyLength= Integer.parseInt(args[i + 1]);
  //       }
  //       else {
  //         System.out.println(error);
  //         return;
  //       }
  //     }
  
  //     if (function.equals("password") && (args.length != 14 || salt.isEmpty())) {
  //       return;
  //     }

  //     SecureHash secureHash = new SecureHash(defaultHashFunction, defaultSaltLength, defaultIterationCount, defaultKeyLength);
  //     if (function.equals("salt")) {
  //       System.out.print(secureHash.generateSalt(defaultSaltLength));
  //     } else if (function.equals("password")) {
  //       System.out.print(secureHash.generateHashBase64(password, salt, defaultIterationCount, defaultKeyLength, defaultHashFunction));
  //     }
      
  //   } catch(NumberFormatException | SecurityException e) {
  //     return;
  //   }
  // }
}
