import Sortable from "../node_modules/sortablejs/modular/sortable.complete.esm.js";
const inputElement = document.querySelector(".inputElement");
const ulElement = document.querySelector(".list");
const footer = document.querySelector(".footer__body");
const counter = document.querySelector(".item__counter");
const active = document.getElementById("active");
const all = document.getElementById("all");
const completed = document.getElementById("completed");
const footerItem = document.querySelectorAll(".footer__item");
const clear = document.querySelector(".footer__clear");

// function addTotalList() {
//   let a = 0;

//   function increment() {
//     return (a += 1);
//   }

//   return increment;
// }

function count() {
  const allList = document.querySelectorAll(".list__item");
  let c = 0;
  allList.forEach((e) => {
    if (e.style.display != "none") {
      c++;
      console.log(e);
    }
  });
  return c;
}

function resetFooterItem() {
  footerItem.forEach((e) => {
    e.classList.remove("selected");
  });
}
function addNewList(value) {
  return `<li class="list__item default"><span class="checkbox"></span>${value}</li>`;
}

function addCheckBoxListener(element) {
  //element === checkbox
  element.addEventListener("click", () => {
    element.classList.toggle("active");
    if (element.classList.contains("active")) {
      element.parentElement.classList.add("done");
      element.parentElement.classList.remove("default");
    } else {
      element.parentElement.classList.remove("done");
      element.parentElement.classList.add("default");
    }
  });
}

// const totalList = addTotalList();

all.addEventListener("click", () => {
  const allList = document.querySelectorAll(".list__item");
  allList.forEach((e) => {
    e.style.display = "flex";
  });
  resetFooterItem();
  all.classList.add("selected");
  counter.innerHTML = `${count()} items left`;
});

active.addEventListener("click", () => {
  const doneLists = document.querySelectorAll(".done");
  doneLists.forEach((e) => {
    e.style.display = "none";
  });
  const activeLists = document.querySelectorAll(".default");
  activeLists.forEach((e) => {
    e.style.display = "flex";
  });
  resetFooterItem();
  active.classList.add("selected");
  counter.innerHTML = `${count()} items left`;
});

completed.addEventListener("click", () => {
  const activeLists = document.querySelectorAll(".default");
  activeLists.forEach((e) => {
    e.style.display = "none";
  });
  const doneLists = document.querySelectorAll(".done");
  doneLists.forEach((e) => {
    e.style.display = "flex";
  });
  resetFooterItem();
  completed.classList.add("selected");
  counter.innerHTML = `${count()} items left`;
});

clear.addEventListener("click", () => {
  const listItem = document.querySelectorAll(".list__item");
  listItem.forEach((e) => {
    if (e.classList.contains("done")) {
      e.remove();
    }
  });
  counter.innerHTML = `${count()} items left`;
});

window.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && inputElement.value != "") {
    ulElement.insertAdjacentHTML("beforeend", addNewList(inputElement.value));
    inputElement.value = "";

    addCheckBoxListener(ulElement.lastChild.firstChild);
    counter.innerHTML = `${count()} items left`;
  }
});
