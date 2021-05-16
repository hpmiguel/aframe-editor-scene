import {propsInLine, setPhysicsHtml, setShadowHtml} from "../helpers/figure-helper";

class Figure {
    id?: string;
    htmlRef?: HTMLElement;
    primitive?: string;
    color?: string = 'white';
    material?: any;
    shadow?: boolean = false;
    opacity?: number = 1;
    wireFrame?: boolean = false;
    physics?: Physics = null;

    constructor(fig: Figure) {
        const {primitive, id, color, material, shadow, opacity, wireFrame, physics} = fig;
        this.primitive = primitive;
        if (id) { this.id = id; }
        if (color) { this.color = color; }
        if (material) { this.material = propsInLine(material); }
        if (shadow) { this.shadow = shadow; }
        if (opacity) { this.opacity = opacity; }
        if (wireFrame) { this.wireFrame = wireFrame; }
        if (physics) { this.physics = physics; }
    }

    setColor?(color: string) {
        this.color = color;
        this.htmlRef.setAttribute('color', color);
    }

    setMaterial?(material: any) {
        this.material = material;
        if (material) {
            const materialAttr: string = propsInLine(material);
            this.color !== 'white' && this.setColor('white');
            this.htmlRef.setAttribute('material', materialAttr);
        } else {
            this.htmlRef.removeAttribute('material');
        }
    }

    setOpacity?(percent: number) {
        this.opacity = percent
        this.htmlRef.setAttribute('opacity', percent.toString());
    }

    resize?(scaleFactor: number) {
        (this.htmlRef as any).object3D.scale.multiplyScalar(scaleFactor);
    }

    setWireframe?(wireFrame: boolean) {
        // const wireframeStatus = this.htmlRef.getAttribute('wireframe') === "true";
        this.wireFrame = wireFrame;
        this.htmlRef.setAttribute('wireframe', String(wireFrame));
    }

    setShadow?(shadow: boolean) {
        // const shadowStatus = this.htmlRef.getAttribute('shadow')['receive'];
        this.shadow = shadow;
        setShadowHtml(this.htmlRef, shadow);
    }

    setPhysics?(physics: Physics) {
        this.physics = physics;
        setPhysicsHtml(this.htmlRef, physics);
    }

}

class Cone extends Figure {
    'radius-bottom': number;
    height: number;

    constructor(cone: Cone) {
        cone.primitive = 'a-cone';
        super(cone);
        this['radius-bottom'] = cone['radius-bottom'];
        this.height = cone.height;
    }
}

class Cylinder extends Figure {
    radius: number;
    height: number;

    constructor(cyl: Cylinder) {
        const {height, radius} = cyl;
        cyl.primitive = 'a-cylinder';
        super(cyl);
        this.height = height;
        this.radius = radius;
    }
}

class Sphere extends Figure {
    radius: number;

    constructor(sphere: Sphere) {
        sphere.primitive = 'a-sphere';
        super(sphere);
        this.radius = sphere.radius;
    }
}

class Box extends Figure {
    height: number;
    width: number;
    depth: number;

    constructor(box: Box) {
        const { height, width, depth } = box;
        box.primitive = 'a-box';
        super(box);
        this.height = height;
        this.width = width;
        this.depth = depth;
    }
}

class Plane extends Figure {
    height: number;
    width: number;
    rotation: string;

    constructor(plane: Plane) {
        const { height, width, rotation } = plane;
        plane.primitive = 'a-plane';
        super(plane);
        this.height = height;
        this.width = width;
        this.rotation = rotation;
    }
}

type FigureBehaviour = {
    draggable: boolean;
    hoverable: boolean;
    custom: string;
}

type Physics = {
    body: string;
    shape: string;
}

export { Figure, Cone, Cylinder, Sphere, Box, Plane, FigureBehaviour, Physics }
