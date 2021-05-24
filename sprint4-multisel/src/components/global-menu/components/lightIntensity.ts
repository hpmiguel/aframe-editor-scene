import {createLabel, createSlider} from "../../../helpers/gui-helper";
import {Figure} from "../../../models/figure";
import {GlobalState} from "../../../services/global-state";

export function addControlLightIntensity(parentMenu: HTMLElement) {
    // Label
    const label = createLabel('Light Intensity', {
        'margin': '-0.05 0 0.15 0',
        'width': '1.4',
        'font-size': '60px'
    });
    parentMenu.appendChild(label);

    // Create Slider
    const opacityControl = createSlider({
        percent: '0.3'
    });

    // Interaction
    const customAction = 'slideIntensity' + new Date().getTime();
    opacityControl.setAttribute('onclick', customAction);

    const lightScene = GlobalState.getInstance().getLightScene();

    window[customAction] = function (event, percent) {
        event.stopPropagation();
        if (event instanceof CustomEvent) {
            lightScene.setIntensity(percent);
        }
    }

    parentMenu.appendChild(opacityControl);
}