(()=>{"use strict";var t,e={208:(t,e,n)=>{var i=n(569);n(972),n(409),n(928),n(132);class o{constructor(){this.sceneFigures=new Array,this.multiselectEnable=!1,this.selectedFigures=new Array}static getInstance(){return o.instance||(o.instance=new o),o.instance}getLightScene(){return this.lightScene}setLightScene(t){this.lightScene=t}getSceneFigures(){return this.sceneFigures}setSceneFigures(t){this.sceneFigures=t}removeSceneFigure(t){this.sceneFigures.filter((e=>e.htmlRef.innerHTML!==t.innerHTML))}getMultiselectEnable(){return this.multiselectEnable}setMultiselectEnable(t){this.multiselectEnable=t}getSelectedFigures(){return this.selectedFigures}setSelectedFigures(t){this.selectedFigures=t}deselectFigure(t){this.selectedFigures=this.selectedFigures.filter((e=>e.htmlRef.innerHTML!==t.innerHTML))}resetState(){this.setSceneFigures([]),this.setSelectedFigures([])}}const s="selectable-figure-scene";const r="assets/fonts",c="assets/images/textures/",a=".jpg",l={GRASS:c+"grass"+a,PAPER:c+"paper"+a,STONE:c+"stone"+a,WALLBRICK:c+"wall-brick"+a,WOODEN:c+"wooden"+a},h="clone-podium",u="selectable-figure-palette";function d(t){const e=t.toString(16);return 1==e.length?"0"+e:e}function p(t,e){e&&Object.keys(e).length&&Object.keys(e).forEach((n=>{const i=e[n];t.setAttribute(n,i)}))}function g(t){const e=document.createElement("a-gui-flex-container");return p(e,{"flex-direction":"column","justify-content":"center","align-items":"normal","component-padding":"0.1",opacity:"0.7",width:"0.8",height:"0.25",position:"0 0 0.05 0"}),p(e,t),e}function f(t,e){const n=document.createElement("a-gui-label");return p(n,{width:"1",height:"0.2",value:t,"font-family":r+"/PressStart2P-Regular.ttf","font-size":"80px",margin:"0 0 0.05 0",opacity:"0.8","font-color":"white","background-color":"#363184"}),p(n,e),n}function m(t){const e=document.createElement("a-gui-button");return p(e,{width:"0.2",height:"0.2","font-size":"80px","font-color":"white","background-color":"#606e9e","hover-color":"#8791af",opacity:"0.8"}),p(e,t),e}function b(t){const e=document.createElement("a-gui-slider");return p(e,{width:"2.5",height:"0.25",percent:"0.99",margin:"0 0 0.05 0",opacity:"0.8","handle-outer-radius":"0.1","handle-inner-radius":"0.07","background-color":"#50687d"}),p(e,t),e}function w(t){const e=document.createElement("a-gui-toggle");return p(e,{width:"0.7",height:"0.2","font-size":"70px","font-color":"white",margin:"0 0 0.05 0",opacity:"0.8","background-color":"#50687d"}),p(e,t),e}var y=n(486);const v={red:0,green:0,blue:0};let C,E,A,R,S,k;function T(t,e){E=t,C=e;const n=f("Color");E.appendChild(n),["red","green","blue"].forEach((t=>{!function(t){const e=g({"flex-direction":"row",margin:"0 0 0.01 0",width:"0.4",height:"0.2"});P(t,"decrease",e),P(t,"increase",e),E.appendChild(e)}(t)}))}function P(t,e,n){const i=m({value:"increase"===e?"+":"-","background-color":t}),o=e+t+(new Date).getTime();i.setAttribute("onclick",o);const s=(0,y.cloneDeep)(C);window[o]=function(n){if(n.stopPropagation(),n instanceof CustomEvent){const n=25,r="increase"===e?n:-n,c=v[t]+r;c>=0&&c<=255&&(v[t]=c);const{red:a,green:l,blue:h}=v,u=(i=l,o=h,"#"+d(a)+d(i)+d(o));s.setColor(u)}var i,o},n.appendChild(i)}function M(t,e){R=t,A=e;const n=f("Size");R.appendChild(n),function(){const t=g({"flex-direction":"row",margin:"0 0 0.05 0",width:"0.4",height:"0.2"});F("decrease",t),F("increase",t),R.appendChild(t)}()}function F(t,e){const n=m({value:"increase"===t?"+":"-"}),i=t+"size"+(new Date).getTime();n.setAttribute("onclick",i);const s=(0,y.cloneDeep)(A);window[i]=function(e){if(e.stopPropagation(),e instanceof CustomEvent){const e=.2,n="increase"===t?1+e:1-e,i=o.getInstance().getSelectedFigures();s?s.resize(n):!s&&i.length&&i.forEach((t=>t.resize(n)))}},e.appendChild(n)}function x(t,e){S=t,k=e,function(){const t=g({"flex-direction":"column",margin:"0 0 0.05 0",width:"0.8",height:"0.4"});(function(t){const e=m({value:"Remove texture",width:.8}),n="removeTexture"+(new Date).getTime();e.setAttribute("onclick",n),window[n]=function(t){t.stopPropagation(),t instanceof CustomEvent&&k.setMaterial(null)},t.appendChild(e)})(t),function(t){const e=m({value:"Change texture",width:.8}),n="changeTexture"+(new Date).getTime();e.setAttribute("onclick",n);const i=Object.keys(l);let o=0;window[n]=function(t){if(t.stopPropagation(),t instanceof CustomEvent){o=o+1>i.length-1?0:o+1;const t=i[o],e={src:l[t],roughness:1};k.setMaterial(e)}},t.appendChild(e)}(t),S.appendChild(t)}()}const L=o.getInstance();class O{constructor(t){this.figure=t,this.createMenuContainer(),function(t,e){const n=m({value:"X",margin:"0 0 0.1 0","background-color":"#c41b1b"}),i="closeMenu"+(new Date).getTime();n.setAttribute("onclick",i),window[i]=function(t){t.stopPropagation(),t instanceof CustomEvent&&e.htmlRef.childNodes[0].setAttribute("visible","false")},t.appendChild(n)}(this.entityRef,t),T(this.entityRef,t),function(t,e){const n=f("Opacity",{margin:"-0.05 0 0.15 0"});t.appendChild(n);const i=b({percent:"0.3"}),o="slideOpacity"+(new Date).getTime();i.setAttribute("onclick",o),window[o]=function(t,n){t.stopPropagation(),t instanceof CustomEvent&&e.setOpacity(n)},t.appendChild(i)}(this.entityRef,t),M(this.entityRef,t),function(t,e){const n=w({value:"Wireframe"}),i="setWireframe"+(new Date).getTime();n.setAttribute("onclick",i),window[i]=function(t){if(t.stopPropagation(),t instanceof CustomEvent){const t="true"===e.htmlRef.getAttribute("wireframe");e.setWireframe(!t)}},t.appendChild(n)}(this.entityRef,t),x(this.entityRef,t),function(t,e){const n=w({value:"Shadow"}),i="setShadow"+(new Date).getTime();n.setAttribute("onclick",i),window[i]=function(t){if(t.stopPropagation(),t instanceof CustomEvent){const t=e.htmlRef.getAttribute("shadow"),n=Boolean(null==t?void 0:t.receive);e.setShadow(!n)}},t.appendChild(n)}(this.entityRef,t),function(t,e){const n=m({value:"Clone",margin:"0 0 0.05 0",width:"0.5"}),i="closeMenu"+(new Date).getTime();n.setAttribute("onclick",i),window[i]=function(t){if(t.stopPropagation(),t instanceof CustomEvent){const t=document.querySelector("#clone-podium");j(e.htmlRef,t)}},t.appendChild(n)}(this.entityRef,t),function(t,e){const n=w({value:"Gravity"}),i="setPhysics"+(new Date).getTime();n.setAttribute("onclick",i),window[i]=function(t){t.stopPropagation(),t instanceof CustomEvent&&(Boolean(e.htmlRef.getAttribute("ammo-body"))?e.setPhysics(null):e.setPhysics({body:"dynamic",shape:"box"}))},t.appendChild(n)}(this.entityRef,t),function(t,e){const n=m({value:"Delete",margin:"0 0 0.05 0",width:"0.5","background-color":"red"}),i="deleteFigure"+(new Date).getTime();n.setAttribute("onclick",i),window[i]=function(t){t.stopPropagation(),t instanceof CustomEvent&&(L.removeSceneFigure(e.htmlRef),L.deselectFigure(e.htmlRef),e.htmlRef.remove())},t.appendChild(n)}(this.entityRef,t)}createMenuContainer(){this.entityRef=g({width:"2.6",height:"4",position:"0 2.5 0","panel-color":"#93b2e8"}),this.figure.htmlRef.appendChild(this.entityRef),this.entityRef.setAttribute("visible","false")}}const D=o.getInstance();function I(t){let e;switch(t.tagName.toLowerCase()){case"a-sphere":e=new V({radius:0});break;case"a-cone":e=new G({"radius-bottom":0,height:0});break;case"a-box":e=new K({width:0,height:0,depth:0});break;case"a-cylinder":e=new U({radius:0,height:0})}return Object.getOwnPropertyNames(e).forEach((n=>{e[n]=t.getAttribute(n)})),e.htmlRef=t,e}function j(t,e){const n=t.cloneNode();n.setAttribute("position","0 0 1.5"),n.setAttribute("rotation","90 0 0"),n.removeAttribute(u),n.setAttribute(s,"");const i={hoverable:!1,draggable:!0};H(n,i),B(n,i);const o=I(n);o.setPhysics({body:"dynamic",shape:"box"}),setTimeout((()=>o.setPhysics(null)),2e3),new O(o),D.getSceneFigures().push(o),e.appendChild(n)}function _(t,e){t.setAttribute("shadow",`receive: ${e}`)}function N(t,e){e?((null==e?void 0:e.body)&&t.setAttribute("ammo-body",`type: ${e.body}`),(null==e?void 0:e.shape)&&t.setAttribute("ammo-shape",`type: ${e.shape}`)):(t.removeAttribute("ammo-body"),t.removeAttribute("ammo-shape"))}function z(t){const e=D.getSceneFigures(),n=D.getSelectedFigures(),i=Boolean(n.find((e=>e.htmlRef.innerHTML===t.innerHTML))),o=e.find((e=>e.htmlRef.innerHTML===t.innerHTML));i?(D.deselectFigure(t),t.setAttribute("color",o.color)):(n.push(o),t.setAttribute("color","cyan"))}function $(t){const e=Object.keys(t);let n="";return e.forEach((e=>{n+=`${e}: ${String(t[e])}; `})),n}function H(t,e){e.hoverable&&t.setAttribute("hoverable",""),e.draggable&&(t.setAttribute("grabbable",""),t.setAttribute("draggable",""))}function B(t,e){e.hoverable&&(t.setAttribute("event-set__hoveron","_event: hover-start; material.opacity: 0.8; transparent: true"),t.setAttribute("event-set__hoveroff","_event: hover-end; material.opacity: 1; transparent: false")),e.draggable&&(t.setAttribute("event-set__dragdrop","event: drag-drop"),t.setAttribute("event-set__dragon","_event: dragover-start;"),t.setAttribute("event-set__dragoff","_event: dragover-end;"))}function W(t,e,n,i={draggable:!1,hoverable:!1,custom:""}){const o=document.createElement(t.primitive);o.setAttribute("position",e);Object.keys(t).forEach((e=>{switch(e){case"shadow":const n=Boolean(t.shadow);n&&_(o,n);break;case"physics":const i=t.physics;N(o,i);break;default:"primitive"!==e&&o.setAttribute(e,t[e])}})),o.setAttribute("class","selectable-superhands"),i.custom&&o.setAttribute(i.custom,""),H(o,i),B(o,i),n.appendChild(o),t.htmlRef=o}class q{constructor(t){this.color="white",this.shadow=!1,this.opacity=1,this.wireFrame=!1,this.physics=null;const{primitive:e,id:n,color:i,material:o,shadow:s,opacity:r,wireFrame:c,physics:a}=t;this.primitive=e,n&&(this.id=n),i&&(this.color=i),o&&(this.material=$(o)),s&&(this.shadow=s),r&&(this.opacity=r),c&&(this.wireFrame=c),a&&(this.physics=a)}setColor(t){this.color=t,this.htmlRef.setAttribute("color",t)}setMaterial(t){if(this.material=t,t){const e=$(t);"white"!==this.color&&this.setColor("white"),this.htmlRef.setAttribute("material",e)}else this.htmlRef.removeAttribute("material")}setOpacity(t){this.opacity=t,this.htmlRef.setAttribute("opacity",t.toString())}resize(t){this.htmlRef.object3D.scale.multiplyScalar(t)}setWireframe(t){this.wireFrame=t,this.htmlRef.setAttribute("wireframe",String(t))}setShadow(t){this.shadow=t,_(this.htmlRef,t)}setPhysics(t){this.physics=t,N(this.htmlRef,t)}}class G extends q{constructor(t){t.primitive="a-cone",super(t),this["radius-bottom"]=t["radius-bottom"],this.height=t.height}}class U extends q{constructor(t){const{height:e,radius:n}=t;t.primitive="a-cylinder",super(t),this.height=e,this.radius=n}}class V extends q{constructor(t){t.primitive="a-sphere",super(t),this.radius=t.radius}}class K extends q{constructor(t){const{height:e,width:n,depth:i}=t;t.primitive="a-box",super(t),this.height=e,this.width=n,this.depth=i}}class Q extends q{constructor(t){const{height:e,width:n,rotation:i}=t;t.primitive="a-plane",super(t),this.height=e,this.width=n,this.rotation=i}}class X{constructor(){this.sceneEl=document.querySelector("a-scene")}static getInstance(){return X.instance||(X.instance=new X),X.instance}getSceneEl(){return this.sceneEl}}class J{constructor(t){this.primitive="a-entity",this.props=t,this.createLightEntity()}createLightEntity(){this.htmlRef=document.createElement(this.primitive),this.setLightConfig();X.getInstance().getSceneEl().appendChild(this.htmlRef)}setLightConfig(){const t=Object.assign({},this.props),e=t.position;delete t.position;const n=$(t);this.htmlRef.setAttribute("light",n),this.htmlRef.setAttribute("position",e)}setIntensity(t){this.props.intensity=t,this.setLightConfig()}setPosition(t){this.props.position=t,this.setLightConfig()}timelapse(){const t=this.props.position.split(" "),e=this.props.intensity;let n=.01,i=-8;const o=(Math.abs(-8)+Math.abs(8))/50,s=(1-n)/50,r=this;let c=0;!function a(){setTimeout((()=>{c<=50&&(50===c?(r.setIntensity(e),r.setPosition(t.join(" "))):(r.setIntensity(n),r.setPosition(`${i} ${t[1]} ${t[2]}`),n<1?n+=2*s:n-=2*s,i+=o,c++,a()))}),60)}()}}class Y{constructor(t,e){this.componentId="figures-palette",this.figures=e||new Array,this.appendPalette(t),setTimeout((()=>{!function(){const t={dependencies:["raycaster"],init:function(){const t=this.el;let e=null;this.el.addEventListener("click",(function(n){if(n.stopPropagation(),n instanceof MouseEvent)if(e){if((new Date).getTime()-e<400){const e=document.querySelector("#clone-podium");j(t,e)}e=null}else e=(new Date).getTime()}))}};(0,i.registerComponent)(u,t)}(),this.appendFigures()}),0)}appendPalette(t){const e=X.getInstance().getSceneEl();this.entityRef=document.createElement("a-entity"),this.entityRef.setAttribute("id",this.componentId),Object.keys(t).forEach((e=>{this.entityRef.setAttribute(e,t[e])})),e.appendChild(this.entityRef)}appendFigures(){const{x:t,y:e,z:n}=this.entityRef.getAttribute("position");W(new Q({height:1.3,width:4,rotation:"0 0 0",color:"#211e1e"}),t-.5+" 0 0",this.entityRef),this.figures.forEach(((e,n)=>{const i={hoverable:!0,draggable:!1,custom:u};W(e,t+2-(n+1)+" 0 0",this.entityRef,i)}))}}var Z=n(755),tt=n.n(Z);const et=o.getInstance();function nt(t){const e=document.createElement("a-entity");e.setAttribute("rotation","90 0 0"),e.setAttribute("position","0 0 1"),e.innerHTML=t,tt()("#clone-podium").html(e),function(){et.resetState();Array.from(tt()("#clone-podium a-entity").children()).forEach(((t,e)=>{const n=I(t);new O(n),et.getSceneFigures().push(n),t.setAttribute("position",-.8*e+1.8+" 0 1")}))}()}function it(){const t=Array.from(tt()("#clone-podium").children());let e="";t.forEach((t=>{const n=function(t){const e=t.cloneNode(),n=document.createElement("div");return n.appendChild(e),n.innerHTML.toString()}(t);e+=n}));const n=document.createElement("a"),i=`scene_${(new Date).toISOString()}.html`,o=new Blob([e],{type:"text/html"});n.href=URL.createObjectURL(o),n.download=i,n.click()}let ot;function st(t){ot=t,function(){const t=g({"flex-direction":"row",margin:"0 0 0.1 0",width:"0.8",height:"0.2"});(function(t){const e=m({value:"Import",width:"0.4",margin:"0 0.05 0 0"}),n="import"+(new Date).getTime();e.setAttribute("onclick",n),window[n]=function(t){t.stopPropagation(),t instanceof CustomEvent&&tt()("#inputSceneFile").click()},t.appendChild(e)})(t),function(t){const e=m({value:"Export",width:"0.4"}),n="export"+(new Date).getTime();e.setAttribute("onclick",n),window[n]=function(t){t.stopPropagation(),t instanceof CustomEvent&&it()},t.appendChild(e)}(t),ot.appendChild(t)}()}function rt(t){const e=m({value:"Change Scene",width:"0.8",margin:"0 0 0.05 0"}),n="changeScene"+(new Date).getTime();e.setAttribute("onclick",n),window[n]=function(t){t.stopPropagation(),t instanceof CustomEvent&&function(){at=at+1>ct.length-1?0:at+1;const t=ct[at];tt()("#background-scene").attr("environment",`preset: ${t}; groundColor: #445; grid: cross`)}()},t.appendChild(e)}const ct=["default","contact","egypt","checkerboard","forest","goaland","yavapai","goldmine","threetowers","poison","arches","tron","japan","dream","volcano","starry","osiris"];let at=1;class lt{constructor(t){this.props=t,this.createMenuContainer();const e=f("Scene Menu",{margin:"0 0 0.1 0",width:"1.3"});this.entityRef.appendChild(e),rt(this.entityRef),function(t){const e=f("Light Intensity",{margin:"-0.05 0 0.15 0",width:"1.4","font-size":"60px"});t.appendChild(e);const n=b({percent:"0.3"}),i="slideIntensity"+(new Date).getTime();n.setAttribute("onclick",i);const s=o.getInstance().getLightScene();window[i]=function(t,e){t.stopPropagation(),t instanceof CustomEvent&&s.setIntensity(e)},t.appendChild(n)}(this.entityRef),function(t){const e=m({value:"Timelapse",width:"0.6",margin:"0 0 0.1 0"}),n="timelapse"+(new Date).getTime();e.setAttribute("onclick",n);const i=o.getInstance().getLightScene();window[n]=function(t){t.stopPropagation(),t instanceof CustomEvent&&i.timelapse()},t.appendChild(e)}(this.entityRef),st(this.entityRef),function(t){const e=w({value:"Multiselect Mode",width:"1"}),n="setMultiSelect"+(new Date).getTime();e.setAttribute("onclick",n);const i=o.getInstance();window[n]=function(t){if(t.stopPropagation(),t instanceof CustomEvent){const t=i.getMultiselectEnable();i.setMultiselectEnable(!t),t&&i.getSelectedFigures().forEach((t=>{z(t.htmlRef)}))}},t.appendChild(e)}(this.entityRef),M(this.entityRef,null)}createMenuContainer(){this.entityRef=g(this.props);X.getInstance().getSceneEl().appendChild(this.entityRef)}}function ht(t){tt()("body").append(`<script src="./src/vendor/${t}.js"><\/script>`)}class ut{constructor(t){this.infoContent=["1. Insert figure with double click","2. Edit figure with double click","3. Multiselect active","change behaviour double click","figure to group them.","Then you can resize group."],this.props=t,this.createMenuContainer();const e=f("Quick Start",{width:"1.3"});this.entityRef.appendChild(e),this.infoContent.forEach((t=>this.createLineDescription(t)))}createMenuContainer(){this.entityRef=g(this.props);X.getInstance().getSceneEl().appendChild(this.entityRef)}createLineDescription(t){const e=f(t,{width:"1.5",height:"0.15","font-family":r+"/PressStart2P-Regular.ttf","font-size":"30px","font-color":"white","background-color":"#5b53b8"});this.entityRef.appendChild(e)}}document.addEventListener("DOMContentLoaded",(function(t){console.log("DOM fully loaded");ht("ammo.wasm"),ht("aframe-physics-system.min"),document.getElementById("inputSceneFile").addEventListener("change",(function(){var t=new FileReader;t.onload=function(){nt(t.result.toString())},t.readAsText(this.files[0])}));const e=X.getInstance().getSceneEl(),n=o.getInstance(),r=new J({type:"directional",castShadow:!0,intensity:.9,shadowCameraVisible:!1,position:"0 3 4"});n.setLightScene(r);W(new Q({id:h,height:3,width:5,rotation:"-90 0 0",material:{src:l.WOODEN,roughness:1},physics:{body:"static",shape:"box"}}),"0 0.01 1.5",e),function(){const t={dependencies:["raycaster"],init:function(){const t=this.el;let e,n=null;const i=o.getInstance();this.el.addEventListener("click",(function(e){e.stopPropagation(),e instanceof MouseEvent&&(n?((new Date).getTime()-n<400&&(i.getMultiselectEnable()?z(t):t.childNodes[0].setAttribute("visible","true")),n=null):n=(new Date).getTime())})),this.el.addEventListener("mouseover",(function(n){e=function(t){const e=t.attributes;let n={};for(let t=0;t<e.length;t++){const i=e.item(t);n[i.nodeName]=i.nodeValue}return n}(t);const i=Number(null==e?void 0:e.opacity)-.2;t.setAttribute("opacity",i.toString())})),this.el.addEventListener("mouseleave",(function(n){const i=Number(t.getAttribute("opacity")),o=i!==Number(null==e?void 0:e.opacity)-.2?i:i+.2;t.setAttribute("opacity",o.toString())}))}};(0,i.registerComponent)(s,t)}();const c=[new G({"radius-bottom":.3,height:.8,color:"red"}),new U({radius:.3,height:.8,color:"blue"}),new V({radius:.3,color:"yellow"}),new K({height:.5,width:.5,depth:.5,color:"green"})];new Y({position:"0.2 2.3 0",rotation:"0 0 0"},c),new lt({width:"2.6",height:"2.6",position:"-3.6 2 1.5",rotation:"0 20 0"}),new ut({width:"1.8",height:"1.8",position:"3 1.8 1.5",rotation:"0 -20 0"})}))}},n={};function i(t){var o=n[t];if(void 0!==o)return o.exports;var s=n[t]={id:t,loaded:!1,exports:{}};return e[t].call(s.exports,s,s.exports,i),s.loaded=!0,s.exports}i.m=e,t=[],i.O=(e,n,o,s)=>{if(!n){var r=1/0;for(l=0;l<t.length;l++){for(var[n,o,s]=t[l],c=!0,a=0;a<n.length;a++)(!1&s||r>=s)&&Object.keys(i.O).every((t=>i.O[t](n[a])))?n.splice(a--,1):(c=!1,s<r&&(r=s));c&&(t.splice(l--,1),e=o())}return e}s=s||0;for(var l=t.length;l>0&&t[l-1][2]>s;l--)t[l]=t[l-1];t[l]=[n,o,s]},i.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return i.d(e,{a:e}),e},i.d=(t,e)=>{for(var n in e)i.o(e,n)&&!i.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),i.nmd=t=>(t.paths=[],t.children||(t.children=[]),t),(()=>{var t={143:0};i.O.j=e=>0===t[e];var e=(e,n)=>{var o,s,[r,c,a]=n,l=0;for(o in c)i.o(c,o)&&(i.m[o]=c[o]);for(a&&a(i),e&&e(n);l<r.length;l++)s=r[l],i.o(t,s)&&t[s]&&t[s][0](),t[r[l]]=0;i.O()},n=self.webpackChunkaframe_editor_scene=self.webpackChunkaframe_editor_scene||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))})();var o=i.O(void 0,[614],(()=>i(208)));o=i.O(o)})();