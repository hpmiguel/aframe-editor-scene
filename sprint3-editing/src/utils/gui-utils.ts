
function setHtmlTags(node: HTMLElement, tags) {
    Object.keys(tags).forEach(propName => {
        const propValue = tags[propName];
        node.setAttribute(propName, propValue);
    });
}

export function createLabel(text: string) {
    const labelGui = document.createElement('a-gui-label');

    const props = {
        width: '2',
        height: '0.5',
        value: text,
        'font-family': 'Arial',
        margin: "0 0 0.05 0"
    }

    setHtmlTags(labelGui, props)

    return labelGui;
}

export function createSlider(props) {
    let editControl = document.createElement('a-gui-slider');

    // Style properties
    setHtmlTags(editControl, props);

    return editControl;
}
