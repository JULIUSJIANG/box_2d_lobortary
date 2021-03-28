import { b2DistanceJoint, b2Joint, b2JointType, b2MouseJoint, b2PulleyJoint, b2Vec2 } from "../../box2d_ts/Box2D";
import GraphicsDrawer from "../../graphics_drawer/GraphicsDrawer";
import RegistDefine from "../../regist_define/RegistDefine";
import b2EleSetting from "../B2EleSetting";
import B2JointContext from "./B2JointContext";
import B2JointRS from "./B2JointRS";

namespace B2JointRD {
    /**
     * 距离
     */
    export const distance = new B2JointRS<b2DistanceJoint>({
        type: b2JointType.e_distanceJoint,
        drawer: (joint, dc, gd) => {
            gd.StraightLine(
                dc.p1.x, 
                dc.p1.y, 
                dc.p2.x, 
                dc.p2.y, 
                gd.Pixel(b2EleSetting.lineWidth),
                b2EleSetting.color.joint.areaBegin
            );
        }
    });

    /**
     * 滑轮
     */
    export const pulley = new B2JointRS<b2PulleyJoint>({
        type: b2JointType.e_pulleyJoint,
        drawer: (joint, dc, gd) => {
            const s1 = joint.GetGroundAnchorA();
            const s2 = joint.GetGroundAnchorB();
            gd.StraightLine(
                s1.x,
                s1.y,
                dc.p1.x,
                dc.p1.y,
                gd.Pixel(b2EleSetting.lineWidth),
                b2EleSetting.color.joint.areaBegin
            );
            gd.StraightLine(
                s2.x,
                s2.y,
                dc.p2.x,
                dc.p2.y,
                gd.Pixel(b2EleSetting.lineWidth),
                b2EleSetting.color.joint.areaBegin
            );
            gd.StraightLine(
                s1.x,
                s1.y,
                s2.x,
                s2.y,
                gd.Pixel(b2EleSetting.lineWidth),
                b2EleSetting.color.joint.areaEnd
            );
        }
    });

    /**
     * 拖拽
     */
    export const mouse = new B2JointRS<b2MouseJoint>({
        type: b2JointType.e_mouseJoint,
        drawer: (joint, dc, gd) => {
            gd.RoundFill(
                dc.p1.x,
                dc.p1.y,
                gd.Pixel(b2EleSetting.dotRadius),
                b2EleSetting.color.joint.dot
            );
            gd.RoundFill(
                dc.p2.x,
                dc.p2.y,
                gd.Pixel(b2EleSetting.dotRadius),
                b2EleSetting.color.joint.dot
            );
            gd.StraightLine(
                dc.p1.x,
                dc.p1.y,
                dc.p2.x,
                dc.p2.y,
                gd.Pixel(b2EleSetting.dotRadius),
                b2EleSetting.color.joint.areaBegin
            );
        }
    });
}

export default B2JointRD;