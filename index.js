const container=document.querySelector(".container");
const todoForm=document.querySelector(".todo-form");
const todoInput=document.querySelector("#input");
const button=document.querySelector("#btn");
const list=document.getElementById("lists");
const msgelement = document.getElementById("msg");
//show msg
const showMessage = (text,status) =>{
    msgelement.textContent=text;
    msgelement.classList.add(`bg-${status}`);
    setTimeout(()=>{
       msgelement.textContent = " ";
       msgelement.classList.remove(`bg-${status}`);

    },1000);
};

//create to do
const createTodo=(todoId,todoValue)=>{
    const todoElement = document.createElement("li")
    todoElement.id=todoId;
    todoElement.classList.add("li-style");
    todoElement.innerHTML=`<span> ${todoValue}</span>
    <span><button class="btn" id="deleteButton"><i class="fa fa-trash-can"></i></button></span>`;
    list.appendChild(todoElement);
    const dltbtn = todoElement.querySelector("#deleteButton");
    dltbtn.addEventListener("click",deleteTodo);
};

const deleteTodo = (event) => {
    console.log("delete todo");
    const selectedTodo = event.target.parentElement.parentElement.parentElement;
    
    list.removeChild(selectedTodo);
    // console.log(selectedTodo);
    showMessage("Todo is deleted","delete");
    // const todoId = selectedTodo.id;
    let todos = getTodosFromLocalStorage();
    todos = todos.filter((todo) => todo.todoId !== selectedTodo.id);
    localStorage.setItem("mytodos",JSON.stringify(todos));


};
    const getTodosFromLocalStorage = ()=>{
        return localStorage.getItem("mytodos")? JSON.parse(localStorage.getItem("mytodos")) : [];

    };


const addTodo = (event) =>{
    event.preventDefault();
    console.log(input.value);
    const todoValue = todoInput.value;

//add todo to local storage

    const todoId = Date.now().toString();
    createTodo(todoId,todoValue);
    showMessage("ToDo is added","success");// method("msg",cls)
    const todos = getTodosFromLocalStorage();
    //localStorage.getItem("mytodos") ? JSON.parse(localStorage.getItem("mytodos")) : [];
    todos.push({todoId,todoValue});
    localStorage.setItem("mytodos",JSON.stringify(todos));
    todoInput.value = " ";
};
// loadTodos
const loadTodos = () => {
    const todos=getTodosFromLocalStorage();
    todos.map((todo) => createTodo(todo.todoId,todo.todoValue))
}



todoForm.addEventListener("submit",addTodo);
window.addEventListener("DOMContentLoaded",loadTodos);// previous todo is added at reloaded time