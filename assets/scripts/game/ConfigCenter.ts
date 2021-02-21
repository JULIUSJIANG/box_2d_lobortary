import { b2World } from "../lib/box2d_ts/Box2D";
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
     * 绘制形状的标签
     */
    export const DRAW_SHAPE = 2**0;

    /**
     * 绘制碰撞盒的标签
     */
    export const DRAW_AABB = 2**1;

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
     * 画面元素的集合
     */
    export const checkBoxData: CheckBoxRec[] = [
        {
            info: `Shape`,
            tag: DRAW_SHAPE
        },
        {
            info: `AABB`,
            tag: DRAW_AABB
        }
    ]

    /**
     * 颜色
     */
    export const color = {
        shape: {
            /**
             * 外轮廓
             */
            outline: new cc.Color(255, 255, 255, 255),
            /**
             * 身体
             */
            body: new cc.Color(255, 255, 255, 100)
        },

        aabb: new cc.Color(0,0,255, 255)
    }

    /**
     * b2 的形状缩放
     */
    export const b2ShapeScale = 20;
}

export default configCenter;