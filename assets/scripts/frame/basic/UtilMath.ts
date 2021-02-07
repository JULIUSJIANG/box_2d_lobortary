namespace utilMath {
    /**
     * 坐标
     */
    export interface Position {
        /**
         * x 坐标
         */
        x: number;
        /**
         * y 坐标
         */
        y: number;
    }

    /**
     * 移向
     * @param originX 当前 x
     * @param originY 当前 y
     * @param targetX 目标 x
     * @param targetY 目标 y
     * @param moveDistance 能移动的距离
     */
    export function MoveTo (originX: number, originY: number, targetX: number, targetY: number, moveDistance: number) {
        let vecX = targetX - originX;
        let vecY = targetY - originY;
        // 当前距离
        let currDistance = Math.sqrt(vecX**2 + vecY**2);
        // 当前距离比可以移动的距离要小，直接设置为目标距离
        if (currDistance <= moveDistance) {
            return {
                x: targetX,
                y: targetY
            };
        };
        // 向量的一定比例作为位移
        let scale = moveDistance / currDistance;
        return {
            x: originX + vecX * scale,
            y: originY + vecY * scale
        };
    }

    /**
     * 转向至
     * @param vecY 方向向量 y
     * @param vecX 方向向量 x
     * @param currRotation 当前欧拉角
     * @param turnRotaion 转向的欧拉角
     */
    export function TurnTo (vecY: number, vecX: number, currRotation: number, turnRotaion: number) {
        if (isNaN(vecX) || isNaN(vecY) || isNaN(currRotation) || isNaN(turnRotaion)) {
            console.warn(`参数非法`);
            return currRotation;
        };

        let targetEuler = Math.atan2(vecY, vecX) / Math.PI * 180;
        while (targetEuler < 0) {
            targetEuler += 360
        };

        while (360 < targetEuler) {
            targetEuler -= 360;
        };

        while (currRotation < 0) {
            currRotation += 360;
        };

        while (360 < currRotation) {
            currRotation -= 360;
        };

        // 目标方向角小于能够转向的角度，那么直接等于目标方向角
        if (Math.abs(targetEuler - currRotation) <= turnRotaion) {
            return targetEuler;
        };

        if (currRotation <= 180) {
            if (currRotation < targetEuler && targetEuler < currRotation + 180) {
                return currRotation + turnRotaion;
            }
            else {
                return currRotation - turnRotaion;
            };
        }
        else {
            if (targetEuler < currRotation && currRotation - 180 < targetEuler) {
                return currRotation - turnRotaion;
            }
            else {
                return currRotation + turnRotaion;
            };
        };
    }

    export const SIN90 = Math.sin(Math.PI / 2);

    export const COS90 = Math.cos(Math.PI / 2);

    export const SIN_90 = Math.sin(-Math.PI / 2);

    export const COS_90 = Math.cos(-Math.PI / 2);

    /**
     * 获取标准坐标系下右向量的 x 坐标
     * @param x 
     * @param y 
     */
    export function GetRightVecX (x: number, y: number) {
        return x * COS_90 - y * SIN_90
    }

    /**
     * 获取标准坐标系下右向量的 y 坐标
     * @param x 
     * @param y 
     */
    export function GetRightVecY (x: number, y: number) {
        return y * COS_90 + x * SIN_90
    }

    /**
     * 获取在某方向向量上投影的长度
     * @param axisX 
     * @param axisY 
     * @param vecX 
     * @param vecY 
     */
    export function GetShadowPos (axisX: number, axisY: number, vecX: number, vecY: number) {
        return axisX * vecX + axisY * vecY;
    }
}

export default utilMath;