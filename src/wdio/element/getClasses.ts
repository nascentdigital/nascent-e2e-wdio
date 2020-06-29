// imports
import Element = WebdriverIO.Element;


// command definition
export function getClasses(this: Element): string[] {
    const classes = this.getAttribute("class");
    return classes
        ? classes.split(" ").filter(c => c.trim().length > 0)
        : [];
}

