// imports
import {Breakpoint} from "@nascentdigital/lattice";


// command definition
export function forBreakpoint(breakpoint: Breakpoint, action: () => void) {

    // special handling if window can't be resized (means mobile)
    if (!browser.capabilities.setWindowRect) {

        // only invoke closure if asking for XS
        if (breakpoint === "xs") {
            action();
        }
    }

    // otherwise, set breakpoint
    else {

        // set breakpoint as requested
        browser.setBreakpoint(breakpoint);

        // invoke action
        action();
    }
}
