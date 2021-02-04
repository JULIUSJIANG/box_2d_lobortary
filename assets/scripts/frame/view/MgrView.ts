import ArgsPromiseCtrl from '../basic/ArgsPromiseCtrl';
import MgrRes from '../res/MgrRes';
import Setting from '../Setting';
import MgrViewInitData from './MgrViewInitData';
import MgrViewNoArgsRegistMsg from './ViewRegistMsg';
import MgrViewNoArgsViewBasic from './MgrViewNoArgsViewBasic';
import MgrViewOpenCtrl from './MgrViewOpenCtrl';
import MgrViewWithArgsRegistMsg from './MgrViewWithArgsRegistMsg';
import MgrViewWithArgsViewBasic from './MgrViewWithArgsViewBasic';

/**
 * 视图管理器
 */
class MgrView 
{
    public static inst = new MgrView();

    public initData: MgrViewInitData = null as any;

    public Init 
    (
        initData: MgrViewInitData
    ) 
    {
        this.initData = initData;

        return [
            Promise.resolve()
        ];
    }

    /**
     * 打开加载界面并且进行封锁与等到
     * @param promiseList 
     */
    public Waiting (promiseList: Promise<any>[]) {
        
    }

    /**
     * 打开无参数窗口
     * @param registedItem 
     */
    public OpenNoArgsView<T extends MgrViewNoArgsViewBasic> (registedItem: MgrViewNoArgsRegistMsg<T>): MgrViewOpenCtrl<T> {
        var promiseCtrl = new ArgsPromiseCtrl<T>();
        var ctrl = new MgrViewOpenCtrl<T>(promiseCtrl.promise);
        MgrRes.inst.CertainLoadPrefab( `${Setting.uiPrefabFolderDir}/${registedItem.prefabName}` ).loadingPromise
        .then((prefab) => {
            // 如果已经清除了，不创建实例
            if (ctrl.ctrlClear.isResolved) {
                return;
            };

            var viewInst = cc.instantiate(prefab);

            // 当触发清除时候，界面节点就清除了
            ctrl.ctrlClear.promise
                .then(() => {
                    viewInst.destroy();
                });

            this.initData.container.addChild(viewInst);
            var viewCom: T = viewInst.getComponent(registedItem.viewType()) as any;
            viewCom.SetInitData(ctrl);
            promiseCtrl.resolve(viewCom);
        })
        .catch((err) => {
            promiseCtrl.reject(err);
        });
        return ctrl;
    }

    /**
     * 打开有参数窗口
     * @param registedMsg 
     * @param u 
     */
    public OpenWithArgsView<T extends MgrViewWithArgsViewBasic<U>, U> (registedMsg: MgrViewWithArgsRegistMsg<T, U>, u: U): MgrViewOpenCtrl<T> {
        var result = this.OpenNoArgsView(registedMsg);
        result.promise.then((com) => {
            (com as T).OnFillData(u);
        });
        return result as any;
    }
}

export default MgrView;