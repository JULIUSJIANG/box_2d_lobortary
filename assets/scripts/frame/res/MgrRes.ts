import ArgsPromiseCtrl from "../basic/ArgsPromiseCtrl";

/**
 * 资源管理器
 */
class MgrRes {
    public static inst = new MgrRes();

    public Init()
    {
        return [
            Promise.resolve()
        ]
    }

    private _prefabCtrlRec: Map<string, MgrRes.AssetLoadCtrl<cc.Prefab>> = new Map();

    /**
     * 确保下载某个预制体
     * @param resPath 
     */
    public CertainLoadPrefab (resPath: string): MgrRes.AssetLoadCtrl<cc.Prefab> {
        var ctrl = this._prefabCtrlRec.get(resPath);
        if (ctrl == null) {
            ctrl = this.DoLoadPrefab(resPath);
            this._prefabCtrlRec.set(resPath, ctrl);
        };
        return ctrl;
    }

    /**
     * 确切进行某个预制体的下载
     * @param resPath 
     */
    private DoLoadPrefab (resPath: string): MgrRes.AssetLoadCtrl<cc.Prefab> {
        var loadingPromiseCtrl = new ArgsPromiseCtrl<cc.Prefab>();
        cc.resources.load<cc.Prefab>(resPath, (err: any) => {
            if (err) {
                loadingPromiseCtrl.reject(err);
                return;
            }
            else {
                loadingPromiseCtrl.resolve(cc.resources.get<cc.Prefab>(resPath) as any);
            };
        });
        return new MgrRes.AssetLoadCtrl<cc.Prefab>(loadingPromiseCtrl.promise);
    }

    private _jsonCtrlRec: Map<string, MgrRes.AssetLoadCtrl<cc.JsonAsset>> = new Map();

    public CertainLoadJson (resPath: string) {
        var ctrl = this._jsonCtrlRec.get(resPath);
        if (ctrl == null) {
            ctrl = this.DoLoadJson(resPath);
            this._jsonCtrlRec.set(resPath, ctrl);
        };
        return ctrl;
    }

    private DoLoadJson (resPath: string): MgrRes.AssetLoadCtrl<cc.JsonAsset> {
        var loadingPromiseCtrl = new ArgsPromiseCtrl<cc.JsonAsset>();
        cc.resources.load<cc.JsonAsset>(resPath, (err: any) => {
            if (err) {
                loadingPromiseCtrl.reject(err);
                return;
            }
            else {
                loadingPromiseCtrl.resolve(cc.resources.get<cc.JsonAsset>(resPath) as any);
            };
        });
        return new MgrRes.AssetLoadCtrl<cc.JsonAsset>(loadingPromiseCtrl.promise);
    }
}

namespace MgrRes {
    export class AssetLoadCtrl<T extends cc.Asset> {
        loadingPromise: Promise<T> = null as any;
        public constructor (loadingPromise: Promise<T>) {
            this.loadingPromise = loadingPromise;
        }
    }
}

export default MgrRes;