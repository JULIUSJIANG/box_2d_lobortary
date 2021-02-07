// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { b2AABB, b2Body, b2Color, b2Draw, b2DrawFlags, b2Transform, b2Vec2, b2World, b2_pi } from "../../lib/box2d_ts/Box2D";

const {ccclass, property} = cc._decorator;

/**
 * 全局通用组件
 */
@ccclass
export default class Box2DDrawer extends cc.Component {
    /**
     * 画笔组件
     */
    @property(cc.Graphics)
    private graphics: cc.Graphics = null;

    /**
     * 全局实例
     */
    public static inst: Box2DDrawer;

    public onLoad () {
        Box2DDrawer.inst = this;
    }
}
