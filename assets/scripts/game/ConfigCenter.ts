import { b2Vec2, b2World } from "../lib/box2d_ts/Box2D";
import B2ExamBuoyancy from "./view/b2_example/B2ExamBuoyancy";
import B2ExamCantilever from "./view/b2_example/B2ExamCantilever";
import B2ExamCharacterCollision from "./view/b2_example/B2ExamCharacterCollision";
import B2ExamConveyorBelt from "./view/b2_example/B2ExamConveyorBelt";
import B2ExamEdgeShapes from "./view/b2_example/B2ExamEdgeShapes";
import B2ExamGearsA from "./view/b2_example/B2ExamGearsA";
import B2ExamGearsB from "./view/b2_example/B2ExamGearsB";
import B2ExamMobile from "./view/b2_example/B2ExamMobile";
import B2ExamMobileBalanced from "./view/b2_example/B2ExamMobileBalanced";
import B2ExamMotorJoint from "./view/b2_example/B2ExamMotorJoint";
import B2ExamOneSidePlatform from "./view/b2_example/B2ExamOneSidePlatform";
import B2ExamParticleCollisionFilter from "./view/b2_example/B2ExamParticleCollisionFilter";
import B2ExamPolyCollision from "./view/b2_example/B2ExamPolyCollision";
import B2ExamPulleys from "./view/b2_example/B2ExamPulleys";
import B2ExamRope from "./view/b2_example/B2ExamRope";
import B2ExamSegway from "./view/b2_example/B2ExamSegway";
import B2ExamSensorTest from "./view/b2_example/B2ExamSensorTest";
import B2ExamSparky from "./view/b2_example/B2ExamSparky";
import B2ExamTheoJansen from "./view/b2_example/B2ExamTheoJansen";
import B2ExamTumber from "./view/b2_example/B2ExamTumber";
import B2ExamVaryingRestitution from "./view/b2_example/B2ExamVaryingRestitution";
import B2ExamWaveMachine from "./view/b2_example/B2ExamWaveMachine";
import B2ExamWeb from "./view/b2_example/B2ExamWeb";
import ExamContext from "./view/ExamContext";

namespace configCenter {
     
    /**
     * 每个按钮记录
     */
    export interface BtnRec {
        info: string;
        b2WorldCreator: () => ExamContext
    }

    /**
     * 标准宽
     */
    export const STANDARD_WIDTH = 2;

    /**
     * 标准半径
     */
    export const DOT_RADIUS = 2;

    /**
     * 示例的合集
     */
    export const examArr: BtnRec[] = [
        {
            info: `Sparky`,
            b2WorldCreator: B2ExamSparky
        },
        {
            info: `Character Collision`,
            b2WorldCreator: B2ExamCharacterCollision
        },
        {
            info: `Tumber`,
            b2WorldCreator: B2ExamTumber
        },
        {
            info: `Motor Joint`,
            b2WorldCreator: B2ExamMotorJoint
        },
        {
            info: `Mobile`,
            b2WorldCreator: B2ExamMobile
        },
        {
            info: `Mobile Balanced`,
            b2WorldCreator: B2ExamMobileBalanced
        },
        {
            info: `Segway`,
            b2WorldCreator: B2ExamSegway
        },
        {
            info: `Wave Machine`,
            b2WorldCreator: B2ExamWaveMachine
        },
        {
            info: `Web`,
            b2WorldCreator: B2ExamWeb
        },
        {
            info: `Edge Shapes`,
            b2WorldCreator: B2ExamEdgeShapes
        },
        {
            info: `Buoyancy`,
            b2WorldCreator: B2ExamBuoyancy
        },
        {
            info: `Poly Collision`,
            b2WorldCreator: B2ExamPolyCollision
        },
        {
            info: `Conveyor Belt`,
            b2WorldCreator: B2ExamConveyorBelt
        },
        {
            info: `One Side Platform`,
            b2WorldCreator: B2ExamOneSidePlatform
        },
        {
            info: `Gears A`,
            b2WorldCreator: B2ExamGearsA
        },
        {
            info: `Gears B`,
            b2WorldCreator: B2ExamGearsB
        },
        {
            info: `Varying Restitution`,
            b2WorldCreator: B2ExamVaryingRestitution
        },
        {
            info: `Particle Collision Filter`,
            b2WorldCreator: B2ExamParticleCollisionFilter
        },
        {
            info: `Theo Jansen`,
            b2WorldCreator: B2ExamTheoJansen
        },
        {
            info: `Sensor Test`,
            b2WorldCreator: B2ExamSensorTest
        },
        {
            info: `Rope`,
            b2WorldCreator: B2ExamRope
        },
        {
            info: `Cantilevel`,
            b2WorldCreator: B2ExamCantilever
        },
        {
            info: `Pulleys`,
            b2WorldCreator: B2ExamPulleys
        }
    ]

