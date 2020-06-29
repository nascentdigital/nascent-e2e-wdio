// imports
import {Breakpoint, IResponsiveValue} from "@nascentdigital/lattice";
import {ILayoutRule} from "./ILayoutRule";
import {LayoutPosition} from "./LayoutPosition";
import {Component} from "../models";


// class definitions
export class Layout {

    public readonly layouts: IResponsiveValue<ILayoutRule[]>;


    public constructor(layouts: IResponsiveValue<ILayoutRule[]>) {
        this.layouts = layouts;
    }

    public static xs(): LayoutBuilder {
        return new LayoutBuilder();
    }
}


export class LayoutBuilder {

    private _breakpoint: Breakpoint;
    private _layoutRules: IResponsiveValue<ILayoutRule[]>;

    public constructor() {

        // initialize instance variables
        this._breakpoint = "xs";
        this._layoutRules = {xs: []};
    }

    public addLayoutRule(layoutRule: ILayoutRule): this {
        // @ts-ignore
        this._layoutRules[this._breakpoint].push(layoutRule);
        return this;
    }

    public layout(component: Component): LayoutRuleBuilder {
        return new LayoutRuleBuilder(this, component);
    }

    public sm(): this {
        this.initializeBreakpoint("sm");
        return this;
    }

    public md(): this {
        this.initializeBreakpoint("md");
        return this;
    }

    public lg(): this {
        this.initializeBreakpoint("lg");
        return this;
    }

    public xl(): this {
        this.initializeBreakpoint("xl");
        return this;
    }

    public done(): Layout {
        return new Layout(this._layoutRules);
    }

    private initializeBreakpoint(breakpoint: Breakpoint) {

        // throw if breakpoint is already defined
        if (this._layoutRules[breakpoint] !== undefined) {
            throw new Error(`Attempt to redefine layout rules for breakpoint ${breakpoint}.`);
        }

        // initialize + bind breakpoint
        this._breakpoint = breakpoint;
        this._layoutRules = {...this._layoutRules, [breakpoint]: []};
    }
}


export class LayoutRuleBuilder {

    private readonly _builder: LayoutBuilder;
    private readonly _component: Component;


    public constructor(builder: LayoutBuilder, component: Component) {
        this._builder = builder;
        this._component = component;
    }

    public above(anchor: Component): LayoutBuilder {
        return this.complete("above", anchor);
    }

    public below(anchor: Component): LayoutBuilder {
        return this.complete("below", anchor);
    }

    public leftOf(anchor: Component): LayoutBuilder {
        return this.complete("leftOf", anchor);
    }

    public rightOf(anchor: Component): LayoutBuilder {
        return this.complete("rightOf", anchor);
    }

    private complete(position: LayoutPosition, anchor: Component): LayoutBuilder {
        return this._builder.addLayoutRule({ component: this._component, position, anchor});
    }
}
