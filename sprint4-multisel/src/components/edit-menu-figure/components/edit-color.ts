import {createButton, createContainer, createLabel, rgbToHex} from "../../../helpers/gui-helper";
import {Figure} from "../../../models/figure";

const _RGBFigure: { red: number; green: number; blue: number; } = { red: 0, green: 0, blue: 0 };
let _figure: Figure;
let _parentMenu: HTMLElement;

export function addControlEditColor(parentMenu: HTMLElement, figure: Figure) {
    _parentMenu = parentMenu;
    _figure = figure;

    // Label
    const label = createLabel('Color');
    _parentMenu.appendChild(label);

    // Buttons
    ['red', 'green', 'blue'].forEach(rgbComponent => {
        addContainerButton(rgbComponent);
    });
}

function addContainerButton(rgbComponent: string) {
    const containerButtons = createContainer({
        'flex-direction': 'row'
    });
    addButtonColor(rgbComponent, 'decrease', containerButtons);
    addButtonColor(rgbComponent, 'increase', containerButtons);
    _parentMenu.appendChild(containerButtons);
}

function addButtonColor(rgbComponent: string, operation: string, container: HTMLElement) {
    // Create Button
    const buttonControl = createButton({
        value: operation === 'increase' ? '+' : '-',
        'background-color': rgbComponent
    });

    // Interaction
    const customAction = operation + rgbComponent;
    buttonControl.setAttribute('onclick', customAction);

    window[customAction] = function (event) {
        const interval = 25;
        const op = operation === 'increase' ? interval : -interval;
        const newVal = _RGBFigure[rgbComponent] + op;

        if (newVal >= 0 && newVal <= 255) {
            _RGBFigure[rgbComponent] = newVal;
        }

        const { red, green, blue } =  _RGBFigure;
        const colorHex = rgbToHex(red, green, blue);

        _figure.setColor(colorHex);
    }

    container.appendChild(buttonControl);
}
