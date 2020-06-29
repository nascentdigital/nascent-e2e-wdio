// imports
import chai from "chai";
import {PropertiesHyphen} from "csstype";
import Element = WebdriverIO.Element;
import {elementAssertions} from "./element";
import {Position, positionAssertions} from "./position";
import {styleAssertions} from "./style";


// declaration merging
declare global {
    export namespace Chai {
        interface Assertion {

            // elements
            everything: Assertion;
            something: Assertion;
            text(expected: string): Promise<void>;

            // position
            positioned(positions: Position | Position[], ...elements: Element[]): Promise<void>;

            // style
            style(css: PropertiesHyphen): Promise<void>;
        }
    }
}


// extensions
export namespace ChaiExtensions {
    export function register() {
        chai.use(elementAssertions);
        chai.use(positionAssertions);
        chai.use(styleAssertions);
    }
}


// exports
export {Position} from "./position";
export {CSSKey, CSSProperties} from "./style";
