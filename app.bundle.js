(()=>{"use strict";var e={721:(e,t,n)=>{var i=n(569);const r="selectable-check";class o{constructor(){this.sceneEl=document.querySelector("a-scene")}static getInstance(){return o.instance||(o.instance=new o),o.instance}getSceneEl(){return this.sceneEl}}function s(e,t,n){const i=document.createElement(e.primitive);i.setAttribute("position",t);Object.keys(e).forEach((t=>{"primitive"!==t&&i.setAttribute(t,e[t])})),i.setAttribute("class","selectable"),i.setAttribute(r,""),n.appendChild(i)}class c{constructor(e,t,n){this.componentId="figures-palette",this.figures=t||new Array,this.appendPalette(e),setTimeout((()=>{!function(e){const t=document.querySelector(`#${e}`),n={dependencies:["raycaster"],init:function(){const e=this.el;this.el.addEventListener("click",(function(n){!function(e,t){const n=e.cloneNode();t.appendChild(n)}(e,t)}))}};(0,i.registerComponent)(r,n)}(n);const{x:e,y:t,z:o}=this.entityRef.getAttribute("position");this.figures.forEach(((n,i)=>{s(n,`${e+2-(i+1)} ${t} ${o}`,this.entityRef)}))}),0)}appendPalette(e){const t=o.getInstance().getSceneEl();this.entityRef=document.createElement("a-entity"),this.entityRef.setAttribute("id",this.componentId),Object.keys(e).forEach((t=>{this.entityRef.setAttribute(t,e[t])})),t.appendChild(this.entityRef)}}document.addEventListener("DOMContentLoaded",(function(e){console.log("DOM fully loaded");const t={id:"table",primitive:"a-box",color:"purple",height:.1,width:2};s(t,"0 0 1",o.getInstance().getSceneEl());new c({position:"0 0.5 0",rotation:"0 0 0"},[{primitive:"a-cone",color:"red","radius-bottom":.3},{primitive:"a-cylinder",color:"blue",radius:.3,height:1},{primitive:"a-sphere",color:"green",radius:.3},{primitive:"a-box",color:"yellow",height:.6,width:.6}],t.id)}))}},t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={exports:{}};return e[i](r,r.exports,n),r.exports}n.m=e,n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={143:0},t=[[721,569]],i=()=>{};function r(){for(var i,r=0;r<t.length;r++){for(var o=t[r],s=!0,c=1;c<o.length;c++){var a=o[c];0!==e[a]&&(s=!1)}s&&(t.splice(r--,1),i=n(n.s=o[0]))}return 0===t.length&&(n.x(),n.x=()=>{}),i}n.x=()=>{n.x=()=>{},s=s.slice();for(var e=0;e<s.length;e++)o(s[e]);return(i=r)()};var o=r=>{for(var o,s,[a,l,u,h]=r,p=0,d=[];p<a.length;p++)s=a[p],n.o(e,s)&&e[s]&&d.push(e[s][0]),e[s]=0;for(o in l)n.o(l,o)&&(n.m[o]=l[o]);for(u&&u(n),c(r);d.length;)d.shift()();return h&&t.push.apply(t,h),i()},s=self.webpackChunkaframe_editor_scene=self.webpackChunkaframe_editor_scene||[],c=s.push.bind(s);s.push=o})(),n.x()})();