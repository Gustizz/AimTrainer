// Pass trough 2 vectors
function getDistanceVdctor2(obj1, obj2)
{
  xDistance = (obj2.x - obj1.x) * (obj2.x - obj1.x);
  yDistance = (obj2.y - obj1.y) * (obj2.y - obj1.y);
  xyDistance = xDistance + yDistance;

  distance = Math.sqrt(xyDistance);
  console.log("Distance is: " + distance);

  return(distance);
}

function getCursorPosition(c, event) {
    var rect = c.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
   // console.log("x: " + x + " y: " + y);
    lastClick.x = x;
    lastClick.y = y;
}

function addNum()
{
  var a = 1 +1 + 1;
}

