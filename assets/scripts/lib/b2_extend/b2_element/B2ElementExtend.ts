import { b2World } from "../../box2d_ts/Box2D";
import GraphicsDrawer from "../../graphics_drawer/GraphicsDrawer";
import RegistDefine from "../../regist_define/RegistDefine";
import b2ElementRD from "./B2ElementRD";
import B2ElementRS from "./B2ElementRS";

b2ElementRD;
namespace b2ElementExtend {
    /**
     * 注册信息
     */
    export const rd = new RegistDefine<unknown, B2ElementRS<unknown>, B2ElementRS.Cont<unknown>>(
        b2ElementRD,
        B2ElementRS,
        (inst) => {
            return inst.drawAbleTag;
        }
    )

    /**
     * 绘制世界
     * @param b2w 
     * @param gd 
     */
    export function DrawWorld (b2w: b2World, gd: GraphicsDrawer, drawTag: number) {
        B2ElementRS.eleDrawFuncList.forEach(( func ) => {
            func(b2w, gd, drawTag);
        });
    }
}

window["b2ElementExtend"] = b2ElementExtend;
export default b2ElementExtend;