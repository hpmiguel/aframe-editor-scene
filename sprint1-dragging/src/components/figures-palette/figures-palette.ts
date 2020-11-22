// import {registerSelectableFigure, selectableFigureAttr} from '../selectable-figure/selectable-figure';

import "aframe-event-set-component";
import "aframe-environment-component";

class FiguresPalette {

    private componentId: string = 'figures-palette';

    private entityRef: HTMLElement;

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
    ];

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

    private setInteractionProperties(figEl) {
        figEl.setAttribute('hoverable', '');
        figEl.setAttribute('grabbable', '');
        figEl.setAttribute('draggable', '');
    }

    private setInteractionBehaviour(figEl) {
        figEl.setAttribute('event-set__hoveron', '_event: hover-start; material.opacity: 0.7; transparent: true');
        figEl.setAttribute('event-set__hoveroff', '_event: hover-end; material.opacity: 1; transparent: false');
        figEl.setAttribute('event-set__dragdrop', 'event: drag-drop');
        figEl.setAttribute('event-set__dragon', '_event: dragover-start; material.wireframe: true');
        figEl.setAttribute('event-set__dragoff', '_event: dragover-end; material.wireframe: false');
    }

    public appendFigures () {
        // registering component to convert into selectable figures (Custom behaviour)
        // registerSelectableFigure();

        const {x, y, z} = this.entityRef.getAttribute('position') as any;

        this.figures.forEach((fig, i) => {
            // Initializing fig html element
            const figEl = document.createElement(fig.primitive);

            // Getting initial coords
            const figCoords = (x + 2) - (i + 1) + ` ${y} ${z}`;

            // Setting basic props
            figEl.setAttribute('position', figCoords);
            let figProps = Object.keys(fig);
            figProps.forEach((key) => {
                if (key !== 'primitive') figEl.setAttribute(key, fig[key]);
            });

            // Setting interaction props and events
            figEl.setAttribute('class', 'selectable');
            // figEl.setAttribute(selectableFigureAttr, ''); // My custom behaviour
            this.setInteractionProperties(figEl);
            this.setInteractionBehaviour(figEl);

            this.entityRef.appendChild(figEl);
        });

    }

}

export { FiguresPalette }
