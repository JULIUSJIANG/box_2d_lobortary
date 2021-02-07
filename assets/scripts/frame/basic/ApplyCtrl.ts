import IdGeneration from "../../frame/basic/IdGeneration";
import utilCollection from "../../frame/basic/UtilCollection";
import EventerNoArgs from "./EventerNoArgs";
import EventerWithArgs from "./EventerWithArgs";

export default class AppCtrl<T> {
    /**
     * 应用的记录
     */
    public appRec: Map<number, T> = new Map();
    /**
     * id 生成器
     */
    private _idGen: IdGeneration = new IdGeneration();
    /**
     * 用于通知变化的事件管理器
     */
    public readonly evntChanged = new EventerNoArgs();
    /**
     * 用于通知已经应用了的事件管理器
     */
    public readonly evntApped = new EventerWithArgs<number>();
    /**
     * 用于通知已经取消了的事件管理器
     */
    public readonly evetCanceled = new EventerWithArgs<number>();

    /**
     * 应用变化
     * @param t 
     */
    public Apply (t: T) {
        let id = this._idGen.GenId();
        this.appRec.set(id, t);
        this.evntApped.Call(id);
        this.evntChanged.Call();
        return id;
    }

    /**
     * 取消变化
     * @param id 
     */
    public Cancel (id: number) {
        if (!this.appRec.has( id )) {
            return;
        };
        this.appRec.delete(id);
        this.evetCanceled.Call(id);
        this.evntChanged.Call();
    }
}