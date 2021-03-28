import RDClass from "./RDClass";

/**
 * 注册信息
 */
class RegistDefine<K, V extends RDClass<T>, T> {
    /**
     * 列表形式
     */
    list: T[] = [];
    /**
     * 字典形式
     */
    map: Map<K, T> = new Map();
    
    /**
     * 
     * @param originObject 存储了注册信息的对象
     * @param type 目标类
     * @param keyGetter 键提取器
     * @returns 
     */
    public constructor (
        originObject: Object,
        type: {new (t: T): V},
        keyGetter: (v: T) => K
    )
    {
        if (originObject == null) {
            return;
        };
        var vals = Object.values(originObject);
        vals.forEach(( val ) => {
            if (val instanceof type) {
                this.list.push(val.cont);
                this.map.set(keyGetter(val.cont), val.cont);
            };
        });
    }

    /**
     * 读取注册信息
     * @param k 
     * @returns 
     */
    public GetRegMsg (k: K) {
        return this.map.get(k);
    }
}

export default RegistDefine;