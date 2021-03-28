import EventerNoArgs from "../../frame/basic/EventerNoArgs";
import EventerWithArgs from "../../frame/basic/EventerWithArgs";
import { b2Body, b2BodyDef, b2BodyType, b2Fixture, b2MouseJoint, b2MouseJointDef, b2Vec2, b2World } from "../../lib/box2d_ts/Box2D";

/**
 * 例子实例的上下文
 */
export default class ExamContext {

    public ground: b2Body;

    public b2w: b2World;

    /**
     * 用于接收刷新事件
     */
    public evterUpdate: EventerWithArgs<number> = new EventerWithArgs<number>();

    /**
     * 用于接收鼠标按下的事件
     */
    public evterKeyDown: EventerWithArgs<string> = new EventerWithArgs<string>();

    public constructor (b2w: b2World) {
        this.b2w = b2w;

        const bodyDef = new b2BodyDef();
        this.ground = this.b2w.CreateBody(bodyDef);

        this.evterUpdate.On(( passedSeconds ) => {
            // 每次最大推进值为 16
            b2w.Step( passedSeconds, 8, 8, 8);
        });
    }

    /**
     * 鼠标约束
     */
    private m_mouseJoint: b2MouseJoint;

    /**
     * 鼠标按下
     * @param p 
     */
    public MouseDown (p: b2Vec2) {
        let hit_fixture: b2Fixture;
        this.b2w.QueryPointAABB(p, (fixture: b2Fixture) => {
            const body = fixture.GetBody();
            if (body.GetType() === b2BodyType.b2_dynamicBody) {
                const inside = fixture.TestPoint(p);
                if (inside) {
                    hit_fixture = fixture;
                    return false;
                };
            };
            return true;
        });

        if (hit_fixture) {
            const body = hit_fixture.GetBody();
            const md: b2MouseJointDef = new b2MouseJointDef();
            md.bodyA = this.ground;
            md.bodyB = body;
            md.target.Copy(p);
            md.maxForce = 1000 * body.GetMass();
            this.m_mouseJoint = this.b2w.CreateJoint(md);
            body.SetAwake(true);
        };
    }

    /**
     * 鼠标移动
     * @param p 
     */
    public MouseMove (p: b2Vec2) {
        if (this.m_mouseJoint) {
            this.m_mouseJoint.SetTarget(p);
        };
    }

    /**
     * 鼠标抬起
     * @param p 
     */
    public MouseUp (p: b2Vec2) {
        if (this.m_mouseJoint) {
            this.b2w.DestroyJoint(this.m_mouseJoint);
            this.m_mouseJoint = null;
        };
    }
}