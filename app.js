const todoEl = document.getElementById("todo");
const progressEl = document.getElementById("progress");
const doneEl = document.getElementById("done");
const tasksEl = document.querySelectorAll(".task");
let dragElement = null;

tasksEl.forEach((task) => {
  task.addEventListener("drag", (e) => {
    e.preventDefault();
    dragElement = task;
  });
});

function addEventsOnCol(col) {
  if (col.className === "task-col") {
    let isInside = false;
    col.addEventListener("dragenter", (e) => {
      if (e.target === col) {
        e.preventDefault();
        e.target.classList.add("hover-over");
        isInside = true;
      }
    });
    col.addEventListener("dragleave", (e) => {
      if (e.target === col && isInside) {
        e.preventDefault();
        e.target.classList.remove("hover-over");
        isInside = false;
      }
    });
    col.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    col.addEventListener("drop", (e) => {
      e.preventDefault();
      e.target.classList.remove("hover-over");
      isInside = false;

      col.appendChild(dragElement);
      dragElement = null;
    });
  }
}

addEventsOnCol(todoEl);
addEventsOnCol(progressEl);
addEventsOnCol(doneEl);

// modal open
let openModalId = document.getElementById("open-modal");
let modalEl = document.getElementById("modal-el");
let bgEl = document.querySelector(".bg");
let closeModal = document.getElementById("close-modal");

openModalId.addEventListener("click", (e) => {
  e.preventDefault();

  modalEl.classList.add("active");
  modalTitleInput.focus();
});
function removeModal(e) {
  e.preventDefault();
  modalEl.classList.remove("active");
}
closeModal.addEventListener("click", removeModal);
bgEl.addEventListener("click", removeModal);

// add new task
let addNewTaskBtn = document.getElementById("add-new-task");
let modalTitleInput = document.getElementById("modal-title");
let modalDescriptionMsg = document.getElementById("modal-description");

modalTitleInput.addEventListener("keypress", addModalBtnClick);
modalDescriptionMsg.addEventListener("keypress", addModalBtnClick);
function addModalBtnClick(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    addNewTaskBtn.click();
  }
}

function modalEmpty(e) {
  modalTitleInput.value = " ";
  modalDescriptionMsg.value = " ";
}

addNewTaskBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let modalTitleInputVal = modalTitleInput.value;
  let modalDescriptionMsgVal = modalDescriptionMsg.value;
  let div = document.createElement("div");
  div.classList.add("task");
  div.setAttribute("draggable", "true");
  div.innerHTML = `
            <h3>${
              modalTitleInputVal ? modalTitleInputVal : "Title is not available"
            }</h3>
            <p>${
              modalDescriptionMsgVal
                ? modalDescriptionMsgVal
                : "Description is not available"
            }</p>
            <div class="operation-btn-container">
              <button class="edit-btn operation-btn">Edit</button>
              <button class="delete-btn operation-btn">Delete</button>
            </div>
`;
  todoEl.appendChild(div);
  div.addEventListener("drag", (e) => {
    e.preventDefault();
    dragElement = div;
  });
  removeModal(e);
  modalEmpty();
});
