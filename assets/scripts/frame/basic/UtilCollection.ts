namespace utilCollection {
    /**
     * 拷贝集合
     * @param set 
     */
    export function CloneSet<T> (set: Set<T>) {
        var cloned = new Set<T>();
        set.forEach(( item ) => {
            cloned.add( item );
        });
        return cloned;
    }

    /**
     * 获取字典所包含的元素集合
     * @param map 
     */
    export function GetMapCollection<V> (map: Map<unknown,V>) {
        var coll: V[] = [];
        map.forEach((val) => {
            coll.push( val );
        });
        return coll;
    }

    /**
     * 获取元素
     * @param set 
     */
    export function GetSetCollection<T> (set: Set<T>) {
        var coll: T[] = [];
        set.forEach((val) => {
            coll.push(val);
        });
        return coll;
    }
}

export default utilCollection;