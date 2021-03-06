import { b2Body, b2BodyDef, b2BodyType, b2PolygonShape, b2RevoluteJointDef, b2Vec2, b2Vec2_zero, b2World } from "../../../lib/box2d_ts/Box2D";
import ExamContext from "../ExamContext";

const MAX_DEPTH = 4;

const B2ExamMobile = () => {
    const b2grav = {
        x: 0,
        y: -10
    };
    const m_world = new b2World(b2grav);

    const bodyDef = new b2BodyDef();
    bodyDef.position.Set(0, 0);
    const ground = m_world.CreateBody(bodyDef);

    const a = 0.5;
    const h = new b2Vec2(0, a);

    const root = addNode(ground, b2Vec2_zero, 0, 3, a);

    const jointDef = new b2RevoluteJointDef();
    jointDef.bodyA = ground;
    jointDef.bodyB = root;
    jointDef.localAnchorA.SetZero();
    jointDef.localAnchorB.Copy(h);
    m_world.CreateJoint(jointDef);

    function addNode (parent: b2Body, localAnchor: b2Vec2, depth: number, offset: number, a: number): b2Body {
        const density = 20;
        const h = new b2Vec2(0, a);

        const p = parent.GetPosition().Clone().SelfAdd(localAnchor).SelfSub(h);

        const bodyDef = new b2BodyDef();
        bodyDef.type = b2BodyType.b2_dynamicBody;
        bodyDef.position.Copy(p);
        const body = m_world.CreateBody(bodyDef);

        const shape = new b2PolygonShape();
        shape.SetAsBox(0.25 * a, a);
        body.CreateFixture(shape, density);

        if (depth == MAX_DEPTH) { 
            return body;
        };

        const a1 = new b2Vec2(offset, -a);
        const a2 = new b2Vec2(-offset, -a);
        const body1 = addNode(body, a1, depth + 1, 0.5 * offset, a);
        const body2 = addNode(body, a2, depth + 1, 0.5 * offset, a);

        const jointDef = new b2RevoluteJointDef();
        jointDef.bodyA = body;
        jointDef.localAnchorB.Copy(h);

        jointDef.localAnchorA.Copy(a1);
        jointDef.bodyB = body1;
        m_world.CreateJoint(jointDef);

        jointDef.localAnchorA.Copy(a2);
        jointDef.bodyB = body2;
        m_world.CreateJoint(jointDef);

        return body;
    }

    return new ExamContext(m_world);
}

export default B2ExamMobile;