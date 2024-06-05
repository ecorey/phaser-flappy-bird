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

}


function create() {
  this.add.image(0, 0, 'sky');
}










new Phaser.Game(config);