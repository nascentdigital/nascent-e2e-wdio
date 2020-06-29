// imports
import {ChaiExtensions} from "./chai";
import {WdioExtensions} from "./wdio";


// extensions
export namespace Extensions {
    export function register() {
        ChaiExtensions.register();
        WdioExtensions.register();
    }
}


// exports
export * from "./chai";
export * from "./pageobject";
export * from "./wdio";
