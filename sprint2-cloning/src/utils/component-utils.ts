import { Figures } from '../models/Figures';
import { selectableFigureAttr } from '../components/coneable-figure/cloneable-figure';

export function cloneProperties(node) {
    const attributes = node.attributes;
    let originalAttrs = {};
    for(let i = 0; i < attributes.length; i++) {
        const attr = attributes.item(i);
        originalAttrs[attr.nodeName] = attr.nodeValue;
    }
    return originalAttrs;
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

    parent.appendChild(figEl);
}
