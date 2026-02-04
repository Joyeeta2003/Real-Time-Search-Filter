let form = document.querySelector(".form-box");
let img = document.querySelector("#image");
let userName = document.querySelector("#name");
let bio = document.querySelector("#bio");

let userManager = {
  users: [],

  init: function () {
    form.addEventListener("submit", this.submitForm.bind(this));
  },

  submitForm: function (e) {
    e.preventDefault();
    this.addUser();
  },

  addUser: function () {
    this.users.push({
      img: img.value,
      userName: userName.value,
      bio: bio.value,
    });

    form.reset();
    this.renderUi();
  },

  renderUi: function () {
    const cardArea = document.querySelector(".card-area");
    cardArea.innerHTML = "";

    this.users.forEach((user, index) => {
      const card = document.createElement("div");
      card.className = "card";

      const image = document.createElement("img");
      image.src = user.img;

      const h3 = document.createElement("h3");
      h3.innerText = user.userName;

      const p = document.createElement("p");
      p.innerText = user.bio;
      p.className = "para";

      const btn = document.createElement("button");
      btn.innerText = "Remove";
      btn.classList.add("butn");

      // ✅ remove correct user
      btn.addEventListener("click", () => {
        this.removeUser(index);
      });

      card.appendChild(image);
      card.appendChild(h3);
      card.appendChild(p);
      card.appendChild(btn);

      cardArea.appendChild(card);
    });
  },

  removeUser: function (index) {
    this.users.splice(index, 1);
    this.renderUi();
  },
};

userManager.init();

