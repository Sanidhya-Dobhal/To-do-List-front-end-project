let selectedCategory = null;
const allCategoryPngArr = [
  "./Icons/work.png",
  "./Icons/personal.png",
  "./Icons/otherCategory.png",
];
let toDoList;
let i = 0;
const main = document.getElementById("main");
if (localStorage.getItem("toDoList")) {
  function saveToLocalStorage() {
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
  }
  toDoList = JSON.parse(localStorage.getItem("toDoList"));
} else {
  toDoList = [];
}
if (toDoList.length) {
  tableAndClearButtonGenerator();
  toDoList.forEach((taskObj, index) => {
    let row = document.createElement("tr");
    row.innerHTML =
      taskObj.selectedCategory === null
        ? `<td>${index + 1}</td>
        <td ><div class="task-names"><p style = "margin-left:8px;">${
          taskObj.name
        }</p></div></td>
        <td style = "padding:3px 8px;">${taskObj.desc}</td>
        <td><button class ="done-button">Done</button></td>`
        : `<td>${index + 1}</td>
        <td ><div class="task-names"><img src =${
          taskObj.selectedCategory
        } class = "category-in-table"><p style = "margin-left:8px;">${
            taskObj.name
          }</p></div></td>
        <td style = "padding:3px 8px;">${taskObj.desc}</td>
        <td><button class ="done-button">Done</button></td>`;
    document.getElementsByTagName("tbody")[0].appendChild(row);
    document
      .getElementsByClassName("done-button")
      [index].addEventListener("click", taskDone);
  });
  i = toDoList.length;
}
let button = document.getElementById("add_submit");
button.addEventListener("click", addTask);
document
  .getElementById("name")
  .addEventListener("keypress", onPressEnterOnTaskName);
let j;
function tableAndClearButtonGenerator() {
  let clrButton = document.createElement("button");
  clrButton.setAttribute("class", "add-clr");
  clrButton.setAttribute("id", "clr-button");
  clrButton.innerText = "Clear List";
  document.getElementById("inputs").appendChild(clrButton);
  clrButton.addEventListener("click", clearTable);
  let table = document.createElement("table");
  table.setAttribute("cellspacing", "0px");
  table.setAttribute("id", "task-table");
  table.innerHTML += `<tr>
        <th>S.No.</th>
        <th>Task name</th>
        <th>Description</th>
        <th>Actions</th>
        </tr>`;
  main.appendChild(table);
}
function taskNameFocus() {
  document.getElementById("name").setAttribute("placeholder", "");
}
function taskDescFocus() {
  document.getElementById("descriptionInput").setAttribute("placeholder", "");
}
function addTask() {
  if (document.getElementById("name").value != "") {
    if (document.getElementById("congo") != null) {
      main.removeChild(document.getElementById("congo"));
    }
    if (document.getElementById("msg") != null) {
      main.removeChild(document.getElementById("msg"));
    }
    if (document.getElementsByClassName("msgcls").length != 0) {
      main.removeChild(document.getElementsByClassName("msgcls")[0]);
    }
    if (document.getElementById("task-table") == null) {
      tableAndClearButtonGenerator();
    }
    i++;
    toDoList.push({
      name: document.getElementById("name").value,
      desc: document.getElementById("descriptionInput").value,
      selectedCategory: selectedCategory,
    });
    let row = document.createElement("tr");
    row.innerHTML =
      selectedCategory === null
        ? `<td>${i}</td>
        <td ><div class="task-names"><p style = "margin-left:8px;">${
          document.getElementById("name").value
        }</p></div></td>
        <td style = "padding:3px 8px;">${
          document.getElementById("descriptionInput").value
        }</td>
        <td><button class ="done-button">Done</button></td>`
        : `<td>${i}</td>
        <td ><div class="task-names"><img src =${selectedCategory} class = "category-in-table"><p style = "margin-left:8px;">${
            document.getElementById("name").value
          }</p></div></td>
        <td style = "padding:3px 8px;">${
          document.getElementById("descriptionInput").value
        }</td>
        <td><button class ="done-button">Done</button></td>`;
    document.getElementsByTagName("tbody")[0].appendChild(row);
    document
      .getElementsByClassName("done-button")
      [i - 1].addEventListener("click", taskDone);
    //Resetting input fields
    document.getElementsByTagName("input")[0].value = null; //after each task is added the task input is
    document.getElementsByTagName("textarea")[0].value = null; //cleared and made empty for the next task
    const categoryElements =
      document.getElementsByClassName("category-item-div");
    for (let i = 0; i < categoryElements.length; i++) {
      selectedCategory = null;
      categoryElements[i].classList.remove("selected-category-item-div");
    }
    setTimeout(taskNameWidthHandler, 1);
  }
}
function clearTable() {
  if (confirm("are you sure you want to clear the list ?")) {
    toDoList = [];
    document
      .getElementById("inputs")
      .removeChild(document.getElementById("clr-button"));
    var buttons = document.getElementsByTagName("button");
    for (k = 0; k < buttons.length; k++) {
      buttons[k].disabled = true;
    }
    document.getElementsByTagName("table")[0].classList.add("rem_ani");
    let msg = document.createElement("p");
    msg.setAttribute("id", "msg");
    main.appendChild(msg);
    setTimeout(function () {
      main.removeChild(document.getElementsByTagName("table")[0]);
      msg.innerText = "The list has been cleared !";
      document.getElementById("msg").classList.add("msgcls");
      for (k = 0; k < buttons.length; k++) {
        buttons[k].disabled = false;
      }
    }, 1000);
    i = 0;
  }
}
function taskDone(event) {
  const allDeleteButtons = document.getElementsByClassName("done-button");
  for (j = 0; j < allDeleteButtons.length; j++) {
    if (allDeleteButtons[j] === event.target) {
      toDoList.splice(j, 1);
      let delRow = document.getElementsByTagName("tr")[j + 1]; //as the first row is the heading row
      let k = 0;
      allDeleteButtons[j].classList.add("deleting");
      allDeleteButtons[
        j
      ].outerHTML = `<p style = "background-color:white; text-align:center;">&#128077</p>`;
      for (k = 0; k < 4; k++) {
        delRow.children[k].classList.add("deleting");
        delRow
          .getElementsByClassName("category-in-table")[0]
          ?.classList.add("icon-removing-size-decrease");
      }
      var buttons = document.getElementsByTagName("button");
      for (k = 0; k < buttons.length; k++) {
        buttons[k].disabled = true;
      }
      setTimeout(function () {
        document.getElementsByTagName("tbody")[0].removeChild(delRow);
        for (k = 0; k < buttons.length; k++) {
          buttons[k].disabled = false;
        }
      }, 990);
      i--;
      break;
    }
  }
  if (document.getElementsByClassName("done-button").length == 0) {
    document
      .getElementById("inputs")
      .removeChild(document.getElementById("clr-button"));
  }
  setTimeout(function () {
    while (j < document.getElementsByClassName("done-button").length) {
      let next_task = document.getElementsByTagName("tr")[j + 1];
      wrong_index_ele = next_task.children[0];
      wrong_index_ele.innerText = wrong_index_ele.innerText - 1;
      j++;
      let k;
    }
    if (document.getElementsByClassName("done-button").length == 0)
      deleteTable();
    taskNameWidthHandler();
  }, 1000);
  console.log(toDoList);
}

