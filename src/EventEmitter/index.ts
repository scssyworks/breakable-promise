import { setImmediateFn as setImmediate } from "../helpers";

export class EventEmitter {
    events = {} as { [type: string]: ((...args: any[]) => void)[] };
    listenerId = Math.round(Math.random() * 1000000000000);

    on<T = any>(eventType: string, cb: (...args: T[]) => void): EventEmitter {
        this.events[eventType] = this.events[eventType] || [];
        this.events[eventType].push(cb);
        return this;
    }

    off<T = any>(eventType?: string, cb?: (...args: T[]) => void): EventEmitter {
        if (typeof eventType !== 'string') {
            for (const currEventType in this.events) {
                this.events[currEventType].length = 0;
            }
        } else if (typeof cb !== 'function') {
            if (this.events[eventType]) {
                this.events[eventType].length = 0;
                delete this.events[eventType];
            }
        } else if (this.events[eventType]) {
            this.events[eventType].splice(this.events[eventType].indexOf(cb), 1);
            if (this.events[eventType].length === 0) {
                delete this.events[eventType];
            }
        }
        return this;
    }

    once<T = any>(eventType: string, cb: (...args: T[]) => void): EventEmitter {
        const tempCallback = (...args: T[]) => {
            cb.apply(this, args);
            setImmediate(() => {
                this.off(eventType, tempCallback);
            });
        };
        this.on(eventType, tempCallback);
        return this;
    }

    emit<T = any>(eventType: string, ...args: T[]): void {
        if (this.events[eventType]) {
            this.events[eventType].forEach(fn => {
                fn.apply(this, args);
            });
        }
    }
}