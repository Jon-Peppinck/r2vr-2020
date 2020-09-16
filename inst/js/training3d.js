!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/dist/js/",r(r.s=54)}([,function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=r(5),i=n(r(7)),a=r(8),u=r(11),c=r(12),s=o.combineReducers({annotationReducer:u.annotationReducer,userReducer:c.userReducer});t.store=o.createStore(s,o.applyMiddleware(i.default,a.logger))},function(e,t,r){"use strict";(function(e,n){var o,i=r(4);o="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==e?e:n;var a=Object(i.a)(o);t.a=a}).call(this,r(3),r(6)(e))},function(e,t){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(e){"object"==typeof window&&(r=window)}e.exports=r},function(e,t,r){"use strict";function n(e){var t,r=e.Symbol;return"function"==typeof r?r.observable?t=r.observable:(t=r("observable"),r.observable=t):t="@@observable",t}r.d(t,"a",(function(){return n}))},function(e,t,r){"use strict";r.r(t),r.d(t,"__DO_NOT_USE__ActionTypes",(function(){return i})),r.d(t,"applyMiddleware",(function(){return v})),r.d(t,"bindActionCreators",(function(){return f})),r.d(t,"combineReducers",(function(){return s})),r.d(t,"compose",(function(){return g})),r.d(t,"createStore",(function(){return u}));var n=r(2),o=function(){return Math.random().toString(36).substring(7).split("").join(".")},i={INIT:"@@redux/INIT"+o(),REPLACE:"@@redux/REPLACE"+o(),PROBE_UNKNOWN_ACTION:function(){return"@@redux/PROBE_UNKNOWN_ACTION"+o()}};function a(e){if("object"!=typeof e||null===e)return!1;for(var t=e;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t}function u(e,t,r){var o;if("function"==typeof t&&"function"==typeof r||"function"==typeof r&&"function"==typeof arguments[3])throw new Error("It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function.");if("function"==typeof t&&void 0===r&&(r=t,t=void 0),void 0!==r){if("function"!=typeof r)throw new Error("Expected the enhancer to be a function.");return r(u)(e,t)}if("function"!=typeof e)throw new Error("Expected the reducer to be a function.");var c=e,s=t,l=[],f=l,d=!1;function p(){f===l&&(f=l.slice())}function h(){if(d)throw new Error("You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");return s}function g(e){if("function"!=typeof e)throw new Error("Expected the listener to be a function.");if(d)throw new Error("You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api-reference/store#subscribelistener for more details.");var t=!0;return p(),f.push(e),function(){if(t){if(d)throw new Error("You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api-reference/store#subscribelistener for more details.");t=!1,p();var r=f.indexOf(e);f.splice(r,1),l=null}}}function v(e){if(!a(e))throw new Error("Actions must be plain objects. Use custom middleware for async actions.");if(void 0===e.type)throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');if(d)throw new Error("Reducers may not dispatch actions.");try{d=!0,s=c(s,e)}finally{d=!1}for(var t=l=f,r=0;r<t.length;r++){(0,t[r])()}return e}function y(e){if("function"!=typeof e)throw new Error("Expected the nextReducer to be a function.");c=e,v({type:i.REPLACE})}function m(){var e,t=g;return(e={subscribe:function(e){if("object"!=typeof e||null===e)throw new TypeError("Expected the observer to be an object.");function r(){e.next&&e.next(h())}return r(),{unsubscribe:t(r)}}})[n.a]=function(){return this},e}return v({type:i.INIT}),(o={dispatch:v,subscribe:g,getState:h,replaceReducer:y})[n.a]=m,o}function c(e,t){var r=t&&t.type;return"Given "+(r&&'action "'+String(r)+'"'||"an action")+', reducer "'+e+'" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.'}function s(e){for(var t=Object.keys(e),r={},n=0;n<t.length;n++){var o=t[n];0,"function"==typeof e[o]&&(r[o]=e[o])}var a,u=Object.keys(r);try{!function(e){Object.keys(e).forEach((function(t){var r=e[t];if(void 0===r(void 0,{type:i.INIT}))throw new Error('Reducer "'+t+"\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.");if(void 0===r(void 0,{type:i.PROBE_UNKNOWN_ACTION()}))throw new Error('Reducer "'+t+"\" returned undefined when probed with a random type. Don't try to handle "+i.INIT+' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.')}))}(r)}catch(e){a=e}return function(e,t){if(void 0===e&&(e={}),a)throw a;for(var n=!1,o={},i=0;i<u.length;i++){var s=u[i],l=r[s],f=e[s],d=l(f,t);if(void 0===d){var p=c(s,t);throw new Error(p)}o[s]=d,n=n||d!==f}return(n=n||u.length!==Object.keys(e).length)?o:e}}function l(e,t){return function(){return t(e.apply(this,arguments))}}function f(e,t){if("function"==typeof e)return l(e,t);if("object"!=typeof e||null===e)throw new Error("bindActionCreators expected an object or a function, instead received "+(null===e?"null":typeof e)+'. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');var r={};for(var n in e){var o=e[n];"function"==typeof o&&(r[n]=l(o,t))}return r}function d(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function p(e,t){var r=Object.keys(e);return Object.getOwnPropertySymbols&&r.push.apply(r,Object.getOwnPropertySymbols(e)),t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r}function h(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(r,!0).forEach((function(t){d(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function g(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return 0===t.length?function(e){return e}:1===t.length?t[0]:t.reduce((function(e,t){return function(){return e(t.apply(void 0,arguments))}}))}function v(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(e){return function(){var r=e.apply(void 0,arguments),n=function(){throw new Error("Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.")},o={getState:r.getState,dispatch:function(){return n.apply(void 0,arguments)}},i=t.map((function(e){return e(o)}));return h({},r,{dispatch:n=g.apply(void 0,i)(r.dispatch)})}}}},function(e,t){e.exports=function(e){if(!e.webpackPolyfill){var t=Object.create(e);t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),Object.defineProperty(t,"exports",{enumerable:!0}),t.webpackPolyfill=1}return t}},function(e,t,r){"use strict";function n(e){return function(t){var r=t.dispatch,n=t.getState;return function(t){return function(o){return"function"==typeof o?o(r,n,e):t(o)}}}}r.r(t);var o=n();o.withExtraArgument=n,t.default=o},function(e,t,r){(function(e){!function(t){"use strict";function r(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}function n(e,t){Object.defineProperty(this,"kind",{value:e,enumerable:!0}),t&&t.length&&Object.defineProperty(this,"path",{value:t,enumerable:!0})}function o(e,t,r){o.super_.call(this,"E",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0}),Object.defineProperty(this,"rhs",{value:r,enumerable:!0})}function i(e,t){i.super_.call(this,"N",e),Object.defineProperty(this,"rhs",{value:t,enumerable:!0})}function a(e,t){a.super_.call(this,"D",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0})}function u(e,t,r){u.super_.call(this,"A",e),Object.defineProperty(this,"index",{value:t,enumerable:!0}),Object.defineProperty(this,"item",{value:r,enumerable:!0})}function c(e,t,r){var n=e.slice((r||t)+1||e.length);return e.length=t<0?e.length+t:t,e.push.apply(e,n),e}function s(e){var t=void 0===e?"undefined":_(e);return"object"!==t?t:e===Math?"math":null===e?"null":Array.isArray(e)?"array":"[object Date]"===Object.prototype.toString.call(e)?"date":"function"==typeof e.toString&&/^\/.*\//.test(e.toString())?"regexp":"object"}function l(e,t,r,n,f,d,p){p=p||[];var h=(f=f||[]).slice(0);if(void 0!==d){if(n){if("function"==typeof n&&n(h,d))return;if("object"===(void 0===n?"undefined":_(n))){if(n.prefilter&&n.prefilter(h,d))return;if(n.normalize){var g=n.normalize(h,d,e,t);g&&(e=g[0],t=g[1])}}}h.push(d)}"regexp"===s(e)&&"regexp"===s(t)&&(e=e.toString(),t=t.toString());var v=void 0===e?"undefined":_(e),y=void 0===t?"undefined":_(t),m="undefined"!==v||p&&p[p.length-1].lhs&&p[p.length-1].lhs.hasOwnProperty(d),b="undefined"!==y||p&&p[p.length-1].rhs&&p[p.length-1].rhs.hasOwnProperty(d);if(!m&&b)r(new i(h,t));else if(!b&&m)r(new a(h,e));else if(s(e)!==s(t))r(new o(h,e,t));else if("date"===s(e)&&e-t!=0)r(new o(h,e,t));else if("object"===v&&null!==e&&null!==t)if(p.filter((function(t){return t.lhs===e})).length)e!==t&&r(new o(h,e,t));else{if(p.push({lhs:e,rhs:t}),Array.isArray(e)){var w;for(e.length,w=0;w<e.length;w++)w>=t.length?r(new u(h,w,new a(void 0,e[w]))):l(e[w],t[w],r,n,h,w,p);for(;w<t.length;)r(new u(h,w,new i(void 0,t[w++])))}else{var O=Object.keys(e),E=Object.keys(t);O.forEach((function(o,i){var a=E.indexOf(o);a>=0?(l(e[o],t[o],r,n,h,o,p),E=c(E,a)):l(e[o],void 0,r,n,h,o,p)})),E.forEach((function(e){l(void 0,t[e],r,n,h,e,p)}))}p.length=p.length-1}else e!==t&&("number"===v&&isNaN(e)&&isNaN(t)||r(new o(h,e,t)))}function f(e,t,r,n){return n=n||[],l(e,t,(function(e){e&&n.push(e)}),r),n.length?n:void 0}function d(e,t,r){if(e&&t&&r&&r.kind){for(var n=e,o=-1,i=r.path?r.path.length-1:0;++o<i;)void 0===n[r.path[o]]&&(n[r.path[o]]="number"==typeof r.path[o]?[]:{}),n=n[r.path[o]];switch(r.kind){case"A":!function e(t,r,n){if(n.path&&n.path.length){var o,i=t[r],a=n.path.length-1;for(o=0;o<a;o++)i=i[n.path[o]];switch(n.kind){case"A":e(i[n.path[o]],n.index,n.item);break;case"D":delete i[n.path[o]];break;case"E":case"N":i[n.path[o]]=n.rhs}}else switch(n.kind){case"A":e(t[r],n.index,n.item);break;case"D":t=c(t,r);break;case"E":case"N":t[r]=n.rhs}return t}(r.path?n[r.path[o]]:n,r.index,r.item);break;case"D":delete n[r.path[o]];break;case"E":case"N":n[r.path[o]]=r.rhs}}}function p(e){return"color: "+N[e].color+"; font-weight: bold"}function h(e,t,r,n){var o=f(e,t);try{n?r.groupCollapsed("diff"):r.group("diff")}catch(e){r.log("diff")}o?o.forEach((function(e){var t=e.kind,n=function(e){var t=e.kind,r=e.path,n=e.lhs,o=e.rhs,i=e.index,a=e.item;switch(t){case"E":return[r.join("."),n,"→",o];case"N":return[r.join("."),o];case"D":return[r.join(".")];case"A":return[r.join(".")+"["+i+"]",a];default:return[]}}(e);r.log.apply(r,["%c "+N[t].text,p(t)].concat(A(n)))})):r.log("—— no diff ——");try{r.groupEnd()}catch(e){r.log("—— diff end —— ")}}function g(e,t,r,n){switch(void 0===e?"undefined":_(e)){case"object":return"function"==typeof e[n]?e[n].apply(e,A(r)):e[n];case"function":return e(t);default:return e}}function v(e,t){var r=t.logger,n=t.actionTransformer,o=t.titleFormatter,i=void 0===o?function(e){var t=e.timestamp,r=e.duration;return function(e,n,o){var i=["action"];return i.push("%c"+String(e.type)),t&&i.push("%c@ "+n),r&&i.push("%c(in "+o.toFixed(2)+" ms)"),i.join(" ")}}(t):o,a=t.collapsed,u=t.colors,c=t.level,s=t.diff,l=void 0===t.titleFormatter;e.forEach((function(o,f){var d=o.started,p=o.startedTime,v=o.action,y=o.prevState,m=o.error,b=o.took,w=o.nextState,E=e[f+1];E&&(w=E.prevState,b=E.started-d);var _=n(v),A="function"==typeof a?a((function(){return w}),v,o):a,x=O(p),N=u.title?"color: "+u.title(_)+";":"",j=["color: gray; font-weight: lighter;"];j.push(N),t.timestamp&&j.push("color: gray; font-weight: lighter;"),t.duration&&j.push("color: gray; font-weight: lighter;");var S=i(_,x,b);try{A?u.title&&l?r.groupCollapsed.apply(r,["%c "+S].concat(j)):r.groupCollapsed(S):u.title&&l?r.group.apply(r,["%c "+S].concat(j)):r.group(S)}catch(e){r.log(S)}var P=g(c,_,[y],"prevState"),k=g(c,_,[_],"action"),T=g(c,_,[m,y],"error"),I=g(c,_,[w],"nextState");if(P)if(u.prevState){var C="color: "+u.prevState(y)+"; font-weight: bold";r[P]("%c prev state",C,y)}else r[P]("prev state",y);if(k)if(u.action){var D="color: "+u.action(_)+"; font-weight: bold";r[k]("%c action    ",D,_)}else r[k]("action    ",_);if(m&&T)if(u.error){var M="color: "+u.error(m,y)+"; font-weight: bold;";r[T]("%c error     ",M,m)}else r[T]("error     ",m);if(I)if(u.nextState){var R="color: "+u.nextState(w)+"; font-weight: bold";r[I]("%c next state",R,w)}else r[I]("next state",w);s&&h(y,w,r,A);try{r.groupEnd()}catch(e){r.log("—— log end ——")}}))}function y(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Object.assign({},j,e),r=t.logger,n=t.stateTransformer,o=t.errorTransformer,i=t.predicate,a=t.logErrors,u=t.diffPredicate;if(void 0===r)return function(){return function(e){return function(t){return e(t)}}};if(e.getState&&e.dispatch)return console.error("[redux-logger] redux-logger not installed. Make sure to pass logger instance as middleware:\n// Logger with default options\nimport { logger } from 'redux-logger'\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n// Or you can create your own logger with custom options http://bit.ly/redux-logger-options\nimport createLogger from 'redux-logger'\nconst logger = createLogger({\n  // ...options\n});\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n"),function(){return function(e){return function(t){return e(t)}}};var c=[];return function(e){var r=e.getState;return function(e){return function(s){if("function"==typeof i&&!i(r,s))return e(s);var l={};c.push(l),l.started=E.now(),l.startedTime=new Date,l.prevState=n(r()),l.action=s;var f=void 0;if(a)try{f=e(s)}catch(e){l.error=o(e)}else f=e(s);l.took=E.now()-l.started,l.nextState=n(r());var d=t.diff&&"function"==typeof u?u(r,s):t.diff;if(v(c,Object.assign({},t,{diff:d})),c.length=0,l.error)throw l.error;return f}}}}var m,b,w=function(e,t){return function(e,t){return new Array(t+1).join(e)}("0",t-e.toString().length)+e},O=function(e){return w(e.getHours(),2)+":"+w(e.getMinutes(),2)+":"+w(e.getSeconds(),2)+"."+w(e.getMilliseconds(),3)},E="undefined"!=typeof performance&&null!==performance&&"function"==typeof performance.now?performance:Date,_="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},A=function(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)},x=[];m="object"===(void 0===e?"undefined":_(e))&&e?e:"undefined"!=typeof window?window:{},(b=m.DeepDiff)&&x.push((function(){void 0!==b&&m.DeepDiff===f&&(m.DeepDiff=b,b=void 0)})),r(o,n),r(i,n),r(a,n),r(u,n),Object.defineProperties(f,{diff:{value:f,enumerable:!0},observableDiff:{value:l,enumerable:!0},applyDiff:{value:function(e,t,r){e&&t&&l(e,t,(function(n){r&&!r(e,t,n)||d(e,t,n)}))},enumerable:!0},applyChange:{value:d,enumerable:!0},revertChange:{value:function(e,t,r){if(e&&t&&r&&r.kind){var n,o,i=e;for(o=r.path.length-1,n=0;n<o;n++)void 0===i[r.path[n]]&&(i[r.path[n]]={}),i=i[r.path[n]];switch(r.kind){case"A":!function e(t,r,n){if(n.path&&n.path.length){var o,i=t[r],a=n.path.length-1;for(o=0;o<a;o++)i=i[n.path[o]];switch(n.kind){case"A":e(i[n.path[o]],n.index,n.item);break;case"D":case"E":i[n.path[o]]=n.lhs;break;case"N":delete i[n.path[o]]}}else switch(n.kind){case"A":e(t[r],n.index,n.item);break;case"D":case"E":t[r]=n.lhs;break;case"N":t=c(t,r)}return t}(i[r.path[n]],r.index,r.item);break;case"D":case"E":i[r.path[n]]=r.lhs;break;case"N":delete i[r.path[n]]}}},enumerable:!0},isConflict:{value:function(){return void 0!==b},enumerable:!0},noConflict:{value:function(){return x&&(x.forEach((function(e){e()})),x=null),f},enumerable:!0}});var N={E:{color:"#2196F3",text:"CHANGED:"},N:{color:"#4CAF50",text:"ADDED:"},D:{color:"#F44336",text:"DELETED:"},A:{color:"#2196F3",text:"ARRAY:"}},j={level:"log",logger:console,logErrors:!0,collapsed:void 0,predicate:void 0,duration:!1,timestamp:!0,stateTransformer:function(e){return e},actionTransformer:function(e){return e},errorTransformer:function(e){return e},colors:{title:function(){return"inherit"},prevState:function(){return"#9E9E9E"},action:function(){return"#03A9F4"},nextState:function(){return"#4CAF50"},error:function(){return"#F20404"}},diff:!1,diffPredicate:void 0,transformer:void 0},S=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.dispatch,r=e.getState;return"function"==typeof t||"function"==typeof r?y()({dispatch:t,getState:r}):void console.error("\n[redux-logger v3] BREAKING CHANGE\n[redux-logger v3] Since 3.0.0 redux-logger exports by default logger with default settings.\n[redux-logger v3] Change\n[redux-logger v3] import createLogger from 'redux-logger'\n[redux-logger v3] to\n[redux-logger v3] import { createLogger } from 'redux-logger'\n")};t.defaults=j,t.createLogger=y,t.logger=S,t.default=S,Object.defineProperty(t,"__esModule",{value:!0})}(t)}).call(this,r(3))},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(1),o=r(13);t.boundPushNewImage=function(e){return n.store.dispatch(function(e){return{type:o.NEW_IMAGE,image:e}}(e))},t.boundPostAnnotation=function(e){return n.store.dispatch(function(e){return{type:o.POST_ANNOTATION,marker:e}}(e))},t.boundUpdateAnnotation=function(e){return n.store.dispatch(function(e){return{type:o.UPDATE_ANNOTATION,marker:e}}(e))}},,function(e,t,r){"use strict";var n=this&&this.__spreadArrays||function(){for(var e=0,t=0,r=arguments.length;t<r;t++)e+=arguments[t].length;var n=Array(e),o=0;for(t=0;t<r;t++)for(var i=arguments[t],a=0,u=i.length;a<u;a++,o++)n[o]=i[a];return n};Object.defineProperty(t,"__esModule",{value:!0});var o=[];t.annotationReducer=function(e,t){void 0===e&&(e=o);var r=e.length;switch(t.type){case"NEW_IMAGE":var i={image:{extension:t.image.extension,fullName:t.image.fullName,name:t.image.name,isAnnotated:!1,uniqueNumberId:r},markers:[]},a=n(e);return a.length>=1&&(a[r-1].image.isAnnotated=!0),i.image.uniqueNumberId++,n(a,[i]);case"POST_ANNOTATION":var u=n(e);return u[r-1].markers.push(t.marker),u;case"UPDATE_ANNOTATION":var c=n(e),s=c[r-1].markers,l=s.findIndex((function(e){return e.id===t.marker.id}));return s[l]=t.marker,c;default:return e}}},function(e,t,r){"use strict";var n=this&&this.__assign||function(){return(n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0});var o={name:""};t.userReducer=function(e,t){switch(void 0===e&&(e=o),t.type){case"GET_USER":return n({},t.user);default:return e}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.NEW_IMAGE="NEW_IMAGE",t.POST_ANNOTATION="POST_ANNOTATION",t.UPDATE_ANNOTATION="UPDATE_ANNOTATION"},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(1),o=r(15);t.default=function(e){return n.store.dispatch(function(e){return{type:o.GET_USER,user:e}}(e))}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.GET_USER="GET_USER"},function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=r(1),i=r(9),a=n(r(17));t.getImage=function(){var e=document.getElementById("canvas").getAttribute("class").split("/").pop(),t=e.split(".");return{fullName:e,name:t[0],extension:t[1],isAnnotated:!1,uniqueNumberId:o.store.getState().annotationReducer.length}},t.imageObserver=function(){var e=t.getImage(),r=[];r.push(e.name),new MutationObserver((function(){var e=t.getImage(),n=e.name;r.includes(n)||(a.default(),r.push(n),i.boundPushNewImage(e))})).observe(document.getElementById("canvas"),{attributes:!0,attributeFilter:["src"]})}},function(e,t,r){"use strict";var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function a(e){try{c(n.next(e))}catch(e){i(e)}}function u(e){try{c(n.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,u)}c((n=n.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=a.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}};Object.defineProperty(t,"__esModule",{value:!0});var i=r(1);t.default=function(){var e=i.store.getState(),t=e.annotationReducer,r=e.userReducer,a=t[t.length-1],u=a.image,c=u.fullName,s=u.name,l=u.extension,f=a.markers,d=r.name;f.forEach((function(e){var t=e.id,r=e.isCoral,i=e.x,a=e.y,u=e.z;!function(e){n(void 0,void 0,void 0,(function(){var t,r;return o(this,(function(n){switch(n.label){case 0:return n.trys.push([0,2,,3]),[4,fetch("http://localhost:3000/api/3d/training",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})];case 1:if(t=n.sent(),![200,201].includes(t.status))throw new Error("Unable to post annotations!");return console.log(t.status,"- Request complete! response:",t),[3,3];case 2:throw r=n.sent(),new Error(r+" - Unable to post annotation!");case 3:return[2]}}))}))}({image_file_name:c,image_file_id:s,image_file_extension:l,site:t,x:i,y:a,z:u,is_coral:r,observer:d,observation_id:d+123})}))}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(1);t.default=function(e){var t=n.store.getState().annotationReducer;return t[t.length-1].markers.findIndex((function(t){return t.id===e}))}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CORAL_COLOR="#FF95BC",t.NOT_CORAL_COLOR="#969696",t.setMarkerColor=function(e,r){var n=document.getElementById("markerBoundary"+e);1===r?null==n||n.setAttribute("color",t.CORAL_COLOR):null==n||n.setAttribute("color",t.NOT_CORAL_COLOR)}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e,t){void 0===t&&(t="hide");var r=document.getElementById("menuCoral"+e),n=document.getElementById("menuNotCoral"+e);"show"===t?(r.setAttribute("visible","true"),n.setAttribute("visible","true")):(r.setAttribute("visible","false"),n.setAttribute("visible","false"))}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=r(1),i=r(9),a=n(r(14)),u=r(16),c=n(r(18)),s=r(19),l=n(r(20)),f="",d=function(){return o.store.getState()};d(),o.store.subscribe(d),document.addEventListener("DOMContentLoaded",(function(){var e={name:document.getElementById("user").className};a.default(e);var t=u.getImage();i.boundPushNewImage(t),u.imageObserver()})),AFRAME.registerComponent("raycaster-listen",{init:function(){this.el.addEventListener("raycaster-intersected",(function(e){var t=e.detail.intersection.point;if(![t.x,t.y,t.z].every((function(e){return 0===e}))&&(f=e.currentTarget.id)){var r=f.match(/(\d+)/);if(r){var n=+r[0];if(!["menuCoral"+n,"menuNotCoral"+n].includes(f))return;l.default(n,"hide");var o=void 0,a=document.getElementById("markerContainer"+n),u=a.getAttribute("position").x,d=a.getAttribute("position").y,p=a.getAttribute("position").y,h=c.default(n);f.startsWith("menuCoral")?(s.setMarkerColor(n,1),o={id:n,isCoral:1,x:u,y:d,z:p}):(s.setMarkerColor(n,0),o={id:n,isCoral:0,x:u,y:d,z:p}),-1===h?i.boundPostAnnotation(o):i.boundUpdateAnnotation(o)}}})),this.el.addEventListener("raycaster-intersected-cleared",(function(){""!==f&&(f="")}))}}),AFRAME.registerComponent("toggle-menu-listen",{init:function(){document.querySelector("[button-controls]").addEventListener("buttondown",(function(){var e=f.match(/(\d+)/);if(e){var t=+e[0];["markerInner"+t,"markerBoundary"+t].includes(f)&&l.default(t,"show")}}))}}),AFRAME.registerComponent("r2vr-message-router",{schema:{host:{type:"string",default:"localhost"},port:{type:"number",default:8080}},init:function(){var e=new WebSocket("ws://"+this.data.host+":"+this.data.port);e.onopen=function(){console.log("r2vr-message-router: Established connection with server session.")},e.onmessage=function(e){console.log(e),JSON.parse(e.data).map((function(e){var t="";if(e.id&&(t=document.querySelector("#"+e.id),console.log(77,t,e.id)),"event"==e.class)t.emit(e.message.eventName,e.message.eventDetail,e.message.bubbles);else if("update"==e.class)console.log(555,t,e.id,e.component),t.setAttribute(e.component,e.attributes,e.replaces_component);else if("remove_component"==e.class)t.removeAttribute(e.component);else if("remove_entity"==e.class)t.removeFromParent(),t.parentNode.removeChild(t);else if("remove_entity_class"==e.class){var r=document.getElementsByClassName(""+e.className);if(0===r.length)throw new Error(e.className+" does not pertain to the class of any DOM elements.");for(;r[0];)r[0].parentNode.removeChild(r[0])}else{if("add_entity"!=e.class)throw new Error("r2vr-message-router received a message of unknown class.");console.log(e.tag);if(!["box","camera","circle","cone","cursor","curvedimage","cylinder","dodecahedron","gltf-model","icosahedron","image","light","link","obj-model","octahedron","plane","ring","sky","sound","sphere","tetrahedron","text","torus-knot","torus","triangle","video","videosphere"].includes(e.tag))throw new Error(e.tag+" is not a primitive A-Frame entity.");var n=document.querySelector("a-scene");if(e.parentEntityId&&(n=document.querySelector("#"+e.parentEntityId)),!n)throw new Error(e.parentEntityId+" does not pertain to the ID of a DOM element.");var o=document.createElement("a-"+e.tag);console.log(o),o.id=e.id,e.className&&o.classList.add(""+e.className),n.appendChild(o)}}))},this.el.addEventListener("r_server_message",(function(t){e.send(t.detail)}))}})}]);