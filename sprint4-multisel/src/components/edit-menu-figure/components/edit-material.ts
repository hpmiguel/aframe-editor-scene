import {Figure} from "../../../models/figure";
import {createButton} from "../../../helpers/gui-helper";
import {textures} from '../../../utils/constants';

const texturesKeys = Object.keys(textures);
let textureOffset = 0;

export function addControlEditMaterial(parentMenu: HTMLElement, figure: Figure) {
    // Create Button
    const buttonControl = createButton({
        value: 'Change texture',
        'font-size': '50px',
        'background-color': 'grey',
        width: 0.8,
        margin: '0 0 0.05 0'
    });

    // Interaction
    const customAction = 'changeTexture' + new Date().getTime();
    buttonControl.setAttribute('onclick', customAction);

    window[customAction] = function (event) {
        textureOffset = (textureOffset + 1) > (texturesKeys.length - 1) ? 0 : textureOffset + 1;
        const textureKey = texturesKeys[textureOffset];
        const material = {
            src: textures[textureKey],
            roughness: 1
        };
        figure.setMaterial(material);
    }

    parentMenu.appendChild(buttonControl);
}
