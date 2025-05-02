document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("task-form");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");
  
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    function renderTasks() {
      taskList.innerHTML = "";
      tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <span>${task}</span>
          <div>
            <button onclick="editTask(${index})">✏️</button>
            <button onclick="deleteTask(${index})">🗑️</button>
          </div>
        `;
        taskList.appendChild(li);
      });
    }
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const newTask = taskInput.value.trim();
      if (newTask) {
        tasks.push(newTask);
        taskInput.value = "";
        saveTasks();
        renderTasks();
      }
    });
  
    window.deleteTask = function (index) {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };
  
    window.editTask = function (index) {
      const newText = prompt("Editar tarea:", tasks[index]);
      if (newText !== null && newText.trim() !== "") {
        tasks[index] = newText.trim();
        saveTasks();
        renderTasks();
      }
    };
  
    renderTasks();
  });
  