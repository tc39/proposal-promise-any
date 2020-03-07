# ECMAScript proposal: `Promise.any`

**Author**: Mathias Bynens, Kevin Gibbons, Sergey Rubanov

**Champion**: Mathias Bynens

**Stage**: Stage 3 of [the TC39 process](https://tc39.github.io/process-document/).

## Motivation

There are [four main combinators in the `Promise` landscape](https://v8.dev/features/promise-combinators).

| name                 | description                                     |                    |
| -------------------- | ----------------------------------------------- | ------------------ |
| `Promise.allSettled` | does not short-circuit                          | added in ES2020 ✅ |
| `Promise.all`        | short-circuits when an input value is rejected  | added in ES2015 ✅ |
| `Promise.race`       | short-circuits when an input value is settled   | added in ES2015 ✅ |
| `Promise.any`        | short-circuits when an input value is fulfilled | this proposal 🆕   |

These are all commonly available in userland promise libraries, and they’re all independently useful, each one serving different use cases.

## Proposed solution

`Promise.any` accepts an iterable of promises and returns a promise that is fulfilled by the first given promise to be fulfilled, or rejected with an `AggregateError` holding the rejection reasons if all of the given promises are rejected.

## High-level API

```js
try {
  const first = await Promise.any(promises);
  // Any of the promises was fulfilled.
} catch (error) {
  // All of the promises were rejected.
}
```

Or, without `async`/`await`:

```js
Promise.any(promises).then(
  (first) => {
    // Any of the promises was fulfilled.
  },
  (error) => {
    // All of the promises were rejected.
  }
);
```

In the above examples, `error` is an `AggregateError`, a new `Error` subclass that groups together individual errors. Every `AggregateError` instance contains a pointer to an array of exceptions.

### FAQ

#### Why choose the name `any`?

It clearly describes what it does, and there’s precedent for the name `any` in userland libraries offering this functionality:

- https://github.com/kriskowal/q#combination
- http://bluebirdjs.com/docs/api/promise.any.html
- https://github.com/m0ppers/promise-any
- https://github.com/cujojs/when/blob/master/docs/api.md#whenany
- https://github.com/sindresorhus/p-any

#### Why throw an `AggregateError` instead of an array?

The prevailing practice within the ECMAScript language is to only throw exception types. Existing code in the ecosystem likely relies on the fact that currently, all exceptions thrown by built-in methods and syntax are `instanceof Error`. Adding a new language feature that can throw a plain array would break that invariant, and could be a web compatibility issue. Additionally, by using an `Error` instance (or a subclass), a stack trace can be provided — something that’s easy to discard if not needed, but impossible to obtain later if it is needed.

## Illustrative examples

This snippet checks which endpoint responds the fastest, and then logs it.

```js
Promise.any([
  fetch('https://v8.dev/').then(() => 'home'),
  fetch('https://v8.dev/blog').then(() => 'blog'),
  fetch('https://v8.dev/docs').then(() => 'docs')
]).then((first) => {
  // Any of the promises was fulfilled.
  console.log(first);
  // → 'home'
}).catch((error) => {
  // All of the promises were rejected.
  console.log(error);
});
```

## TC39 meeting notes

- [March 2019](https://github.com/tc39/notes/blob/master/meetings/2019-03/mar-27.md#promiseany)
- [June 2019](https://github.com/tc39/notes/blob/master/meetings/2019-06/june-5.md#promiseany)
- [July 2019](https://github.com/tc39/notes/blob/master/meetings/2019-07/july-24.md#promiseany)
- October 2019 [part one](https://github.com/tc39/notes/blob/master/meetings/2019-10/october-2.md#promiseany-for-stage-3) and [part two](https://github.com/tc39/notes/blob/master/meetings/2019-10/october-3.md#promiseany-reprise)

## Specification

- [Ecmarkup source](https://github.com/tc39/proposal-promise-any/blob/master/spec.html)
- [HTML version](https://tc39.github.io/proposal-promise-any/)

## Implementations

- JavaScript engines:
    - [SpiderMonkey](https://bugzilla.mozilla.org/show_bug.cgi?id=1568903)

- Polyfills:
    - [core-js](https://github.com/zloirock/core-js#promiseany)
    - [es-shims](https://github.com/es-shims/Promise.any)

- [TypeScript](https://github.com/microsoft/TypeScript/pull/33844)
