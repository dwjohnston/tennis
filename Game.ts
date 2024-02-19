export interface IGame {


    getGameWinner: () => 1 | 2 | null;
    pointScoredBy: (player: 1 | 2) => void;

    getScoreAsString: (player1Name: string, player2Name: string) => string;
}



const NUM_POINTS_TO_WIN_GAME = 4;
const NUM_POINTS_TO_WIN_TIEBREAKER = 7;

export class RegularGame implements IGame {

    private points: { 1: number, 2: number };

    constructor(player1Points = 0, player2Points = 0) {

        this.points = { 1: player1Points, 2: player2Points };
    }

    public getGameWinner(): null | 1 | 2 {
        const p1Score = this.points[1];
        const p2Score = this.points[2];

        const scoreDelta = p1Score - p2Score;

        if (scoreDelta >= 2 && p1Score >= NUM_POINTS_TO_WIN_GAME) {
            return 1;
        }

        if (scoreDelta <= -2 && p2Score >= NUM_POINTS_TO_WIN_GAME) {
            return 2;
        }

        return null;
    }

    public pointScoredBy(player: 1 | 2) {
        this.points[player]++;
    }

    public getScoreAsString(player1Name: string, player2Name: string): string {


        const p1Score = this.points[1];
        const p2Score = this.points[2];

        // If no score yet, then return empty string, according to the example given
        if (p1Score === 0 && p2Score === 0) {
            return '';
        }

        // Ties with 3+ = 'Deuce'
        if (p1Score === p2Score && p1Score >= 3) {
            return "Deuce"
        }

        // Non-ties with 4+ = "Advantage (player)"
        if (p1Score > 3 || p2Score > 3) {
            if (p1Score > p2Score) {
                return `Advantage ${player1Name}`
            }
            else if (p2Score > p1Score) {
                return `Advantage ${player2Name}`
            }
        }

        // Everything else, regular scoring
        const scoreToWordMap = {
            0: 0,
            1: 15,
            2: 30,
            3: 40
        }

        return `${scoreToWordMap[p1Score]}-${scoreToWordMap[p2Score]}`
    }


}



/**
 * Technically we could create an abstraction top reuse the from a regular game. 
 * 
 * But I think a reimplementation is probably the sensible thing to do. (Write everything twice)
 */
export class TieBreakingGame implements IGame {
    private points: { 1: number, 2: number };

    constructor(player1Points = 0, player2Points = 0) {

        this.points = { 1: player1Points, 2: player2Points };
    }

    public getGameWinner(): null | 1 | 2 {
        const p1Score = this.points[1];
        const p2Score = this.points[2];

        const scoreDelta = p1Score - p2Score;

        if (scoreDelta >= 2 && p1Score >= NUM_POINTS_TO_WIN_TIEBREAKER) {
            return 1;
        }

        if (scoreDelta <= -2 && p2Score >= NUM_POINTS_TO_WIN_TIEBREAKER) {
            return 2;
        }

        return null;
    }

    public pointScoredBy(player: 1 | 2) {
        this.points[player]++;
    }

    public getScoreAsString(p1Name: string, p2Name: string): string {
        const p1Score = this.points[1];
        const p2Score = this.points[2];

        // If no score yet, then return empty string, according to the example given
        if (p1Score === 0 && p2Score === 0) {
            return '';
        }
        return `${p1Score}-${p2Score}`;
    }

}


