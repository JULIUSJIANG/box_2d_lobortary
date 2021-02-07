import IdGeneration from "../../frame/basic/IdGeneration";

/**
 * 有参数事件
 */
export default class EventerWithArgs<T> {
    /**
     * 标识生成器
     */
    private _idGen = new IdGeneration();

    /**
     * 监听的记录
     */
    private _listenMap: Map<number, (t: T) => void> = new Map();

    /**
     * 单词监听
     * @param callBack 
     */
    public Once (callBack: (t: T) => void) {
        let onId: number;
        let wrap = (t: T) => {
            this.Off(onId);
            callBack(t);
        };
        onId = this.On(wrap);
    }

    /**
     * 开始监听
     * @param callBack 
     */
    public On (callBack: (t: T) => void) {
        let genId = this._idGen.GenId();
        this._listenMap.set(genId, callBack);
        return genId;
    }

    /**
     * 取消监听
     * @param id 
     */
    public Off (id: number) {
        this._listenMap.delete(id);
    }

    /**
     * 通知
     */
    public Call (t: T) {
        this._listenMap.forEach(( callback ) => {
            callback(t);
        });
    }
}