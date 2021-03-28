import { b2Body, b2BodyDef, b2BodyType, b2CircleShape, b2Contact, b2ContactImpulse, b2EdgeShape, b2Fixture, b2FixtureDef, b2Manifold, b2ParticleBodyContact, b2ParticleContact, b2ParticleSystem, b2Vec2, b2World } from "../../../lib/box2d_ts/Box2D";
import ExamContext from "../ExamContext";

const B2ExamSensorTest = () => {
    const e_count = 7;
    const b2grav = {
        x: 0,
        y: -10
    };
    const m_world = new b2World(b2grav);
    const examContext = new ExamContext(m_world);

    let m_bodies: b2Body[] = [];
    let m_touching: boolean[][] = [];
    for (let i = 0; i < e_count; i++) {
        m_touching[i] = [];
    };

    const bd = new b2BodyDef();
    const ground = m_world.CreateBody(bd);

    {
        const shape = new b2EdgeShape();
        shape.Set(new b2Vec2(-40, 0), new b2Vec2(40, 0));
        ground.CreateFixture(shape, 0);
    }

    let m_sensor: b2Fixture;
    {
        const shape = new b2CircleShape();
        shape.m_radius = 5;
        shape.m_p.Set(0, 10);

        const fd = new b2FixtureDef();
        fd.shape = shape;
        fd.isSensor = true;
        m_sensor = ground.CreateFixture(fd);
    }

    {
        const shape = new b2CircleShape();
        shape.m_radius = 1;

        for (let i = 0; i < e_count; i++) {
            bd.type = b2BodyType.b2_dynamicBody;
            bd.position.Set(-10 + 3 * i, 20);
            bd.userData = m_touching[i];

            m_touching[i][0] = false;
            m_bodies[i] = m_world.CreateBody(bd);

            m_bodies[i].CreateFixture(shape, 1);
        };
    }

    m_world.SetContactListener({
        BeginContact: (contact: b2Contact) => {
            const fixtureA = contact.GetFixtureA();
            const fixtureB = contact.GetFixtureB();

            if (fixtureA == m_sensor) {
                const userData = fixtureB.GetBody().GetUserData();
                if (userData) {
                    const touching = userData;
                    touching[0] = true;
                };
            };

            if (fixtureB == m_sensor) {
                const userData = fixtureA.GetBody().GetUserData();
                if (userData) {
                    const touching = userData;
                    touching[0] = true;
                };
            };
        },
        EndContact: (contact: b2Contact) => {
            const fixtureA = contact.GetFixtureA();
            const fixtureB = contact.GetFixtureB();

            if (fixtureA == m_sensor) {
                const userData = fixtureB.GetBody().GetUserData();
                if (userData) {
                    const touching = userData;
                    touching[0] = false;
                };
            };

            if (fixtureB == m_sensor) {
                const userData = fixtureA.GetBody().GetUserData();
                if (userData) {
                    const touching = userData;
                    touching[0] = false;
                };
            };
        },
        BeginContactFixtureParticle: (system: b2ParticleSystem, contact: b2ParticleBodyContact) => {

        },
        EndContactFixtureParticle: (system: b2ParticleSystem, contact: b2ParticleBodyContact) => {

        },
        BeginContactParticleParticle: (system: b2ParticleSystem, contact: b2ParticleContact) => {

        },
        EndContactParticleParticle: (system: b2ParticleSystem, contact: b2ParticleContact) => {

        },
        PreSolve: (contact: b2Contact, oldManifold: b2Manifold) => {

        },
        PostSolve: (contact: b2Contact, impulse: b2ContactImpulse) => {

        }
    });

    examContext.evterUpdate.On(() => {
        for (let i = 0; i < e_count; i++) {
            if (!m_touching[i][0]) {
                continue;
            };

            const body = m_bodies[i];
            const ground = m_sensor.GetBody();

            const circle = m_sensor.GetShape() as b2CircleShape;
            const center = ground.GetWorldPoint(circle.m_p, new b2Vec2());

            const position = body.GetPosition();

            const d = b2Vec2.SubVV(center, position, new b2Vec2());
            if (d.LengthSquared() < 1E-10) {
                continue;
            };

            d.Normalize();
            const f = b2Vec2.MulSV(100, d, new b2Vec2());
            body.ApplyForce(f, position);
        };
    });

    return examContext;
}

export default B2ExamSensorTest;