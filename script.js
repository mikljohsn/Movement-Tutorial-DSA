"use strict";
//#region CONTROLLER
window.addEventListener("load", start);

function start() {
  console.log("JS is running");
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
  requestAnimationFrame(tick);
  createTiles();
  createItems();
  displayTiles();
  displayItems();
}
//#endregion

//#region MODEL
// ################### MODEL ###################

const player = {
  x: 0,
  y: 0,
  regX: 11,
  regY: 17,
  hitbox: {
    x: 0,
    y: 0,
    w: 22,
    h: 14
  },
  speed: 70,
  moving: false,
  direction: undefined
}

const enemy = {
  x: 100,
  y: 100,
  regX: 11,
  regY: 17,
}

const attack = {
  x: 300,
  y: 300,
  regX: 11,
  regY: 17,

}

const controls = {
  up: false,
  down: false,
  left: false,
  right: false,
}

const tiles = [
  [0, 4, 1, 4, 4, 4, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 3, 0, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 3, 0, 1, 0, 6, 6, 6, 6, 6],
  [0, 0, 0, 0, 0, 0, 0, 3, 0, 1, 0, 6, 2, 2, 2, 2],
  [0, 0, 0, 0, 0, 0, 3, 3, 0, 1, 0, 6, 2, 0, 0, 2],
  [0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 1, 1, 5, 0, 0, 2],
  [0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 6, 2, 0, 0, 2],
  [0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 6, 2, 2, 2, 2],
  [0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 6, 6, 6, 6, 6],
]

const items = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const GRID_WIDTH = tiles[0].length; // the width is the first row of the tiles array
const GRID_HEIGHT = tiles.length; // the length is the number of rows in the tiles array
const TILE_SIZE = 32; // the size of each tile in pixels


function getTileAtCoordinate({ row, col }) {
  // const row = coord.row;
  // const col = coord.col;

  // const { row, col } = coord; // destructuring
  return tiles[row][col];
}

function coordFromPos({ x, y }) {
  return {
    row: Math.floor(y / TILE_SIZE), // the row is the y-coordinate divided by the tile size
    col: Math.floor(x / TILE_SIZE)
  }
}

function posFromCoord({ row, col }) {
  return {
    x: col * TILE_SIZE, // the x-coordinate is the column multiplied by the tile size 
    y: row * TILE_SIZE
  }
}

let lastTimestamp = 0;

