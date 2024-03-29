// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import EventerNoArgs from "../../frame/basic/EventerNoArgs";
import EventerWithArgs from "../../frame/basic/EventerWithArgs";
import configCenter from "../ConfigCenter";
import dataCenter from "../DataCenter";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RadioBtn extends cc.Component {
    /**
     * 按钮的文本组件
     */
    @property(cc.Label)
    private label: cc.Label = null;

    /**
     * 用于交互的节点
     */
    @property(cc.Node)
    private touchNode: cc.Node = null;

    /**
     * 无参数事件广播器
     */
    public evter: EventerNoArgs = new EventerNoArgs();

    /**
     * 索引
     */
    private index: number;

    public Init (
        index: number
    ) {
        this.index = index;
        let cfg = configCenter.examArr[index];
        this.label.string = `${cfg.info}`;
        this.touchNode.on(cc.Node.EventType.TOUCH_START, () => {
            this.evter.Call();
        });
    }

    public Refresh () {
        this.touchNode.active = this.index != dataCenter.vo.selectExam;
    }
}
