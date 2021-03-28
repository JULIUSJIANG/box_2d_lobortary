import { b2Body, b2BodyDef, b2BodyType, b2CircleShape, b2EdgeShape, b2PolygonShape, b2PulleyJoint, b2PulleyJointDef, b2Vec2, b2World } from "../../../lib/box2d_ts/Box2D";
import ExamContext from "../ExamContext";

const B2ExamPulleys = () => {
    const b2grav = {
        x: 0,
        y: -10
    };
    const m_world = new b2World(b2grav);
    const examContext = new ExamContext(m_world);

    const y = 5;
    const L = 5;
    const a = 1;
    const b = 2;

    let ground: b2Body;
    {
        const bd = new b2BodyDef();
        ground = m_world.CreateBody(bd);

        const edge = new b2EdgeShape();
        edge.Set(new b2Vec2(-40, 0), new b2Vec2(40, 0));
        ground.CreateFixture(edge, 0.0);

        const circle = new b2CircleShape();
        circle.m_radius = 2;
        
        circle.m_p.Set(-10, y + b + L);
        ground.CreateFixture(circle, 0);

        circle.m_p.Set(10, y + b + L);
        ground.CreateFixture(circle, 0);
    }

    let m_joint1: b2PulleyJoint;
    {
        const shape = new b2PolygonShape();
        shape.SetAsBox(a, b);

        const bd = new b2BodyDef();
        bd.type = b2BodyType.b2_dynamicBody;

        bd.position.Set(-10, y);
        const body1 = m_world.CreateBody(bd);
        body1.CreateFixture(shape, 5);

        bd.position.Set(10, y);
        const body2 = m_world.CreateBody(bd);
        body2.CreateFixture(shape, 5);

        const pulleyDef = new b2PulleyJointDef();
        const anchor1 = new b2Vec2(-10, y + b);
        const anchor2 = new b2Vec2(10, y + b);
        const groundAnchor1 = new b2Vec2(-10, y + b + L);
        const groundAnchor2 = new b2Vec2(10, y + b + L);
        pulleyDef.Initialize(body1, body2, groundAnchor1, groundAnchor2, anchor1, anchor2, 1.5);

        m_joint1 = m_world.CreateJoint(pulleyDef);
    }

    return examContext;
};

export default B2ExamPulleys;