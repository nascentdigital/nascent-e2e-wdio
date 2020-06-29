// imports
import {expect} from "chai";
import {ChaiExtensions} from "../../src";
import {$, $$} from "../mock";


// bind extensions
ChaiExtensions.register();


// constants
const FontFamily = "Faktum";
const FontWeight = 600;
const FontSize = "26px";
const Color1_Hex = "#000000";
const Color1_HexShort = "#000";
const Color1_RGB = "rgb(0, 0, 0)";
const Color1_RGBA = "rgba(0, 0, 0, 1)";
const title = $(".title", {
    style: {
        "font-family": {value: FontFamily},
        "font-weight": {value: FontWeight},
        "font-size": {value: FontSize},
        "color": {value: Color1_Hex, parsed: {type: "color", string: Color1_Hex}}
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

    describe("single element", () => {

        describe("font-family", () => {

            describe("exactly matching", () => {
                it("should pass", () => {
                    expect(title).to.have.style({"font-family": FontFamily})
                });

                it("should fail when negated", () => {
                    expect(() => expect(title).to.not.have.style({"font-family": FontFamily})).to.throw();
                });
            });

            it("should pass if case is different", () => {
                const element = $(".title", {
                    style: {
                        "font-family": {value: FontFamily.toUpperCase()}
                    }
                });
                expect(element).to.have.style({"font-family": FontFamily.toLowerCase()})
            });

            it("should pass if actual has whitespace", () => {
                const element = $(".title", {
                    style: {
                        "font-family": {value: " " + FontFamily + "  "}
                    }
                });
                expect(element).to.have.style({"font-family": FontFamily});
            });
        });

        describe("color", () => {

            describe("exactly matching HEX value", () => {
                it("should pass", () => {
                    expect(title).to.have.style({"color": Color1_Hex})
                });

                it("should fail when negated", () => {
                    expect(() => expect(title).to.not.have.style({"color": Color1_Hex})).to.throw();
                });
            });

            it("should pass if comparing to short HEX value", () => {
                expect(title).to.have.style({"color": Color1_HexShort})
            });

            it("should pass if comparing to RGB value", () => {
                expect(title).to.have.style({"color": Color1_RGB})
            });

            it("should pass if comparing to RGBA value", () => {
                expect(title).to.have.style({"color": Color1_RGBA})
            });
        });
    });

    // TODO: add multi-element tests
});
