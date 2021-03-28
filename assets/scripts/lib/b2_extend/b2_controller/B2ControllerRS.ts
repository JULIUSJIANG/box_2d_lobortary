import { b2Controller } from "../../box2d_ts/Box2D";
import GraphicsDrawer from "../../graphics_drawer/GraphicsDrawer";
import RDClass from "../../regist_define/RDClass";

/**
 * 约束的注册信息
 */
class B2ControllerRS<T extends b2Controller> extends RDClass<B2ControllerRS.Cont<T>> {

}

namespace B2ControllerRS {
    export interface Cont<T extends b2Controller> {
        type: Function,
        drawer: (ctrl: T, gd: GraphicsDrawer) => void
    }
}

export default B2ControllerRS;