// Definição da classe Task seguindo os conceitos de POO
class Task {
    constructor(id, name, description, dueDate, priority, category, status) {
      this.id = id; // identificador único
      this.name = name;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = parseInt(priority);
      this.category = category;
      this.status = status;
    }
  }
  
  const tasks = []; // Array para armazenar as tarefas
  let editingTaskId = null; // Armazena o ID da tarefa em edição (caso haja)
  
  
  // Seleção dos elementos do DOM
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const btnAdd = document.getElementById('btn-add');
  const btnCancel = document.getElementById('btn-cancel');
  const closeSpan = document.querySelector('.close');
  const taskForm = document.getElementById('task-form');
  const tasksTableBody = document.querySelector('#tasks-table tbody');
  const filterStatus = document.getElementById('filter-status');
  
  // Funções para abertura e fechamento do modal
  function openModal(editing = false) {
    modal.style.display = 'block';
    if (editing) {
      modalTitle.textContent = 'Editar Tarefa';
    } else {
      modalTitle.textContent = 'Adicionar Tarefa';
      taskForm.reset();
      editingTaskId = null;
    }
  }
  
  function closeModal() {
    modal.style.display = 'none';
  }
  
  // Eventos para abertura e fechamento do modal
  btnAdd.addEventListener('click', () => openModal());
  btnCancel.addEventListener('click', closeModal);
  closeSpan.addEventListener('click', closeModal);
  
  // Função que renderiza as tarefas na tabela
  function renderTasks() {
    tasksTableBody.innerHTML = '';
    
    // Aplicar filtro pelo status, se selecionado
    const statusFilter = filterStatus.value;
    let filteredTasks = tasks;
    if (statusFilter !== 'all') {
      filteredTasks = tasks.filter(task => task.status === statusFilter);
    }
    
    // Ordenar as tarefas pela prioridade (maior prioridade primeiro)
    filteredTasks.sort((a, b) => b.priority - a.priority);

    
    
    filteredTasks.forEach(task => {
        const maxLength = 50; // Defina o limite de caracteres desejado
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
  
  // Tratamento do envio do formulário (criação ou edição de tarefa)
  taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('task-name').value;
    const description = document.getElementById('task-desc').value;
    const dueDate = document.getElementById('task-date').value;
    const priority = document.getElementById('task-priority').value;
    const category = document.getElementById('task-category').value;
    const status = document.getElementById('task-status').value;
    
    if (editingTaskId === null) {
      // Criar nova tarefa
      const id = Date.now(); // ID único simples
      const newTask = new Task(id, name, description, dueDate, priority, category, status);
      tasks.push(newTask);
    } else {
      // Atualizar tarefa existente
      const task = tasks.find(t => t.id === editingTaskId);
      if (task) {
        task.name = name;
        task.description = description;
        task.dueDate = dueDate;
        task.priority = parseInt(priority);
        task.category = category;
        task.status = status;
      }
    }
    
    // O rebalanceamento é feito através da ordenação na função renderTasks()
    renderTasks();
    closeModal();
  });
  
  // Função para editar tarefa – disponibilizada no escopo global para acesso inline
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
  
  // Função para excluir tarefa – também disponível globalmente
  window.deleteTask = function(id) {
    const confirmDelete = confirm('Tem certeza que deseja excluir esta tarefa?');
    if (confirmDelete) {
      const index = tasks.findIndex(t => t.id === id);
      if (index > -1) {
        tasks.splice(index, 1);
        renderTasks();
      }
    }
  };
  
  // Aplicar filtro ao mudar o valor do filtro de status
  filterStatus.addEventListener('change', renderTasks);
  
  // Adicionando tarefas de exemplo
tasks.push(
    new Task(Date.now(), "Finalizar relatório", "Completar o relatório anual da empresa", "2025-03-05", 5, "Trabalho", "TODO"),
    new Task(Date.now() + 1, "Fazer compras", "Comprar frutas, legumes e leite", "2025-03-02", 3, "Pessoal", "DOING"),
    new Task(Date.now() + 2, "Treino na academia", "Focar em exercícios de perna e cardio", "2025-03-03", 4, "Saúde", "DONE")
  );
  // Renderiza as tarefas inicialmente
  renderTasks();
  
  // Fecha o modal ao clicar fora da área do modal
  window.onclick = function(event) {
    if (event.target == modal) {
      closeModal();
    }
  };
  