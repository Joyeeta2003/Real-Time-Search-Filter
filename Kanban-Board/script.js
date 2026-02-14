let tasksData = {};

let todo = document.querySelector("#todo");
let progress = document.querySelector("#progress");
let done = document.querySelector("#done");

let dragElement = null;
const columns = [todo, progress, done];

// ---------------- ADD TASK ELEMENT ----------------
function addtaskelement(title, desc, column) {
  const div = document.createElement("div");
  div.setAttribute("draggable", "true");
  div.classList.add("task");

  const h2 = document.createElement("h2");
  h2.innerText = title;

  const p = document.createElement("p");
  p.innerText = desc;

  const btn = document.createElement("button");
  btn.innerText = "Delete";

  div.appendChild(h2);
  div.appendChild(p);
  div.appendChild(btn);

  column.appendChild(div);

  // ✅ FIX: drag → dragstart
  div.addEventListener("dragstart", () => {
    dragElement = div;
  });

   btn.addEventListener("click",function(){
      div.remove();
      updateCount();
    })
}

// ---------------- UPDATE COUNT + STORAGE ----------------
function updateCount() {
  tasksData = {};

  columns.forEach((col) => {
    const tasks = col.querySelectorAll(".task");
    const count = col.querySelector(".count");

    tasksData[col.id] = Array.from(tasks).map((t) => ({
      title: t.querySelector("h2").innerText,
      desc: t.querySelector("p").innerText,
    }));

    if (count) count.innerHTML = tasks.length;
  });

  // ✅ FIX: localStorage only once
  localStorage.setItem("tasks", JSON.stringify(tasksData));
}

function handleEnterAdd(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    addTaskBtn.click(); // existing button logic reuse
  }
}

document.querySelector("#task-input")
  .addEventListener("keydown", handleEnterAdd);

document.querySelector("#dsc-input")
  .addEventListener("keydown", handleEnterAdd);


// ---------------- LOAD FROM STORAGE ----------------
if (localStorage.getItem("tasks")) {
  const data = JSON.parse(localStorage.getItem("tasks")) || {};

  for (const col in data) {
    const column = document.querySelector(`#${col}`);
    if (!column) continue;

    data[col].forEach((task) => {
      addtaskelement(task.title, task.desc, column);
    });
  }

  updateCount();
}

// ---------------- DRAG EVENTS ----------------
function addDragEvents(column) {
  column.addEventListener("dragover", (e) => e.preventDefault());

  column.addEventListener("dragenter", (e) => {
    e.preventDefault();
    column.classList.add("hover-over");
  });

  column.addEventListener("dragleave", () => {
    column.classList.remove("hover-over");
  });

  column.addEventListener("drop", (e) => {
    e.preventDefault();
    if (!dragElement) return;

    column.appendChild(dragElement);
    column.classList.remove("hover-over");

    updateCount();
  });
}

addDragEvents(todo);
addDragEvents(progress);
addDragEvents(done);

// ---------------- MODAL LOGIC ----------------
let addNewTaskBtn = document.querySelector("#toggle-btn");
let modal = document.querySelector(".modal");
let bg = document.querySelector(".bg");
let addTaskBtn = document.querySelector("#add-new-task");

addNewTaskBtn.addEventListener("click", () => {
  modal.classList.toggle("active");
});

bg.addEventListener("click", () => {
  modal.classList.remove("active");
});

// ---------------- ADD NEW TASK ----------------
addTaskBtn.addEventListener("click", () => {
  let taskTitle = document.querySelector("#task-input").value.trim();
  let taskDec = document.querySelector("#dsc-input").value.trim();

  // ✅ FIX: empty task block
  if (!taskTitle && !taskDec) return;

  addtaskelement(taskTitle, taskDec, todo);
  updateCount();

  modal.classList.remove("active");

  document.querySelector("#task-input").value = "";
  document.querySelector("#dsc-input").value = "";
});

