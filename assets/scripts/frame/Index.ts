
import ViewMain from '../game/view/ViewMain';
import ViewOrdinary from '../game/view/ViewOrdinary';
import jiang from './Jiang';
const { ccclass, property } = cc._decorator;

@ccclass 
export class Index extends cc.Component {

    @property({displayName: `放置UI实例预制体的容器`, type: cc.Node})
    public uiContainer: cc.Node = null as any;

    onLoad () {
        jiang.Init
        (
            this.uiContainer
        ) 
        .then(() => {
            jiang.mgrView.OpenNoArgsView(ViewMain.registMsg);
            // jiang.mgrView.OpenNoArgsView(ViewOrdinary.registMsg);
        });
    }
}
     