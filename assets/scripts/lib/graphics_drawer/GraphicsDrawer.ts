import configCenter from "../../game/ConfigCenter";
import utilMath from "../../frame/basic/UtilMath";

/**
 * 画笔绘制工具类
 */
export default class GraphicsDrawer {

    /**
     * 实际用来绘图的画笔
     */
    private _graphics: cc.Graphics;

    /**
     * 坐标的缩放
     */
    private _posScale: number;

    /**
     * 
     * @param graphics 画笔
     * @param posScale 坐标的缩放
     */
    public constructor (
        graphics: cc.Graphics,
        posScale: number
    ) {
        this._graphics = graphics;
        this._posScale = posScale;
    }

    /**
     * 填充点集所包围的多边形
     * @param posList 点集
     * @param color 颜色
     */
    public FillPosSetAll (posList: utilMath.Position[], color: cc.Color) {
        this.FillPosOrigin(posList, posList.length, color);
    }

    /**
     * 填充点集所包围的多边形
     * @param posList 点集合
     * @param endIndex 终止的索引
     * @param color 颜色
     */
    public FillPosOrigin (posList: utilMath.Position[], endIndex: number, color: cc.Color) {
        this._graphics.fillColor = color;
        // 从起点出发
        this.GraphMoveTo(posList[0].x, posList[0].y);
        // 连接后面的
        for (let i = 1; i < endIndex; i++) {
            this.GraphLineTo(posList[i].x, posList[i].y);
        };
        // 回到起点
        this.GraphLineTo(posList[0].x, posList[0].y);
        this._graphics.fill();
    }

    /**
     * 连接点集里面所有的点
     * @param posList 点集
     * @param lineWidth 线宽
     * @param color 颜色
     */
    public CyclePosSetAll (posList: utilMath.Position[], lineWidth: number, color: cc.Color) {
        this.CyclePosOrigin(posList, posList.length, lineWidth, color);
    }

    /**
     * 连接点集里面所有的点
     * @param posList 点集合
     * @param endIndex 终止的索引
     * @param lineWidth 线宽
     * @param color 颜色
     */
    public CyclePosOrigin (posList: utilMath.Position[], endIndex: number, lineWidth: number, color: cc.Color) {
        for (let i = 0; i < endIndex; i++) {
            let currentPos = posList[i];
            let nextPos = posList[(i + 1) % posList.length]
            this.StraightLine(currentPos.x, currentPos.y, nextPos.x, nextPos.y, lineWidth, color);
        };
    }

    /**
     * 连接点
     * @param posList 
     * @param lineWidth 
     * @param color 
     */
    public ConnectPosSetAll (posList: utilMath.Position[], lineWidth: number, color: cc.Color) {
        this.ConnectPosOrigin(posList, posList.length, lineWidth, color);
    }

    /**
     * 连接点
     * @param posList 点集合
     * @param endIndex 终止的索引
     * @param lineWidth 线宽
     * @param color 颜色
     */
    public ConnectPosOrigin (posList: utilMath.Position[], endIndex: number, lineWidth: number, color: cc.Color) {
        for (let i = 0; i < endIndex - 1; i++) {
            let currentPos = posList[i];
            let nextPos = posList[(i + 1) % posList.length]
            this.StraightLine(currentPos.x, currentPos.y, nextPos.x, nextPos.y, lineWidth, color);
        };
    }

    /**
     * 填充一个圆
     * @param x 目标的 x 坐标
     * @param y 目标的 y 坐标
     * @param radius 半径
     * @param color 
     */
    public RoundFill (
        x: number,
        y: number,

        radius: number,
        color: cc.Color
    ) {
        this._graphics.fillColor = color;
        this.GraphArc(x, y, radius);
        this._graphics.fill();
    }

    /**
     * 画出一个圆
     * @param x 目标位置 x
     * @param y 目标位置 y
     * @param lineWidth 线宽
     * @param color 颜色
     */
    public RoundLine (
        x: number,
        y: number,

        radius: number,

        lineWidth: number,
        color: cc.Color
    ) {
        this._graphics.strokeColor = color;
        this._graphics.lineWidth = lineWidth * this._posScale;
        this.GraphArc(x, y, radius);
        this._graphics.stroke();
    }

    /**
     * 绘制线段
     * @param ax 起始点 x 坐标
     * @param ay 起始点 y 坐标
     * @param bx 终点 x 坐标
     * @param by 终点 y 坐标
     * @param lineWidth 线宽
     * @param color 线颜色
     */
    public StraightLine (
        ax: number,
        ay: number,
        
        bx: number,
        by: number,

        lineWidth: number,
        color: cc.Color
    ) {
        this._graphics.strokeColor = color;
        this._graphics.lineWidth = lineWidth * this._posScale;
        this.GraphMoveTo(ax, ay);
        this.GraphLineTo(bx, by);
        this._graphics.stroke();
    }

    /**
     * 获取某像素尺寸在当前设置下数值应当为多少
     * @param size 
     */
    public Pixel (size: number) {
        return size / this._posScale;
    }

    /**
     * 移动至
     * @param x 目标坐标 x
     * @param y 目标坐标 y
     */
    private GraphMoveTo (x: number, y: number) {
        this._graphics.moveTo(x * this._posScale, y * this._posScale);
    }

    /**
     * 直线至
     * @param x 目标坐标 x
     * @param y 目标坐标 y
     */
    private GraphLineTo (x: number, y: number) {
        this._graphics.lineTo(x * this._posScale, y * this._posScale);
    }

    /**
     * 在某个地方画圈
     * @param x 目标坐标 x
     * @param y 目标坐标 y
     * @param radius 半径
     */
    private GraphArc(x: number, y: number, radius: number) {
        this._graphics.arc(x * this._posScale, y * this._posScale, radius * this._posScale, 0, 360, true);
    }
}