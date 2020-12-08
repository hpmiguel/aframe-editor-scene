import { Figures } from '../models/Figures';
import { selectableFigureAttr } from '../components/coneable-figure/cloneable-figure';
import { EditMenuFigure } from '../components/edit-menu-figure/edit-menu-figure';

export function cloneProperties(node) {
    const attributes = node.attributes;
    let originalAttrs = {};
    for(let i = 0; i < attributes.length; i++) {
        const attr = attributes.item(i);
        originalAttrs[attr.nodeName] = attr.nodeValue;
    }
    return originalAttrs;
}

function setInteractionProperties(figEl) {
    figEl.setAttribute('hoverable', '');
    figEl.setAttribute('grabbable', '');
    figEl.setAttribute('draggable', '');
}

function setInteractionBehaviour(figEl) {
    figEl.setAttribute('event-set__hoveron', '_event: hover-start; material.opacity: 0.7; transparent: true');
    figEl.setAttribute('event-set__hoveroff', '_event: hover-end; material.opacity: 1; transparent: false');
    figEl.setAttribute('event-set__dragdrop', 'event: drag-drop');
    figEl.setAttribute('event-set__dragon', '_event: dragover-start; material.wireframe: true');
    figEl.setAttribute('event-set__dragoff', '_event: dragover-end; material.wireframe: false');
}

export function appendFigure(fig: Figures, figCoords: string, parent: HTMLElement) {
    // Initializing fig html element
    const figEl = document.createElement(fig.primitive);

    // Setting basic props
    figEl.setAttribute('position', figCoords);
    const figProps = Object.keys(fig);
    figProps.forEach((key) => {
        if (key !== 'primitive') figEl.setAttribute(key, fig[key]);
    });

    // Setting interaction props and events
    figEl.setAttribute('class', 'selectable');
    figEl.setAttribute(selectableFigureAttr, ''); // My custom behaviour

    // Superhands Props
    // setInteractionProperties(figEl);
    // setInteractionBehaviour(figEl);

    parent.appendChild(figEl);

    new EditMenuFigure(figEl);
}
