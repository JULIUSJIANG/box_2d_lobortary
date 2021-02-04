import MgrViewNoArgsViewBasic from "./MgrViewNoArgsViewBasic";

class MgrViewWithArgsViewBasic<T> extends MgrViewNoArgsViewBasic {

    protected initData: T;

    public OnFillData (data: T) {
        this.initData = data;
        this.onDataInited();
    }

    public onDataInited () {

    }
}

export default MgrViewWithArgsViewBasic;