function tick(timestamp) {
  requestAnimationFrame(tick);

  const deltaTime = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;


  movePlayer(deltaTime);

  checkForItemPickup();

  displayPlayerAtPosition();
  displayEnemyAtPosition();

  displayPlayerAnimation();


  showDebugging();
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

function movePlayer(deltaTime) {
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

  if (canMoveTo(newPos)) {
    player.x = newPos.x;
    player.y = newPos.y;

  } else {
    player.moving = false;
    if (newPos.x !== player.x && newPos.y !== player.y) {
      const newXPos = {
        x: newPos.x,
        y: player.y
      };
      const newYPos = {
        x: player.x,
        y: newPos.y
      };

      if (canMoveTo(newXPos)) {
        player.moving = true;
        player.x = newXPos.x;
        if (player.x < newYPos.x) {
          player.direction = "left";
        } else {
          player.direction = "right";
        }
      } else if (canMoveTo(newYPos)) {
        player.moving = true;
        player.y = newYPos.y;
      }
    }
  }
}

function canMoveTo(pos) {

  const { row, col } = coordFromPos(pos);

  if (row < 0 || row >= GRID_HEIGHT || col < 0 || col >= GRID_WIDTH) {
    return false;
  }
  const tileType = getTileAtCoordinate({ row, col });
  switch (tileType) {
    case 0:
    case 1:
      return true
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
      return false
  }
}

function getTilesUnderPlayer(player) {
  const tiles = [];
  /* 
    const topLeft = {
      x: player.x - player.regX + player.hitbox.x,
      y: player.hitbox.y
    }
    const topRight = {
      x: player.x - player.regX + player.hitbox.x + player.hitbox.width,
      y: player.hitbox.y
    } */
  const topLeft = {
    x: player.x - player.regX + player.hitbox.x,
    y: player.y
  };
  const topRight = { x: player.x - player.regX + player.hitbox.x + player.hitbox.w,
     y: player.y };
  const bottomLeft = { x: player.x,
     y: player.y + player.hitbox.h };
  const bottomRight = { x: player.x + player.hitbox.w,
     y: player.y + player.hitbox.h };
}

function checkForItemPickup() {
  const { row, col } = coordFromPos(player); // get player pos
  const modelItem = items[row][col]; // get the item from player pos

  if (modelItem !== 0) {
    handleItemPickup(row, col, modelItem);
  }
}



//#endregion
//#region VIEW
// ################### VIEW ###################

function handleItemPickup(row, col, itemType) {
  
  items[row][col] = 0; // clear the item from the model

  
  const visualItems = document.querySelectorAll("#items .item");
  const visualItem = visualItems[row * GRID_WIDTH + col];
  visualItem.classList.remove(getClassForItemType(itemType)); // remove from view

  //TODO maybe implement score or something depending on the item type
  //TODO maybe implement different visual feedback depending on the item type. E.g closed ches > open chest
}


function displayPlayerAnimation() {
  const visualPlayer = document.querySelector("#player");
  if (player.moving) {
    visualPlayer.classList.add("animate")
    visualPlayer.classList.remove("left", "right", "up", "down")
    visualPlayer.classList.add(player.direction)
  } else {
    visualPlayer.classList.remove("animate")
  }
}

function displayPlayerAtPosition() {
  const visualPlayer = document.querySelector("#player");
  visualPlayer.style.translate = `
    ${player.x - player.regX}px ${player.y - player.regY}px
    `;
}

function displayEnemyAtPosition() {
  const visualEnemy = document.querySelector("#enemy");
  visualEnemy.style.translate = `
    ${enemy.x - enemy.regX}px ${enemy.y - enemy.regY}px
    `;
}

function displayAttackAtPosition() {
  const visualAttack = document.querySelector("#attack");
  visualAttack.style.translate = `
    ${attack.x - attack.regX}px ${attack.y - attack.regY}px
    `;

}

function createTiles() {
  const background = document.querySelector("#background");

  //scan igennem alle rows og cols
  // for hver af dem; lav en div.item og tilføj til background
  for (let row = 0; row < GRID_HEIGHT; row++) {
    for (let col = 0; col < GRID_WIDTH; col++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      background.append(tile);
    }
  }

  background.style.setProperty("--GRID_WIDTH", GRID_WIDTH);
  background.style.setProperty("--GRID_HEIGHT", GRID_HEIGHT);
  background.style.setProperty("--TILE_SIZE", TILE_SIZE + "px");



}
function displayTiles() {
  const visualTiles = document.querySelectorAll("#background .tile"); //returns an array of all the tiles

  for (let row = 0; row < GRID_HEIGHT; row++) {
    for (let col = 0; col < GRID_WIDTH; col++) {
      const modelTile = getTileAtCoordinate({ row, col });
      const visualTile = visualTiles[row * GRID_WIDTH + col]; //find the visual tile that corresponds to the model tile in a 1D array

      visualTile.classList.add(getClassForTileType(modelTile));
    }
  }

}

function createItems(){
  const items = document.querySelector("#items");

  for (let row = 0; row < GRID_HEIGHT; row++) {
    for (let col = 0; col < GRID_WIDTH; col++) {
      const item = document.createElement("div");
      item.classList.add("item");
      items.append(item);
    }
  }

  items.style.setProperty("--GRID_WIDTH", GRID_WIDTH);
  items.style.setProperty("--GRID_HEIGHT", GRID_HEIGHT);
  items.style.setProperty("--TILE_SIZE", TILE_SIZE + "px");

}

function displayItems() {
  const visualItems = document.querySelectorAll("#items .item"); //returns an array of all the tiles

  for (let row = 0; row < GRID_HEIGHT; row++) {
    for (let col = 0; col < GRID_WIDTH; col++) {
      const modelItem = items[row][col];
      const visualItem = visualItems[row * GRID_WIDTH + col]; //find the visual tile that corresponds to the model tile in a 1D array

      visualItem.classList.add(getClassForItemType(modelItem));
    }
  }
  
}

function pickUpItem({ row, col }) {

}

function getClassForItemType(itemType) {
  switch (itemType) {
    case 0: return "empty";
    case 1: return "gold";
    case 2: return "gems";
    case 3: return "chest-closed";
    default: return "empty";
  }
}

function getClassForTileType(tileType) {
  switch (tileType) {
    case 0: return "grass";
    case 1: return "path";
    case 2: return "wall";
    case 3: return "water";
    case 4: return "tree";
    case 5: return "door";
    case 6: return "lava";
  }
}
//#endregion

//#region DEBUGGING

function showDebugging() {
  showDebugTileUnderPlayer();
  showDebugPlayerRect();
  showDebugPlayerRegPoint();
  showDebugPlayerHitbox();
}

function highlightTile({ row, col }) {
  const visualTiles = document.querySelectorAll("#background .tile");
  const visualTile = visualTiles[row * GRID_WIDTH + col];
  visualTile.classList.add("highlight");


}

function unhighlightTile({ row, col }) {
  const visualTiles = document.querySelectorAll("#background .tile");
  const visualTile = visualTiles[row * GRID_WIDTH + col];
  visualTile.classList.remove("highlight");
}

let lastPlayerCoord = { row: 0, col: 0 };

function showDebugTileUnderPlayer() {
  const coord = coordFromPos(player);

  if (coord.row != lastPlayerCoord.row || coord.col != lastPlayerCoord.col) {
    unhighlightTile(lastPlayerCoord);
    highlightTile(coord);
  }

  lastPlayerCoord = coord;
}

function showDebugPlayerRect() {
  const visualPlayer = document.querySelector("#player");
  if (!visualPlayer.classList.contains("show-rect")) {
    visualPlayer.classList.add("show-rect");
  }
}

function showDebugPlayerRegPoint() {
  const visualPlayer = document.querySelector("#player");
  if (!visualPlayer.classList.contains("show-reg-point")) {
    visualPlayer.classList.add("show-reg-point");
  }
  visualPlayer.style.setProperty("--regX", player.regX + "px");
  visualPlayer.style.setProperty("--regY", player.regY + "px");
}

function showDebugPlayerHitbox() {
  const visualPlayer = document.querySelector("#player");
  if (!visualPlayer.classList.contains("show-hitbox")) {
    visualPlayer.classList.add("show-hitbox");
  }
  visualPlayer.style.setProperty("--hitboxX", player.hitbox.x + "px");
  visualPlayer.style.setProperty("--hitboxY", player.hitbox.y + "px");
  visualPlayer.style.setProperty("--hitboxWidth", player.hitbox.w + "px");
  visualPlayer.style.setProperty("--hitboxHeight", player.hitbox.h + "px");
}
//#endregion