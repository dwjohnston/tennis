import { IGame, RegularGame, TieBreakingGame } from "./Game";

const NUM_GAMES_TO_WIN_SET = 6;

export class Set {

    private games: Array<IGame>;
    private currentGame: IGame;

    // A little bit uneasy about this 
    // We're storing the same information twice (here, and in the `games` array)
    // Making an impossible state possible
    private scores: { 1: number, 2: number };

    constructor(initialGames: Array<IGame> = []) {
        this.games = initialGames;
        this.scores = { 1: 0, 2: 0 }

        initialGames.forEach((v) => {
            const gameWinner = v.getGameWinner();

            if (gameWinner === null) {
                this.currentGame = v;
            }
            else {
                this.scores[gameWinner]++;
            }


        });

        if (!this.currentGame) {
            this.createNewGame();
        }
    }


    private createNewGame() {

        let newGame: IGame;
        if (this.scores[1] === NUM_GAMES_TO_WIN_SET && this.scores[2] === NUM_GAMES_TO_WIN_SET) {
            newGame = new TieBreakingGame();
        }
        else {
            newGame = new RegularGame();
        }

        this.currentGame = newGame;
        this.games.push(newGame);
    }

    public pointScoredBy(player: 1 | 2) {
        this.currentGame.pointScoredBy(player);

        const gameWinner = this.currentGame.getGameWinner();
        if (gameWinner !== null) {
            this.scores[gameWinner]++;
            this.createNewGame();
        }
    }

    public getScoreAsString(player1Name: string, player2Name: string): string {
        const currentGameScore = this.currentGame.getScoreAsString(player1Name, player2Name);
        const setScore = `${this.scores[1]}-${this.scores[2]}`
        return currentGameScore ? `${setScore}, ${currentGameScore}` : setScore;
    }
}