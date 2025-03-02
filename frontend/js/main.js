import { renderTasks, registerDOMEvents } from "./dom.js";
import { tasks, addTask } from "./taskManager.js";

// Adiciona algumas tarefas de exemplo
tasks.push(
  {
    id: Date.now(),
    name: "Finalizar relatório",
    description: "Completar o relatório anual da empresa",
    dueDate: "2025-03-05",
    priority: 5,
    category: "Trabalho",
    status: "TODO"
  },
  {
    id: Date.now() + 1,
    name: "Fazer compras",
    description: "Comprar frutas, legumes e leite",
    dueDate: "2025-03-02",
    priority: 3,
    category: "Pessoal",
    status: "DOING"
  },
  {
    id: Date.now() + 2,
    name: "Treino na academia",
    description: "Focar em exercícios de perna e cardio",
    dueDate: "2025-03-03",
    priority: 4,
    category: "Saúde",
    status: "DONE"
  }
);

// Inicializa os eventos e renderiza as tarefas
registerDOMEvents();
renderTasks();
