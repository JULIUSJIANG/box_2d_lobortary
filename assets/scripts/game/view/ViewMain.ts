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
const {ccclass, property} = cc._decorator;

/**
 * 每个按钮记录
 */
interface BtnRec {
    info: string;
}

const btnData: BtnRec[] = [
    {
        info: `Sparky`
    },
    {
        info: `Shape Cast`
    },
    {
        info: `Time of Impact` 
    },
    {
        info: `Character Collision`
    },
    {
        info: `Tiles`
    },
    {
        info: `Heavy on Light`
    },
    {
        info: `Heavy on Light Two`
    },
    {
        info: `Vertical Stack`
    },
    {
        info: `Basic Slider Crank`
    },
    {
        info: `Slider Crank`
    },
    {
        info: `Sphere Stack`
    },
    {
        info: `Convex Hull`
    },
    {
        info: `Tumber`
    },
    {
        info: `Ray-Cast`
    },
    {
        info: `Dump Shell`
    },
    {
        info: `Apply Force`
    },
    {
        info: `Continuous Test`
    },
    {
        info: `Motor Joint`
    },
    {
        info: `One-Sided Platform`
    },
    {
        info: `Mobile`
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
        });
        evter.Call(0);
    }
}
