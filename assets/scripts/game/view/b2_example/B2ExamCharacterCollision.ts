import { b2BodyDef, b2BodyType, b2ChainShape, b2CircleShape, b2Cos, b2EdgeShape, b2FixtureDef, b2PolygonShape, b2Sin, b2Vec2, b2World, b2_pi } from "../../../lib/box2d_ts/Box2D";
import ExamContext from "../ExamContext";

const B2ExamCharacterCollision = () => {
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
        shape.Set(new b2Vec2(-20, 0), new b2Vec2(20, 0));
        ground.CreateFixture(shape, 0);
    }

    // 靠近地面的线
    {
        const bd = new b2BodyDef();
        const ground = m_world.CreateBody(bd);

        const shape = new b2EdgeShape();
        shape.Set(new b2Vec2(-8, 1), new b2Vec2(-6, 1));
        ground.CreateFixture(shape, 0,);
        shape.Set(new b2Vec2(-6, 1), new b2Vec2(-4, 1));
        ground.CreateFixture(shape, 0);
        shape.Set(new b2Vec2(-4, 1), new b2Vec2(-2, 1));
        ground.CreateFixture(shape, 0);
    }

    // 右上方拐角
    {
        const bd = new b2BodyDef();
        bd.angle = 0.25 * b2_pi;
        const ground = m_world.CreateBody(bd);

        const vs = b2Vec2.MakeArray(4);
        vs[0].Set(5, 7);
        vs[1].Set(6, 8);
        vs[2].Set(7, 8);
        vs[3].Set(8, 7);
        const shape = new b2ChainShape();
        shape.CreateChain(vs, 4);
        ground.CreateFixture(shape, 0);
    }

    // 右方方块
    {
        const bd = new b2BodyDef();
        const ground = m_world.CreateBody(bd);

        const shape = new b2PolygonShape();
        shape.SetAsBox(1, 1, new b2Vec2(4, 3), 0);
        ground.CreateFixture(shape, 0);
        shape.SetAsBox(1, 1, new b2Vec2(6, 3), 0);
        ground.CreateFixture(shape, 0);
        shape.SetAsBox(1, 1, new b2Vec2(8, 3), 0);
        ground.CreateFixture(shape, 0);
    }

    // 中间的缺边方形
    {
        const bd = new b2BodyDef();
        const ground = m_world.CreateBody(bd);

        const vs = b2Vec2.MakeArray(4);
        vs[0].Set(-1, 3);
        vs[1].Set(1, 3);
        vs[2].Set(1, 5);
        vs[3].Set(-1, 5);
        const shape = new b2ChainShape();
        shape.CreateChain(vs, 4);
        ground.CreateFixture(shape, 0);
    }

    // 左边那个奇怪形状的东西
    {
        const bd = new b2BodyDef();
        bd.position.Set(-10, 4);
        const ground = m_world.CreateBody(bd);

        const vs = b2Vec2.MakeArray(10);
        vs[0].Set(0, 0);
        vs[1].Set(6, 0);
        vs[2].Set(6, 2);
        vs[3].Set(4, 1);
        vs[4].Set(2, 2);
        vs[5].Set(0, 2);
        vs[6].Set(-2, 2);
        vs[7].Set(-4, 3);
        vs[8].Set(-6, 2);
        vs[9].Set(-6, 0);
        const shape = new b2ChainShape();
        shape.CreateChain(vs, 10);
        ground.CreateFixture(shape, 0);
    }

    // 中间的方块
    {
        const bd = new b2BodyDef();
        bd.position.Set(-3, 8);
        bd.type = b2BodyType.b2_dynamicBody;
        bd.fixedRotation = true;
        bd.allowSleep = false;

        const body = m_world.CreateBody(bd);

        const shape = new b2PolygonShape();
        shape.SetAsBox(0.5, 0.5);

        const fd = new b2FixtureDef();
        fd.shape = shape;
        fd.density = 20;
        body.CreateFixture(fd);
    }

    // 奇怪形状中的方形
    {
        const bd = new b2BodyDef();
        bd.position.Set(-5, 5);
        bd.type = b2BodyType.b2_dynamicBody;
        bd.fixedRotation = true;
        bd.allowSleep = false;
        
        const body = m_world.CreateBody(bd);

        const shape = new b2PolygonShape();
        shape.SetAsBox(0.25, 0.25);

        const fd = new b2FixtureDef();
        fd.shape = shape;
        fd.density = 20;
        body.CreateFixture( fd );
    }

    // 六边形
    {
        const bd = new b2BodyDef();
        bd.position.Set(-5, 8);
        bd.type = b2BodyType.b2_dynamicBody;
        bd.fixedRotation = true;
        bd.allowSleep = false;

        const body = m_world.CreateBody(bd);

        let angle = 0;
        const delta = b2_pi / 3;
        const vertices = b2Vec2.MakeArray(6);
        for (let i = 0; i < 6; i++) {
            vertices[i].Set(0.5 * b2Cos(angle), 0.5 * b2Sin( angle ));
            angle += delta;
        };

        const shape = new b2PolygonShape();
        shape.Set(vertices, 6);

        const fd = new b2FixtureDef();
        fd.shape = shape;
        fd.density = 20;
        body.CreateFixture(fd);
    }

    // 圆形
    {
        const bd = new b2BodyDef();
        bd.position.Set(3, 5);
        bd.type = b2BodyType.b2_dynamicBody;
        bd.fixedRotation = true;
        bd.allowSleep = false;

        const body = m_world.CreateBody(bd);

        const shape = new b2CircleShape();
        shape.m_radius = 0.5;

        const fd = new b2FixtureDef();
        fd.shape = shape;
        fd.density = 20;
        body.CreateFixture( fd );
    }

    // 圆形
    {
        const bd = new b2BodyDef();
        bd.position.Set(-7, 6);
        bd.type = b2BodyType.b2_dynamicBody;
        bd.allowSleep = false;

        const shape = new b2CircleShape();
        shape.m_radius = 0.25;

        const fd = new b2FixtureDef();
        fd.shape = shape;
        fd.density = 20;
        fd.friction = 1;
    }

    return new ExamContext(m_world);
};

export default B2ExamCharacterCollision;