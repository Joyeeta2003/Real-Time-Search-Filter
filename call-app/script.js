let addNote = document.querySelector("#addNote");
let formContainer = document.querySelector(".form-container");
let cardContainer = document.querySelector(".card-container");
let closeForm = document.querySelector(".closeForm");
const stack = document.querySelector(".stack");
const upBtn = document.querySelector(".upBtn");
const downBtn = document.querySelector(".downBtn");

const form = document.querySelector("form");
const imageInput = document.querySelector("#image");
const nameInput = document.querySelector("#fullName");
const townInput = document.querySelector("#homeTown");
const purposeInput = document.querySelector("#purpose");
const categoryRadios = document.querySelectorAll('input[name="category"]');
const submitBtn = document.querySelector(".submit-btn");

//CORE STARTS HERE
function saveTolocalStorage(obj) {
  if (localStorage.getItem("tasks") === null) {
    let oldTask = [];
    oldTask.push(obj);
    localStorage.setItem("tasks", JSON.stringify(oldTask));
  } else {
    let oldTask = localStorage.getItem("tasks");
    oldTask = JSON.parse(oldTask);
    oldTask.push(obj);
    localStorage.setItem("tasks", JSON.stringify(oldTask));
  }
}
addNote.addEventListener("click", () => {
  formContainer.classList.remove("hide");
  cardContainer.classList.add("hide");
});

closeForm.addEventListener("click", () => {
  formContainer.classList.add("hide");
  cardContainer.classList.remove("hide");
});

function isValidImageURL(url) {
  // Accept any URL as valid
  return true;
}

function isValidName(name) {
  const pattern = /^[a-zA-Z ]{3,}$/;
  return pattern.test(name);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // IMAGE URL validation
  const imageUrl = imageInput.value.trim();
  if (!isValidImageURL(imageUrl)) {
    alert("Please enter a valid image URL (.jpg, .png, .jpeg, .webp)");
    return;
  }

  // FULL NAME validation
  const fullName = nameInput.value.trim();
  if (!isValidName(fullName)) {
    alert("Full Name must contain only letters and spaces (min 3 characters)");
    return;
  }

  // HOME TOWN validation
  const town = townInput.value.trim();
  if (town.length < 2) {
    alert("Home Town must be at least 2 characters long");
    return;
  }

  // PURPOSE validation
  const purpose = purposeInput.value.trim();
  if (purpose.length < 5) {
    alert("Purpose must be at least 5 characters long");
    return;
  }
  // 🔥 CATEGORY (NEW)
  const selectedCategory = document.querySelector(
    'input[name="category"]:checked',
  );

  if (!selectedCategory) {
    alert("Please select a category");
    return;
  }

  // ✅ ALL PASSED
  alert("✅ Note created successfully!");

  saveTolocalStorage({
    imageUrl,
    fullName,
    town,
    purpose,
    category: selectedCategory.value,
  });

  form.reset();
  formContainer.classList.add("hide");
  cardContainer.classList.remove("hide");
});

function addCard(task, index) {
  const card = document.createElement("div");
  card.classList.add("card");

  // 🔥 deck effect (behind, not down)
  card.style.transform = `translateY(${index * 10}px) scale(${1 - index * 0.03})`;
  card.style.zIndex = 100 - index;

  // Profile pic
  const profilePic = document.createElement("img");
  profilePic.src = task.imageUrl;
  profilePic.onerror = () => {
    profilePic.src = "https://via.placeholder.com/50";
  };
  profilePic.classList.add("profile-pic");
  card.appendChild(profilePic);

  // Name
  const name = document.createElement("div");
  name.classList.add("name");
  name.textContent = task.fullName;
  card.appendChild(name);

  // Home town
  const info1 = document.createElement("div");
  info1.classList.add("info");
  info1.innerHTML = `<div>Home town</div><div>${task.town}</div>`;
  card.appendChild(info1);

  // Purpose
  const info2 = document.createElement("div");
  info2.classList.add("info");
  info2.innerHTML = `<div>Purpose</div><div>${task.purpose}</div>`;
  card.appendChild(info2);

  // Buttons
  const buttons = document.createElement("div");
  buttons.classList.add("buttons");

  const callBtn = document.createElement("button");
  callBtn.classList.add("call-btn");
  callBtn.textContent = "Call";

  const msgBtn = document.createElement("button");
  msgBtn.classList.add("message-btn");
  msgBtn.textContent = "Message";

  buttons.appendChild(callBtn);
  buttons.appendChild(msgBtn);
  card.appendChild(buttons);

  // Color dots
  const colorDots = document.createElement("div");
  colorDots.classList.add("color-dots");
  ["black", "purple", "brown", "teal"].forEach((c) => {
    const dot = document.createElement("span");
    dot.classList.add(c);
    colorDots.appendChild(dot);
  });
  card.appendChild(colorDots);

  stack.appendChild(card);
}
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach((task, index) => {
  addCard(task, index);
});

function moveCard(direction) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  if (tasks.length < 2) return;

  if (direction === "up") {
    const last = tasks.pop();
    tasks.unshift(last);
  } else if (direction === "down") {
    const first = tasks.shift();
    tasks.push(first);
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));

  stack.innerHTML = "";
  tasks.forEach((task, index) => {
    addCard(task, index);
  });
}

document.getElementById("upBtn").addEventListener("click", () => {
  moveCard("up");
});

document.getElementById("downBtn").addEventListener("click", () => {
  moveCard("down");
});

