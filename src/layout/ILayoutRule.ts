// imports
import {LayoutPosition} from "./LayoutPosition";
import {Component} from "../models";


// types
export interface ILayoutRule {
    readonly component: Component;
    readonly position: LayoutPosition;
    readonly anchor: Component;
}
