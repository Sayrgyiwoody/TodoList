let userInputTask = document.querySelector(".input-box input");
let list = document.querySelector(".list");

//Data from local storage
let toDos = JSON.parse(localStorage.getItem("todo-list"));

//Update local storage status and UI
function updateStatus(item) {
let task = item.parentElement.lastElementChild;
    if(item.checked) {
        task.classList.add("task-active");
        //update status
        toDos[item.id].status = "complete";
    }else {
        task.classList.remove("task-active");
        toDos[item.id].status = "pending";
    }
    localStorage.setItem("todo-list",JSON.stringify(toDos));
}

let updateTaskId;
let isEditTask = false;

//Update Task
function updateTask(id,oldTask) {
    isEditTask = true;
    updateTaskId = id;
    userInputTask.value = oldTask;
}

//Filter Tasks
let filters = document.querySelectorAll(".filterDiv span");
filters.forEach((span) => {
    span.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        span.classList.add("active");
        showTasks(span.id)

    })
});

//Clear btn - delete all tasks
let clearBtn = document.querySelector(".clear-btn");
clearBtn.addEventListener("click", _ => {
    toDos.splice(0,toDos.length);
    localStorage.setItem("todo-list",JSON.stringify(toDos));
    showTasks("all");
})

//Delete Task
function deleteTask(deleteId,status) {
    toDos.splice(deleteId,1);
    localStorage.setItem("todo-list",JSON.stringify(toDos));
    showTasks(status);
}

//show to do list from local storage
function showTasks(filterStatus) {
    li = "";
    if (toDos) {toDos.forEach((tasks, id) => {
        let completeStatus = tasks.status == "complete"? "task-active": "";
        let completeTaskCheck = tasks.status == "complete"? "checked":"";
        
        if (filterStatus == tasks.status || filterStatus == "all") {
            li += `<div class="list-item">
            <label for=${id} >
                <input type="checkbox" name="" id=${id} onclick="updateStatus(this)" ${completeTaskCheck}>
                <p class="list-text ${completeStatus}">${tasks.task}</p>
            </label>   
            <div class="icon">
                <i class="fa-solid fa-pen-to-square" onclick="updateTask(${id},'${tasks.task}')"></i>
                <i class="fa-solid fa-trash red" onclick="deleteTask(${id},'${tasks.status}')"></i>
            </div>
        </div>`;
        }   
        
        });
    }    
    list.innerHTML = li ||  `<p class="noTask">No task to show here.</p>`; 
};



showTasks("all");
userInputTask.addEventListener("keyup", (m) => {
    if (m.key == "Enter") {
        let userInput = userInputTask.value.trim();
        if (isEditTask) {
            toDos[updateTaskId].task = userInput;
            updateTaskId;
            isEditTask = false;
        }else {
            if (!toDos){
            toDos = [];
            }
        userInputTask.value = "";
        let userTask = {task:userInput,status:"pending"};
        toDos.push(userTask);
        }
        
        localStorage.setItem("todo-list",JSON.stringify(toDos))
        showTasks("all");
    }
    
});


