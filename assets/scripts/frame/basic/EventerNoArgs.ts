import IdGeneration from "../../frame/basic/IdGeneration";

/**
 * 无参数事件
 */
export default class EventerNoArgs {
    /**
     * 标识生成器
     */
    private _idGen = new IdGeneration();

    /**
     * 监听的记录
     */
    private _listenMap: Map<number, Function> = new Map();

    /**
     * 单词监听
     * @param callBack 
     */
    public Once (callBack: () => void) {
        let onId: number;
        let wrap = () => {
            this.Off(onId);
            callBack();
        };
        onId = this.On(wrap);
    }

    /**
     * 开始监听
     * @param callBack 
     */
    public On (callBack: () => void) {
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
    public Call () {
        this._listenMap.forEach(( callback ) => {
            callback();
        });
    }
}