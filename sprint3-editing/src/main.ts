import 'aframe';
import 'super-hands';
import 'aframe-gui';

import { FiguresPalette } from "./components/figures-palette/figures-palette";
import { Figures } from './models/Figures';
import { SceneRef } from './services/scene-ref';
import { appendFigure } from './utils/figure-utils';

document.addEventListener("DOMContentLoaded", function(event) {

    console.log("DOM fully loaded");

    const sceneEl = SceneRef.getInstance().getSceneEl();

    // Test figure to develop properties controls menu
    const box: Figures = {
        primitive: 'a-box',
        color: 'yellow',
        height: 0.6,
        width: 0.6,
        depth: 0.6
    };
    appendFigure(box, '-0.8 0.1 1.8', sceneEl);

    // // Render table to append cloned figures
    // const table =  {
    //     id: 'table',
    //     primitive: 'a-plane',
    //     color: 'purple',
    //     height: 1,
    //     width: 2,
    //     rotation: "-90 0 0"
    // };
    // appendFigure(table, '-0.8 0.1 1.8', sceneEl);
    //
    // const initialFigures: Array<Figures> = [
    //     {
    //         primitive: 'a-cone',
    //         color: 'red',
    //         'radius-bottom': 0.3
    //     },
    //     {
    //         primitive: 'a-cylinder',
    //         color: 'blue',
    //         radius: 0.3,
    //         height: 1
    //     },
    //     {
    //         primitive: 'a-sphere',
    //         color: 'green',
    //         radius: 0.3
    //     },
    //     {
    //         primitive: 'a-box',
    //         color: 'yellow',
    //         height: 0.6,
    //         width: 0.6,
    //         depth: 0.6
    //     }
    // ];
    //
    // // Render figures palette
    // new FiguresPalette(
    //     {
    //         position: "0 0.5 0",
    //         rotation: "0 0 0"
    //     },
    //     initialFigures,
    //     table.id
    // );

});

