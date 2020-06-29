// imports
import {Breakpoint} from "@nascentdigital/lattice";
import {expect} from "chai";
import BrowserObject = WebdriverIO.BrowserObject;


// command definition
export function setBreakpoint(this: BrowserObject, breakpoint: Breakpoint): void {

    // fail if window can't be resized
    if (!this.capabilities.setWindowRect) {
        expect.fail("Resize of window not support by browser.");
        return;
    }

    // get sizes
    const windowSize = this.getWindowSize();
    const htmlWidth = $("html").getSize("width");
    const padding = windowSize.width - htmlWidth;

    // get breakpoint width
    const breakpoints = this.getBreakpointsDefinition();
    const breakpointWidth = breakpoints[breakpoint];

    // resize window
    this.setWindowSize(breakpointWidth + padding, windowSize.height);
}
