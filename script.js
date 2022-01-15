var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.moveTo(0,0);

var v2 = class 
{
  constructor(x,y)
  {
    this.x = x;
    this.y = y;
  }
}

var lastClick = new v2(0,0);
var playerStat = new playerStats();

c.addEventListener('click', function(event) 
{
  //console.log("yo");
   getCursorPosition(c,event);
   calculateCollisionWithMouse();
}, false);

var cubeObj = class
{
  constructor(width,height,x,y,active)
  {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;

    this.active = active;

    this.setRandomPos = function()
    {
    this.x = (Math.random() * (c.width - 0)) + 0;
    this.y = (Math.random() * (c.height - 0)) + 0;
    }
  }
}


var cube1 = new cubeObj(10,10,10,10,false);
spawnCube(cube1);

function spawnCube(cube)
{
  ctx.beginPath();
  ctx.rect(cube.x, cube.y, cube.width, cube.height);
  ctx.stroke(); 
}

var objectsToDraw = [cube1]

function calculateCollisionWithMouse()
{
  var closestIndex = -1;
  var tempDistance = 100000;

  // Get closest Square
  for(var i = 0; i < objectsToDraw.length; i++)
  {
    var newTempD = getDistanceVdctor2({x: objectsToDraw[i].x, y: objectsToDraw[i].y}, lastClick);
    console.log("TEMP DIST: " + (Math.floor(tempDistance * 100) * 0.01));
   
    if(newTempD < tempDistance)
    {
      tempDistance = newTempD;
      closestIndex = i;
    } 
  }

  var distanceThreshhold = 150;
  if(tempDistance < distanceThreshhold)
  {
    objectsToDraw[closestIndex].active = false;
    playerStat.targetsHit++;

    var accuracy = (tempDistance / distanceThreshhold) * 100
    playerStat.allHits.push(accuracy);
  }

  print(playerStat);
}

function gameTick()
{
  // CLEAR CANVAS
  ctx.clearRect(0, 0, c.width, c.height);
  
  // ----- GAME LOGIC
  
  for(var i = 0; i < objectsToDraw.length; i++)
  {
    if(!objectsToDraw.active)
    {
      objectsToDraw[i].setRandomPos();
    }
  }

  
  // ----- END GAME LOGIC

  // Draw Objects
  for(var i = 0; i < objectsToDraw.length; i++)
  {
    spawnCube(objectsToDraw[i]);
  }
}

setInterval(gameTick, 1000);
