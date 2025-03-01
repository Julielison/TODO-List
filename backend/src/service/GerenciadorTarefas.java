package service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import model.Tarefa;
import model.Status;

public class GerenciadorTarefas {
    private List<Tarefa> tarefas;

    public GerenciadorTarefas() {
        this.tarefas = new ArrayList<>();
    }

    public void adicionarTarefa(Tarefa tarefa) {
        tarefas.add(tarefa);
        Collections.sort(tarefas, Comparator.comparingInt(Tarefa::getPrioridade));
    }

    public List<Tarefa> listarTarefas() {
        return tarefas;
    }

    public List<Tarefa> filtrarPorCategoria(String categoria) {
        List<Tarefa> filtradas = new ArrayList<>();
        for (Tarefa t : tarefas) {
            if (t.getCategoria().equalsIgnoreCase(categoria)) {
                filtradas.add(t);
            }
        }
        return filtradas;
    }

    public List<Tarefa> filtrarPorPrioridade(int prioridade) {
        List<Tarefa> filtradas = new ArrayList<>();
        for (Tarefa t : tarefas) {
            if (t.getPrioridade() == prioridade) {
                filtradas.add(t);
            }
        }
        return filtradas;
    }

    public List<Tarefa> filtrarPorStatus(Status status) {
        List<Tarefa> filtradas = new ArrayList<>();
        for (Tarefa t : tarefas) {
            if (t.getStatus() == status) {
                filtradas.add(t);
            }
        }
        return filtradas;
    }

    // Filtragem por data exata
    public List<Tarefa> filtrarPorData(LocalDate data) {
        List<Tarefa> filtradas = new ArrayList<>();
        for (Tarefa t : tarefas) {
            if (t.getDataTermino().equals(data)) {
                filtradas.add(t);
            }
        }
        return filtradas;
    }

    // Filtragem por data até (inclusive)
    public List<Tarefa> filtrarPorDataAte(LocalDate data) {
        List<Tarefa> filtradas = new ArrayList<>();
        for (Tarefa t : tarefas) {
            if (!t.getDataTermino().isAfter(data)) {
                filtradas.add(t);
            }
        }
        return filtradas;
    }

    // Contagem de tarefas por status
    public int contarTarefasPorStatus(Status status) {
        int count = 0;
        for (Tarefa t : tarefas) {
            if (t.getStatus() == status) {
                count++;
            }
        }
        return count;
    }

    public boolean removerTarefa(int indice) {
        if (indice >= 0 && indice < tarefas.size()) {
            tarefas.remove(indice);
            return true;
        }
        return false;
    }

    // Atualiza a tarefa no índice informado e reordena a lista
    public boolean atualizarTarefa(int indice, Tarefa tarefaAtualizada) {
        if (indice >= 0 && indice < tarefas.size()) {
            tarefas.set(indice, tarefaAtualizada);
            Collections.sort(tarefas, Comparator.comparingInt(Tarefa::getPrioridade));
            return true;
        }
        return false;
    }

    public void setTarefas(List<Tarefa> tarefas) {
        this.tarefas = tarefas;
        Collections.sort(this.tarefas, Comparator.comparingInt(Tarefa::getPrioridade));
    }
}
