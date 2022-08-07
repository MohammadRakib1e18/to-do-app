/*
    Developer: Mohammad Rakib
*/

let form = document.querySelector('.form');
let newTask = document.querySelector('#new-task');
let taskAddBtn = document.querySelector('#taskAdder');
let todoUl = document.querySelector(".items");
let deleteButton = todoUl.querySelector('.deleteBtn');
let deleteCompleteTask = document.querySelector('#deleteCompleteTask');
let deleteAllTask = document.querySelector('#deleteAllTask');

let allTaskContainer=[];
let completeTaskContainer = [];
let todoTaskContainer = [];
let tasksLen=0;

let showAllTask = function(flag=1){
    tasksLen=allTaskContainer.length;
    if(flag== -1){
        for(let i=0; i<tasksLen; i++){
            allTaskContainer[i].remove();
        }
        allTaskContainer=[];
        return;
    }
    
    console.log(tasksLen);
    for(let i=0; i<tasksLen; i++){
        todoUl.append(allTaskContainer[i]);
    }
}

let newTaskCreate = function(task){
    let newListItem = document.createElement('li');
    newListItem.className="item";

    let div1 = document.createElement('div');
    let div1Symbol = document.createElement('i');
    let span   = document.createElement('span');
    
    div1.className="task";
    div1Symbol.className="far fa-hand-point-right";
    span.innerText = " "+task;
    div1.appendChild(div1Symbol);
    div1.appendChild(span);

    let div2 = document.createElement('div');
    let button1=document.createElement("button");
    let button2=document.createElement("button");
    let button3=document.createElement("button");
    let completeSymbol = document.createElement('i');
    let updateSymbol = document.createElement('i');
    let deleteSymbol = document.createElement('i');

    div2.className="action";

    button1.className="actionBtn completeBtn";
    completeSymbol.className="fas fa-power-off";
    button1.appendChild(completeSymbol);
    button1.append("completed");
    
    button2.className="actionBtn updateBtn";
    updateSymbol.className="fas fa-edit";
    button2.appendChild(updateSymbol);
    button2.append("update");

    button3.className="actionBtn deleteBtn";
    deleteSymbol.className="fas fa-trash";
    button3.appendChild(deleteSymbol);
    button3.append("delete");

    div2.appendChild(button1);
    div2.appendChild(button2);
    div2.appendChild(button3);

    newListItem.appendChild(div1);
    newListItem.appendChild(div2);
    
    return newListItem;
}

let addNewTask = function(event){
    event.preventDefault();
    if(newTask.value.trim() === "") return;
    let createdTask = newTaskCreate(newTask.value);
    allTaskContainer.push(createdTask);

    showAllTask();
    newTask.value="";

    bindDelete(createdTask, deleteTask);
    bindComplete(createdTask, completeTask);
    // bindUPdate(createdTask, updateTask);
}

let deleteTask = function(){
    let deleteBtnParent = this.parentNode;
    let deleteLi = deleteBtnParent.parentNode;
    let temp=[];
    for(let i=0; i<tasksLen; i++){
        if(deleteLi != allTaskContainer[i]){
            temp.push(allTaskContainer[i]);
        }
    }
    allTaskContainer=temp;
    todoUl.removeChild(deleteLi)
    tasksLen--;
}

let bindDelete = function(createdTask, dltTask){
    let deleteBtn = createdTask.querySelector('.deleteBtn');
    deleteBtn.onclick = dltTask;
}

let completeTask = function(){
    let btnParent = this.parentNode;
    let listItem = btnParent.parentNode;
    let task = listItem.querySelector('.task');
    let symbol=task.querySelector('i');
    symbol.style.display="none";

    let text = listItem.querySelector('span');
    text.style.color="green";
    text.style.textDecoration="line-through";
}

let bindComplete = function(createdTask, cmpltTask){
    let completeBtn = createdTask.querySelector('.completeBtn');
    completeBtn.onclick = completeTask;
}

let deleteAll = function(){
    showAllTask(-1);
}


form.addEventListener('submit', addNewTask);
deleteAllTask.addEventListener('click', deleteAll);




let addBtnFocused = function(){
    taskAddBtn.style.backgroundColor="#1C3879";
    taskAddBtn.style.color="white";
}
let addBtnBlur = function(){
    taskAddBtn.style.backgroundColor="rgba(71, 73, 161, 0.61)";
    taskAddBtn.style.color="white";
}

newTask.addEventListener('focus', addBtnFocused);
newTask.addEventListener('blur', addBtnBlur);
addBtnBlur();