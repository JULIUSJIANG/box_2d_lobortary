import b2Extend from "../../../lib/b2_extend/B2Extend";
import { b2CollidePolygons, b2Manifold, b2PolygonShape, b2Transform, b2Vec2, b2World, b2WorldManifold, b2_pi } from "../../../lib/box2d_ts/Box2D";
import Box2DDrawer from "../../component/Box2DDrawer";
import configCenter from "../../ConfigCenter";
import ExamContext from "../ExamContext";


const B2ExamPolyCollision = () => {
    const b2grav = {
        x: 0,
        y: -10
    };
    const m_world = new b2World(b2grav);
    const examContext = new ExamContext(m_world);

    let m_polygonA = new b2PolygonShape();
    let m_polygonB = new b2PolygonShape();
    let m_transformA = new b2Transform();
    let m_transformB = new b2Transform();

    let m_position = new b2Vec2();
    let m_angle = 0;

    // 物块 A
    {
        m_polygonA.SetAsBox(4, 4);
        m_transformA.SetPositionAngle(new b2Vec2(), 0);
    }
    
    // 物块 B
    {
        m_polygonB.SetAsBox(4, 4);
        m_position.Set(8, 1.5);
        m_angle = 2;
        m_transformB.SetPositionAngle(m_position, m_angle);
    }

    examContext.evterKeyDown.On(( key: string ) => {
        switch (key) {
            case `a`: {
                m_position.x -= 0.1;
                break;
            };
            case `d`: {
                m_position.x += 0.1;
                break;
            };
            case `s`: {
                m_position.y -= 0.1;
                break;
            };
            case `w`: {
                m_position.y += 0.1;
                break;
            };
            case `q`: {
                m_angle += 0.1 * b2_pi;
                break;
            };
            case `e`: {
                m_angle -= 0.1 * b2_pi;
                break;
            };
        };

        m_transformB.SetPositionAngle(m_position, m_angle);
    });

    examContext.evterUpdate.On(( passedSeconds ) => {
        const manifold = new b2Manifold();
        b2CollidePolygons(manifold, m_polygonA, m_transformA, m_polygonB, m_transformB);

        const worldManifold = new b2WorldManifold();
        worldManifold.Initialize(manifold, m_transformA, m_polygonA.m_radius, m_transformB, m_polygonB.m_radius);

        {
            // b2Extend.GetTransMat(m_transformA);
            const v = [];
            for (let i = 0; i < m_polygonA.m_count; i++) {
                v[i] = b2Transform.MulXV(m_transformA, m_polygonA.m_vertices[i], new b2Vec2());
            };
            Box2DDrawer.inst.graphicsDrawer.CyclePosOrigin(v, m_polygonA.m_count, Box2DDrawer.inst.graphicsDrawer.Pixel( configCenter.STANDARD_WIDTH ), cc.Color.RED);

            for (let i = 0; i < m_polygonB.m_count; i++) {
                v[i] = b2Transform.MulXV(m_transformB, m_polygonB.m_vertices[i], new b2Vec2());
            };
            Box2DDrawer.inst.graphicsDrawer.CyclePosOrigin(v, m_polygonB.m_count, Box2DDrawer.inst.graphicsDrawer.Pixel( configCenter.STANDARD_WIDTH ), cc.Color.BLUE);
        }

        for (let i = 0; i < manifold.pointCount; i++) {
            Box2DDrawer.inst.graphicsDrawer.RoundFill(worldManifold.points[i].x, worldManifold.points[i].y, Box2DDrawer.inst.graphicsDrawer.Pixel( configCenter.STANDARD_WIDTH ), cc.Color.GREEN);
        };
    });

    return examContext;
}

export default B2ExamPolyCollision;