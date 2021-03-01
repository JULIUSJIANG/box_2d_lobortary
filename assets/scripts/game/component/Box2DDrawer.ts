// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import EventerNoArgs from "../../frame/basic/EventerNoArgs";
import b2Extend from "../../lib/b2_extend/B2Extend";
import { b2AABB, b2Body, b2BodyDef, b2ChainShape, b2CircleShape, b2Color, b2Draw, b2DrawFlags, b2EdgeShape, b2Fixture, b2Joint, b2Mat33, b2PolygonShape, b2Transform, b2Vec2, b2Vec3, b2World, b2WorldManifold, b2_pi } from "../../lib/box2d_ts/Box2D";
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

        if (this._currDrawTag & configCenter.DRAW_JOINTS) {
            for (let j = this._b2w.GetJointList(); j; j = j .GetNext()) {
                this.DrawJoint(j);
            };
        };

        for (let b = this._b2w.GetBodyList(); b; b = b.GetNext()) {
            let trans = b.GetTransform();
            let mat = b2Extend.GetTransMat(trans);

            if (this._currDrawTag & configCenter.DRAW_CENTER_OF_MASSES) {
                this.DrawTransform(mat);
            };

            for (let f = b.GetFixtureList(); f; f = f.GetNext()) {
                if (this._currDrawTag & configCenter.DRAW_AABB) {
                    for (let i = 0; i < f.m_proxyCount; i++) {
                        let proxy = f.m_proxies[i];
                        let aabb = proxy.treeNode.aabb;
                        this.DrawAABB(aabb);
                    };
                };
                
                if (this._currDrawTag & configCenter.DRAW_SHAPES) {
                    this.DrawShape(f, mat);
                };
            };
        };

        if (this._currDrawTag & configCenter.DRAW_CONTACT_POINTS) {
            let b2wm = new b2WorldManifold();
            this.graphics.fillColor = configCenter.color.contactPoint.dot;
            for (let b2c = this._b2w.GetContactManager().m_contactList; b2c; b2c = b2c.GetNext()) {
                b2c.GetWorldManifold(b2wm);
                b2wm.points.forEach(( po ) => {
                    this.ArcCyclePixel(po.x, po.y, configCenter.contactPointRadius);
                    this.graphics.close();
                    this.graphics.fill();
                });
            };
        };

        if (this._currDrawTag & configCenter.DRAW_PARTICLES) {
            for (let b2p = this._b2w.GetParticleSystemList(); b2p; b2p = b2p.GetNext()) {
                // 读取半径
                let radius = b2p.GetRadius();
                let pCount = b2p.GetParticleCount();
                let pBuff = b2p.GetPositionBuffer();
                for (let i = 0; i < pCount; i++) {
                    let pos = pBuff[i];
                    this.DrawSolidCircleMeterV1(pos.x, pos.y, radius, configCenter.color.particle.fill, configCenter.color.particle.stroke);
                };
            };
        };
    }

    /**
     * 预制约束
     * @param b2j 
     */
    private DrawJoint (b2j: b2Joint) {
        this.graphics.fillColor = configCenter.color.joint.dot;
        this.graphics.strokeColor = configCenter.color.joint.areaBegin;
        this.graphics.lineCap = cc.Graphics.LineCap.ROUND;
        this.graphics.lineWidth = configCenter.jointLineWitdh;

        let bodyA = b2j.GetBodyA();
        let transformA = bodyA.GetTransform();
        let matA = b2Extend.GetTransMat(transformA);

        this.Transform(configCenter.posO, matA);
        this.GraphicsMoveToMeter(this._tempPos.x, this._tempPos.y);

        b2j.GetAnchorA(this._tempPos);
        this.TransformForV3(this._tempPos, matA);
        this.GraphicsLineToMeter(this._tempPos.x, this._tempPos.y);

        this.graphics.stroke();
        this.graphics.strokeColor = configCenter.color.joint.areaEnd;
        this.GraphicsMoveToMeter(this._tempPos.x, this._tempPos.y);

        let bodyB = b2j.GetBodyB();
        let transformB = bodyB.GetTransform();
        let matB = b2Extend.GetTransMat(transformB);

        this.Transform(configCenter.posO, matB);
        this.GraphicsLineToMeter(this._tempPos.x, this._tempPos.y);
        this.graphics.stroke();

        // 连接点
        this.Transform(configCenter.posO, matA);
        this.ArcCyclePixel(this._tempPos.x, this._tempPos.y, configCenter.hhJointLineWidth)
        this.graphics.fill();

        b2j.GetAnchorA(this._tempPos);
        this.TransformForV3(this._tempPos, matA);
        this.ArcCyclePixel(this._tempPos.x, this._tempPos.y, configCenter.hhJointLineWidth)
        this.graphics.fill();

        this.Transform(configCenter.posO, matB);
        this.ArcCyclePixel(this._tempPos.x, this._tempPos.y, configCenter.hhJointLineWidth)
        this.graphics.fill();
    }

    /**
     * 绘制变换
     * @param mat 
     */
    private DrawTransform (mat: b2Mat33) {
        let posO = this.Transform(configCenter.posO, mat);
        this.GraphicsMoveToMeter(posO.x, posO.y);
        let xAxis = this.Transform(configCenter.xAxis, mat);
        this.GraphicsLineToMeter(xAxis.x, xAxis.y);
        this.graphics.strokeColor = configCenter.color.transform.xColor;
        this.graphics.lineWidth = configCenter.STANDARD_WIDTH;
        this.graphics.stroke();

        posO = this.Transform(configCenter.posO, mat);
        this.GraphicsMoveToMeter(posO.x, posO.y);
        let yAxis = this.Transform(configCenter.yAxis, mat);
        this.GraphicsLineToMeter(yAxis.x, yAxis.y);
        this.graphics.strokeColor = configCenter.color.transform.yColor;
        this.graphics.lineWidth = configCenter.STANDARD_WIDTH;
        this.graphics.stroke();
    }

    /**
     * 绘制碰撞盒
     * @param aabb 
     */
    private DrawAABB (aabb: b2AABB) {
        this.GraphicsMoveToMeter(aabb.lowerBound.x, aabb.lowerBound.y);
        this.GraphicsLineToMeter(aabb.upperBound.x, aabb.lowerBound.y);
        this.GraphicsLineToMeter(aabb.upperBound.x, aabb.upperBound.y);
        this.GraphicsLineToMeter(aabb.lowerBound.x, aabb.upperBound.y);
        this.GraphicsLineToMeter(aabb.lowerBound.x, aabb.lowerBound.y);
        this.graphics.strokeColor = configCenter.color.aabb;
        this.graphics.lineWidth = configCenter.STANDARD_WIDTH;
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
        const circle = b2Extend.GetCircleShape(shape);
        this.DrawCircleShape(circle, mat);
        const edge = b2Extend.GetEdgeShape(shape);
        this.DrawEdgeShape(edge, mat);
        const chain = b2Extend.GetChainShape(shape);
        this.DrawChainShape(chain, mat);
    }

    /**
     * 绘制铰链
     * @param cs 
     * @param mat 
     */
    private DrawChainShape (cs: b2ChainShape, mat: b2Mat33) {
        if (cs == null) {
            return;
        };
        const count = cs.m_count;
        const vertices = cs.m_vertices;
        let targetVertices = vertices.slice(0, count);
        if (cs.m_hasPrevVertex) {
            targetVertices.unshift(cs.m_prevVertex);
        };
        if (cs.m_hasNextVertex) {
            targetVertices.push(cs.m_nextVertex);
        };
        this.DrawSegment(targetVertices, targetVertices.length, mat, configCenter.color.shape.outline);
    }

    /**
     * 绘制轨迹形
     * @param es 
     * @param mat 
     */
    private DrawEdgeShape (es: b2EdgeShape, mat: b2Mat33) {
        if (es == null) {
            return;
        };
        this.DrawSegment([es.m_vertex1, es.m_vertex2], 2, mat, configCenter.color.shape.outline);
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
        this.DrawSolidPolygonMeter(poly.m_vertices, poly.m_count, mat, configCenter.color.shape.body, configCenter.color.shape.outline);
    }

    /**
     * 绘制圆
     * @param circle 
     * @param mat 
     */
    private DrawCircleShape (circle: b2CircleShape, mat: b2Mat33) {
        if (circle == null) {
            return;
        };
        this.DrawSolidCircleMeterV2(circle.m_radius, mat, configCenter.color.shape.body, configCenter.color.shape.outline);
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
        return this.TransformForV3(this._tempPos, mat);
    }

    /**
     * 变换
     * @param b2Vec3 
     * @param mat 
     */
    private TransformForV3 (b2Vec3: b2Vec3, mat: b2Mat33) {
        this._tempPos.x = b2Vec3.x;
        this._tempPos.y = b2Vec3.y;
        this._tempPos.z = b2Vec3.z;

        b2Mat33.MulM33V3(mat, this._tempPos, this._tempPos);
        return this._tempPos;
    }

    /**
     * 画出多边形
     * @param vArr 
     * @param vCount 
     * @param mat 
     * @param fillColor 
     * @param outlineColor 
     */
    private DrawSolidPolygonMeter (vArr: b2Vec2[], vCount: number, mat: b2Mat33, fillColor: cc.Color, outlineColor: cc.Color) {
        this.Transform(vArr[0], mat);
        this.GraphicsMoveToMeter(this._tempPos.x, this._tempPos.y);
        for (let i = 1; i < vCount; i++) {
            this.Transform(vArr[i], mat);
            this.GraphicsLineToMeter(this._tempPos.x, this._tempPos.y);
        };
        this.graphics.close();
        this.graphics.fillColor = fillColor;
        this.graphics.fill();
        this.graphics.strokeColor = outlineColor;
        this.graphics.lineWidth = configCenter.STANDARD_WIDTH;
        this.graphics.stroke();
    }

    /**
     * 画出片段
     * @param vArr 
     * @param vCount 
     * @param mat 
     * @param outlineColor 
     */
    private DrawSegment (vArr: b2Vec2[], vCount: number, mat: b2Mat33, outlineColor: cc.Color) {
        this.Transform(vArr[0], mat);
        this.GraphicsMoveToMeter(this._tempPos.x, this._tempPos.y);
        for (let i = 1; i < vCount; i++) {
            this.Transform(vArr[i], mat);
            this.GraphicsLineToMeter(this._tempPos.x, this._tempPos.y);
        };
        this.graphics.lineWidth = configCenter.STANDARD_WIDTH;
        this.graphics.strokeColor = outlineColor;
        this.graphics.fillColor = outlineColor;
        this.graphics.stroke();

        for (let i = 0; i < vCount; i++) {
            this.Transform(vArr[i], mat);
            this.ArcCyclePixel(this._tempPos.x, this._tempPos.y, configCenter.DOT_RADIUS);
            this.graphics.fill();
        };
    }

    /**
     * 画出圆圈
     * @param pos 
     * @param radius 
     * @param mat 
     * @param fillColor 
     * @param outlineColor 
     */
    private DrawSolidCircleMeterV2 (radius: number, mat: b2Mat33, fillColor: cc.Color, outlineColor: cc.Color) {
        this.Transform(configCenter.posO, mat);
        this.DrawSolidCircleMeterV1(this._tempPos.x, this._tempPos.y, radius, fillColor, outlineColor);
    }

    /**
     * 画出圆圈
     * @param x 
     * @param y 
     * @param radius 
     * @param fillColor 
     * @param outlineColor 
     */
    private DrawSolidCircleMeterV1 (x: number, y: number, radius: number, fillColor: cc.Color, outlineColor: cc.Color) {
        this.ArcCycleMeter(x, y, radius);
        this.graphics.close();
        this.graphics.fillColor = fillColor;
        this.graphics.fill();
        this.graphics.strokeColor = outlineColor;
        this.graphics.lineWidth = configCenter.STANDARD_WIDTH;
        this.graphics.stroke();
    }

    /**
     * 画圆
     * @param x 
     * @param y 
     * @param radius 
     */
    private ArcCycleMeter (x: number, y: number, radius: number) {
        this.graphics.arc(x * configCenter.b2ShapeScale, y * configCenter.b2ShapeScale, radius * configCenter.b2ShapeScale, 0, 360, true);
    }

    /**
     * 画圆
     * @param x 
     * @param y 
     * @param radius 
     */
    private ArcCyclePixel (x: number, y: number, radius: number) {
        this.graphics.arc(x * configCenter.b2ShapeScale, y * configCenter.b2ShapeScale, radius, 0, 360, true);
    }

    /**
     * 把画笔移动至目标位置
     * @param x 
     * @param y 
     */
    private GraphicsMoveToMeter (x: number, y: number) {
        this.graphics.moveTo(x * configCenter.b2ShapeScale, y * configCenter.b2ShapeScale);
    }

    /**
     * 把画笔画至目标位置
     * @param x 
     * @param y 
     */
    private GraphicsLineToMeter (x: number, y: number) {
        this.graphics.lineTo(x * configCenter.b2ShapeScale, y * configCenter.b2ShapeScale);
    }
}
