// imports
import Element = WebdriverIO.Element;
import ElementArray = WebdriverIO.ElementArray;
import AssertionStatic = Chai.AssertionStatic;
import ChaiUtils = Chai.ChaiUtils;
import ChaiStatic = Chai.ChaiStatic;


// types
export type Test<TResult> = (element: Element) => [boolean, TResult];


// functions
export function isElement(target: any): target is Element {
    return target.selector && typeof target.selector === "string"
        && target.elementId && typeof target.elementId === "string";
}

export function isElementArray(target: any): target is ElementArray {
    return target.selector && typeof target.selector === "string"
        && target.push && typeof target.push === "function";
}

export function captureElement(chai: ChaiStatic, object: any, message?: string) {

    // handle element
    if (isElement(object) || isElementArray(object)) {
        return object;
    }
    else {
        chai.expect.fail(message || "Expected target to be Webdriver.io Element or ElementArray.");
    }
}

export function verifyElement<TValue>(assertion: AssertionStatic, utils: ChaiUtils,
                                      target: Element | ElementArray, test: Test<TValue>): [boolean, TValue[]] {

    // normalize target
    const elements: Element[] = isElement(target)
        ? [target]
        : target;

    // extract flags
    const some = utils.flag(assertion, "something");
    const negate = utils.flag(assertion, "negate");

    // iterate over elements, stopping at first convenience
    let verified = !some && elements.length > 0;
    const values: TValue[] = [];
    for (const element of elements) {

        // run test
        let [passed, value] = test(element);

        // capture value
        values.push(value);

        // negate pass result if required
        if (negate) {
            passed = !passed;
        }

        // update verified if looking for "every" element to pass
        if (!some) {
            verified = verified && passed;
        }

        // stop processing if looking for "some" elements to pass
        else if (passed) {
            verified = true;
            break;
        }
    }

    // negate if required
    if (negate) {
        verified = !verified;
    }

    // return verified status and actual values
    return [verified, values];
}
