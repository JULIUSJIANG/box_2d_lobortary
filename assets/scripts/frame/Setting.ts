import MgrView from "./view/MgrView";
import MgrViewNoArgsRegistMsg from "./view/ViewRegistMsg";
import MgrViewWithArgsRegistMsg from "./view/MgrViewWithArgsRegistMsg";
import ViewLoading from "./com/ViewLoading";

namespace Setting {
    /**
     * ui 的预制体所在的目录
     */
    export const uiPrefabFolderDir = `view`;

    /**
     * 加载界面
     */
    export const registMsg: MgrViewWithArgsRegistMsg<ViewLoading, Promise<any>[]> = new MgrViewWithArgsRegistMsg<ViewLoading, Promise<any>[]>(`loading`, () => ViewLoading);
} 

export default Setting;