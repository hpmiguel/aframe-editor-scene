import {createLabel, createSlider} from "../../../utils/gui-utils";

export function addControlEditOpacity(parentMenu: HTMLElement, figure: HTMLElement) {
    // Label
    const label = createLabel('Opacity');
    parentMenu.appendChild(label);

    // Create Slider
    const opacityControl = createSlider({
        percent: '0.5'
    });

    // Interaction
    const customAction = 'slideOpacity';
    opacityControl.setAttribute('onclick', customAction);

    window[customAction] = function (event, percent) {
        figure.setAttribute('opacity', percent);
    }

    parentMenu.appendChild(opacityControl);
}