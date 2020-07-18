// imports
import {Breakpoint, Breakpoints} from "@nascentdigital/lattice";
import {expect} from "chai";
import BrowserObject = WebdriverIO.BrowserObject;


// declaration merging
declare module "@wdio/sync" {
    interface Browser {
        putStyle(id: string, css: string): void;
    }
}


// constants
const StyleId = "__wdio-extend_setBreakpoint";
const ScrollbarFixStyle =
`
body::-webkit-scrollbar { display: none; }
body { scrollbar-width: none; }
`;


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
    browser.putStyle(StyleId, ScrollbarFixStyle);

    // get sizes
    const windowSize = this.getWindowSize();
    const htmlSize = $("html").getSize().width;
    const padding = Math.max(0, windowSize.width - htmlSize);

    // get breakpoint width
    const breakpoints = this.getBreakpointsDefinition();
    const breakpointWidth = breakpoint === "xl"
        ? breakpoints[breakpoint]
        : breakpoints[Breakpoints[Breakpoints.indexOf(breakpoint) + 1]] - 1;

    // resize window
    this.setWindowSize(breakpointWidth + padding, windowSize.height);
}
