import { b2World } from "../../box2d_ts/Box2D";
import GraphicsDrawer from "../../graphics_drawer/GraphicsDrawer";
import b2ElementRD from "./B2ElementRD";
import B2ElementRS from "./B2ElementRS";

b2ElementRD;
namespace b2ElementExtend {
    /**
     * 绘制世界
     * @param b2w 
     * @param gd 
     */
    export function DrawWorld (b2w: b2World, gd: GraphicsDrawer) {
        B2ElementRS.eleDrawFuncList.forEach(( func ) => {
            func(b2w, gd);
        });
    }
}

window["b2ElementExtend"] = b2ElementExtend;
export default b2ElementExtend;