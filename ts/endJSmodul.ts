//1.ColorPicker//////////////////////
import { Color } from "./endColors.js";
const redInput = document.getElementById("red-color") as HTMLInputElement;
const greenInput = document.getElementById("green-color") as HTMLInputElement;
const blueInput = document.getElementById("blue-color") as HTMLInputElement;
const seeColor = document.getElementById("see-color") as HTMLDivElement;
const btnColor = document.getElementById("btn-color") as HTMLButtonElement;
const btnClearInput = document.getElementById(
  "btn-clear-input"
) as HTMLButtonElement;
const fColor = document.getElementById("favorite-color") as HTMLDivElement;

let favoriteColors: Color[] = [];
//initial load//
let favStrfromDisk = localStorage.getItem("Favorite colors") ?? "[]";
const favColorFromDisk: Color[] = JSON.parse(favStrfromDisk);
favoriteColors = favColorFromDisk;

for (const c of favoriteColors) {
  const color = new Color(c.r, c.g, c.b);
  const favCard = document.createElement("div");
  favCard.classList.add("card", "rounded", "col-5", "m-1");
  favCard.style.width = `120px`;
  favCard.style.height = `120px`;
  favCard.innerText = `${color.rgb} ${color.hex}`;
  fColor.appendChild(favCard);
  favCard.style.background = color.rgb;
}
//to add the color//
btnColor.addEventListener("click", () => {
  const red = +redInput.value;
  const green = +greenInput.value;
  const blue = +blueInput.value;
  const color = new Color(red, green, blue);
  const colorCard = document.createElement("div");
  colorCard.classList.add("card", "rounded", "col-5", "m-1");
  colorCard.style.width = `120px`;
  colorCard.style.height = `120px`;
  colorCard.innerText = `${color.rgb} ${color.hex}`;
  seeColor.appendChild(colorCard);
  colorCard.style.background = color.rgb;

  //to clear input for the next color//
  btnClearInput.addEventListener("click", () => {
    redInput.value = "";
    greenInput.value = "";
    blueInput.value = "";
  });

  //to add the color to favorites//
  colorCard.addEventListener("click", () => {
    const favCard = document.createElement("div");
    favCard.classList.add("card", "rounded", "col-5", "m-1");
    favCard.style.width = `120px`;
    favCard.style.height = `120px`;
    favCard.innerText = `${color.rgb} ${color.hex}`;
    fColor.appendChild(favCard);
    favCard.style.background = color.rgb;
    favoriteColors.push(color);
    localStorage.setItem("Favorite colors", JSON.stringify(favoriteColors));
  });
});

//2.Search Bar with Drop Down Menu///////////////////////////////////
import { City } from "./endCities.js";

let cityInput = document.getElementById("city-input") as HTMLInputElement;
const cityList = document.querySelector(".all-cities") as HTMLUListElement;
const addCityBtn = document.getElementById("add-city") as HTMLButtonElement;
const allCitiesBtn = document.getElementById("all-cities") as HTMLButtonElement;
const chosenCity = document.getElementById("chosen-city") as HTMLDivElement;
let cities: City[] = [
  { name: "Tokyo" },
  { name: "Delhi" },
  { name: "Shanghai" },
  { name: "Dhaka" },
  { name: "San Paulo" },
  { name: "Mexico City" },
  { name: "Cairo" },
  { name: "Beijing" },
  { name: "Mumbai" },
  { name: "Osaka" },
];

//sorting/////
function sortArray(cities: City[]) {
  cities.sort((a, b) => {
    let na = a.name.toLowerCase(),
      nb = b.name.toLowerCase();

    if (na < nb) {
      return -1;
    }
    if (na > nb) {
      return 1;
    }
    return 0;
  });
}

//initial load//
let strCityFromDisc = localStorage.getItem("Cities");
if (strCityFromDisc === null) {
  localStorage.setItem("Cities", JSON.stringify(cities));
} else {
  const cityFromDisc = JSON.parse(strCityFromDisc);
  cities = cityFromDisc;
}
sortArray(cities);

//to add the city which is not in the list///
addCityBtn.addEventListener("click", () => {
  const cityValue = cityInput.value;
  const city = new City(cityValue);
  cities.push(city);
  localStorage.setItem("Cities", JSON.stringify(cities));
  sortArray(cities);
});

//to see the list of all cities///////////
allCitiesBtn.addEventListener("click", () => {
  cities.forEach((c) => {
    const cityOfAll = document.createElement("li");
    cityOfAll.classList.add("city-item");
    cityOfAll.innerText = c.name;
    cityList.appendChild(cityOfAll);
    const btnToReset = document.createElement("button");
    btnToReset.classList.add("d-none");
    btnToReset.type = "button";
    btnToReset.innerText = `click to reset the color`;
    cityList.appendChild(btnToReset);
    //to change the color onclick/////
    cityOfAll.addEventListener("click", () => {
      cityOfAll.style.color = "red";
      btnToReset.classList.remove("d-none");
    });
    //to change the color on double click/////
    cityOfAll.addEventListener("dblclick", () => {
      cityOfAll.style.color = "blue";
    });
    //to reset the color of the city////////
    btnToReset.addEventListener("click", () => {
      cityOfAll.style.color = "";
      btnToReset.classList.add("d-none");
    });
  });
  allCitiesBtn.disabled = true;
});

