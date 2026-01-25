const users = [
  {
    name: "Karan rathor",
    pic: "https://tse1.mm.bing.net/th/id/OET.7252da000e8341b2ba1fb61c275c1f30?w=594&h=594&c=7&rs=1&o=5&pid=1.9",
    bio: "silent chaos in a loud world | not for everyone",
  },
  {
    name: "riya sharma",
    pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH4wV7-iT3xpYm-drAgqhlouCoIqWE_OzREA&s",
    bio: "soft heart, sharp mind | peace over noise",
  },
  {
    name: "ananya singh",
    pic: "https://static.vecteezy.com/system/resources/thumbnails/048/039/211/small/smiling-woman-in-red-dress-cartoon-illustration-of-happy-young-lady-vector.jpg",
    bio: "smiles hide stories | built with resilience",
  },
  {
    name: "kavya mehta",
    pic: "https://img.freepik.com/free-vector/professional-woman-business-attire_1308-176775.jpg?w=360",
    bio: "dreams in progress | focus is power",
  },
  {
    name: "isha verma",
    pic: "https://media.gettyimages.com/id/165754314/vector/beautiful-woman-standing-strong.jpg?s=1024x1024&w=gi&k=20&c=GkgoAK5qhgNu_QwHOuJCoctlZrw1sVvjhe-e_LQos50=",
    bio: "strength with grace | calm but dangerous",
  },
  {
    name: "Rahul kapoor",
    pic: "https://img.freepik.com/free-photo/designer-working-3d-model_23-2149371896.jpg?semt=ais_hybrid&w=740&q=80",
    bio: "creating my own lane | art meets ambition",
  },
  {
    name: "pooja malhotra",
    pic: "https://thumbs.dreamstime.com/b/beautiful-smiling-businesswoman-arms-folded-standing-black-suit-brown-jacket-isolated-white-background-also-105189427.jpg",
    bio: "confidence quietly speaks | no explanations",
  },
];

function showUser(arr) {
  arr.forEach(function (user) {
    // card
    const card = document.createElement("div");
    card.classList.add("card");

    // image
    const img = document.createElement("img");
    img.src =user.pic;

    // content div
    const content = document.createElement("div");
    content.classList.add("content");

    // h3
    const heading = document.createElement("h3");
    heading.innerText = user.name
    heading.classList.add("name");

    // paragraph
    const para = document.createElement("p");
    para.innerText =user.bio
    para.classList.add("bio")
    // append hierarchy
    content.appendChild(heading);
    content.appendChild(para);

    card.appendChild(img);
    card.appendChild(content);

    // finally add card to container
    document.querySelector(".cards").appendChild(card);
  });
}
showUser(users);

let input= document.querySelector("input");
input.addEventListener("input",function(){
  let newarr= users.filter((user)=>{
    return user.name.toLowerCase().startsWith(input.value)
  })
  document.querySelector(".cards").innerHTML="";
  showUser(newarr)
})