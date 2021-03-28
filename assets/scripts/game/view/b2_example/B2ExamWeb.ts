import { b2Body, b2BodyDef, b2BodyType, b2DistanceJointDef, b2EdgeShape, b2PolygonShape, b2Vec2, b2World } from "../../../lib/box2d_ts/Box2D";
import ExamContext from "../ExamContext";

const B2ExamWeb = () => {
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

    {
        const shape = new b2PolygonShape();
        shape.SetAsBox(0.5, 0.5);

        const bd = new b2BodyDef();
        bd.type = b2BodyType.b2_dynamicBody;

        bd.position.Set(-5, 5);
        const body0 = m_world.CreateBody(bd);
        body0.CreateFixture(shape, 5);

        bd.position.Set(5, 5);
        const body1 = m_world.CreateBody(bd);
        body1.CreateFixture(shape, 5);

        bd.position.Set(5, 15);
        const body2 = m_world.CreateBody(bd);
        body2.CreateFixture(shape, 5);

        bd.position.Set(-5, 15);
        const body3 = m_world.CreateBody(bd);
        body3.CreateFixture(shape, 5);

        const jd = new b2DistanceJointDef();
        let p1: b2Vec2, p2: b2Vec2, d: b2Vec2;

        jd.frequencyHz = 2;
        jd.dampingRatio = 0;

        // g - 0
        jd.bodyA = ground;
        jd.bodyB = body0;
        jd.localAnchorA.Set(-10, 0);
        jd.localAnchorB.Set(-0.5, -0.5);
        p1 = jd.bodyA.GetWorldPoint(jd.localAnchorA, new b2Vec2());
        p2 = jd.bodyB.GetWorldPoint(jd.localAnchorB, new b2Vec2());
        d = b2Vec2.SubVV(p2, p1, new b2Vec2());
        jd.length = d.Length();
        m_world.CreateJoint(jd);

        // g - 1
        jd.bodyA = ground;
        jd.bodyB = body1;
        jd.localAnchorA.Set(10, 0);
        jd.localAnchorB.Set(0.5, -0.5);
        p1 = jd.bodyA.GetWorldPoint(jd.localAnchorA, new b2Vec2());
        p2 = jd.bodyB.GetWorldPoint(jd.localAnchorB, new b2Vec2());
        d = b2Vec2.SubVV(p2, p1, new b2Vec2());
        jd.length = d.Length();
        m_world.CreateJoint(jd);

        // g - 2
        jd.bodyA = ground;
        jd.bodyB = body2;
        jd.localAnchorA.Set(10, 20);
        jd.localAnchorB.Set(0.5, 0.5);
        p1 = jd.bodyA.GetWorldPoint(jd.localAnchorA, new b2Vec2());
        p2 = jd.bodyB.GetWorldPoint(jd.localAnchorB, new b2Vec2());
        d = b2Vec2.SubVV(p2, p1, new b2Vec2());
        jd.length = d.Length();
        m_world.CreateJoint(jd);

        // g - 3
        jd.bodyA = ground;
        jd.bodyB = body3;
        jd.localAnchorA.Set(-10, 20);
        jd.localAnchorB.Set(-0.5, 0.5);
        p1 = jd.bodyA.GetWorldPoint(jd.localAnchorA, new b2Vec2());
        p2 = jd.bodyB.GetWorldPoint(jd.localAnchorB, new b2Vec2());
        d = b2Vec2.SubVV(p2, p1, new b2Vec2());
        jd.length = d.Length();
        m_world.CreateJoint(jd);

        // 0 - 1
        jd.bodyA = body0;
        jd.bodyB = body1;
        jd.localAnchorA.Set(0.5, 0.5);
        jd.localAnchorB.Set(-0.5, 0.5);
        p1 = jd.bodyA.GetWorldPoint(jd.localAnchorA, new b2Vec2());
        p2 = jd.bodyB.GetWorldPoint(jd.localAnchorB, new b2Vec2());
        d = b2Vec2.SubVV(p2, p1, new b2Vec2());
        jd.length = d.Length();
        m_world.CreateJoint(jd);

        // 1 - 2
        jd.bodyA = body1;
        jd.bodyB = body2;
        jd.localAnchorA.Set(-0.5, 0.5);
        jd.localAnchorB.Set(-0.5, -0.5);
        p1 = jd.bodyA.GetWorldPoint(jd.localAnchorA, new b2Vec2());
        p2 = jd.bodyB.GetWorldPoint(jd.localAnchorB, new b2Vec2());
        d = b2Vec2.SubVV(p2, p1, new b2Vec2());
        jd.length = d.Length();
        m_world.CreateJoint(jd);

        // 2 - 3
        jd.bodyA = body2;
        jd.bodyB = body3;
        jd.localAnchorA.Set(-0.5, -0.5);
        jd.localAnchorB.Set(0.5, -0.5);
        p1 = jd.bodyA.GetWorldPoint(jd.localAnchorA, new b2Vec2());
        p2 = jd.bodyB.GetWorldPoint(jd.localAnchorB, new b2Vec2());
        d = b2Vec2.SubVV(p2, p1, new b2Vec2());
        jd.length = d.Length();
        m_world.CreateJoint(jd);

        // 3 - 0
        jd.bodyA = body3;
        jd.bodyB = body0;
        jd.localAnchorA.Set(0.5, -0.5);
        jd.localAnchorB.Set(0.5, 0.5);
        p1 = jd.bodyA.GetWorldPoint(jd.localAnchorA, new b2Vec2());
        p2 = jd.bodyB.GetWorldPoint(jd.localAnchorB, new b2Vec2());
        d = b2Vec2.SubVV(p2, p1, new b2Vec2());
        jd.length = d.Length();
        m_world.CreateJoint(jd);
    }

    return examContext;
}

export default B2ExamWeb;