// imports
import BrowserObject = WebdriverIO.BrowserObject;


// command definition
export function scrollTo(this: BrowserObject, x: number, y: number): void {

    // special handling for ios (Appium doesn't support executeAsync with SSL)
    if (this.isIOS) {

        // scroll synchronously
        this.execute(function (x, y) {
            window.scrollTo(x, y);
        }, x, y);

        // loop, polling for page scroll completion
        let complete;
        do {
            complete = this.execute(function (x, y) {
                return x === window.scrollX && y === window.scrollY;
            }, x, y);
        } while (!complete);
    }

    // or run properly
    else {

        // scroll asynchronously (wait for page to finish moving)
        this.executeAsync(function (x, y, done) {
            function onScrollComplete() {
                if (Math.abs(window.scrollX) === x && Math.abs(window.scrollY) === y) {
                    window.removeEventListener("scroll", onScrollComplete);
                    done();
                }
            }

            window.addEventListener("scroll", onScrollComplete);
            window.scrollTo(x, y);
        }, x, y);
    }
}
