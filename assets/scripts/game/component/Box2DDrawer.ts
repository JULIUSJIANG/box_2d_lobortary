// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import b2Extend from "../../lib/b2_extend/B2Extend";
import { b2AABB, b2Body, b2Color, b2Draw, b2DrawFlags, b2Fixture, b2Mat33, b2PolygonShape, b2Transform, b2Vec2, b2Vec3, b2World, b2_pi } from "../../lib/box2d_ts/Box2D";

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

    private _b2w: b2World;

    public SetB2World (b2w: b2World) {
        this._b2w = b2w;
    }

    public update () {
        this.graphics.clear();
        if (this._b2w == null) {
            return;
        };

        for (let b = this._b2w.GetBodyList(); b; b = b.GetNext()) {
            let trans = b.GetTransform();
            let mat = b2Extend.GetTransMat(trans);
            for (let f = b.GetFixtureList(); f; f = f.GetNext()) {
                this.DrawShape(f, new cc.Color(255, 255, 255, 255), mat);
            };
        };
    }

    private DrawShape (fixt: b2Fixture, color: cc.Color, mat: b2Mat33) {
        const shape = fixt.GetShape();
        const poly = b2Extend.GetPolygonShape(shape);
        this.DrawPolygonShape(poly, color, mat);
    }

    private DrawPolygonShape (poly: b2PolygonShape, color: cc.Color, mat: b2Mat33) {
        if (poly == null) {
            return;
        };
        this.DrawSolidPolygon(poly.m_vertices, poly.m_count, color, mat);
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

        this._tempPos.x *= 20;
        this._tempPos.y *= 20;

        return this._tempPos;
    }

    /**
     * 画出实体
     * @param vArr 
     * @param vCount 
     * @param color 
     * @param mat 
     */
    private DrawSolidPolygon (vArr: b2Vec2[], vCount: number, color: cc.Color, mat: b2Mat33) {
        this.Transform(vArr[0], mat);
        this.graphics.moveTo(this._tempPos.x, this._tempPos.y);
        for (let i = 1; i < vCount; i++) {
            this.Transform(vArr[i], mat);
            this.graphics.lineTo(this._tempPos.x, this._tempPos.y);
        };
        this.graphics.close();
        this.graphics.fillColor = color;
        this.graphics.fill();
        this.graphics.strokeColor = color;
        this.graphics.stroke();
    }
}
