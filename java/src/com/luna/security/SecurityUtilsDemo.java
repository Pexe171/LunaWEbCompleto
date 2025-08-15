package com.luna.security;

/**
 * Pequeno exemplo de uso das funções de segurança.
 */
public class SecurityUtilsDemo {
    public static void main(String[] args) {
        byte[] salt = SecurityUtils.generateSalt();
        String hash = SecurityUtils.hashPassword("senhaSecreta", salt);
        boolean valido = SecurityUtils.verifyPassword("senhaSecreta", salt, hash);

        System.out.println("Senha válida: " + valido);
        System.out.println("Token: " + SecurityUtils.generateToken(32));
    }
}
