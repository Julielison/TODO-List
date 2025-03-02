# TODO List - Gerenciador de Tarefas - Back-end

Este é um projeto simples de um gerenciador de tarefas (TODO List) desenvolvido em Java. Ele permite adicionar, listar, filtrar, atualizar e remover tarefas, além de persistir os dados para que as tarefas sejam mantidas após a execução do programa.

## 📌 Funcionalidades

- ✅ Adicionar uma nova tarefa
- 📋 Listar todas as tarefas
- 🔍 Filtrar tarefas por:
    - Categoria
    - Prioridade (1 a 5)
    - Status (TODO, DOING, DONE)
    - Data específica
    - Data até determinada data
- ❌ Remover tarefas
- ✏️ Atualizar tarefas
- 📊 Contar tarefas por status
- 💾 Persistência de dados (salvar e carregar tarefas)

## 🛠️ Tecnologias Utilizadas

- Java (JDK 17)
- Manipulação de datas com `java.time.LocalDate`
- Entrada e saída via `Scanner`
- Persistência de dados (arquivos)

## 📦 Estrutura do Projeto

```
📂 src/
 ├── 📂 model/          # Classes do modelo (Tarefa, Status)
 ├── 📂 service/        # Regras de negócio (GerenciadorTarefas)
 ├── 📂 persistence/    # Persistência de tarefas
 ├── 📂 util/           # Utilitários para validação e terminal
 ├── 📂 view/           # Interface do usuário (Main.java)
```

## 🚀 Como Executar o Projeto

1. **Clone o repositório**
   ```sh
   git clone https://github.com/Julielison/TODO-List.git
   ```
   navegue até a pasta TODO-List


2. **Compile o projeto**
   ```sh
   javac -d out src/*/*.java
   ```

3. **Execute o programa**
   ```sh
   java -cp out view.Main
   ```

## 📖 Como Usar

Ao executar o programa, o menu principal será exibido:
```
===== MENU TODO List =====
1. Adicionar Tarefa
2. Listar Tarefas
3. Filtrar por Categoria
4. Filtrar por Prioridade
5. Filtrar por Status
6. Remover Tarefa
7. Atualizar Tarefa
8. Filtrar por Data (exata)
9. Filtrar por Data Até (inclusive)
10. Contar Tarefas por Status
0. Salvar e sair
```
Basta escolher uma opção digitando o número correspondente.

## 📝 Contribuição

Se quiser contribuir, siga os passos:
1. Faça um fork do projeto
2. Crie uma branch (`git checkout -b feature/minha-feature`)
3. Commit suas mudanças (`git commit -m 'Adicionando nova funcionalidade'`)
4. Envie para o repositório (`git push origin feature/minha-feature`)
5. Abra um Pull Request



