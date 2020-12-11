import { registerComponent } from 'aframe';
import { selectableFigureAttr } from '../coneable-figure/cloneable-figure';

export const colorListenerAttr = 'color-listener';

export function registerColorListener() {
    const colorListenerComponent = {
        init: function () {
            this.el.addEventListener('didchangecolor', function (evt) {

                //Available return formats from colorwheel
                let style = evt.detail.style
                let rgb = evt.detail.rgb
                let hsv = evt.detail.hsv
                let hex = evt.detail.hex

                this.el.setAttribute('color', hex)
            });
        }
    };
    registerComponent(selectableFigureAttr, colorListenerComponent);
}
