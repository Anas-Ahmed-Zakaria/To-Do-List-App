const inputName = document.getElementById('inputName');
const inputTask = document.getElementById('inputTask');
const btnAdd = document.getElementById('btnAdd');
const btnUpdate = document.getElementById('btnUpdate');
const searchTask = document.getElementById('searchTask');
let taskContainer = [];



//Function Add Tasks
const addTasks = () => {
  if(checkTaskName()) {
    const task = {
      name: inputName.value,
      title: inputTask.value,
    }
    taskContainer.push(task);
    localStorage.setItem('tasks' , JSON.stringify(taskContainer));
    clearTasks();
    displayTasks();
  }
}
btnAdd.addEventListener('click' , addTasks);




//Function Display Tasks
const displayTasks = () => {
  let display = ``;
  for(let i = 0 ; i < taskContainer.length ; i++) {
    display += `
    <tr>
          <td>${taskContainer[i].name}</td>
          <td>${taskContainer[i].title}</td>
          <td><button onclick="setDataInputs(${i})" class="btn btn-warning text-light btnEdit">Edit</button></td>
          <td><button onclick="deleteTasks(${i})" class="btn btn-danger">Delete</button></td>
        </tr>
    `;
  }
  document.getElementById('displays__data').innerHTML = display;
}




//Local Storage
if(localStorage.getItem('tasks')) {
  taskContainer = JSON.parse(localStorage.getItem('tasks'));
  displayTasks();
}




//Function Delete Tasks 
const deleteTasks = (deleteIndex) => {
  taskContainer.splice(deleteIndex , 1);
  localStorage.setItem('tasks' , JSON.stringify(taskContainer));
  displayTasks();
}



//Clear Inputs
const clearTasks = () => {
  inputName.value = '';
  inputTask.value = '';
}




//Function Set Data In Inputs
let x = 0;
const setDataInputs = (inputIndex) => {
  x = inputIndex;
  inputName.value = taskContainer[inputIndex].name;
  inputTask.value = taskContainer[inputIndex].title;
  btnAdd.classList.add('d-none');
  btnUpdate.classList.remove('d-none');
}




//Function Update Inputs
const updateTasks = () => {
  taskContainer[x].name = inputName.value;
  taskContainer[x].title = inputTask.value;
  btnAdd.classList.remove('d-none');
  btnUpdate.classList.add('d-none');
  localStorage.setItem('tasks' , JSON.stringify(taskContainer));
  displayTasks();
  clearTasks();
}
btnUpdate.addEventListener('click' , updateTasks);





//Function Search Inputs
const searchTasks = (word) => {
  let display = ``;
  for(let i = 0 ; i < taskContainer.length ; i++) {
    if(taskContainer[i].name.toUpperCase().includes(word.toUpperCase())) {
      display += `
      <tr>
            <td>${taskContainer[i].name}</td>
            <td>${taskContainer[i].title}</td>
            <td><button onclick="setDataInputs(${i})" class="btn btn-warning text-light btnEdit">Edit</button></td>
            <td><button onclick="deleteTasks(${i})" class="btn btn-danger">Delete</button></td>
          </tr>
      `;
    }
  }
  document.getElementById('displays__data').innerHTML = display;
}
searchTask.addEventListener('input' , () => {
  searchTasks(searchTask.value);
});




//Function Regex (Validation)
const checkTaskName = () => {
  let regex = /^\w{4,15}$/;
  if(regex.test(inputName.value)) {
    return true;
  }
  else {
    return false;
  }
}
