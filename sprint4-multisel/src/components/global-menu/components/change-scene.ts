import {createButton} from "../../../helpers/gui-helper";

import Jquery from "jquery";

export function addControlChangeScene(parent: HTMLElement) {
    // Create Button
    const buttonControl = createButton({
        value: 'Change Scene',
        width: '0.8',
        margin: '0 0 0.05 0'
    });

    // Interaction
    const customAction = 'changeScene' + new Date().getTime();
    buttonControl.setAttribute('onclick', customAction);

    window[customAction] = function (event) {
        event.stopPropagation();
        if (event instanceof CustomEvent) {
            changeBackgroundScene();
        }
    }

    parent.appendChild(buttonControl);
}

const backgrounds = ['default', 'contact', 'egypt', 'checkerboard', 'forest', 'goaland', 'yavapai', 'goldmine',
                     'threetowers', 'poison', 'arches', 'tron', 'japan', 'dream', 'volcano', 'starry', 'osiris'];

let backgroundOffset = 1;

function changeBackgroundScene() {
    backgroundOffset = (backgroundOffset + 1) > (backgrounds.length - 1) ? 0 : backgroundOffset + 1;
    const background = backgrounds[backgroundOffset];
    Jquery('#background-scene').attr('environment',`preset: ${background}; groundColor: #445; grid: cross`);
}