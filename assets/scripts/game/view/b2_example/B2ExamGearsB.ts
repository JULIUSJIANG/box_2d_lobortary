import { b2Body, b2BodyDef, b2BodyType, b2CircleShape, b2EdgeShape, b2GearJointDef, b2PolygonShape, b2PrismaticJointDef, b2RevoluteJoint, b2RevoluteJointDef, b2Vec2, b2World } from "../../../lib/box2d_ts/Box2D";
import ExamContext from "../ExamContext";


const B2ExamGearsB = () => {
    const b2grav = {
        x: 0,
        y: -10
    };
    const m_world = new b2World(b2grav);

    let ground: b2Body;
    {
        const bd = new b2BodyDef();
        ground = m_world.CreateBody(bd);

        const shape = new b2EdgeShape();
        shape.Set(new b2Vec2(-50, 0), new b2Vec2(50, 0));
        ground.CreateFixture(shape, 0);
    }

    {
        const circle1 = new b2CircleShape();
        circle1.m_radius = 1;

        const circle2 = new b2CircleShape();
        circle2.m_radius = 2;

        const box = new b2PolygonShape();
        box.SetAsBox(0.5, 5);

        const bd1 = new b2BodyDef();
        bd1.type = b2BodyType.b2_dynamicBody;
        bd1.position.Set(-3, 12);
        const body1 = m_world.CreateBody(bd1);
        body1.CreateFixture(circle1, 5);

        const jd1 = new b2RevoluteJointDef();
        jd1.bodyA = ground;
        jd1.bodyB = body1;
        ground.GetLocalPoint(bd1.position, jd1.localAnchorA);
        body1.GetLocalPoint(bd1.position, jd1.localAnchorB);
        jd1.referenceAngle = body1.GetAngle() - ground.GetAngle();
        let m_joint1 = m_world.CreateJoint(jd1);

        const bd2 = new b2BodyDef();
        bd2.type = b2BodyType.b2_dynamicBody;
        bd2.position.Set(0, 12);
        const body2 = m_world.CreateBody(bd2);
        body2.CreateFixture(circle2, 5);

        const jd2 = new b2RevoluteJointDef();
        jd2.Initialize(ground, body2, bd2.position);
        let m_joint2 = m_world.CreateJoint(jd2);

        const bd3 = new b2BodyDef();
        bd3.type = b2BodyType.b2_dynamicBody;
        bd3.position.Set(2.5, 12);
        const body3 = m_world.CreateBody(bd3);
        body3.CreateFixture(box, 5);

        const jd3 = new b2PrismaticJointDef();
        jd3.Initialize(ground, body3, bd3.position, new b2Vec2(0, 1));
        jd3.lowerTranslation = -5;
        jd3.upperTranslation = 5;
        jd3.enableLimit = true;
        let m_joint3 = m_world.CreateJoint(jd3);

        const jd4 = new b2GearJointDef();
        jd4.bodyA = body1;
        jd4.bodyB = body2;
        jd4.joint1 = m_joint1;
        jd4.joint2 = m_joint2;
        jd4.ratio = circle2.m_radius / circle1.m_radius;
        let m_joint4 = m_world.CreateJoint(jd4);

        const jd5 = new b2GearJointDef();
        jd5.bodyA = body2;
        jd5.bodyB = body3;
        jd5.joint1 = m_joint2;
        jd5.joint2 = m_joint3;
        jd5.ratio = -1 / circle2.m_radius;
        let m_joint5 = m_world.CreateJoint(jd5);
    }

    return new ExamContext(m_world);
};

export default B2ExamGearsB;