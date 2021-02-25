import { b2BodyDef, b2BodyType, b2CircleShape, b2Color, b2Contact, b2ContactImpulse, b2Manifold, b2ParticleBodyContact, b2ParticleContact, b2ParticleFlag, b2ParticleGroupDef, b2ParticleSystem, b2ParticleSystemDef, b2PolygonShape, b2Vec2, b2World, b2WorldManifold } from "../../../lib/box2d_ts/Box2D";
import ExamContext from "../ExamContext";

const c_maxCircles = 3;

const B2ExamSparky = () => {
    const b2grav = {
        x: 0,
        y: -10
    };
    const m_world = new b2World(b2grav);

    {
        const bd = new b2BodyDef();
        const ground = m_world.CreateBody(bd);
        const ctx = new ExamContext(m_world);

        {
            const shape = new b2PolygonShape();
            const vertices = [
                new b2Vec2(-20, -15),
                new b2Vec2(20, -15),
                new b2Vec2(20, -14),
                new b2Vec2(-20, -14)
            ];
            shape.Set(vertices, 4);
            ground.CreateFixture(shape, 0);
        }
        {
            const shape = new b2PolygonShape();
            const vertices = [
                new b2Vec2(-20, 14),
                new b2Vec2(20, 14),
                new b2Vec2(20, 15),
                new b2Vec2(-20, 15)
            ];
            shape.Set(vertices, 4);
            ground.CreateFixture(shape, 0);
        }
        {
            const shape = new b2PolygonShape();
            const vertices = [
                new b2Vec2(-21, -15),
                new b2Vec2(-20, -15),
                new b2Vec2(-20, 15),
                new b2Vec2(-21, 15)
            ];
            shape.Set(vertices, 4);
            ground.CreateFixture(shape, 0);
        }
        {
            const shape = new b2PolygonShape();
            const vertices = [
                new b2Vec2(20, -15),
                new b2Vec2(21, -15),
                new b2Vec2(21, 15),
                new b2Vec2(20, 15)
            ];
            shape.Set(vertices, 4);
            ground.CreateFixture(shape, 0);
        }

        let particleSystemDef = new b2ParticleSystemDef();
        let m_particleSystem = m_world.CreateParticleSystem( particleSystemDef );
        m_particleSystem.SetRadius(0.25 * 2);

        for (let i = 0; i < c_maxCircles; i++) {
            const bd = new b2BodyDef();
            bd.type = b2BodyType.b2_dynamicBody;
            bd.position.Set(0,0);
            const body = m_world.CreateBody(bd);

            const shape = new b2CircleShape();
            shape.Set({x: 0, y: 0}, 2);
            const f = body.CreateFixture(shape, 0.5);

            f.SetUserData({
                spark: true
            });
        };

        let m_contactPoint = new b2Vec2();
        let m_contact = false;

        // 设置碰撞的监听
        m_world.SetContactListener({
            BeginContact: (contact: b2Contact) => {
                const userA = contact.GetFixtureA().GetUserData();
                const userB = contact.GetFixtureB().GetUserData();
                if (userA && userA.spark || userB && userB.spark) {
                    const worldManifold = new b2WorldManifold();
                    contact.GetWorldManifold(worldManifold);
                    m_contactPoint.Copy(worldManifold.points[0]);
                    m_contact = true;
                };
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

            },
            PostSolve: (contact: b2Contact, impulse: b2ContactImpulse) => {

            }
        });

        ctx.evterUpdate.On(() => {
            if (m_contact) {
                const shape = new b2CircleShape();
                shape.m_p.Copy(m_contactPoint);
                shape.m_radius = 1;
                const pd = new b2ParticleGroupDef();
                pd.flags = b2ParticleFlag.b2_powderParticle;
                pd.shape = shape;
                pd.color.Copy(new b2Color(1,1,1));
                let m_pg = m_particleSystem.CreateParticleGroup(pd);
                m_contact = false; 
            };
        });

        return ctx;
    }
}

export default B2ExamSparky;