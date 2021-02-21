// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import ViewRegistMsg from '../../frame/view/ViewRegistMsg';
import MgrViewNoArgsViewBasic from "../../frame/view/MgrViewNoArgsViewBasic";
import RadioBtn from '../component/RadioBtn';
import EventerWithArgs from '../../frame/basic/EventerWithArgs';
import { b2BodyDef, b2BodyType, b2PolygonShape, b2World } from '../../lib/box2d_ts/Box2D';
import B2ExamTumber from './b2_example/B2ExamTumber';
import FrameMsClock from '../../frame/basic/FrameMsClock';
import Box2DDrawer from '../component/Box2DDrawer';
import dataCenter from '../DataCenter';
import configCenter from '../ConfigCenter';
const {ccclass, property} = cc._decorator;

@ccclass
export default class ViewMain extends MgrViewNoArgsViewBasic {

    public static registMsg: ViewRegistMsg<ViewMain> = new ViewRegistMsg<ViewMain>(`view_main`, () => ViewMain);

    @property(cc.Node)
    private radioContainer: cc.Node = null;

    @property(cc.Prefab)
    private radioBtnPrefab: cc.Prefab = null;

    public onLoad () {
        let m_world: b2World;
        this.radioContainer.removeAllChildren();
        let evter = new EventerWithArgs<number>();
        let rbList: RadioBtn[] = [];
        configCenter.examArr.forEach(( cfg, index ) => {
            let inst = cc.instantiate(this.radioBtnPrefab).getComponent(RadioBtn);
            this.radioContainer.addChild(inst.node);
            inst.Init(
                index
            );
            inst.evter.On(() => {
                evter.Call(index);
            });
            rbList.push(inst);
        });
        evter.On((index) => {
            dataCenter.vo.selectExam = index;
            var current = configCenter.examArr[index];
            // 切换世界
            m_world = current.b2WorldCreator ? current.b2WorldCreator() : null;
            // 进行画面绘制
            Box2DDrawer.inst.DrawB2World(m_world);
            rbList.forEach(( rb ) => {
                rb.Refresh();
            });
        });
        evter.Call(dataCenter.vo.selectExam);

        var frameMsClock = new FrameMsClock();
        frameMsClock.evntMsPassed.On((passedMs) => {
            // 忽略为空的情况
            if (m_world == null) {
                return;
            };
            let stepTme = 16 < passedMs ? 0.016 : passedMs / 1000;
            m_world.Step(stepTme, 1, 1, 1);
            Box2DDrawer.inst.DrawB2World(m_world);
        });
        frameMsClock.Resume();
    }
}
