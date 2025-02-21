package util;

import java.util.Scanner;

public class ValidadorPrioridade {
    public static int validarPrioridade(String entrada) {
        try {
            int prioridade = Integer.parseInt(entrada);
            if (prioridade >= 1 && prioridade <= 5) {
                return prioridade; // Retorna a prioridade válida
            }
        } catch (NumberFormatException e) {
        }
        return -1;
    }
}