// imports
import {Breakpoint, Breakpoints} from "@nascentdigital/lattice";
import {expect} from "chai";
import BrowserObject = WebdriverIO.BrowserObject;


// command definition
export function setBreakpoint(this: BrowserObject, breakpoint: Breakpoint): void {

    // fail if window can't be resized
    if (this.isMobile) {

        if (breakpoint !== "xs") {
            expect.fail("Resize of window not support by browser.");
        }

        return;
    }

    // ensure scrollbar is an overlay
    browser.execute(`document.body.style.overflowY = "overlay";`);

    // get sizes
    const windowSize = this.getWindowSize();

    // get breakpoint width
    const breakpoints = this.getBreakpointsDefinition();
    const breakpointWidth = breakpoint === "xl"
        ? breakpoints[breakpoint]
        : breakpoints[Breakpoints[Breakpoints.indexOf(breakpoint) + 1]] - 1;

    // resize window
    this.setWindowSize(breakpointWidth, windowSize.height);
}
