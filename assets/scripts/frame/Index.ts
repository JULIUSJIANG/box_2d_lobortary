
import jiang from './Jiang';
const { ccclass, property } = cc._decorator;

@ccclass 
export class Index extends cc.Component {

    @property({displayName: `放置UI实例预制体的容器`, type: cc.Node})
    public uiContainer: cc.Node = null as any;

    onLoad () {
        this.getComponent(cc.Button)
        jiang.Init
        (
            this.uiContainer
        ) 
        .then(() => {

        });
    }
}
     