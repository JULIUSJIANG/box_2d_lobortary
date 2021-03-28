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

        b2ElementExtend.DrawWorld(this._b2w, this.graphicsDrawer);
        return;

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
        // 
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
            for (let b2c = this._b2w.GetContactManager().m_contactList; b2c; b2c = b2c.GetNext()) {
                b2c.GetWorldManifold(b2wm);
                b2wm.points.forEach(( po ) => {
                    this.graphicsDrawer.RoundFill(po.x, po.y, this.graphicsDrawer.Pixel(configCenter.contactPointRadius), configCenter.color.contactPoint.dot);
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
                    this.graphicsDrawer.RoundFill(pos.x, pos.y, radius, configCenter.color.particle.fill);
                    this.graphicsDrawer.RoundLine(pos.x, pos.y, radius, this.graphicsDrawer.Pixel(configCenter.STANDARD_WIDTH), configCenter.color.particle.stroke)
                };
            };
        };
        
        if (this._currDrawTag & configCenter.DRAW_CONTROLLER) {
            for (let c = this._b2w.m_controllerList; c; c = c.GetNext()) {
                this.DrawController(c);
            };
        };
    }

    /**
     * 预制约束
     * @param b2j 
     */
    private DrawJoint (b2j: b2Joint) {
        this.graphics.fillColor = configCenter.color.joint.dot;
        
        this.graphics.lineCap = cc.Graphics.LineCap.ROUND;
        this.graphics.lineWidth = configCenter.jointLineWitdh;

        let bodyA = b2j.GetBodyA();
        let transformA = bodyA.GetTransform();
        let matA = b2Extend.GetTransMat(transformA);

        let bodyB = b2j.GetBodyB();
        let transformB = bodyB.GetTransform();
        let matB = b2Extend.GetTransMat(transformB);

        // 绘线至 A 的锚点
        this.Transform(configCenter.posO, matA);
        this._temPosA.Copy(this._tempPosB);
        
        b2j.GetAnchorA(this._tempPosB);
        this.graphicsDrawer.StraightLine(this._temPosA.x, this._temPosA.y, this._tempPosB.x, this._tempPosB.y, this.graphicsDrawer.Pixel( configCenter.hhJointLineWidth ), configCenter.color.joint.areaBegin);

        b2j.GetAnchorB(this._temPosA);
        this.graphicsDrawer.StraightLine(this._tempPosB.x, this._tempPosB.y, this._temPosA.x, this._temPosA.y, this.graphicsDrawer.Pixel( configCenter.hhJointLineWidth ), configCenter.color.joint.areaBegin);

        // 绘线至 B 点
        this._temPosA.Copy(this._tempPosB);
        this.Transform(configCenter.posO, matB);
        this.graphicsDrawer.StraightLine(this._temPosA.x, this._temPosA.y, this._tempPosB.x, this._tempPosB.y, this.graphicsDrawer.Pixel( configCenter.hhJointLineWidth ), configCenter.color.joint.areaEnd);

        // 连接点
        this.Transform(configCenter.posO, matA);
        this.graphicsDrawer.RoundFill(this._tempPosB.x, this._tempPosB.y, this.graphicsDrawer.Pixel( configCenter.hhJointLineWidth ), configCenter.color.joint.dot);

        b2j.GetAnchorA(this._tempPosB);
        this.graphicsDrawer.RoundFill(this._tempPosB.x, this._tempPosB.y, this.graphicsDrawer.Pixel( configCenter.hhJointLineWidth ), configCenter.color.joint.dot);

        b2j.GetAnchorB(this._tempPosB);
        this.graphicsDrawer.RoundFill(this._tempPosB.x, this._tempPosB.y, this.graphicsDrawer.Pixel( configCenter.hhJointLineWidth ), configCenter.color.joint.dot);

        this.Transform(configCenter.posO, matB);
        this.graphicsDrawer.RoundFill(this._tempPosB.x, this._tempPosB.y, this.graphicsDrawer.Pixel( configCenter.hhJointLineWidth ), configCenter.color.joint.dot);
    }

    private DrawDistnaceJoint (joint: b2DistanceJoint) {
        if (joint == null) {
            return;
        };
    }

    private DrawPulleyJoint (joint: b2PulleyJointDef) {
        if (joint == null) {
            return;
        };
    }

    private DrawMouseJoint (joint: b2MouseJoint) {
        if (joint == null) {
            return;
        };
    }

    /**
     * 绘制变换
     * @param mat 
     */
    private DrawTransform (mat: b2Mat33) {
        this.Transform(configCenter.posO, mat);
        this._temPosA.Copy(this._tempPosB);
        this.Transform(configCenter.xAxis, mat);
        this.graphicsDrawer.StraightLine(this._temPosA.x, this._temPosA.y, this._tempPosB.x, this._tempPosB.y, this.graphicsDrawer.Pixel(configCenter.STANDARD_WIDTH), configCenter.color.transform.xColor);

        this.Transform(configCenter.posO, mat);
        this._temPosA.Copy(this._tempPosB);
        this.Transform(configCenter.yAxis, mat);
        this.graphicsDrawer.StraightLine(this._temPosA.x, this._temPosA.y, this._tempPosB.x, this._tempPosB.y, this.graphicsDrawer.Pixel(configCenter.STANDARD_WIDTH), configCenter.color.transform.yColor);
    }

    /**
     * 绘制碰撞盒
     * @param aabb 
     */
    private DrawAABB (aabb: b2AABB) {
        this.graphicsDrawer.CyclePosSetAll(
            [
                new b2Vec2(aabb.lowerBound.x, aabb.lowerBound.y),
                new b2Vec2(aabb.upperBound.x, aabb.lowerBound.y),
                new b2Vec2(aabb.upperBound.x, aabb.upperBound.y),
                new b2Vec2(aabb.lowerBound.x, aabb.upperBound.y)
            ],
            this.graphicsDrawer.Pixel( configCenter.STANDARD_WIDTH ),
            configCenter.color.aabb
        )
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

        let targetData = targetVertices.map(( pos ) => {
            var vec3 = new b2Vec3();
            return this.Transform(pos, mat, vec3)
        });
        this.graphicsDrawer.ConnectPosSetAll(targetData, this.graphicsDrawer.Pixel( configCenter.STANDARD_WIDTH ), configCenter.color.shape.outline);
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
        this.graphicsDrawer.ConnectPosSetAll(
            [this.Transform( es.m_vertex1, mat, this._temPosA), this.Transform( es.m_vertex2, mat, this._tempPosB)], 
            this.graphicsDrawer.Pixel( configCenter.STANDARD_WIDTH ), 
            configCenter.color.shape.outline
        );
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
        let targetVArr = poly.m_vertices.slice(0, poly.m_count).map(( v ) => {
            let vec = new b2Vec3();
            return this.Transform(v, mat, vec);
        });
        this.graphicsDrawer.FillPosSetAll(targetVArr, configCenter.color.shape.body);
        this.graphicsDrawer.CyclePosSetAll(targetVArr, this.graphicsDrawer.Pixel(configCenter.STANDARD_WIDTH), configCenter.color.shape.outline);
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
        this.Transform(circle.m_p, mat, this._temPosA);
        this.graphicsDrawer.RoundFill(this._temPosA.x, this._temPosA.y, circle.m_radius, configCenter.color.shape.body);
        this.graphicsDrawer.RoundLine(this._temPosA.x, this._temPosA.y, circle.m_radius, this.graphicsDrawer.Pixel(configCenter.STANDARD_WIDTH), configCenter.color.shape.outline);
    }

    /**
     * 绘制控制器
     * @param b2Ctrl 
     */
    private DrawController (b2Ctrl: b2Controller) {
        if (b2Ctrl == null) {
            return;
        };
        let b2BuoyancyCtrl = b2Extend.Getb2BuoyancyController(b2Ctrl);
        this.DrawB2BuoyangcyCtrl(b2BuoyancyCtrl);
    }

    /**
     * 绘制重力控制器
     */
    private DrawB2BuoyangcyCtrl (b2BuoyancyCtrl: b2BuoyancyController) {
        if (b2BuoyancyCtrl == null) {
            return;
        };
        const r = 10;
        let normal = b2BuoyancyCtrl.normal.Clone();
        normal.Normalize();
        const p1 = new b2Vec2();
        const p2 = new b2Vec2();
        p1.x = normal.x * b2BuoyancyCtrl.offset + normal.y * r;
        p1.y = normal.y * b2BuoyancyCtrl.offset - normal.x * r;
        p2.x = normal.x * b2BuoyancyCtrl.offset - normal.y * r;
        p2.y = normal.y * b2BuoyancyCtrl.offset + normal.x * r;
        this.graphicsDrawer.StraightLine(p1.x, p1.y, p2.x, p2.y, this.graphicsDrawer.Pixel(configCenter.STANDARD_WIDTH), configCenter.color.controller.b2BuoyancyController)
    }

    /**
     * 临时点
     */
    private _tempPosB = new b2Vec3();

    /**
     * 另一个临时点
     */
    private _temPosA = new b2Vec3();

    /**
     * 变换
     * @param b2Vec2 
     * @param mat 
     */
    private Transform (b2Vec2: b2Vec2, mat: b2Mat33, target: b2Vec3 = this._tempPosB) {
        target.x = b2Vec2.x;
        target.y = b2Vec2.y;
        target.z = 1;
        return this.TransformForV3(target, mat, target);
    }
    
    /**
     * 变换
     * @param b2Vec3 
     * @param mat 
     */
    private TransformForV3 (b2Vec3: b2Vec3, mat: b2Mat33, target: b2Vec3 = this._tempPosB) {
        target.x = b2Vec3.x;
        target.y = b2Vec3.y;
        target.z = b2Vec3.z;

        b2Mat33.MulM33V3(mat, target, target);
        return target;
    }
}
