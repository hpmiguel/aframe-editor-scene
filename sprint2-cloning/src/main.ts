import 'aframe';

import { FiguresPalette } from "./components/figures-palette/figures-palette";
import { Figures } from './models/Figures';
import { appendFigure } from './utils/component-utils';
import { SceneRef } from './services/scene-ref';

document.addEventListener("DOMContentLoaded", function(event) {

    console.log("DOM fully loaded");

    const sceneEl = SceneRef.getInstance().getSceneEl();

    // Render table to append cloned figures
    const table =  {
        id: 'table',
        primitive: 'a-box',
        color: 'purple',
        height: 0.1,
        width: 2
    };
    appendFigure(table, '0 0 1', sceneEl);

    const initialFigures: Array<Figures> = [
        {
            primitive: 'a-cone',
            color: 'red',
            'radius-bottom': 0.3
        },
        {
            primitive: 'a-cylinder',
            color: 'blue',
            radius: 0.3,
            height: 1
        },
        {
            primitive: 'a-sphere',
            color: 'green',
            radius: 0.3
        },
        {
            primitive: 'a-box',
            color: 'yellow',
            height: 0.6,
            width: 0.6
        }
    ];

    // Render figures palette
    new FiguresPalette(
        {
            position: "0 0.5 0",
            rotation: "0 0 0"
        },
        initialFigures,
        table.id
    );

});

