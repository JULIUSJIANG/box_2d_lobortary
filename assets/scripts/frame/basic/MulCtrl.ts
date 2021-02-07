import AppCtrl from "./ApplyCtrl";

/**
 * 乘法应用器
 */
export default class MulCtrl extends AppCtrl<number> {

    private _val: number = 1;

    public get val () {
        return this._val;
    }

    public constructor () {
        super();
        this.evntChanged.On(() => {
            this._val = 1;
            this.appRec.forEach((appVal) => {
                this._val *= appVal;
            });
        });
    }
}