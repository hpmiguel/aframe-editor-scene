import 'aframe';

import { FiguresPalette } from "./components/figures-palette/figures-palette";
import { Figures } from './models/Figures';

document.addEventListener("DOMContentLoaded", function(event) {

    console.log("DOM fully loaded");

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
    const figuresPalette = new FiguresPalette(
        {
            position: "0 0.5 0",
            rotation: "0 0 0"
        },
        initialFigures
    );

});

