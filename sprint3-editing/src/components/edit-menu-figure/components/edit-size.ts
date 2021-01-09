import {createButton, createContainer, createLabel} from "../../../utils/gui-utils";
import {Figures} from "../../../models/figures";

let _figure: Figures;
let _parentMenu: HTMLElement;

export function addControlEditSize(parentMenu: HTMLElement, figure: Figures) {
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
        height: '0.6'
    });
    addButtonResize('increase', containerButtons);
    addButtonResize('decrease', containerButtons);
    _parentMenu.appendChild(containerButtons);
}

function addButtonResize(operation: string, container: HTMLElement) {
    // Create Button
    const buttonControl = createButton({
        value: operation === 'increase' ? '+' : '-'
    });

    // Interaction
    const customAction = operation + 'size';
    buttonControl.setAttribute('onclick', customAction);

    window[customAction] = function (event) {
        const factor = 0.2;
        const op = operation === 'increase' ? (1+factor) : (1-factor);
        _figure.resize(op);
    }

    container.appendChild(buttonControl);
}