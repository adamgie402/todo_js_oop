
// ************************ global variables

const input = document.getElementById('inputTodo');
const btnEnter = document.getElementById('btnEnter');
const btnDelDone = document.getElementById('btnDelDone');
const btnDelAll = document.getElementById('btnDelAll');
const todoList = document.getElementById('todoList');
  
let taskList = [];

document.getElementById("inputTodo").focus();

// ************************ events

btnEnter.addEventListener('click', addTask);
btnDelDone.addEventListener('click', deleteDoneTasks);
btnDelAll.addEventListener('click', deleteAllTasks);
document.addEventListener('DOMContentLoaded', getLocalstorage);

// ************************ classes / object constructors

// obiect class (constructor); ES6
class Task {
    constructor(name, order, isDone) {
        // właściwości - properties
        this.name = name;
        this.order = order;
        this.isDone = isDone;
    }
    // metody - methods
    createLi() {
        let li = document.createElement('li');
        let span = document.createElement('span');
        li.appendChild(span);
        span.textContent = this.name;
        // li.setAttribute('draggable','true');
        // span.setAttribute('onclick', 'changeStatus(this.id)');
        // span.setAttribute('id', this.id);
        if(this.isDone === true) {
        span.setAttribute('class','taskDone');
        }
        //li buttons
        let btn = document.createElement('button');
        // button Del
        btn.setAttribute("onclick", "deleteTask(this)");
        btn.textContent = "Del.";
        btn.classList.add("btnDelete");
        li.appendChild(btn);
        // button Done
        btn = document.createElement('button');
        btn.setAttribute("onclick", "changeStatus(this)");
        btn.textContent = "Done";
        btn.classList.add("btnDone");
        li.appendChild(btn);
        return li;
    }

}

// ************************ functions


function deleteDoneTasks() {
    console.log('f m deleteDoneTasks');
    // itterate array backwards throug the array (array are changing and is shorter on every delete cycle/iteraton
    for (var i = taskList.length - 1; i >= 0; --i) {
        if (taskList[i].isDone == true) {
            // delete from array
            console.log('deleting: ' + taskList[i].name);
            taskList.splice(i,1);
        }
    }
    console.log('after delete: ');
    console.log(taskList);
    setLocalStorage();
    todoList.textContent = "";
    showTasks();
    }

function deleteAllTasks() {
    taskList = [];
    setLocalStorage();
    console.log('all tasks deleted...');
    todoList.textContent = "";
    showTasks();

}

function showTasks() {
    console.log('f show task...');
    todoList.textContent = "";
    taskList.forEach(value => {
        todoList.appendChild(value.createLi());
    });
}

function addTask(e) {
    e.preventDefault();
    console.log('f add task...');   
    // input validation
    let inputVal = input.value;
    inputVal = inputVal.toString().trim();
    // if input is empty
    if (inputVal == ""){
        input.value = "";
        input.setAttribute('placeholder', 'add some task...');
        console.log('empty input - nothing to do...');
        return; //stop the function
    }
    // check if task alredy exist on list
    let isExist = (function() {
        // iteration by taskList obiects property values - get true or false 
        for(i=0; i<taskList.length; i++) {
            if (taskList[i].name === inputVal) {
                console.log(true);
                return true;
            } 
        }
    }());
    if(isExist === true) {
        // if exist
        input.value = "";
        input.setAttribute('placeholder', "it's already on list ;)");
        console.log('alredy on list - nothing to do...');       
    } else {
        console.log('adding new task...');
        // if not exist - add new task: 
        // add new task to task array (to first position)
        taskList.unshift(new Task(inputVal,0,false));
        // add new task to html output on first place
        todoList.insertBefore(taskList[0].createLi(), todoList.childNodes[0]); //insertBefore(newElem, beforeThisElem)
        // clear input
        input.value = "";
        input.setAttribute('placeholder', "add some task...");
        // actualise local storage
        setLocalStorage();
        console.log(taskList);
    }        
}

function deleteTask(el) {
    console.log('f delete task...');
    let elem = el.parentElement.childNodes[0].textContent;
    console.log(elem);
    // get array index of elem
    let elemIndex = getIndexOfName(elem);
    console.log(elemIndex);
    // remove elem from array
    taskList.splice(elemIndex, 1);
    // remove elem from html output
    el.parentElement.remove();
    // actualise local storage
    setLocalStorage();
}

function getIndexOfName(TaskName) {
    for(i=0; i<taskList.length; i++) {
        if (taskList[i].name == TaskName) { return i; }
    }
}

function sortByStatus() {
    console.log('f sort by status...');
    taskList.sort(function(a,b){return a.isDone - b.isDone});
    console.log(taskList);
    refreshOutput();
}

function changeStatus(e) {
    console.log('f change status...');
    // change html outpu class
    let elem = e.parentElement.firstChild;
    elem.classList.toggle('taskDone');
    // iterate by taskList and find object with the same name-property and change his isDone status
    elem = elem.textContent;
    for(i=0; i<taskList.length; i++) {
        if (taskList[i].name == elem && taskList[i].isDone == true) {
            taskList[i].isDone = false;
            setLocalStorage();
            return; // stop iteration here
        }
        if (taskList[i].name == elem && taskList[i].isDone == false) {
            taskList[i].isDone = true;
            setLocalStorage();
            return; // stop iteration here
        }
    }
}

function setLocalStorage(){
    console.log("f setLocalStorage...");
    localStorage.setItem('tasks', JSON.stringify(taskList));
    console.log('local strage JSON: ');
    console.log(JSON.parse(localStorage.getItem('tasks')));
}

function getLocalstorage(){
    console.log('f getLocalstorage...');
    if(localStorage.getItem('tasks') === null){
        console.log("local storage are empty...");
        loadDefaultTasks();
    } else {
        // get tasks from local storage 
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        // iterate and push every row to taskList array using Task object constructor
        tasks.forEach(element => {
            console.log(element.name + ' (' + element.isDone + ')');
            taskList.push(new Task(element.name, element.order, element.isDone));
        });
        showTasks();
    }
}

function loadDefaultTasks() {
    console.log("f loadDefaultTasks...");
    // default sample elements
    taskList[0] = new Task('eat something',1,false);
    taskList[1] = new Task('learn JS',2,false);
    // adding new task to taskList using push or unshift
    taskList.push(new Task('go outside',3,false));
    showTasks();
} 


// ************************ notes (do not delete)

// list sorting
// sorting by order property value:
// console.log(taskList.sort(function(a,b){return a.isDone - b.isDone}));
// reverse sorting:
// console.log(taskList.reverse());