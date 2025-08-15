package com.luna.security;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

/**
 * Funções utilitárias de segurança que podem ser reutilizadas em diferentes partes da aplicação.
 */
public final class SecurityUtils {
    private static final SecureRandom RANDOM = new SecureRandom();

    private SecurityUtils() {
        // Evita instanciação
    }

    /**
     * Gera um hash SHA-256 para a senha informada utilizando o salt especificado.
     *
     * @param password senha em texto puro.
     * @param salt     vetor de bytes usado como salt.
     * @return hash codificado em Base64.
     */
    public static String hashPassword(String password, byte[] salt) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(salt);
            byte[] hashed = md.digest(password.getBytes());
            return Base64.getEncoder().encodeToString(hashed);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("Algoritmo de hash não suportado", e);
        }
    }

    /**
     * Gera um salt criptograficamente seguro.
     *
     * @return vetor de bytes contendo o salt.
     */
    public static byte[] generateSalt() {
        byte[] salt = new byte[16];
        RANDOM.nextBytes(salt);
        return salt;
    }

    /**
     * Verifica se a senha informada gera o mesmo hash.
     *
     * @param password     senha em texto puro.
     * @param salt         salt utilizado no hash original.
     * @param expectedHash hash esperado em Base64.
     * @return verdadeiro se o hash for igual, falso caso contrário.
     */
    public static boolean verifyPassword(String password, byte[] salt, String expectedHash) {
        String hash = hashPassword(password, salt);
        byte[] hashBytes = Base64.getDecoder().decode(hash);
        byte[] expectedBytes = Base64.getDecoder().decode(expectedHash);
        return MessageDigest.isEqual(hashBytes, expectedBytes);
    }

    /**
     * Gera um token aleatório com o tamanho especificado.
     *
     * @param length tamanho em bytes do token.
     * @return token codificado em Base64 URL safe.
     */
    public static String generateToken(int length) {
        byte[] token = new byte[length];
        RANDOM.nextBytes(token);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(token);
    }
}
