export const setImmediateFn = typeof setImmediate === 'function'
    ? setImmediate
    : function (cb: () => void): void {
        setTimeout(cb, 0);
    };

export const isCallable = (callable: (...args: any[]) => any): boolean => {
    return typeof callable === 'function';
};