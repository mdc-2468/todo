'use strict';

// To Do List App
// This app allows users to add tasks to a list, mark them as done and delete them.
// The tasks are stored in the local storage of the browser.

const addTaskBtn = document.querySelector("#addTaskButton");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const msg = document.querySelector("#message");
let maxID = 0;

addTaskBtn.addEventListener("click", () => {
  const empty = checkInputEmpty();
  if (!empty) {
    addTask();
    loadTask();
  }
})

function checkInputEmpty() {
  if (taskInput.value === '') {
    msg.textContent = 'You must enter a task';
    msg.classList.remove("d-none");
    return true;
  } else {
    msg.textContent = '';
    msg.classList.add("d-none");
    return false;
  }

}

function addTask() {
  const taskValue = taskInput.value;
  const task = {
    id: maxID + 1,
    content: taskValue,
    status: false
  }
  localStorage.setItem(task.id, JSON.stringify(task));
  maxID++;
  taskInput.value = '';
  msg.textContent = '';
  console.log(`${task.content} has been added to tasks with ID ${task.id}`);
}

function loadTask() {
  const tasks = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const task = JSON.parse(localStorage.getItem(key));
    if (task && typeof (task) === 'object') {
      tasks.push(task);
    }
  }
  tasks.sort((a, b) => a.id - b.id);
  console.log(`Full list of tasks:`);
  console.log(tasks);

  taskList.innerHTML = ''; // Clear existing UI list item

  for (let task of tasks) {
    if (!task.status) {
      const li = document.createElement("li");
      li.innerHTML = `<button id='markDonebutton' onclick="markDone(${task.id})">✔️</button> ${task.content} <button class='btn btn-danger btn-sm' id='deletebutton' onclick="deleteTask(${task.id})">Delete</button>`;
      taskList.appendChild(li);
    }
  }
}

function deleteTask(taskID) {
  localStorage.removeItem(taskID);
  loadTask();
  console.log(`Task with ID ${taskID} has been deleted`);
}

function markDone(taskID) {
  console.log(`Task with ID ${taskID} has been marked as done`);
  let task = JSON.parse(localStorage.getItem(taskID));
  if (task) {
    task.status = true;
    localStorage.setItem(taskID, JSON.stringify(task));
  }
  console.log('Loading Tasks...');
  loadTask();
}

// Interactive UX 
document.addEventListener("keydown", function (e) {
  // Check if the key pressed is an alphanumeric character
  if (e.key.length === 1 && /[a-zA-Z0-9]/.test(e.key)) {
    document.querySelector("#taskInput").focus();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === 'Enter') {
    const empty = checkInputEmpty();
    if (!empty) {
      addTask();
      loadTask();
    }
  }
})


// Uncomment to clear all tasks from local storage of the browser
// localStorage.clear();

// Initialize the page
loadTask();


