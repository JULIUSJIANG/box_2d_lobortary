import { b2ChainShape, b2CircleShape, b2EdgeShape, b2PolygonShape, b2ShapeType, b2Vec2 } from "../../box2d_ts/Box2D";
import b2EleSetting from "../B2EleSetting";
import B2ShapeRS from "./B2ShapeRS";

namespace B2ShapeRD {
    /**
     * 圆
     */
    export const circle = new B2ShapeRS<b2CircleShape>({
        type: b2ShapeType.e_circleShape,
        drawer: (shape, body, gd) => {
            const center = body.GetWorldPoint(shape.m_p, new b2Vec2());
            const radius = shape.m_radius;
            gd.RoundFill(
                center.x, 
                center.y, 
                radius, 
                b2EleSetting.color.shape.body
            );
            gd.RoundLine(
                center.x, 
                center.y, 
                radius, 
                gd.Pixel(b2EleSetting.lineWidth), 
                b2EleSetting.color.shape.outline
            );
        }
    });

    /**
     * 边界
     */
    export const edge = new B2ShapeRS<b2EdgeShape>({
        type: b2ShapeType.e_edgeShape,
        drawer: (shape, body, gd) => {
            const v1 = body.GetWorldPoint( shape.m_vertex1, new b2Vec2());
            const v2 = body.GetWorldPoint( shape.m_vertex2, new b2Vec2());
            gd.StraightLine(
                v1.x, 
                v1.y, 
                v2.x, 
                v2.y, 
                gd.Pixel(b2EleSetting.lineWidth),
                b2EleSetting.color.shape.outline
            );
        }
    });

    /**
     * 锁链
     */
    export const chain = new B2ShapeRS<b2ChainShape>({
        type: b2ShapeType.e_chainShape,
        drawer: (shape, body, gd) => {
            const count = shape.m_count;
            const vertices: b2Vec2[] = shape.m_vertices;
            let v1 = body.GetWorldPoint( vertices[0], new b2Vec2());
            gd.RoundFill(v1.x, v1.y, gd.Pixel(b2EleSetting.dotRadius), b2EleSetting.color.shape.outline);

            if (shape.m_hasPrevVertex) {
                const vp = body.GetWorldPoint( shape.m_prevVertex, new b2Vec2());
                gd.StraightLine(
                    vp.x,
                    vp.y,
                    v1.x,
                    v1.y,
                    gd.Pixel(b2EleSetting.lineWidth),
                    b2EleSetting.color.shape.outline
                );
                gd.RoundFill(
                    vp.x,
                    vp.y,
                    gd.Pixel(b2EleSetting.dotRadius),
                    b2EleSetting.color.shape.outline
                )
            };

            for (let i = 1; i < count; i++) {
                const v2 = body.GetWorldPoint( vertices[i], new b2Vec2());
                gd.StraightLine(
                    v1.x,
                    v1.y,
                    v2.x,
                    v2.y,
                    gd.Pixel(b2EleSetting.lineWidth),
                    b2EleSetting.color.shape.outline
                );
                gd.RoundFill(
                    v2.x,
                    v2.y,
                    gd.Pixel(b2EleSetting.dotRadius),
                    b2EleSetting.color.shape.outline
                );
                v1 = v2;
            };

            if (shape.m_hasNextVertex) {
                const vn = body.GetWorldPoint( shape.m_nextVertex, new b2Vec2());
                gd.StraightLine(
                    vn.x,
                    vn.y,
                    v1.x, 
                    v1.y,
                    gd.Pixel(b2EleSetting.lineWidth),
                    b2EleSetting.color.shape.outline
                );
                gd.RoundFill(
                    vn.x,
                    vn.y,
                    gd.Pixel(b2EleSetting.dotRadius),
                    b2EleSetting.color.shape.outline
                );
            };
        }
    });

    /**
     * 多边形
     */
    export const polygon = new B2ShapeRS<b2PolygonShape>({
        type: b2ShapeType.e_polygonShape,
        drawer: (shape, body, gd) => {
            const vertexCount = shape.m_count;
            const vertices = shape.m_vertices;
            let targetPos = vertices.slice(0, shape.m_count).map(( pos ) => {
                return body.GetWorldPoint(pos, new b2Vec2());
            });
            gd.FillPosSetAll(
                targetPos,
                b2EleSetting.color.shape.body
            );
            gd.CyclePosSetAll(
                targetPos,
                gd.Pixel(b2EleSetting.lineWidth),
                b2EleSetting.color.shape.outline
            );
        }
    });
}

export default B2ShapeRD;