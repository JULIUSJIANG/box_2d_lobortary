import MgrCfg from './config/MgrCfg';

import MgrRes from "./res/MgrRes";
import MgrView from "./view/MgrView";
import MgrViewInitData from "./view/MgrViewInitData";


namespace jiang {
    /**
     * 资源管理器
     */
    export const mgrRes = MgrRes.inst;

    /**
     * 视图管理器
     */
    export const mgrView = MgrView.inst;

    /**
     * 配置管理器
     */
    export const mgrCfg = MgrCfg.inst;

    /**
     * 初始化
     */
    export const Init = (uiContainer: cc.Node) => {
        
        mgrRes.Init();

        mgrView.Init
        (
            new MgrViewInitData(uiContainer)
        );

        return Promise.all(mgrCfg.Init());
    }
}

window["jiang"] = jiang;
export default jiang;
declare const window: any;