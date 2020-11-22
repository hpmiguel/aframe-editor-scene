import {registerSelectableFigure, selectableFigureAttr} from '../coneable-figure/cloneable-figure';

class FiguresPalette {

    private componentId: string = 'figures-palette';

    private entityRef: HTMLElement;

    private figures: Array<Figures>;

    constructor (attrs, initialFigures) {
        this.figures = initialFigures || new Array<Figures>();
        this.appendPalette(attrs);
        setTimeout(() => {
            // registering component to convert into selectable figures (Custom behaviour)
            registerSelectableFigure();

            // Getting palette coords
            const {x, y, z} = this.entityRef.getAttribute('position') as any;

            this.figures.forEach((fig, i) => {
                const figCoords =  `${(x + 2) - (i + 1)} ${y} ${z}`;
                this.appendFigure(fig, figCoords);
            });
        }, 0);
    }

    /**
     * Insert Palette on scene
     */
    private appendPalette(attrs) {
        const sceneEl = document.querySelector('a-scene');
        this.entityRef = document.createElement('a-entity');
        this.entityRef.setAttribute('id', this.componentId);
        let attrsKeys = Object.keys(attrs);
        attrsKeys.forEach((key) => {
            this.entityRef.setAttribute(key, attrs[key]);
        });
        sceneEl.appendChild(this.entityRef);
    }

    /**
     * Insert figure on palette
     */
    private appendFigure(fig: Figures, figCoords: string) {
        // Initializing fig html element
        const figEl = document.createElement(fig.primitive);

        // Setting basic props
        figEl.setAttribute('position', figCoords);
        let figProps = Object.keys(fig);
        figProps.forEach((key) => {
            if (key !== 'primitive') figEl.setAttribute(key, fig[key]);
        });

        // Setting interaction props and events
        figEl.setAttribute('class', 'selectable');
        figEl.setAttribute(selectableFigureAttr, ''); // My custom behaviour

        this.entityRef.appendChild(figEl);
    }

}

export { FiguresPalette }
