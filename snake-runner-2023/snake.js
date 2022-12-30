const platform = document.getElementById("platform");

const OBSTACLE_COLOR = "#ffff00";
const GRID_COLOR = "#006699";
const TOTAL_CELLS = 9000;
const numColumns = 100;

var LEVEL = 0;

const FRUIT_COLOR = "red";
const FRUIT_AMOUNT = 1;
const SNAKEcolor = "white";


let xOffset = 0;
let yOffset = 0;

var tbl = document.createElement("table");
tbl.cellSpacing = "0";

appendTable(platform)

const currentLevel = drawRandomLevel(4);

console.log('rows', tbl.rows);


function render(level) {
  for (var i = 0; i < currentLevel.length; i++) {

    for (var j = 0; j < currentLevel[i]?.length; j++) {
      if (tbl.rows[i]?.cells[j]) {
        tbl.rows[j].cells[i].style.backgroundColor = "red";
        // console.log('dave', tbl.rows[i]?.cells[j])
      }
    }
  }
};

render();


// setInterval(() => {
//   drawRandomLevel(4, tbl)
// }, 2000)


// let cells = document.getElementsByTagName("td")
// setInterval(() => {
//   window.requestAnimationFrame(() => {
//     for (let i = 0; i < cells.length; i++) {

//       cells[cells.length - i - 1].style.backgroundColor = cells[cells.length - i - 101]?.style?.backgroundColor;
//     };
//   });
// }, 30)

/*
MOVE LEFT
for (let i = 0; i < cells.length; i++) {
    cells[i].style.backgroundColor = cells[i + 1]?.style?.backgroundColor;
};

MOVE UP
 for (let i = 0; i < cells.length; i++) {
    cells[i].style.backgroundColor = cells[i - 100]?.style?.backgroundColor;
};


DOWN AND TO THE LEFT
 for (let i = 0; i < cells.length; i++) {
    cells[cells.length - i - 1].style.backgroundColor = cells[cells.length - i - 100]?.style?.backgroundColor;
};

DOWN
 for (let i = 0; i < cells.length; i++) {
    cells[cells.length - i - 1].style.backgroundColor = cells[cells.length - i - 101]?.style?.backgroundColor;
};

*/

/*******************************************/
/*         animate collision               */
/*******************************************/


function explode(x, y) {
  if (y < 0) y = 0;
  if (y >= tbl.rows.length) y = tbl.rows.length - 1;
  if (x < 0) x = 0;
  if (x >= numColumns) x = numColumns - 1;

  tbl.rows[y].cells[x].style.backgroundColor = "#ff00ff";
}


/*******************************************/
/*     animate radiating squares           */
/*******************************************/

function radiate(surface, multiplier, x, y, color) {
  document.onkeyup = null;
  document.onkeydown = null;

  clearInterval(interval);
  //draw a line 2 less than x 2 less than y of width 4
  var startX = x - multiplier;
  var startY = y;
  var length = multiplier * 2;

  //draw a line 2 less than x 2 less than y of height 4


  for (var i = 0; i <= length; i++) {


    //horizontal

    try { surface.rows[startY - multiplier].cells[startX + i].style.backgroundColor = color; } catch (e) { }
    try { surface.rows[startY + multiplier].cells[startX + i].style.backgroundColor = color; } catch (e) { }

    //vertical
    try { surface.rows[startY - multiplier + i].cells[startX].style.backgroundColor = color; } catch (e) { }
    try { surface.rows[startY - multiplier + i].cells[startX + length].style.backgroundColor = color; } catch (e) { }



  }

  multiplier += 2;

  if (multiplier > 8) {
    if (color == "#ffff00") {
      setTimeout(startNextLevel, 1000);
    }
    return;
  }
  return radiate(surface, multiplier, x, y, color);
}


/*******************************************/
/*           keyboard events               */
/*******************************************/

/* 2023 addition, touch events! only 12 years later ... */

function onTouchEvent(e) {

  // hack to re-use the keyboard event listener
  const touchConvertedToKey = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
  }[e.target.id];

  lastDirection.innerText = e.target.id + touchConvertedToKey + 'dave';

  console.log('change direction', touchConvertedToKey);
  changeDirection({ which: touchConvertedToKey })
}


/*************************************/
/*         draw random level         */
/*************************************/

function drawRandomLevel(difficulty, level = []) {

  // if(!level){
  //    for (var i = 0; i<TOTAL_CELLS;i++){
  //     level[i] =
  //    }
  // }

  const localY = 90;
  var randX = Math.floor(Math.random() * (numColumns / 2.2 - 6)) + 6;
  var randW = Math.ceil((Math.random() * (numColumns / 2.2 - randX)));

  if (randW > 3) randW = Math.ceil(randW / (difficulty + 1));

  var randY = Math.floor(Math.random() * (localY)) + 4;
  var randH = Math.ceil(Math.random() * (localY - randY)) - 4;

  // L rect
  drawRect(level, randX, randY, randW, randH);

  //horizontal L mirror rect
  var mirrorX = numColumns - randX - randW;
  drawRect(level, mirrorX, randY, randW, randH);

  //vertical L  mirror rect
  var mirrorY = localY - randY - randH;
  drawRect(level, randX, mirrorY, randW, randH);

  //vertical & horizontal L  mirror rect
  drawRect(level, mirrorX, mirrorY, randW, randH);

  if (difficulty == 0) return level;
  return drawRandomLevel(difficulty - 1, level);
}


/*************************************/
/*           draw rect               */
/*************************************/

function drawRect(level, x, y, _w, _h) {
  for (var i = 0; i < _h; i++) {
    for (var j = 0; j < _w; j++) {
      if (!level[i + y]) level[i + y] = [];
      level[i + y][j + x] = true;
    }
  }
}



/*************************************/
/*        draw main board            */
/*************************************/

function appendTable(element) {
  var tblBody = document.createElement("tbody");
  var row = document.createElement("tr");

  //boxDivArr[yOffset] = new Array();

  for (var i = 0; i < TOTAL_CELLS; i++) {
    if (i % numColumns == 0 && i > 0) {
      //yOffset += 1;
      xOffset = 0;
      //boxDivArr[yOffset] = new Array();
      tblBody.appendChild(row);
      row = document.createElement("tr");
      row.className = "boxTable";

    }

    var cell = document.createElement("td");
    //cell.style.backgroundColor = GRID_COLOR;
    row.appendChild(cell);
    cell = null;
    delete cell;
    xOffset += 1;
  }
  row = null;
  delete row;
  tbl.appendChild(tblBody);
  element.appendChild(tbl);
}

