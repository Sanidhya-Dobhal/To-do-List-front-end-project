let selectedCategory = null;
const allCategoryPngArr = ["./Icons/work.png","./Icons/personal.png","./Icons/otherCategory.png"];
let button = document.getElementById("add_submit");
button.addEventListener("click", addTask);
document
  .getElementById("name")
  .addEventListener("keypress",onClickTaskNameHandler);
const main = document.getElementById("main");
let i = 0;
let j;
function taskNameFocus()
{
  document.getElementById("name").setAttribute("placeholder","");
}
function taskDescFocus()
{
  document.getElementById("descriptionInput").setAttribute("placeholder","");
}
function addTask() {
  console.log("selectedElem",selectedCategory);
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
      let clr = document.createElement("button");
      clr.setAttribute("class", "add-clr");
      clr.setAttribute("id", "clr-button");
      clr.innerText = "Clear List";
      document.getElementById("inputs").appendChild(clr);
      let clr_button = document.getElementById("clr-button");
      clr_button.addEventListener("click", clearTable);
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
      let row = document.createElement("tr");
      i++;
      row.innerHTML = selectedCategory===null?`<td>${i}</td>
        <td ><div class="task-names"><p style = "margin-left:8px;">${document.getElementById("name").value}</p></div></td>
        <td style = "padding:0px 8px;">${document.getElementById("descriptionInput").value}</td>
        <td><button class ="done-button">Done</button></td>`:
        `<td>${i}</td>
        <td ><div class="task-names"><img src =${selectedCategory} class = "category-in-table"><p style = "margin-left:8px;">${document.getElementById("name").value}</p></div></td>
        <td style = "padding:0px 8px;">${document.getElementById("descriptionInput").value}</td>
        <td><button class ="done-button">Done</button></td>`;
      document.getElementById("task-table").getElementsByTagName('tbody')[0].appendChild(row);
    document
      .getElementsByClassName("done-button")
      [i - 1].addEventListener("click", taskDone);
      //Resting input fields
    document.getElementsByTagName("input")[0].value = null; //after each task is added the task input is
    document.getElementsByTagName("textarea")[0].value = null; //cleared and made empty for the next task
    const categoryElements = document.getElementsByClassName("category-item-div");
    for (let i = 0; i < categoryElements.length; i++) {
      selectedCategory = null;
      categoryElements[i].classList.remove("selected-category-item-div");
    }
  }
}
function clearTable() {
  if (confirm("are you sure you want to clear the list ?")) {
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
      let delRow = document.getElementsByTagName("tr")[j + 1];
      let k = 0;
      allDeleteButtons[j].classList.add("deleting");
      allDeleteButtons[j].outerHTML = "<p style = background-color:white;>&#128077</p>";
      for (k = 0; k < 4; k++) {
        delRow.children[k].classList.add("deleting");
        delRow.getElementsByClassName("category-in-table")[0]?.classList.add("icon-removing-size-decrease");
      }
      var buttons = document.getElementsByTagName("button");
      for (k = 0; k < buttons.length; k++) {
        buttons[k].disabled = true;
      }
      setTimeout(function () {
        document.getElementById("task-table").getElementsByTagName("tbody")[0].removeChild(delRow);
        for (k = 0; k < buttons.length; k++) {
          buttons[k].disabled = false;
        }
      }, 999);
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
  }, 1000);
}

function deleteTable() {
  //This function will delete the table everytime all the tasks have been executed
  main.removeChild(document.getElementsByTagName("table")[0]);
  const para = document.createElement("p");
  if (window.innerWidth > 1100) {
    para.setAttribute("id", "congo");
  } else {
    para.setAttribute("class", "msgcls");
  }
  para.innerText =
    "Congratulations! you have completed all your tasks \uD83E\uDD73";
  main.appendChild(para);
}
function onClickTaskNameHandler(event) {
  if (event.key === "Enter") {
    document.getElementById("name").blur();
    document.getElementById("descriptionInput").focus();
  }
}
function selectCategory(event) {
  const categoryElements = document.getElementsByClassName("category-item-div");
  for (let i = 0; i < categoryElements.length; i++) {
    if (categoryElements[i] === event.target || categoryElements[i] === event.target.parentNode || categoryElements[i] === event.target.parentNode.parentNode) {
      if (categoryElements[i].classList.contains("selected-category-item-div"))
        {
          selectedCategory = null;
          categoryElements[i].classList.remove("selected-category-item-div");
        }
      else {
        categoryElements[i].classList.add("selected-category-item-div");
        selectedCategory = allCategoryPngArr[i];
      }
    }
    else{
      if (categoryElements[i].classList.contains("selected-category-item-div"))
        categoryElements[i].classList.remove("selected-category-item-div");
    }
  }
}
