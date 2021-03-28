import { b2MakeNumberArray, b2Max, b2Min, b2Rope, b2RopeDef, b2Vec2, b2World, b2_pi } from "../../../lib/box2d_ts/Box2D";
import Box2DDrawer from "../../component/Box2DDrawer";
import configCenter from "../../ConfigCenter";
import ExamContext from "../ExamContext";

const B2ExamRope = () => {
    const b2grav = {
        x: 0,
        y: -10
    };
    const m_world = new b2World(b2grav);
    const examContext = new ExamContext(m_world);

    let m_rope = new b2Rope();
    let m_angle = 0;

    const N = 40;
    const vertices = b2Vec2.MakeArray(N);
    const masses = b2MakeNumberArray(N);

    for (let i = 0; i < N; i++) {
        vertices[i].Set(0, 10 - 1 * i);
        masses[i] = 1;
    };
    masses[0] = 0;
    masses[1] = 0;

    const def = new b2RopeDef();
    def.vertices = vertices;
    def.count = N;
    def.gravity.Set(0, -10);
    def.masses = masses;
    def.damping = 0.1;
    def.k2 = 1;
    def.k3 = 0.5;

    m_rope.Initialize(def);

    m_angle = 0;
    m_rope.SetAngle(m_angle);

    examContext.evterKeyDown.On(( key ) => {
        switch (key) {
            case `q`: {
                m_angle = b2Max(-b2_pi, m_angle - 0.05 * b2_pi);
                m_rope.SetAngle(m_angle);
                break;
            };
            case `e`: {
                m_angle = b2Min(b2_pi, m_angle + 0.05 * b2_pi);
                m_rope.SetAngle(m_angle);
                break;
            };
        };
    });

    examContext.evterUpdate.On((dt) => {
        Box2DDrawer.inst.graphicsDrawer.ConnectPosOrigin(m_rope.m_ps, m_rope.m_count, Box2DDrawer.inst.graphicsDrawer.Pixel( configCenter.STANDARD_WIDTH), cc.Color.BLUE);
        m_rope.Step(dt, 1);
    });

    return examContext;
};

export default B2ExamRope;