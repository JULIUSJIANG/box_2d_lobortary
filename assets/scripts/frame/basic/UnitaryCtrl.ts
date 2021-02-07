export default class UnitaryCtrl <T> {

    private _val: T = null as any;

    public get val () {
        return this._val;
    }

    public Apply (t: T) {
        // 去除重复的赋值
        if (t == this._val) {
            return;
        };

        this._val = t;

        this.OnChange();
        this._callBackList.forEach(( callback ) => {
            callback();
        });
    }

    private _callBackList: Function[] = [];

    public ListenChange (callback: Function) {
        this._callBackList.push( callback );
    }

    protected OnChange () {

    }
}