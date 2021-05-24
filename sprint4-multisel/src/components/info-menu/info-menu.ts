import {createContainer, createLabel} from "../../helpers/gui-helper";
import {SceneRef} from "../../services/scene-ref";
import {fontsPath} from "../../utils/constants";

export class InfoMenu {

    private entityRef: HTMLElement;

    private infoContent: Array<string> = [
        '1. Insert figure with double click',
        '2. Edit figure with double click',
        '3. Main menu ops',
        '   - Import export scene',
        '   - Multi selection mode,',
        '     changes double click figure',
        '     for grouping.',
        '     Then you can resize group.'
    ];

    constructor() {
        this.createMenuContainer();

        // Title
        const title = createLabel('QuickStart', {width: '1.2'});
        this.entityRef.appendChild(title);

        // Info content
        this.infoContent.forEach(line => this.createLineDescription(line));
    }

    private createMenuContainer() {
        this.entityRef = createContainer({
            width: '1.7',
            height: '2',
            position: '3 1.5 1.5',
            rotation: '0 -20 0'
            // 'panel-color': '#93b2e8'
        });

        const sceneEl = SceneRef.getInstance().getSceneEl();
        sceneEl.appendChild(this.entityRef);
    }

    private createLineDescription(line) {
        const lineLabel = createLabel(line, {
            width: '1.4',
            height: '0.15',
            'font-family': fontsPath+'/PressStart2P-Regular.ttf',
            'font-size': '30px',
            'font-color': 'white',
            'background-color': '#363184',
            // 'align': 'left'
        });
        this.entityRef.appendChild(lineLabel);
    }

}