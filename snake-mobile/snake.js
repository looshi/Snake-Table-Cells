
window.onload = init;
var boxDiv;
var boxDivArr = new Object();

var numColumns = 40;
var TOTAL_CELLS = 2000;


var defaultChar = "#";

var LEFT = false;
var RIGHT = false;
var UP = false;
var DOWN = false;


var posX = 40;     //head position of the snake
var posY = 10;     //head position of the snake

var xOffset;
var yOffset;

var tail = new Array();      // keep a record of where the snake has been
var currentTailLength = 30;  // how long the tail currently is

var currentScore;

//visual divs
var scoreDiv;
var levelOutput;

var first = true;

var interval;
var startButton;

/* 2023 */
let lastDirection;
let dpad;

var tbl;
var tblBody;

var LEVEL = 0;
var OBSTACLE_COLOR = "rgb(255, 255, 255)";
var FRUIT_COLOR = "rgb(255, 0, 0)";
var FRUIT_AMOUNT = 1;
var HALLPASS_AMOUNT = 3;
var hallpassOutput;
var LIVES_COUNT = 3;
var livesOutput;
var GRID_COLOR = "#006699";
var SNAKE_COLOR = "rgb(225, 225, 225)";

var SPACE_BAR_DEPRESSED = false;
var SPACE_BAR_SWITCH = true;

function init() {
  console.log('dave init')
  SPACE_BAR_SWITCH = true;

  //visual readout divs
  scoreDiv = document.getElementById("points");
  scoreDiv.innerHTML = "score: 0 ";
  scoreDiv.style.color = "#cccccc";

  levelOutput = document.getElementById("levelOutput");
  levelOutput.style.color = "#a1a1a1";

  hallpassOutput = document.getElementById("hallpassOutput");
  hallpassOutput.style.color = "#0000ff";

  LIVES_COUNT = 3
  livesOutput = document.getElementById("livesOutput");
  livesOutput.innerHTML = "lives: " + LIVES_COUNT;
  livesOutput.style.color = "#ff0000";

  // 2023
  lastDirection = document.getElementById('lastDirection');
  dpad = document.getElementById('dpad');
  // This convoluded setup prevents the 300ms delay on touchend
  dpad.addEventListener('click', onTouchEvent);
  dpad.addEventListener('touchstart', (e) => e.preventDefault());
  dpad.addEventListener('touchend', (e) => e.target.click());




  document.onkeydown = changeDirection;
  document.onkeyup = onKeyUp;

  startButton = document.getElementById("start")
  startButton.onmousedown = startGame;
  currentScore = 0;
  nextLevel();
}


function startNextLevel() {
  console.log('dave', startNextLevel)
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = true;
  interval = setInterval(moveSnake, 100 - (10 * LEVEL));
  nextLevel();
}

function nextLevel() {


  SPACE_BAR_SWITCH = true;

  document.onkeyup = onKeyUp;
  document.onkeydown = changeDirection;

  LEVEL++;
  levelOutput.innerHTML = "level: " + LEVEL;

  FRUIT_COLOR = "rgb(255, 0, 0)";
  FRUIT_AMOUNT = LEVEL;

  HALLPASS_AMOUNT = 3;
  hallpassOutput.innerHTML = "passes: " + HALLPASS_AMOUNT;

  xOffset = 0;
  yOffset = 0;
  posX = numColumns / 2;
  posY = 2;
  tail = new Array();
  currentTailLength = 30;

  if (LEVEL > 1) {
    document.getElementById("wrap").removeChild(tbl);
    tbl = null;
    delete tbl;
  }

  tbl = document.createElement("table");
  // use a pass by touching anywhere on the snake game area
  tbl.addEventListener('touchend', hallPass);
  tbl.cellSpacing = "0";
  tblBody = document.createElement("tbody");

  // remove?
  if (LEVEL % 2 == -1) {
    createBlocks();
    drawCustomLevel(tbl, CUSTOM_LEVELS[0]);

  }
  else {
    createBlocks();
    createObstacles(LEVEL, tbl);
    makeFruit(FRUIT_AMOUNT);
  }
}


/*************************************/
/*      start, stop, resume          */
/*************************************/

