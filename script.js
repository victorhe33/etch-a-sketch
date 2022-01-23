//VARIABLES
let boxAcross = 5;
let gridNum = boxAcross ** 2;
let containerWidth = 600;
let height = containerWidth / boxAcross;
let width = height;
let color = "black"
let rainbow = false;

//DOM SELECTORS
const containerDiv = document.getElementById("gridContainer");
const colorPicker = document.getElementById("colorPicker");
const rainbowButton = document.querySelector("#rainbowButton");
const eraserButton = document.getElementById("eraserButton");
const resetButton = document.getElementById("resetButton");
const slider = document.getElementById("slider");
const sliderDisplay = document.getElementById("sliderDisplay");
const toggleCheckbox = document.getElementById("toggleCheckbox");

//DISPLAYS
sliderDisplay.textContent = `${slider.value} x ${slider.value}`;
slider.oninput = function () {
  sliderDisplay.textContent = `${slider.value} x ${slider.value}`;
  //update specs
  boxAcross = this.value;
  gridNum = boxAcross ** 2;
  height = containerWidth / boxAcross;
  width = height;

  removeDivs();
  makeGrid();
}

//FUNCTIONS
function makeGrid() {
  //make grid

  for (i = 0; i < gridNum; i++) {
    //make div
    const div = document.createElement("div");

    //set grid div attributes
    div.setAttribute('id', `${i}`);
    div.setAttribute('class', `grid-box`)
    div.setAttribute('style', `min-height: ${height}px; min-width: ${width}px;`)
    // div.textContent = i; //delete later

    //append div to container.
    containerDiv.appendChild(div);

    //keep grid overlay state steady
    if (toggleCheckbox.checked === true) {
       div.classList.add("toggle-grid")
    }
  }

  const targetDiv = document.querySelectorAll('.grid-box');
  targetDiv.forEach(div => div.addEventListener('mouseenter', handleHover));
}

function removeDivs() {
  const deleteDivs = document.querySelectorAll('.grid-box')
  deleteDivs.forEach(div => containerDiv.removeChild(div));
}

function handleHover(e) {
  const hoveredDiv = e.target;
   
  if (rainbow) {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    color = `#${randomColor}`;
  }

  hoveredDiv.style['background-color'] = color;
}

function handleColorPicker () {
  color = colorPicker.value;
  rainbow = false;
}

function handleRainbowClick () {
    if (rainbow) {
      rainbow = false;
      color = "black";
    }
    else {
      rainbow = true;
    }
}

function handleEraserClick () {
  color = "white";
  rainbow = false;
}

function handleResetClick () {
  removeDivs();
  toggleCheckbox.checked = false;
  makeGrid();
}

function handleToggleClick () {
  const divGrid = document.querySelectorAll('.grid-box')
  divGrid.forEach(div => div.classList.toggle("toggle-grid"));
}

//EVENT LISTENERS
colorPicker.addEventListener('change', handleColorPicker);
rainbowButton.addEventListener('click', handleRainbowClick);
eraserButton.addEventListener('click', handleEraserClick);
resetButton.addEventListener('click', handleResetClick);
toggleCheckbox.addEventListener('change', handleToggleClick)

//initiate grid
makeGrid();