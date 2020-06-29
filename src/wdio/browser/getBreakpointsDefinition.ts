// imports
import {BreakpointsDefinition} from "@nascentdigital/lattice";
import {expect} from "chai";
import BrowserObject = WebdriverIO.BrowserObject;


// command definition
export function getBreakpointsDefinition(this: BrowserObject): BreakpointsDefinition | undefined {

    // get breakpoints from configuration
    const breakpoints = (this.config as any).breakpoints;

    // fail if breakpoints aren't set
    if (breakpoints === undefined || breakpoints.xs === undefined || breakpoints.sm === undefined
        || breakpoints.md === undefined || breakpoints.lg === undefined || breakpoints.xl === undefined) {
        expect.fail(`Breakpoints not defined in Webdriver.io "config.breakpoints".`);
    }

    // return breakpoints
    return breakpoints;
}
