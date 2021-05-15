import {Box, Cone, Cylinder, Figure, FigureBehaviour, Sphere} from '../models/figure';
import {GlobalState} from "../services/global-state";
import {selectableFigureSceneAttr} from "../components/behaviour-components/selectable-figure-scene/selectable-figure-scene";
import {selectableFigurePaletteAttr} from "../components/behaviour-components/selectable-figure-palette/selectable-figure-palette";
import {EditMenuFigure} from "../components/edit-menu-figure/edit-menu-figure";

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

function recoverPropsFigure(figEl: HTMLElement): Figure {
    const tagElement = figEl.tagName.toLowerCase();

    let figureModel: Figure;
    switch (tagElement) {
        case 'a-sphere':
            figureModel = new Sphere({radius: 0});
            break;
        case 'a-cone':
            figureModel = new Cone({"radius-bottom": 0, height: 0});
            break;
        case 'a-box':
            figureModel = new Box({width: 0, height: 0, depth: 0});
            break;
        case 'a-cylinder':
            figureModel = new Cylinder({radius: 0, height: 0});
            break;
        default:
            break;
    }

    const figurePropsNames = Object.getOwnPropertyNames(figureModel);

    figurePropsNames.forEach(prop => {
       figureModel[prop] = figEl.getAttribute(prop);
    });

    return figureModel;
}

export function duplicateFigure(figEl: HTMLElement, parent: HTMLElement) {
    // Cloning figure
    const clonedFigureEl = figEl.cloneNode() as HTMLElement;

    // Setting destination position
    clonedFigureEl.setAttribute('position', '0 0 0.5');
    clonedFigureEl.setAttribute('rotation', '90 0 0'); // Because plane is already rotated

    // Change behaviour
    clonedFigureEl.removeAttribute(selectableFigurePaletteAttr);
    clonedFigureEl.setAttribute(selectableFigureSceneAttr, '');

    // Superhands Props
    const behaviour = { hoverable: false, draggable: true };
    setInteractionProperties(clonedFigureEl, behaviour);
    setInteractionBehaviour(clonedFigureEl, behaviour);

    // Recreate figure model from DOM
    const clonedFigure = recoverPropsFigure(clonedFigureEl);
    clonedFigure.htmlRef = clonedFigureEl;

    // Adding Menu to cloned figure
    new EditMenuFigure(clonedFigure);

    // Caching model figures on global state
    globalState.getSceneFigures().push(clonedFigure);

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
        globalState.deselectFigure(figEl);
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

function setInteractionProperties(figEl, eventsActive: {draggable: boolean, hoverable: boolean}) {
    if (eventsActive.hoverable) {
        figEl.setAttribute('hoverable', '');
    }
    if (eventsActive.draggable) {
        figEl.setAttribute('grabbable', '');
        figEl.setAttribute('draggable', '');
    }
}

function setInteractionBehaviour(figEl, eventsActive: {draggable: boolean, hoverable: boolean}) {
    if (eventsActive.hoverable) {
        figEl.setAttribute('event-set__hoveron', '_event: hover-start; material.opacity: 0.8; transparent: true');
        figEl.setAttribute('event-set__hoveroff', '_event: hover-end; material.opacity: 1; transparent: false');
    }
    if (eventsActive.draggable) {
        figEl.setAttribute('event-set__dragdrop', 'event: drag-drop');
        figEl.setAttribute('event-set__dragon', '_event: dragover-start;');
        figEl.setAttribute('event-set__dragoff', '_event: dragover-end;');
    }
}

export function appendFigure(fig: Figure, figCoords: string, parent: HTMLElement,
                             behaviour: FigureBehaviour = {draggable: false, hoverable: false, custom: ''}) {
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
    if (behaviour.custom) figEl.setAttribute(behaviour.custom, ''); // My custom behaviour

    // Superhands Props
    setInteractionProperties(figEl, behaviour);
    setInteractionBehaviour(figEl, behaviour);

    parent.appendChild(figEl);

    fig.htmlRef = figEl;
}
