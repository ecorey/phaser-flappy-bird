import Phaser from 'phaser';




const config = {
  // webGL
  type: Phaser.AUTO,
  width: 800, 
  height: 600,
  physics: {
    // Arcade physics plugin
    default: 'arcade',
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


let bird = null;
let totalDelta = null;


function create() {

  this.add.image(0, 0, 'sky').setOrigin(0);

  bird = this.physics.add.sprite(config.width / 16, config.height / 2, 'bird').setOrigin(0);
  
  // pulls bird down and off screen
  bird.body.gravity.y = 200;
 
  
}


// t0 = 0px/s
// t1 = 200px/s
// t2 = 400px/s
// t3 = 600px/s





// default arounf 60 fps
function update(time, delta) {
  

  if(totalDelta >= 1000) {
    console.log(bird.body.velocity.y);
    totalDelta = 0;
  }

  totalDelta = totalDelta + delta;
  


}










new Phaser.Game(config);