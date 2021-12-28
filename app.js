const form = document.querySelector(".form");
const newTodo = document.getElementById("newTodo");
const todoList = document.querySelector(".list");
const amountItems = document.getElementById("amount");
const filter = document.querySelector(".filter");
const clearButton = document.getElementById("clear-btn");
let todoItems = [];

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (newTodo.value.length > 0) addTodoItem(newTodo.value);
  form.reset();
});

const addTodoItem = (item) => {
  if (item !== "") {
    todoItems.push({
      id: Date.now(),
      text: item,
      status: false,
    });
    addItemInLocalStorage(todoItems);
  }
};

const showTodoItems = (array) => {
  todoList.innerHTML = "";
  array.map((item) => {
    const todoWrapper = document.createElement("li");
    todoWrapper.classList.add("list__item");
    todoWrapper.setAttribute("data-id", item.id);
    todoWrapper.innerHTML = `
      <label class="list__label">
        <input type="checkbox" class="list__checkbox list__checkbox-icon" ${item.status === true ? "checked" : ""} />
        <span class="list__checkbox--fake"><span class="list__checkbox-icon icon-check"></span></span>
        <span class="list__text">${item.text}</span>
        <button class="list__remove icon-cross"></button>
      </label>`;
    todoList.append(todoWrapper);
    showCountOfItems(array);
  });
};

const addItemInLocalStorage = (items) => {
  localStorage.setItem("todoItems", JSON.stringify(items));

  showTodoItems(items);
};

const getItemsFromLocalStorage = () => {
  const temp = localStorage.getItem("todoItems");

  if (temp) {
    todoItems = JSON.parse(temp);
    showTodoItems(todoItems);
  }
};

const showCountOfItems = (array) => {
  amountItems.innerText = array.length;
};

const updateStatusOfItem = (id) => {
  todoItems.map((item) => {
    if (item.id == id) {
      item.status = !item.status;
    }
  });
  addItemInLocalStorage(todoItems);
};

const deleteItem = (id) => {
  todoItems = todoItems.filter((item) => item.id != id);
  addItemInLocalStorage(todoItems);
};

getItemsFromLocalStorage();

todoList.addEventListener("click", (event) => {
  if (event.target.type === "checkbox") {
    updateStatusOfItem(event.target.parentElement.parentElement.getAttribute("data-id"));
  }
  if (event.target.type === "submit") {
    deleteItem(event.target.parentElement.parentElement.getAttribute("data-id"));
  }
});

const showItemsByCondition = (options) => {
  let temp = [];
  switch (options) {
    case "completed":
      temp = todoItems.filter((item) => item.status === true);
      showTodoItems(temp);
      break;
    case "active":
      temp = todoItems.filter((item) => item.status === false);
      console.log(temp);
      showTodoItems(temp);
      break;
    default:
      showTodoItems(todoItems);
      break;
  }
};

filter.addEventListener("click", (event) => {
  if (event.target.id !== "") {
    const options = event.target.id;
    showItemsByCondition(options);
  }
});

clearButton.addEventListener("click", () => {
  todoItems.map((elem) => (elem.status === true ? deleteItem(elem.id) : ""));
});
