import {FiguresPalette} from "./components/figures-palette/figures-palette.js";

document.addEventListener("DOMContentLoaded", function(event) {

    console.log("DOM fully loaded");

    const figuresPalette = new FiguresPalette(
        {
            position: "0 0.5 -2",
            rotation: "0 0 0"
        }
    );

});

