window.onload = init;
var boxDiv;
var boxDivArr = new Object();

var numColumns;
var TOTAL_CELLS = 8970;

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

var tbl;
var tblBody;

var LEVEL = 0;
var OBSTACLE_COLOR = "rgb(255, 255, 255)";
var FRUIT_COLOR = "rgb(255, 0, 0)"; 
var FRUIT_AMOUNT = 1;
var HALLPASS_AMOUNT = 3;
var hallpassOutput;
var MEN_AMOUNT = 3;
var menOutput;
var GRID_COLOR = "#006699";
var SNAKE_COLOR = "rgb(225, 225, 225)";
var iconOutput;

var SPACE_BAR_DEPRESSED = false;
var SPACE_BAR_SWITCH = true;

function init()
{
	SPACE_BAR_SWITCH = true;
	
	//visual readout divs
	scoreDiv = document.getElementById("points");
	scoreDiv.innerHTML = "score : 0 ";
	scoreDiv.style.color="#cccccc";
	
	iconOutput = document.getElementById("iconOutput");
	iconOutput.style.color="#ff0000";
	iconOutput.innerHTML = "S S";
	
	levelOutput = document.getElementById("levelOutput");
	levelOutput.style.color="#a1a1a1";
	
	hallpassOutput = document.getElementById("hallpassOutput");
	hallpassOutput.style.color="#0000ff";
	
	MEN_AMOUNT = 3
	menOutput = document.getElementById("menOutput");
	menOutput.innerHTML = "lives : "+MEN_AMOUNT;
	menOutput.style.color="#ff0000";
	
	document.getElementById("gridAnimation").style.width = window.innerWidth;
	 
	numColumns = 130;

    document.onkeydown=changeDirection;
    document.onkeyup=onKeyUp;
    
	startButton = document.getElementById("start")
	startButton.onmousedown = startGame;
    currentScore = 0;
	nextLevel();
}


function startNextLevel()
{
	LEFT = false;
	RIGHT = false;
	UP = false;
	DOWN = true;
	interval = setInterval ( moveSnake, 100-(10*LEVEL) );
	nextLevel();
}

function nextLevel()
{
	
	
	SPACE_BAR_SWITCH = true;
   
    document.onkeyup=onKeyUp;
	document.onkeydown=changeDirection;
	
	LEVEL++;	
    levelOutput.innerHTML = "level : "+LEVEL;
	
	FRUIT_COLOR = "rgb(255, 0, 0)"; 
    FRUIT_AMOUNT = LEVEL;
	
	HALLPASS_AMOUNT = 3;
	hallpassOutput.innerHTML = "hallpasses : "+HALLPASS_AMOUNT;
	
	xOffset = 0;
	yOffset = 0;
	posX = numColumns/2;
	posY = 2;
	tail = new Array();
	currentTailLength = 30;
	 
	if(LEVEL>1)
	{
		document.body.removeChild(tbl);	
		tbl = null;	
		delete tbl;
	}
	
	tbl = document.createElement("table");
	tbl.cellSpacing = "0";
    tblBody = document.createElement("tbody");
	
	 

	if(LEVEL%2==-1)
	{
		createBlocks();
		drawCustomLevel(tbl,CUSTOM_LEVELS[0]);
		
	}
	else
	{
		createBlocks();
		createObstacles(LEVEL,tbl);
		makeFruit(FRUIT_AMOUNT);
	}
	
	//output.innerHTML = CUSTOM_LEVELS.length+" "+(CUSTOM_LEVELS.length/LEVEL)%LEVEL;
}


/*************************************/
/*      start, stop, resume          */
/*************************************/

function startGame(e)
{
	LEVEL = 1;
	LEFT = false;
	RIGHT = false;
	UP = false;
	DOWN = true;
	interval = setInterval ( moveSnake, 100 );
	startButton.firstChild.innerHTML = "pause";
	startButton.onmousedown = pause;
}

function pause()
{
	document.onkeyup=null;
	clearInterval(interval);
	startButton.firstChild.innerHTML = "play";
	startButton.onmousedown = resume;
}

function resume()
{
	document.onkeyup=onKeyUp;
	startButton.firstChild.innerHTML = "pause";
	startButton.onmousedown = pause;
	interval = setInterval ( moveSnake, 100-(10*LEVEL) );
}

function replay()
{
	LEVEL = 0;
	document.body.removeChild(tbl);	
	tbl = null;
	delete tbl;
	init();
	startGame(null);
	document.getElementById("points").style.color="#999999";
}
	
