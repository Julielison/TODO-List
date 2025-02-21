package persistence;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import model.Tarefa;
import model.Status;

public class PersistenciaTarefas {
    private static final String ARQUIVO = "tarefas.csv";

    public static void salvarTarefas(List<Tarefa> tarefas) {
        try (BufferedWriter writer = Files.newBufferedWriter(Paths.get(ARQUIVO))) {
            // Escreve o cabeçalho
            writer.write("nome,descricao,dataTermino,prioridade,categoria,status");
            writer.newLine();
            for (Tarefa t : tarefas) {
                writer.write(t.getNome() + "," + t.getDescricao() + "," + t.getDataTermino() + ","
                        + t.getPrioridade() + "," + t.getCategoria() + "," + t.getStatus());
                writer.newLine();
            }
        } catch(IOException e) {
            System.out.println("Erro ao salvar tarefas: " + e.getMessage());
        }
    }

    public static List<Tarefa> carregarTarefas() {
        List<Tarefa> tarefas = new ArrayList<>();
        Path path = Paths.get(ARQUIVO);
        if (!Files.exists(path)) {
            return tarefas;
        }
        try (BufferedReader reader = Files.newBufferedReader(path)) {
            String line = reader.readLine(); // Ignora o cabeçalho
            while((line = reader.readLine()) != null) {
                String[] partes = line.split(",");
                if (partes.length == 6) {
                    String nome = partes[0];
                    String descricao = partes[1];
                    LocalDate dataTermino = LocalDate.parse(partes[2]);
                    int prioridade = Integer.parseInt(partes[3]);
                    String categoria = partes[4];
                    Status status = Status.valueOf(partes[5].toUpperCase());
                    Tarefa tarefa = new Tarefa(nome, descricao, dataTermino, prioridade, categoria, status);
                    tarefas.add(tarefa);
                }
            }
        } catch(IOException e) {
            System.out.println("Erro ao carregar tarefas: " + e.getMessage());
        }
        return tarefas;
    }
}
