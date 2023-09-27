# Stencil Slot Issues

This repositories is meant to help debugging and testing Stencil bugs.

## Install

Clone the repository and install dependencies:

```sh
git clone git@github.com:christian-bromann/slotmachine.git
cd slotmachine
npm install
```

## Run Tests

You can run tests for specific issue numbers via:

```sh
npm run wdio -- --suite XXXX
# e.g. npm run wdio -- --suite 2997
```

By default all components and tests are run in shadow mode, with the following flag you can remove the shadow flag to have components rendered in scoped mode:

```sh
REMOVE_SHADOW_PROP=1 npm run wdio -- --suite XXXX
```

## Debug

To debug a certain test/component make sure to run tests with watch flag, e.g.

```sh
REMOVE_SHADOW_PROP=1 npm run wdio -- --suite XXXX --watch
```

and have a `await browser.debug()` in an after hook.