function deleteTable() {
  //This function will delete the table everytime all the tasks have been executed
  main.removeChild(document.getElementsByTagName("table")[0]);
  const para = document.createElement("p");
  window.innerWidth > 1100
    ? para.setAttribute("id", "congo")
    : para.setAttribute("class", "msgcls");
  para.innerText =
    "Congratulations! you have completed all your tasks \uD83E\uDD73";
  main.appendChild(para);
}
function onPressEnterOnTaskName(event) {
  if (event.key === "Enter") {
    document.getElementById("name").blur();
    document.getElementById("descriptionInput").focus();
  }
}
function selectCategory(event) {
  const categoryElements = document.getElementsByClassName("category-item-div");
  for (let i = 0; i < categoryElements.length; i++) {
    if (
      categoryElements[i] === event.target ||
      categoryElements[i] === event.target.parentNode ||
      categoryElements[i] === event.target.parentNode.parentNode
    ) {
      if (
        categoryElements[i].classList.contains("selected-category-item-div")
      ) {
        selectedCategory = null;
        categoryElements[i].classList.remove("selected-category-item-div");
      } else {
        categoryElements[i].classList.add("selected-category-item-div");
        selectedCategory = allCategoryPngArr[i];
      }
    } else {
      if (categoryElements[i].classList.contains("selected-category-item-div"))
        categoryElements[i].classList.remove("selected-category-item-div");
    }
  }
}

function taskNameWidthHandler() {
  if (document.querySelector("th:nth-child(2)")?.clientWidth < 100) {
    const allTaskName = document.getElementsByClassName("task-names");
    for (let i = 0; allTaskName.length != 0; i + 0) {
      //While can be used, but using for as this is instructive for me that the allTaskName.length automatically -1 after each iteration
      allTaskName[i]?.classList.add("task-names-sm");
      allTaskName[i]?.classList.remove("task-names");
    }
  } else {
    const allTaskName = document.getElementsByClassName("task-names-sm");
    for (let i = 0; allTaskName.length != 0; i + 0) {
      allTaskName[i]?.classList.add("task-names");
      allTaskName[i]?.classList.remove("task-names-sm");
    }
  }
}
window.addEventListener("resize", taskNameWidthHandler);
document.addEventListener("visibilitychange", saveToLocalStorage);
console.log("meow");
