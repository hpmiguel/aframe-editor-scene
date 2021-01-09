import {createLabel, createSlider} from "../../../utils/gui-utils";
import {Figures} from "../../../models/figures";

export function addControlEditOpacity(parentMenu: HTMLElement, figure: Figures) {
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
        figure.setOpacity(percent);
    }

    parentMenu.appendChild(opacityControl);
}