import { b2Vec2, b2World } from "../lib/box2d_ts/Box2D";
import B2ExamCharacterCollision from "./view/b2_example/B2ExamCharacterCollision";
import B2ExamSparky from "./view/b2_example/B2ExamSparky";
import B2ExamTumber from "./view/b2_example/B2ExamTumber";
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
            info: `Shape Cast`,
            b2WorldCreator: null
        },
        {
            info: `Time of Impact` ,
            b2WorldCreator: null
        },
        {
            info: `Character Collision`,
            b2WorldCreator: B2ExamCharacterCollision
        },
        {
            info: `Tiles`,
            b2WorldCreator: null
        },
        {
            info: `Heavy on Light`,
            b2WorldCreator: null
        },
        {
            info: `Heavy on Light Two`,
            b2WorldCreator: null
        },
        {
            info: `Vertical Stack`,
            b2WorldCreator: null
        },
        {
            info: `Basic Slider Crank`,
            b2WorldCreator: null
        },
        {
            info: `Slider Crank`,
            b2WorldCreator: null
        },
        {
            info: `Sphere Stack`,
            b2WorldCreator: null
        },
        {
            info: `Convex Hull`,
            b2WorldCreator: null
        },
        {
            info: `Tumber`,
            b2WorldCreator: B2ExamTumber
        },
        {
            info: `Ray-Cast`,
            b2WorldCreator: null
        },
        {
            info: `Dump Shell`,
            b2WorldCreator: null
        },
        {
            info: `Apply Force`,
            b2WorldCreator: null
        },
        {
            info: `Continuous Test`,
            b2WorldCreator: null
        },
        {
            info: `Motor Joint`,
            b2WorldCreator: null
        },
        {
            info: `One-Sided Platform`,
            b2WorldCreator: null
        },
        {
            info: `Mobile`,
            b2WorldCreator: null
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
        }
    }

    /**
     * b2 的形状缩放
     */
    export const b2ShapeScale = 20;
}

export default configCenter;