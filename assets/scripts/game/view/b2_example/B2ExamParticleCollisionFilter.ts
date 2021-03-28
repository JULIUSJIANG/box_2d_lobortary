import { b2BodyDef, b2ChainShape, b2ContactFilter, b2FixtureDef, b2ParticleFlag, b2ParticleGroup, b2ParticleGroupDef, b2ParticleSystemDef, b2PolygonShape, b2Vec2, b2World } from "../../../lib/box2d_ts/Box2D";
import ExamContext from "../ExamContext";

class ParticleContactDIsabler extends b2ContactFilter {
    public m_enableFixtureParticleCollisions = true;
    public m_enableParticleParticleCollisions = true;

    public ShouldCollideFixtureParticle() {
        return this.m_enableFixtureParticleCollisions;
    }

    public ShouldCollideParticleParticle() {
        return this.m_enableParticleParticleCollisions;
    }
}

const B2ExamParticleCollisionFilter = () => {
    const b2grav = {
        x: 0,
        y: 0
    };
    const m_world = new b2World(b2grav);
    const examContext = new ExamContext(m_world);

    let m_contactDisabler = new ParticleContactDIsabler();
    m_world.SetContactFilter(m_contactDisabler);

    let kBoxSize = 10;
    let kOffset = 0;
    // 创建容器
    {
        const bd = new b2BodyDef();
        const ground = m_world.CreateBody(bd);
        const shape = new b2ChainShape();
        const vertices = [
            new b2Vec2(-kBoxSize, -kBoxSize + kOffset),
            new b2Vec2(kBoxSize, -kBoxSize + kOffset),
            new b2Vec2(kBoxSize, kBoxSize + kOffset),
            new b2Vec2(-kBoxSize, kBoxSize + kOffset)
        ];
        shape.CreateLoop(vertices);
        const def = new b2FixtureDef();
        def.shape = shape;
        def.density = 0;
        def.density = 0;
        def.restitution = 1;
        ground.CreateFixture(def);
    }

    let kBoxSizeHalf = kBoxSize / 2;
    let kSpeedup = 8;
    let m_particleSystem = m_world.CreateParticleSystem(new b2ParticleSystemDef());
    let m_particleGroup: b2ParticleGroup;
    m_particleSystem.SetRadius(0.5);
    {
        const shape = new b2PolygonShape();
        shape.SetAsBox(1.5, 1.5, new b2Vec2(kBoxSizeHalf, kBoxSizeHalf + kOffset), 0);
        const pd = new b2ParticleGroupDef();
        pd.shape = shape;

        pd.flags = b2ParticleFlag.b2_powderParticle
            | b2ParticleFlag.b2_particleContactFilterParticle
            | b2ParticleFlag.b2_fixtureContactFilterParticle;
        
        m_particleGroup = m_particleSystem.CreateParticleGroup(pd);

        const velocities = m_particleSystem.GetVelocityBuffer();
        const index = m_particleGroup.GetBufferIndex();

        for (let i = 0; i < m_particleGroup.GetParticleCount(); i++) {
            const v = velocities[index + i];
            v.Set(Math.random() * 2 -1, Math.random() * 2 -1);
            v.SelfNormalize();
            v.SelfMul(kSpeedup);
        };
    }

    examContext.evterUpdate.On(() => {
        const index = m_particleGroup.GetBufferIndex();
        const velocities = m_particleSystem.GetVelocityBuffer();
        for (let i = 0; i < m_particleGroup.GetParticleCount(); i++) {
            const v = velocities[index + i];
            v.SelfNormalize();
            v.SelfMul(kSpeedup);
        };
    });

    examContext.evterKeyDown.On(( key ) => {
        switch (key.toLowerCase()) {
            case `a`: {
                m_contactDisabler.m_enableFixtureParticleCollisions = !m_contactDisabler.m_enableFixtureParticleCollisions;
                break;
            };
            case `s`: {
                m_contactDisabler.m_enableParticleParticleCollisions = !m_contactDisabler.m_enableParticleParticleCollisions;
                break;
            };
        };
    });

    return examContext;
};

export default B2ExamParticleCollisionFilter;