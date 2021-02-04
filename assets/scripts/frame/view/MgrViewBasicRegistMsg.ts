import MgrViewNoArgsViewBasic from "./MgrViewNoArgsViewBasic";

class MgrViewBasicRegistMsg<T extends MgrViewNoArgsViewBasic> {
    public prefabName: string = null as any;
    public viewType: () => {prototype: MgrViewNoArgsViewBasic} = null as any;
    public constructor
    (
        prefabName: string,
        viewType: () => typeof MgrViewNoArgsViewBasic
    )
    {
        this.prefabName = prefabName;
        this.viewType = viewType;
    }
}

export default MgrViewBasicRegistMsg;