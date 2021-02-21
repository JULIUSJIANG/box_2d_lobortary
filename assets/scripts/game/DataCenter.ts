import utilObject from "../frame/basic/UtilObject";

const STORAGE_KEY = `DataCenter`;

namespace dataCenter {
    export let vo = {
        
        selectExam: 0,

        enableRec: {}
    }
}

window[`dc`] = dataCenter;

// 程序运行期间，数据都在内存里面
let rec = localStorage.getItem(STORAGE_KEY);
let dataRec = (rec != null && rec != ``) ? JSON.parse(rec) : null;
dataCenter.vo = utilObject.Merge(dataCenter.vo, dataRec);
cc.game.on(cc.game.EVENT_HIDE, () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataCenter.vo));
});

export default dataCenter;