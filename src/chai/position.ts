// imports
import ChaiStatic = Chai.ChaiStatic;
import Element = WebdriverIO.Element;
import {almostEqual} from "./util";


// types
export type Position =
    "above" | "topAligned" |
    "below" | "bottomAligned" |
    "leftOf" | "leftAligned" |
    "rightOf" | "rightAligned";


// plugin definition
export function positionAssertions(chai: ChaiStatic) {

    chai.Assertion.addMethod("positioned",
        function(positionOrPositions: Position | Position[], ...elements: Element[]) {

        // assert type
        new chai.Assertion(this._obj).to.haveOwnProperty("getLocation");

        // get locations
        const target = this._obj as Element;
        const targetLocation = target.getLocation();
        const targetSize = target.getSize();

        // normalize positions
        const positions = typeof positionOrPositions === "string"
            ? [positionOrPositions]
            : positionOrPositions;

        // fail immediately if there are no positions to match
        new chai.Assertion(positions, "Positions to be specified").to.have.length.gt(0);

        // compare target position to each element
        for (const element of elements) {

            // get element location
            const elementLocation = element.getLocation();
            const elementSize = element.getSize();
            for (const position of positions) {

                // validate position
                let targetEdge: number;
                let elementEdge: number;
                let valid: boolean | undefined;
                switch (position) {
                    case "above":
                        targetEdge = targetLocation.y + targetSize.height;
                        elementEdge = elementLocation.y;
                        valid = targetEdge < elementEdge || almostEqual(targetEdge, elementEdge);
                        break;
                    case "topAligned":
                        targetEdge = targetLocation.y;
                        elementEdge = elementLocation.y;
                        valid = almostEqual(targetEdge, elementEdge);
                        break;
                    case "below":
                        targetEdge = targetLocation.y;
                        elementEdge = elementLocation.y + elementSize.height;
                        valid = targetEdge > elementEdge || almostEqual(targetEdge, elementEdge);
                        break;
                    case "bottomAligned":
                        targetEdge = targetLocation.y + targetSize.height;
                        elementEdge = elementLocation.y + elementSize.height;
                        valid = almostEqual(targetEdge, elementEdge);
                        break;
                    case "leftOf":
                        targetEdge = targetLocation.x + targetSize.width;
                        elementEdge = elementLocation.x;
                        valid = targetEdge < elementEdge || almostEqual(targetEdge, elementEdge);
                        break;
                    case "leftAligned":
                        targetEdge = targetLocation.x;
                        elementEdge = elementLocation.x;
                        valid = almostEqual(targetEdge, elementEdge);
                        break;
                    case "rightOf":
                        targetEdge = targetLocation.x;
                        elementEdge = elementLocation.x + elementSize.width;
                        valid = targetEdge > elementEdge || almostEqual(targetEdge, elementEdge);
                        break;
                    case "rightAligned":
                        targetEdge = targetLocation.x + targetSize.width;
                        elementEdge = elementLocation.x + elementSize.width;
                        valid = almostEqual(targetEdge, elementEdge);
                        break;
                }

                // fail if not evaluated
                if (valid === undefined) {
                    chai.expect.fail(`unexpected position operator: ${position}`);
                }

                // or assert validity
                else {
                    this.assert(valid,
                        `expected '${target.selector}' (@ ${targetEdge}px) to be ${position} '${element.selector}' (@ ${elementEdge}px)`,
                        `expected '${target.selector}' (@ ${targetEdge}px) to not be ${position} '${element.selector}' (@ ${elementEdge}px)`,
                        position);
                }
            }
        }
    });
}
