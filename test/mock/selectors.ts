// imports
import {stubInterface} from "ts-sinon";
import * as uuid from "uuid";
import CSSProperty = WebdriverIO.CSSProperty;
import Element = WebdriverIO.Element;
import ElementArray = WebdriverIO.ElementArray;
import {CSSKey} from "../../src";


// constants + types
const DefaultElementTag = "default";
const DefaultElementText = "default";
export interface MockElementData {
    readonly tag?: string;
    readonly text?: string;
    readonly bounds?: Rect;
    readonly style?: Partial<Record<CSSKey, Partial<CSSProperty>>>;
}
export class Rect {

    public readonly x: number;
    public readonly y: number;
    public readonly width: number;
    public readonly height: number;


    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    get top() { return this.y; }

    get bottom() { return this.y + this.height; }

    get left() { return this.x; }

    get right() { return this.x + this.width; }

    intersects(that: Rect): boolean {

        // no intersection if one is to the left of the other
        if (this.left >= that.right || that.left >= this.right) {
            return false;
        }

        // otherwise it intersects if no intersection if one is above the other
        else return !(this.top <= that.bottom || that.top <= this.bottom);
    }
}

// functions
export function $(selector: string, data: MockElementData = {}) {

    // resolve data
    const {tag = DefaultElementTag, text = DefaultElementText, style = {}} = data;

    // create element
    const stub = stubInterface<Element>()
    stub.elementId = uuid.v4();
    stub.selector = selector;
    stub.getTagName.returns(tag.toUpperCase());
    stub.getText.returns(text);
    stub.getCSSProperty.callsFake(key => style[key]);

    // set positioning if bounds are provided
    if (data.bounds) {
        stub.getLocation.returns(data.bounds);
        stub.getSize.returns(data.bounds);
    }

    // return element
    return stub;
}

export function $$(selector: string, data: MockElementData[]) {

    // create container
    const stub: ElementArray = [] as any;
    stub.selector = selector;

    // add elements
    for (const entry of data) {
        stub.push($(selector, entry));
    }

    // return elements
    return stub;
}
