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
      // gravity: { y: 200 },
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

let bird = null;
let totalDelta = null;


function create() {

  this.add.image(0, 0, 'sky').setOrigin(0);

  bird = this.physics.add.sprite(config.width / 16, config.height / 2, 'bird').setOrigin(0);
  
  bird.body.velocity.x = VELOCITY;

 
}

// t0 = 0px/s
// t1 = 200px/s
// t2 = 400px/s
// t3 = 600px/s


// if bird poistion x same or larger than width go left
// if bird poistion x same or smaller than 0 go right
function update(time, delta) {
  
  if (bird.x >= config.width - bird.width) {
    bird.body.velocity.x = -VELOCITY;

  } else if (bird.x <= 0 ) {
    bird.body.velocity.x = VELOCITY;
  }

  




}










new Phaser.Game(config);