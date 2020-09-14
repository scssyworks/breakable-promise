declare type VoidFn = () => void;
declare type CallBreak = null | void | VoidFn;
interface PromiseFunction<T> {
    (resolve: (input?: T | null) => void, reject: (error?: T | null) => void, breakPromise?: (fn?: CallBreak) => void): void;
}
interface Thenable<T> {
    (result?: T | null): (T | any | BreakablePromise<T | any> | Promise<T | any>);
}
export declare class BreakablePromise<T> {
    #private;
    constructor(fn: PromiseFunction<T>);
    then(resolveFn: Thenable<T>, rejectFn?: Thenable<T>, breakFn?: () => void): BreakablePromise<T | any>;
    catch(rejectFn: Thenable<T>, breakFn?: () => void): BreakablePromise<T | any>;
    break(): BreakablePromise<any>;
    isBroken(): boolean;
    static resolve<U = any>(data: U): BreakablePromise<U>;
    static reject<U = any>(error: U): BreakablePromise<U>;
    static all<U>(promises: (Promise<U> | BreakablePromise<U>)[], breakFn?: () => void): BreakablePromise<U>;
}
export {};
//# sourceMappingURL=index.d.ts.map