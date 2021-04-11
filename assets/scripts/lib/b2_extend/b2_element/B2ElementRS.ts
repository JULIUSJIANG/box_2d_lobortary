import { b2World } from "../../box2d_ts/Box2D";
import GraphicsDrawer from "../../graphics_drawer/GraphicsDrawer";
import RDClass from "../../regist_define/RDClass";
import b2ElementExtend from "./B2ElementExtend";

/**
 * b2 世界元素注册信息
 */
class B2ElementRS<T> extends RDClass<B2ElementRS.Cont<T>> {
    /**
     * 绘制列表
     */
    public static eleDrawFuncList: Array<(b2w: b2World, gd: GraphicsDrawer, drawTag: number) => void> = [];

    constructor (cont: B2ElementRS.Cont<T>) {
        super(cont);
        B2ElementRS.eleDrawFuncList.push(( b2w, gd, drawDag ) => {
            if (!(drawDag & cont.drawAbleTag)) {
                return;
            };
            let list = cont.arrayGetter(b2w);
            list.forEach(( ele ) => {
                cont.tDrawer(ele, gd);
            });
        });
    }
}

namespace B2ElementRS {
    export interface Cont<T> {
        /**
         * 表示绘制许可的标签
         */
        drawAbleTag: number;
        /**
         * 从 b2 world 提取目标集合的方法
         */
        arrayGetter: (b2W: b2World) => T[];
        /**
         * 具体的绘制方法
         */
        tDrawer: (t: T, gd: GraphicsDrawer) => void;
    }
}

export default B2ElementRS;