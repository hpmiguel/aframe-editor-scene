import {
    createButton,
    createContainer,
    createLabel,
    createSlider,
    rgbToHex
} from '../../utils/gui-utils';

class EditMenuFigure {

    private entityRef: HTMLElement;

    private figure: HTMLElement;
    private RGBFigure: { red: number; green: number; blue: number; } = { red: 0, green: 0, blue: 0 };

    constructor(figEditNode: HTMLElement) {
        this.figure = figEditNode;

        this.createMenuContainer();

        // Add controls properties
        this.addControlEditColor();
        // this.addControlEditOpacity(figEditNode);
    }

    private createMenuContainer() {
        this.entityRef = createContainer({
            width: '0.7',
            height: '3',
            position: '0 1.5 0'
        });
        this.figure.appendChild(this.entityRef);
    }

    private addControlEditOpacity() {
        // Label
        const label = createLabel('Opacity');
        this.entityRef.appendChild(label);

        // Create Slider
        const opacityControl = createSlider({
            percent: '0.5'
        });

        // Interaction
        const customAction = 'slideOpacity';
        opacityControl.setAttribute('onclick', customAction);

        window[customAction] = function (event, percent) {
            this.figure.setAttribute('opacity', percent);
        }

        this.entityRef.appendChild(opacityControl);
    }

    private addControlEditColor() {
        // Label
        const label = createLabel('Color');
        this.entityRef.appendChild(label);

        // Buttons
        ['red', 'green', 'blue'].forEach(rgbComponent => {
            this.addContainerButton(rgbComponent);
        });
    }

    private addContainerButton(rgbComponent: string) {
        const containerButtons = createContainer({
            'flex-direction': 'row',
            height: '0.6'
        });
        this.addButtonColor(rgbComponent, 'increase', containerButtons);
        this.addButtonColor(rgbComponent, 'decrease', containerButtons);
        this.entityRef.appendChild(containerButtons);
    }

    private addButtonColor(rgbComponent: string, operation: string, container: HTMLElement) {
        // Create Button
        const buttonControl = createButton({
            value: operation === 'increase' ? '+' : '-',
            'background-color': rgbComponent
        });

        // Interaction
        const customAction = operation + rgbComponent;
        buttonControl.setAttribute('onclick', customAction);

        const RGBFigure = this.RGBFigure;
        const figure = this.figure;

        window[customAction] = function (event) {
            const interval = 25;
            const op = operation === 'increase' ? interval : -interval;
            const newVal = RGBFigure[rgbComponent] + op;

            if (newVal >= 0 && newVal <= 255) {
                RGBFigure[rgbComponent] = newVal;
            }

            const { red, green, blue } =  RGBFigure;
            const colorHex = rgbToHex(red, green, blue);

            figure.setAttribute('color', colorHex);
        }

        container.appendChild(buttonControl);
    }

}

export { EditMenuFigure }
