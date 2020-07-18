// imports
import BrowserObject = WebdriverIO.BrowserObject;


// command definition
export function putStyle(this: BrowserObject, id: string, css: string) {

    // execute in remote browser
    this.execute(function (id, css) {

        // handle case where element exists
        let style = document.getElementById(id);
        if (style && style.parentNode) {

            // fail if the existing element isn't a style
            if (style.tagName.toLowerCase() !== "style") {
                throw new Error(`A ${style.tagName} element already exists with ID "${id}".`);
            }

            // or just delete the style
            style.parentNode.removeChild(style);
        }

        // create style
        style = document.createElement("style");
        style.id = id;
        style.setAttribute("type", "text/css");

        // set content of style
        style.appendChild(document.createTextNode(css));

        // add to head
        document.head.appendChild(style);

    }, id, css);
}