//to search the city in the list
cityInput.addEventListener("input", () => {
  document.querySelectorAll(".city-item").forEach((e) => e.remove());
  const cityValue = cityInput.value;
  cityValue.toLowerCase();
  if (cityValue.length === 0) {
    return;
  }
  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().startsWith(cityValue)
  );

  const liArray = filteredCities.map((c) => {
    const li = document.createElement("li");
    li.classList.add("city-item");
    li.innerText = c.name;
    return li;
  });
  liArray.forEach((li) => {
    cityList.appendChild(li);
    li.addEventListener("click", (c) => {
      chosenCity.innerText = li.innerText;
      return;
    });
  });
});

///////3.	מיון ערכים במערך///////////
const inputNumber = document.getElementById("input-number") as HTMLInputElement;
const addNumberBtn = document.getElementById("add-number") as HTMLButtonElement;
const randNumberBtn = document.getElementById(
  "add-random-number"
) as HTMLButtonElement;
const listOfNumbers = document.getElementById(
  "array-of-numbers"
) as HTMLDivElement;
const sortArrayBtn = document.getElementById("sort-array") as HTMLButtonElement;
const sortedList = document.getElementById("sorted-array") as HTMLDivElement;
const sortArraySizeBtn = document.getElementById(
  "sort-array-size"
) as HTMLButtonElement;
const sortedListSize = document.getElementById(
  "sorted-arrays-size"
) as HTMLDivElement;

const arrayNumbers: number[] = [];
import { Utils } from "./utils.js";
//entering the number from input///
addNumberBtn.addEventListener("click", () => {
  const inputNum = +inputNumber.value;
  const number = inputNum;
  arrayNumbers.push(number);
  listOfNumbers.innerText = `${arrayNumbers}`;
});
///entering random number////
randNumberBtn.addEventListener("click", () => {
  let randNum = Utils.random(0, 101);
  arrayNumbers.push(randNum);
  listOfNumbers.innerText = `${arrayNumbers}`;
});
//sorting array without sort method////
sortArrayBtn.addEventListener("click", () => {
  Utils.bubbleSort(arrayNumbers);
  sortedList.innerText = `${arrayNumbers}`;
});

//sorting array to  small-middle-big////

sortArraySizeBtn.addEventListener("click", () => {
  let smallArrayNum: number[] = [];
  let middleArrayNum: number[] = [];
  let bigArrayNum: number[] = [];
  arrayNumbers.map((n) => {
    if (n >= 0 && n <= 30) {
      smallArrayNum.push(n);
      Utils.bubbleSort(smallArrayNum);
    } else if (n > 30 && n <= 60) {
      middleArrayNum.push(n);
      Utils.bubbleSort(middleArrayNum);
    } else if (n > 60 && n <= 100) {
      bigArrayNum.push(n);
      Utils.bubbleSort(bigArrayNum);
    }
  });
  const smallArray = document.createElement("div");
  smallArray.innerText = `Array 0-30:  ${smallArrayNum}`;
  sortedListSize.appendChild(smallArray);
  const middleArray = document.createElement("div");
  middleArray.innerText = `Array 31-60:  ${middleArrayNum}`;
  sortedListSize.appendChild(middleArray);
  const bigArray = document.createElement("div");
  bigArray.innerText = `Array 61-100:  ${bigArrayNum}`;
  sortedListSize.appendChild(bigArray);
});

/////the game with Animals////////
import { runners, AnimalType, Animal, animalArray } from "./animals.js";
const startAnimals = document.getElementById(
  "beginning-show"
) as HTMLDivElement;
const alignBtn = document.getElementById("align") as HTMLButtonElement;
const getBtn = document.getElementById(
  "get-playing-animal"
) as HTMLButtonElement;
const startBtn = document.getElementById("btn-start") as HTMLButtonElement;
const playingAnimals = document.getElementById(
  "animal-show-case"
) as HTMLDivElement;
//the picture before the start//
/* animalArray
  .map((animal) => {
    const image = document.createElement("img");
    image.src = `images/${animal.img}`;
    image.classList.add("column", "m-3","start-animal");
    image.id = animal.id;
    return image;
  })
  .forEach((img) => {
    startAnimals.appendChild(img);
  }); */
