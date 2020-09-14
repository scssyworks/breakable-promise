import { setImmediateFn as setImmediate } from "./helpers";
import isPromise from 'is-promise';
import { EventEmitter } from "./EventEmitter";
import { Error } from "./Error";

enum PromiseStates {
    PENDING,
    FULFILLED,
    REJECTED,
    BROKEN
}

enum EventTypes {
    SUCCESS = 'promisesuccess',
    FAILED = 'promisefailed',
    BREAKABLE = 'promisebreak'
}

type VoidFn = () => void;

type CallBreak = null | void | VoidFn;

interface PromiseFunction<T> {
    (
        resolve: (input?: T | null) => void,
        reject: (error?: T | null) => void,
        breakPromise?: (fn?: CallBreak) => void
    ): void;
}

interface Thenable<T> {
    (result?: T | null): (T | any | BreakablePromise<T | any> | Promise<T | any>);
}

type PromiseLike<T> = Promise<T> | BreakablePromise<T>;

export class BreakablePromise<T> {
    #state: number;
    #isBreakable = false;
    #callBreak: CallBreak = null;
    #data: T | null | undefined;
    #error: Error<T>;
    #emitter: EventEmitter;
    constructor(fn: PromiseFunction<T>) {
        this.#state = PromiseStates.PENDING;
        this.#data = null;
        this.#error = new Error<T>();
        this.#emitter = new EventEmitter();
        try {
            fn.call(
                this,
                (data?: T | null) => {
                    setImmediate(() => {
                        if (!this.isBroken()) {
                            this.#data = data;
                            this.#state = PromiseStates.FULFILLED;
                            this.#emitter.emit<T>(EventTypes.SUCCESS);
                            this.#emitter.off(EventTypes.BREAKABLE);
                        }
                    });
                },
                (error?: T | null) => {
                    setImmediate(() => {
                        if (!this.isBroken()) {
                            this.#error = new Error<T>(error);
                            this.#state = PromiseStates.REJECTED;
                            this.#emitter.emit<T>(EventTypes.FAILED);
                            this.#emitter.off(EventTypes.BREAKABLE);
                        }
                    });
                },
                (cb: CallBreak) => {
                    if (typeof cb === 'function') {
                        this.#isBreakable = true;
                        this.#callBreak = cb;
                        this.#emitter.emit<VoidFn>(EventTypes.BREAKABLE, this.#callBreak);
                    } else {
                        this.#emitter.off(EventTypes.BREAKABLE);
                    }
                }
            );
        } catch (error) {
            this.#state = PromiseStates.REJECTED;
            this.#error = new Error<T>(error);
        }
    }

    #isFullfilled = (): boolean => {
        return this.#state === PromiseStates.FULFILLED;
    }

    #isPending = (): boolean => {
        return this.#state === PromiseStates.PENDING;
    }

    #checkState = (
        resolve: (result: any) => void,
        reject: (error: any) => void,
        fn?: Thenable<T>,
    ): void => {
        if (!this.isBroken()) {
            let result: any;
            if (typeof fn === 'function') {
                result = fn(this.#isFullfilled() ? this.#data : this.#error.error);
            }
            if (isPromise(result)) {
                (result as PromiseLike<T>).then(resolve, reject);
                if (!this.#isFullfilled()) {
                    (result as PromiseLike<T>).catch(reject);
                }
            } else if (this.#isFullfilled()) {
                resolve(result);
            } else {
                reject(typeof result !== 'undefined' ? result : this.#error._error);
            }
        }
    };

    #callThen = (
        resolveFn: Thenable<T>,
        rejectFn?: Thenable<T>,
        breakFn?: () => void
    ): BreakablePromise<T | any> => {
        return new BreakablePromise((resolve, reject, breakPromise) => {
            if (!this.#isPending()) {
                this.#checkState(resolve, reject, this.#isFullfilled() ? resolveFn : rejectFn);
            } else {
                const isSuccess = () => {
                    this.#checkState(resolve, reject, resolveFn);
                };
                this.#emitter
                    .once(EventTypes.SUCCESS, isSuccess)
                    .once(EventTypes.FAILED, () => {
                        this.#emitter.off(EventTypes.SUCCESS, isSuccess);
                        this.#checkState(resolve, reject, rejectFn);
                    });
            }
            if (typeof breakPromise === 'function') {
                breakPromise(breakFn);
            }
        });
    }

    #callCatch = (
        cb: Thenable<T>,
        breakFn?: () => void
    ): BreakablePromise<T | any> => {
        return new BreakablePromise((resolve, reject, breakPromise) => {
            if (!this.#isPending() && !this.#isFullfilled()) {
                this.#checkState(resolve, reject, cb);
            } else {
                this.#emitter.once(EventTypes.FAILED, () => {
                    this.#checkState(resolve, reject, cb);
                });
            }
            if (typeof breakPromise === 'function') {
                breakPromise(breakFn);
            }
        });
    };

    then(
        resolveFn: Thenable<T>,
        rejectFn?: Thenable<T>,
        breakFn?: () => void
    ): BreakablePromise<T | any> {
        return this.#callThen(resolveFn, rejectFn, breakFn);
    }

    catch(
        rejectFn: Thenable<T>,
        breakFn?: () => void
    ): BreakablePromise<T | any> {
        return this.#callCatch(rejectFn, breakFn);
    }

    break(): BreakablePromise<any> {
        return new BreakablePromise((resolve, reject) => {
            if (this.#isBreakable) {
                if (typeof this.#callBreak === 'function') {
                    this.#callBreak();
                    resolve();
                } else {
                    this.#emitter.once<VoidFn>(EventTypes.BREAKABLE, (callBreak) => {
                        callBreak();
                        resolve();
                    });
                }
            } else {
                reject();
            }
        });
    }

    isBroken(): boolean {
        return this.#state === PromiseStates.BROKEN;
    }

    static resolve<U = any>(data: U): BreakablePromise<U> {
        return new BreakablePromise<U>((resolve) => {
            resolve(data);
        });
    }

    static reject<U = any>(error: U): BreakablePromise<U> {
        return new BreakablePromise<U>((_, reject) => {
            reject(error);
        });
    }

    static all<U>(promises: (Promise<U> | BreakablePromise<U>)[], breakFn?: () => void): BreakablePromise<U> {
        return new BreakablePromise<any>((resolve, reject, breakPromise) => {
            try {
                const allPromises = [...promises];
                const results: any[] = [];
                for (const promise of allPromises) {
                    promise.then((result: any) => {
                        results.push(result);
                    }).catch((error: any) => {
                        throw new Error(error);
                    });
                }
                resolve(results);
                if (typeof breakPromise === 'function') {
                    breakPromise(breakFn);
                }
            } catch (e) {
                reject(e.message);
            }
        });
    }
}