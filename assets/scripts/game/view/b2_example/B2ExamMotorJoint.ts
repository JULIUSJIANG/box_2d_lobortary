import { b2Body, b2BodyDef, b2BodyType, b2EdgeShape, b2FixtureDef, b2MotorJoint, b2MotorJointDef, b2PolygonShape, b2Sin, b2Vec2, b2World } from "../../../lib/box2d_ts/Box2D";
import ExamContext from "../ExamContext";

const B2ExamMotorJoint = () => {
    const b2grav = {
        x: 0,
        y: -10
    };
    const m_world = new b2World(b2grav);

    let m_joint: b2MotorJoint;
    let ground: b2Body;
    {
        const bd = new b2BodyDef();
        ground = m_world.CreateBody(bd);

        const shape = new b2EdgeShape();
        shape.Set(new b2Vec2(-20, 0), new b2Vec2(20, 0));

        const fd = new b2FixtureDef();
        fd.shape = shape;

        ground.CreateFixture(fd);
    }

    {
        const bd = new b2BodyDef();
        bd.type = b2BodyType.b2_dynamicBody;
        bd.position.Set(0, 8);
        const body = m_world.CreateBody(bd);

        const shape = new b2PolygonShape();
        shape.SetAsBox(2, 5);

        const fd = new b2FixtureDef();
        fd.shape = shape;
        fd.friction = 0.6;
        fd.density = 2.0;
        body.CreateFixture(fd);

        const mjd = new b2MotorJointDef();
        mjd.Initialize(ground, body);
        mjd.maxForce = 1000;
        mjd.maxTorque = 1000;
        m_joint = m_world.CreateJoint(mjd);
    }

    let m_go = false;
    let ctx = new ExamContext(m_world);

    ctx.evterKeyDown.On(( key ) => {
        m_go = !m_go;
    });

    let m_time = 0;
    ctx.evterUpdate.On(( passedMs ) => {
        if (m_go) {
            m_time += 1 / 60;
        };

        const linearOffset = new b2Vec2();
        linearOffset.x = 6 * b2Sin(2 * m_time);
        linearOffset.y = 8 + 4 * b2Sin(m_time);

        const angularOffset = 4 * m_time;

        m_joint.SetLinearOffset(linearOffset);
        m_joint.SetAngularOffset(angularOffset);
    });

    return ctx;
}

export default B2ExamMotorJoint;