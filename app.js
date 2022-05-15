const input = document.querySelector(".todo__input");
const addBtn = document.querySelector(".todo__btn-add");
const textDanger = document.querySelector(".todo__danger");
const textSuccess = document.querySelector(".todo__success");
const todoLists = document.querySelector(".todo__list");
const clearBtn = document.querySelector(".todo__btn-clear");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// INPUT ENTER ADD TASKS
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

// ADD TASKS
addBtn.addEventListener("click", addTask);

function addTask() {
    let inputText = input.value;

    if (inputText === "") {
        textDanger.classList.add("active");
        setTimeout(() => {
            textDanger.classList.remove("active");
        }, 1500);
    } else {
        tasks.push(inputText);

        localStorage.setItem("tasks", JSON.stringify(tasks));

        displayShowTask();

        input.value = "";
        textSuccess.classList.add("active");
        setTimeout(() => {
            textSuccess.classList.remove("active");
        }, 1500);
    }
}

// CLEAR TASKS
clearBtn.addEventListener("click", clearTask);

function clearTask() {
    tasks.splice(0, tasks.length);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayShowTask();
}

// SHOW TASKS
function displayShowTask() {
    todoLists.innerHTML = "";
    let display = tasks
        .map((item, index) => {
            return `
            <li class="todo__item">
                <p class="todo__text">${item}</p>
                <span class="todo__btn-delete" onclick="deleteTask(${index})">
                    <i class="fa-solid fa-trash-can"></i>
                </span>
            </li>
            `;
        })
        .join("");
    todoLists.innerHTML = display;
}
displayShowTask();

// DELETE TASK
function deleteTask(id) {
    tasks.splice(id, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayShowTask();
}
