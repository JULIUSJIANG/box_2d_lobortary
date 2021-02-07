import EventerWithArgs from "./EventerWithArgs";
import utilDecoration from "./UtilDecoration";

/**
 * 帧毫秒时钟
 */
export default class FrameMsClock {

    /**
     * 用于通知事件步进
     */
    public readonly evntMsPassed: EventerWithArgs<number> = new EventerWithArgs<number>();

    /**
     * 恢复
     */
    public Resume = utilDecoration.Radio(`pauseResume`, () => {
        this._lastTimer = Date.now();

        let step = () => {
            var promise = new Promise(( resolve ) => {
                this._lastTimeout = setTimeout(() => {
                    this.CheckTimePass();
                    resolve(null);
                }, 15 );
            });
            // 自循环
            promise.then( step );
        };
        step();
    });

    /**
     * 暂停
     */
    public Pause = utilDecoration.Radio(`pauseResume`, () => {
        // 暂停
        clearTimeout(this._lastTimeout);
        this.CheckTimePass();
    });

    /**
     * 上一个计时器
     */
    private _lastTimeout: any;

    /**
     * 上一次计时的时间戳
     */
    private _lastTimer: number;

    /**
     * 检查时间过了多久
     */
    private CheckTimePass () {
        let now = Date.now();
        let timeDistance = now - this._lastTimer;
        this._lastTimer = now;
        this.evntMsPassed.Call( timeDistance );
    }
}