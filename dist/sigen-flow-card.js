function t(t,e,s,i){var r,o=arguments.length,n=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o<3?r(n):o>3?r(e,s,n):r(e,s))||n);return o>3&&n&&Object.defineProperty(e,s,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;class o{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&r.set(e,t))}return t}toString(){return this.cssText}}const n=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new o(s,t,i)},a=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:h,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:g}=Object,u=globalThis,f=u.trustedTypes,y=f?f.emptyScript:"",_=u.reactiveElementPolyfillSupport,m=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?y:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},v=(t,e)=>!h(t,e),b={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:v};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;class w extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&l(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const o=i?.call(this);r?.call(this,e),this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),r=e.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const r=(void 0!==s.converter?.toAttribute?s.converter:$).toAttribute(e,s.type);this._$Em=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=i;const o=r.fromAttribute(e,t.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(void 0!==t){const o=this.constructor;if(!1===i&&(r=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??v)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}}w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[m("elementProperties")]=new Map,w[m("finalized")]=new Map,_?.({ReactiveElement:w}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,A=t=>t,E=x.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+M,P=`<${k}>`,D=document,R=()=>D.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,O="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,L=/>/g,z=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,I=/"/g,B=/^(?:script|style|textarea|title)$/i,F=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),W=F(1),q=F(2),G=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),Y=new WeakMap,X=D.createTreeWalker(D,129);function Z(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const J=(t,e)=>{const s=t.length-1,i=[];let r,o=2===e?"<svg>":3===e?"<math>":"",n=N;for(let e=0;e<s;e++){const s=t[e];let a,h,l=-1,c=0;for(;c<s.length&&(n.lastIndex=c,h=n.exec(s),null!==h);)c=n.lastIndex,n===N?"!--"===h[1]?n=H:void 0!==h[1]?n=L:void 0!==h[2]?(B.test(h[2])&&(r=RegExp("</"+h[2],"g")),n=z):void 0!==h[3]&&(n=z):n===z?">"===h[0]?(n=r??N,l=-1):void 0===h[1]?l=-2:(l=n.lastIndex-h[2].length,a=h[1],n=void 0===h[3]?z:'"'===h[3]?I:j):n===I||n===j?n=z:n===H||n===L?n=N:(n=z,r=void 0);const d=n===z&&t[e+1].startsWith("/>")?" ":"";o+=n===N?s+P:l>=0?(i.push(a),s.slice(0,l)+C+s.slice(l)+M+d):s+M+(-2===l?e:d)}return[Z(t,o+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class K{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,o=0;const n=t.length-1,a=this.parts,[h,l]=J(t,e);if(this.el=K.createElement(h,s),X.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=X.nextNode())&&a.length<n;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(C)){const e=l[o++],s=i.getAttribute(t).split(M),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:n[2],strings:s,ctor:"."===n[1]?it:"?"===n[1]?rt:"@"===n[1]?ot:st}),i.removeAttribute(t)}else t.startsWith(M)&&(a.push({type:6,index:r}),i.removeAttribute(t));if(B.test(i.tagName)){const t=i.textContent.split(M),e=t.length-1;if(e>0){i.textContent=E?E.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],R()),X.nextNode(),a.push({type:2,index:++r});i.append(t[e],R())}}}else if(8===i.nodeType)if(i.data===k)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(M,t+1));)a.push({type:7,index:r}),t+=M.length-1}r++}}static createElement(t,e){const s=D.createElement("template");return s.innerHTML=t,s}}function Q(t,e,s=t,i){if(e===G)return e;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const o=T(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(e=Q(t,r._$AS(t,e.values),r,i)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??D).importNode(e,!0);X.currentNode=i;let r=X.nextNode(),o=0,n=0,a=s[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new et(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new nt(r,this,t)),this._$AV.push(e),a=s[++n]}o!==a?.index&&(r=X.nextNode(),o++)}return X.currentNode=D,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),T(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==G&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(D.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=K.createElement(Z(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new tt(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=Y.get(t.strings);return void 0===e&&Y.set(t.strings,e=new K(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new et(this.O(R()),this.O(R()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class st{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=V}_$AI(t,e=this,s,i){const r=this.strings;let o=!1;if(void 0===r)t=Q(this,t,e,0),o=!T(t)||t!==this._$AH&&t!==G,o&&(this._$AH=t);else{const i=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=Q(this,i[s+n],e,n),a===G&&(a=this._$AH[n]),o||=!T(a)||a!==this._$AH[n],a===V?t=V:t!==V&&(t+=(a??"")+r[n+1]),this._$AH[n]=a}o&&!i&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends st{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class rt extends st{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class ot extends st{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??V)===G)return;const s=this._$AH,i=t===V&&s!==V||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==V&&(s===V||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const at=x.litHtmlPolyfillSupport;at?.(K,et),(x.litHtmlVersions??=[]).push("3.3.3");const ht=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class lt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let r=i._$litPart$;if(void 0===r){const t=s?.renderBefore??null;i._$litPart$=r=new et(e.insertBefore(R(),t),t,void 0,s??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return G}}lt._$litElement$=!0,lt.finalized=!0,ht.litElementHydrateSupport?.({LitElement:lt});const ct=ht.litElementPolyfillSupport;ct?.({LitElement:lt}),(ht.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt=t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:v},gt=(t=pt,e,s)=>{const{kind:i,metadata:r}=s;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),o.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const r=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,r,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const r=this[i];e.call(this,s),this.requestUpdate(i,r,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ut(t){return(e,s)=>"object"==typeof s?gt(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ft(t){return ut({...t,state:!0,attribute:!1})}const yt={solar:"#F5B400",battery:"#4FC3F7",grid:"#1A56C4",load:"#8E5FD6"},_t={day:"Day",week:"Week",month:"Month",year:"Year"},mt=["day","week","month","year"];function $t(t,e=.01){const s=Math.max(0,t.solar),i=Math.max(0,t.batteryCharge),r=Math.max(0,t.batteryDischarge),o=Math.max(0,t.gridImport),n=Math.max(0,t.gridExport),a=Math.max(0,t.load),h=[],l=(t,s,i)=>{i>e&&h.push({from:t,to:s,value:vt(i)})};let c=s,d=a;const p=Math.min(c,d);c-=p,d-=p,l("solar","load",p);let g=i;const u=Math.min(c,g);c-=u,g-=u,l("solar","battery",u);let f=n;const y=Math.min(c,f);f-=y,c-=y,l("solar","grid",y);const _=Math.min(r,d);d-=_,l("battery","load",_);let m=o;const $=Math.min(m,d);m-=$,d-=$,l("grid","load",$);if(l("grid","battery",Math.min(m,g)),c>e){const t=h.find(t=>"solar"===t.from&&"grid"===t.to);t?t.value=vt(t.value+c):l("solar","grid",c)}return h}function vt(t){return Math.round(1e3*t)/1e3}function bt(t,e,s=1){const i=new Date(e),r=new Date(e);switch(t){case"day":return i.setHours(0,0,0,0),r.setTime(i.getTime()),r.setDate(r.getDate()+1),{start:i,end:r,bucket:"hour"};case"week":{const t=(i.getDay()-s+7)%7;return i.setHours(0,0,0,0),i.setDate(i.getDate()-t),r.setTime(i.getTime()),r.setDate(r.getDate()+7),{start:i,end:r,bucket:"day"}}case"month":return i.setHours(0,0,0,0),i.setDate(1),r.setTime(i.getTime()),r.setMonth(r.getMonth()+1),{start:i,end:r,bucket:"day"};case"year":return i.setHours(0,0,0,0),i.setMonth(0,1),r.setTime(i.getTime()),r.setFullYear(r.getFullYear()+1),{start:i,end:r,bucket:"month"}}}async function wt(t,e,s,i,r=1){const{start:o,end:n,bucket:a}=bt(s,i,r),h=function(t){const e=[{id:t.solar_energy,field:"solar"},{id:t.battery_charge_energy,field:"batteryCharge"},{id:t.battery_discharge_energy,field:"batteryDischarge"},{id:t.grid_import_energy,field:"gridImport"},{id:t.grid_export_energy,field:"gridExport"}];return t.load_energy&&e.push({id:t.load_energy,field:"load"}),e.filter(t=>!!t.id)}(e),l=h.map(t=>t.id),c=await t.callWS({type:"history/statistics_during_period",start_time:o.toISOString(),end_time:n.toISOString(),statistic_ids:l,period:a,types:["change"]}),d=new Set;for(const t of l)for(const e of c[t]??[])d.add(new Date(e.start).getTime());const p=Array.from(d).sort((t,e)=>t-e),g=new Map;for(const t of l){const e=new Map;for(const s of c[t]??[])e.set(new Date(s.start).getTime(),s.change??0);g.set(t,e)}const u=p.map(t=>{const e={};for(const{id:s,field:i}of h)e[i]=g.get(s)?.get(t)??0;const s={solar:e.solar??0,batteryCharge:e.batteryCharge??0,batteryDischarge:e.batteryDischarge??0,gridImport:e.gridImport??0,gridExport:e.gridExport??0},i=e.load??function(t){return Math.max(0,t.solar+t.batteryDischarge+t.gridImport-t.batteryCharge-t.gridExport)}(s);return{...s,load:i}}),f=function(t,e=.01){const s=new Map;for(const i of t)for(const t of $t(i,e)){const e=`${t.from}->${t.to}`;s.set(e,(s.get(e)??0)+t.value)}const i=[];for(const[t,r]of s)if(r>e){const[e,s]=t.split("->");i.push({from:e,to:s,value:vt(r)})}return i}(u),y=u.reduce((t,e)=>({solar:t.solar+e.solar,batteryCharge:t.batteryCharge+e.batteryCharge,batteryDischarge:t.batteryDischarge+e.batteryDischarge,gridImport:t.gridImport+e.gridImport,gridExport:t.gridExport+e.gridExport,load:t.load+e.load}),{solar:0,batteryCharge:0,batteryDischarge:0,gridImport:0,gridExport:0,load:0});if(e.battery_soc){const s=t.states[e.battery_soc];s&&(y.batterySoc=Number(s.state))}return{flows:f,totals:y,lastUpdated:p.length?new Date(p[p.length-1]):null}}const xt=["solar","battery","grid"],At=["battery","load","grid"];const Et={solar:"Solar",battery:"Battery",grid:"Grid",load:"Home"};function St(t,e){return t>=100?`${t.toFixed(0)} ${e}`:t>=10?`${t.toFixed(1)} ${e}`:`${t.toFixed(2)} ${e}`}let Ct=class extends lt{constructor(){super(...arguments),this.period="day",this.anchor=new Date,this.weekStart=1}render(){const t=this._isCurrentPeriod();return W`
      <div class="tabs">
        ${mt.map(t=>W`
            <button
              class=${t===this.period?"active":""}
              @click=${()=>this._setPeriod(t)}
            >
              ${_t[t]}
            </button>
          `)}
      </div>
      <div class="nav">
        <button @click=${()=>this._step(-1)} aria-label="Previous ${this.period}">‹</button>
        <span class="range-label">${this._rangeLabel()}</span>
        <button @click=${()=>this._step(1)} ?disabled=${t} aria-label="Next ${this.period}">
          ›
        </button>
      </div>
    `}_setPeriod(t){this.period=t,this._emit()}_step(t){this.anchor=function(t,e,s){const i=new Date(e);switch(t){case"day":i.setDate(i.getDate()+s);break;case"week":i.setDate(i.getDate()+7*s);break;case"month":i.setMonth(i.getMonth()+s);break;case"year":i.setFullYear(i.getFullYear()+s)}return i}(this.period,this.anchor,t),this._emit()}_emit(){this.dispatchEvent(new CustomEvent("period-change",{detail:{period:this.period,anchor:this.anchor},bubbles:!0,composed:!0}))}_isCurrentPeriod(){const{start:t,end:e}=bt(this.period,this.anchor,this.weekStart),s=new Date;return s>=t&&s<e}_rangeLabel(){const{start:t,end:e}=bt(this.period,this.anchor,this.weekStart),s=new Date(e.getTime()-1),i=(t,e)=>t.toLocaleDateString(void 0,e);switch(this.period){case"day":return i(this.anchor,{weekday:"short",day:"numeric",month:"short"});case"week":return`${i(t,{day:"numeric",month:"short"})} – ${i(s,{day:"numeric",month:"short"})}`;case"month":return i(t,{month:"long",year:"numeric"});case"year":return i(t,{year:"numeric"})}}};Ct.styles=n`
    :host {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      flex-wrap: wrap;
      padding-bottom: 8px;
    }
    .tabs {
      display: flex;
      gap: 4px;
      background: var(--secondary-background-color, #f0f0f0);
      border-radius: 999px;
      padding: 3px;
    }
    .tabs button {
      border: none;
      background: transparent;
      padding: 4px 12px;
      border-radius: 999px;
      font-size: 0.85em;
      font-weight: 500;
      cursor: pointer;
      color: var(--primary-text-color);
    }
    .tabs button.active {
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
    }
    .nav {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.85em;
      color: var(--secondary-text-color);
    }
    .nav button {
      border: none;
      background: none;
      cursor: pointer;
      color: var(--primary-text-color);
      font-size: 1.1em;
      line-height: 1;
      padding: 2px 6px;
      border-radius: 6px;
    }
    .nav button:hover {
      background: var(--secondary-background-color, #f0f0f0);
    }
    .nav button:disabled {
      opacity: 0.35;
      cursor: default;
    }
    .range-label {
      min-width: 9em;
      text-align: center;
    }
  `,t([ut({attribute:!1})],Ct.prototype,"period",void 0),t([ut({attribute:!1})],Ct.prototype,"anchor",void 0),t([ut({type:Number})],Ct.prototype,"weekStart",void 0),Ct=t([dt("sigen-period-selector")],Ct);let Mt=class extends lt{setConfig(t){this._config=t}render(){if(!this._config)return W``;const t=this._config.entities??{};return W`
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
    `}_entityRow(t,e,s){return W`
      <div class="row">
        <label>${t}</label>
        <input
          type="text"
          placeholder="sensor.your_entity_id"
          .value=${s??""}
          @change=${t=>this._setEntity(e,t.target.value)}
        />
      </div>
    `}_set(t,e){if(!this._config)return;const s={...this._config,[t]:""===e?void 0:e};this._config=s,this._fireChanged()}_setEntity(t,e){if(!this._config)return;const s={...this._config.entities,[t]:e||void 0};this._config={...this._config,entities:s},this._fireChanged()}_fireChanged(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}};Mt.styles=n`
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
  `,t([ut({attribute:!1})],Mt.prototype,"hass",void 0),t([ft()],Mt.prototype,"_config",void 0),Mt=t([dt("sigen-flow-card-editor")],Mt);const kt=["solar_energy","battery_charge_energy","battery_discharge_energy","grid_import_energy","grid_export_energy"];let Pt=class extends lt{constructor(){super(...arguments),this._period="day",this._anchor=new Date,this._flows=[],this._lastUpdated=null,this._loading=!1,this._lastFetchAt=0,this._fetchToken=0}static getConfigElement(){return document.createElement("sigen-flow-card-editor")}static getStubConfig(){return{entities:{solar_energy:"",battery_charge_energy:"",battery_discharge_energy:"",grid_import_energy:"",grid_export_energy:""}}}setConfig(t){if(!t.entities)throw new Error("sigen-flow-card: `entities:` is required");for(const e of kt)if(!t.entities[e])throw new Error(`sigen-flow-card: entities.${e} is required`);this._config=t,this._period=t.default_period??"day",this._error=void 0,this._scheduleFetch(!0)}set hass(t){this._hass=t,this._scheduleFetch(!1)}get hass(){return this._hass}getCardSize(){return 5}getGridOptions(){return{rows:5,columns:12,min_rows:4,min_columns:6}}_scheduleFetch(t){if(!this._config||!this._hass)return;const e=Date.now();!t&&e-this._lastFetchAt<6e4||(this._lastFetchAt=e,this._fetch())}async _fetch(){if(!this._config||!this._hass)return;const t=++this._fetchToken;this._loading=0===this._flows.length,this._error=void 0;try{const{flows:e,totals:s,lastUpdated:i}=await wt(this._hass,this._config.entities,this._period,this._anchor,this._config.week_start??1);if(t!==this._fetchToken)return;this._flows=e,this._totals=s,this._lastUpdated=i}catch(e){if(t!==this._fetchToken)return;this._error=e instanceof Error?e.message:String(e)}finally{t===this._fetchToken&&(this._loading=!1)}}_onPeriodChange(t){this._period=t.detail.period,this._anchor=t.detail.anchor,this._lastFetchAt=Date.now(),this._fetch()}render(){if(!this._config)return V;const t={...yt,...this._config.colors??{}},e=!1!==this._config.show_updated;return W`
      <ha-card>
        ${this._config.title?W`<div class="title">${this._config.title}</div>`:V}

        <sigen-period-selector
          .period=${this._period}
          .anchor=${this._anchor}
          .weekStart=${this._config.week_start??1}
          @period-change=${this._onPeriodChange}
        ></sigen-period-selector>

        ${this._error?W`<div class="state-message error">⚠ ${this._error}</div>`:this._loading?W`<div class="state-message">Loading…</div>`:0===this._flows.length?W`<div class="state-message">
                  No energy recorded for this period yet.
                </div>`:this._renderGraph(t)}
        ${e&&this._lastUpdated?W`<div class="updated">
              as of ${this._lastUpdated.toLocaleString(void 0,{hour:"2-digit",minute:"2-digit",day:"numeric",month:"short"})} — long-term statistics can lag live data by up to ~1 hour
            </div>`:V}
      </ha-card>
    `}_renderGraph(t){const e=function(t,e,s=12,i=4){const r=new Map,o=new Map;for(const e of t)r.set(e.from,(r.get(e.from)??0)+e.value),o.set(e.to,(o.get(e.to)??0)+e.value);const n=xt.filter(t=>(r.get(t)??0)>0),a=At.filter(t=>(o.get(t)??0)>0),h=n.reduce((t,e)=>t+(r.get(e)??0),0),l=a.reduce((t,e)=>t+(o.get(e)??0),0),c=Math.max(h,l,.001),d=Math.max(n.length,a.length,1),p=Math.max(e-s*(d-1),i*d)/c,g=(t,e)=>{let r=0;const o=[];for(const n of t){const t=e.get(n)??0,a=Math.max(t*p,i);o.push({key:n,total:t,y0:r,y1:r+a}),r+=a+s}return o},u=g(n,r),f=g(a,o),y=new Map(u.map(t=>[t.key,t])),_=new Map(f.map(t=>[t.key,t])),m=new Map(u.map(t=>[t.key,t.y0])),$=new Map(f.map(t=>[t.key,t.y0])),v=[],b=new Map;for(const e of n){const s=t.filter(t=>t.from===e).sort((t,e)=>a.indexOf(t.to)-a.indexOf(e.to));for(const t of s){const s=y.get(e),i=Math.max(t.value/Math.max(s.total,.001)*(s.y1-s.y0),0),r=m.get(e),o=r+i;m.set(e,o),b.set(t,{y0:r,y1:o})}}const w=new Map;for(const e of a){const s=t.filter(t=>t.to===e).sort((t,e)=>n.indexOf(t.from)-n.indexOf(e.from));for(const t of s){const s=_.get(e),i=Math.max(t.value/Math.max(s.total,.001)*(s.y1-s.y0),0),r=$.get(e),o=r+i;$.set(e,o),w.set(t,{y0:r,y1:o})}}for(const e of t){const t=b.get(e),s=w.get(e);t&&s&&v.push({from:e.from,to:e.to,value:e.value,y0Left:t.y0,y1Left:t.y1,y0Right:s.y0,y1Right:s.y1})}return{leftNodes:u,rightNodes:f,links:v,scale:p}}(this._flows,200,14),s=Math.max(...e.leftNodes.map(t=>t.y1),...e.rightNodes.map(t=>t.y1),0),i=Math.max(0,(200-s)/2)+10,r={...e,leftNodes:e.leftNodes.map(t=>({...t,y0:t.y0+i,y1:t.y1+i})),rightNodes:e.rightNodes.map(t=>({...t,y0:t.y0+i,y1:t.y1+i})),links:e.links.map(t=>({...t,y0Left:t.y0Left+i,y1Left:t.y1Left+i,y0Right:t.y0Right+i,y1Right:t.y1Right+i}))};return function(t,e){const{width:s,height:i,colors:r,leftX:o,rightX:n,nodeBoxWidth:a,unit:h,animate:l,idPrefix:c}=e,d=t.links.reduce((t,e)=>Math.max(t,e.value),.001),p=[],g=[],u=[];t.links.forEach((t,e)=>{const s=r[t.from],i=`${c}-link-${e}`;if(p.push(q`
      <path
        d=${function(t,e,s,i,r,o){const n=(t+i)/2;return[`M ${t} ${e}`,`C ${n} ${e} ${n} ${r} ${i} ${r}`,`L ${i} ${o}`,`C ${n} ${o} ${n} ${s} ${t} ${s}`,"Z"].join(" ")}(o,t.y0Left,t.y1Left,n,t.y0Right,t.y1Right)}
        fill=${s}
        opacity="0.55"
        class="sigen-flow-ribbon"
      ></path>
    `),l){const e=(t.y0Left+t.y1Left)/2,r=(t.y0Right+t.y1Right)/2,a=function(t,e,s,i){const r=(t+s)/2;return`M ${t} ${e} C ${r} ${e} ${r} ${i} ${s} ${i}`}(o,e,n,r);g.push(q`<path id=${i} d=${a} fill="none" stroke="none"></path>`);const h=6-t.value/d*3.5,l=t.value/d>.5?3:2;for(let t=0;t<l;t++){const e=-h/l*t;u.push(q`
          <circle r="2.6" fill=${s} class="sigen-flow-dot">
            <animateMotion
              dur="${h}s"
              begin="${e}s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath href="#${i}"></mpath>
            </animateMotion>
          </circle>
        `)}}});const f=t.leftNodes.map(t=>{const e=r[t.key],s=(t.y0+t.y1)/2;return q`
      <g class="sigen-flow-node">
        <rect
          x=${o-a}
          y=${t.y0}
          width=${a}
          height=${Math.max(t.y1-t.y0,2)}
          rx="3"
          fill=${e}
        ></rect>
        <text
          x=${o-a-8}
          y=${s}
          text-anchor="end"
          dominant-baseline="middle"
          class="sigen-flow-node-label"
        >${Et[t.key]}</text>
        <text
          x=${o-a-8}
          y=${s+14}
          text-anchor="end"
          dominant-baseline="middle"
          class="sigen-flow-node-value"
        >${St(t.total,h)}</text>
      </g>
    `}),y=t.rightNodes.map(t=>{const e=r[t.key],s=(t.y0+t.y1)/2;return q`
      <g class="sigen-flow-node">
        <rect
          x=${n}
          y=${t.y0}
          width=${a}
          height=${Math.max(t.y1-t.y0,2)}
          rx="3"
          fill=${e}
        ></rect>
        <text
          x=${n+a+8}
          y=${s}
          text-anchor="start"
          dominant-baseline="middle"
          class="sigen-flow-node-label"
        >${Et[t.key]}</text>
        <text
          x=${n+a+8}
          y=${s+14}
          text-anchor="start"
          dominant-baseline="middle"
          class="sigen-flow-node-value"
        >${St(t.total,h)}</text>
      </g>
    `});return q`
    <svg viewBox="0 0 ${s} ${i}" width="100%" preserveAspectRatio="xMidYMid meet">
      <defs>${g}</defs>
      ${p}
      ${u}
      ${f}
      ${y}
    </svg>
  `}(r,{width:520,height:220,colors:t,leftX:130,rightX:390,nodeBoxWidth:10,unit:"kWh",animate:!0,idPrefix:this._config?.entities.solar_energy?.replace(/[^a-zA-Z0-9]/g,"")??"sigen"})}};Pt.styles=n`
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
    .sigen-flow-node-label {
      font-size: 11px;
      fill: var(--primary-text-color);
    }
    .sigen-flow-node-value {
      font-size: 11px;
      font-weight: 600;
      fill: var(--secondary-text-color);
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
