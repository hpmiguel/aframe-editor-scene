import { registerComponent, registerPrimitive, THREE, scenes, components } from 'aframe';
import { defaults } from 'lodash';
import * as copy from 'copy-text-to-clipboard';

const ANIME = (AFRAME as any).ANIME;

export function registerColorWheel() {

    registerComponent('colorwheel',
        {
            dependencies: ['raycaster'],
            padding: 0.15,
            hsv: {
                h: 0.0,
                s: 0.0,
                v: 1.0
            },
            defaultMaterial: {
                color: '#ffffff',
                flatShading: true,
                transparent: true,
                shader: 'flat',
                fog: false,
                side: 'double'
            },
            color: '#ffffff',
            schema: {
                disabled: {
                    type: 'boolean',
                    default: false
                },
                backgroundColor: {
                    type: 'color',
                    default: '#FFF'
                },
                //Size of the colorWheel. NOTE: Assumed in metres.
                wheelSize: {
                    type: 'number',
                    default: 0.4
                },
                //Show color choice in an element
                showSelection: {
                    type: 'boolean',
                    default: true
                },
                selectionSize: {
                    type: 'number',
                    default: 0.10
                },
                showHexValue: {
                    type: 'boolean',
                    default: false
                },
                showSwatches: {
                    type: 'boolean',
                    default: false
                },
                swatches: {
                    type: 'array',
                    default: ['#000000', '#FFFFFF', '#ff0045', '#2aa8dc', '#ffed00', '#4c881d', '#b14bff']
                }
            },

            init: function init() {
                const _this = this;

                const that = this,
                    padding = this.padding,
                    defaultMaterial = this.defaultMaterial;

                this.swatchReady = false;

                //Background color of this interface
                //TODO: Expose sizing for deeper customisation?
                this.backgroundWidth = this.backgroundHeight = this.data.wheelSize * 2;
                this.brightnessSliderHeight = (this.data.wheelSize + padding) * 2;
                this.brightnessSliderWidth = 0.10;

                //Check if we have the a-rounded component
                if (components.hasOwnProperty('rounded')) {
                    this.background = document.createElement('a-rounded');
                    this.background.setAttribute('radius', 0.02);
                    this.background.setAttribute('position', {
                        x: -(this.data.wheelSize + padding),
                        y: -(this.data.wheelSize + padding),
                        z: -0.001
                    });
                } else {
                    this.background = document.createElement('a-plane');
                    this.background.setAttribute('position', {
                        x: 0,
                        y: 0,
                        z: -0.001
                    });
                }
                this.background.setAttribute('width', this.backgroundWidth + 2 * padding);
                this.background.setAttribute('height', this.backgroundHeight + 2 * padding);
                this.background.setAttribute('material', 'shader', 'flat');
                this.background.setAttribute('side', 'double');
                this.el.appendChild(this.background);

                //Show Swatches
                this.swatchContainer = document.createElement('a-plane');
                this.swatchContainer.setAttribute('class', 'swatch-container');
                this.swatchContainer.setAttribute('material', this.defaultMaterial);
                this.swatchContainer.addEventListener('loaded', this.onSwatchReady.bind(this));

                //Give swatch panel a rakish angle
                this.swatchContainer.setAttribute('rotation', {
                    x: -30,
                    y: 0,
                    z: 0
                });
                this.el.appendChild(this.swatchContainer);

                //Show hex value display
                if (this.data.showHexValue) {
                    const hexValueHeight = 0.1,
                        hexValueWidth = 2 * (this.data.wheelSize + padding);

                    this.hexValueText = document.createElement('a-entity');

                    //A basic geo is required for interactions
                    this.hexValueText.setAttribute('geometry', {
                        primitive: 'plane',
                        width: hexValueWidth - this.brightnessSliderWidth,
                        height: hexValueHeight
                    });

                    this.hexValueText.setAttribute('material', defaultMaterial);
                    this.hexValueText.setAttribute('position', {
                        x: -this.brightnessSliderWidth,
                        y: this.data.wheelSize + hexValueHeight,
                        z: 0.0
                    });

                    this.hexValueText.setAttribute('material', 'opacity', 0);
                    this.hexValueText.setAttribute('text', {
                        width: hexValueWidth,
                        height: hexValueHeight,
                        align: 'right',
                        baseline: 'center',
                        wrapCount: 20.4,
                        color: '#666'
                    });

                    //Copy value to clipboard on click
                    this.hexValueText.addEventListener('click', this.onHexValueClicked.bind(this));
                    this.el.appendChild(this.hexValueText);
                }

                //Circle for colorwheel
                this.colorWheel = document.createElement('a-circle');
                this.colorWheel.setAttribute('radius', this.data.wheelSize);
                this.colorWheel.setAttribute('material', defaultMaterial);
                this.colorWheel.setAttribute('position', {
                    x: 0,
                    y: 0,
                    z: 0.001
                });
                this.el.appendChild(this.colorWheel);

                //Plane for the brightness slider
                this.brightnessSlider = document.createElement('a-plane');
                this.brightnessSlider.setAttribute('width', this.brightnessSliderWidth);
                this.brightnessSlider.setAttribute('height', this.brightnessSliderHeight);
                this.brightnessSlider.setAttribute('material', defaultMaterial);
                this.brightnessSlider.setAttribute('position', {
                    x: this.data.wheelSize + this.brightnessSliderWidth,
                    y: 0,
                    z: 0.001
                });
                this.el.appendChild(this.brightnessSlider);

                //Plane the color selection element will inhabit
                if (this.data.showSelection) {
                    this.selectionEl = document.createElement('a-circle');
                    this.selectionEl.setAttribute('radius', this.data.selectionSize);
                    this.selectionEl.setAttribute('material', defaultMaterial);

                    //Place in top left, lift slightly
                    this.selectionEl.setAttribute('position', {
                        x: -this.data.wheelSize,
                        y: this.data.wheelSize,
                        z: 0.001
                    });
                    this.el.appendChild(this.selectionEl);
                }

                //Color 'cursor'. We'll use this to indicate a rough color selection
                this.colorCursorOptions = {
                    cursorRadius: 0.025,
                    cursorSegments: 32,
                    cursorColor: new THREE.Color(0x000000)
                };

                this.colorCursorOptions.cursorMaterial = new THREE.MeshBasicMaterial({
                    color: this.colorCursorOptions.cursorColor,
                    transparent: true
                });

                this.colorCursor = document.createElement('a-entity');
                this.brightnessCursor = document.createElement('a-entity');

                const geometry = new THREE.TorusBufferGeometry(this.colorCursorOptions.cursorRadius, this.colorCursorOptions.cursorRadius - 0.02, this.colorCursorOptions.cursorSegments, this.colorCursorOptions.cursorSegments / 4);
                this.colorCursor.setObject3D('mesh', new THREE.Mesh(geometry, this.colorCursorOptions.cursorMaterial));
                this.brightnessCursor.setObject3D('mesh', new THREE.Mesh(geometry, this.colorCursorOptions.cursorMaterial));

                this.el.appendChild(this.colorCursor);
                this.brightnessSlider.appendChild(this.brightnessCursor);
                this.brightnessCursor.setAttribute('position', {
                    x: 0,
                    y: this.brightnessSliderHeight / 2,
                    z: 0
                });

                //Handlers
                this.bindMethods();

                //TODO: Replace setTimeout as it can be unreliable
                setTimeout(function () {
                    that.el.initColorWheel();
                    that.el.initBrightnessSlider();
                    that.el.refreshRaycaster();
                    if (that.data.showSwatches) that.el.generateSwatches(that.data.swatches);
                    that.colorWheel.addEventListener('click', _this.onColorWheelClicked.bind(_this));
                    that.brightnessSlider.addEventListener('click', _this.onBrightnessSliderClicked.bind(_this));
                }, 5);
            },

            //Util to animate between positions. Item represents a mesh or object containing a position
            setPosition: function (item, fromPosition, toPosition) {
                // this.tween = new TWEEN.Tween(fromPosition).to(toPosition, this.tweenDuration).onUpdate(function () {
                //     item.position.x = this.x;
                //     item.position.y = this.y;
                //     item.position.z = this.z;
                // }).easing(this.tweenEasing).start();
                //
                // return this.tween;

                // tweenDuration: 280,
                // tweenEasing: TWEEN.Easing.Cubic.Out,

                // ANIME({
                //     targets: {},
                //     easing: 'linear',
                //     update: function() {
                //         item.position.x = this.x;
                //         item.position.y = this.y;
                //         item.position.z = this.z;
                //     }
                // });

                item.position.x = this.x;
                item.position.y = this.y;
                item.position.z = this.z;

            },

            //Util to animate between colors. Item represents a mesh or object's material
            setColor: function (item, fromColor, toColor) {
                // this.tween = new TWEEN.Tween(new THREE.Color(fromColor)).to(toColor, this.tweenDuration).onUpdate(function () {
                //     item.color.r = this.r;
                //     item.color.g = this.g;
                //     item.color.b = this.b;
                // }).easing(this.tweenEasing).start();
                //
                // return this.tween;

                // ANIME({
                //     targets: {},
                //     easing: 'linear',
                //     update: function() {
                //         item.color.r = this.r;
                //         item.color.g = this.g;
                //         item.color.b = this.b;
                //     }
                // });

                item.color.r = this.r;
                item.color.g = this.g;
                item.color.b = this.b;
            },

            onColorWheelClicked: function(evt) {
                if (this.data.disabled) return;
                this.el.onHueDown(evt.detail.intersection.point);
            },
            onBrightnessSliderClicked: function(evt) {
                if (this.data.disabled) return;
                this.el.onBrightnessDown(evt.detail.intersection.point);
            },
            onHexValueClicked: function() {
                copy(this.hexValueText.getAttribute('text').value);
            },
            generateSwatches: function(swatchData) {
                //Generate clickable swatch elements from a given array
                if (swatchData === undefined) return;

                const containerWidth = (this.data.wheelSize + this.padding) * 2,
                    containerHeight = 0.15,
                    swatchWidth = containerWidth / swatchData.length;

                this.swatchContainer.setAttribute('width', containerWidth);
                this.swatchContainer.setAttribute('height', containerHeight);
                this.swatchContainer.setAttribute('position', {
                    x: 0,
                    y: -this.backgroundHeight + containerHeight,
                    z: 0.03
                });

                //Loop through swatches and create elements
                for (let i = 0; i < swatchData.length; i++) {
                    const color = swatchData[i];
                    const swatch = document.createElement('a-plane');

                    swatch.setAttribute('material', this.defaultMaterial);
                    swatch.setAttribute('width', swatchWidth);
                    swatch.setAttribute('height', containerHeight);
                    swatch.setAttribute('color', color);
                    swatch.setAttribute('class', 'swatch');
                    swatch.setAttribute('position', {
                        x: -(containerWidth - swatchWidth) / 2 + i * swatchWidth,
                        y: 0,
                        z: 0.001 //prevent z-fighting
                    });
                    swatch.addEventListener('click', this.onSwatchClicked.bind(this, color));
                    this.swatchContainer.appendChild(swatch);
                }
                this.el.refreshRaycaster();
            },
            bindMethods: function() {
                this.el.generateSwatches = this.generateSwatches.bind(this);
                this.el.initColorWheel = this.initColorWheel.bind(this);
                this.el.initBrightnessSlider = this.initBrightnessSlider.bind(this);
                this.el.updateColor = this.updateColor.bind(this);
                this.el.onHueDown = this.onHueDown.bind(this);
                this.el.onBrightnessDown = this.onBrightnessDown.bind(this);
                this.el.refreshRaycaster = this.refreshRaycaster.bind(this);
                this.el.clearSwatches = this.clearSwatches.bind(this);
            },
            onSwatchReady: function() {
                this.swatchReady = true;
            },
            clearSwatches: function() {
                if (this.swatchReady) while (this.swatchContainer.firstChild) {
                    this.swatchContainer.removeChild(this.swatchContainer.firstChild);
                }
            },
            refreshRaycaster: function() {
                const raycasterEl: any = scenes[0].querySelector('[raycaster]');
                raycasterEl.components.raycaster.refreshObjects();
            },
            initBrightnessSlider: function() {
                /*
                 * NOTE:
                 *
                 * In A-Painter, the brightness slider is actually a model submesh / element.
                 * Here we generate it using GLSL and add it to our plane material
                 */

                const vertexShader = '\n      varying vec2 vUv;\n      void main(){\n        vUv = uv;\n        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);\n      }\n    ';
                const fragmentShader = '\n      #define M_PI2 6.28318530718\n      uniform float brightness;\n      varying vec2 vUv;\n      vec3 hsb2rgb(in vec3 c){\n          vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0 );\n          rgb = rgb * rgb * (3.0 - 2.0 * rgb);\n          return c.z * mix( vec3(1.0), rgb, c.y);\n      }\n\n      void main() {\n        vec2 toCenter = vec2(0.5) - vUv;\n        float angle = atan(toCenter.y, toCenter.x);\n        float radius = length(toCenter) * 2.0;\n        vec3 color = hsb2rgb(vec3((angle / M_PI2) + 0.5, radius, brightness));\n        gl_FragColor = vec4(color, 1.0);\n      }\n      ';

                const material = new THREE.ShaderMaterial({
                    uniforms: {
                        color1: {
                            value: new THREE.Color(0xFFFFFF)
                        },
                        color2: {
                            value: new THREE.Color(0x000000)
                        }
                    },
                    vertexShader: vertexShader,
                    fragmentShader: fragmentShader
                });

                this.brightnessSlider.getObject3D('mesh').material = material;
                this.brightnessSlider.getObject3D('mesh').material.needsUpdate = true;
            },
            initColorWheel: function() {
                const colorWheel = this.colorWheel.getObject3D('mesh');

                const vertexShader = '\n\n      varying vec2 vUv;\n      void main() {\n        vUv = uv;\n        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);\n        gl_Position = projectionMatrix * mvPosition;\n      }\n    ';
                const fragmentShader = '\n      #define M_PI2 6.28318530718\n      uniform float brightness;\n      varying vec2 vUv;\n      vec3 hsb2rgb(in vec3 c){\n          vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0 );\n          rgb = rgb * rgb * (3.0 - 2.0 * rgb);\n          return c.z * mix( vec3(1.0), rgb, c.y);\n      }\n\n      void main() {\n        vec2 toCenter = vec2(0.5) - vUv;\n        float angle = atan(toCenter.y, toCenter.x);\n        float radius = length(toCenter) * 2.0;\n        vec3 color = hsb2rgb(vec3((angle / M_PI2) + 0.5, radius, brightness));\n        gl_FragColor = vec4(color, 1.0);\n      }\n      ';

                const material = new THREE.ShaderMaterial({
                    uniforms: {
                        brightness: {
                            value: this.hsv.v
                        }
                    },
                    vertexShader: vertexShader,
                    fragmentShader: fragmentShader
                });

                colorWheel.material = material;
                colorWheel.material.needsUpdate = true;
            },
            onSwatchClicked: function(color) {
                const colorWheel = this.colorWheel.getObject3D('mesh'),
                    brightnessCursor = this.brightnessCursor.getObject3D('mesh'),
                    brightnessSlider = this.brightnessSlider.getObject3D('mesh');

                const rgb = this.hexToRgb(color);
                this.hsv = this.rgbToHsv(rgb.r, rgb.g, rgb.b);

                const angle = this.hsv.h * 2 * Math.PI,
                    radius = this.hsv.s * this.data.wheelSize;

                const x = radius * Math.cos(angle),
                    y = radius * Math.sin(angle),
                    z = colorWheel.position.z;

                const colorPosition = new THREE.Vector3(x, y, z);
                colorWheel.localToWorld(colorPosition);
                //We can reuse hueDown for this
                this.onHueDown(colorPosition);

                //Need to do the reverse of onbrightnessdown
                const offset = this.hsv.v * this.brightnessSliderHeight;
                const bY = offset - this.brightnessSliderHeight;
                const brightnessPosition = new THREE.Vector3(0, bY, 0);
                this.setPosition(brightnessCursor, brightnessCursor.position, brightnessPosition);
                colorWheel.material.uniforms['brightness'].value = this.hsv.v;
            },
            onBrightnessDown: function(position) {
                const brightnessSlider = this.brightnessSlider.getObject3D('mesh'),
                    brightnessCursor = this.brightnessCursor.getObject3D('mesh'),
                    colorWheel = this.colorWheel.getObject3D('mesh');

                brightnessSlider.updateMatrixWorld();
                brightnessSlider.worldToLocal(position);

                //Brightness is a value between 0 and 1. The parent plane is centre registered, hence offset
                const cursorOffset = position.y + this.brightnessSliderHeight / 2;
                const brightness = cursorOffset / this.brightnessSliderHeight;
                const updatedPosition = {
                    x: 0,
                    y: position.y - this.brightnessSliderHeight / 2,
                    z: 0

                    //Set brightness cursor position to offset position
                    // Uncomment to remove anims: brightnessCursor.position.copy(updatedPosition)
                };
                this.setPosition(brightnessCursor, brightnessCursor.position, updatedPosition);

                //Update material brightness
                colorWheel.material.uniforms['brightness'].value = brightness;
                this.hsv.v = brightness;
                this.el.updateColor();
            },
            onHueDown: function(position) {
                const colorWheel = this.colorWheel.getObject3D('mesh'),
                    colorCursor = this.colorCursor.getObject3D('mesh'),
                    radius = this.data.wheelSize;

                colorWheel.updateMatrixWorld();
                colorWheel.worldToLocal(position);

                // Uncomment to remove anims: this.colorCursor.getObject3D('mesh').position.copy(position)
                this.setPosition(colorCursor, colorCursor.position, position);

                //Determine Hue and Saturation value from polar co-ordinates
                const polarPosition = {
                    r: Math.sqrt(position.x * position.x + position.y * position.y),
                    theta: Math.PI + Math.atan2(position.y, position.x)
                };

                const angle = (polarPosition.theta * (180 / Math.PI) + 180) % 360;
                this.hsv.h = angle / 360;
                this.hsv.s = polarPosition.r / radius;

                this.el.updateColor();
            },
            updateColor: function() {
                const rgb = this.hsvToRgb(this.hsv),
                    color = 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')',
                    hex = '#' + new THREE.Color(color).getHexString();

                const selectionEl = this.selectionEl.getObject3D('mesh'),
                    colorCursor = this.colorCursor.getObject3D('mesh'),
                    brightnessCursor = this.brightnessCursor.getObject3D('mesh');

                //Update indicator element of selected color
                if (this.data.showSelection) {
                    //Uncomment for no tweens: selectionEl.material.color.set(color)
                    this.setColor(selectionEl.material, selectionEl.material.color, new THREE.Color(color));
                    selectionEl.material.needsUpdate = true;
                }

                //Change cursor colors based on brightness
                if (this.hsv.v >= 0.5) {
                    this.setColor(colorCursor.material, colorCursor.material.color, new THREE.Color(0x000000));
                    this.setColor(brightnessCursor.material, brightnessCursor.material.color, new THREE.Color(0x000000));
                } else {
                    this.setColor(colorCursor.material, colorCursor.material.color, new THREE.Color(0xFFFFFF));
                    this.setColor(brightnessCursor.material, brightnessCursor.material.color, new THREE.Color(0xFFFFFF));
                }

                //showHexValue set to true, update text
                if (this.data.showHexValue) this.hexValueText.setAttribute('text', 'value', hex);

                //Notify listeners the color has changed.
                const eventDetail = {
                    style: color,
                    rgb: rgb,
                    hsv: this.hsv,
                    hex: hex
                };

                new CustomEvent('changecolor',  {detail: eventDetail});
                new CustomEvent('didchangecolor',  {detail: eventDetail});
            },
            hexToRgb: function(hex) {
                const rgb = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (m, r, g, b) {
                    return '#' + r + r + g + g + b + b;
                }).substring(1).match(/.{2}/g).map(function (x) {
                    return parseInt(x, 16);
                });

                return {
                    r: rgb[0],
                    g: rgb[1],
                    b: rgb[2]
                };
            },
            rgbToHsv: function(r, g, b) {
                const max = Math.max(r, g, b);
                const min = Math.min(r, g, b);
                const d = max - min;
                let h;
                const s = max === 0 ? 0 : d / max;
                const v = max;

                if (arguments.length === 1) {
                    g = r.g;
                    b = r.b;
                    r = r.r;
                }

                switch (max) {
                    case min:
                        h = 0;
                        break;
                    case r:
                        h = g - b + d * (g < b ? 6 : 0);
                        h /= 6 * d;
                        break;
                    case g:
                        h = b - r + d * 2;
                        h /= 6 * d;
                        break;
                    case b:
                        h = r - g + d * 4;
                        h /= 6 * d;
                        break;
                }
                return {
                    h: h,
                    s: s,
                    v: v / 255
                };
            },
            hsvToRgb: function(hsv) {
                const MathThree = (THREE as any).Math;
                let r, g, b, i, f, p, q, t;
                const h = MathThree.clamp(hsv.h, 0, 1);
                const s = MathThree.clamp(hsv.s, 0, 1);
                const v = hsv.v;

                i = Math.floor(h * 6);
                f = h * 6 - i;
                p = v * (1 - s);
                q = v * (1 - f * s);
                t = v * (1 - (1 - f) * s);
                switch (i % 6) {
                    case 0:
                        r = v;
                        g = t;
                        b = p;
                        break;
                    case 1:
                        r = q;
                        g = v;
                        b = p;
                        break;
                    case 2:
                        r = p;
                        g = v;
                        b = t;
                        break;
                    case 3:
                        r = p;
                        g = q;
                        b = v;
                        break;
                    case 4:
                        r = t;
                        g = p;
                        b = v;
                        break;
                    case 5:
                        r = v;
                        g = p;
                        b = q;
                        break;
                }
                return {
                    r: Math.round(r * 255),
                    g: Math.round(g * 255),
                    b: Math.round(b * 255)
                };
            },
            update: function(oldData) {
                if (!oldData) return;
                if (this.data.backgroundColor !== oldData.backgroundColor) this.background.setAttribute('color', this.data.backgroundColor);

                const swatchesChanged = defaults(oldData.swatches, this.data.swatches).length > 0;
                if (swatchesChanged && this.data.showSwatches && this.data.swatches.filter(function (item) {
                    return item.length === 7;
                }).length === this.data.swatches.length) {
                    if (this.swatchReady) {
                        this.el.clearSwatches();
                        this.el.generateSwatches(this.data.swatches);
                    }
                }
            },
            tick: function() {},
            remove: function() {
                const that = this;
                //Kill any listeners
                this.colorWheel.removeEventListener('click', this.onColorWheelClicked);
                this.brightnessSlider.removeEventListener('click', this.onBrightnessSliderClicked);
                this.swatchContainer.removeEventListener('loaded', this.onSwatchReady);
                this.hexValueText.removeEventListener('click', this.onHexValueClicked);

                if (this.swatchContainer) this.swatchContainer.getObject3D('mesh').children.forEach(function (child) {
                    return child.removeEventListener('click', that);
                });
            },
            pause: function() {},
            play: function() {}
        });

    registerPrimitive('a-colorwheel', {
        defaultComponents: {
            colorwheel: {}
        },
        mappings: {
            disabled: 'colorwheel.disabled',
            backgroundcolor: 'colorwheel.backgroundColor',
            showselection: 'colorwheel.showSelection',
            wheelsize: 'colorwheel.wheelSize',
            selectionsize: 'colorwheel.selectionSize',
            showhexvalue: 'colorwheel.showHexValue',
            showswatches: 'colorwheel.showSwatches',
            swatches: 'colorwheel.swatches'
        }
    });

}
