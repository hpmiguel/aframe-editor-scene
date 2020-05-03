
class FiguresPalette {

    _componentId = 'figures-palette';

    _entityRef = {};

    _figures = [
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

    constructor (attrs) {
        this._append(attrs);
        setTimeout(() => this._appendFigures(), 0);
    }

    _append = (attrs) => {
        const sceneEl = document.querySelector('a-scene');
        this._entityRef = document.createElement('a-entity');
        this._entityRef.setAttribute('id', this._componentId);
        let attrsKeys = Object.keys(attrs);
        attrsKeys.forEach((key) => {
            this._entityRef.setAttribute(key, attrs[key]);
        });
        sceneEl.appendChild(this._entityRef);
    }

    _appendFigures = () => {
        const {x, y, z} = this._entityRef.getAttribute('position');
        this._figures.forEach((fig, i) => {
            const figEl = document.createElement(fig.primitive);
            const figCoords = (x + 2) - (i + 1) + ` ${y} ${z}`;
            figEl.setAttribute('position', figCoords);
            let figProps = Object.keys(fig);
            figProps.forEach((key) => {
                if (key !== 'primitive') figEl.setAttribute(key, fig[key]);
            });
            this._entityRef.appendChild(figEl);
        });
    }

}

export { FiguresPalette }
