// imports
import {getBreakpointsDefinition} from "./getBreakpointsDefinition";
import {getBreakpoint} from "./getBreakpoint";
import {setBreakpoint} from "./setBreakpoint";
import {forBreakpoint} from "./forBreakpoint";
import {forEachBreakpoint} from "./forEachBreakpoint";
import {open, URLParameters} from "./open";
import {scrollTo} from "./scrollTo";


// extensions
export namespace BrowserExtensions {
    export function register() {
        browser.addCommand("getBreakpointsDefinition", getBreakpointsDefinition);
        browser.addCommand("getBreakpoint", getBreakpoint);
        browser.addCommand("setBreakpoint", setBreakpoint);
        browser.addCommand("forBreakpoint",forBreakpoint);
        browser.addCommand("forEachBreakpoint",forEachBreakpoint);
        browser.addCommand("open",open);
        browser.addCommand("scrollTo", scrollTo);
    }
}


// exports
export {URLParameters};
