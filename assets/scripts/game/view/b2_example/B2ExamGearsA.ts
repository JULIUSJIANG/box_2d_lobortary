import { b2Body, b2BodyDef, b2BodyType, b2CircleShape, b2EdgeShape, b2GearJointDef, b2PolygonShape, b2PrismaticJointDef, b2RevoluteJoint, b2RevoluteJointDef, b2Vec2, b2World } from "../../../lib/box2d_ts/Box2D";
import ExamContext from "../ExamContext";


const B2ExamGearsA = () => {
    const b2grav = {
        x: 0,
        y: -10
    };
    const m_world = new b2World(b2grav);

    {
        const circle1 = new b2CircleShape();
        circle1.m_radius = 1;

        const box = new b2PolygonShape();
        box.SetAsBox(0.5, 5);

        const circle2 = new b2CircleShape();
        circle2.m_radius = 2;

        const bd1 = new b2BodyDef();
        bd1.type = b2BodyType.b2_staticBody;
        bd1.position.Set(10, 9);
        const body1 = m_world.CreateBody(bd1);
        body1.CreateFixture(circle1, 5);

        const bd2 = new b2BodyDef();
        bd2.type = b2BodyType.b2_dynamicBody;
        bd2.position.Set(10, 8);
        const body2 = m_world.CreateBody(bd2);
        body2.CreateFixture(box, 5);

        const bd3 = new b2BodyDef();
        bd3.type = b2BodyType.b2_dynamicBody;
        bd3.position.Set(10, 6);
        const body3 = m_world.CreateBody(bd3);
        body3.CreateFixture(circle2, 5);

        const jd1 = new b2RevoluteJointDef();
        jd1.Initialize(body2, body1, bd1.position);
        const joint1: b2RevoluteJoint = m_world.CreateJoint(jd1);

        const jd2 = new b2RevoluteJointDef();
        jd2.Initialize(body2, body3, bd3.position);
        const joint2: b2RevoluteJoint = m_world.CreateJoint(jd2);

        const jd4 = new b2GearJointDef();
        jd4.bodyA = body1;
        jd4.bodyB = body3;
        jd4.joint1 = joint1;
        jd4.joint2 = joint2;
        jd4.ratio = circle2.m_radius / circle1.m_radius;
        m_world.CreateJoint(jd4);
    }

    return new ExamContext(m_world);
};

export default B2ExamGearsA;