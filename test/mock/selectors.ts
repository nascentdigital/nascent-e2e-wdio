// imports
import {Element} from "@wdio/sync";
import {stubInterface} from "ts-sinon";
import * as uuid from "uuid";
import ElementArray = WebdriverIO.ElementArray;


// constants + types
const DefaultElementTag = "default";
const DefaultElementText = "default";
export interface MockElementData {
    readonly tag?: string;
    readonly text?: string;
}


// functions
export function $(selector: string, data: MockElementData = {}) {

    // resolve data
    const {tag = DefaultElementTag, text = DefaultElementText} = data;

    // create element
    const stub = stubInterface<Element>()
    stub.elementId = uuid.v4();
    stub.selector = selector;
    stub.getTagName.returns(tag.toUpperCase());
    stub.getText.returns(text);

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
