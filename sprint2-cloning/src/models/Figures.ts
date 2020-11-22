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

class Rectangle extends Figure {
    height: Number;
    width: Number;
}

type Figures = Cone | Cylinder | Sphere | Rectangle;
