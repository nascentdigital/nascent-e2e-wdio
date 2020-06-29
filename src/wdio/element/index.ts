// imports
import {getClasses} from "./getClasses";


// extensions
export namespace ElementExtensions {
    export function register() {
        browser.addCommand("getClasses", getClasses, true);
    }
}
