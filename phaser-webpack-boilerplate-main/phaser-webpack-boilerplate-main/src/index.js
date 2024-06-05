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
  }
}




function preload() { 
  
  this.load.image('sky', 'assets/sky.png');

  this.load.image('bird', 'assets/bird.png');

  

}


let bird = null;

function create() {

  this.add.image(0, 0, 'sky').setOrigin(0);

  bird = this.physics.add.sprite(config.width / 16, config.height / 2, 'bird').setOrigin(0);
  
  // pulls bird down and off screen
  bird.body.gravity.y = 200;
  
}










new Phaser.Game(config);