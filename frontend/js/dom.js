import { tasks, editingTaskId, addTask, updateTask, removeTask } from "./taskManager.js";

// Seleção dos elementos do DOM
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const btnAdd = document.getElementById('btn-add');
const btnCancel = document.getElementById('btn-cancel');
const closeSpan = document.querySelector('.close');
const taskForm = document.getElementById('task-form');
const tasksTableBody = document.querySelector('#tasks-table tbody');
const filterStatus = document.getElementById('filter-status');

// Abre ou fecha o modal
export function openModal(editing = false) {
  modal.style.display = 'block';
  if (editing) {
    modalTitle.textContent = 'Editar Tarefa';
  } else {
    modalTitle.textContent = 'Adicionar Tarefa';
    taskForm.reset();
  }
}

export function closeModal() {
  modal.style.display = 'none';
}

// Renderiza a lista de tarefas na tabela
export function renderTasks() {
  tasksTableBody.innerHTML = '';

  const statusFilter = filterStatus.value;
  let filteredTasks = tasks;
  if (statusFilter !== 'all') {
    filteredTasks = tasks.filter(task => task.status === statusFilter);
  }

  // Ordena as tarefas pela prioridade (maior primeiro)
  filteredTasks.sort((a, b) => b.priority - a.priority);

  filteredTasks.forEach(task => {
    const maxLength = 50; // Limite de caracteres para descrição
    let shortDescription = task.description;
    if (shortDescription.length > maxLength) {
      shortDescription = shortDescription.substring(0, maxLength) + "...";
    }
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${task.name}</td>
      <td title="${task.description}">${shortDescription}</td>
      <td>${task.dueDate}</td>
      <td>${task.priority}</td>
      <td>${task.category}</td>
      <td>${task.status}</td>
      <td>
        <button onclick="editTask(${task.id})">Editar</button>
        <button onclick="deleteTask(${task.id})">Excluir</button>
      </td>
    `;
    tasksTableBody.appendChild(tr);
  });
}

// Registra eventos dos elementos do DOM
export function registerDOMEvents() {
  btnAdd.addEventListener('click', () => openModal());
  btnCancel.addEventListener('click', closeModal);
  closeSpan.addEventListener('click', closeModal);
  filterStatus.addEventListener('change', renderTasks);

  // Evento para envio do formulário
  taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('task-name').value;
    const description = document.getElementById('task-desc').value;
    const dueDate = document.getElementById('task-date').value;
    const priority = document.getElementById('task-priority').value;
    const category = document.getElementById('task-category').value;
    const status = document.getElementById('task-status').value;

    // Verifica se está editando ou criando
    if (editingTaskId === null) {
      addTask(name, description, dueDate, priority, category, status);
    } else {
      updateTask(editingTaskId, name, description, dueDate, priority, category, status);
    }

    renderTasks();
    closeModal();
  });

  // Fecha o modal ao clicar fora dele
  window.onclick = function(event) {
    if (event.target == modal) {
      closeModal();
    }
  };
}

// Expor funções para edição e remoção no escopo global
window.editTask = function(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    editingTaskId = id;
    document.getElementById('task-name').value = task.name;
    document.getElementById('task-desc').value = task.description;
    document.getElementById('task-date').value = task.dueDate;
    document.getElementById('task-priority').value = task.priority;
    document.getElementById('task-category').value = task.category;
    document.getElementById('task-status').value = task.status;
    openModal(true);
  }
};

window.deleteTask = function(id) {
  const confirmDelete = confirm('Tem certeza que deseja excluir esta tarefa?');
  if (confirmDelete) {
    removeTask(id);
    renderTasks();
  }
};
