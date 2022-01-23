//node selectors for body;
const body = document.querySelector("body");

//create title
const title = document.createElement("h1");
title.textContent = "Etch-A-Sketch";
body.appendChild(title);

//create container Div and append to body
const containerDiv = document.createElement("div");
containerDiv.setAttribute('class', 'grid-container');
containerDiv.style.cssText = 'max-width: 100px; height:100px;';
body.appendChild(containerDiv);

//container resize function;
function resizeContainer (gridwidth) {
  let width = gridwidth * 25;
  let height = width;

  containerDiv.style.cssText = `max-width: ${width}px; height:${height}px;`
}

//make, label, append x grid divs to container div
function customizeGrid(answer) {
  let gridWidth = answer;

  resizeContainer(gridWidth);
  makeGrid(gridWidth)
}

function makeGrid (num) {
  let gridNum = 16;

  if (num !== undefined) {
    gridNum = num ** 2;
  }

  for (i = 0; i < gridNum; i++) {
    //make div
    const div = document.createElement("div");
    
    //set grid div attributes
    div.setAttribute('id', `${i}`);
    div.setAttribute('class', `grid-box`)
    
    //append div to container.
    containerDiv.appendChild(div);
  }

  const targetDiv = document.querySelectorAll('.grid-box');
  targetDiv.forEach(div => div.addEventListener('mouseenter', handleHover));
}

//make Grid function called on load so that listeners are after.
makeGrid();

//hover effect
// const targetDiv = document.querySelectorAll('.grid-box');
// targetDiv.forEach(div => div.addEventListener('mouseenter', handleHover));

function handleHover (e) {
  const hoveredDiv = e.target;
  let color = "";
  console.log(hoveredDiv.style['background-color']);

  if (hoveredDiv.style['background-color'] === "") {
      color = "black";
    } else {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
      color = `#${randomColor}`;
    }
  hoveredDiv.style['background-color'] = color;
}

//reset and customizer button;
const resetButton = document.createElement('button');
resetButton.addEventListener('click', handleClick);
resetButton.textContent = "Reset";
resetButton.classList.add('reset-button');
body.appendChild(resetButton);

function handleClick () {
  // targetDiv.forEach(div => div.style['background-color'] = 'white');
  let answer = prompt("Choose size of grid", "1 - 30");
  
  //sanitize answer;
  answer = Number(answer);
  if (answer >= 1 
    && answer <= 30 
    && typeof answer === "number") {
    removeDivs();
    customizeGrid(answer);
  } else {
    alert("Invalid selection")
  }
}

function removeDivs () {
  const deleteDivs = document.querySelectorAll('.grid-box')
  deleteDivs.forEach(div => containerDiv.removeChild(div));
}