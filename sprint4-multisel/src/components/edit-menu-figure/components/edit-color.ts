import {createButton, createContainer, createLabel, rgbToHex} from "../../../helpers/gui-helper";
import {Figure} from "../../../models/figure";
import {cloneDeep} from 'lodash';

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
    const customAction = operation + rgbComponent  + new Date().getTime();
    buttonControl.setAttribute('onclick', customAction);

    const figureAction = cloneDeep(_figure); // backup for triggered

    window[customAction] = function (event) {
        event.stopPropagation();
        if (event instanceof CustomEvent) {
            const interval = 25;
            const op = operation === 'increase' ? interval : -interval;
            const newVal = _RGBFigure[rgbComponent] + op;

            if (newVal >= 0 && newVal <= 255) {
                _RGBFigure[rgbComponent] = newVal;
            }

            const {red, green, blue} = _RGBFigure;
            const colorHex = rgbToHex(red, green, blue);

            figureAction.setColor(colorHex);
        }
    }

    container.appendChild(buttonControl);
}