function startGame(e) {
  LEVEL = 1;
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = true;
  console.log('dave start game');
  interval = setInterval(moveSnake, 100);
  startButton.innerText = "Pause";
  startButton.onmousedown = pause;
}

function pause() {
  document.onkeyup = null;
  clearInterval(interval);
  startButton.innerText = "Resume";
  startButton.onmousedown = resume;
}

function resume() {
  document.onkeyup = onKeyUp;
  startButton.innerText = "Pause";
  startButton.onmousedown = pause;
  interval = setInterval(moveSnake, 100 - (10 * LEVEL));
}

function replay() {
  LEVEL = 0;
  document.getElementById("wrap").removeChild(tbl);
  tbl = null;
  delete tbl;
  init();
  startGame(null);
  document.getElementById("points").style.color = "#999999";
}

function gameOver() {
  document.onkeyup = null;
  document.onkeydown = null;
  livesOutput.innerHTML = "lives : " + LIVES_COUNT;
  livesOutput.style.color = "#ff0000";
  document.getElementById("points").style.color = "#ff0000";
  clearInterval(interval);
  radiate(tbl, 2, posX, posY, "#ff0000");
  startButton.innerText = "Play Again";
  startButton.onmousedown = replay;
}



/*******************************************/
/*         animate collision               */
/*******************************************/


function explode(_x, _y) {
  if (_y < 0) _y = 0;
  if (_y >= tbl.rows.length) _y = tbl.rows.length - 1;
  if (_x < 0) _x = 0;
  if (_x >= numColumns) _x = numColumns - 1;

  tbl.rows[_y].cells[_x].style.backgroundColor = "#ff00ff";
}



/*******************************************/
/*     animate radiating squares           */
/*******************************************/

function radiate(_surface, _multiplier, _x, _y, _color) {
  document.onkeyup = null;
  document.onkeydown = null;

  clearInterval(interval);
  //draw a line 2 less than x 2 less than y of width 4
  var startX = _x - _multiplier;
  var startY = _y;
  var length = _multiplier * 2;

  //draw a line 2 less than x 2 less than y of height 4


  for (var i = 0; i <= length; i++) {


    //horizontal

    try { _surface.rows[startY - _multiplier].cells[startX + i].style.backgroundColor = _color; } catch (e) { }
    try { _surface.rows[startY + _multiplier].cells[startX + i].style.backgroundColor = _color; } catch (e) { }

    //vertical
    try { _surface.rows[startY - _multiplier + i].cells[startX].style.backgroundColor = _color; } catch (e) { }
    try { _surface.rows[startY - _multiplier + i].cells[startX + length].style.backgroundColor = _color; } catch (e) { }



  }

  _multiplier += 2;

  if (_multiplier > 8) {
    if (_color == "#ffff00") {
      setTimeout(startNextLevel, 1000);
    }
    return;
  }
  return radiate(_surface, _multiplier, _x, _y, _color);
}



/*************************************************************************/
/*                           Hallpass                                    */
/*          allows you to pass through objects once per level            */
/*************************************************************************/

function hallPass() {

  var missileX = 0;
  var missileY = 0;

  if (HALLPASS_AMOUNT > 0) {
    HALLPASS_AMOUNT--;
    hallpassOutput.innerHTML = "passes: " + HALLPASS_AMOUNT;
    if (LEFT) {

      drawRect(tbl, 0, posY, posX, 1, GRID_COLOR);
    }
    if (RIGHT) drawRect(tbl, posX + 2, posY, numColumns - posX - 2, 1, GRID_COLOR);
    if (UP) drawRect(tbl, posX, 0, 1, yOffset, GRID_COLOR);
    if (DOWN) drawRect(tbl, posX, posY + 1, 1, yOffset - posY - 1, GRID_COLOR);
  }
}


/*******************************************/
/*         UI mouse events                 */
/*******************************************/

function onButtonOver(e) {
  e.target.style.backgroundPosition = "0 -62px";
}
function onButtonOut(e) {
  e.target.style.backgroundPosition = "top";
}


//go faster when spacebar is down, resume normal speed when spacebar is up
function goFaster() {
  if (SPACE_BAR_DEPRESSED) {
    clearInterval(interval);
    interval = setInterval(moveSnake, 40);
  }
  SPACE_BAR_SWITCH = false;
}

