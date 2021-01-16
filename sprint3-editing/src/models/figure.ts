import {materialToAttr} from "../helpers/figure-helper";

class Figure {
    htmlRef: HTMLElement;
    primitive: string;
    color: string;
    material: string;

    constructor(fig: {primitive: string, color: string, material?: any}) {
        const {primitive, color, material} = fig;
        this.primitive = primitive;
        this.color = color;
        this.material = material && materialToAttr(material);
    }

    setColor(color: string) {
        this.htmlRef.setAttribute('color', color);
    }

    setMaterial(material: any) {
        const materialAttr: string = material && materialToAttr(material);
        this.htmlRef.setAttribute('material', materialAttr);
    }

    setOpacity(percent: string) {
       this.htmlRef.setAttribute('opacity', percent);
    }

    resize(scaleFactor: number) {
        (this.htmlRef as any).object3D.scale.multiplyScalar(scaleFactor);
    }

    toggleWireframe() {
        const wireframeStatus = this.htmlRef.getAttribute('wireframe') === "true";
        this.htmlRef.setAttribute('wireframe', String(!wireframeStatus));
    }
}

class Cone extends Figure {
    'radius-bottom': number;
    height: number;

    constructor(cone: {primitive: string, color: string, 'radius-bottom': number, height: number}) {
        const {primitive, color, height} = cone;
        super({primitive, color});
        this['radius-bottom'] = cone['radius-bottom'];
        this.height = height;
    }
}

class Cylinder extends Figure {
    radius: number;
    height: number;

    constructor(cyl: {primitive: string, color: string, height: number, radius: number}) {
        const {primitive, color, height, radius} = cyl;
        super({primitive,color});
        this.height = height;
        this.radius = radius;
    }
}

class Sphere extends Figure {
    radius: number;

    constructor(sphere: {primitive: string, color: string, radius: number}) {
        const {primitive, color, radius} = sphere;
        super({primitive,color});
        this.radius = radius;
    }
}

class Box extends Figure {
    height: number;
    width: number;
    depth: number;

    constructor(box: {primitive: string, color: string, height: number, width: number, depth: number, material?: any}) {
        const {primitive, color, height, width, depth, material} = box;
        super({primitive, color, material});
        this.height = height;
        this.width = width;
        this.depth = depth;
    }
}

class Plane extends Figure {
    height: number;
    width: number;
    rotation: string;

    constructor(plane: {primitive: string, color: string, height: number, width: number, rotation: string}) {
        const {primitive, color, height, width, rotation} = plane;
        super({primitive,color});
        this.height = height;
        this.width = width;
        this.rotation = rotation;
    }
}

export { Figure, Cone, Cylinder, Sphere, Box, Plane }
