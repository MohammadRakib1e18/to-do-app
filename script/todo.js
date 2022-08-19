/*
    Project  : Todo App    
    Release  : 18-Aug-2022    
    Developer: Mohammad Rakib
    Tools    : HTML, CSS, JavaScript
*/

// necessary variables
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
let modalForm = document.querySelector(".modalForm");
let tryAgainBtn = document.querySelectorAll("#try-again");
let uniqueId = 1;
let currentButton = 1;
let isRegister = false;
let toggle = 0;

let allTaskContainer = [];
let tasksLen = 0;

/*========================== <print all tasks> =========================*/
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

/*========================== <create new task> =========================*/
let newTaskCreate = function (task) {
    let newListItem = document.createElement("li");
    newListItem.className = "item bg-white";

    let div1 = document.createElement("div");
    let div1Symbol = document.createElement("i");
    let span = document.createElement("span");

    div1.className = "task";
    div1Symbol.className = "far fa-hand-point-right";

    task = task.charAt(0) + task.slice(1).toLowerCase();
    if (task.length > 35) {
        span.innerText = " " + task.slice(0, 35) + "...";
        span.setAttribute("title", task);
    } else span.innerText = task;

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

/*=================== <time to add the created task> ====================*/
let addNewTask = function (event) {
    event.preventDefault();

    if (newTask.value.trim() === "") return;
    if (!isRegister) return;
    let createdTask = newTaskCreate(newTask.value);

    if (!allTaskContainer.length) uniqueId = 0;
    createdTask.indexId = uniqueId++;
    allTaskContainer.push(createdTask);

    optionBtn1Click();
    newTask.value = "";
    addBtnBlur();

    bindDelete(createdTask, deleteTask);
    bindComplete(createdTask, completeTask);
    bindUpdate(createdTask, updateTask);
};

/*================= <helps to update the task if you wish> ===================*/
let updateTask = function () {
    let modalBodyInput = document.querySelector("#updateModalBody input");
    let currentToDoTextSpan =
        this.parentNode.previousSibling.querySelector("span");
    let currentText = currentToDoTextSpan.innerText;

    currentText = currentText.charAt(0) + currentText.slice(1).toLowerCase();
    modalBodyInput.value = currentText;

    document
        .querySelector("#updateModalSave")
        .addEventListener("click", function () {
            if (modalBodyInput.value.length > 35) {
                currentToDoTextSpan.innerText =
                    modalBodyInput.value.slice(0, 35) + "...";
                currentToDoTextSpan.setAttribute("title", modalBodyInput.value);
            } else currentToDoTextSpan.innerText = modalBodyInput.value;
        });
};

/*=================== <attach update() with the new task> ===================*/
let bindUpdate = function (createdTask, updateTask) {
    let updater = createdTask.querySelector(".updateBtn");
    updater.setAttribute("data-bs-toggle", "modal");
    updater.setAttribute("data-bs-target", "#updateModal");
    updater.onclick = updateTask;
};

/*================= <helps to delete the task if you wish> ===================*/
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

/*=================== <attach bindDelete() with the new task> ===================*/
let bindDelete = function (createdTask, dltTask) {
    let deleteBtn = createdTask.querySelector(".deleteBtn");
    deleteBtn.onclick = dltTask;
};

/*================= <mark the completed the task> ===================*/
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

/*=================== <attach complete() with the new task> ===================*/
let bindComplete = function (createdTask, cmpltTask) {
    let completeBtn = createdTask.querySelector(".completeBtn");
    completeBtn.onclick = completeTask;
};

let deleteAll = function () {
    showAllTask(-1);
};

let deleteComplete = function () {
    showAllTask(0);
    if (currentButton == 2) {
        optionBtn2Click();
    }
};

/*=========== <Tab(inside the todo container): show all the tasks> ===========*/
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

/*======== <Tab(inside the todo container): show only the completed tasks> =====*/
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

/*====== <Tab(inside the todo container): show the remaining todo tasks> =========*/
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

/*================= <registration ans display user name> ===================*/

let reTry = function(event){
    let modalSubmit = document.querySelector("#modalSubmit");
    document.getElementById("password").value = "";
    document.getElementById("confirmPassword").value = "";
    modalSubmit.innerText = "submit";
    modalSubmit.className = "btn btn-primary";
    modalSubmit.removeAttribute("data-bs-toggle");
    modalSubmit.removeAttribute("data-bs-target");
}

let showName = function (event) {
    event.preventDefault();
    let modalSubmit = document.querySelector("#modalSubmit");
    //  matching password and confirm password
    if (password.value !== confirmPassword.value) {
        console.log("didn't match");
        modalSubmit.innerText = "Warning";
        modalSubmit.className = "btn btn-outline-warning text-light fw-bold";
        modalSubmit.setAttribute("data-bs-toggle", "modal");
        modalSubmit.setAttribute("data-bs-target", "#passwordMatchingModal");
        return;
    }

    isRegister = true;

    let modalShow = document.querySelector("#modalShow");
    let userFirstName = document.querySelector("#firstName");
    let userSecondName = document.querySelector("#secondName");

    let userName = userFirstName.value + " " + userSecondName.value + " ";
    if (userName.length > 16) userName = "Anonymous ";
    modalShow.className = "ms-3 btn btn-outline-info text-light";
    modalShow.innerHTML = `
        <i class="fas fa-user-alt"></i>
        ${userName}
    `;
    modalSubmit.setAttribute("data-bs-dismiss", "modal");

    modalSubmit.innerText = "Close";
    modalSubmit.className = "btn btn-danger";

    if (modalShow.getAttribute("data-bs-target") == null) {
        modalShow.setAttribute("data-bs-toggle", "modal");
        modalShow.setAttribute("data-bs-target", "#exampleModal");

        // success img show
        let successImg1 = document.querySelector("#successImg1");
        let successImg2 = document.querySelector("#successImg2");
        modalShow.addEventListener("click", function () {
            if (toggle % 2 == 0) {
                successImg1.style.display = "block";
                successImg2.style.display = "none";
                console.log("odd: ", toggle);
                toggle++;
            } else {
                successImg2.style.display = "block";
                successImg1.style.display = "none";
                console.log("even: ", toggle);
                toggle++;
            }
        });
    } else {
        modalShow.removeAttribute("data-bs-toggle");
        modalShow.removeAttribute("data-bs-target");
        taskAddBtn.removeAttribute("data-bs-toggle");
        taskAddBtn.removeAttribute("data-bs-target");
    }
};

let addBtnFocused = function () {
    if (newTask.value != "") {
        taskAddBtn.style.backgroundColor = "#3B9AE1";
        taskAddBtn.style.color = "white";
        taskAddBtn.style.cursor = "pointer";
    } else {
        addBtnBlur();
    }
};
let addBtnBlur = function () {
    if (newTask.value == "") {
        taskAddBtn.style.backgroundColor = "#0E2A47";
        taskAddBtn.style.color = "white";
        taskAddBtn.style.cursor = "not-allowed";
    }
};

// attach necessary event liseners

tryAgainBtn[0].addEventListener("click", reTry);
tryAgainBtn[1].addEventListener("click", reTry);
modalForm.addEventListener("submit", showName);
form.addEventListener("submit", addNewTask);
deleteAllTask.addEventListener("click", deleteAll);
deleteCTask.addEventListener("click", deleteComplete);
optionButton1.addEventListener("click", optionBtn1Click);
optionButton2.addEventListener("click", optionBtn2Click);
optionButton3.addEventListener("click", optionBtn3Click);
newTask.addEventListener("input", addBtnFocused);
newTask.addEventListener("blur", addBtnBlur);

addBtnBlur(); // display the default look of the task adder button.
