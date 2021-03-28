import { b2Abs, b2BodyDef, b2Cos, b2EdgeShape, b2Fixture, b2RayCastCallback, b2Sin, b2Vec2, b2World, b2_pi } from "../../../lib/box2d_ts/Box2D";
import Box2DDrawer from "../../component/Box2DDrawer";
import configCenter from "../../ConfigCenter";
import ExamContext from "../ExamContext";

const B2ExamEdgeShapes = () => {
    const b2grav = {
        x: 0,
        y: -10
    };
    const m_world = new b2World(b2grav);
    const ctx = new ExamContext(m_world);

    {
        const bd = new b2BodyDef();
        const ground = m_world.CreateBody(bd);

        let x1 = -20;
        let y1 = 2 * b2Cos(x1 / 10 * b2_pi);
        for (let i = 0; i < 80; i++) {
            const x2 = x1 + 0.5;
            const y2 = 2 * b2Cos(x2 / 10 * b2_pi);

            const shape = new b2EdgeShape();
            shape.Set(new b2Vec2(x1, y1), new b2Vec2(x2, y2));
            ground.CreateFixture(shape, 0);

            x1 = x2;
            y1 = y2;
        };
    }

    class EdgeShapesCallback extends b2RayCastCallback {
        public m_fixture: b2Fixture;
        public m_point = new b2Vec2();
        public m_normal = new b2Vec2();
        public ReportFixture (fixture: b2Fixture, point: b2Vec2, normal: b2Vec2, fraction: number): number {
            this.m_fixture = fixture;
            this.m_point.Copy(point);
            this.m_normal.Copy(normal);
            return fraction;
        }
    }
    
    let color = new cc.Color(255, 255, 255, 255);
    let m_angle = b2_pi / 2 + 0.0001;
    ctx.evterUpdate.On(( ) => {
        const l = 25;
        const point1 = new b2Vec2(0, 10);
        const d = new b2Vec2(l * b2Cos(m_angle), -l * b2Abs(b2Sin(m_angle)));
        const point2 = b2Vec2.AddVV(point1, d, new b2Vec2());

        const callback = new EdgeShapesCallback();
        m_world.RayCast(callback, point1, point2);

        if (callback.m_fixture) {
            Box2DDrawer.inst.graphicsDrawer.RoundFill(callback.m_point.x, callback.m_point.y,Box2DDrawer.inst.graphicsDrawer.Pixel(configCenter.STANDARD_WIDTH), color);
            Box2DDrawer.inst.graphicsDrawer.StraightLine(point1.x, point1.y, callback.m_point.x, callback.m_point.y, Box2DDrawer.inst.graphicsDrawer.Pixel(configCenter.STANDARD_WIDTH), color);

            const head = b2Vec2.AddVV(callback.m_point, b2Vec2.MulSV(0.5, callback.m_normal, b2Vec2.s_t0), new b2Vec2());
            Box2DDrawer.inst.graphicsDrawer.StraightLine(callback.m_point.x, callback.m_point.y, head.x, head.y, Box2DDrawer.inst.graphicsDrawer.Pixel(configCenter.STANDARD_WIDTH), color);
        }
        else {
            Box2DDrawer.inst.graphicsDrawer.StraightLine(point1.x, point1.y, point2.x, point2.y, Box2DDrawer.inst.graphicsDrawer.Pixel(configCenter.STANDARD_WIDTH), color);
        };

        m_angle += 0.25 * b2_pi / 180;
    });

    return ctx;
}

export default B2ExamEdgeShapes;