// imports
import {Breakpoint} from "@nascentdigital/lattice";
import BrowserObject = WebdriverIO.BrowserObject;


// command definition
export function getBreakpoint(this: BrowserObject): Breakpoint {

    // get breakpoints
    const breakpoints = this.getBreakpointsDefinition();

    // get page width
    const width = $("html").getSize("width");

    // map to appropriate breakpoint
    if (width >= breakpoints.xl) {
        return "xl";
    }
    else if (width >= breakpoints.lg) {
        return "lg";
    }
    else if (width >= breakpoints.md) {
        return "md";
    }
    else if (width >= breakpoints.sm) {
        return "sm";
    }
    else {
        return "xs";
    }
}