function gameOver()
{
	 
	document.onkeyup=null;
	document.onkeydown=null;
	menOutput.innerHTML = "lives : "+MEN_AMOUNT;
	menOutput.style.color="#ff0000";
	document.getElementById("points").style.color="#ff0000";
	clearInterval(interval);
	radiate(tbl,2,posX,posY,"#ff0000");
	startButton.firstChild.innerHTML = "replay";
	startButton.onmousedown = replay;	
}



/*******************************************/
/*         animate collision               */
/*******************************************/


function explode(_x,_y)
{
	if(_y<0)_y=0;
	if(_y>=tbl.rows.length)_y=tbl.rows.length-1;
	if(_x<0)_x=0;
	if(_x>=numColumns)_x=numColumns-1;
	 
	tbl.rows[_y].cells[_x].style.backgroundColor = "#ff00ff";
}



/*******************************************/
/*     animate radiating squares           */
/*******************************************/

function radiate(_surface,_multiplier,_x,_y,_color)
{
	document.onkeyup=null;
	document.onkeydown=null;
	
	clearInterval(interval);
	//draw a line 2 less than x 2 less than y of width 4
	var startX = _x-_multiplier;
	var startY = _y;
	var length = _multiplier*2;
	
	//draw a line 2 less than x 2 less than y of height 4
	
	
	for(var i=0;i<=length;i++)
	{
		
		
			//horizontal
			
 			try{_surface.rows[startY-_multiplier].cells[startX+i].style.backgroundColor = _color;}catch(e){} 
			try{_surface.rows[startY+_multiplier].cells[startX+i].style.backgroundColor = _color;}catch(e){}  
		
			//vertical
			try{_surface.rows[startY-_multiplier+i].cells[startX].style.backgroundColor = _color; }catch(e){} 
			try{_surface.rows[startY-_multiplier+i].cells[startX+length].style.backgroundColor = _color; }catch(e){} 
		


	}
	
	_multiplier+=2;
	
	if(_multiplier>8)
	{
		if(_color=="#ffff00")
		setTimeout ( startNextLevel, 1000 );
		return;
        
		if(_color=="#ff0000")
		return;
	}
	return radiate(_surface,_multiplier,_x,_y,_color);
}



/*************************************************************************/
/*                           Hallpass                                    */
/*          allows you to pass through objects once per level            */
/*************************************************************************/


function hallPass()
{

	var missileX=0;
	var missileY=0;
	
	if(HALLPASS_AMOUNT>0)
	{
		HALLPASS_AMOUNT--;
		hallpassOutput.innerHTML = "hallpasses : "+HALLPASS_AMOUNT;
		if(LEFT)
		{
			
 			drawRect(tbl,0,posY,posX,1,GRID_COLOR);   
		}
		if(RIGHT) drawRect(tbl,posX+2,posY,numColumns-posX-2,1,GRID_COLOR);
		if(UP)drawRect(tbl,posX,0,1,yOffset,GRID_COLOR);
		if(DOWN)  drawRect(tbl,posX,posY+1,1,yOffset-posY-1,GRID_COLOR);
	}

	
		
}

/*
function fireMissile(_surface,_x,_y,_w,_h,_bgColor)
{	
	for(var i=0;i<_h;i++)
	{
 		for(var j=0;j<_w;j++)
		{
			_surface.rows[i+_y].cells[j+_x].style.backgroundColor = _bgColor;
		}
	}
}
*/

/*******************************************/
/*         UI mouse events                 */
/*******************************************/

function onButtonOver(e)
{
	e.target.style.backgroundPosition = "0 -62px";
}
function onButtonOut(e)
{
	e.target.style.backgroundPosition = "top";
}


//go faster when spacebar is down, resume normal speed when spacebar is up
function goFaster()
{
	if(SPACE_BAR_DEPRESSED)
	{
		clearInterval(interval);
		interval = setInterval ( moveSnake, 40 );
		//document.getElementById("output").innerHTML += "goFaster";
	}
	SPACE_BAR_SWITCH = false;
}

function goNormalSpeed()
{
	SPACE_BAR_SWITCH = true;
	clearInterval(interval);
	interval = setInterval ( moveSnake, 100-(10*LEVEL) );
	//document.getElementById("output").innerHTML += "goNormalSpeed";
}



/*******************************************/
/*           keyboard events               */
/*******************************************/


function onKeyUp(e)
{
	switch(e.which)
	{
		//spacebar
		case 32 : 
		goNormalSpeed();
		break;
		
		default :
		break;
	}
}



