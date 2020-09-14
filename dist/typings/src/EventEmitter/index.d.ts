export declare class EventEmitter {
    events: {
        [type: string]: ((...args: any[]) => void)[];
    };
    listenerId: number;
    on<T = any>(eventType: string, cb: (...args: T[]) => void): EventEmitter;
    off<T = any>(eventType?: string, cb?: (...args: T[]) => void): EventEmitter;
    once<T = any>(eventType: string, cb: (...args: T[]) => void): EventEmitter;
    emit<T = any>(eventType: string, ...args: T[]): void;
}
//# sourceMappingURL=index.d.ts.map