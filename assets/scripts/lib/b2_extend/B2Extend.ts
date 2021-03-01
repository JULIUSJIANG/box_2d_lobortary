import { b2ChainShape, b2CircleShape, b2EdgeShape, b2Mat33, b2PolygonShape, b2Shape, b2ShapeType, b2Transform, b2Vec3 } from "../box2d_ts/Box2D";

namespace b2Extend {
    /**
     * 获取铰链
     * @param shape 
     */
    export function GetChainShape (shape: b2Shape): b2ChainShape {
        if (shape.GetType() == b2ShapeType.e_chainShape) {
            return shape as b2ChainShape;
        };
        return;
    }

    /**
     * 获取身上的线形
     * @param shape 
     */
    export function GetEdgeShape (shape: b2Shape): b2EdgeShape {
        if (shape.GetType() == b2ShapeType.e_edgeShape){
            return shape as b2EdgeShape;
        };
        return;
    }

    /**
     * 获取身上的多边形
     * @param shape 
     */
    export function GetPolygonShape (shape: b2Shape): b2PolygonShape {
        if (shape.GetType() == b2ShapeType.e_polygonShape) {
            return shape as b2PolygonShape;
        };
        return null;
    }

    /**
     * 获取身上的圆形
     * @param shape 
     */
    export function GetCircleShape (shape: b2Shape): b2CircleShape {
        if (shape.GetType() == b2ShapeType.e_circleShape) {
            return shape as b2CircleShape;
        };
        return null;
    }

    /**
     * 获取变换矩阵
     * @param trans 
     */
    export function GetTransMat (trans: b2Transform): b2Mat33 {
        var euler = trans.GetAngle();
        var pos = trans.GetPosition();
        return MergeMat(
            GetPosMat(pos.x, pos.y),
            GetRotateMat(euler)
        );
    }

    /**
     * 获取旋转矩阵
     * @param piEuler 
     */
    export function GetRotateMat (piEuler: number): b2Mat33 {
        let cosEuler = Math.cos(piEuler);
        let sinEuler = Math.sin(piEuler);
        let mat = new b2Mat33();
        // [
        //     cos, -sinEuler, 0,
        //     sin, cos, 0,
        //     0, 0, 1
        // ]
        mat.SetVVV(
            {
                x: cosEuler,
                y: sinEuler,
                z: 0
            },
            {
                x: -sinEuler,
                y: cosEuler,
                z: 0
            },
            {
                x: 0, 
                y: 0,
                z: 1
            }
        );
        return mat;
    }

    /**
     * 获取位置偏移矩阵
     * @param x 
     * @param y 
     */
    export function GetPosMat (x: number, y: number): b2Mat33 {
        let mat = new b2Mat33();
        // [
        //     1, 0, x,
        //     0, 1, y,
        //     0, 0, 1
        // ]
        mat.SetVVV(
            {
                x: 1, 
                y: 0, 
                z: 0
            },
            {
                x: 0, 
                y: 1, 
                z: 0
            },
            {
                x: x, 
                y: y, 
                z: 1
            }
        );
        return mat;
    }

    /**
     * 合并变换矩阵
     * @param matL 
     * @param matR 
     */
    export function MergeMat (matL: b2Mat33, matR: b2Mat33) {
        let columnX = new b2Vec3();
        let columnY = new b2Vec3();
        let columnZ = new b2Vec3();
        b2Mat33.MulM33V3(matL, matR.ex, columnX);
        b2Mat33.MulM33V3(matL, matR.ey, columnY);
        b2Mat33.MulM33V3(matL, matR.ez, columnZ);

        var freshMat = new b2Mat33();
        freshMat.SetVVV(
            columnX,
            columnY,
            columnZ
        );
        return freshMat;
    }

    /**
     * 获取矩阵的字符串
     * @param mat 
     */
    export function GetMatStr (mat: b2Mat33) {
        return `${mat.ex.x}, ${mat.ey.x}, ${mat.ez.x}\n${mat.ex.y}, ${mat.ey.y}, ${mat.ez.y}\n${mat.ex.z}, ${mat.ey.z}, ${mat.ez.z}`;
    }

    /**
     * 获取向量的字符串
     * @param v 
     */
    export function GetV3Str (v: b2Vec3) {
        return `${v.x}, ${v.y}, ${v.z}`
    }
}

export default b2Extend;