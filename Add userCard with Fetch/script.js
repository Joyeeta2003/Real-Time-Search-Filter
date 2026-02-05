function getUser() {
    fetch("https://randomuser.me/api/?results=3")
.then((rawdata)=> rawdata.json())
.then((data)=> {
    document.querySelector(".users").innerHTML="";
    data.results.forEach(user => {
  // card
  const card = document.createElement("div");
  card.className =
    "bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition";

  // top color
  const top = document.createElement("div");
  top.className = "h-16 bg-gradient-to-r from-blue-500 to-purple-600";

  // cards
  const cards = document.createElement("div");
  cards.className = "px-4 pb-4";

  // image wrapper
  const imgBox = document.createElement("div");
  imgBox.className = "flex justify-center -mt-12 mb-2";

  const img = document.createElement("img");
  img.src = user.picture.large;
  img.className = "w-24 h-24 rounded-full border-4 border-white";

  imgBox.appendChild(img);

  // name
  const name = document.createElement("h2");
  name.innerText = user.name.first + " " + user.name.last;
  name.className = "text-center font-bold";

  // username
  const username = document.createElement("p");
  username.innerText = user.gender;
  username.className = "text-center text-blue-600 text-sm";

  // buttons
  const btnBox = document.createElement("div");
  btnBox.className = "flex gap-2 mt-3";

  const followBtn = document.createElement("button");
  followBtn.innerText = "Follow";
  followBtn.className = "flex-1 bg-blue-600 text-white py-1 rounded";

  const msgBtn = document.createElement("button");
  msgBtn.innerText = "Message";
  msgBtn.className = "flex-1 bg-gray-200 py-1 rounded";

  btnBox.append(followBtn, msgBtn);

  // body assemble
  cards.append(imgBox, name, username, btnBox);

  // card assemble
  card.append(top, cards);

  // finally add to page
  container.appendChild(card);
});
 });
}

getUser();
let refreshbtn=document.querySelector(".refresh-btn")
refreshbtn.addEventListener("click", function(){
    getUser();
})