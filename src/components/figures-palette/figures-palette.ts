import {registerSelectableFigure, selectableFigureAttr} from '../selectable-figure/selectable-figure';

class FiguresPalette {

    private componentId: string = 'figures-palette'

    private entityRef: HTMLElement

    private figures = [
        {
            primitive: 'a-cone',
            color: 'red',
            'radius-bottom': 0.3
        },
        {
            primitive: 'a-cylinder',
            color: 'blue',
            radius: 0.3,
            height: 1
        },
        {
            primitive: 'a-sphere',
            color: 'green',
            radius: 0.3
        },
        {
            primitive: 'a-box',
            color: 'yellow',
            height: 0.6,
            width: 0.6
        }
    ]

    constructor (attrs) {
        this.appendPalette(attrs);
        setTimeout(() => this.appendFigures(), 0);
    }

    private appendPalette (attrs) {
        const sceneEl = document.querySelector('a-scene');
        this.entityRef = document.createElement('a-entity');
        this.entityRef.setAttribute('id', this.componentId);
        let attrsKeys = Object.keys(attrs);
        attrsKeys.forEach((key) => {
            this.entityRef.setAttribute(key, attrs[key]);
        });
        sceneEl.appendChild(this.entityRef);
    }

    public appendFigures () {
        // registering component to convert into selectable figures
        registerSelectableFigure();
        const {x, y, z} = this.entityRef.getAttribute('position') as any;
        this.figures.forEach((fig, i) => {
            const figEl = document.createElement(fig.primitive);
            const figCoords = (x + 2) - (i + 1) + ` ${y} ${z}`;
            figEl.setAttribute('position', figCoords);
            figEl.setAttribute('class', 'selectable');
            figEl.setAttribute(selectableFigureAttr, '');
            let figProps = Object.keys(fig);
            figProps.forEach((key) => {
                if (key !== 'primitive') figEl.setAttribute(key, fig[key]);
            });
            this.entityRef.appendChild(figEl);
        });
    }

}

export { FiguresPalette }
