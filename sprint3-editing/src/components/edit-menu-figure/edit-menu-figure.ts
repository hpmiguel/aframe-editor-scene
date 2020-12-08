import {createLabel, createSlider} from '../../utils/gui-utils';

class EditMenuFigure {

    private entityRef: HTMLElement;

    constructor(figEditNode: HTMLElement) {
        this.createMenuContainer(figEditNode);

        // Add controls properties
        this.addControlEditOpacity(figEditNode);
    }

    private createMenuContainer(figEditNode: HTMLElement) {
        this.entityRef = document.createElement('a-gui-flex-container');

        // Styles Menu
        this.entityRef.setAttribute('flex-direction', 'column');
        this.entityRef.setAttribute('justify-content', 'center');
        this.entityRef.setAttribute('align-items', 'normal');
        this.entityRef.setAttribute('component-padding', '0.1');
        this.entityRef.setAttribute('opacity', '0.7');
        this.entityRef.setAttribute('width', '0.7');
        this.entityRef.setAttribute('height', '4.5');
        this.entityRef.setAttribute('position', '0 1s 0');
        this.entityRef.setAttribute('rotation', '0 0 0');

        figEditNode.appendChild(this.entityRef);
    }

    private addControlEditOpacity(figEditNode) {
        // Label
        const label = createLabel('opacity');
        this.entityRef.appendChild(label);

        // Create Slider
        const editControl = createSlider({
            width: '2',
            height: '0.5',
            percent: '0.85s'
        });

        // Interaction
        const customAction = 'slideOpacity' + new Date().getTime();
        editControl.setAttribute('onclick', customAction);

        window[customAction] = function (event, percent) {
            figEditNode.setAttribute('opacity', percent);
        }

        this.entityRef.appendChild(editControl);
    }

}

export { EditMenuFigure }
