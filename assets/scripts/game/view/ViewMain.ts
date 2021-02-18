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
const {ccclass, property} = cc._decorator;

/**
 * 每个按钮记录
 */
interface BtnRec {
    info: string;
    b2WorldCreator: () => b2World
}

const btnData: BtnRec[] = [
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
        btnData.forEach((val, index) => {
            let inst = cc.instantiate(this.radioBtnPrefab).getComponent(RadioBtn);
            this.radioContainer.addChild(inst.node);
            inst.Init(
                val.info,
                index,
                evter
            );
            evter.On((id) => {
                if (id == index) {
                    // 切换世界
                    m_world = val.b2WorldCreator ? val.b2WorldCreator() : null;
                    // 进行画面绘制
                    Box2DDrawer.inst.DrawB2World(m_world);
                };
            });
        });
        evter.Call(0);

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
