import AppCtrl from "./ApplyCtrl";

/**
 * 加法应用器
 */
export default class AddCtrl extends AppCtrl<number> {
    private _val: number = 0;

    public get val () {
        return this._val;
    }

    public constructor () {
        super();
        this.evntChanged.On(() => {
            this._val = 0;
            this.appRec.forEach(( appVal ) => {
                this._val += appVal;
            });
        });
    }
}