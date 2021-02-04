import MgrViewBasicRegistMsg from "./MgrViewBasicRegistMsg";
import MgrViewNoArgsViewBasic from "./MgrViewNoArgsViewBasic";
import MgrViewWithArgsViewBasic from "./MgrViewWithArgsViewBasic";

class MgrViewWithArgsRegistMsg<T extends MgrViewWithArgsViewBasic<U>, U> extends MgrViewBasicRegistMsg<T> {
    
}

export default MgrViewWithArgsRegistMsg;