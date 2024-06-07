import BaseScene from "./BaseScene";


const PIPES_TO_RENDER = 4;


class PlayScene extends BaseScene {




    constructor(config) {
        
        super('PlayScene', config);


        this.bird = null;
        this.pipes = null;
        this.isPaused = false;

        this.pipeHorizontalDistance = 0;
        
        this.flapVelocity = 250;

        this.score = 0;
        this.scoreText = '';


        this.currentDifficulty = 'easy';
        this.difficulties = {
            'easy': {
                pipeHorizontalDistanceRange: [1000, 1450],
                pipeVerticalDistanceRange: [95, 350],
            },
            'normal': {
                pipeHorizontalDistanceRange: [500, 650],
                pipeVerticalDistanceRange: [95, 200],
            },
            'hard': {
                pipeHorizontalDistanceRange: [400, 450],
                pipeVerticalDistanceRange: [120, 170],
            }
        }


        // this.initialTime = 3; 
        this.countdownText = "";

        this.initialTime = 3;


    }




    create(){

        this.currentDifficulty = 'easy';

        super.create();
        this.createBird();
        this.createPipes();
        this.createColliders();
        this.createScore();
        this.createPause();
        this.handleInputs();
        this.listenToEvents();

        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('bird', {start: 9, end: 15}),
            // 20 fps rate default, 25 frames in 1 second (8 frames in 1 second)
            frameRate: 8,
            repeat: -1
        })

        this.bird.play('fly');
        

    }




    update() {

        this.checkBirdGameStatus();
        this.recyclePipes();

    }


    listenToEvents() {

        if(this.pauseEvent) { return; }

        this.pauseEvent = this.events.on('resume', () => {
            this.initialTime =  3;
            this.countDownText = this.add.text(...this.screenCenter, `fly in ${this.initialTime}`, this.fontOptions)
            .setOrigin(0.5);

            this.timedEvent = this.time.addEvent({
                delay: 1000,
                callback: this.countDown,
                callbackScope: this,
                loop: true,
            })
        })

    }


    countDown() {

        this.initialTime--;

        this.countDownText.setText(`Fly in ${this.initialTime}`);
        if (this.initialTime <= 0) {
            this.isPaused = false;
            this.countDownText.setText('');
            this.physics.resume();
            this.timedEvent.remove();
          }
    }


    createPause(){
        this.isPaused = false;
        const pauseButton = this.add.image(this.config.width - 10, this.config.height - 10, 'pause')
        .setInteractive()
        .setOrigin(1)
        .setScale(3);


        pauseButton.on('pointerdown', () => {
            this.isPaused = true;
            this.physics.pause();
            this.scene.pause();
            this.scene.launch('PauseScene');
        })
    }


    createScore() {
        this.score = 0;
        const bestScore = localStorage.getItem('bestScore');


        this.scoreText = this.add.text(16, 16, `Score: ${0}`, {fontSize: '32px', fill: '#000'});
        this.add.text(16, 52, `Best Score: ${bestScore || 0}`, {fontSize: '18px', fill: '#000'});

    }


    createBG() {
        this.add.image(0, 0, 'sky').setOrigin(0);
    }



    createBird() {
        this.bird = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y, 'bird')
        .setFlipX(true)
        .setOrigin(0)
        .setScale(3);
        this.bird.body.gravity.y = 600;
        this.bird.setCollideWorldBounds(true);
    }



    createPipes() {
        this.pipes = this.physics.add.group();
        
        
        // bird.body.velocity.x = VELOCITY;

        for(let i = 0; i < PIPES_TO_RENDER; i++) {

            // creates and adds to the group
            const upperPipe = this.pipes.create(0, 0, 'pipe')
                .setImmovable(true)
                .setOrigin(0,1);

            const lowerPipe = this.pipes.create(0, 0, 'pipe')
                .setImmovable(true)
                .setOrigin(0,0);

            this.placePipe(upperPipe, lowerPipe)

        }
        
        this.pipes.setVelocityX(-400);
    }





    handleInputs() {

        // pressing mouse button
        this.input.on('pointerdown', this.flap, this);
        // pressing space bar
        this.input.keyboard.on('keydown_SPACE', this.flap, this);
    }


    checkBirdGameStatus() {

        if( this.bird.getBounds().bottom >= this.config.height || this.bird.y <= 0) {
            this.restartBirdPosition();
          }
    }



    placePipe(uPipe, lPipe) {

        const difficulty = this.difficulties[this.currentDifficulty];

        // pipeHorizontalDistance += 400;
        // pipeHorizontalDistance = getRightMostPipe();
    
        const rightMostX = this.getRightMostPipe();
    
        const pipeVerticalDistance = Phaser.Math.Between(...difficulty.pipeVerticalDistanceRange);
        const pipeVerticalPosition = Phaser.Math.Between(0 + 20, this.config.height - 20 -pipeVerticalDistance);
        
        const pipeHorizontalDistance = Phaser.Math.Between(...difficulty.pipeHorizontalDistanceRange);
    
        // upperPipe = this.physics.add.sprite(pipeHorizontalDistance, pipeVerticalPosition, 'pipe').setOrigin(0,1);
        // lowerPipe = this.physics.add.sprite(upperPipe.x, upperPipe.y + pipeVerticalDistance, 'pipe').setOrigin(0,0);
      
        uPipe.x = rightMostX + pipeHorizontalDistance;
        uPipe.y = pipeVerticalPosition;

        lPipe.x = uPipe.x;
        lPipe.y = uPipe.y + pipeVerticalDistance;
        
    }



    // recycle pipes
    recyclePipes() {

        const tempPipes = [];
    
        this.pipes.getChildren().forEach(pipe => {
    
            if(pipe.getBounds().right <= 0){
                // get upper and lower pipe that are out of bounds
                tempPipes.push(pipe);
                if(tempPipes.length == 2) {
                this.placePipe(...tempPipes);
                this.increaseScore();
                this.saveBestScore();
                this.increaseDifficulty();
                }
    
            }
    
        })
    
    }


    increaseDifficulty() {

        if(this.score == 3){
            this.currentDifficulty = 'normal';
        }

        if(this.score == 7){
            this.currentDifficulty = 'hard';
        }

    }

    
    // get right most pipe
    getRightMostPipe() {

        let rightMostX = 0;
    
        this.pipes.getChildren().forEach(function (pipe){
        rightMostX = Math.max(pipe.x, rightMostX);
        })

        return rightMostX;

    }
    
    

    // to make the bird flap
    flap() {
        if(this.isPaused) { return; }
        this.bird.body.velocity.y = -this.flapVelocity;
    }



    saveBestScore() {
        const bestScoreText =  localStorage.getItem('bestScore');
        const bestScore = bestScoreText && parseInt(bestScoreText, 10);

        if(!bestScore || this.score > bestScore) {
            localStorage.setItem('bestScore', this.score);
        }

    }
    

    // restart the bird position to the initial position
    restartBirdPosition() {
    
        // this.bird.x = this.config.startPosition.x;
        // this.bird.y = this.config.startPosition.y;
        // this.bird.body.velocity.y = 0;

        this.physics.pause();
        this.bird.setTint(0xff0000);

        this.saveBestScore();

        this.time.addEvent({
            delay: 1000, 
            callback: () => {
                this.scene.restart();
            },
            loop: false,
        })



    }



    createColliders() {
        this.physics.add.collider(this.bird, this.pipes, this.restartBirdPosition, null, this);
    }




    increaseScore(){
        this.score++;
        this.scoreText.setText(`Score: ${this.score}`);
    }
        


}




export default PlayScene;