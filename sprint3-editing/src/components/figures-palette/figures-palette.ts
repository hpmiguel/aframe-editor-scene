import {registerSelectableFigure} from '../behaviour-components/coneable-figure/cloneable-figure';
import {SceneRef} from '../../services/scene-ref';
import {Figure} from '../../models/figure';
import {appendFigure} from '../../helpers/figure-helper';

class FiguresPalette {

    private componentId: string = 'figures-palette';

    private entityRef: HTMLElement;

    private figures: Array<Figure>;

    constructor (attrs, initialFigures, idDest) {
        this.figures = initialFigures || new Array<Figure>();
        this.appendPalette(attrs);
        setTimeout(() => {
            // registering component to convert into selectable figures (Custom behaviour)
            registerSelectableFigure(idDest);

            // Getting palette coords
            const {x, y, z} = this.entityRef.getAttribute('position') as any;

            // Insert palette figures
            this.figures.forEach((fig, i) => {
                const figCoords =  `${(x + 2) - (i + 1)} 0 0`;
                appendFigure(fig, figCoords, this.entityRef);
            });
        }, 0);
    }

    /**
     * Insert Palette on scene
     */
    private appendPalette(attrs) {
        const sceneEl = SceneRef.getInstance().getSceneEl();
        this.entityRef = document.createElement('a-entity');
        this.entityRef.setAttribute('id', this.componentId);
        let attrsKeys = Object.keys(attrs);
        attrsKeys.forEach((key) => {
            this.entityRef.setAttribute(key, attrs[key]);
        });
        sceneEl.appendChild(this.entityRef);
    }

}

export { FiguresPalette }
