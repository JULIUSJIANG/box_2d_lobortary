import FrameMsClock from "../../frame/basic/FrameMsClock";
import MgrViewNoArgsViewBasic from "../../frame/view/MgrViewNoArgsViewBasic";
const {ccclass, property} = cc._decorator;
import ViewRegistMsg from '../../frame/view/ViewRegistMsg';
import { b2BodyDef, b2BodyType, b2DrawFlags, b2PolygonShape, b2RevoluteJointDef, b2Vec2, b2World, b2_180_over_pi, b2_pi } from "../../lib/box2d_ts/Box2D";
import Box2DDrawer from "../component/Box2DDrawer";

/**
 * 通常的战斗
 */
@ccclass
export default class ViewOrdinary extends MgrViewNoArgsViewBasic {
    
    public static registMsg: ViewRegistMsg<ViewOrdinary> = new ViewRegistMsg<ViewOrdinary>(`view_ordinary`, () => ViewOrdinary);

     public onLoad () {

        const b2grav = {
            x: 0,
            y: 1
        };
        const m_world = new b2World(b2grav);
        
        const ground = m_world.CreateBody(new b2BodyDef());

        const bd = new b2BodyDef();
        bd.type = b2BodyType.b2_dynamicBody;
        bd.allowSleep = false;
        bd.position.Set(0, 10);
        const body = m_world.CreateBody(bd);

        const shape = new b2PolygonShape();
        shape.SetAsBox(0.5, 10, new b2Vec2(10, 0), 0);
        body.CreateFixture(shape, 5);
        shape.SetAsBox(0.5, 10, new b2Vec2(-10, 0), 0);
        body.CreateFixture(shape, 5);
        shape.SetAsBox(10, 0.5, new b2Vec2(0, 10), 0);
        body.CreateFixture(shape, 5);
        shape.SetAsBox(10, 0.5, new b2Vec2(0, -10), 0);
        body.CreateFixture(shape, 5);

        const jd = new b2RevoluteJointDef();
        jd.bodyA = ground;
        jd.bodyB = body;
        jd.localAnchorA.Set(0, 10);
        jd.localAnchorB.Set(0,0);
        jd.referenceAngle = 0;
        jd.motorSpeed = 0.05 * b2_pi;
        jd.maxMotorTorque = b2_180_over_pi;
        jd.enableMotor = true;

        const m_joint = m_world.CreateJoint(jd);

        var frameMsClock = new FrameMsClock();
        frameMsClock.evntMsPassed.On((passedMs) => {
            m_world.Step(passedMs/1000, 5, 5, 5);
        });
        frameMsClock.Resume();
     }
}