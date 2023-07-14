var arr;
let button = document.getElementById("add_submit");
button.addEventListener("click", populate);
const main = document.getElementById("main");
let i = 0;
function populate() {
    if (document.getElementById("name").value != '') {
        if (document.getElementById("congo") != null) {
            main.removeChild(document.getElementById("congo"));
        }
        if (document.getElementById("task_table") == null) {
            let table = document.createElement("table");
            table.setAttribute("cellspacing", "0px");
            table.setAttribute("id", "task_table");
            table.innerHTML += `<tr>
        <th>S.No.</th>
        <th>Task name.</th>
        <th>Description</th>
        <th>Actions</th>
        </tr>`;
            main.appendChild(table);
            let row = document.createElement("tr");
            i++;
            row.innerHTML = `<td>${i}</td>
        <td>${(document.getElementById("name")).value}</td>
        <td>${document.getElementById("desc").value}</td>
        <td><button class ="delete_button">Done</button></td>`;
            document.getElementById("task_table").appendChild(row);
        }
        else {
            let row = document.createElement("tr");
            i++;
            row.innerHTML = `<td>${i}</td>
        <td>${(document.getElementById("name")).value}</td>
        <td>${document.getElementById("desc").value}</td>
        <td><button class = "delete_button">Done</button></td>`;
            document.getElementById("task_table").appendChild(row);
        }
        document.getElementsByClassName("delete_button")[i - 1].addEventListener("click", task_done);
        // document.getElementsByTagName("input")[0].value = null;//after each task is added the task input is 
        // document.getElementsByTagName("textarea")[0].value = null;//cleared and made empty for the next task

    }
}
function task_done(event) {
    const all_del = document.getElementsByClassName("delete_button");
    let j;
    for (j = 0; j < all_del.length; j++) {
        if (all_del[j] === event.target) {
            let del_row = document.getElementsByTagName("tr")[j + 1];
            let k = 0;
            all_del[j].classList.add("deleting");
            // all_del[j].outerHTML = "<p style =>&#128077</p>";
            for (k = 0; k < 4; k++) {
                console.log(del_row.children[k]);
                del_row.children[k].classList.add("deleting");
            }
            var buttons = document.getElementsByTagName("button");
            for(k =0;k<buttons.length;k++)
            {
                buttons[k].disabled =true; 
            }
            setTimeout(function () {
                document.getElementById("task_table").removeChild(del_row);
                for(k =0;k<buttons.length;k++)
            {
                buttons[k].disabled =false; 
            }
            }, 1000);
            i--;
            break;
        }
    }
    setTimeout(function () {
        while (j < document.getElementsByClassName("delete_button").length) {
            let next_task = document.getElementsByTagName("tr")[j + 1];
            wrong_index_ele = next_task.children[0];
            wrong_index_ele.innerText = wrong_index_ele.innerText - 1;
            j++;
            let k;
        }
        if (document.getElementsByClassName("delete_button").length == 0)
            delete_table();
    }, 1000);
}

function delete_table()//This function will delete the table everytime all the tasks have been executed
{
    main.removeChild(document.getElementsByTagName("table")[0]);
    const para = document.createElement("p");
    para.setAttribute("id", "congo");
    para.innerText = "Congratulations! you have completed all your tasks \uD83E\uDD73";
    main.appendChild(para);
}