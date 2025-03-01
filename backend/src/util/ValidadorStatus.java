package util;

import model.Status;

public class ValidadorStatus {
    public static Status validarStatus(String entrada) {
        try {
            return Status.valueOf(entrada.toUpperCase());
        } catch (IllegalArgumentException e) {
            return null; // Retorna null se o status for inválido
        }
    }
}
