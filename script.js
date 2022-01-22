//node selectors for body;
const body = document.querySelector("body");

//create title
const title = document.createElement("h1");
title.textContent = "Etch-A-Sketch";
body.appendChild(title);

//create container Div and append to body
const containerDiv = document.createElement("div");
containerDiv.setAttribute('class', 'grid-container');
body.appendChild(containerDiv);

//make, label, append 16 grid divs to container div
for (i = 1; i < 17; i++) {
  //make div
  const div = document.createElement("div");
  
  //set grid div attributes
  div.setAttribute('id', `${i}`);
  div.setAttribute('class', `grid-box`)
  // div.textContent = i;
  
  //append div to container.
  containerDiv.appendChild(div);
}

//hover effect
const targetDiv = document.querySelectorAll('.grid-box');
targetDiv.forEach(div => div.addEventListener('mouseenter', handleHover));

function handleHover (e) {
  const hoveredDiv = e.target;
  let color = "";

  if (hoveredDiv.style['background-color'] === "black") {
      color = "white";
    } else {
      color = "black";
    }
  hoveredDiv.style['background-color'] = color;
}

//reset and customizer button;