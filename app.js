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
      // console.log("droped element", dragElement, col);
      col.appendChild(dragElement);
      dragElement = null;
    });
  }
}

addEventsOnCol(todoEl);
addEventsOnCol(progressEl);
addEventsOnCol(doneEl);
