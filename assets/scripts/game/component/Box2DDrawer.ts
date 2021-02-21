// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import EventerNoArgs from "../../frame/basic/EventerNoArgs";
import b2Extend from "../../lib/b2_extend/B2Extend";
import { b2AABB, b2Body, b2BodyDef, b2Color, b2Draw, b2DrawFlags, b2Fixture, b2Mat33, b2PolygonShape, b2Transform, b2Vec2, b2Vec3, b2World, b2_pi } from "../../lib/box2d_ts/Box2D";
import configCenter from "../ConfigCenter";
import CheckBox from "./CheckBox";
import dataCenter from "../DataCenter";

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

    @property(cc.Node)
    private checkBoxContainer: cc.Node = null;

    /**
     * 全局实例
     */
    public static inst: Box2DDrawer;

    public onLoad () {
        this.checkBoxContainer.removeAllChildren();
        configCenter.checkBoxData.forEach(( val, index ) => {
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
                let cfg = configCenter.checkBoxData[num];
                if (cfg != null) {
                    if (!!prop) {
                        this._currDrawTag |= cfg.tag;
                    };
                };
            };
        };

        for (let b = this._b2w.GetBodyList(); b; b = b.GetNext()) {
            let trans = b.GetTransform();
            let mat = b2Extend.GetTransMat(trans);
            for (let f = b.GetFixtureList(); f; f = f.GetNext()) {
                if (this._currDrawTag & configCenter.DRAW_AABB) {
                    for (let i = 0; i < f.m_proxyCount; i++) {
                        let proxy = f.m_proxies[i];
                        let aabb = proxy.treeNode.aabb;
                        this.DrawAABB(aabb);
                    };
                };
                
                if (this._currDrawTag & configCenter.DRAW_SHAPE) {
                    this.DrawShape(f, mat);
                };
            };
        };
    }

    /**
     * 绘制碰撞盒
     * @param aabb 
     */
    private DrawAABB (aabb: b2AABB) {
        this.GraphicsMoveTo(aabb.lowerBound.x, aabb.lowerBound.y);
        this.GraphicsLineTo(aabb.upperBound.x, aabb.lowerBound.y);
        this.GraphicsLineTo(aabb.upperBound.x, aabb.upperBound.y);
        this.GraphicsLineTo(aabb.lowerBound.x, aabb.upperBound.y);
        this.GraphicsLineTo(aabb.lowerBound.x, aabb.lowerBound.y);
        this.graphics.strokeColor = configCenter.color.aabb;
        this.graphics.stroke();
    }

    /**
     * 绘制形状
     * @param fixt 
     * @param mat 
     */
    private DrawShape (fixt: b2Fixture, mat: b2Mat33) {
        const shape = fixt.GetShape();
        const poly = b2Extend.GetPolygonShape(shape);
        this.DrawPolygonShape(poly, mat);
    }

    /**
     * 绘制多边形
     * @param poly 
     * @param mat 
     */
    private DrawPolygonShape (poly: b2PolygonShape, mat: b2Mat33) {
        if (poly == null) {
            return;
        };
        this.DrawSolidPolygon(poly.m_vertices, poly.m_count, mat);
    }

    /**
     * 临时点
     */
    private _tempPos = new b2Vec3();

    /**
     * 变换
     * @param b2Vec2 
     * @param mat 
     */
    private Transform (b2Vec2: b2Vec2, mat: b2Mat33) {
        this._tempPos.x = b2Vec2.x;
        this._tempPos.y = b2Vec2.y;
        this._tempPos.z = 1;

        b2Mat33.MulM33V3(mat, this._tempPos, this._tempPos);

        return this._tempPos;
    }

    /**
     * 画出实体
     * @param vArr 
     * @param vCount 
     * @param color 
     * @param mat 
     */
    private DrawSolidPolygon (vArr: b2Vec2[], vCount: number, mat: b2Mat33) {
        this.Transform(vArr[0], mat);
        this.GraphicsMoveTo(this._tempPos.x, this._tempPos.y);
        for (let i = 1; i < vCount; i++) {
            this.Transform(vArr[i], mat);
            this.GraphicsLineTo(this._tempPos.x, this._tempPos.y);
        };
        this.graphics.close();
        this.graphics.fillColor = configCenter.color.shape.body;
        this.graphics.fill();
        this.graphics.strokeColor = configCenter.color.shape.outline;
        this.graphics.stroke();
    }

    private GraphicsMoveTo (x: number, y: number) {
        this.graphics.moveTo(x * configCenter.b2ShapeScale, y * configCenter.b2ShapeScale);
    }

    private GraphicsLineTo (x: number, y: number) {
        this.graphics.lineTo(x * configCenter.b2ShapeScale, y * configCenter.b2ShapeScale);
    }
}
