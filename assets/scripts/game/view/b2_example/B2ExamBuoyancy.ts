import { b2Body, b2BodyDef, b2BodyType, b2BuoyancyController, b2EdgeShape, b2FixtureDef, b2PolygonShape, b2Vec2, b2World } from "../../../lib/box2d_ts/Box2D";
import ExamContext from "../ExamContext";

const B2ExamBuoyancy = () => {
    const b2grav = {
        x: 0,
        y: -10
    };
    const m_world = new b2World(b2grav);
    const examContext = new ExamContext(m_world);

    const bc = new b2BuoyancyController();

    bc.normal.Set(0.7, 0.7);
    bc.offset = 10;
    bc.density = 2;
    bc.linearDrag = 5;
    bc.angularDrag = 2;

    const ground = m_world.CreateBody(new b2BodyDef());

    {
        const shape = new b2EdgeShape();
        shape.Set(new b2Vec2(-40, 0), new b2Vec2(40, 0));
        ground.CreateFixture(shape);
        shape.Set(new b2Vec2(-40, 0), new b2Vec2(-40, 25));
        ground.CreateFixture(shape, 0);
        shape.Set(new b2Vec2(40, 0), new b2Vec2(40, 25));
        ground.CreateFixture(shape, 0);
    }

    let m_bodies: b2Body[] = [];
    {
        for (let i = 0; i < 5; i++) {
            const bd = new b2BodyDef();
            bd.type = b2BodyType.b2_dynamicBody;
            bd.position.Set(Math.random() * 40 - 20, Math.random() * 15 + 5);
            bd.angle = Math.random() * Math.PI;
            const body = m_world.CreateBody(bd);

            const fd = new b2FixtureDef();
            fd.density = 1;
            fd.friction = 0.3;
            fd.restitution = 0.1;
            const polygon = new b2PolygonShape();
            fd.shape = polygon;
            polygon.SetAsBox(Math.random() * 0.5 + 1, Math.random() * 0.5 + 1);
            body.CreateFixture(fd);

            m_bodies.push(body);
        };
    }

    m_bodies.forEach(( body ) => {
        bc.AddBody(body);
    });

    m_world.AddController(bc);
    return examContext;
};

export default B2ExamBuoyancy;