    /**
     * 画面元素单元的信息结构
     */
    export interface CheckBoxRec {
        /**
         * 信息
         */
        info: string;
        /**
         * 标签
         */
        tag: number;
    }

    /**
     * 绘制形状的标签
     */
    export const DRAW_SHAPES = 2**0;

    /**
     * 绘制粒子
     */
    export const DRAW_PARTICLES = 2**1;

    /**
     * 绘制约束
     */
    export const DRAW_JOINTS = 2**2;

    /**
     * 绘制碰撞盒的标签
     */
    export const DRAW_AABB = 2**3;

    export const DRAW_CONTACT_POINTS = 2**4;

    export const DRAW_CONTACT_NORMALS = 2**5;

    export const DRAW_CONTACT_IMPULSES = 2**6;

    export const DRAW_FRICTION_IMPULSES = 2**7;

    /**
     * 绘制变换的标签
     */
    export const DRAW_CENTER_OF_MASSES = 2**8;

    export const DRAW_STATISTICS = 2**9;

    export const DRAW_PROFILE = 2**10;

    /**
     * 绘制约束
     */
    export const DRAW_CONTROLLER = 2 ** 11;

    /**
     * 画面元素的集合
     */
    export const checkBoxData: CheckBoxRec[] = [
        {
            info: `Shapes`,
            tag: DRAW_SHAPES
        },
        {
            info: `Particles`,
            tag: DRAW_PARTICLES
        },
        {
            info: `Joints`,
            tag: DRAW_JOINTS
        },
        {
            info: `AABBs`,
            tag: DRAW_AABB
        },
        {
            info: `Contact Points`,
            tag: DRAW_CONTACT_POINTS
        },
        {
            info: `Contact Normals`,
            tag: DRAW_CONTACT_NORMALS
        },
        {
            info: `Contact Impulses`,
            tag: DRAW_CONTACT_IMPULSES
        },
        {
            info: `Friction Impulses`,
            tag: DRAW_FRICTION_IMPULSES
        },
        {
            info: `Center of Masses`,
            tag: DRAW_CENTER_OF_MASSES
        },
        {
            info: `Statistics`,
            tag: DRAW_STATISTICS
        },
        {
            info: `Profile`,
            tag: DRAW_PROFILE
        },
        {
            info: `Controller`,
            tag: DRAW_CONTROLLER
        }
    ]

    /**
     * 变换的可视化信息
     */
    export const transformLen = 1

    /**
     * 约束的线的宽度
     */
    export const jointLineWitdh = 10;

    /**
     * 4 份之一的线宽
     */
    export const hhJointLineWidth = jointLineWitdh / 2 * (3 / 4);

    /**
     * 原点
     */
    export const posO = new b2Vec2(0, 0);

    /**
     * x 坐标
     */
    export const xAxis = new b2Vec2(transformLen, 0);

    /**
     * y 坐标
     */
    export const yAxis = new b2Vec2(0, transformLen);

    /**
     * 碰撞点半径
     */
    export const contactPointRadius = 5;

    /**
     * b2 的形状缩放
     */
    export const b2ShapeScale = 20;
    /**
     * 颜色
     */
     export const color = {
        /**
         * 形状
         */
        shape: {
            /**
             * 外轮廓
             */
            outline: new cc.Color(100, 255, 100, 255),
            /**
             * 身体
             */
            body: new cc.Color(100, 255, 100, 100)
        },

        /**
         * 包围盒线条颜色
         */
        aabb: new cc.Color(0,0,255, 255),

        /**
         * 约束
         */
        joint: {
            /**
             * 起始颜色
             */
            areaBegin: new cc.Color(150, 150, 150, 255),

            /**
             * 结束颜色
             */
            areaEnd: new cc.Color(75, 75, 75, 255),

            /**
             * 关节点颜色
             */
            dot: new cc.Color(255, 255, 255, 255),
        },

        /**
         * 变换
         */
        transform: {
            /**
             * x 坐标
             */
            xColor: new cc.Color(255,0,0,255),
            /**
             * y 坐标
             */
            yColor: new cc.Color(0,255,0,255)
        },

        /**
         * 碰撞点的颜色
         */
        contactPoint: {
            dot: new cc.Color(255, 255, 100, 100)
        },

        /**
         * 粒子颜色
         */
        particle: {
            /**
             * 填充色
             */
            fill: new cc.Color(100, 100, 255, 100),
            /**
             * 描边色
             */
            stroke: new cc.Color(100, 100, 255, 255)
        },

        /**
         * 控制器颜色
         */
        controller: {
            /**
             * 浮力控制器
             */
            b2BuoyancyController: new cc.Color(255, 100, 100, 100)
        }
    }
}

export default configCenter;