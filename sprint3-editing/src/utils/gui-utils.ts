// utils

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
        width: '1',
        height: '2',
        position: '0 0 0'
    }

    setHtmlTags(containerGui, defaultProps);
    setHtmlTags(containerGui, props);

    return containerGui;
}

export function createLabel(text: string): HTMLElement {
    const labelGui = document.createElement('a-gui-label');

    const props = {
        width: '2',
        height: '0.5',
        value: text,
        'font-family': 'Arial',
        margin: "0 0 0.05 0"
    }

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
        'active-color': '#FFEB3B'
    };

    setHtmlTags(inputControl, defaultProps);
    setHtmlTags(inputControl, props);

    return inputControl;
}

export function createButton(props?): HTMLElement {
    let buttonControl = document.createElement('a-gui-button');

    // Style properties
    const defaultProps = {
        width: '0.5',
        height: '0.5',
        'font-family': 'Arial',
        'font-color': '#212121'
    };

    setHtmlTags(buttonControl, defaultProps);
    setHtmlTags(buttonControl, props);

    return buttonControl;
}

export function createSlider(props?): HTMLElement {
    let editControl = document.createElement('a-gui-slider');

    // Style properties
    const defaultProps = {
        width: '2',
        height: '0.5',
        percent: '0.9'
    };

    setHtmlTags(editControl, defaultProps);
    setHtmlTags(editControl, props);

    return editControl;
}

export function createToggle(props?): HTMLElement {
    let editControl = document.createElement('a-gui-toggle');

    // Style properties
    const defaultProps = {
        width: '2',
        height: '0.5'
    };

    setHtmlTags(editControl, defaultProps);
    setHtmlTags(editControl, props);

    return editControl;
}
