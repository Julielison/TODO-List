import { tasks, editingTaskId, addTask, updateTask, removeTask, setEditingTaskId } from "./taskManager.js";

// Seleção dos elementos do DOM
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const btnAdd = document.getElementById('btn-add');
const btnCancel = document.getElementById('btn-cancel');
const closeSpan = document.querySelector('.close');
const taskForm = document.getElementById('task-form');
const tasksTableBody = document.querySelector('#tasks-table tbody');
const filterStatus = document.getElementById('filter-status');
const filterCategory = document.getElementById('filter-category');
const filterPriority = document.getElementById('filter-priority');
const editFilterCategory = document.getElementById('categories');

export function insertCategories(){
  const maxCategoryLength = 15;

  // Limpa as opções para evitar duplicações
  filterCategory.innerHTML = '<option value="all">TODAS</option>';
  editFilterCategory.innerHTML = '';

  // Armazena categorias únicas
  const uniqueCategories = new Set(tasks.map(task => task.category));

  uniqueCategories.forEach(category => {
    let shortCategory = category.length > maxCategoryLength 
        ? category.substring(0, maxCategoryLength) + "..." 
        : category;

    // Cria nova opção para filtro de categoria
    const newOption1 = document.createElement('option');
    newOption1.value = category;
    newOption1.textContent = shortCategory;
    newOption1.title = category;
    filterCategory.appendChild(newOption1);

    // Cria nova opção para edição de categoria
    const newOption2 = document.createElement('option');
    newOption2.value = category;
    newOption2.textContent = shortCategory;
    newOption2.title = category;
    editFilterCategory.appendChild(newOption2);
  });
}


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

export function renderTasks() {
  tasksTableBody.innerHTML = '';

  // Obtém os valores dos filtros
  const statusFilterValue = filterStatus.value;
  const categoryFilterValue = filterCategory.value;
  const priorityFilterValue = filterPriority.value;

  // Filtra as tarefas conforme os filtros aplicados
  let filteredTasks = tasks;
  if (statusFilterValue !== 'all') {
    filteredTasks = filteredTasks.filter(task => task.status === statusFilterValue);
  }
  if (categoryFilterValue !== 'all') {
    filteredTasks = filteredTasks.filter(task => task.category === categoryFilterValue);
  }
  if (priorityFilterValue !== 'all') {
    // Converte a prioridade para string para comparação, pois o valor vem do select
    filteredTasks = filteredTasks.filter(task => task.priority.toString() === priorityFilterValue);
  }

  // Ordena as tarefas pela prioridade (maior primeiro)
  filteredTasks.sort((a, b) => b.priority - a.priority);

  // Renderiza cada tarefa na tabela
    filteredTasks.forEach(task => {
      const maxLength = 50;
      const maxNameLength = 20;
      const maxCategoryLength = 15;

      let shortDescription = task.description.length > maxLength 
          ? task.description.substring(0, maxLength) + "..."
          : task.description;

      let shortName = task.name.length > maxNameLength
          ? task.name.substring(0, maxNameLength) + "..."
          : task.name;

      let shortCategory = task.category.length > maxCategoryLength
          ? task.category.substring(0, maxCategoryLength) + "..."
          : task.category;

    const [year, month, day] = task.dueDate.split("-");
    const dateFormated = `${day}/${month}/${year}`;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${shortName}</td>
      <td title="${task.description}">${shortDescription}</td>
      <td>${dateFormated}</td>
      <td>${task.priority}</td>
      <td>${shortCategory}</td>
      <td>${task.status}</td>
      <td>
        <button onclick="editTask(${task.id})">Editar</button>
        <button onclick="deleteTask(${task.id})">Excluir</button>
      </td>
    `;
    tasksTableBody.appendChild(tr);
  });
  insertCategories();
}

export function registerDOMEvents() {
  btnAdd.addEventListener('click', () => openModal());
  btnCancel.addEventListener('click', closeModal);
  closeSpan.addEventListener('click', closeModal);
  filterStatus.addEventListener('change', renderTasks);
  filterCategory.addEventListener('change', renderTasks);
  filterPriority.addEventListener('change', renderTasks);

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

    // Adiciona nova categoria ao filtro caso não exista
    if (!Array.from(filterCategory.options).some(option => option.value === category)) {
      const newOption = document.createElement("option");
      newOption.value = category;
      newOption.textContent = category;
      filterCategory.appendChild(newOption);
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

window.editTask = function(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    setEditingTaskId(id);
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
