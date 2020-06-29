// imports
import {captureElement, verifyElement} from "./util";
import ChaiStatic = Chai.ChaiStatic;
import ChaiUtils = Chai.ChaiUtils;


// plugin definition
export function elementAssertions(chai: ChaiStatic, utils: ChaiUtils) {

    // language chains
    chai.Assertion.addProperty("everything", function() {
        utils.flag(this, "everything", true);
        utils.flag(this, "something", false);
    });
    chai.Assertion.addProperty("something", function() {
        utils.flag(this, "something", true);
        utils.flag(this, "everything", false);
    });

    chai.Assertion.addMethod("text",
        function(expected: string) {

        // capture target
        const target = captureElement(chai, this._obj);

        // verify target
        const [verified, values] = verifyElement(this, utils, target, function(element) {
            const text = element.getText();
            return [text === expected, `"${text}"`];
        });

        // verify text
        this.assert(verified,
            `expected '${target.selector}' to contain "${expected}", found [${values}]`,
            `expected '${target.selector}' not to contain "${expected}", found [${values}]`,
            expected,
            values);
    });
}
