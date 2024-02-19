import { Set } from "./Set";

const NUM_GAMES_TO_WIN_SET =6; 
const NUM_POINTS_TO_WIN_TIEBREAKER = 7; 
const NUM_POINTS_TO_WIN_GAME = 4; 

export class Match<T1 extends string, T2 extends string>{


    private player1Name: string; 
    private player2Name: string; 
    private set: Set; 

    constructor(player1: T1, player2: T2, initialSet = new Set() ) {

        this.set = initialSet; 
        this.player1Name = player1; 
        this.player2Name = player2; 


    }

    pointWonBy(playerName: T1 | T2) {
        
        if (playerName === this.player1Name){
            this.set.pointScoredBy(1); 
        }
        else if (playerName === this.player2Name){
            this.set.pointScoredBy(2); 
        }
        else {
            throw new Error(`Player name ${playerName} did not match our known players`);
        }


    }

    score(): string {
        return this.set.getScoreAsString(this.player1Name, this.player2Name);
    }

}


