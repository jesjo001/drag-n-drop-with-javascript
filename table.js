let table = document.querySelector("table");
let addRowButton = document.getElementsByClassName("addRow");
let boxContainers = document.querySelectorAll(".tableCell");
let allDivs = document.querySelectorAll(".rect");

const undoButton = document.getElementsByClassName("undo");
const redoButton = document.getElementsByClassName("redo");

let lastItemNum;
const mementos = [];
let newColumns = [];
let newDivs = [];

addRowButton[0].addEventListener("click", () => {
  addNweRow();
  addEventsToNewNode();
});

undoButton[0].addEventListener("click", () => {
  undo();
});

redoButton[0].addEventListener("click", () => {
  // addNweRow();
});

allDivs.forEach((box) => {
  box.addEventListener("dragstart", () => {
    box.classList.add("dragging");
  });

  box.addEventListener("dragend", () => {
    box.classList.remove("dragging");
  });
});

boxContainers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggable = document.querySelector(".dragging");
    const parentNode = draggable.parentNode;

    const containerElem = getContainerElem(container);

    container.appendChild(draggable);
    parentNode.appendChild(containerElem);

    refreshNodes();
  });
});

function refreshNodes() {
  let boxContainers = document.querySelectorAll(".tableCell");
  let allDivs = document.querySelectorAll(".rect");
}

function getContainerElem(container) {
  const containerElem = [...container.querySelectorAll(".rect:not(.dragging)")];
  return containerElem[0];
}

function addNweRow() {
  saveMemento();
  const innerBoxes = document.getElementsByClassName("rect");
  const innerBoxesLength = innerBoxes.length;

  const lastElement = innerBoxes[innerBoxesLength - 1];
  const tableRow = document.createElement("tr");

  tableRow.classList.add("tableRow");
  lastItemNum = !isNaN(lastItemNum)
    ? lastItemNum + 100
    : 0 + getLastItemNumber(allDivs) + 100;

  [...Array(3).keys()].map((element, i) => {
    const tableColumn = document.createElement("td");
    tableColumn.classList.add("tableCell");
    const divElem = document.createElement("div");
    divElem.classList.add("rect");

    divElem.style.background = getRandomColor();
    divElem.style.color = "white";

    // lastItemNum = lastItemNum + 100
    if (i === 1) lastItemNum = lastItemNum + 100;
    if (i === 2) lastItemNum = lastItemNum + 100;
    divElem.innerText = lastItemNum;
    divElem.setAttribute("draggable", "true");
    newColumns.push(tableColumn);
    newDivs.push(divElem);
    tableColumn.appendChild(divElem);
    tableRow.appendChild(tableColumn);
  });

  table.appendChild(tableRow);
  saveMemento();
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getLastItemNumber(elements) {
  const lastIndex = elements.length - 1;
  const lastElement = elements[elements.length - 1];

  return Number(lastElement.innerText);
}

function saveMemento() {
  mementos.push(table.value);
}

function undo() {
  const lastMemento = mementos.pop();
  table.value = lastMemento ? lastMemento : table.value;
}

function addEventsToNewNode() {
  newColumns.forEach((container) => {
    container.addEventListener("dragover", (e) => {
      e.preventDefault();
      const draggable = document.querySelector(".dragging");
      const parentNode = draggable.parentNode;

      const containerElem = getContainerElem(container);

      container.appendChild(draggable);
      parentNode.appendChild(containerElem);

      refreshNodes();
    });
  });

  newDivs.forEach((box) => {
    box.addEventListener("dragstart", () => {
      box.classList.add("dragging");
    });

    box.addEventListener("dragend", () => {
      box.classList.remove("dragging");
    });
  });
}
