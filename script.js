
console.log('test');

// ************************ global variables

const input = document.getElementById('inputTodo');
const btnEnter = document.getElementById('btnEnter');
const todoList = document.getElementById('todoList');
  
let idCounter;
let taskList = [];

document.getElementById("inputTodo").focus();

// ************************ events

btnEnter.addEventListener('click', addTask);
document.addEventListener('DOMContentLoaded', showTasks);

// ************************ classes / object constructors

// obiect class (constructor); ES6
class Task {
    constructor(id, name, order, isDone) {
        // właściwości - properties
        this.id = id;
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
        span.setAttribute('onclick', 'changeStatus(this.id)');
        span.setAttribute('id', this.id);
        if(this.isDone === true) {
        span.setAttribute('class','taskDone');
        }
        //li buttons
        let btn = document.createElement('button');
        // button Del
        btn.setAttribute("onclick", "deleteTask(this)");
        btn.textContent = "Del.";
        btn.classList.add("delBtn");
        li.appendChild(btn);
        // button Done
        btn = document.createElement('button');
        btn.setAttribute("onclick", "changeStatus(this)");
        btn.textContent = "Done";
        btn.classList.add("doneBtn");
        li.appendChild(btn);
        return li;
    }
}

// default sample elements
taskList[0] = new Task(1,'learn js',2,true);
taskList[1] = new Task(2,'eat something',1,false);
taskList[2] = new Task(3,'go outside',3,false);
// adding new task to taskList using push or unshift
taskList.push(new Task(4,'back to js',100,false));

// ************************ functions

function refreshOutput() {
    todoList.textContent = "";
    showTasks();
}

function showTasks() {
    console.log('f show task...');
    taskList.forEach(value => {
        console.log(value);
        todoList.appendChild(value.createLi());
    });
}

function addTask(e) {
    e.preventDefault();
    console.log('f add task...');   
    // input validation
    let inputVal = input.value;
    inputVal = inputVal.toString();
    inputVal = inputVal.trim();
    // if input is empty
    if (inputVal == ""){
        input.value = "";
        input.setAttribute('placeholder', 'type something...');
        return; //stop the function
    }
    // check if task alredy exist on list
    let isExist = (function() {
        // iteration by taskList obiects property values - get true or false 
        for(i=0; i<taskList.length; i++) {
            if(Object.values(taskList[i]).includes(inputVal)) {
                // if value exist in some taskList obiect
                return true;
            } else {
                return false;
            }
        }
    }());
    if(isExist) {
        // if exist
        input.value = "";
        input.setAttribute('placeholder', "it's already on list ;)");       
    } else {
        // if not exist - add new task object to task list, to first position
        taskList.unshift(new Task(0,inputVal,0,false));
        console.log(taskList);
        // add new task to html output on first place
        todoList.insertBefore(taskList[0].createLi(), todoList.childNodes[0]); //insertBefore(newElem, beforeThisElem)
    }        
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
            return; // stop iteration here
        }
        if (taskList[i].name == elem && taskList[i].isDone == false) {
            taskList[i].isDone = true;
            return; // stop iteration here
        }
    }
    

}

function deleteTask() {
    console.log('f delete task...');
}

function sortByStatus() {
    console.log('f sort by status...');
    taskList.sort(function(a,b){return a.isDone - b.isDone});
    console.log(taskList);
    refreshOutput();
}



console.log('lol');


// ************************ notest (do not delete)

// list sorting
// sorting by order property value:
// console.log(taskList.sort(function(a,b){return a.isDone - b.isDone}));
// reverse sorting:
// console.log(taskList.reverse());