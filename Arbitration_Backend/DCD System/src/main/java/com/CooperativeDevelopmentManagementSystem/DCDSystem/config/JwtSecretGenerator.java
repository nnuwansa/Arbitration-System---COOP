package com.CooperativeDevelopmentManagementSystem.DCDSystem.config;

import java.util.Base64;
import java.security.SecureRandom;

public class JwtSecretGenerator {
    public static void main(String[] args) {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[64]; 
        random.nextBytes(bytes);
        String secret = Base64.getEncoder().encodeToString(bytes);
        System.out.println(secret);
    }
}
