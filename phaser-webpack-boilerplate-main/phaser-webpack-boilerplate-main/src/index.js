import Phaser from 'phaser';




const config = {
  // webGL
  type: Phaser.AUTO,
  width: 800, 
  height: 600,
  physics: {
    // Arcade physics plugin
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 400 },
    }
  },
  scene: {
    preload,
    create,
    update
  }
}




function preload() { 
  
  this.load.image('sky', 'assets/sky.png');

  this.load.image('bird', 'assets/bird.png');

  

}


const VELOCITY = 200;
let flapVelocity = 3000;
let bird = null;
let totalDelta = null;


function create() {

  this.add.image(0, 0, 'sky').setOrigin(0);

  bird = this.physics.add.sprite(config.width / 16, config.height / 2, 'bird').setOrigin(0);
  
  // bird.body.velocity.x = VELOCITY;


  // pressing mouse button
  this.input.on('pointerdown', flap);


  // pressing space bar
  this.input.keyboard.on('keydown_SPACE',flap);
 
 
}

// t0 = 0px/s
// t1 = 200px/s
// t2 = 400px/s
// t3 = 600px/s



// if bird postion is small than 0 or greater than height of the canvas
// alert 'you lost the game'
function update(time, delta) {

  
  

}


// move left and right 
// comment out the gravity in physics
// set bird.body.velocity.x to VELOCITY in the create function
// function update(time, delta) {

//   if(bird.x >= config.width - bird.width) {
//     bird.body.velocity.x = -VELOCITY;
//   } else if (bird.x <= 0) {
//     bird.body.velocity.x = VELOCITY;
//   }

// }




function flap() {
  bird.body.velocity.y = -flapVelocity;
}







new Phaser.Game(config);