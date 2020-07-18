// imports
import {Breakpoint, BreakpointsDefinition} from "@nascentdigital/lattice";
import {BrowserExtensions, URLParameters} from "./browser";
import {ElementExtensions} from "./element";


// declaration merging
declare module "@wdio/sync" {
    interface Browser {

        forBreakpoint(breakpoint: Breakpoint, action: () => void): void;
        forEachBreakpoint(action: (breakpoint: Breakpoint) => void, ...breakpoints: Breakpoint[]): void;
        getBreakpointsDefinition: () => BreakpointsDefinition;
        getBreakpoint: () => Breakpoint;
        setBreakpoint: (breakpoint: Breakpoint) => void;
        
        putStyle(id: string, css: string): void;

        open(path: string, parameters?: URLParameters): void;

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
