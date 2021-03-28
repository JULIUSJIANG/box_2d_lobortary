import { b2BuoyancyController, b2Vec2 } from "../../box2d_ts/Box2D";
import b2EleSetting from "../B2EleSetting";
import B2ControllerRS from "./B2ControllerRS";

namespace B2ControllerRD {
    /**
     * 水面
     */
    export const buoyancy = new B2ControllerRS<b2BuoyancyController>({
        type: b2BuoyancyController,
        drawer: (ctrl, gd) => {
            const r = b2EleSetting.farLen;
            let normal = ctrl.normal.Clone();
            normal.Normalize();
            const p1 = new b2Vec2();
            const p2 = new b2Vec2();
            p1.x = normal.x * ctrl.offset + normal.y * r;
            p1.y = normal.y * ctrl.offset - normal.x * r;
            p2.x = normal.x * ctrl.offset - normal.y * r;
            p2.y = normal.y * ctrl.offset + normal.x * r;
            gd.StraightLine(
                p1.x, 
                p1.y, 
                p2.x, 
                p2.y, 
                gd.Pixel(b2EleSetting.lineWidth), 
                b2EleSetting.color.controller.b2BuoyancyController
            );
        }
    })
}

export default B2ControllerRD;