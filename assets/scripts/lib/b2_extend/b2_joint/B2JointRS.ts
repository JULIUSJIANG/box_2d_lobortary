import { b2Joint, b2JointType } from "../../box2d_ts/Box2D";
import GraphicsDrawer from "../../graphics_drawer/GraphicsDrawer";
import RDClass from "../../regist_define/RDClass";
import B2JointContext from "./B2JointContext";

/**
 * 关节的注册信息
 */
class B2JointRS<T extends b2Joint> extends RDClass<B2JointRS.Cont<T>> {
    
}

namespace B2JointRS {
    /**
     * 注册信息的实质内容
     */
    export interface Cont<T extends b2Joint> {
        /**
         * 关节类型
         */
        type: b2JointType;
        /**
         * 具体的绘制方法
         */
        drawer: (joint: T, dc: B2JointContext, gd: GraphicsDrawer) => void
    }
}

export default B2JointRS;