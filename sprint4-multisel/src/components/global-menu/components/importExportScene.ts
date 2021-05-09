import {createButton, createContainer} from "../../../helpers/gui-helper";
import {exportSceneAsHtml, importScene} from "../../../utils/export-scene";

let _parentMenu: HTMLElement;

export function addControlImportExport(parentMenu: HTMLElement) {
    _parentMenu = parentMenu;

    // Buttons
    addContainerButton();
}

function addContainerButton() {
    const containerButtons = createContainer({
        'flex-direction': 'row',
        margin: '0 0 0.05 0',
        width: '0.8',
        height: '0.2'
    });
    addImportButton(containerButtons);
    addExportButton(containerButtons);
    _parentMenu.appendChild(containerButtons);
}

function addImportButton(container: HTMLElement) {
    // Create Button
    const buttonControl = createButton({
        value: 'Import',
        width: '0.4'
    });

    // Interaction
    const customAction = 'import' + new Date().getTime();
    buttonControl.setAttribute('onclick', customAction);


    window[customAction] = function (event) {
        event.stopPropagation();
        if (event instanceof CustomEvent) {
            importScene();
        }
    }

    container.appendChild(buttonControl);
}

function addExportButton(container: HTMLElement) {
    // Create Button
    const buttonControl = createButton({
        value: 'Export',
        width: '0.4'
    });

    // Interaction
    const customAction = 'export' + new Date().getTime();
    buttonControl.setAttribute('onclick', customAction);


    window[customAction] = function (event) {
        event.stopPropagation();
        if (event instanceof CustomEvent) {
            exportSceneAsHtml()
        }
    }

    container.appendChild(buttonControl);
}
