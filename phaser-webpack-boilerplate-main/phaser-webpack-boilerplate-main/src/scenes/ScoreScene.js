import BaseScene from './BaseScene';


class ScoreScene extends BaseScene {

    constructor(config){
        super('ScoreScene', {...config, canGoBack: true});


       
    
    }

   


    create() {

        super.create();

        this.displayBestScore();
        
    }



    displayBestScore() {

        const bestScore = localStorage.getItem('bestScore');
        const text = bestScore ? `Best Score: ${bestScore}` : 'No best score yet!';

        this.add.text(this.config.width / 2, this.config.height / 2, text, {
            fontSize: '32px',
            color: '#fff',
        }).setOrigin(0.5);


    }




   

}




export default ScoreScene;

