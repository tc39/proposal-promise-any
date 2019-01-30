# ECMAScript proposal: `Promise.any`

## Status

This proposal is at stage 0 of [the TC39 process](https://tc39.github.io/process-document/).

## Motivation

There are four main combinators in the `Promise` landscape.

- `Promise.all` (short-circuits when an input value is rejected) was added in ES2015 ✅
- `Promise.race` (short-circuits when an input value is settled) was added in ES2015 ✅
- `Promise.allSettled` (does not short-circuit) is an [active proposal](https://github.com/tc39/proposal-promise-allSettled) ✅
- `Promise.any` (short-circuits when an input value is fulfilled) is this proposal 🆕

These are all commonly available in userland promise libraries, and they’re all independently useful, each one serving different use cases.

## Proposed solution

`Promise.any` accepts an array of promises and returns a promise that is fulfilled by the first given promise to be fulfilled, or rejected with an array of rejection reasons if all of the given promises are rejected.

## High-level API

```js
try {
  const first = await Promise.any(promises);
  // Any of the promises was fulfilled.
} catch (reasons) {
  // All of the promises were rejected.
}
```

Or, without `async`/`await`:

```js
Promise.any(promises).then(
  (first) => {
    // Any of the promises was fulfilled.
  },
  (reasons) => {
    // All of the promises were rejected.
    // `reasons` is an array containing the rejection reasons.
  }
);
```

### FAQ

#### Why choose the name `any`?

It clearly describes what it does, and there’s precedent for the name `any` in userland libraries offering this functionality:

- https://github.com/kriskowal/q#combination
- http://bluebirdjs.com/docs/api/promise.any.html
- https://github.com/m0ppers/promise-any
- https://github.com/cujojs/when/blob/master/docs/api.md#whenany
- https://github.com/sindresorhus/p-any

## Illustrative examples

TODO

## TC39 meeting notes

- TODO

## Specification

- [Ecmarkup source](https://github.com/tc39/proposal-promise-any/blob/master/spec.html)
- [HTML version](https://tc39.github.io/proposal-promise-any/)

## Implementations

- none yet
