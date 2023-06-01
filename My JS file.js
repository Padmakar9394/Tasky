const taskContainer = document.querySelector(".task__container");
let globalStore = [];//array of objects
// console.log(taskContainer);
const generateNewCard = (taskData) => `
  <div class="col-sm-12 col-md-6 col-lg-4">
    <div class="card mb-4">
      <div class="card-header d-flex justify-content-end gap-2">
        <button type="button" class="btn btn-outline-success" id=${taskData.id} onclick="editCard.apply(this,arguments)"><i class="fas fa-pencil-alt"  id=${taskData.id} onclick="editCard.apply(this,arguments)"></i></button>
        <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"><i class="fas fa-trash-alt" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"></i></button>
      </div>
      <div class="card-body">
        <img class="card-img-top" src=${taskData.imageUrl} alt="...">
        <h5 class="card-title mt-3 fw-bolder text-primary">${taskData.taskTitle}</h5>
        <p class="card-text">${taskData.taskDescription}</p>
        <a href="#" class="btn btn-primary">${taskData.taskType}</a>
      </div>
      <div class="card-footer d-flex justify-content-end text-body-secondary">
        <button type="button" id=${taskData.id} class="btn btn-outline-primary">Open Task</i></button>
      </div>
    </div>
  </div>
  `;


const updateLocalStorage = () => {
  localStorage.setItem("tasky",JSON.stringify({cards: globalStore}));
}

const loadInitialCardData = () => {
  //localstorage to get tasky card data
  const getCardData = localStorage.getItem("tasky");


    //covert to normal object
  const {cards} = JSON.parse(getCardData);


    //loop over those array of task obejct to create HTML card , inject it to DOM
  cards.map((cardObject) => {
    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));

    //update our globalStore
    globalStore.push(cardObject);
  } 

)

};

//Delete function

const deleteCard = (event) => {
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;
  // console.log(tagname);

  globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);
  // localStorage.setItem("tasky",JSON.stringify({cards: globalStore}));
  updateLocalStorage();

  if(tagname === "BUTTON") {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  } else {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }
};


const saveChanges = () => {
  const taskData = {
    id: `${Date.now()}`,
    imageUrl: document.getElementById("imageurl").value,
    taskTitle: document.getElementById("tasktitle").value,
    taskType: document.getElementById("tasktype").value,
    taskDescription: document.getElementById("taskdescription").value
  };


taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

globalStore.push(taskData);
// localStorage.setItem("tasky",JSON.stringify({cards: globalStore}));
updateLocalStorage();

};


const editCard = (event) => {
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;

  // console.log(tagname);
  let parentEle;
  if(tagname === "BUTTON") {
    parentEle = event.target.parentNode.parentNode;
  } else {
    parentEle = event.target.parentNode.parentNode.parentNode;
  }

  let taskTitle = parentEle.childNodes[3].childNodes[3];
  let taskDescription = parentEle.childNodes[3].childNodes[5];
  let taskType = parentEle.childNodes[3].childNodes[7];
  let submitBtn= parentEle.childNodes[5].childNodes[1];

  // console.log(taskTitle);
  // console.log(taskDescription);
  // console.log(taskType);

  taskTitle.setAttribute("contenteditable", "true");
  taskDescription.setAttribute("contenteditable", "true");
  taskType.setAttribute("contenteditable", "true");
  submitBtn.setAttribute("onclick", "saveEditChanges.apply(this, arguments)");
  submitBtn.innerHTML = "Save Changes";

}

const saveEditChanges = (event) => {
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;

  // console.log(tagname);
  let parentEle;
  if(tagname === "BUTTON") {
    parentEle = event.target.parentNode.parentNode;
  } else {
    parentEle = event.target.parentNode.parentNode.parentNode;
  }

  let taskTitle = parentEle.childNodes[3].childNodes[3];
  let taskDescription = parentEle.childNodes[3].childNodes[5];
  let taskType = parentEle.childNodes[3].childNodes[7];
  let submitBtn= parentEle.childNodes[5].childNodes[1];

  const updatedData = {
    title: taskTitle.innerHTML,
    type: taskType.innerHTML,
    description: taskDescription.innerHTML,
  }

  globalStore = globalStore.map((task) => {
    if(task.id === targetID) {
      return {
        id: task.id,
        imageUrl: task.imageUrl,
        taskTitle: updatedData.title,
        taskType: updatedData.type,
        taskDescription: updatedData.description,
      }
    }
    return task;
  })
  // console.log(globalStore);
  // localStorage.setItem("tasky",JSON.stringify({cards: globalStore}));
  updateLocalStorage();
  taskTitle.setAttribute("contenteditable", "false");
  taskDescription.setAttribute("contenteditable", "false");
  taskType.setAttribute("contenteditable", "false");
  submitBtn.removeAttribute("onclick");
  submitBtn.innerHTML = "Open Task";
}

//Issues

// Page refreshes causes the data to get deleted
//API -> Application Programming Interface
//local storage -> Accessing application via local storage
//Interface -> Interface means middle man

//Features - Delete , edit , open the card

// console.log(window.event);

