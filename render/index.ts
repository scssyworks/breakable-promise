import { BreakablePromise } from "../src";

const breakablePromise = new BreakablePromise((resolve) => {
    resolve('Promise was success');
});

breakablePromise.then((result) => {
    console.log(result);
});