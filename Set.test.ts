import { RegularGame } from "./Game";
import { Set } from "./Set";

describe(Set, () => {
    it("has correct score logic", () => {
        const initialGames = [
            new RegularGame(5, 0),
            new RegularGame(4, 0),
            new RegularGame(1, 1)
        ];


        // I'm not especially happy with this 
        // The problem is that in order to understand the logic of this 
        // We also need to understand the underlying RegularGame logic. 
        const set = new Set(initialGames);
        expect(set.getScoreAsString('p1', 'p2')).toBe('2-0, 15-15');

    });
})