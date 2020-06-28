declare module "chai" {
    import {Element} from "@wdio/sync";
    import {PropertiesHyphen} from "csstype";
    import {Position} from "extend/chai/position";

    global {
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
}
