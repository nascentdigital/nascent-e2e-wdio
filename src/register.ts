// imports
import {expect} from "chai";
import {BrowserObject, Element} from "@wdio/sync";
import {Breakpoint, BreakpointsDefinition} from "@nascentdigital/lattice";


// declaration merging
declare module "@wdio/sync" {
    interface Browser {
        getBreakpointsDefinition: () => BreakpointsDefinition;
        getBreakpoint: () => Breakpoint;
        setBreakpoint: (breakpoint: Breakpoint) => void;

        scrollTo(x: number, y: number): void;
    }

    interface Element {
        getClasses: () => string[];
    }
}


// extension function
export namespace NascentExtensions {
    export function register() {

        // register custom browser commands
        browser.addCommand("getBreakpointsDefinition", getBreakpointsDefinitionCommand);
        browser.addCommand("getBreakpoint", getBreakpointCommand);
        browser.addCommand("setBreakpoint", setBreakpointCommand);
        browser.addCommand("scrollTo", scrollTo);

        // register custom element commands
        browser.addCommand("getClasses", getClasses, true);
    }
}

// helper functions
function getBreakpointsDefinitionCommand(this: BrowserObject): BreakpointsDefinition | undefined {

    // get breakpoints from configuration
    const breakpoints = (this.config as any).breakpoints;

    // fail if breakpoints aren't set
    if (breakpoints === undefined || breakpoints.xs === undefined || breakpoints.sm === undefined
        || breakpoints.md === undefined || breakpoints.lg === undefined || breakpoints.xl === undefined) {
        expect.fail(`Breakpoints not defined in Webdriver.io "config.breakpoints".`);
    }

    // return breakpoints
    return breakpoints;
}

function getBreakpointCommand(this: BrowserObject): Breakpoint {

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

function setBreakpointCommand(this: BrowserObject, breakpoint: Breakpoint): void {

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

function getClasses(this: Element): string[] {
    const classes = this.getAttribute("class");
    return classes
        ? classes.split(" ").filter(c => c.trim().length > 0)
        : [];
}

function scrollTo(this: BrowserObject, x: number, y: number): void {

    // special handling for ios (Appium doesn't support executeAsync with SSL)
    if (this.isIOS) {

        // scroll synchronously
        this.execute(function (x, y) {
            window.scrollTo(x, y);
        }, x, y);

        // loop, polling for page scroll completion
        let complete;
        do {
            complete = this.execute(function (x, y) {
                return x === window.scrollX && y === window.scrollY;
            }, x, y);
        } while (!complete);
    }

    // or run properly
    else {

        // scroll asynchronously (wait for page to finish moving)
        this.executeAsync(function (x, y, done) {
            function onScrollComplete() {
                if (Math.abs(window.scrollX) === x && Math.abs(window.scrollY) === y) {
                    window.removeEventListener("scroll", onScrollComplete);
                    done();
                }
            }

            window.addEventListener("scroll", onScrollComplete);
            window.scrollTo(x, y);
        }, x, y);
    }
}
