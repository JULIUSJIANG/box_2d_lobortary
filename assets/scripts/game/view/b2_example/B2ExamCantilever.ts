import { b2Body, b2BodyDef, b2BodyType, b2EdgeShape, b2FixtureDef, b2PolygonShape, b2Vec2, b2WeldJointDef, b2World } from "../../../lib/box2d_ts/Box2D";
import ExamContext from "../ExamContext";

const B2ExamCantilever = () => {
    const b2grav = {
        x: 0,
        y: -10
    };
    const m_world = new b2World(b2grav);
    const examContext = new ExamContext(m_world);

    let ground: b2Body;
    {
        const bd = new b2BodyDef();
        ground = m_world.CreateBody(bd);

        const shape = new b2EdgeShape();
        shape.Set(new b2Vec2(-40, 0), new b2Vec2(40, 0));
        ground.CreateFixture(shape, 0);
    }

    let e_count = 8;
    {
        const shape = new b2PolygonShape();
        shape.SetAsBox(0.5, 0.125);

        const fd = new b2FixtureDef();
        fd.shape = shape;
        fd.density = 20;

        const jd = new b2WeldJointDef();
        let prevBody = ground;
        for (let i = 0; i < e_count; i++) {
            const bd = new b2BodyDef();
            bd.type = b2BodyType.b2_dynamicBody;
            bd.position.Set(-14.5 + 1 * i, 5);
            const body = m_world.CreateBody(bd);
            body.CreateFixture(fd);

            const anchor = new b2Vec2(-15 + 1 * i, 5);
            jd.Initialize(prevBody, body, anchor);
            m_world.CreateJoint(jd);

            prevBody = body;
        };
    }

    {
        const shape = new b2PolygonShape();
        shape.SetAsBox(1, 0.125);

        const fd = new b2FixtureDef();
        fd.shape = shape;
        fd.density = 20;

        const jd = new b2WeldJointDef();
        jd.frequencyHz = 5;
        jd.dampingRatio = 0.7;

        let prevBody = ground;
        for (let i = 0; i < 3; i++) {
            const bd = new b2BodyDef();
            bd.type = b2BodyType.b2_dynamicBody;
            bd.position.Set(-14 + 2 * i, 15);
            const body = m_world.CreateBody(bd);
            body.CreateFixture(fd);

            const anchor = new b2Vec2(-15 + 2 * i, 15);
            jd.Initialize(prevBody, body, anchor);
            m_world.CreateJoint(jd);

            prevBody = body;
        };
    }

    return examContext;
};

export default B2ExamCantilever;