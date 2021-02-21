import utilCollection from "./UtilCollection";

namespace utilObject {
    export function Merge<T> (objA: T, objB: T): T {
        if (objA == null) {
            return Clone(objB);
        };
        if (objB == null) {
            return Clone(objA);
        };
        // 到这里，就可以不用考虑为空的情况了
        let typeA = typeof(objA);
        let typeB = typeof(objB);

        // 如果类型不对，以 B 的为准
        if (typeA != typeB) {
            return Clone(objB);
        };

        // B 是数组，以 B 的为准
        if (Array.isArray(objB)) {
            return Clone(objB);
        };

        // 如果是对象，那么按键合并
        if (typeA == "object") {
            let inst = Clone(objA);

            let keySet = new Set<string>();
            let keySetA = utilCollection.GetCollSet(Object.keys(objA));
            keySetA.forEach(( ele ) => {
                keySet.add(ele);
            });
            let keySetB = utilCollection.GetCollSet(Object.keys(objB));
            keySetB.forEach(( ele ) => {
                keySet.add(ele);
            });

            keySet.forEach(( ele ) => {
                inst[ele] = Merge(inst[ele], objB[ele]);
            });
            return inst;
        };

        return Clone(objB);
    }

    /**
     * 拷贝
     * @param obj 
     */
    export function Clone<T> (obj: T): T {
        return JSON.parse(JSON.stringify(obj));
    }
}

export default utilObject;