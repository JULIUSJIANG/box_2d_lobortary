import { b2Vec2, b2World } from "../lib/box2d_ts/Box2D";
import B2ExamTumber from "./view/b2_example/B2ExamTumber";

namespace configCenter {
     
    /**
     * 每个按钮记录
     */
    export interface BtnRec {
        info: string;
        b2WorldCreator: () => b2World
    }

    /**
     * 示例的合集
     */
    export const examArr: BtnRec[] = [
        {
            info: `Sparky`,
            b2WorldCreator: null
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
            b2WorldCreator: null
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
    export const DRAW_SHAPE = 2**0;

    /**
     * 绘制碰撞盒的标签
     */
    export const DRAW_AABB = 2**1;

    /**
     * 绘制约束的标签
     */
    export const DRAW_JOINTS = 2**2

    /**
     * 绘制变换的标签
     */
    export const DRAW_CENTER_OF_MASSES = 2**3;

    /**
     * 画面元素的集合
     */
    export const checkBoxData: CheckBoxRec[] = [
        {
            info: `Shapes`,
            tag: DRAW_SHAPE
        },
        {
            info: `AABBs`,
            tag: DRAW_AABB
        },
        {
            info: `Joints`,
            tag: DRAW_JOINTS
        },
        {
            info: `Center of Masses`,
            tag: DRAW_CENTER_OF_MASSES
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
     * 颜色
     */
    export const color = {
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

        aabb: new cc.Color(0,0,255, 255),

        joint: {
            area: new cc.Color(100, 100, 100, 255),
            dot: new cc.Color(255, 255, 255, 255),
        },

        transform: {
            xColor: new cc.Color(255,0,0,255),
            yColor: new cc.Color(0,255,0,255)
        }
    }

    /**
     * b2 的形状缩放
     */
    export const b2ShapeScale = 20;
}

export default configCenter;