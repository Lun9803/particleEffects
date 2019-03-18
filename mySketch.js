let userForce = 10;
let fraction = 0.05;
let backgroundColour = 

// defines a particle object 

function particle(size, colour, weight, x, y){
  this.size = size;
  this.weight = weight;
  this.colour = colour;
  // position of the particle
  this.x = x;
  this.y = y;
  // velocty of the particle
  this.vx = 0;
  this.vy = 0;

  this.move = function(){
    // slightly increase efficiency
    if(this.vx==0 && this.vy==0){
      return;
    }
    this.x += this.vx;
    this.y += this.vy;
    // decrease velocity due to fraction
    this.vx = Math.max(0, this.vx-fraction);
    this.vy = Math.max(0, this.vy-fraction);
  }

  // calculte the the velocity of the particle after it's hit 
  this.gotHit = function(hitX, hitY){
    let distance = Math.sqrt(Math.pow(hitX-this.x)+Math.pow(hitY-this.y));
    let velChange = (userForce/distance)/weight;
    
    let distanceX = hitX - this.x;
    let distanceY = hitY - this.y;

    // normalized velocity 
    // here the normlize X is calculated by distance Y because the velocity changes 
    // more when the distance is small, so it is opposite of the distance.
    let normalizedVX = distanceY/(Math.abs(distanceX)+Math.abs(distanceY));
    let normalizedVY = distanceX/(Math.abs(distanceX)+Math.abs(distanceY));

    // actual velocity changed
    this.vx = normalizedVX * velChange;
    this.vy = normalizedVY * velChange;
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);

}

function draw() {
  
}

