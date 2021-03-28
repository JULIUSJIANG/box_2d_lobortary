import { b2Body, b2Shape, b2ShapeType } from "../../box2d_ts/Box2D";
import GraphicsDrawer from "../../graphics_drawer/GraphicsDrawer";
import RDClass from "../../regist_define/RDClass";

/**
 * 形状的注册信息
 */
class B2ShapeRS<T extends b2Shape> extends RDClass<B2ShapeRS.Cont<T>> {

}

namespace B2ShapeRS {
    /**
     * 注册的实质内容
     */
    export class Cont<T extends b2Shape> {
        /**
         * 形状的类型
         */
        type: b2ShapeType;
        /**
         * 具体的绘制方法
         */
        drawer: (shape: T, body: b2Body, gd: GraphicsDrawer) => void
    }
}

export default B2ShapeRS;