const taskKey = "@tasks";

// Função para adicionar tarefa
function addTask(event) {
  event.preventDefault(); // Evita o recarregamento da página
  const taskId = new Date().getTime();
  const taskList = document.querySelector("#taskList");

  const form = document.querySelector("#taskForm");
  const formData = new FormData(form);

  const taskTitle = formData.get("title");
  const taskDescription = formData.get("description");

  const li = document.createElement("li");

  li.id = taskId;
  li.innerHTML = generateHtmlCard({
    id: taskId,
    title: taskTitle,
    description: taskDescription,
  });

  taskList.appendChild(li);

  // Salvar tarefas no localStorage
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  tasks.push({ id: taskId, title: taskTitle, description: taskDescription });
  localStorage.setItem(taskKey, JSON.stringify(tasks));

  form.reset();
}

function openEditTaskDialog(taskId) {
  console.log(taskId);
  const task = JSON.parse(localStorage.getItem(taskKey)).find(
    (task) => task.id === taskId
  );
  const editDialog = document.createElement("dialog");
  editDialog.open = true;
  editDialog.id = "editDialog";
  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Título:";
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.name = "title";
  titleInput.value = task.title;
  const descriptionLabel = document.createElement("label");
  descriptionLabel.textContent = "Descrição:";
  const descriptionInput = document.createElement("input");
  descriptionInput.type = "text";
  descriptionInput.name = "description";
  descriptionInput.value = task.description;
  const actionsDiv = document.createElement("div");
  const saveButton = document.createElement("button");
  saveButton.textContent = "Salvar";
  saveButton.addEventListener("click", (event) => {
    event.preventDefault(); 
    const updatedTitle = titleInput.value;
    const updatedDescription = descriptionInput.value;
    const updatedTasks = JSON.parse(localStorage.getItem(taskKey)).map(
      (task) => {
        if (task.id === taskId) {
          return {
            ...task,
            title: updatedTitle,
            description: updatedDescription,
          };
        }
        return task;
      }
    );
    localStorage.setItem(taskKey, JSON.stringify(updatedTasks));
    const taskElement = document.getElementById(taskId);
    taskElement.innerHTML = generateHtmlCard({
      id: taskId,
      title: updatedTitle,
      description: updatedDescription,
    });
    editDialog.remove();
  });
  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancelar";
  cancelButton.addEventListener("click", () => {
    editDialog.remove();
  });
  actionsDiv.classList.add("d-flex", "justify-content-end", "gap-3", "py-1");
  actionsDiv.append(saveButton, cancelButton);
  editDialog.append(
    titleLabel,
    titleInput,
    descriptionLabel,
    descriptionInput,
    actionsDiv
  );
  console.log(editDialog);
  document.body.appendChild(editDialog);
}

// Carregar tarefas do localStorage ao recarregar a página
window.addEventListener("DOMContentLoaded", () => {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  const taskList = document.querySelector("#taskList");
  taskList.innerHTML = tasks
    .map((task) => `<li id="${task.id}">${generateHtmlCard(task)}</li>`)
    .join("");
});

function generateHtmlCard(task) {
  return `
    <div class="card">
      <div class="d-flex justify-content-between">
        <h2>${task.title}</h2>
        <button class="edit-button" title="Editar tarefa" onClick="openEditTaskDialog(${task.id})">✏️</button>
      </div>
      <p>${task.description}</p>
    </div>
  `;
}
