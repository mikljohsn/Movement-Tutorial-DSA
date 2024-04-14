"use strict";

window.addEventListener("load", start);

function start() {
    console.log("JS is running");
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    requestAnimationFrame(tick);
}

// ################### MODEL ###################

const player = {
    x: 0,
    y: 0,
    speed: 70,
    moving: false,
    direction: undefined
}

const controls = {
    up: false,
    down: false,
    left: false,
    right: false,
}

let lastTimestamp = 0;

function tick(timestamp){
    requestAnimationFrame(tick);

    const deltaTime = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;


    movePlayer(deltaTime);

    displayPlayerAtPosition();
    displayPlayerAnimation();
}
function handleKeyDown(event) {
    switch (event.key) {
      case "ArrowLeft":
      case "a":
        controls.left = true;
        break;
      case "ArrowRight":
      case "d":
        controls.right = true;
        break;
      case "ArrowUp":
      case "w":
        controls.up = true;
        break;
      case "ArrowDown":
      case "s":
        controls.down = true;
        break;
    }
  }
  
  function handleKeyUp(event) {
    switch (event.key) {
      case "ArrowLeft":
      case "a":
        controls.left = false;
        break;
      case "ArrowRight":
      case "d":
        controls.right = false;
        break;
      case "ArrowUp":
      case "w":
        controls.up = false;
        break;
      case "ArrowDown":
      case "s":
        controls.down = false;
        break;
    }
  }

function displayPlayerAtPosition() {
    const visualPlayer = document.querySelector("#player");
    visualPlayer.style.translate = `
    ${player.x}px ${player.y}px
    `;
}

function movePlayer(deltaTime){
    player.moving = false;

    const newPos = {
        x: player.x,
        y: player.y
    }

    if (controls.left) {
        player.moving = true;
        player.direction = "left";
        newPos.x -= player.speed * deltaTime;
    } else if (controls.right) {
        player.moving = true;
        player.direction = "right";
        newPos.x += player.speed * deltaTime;
    }

     if (controls.up) {
        player.moving = true;
        player.direction = "up";
        newPos.y -= player.speed * deltaTime;
    } else if (controls.down) {
        player.moving = true;
        player.direction = "down";
        newPos.y += player.speed * deltaTime;
    }

    if (canMoveTo(newPos)){
        player.x = newPos.x;
        player.y = newPos.y;
    
    }
}

function canMoveTo(pos){
    if (pos.x < 0 || pos.x > 484 || pos.y < 0 || pos.y > 340){
        return false;
    }
    return true;
}

// ################### VIEW ###################

function displayPlayerAnimation(){
    const visualPlayer = document.querySelector("#player");
    if (player.moving){
        visualPlayer.classList.add("animate")
        visualPlayer.classList.remove("left", "right", "up", "down")
        visualPlayer.classList.add(player.direction)
    } else {
        visualPlayer.classList.remove("animate")
    }
}