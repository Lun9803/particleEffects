let userForce = 550;
let particleNums = 100;
let particles = [];

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
    // avoid particle goes outside of the window
    if(this.x > width){
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
    }
    // if you want the particles to gradually stop, uncommnet below 
    // this.vx *= 0.99;
    // this.vy *= 0.99;
    this.x += this.vx;
    this.y += this.vy;
  }

  // calculte the the velocity of the particle after it's hit 
  this.gotHit = function(hitX, hitY){
    let distance = Math.sqrt(Math.pow(hitX-this.x, 2)+Math.pow(hitY-this.y, 2));
    let velChange = (userForce/distance)/this.weight;
    
    let distanceX = Math.abs(hitX - this.x);
    let distanceY = Math.abs(hitY - this.y);

    let xSign = (this.x-hitX)/Math.abs(this.x-hitX);
    let ySign = (this.y-hitY)/Math.abs(this.y-hitY);
    // normalized velocity 
    let normalizedVX = xSign * distanceX/(distanceX+distanceY);
    let normalizedVY = ySign * distanceY/(distanceX+distanceY);

    // actual velocity changed
    this.vx += normalizedVX * velChange;
    this.vy += normalizedVY * velChange;
  }
}


function setup() {
  createCanvas(600, 400);
  background(0);
  
  // generating particles
  for(let i = 0; i < particleNums; i++){
    // particles' random attributes
    let size = random(35, 55);
    let colour = color(random(0, 255), random(0, 255), random(0, 255));
    let weight = random(4, 7);
    let x = random(0, width);
    let y = random(0, height);
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

function mouseClicked(){
  for(let i = 0; i < particles.length; i++){
    particles[i].gotHit(mouseX, mouseY);
  }
}

