import 'aframe';
import 'super-hands';
import 'aframe-gui';

import { FiguresPalette } from "./components/figures-palette/figures-palette";
import { Box } from './models/figure';
import { SceneRef } from './services/scene-ref';
import {appendFigure} from './helpers/figure-helper';
import { texturesPath } from "./utils/constants";
import {LightScene} from "./components/light-scene/light-scene";

document.addEventListener("DOMContentLoaded", function(event) {

    console.log("DOM fully loaded");

    const sceneEl = SceneRef.getInstance().getSceneEl();

    const lightScene = new LightScene({
        type: 'directional',
        castShadow: true,
        intensity: 0.98,
        shadowCameraVisible: false,
        position: "1 2 1.8"
    });

    // Test figure to develop properties controls menu
    const box = new Box({
        color: 'white',
        height: 0.5,
        width: 0.5,
        depth: 0.5,
        material: {
            src: texturesPath + 'paper.jpg',
            roughness: 1
        },
        shadow: false
    });
    appendFigure(box, '-0.8 0.4 1.8', sceneEl);

    // // Render table to append cloned figures
    // const table =  {
    //     id: 'table',
    //     color: 'purple',
    //     height: 1,
    //     width: 2,
    //     rotation: "-90 0 0"
    // };
    // appendFigure(table, '-0.8 0.1 1.8', sceneEl);
    //
    // const initialFigures: Array<Figures> = [
    //     {
    //         color: 'red',
    //         'radius-bottom': 0.3
    //     },
    //     {
    //         color: 'blue',
    //         radius: 0.3,
    //         height: 1
    //     },
    //     {
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