function goNormalSpeed() {
  SPACE_BAR_SWITCH = true;
  clearInterval(interval);
  interval = setInterval(moveSnake, 100 - (10 * LEVEL));
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


  changeDirection({ which: touchConvertedToKey })
}


function onKeyUp(e) {
  switch (e.which) {
    //spacebar
    case 32:
      goNormalSpeed();
      break;

    default:
      break;
  }
}

function changeDirection(e) {

  switch (e.which) {
    case 37:
      LEFT = true;
      RIGHT = false;
      UP = false;
      DOWN = false;
      break;

    case 38:
      LEFT = false;
      RIGHT = false;
      UP = true;
      DOWN = false;
      break;

    case 39:
      LEFT = false;
      RIGHT = true;
      UP = false;
      DOWN = false;
      break;

    case 40:
      LEFT = false;
      RIGHT = false;
      UP = false;
      DOWN = true;
      break;

    //spacebar
    case 32:
      SPACE_BAR_DEPRESSED = SPACE_BAR_SWITCH;
      if (SPACE_BAR_DEPRESSED)
        goFaster();
      break;

    //ctrl
    case 17:

      break;

    default:
      hallPass();
      break;
  }
}


/*******************************************/
/*     track LIVES amount of men           */
/*******************************************/

function reduceMenAmount() {

  document.onkeyup = null;

  tail[tail.length - 1].style.backgroundColor = FRUIT_COLOR;
  clearInterval(interval);
  setTimeout(resumeMoveSnake, 700);
  livesOutput.innerHTML = "lives: " + LIVES_COUNT;

  if (LIVES_COUNT == 0) {
    gameOver();
  }

}

function resumeMoveSnake() {
  document.onkeyup = onKeyUp;
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = true;
  posX = numColumns / 2;
  posY = 2;

  //remove old tail
  for (var i = 0; i < tail.length; i++) {
    tail[i].style.backgroundColor = GRID_COLOR;
  }

  tail = new Array();

  interval = setInterval(moveSnake, 100 - (10 * LEVEL));
}



/*******************************************/
/*      interval Move Snake                */
/*******************************************/


function moveSnake(e) {
  if (LEFT)
    posX--;

  if (RIGHT)
    posX++;

  if (UP)
    posY--;

  if (DOWN)
    posY++;



  //check if out of bounds  or if hit tail
  if (posY < 0 || posY > tbl.rows.length - 1) {
    LIVES_COUNT--;
    if (LIVES_COUNT == 0) { gameOver(); return; }
    reduceMenAmount();

  }
  if (posX < 0 || posX > tbl.rows[posY].cells.length - 1) {
    LIVES_COUNT--;
    if (LIVES_COUNT == 0) { gameOver(); return; }
    reduceMenAmount();
  }

  // hit tail

  if (tail[1]) {
    if (tbl.rows[posY].cells[posX].style.backgroundColor == SNAKE_COLOR) {
      LIVES_COUNT--;
      if (LIVES_COUNT == 0) { gameOver(); return; }
      reduceMenAmount();
    }
    if (tbl.rows[posY].cells[posX].style.backgroundColor == OBSTACLE_COLOR) {
      LIVES_COUNT--;
      if (LIVES_COUNT == 0) { gameOver(); return; }
      reduceMenAmount();
    }
  }



  //tail keeps a record of all snake positions up to limit currentTailLength

  tail.push(tbl.rows[posY].cells[posX]);

  if (tail.length > currentTailLength) {
    //if(tail[0]!=fruitBox)
    tail[0].style.backgroundColor = GRID_COLOR;    //put the end of the tail back to normal

    tail.shift();    // remove the end of the tail
  }



  //check if GOT FRUIT

  if (tbl.rows[posY].cells[posX].style.backgroundColor == FRUIT_COLOR) {
    currentTailLength += 30;
    currentScore *= 2;
    //clearInterval(interval);
    //interval = setInterval ( moveSnake, 100-currentTailLength/4 );
    FRUIT_AMOUNT--;

  }

  tbl.rows[posY].cells[posX].style.backgroundColor = SNAKE_COLOR;

  if (FRUIT_AMOUNT == 0) radiate(tbl, 2, posX, posY, "#ffff00");



  currentScore += 1;
  if (tail[1])
    document.getElementById("points").innerHTML = "score:&nbsp;" + currentScore;

}


