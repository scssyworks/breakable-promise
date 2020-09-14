export declare class Error<T = any> {
    _error: T | null;
    isCaught: boolean;
    constructor(err?: T | null);
    set error(e: T | null);
    get error(): T | null;
}
//# sourceMappingURL=index.d.ts.map