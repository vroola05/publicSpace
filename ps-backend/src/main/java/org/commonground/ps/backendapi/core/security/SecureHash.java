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
}
