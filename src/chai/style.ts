// imports
import chai from "chai";
import colorNormalize from "color-normalize";
import equals from "fast-deep-equal";
import Element = WebdriverIO.Element;
import {PropertiesHyphen} from "csstype";


// type
type CSSKey = keyof PropertiesHyphen;


// plugin definition
chai.use(chai => {

    chai.Assertion.addMethod("style",
        function(css: PropertiesHyphen) {

        // assert type
        new chai.Assertion(this._obj).to.haveOwnProperty("getCSSProperty");
        const element = this._obj as Element;

        // assert there is a style to match
        const keys = Object.keys(css) as CSSKey[];
        new chai.Assertion(keys, "CSS style to be specified").to.have.length.gt(0);

        // verify css properties
        for (const key of keys) {

            // get expected
            const expected = css[key];

            // get actual
            const actual = element.getCSSProperty(key);
            const actualType = actual.parsed ? actual.parsed.type : undefined;

            // handle font
            if (key === "font-family") {
                const actualFont = actual.value.trim().toLowerCase();
                const expectedFont = (expected as string).trim().toLowerCase();
                this.assert(actualFont === expectedFont,
                    `expected '${element.selector}' font-family to be ${expectedFont}, found ${actualFont}`,
                    `expected '${element.selector}' font-family to not be ${expectedFont}, found ${actualFont}`,
                    expectedFont,
                    actualFont);
            }

            // handle color
            else if (actualType === "color") {
                const actualColor = colorNormalize(actual.value);
                const expectedColor = colorNormalize(expected);
                this.assert(equals(actualColor, expectedColor),
                    `expected '${element.selector}' ${key} to be ${expectedColor}, found ${actualColor}`,
                    `expected '${element.selector}' ${key} to not be ${expectedColor}, found ${actualColor}`,
                    expectedColor,
                    actualColor);
            }

            // otherwise just check property
            else {
                this.assert(equals(actual.value, expected),
                    `expected '${element.selector}' ${key} to be ${expected}, found ${actual.value}`,
                    `expected '${element.selector}' ${key} to not be ${expected}, found ${actual.value}`,
                    expected,
                    actual.value);
            }
        }
    });
});
