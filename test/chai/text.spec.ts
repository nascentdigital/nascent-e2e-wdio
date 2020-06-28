// imports
import {expect} from "chai";
import {StubbedInstance, stubInterface} from "ts-sinon";
import {Browser, Element, ElementArray} from "@wdio/sync";
import "../../src/chai";


// tests
describe("Chai::text", () => {

    // reset before each test
    let browserStub: StubbedInstance<Browser>;
    let elementStub: StubbedInstance<Element>;
    beforeEach(() => {
        browserStub = stubInterface<Browser>();
        elementStub = stubInterface<Element>();
    });

    describe("when element doesn't exist", () => {

        // configure selector
        const InvalidSelector = ".invalid-selector";
        beforeEach(() => {
            browserStub.$$.withArgs(InvalidSelector).returns(stubInterface<ElementArray>());
        });

        it("should throw element when matching string", () => {
            expect(() => expect(browserStub.$$(InvalidSelector)).to.have.text("blablabla")).to.throw;
        });
    });

    describe("when element exists", () => {

        // configure selector
        const Selector = ".selector";
        const ElementText = "matching text";
        beforeEach(() => {
            // elementStub.selector = Selector;
            elementStub.getText.returns(ElementText);
            browserStub.$.withArgs(Selector).returns(elementStub);
        });

        describe("when matching string expectation", () => {

            it("should not fail", () => {
                expect(browserStub.$(Selector)).to.have.text(ElementText);
            });

            it("should fail if negated", () => {
                expect(() => expect(browserStub.$(Selector)).to.not.have.text(ElementText)).to.throw;
            });
        });

        describe("when not matching string expectation", () => {

            const DifferentText = ElementText + "_diff";

            it("should fail", () => {
                expect(() => expect(browserStub.$(Selector)).to.have.text(DifferentText)).to.throw;
            });

            it("should not fail if negated", () => {
                expect(browserStub.$(Selector)).to.not.have.text(DifferentText);
            });
        });
    });
});
