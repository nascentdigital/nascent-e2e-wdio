// imports
import {expect} from "chai";
import "../../src/chai";
import {$$} from "../mock";


// constants


// tests
describe("Chai::style", () => {

    // TODO: update test so that it actually should pass (e.g. expect().to.not.have.style({}))
    it("should fail when there are no elements to target", () => {
        expect(() => expect($$(".title", [])).to.have.style({})).to.throw();
        expect(() => expect(4).to.have.style({})).to.throw();
        expect(() => expect("test").to.have.style({})).to.throw();
        expect(() => expect(false).to.have.style({})).to.throw();
        expect(() => expect({}).to.have.style({})).to.throw();
        expect(() => expect([1, 2, 3]).to.have.style({})).to.throw();
    });

});
