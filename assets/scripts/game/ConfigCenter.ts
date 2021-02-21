import { b2World } from "../lib/box2d_ts/Box2D";
import B2ExamTumber from "./view/b2_example/B2ExamTumber";

namespace configCenter {
     
    /**
     * 每个按钮记录
     */
    export interface BtnRec {
        info: string;
        b2WorldCreator: () => b2World
    }

    export const examArr: BtnRec[] = [
        {
            info: `Sparky`,
            b2WorldCreator: null
        },
        {
            info: `Shape Cast`,
            b2WorldCreator: null
        },
        {
            info: `Time of Impact` ,
            b2WorldCreator: null
        },
        {
            info: `Character Collision`,
            b2WorldCreator: null
        },
        {
            info: `Tiles`,
            b2WorldCreator: null
        },
        {
            info: `Heavy on Light`,
            b2WorldCreator: null
        },
        {
            info: `Heavy on Light Two`,
            b2WorldCreator: null
        },
        {
            info: `Vertical Stack`,
            b2WorldCreator: null
        },
        {
            info: `Basic Slider Crank`,
            b2WorldCreator: null
        },
        {
            info: `Slider Crank`,
            b2WorldCreator: null
        },
        {
            info: `Sphere Stack`,
            b2WorldCreator: null
        },
        {
            info: `Convex Hull`,
            b2WorldCreator: null
        },
        {
            info: `Tumber`,
            b2WorldCreator: B2ExamTumber
        },
        {
            info: `Ray-Cast`,
            b2WorldCreator: null
        },
        {
            info: `Dump Shell`,
            b2WorldCreator: null
        },
        {
            info: `Apply Force`,
            b2WorldCreator: null
        },
        {
            info: `Continuous Test`,
            b2WorldCreator: null
        },
        {
            info: `Motor Joint`,
            b2WorldCreator: null
        },
        {
            info: `One-Sided Platform`,
            b2WorldCreator: null
        },
        {
            info: `Mobile`,
            b2WorldCreator: null
        }
    ]

    
    export interface CheckBoxRec {
        info: string;
    }

    export const checkBoxData: CheckBoxRec[] = [
        {
            info: `Shape`
        },
        {
            info: `AABB`
        }
    ]
}

export default configCenter;