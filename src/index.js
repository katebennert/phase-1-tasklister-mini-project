document.addEventListener("DOMContentLoaded", () => {
  //grabs the form element and stores is in form
  let form = document.querySelector('form')
  form.addEventListener('submit', (e) => {
    e.preventDefault(); //prevents the page from refreshing after the submit event
    makeNewTask(e.target.querySelector('input#new-task-description').value, e.target.querySelector('select').value);
    form.reset(); //resets form after the event callback is executed
  })

  let sortButton = document.querySelector('#sort-btn');
  sortButton.addEventListener('click', handleSort);
  
});

//build a new task element when called by the event
function makeNewTask(task, priority) {
  let li = document.createElement('li');
  let btn = document.createElement('button');
  btn.addEventListener('click', handleDelete);
  btn.textContent = 'remove';
  btn.setAttribute("id", "remove-btn");
  li.textContent = `${priority} ${task} `;
  li.appendChild(btn);
  document.querySelector('#tasks').appendChild(li);
  console.log(li)
}

function handleDelete(e) {
  e.target.parentNode.remove();
}

function handleSort(e) {
  let taskList = document.querySelectorAll('li');
  let sortedList = [];

  //creates an array of the task lists that are sorted by priority
  for (let task of taskList) {
    if (task.innerHTML[0] === "!" && task.innerHTML[1] != "!"){
      sortedList.push(task);
    } else if (task.innerHTML[1] === "!" ) {
        sortedList.unshift(task);
    } else {
      sortedList.push(task);
    } 

  }

  //removes the children nodes of ul
  let removeList = document.querySelectorAll('li');
  for (let element of removeList) {
    element.remove();
  }

  //pushes the sorted array to the DOM by programmatically creating elements and pushes the inner HTML from the array elements to the new elements and then appending them
  for (let i = 0; i < sortedList.length; i++) {
    let li = document.createElement('li');
    li.innerHTML = sortedList[i].innerHTML;
    document.querySelector('#tasks').appendChild(li);
  }
  
  //adding back remove button event listener
  let buttons = document.querySelectorAll('#remove-btn');
  
  for (let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', handleDelete);
  }
  
  console.log(document.querySelector('ul'))





}