//aligning on the start line:
alignBtn.addEventListener("click", () => {
  startAnimals.classList.add("d-none");
  animalArray
    .sort((a, b) => (Math.random() > 0.5 ? 1 : -1))
    .map((animal) => {
      const image = document.createElement("img");
      image.src = `images/${animal.img}`;
      image.classList.add("row", "m-3");
      image.id = animal.id;
      return image; //קיבלנו מערך של תמונות
    })
    .forEach((img) => {
      playingAnimals.appendChild(img);
    });
  alignBtn.disabled = true;
});
//to get the random Animal///
getBtn.addEventListener("click", () => {
  document
    .querySelectorAll("#animal-show-case img")
    .forEach((img) => img.classList.remove("chosen-animal"));
  const random = Utils.random(0, 4);
  const chosenAnimal = animalArray[random];
  chosenAnimal.isChosen = true;

  const img = document.getElementById(chosenAnimal.id) as HTMLImageElement;
  img.classList.add("chosen-animal");

  getBtn.disabled = true;

  ///to start the race///

  startBtn.addEventListener("click", () => {
    setTimeout(() => {
      const audio = new Audio(`./media/media_${chosenAnimal.voice}.wav`);
      audio.play();

      setInterval(() => {
        chosenAnimal.translateX += Utils.random(0.5, 10) * chosenAnimal.step;
        img.style.transform = `translateX(${chosenAnimal.translateX}px)`;
        img.style.transition = `all 1s ease-in-out`;

        if (
          img.getBoundingClientRect().x >
          document.body.getBoundingClientRect().width
        ) {
          chosenAnimal.translateX = 0;
          chosenAnimal.isChosen = false;
          chosenAnimal.step = 0;
        }
      }, 500);
    }, 1000);
  });
});

///vipList ex/////////////
const list = document.getElementById("vip-list") as HTMLUListElement;
import { json_ar } from "./vipList.js";

let vList = json_ar.map((o) => {
  let oneVip = document.createElement("li");
  oneVip.classList.add("card");
  oneVip.innerText = `Name: ${o.name},
    Worth: ${o.worth},
    Source: ${o.source}`;
  const imgVip = document.createElement("img");
  imgVip.src = `${o.image}`;
  imgVip.width = 200;
  imgVip.height = 200;
  oneVip.appendChild(imgVip);
  list.appendChild(oneVip);
  oneVip.addEventListener("click", () => {
    oneVip.classList.add("d-none");
    /*  console.log(oneVip); */
  });
});

//To-do Manager ex////////////

import { Task } from "./tasks.js";
import { tm } from "./task-manager.js";

const tasksDiv = document.getElementById("tasks") as HTMLDivElement;
const todoDescription = document.getElementById(
  "todo-description"
) as HTMLInputElement;
const btnAddTodo = document.getElementById("btn-add-todo") as HTMLButtonElement;

//initial load from Local storage//
let tasksArrayStr = localStorage.getItem("Task Manager") ?? "[]";
console.log(tasksArrayStr);
const tasksFromDisk: Task[] = JSON.parse(tasksArrayStr);
console.log(tasksFromDisk);
tm.tasks = tasksFromDisk;

for (const t of tm.tasks) {
  addTaskToHTML(t);
}

btnAddTodo.addEventListener("click", () => {
  let text = todoDescription.value;
  let task = new Task(text);
  tm.addTask(task);
  addTaskToHTML(task);
});

function addTaskToHTML(task: Task) {
  let row = document.createElement("div");
  row.classList.add("task", "row", "bg-secondary", "p-3", "m-3", "d-flex");
  row.id = task.timeStamp;
  let input = document.createElement("input");
  input.classList.add("col-9");
  input.placeholder = "description";
  input.disabled = true;
  input.value = task.description;

  input.addEventListener("input", () => {
    task.description = input.value;
    tm.updateTask(task);
  });

  let btnEdit = document.createElement("button");
  btnEdit.classList.add("btn", "btn-warning", "col", "text-light");
  btnEdit.innerHTML = 'Edit: <i class="bi bi-pencil-square"></i>';
  btnEdit.addEventListener("click", () => {
    input.disabled = !input.disabled;
  });

  let btnDelete = document.createElement("button");
  btnDelete.classList.add("btn", "btn-danger", "col");
  btnDelete.innerHTML = 'Delete: <i class="bi bi-trash3-fill"></i>';
  btnDelete.addEventListener("click", () => {
    tm.removeTask(task.timeStamp);
    deleteTaskFromHTML(task);
  });
  let btnCompleted = document.createElement("button");
  btnCompleted.classList.add("btn", "btn-success", "col");
  btnCompleted.innerHTML = 'To do:<i class="bi bi-hourglass-split"></i>';
  btnCompleted.addEventListener("click", () => {
    btnCompleted.innerHTML =
      'Completed! <i class="bi bi-check-circle-fill"></i>';
  });

  row.appendChild(input);
  row.appendChild(btnEdit);
  row.appendChild(btnDelete);
  row.appendChild(btnCompleted);
  tasksDiv.appendChild(row);
}

function deleteTaskFromHTML(task: Task) {
  document.getElementById(task.timeStamp)?.remove();
}
