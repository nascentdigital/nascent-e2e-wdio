// imports
import BrowserObject = WebdriverIO.BrowserObject;


// types
export type URLParameters = Record<string, string | number | boolean>;


// command definition
export function open(this: BrowserObject, path: string, parameters?: URLParameters): void {

    // build url
    const url = new URL(path, browser.config.baseUrl);
    if (parameters) {
        const query = url.searchParams;
        for (const key in parameters) {
            if (parameters.hasOwnProperty(key)) {
                query.append(key, parameters[key].toString());
            }
        }
    }

    // navigate to url
    this.url(url.href);
}
