import EventerNoArgs from "../../frame/basic/EventerNoArgs";
import EventerWithArgs from "../../frame/basic/EventerWithArgs";
import { b2World } from "../../lib/box2d_ts/Box2D";

export default class ExamContext {
    public _b2w: b2World;

    public evterUpdate: EventerWithArgs<number> = new EventerWithArgs<number>();

    public constructor (b2w: b2World) {
        this._b2w = b2w;
        this.evterUpdate.On(( passedMs ) => {
            // 每次最大推进值为 16
            passedMs = passedMs < 16 ? passedMs : 16;
            b2w.Step( passedMs, 1, 1, 1 );
        });
    }
}