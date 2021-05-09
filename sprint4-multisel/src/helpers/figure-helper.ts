import { Figure } from '../models/figure';
import { EditMenuFigure } from '../components/edit-menu-figure/edit-menu-figure';
import { selectableFigureAttr } from '../components/behaviour-components/selectable-figure/selectable-figure';
import {GlobalState} from "../services/global-state";

const globalState = GlobalState.getInstance();

export function cloneProperties(node): any {
    const attributes = node.attributes;
    let originalAttrs = {};
    for(let i = 0; i < attributes.length; i++) {
        const attr = attributes.item(i);
        originalAttrs[attr.nodeName] = attr.nodeValue;
    }
    return originalAttrs;
}

export function duplicateFigure(figEl: HTMLElement, parent: HTMLElement) {
    // Cloning figure
    const clonedFigureEl = figEl.cloneNode() as HTMLElement;

    // Setting destination position
    clonedFigureEl.setAttribute('position', '0 0 0.5');
    clonedFigureEl.setAttribute('rotation', '90 0 0'); // Because plane is already rotated

    // Append to dest
    parent.appendChild(clonedFigureEl);
}

export function showFigureMenu(figEl: HTMLElement) {
    const menuRef: HTMLElement = figEl.childNodes[0] as HTMLElement;
    menuRef.setAttribute('visible', 'true');
}

export function markFigureAsSelected(figEl: HTMLElement) {
    const figuresScene: Array<Figure> = globalState.getSceneFigures();
    const selectedFigures: Array<Figure> = globalState.getSelectedFigures();

    const alreadyMarked = Boolean(selectedFigures.find(sel => sel.htmlRef.innerHTML === figEl.innerHTML));
    const figModel: Figure = figuresScene.find(fig => fig.htmlRef.innerHTML === figEl.innerHTML);

    if (!alreadyMarked) {
        selectedFigures.push(figModel);
        figEl.setAttribute('color', 'cyan');
    } else {
        globalState.setSelectedFigures(selectedFigures.filter(sel => sel.htmlRef.innerHTML !== figEl.innerHTML));
        figEl.setAttribute('color', figModel.color);
    }
}

export function propsInLine(props: any): string {
    const propsKeys = Object.keys(props);
    let materialAttr: string = '';
    propsKeys.forEach(key => {
        materialAttr += `${key}: ${String(props[key])}; `;
    });
    return materialAttr;
}

function setInteractionProperties(figEl) {
    figEl.setAttribute('hoverable', '');
    figEl.setAttribute('grabbable', '');
    figEl.setAttribute('draggable', '');
}

function setInteractionBehaviour(figEl) {
    figEl.setAttribute('event-set__hoveron', '_event: hover-start; material.opacity: 0.8; transparent: true');
    figEl.setAttribute('event-set__hoveroff', '_event: hover-end; material.opacity: 1; transparent: false');
    figEl.setAttribute('event-set__dragdrop', 'event: drag-drop');
    figEl.setAttribute('event-set__dragon', '_event: dragover-start;'); // material.wireframe: true
    figEl.setAttribute('event-set__dragoff', '_event: dragover-end;'); // material.wireframe: false
}

export function appendFigure(fig: Figure, figCoords: string, parent: HTMLElement) {
    // Initializing fig html element
    const figEl = document.createElement(fig.primitive);

    // Setting basic props
    figEl.setAttribute('position', figCoords);
    const figProps = Object.keys(fig);
    figProps.forEach(key => {
        if (key !== 'primitive') {
            if (key === 'shadow') {
                figEl.setAttribute('shadow', `receive: ${fig[key]}`)
            } else {
                figEl.setAttribute(key, fig[key]);
            }
        }
    });

    // Setting interaction props and events
    figEl.setAttribute('class', 'selectable-superhands');
    figEl.setAttribute(selectableFigureAttr, ''); // My custom behaviour

    // Superhands Props
    setInteractionProperties(figEl);
    setInteractionBehaviour(figEl);

    parent.appendChild(figEl);

    fig.htmlRef = figEl;

    new EditMenuFigure(fig);
}