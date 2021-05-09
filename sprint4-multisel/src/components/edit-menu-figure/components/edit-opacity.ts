import {createLabel, createSlider} from "../../../helpers/gui-helper";
import {Figure} from "../../../models/figure";

export function addControlEditOpacity(parentMenu: HTMLElement, figure: Figure) {
    // Label
    const label = createLabel('Opacity', {
        'margin': '-0.05 0 0.15 0'
    });
    parentMenu.appendChild(label);

    // Create Slider
    const opacityControl = createSlider({
        percent: '0.3'
    });

    // Interaction
    const customAction = 'slideOpacity' + new Date().getTime();
    opacityControl.setAttribute('onclick', customAction);

    window[customAction] = function (event, percent) {
        event.stopPropagation();
        if (event instanceof CustomEvent) {
            figure.setOpacity(percent);
        }
    }

    parentMenu.appendChild(opacityControl);
}