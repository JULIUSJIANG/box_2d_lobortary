const { ccclass, property } = cc._decorator;
import MgrViewWithArgsRegistMsg from "../view/MgrViewWithArgsRegistMsg";
import MgrViewWithArgsViewBasic from "../view/MgrViewWithArgsViewBasic";

@ccclass
class ViewLoading extends MgrViewWithArgsViewBasic<Promise<any>[]> {
    public OnFillData (promiseList: Promise<any>[]) {
        
    }
}

export default ViewLoading; 