import { b2Body, b2Shape, b2ShapeType } from "../../box2d_ts/Box2D";
import GraphicsDrawer from "../../graphics_drawer/GraphicsDrawer";
import RegistDefine from "../../regist_define/RegistDefine";
import B2ShapeRD from "./B2ShapeRD";
import B2ShapeRS from "./B2ShapeRS";

namespace b2ShapeExtend {

    export const rd = new RegistDefine<b2ShapeType, B2ShapeRS<b2Shape>, B2ShapeRS.Cont<b2Shape>>(
        B2ShapeRD,
        B2ShapeRS,
        (inst) => {
            return inst.type
        }
    );

    /**
     * 绘制形状
     * @param shape 
     * @param gd 
     */
    export function DrawShape (shape: b2Shape, body: b2Body, gd: GraphicsDrawer) {
        if (shape == null) {
            return;
        };
        let regMsg = rd.GetRegMsg(shape.m_type);
        if (regMsg) {
            regMsg.drawer(shape, body, gd);
        };
    }
}

window["b2ShapeExtend"] = b2ShapeExtend;
export default b2ShapeExtend;