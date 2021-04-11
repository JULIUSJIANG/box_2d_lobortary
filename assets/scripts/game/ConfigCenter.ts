import { b2Vec2, b2World } from "../lib/box2d_ts/Box2D";
import B2ExamBuoyancy from "./view/b2_example/B2ExamBuoyancy";
import B2ExamCantilever from "./view/b2_example/B2ExamCantilever";
import B2ExamCharacterCollision from "./view/b2_example/B2ExamCharacterCollision";
import B2ExamConveyorBelt from "./view/b2_example/B2ExamConveyorBelt";
import B2ExamEdgeShapes from "./view/b2_example/B2ExamEdgeShapes";
import B2ExamGearsA from "./view/b2_example/B2ExamGearsA";
import B2ExamGearsB from "./view/b2_example/B2ExamGearsB";
import B2ExamMobile from "./view/b2_example/B2ExamMobile";
import B2ExamMobileBalanced from "./view/b2_example/B2ExamMobileBalanced";
import B2ExamMotorJoint from "./view/b2_example/B2ExamMotorJoint";
import B2ExamOneSidePlatform from "./view/b2_example/B2ExamOneSidePlatform";
import B2ExamParticleCollisionFilter from "./view/b2_example/B2ExamParticleCollisionFilter";
import B2ExamPolyCollision from "./view/b2_example/B2ExamPolyCollision";
import B2ExamPulleys from "./view/b2_example/B2ExamPulleys";
import B2ExamRope from "./view/b2_example/B2ExamRope";
import B2ExamSegway from "./view/b2_example/B2ExamSegway";
import B2ExamSensorTest from "./view/b2_example/B2ExamSensorTest";
import B2ExamSparky from "./view/b2_example/B2ExamSparky";
import B2ExamTheoJansen from "./view/b2_example/B2ExamTheoJansen";
import B2ExamTumber from "./view/b2_example/B2ExamTumber";
import B2ExamVaryingRestitution from "./view/b2_example/B2ExamVaryingRestitution";
import B2ExamWaveMachine from "./view/b2_example/B2ExamWaveMachine";
import B2ExamWeb from "./view/b2_example/B2ExamWeb";
import ExamContext from "./view/ExamContext";

namespace configCenter {
     
    /**
     * 每个按钮记录
     */
    export interface BtnRec {
        info: string;
        b2WorldCreator: () => ExamContext
    }

    /**
     * 示例的合集
     */
    export const examArr: BtnRec[] = [
        {
            info: `Sparky`,
            b2WorldCreator: B2ExamSparky
        },
        {
            info: `Character Collision`,
            b2WorldCreator: B2ExamCharacterCollision
        },
        {
            info: `Tumber`,
            b2WorldCreator: B2ExamTumber
        },
        {
            info: `Motor Joint`,
            b2WorldCreator: B2ExamMotorJoint
        },
        {
            info: `Mobile`,
            b2WorldCreator: B2ExamMobile
        },
        {
            info: `Mobile Balanced`,
            b2WorldCreator: B2ExamMobileBalanced
        },
        {
            info: `Segway`,
            b2WorldCreator: B2ExamSegway
        },
        {
            info: `Wave Machine`,
            b2WorldCreator: B2ExamWaveMachine
        },
        {
            info: `Web`,
            b2WorldCreator: B2ExamWeb
        },
        {
            info: `Edge Shapes`,
            b2WorldCreator: B2ExamEdgeShapes
        },
        {
            info: `Buoyancy`,
            b2WorldCreator: B2ExamBuoyancy
        },
        {
            info: `Poly Collision`,
            b2WorldCreator: B2ExamPolyCollision
        },
        {
            info: `Conveyor Belt`,
            b2WorldCreator: B2ExamConveyorBelt
        },
        {
            info: `One Side Platform`,
            b2WorldCreator: B2ExamOneSidePlatform
        },
        {
            info: `Gears A`,
            b2WorldCreator: B2ExamGearsA
        },
        {
            info: `Gears B`,
            b2WorldCreator: B2ExamGearsB
        },
        {
            info: `Varying Restitution`,
            b2WorldCreator: B2ExamVaryingRestitution
        },
        {
            info: `Particle Collision Filter`,
            b2WorldCreator: B2ExamParticleCollisionFilter
        },
        {
            info: `Theo Jansen`,
            b2WorldCreator: B2ExamTheoJansen
        },
        {
            info: `Sensor Test`,
            b2WorldCreator: B2ExamSensorTest
        },
        {
            info: `Rope`,
            b2WorldCreator: B2ExamRope
        },
        {
            info: `Cantilevel`,
            b2WorldCreator: B2ExamCantilever
        },
        {
            info: `Pulleys`,
            b2WorldCreator: B2ExamPulleys
        }
    ]

    /**
     * 画面元素单元的信息结构
     */
    export interface CheckBoxRec {
        /**
         * 信息
         */
        info: string;
        /**
         * 标签
         */
        tag: number;
    }
    
    /**
     * b2 的形状缩放
     */
    export const b2ShapeScale = 20;
}

export default configCenter;