function changeDirection(e)
{
     
	switch(e.which)
	{
		case 37 : 
		LEFT = true;
		RIGHT = false;
		UP = false;
		DOWN = false;
		break;
		
		case 38 : 
		LEFT = false;
		RIGHT = false;
		UP = true;
		DOWN = false;
		break;
		
		case 39 : 
		LEFT = false;
		RIGHT = true;
		UP = false;
		DOWN = false;
		break;
		
		case 40 : 
		LEFT = false;
		RIGHT = false;
		UP = false;
		DOWN = true;
		break;
		
		//spacebar
		case 32 : 
		SPACE_BAR_DEPRESSED = SPACE_BAR_SWITCH;
		if(SPACE_BAR_DEPRESSED)
		goFaster();
		break;
		
		//ctrl
		case 17 : 
		
		break;
		
		default :
		hallPass();
		break;
	}
}


/*******************************************/
/*     track LIVES amount of men           */
/*******************************************/

function reduceMenAmount()
{
	 
	document.onkeyup=null;
	
	var str="&nbsp;";
	for(var i=0;i<MEN_AMOUNT-1;i++)
	str+="S ";
	iconOutput.innerHTML = str;
	
	tail[tail.length-1].style.backgroundColor = FRUIT_COLOR; 
	clearInterval(interval);
	setTimeout(resumeMoveSnake,700);
	menOutput.innerHTML = "lives : "+MEN_AMOUNT;
	
	if(MEN_AMOUNT==0)
	{
		gameOver();
	}
	else
	{
		

		 
	}
	
}

function resumeMoveSnake()
{
	    document.onkeyup=onKeyUp;
		LEFT = false;
		RIGHT = false;
		UP = false;
		DOWN = true;
		posX = numColumns/2;
		posY = 2;
		
		//remove old tail
		for(var i=0;i<tail.length;i++)
		{
			tail[i].style.backgroundColor = GRID_COLOR; 
		}
		
		tail = new Array();
		
	interval = setInterval ( moveSnake, 100-(10*LEVEL) );
}
		


/*******************************************/
/*      interval Move Snake                */
/*******************************************/


function moveSnake(e)
{
	if(LEFT)
	posX--;
	
	if(RIGHT)
	posX++;
	
	if(UP)
	posY--;
	
	if(DOWN)
	posY++;



	//check if out of bounds  or if hit tail
	if(posY<0||posY>tbl.rows.length-1)
	{
		MEN_AMOUNT--;
		if(MEN_AMOUNT==0){gameOver(); return;}
		reduceMenAmount();
		
	}
	if(posX<0||posX>tbl.rows[posY].cells.length-1)
	{
		MEN_AMOUNT--;
		if(MEN_AMOUNT==0){gameOver(); return;}
		reduceMenAmount();		
	}
	
	// hit tail
	
	if(tail[1])
	{	 
		if(tbl.rows[posY].cells[posX].style.backgroundColor == SNAKE_COLOR)
		{
			MEN_AMOUNT--;
			if(MEN_AMOUNT==0){gameOver(); return;}
			reduceMenAmount();
		}
		if(tbl.rows[posY].cells[posX].style.backgroundColor == OBSTACLE_COLOR)
		{
			MEN_AMOUNT--;
			if(MEN_AMOUNT==0){gameOver(); return;}
			reduceMenAmount();
		}
	}

					   
	
    //tail keeps a record of all snake positions up to limit currentTailLength
  
    tail.push(tbl.rows[posY].cells[posX]);
	
	if(tail.length>currentTailLength)
	{
		//if(tail[0]!=fruitBox) 
		tail[0].style.backgroundColor = GRID_COLOR;    //put the end of the tail back to normal
		
		tail.shift();    // remove the end of the tail
	}
	
 
	
	//check if GOT FRUIT
	
	if(tbl.rows[posY].cells[posX].style.backgroundColor==FRUIT_COLOR)
	{
		currentTailLength+=30;
		currentScore*=2;
		//clearInterval(interval);
		//interval = setInterval ( moveSnake, 100-currentTailLength/4 );
		FRUIT_AMOUNT--;
		
	}
	 
	tbl.rows[posY].cells[posX].style.backgroundColor = SNAKE_COLOR; 
	
	if(FRUIT_AMOUNT==0)radiate(tbl,2,posX,posY,"#ffff00");
	 
	 
	 
     currentScore+=10;
	 if(tail[1])
	 document.getElementById("points").innerHTML = "score : "+currentScore;
	 
}


/*******************************************/
/*                Make Fruit               */
/*******************************************/
 

