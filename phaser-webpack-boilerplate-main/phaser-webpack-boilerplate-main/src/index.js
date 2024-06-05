import Phaser from 'phaser';




const config = {
  // webGL
  type: Phaser.AUTO,
  width: 800, 
  height: 600,
  physics: {
    // arcade physics plugin
    default: 'arcade',
    arcade: {
      debug: true,
      // gravity: { y: 400 },
    }
  },
  scene: {
    preload,
    create,
    update
  }
}



const VELOCITY = 200;
const PIPES_TO_RENDER = 4;

const flapVelocity = 150;
const initialBirdPosition = { x: config.width / 16, y: config.height / 2 };

let bird = null;
let upperPipe = null;
let lowerPipe = null;
let pipeHorizontalDistance = 0;

let pipeOpeningDistanceRange = [100, 250];
// sets a random variable in the range given




let totalDelta = null;



function preload() { 
  
  this.load.image('sky', 'assets/sky.png');

  this.load.image('bird', 'assets/bird.png');

  this.load.image('pipe', 'assets/pipe.png');

}



function create() {

  this.add.image(0, 0, 'sky').setOrigin(0);

  bird = this.physics.add.sprite(initialBirdPosition.x, initialBirdPosition.y, 'bird').setOrigin(0);
  
  // add gravity to the bird
  bird.body.gravity.y = 400;
  
  
  // bird.body.velocity.x = VELOCITY;

  for(let i = 0; i < PIPES_TO_RENDER; i++) {

    pipeHorizontalDistance += 400;

    let pipeVerticalDistance = Phaser.Math.Between(pipeOpeningDistanceRange[0], pipeOpeningDistanceRange[1]);
    let pipeVerticalPosition = Phaser.Math.Between(0 + 20, config.height - 20 - pipeVerticalDistance);

    upperPipe = this.physics.add.sprite(pipeHorizontalDistance, pipeVerticalPosition, 'pipe').setOrigin(0,1);
    lowerPipe = this.physics.add.sprite(upperPipe.x, upperPipe.y + pipeVerticalDistance, 'pipe').setOrigin(0,0);
  
    upperPipe.body.velocity.x = -200;
    lowerPipe.body.velocity.x = -200;

  }

  
  


  // pressing mouse button
  this.input.on('pointerdown', flap);


  // pressing space bar
  this.input.keyboard.on('keydown_SPACE',flap);
 
 
}







function update(time, delta) {

  if(bird.y > config.height || bird.y < -bird.height) {
    restartBirdPosition();
  }

  
}




// // if bird postion is small than 0 or greater than height of the canvas
// // restart the bird position to the initial position
// function update(time, delta) {

//   if(bird.y > config.height || bird.y < -bird.height) {
//     restartBirdPosition();
//   }

  
// }




// // move left and right 
// // comment out the gravity in physics
// // set bird.body.velocity.x to VELOCITY in the create function
// function update(time, delta) {

//   if(bird.x >= config.width - bird.width) {
//     bird.body.velocity.x = -VELOCITY;
//   } else if (bird.x <= 0) {
//     bird.body.velocity.x = VELOCITY;
//   }

// }




// to make the bird flap
function flap() {
  bird.body.velocity.y = -flapVelocity;
}




// restart the bird position to the initial position
function restartBirdPosition() {

  bird.x = initialBirdPosition.x;
  bird.y = initialBirdPosition.y;

  bird.body.velocity.y = 0;
  

}







new Phaser.Game(config);