
import FrameMsClock from "../../../frame/basic/FrameMsClock";
import MgrViewNoArgsViewBasic from "../../../frame/view/MgrViewNoArgsViewBasic";
const {ccclass, property} = cc._decorator;
import ViewRegistMsg from '../../../frame/view/ViewRegistMsg';
import b2Extend from "../../../lib/b2_extend/B2Extend";
import { b2BodyDef, b2BodyType, b2DrawFlags, b2Mat33, b2PolygonShape, b2RevoluteJointDef, b2Vec2, b2Vec3, b2World, b2_180_over_pi, b2_pi } from "../../../lib/box2d_ts/Box2D";
import Box2DDrawer from "../../component/Box2DDrawer";
const B2ExamTumber = () => {
    const b2grav = {
        x: 0,
        y: -1
    };
    const m_world = new b2World(b2grav);
    
    const ground = m_world.CreateBody(new b2BodyDef());

    const bd = new b2BodyDef();
    bd.type = b2BodyType.b2_dynamicBody;
    bd.allowSleep = false;
    bd.position.Set(0, 0);
    const body = m_world.CreateBody(bd);

    const shape = new b2PolygonShape();
    shape.SetAsBox(0.125, 10, new b2Vec2(10, 0), 0);
    body.CreateFixture(shape, 5);
    shape.SetAsBox(0.125, 10, new b2Vec2(-10, 0), 0);
    body.CreateFixture(shape, 5);
    shape.SetAsBox(10, 0.125, new b2Vec2(0, 10), 0);
    body.CreateFixture(shape, 5);
    shape.SetAsBox(10, 0.125, new b2Vec2(0, -10), 0);
    body.CreateFixture(shape, 5);

    const jd = new b2RevoluteJointDef();
    jd.bodyA = ground;
    jd.bodyB = body;
    jd.localAnchorA.Set(0, 0);
    jd.localAnchorB.Set(0,0);
    jd.referenceAngle = 0;
    jd.motorSpeed = 0.05 * b2_pi;
    jd.maxMotorTorque = 1e8;
    jd.enableMotor = true;

    const m_joint = m_world.CreateJoint(jd);

    for (let i = 0; i < 400; i++) {
        const bd = new b2BodyDef();
        bd.type = b2BodyType.b2_dynamicBody;
        bd.position.Set(0, 0);
        const body = m_world.CreateBody(bd);

        const shape = new b2PolygonShape();
        shape.SetAsBox(0.125, 0.125);
        body.CreateFixture(shape, 1.0);
    };

    return m_world;
}

export default B2ExamTumber;