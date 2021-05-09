import {createButton, createContainer, createLabel} from "../../../helpers/gui-helper";
import {Figure} from "../../../models/figure";
import {cloneDeep} from "lodash";

let _figure: Figure;
let _parentMenu: HTMLElement;

export function addControlEditSize(parentMenu: HTMLElement, figure: Figure) {
    _parentMenu = parentMenu;
    _figure = figure;

    // Label
    const label = createLabel('Size');
    _parentMenu.appendChild(label);

    // Buttons
    addContainerButton();
}

function addContainerButton() {
    const containerButtons = createContainer({
        'flex-direction': 'row',
        margin: '0 0 0.05 0',
        width: '0.4',
        height: '0.2'
    });
    addButtonResize('decrease', containerButtons);
    addButtonResize('increase', containerButtons);
    _parentMenu.appendChild(containerButtons);
}

function addButtonResize(operation: string, container: HTMLElement) {
    // Create Button
    const buttonControl = createButton({
        value: operation === 'increase' ? '+' : '-'
    });

    // Interaction
    const customAction = operation + 'size' + new Date().getTime();
    buttonControl.setAttribute('onclick', customAction);

    const figureAction = cloneDeep(_figure); // backup for triggered

    window[customAction] = function (event) {
        event.stopPropagation();
        if (event instanceof CustomEvent) {
            const factor = 0.2;
            const op = operation === 'increase' ? (1 + factor) : (1 - factor);
            figureAction.resize(op);
        }
    }

    container.appendChild(buttonControl);
}
