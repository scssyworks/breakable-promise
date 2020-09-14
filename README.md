# Breakable Promise

A "Promise" implementation that can be broken.

# Install

```sh
npm i breakable-promise
```

# How does it work?

Breakable Promise exposes the same API and works like a regular Promise (except that it can be broken).

```js
const promise = new BreakablePromise((resolve, reject, breakPromise) => {
    const timeoutVar = setTimeout(() => {
        if (Math.round(Math.random() * 1000) > 500) {
            resolve('Limit achieved');
        } else {
            reject('Limit not reached');
        }
    }, 3000);
    breakPromise(() => {
        clearTimeout(timeoutVar);
    });
});

promise
    .then((result) => console.log(result))
    .catch((error) => console.log(error));

const timerVar = Math.round(Math.random() * 10000);
if (timerVar < 3000) {
    promise.break()
        .then(() => {
            console.log('Promise was successfully broken');
        })
        .catch(() => {
            console.log('Promise can no longer be broken');
        });
}
```