"use strict";

document.getElementsByClassName("btn-add")[0].addEventListener('click', addElement);

function addElement(){

    var elDiv = document.createElement("div");
    var elParent = document.getElementsByClassName("rec-container")[0];
    var colors = ["purple", "pink", "coral", "skyblue", "yellow", "lightgreen"];

    elDiv.classList.add("rec");

    var rand = Math.floor(Math.random() * colors.length);

    elDiv.classList.add("rec");
    elDiv.style.background = colors[rand];
    elParent.appendChild(elDiv);
}



