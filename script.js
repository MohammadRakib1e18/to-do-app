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
    newListItem.className = "item";

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

form.addEventListener("submit", addNewTask);
deleteAllTask.addEventListener("click", deleteAll);
deleteCTask.addEventListener("click", deleteComplete);
optionButton1.addEventListener("click", optionBtn1Click);
optionButton2.addEventListener("click", optionBtn2Click);
optionButton3.addEventListener("click", optionBtn3Click);

let addBtnFocused = function () {
    taskAddBtn.style.backgroundColor = "#1C3879";
    taskAddBtn.style.color = "white";
};
let addBtnBlur = function () {
    taskAddBtn.style.backgroundColor = "rgba(71, 73, 161, 0.61)";
    taskAddBtn.style.color = "white";
};

newTask.addEventListener("focus", addBtnFocused);
newTask.addEventListener("blur", addBtnBlur);
addBtnBlur();
