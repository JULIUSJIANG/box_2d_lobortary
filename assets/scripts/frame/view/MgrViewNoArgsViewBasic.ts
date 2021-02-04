import MgrViewOpenCtrl from "./MgrViewOpenCtrl";

class MgrViewNoArgsViewBasic extends cc.Component {
    protected ctrl: MgrViewOpenCtrl<MgrViewNoArgsViewBasic>;

    public SetInitData (ctrl: MgrViewOpenCtrl<MgrViewNoArgsViewBasic>) {
        this.ctrl = ctrl;
    }

    public Close () {
        this.ctrl.ctrlClear.resolve();
    }
}

export default MgrViewNoArgsViewBasic;