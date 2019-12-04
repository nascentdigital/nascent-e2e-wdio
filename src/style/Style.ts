// imports
import {Breakpoint, Breakpoints, IResponsiveValue} from "@nascentdigital/lattice";
import {Styling} from "./Styling";


// class definition
export class Style {

    private readonly _styling: IResponsiveValue<Styling>;


    public constructor(styling: IResponsiveValue<Styling>) {
        this._styling = styling;
    }

    entries(breakpoint: Breakpoint): [keyof Styling, string | number][] {

        // walk backwards looking for matching styles
        for (let i = Breakpoints.indexOf(breakpoint); i >= 0; --i) {

            // stop at first match
            const actualBreakpoint = Breakpoints[i];
            const styling = this._styling[actualBreakpoint];
            if (styling) {
                return Object.keys(styling)
                    .map(k => [k as keyof Styling, styling[k]]);
            }
        }

        // throw if there aren't any styles (should never be the case)
        throw new Error(`No fallback styles for breakpoint ${breakpoint}.`);
    }

    public static xs(xs: Styling = {}): StyleBuilder {
        return new StyleBuilder(xs);
    }
}

export class StyleBuilder {

    private _styling: IResponsiveValue<Styling>;


    public constructor(xs: Styling) {
        this._styling = {xs};
    }

    public sm(styling: Styling) {
        this._styling = {...this._styling, sm: styling};
        return this;
    }

    public md(styling: Styling) {
        this._styling = {...this._styling, md: styling};
        return this;
    }

    public lg(styling: Styling) {
        this._styling = {...this._styling, lg: styling};
        return this;
    }

    public xl(styling: Styling) {
        this._styling = {...this._styling, xl: styling};
        return this;
    }

    public done(): Style {
        return new Style(this._styling);
    }
}
