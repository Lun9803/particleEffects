let userForce = 2000;
let particleNums = 500;
let particles = [];
let hit = false;

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

  // the movement of the particle, should be called every frame
  this.move = function(){
    // slightly increase efficiency
    if(this.vx==0 && this.vy==0){
      return;
    }

    // if you want the particles to bounce back when it reaches borders, uncomment below
 
    /*if(this.x > width){
      this.x = width;
      this.vx *= -1;
    }
    if(this.x < 0){
      this.x = 0;
      this.vx *= -1;
    }
    if(this.y > height){
      this.y = height;
      this.vy *= -1;
    }
    if(this.y < 0){
      this.y = 0;
      this.vy *= -1;
    } */

    // if you want the particles to gradually stop, uncomment below 
    this.vx *= 0.99;
    this.vy *= 0.99;

    this.x += this.vx;
    this.y += this.vy;
  }

  // calculte the the velocity of the particle after it's hit 
  this.gotHit = function(hitX, hitY){
    let distance = Math.sqrt(Math.pow(hitX-this.x, 2)+Math.pow(hitY-this.y, 2));

    // the velocity change is depended on:
    // the weight of the particle
    // the distance from the hit point
    let velChange = (userForce/distance)/this.weight;
    
    let distanceX = Math.abs(hitX - this.x);
    let distanceY = Math.abs(hitY - this.y);

    // limit the closest distance so that the particle does not go too fast
    distanceX = map(distanceX, 0, width, 100, width);
    distanceY = map(distanceY, 0, height, 100, height);

    let xSign = (this.x-hitX)/Math.abs(this.x-hitX);
    let ySign = (this.y-hitY)/Math.abs(this.y-hitY);
    // normalized velocity 
    let normalizedVX = xSign * distanceX/(distanceX+distanceY);
    let normalizedVY = ySign * distanceY/(distanceX+distanceY);

    // actual velocity changed
    this.vx += normalizedVX * velChange;
    if(this.vx>2)this.vx=2;
    if(this.vx<-2)this.vx=-2;
    this.vy += normalizedVY * velChange;
    if(this.vy>2)this.vy=2;
    if(this.vy<-2)this.vy=-2;
  }
}


function setup() {
  createCanvas(1000, 600);
  background(0);
  
  // generating particles
  for(let i = 0; i < particleNums; i++){
    // particles' random attributes
    let size = random(5, 10);
    let colour = color(random(0, 255), random(0, 255), random(0, 255));
    let weight = random(5, 10);
    let x = random(30, width-30);
    let y = random(15, height-15);
    particles.push(new particle(size, colour, weight, x, y));
  }
}

function draw() {
  noStroke();
  // render particles
  for(let i = 0; i < particles.length; i++){
    particles[i].move();
    fill(particles[i].colour);
    ellipse(particles[i].x, particles[i].y, particles[i].size, particles[i].size);
  }
}

// at the position of the mouseclick a "pulse" will be created 
// it pushes every particle to the oppsite direction 
// like putting a bomb on the position of mouseclick 
// for details of the formula see the gotHit function in particle object
function mouseClicked(){
  for(let i = 0; i < particles.length; i++){
    particles[i].gotHit(mouseX, mouseY);
  }
}

