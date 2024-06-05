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
let flapVelocity = 250;
let bird = null;
let totalDelta = null;


function create() {

  this.add.image(0, 0, 'sky').setOrigin(0);

  bird = this.physics.add.sprite(config.width / 16, config.height / 2, 'bird').setOrigin(0);
  


  // pressing mouse button
  this.input.on('pointerdown', flap);


  // pressing space bar
  this.input.keyboard.on('keydown_SPACE',flap);
 
 
}

// t0 = 0px/s
// t1 = 200px/s
// t2 = 400px/s
// t3 = 600px/s


// if bird poistion x same or larger than width go left
// if bird poistion x same or smaller than 0 go right
function update(time, delta) {

}


function flap() {
  bird.body.velocity.y = -flapVelocity;
}







new Phaser.Game(config);