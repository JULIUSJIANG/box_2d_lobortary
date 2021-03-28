import { b2Body, b2BodyDef, b2BodyType, b2ParticleFlag, b2ParticleGroupDef, b2ParticleSystemDef, b2PolygonShape, b2RevoluteJoint, b2RevoluteJointDef, b2Vec2, b2World, b2_pi } from "../../../lib/box2d_ts/Box2D";
import ExamContext from "../ExamContext";

const B2ExamWaveMachine = () => {
    const b2grav = {
        x: 0,
        y: -30
    };
    const m_world = new b2World(b2grav);
    const ctx = new ExamContext(m_world);

    let ground: b2Body;
    {
        const bd = new b2BodyDef();
        ground = m_world.CreateBody(bd);
    }

    let m_joint: b2RevoluteJoint;
    {
        const bd = new b2BodyDef();
        bd.type = b2BodyType.b2_dynamicBody;
        bd.allowSleep = false;
        bd.position.Set(0, 1);
        const body = m_world.CreateBody(bd);

        const shape = new b2PolygonShape();
        shape.SetAsBox(0.05, 5, new b2Vec2(10, 0), 0);
        body.CreateFixture(shape, 5);
        shape.SetAsBox(0.05, 5, new b2Vec2(-10, 0), 0);
        body.CreateFixture(shape, 5);
        shape.SetAsBox(10, 0.05, new b2Vec2(0, 5), 0);
        body.CreateFixture(shape, 5);
        shape.SetAsBox(10, 0.05, new b2Vec2(0,-5), 0);
        body.CreateFixture(shape, 5);

        const jd = new b2RevoluteJointDef();
        jd.bodyA = ground;
        jd.bodyB = body;
        jd.localAnchorA.Set(0,0);
        jd.localAnchorB.Set(0,0);
        jd.referenceAngle = 0.0;
        jd.motorSpeed = 0.05 * b2_pi;
        jd.maxMotorTorque = 1e7;
        jd.enableMotor = true;
        m_joint = m_world.CreateJoint(jd);
    }

    let m_particleSystemDef = new b2ParticleSystemDef();
    let m_particleSystem = m_world.CreateParticleSystem( m_particleSystemDef );

    m_particleSystem.SetRadius(0.5);
    m_particleSystem.SetDamping(2);

    {
        const pd = new b2ParticleGroupDef();
        pd.flags = b2ParticleFlag.b2_colorMixingParticle;

        const shape = new b2PolygonShape();
        shape.SetAsBox(10, 2, new b2Vec2(0 , 1), 0);

        pd.shape = shape;
        m_particleSystem.CreateParticleGroup(pd);
    }

    let m_time = 0;
    ctx.evterUpdate.On((dt) => {
        m_time += dt;
        m_joint.SetMotorSpeed(0.05 * Math.cos(m_time) * b2_pi);
    });

    return ctx;
};

export default B2ExamWaveMachine;