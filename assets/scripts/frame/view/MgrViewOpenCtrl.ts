import EmptyPromiseCtrl from "../basic/EmptyPromiseCtrl";
import MgrViewBasicCtrl from "./MgrViewBasicCtrl";
import MgrViewNoArgsViewBasic from "./MgrViewNoArgsViewBasic";

/**
 * 界面的开启控制器
 */
class MgrViewOpenCtrl<T extends MgrViewNoArgsViewBasic> extends MgrViewBasicCtrl {

    public promise: Promise<T> = null as any;

    constructor (promise: Promise<T>) {
        super();
        this.promise = promise;
    }
}

export default MgrViewOpenCtrl;