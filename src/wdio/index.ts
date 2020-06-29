// imports
import {Breakpoint, BreakpointsDefinition} from "@nascentdigital/lattice";
import {BrowserExtensions} from "./browser";
import {ElementExtensions} from "./element";


// declaration merging
declare module "@wdio/sync" {
    interface Browser {
        getBreakpointsDefinition: () => BreakpointsDefinition;
        getBreakpoint: () => Breakpoint;
        setBreakpoint: (breakpoint: Breakpoint) => void;

        forBreakpoint(breakpoint: Breakpoint, action: () => void): void;
        forEachBreakpoint(action: (breakpoint: Breakpoint) => void, ...breakpoints: Breakpoint[]): void;

        scrollTo(x: number, y: number): void;
    }

    interface Element {
        getClasses: () => string[];
    }
}


// extensions
export namespace WdioExtensions {
    export function register() {
        BrowserExtensions.register();
        ElementExtensions.register();
    }
}
