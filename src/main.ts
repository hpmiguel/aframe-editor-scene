import { FiguresPalette } from "./components/figures-palette/figures-palette";
import { registerSelectableFigure } from "./components/selectable-figure/selectable-figure";

document.addEventListener("DOMContentLoaded", function(event) {

    console.log("DOM fully loaded");

    // Registering components
    registerSelectableFigure();

    const figuresPalette = new FiguresPalette(
        {
            position: "0 0.5 -2",
            rotation: "0 0 0"
        }
    );

});

