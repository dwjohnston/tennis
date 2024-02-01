export class Match<T1 extends string, T2 extends string>{


    private gameScores: Record<T1| T2, number>;
    private setScores: Record<T1| T2, number>;

    constructor(player1: T1, player2: T2){
        this.gameScores = {
            [player1] : 0,
            [player2] : 0
        } as Record<T1 |T2, number>;

        this.setScores = {
            [player1]: 0, 
            [player2]: 0
        }as Record<T1 |T2, number>;


    }

    private resetGameScores() {
        const playerNames = Object.keys(this.gameScores); 
        this.gameScores = {
            [playerNames[0]]: 0, 
            [playerNames[1]]: 0, 
        } as Record<T1|T2, number>;
    }

    private detectGameWin() {

        const entries = Object.entries(this.gameScores) as [player1: [name: string, score: number], player2: [name: string, score: number]]; 
        const [player1, player2] = entries; 

        const setEntries = Object.entries(this.setScores) as [player1: [name: string, score: number], player2: [name: string, score: number]];
        const [player1Set, player2Set] = setEntries;

        // tie breaking logic
        if( player1Set[1]==6 && player2Set[1] ===6) {
            const scoreDelta = player1[1] - player2[1];
            if(player1[1] >= 7 || player2[1] >= 7){
                if (scoreDelta >= 2){
                    this.resetGameScores();
                    this.setScores[player1[0]]++;
  
                }
                if (scoreDelta <=-2) {
                    this.resetGameScores();
                    this.setScores[player2[0]]++;
                }
            }
        }

        else if(player1[1] >= 4 || player2[1] >= 4) {

            const scoreDelta = player1[1] - player2[1]; 

            // Player 1 has won the set
            if(scoreDelta >=2) {
                this.setScores[player1[0]]++;
                this.resetGameScores();

            }

            // Player 2 has won the set
            else if (scoreDelta <=-2){
                this.setScores[player2[0]]++; 
                this.resetGameScores();
            }

            else {
                // Nobody has won the set, do nothing
            }
        }
    }

    pointWonBy(playerName: T1 | T2) {
        this.gameScores[playerName]++;

        this.detectGameWin();
    }


    private getSetScoreAsString() : string {
        const entries = Object.entries(this.setScores) as [player1: [name: string, score: number], player2: [name: string, score: number]]; 
        const [player1, player2] = entries; 
        

        return `${player1[1]}-${player2[1]}`;
    }

    private getGameScoreAsString() : string {
        const entries = Object.entries(this.gameScores) as [player1: [name: string, score: number], player2: [name: string, score: number]] ; 
        const [player1, player2] = entries;  

        const p1Score = player1[1]; 
        const p2Score = player2[1];

        const setEntries = Object.entries(this.setScores) as [player1: [name: string, score: number], player2: [name: string, score: number]];
        const [player1Set, player2Set] = setEntries;


        // If no score yet, then return empty string, according to the example given
        if(player1[1]===0 && player2[1] ===0){
            return '';
        }

        // Tie breaking logic
        if(player1Set[1] ===6 && player2Set[1] ===6) {
            return `${p1Score}-${p2Score}`
        }
        else {


    

            const scoreToWordMap = {
            0: 0, 
            1: 15, 
            2: 30, 
            3: 40
        }


        if (p1Score === p2Score && p1Score >=3) {
            return "Deuce"
        }

        if(p1Score >3 || p2Score >3){
            if (p1Score > p2Score){
                return `Advantage ${player1[0]}`
            }
            else if (p2Score > p1Score) {
                return `Advantage ${player2[0]}`
            }
        }

        return `${scoreToWordMap[p1Score]}-${scoreToWordMap[p2Score]}`
        }
    }

    score(): string {
        
        const setScore = this.getSetScoreAsString();
        const gameScore = this.getGameScoreAsString();

        if(gameScore){
            return `${setScore}, ${gameScore}`
        }

        return setScore;
    }

}


