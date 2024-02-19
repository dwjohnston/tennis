import { RegularGame, TieBreakingGame } from "./Game"

describe(RegularGame, () => {
    it('Shows scores according to tennis logic', () => {

        expect(new RegularGame(0, 0).getScoreAsString('foo', 'bar')).toBe('');

        expect(new RegularGame(1, 0).getScoreAsString('foo', 'bar')).toBe('15-0');
        expect(new RegularGame(2, 0).getScoreAsString('foo', 'bar')).toBe('30-0');
        expect(new RegularGame(3, 0).getScoreAsString('foo', 'bar')).toBe('40-0');

        expect(new RegularGame(3, 1).getScoreAsString('foo', 'bar')).toBe('40-15');

        expect(new RegularGame(3, 3).getScoreAsString('foo', 'bar')).toBe('Deuce');
        expect(new RegularGame(4, 3).getScoreAsString('foo', 'bar')).toBe('Advantage foo');

    });

    it('Has correct win detection logic', () => {
        expect(new RegularGame(0, 0).getGameWinner()).toBe(null);
        expect(new RegularGame(3, 0).getGameWinner()).toBe(null);
        expect(new RegularGame(4, 0).getGameWinner()).toBe(1);
        expect(new RegularGame(4, 3).getGameWinner()).toBe(null);
        expect(new RegularGame(3, 5).getGameWinner()).toBe(2);
    })

    it('Has correct point scoring logic', () => {
        const game = new RegularGame();
        expect(game.getScoreAsString('foo', 'bar')).toBe('');
        game.pointScoredBy(1);
        expect(game.getScoreAsString('foo', 'bar')).toBe('15-0')
    })
})

describe(TieBreakingGame, () => {

    it('Shows scores according to tennis logic', () => {

        expect(new TieBreakingGame(0, 0).getScoreAsString('foo', 'bar')).toBe('');
        expect(new TieBreakingGame(1, 0).getScoreAsString('foo', 'bar')).toBe('1-0');

        expect(new TieBreakingGame(3, 3).getScoreAsString('foo', 'bar')).toBe('3-3');


    });

    it('Has correct win detection logic', () => {
        expect(new TieBreakingGame(0, 0).getGameWinner()).toBe(null);
        expect(new TieBreakingGame(3, 0).getGameWinner()).toBe(null);
        expect(new TieBreakingGame(7, 0).getGameWinner()).toBe(1);
        expect(new TieBreakingGame(7, 6).getGameWinner()).toBe(null);
        expect(new TieBreakingGame(5, 7).getGameWinner()).toBe(2);
    })

    it('Has correct point scoring logic', () => {
        const game = new TieBreakingGame();
        expect(game.getScoreAsString('foo', 'bar')).toBe('');
        game.pointScoredBy(1);
        expect(game.getScoreAsString('foo', 'bar')).toBe('1-0')
    })
})