import {Figure} from "../../../models/figure";
import {createButton, createContainer} from "../../../helpers/gui-helper";
import {textures} from '../../../utils/constants';

let _parentMenu: HTMLElement;
let _figure: Figure;

export function addControlEditMaterial(parentMenu: HTMLElement, figure: Figure) {
    _parentMenu = parentMenu;
    _figure = figure;

    addContainerButton();
}

function addContainerButton() {
    const containerButtons = createContainer({
        'flex-direction': 'column',
        margin: '0 0 0.05 0',
        width: '0.8',
        height: '0.4'
    });
    addRemoveMaterialButton(containerButtons);
    addChangeMateriaButton(containerButtons);
    _parentMenu.appendChild(containerButtons);
}

function addChangeMateriaButton(parent: HTMLElement) {
    // Create Button
    const buttonControl = createButton({
        value: 'Change texture',
        width: 0.8
    });

    // Interaction
    const customAction = 'changeTexture' + new Date().getTime();
    buttonControl.setAttribute('onclick', customAction);

    const texturesKeys = Object.keys(textures);
    let textureOffset = 0;

    window[customAction] = function (event) {
        event.stopPropagation();
        if (event instanceof CustomEvent) {
            textureOffset = (textureOffset + 1) > (texturesKeys.length - 1) ? 0 : textureOffset + 1;
            const textureKey = texturesKeys[textureOffset];
            const material = {
                src: textures[textureKey],
                roughness: 1
            };
            _figure.setMaterial(material);
        }
    }

    parent.appendChild(buttonControl);
}

function addRemoveMaterialButton(parent: HTMLElement) {
    // Create Button
    const buttonControl = createButton({
        value: 'Remove texture',
        width: 0.8
    });

    // Interaction
    const customAction = 'removeTexture' + new Date().getTime();
    buttonControl.setAttribute('onclick', customAction);


    window[customAction] = function (event) {
        event.stopPropagation();
        if (event instanceof CustomEvent) {
            _figure.setMaterial(null);
        }
    }

    parent.appendChild(buttonControl);
}