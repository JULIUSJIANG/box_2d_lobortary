import { b2AABB, b2Body, b2Controller, b2Fixture, b2Joint, b2MakeNumberArray, b2ParticleSystem, b2Shape, b2Transform, b2Vec2, b2World, b2WorldManifold } from "../../box2d_ts/Box2D";
import b2EleSetting from "../B2EleSetting";
import b2ControllerExtend from "../b2_controller/B2ControllerExtend";
import b2JointExtend from "../b2_joint/B2JointExtend";
import b2ShapeExtend from "../b2_shape/B2ShapeExtend";
import B2ElementRS from "./B2ElementRS";

/**
 * b2 世界里面元素的汇总
 */
namespace b2ElementRD {
    /**
     * 关节
     */
    export const joint = new B2ElementRS<b2Joint>({
        drawAbleTag: 2**0,
        arrayGetter: (b2w) => {
            let list: b2Joint[] = [];
            for (let j = b2w.GetJointList(); j; j = j.GetNext()) {
                list.push(j);
            };
            return list;
        },
        tDrawer: (joint, gd) => {
            b2JointExtend.DrawB2Joint(joint, gd);
        }
    });

    /**
     * 物体中心
     */
    export const bodyTransform = new B2ElementRS<b2Body>({
        drawAbleTag: 2**1,
        arrayGetter: (b2w) => {
            let list: b2Body[] = [];
            for (let b = b2w.GetBodyList(); b; b = b.GetNext()) {
                list.push(b);
            };
            return list;
        },
        tDrawer: (bd, gd) => {
            let xAxis = bd.GetWorldPoint(b2EleSetting.xAxis, new b2Vec2());
            let yAxis = bd.GetWorldPoint(b2EleSetting.yAxis, new b2Vec2());
            let posO = bd.GetWorldPoint(b2EleSetting.posO, new b2Vec2());

            gd.StraightLine(
                posO.x,
                posO.y,
                xAxis.x,
                xAxis.y,
                gd.Pixel(b2EleSetting.lineWidth),
                b2EleSetting.color.transform.xColor
            );
            gd.StraightLine(
                posO.x,
                posO.y,
                yAxis.x,
                yAxis.y,
                gd.Pixel(b2EleSetting.lineWidth),
                b2EleSetting.color.transform.yColor
            );
        }
    });
    
    /**
     * 碰撞盒
     */
    export const aabb = new B2ElementRS<b2AABB>({
        drawAbleTag: 2**2,
        arrayGetter: (b2w) => {
            let list: b2AABB[] = [];
            for (let b = b2w.GetBodyList(); b; b = b.GetNext()) {
                for (let f = b.GetFixtureList(); f; f = f.GetNext()) {
                    for (let i = 0; i < f.m_proxyCount; i++) {
                        let proxy = f.m_proxies[i];
                        list.push(proxy.treeNode.aabb);
                    };
                };
            };
            return list;
        },
        tDrawer: (aabb, gd) => {
            gd.CyclePosSetAll(
                [
                    new b2Vec2(aabb.lowerBound.x, aabb.lowerBound.y),
                    new b2Vec2(aabb.upperBound.x, aabb.lowerBound.y),
                    new b2Vec2(aabb.upperBound.x, aabb.upperBound.y),
                    new b2Vec2(aabb.lowerBound.x, aabb.upperBound.y)
                ],
                gd.Pixel(b2EleSetting.lineWidth),
                b2EleSetting.color.aabb
            );
        }
    });
    
    /**
     * 形状的记录
     */
    export class ShapeRecord {
        /**
         * 具体形状
         */
        public shape: b2Shape;
        /**
         * 归属的身体
         */
        public body: b2Body;
    }

    /**
     * 形状
     */
    export const shape = new B2ElementRS<ShapeRecord>({
        drawAbleTag: 2**3,
        arrayGetter: (b2w) => {
            let list: ShapeRecord[] = [];
            for (let b = b2w.GetBodyList(); b; b = b.GetNext()) {
                for (let f = b.GetFixtureList(); f; f = f.GetNext()) {
                    var shapeRecord = new ShapeRecord();
                    shapeRecord.shape = f.GetShape();
                    shapeRecord.body = b;
                    list.push(shapeRecord);
                };
            };
            return list;
        },
        tDrawer: (ctx, gd) => {
            b2ShapeExtend.DrawShape(ctx.shape, ctx.body, gd);
        }
    });

    /**
     * 碰撞点
     */
    export const contact = new B2ElementRS<b2Vec2>({
        drawAbleTag: 2**4,
        arrayGetter: (b2w) => {
            let list: b2Vec2[] = [];
            let b2wm = new b2WorldManifold();
            for (let b2c = b2w.GetContactManager().m_contactList; b2c; b2c = b2c.GetNext()) {
                b2c.GetWorldManifold(b2wm);
                list.push(...b2wm.points.map(( pos ) => {
                    return (new b2Vec2().Set(pos.x, pos.y));
                }));
            };
            return list;
        },
        tDrawer: (point, gd) => {
            gd.RoundFill(
                point.x,
                point.y,
                gd.Pixel(b2EleSetting.dotRadius),
                b2EleSetting.color.contactPoint.dot
            );
        }
    });

    /**
     * 粒子
     */
    export const particle = new B2ElementRS<b2ParticleSystem>({
        drawAbleTag: 2**5,
        arrayGetter: (b2w) => {
            let list: b2ParticleSystem[] = [];
            for (let b2p = b2w.GetParticleSystemList(); b2p; b2p = b2p.GetNext()) {
                list.push(b2p);
            };
            return list;
        },
        tDrawer: (b2p, gd) => {
            let radius = b2p.GetRadius();
            let pCount = b2p.GetParticleCount();
            let pBuff = b2p.GetPositionBuffer();
            for (let i = 0; i < pCount; i++) {
                let pos = pBuff[i];
                gd.RoundFill(
                    pos.x,
                    pos.y,
                    radius,
                    b2EleSetting.color.particle.fill
                );
                gd.RoundLine(
                    pos.x,
                    pos.y,
                    radius,
                    gd.Pixel(b2EleSetting.lineWidth),
                    b2EleSetting.color.particle.fill
                );
            };
        }
    });

    /**
     * 约束器
     */
    export const controller = new B2ElementRS<b2Controller>({
        drawAbleTag: 2**6,
        arrayGetter: (b2w) => {
            let list: b2Controller[] = [];
            for (let b2c = b2w.m_controllerList; b2c; b2c = b2c.GetNext()) {
                list.push(b2c);
            };
            return list;
        },
        tDrawer: (b2c, gd) => {
            b2ControllerExtend.DrawController(b2c, gd);
        }
    });
}

export default b2ElementRD;