/*******************************************/
/*                Make Fruit               */
/*******************************************/


function makeFruit(_amount) {
  var randX = Math.ceil(Math.random() * (numColumns - 16)) + 16;
  var randY = Math.floor(Math.random() * (yOffset - 20)) + 20;


  //fruitBox.style.backgroundColor = "#ff0000";
  var colorToNotBe = OBSTACLE_COLOR;
  var colorThatItIs = tbl.rows[randY - 10].cells[randX - 10].style.backgroundColor;

  while (colorToNotBe == colorThatItIs) {
    randX = Math.floor(Math.random() * (numColumns - 20)) + 20;
    randY = Math.floor(Math.random() * (yOffset - 20)) + 20;
    colorToNotBe = tbl.rows[randY - 10].cells[randX - 10].style.backgroundColor;

  }
  tbl.rows[randY - 10].cells[randX - 10].style.backgroundColor = FRUIT_COLOR;



  if (_amount == 1) return;

  return makeFruit(_amount - 1);

}






/*************************************/
/*       create obstacles            */
/*************************************/

function createObstacles(_difficulty, _surface) {

  drawRandomLevel(_difficulty, _surface);


}


function drawCustomLevel(_difficulty, _surface) {




}


/*************************************/
/*         draw random level         */
/*************************************/

function drawRandomLevel(_difficulty, _surface) {

  var randX = Math.floor(Math.random() * (numColumns / 2.2 - 6)) + 6;
  var randW = Math.ceil((Math.random() * (numColumns / 2.2 - randX)));

  if (randW > 3) randW = Math.ceil(randW / (_difficulty + 1));

  //document.getElementById("levelOutput").innerHTML+="<br/>"+randW;

  var randY = Math.floor(Math.random() * (yOffset)) + 4;
  var randH = Math.ceil(Math.random() * (yOffset - randY)) - 4;

  // L rect
  drawRect(_surface, randX, randY, randW, randH);

  //horizontal L mirror rect
  var mirrorX = numColumns - randX - randW;
  drawRect(_surface, mirrorX, randY, randW, randH);

  //vertical L  mirror rect
  var mirrorY = yOffset - randY - randH;
  drawRect(_surface, randX, mirrorY, randW, randH);

  //vertical & horizontal L  mirror rect
  drawRect(_surface, mirrorX, mirrorY, randW, randH);

  if (_difficulty == 0) return;
  return drawRandomLevel(_difficulty - 1, tbl);
}


/*************************************/
/*           draw rect               */
/*************************************/

function drawRect(_surface, _x, _y, _w, _h, _bgColor) {
  if (_bgColor == undefined) _bgColor = OBSTACLE_COLOR;

  for (var i = 0; i < _h; i++) {
    for (var j = 0; j < _w; j++) {
      //don't overwrite existing fruit or tail
      if (_surface.rows[i + _y].cells[j + _x].style.backgroundColor != FRUIT_COLOR)
        if (_surface.rows[i + _y].cells[j + _x].style.backgroundColor != SNAKE_COLOR)
          _surface.rows[i + _y].cells[j + _x].style.backgroundColor = _bgColor;
    }
  }
}



/*************************************/
/*        draw main board            */
/*************************************/

function createBlocks() {
  var row = document.createElement("tr");

  //boxDivArr[yOffset] = new Array();

  for (var i = 0; i < TOTAL_CELLS; i++) {
    if (i % numColumns == 0 && i > 0) {
      yOffset += 1;
      xOffset = 0;
      //boxDivArr[yOffset] = new Array();
      tblBody.appendChild(row);
      row = document.createElement("tr");
      row.className = "boxTable";

    }

    var cell = document.createElement("td");
    cell.className = "boxCell";
    cell.style.backgroundColor = GRID_COLOR;
    row.appendChild(cell);
    cell = null;
    delete cell;
    xOffset += 1;
  }
  row = null;
  delete row;
  tbl.appendChild(tblBody);
  console.log('adding table dave', tbl);
  document.getElementById("wrap").appendChild(tbl);
}

