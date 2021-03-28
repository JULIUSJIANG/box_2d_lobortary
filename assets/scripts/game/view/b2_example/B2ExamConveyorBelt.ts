import { b2Body, b2BodyDef, b2BodyType, b2Contact, b2ContactImpulse, b2EdgeShape, b2Fixture, b2FixtureDef, b2Manifold, b2ParticleBodyContact, b2ParticleContact, b2ParticleSystem, b2PolygonShape, b2Vec2, b2World, b2WorldManifold } from "../../../lib/box2d_ts/Box2D";
import ExamContext from "../ExamContext";

const B2ExamConveyorBelt = () => {
    const b2grav = {
        x: 0,
        y: -10
    };
    const m_world = new b2World(b2grav);

    let m_platform: b2Fixture;
    {
        const bd = new b2BodyDef();
        const ground = m_world.CreateBody(bd);

        const shape = new b2EdgeShape();
        shape.Set(new b2Vec2(-20, 0), new b2Vec2(20, 0));
        ground.CreateFixture(shape, 0);
    }

    {
        const bd = new b2BodyDef();
        bd.position.Set(-5, 5);
        const body = m_world.CreateBody(bd);

        const shape = new b2PolygonShape();
        shape.SetAsBox(10, 0.5);

        const fd = new b2FixtureDef();
        fd.shape = shape;
        fd.friction = 0.8;
        m_platform = body.CreateFixture(fd);
    }

    {
        for (let i = 0; i < 5; i++) {
            const bd = new b2BodyDef();
            bd.type = b2BodyType.b2_dynamicBody;
            bd.position.Set(-10 + 2 * i, 7);

            const body = m_world.CreateBody(bd);

            const shape = new b2PolygonShape();
            shape.SetAsBox(0.5, 0.5);
            body.CreateFixture(shape, 20);
        };
    }

    // 设置碰撞的监听
    m_world.SetContactListener({
        BeginContact: (contact: b2Contact) => {

        },
        EndContact: (contact: b2Contact) => {

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
            const fixtureA = contact.GetFixtureA();
            const fixtureB = contact.GetFixtureB();

            if (fixtureA == m_platform) {
                contact.SetTangentSpeed(5);
            };

            if (fixtureB == m_platform) {
                contact.SetTangentSpeed(-5);
            };
        },
        PostSolve: (contact: b2Contact, impulse: b2ContactImpulse) => {

        }
    });

    return new ExamContext(m_world);
};

export default B2ExamConveyorBelt;