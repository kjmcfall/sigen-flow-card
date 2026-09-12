function t(t,e,i,s){var r,o=arguments.length,n=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o<3?r(n):o>3?r(e,i,n):r(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;class o{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}}const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:h,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:g}=Object,u=globalThis,f=u.trustedTypes,y=f?f.emptyScript:"",_=u.reactiveElementPolyfillSupport,$=(t,e)=>t,m={toAttribute(t,e){switch(e){case Boolean:t=t?y:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!h(t,e),b={attribute:!0,type:String,converter:m,reflect:!1,useDefault:!1,hasChanged:v};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;class w extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);r?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),r=e.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:m).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:m;this._$Em=s;const o=r.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const o=this.constructor;if(!1===s&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??v)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}}w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[$("elementProperties")]=new Map,w[$("finalized")]=new Map,_?.({ReactiveElement:w}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,A=t=>t,E=x.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+M,P=`<${k}>`,D=document,R=()=>D.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,O="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,L=/>/g,z=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,I=/"/g,B=/^(?:script|style|textarea|title)$/i,F=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),q=F(1),W=F(2),G=Symbol.for("lit-noChange"),Y=Symbol.for("lit-nothing"),V=new WeakMap,X=D.createTreeWalker(D,129);function Z(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,s=[];let r,o=2===e?"<svg>":3===e?"<math>":"",n=N;for(let e=0;e<i;e++){const i=t[e];let a,h,l=-1,c=0;for(;c<i.length&&(n.lastIndex=c,h=n.exec(i),null!==h);)c=n.lastIndex,n===N?"!--"===h[1]?n=H:void 0!==h[1]?n=L:void 0!==h[2]?(B.test(h[2])&&(r=RegExp("</"+h[2],"g")),n=z):void 0!==h[3]&&(n=z):n===z?">"===h[0]?(n=r??N,l=-1):void 0===h[1]?l=-2:(l=n.lastIndex-h[2].length,a=h[1],n=void 0===h[3]?z:'"'===h[3]?I:j):n===I||n===j?n=z:n===H||n===L?n=N:(n=z,r=void 0);const d=n===z&&t[e+1].startsWith("/>")?" ":"";o+=n===N?i+P:l>=0?(s.push(a),i.slice(0,l)+C+i.slice(l)+M+d):i+M+(-2===l?e:d)}return[Z(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class K{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0;const n=t.length-1,a=this.parts,[h,l]=J(t,e);if(this.el=K.createElement(h,i),X.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=X.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=l[o++],i=s.getAttribute(t).split(M),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?st:"?"===n[1]?rt:"@"===n[1]?ot:it}),s.removeAttribute(t)}else t.startsWith(M)&&(a.push({type:6,index:r}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(M),e=t.length-1;if(e>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],R()),X.nextNode(),a.push({type:2,index:++r});s.append(t[e],R())}}}else if(8===s.nodeType)if(s.data===k)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(M,t+1));)a.push({type:7,index:r}),t+=M.length-1}r++}}static createElement(t,e){const i=D.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,s){if(e===G)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const o=T(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=Q(t,r._$AS(t,e.values),r,s)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??D).importNode(e,!0);X.currentNode=s;let r=X.nextNode(),o=0,n=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new et(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new nt(r,this,t)),this._$AV.push(e),a=i[++n]}o!==a?.index&&(r=X.nextNode(),o++)}return X.currentNode=D,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=Y,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),T(t)?t===Y||null==t||""===t?(this._$AH!==Y&&this._$AR(),this._$AH=Y):t!==this._$AH&&t!==G&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Y&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(D.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new tt(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new K(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new et(this.O(R()),this.O(R()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=Y,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Y}_$AI(t,e=this,i,s){const r=this.strings;let o=!1;if(void 0===r)t=Q(this,t,e,0),o=!T(t)||t!==this._$AH&&t!==G,o&&(this._$AH=t);else{const s=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=Q(this,s[i+n],e,n),a===G&&(a=this._$AH[n]),o||=!T(a)||a!==this._$AH[n],a===Y?t=Y:t!==Y&&(t+=(a??"")+r[n+1]),this._$AH[n]=a}o&&!s&&this.j(t)}j(t){t===Y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Y?void 0:t}}class rt extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Y)}}class ot extends it{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??Y)===G)return;const i=this._$AH,s=t===Y&&i!==Y||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==Y&&(i===Y||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const at=x.litHtmlPolyfillSupport;at?.(K,et),(x.litHtmlVersions??=[]).push("3.3.3");const ht=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class lt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new et(e.insertBefore(R(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return G}}lt._$litElement$=!0,lt.finalized=!0,ht.litElementHydrateSupport?.({LitElement:lt});const ct=ht.litElementPolyfillSupport;ct?.({LitElement:lt}),(ht.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:m,reflect:!1,hasChanged:v},gt=(t=pt,e,i)=>{const{kind:s,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ut(t){return(e,i)=>"object"==typeof i?gt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ft(t){return ut({...t,state:!0,attribute:!1})}const yt={solar:"#F0D264",battery:"#4FD9C4",grid:"#8B93E8",load:"#C79EEA"},_t={day:"Day",week:"Week",month:"Month",year:"Year"},$t=["day","week","month","year"];function mt(t,e=.01){const i=Math.max(0,t.solar),s=Math.max(0,t.batteryCharge),r=Math.max(0,t.batteryDischarge),o=Math.max(0,t.gridImport),n=Math.max(0,t.gridExport),a=Math.max(0,t.load),h=[],l=(t,i,s)=>{s>e&&h.push({from:t,to:i,value:vt(s)})};let c=i,d=a;const p=Math.min(c,d);c-=p,d-=p,l("solar","load",p);let g=s;const u=Math.min(c,g);c-=u,g-=u,l("solar","battery",u);let f=n;const y=Math.min(c,f);f-=y,c-=y,l("solar","grid",y);const _=Math.min(r,d);d-=_,l("battery","load",_);let $=o;const m=Math.min($,d);$-=m,d-=m,l("grid","load",m);if(l("grid","battery",Math.min($,g)),c>e){const t=h.find(t=>"solar"===t.from&&"grid"===t.to);t?t.value=vt(t.value+c):l("solar","grid",c)}return h}function vt(t){return Math.round(1e3*t)/1e3}function bt(t,e,i=1){const s=new Date(e),r=new Date(e);switch(t){case"day":return s.setHours(0,0,0,0),r.setTime(s.getTime()),r.setDate(r.getDate()+1),{start:s,end:r,bucket:"hour"};case"week":{const t=(s.getDay()-i+7)%7;return s.setHours(0,0,0,0),s.setDate(s.getDate()-t),r.setTime(s.getTime()),r.setDate(r.getDate()+7),{start:s,end:r,bucket:"day"}}case"month":return s.setHours(0,0,0,0),s.setDate(1),r.setTime(s.getTime()),r.setMonth(r.getMonth()+1),{start:s,end:r,bucket:"day"};case"year":return s.setHours(0,0,0,0),s.setMonth(0,1),r.setTime(s.getTime()),r.setFullYear(r.getFullYear()+1),{start:s,end:r,bucket:"month"}}}async function wt(t,e,i,s,r=1){const{start:o,end:n,bucket:a}=bt(i,s,r),h=function(t){const e=[{id:t.solar_energy,field:"solar"},{id:t.battery_charge_energy,field:"batteryCharge"},{id:t.battery_discharge_energy,field:"batteryDischarge"},{id:t.grid_import_energy,field:"gridImport"},{id:t.grid_export_energy,field:"gridExport"}];return t.load_energy&&e.push({id:t.load_energy,field:"load"}),e.filter(t=>!!t.id)}(e),l=h.map(t=>t.id),c=await t.callWS({type:"recorder/statistics_during_period",start_time:o.toISOString(),end_time:n.toISOString(),statistic_ids:l,period:a,types:["change"]}),d=new Set;for(const t of l)for(const e of c[t]??[])d.add(new Date(e.start).getTime());const p=Array.from(d).sort((t,e)=>t-e),g=new Map;for(const t of l){const e=new Map;for(const i of c[t]??[])e.set(new Date(i.start).getTime(),i.change??0);g.set(t,e)}const u=p.map(t=>{const e={};for(const{id:i,field:s}of h)e[s]=g.get(i)?.get(t)??0;const i={solar:e.solar??0,batteryCharge:e.batteryCharge??0,batteryDischarge:e.batteryDischarge??0,gridImport:e.gridImport??0,gridExport:e.gridExport??0},s=e.load??function(t){return Math.max(0,t.solar+t.batteryDischarge+t.gridImport-t.batteryCharge-t.gridExport)}(i);return{...i,load:s}}),f=function(t,e=.01){const i=new Map;for(const s of t)for(const t of mt(s,e)){const e=`${t.from}->${t.to}`;i.set(e,(i.get(e)??0)+t.value)}const s=[];for(const[t,r]of i)if(r>e){const[e,i]=t.split("->");s.push({from:e,to:i,value:vt(r)})}return s}(u),y=u.reduce((t,e)=>({solar:t.solar+e.solar,batteryCharge:t.batteryCharge+e.batteryCharge,batteryDischarge:t.batteryDischarge+e.batteryDischarge,gridImport:t.gridImport+e.gridImport,gridExport:t.gridExport+e.gridExport,load:t.load+e.load}),{solar:0,batteryCharge:0,batteryDischarge:0,gridImport:0,gridExport:0,load:0});if(e.battery_soc){const i=t.states[e.battery_soc];i&&(y.batterySoc=Number(i.state))}return{flows:f,totals:y,lastUpdated:p.length?new Date(p[p.length-1]):null}}const xt=["solar","battery","grid"],At=["battery","load","grid"];const Et={solar:"Solar",battery:"Battery",grid:"Grid",load:"Load"};function St(t,e,i,s,r,o){const n=t.y1-t.y0,a=i+10,h=Math.min(s-20,7*Et[t.key].length+20),l=o>0?t.total/o*100:0,c=n>=48,d=n>=68;return W`
    <g>
      ${n>=30?W`<rect
              x=${a}
              y=${t.y0+8}
              width=${h}
              height=${16}
              rx="8"
              class="sigen-flow-node-pill"
            ></rect>
            <text
              x=${a+h/2}
              y=${t.y0+8+8}
              text-anchor="middle"
              dominant-baseline="middle"
              class="sigen-flow-node-label"
            >${Et[t.key]}</text>`:""}
      ${c?W`<text
              x=${a}
              y=${t.y0+40}
              text-anchor="start"
              dominant-baseline="middle"
              class="sigen-flow-node-value"
            >${function(t,e){return t>=100?`${t.toFixed(0)} ${e}`:t>=10?`${t.toFixed(1)} ${e}`:`${t.toFixed(2)} ${e}`}(t.total,r)}</text>`:""}
      ${d?W`<text
              x=${a}
              y=${t.y1-10}
              text-anchor="start"
              dominant-baseline="middle"
              class="sigen-flow-node-pct"
            >${l.toFixed(0)}%</text>`:""}
    </g>
  `}let Ct=class extends lt{constructor(){super(...arguments),this.period="day",this.anchor=new Date,this.weekStart=1}render(){const t=this._isCurrentPeriod();return q`
      <div class="date-pill">
        <button @click=${()=>this._step(-1)} aria-label="Previous ${this.period}">‹</button>
        <span class="range-label">${this._rangeLabel()}</span>
        <button @click=${()=>this._step(1)} ?disabled=${t} aria-label="Next ${this.period}">
          ›
        </button>
      </div>
      <div class="period-pill">
        <select
          .value=${this.period}
          @change=${t=>this._setPeriod(t.target.value)}
        >
          ${$t.map(t=>q`<option value=${t}>${_t[t]}</option>`)}
        </select>
        <span class="chevron">▾</span>
      </div>
    `}_setPeriod(t){this.period=t,this._emit()}_step(t){this.anchor=function(t,e,i){const s=new Date(e);switch(t){case"day":s.setDate(s.getDate()+i);break;case"week":s.setDate(s.getDate()+7*i);break;case"month":s.setMonth(s.getMonth()+i);break;case"year":s.setFullYear(s.getFullYear()+i)}return s}(this.period,this.anchor,t),this._emit()}_emit(){this.dispatchEvent(new CustomEvent("period-change",{detail:{period:this.period,anchor:this.anchor},bubbles:!0,composed:!0}))}_isCurrentPeriod(){const{start:t,end:e}=bt(this.period,this.anchor,this.weekStart),i=new Date;return i>=t&&i<e}_rangeLabel(){const{start:t,end:e}=bt(this.period,this.anchor,this.weekStart),i=new Date(e.getTime()-1),s=(t,e)=>t.toLocaleDateString(void 0,e);switch(this.period){case"day":return s(this.anchor,{weekday:"short",day:"numeric",month:"short"});case"week":return`${s(t,{day:"numeric",month:"short"})} – ${s(i,{day:"numeric",month:"short"})}`;case"month":return s(t,{month:"long",year:"numeric"});case"year":return s(t,{year:"numeric"})}}};Ct.styles=n`
    :host {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      flex-wrap: wrap;
      padding-bottom: 12px;
    }
    .date-pill,
    .period-pill {
      display: flex;
      align-items: center;
      background: var(--secondary-background-color, #f0f0f0);
      border-radius: 999px;
      color: var(--primary-text-color);
    }
    .date-pill {
      gap: 4px;
      padding: 4px 6px;
    }
    .date-pill button {
      border: none;
      background: none;
      cursor: pointer;
      color: inherit;
      font-size: 1.1em;
      line-height: 1;
      padding: 4px 8px;
      border-radius: 999px;
    }
    .date-pill button:hover {
      background: rgba(127, 127, 127, 0.15);
    }
    .date-pill button:disabled {
      opacity: 0.35;
      cursor: default;
    }
    .range-label {
      min-width: 8.5em;
      text-align: center;
      font-size: 0.9em;
      font-weight: 500;
    }
    .period-pill {
      position: relative;
      padding: 0;
    }
    .period-pill select {
      appearance: none;
      -webkit-appearance: none;
      border: none;
      background: transparent;
      color: inherit;
      font: inherit;
      font-weight: 500;
      font-size: 0.9em;
      padding: 8px 30px 8px 16px;
      border-radius: 999px;
      cursor: pointer;
    }
    .period-pill .chevron {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      font-size: 0.7em;
      opacity: 0.7;
    }
  `,t([ut({attribute:!1})],Ct.prototype,"period",void 0),t([ut({attribute:!1})],Ct.prototype,"anchor",void 0),t([ut({type:Number})],Ct.prototype,"weekStart",void 0),Ct=t([dt("sigen-period-selector")],Ct);let Mt=class extends lt{setConfig(t){this._config=t}render(){if(!this._config)return q``;const t=this._config.entities??{};return q`
      <div class="row">
        <label>Title (optional)</label>
        <input
          type="text"
          .value=${this._config.title??""}
          @change=${t=>this._set("title",t.target.value)}
        />
      </div>

      <h3>Entities</h3>
      <div class="hint">
        Point these at your Sigenergy plant/storage device's daily energy sensors
        (e.g. "Daily PV Energy", "Daily Battery Charge Energy", ...) -- these are
        the totals the flow graph is built from. Check Developer Tools →
        Statistics if you're not sure an entity has long-term statistics.
      </div>

      ${this._entityRow("Solar energy (required)","solar_energy",t.solar_energy)}
      ${this._entityRow("Battery charge energy (required)","battery_charge_energy",t.battery_charge_energy)}
      ${this._entityRow("Battery discharge energy (required)","battery_discharge_energy",t.battery_discharge_energy)}
      ${this._entityRow("Grid import energy (required)","grid_import_energy",t.grid_import_energy)}
      ${this._entityRow("Grid export energy (required)","grid_export_energy",t.grid_export_energy)}
      ${this._entityRow("Load / consumption energy (optional -- derived if left blank)","load_energy",t.load_energy)}
      ${this._entityRow("Battery state of charge % (optional, display only)","battery_soc",t.battery_soc)}

      <h3>Period</h3>
      <div class="row">
        <label>Default period</label>
        <select
          .value=${this._config.default_period??"day"}
          @change=${t=>this._set("default_period",t.target.value)}
        >
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
      </div>
      <div class="row">
        <label>Week starts on</label>
        <select
          .value=${String(this._config.week_start??1)}
          @change=${t=>this._set("week_start",Number(t.target.value))}
        >
          <option value="1">Monday</option>
          <option value="0">Sunday</option>
        </select>
      </div>
    `}_entityRow(t,e,i){return q`
      <div class="row">
        <label>${t}</label>
        <input
          type="text"
          placeholder="sensor.your_entity_id"
          .value=${i??""}
          @change=${t=>this._setEntity(e,t.target.value)}
        />
      </div>
    `}_set(t,e){if(!this._config)return;const i={...this._config,[t]:""===e?void 0:e};this._config=i,this._fireChanged()}_setEntity(t,e){if(!this._config)return;const i={...this._config.entities,[t]:e||void 0};this._config={...this._config,entities:i},this._fireChanged()}_fireChanged(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}};Mt.styles=n`
    .row {
      display: flex;
      flex-direction: column;
      margin-bottom: 12px;
    }
    label {
      font-size: 0.85em;
      color: var(--secondary-text-color);
      margin-bottom: 4px;
    }
    input,
    select {
      padding: 8px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      font: inherit;
    }
    h3 {
      margin: 16px 0 4px 0;
      font-size: 0.95em;
    }
    .hint {
      font-size: 0.8em;
      color: var(--secondary-text-color);
      margin-top: -8px;
      margin-bottom: 12px;
    }
  `,t([ut({attribute:!1})],Mt.prototype,"hass",void 0),t([ft()],Mt.prototype,"_config",void 0),Mt=t([dt("sigen-flow-card-editor")],Mt);const kt=["solar_energy","battery_charge_energy","battery_discharge_energy","grid_import_energy","grid_export_energy"];let Pt=class extends lt{constructor(){super(...arguments),this._period="day",this._anchor=new Date,this._flows=[],this._lastUpdated=null,this._loading=!1,this._lastFetchAt=0,this._fetchToken=0}static getConfigElement(){return document.createElement("sigen-flow-card-editor")}static getStubConfig(){return{entities:{solar_energy:"",battery_charge_energy:"",battery_discharge_energy:"",grid_import_energy:"",grid_export_energy:""}}}setConfig(t){if(!t.entities)throw new Error("sigen-flow-card: `entities:` is required");for(const e of kt)if(!t.entities[e])throw new Error(`sigen-flow-card: entities.${e} is required`);this._config=t,this._period=t.default_period??"day",this._error=void 0,this._scheduleFetch(!0)}set hass(t){this._hass=t,this._scheduleFetch(!1)}get hass(){return this._hass}getCardSize(){return 6}getGridOptions(){return{rows:6,columns:12,min_rows:5,min_columns:6}}_scheduleFetch(t){if(!this._config||!this._hass)return;const e=Date.now();!t&&e-this._lastFetchAt<6e4||(this._lastFetchAt=e,this._fetch())}async _fetch(){if(!this._config||!this._hass)return;const t=++this._fetchToken;this._loading=0===this._flows.length,this._error=void 0;try{const{flows:e,totals:i,lastUpdated:s}=await wt(this._hass,this._config.entities,this._period,this._anchor,this._config.week_start??1);if(t!==this._fetchToken)return;this._flows=e,this._totals=i,this._lastUpdated=s}catch(e){if(t!==this._fetchToken)return;console.error("sigen-flow-card: fetch failed",e),this._error=function(t){if(t instanceof Error)return t.message;if(t&&"object"==typeof t){const e=t;if("string"==typeof e.message)return"string"==typeof e.code?`${e.message} (${e.code})`:e.message;if("string"==typeof e.code)return`Error: ${e.code}`;try{return JSON.stringify(t)}catch{}}return String(t)}(e)}finally{t===this._fetchToken&&(this._loading=!1)}}_onPeriodChange(t){this._period=t.detail.period,this._anchor=t.detail.anchor,this._lastFetchAt=Date.now(),this._fetch()}render(){if(!this._config)return Y;const t={...yt,...this._config.colors??{}},e=!1!==this._config.show_updated;return q`
      <ha-card>
        ${this._config.title?q`<div class="title">${this._config.title}</div>`:Y}

        <sigen-period-selector
          .period=${this._period}
          .anchor=${this._anchor}
          .weekStart=${this._config.week_start??1}
          @period-change=${this._onPeriodChange}
        ></sigen-period-selector>

        ${this._error?q`<div class="state-message error">⚠ ${this._error}</div>`:this._loading?q`<div class="state-message">Loading…</div>`:0===this._flows.length?q`<div class="state-message">
                  No energy recorded for this period yet.
                </div>`:this._renderGraph(t)}
        ${e&&this._lastUpdated?q`<div class="updated">
              as of ${this._lastUpdated.toLocaleString(void 0,{hour:"2-digit",minute:"2-digit",day:"numeric",month:"short"})} — long-term statistics can lag live data by up to ~1 hour
            </div>`:Y}
      </ha-card>
    `}_renderGraph(t){const e=function(t,e,i=12,s=4){const r=new Map,o=new Map;for(const e of t)r.set(e.from,(r.get(e.from)??0)+e.value),o.set(e.to,(o.get(e.to)??0)+e.value);const n=xt.filter(t=>(r.get(t)??0)>0),a=At.filter(t=>(o.get(t)??0)>0),h=n.reduce((t,e)=>t+(r.get(e)??0),0),l=a.reduce((t,e)=>t+(o.get(e)??0),0),c=Math.max(h,l,.001),d=Math.max(n.length,a.length,1),p=Math.max(e-i*(d-1),s*d)/c,g=(t,e)=>{let r=0;const o=[];for(const n of t){const t=e.get(n)??0,a=Math.max(t*p,s);o.push({key:n,total:t,y0:r,y1:r+a}),r+=a+i}return o},u=g(n,r),f=g(a,o),y=new Map(u.map(t=>[t.key,t])),_=new Map(f.map(t=>[t.key,t])),$=new Map(u.map(t=>[t.key,t.y0])),m=new Map(f.map(t=>[t.key,t.y0])),v=[],b=new Map;for(const e of n){const i=t.filter(t=>t.from===e).sort((t,e)=>a.indexOf(t.to)-a.indexOf(e.to));for(const t of i){const i=y.get(e),s=Math.max(t.value/Math.max(i.total,.001)*(i.y1-i.y0),0),r=$.get(e),o=r+s;$.set(e,o),b.set(t,{y0:r,y1:o})}}const w=new Map;for(const e of a){const i=t.filter(t=>t.to===e).sort((t,e)=>n.indexOf(t.from)-n.indexOf(e.from));for(const t of i){const i=_.get(e),s=Math.max(t.value/Math.max(i.total,.001)*(i.y1-i.y0),0),r=m.get(e),o=r+s;m.set(e,o),w.set(t,{y0:r,y1:o})}}for(const e of t){const t=b.get(e),i=w.get(e);t&&i&&v.push({from:e.from,to:e.to,value:e.value,y0Left:t.y0,y1Left:t.y1,y0Right:i.y0,y1Right:i.y1})}return{leftNodes:u,rightNodes:f,links:v,scale:p}}(this._flows,280,14,48),i=Math.max(...e.leftNodes.map(t=>t.y1),...e.rightNodes.map(t=>t.y1),0),s=Math.max(0,(280-i)/2)+10,r={...e,leftNodes:e.leftNodes.map(t=>({...t,y0:t.y0+s,y1:t.y1+s})),rightNodes:e.rightNodes.map(t=>({...t,y0:t.y0+s,y1:t.y1+s})),links:e.links.map(t=>({...t,y0Left:t.y0Left+s,y1Left:t.y1Left+s,y0Right:t.y0Right+s,y1Right:t.y1Right+s}))};return function(t,e){const{width:i,height:s,colors:r,leftX:o,rightX:n,unit:a,animate:h,idPrefix:l}=e,c=t.links.reduce((t,e)=>Math.max(t,e.value),.001),d=t.leftNodes.reduce((t,e)=>t+e.total,0),p=t.rightNodes.reduce((t,e)=>t+e.total,0),g=[],u=[],f=[],y=[];t.links.forEach((t,e)=>{const i=r[t.from],s=r[t.to],a=`${l}-link-${e}`,d=`${l}-grad-${e}`;if(u.push(W`
      <linearGradient id=${d} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color=${i}></stop>
        <stop offset="100%" stop-color=${s}></stop>
      </linearGradient>
    `),g.push(W`
      <path
        d=${function(t,e,i,s,r,o){const n=(t+s)/2;return[`M ${t} ${e}`,`C ${n} ${e} ${n} ${r} ${s} ${r}`,`L ${s} ${o}`,`C ${n} ${o} ${n} ${i} ${t} ${i}`,"Z"].join(" ")}(o,t.y0Left,t.y1Left,n,t.y0Right,t.y1Right)}
        fill="url(#${d})"
        opacity="0.6"
        class="sigen-flow-ribbon"
      ></path>
    `),h){const e=(t.y0Left+t.y1Left)/2,s=(t.y0Right+t.y1Right)/2,r=function(t,e,i,s){const r=(t+i)/2;return`M ${t} ${e} C ${r} ${e} ${r} ${s} ${i} ${s}`}(o,e,n,s);f.push(W`<path id=${a} d=${r} fill="none" stroke="none"></path>`);const h=6-t.value/c*3.5,l=t.value/c>.5?3:2;for(let t=0;t<l;t++){const e=-h/l*t;y.push(W`
          <circle r="2.6" fill=${i} class="sigen-flow-dot">
            <animateMotion
              dur="${h}s"
              begin="${e}s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath href="#${a}"></mpath>
            </animateMotion>
          </circle>
        `)}}});const _=t.leftNodes.map(t=>{const e=r[t.key];return W`
      <g class="sigen-flow-node">
        <rect
          x="0"
          y=${t.y0}
          width=${o}
          height=${Math.max(t.y1-t.y0,2)}
          rx="10"
          fill=${e}
        ></rect>
        ${St(t,0,0,o,a,d)}
      </g>
    `}),$=t.rightNodes.map(t=>{const e=r[t.key];return W`
      <g class="sigen-flow-node">
        <rect
          x=${n}
          y=${t.y0}
          width=${i-n}
          height=${Math.max(t.y1-t.y0,2)}
          rx="10"
          fill=${e}
        ></rect>
        ${St(t,0,n,i-n,a,p)}
      </g>
    `});return W`
    <svg viewBox="0 0 ${i} ${s}" width="100%" preserveAspectRatio="xMidYMid meet">
      <defs>
        ${u}
        ${f}
      </defs>
      ${g}
      ${y}
      ${_}
      ${$}
    </svg>
  `}(r,{width:520,height:300,colors:t,leftX:150,rightX:370,unit:"kWh",animate:!0,idPrefix:this._config?.entities.solar_energy?.replace(/[^a-zA-Z0-9]/g,"")??"sigen"})}};Pt.styles=n`
    ha-card {
      padding: 16px;
    }
    .title {
      font-size: 1.1em;
      font-weight: 500;
      margin-bottom: 8px;
    }
    .state-message {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 180px;
      color: var(--secondary-text-color);
      text-align: center;
      padding: 0 16px;
    }
    .state-message.error {
      color: var(--error-color, #db4437);
    }
    .updated {
      text-align: right;
      font-size: 0.72em;
      color: var(--secondary-text-color);
      margin-top: 4px;
    }
    .sigen-flow-node-pill {
      fill: rgba(255, 255, 255, 0.55);
    }
    .sigen-flow-node-label {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.02em;
      fill: #1a1a2e;
      text-transform: uppercase;
    }
    .sigen-flow-node-value {
      font-size: 17px;
      font-weight: 700;
      fill: #1a1a2e;
    }
    .sigen-flow-node-pct {
      font-size: 12px;
      font-weight: 500;
      fill: rgba(26, 26, 46, 0.65);
    }
    .sigen-flow-ribbon {
      transition: opacity 0.3s ease;
    }
    .sigen-flow-dot {
      filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.25));
    }
    @media (prefers-reduced-motion: reduce) {
      .sigen-flow-dot {
        display: none;
      }
    }
  `,t([ft()],Pt.prototype,"_config",void 0),t([ft()],Pt.prototype,"_period",void 0),t([ft()],Pt.prototype,"_anchor",void 0),t([ft()],Pt.prototype,"_flows",void 0),t([ft()],Pt.prototype,"_totals",void 0),t([ft()],Pt.prototype,"_lastUpdated",void 0),t([ft()],Pt.prototype,"_loading",void 0),t([ft()],Pt.prototype,"_error",void 0),Pt=t([dt("sigen-flow-card")],Pt),window.customCards=window.customCards||[],window.customCards.push({type:"sigen-flow-card",name:"Sigenergy Energy Flow Card",description:"A mySigen-style colour-coded energy flow graph (Solar/Battery/Grid → Battery/Load/Grid) with a Day/Week/Month/Year period selector, for Sigenergy ESS systems.",preview:!0,documentationURL:"https://github.com/kjmcfall/sigen-flow-card"});export{Pt as SigenFlowCard};
