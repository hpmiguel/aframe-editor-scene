"use strict";
exports.__esModule = true;
var FiguresPalette = /** @class */ (function () {
    function FiguresPalette(attrs) {
        var _this = this;
        this.componentId = 'figures-palette';
        this.figures = [
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
        this.append(attrs);
        setTimeout(function () { return _this.appendFigures(); }, 0);
    }
    FiguresPalette.prototype.append = function (attrs) {
        var _this = this;
        var sceneEl = document.querySelector('a-scene');
        this.entityRef = document.createElement('a-entity');
        this.entityRef.setAttribute('id', this.componentId);
        var attrsKeys = Object.keys(attrs);
        attrsKeys.forEach(function (key) {
            _this.entityRef.setAttribute(key, attrs[key]);
        });
        sceneEl.appendChild(this.entityRef);
    };
    FiguresPalette.prototype.appendFigures = function () {
        var _this = this;
        var _a = this.entityRef.getAttribute('position'), x = _a.x, y = _a.y, z = _a.z;
        this.figures.forEach(function (fig, i) {
            var figEl = document.createElement(fig.primitive);
            var figCoords = (x + 2) - (i + 1) + (" " + y + " " + z);
            figEl.setAttribute('position', figCoords);
            figEl.setAttribute('selectable-check', '');
            figEl.setAttribute('class', 'selectable');
            var figProps = Object.keys(fig);
            figProps.forEach(function (key) {
                if (key !== 'primitive')
                    figEl.setAttribute(key, fig[key]);
            });
            _this.entityRef.appendChild(figEl);
        });
    };
    return FiguresPalette;
}());
exports.FiguresPalette = FiguresPalette;
