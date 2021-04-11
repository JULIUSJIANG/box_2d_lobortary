// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import EventerNoArgs from "../../frame/basic/EventerNoArgs";
import b2Extend from "../../lib/b2_extend/B2Extend";
import { b2AABB, b2Body, b2BodyDef, b2BuoyancyController, b2ChainShape, b2CircleShape, b2Color, b2Controller, b2DistanceJoint, b2Draw, b2DrawFlags, b2EdgeShape, b2Fixture, b2Joint, b2Mat33, b2MouseJoint, b2PolygonShape, b2PulleyJointDef, b2Transform, b2Vec2, b2Vec3, b2World, b2WorldManifold, b2_pi } from "../../lib/box2d_ts/Box2D";
import configCenter from "../ConfigCenter";
import CheckBox from "./CheckBox";
import dataCenter from "../DataCenter";
import GraphicsDrawer from "../../lib/graphics_drawer/GraphicsDrawer";
import b2ElementExtend from "../../lib/b2_extend/b2_element/B2ElementExtend";

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
     * 复选框预制体
     */
    @property(cc.Prefab)
    private checkBoxPrefab: cc.Prefab = null;

    /**
     * 复选框容器
     */
    @property(cc.Node)
    private checkBoxContainer: cc.Node = null;

    public graphicsDrawer: GraphicsDrawer;

    /**
     * 全局实例
     */
    public static inst: Box2DDrawer;

    public onLoad () {
        this.graphicsDrawer = new GraphicsDrawer(this.graphics, configCenter.b2ShapeScale);
        this.checkBoxContainer.removeAllChildren();
        b2ElementExtend.rd.list.forEach(( val, index ) => {
            let inst = cc.instantiate(this.checkBoxPrefab).getComponent(CheckBox);
            this.checkBoxContainer.addChild(inst.node);
            inst.Init(
                index
            );
            inst.Refresh();
            inst.evter.On(() => {
                dataCenter.vo.enableRec[`${index}`] = !dataCenter.vo.enableRec[`${index}`];
                inst.Refresh();
            });
        });
        Box2DDrawer.inst = this;
    }

    /**
     * 当前的绘制内容的标签
     */
    private _currDrawTag: number;

    /**
     * 正在操纵的世界
     */
    private _b2w: b2World;

    public DrawB2World (b2w: b2World) {
        this._b2w = b2w;

        this.graphics.clear();
        if (this._b2w == null) {
            return;
        };

        this._currDrawTag = 0;
        for (let key in dataCenter.vo.enableRec) {
            let prop = dataCenter.vo.enableRec[key];
            let num = Number.parseInt(key);
            if (!isNaN(num)) {
                let cfg = b2ElementExtend.rd.list[num];
                if (cfg != null) {
                    if (!!prop) {
                        this._currDrawTag |= cfg.drawAbleTag;
                    };
                };
            };
        };

        b2ElementExtend.DrawWorld(this._b2w, this.graphicsDrawer, this._currDrawTag);
    }
}