function makeFruit(_amount)
{
	var randX = Math.ceil(Math.random()*(numColumns-16))+16;
	var randY = Math.floor(Math.random()*(yOffset-20))+20;

	 
	//fruitBox.style.backgroundColor = "#ff0000";	
	  var colorToNotBe = OBSTACLE_COLOR;
	  var colorThatItIs = tbl.rows[randY-10].cells[randX-10].style.backgroundColor;
	 
	 while(colorToNotBe==colorThatItIs)
	 {
		 randX = Math.floor(Math.random()*(numColumns-20))+20;
	     randY = Math.floor(Math.random()*(yOffset-20))+20;
		 colorToNotBe = tbl.rows[randY-10].cells[randX-10].style.backgroundColor;
		 
	 }
	 tbl.rows[randY-10].cells[randX-10].style.backgroundColor = FRUIT_COLOR;
		
	

	if(_amount==1) return;

    return makeFruit(_amount-1);
	 
}



 


/*************************************/
/*       create obstacles            */
/*************************************/

function createObstacles(_difficulty,_surface)
{

	drawRandomLevel(_difficulty,_surface);

	
}


function drawCustomLevel(_difficulty,_surface)
{
	
	
	
	
}


/*************************************/
/*         draw random level         */
/*************************************/

function drawRandomLevel(_difficulty,_surface)
{
	
		var randX = Math.floor(Math.random()*(numColumns/2.2-6))+6;
		var randW = Math.ceil((Math.random()*(numColumns/2.2-randX)));
		
		if(randW>3)randW=Math.ceil(randW/(_difficulty+1));
		
		//document.getElementById("levelOutput").innerHTML+="<br/>"+randW;
		
		var randY = Math.floor(Math.random()*(yOffset))+4;
		var randH = Math.ceil(Math.random()*(yOffset-randY))-4;

		// L rect
		drawRect(_surface,randX,randY,randW,randH);
		
		//horizontal L mirror rect
		var mirrorX = numColumns-randX-randW;
		drawRect(_surface,mirrorX, randY, randW, randH);
		
		//vertical L  mirror rect
		var mirrorY = yOffset-randY-randH;
		drawRect(_surface,randX,mirrorY, randW, randH);	
	
		//vertical & horizontal L  mirror rect
		drawRect(_surface,mirrorX,mirrorY, randW, randH);	
		
		if(_difficulty==0) return;
        return drawRandomLevel(_difficulty-1,tbl);
}


/*************************************/
/*           draw rect               */
/*************************************/

function drawRect(_surface,_x,_y,_w,_h,_bgColor)
{	
	if(_bgColor==undefined)_bgColor = OBSTACLE_COLOR;

	for(var i=0;i<_h;i++)
	{
 		for(var j=0;j<_w;j++)
		{
			//don't overwrite existing fruit or tail
			if(_surface.rows[i+_y].cells[j+_x].style.backgroundColor != FRUIT_COLOR)
			if(_surface.rows[i+_y].cells[j+_x].style.backgroundColor != SNAKE_COLOR)
			_surface.rows[i+_y].cells[j+_x].style.backgroundColor = _bgColor;
		}
	}
}



/*************************************/
/*        draw main board            */
/*************************************/
 
function createBlocks()
{
	var row = document.createElement("tr");
	
	//boxDivArr[yOffset] = new Array();
	
	for(var i=0;i<9000;i++)
	{
		if(i%numColumns==0&&i>0)
		{
			yOffset+=1;
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
    document.body.appendChild(tbl);
}


/**********************************/
/*      Draw Custom Level         */
/**********************************/


function drawCustomLevel(_surface,_level)
{

    FRUIT_AMOUNT = 0;   //we set the fruit amount below based on custom level data
	yOffset = 0;
	xOffset = 0;
	
 	var color;
	
	//   01333A       //example of data format,  first character is color, which can be 0,1 or 2
	                  //second character is amt of consecutive cells with same color 
						 
						 
	//uncompress level data
	var uncompressedData = new Array();
	var chunks = _level.split("A");
	
	for (var i=0;i<chunks.length;i++)
	{
		var color = parseInt(chunks[i].charAt(0));
		var amtCells = parseInt(chunks[i].slice(1,chunks[i].length));
		//output.innerHTML+=chunks[i].slice(1,chunks[i].length)+",";
		for (var j=0;j<amtCells;j++)
		{
			if(color==2)FRUIT_AMOUNT++;
			uncompressedData.push(color);	
			//output.innerHTML+=FRUIT_AMOUNT+",";
		}
	}

	for(var i=0;i<TOTAL_CELLS;i++)
	{
		if(i%numColumns==0&&i>0)
		{
			yOffset+=1;
			xOffset = 0;
		}
		
		switch(uncompressedData[i])
		{
			case 1:
			color = OBSTACLE_COLOR;
			break;
				
			case  2:
			color = FRUIT_COLOR;
			break;
				
			case  0:
			color = GRID_COLOR;
			break;
				
		}
			
		_surface.rows[yOffset].cells[xOffset].style.backgroundColor = color;
		
		xOffset += 1;
	}

}	