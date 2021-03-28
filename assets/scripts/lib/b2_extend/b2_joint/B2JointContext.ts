import { b2Vec2 } from "../../box2d_ts/Box2D";

/**
 * 绘制关节时候的上下文
 */
export default interface B2JointContext {
    /**
     * 点 1
     */
    x1: b2Vec2;
    /**
     * 点 2
     */
    x2: b2Vec2;
    /**
     * 锚点 1
     */
    p1: b2Vec2;
    /**
     * 锚点 2
     */
    p2: b2Vec2;
}