import {createLabel, createSlider} from "../../../helpers/gui-helper";
import {Figure} from "../../../models/figure";

export function addControlEditOpacity(parentMenu: HTMLElement, figure: Figure) {
    // Label
    const label = createLabel('Opacity');
    parentMenu.appendChild(label);

    // Create Slider
    const opacityControl = createSlider({
        percent: '0.5'
    });

    // Interaction
    const customAction = 'slideOpacity' + new Date().getTime();
    opacityControl.setAttribute('onclick', customAction);

    window[customAction] = function (event, percent) {
        figure.setOpacity(percent);
    }

    parentMenu.appendChild(opacityControl);
}