import { b2Body, b2BodyDef, b2BodyType, b2CircleShape, b2DistanceJointDef, b2EdgeShape, b2FixtureDef, b2PolygonShape, b2RevoluteJoint, b2RevoluteJointDef, b2Vec2, b2Vec2_zero, b2World, b2_pi } from "../../../lib/box2d_ts/Box2D";
import ExamContext from "../ExamContext";

const B2ExamTheoJansen = () => {
    const b2grav = {
        x: 0,
        y: -10
    };
    const m_world = new b2World(b2grav);
    const examContext = new ExamContext(m_world);
    let m_offset = new b2Vec2();
    let m_wheel: b2Body;
    let m_chassis: b2Body;
    function CreateLeg (s: number, wheelAnchor: b2Vec2) {
        const p1 = new b2Vec2(5.4 * s, -6.1);
        const p2 = new b2Vec2(7.2 * s, -1.2);
        const p3 = new b2Vec2(4.3 * s, -1.9);
        const p4 = new b2Vec2(3.1 * s, 0.8);
        const p5 = new b2Vec2(6.0 * s, 1.5);
        const p6 = new b2Vec2(2.5 * s, 3.7);

        const fd1 = new b2FixtureDef();
        const fd2 = new b2FixtureDef();
        fd1.filter.groupIndex = -1;
        fd2.filter.groupIndex = -1;
        fd1.density = 1;
        fd2.density = 1;

        const poly1 = new b2PolygonShape();
        const poly2 = new b2PolygonShape();

        if (0 < s) {
            const vertices: b2Vec2[] = [];

            vertices[0] = p1;
            vertices[1] = p2;
            vertices[2] = p3;
            poly1.Set(vertices);

            vertices[0] = b2Vec2_zero;
            vertices[1] = b2Vec2.SubVV(p5, p4, new b2Vec2());
            vertices[2] = b2Vec2.SubVV(p6, p4, new b2Vec2());
            poly2.Set(vertices);
        }
        else {
            const vertices: b2Vec2[] = [];

            vertices[0] = p1;
            vertices[1] = p3;
            vertices[2] = p2;
            poly1.Set(vertices);

            vertices[0] = b2Vec2_zero;
            vertices[1] = b2Vec2.SubVV(p6, p4, new b2Vec2());
            vertices[2] = b2Vec2.SubVV(p5, p4, new b2Vec2());
            poly2.Set(vertices);
        };

        fd1.shape = poly1;
        fd2.shape = poly2;

        const bd1 = new b2BodyDef();
        const bd2 = new b2BodyDef();
        bd1.type = b2BodyType.b2_dynamicBody;
        bd2.type = b2BodyType.b2_dynamicBody;
        bd1.position.Copy(m_offset);
        bd2.position.Copy(b2Vec2.AddVV(p4, m_offset, new b2Vec2()));

        bd1.angularDamping = 10;
        bd2.angularDamping = 10;

        const body1 = m_world.CreateBody(bd1);
        const body2 = m_world.CreateBody(bd2);

        body1.CreateFixture(fd1);
        body2.CreateFixture(fd2);

        const djd = new b2DistanceJointDef();

        djd.dampingRatio = 0.5;
        djd.frequencyHz = 10;

        djd.Initialize(body1, body2, b2Vec2.AddVV(p2, m_offset, new b2Vec2()), b2Vec2.AddVV(p5, m_offset, new b2Vec2()));
        m_world.CreateJoint(djd);

        djd.Initialize(body1, body2, b2Vec2.AddVV(p3, m_offset, new b2Vec2()), b2Vec2.AddVV(p4, m_offset, new b2Vec2()));
        m_world.CreateJoint(djd);

        djd.Initialize(body1, m_wheel, b2Vec2.AddVV(p3, m_offset, new b2Vec2()), b2Vec2.AddVV(wheelAnchor, m_offset, new b2Vec2()));
        m_world.CreateJoint(djd);

        djd.Initialize(body2, m_wheel, b2Vec2.AddVV(p6, m_offset, new b2Vec2()), b2Vec2.AddVV(wheelAnchor, m_offset, new b2Vec2()));
        m_world.CreateJoint(djd);

        const rjd = new b2RevoluteJointDef();

        rjd.Initialize(body2, m_chassis, b2Vec2.AddVV(p4, m_offset, new b2Vec2()));
        m_world.CreateJoint(rjd);
    }

    m_offset.Set(0, 8);
    let m_motorSpeed = 2;
    let m_motorOn = true;
    const pivot = new b2Vec2(0, 0.8);

    // 地面
    {
        const bd = new b2BodyDef();
        const ground = m_world.CreateBody(bd);
        const shape = new b2EdgeShape();
        shape.Set(new b2Vec2(-50, 0), new b2Vec2(50, 0));
        ground.CreateFixture(shape, 0);

        shape.Set(new b2Vec2(-50, 0), new b2Vec2(-50, 10));
        ground.CreateFixture(shape, 0);

        shape.Set(new b2Vec2(50, 0), new b2Vec2(50, 10));
        ground.CreateFixture(shape, 0);
    }

    // 小球
    {
        for (let i = 0; i < 40; i++) {
            const shape = new b2CircleShape();
            shape.m_radius = 0.25;

            const bd = new b2BodyDef();
            bd.type = b2BodyType.b2_dynamicBody;
            bd.position.Set(-40 + 2 * i, 0.5);

            const body = m_world.CreateBody(bd);
            body.CreateFixture(shape, 1);
        };
    }

    // 机壳
    {
        const shape = new b2PolygonShape();
        shape.SetAsBox(2.5, 1);

        const sd = new b2FixtureDef();
        sd.density = 1;
        sd.shape = shape;
        sd.filter.groupIndex = -1;
        const bd = new b2BodyDef();
        bd.type = b2BodyType.b2_dynamicBody;
        bd.position.Copy(pivot).SelfAdd(m_offset);
        m_chassis = m_world.CreateBody(bd);
        m_chassis.CreateFixture(sd);
    }

    {
        const shape = new b2CircleShape();
        shape.m_radius = 1.6;

        const sd = new b2FixtureDef();
        sd.density = 1;
        sd.shape = shape;
        sd.filter.groupIndex = -1;
        const bd = new b2BodyDef();
        bd.type = b2BodyType.b2_dynamicBody;
        bd.position.Copy(pivot).SelfAdd(m_offset);
        m_wheel = m_world.CreateBody(bd);
        m_wheel.CreateFixture(sd);
    }

    let m_motorJoint: b2RevoluteJoint;
    {
        const jd = new b2RevoluteJointDef();
        jd.Initialize(m_wheel, m_chassis, b2Vec2.AddVV(pivot, m_offset, new b2Vec2()));
        jd.collideConnected = false;
        jd.motorSpeed = m_motorSpeed;
        jd.maxMotorTorque = 400;
        jd.enableMotor = m_motorOn;
        m_motorJoint = m_world.CreateJoint(jd);
    }

    const wheelAnchor = b2Vec2.AddVV(pivot, new b2Vec2(0, -0.8), new b2Vec2());

    CreateLeg(-1, wheelAnchor);
    CreateLeg(1, wheelAnchor);

    m_wheel.SetTransformVec(m_wheel.GetPosition(), 120 * b2_pi / 180);
    CreateLeg(-1, wheelAnchor);
    CreateLeg(1, wheelAnchor);

    m_wheel.SetTransformVec(m_wheel.GetPosition(), -120 * b2_pi / 180);
    CreateLeg(-1, wheelAnchor);
    CreateLeg(1, wheelAnchor);

    return examContext;
};

export default B2ExamTheoJansen;