// imports
import {expect} from "chai";
import "../../src/chai";
import {$, $$} from "../mock";


// constants
const title = $(".title", {
    style: {
        "font-family": {value: "Faktum"},
        "font-weight": {value: 600},
        "font-size": {value: "26px"},
        "color": {value: "#000", parsed: {type: "color", string: ""}}
    }
});

// tests
describe("Chai::style", () => {

    it("should fail when there are no elements to target", () => {
        expect(() => expect($$(".title", [])).to.not.have.style({})).to.throw();
        expect(() => expect(4).to.not.have.style({})).to.throw();
        expect(() => expect("test").to.not.have.style({})).to.throw();
        expect(() => expect(false).to.not.have.style({})).to.throw();
        expect(() => expect({}).to.not.have.style({})).to.throw();
        expect(() => expect([1, 2, 3]).to.not.have.style({})).to.throw();
    });

    it("should fail when there is no style defined", () => {
        expect(() => expect(title).to.have.style({})).to.throw();
    });
});
