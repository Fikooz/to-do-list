function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText) {
    const taskList = document.getElementById("taskList");
    const newTaskItem = document.createElement("li");
    newTaskItem.innerHTML = `
            ${taskText}
            <button class="remove-button">Remove</button>
        `;
    taskList.appendChild(newTaskItem);
    taskInput.value = "";

    saveTasks();
  }
}

function removeTask(event) {
  if (event.target.classList.contains("remove-button")) {
    const taskItem = event.target.parentElement;
    taskItem.remove();

    saveTasks();
  }
}

function saveTasks() {
  const taskList = document.getElementById("taskList");
  const tasks = Array.from(taskList.children).map((task) => task.textContent);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const taskList = document.getElementById("taskList");
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((taskText) => {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
            ${taskText}
            <button class="remove-button">Remove</button>
        `;
    taskList.appendChild(taskItem);
  });
}

document.getElementById("addTask").addEventListener("click", addTask);
document.getElementById("taskList").addEventListener("click", removeTask);

loadTasks();
