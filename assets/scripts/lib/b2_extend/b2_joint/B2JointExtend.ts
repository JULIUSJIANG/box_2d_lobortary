import { b2Joint, b2JointType, b2Vec2 } from "../../box2d_ts/Box2D";
import GraphicsDrawer from "../../graphics_drawer/GraphicsDrawer";
import RegistDefine from "../../regist_define/RegistDefine";
import b2EleSetting from "../B2EleSetting";
import B2JointContext from "./B2JointContext";
import B2JointRD from "./B2JointRD";
import B2JointRS from "./B2JointRS";

/**
 * 关节的拓展
 */
namespace b2JointExtend {

    /**
     * 默认的关节绘制器
     * @param joint 
     * @param dc 
     * @param gd 
     */
     export function DefJointDrawer (joint: b2Joint, dc: B2JointContext, gd: GraphicsDrawer) {
        gd.StraightLine(
            dc.x1.x,
            dc.x1.y,
            dc.p1.x,
            dc.p1.y,
            gd.Pixel(b2EleSetting.lineWidth),
            b2EleSetting.color.joint.areaBegin
        );
        gd.StraightLine(
            dc.p1.x,
            dc.p1.y, 
            dc.p2.x,
            dc.p2.y,
            gd.Pixel(b2EleSetting.lineWidth),
            b2EleSetting.color.joint.areaBegin
        );
        gd.StraightLine(
            dc.x2.x,
            dc.x2.y, 
            dc.p2.x,
            dc.p2.y,
            gd.Pixel(b2EleSetting.lineWidth),
            b2EleSetting.color.joint.areaEnd
        );
    }

    /**
     * 注册信息
     */
    export const rd = new RegistDefine<b2JointType, B2JointRS<b2Joint>, B2JointRS.Cont<b2Joint>>(
        B2JointRD,
        B2JointRS,
        (inst) => {
            return inst.type;
        }
    );

    /**
     * 绘制关节
     */
    export function DrawB2Joint (joint: b2Joint, gd: GraphicsDrawer) {
        if (joint == null) {
            return;
        };
        let bodyA = joint.GetBodyA();
        let bodyB = joint.GetBodyB();
        const xf1 = bodyA.m_xf;
        const xf2 = bodyB.m_xf;
        const x1 = xf1.p;
        const x2 = xf2.p;
        const p1 = joint.GetAnchorA(new b2Vec2());
        const p2 = joint.GetAnchorB(new b2Vec2());

        const dc: B2JointContext = {
            x1,
            x2,
            p1,
            p2
        };
        
        var regMsg = rd.GetRegMsg(joint.m_type);
        if (!regMsg) {
            DefJointDrawer(joint, dc, gd);
        }
        else {
            regMsg.drawer(joint, dc, gd);
        };
    }
};

window["b2JointExtend"] = b2JointExtend;
export default b2JointExtend;