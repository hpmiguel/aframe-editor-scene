import {SceneRef} from '../../services/scene-ref';
import {Figure, Plane} from '../../models/figure';
import {appendFigure} from '../../helpers/figure-helper';
import {
    registerSelectableFigurePalette,
    selectableFigurePaletteAttr
} from "../behaviour-components/selectable-figure-palette/selectable-figure-palette";

export class FiguresPalette {

    private componentId: string = 'figures-palette';

    private entityRef: HTMLElement;

    private figures: Array<Figure>;

    constructor (attrs, initialFigures) {
        this.figures = initialFigures || new Array<Figure>();
        this.appendPalette(attrs);
        setTimeout(() => {
            // registering component to convert into selectable figures (Custom behaviour)
            registerSelectableFigurePalette();

            this.appendFigures()
        }, 0);
    }

    /**
     * Insert Palette on scene
     */
    private appendPalette(attrs) {
        const scene = SceneRef.getInstance().getSceneEl();
        this.entityRef = document.createElement('a-entity');
        this.entityRef.setAttribute('id', this.componentId);
        let attrsKeys = Object.keys(attrs);
        attrsKeys.forEach((key) => {
            this.entityRef.setAttribute(key, attrs[key]);
        });
        scene.appendChild(this.entityRef);
    }

    private appendFigures() {
        // Getting palette coords
        const {x, y, z} = this.entityRef.getAttribute('position') as any;

        // palette background
        const table = new Plane({
            height: 1.3,
            width: 4,
            rotation: '0 0 0',
            color: '#211e1e'
        });
        appendFigure(table, `${x-0.5} 0 0`, this.entityRef);

        this.figures.forEach((fig, i) => {
            const figCoords =  `${(x + 2) - (i + 1)} 0 0`;
            const behaviour = { hoverable: true, draggable: false, custom: selectableFigurePaletteAttr };
            appendFigure(fig, figCoords, this.entityRef, behaviour);
        });
    }

}
