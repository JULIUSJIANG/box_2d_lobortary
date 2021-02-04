/**
 * 无参数进程控制
 */
export default class EmptyPromiseCtrl {
    public promise: Promise<unknown>;

    private _isResolved: boolean;

    public get isResolved () {
        return this._isResolved;
    }

    private _isRejected: boolean;

    public get isRejected () {
        return this._isRejected;
    }

    public constructor () {
        this.promise = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
        this.promise.then(() => {
            this._isResolved = true;
        });
        this.promise.catch(() => {
            this._isRejected = true;
        });
    }

    private _resolve: any = null;

    public resolve () {
        this._resolve();
    }

    private _reject: any = null;

    public reject (err: any) {
        this._reject(err);
    }
}