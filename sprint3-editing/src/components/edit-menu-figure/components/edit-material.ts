import {Figure} from "../../../models/figure";
import {createButton} from "../../../helpers/gui-helper";
import {texturesPath} from "../../../utils/constants";

const textures = ['grass.jpg', 'paper.jpg', 'stone.jpg', 'wall-brick.jpg', 'wooden.jpg'];
let textureOffset = 0;

export function addControlEditMaterial(parentMenu: HTMLElement, figure: Figure) {
    // Create Button
    const buttonControl = createButton({
        value: 'Change texture',
        'font-size': '20px'
    });

    // Interaction
    const customAction = 'changeTexture';
    buttonControl.setAttribute('onclick', customAction);

    window[customAction] = function (event) {
        textureOffset = (textureOffset + 1) > (textures.length - 1) ? 0 : textureOffset + 1;
        const texture = textures[textureOffset];
        const material = {
            src: texturesPath + texture,
            roughness: 1
        };
        figure.setMaterial(material);
    }

    parentMenu.appendChild(buttonControl);
}