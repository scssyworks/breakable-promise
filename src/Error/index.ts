export class Error<T = any> {
    _error: T | null = null;
    isCaught = false;
    constructor(err?: T | null) {
        // eslint-disable-next-line
        if (err != null) {
            this.error = err;
        }
    }
    set error(e: T | null) {
        this._error = e;
    }
    get error(): T | null {
        this.isCaught = true;
        return this._error;
    }
}