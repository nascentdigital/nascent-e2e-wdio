// imports
import {Breakpoint, Breakpoints} from "@nascentdigital/lattice";
import queryString from "query-string";
import {Container} from "./Container";


// types
export type PageParams = Record<string, string | number | boolean>;


// class definition
export class Page extends Container {

    private readonly _path: string;


    protected constructor(path: string) {

        // call base constructor
        super();

        // initialize instance variables
        this._path = path;
    }

    public open(query?: PageParams) {

        // create base url
        const url = new URL(this._path, browser.config.baseUrl);

        // merge any params
        if (query) {
            url.search = "?" + queryString.stringify(query);
        }

        // navigate and return browser
        return browser.url(url.href);
    }

    public forEachBreakpoint(closure: (breakpoint: Breakpoint) => void, ...breakpoints: Breakpoint[]) {

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
}
