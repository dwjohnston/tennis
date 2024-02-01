import {Match} from "./tennis";
import {describe, it} from "@jest/globals";


describe(Match, () => {

    it("Examples given in spec", () => {
        const match = new Match("player 1", "player 2");
        match.pointWonBy("player 1");
        match.pointWonBy("player 2");
        // this will return "0-0, 15-15"
        expect(match.score()).toBe("0-0, 15-15");
      
        match.pointWonBy("player 1");
        match.pointWonBy("player 1");
        // this will return "0-0, 40-15"
        expect(match.score()).toBe("0-0, 40-15");
        
        match.pointWonBy("player 2");
        match.pointWonBy("player 2");
        // this will return "0-0, Deuce"
        expect(match.score()).toBe("0-0, Deuce");
        
        match.pointWonBy("player 1");
        // this will return "0-0, Advantage player 1"
        expect(match.score()).toBe("0-0, Advantage player 1");
        
        match.pointWonBy("player 1");
        // this will return "1-0"
        expect(match.score()).toBe("1-0");
    });

    it("Game score is not shown if no one has scored yet", () => {
        const m = new Match("p1", "p2"); 
        expect(m.score()).toBe("0-0");

        m.pointWonBy("p1");
        expect(m.score()).toBe("0-0, 15-0");

        m.pointWonBy("p1");
        expect(m.score()).toBe("0-0, 30-0");

        m.pointWonBy("p1");
        expect(m.score()).toBe("0-0, 40-0");

        m.pointWonBy("p1");
        expect(m.score()).toBe("1-0");

    });

    it("Game scoring logic is correct", () => {

        const m = new Match("p1", "p2");
        expect(m.score()).toBe("0-0");
        m.pointWonBy("p1");
        expect(m.score()).toBe("0-0, 15-0");
        m.pointWonBy("p2");
        expect(m.score()).toBe("0-0, 15-15");

        m.pointWonBy("p1");
        expect(m.score()).toBe("0-0, 30-15");
        m.pointWonBy("p1");
        expect(m.score()).toBe("0-0, 40-15");

        m.pointWonBy("p2");
        expect(m.score()).toBe("0-0, 40-30");
        m.pointWonBy("p2");
        expect(m.score()).toBe("0-0, Deuce");
        m.pointWonBy("p2");
        expect(m.score()).toBe("0-0, Advantage p2");
        m.pointWonBy("p1");
        expect(m.score()).toBe("0-0, Deuce");
        m.pointWonBy("p2");
        expect(m.score()).toBe("0-0, Advantage p2");
        m.pointWonBy("p2");
        expect(m.score()).toBe("0-1");
        
    });

    it ("Set scoring logic is correct", () => {

        const m = new Match("p1", "p2"); 
        expect(m.score()).toBe("0-0");

        m.pointWonBy("p1");
        expect(m.score()).toBe("0-0, 15-0");

        m.pointWonBy("p1");
        expect(m.score()).toBe("0-0, 30-0");

        m.pointWonBy("p1");
        expect(m.score()).toBe("0-0, 40-0");

        m.pointWonBy("p1");
        expect(m.score()).toBe("1-0");

        m.pointWonBy("p1");
        expect(m.score()).toBe("1-0, 15-0");
        m.pointWonBy("p1");
        expect(m.score()).toBe("1-0, 30-0");
        m.pointWonBy("p1");
        expect(m.score()).toBe("1-0, 40-0");
        m.pointWonBy("p1");
        expect(m.score()).toBe("2-0");

        m.pointWonBy("p1");
        expect(m.score()).toBe("2-0, 15-0");
        m.pointWonBy("p1");
        expect(m.score()).toBe("2-0, 30-0");
        m.pointWonBy("p1");
        expect(m.score()).toBe("2-0, 40-0");
        m.pointWonBy("p1");
        expect(m.score()).toBe("3-0");

        m.pointWonBy("p1");
        expect(m.score()).toBe("3-0, 15-0");
        m.pointWonBy("p1");
        expect(m.score()).toBe("3-0, 30-0");
        m.pointWonBy("p1");
        expect(m.score()).toBe("3-0, 40-0");
        m.pointWonBy("p1");
        expect(m.score()).toBe("4-0");

        m.pointWonBy("p2");
        expect(m.score()).toBe("4-0, 0-15");
        m.pointWonBy("p2");
        expect(m.score()).toBe("4-0, 0-30");
        m.pointWonBy("p2");
        expect(m.score()).toBe("4-0, 0-40");
        m.pointWonBy("p2");
        expect(m.score()).toBe("4-1");
    });


    it("tie breaker logic is correct", () => {
        const m = new Match("p1", "p2"); 

        for (let i=0; i < 20; i++) {
            m.pointWonBy("p1");
        }
        for (let i=0; i < 24; i++) {
            m.pointWonBy("p2");
        }

        expect (m.score()).toBe("5-6");

        for (let i=0; i < 4; i++) {
            m.pointWonBy("p1");
        }

        expect (m.score()).toBe("6-6");

        m.pointWonBy("p1");
        expect(m.score()).toBe("6-6, 1-0")
        m.pointWonBy("p1");
        expect(m.score()).toBe("6-6, 2-0")
        m.pointWonBy("p1");
        expect(m.score()).toBe("6-6, 3-0")
        m.pointWonBy("p1");
        expect(m.score()).toBe("6-6, 4-0")
        m.pointWonBy("p1");
        expect(m.score()).toBe("6-6, 5-0")
        m.pointWonBy("p1");
        expect(m.score()).toBe("6-6, 6-0")

        m.pointWonBy("p2");
        expect(m.score()).toBe("6-6, 6-1")
        m.pointWonBy("p2");
        expect(m.score()).toBe("6-6, 6-2")
        m.pointWonBy("p2");
        expect(m.score()).toBe("6-6, 6-3")
        m.pointWonBy("p2");
        expect(m.score()).toBe("6-6, 6-4")
        m.pointWonBy("p2");
        expect(m.score()).toBe("6-6, 6-5")
        m.pointWonBy("p2");
        expect(m.score()).toBe("6-6, 6-6")
        m.pointWonBy("p2");
        expect(m.score()).toBe("6-6, 6-7")
        m.pointWonBy("p2");
        expect(m.score()).toBe("6-7")


    });
});