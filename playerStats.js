var playerStats = class
{
  constructor()
  {
    this.accuracy = 100;
    this.targetsHit = 0;
    this.allHits = [];

    this.calculateAccuracy = function()
    {
    var sum = 0;
    for(var i = 0; i < this.allHits.length; i++)
    {
      if(this.allHits[i] < distanceThreshhold && this.allHits[i] > 0)
      sum ++;
    }

    return (sum / this.allHits.length) * 100; 
   };
  };

  
}