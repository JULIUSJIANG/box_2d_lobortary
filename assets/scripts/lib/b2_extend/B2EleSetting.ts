import { b2Vec2 } from "../box2d_ts/Box2D";

namespace b2EleSetting {
    /**
     * 线宽
     */
    export const lineWidth = 2;
    /**
     * 点半径
     */
    export const dotRadius = 3;
    /**
     * 表示很远的距离
     */
    export const farLen = 100;

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
            dot: new cc.Color(255, 255, 100, 255)
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

    /**
     * 变换的可视化信息
     */
    export const transformLen = 1

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
}

export default b2EleSetting;