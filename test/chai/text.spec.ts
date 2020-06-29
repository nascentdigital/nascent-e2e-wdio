// imports
import {expect} from "chai";
import "../../src/chai";
import {$, $$} from "../mock";


// constants
const Selector = ".selector";
const TextA = "text a";
const TextB = "text b";
const TextC = "text c";


// tests
describe("Chai::text", () => {

    it("should fail when there are no elements to target", () => {
        expect(() => expect($$(Selector, [])).to.not.have.text(TextA)).to.throw();
        expect(() => expect(4).to.not.have.text(TextA)).to.throw();
        expect(() => expect("test").to.not.have.text(TextA)).to.throw();
        expect(() => expect(false).to.not.have.text(TextA)).to.throw();
        expect(() => expect({}).to.not.have.text(TextA)).to.throw();
        expect(() => expect([1, 2, 3]).to.not.have.text(TextA)).to.throw();
    });

    describe("when single element", () => {

        const element = $(Selector, {text: TextA});

        describe("and matches string expectation", () => {

            it("should pass", () => {
                expect(element).to.have.text(TextA);
            });

            it("should fail when negated", () => {
                expect(() => expect(element).to.not.have.text(TextA)).to.throw();
            });
        });

        describe("and doesn't match string expectation", () => {

            it("should fail", () => {
                expect(() => expect(element).to.have.text(TextB)).to.throw();
            });

            it("should pass if negated", () => {
                expect(element).to.not.have.text(TextB);
            });
        });
    });

    describe("when multiple elements", () => {

        describe("some match expected string", () => {

            const elements = $$(Selector, [
                {text: TextA},
                {text: TextB},
                {text: TextB},
                {text: TextC},
                {text: TextA},
            ]);

            it("should fail without additional assertions", () => {
                expect(() => expect(elements).to.have.text(TextA)).to.throw();
            });

            it("should fail with just negation", () => {
                expect(() => expect(elements).to.not.have.text(TextA)).to.throw();
            });

            it("should fail with 'everything' assertion", () => {
                expect(() => expect(elements).everything.to.not.have.text(TextA)).to.throw();
            });

            it("should fail with 'everything' assertion and negated", () => {
                expect(() => expect(elements).everything.to.not.have.text(TextA)).to.throw();
            });

            it("should pass with 'something' assertion", () => {
                expect(elements).something.to.have.text(TextA);
            });

            it("should pass with 'something' assertion and negated", () => {
                expect(elements).something.to.not.have.text(TextA);
            });
        });
    });
});
