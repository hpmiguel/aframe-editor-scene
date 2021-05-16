// utils

import {fontsPath} from "../utils/constants";

function componentToHex(c: number): string {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

export function rgbToHex(r: number, g: number, b: number): string {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


function setHtmlTags(node: HTMLElement, tags) {
    if (tags && Object.keys(tags).length) {
        Object.keys(tags).forEach(propName => {
            const propValue = tags[propName];
            node.setAttribute(propName, propValue);
        });
    }
}

// Components

export function createContainer(props?): HTMLElement {
    const containerGui = document.createElement('a-gui-flex-container');

    // Style properties
    const defaultProps = {
        'flex-direction': 'column',
        'justify-content': 'center',
        'align-items': 'normal',
        'component-padding': '0.1',
        opacity: '0.7',
        width: '0.8',
        height: '0.25',
        position: '0 0 0.05 0'
    }

    setHtmlTags(containerGui, defaultProps);
    setHtmlTags(containerGui, props);

    return containerGui;
}

export function createLabel(text: string, props?: any): HTMLElement {
    const labelGui = document.createElement('a-gui-label');

    const defaultProps = {
        width: '1',
        height: '0.2',
        value: text,
        'font-family': fontsPath+'/PressStart2P-Regular.ttf',
        'font-size': '80px',
        margin: "0 0 0.05 0",
        opacity: '0.8',
        'font-color': 'white',
        'background-color': '#363184'
    }

    setHtmlTags(labelGui, defaultProps);
    setHtmlTags(labelGui, props);

    return labelGui;
}

export function createInputText(props?): HTMLElement {
    let inputControl = document.createElement('a-gui-input');

    // Style properties
    const defaultProps = {
        width: '2',
        height: '0.5',
        value: '255,255,255',
        'font-size': '160px',
        'font-color': '#212121',
        'border-hover-color': '#212121',
        'background-color': '#FAFAFA',
        'hover-color': '#F5F5F5',
        'active-color': '#FFEB3B',
        opacity: '0.8'
    };

    setHtmlTags(inputControl, defaultProps);
    setHtmlTags(inputControl, props);

    return inputControl;
}

export function createButton(props?): HTMLElement {
    let buttonControl = document.createElement('a-gui-button');

    // Style properties
    const defaultProps = {
        width: '0.2',
        height: '0.2',
        // 'font-family': 'Arial',
        'font-size': '80px',
        'font-color': 'white',
        'background-color': '#606e9e',
        'hover-color': '#8791af',
        opacity: '0.8'
    };

    setHtmlTags(buttonControl, defaultProps);
    setHtmlTags(buttonControl, props);

    return buttonControl;
}

export function createSlider(props?): HTMLElement {
    let editControl = document.createElement('a-gui-slider');

    // Style properties
    const defaultProps = {
        width: '2.5',
        height: '0.25',
        percent: '0.99',
        margin: '0 0 0.05 0',
        opacity: '0.8',
        //'slider-bar-height': '0.01',
        'handle-outer-radius': '0.1',
        'handle-inner-radius': '0.07',
        'background-color': '#50687d'
    };

    setHtmlTags(editControl, defaultProps);
    setHtmlTags(editControl, props);

    return editControl;
}

export function createToggle(props?): HTMLElement {
    let editControl = document.createElement('a-gui-toggle');

    // Style properties
    const defaultProps = {
        width: '0.7',
        height: '0.2',
        'font-size': '70px',
        'font-color': 'white',
        margin: '0 0 0.05 0',
        opacity: '0.8',
        'background-color': '#50687d'
    };

    setHtmlTags(editControl, defaultProps);
    setHtmlTags(editControl, props);

    return editControl;
}
