// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import EventerNoArgs from "../../frame/basic/EventerNoArgs";
import EventerWithArgs from "../../frame/basic/EventerWithArgs";
import b2ElementExtend from "../../lib/b2_extend/b2_element/B2ElementExtend";
import configCenter from "../ConfigCenter";
import dataCenter from "../DataCenter";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CheckBox extends cc.Component {
    /**
     * 按钮的文本组件
     */
    @property(cc.Label)
    private label: cc.Label = null;

    /**
     * 按钮的文本组件
     */
    @property(cc.Label)
    private actLab: cc.Label = null;

    /**
     * 表明当前是激活状态的节点
     */
    @property(cc.Node)
    private activeNode: cc.Node = null;

    /**
     * 用于交互的节点
     */
    @property(cc.Node)
    private touchNode: cc.Node = null;

    /**
     * 对应的索引
     */
    private index: number;

    public readonly evter: EventerNoArgs = new EventerNoArgs();

    public Init (
        index: number
    ) {
        this.index = index;
        let cfg = b2ElementExtend.rd.list[index];
        let name = b2ElementExtend.rd.nameDict.get(cfg);
        this.label.string = this.actLab.string = `${name}`;
        this.touchNode.on(cc.Node.EventType.TOUCH_START, () => {
            this.evter.Call();
        });
    }

    public Refresh () {
        this.activeNode.active = dataCenter.vo.enableRec[this.index];
    }
}
