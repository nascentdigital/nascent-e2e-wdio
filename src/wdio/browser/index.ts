// imports
import {getBreakpointsDefinition} from "./getBreakpointsDefinition";
import {getBreakpoint} from "./getBreakpoint";
import {setBreakpoint} from "./setBreakpoint";
import {forBreakpoint} from "./forBreakpoint";
import {forEachBreakpoint} from "./forEachBreakpoint";
import {scrollTo} from "./scrollTo";


// extensions
export namespace BrowserExtensions {
    export function register() {
        browser.addCommand("getBreakpointsDefinition", getBreakpointsDefinition);
        browser.addCommand("getBreakpoint", getBreakpoint);
        browser.addCommand("setBreakpoint", setBreakpoint);
        browser.addCommand("forBreakpoint",forBreakpoint);
        browser.addCommand("forEachBreakpoint",forEachBreakpoint);
        browser.addCommand("scrollTo", scrollTo);
    }
}
