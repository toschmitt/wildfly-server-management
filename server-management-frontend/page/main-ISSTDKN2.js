var LC=Object.defineProperty,BC=Object.defineProperties;var VC=Object.getOwnPropertyDescriptors;var sa=Object.getOwnPropertySymbols;var Bm=Object.prototype.hasOwnProperty,Vm=Object.prototype.propertyIsEnumerable;var Lm=(e,n,t)=>n in e?LC(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,v=(e,n)=>{for(var t in n||={})Bm.call(n,t)&&Lm(e,t,n[t]);if(sa)for(var t of sa(n))Vm.call(n,t)&&Lm(e,t,n[t]);return e},J=(e,n)=>BC(e,VC(n));var vd=(e,n)=>{var t={};for(var i in e)Bm.call(e,i)&&n.indexOf(i)<0&&(t[i]=e[i]);if(e!=null&&sa)for(var i of sa(e))n.indexOf(i)<0&&Vm.call(e,i)&&(t[i]=e[i]);return t};var ot=null,aa=!1,Ti=1,jC=null,pt=Symbol("SIGNAL");function R(e){let n=ot;return ot=e,n}function la(){return ot}var wr={version:0,lastCleanEpoch:0,dirty:!1,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:!1,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function Po(e){if(aa)throw new Error("");if(ot===null)return;ot.consumerOnSignalRead(e);let n=ot.producersTail;if(n!==void 0&&n.producer===e)return;let t,i=ot.recomputing;if(i&&(t=n!==void 0?n.nextProducer:ot.producers,t!==void 0&&t.producer===e)){ot.producersTail=t,t.lastReadVersion=e.version,t.knownValidAtEpoch=Ti;return}let r=e.consumersTail;if(r!==void 0&&r.consumer===ot&&(!i||r.knownValidAtEpoch===Ti))return;let o=Dr(ot),s={producer:e,consumer:ot,nextProducer:t,prevConsumer:void 0,knownValidAtEpoch:Ti,lastReadVersion:e.version,nextConsumer:void 0};ot.producersTail=s,n!==void 0?n.nextProducer=s:ot.producers=s,o&&$m(e,s)}function jm(){Ti++}function bd(e){if(!(Dr(e)&&!e.dirty)&&!(!e.dirty&&e.lastCleanEpoch===Ti)){if(!e.producerMustRecompute(e)&&!Lo(e)){ca(e);return}e.producerRecomputeValue(e),ca(e)}}function yd(e){if(e.consumers===void 0)return;let n=aa;aa=!0;try{for(let t=e.consumers;t!==void 0;t=t.nextConsumer){let i=t.consumer;i.dirty||UC(i)}}finally{aa=n}}function _d(){return ot?.consumerAllowSignalWrites!==!1}function UC(e){e.dirty=!0,yd(e),e.consumerMarkedDirty?.(e)}function ca(e){e.dirty=!1,e.lastCleanEpoch=Ti}function Er(e){return e&&Um(e),R(e)}function Um(e){if(e.producersTail?.knownValidAtEpoch===Ti){let n=e.producers;for(;n!==void 0;)n.knownValidAtEpoch=null,n=n.nextProducer}e.producersTail=void 0,e.recomputing=!0}function Fo(e,n){R(n),e&&Hm(e)}function Hm(e){e.recomputing=!1;let n=e.producersTail,t=n!==void 0?n.nextProducer:e.producers;if(t!==void 0){if(Dr(e))do t=wd(t);while(t!==void 0);n!==void 0?n.nextProducer=void 0:e.producers=void 0}}function Lo(e){for(let n=e.producers;n!==void 0;n=n.nextProducer){let t=n.producer,i=n.lastReadVersion;if(i!==t.version||(bd(t),i!==t.version))return!0}return!1}function Mi(e){if(Dr(e)){let n=e.producers;for(;n!==void 0;)n=wd(n)}e.producers=void 0,e.producersTail=void 0,e.consumers=void 0,e.consumersTail=void 0}function $m(e,n){let t=e.consumersTail,i=Dr(e);if(t!==void 0?(n.nextConsumer=t.nextConsumer,t.nextConsumer=n):(n.nextConsumer=void 0,e.consumers=n),n.prevConsumer=t,e.consumersTail=n,!i)for(let r=e.producers;r!==void 0;r=r.nextProducer)$m(r.producer,r)}function wd(e){let n=e.producer,t=e.nextProducer,i=e.nextConsumer,r=e.prevConsumer;if(e.nextConsumer=void 0,e.prevConsumer=void 0,i!==void 0?i.prevConsumer=r:n.consumersTail=r,r!==void 0)r.nextConsumer=i;else if(n.consumers=i,!Dr(n)){let o=n.producers;for(;o!==void 0;)o=wd(o)}return t}function Dr(e){return e.consumerIsAlwaysLive||e.consumers!==void 0}function Ed(e){jC?.(e)}function Dd(e,n){return Object.is(e,n)}function HC(){throw new Error}var zm=HC;function Gm(e){zm(e)}function Cd(e){zm=e}var $C=null;function Id(e,n){let t=Object.create(da);t.value=e,n!==void 0&&(t.equal=n);let i=()=>Wm(t);return i[pt]=t,Ed(t),[i,s=>Cr(t,s),s=>Sd(t,s)]}function Wm(e){return Po(e),e.value}function Cr(e,n){_d()||Gm(e),e.equal(e.value,n)||(e.value=n,zC(e))}function Sd(e,n){_d()||Gm(e),Cr(e,n(e.value))}var da=J(v({},wr),{equal:Dd,value:void 0,kind:"signal"});function zC(e){e.version++,jm(),yd(e),$C?.(e)}var xd=J(v({},wr),{consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,dirty:!0,kind:"effect"});function Td(e){if(e.dirty=!1,e.version>0&&!Lo(e))return;e.version++;let n=Er(e);try{e.cleanup(),e.fn()}finally{Fo(e,n)}}var Md;function ua(){return Md}function bn(e){let n=Md;return Md=e,n}var qm=Symbol("NotFound");function Ir(e){return e===qm||e?.name==="\u0275NotFound"}function Ym(e){let n=R(null);try{return e()}finally{R(n)}}function V(e){return typeof e=="function"}function Sr(e){let t=e(i=>{Error.call(i),i.stack=new Error().stack});return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t}var fa=Sr(e=>function(t){e(this),this.message=t?`${t.length} errors occurred during unsubscription:
${t.map((i,r)=>`${r+1}) ${i.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=t});function Ai(e,n){if(e){let t=e.indexOf(n);0<=t&&e.splice(t,1)}}var ee=class e{constructor(n){this.initialTeardown=n,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let n;if(!this.closed){this.closed=!0;let{_parentage:t}=this;if(t)if(this._parentage=null,Array.isArray(t))for(let o of t)o.remove(this);else t.remove(this);let{initialTeardown:i}=this;if(V(i))try{i()}catch(o){n=o instanceof fa?o.errors:[o]}let{_finalizers:r}=this;if(r){this._finalizers=null;for(let o of r)try{Zm(o)}catch(s){n=n??[],s instanceof fa?n=[...n,...s.errors]:n.push(s)}}if(n)throw new fa(n)}}add(n){var t;if(n&&n!==this)if(this.closed)Zm(n);else{if(n instanceof e){if(n.closed||n._hasParent(this))return;n._addParent(this)}(this._finalizers=(t=this._finalizers)!==null&&t!==void 0?t:[]).push(n)}}_hasParent(n){let{_parentage:t}=this;return t===n||Array.isArray(t)&&t.includes(n)}_addParent(n){let{_parentage:t}=this;this._parentage=Array.isArray(t)?(t.push(n),t):t?[t,n]:n}_removeParent(n){let{_parentage:t}=this;t===n?this._parentage=null:Array.isArray(t)&&Ai(t,n)}remove(n){let{_finalizers:t}=this;t&&Ai(t,n),n instanceof e&&n._removeParent(this)}};ee.EMPTY=(()=>{let e=new ee;return e.closed=!0,e})();var Ad=ee.EMPTY;function ha(e){return e instanceof ee||e&&"closed"in e&&V(e.remove)&&V(e.add)&&V(e.unsubscribe)}function Zm(e){V(e)?e():e.unsubscribe()}var Zt={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var xr={setTimeout(e,n,...t){let{delegate:i}=xr;return i?.setTimeout?i.setTimeout(e,n,...t):setTimeout(e,n,...t)},clearTimeout(e){let{delegate:n}=xr;return(n?.clearTimeout||clearTimeout)(e)},delegate:void 0};function pa(e){xr.setTimeout(()=>{let{onUnhandledError:n}=Zt;if(n)n(e);else throw e})}function Bo(){}var Km=Rd("C",void 0,void 0);function Qm(e){return Rd("E",void 0,e)}function Xm(e){return Rd("N",e,void 0)}function Rd(e,n,t){return{kind:e,value:n,error:t}}var Ri=null;function Tr(e){if(Zt.useDeprecatedSynchronousErrorHandling){let n=!Ri;if(n&&(Ri={errorThrown:!1,error:null}),e(),n){let{errorThrown:t,error:i}=Ri;if(Ri=null,t)throw i}}else e()}function Jm(e){Zt.useDeprecatedSynchronousErrorHandling&&Ri&&(Ri.errorThrown=!0,Ri.error=e)}var ki=class extends ee{constructor(n){super(),this.isStopped=!1,n?(this.destination=n,ha(n)&&n.add(this)):this.destination=YC}static create(n,t,i){return new Bn(n,t,i)}next(n){this.isStopped?Nd(Xm(n),this):this._next(n)}error(n){this.isStopped?Nd(Qm(n),this):(this.isStopped=!0,this._error(n))}complete(){this.isStopped?Nd(Km,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(n){this.destination.next(n)}_error(n){try{this.destination.error(n)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},WC=Function.prototype.bind;function kd(e,n){return WC.call(e,n)}var Od=class{constructor(n){this.partialObserver=n}next(n){let{partialObserver:t}=this;if(t.next)try{t.next(n)}catch(i){ma(i)}}error(n){let{partialObserver:t}=this;if(t.error)try{t.error(n)}catch(i){ma(i)}else ma(n)}complete(){let{partialObserver:n}=this;if(n.complete)try{n.complete()}catch(t){ma(t)}}},Bn=class extends ki{constructor(n,t,i){super();let r;if(V(n)||!n)r={next:n??void 0,error:t??void 0,complete:i??void 0};else{let o;this&&Zt.useDeprecatedNextContext?(o=Object.create(n),o.unsubscribe=()=>this.unsubscribe(),r={next:n.next&&kd(n.next,o),error:n.error&&kd(n.error,o),complete:n.complete&&kd(n.complete,o)}):r=n}this.destination=new Od(r)}};function ma(e){Zt.useDeprecatedSynchronousErrorHandling?Jm(e):pa(e)}function qC(e){throw e}function Nd(e,n){let{onStoppedNotification:t}=Zt;t&&xr.setTimeout(()=>t(e,n))}var YC={closed:!0,next:Bo,error:qC,complete:Bo};var Mr=typeof Symbol=="function"&&Symbol.observable||"@@observable";function Et(e){return e}function Pd(...e){return Fd(e)}function Fd(e){return e.length===0?Et:e.length===1?e[0]:function(t){return e.reduce((i,r)=>r(i),t)}}var L=(()=>{class e{constructor(t){t&&(this._subscribe=t)}lift(t){let i=new e;return i.source=this,i.operator=t,i}subscribe(t,i,r){let o=KC(t)?t:new Bn(t,i,r);return Tr(()=>{let{operator:s,source:a}=this;o.add(s?s.call(o,a):a?this._subscribe(o):this._trySubscribe(o))}),o}_trySubscribe(t){try{return this._subscribe(t)}catch(i){t.error(i)}}forEach(t,i){return i=eg(i),new i((r,o)=>{let s=new Bn({next:a=>{try{t(a)}catch(c){o(c),s.unsubscribe()}},error:o,complete:r});this.subscribe(s)})}_subscribe(t){var i;return(i=this.source)===null||i===void 0?void 0:i.subscribe(t)}[Mr](){return this}pipe(...t){return Fd(t)(this)}toPromise(t){return t=eg(t),new t((i,r)=>{let o;this.subscribe(s=>o=s,s=>r(s),()=>i(o))})}}return e.create=n=>new e(n),e})();function eg(e){var n;return(n=e??Zt.Promise)!==null&&n!==void 0?n:Promise}function ZC(e){return e&&V(e.next)&&V(e.error)&&V(e.complete)}function KC(e){return e&&e instanceof ki||ZC(e)&&ha(e)}function QC(e){return V(e?.lift)}function q(e){return n=>{if(QC(n))return n.lift(function(t){try{return e(t,this)}catch(i){this.error(i)}});throw new TypeError("Unable to lift unknown Observable type")}}function te(e,n,t,i,r){return new Ld(e,n,t,i,r)}var Ld=class extends ki{constructor(n,t,i,r,o,s){super(n),this.onFinalize=o,this.shouldUnsubscribe=s,this._next=t?function(a){try{t(a)}catch(c){n.error(c)}}:super._next,this._error=r?function(a){try{r(a)}catch(c){n.error(c)}finally{this.unsubscribe()}}:super._error,this._complete=i?function(){try{i()}catch(a){n.error(a)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var n;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:t}=this;super.unsubscribe(),!t&&((n=this.onFinalize)===null||n===void 0||n.call(this))}}};var tg=Sr(e=>function(){e(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var I=(()=>{class e extends L{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(t){let i=new ga(this,this);return i.operator=t,i}_throwIfClosed(){if(this.closed)throw new tg}next(t){Tr(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let i of this.currentObservers)i.next(t)}})}error(t){Tr(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=t;let{observers:i}=this;for(;i.length;)i.shift().error(t)}})}complete(){Tr(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:t}=this;for(;t.length;)t.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var t;return((t=this.observers)===null||t===void 0?void 0:t.length)>0}_trySubscribe(t){return this._throwIfClosed(),super._trySubscribe(t)}_subscribe(t){return this._throwIfClosed(),this._checkFinalizedStatuses(t),this._innerSubscribe(t)}_innerSubscribe(t){let{hasError:i,isStopped:r,observers:o}=this;return i||r?Ad:(this.currentObservers=null,o.push(t),new ee(()=>{this.currentObservers=null,Ai(o,t)}))}_checkFinalizedStatuses(t){let{hasError:i,thrownError:r,isStopped:o}=this;i?t.error(r):o&&t.complete()}asObservable(){let t=new L;return t.source=this,t}}return e.create=(n,t)=>new ga(n,t),e})(),ga=class extends I{constructor(n,t){super(),this.destination=n,this.source=t}next(n){var t,i;(i=(t=this.destination)===null||t===void 0?void 0:t.next)===null||i===void 0||i.call(t,n)}error(n){var t,i;(i=(t=this.destination)===null||t===void 0?void 0:t.error)===null||i===void 0||i.call(t,n)}complete(){var n,t;(t=(n=this.destination)===null||n===void 0?void 0:n.complete)===null||t===void 0||t.call(n)}_subscribe(n){var t,i;return(i=(t=this.source)===null||t===void 0?void 0:t.subscribe(n))!==null&&i!==void 0?i:Ad}};var Re=class extends I{constructor(n){super(),this._value=n}get value(){return this.getValue()}_subscribe(n){let t=super._subscribe(n);return!t.closed&&n.next(this._value),t}getValue(){let{hasError:n,thrownError:t,_value:i}=this;if(n)throw t;return this._throwIfClosed(),i}next(n){super.next(this._value=n)}};var Vo={now(){return(Vo.delegate||Date).now()},delegate:void 0};var va=class extends I{constructor(n=1/0,t=1/0,i=Vo){super(),this._bufferSize=n,this._windowTime=t,this._timestampProvider=i,this._buffer=[],this._infiniteTimeWindow=!0,this._infiniteTimeWindow=t===1/0,this._bufferSize=Math.max(1,n),this._windowTime=Math.max(1,t)}next(n){let{isStopped:t,_buffer:i,_infiniteTimeWindow:r,_timestampProvider:o,_windowTime:s}=this;t||(i.push(n),!r&&i.push(o.now()+s)),this._trimBuffer(),super.next(n)}_subscribe(n){this._throwIfClosed(),this._trimBuffer();let t=this._innerSubscribe(n),{_infiniteTimeWindow:i,_buffer:r}=this,o=r.slice();for(let s=0;s<o.length&&!n.closed;s+=i?1:2)n.next(o[s]);return this._checkFinalizedStatuses(n),t}_trimBuffer(){let{_bufferSize:n,_timestampProvider:t,_buffer:i,_infiniteTimeWindow:r}=this,o=(r?1:2)*n;if(n<1/0&&o<i.length&&i.splice(0,i.length-o),!r){let s=t.now(),a=0;for(let c=1;c<i.length&&i[c]<=s;c+=2)a=c;a&&i.splice(0,a+1)}}};var ba=class extends ee{constructor(n,t){super()}schedule(n,t=0){return this}};var jo={setInterval(e,n,...t){let{delegate:i}=jo;return i?.setInterval?i.setInterval(e,n,...t):setInterval(e,n,...t)},clearInterval(e){let{delegate:n}=jo;return(n?.clearInterval||clearInterval)(e)},delegate:void 0};var ya=class extends ba{constructor(n,t){super(n,t),this.scheduler=n,this.work=t,this.pending=!1}schedule(n,t=0){var i;if(this.closed)return this;this.state=n;let r=this.id,o=this.scheduler;return r!=null&&(this.id=this.recycleAsyncId(o,r,t)),this.pending=!0,this.delay=t,this.id=(i=this.id)!==null&&i!==void 0?i:this.requestAsyncId(o,this.id,t),this}requestAsyncId(n,t,i=0){return jo.setInterval(n.flush.bind(n,this),i)}recycleAsyncId(n,t,i=0){if(i!=null&&this.delay===i&&this.pending===!1)return t;t!=null&&jo.clearInterval(t)}execute(n,t){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;let i=this._execute(n,t);if(i)return i;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(n,t){let i=!1,r;try{this.work(n)}catch(o){i=!0,r=o||new Error("Scheduled action threw falsy error")}if(i)return this.unsubscribe(),r}unsubscribe(){if(!this.closed){let{id:n,scheduler:t}=this,{actions:i}=t;this.work=this.state=this.scheduler=null,this.pending=!1,Ai(i,this),n!=null&&(this.id=this.recycleAsyncId(t,n,null)),this.delay=null,super.unsubscribe()}}};var Ar=class e{constructor(n,t=e.now){this.schedulerActionCtor=n,this.now=t}schedule(n,t=0,i){return new this.schedulerActionCtor(this,n).schedule(i,t)}};Ar.now=Vo.now;var _a=class extends Ar{constructor(n,t=Ar.now){super(n,t),this.actions=[],this._active=!1}flush(n){let{actions:t}=this;if(this._active){t.push(n);return}let i;this._active=!0;do if(i=n.execute(n.state,n.delay))break;while(n=t.shift());if(this._active=!1,i){for(;n=t.shift();)n.unsubscribe();throw i}}};var Ni=new _a(ya),ng=Ni;var Ee=new L(e=>e.complete());function wa(e){return e&&V(e.schedule)}function Bd(e){return e[e.length-1]}function ig(e){return V(Bd(e))?e.pop():void 0}function yn(e){return wa(Bd(e))?e.pop():void 0}function rg(e,n){return typeof Bd(e)=="number"?e.pop():n}function sg(e,n,t,i){function r(o){return o instanceof t?o:new t(function(s){s(o)})}return new(t||(t=Promise))(function(o,s){function a(d){try{l(i.next(d))}catch(f){s(f)}}function c(d){try{l(i.throw(d))}catch(f){s(f)}}function l(d){d.done?o(d.value):r(d.value).then(a,c)}l((i=i.apply(e,n||[])).next())})}function og(e){var n=typeof Symbol=="function"&&Symbol.iterator,t=n&&e[n],i=0;if(t)return t.call(e);if(e&&typeof e.length=="number")return{next:function(){return e&&i>=e.length&&(e=void 0),{value:e&&e[i++],done:!e}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")}function Oi(e){return this instanceof Oi?(this.v=e,this):new Oi(e)}function ag(e,n,t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=t.apply(e,n||[]),r,o=[];return r=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",s),r[Symbol.asyncIterator]=function(){return this},r;function s(p){return function(m){return Promise.resolve(m).then(p,f)}}function a(p,m){i[p]&&(r[p]=function(y){return new Promise(function(E,T){o.push([p,y,E,T])>1||c(p,y)})},m&&(r[p]=m(r[p])))}function c(p,m){try{l(i[p](m))}catch(y){h(o[0][3],y)}}function l(p){p.value instanceof Oi?Promise.resolve(p.value.v).then(d,f):h(o[0][2],p)}function d(p){c("next",p)}function f(p){c("throw",p)}function h(p,m){p(m),o.shift(),o.length&&c(o[0][0],o[0][1])}}function cg(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n=e[Symbol.asyncIterator],t;return n?n.call(e):(e=typeof og=="function"?og(e):e[Symbol.iterator](),t={},i("next"),i("throw"),i("return"),t[Symbol.asyncIterator]=function(){return this},t);function i(o){t[o]=e[o]&&function(s){return new Promise(function(a,c){s=e[o](s),r(a,c,s.done,s.value)})}}function r(o,s,a,c){Promise.resolve(c).then(function(l){o({value:l,done:a})},s)}}var Ea=e=>e&&typeof e.length=="number"&&typeof e!="function";function Da(e){return V(e?.then)}function Ca(e){return V(e[Mr])}function Ia(e){return Symbol.asyncIterator&&V(e?.[Symbol.asyncIterator])}function Sa(e){return new TypeError(`You provided ${e!==null&&typeof e=="object"?"an invalid object":`'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function XC(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var xa=XC();function Ta(e){return V(e?.[xa])}function Ma(e){return ag(this,arguments,function*(){let t=e.getReader();try{for(;;){let{value:i,done:r}=yield Oi(t.read());if(r)return yield Oi(void 0);yield yield Oi(i)}}finally{t.releaseLock()}})}function Aa(e){return V(e?.getReader)}function be(e){if(e instanceof L)return e;if(e!=null){if(Ca(e))return JC(e);if(Ea(e))return e0(e);if(Da(e))return t0(e);if(Ia(e))return lg(e);if(Ta(e))return n0(e);if(Aa(e))return i0(e)}throw Sa(e)}function JC(e){return new L(n=>{let t=e[Mr]();if(V(t.subscribe))return t.subscribe(n);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function e0(e){return new L(n=>{for(let t=0;t<e.length&&!n.closed;t++)n.next(e[t]);n.complete()})}function t0(e){return new L(n=>{e.then(t=>{n.closed||(n.next(t),n.complete())},t=>n.error(t)).then(null,pa)})}function n0(e){return new L(n=>{for(let t of e)if(n.next(t),n.closed)return;n.complete()})}function lg(e){return new L(n=>{r0(e,n).catch(t=>n.error(t))})}function i0(e){return lg(Ma(e))}function r0(e,n){var t,i,r,o;return sg(this,void 0,void 0,function*(){try{for(t=cg(e);i=yield t.next(),!i.done;){let s=i.value;if(n.next(s),n.closed)return}}catch(s){r={error:s}}finally{try{i&&!i.done&&(o=t.return)&&(yield o.call(t))}finally{if(r)throw r.error}}n.complete()})}function mt(e,n,t,i=0,r=!1){let o=n.schedule(function(){t(),r?e.add(this.schedule(null,i)):this.unsubscribe()},i);if(e.add(o),!r)return o}function Ra(e,n=0){return q((t,i)=>{t.subscribe(te(i,r=>mt(i,e,()=>i.next(r),n),()=>mt(i,e,()=>i.complete(),n),r=>mt(i,e,()=>i.error(r),n)))})}function ka(e,n=0){return q((t,i)=>{i.add(e.schedule(()=>t.subscribe(i),n))})}function dg(e,n){return be(e).pipe(ka(n),Ra(n))}function ug(e,n){return be(e).pipe(ka(n),Ra(n))}function fg(e,n){return new L(t=>{let i=0;return n.schedule(function(){i===e.length?t.complete():(t.next(e[i++]),t.closed||this.schedule())})})}function hg(e,n){return new L(t=>{let i;return mt(t,n,()=>{i=e[xa](),mt(t,n,()=>{let r,o;try{({value:r,done:o}=i.next())}catch(s){t.error(s);return}o?t.complete():t.next(r)},0,!0)}),()=>V(i?.return)&&i.return()})}function Na(e,n){if(!e)throw new Error("Iterable cannot be null");return new L(t=>{mt(t,n,()=>{let i=e[Symbol.asyncIterator]();mt(t,n,()=>{i.next().then(r=>{r.done?t.complete():t.next(r.value)})},0,!0)})})}function pg(e,n){return Na(Ma(e),n)}function mg(e,n){if(e!=null){if(Ca(e))return dg(e,n);if(Ea(e))return fg(e,n);if(Da(e))return ug(e,n);if(Ia(e))return Na(e,n);if(Ta(e))return hg(e,n);if(Aa(e))return pg(e,n)}throw Sa(e)}function Se(e,n){return n?mg(e,n):be(e)}function N(...e){let n=yn(e);return Se(e,n)}function Vd(e,n){let t=V(e)?e:()=>e,i=r=>r.error(t());return new L(n?r=>n.schedule(i,0,r):i)}function Uo(e){return!!e&&(e instanceof L||V(e.lift)&&V(e.subscribe))}var Pi=Sr(e=>function(){e(this),this.name="EmptyError",this.message="no elements in sequence"});function gg(e){return e instanceof Date&&!isNaN(e)}function re(e,n){return q((t,i)=>{let r=0;t.subscribe(te(i,o=>{i.next(e.call(n,o,r++))}))})}var{isArray:o0}=Array;function s0(e,n){return o0(n)?e(...n):e(n)}function vg(e){return re(n=>s0(e,n))}var{isArray:a0}=Array,{getPrototypeOf:c0,prototype:l0,keys:d0}=Object;function bg(e){if(e.length===1){let n=e[0];if(a0(n))return{args:n,keys:null};if(u0(n)){let t=d0(n);return{args:t.map(i=>n[i]),keys:t}}}return{args:e,keys:null}}function u0(e){return e&&typeof e=="object"&&c0(e)===l0}function yg(e,n){return e.reduce((t,i,r)=>(t[i]=n[r],t),{})}function Ho(...e){let n=yn(e),t=ig(e),{args:i,keys:r}=bg(e);if(i.length===0)return Se([],n);let o=new L(f0(i,n,r?s=>yg(r,s):Et));return t?o.pipe(vg(t)):o}function f0(e,n,t=Et){return i=>{_g(n,()=>{let{length:r}=e,o=new Array(r),s=r,a=r;for(let c=0;c<r;c++)_g(n,()=>{let l=Se(e[c],n),d=!1;l.subscribe(te(i,f=>{o[c]=f,d||(d=!0,a--),a||i.next(t(o.slice()))},()=>{--s||i.complete()}))},i)},i)}}function _g(e,n,t){e?mt(t,e,n):n()}function wg(e,n,t,i,r,o,s,a){let c=[],l=0,d=0,f=!1,h=()=>{f&&!c.length&&!l&&n.complete()},p=y=>l<i?m(y):c.push(y),m=y=>{o&&n.next(y),l++;let E=!1;be(t(y,d++)).subscribe(te(n,T=>{r?.(T),o?p(T):n.next(T)},()=>{E=!0},void 0,()=>{if(E)try{for(l--;c.length&&l<i;){let T=c.shift();s?mt(n,s,()=>m(T)):m(T)}h()}catch(T){n.error(T)}}))};return e.subscribe(te(n,p,()=>{f=!0,h()})),()=>{a?.()}}function st(e,n,t=1/0){return V(n)?st((i,r)=>re((o,s)=>n(i,o,r,s))(be(e(i,r))),t):(typeof n=="number"&&(t=n),q((i,r)=>wg(i,r,e,t)))}function Oa(e=1/0){return st(Et,e)}function Eg(){return Oa(1)}function li(...e){return Eg()(Se(e,yn(e)))}function $o(e){return new L(n=>{be(e()).subscribe(n)})}function Fi(e=0,n,t=ng){let i=-1;return n!=null&&(wa(n)?t=n:i=n),new L(r=>{let o=gg(e)?+e-t.now():e;o<0&&(o=0);let s=0;return t.schedule(function(){r.closed||(r.next(s++),0<=i?this.schedule(void 0,i):r.complete())},o)})}function Pa(e=0,n=Ni){return e<0&&(e=0),Fi(e,e,n)}function Vn(...e){let n=yn(e),t=rg(e,1/0),i=e;return i.length?i.length===1?be(i[0]):Oa(t)(Se(i,n)):Ee}function pe(e,n){return q((t,i)=>{let r=0;t.subscribe(te(i,o=>e.call(n,o,r++)&&i.next(o)))})}function Dg(e){return q((n,t)=>{let i=!1,r=null,o=null,s=!1,a=()=>{if(o?.unsubscribe(),o=null,i){i=!1;let l=r;r=null,t.next(l)}s&&t.complete()},c=()=>{o=null,s&&t.complete()};n.subscribe(te(t,l=>{i=!0,r=l,o||be(e(l)).subscribe(o=te(t,a,c))},()=>{s=!0,(!i||!o||o.closed)&&t.complete()}))})}function Fa(e,n=Ni){return Dg(()=>Fi(e,n))}function zo(e){return q((n,t)=>{let i=null,r=!1,o;i=n.subscribe(te(t,void 0,void 0,s=>{o=be(e(s,zo(e)(n))),i?(i.unsubscribe(),i=null,o.subscribe(t)):r=!0})),r&&(i.unsubscribe(),i=null,o.subscribe(t))})}function Rr(e,n){return V(n)?st(e,n,1):st(e,1)}function jn(e,n=Ni){return q((t,i)=>{let r=null,o=null,s=null,a=()=>{if(r){r.unsubscribe(),r=null;let l=o;o=null,i.next(l)}};function c(){let l=s+e,d=n.now();if(d<l){r=this.schedule(void 0,l-d),i.add(r);return}a()}t.subscribe(te(i,l=>{o=l,s=n.now(),r||(r=n.schedule(c,e),i.add(r))},()=>{a(),i.complete()},void 0,()=>{o=r=null}))})}function Cg(e){return q((n,t)=>{let i=!1;n.subscribe(te(t,r=>{i=!0,t.next(r)},()=>{i||t.next(e),t.complete()}))})}function Dt(e){return e<=0?()=>Ee:q((n,t)=>{let i=0;n.subscribe(te(t,r=>{++i<=e&&(t.next(r),e<=i&&t.complete())}))})}function La(e,n=Et){return e=e??h0,q((t,i)=>{let r,o=!0;t.subscribe(te(i,s=>{let a=n(s);(o||!e(r,a))&&(o=!1,r=a,i.next(s))}))})}function h0(e,n){return e===n}function Ig(e=p0){return q((n,t)=>{let i=!1;n.subscribe(te(t,r=>{i=!0,t.next(r)},()=>i?t.complete():t.error(e())))})}function p0(){return new Pi}function Go(e){return q((n,t)=>{try{n.subscribe(t)}finally{t.add(e)}})}function Un(e,n){let t=arguments.length>=2;return i=>i.pipe(e?pe((r,o)=>e(r,o,i)):Et,Dt(1),t?Cg(n):Ig(()=>new Pi))}function Ba(e){return e<=0?()=>Ee:q((n,t)=>{let i=[];n.subscribe(te(t,r=>{i.push(r),e<i.length&&i.shift()},()=>{for(let r of i)t.next(r);t.complete()},void 0,()=>{i=null}))})}function Sg(e={}){let{connector:n=()=>new I,resetOnError:t=!0,resetOnComplete:i=!0,resetOnRefCountZero:r=!0}=e;return o=>{let s,a,c,l=0,d=!1,f=!1,h=()=>{a?.unsubscribe(),a=void 0},p=()=>{h(),s=c=void 0,d=f=!1},m=()=>{let y=s;p(),y?.unsubscribe()};return q((y,E)=>{l++,!f&&!d&&h();let T=c=c??n();E.add(()=>{l--,l===0&&!f&&!d&&(a=jd(m,r))}),T.subscribe(E),!s&&l>0&&(s=new Bn({next:$=>T.next($),error:$=>{f=!0,h(),a=jd(p,t,$),T.error($)},complete:()=>{d=!0,h(),a=jd(p,i),T.complete()}}),be(y).subscribe(s))})(o)}}function jd(e,n,...t){if(n===!0){e();return}if(n===!1)return;let i=new Bn({next:()=>{i.unsubscribe(),e()}});return be(n(...t)).subscribe(i)}function Va(e,n,t){let i,r=!1;return e&&typeof e=="object"?{bufferSize:i=1/0,windowTime:n=1/0,refCount:r=!1,scheduler:t}=e:i=e??1/0,Sg({connector:()=>new va(i,n,t),resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:r})}function Li(e){return pe((n,t)=>e<=t)}function Ft(...e){let n=yn(e);return q((t,i)=>{(n?li(e,t,n):li(e,t)).subscribe(i)})}function Qe(e,n){return q((t,i)=>{let r=null,o=0,s=!1,a=()=>s&&!r&&i.complete();t.subscribe(te(i,c=>{r?.unsubscribe();let l=0,d=o++;be(e(c,d)).subscribe(r=te(i,f=>i.next(n?n(c,f,d,l++):f),()=>{r=null,a()}))},()=>{s=!0,a()}))})}function Be(e){return q((n,t)=>{be(e).subscribe(te(t,()=>t.complete(),Bo)),!t.closed&&n.subscribe(t)})}function gt(e,n,t){let i=V(e)||n||t?{next:e,error:n,complete:t}:e;return i?q((r,o)=>{var s;(s=i.subscribe)===null||s===void 0||s.call(i);let a=!0;r.subscribe(te(o,c=>{var l;(l=i.next)===null||l===void 0||l.call(i,c),o.next(c)},()=>{var c;a=!1,(c=i.complete)===null||c===void 0||c.call(i),o.complete()},c=>{var l;a=!1,(l=i.error)===null||l===void 0||l.call(i,c),o.error(c)},()=>{var c,l;a&&((c=i.unsubscribe)===null||c===void 0||c.call(i)),(l=i.finalize)===null||l===void 0||l.call(i)}))}):Et}var Wa="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",D=class extends Error{code;constructor(n,t){super(zn(n,t)),this.code=n}};function m0(e){return`NG0${Math.abs(e)}`}function zn(e,n){return`${m0(e)}${n?": "+n:""}`}function le(e){for(let n in e)if(e[n]===le)return n;throw Error("")}function Rg(e,n){for(let t in n)n.hasOwnProperty(t)&&!e.hasOwnProperty(t)&&(e[t]=n[t])}function Qo(e){if(typeof e=="string")return e;if(Array.isArray(e))return`[${e.map(Qo).join(", ")}]`;if(e==null)return""+e;let n=e.overriddenName||e.name;if(n)return`${n}`;let t=e.toString();if(t==null)return""+t;let i=t.indexOf(`
`);return i>=0?t.slice(0,i):t}function qa(e,n){return e?n?`${e} ${n}`:e:n||""}var g0=le({__forward_ref__:le});function Gn(e){return e.__forward_ref__=Gn,e}function Ge(e){return Jd(e)?e():e}function Jd(e){return typeof e=="function"&&e.hasOwnProperty(g0)&&e.__forward_ref__===Gn}function G(e){return{token:e.token,providedIn:e.providedIn||null,factory:e.factory,value:void 0}}function fe(e){return{providers:e.providers||[],imports:e.imports||[]}}function Xo(e){return v0(e,Ya)}function eu(e){return Xo(e)!==null}function v0(e,n){return e.hasOwnProperty(n)&&e[n]||null}function b0(e){let n=e?.[Ya]??null;return n||null}function Hd(e){return e&&e.hasOwnProperty(Ua)?e[Ua]:null}var Ya=le({\u0275prov:le}),Ua=le({\u0275inj:le}),g=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(n,t){this._desc=n,this.\u0275prov=void 0,typeof t=="number"?this.__NG_ELEMENT_ID__=t:t!==void 0&&(this.\u0275prov=G({token:this,providedIn:t.providedIn||"root",factory:t.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function tu(e){return e&&!!e.\u0275providers}var nu=le({\u0275cmp:le}),iu=le({\u0275dir:le}),ru=le({\u0275pipe:le}),ou=le({\u0275mod:le}),qo=le({\u0275fac:le}),Hi=le({__NG_ELEMENT_ID__:le}),xg=le({__NG_ENV_ID__:le});function kg(e){return Ka(e,"@NgModule"),e[ou]||null}function Wn(e){return Ka(e,"@Component"),e[nu]||null}function Za(e){return Ka(e,"@Directive"),e[iu]||null}function su(e){return Ka(e,"@Pipe"),e[ru]||null}function Ka(e,n){if(e==null)throw new D(-919,!1)}function Qa(e){return typeof e=="string"?e:e==null?"":String(e)}var Ng=le({ngErrorCode:le}),y0=le({ngErrorMessage:le}),_0=le({ngTokenPath:le});function au(e,n){return Og("",-200,n)}function Xa(e,n){throw new D(-201,!1)}function Og(e,n,t){let i=new D(n,e);return i[Ng]=n,i[y0]=e,t&&(i[_0]=t),i}function w0(e){return e[Ng]}var $d;function Pg(){return $d}function at(e){let n=$d;return $d=e,n}function cu(e,n,t){let i=Xo(e);if(i&&i.providedIn=="root")return i.value===void 0?i.value=i.factory():i.value;if(t&8)return null;if(n!==void 0)return n;Xa(e,"")}var Or=globalThis;var E0={},Bi=E0,D0="__NG_DI_FLAG__",zd=class{injector;constructor(n){this.injector=n}retrieve(n,t){let i=Vi(t)||0;try{return this.injector.get(n,i&8?null:Bi,i)}catch(r){if(Ir(r))return r;throw r}}};function C0(e,n=0){let t=ua();if(t===void 0)throw new D(-203,!1);if(t===null)return cu(e,void 0,n);{let i=I0(n),r=t.retrieve(e,i);if(Ir(r)){if(i.optional)return null;throw r}return r}}function P(e,n=0){return(Pg()||C0)(Ge(e),n)}function u(e,n){return P(e,Vi(n))}function Vi(e){return typeof e>"u"||typeof e=="number"?e:0|(e.optional&&8)|(e.host&&1)|(e.self&&2)|(e.skipSelf&&4)}function I0(e){return{optional:!!(e&8),host:!!(e&1),self:!!(e&2),skipSelf:!!(e&4)}}function Gd(e){let n=[];for(let t=0;t<e.length;t++){let i=Ge(e[t]);if(Array.isArray(i)){if(i.length===0)throw new D(900,!1);let r,o=0;for(let s=0;s<i.length;s++){let a=i[s],c=S0(a);typeof c=="number"?c===-1?r=a.token:o|=c:r=a}n.push(P(r,o))}else n.push(P(i))}return n}function S0(e){return e[D0]}function di(e,n){let t=e.hasOwnProperty(qo);return t?e[qo]:null}function Fg(e,n,t){if(e.length!==n.length)return!1;for(let i=0;i<e.length;i++){let r=e[i],o=n[i];if(t&&(r=t(r),o=t(o)),o!==r)return!1}return!0}function Lg(e){return e.flat(Number.POSITIVE_INFINITY)}function Ja(e,n){e.forEach(t=>Array.isArray(t)?Ja(t,n):n(t))}function lu(e,n,t){n>=e.length?e.push(t):e.splice(n,0,t)}function Jo(e,n){return n>=e.length-1?e.pop():e.splice(n,1)[0]}function Bg(e,n){let t=[];for(let i=0;i<e;i++)t.push(n);return t}function Vg(e,n,t,i){let r=e.length;if(r==n)e.push(t,i);else if(r===1)e.push(i,e[0]),e[0]=t;else{for(r--,e.push(e[r-1],e[r]);r>n;){let o=r-2;e[r]=e[o],r--}e[n]=t,e[n+1]=i}}function ec(e,n,t){let i=Pr(e,n);return i>=0?e[i|1]=t:(i=~i,Vg(e,i,n,t)),i}function tc(e,n){let t=Pr(e,n);if(t>=0)return e[t|1]}function Pr(e,n){return x0(e,n,1)}function x0(e,n,t){let i=0,r=e.length>>t;for(;r!==i;){let o=i+(r-i>>1),s=e[o<<t];if(n===s)return o<<t;s>n?r=o:i=o+1}return~(r<<t)}var fi={},ct=[],qn=new g(""),es=new g("",-1),du=new g(""),Nr=class{get(n,t=Bi){if(t===Bi){let r=Og("",-201);throw r.name="\u0275NotFound",r}return t}};function wn(e){return{\u0275providers:e}}function jg(e){return wn([{provide:qn,multi:!0,useValue:e}])}function Ug(...e){return{\u0275providers:nc(!0,e),\u0275fromNgModule:!0}}function nc(e,...n){let t=[],i=new Set,r,o=s=>{t.push(s)};return Ja(n,s=>{let a=s;Ha(a,o,[],i)&&(r||=[],r.push(a))}),r!==void 0&&Hg(r,o),t}function Hg(e,n){for(let t=0;t<e.length;t++){let{ngModule:i,providers:r}=e[t];uu(r,o=>{n(o,i)})}}function Ha(e,n,t,i){if(e=Ge(e),!e)return!1;let r=null,o=Hd(e),s=!o&&Wn(e);if(!o&&!s){let c=e.ngModule;if(o=Hd(c),o)r=c;else return!1}else{if(s&&!s.standalone)return!1;r=e}let a=i.has(r);if(s){if(a)return!1;if(i.add(r),s.dependencies){let c=typeof s.dependencies=="function"?s.dependencies():s.dependencies;for(let l of c)Ha(l,n,t,i)}}else if(o){if(o.imports!=null&&!a){i.add(r);let l;Ja(o.imports,d=>{Ha(d,n,t,i)&&(l||=[],l.push(d))}),l!==void 0&&Hg(l,n)}if(!a){let l=di(r)||(()=>new r);n({provide:r,useFactory:l,deps:ct},r),n({provide:du,useValue:r,multi:!0},r),n({provide:qn,useValue:()=>P(r),multi:!0},r)}let c=o.providers;if(c!=null&&!a){let l=e;uu(c,d=>{n(d,l)})}}else return!1;return r!==e&&e.providers!==void 0}function uu(e,n){for(let t of e)tu(t)&&(t=t.\u0275providers),Array.isArray(t)?uu(t,n):n(t)}var T0=le({provide:String,useValue:le});function $g(e){return e!==null&&typeof e=="object"&&T0 in e}function M0(e){return!!(e&&e.useExisting)}function A0(e){return!!(e&&e.useFactory)}function ji(e){return typeof e=="function"}function zg(e){return!!e.useClass}var ts=new g(""),ja={},Tg={},Ud;function Fr(){return Ud===void 0&&(Ud=new Nr),Ud}var ue=class{},Ui=class extends ue{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(n,t,i,r){super(),this.parent=t,this.source=i,this.scopes=r,qd(n,s=>this.processProvider(s)),this.records.set(es,kr(void 0,this)),r.has("environment")&&this.records.set(ue,kr(void 0,this));let o=this.records.get(ts);o!=null&&typeof o.value=="string"&&this.scopes.add(o.value),this.injectorDefTypes=new Set(this.get(du,ct,{self:!0}))}retrieve(n,t){let i=Vi(t)||0;try{return this.get(n,Bi,i)}catch(r){if(Ir(r))return r;throw r}}destroy(){Wo(this),this._destroyed=!0;let n=R(null);try{for(let i of this._ngOnDestroyHooks)i.ngOnDestroy();let t=this._onDestroyHooks;this._onDestroyHooks=[];for(let i of t)i()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),R(n)}}onDestroy(n){return Wo(this),this._onDestroyHooks.push(n),()=>this.removeOnDestroy(n)}runInContext(n){Wo(this);let t=bn(this),i=at(void 0),r;try{return n()}finally{bn(t),at(i)}}get(n,t=Bi,i){if(Wo(this),n.hasOwnProperty(xg))return n[xg](this);let r=Vi(i),o,s=bn(this),a=at(void 0);try{if(!(r&4)){let l=this.records.get(n);if(l===void 0){let d=P0(n)&&Xo(n);d&&this.injectableDefInScope(d)?l=kr(Wd(n),ja):l=null,this.records.set(n,l)}if(l!=null)return this.hydrate(n,l,r)}let c=r&2?Fr():this.parent;return t=r&8&&t===Bi?null:t,c.get(n,t)}catch(c){let l=w0(c);throw l===-200||l===-201?new D(l,null):c}finally{at(a),bn(s)}}resolveInjectorInitializers(){let n=R(null),t=bn(this),i=at(void 0),r;try{let o=this.get(qn,ct,{self:!0});for(let s of o)s()}finally{bn(t),at(i),R(n)}}toString(){return"R3Injector[...]"}processProvider(n){n=Ge(n);let t=ji(n)?n:Ge(n&&n.provide),i=k0(n);if(!ji(n)&&n.multi===!0){let r=this.records.get(t);r||(r=kr(void 0,ja,!0),r.factory=()=>Gd(r.multi),this.records.set(t,r)),t=n,r.multi.push(n)}this.records.set(t,i)}hydrate(n,t,i){let r=R(null);try{if(t.value===Tg)throw au("");return t.value===ja&&(t.value=Tg,t.value=t.factory(void 0,i)),typeof t.value=="object"&&t.value&&O0(t.value)&&this._ngOnDestroyHooks.add(t.value),t.value}finally{R(r)}}injectableDefInScope(n){if(!n.providedIn)return!1;let t=Ge(n.providedIn);return typeof t=="string"?t==="any"||this.scopes.has(t):this.injectorDefTypes.has(t)}removeOnDestroy(n){let t=this._onDestroyHooks.indexOf(n);t!==-1&&this._onDestroyHooks.splice(t,1)}};function Wd(e){let n=Xo(e),t=n!==null?n.factory:di(e);if(t!==null)return t;if(e instanceof g)throw new D(-204,!1);if(e instanceof Function)return R0(e);throw new D(-204,!1)}function R0(e){if(e.length>0)throw new D(-204,!1);let t=b0(e);return t!==null?()=>t.factory(e):()=>new e}function k0(e){if($g(e))return kr(void 0,e.useValue);{let n=fu(e);return kr(n,ja)}}function fu(e,n,t){let i;if(ji(e)){let r=Ge(e);return di(r)||Wd(r)}else if($g(e))i=()=>Ge(e.useValue);else if(A0(e))i=()=>e.useFactory(...Gd(e.deps||[]));else if(M0(e))i=(r,o)=>P(Ge(e.useExisting),o!==void 0&&o&8?8:void 0);else{let r=Ge(e&&(e.useClass||e.provide));if(N0(e))i=()=>new r(...Gd(e.deps));else return di(r)||Wd(r)}return i}function Wo(e){if(e.destroyed)throw new D(-205,!1)}function kr(e,n,t=!1){return{factory:e,value:n,multi:t?[]:void 0}}function N0(e){return!!e.deps}function O0(e){return e!==null&&typeof e=="object"&&typeof e.ngOnDestroy=="function"}function P0(e){return typeof e=="function"||typeof e=="object"&&e.ngMetadataName==="InjectionToken"}function qd(e,n){for(let t of e)Array.isArray(t)?qd(t,n):t&&tu(t)?qd(t.\u0275providers,n):n(t)}function Ue(e,n){let t;e instanceof Ui?(Wo(e),t=e):t=new zd(e);let i,r=bn(t),o=at(void 0);try{return n()}finally{bn(r),at(o)}}function Gg(){return Pg()!==void 0||ua()!=null}var lt=0,S=1,F=2,xe=3,Lt=4,Xe=5,dt=6,Lr=7,Te=8,vt=9,En=10,ce=11,Br=12,hu=13,hi=14,We=15,pi=16,$i=17,Dn=18,Cn=19,pu=20,Hn=21,ic=22,ui=23,Ct=24,zi=25,In=26,oe=27,Wg=1,Qt=6,Sn=7,ns=8,Gi=9,ye=10;function Bt(e){return Array.isArray(e)&&typeof e[Wg]=="object"}function bt(e){return Array.isArray(e)&&e[Wg]===!0}function mu(e){return(e.flags&4)!==0}function Xt(e){return e.componentOffset>-1}function is(e){return(e.flags&1)===1}function xn(e){return!!e.template}function Wi(e){return(e[F]&512)!==0}function mi(e){return(e[F]&256)===256}var gu="svg",qg="math";function It(e){for(;Array.isArray(e);)e=e[lt];return e}function vu(e,n){return It(n[e])}function St(e,n){return It(n[e.index])}function Vr(e,n){return e.data[n]}function bu(e,n){return e[n]}function yu(e,n,t,i){t>=e.data.length&&(e.data[t]=null,e.blueprint[t]=null),n[t]=i}function Vt(e,n){let t=n[e];return Bt(t)?t:t[lt]}function Yg(e){return(e[F]&4)===4}function rc(e){return(e[F]&128)===128}function Zg(e){return bt(e[xe])}function xt(e,n){return n==null?null:e[n]}function _u(e){e[$i]=0}function oc(e){e[F]&1024||(e[F]|=1024,rc(e)&&qi(e))}function Kg(e,n){for(;e>0;)n=n[hi],e--;return n}function rs(e){return!!(e[F]&9216||e[Ct]?.dirty)}function sc(e){e[En].changeDetectionScheduler?.notify(8),e[F]&64&&(e[F]|=1024),rs(e)&&qi(e)}function qi(e){e[En].changeDetectionScheduler?.notify(0);let n=$n(e);for(;n!==null&&!(n[F]&8192||(n[F]|=8192,!rc(n)));)n=$n(n)}function ac(e,n){if(mi(e))throw new D(911,!1);e[Hn]===null&&(e[Hn]=[]),e[Hn].push(n)}function Qg(e,n){if(e[Hn]===null)return;let t=e[Hn].indexOf(n);t!==-1&&e[Hn].splice(t,1)}function $n(e){let n=e[xe];return bt(n)?n[xe]:n}function wu(e){return e[Lr]??=[]}function Eu(e){return e.cleanup??=[]}function Xg(e,n,t,i){let r=wu(n);r.push(t),e.firstCreatePass&&Eu(e).push(i,r.length-1)}var z={lFrame:uv(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var Yd=!1;function Jg(){return z.lFrame.elementDepthCount}function ev(){z.lFrame.elementDepthCount++}function Du(){z.lFrame.elementDepthCount--}function Cu(){return z.bindingsEnabled}function cc(){return z.skipHydrationRootTNode!==null}function Iu(e){return z.skipHydrationRootTNode===e}function tv(e){z.skipHydrationRootTNode=e}function Su(){z.skipHydrationRootTNode=null}function B(){return z.lFrame.lView}function De(){return z.lFrame.tView}function Tn(e){return z.lFrame.contextLView=e,e[Te]}function Mn(e){return z.lFrame.contextLView=null,e}function qe(){let e=xu();for(;e!==null&&e.type===64;)e=e.parent;return e}function xu(){return z.lFrame.currentTNode}function nv(){let e=z.lFrame,n=e.currentTNode;return e.isParent?n:n.parent}function jr(e,n){let t=z.lFrame;t.currentTNode=e,t.isParent=n}function Tu(){return z.lFrame.isParent}function Mu(){z.lFrame.isParent=!1}function iv(){return z.lFrame.contextLView}function Au(){return Yd}function Yo(e){let n=Yd;return Yd=e,n}function rv(){let e=z.lFrame,n=e.bindingRootIndex;return n===-1&&(n=e.bindingRootIndex=e.tView.bindingStartIndex),n}function ov(e){return z.lFrame.bindingIndex=e}function Yn(){return z.lFrame.bindingIndex++}function Ru(e){let n=z.lFrame,t=n.bindingIndex;return n.bindingIndex=n.bindingIndex+e,t}function sv(){return z.lFrame.inI18n}function av(e,n){let t=z.lFrame;t.bindingIndex=t.bindingRootIndex=e,lc(n)}function cv(){return z.lFrame.currentDirectiveIndex}function lc(e){z.lFrame.currentDirectiveIndex=e}function lv(e){let n=z.lFrame.currentDirectiveIndex;return n===-1?null:e[n]}function ku(){return z.lFrame.currentQueryIndex}function dc(e){z.lFrame.currentQueryIndex=e}function F0(e){let n=e[S];return n.type===2?n.declTNode:n.type===1?e[Xe]:null}function Nu(e,n,t){if(t&4){let r=n,o=e;for(;r=r.parent,r===null&&!(t&1);)if(r=F0(o),r===null||(o=o[hi],r.type&10))break;if(r===null)return!1;n=r,e=o}let i=z.lFrame=dv();return i.currentTNode=n,i.lView=e,!0}function uc(e){let n=dv(),t=e[S];z.lFrame=n,n.currentTNode=t.firstChild,n.lView=e,n.tView=t,n.contextLView=e,n.bindingIndex=t.bindingStartIndex,n.inI18n=!1}function dv(){let e=z.lFrame,n=e===null?null:e.child;return n===null?uv(e):n}function uv(e){let n={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:e,child:null,inI18n:!1};return e!==null&&(e.child=n),n}function fv(){let e=z.lFrame;return z.lFrame=e.parent,e.currentTNode=null,e.lView=null,e}var Ou=fv;function fc(){let e=fv();e.isParent=!0,e.tView=null,e.selectedIndex=-1,e.contextLView=null,e.elementDepthCount=0,e.currentDirectiveIndex=-1,e.currentNamespace=null,e.bindingRootIndex=-1,e.bindingIndex=-1,e.currentQueryIndex=0}function hv(e){return(z.lFrame.contextLView=Kg(e,z.lFrame.contextLView))[Te]}function Zn(){return z.lFrame.selectedIndex}function gi(e){z.lFrame.selectedIndex=e}function os(){let e=z.lFrame;return Vr(e.tView,e.selectedIndex)}function Yi(){z.lFrame.currentNamespace=gu}function hc(){return z.lFrame.currentNamespace}var pv=!0;function pc(){return pv}function Kn(e){pv=e}function mc(){let e,n;return{promise:new Promise((i,r)=>{e=i,n=r}),resolve:e,reject:n}}function Zd(e,n=null,t=null,i){let r=Pu(e,n,t,i);return r.resolveInjectorInitializers(),r}function Pu(e,n=null,t=null,i,r=new Set){let o=[t||ct,Ug(e)],s;return new Ui(o,n||Fr(),s||null,r)}var ne=class e{static THROW_IF_NOT_FOUND=Bi;static NULL=new Nr;static create(n,t){if(Array.isArray(n))return Zd({name:""},t,n,"");{let i=n.name??"";return Zd({name:i},n.parent,n.providers,i)}}static \u0275prov=G({token:e,providedIn:"any",factory:()=>P(es)});static __NG_ELEMENT_ID__=-1},O=new g(""),ut=(()=>{class e{static __NG_ELEMENT_ID__=L0;static __NG_ENV_ID__=t=>t}return e})(),$a=class extends ut{_lView;constructor(n){super(),this._lView=n}get destroyed(){return mi(this._lView)}onDestroy(n){let t=this._lView;return ac(t,n),()=>Qg(t,n)}};function L0(){return new $a(B())}var mv=!1,gv=new g(""),An=(()=>{class e{taskId=0;pendingTasks=new Set;destroyed=!1;pendingTask=new Re(!1);debugTaskTracker=u(gv,{optional:!0});get hasPendingTasks(){return this.destroyed?!1:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new L(t=>{t.next(!1),t.complete()}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(!0);let t=this.taskId++;return this.pendingTasks.add(t),this.debugTaskTracker?.add(t),t}has(t){return this.pendingTasks.has(t)}remove(t){this.pendingTasks.delete(t),this.debugTaskTracker?.remove(t),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(!1),this.destroyed=!0,this.pendingTask.unsubscribe()}static \u0275prov=G({token:e,providedIn:"root",factory:()=>new e})}return e})(),Kd=class extends I{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(n=!1){super(),this.__isAsync=n,Gg()&&(this.destroyRef=u(ut,{optional:!0})??void 0,this.pendingTasks=u(An,{optional:!0})??void 0)}emit(n){let t=R(null);try{super.next(n)}finally{R(t)}}subscribe(n,t,i){let r=n,o=t||(()=>null),s=i;if(n&&typeof n=="object"){let c=n;r=c.next?.bind(c),o=c.error?.bind(c),s=c.complete?.bind(c)}this.__isAsync&&(o=this.wrapInTimeout(o),r&&(r=this.wrapInTimeout(r)),s&&(s=this.wrapInTimeout(s)));let a=super.subscribe({next:r,error:o,complete:s});return n instanceof ee&&n.add(a),a}wrapInTimeout(n){return t=>{let i=this.pendingTasks?.add();setTimeout(()=>{try{n(t)}finally{i!==void 0&&this.pendingTasks?.remove(i)}})}}},k=Kd;function za(...e){}function Fu(e){let n,t;function i(){e=za;try{t!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(t),n!==void 0&&clearTimeout(n)}catch{}}return n=setTimeout(()=>{e(),i()}),typeof requestAnimationFrame=="function"&&(t=requestAnimationFrame(()=>{e(),i()})),()=>i()}function vv(e){return queueMicrotask(()=>e()),()=>{e=za}}var Lu="isAngularZone",Zo=Lu+"_ID",B0=0,M=class e{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new k(!1);onMicrotaskEmpty=new k(!1);onStable=new k(!1);onError=new k(!1);constructor(n){let{enableLongStackTrace:t=!1,shouldCoalesceEventChangeDetection:i=!1,shouldCoalesceRunChangeDetection:r=!1,scheduleInRootZone:o=mv}=n;if(typeof Zone>"u")throw new D(908,!1);Zone.assertZonePatched();let s=this;s._nesting=0,s._outer=s._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(s._inner=s._inner.fork(new Zone.TaskTrackingZoneSpec)),t&&Zone.longStackTraceZoneSpec&&(s._inner=s._inner.fork(Zone.longStackTraceZoneSpec)),s.shouldCoalesceEventChangeDetection=!r&&i,s.shouldCoalesceRunChangeDetection=r,s.callbackScheduled=!1,s.scheduleInRootZone=o,U0(s)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(Lu)===!0}static assertInAngularZone(){if(!e.isInAngularZone())throw new D(909,!1)}static assertNotInAngularZone(){if(e.isInAngularZone())throw new D(909,!1)}run(n,t,i){return this._inner.run(n,t,i)}runTask(n,t,i,r){let o=this._inner,s=o.scheduleEventTask("NgZoneEvent: "+r,n,V0,za,za);try{return o.runTask(s,t,i)}finally{o.cancelTask(s)}}runGuarded(n,t,i){return this._inner.runGuarded(n,t,i)}runOutsideAngular(n){return this._outer.run(n)}},V0={};function Bu(e){if(e._nesting==0&&!e.hasPendingMicrotasks&&!e.isStable)try{e._nesting++,e.onMicrotaskEmpty.emit(null)}finally{if(e._nesting--,!e.hasPendingMicrotasks)try{e.runOutsideAngular(()=>e.onStable.emit(null))}finally{e.isStable=!0}}}function j0(e){if(e.isCheckStableRunning||e.callbackScheduled)return;e.callbackScheduled=!0;function n(){Fu(()=>{e.callbackScheduled=!1,Qd(e),e.isCheckStableRunning=!0,Bu(e),e.isCheckStableRunning=!1})}e.scheduleInRootZone?Zone.root.run(()=>{n()}):e._outer.run(()=>{n()}),Qd(e)}function U0(e){let n=()=>{j0(e)},t=B0++;e._inner=e._inner.fork({name:"angular",properties:{[Lu]:!0,[Zo]:t,[Zo+t]:!0},onInvokeTask:(i,r,o,s,a,c)=>{if(H0(c))return i.invokeTask(o,s,a,c);try{return Mg(e),i.invokeTask(o,s,a,c)}finally{(e.shouldCoalesceEventChangeDetection&&s.type==="eventTask"||e.shouldCoalesceRunChangeDetection)&&n(),Ag(e)}},onInvoke:(i,r,o,s,a,c,l)=>{try{return Mg(e),i.invoke(o,s,a,c,l)}finally{e.shouldCoalesceRunChangeDetection&&!e.callbackScheduled&&!$0(c)&&n(),Ag(e)}},onHasTask:(i,r,o,s)=>{i.hasTask(o,s),r===o&&(s.change=="microTask"?(e._hasPendingMicrotasks=s.microTask,Qd(e),Bu(e)):s.change=="macroTask"&&(e.hasPendingMacrotasks=s.macroTask))},onHandleError:(i,r,o,s)=>(i.handleError(o,s),e.runOutsideAngular(()=>e.onError.emit(s)),!1)})}function Qd(e){e._hasPendingMicrotasks||(e.shouldCoalesceEventChangeDetection||e.shouldCoalesceRunChangeDetection)&&e.callbackScheduled===!0?e.hasPendingMicrotasks=!0:e.hasPendingMicrotasks=!1}function Mg(e){e._nesting++,e.isStable&&(e.isStable=!1,e.onUnstable.emit(null))}function Ag(e){e._nesting--,Bu(e)}var Ko=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new k;onMicrotaskEmpty=new k;onStable=new k;onError=new k;run(n,t,i){return n.apply(t,i)}runGuarded(n,t,i){return n.apply(t,i)}runOutsideAngular(n){return n()}runTask(n,t,i,r){return n.apply(t,i)}};function H0(e){return bv(e,"__ignore_ng_zone__")}function $0(e){return bv(e,"__scheduler_tick__")}function bv(e,n){return!Array.isArray(e)||e.length!==1?!1:e[0]?.data?.[n]===!0}var Kt=class{_console=console;handleError(n){this._console.error("ERROR",n)}},Jt=new g("",{factory:()=>{let e=u(M),n=u(ue),t;return i=>{e.runOutsideAngular(()=>{n.destroyed&&!t?setTimeout(()=>{throw i}):(t??=n.get(Kt),t.handleError(i))})}}}),yv={provide:qn,useValue:()=>{let e=u(Kt,{optional:!0})},multi:!0},z0=new g("",{factory:()=>{let e=u(O).defaultView;if(!e)return;let n=u(Jt),t=o=>{n(o.reason),o.preventDefault()},i=o=>{o.error?n(o.error):n(new Error(o.message,{cause:o})),o.preventDefault()},r=()=>{e.addEventListener("unhandledrejection",t),e.addEventListener("error",i)};typeof Zone<"u"?Zone.root.run(r):r(),u(ut).onDestroy(()=>{e.removeEventListener("error",i),e.removeEventListener("unhandledrejection",t)})}});function Vu(){return wn([jg(()=>{u(z0)})])}function ke(e,n){let[t,i,r]=Id(e,n?.equal),o=t,s=o[pt];return o.set=i,o.update=r,o.asReadonly=ju.bind(o),o}function ju(){let e=this[pt];if(e.readonlyFn===void 0){let n=()=>this();n[pt]=e,e.readonlyFn=n}return e.readonlyFn}var Tt=new g("",{factory:()=>G0}),G0="ng";var gc=new g(""),Zi=new g("",{providedIn:"platform",factory:()=>"unknown"}),ss=new g(""),Ki=new g("",{factory:()=>u(O).body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var vi=(()=>{class e{static \u0275prov=G({token:e,providedIn:"root",factory:()=>{let t=new e;return t.store=_v(u(O),u(Tt)),t}});store={};onSerializeCallbacks={};get(t,i){return this.store[t]!==void 0?this.store[t]:i}set(t,i){this.store[t]=i}remove(t){delete this.store[t]}hasKey(t){return this.store.hasOwnProperty(t)}get isEmpty(){return Object.keys(this.store).length===0}onSerialize(t,i){this.onSerializeCallbacks[t]=i}toJson(){for(let t in this.onSerializeCallbacks)if(this.onSerializeCallbacks.hasOwnProperty(t))try{this.store[t]=this.onSerializeCallbacks[t]()}catch(i){console.warn("Exception in onSerialize callback: ",i)}return JSON.stringify(this.store).replace(/</g,"\\u003C").replace(/\//g,"\\u002F")}}return e})();function _v(e,n){let t=e.getElementById(n+"-state");if(t?.tagName==="SCRIPT"&&t.textContent)try{return JSON.parse(t.textContent)}catch(i){console.warn("Exception while restoring TransferState for app "+n,i)}return{}}var as=(()=>{class e{view;node;constructor(t,i){this.view=t,this.node=i}static __NG_ELEMENT_ID__=W0}return e})();function W0(){return new as(B(),qe())}var _n=class{},cs=new g("",{factory:()=>!0});var Uu=new g(""),vc=(()=>{class e{static \u0275prov=G({token:e,providedIn:"root",factory:()=>new Xd})}return e})(),Xd=class{dirtyEffectCount=0;queues=new Map;add(n){this.enqueue(n),this.schedule(n)}schedule(n){n.dirty&&this.dirtyEffectCount++}remove(n){let t=n.zone,i=this.queues.get(t);i.has(n)&&(i.delete(n),n.dirty&&this.dirtyEffectCount--)}enqueue(n){let t=n.zone;this.queues.has(t)||this.queues.set(t,new Set);let i=this.queues.get(t);i.has(n)||i.add(n)}flush(){for(;this.dirtyEffectCount>0;){let n=!1;for(let[t,i]of this.queues)t===null?n||=this.flushQueue(i):n||=t.run(()=>this.flushQueue(i));n||(this.dirtyEffectCount=0)}}flushQueue(n){let t=!1;for(let i of n)i.dirty&&(this.dirtyEffectCount--,t=!0,i.run());return t}},Ga=class{[pt];constructor(n){this[pt]=n}destroy(){this[pt].destroy()}};function Ur(e,n){let t=n?.injector??u(ne),i=n?.manualCleanup!==!0?t.get(ut):null,r,o=t.get(as,null,{optional:!0}),s=t.get(_n);return o!==null?(r=Z0(o.view,s,e),i instanceof $a&&i._lView===o.view&&(i=null)):r=K0(e,t.get(vc),s),r.injector=t,i!==null&&(r.onDestroyFns=[i.onDestroy(()=>r.destroy())]),new Ga(r)}var wv=J(v({},xd),{cleanupFns:void 0,zone:null,onDestroyFns:null,run(){let e=Yo(!1);try{Td(this)}finally{Yo(e)}},cleanup(){if(!this.cleanupFns?.length)return;let e=R(null);try{for(;this.cleanupFns.length;)this.cleanupFns.pop()()}finally{this.cleanupFns=[],R(e)}}}),q0=J(v({},wv),{consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12)},destroy(){if(Mi(this),this.onDestroyFns!==null)for(let e of this.onDestroyFns)e();this.cleanup(),this.scheduler.remove(this)}}),Y0=J(v({},wv),{consumerMarkedDirty(){this.view[F]|=8192,qi(this.view),this.notifier.notify(13)},destroy(){if(Mi(this),this.onDestroyFns!==null)for(let e of this.onDestroyFns)e();this.cleanup(),this.view[ui]?.delete(this)}});function Z0(e,n,t){let i=Object.create(Y0);return i.view=e,i.zone=typeof Zone<"u"?Zone.current:null,i.notifier=n,i.fn=Ev(i,t),e[ui]??=new Set,e[ui].add(i),i.consumerMarkedDirty(i),i}function K0(e,n,t){let i=Object.create(q0);return i.fn=Ev(i,e),i.scheduler=n,i.notifier=t,i.zone=typeof Zone<"u"?Zone.current:null,i.scheduler.add(i),i.notifier.notify(12),i}function Ev(e,n){return()=>{n(t=>(e.cleanupFns??=[]).push(t))}}function Hr(e){return typeof e=="function"&&e[pt]!==void 0}var $r=(()=>{class e{internalPendingTasks=u(An);scheduler=u(_n);errorHandler=u(Jt);add(){let t=this.internalPendingTasks.add();return()=>{this.internalPendingTasks.has(t)&&(this.scheduler.notify(11),this.internalPendingTasks.remove(t))}}run(t){let i=this.add();try{t().catch(this.errorHandler).finally(i)}catch(r){this.errorHandler(r),i()}}static \u0275prov=G({token:e,providedIn:"root",factory:()=>new e})}return e})();var bc={JSACTION:"jsaction"};function ys(e){return{toString:e}.toString()}var Tc=class{previousValue;currentValue;firstChange;constructor(n,t,i){this.previousValue=n,this.currentValue=t,this.firstChange=i}isFirstChange(){return this.firstChange}};function ub(e,n,t,i){n!==null?n.applyValueToInputSignal(n,i):e[t]=i}var ft=(()=>{let e=()=>fb;return e.ngInherit=!0,e})();function fb(e){return e.type.prototype.ngOnChanges&&(e.setInput=aI),sI}function sI(){let e=hb(this),n=e?.current;if(n){let t=e.previous;if(t===fi)e.previous=n;else for(let i in n)t[i]=n[i];e.current=null,this.ngOnChanges(n)}}function aI(e,n,t,i,r){let o=this.declaredInputs[i],s=hb(e)||cI(e,{previous:fi,current:null}),a=s.current||(s.current={}),c=s.previous,l=c[o];a[o]=new Tc(l&&l.currentValue,t,c===fi),ub(e,n,r,t)}var nf="__ngSimpleChanges__";function hb(e){return Object.hasOwn(e,nf)&&e[nf]||null}function cI(e,n){return e[nf]=n}var Dv=[];var se=function(e,n=null,t){for(let i=0;i<Dv.length;i++){let r=Dv[i];r(e,n,t)}},ie=(function(e){return e[e.TemplateCreateStart=0]="TemplateCreateStart",e[e.TemplateCreateEnd=1]="TemplateCreateEnd",e[e.TemplateUpdateStart=2]="TemplateUpdateStart",e[e.TemplateUpdateEnd=3]="TemplateUpdateEnd",e[e.LifecycleHookStart=4]="LifecycleHookStart",e[e.LifecycleHookEnd=5]="LifecycleHookEnd",e[e.OutputStart=6]="OutputStart",e[e.OutputEnd=7]="OutputEnd",e[e.BootstrapApplicationStart=8]="BootstrapApplicationStart",e[e.BootstrapApplicationEnd=9]="BootstrapApplicationEnd",e[e.BootstrapComponentStart=10]="BootstrapComponentStart",e[e.BootstrapComponentEnd=11]="BootstrapComponentEnd",e[e.ChangeDetectionStart=12]="ChangeDetectionStart",e[e.ChangeDetectionEnd=13]="ChangeDetectionEnd",e[e.ChangeDetectionSyncStart=14]="ChangeDetectionSyncStart",e[e.ChangeDetectionSyncEnd=15]="ChangeDetectionSyncEnd",e[e.AfterRenderHooksStart=16]="AfterRenderHooksStart",e[e.AfterRenderHooksEnd=17]="AfterRenderHooksEnd",e[e.ComponentStart=18]="ComponentStart",e[e.ComponentEnd=19]="ComponentEnd",e[e.DeferBlockStateStart=20]="DeferBlockStateStart",e[e.DeferBlockStateEnd=21]="DeferBlockStateEnd",e[e.DynamicComponentStart=22]="DynamicComponentStart",e[e.DynamicComponentEnd=23]="DynamicComponentEnd",e[e.HostBindingsUpdateStart=24]="HostBindingsUpdateStart",e[e.HostBindingsUpdateEnd=25]="HostBindingsUpdateEnd",e})(ie||{});function lI(e,n,t){let{ngOnChanges:i,ngOnInit:r,ngDoCheck:o}=n.type.prototype;if(i){let s=fb(n);(t.preOrderHooks??=[]).push(e,s),(t.preOrderCheckHooks??=[]).push(e,s)}r&&(t.preOrderHooks??=[]).push(0-e,r),o&&((t.preOrderHooks??=[]).push(e,o),(t.preOrderCheckHooks??=[]).push(e,o))}function pb(e,n){for(let t=n.directiveStart,i=n.directiveEnd;t<i;t++){let o=e.data[t].type.prototype,{ngAfterContentInit:s,ngAfterContentChecked:a,ngAfterViewInit:c,ngAfterViewChecked:l,ngOnDestroy:d}=o;s&&(e.contentHooks??=[]).push(-t,s),a&&((e.contentHooks??=[]).push(t,a),(e.contentCheckHooks??=[]).push(t,a)),c&&(e.viewHooks??=[]).push(-t,c),l&&((e.viewHooks??=[]).push(t,l),(e.viewCheckHooks??=[]).push(t,l)),d!=null&&(e.destroyHooks??=[]).push(t,d)}}function Ec(e,n,t){mb(e,n,3,t)}function Dc(e,n,t,i){(e[F]&3)===t&&mb(e,n,t,i)}function Hu(e,n){let t=e[F];(t&3)===n&&(t&=16383,t+=1,e[F]=t)}function mb(e,n,t,i){let r=i!==void 0?e[$i]&65535:0,o=i??-1,s=n.length-1,a=0;for(let c=r;c<s;c++)if(typeof n[c+1]=="number"){if(a=n[c],i!=null&&a>=i)break}else n[c]<0&&(e[$i]+=65536),(a<o||o==-1)&&(dI(e,t,n,c),e[$i]=(e[$i]&4294901760)+c+2),c++}function Cv(e,n){se(ie.LifecycleHookStart,e,n);let t=R(null);try{n.call(e)}finally{R(t),se(ie.LifecycleHookEnd,e,n)}}function dI(e,n,t,i){let r=t[i]<0,o=t[i+1],s=r?-t[i]:t[i],a=e[s];r?e[F]>>14<e[$i]>>16&&(e[F]&3)===n&&(e[F]+=16384,Cv(a,o)):Cv(a,o)}var Gr=-1,Ji=class{factory;name;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(n,t,i,r){this.factory=n,this.name=r,this.canSeeViewProviders=t,this.injectImpl=i}};function uI(e){return(e.flags&8)!==0}function fI(e){return(e.flags&16)!==0}function hI(e,n,t){let i=0;for(;i<t.length;){let r=t[i];if(typeof r=="number"){if(r!==0)break;i++;let o=t[i++],s=t[i++],a=t[i++];e.setAttribute(n,s,a,o)}else{let o=r,s=t[++i];pI(o)?e.setProperty(n,o,s):e.setAttribute(n,o,s),i++}}return i}function gb(e){return e===3||e===4||e===6}function pI(e){return e.charCodeAt(0)===64}function qr(e,n){if(!(n===null||n.length===0))if(e===null||e.length===0)e=n.slice();else{let t=-1;for(let i=0;i<n.length;i++){let r=n[i];typeof r=="number"?t=r:t===0||(t===-1||t===2?Iv(e,t,r,null,n[++i]):Iv(e,t,r,null,null))}}return e}function Iv(e,n,t,i,r){let o=0,s=e.length;if(n===-1)s=-1;else for(;o<e.length;){let a=e[o++];if(typeof a=="number"){if(a===n){s=-1;break}else if(a>n){s=o-1;break}}}for(;o<e.length;){let a=e[o];if(typeof a=="number")break;if(a===t){r!==null&&(e[o+1]=r);return}o++,r!==null&&o++}s!==-1&&(e.splice(s,0,n),o=s+1),e.splice(o++,0,t),r!==null&&e.splice(o++,0,r)}function vb(e){return e!==Gr}function Mc(e){return e&32767}function mI(e){return e>>16}function Ac(e,n){let t=mI(e),i=n;for(;t>0;)i=i[hi],t--;return i}var rf=!0;function Rc(e){let n=rf;return rf=e,n}var gI=256,bb=gI-1,yb=5,vI=0,Rn={};function bI(e,n,t){let i;typeof t=="string"?i=t.charCodeAt(0)||0:t.hasOwnProperty(Hi)&&(i=t[Hi]),i==null&&(i=t[Hi]=vI++);let r=i&bb,o=1<<r;n.data[e+(r>>yb)]|=o}function kc(e,n){let t=_b(e,n);if(t!==-1)return t;let i=n[S];i.firstCreatePass&&(e.injectorIndex=n.length,$u(i.data,e),$u(n,null),$u(i.blueprint,null));let r=Hf(e,n),o=e.injectorIndex;if(vb(r)){let s=Mc(r),a=Ac(r,n),c=a[S].data;for(let l=0;l<8;l++)n[o+l]=a[s+l]|c[s+l]}return n[o+8]=r,o}function $u(e,n){e.push(0,0,0,0,0,0,0,0,n)}function _b(e,n){return e.injectorIndex===-1||e.parent&&e.parent.injectorIndex===e.injectorIndex||n[e.injectorIndex+8]===null?-1:e.injectorIndex}function Hf(e,n){if(e.parent&&e.parent.injectorIndex!==-1)return e.parent.injectorIndex;let t=0,i=null,r=n;for(;r!==null;){if(i=Ib(r),i===null)return Gr;if(t++,r=r[hi],i.injectorIndex!==-1)return i.injectorIndex|t<<16}return Gr}function of(e,n,t){bI(e,n,t)}function yI(e,n){if(n==="class")return e.classes;if(n==="style")return e.styles;let t=e.attrs;if(t){let i=t.length,r=0;for(;r<i;){let o=t[r];if(gb(o))break;if(o===0)r=r+2;else if(typeof o=="number")for(r++;r<i&&typeof t[r]=="string";)r++;else{if(o===n)return t[r+1];r=r+2}}}return null}function wb(e,n,t){if(t&8||e!==void 0)return e;Xa(n,"NodeInjector")}function Eb(e,n,t,i){if(t&8&&i===void 0&&(i=null),(t&3)===0){let r=e[vt],o=at(void 0);try{return r?r.get(n,i,t&8):cu(n,i,t&8)}finally{at(o)}}return wb(i,n,t)}function Db(e,n,t,i=0,r){if(e!==null){if(n[F]&2048&&!(i&2)){let s=DI(e,n,t,i,Rn);if(s!==Rn)return s}let o=Cb(e,n,t,i,Rn);if(o!==Rn)return o}return Eb(n,t,i,r)}function Cb(e,n,t,i,r){let o=wI(t);if(typeof o=="function"){if(!Nu(n,e,i))return i&1?wb(r,t,i):Eb(n,t,i,r);try{let s;if(s=o(i),s==null&&!(i&8))Xa(t);else return s}finally{Ou()}}else if(typeof o=="number"){let s=null,a=_b(e,n),c=Gr,l=i&1?n[We][Xe]:null;for((a===-1||i&4)&&(c=a===-1?Hf(e,n):n[a+8],c===Gr||!xv(i,!1)?a=-1:(s=n[S],a=Mc(c),n=Ac(c,n)));a!==-1;){let d=n[S];if(Sv(o,a,d.data)){let f=_I(a,n,t,s,i,l);if(f!==Rn)return f}c=n[a+8],c!==Gr&&xv(i,n[S].data[a+8]===l)&&Sv(o,a,n)?(s=d,a=Mc(c),n=Ac(c,n)):a=-1}}return r}function _I(e,n,t,i,r,o){let s=n[S],a=s.data[e+8],c=i==null?Xt(a)&&rf:i!=s&&(a.type&3)!==0,l=r&1&&o===a,d=Cc(a,s,t,c,l);return d!==null?fs(n,s,d,a,r):Rn}function Cc(e,n,t,i,r){let o=e.providerIndexes,s=n.data,a=o&1048575,c=e.directiveStart,l=e.directiveEnd,d=o>>20,f=i?a:a+d,h=r?a+d:l;for(let p=f;p<h;p++){let m=s[p];if(p<c&&t===m||p>=c&&m.type===t)return p}if(r){let p=s[c];if(p&&xn(p)&&p.type===t)return c}return null}function fs(e,n,t,i,r){let o=e[t],s=n.data;if(o instanceof Ji){let a=o;if(a.resolving)throw au("");let c=Rc(a.canSeeViewProviders);a.resolving=!0;let l=s[t].type||s[t],d,f=a.injectImpl?at(a.injectImpl):null,h=Nu(e,i,0);try{o=e[t]=a.factory(void 0,r,s,e,i),n.firstCreatePass&&t>=i.directiveStart&&lI(t,s[t],n)}finally{f!==null&&at(f),Rc(c),a.resolving=!1,Ou()}}return o}function wI(e){if(typeof e=="string")return e.charCodeAt(0)||0;let n=e.hasOwnProperty(Hi)?e[Hi]:void 0;return typeof n=="number"?n>=0?n&bb:EI:n}function Sv(e,n,t){let i=1<<e;return!!(t[n+(e>>yb)]&i)}function xv(e,n){return!(e&2)&&!(e&1&&n)}var bi=class{_tNode;_lView;constructor(n,t){this._tNode=n,this._lView=t}get(n,t,i){return Db(this._tNode,this._lView,n,Vi(i),t)}};function EI(){return new bi(qe(),B())}function At(e){return ys(()=>{let n=e.prototype.constructor,t=n[qo]||sf(n),i=Object.prototype,r=Object.getPrototypeOf(e.prototype).constructor;for(;r&&r!==i;){let o=r[qo]||sf(r);if(o&&o!==t)return o;r=Object.getPrototypeOf(r)}return o=>new o})}function sf(e){return Jd(e)?()=>{let n=sf(Ge(e));return n&&n()}:di(e)}function DI(e,n,t,i,r){let o=e,s=n;for(;o!==null&&s!==null&&s[F]&2048&&!Wi(s);){let a=Cb(o,s,t,i|2,Rn);if(a!==Rn)return a;let c=o.parent;if(!c){let l=s[pu];if(l){let d=l.get(t,Rn,i&-5);if(d!==Rn)return d}c=Ib(s),s=s[hi]}o=c}return r}function Ib(e){let n=e[S],t=n.type;return t===2?n.declTNode:t===1?e[Xe]:null}function $f(e){return yI(qe(),e)}function x(e){return{token:e.token,providedIn:e.autoProvided===!1?null:"root",factory:e.factory,value:void 0}}function CI(){return Xr(qe(),B())}function Xr(e,n){return new Y(St(e,n))}var Y=(()=>{class e{nativeElement;constructor(t){this.nativeElement=t}static __NG_ELEMENT_ID__=CI}return e})();function II(e){return e instanceof Y?e.nativeElement:e}function SI(){return this._results[Symbol.iterator]()}var nn=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new I}constructor(n=!1){this._emitDistinctChangesOnly=n}get(n){return this._results[n]}map(n){return this._results.map(n)}filter(n){return this._results.filter(n)}find(n){return this._results.find(n)}reduce(n,t){return this._results.reduce(n,t)}forEach(n){this._results.forEach(n)}some(n){return this._results.some(n)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(n,t){this.dirty=!1;let i=Lg(n);(this._changesDetected=!Fg(this._results,i,t))&&(this._results=i,this.length=i.length,this.last=i[this.length-1],this.first=i[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(n){this._onDirty=n}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=SI},Sb="ngSkipHydration",xI="ngskiphydration";function xb(e){let n=e.mergedAttrs;if(n===null)return!1;for(let t=0;t<n.length;t+=2){let i=n[t];if(typeof i=="number")return!1;if(typeof i=="string"&&i.toLowerCase()===xI)return!0}return!1}function Tb(e){return e.hasAttribute(Sb)}function Nc(e){return(e.flags&128)===128}function Mb(e){if(Nc(e))return!0;let n=e.parent;for(;n;){if(Nc(e)||xb(n))return!0;n=n.parent}return!1}var zf=(function(e){return e[e.OnPush=0]="OnPush",e[e.Eager=1]="Eager",e[e.Default=1]="Default",e})(zf||{}),Ab=new Map,TI=0;function MI(){return TI++}function AI(e){Ab.set(e[Cn],e)}function af(e){Ab.delete(e[Cn])}var Tv="__ngContext__";function Yr(e,n){Bt(n)?(e[Tv]=n[Cn],AI(n)):e[Tv]=n}function Rb(e){return Nb(e[Br])}function kb(e){return Nb(e[Lt])}function Nb(e){for(;e!==null&&!bt(e);)e=e[Lt];return e}var cf;function Gf(e){cf=e}function Wf(){if(cf!==void 0)return cf;if(typeof document<"u")return document;throw new D(210,!1)}var Ob="h",Pb="b",RI="f",kI="n",Fb="e",Lb="t",Gc="c",qf="x",hs="r",Bb="i",Vb="n",Yf="d";var jb="di",Ub="s",Hb="p";var Jr=new g(""),$b=!1,Zf=new g("",{factory:()=>$b});var Kf=new g(""),zb=!1,Gb=new g("",{factory:()=>[]}),Qf=new g(""),Xf=new g("",{factory:()=>new Map});var _s="ngb";var Wb=(e,n,t)=>{let i=e,r=i.__jsaction_fns??new Map,o=r.get(n)??[];o.push(t),r.set(n,o),i.__jsaction_fns=r},qb=(e,n)=>{let t=e,i=t.getAttribute(_s)??"",r=n.get(i)??new Set;r.has(t)||r.add(t),n.set(i,r)};var Yb=e=>{e.removeAttribute(bc.JSACTION),e.removeAttribute(_s),e.__jsaction_fns=void 0},Zb=new g("",{factory:()=>({})}),lf=new WeakMap;function NI(e,n){if(e==null||typeof e!="object")return;let t=lf.get(e);t||(t=new WeakSet,lf.set(e,t)),t.add(n)}function Jf(e,n){let t=n?.__jsaction_fns?.get(e.type);if(!(!t||!n?.isConnected)&&!(n&&lf.get(e)?.has(n)))for(let i of t)i(e)}var df=new Map;function Kb(e,n){return df.set(e,n),()=>df.delete(e)}var Mv=!1,Qb=(e,n,t,i)=>{};function OI(e,n,t,i){Qb(e,n,t,i)}function Xb(){Mv||(Qb=(e,n,t,i)=>{let r=e[vt].get(Tt);df.get(r)?.(n,t,i)},Mv=!0)}var ws=new g("");function Es(e){return(e.flags&32)===32}var PI="__nghData__",eh=PI,FI="__nghDeferData__",Jb=FI;var Ic="ngh",ey="nghm",ty=()=>null;function LI(e,n,t=!1){let i=e.getAttribute(Ic);if(i==null)return null;let[r,o]=i.split("|");if(i=t?o:r,!i)return null;let s=o?`|${o}`:"",a=t?r:s,c={};if(i!==""){let d=n.get(vi,null,{optional:!0});d!==null&&(c=d.get(eh,[])[Number(i)])}let l={data:c,firstChild:e.firstChild??null};return t&&(l.firstChild=e,Wc(l,0,e.nextSibling)),a?e.setAttribute(Ic,a):e.removeAttribute(Ic),l}function ny(){ty=LI}function iy(e,n,t=!1){return ty(e,n,t)}function ry(e){let n=e._lView;return n[S].type===2?null:(Wi(n)&&(n=n[oe]),n)}function BI(e){return e.textContent?.replace(/\s/gm,"")}function VI(e){let n=Wf(),t=n.createNodeIterator(e,NodeFilter.SHOW_COMMENT,{acceptNode(o){let s=BI(o);return s==="ngetn"||s==="ngtns"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),i,r=[];for(;i=t.nextNode();)r.push(i);for(let o of r)o.textContent==="ngetn"?o.replaceWith(n.createTextNode("")):o.remove()}function Wc(e,n,t){e.segmentHeads??={},e.segmentHeads[n]=t}function uf(e,n){return e.segmentHeads?.[n]??null}function oy(e){return e.get(Qf,!1,{optional:!0})}function jI(e,n){let t=e.data,i=t[Fb]?.[n]??null;return i===null&&t[Gc]?.[n]&&(i=th(e,n)),i}function sy(e,n){return e.data[Gc]?.[n]??null}function th(e,n){let t=sy(e,n)??[],i=0;for(let r of t)i+=r[hs]*(r[qf]??1);return i}function UI(e){if(typeof e.disconnectedNodes>"u"){let n=e.data[Yf];e.disconnectedNodes=n?new Set(n):null}return e.disconnectedNodes}function ay(e,n){if(typeof e.disconnectedNodes>"u"){let t=e.data[Yf];e.disconnectedNodes=t?new Set(t):null}return!!UI(e)?.has(n)}function qc(e,n){let t=e[dt];return t!==null&&!cc()&&!Es(n)&&!ay(t,n.index-oe)}function HI(e,n){let t=n.get(ws),r=n.get(vi).get(Jb,{}),o=!1,s=e,a=null,c=[];for(;!o&&s;){o=t.has(s);let l=t.hydrating.get(s);if(a===null&&l!=null){a=l.promise;break}c.unshift(s),s=r[s][Hb]}return{parentBlockPromise:a,hydrationQueue:c}}function zu(e){return!!e&&e.nodeType===Node.COMMENT_NODE&&e.textContent?.trim()===ey}function Av(e){for(;e&&e.nodeType===Node.TEXT_NODE;)e=e.previousSibling;return e}function cy(e){for(let i of e.body.childNodes)if(zu(i))return;let n=Av(e.body.previousSibling);if(zu(n))return;let t=Av(e.head.lastChild);if(!zu(t))throw new D(-507,!1)}function ly(e,n){let t=e.contentQueries;if(t!==null){let i=R(null);try{for(let r=0;r<t.length;r+=2){let o=t[r],s=t[r+1];if(s!==-1){let a=e.data[s];dc(o),a.contentQueries(2,n[s],s)}}}finally{R(i)}}}function ff(e,n,t){dc(0);let i=R(null);try{n(e,t)}finally{R(i)}}function dy(e,n,t){if(mu(n)){let i=R(null);try{let r=n.directiveStart,o=n.directiveEnd;for(let s=r;s<o;s++){let a=e.data[s];if(a.contentQueries){let c=t[s];a.contentQueries(1,c,s)}}}finally{R(i)}}}var rn=(function(e){return e[e.Emulated=0]="Emulated",e[e.None=2]="None",e[e.ShadowDom=3]="ShadowDom",e[e.ExperimentalIsolatedShadowDom=4]="ExperimentalIsolatedShadowDom",e})(rn||{});var yc;function $I(){if(yc===void 0&&(yc=null,Or.trustedTypes))try{yc=Or.trustedTypes.createPolicy("angular",{createHTML:e=>e,createScript:e=>e,createScriptURL:e=>e})}catch{}return yc}function Yc(e){return $I()?.createHTML(e)||e}var Qn=class{changingThisBreaksApplicationSecurity;constructor(n){this.changingThisBreaksApplicationSecurity=n}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Wa})`}},hf=class extends Qn{getTypeName(){return"HTML"}},pf=class extends Qn{getTypeName(){return"Style"}},mf=class extends Qn{getTypeName(){return"Script"}},gf=class extends Qn{getTypeName(){return"URL"}},vf=class extends Qn{getTypeName(){return"ResourceURL"}};function ei(e){return e instanceof Qn?e.changingThisBreaksApplicationSecurity:e}function nr(e,n){let t=uy(e);if(t!=null&&t!==n){if(t==="ResourceURL"&&n==="URL")return!0;throw new Error(`Required a safe ${n}, got a ${t} (see ${Wa})`)}return t===n}function uy(e){return e instanceof Qn&&e.getTypeName()||null}function nh(e){return new hf(e)}function ih(e){return new pf(e)}function rh(e){return new mf(e)}function oh(e){return new gf(e)}function sh(e){return new vf(e)}function zI(e){let n=new yf(e);return GI()?new bf(n):n}var bf=class{inertDocumentHelper;constructor(n){this.inertDocumentHelper=n}getInertBodyElement(n){n="<body><remove></remove>"+n;try{let t=new window.DOMParser().parseFromString(Yc(n),"text/html").body;return t===null?this.inertDocumentHelper.getInertBodyElement(n):(t.firstChild?.remove(),t)}catch{return null}}},yf=class{defaultDoc;inertDocument;constructor(n){this.defaultDoc=n,this.inertDocument=this.defaultDoc.implementation.createHTMLDocument("sanitization-inert")}getInertBodyElement(n){let t=this.inertDocument.createElement("template");return t.innerHTML=Yc(n),t}};function GI(){try{return!!new window.DOMParser().parseFromString(Yc(""),"text/html")}catch{return!1}}var WI=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;function Zc(e){return e=String(e),e.match(WI)?e:"unsafe:"+e}function ti(e){let n={};for(let t of e.split(","))n[t]=!0;return n}function Ds(...e){let n={};for(let t of e)for(let i in t)t.hasOwnProperty(i)&&(n[i]=!0);return n}var fy=ti("area,br,col,hr,img,wbr"),hy=ti("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),py=ti("rp,rt"),qI=Ds(py,hy),YI=Ds(hy,ti("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")),ZI=Ds(py,ti("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")),Rv=Ds(fy,YI,ZI,qI),my=ti("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),KI=ti("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"),QI=ti("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"),XI=Ds(my,KI,QI),JI=ti("script,style,template"),_f=class{sanitizedSomething=!1;buf=[];sanitizeChildren(n){let t=n.firstChild,i=!0,r=[];for(;t;){if(t.nodeType===Node.ELEMENT_NODE?i=this.startElement(t):t.nodeType===Node.TEXT_NODE?this.chars(t.nodeValue):this.sanitizedSomething=!0,i&&t.firstChild){r.push(t),t=nS(t);continue}for(;t;){t.nodeType===Node.ELEMENT_NODE&&this.endElement(t);let o=tS(t);if(o){t=o;break}t=r.pop()}}return this.buf.join("")}startElement(n){let t=kv(n).toLowerCase();if(!Rv.hasOwnProperty(t))return this.sanitizedSomething=!0,!JI.hasOwnProperty(t);this.buf.push("<"),this.buf.push(t);let i=n.attributes;for(let r=0;r<i.length;r++){let o=i.item(r),s=o.name,a=s.toLowerCase();if(!XI.hasOwnProperty(a)){this.sanitizedSomething=!0;continue}let c=o.value;my[a]&&(c=Zc(c)),this.buf.push(" ",s,'="',Nv(c),'"')}return this.buf.push(">"),!0}endElement(n){let t=kv(n).toLowerCase();Rv.hasOwnProperty(t)&&!fy.hasOwnProperty(t)&&(this.buf.push("</"),this.buf.push(t),this.buf.push(">"))}chars(n){this.buf.push(Nv(n))}};function eS(e,n){return(e.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_CONTAINED_BY)!==Node.DOCUMENT_POSITION_CONTAINED_BY}function tS(e){let n=e.nextSibling;if(n&&e!==n.previousSibling)throw gy(n);return n}function nS(e){let n=e.firstChild;if(n&&eS(e,n))throw gy(n);return n}function kv(e){let n=e.nodeName;return typeof n=="string"?n:"FORM"}function gy(e){return new Error(`Failed to sanitize html because the element is clobbered: ${e.outerHTML}`)}var iS=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,rS=/([^\#-~ |!])/g;function Nv(e){return e.replace(/&/g,"&amp;").replace(iS,function(n){let t=n.charCodeAt(0),i=n.charCodeAt(1);return"&#"+((t-55296)*1024+(i-56320)+65536)+";"}).replace(rS,function(n){return"&#"+n.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}var _c;function ah(e,n){let t=null;try{_c=_c||zI(e);let i=n?String(n):"";t=_c.getInertBodyElement(i);let r=5,o=i;do{if(r===0)throw new Error("Failed to sanitize html because the input is unstable");r--,i=o,o=t.innerHTML,t=_c.getInertBodyElement(i)}while(i!==o);let a=new _f().sanitizeChildren(Ov(t)||t);return Yc(a)}finally{if(t){let i=Ov(t)||t;for(;i.firstChild;)i.firstChild.remove()}}}function Ov(e){return"content"in e&&oS(e)?e.content:null}function oS(e){return e.nodeType===Node.ELEMENT_NODE&&e.nodeName==="TEMPLATE"}var sS=/>|->|<!--|-->|--!>|<!-$/g,aS=/(<|>)/g,cS="\u200B$1\u200B";function lS(e){return e.replace(sS,n=>n.replace(aS,cS))}function vy(e,n){return e.createText(n)}function dS(e,n,t){e.setValue(n,t)}function by(e,n){return e.createComment(lS(n))}function ch(e,n,t){return e.createElement(n,t)}function Oc(e,n,t,i,r){e.insertBefore(n,t,i,r)}function yy(e,n,t){e.appendChild(n,t)}function Pv(e,n,t,i,r){i!==null?Oc(e,n,t,i,r):yy(e,n,t)}function lh(e,n,t,i){e.removeChild(null,n,t,i)}function _y(e){e.textContent=""}function uS(e,n,t){e.setAttribute(n,"style",t)}function fS(e,n,t){t===""?e.removeAttribute(n,"class"):e.setAttribute(n,"class",t)}function wy(e,n,t){let{mergedAttrs:i,classes:r,styles:o}=t;i!==null&&hI(e,n,i),r!==null&&fS(e,n,r),o!==null&&uS(e,n,o)}var on=(function(e){return e[e.NONE=0]="NONE",e[e.HTML=1]="HTML",e[e.STYLE=2]="STYLE",e[e.SCRIPT=3]="SCRIPT",e[e.URL=4]="URL",e[e.RESOURCE_URL=5]="RESOURCE_URL",e[e.ATTRIBUTE_NO_BINDING=6]="ATTRIBUTE_NO_BINDING",e})(on||{});function Ey(e){return e.ownerDocument.body}function hS(e){return e instanceof Function?e():e}function pS(e,n,t){let i=e.length;for(;;){let r=e.indexOf(n,t);if(r===-1)return r;if(r===0||e.charCodeAt(r-1)<=32){let o=n.length;if(r+o===i||e.charCodeAt(r+o)<=32)return r}t=r+1}}var Dy="ng-template";function mS(e,n,t,i){let r=0;if(i){for(;r<n.length&&typeof n[r]=="string";r+=2)if(n[r]==="class"&&pS(n[r+1].toLowerCase(),t,0)!==-1)return!0}else if(dh(e))return!1;if(r=n.indexOf(1,r),r>-1){let o;for(;++r<n.length&&typeof(o=n[r])=="string";)if(o.toLowerCase()===t)return!0}return!1}function dh(e){return e.type===4&&e.value!==Dy}function gS(e,n,t){let i=e.type===4&&!t?Dy:e.value;return n===i}function vS(e,n,t){let i=4,r=e.attrs,o=r!==null?_S(r):0,s=!1;for(let a=0;a<n.length;a++){let c=n[a];if(typeof c=="number"){if(!s&&!en(i)&&!en(c))return!1;if(s&&en(c))continue;s=!1,i=c|i&1;continue}if(!s)if(i&4){if(i=2|i&1,c!==""&&!gS(e,c,t)||c===""&&n.length===1){if(en(i))return!1;s=!0}}else if(i&8){if(r===null||!mS(e,r,c,t)){if(en(i))return!1;s=!0}}else{let l=n[++a],d=bS(c,r,dh(e),t);if(d===-1){if(en(i))return!1;s=!0;continue}if(l!==""){let f;if(d>o?f="":f=r[d+1].toLowerCase(),i&2&&l!==f){if(en(i))return!1;s=!0}}}}return en(i)||s}function en(e){return(e&1)===0}function bS(e,n,t,i){if(n===null)return-1;let r=0;if(i||!t){let o=!1;for(;r<n.length;){let s=n[r];if(s===e)return r;if(s===3||s===6)o=!0;else if(s===1||s===2){let a=n[++r];for(;typeof a=="string";)a=n[++r];continue}else{if(s===4)break;if(s===0){r+=4;continue}}r+=o?1:2}return-1}else return wS(n,e)}function Cy(e,n,t=!1){for(let i=0;i<n.length;i++)if(vS(e,n[i],t))return!0;return!1}function yS(e){let n=e.attrs;if(n!=null){let t=n.indexOf(5);if((t&1)===0)return n[t+1]}return null}function _S(e){for(let n=0;n<e.length;n++){let t=e[n];if(gb(t))return n}return e.length}function wS(e,n){let t=e.indexOf(4);if(t>-1)for(t++;t<e.length;){let i=e[t];if(typeof i=="number")return-1;if(i===n)return t;t++}return-1}function ES(e,n){e:for(let t=0;t<n.length;t++){let i=n[t];if(e.length===i.length){for(let r=0;r<e.length;r++)if(e[r]!==i[r])continue e;return!0}}return!1}function Fv(e,n){return e?":not("+n.trim()+")":n}function DS(e){let n=e[0],t=1,i=2,r="",o=!1;for(;t<e.length;){let s=e[t];if(typeof s=="string")if(i&2){let a=e[++t];r+="["+s+(a.length>0?'="'+a+'"':"")+"]"}else i&8?r+="."+s:i&4&&(r+=" "+s);else r!==""&&!en(s)&&(n+=Fv(o,r),r=""),i=s,o=o||!en(i);t++}return r!==""&&(n+=Fv(o,r)),n}function CS(e){return e.map(DS).join(",")}function IS(e){let n=[],t=[],i=1,r=2;for(;i<e.length;){let o=e[i];if(typeof o=="string")r===2?o!==""&&n.push(o,e[++i]):r===8&&t.push(o);else{if(!en(r))break;r=o}i++}return t.length&&n.push(1,...t),n}var Rt={},Xn=(function(e){return e[e.Important=1]="Important",e[e.DashCase=2]="DashCase",e})(Xn||{}),SS;function uh(e,n){return SS(e,n)}var XU=typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";var wf=new WeakMap;function Iy(e){return e?e[hi]??e:null}var ls=new WeakSet;function xS(e,n,t){let i=wf.get(e);if(!i||i.length===0)return;let r=n.parentNode,o=n.previousSibling,s=Iy(t);for(let a=i.length-1;a>=0;a--){let{el:c,declarationView:l}=i[a],d=c.parentNode;c===n?(i.splice(a,1),ls.add(c),c.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}}))):o&&c===o?(i.splice(a,1),c.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}})),c.parentNode?.removeChild(c)):d&&r&&d!==r&&(s===null||l===null||s===l)&&(i.splice(a,1),c.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}})),c.parentNode?.removeChild(c))}}function TS(e,n,t){let i=Iy(t),r=wf.get(e);r?r.some(o=>o.el===n)||r.push({el:n,declarationView:i}):wf.set(e,[{el:n,declarationView:i}])}var yi=new Set,Kc=(function(e){return e[e.CHANGE_DETECTION=0]="CHANGE_DETECTION",e[e.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",e})(Kc||{}),ni=new g(""),Lv=new Set;function jt(e){Lv.has(e)||(Lv.add(e),performance?.mark?.("mark_feature_usage",{detail:{feature:e}}))}var fh=(()=>{class e{impl=null;execute(){this.impl?.execute()}static \u0275prov=G({token:e,providedIn:"root",factory:()=>new e})}return e})(),Sy=[0,1,2,3],xy=(()=>{class e{ngZone=u(M);scheduler=u(_n);errorHandler=u(Kt,{optional:!0});sequences=new Set;deferredRegistrations=new Set;executing=!1;constructor(){u(ni,{optional:!0})}execute(){let t=this.sequences.size>0;t&&se(ie.AfterRenderHooksStart),this.executing=!0;for(let i of Sy)for(let r of this.sequences)if(!(r.erroredOrDestroyed||!r.hooks[i]))try{r.pipelinedValue=this.ngZone.runOutsideAngular(()=>this.maybeTrace(()=>{let o=r.hooks[i];return o(r.pipelinedValue)},r.snapshot))}catch(o){r.erroredOrDestroyed=!0,this.errorHandler?.handleError(o)}this.executing=!1;for(let i of this.sequences)i.afterRun(),i.once&&(this.sequences.delete(i),i.destroy());for(let i of this.deferredRegistrations)this.sequences.add(i);this.deferredRegistrations.size>0&&this.scheduler.notify(7),this.deferredRegistrations.clear(),t&&se(ie.AfterRenderHooksEnd)}register(t){let{view:i}=t;i!==void 0?((i[zi]??=[]).push(t),qi(i),i[F]|=8192):this.executing?this.deferredRegistrations.add(t):this.addSequence(t)}addSequence(t){this.sequences.add(t),this.scheduler.notify(7)}unregister(t){this.executing&&this.sequences.has(t)?(t.erroredOrDestroyed=!0,t.pipelinedValue=void 0,t.once=!0):(this.sequences.delete(t),this.deferredRegistrations.delete(t))}maybeTrace(t,i){return i?i.run(Kc.AFTER_NEXT_RENDER,t):t()}static \u0275prov=G({token:e,providedIn:"root",factory:()=>new e})}return e})(),Pc=class{impl;hooks;view;once;snapshot;erroredOrDestroyed=!1;pipelinedValue=void 0;unregisterOnDestroy;constructor(n,t,i,r,o,s=null){this.impl=n,this.hooks=t,this.view=i,this.once=r,this.snapshot=s,this.unregisterOnDestroy=o?.onDestroy(()=>this.destroy())}afterRun(){this.erroredOrDestroyed=!1,this.pipelinedValue=void 0,this.snapshot?.dispose(),this.snapshot=null}destroy(){this.impl.unregister(this),this.unregisterOnDestroy?.();let n=this.view?.[zi];n&&(this.view[zi]=n.filter(t=>t!==this))}};function ze(e,n){let t=n?.injector??u(ne);return jt("NgAfterNextRender"),AS(e,t,n,!0)}function MS(e){return e instanceof Function?[void 0,void 0,e,void 0]:[e.earlyRead,e.write,e.mixedReadWrite,e.read]}function AS(e,n,t,i){let r=n.get(fh);r.impl??=n.get(xy);let o=n.get(ni,null,{optional:!0}),s=t?.manualCleanup!==!0?n.get(ut):null,a=n.get(as,null,{optional:!0}),c=new Pc(r.impl,MS(e),a?.view,i,s,o?.snapshot(null));return r.impl.register(c),c}var hh=new g("",{factory:()=>{let e=u(ue),n=new Set;return e.onDestroy(()=>n.clear()),{queue:n,isScheduled:!1,scheduler:null,injector:e}}});function Ty(e,n,t){let i=e.get(hh);if(Array.isArray(n))for(let r of n)i.queue.add(r),t?.detachedLeaveAnimationFns?.push(r);else i.queue.add(n),t?.detachedLeaveAnimationFns?.push(n);i.scheduler&&i.scheduler(e)}function RS(e,n){let t=e.get(hh);if(Array.isArray(n))for(let i of n)t.queue.delete(i);else t.queue.delete(n)}function kS(e,n){let t=e.get(hh);if(n.detachedLeaveAnimationFns){for(let i of n.detachedLeaveAnimationFns)t.queue.delete(i);n.detachedLeaveAnimationFns=void 0}}function NS(e,n){for(let[t,i]of n)Ty(e,i.animateFns)}function Bv(e,n,t,i){let r=e?.[In]?.enter;n!==null&&r&&r.has(t.index)&&NS(i,r)}function Vv(e,n,t,i){try{t.get(es)}catch{return i(!1)}let r=e?.[In];r?.enter?.has(n.index)&&RS(t,r.enter.get(n.index).animateFns);let o=OS(e,n,r);if(o.size===0){let s=!1;if(e){let a=[];Qc(e,n,a),s=a.length>0}if(!s)return i(!1)}e&&yi.add(e[Cn]),Ty(t,()=>PS(e,n,r||void 0,o,i),r||void 0)}function OS(e,n,t){let i=new Map,r=t?.leave;if(r&&r.has(n.index)&&i.set(n.index,r.get(n.index)),e&&r)for(let[o,s]of r){if(i.has(o))continue;let c=e[S].data[o].parent;for(;c;){if(c===n){i.set(o,s);break}c=c.parent}}return i}function PS(e,n,t,i,r){let o=[];if(t&&t.leave)for(let[s]of i){if(!t.leave.has(s))continue;let a=t.leave.get(s);for(let c of a.animateFns){let{promise:l}=c();o.push(l)}t.detachedLeaveAnimationFns=void 0}if(e&&Qc(e,n,o),o.length>0){let s=t||e?.[In];if(s){let a=s.running;a&&o.push(a),s.running=Promise.allSettled(o),LS(e,s.running,r)}else Promise.allSettled(o).then(()=>{e&&yi.delete(e[Cn]),r(!0)})}else e&&yi.delete(e[Cn]),r(!1)}function Qc(e,n,t){if(n.type&12){let r=e[n.index];if(bt(r))for(let o=ye;o<r.length;o++){let s=r[o];s[S].type===2&&FS(s,t)}}let i=n.child;for(;i;)Qc(e,i,t),i=i.next}function FS(e,n){let t=e[In];if(t&&t.leave)for(let r of t.leave.values())for(let o of r.animateFns){let{promise:s}=o();n.push(s)}let i=e[S].firstChild;for(;i;)Qc(e,i,n),i=i.next}function LS(e,n,t){n.then(()=>{e[In]?.running===n&&(e[In].running=void 0,yi.delete(e[Cn])),t(!0)})}function zr(e,n,t,i,r,o,s,a){if(r!=null){let c,l=!1;bt(r)?c=r:Bt(r)&&(l=!0,r=r[lt]);let d=It(r);e===0&&i!==null?(Bv(a,i,o,t),s==null?yy(n,i,d):Oc(n,i,d,s||null,!0)):e===1&&i!==null?(Bv(a,i,o,t),Oc(n,i,d,s||null,!0),xS(o,d,a)):e===2?(a?.[In]?.leave?.has(o.index)&&TS(o,d,a),ls.delete(d),Vv(a,o,t,f=>{if(ls.has(d)){ls.delete(d);return}lh(n,d,l,f)})):e===3&&(ls.delete(d),Vv(a,o,t,()=>{n.destroyNode(d)})),c!=null&&qS(n,e,t,c,o,i,s)}}function BS(e,n){My(e,n),n[lt]=null,n[Xe]=null}function VS(e,n,t,i,r,o){i[lt]=r,i[Xe]=n,Jc(e,i,t,1,r,o)}function My(e,n){n[En].changeDetectionScheduler?.notify(9),Jc(e,n,n[ce],2,null,null)}function jS(e){let n=e[Br];if(!n)return Gu(e[S],e);for(;n;){let t=null;if(Bt(n))t=n[Br];else{let i=n[ye];i&&(t=i)}if(!t){for(;n&&!n[Lt]&&n!==e;)Bt(n)&&Gu(n[S],n),n=n[xe];n===null&&(n=e),Bt(n)&&Gu(n[S],n),t=n&&n[Lt]}n=t}}function ph(e,n){let t=e[Gi],i=t.indexOf(n);t.splice(i,1)}function Xc(e,n){if(mi(n))return;let t=n[ce];t.destroyNode&&Jc(e,n,t,3,null,null),jS(n)}function Gu(e,n){if(mi(n))return;let t=R(null);try{n[F]&=-129,n[F]|=256,n[Ct]&&Mi(n[Ct]),HS(e,n),US(e,n),n[S].type===1&&n[ce].destroy();let i=n[pi];if(i!==null&&bt(n[xe])){i!==n[xe]&&ph(i,n);let r=n[Dn];r!==null&&r.detachView(e)}af(n)}finally{R(t)}}function US(e,n){let t=e.cleanup,i=n[Lr];if(t!==null)for(let s=0;s<t.length-1;s+=2)if(typeof t[s]=="string"){let a=t[s+3];a>=0?i[a]():i[-a].unsubscribe(),s+=2}else{let a=i[t[s+1]];t[s].call(a)}i!==null&&(n[Lr]=null);let r=n[Hn];if(r!==null){n[Hn]=null;for(let s=0;s<r.length;s++){let a=r[s];a()}}let o=n[ui];if(o!==null){n[ui]=null;for(let s of o)s.destroy()}}function HS(e,n){let t;if(e!=null&&(t=e.destroyHooks)!=null)for(let i=0;i<t.length;i+=2){let r=n[t[i]];if(!(r instanceof Ji)){let o=t[i+1];if(Array.isArray(o))for(let s=0;s<o.length;s+=2){let a=r[o[s]],c=o[s+1];se(ie.LifecycleHookStart,a,c);try{c.call(a)}finally{se(ie.LifecycleHookEnd,a,c)}}else{se(ie.LifecycleHookStart,r,o);try{o.call(r)}finally{se(ie.LifecycleHookEnd,r,o)}}}}}function Ay(e,n,t){return $S(e,n.parent,t)}function $S(e,n,t){let i=n;for(;i!==null&&i.type&168;)n=i,i=n.parent;if(i===null)return t[lt];if(Xt(i)){let{encapsulation:r}=e.data[i.directiveStart+i.componentOffset];if(r===rn.None||r===rn.Emulated)return null}return St(i,t)}function Ry(e,n,t){return GS(e,n,t)}function zS(e,n,t){return e.type&40?St(e,t):null}var GS=zS,jv;function mh(e,n,t,i){let r=Ay(e,i,n),o=n[ce],s=i.parent||n[Xe],a=Ry(s,i,n);if(r!=null)if(Array.isArray(t))for(let c=0;c<t.length;c++)Pv(o,r,t[c],a,!1);else Pv(o,r,t,a,!1);jv!==void 0&&jv(o,i,n,t,r)}function ds(e,n){if(n!==null){let t=n.type;if(t&3)return St(n,e);if(t&4)return Ef(-1,e[n.index]);if(t&8){let i=n.child;if(i!==null)return ds(e,i);{let r=e[n.index];return bt(r)?Ef(-1,r):It(r)}}else{if(t&128)return ds(e,n.next);if(t&32)return uh(n,e)()||It(e[n.index]);{let i=ky(e,n);if(i!==null){if(Array.isArray(i))return i[0];let r=$n(e[We]);return ds(r,i)}else return ds(e,n.next)}}}return null}function ky(e,n){if(n!==null){let i=e[We][Xe],r=n.projection;return i.projection[r]}return null}function Ef(e,n){let t=ye+e+1;if(t<n.length){let i=n[t],r=i[S].firstChild;if(r!==null)return ds(i,r)}return n[Sn]}function gh(e,n,t,i,r,o,s){for(;t!=null;){let a=i[vt];if(t.type===128){t=t.next;continue}let c=i[t.index],l=t.type;if(s&&n===0&&(c&&Yr(It(c),i),t.flags|=2),!Es(t))if(l&8)gh(e,n,t.child,i,r,o,!1),zr(n,e,a,r,c,t,o,i);else if(l&32){let d=uh(t,i),f;for(;f=d();)zr(n,e,a,r,f,t,o,i);zr(n,e,a,r,c,t,o,i)}else l&16?Ny(e,n,i,t,r,o):zr(n,e,a,r,c,t,o,i);t=s?t.projectionNext:t.next}}function Jc(e,n,t,i,r,o){gh(t,i,e.firstChild,n,r,o,!1)}function WS(e,n,t){let i=n[ce],r=Ay(e,t,n),o=t.parent||n[Xe],s=Ry(o,t,n);Ny(i,0,n,t,r,s)}function Ny(e,n,t,i,r,o){let s=t[We],c=s[Xe].projection[i.projection];if(Array.isArray(c))for(let l=0;l<c.length;l++){let d=c[l];zr(n,e,t[vt],r,d,i,o,t)}else{let l=c,d=s[xe];Nc(i)&&(l.flags|=128),gh(e,n,l,d,r,o,!0)}}function qS(e,n,t,i,r,o,s){let a=i[Sn],c=It(i);a!==c&&zr(n,e,t,o,a,r,s);for(let l=ye;l<i.length;l++){let d=i[l];Jc(d[S],d,e,n,o,a)}}function YS(e,n,t,i,r){if(n)r?e.addClass(t,i):e.removeClass(t,i);else{let o=i.indexOf("-")===-1?void 0:Xn.DashCase;r==null?e.removeStyle(t,i,o):(typeof r=="string"&&r.endsWith("!important")&&(r=r.slice(0,-10),o|=Xn.Important),e.setStyle(t,i,r,o))}}function vh(e,n,t,i,r,o,s,a,c,l,d){let f=oe+i,h=f+r,p=ZS(f,h),m=typeof l=="function"?l():l;return p[S]={type:e,blueprint:p,template:t,queries:null,viewQuery:a,declTNode:n,data:p.slice().fill(null,f),bindingStartIndex:f,expandoStartIndex:h,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof o=="function"?o():o,pipeRegistry:typeof s=="function"?s():s,firstChild:null,schemas:c,consts:m,incompleteFirstPass:!1,ssrId:d}}function ZS(e,n){let t=[];for(let i=0;i<n;i++)t.push(i<e?null:Rt);return t}function KS(e){let n=e.tView;return n===null||n.incompleteFirstPass?e.tView=vh(1,null,e.template,e.decls,e.vars,e.directiveDefs,e.pipeDefs,e.viewQuery,e.schemas,e.consts,e.id):n}function bh(e,n,t,i,r,o,s,a,c,l,d){let f=n.blueprint.slice();return f[lt]=r,f[F]=i|4|128|8|64|1024,(l!==null||e&&e[F]&2048)&&(f[F]|=2048),_u(f),f[xe]=f[hi]=e,f[Te]=t,f[En]=s||e&&e[En],f[ce]=a||e&&e[ce],f[vt]=c||e&&e[vt]||null,f[Xe]=o,f[Cn]=MI(),f[dt]=d,f[pu]=l,f[We]=n.type==2?e[We]:f,f}function QS(e,n,t){let i=St(n,e),r=KS(t),o=e[En].rendererFactory,s=yh(e,bh(e,r,null,Oy(t),i,n,null,o.createRenderer(i,t),null,null,null));return e[n.index]=s}function Oy(e){let n=16;return e.signals?n=4096:e.onPush&&(n=64),n}function Py(e,n,t,i){if(t===0)return-1;let r=n.length;for(let o=0;o<t;o++)n.push(i),e.blueprint.push(i),e.data.push(null);return r}function yh(e,n){return e[Br]?e[hu][Lt]=n:e[Br]=n,e[hu]=n,n}function w(e=1){Fy(De(),B(),Zn()+e,!1)}function Fy(e,n,t,i){if(!i)if((n[F]&3)===3){let o=e.preOrderCheckHooks;o!==null&&Ec(n,o,t)}else{let o=e.preOrderHooks;o!==null&&Dc(n,o,0,t)}gi(t)}var el=(function(e){return e[e.None=0]="None",e[e.SignalBased=1]="SignalBased",e[e.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",e})(el||{});function Df(e,n,t,i){let r=R(null);try{let[o,s,a]=e.inputs[t],c=null;(s&el.SignalBased)!==0&&(c=n[o][pt]),c!==null&&c.transformFn!==void 0?i=c.transformFn(i):a!==null&&(i=a.call(n,i)),e.setInput!==null?e.setInput(n,c,i,t,o):ub(n,c,o,i)}finally{R(r)}}function Ly(e,n,t,i,r){let o=Zn(),s=i&2;try{gi(-1),s&&n.length>oe&&Fy(e,n,oe,!1);let a=s?ie.TemplateUpdateStart:ie.TemplateCreateStart;se(a,r,t),t(i,r)}finally{gi(o);let a=s?ie.TemplateUpdateEnd:ie.TemplateCreateEnd;se(a,r,t)}}function _h(e,n,t){ix(e,n,t),(t.flags&64)===64&&rx(e,n,t)}function tl(e,n,t=St){let i=n.localNames;if(i!==null){let r=n.index+1;for(let o=0;o<i.length;o+=2){let s=i[o+1],a=s===-1?t(n,e):e[s];e[r++]=a}}}function XS(e,n,t,i){let o=i.get(Zf,$b)||t===rn.ShadowDom||t===rn.ExperimentalIsolatedShadowDom,s=e.selectRootElement(n,o);if(s.tagName.toLowerCase()==="script")throw new D(905,!1);return JS(s),s}function JS(e){By(e)}var By=()=>null;function ex(e){Tb(e)?_y(e):VI(e)}function Vy(){By=ex}function tx(e){return e==="class"?"className":e==="for"?"htmlFor":e==="formaction"?"formAction":e==="innerHtml"?"innerHTML":e==="readonly"?"readOnly":e==="tabindex"?"tabIndex":e}function nx(e,n,t,i,r,o){let s=n[S];if(nl(e,s,n,t,i)){Xt(e)&&Uy(n,e.index);return}e.type&3&&(t=tx(t)),jy(e,n,t,i,r,o)}function jy(e,n,t,i,r,o){if(e.type&3){let s=St(e,n);i=o!=null?o(i,e.value||"",t):i,r.setProperty(s,t,i)}else e.type&12}function Uy(e,n){let t=Vt(n,e);t[F]&16||(t[F]|=64)}function ix(e,n,t){let i=t.directiveStart,r=t.directiveEnd;Xt(t)&&QS(n,t,e.data[i+t.componentOffset]),e.firstCreatePass||kc(t,n);let o=t.initialInputs;for(let s=i;s<r;s++){let a=e.data[s],c=fs(n,e,s,t);if(Yr(c,n),o!==null&&ax(n,s-i,c,a,t,o),xn(a)){let l=Vt(t.index,n);l[Te]=fs(n,e,s,t)}}}function rx(e,n,t){let i=t.directiveStart,r=t.directiveEnd,o=t.index,s=cv();try{gi(o);for(let a=i;a<r;a++){let c=e.data[a],l=n[a];lc(a),(c.hostBindings!==null||c.hostVars!==0||c.hostAttrs!==null)&&ox(c,l)}}finally{gi(-1),lc(s)}}function ox(e,n){e.hostBindings!==null&&e.hostBindings(1,n)}function Hy(e,n){let t=e.directiveRegistry,i=null;if(t)for(let r=0;r<t.length;r++){let o=t[r];Cy(n,o.selectors,!1)&&(i??=[],xn(o)?i.unshift(o):i.push(o))}return i}function sx(e,n,t,i,r,o){let s=St(e,n);$y(n[ce],s,o,e.value,t,i,r)}function $y(e,n,t,i,r,o,s){if(o==null)s?.(o,i||"",r),e.removeAttribute(n,r,t);else{let a=s==null?Qa(o):s(o,i||"",r);e.setAttribute(n,r,a,t)}}function ax(e,n,t,i,r,o){let s=o[n];if(s!==null)for(let a=0;a<s.length;a+=2){let c=s[a],l=s[a+1];Df(i,t,c,l)}}function zy(e,n,t,i,r){let o=oe+t,s=n[S],a=r(s,n,e,i,t);n[o]=a,jr(e,!0);let c=e.type===2;return c?(wy(n[ce],a,e),(Jg()===0||is(e))&&Yr(a,n),ev()):Yr(a,n),pc()&&(!c||!Es(e))&&mh(s,n,a,e),e}function Gy(e){let n=e;return Tu()?Mu():(n=n.parent,jr(n,!1)),n}function wh(e,n){let t=e[vt];if(!t)return;let i;try{i=t.get(Jt,null)}catch{i=null}i?.(n)}function nl(e,n,t,i,r){let o=e.inputs?.[i],s=e.hostDirectiveInputs?.[i],a=!1;if(s)for(let c=0;c<s.length;c+=2){let l=s[c],d=s[c+1],f=n.data[l];Df(f,t[l],d,r),a=!0}if(o)for(let c of o){let l=t[c],d=n.data[c];Df(d,l,i,r),a=!0}return a}function cx(e,n){let t=Vt(n,e),i=t[S];lx(i,t);let r=t[lt];r!==null&&t[dt]===null&&(t[dt]=iy(r,t[vt])),se(ie.ComponentStart);try{Eh(i,t,t[Te])}finally{se(ie.ComponentEnd,t[Te])}}function lx(e,n){for(let t=n.length;t<e.blueprint.length;t++)n.push(e.blueprint[t])}function Eh(e,n,t){uc(n);try{let i=e.viewQuery;i!==null&&ff(1,i,t);let r=e.template;r!==null&&Ly(e,n,r,1,t),e.firstCreatePass&&(e.firstCreatePass=!1),n[Dn]?.finishViewCreation(e),e.staticContentQueries&&ly(e,n),e.staticViewQueries&&ff(2,e.viewQuery,t);let o=e.components;o!==null&&dx(n,o)}catch(i){throw e.firstCreatePass&&(e.incompleteFirstPass=!0,e.firstCreatePass=!1),i}finally{n[F]&=-5,fc()}}function dx(e,n){for(let t=0;t<n.length;t++)cx(e,n[t])}function eo(e,n,t,i){let r=R(null);try{let o=n.tView,a=e[F]&4096?4096:16,c=bh(e,o,t,a,null,n,null,null,i?.injector??null,i?.embeddedViewInjector??null,i?.dehydratedView??null),l=e[n.index];c[pi]=l;let d=e[Dn];return d!==null&&(c[Dn]=d.createEmbeddedView(o)),Eh(o,c,t),c}finally{R(r)}}function er(e,n){return!n||n.firstChild===null||Nc(e)}function ps(e,n,t,i,r=!1){for(;t!==null;){if(t.type===128){t=r?t.projectionNext:t.next;continue}let o=n[t.index];o!==null&&i.push(It(o)),bt(o)&&Wy(o,i);let s=t.type;if(s&8)ps(e,n,t.child,i);else if(s&32){let a=uh(t,n),c;for(;c=a();)i.push(c)}else if(s&16){let a=ky(n,t);if(Array.isArray(a))i.push(...a);else{let c=$n(n[We]);ps(c[S],c,a,i,!0)}}t=r?t.projectionNext:t.next}return i}function Wy(e,n){for(let t=ye;t<e.length;t++){let i=e[t],r=i[S].firstChild;r!==null&&ps(i[S],i,r,n)}e[Sn]!==e[lt]&&n.push(e[Sn])}function qy(e){if(e[zi]!==null){for(let n of e[zi])n.impl.addSequence(n);e[zi].length=0}}var Yy=[];function ux(e){return e[Ct]??fx(e)}function fx(e){let n=Yy.pop()??Object.create(px);return n.lView=e,n}function hx(e){e.lView[Ct]!==e&&(e.lView=null,Yy.push(e))}var px=J(v({},wr),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:e=>{qi(e.lView)},consumerOnSignalRead(){this.lView[Ct]=this}});function mx(e){let n=e[Ct]??Object.create(gx);return n.lView=e,n}var gx=J(v({},wr),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:e=>{let n=$n(e.lView);for(;n&&!Zy(n[S]);)n=$n(n);n&&oc(n)},consumerOnSignalRead(){this.lView[Ct]=this}});function Zy(e){return e.type!==2}function Ky(e){if(e[ui]===null)return;let n=!0;for(;n;){let t=!1;for(let i of e[ui])i.dirty&&(t=!0,i.zone===null||Zone.current===i.zone?i.run():i.zone.run(()=>i.run()));n=t&&!!(e[F]&8192)}}var vx=100;function Qy(e,n=0){let i=e[En].rendererFactory,r=!1;r||i.begin?.();try{bx(e,n)}finally{r||i.end?.()}}function bx(e,n){let t=Au();try{Yo(!0),Cf(e,n);let i=0;for(;rs(e);){if(i===vx)throw new D(103,!1);i++,Cf(e,1)}}finally{Yo(t)}}function yx(e,n,t,i){if(mi(n))return;let r=n[F],o=!1,s=!1;uc(n);let a=!0,c=null,l=null;o||(Zy(e)?(l=ux(n),c=Er(l)):la()===null?(a=!1,l=mx(n),c=Er(l)):n[Ct]&&(Mi(n[Ct]),n[Ct]=null));try{_u(n),ov(e.bindingStartIndex),t!==null&&Ly(e,n,t,2,i);let d=(r&3)===3;if(!o)if(d){let p=e.preOrderCheckHooks;p!==null&&Ec(n,p,null)}else{let p=e.preOrderHooks;p!==null&&Dc(n,p,0,null),Hu(n,0)}if(s||_x(n),Ky(n),Xy(n,0),e.contentQueries!==null&&ly(e,n),!o)if(d){let p=e.contentCheckHooks;p!==null&&Ec(n,p)}else{let p=e.contentHooks;p!==null&&Dc(n,p,1),Hu(n,1)}Ex(e,n);let f=e.components;f!==null&&e_(n,f,0);let h=e.viewQuery;if(h!==null&&ff(2,h,i),!o)if(d){let p=e.viewCheckHooks;p!==null&&Ec(n,p)}else{let p=e.viewHooks;p!==null&&Dc(n,p,2),Hu(n,2)}if(e.firstUpdatePass===!0&&(e.firstUpdatePass=!1),n[ic]){for(let p of n[ic])p();n[ic]=null}o||(qy(n),n[F]&=-73)}catch(d){throw o||qi(n),d}finally{l!==null&&(Fo(l,c),a&&hx(l)),fc()}}function Xy(e,n){for(let t=Rb(e);t!==null;t=kb(t))for(let i=ye;i<t.length;i++){let r=t[i];Jy(r,n)}}function _x(e){for(let n=Rb(e);n!==null;n=kb(n)){if(!(n[F]&2))continue;let t=n[Gi];for(let i=0;i<t.length;i++){let r=t[i];oc(r)}}}function wx(e,n,t){se(ie.ComponentStart);let i=Vt(n,e);try{Jy(i,t)}finally{se(ie.ComponentEnd,i[Te])}}function Jy(e,n){rc(e)&&Cf(e,n)}function Cf(e,n){let i=e[S],r=e[F],o=e[Ct],s=!!(n===0&&r&16);if(s||=!!(r&64&&n===0),s||=!!(r&1024),s||=!!(o?.dirty&&Lo(o)),s||=!1,o&&(o.dirty=!1),e[F]&=-9217,s)yx(i,e,i.template,e[Te]);else if(r&8192){let a=R(null);try{Ky(e),Xy(e,1);let c=i.components;c!==null&&e_(e,c,1),qy(e)}finally{R(a)}}}function e_(e,n,t){for(let i=0;i<n.length;i++)wx(e,n[i],t)}function Ex(e,n){let t=e.hostBindingOpCodes;if(t!==null)try{for(let i=0;i<t.length;i++){let r=t[i];if(r<0)gi(~r);else{let o=r,s=t[++i],a=t[++i];av(s,o);let c=n[o];se(ie.HostBindingsUpdateStart,c);try{a(2,c)}finally{se(ie.HostBindingsUpdateEnd,c)}}}}finally{gi(-1)}}function Dh(e,n){let t=Au()?64:1088;for(e[En].changeDetectionScheduler?.notify(n);e;){e[F]|=t;let i=$n(e);if(Wi(e)&&!i)return e;e=i}return null}function t_(e,n,t,i){return[e,!0,0,n,null,i,null,t,null,null]}function n_(e,n){let t=ye+n;if(t<e.length)return e[t]}function to(e,n,t,i=!0){let r=n[S];if(Dx(r,n,e,t),i){let s=Ef(t,e),a=n[ce],c=a.parentNode(e[Sn]);c!==null&&VS(r,e[Xe],a,n,c,s)}let o=n[dt];o!==null&&o.firstChild!==null&&(o.firstChild=null)}function Ch(e,n){let t=ms(e,n);return t!==void 0&&Xc(t[S],t),t}function ms(e,n){if(e.length<=ye)return;let t=ye+n,i=e[t];if(i){let r=i[pi];r!==null&&r!==e&&ph(r,i),n>0&&(e[t-1][Lt]=i[Lt]);let o=Jo(e,ye+n);BS(i[S],i);let s=o[Dn];s!==null&&s.detachView(o[S]),i[xe]=null,i[Lt]=null,i[F]&=-129}return i}function Dx(e,n,t,i){let r=ye+i,o=t.length;i>0&&(t[r-1][Lt]=n),i<o-ye?(n[Lt]=t[r],lu(t,ye+i,n)):(t.push(n),n[Lt]=null),n[xe]=t;let s=n[pi];s!==null&&t!==s&&i_(s,n);let a=n[Dn];a!==null&&a.insertView(e),sc(n),n[F]|=128}function i_(e,n){let t=e[Gi],i=n[xe];if(Bt(i))e[F]|=2;else{let r=i[xe][We];n[We]!==r&&(e[F]|=2)}t===null?e[Gi]=[n]:t.push(n)}var _i=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=!1;exhaustive;get rootNodes(){let n=this._lView,t=n[S];return ps(t,n,t.firstChild,[])}constructor(n,t){this._lView=n,this._cdRefInjectingView=t}get context(){return this._lView[Te]}set context(n){this._lView[Te]=n}get destroyed(){return mi(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let n=this._lView[xe];if(bt(n)){let t=n[ns],i=t?t.indexOf(this):-1;i>-1&&(ms(n,i),Jo(t,i))}this._attachedToViewContainer=!1}Xc(this._lView[S],this._lView)}onDestroy(n){ac(this._lView,n)}markForCheck(){Dh(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[F]&=-129}reattach(){sc(this._lView),this._lView[F]|=128}detectChanges(){this._lView[F]|=1024,Qy(this._lView)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new D(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let n=Wi(this._lView),t=this._lView[pi];t!==null&&!n&&ph(t,this._lView),My(this._lView[S],this._lView)}attachToAppRef(n){if(this._attachedToViewContainer)throw new D(902,!1);this._appRef=n;let t=Wi(this._lView),i=this._lView[pi];i!==null&&!t&&i_(i,this._lView),sc(this._lView)}};var He=(()=>{class e{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=Cx;constructor(t,i,r){this._declarationLView=t,this._declarationTContainer=i,this.elementRef=r}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(t,i){return this.createEmbeddedViewImpl(t,i)}createEmbeddedViewImpl(t,i,r){let o=eo(this._declarationLView,this._declarationTContainer,t,{embeddedViewInjector:i,dehydratedView:r});return new _i(o)}}return e})();function Cx(){return Ih(qe(),B())}function Ih(e,n){return e.type&4?new He(n,e,Xr(e,n)):null}function no(e,n,t,i,r){let o=e.data[n];if(o===null)o=Ix(e,n,t,i,r),sv()&&(o.flags|=32);else if(o.type&64){o.type=t,o.value=i,o.attrs=r;let s=nv();o.injectorIndex=s===null?-1:s.injectorIndex}return jr(o,!0),o}function Ix(e,n,t,i,r){let o=xu(),s=Tu(),a=s?o:o&&o.parent,c=e.data[n]=xx(e,a,t,n,i,r);return Sx(e,c,o,s),c}function Sx(e,n,t,i){e.firstChild===null&&(e.firstChild=n),t!==null&&(i?t.child==null&&n.parent!==null&&(t.child=n):t.next===null&&(t.next=n,n.prev=t))}function xx(e,n,t,i,r,o){let s=n?n.injectorIndex:-1,a=0;return cc()&&(a|=128),{type:t,index:i,insertBeforeIndex:null,injectorIndex:s,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,controlDirectiveIndex:-1,customControlIndex:-1,propertyBindings:null,flags:a,providerIndexes:0,value:r,namespace:hc(),attrs:o,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:n,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}var Tx=new RegExp(`^(\\d+)*(${Pb}|${Ob})*(.*)`);function Mx(e){let n=e.match(Tx),[t,i,r,o]=n,s=i?parseInt(i,10):r,a=[];for(let[c,l,d]of o.matchAll(/(f|n)(\d*)/g)){let f=parseInt(d,10)||1;a.push(l,f)}return[s,...a]}function Ax(e){return!e.prev&&e.parent?.type===8}function Wu(e){return e.index-oe}function Rx(e,n){let t=e.i18nNodes;if(t)return t.get(n)}function il(e,n,t,i){let r=Wu(i),o=Rx(e,r);if(o===void 0){let s=e.data[Vb];if(s?.[r])o=Nx(s[r],t);else if(n.firstChild===i)o=e.firstChild;else{let a=i.prev===null,c=i.prev??i.parent;if(Ax(i)){let l=Wu(i.parent);o=uf(e,l)}else{let l=St(c,t);if(a)o=l.firstChild;else{let d=Wu(c),f=uf(e,d);if(c.type===2&&f){let p=th(e,d)+1;o=rl(p,f)}else o=l.nextSibling}}}}return o}function rl(e,n){let t=n;for(let i=0;i<e;i++)t=t.nextSibling;return t}function kx(e,n){let t=e;for(let i=0;i<n.length;i+=2){let r=n[i],o=n[i+1];for(let s=0;s<o;s++)switch(r){case RI:t=t.firstChild;break;case kI:t=t.nextSibling;break}}return t}function Nx(e,n){let[t,...i]=Mx(e),r;if(t===Ob)r=n[We][lt];else if(t===Pb)r=Ey(n[We][lt]);else{let o=Number(t);r=It(n[o+oe])}return kx(r,i)}var Ox=!1;function r_(e){Ox=e}function Px(e){let n=e[dt];if(n){let{i18nNodes:t,dehydratedIcuData:i}=n;if(t&&i){let r=e[ce];for(let o of i.values())Fx(r,t,o)}n.i18nNodes=void 0,n.dehydratedIcuData=void 0}}function Fx(e,n,t){for(let i of t.node.cases[t.case]){let r=n.get(i.index-oe);r&&lh(e,r,!1)}}function ol(e){let n=e[Qt]??[],i=e[xe][ce],r=[];for(let o of n)o.data[jb]!==void 0?r.push(o):o_(o,i);e[Qt]=r}function Lx(e){let{lContainer:n}=e,t=n[Qt];if(t===null)return;let r=n[xe][ce];for(let o of t)o_(o,r)}function o_(e,n){let t=0,i=e.firstChild;if(i){let r=e.data[hs];for(;t<r;){let o=i.nextSibling;lh(n,i,!1),i=o,t++}}}function sl(e){ol(e);let n=e[lt];Bt(n)&&Fc(n);for(let t=ye;t<e.length;t++)Fc(e[t])}function Fc(e){Px(e);let n=e[S];for(let t=oe;t<n.bindingStartIndex;t++)if(bt(e[t])){let i=e[t];sl(i)}else Bt(e[t])&&Fc(e[t])}function Sh(e){let n=e._views;for(let t of n){let i=ry(t);i!==null&&i[lt]!==null&&(Bt(i)?Fc(i):sl(i))}}function Bx(e,n,t,i){e!==null&&(t.cleanup(n),sl(e.lContainer),Sh(i))}function Vx(e,n){let t=[];for(let i of n)for(let r=0;r<(i[qf]??1);r++){let o={data:i,firstChild:null};i[hs]>0&&(o.firstChild=e,e=rl(i[hs],e)),t.push(o)}return[e,t]}var s_=()=>null,a_=()=>null;function c_(){s_=jx,a_=Ux}function jx(e,n){return d_(e,n)?e[Qt].shift():(ol(e),null)}function gs(e,n){return s_(e,n)}function Ux(e,n,t){if(n.tView.ssrId===null)return null;let i=gs(e,n.tView.ssrId);return t[S].firstUpdatePass&&i===null&&Hx(t,n),i}function l_(e,n,t){return a_(e,n,t)}function Hx(e,n){let t=n;for(;t;){if(Uv(e,t))return;if((t.flags&256)===256)break;t=t.prev}for(t=n.next;t&&(t.flags&512)===512;){if(Uv(e,t))return;t=t.next}}function d_(e,n){let t=e[Qt];return!n||t===null||t.length===0?!1:t[0].data[Bb]===n}function Uv(e,n){let t=n.tView?.ssrId;if(t==null)return!1;let i=e[n.index];return bt(i)&&d_(i,t)?(ol(i),!0):!1}var u_=class{},$e=class{},yt=(()=>{class e{destroyNode=null;static __NG_ELEMENT_ID__=()=>$x()}return e})();function $x(){let e=B(),n=qe(),t=Vt(n.index,e);return(Bt(t)?t:e)[ce]}var f_=(()=>{class e{static \u0275prov=G({token:e,providedIn:"root",factory:()=>null})}return e})();function h_(e){return e.debugInfo?.className||e.type.name||null}var Sc={},Xi=class{injector;parentInjector;constructor(n,t){this.injector=n,this.parentInjector=t}get(n,t,i){let r=this.injector.get(n,Sc,i);return r!==Sc||t===Sc?r:this.parentInjector.get(n,t,i)}};function xh(e){return e!==null&&(typeof e=="function"||typeof e=="object")}function zx(e,n,t){return e[n]=t}function sn(e,n,t){if(t===Rt)return!1;let i=e[n];return Object.is(i,t)?!1:(e[n]=t,!0)}function qu(e,n,t){return function i(r){let o=i.__ngNativeEl__;o!==void 0&&NI(r,o);let s=Xt(e)?Vt(e.index,n):n;Dh(s,5);let a=n[Te],c=Hv(n,a,t,r),l=i.__ngNextListenerFn__;for(;l;)c=Hv(n,a,l,r)&&c,l=l.__ngNextListenerFn__;return c}}function Hv(e,n,t,i){let r=R(null);try{return se(ie.OutputStart,n,t),t(i)!==!1}catch(o){return wh(e,o),!1}finally{se(ie.OutputEnd,n,t),R(r)}}function Gx(e,n,t,i,r,o,s,a){let c=is(e),l=!1,d=null;if(!i&&c&&(d=qx(n,t,o,e.index)),d!==null){let f=d.__ngLastListenerFn__||d;f.__ngNextListenerFn__=s,d.__ngLastListenerFn__=s,l=!0}else{let f=St(e,t),h=i?i(f):f;OI(t,h,o,a),i||(a.__ngNativeEl__=f);let p=r.listen(h,o,a);if(!Wx(o)){let m=i?y=>i(It(y[e.index])):e.index;p_(m,n,t,o,a,p,!1)}}return l}function Wx(e){return e.startsWith("animation")||e.startsWith("transition")}function qx(e,n,t,i){let r=e.cleanup;if(r!=null)for(let o=0;o<r.length-1;o+=2){let s=r[o];if(s===t&&r[o+1]===i){let a=n[Lr],c=r[o+2];return a&&a.length>c?a[c]:null}typeof s=="string"&&(o+=2)}return null}function p_(e,n,t,i,r,o,s){let a=n.firstCreatePass?Eu(n):null,c=wu(t),l=c.length;c.push(r,o),a&&a.push(i,e,l,(l+1)*(s?-1:1))}function $v(e,n,t,i,r,o){let s=n[t],a=n[S],l=a.data[t].outputs[i],f=s[l].subscribe(o);p_(e.index,a,n,r,o,f,!0)}var If=Symbol("BINDING");var ir=new g("");function Lc(e,n,t){let i=t?e.styles:null,r=t?e.classes:null,o=0;if(n!==null)for(let s=0;s<n.length;s++){let a=n[s];if(typeof a=="number")o=a;else if(o==1)r=qa(r,a);else if(o==2){let c=a,l=n[++s];i=qa(i,c+": "+l+";")}}t?e.styles=i:e.stylesWithoutHost=i,t?e.classes=r:e.classesWithoutHost=r}function rr(e,n=0){let t=B();if(t===null)return P(e,n);let i=qe();return Db(i,t,Ge(e),n)}function m_(e,n,t,i,r){let o=i===null?null:{"":-1},s=r(e,t);if(s!==null){let a=s,c=null,l=null;for(let d of s)if(d.resolveHostDirectives!==null){[a,c,l]=d.resolveHostDirectives(s);break}Kx(e,n,t,a,o,c,l)}o!==null&&i!==null&&Yx(t,i,o)}function Yx(e,n,t){let i=e.localNames=[];for(let r=0;r<n.length;r+=2){let o=t[n[r+1]];if(o==null)throw new D(-301,!1);i.push(n[r],o)}}function Zx(e,n,t){n.componentOffset=t,(e.components??=[]).push(n.index)}function Kx(e,n,t,i,r,o,s){let a=i.length,c=null;for(let h=0;h<a;h++){let p=i[h];c===null&&xn(p)&&(c=p,Zx(e,t,h)),of(kc(t,n),e,p.type)}nT(t,e.data.length,a),c?.viewProvidersResolver&&c.viewProvidersResolver(c);for(let h=0;h<a;h++){let p=i[h];p.providersResolver&&p.providersResolver(p)}let l=!1,d=!1,f=Py(e,n,a,null);a>0&&(t.directiveToIndex=new Map);for(let h=0;h<a;h++){let p=i[h];if(t.mergedAttrs=qr(t.mergedAttrs,p.hostAttrs),Xx(e,t,n,f,p),tT(f,p,r),s!==null&&s.has(p)){let[y,E]=s.get(p);t.directiveToIndex.set(p.type,[f,y+t.directiveStart,E+t.directiveStart])}else(o===null||!o.has(p))&&t.directiveToIndex.set(p.type,f);p.contentQueries!==null&&(t.flags|=4),(p.hostBindings!==null||p.hostAttrs!==null||p.hostVars!==0)&&(t.flags|=64);let m=p.type.prototype;!l&&(m.ngOnChanges||m.ngOnInit||m.ngDoCheck)&&((e.preOrderHooks??=[]).push(t.index),l=!0),!d&&(m.ngOnChanges||m.ngDoCheck)&&((e.preOrderCheckHooks??=[]).push(t.index),d=!0),f++}Qx(e,t,o)}function Qx(e,n,t){for(let i=n.directiveStart;i<n.directiveEnd;i++){let r=e.data[i];if(t===null||!t.has(r))zv(0,n,r,i),zv(1,n,r,i),Wv(n,i,!1);else{let o=t.get(r);Gv(0,n,o,i),Gv(1,n,o,i),Wv(n,i,!0)}}}function zv(e,n,t,i){let r=e===0?t.inputs:t.outputs;for(let o in r)if(r.hasOwnProperty(o)){let s;e===0?s=n.inputs??={}:s=n.outputs??={},s[o]??=[],s[o].push(i),g_(n,o)}}function Gv(e,n,t,i){let r=e===0?t.inputs:t.outputs;for(let o in r)if(r.hasOwnProperty(o)){let s=r[o],a;e===0?a=n.hostDirectiveInputs??={}:a=n.hostDirectiveOutputs??={},a[s]??=[],a[s].push(i,o),g_(n,s)}}function g_(e,n){n==="class"?e.flags|=8:n==="style"&&(e.flags|=16)}function Wv(e,n,t){let{attrs:i,inputs:r,hostDirectiveInputs:o}=e;if(i===null||!t&&r===null||t&&o===null||dh(e)){e.initialInputs??=[],e.initialInputs.push(null);return}let s=null,a=0;for(;a<i.length;){let c=i[a];if(c===0){a+=4;continue}else if(c===5){a+=2;continue}else if(typeof c=="number")break;if(!t&&r.hasOwnProperty(c)){let l=r[c];for(let d of l)if(d===n){s??=[],s.push(c,i[a+1]);break}}else if(t&&o.hasOwnProperty(c)){let l=o[c];for(let d=0;d<l.length;d+=2)if(l[d]===n){s??=[],s.push(l[d+1],i[a+1]);break}}a+=2}e.initialInputs??=[],e.initialInputs.push(s)}function Xx(e,n,t,i,r){e.data[i]=r;let o=r.factory||(r.factory=di(r.type,!0)),s=new Ji(o,xn(r),rr,null);e.blueprint[i]=s,t[i]=s,Jx(e,n,i,Py(e,t,r.hostVars,Rt),r)}function Jx(e,n,t,i,r){let o=r.hostBindings;if(o){let s=e.hostBindingOpCodes;s===null&&(s=e.hostBindingOpCodes=[]);let a=~n.index;eT(s)!=a&&s.push(a),s.push(t,i,o)}}function eT(e){let n=e.length;for(;n>0;){let t=e[--n];if(typeof t=="number"&&t<0)return t}return 0}function tT(e,n,t){if(t){if(n.exportAs)for(let i=0;i<n.exportAs.length;i++)t[n.exportAs[i]]=e;xn(n)&&(t[""]=e)}}function nT(e,n,t){e.flags|=1,e.directiveStart=n,e.directiveEnd=n+t,e.providerIndexes=n}function v_(e,n,t,i,r,o,s,a){let c=n[S],l=c.consts,d=xt(l,s),f=no(c,e,t,i,d);return o&&m_(c,n,f,xt(l,a),r),f.mergedAttrs=qr(f.mergedAttrs,f.attrs),f.attrs!==null&&Lc(f,f.attrs,!1),f.mergedAttrs!==null&&Lc(f,f.mergedAttrs,!0),c.queries!==null&&c.queries.elementStart(c,f),f}function b_(e,n){pb(e,n),mu(n)&&e.queries.elementEnd(n)}function iT(e,n,t,i,r,o){let s=n.consts,a=xt(s,r),c=no(n,e,t,i,a);if(c.mergedAttrs=qr(c.mergedAttrs,c.attrs),o!=null){let l=xt(s,o);c.localNames=[];for(let d=0;d<l.length;d+=2)c.localNames.push(l[d],-1)}return c.attrs!==null&&Lc(c,c.attrs,!1),c.mergedAttrs!==null&&Lc(c,c.mergedAttrs,!0),n.queries!==null&&n.queries.elementStart(n,c),c}var y_=typeof ShadowRoot<"u",rT=typeof Document<"u";function oT(e){return Object.keys(e).map(n=>{let[t,i,r]=e[n],o={propName:t,templateName:n,isSignal:(i&el.SignalBased)!==0};return r&&(o.transform=r),o})}function sT(e){return Object.keys(e).map(n=>({propName:e[n],templateName:n}))}function aT(e,n,t){let i=n instanceof ue?n:n?.injector;return i&&e.getStandaloneInjector!==null&&(i=e.getStandaloneInjector(i)||i),i?new Xi(t,i):t}function cT(e){let n=e.get($e,null);if(n===null)throw new D(407,!1);let t=e.get(f_,null),i=e.get(_n,null),r=e.get(ni,null,{optional:!0});return{rendererFactory:n,sanitizer:t,changeDetectionScheduler:i,ngReflect:!1,tracingService:r}}function lT(e,n){let t=__(e);return ch(n,t,t==="svg"?gu:t==="math"?qg:null)}function __(e){return(e.selectors[0][0]||"div").toLowerCase()}var Zr=class{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=oT(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=sT(this.componentDef.outputs),this.cachedOutputs}constructor(n,t){this.componentDef=n,this.ngModule=t,this.componentType=n.type,this.selector=CS(n.selectors),this.ngContentSelectors=n.ngContentSelectors??[],this.isBoundToModule=!!t}create(n,t,i,r,o,s){se(ie.DynamicComponentStart);let a=R(null);try{let c=this.componentDef,l=aT(c,r||this.ngModule,n),d=cT(l),f=d.tracingService;return f&&f.componentCreate?f.componentCreate(h_(c),()=>this.createComponentRef(d,l,t,i,o,s)):this.createComponentRef(d,l,t,i,o,s)}finally{R(a)}}createComponentRef(n,t,i,r,o,s){let a=this.componentDef,c=dT(r,a,s,o),l=n.rendererFactory.createRenderer(null,a),d=r?XS(l,r,a.encapsulation,t):lT(a,l),f=t.get(ir,null),h=uT(d,()=>t.get(O,null)??Wf());f&&f.addHost(h);let p=s?.some(qv)||o?.some(E=>typeof E!="function"&&E.bindings.some(qv)),m=bh(null,c,null,512|Oy(a),null,null,n,l,t,null,iy(d,t,!0));f&&y_&&h instanceof ShadowRoot&&ac(m,()=>{f.removeHost(h)}),m[oe]=d,uc(m);let y=null;try{let E=v_(oe,m,2,"#host",()=>c.directiveRegistry,!0,0);wy(l,d,E),Yr(d,m),_h(c,m,E),dy(c,E,m),b_(c,E),i!==void 0&&hT(E,this.ngContentSelectors,i),y=Vt(E.index,m),m[Te]=y[Te],Eh(c,m,null)}catch(E){throw y!==null&&af(y),af(m),E}finally{se(ie.DynamicComponentEnd),fc()}return new Bc(this.componentType,m,!!p)}};function dT(e,n,t,i){let r=e?["ng-version","22.0.2"]:IS(n.selectors[0]),o=null,s=null,a=0;if(t)for(let d of t)a+=d[If].requiredVars,d.create&&(d.targetIdx=0,(o??=[]).push(d)),d.update&&(d.targetIdx=0,(s??=[]).push(d));if(i)for(let d=0;d<i.length;d++){let f=i[d];if(typeof f!="function")for(let h of f.bindings){a+=h[If].requiredVars;let p=d+1;h.create&&(h.targetIdx=p,(o??=[]).push(h)),h.update&&(h.targetIdx=p,(s??=[]).push(h))}}let c=[n];if(i)for(let d of i){let f=typeof d=="function"?d:d.type,h=Za(f);c.push(h)}return vh(0,null,fT(o,s),1,a,c,null,null,null,[r],null)}function uT(e,n){let t=e.getRootNode?.();return rT&&t instanceof Document?t.head:t&&y_&&t instanceof ShadowRoot?t:n().head}function fT(e,n){return!e&&!n?null:t=>{if(t&1&&e)for(let i of e)i.create();if(t&2&&n)for(let i of n)i.update()}}function qv(e){let n=e[If].kind;return n==="input"||n==="twoWay"}var Bc=class extends u_{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(n,t,i){super(),this._rootLView=t,this._hasInputBindings=i,this._tNode=Vr(t[S],oe),this.location=Xr(this._tNode,t),this.instance=Vt(this._tNode.index,t)[Te],this.hostView=this.changeDetectorRef=new _i(t,void 0),this.componentType=n}setInput(n,t){this._hasInputBindings;let i=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(n)&&Object.is(this.previousInputValues.get(n),t))return;let r=this._rootLView,o=nl(i,r[S],r,n,t);this.previousInputValues.set(n,t);let s=Vt(i.index,r);Dh(s,1)}get injector(){return new bi(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(n){this.hostView.onDestroy(n)}};function hT(e,n,t){let i=e.projection=[];for(let r=0;r<n.length;r++){let o=t[r];i.push(o!=null&&o.length?Array.from(o):null)}}var Je=(()=>{class e{static __NG_ELEMENT_ID__=pT}return e})();function pT(){let e=qe();return w_(e,B())}var Sf=class e extends Je{_lContainer;_hostTNode;_hostLView;constructor(n,t,i){super(),this._lContainer=n,this._hostTNode=t,this._hostLView=i}get element(){return Xr(this._hostTNode,this._hostLView)}get injector(){return new bi(this._hostTNode,this._hostLView)}get parentInjector(){let n=Hf(this._hostTNode,this._hostLView);if(vb(n)){let t=Ac(n,this._hostLView),i=Mc(n),r=t[S].data[i+8];return new bi(r,t)}else return new bi(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(n){let t=Yv(this._lContainer);return t!==null&&t[n]||null}get length(){return this._lContainer.length-ye}createEmbeddedView(n,t,i){let r,o;typeof i=="number"?r=i:i!=null&&(r=i.index,o=i.injector);let s=gs(this._lContainer,n.ssrId),a=n.createEmbeddedViewImpl(t||{},o,s);return this.insertImpl(a,r,er(this._hostTNode,s)),a}createComponent(n,t,i,r,o,s,a){let c,l=t||{};c=l.index,i=l.injector,r=l.projectableNodes,o=l.environmentInjector||l.ngModuleRef,s=l.directives,a=l.bindings;let d=new Zr(Wn(n)),f=i||this.parentInjector;if(!o&&d.ngModule==null){let T=this.parentInjector.get(ue,null);T&&(o=T)}let h=Wn(d.componentType??{}),p=gs(this._lContainer,h?.id??null),m=p?.firstChild??null,y=d.create(f,r,m,o,s,a);return this.insertImpl(y.hostView,c,er(this._hostTNode,p)),y}insert(n,t){return this.insertImpl(n,t,!0)}insertImpl(n,t,i){let r=n._lView;if(Zg(r)){let a=this.indexOf(n);if(a!==-1)this.detach(a);else{let c=r[xe],l=new e(c,c[Xe],c[xe]);l.detach(l.indexOf(n))}}let o=this._adjustIndex(t),s=this._lContainer;return to(s,r,o,i),n.attachToViewContainerRef(),lu(Yu(s),o,n),n}move(n,t){return this.insert(n,t)}indexOf(n){let t=Yv(this._lContainer);return t!==null?t.indexOf(n):-1}remove(n){let t=this._adjustIndex(n,-1),i=ms(this._lContainer,t);i&&(Jo(Yu(this._lContainer),t),Xc(i[S],i))}detach(n){let t=this._adjustIndex(n,-1),i=ms(this._lContainer,t);return i&&Jo(Yu(this._lContainer),t)!=null?new _i(i):null}_adjustIndex(n,t=0){return n??this.length+t}};function Yv(e){return e[ns]}function Yu(e){return e[ns]||(e[ns]=[])}function w_(e,n){let t,i=n[e.index];return bt(i)?t=i:(t=t_(i,n,null,e),n[e.index]=t,yh(n,t)),E_(t,n,e,i),new Sf(t,e,n)}function mT(e,n){let t=e[ce],i=t.createComment(""),r=St(n,e),o=t.parentNode(r);return Oc(t,o,i,t.nextSibling(r),!1),i}var E_=D_,Th=()=>!1;function gT(e,n,t){return Th(e,n,t)}function D_(e,n,t,i){if(e[Sn])return;let r;t.type&8?r=It(i):r=mT(n,t),e[Sn]=r}function vT(e,n,t){if(e[Sn]&&e[Qt])return!0;let i=t[dt],r=n.index-oe;if(!i||Mb(n)||ay(i,r))return!1;let s=uf(i,r),a=i.data[Gc]?.[r];if(a===void 0)return!1;let[c,l]=Vx(s,a);return e[Sn]=c,e[Qt]=l,!0}function bT(e,n,t,i){Th(e,t,n)||D_(e,n,t,i)}function C_(){E_=bT,Th=vT}var xf=class e{queryList;matches=null;constructor(n){this.queryList=n}clone(){return new e(this.queryList)}setDirty(){this.queryList.setDirty()}},Tf=class e{queries;constructor(n=[]){this.queries=n}createEmbeddedView(n){let t=n.queries;if(t!==null){let i=n.contentQueries!==null?n.contentQueries[0]:t.length,r=[];for(let o=0;o<i;o++){let s=t.getByIndex(o),a=this.queries[s.indexInDeclarationView];r.push(a.clone())}return new e(r)}return null}insertView(n){this.dirtyQueriesWithMatches(n)}detachView(n){this.dirtyQueriesWithMatches(n)}finishViewCreation(n){this.dirtyQueriesWithMatches(n)}dirtyQueriesWithMatches(n){for(let t=0;t<this.queries.length;t++)Mh(n,t).matches!==null&&this.queries[t].setDirty()}},Vc=class{flags;read;predicate;constructor(n,t,i=null){this.flags=t,this.read=i,typeof n=="string"?this.predicate=ST(n):this.predicate=n}},Mf=class e{queries;constructor(n=[]){this.queries=n}elementStart(n,t){for(let i=0;i<this.queries.length;i++)this.queries[i].elementStart(n,t)}elementEnd(n){for(let t=0;t<this.queries.length;t++)this.queries[t].elementEnd(n)}embeddedTView(n){let t=null;for(let i=0;i<this.length;i++){let r=t!==null?t.length:0,o=this.getByIndex(i).embeddedTView(n,r);o&&(o.indexInDeclarationView=i,t!==null?t.push(o):t=[o])}return t!==null?new e(t):null}template(n,t){for(let i=0;i<this.queries.length;i++)this.queries[i].template(n,t)}getByIndex(n){return this.queries[n]}get length(){return this.queries.length}track(n){this.queries.push(n)}},Af=class e{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(n,t=-1){this.metadata=n,this._declarationNodeIndex=t}elementStart(n,t){this.isApplyingToNode(t)&&this.matchTNode(n,t)}elementEnd(n){this._declarationNodeIndex===n.index&&(this._appliesToNextNode=!1)}template(n,t){this.elementStart(n,t)}embeddedTView(n,t){return this.isApplyingToNode(n)?(this.crossesNgTemplate=!0,this.addMatch(-n.index,t),new e(this.metadata)):null}isApplyingToNode(n){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let t=this._declarationNodeIndex,i=n.parent;for(;i!==null&&i.type&8&&i.index!==t;)i=i.parent;return t===(i!==null?i.index:-1)}return this._appliesToNextNode}matchTNode(n,t){let i=this.metadata.predicate;if(Array.isArray(i))for(let r=0;r<i.length;r++){let o=i[r];this.matchTNodeWithReadOption(n,t,yT(t,o)),this.matchTNodeWithReadOption(n,t,Cc(t,n,o,!1,!1))}else i===He?t.type&4&&this.matchTNodeWithReadOption(n,t,-1):this.matchTNodeWithReadOption(n,t,Cc(t,n,i,!1,!1))}matchTNodeWithReadOption(n,t,i){if(i!==null){let r=this.metadata.read;if(r!==null)if(r===Y||r===Je||r===He&&t.type&4)this.addMatch(t.index,-2);else{let o=Cc(t,n,r,!1,!1);o!==null&&this.addMatch(t.index,o)}else this.addMatch(t.index,i)}}addMatch(n,t){this.matches===null?this.matches=[n,t]:this.matches.push(n,t)}};function yT(e,n){let t=e.localNames;if(t!==null){for(let i=0;i<t.length;i+=2)if(t[i]===n)return t[i+1]}return null}function _T(e,n){return e.type&11?Xr(e,n):e.type&4?Ih(e,n):null}function wT(e,n,t,i){return t===-1?_T(n,e):t===-2?ET(e,n,i):fs(e,e[S],t,n)}function ET(e,n,t){if(t===Y)return Xr(n,e);if(t===He)return Ih(n,e);if(t===Je)return w_(n,e)}function I_(e,n,t,i){let r=n[Dn].queries[i];if(r.matches===null){let o=e.data,s=t.matches,a=[];for(let c=0;s!==null&&c<s.length;c+=2){let l=s[c];if(l<0)a.push(null);else{let d=o[l];a.push(wT(n,d,s[c+1],t.metadata.read))}}r.matches=a}return r.matches}function Rf(e,n,t,i){let r=e.queries.getByIndex(t),o=r.matches;if(o!==null){let s=I_(e,n,r,t);for(let a=0;a<o.length;a+=2){let c=o[a];if(c>0)i.push(s[a/2]);else{let l=o[a+1],d=n[-c];for(let f=ye;f<d.length;f++){let h=d[f];h[pi]===h[xe]&&Rf(h[S],h,l,i)}if(d[Gi]!==null){let f=d[Gi];for(let h=0;h<f.length;h++){let p=f[h];Rf(p[S],p,l,i)}}}}}return i}function DT(e,n){return e[Dn].queries[n].queryList}function S_(e,n,t){let i=new nn((t&4)===4);return Xg(e,n,i,i.destroy),(n[Dn]??=new Tf).queries.push(new xf(i))-1}function CT(e,n,t){let i=De();return i.firstCreatePass&&(x_(i,new Vc(e,n,t),-1),(n&2)===2&&(i.staticViewQueries=!0)),S_(i,B(),n)}function IT(e,n,t,i){let r=De();if(r.firstCreatePass){let o=qe();x_(r,new Vc(n,t,i),o.index),xT(r,e),(t&2)===2&&(r.staticContentQueries=!0)}return S_(r,B(),t)}function ST(e){return e.split(",").map(n=>n.trim())}function x_(e,n,t){e.queries===null&&(e.queries=new Mf),e.queries.track(new Af(n,t))}function xT(e,n){let t=e.contentQueries||(e.contentQueries=[]),i=t.length?t[t.length-1]:-1;n!==i&&t.push(e.queries.length-1,n)}function Mh(e,n){return e.queries.getByIndex(n)}function TT(e,n){let t=e[S],i=Mh(t,n);return i.crossesNgTemplate?Rf(t,e,n,[]):I_(t,e,i,n)}function io(e){return!!e&&typeof e.then=="function"}function T_(e){return!!e&&typeof e.subscribe=="function"}var Jn=class{},al=class{};var jc=class extends Jn{ngModuleType;_parent;_bootstrapComponents=[];_r3Injector;instance;destroyCbs=[];constructor(n,t,i,r=!0){super(),this.ngModuleType=n,this._parent=t;let o=kg(n);this._bootstrapComponents=hS(o.bootstrap),this._r3Injector=Pu(n,t,[{provide:Jn,useValue:this},...i],Qo(n),new Set(["environment"])),r&&this.resolveInjectorInitializers()}resolveInjectorInitializers(){this._r3Injector.resolveInjectorInitializers(),this.instance=this._r3Injector.get(this.ngModuleType)}get injector(){return this._r3Injector}destroy(){let n=this._r3Injector;!n.destroyed&&n.destroy(),this.destroyCbs.forEach(t=>t()),this.destroyCbs=null}onDestroy(n){this.destroyCbs.push(n)}},Uc=class extends al{moduleType;constructor(n){super(),this.moduleType=n}create(n){return new jc(this.moduleType,n,[])}};var vs=class extends Jn{injector;instance=null;constructor(n){super();let t=new Ui([...n.providers,{provide:Jn,useValue:this}],n.parent||Fr(),n.debugName,new Set(["environment"]));this.injector=t,n.runEnvironmentInitializers&&t.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(n){this.injector.onDestroy(n)}};function ro(e,n,t=null){return new vs({providers:e,parent:n,debugName:t,runEnvironmentInitializers:!0}).injector}var MT=(()=>{class e{_injector;cachedInjectors=new Map;constructor(t){this._injector=t}getOrCreateStandaloneInjector(t){if(!t.standalone)return null;if(!this.cachedInjectors.has(t)){let i=nc(!1,t.type),r=i.length>0?ro([i],this._injector,""):null;this.cachedInjectors.set(t,r)}return this.cachedInjectors.get(t)}ngOnDestroy(){try{for(let t of this.cachedInjectors.values())t!==null&&t.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=G({token:e,providedIn:"environment",factory:()=>new e(P(ue))})}return e})();function Z(e){return ys(()=>{let n=M_(e),t=J(v({},n),{decls:e.decls,vars:e.vars,template:e.template,consts:e.consts||null,ngContentSelectors:e.ngContentSelectors,onPush:e.changeDetection!==zf.Eager,directiveDefs:null,pipeDefs:null,dependencies:n.standalone&&e.dependencies||null,getStandaloneInjector:n.standalone?r=>r.get(MT).getOrCreateStandaloneInjector(t):null,getExternalStyles:null,signals:e.signals??!1,data:e.data||{},encapsulation:e.encapsulation||rn.Emulated,styles:e.styles||ct,_:null,schemas:e.schemas||null,tView:null,id:""});n.standalone&&jt("NgStandalone"),A_(t);let i=e.dependencies;return t.directiveDefs=Zv(i,AT),t.pipeDefs=Zv(i,su),t.id=NT(t),t})}function AT(e){return Wn(e)||Za(e)}function me(e){return ys(()=>({type:e.type,bootstrap:e.bootstrap||ct,declarations:e.declarations||ct,imports:e.imports||ct,exports:e.exports||ct,transitiveCompileScopes:null,schemas:e.schemas||null,id:e.id||null}))}function RT(e,n){if(e==null)return fi;let t={};for(let i in e)if(e.hasOwnProperty(i)){let r=e[i],o,s,a,c;Array.isArray(r)?(a=r[0],o=r[1],s=r[2]??o,c=r[3]||null):(o=r,s=r,a=el.None,c=null),t[o]=[i,a,c],n[o]=s}return t}function kT(e){if(e==null)return fi;let n={};for(let t in e)e.hasOwnProperty(t)&&(n[e[t]]=t);return n}function H(e){return ys(()=>{let n=M_(e);return A_(n),n})}function cl(e){return{type:e.type,name:e.name,factory:null,pure:e.pure!==!1,standalone:e.standalone??!0,onDestroy:e.type.prototype.ngOnDestroy||null}}function M_(e){let n={};return{type:e.type,providersResolver:null,viewProvidersResolver:null,factory:null,hostBindings:e.hostBindings||null,hostVars:e.hostVars||0,hostAttrs:e.hostAttrs||null,contentQueries:e.contentQueries||null,declaredInputs:n,inputConfig:e.inputs||fi,exportAs:e.exportAs||null,standalone:e.standalone??!0,signals:e.signals===!0,selectors:e.selectors||ct,viewQuery:e.viewQuery||null,features:e.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,controlDef:null,signalFormsInputPresence:null,inputs:RT(e.inputs,n),outputs:kT(e.outputs),debugInfo:null}}function A_(e){e.features?.forEach(n=>n(e))}function Zv(e,n){return e?()=>{let t=typeof e=="function"?e():e,i=[];for(let r of t){let o=n(r);o!==null&&i.push(o)}return i}:null}function NT(e){let n=0,t=typeof e.consts=="function"?"":e.consts,i=[e.selectors,e.ngContentSelectors,e.hostVars,e.hostAttrs,t,e.vars,e.decls,e.encapsulation,e.standalone,e.signals,e.exportAs,JSON.stringify(e.inputs),JSON.stringify(e.outputs),Object.getOwnPropertyNames(e.type.prototype),!!e.contentQueries,!!e.viewQuery];for(let o of i.join("|"))n=Math.imul(31,n)+o.charCodeAt(0)<<0;return n+=2147483648,"c"+n}var R_=new g("");var Ah=(()=>{class e{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((t,i)=>{this.resolve=t,this.reject=i});appInits=u(R_,{optional:!0})??[];injector=u(ne);constructor(){}runInitializers(){if(this.initialized)return;let t=[];for(let r of this.appInits){let o=Ue(this.injector,r);if(io(o))t.push(o);else if(T_(o)){let s=new Promise((a,c)=>{o.subscribe({complete:a,error:c})});t.push(s)}}let i=()=>{this.done=!0,this.resolve()};Promise.all(t).then(()=>{i()}).catch(r=>{this.reject(r)}),t.length===0&&i(),this.initialized=!0}static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:e.\u0275fac})}return e})();function OT(e){return Object.getPrototypeOf(e.prototype).constructor}function Oe(e){let n=OT(e.type),t=!0,i=[e];for(;n;){let r;if(xn(e))r=n.\u0275cmp||n.\u0275dir;else{if(n.\u0275cmp)throw new D(903,!1);r=n.\u0275dir}if(r){if(t){i.push(r);let s=e;s.inputs=Zu(e.inputs),s.declaredInputs=Zu(e.declaredInputs),s.outputs=Zu(e.outputs);let a=r.hostBindings;a&&VT(e,a);let c=r.viewQuery,l=r.contentQueries;if(c&&LT(e,c),l&&BT(e,l),PT(e,r),Rg(e.outputs,r.outputs),xn(r)&&r.data.animation){let d=e.data;d.animation=(d.animation||[]).concat(r.data.animation)}}let o=r.features;if(o)for(let s=0;s<o.length;s++){let a=o[s];a&&a.ngInherit&&a(e),a===Oe&&(t=!1)}}n=Object.getPrototypeOf(n)}FT(i)}function PT(e,n){for(let t in n.inputs){if(!n.inputs.hasOwnProperty(t)||e.inputs.hasOwnProperty(t))continue;let i=n.inputs[t];i!==void 0&&(e.inputs[t]=i,e.declaredInputs[t]=n.declaredInputs[t])}}function FT(e){let n=0,t=null;for(let i=e.length-1;i>=0;i--){let r=e[i];r.hostVars=n+=r.hostVars,r.hostAttrs=qr(r.hostAttrs,t=qr(t,r.hostAttrs))}}function Zu(e){return e===fi?{}:e===ct?[]:e}function LT(e,n){let t=e.viewQuery;t?e.viewQuery=(i,r)=>{n(i,r),t(i,r)}:e.viewQuery=n}function BT(e,n){let t=e.contentQueries;t?e.contentQueries=(i,r,o)=>{n(i,r,o),t(i,r,o)}:e.contentQueries=n}function VT(e,n){let t=e.hostBindings;t?e.hostBindings=(i,r)=>{n(i,r),t(i,r)}:e.hostBindings=n}function k_(e,n,t,i,r,o,s,a){if(t.firstCreatePass){e.mergedAttrs=qr(e.mergedAttrs,e.attrs);let d=e.tView=vh(2,e,r,o,s,t.directiveRegistry,t.pipeRegistry,null,t.schemas,t.consts,null);t.queries!==null&&(t.queries.template(t,e),d.queries=t.queries.embeddedTView(e))}a&&(e.flags|=a),jr(e,!1);let c=N_(t,n,e,i);pc()&&mh(t,n,c,e),Yr(c,n);let l=t_(c,n,c,e);n[i+oe]=l,yh(n,l),gT(l,e,n)}function jT(e,n,t,i,r,o,s,a,c,l,d){let f=t+oe,h;return n.firstCreatePass?(h=no(n,f,4,s||null,a||null),Cu()&&m_(n,e,h,xt(n.consts,l),Hy),pb(n,h)):h=n.data[f],k_(h,e,n,t,i,r,o,c),is(h)&&_h(n,e,h),l!=null&&tl(e,h,d),h}function Kr(e,n,t,i,r,o,s,a,c,l,d){let f=t+oe,h;if(n.firstCreatePass){if(h=no(n,f,4,s||null,a||null),l!=null){let p=xt(n.consts,l);h.localNames=[];for(let m=0;m<p.length;m+=2)h.localNames.push(p[m],-1)}}else h=n.data[f];return k_(h,e,n,t,i,r,o,c),l!=null&&tl(e,h,d),h}function an(e,n,t,i,r,o,s,a){let c=B(),l=De(),d=xt(l.consts,o);return jT(c,l,e,n,t,i,r,d,void 0,s,a),an}function ll(e,n,t,i,r,o,s,a){let c=B(),l=De(),d=xt(l.consts,o);return Kr(c,l,e,n,t,i,r,d,void 0,s,a),ll}var N_=O_;function O_(e,n,t,i){return Kn(!0),n[ce].createComment("")}function UT(e,n,t,i){let r=!qc(n,t);Kn(r);let o=n[dt]?.data[Lb]?.[i]??null;if(o!==null&&t.tView!==null&&t.tView.ssrId===null&&(t.tView.ssrId=o),r)return O_(e,n);let s=n[dt],a=il(s,e,n,t);Wc(s,i,a);let c=th(s,i);return rl(c,a)}function P_(){N_=UT}var Mt=(function(e){return e[e.NOT_STARTED=0]="NOT_STARTED",e[e.IN_PROGRESS=1]="IN_PROGRESS",e[e.COMPLETE=2]="COMPLETE",e[e.FAILED=3]="FAILED",e})(Mt||{}),Kv=0,HT=1,Ne=(function(e){return e[e.Placeholder=0]="Placeholder",e[e.Loading=1]="Loading",e[e.Complete=2]="Complete",e[e.Error=3]="Error",e})(Ne||{});var $T=0,Cs=1;var zT=4,GT=5;var WT=7,Wr=8,qT=9,Rh=(function(e){return e[e.Manual=0]="Manual",e[e.Playthrough=1]="Playthrough",e})(Rh||{});function xc(e,n){let t=ZT(e),i=n[t];if(i!==null){for(let r of i)r();n[t]=null}}function YT(e){xc(1,e),xc(0,e),xc(2,e)}function ZT(e){let n=zT;return e===1?n=GT:e===2&&(n=qT),n}function F_(e){return e+1}function oo(e,n){let t=e[S],i=F_(n.index);return e[i]}function Is(e,n){let t=F_(n.index);return e.data[t]}function KT(e,n,t){let i=n[S],r=Is(i,t);switch(e){case Ne.Complete:return r.primaryTmplIndex;case Ne.Loading:return r.loadingTmplIndex;case Ne.Error:return r.errorTmplIndex;case Ne.Placeholder:return r.placeholderTmplIndex;default:return null}}function Qv(e,n){return n===Ne.Placeholder?e.placeholderBlockConfig?.[Kv]??null:n===Ne.Loading?e.loadingBlockConfig?.[Kv]??null:null}function QT(e){return e.loadingBlockConfig?.[HT]??null}function Xv(e,n){if(!e||e.length===0)return n;let t=new Set(e);for(let i of n)t.add(i);return e.length===t.size?e:Array.from(t)}function XT(e,n){let t=n.primaryTmplIndex+oe;return Vr(e,t)}var JT=(()=>{class e{cachedInjectors=new Map;getOrCreateInjector(t,i,r,o){if(!this.cachedInjectors.has(t)){let s=r.length>0?ro(r,i,o):null;this.cachedInjectors.set(t,s)}return this.cachedInjectors.get(t)}ngOnDestroy(){try{for(let t of this.cachedInjectors.values())t!==null&&t.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=G({token:e,providedIn:"environment",factory:()=>new e})}return e})();var L_=new g("");function Ku(e,n,t){return e.get(JT).getOrCreateInjector(n,e,t,"")}function eM(e,n,t){if(e instanceof Xi){let r=e.injector,o=e.parentInjector,s=Ku(o,n,t);return new Xi(r,s)}let i=e.get(ue);if(i!==e){let r=Ku(i,n,t);return new Xi(e,r)}return Ku(e,n,t)}function Qi(e,n,t,i=!1){let r=t[xe],o=r[S];if(mi(r))return;let s=oo(r,n),a=s[Cs],c=s[WT];if(!(c!==null&&e<c)&&Jv(a,e)&&Jv(s[$T]??-1,e)){let l=Is(o,n),f=!i&&!0&&(QT(l)!==null||Qv(l,Ne.Loading)!==null||Qv(l,Ne.Placeholder))?iM:nM;try{f(e,s,t,n,r)}catch(h){wh(r,h)}}}function tM(e,n){let t=e[Qt]?.findIndex(r=>r.data[Ub]===n[Cs])??-1;return{dehydratedView:t>-1?e[Qt][t]:null,dehydratedViewIx:t}}function nM(e,n,t,i,r){se(ie.DeferBlockStateStart);let o=KT(e,r,i);if(o!==null){n[Cs]=e;let s=r[S],a=o+oe,c=Vr(s,a),l=0;Ch(t,l);let d;if(e===Ne.Complete){let m=Is(s,i),y=m.providers;y&&y.length>0&&(d=eM(r[vt],m,y))}let{dehydratedView:f,dehydratedViewIx:h}=tM(t,n),p=eo(r,c,null,{injector:d,dehydratedView:f});if(to(t,p,l,er(c,f)),oc(p),h>-1&&t[Qt]?.splice(h,1),(e===Ne.Complete||e===Ne.Error)&&Array.isArray(n[Wr])){for(let m of n[Wr])m();n[Wr]=null}}se(ie.DeferBlockStateEnd)}function Jv(e,n){return e<n}function eb(e,n,t){e.loadingPromise.then(()=>{e.loadingState===Mt.COMPLETE?Qi(Ne.Complete,n,t):e.loadingState===Mt.FAILED&&Qi(Ne.Error,n,t)})}var iM=null;function rM(e,n){return n[vt].get(L_,null,{optional:!0})?.behavior!==Rh.Manual}var dl=(()=>{class e{log(t){console.log(t)}warn(t){console.warn(t)}static \u0275fac=function(i){return new(i||e)};static \u0275prov=G({token:e,factory:e.\u0275fac,providedIn:"platform"})}return e})();var kh=new g("");var cn=new g("");function B_(){Cd(()=>{let e="";throw new D(600,e)})}var oM=10;var Pe=(()=>{class e{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=u(Jt);afterRenderManager=u(fh);zonelessEnabled=u(cs);rootEffectScheduler=u(vc);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=!1;afterTick=new I;get allViews(){return[...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=u(An);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(re(t=>!t))}constructor(){u(ni,{optional:!0})}whenStable(){let t;return new Promise(i=>{t=this.isStable.subscribe({next:r=>{r&&i()}})}).finally(()=>{t.unsubscribe()})}_injector=u(ue);_rendererFactory=null;get injector(){return this._injector}bootstrap(t,i){return this.bootstrapImpl(t,i)}bootstrapImpl(t,i,r=ne.NULL){return this._injector.get(M).run(()=>{if(se(ie.BootstrapComponentStart),!this._injector.get(Ah).done){let T="";throw new D(405,T)}let a=Wn(t),c=this._injector.get(Jn),l=new Zr(a,c);this.componentTypes.push(t);let{hostElement:d,directives:f,bindings:h}=sM(i),p=d||l.selector,m=l.create(r,[],p,c.injector,f,h),y=m.location.nativeElement,E=m.injector.get(kh,null);return E?.registerApplication(y),m.onDestroy(()=>{this.detachView(m.hostView),us(this.components,m),E?.unregisterApplication(y)}),this._loadComponent(m),se(ie.BootstrapComponentEnd,m),m})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){se(ie.ChangeDetectionStart),this.tracingSnapshot!==null?this.tracingSnapshot.run(Kc.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw se(ie.ChangeDetectionEnd),new D(101,!1);let t=R(null);try{this._runningTick=!0,this.synchronize()}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,R(t),this.afterTick.next(),se(ie.ChangeDetectionEnd)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get($e,null,{optional:!0}));let t=0;for(;this.dirtyFlags!==0&&t++<oM;){se(ie.ChangeDetectionSyncStart);try{this.synchronizeOnce()}finally{se(ie.ChangeDetectionSyncEnd)}}}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let t=!1;if(this.dirtyFlags&7){let i=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:r}of this.allViews){if(!i&&!rs(r))continue;let o=i&&!this.zonelessEnabled?0:1;Qy(r,o),t=!0}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}t||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:t})=>rs(t))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(t){let i=t;this._views.push(i),i.attachToAppRef(this)}detachView(t){let i=t;us(this._views,i),i.detachFromAppRef()}_loadComponent(t){this.attachView(t.hostView);try{this.tick()}catch(r){this.internalErrorHandler(r)}this.components.push(t),this._injector.get(cn,[]).forEach(r=>r(t))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(t=>t()),this._views.slice().forEach(t=>t.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(t){return this._destroyListeners.push(t),()=>us(this._destroyListeners,t)}destroy(){if(this._destroyed)throw new D(406,!1);let t=this._injector;t.destroy&&!t.destroyed&&t.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:e.\u0275fac})}return e})();function sM(e){return e===void 0||typeof e=="string"||e instanceof Element?{hostElement:e}:e}function us(e,n){let t=e.indexOf(n);t>-1&&e.splice(t,1)}function V_(e,n,t){let i=n[vt],r=n[S];if(e.loadingState!==Mt.NOT_STARTED)return e.loadingPromise??Promise.resolve();let o=oo(n,t),s=XT(r,e);e.loadingState=Mt.IN_PROGRESS,xc(1,o);let a=e.dependencyResolverFn,c=i.get($r).add();return a?(e.loadingPromise=Promise.allSettled(a()).then(l=>{let d=!1,f=null,h=[],p=[];for(let m=0;m<l.length;m++){let y=l[m];if(y.status==="fulfilled"){let E=y.value,T=Wn(E)||Za(E);if(T)h.push(T);else{let $=su(E);$&&p.push($)}}else{d=!0,f=y.reason instanceof Error?y.reason:new Error(String(y.reason));break}}if(d){if(e.loadingState=Mt.FAILED,e.errorTmplIndex===null){let y="",E=new D(-750,y);wh(n,E)}}else{e.loadingState=Mt.COMPLETE;let m=s.tView;if(h.length>0){m.directiveRegistry=Xv(m.directiveRegistry,h);let y=h.map(T=>T.type),E=nc(!1,...y);e.providers=E}p.length>0&&(m.pipeRegistry=Xv(m.pipeRegistry,p))}}),e.loadingPromise.finally(()=>{e.loadingPromise=null,c()})):(e.loadingPromise=Promise.resolve().then(()=>{e.loadingPromise=null,e.loadingState=Mt.COMPLETE,c()}),e.loadingPromise)}function aM(e,n,t){let i=n[S],r=n[t.index];if(!rM(e,n))return;let o=oo(n,t),s=Is(i,t);switch(YT(o),s.loadingState){case Mt.NOT_STARTED:Qi(Ne.Loading,t,r),V_(s,n,t),s.loadingState===Mt.IN_PROGRESS&&eb(s,t,r);break;case Mt.IN_PROGRESS:Qi(Ne.Loading,t,r),eb(s,t,r);break;case Mt.COMPLETE:Qi(Ne.Complete,t,r);break;case Mt.FAILED:Qi(Ne.Error,t,r);break;default:}}async function j_(e,n,t){let i=e.get(ws);if(i.hydrating.has(n))return;let{parentBlockPromise:o,hydrationQueue:s}=HI(n,e);if(s.length===0)return;o!==null&&s.shift(),dM(i,s),o!==null&&await o;let a=s[0];i.has(a)?await tb(e,s,t):i.awaitParentBlock(a,async()=>await tb(e,s,t))}async function tb(e,n,t){let i=e.get(ws),r=i.hydrating,o=e.get(An),s=o.add();for(let c=0;c<n.length;c++){let l=n[c],d=i.get(l);if(d!=null){if(await fM(d),await uM(e),cM(d)){Lx(d),nb(n.slice(c),i);break}r.get(l).resolve()}else{lM(c,n,i),nb(n.slice(c),i);break}}let a=n[n.length-1];await r.get(a)?.promise,o.remove(s),t&&t(n),Bx(i.get(a),n,i,e.get(Pe))}function cM(e){return oo(e.lView,e.tNode)[Cs]===Ne.Error}function lM(e,n,t){let i=e-1,r=i>-1?t.get(n[i]):null;r&&sl(r.lContainer)}function nb(e,n){let t=n.hydrating;for(let i in e)t.get(i)?.reject();n.cleanup(e)}function dM(e,n){for(let t of n)e.hydrating.set(t,mc())}function uM(e){return new Promise(n=>ze(n,{injector:e}))}async function fM(e){let{tNode:n,lView:t}=e,i=oo(t,n);return new Promise(r=>{hM(i,r),aM(2,t,n)})}function hM(e,n){Array.isArray(e[Wr])||(e[Wr]=[]),e[Wr].push(n)}function ul(e,n){let t=B(),i=Yn();if(sn(t,i,n)){let r=De(),o=os();if(nl(o,r,t,e,n))Xt(o)&&Uy(t,o.index);else{let a=St(o,t);$y(t[ce],a,null,o.value,e,n,null)}}return ul}function ge(e,n,t,i){let r=B(),o=Yn();if(sn(r,o,n)){let s=De(),a=os();sx(a,r,e,n,t,i)}return ge}var kf=class{destroy(n){}updateValue(n,t){}swap(n,t){let i=Math.min(n,t),r=Math.max(n,t),o=this.detach(r);if(r-i>1){let s=this.detach(i);this.attach(i,o),this.attach(r,s)}else this.attach(i,o)}move(n,t){this.attach(t,this.detach(n))}};function Qu(e,n,t,i,r){return e===t&&Object.is(n,i)?1:Object.is(r(e,n),r(t,i))?-1:0}function pM(e,n,t,i){let r,o,s=0,a=e.length-1,c=void 0;if(Array.isArray(n)){R(i);let l=n.length-1;for(R(null);s<=a&&s<=l;){let d=e.at(s),f=n[s],h=Qu(s,d,s,f,t);if(h!==0){h<0&&e.updateValue(s,f),s++;continue}let p=e.at(a),m=n[l],y=Qu(a,p,l,m,t);if(y!==0){y<0&&e.updateValue(a,m),a--,l--;continue}let E=t(s,d),T=t(a,p),$=t(s,f);if(Object.is($,T)){let ve=t(l,m);Object.is(ve,E)?(e.swap(s,a),e.updateValue(a,m),l--,a--):e.move(a,s),e.updateValue(s,f),s++;continue}if(r??=new Hc,o??=rb(e,s,a,t),Nf(e,r,s,$))e.updateValue(s,f),s++,a++;else if(o.has($))r.set(E,e.detach(s)),a--;else{let ve=e.create(s,n[s]);e.attach(s,ve),s++,a++}}for(;s<=l;)ib(e,r,t,s,n[s]),s++}else if(n!=null){R(i);let l=n[Symbol.iterator]();R(null);let d=l.next();for(;!d.done&&s<=a;){let f=e.at(s),h=d.value,p=Qu(s,f,s,h,t);if(p!==0)p<0&&e.updateValue(s,h),s++,d=l.next();else{r??=new Hc,o??=rb(e,s,a,t);let m=t(s,h);if(Nf(e,r,s,m))e.updateValue(s,h),s++,a++,d=l.next();else if(!o.has(m))e.attach(s,e.create(s,h)),s++,a++,d=l.next();else{let y=t(s,f);r.set(y,e.detach(s)),a--}}}for(;!d.done;)ib(e,r,t,e.length,d.value),d=l.next()}for(;s<=a;)e.destroy(e.detach(a--));r?.forEach(l=>{e.destroy(l)})}function Nf(e,n,t,i){return n!==void 0&&n.has(i)?(e.attach(t,n.get(i)),n.delete(i),!0):!1}function ib(e,n,t,i,r){if(Nf(e,n,i,t(i,r)))e.updateValue(i,r);else{let o=e.create(i,r);e.attach(i,o)}}function rb(e,n,t,i){let r=new Set;for(let o=n;o<=t;o++)r.add(i(o,e.at(o)));return r}var Hc=class{kvMap=new Map;_vMap=void 0;has(n){return this.kvMap.has(n)}delete(n){if(!this.has(n))return!1;let t=this.kvMap.get(n);return this._vMap!==void 0&&this._vMap.has(t)?(this.kvMap.set(n,this._vMap.get(t)),this._vMap.delete(t)):this.kvMap.delete(n),!0}get(n){return this.kvMap.get(n)}set(n,t){if(this.kvMap.has(n)){let i=this.kvMap.get(n);this._vMap===void 0&&(this._vMap=new Map);let r=this._vMap;for(;r.has(i);)i=r.get(i);r.set(i,t)}else this.kvMap.set(n,t)}forEach(n){for(let[t,i]of this.kvMap)if(n(i,t),this._vMap!==void 0){let r=this._vMap;for(;r.has(i);)i=r.get(i),n(i,t)}}};function et(e,n,t,i,r,o,s,a){jt("NgControlFlow");let c=B(),l=De(),d=xt(l.consts,o);return Kr(c,l,e,n,t,i,r,d,256,s,a),Nh}function Nh(e,n,t,i,r,o,s,a){jt("NgControlFlow");let c=B(),l=De(),d=xt(l.consts,o);return Kr(c,l,e,n,t,i,r,d,512,s,a),Nh}function tt(e,n){jt("NgControlFlow");let t=B(),i=Yn(),r=t[i]!==Rt?t[i]:-1,o=r!==-1?$c(t,oe+r):void 0,s=0;if(sn(t,i,e)){let a=R(null);try{if(o!==void 0&&Ch(o,s),e!==-1){let c=oe+e,l=$c(t,c),d=Lf(t[S],c),f=l_(l,d,t),h=eo(t,d,n,{dehydratedView:f});to(l,h,s,er(d,f))}}finally{R(a)}}else if(o!==void 0){let a=n_(o,s);a!==void 0&&(a[Te]=n)}}var Of=class{lContainer;$implicit;$index;constructor(n,t,i){this.lContainer=n,this.$implicit=t,this.$index=i}get $count(){return this.lContainer.length-ye}};function so(e,n){return n}var Pf=class{hasEmptyBlock;trackByFn;liveCollection;constructor(n,t,i){this.hasEmptyBlock=n,this.trackByFn=t,this.liveCollection=i}};function ln(e,n,t,i,r,o,s,a,c,l,d,f,h){jt("NgControlFlow");let p=B(),m=De(),y=c!==void 0,E=B(),T=a?s.bind(E[We][Te]):s,$=new Pf(y,T);E[oe+e]=$,Kr(p,m,e+1,n,t,i,r,xt(m.consts,o),256),y&&Kr(p,m,e+2,c,l,d,f,xt(m.consts,h),512)}var Ff=class extends kf{lContainer;hostLView;templateTNode;operationsCounter=void 0;needsIndexUpdate=!1;constructor(n,t,i){super(),this.lContainer=n,this.hostLView=t,this.templateTNode=i}get length(){return this.lContainer.length-ye}at(n){return this.getLView(n)[Te].$implicit}attach(n,t){let i=t[dt];this.needsIndexUpdate||=n!==this.length,to(this.lContainer,t,n,er(this.templateTNode,i)),mM(this.lContainer,n)}detach(n){return this.needsIndexUpdate||=n!==this.length-1,gM(this.lContainer,n),vM(this.lContainer,n)}create(n,t){let i=gs(this.lContainer,this.templateTNode.tView.ssrId);return eo(this.hostLView,this.templateTNode,new Of(this.lContainer,t,n),{dehydratedView:i})}destroy(n){Xc(n[S],n)}updateValue(n,t){this.getLView(n)[Te].$implicit=t}reset(){this.needsIndexUpdate=!1}updateIndexes(){if(this.needsIndexUpdate)for(let n=0;n<this.length;n++)this.getLView(n)[Te].$index=n}getLView(n){return bM(this.lContainer,n)}};function dn(e){let n=R(null),t=Zn();try{let i=B(),r=i[S],o=i[t],s=t+1,a=$c(i,s);if(o.liveCollection===void 0){let l=Lf(r,s);o.liveCollection=new Ff(a,i,l)}else o.liveCollection.reset();let c=o.liveCollection;if(pM(c,e,o.trackByFn,n),c.updateIndexes(),o.hasEmptyBlock){let l=Yn(),d=c.length===0;if(sn(i,l,d)){let f=t+2,h=$c(i,f);if(d){let p=Lf(r,f),m=l_(h,p,i),y=eo(i,p,void 0,{dehydratedView:m});to(h,y,0,er(p,m))}else r.firstUpdatePass&&ol(h),Ch(h,0)}}}finally{R(n)}}function $c(e,n){return e[n]}function mM(e,n){if(e.length<=ye)return;let t=ye+n,i=e[t],r=i?i[In]:void 0;if(i&&r&&r.detachedLeaveAnimationFns&&r.detachedLeaveAnimationFns.length>0){let o=i[vt];kS(o,r),yi.delete(i[Cn]),r.detachedLeaveAnimationFns=void 0}}function gM(e,n){if(e.length<=ye)return;let t=ye+n,i=e[t],r=i?i[In]:void 0;r&&r.leave&&r.leave.size>0&&(r.detachedLeaveAnimationFns=[])}function vM(e,n){return ms(e,n)}function bM(e,n){return n_(e,n)}function Lf(e,n){return Vr(e,n)}function _e(e,n,t){let i=B(),r=Yn();if(sn(i,r,n)){let o=De(),s=os();nx(s,i,e,n,i[ce],t)}return _e}function Bf(e,n,t,i,r){nl(n,e,t,r?"class":"style",i)}function _(e,n,t,i){let r=B(),o=r[S],s=e+oe,a=o.firstCreatePass?v_(s,r,2,n,Hy,Cu(),t,i):o.data[s];if(Xt(a)){let c=r[En].tracingService;if(c&&c.componentCreate){let l=o.data[a.directiveStart+a.componentOffset];return c.componentCreate(h_(l),()=>(ob(e,n,r,a,i),_))}}return ob(e,n,r,a,i),_}function ob(e,n,t,i,r){if(zy(i,t,e,n,Oh),is(i)){let o=t[S];_h(o,t,i),dy(o,i,t)}r!=null&&tl(t,i)}function b(){let e=De(),n=qe(),t=Gy(n);return e.firstCreatePass&&b_(e,t),Iu(t)&&Su(),Du(),t.classesWithoutHost!=null&&uI(t)&&Bf(e,t,B(),t.classesWithoutHost,!0),t.stylesWithoutHost!=null&&fI(t)&&Bf(e,t,B(),t.stylesWithoutHost,!1),b}function Me(e,n,t,i){return _(e,n,t,i),b(),Me}function _t(e,n,t,i){let r=B(),o=r[S],s=e+oe,a=o.firstCreatePass?iT(s,o,2,n,t,i):o.data[s];return zy(a,r,e,n,Oh),i!=null&&tl(r,a),_t}function kt(){let e=qe(),n=Gy(e);return Iu(n)&&Su(),Du(),kt}function ii(e,n,t,i){return _t(e,n,t,i),kt(),ii}var Oh=(e,n,t,i,r)=>(Kn(!0),ch(n[ce],i,hc()));function yM(e,n,t,i,r){let o=!qc(n,t);if(Kn(o),o)return ch(n[ce],i,hc());let s=n[dt],a=il(s,e,n,t);return sy(s,r)&&Wc(s,r,a.nextSibling),s&&(xb(t)||Tb(a))&&Xt(t)&&(tv(t),_y(a)),a}function U_(){Oh=yM}var _M=(e,n,t,i,r)=>(Kn(!0),by(n[ce],""));function wM(e,n,t,i,r){let o,s=!qc(n,t);if(Kn(s),s)return by(n[ce],"");let a=n[dt],c=il(a,e,n,t),l=jI(a,r);return Wc(a,r,c),o=rl(l,c),o}function H_(){_M=wM}function ao(){return B()}function co(e,n,t){let i=B(),r=Yn();if(sn(i,r,n)){let o=De(),s=os();jy(s,i,e,n,i[ce],t)}return co}var Ss="en-US";var EM=Ss;function $_(e){typeof e=="string"&&(EM=e.toLowerCase().replace(/_/g,"-"))}function Ce(e,n,t){let i=B(),r=De(),o=qe();return DM(r,i,i[ce],o,e,n,t),Ce}function DM(e,n,t,i,r,o,s){let a=!0,c=null;if((i.type&3||s)&&(c??=qu(i,n,o),Gx(i,e,n,s,t,r,o,c)&&(a=!1)),a){let l=i.outputs?.[r],d=i.hostDirectiveOutputs?.[r];if(d&&d.length)for(let f=0;f<d.length;f+=2){let h=d[f],p=d[f+1];c??=qu(i,n,o),$v(i,n,h,p,r,c)}if(l&&l.length)for(let f of l)c??=qu(i,n,o),$v(i,n,f,r,r,c)}}function Ve(e=1){return hv(e)}function CM(e,n){let t=null,i=yS(e);for(let r=0;r<n.length;r++){let o=n[r];if(o==="*"){t=r;continue}if(i===null?Cy(e,o,!0):ES(i,o))return r}return t}function Fe(e){let n=B()[We][Xe];if(!n.projection){let t=e?e.length:1,i=n.projection=Bg(t,null),r=i.slice(),o=n.child;for(;o!==null;){if(o.type!==128){let s=e?CM(o,e):0;s!==null&&(r[s]?r[s].projectionNext=o:i[s]=o,r[s]=o)}o=o.next}}}function he(e,n=0,t,i,r,o){let s=B(),a=De(),c=i?e+1:null;c!==null&&Kr(s,a,c,i,r,o,null,t);let l=no(a,oe+e,16,null,t||null);l.projection===null&&(l.projection=n),Mu();let f=!s[dt]||cc();s[We][Xe].projection[l.projection]===null&&c!==null?IM(s,a,c):f&&!Es(l)&&WS(a,s,l)}function IM(e,n,t){let i=oe+t,r=n.data[i],o=e[i],s=gs(o,r.tView.ssrId),a=eo(e,r,void 0,{dehydratedView:s});to(o,a,0,er(r,s))}function kn(e,n,t,i){return IT(e,n,t,i),kn}function nt(e,n,t){return CT(e,n,t),nt}function K(e){let n=B(),t=De(),i=ku();dc(i+1);let r=Mh(t,i);if(e.dirty&&Yg(n)===((r.metadata.flags&2)===2)){if(r.matches===null)e.reset([]);else{let o=TT(n,i);e.reset(o,II),e.notifyOnChanges()}return!0}return!1}function Q(){return DT(B(),ku())}function lo(e){let n=iv();return bu(n,oe+e)}function wc(e,n){return e<<17|n<<2}function tr(e){return e>>17&32767}function SM(e){return(e&2)==2}function xM(e,n){return e&131071|n<<17}function Vf(e){return e|2}function Qr(e){return(e&131068)>>2}function Xu(e,n){return e&-131069|n<<2}function TM(e){return(e&1)===1}function jf(e){return e|1}function MM(e,n,t,i,r,o){let s=o?n.classBindings:n.styleBindings,a=tr(s),c=Qr(s);e[i]=t;let l=!1,d;if(Array.isArray(t)){let f=t;d=f[1],(d===null||Pr(f,d)>0)&&(l=!0)}else d=t;if(r)if(c!==0){let h=tr(e[a+1]);e[i+1]=wc(h,a),h!==0&&(e[h+1]=Xu(e[h+1],i)),e[a+1]=xM(e[a+1],i)}else e[i+1]=wc(a,0),a!==0&&(e[a+1]=Xu(e[a+1],i)),a=i;else e[i+1]=wc(c,0),a===0?a=i:e[c+1]=Xu(e[c+1],i),c=i;l&&(e[i+1]=Vf(e[i+1])),sb(e,d,i,!0),sb(e,d,i,!1),AM(n,d,e,i,o),s=wc(a,c),o?n.classBindings=s:n.styleBindings=s}function AM(e,n,t,i,r){let o=r?e.residualClasses:e.residualStyles;o!=null&&typeof n=="string"&&Pr(o,n)>=0&&(t[i+1]=jf(t[i+1]))}function sb(e,n,t,i){let r=e[t+1],o=n===null,s=i?tr(r):Qr(r),a=!1;for(;s!==0&&(a===!1||o);){let c=e[s],l=e[s+1];RM(c,n)&&(a=!0,e[s+1]=i?jf(l):Vf(l)),s=i?tr(l):Qr(l)}a&&(e[t+1]=i?Vf(r):jf(r))}function RM(e,n){return e===null||n==null||(Array.isArray(e)?e[1]:e)===n?!0:Array.isArray(e)&&typeof n=="string"?Pr(e,n)>=0:!1}var tn={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function kM(e){return e.substring(tn.key,tn.keyEnd)}function NM(e){return OM(e),z_(e,G_(e,0,tn.textEnd))}function z_(e,n){let t=tn.textEnd;return t===n?-1:(n=tn.keyEnd=PM(e,tn.key=n,t),G_(e,n,t))}function OM(e){tn.key=0,tn.keyEnd=0,tn.value=0,tn.valueEnd=0,tn.textEnd=e.length}function G_(e,n,t){for(;n<t&&e.charCodeAt(n)<=32;)n++;return n}function PM(e,n,t){for(;n<t&&e.charCodeAt(n)>32;)n++;return n}function or(e,n,t){return W_(e,n,t,!1),or}function X(e,n){return W_(e,n,null,!0),X}function Nt(e){LM($M,FM,e,!0)}function FM(e,n){for(let t=NM(n);t>=0;t=z_(n,t))ec(e,kM(n),!0)}function W_(e,n,t,i){let r=B(),o=De(),s=Ru(2);if(o.firstUpdatePass&&Y_(o,e,s,i),n!==Rt&&sn(r,s,n)){let a=o.data[Zn()];Z_(o,a,r,r[ce],e,r[s+1]=GM(n,t),i,s)}}function LM(e,n,t,i){let r=De(),o=Ru(2);r.firstUpdatePass&&Y_(r,null,o,i);let s=B();if(t!==Rt&&sn(s,o,t)){let a=r.data[Zn()];if(K_(a,i)&&!q_(r,o)){let c=i?a.classesWithoutHost:a.stylesWithoutHost;c!==null&&(t=qa(c,t||"")),Bf(r,a,s,t,i)}else zM(r,a,s,s[ce],s[o+1],s[o+1]=HM(e,n,t),i,o)}}function q_(e,n){return n>=e.expandoStartIndex}function Y_(e,n,t,i){let r=e.data;if(r[t+1]===null){let o=r[Zn()],s=q_(e,t);K_(o,i)&&n===null&&!s&&(n=!1),n=BM(r,o,n,i),MM(r,o,n,t,s,i)}}function BM(e,n,t,i){let r=lv(e),o=i?n.residualClasses:n.residualStyles;if(r===null)(i?n.classBindings:n.styleBindings)===0&&(t=Ju(null,e,n,t,i),t=bs(t,n.attrs,i),o=null);else{let s=n.directiveStylingLast;if(s===-1||e[s]!==r)if(t=Ju(r,e,n,t,i),o===null){let c=VM(e,n,i);c!==void 0&&Array.isArray(c)&&(c=Ju(null,e,n,c[1],i),c=bs(c,n.attrs,i),jM(e,n,i,c))}else o=UM(e,n,i)}return o!==void 0&&(i?n.residualClasses=o:n.residualStyles=o),t}function VM(e,n,t){let i=t?n.classBindings:n.styleBindings;if(Qr(i)!==0)return e[tr(i)]}function jM(e,n,t,i){let r=t?n.classBindings:n.styleBindings;e[tr(r)]=i}function UM(e,n,t){let i,r=n.directiveEnd;for(let o=1+n.directiveStylingLast;o<r;o++){let s=e[o].hostAttrs;i=bs(i,s,t)}return bs(i,n.attrs,t)}function Ju(e,n,t,i,r){let o=null,s=t.directiveEnd,a=t.directiveStylingLast;for(a===-1?a=t.directiveStart:a++;a<s&&(o=n[a],i=bs(i,o.hostAttrs,r),o!==e);)a++;return e!==null&&(t.directiveStylingLast=a),i}function bs(e,n,t){let i=t?1:2,r=-1;if(n!==null)for(let o=0;o<n.length;o++){let s=n[o];typeof s=="number"?r=s:r===i&&(Array.isArray(e)||(e=e===void 0?[]:["",e]),ec(e,s,t?!0:n[++o]))}return e===void 0?null:e}function HM(e,n,t){if(t==null||t==="")return ct;let i=[],r=ei(t);if(Array.isArray(r))for(let o=0;o<r.length;o++)e(i,r[o],!0);else if(r instanceof Set)for(let o of r)e(i,o,!0);else if(typeof r=="object")for(let o in r)Object.hasOwn(r,o)&&e(i,o,r[o]);else typeof r=="string"&&n(i,r);return i}function $M(e,n,t){let i=String(n);i!==""&&!i.includes(" ")&&ec(e,i,t)}function zM(e,n,t,i,r,o,s,a){r===Rt&&(r=ct);let c=0,l=0,d=0<r.length?r[0]:null,f=0<o.length?o[0]:null;for(;d!==null||f!==null;){let h=c<r.length?r[c+1]:void 0,p=l<o.length?o[l+1]:void 0,m=null,y;d===f?(c+=2,l+=2,h!==p&&(m=f,y=p)):f===null||d!==null&&d<f?(c+=2,m=d):(l+=2,m=f,y=p),m!==null&&Z_(e,n,t,i,m,y,s,a),d=c<r.length?r[c]:null,f=l<o.length?o[l]:null}}function Z_(e,n,t,i,r,o,s,a){if(!(n.type&3))return;let c=e.data,l=c[a+1],d=TM(l)?ab(c,n,t,r,Qr(l),s):void 0;if(!zc(d)){zc(o)||SM(l)&&(o=ab(c,null,t,r,a,s));let f=vu(Zn(),t);YS(i,s,f,r,o)}}function ab(e,n,t,i,r,o){let s=n===null,a;for(;r>0;){let c=e[r],l=Array.isArray(c),d=l?c[1]:c,f=d===null,h=t[r+1];h===Rt&&(h=f?ct:void 0);let p=f?tc(h,i):d===i?h:void 0;if(l&&!zc(p)&&(p=tc(c,i)),zc(p)&&(a=p,s))return a;let m=e[r+1];r=s?tr(m):Qr(m)}if(n!==null){let c=o?n.residualClasses:n.residualStyles;c!=null&&(a=tc(c,i))}return a}function zc(e){return e!==void 0}function GM(e,n){return e==null||e===""||(typeof n=="string"?e=e+n:typeof e=="object"&&(e=Qo(ei(e)))),e}function K_(e,n){return(e.flags&(n?8:16))!==0}function C(e,n=""){let t=B(),i=De(),r=e+oe,o=i.firstCreatePass?no(i,r,1,n,null):i.data[r],s=Q_(i,t,o,n);t[r]=s,pc()&&mh(i,t,s,o),jr(o,!1)}var Q_=(e,n,t,i)=>(Kn(!0),vy(n[ce],i));function WM(e,n,t,i){let r=!qc(n,t);if(Kn(r),r)return vy(n[ce],i);let o=n[dt];return il(o,e,n,t)}function X_(){Q_=WM}function qM(e,n,t,i=""){return sn(e,Yn(),t)?n+Qa(t)+i:Rt}function it(e){return ae("",e),it}function ae(e,n,t){let i=B(),r=qM(i,e,n,t);return r!==Rt&&YM(i,Zn(),r),ae}function YM(e,n,t){let i=vu(n,e);dS(e[ce],i,t)}function Ph(e){return sn(B(),Yn(),e)?Qa(e):Rt}function cb(e,n,t){let i=De();i.firstCreatePass&&J_(n,i.data,i.blueprint,xn(e),t)}function J_(e,n,t,i,r){if(e=Ge(e),Array.isArray(e))for(let o=0;o<e.length;o++)J_(e[o],n,t,i,r);else{let o=De(),s=B(),a=qe(),c=ji(e)?e:Ge(e.provide),l=fu(e),d=a.providerIndexes&1048575,f=a.directiveStart,h=a.providerIndexes>>20;if(ji(e)||!e.multi){let p=new Ji(l,r,rr,null),m=tf(c,n,r?d:d+h,f);m===-1?(of(kc(a,s),o,c),ef(o,e,n.length),n.push(c),a.directiveStart++,a.directiveEnd++,r&&(a.providerIndexes+=1048576),t.push(p),s.push(p)):(t[m]=p,s[m]=p)}else{let p=tf(c,n,d+h,f),m=tf(c,n,d,d+h),y=p>=0&&t[p],E=m>=0&&t[m];if(r&&!E||!r&&!y){of(kc(a,s),o,c);let T=QM(r?KM:ZM,t.length,r,i,l,e);!r&&E&&(t[m].providerFactory=T),ef(o,e,n.length,0),n.push(c),a.directiveStart++,a.directiveEnd++,r&&(a.providerIndexes+=1048576),t.push(T),s.push(T)}else{let T=ew(t[r?m:p],l,!r&&i);ef(o,e,p>-1?p:m,T)}!r&&i&&E&&t[m].componentProviders++}}}function ef(e,n,t,i){let r=ji(n),o=zg(n);if(r||o){let c=(o?Ge(n.useClass):n).prototype.ngOnDestroy;if(c){let l=e.destroyHooks||(e.destroyHooks=[]);if(!r&&n.multi){let d=l.indexOf(t);d===-1?l.push(t,[i,c]):l[d+1].push(i,c)}else l.push(t,c)}}}function ew(e,n,t){return t&&e.componentProviders++,e.multi.push(n)-1}function tf(e,n,t,i){for(let r=t;r<i;r++)if(n[r]===e)return r;return-1}function ZM(e,n,t,i,r){return Uf(this.multi,[])}function KM(e,n,t,i,r){let o=this.multi,s;if(this.providerFactory){let a=this.providerFactory.componentProviders,c=fs(i,i[S],this.providerFactory.index,r);s=c.slice(0,a),Uf(o,s);for(let l=a;l<c.length;l++)s.push(c[l])}else s=[],Uf(o,s);return s}function Uf(e,n){for(let t=0;t<e.length;t++){let i=e[t];n.push(i())}return n}function QM(e,n,t,i,r,o){let s=new Ji(e,t,rr,null);return s.multi=[],s.index=n,s.componentProviders=0,ew(s,r,i&&!t),s}function rt(e,n){return t=>{t.providersResolver=(i,r)=>cb(i,r?r(e):e,!1),n&&(t.viewProvidersResolver=(i,r)=>cb(i,r?r(n):n,!0))}}var XM=()=>null,JM=()=>{};function tw(){return XM()}function nw(e,n){JM(e,n)}function eA(e,n){let t=e[n];return t===Rt?void 0:t}function tA(e,n,t,i,r,o){let s=n+t;return sn(e,s,r)?zx(e,s+1,o?i.call(o,r):i(r)):eA(e,s+1)}function sr(e,n){let t=De(),i,r=e+oe;t.firstCreatePass?(i=nA(n,t.pipeRegistry),t.data[r]=i,i.onDestroy&&(t.destroyHooks??=[]).push(r,i.onDestroy)):i=t.data[r];let o=i.factory||(i.factory=di(i.type,!0)),s,a=at(rr);try{let c=Rc(!1),l=o();return Rc(c),yu(t,B(),r,l),l}finally{at(a)}}function nA(e,n){if(n)for(let t=n.length-1;t>=0;t--){let i=n[t];if(e===i.name)return i}}function ar(e,n,t){let i=e+oe,r=B(),o=bu(r,i);return iA(r,i)?tA(r,rv(),n,o.transform,t,o):o.transform(t)}function iA(e,n){return e[S].data[n].pure}var iw=(()=>{class e{applicationErrorHandler=u(Jt);appRef=u(Pe);taskService=u(An);ngZone=u(M);zonelessEnabled=u(cs);tracing=u(ni,{optional:!0});zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new ee;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(Zo):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(u(Uu,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{let t=this.taskService.add();if(!this.runningTick&&(this.cleanup(),!this.zonelessEnabled||this.appRef.includeAllTestViews)){this.taskService.remove(t);return}this.switchToMicrotaskScheduler(),this.taskService.remove(t)})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()}))}switchToMicrotaskScheduler(){this.ngZone.runOutsideAngular(()=>{let t=this.taskService.add();this.useMicrotaskScheduler=!0,queueMicrotask(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(t)})})}notify(t){if(!this.zonelessEnabled&&t===5)return;switch(t){case 0:case 2:{this.appRef.dirtyFlags|=2;break}case 3:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2;break}case 12:{this.appRef.dirtyFlags|=16;break}case 13:{this.appRef.dirtyFlags|=2;break}case 11:break;default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick())return;let i=this.useMicrotaskScheduler?vv:Fu;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>i(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>i(()=>this.tick()))}shouldScheduleTick(){return!(this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(Zo+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let t=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(i){this.applicationErrorHandler(i)}finally{this.taskService.remove(t),this.cleanup()}}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let t=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(t)}}static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:e.\u0275fac})}return e})();function rw(){return[{provide:_n,useExisting:iw},{provide:M,useClass:Ko},{provide:cs,useValue:!0}]}var Fh=(()=>{class e{compileModuleSync(t){return new Uc(t)}compileModuleAsync(t){return Promise.resolve(this.compileModuleSync(t))}clearCache(){}clearCacheFor(t){}getModuleId(t){}static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:e.\u0275fac})}return e})();function rA(){return typeof $localize<"u"&&$localize.locale||Ss}var Lh=new g("",{factory:()=>u(Lh,{optional:!0,skipSelf:!0})||rA()});var fl=new g("");function Nn(e){return Ym(e)}var Hh={JSACTION:"__jsaction",OWNER:"__owner"},cw={};function oA(e){return e[Hh.JSACTION]}function ow(e,n){e[Hh.JSACTION]=n}function sA(e){return cw[e]}function aA(e,n){cw[e]=n}var A={CLICK:"click",CLICKMOD:"clickmod",DBLCLICK:"dblclick",FOCUS:"focus",FOCUSIN:"focusin",BLUR:"blur",FOCUSOUT:"focusout",SUBMIT:"submit",KEYDOWN:"keydown",KEYPRESS:"keypress",KEYUP:"keyup",MOUSEOVER:"mouseover",MOUSEOUT:"mouseout",MOUSEENTER:"mouseenter",MOUSELEAVE:"mouseleave",POINTEROVER:"pointerover",POINTEROUT:"pointerout",POINTERENTER:"pointerenter",POINTERLEAVE:"pointerleave",ERROR:"error",LOAD:"load",TOUCHSTART:"touchstart",TOUCHEND:"touchend",TOUCHMOVE:"touchmove",TOGGLE:"toggle"},cA=[A.MOUSEENTER,A.MOUSELEAVE,"pointerenter","pointerleave"],fH=[A.CLICK,A.DBLCLICK,A.FOCUSIN,A.FOCUSOUT,A.KEYDOWN,A.KEYUP,A.KEYPRESS,A.MOUSEOVER,A.MOUSEOUT,A.SUBMIT,A.TOUCHSTART,A.TOUCHEND,A.TOUCHMOVE,"touchcancel","auxclick","change","compositionstart","compositionupdate","compositionend","beforeinput","input","select","copy","cut","paste","mousedown","mouseup","wheel","contextmenu","dragover","dragenter","dragleave","drop","dragstart","dragend","pointerdown","pointermove","pointerup","pointercancel","pointerover","pointerout","gotpointercapture","lostpointercapture","ended","loadedmetadata","pagehide","pageshow","visibilitychange","beforematch"],lA=[A.FOCUS,A.BLUR,A.ERROR,A.LOAD,A.TOGGLE],$h=e=>lA.indexOf(e)>=0;function dA(e){return e===A.MOUSEENTER?A.MOUSEOVER:e===A.MOUSELEAVE?A.MOUSEOUT:e===A.POINTERENTER?A.POINTEROVER:e===A.POINTERLEAVE?A.POINTEROUT:e}function uA(e,n,t,i){let r=!1;$h(n)&&(r=!0);let o=typeof i=="boolean"?{capture:r,passive:i}:r;return e.addEventListener(n,t,o),{eventType:n,handler:t,capture:r,passive:i}}function fA(e,n){if(e.removeEventListener){let t=typeof n.passive=="boolean"?{capture:n.capture}:n.capture;e.removeEventListener(n.eventType,n.handler,t)}else e.detachEvent&&e.detachEvent(`on${n.eventType}`,n.handler)}function hA(e){e.preventDefault?e.preventDefault():e.returnValue=!1}var sw=typeof navigator<"u"&&/Macintosh/.test(navigator.userAgent);function pA(e){return e.which===2||e.which==null&&e.button===4}function mA(e){return sw&&e.metaKey||!sw&&e.ctrlKey||pA(e)||e.shiftKey}function gA(e,n,t){let i=e.relatedTarget;return(e.type===A.MOUSEOVER&&n===A.MOUSEENTER||e.type===A.MOUSEOUT&&n===A.MOUSELEAVE||e.type===A.POINTEROVER&&n===A.POINTERENTER||e.type===A.POINTEROUT&&n===A.POINTERLEAVE)&&(!i||i!==t&&!t.contains(i))}function vA(e,n){let t={};for(let i in e){if(i==="srcElement"||i==="target")continue;let r=i,o=e[r];typeof o!="function"&&(t[r]=o)}return e.type===A.MOUSEOVER?t.type=A.MOUSEENTER:e.type===A.MOUSEOUT?t.type=A.MOUSELEAVE:e.type===A.POINTEROVER?t.type=A.POINTERENTER:t.type=A.POINTERLEAVE,t.target=t.srcElement=n,t.bubbles=!1,t._originalEvent=e,t}var gl=class{element;handlerInfos=[];constructor(n){this.element=n}addEventListener(n,t,i){this.handlerInfos.push(uA(this.element,n,t(this.element),i))}cleanUp(){for(let n=0;n<this.handlerInfos.length;n++)fA(this.element,this.handlerInfos[n]);this.handlerInfos=[]}},bA={EVENT_ACTION_SEPARATOR:":"};function wi(e){return e.eventType}function zh(e,n){e.eventType=n}function pl(e){return e.event}function lw(e,n){e.event=n}function dw(e){return e.targetElement}function uw(e,n){e.targetElement=n}function fw(e){return e.eic}function yA(e,n){e.eic=n}function _A(e){return e.timeStamp}function wA(e,n){e.timeStamp=n}function ml(e){return e.eia}function hw(e,n,t){e.eia=[n,t]}function Bh(e){e.eia=void 0}function hl(e){return e[1]}function EA(e){return e.eirp}function pw(e,n){e.eirp=n}function mw(e){return e.eir}function gw(e,n){e.eir=n}function vw(e){return{eventType:e.eventType,event:e.event,targetElement:e.targetElement,eic:e.eic,eia:e.eia,timeStamp:e.timeStamp,eirp:e.eirp,eiack:e.eiack,eir:e.eir}}function DA(e,n,t,i,r,o,s,a){return{eventType:e,event:n,targetElement:t,eic:i,timeStamp:r,eia:o,eirp:s,eiack:a}}var Vh=class e{eventInfo;constructor(n){this.eventInfo=n}getEventType(){return wi(this.eventInfo)}setEventType(n){zh(this.eventInfo,n)}getEvent(){return pl(this.eventInfo)}setEvent(n){lw(this.eventInfo,n)}getTargetElement(){return dw(this.eventInfo)}setTargetElement(n){uw(this.eventInfo,n)}getContainer(){return fw(this.eventInfo)}setContainer(n){yA(this.eventInfo,n)}getTimestamp(){return _A(this.eventInfo)}setTimestamp(n){wA(this.eventInfo,n)}getAction(){let n=ml(this.eventInfo);if(n)return{name:n[0],element:n[1]}}setAction(n){if(!n){Bh(this.eventInfo);return}hw(this.eventInfo,n.name,n.element)}getIsReplay(){return EA(this.eventInfo)}setIsReplay(n){pw(this.eventInfo,n)}getResolved(){return mw(this.eventInfo)}setResolved(n){gw(this.eventInfo,n)}clone(){return new e(vw(this.eventInfo))}},CA={},IA=/\s*;\s*/,SA=A.CLICK,jh=class{a11yClickSupport=!1;clickModSupport=!0;syntheticMouseEventSupport;updateEventInfoForA11yClick=void 0;preventDefaultForA11yClick=void 0;populateClickOnlyAction=void 0;constructor({syntheticMouseEventSupport:n=!1,clickModSupport:t=!0}={}){this.syntheticMouseEventSupport=n,this.clickModSupport=t}resolveEventType(n){this.clickModSupport&&wi(n)===A.CLICK&&mA(pl(n))?zh(n,A.CLICKMOD):this.a11yClickSupport&&this.updateEventInfoForA11yClick(n)}resolveAction(n){mw(n)||(this.populateAction(n,dw(n)),gw(n,!0))}resolveParentAction(n){let t=ml(n),i=t&&hl(t);Bh(n);let r=i&&this.getParentNode(i);r&&this.populateAction(n,r)}populateAction(n,t){let i=t;for(;i&&i!==fw(n)&&(i.nodeType===Node.ELEMENT_NODE&&this.populateActionOnElement(i,n),!ml(n));)i=this.getParentNode(i);let r=ml(n);if(r&&(this.a11yClickSupport&&this.preventDefaultForA11yClick(n),this.syntheticMouseEventSupport&&(wi(n)===A.MOUSEENTER||wi(n)===A.MOUSELEAVE||wi(n)===A.POINTERENTER||wi(n)===A.POINTERLEAVE)))if(gA(pl(n),wi(n),hl(r))){let o=vA(pl(n),hl(r));lw(n,o),uw(n,hl(r))}else Bh(n)}getParentNode(n){let t=n[Hh.OWNER];if(t)return t;let i=n.parentNode;return i?.nodeName==="#document-fragment"?i?.host??null:i}populateActionOnElement(n,t){let i=this.parseActions(n),r=i[wi(t)];r!==void 0&&hw(t,r,n),this.a11yClickSupport&&this.populateClickOnlyAction(n,t,i)}parseActions(n){let t=oA(n);if(!t){let i=n.getAttribute(bc.JSACTION);if(!i)t=CA,ow(n,t);else{if(t=sA(i),!t){t={};let r=i.split(IA);for(let o=0;o<r.length;o++){let s=r[o];if(!s)continue;let a=s.indexOf(bA.EVENT_ACTION_SEPARATOR),c=a!==-1,l=c?s.substr(0,a).trim():SA,d=c?s.substr(a+1).trim():s;t[l]=d}aA(i,t)}ow(n,t)}}return t}addA11yClickSupport(n,t,i){this.a11yClickSupport=!0,this.updateEventInfoForA11yClick=n,this.preventDefaultForA11yClick=t,this.populateClickOnlyAction=i}},bw=(function(e){return e[e.I_AM_THE_JSACTION_FRAMEWORK=0]="I_AM_THE_JSACTION_FRAMEWORK",e})(bw||{}),Uh=class{dispatchDelegate;actionResolver;eventReplayer;eventReplayScheduled=!1;replayEventInfoWrappers=[];constructor(n,{actionResolver:t,eventReplayer:i}={}){this.dispatchDelegate=n,this.actionResolver=t,this.eventReplayer=i}dispatch(n){let t=new Vh(n);this.actionResolver?.resolveEventType(n),this.actionResolver?.resolveAction(n);let i=t.getAction();if(i&&xA(i.element,t)&&hA(t.getEvent()),this.eventReplayer&&t.getIsReplay()){this.scheduleEventInfoWrapperReplay(t);return}this.dispatchDelegate(t)}scheduleEventInfoWrapperReplay(n){this.replayEventInfoWrappers.push(n),!this.eventReplayScheduled&&(this.eventReplayScheduled=!0,Promise.resolve().then(()=>{this.eventReplayScheduled=!1,this.eventReplayer(this.replayEventInfoWrappers)}))}};function xA(e,n){return e.tagName==="A"&&(n.getEventType()===A.CLICK||n.getEventType()===A.CLICKMOD)}var yw=Symbol.for("propagationStopped"),Gh={REPLAY:101};var TA="`preventDefault` called during event replay.";var MA="`composedPath` called during event replay.",vl=class{dispatchDelegate;clickModSupport;actionResolver;dispatcher;constructor(n,t=!0){this.dispatchDelegate=n,this.clickModSupport=t,this.actionResolver=new jh({clickModSupport:t}),this.dispatcher=new Uh(i=>{this.dispatchToDelegate(i)},{actionResolver:this.actionResolver})}dispatch(n){this.dispatcher.dispatch(n)}dispatchToDelegate(n){for(n.getIsReplay()&&kA(n),AA(n);n.getAction();){if(NA(n),$h(n.getEventType())&&n.getAction().element!==n.getTargetElement()||(this.dispatchDelegate(n.getEvent(),n.getAction().name),RA(n)))return;this.actionResolver.resolveParentAction(n.eventInfo)}}};function AA(e){let n=e.getEvent(),t=e.getEvent().stopPropagation.bind(n),i=()=>{n[yw]=!0,t()};cr(n,"stopPropagation",i),cr(n,"stopImmediatePropagation",i)}function RA(e){return!!e.getEvent()[yw]}function kA(e){let n=e.getEvent(),t=e.getTargetElement(),i=n.preventDefault.bind(n);cr(n,"target",t),cr(n,"eventPhase",Gh.REPLAY),cr(n,"preventDefault",()=>{throw i(),new Error(TA+"")}),cr(n,"composedPath",()=>{throw new Error(MA+"")})}function NA(e){let n=e.getEvent(),t=e.getAction()?.element;t&&cr(n,"currentTarget",t,{configurable:!0})}function cr(e,n,t,{configurable:i=!1}={}){Object.defineProperty(e,n,{value:t,configurable:i})}function _w(e,n){e.ecrd(t=>{n.dispatch(t)},bw.I_AM_THE_JSACTION_FRAMEWORK)}function OA(e){return e?.q??[]}function PA(e){e&&(aw(e.c,e.et,e.h),aw(e.c,e.etc,e.h,!0))}function aw(e,n,t,i){for(let r=0;r<n.length;r++)e.removeEventListener(n[r],t,i)}var FA=!1,ww=(()=>{class e{static MOUSE_SPECIAL_SUPPORT=FA;containerManager;eventHandlers={};browserEventTypeToExtraEventTypes={};dispatcher=null;queuedEventInfos=[];constructor(t){this.containerManager=t}handleEvent(t,i,r){let o=DA(t,i,i.target,r,Date.now());this.handleEventInfo(o)}handleEventInfo(t){if(!this.dispatcher){pw(t,!0),this.queuedEventInfos?.push(t);return}this.dispatcher(t)}addEvent(t,i,r){if(t in this.eventHandlers||!this.containerManager||!e.MOUSE_SPECIAL_SUPPORT&&cA.indexOf(t)>=0)return;let o=(a,c,l)=>{this.handleEvent(a,c,l)};this.eventHandlers[t]=o;let s=dA(i||t);if(s!==t){let a=this.browserEventTypeToExtraEventTypes[s]||[];a.push(t),this.browserEventTypeToExtraEventTypes[s]=a}this.containerManager.addEventListener(s,a=>c=>{o(t,c,a)},r)}replayEarlyEvents(t=window._ejsa){t&&(this.replayEarlyEventInfos(t.q),PA(t),delete window._ejsa)}replayEarlyEventInfos(t){for(let i=0;i<t.length;i++){let r=t[i],o=this.getEventTypesForBrowserEventType(r.eventType);for(let s=0;s<o.length;s++){let a=vw(r);zh(a,o[s]),this.handleEventInfo(a)}}}getEventTypesForBrowserEventType(t){let i=[];return this.eventHandlers[t]&&i.push(t),this.browserEventTypeToExtraEventTypes[t]&&i.push(...this.browserEventTypeToExtraEventTypes[t]),i}handler(t){return this.eventHandlers[t]}cleanUp(){this.containerManager?.cleanUp(),this.containerManager=null,this.eventHandlers={},this.browserEventTypeToExtraEventTypes={},this.dispatcher=null,this.queuedEventInfos=[]}registerDispatcher(t,i){this.ecrd(t,i)}ecrd(t,i){if(this.dispatcher=t,this.queuedEventInfos?.length){for(let r=0;r<this.queuedEventInfos.length;r++)this.handleEventInfo(this.queuedEventInfos[r]);this.queuedEventInfos=null}}}return e})();function Ew(e,n=window){return OA(n._ejsas?.[e])}function Wh(e,n=window){n._ejsas&&(n._ejsas[e]=void 0)}var kw=Symbol("InputSignalNode#UNSET"),ZA=J(v({},da),{transformFn:void 0,applyValueToInputSignal(e,n){Cr(e,n)}});function Nw(e,n){let t=Object.create(ZA);t.value=e,t.transformFn=n?.transform;function i(){if(Po(t),t.value===kw){let r=null;throw new D(-950,r)}return t.value}return i[pt]=t,i}var Ei=class{attributeName;constructor(n){this.attributeName=n}__NG_ELEMENT_ID__=()=>$f(this.attributeName);toString(){return`HostAttributeToken ${this.attributeName}`}},Ow=(()=>{let e=new g("");return e.__NG_ELEMENT_ID__=n=>{let t=qe();if(t===null)throw new D(-204,!1);if(t.type&2)return t.value;if(n&8)return null;throw new D(-204,!1)},e})();function Qh(e){return KA(e)?e.default:e}function KA(e){return e&&typeof e=="object"&&"default"in e}function Dw(e,n){return Nw(e,n)}function QA(e){return Nw(kw,e)}var lr=(Dw.required=QA,Dw);var bl=new WeakSet,Cw="";function Iw(e){return e.get(Kf,zb)}function Pw(){let e=[{provide:Kf,useFactory:()=>{let n=!0;{let t=u(Tt);n=!!window._ejsas?.[t]}return n&&jt("NgEventReplay"),n}}];return e.push({provide:qn,useValue:()=>{let n=u(Pe),{injector:t}=n;if(!bl.has(n)){let i=u(Xf);if(Iw(t)){Xb();let r=t.get(Tt),o=Kb(r,(s,a,c)=>{s.nodeType===Node.ELEMENT_NODE&&(Wb(s,a,c),qb(s,i))});n.onDestroy(o)}}},multi:!0},{provide:cn,useFactory:()=>{let n=u(Pe),{injector:t}=n;return()=>{if(!Iw(t)||bl.has(n))return;bl.add(n);let i=t.get(Tt);n.onDestroy(()=>{bl.delete(n),Wh(i)}),n.whenStable().then(()=>{if(n.destroyed)return;let r=t.get(Zb);XA(r,t);let o=t.get(Xf);o.get(Cw)?.forEach(Yb),o.delete(Cw);let s=r.instance;oy(t)?n.onDestroy(()=>s.cleanUp()):s.cleanUp()})}},multi:!0}),e}var XA=(e,n)=>{let t=n.get(Tt),i=window._ejsas[t],r=e.instance=new ww(new gl(i.c));for(let a of i.et)r.addEvent(a);for(let a of i.etc)r.addEvent(a);let o=Ew(t);r.replayEarlyEventInfos(o),Wh(t);let s=new vl(a=>{JA(n,a,a.currentTarget)});_w(r,s)};function JA(e,n,t){let i=(t&&t.getAttribute(_s))??"";/d\d+/.test(i)?eR(i,e,n,t):n.eventPhase===Gh.REPLAY&&Jf(n,t)}function eR(e,n,t,i){let r=n.get(Gb);r.push({event:t,currentTarget:i}),j_(n,e,tR(r))}function tR(e){return n=>{let t=new Set(n),i=[];for(let{event:r,currentTarget:o}of e){let s=o.getAttribute(_s);t.has(s)?Jf(r,o):i.push({event:r,currentTarget:o})}e.length=0,e.push(...i)}}var Sw=!1;var nR=1e4;function iR(){Sw||(Sw=!0,ny(),U_(),X_(),H_(),P_(),C_(),c_(),Vy())}function rR(e){return e.whenStable()}function Fw(){let e=[{provide:Jr,useFactory:()=>{let n=!0;return n=!!u(vi,{optional:!0})?.get(eh,null),n&&jt("NgHydration"),n}},{provide:qn,useValue:()=>{r_(!1);let n=u(O);u(Jr)&&(cy(n),iR())},multi:!0}];return e.push({provide:Zf,useFactory:()=>u(Jr)},{provide:cn,useFactory:()=>{let n=u(_n);if(u(Jr)){let t=u(Pe);return()=>{rR(t).then(()=>{t.destroyed||(Sh(t),n.notify(7))})}}return()=>{}},multi:!0}),wn(e)}function Lw(){let e=[Pw(),{provide:Qf,useValue:!0},{provide:ws,useFactory:tw}];return e.push({provide:cn,useFactory:()=>{let n=u(ne),t=u(O);return()=>{nw(n,t)}},multi:!0}),e}var xG=nR-1e3;var qh=class{supports(n){return n instanceof Map||xh(n)}create(){return new Yh}},Yh=class{_records=new Map;_mapHead=null;_appendAfter=null;_previousMapHead=null;_changesHead=null;_changesTail=null;_additionsHead=null;_additionsTail=null;_removalsHead=null;get isDirty(){return this._additionsHead!==null||this._changesHead!==null||this._removalsHead!==null}forEachItem(n){let t;for(t=this._mapHead;t!==null;t=t._next)n(t)}forEachPreviousItem(n){let t;for(t=this._previousMapHead;t!==null;t=t._nextPrevious)n(t)}forEachChangedItem(n){let t;for(t=this._changesHead;t!==null;t=t._nextChanged)n(t)}forEachAddedItem(n){let t;for(t=this._additionsHead;t!==null;t=t._nextAdded)n(t)}forEachRemovedItem(n){let t;for(t=this._removalsHead;t!==null;t=t._nextRemoved)n(t)}diff(n){if(!n)n=new Map;else if(!(n instanceof Map||xh(n)))throw new D(900,!1);return this.check(n)?this:null}check(n){this._reset();let t=this._mapHead;if(this._appendAfter=null,this._forEach(n,(i,r)=>{if(t&&t.key===r)this._maybeAddToChanges(t,i),this._appendAfter=t,t=t._next;else{let o=this._getOrCreateRecordForKey(r,i);t=this._insertBeforeOrAppend(t,o)}}),t){t._prev&&(t._prev._next=null),this._removalsHead=t;for(let i=t;i!==null;i=i._nextRemoved)i===this._mapHead&&(this._mapHead=null),this._records.delete(i.key),i._nextRemoved=i._next,i.previousValue=i.currentValue,i.currentValue=null,i._prev=null,i._next=null}return this._changesTail&&(this._changesTail._nextChanged=null),this._additionsTail&&(this._additionsTail._nextAdded=null),this.isDirty}_insertBeforeOrAppend(n,t){if(n){let i=n._prev;return t._next=n,t._prev=i,n._prev=t,i&&(i._next=t),n===this._mapHead&&(this._mapHead=t),this._appendAfter=n,n}return this._appendAfter?(this._appendAfter._next=t,t._prev=this._appendAfter):this._mapHead=t,this._appendAfter=t,null}_getOrCreateRecordForKey(n,t){if(this._records.has(n)){let r=this._records.get(n);this._maybeAddToChanges(r,t);let o=r._prev,s=r._next;return o&&(o._next=s),s&&(s._prev=o),r._next=null,r._prev=null,r}let i=new Zh(n);return this._records.set(n,i),i.currentValue=t,this._addToAdditions(i),i}_reset(){if(this.isDirty){let n;for(this._previousMapHead=this._mapHead,n=this._previousMapHead;n!==null;n=n._next)n._nextPrevious=n._next;for(n=this._changesHead;n!==null;n=n._nextChanged)n.previousValue=n.currentValue;for(n=this._additionsHead;n!=null;n=n._nextAdded)n.previousValue=n.currentValue;this._changesHead=this._changesTail=null,this._additionsHead=this._additionsTail=null,this._removalsHead=null}}_maybeAddToChanges(n,t){Object.is(t,n.currentValue)||(n.previousValue=n.currentValue,n.currentValue=t,this._addToChanges(n))}_addToAdditions(n){this._additionsHead===null?this._additionsHead=this._additionsTail=n:(this._additionsTail._nextAdded=n,this._additionsTail=n)}_addToChanges(n){this._changesHead===null?this._changesHead=this._changesTail=n:(this._changesTail._nextChanged=n,this._changesTail=n)}_forEach(n,t){n instanceof Map?n.forEach(t):Object.keys(n).forEach(i=>t(n[i],i))}},Zh=class{key;previousValue=null;currentValue=null;_nextPrevious=null;_next=null;_prev=null;_nextAdded=null;_nextRemoved=null;_nextChanged=null;constructor(n){this.key=n}};function xw(){return new Xh([new qh])}var Xh=(()=>{class e{static \u0275prov=G({token:e,providedIn:"root",factory:xw});factories;constructor(t){this.factories=t}static create(t,i){if(i){let r=i.factories.slice();t=t.concat(r)}return new e(t)}static extend(t){return{provide:e,useFactory:()=>{let i=u(e,{optional:!0,skipSelf:!0});return e.create(t,i||xw())}}}find(t){let i=this.factories.find(r=>r.supports(t));if(i)return i;throw new D(901,!1)}}return e})(),Ie=(()=>{class e{static __NG_ELEMENT_ID__=oR}return e})();function oR(e){return sR(qe(),B(),(e&16)===16)}function sR(e,n,t){if(Xt(e)&&!t){let i=Vt(e.index,n);return new _i(i,i)}else if(e.type&175){let i=n[We];return new _i(i,n)}return null}var Kh=new g(""),aR=new g("");function xs(e){return!e.moduleRef}function cR(e){let n=xs(e)?e.r3Injector:e.moduleRef.injector,t=n.get(M);return t.run(()=>{xs(e)?e.r3Injector.resolveInjectorInitializers():e.moduleRef.resolveInjectorInitializers();let i=n.get(Jt),r;if(t.runOutsideAngular(()=>{r=t.onError.subscribe({next:i})}),xs(e)){let o=()=>n.destroy(),s=e.platformInjector.get(Kh);s.add(o),n.onDestroy(()=>{r.unsubscribe(),s.delete(o)})}else{let o=()=>e.moduleRef.destroy(),s=e.platformInjector.get(Kh);s.add(o),e.moduleRef.onDestroy(()=>{us(e.allPlatformModules,e.moduleRef),r.unsubscribe(),s.delete(o)})}return dR(i,t,()=>{let o=n.get(An),s=o.add(),a=n.get(Ah);return a.runInitializers(),a.donePromise.then(()=>{let c=n.get(Lh,Ss);if($_(c||Ss),!n.get(aR,!0))return xs(e)?n.get(Pe):(e.allPlatformModules.push(e.moduleRef),e.moduleRef);if(xs(e)){let d=n.get(Pe);return e.rootComponent!==void 0&&d.bootstrap(e.rootComponent),d}else return lR?.(e.moduleRef,e.allPlatformModules),e.moduleRef}).finally(()=>{o.remove(s)})})})}var lR;function dR(e,n,t){try{let i=t();return io(i)?i.catch(r=>{throw n.runOutsideAngular(()=>e(r)),r}):i}catch(i){throw n.runOutsideAngular(()=>e(i)),i}}var yl=null;function uR(e=[],n){return ne.create({name:n,providers:[{provide:ts,useValue:"platform"},{provide:Kh,useValue:new Set([()=>yl=null])},...e]})}function fR(e=[]){if(yl)return yl;let n=uR(e);return yl=n,B_(),hR(n),n}function hR(e){let n=e.get(gc,null);Ue(e,()=>{n?.forEach(t=>t())})}function Bw(e){let{rootComponent:n,appProviders:t,platformProviders:i,platformRef:r}=e;se(ie.BootstrapApplicationStart);try{let o=r?.injector??fR(i),s=[rw(),yv,...t||[]],a=new vs({providers:s,parent:o,debugName:"",runEnvironmentInitializers:!1});return cR({r3Injector:a.injector,platformInjector:o,rootComponent:n})}catch(o){return Promise.reject(o)}finally{se(ie.BootstrapApplicationEnd)}}function j(e){return typeof e=="boolean"?e:e!=null&&e!=="false"}function Ut(e,n=NaN){return!isNaN(parseFloat(e))&&!isNaN(Number(e))?Number(e):n}function _l(e,n){let t=Wn(e),i=n.elementInjector||Fr();return new Zr(t).create(i,n.projectableNodes,n.hostElement,n.environmentInjector,n.directives,n.bindings)}var Vw=null;function ri(){return Vw}function Jh(e){Vw??=e}var Ms=class{},wl=(()=>{class e{historyGo(t){throw new Error("")}static \u0275fac=function(i){return new(i||e)};static \u0275prov=G({token:e,factory:()=>u(jw),providedIn:"platform"})}return e})();var jw=(()=>{class e extends wl{_location;_history;_doc=u(O);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return ri().getBaseHref(this._doc)}onPopState(t){let i=ri().getGlobalEventTarget(this._doc,"window");return i.addEventListener("popstate",t,!1),()=>i.removeEventListener("popstate",t)}onHashChange(t){let i=ri().getGlobalEventTarget(this._doc,"window");return i.addEventListener("hashchange",t,!1),()=>i.removeEventListener("hashchange",t)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(t){this._location.pathname=t}pushState(t,i,r){this._history.pushState(t,i,r)}replaceState(t,i,r){this._history.replaceState(t,i,r)}forward(){this._history.forward()}back(){this._history.back()}historyGo(t=0){this._history.go(t)}getState(){return this._history.state}static \u0275fac=function(i){return new(i||e)};static \u0275prov=G({token:e,factory:()=>new e,providedIn:"platform"})}return e})();function $w(e,n){return e?n?e.endsWith("/")?n.startsWith("/")?e+n.slice(1):e+n:n.startsWith("/")?e+n:`${e}/${n}`:e:n}function Uw(e){let n=e.search(/#|\?|$/);return e[n-1]==="/"?e.slice(0,n-1)+e.slice(n):e}function Di(e){return e&&e[0]!=="?"?`?${e}`:e}var El=(()=>{class e{historyGo(t){throw new Error("")}static \u0275fac=function(i){return new(i||e)};static \u0275prov=G({token:e,factory:()=>u(mR),providedIn:"root"})}return e})(),pR=new g(""),mR=(()=>{class e extends El{_platformLocation;_baseHref;_removeListenerFns=[];constructor(t,i){super(),this._platformLocation=t,this._baseHref=i??this._platformLocation.getBaseHrefFromDOM()??u(O).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(t){this._removeListenerFns.push(this._platformLocation.onPopState(t),this._platformLocation.onHashChange(t))}getBaseHref(){return this._baseHref}prepareExternalUrl(t){return $w(this._baseHref,t)}path(t=!1){let i=this._platformLocation.pathname+Di(this._platformLocation.search),r=this._platformLocation.hash;return r&&t?`${i}${r}`:i}pushState(t,i,r,o){let s=this.prepareExternalUrl(r+Di(o));this._platformLocation.pushState(t,i,s)}replaceState(t,i,r,o){let s=this.prepareExternalUrl(r+Di(o));this._platformLocation.replaceState(t,i,s)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(t=0){this._platformLocation.historyGo?.(t)}static \u0275fac=function(i){return new(i||e)(P(wl),P(pR,8))};static \u0275prov=G({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var Ci=(()=>{class e{_subject=new I;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(t){this._locationStrategy=t;let i=this._locationStrategy.getBaseHref();this._basePath=bR(Uw(Hw(i))),this._locationStrategy.onPopState(r=>{this._subject.next({url:this.path(!0),pop:!0,state:r.state,type:r.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(t=!1){return this.normalize(this._locationStrategy.path(t))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(t,i=""){return this.path()==this.normalize(t+Di(i))}normalize(t){return e.stripTrailingSlash(vR(this._basePath,Hw(t)))}prepareExternalUrl(t){return t&&t[0]!=="/"&&(t="/"+t),this._locationStrategy.prepareExternalUrl(t)}go(t,i="",r=null){this._locationStrategy.pushState(r,"",t,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(t+Di(i)),r)}replaceState(t,i="",r=null){this._locationStrategy.replaceState(r,"",t,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(t+Di(i)),r)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(t=0){this._locationStrategy.historyGo?.(t)}onUrlChange(t){return this._urlChangeListeners.push(t),this._urlChangeSubscription??=this.subscribe(i=>{this._notifyUrlChangeListeners(i.url,i.state)}),()=>{let i=this._urlChangeListeners.indexOf(t);this._urlChangeListeners.splice(i,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(t="",i){this._urlChangeListeners.forEach(r=>r(t,i))}subscribe(t,i,r){return this._subject.subscribe({next:t,error:i??void 0,complete:r??void 0})}static normalizeQueryParams=Di;static joinWithSlash=$w;static stripTrailingSlash=Uw;static \u0275fac=function(i){return new(i||e)(P(El))};static \u0275prov=G({token:e,factory:()=>gR(),providedIn:"root"})}return e})();function gR(){return new Ci(P(El))}function vR(e,n){if(!e||!n.startsWith(e))return n;let t=n.substring(e.length);return t===""||["/",";","?","#"].includes(t[0])?t:n}function Hw(e){return e.replace(/\/index\.html$/,"")}function bR(e){if(new RegExp("^(https?:)?//").test(e)){let[,t]=e.split(/\/\/[^\/]+/);return t}return e}var ep=(()=>{class e{transform(t){return JSON.stringify(t,null,2)}static \u0275fac=function(i){return new(i||e)};static \u0275pipe=cl({name:"json",type:e,pure:!1})}return e})();function _R(e,n){return{key:e,value:n}}var tp=(()=>{class e{differs;constructor(t){this.differs=t}differ;keyValues=[];compareFn=zw;transform(t,i=zw){if(!t||!(t instanceof Map)&&typeof t!="object")return null;this.differ??=this.differs.find(t).create();let r=this.differ.diff(t),o=i!==this.compareFn;return r&&(this.keyValues=[],r.forEachItem(s=>{this.keyValues.push(_R(s.key,s.currentValue))})),(r||o)&&(i&&this.keyValues.sort(i),this.compareFn=i),this.keyValues}static \u0275fac=function(i){return new(i||e)(rr(Xh,16))};static \u0275pipe=cl({name:"keyvalue",type:e,pure:!1})}return e})();function zw(e,n){let t=e.key,i=n.key;if(t===i)return 0;if(t==null)return 1;if(i==null)return-1;if(typeof t=="string"&&typeof i=="string")return t<i?-1:1;if(typeof t=="number"&&typeof i=="number")return t-i;if(typeof t=="boolean"&&typeof i=="boolean")return t<i?-1:1;let r=String(t),o=String(i);return r==o?0:r<o?-1:1}function np(e,n){n=encodeURIComponent(n);for(let t of e.split(";")){let i=t.indexOf("="),[r,o]=i==-1?[t,""]:[t.slice(0,i),t.slice(i+1)];if(r.trim()===n)return decodeURIComponent(o)}return null}var ip="browser";function Gw(e){return e===ip}var As=class{_doc;constructor(n){this._doc=n}manager},Dl=(()=>{class e extends As{constructor(t){super(t)}supports(t){return!0}addEventListener(t,i,r,o){return t.addEventListener(i,r,o),()=>this.removeEventListener(t,i,r,o)}removeEventListener(t,i,r,o){return t.removeEventListener(i,r,o)}static \u0275fac=function(i){return new(i||e)(P(O))};static \u0275prov=G({token:e,factory:e.\u0275fac})}return e})(),Sl=new g(""),ap=(()=>{class e{_zone;_plugins;_eventNameToPlugin=new Map;constructor(t,i){this._zone=i,t.forEach(s=>{s.manager=this});let r=t.filter(s=>!(s instanceof Dl));this._plugins=r.slice().reverse();let o=t.find(s=>s instanceof Dl);o&&this._plugins.push(o)}addEventListener(t,i,r,o){return this._findPluginFor(i).addEventListener(t,i,r,o)}getZone(){return this._zone}_findPluginFor(t){let i=this._eventNameToPlugin.get(t);if(i)return i;if(i=this._plugins.find(o=>o.supports(t)),!i)throw new D(5101,!1);return this._eventNameToPlugin.set(t,i),i}static \u0275fac=function(i){return new(i||e)(P(Sl),P(M))};static \u0275prov=G({token:e,factory:e.\u0275fac})}return e})(),rp="ng-app-id";function Ww(e){for(let n of e)n.remove()}function qw(e,n){let t=n.createElement("style");return t.textContent=e,t}function DR(e,n,t,i){let r=e.head?.querySelectorAll(`style[${rp}="${n}"],link[${rp}="${n}"]`);if(!r||r.length===0)return!1;for(let o of r)o.removeAttribute(rp),o instanceof HTMLLinkElement?i.set(o.href.slice(o.href.lastIndexOf("/")+1),{usage:0,elements:[o]}):o.textContent&&t.set(o.textContent,{usage:0,elements:[o]});return!0}function sp(e,n){let t=n.createElement("link");return t.setAttribute("rel","stylesheet"),t.setAttribute("href",e),t}var cp=(()=>{class e{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(t,i,r,o={}){this.doc=t,this.appId=i,this.nonce=r,DR(t,i,this.inline,this.external)&&this.hosts.add(t.head)}addStyles(t,i){for(let r of t)this.addUsage(r,this.inline,qw);i?.forEach(r=>this.addUsage(r,this.external,sp))}removeStyles(t,i){for(let r of t)this.removeUsage(r,this.inline);i?.forEach(r=>this.removeUsage(r,this.external))}addUsage(t,i,r){let o=i.get(t);o?o.usage++:i.set(t,{usage:1,elements:[...this.hosts].map(s=>this.addElement(s,r(t,this.doc)))})}removeUsage(t,i){let r=i.get(t);r&&(r.usage--,r.usage<=0&&(Ww(r.elements),i.delete(t)))}ngOnDestroy(){for(let[,{elements:t}]of[...this.inline,...this.external])Ww(t);this.hosts.clear()}addHost(t){if(!this.hosts.has(t)){this.hosts.add(t);for(let[i,{elements:r}]of this.inline)r.push(this.addElement(t,qw(i,this.doc)));for(let[i,{elements:r}]of this.external)r.push(this.addElement(t,sp(i,this.doc)))}}removeHost(t){this.hosts.delete(t);for(let i of[...this.inline.values(),...this.external.values()]){let r=[];for(let o of i.elements)o.parentNode===t?o.remove():r.push(o);i.elements=r}}addElement(t,i){return this.nonce&&i.setAttribute("nonce",this.nonce),t.appendChild(i)}static \u0275fac=function(i){return new(i||e)(P(O),P(Tt),P(Ki,8),P(Zi))};static \u0275prov=G({token:e,factory:e.\u0275fac})}return e})(),op={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},lp=/%COMP%/g;var Zw="%COMP%",CR=`_nghost-${Zw}`,IR=`_ngcontent-${Zw}`,SR=!0,xR=new g("",{factory:()=>SR});function TR(e){return IR.replace(lp,e)}function MR(e){return CR.replace(lp,e)}function Kw(e,n){return n.map(t=>t.replace(lp,e))}var dp=(()=>{class e{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;constructor(t,i,r,o,s,a,c=null,l=null){this.eventManager=t,this.sharedStylesHost=i,this.appId=r,this.removeStylesOnCompDestroy=o,this.doc=s,this.ngZone=a,this.nonce=c,this.tracingService=l,this.defaultRenderer=new Rs(t,s,a,this.tracingService)}createRenderer(t,i){if(!t||!i)return this.defaultRenderer;let r=this.getOrCreateRenderer(t,i);return r instanceof Il?r.applyToHost(t):r instanceof ks&&r.applyStyles(),r}getOrCreateRenderer(t,i){let r=this.rendererByCompId,o=r.get(i.id);if(!o){let s=this.doc,a=this.ngZone,c=this.eventManager,l=this.sharedStylesHost,d=this.removeStylesOnCompDestroy,f=this.tracingService;switch(i.encapsulation){case rn.Emulated:o=new Il(c,l,i,this.appId,d,s,a,f);break;case rn.ShadowDom:return new Cl(c,t,i,s,a,this.nonce,f,l);case rn.ExperimentalIsolatedShadowDom:return new Cl(c,t,i,s,a,this.nonce,f);default:o=new ks(c,l,i,d,s,a,f);break}r.set(i.id,o)}return o}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(t){this.rendererByCompId.delete(t)}static \u0275fac=function(i){return new(i||e)(P(ap),P(ir),P(Tt),P(xR),P(O),P(M),P(Ki),P(ni,8))};static \u0275prov=G({token:e,factory:e.\u0275fac})}return e})(),Rs=class{eventManager;doc;ngZone;tracingService;data=Object.create(null);throwOnSyntheticProps=!0;constructor(n,t,i,r){this.eventManager=n,this.doc=t,this.ngZone=i,this.tracingService=r}destroy(){}destroyNode=null;createElement(n,t){return t?this.doc.createElementNS(op[t]||t,n):this.doc.createElement(n)}createComment(n){return this.doc.createComment(n)}createText(n){return this.doc.createTextNode(n)}appendChild(n,t){(Yw(n)?n.content:n).appendChild(t)}insertBefore(n,t,i){n&&(Yw(n)?n.content:n).insertBefore(t,i)}removeChild(n,t){t.remove()}selectRootElement(n,t){let i=typeof n=="string"?this.doc.querySelector(n):n;if(!i)throw new D(-5104,!1);return t||(i.textContent=""),i}parentNode(n){return n.parentNode}nextSibling(n){return n.nextSibling}setAttribute(n,t,i,r){if(r){t=r+":"+t;let o=op[r];o?n.setAttributeNS(o,t,i):n.setAttribute(t,i)}else n.setAttribute(t,i)}removeAttribute(n,t,i){if(i){let r=op[i];r?n.removeAttributeNS(r,t):n.removeAttribute(`${i}:${t}`)}else n.removeAttribute(t)}addClass(n,t){n.classList.add(t)}removeClass(n,t){n.classList.remove(t)}setStyle(n,t,i,r){r&(Xn.DashCase|Xn.Important)?n.style.setProperty(t,i,r&Xn.Important?"important":""):n.style[t]=i}removeStyle(n,t,i){i&Xn.DashCase?n.style.removeProperty(t):n.style[t]=""}setProperty(n,t,i){n!=null&&(n[t]=i)}setValue(n,t){n.nodeValue=t}listen(n,t,i,r){if(typeof n=="string"&&(n=ri().getGlobalEventTarget(this.doc,n),!n))throw new D(5102,!1);let o=this.decoratePreventDefault(i);return this.tracingService?.wrapEventListener&&(o=this.tracingService.wrapEventListener(n,t,o)),this.eventManager.addEventListener(n,t,o,r)}decoratePreventDefault(n){return t=>{if(t==="__ngUnwrap__")return n;n(t)===!1&&t.preventDefault()}}};function Yw(e){return e.tagName==="TEMPLATE"&&e.content!==void 0}var Cl=class extends Rs{hostEl;sharedStylesHost;shadowRoot;constructor(n,t,i,r,o,s,a,c){super(n,r,o,a),this.hostEl=t,this.sharedStylesHost=c,this.shadowRoot=t.attachShadow({mode:"open"}),this.sharedStylesHost&&this.sharedStylesHost.addHost(this.shadowRoot);let l=i.styles;l=Kw(i.id,l);for(let f of l){let h=document.createElement("style");s&&h.setAttribute("nonce",s),h.textContent=f,this.shadowRoot.appendChild(h)}let d=i.getExternalStyles?.();if(d)for(let f of d){let h=sp(f,r);s&&h.setAttribute("nonce",s),this.shadowRoot.appendChild(h)}}nodeOrShadowRoot(n){return n===this.hostEl?this.shadowRoot:n}appendChild(n,t){return super.appendChild(this.nodeOrShadowRoot(n),t)}insertBefore(n,t,i){return super.insertBefore(this.nodeOrShadowRoot(n),t,i)}removeChild(n,t){return super.removeChild(null,t)}parentNode(n){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(n)))}destroy(){this.sharedStylesHost&&this.sharedStylesHost.removeHost(this.shadowRoot)}},ks=class extends Rs{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(n,t,i,r,o,s,a,c){super(n,o,s,a),this.sharedStylesHost=t,this.removeStylesOnCompDestroy=r;let l=i.styles;this.styles=c?Kw(c,l):l,this.styleUrls=i.getExternalStyles?.(c)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&yi.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},Il=class extends ks{contentAttr;hostAttr;constructor(n,t,i,r,o,s,a,c){let l=r+"-"+i.id;super(n,t,i,o,s,a,c,l),this.contentAttr=TR(l),this.hostAttr=MR(l)}applyToHost(n){this.applyStyles(),this.setAttribute(n,this.hostAttr,"")}createElement(n,t){let i=super.createElement(n,t);return super.setAttribute(i,this.contentAttr,""),i}};var xl=class e extends Ms{supportsDOMEvents=!0;static makeCurrent(){Jh(new e)}onAndCancel(n,t,i,r){return n.addEventListener(t,i,r),()=>{n.removeEventListener(t,i,r)}}dispatchEvent(n,t){n.dispatchEvent(t)}remove(n){n.remove()}createElement(n,t){return t=t||this.getDefaultDocument(),t.createElement(n)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(n){return n.nodeType===Node.ELEMENT_NODE}isShadowRoot(n){return n instanceof DocumentFragment}getGlobalEventTarget(n,t){return t==="window"?window:t==="document"?n:t==="body"?n.body:null}getBaseHref(n){let t=AR();return t==null?null:RR(t)}resetBaseElement(){Ns=null}getUserAgent(){return window.navigator.userAgent}getCookie(n){return np(document.cookie,n)}},Ns=null;function AR(){return Ns=Ns||document.head.querySelector("base"),Ns?Ns.getAttribute("href"):null}function RR(e){return new URL(e,document.baseURI).pathname}var Qw=["alt","control","meta","shift"],kR={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},NR={alt:e=>e.altKey,control:e=>e.ctrlKey,meta:e=>e.metaKey,shift:e=>e.shiftKey},Xw=(()=>{class e extends As{constructor(t){super(t)}supports(t){return e.parseEventName(t)!=null}addEventListener(t,i,r,o){let s=e.parseEventName(i),a=e.eventCallback(s.fullKey,r,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>ri().onAndCancel(t,s.domEventName,a,o))}static parseEventName(t){let i=t.toLowerCase().split("."),r=i.shift();if(i.length===0||!(r==="keydown"||r==="keyup"))return null;let o=e._normalizeKey(i.pop()),s="",a=i.indexOf("code");if(a>-1&&(i.splice(a,1),s="code."),Qw.forEach(l=>{let d=i.indexOf(l);d>-1&&(i.splice(d,1),s+=l+".")}),s+=o,i.length!=0||o.length===0)return null;let c={};return c.domEventName=r,c.fullKey=s,c}static matchEventFullKeyCode(t,i){let r=kR[t.key]||t.key,o="";return i.indexOf("code.")>-1&&(r=t.code,o="code."),r==null||!r?!1:(r=r.toLowerCase(),r===" "?r="space":r==="."&&(r="dot"),Qw.forEach(s=>{if(s!==r){let a=NR[s];a(t)&&(o+=s+".")}}),o+=r,o===i)}static eventCallback(t,i,r){return o=>{e.matchEventFullKeyCode(o,t)&&r.runGuarded(()=>i(o))}}static _normalizeKey(t){return t==="esc"?"escape":t}static \u0275fac=function(i){return new(i||e)(P(O))};static \u0275prov=G({token:e,factory:e.\u0275fac})}return e})();async function up(e,n,t){let i=v({rootComponent:e},OR(n,t));return Bw(i)}function OR(e,n){return{platformRef:n?.platformRef,appProviders:[...VR,...e?.providers??[]],platformProviders:BR}}function PR(){xl.makeCurrent()}function FR(){return new Kt}function LR(){return Gf(document),document}var BR=[{provide:Zi,useValue:ip},{provide:gc,useValue:PR,multi:!0},{provide:O,useFactory:LR}];var VR=[{provide:ts,useValue:"root"},{provide:Kt,useFactory:FR},{provide:Sl,useClass:Dl,multi:!0},{provide:Sl,useClass:Xw,multi:!0},dp,{provide:ir,useClass:cp},{provide:cp,useExisting:ir},ap,{provide:$e,useExisting:dp},[]];var On=class e{headers;normalizedNames=new Map;lazyInit;lazyUpdate=null;constructor(n){n?typeof n=="string"?this.lazyInit=()=>{this.headers=new Map,n.split(`
`).forEach(t=>{let i=t.indexOf(":");if(i>0){let r=t.slice(0,i),o=t.slice(i+1).trim();this.addHeaderEntry(r,o)}})}:typeof Headers<"u"&&n instanceof Headers?(this.headers=new Map,n.forEach((t,i)=>{this.addHeaderEntry(i,t)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(n).forEach(([t,i])=>{this.setHeaderEntries(t,i)})}:this.headers=new Map}has(n){return this.init(),this.headers.has(n.toLowerCase())}get(n){this.init();let t=this.headers.get(n.toLowerCase());return t&&t.length>0?t[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(n){return this.init(),this.headers.get(n.toLowerCase())||null}append(n,t){return this.clone({name:n,value:t,op:"a"})}set(n,t){return this.clone({name:n,value:t,op:"s"})}delete(n,t){return this.clone({name:n,value:t,op:"d"})}maybeSetNormalizedName(n,t){this.normalizedNames.has(t)||this.normalizedNames.set(t,n)}init(){this.lazyInit&&(this.lazyInit instanceof e?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(n=>this.applyUpdate(n)),this.lazyUpdate=null))}copyFrom(n){n.init(),Array.from(n.headers.keys()).forEach(t=>{this.headers.set(t,n.headers.get(t)),this.normalizedNames.set(t,n.normalizedNames.get(t))})}clone(n){let t=new e;return t.lazyInit=this.lazyInit&&this.lazyInit instanceof e?this.lazyInit:this,t.lazyUpdate=(this.lazyUpdate||[]).concat([n]),t}applyUpdate(n){let t=n.name.toLowerCase();switch(n.op){case"a":case"s":let i=n.value;if(typeof i=="string"&&(i=[i]),i.length===0)return;this.maybeSetNormalizedName(n.name,t);let r=(n.op==="a"?this.headers.get(t):void 0)||[];r.push(...i),this.headers.set(t,r);break;case"d":let o=n.value;if(!o)this.headers.delete(t),this.normalizedNames.delete(t);else{let s=this.headers.get(t);if(!s)return;s=s.filter(a=>o.indexOf(a)===-1),s.length===0?(this.headers.delete(t),this.normalizedNames.delete(t)):this.headers.set(t,s)}break}}addHeaderEntry(n,t){let i=n.toLowerCase();this.maybeSetNormalizedName(n,i),this.headers.has(i)?this.headers.get(i).push(t):this.headers.set(i,[t])}setHeaderEntries(n,t){let i=(Array.isArray(t)?t:[t]).map(o=>o.toString()),r=n.toLowerCase();this.headers.set(r,i),this.maybeSetNormalizedName(n,r)}forEach(n){this.init(),Array.from(this.normalizedNames.keys()).forEach(t=>n(this.normalizedNames.get(t),this.headers.get(t)))}};var pp=class{map=new Map;set(n,t){return this.map.set(n,t),this}get(n){return this.map.has(n)||this.map.set(n,n.defaultValue()),this.map.get(n)}delete(n){return this.map.delete(n),this}has(n){return this.map.has(n)}keys(){return this.map.keys()}},mp=class{encodeKey(n){return Jw(n)}encodeValue(n){return Jw(n)}decodeKey(n){return decodeURIComponent(n)}decodeValue(n){return decodeURIComponent(n)}};function jR(e,n){let t=new Map;return e.length>0&&e.replace(/^\?/,"").split("&").forEach(r=>{let o=r.indexOf("="),[s,a]=o==-1?[n.decodeKey(r),""]:[n.decodeKey(r.slice(0,o)),n.decodeValue(r.slice(o+1))],c=t.get(s)||[];c.push(a),t.set(s,c)}),t}var UR=/%(\d[a-f0-9])/gi,HR={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function Jw(e){return encodeURIComponent(e).replace(UR,(n,t)=>HR[t]??n)}function Tl(e){return`${e}`}var oi=class e{map;encoder;updates=null;cloneFrom=null;constructor(n={}){if(this.encoder=n.encoder||new mp,n.fromString){if(n.fromObject)throw new D(2805,!1);this.map=jR(n.fromString,this.encoder)}else n.fromObject?(this.map=new Map,Object.keys(n.fromObject).forEach(t=>{let i=n.fromObject[t],r=Array.isArray(i)?i.map(Tl):[Tl(i)];this.map.set(t,r)})):this.map=null}has(n){return this.init(),this.map.has(n)}get(n){this.init();let t=this.map.get(n);return t?t[0]:null}getAll(n){return this.init(),this.map.get(n)||null}keys(){return this.init(),Array.from(this.map.keys())}append(n,t){return this.clone({param:n,value:t,op:"a"})}appendAll(n){let t=[];return Object.keys(n).forEach(i=>{let r=n[i];Array.isArray(r)?r.forEach(o=>{t.push({param:i,value:o,op:"a"})}):t.push({param:i,value:r,op:"a"})}),this.clone(t)}set(n,t){return this.clone({param:n,value:t,op:"s"})}delete(n,t){return this.clone({param:n,value:t,op:"d"})}toString(){return this.init(),this.keys().map(n=>{let t=this.encoder.encodeKey(n);return this.map.get(n).map(i=>t+"="+this.encoder.encodeValue(i)).join("&")}).filter(n=>n!=="").join("&")}clone(n){let t=new e({encoder:this.encoder});return t.cloneFrom=this.cloneFrom||this,t.updates=(this.updates||[]).concat(n),t}init(){this.map===null&&(this.map=new Map),this.cloneFrom!==null&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(n=>this.map.set(n,this.cloneFrom.map.get(n))),this.updates.forEach(n=>{switch(n.op){case"a":case"s":let t=(n.op==="a"?this.map.get(n.param):void 0)||[];t.push(Tl(n.value)),this.map.set(n.param,t);break;case"d":if(n.value!==void 0){let i=this.map.get(n.param)||[],r=i.indexOf(Tl(n.value));r!==-1&&i.splice(r,1),i.length>0?this.map.set(n.param,i):this.map.delete(n.param)}else{this.map.delete(n.param);break}}}),this.cloneFrom=this.updates=null)}};function $R(e){switch(e){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}function eE(e){return typeof ArrayBuffer<"u"&&e instanceof ArrayBuffer}function tE(e){return typeof Blob<"u"&&e instanceof Blob}function nE(e){return typeof FormData<"u"&&e instanceof FormData}function zR(e){return typeof URLSearchParams<"u"&&e instanceof URLSearchParams}var fp="Content-Type",iE="Accept",oE="text/plain",sE="application/json",GR=`${sE}, ${oE}, */*`,uo=class e{url;body=null;headers;context;reportProgress=!1;reportUploadProgress=!1;reportDownloadProgress=!1;withCredentials=!1;credentials;keepalive=!1;cache;priority;mode;redirect;referrer;integrity;referrerPolicy;responseType="json";method;params;urlWithParams;transferCache;timeout;constructor(n,t,i,r){this.url=t,this.method=n.toUpperCase();let o;if($R(this.method)||r?(this.body=i!==void 0?i:null,o=r):o=i,o){if(this.reportProgress=!!o.reportProgress,this.reportUploadProgress=!!o.reportUploadProgress,this.reportDownloadProgress=!!o.reportDownloadProgress,this.withCredentials=!!o.withCredentials,this.keepalive=!!o.keepalive,o.responseType&&(this.responseType=o.responseType),o.headers&&(this.headers=o.headers),o.context&&(this.context=o.context),o.params&&(this.params=o.params),o.priority&&(this.priority=o.priority),o.cache&&(this.cache=o.cache),o.credentials&&(this.credentials=o.credentials),typeof o.timeout=="number"){if(o.timeout<1||!Number.isInteger(o.timeout))throw new D(2822,"");this.timeout=o.timeout}o.mode&&(this.mode=o.mode),o.redirect&&(this.redirect=o.redirect),o.integrity&&(this.integrity=o.integrity),o.referrer!==void 0&&(this.referrer=o.referrer),o.referrerPolicy&&(this.referrerPolicy=o.referrerPolicy),this.transferCache=o.transferCache}if(this.headers??=new On,this.context??=new pp,!this.params)this.params=new oi,this.urlWithParams=t;else{let s=this.params.toString();if(s.length===0)this.urlWithParams=t;else{let a=t,c="",l=t.indexOf("#");l!==-1&&(c=t.substring(l),a=t.substring(0,l));let d=a.indexOf("?"),f=d===-1?"?":d<a.length-1?"&":"";this.urlWithParams=a+f+s+c}}}serializeBody(){return this.body===null?null:typeof this.body=="string"||eE(this.body)||tE(this.body)||nE(this.body)||zR(this.body)?this.body:this.body instanceof oi?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||nE(this.body)?null:tE(this.body)?this.body.type||null:eE(this.body)?null:typeof this.body=="string"?oE:this.body instanceof oi?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?sE:null}clone(n={}){let t=n.method||this.method,i=n.url||this.url,r=n.responseType||this.responseType,o=n.keepalive??this.keepalive,s=n.priority||this.priority,a=n.cache||this.cache,c=n.mode||this.mode,l=n.redirect||this.redirect,d=n.credentials||this.credentials,f=n.referrer??this.referrer,h=n.integrity||this.integrity,p=n.referrerPolicy||this.referrerPolicy,m=n.transferCache??this.transferCache,y=n.timeout??this.timeout,E=n.body!==void 0?n.body:this.body,T=n.withCredentials??this.withCredentials,$=n.reportProgress??this.reportProgress,ve=n.reportUploadProgress??this.reportUploadProgress,Pt=n.reportDownloadProgress??this.reportDownloadProgress,Fn=n.headers||this.headers,Le=n.params||this.params,Ln=n.context??this.context;return n.setHeaders!==void 0&&(Fn=Object.keys(n.setHeaders).reduce((Wt,qt)=>Wt.set(qt,n.setHeaders[qt]),Fn)),n.setParams&&(Le=Object.keys(n.setParams).reduce((Wt,qt)=>Wt.set(qt,n.setParams[qt]),Le)),new e(t,i,E,{params:Le,headers:Fn,context:Ln,reportProgress:$,reportUploadProgress:ve,reportDownloadProgress:Pt,responseType:r,withCredentials:T,transferCache:m,keepalive:o,cache:a,priority:s,timeout:y,mode:c,redirect:l,credentials:d,referrer:f,integrity:h,referrerPolicy:p})}},fo=(function(e){return e[e.Sent=0]="Sent",e[e.UploadProgress=1]="UploadProgress",e[e.ResponseHeader=2]="ResponseHeader",e[e.DownloadProgress=3]="DownloadProgress",e[e.Response=4]="Response",e[e.User=5]="User",e})(fo||{}),Os=class{headers;status;statusText;url;ok;type;redirected;responseType;constructor(n,t=200,i="OK"){this.headers=n.headers||new On,this.status=n.status!==void 0?n.status:t,this.statusText=n.statusText||i,this.url=n.url||null,this.redirected=n.redirected,this.responseType=n.responseType,this.ok=this.status>=200&&this.status<300}},gp=class e extends Os{constructor(n={}){super(n)}type=fo.ResponseHeader;clone(n={}){return new e({headers:n.headers||this.headers,status:n.status!==void 0?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0})}},ho=class e extends Os{body;constructor(n={}){super(n),this.body=n.body!==void 0?n.body:null}type=fo.Response;clone(n={}){return new e({body:n.body!==void 0?n.body:this.body,headers:n.headers||this.headers,status:n.status!==void 0?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0,redirected:n.redirected??this.redirected,responseType:n.responseType??this.responseType})}},dr=class extends Os{name="HttpErrorResponse";message;error;ok=!1;constructor(n){super(n,0,"Unknown Error"),this.status>=200&&this.status<300?this.message=`Http failure during parsing for ${n.url||"(unknown url)"}`:this.message=`Http failure response for ${n.url||"(unknown url)"}: ${n.status} ${n.statusText}`,this.error=n.error||null}},WR=200;var qR=/^\)\]\}',?\n/,NW=1024*1024,YR=new g("",{factory:()=>null}),ZR=(()=>{class e{fetchImpl=u(vp,{optional:!0})?.fetch??((...t)=>globalThis.fetch(...t));ngZone=u(M);destroyRef=u(ut);maxResponseSize=u(YR);handle(t){return new L(i=>{let r=new AbortController;this.doRequest(t,r.signal,i).then(bp,s=>i.error(new dr({error:s})));let o;return t.timeout&&(o=this.ngZone.runOutsideAngular(()=>setTimeout(()=>{r.signal.aborted||r.abort(new DOMException("signal timed out","TimeoutError"))},t.timeout))),()=>{o!==void 0&&clearTimeout(o),r.abort()}})}async doRequest(t,i,r){let o=this.createRequestInit(t),s;try{let E=this.ngZone.runOutsideAngular(()=>this.fetchImpl(t.urlWithParams,v({signal:i},o)));KR(E),r.next({type:fo.Sent}),s=await E}catch(E){r.error(new dr({error:E,status:E.status??0,statusText:E.statusText,url:t.urlWithParams,headers:E.headers}));return}let a=new On(s.headers),c=s.statusText,l=s.url||t.urlWithParams,d=s.status,f=null,h=t.reportProgress||t.reportDownloadProgress;if(h&&r.next(new gp({headers:a,status:d,statusText:c,url:l})),s.body){let E=s.headers.get("content-length"),T=E!==null?Number(E):NaN;this.maxResponseSize!==null&&Number.isFinite(T)&&T>this.maxResponseSize&&rE(this.maxResponseSize);let $=[],ve=s.body.getReader(),Pt=0,Fn,Le,Ln=typeof Zone<"u"&&Zone.current,Wt=!1;if(await this.ngZone.runOutsideAngular(async()=>{for(;;){if(this.destroyRef.destroyed){await ve.cancel(),Wt=!0;break}let{done:we,value:Yt}=await ve.read();if(we)break;if($.push(Yt),Pt+=Yt.length,this.maxResponseSize!==null&&Pt>this.maxResponseSize&&(await ve.cancel(),rE(this.maxResponseSize)),h){Le=t.responseType==="text"?(Le??"")+(Fn??=new TextDecoder).decode(Yt,{stream:!0}):void 0;let _r=()=>r.next({type:fo.DownloadProgress,total:Number.isFinite(T)?T:void 0,loaded:Pt,partialText:Le});Ln?Ln.run(_r):_r()}}}),Wt){r.complete();return}let qt=this.concatChunks($,Pt);try{let we=s.headers.get(fp)??"";f=this.parseBody(t,qt,we,d)}catch(we){r.error(new dr({error:we,headers:new On(s.headers),status:s.status,statusText:s.statusText,url:s.url||t.urlWithParams}));return}}d===0&&(d=f?WR:0);let p=d>=200&&d<300,m=s.redirected,y=s.type;p?(r.next(new ho({body:f,headers:a,status:d,statusText:c,url:l,redirected:m,responseType:y})),r.complete()):r.error(new dr({error:f,headers:a,status:d,statusText:c,url:l,redirected:m,responseType:y}))}parseBody(t,i,r,o){switch(t.responseType){case"json":let s=new TextDecoder().decode(i).replace(qR,"");if(s==="")return null;try{return JSON.parse(s)}catch(a){if(o<200||o>=300)return s;throw a}case"text":return new TextDecoder().decode(i);case"blob":return new Blob([i],{type:r});case"arraybuffer":return i.buffer}}createRequestInit(t){if(t.reportUploadProgress)throw new D(2824,!1);let i={},r;if(r=t.credentials,t.withCredentials&&(r="include"),t.headers.forEach((o,s)=>i[o]=s.join(",")),t.headers.has(iE)||(i[iE]=GR),!t.headers.has(fp)){let o=t.detectContentTypeHeader();o!==null&&(i[fp]=o)}return{body:t.serializeBody(),method:t.method,headers:i,credentials:r,keepalive:t.keepalive,cache:t.cache,priority:t.priority,mode:t.mode,redirect:t.redirect,referrer:t.referrer,integrity:t.integrity,referrerPolicy:t.referrerPolicy}}concatChunks(t,i){let r=new Uint8Array(i),o=0;for(let s of t)r.set(s,o),o+=s.length;return r}static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:e.\u0275fac})}return e})(),vp=class{};function bp(){}function KR(e){e.then(bp,bp)}function rE(e){throw new D(2825,!1)}function QR(e,n){return n(e)}function XR(e,n,t){return(i,r)=>Ue(t,()=>n(i,o=>e(o,r)))}var JR=new g("",{factory:()=>[]}),yp=new g(""),ek=new g("",{factory:()=>!0});var tk=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275prov=G({token:e,factory:function(i){let r=null;return i?r=new(i||e):r=P(ZR),r},providedIn:"root"})}return e})();var nk=(()=>{class e{backend;injector;chain=null;pendingTasks=u($r);contributeToStability=u(ek);constructor(t,i){this.backend=t,this.injector=i}handle(t){if(this.chain===null){let i=Array.from(new Set([...this.injector.get(JR),...this.injector.get(yp,[])]));this.chain=i.reduceRight((r,o)=>XR(r,o,this.injector),QR)}if(this.contributeToStability){let i=this.pendingTasks.add();return this.chain(t,r=>this.backend.handle(r)).pipe(Go(i))}else return this.chain(t,i=>this.backend.handle(i))}static \u0275fac=function(i){return new(i||e)(P(tk),P(ue))};static \u0275prov=G({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),ik=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275prov=G({token:e,factory:function(i){let r=null;return i?r=new(i||e):r=P(nk),r},providedIn:"root"})}return e})();function hp(e,n){return v({body:n},e)}var _p=(()=>{class e{handler;constructor(t){this.handler=t}request(t,i,r={}){let o;if(t instanceof uo)o=t;else{let c;r.headers instanceof On?c=r.headers:c=new On(r.headers);let l;r.params&&(r.params instanceof oi?l=r.params:l=new oi({fromObject:r.params})),o=new uo(t,i,r.body!==void 0?r.body:null,{headers:c,context:r.context,params:l,reportProgress:r.reportProgress,reportUploadProgress:r.reportUploadProgress,reportDownloadProgress:r.reportDownloadProgress,responseType:r.responseType||"json",withCredentials:r.withCredentials,transferCache:r.transferCache,keepalive:r.keepalive,priority:r.priority,cache:r.cache,mode:r.mode,redirect:r.redirect,credentials:r.credentials,referrer:r.referrer,referrerPolicy:r.referrerPolicy,integrity:r.integrity,timeout:r.timeout})}let s=N(o).pipe(Rr(c=>this.handler.handle(c)));if(t instanceof uo||r.observe==="events")return s;let a=s.pipe(pe(c=>c instanceof ho));switch(r.observe||"body"){case"body":switch(o.responseType){case"arraybuffer":return a.pipe(re(c=>{if(c.body!==null&&!(c.body instanceof ArrayBuffer))throw new D(2806,!1);return c.body}));case"blob":return a.pipe(re(c=>{if(c.body!==null&&!(c.body instanceof Blob))throw new D(2807,!1);return c.body}));case"text":return a.pipe(re(c=>{if(c.body!==null&&typeof c.body!="string")throw new D(2808,!1);return c.body}));default:return a.pipe(re(c=>c.body))}case"response":return a;default:throw new D(2809,!1)}}delete(t,i={}){return this.request("DELETE",t,i)}get(t,i={}){return this.request("GET",t,i)}head(t,i={}){return this.request("HEAD",t,i)}jsonp(t,i){return this.request("JSONP",t,{params:new oi().append(i,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(t,i={}){return this.request("OPTIONS",t,i)}patch(t,i,r={}){return this.request("PATCH",t,hp(r,i))}post(t,i,r={}){return this.request("POST",t,hp(r,i))}put(t,i,r={}){return this.request("PUT",t,hp(r,i))}static \u0275fac=function(i){return new(i||e)(P(ik))};static \u0275prov=G({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var rk=new g(""),ok="b",sk="h",ak="s",ck="st",lk="u",dk="rt",wp=new g(""),uk=["GET","HEAD"];function dE(e,n){let s=n,{isCacheActive:t}=s,i=vd(s,["isCacheActive"]),{transferCache:r,method:o}=e;return!(!t||r===!1||bk(e)||o==="POST"&&!i.includePostRequests&&!r||o!=="POST"&&!uk.includes(o)||!i.includeRequestsWithAuthHeaders&&pk(e)||gk(e.headers)||vk(e.cache)||i.filter?.(e)===!1)}function fk(e,n,t,i,r,o=!1){if(!o&&!dE(e,n))return null;if(i)throw new D(2803,!1);if(!r){let y=e.url;r=uE(e,y)}let s=t.get(r,null);if(!s)return null;let{[ok]:a,[dk]:c,[sk]:l,[ak]:d,[ck]:f,[lk]:h}=s,p=a;switch(c){case"arraybuffer":p=cE(a);break;case"blob":p=new Blob([cE(a)]);break}let m=new On(l);return new ho({body:p,headers:m,status:d,statusText:f,url:h})}function hk(e,n){let t=u(wp);if(!dE(e,t))return n(e);let i=u(vi),r=u(rk,{optional:!0}),o=e.url,s=uE(e,o),a=fk(e,t,i,null,s,!0);return a?N(a):n(e)}function pk(e){let n=e.headers;return n.has("authorization")||n.has("proxy-authorization")||n.has("cookie")}var mk=new Set(["no-store","private","no-cache"]);function gk(e){let n=e.get("cache-control");return n?n.split(",").some(t=>{let i=t.split("=",1)[0].trim().toLowerCase();return mk.has(i)}):!1}function vk(e){return e==="no-cache"||e==="no-store"}function bk(e){let{withCredentials:n,credentials:t}=e;return n||t==="include"||t==="same-origin"}function aE(e){let n=new URLSearchParams(e instanceof URLSearchParams?e:e.toString());return n.sort(),n.toString()}function uE(e,n){let{params:t,method:i,responseType:r}=e,o=aE(t),s=e.serializeBody();s instanceof URLSearchParams?s=aE(s):typeof s!="string"&&(s="");let a=[i,r,n,s,o].join("|"),c=_k(a);return c}function cE(e){let n=atob(e);return Uint8Array.from(n,i=>i.charCodeAt(0)).buffer}function fE(e){return[{provide:wp,useFactory:()=>(jt("NgHttpTransferCache"),v({isCacheActive:!0},e))},{provide:yp,useValue:hk,multi:!0},{provide:cn,multi:!0,useFactory:()=>{let n=u(Pe),t=u(wp);return()=>{n.whenStable().then(()=>{t.isCacheActive=!1})}}}]}var yk=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),lE;function _k(e){lE??=new TextEncoder;let n=lE.encode(e),t=1779033703,i=3144134277,r=1013904242,o=2773480762,s=1359893119,a=2600822924,c=528734635,l=1541459225,d=n.length*8,f=(n.length+8>>6)+1<<6,h=new Uint8Array(f);h.set(n),h[n.length]=128;let p=new DataView(h.buffer),m=d>>>0,y=d/4294967296>>>0;p.setUint32(f-8,y,!1),p.setUint32(f-4,m,!1);let E=new Uint32Array(64);for(let T=0;T<f;T+=64){for(let we=0;we<16;we++)E[we]=p.getUint32(T+we*4,!1);for(let we=16;we<64;we++){let Yt=E[we-15],_r=((Yt>>>7|Yt<<25)^(Yt>>>18|Yt<<14)^Yt>>>3)>>>0,ci=E[we-2],gd=((ci>>>17|ci<<15)^(ci>>>19|ci<<13)^ci>>>10)>>>0;E[we]=E[we-16]+_r+E[we-7]+gd>>>0}let $=t,ve=i,Pt=r,Fn=o,Le=s,Ln=a,Wt=c,qt=l;for(let we=0;we<64;we++){let Yt=((Le>>>6|Le<<26)^(Le>>>11|Le<<21)^(Le>>>25|Le<<7))>>>0,_r=(Le&Ln^~Le&Wt)>>>0,ci=qt+Yt+_r+yk[we]+E[we]>>>0,gd=(($>>>2|$<<30)^($>>>13|$<<19)^($>>>22|$<<10))>>>0,PC=($&ve^$&Pt^ve&Pt)>>>0,FC=gd+PC>>>0;qt=Wt,Wt=Ln,Ln=Le,Le=Fn+ci>>>0,Fn=Pt,Pt=ve,ve=$,$=ci+FC>>>0}t=t+$>>>0,i=i+ve>>>0,r=r+Pt>>>0,o=o+Fn>>>0,s=s+Le>>>0,a=a+Ln>>>0,c=c+Wt>>>0,l=l+qt>>>0}return[t,i,r,o,s,a,c,l].map(T=>T.toString(16).padStart(8,"0")).join("")}var hE=(()=>{class e{_doc;constructor(t){this._doc=t}getTitle(){return this._doc.title}setTitle(t){this._doc.title=t||""}static \u0275fac=function(i){return new(i||e)(P(O))};static \u0275prov=G({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var Ml=(function(e){return e[e.NoHttpTransferCache=0]="NoHttpTransferCache",e[e.HttpTransferCacheOptions=1]="HttpTransferCacheOptions",e[e.I18nSupport=2]="I18nSupport",e[e.EventReplay=3]="EventReplay",e[e.IncrementalHydration=4]="IncrementalHydration",e[e.NoIncrementalHydration=5]="NoIncrementalHydration",e})(Ml||{});function pE(...e){let n=[],t=new Set;for(let{\u0275providers:r,\u0275kind:o}of e)t.add(o),r.length&&n.push(r);let i=t.has(Ml.HttpTransferCacheOptions);return wn([[],[],Fw(),t.has(Ml.NoHttpTransferCache)||i?[]:fE({}),t.has(Ml.NoIncrementalHydration)?[]:Lw(),n,{provide:fl,useValue:{isActive:!0}},{provide:cn,multi:!0,useFactory:()=>{let r=u(Pe),o=u(fl);return()=>{r.whenStable().then(()=>{o.isActive=!1})}}}])}var Ep=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275prov=G({token:e,factory:function(i){let r=null;return i?r=new(i||e):r=P(wk),r},providedIn:"root"})}return e})(),wk=(()=>{class e extends Ep{_doc=u(O);sanitize(t,i){if(i==null)return null;switch(t){case on.NONE:return i;case on.HTML:return nr(i,"HTML")?ei(i):ah(this._doc,String(i)).toString();case on.STYLE:return nr(i,"Style")?ei(i):i;case on.SCRIPT:if(nr(i,"Script"))return ei(i);throw new D(5200,!1);case on.URL:return nr(i,"URL")?ei(i):Zc(String(i));case on.RESOURCE_URL:if(nr(i,"ResourceURL"))return ei(i);throw new D(5201,!1);default:throw new D(5202,!1)}}bypassSecurityTrustHtml(t){return nh(t)}bypassSecurityTrustStyle(t){return ih(t)}bypassSecurityTrustScript(t){return rh(t)}bypassSecurityTrustUrl(t){return oh(t)}bypassSecurityTrustResourceUrl(t){return sh(t)}static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:e.\u0275fac})}return e})();var U="primary",Ws=Symbol("RouteTitle"),xp=class{params;constructor(n){this.params=n||{}}has(n){return Object.prototype.hasOwnProperty.call(this.params,n)}get(n){if(this.has(n)){let t=this.params[n];return Array.isArray(t)?t[0]:t}return null}getAll(n){if(this.has(n)){let t=this.params[n];return Array.isArray(t)?t:[t]}return[]}get keys(){return Object.keys(this.params)}};function vo(e){return new xp(e)}function Dp(e,n,t){for(let i=0;i<e.length;i++){let r=e[i],o=n[i];if(r[0]===":")t[r.substring(1)]=o;else if(r!==o.path)return!1}return!0}function Dk(e,n,t){let i=t.path.split("/"),r=i.indexOf("**");if(r===-1){if(i.length>e.length||t.pathMatch==="full"&&(n.hasChildren()||i.length<e.length))return null;let c={},l=e.slice(0,i.length);return Dp(i,l,c)?{consumed:l,posParams:c}:null}if(r!==i.lastIndexOf("**"))return null;let o=i.slice(0,r),s=i.slice(r+1);if(o.length+s.length>e.length||t.pathMatch==="full"&&n.hasChildren()&&t.path!=="**")return null;let a={};return!Dp(o,e.slice(0,o.length),a)||!Dp(s,e.slice(e.length-s.length),a)?null:{consumed:e,posParams:a}}function Pl(e){return new Promise((n,t)=>{e.pipe(Un()).subscribe({next:i=>n(i),error:i=>t(i)})})}function Ck(e,n){if(e.length!==n.length)return!1;for(let t=0;t<e.length;++t)if(!Pn(e[t],n[t]))return!1;return!0}function Pn(e,n){let t=e?Tp(e):void 0,i=n?Tp(n):void 0;if(!t||!i||t.length!=i.length)return!1;let r;for(let o=0;o<t.length;o++)if(r=t[o],!DE(e[r],n[r]))return!1;return!0}function Tp(e){return[...Object.keys(e),...Object.getOwnPropertySymbols(e)]}function DE(e,n){if(Array.isArray(e)&&Array.isArray(n)){if(e.length!==n.length)return!1;let t=[...e].sort(),i=[...n].sort();return t.every((r,o)=>i[o]===r)}else return e===n}function Ik(e){return e.length>0?e[e.length-1]:null}function mr(e){return Uo(e)?e:io(e)?Se(Promise.resolve(e)):N(e)}function CE(e){return Uo(e)?Pl(e):Promise.resolve(e)}var Sk={exact:xE,subset:TE},IE={exact:xk,subset:Tk,ignored:()=>!0},SE={paths:"exact",fragment:"ignored",matrixParams:"ignored",queryParams:"exact"},Mp={paths:"subset",fragment:"ignored",matrixParams:"ignored",queryParams:"subset"};function mE(e,n,t){return Sk[t.paths](e.root,n.root,t.matrixParams)&&IE[t.queryParams](e.queryParams,n.queryParams)&&!(t.fragment==="exact"&&e.fragment!==n.fragment)}function xk(e,n){return Pn(e,n)}function xE(e,n,t){if(!fr(e.segments,n.segments)||!kl(e.segments,n.segments,t)||e.numberOfChildren!==n.numberOfChildren)return!1;for(let i in n.children)if(!e.children[i]||!xE(e.children[i],n.children[i],t))return!1;return!0}function Tk(e,n){return Object.keys(n).length<=Object.keys(e).length&&Object.keys(n).every(t=>DE(e[t],n[t]))}function TE(e,n,t){return ME(e,n,n.segments,t)}function ME(e,n,t,i){if(e.segments.length>t.length){let r=e.segments.slice(0,t.length);return!(!fr(r,t)||n.hasChildren()||!kl(r,t,i))}else if(e.segments.length===t.length){if(!fr(e.segments,t)||!kl(e.segments,t,i))return!1;for(let r in n.children)if(!e.children[r]||!TE(e.children[r],n.children[r],i))return!1;return!0}else{let r=t.slice(0,e.segments.length),o=t.slice(e.segments.length);return!fr(e.segments,r)||!kl(e.segments,r,i)||!e.children[U]?!1:ME(e.children[U],n,o,i)}}function kl(e,n,t){return n.every((i,r)=>IE[t](e[r].parameters,i.parameters))}var hn=class{root;queryParams;fragment;_queryParamMap;constructor(n=new de([],{}),t={},i=null){this.root=n,this.queryParams=t,this.fragment=i}get queryParamMap(){return this._queryParamMap??=vo(this.queryParams),this._queryParamMap}toString(){return Rk.serialize(this)}},de=class{segments;children;parent=null;constructor(n,t){this.segments=n,this.children=t,Object.values(t).forEach(i=>i.parent=this)}hasChildren(){return this.numberOfChildren>0}get numberOfChildren(){return Object.keys(this.children).length}toString(){return Nl(this)}},ur=class{path;parameters;_parameterMap;constructor(n,t){this.path=n,this.parameters=t}get parameterMap(){return this._parameterMap??=vo(this.parameters),this._parameterMap}toString(){return RE(this)}};function Mk(e,n){return fr(e,n)&&e.every((t,i)=>Pn(t.parameters,n[i].parameters))}function fr(e,n){return e.length!==n.length?!1:e.every((t,i)=>t.path===n[i].path)}function Ak(e,n){let t=[];return Object.entries(e.children).forEach(([i,r])=>{i===U&&(t=t.concat(n(r,i)))}),Object.entries(e.children).forEach(([i,r])=>{i!==U&&(t=t.concat(n(r,i)))}),t}var Gl=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:()=>new hr})}return e})(),hr=class{parse(n){let t=new Rp(n);return new hn(t.parseRootSegment(),t.parseQueryParams(),t.parseFragment())}serialize(n){let t=`/${Ps(n.root,!0)}`,i=Ok(n.queryParams),r=typeof n.fragment=="string"?`#${kk(n.fragment)}`:"";return`${t}${i}${r}`}},Rk=new hr;function Nl(e){return e.segments.map(n=>RE(n)).join("/")}function Ps(e,n){if(!e.hasChildren())return Nl(e);if(n){let t=e.children[U]?Ps(e.children[U],!1):"",i=[];return Object.entries(e.children).forEach(([r,o])=>{r!==U&&i.push(`${r}:${Ps(o,!1)}`)}),i.length>0?`${t}(${i.join("//")})`:t}else{let t=Ak(e,(i,r)=>r===U?[Ps(e.children[U],!1)]:[`${r}:${Ps(i,!1)}`]);return Object.keys(e.children).length===1&&e.children[U]!=null?`${Nl(e)}/${t[0]}`:`${Nl(e)}/(${t.join("//")})`}}function AE(e){return encodeURIComponent(e).replace(/%40/g,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",")}function Al(e){return AE(e).replace(/%3B/gi,";")}function kk(e){return encodeURI(e)}function Ap(e){return AE(e).replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/%26/gi,"&")}function Ol(e){return decodeURIComponent(e)}function gE(e){return Ol(e.replace(/\+/g,"%20"))}function RE(e){return`${Ap(e.path)}${Nk(e.parameters)}`}function Nk(e){return Object.entries(e).map(([n,t])=>`;${Ap(n)}=${Ap(t)}`).join("")}function Ok(e){let n=Object.entries(e).map(([t,i])=>Array.isArray(i)?i.map(r=>`${Al(t)}=${Al(r)}`).join("&"):`${Al(t)}=${Al(i)}`).filter(t=>t);return n.length?`?${n.join("&")}`:""}var Pk=/^[^\/()?;#]+/;function Cp(e){let n=e.match(Pk);return n?n[0]:""}var Fk=/^[^\/()?;=#]+/;function Lk(e){let n=e.match(Fk);return n?n[0]:""}var Bk=/^[^=?&#]+/;function Vk(e){let n=e.match(Bk);return n?n[0]:""}var jk=/^[^&#]+/;function Uk(e){let n=e.match(jk);return n?n[0]:""}var Rp=class{url;remaining;constructor(n){this.url=n,this.remaining=n}parseRootSegment(){for(;this.consumeOptional("/"););return this.remaining===""||this.peekStartsWith("?")||this.peekStartsWith("#")?new de([],{}):new de([],this.parseChildren())}parseQueryParams(){let n={};if(this.consumeOptional("?"))do this.parseQueryParam(n);while(this.consumeOptional("&"));return n}parseFragment(){return this.consumeOptional("#")?decodeURIComponent(this.remaining):null}parseChildren(n=0){if(n>50)throw new D(4010,!1);if(this.remaining==="")return{};this.consumeOptional("/");let t=[];for(this.peekStartsWith("(")||t.push(this.parseSegment());this.peekStartsWith("/")&&!this.peekStartsWith("//")&&!this.peekStartsWith("/(");)this.capture("/"),t.push(this.parseSegment());let i={};this.peekStartsWith("/(")&&(this.capture("/"),i=this.parseParens(!0,n));let r={};return this.peekStartsWith("(")&&(r=this.parseParens(!1,n)),(t.length>0||Object.keys(i).length>0)&&(r[U]=new de(t,i)),r}parseSegment(){let n=Cp(this.remaining);if(n===""&&this.peekStartsWith(";"))throw new D(4009,!1);return this.capture(n),new ur(Ol(n),this.parseMatrixParams())}parseMatrixParams(){let n={};for(;this.consumeOptional(";");)this.parseParam(n);return n}parseParam(n){let t=Lk(this.remaining);if(!t)return;this.capture(t);let i="";if(this.consumeOptional("=")){let r=Cp(this.remaining);r&&(i=r,this.capture(i))}n[Ol(t)]=Ol(i)}parseQueryParam(n){let t=Vk(this.remaining);if(!t)return;this.capture(t);let i="";if(this.consumeOptional("=")){let s=Uk(this.remaining);s&&(i=s,this.capture(i))}let r=gE(t),o=gE(i);if(n.hasOwnProperty(r)){let s=n[r];Array.isArray(s)||(s=[s],n[r]=s),s.push(o)}else n[r]=o}parseParens(n,t){let i={};for(this.capture("(");!this.consumeOptional(")")&&this.remaining.length>0;){let r=Cp(this.remaining),o=this.remaining[r.length];if(o!=="/"&&o!==")"&&o!==";")throw new D(4010,!1);let s;r.indexOf(":")>-1?(s=r.slice(0,r.indexOf(":")),this.capture(s),this.capture(":")):n&&(s=U);let a=this.parseChildren(t+1);i[s??U]=Object.keys(a).length===1&&a[U]?a[U]:new de([],a),this.consumeOptional("//")}return i}peekStartsWith(n){return this.remaining.startsWith(n)}consumeOptional(n){return this.peekStartsWith(n)?(this.remaining=this.remaining.substring(n.length),!0):!1}capture(n){if(!this.consumeOptional(n))throw new D(4011,!1)}};function kE(e){return e.segments.length>0?new de([],{[U]:e}):e}function NE(e){let n={};for(let[i,r]of Object.entries(e.children)){let o=NE(r);if(i===U&&o.segments.length===0&&o.hasChildren())for(let[s,a]of Object.entries(o.children))n[s]=a;else(o.segments.length>0||o.hasChildren())&&(n[i]=o)}let t=new de(e.segments,n);return Hk(t)}function Hk(e){if(e.numberOfChildren===1&&e.children[U]){let n=e.children[U];return new de(e.segments.concat(n.segments),n.children)}return e}function bo(e){return e instanceof hn}function $k(e,n,t=null,i=null,r=new hr){let o=OE(e);return PE(o,n,t,i,r)}function OE(e){let n;function t(o){let s={};for(let c of o.children){let l=t(c);s[c.outlet]=l}let a=new de(o.url,s);return o===e&&(n=a),a}let i=t(e.root),r=kE(i);return n??r}function PE(e,n,t,i,r){let o=e;for(;o.parent;)o=o.parent;if(n.length===0)return Ip(o,o,o,t,i,r);let s=zk(n);if(s.toRoot())return Ip(o,o,new de([],{}),t,i,r);let a=Gk(s,o,e),c=a.processChildren?Ls(a.segmentGroup,a.index,s.commands):LE(a.segmentGroup,a.index,s.commands);return Ip(o,a.segmentGroup,c,t,i,r)}function Fl(e){return typeof e=="object"&&e!=null&&!e.outlets&&!e.segmentPath}function js(e){return typeof e=="object"&&e!=null&&e.outlets}function vE(e,n,t){e||="\u0275";let i=new hn;return i.queryParams={[e]:n},t.parse(t.serialize(i)).queryParams[e]}function Ip(e,n,t,i,r,o){let s={};for(let[l,d]of Object.entries(i??{}))s[l]=Array.isArray(d)?d.map(f=>vE(l,f,o)):vE(l,d,o);let a;e===n?a=t:a=FE(e,n,t);let c=kE(NE(a));return new hn(c,s,r)}function FE(e,n,t){let i={};return Object.entries(e.children).forEach(([r,o])=>{o===n?i[r]=t:i[r]=FE(o,n,t)}),new de(e.segments,i)}var Ll=class{isAbsolute;numberOfDoubleDots;commands;constructor(n,t,i){if(this.isAbsolute=n,this.numberOfDoubleDots=t,this.commands=i,n&&i.length>0&&Fl(i[0]))throw new D(4003,!1);let r=i.find(js);if(r&&r!==Ik(i))throw new D(4004,!1)}toRoot(){return this.isAbsolute&&this.commands.length===1&&this.commands[0]=="/"}};function zk(e){if(typeof e[0]=="string"&&e.length===1&&e[0]==="/")return new Ll(!0,0,e);let n=0,t=!1,i=e.reduce((r,o,s)=>{if(typeof o=="object"&&o!=null){if(o.outlets){let a={};return Object.entries(o.outlets).forEach(([c,l])=>{a[c]=typeof l=="string"?l.split("/"):l}),[...r,{outlets:a}]}if(o.segmentPath)return[...r,o.segmentPath]}return typeof o!="string"?[...r,o]:s===0?(o.split("/").forEach((a,c)=>{c==0&&a==="."||(c==0&&a===""?t=!0:a===".."?n++:a!=""&&r.push(a))}),r):[...r,o]},[]);return new Ll(t,n,i)}var mo=class{segmentGroup;processChildren;index;constructor(n,t,i){this.segmentGroup=n,this.processChildren=t,this.index=i}};function Gk(e,n,t){if(e.isAbsolute)return new mo(n,!0,0);if(!t)return new mo(n,!1,NaN);if(t.parent===null)return new mo(t,!0,0);let i=Fl(e.commands[0])?0:1,r=t.segments.length-1+i;return Wk(t,r,e.numberOfDoubleDots)}function Wk(e,n,t){let i=e,r=n,o=t;for(;o>r;){if(o-=r,i=i.parent,!i)throw new D(4005,!1);r=i.segments.length}return new mo(i,!1,r-o)}function qk(e){return js(e[0])?e[0].outlets:{[U]:e}}function LE(e,n,t){if(e??=new de([],{}),e.segments.length===0&&e.hasChildren())return Ls(e,n,t);let i=Yk(e,n,t),r=t.slice(i.commandIndex);if(i.match&&i.pathIndex<e.segments.length){let o=new de(e.segments.slice(0,i.pathIndex),{});return o.children[U]=new de(e.segments.slice(i.pathIndex),e.children),Ls(o,0,r)}else return i.match&&r.length===0?new de(e.segments,{}):i.match&&!e.hasChildren()?kp(e,n,t):i.match?Ls(e,0,r):kp(e,n,t)}function Ls(e,n,t){if(t.length===0)return new de(e.segments,{});{let i=qk(t),r={};if(Object.keys(i).some(o=>o!==U)&&e.children[U]&&e.numberOfChildren===1&&e.children[U].segments.length===0){let o=Ls(e.children[U],n,t);return new de(e.segments,o.children)}return Object.entries(i).forEach(([o,s])=>{typeof s=="string"&&(s=[s]),s!==null&&(r[o]=LE(e.children[o],n,s))}),Object.entries(e.children).forEach(([o,s])=>{i[o]===void 0&&(r[o]=s)}),new de(e.segments,r)}}function Yk(e,n,t){let i=0,r=n,o={match:!1,pathIndex:0,commandIndex:0};for(;r<e.segments.length;){if(i>=t.length)return o;let s=e.segments[r],a=t[i];if(js(a))break;let c=`${a}`,l=i<t.length-1?t[i+1]:null;if(r>0&&c===void 0)break;if(c&&l&&typeof l=="object"&&l.outlets===void 0){if(!yE(c,l,s))return o;i+=2}else{if(!yE(c,{},s))return o;i++}r++}return{match:!0,pathIndex:r,commandIndex:i}}function kp(e,n,t){let i=e.segments.slice(0,n),r=0;for(;r<t.length;){let o=t[r];if(js(o)){let c=Zk(o.outlets);return new de(i,c)}if(r===0&&Fl(t[0])){let c=e.segments[n];i.push(new ur(c.path,bE(t[0]))),r++;continue}let s=js(o)?o.outlets[U]:`${o}`,a=r<t.length-1?t[r+1]:null;s&&a&&Fl(a)?(i.push(new ur(s,bE(a))),r+=2):(i.push(new ur(s,{})),r++)}return new de(i,{})}function Zk(e){let n={};return Object.entries(e).forEach(([t,i])=>{typeof i=="string"&&(i=[i]),i!==null&&(n[t]=kp(new de([],{}),0,i))}),n}function bE(e){let n={};return Object.entries(e).forEach(([t,i])=>n[t]=`${i}`),n}function yE(e,n,t){return e==t.path&&Pn(n,t.parameters)}var Bs="imperative",Ye=(function(e){return e[e.NavigationStart=0]="NavigationStart",e[e.NavigationEnd=1]="NavigationEnd",e[e.NavigationCancel=2]="NavigationCancel",e[e.NavigationError=3]="NavigationError",e[e.RoutesRecognized=4]="RoutesRecognized",e[e.ResolveStart=5]="ResolveStart",e[e.ResolveEnd=6]="ResolveEnd",e[e.GuardsCheckStart=7]="GuardsCheckStart",e[e.GuardsCheckEnd=8]="GuardsCheckEnd",e[e.RouteConfigLoadStart=9]="RouteConfigLoadStart",e[e.RouteConfigLoadEnd=10]="RouteConfigLoadEnd",e[e.ChildActivationStart=11]="ChildActivationStart",e[e.ChildActivationEnd=12]="ChildActivationEnd",e[e.ActivationStart=13]="ActivationStart",e[e.ActivationEnd=14]="ActivationEnd",e[e.Scroll=15]="Scroll",e[e.NavigationSkipped=16]="NavigationSkipped",e})(Ye||{}),Ht=class{id;url;constructor(n,t){this.id=n,this.url=t}},yo=class extends Ht{type=Ye.NavigationStart;navigationTrigger;restoredState;constructor(n,t,i="imperative",r=null){super(n,t),this.navigationTrigger=i,this.restoredState=r}toString(){return`NavigationStart(id: ${this.id}, url: '${this.url}')`}},Ii=class extends Ht{urlAfterRedirects;type=Ye.NavigationEnd;constructor(n,t,i){super(n,t),this.urlAfterRedirects=i}toString(){return`NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`}},ht=(function(e){return e[e.Redirect=0]="Redirect",e[e.SupersededByNewNavigation=1]="SupersededByNewNavigation",e[e.NoDataFromResolver=2]="NoDataFromResolver",e[e.GuardRejected=3]="GuardRejected",e[e.Aborted=4]="Aborted",e})(ht||{}),Bl=(function(e){return e[e.IgnoredSameUrlNavigation=0]="IgnoredSameUrlNavigation",e[e.IgnoredByUrlHandlingStrategy=1]="IgnoredByUrlHandlingStrategy",e})(Bl||{}),un=class extends Ht{reason;code;type=Ye.NavigationCancel;constructor(n,t,i,r){super(n,t),this.reason=i,this.code=r}toString(){return`NavigationCancel(id: ${this.id}, url: '${this.url}')`}};function BE(e){return e instanceof un&&(e.code===ht.Redirect||e.code===ht.SupersededByNewNavigation)}var Si=class extends Ht{reason;code;type=Ye.NavigationSkipped;constructor(n,t,i,r){super(n,t),this.reason=i,this.code=r}},_o=class extends Ht{error;target;type=Ye.NavigationError;constructor(n,t,i,r){super(n,t),this.error=i,this.target=r}toString(){return`NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`}},Vl=class extends Ht{urlAfterRedirects;state;type=Ye.RoutesRecognized;constructor(n,t,i,r){super(n,t),this.urlAfterRedirects=i,this.state=r}toString(){return`RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Np=class extends Ht{urlAfterRedirects;state;type=Ye.GuardsCheckStart;constructor(n,t,i,r){super(n,t),this.urlAfterRedirects=i,this.state=r}toString(){return`GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Op=class extends Ht{urlAfterRedirects;state;shouldActivate;type=Ye.GuardsCheckEnd;constructor(n,t,i,r,o){super(n,t),this.urlAfterRedirects=i,this.state=r,this.shouldActivate=o}toString(){return`GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`}},Pp=class extends Ht{urlAfterRedirects;state;type=Ye.ResolveStart;constructor(n,t,i,r){super(n,t),this.urlAfterRedirects=i,this.state=r}toString(){return`ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Fp=class extends Ht{urlAfterRedirects;state;type=Ye.ResolveEnd;constructor(n,t,i,r){super(n,t),this.urlAfterRedirects=i,this.state=r}toString(){return`ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Lp=class{route;type=Ye.RouteConfigLoadStart;constructor(n){this.route=n}toString(){return`RouteConfigLoadStart(path: ${this.route.path})`}},Bp=class{route;type=Ye.RouteConfigLoadEnd;constructor(n){this.route=n}toString(){return`RouteConfigLoadEnd(path: ${this.route.path})`}},Vp=class{snapshot;type=Ye.ChildActivationStart;constructor(n){this.snapshot=n}toString(){return`ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},jp=class{snapshot;type=Ye.ChildActivationEnd;constructor(n){this.snapshot=n}toString(){return`ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Up=class{snapshot;type=Ye.ActivationStart;constructor(n){this.snapshot=n}toString(){return`ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Hp=class{snapshot;type=Ye.ActivationEnd;constructor(n){this.snapshot=n}toString(){return`ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}};var wo=class{},Us=class{},Eo=class{url;navigationBehaviorOptions;constructor(n,t){this.url=n,this.navigationBehaviorOptions=t}};function Kk(e){return!(e instanceof wo)&&!(e instanceof Eo)&&!(e instanceof Us)}var $p=class{rootInjector;outlet=null;route=null;children;attachRef=null;get injector(){return this.route?.snapshot._environmentInjector??this.rootInjector}constructor(n){this.rootInjector=n,this.children=new qs(this.rootInjector)}},qs=(()=>{class e{rootInjector;contexts=new Map;constructor(t){this.rootInjector=t}onChildOutletCreated(t,i){let r=this.getOrCreateContext(t);r.outlet=i,this.contexts.set(t,r)}onChildOutletDestroyed(t){let i=this.getContext(t);i&&(i.outlet=null,i.attachRef=null)}onOutletDeactivated(){let t=this.contexts;return this.contexts=new Map,t}onOutletReAttached(t){this.contexts=t}getOrCreateContext(t){let i=this.getContext(t);return i||(i=new $p(this.rootInjector),this.contexts.set(t,i)),i}getContext(t){return this.contexts.get(t)||null}static \u0275fac=function(i){return new(i||e)(P(ue))};static \u0275prov=G({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),jl=class{_root;constructor(n){this._root=n}get root(){return this._root.value}parent(n){let t=this.pathFromRoot(n);return t.length>1?t[t.length-2]:null}children(n){let t=zp(n,this._root);return t?t.children.map(i=>i.value):[]}firstChild(n){let t=zp(n,this._root);return t&&t.children.length>0?t.children[0].value:null}siblings(n){let t=Gp(n,this._root);return t.length<2?[]:t[t.length-2].children.map(r=>r.value).filter(r=>r!==n)}pathFromRoot(n){return Gp(n,this._root).map(t=>t.value)}};function zp(e,n){if(e===n.value)return n;for(let t of n.children){let i=zp(e,t);if(i)return i}return null}function Gp(e,n){if(e===n.value)return[n];for(let t of n.children){let i=Gp(e,t);if(i.length)return i.unshift(n),i}return[]}var Ot=class{value;children;constructor(n,t){this.value=n,this.children=t}toString(){return`TreeNode(${this.value})`}};function po(e){let n={};return e&&e.children.forEach(t=>n[t.value.outlet]=t),n}var Ul=class extends jl{snapshot;constructor(n,t){super(n),this.snapshot=t,tm(this,n)}toString(){return this.snapshot.toString()}};function VE(e,n){let t=Qk(e,n),i=new Re([new ur("",{})]),r=new Re({}),o=new Re({}),s=new Re({}),a=new Re(""),c=new pr(i,r,s,a,o,U,e,t.root);return c.snapshot=t.root,new Ul(new Ot(c,[]),t)}function Qk(e,n){let t={},i={},r={},s=new Hs([],t,r,"",i,U,e,null,{},n);return new Hl("",new Ot(s,[]))}var pr=class{urlSubject;paramsSubject;queryParamsSubject;fragmentSubject;dataSubject;outlet;component;snapshot;_futureSnapshot;_routerState;_paramMap;_queryParamMap;title;url;params;queryParams;fragment;data;_localInjector;constructor(n,t,i,r,o,s,a,c){this.urlSubject=n,this.paramsSubject=t,this.queryParamsSubject=i,this.fragmentSubject=r,this.dataSubject=o,this.outlet=s,this.component=a,this._futureSnapshot=c,this.title=this.dataSubject?.pipe(re(l=>l[Ws]))??N(void 0),this.url=n,this.params=t,this.queryParams=i,this.fragment=r,this.data=o}get routeConfig(){return this._futureSnapshot.routeConfig}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=this.params.pipe(re(n=>vo(n))),this._paramMap}get queryParamMap(){return this._queryParamMap??=this.queryParams.pipe(re(n=>vo(n))),this._queryParamMap}toString(){return this.snapshot?this.snapshot.toString():`Future(${this._futureSnapshot})`}},Xk="always";function em(e,n,t){let i,{routeConfig:r}=e;return n!==null&&(t==="always"||r?.path===""||!n.component&&!n.routeConfig?.loadComponent)?i={params:v(v({},n.params),e.params),data:v(v({},n.data),e.data),resolve:v(v(v(v({},e.data),n.data),r?.data),e._resolvedData)}:i={params:v({},e.params),data:v({},e.data),resolve:v(v({},e.data),e._resolvedData??{})},r&&UE(r)&&(i.resolve[Ws]=r.title),i}var Hs=class{url;params;queryParams;fragment;data;outlet;component;routeConfig;_resolve;_resolvedData;_routerState;_paramMap;_queryParamMap;_environmentInjector;get title(){return this.data?.[Ws]}constructor(n,t,i,r,o,s,a,c,l,d){this.url=n,this.params=t,this.queryParams=i,this.fragment=r,this.data=o,this.outlet=s,this.component=a,this.routeConfig=c,this._resolve=l,this._environmentInjector=d}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=vo(this.params),this._paramMap}get queryParamMap(){return this._queryParamMap??=vo(this.queryParams),this._queryParamMap}toString(){let n=this.url.map(i=>i.toString()).join("/"),t=this.routeConfig?this.routeConfig.path:"";return`Route(url:'${n}', path:'${t}')`}},Hl=class extends jl{url;constructor(n,t){super(t),this.url=n,tm(this,t)}toString(){return jE(this._root)}};function tm(e,n){n.value._routerState=e,n.children.forEach(t=>tm(e,t))}function jE(e){let n=e.children.length>0?` { ${e.children.map(jE).join(", ")} } `:"";return`${e.value}${n}`}function Sp(e){if(e.snapshot){let n=e.snapshot,t=e._futureSnapshot;e.snapshot=t,Pn(n.queryParams,t.queryParams)||e.queryParamsSubject.next(t.queryParams),n.fragment!==t.fragment&&e.fragmentSubject.next(t.fragment),Pn(n.params,t.params)||e.paramsSubject.next(t.params),Ck(n.url,t.url)||e.urlSubject.next(t.url),Pn(n.data,t.data)||e.dataSubject.next(t.data)}else e.snapshot=e._futureSnapshot,e.dataSubject.next(e._futureSnapshot.data)}function Wp(e,n){let t=Pn(e.params,n.params)&&Mk(e.url,n.url),i=!e.parent!=!n.parent;return t&&!i&&(!e.parent||Wp(e.parent,n.parent))}function UE(e){return typeof e.title=="string"||e.title===null}var Jk=new g(""),HE=(()=>{class e{activated=null;get activatedComponentRef(){return this.activated}_activatedRoute=null;name=U;activateEvents=new k;deactivateEvents=new k;attachEvents=new k;detachEvents=new k;routerOutletData=lr();parentContexts=u(qs);location=u(Je);changeDetector=u(Ie);inputBinder=u(Wl,{optional:!0});supportsBindingToComponentInputs=!0;ngOnChanges(t){if(t.name){let{firstChange:i,previousValue:r}=t.name;if(i)return;this.isTrackedInParentContexts(r)&&(this.deactivate(),this.parentContexts.onChildOutletDestroyed(r)),this.initializeOutletWithName()}}ngOnDestroy(){this.isTrackedInParentContexts(this.name)&&this.parentContexts.onChildOutletDestroyed(this.name),this.inputBinder?.unsubscribeFromRouteData(this)}isTrackedInParentContexts(t){return this.parentContexts.getContext(t)?.outlet===this}ngOnInit(){this.initializeOutletWithName()}initializeOutletWithName(){if(this.parentContexts.onChildOutletCreated(this.name,this),this.activated)return;let t=this.parentContexts.getContext(this.name);t?.route&&(t.attachRef?this.attach(t.attachRef,t.route):this.activateWith(t.route,t.injector))}get isActivated(){return!!this.activated}get component(){if(!this.activated)throw new D(4012,!1);return this.activated.instance}get activatedRoute(){if(!this.activated)throw new D(4012,!1);return this._activatedRoute}get activatedRouteData(){return this._activatedRoute?this._activatedRoute.snapshot.data:{}}detach(){if(!this.activated)throw new D(4012,!1);this.location.detach();let t=this.activated;return this.activated=null,this._activatedRoute=null,this.detachEvents.emit(t.instance),t}attach(t,i){this.activated=t,this._activatedRoute=i,this.location.insert(t.hostView),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.attachEvents.emit(t.instance)}deactivate(){if(this.activated){let t=this.component;this.activated.destroy(),this.activated=null,this._activatedRoute=null,this.deactivateEvents.emit(t)}}activateWith(t,i){if(this.isActivated)throw new D(4013,!1);this._activatedRoute=t;let r=this.location,s=t.snapshot.component,a=this.parentContexts.getOrCreateContext(this.name).children,c=new qp(t,a,r.injector,this.routerOutletData);this.activated=r.createComponent(s,{index:r.length,injector:c,environmentInjector:i}),this.changeDetector.markForCheck(),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.activateEvents.emit(this.activated.instance)}static \u0275fac=function(i){return new(i||e)};static \u0275dir=H({type:e,selectors:[["router-outlet"]],inputs:{name:"name",routerOutletData:[1,"routerOutletData"]},outputs:{activateEvents:"activate",deactivateEvents:"deactivate",attachEvents:"attach",detachEvents:"detach"},exportAs:["outlet"],features:[ft]})}return e})(),qp=class{route;childContexts;parent;outletData;constructor(n,t,i,r){this.route=n,this.childContexts=t,this.parent=i,this.outletData=r}get(n,t){return n===pr?this.route:n===qs?this.childContexts:n===Jk?this.outletData:this.parent.get(n,t)}},Wl=new g("");var $E=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275cmp=Z({type:e,selectors:[["ng-component"]],exportAs:["emptyRouterOutlet"],decls:1,vars:0,template:function(i,r){i&1&&Me(0,"router-outlet")},dependencies:[HE],encapsulation:2,changeDetection:1})}return e})();function nm(e){let n=e.children&&e.children.map(nm),t=n?J(v({},e),{children:n}):v({},e);return!t.component&&!t.loadComponent&&(n||t.loadChildren)&&t.outlet&&t.outlet!==U&&(t.component=$E),t}function eN(e,n,t){let i=new Set,r=$s(e,n._root,t?t._root:void 0,i);return{newlyCreatedRoutes:i,state:new Ul(r,n)}}function $s(e,n,t,i){if(t&&e.shouldReuseRoute(n.value,t.value.snapshot)){let r=t.value;r._futureSnapshot=n.value;let o=tN(e,n,t,i);return new Ot(r,o)}else{if(e.shouldAttach(n.value)){let s=e.retrieve(n.value);if(s!==null){let a=s.route;return a.value._futureSnapshot=n.value,a.children=n.children.map(c=>$s(e,c,void 0,i)),a}}let r=nN(n.value);i.add(r);let o=n.children.map(s=>$s(e,s,void 0,i));return new Ot(r,o)}}function tN(e,n,t,i){return n.children.map(r=>{for(let o of t.children)if(e.shouldReuseRoute(r.value,o.value.snapshot))return $s(e,r,o,i);return $s(e,r,void 0,i)})}function nN(e){return new pr(new Re(e.url),new Re(e.params),new Re(e.queryParams),new Re(e.fragment),new Re(e.data),e.outlet,e.component,e)}var zs=class{redirectTo;navigationBehaviorOptions;constructor(n,t){this.redirectTo=n,this.navigationBehaviorOptions=t}},zE="ngNavigationCancelingError";function $l(e,n){let{redirectTo:t,navigationBehaviorOptions:i}=bo(n)?{redirectTo:n,navigationBehaviorOptions:void 0}:n,r=GE(!1,ht.Redirect);return r.url=t,r.navigationBehaviorOptions=i,r}function GE(e,n){let t=new Error(`NavigationCancelingError: ${e||""}`);return t[zE]=!0,t.cancellationCode=n,t}function iN(e){return WE(e)&&bo(e.url)}function WE(e){return!!e&&e[zE]}var Yp=class{routeReuseStrategy;futureState;currState;forwardEvent;inputBindingEnabled;constructor(n,t,i,r,o){this.routeReuseStrategy=n,this.futureState=t,this.currState=i,this.forwardEvent=r,this.inputBindingEnabled=o}activate(n){let t=this.futureState._root,i=this.currState?this.currState._root:null;this.deactivateChildRoutes(t,i,n),Sp(this.futureState.root),this.activateChildRoutes(t,i,n)}deactivateChildRoutes(n,t,i){let r=po(t);n.children.forEach(o=>{let s=o.value.outlet;this.deactivateRoutes(o,r[s],i),delete r[s]}),Object.values(r).forEach(o=>{this.deactivateRouteAndItsChildren(o,i)})}deactivateRoutes(n,t,i){let r=n.value,o=t?t.value:null;if(r===o)if(r.component){let s=i.getContext(r.outlet);s&&this.deactivateChildRoutes(n,t,s.children)}else this.deactivateChildRoutes(n,t,i);else o&&this.deactivateRouteAndItsChildren(t,i)}deactivateRouteAndItsChildren(n,t){n.value.component&&this.routeReuseStrategy.shouldDetach(n.value.snapshot)?this.detachAndStoreRouteSubtree(n,t):this.deactivateRouteAndOutlet(n,t)}detachAndStoreRouteSubtree(n,t){let i=t.getContext(n.value.outlet),r=i&&n.value.component?i.children:t,o=po(n);for(let s of Object.values(o))this.deactivateRouteAndItsChildren(s,r);if(i&&i.outlet){let s=i.outlet.detach(),a=i.children.onOutletDeactivated();this.routeReuseStrategy.store(n.value.snapshot,{componentRef:s,route:n,contexts:a})}}deactivateRouteAndOutlet(n,t){let i=t.getContext(n.value.outlet),r=i&&n.value.component?i.children:t,o=po(n);for(let s of Object.values(o))this.deactivateRouteAndItsChildren(s,r);i&&(i.outlet&&(i.outlet.deactivate(),i.children.onOutletDeactivated()),i.attachRef=null,i.route=null),n.value._localInjector?.destroy()}activateChildRoutes(n,t,i){let r=po(t);n.children.forEach(o=>{this.activateRoutes(o,r[o.value.outlet],i),this.forwardEvent(new Hp(o.value.snapshot))}),n.children.length&&this.forwardEvent(new jp(n.value.snapshot))}activateRoutes(n,t,i){let r=n.value,o=t?t.value:null;if(Sp(r),r===o)if(r.component){let s=i.getOrCreateContext(r.outlet);this.activateChildRoutes(n,t,s.children)}else this.activateChildRoutes(n,t,i);else if(r.component){let s=i.getOrCreateContext(r.outlet);if(this.routeReuseStrategy.shouldAttach(r.snapshot)){let a=this.routeReuseStrategy.retrieve(r.snapshot);this.routeReuseStrategy.store(r.snapshot,null),s.children.onOutletReAttached(a.contexts),s.attachRef=a.componentRef,s.route=a.route.value,s.outlet&&s.outlet.attach(a.componentRef,a.route.value),Sp(a.route.value),this.activateChildRoutes(n,null,s.children)}else s.attachRef=null,s.route=r,s.outlet&&s.outlet.activateWith(r,s.injector),this.activateChildRoutes(n,null,s.children)}else this.activateChildRoutes(n,null,i)}},zl=class{path;route;constructor(n){this.path=n,this.route=this.path[this.path.length-1]}},go=class{component;route;constructor(n,t){this.component=n,this.route=t}};function rN(e,n,t){let i=e._root,r=n?n._root:null;return Fs(i,r,t,[i.value])}function oN(e){let n=e.routeConfig?e.routeConfig.canActivateChild:null;return!n||n.length===0?null:{node:e,guards:n}}function Co(e,n){let t=Symbol(),i=n.get(e,t);return i===t?typeof e=="function"&&!eu(e)?e:n.get(e):i}function Fs(e,n,t,i,r={canDeactivateChecks:[],canActivateChecks:[]}){let o=po(n);return e.children.forEach(s=>{sN(s,o[s.value.outlet],t,i.concat([s.value]),r),delete o[s.value.outlet]}),Object.entries(o).forEach(([s,a])=>Vs(a,t.getContext(s),r)),r}function sN(e,n,t,i,r={canDeactivateChecks:[],canActivateChecks:[]}){let o=e.value,s=n?n.value:null,a=t?t.getContext(e.value.outlet):null;if(s&&o.routeConfig===s.routeConfig){let c=aN(s,o,o.routeConfig.runGuardsAndResolvers);c?r.canActivateChecks.push(new zl(i)):(o.data=s.data,o._resolvedData=s._resolvedData),o.component?Fs(e,n,a?a.children:null,i,r):Fs(e,n,t,i,r),c&&a&&a.outlet&&a.outlet.isActivated&&r.canDeactivateChecks.push(new go(a.outlet.component,s))}else s&&Vs(n,a,r),r.canActivateChecks.push(new zl(i)),o.component?Fs(e,null,a?a.children:null,i,r):Fs(e,null,t,i,r);return r}function aN(e,n,t){if(typeof t=="function")return Ue(n._environmentInjector,()=>t(e,n));switch(t){case"pathParamsChange":return!fr(e.url,n.url);case"pathParamsOrQueryParamsChange":return!fr(e.url,n.url)||!Pn(e.queryParams,n.queryParams);case"always":return!0;case"paramsOrQueryParamsChange":return!Wp(e,n)||!Pn(e.queryParams,n.queryParams);default:return!Wp(e,n)}}function Vs(e,n,t){let i=po(e),r=e.value;Object.entries(i).forEach(([o,s])=>{r.component?n?Vs(s,n.children.getContext(o),t):Vs(s,null,t):Vs(s,n,t)}),r.component?n&&n.outlet&&n.outlet.isActivated?t.canDeactivateChecks.push(new go(n.outlet.component,r)):t.canDeactivateChecks.push(new go(null,r)):t.canDeactivateChecks.push(new go(null,r))}function Ys(e){return typeof e=="function"}function cN(e){return typeof e=="boolean"}function lN(e){return e&&Ys(e.canLoad)}function dN(e){return e&&Ys(e.canActivate)}function uN(e){return e&&Ys(e.canActivateChild)}function fN(e){return e&&Ys(e.canDeactivate)}function hN(e){return e&&Ys(e.canMatch)}function qE(e){return e instanceof Pi||e?.name==="EmptyError"}var Rl=Symbol("INITIAL_VALUE");function Do(){return Qe(e=>Ho(e.map(n=>n.pipe(Dt(1),Ft(Rl)))).pipe(re(n=>{for(let t of n)if(t!==!0){if(t===Rl)return Rl;if(t===!1||pN(t))return t}return!0}),pe(n=>n!==Rl),Dt(1)))}function pN(e){return bo(e)||e instanceof zs}function YE(e){return e.aborted?N(void 0).pipe(Dt(1)):new L(n=>{let t=()=>{n.next(),n.complete()};return e.addEventListener("abort",t),()=>e.removeEventListener("abort",t)})}function ZE(e){return Be(YE(e))}function mN(e){return st(n=>{let{targetSnapshot:t,currentSnapshot:i,guards:{canActivateChecks:r,canDeactivateChecks:o}}=n;return o.length===0&&r.length===0?N(J(v({},n),{guardsResult:!0})):gN(o,t,i).pipe(st(s=>s&&cN(s)?vN(t,r,e):N(s)),re(s=>J(v({},n),{guardsResult:s})))})}function gN(e,n,t){return Se(e).pipe(st(i=>EN(i.component,i.route,t,n)),Un(i=>i!==!0,!0))}function vN(e,n,t){return Se(n).pipe(Rr(i=>li(yN(i.route.parent,t),bN(i.route,t),wN(e,i.path),_N(e,i.route))),Un(i=>i!==!0,!0))}function bN(e,n){return e!==null&&n&&n(new Up(e)),N(!0)}function yN(e,n){return e!==null&&n&&n(new Vp(e)),N(!0)}function _N(e,n){let t=n.routeConfig?n.routeConfig.canActivate:null;if(!t||t.length===0)return N(!0);let i=t.map(r=>$o(()=>{let o=n._environmentInjector,s=Co(r,o),a=dN(s)?s.canActivate(n,e):Ue(o,()=>s(n,e));return mr(a).pipe(Un())}));return N(i).pipe(Do())}function wN(e,n){let t=n[n.length-1],r=n.slice(0,n.length-1).reverse().map(o=>oN(o)).filter(o=>o!==null).map(o=>$o(()=>{let s=o.guards.map(a=>{let c=o.node._environmentInjector,l=Co(a,c),d=uN(l)?l.canActivateChild(t,e):Ue(c,()=>l(t,e));return mr(d).pipe(Un())});return N(s).pipe(Do())}));return N(r).pipe(Do())}function EN(e,n,t,i){let r=n&&n.routeConfig?n.routeConfig.canDeactivate:null;if(!r||r.length===0)return N(!0);let o=r.map(s=>{let a=n._environmentInjector,c=Co(s,a),l=fN(c)?c.canDeactivate(e,n,t,i):Ue(a,()=>c(e,n,t,i));return mr(l).pipe(Un())});return N(o).pipe(Do())}function DN(e,n,t,i,r){let o=n.canLoad;if(o===void 0||o.length===0)return N(!0);let s=o.map(a=>{let c=Co(a,e),l=lN(c)?c.canLoad(n,t):Ue(e,()=>c(n,t)),d=mr(l);return r?d.pipe(ZE(r)):d});return N(s).pipe(Do(),KE(i))}function KE(e){return Pd(gt(n=>{if(typeof n!="boolean")throw $l(e,n)}),re(n=>n===!0))}function CN(e,n,t,i,r,o){let s=n.canMatch;if(!s||s.length===0)return N(!0);let a=s.map(c=>{let l=Co(c,e),d=hN(l)?l.canMatch(n,t,r):Ue(e,()=>l(n,t,r));return mr(d).pipe(ZE(o))});return N(a).pipe(Do(),KE(i))}var si=class e extends Error{segmentGroup;constructor(n){super(),this.segmentGroup=n||null,Object.setPrototypeOf(this,e.prototype)}},Gs=class e extends Error{urlTree;constructor(n){super(),this.urlTree=n,Object.setPrototypeOf(this,e.prototype)}};function IN(e){throw new D(4e3,!1)}function SN(e){throw GE(!1,ht.GuardRejected)}var Zp=class{urlSerializer;urlTree;constructor(n,t){this.urlSerializer=n,this.urlTree=t}async lineralizeSegments(n,t){let i=[],r=t.root;for(;;){if(i=i.concat(r.segments),r.numberOfChildren===0)return i;if(r.numberOfChildren>1||!r.children[U])throw IN(`${n.redirectTo}`);r=r.children[U]}}async applyRedirectCommands(n,t,i,r,o){let s=await xN(t,r,o);if(s instanceof hn)throw new Gs(s);let a=this.applyRedirectCreateUrlTree(s,this.urlSerializer.parse(s),n,i);if(s[0]==="/")throw new Gs(a);return a}applyRedirectCreateUrlTree(n,t,i,r){let o=this.createSegmentGroup(n,t.root,i,r);return new hn(o,this.createQueryParams(t.queryParams,this.urlTree.queryParams),t.fragment)}createQueryParams(n,t){let i={};return Object.entries(n).forEach(([r,o])=>{if(typeof o=="string"&&o[0]===":"){let a=o.substring(1);i[r]=t[a]}else i[r]=o}),i}createSegmentGroup(n,t,i,r){let o=this.createSegments(n,t.segments,i,r),s={};return Object.entries(t.children).forEach(([a,c])=>{s[a]=this.createSegmentGroup(n,c,i,r)}),new de(o,s)}createSegments(n,t,i,r){return t.map(o=>o.path[0]===":"?this.findPosParam(n,o,r):this.findOrReturn(o,i))}findPosParam(n,t,i){let r=i[t.path.substring(1)];if(!r)throw new D(4001,!1);return r}findOrReturn(n,t){let i=0;for(let r of t){if(r.path===n.path)return t.splice(i),r;i++}return n}};function xN(e,n,t){if(typeof e=="string")return Promise.resolve(e);let i=e;return Pl(mr(Ue(t,()=>i(n))))}function TN(e,n){return e.providers&&!e._injector&&(e._injector=ro(e.providers,n,`Route: ${e.path}`)),e._injector??n}function fn(e){return e.outlet||U}function MN(e,n){let t=e.filter(i=>fn(i)===n);return t.push(...e.filter(i=>fn(i)!==n)),t}var Kp={matched:!1,consumedSegments:[],remainingSegments:[],parameters:{},positionalParamSegments:{}};function QE(e){return{routeConfig:e.routeConfig,url:e.url,params:e.params,queryParams:e.queryParams,fragment:e.fragment,data:e.data,outlet:e.outlet,title:e.title,paramMap:e.paramMap,queryParamMap:e.queryParamMap}}function AN(e,n,t,i,r,o,s){let a=XE(e,n,t);if(!a.matched)return N(a);let c=QE(o(a));return i=TN(n,i),CN(i,n,t,r,c,s).pipe(re(l=>l===!0?a:v({},Kp)))}function XE(e,n,t){if(n.path==="")return n.pathMatch==="full"&&(e.hasChildren()||t.length>0)?v({},Kp):{matched:!0,consumedSegments:[],remainingSegments:t,parameters:{},positionalParamSegments:{}};let r=(n.matcher||Dk)(t,e,n);if(!r)return v({},Kp);let o={};Object.entries(r.posParams??{}).forEach(([a,c])=>{o[a]=c.path});let s=r.consumed.length>0?v(v({},o),r.consumed[r.consumed.length-1].parameters):o;return{matched:!0,consumedSegments:r.consumed,remainingSegments:t.slice(r.consumed.length),parameters:s,positionalParamSegments:r.posParams??{}}}function _E(e,n,t,i,r){return t.length>0&&NN(e,t,i,r)?{segmentGroup:new de(n,kN(i,new de(t,e.children))),slicedSegments:[]}:t.length===0&&ON(e,t,i)?{segmentGroup:new de(e.segments,RN(e,t,i,e.children)),slicedSegments:t}:{segmentGroup:new de(e.segments,e.children),slicedSegments:t}}function RN(e,n,t,i){let r={};for(let o of t)if(ql(e,n,o)&&!i[fn(o)]){let s=new de([],{});r[fn(o)]=s}return v(v({},i),r)}function kN(e,n){let t={};t[U]=n;for(let i of e)if(i.path===""&&fn(i)!==U){let r=new de([],{});t[fn(i)]=r}return t}function NN(e,n,t,i){return t.some(r=>!ql(e,n,r)||!(fn(r)!==U)?!1:!(i!==void 0&&fn(r)===i))}function ON(e,n,t){return t.some(i=>ql(e,n,i))}function ql(e,n,t){return(e.hasChildren()||n.length>0)&&t.pathMatch==="full"?!1:t.path===""}function PN(e,n,t){return n.length===0&&!e.children[t]}var Qp=class{};async function FN(e,n,t,i,r,o,s,a){return new Xp(e,n,t,i,r,s,o,a).recognize()}var LN=31,Xp=class{injector;configLoader;rootComponentType;config;urlTree;paramsInheritanceStrategy;urlSerializer;abortSignal;applyRedirects;absoluteRedirectCount=0;allowRedirects=!0;constructor(n,t,i,r,o,s,a,c){this.injector=n,this.configLoader=t,this.rootComponentType=i,this.config=r,this.urlTree=o,this.paramsInheritanceStrategy=s,this.urlSerializer=a,this.abortSignal=c,this.applyRedirects=new Zp(this.urlSerializer,this.urlTree)}noMatchError(n){return new D(4002,`'${n.segmentGroup}'`)}async recognize(){let n=_E(this.urlTree.root,[],[],this.config).segmentGroup,{children:t,rootSnapshot:i}=await this.match(n),r=new Ot(i,t),o=new Hl("",r),s=$k(i,[],this.urlTree.queryParams,this.urlTree.fragment);return s.queryParams=this.urlTree.queryParams,o.url=this.urlSerializer.serialize(s),{state:o,tree:s}}async match(n){let t=new Hs([],Object.freeze({}),Object.freeze(v({},this.urlTree.queryParams)),this.urlTree.fragment,Object.freeze({}),U,this.rootComponentType,null,{},this.injector);try{return{children:await this.processSegmentGroup(this.injector,this.config,n,U,t),rootSnapshot:t}}catch(i){if(i instanceof Gs)return this.urlTree=i.urlTree,this.match(i.urlTree.root);throw i instanceof si?this.noMatchError(i):i}}async processSegmentGroup(n,t,i,r,o){if(i.segments.length===0&&i.hasChildren())return this.processChildren(n,t,i,o);let s=await this.processSegment(n,t,i,i.segments,r,!0,o);return s instanceof Ot?[s]:[]}async processChildren(n,t,i,r){let o=[];for(let c of Object.keys(i.children))c==="primary"?o.unshift(c):o.push(c);let s=[];for(let c of o){let l=i.children[c],d=MN(t,c),f=await this.processSegmentGroup(n,d,l,c,r);s.push(...f)}let a=JE(s);return BN(a),a}async processSegment(n,t,i,r,o,s,a){for(let c of t)try{return await this.processSegmentAgainstRoute(c._injector??n,t,c,i,r,o,s,a)}catch(l){if(l instanceof si||qE(l))continue;throw l}if(PN(i,r,o))return new Qp;throw new si(i)}async processSegmentAgainstRoute(n,t,i,r,o,s,a,c){if(fn(i)!==s&&(s===U||!ql(r,o,i)))throw new si(r);if(i.redirectTo===void 0)return this.matchSegmentAgainstRoute(n,r,i,o,s,c);if(this.allowRedirects&&a)return this.expandSegmentAgainstRouteUsingRedirect(n,r,t,i,o,s,c);throw new si(r)}async expandSegmentAgainstRouteUsingRedirect(n,t,i,r,o,s,a){let{matched:c,parameters:l,consumedSegments:d,positionalParamSegments:f,remainingSegments:h}=XE(t,r,o);if(!c)throw new si(t);typeof r.redirectTo=="string"&&r.redirectTo[0]==="/"&&(this.absoluteRedirectCount++,this.absoluteRedirectCount>LN&&(this.allowRedirects=!1));let p=this.createSnapshot(n,r,o,l,a);if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let m=await this.applyRedirects.applyRedirectCommands(d,r.redirectTo,f,QE(p),n),y=await this.applyRedirects.lineralizeSegments(r,m);return this.processSegment(n,i,t,y.concat(h),s,!1,a)}createSnapshot(n,t,i,r,o){let s=new Hs(i,r,Object.freeze(v({},this.urlTree.queryParams)),this.urlTree.fragment,jN(t),fn(t),t.component??t._loadedComponent??null,t,UN(t),n),a=em(s,o,this.paramsInheritanceStrategy);return s.params=Object.freeze(a.params),s.data=Object.freeze(a.data),s}async matchSegmentAgainstRoute(n,t,i,r,o,s){if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let a=ve=>this.createSnapshot(n,i,ve.consumedSegments,ve.parameters,s),c=await Pl(AN(t,i,r,n,this.urlSerializer,a,this.abortSignal));if(i.path==="**"&&(t.children={}),!c?.matched)throw new si(t);n=i._injector??n;let{routes:l}=await this.getChildConfig(n,i,r),d=i._loadedInjector??n,{parameters:f,consumedSegments:h,remainingSegments:p}=c,m=this.createSnapshot(n,i,h,f,s),{segmentGroup:y,slicedSegments:E}=_E(t,h,p,l,o);if(E.length===0&&y.hasChildren()){let ve=await this.processChildren(d,l,y,m);return new Ot(m,ve)}if(l.length===0&&E.length===0)return new Ot(m,[]);let T=fn(i)===o,$=await this.processSegment(d,l,y,E,T?U:o,!0,m);return new Ot(m,$ instanceof Ot?[$]:[])}async getChildConfig(n,t,i){if(t.children)return{routes:t.children,injector:n};if(t.loadChildren){if(t._loadedRoutes!==void 0){let o=t._loadedNgModuleFactory;return o&&!t._loadedInjector&&(t._loadedInjector=o.create(n).injector),{routes:t._loadedRoutes,injector:t._loadedInjector}}if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);if(await Pl(DN(n,t,i,this.urlSerializer,this.abortSignal))){let o=await this.configLoader.loadChildren(n,t);return t._loadedRoutes=o.routes,t._loadedInjector=o.injector,t._loadedNgModuleFactory=o.factory,o}throw SN(t)}return{routes:[],injector:n}}};function BN(e){e.sort((n,t)=>n.value.outlet===U?-1:t.value.outlet===U?1:n.value.outlet.localeCompare(t.value.outlet))}function VN(e){let n=e.value.routeConfig;return n&&n.path===""}function JE(e){let n=[],t=new Set;for(let i of e){if(!VN(i)){n.push(i);continue}let r=n.find(o=>i.value.routeConfig===o.value.routeConfig);r!==void 0?(r.children.push(...i.children),t.add(r)):n.push(i)}for(let i of t){let r=JE(i.children);n.push(new Ot(i.value,r))}return n.filter(i=>!t.has(i))}function jN(e){return e.data||{}}function UN(e){return e.resolve||{}}function HN(e,n,t,i,r,o,s){return st(async a=>{let{state:c,tree:l}=await FN(e,n,t,i,a.extractedUrl,r,o,s);return J(v({},a),{targetSnapshot:c,urlAfterRedirects:l})})}function $N(e){return st(n=>{let{targetSnapshot:t,guards:{canActivateChecks:i}}=n;if(!i.length)return N(n);let r=new Set(i.map(a=>a.route)),o=new Set;for(let a of r)if(!o.has(a))for(let c of eD(a))o.add(c);let s=0;return Se(o).pipe(Rr(a=>r.has(a)?zN(a,t,e):(a.data=em(a,a.parent,e).resolve,N(void 0))),gt(()=>s++),Ba(1),st(a=>s===o.size?N(n):Ee))})}function eD(e){let n=e.children.map(t=>eD(t)).flat();return[e,...n]}function zN(e,n,t){let i=e.routeConfig,r=e._resolve;return i?.title!==void 0&&!UE(i)&&(r[Ws]=i.title),$o(()=>(e.data=em(e,e.parent,t).resolve,GN(r,e,n).pipe(re(o=>(e._resolvedData=o,e.data=v(v({},e.data),o),null)))))}function GN(e,n,t){let i=Tp(e);if(i.length===0)return N({});let r={};return Se(i).pipe(st(o=>WN(e[o],n,t).pipe(Un(),gt(s=>{if(s instanceof zs)throw $l(new hr,s);r[o]=s}))),Ba(1),re(()=>r),zo(o=>qE(o)?Ee:Vd(o)))}function WN(e,n,t){let i=n._environmentInjector,r=Co(e,i),o=r.resolve?r.resolve(n,t):Ue(i,()=>r(n,t));return mr(o)}function wE(e){return Qe(n=>{let t=e(n);return t?Se(t).pipe(re(()=>n)):N(n)})}var tD=(()=>{class e{buildTitle(t){let i,r=t.root;for(;r!==void 0;)i=this.getResolvedTitleForRoute(r)??i,r=r.children.find(o=>o.outlet===U);return i}getResolvedTitleForRoute(t){return t.data[Ws]}static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:()=>u(qN)})}return e})(),qN=(()=>{class e extends tD{title;constructor(t){super(),this.title=t}updateTitle(t){let i=this.buildTitle(t);i!==void 0&&this.title.setTitle(i)}static \u0275fac=function(i){return new(i||e)(P(hE))};static \u0275prov=G({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),Yl=new g("",{factory:()=>({})}),Zl=new g(""),nD=(()=>{class e{componentLoaders=new WeakMap;childrenLoaders=new WeakMap;onLoadStartListener;onLoadEndListener;compiler=u(Fh);async loadComponent(t,i){if(this.componentLoaders.get(i))return this.componentLoaders.get(i);if(i._loadedComponent)return Promise.resolve(i._loadedComponent);this.onLoadStartListener&&this.onLoadStartListener(i);let r=(async()=>{try{let o=await CE(Ue(t,()=>i.loadComponent())),s=await iD(Qh(o));return this.onLoadEndListener&&this.onLoadEndListener(i),i._loadedComponent=s,s}finally{this.componentLoaders.delete(i)}})();return this.componentLoaders.set(i,r),r}loadChildren(t,i){if(this.childrenLoaders.get(i))return this.childrenLoaders.get(i);if(i._loadedRoutes)return Promise.resolve({routes:i._loadedRoutes,injector:i._loadedInjector});this.onLoadStartListener&&this.onLoadStartListener(i);let r=(async()=>{try{let o=await YN(i,this.compiler,t,this.onLoadEndListener);return i._loadedRoutes=o.routes,i._loadedInjector=o.injector,i._loadedNgModuleFactory=o.factory,o}finally{this.childrenLoaders.delete(i)}})();return this.childrenLoaders.set(i,r),r}static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:e.\u0275fac})}return e})();async function YN(e,n,t,i){let r=await CE(Ue(t,()=>e.loadChildren())),o=await iD(Qh(r)),s;o instanceof al||Array.isArray(o)?s=o:s=await n.compileModuleAsync(o),i&&i(e);let a,c,l=!1,d;return Array.isArray(s)?(c=s,l=!0):(a=s.create(t).injector,d=s,c=a.get(Zl,[],{optional:!0,self:!0}).flat()),{routes:c.map(nm),injector:a,factory:d}}async function iD(e){return e}var im=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:()=>u(ZN)})}return e})(),ZN=(()=>{class e{shouldProcessUrl(t){return!0}extract(t){return t}merge(t,i){return t}static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:e.\u0275fac})}return e})(),rD=new g("");var oD=new g(""),KN=()=>{},sD=new g(""),aD=(()=>{class e{currentNavigation=ke(null,{equal:()=>!1});currentTransition=null;lastSuccessfulNavigation=ke(null);events=new I;transitionAbortWithErrorSubject=new I;configLoader=u(nD);environmentInjector=u(ue);destroyRef=u(ut);urlSerializer=u(Gl);rootContexts=u(qs);location=u(Ci);inputBindingEnabled=u(Wl,{optional:!0})!==null;titleStrategy=u(tD);options=u(Yl,{optional:!0})||{};paramsInheritanceStrategy=this.options.paramsInheritanceStrategy||Xk;urlHandlingStrategy=u(im);createViewTransition=u(rD,{optional:!0});navigationErrorHandler=u(sD,{optional:!0});activatedRouteInjectorFeature=u(oD,{optional:!0});navigationId=0;get hasRequestedNavigation(){return this.navigationId!==0}transitions;afterPreactivation=()=>N(void 0);rootComponentType=null;destroyed=!1;constructor(){let t=r=>this.events.next(new Lp(r)),i=r=>this.events.next(new Bp(r));this.configLoader.onLoadEndListener=i,this.configLoader.onLoadStartListener=t,this.destroyRef.onDestroy(()=>{this.destroyed=!0})}complete(){this.transitions?.complete()}handleNavigationRequest(t){let i=++this.navigationId;Nn(()=>{this.transitions?.next(J(v({},t),{extractedUrl:this.urlHandlingStrategy.extract(t.rawUrl),targetSnapshot:null,targetRouterState:null,guards:{canActivateChecks:[],canDeactivateChecks:[]},guardsResult:null,id:i,routesRecognizeHandler:{},beforeActivateHandler:{}}))})}setupNavigations(t){return this.transitions=new Re(null),this.transitions.pipe(pe(i=>i!==null),Qe(i=>{let r=!0,o=!1,s=new AbortController,a=()=>!o&&this.currentTransition?.id===i.id;return N(i).pipe(Qe(c=>{if(this.navigationId>i.id)return this.cancelNavigationTransition(i,"",ht.SupersededByNewNavigation),Ee;this.currentTransition=i;let l=this.lastSuccessfulNavigation();this.currentNavigation.set({id:c.id,initialUrl:c.rawUrl,extractedUrl:c.extractedUrl,targetBrowserUrl:typeof c.extras.browserUrl=="string"?this.urlSerializer.parse(c.extras.browserUrl):c.extras.browserUrl,trigger:c.source,extras:c.extras,previousNavigation:l?J(v({},l),{previousNavigation:null}):null,abort:()=>s.abort(),routesRecognizeHandler:c.routesRecognizeHandler,beforeActivateHandler:c.beforeActivateHandler});let d=!t.navigated||this.isUpdatingInternalState()||this.isUpdatedBrowserUrl(),f=c.extras.onSameUrlNavigation??t.onSameUrlNavigation;if(!d&&f!=="reload")return this.events.next(new Si(c.id,this.urlSerializer.serialize(c.rawUrl),"",Bl.IgnoredSameUrlNavigation)),c.resolve(!1),Ee;if(this.urlHandlingStrategy.shouldProcessUrl(c.rawUrl))return N(c).pipe(Qe(h=>(this.events.next(new yo(h.id,this.urlSerializer.serialize(h.extractedUrl),h.source,h.restoredState)),h.id!==this.navigationId?Ee:Promise.resolve(h))),HN(this.environmentInjector,this.configLoader,this.rootComponentType,t.config,this.urlSerializer,this.paramsInheritanceStrategy,s.signal),gt(h=>{i.targetSnapshot=h.targetSnapshot,i.urlAfterRedirects=h.urlAfterRedirects,this.currentNavigation.update(p=>(p.finalUrl=h.urlAfterRedirects,p)),this.events.next(new Us)}),Qe(h=>Se(i.routesRecognizeHandler.deferredHandle??N(void 0)).pipe(re(()=>h))),gt(()=>{let h=new Vl(c.id,this.urlSerializer.serialize(c.extractedUrl),this.urlSerializer.serialize(c.urlAfterRedirects),c.targetSnapshot);this.events.next(h)}));if(d&&this.urlHandlingStrategy.shouldProcessUrl(c.currentRawUrl)){let{id:h,extractedUrl:p,source:m,restoredState:y,extras:E}=c,T=new yo(h,this.urlSerializer.serialize(p),m,y);this.events.next(T);let $=VE(this.rootComponentType,this.environmentInjector).snapshot;return this.currentTransition=i=J(v({},c),{targetSnapshot:$,urlAfterRedirects:p,extras:J(v({},E),{skipLocationChange:!1,replaceUrl:!1})}),this.currentNavigation.update(ve=>(ve.finalUrl=p,ve)),N(i)}else return this.events.next(new Si(c.id,this.urlSerializer.serialize(c.extractedUrl),"",Bl.IgnoredByUrlHandlingStrategy)),c.resolve(!1),Ee}),re(c=>{let l=new Np(c.id,this.urlSerializer.serialize(c.extractedUrl),this.urlSerializer.serialize(c.urlAfterRedirects),c.targetSnapshot);return this.events.next(l),this.currentTransition=i=J(v({},c),{guards:rN(c.targetSnapshot,c.currentSnapshot,this.rootContexts)}),i}),mN(c=>this.events.next(c)),Qe(c=>{if(i.guardsResult=c.guardsResult,c.guardsResult&&typeof c.guardsResult!="boolean")throw $l(this.urlSerializer,c.guardsResult);let l=new Op(c.id,this.urlSerializer.serialize(c.extractedUrl),this.urlSerializer.serialize(c.urlAfterRedirects),c.targetSnapshot,!!c.guardsResult);if(this.events.next(l),!a())return Ee;if(!c.guardsResult)return this.cancelNavigationTransition(c,"",ht.GuardRejected),Ee;if(c.guards.canActivateChecks.length===0)return N(c);let d=new Pp(c.id,this.urlSerializer.serialize(c.extractedUrl),this.urlSerializer.serialize(c.urlAfterRedirects),c.targetSnapshot);if(this.events.next(d),!a())return Ee;let f=!1;return N(c).pipe($N(this.paramsInheritanceStrategy),gt({next:()=>{f=!0;let h=new Fp(c.id,this.urlSerializer.serialize(c.extractedUrl),this.urlSerializer.serialize(c.urlAfterRedirects),c.targetSnapshot);this.events.next(h)},complete:()=>{f||this.cancelNavigationTransition(c,"",ht.NoDataFromResolver)}}))}),wE(c=>{let l=f=>{let h=[];if(f.routeConfig?._loadedComponent)f.component=f.routeConfig?._loadedComponent;else if(f.routeConfig?.loadComponent){let p=f._environmentInjector;h.push(this.configLoader.loadComponent(p,f.routeConfig).then(m=>{f.component=m}))}for(let p of f.children)h.push(...l(p));return h},d=l(c.targetSnapshot.root);return d.length===0?N(c):Se(Promise.all(d).then(()=>c))}),Qe(c=>{let{newlyCreatedRoutes:l,state:d}=eN(t.routeReuseStrategy,c.targetSnapshot,c.currentRouterState);return this.currentTransition=i=c=J(v({},c),{targetRouterState:d,newlyCreatedRoutes:l}),this.currentNavigation.update(f=>(f.targetRouterState=d,f)),N(c)}),this.activatedRouteInjectorFeature?.operator()??(c=>c),wE(()=>this.afterPreactivation()),Qe(()=>{let{currentSnapshot:c,targetSnapshot:l}=i,d=this.createViewTransition?.(this.environmentInjector,c.root,l.root);return d?Se(d).pipe(re(()=>i)):N(i)}),Dt(1),Qe(c=>{r=!1,this.events.next(new wo);let l=i.beforeActivateHandler.deferredHandle;return l?Se(l.then(()=>c)):N(c)}),gt(c=>{new Yp(t.routeReuseStrategy,i.targetRouterState,i.currentRouterState,l=>this.events.next(l),this.inputBindingEnabled).activate(this.rootContexts),c.newlyCreatedRoutes?.clear(),a()&&(o=!0,this.currentNavigation.update(l=>(l.abort=KN,l)),this.lastSuccessfulNavigation.set(Nn(this.currentNavigation)),this.events.next(new Ii(c.id,this.urlSerializer.serialize(c.extractedUrl),this.urlSerializer.serialize(c.urlAfterRedirects))),this.titleStrategy?.updateTitle(c.targetRouterState.snapshot),c.resolve(!0))}),Be(YE(s.signal).pipe(pe(()=>!o&&r),gt(()=>{this.cancelNavigationTransition(i,s.signal.reason+"",ht.Aborted)}))),gt({complete:()=>{o=!0}}),Be(this.transitionAbortWithErrorSubject.pipe(gt(c=>{throw c}))),Go(()=>{s.abort(),o||this.cancelNavigationTransition(i,"",ht.SupersededByNewNavigation),this.currentTransition?.id===i.id&&(this.currentNavigation.set(null),this.currentTransition=null)}),zo(c=>{if(o=!0,EE(i),this.destroyed)return i.resolve(!1),Ee;if(WE(c))this.events.next(new un(i.id,this.urlSerializer.serialize(i.extractedUrl),c.message,c.cancellationCode)),iN(c)?this.events.next(new Eo(c.url,c.navigationBehaviorOptions)):i.resolve(!1);else{let l=new _o(i.id,this.urlSerializer.serialize(i.extractedUrl),c,i.targetSnapshot??void 0);try{let d=Ue(this.environmentInjector,()=>this.navigationErrorHandler?.(l));if(d instanceof zs){let{message:f,cancellationCode:h}=$l(this.urlSerializer,d);this.events.next(new un(i.id,this.urlSerializer.serialize(i.extractedUrl),f,h)),this.events.next(new Eo(d.redirectTo,d.navigationBehaviorOptions))}else throw this.events.next(l),c}catch(d){this.options.resolveNavigationPromiseOnError?i.resolve(!1):i.reject(d)}}return Ee}))}))}cancelNavigationTransition(t,i,r){EE(t);let o=new un(t.id,this.urlSerializer.serialize(t.extractedUrl),i,r);this.events.next(o),t.resolve(!1)}isUpdatingInternalState(){return this.currentTransition?.extractedUrl.toString()!==this.currentTransition?.currentUrlTree.toString()}isUpdatedBrowserUrl(){let t=this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))),i=Nn(this.currentNavigation),r=i?.targetBrowserUrl??i?.extractedUrl;return t.toString()!==r?.toString()&&!i?.extras.skipLocationChange}static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:e.\u0275fac})}return e})();function QN(e){return e!==Bs}function EE(e){if(e.newlyCreatedRoutes)for(let n of e.newlyCreatedRoutes)n._localInjector?.destroy()}var cD=new g("");var XN=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:()=>u(JN)})}return e})(),Jp=class{shouldDetach(n){return!1}store(n,t){}shouldAttach(n){return!1}retrieve(n){return null}shouldReuseRoute(n,t){return n.routeConfig===t.routeConfig}shouldDestroyInjector(n){return!0}},JN=(()=>{class e extends Jp{static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:e.\u0275fac})}return e})(),rm=(()=>{class e{urlSerializer=u(Gl);options=u(Yl,{optional:!0})||{};canceledNavigationResolution=this.options.canceledNavigationResolution||"replace";location=u(Ci);urlHandlingStrategy=u(im);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";currentUrlTree=new hn;getCurrentUrlTree(){return this.currentUrlTree}rawUrlTree=this.currentUrlTree;getRawUrlTree(){return this.rawUrlTree}createBrowserPath({finalUrl:t,initialUrl:i,targetBrowserUrl:r}){let o=t!==void 0?this.urlHandlingStrategy.merge(t,i):i,s=r??o;return s instanceof hn?this.urlSerializer.serialize(s):s}routerUrlState(t){return t?.targetBrowserUrl===void 0||t?.finalUrl===void 0?{}:{\u0275routerUrl:this.urlSerializer.serialize(t.finalUrl)}}commitTransition({targetRouterState:t,finalUrl:i,initialUrl:r}){i&&t?(this.currentUrlTree=i,this.rawUrlTree=this.urlHandlingStrategy.merge(i,r),this.routerState=t):this.rawUrlTree=r}routerState=VE(null,u(ue));getRouterState(){return this.routerState}_stateMemento=this.createStateMemento();get stateMemento(){return this._stateMemento}updateStateMemento(){this._stateMemento=this.createStateMemento()}createStateMemento(){return{rawUrlTree:this.rawUrlTree,currentUrlTree:this.currentUrlTree,routerState:this.routerState}}restoredState(){return this.location.getState()}static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:()=>u(eO)})}return e})(),eO=(()=>{class e extends rm{currentPageId=0;lastSuccessfulId=-1;get browserPageId(){return this.canceledNavigationResolution!=="computed"?this.currentPageId:this.restoredState()?.\u0275routerPageId??this.currentPageId}registerNonRouterCurrentEntryChangeListener(t){return this.location.subscribe(i=>{i.type==="popstate"&&setTimeout(()=>{t(i.url,i.state,"popstate",{replaceUrl:!0})})})}handleRouterEvent(t,i){t instanceof yo?this.updateStateMemento():t instanceof Si?this.commitTransition(i):t instanceof Vl?this.urlUpdateStrategy==="eager"&&(i.extras.skipLocationChange||this.setBrowserUrl(this.createBrowserPath(i),i)):t instanceof wo?(this.commitTransition(i),this.urlUpdateStrategy==="deferred"&&!i.extras.skipLocationChange&&this.setBrowserUrl(this.createBrowserPath(i),i)):t instanceof un&&!BE(t)?this.restoreHistory(i):t instanceof _o?this.restoreHistory(i,!0):t instanceof Ii&&(this.lastSuccessfulId=t.id,this.currentPageId=this.browserPageId)}setBrowserUrl(t,i){let{extras:r,id:o}=i,{replaceUrl:s,state:a}=r;if(this.location.isCurrentPathEqualTo(t)||s){let c=this.browserPageId,l=v(v({},a),this.generateNgRouterState(o,c,i));this.location.replaceState(t,"",l)}else{let c=v(v({},a),this.generateNgRouterState(o,this.browserPageId+1,i));this.location.go(t,"",c)}}restoreHistory(t,i=!1){if(this.canceledNavigationResolution==="computed"){let r=this.browserPageId,o=this.currentPageId-r;o!==0?this.location.historyGo(o):this.getCurrentUrlTree()===t.finalUrl&&o===0&&(this.resetInternalState(t),this.resetUrlToCurrentUrlTree())}else this.canceledNavigationResolution==="replace"&&(i&&this.resetInternalState(t),this.resetUrlToCurrentUrlTree())}resetInternalState({finalUrl:t}){this.routerState=this.stateMemento.routerState,this.currentUrlTree=this.stateMemento.currentUrlTree,this.rawUrlTree=this.urlHandlingStrategy.merge(this.currentUrlTree,t??this.rawUrlTree)}resetUrlToCurrentUrlTree(){this.location.replaceState(this.urlSerializer.serialize(this.getRawUrlTree()),"",this.generateNgRouterState(this.lastSuccessfulId,this.currentPageId))}generateNgRouterState(t,i,r){return this.canceledNavigationResolution==="computed"?v({navigationId:t,\u0275routerPageId:i},this.routerUrlState(r)):v({navigationId:t},this.routerUrlState(r))}static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:e.\u0275fac})}return e})();function lD(e,n){e.events.pipe(pe(t=>t instanceof Ii||t instanceof un||t instanceof _o||t instanceof Si),re(t=>t instanceof Ii||t instanceof Si?0:(t instanceof un?t.code===ht.Redirect||t.code===ht.SupersededByNewNavigation:!1)?2:1),pe(t=>t!==2),Dt(1)).subscribe(()=>{n()})}var om=(()=>{class e{get currentUrlTree(){return this.stateManager.getCurrentUrlTree()}get rawUrlTree(){return this.stateManager.getRawUrlTree()}disposed=!1;nonRouterCurrentEntryChangeSubscription;console=u(dl);stateManager=u(rm);options=u(Yl,{optional:!0})||{};pendingTasks=u(An);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";navigationTransitions=u(aD);urlSerializer=u(Gl);location=u(Ci);urlHandlingStrategy=u(im);injector=u(ue);_events=new I;get events(){return this._events}get routerState(){return this.stateManager.getRouterState()}navigated=!1;routeReuseStrategy=u(XN);injectorCleanup=u(cD,{optional:!0});onSameUrlNavigation=this.options.onSameUrlNavigation||"ignore";config=u(Zl,{optional:!0})?.flat()??[];componentInputBindingEnabled=!!u(Wl,{optional:!0});currentNavigation=this.navigationTransitions.currentNavigation.asReadonly();constructor(){this.resetConfig(this.config),this.navigationTransitions.setupNavigations(this).subscribe({error:t=>{}}),this.subscribeToNavigationEvents()}eventsSubscription=new ee;subscribeToNavigationEvents(){let t=this.navigationTransitions.events.subscribe(i=>{try{let r=this.navigationTransitions.currentTransition,o=Nn(this.navigationTransitions.currentNavigation);if(r!==null&&o!==null){if(this.stateManager.handleRouterEvent(i,o),i instanceof un&&i.code!==ht.Redirect&&i.code!==ht.SupersededByNewNavigation)this.navigated=!0;else if(i instanceof Ii)this.navigated=!0,this.injectorCleanup?.(this.routeReuseStrategy,this.routerState,this.config);else if(i instanceof Eo){let s=i.navigationBehaviorOptions,a=this.urlHandlingStrategy.merge(i.url,r.currentRawUrl),c=v({scroll:r.extras.scroll,browserUrl:r.extras.browserUrl,info:r.extras.info,skipLocationChange:r.extras.skipLocationChange,replaceUrl:r.extras.replaceUrl||this.urlUpdateStrategy==="eager"||QN(r.source)},s);this.scheduleNavigation(a,Bs,null,c,{resolve:r.resolve,reject:r.reject,promise:r.promise})}}Kk(i)&&this._events.next(i)}catch(r){this.navigationTransitions.transitionAbortWithErrorSubject.next(r)}});this.eventsSubscription.add(t)}resetRootComponentType(t){this.routerState.root.component=t,this.navigationTransitions.rootComponentType=t}initialNavigation(){this.setUpLocationChangeListener(),this.navigationTransitions.hasRequestedNavigation||this.navigateToSyncWithBrowser(this.location.path(!0),Bs,this.stateManager.restoredState(),{replaceUrl:!0})}setUpLocationChangeListener(){this.nonRouterCurrentEntryChangeSubscription??=this.stateManager.registerNonRouterCurrentEntryChangeListener((t,i,r,o)=>{this.navigateToSyncWithBrowser(t,r,i,o)})}navigateToSyncWithBrowser(t,i,r,o){let s=r?.navigationId?r:null,a=r?.\u0275routerUrl??t;if(r?.\u0275routerUrl&&(o=J(v({},o),{browserUrl:t})),r){let l=v({},r);delete l.navigationId,delete l.\u0275routerPageId,delete l.\u0275routerUrl,Object.keys(l).length!==0&&(o.state=l)}let c=this.parseUrl(a);this.scheduleNavigation(c,i,s,o).catch(l=>{this.disposed||this.injector.get(Jt)(l)})}get url(){return this.serializeUrl(this.currentUrlTree)}getCurrentNavigation(){return Nn(this.navigationTransitions.currentNavigation)}get lastSuccessfulNavigation(){return this.navigationTransitions.lastSuccessfulNavigation}resetConfig(t){this.config=t.map(nm),this.navigated=!1}ngOnDestroy(){this.dispose()}dispose(){this._events.unsubscribe(),this.navigationTransitions.complete(),this.nonRouterCurrentEntryChangeSubscription?.unsubscribe(),this.nonRouterCurrentEntryChangeSubscription=void 0,this.disposed=!0,this.eventsSubscription.unsubscribe()}createUrlTree(t,i={}){let{relativeTo:r,queryParams:o,fragment:s,queryParamsHandling:a,preserveFragment:c}=i,l=c?this.currentUrlTree.fragment:s,d=null;switch(a??this.options.defaultQueryParamsHandling){case"merge":d=v(v({},this.currentUrlTree.queryParams),o);break;case"preserve":d=this.currentUrlTree.queryParams;break;default:d=o||null}d!==null&&(d=this.removeEmptyProps(d));let f;try{let h=r?r.snapshot:this.routerState.snapshot.root;f=OE(h)}catch{(typeof t[0]!="string"||t[0][0]!=="/")&&(t=[]),f=this.currentUrlTree.root}return PE(f,t,d,l??null,this.urlSerializer)}navigateByUrl(t,i={skipLocationChange:!1}){let r=bo(t)?t:this.parseUrl(t),o=this.urlHandlingStrategy.merge(r,this.rawUrlTree);return this.scheduleNavigation(o,Bs,null,i)}navigate(t,i={skipLocationChange:!1}){return tO(t),this.navigateByUrl(this.createUrlTree(t,i),i)}serializeUrl(t){return this.urlSerializer.serialize(t)}parseUrl(t){try{return this.urlSerializer.parse(t)}catch{return this.console.warn(zn(4018,!1)),this.urlSerializer.parse("/")}}isActive(t,i){let r;if(i===!0?r=v({},SE):i===!1?r=v({},Mp):r=v(v({},Mp),i),bo(t))return mE(this.currentUrlTree,t,r);let o=this.parseUrl(t);return mE(this.currentUrlTree,o,r)}removeEmptyProps(t){return Object.entries(t).reduce((i,[r,o])=>(o!=null&&(i[r]=o),i),{})}scheduleNavigation(t,i,r,o,s){if(this.disposed)return Promise.resolve(!1);let a,c,l;s?(a=s.resolve,c=s.reject,l=s.promise):l=new Promise((f,h)=>{a=f,c=h});let d=this.pendingTasks.add();return lD(this,()=>{queueMicrotask(()=>this.pendingTasks.remove(d))}),this.navigationTransitions.handleNavigationRequest({source:i,restoredState:r,currentUrlTree:this.currentUrlTree,currentRawUrl:this.currentUrlTree,rawUrl:t,extras:o,resolve:a,reject:c,promise:l,currentSnapshot:this.routerState.snapshot,currentRouterState:this.routerState}),l.catch(Promise.reject.bind(Promise))}static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:e.\u0275fac})}return e})();function tO(e){for(let n=0;n<e.length;n++)if(e[n]==null)throw new D(4008,!1)}var nO=new g("");function sm(e,...n){return wn([{provide:Zl,multi:!0,useValue:e},{provide:pr,useFactory:iO},{provide:cn,multi:!0,useFactory:rO},n.map(t=>t.\u0275providers)])}function iO(){return u(om).routerState.root}function rO(){let e=u(ne);return n=>{let t=e.get(Pe);if(n!==t.components[0])return;let i=e.get(om),r=e.get(oO);e.get(sO)===1&&i.initialNavigation(),e.get(aO,null,{optional:!0})?.setUpPreloading(),e.get(nO,null,{optional:!0})?.init(),i.resetRootComponentType(t.componentTypes[0]),r.closed||(r.next(),r.complete(),r.unsubscribe())}}var oO=new g("",{factory:()=>new I}),sO=new g("",{factory:()=>1});var aO=new g("");var dD=[];var uD={providers:[Vu(),sm(dD),pE()]};var Zs=class{_attachedHost=null;attach(n){return this._attachedHost=n,n.attach(this)}detach(){let n=this._attachedHost;n!=null&&(this._attachedHost=null,n.detach())}get isAttached(){return this._attachedHost!=null}setAttachedHost(n){this._attachedHost=n}},Io=class extends Zs{component;viewContainerRef;injector;projectableNodes;bindings;directives;constructor(n,t,i,r,o,s){super(),this.component=n,this.viewContainerRef=t,this.injector=i,this.projectableNodes=r,this.bindings=o||null,this.directives=s||null}},pn=class extends Zs{templateRef;viewContainerRef;context;injector;constructor(n,t,i,r){super(),this.templateRef=n,this.viewContainerRef=t,this.context=i,this.injector=r}get origin(){return this.templateRef.elementRef}attach(n,t=this.context){return this.context=t,super.attach(n)}detach(){return this.context=void 0,super.detach()}},am=class extends Zs{element;constructor(n){super(),this.element=n instanceof Y?n.nativeElement:n}},So=class{_attachedPortal=null;_disposeFn=null;_isDisposed=!1;hasAttached(){return!!this._attachedPortal}attach(n){if(n instanceof Io)return this._attachedPortal=n,this.attachComponentPortal(n);if(n instanceof pn)return this._attachedPortal=n,this.attachTemplatePortal(n);if(this.attachDomPortal&&n instanceof am)return this._attachedPortal=n,this.attachDomPortal(n)}attachDomPortal=null;detach(){this._attachedPortal&&(this._attachedPortal.setAttachedHost(null),this._attachedPortal=null),this._invokeDisposeFn()}dispose(){this.hasAttached()&&this.detach(),this._invokeDisposeFn(),this._isDisposed=!0}setDisposeFn(n){this._disposeFn=n}_invokeDisposeFn(){this._disposeFn&&(this._disposeFn(),this._disposeFn=null)}},Kl=class extends So{outletElement;_appRef;_defaultInjector;constructor(n,t,i){super(),this.outletElement=n,this._appRef=t,this._defaultInjector=i}attachComponentPortal(n){let t;if(n.viewContainerRef){let i=n.injector||n.viewContainerRef.injector,r=i.get(Jn,null,{optional:!0})||void 0;t=n.viewContainerRef.createComponent(n.component,{index:n.viewContainerRef.length,injector:i,ngModuleRef:r,projectableNodes:n.projectableNodes||void 0,bindings:n.bindings||void 0,directives:n.directives||void 0}),this.setDisposeFn(()=>t.destroy())}else{let i=this._appRef,r=n.injector||this._defaultInjector||ne.NULL,o=r.get(ue,i.injector);t=_l(n.component,{elementInjector:r,environmentInjector:o,projectableNodes:n.projectableNodes||void 0,bindings:n.bindings||void 0,directives:n.directives||void 0}),i.attachView(t.hostView),this.setDisposeFn(()=>{i.viewCount>0&&i.detachView(t.hostView),t.destroy()})}return this.outletElement.appendChild(this._getComponentRootNode(t)),this._attachedPortal=n,t}attachTemplatePortal(n){let t=n.viewContainerRef,i=t.createEmbeddedView(n.templateRef,n.context,{injector:n.injector});return i.rootNodes.forEach(r=>this.outletElement.appendChild(r)),i.detectChanges(),this.setDisposeFn(()=>{let r=t.indexOf(i);r!==-1&&t.remove(r)}),this._attachedPortal=n,i}attachDomPortal=n=>{let t=n.element;t.parentNode;let i=this.outletElement.ownerDocument.createComment("dom-portal");t.parentNode.insertBefore(i,t),this.outletElement.appendChild(t),this._attachedPortal=n,super.setDisposeFn(()=>{i.parentNode&&i.parentNode.replaceChild(t,i)})};dispose(){super.dispose(),this.outletElement.remove()}_getComponentRootNode(n){return n.hostView.rootNodes[0]}},fD=(()=>{class e extends pn{constructor(){let t=u(He),i=u(Je);super(t,i)}static \u0275fac=function(i){return new(i||e)};static \u0275dir=H({type:e,selectors:[["","cdkPortal",""]],exportAs:["cdkPortal"],features:[Oe]})}return e})(),xi=(()=>{class e extends So{_moduleRef=u(Jn,{optional:!0});_document=u(O);_viewContainerRef=u(Je);_isInitialized=!1;_attachedRef=null;get portal(){return this._attachedPortal}set portal(t){this.hasAttached()&&!t&&!this._isInitialized||(this.hasAttached()&&super.detach(),t&&super.attach(t),this._attachedPortal=t||null)}attached=new k;get attachedRef(){return this._attachedRef}ngOnInit(){this._isInitialized=!0}ngOnDestroy(){super.dispose(),this._attachedRef=this._attachedPortal=null}attachComponentPortal(t){t.setAttachedHost(this);let i=t.viewContainerRef!=null?t.viewContainerRef:this._viewContainerRef,r=i.createComponent(t.component,{index:i.length,injector:t.injector||i.injector,projectableNodes:t.projectableNodes||void 0,ngModuleRef:this._moduleRef||void 0,bindings:t.bindings||void 0,directives:t.directives||void 0});return i!==this._viewContainerRef&&this._getRootNode().appendChild(r.hostView.rootNodes[0]),super.setDisposeFn(()=>r.destroy()),this._attachedPortal=t,this._attachedRef=r,this.attached.emit(r),r}attachTemplatePortal(t){t.setAttachedHost(this);let i=this._viewContainerRef.createEmbeddedView(t.templateRef,t.context,{injector:t.injector});return super.setDisposeFn(()=>this._viewContainerRef.clear()),this._attachedPortal=t,this._attachedRef=i,this.attached.emit(i),i}attachDomPortal=t=>{let i=t.element;i.parentNode;let r=this._document.createComment("dom-portal");t.setAttachedHost(this),i.parentNode.insertBefore(r,i),this._getRootNode().appendChild(i),this._attachedPortal=t,super.setDisposeFn(()=>{r.parentNode&&r.parentNode.replaceChild(i,r)})};_getRootNode(){let t=this._viewContainerRef.element.nativeElement;return t.nodeType===t.ELEMENT_NODE?t:t.parentNode}static \u0275fac=(()=>{let t;return function(r){return(t||(t=At(e)))(r||e)}})();static \u0275dir=H({type:e,selectors:[["","cdkPortalOutlet",""]],inputs:{portal:[0,"cdkPortalOutlet","portal"]},outputs:{attached:"attached"},exportAs:["cdkPortalOutlet"],features:[Oe]})}return e})(),Ql=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=me({type:e});static \u0275inj=fe({})}return e})();var Xl=new WeakMap,Ze=(()=>{class e{_appRef;_injector=u(ne);_environmentInjector=u(ue);load(t){let i=this._appRef=this._appRef||this._injector.get(Pe),r=Xl.get(i);r||(r={loaders:new Set,refs:[]},Xl.set(i,r),i.onDestroy(()=>{Xl.get(i)?.refs.forEach(o=>o.destroy()),Xl.delete(i)})),r.loaders.has(t)||(r.loaders.add(t),r.refs.push(_l(t,{environmentInjector:this._environmentInjector})))}static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:e.\u0275fac})}return e})();var cm=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275cmp=Z({type:e,selectors:[["ng-component"]],exportAs:["cdkVisuallyHidden"],decls:0,vars:0,template:function(i,r){},styles:[`.cdk-visually-hidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
  outline: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  left: 0;
}
[dir=rtl] .cdk-visually-hidden {
  left: auto;
  right: 0;
}
`],encapsulation:2})}return e})(),Jl;function lO(){if(Jl===void 0&&(Jl=null,typeof window<"u")){let e=window;e.trustedTypes!==void 0&&(Jl=e.trustedTypes.createPolicy("angular#components",{createHTML:n=>n}))}return Jl}function dO(e){return lO()?.createHTML(e)||e}function hD(e,n,t){let i=t.sanitize(on.HTML,n);e.innerHTML=dO(i||"")}var mn=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275cmp=Z({type:e,selectors:[["structural-styles"]],decls:0,vars:0,template:function(i,r){},styles:[`.mat-focus-indicator {
  position: relative;
}
.mat-focus-indicator::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  box-sizing: border-box;
  pointer-events: none;
  display: var(--mat-focus-indicator-display, none);
  border-width: var(--mat-focus-indicator-border-width, 3px);
  border-style: var(--mat-focus-indicator-border-style, solid);
  border-color: var(--mat-focus-indicator-border-color, transparent);
  border-radius: var(--mat-focus-indicator-border-radius, 4px);
}
.mat-focus-indicator:focus-visible::before {
  content: "";
}

@media (forced-colors: active) {
  html {
    --mat-focus-indicator-display: block;
  }
}
`],encapsulation:2})}return e})();function Ks(e){return e.buttons===0||e.detail===0}function Qs(e){let n=e.touches&&e.touches[0]||e.changedTouches&&e.changedTouches[0];return!!n&&n.identifier===-1&&(n.radiusX==null||n.radiusX===1)&&(n.radiusY==null||n.radiusY===1)}var lm;function pD(){if(lm==null){let e=typeof document<"u"?document.head:null;lm=!!(e&&(e.createShadowRoot||e.attachShadow))}return lm}function dm(e){if(pD()){let n=e.getRootNode?e.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&n instanceof ShadowRoot)return n}return null}function wt(e){if(e.composedPath)try{return e.composedPath()[0]}catch{}return e.target}var um;try{um=typeof Intl<"u"&&Intl.v8BreakIterator}catch{um=!1}var Ae=(()=>{class e{_platformId=u(Zi);isBrowser=this._platformId?Gw(this._platformId):typeof document=="object"&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||um)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:e.\u0275fac})}return e})();var Xs;function mD(){if(Xs==null&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>Xs=!0}))}finally{Xs=Xs||!1}return Xs}function xo(e){return mD()?e:!!e.capture}function ed(e,n=0){return gD(e)?Number(e):arguments.length===2?n:0}function gD(e){return!isNaN(parseFloat(e))&&!isNaN(Number(e))}function $t(e){return e instanceof Y?e.nativeElement:e}var vD=new g("cdk-input-modality-detector-options"),bD={ignoreKeys:[18,17,224,91,16]},yD=650,fm={passive:!0,capture:!0},_D=(()=>{class e{_platform=u(Ae);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new Re(null);_options;_lastTouchMs=0;_onKeydown=t=>{this._options?.ignoreKeys?.some(i=>i===t.keyCode)||(this._modality.next("keyboard"),this._mostRecentTarget=wt(t))};_onMousedown=t=>{Date.now()-this._lastTouchMs<yD||(this._modality.next(Ks(t)?"keyboard":"mouse"),this._mostRecentTarget=wt(t))};_onTouchstart=t=>{if(Qs(t)){this._modality.next("keyboard");return}this._lastTouchMs=Date.now(),this._modality.next("touch"),this._mostRecentTarget=wt(t)};constructor(){let t=u(M),i=u(O),r=u(vD,{optional:!0});if(this._options=v(v({},bD),r),this.modalityDetected=this._modality.pipe(Li(1)),this.modalityChanged=this.modalityDetected.pipe(La()),this._platform.isBrowser){let o=u($e).createRenderer(null,null);this._listenerCleanups=t.runOutsideAngular(()=>[o.listen(i,"keydown",this._onKeydown,fm),o.listen(i,"mousedown",this._onMousedown,fm),o.listen(i,"touchstart",this._onTouchstart,fm)])}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach(t=>t())}static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:e.\u0275fac})}return e})(),Js=(function(e){return e[e.IMMEDIATE=0]="IMMEDIATE",e[e.EVENTUAL=1]="EVENTUAL",e})(Js||{}),wD=new g("cdk-focus-monitor-default-options"),td=xo({passive:!0,capture:!0}),gn=(()=>{class e{_ngZone=u(M);_platform=u(Ae);_inputModalityDetector=u(_D);_origin=null;_lastFocusOrigin=null;_windowFocused=!1;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=!1;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=!1)};_document=u(O);_stopInputModalityDetector=new I;constructor(){let t=u(wD,{optional:!0});this._detectionMode=t?.detectionMode||Js.IMMEDIATE}_rootNodeFocusAndBlurListener=t=>{let i=wt(t);for(let r=i;r;r=r.parentElement)t.type==="focus"?this._onFocus(t,r):this._onBlur(t,r)};monitor(t,i=!1){let r=$t(t);if(!this._platform.isBrowser||r.nodeType!==1)return N();let o=dm(r)||this._document,s=this._elementInfo.get(r);if(s)return i&&(s.checkChildren=!0),s.subject;let a={checkChildren:i,subject:new I,rootNode:o};return this._elementInfo.set(r,a),this._registerGlobalListeners(a),a.subject}stopMonitoring(t){let i=$t(t),r=this._elementInfo.get(i);r&&(r.subject.complete(),this._setClasses(i),this._elementInfo.delete(i),this._removeGlobalListeners(r))}focusVia(t,i,r){let o=$t(t),s=this._document.activeElement;o===s?this._getClosestElementsInfo(o).forEach(([a,c])=>this._originChanged(a,i,c)):(this._setOrigin(i),typeof o.focus=="function"&&o.focus(r))}ngOnDestroy(){this._elementInfo.forEach((t,i)=>this.stopMonitoring(i))}_getWindow(){return this._document.defaultView||window}_getFocusOrigin(t){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(t)?"touch":"program":this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:t&&this._isLastInteractionFromInputLabel(t)?"mouse":"program"}_shouldBeAttributedToTouch(t){return this._detectionMode===Js.EVENTUAL||!!t?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(t,i){t.classList.toggle("cdk-focused",!!i),t.classList.toggle("cdk-touch-focused",i==="touch"),t.classList.toggle("cdk-keyboard-focused",i==="keyboard"),t.classList.toggle("cdk-mouse-focused",i==="mouse"),t.classList.toggle("cdk-program-focused",i==="program")}_setOrigin(t,i=!1){this._ngZone.runOutsideAngular(()=>{if(this._origin=t,this._originFromTouchInteraction=t==="touch"&&i,this._detectionMode===Js.IMMEDIATE){clearTimeout(this._originTimeoutId);let r=this._originFromTouchInteraction?yD:1;this._originTimeoutId=setTimeout(()=>this._origin=null,r)}})}_onFocus(t,i){let r=this._elementInfo.get(i),o=wt(t);!r||!r.checkChildren&&i!==o||this._originChanged(i,this._getFocusOrigin(o),r)}_onBlur(t,i){let r=this._elementInfo.get(i);!r||r.checkChildren&&t.relatedTarget instanceof Node&&i.contains(t.relatedTarget)||(this._setClasses(i),this._emitOrigin(r,null))}_emitOrigin(t,i){t.subject.observers.length&&this._ngZone.run(()=>t.subject.next(i))}_registerGlobalListeners(t){if(!this._platform.isBrowser)return;let i=t.rootNode,r=this._rootNodeFocusListenerCount.get(i)||0;r||this._ngZone.runOutsideAngular(()=>{i.addEventListener("focus",this._rootNodeFocusAndBlurListener,td),i.addEventListener("blur",this._rootNodeFocusAndBlurListener,td)}),this._rootNodeFocusListenerCount.set(i,r+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener("focus",this._windowFocusListener)}),this._inputModalityDetector.modalityDetected.pipe(Be(this._stopInputModalityDetector)).subscribe(o=>{this._setOrigin(o,!0)}))}_removeGlobalListeners(t){let i=t.rootNode;if(this._rootNodeFocusListenerCount.has(i)){let r=this._rootNodeFocusListenerCount.get(i);r>1?this._rootNodeFocusListenerCount.set(i,r-1):(i.removeEventListener("focus",this._rootNodeFocusAndBlurListener,td),i.removeEventListener("blur",this._rootNodeFocusAndBlurListener,td),this._rootNodeFocusListenerCount.delete(i))}--this._monitoredElementCount||(this._getWindow().removeEventListener("focus",this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId))}_originChanged(t,i,r){this._setClasses(t,i),this._emitOrigin(r,i),this._lastFocusOrigin=i}_getClosestElementsInfo(t){let i=[];return this._elementInfo.forEach((r,o)=>{(o===t||r.checkChildren&&o.contains(t))&&i.push([o,r])}),i}_isLastInteractionFromInputLabel(t){let{_mostRecentTarget:i,mostRecentModality:r}=this._inputModalityDetector;if(r!=="mouse"||!i||i===t||t.nodeName!=="INPUT"&&t.nodeName!=="TEXTAREA"||t.disabled)return!1;let o=t.labels;if(o){for(let s=0;s<o.length;s++)if(o[s].contains(i))return!0}return!1}static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:e.\u0275fac})}return e})(),hm=(()=>{class e{_elementRef=u(Y);_focusMonitor=u(gn);_monitorSubscription;_focusOrigin=null;cdkFocusChange=new k;get focusOrigin(){return this._focusOrigin}ngAfterViewInit(){let t=this._elementRef.nativeElement;this._monitorSubscription=this._focusMonitor.monitor(t,t.nodeType===1&&t.hasAttribute("cdkMonitorSubtreeFocus")).subscribe(i=>{this._focusOrigin=i,this.cdkFocusChange.emit(i)})}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef),this._monitorSubscription?.unsubscribe()}static \u0275fac=function(i){return new(i||e)};static \u0275dir=H({type:e,selectors:[["","cdkMonitorElementFocus",""],["","cdkMonitorSubtreeFocus",""]],outputs:{cdkFocusChange:"cdkFocusChange"},exportAs:["cdkMonitorFocus"]})}return e})();function ea(e){return Array.isArray(e)?e:[e]}var ED=new Set,gr,nd=(()=>{class e{_platform=u(Ae);_nonce=u(Ki,{optional:!0});_matchMedia;constructor(){this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):fO}matchMedia(t){return(this._platform.WEBKIT||this._platform.BLINK)&&uO(t,this._nonce),this._matchMedia(t)}static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:e.\u0275fac})}return e})();function uO(e,n){if(!ED.has(e))try{gr||(gr=document.createElement("style"),n&&gr.setAttribute("nonce",n),gr.setAttribute("type","text/css"),document.head.appendChild(gr)),gr.sheet&&(gr.sheet.insertRule(`@media ${e.replace(/[{}]/g,"")} {body{ }}`,0),ED.add(e))}catch(t){console.error(t)}}function fO(e){return{matches:e==="all"||e==="",media:e,addListener:()=>{},removeListener:()=>{}}}var pm=(()=>{class e{_mediaMatcher=u(nd);_zone=u(M);_queries=new Map;_destroySubject=new I;ngOnDestroy(){this._destroySubject.next(),this._destroySubject.complete()}isMatched(t){return DD(ea(t)).some(r=>this._registerQuery(r).mql.matches)}observe(t){let r=DD(ea(t)).map(s=>this._registerQuery(s).observable),o=Ho(r);return o=li(o.pipe(Dt(1)),o.pipe(Li(1),jn(0))),o.pipe(re(s=>{let a={matches:!1,breakpoints:{}};return s.forEach(({matches:c,query:l})=>{a.matches=a.matches||c,a.breakpoints[l]=c}),a}))}_registerQuery(t){if(this._queries.has(t))return this._queries.get(t);let i=this._mediaMatcher.matchMedia(t),o={observable:new L(s=>{let a=c=>this._zone.run(()=>s.next(c));return i.addListener(a),()=>{i.removeListener(a)}}).pipe(Ft(i),re(({matches:s})=>({query:t,matches:s})),Be(this._destroySubject)),mql:i};return this._queries.set(t,o),o}static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:e.\u0275fac})}return e})();function DD(e){return e.map(n=>n.split(",")).reduce((n,t)=>n.concat(t)).map(n=>n.trim())}function hO(e){if(e.type==="characterData"&&e.target instanceof Comment)return!0;if(e.type==="childList"){for(let n=0;n<e.addedNodes.length;n++)if(!(e.addedNodes[n]instanceof Comment))return!1;for(let n=0;n<e.removedNodes.length;n++)if(!(e.removedNodes[n]instanceof Comment))return!1;return!0}return!1}var pO=(()=>{class e{create(t){return typeof MutationObserver>"u"?null:new MutationObserver(t)}static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:e.\u0275fac})}return e})(),mO=(()=>{class e{_mutationObserverFactory=u(pO);_observedElements=new Map;_ngZone=u(M);ngOnDestroy(){this._observedElements.forEach((t,i)=>this._cleanupObserver(i))}observe(t){let i=$t(t);return new L(r=>{let s=this._observeElement(i).pipe(re(a=>a.filter(c=>!hO(c))),pe(a=>!!a.length)).subscribe(a=>{this._ngZone.run(()=>{r.next(a)})});return()=>{s.unsubscribe(),this._unobserveElement(i)}})}_observeElement(t){return this._ngZone.runOutsideAngular(()=>{if(this._observedElements.has(t))this._observedElements.get(t).count++;else{let i=new I,r=this._mutationObserverFactory.create(o=>i.next(o));r&&r.observe(t,{characterData:!0,childList:!0,subtree:!0}),this._observedElements.set(t,{observer:r,stream:i,count:1})}return this._observedElements.get(t).stream})}_unobserveElement(t){this._observedElements.has(t)&&(this._observedElements.get(t).count--,this._observedElements.get(t).count||this._cleanupObserver(t))}_cleanupObserver(t){if(this._observedElements.has(t)){let{observer:i,stream:r}=this._observedElements.get(t);i&&i.disconnect(),r.complete(),this._observedElements.delete(t)}}static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:e.\u0275fac})}return e})(),CD=(()=>{class e{_contentObserver=u(mO);_elementRef=u(Y);event=new k;get disabled(){return this._disabled}set disabled(t){this._disabled=t,this._disabled?this._unsubscribe():this._subscribe()}_disabled=!1;get debounce(){return this._debounce}set debounce(t){this._debounce=ed(t),this._subscribe()}_debounce;_currentSubscription=null;ngAfterContentInit(){!this._currentSubscription&&!this.disabled&&this._subscribe()}ngOnDestroy(){this._unsubscribe()}_subscribe(){this._unsubscribe();let t=this._contentObserver.observe(this._elementRef);this._currentSubscription=(this.debounce?t.pipe(jn(this.debounce)):t).subscribe(this.event)}_unsubscribe(){this._currentSubscription?.unsubscribe()}static \u0275fac=function(i){return new(i||e)};static \u0275dir=H({type:e,selectors:[["","cdkObserveContent",""]],inputs:{disabled:[2,"cdkObserveContentDisabled","disabled",j],debounce:"debounce"},outputs:{event:"cdkObserveContent"},exportAs:["cdkObserveContent"]})}return e})();var ID=new g("liveAnnouncerElement",{providedIn:"root",factory:()=>null}),SD=new g("LIVE_ANNOUNCER_DEFAULT_OPTIONS"),gO=0,mm=(()=>{class e{_ngZone=u(M);_defaultOptions=u(SD,{optional:!0});_liveElement;_document=u(O);_sanitizer=u(Ep);_previousTimeout;_currentPromise;_currentResolve;constructor(){let t=u(ID,{optional:!0});this._liveElement=t||this._createLiveElement()}announce(t,...i){let r=this._defaultOptions,o,s;return i.length===1&&typeof i[0]=="number"?s=i[0]:[o,s]=i,this.clear(),clearTimeout(this._previousTimeout),o||(o=r&&r.politeness?r.politeness:"polite"),s==null&&r&&(s=r.duration),this._liveElement.setAttribute("aria-live",o),this._liveElement.id&&this._exposeAnnouncerToModals(this._liveElement.id),this._ngZone.runOutsideAngular(()=>(this._currentPromise||(this._currentPromise=new Promise(a=>this._currentResolve=a)),clearTimeout(this._previousTimeout),this._previousTimeout=setTimeout(()=>{!t||typeof t=="string"?this._liveElement.textContent=t:hD(this._liveElement,t,this._sanitizer),typeof s=="number"&&(this._previousTimeout=setTimeout(()=>this.clear(),s)),this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0},100),this._currentPromise))}clear(){this._liveElement&&(this._liveElement.textContent="")}ngOnDestroy(){clearTimeout(this._previousTimeout),this._liveElement?.remove(),this._liveElement=null,this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0}_createLiveElement(){let t="cdk-live-announcer-element",i=this._document.getElementsByClassName(t),r=this._document.createElement("div");for(let o=0;o<i.length;o++)i[o].remove();return r.classList.add(t),r.classList.add("cdk-visually-hidden"),r.setAttribute("aria-atomic","true"),r.setAttribute("aria-live","polite"),r.id=`cdk-live-announcer-${gO++}`,this._document.body.appendChild(r),r}_exposeAnnouncerToModals(t){let i=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let r=0;r<i.length;r++){let o=i[r],s=o.getAttribute("aria-owns");s?s.indexOf(t)===-1&&o.setAttribute("aria-owns",s+" "+t):o.setAttribute("aria-owns",t)}}static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:e.\u0275fac})}return e})();var vO=200,id=class{_letterKeyStream=new I;_items=[];_selectedItemIndex=-1;_pressedLetters=[];_skipPredicateFn;_selectedItem=new I;selectedItem=this._selectedItem;constructor(n,t){let i=typeof t?.debounceInterval=="number"?t.debounceInterval:vO;t?.skipPredicate&&(this._skipPredicateFn=t.skipPredicate),this.setItems(n),this._setupKeyHandler(i)}destroy(){this._pressedLetters=[],this._letterKeyStream.complete(),this._selectedItem.complete()}setCurrentSelectedItemIndex(n){this._selectedItemIndex=n}setItems(n){this._items=n}handleKey(n){let t=n.keyCode;n.key&&n.key.length===1?this._letterKeyStream.next(n.key.toLocaleUpperCase()):(t>=65&&t<=90||t>=48&&t<=57)&&this._letterKeyStream.next(String.fromCharCode(t))}isTyping(){return this._pressedLetters.length>0}reset(){this._pressedLetters=[]}_setupKeyHandler(n){this._letterKeyStream.pipe(gt(t=>this._pressedLetters.push(t)),jn(n),pe(()=>this._pressedLetters.length>0),re(()=>this._pressedLetters.join("").toLocaleUpperCase())).subscribe(t=>{for(let i=1;i<this._items.length+1;i++){let r=(this._selectedItemIndex+i)%this._items.length,o=this._items[r];if(!this._skipPredicateFn?.(o)&&o.getLabel?.().toLocaleUpperCase().trim().indexOf(t)===0){this._selectedItem.next(o);break}}this._pressedLetters=[]})}};function To(e,...n){return n.length?n.some(t=>e[t]):e.altKey||e.shiftKey||e.ctrlKey||e.metaKey}var rd=class{_items;_activeItemIndex=ke(-1);_activeItem=ke(null);_wrap=!1;_typeaheadSubscription=ee.EMPTY;_itemChangesSubscription;_vertical=!0;_horizontal=null;_allowedModifierKeys=[];_homeAndEnd=!1;_pageUpAndDown={enabled:!1,delta:10};_effectRef;_typeahead;_skipPredicateFn=n=>n.disabled;constructor(n,t){this._items=n,n instanceof nn?this._itemChangesSubscription=n.changes.subscribe(i=>this._itemsChanged(i.toArray())):Hr(n)&&(this._effectRef=Ur(()=>this._itemsChanged(n()),{injector:t}))}tabOut=new I;change=new I;skipPredicate(n){return this._skipPredicateFn=n,this}withWrap(n=!0){return this._wrap=n,this}withVerticalOrientation(n=!0){return this._vertical=n,this}withHorizontalOrientation(n){return this._horizontal=n,this}withAllowedModifierKeys(n){return this._allowedModifierKeys=n,this}withTypeAhead(n=200){this._typeaheadSubscription.unsubscribe();let t=this._getItemsArray();return this._typeahead=new id(t,{debounceInterval:typeof n=="number"?n:void 0,skipPredicate:i=>this._skipPredicateFn(i)}),this._typeaheadSubscription=this._typeahead.selectedItem.subscribe(i=>{this.setActiveItem(i)}),this}cancelTypeahead(){return this._typeahead?.reset(),this}withHomeAndEnd(n=!0){return this._homeAndEnd=n,this}withPageUpDown(n=!0,t=10){return this._pageUpAndDown={enabled:n,delta:t},this}setActiveItem(n){let t=this._activeItem();this.updateActiveItem(n),this._activeItem()!==t&&this.change.next(this._activeItemIndex())}onKeydown(n){let t=n.keyCode,r=["altKey","ctrlKey","metaKey","shiftKey"].every(o=>!n[o]||this._allowedModifierKeys.indexOf(o)>-1);switch(t){case 9:this.tabOut.next();return;case 40:if(this._vertical&&r){this.setNextItemActive();break}else return;case 38:if(this._vertical&&r){this.setPreviousItemActive();break}else return;case 39:if(this._horizontal&&r){this._horizontal==="rtl"?this.setPreviousItemActive():this.setNextItemActive();break}else return;case 37:if(this._horizontal&&r){this._horizontal==="rtl"?this.setNextItemActive():this.setPreviousItemActive();break}else return;case 36:if(this._homeAndEnd&&r){this.setFirstItemActive();break}else return;case 35:if(this._homeAndEnd&&r){this.setLastItemActive();break}else return;case 33:if(this._pageUpAndDown.enabled&&r){let o=this._activeItemIndex()-this._pageUpAndDown.delta;this._setActiveItemByIndex(o>0?o:0,1);break}else return;case 34:if(this._pageUpAndDown.enabled&&r){let o=this._activeItemIndex()+this._pageUpAndDown.delta,s=this._getItemsArray().length;this._setActiveItemByIndex(o<s?o:s-1,-1);break}else return;default:(r||To(n,"shiftKey"))&&this._typeahead?.handleKey(n);return}this._typeahead?.reset(),n.preventDefault()}get activeItemIndex(){return this._activeItemIndex()}get activeItem(){return this._activeItem()}isTyping(){return!!this._typeahead&&this._typeahead.isTyping()}setFirstItemActive(){this._setActiveItemByIndex(0,1)}setLastItemActive(){this._setActiveItemByIndex(this._getItemsArray().length-1,-1)}setNextItemActive(){this._activeItemIndex()<0?this.setFirstItemActive():this._setActiveItemByDelta(1)}setPreviousItemActive(){this._activeItemIndex()<0&&this._wrap?this.setLastItemActive():this._setActiveItemByDelta(-1)}updateActiveItem(n){let t=this._getItemsArray(),i=typeof n=="number"?n:t.indexOf(n),r=t[i];this._activeItem.set(r??null),this._activeItemIndex.set(i),this._typeahead?.setCurrentSelectedItemIndex(i)}destroy(){this._typeaheadSubscription.unsubscribe(),this._itemChangesSubscription?.unsubscribe(),this._effectRef?.destroy(),this._typeahead?.destroy(),this.tabOut.complete(),this.change.complete()}_setActiveItemByDelta(n){this._wrap?this._setActiveInWrapMode(n):this._setActiveInDefaultMode(n)}_setActiveInWrapMode(n){let t=this._getItemsArray();for(let i=1;i<=t.length;i++){let r=(this._activeItemIndex()+n*i+t.length)%t.length,o=t[r];if(!this._skipPredicateFn(o)){this.setActiveItem(r);return}}}_setActiveInDefaultMode(n){this._setActiveItemByIndex(this._activeItemIndex()+n,n)}_setActiveItemByIndex(n,t){let i=this._getItemsArray();if(i[n]){for(;this._skipPredicateFn(i[n]);)if(n+=t,!i[n])return;this.setActiveItem(n)}}_getItemsArray(){return Hr(this._items)?this._items():this._items instanceof nn?this._items.toArray():this._items}_itemsChanged(n){this._typeahead?.setItems(n);let t=this._activeItem();if(t){let i=n.indexOf(t);i>-1&&i!==this._activeItemIndex()&&(this._activeItemIndex.set(i),this._typeahead?.setCurrentSelectedItemIndex(i))}}};var vr=class extends rd{_origin="program";setFocusOrigin(n){return this._origin=n,this}setActiveItem(n){super.setActiveItem(n),this.activeItem&&this.activeItem.focus(this._origin)}};var xD=new Map,Ke=class e{_appId=u(Tt);static _infix=`a${Math.floor(Math.random()*1e5).toString()}`;getId(n,t=!1){this._appId!=="ng"&&(n+=this._appId);let i=xD.get(n);return i===void 0?i=0:i++,xD.set(n,i),`${n}${t?e._infix+"-":""}${i}`}static \u0275fac=function(t){return new(t||e)};static \u0275prov=x({token:e,factory:e.\u0275fac})};var bO=new g("cdk-dir-doc",{providedIn:"root",factory:()=>u(O)}),yO=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;function TD(e){let n=e?.toLowerCase()||"";return n==="auto"&&typeof navigator<"u"&&navigator?.language?yO.test(navigator.language)?"rtl":"ltr":n==="rtl"?"rtl":"ltr"}var ai=(()=>{class e{get value(){return this.valueSignal()}valueSignal=ke("ltr");change=new k;constructor(){let t=u(bO,{optional:!0});if(t){let i=t.body?t.body.dir:null,r=t.documentElement?t.documentElement.dir:null;this.valueSignal.set(TD(i||r||"ltr"))}}ngOnDestroy(){this.change.complete()}static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:e.\u0275fac})}return e})();var zt=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=me({type:e});static \u0275inj=fe({})}return e})();var gm=class{_box;_destroyed=new I;_resizeSubject=new I;_resizeObserver;_elementObservables=new Map;constructor(n){this._box=n,typeof ResizeObserver<"u"&&(this._resizeObserver=new ResizeObserver(t=>this._resizeSubject.next(t)))}observe(n){return this._elementObservables.has(n)||this._elementObservables.set(n,new L(t=>{let i=this._resizeSubject.subscribe(t);return this._resizeObserver?.observe(n,{box:this._box}),()=>{this._resizeObserver?.unobserve(n),i.unsubscribe(),this._elementObservables.delete(n)}}).pipe(pe(t=>t.some(i=>i.target===n)),Va({bufferSize:1,refCount:!0}),Be(this._destroyed))),this._elementObservables.get(n)}destroy(){this._destroyed.next(),this._destroyed.complete(),this._resizeSubject.complete(),this._elementObservables.clear()}},MD=(()=>{class e{_cleanupErrorListener;_observers=new Map;_ngZone=u(M);constructor(){typeof ResizeObserver<"u"}ngOnDestroy(){for(let[,t]of this._observers)t.destroy();this._observers.clear(),this._cleanupErrorListener?.()}observe(t,i){let r=i?.box||"content-box";return this._observers.has(r)||this._observers.set(r,new gm(r)),this._observers.get(r).observe(t)}static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:e.\u0275fac})}return e})();var vn=(function(e){return e[e.NORMAL=0]="NORMAL",e[e.NEGATED=1]="NEGATED",e[e.INVERTED=2]="INVERTED",e})(vn||{}),od,br;function AD(){if(br==null){if(typeof document!="object"||!document||typeof Element!="function"||!Element)return br=!1,br;if(document.documentElement?.style&&"scrollBehavior"in document.documentElement.style)br=!0;else{let e=Element.prototype.scrollTo;e?br=!/\{\s*\[native code\]\s*\}/.test(e.toString()):br=!1}}return br}function Mo(){if(typeof document!="object"||!document)return vn.NORMAL;if(od==null){let e=document.createElement("div"),n=e.style;e.dir="rtl",n.width="1px",n.overflow="auto",n.visibility="hidden",n.pointerEvents="none",n.position="absolute";let t=document.createElement("div"),i=t.style;i.width="2px",i.height="1px",e.appendChild(t),document.body.appendChild(e),od=vn.NORMAL,e.scrollLeft===0&&(e.scrollLeft=1,od=e.scrollLeft===0?vn.NEGATED:vn.INVERTED),e.remove()}return od}function vm(){return typeof __karma__<"u"&&!!__karma__||typeof jasmine<"u"&&!!jasmine||typeof jest<"u"&&!!jest||typeof Mocha<"u"&&!!Mocha}var _O=20,wO=(()=>{class e{_ngZone=u(M);_platform=u(Ae);_renderer=u($e).createRenderer(null,null);_cleanupGlobalListener;_scrolled=new I;_scrolledCount=0;scrollContainers=new Map;register(t){this.scrollContainers.has(t)||this.scrollContainers.set(t,t.elementScrolled().subscribe(()=>this._scrolled.next(t)))}deregister(t){let i=this.scrollContainers.get(t);i&&(i.unsubscribe(),this.scrollContainers.delete(t))}scrolled(t=_O){return this._platform.isBrowser?new L(i=>{this._cleanupGlobalListener||(this._cleanupGlobalListener=this._ngZone.runOutsideAngular(()=>this._renderer.listen("document","scroll",()=>this._scrolled.next())));let r=t>0?this._scrolled.pipe(Fa(t)).subscribe(i):this._scrolled.subscribe(i);return this._scrolledCount++,()=>{r.unsubscribe(),this._scrolledCount--,this._scrolledCount||(this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0)}}):N()}ngOnDestroy(){this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0,this.scrollContainers.forEach((t,i)=>this.deregister(i)),this._scrolled.complete()}ancestorScrolled(t,i){let r=this.getAncestorScrollContainers(t);return this.scrolled(i).pipe(pe(o=>!o||r.indexOf(o)>-1))}getAncestorScrollContainers(t){let i=[];return this.scrollContainers.forEach((r,o)=>{this._targetContainsElement(o,t)&&i.push(o)}),i}_targetContainsElement(t,i){let r=$t(i),o=t.getElementRef().nativeElement;do if(r==o)return!0;while(r=r.parentElement);return!1}static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:e.\u0275fac})}return e})(),RD=(()=>{class e{elementRef=u(Y);scrollDispatcher=u(wO);ngZone=u(M);dir=u(ai,{optional:!0});_scrollElement=this.elementRef.nativeElement;_destroyed=new I;_renderer=u(yt);_cleanupScroll;_elementScrolled=new I;ngOnInit(){this._cleanupScroll=this.ngZone.runOutsideAngular(()=>this._renderer.listen(this._scrollElement,"scroll",t=>this._elementScrolled.next(t))),this.scrollDispatcher.register(this)}ngOnDestroy(){this._cleanupScroll?.(),this._elementScrolled.complete(),this.scrollDispatcher.deregister(this),this._destroyed.next(),this._destroyed.complete()}elementScrolled(){return this._elementScrolled}getElementRef(){return this.elementRef}scrollTo(t){let i=this.elementRef.nativeElement,r=this.dir&&this.dir.value=="rtl";t.left==null&&(t.left=r?t.end:t.start),t.right==null&&(t.right=r?t.start:t.end),t.bottom!=null&&(t.top=i.scrollHeight-i.clientHeight-t.bottom),r&&Mo()!=vn.NORMAL?(t.left!=null&&(t.right=i.scrollWidth-i.clientWidth-t.left),Mo()==vn.INVERTED?t.left=t.right:Mo()==vn.NEGATED&&(t.left=t.right?-t.right:t.right)):t.right!=null&&(t.left=i.scrollWidth-i.clientWidth-t.right),this._applyScrollToOptions(t)}_applyScrollToOptions(t){let i=this.elementRef.nativeElement;AD()?i.scrollTo(t):(t.top!=null&&(i.scrollTop=t.top),t.left!=null&&(i.scrollLeft=t.left))}measureScrollOffset(t){let i="left",r="right",o=this.elementRef.nativeElement;if(t=="top")return o.scrollTop;if(t=="bottom")return o.scrollHeight-o.clientHeight-o.scrollTop;let s=this.dir&&this.dir.value=="rtl";return t=="start"?t=s?r:i:t=="end"&&(t=s?i:r),s&&Mo()==vn.INVERTED?t==i?o.scrollWidth-o.clientWidth-o.scrollLeft:o.scrollLeft:s&&Mo()==vn.NEGATED?t==i?o.scrollLeft+o.scrollWidth-o.clientWidth:-o.scrollLeft:t==i?o.scrollLeft:o.scrollWidth-o.clientWidth-o.scrollLeft}static \u0275fac=function(i){return new(i||e)};static \u0275dir=H({type:e,selectors:[["","cdk-scrollable",""],["","cdkScrollable",""]]})}return e})(),EO=20,kD=(()=>{class e{_platform=u(Ae);_listeners;_viewportSize=null;_change=new I;_document=u(O);constructor(){let t=u(M),i=u($e).createRenderer(null,null);t.runOutsideAngular(()=>{if(this._platform.isBrowser){let r=o=>this._change.next(o);this._listeners=[i.listen("window","resize",r),i.listen("window","orientationchange",r)]}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){this._listeners?.forEach(t=>t()),this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();let t={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),t}getViewportRect(){let t=this.getViewportScrollPosition(),{width:i,height:r}=this.getViewportSize();return{top:t.top,left:t.left,bottom:t.top+r,right:t.left+i,height:r,width:i}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};let t=this._document,i=this._getWindow(),r=t.documentElement,o=r.getBoundingClientRect(),s=-o.top||t.body?.scrollTop||i.scrollY||r.scrollTop||0,a=-o.left||t.body?.scrollLeft||i.scrollX||r.scrollLeft||0;return{top:s,left:a}}change(t=EO){return t>0?this._change.pipe(Fa(t)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let t=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:t.innerWidth,height:t.innerHeight}:{width:0,height:0}}static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:e.\u0275fac})}return e})();var ND={XSmall:"(max-width: 599.98px)",Small:"(min-width: 600px) and (max-width: 959.98px)",Medium:"(min-width: 960px) and (max-width: 1279.98px)",Large:"(min-width: 1280px) and (max-width: 1919.98px)",XLarge:"(min-width: 1920px)",Handset:"(max-width: 599.98px) and (orientation: portrait), (max-width: 959.98px) and (orientation: landscape)",Tablet:"(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait), (min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)",Web:"(min-width: 840px) and (orientation: portrait), (min-width: 1280px) and (orientation: landscape)",HandsetPortrait:"(max-width: 599.98px) and (orientation: portrait)",TabletPortrait:"(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)",WebPortrait:"(min-width: 840px) and (orientation: portrait)",HandsetLandscape:"(max-width: 959.98px) and (orientation: landscape)",TabletLandscape:"(min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)",WebLandscape:"(min-width: 1280px) and (orientation: landscape)"};var DO=new g("MATERIAL_ANIMATIONS"),OD=null;function CO(){return u(DO,{optional:!0})?.animationsDisabled||u(ss,{optional:!0})==="NoopAnimations"?"di-disabled":(OD??=u(nd).matchMedia("(prefers-reduced-motion)").matches,OD?"reduced-motion":"enabled")}function je(){return CO()!=="enabled"}function yr(e){return e==null?"":typeof e=="string"?e:`${e}px`}var Gt=(function(e){return e[e.FADING_IN=0]="FADING_IN",e[e.VISIBLE=1]="VISIBLE",e[e.FADING_OUT=2]="FADING_OUT",e[e.HIDDEN=3]="HIDDEN",e})(Gt||{}),bm=class{_renderer;element;config;_animationForciblyDisabledThroughCss;state=Gt.HIDDEN;constructor(n,t,i,r=!1){this._renderer=n,this.element=t,this.config=i,this._animationForciblyDisabledThroughCss=r}fadeOut(){this._renderer.fadeOutRipple(this)}},PD=xo({passive:!0,capture:!0}),ym=class{_events=new Map;addHandler(n,t,i,r){let o=this._events.get(t);if(o){let s=o.get(i);s?s.add(r):o.set(i,new Set([r]))}else this._events.set(t,new Map([[i,new Set([r])]])),n.runOutsideAngular(()=>{document.addEventListener(t,this._delegateEventHandler,PD)})}removeHandler(n,t,i){let r=this._events.get(n);if(!r)return;let o=r.get(t);o&&(o.delete(i),o.size===0&&r.delete(t),r.size===0&&(this._events.delete(n),document.removeEventListener(n,this._delegateEventHandler,PD)))}_delegateEventHandler=n=>{let t=wt(n);t&&this._events.get(n.type)?.forEach((i,r)=>{(r===t||r.contains(t))&&i.forEach(o=>o.handleEvent(n))})}},ta={enterDuration:225,exitDuration:150},IO=800,FD=xo({passive:!0,capture:!0}),LD=["mousedown","touchstart"],BD=["mouseup","mouseleave","touchend","touchcancel"],SO=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275cmp=Z({type:e,selectors:[["ng-component"]],hostAttrs:["mat-ripple-style-loader",""],decls:0,vars:0,template:function(i,r){},styles:[`.mat-ripple {
  overflow: hidden;
  position: relative;
}
.mat-ripple:not(:empty) {
  transform: translateZ(0);
}

.mat-ripple.mat-ripple-unbounded {
  overflow: visible;
}

.mat-ripple-element {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: scale3d(0, 0, 0);
  background-color: var(--mat-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface) 10%, transparent));
}
@media (forced-colors: active) {
  .mat-ripple-element {
    display: none;
  }
}
.cdk-drag-preview .mat-ripple-element, .cdk-drag-placeholder .mat-ripple-element {
  display: none;
}
`],encapsulation:2})}return e})(),na=class e{_target;_ngZone;_platform;_containerElement;_triggerElement=null;_isPointerDown=!1;_activeRipples=new Map;_mostRecentTransientRipple=null;_lastTouchStartEvent;_pointerUpEventsRegistered=!1;_containerRect=null;static _eventManager=new ym;constructor(n,t,i,r,o){this._target=n,this._ngZone=t,this._platform=r,r.isBrowser&&(this._containerElement=$t(i)),o&&o.get(Ze).load(SO)}fadeInRipple(n,t,i={}){let r=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),o=v(v({},ta),i.animation);i.centered&&(n=r.left+r.width/2,t=r.top+r.height/2);let s=i.radius||xO(n,t,r),a=n-r.left,c=t-r.top,l=o.enterDuration,d=document.createElement("div");d.classList.add("mat-ripple-element"),d.style.left=`${a-s}px`,d.style.top=`${c-s}px`,d.style.height=`${s*2}px`,d.style.width=`${s*2}px`,i.color!=null&&(d.style.backgroundColor=i.color),d.style.transitionDuration=`${l}ms`,this._containerElement.appendChild(d);let f=window.getComputedStyle(d),h=f.transitionProperty,p=f.transitionDuration,m=h==="none"||p==="0s"||p==="0s, 0s"||r.width===0&&r.height===0,y=new bm(this,d,i,m);d.style.transform="scale3d(1, 1, 1)",y.state=Gt.FADING_IN,i.persistent||(this._mostRecentTransientRipple=y);let E=null;return!m&&(l||o.exitDuration)&&this._ngZone.runOutsideAngular(()=>{let T=()=>{E&&(E.fallbackTimer=null),clearTimeout(ve),this._finishRippleTransition(y)},$=()=>this._destroyRipple(y),ve=setTimeout($,l+100);d.addEventListener("transitionend",T),d.addEventListener("transitioncancel",$),E={onTransitionEnd:T,onTransitionCancel:$,fallbackTimer:ve}}),this._activeRipples.set(y,E),(m||!l)&&this._finishRippleTransition(y),y}fadeOutRipple(n){if(n.state===Gt.FADING_OUT||n.state===Gt.HIDDEN)return;let t=n.element,i=v(v({},ta),n.config.animation);t.style.transitionDuration=`${i.exitDuration}ms`,t.style.opacity="0",n.state=Gt.FADING_OUT,(n._animationForciblyDisabledThroughCss||!i.exitDuration)&&this._finishRippleTransition(n)}fadeOutAll(){this._getActiveRipples().forEach(n=>n.fadeOut())}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(n=>{n.config.persistent||n.fadeOut()})}setupTriggerEvents(n){let t=$t(n);!this._platform.isBrowser||!t||t===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=t,LD.forEach(i=>{e._eventManager.addHandler(this._ngZone,i,t,this)}))}handleEvent(n){n.type==="mousedown"?this._onMousedown(n):n.type==="touchstart"?this._onTouchStart(n):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{BD.forEach(t=>{this._triggerElement.addEventListener(t,this,FD)})}),this._pointerUpEventsRegistered=!0)}_finishRippleTransition(n){n.state===Gt.FADING_IN?this._startFadeOutTransition(n):n.state===Gt.FADING_OUT&&this._destroyRipple(n)}_startFadeOutTransition(n){let t=n===this._mostRecentTransientRipple,{persistent:i}=n.config;n.state=Gt.VISIBLE,!i&&(!t||!this._isPointerDown)&&n.fadeOut()}_destroyRipple(n){let t=this._activeRipples.get(n)??null;this._activeRipples.delete(n),this._activeRipples.size||(this._containerRect=null),n===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),n.state=Gt.HIDDEN,t!==null&&(n.element.removeEventListener("transitionend",t.onTransitionEnd),n.element.removeEventListener("transitioncancel",t.onTransitionCancel),t.fallbackTimer!==null&&clearTimeout(t.fallbackTimer)),n.element.remove()}_onMousedown(n){let t=Ks(n),i=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+IO;!this._target.rippleDisabled&&!t&&!i&&(this._isPointerDown=!0,this.fadeInRipple(n.clientX,n.clientY,this._target.rippleConfig))}_onTouchStart(n){if(!this._target.rippleDisabled&&!Qs(n)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=!0;let t=n.changedTouches;if(t)for(let i=0;i<t.length;i++)this.fadeInRipple(t[i].clientX,t[i].clientY,this._target.rippleConfig)}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=!1,this._getActiveRipples().forEach(n=>{let t=n.state===Gt.VISIBLE||n.config.terminateOnPointerUp&&n.state===Gt.FADING_IN;!n.config.persistent&&t&&n.fadeOut()}))}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){let n=this._triggerElement;n&&(LD.forEach(t=>e._eventManager.removeHandler(t,n,this)),this._pointerUpEventsRegistered&&(BD.forEach(t=>n.removeEventListener(t,this,FD)),this._pointerUpEventsRegistered=!1))}};function xO(e,n,t){let i=Math.max(Math.abs(e-t.left),Math.abs(e-t.right)),r=Math.max(Math.abs(n-t.top),Math.abs(n-t.bottom));return Math.sqrt(i*i+r*r)}var Ao=new g("mat-ripple-global-options"),ia=(()=>{class e{_elementRef=u(Y);_animationsDisabled=je();color;unbounded=!1;centered=!1;radius=0;animation;get disabled(){return this._disabled}set disabled(t){t&&this.fadeOutAllNonPersistent(),this._disabled=t,this._setupTriggerEventsIfEnabled()}_disabled=!1;get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(t){this._trigger=t,this._setupTriggerEventsIfEnabled()}_trigger;_rippleRenderer;_globalOptions;_isInitialized=!1;constructor(){let t=u(M),i=u(Ae),r=u(Ao,{optional:!0}),o=u(ne);this._globalOptions=r||{},this._rippleRenderer=new na(this,t,this._elementRef,i,o)}ngOnInit(){this._isInitialized=!0,this._setupTriggerEventsIfEnabled()}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents()}fadeOutAll(){this._rippleRenderer.fadeOutAll()}fadeOutAllNonPersistent(){this._rippleRenderer.fadeOutAllNonPersistent()}get rippleConfig(){return{centered:this.centered,radius:this.radius,color:this.color,animation:v(v(v({},this._globalOptions.animation),this._animationsDisabled?{enterDuration:0,exitDuration:0}:{}),this.animation),terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger)}launch(t,i=0,r){return typeof t=="number"?this._rippleRenderer.fadeInRipple(t,i,v(v({},this.rippleConfig),r)):this._rippleRenderer.fadeInRipple(0,0,v(v({},this.rippleConfig),t))}static \u0275fac=function(i){return new(i||e)};static \u0275dir=H({type:e,selectors:[["","mat-ripple",""],["","matRipple",""]],hostAttrs:[1,"mat-ripple"],hostVars:2,hostBindings:function(i,r){i&2&&X("mat-ripple-unbounded",r.unbounded)},inputs:{color:[0,"matRippleColor","color"],unbounded:[0,"matRippleUnbounded","unbounded"],centered:[0,"matRippleCentered","centered"],radius:[0,"matRippleRadius","radius"],animation:[0,"matRippleAnimation","animation"],disabled:[0,"matRippleDisabled","disabled"],trigger:[0,"matRippleTrigger","trigger"]},exportAs:["matRipple"]})}return e})();var Im=["*"];function TO(e,n){e&1&&he(0)}var MO=["tabListContainer"],AO=["tabList"],RO=["tabListInner"],kO=["nextPaginator"],NO=["previousPaginator"],OO=["content"];function PO(e,n){}var FO=["tabBodyWrapper"],LO=["tabHeader"];function BO(e,n){}function VO(e,n){if(e&1&&an(0,BO,0,0,"ng-template",12),e&2){let t=Ve().$implicit;_e("cdkPortalOutlet",t.templateLabel)}}function jO(e,n){if(e&1&&C(0),e&2){let t=Ve().$implicit;it(t.textLabel)}}function UO(e,n){if(e&1){let t=ao();_(0,"div",7,2),Ce("click",function(){let r=Tn(t),o=r.$implicit,s=r.$index,a=Ve(),c=lo(1);return Mn(a._handleClick(o,c,s))})("cdkFocusChange",function(r){let o=Tn(t).$index,s=Ve();return Mn(s._tabFocusChanged(r,o))}),Me(2,"span",8)(3,"div",9),_(4,"span",10)(5,"span",11),et(6,VO,1,1,null,12)(7,jO,1,1),b()()()}if(e&2){let t=n.$implicit,i=n.$index,r=lo(1),o=Ve();Nt(t.labelClass),X("mdc-tab--active",o.selectedIndex===i),_e("id",o._getTabLabelId(t,i))("disabled",t.disabled)("fitInkBarToContent",o.fitInkBarToContent),ge("tabIndex",o._getTabIndex(i))("aria-posinset",i+1)("aria-setsize",o._tabs.length)("aria-controls",o._getTabContentId(i))("aria-selected",o.selectedIndex===i)("aria-label",t.ariaLabel||null)("aria-labelledby",!t.ariaLabel&&t.ariaLabelledby?t.ariaLabelledby:null),w(3),_e("matRippleTrigger",r)("matRippleDisabled",t.disabled||o.disableRipple),w(3),tt(t.templateLabel?6:7)}}function HO(e,n){e&1&&he(0)}function $O(e,n){if(e&1){let t=ao();_(0,"mat-tab-body",13),Ce("_onCentered",function(){Tn(t);let r=Ve();return Mn(r._removeTabBodyWrapperHeight())})("_onCentering",function(r){Tn(t);let o=Ve();return Mn(o._setTabBodyWrapperHeight(r))})("_beforeCentering",function(r){Tn(t);let o=Ve();return Mn(o._bodyCentered(r))}),b()}if(e&2){let t=n.$implicit,i=n.$index,r=Ve();Nt(t.bodyClass),_e("id",r._getTabContentId(i))("content",t.content)("position",t.position)("animationDuration",r._bodyAnimationDuration)("preserveContent",r.preserveContent),ge("tabindex",r.contentTabIndex!=null&&r.selectedIndex===i?r.contentTabIndex:null)("aria-labelledby",r._getTabLabelId(t,i))("aria-hidden",r.selectedIndex!==i)}}var zO=new g("MatTabContent"),GO=(()=>{class e{template=u(He);static \u0275fac=function(i){return new(i||e)};static \u0275dir=H({type:e,selectors:[["","matTabContent",""]],features:[rt([{provide:zO,useExisting:e}])]})}return e})(),WO=new g("MatTabLabel"),HD=new g("MAT_TAB"),Sm=(()=>{class e extends fD{_closestTab=u(HD,{optional:!0});static \u0275fac=(()=>{let t;return function(r){return(t||(t=At(e)))(r||e)}})();static \u0275dir=H({type:e,selectors:[["","mat-tab-label",""],["","matTabLabel",""]],features:[rt([{provide:WO,useExisting:e}]),Oe]})}return e})(),$D=new g("MAT_TAB_GROUP"),xm=(()=>{class e{_viewContainerRef=u(Je);_closestTabGroup=u($D,{optional:!0});disabled=!1;get templateLabel(){return this._templateLabel}set templateLabel(t){this._setTemplateLabelInput(t)}_templateLabel;_explicitContent=void 0;_implicitContent;textLabel="";ariaLabel;ariaLabelledby;labelClass;bodyClass;id=null;_contentPortal=null;get content(){return this._contentPortal}_stateChanges=new I;position=null;origin=null;isActive=!1;constructor(){u(Ze).load(mn)}ngOnChanges(t){(t.hasOwnProperty("textLabel")||t.hasOwnProperty("disabled"))&&this._stateChanges.next()}ngOnDestroy(){this._stateChanges.complete()}ngOnInit(){this._contentPortal=new pn(this._explicitContent||this._implicitContent,this._viewContainerRef)}_setTemplateLabelInput(t){t&&t._closestTab===this&&(this._templateLabel=t)}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=Z({type:e,selectors:[["mat-tab"]],contentQueries:function(i,r,o){if(i&1&&kn(o,Sm,5)(o,GO,7,He),i&2){let s;K(s=Q())&&(r.templateLabel=s.first),K(s=Q())&&(r._explicitContent=s.first)}},viewQuery:function(i,r){if(i&1&&nt(He,7),i&2){let o;K(o=Q())&&(r._implicitContent=o.first)}},hostAttrs:["hidden",""],hostVars:1,hostBindings:function(i,r){i&2&&ge("id",null)},inputs:{disabled:[2,"disabled","disabled",j],textLabel:[0,"label","textLabel"],ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],labelClass:"labelClass",bodyClass:"bodyClass",id:"id"},exportAs:["matTab"],features:[rt([{provide:HD,useExisting:e}]),ft],ngContentSelectors:Im,decls:1,vars:0,template:function(i,r){i&1&&(Fe(),ll(0,TO,1,0,"ng-template"))},encapsulation:2,changeDetection:1})}return e})(),_m="mdc-tab-indicator--active",VD="mdc-tab-indicator--no-transition",Em=class{_items;_currentItem;constructor(n){this._items=n}hide(){this._items.forEach(n=>n.deactivateInkBar()),this._currentItem=void 0}alignToElement(n){let t=this._items.find(r=>r.elementRef.nativeElement===n),i=this._currentItem;if(t!==i&&(i?.deactivateInkBar(),t)){let r=i?.elementRef.nativeElement.getBoundingClientRect?.();t.activateInkBar(r),this._currentItem=t}}},qO=(()=>{class e{_elementRef=u(Y);_inkBarElement=null;_inkBarContentElement=null;_fitToContent=!1;get fitInkBarToContent(){return this._fitToContent}set fitInkBarToContent(t){this._fitToContent!==t&&(this._fitToContent=t,this._inkBarElement&&this._appendInkBarElement())}activateInkBar(t){let i=this._elementRef.nativeElement;if(!t||!i.getBoundingClientRect||!this._inkBarContentElement){i.classList.add(_m);return}let r=i.getBoundingClientRect(),o=t.width/r.width,s=t.left-r.left;i.classList.add(VD),this._inkBarContentElement.style.setProperty("transform",`translateX(${s}px) scaleX(${o})`),i.getBoundingClientRect(),i.classList.remove(VD),i.classList.add(_m),this._inkBarContentElement.style.setProperty("transform","")}deactivateInkBar(){this._elementRef.nativeElement.classList.remove(_m)}ngOnInit(){this._createInkBarElement()}ngOnDestroy(){this._inkBarElement?.remove(),this._inkBarElement=this._inkBarContentElement=null}_createInkBarElement(){let t=this._elementRef.nativeElement.ownerDocument||document,i=this._inkBarElement=t.createElement("span"),r=this._inkBarContentElement=t.createElement("span");i.className="mdc-tab-indicator",r.className="mdc-tab-indicator__content mdc-tab-indicator__content--underline",i.appendChild(this._inkBarContentElement),this._appendInkBarElement()}_appendInkBarElement(){this._inkBarElement;let t=this._fitToContent?this._elementRef.nativeElement.querySelector(".mdc-tab__content"):this._elementRef.nativeElement;t.appendChild(this._inkBarElement)}static \u0275fac=function(i){return new(i||e)};static \u0275dir=H({type:e,inputs:{fitInkBarToContent:[2,"fitInkBarToContent","fitInkBarToContent",j]}})}return e})();var zD=(()=>{class e extends qO{elementRef=u(Y);disabled=!1;focus(){this.elementRef.nativeElement.focus()}getOffsetLeft(){return this.elementRef.nativeElement.offsetLeft}getOffsetWidth(){return this.elementRef.nativeElement.offsetWidth}static \u0275fac=(()=>{let t;return function(r){return(t||(t=At(e)))(r||e)}})();static \u0275dir=H({type:e,selectors:[["","matTabLabelWrapper",""]],hostVars:3,hostBindings:function(i,r){i&2&&(ge("aria-disabled",!!r.disabled),X("mat-mdc-tab-disabled",r.disabled))},inputs:{disabled:[2,"disabled","disabled",j]},features:[Oe]})}return e})(),jD={passive:!0},YO=650,ZO=100,KO=(()=>{class e{_elementRef=u(Y);_changeDetectorRef=u(Ie);_viewportRuler=u(kD);_dir=u(ai,{optional:!0});_ngZone=u(M);_platform=u(Ae);_sharedResizeObserver=u(MD);_injector=u(ne);_renderer=u(yt);_animationsDisabled=je();_eventCleanups;_scrollDistance=0;_selectedIndexChanged=!1;_destroyed=new I;_showPaginationControls=!1;_disableScrollAfter=!0;_disableScrollBefore=!0;_tabLabelCount;_scrollDistanceChanged=!1;_keyManager;_currentTextContent;_stopScrolling=new I;disablePagination=!1;get selectedIndex(){return this._selectedIndex}set selectedIndex(t){let i=isNaN(t)?0:t;this._selectedIndex!=i&&(this._selectedIndexChanged=!0,this._selectedIndex=i,this._keyManager&&this._keyManager.updateActiveItem(i))}_selectedIndex=0;selectFocusedIndex=new k;indexFocused=new k;constructor(){this._eventCleanups=this._ngZone.runOutsideAngular(()=>[this._renderer.listen(this._elementRef.nativeElement,"mouseleave",()=>this._stopInterval())])}ngAfterViewInit(){this._eventCleanups.push(this._renderer.listen(this._previousPaginator.nativeElement,"touchstart",()=>this._handlePaginatorPress("before"),jD),this._renderer.listen(this._nextPaginator.nativeElement,"touchstart",()=>this._handlePaginatorPress("after"),jD))}ngAfterContentInit(){let t=this._dir?this._dir.change:N("ltr"),i=this._sharedResizeObserver.observe(this._elementRef.nativeElement).pipe(jn(32),Be(this._destroyed)),r=this._viewportRuler.change(150).pipe(Be(this._destroyed)),o=()=>{this.updatePagination(),this._alignInkBarToSelectedTab()};this._keyManager=new vr(this._items).withHorizontalOrientation(this._getLayoutDirection()).withHomeAndEnd().withWrap().skipPredicate(()=>!1),this._keyManager.updateActiveItem(Math.max(this._selectedIndex,0)),ze(o,{injector:this._injector}),Vn(t,r,i,this._items.changes,this._itemsResized()).pipe(Be(this._destroyed)).subscribe(()=>{this._ngZone.run(()=>{Promise.resolve().then(()=>{this._scrollDistance=Math.max(0,Math.min(this._getMaxScrollDistance(),this._scrollDistance)),o()})}),this._keyManager?.withHorizontalOrientation(this._getLayoutDirection())}),this._keyManager.change.subscribe(s=>{this.indexFocused.emit(s),this._setTabFocus(s)})}_itemsResized(){return typeof ResizeObserver!="function"?Ee:this._items.changes.pipe(Ft(this._items),Qe(t=>new L(i=>this._ngZone.runOutsideAngular(()=>{let r=new ResizeObserver(o=>i.next(o));return t.forEach(o=>r.observe(o.elementRef.nativeElement)),()=>{r.disconnect()}}))),Li(1),pe(t=>t.some(i=>i.contentRect.width>0&&i.contentRect.height>0)))}ngAfterContentChecked(){this._tabLabelCount!=this._items.length&&(this.updatePagination(),this._tabLabelCount=this._items.length,this._changeDetectorRef.markForCheck()),this._selectedIndexChanged&&(this._scrollToLabel(this._selectedIndex),this._checkScrollingControls(),this._alignInkBarToSelectedTab(),this._selectedIndexChanged=!1,this._changeDetectorRef.markForCheck()),this._scrollDistanceChanged&&(this._updateTabScrollPosition(),this._scrollDistanceChanged=!1,this._changeDetectorRef.markForCheck())}ngOnDestroy(){this._eventCleanups.forEach(t=>t()),this._keyManager?.destroy(),this._destroyed.next(),this._destroyed.complete(),this._stopScrolling.complete()}_handleKeydown(t){if(!To(t))switch(t.keyCode){case 13:case 32:if(this.focusIndex!==this.selectedIndex){let i=this._items.get(this.focusIndex);i&&!i.disabled&&(this.selectFocusedIndex.emit(this.focusIndex),this._itemSelected(t))}break;default:this._keyManager?.onKeydown(t)}}_onContentChanges(){let t=this._elementRef.nativeElement.textContent;t!==this._currentTextContent&&(this._currentTextContent=t||"",this._ngZone.run(()=>{this.updatePagination(),this._alignInkBarToSelectedTab(),this._changeDetectorRef.markForCheck()}))}updatePagination(){this._checkPaginationEnabled(),this._checkScrollingControls(),this._updateTabScrollPosition()}get focusIndex(){return this._keyManager?this._keyManager.activeItemIndex:0}set focusIndex(t){!this._isValidIndex(t)||this.focusIndex===t||!this._keyManager||this._keyManager.setActiveItem(t)}_isValidIndex(t){return this._items?!!this._items.toArray()[t]:!0}_setTabFocus(t){if(this._showPaginationControls&&this._scrollToLabel(t),this._items&&this._items.length){this._items.toArray()[t].focus();let i=this._tabListContainer.nativeElement;this._getLayoutDirection()=="ltr"?i.scrollLeft=0:i.scrollLeft=i.scrollWidth-i.offsetWidth}}_getLayoutDirection(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_updateTabScrollPosition(){if(this.disablePagination)return;let t=this.scrollDistance,i=this._getLayoutDirection()==="ltr"?-t:t;this._tabList.nativeElement.style.transform=`translateX(${Math.round(i)}px)`,(this._platform.TRIDENT||this._platform.EDGE)&&(this._tabListContainer.nativeElement.scrollLeft=0)}get scrollDistance(){return this._scrollDistance}set scrollDistance(t){this._scrollTo(t)}_scrollHeader(t){let i=this._tabListContainer.nativeElement.offsetWidth,r=(t=="before"?-1:1)*i/3;return this._scrollTo(this._scrollDistance+r)}_handlePaginatorClick(t){this._stopInterval(),this._scrollHeader(t)}_scrollToLabel(t){if(this.disablePagination)return;let i=this._items?this._items.toArray()[t]:null;if(!i)return;let r=this._tabListContainer.nativeElement.offsetWidth,{offsetLeft:o,offsetWidth:s}=i.elementRef.nativeElement,a,c;this._getLayoutDirection()=="ltr"?(a=o,c=a+s):(c=this._tabListInner.nativeElement.offsetWidth-o,a=c-s);let l=this.scrollDistance,d=this.scrollDistance+r;a<l?this.scrollDistance-=l-a:c>d&&(this.scrollDistance+=Math.min(c-d,a-l))}_checkPaginationEnabled(){if(this.disablePagination)this._showPaginationControls=!1;else{let t=this._tabListInner.nativeElement.scrollWidth,i=this._elementRef.nativeElement.offsetWidth,r=t-i>=5;r||(this.scrollDistance=0),r!==this._showPaginationControls&&(this._showPaginationControls=r,this._changeDetectorRef.markForCheck())}}_checkScrollingControls(){this.disablePagination?this._disableScrollAfter=this._disableScrollBefore=!0:(this._disableScrollBefore=this.scrollDistance==0,this._disableScrollAfter=this.scrollDistance==this._getMaxScrollDistance(),this._changeDetectorRef.markForCheck())}_getMaxScrollDistance(){let t=this._tabListInner.nativeElement.scrollWidth,i=this._tabListContainer.nativeElement.offsetWidth;return t-i||0}_alignInkBarToSelectedTab(){let t=this._items&&this._items.length?this._items.toArray()[this.selectedIndex]:null,i=t?t.elementRef.nativeElement:null;i?this._inkBar.alignToElement(i):this._inkBar.hide()}_stopInterval(){this._stopScrolling.next()}_handlePaginatorPress(t,i){i&&i.button!=null&&i.button!==0||(this._stopInterval(),Fi(YO,ZO).pipe(Be(Vn(this._stopScrolling,this._destroyed))).subscribe(()=>{let{maxScrollDistance:r,distance:o}=this._scrollHeader(t);(o===0||o>=r)&&this._stopInterval()}))}_scrollTo(t){if(this.disablePagination)return{maxScrollDistance:0,distance:0};let i=this._getMaxScrollDistance();return this._scrollDistance=Math.max(0,Math.min(i,t)),this._scrollDistanceChanged=!0,this._checkScrollingControls(),{maxScrollDistance:i,distance:this._scrollDistance}}static \u0275fac=function(i){return new(i||e)};static \u0275dir=H({type:e,inputs:{disablePagination:[2,"disablePagination","disablePagination",j],selectedIndex:[2,"selectedIndex","selectedIndex",Ut]},outputs:{selectFocusedIndex:"selectFocusedIndex",indexFocused:"indexFocused"}})}return e})(),QO=(()=>{class e extends KO{_items;_tabListContainer;_tabList;_tabListInner;_nextPaginator;_previousPaginator;_inkBar;ariaLabel;ariaLabelledby;disableRipple=!1;ngAfterContentInit(){this._inkBar=new Em(this._items),super.ngAfterContentInit()}_itemSelected(t){t.preventDefault()}static \u0275fac=(()=>{let t;return function(r){return(t||(t=At(e)))(r||e)}})();static \u0275cmp=Z({type:e,selectors:[["mat-tab-header"]],contentQueries:function(i,r,o){if(i&1&&kn(o,zD,4),i&2){let s;K(s=Q())&&(r._items=s)}},viewQuery:function(i,r){if(i&1&&nt(MO,7)(AO,7)(RO,7)(kO,5)(NO,5),i&2){let o;K(o=Q())&&(r._tabListContainer=o.first),K(o=Q())&&(r._tabList=o.first),K(o=Q())&&(r._tabListInner=o.first),K(o=Q())&&(r._nextPaginator=o.first),K(o=Q())&&(r._previousPaginator=o.first)}},hostAttrs:[1,"mat-mdc-tab-header"],hostVars:4,hostBindings:function(i,r){i&2&&X("mat-mdc-tab-header-pagination-controls-enabled",r._showPaginationControls)("mat-mdc-tab-header-rtl",r._getLayoutDirection()=="rtl")},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],disableRipple:[2,"disableRipple","disableRipple",j]},features:[Oe],ngContentSelectors:Im,decls:13,vars:10,consts:[["previousPaginator",""],["tabListContainer",""],["tabList",""],["tabListInner",""],["nextPaginator",""],["mat-ripple","",1,"mat-mdc-tab-header-pagination","mat-mdc-tab-header-pagination-before",3,"click","mousedown","touchend","matRippleDisabled"],[1,"mat-mdc-tab-header-pagination-chevron"],[1,"mat-mdc-tab-label-container",3,"keydown"],["role","tablist",1,"mat-mdc-tab-list",3,"cdkObserveContent"],[1,"mat-mdc-tab-labels"],["mat-ripple","",1,"mat-mdc-tab-header-pagination","mat-mdc-tab-header-pagination-after",3,"mousedown","click","touchend","matRippleDisabled"]],template:function(i,r){i&1&&(Fe(),_(0,"div",5,0),Ce("click",function(){return r._handlePaginatorClick("before")})("mousedown",function(s){return r._handlePaginatorPress("before",s)})("touchend",function(){return r._stopInterval()}),Me(2,"div",6),b(),_(3,"div",7,1),Ce("keydown",function(s){return r._handleKeydown(s)}),_(5,"div",8,2),Ce("cdkObserveContent",function(){return r._onContentChanges()}),_(7,"div",9,3),he(9),b()()(),_(10,"div",10,4),Ce("mousedown",function(s){return r._handlePaginatorPress("after",s)})("click",function(){return r._handlePaginatorClick("after")})("touchend",function(){return r._stopInterval()}),Me(12,"div",6),b()),i&2&&(X("mat-mdc-tab-header-pagination-disabled",r._disableScrollBefore),_e("matRippleDisabled",r._disableScrollBefore||r.disableRipple),w(3),X("_mat-animation-noopable",r._animationsDisabled),w(2),ge("aria-label",r.ariaLabel||null)("aria-labelledby",r.ariaLabelledby||null),w(5),X("mat-mdc-tab-header-pagination-disabled",r._disableScrollAfter),_e("matRippleDisabled",r._disableScrollAfter||r.disableRipple))},dependencies:[ia,CD],styles:[`.mat-mdc-tab-header {
  display: flex;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}

.mdc-tab-indicator .mdc-tab-indicator__content {
  transition-duration: var(--mat-tab-header-animation-duration, 250ms);
}

.mat-mdc-tab-header-pagination {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  display: none;
  justify-content: center;
  align-items: center;
  min-width: 32px;
  cursor: pointer;
  z-index: 2;
  -webkit-tap-highlight-color: transparent;
  touch-action: none;
  box-sizing: content-box;
  outline: 0;
}
.mat-mdc-tab-header-pagination::-moz-focus-inner {
  border: 0;
}
.mat-mdc-tab-header-pagination .mat-ripple-element {
  opacity: 0.12;
  background-color: var(--mat-tab-inactive-ripple-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab-header-pagination-controls-enabled .mat-mdc-tab-header-pagination {
  display: flex;
}

.mat-mdc-tab-header-pagination-before,
.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after {
  padding-left: 4px;
}
.mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,
.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron {
  transform: rotate(-135deg);
}

.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before,
.mat-mdc-tab-header-pagination-after {
  padding-right: 4px;
}
.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,
.mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron {
  transform: rotate(45deg);
}

.mat-mdc-tab-header-pagination-chevron {
  border-style: solid;
  border-width: 2px 2px 0 0;
  height: 8px;
  width: 8px;
  border-color: var(--mat-tab-pagination-icon-color, var(--mat-sys-on-surface));
}

.mat-mdc-tab-header-pagination-disabled {
  box-shadow: none;
  cursor: default;
  pointer-events: none;
}
.mat-mdc-tab-header-pagination-disabled .mat-mdc-tab-header-pagination-chevron {
  opacity: 0.4;
}

.mat-mdc-tab-list {
  flex-grow: 1;
  position: relative;
  transition: transform 500ms cubic-bezier(0.35, 0, 0.25, 1);
}
._mat-animation-noopable .mat-mdc-tab-list {
  transition: none;
}

.mat-mdc-tab-label-container {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  z-index: 1;
  border-bottom-style: solid;
  border-bottom-width: var(--mat-tab-divider-height, 1px);
  border-bottom-color: var(--mat-tab-divider-color, var(--mat-sys-surface-variant));
}
.mat-mdc-tab-group-inverted-header .mat-mdc-tab-label-container {
  border-bottom: none;
  border-top-style: solid;
  border-top-width: var(--mat-tab-divider-height, 1px);
  border-top-color: var(--mat-tab-divider-color, var(--mat-sys-surface-variant));
}

.mat-mdc-tab-labels {
  display: flex;
  flex: 1 0 auto;
}
[mat-align-tabs=center] > .mat-mdc-tab-header .mat-mdc-tab-labels {
  justify-content: center;
}
[mat-align-tabs=end] > .mat-mdc-tab-header .mat-mdc-tab-labels {
  justify-content: flex-end;
}
.cdk-drop-list .mat-mdc-tab-labels, .mat-mdc-tab-labels.cdk-drop-list {
  min-height: var(--mat-tab-container-height, 48px);
}

.mat-mdc-tab::before {
  margin: 5px;
}
@media (forced-colors: active) {
  .mat-mdc-tab[aria-disabled=true] {
    color: GrayText;
  }
}
`],encapsulation:2,changeDetection:1})}return e})(),XO=new g("MAT_TABS_CONFIG"),UD=(()=>{class e extends xi{_host=u(Dm);_ngZone=u(M);_centeringSub=ee.EMPTY;_leavingSub=ee.EMPTY;ngOnInit(){super.ngOnInit(),this._centeringSub=this._host._beforeCentering.pipe(Ft(this._host._isCenterPosition())).subscribe(t=>{this._host._content&&t&&!this.hasAttached()&&this._ngZone.run(()=>{Promise.resolve().then(),this.attach(this._host._content)})}),this._leavingSub=this._host._afterLeavingCenter.subscribe(()=>{this._host.preserveContent||this._ngZone.run(()=>this.detach())})}ngOnDestroy(){super.ngOnDestroy(),this._centeringSub.unsubscribe(),this._leavingSub.unsubscribe()}static \u0275fac=(()=>{let t;return function(r){return(t||(t=At(e)))(r||e)}})();static \u0275dir=H({type:e,selectors:[["","matTabBodyHost",""]],features:[Oe]})}return e})(),Dm=(()=>{class e{_elementRef=u(Y);_dir=u(ai,{optional:!0});_ngZone=u(M);_injector=u(ne);_renderer=u(yt);_diAnimationsDisabled=je();_eventCleanups;_initialized=!1;_fallbackTimer;_positionIndex;_dirChangeSubscription=ee.EMPTY;_position;_previousPosition;_onCentering=new k;_beforeCentering=new k;_afterLeavingCenter=new k;_onCentered=new k(!0);_portalHost;_contentElement;_content;animationDuration="500ms";preserveContent=!1;set position(t){this._positionIndex=t,this._computePositionAnimationState()}constructor(){if(this._dir){let t=u(Ie);this._dirChangeSubscription=this._dir.change.subscribe(i=>{this._computePositionAnimationState(i),t.markForCheck()})}}ngOnInit(){this._bindTransitionEvents(),this._position==="center"&&(this._setActiveClass(!0),ze(()=>this._onCentering.emit(this._elementRef.nativeElement.clientHeight),{injector:this._injector})),this._initialized=!0}ngOnDestroy(){clearTimeout(this._fallbackTimer),this._eventCleanups?.forEach(t=>t()),this._dirChangeSubscription.unsubscribe()}_bindTransitionEvents(){this._ngZone.runOutsideAngular(()=>{let t=this._elementRef.nativeElement,i=r=>{r.target===this._contentElement?.nativeElement&&(this._elementRef.nativeElement.classList.remove("mat-tab-body-animating"),r.type==="transitionend"&&this._transitionDone())};this._eventCleanups=[this._renderer.listen(t,"transitionstart",r=>{r.target===this._contentElement?.nativeElement&&(this._elementRef.nativeElement.classList.add("mat-tab-body-animating"),this._transitionStarted())}),this._renderer.listen(t,"transitionend",i),this._renderer.listen(t,"transitioncancel",i)]})}_transitionStarted(){clearTimeout(this._fallbackTimer);let t=this._position==="center";this._beforeCentering.emit(t),t&&this._onCentering.emit(this._elementRef.nativeElement.clientHeight)}_transitionDone(){this._position==="center"?this._onCentered.emit():this._previousPosition==="center"&&this._afterLeavingCenter.emit()}_setActiveClass(t){this._elementRef.nativeElement.classList.toggle("mat-mdc-tab-body-active",t)}_getLayoutDirection(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_isCenterPosition(){return this._positionIndex===0}_computePositionAnimationState(t=this._getLayoutDirection()){this._previousPosition=this._position,this._positionIndex<0?this._position=t=="ltr"?"left":"right":this._positionIndex>0?this._position=t=="ltr"?"right":"left":this._position="center",this._animationsDisabled()?this._simulateTransitionEvents():this._initialized&&(this._position==="center"||this._previousPosition==="center")&&(clearTimeout(this._fallbackTimer),this._fallbackTimer=this._ngZone.runOutsideAngular(()=>setTimeout(()=>this._simulateTransitionEvents(),100)))}_simulateTransitionEvents(){this._transitionStarted(),ze(()=>this._transitionDone(),{injector:this._injector})}_animationsDisabled(){return this._diAnimationsDisabled||this.animationDuration==="0ms"||this.animationDuration==="0s"}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=Z({type:e,selectors:[["mat-tab-body"]],viewQuery:function(i,r){if(i&1&&nt(UD,5)(OO,5),i&2){let o;K(o=Q())&&(r._portalHost=o.first),K(o=Q())&&(r._contentElement=o.first)}},hostAttrs:[1,"mat-mdc-tab-body"],hostVars:1,hostBindings:function(i,r){i&2&&ge("inert",r._position==="center"?null:"")},inputs:{_content:[0,"content","_content"],animationDuration:"animationDuration",preserveContent:"preserveContent",position:"position"},outputs:{_onCentering:"_onCentering",_beforeCentering:"_beforeCentering",_onCentered:"_onCentered"},decls:3,vars:6,consts:[["content",""],["cdkScrollable","",1,"mat-mdc-tab-body-content"],["matTabBodyHost",""]],template:function(i,r){i&1&&(_(0,"div",1,0),an(2,PO,0,0,"ng-template",2),b()),i&2&&X("mat-tab-body-content-left",r._position==="left")("mat-tab-body-content-right",r._position==="right")("mat-tab-body-content-can-animate",r._position==="center"||r._previousPosition==="center")},dependencies:[UD,RD],styles:[`.mat-mdc-tab-body {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  display: block;
  overflow: hidden;
  outline: 0;
  flex-basis: 100%;
}
.mat-mdc-tab-body.mat-mdc-tab-body-active {
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1;
  flex-grow: 1;
}
.mat-mdc-tab-group.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body.mat-mdc-tab-body-active {
  overflow-y: hidden;
}

.mat-mdc-tab-body-content {
  height: 100%;
  overflow: auto;
  transform: none;
  visibility: hidden;
}
.mat-tab-body-animating > .mat-mdc-tab-body-content, .mat-mdc-tab-body-active > .mat-mdc-tab-body-content {
  visibility: visible;
}
.mat-tab-body-animating > .mat-mdc-tab-body-content {
  min-height: 1px;
}
.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body-content {
  overflow: hidden;
}

.mat-tab-body-content-can-animate {
  transition: transform var(--mat-tab-body-animation-duration) 1ms cubic-bezier(0.35, 0, 0.25, 1);
}
.mat-mdc-tab-body-wrapper._mat-animation-noopable .mat-tab-body-content-can-animate {
  transition: none;
}

.mat-tab-body-content-left {
  transform: translate3d(-100%, 0, 0);
}

.mat-tab-body-content-right {
  transform: translate3d(100%, 0, 0);
}
`],encapsulation:2,changeDetection:1})}return e})(),GD=(()=>{class e{_elementRef=u(Y);_changeDetectorRef=u(Ie);_ngZone=u(M);_tabsSubscription=ee.EMPTY;_tabLabelSubscription=ee.EMPTY;_tabBodySubscription=ee.EMPTY;_diAnimationsDisabled=je();_bodyAnimationDuration;_headerAnimationDuration;_allTabs;_tabBodies;_tabBodyWrapper;_tabHeader;_tabs=new nn;_indexToSelect=0;_lastFocusedTabIndex=null;_tabBodyWrapperHeight=0;color;get fitInkBarToContent(){return this._fitInkBarToContent}set fitInkBarToContent(t){this._fitInkBarToContent=t,this._changeDetectorRef.markForCheck()}_fitInkBarToContent=!1;stretchTabs=!0;alignTabs=null;dynamicHeight=!1;get selectedIndex(){return this._selectedIndex}set selectedIndex(t){this._indexToSelect=isNaN(t)?null:t}_selectedIndex=null;headerPosition="above";get animationDuration(){return this._animationDuration}set animationDuration(t){this._animationDuration=t,t&&typeof t=="object"?(this._bodyAnimationDuration=wm(t.body),this._headerAnimationDuration=wm(t.header)):this._headerAnimationDuration=this._bodyAnimationDuration=wm(t)}_animationDuration;get contentTabIndex(){return this._contentTabIndex}set contentTabIndex(t){this._contentTabIndex=isNaN(t)?null:t}_contentTabIndex=null;disablePagination=!1;disableRipple=!1;preserveContent=!1;get backgroundColor(){return this._backgroundColor}set backgroundColor(t){let i=this._elementRef.nativeElement.classList;i.remove("mat-tabs-with-background",`mat-background-${this.backgroundColor}`),t&&i.add("mat-tabs-with-background",`mat-background-${t}`),this._backgroundColor=t}_backgroundColor;ariaLabel;ariaLabelledby;selectedIndexChange=new k;focusChange=new k;animationDone=new k;selectedTabChange=new k(!0);_groupId;_isServer=!u(Ae).isBrowser;constructor(){let t=u(XO,{optional:!0});this._groupId=u(Ke).getId("mat-tab-group-"),this.animationDuration=t&&t.animationDuration?t.animationDuration:"500ms",this.disablePagination=t&&t.disablePagination!=null?t.disablePagination:!1,this.dynamicHeight=t&&t.dynamicHeight!=null?t.dynamicHeight:!1,t?.contentTabIndex!=null&&(this.contentTabIndex=t.contentTabIndex),this.preserveContent=!!t?.preserveContent,this.fitInkBarToContent=t&&t.fitInkBarToContent!=null?t.fitInkBarToContent:!1,this.stretchTabs=t&&t.stretchTabs!=null?t.stretchTabs:!0,this.alignTabs=t&&t.alignTabs!=null?t.alignTabs:null}ngAfterContentChecked(){let t=this._indexToSelect=this._clampTabIndex(this._indexToSelect);if(this._selectedIndex!=t){let i=this._selectedIndex==null;if(!i){this.selectedTabChange.emit(this._createChangeEvent(t));let r=this._tabBodyWrapper.nativeElement;r.style.minHeight=r.clientHeight+"px"}Promise.resolve().then(()=>{this._tabs.forEach((r,o)=>r.isActive=o===t),i||(this.selectedIndexChange.emit(t),this._tabBodyWrapper.nativeElement.style.minHeight="")})}this._tabs.forEach((i,r)=>{i.position=r-t,this._selectedIndex!=null&&i.position==0&&!i.origin&&(i.origin=t-this._selectedIndex)}),this._selectedIndex!==t&&(this._selectedIndex=t,this._lastFocusedTabIndex=null,this._changeDetectorRef.markForCheck())}ngAfterContentInit(){this._subscribeToAllTabChanges(),this._subscribeToTabLabels(),this._tabsSubscription=this._tabs.changes.subscribe(()=>{let t=this._clampTabIndex(this._indexToSelect);if(t===this._selectedIndex){let i=this._tabs.toArray(),r;for(let o=0;o<i.length;o++)if(i[o].isActive){this._indexToSelect=this._selectedIndex=o,this._lastFocusedTabIndex=null,r=i[o];break}!r&&i[t]&&Promise.resolve().then(()=>{i[t].isActive=!0,this.selectedTabChange.emit(this._createChangeEvent(t))})}this._changeDetectorRef.markForCheck()})}ngAfterViewInit(){this._tabBodySubscription=this._tabBodies.changes.subscribe(()=>this._bodyCentered(!0))}_subscribeToAllTabChanges(){this._allTabs.changes.pipe(Ft(this._allTabs)).subscribe(t=>{this._tabs.reset(t.filter(i=>i._closestTabGroup===this||!i._closestTabGroup)),this._tabs.notifyOnChanges()})}ngOnDestroy(){this._tabs.destroy(),this._tabsSubscription.unsubscribe(),this._tabLabelSubscription.unsubscribe(),this._tabBodySubscription.unsubscribe()}realignInkBar(){this._tabHeader&&this._tabHeader._alignInkBarToSelectedTab()}updatePagination(){this._tabHeader&&this._tabHeader.updatePagination()}focusTab(t){let i=this._tabHeader;i&&(i.focusIndex=t)}_focusChanged(t){this._lastFocusedTabIndex=t,this.focusChange.emit(this._createChangeEvent(t))}_createChangeEvent(t){let i=new Cm;return i.index=t,this._tabs&&this._tabs.length&&(i.tab=this._tabs.toArray()[t]),i}_subscribeToTabLabels(){this._tabLabelSubscription&&this._tabLabelSubscription.unsubscribe(),this._tabLabelSubscription=Vn(...this._tabs.map(t=>t._stateChanges)).subscribe(()=>this._changeDetectorRef.markForCheck())}_clampTabIndex(t){return Math.min(this._tabs.length-1,Math.max(t||0,0))}_getTabLabelId(t,i){return t.id||`${this._groupId}-label-${i}`}_getTabContentId(t){return`${this._groupId}-content-${t}`}_setTabBodyWrapperHeight(t){if(!this.dynamicHeight||!this._tabBodyWrapperHeight){this._tabBodyWrapperHeight=t;return}let i=this._tabBodyWrapper.nativeElement;i.style.height=this._tabBodyWrapperHeight+"px",this._tabBodyWrapper.nativeElement.offsetHeight&&(i.style.height=t+"px")}_removeTabBodyWrapperHeight(){let t=this._tabBodyWrapper.nativeElement;this._tabBodyWrapperHeight=t.clientHeight,t.style.height="",this._ngZone.run(()=>this.animationDone.emit())}_handleClick(t,i,r){i.focusIndex=r,t.disabled||(this.selectedIndex=r)}_getTabIndex(t){let i=this._lastFocusedTabIndex??this.selectedIndex;return t===i?0:-1}_tabFocusChanged(t,i){t&&t!=="mouse"&&t!=="touch"&&(this._tabHeader.focusIndex=i)}_bodyCentered(t){t&&this._tabBodies?.forEach((i,r)=>i._setActiveClass(r===this._selectedIndex))}_bodyAnimationsDisabled(){return this._diAnimationsDisabled||this._bodyAnimationDuration==="0"||this._bodyAnimationDuration==="0ms"}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=Z({type:e,selectors:[["mat-tab-group"]],contentQueries:function(i,r,o){if(i&1&&kn(o,xm,5),i&2){let s;K(s=Q())&&(r._allTabs=s)}},viewQuery:function(i,r){if(i&1&&nt(FO,5)(LO,5)(Dm,5),i&2){let o;K(o=Q())&&(r._tabBodyWrapper=o.first),K(o=Q())&&(r._tabHeader=o.first),K(o=Q())&&(r._tabBodies=o)}},hostAttrs:[1,"mat-mdc-tab-group"],hostVars:13,hostBindings:function(i,r){i&2&&(ge("mat-align-tabs",r.alignTabs),Nt("mat-"+(r.color||"primary")),or("--mat-tab-body-animation-duration",r._bodyAnimationDuration)("--mat-tab-header-animation-duration",r._headerAnimationDuration),X("mat-mdc-tab-group-dynamic-height",r.dynamicHeight)("mat-mdc-tab-group-inverted-header",r.headerPosition==="below")("mat-mdc-tab-group-stretch-tabs",r.stretchTabs))},inputs:{color:"color",fitInkBarToContent:[2,"fitInkBarToContent","fitInkBarToContent",j],stretchTabs:[2,"mat-stretch-tabs","stretchTabs",j],alignTabs:[0,"mat-align-tabs","alignTabs"],dynamicHeight:[2,"dynamicHeight","dynamicHeight",j],selectedIndex:[2,"selectedIndex","selectedIndex",Ut],headerPosition:"headerPosition",animationDuration:"animationDuration",contentTabIndex:[2,"contentTabIndex","contentTabIndex",Ut],disablePagination:[2,"disablePagination","disablePagination",j],disableRipple:[2,"disableRipple","disableRipple",j],preserveContent:[2,"preserveContent","preserveContent",j],backgroundColor:"backgroundColor",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"]},outputs:{selectedIndexChange:"selectedIndexChange",focusChange:"focusChange",animationDone:"animationDone",selectedTabChange:"selectedTabChange"},exportAs:["matTabGroup"],features:[rt([{provide:$D,useExisting:e}])],ngContentSelectors:Im,decls:9,vars:8,consts:[["tabHeader",""],["tabBodyWrapper",""],["tabNode",""],[3,"indexFocused","selectFocusedIndex","selectedIndex","disableRipple","disablePagination","aria-label","aria-labelledby"],["role","tab","matTabLabelWrapper","","cdkMonitorElementFocus","",1,"mdc-tab","mat-mdc-tab","mat-focus-indicator",3,"id","mdc-tab--active","class","disabled","fitInkBarToContent"],[1,"mat-mdc-tab-body-wrapper"],["role","tabpanel",3,"id","class","content","position","animationDuration","preserveContent"],["role","tab","matTabLabelWrapper","","cdkMonitorElementFocus","",1,"mdc-tab","mat-mdc-tab","mat-focus-indicator",3,"click","cdkFocusChange","id","disabled","fitInkBarToContent"],[1,"mdc-tab__ripple"],["mat-ripple","",1,"mat-mdc-tab-ripple",3,"matRippleTrigger","matRippleDisabled"],[1,"mdc-tab__content"],[1,"mdc-tab__text-label"],[3,"cdkPortalOutlet"],["role","tabpanel",3,"_onCentered","_onCentering","_beforeCentering","id","content","position","animationDuration","preserveContent"]],template:function(i,r){i&1&&(Fe(),_(0,"mat-tab-header",3,0),Ce("indexFocused",function(s){return r._focusChanged(s)})("selectFocusedIndex",function(s){return r.selectedIndex=s}),ln(2,UO,8,17,"div",4,so),b(),et(4,HO,1,0),_(5,"div",5,1),ln(7,$O,1,10,"mat-tab-body",6,so),b()),i&2&&(_e("selectedIndex",r.selectedIndex||0)("disableRipple",r.disableRipple)("disablePagination",r.disablePagination),ul("aria-label",r.ariaLabel)("aria-labelledby",r.ariaLabelledby),w(2),dn(r._tabs),w(2),tt(r._isServer?4:-1),w(),X("_mat-animation-noopable",r._bodyAnimationsDisabled()),w(2),dn(r._tabs))},dependencies:[QO,zD,hm,ia,xi,Dm],styles:[`.mdc-tab {
  min-width: 90px;
  padding: 0 24px;
  display: flex;
  flex: 1 0 auto;
  justify-content: center;
  box-sizing: border-box;
  border: none;
  outline: none;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  z-index: 1;
  touch-action: manipulation;
}

.mdc-tab__content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  pointer-events: none;
}

.mdc-tab__text-label {
  transition: 150ms color linear;
  display: inline-block;
  line-height: 1;
  z-index: 2;
}

.mdc-tab--active .mdc-tab__text-label {
  transition-delay: 100ms;
}

._mat-animation-noopable .mdc-tab__text-label {
  transition: none;
}

.mdc-tab-indicator {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  justify-content: center;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.mdc-tab-indicator__content {
  transition: var(--mat-tab-header-animation-duration, 250ms) transform cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: left;
  opacity: 0;
}

.mdc-tab-indicator__content--underline {
  align-self: flex-end;
  box-sizing: border-box;
  width: 100%;
  border-top-style: solid;
}

.mdc-tab-indicator--active .mdc-tab-indicator__content {
  opacity: 1;
}

._mat-animation-noopable .mdc-tab-indicator__content, .mdc-tab-indicator--no-transition .mdc-tab-indicator__content {
  transition: none;
}

.mat-mdc-tab-ripple.mat-mdc-tab-ripple {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: none;
}

.mat-mdc-tab {
  -webkit-tap-highlight-color: transparent;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-decoration: none;
  background: none;
  height: var(--mat-tab-container-height, 48px);
  font-family: var(--mat-tab-label-text-font, var(--mat-sys-title-small-font));
  font-size: var(--mat-tab-label-text-size, var(--mat-sys-title-small-size));
  letter-spacing: var(--mat-tab-label-text-tracking, var(--mat-sys-title-small-tracking));
  line-height: var(--mat-tab-label-text-line-height, var(--mat-sys-title-small-line-height));
  font-weight: var(--mat-tab-label-text-weight, var(--mat-sys-title-small-weight));
}
.mat-mdc-tab.mdc-tab {
  flex-grow: 0;
}
.mat-mdc-tab .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-active-indicator-color, var(--mat-sys-primary));
  border-top-width: var(--mat-tab-active-indicator-height, 2px);
  border-radius: var(--mat-tab-active-indicator-shape, 0);
}
.mat-mdc-tab:hover .mdc-tab__text-label {
  color: var(--mat-tab-inactive-hover-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab:focus .mdc-tab__text-label {
  color: var(--mat-tab-inactive-focus-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active .mdc-tab__text-label {
  color: var(--mat-tab-active-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active .mdc-tab__ripple::before,
.mat-mdc-tab.mdc-tab--active .mat-ripple-element {
  background-color: var(--mat-tab-active-ripple-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active:hover .mdc-tab__text-label {
  color: var(--mat-tab-active-hover-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active:hover .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-active-hover-indicator-color, var(--mat-sys-primary));
}
.mat-mdc-tab.mdc-tab--active:focus .mdc-tab__text-label {
  color: var(--mat-tab-active-focus-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active:focus .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-active-focus-indicator-color, var(--mat-sys-primary));
}
.mat-mdc-tab.mat-mdc-tab-disabled {
  opacity: 0.4;
  pointer-events: none;
}
.mat-mdc-tab.mat-mdc-tab-disabled .mdc-tab__content {
  pointer-events: none;
}
.mat-mdc-tab.mat-mdc-tab-disabled .mdc-tab__ripple::before,
.mat-mdc-tab.mat-mdc-tab-disabled .mat-ripple-element {
  background-color: var(--mat-tab-disabled-ripple-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-tab .mdc-tab__ripple::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  pointer-events: none;
  background-color: var(--mat-tab-inactive-ripple-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab .mdc-tab__text-label {
  color: var(--mat-tab-inactive-label-text-color, var(--mat-sys-on-surface));
  display: inline-flex;
  align-items: center;
}
.mat-mdc-tab .mdc-tab__content {
  position: relative;
  pointer-events: auto;
}
.mat-mdc-tab:hover .mdc-tab__ripple::before {
  opacity: 0.04;
}
.mat-mdc-tab.cdk-program-focused .mdc-tab__ripple::before, .mat-mdc-tab.cdk-keyboard-focused .mdc-tab__ripple::before {
  opacity: 0.12;
}
.mat-mdc-tab .mat-ripple-element {
  opacity: 0.12;
  background-color: var(--mat-tab-inactive-ripple-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab-group.mat-mdc-tab-group-stretch-tabs > .mat-mdc-tab-header .mat-mdc-tab {
  flex-grow: 1;
}

.mat-mdc-tab-group {
  display: flex;
  flex-direction: column;
  max-width: 100%;
}
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination {
  background-color: var(--mat-tab-background-color);
}
.mat-mdc-tab-group.mat-tabs-with-background.mat-primary > .mat-mdc-tab-header .mat-mdc-tab .mdc-tab__text-label {
  color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background.mat-primary > .mat-mdc-tab-header .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background:not(.mat-primary) > .mat-mdc-tab-header .mat-mdc-tab:not(.mdc-tab--active) .mdc-tab__text-label {
  color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background:not(.mat-primary) > .mat-mdc-tab-header .mat-mdc-tab:not(.mdc-tab--active) .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mat-mdc-tab-header-pagination-chevron,
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mat-focus-indicator::before, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron,
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mat-focus-indicator::before {
  border-color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mat-ripple-element, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mdc-tab__ripple::before, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mat-ripple-element, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mdc-tab__ripple::before {
  background-color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mat-mdc-tab-header-pagination-chevron, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron {
  color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header {
  flex-direction: column-reverse;
}
.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header .mdc-tab-indicator__content--underline {
  align-self: flex-start;
}

.mat-mdc-tab-body-wrapper {
  position: relative;
  overflow: hidden;
  display: flex;
  transition: height 500ms cubic-bezier(0.35, 0, 0.25, 1);
}
.mat-mdc-tab-body-wrapper._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
`],encapsulation:2,changeDetection:1})}return e})(),Cm=class{index;tab};function wm(e){let n=e+"";return/^\d+$/.test(n)?e+"ms":n}var WD=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=me({type:e});static \u0275inj=fe({imports:[zt]})}return e})();var ad=class{enable(){}disable(){}attach(){}};var ko=class{positionStrategy;scrollStrategy=new ad;panelClass="";hasBackdrop=!1;backdropClass="cdk-overlay-dark-backdrop";disableAnimations;width;height;minWidth;minHeight;maxWidth;maxHeight;direction;disposeOnNavigation=!1;usePopover;eventPredicate;constructor(n){if(n){let t=Object.keys(n);for(let i of t)n[i]!==void 0&&(this[i]=n[i])}}};var ZD=(()=>{class e{_attachedOverlays=[];_document=u(O);_isAttached=!1;ngOnDestroy(){this.detach()}add(t){this.remove(t),this._attachedOverlays.push(t)}remove(t){let i=this._attachedOverlays.indexOf(t);i>-1&&this._attachedOverlays.splice(i,1),this._attachedOverlays.length===0&&this.detach()}canReceiveEvent(t,i,r){return r.observers.length<1?!1:t.eventPredicate?t.eventPredicate(i):!0}static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:e.\u0275fac})}return e})(),KD=(()=>{class e extends ZD{_ngZone=u(M);_renderer=u($e).createRenderer(null,null);_cleanupKeydown;add(t){super.add(t),this._isAttached||(this._ngZone.runOutsideAngular(()=>{this._cleanupKeydown=this._renderer.listen("body","keydown",this._keydownListener)}),this._isAttached=!0)}detach(){this._isAttached&&(this._cleanupKeydown?.(),this._isAttached=!1)}_keydownListener=t=>{let i=this._attachedOverlays;for(let r=i.length-1;r>-1;r--){let o=i[r];if(this.canReceiveEvent(o,t,o._keydownEvents)){this._ngZone.run(()=>o._keydownEvents.next(t));break}}};static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:e.\u0275fac})}return e})(),QD=(()=>{class e extends ZD{_platform=u(Ae);_ngZone=u(M);_renderer=u($e).createRenderer(null,null);_cursorOriginalValue;_cursorStyleIsSet=!1;_pointerDownEventTarget=null;_cleanups;add(t){if(super.add(t),!this._isAttached){let i=this._document.body,r={capture:!0},o=this._renderer;this._cleanups=this._ngZone.runOutsideAngular(()=>[o.listen(i,"pointerdown",this._pointerDownListener,r),o.listen(i,"click",this._clickListener,r),o.listen(i,"auxclick",this._clickListener,r),o.listen(i,"contextmenu",this._clickListener,r)]),this._platform.IOS&&!this._cursorStyleIsSet&&(this._cursorOriginalValue=i.style.cursor,i.style.cursor="pointer",this._cursorStyleIsSet=!0),this._isAttached=!0}}detach(){this._isAttached&&(this._cleanups?.forEach(t=>t()),this._cleanups=void 0,this._platform.IOS&&this._cursorStyleIsSet&&(this._document.body.style.cursor=this._cursorOriginalValue,this._cursorStyleIsSet=!1),this._isAttached=!1)}_pointerDownListener=t=>{this._pointerDownEventTarget=wt(t)};_clickListener=t=>{let i=wt(t),r=t.type==="click"&&this._pointerDownEventTarget?this._pointerDownEventTarget:i;this._pointerDownEventTarget=null;let o=this._attachedOverlays.slice();for(let s=o.length-1;s>-1;s--){let a=o[s],c=a._outsidePointerEvents;if(!(!a.hasAttached()||!this.canReceiveEvent(a,t,c))){if(qD(a.overlayElement,i)||qD(a.overlayElement,r))break;this._ngZone?this._ngZone.run(()=>c.next(t)):c.next(t)}}};static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:e.\u0275fac})}return e})();function qD(e,n){let t=typeof ShadowRoot<"u"&&ShadowRoot,i=n;for(;i;){if(i===e)return!0;i=t&&i instanceof ShadowRoot?i.host:i.parentNode}return!1}var XD=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275cmp=Z({type:e,selectors:[["ng-component"]],hostAttrs:["cdk-overlay-style-loader",""],decls:0,vars:0,template:function(i,r){},styles:[`.cdk-overlay-container, .cdk-global-overlay-wrapper {
  pointer-events: none;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.cdk-overlay-container {
  position: fixed;
}
@layer cdk-overlay {
  .cdk-overlay-container {
    z-index: 1000;
  }
}
.cdk-overlay-container:empty {
  display: none;
}

.cdk-global-overlay-wrapper {
  display: flex;
  position: absolute;
}
@layer cdk-overlay {
  .cdk-global-overlay-wrapper {
    z-index: 1000;
  }
}

.cdk-overlay-pane {
  position: absolute;
  pointer-events: auto;
  box-sizing: border-box;
  display: flex;
  max-width: 100%;
  max-height: 100%;
}
@layer cdk-overlay {
  .cdk-overlay-pane {
    z-index: 1000;
  }
}

.cdk-overlay-backdrop {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: auto;
  -webkit-tap-highlight-color: transparent;
  opacity: 0;
  touch-action: manipulation;
}
@layer cdk-overlay {
  .cdk-overlay-backdrop {
    z-index: 1000;
    transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
  }
}
@media (prefers-reduced-motion) {
  .cdk-overlay-backdrop {
    transition-duration: 1ms;
  }
}

.cdk-overlay-backdrop-showing {
  opacity: 1;
}
@media (forced-colors: active) {
  .cdk-overlay-backdrop-showing {
    opacity: 0.6;
  }
}

@layer cdk-overlay {
  .cdk-overlay-dark-backdrop {
    background: rgba(0, 0, 0, 0.32);
  }
}

.cdk-overlay-transparent-backdrop {
  transition: visibility 1ms linear, opacity 1ms linear;
  visibility: hidden;
  opacity: 1;
}
.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing, .cdk-high-contrast-active .cdk-overlay-transparent-backdrop {
  opacity: 0;
  visibility: visible;
}

.cdk-overlay-backdrop-noop-animation {
  transition: none;
}

.cdk-overlay-connected-position-bounding-box {
  position: absolute;
  display: flex;
  flex-direction: column;
  min-width: 1px;
  min-height: 1px;
}
@layer cdk-overlay {
  .cdk-overlay-connected-position-bounding-box {
    z-index: 1000;
  }
}

.cdk-global-scrollblock {
  position: fixed;
  width: 100%;
  overflow-y: scroll;
}

.cdk-overlay-popover {
  background: none;
  border: none;
  padding: 0;
  outline: 0;
  overflow: visible;
  position: fixed;
  pointer-events: none;
  white-space: normal;
  color: inherit;
  text-decoration: none;
  width: 100%;
  height: 100%;
  inset: auto;
  top: 0;
  left: 0;
}
.cdk-overlay-popover::backdrop {
  display: none;
}
.cdk-overlay-popover .cdk-overlay-backdrop {
  position: fixed;
  z-index: auto;
}
`],encapsulation:2})}return e})(),eP=(()=>{class e{_platform=u(Ae);_containerElement;_document=u(O);_styleLoader=u(Ze);ngOnDestroy(){this._containerElement?.remove()}getContainerElement(){return this._loadStyles(),this._containerElement||this._createContainer(),this._containerElement}_createContainer(){let t="cdk-overlay-container";if(this._platform.isBrowser||vm()){let r=this._document.querySelectorAll(`.${t}[platform="server"], .${t}[platform="test"]`);for(let o=0;o<r.length;o++)r[o].remove()}let i=this._document.createElement("div");i.classList.add(t),vm()?i.setAttribute("platform","test"):this._platform.isBrowser||i.setAttribute("platform","server"),this._document.body.appendChild(i),this._containerElement=i}_loadStyles(){this._styleLoader.load(XD)}static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:e.\u0275fac})}return e})(),Tm=class{_renderer;_ngZone;element;_cleanupClick;_cleanupTransitionEnd;_fallbackTimeout;constructor(n,t,i,r){this._renderer=t,this._ngZone=i,this.element=n.createElement("div"),this.element.classList.add("cdk-overlay-backdrop"),this._cleanupClick=t.listen(this.element,"click",r)}detach(){this._ngZone.runOutsideAngular(()=>{let n=this.element;clearTimeout(this._fallbackTimeout),this._cleanupTransitionEnd?.(),this._cleanupTransitionEnd=this._renderer.listen(n,"transitionend",this.dispose),this._fallbackTimeout=setTimeout(this.dispose,500),n.style.pointerEvents="none",n.classList.remove("cdk-overlay-backdrop-showing")})}dispose=()=>{clearTimeout(this._fallbackTimeout),this._cleanupClick?.(),this._cleanupTransitionEnd?.(),this._cleanupClick=this._cleanupTransitionEnd=this._fallbackTimeout=void 0,this.element.remove()}};function JD(e){return e&&e.nodeType===1}var cd=class{_portalOutlet;_host;_pane;_config;_ngZone;_keyboardDispatcher;_document;_location;_outsideClickDispatcher;_animationsDisabled;_injector;_renderer;_backdropClick=new I;_attachments=new I;_detachments=new I;_positionStrategy;_scrollStrategy;_locationChanges=ee.EMPTY;_backdropRef=null;_detachContentMutationObserver;_detachContentAfterRenderRef;_disposed=!1;_previousHostParent;_keydownEvents=new I;_outsidePointerEvents=new I;_afterNextRenderRef;constructor(n,t,i,r,o,s,a,c,l,d=!1,f,h){this._portalOutlet=n,this._host=t,this._pane=i,this._config=r,this._ngZone=o,this._keyboardDispatcher=s,this._document=a,this._location=c,this._outsideClickDispatcher=l,this._animationsDisabled=d,this._injector=f,this._renderer=h,r.scrollStrategy&&(this._scrollStrategy=r.scrollStrategy,this._scrollStrategy.attach(this)),this._positionStrategy=r.positionStrategy}get overlayElement(){return this._pane}get backdropElement(){return this._backdropRef?.element||null}get hostElement(){return this._host}get eventPredicate(){return this._config?.eventPredicate||null}attach(n){if(this._disposed)return null;this._attachHost();let t=this._portalOutlet.attach(n);return this._positionStrategy?.attach(this),this._updateStackingOrder(),this._updateElementSize(),this._updateElementDirection(),this._scrollStrategy&&this._scrollStrategy.enable(),this._afterNextRenderRef?.destroy(),this._afterNextRenderRef=ze(()=>{this.hasAttached()&&this.updatePosition()},{injector:this._injector}),this._togglePointerEvents(!0),this._config.hasBackdrop&&this._attachBackdrop(),this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!0),this._attachments.next(),this._completeDetachContent(),this._keyboardDispatcher.add(this),this._config.disposeOnNavigation&&(this._locationChanges=this._location.subscribe(()=>this.dispose())),this._outsideClickDispatcher.add(this),typeof t?.onDestroy=="function"&&t.onDestroy(()=>{this.hasAttached()&&this._ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>this.detach()))}),t}detach(){if(!this.hasAttached())return;this.detachBackdrop(),this._togglePointerEvents(!1),this._positionStrategy&&this._positionStrategy.detach&&this._positionStrategy.detach(),this._scrollStrategy&&this._scrollStrategy.disable();let n=this._portalOutlet.detach();return this._detachments.next(),this._completeDetachContent(),this._keyboardDispatcher.remove(this),this._detachContentWhenEmpty(),this._locationChanges.unsubscribe(),this._outsideClickDispatcher.remove(this),n}dispose(){if(this._disposed)return;let n=this.hasAttached();this._positionStrategy&&this._positionStrategy.dispose(),this._disposeScrollStrategy(),this._backdropRef?.dispose(),this._locationChanges.unsubscribe(),this._keyboardDispatcher.remove(this),this._portalOutlet.dispose(),this._attachments.complete(),this._backdropClick.complete(),this._keydownEvents.complete(),this._outsidePointerEvents.complete(),this._outsideClickDispatcher.remove(this),this._host?.remove(),this._afterNextRenderRef?.destroy(),this._previousHostParent=this._pane=this._host=this._backdropRef=null,n&&this._detachments.next(),this._detachments.complete(),this._completeDetachContent(),this._disposed=!0}hasAttached(){return this._portalOutlet.hasAttached()}backdropClick(){return this._backdropClick}attachments(){return this._attachments}detachments(){return this._detachments}keydownEvents(){return this._keydownEvents}outsidePointerEvents(){return this._outsidePointerEvents}getConfig(){return this._config}updatePosition(){this._positionStrategy&&this._positionStrategy.apply()}updatePositionStrategy(n){n!==this._positionStrategy&&(this._positionStrategy&&this._positionStrategy.dispose(),this._positionStrategy=n,this.hasAttached()&&(n.attach(this),this.updatePosition()))}updateSize(n){this._config=v(v({},this._config),n),this._updateElementSize()}setDirection(n){this._config=J(v({},this._config),{direction:n}),this._updateElementDirection()}addPanelClass(n){this._pane&&this._toggleClasses(this._pane,n,!0)}removePanelClass(n){this._pane&&this._toggleClasses(this._pane,n,!1)}getDirection(){let n=this._config.direction;return n?typeof n=="string"?n:n.value:"ltr"}updateScrollStrategy(n){n!==this._scrollStrategy&&(this._disposeScrollStrategy(),this._scrollStrategy=n,this.hasAttached()&&(n.attach(this),n.enable()))}_updateElementDirection(){this._host.setAttribute("dir",this.getDirection())}_updateElementSize(){if(!this._pane)return;let n=this._pane.style;n.width=yr(this._config.width),n.height=yr(this._config.height),n.minWidth=yr(this._config.minWidth),n.minHeight=yr(this._config.minHeight),n.maxWidth=yr(this._config.maxWidth),n.maxHeight=yr(this._config.maxHeight)}_togglePointerEvents(n){this._pane.style.pointerEvents=n?"":"none"}_attachHost(){if(!this._host.parentElement){let n=this._config.usePopover?this._positionStrategy?.getPopoverInsertionPoint?.():null;JD(n)?n.after(this._host):n?.type==="parent"?n.element.appendChild(this._host):this._previousHostParent?.appendChild(this._host)}if(this._config.usePopover)try{this._host.showPopover()}catch{}}_attachBackdrop(){let n="cdk-overlay-backdrop-showing";this._backdropRef?.dispose(),this._backdropRef=new Tm(this._document,this._renderer,this._ngZone,t=>{this._backdropClick.next(t)}),this._animationsDisabled&&this._backdropRef.element.classList.add("cdk-overlay-backdrop-noop-animation"),this._config.backdropClass&&this._toggleClasses(this._backdropRef.element,this._config.backdropClass,!0),this._config.usePopover?this._host.prepend(this._backdropRef.element):this._host.parentElement.insertBefore(this._backdropRef.element,this._host),!this._animationsDisabled&&typeof requestAnimationFrame<"u"?this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>this._backdropRef?.element.classList.add(n))}):this._backdropRef.element.classList.add(n)}_updateStackingOrder(){!this._config.usePopover&&this._host.nextSibling&&this._host.parentNode.appendChild(this._host)}detachBackdrop(){this._animationsDisabled?(this._backdropRef?.dispose(),this._backdropRef=null):this._backdropRef?.detach()}_toggleClasses(n,t,i){let r=ea(t||[]).filter(o=>!!o);r.length&&(i?n.classList.add(...r):n.classList.remove(...r))}_detachContentWhenEmpty(){let n=!1;try{this._detachContentAfterRenderRef=ze(()=>{n=!0,this._detachContent()},{injector:this._injector})}catch(t){if(n)throw t;this._detachContent()}globalThis.MutationObserver&&this._pane&&(this._detachContentMutationObserver||=new globalThis.MutationObserver(()=>{this._detachContent()}),this._detachContentMutationObserver.observe(this._pane,{childList:!0}))}_detachContent(){(!this._pane||!this._host||this._pane.children.length===0)&&(this._pane&&this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!1),this._host&&this._host.parentElement&&(this._previousHostParent=this._host.parentElement,this._host.remove()),this._completeDetachContent())}_completeDetachContent(){this._detachContentAfterRenderRef?.destroy(),this._detachContentAfterRenderRef=void 0,this._detachContentMutationObserver?.disconnect()}_disposeScrollStrategy(){let n=this._scrollStrategy;n?.disable(),n?.detach?.()}};var YD="cdk-global-overlay-wrapper";function Mm(e){return new ld}var ld=class{_overlayRef;_cssPosition="static";_topOffset="";_bottomOffset="";_alignItems="";_xPosition="";_xOffset="";_width="";_height="";_isDisposed=!1;attach(n){let t=n.getConfig();this._overlayRef=n,this._width&&!t.width&&n.updateSize({width:this._width}),this._height&&!t.height&&n.updateSize({height:this._height}),n.hostElement.classList.add(YD),this._isDisposed=!1}top(n=""){return this._bottomOffset="",this._topOffset=n,this._alignItems="flex-start",this}left(n=""){return this._xOffset=n,this._xPosition="left",this}bottom(n=""){return this._topOffset="",this._bottomOffset=n,this._alignItems="flex-end",this}right(n=""){return this._xOffset=n,this._xPosition="right",this}start(n=""){return this._xOffset=n,this._xPosition="start",this}end(n=""){return this._xOffset=n,this._xPosition="end",this}width(n=""){return this._overlayRef?this._overlayRef.updateSize({width:n}):this._width=n,this}height(n=""){return this._overlayRef?this._overlayRef.updateSize({height:n}):this._height=n,this}centerHorizontally(n=""){return this.left(n),this._xPosition="center",this}centerVertically(n=""){return this.top(n),this._alignItems="center",this}apply(){if(!this._overlayRef||!this._overlayRef.hasAttached())return;let n=this._overlayRef.overlayElement.style,t=this._overlayRef.hostElement.style,i=this._overlayRef.getConfig(),{width:r,height:o,maxWidth:s,maxHeight:a}=i,c=(r==="100%"||r==="100vw")&&(!s||s==="100%"||s==="100vw"),l=(o==="100%"||o==="100vh")&&(!a||a==="100%"||a==="100vh"),d=this._xPosition,f=this._xOffset,h=this._overlayRef.getConfig().direction==="rtl",p="",m="",y="";c?y="flex-start":d==="center"?(y="center",h?m=f:p=f):h?d==="left"||d==="end"?(y="flex-end",p=f):(d==="right"||d==="start")&&(y="flex-start",m=f):d==="left"||d==="start"?(y="flex-start",p=f):(d==="right"||d==="end")&&(y="flex-end",m=f),n.position=this._cssPosition,n.marginLeft=c?"0":p,n.marginTop=l?"0":this._topOffset,n.marginBottom=this._bottomOffset,n.marginRight=c?"0":m,t.justifyContent=y,t.alignItems=l?"flex-start":this._alignItems}dispose(){if(this._isDisposed||!this._overlayRef)return;let n=this._overlayRef.overlayElement.style,t=this._overlayRef.hostElement,i=t.style;t.classList.remove(YD),i.justifyContent=i.alignItems=n.marginTop=n.marginBottom=n.marginLeft=n.marginRight=n.position="",this._overlayRef=null,this._isDisposed=!0}};var eC=new g("OVERLAY_DEFAULT_CONFIG");function Am(e,n){e.get(Ze).load(XD);let t=e.get(eP),i=e.get(O),r=e.get(Ke),o=e.get(Pe),s=e.get(ai),a=e.get(yt,null,{optional:!0})||e.get($e).createRenderer(null,null),c=new ko(n),l=e.get(eC,null,{optional:!0})?.usePopover??!0;c.direction=c.direction||s.value,"showPopover"in i.body?c.usePopover=n?.usePopover??l:c.usePopover=!1;let d=i.createElement("div"),f=i.createElement("div");d.id=r.getId("cdk-overlay-"),d.classList.add("cdk-overlay-pane"),f.appendChild(d),c.usePopover&&(f.setAttribute("popover","manual"),f.classList.add("cdk-overlay-popover"));let h=c.usePopover?c.positionStrategy?.getPopoverInsertionPoint?.():null;return JD(h)?h.after(f):h?.type==="parent"?h.element.appendChild(f):t.getContainerElement().appendChild(f),new cd(new Kl(d,o,e),f,d,c,e.get(M),e.get(KD),i,e.get(Ci),e.get(QD),n?.disableAnimations??e.get(ss,null,{optional:!0})==="NoopAnimations",e.get(ue),a)}var nP={capture:!0},iP=["focus","mousedown","mouseenter","touchstart"],Rm="mat-ripple-loader-uninitialized",km="mat-ripple-loader-class-name",tC="mat-ripple-loader-centered",dd="mat-ripple-loader-disabled",ud=(()=>{class e{_document=u(O);_animationsDisabled=je();_globalRippleOptions=u(Ao,{optional:!0});_platform=u(Ae);_ngZone=u(M);_injector=u(ne);_eventCleanups;_hosts=new Map;constructor(){let t=u($e).createRenderer(null,null);this._eventCleanups=this._ngZone.runOutsideAngular(()=>iP.map(i=>t.listen(this._document,i,this._onInteraction,nP)))}ngOnDestroy(){let t=this._hosts.keys();for(let i of t)this.destroyRipple(i);this._eventCleanups.forEach(i=>i())}configureRipple(t,i){t.setAttribute(Rm,this._globalRippleOptions?.namespace??""),(i.className||!t.hasAttribute(km))&&t.setAttribute(km,i.className||""),i.centered&&t.setAttribute(tC,""),i.disabled&&t.setAttribute(dd,"")}setDisabled(t,i){let r=this._hosts.get(t);r?(r.target.rippleDisabled=i,!i&&!r.hasSetUpEvents&&(r.hasSetUpEvents=!0,r.renderer.setupTriggerEvents(t))):i?t.setAttribute(dd,""):t.removeAttribute(dd)}_onInteraction=t=>{let i=wt(t);if(i instanceof HTMLElement){let r=i.closest(`[${Rm}="${this._globalRippleOptions?.namespace??""}"]`);r&&this._createRipple(r)}};_createRipple(t){if(!this._document||this._hosts.has(t))return;t.querySelector(".mat-ripple")?.remove();let i=this._document.createElement("span");i.classList.add("mat-ripple",t.getAttribute(km)),t.append(i);let r=this._globalRippleOptions,o=this._animationsDisabled?0:r?.animation?.enterDuration??ta.enterDuration,s=this._animationsDisabled?0:r?.animation?.exitDuration??ta.exitDuration,a={rippleDisabled:this._animationsDisabled||r?.disabled||t.hasAttribute(dd),rippleConfig:{centered:t.hasAttribute(tC),terminateOnPointerUp:r?.terminateOnPointerUp,animation:{enterDuration:o,exitDuration:s}}},c=new na(a,this._ngZone,i,this._platform,this._injector),l=!a.rippleDisabled;l&&c.setupTriggerEvents(t),this._hosts.set(t,{target:a,renderer:c,hasSetUpEvents:l}),t.removeAttribute(Rm)}destroyRipple(t){let i=this._hosts.get(t);i&&(i.renderer._removeTriggerEvents(),this._hosts.delete(t))}static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:e.\u0275fac})}return e})();var rP=new g("MAT_BUTTON_CONFIG");function nC(e){return e==null?void 0:Ut(e)}var iC=(()=>{class e{_elementRef=u(Y);_ngZone=u(M);_animationsDisabled=je();_config=u(rP,{optional:!0});_focusMonitor=u(gn);_cleanupClick;_renderer=u(yt);_rippleLoader=u(ud);_isAnchor;_isFab=!1;color;get disableRipple(){return this._disableRipple}set disableRipple(t){this._disableRipple=t,this._updateRippleDisabled()}_disableRipple=!1;get disabled(){return this._disabled}set disabled(t){this._disabled=t,this._updateRippleDisabled()}_disabled=!1;ariaDisabled;disabledInteractive;tabIndex;set _tabindex(t){this.tabIndex=t}showProgress=lr(!1,{transform:j});constructor(){u(Ze).load(mn);let t=this._elementRef.nativeElement;this._isAnchor=t.tagName==="A",this.disabledInteractive=this._config?.disabledInteractive??!1,this.color=this._config?.color??null,this._rippleLoader?.configureRipple(t,{className:"mat-mdc-button-ripple"})}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0),this._isAnchor&&this._setupAsAnchor()}ngOnDestroy(){this._cleanupClick?.(),this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement)}focus(t="program",i){t?this._focusMonitor.focusVia(this._elementRef.nativeElement,t,i):this._elementRef.nativeElement.focus(i)}_getAriaDisabled(){return this.ariaDisabled!=null?this.ariaDisabled:this._isAnchor?this.disabled||null:this.disabled&&this.disabledInteractive?!0:null}_getDisabledAttribute(){return this.disabledInteractive||!this.disabled?null:!0}_updateRippleDisabled(){this._rippleLoader?.setDisabled(this._elementRef.nativeElement,this.disableRipple||this.disabled)}_getTabIndex(){return this._isAnchor?this.disabled&&!this.disabledInteractive?-1:this.tabIndex:this.tabIndex}_setupAsAnchor(){this._cleanupClick=this._ngZone.runOutsideAngular(()=>this._renderer.listen(this._elementRef.nativeElement,"click",t=>{this.disabled&&(t.preventDefault(),t.stopImmediatePropagation())}))}static \u0275fac=function(i){return new(i||e)};static \u0275dir=H({type:e,hostAttrs:[1,"mat-mdc-button-base"],hostVars:15,hostBindings:function(i,r){i&2&&(ge("disabled",r._getDisabledAttribute())("aria-disabled",r._getAriaDisabled())("tabindex",r._getTabIndex()),Nt(r.color?"mat-"+r.color:""),X("mat-mdc-button-progress-indicator-shown",r.showProgress())("mat-mdc-button-disabled",r.disabled)("mat-mdc-button-disabled-interactive",r.disabledInteractive)("mat-unthemed",!r.color)("_mat-animation-noopable",r._animationsDisabled))},inputs:{color:"color",disableRipple:[2,"disableRipple","disableRipple",j],disabled:[2,"disabled","disabled",j],ariaDisabled:[2,"aria-disabled","ariaDisabled",j],disabledInteractive:[2,"disabledInteractive","disabledInteractive",j],tabIndex:[2,"tabIndex","tabIndex",nC],_tabindex:[2,"tabindex","_tabindex",nC],showProgress:[1,"showProgress"]}})}return e})();var rC=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=me({type:e});static \u0275inj=fe({imports:[zt]})}return e})();var oP=[[["",8,"material-icons",3,"iconPositionEnd",""],["mat-icon",3,"iconPositionEnd",""],["","matButtonIcon","",3,"iconPositionEnd",""]],"*",[["","iconPositionEnd","",8,"material-icons"],["mat-icon","iconPositionEnd",""],["","matButtonIcon","","iconPositionEnd",""]],[["","progressIndicator",""]]],sP=[".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd])","*",".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd]","[progressIndicator]"];function aP(e,n){e&1&&(_t(0,"div",2),he(1,3),kt())}var oC=new Map([["text",["mat-mdc-button"]],["filled",["mdc-button--unelevated","mat-mdc-unelevated-button"]],["elevated",["mdc-button--raised","mat-mdc-raised-button"]],["outlined",["mdc-button--outlined","mat-mdc-outlined-button"]],["tonal",["mat-tonal-button"]]]),sC=(()=>{class e extends iC{get appearance(){return this._appearance}set appearance(t){this.setAppearance(t||this._config?.defaultAppearance||"text")}_appearance=null;constructor(){super();let t=cP(this._elementRef.nativeElement);t&&this.setAppearance(t)}setAppearance(t){if(t===this._appearance)return;let i=this._elementRef.nativeElement.classList,r=this._appearance?oC.get(this._appearance):null,o=oC.get(t);r&&i.remove(...r),i.add(...o),this._appearance=t}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=Z({type:e,selectors:[["button","matButton",""],["a","matButton",""],["button","mat-button",""],["button","mat-raised-button",""],["button","mat-flat-button",""],["button","mat-stroked-button",""],["a","mat-button",""],["a","mat-raised-button",""],["a","mat-flat-button",""],["a","mat-stroked-button",""]],hostAttrs:[1,"mdc-button"],inputs:{appearance:[0,"matButton","appearance"]},exportAs:["matButton","matAnchor"],features:[Oe],ngContentSelectors:sP,decls:8,vars:5,consts:[[1,"mat-mdc-button-persistent-ripple"],[1,"mdc-button__label"],[1,"mat-mdc-button-progress-indicator-container"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(i,r){i&1&&(Fe(oP),ii(0,"span",0),he(1),_t(2,"span",1),he(3,1),kt(),he(4,2),et(5,aP,2,0,"div",2),ii(6,"span",3)(7,"span",4)),i&2&&(X("mdc-button__ripple",!r._isFab)("mdc-fab__ripple",r._isFab),w(5),tt(r.showProgress()?5:-1))},styles:[`.mat-mdc-button-base {
  text-decoration: none;
}
.mat-mdc-button-base .mat-icon {
  min-height: fit-content;
  flex-shrink: 0;
}
@media (hover: none) {
  .mat-mdc-button-base:hover > span.mat-mdc-button-persistent-ripple::before {
    opacity: 0;
  }
}

.mdc-button {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 64px;
  border: none;
  outline: none;
  line-height: inherit;
  -webkit-appearance: none;
  overflow: visible;
  vertical-align: middle;
  background: transparent;
  padding: 0 8px;
}
.mdc-button::-moz-focus-inner {
  padding: 0;
  border: 0;
}
.mdc-button:active {
  outline: none;
}
.mdc-button:hover {
  cursor: pointer;
}
.mdc-button:disabled {
  cursor: default;
  pointer-events: none;
}
.mdc-button[hidden] {
  display: none;
}
.mdc-button .mdc-button__label {
  position: relative;
}

.mat-mdc-button {
  padding: 0 var(--mat-button-text-horizontal-padding, 12px);
  height: var(--mat-button-text-container-height, 40px);
  font-family: var(--mat-button-text-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-text-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-text-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-text-label-text-transform);
  font-weight: var(--mat-button-text-label-text-weight, var(--mat-sys-label-large-weight));
}
.mat-mdc-button, .mat-mdc-button .mdc-button__ripple {
  border-radius: var(--mat-button-text-container-shape, var(--mat-sys-corner-full));
}
.mat-mdc-button:not(:disabled) {
  color: var(--mat-button-text-label-text-color, var(--mat-sys-primary));
}
.mat-mdc-button[disabled], .mat-mdc-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-text-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-button:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding: 0 var(--mat-button-text-with-icon-horizontal-padding, 16px);
}
.mat-mdc-button > .mat-icon {
  margin-right: var(--mat-button-text-icon-spacing, 8px);
  margin-left: var(--mat-button-text-icon-offset, -4px);
}
[dir=rtl] .mat-mdc-button > .mat-icon {
  margin-right: var(--mat-button-text-icon-offset, -4px);
  margin-left: var(--mat-button-text-icon-spacing, 8px);
}
.mat-mdc-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-text-icon-offset, -4px);
  margin-left: var(--mat-button-text-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-text-icon-spacing, 8px);
  margin-left: var(--mat-button-text-icon-offset, -4px);
}
.mat-mdc-button .mat-ripple-element {
  background-color: var(--mat-button-text-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-text-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-text-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-text-touch-target-size, 48px);
  display: var(--mat-button-text-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.mat-mdc-unelevated-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-filled-container-height, 40px);
  font-family: var(--mat-button-filled-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-filled-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-filled-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-filled-label-text-transform);
  font-weight: var(--mat-button-filled-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-filled-horizontal-padding, 24px);
}
.mat-mdc-unelevated-button > .mat-icon {
  margin-right: var(--mat-button-filled-icon-spacing, 8px);
  margin-left: var(--mat-button-filled-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-unelevated-button > .mat-icon {
  margin-right: var(--mat-button-filled-icon-offset, -8px);
  margin-left: var(--mat-button-filled-icon-spacing, 8px);
}
.mat-mdc-unelevated-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-filled-icon-offset, -8px);
  margin-left: var(--mat-button-filled-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-unelevated-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-filled-icon-spacing, 8px);
  margin-left: var(--mat-button-filled-icon-offset, -8px);
}
.mat-mdc-unelevated-button .mat-ripple-element {
  background-color: var(--mat-button-filled-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-filled-state-layer-color, var(--mat-sys-on-primary));
}
.mat-mdc-unelevated-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-filled-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-unelevated-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-unelevated-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-unelevated-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-unelevated-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-filled-touch-target-size, 48px);
  display: var(--mat-button-filled-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-unelevated-button:not(:disabled) {
  color: var(--mat-button-filled-label-text-color, var(--mat-sys-on-primary));
  background-color: var(--mat-button-filled-container-color, var(--mat-sys-primary));
}
.mat-mdc-unelevated-button, .mat-mdc-unelevated-button .mdc-button__ripple {
  border-radius: var(--mat-button-filled-container-shape, var(--mat-sys-corner-full));
}
.mat-mdc-unelevated-button .mat-mdc-button-progress-indicator-container {
  --mat-progress-spinner-active-indicator-color: var(--mat-button-filled-progress-active-indicator-color, var(--mat-sys-on-primary));
}
.mat-mdc-unelevated-button[disabled], .mat-mdc-unelevated-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-raised-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--mat-button-protected-container-elevation-shadow, var(--mat-sys-level1));
  height: var(--mat-button-protected-container-height, 40px);
  font-family: var(--mat-button-protected-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-protected-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-protected-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-protected-label-text-transform);
  font-weight: var(--mat-button-protected-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-protected-horizontal-padding, 24px);
}
.mat-mdc-raised-button > .mat-icon {
  margin-right: var(--mat-button-protected-icon-spacing, 8px);
  margin-left: var(--mat-button-protected-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-raised-button > .mat-icon {
  margin-right: var(--mat-button-protected-icon-offset, -8px);
  margin-left: var(--mat-button-protected-icon-spacing, 8px);
}
.mat-mdc-raised-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-protected-icon-offset, -8px);
  margin-left: var(--mat-button-protected-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-raised-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-protected-icon-spacing, 8px);
  margin-left: var(--mat-button-protected-icon-offset, -8px);
}
.mat-mdc-raised-button .mat-ripple-element {
  background-color: var(--mat-button-protected-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-protected-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-raised-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-protected-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-raised-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-raised-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-raised-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-raised-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-protected-touch-target-size, 48px);
  display: var(--mat-button-protected-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-raised-button:not(:disabled) {
  color: var(--mat-button-protected-label-text-color, var(--mat-sys-primary));
  background-color: var(--mat-button-protected-container-color, var(--mat-sys-surface));
}
.mat-mdc-raised-button, .mat-mdc-raised-button .mdc-button__ripple {
  border-radius: var(--mat-button-protected-container-shape, var(--mat-sys-corner-full));
}
@media (hover: hover) {
  .mat-mdc-raised-button:hover {
    box-shadow: var(--mat-button-protected-hover-container-elevation-shadow, var(--mat-sys-level2));
  }
}
.mat-mdc-raised-button:focus {
  box-shadow: var(--mat-button-protected-focus-container-elevation-shadow, var(--mat-sys-level1));
}
.mat-mdc-raised-button:active, .mat-mdc-raised-button:focus:active {
  box-shadow: var(--mat-button-protected-pressed-container-elevation-shadow, var(--mat-sys-level1));
}
.mat-mdc-raised-button[disabled], .mat-mdc-raised-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-protected-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-protected-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-raised-button[disabled].mat-mdc-button-disabled, .mat-mdc-raised-button.mat-mdc-button-disabled.mat-mdc-button-disabled {
  box-shadow: var(--mat-button-protected-disabled-container-elevation-shadow, var(--mat-sys-level0));
}
.mat-mdc-raised-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-outlined-button {
  border-style: solid;
  transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-outlined-container-height, 40px);
  font-family: var(--mat-button-outlined-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-outlined-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-outlined-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-outlined-label-text-transform);
  font-weight: var(--mat-button-outlined-label-text-weight, var(--mat-sys-label-large-weight));
  border-radius: var(--mat-button-outlined-container-shape, var(--mat-sys-corner-full));
  border-width: var(--mat-button-outlined-outline-width, 1px);
  padding: 0 var(--mat-button-outlined-horizontal-padding, 24px);
}
.mat-mdc-outlined-button > .mat-icon {
  margin-right: var(--mat-button-outlined-icon-spacing, 8px);
  margin-left: var(--mat-button-outlined-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-outlined-button > .mat-icon {
  margin-right: var(--mat-button-outlined-icon-offset, -8px);
  margin-left: var(--mat-button-outlined-icon-spacing, 8px);
}
.mat-mdc-outlined-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-outlined-icon-offset, -8px);
  margin-left: var(--mat-button-outlined-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-outlined-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-outlined-icon-spacing, 8px);
  margin-left: var(--mat-button-outlined-icon-offset, -8px);
}
.mat-mdc-outlined-button .mat-ripple-element {
  background-color: var(--mat-button-outlined-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-outlined-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-outlined-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-outlined-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-outlined-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-outlined-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-outlined-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-outlined-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-outlined-touch-target-size, 48px);
  display: var(--mat-button-outlined-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-outlined-button:not(:disabled) {
  color: var(--mat-button-outlined-label-text-color, var(--mat-sys-primary));
  border-color: var(--mat-button-outlined-outline-color, var(--mat-sys-outline));
}
.mat-mdc-outlined-button[disabled], .mat-mdc-outlined-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  border-color: var(--mat-button-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-outlined-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-tonal-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-tonal-container-height, 40px);
  font-family: var(--mat-button-tonal-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-tonal-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-tonal-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-tonal-label-text-transform);
  font-weight: var(--mat-button-tonal-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-tonal-horizontal-padding, 24px);
}
.mat-tonal-button:not(:disabled) {
  color: var(--mat-button-tonal-label-text-color, var(--mat-sys-on-secondary-container));
  background-color: var(--mat-button-tonal-container-color, var(--mat-sys-secondary-container));
}
.mat-tonal-button, .mat-tonal-button .mdc-button__ripple {
  border-radius: var(--mat-button-tonal-container-shape, var(--mat-sys-corner-full));
}
.mat-tonal-button[disabled], .mat-tonal-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-tonal-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-tonal-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-tonal-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-tonal-button > .mat-icon {
  margin-right: var(--mat-button-tonal-icon-spacing, 8px);
  margin-left: var(--mat-button-tonal-icon-offset, -8px);
}
[dir=rtl] .mat-tonal-button > .mat-icon {
  margin-right: var(--mat-button-tonal-icon-offset, -8px);
  margin-left: var(--mat-button-tonal-icon-spacing, 8px);
}
.mat-tonal-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-tonal-icon-offset, -8px);
  margin-left: var(--mat-button-tonal-icon-spacing, 8px);
}
[dir=rtl] .mat-tonal-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-tonal-icon-spacing, 8px);
  margin-left: var(--mat-button-tonal-icon-offset, -8px);
}
.mat-tonal-button .mat-ripple-element {
  background-color: var(--mat-button-tonal-ripple-color, color-mix(in srgb, var(--mat-sys-on-secondary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-tonal-state-layer-color, var(--mat-sys-on-secondary-container));
}
.mat-tonal-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-tonal-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-tonal-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-tonal-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-tonal-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-tonal-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-tonal-touch-target-size, 48px);
  display: var(--mat-button-tonal-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.mat-mdc-button,
.mat-mdc-unelevated-button,
.mat-mdc-raised-button,
.mat-mdc-outlined-button,
.mat-tonal-button {
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-button .mat-mdc-button-ripple,
.mat-mdc-button .mat-mdc-button-persistent-ripple,
.mat-mdc-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-unelevated-button .mat-mdc-button-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-raised-button .mat-mdc-button-ripple,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,
.mat-tonal-button .mat-mdc-button-ripple,
.mat-tonal-button .mat-mdc-button-persistent-ripple,
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-button .mat-mdc-button-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-ripple,
.mat-mdc-raised-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-tonal-button .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-button .mdc-button__label,
.mat-mdc-button .mat-icon,
.mat-mdc-unelevated-button .mdc-button__label,
.mat-mdc-unelevated-button .mat-icon,
.mat-mdc-raised-button .mdc-button__label,
.mat-mdc-raised-button .mat-icon,
.mat-mdc-outlined-button .mdc-button__label,
.mat-mdc-outlined-button .mat-icon,
.mat-tonal-button .mdc-button__label,
.mat-tonal-button .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-button .mat-focus-indicator,
.mat-mdc-unelevated-button .mat-focus-indicator,
.mat-mdc-raised-button .mat-focus-indicator,
.mat-mdc-outlined-button .mat-focus-indicator,
.mat-tonal-button .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
}
.mat-mdc-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-unelevated-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-raised-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-outlined-button:focus-visible > .mat-focus-indicator::before,
.mat-tonal-button:focus-visible > .mat-focus-indicator::before {
  content: "";
  border-radius: inherit;
}
.mat-mdc-button._mat-animation-noopable,
.mat-mdc-unelevated-button._mat-animation-noopable,
.mat-mdc-raised-button._mat-animation-noopable,
.mat-mdc-outlined-button._mat-animation-noopable,
.mat-tonal-button._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-button > .mat-icon,
.mat-mdc-unelevated-button > .mat-icon,
.mat-mdc-raised-button > .mat-icon,
.mat-mdc-outlined-button > .mat-icon,
.mat-tonal-button > .mat-icon {
  display: inline-block;
  position: relative;
  vertical-align: top;
  font-size: 1.125rem;
  height: 1.125rem;
  width: 1.125rem;
}

.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mdc-button__ripple {
  top: -1px;
  left: -1px;
  bottom: -1px;
  right: -1px;
}

.mat-mdc-unelevated-button .mat-focus-indicator::before,
.mat-tonal-button .mat-focus-indicator::before,
.mat-mdc-raised-button .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);
}

.mat-mdc-outlined-button .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 3px) * -1);
}

.mat-mdc-button-progress-indicator-container {
  position: absolute;
  inset-inline-start: 0;
  inset-block-start: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.mat-mdc-button-progress-indicator-shown mat-icon,
.mat-mdc-button-progress-indicator-shown [matButtonIcon],
.mat-mdc-button-progress-indicator-shown .mdc-button__label {
  visibility: hidden;
}
`,`@media (forced-colors: active) {
  .mat-mdc-button:not(.mdc-button--outlined),
  .mat-mdc-unelevated-button:not(.mdc-button--outlined),
  .mat-mdc-raised-button:not(.mdc-button--outlined),
  .mat-mdc-outlined-button:not(.mdc-button--outlined),
  .mat-mdc-button-base.mat-tonal-button,
  .mat-mdc-icon-button.mat-mdc-icon-button,
  .mat-mdc-outlined-button .mdc-button__ripple {
    outline: solid 1px;
  }
}
`],encapsulation:2})}return e})();function cP(e){return e.hasAttribute("mat-raised-button")?"elevated":e.hasAttribute("mat-stroked-button")?"outlined":e.hasAttribute("mat-flat-button")?"filled":e.hasAttribute("mat-button")?"text":null}function lP(e,n){if(e&1){let t=ao();_(0,"div",1)(1,"button",2),Ce("click",function(){Tn(t);let r=Ve();return Mn(r.action())}),C(2),b()()}if(e&2){let t=Ve();w(2),ae(" ",t.data.action," ")}}var dP=["label"];function uP(e,n){}var fP=Math.pow(2,31)-1,ra=class{_overlayRef;instance;containerInstance;_afterDismissed=new I;_afterOpened=new I;_onAction=new I;_durationTimeoutId;_dismissedByAction=!1;constructor(n,t){this._overlayRef=t,this.containerInstance=n,n._onExit.subscribe(()=>this._finishDismiss())}dismiss(){this._afterDismissed.closed||this.containerInstance.exit(),clearTimeout(this._durationTimeoutId)}dismissWithAction(){this._onAction.closed||(this._dismissedByAction=!0,this._onAction.next(),this._onAction.complete(),this.dismiss()),clearTimeout(this._durationTimeoutId)}closeWithAction(){this.dismissWithAction()}_dismissAfter(n){this._durationTimeoutId=setTimeout(()=>this.dismiss(),Math.min(n,fP))}_open(){this._afterOpened.closed||(this._afterOpened.next(),this._afterOpened.complete())}_finishDismiss(){this._overlayRef.dispose(),this._onAction.closed||this._onAction.complete(),this._afterDismissed.next({dismissedByAction:this._dismissedByAction}),this._afterDismissed.complete(),this._dismissedByAction=!1}afterDismissed(){return this._afterDismissed}afterOpened(){return this.containerInstance._onEnter}onAction(){return this._onAction}},aC=new g("MatSnackBarData"),No=class{politeness="polite";announcementMessage="";viewContainerRef;duration=0;panelClass;direction;data=null;horizontalPosition="center";verticalPosition="bottom"},hP=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275dir=H({type:e,selectors:[["","matSnackBarLabel",""]],hostAttrs:[1,"mat-mdc-snack-bar-label","mdc-snackbar__label"]})}return e})(),pP=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275dir=H({type:e,selectors:[["","matSnackBarActions",""]],hostAttrs:[1,"mat-mdc-snack-bar-actions","mdc-snackbar__actions"]})}return e})(),mP=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275dir=H({type:e,selectors:[["","matSnackBarAction",""]],hostAttrs:[1,"mat-mdc-snack-bar-action","mdc-snackbar__action"]})}return e})(),gP=(()=>{class e{snackBarRef=u(ra);data=u(aC);action(){this.snackBarRef.dismissWithAction()}get hasAction(){return!!this.data.action}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=Z({type:e,selectors:[["simple-snack-bar"]],hostAttrs:[1,"mat-mdc-simple-snack-bar"],exportAs:["matSnackBar"],decls:3,vars:2,consts:[["matSnackBarLabel",""],["matSnackBarActions",""],["matButton","","matSnackBarAction","",3,"click"]],template:function(i,r){i&1&&(_(0,"div",0),C(1),b(),et(2,lP,3,1,"div",1)),i&2&&(w(),ae(" ",r.data.message,`
`),w(),tt(r.hasAction?2:-1))},dependencies:[sC,hP,pP,mP],styles:[`.mat-mdc-simple-snack-bar {
  display: flex;
}
.mat-mdc-simple-snack-bar .mat-mdc-snack-bar-label {
  max-height: 50vh;
  overflow: auto;
}
`],encapsulation:2})}return e})(),Nm="_mat-snack-bar-enter",Om="_mat-snack-bar-exit",vP=(()=>{class e extends So{_ngZone=u(M);_elementRef=u(Y);_changeDetectorRef=u(Ie);_platform=u(Ae);_animationsDisabled=je();snackBarConfig=u(No);_document=u(O);_trackedModals=new Set;_enterFallback;_exitFallback;_injector=u(ne);_announceDelay=150;_announceTimeoutId;_destroyed=!1;_portalOutlet;_onAnnounce=new I;_onExit=new I;_onEnter=new I;_animationState="void";_live;_label;_role;_liveElementId=u(Ke).getId("mat-snack-bar-container-live-");constructor(){super();let t=this.snackBarConfig;t.politeness==="assertive"&&!t.announcementMessage?this._live="assertive":t.politeness==="off"?this._live="off":this._live="polite",this._platform.FIREFOX&&(this._live==="polite"&&(this._role="status"),this._live==="assertive"&&(this._role="alert"))}attachComponentPortal(t){this._assertNotAttached();let i=this._portalOutlet.attachComponentPortal(t);return this._afterPortalAttached(),i}attachTemplatePortal(t){this._assertNotAttached();let i=this._portalOutlet.attachTemplatePortal(t);return this._afterPortalAttached(),i}attachDomPortal=t=>{this._assertNotAttached();let i=this._portalOutlet.attachDomPortal(t);return this._afterPortalAttached(),i};onAnimationEnd(t){t===Om?this._completeExit():t===Nm&&(clearTimeout(this._enterFallback),this._ngZone.run(()=>{this._onEnter.next(),this._onEnter.complete()}))}enter(){this._destroyed||(this._animationState="visible",this._changeDetectorRef.markForCheck(),this._changeDetectorRef.detectChanges(),this._screenReaderAnnounce(),this._animationsDisabled?ze(()=>{this._ngZone.run(()=>queueMicrotask(()=>this.onAnimationEnd(Nm)))},{injector:this._injector}):(clearTimeout(this._enterFallback),this._enterFallback=setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-snack-bar-fallback-visible"),this.onAnimationEnd(Nm)},200)))}exit(){return this._destroyed?N(void 0):(this._ngZone.run(()=>{this._animationState="hidden",this._changeDetectorRef.markForCheck(),this._elementRef.nativeElement.setAttribute("mat-exit",""),clearTimeout(this._announceTimeoutId),this._animationsDisabled?ze(()=>{this._ngZone.run(()=>queueMicrotask(()=>this.onAnimationEnd(Om)))},{injector:this._injector}):(clearTimeout(this._exitFallback),this._exitFallback=setTimeout(()=>this.onAnimationEnd(Om),200))}),this._onExit)}ngOnDestroy(){this._destroyed=!0,this._clearFromModals(),this._completeExit()}_completeExit(){clearTimeout(this._exitFallback),queueMicrotask(()=>{this._onExit.next(),this._onExit.complete()})}_afterPortalAttached(){let t=this._elementRef.nativeElement,i=this.snackBarConfig.panelClass;i&&(Array.isArray(i)?i.forEach(s=>t.classList.add(s)):t.classList.add(i)),this._exposeToModals();let r=this._label.nativeElement,o="mdc-snackbar__label";r.classList.toggle(o,!r.querySelector(`.${o}`))}_exposeToModals(){let t=this._liveElementId,i=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let r=0;r<i.length;r++){let o=i[r],s=o.getAttribute("aria-owns");this._trackedModals.add(o),s?s.indexOf(t)===-1&&o.setAttribute("aria-owns",s+" "+t):o.setAttribute("aria-owns",t)}}_clearFromModals(){this._trackedModals.forEach(t=>{let i=t.getAttribute("aria-owns");if(i){let r=i.replace(this._liveElementId,"").trim();r.length>0?t.setAttribute("aria-owns",r):t.removeAttribute("aria-owns")}}),this._trackedModals.clear()}_assertNotAttached(){this._portalOutlet.hasAttached()}_screenReaderAnnounce(){this._announceTimeoutId||this._ngZone.runOutsideAngular(()=>{this._announceTimeoutId=setTimeout(()=>{if(this._destroyed)return;let t=this._elementRef.nativeElement,i=t.querySelector("[aria-hidden]"),r=t.querySelector("[aria-live]");if(i&&r){let o=null;this._platform.isBrowser&&document.activeElement instanceof HTMLElement&&i.contains(document.activeElement)&&(o=document.activeElement),i.removeAttribute("aria-hidden"),r.appendChild(i),o?.focus(),this._onAnnounce.next(),this._onAnnounce.complete()}},this._announceDelay)})}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=Z({type:e,selectors:[["mat-snack-bar-container"]],viewQuery:function(i,r){if(i&1&&nt(xi,7)(dP,7),i&2){let o;K(o=Q())&&(r._portalOutlet=o.first),K(o=Q())&&(r._label=o.first)}},hostAttrs:[1,"mdc-snackbar","mat-mdc-snack-bar-container"],hostVars:6,hostBindings:function(i,r){i&1&&Ce("animationend",function(s){return r.onAnimationEnd(s.animationName)})("animationcancel",function(s){return r.onAnimationEnd(s.animationName)}),i&2&&X("mat-snack-bar-container-enter",r._animationState==="visible")("mat-snack-bar-container-exit",r._animationState==="hidden")("mat-snack-bar-container-animations-enabled",!r._animationsDisabled)},features:[Oe],decls:6,vars:3,consts:[["label",""],[1,"mdc-snackbar__surface","mat-mdc-snackbar-surface"],[1,"mat-mdc-snack-bar-label"],["aria-hidden","true"],["cdkPortalOutlet",""]],template:function(i,r){i&1&&(_(0,"div",1)(1,"div",2,0)(3,"div",3),an(4,uP,0,0,"ng-template",4),b(),Me(5,"div"),b()()),i&2&&(w(5),ge("aria-live",r._live)("role",r._role)("id",r._liveElementId))},dependencies:[xi],styles:[`@keyframes _mat-snack-bar-enter {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes _mat-snack-bar-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-snack-bar-container {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  margin: 8px;
}
.mat-mdc-snack-bar-handset .mat-mdc-snack-bar-container {
  width: 100vw;
}

.mat-snack-bar-container-animations-enabled {
  opacity: 0;
}
.mat-snack-bar-container-animations-enabled.mat-snack-bar-fallback-visible {
  opacity: 1;
}
.mat-snack-bar-container-animations-enabled.mat-snack-bar-container-enter {
  animation: _mat-snack-bar-enter 150ms cubic-bezier(0, 0, 0.2, 1) forwards;
}
.mat-snack-bar-container-animations-enabled.mat-snack-bar-container-exit {
  animation: _mat-snack-bar-exit 75ms cubic-bezier(0.4, 0, 1, 1) forwards;
}

.mat-mdc-snackbar-surface {
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  padding-left: 0;
  padding-right: 8px;
}
[dir=rtl] .mat-mdc-snackbar-surface {
  padding-right: 0;
  padding-left: 8px;
}
.mat-mdc-snack-bar-container .mat-mdc-snackbar-surface {
  min-width: 344px;
  max-width: 672px;
}
.mat-mdc-snack-bar-handset .mat-mdc-snackbar-surface {
  width: 100%;
  min-width: 0;
}
@media (forced-colors: active) {
  .mat-mdc-snackbar-surface {
    outline: solid 1px;
  }
}
.mat-mdc-snack-bar-container .mat-mdc-snackbar-surface {
  color: var(--mat-snack-bar-supporting-text-color, var(--mat-sys-inverse-on-surface));
  border-radius: var(--mat-snack-bar-container-shape, var(--mat-sys-corner-extra-small));
  background-color: var(--mat-snack-bar-container-color, var(--mat-sys-inverse-surface));
}

.mdc-snackbar__label {
  width: 100%;
  flex-grow: 1;
  box-sizing: border-box;
  margin: 0;
  padding: 14px 8px 14px 16px;
}
[dir=rtl] .mdc-snackbar__label {
  padding-left: 8px;
  padding-right: 16px;
}
.mat-mdc-snack-bar-container .mdc-snackbar__label {
  font-family: var(--mat-snack-bar-supporting-text-font, var(--mat-sys-body-medium-font));
  font-size: var(--mat-snack-bar-supporting-text-size, var(--mat-sys-body-medium-size));
  font-weight: var(--mat-snack-bar-supporting-text-weight, var(--mat-sys-body-medium-weight));
  line-height: var(--mat-snack-bar-supporting-text-line-height, var(--mat-sys-body-medium-line-height));
}

.mat-mdc-snack-bar-actions {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  box-sizing: border-box;
}

.mat-mdc-snack-bar-handset,
.mat-mdc-snack-bar-container,
.mat-mdc-snack-bar-label {
  flex: 1 1 auto;
}

.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled).mat-unthemed {
  color: var(--mat-snack-bar-button-color, var(--mat-sys-inverse-primary));
}
.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) {
  --mat-button-text-state-layer-color: currentColor;
  --mat-button-text-ripple-color: currentColor;
}
.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) .mat-ripple-element {
  opacity: 0.1;
}
`],encapsulation:2,changeDetection:1})}return e})(),bP=new g("mat-snack-bar-default-options",{providedIn:"root",factory:()=>new No}),cC=(()=>{class e{_live=u(mm);_injector=u(ne);_breakpointObserver=u(pm);_parentSnackBar=u(e,{optional:!0,skipSelf:!0});_defaultConfig=u(bP);_animationsDisabled=je();_snackBarRefAtThisLevel=null;simpleSnackBarComponent=gP;snackBarContainerComponent=vP;handsetCssClass="mat-mdc-snack-bar-handset";get _openedSnackBarRef(){let t=this._parentSnackBar;return t?t._openedSnackBarRef:this._snackBarRefAtThisLevel}set _openedSnackBarRef(t){this._parentSnackBar?this._parentSnackBar._openedSnackBarRef=t:this._snackBarRefAtThisLevel=t}openFromComponent(t,i){return this._attach(t,i)}openFromTemplate(t,i){return this._attach(t,i)}open(t,i="",r){let o=v(v({},this._defaultConfig),r);return o.data={message:t,action:i},o.announcementMessage===t&&(o.announcementMessage=void 0),this.openFromComponent(this.simpleSnackBarComponent,o)}dismiss(){this._openedSnackBarRef&&this._openedSnackBarRef.dismiss()}ngOnDestroy(){this._snackBarRefAtThisLevel&&this._snackBarRefAtThisLevel.dismiss()}_attachSnackBarContainer(t,i){let r=i&&i.viewContainerRef&&i.viewContainerRef.injector,o=ne.create({parent:r||this._injector,providers:[{provide:No,useValue:i}]}),s=new Io(this.snackBarContainerComponent,i.viewContainerRef,o),a=t.attach(s);return a.instance.snackBarConfig=i,a.instance}_attach(t,i){let r=v(v(v({},new No),this._defaultConfig),i),o=this._createOverlay(r),s=this._attachSnackBarContainer(o,r),a=new ra(s,o);if(t instanceof He){let c=new pn(t,null,{$implicit:r.data,snackBarRef:a});a.instance=s.attachTemplatePortal(c)}else{let c=this._createInjector(r,a),l=new Io(t,void 0,c),d=s.attachComponentPortal(l);a.instance=d.instance}return this._breakpointObserver.observe(ND.HandsetPortrait).pipe(Be(o.detachments())).subscribe(c=>{o.overlayElement.classList.toggle(this.handsetCssClass,c.matches)}),r.announcementMessage&&s._onAnnounce.subscribe(()=>{this._live.announce(r.announcementMessage,r.politeness)}),this._animateSnackBar(a,r),this._openedSnackBarRef=a,this._openedSnackBarRef}_animateSnackBar(t,i){t.afterDismissed().subscribe(()=>{this._openedSnackBarRef==t&&(this._openedSnackBarRef=null),i.announcementMessage&&this._live.clear()}),i.duration&&i.duration>0&&t.afterOpened().subscribe(()=>t._dismissAfter(i.duration)),this._openedSnackBarRef?(this._openedSnackBarRef.afterDismissed().subscribe(()=>{t.containerInstance.enter()}),this._openedSnackBarRef.dismiss()):t.containerInstance.enter()}_createOverlay(t){let i=new ko;i.direction=t.direction;let r=Mm(this._injector),o=t.direction==="rtl",s=t.horizontalPosition==="left"||t.horizontalPosition==="start"&&!o||t.horizontalPosition==="end"&&o,a=!s&&t.horizontalPosition!=="center";return s?r.left("0"):a?r.right("0"):r.centerHorizontally(),t.verticalPosition==="top"?r.top("0"):r.bottom("0"),i.positionStrategy=r,i.disableAnimations=this._animationsDisabled,Am(this._injector,i)}_createInjector(t,i){let r=t&&t.viewContainerRef&&t.viewContainerRef.injector;return ne.create({parent:r||this._injector,providers:[{provide:ra,useValue:i},{provide:aC,useValue:t.data}]})}static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:e.\u0275fac})}return e})();var Oo=class e{httpClient=u(_p);serverList(){return this.httpClient.get("http://dojb129d:26900/api")}serverStatus(n){return this.httpClient.get("http://dojb129d:26900/api/server/"+n)}startServer(n){return this.httpClient.get("http://dojb129d:26900/api/server/"+n+"/start")}stopServer(n){return this.httpClient.get("http://dojb129d:26900/api/server/"+n+"/shutdown")}datasources(n){return this.httpClient.get("http://dojb129d:26900/api/server/"+n+"/datasources")}deployments(n){return this.httpClient.get("http://dojb129d:26900/api/server/"+n+"/deployments")}jndiBindings(n){return this.httpClient.get("http://dojb129d:26900/api/server/"+n+"/jndi-bindings")}static \u0275fac=function(t){return new(t||e)};static \u0275prov=x({token:e,factory:e.\u0275fac})};var yP=["*"];var _P=new g("MAT_CARD_CONFIG"),lC=(()=>{class e{appearance;constructor(){let t=u(_P,{optional:!0});this.appearance=t?.appearance||"raised"}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=Z({type:e,selectors:[["mat-card"]],hostAttrs:[1,"mat-mdc-card","mdc-card"],hostVars:8,hostBindings:function(i,r){i&2&&X("mat-mdc-card-outlined",r.appearance==="outlined")("mdc-card--outlined",r.appearance==="outlined")("mat-mdc-card-filled",r.appearance==="filled")("mdc-card--filled",r.appearance==="filled")},inputs:{appearance:"appearance"},exportAs:["matCard"],ngContentSelectors:yP,decls:1,vars:0,template:function(i,r){i&1&&(Fe(),he(0))},styles:[`.mat-mdc-card {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  border-style: solid;
  border-width: 0;
  background-color: var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));
  border-color: var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));
  border-radius: var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));
  box-shadow: var(--mat-card-elevated-container-elevation, var(--mat-sys-level1));
}
.mat-mdc-card::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: solid 1px transparent;
  content: "";
  display: block;
  pointer-events: none;
  box-sizing: border-box;
  border-radius: var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));
}

.mat-mdc-card-outlined {
  background-color: var(--mat-card-outlined-container-color, var(--mat-sys-surface));
  border-radius: var(--mat-card-outlined-container-shape, var(--mat-sys-corner-medium));
  border-width: var(--mat-card-outlined-outline-width, 1px);
  border-color: var(--mat-card-outlined-outline-color, var(--mat-sys-outline-variant));
  box-shadow: var(--mat-card-outlined-container-elevation, var(--mat-sys-level0));
}
.mat-mdc-card-outlined::after {
  border: none;
}

.mat-mdc-card-filled {
  background-color: var(--mat-card-filled-container-color, var(--mat-sys-surface-container-highest));
  border-radius: var(--mat-card-filled-container-shape, var(--mat-sys-corner-medium));
  box-shadow: var(--mat-card-filled-container-elevation, var(--mat-sys-level0));
}

.mdc-card__media {
  position: relative;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.mdc-card__media::before {
  display: block;
  content: "";
}
.mdc-card__media:first-child {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}
.mdc-card__media:last-child {
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
}

.mat-mdc-card-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  min-height: 52px;
  padding: 8px;
}

.mat-mdc-card-title {
  font-family: var(--mat-card-title-text-font, var(--mat-sys-title-large-font));
  line-height: var(--mat-card-title-text-line-height, var(--mat-sys-title-large-line-height));
  font-size: var(--mat-card-title-text-size, var(--mat-sys-title-large-size));
  letter-spacing: var(--mat-card-title-text-tracking, var(--mat-sys-title-large-tracking));
  font-weight: var(--mat-card-title-text-weight, var(--mat-sys-title-large-weight));
}

.mat-mdc-card-subtitle {
  color: var(--mat-card-subtitle-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-card-subtitle-text-font, var(--mat-sys-title-medium-font));
  line-height: var(--mat-card-subtitle-text-line-height, var(--mat-sys-title-medium-line-height));
  font-size: var(--mat-card-subtitle-text-size, var(--mat-sys-title-medium-size));
  letter-spacing: var(--mat-card-subtitle-text-tracking, var(--mat-sys-title-medium-tracking));
  font-weight: var(--mat-card-subtitle-text-weight, var(--mat-sys-title-medium-weight));
}

.mat-mdc-card-title,
.mat-mdc-card-subtitle {
  display: block;
  margin: 0;
}
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-title,
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-subtitle {
  padding: 16px 16px 0;
}

.mat-mdc-card-header {
  display: flex;
  padding: 16px 16px 0;
}

.mat-mdc-card-content {
  display: block;
  padding: 0 16px;
}
.mat-mdc-card-content:first-child {
  padding-top: 16px;
}
.mat-mdc-card-content:last-child {
  padding-bottom: 16px;
}

.mat-mdc-card-title-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.mat-mdc-card-avatar {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-bottom: 16px;
  object-fit: cover;
}
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-subtitle,
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-title {
  line-height: normal;
}

.mat-mdc-card-sm-image {
  width: 80px;
  height: 80px;
}

.mat-mdc-card-md-image {
  width: 112px;
  height: 112px;
}

.mat-mdc-card-lg-image {
  width: 152px;
  height: 152px;
}

.mat-mdc-card-xl-image {
  width: 240px;
  height: 240px;
}

.mat-mdc-card-subtitle ~ .mat-mdc-card-title,
.mat-mdc-card-title ~ .mat-mdc-card-subtitle,
.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-title,
.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-subtitle,
.mat-mdc-card-title-group .mat-mdc-card-title,
.mat-mdc-card-title-group .mat-mdc-card-subtitle {
  padding-top: 0;
}

.mat-mdc-card-content > :last-child:not(.mat-mdc-card-footer) {
  margin-bottom: 0;
}

.mat-mdc-card-actions-align-end {
  justify-content: flex-end;
}
`],encapsulation:2})}return e})();var dC=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275dir=H({type:e,selectors:[["mat-card-content"]],hostAttrs:[1,"mat-mdc-card-content"]})}return e})();var uC=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=me({type:e});static \u0275inj=fe({imports:[zt]})}return e})();var fC=new g("");var hC=new g("");var EP=["*"],pC=(()=>{class e{labelPosition="after";static \u0275fac=function(i){return new(i||e)};static \u0275cmp=Z({type:e,selectors:[["div","mat-internal-form-field",""]],hostAttrs:[1,"mdc-form-field","mat-internal-form-field"],hostVars:2,hostBindings:function(i,r){i&2&&X("mdc-form-field--align-end",r.labelPosition==="before")},inputs:{labelPosition:"labelPosition"},ngContentSelectors:EP,decls:1,vars:0,template:function(i,r){i&1&&(Fe(),he(0))},styles:[`.mat-internal-form-field {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
}
.mat-internal-form-field > label {
  margin-left: 0;
  margin-right: auto;
  padding-left: 4px;
  padding-right: 0;
  order: 0;
}
[dir=rtl] .mat-internal-form-field > label {
  margin-left: auto;
  margin-right: 0;
  padding-left: 0;
  padding-right: 4px;
}

.mdc-form-field--align-end > label {
  margin-left: auto;
  margin-right: 0;
  padding-left: 0;
  padding-right: 4px;
  order: -1;
}
[dir=rtl] .mdc-form-field--align-end .mdc-form-field--align-end label {
  margin-left: 0;
  margin-right: auto;
  padding-left: 4px;
  padding-right: 0;
}
`],encapsulation:2})}return e})();var DP=["switch"],CP=["*"];function IP(e,n){e&1&&(_(0,"span",11),Yi(),_(1,"svg",13),Me(2,"path",14),b(),_(3,"svg",15),Me(4,"path",16),b()())}var SP=new g("mat-slide-toggle-default-options",{providedIn:"root",factory:()=>({disableToggleValue:!1,hideIcon:!1,disabledInteractive:!1})}),fd=class{source;checked;constructor(n,t){this.source=n,this.checked=t}},Pm=(()=>{class e{_elementRef=u(Y);_focusMonitor=u(gn);_changeDetectorRef=u(Ie);defaults=u(SP);_onChange=t=>{};_onTouched=()=>{};_validatorOnChange=()=>{};_uniqueId;_checked=!1;_createChangeEvent(t){return new fd(this,t)}_labelId;get buttonId(){return`${this.id||this._uniqueId}-button`}_switchElement;focus(){this._switchElement.nativeElement.focus()}_noopAnimations=je();_focused=!1;name=null;id;labelPosition="after";ariaLabel=null;ariaLabelledby=null;ariaDescribedby;required=!1;color;disabled=!1;disableRipple=!1;tabIndex=0;get checked(){return this._checked}set checked(t){this._checked=t,this._changeDetectorRef.markForCheck()}hideIcon;disabledInteractive;change=new k;toggleChange=new k;get inputId(){return`${this.id||this._uniqueId}-input`}constructor(){u(Ze).load(mn);let t=u(new Ei("tabindex"),{optional:!0}),i=this.defaults;this.tabIndex=t==null?0:parseInt(t)||0,this.color=i.color||"accent",this.id=this._uniqueId=u(Ke).getId("mat-mdc-slide-toggle-"),this.hideIcon=i.hideIcon??!1,this.disabledInteractive=i.disabledInteractive??!1,this._labelId=this._uniqueId+"-label"}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(t=>{t==="keyboard"||t==="program"?(this._focused=!0,this._changeDetectorRef.markForCheck()):t||Promise.resolve().then(()=>{this._focused=!1,this._onTouched(),this._changeDetectorRef.markForCheck()})})}ngOnChanges(t){t.required&&this._validatorOnChange()}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}writeValue(t){this.checked=!!t}registerOnChange(t){this._onChange=t}registerOnTouched(t){this._onTouched=t}validate(t){return this.required&&t.value!==!0?{required:!0}:null}registerOnValidatorChange(t){this._validatorOnChange=t}setDisabledState(t){this.disabled=t,this._changeDetectorRef.markForCheck()}toggle(){this.checked=!this.checked,this._onChange(this.checked)}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(this._createChangeEvent(this.checked))}_handleClick(){this.disabled||(this.toggleChange.emit(),this.defaults.disableToggleValue||(this.checked=!this.checked,this._onChange(this.checked),this.change.emit(new fd(this,this.checked))))}_getAriaLabelledBy(){return this.ariaLabelledby?this.ariaLabelledby:this.ariaLabel?null:this._labelId}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=Z({type:e,selectors:[["mat-slide-toggle"]],viewQuery:function(i,r){if(i&1&&nt(DP,5),i&2){let o;K(o=Q())&&(r._switchElement=o.first)}},hostAttrs:[1,"mat-mdc-slide-toggle"],hostVars:13,hostBindings:function(i,r){i&2&&(co("id",r.id),ge("tabindex",null)("aria-label",null)("name",null)("aria-labelledby",null),Nt(r.color?"mat-"+r.color:""),X("mat-mdc-slide-toggle-focused",r._focused)("mat-mdc-slide-toggle-checked",r.checked)("_mat-animation-noopable",r._noopAnimations))},inputs:{name:"name",id:"id",labelPosition:"labelPosition",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],required:[2,"required","required",j],color:"color",disabled:[2,"disabled","disabled",j],disableRipple:[2,"disableRipple","disableRipple",j],tabIndex:[2,"tabIndex","tabIndex",t=>t==null?0:Ut(t)],checked:[2,"checked","checked",j],hideIcon:[2,"hideIcon","hideIcon",j],disabledInteractive:[2,"disabledInteractive","disabledInteractive",j]},outputs:{change:"change",toggleChange:"toggleChange"},exportAs:["matSlideToggle"],features:[rt([{provide:fC,useExisting:Gn(()=>e),multi:!0},{provide:hC,useExisting:e,multi:!0}]),ft],ngContentSelectors:CP,decls:14,vars:27,consts:[["switch",""],["mat-internal-form-field","",3,"labelPosition"],["role","switch","type","button",1,"mdc-switch",3,"click","tabIndex","disabled"],[1,"mat-mdc-slide-toggle-touch-target"],[1,"mdc-switch__track"],[1,"mdc-switch__handle-track"],[1,"mdc-switch__handle"],[1,"mdc-switch__shadow"],[1,"mdc-elevation-overlay"],[1,"mdc-switch__ripple"],["mat-ripple","",1,"mat-mdc-slide-toggle-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-switch__icons"],[1,"mdc-label",3,"click","for"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--on"],["d","M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--off"],["d","M20 13H4v-2h16v2z"]],template:function(i,r){if(i&1&&(Fe(),_(0,"div",1)(1,"button",2,0),Ce("click",function(){return r._handleClick()}),Me(3,"div",3)(4,"span",4),_(5,"span",5)(6,"span",6)(7,"span",7),Me(8,"span",8),b(),_(9,"span",9),Me(10,"span",10),b(),et(11,IP,5,0,"span",11),b()()(),_(12,"label",12),Ce("click",function(s){return s.stopPropagation()}),he(13),b()()),i&2){let o=lo(2);_e("labelPosition",r.labelPosition),w(),X("mdc-switch--selected",r.checked)("mdc-switch--unselected",!r.checked)("mdc-switch--checked",r.checked)("mdc-switch--disabled",r.disabled)("mat-mdc-slide-toggle-disabled-interactive",r.disabledInteractive),_e("tabIndex",r.disabled&&!r.disabledInteractive?-1:r.tabIndex)("disabled",r.disabled&&!r.disabledInteractive),ge("id",r.buttonId)("name",r.name)("aria-label",r.ariaLabel)("aria-labelledby",r._getAriaLabelledBy())("aria-describedby",r.ariaDescribedby)("aria-required",r.required||null)("aria-checked",r.checked)("aria-disabled",r.disabled&&r.disabledInteractive?"true":null),w(9),_e("matRippleTrigger",o)("matRippleDisabled",r.disableRipple||r.disabled)("matRippleCentered",!0),w(),tt(r.hideIcon?-1:11),w(),_e("for",r.buttonId),ge("id",r._labelId)}},dependencies:[ia,pC],styles:[`.mdc-switch {
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  margin: 0;
  outline: none;
  overflow: visible;
  padding: 0;
  position: relative;
  width: var(--mat-slide-toggle-track-width, 52px);
}
.mdc-switch.mdc-switch--disabled {
  cursor: default;
  pointer-events: none;
}
.mdc-switch.mat-mdc-slide-toggle-disabled-interactive {
  pointer-events: auto;
}

.mdc-switch__track {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: var(--mat-slide-toggle-track-height, 32px);
  border-radius: var(--mat-slide-toggle-track-shape, var(--mat-sys-corner-full));
}
.mdc-switch--disabled.mdc-switch .mdc-switch__track {
  opacity: var(--mat-slide-toggle-disabled-track-opacity, 0.12);
}
.mdc-switch__track::before, .mdc-switch__track::after {
  border: 1px solid transparent;
  border-radius: inherit;
  box-sizing: border-box;
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  width: 100%;
  border-width: var(--mat-slide-toggle-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-track-outline-color, var(--mat-sys-outline));
}
.mdc-switch--selected .mdc-switch__track::before, .mdc-switch--selected .mdc-switch__track::after {
  border-width: var(--mat-slide-toggle-selected-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-selected-track-outline-color, transparent);
}
.mdc-switch--disabled .mdc-switch__track::before, .mdc-switch--disabled .mdc-switch__track::after {
  border-width: var(--mat-slide-toggle-disabled-unselected-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-disabled-unselected-track-outline-color, var(--mat-sys-on-surface));
}
@media (forced-colors: active) {
  .mdc-switch__track {
    border-color: currentColor;
  }
}
.mdc-switch__track::before {
  transition: transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: translateX(0);
  background: var(--mat-slide-toggle-unselected-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch--selected .mdc-switch__track::before {
  transition: transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  transform: translateX(100%);
}
[dir=rtl] .mdc-switch--selected .mdc-switch--selected .mdc-switch__track::before {
  transform: translateX(-100%);
}
.mdc-switch--selected .mdc-switch__track::before {
  opacity: var(--mat-slide-toggle-hidden-track-opacity, 0);
  transition: var(--mat-slide-toggle-hidden-track-transition, opacity 75ms);
}
.mdc-switch--unselected .mdc-switch__track::before {
  opacity: var(--mat-slide-toggle-visible-track-opacity, 1);
  transition: var(--mat-slide-toggle-visible-track-transition, opacity 75ms);
}
.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-hover-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-focus-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch:enabled:active .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-pressed-track-color, var(--mat-sys-surface-variant));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::before, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::before, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::before, .mdc-switch.mdc-switch--disabled .mdc-switch__track::before {
  background: var(--mat-slide-toggle-disabled-unselected-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch__track::after {
  transform: translateX(-100%);
  background: var(--mat-slide-toggle-selected-track-color, var(--mat-sys-primary));
}
[dir=rtl] .mdc-switch__track::after {
  transform: translateX(100%);
}
.mdc-switch--selected .mdc-switch__track::after {
  transform: translateX(0);
}
.mdc-switch--selected .mdc-switch__track::after {
  opacity: var(--mat-slide-toggle-visible-track-opacity, 1);
  transition: var(--mat-slide-toggle-visible-track-transition, opacity 75ms);
}
.mdc-switch--unselected .mdc-switch__track::after {
  opacity: var(--mat-slide-toggle-hidden-track-opacity, 0);
  transition: var(--mat-slide-toggle-hidden-track-transition, opacity 75ms);
}
.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-hover-track-color, var(--mat-sys-primary));
}
.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-focus-track-color, var(--mat-sys-primary));
}
.mdc-switch:enabled:active .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-pressed-track-color, var(--mat-sys-primary));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::after, .mdc-switch.mdc-switch--disabled .mdc-switch__track::after {
  background: var(--mat-slide-toggle-disabled-selected-track-color, var(--mat-sys-on-surface));
}

.mdc-switch__handle-track {
  height: 100%;
  pointer-events: none;
  position: absolute;
  top: 0;
  transition: transform 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  left: 0;
  right: auto;
  transform: translateX(0);
  width: calc(100% - var(--mat-slide-toggle-handle-width));
}
[dir=rtl] .mdc-switch__handle-track {
  left: auto;
  right: 0;
}
.mdc-switch--selected .mdc-switch__handle-track {
  transform: translateX(100%);
}
[dir=rtl] .mdc-switch--selected .mdc-switch__handle-track {
  transform: translateX(-100%);
}

.mdc-switch__handle {
  display: flex;
  pointer-events: auto;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: auto;
  transition: width 75ms cubic-bezier(0.4, 0, 0.2, 1), height 75ms cubic-bezier(0.4, 0, 0.2, 1), margin 75ms cubic-bezier(0.4, 0, 0.2, 1);
  width: var(--mat-slide-toggle-handle-width);
  height: var(--mat-slide-toggle-handle-height);
  border-radius: var(--mat-slide-toggle-handle-shape, var(--mat-sys-corner-full));
}
[dir=rtl] .mdc-switch__handle {
  left: auto;
  right: 0;
}
.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle {
  width: var(--mat-slide-toggle-unselected-handle-size, 16px);
  height: var(--mat-slide-toggle-unselected-handle-size, 16px);
  margin: var(--mat-slide-toggle-unselected-handle-horizontal-margin, 0 8px);
}
.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle:has(.mdc-switch__icons) {
  margin: var(--mat-slide-toggle-unselected-with-icon-handle-horizontal-margin, 0 4px);
}
.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle {
  width: var(--mat-slide-toggle-selected-handle-size, 24px);
  height: var(--mat-slide-toggle-selected-handle-size, 24px);
  margin: var(--mat-slide-toggle-selected-handle-horizontal-margin, 0 24px);
}
.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle:has(.mdc-switch__icons) {
  margin: var(--mat-slide-toggle-selected-with-icon-handle-horizontal-margin, 0 24px);
}
.mat-mdc-slide-toggle .mdc-switch__handle:has(.mdc-switch__icons) {
  width: var(--mat-slide-toggle-with-icon-handle-size, 24px);
  height: var(--mat-slide-toggle-with-icon-handle-size, 24px);
}
.mat-mdc-slide-toggle .mdc-switch:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  width: var(--mat-slide-toggle-pressed-handle-size, 28px);
  height: var(--mat-slide-toggle-pressed-handle-size, 28px);
}
.mat-mdc-slide-toggle .mdc-switch--selected:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  margin: var(--mat-slide-toggle-selected-pressed-handle-horizontal-margin, 0 22px);
}
.mat-mdc-slide-toggle .mdc-switch--unselected:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  margin: var(--mat-slide-toggle-unselected-pressed-handle-horizontal-margin, 0 2px);
}
.mdc-switch--disabled.mdc-switch--selected .mdc-switch__handle::after {
  opacity: var(--mat-slide-toggle-disabled-selected-handle-opacity, 1);
}
.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__handle::after {
  opacity: var(--mat-slide-toggle-disabled-unselected-handle-opacity, 0.38);
}
.mdc-switch__handle::before, .mdc-switch__handle::after {
  border: 1px solid transparent;
  border-radius: inherit;
  box-sizing: border-box;
  content: "";
  width: 100%;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transition: background-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1), border-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}
@media (forced-colors: active) {
  .mdc-switch__handle::before, .mdc-switch__handle::after {
    border-color: currentColor;
  }
}
.mdc-switch--selected:enabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-handle-color, var(--mat-sys-on-primary));
}
.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-hover-handle-color, var(--mat-sys-primary-container));
}
.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-focus-handle-color, var(--mat-sys-primary-container));
}
.mdc-switch--selected:enabled:active .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-pressed-handle-color, var(--mat-sys-primary-container));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:hover:not(:focus):not(:active) .mdc-switch__handle::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:focus:not(:active) .mdc-switch__handle::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:active .mdc-switch__handle::after, .mdc-switch--selected.mdc-switch--disabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-disabled-selected-handle-color, var(--mat-sys-surface));
}
.mdc-switch--unselected:enabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-handle-color, var(--mat-sys-outline));
}
.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-hover-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-focus-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected:enabled:active .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-pressed-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-disabled-unselected-handle-color, var(--mat-sys-on-surface));
}
.mdc-switch__handle::before {
  background: var(--mat-slide-toggle-handle-surface-color);
}

.mdc-switch__shadow {
  border-radius: inherit;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
.mdc-switch:enabled .mdc-switch__shadow {
  box-shadow: var(--mat-slide-toggle-handle-elevation-shadow);
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__shadow, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__shadow, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__shadow, .mdc-switch.mdc-switch--disabled .mdc-switch__shadow {
  box-shadow: var(--mat-slide-toggle-disabled-handle-elevation-shadow);
}

.mdc-switch__ripple {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  width: var(--mat-slide-toggle-state-layer-size, 40px);
  height: var(--mat-slide-toggle-state-layer-size, 40px);
}
.mdc-switch__ripple::after {
  content: "";
  opacity: 0;
}
.mdc-switch--disabled .mdc-switch__ripple::after {
  display: none;
}
.mat-mdc-slide-toggle-disabled-interactive .mdc-switch__ripple::after {
  display: block;
}
.mdc-switch:hover .mdc-switch__ripple::after {
  transition: 75ms opacity cubic-bezier(0, 0, 0.2, 1);
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:focus .mdc-switch__ripple::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:active .mdc-switch__ripple::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:hover:not(:focus) .mdc-switch__ripple::after, .mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-focus-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mdc-switch--unselected:enabled:active .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-pressed-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  transition: opacity 75ms linear;
}
.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-hover-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mdc-switch--selected:enabled:focus .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-focus-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mdc-switch--selected:enabled:active .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-pressed-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  transition: opacity 75ms linear;
}

.mdc-switch__icons {
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 1;
  transform: translateZ(0);
}
.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__icons {
  opacity: var(--mat-slide-toggle-disabled-unselected-icon-opacity, 0.38);
}
.mdc-switch--disabled.mdc-switch--selected .mdc-switch__icons {
  opacity: var(--mat-slide-toggle-disabled-selected-icon-opacity, 0.38);
}

.mdc-switch__icon {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  transition: opacity 30ms 0ms cubic-bezier(0.4, 0, 1, 1);
}
.mdc-switch--unselected .mdc-switch__icon {
  width: var(--mat-slide-toggle-unselected-icon-size, 16px);
  height: var(--mat-slide-toggle-unselected-icon-size, 16px);
  fill: var(--mat-slide-toggle-unselected-icon-color, var(--mat-sys-surface-variant));
}
.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__icon {
  fill: var(--mat-slide-toggle-disabled-unselected-icon-color, var(--mat-sys-surface-variant));
}
.mdc-switch--selected .mdc-switch__icon {
  width: var(--mat-slide-toggle-selected-icon-size, 16px);
  height: var(--mat-slide-toggle-selected-icon-size, 16px);
  fill: var(--mat-slide-toggle-selected-icon-color, var(--mat-sys-on-primary-container));
}
.mdc-switch--selected.mdc-switch--disabled .mdc-switch__icon {
  fill: var(--mat-slide-toggle-disabled-selected-icon-color, var(--mat-sys-on-surface));
}

.mdc-switch--selected .mdc-switch__icon--on,
.mdc-switch--unselected .mdc-switch__icon--off {
  opacity: 1;
  transition: opacity 45ms 30ms cubic-bezier(0, 0, 0.2, 1);
}

.mat-mdc-slide-toggle {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  -webkit-tap-highlight-color: transparent;
  outline: 0;
}
.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,
.mat-mdc-slide-toggle .mdc-switch__ripple::after {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),
.mat-mdc-slide-toggle .mdc-switch__ripple::after:not(:empty) {
  transform: translateZ(0);
}
.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mat-focus-indicator::before {
  content: "";
}
.mat-mdc-slide-toggle .mat-internal-form-field {
  color: var(--mat-slide-toggle-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-slide-toggle-label-text-font, var(--mat-sys-body-medium-font));
  line-height: var(--mat-slide-toggle-label-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-slide-toggle-label-text-size, var(--mat-sys-body-medium-size));
  letter-spacing: var(--mat-slide-toggle-label-text-tracking, var(--mat-sys-body-medium-tracking));
  font-weight: var(--mat-slide-toggle-label-text-weight, var(--mat-sys-body-medium-weight));
}
.mat-mdc-slide-toggle .mat-ripple-element {
  opacity: 0.12;
}
.mat-mdc-slide-toggle .mat-focus-indicator::before {
  border-radius: 50%;
}
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle-track,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__icon,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::before,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::after,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::before,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::after {
  transition: none;
}
.mat-mdc-slide-toggle .mdc-switch:enabled + .mdc-label {
  cursor: pointer;
}
.mat-mdc-slide-toggle .mdc-switch--disabled + label {
  color: var(--mat-slide-toggle-disabled-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-slide-toggle label:empty {
  display: none;
}

.mat-mdc-slide-toggle-touch-target {
  position: absolute;
  top: 50%;
  left: 50%;
  height: var(--mat-slide-toggle-touch-target-size, 48px);
  width: 100%;
  transform: translate(-50%, -50%);
  display: var(--mat-slide-toggle-touch-target-display, block);
}
[dir=rtl] .mat-mdc-slide-toggle-touch-target {
  left: auto;
  right: 50%;
  transform: translate(50%, -50%);
}
`],encapsulation:2})}return e})(),mC=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=me({type:e});static \u0275inj=fe({imports:[Pm,zt]})}return e})();var oa=(()=>{class e{_listeners=[];notify(t,i){for(let r of this._listeners)r(t,i)}listen(t){return this._listeners.push(t),()=>{this._listeners=this._listeners.filter(i=>t!==i)}}ngOnDestroy(){this._listeners=[]}static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:e.\u0275fac})}return e})();var gC=new g("CdkAccordion");var vC=(()=>{class e{accordion=u(gC,{optional:!0,skipSelf:!0});_changeDetectorRef=u(Ie);_expansionDispatcher=u(oa);_openCloseAllSubscription=ee.EMPTY;closed=new k;opened=new k;destroyed=new k;expandedChange=new k;id=u(Ke).getId("cdk-accordion-child-");get expanded(){return this._expanded}set expanded(t){if(this._expanded!==t){if(this._expanded=t,this.expandedChange.emit(t),t){this.opened.emit();let i=this.accordion?this.accordion.id:this.id;this._expansionDispatcher.notify(this.id,i)}else this.closed.emit();this._changeDetectorRef.markForCheck()}}_expanded=!1;get disabled(){return this._disabled()}set disabled(t){this._disabled.set(t)}_disabled=ke(!1);_removeUniqueSelectionListener=()=>{};ngOnInit(){this._removeUniqueSelectionListener=this._expansionDispatcher.listen((t,i)=>{this.accordion&&!this.accordion.multi&&this.accordion.id===i&&this.id!==t&&(this.expanded=!1)}),this.accordion&&(this._openCloseAllSubscription=this._subscribeToOpenCloseAllActions())}ngOnDestroy(){this.opened.complete(),this.closed.complete(),this.destroyed.emit(),this.destroyed.complete(),this._removeUniqueSelectionListener(),this._openCloseAllSubscription.unsubscribe()}toggle(){this.disabled||(this.expanded=!this.expanded)}close(){this.disabled||(this.expanded=!1)}open(){this.disabled||(this.expanded=!0)}_subscribeToOpenCloseAllActions(){return this.accordion._openCloseAllActions.subscribe(t=>{this.disabled||(this.expanded=t)})}static \u0275fac=function(i){return new(i||e)};static \u0275dir=H({type:e,selectors:[["cdk-accordion-item"],["","cdkAccordionItem",""]],inputs:{expanded:[2,"expanded","expanded",j],disabled:[2,"disabled","disabled",j]},outputs:{closed:"closed",opened:"opened",destroyed:"destroyed",expandedChange:"expandedChange"},exportAs:["cdkAccordionItem"],features:[rt([{provide:gC,useValue:void 0}])]})}return e})(),bC=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=me({type:e});static \u0275inj=fe({})}return e})();var TP=["body"],MP=["bodyWrapper"],AP=[[["mat-expansion-panel-header"]],"*",[["mat-action-row"]]],RP=["mat-expansion-panel-header","*","mat-action-row"];function kP(e,n){}var NP=[[["mat-panel-title"]],[["mat-panel-description"]],"*"],OP=["mat-panel-title","mat-panel-description","*"];function PP(e,n){e&1&&(_t(0,"span",1),Yi(),_t(1,"svg",2),ii(2,"path",3),kt()())}var yC=new g("MAT_ACCORDION"),_C=new g("MAT_EXPANSION_PANEL"),FP=(()=>{class e{_template=u(He);_expansionPanel=u(_C,{optional:!0});static \u0275fac=function(i){return new(i||e)};static \u0275dir=H({type:e,selectors:[["ng-template","matExpansionPanelContent",""]]})}return e})(),wC=new g("MAT_EXPANSION_PANEL_DEFAULT_OPTIONS"),Fm=(()=>{class e extends vC{_viewContainerRef=u(Je);_animationsDisabled=je();_document=u(O);_ngZone=u(M);_elementRef=u(Y);_renderer=u(yt);_cleanupTransitionEnd;get hideToggle(){return this._hideToggle||this.accordion&&this.accordion.hideToggle}set hideToggle(t){this._hideToggle=t}_hideToggle=!1;get togglePosition(){return this._togglePosition||this.accordion&&this.accordion.togglePosition}set togglePosition(t){this._togglePosition=t}_togglePosition;afterExpand=new k;afterCollapse=new k;_inputChanges=new I;accordion=u(yC,{optional:!0,skipSelf:!0});_lazyContent;_body;_bodyWrapper;_portal;_headerId=u(Ke).getId("mat-expansion-panel-header-");constructor(){super();let t=u(wC,{optional:!0});this._expansionDispatcher=u(oa),t&&(this.hideToggle=t.hideToggle)}_hasSpacing(){return this.accordion?this.expanded&&this.accordion.displayMode==="default":!1}_getExpandedState(){return this.expanded?"expanded":"collapsed"}toggle(){this.expanded=!this.expanded}close(){this.expanded=!1}open(){this.expanded=!0}ngAfterContentInit(){this._lazyContent&&this._lazyContent._expansionPanel===this&&this.opened.pipe(Ft(null),pe(()=>this.expanded&&!this._portal),Dt(1)).subscribe(()=>{this._portal=new pn(this._lazyContent._template,this._viewContainerRef)}),this._setupAnimationEvents()}ngOnChanges(t){this._inputChanges.next(t)}ngOnDestroy(){super.ngOnDestroy(),this._cleanupTransitionEnd?.(),this._inputChanges.complete()}_containsFocus(){if(this._body){let t=this._document.activeElement,i=this._body.nativeElement;return t===i||i.contains(t)}return!1}_transitionEndListener=({target:t,propertyName:i})=>{t===this._bodyWrapper?.nativeElement&&i==="grid-template-rows"&&this._ngZone.run(()=>{this.expanded?this.afterExpand.emit():this.afterCollapse.emit()})};_setupAnimationEvents(){this._ngZone.runOutsideAngular(()=>{this._animationsDisabled?(this.opened.subscribe(()=>this._ngZone.run(()=>this.afterExpand.emit())),this.closed.subscribe(()=>this._ngZone.run(()=>this.afterCollapse.emit()))):setTimeout(()=>{let t=this._elementRef.nativeElement;this._cleanupTransitionEnd=this._renderer.listen(t,"transitionend",this._transitionEndListener),t.classList.add("mat-expansion-panel-animations-enabled")},200)})}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=Z({type:e,selectors:[["mat-expansion-panel"]],contentQueries:function(i,r,o){if(i&1&&kn(o,FP,5),i&2){let s;K(s=Q())&&(r._lazyContent=s.first)}},viewQuery:function(i,r){if(i&1&&nt(TP,5)(MP,5),i&2){let o;K(o=Q())&&(r._body=o.first),K(o=Q())&&(r._bodyWrapper=o.first)}},hostAttrs:[1,"mat-expansion-panel"],hostVars:4,hostBindings:function(i,r){i&2&&X("mat-expanded",r.expanded)("mat-expansion-panel-spacing",r._hasSpacing())},inputs:{hideToggle:[2,"hideToggle","hideToggle",j],togglePosition:"togglePosition"},outputs:{afterExpand:"afterExpand",afterCollapse:"afterCollapse"},exportAs:["matExpansionPanel"],features:[rt([{provide:yC,useValue:void 0},{provide:_C,useExisting:e}]),Oe,ft],ngContentSelectors:RP,decls:9,vars:4,consts:[["bodyWrapper",""],["body",""],[1,"mat-expansion-panel-content-wrapper"],["role","region",1,"mat-expansion-panel-content",3,"id"],[1,"mat-expansion-panel-body"],[3,"cdkPortalOutlet"]],template:function(i,r){i&1&&(Fe(AP),he(0),_(1,"div",2,0)(3,"div",3,1)(5,"div",4),he(6,1),an(7,kP,0,0,"ng-template",5),b(),he(8,2),b()()),i&2&&(w(),ge("inert",r.expanded?null:""),w(2),_e("id",r.id),ge("aria-labelledby",r._headerId),w(4),_e("cdkPortalOutlet",r._portal))},dependencies:[xi],styles:[`.mat-expansion-panel {
  box-sizing: content-box;
  display: block;
  margin: 0;
  overflow: hidden;
}
.mat-expansion-panel.mat-expansion-panel-animations-enabled {
  transition: margin 225ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-expansion-panel {
  position: relative;
  background: var(--mat-expansion-container-background-color, var(--mat-sys-surface));
  color: var(--mat-expansion-container-text-color, var(--mat-sys-on-surface));
  border-radius: var(--mat-expansion-container-shape, 12px);
}
.mat-expansion-panel:not([class*=mat-elevation-z]) {
  box-shadow: var(--mat-expansion-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
}
.mat-accordion .mat-expansion-panel:not(.mat-expanded), .mat-accordion .mat-expansion-panel:not(.mat-expansion-panel-spacing) {
  border-radius: 0;
}
.mat-accordion .mat-expansion-panel:first-of-type {
  border-top-right-radius: var(--mat-expansion-container-shape, 12px);
  border-top-left-radius: var(--mat-expansion-container-shape, 12px);
}
.mat-accordion .mat-expansion-panel:last-of-type {
  border-bottom-right-radius: var(--mat-expansion-container-shape, 12px);
  border-bottom-left-radius: var(--mat-expansion-container-shape, 12px);
}
@media (forced-colors: active) {
  .mat-expansion-panel {
    outline: solid 1px;
  }
}

.mat-expansion-panel-content-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  grid-template-columns: 100%;
}
.mat-expansion-panel-animations-enabled .mat-expansion-panel-content-wrapper {
  transition: grid-template-rows 225ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-expansion-panel.mat-expanded > .mat-expansion-panel-content-wrapper {
  grid-template-rows: 1fr;
}
@supports not (grid-template-rows: 0fr) {
  .mat-expansion-panel-content-wrapper {
    height: 0;
  }
  .mat-expansion-panel.mat-expanded > .mat-expansion-panel-content-wrapper {
    height: auto;
  }
}
@media print {
  .mat-expansion-panel-content-wrapper {
    height: 0;
  }
  .mat-expansion-panel.mat-expanded > .mat-expansion-panel-content-wrapper {
    height: auto;
  }
}

.mat-expansion-panel-content {
  display: flex;
  flex-direction: column;
  overflow: visible;
  min-height: 0;
  visibility: hidden;
}
.mat-expansion-panel-animations-enabled .mat-expansion-panel-content {
  transition: visibility 190ms linear;
}
.mat-expansion-panel.mat-expanded > .mat-expansion-panel-content-wrapper > .mat-expansion-panel-content {
  visibility: visible;
}
.mat-expansion-panel-content {
  font-family: var(--mat-expansion-container-text-font, var(--mat-sys-body-large-font));
  font-size: var(--mat-expansion-container-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-expansion-container-text-weight, var(--mat-sys-body-large-weight));
  line-height: var(--mat-expansion-container-text-line-height, var(--mat-sys-body-large-line-height));
  letter-spacing: var(--mat-expansion-container-text-tracking, var(--mat-sys-body-large-tracking));
}

.mat-expansion-panel-body {
  padding: 0 24px 16px;
}

.mat-expansion-panel-spacing {
  margin: 16px 0;
}
.mat-accordion > .mat-expansion-panel-spacing:first-child, .mat-accordion > *:first-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing {
  margin-top: 0;
}
.mat-accordion > .mat-expansion-panel-spacing:last-child, .mat-accordion > *:last-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing {
  margin-bottom: 0;
}

.mat-action-row {
  border-top-style: solid;
  border-top-width: 1px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 16px 8px 16px 24px;
  border-top-color: var(--mat-expansion-actions-divider-color, var(--mat-sys-outline));
}
.mat-action-row .mat-button-base,
.mat-action-row .mat-mdc-button-base {
  margin-left: 8px;
}
[dir=rtl] .mat-action-row .mat-button-base,
[dir=rtl] .mat-action-row .mat-mdc-button-base {
  margin-left: 0;
  margin-right: 8px;
}
`],encapsulation:2})}return e})();var EC=(()=>{class e{panel=u(Fm,{host:!0});_element=u(Y);_focusMonitor=u(gn);_changeDetectorRef=u(Ie);_parentChangeSubscription=ee.EMPTY;constructor(){u(Ze).load(mn);let t=this.panel,i=u(wC,{optional:!0}),r=u(new Ei("tabindex"),{optional:!0}),o=t.accordion?t.accordion._stateChanges.pipe(pe(s=>!!(s.hideToggle||s.togglePosition))):Ee;this.tabIndex=parseInt(r||"")||0,this._parentChangeSubscription=Vn(t.opened,t.closed,o,t._inputChanges.pipe(pe(s=>!!(s.hideToggle||s.disabled||s.togglePosition)))).subscribe(()=>this._changeDetectorRef.markForCheck()),t.closed.pipe(pe(()=>t._containsFocus())).subscribe(()=>this._focusMonitor.focusVia(this._element,"program")),i&&(this.expandedHeight=i.expandedHeight,this.collapsedHeight=i.collapsedHeight)}expandedHeight;collapsedHeight;tabIndex=0;get disabled(){return this.panel.disabled}_toggle(){this.disabled||this.panel.toggle()}_isExpanded(){return this.panel.expanded}_getExpandedState(){return this.panel._getExpandedState()}_getPanelId(){return this.panel.id}_getTogglePosition(){return this.panel.togglePosition}_showToggle(){return!this.panel.hideToggle&&!this.panel.disabled}_getHeaderHeight(){let t=this._isExpanded();return t&&this.expandedHeight?this.expandedHeight:!t&&this.collapsedHeight?this.collapsedHeight:null}_keydown(t){switch(t.keyCode){case 32:case 13:To(t)||(t.preventDefault(),this._toggle());break;default:this.panel.accordion&&this.panel.accordion._handleHeaderKeydown(t);return}}focus(t,i){t?this._focusMonitor.focusVia(this._element,t,i):this._element.nativeElement.focus(i)}ngAfterViewInit(){this._focusMonitor.monitor(this._element).subscribe(t=>{t&&this.panel.accordion&&this.panel.accordion._handleHeaderFocus(this)})}ngOnDestroy(){this._parentChangeSubscription.unsubscribe(),this._focusMonitor.stopMonitoring(this._element)}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=Z({type:e,selectors:[["mat-expansion-panel-header"]],hostAttrs:["role","button",1,"mat-expansion-panel-header","mat-focus-indicator"],hostVars:13,hostBindings:function(i,r){i&1&&Ce("click",function(){return r._toggle()})("keydown",function(s){return r._keydown(s)}),i&2&&(ge("id",r.panel._headerId)("tabindex",r.disabled?-1:r.tabIndex)("aria-controls",r._getPanelId())("aria-expanded",r._isExpanded())("aria-disabled",r.panel.disabled),or("height",r._getHeaderHeight()),X("mat-expanded",r._isExpanded())("mat-expansion-toggle-indicator-after",r._getTogglePosition()==="after")("mat-expansion-toggle-indicator-before",r._getTogglePosition()==="before"))},inputs:{expandedHeight:"expandedHeight",collapsedHeight:"collapsedHeight",tabIndex:[2,"tabIndex","tabIndex",t=>t==null?0:Ut(t)]},ngContentSelectors:OP,decls:5,vars:3,consts:[[1,"mat-content"],[1,"mat-expansion-indicator"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 -960 960 960","aria-hidden","true","focusable","false"],["d","M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"]],template:function(i,r){i&1&&(Fe(NP),_t(0,"span",0),he(1),he(2,1),he(3,2),kt(),et(4,PP,3,0,"span",1)),i&2&&(X("mat-content-hide-toggle",!r._showToggle()),w(4),tt(r._showToggle()?4:-1))},styles:[`.mat-expansion-panel-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 24px;
  border-radius: inherit;
}
.mat-expansion-panel-animations-enabled .mat-expansion-panel-header {
  transition: height 225ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-expansion-panel-header::before {
  border-radius: inherit;
}
.mat-expansion-panel-header {
  height: var(--mat-expansion-header-collapsed-state-height, 48px);
  font-family: var(--mat-expansion-header-text-font, var(--mat-sys-title-medium-font));
  font-size: var(--mat-expansion-header-text-size, var(--mat-sys-title-medium-size));
  font-weight: var(--mat-expansion-header-text-weight, var(--mat-sys-title-medium-weight));
  line-height: var(--mat-expansion-header-text-line-height, var(--mat-sys-title-medium-line-height));
  letter-spacing: var(--mat-expansion-header-text-tracking, var(--mat-sys-title-medium-tracking));
}
.mat-expansion-panel-header.mat-expanded {
  height: var(--mat-expansion-header-expanded-state-height, 64px);
}
.mat-expansion-panel-header[aria-disabled=true] {
  color: var(--mat-expansion-header-disabled-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-expansion-panel-header:not([aria-disabled=true]) {
  cursor: pointer;
}
.mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]):hover {
  background: var(--mat-expansion-header-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent));
}
@media (hover: none) {
  .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]):hover {
    background: var(--mat-expansion-container-background-color, var(--mat-sys-surface));
  }
}
.mat-expansion-panel .mat-expansion-panel-header:not([aria-disabled=true]).cdk-keyboard-focused, .mat-expansion-panel .mat-expansion-panel-header:not([aria-disabled=true]).cdk-program-focused {
  background: var(--mat-expansion-header-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent));
}
.mat-expansion-panel-header._mat-animation-noopable {
  transition: none;
}
.mat-expansion-panel-header:focus, .mat-expansion-panel-header:hover {
  outline: none;
}
.mat-expansion-panel-header.mat-expanded:focus, .mat-expansion-panel-header.mat-expanded:hover {
  background: inherit;
}
.mat-expansion-panel-header.mat-expansion-toggle-indicator-before {
  flex-direction: row-reverse;
}
.mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator {
  margin: 0 16px 0 0;
}
[dir=rtl] .mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator {
  margin: 0 0 0 16px;
}

.mat-content {
  display: flex;
  flex: 1;
  flex-direction: row;
  overflow: hidden;
}
.mat-content.mat-content-hide-toggle {
  margin-right: 8px;
}
[dir=rtl] .mat-content.mat-content-hide-toggle {
  margin-right: 0;
  margin-left: 8px;
}
.mat-expansion-toggle-indicator-before .mat-content.mat-content-hide-toggle {
  margin-left: 24px;
  margin-right: 0;
}
[dir=rtl] .mat-expansion-toggle-indicator-before .mat-content.mat-content-hide-toggle {
  margin-right: 24px;
  margin-left: 0;
}

.mat-expansion-panel-header-title {
  color: var(--mat-expansion-header-text-color, var(--mat-sys-on-surface));
}

.mat-expansion-panel-header-title,
.mat-expansion-panel-header-description {
  display: flex;
  flex-grow: 1;
  flex-basis: 0;
  margin-right: 16px;
  align-items: center;
}
[dir=rtl] .mat-expansion-panel-header-title,
[dir=rtl] .mat-expansion-panel-header-description {
  margin-right: 0;
  margin-left: 16px;
}
.mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-title,
.mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-description {
  color: inherit;
}

.mat-expansion-panel-header-description {
  flex-grow: 2;
  color: var(--mat-expansion-header-description-color, var(--mat-sys-on-surface-variant));
}

.mat-expansion-panel-animations-enabled .mat-expansion-indicator {
  transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-expansion-panel-header.mat-expanded .mat-expansion-indicator {
  transform: rotate(180deg);
}
.mat-expansion-indicator::after {
  border-style: solid;
  border-width: 0 2px 2px 0;
  content: "";
  padding: 3px;
  transform: rotate(45deg);
  vertical-align: middle;
  color: var(--mat-expansion-header-indicator-color, var(--mat-sys-on-surface-variant));
  display: var(--mat-expansion-legacy-header-indicator-display, none);
}
.mat-expansion-indicator svg {
  width: 24px;
  height: 24px;
  margin: 0 -8px;
  vertical-align: middle;
  fill: var(--mat-expansion-header-indicator-color, var(--mat-sys-on-surface-variant));
  display: var(--mat-expansion-header-indicator-display, inline-block);
}

@media (forced-colors: active) {
  .mat-expansion-panel-content {
    border-top: 1px solid;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
}
`],encapsulation:2})}return e})(),DC=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275dir=H({type:e,selectors:[["mat-panel-description"]],hostAttrs:[1,"mat-expansion-panel-header-description"]})}return e})(),CC=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275dir=H({type:e,selectors:[["mat-panel-title"]],hostAttrs:[1,"mat-expansion-panel-header-title"]})}return e})();var IC=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=me({type:e});static \u0275inj=fe({imports:[bC,Ql,zt]})}return e})();var hd=(e,n)=>n.key;function BP(e,n){if(e&1&&(_(0,"mat-expansion-panel",1)(1,"mat-expansion-panel-header")(2,"mat-panel-title"),C(3),b(),_(4,"mat-panel-description"),C(5),b()(),_(6,"ul",2)(7,"li")(8,"b"),C(9,"Connection URL:"),b(),C(10),b(),_(11,"li")(12,"b"),C(13,"JNDI:"),b(),C(14),b(),_(15,"li")(16,"b"),C(17,"Driver:"),b(),C(18),b(),_(19,"li")(20,"b"),C(21,"JTA:"),b(),C(22),b(),_(23,"li")(24,"b"),C(25,"User:"),b(),C(26),b(),_(27,"li")(28,"b"),C(29,"Password:"),b(),C(30),b(),_(31,"li")(32,"b"),C(33,"Initial Pool Size:"),b(),C(34),b(),_(35,"li")(36,"b"),C(37,"Min Pool Size:"),b(),C(38),b(),_(39,"li")(40,"b"),C(41,"Max Pool Size:"),b(),C(42),b(),_(43,"li")(44,"b"),C(45,"Connection Properties:"),b(),C(46),b()()()),e&2){let t=n.$implicit;w(3),it(t.key),w(2),it(t.value["jndi-name"]),w(5),ae(" ",t.value["connection-url"]),w(4),ae(" ",t.value["jndi-name"]),w(4),ae(" ",t.value["driver-name"]),w(4),ae(" ",t.value.jta),w(4),ae(" ",t.value["user-name"]),w(4),ae(" ",t.value.password),w(4),ae(" ",t.value["initial-pool-size"]),w(4),ae(" ",t.value["min-pool-size"]),w(4),ae(" ",t.value["max-pool-size"]),w(4),ae(" ",t.value["connection-properties"])}}function VP(e,n){if(e&1&&(_(0,"mat-expansion-panel",1)(1,"mat-expansion-panel-header")(2,"mat-panel-title"),C(3),b(),_(4,"mat-panel-description"),C(5),b()(),_(6,"ul",2)(7,"li")(8,"b"),C(9,"Connection URL:"),b(),C(10),b(),_(11,"li")(12,"b"),C(13,"JNDI:"),b(),C(14),b(),_(15,"li")(16,"b"),C(17,"Driver:"),b(),C(18),b(),_(19,"li")(20,"b"),C(21,"JTA:"),b(),C(22),b(),_(23,"li")(24,"b"),C(25,"User:"),b(),C(26),b(),_(27,"li")(28,"b"),C(29,"Password:"),b(),C(30),b(),_(31,"li")(32,"b"),C(33,"Initial Pool Size:"),b(),C(34),b(),_(35,"li")(36,"b"),C(37,"Min Pool Size:"),b(),C(38),b(),_(39,"li")(40,"b"),C(41,"Max Pool Size:"),b(),C(42),b(),_(43,"li")(44,"b"),C(45,"Connection Properties:"),b(),C(46),sr(47,"json"),b()()()),e&2){let t=n.$implicit;w(3),it(t.key),w(2),it(t.value["jndi-name"]),w(5),ae(" ",t.value["xa-datasource-properties"].URL?.value),w(4),ae(" ",t.value["jndi-name"]),w(4),ae(" ",t.value["driver-name"]),w(4),ae(" ",t.value.jta),w(4),ae(" ",t.value["user-name"]),w(4),ae(" ",t.value.password),w(4),ae(" ",t.value["initial-pool-size"]),w(4),ae(" ",t.value["min-pool-size"]),w(4),ae(" ",t.value["max-pool-size"]),w(4),ae(" ",ar(47,12,t.value["xa-datasource-properties"]))}}function jP(e,n){if(e&1&&(_(0,"mat-expansion-panel",1)(1,"mat-expansion-panel-header")(2,"mat-panel-title"),C(3),b(),_(4,"mat-panel-description"),C(5),b()(),_(6,"ul",2)(7,"li")(8,"b"),C(9,"Enabled:"),b(),C(10),b(),_(11,"li")(12,"b"),C(13,"Runtime Name:"),b(),C(14),b()()()),e&2){let t=n.$implicit;w(3),it(t.key),w(2),it(t.value["runtime-name"]),w(5),ae(" ",t.value.enabled),w(4),ae(" ",t.value["runtime-name"])}}function UP(e,n){if(e&1&&(_(0,"mat-expansion-panel",1)(1,"mat-expansion-panel-header")(2,"mat-panel-title"),C(3),b(),_(4,"mat-panel-description"),C(5),b()(),_(6,"ul",2)(7,"li")(8,"b"),C(9,"Type:"),b(),C(10),b(),_(11,"li")(12,"b"),C(13,"Value:"),b(),C(14),b()()()),e&2){let t=n.$implicit;w(3),it(t.key),w(2),it(t.value.value),w(5),ae(" ",t.value.type),w(4),ae(" ",t.value.value)}}var pd=class e{wildflyService=u(Oo);cdr=u(Ie);index;apiUrl;serverStatus=lr.required();datasources;xaDataSources;deploymentResponse;namingBindingResponse;ngOnInit(){Pa(1e3).subscribe(()=>this.updateServerStatus()),this.updateData(),Pa(15e3).subscribe(()=>this.updateData())}updateData(){this.wildflyService.datasources(this.index).subscribe(n=>{this.datasources=n.result["data-source"],this.xaDataSources=n.result["xa-data-source"],this.cdr.detectChanges()}),this.wildflyService.deployments(this.index).subscribe(n=>{this.deploymentResponse=n,this.cdr.detectChanges()}),this.wildflyService.jndiBindings(this.index).subscribe(n=>{this.namingBindingResponse=n,this.cdr.detectChanges()})}updateServerStatus(){this.wildflyService.serverStatus(this.index).subscribe(n=>{this.serverStatus().update(t=>J(v({},t),{[this.index]:n})),this.cdr.detectChanges()})}toggleChanged(n){n.checked?this.wildflyService.startServer(this.index).subscribe():this.wildflyService.stopServer(this.index).subscribe()}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=Z({type:e,selectors:[["app-wildfly"]],inputs:{index:"index",apiUrl:"apiUrl",serverStatus:[1,"serverStatus"]},decls:22,vars:11,consts:[[3,"change","checked","disabled"],["hideToggle",""],[2,"list-style-type","none"]],template:function(t,i){t&1&&(_(0,"mat-card")(1,"mat-card-content"),C(2),_(3,"mat-slide-toggle",0),Ce("change",function(o){return i.toggleChanged(o)}),b(),_(4,"h2"),C(5,"Datasources"),b(),ln(6,BP,47,12,"mat-expansion-panel",1,hd),sr(8,"keyvalue"),ln(9,VP,48,14,"mat-expansion-panel",1,hd),sr(11,"keyvalue"),_(12,"h2"),C(13,"Deployments"),b(),ln(14,jP,15,4,"mat-expansion-panel",1,hd),sr(16,"keyvalue"),_(17,"h2"),C(18,"JNDI Bindings"),b(),ln(19,UP,15,4,"mat-expansion-panel",1,hd),sr(21,"keyvalue"),b()()),t&2&&(w(2),ae(" Server Status: ",i.serverStatus()()[i.index]?.result," "),w(),_e("checked",i.serverStatus()()[i.index]?.result==="running")("disabled",!(i.serverStatus()()[i.index]?.result==="down"||i.serverStatus()()[i.index]?.result==="running")),w(3),dn(ar(8,3,i.datasources)),w(3),dn(ar(11,5,i.xaDataSources)),w(5),dn(ar(16,7,i.deploymentResponse?.result)),w(5),dn(ar(21,9,i.namingBindingResponse?.result)))},dependencies:[uC,lC,dC,mC,Pm,IC,Fm,EC,CC,DC,tp,ep],encapsulation:2})};var SC=(()=>{class e{isErrorState(t,i){return!!(t&&t.invalid&&(t.touched||i&&i.submitted))}static \u0275fac=function(i){return new(i||e)};static \u0275prov=x({token:e,factory:e.\u0275fac})}return e})();var HP=["*",[["mat-chip-avatar"],["","matChipAvatar",""]],[["mat-chip-trailing-icon"],["","matChipRemove",""],["","matChipTrailingIcon",""]]],$P=["*","mat-chip-avatar, [matChipAvatar]","mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]"];function zP(e,n){e&1&&(_(0,"span",3),he(1,1),b())}function GP(e,n){e&1&&(_(0,"span",6),he(1,2),b())}var WP=new g("mat-chips-default-options",{providedIn:"root",factory:()=>({separatorKeyCodes:[13]})}),xC=new g("MatChipAvatar"),TC=new g("MatChipTrailingIcon"),MC=new g("MatChipEdit"),AC=new g("MatChipRemove"),RC=new g("MatChip"),kC=(()=>{class e{_elementRef=u(Y);_parentChip=u(RC);_isPrimary=!0;_isLeading=!1;get disabled(){return this._disabled||this._parentChip?.disabled||!1}set disabled(t){this._disabled=t}_disabled=!1;tabIndex=-1;_allowFocusWhenDisabled=!1;_getDisabledAttribute(){return this.disabled&&!this._allowFocusWhenDisabled?"":null}constructor(){u(Ze).load(mn),this._elementRef.nativeElement.nodeName==="BUTTON"&&this._elementRef.nativeElement.setAttribute("type","button")}focus(){this._elementRef.nativeElement.focus()}static \u0275fac=function(i){return new(i||e)};static \u0275dir=H({type:e,selectors:[["","matChipContent",""]],hostAttrs:[1,"mat-mdc-chip-action","mdc-evolution-chip__action","mdc-evolution-chip__action--presentational"],hostVars:8,hostBindings:function(i,r){i&2&&(ge("disabled",r._getDisabledAttribute())("aria-disabled",r.disabled),X("mdc-evolution-chip__action--primary",r._isPrimary)("mdc-evolution-chip__action--secondary",!r._isPrimary)("mdc-evolution-chip__action--trailing",!r._isPrimary&&!r._isLeading))},inputs:{disabled:[2,"disabled","disabled",j],tabIndex:[2,"tabIndex","tabIndex",t=>t==null?-1:Ut(t)],_allowFocusWhenDisabled:"_allowFocusWhenDisabled"}})}return e})(),qP=(()=>{class e extends kC{_getTabindex(){return this.disabled&&!this._allowFocusWhenDisabled?null:this.tabIndex.toString()}_handleClick(t){!this.disabled&&this._isPrimary&&(t.preventDefault(),this._parentChip._handlePrimaryActionInteraction())}_handleKeydown(t){(t.keyCode===13||t.keyCode===32)&&!this.disabled&&this._isPrimary&&!this._parentChip._isEditing&&(t.preventDefault(),this._parentChip._handlePrimaryActionInteraction())}static \u0275fac=(()=>{let t;return function(r){return(t||(t=At(e)))(r||e)}})();static \u0275dir=H({type:e,selectors:[["","matChipAction",""]],hostVars:3,hostBindings:function(i,r){i&1&&Ce("click",function(s){return r._handleClick(s)})("keydown",function(s){return r._handleKeydown(s)}),i&2&&(ge("tabindex",r._getTabindex()),X("mdc-evolution-chip__action--presentational",!1))},features:[Oe]})}return e})();var NC=(()=>{class e{_changeDetectorRef=u(Ie);_elementRef=u(Y);_tagName=u(Ow);_ngZone=u(M);_focusMonitor=u(gn);_globalRippleOptions=u(Ao,{optional:!0});_document=u(O);_onFocus=new I;_onBlur=new I;_isBasicChip=!1;role=null;_hasFocusInternal=!1;_pendingFocus=!1;_actionChanges;_animationsDisabled=je();_allLeadingIcons;_allTrailingIcons;_allEditIcons;_allRemoveIcons;_hasFocus(){return this._hasFocusInternal}id=u(Ke).getId("mat-mdc-chip-");ariaLabel=null;ariaDescription=null;_chipListDisabled=!1;_hadFocusOnRemove=!1;_textElement;get value(){return this._value!==void 0?this._value:this._textElement.textContent.trim()}set value(t){this._value=t}_value;color;removable=!0;highlighted=!1;disableRipple=!1;get disabled(){return this._disabled||this._chipListDisabled}set disabled(t){this._disabled=t}_disabled=!1;removed=new k;destroyed=new k;basicChipAttrName="mat-basic-chip";leadingIcon;editIcon;trailingIcon;removeIcon;primaryAction;_rippleLoader=u(ud);_injector=u(ne);constructor(){let t=u(Ze);t.load(mn),t.load(cm),this._monitorFocus(),this._rippleLoader?.configureRipple(this._elementRef.nativeElement,{className:"mat-mdc-chip-ripple",disabled:this._isRippleDisabled()})}ngOnInit(){this._isBasicChip=this._elementRef.nativeElement.hasAttribute(this.basicChipAttrName)||this._tagName.toLowerCase()===this.basicChipAttrName}ngAfterViewInit(){this._textElement=this._elementRef.nativeElement.querySelector(".mat-mdc-chip-action-label"),this._pendingFocus&&(this._pendingFocus=!1,this.focus())}ngAfterContentInit(){this._actionChanges=Vn(this._allLeadingIcons.changes,this._allTrailingIcons.changes,this._allEditIcons.changes,this._allRemoveIcons.changes).subscribe(()=>this._changeDetectorRef.markForCheck())}ngDoCheck(){this._rippleLoader.setDisabled(this._elementRef.nativeElement,this._isRippleDisabled())}ngOnDestroy(){this.destroyed.emit({chip:this}),this.destroyed.complete(),this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement),this._actionChanges?.unsubscribe()}remove(){this.removable&&(this._hadFocusOnRemove=this._hasFocus(),this.removed.emit({chip:this}))}_isRippleDisabled(){return this.disabled||this.disableRipple||this._animationsDisabled||this._isBasicChip||!this._hasInteractiveActions()||!!this._globalRippleOptions?.disabled}_hasTrailingIcon(){return!!(this.trailingIcon||this.removeIcon)}_handleKeydown(t){(t.keyCode===8&&!t.repeat||t.keyCode===46)&&(t.preventDefault(),this.remove())}focus(){this.disabled||(this.primaryAction?this.primaryAction.focus():this._pendingFocus=!0)}_getSourceAction(t){return this._getActions().find(i=>{let r=i._elementRef.nativeElement;return r===t||r.contains(t)})}_getActions(){let t=[];return this.editIcon&&t.push(this.editIcon),this.primaryAction&&t.push(this.primaryAction),this.removeIcon&&t.push(this.removeIcon),t}_handlePrimaryActionInteraction(){}_hasInteractiveActions(){return this._getActions().length>0}_edit(t){}_monitorFocus(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(t=>{let i=t!==null;i!==this._hasFocusInternal&&(this._hasFocusInternal=i,i?this._onFocus.next({chip:this}):(this._changeDetectorRef.markForCheck(),setTimeout(()=>this._ngZone.run(()=>this._onBlur.next({chip:this})))))})}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=Z({type:e,selectors:[["mat-basic-chip"],["","mat-basic-chip",""],["mat-chip"],["","mat-chip",""]],contentQueries:function(i,r,o){if(i&1&&kn(o,xC,5)(o,MC,5)(o,TC,5)(o,AC,5)(o,xC,5)(o,TC,5)(o,MC,5)(o,AC,5),i&2){let s;K(s=Q())&&(r.leadingIcon=s.first),K(s=Q())&&(r.editIcon=s.first),K(s=Q())&&(r.trailingIcon=s.first),K(s=Q())&&(r.removeIcon=s.first),K(s=Q())&&(r._allLeadingIcons=s),K(s=Q())&&(r._allTrailingIcons=s),K(s=Q())&&(r._allEditIcons=s),K(s=Q())&&(r._allRemoveIcons=s)}},viewQuery:function(i,r){if(i&1&&nt(qP,5),i&2){let o;K(o=Q())&&(r.primaryAction=o.first)}},hostAttrs:[1,"mat-mdc-chip"],hostVars:31,hostBindings:function(i,r){i&1&&Ce("keydown",function(s){return r._handleKeydown(s)}),i&2&&(co("id",r.id),ge("role",r.role)("aria-label",r.ariaLabel),Nt("mat-"+(r.color||"primary")),X("mdc-evolution-chip",!r._isBasicChip)("mdc-evolution-chip--disabled",r.disabled)("mdc-evolution-chip--with-trailing-action",r._hasTrailingIcon())("mdc-evolution-chip--with-primary-graphic",r.leadingIcon)("mdc-evolution-chip--with-primary-icon",r.leadingIcon)("mdc-evolution-chip--with-avatar",r.leadingIcon)("mat-mdc-chip-with-avatar",r.leadingIcon)("mat-mdc-chip-highlighted",r.highlighted)("mat-mdc-chip-disabled",r.disabled)("mat-mdc-basic-chip",r._isBasicChip)("mat-mdc-standard-chip",!r._isBasicChip)("mat-mdc-chip-with-trailing-icon",r._hasTrailingIcon())("_mat-animation-noopable",r._animationsDisabled))},inputs:{role:"role",id:"id",ariaLabel:[0,"aria-label","ariaLabel"],ariaDescription:[0,"aria-description","ariaDescription"],value:"value",color:"color",removable:[2,"removable","removable",j],highlighted:[2,"highlighted","highlighted",j],disableRipple:[2,"disableRipple","disableRipple",j],disabled:[2,"disabled","disabled",j]},outputs:{removed:"removed",destroyed:"destroyed"},exportAs:["matChip"],features:[rt([{provide:RC,useExisting:e}])],ngContentSelectors:$P,decls:8,vars:2,consts:[[1,"mat-mdc-chip-focus-overlay"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--primary"],["matChipContent",""],[1,"mdc-evolution-chip__graphic","mat-mdc-chip-graphic"],[1,"mdc-evolution-chip__text-label","mat-mdc-chip-action-label"],[1,"mat-mdc-chip-primary-focus-indicator","mat-focus-indicator"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--trailing"]],template:function(i,r){i&1&&(Fe(HP),Me(0,"span",0),_(1,"span",1)(2,"span",2),et(3,zP,2,0,"span",3),_(4,"span",4),he(5),Me(6,"span",5),b()()(),et(7,GP,2,0,"span",6)),i&2&&(w(3),tt(r.leadingIcon?3:-1),w(4),tt(r._hasTrailingIcon()?7:-1))},dependencies:[kC],styles:[`.mdc-evolution-chip,
.mdc-evolution-chip__cell,
.mdc-evolution-chip__action {
  display: inline-flex;
  align-items: center;
}

.mdc-evolution-chip {
  position: relative;
  max-width: 100%;
}

.mdc-evolution-chip__cell,
.mdc-evolution-chip__action {
  height: 100%;
}

.mdc-evolution-chip__cell--primary {
  flex-basis: 100%;
  overflow-x: hidden;
}

.mdc-evolution-chip__cell--trailing {
  flex: 1 0 auto;
}

.mdc-evolution-chip__action {
  align-items: center;
  background: none;
  border: none;
  box-sizing: content-box;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  outline: none;
  padding: 0;
  text-decoration: none;
  color: inherit;
}

.mdc-evolution-chip__action--presentational {
  cursor: auto;
}

.mdc-evolution-chip--disabled,
.mdc-evolution-chip__action:disabled {
  pointer-events: none;
}
@media (forced-colors: active) {
  .mdc-evolution-chip--disabled,
  .mdc-evolution-chip__action:disabled {
    forced-color-adjust: none;
  }
}

.mdc-evolution-chip__action--primary {
  font: inherit;
  letter-spacing: inherit;
  white-space: inherit;
  overflow-x: hidden;
}
.mat-mdc-standard-chip .mdc-evolution-chip__action--primary::before {
  border-width: var(--mat-chip-outline-width, 1px);
  border-radius: var(--mat-chip-container-shape-radius, 8px);
  box-sizing: border-box;
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  pointer-events: none;
  top: 0;
  width: 100%;
  z-index: 1;
  border-style: solid;
}
.mat-mdc-standard-chip .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 12px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__action--primary::before {
  border-color: var(--mat-chip-outline-color, var(--mat-sys-outline));
}
.mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus::before {
  border-color: var(--mat-chip-focus-outline-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--primary::before {
  border-color: var(--mat-chip-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__action--primary::before {
  border-width: var(--mat-chip-flat-selected-outline-width, 0);
}
.mat-mdc-basic-chip .mdc-evolution-chip__action--primary {
  font: inherit;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}

.mdc-evolution-chip__action--secondary {
  position: relative;
  overflow: visible;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__action--secondary {
  color: var(--mat-chip-with-trailing-icon-trailing-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--secondary {
  color: var(--mat-chip-with-trailing-icon-disabled-trailing-icon-color, var(--mat-sys-on-surface));
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary, .mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary, .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary, .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary, [dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}

.mdc-evolution-chip__text-label {
  -webkit-user-select: none;
  user-select: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.mat-mdc-standard-chip .mdc-evolution-chip__text-label {
  font-family: var(--mat-chip-label-text-font, var(--mat-sys-label-large-font));
  line-height: var(--mat-chip-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-size: var(--mat-chip-label-text-size, var(--mat-sys-label-large-size));
  font-weight: var(--mat-chip-label-text-weight, var(--mat-sys-label-large-weight));
  letter-spacing: var(--mat-chip-label-text-tracking, var(--mat-sys-label-large-tracking));
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label {
  color: var(--mat-chip-label-text-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label {
  color: var(--mat-chip-selected-label-text-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label, .mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label {
  color: var(--mat-chip-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mdc-evolution-chip__graphic {
  align-items: center;
  display: inline-flex;
  justify-content: center;
  overflow: hidden;
  pointer-events: none;
  position: relative;
  flex: 1 0 auto;
}
.mat-mdc-standard-chip .mdc-evolution-chip__graphic {
  width: var(--mat-chip-with-avatar-avatar-size, 24px);
  height: var(--mat-chip-with-avatar-avatar-size, 24px);
  font-size: var(--mat-chip-with-avatar-avatar-size, 24px);
}
.mdc-evolution-chip--selecting .mdc-evolution-chip__graphic {
  transition: width 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--selected):not(.mdc-evolution-chip--with-primary-icon) .mdc-evolution-chip__graphic {
  width: 0;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {
  padding-left: 6px;
  padding-right: 6px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {
  padding-left: 4px;
  padding-right: 8px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {
  padding-left: 8px;
  padding-right: 4px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {
  padding-left: 6px;
  padding-right: 6px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {
  padding-left: 4px;
  padding-right: 8px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {
  padding-left: 8px;
  padding-right: 4px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__graphic {
  padding-left: 0;
}

.mdc-evolution-chip__checkmark {
  position: absolute;
  opacity: 0;
  top: 50%;
  left: 50%;
  height: 20px;
  width: 20px;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__checkmark {
  color: var(--mat-chip-with-icon-selected-icon-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__checkmark {
  color: var(--mat-chip-with-icon-disabled-icon-color, var(--mat-sys-on-surface));
}
.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark {
  transition: transform 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate(-75%, -50%);
}
.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark {
  transform: translate(-50%, -50%);
  opacity: 1;
}

.mdc-evolution-chip__checkmark-svg {
  display: block;
}

.mdc-evolution-chip__checkmark-path {
  stroke-width: 2px;
  stroke-dasharray: 29.7833385;
  stroke-dashoffset: 29.7833385;
  stroke: currentColor;
}
.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark-path {
  transition: stroke-dashoffset 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark-path {
  stroke-dashoffset: 0;
}
@media (forced-colors: active) {
  .mdc-evolution-chip__checkmark-path {
    stroke: CanvasText !important;
  }
}

.mat-mdc-standard-chip .mdc-evolution-chip__icon--trailing {
  height: 18px;
  width: 18px;
  font-size: 18px;
}
.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing.mat-mdc-chip-remove {
  opacity: calc(var(--mat-chip-trailing-action-opacity, 1) * var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38));
}
.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing.mat-mdc-chip-remove:focus {
  opacity: calc(var(--mat-chip-trailing-action-focus-opacity, 1) * var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38));
}

.mat-mdc-standard-chip {
  border-radius: var(--mat-chip-container-shape-radius, 8px);
  height: var(--mat-chip-container-height, 32px);
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) {
  background-color: var(--mat-chip-elevated-container-color, transparent);
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled {
  background-color: var(--mat-chip-elevated-disabled-container-color);
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected:not(.mdc-evolution-chip--disabled) {
  background-color: var(--mat-chip-elevated-selected-container-color, var(--mat-sys-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled {
  background-color: var(--mat-chip-flat-disabled-selected-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
@media (forced-colors: active) {
  .mat-mdc-standard-chip {
    outline: solid 1px;
  }
}

.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary {
  border-radius: var(--mat-chip-with-avatar-avatar-shape-radius, 24px);
  width: var(--mat-chip-with-icon-icon-size, 18px);
  height: var(--mat-chip-with-icon-icon-size, 18px);
  font-size: var(--mat-chip-with-icon-icon-size, 18px);
}
.mdc-evolution-chip--selected .mdc-evolution-chip__icon--primary {
  opacity: 0;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__icon--primary {
  color: var(--mat-chip-with-icon-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--primary {
  color: var(--mat-chip-with-icon-disabled-icon-color, var(--mat-sys-on-surface));
}

.mat-mdc-chip-highlighted {
  --mat-chip-with-icon-icon-color: var(--mat-chip-with-icon-selected-icon-color, var(--mat-sys-on-secondary-container));
  --mat-chip-elevated-container-color: var(--mat-chip-elevated-selected-container-color, var(--mat-sys-secondary-container));
  --mat-chip-label-text-color: var(--mat-chip-selected-label-text-color, var(--mat-sys-on-secondary-container));
  --mat-chip-outline-width: var(--mat-chip-flat-selected-outline-width, 0);
}

.mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-focus-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-chip-selected .mat-mdc-chip-focus-overlay, .mat-mdc-chip-highlighted .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-selected-focus-state-layer-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-chip:hover .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-hover-state-layer-color, var(--mat-sys-on-surface-variant));
  opacity: var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-chip-focus-overlay .mat-mdc-chip-selected:hover, .mat-mdc-chip-highlighted:hover .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-selected-hover-state-layer-color, var(--mat-sys-on-secondary-container));
  opacity: var(--mat-chip-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-chip.cdk-focused .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-focus-state-layer-color, var(--mat-sys-on-surface-variant));
  opacity: var(--mat-chip-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-chip-selected.cdk-focused .mat-mdc-chip-focus-overlay, .mat-mdc-chip-highlighted.cdk-focused .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-selected-focus-state-layer-color, var(--mat-sys-on-secondary-container));
  opacity: var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}

.mdc-evolution-chip--disabled:not(.mdc-evolution-chip--selected) .mat-mdc-chip-avatar {
  opacity: var(--mat-chip-with-avatar-disabled-avatar-opacity, 0.38);
}

.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing {
  opacity: var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38);
}

.mdc-evolution-chip--disabled.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark {
  opacity: var(--mat-chip-with-icon-disabled-icon-opacity, 0.38);
}

.mat-mdc-standard-chip.mdc-evolution-chip--disabled {
  opacity: var(--mat-chip-disabled-container-opacity, 1);
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__icon--trailing, .mat-mdc-standard-chip.mat-mdc-chip-highlighted .mdc-evolution-chip__icon--trailing {
  color: var(--mat-chip-selected-trailing-icon-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing, .mat-mdc-standard-chip.mat-mdc-chip-highlighted.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing {
  color: var(--mat-chip-selected-disabled-trailing-icon-color, var(--mat-sys-on-surface));
}

.mat-mdc-chip-edit, .mat-mdc-chip-remove {
  opacity: var(--mat-chip-trailing-action-opacity, 1);
}
.mat-mdc-chip-edit:focus, .mat-mdc-chip-remove:focus {
  opacity: var(--mat-chip-trailing-action-focus-opacity, 1);
}
.mat-mdc-chip-edit::after, .mat-mdc-chip-remove::after {
  background-color: var(--mat-chip-trailing-action-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-chip-edit:hover::after, .mat-mdc-chip-remove:hover::after {
  opacity: calc(var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)) + var(--mat-chip-trailing-action-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)));
}
.mat-mdc-chip-edit:focus::after, .mat-mdc-chip-remove:focus::after {
  opacity: calc(var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)) + var(--mat-chip-trailing-action-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)));
}

.mat-mdc-chip-selected .mat-mdc-chip-remove::after,
.mat-mdc-chip-highlighted .mat-mdc-chip-remove::after {
  background-color: var(--mat-chip-selected-trailing-action-state-layer-color, var(--mat-sys-on-secondary-container));
}

.mat-mdc-chip.cdk-focused .mat-mdc-chip-edit:focus::after, .mat-mdc-chip.cdk-focused .mat-mdc-chip-remove:focus::after {
  opacity: calc(var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)) + var(--mat-chip-trailing-action-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)));
}
.mat-mdc-chip.cdk-focused .mat-mdc-chip-edit:hover::after, .mat-mdc-chip.cdk-focused .mat-mdc-chip-remove:hover::after {
  opacity: calc(var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)) + var(--mat-chip-trailing-action-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)));
}

.mat-mdc-standard-chip {
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-standard-chip .mat-mdc-chip-graphic,
.mat-mdc-standard-chip .mat-mdc-chip-trailing-icon {
  box-sizing: content-box;
}
.mat-mdc-standard-chip._mat-animation-noopable,
.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__graphic,
.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark,
.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark-path {
  transition-duration: 1ms;
  animation-duration: 1ms;
}

.mat-mdc-chip-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  opacity: 0;
  border-radius: inherit;
  transition: opacity 150ms linear;
}
._mat-animation-noopable .mat-mdc-chip-focus-overlay {
  transition: none;
}
.mat-mdc-basic-chip .mat-mdc-chip-focus-overlay {
  display: none;
}

.mat-mdc-chip .mat-ripple.mat-mdc-chip-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}

.mat-mdc-chip-avatar {
  text-align: center;
  line-height: 1;
  color: var(--mat-chip-with-icon-icon-color, currentColor);
}

.mat-mdc-chip {
  position: relative;
  z-index: 0;
}

.mat-mdc-chip-action-label {
  text-align: left;
  z-index: 1;
}
[dir=rtl] .mat-mdc-chip-action-label {
  text-align: right;
}
.mat-mdc-chip.mdc-evolution-chip--with-trailing-action .mat-mdc-chip-action-label {
  position: relative;
}
.mat-mdc-chip-action-label .mat-mdc-chip-primary-focus-indicator {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
}
.mat-mdc-chip-action-label .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);
}

.mat-mdc-chip-edit::before, .mat-mdc-chip-remove::before {
  margin: calc(var(--mat-focus-indicator-border-width, 3px) * -1);
  left: 8px;
  right: 8px;
}
.mat-mdc-chip-edit::after, .mat-mdc-chip-remove::after {
  content: "";
  display: block;
  opacity: 0;
  position: absolute;
  top: -3px;
  bottom: -3px;
  left: 5px;
  right: 5px;
  border-radius: 50%;
  box-sizing: border-box;
  padding: 12px;
  margin: -12px;
  background-clip: content-box;
}
.mat-mdc-chip-edit .mat-icon, .mat-mdc-chip-remove .mat-icon {
  width: 18px;
  height: 18px;
  font-size: 18px;
  box-sizing: content-box;
}

.mat-chip-edit-input {
  cursor: text;
  display: inline-block;
  color: inherit;
  outline: 0;
}

@media (forced-colors: active) {
  .mat-mdc-chip-selected:not(.mat-mdc-chip-multiple) {
    outline-width: 3px;
  }
}

.mat-mdc-chip-action:focus-visible .mat-focus-indicator::before {
  content: "";
}

.mdc-evolution-chip__icon, .mat-mdc-chip-edit .mat-icon, .mat-mdc-chip-remove .mat-icon {
  min-height: fit-content;
}

img.mdc-evolution-chip__icon {
  min-height: 0;
}
`],encapsulation:2})}return e})();var OC=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=me({type:e});static \u0275inj=fe({providers:[SC,{provide:WP,useValue:{separatorKeyCodes:[13]}}],imports:[rC,zt]})}return e})();function ZP(e,n){if(e&1&&(_(0,"div",3)(1,"span"),C(2),b(),_(3,"mat-chip"),C(4),b()()),e&2){let t=Ve(),i=t.$implicit,r=t.$index,o=Ve();w(2),it(i.apiUrl.split("/")[2]),w(),Nt(o.getColorClass(r)),w(),it(i.tag)}}function KP(e,n){if(e&1&&(_(0,"mat-tab",0),an(1,ZP,5,4,"ng-template",1),Me(2,"app-wildfly",2),b()),e&2){let t=n.$implicit,i=n.$index,r=Ve();_e("label",Ph(t.apiUrl.split("/")[2])),w(2),_e("serverStatus",r.serverStatus)("index",i)("apiUrl",t.apiUrl)}}var md=class e{wildflyService=u(Oo);snackBar=u(cC);cdr=u(Ie);serverList=[];serverStatus=ke({});ngOnInit(){this.wildflyService.serverList().subscribe(n=>{this.serverList=n,this.cdr.detectChanges()})}getColorClass(n){return this.serverStatus()[n]?.result==="running"?"running":"down"}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=Z({type:e,selectors:[["app-root"]],decls:5,vars:0,consts:[[3,"label"],["mat-tab-label",""],[3,"serverStatus","index","apiUrl"],[1,"tab-label"]],template:function(t,i){t&1&&(_(0,"h1"),C(1,"Server Management"),b(),_(2,"mat-tab-group"),ln(3,KP,3,5,"mat-tab",0,so),b()),t&2&&(w(3),dn(i.serverList))},dependencies:[WD,Sm,xm,GD,pd,OC,NC],styles:["h1[_ngcontent-%COMP%]{text-align:center}.tab-label[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:4px}.tab-label[_ngcontent-%COMP%]   mat-chip[_ngcontent-%COMP%]{font-size:10px;height:20px;margin-bottom:6px}.running[_ngcontent-%COMP%]{background-color:#a5ff9b!important}.down[_ngcontent-%COMP%]{background-color:#ff8080!important}"]})};up(md,uD).catch(e=>console.error(e));
