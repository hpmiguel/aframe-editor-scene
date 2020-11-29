class Figure {
    primitive: string;
    color: string;
}

class Cone extends Figure {
    'radius-bottom': Number;
}

class Cylinder extends Figure {
    radius: Number;
    height: Number;
}

class Sphere extends Figure {
    radius: Number;
}

class Box extends Figure {
    height: Number;
    width: Number;
    depth: Number;
}

class Plane extends Figure {
    height: Number;
    width: Number;
    rotation: string;
}

type Figures = Cone | Cylinder | Sphere | Box | Plane;

export { Figures }
