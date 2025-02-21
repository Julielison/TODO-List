package view;

import java.time.LocalDate;
import java.util.List;
import java.util.Scanner;
import model.Status;
import model.Tarefa;
import persistence.PersistenciaTarefas;
import service.GerenciadorTarefas;
import util.TerminalUtil;
import util.ValidadorDataUtil;
import util.ValidadorPrioridade;
import util.ValidadorStatus;


public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        GerenciadorTarefas gerenciador = new GerenciadorTarefas();

        // Carrega as tarefas persistidas, se existirem
        List<Tarefa> tarefasCarregadas = PersistenciaTarefas.carregarTarefas();
        gerenciador.setTarefas(tarefasCarregadas);


        int opcao = -1;

        while (opcao != 0) {
            System.out.println("\n===== MENU TODO List =====");
            System.out.println("1. Adicionar Tarefa");
            System.out.println("2. Listar Tarefas");
            System.out.println("3. Filtrar por Categoria");
            System.out.println("4. Filtrar por Prioridade");
            System.out.println("5. Filtrar por Status");
            System.out.println("6. Remover Tarefa");
            System.out.println("7. Atualizar Tarefa");
            System.out.println("8. Filtrar por Data (data exata)");
            System.out.println("9. Filtrar por Data Até (inclusive)");
            System.out.println("10. Contar Tarefas por Status");
            System.out.println("0. Salvar a sair");
            System.out.print("Escolha uma opção: ");

            try {
                opcao = Integer.parseInt(scanner.nextLine());
            } catch(NumberFormatException e) {
                System.out.println("Opção inválida, tente novamente.");
                continue;
            }

            TerminalUtil.limparTela();

            switch (opcao) {
                case 1:
                    // Adicionar Tarefa
                    System.out.println("=== CRIANDO TAREFA ===");
                    System.out.print("Nome: ");
                    String nome = scanner.nextLine();

                    System.out.print("Descrição: ");
                    String descricao = scanner.nextLine();

                    LocalDate dataTermino = null;

                    while (dataTermino == null) {
                        System.out.print("Digite a data de término (YYYY-MM-DD): ");
                        String entrada = scanner.nextLine();
                        dataTermino = ValidadorDataUtil.validarData(entrada);

                        if (dataTermino == null) {
                            System.out.println("Data inválida! Tente novamente.");
                            continue;
                        }
                    }


                    int prioridadeValida1 = -1;

                    while (prioridadeValida1 == -1) {
                        System.out.print("Prioridade (1 a 5): ");

                        String entrada = scanner.nextLine();
                        prioridadeValida1 = ValidadorPrioridade.validarPrioridade(entrada);

                        if (prioridadeValida1 == -1) {
                            System.out.println("❌ Prioridade inválida! Digite um número entre 1 e 5.");
                        }
                    }

                    System.out.print("Categoria: ");
                    String categoria = scanner.nextLine();

                    Status statusValido = null;

                    while (statusValido == null) {
                        System.out.print("Status (TODO, DOING, DONE): ");
                        String entrada = scanner.nextLine();
                        statusValido = ValidadorStatus.validarStatus(entrada);

                        if (statusValido == null) {
                            System.out.println("❌ Status inválido! Escolha entre: TODO, DOING, DONE.");
                        }
                    }

                    Tarefa tarefa = new Tarefa(nome, descricao, dataTermino, prioridadeValida1, categoria, statusValido);
                    gerenciador.adicionarTarefa(tarefa);
                    System.out.println("Tarefa adicionada com sucesso!");
                    break;

                case 2:
                    // Listar Tarefas
                    List<Tarefa> todas = gerenciador.listarTarefas();
                    if (todas.isEmpty()) {
                        System.out.println("Nenhuma tarefa encontrada.");
                    } else {
                        for (int i = 0; i < todas.size(); i++) {
                            System.out.println("[" + i + "] " + todas.get(i));
                        }
                    }
                    break;

                case 3:
                    // Filtrar por Categoria
                    System.out.print("Informe a categoria para filtrar: ");
                    String cat = scanner.nextLine();
                    List<Tarefa> porCategoria = gerenciador.filtrarPorCategoria(cat);
                    if (porCategoria.isEmpty()) {
                        System.out.println("Nenhuma tarefa encontrada para a categoria " + cat);
                    } else {
                        porCategoria.forEach(System.out::println);
                    }
                    break;

                case 4:
                    // Filtrar por Prioridade

                    int prioridadeValida = -1;

                    while (prioridadeValida == -1) {
                        System.out.print("Informe a prioridade para filtrar (1 a 5): ");

                        String entrada = scanner.nextLine();
                        prioridadeValida = ValidadorPrioridade.validarPrioridade(entrada);

                        if (prioridadeValida == -1) {
                            System.out.println("❌ Prioridade inválida! Digite um número entre 1 e 5.");
                        }
                    }

                    List<Tarefa> porPrioridade = gerenciador.filtrarPorPrioridade(prioridadeValida);
                    if (porPrioridade.isEmpty()) {
                        System.out.println("Nenhuma tarefa encontrada com prioridade " + prioridadeValida);
                    } else {
                        porPrioridade.forEach(System.out::println);
                    }
                    break;

                case 5:
                    // Filtrar por Status
                    Status statusValido2 = null;

                    while (statusValido2 == null) {
                        System.out.print("Informe o status para filtrar (TODO, DOING, DONE): ");
                        String entrada = scanner.nextLine();
                        statusValido2 = ValidadorStatus.validarStatus(entrada);

                        if (statusValido2 == null) {
                            System.out.println("❌ Status inválido! Escolha entre: TODO, DOING, DONE.");
                        }
                    }
                    List<Tarefa> porStatus = gerenciador.filtrarPorStatus(statusValido2);
                    if (porStatus.isEmpty()) {
                        System.out.println("Nenhuma tarefa encontrada com status " + statusValido2);
                    } else {
                        porStatus.forEach(System.out::println);
                    }
                    break;

                case 6:
                    // Remover Tarefa
                    System.out.print("Informe o índice da tarefa a remover: ");
                    int indice = Integer.parseInt(scanner.nextLine());
                    if (gerenciador.removerTarefa(indice)) {
                        System.out.println("Tarefa removida.");
                    } else {
                        System.out.println("Índice inválido!");
                    }
                    break;

                case 7:
                    // Atualizar Tarefa
                    System.out.print("Informe o índice da tarefa a atualizar: ");
                    int idx = Integer.parseInt(scanner.nextLine());
                    System.out.println("Insira os novos dados da tarefa:");

                    System.out.print("Nome: ");
                    String novoNome = scanner.nextLine();

                    System.out.print("Descrição: ");
                    String novaDescricao = scanner.nextLine();

                    LocalDate novaDataTermino = null;

                    while (novaDataTermino == null) {
                        System.out.print("Data de término (YYYY-MM-DD): ");
                        String entrada = scanner.nextLine();
                        novaDataTermino = ValidadorDataUtil.validarData(entrada);

                        if (novaDataTermino == null) {
                            System.out.println("Data inválida! Tente novamente.");
                            continue;
                        }
                    }


                    int novaPrioridade = -1;

                    while (novaPrioridade == -1) {
                        System.out.print("Informe a prioridade para filtrar (1 a 5): ");

                        String entrada = scanner.nextLine();
                        novaPrioridade = ValidadorPrioridade.validarPrioridade(entrada);

                        if (novaPrioridade == -1) {
                            System.out.println("❌ Prioridade inválida! Digite um número entre 1 e 5.");
                        }
                    }

                    System.out.print("Categoria: ");
                    String novaCategoria = scanner.nextLine();

                    Status novoStatus = null;

                    while (novoStatus == null) {
                        System.out.print("Status (TODO, DOING, DONE): ");
                        String entrada = scanner.nextLine();
                        novoStatus = ValidadorStatus.validarStatus(entrada);

                        if (novoStatus == null) {
                            System.out.println("❌ Status inválido! Escolha entre: TODO, DOING, DONE.");
                        }
                    }

                    Tarefa tarefaAtualizada = new Tarefa(novoNome, novaDescricao, novaDataTermino, novaPrioridade, novaCategoria, novoStatus);
                    if (gerenciador.atualizarTarefa(idx, tarefaAtualizada)) {
                        System.out.println("Tarefa atualizada com sucesso!");
                    } else {
                        System.out.println("Índice inválido!");
                    }
                    break;

                case 8:
                    // Filtrar por Data (exata)

                    LocalDate dataFiltro = null;

                    while (dataFiltro == null) {
                        System.out.print("Informe a data (YYYY-MM-DD) para filtrar: ");
                        String entrada = scanner.nextLine();
                        dataFiltro = ValidadorDataUtil.validarData(entrada);

                        if (dataFiltro == null) {
                            System.out.println("Data inválida! Tente novamente.");
                            continue;
                        }
                    }
                    List<Tarefa> porData = gerenciador.filtrarPorData(dataFiltro);
                    if (porData.isEmpty()) {
                        System.out.println("Nenhuma tarefa encontrada com data " + dataFiltro);
                    } else {
                        porData.forEach(System.out::println);
                    }
                    break;

                case 9:
                    // Filtrar por Data Até (inclusive)
                    LocalDate dataAte = null;

                    while (dataAte == null) {
                        System.out.print("Digite a data (YYYY-MM-DD): ");

                        String entrada = scanner.nextLine();
                        dataAte = ValidadorDataUtil.validarData(entrada);

                        if (dataAte == null) {
                            System.out.println("Data inválida! Tente novamente.");
                            continue;
                        }
                    }
                    List<Tarefa> porDataAte = gerenciador.filtrarPorDataAte(dataAte);
                    if (porDataAte.isEmpty()) {
                        System.out.println("Nenhuma tarefa encontrada até a data " + dataAte);
                    } else {
                        porDataAte.forEach(System.out::println);
                    }
                    break;

                case 10:
                    // Contar Tarefas por Status
                    int countTodo = gerenciador.contarTarefasPorStatus(Status.TODO);
                    int countDoing = gerenciador.contarTarefasPorStatus(Status.DOING);
                    int countDone = gerenciador.contarTarefasPorStatus(Status.DONE);
                    System.out.println("Tarefas TODO: " + countTodo);
                    System.out.println("Tarefas DOING: " + countDoing);
                    System.out.println("Tarefas DONE: " + countDone);
                    break;

                case 0:
                    // Ao sair, salva as tarefas
                    PersistenciaTarefas.salvarTarefas(gerenciador.listarTarefas());
                    System.out.println("Tarefas salvas. Saindo do programa...");
                    break;

                default:
                    System.out.println("Opção inválida!");
            }
        }
        scanner.close();
    }
}
