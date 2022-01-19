var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.moveTo(0,0);

var distanceThreshhold = 50;

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
var targetsClicked = 0;
// timer = 30000 miliseconds or 30 seconds
var timer = 30000;


// Run Event Listener when the user has clicked on the CANVAS
// When Clicked on the Canvas Get Mouse Pos and calculate distance from mouse      Pos to target pos
c.addEventListener('click', function(event) 
{
   getCursorPosition(c,event);
   calculateCollisionWithMouse();
}, false);


var targetObj = class
{
  constructor(radius,x,y,active)
  {
    this.radius = radius;
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

function endGame()
{
  console.log("WELL DONE YOU ARE WACK!");
  console.log("Accuracy: " + playerStat.calculateAccuracy());
}

//Spawns the initial target to start the game off
// new targetobj(radius,x,y,active)
var target1 = new targetObj(50,10,10,true);
spawnTarget(target1);

//Draws a circle for the target
function spawnTarget(target)
{
  ctx.beginPath();
  ctx.ellipse(target.x , target.y, target.radius, target.radius, 0, 0, Math.PI * 2);
  ctx.fill();
}

var objectsToDraw = [target1]

function calculateCollisionWithMouse()
{
  var closestIndex = -1;
  var tempDistance = 100000;

  // Get closest Square
  for(var i = 0; i < objectsToDraw.length; i++)
  {

    //Gets the distance between mouse and current object
    var newTempD = getDistanceVdctor2({x: objectsToDraw[i].x, y: objectsToDraw[i].y}, lastClick);
    //console.log("TEMP DIST: " + (Math.floor(tempDistance * 100) * 0.01));
   
   //if this distance is lower than the last then change the new distanc3
   //this gets lets us get the closets target to the target
    if(newTempD < tempDistance)
    {
      tempDistance = newTempD;
      closestIndex = i;
    } 
  }

  // ADD TO PLAYER STATS
      distanceThreshhold = 50;
  //if the distance is lower than the radius of the target then    
  if(tempDistance < distanceThreshhold)
  {
    //console.log("OBJECT HAS BEEN HIT1")
    objectsToDraw[closestIndex].active = false;
    playerStat.targetsHit++;

    var accuracy = 100 - (tempDistance / distanceThreshhold) * 100;
    playerStat.allHits.push(tempDistance);
  }
  else
  {
    playerStat.allHits.push(0);
  }

  targetsClicked++;
  //console.log(playerStat);
}

function gameTick()
{
  // CLEAR CANVAS
  ctx.clearRect(0, 0, c.width, c.height);
  
  // ----- GAME LOGIC
  
  for(var i = 0; i < objectsToDraw.length; i++)
  {
    if(!objectsToDraw[i].active)
    {
      //console.log("RANDOMOIS")
      objectsToDraw[i].setRandomPos();
      objectsToDraw[i].active = true;
    }
  }
  
  // ----- END GAME LOGIC

  // Draw Objects
  for(var i = 0; i < objectsToDraw.length; i++)
  {
    spawnTarget(objectsToDraw[i]);
  }
}

function countdown(){

  //const countdownString = document.getElementById("countdownString");

 // let seconds = timer;
  //countdownString.innerHTML = `${seconds}`;
  //timer--;
  alert("Accuracy: " + playerStat.calculateAccuracy());
}

//setInterval(countdown, timer);
setTimeout(countdown, timer);
setInterval(gameTick, 50);
