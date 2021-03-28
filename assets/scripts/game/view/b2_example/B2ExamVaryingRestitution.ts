import { b2BodyDef, b2BodyType, b2CircleShape, b2EdgeShape, b2FixtureDef, b2Vec2, b2World } from "../../../lib/box2d_ts/Box2D";
import ExamContext from "../ExamContext";

const B2ExamVaryingRestitution = () => {
    const b2grav = {
        x: 0,
        y: -10
    };
    const m_world = new b2World(b2grav);
    const examContext = new ExamContext(m_world);

    {
        const bd = new b2BodyDef();
        const ground = m_world.CreateBody(bd);

        const shape = new b2EdgeShape();
        shape.Set(new b2Vec2(-40, 0), new b2Vec2(40, 0));
        ground.CreateFixture(shape, 0);
    }

    {
        const shape = new b2CircleShape();
        shape.m_radius = 1;

        const fd = new b2FixtureDef();
        fd.shape = shape;
        fd.density = 1;

        const restitution = [0, 0.1, 0.3, 0.5, 0.75, 0.9, 1];

        for (let i = 0; i < 7; i++) {
            const bd = new b2BodyDef();
            bd.type = b2BodyType.b2_dynamicBody;
            bd.position.Set(-10 + 3 * i, 20);

            const body = m_world.CreateBody(bd);

            fd.restitution = restitution[i];
            body.CreateFixture(fd);
        };
    }

    return examContext;
};

export default B2ExamVaryingRestitution;