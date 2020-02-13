# wdio-extend
> A set of [WebdriverIO](https://webdriver.io/) extensions to enabling powerful E2E testing.


## Installation

This package should be used with `node >= 10`.  We highly recommend using
[Node Version Manager](https://github.com/nvm-sh/nvm) if you need to update your node version.


### Quick Start

The quickest way to get started is through our command-line interface,
[`create-e2e-tests`](https://github.com/nascentdigital/create-e2e-tests) to generates a sample
project after prompting for project options:

```bash
> npx @nascentdigital/create-e2e-tests my-e2e-project
```

Verify the project is installed correctly by running the sample E2E tests against the
[nascentdigital.com](https://nascentdigital.com) website (requires [Google Chrome](https://www.google.com/chrome/) to be
installed):

```bash
> cd my-e2e-project && npm run test
```

View the report to see the success.


### Manual Installation

You can add the library directly to an existing [WebdriverIO](https://webdriver.io) project by directly installing the
package to  your project:

```bash
npm i -s @nascentdigital/wdio-extend
```

And registering the extension library as a `before` hook in your WebdriverIO config file:

```javascript
// wdio.conf.js
before: function() {
    require("ts-node").register({files: true});
    require("@nascentdigital/wdio-extend").NascentExtensions.register();
}
```
