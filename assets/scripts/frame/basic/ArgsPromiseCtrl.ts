/**
 * 有参数进程控制
 */
export default class ArgsPromiseCtrl<T> {

    public promise: Promise<T> = null as any;

    public constructor () {
        this.promise = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        })
    }

    private _resolve: any = null;

    public resolve (t: T) {
        this._resolve(t);
    }

    private _reject: any = null; 
 
    public reject (err: any) {
        this._reject(err);
    }
} 