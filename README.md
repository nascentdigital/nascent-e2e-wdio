# wdio-extend
> A set of [WebdriverIO](https://webdriver.io/) extensions to help build E2E tests that validate your user interface
> using a combination of Chai extensions and a Page Object modeling language.

[![NPM version](https://img.shields.io/npm/v/@nascentdigital/wdio-extend.svg)](https://www.npmjs.com/package/@nascentdigital/wdio-extend)
[![downloads](https://img.shields.io/npm/dm/@nascentdigital/wdio-extend.svg)](http://npm-stat.com/charts.html?package=@nascentdigital/wdio-extend&from=2018-01-01)
[![Node version](https://img.shields.io/node/v/@nascentdigital/wdio-extend.svg)](http://nodejs.org/download/)
[![Build Status](https://travis-ci.com/nascentdigital/wdio-extend.svg?branch=master)](https://travis-ci.com/nascentdigital/wdio-extend.svg?branch=master)
[![Code Coverage](https://img.shields.io/codecov/c/github/nascentdigital/wdio-extend.svg)](https://codecov.io/github/nascentdigital/wdio-extend)
[![Known Vulnerabilities](https://snyk.io/test/github/nascentdigital/wdio-extend/badge.svg)](https://snyk.io/test/github/nascentdigital/wdio-extend)


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

View the report to see the build results *(hopefully showing a successful build)*.


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


### Defining Comnponents and Pages

`Component` and `Page` objects are key concepts of the `wdio-extend` framework.  They provide a simple way to implement
the [Page Object Model](https://martinfowler.com/bliki/PageObject.html) design pattern within WebdriverIO.

#### Components

A `Component` is the most basic building block of a test.  It encapsulates the specification and expected behavior of
a widget on a web page, allowing it to be testing independently in a reusable way.

Components provide a way to define the expected **structure**, **layout**, and **styling** of a component in a
responsive manner.

The definition for a Card component might look something like this:

```typescript
/// Card.ts

class Card extends Component {

    constructor(parent: Container) {
        // CSS selector demarcating the component root
        super(parent, `*[data-component="Card"]`);
    }


    public get title() {
        return Component.create(this, `.title`, "title")
            .withStyle(HeadlineStyle);
    }

    public get caption() {
        return Component.create(this, `.caption`, "caption")
            .withStyle(BodyStyle);
    }

    public get image() {
        return new Component(this, `img`, "image");
    }

    protected declareLayout(): Layout | null {
        return Layout
            .xs()
                .layout(this.title).above(this.caption)
                .layout(this.caption).above(this.image)
            .md()
                .layout(this.title).leftOf(this.caption)
                .layout(this.caption).leftOf(this.image)
            .done();
    }
}
```

### Pages

A `Page` is a top-level object that has similar functionality to a `Component` but exists as a singleton which maps to a
specific web page within a website.  A `Page` will be composed of `Component` objects.

Here is an example of a typical homepage:

```typescript
// HomePage.ts
class HomePage extends Page {

    public constructor() {
        super("/");
    }

    public get header() {
        return new Header(this);
    }

    public get card() {
        return new Card(this);
    }

    public get footer() {
        return new Footer(this);
    }
}


// exports
export const homePage = new HomePage();

```



## License

MIT © [Nascent Digital](https://github.com/nascentdigital)
