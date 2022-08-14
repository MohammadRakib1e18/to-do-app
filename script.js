/*
    Developer: Mohammad Rakib
*/

let form = document.querySelector(".form");
let newTask = document.querySelector("#new-task");
let taskAddBtn = document.querySelector("#taskAdder");
let todoUl = document.querySelector(".items");
let deleteButton = todoUl.querySelector(".deleteBtn");
let deleteCTask = document.querySelector("#deleteCompleteTask");
let deleteAllTask = document.querySelector("#deleteAllTask");
let optionButton1 = document.querySelector(".optionBtn1");
let optionButton2 = document.querySelector(".optionBtn2");
let optionButton3 = document.querySelector(".optionBtn3");
let uniqueId = 1;
let currentButton = 1;
let isRegister = false;

let allTaskContainer = [];
let tasksLen = 0;

let showAllTask = function (flag = 1) {
    tasksLen = allTaskContainer.length;
    if (flag === -1) {
        for (let i = 0; i < tasksLen; i++) {
            todoUl.removeChild(allTaskContainer[i]);
        }
        allTaskContainer = [];
        return;
    }
    if (!flag) {
        let temp = [];

        for (let i = 0; i < tasksLen; i++) {
            if (allTaskContainer[i].indexId == -1) {
                todoUl.removeChild(allTaskContainer[i]);
            } else {
                temp.push(allTaskContainer[i]);
            }
        }
        allTaskContainer = temp;
        tasksLen = temp.length;
        for (let i = 0; i < tasksLen; i++) {
            todoUl.append(allTaskContainer[i]);
        }
    }
};

let newTaskCreate = function (task) {
    let newListItem = document.createElement("li");
    newListItem.className = "item bg-white";

    let div1 = document.createElement("div");
    let div1Symbol = document.createElement("i");
    let span = document.createElement("span");

    div1.className = "task";
    div1Symbol.className = "far fa-hand-point-right";
    span.innerText = " " + task;
    div1.appendChild(div1Symbol);
    div1.appendChild(span);

    let div2 = document.createElement("div");
    let button1 = document.createElement("button");
    let button2 = document.createElement("button");
    let button3 = document.createElement("button");
    let completeSymbol = document.createElement("i");
    let updateSymbol = document.createElement("i");
    let deleteSymbol = document.createElement("i");

    div2.className = "action";

    button1.className = "actionBtn completeBtn";
    completeSymbol.className = "fas fa-power-off";
    button1.appendChild(completeSymbol);
    button1.append("completed");

    button2.className = "actionBtn updateBtn";
    updateSymbol.className = "fas fa-edit";
    button2.appendChild(updateSymbol);
    button2.append("update");

    button3.className = "actionBtn deleteBtn";
    deleteSymbol.className = "fas fa-trash";
    button3.appendChild(deleteSymbol);
    button3.append("delete");

    div2.appendChild(button1);
    div2.appendChild(button2);
    div2.appendChild(button3);

    newListItem.appendChild(div1);
    newListItem.appendChild(div2);

    return newListItem;
};

let addNewTask = function (event) {
    event.preventDefault();

    if (newTask.value.trim() === "") return;
    let createdTask = newTaskCreate(newTask.value);

    if (!allTaskContainer.length) uniqueId = 0;
    createdTask.indexId = uniqueId++;
    allTaskContainer.push(createdTask);

    optionBtn1Click();
    newTask.value = "";
    addBtnBlur();

    bindDelete(createdTask, deleteTask);
    bindComplete(createdTask, completeTask);
    // bindUPdate(createdTask, updateTask);
};

let deleteTask = function () {
    let deleteBtnParent = this.parentNode;
    let deleteLi = deleteBtnParent.parentNode;
    let temp = [];
    for (let i = 0; i < tasksLen; i++) {
        if (deleteLi != allTaskContainer[i]) {
            temp.push(allTaskContainer[i]);
        }
    }
    allTaskContainer = temp;
    todoUl.removeChild(deleteLi);
    tasksLen--;
};

let bindDelete = function (createdTask, dltTask) {
    let deleteBtn = createdTask.querySelector(".deleteBtn");
    deleteBtn.onclick = dltTask;
};

let completeTask = function () {
    let btnParent = this.parentNode;
    let listItem = btnParent.parentNode;
    listItem.indexId = -1; // flagged as completed task

    let task = listItem.querySelector(".task");
    let symbol = task.querySelector("i");
    symbol.style.display = "none";

    let text = listItem.querySelector("span");
    text.style.color = "green";
    text.style.textDecoration = "line-through";
    if (currentButton === 3) optionBtn3Click();
};

let bindComplete = function (createdTask, cmpltTask) {
    let completeBtn = createdTask.querySelector(".completeBtn");
    completeBtn.onclick = completeTask;
};

let deleteAll = function () {
    showAllTask(-1);
};

let deleteComplete = function () {
    showAllTask(0);
};

