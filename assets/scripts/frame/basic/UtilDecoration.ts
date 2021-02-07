namespace utilDecoration {
    /**
     * 用于存储记录
     */
    const SYM = Symbol("utilDecoration")

    /**
     * 确保记录存在
     * @param inst 
     */
    function CertainRec (inst: any): Map<string, Function> {
        if (!inst[SYM]) {
            inst[SYM] = new Map();
        };
        return inst[SYM];
    }

    /**
     * 函数去重
     * @param tag 
     * @param func 
     */
    export function Radio (tag: string, func: () => void) {
        var rec = CertainRec(this);
        return () => {
            if (rec.get(tag) == func) {
                return;
            };
            rec.set(tag, func);
            func();
        };
    }
}

export default utilDecoration;