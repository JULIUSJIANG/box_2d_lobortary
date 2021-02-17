// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import EventerWithArgs from "../../frame/basic/EventerWithArgs";

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

    public Init (
        info: string,
        id: number,
        evter: EventerWithArgs<number>
    ) {
        this.label.string = info;
        evter.On(( arg ) => {
            this.touchNode.active = arg != id;
        });
        this.touchNode.on(cc.Node.EventType.TOUCH_START, () => {
            evter.Call(id);
        });
    }
}
