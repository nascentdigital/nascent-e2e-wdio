// imports
import {expect} from "chai";
import {Breakpoint, Breakpoints} from "@nascentdigital/lattice";
import {ILayoutRule, Layout} from "../layout";


// class definition
export abstract class Container {

    private _layout?: Layout | null;


    public get layout(): Layout | null {

        // create layout if unset
        if (this._layout === undefined) {
            this._layout = this.declareLayout();
        }

        // return layout (might be null)
        return this._layout;
    }

    public validateLayout(): void {

        // fail if breakpoints aren't set
        const breakpointConfig = browser.getBreakpointsDefinition();

        // fail if layout isn't defined
        const layout = this.layout;
        if (layout === null) {
            expect.fail(`No layout defined.`);
            return;
        }

        // wait for width
        const width = $("html").getSize("width");

        // map to appropriate breakpoint
        let breakpoint: Breakpoint;
        if (width >= breakpointConfig.xl) {
            breakpoint = "xl";
        }
        else if (width >= breakpointConfig.lg) {
            breakpoint = "lg";
        }
        else if (width >= breakpointConfig.md) {
            breakpoint = "md";
        }
        else if (width >= breakpointConfig.sm) {
            breakpoint = "sm";
        }
        else {
            breakpoint = "xs";
        }

        // verify the expected layouts
        for (const rule of this.layoutRules(breakpoint)) {

            // resolve parameters
            const target = rule.component;
            const targetElement = target.element;
            const position = rule.position;
            const anchor = rule.anchor;
            const anchorElement = anchor.element;

            // get target bounds
            const targetLocation = targetElement.getLocation();


            // get anchor bounds
            const anchorLocation = anchorElement.getLocation();

            // TODO: we need to use the size for a proper comparison (i.e. overlap, etc.)
            // process based on position
            const message = `Testing if target (${target.path}) is ${position} anchor (${anchor.path})`;
            switch (position) {
                case "above":
                    if (targetLocation.y > anchorLocation.y) {
                        expect.fail("below", position, message);
                    }
                    else if (targetLocation.y === anchorLocation.y) {
                        expect.fail("verticallyAligned", position, message);
                    }
                    break;
                case "below":
                    if (targetLocation.y < anchorLocation.y) {
                        expect.fail("above", position, message);
                    }
                    else if (targetLocation.y === anchorLocation.y) {
                        expect.fail("verticallyAligned", position, message);
                    }
                    break;
                case "leftOf":
                    if (targetLocation.x > anchorLocation.x) {
                        expect.fail("rightOf", position, message);
                    }
                    else if (targetLocation.x === anchorLocation.x) {
                        expect.fail("horizontallyAligned", position, message);
                    }
                    break;
                case "rightOf":
                    if (targetLocation.x < anchorLocation.x) {
                        expect.fail("aligned", position, message);
                    }
                    else if (targetLocation.x === anchorLocation.x) {
                        expect.fail("horizontallyAligned", position, message);
                    }
                    break;
                default:
                    expect.fail(`Unexpected position: ${position}`);
                    break;
            }
        }
    }

    public layoutRules(breakpoint: Breakpoint): ILayoutRule[] {

        // get layout (throw is no layout defined)
        const layout = this.layout;
        if (layout === null) {
            throw new Error("No layout defined.");
        }

        // walk backwards looking for matching styles
        for (let i = Breakpoints.indexOf(breakpoint); i >= 0; --i) {

            // stop at first match
            const actualBreakpoint = Breakpoints[i];
            const rules = layout.layouts[actualBreakpoint];
            if (rules) {
                return rules;
            }
        }

        // throw if there aren't any styles (should never be the case)
        throw new Error(`No fallback styles for breakpoint ${breakpoint}.`);
    }

    protected declareLayout(): Layout | null {
        return null;
    }
}
