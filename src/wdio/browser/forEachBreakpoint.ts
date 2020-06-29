// imports
import {Breakpoint, Breakpoints} from "@nascentdigital/lattice";


// command definition
export function forEachBreakpoint(closure: (breakpoint: Breakpoint) => void, ...breakpoints: Breakpoint[]) {

    // skip if window can't be resized (means mobile)
    if (!browser.capabilities.setWindowRect) {
        closure("xs");
        return;
    }

    // use default breakpoints if there are none
    const activeBreakpoints = breakpoints.length > 0 ? breakpoints : Breakpoints;

    // apply closure for each breakpoint, after resizing window
    for (const breakpoint of activeBreakpoints) {

        // resize window
        browser.setBreakpoint(breakpoint);

        // execute closure
        closure(breakpoint);
    }
}