let optionBtn1Click = function () {
    currentButton = 1;
    let currentOption = document.querySelector(".optionBtn1");
    currentOption.className = "optionBtn1 selectOptonBtn";
    document.querySelector(".optionBtn2").className = "optionBtn2";
    document.querySelector(".optionBtn3").className = "optionBtn3";

    tasksLen = allTaskContainer.length;
    for (let i = 0; i < tasksLen; i++) {
        todoUl.append(allTaskContainer[i]);
    }
};
let optionBtn2Click = function () {
    currentButton = 2;
    let currentOption = document.querySelector(".optionBtn2");
    currentOption.className = "optionBtn2 selectOptonBtn";
    document.querySelector(".optionBtn1").className = "optionBtn1";
    document.querySelector(".optionBtn3").className = "optionBtn3";

    tasksLen = allTaskContainer.length;
    for (let i = 0; i < tasksLen; i++) {
        todoUl.append(allTaskContainer[i]);
    }
    for (let i = 0; i < tasksLen; i++) {
        if (allTaskContainer[i].indexId != -1) {
            todoUl.removeChild(allTaskContainer[i]);
        }
    }
};
let optionBtn3Click = function () {
    currentButton = 3;
    let currentOption = document.querySelector(".optionBtn3");
    currentOption.className = "optionBtn3 selectOptonBtn";
    document.querySelector(".optionBtn1").className = "optionBtn1";
    document.querySelector(".optionBtn2").className = "optionBtn2";

    tasksLen = allTaskContainer.length;
    for (let i = 0; i < tasksLen; i++) {
        todoUl.append(allTaskContainer[i]);
    }
    for (let i = 0; i < tasksLen; i++) {
        if (allTaskContainer[i].indexId == -1) {
            todoUl.removeChild(allTaskContainer[i]);
        }
    }
};

// let showName = function () {
//     let registerBtn = document.querySelector("#registerBtn");
//     let firstName = document.querySelector("#firstName");
//     let modalSubmitDiv = document.querySelector('.modalSubmitDiv');
//     let submitButton = modalSubmitDiv.querySelector('#modalSubmit');
//     submitButton.setAttribute('data-bs-dismiss', 'modal');
//     console.log(submitButton);
//     // userIcodn.setAttribute('display', 'block');
//     // modalSubmit.setAttribute('data-bs-dismiss', "modal");
//     // registerBtn.append(user);
//     // console.log(user);
//     registerBtn.className = "ms-3 btn text-light";
//     register.style.cursor = "default";
//     registerBtn.style.cursor = "default";
//     registerBtn.innerText = firstName.value;
// };

let showName = function (event) {
    event.preventDefault();

    let modalSubmit = document.querySelector("#modalSubmit");
    let modalShow = document.querySelector("#modalShow");
    let userFirstName = document.querySelector("#firstName");
    let userSecondName = document.querySelector("#secondName");
    let modal = document.querySelector(".modal");

    let userName = userFirstName.value + " " + userSecondName.value + " ";
    if (userName.length > 16) userName = "Anonymous ";
    modalShow.className = "ms-3 btn btn-outline-secondary text-light";
    modalShow.innerHTML = `
        <i class="fas fa-user-alt"></i>
        ${userName}
    `;
    modalSubmit.setAttribute("data-bs-dismiss", "modal");

    modalSubmit.innerText = "Close";
    modalSubmit.className = "btn btn-danger";

    if (modalShow.getAttribute("data-bs-target") == null) {
        modalShow.setAttribute('title', "hello rakib");

    }
    else{
        modalShow.removeAttribute("data-bs-toggle");
        modalShow.removeAttribute("data-bs-target");
    }
};

let modalForm = document.querySelector(".modalForm");
modalForm.addEventListener("submit", showName);
// taskAddBtn.addEventListener("submit", showName);
// modalForm.removeEventListener("submit", showName);

// modalSubmit.addEventListener("click", showName);
form.addEventListener("submit", addNewTask);
deleteAllTask.addEventListener("click", deleteAll);
deleteCTask.addEventListener("click", deleteComplete);
optionButton1.addEventListener("click", optionBtn1Click);
optionButton2.addEventListener("click", optionBtn2Click);
optionButton3.addEventListener("click", optionBtn3Click);

let addBtnFocused = function () {
    if (newTask.value != "") {
        taskAddBtn.style.backgroundColor = "#3B9AE1";
        taskAddBtn.style.color = "white";
    } else {
        addBtnBlur();
    }
};
let addBtnBlur = function () {
    if (newTask.value == "") {
        taskAddBtn.style.backgroundColor = "#0E2A47";
        // taskAddBtn.style.backgroundColor = "#3B9AE1";
        taskAddBtn.style.color = "white";
    }
};

newTask.addEventListener("input", addBtnFocused);
newTask.addEventListener("blur", addBtnBlur);
addBtnBlur();
