import { b2BodyDef, b2BodyType, b2CircleShape, b2Clamp, b2DegToRad, b2EdgeShape, b2FixtureDef, b2PolygonShape, b2RevoluteJointDef, b2World } from "../../../lib/box2d_ts/Box2D";
import ExamContext from "../ExamContext";

class PIDController {
    public gainP: number = 1;
    public gainI: number = 1;
    public gainD: number = 1;
    public currentError: number = 0;
    public previousError: number = 0;
    public integral: number = 0;
    public output: number;

    public Step (dt: number): void {
        this.integral = dt * (this.integral + this.currentError);
        const derivative: number = (1 / dt) * (this.currentError - this.previousError);
        this.output = this.gainP * this.currentError + this.gainI * this.integral + this.gainD * derivative;
        this.previousError= this.currentError;
    }
}

const B2ExamSegway = () => {
    const b2grav = {
        x: 0,
        y: -30
    };

    const PENDULUM_LENGTH = 10;
    let targetPosition = 10;
    let targetPositionInterval = 0;
    let posAvg = 0;

    const m_world = new b2World(b2grav);
    const ctx = new ExamContext(m_world);
    let angleController = new PIDController();
    let positionController = new PIDController();

    angleController.gainP = 1000;
    angleController.gainI = 0;
    angleController.gainD = 250;

    positionController.gainP = 0.5;
    positionController.gainI = 0;
    positionController.gainD = 1.5;

    const bd = new b2BodyDef();
    const fd = new b2FixtureDef();

    bd.type = b2BodyType.b2_dynamicBody;
    bd.position.x = 0;
    bd.position.y = 2 + 0.5 * PENDULUM_LENGTH;
    let pendulumBody = m_world.CreateBody(bd);
    let pendulumShape = new b2PolygonShape();
    pendulumShape.SetAsBox(0.5, 0.5 * PENDULUM_LENGTH);
    fd.shape = pendulumShape;
    fd.density = 1 / (1 * PENDULUM_LENGTH);
    pendulumBody.CreateFixture( fd );

    bd.type = b2BodyType.b2_dynamicBody;
    bd.position.x = 0;
    bd.position.y = 1;
    let wheelBody = m_world.CreateBody(bd);
    let wheelShape = new b2CircleShape();
    wheelShape.m_radius = 0.6;
    fd.shape = wheelShape;
    fd.density = 1 / (Math.PI * 0.6 * 0.6);
    fd.friction = 10;
    wheelBody.CreateFixture(fd);

    let jd = new b2RevoluteJointDef();
    jd.Initialize(wheelBody, pendulumBody, {x: 0, y: 0});
    jd.localAnchorA.Set(0, 0);
    jd.localAnchorB.Set(0, -0.5 * PENDULUM_LENGTH);
    jd.collideConnected = false;
    jd.enableMotor = true;
    jd.maxMotorTorque = 40;
    let wheelJoint = m_world.CreateJoint(jd);

    bd.type = b2BodyType.b2_staticBody;
    bd.position.x = 0;
    bd.position.y = 0;
    let groundBody = m_world.CreateBody(bd);
    let groundShape = new b2EdgeShape();
    groundShape.Set({x: -100, y: 0}, {x: 100, y: 0});
    fd.shape = groundShape;
    fd.friction = 10;
    groundBody.CreateFixture(fd);

    // 标准化角度
    let NormalizeAngle = (angle: number): number => {
        while (angle > b2DegToRad( 180 )) {
            angle -= b2DegToRad( 360 );
        };
        while (angle < b2DegToRad( -180 )) {
            angle += b2DegToRad( 360 );
        };
        return angle;
    };

    ctx.evterUpdate.On(( passedMs ) => {
        let dt = passedMs;
        targetPositionInterval += dt;
        if (8 <= targetPositionInterval) {
            targetPositionInterval = 0;
            targetPosition = targetPosition == 10 ? -10 : 10;
        };

        let targetAngle = 0;
        let alpha = 0.4;
        posAvg = (1 - alpha) * posAvg + alpha  * pendulumBody.GetPosition().x;
        positionController.currentError = targetPosition - posAvg;
        positionController.Step( dt );
        let targetLinAccel = positionController.output;
        targetLinAccel = b2Clamp(targetLinAccel, -10, 10);
        targetAngle = targetLinAccel / m_world.GetGravity().y;
        targetAngle = b2Clamp(targetAngle, b2DegToRad(-15), b2DegToRad(15));

        let currentAngle = pendulumBody.GetAngle();
        currentAngle = NormalizeAngle(currentAngle);
        angleController.currentError = targetAngle - currentAngle;
        angleController.Step(dt);
        let targetSpeed = angleController.output;

        if (1000 < Math.abs(targetSpeed)) {
            targetSpeed = 0;
        };

        let targetAngularVelocity = targetSpeed / (2 * Math.PI * 0.6);
        wheelJoint.SetMotorSpeed(targetAngularVelocity);
    });

    return ctx;
}

export default B2ExamSegway;