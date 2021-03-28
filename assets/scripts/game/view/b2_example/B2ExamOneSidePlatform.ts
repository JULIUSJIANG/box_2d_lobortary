import { b2BodyDef, b2BodyType, b2CircleShape, b2Contact, b2ContactImpulse, b2EdgeShape, b2Fixture, b2Manifold, b2ParticleBodyContact, b2ParticleContact, b2ParticleSystem, b2PolygonShape, b2Vec2, b2World, b2_linearSlop } from "../../../lib/box2d_ts/Box2D";
import ExamContext from "../ExamContext";

const B2ExamOneSidePlatform = () => {
    const b2grav = {
        x: 0,
        y: -10
    };
    const m_world = new b2World(b2grav);

    // 地面
    {
        const bd = new b2BodyDef();
        const ground = m_world.CreateBody(bd);

        const shape = new b2EdgeShape();
        shape.Set(new b2Vec2(-40, 0), new b2Vec2(40, 0));
        ground.CreateFixture(shape, 0);
    }

    // 平台
    let m_platform: b2Fixture;
    let m_bottom = 10 - 0.5;
    let m_top = 10 + 0.5;
    {
        const bd = new b2BodyDef();
        bd.position.Set(0, 10);
        const body = m_world.CreateBody(bd);

        const shape = new b2PolygonShape();
        shape.SetAsBox(3, 0.5);
        m_platform = body.CreateFixture(shape, 0.8);
    }

    // 操纵物
    let m_radius = 0.5;
    let m_character: b2Fixture;
    {
        const bd = new b2BodyDef();
        bd.type = b2BodyType.b2_dynamicBody;
        bd.position.Set(0, 12);
        const body = m_world.CreateBody(bd);

        const shape = new b2CircleShape();
        shape.m_radius = m_radius;
        m_character = body.CreateFixture(shape, 20);

        body.SetLinearVelocity(new b2Vec2(0, -50));
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

            if (fixtureA != m_platform && fixtureA != m_character) {
                return;
            };

            if (fixtureB != m_platform && fixtureB != m_character) {
                return;
            };

            const position = m_character.GetBody().GetPosition();

            if (position.y < m_top + m_radius - 2 * b2_linearSlop) {
                contact.SetEnabled(false);
            };
        },
        PostSolve: (contact: b2Contact, impulse: b2ContactImpulse) => {

        }
    });

    return new ExamContext(m_world);
};

export default B2ExamOneSidePlatform;