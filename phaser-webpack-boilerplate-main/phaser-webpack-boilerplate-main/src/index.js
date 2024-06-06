import Phaser from 'phaser';
import PlayScene from './scenes/PlayScene';



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
  scene: [PlayScene]
}



const VELOCITY = 200;
const PIPES_TO_RENDER = 4;

let bird = null;
let pipes = null;


let pipeHorizontalDistance = 0;

const pipeVerticalDistanceRange = [150, 250];
const pipeHorizontalDistanceRange = [500, 600];

const flapVelocity = 150;
const initialBirdPosition = { x: config.width / 16, y: config.height / 2 };




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


  pipes = this.physics.add.group();
  
  
  // bird.body.velocity.x = VELOCITY;

  for(let i = 0; i < PIPES_TO_RENDER; i++) {

    // creates and adds to the group
    const upperPipe = pipes.create(0, 0, 'pipe').setOrigin(0,1);
    const lowerPipe = pipes.create(0, 0, 'pipe').setOrigin(0,0);

    placePipe(upperPipe, lowerPipe)

  }

  
  pipes.setVelocityX(-200);
  


  // pressing mouse button
  this.input.on('pointerdown', flap);


  // pressing space bar
  this.input.keyboard.on('keydown_SPACE',flap);
 
 
}







function update(time, delta) {

  if(bird.y > config.height || bird.y < -bird.height) {
    restartBirdPosition();
  }


  // recycles pipes in the group
  recyclePipes();

  
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



// recycle pipes
function recyclePipes() {

  const tempPipes = [];

  pipes.getChildren().forEach(pipe => {

    if(pipe.getBounds().right <= 0){
      // get upper and lower pipe that are out of bounds
      tempPipes.push(pipe);
      if(tempPipes.length == 2) {
        placePipe(...tempPipes);
      }

      
    }

  })

}




// to place pipe
function placePipe(uPipe, lPipe) {

    // pipeHorizontalDistance += 400;
    // pipeHorizontalDistance = getRightMostPipe();

    const rightMostX = getRightMostPipe();

    const pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalDistanceRange);
    const pipeVerticalPosition = Phaser.Math.Between(0 + 20, config.height - 20 - pipeVerticalDistance);
    
    const pipeHorizontalDistance = Phaser.Math.Between(...pipeHorizontalDistanceRange);




    // upperPipe = this.physics.add.sprite(pipeHorizontalDistance, pipeVerticalPosition, 'pipe').setOrigin(0,1);
    // lowerPipe = this.physics.add.sprite(upperPipe.x, upperPipe.y + pipeVerticalDistance, 'pipe').setOrigin(0,0);
  
    uPipe.x = rightMostX + pipeHorizontalDistance;
    uPipe.y = pipeVerticalPosition;
    

    lPipe.x = uPipe.x;
    lPipe.y = uPipe.y + pipeVerticalDistance;
    

    
}


// get right most pipe
function getRightMostPipe() {

  let rightMostX = 0;

  pipes.getChildren().forEach(function (pipe){
    rightMostX = Math.max(pipe.x, rightMostX);
  })


  return rightMostX;


}







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