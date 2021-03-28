import { b2Controller } from "../../box2d_ts/Box2D";
import GraphicsDrawer from "../../graphics_drawer/GraphicsDrawer";
import RegistDefine from "../../regist_define/RegistDefine";
import B2ControllerRD from "./B2ControllerRD";
import B2ControllerRS from "./B2ControllerRS";

namespace b2ControllerExtend {
    /**
     * 注册信息
     */
    export const rd = new RegistDefine<Function, B2ControllerRS<b2Controller>, B2ControllerRS.Cont<b2Controller>>(
        B2ControllerRD,
        B2ControllerRS,
        (inst) => {
            return inst.type;
        }
    );

    /**
     * 绘制约束
     * @param ctrl 
     * @param gd 
     */
    export function DrawController (ctrl: b2Controller, gd: GraphicsDrawer) {
        if (ctrl == null) {
            return;
        };
        var regMsg = rd.GetRegMsg(ctrl.constructor);
        if (regMsg) {
            regMsg.drawer(ctrl, gd);
        };
    }
}

window["b2ControllerExtend"] = b2ControllerExtend;
export default b2ControllerExtend;