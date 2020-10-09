!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/dist/js/",n(n.s=82)}([function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=n(6),i=r(n(8)),a=n(9),u=n(18),c=n(19),s=n(20),l=n(21),f=n(22),d=o.combineReducers({annotationReducer:u.annotationReducer,evaluationReducer:c.evaluationReducer,imageReducer:s.imageReducer,metaDataReducer:l.metaDataReducer,userReducer:f.userReducer});t.store=o.createStore(d,o.applyMiddleware(i.default,a.logger))},,function(e,t,n){"use strict";(function(e,r){var o,i=n(4);o="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==e?e:r;var a=Object(i.a)(o);t.a=a}).call(this,n(3),n(7)(e))},function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){"use strict";function r(e){var t,n=e.Symbol;return"function"==typeof n?n.observable?t=n.observable:(t=n("observable"),n.observable=t):t="@@observable",t}n.d(t,"a",(function(){return r}))},,function(e,t,n){"use strict";n.r(t),n.d(t,"__DO_NOT_USE__ActionTypes",(function(){return i})),n.d(t,"applyMiddleware",(function(){return g})),n.d(t,"bindActionCreators",(function(){return f})),n.d(t,"combineReducers",(function(){return s})),n.d(t,"compose",(function(){return v})),n.d(t,"createStore",(function(){return u}));var r=n(2),o=function(){return Math.random().toString(36).substring(7).split("").join(".")},i={INIT:"@@redux/INIT"+o(),REPLACE:"@@redux/REPLACE"+o(),PROBE_UNKNOWN_ACTION:function(){return"@@redux/PROBE_UNKNOWN_ACTION"+o()}};function a(e){if("object"!=typeof e||null===e)return!1;for(var t=e;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t}function u(e,t,n){var o;if("function"==typeof t&&"function"==typeof n||"function"==typeof n&&"function"==typeof arguments[3])throw new Error("It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function.");if("function"==typeof t&&void 0===n&&(n=t,t=void 0),void 0!==n){if("function"!=typeof n)throw new Error("Expected the enhancer to be a function.");return n(u)(e,t)}if("function"!=typeof e)throw new Error("Expected the reducer to be a function.");var c=e,s=t,l=[],f=l,d=!1;function p(){f===l&&(f=l.slice())}function h(){if(d)throw new Error("You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");return s}function v(e){if("function"!=typeof e)throw new Error("Expected the listener to be a function.");if(d)throw new Error("You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api-reference/store#subscribelistener for more details.");var t=!0;return p(),f.push(e),function(){if(t){if(d)throw new Error("You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api-reference/store#subscribelistener for more details.");t=!1,p();var n=f.indexOf(e);f.splice(n,1),l=null}}}function g(e){if(!a(e))throw new Error("Actions must be plain objects. Use custom middleware for async actions.");if(void 0===e.type)throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');if(d)throw new Error("Reducers may not dispatch actions.");try{d=!0,s=c(s,e)}finally{d=!1}for(var t=l=f,n=0;n<t.length;n++){(0,t[n])()}return e}function b(e){if("function"!=typeof e)throw new Error("Expected the nextReducer to be a function.");c=e,g({type:i.REPLACE})}function y(){var e,t=v;return(e={subscribe:function(e){if("object"!=typeof e||null===e)throw new TypeError("Expected the observer to be an object.");function n(){e.next&&e.next(h())}return n(),{unsubscribe:t(n)}}})[r.a]=function(){return this},e}return g({type:i.INIT}),(o={dispatch:g,subscribe:v,getState:h,replaceReducer:b})[r.a]=y,o}function c(e,t){var n=t&&t.type;return"Given "+(n&&'action "'+String(n)+'"'||"an action")+', reducer "'+e+'" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.'}function s(e){for(var t=Object.keys(e),n={},r=0;r<t.length;r++){var o=t[r];0,"function"==typeof e[o]&&(n[o]=e[o])}var a,u=Object.keys(n);try{!function(e){Object.keys(e).forEach((function(t){var n=e[t];if(void 0===n(void 0,{type:i.INIT}))throw new Error('Reducer "'+t+"\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.");if(void 0===n(void 0,{type:i.PROBE_UNKNOWN_ACTION()}))throw new Error('Reducer "'+t+"\" returned undefined when probed with a random type. Don't try to handle "+i.INIT+' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.')}))}(n)}catch(e){a=e}return function(e,t){if(void 0===e&&(e={}),a)throw a;for(var r=!1,o={},i=0;i<u.length;i++){var s=u[i],l=n[s],f=e[s],d=l(f,t);if(void 0===d){var p=c(s,t);throw new Error(p)}o[s]=d,r=r||d!==f}return(r=r||u.length!==Object.keys(e).length)?o:e}}function l(e,t){return function(){return t(e.apply(this,arguments))}}function f(e,t){if("function"==typeof e)return l(e,t);if("object"!=typeof e||null===e)throw new Error("bindActionCreators expected an object or a function, instead received "+(null===e?"null":typeof e)+'. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');var n={};for(var r in e){var o=e[r];"function"==typeof o&&(n[r]=l(o,t))}return n}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function p(e,t){var n=Object.keys(e);return Object.getOwnPropertySymbols&&n.push.apply(n,Object.getOwnPropertySymbols(e)),t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n}function h(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(n,!0).forEach((function(t){d(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function v(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return 0===t.length?function(e){return e}:1===t.length?t[0]:t.reduce((function(e,t){return function(){return e(t.apply(void 0,arguments))}}))}function g(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){return function(){var n=e.apply(void 0,arguments),r=function(){throw new Error("Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.")},o={getState:n.getState,dispatch:function(){return r.apply(void 0,arguments)}},i=t.map((function(e){return e(o)}));return h({},n,{dispatch:r=v.apply(void 0,i)(n.dispatch)})}}}},function(e,t){e.exports=function(e){if(!e.webpackPolyfill){var t=Object.create(e);t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),Object.defineProperty(t,"exports",{enumerable:!0}),t.webpackPolyfill=1}return t}},function(e,t,n){"use strict";function r(e){return function(t){var n=t.dispatch,r=t.getState;return function(t){return function(o){return"function"==typeof o?o(n,r,e):t(o)}}}}n.r(t);var o=r();o.withExtraArgument=r,t.default=o},function(e,t,n){(function(e){!function(t){"use strict";function n(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}function r(e,t){Object.defineProperty(this,"kind",{value:e,enumerable:!0}),t&&t.length&&Object.defineProperty(this,"path",{value:t,enumerable:!0})}function o(e,t,n){o.super_.call(this,"E",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0}),Object.defineProperty(this,"rhs",{value:n,enumerable:!0})}function i(e,t){i.super_.call(this,"N",e),Object.defineProperty(this,"rhs",{value:t,enumerable:!0})}function a(e,t){a.super_.call(this,"D",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0})}function u(e,t,n){u.super_.call(this,"A",e),Object.defineProperty(this,"index",{value:t,enumerable:!0}),Object.defineProperty(this,"item",{value:n,enumerable:!0})}function c(e,t,n){var r=e.slice((n||t)+1||e.length);return e.length=t<0?e.length+t:t,e.push.apply(e,r),e}function s(e){var t=void 0===e?"undefined":_(e);return"object"!==t?t:e===Math?"math":null===e?"null":Array.isArray(e)?"array":"[object Date]"===Object.prototype.toString.call(e)?"date":"function"==typeof e.toString&&/^\/.*\//.test(e.toString())?"regexp":"object"}function l(e,t,n,r,f,d,p){p=p||[];var h=(f=f||[]).slice(0);if(void 0!==d){if(r){if("function"==typeof r&&r(h,d))return;if("object"===(void 0===r?"undefined":_(r))){if(r.prefilter&&r.prefilter(h,d))return;if(r.normalize){var v=r.normalize(h,d,e,t);v&&(e=v[0],t=v[1])}}}h.push(d)}"regexp"===s(e)&&"regexp"===s(t)&&(e=e.toString(),t=t.toString());var g=void 0===e?"undefined":_(e),b=void 0===t?"undefined":_(t),y="undefined"!==g||p&&p[p.length-1].lhs&&p[p.length-1].lhs.hasOwnProperty(d),m="undefined"!==b||p&&p[p.length-1].rhs&&p[p.length-1].rhs.hasOwnProperty(d);if(!y&&m)n(new i(h,t));else if(!m&&y)n(new a(h,e));else if(s(e)!==s(t))n(new o(h,e,t));else if("date"===s(e)&&e-t!=0)n(new o(h,e,t));else if("object"===g&&null!==e&&null!==t)if(p.filter((function(t){return t.lhs===e})).length)e!==t&&n(new o(h,e,t));else{if(p.push({lhs:e,rhs:t}),Array.isArray(e)){var O;for(e.length,O=0;O<e.length;O++)O>=t.length?n(new u(h,O,new a(void 0,e[O]))):l(e[O],t[O],n,r,h,O,p);for(;O<t.length;)n(new u(h,O,new i(void 0,t[O++])))}else{var E=Object.keys(e),w=Object.keys(t);E.forEach((function(o,i){var a=w.indexOf(o);a>=0?(l(e[o],t[o],n,r,h,o,p),w=c(w,a)):l(e[o],void 0,n,r,h,o,p)})),w.forEach((function(e){l(void 0,t[e],n,r,h,e,p)}))}p.length=p.length-1}else e!==t&&("number"===g&&isNaN(e)&&isNaN(t)||n(new o(h,e,t)))}function f(e,t,n,r){return r=r||[],l(e,t,(function(e){e&&r.push(e)}),n),r.length?r:void 0}function d(e,t,n){if(e&&t&&n&&n.kind){for(var r=e,o=-1,i=n.path?n.path.length-1:0;++o<i;)void 0===r[n.path[o]]&&(r[n.path[o]]="number"==typeof n.path[o]?[]:{}),r=r[n.path[o]];switch(n.kind){case"A":!function e(t,n,r){if(r.path&&r.path.length){var o,i=t[n],a=r.path.length-1;for(o=0;o<a;o++)i=i[r.path[o]];switch(r.kind){case"A":e(i[r.path[o]],r.index,r.item);break;case"D":delete i[r.path[o]];break;case"E":case"N":i[r.path[o]]=r.rhs}}else switch(r.kind){case"A":e(t[n],r.index,r.item);break;case"D":t=c(t,n);break;case"E":case"N":t[n]=r.rhs}return t}(n.path?r[n.path[o]]:r,n.index,n.item);break;case"D":delete r[n.path[o]];break;case"E":case"N":r[n.path[o]]=n.rhs}}}function p(e){return"color: "+T[e].color+"; font-weight: bold"}function h(e,t,n,r){var o=f(e,t);try{r?n.groupCollapsed("diff"):n.group("diff")}catch(e){n.log("diff")}o?o.forEach((function(e){var t=e.kind,r=function(e){var t=e.kind,n=e.path,r=e.lhs,o=e.rhs,i=e.index,a=e.item;switch(t){case"E":return[n.join("."),r,"→",o];case"N":return[n.join("."),o];case"D":return[n.join(".")];case"A":return[n.join(".")+"["+i+"]",a];default:return[]}}(e);n.log.apply(n,["%c "+T[t].text,p(t)].concat(A(r)))})):n.log("—— no diff ——");try{n.groupEnd()}catch(e){n.log("—— diff end —— ")}}function v(e,t,n,r){switch(void 0===e?"undefined":_(e)){case"object":return"function"==typeof e[r]?e[r].apply(e,A(n)):e[r];case"function":return e(t);default:return e}}function g(e,t){var n=t.logger,r=t.actionTransformer,o=t.titleFormatter,i=void 0===o?function(e){var t=e.timestamp,n=e.duration;return function(e,r,o){var i=["action"];return i.push("%c"+String(e.type)),t&&i.push("%c@ "+r),n&&i.push("%c(in "+o.toFixed(2)+" ms)"),i.join(" ")}}(t):o,a=t.collapsed,u=t.colors,c=t.level,s=t.diff,l=void 0===t.titleFormatter;e.forEach((function(o,f){var d=o.started,p=o.startedTime,g=o.action,b=o.prevState,y=o.error,m=o.took,O=o.nextState,w=e[f+1];w&&(O=w.prevState,m=w.started-d);var _=r(g),A="function"==typeof a?a((function(){return O}),g,o):a,N=E(p),T=u.title?"color: "+u.title(_)+";":"",S=["color: gray; font-weight: lighter;"];S.push(T),t.timestamp&&S.push("color: gray; font-weight: lighter;"),t.duration&&S.push("color: gray; font-weight: lighter;");var P=i(_,N,m);try{A?u.title&&l?n.groupCollapsed.apply(n,["%c "+P].concat(S)):n.groupCollapsed(P):u.title&&l?n.group.apply(n,["%c "+P].concat(S)):n.group(P)}catch(e){n.log(P)}var j=v(c,_,[b],"prevState"),x=v(c,_,[_],"action"),I=v(c,_,[y,b],"error"),C=v(c,_,[O],"nextState");if(j)if(u.prevState){var k="color: "+u.prevState(b)+"; font-weight: bold";n[j]("%c prev state",k,b)}else n[j]("prev state",b);if(x)if(u.action){var R="color: "+u.action(_)+"; font-weight: bold";n[x]("%c action    ",R,_)}else n[x]("action    ",_);if(y&&I)if(u.error){var M="color: "+u.error(y,b)+"; font-weight: bold;";n[I]("%c error     ",M,y)}else n[I]("error     ",y);if(C)if(u.nextState){var D="color: "+u.nextState(O)+"; font-weight: bold";n[C]("%c next state",D,O)}else n[C]("next state",O);s&&h(b,O,n,A);try{n.groupEnd()}catch(e){n.log("—— log end ——")}}))}function b(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Object.assign({},S,e),n=t.logger,r=t.stateTransformer,o=t.errorTransformer,i=t.predicate,a=t.logErrors,u=t.diffPredicate;if(void 0===n)return function(){return function(e){return function(t){return e(t)}}};if(e.getState&&e.dispatch)return console.error("[redux-logger] redux-logger not installed. Make sure to pass logger instance as middleware:\n// Logger with default options\nimport { logger } from 'redux-logger'\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n// Or you can create your own logger with custom options http://bit.ly/redux-logger-options\nimport createLogger from 'redux-logger'\nconst logger = createLogger({\n  // ...options\n});\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n"),function(){return function(e){return function(t){return e(t)}}};var c=[];return function(e){var n=e.getState;return function(e){return function(s){if("function"==typeof i&&!i(n,s))return e(s);var l={};c.push(l),l.started=w.now(),l.startedTime=new Date,l.prevState=r(n()),l.action=s;var f=void 0;if(a)try{f=e(s)}catch(e){l.error=o(e)}else f=e(s);l.took=w.now()-l.started,l.nextState=r(n());var d=t.diff&&"function"==typeof u?u(n,s):t.diff;if(g(c,Object.assign({},t,{diff:d})),c.length=0,l.error)throw l.error;return f}}}}var y,m,O=function(e,t){return function(e,t){return new Array(t+1).join(e)}("0",t-e.toString().length)+e},E=function(e){return O(e.getHours(),2)+":"+O(e.getMinutes(),2)+":"+O(e.getSeconds(),2)+"."+O(e.getMilliseconds(),3)},w="undefined"!=typeof performance&&null!==performance&&"function"==typeof performance.now?performance:Date,_="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},A=function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)},N=[];y="object"===(void 0===e?"undefined":_(e))&&e?e:"undefined"!=typeof window?window:{},(m=y.DeepDiff)&&N.push((function(){void 0!==m&&y.DeepDiff===f&&(y.DeepDiff=m,m=void 0)})),n(o,r),n(i,r),n(a,r),n(u,r),Object.defineProperties(f,{diff:{value:f,enumerable:!0},observableDiff:{value:l,enumerable:!0},applyDiff:{value:function(e,t,n){e&&t&&l(e,t,(function(r){n&&!n(e,t,r)||d(e,t,r)}))},enumerable:!0},applyChange:{value:d,enumerable:!0},revertChange:{value:function(e,t,n){if(e&&t&&n&&n.kind){var r,o,i=e;for(o=n.path.length-1,r=0;r<o;r++)void 0===i[n.path[r]]&&(i[n.path[r]]={}),i=i[n.path[r]];switch(n.kind){case"A":!function e(t,n,r){if(r.path&&r.path.length){var o,i=t[n],a=r.path.length-1;for(o=0;o<a;o++)i=i[r.path[o]];switch(r.kind){case"A":e(i[r.path[o]],r.index,r.item);break;case"D":case"E":i[r.path[o]]=r.lhs;break;case"N":delete i[r.path[o]]}}else switch(r.kind){case"A":e(t[n],r.index,r.item);break;case"D":case"E":t[n]=r.lhs;break;case"N":t=c(t,n)}return t}(i[n.path[r]],n.index,n.item);break;case"D":case"E":i[n.path[r]]=n.lhs;break;case"N":delete i[n.path[r]]}}},enumerable:!0},isConflict:{value:function(){return void 0!==m},enumerable:!0},noConflict:{value:function(){return N&&(N.forEach((function(e){e()})),N=null),f},enumerable:!0}});var T={E:{color:"#2196F3",text:"CHANGED:"},N:{color:"#4CAF50",text:"ADDED:"},D:{color:"#F44336",text:"DELETED:"},A:{color:"#2196F3",text:"ARRAY:"}},S={level:"log",logger:console,logErrors:!0,collapsed:void 0,predicate:void 0,duration:!1,timestamp:!0,stateTransformer:function(e){return e},actionTransformer:function(e){return e},errorTransformer:function(e){return e},colors:{title:function(){return"inherit"},prevState:function(){return"#9E9E9E"},action:function(){return"#03A9F4"},nextState:function(){return"#4CAF50"},error:function(){return"#F20404"}},diff:!1,diffPredicate:void 0,transformer:void 0},P=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.dispatch,n=e.getState;return"function"==typeof t||"function"==typeof n?b()({dispatch:t,getState:n}):void console.error("\n[redux-logger v3] BREAKING CHANGE\n[redux-logger v3] Since 3.0.0 redux-logger exports by default logger with default settings.\n[redux-logger v3] Change\n[redux-logger v3] import createLogger from 'redux-logger'\n[redux-logger v3] to\n[redux-logger v3] import { createLogger } from 'redux-logger'\n")};t.defaults=S,t.createLogger=b,t.logger=P,t.default=P,Object.defineProperty(t,"__esModule",{value:!0})}(t)}).call(this,n(3))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CORAL_COLOR="#FF95BC",t.NOT_CORAL_COLOR="#969696",t.setMarkerColor=function(e,n){var r=document.getElementById("markerBoundary"+e);1===n?null==r||r.setAttribute("color",t.CORAL_COLOR):null==r||r.setAttribute("color",t.NOT_CORAL_COLOR)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e,t){void 0===t&&(t="hide");var n=document.getElementById("menuCoral"+e),r=document.getElementById("menuNotCoral"+e);"show"===t?(n.setAttribute("visible","true"),r.setAttribute("visible","true")):(n.setAttribute("visible","false"),r.setAttribute("visible","false"))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=n(23);t.boundPushNewImage=function(e){return r.store.dispatch(function(e){return{type:o.NEW_IMAGE,image:e}}(e))},t.boundPostAnnotation=function(e){return r.store.dispatch(function(e){return{type:o.POST_ANNOTATION,marker:e}}(e))},t.boundUpdateAnnotation=function(e){return r.store.dispatch(function(e){return{type:o.UPDATE_ANNOTATION,marker:e}}(e))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={1:"One",2:"Two",3:"Three",4:"Four"};t.EVALUATION_RESPONSE_COLOR="#00FF00",t.EVALUATION_RESPONSE_DEFAULT_COLOR="#FFFFFF",t.setOptionColor=function(e){var n=r[e];document.getElementById("option"+n+"Plane").setAttribute("color",t.EVALUATION_RESPONSE_COLOR)},t.resetOptionColor=function(){Object.values(r).forEach((function(e){document.getElementById("option"+e+"Plane").setAttribute("color",t.EVALUATION_RESPONSE_DEFAULT_COLOR)}))},t.setPostColor=function(){document.getElementById("postPlane").setAttribute("color",t.EVALUATION_RESPONSE_COLOR)},t.resetPostColor=function(){document.getElementById("postPlane").setAttribute("color",t.EVALUATION_RESPONSE_DEFAULT_COLOR)}},,function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function u(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,u)}c((r=r.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=a.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}};Object.defineProperty(t,"__esModule",{value:!0});var i=n(0);t.default=function(){var e=i.store.getState(),t=e.annotationReducer,n=e.userReducer,a=t[t.length-1],u=a.image,c=u.fullName,s=u.name,l=u.extension,f=a.markers,d=n.name,p=d+"-"+(new Date).toISOString();f.forEach((function(e){var t=e.id,n=e.isCoral,a=e.x,u=e.y;!function(e){r(void 0,void 0,void 0,(function(){var t,n,r,a,u;return o(this,(function(o){switch(o.label){case 0:t=i.store.getState().metaDataReducer,n=t.module,r=t.annotationType,o.label=1;case 1:return o.trys.push([1,3,,4]),[4,fetch("https://r2vr.herokuapp.com/api/"+n+"/"+r,{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})];case 2:if(a=o.sent(),![200,201].includes(a.status))throw new Error("Unable to post annotations!");return console.log(a.status,"- Request complete! response:",a),[3,4];case 3:throw u=o.sent(),new Error(u+" - Unable to post annotation!");case 4:return[2]}}))}))}({image_file_name:c,image_file_id:s,image_file_extension:l,site:t,x:a,y:u,is_coral:n,observer:d,observation_id:p})}))}},,,function(e,t,n){"use strict";var r=this&&this.__spreadArrays||function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),o=0;for(t=0;t<n;t++)for(var i=arguments[t],a=0,u=i.length;a<u;a++,o++)r[o]=i[a];return r};Object.defineProperty(t,"__esModule",{value:!0});var o=[];t.annotationReducer=function(e,t){void 0===e&&(e=o);var n=e.length;switch(t.type){case"NEW_IMAGE":var i={image:{extension:t.image.extension,fullName:t.image.fullName,name:t.image.name,isAnnotated:!1,uniqueNumberId:n},markers:[]},a=r(e);return a.length>=1&&(a[n-1].image.isAnnotated=!0),i.image.uniqueNumberId++,r(a,[i]);case"POST_ANNOTATION":var u=r(e);return u[n-1].markers.push(t.marker),u;case"UPDATE_ANNOTATION":var c=r(e),s=c[n-1].markers,l=s.findIndex((function(e){return e.id===t.marker.id}));return s[l]=t.marker,c;default:return e}}},function(e,t,n){"use strict";var r=this&&this.__assign||function(){return(r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0});var o={isCurrentOptionSelected:!1,isCurrentOptionSubmitted:!1,evaluations:[]};t.evaluationReducer=function(e,t){void 0===e&&(e=o);var n=e.evaluations.length;switch(t.type){case"SELECT_EVALUATION":n++;var i=r({},e),a={questionNumber:n,selectedOption:t.evaluationResponse};return i.isCurrentOptionSelected=!0,i.isCurrentOptionSubmitted=!1,i.evaluations.push(a),i;case"CHANGE_EVALUATION":var u=r({},e),c={questionNumber:n,selectedOption:t.evaluationResponse};return u.evaluations[n-1]=c,u;case"POST_EVALUATION":var s=r({},e);return s.isCurrentOptionSubmitted=!0,s;case"NEW_EVALUATION":var l=r({},e);return l.isCurrentOptionSelected=!1,l.isCurrentOptionSubmitted=!1,l;default:return e}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.imageReducer=function(e,t){switch(void 0===e&&(e=""),t.type){case"GET_IMAGE":return t.imageName;default:return e}}},function(e,t,n){"use strict";var r=this&&this.__assign||function(){return(r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0});var o={module:"",annotationType:""};t.metaDataReducer=function(e,t){switch(void 0===e&&(e=o),t.type){case"GET_METADATA":return r({},t.metaData);default:return e}}},function(e,t,n){"use strict";var r=this&&this.__assign||function(){return(r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0});var o={name:""};t.userReducer=function(e,t){switch(void 0===e&&(e=o),t.type){case"GET_USER":return r({},t.user);default:return e}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.NEW_IMAGE="NEW_IMAGE",t.POST_ANNOTATION="POST_ANNOTATION",t.UPDATE_ANNOTATION="UPDATE_ANNOTATION"},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=n(25);t.default=function(e){return r.store.dispatch(function(e){return{type:o.GET_USER,user:e}}(e))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.GET_USER="GET_USER"},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=n(27);t.default=function(e){return r.store.dispatch(function(e){return{type:o.GET_METADATA,metaData:e}}(e))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.GET_METADATA="GET_METADATA"},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),i=n(12),a=r(n(29)),u=r(n(15));t.getImage=function(){var e=document.getElementById("canvas").getAttribute("class").split("/").pop(),t=e.split(".");return{fullName:e,name:t[0],extension:t[1],isAnnotated:!1,uniqueNumberId:o.store.getState().annotationReducer.length}},t.imageObserver=function(){var e=[],n=t.getImage().name,r=0;e.push(n),a.default(n),new MutationObserver((function(){var o=t.getImage(),c=o.name;a.default(c);var s=c===n;s&&r++;var l=s&&1===r;e.includes(c)||l?l&&u.default():(u.default(),e.push(c),i.boundPushNewImage(o))})).observe(document.getElementById("canvas"),{attributes:!0,attributeFilter:["src"]})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=n(30);t.default=function(e){return r.store.dispatch(function(e){return{type:o.GET_IMAGE,imageName:e}}(e))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.GET_IMAGE="GET_IMAGE"},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0);t.default=function(e){var t=r.store.getState().annotationReducer;return t[t.length-1].markers.findIndex((function(t){return t.id===e}))}},,,,,,,,,,,,,,,,,,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=n(83);t.boundSelectEvaluation=function(e){return r.store.dispatch(function(e){return{type:o.SELECT_EVALUATION,evaluationResponse:e}}(e))},t.boundChangeEvaluation=function(e){return r.store.dispatch(function(e){return{type:o.CHANGE_EVALUATION,evaluationResponse:e}}(e))},t.boundPostEvaluation=function(){return r.store.dispatch({type:o.POST_EVALUATION})},t.boundNewEvaluation=function(){return r.store.dispatch({type:o.NEW_EVALUATION})}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),i=n(12),a=n(50),u=r(n(26)),c=r(n(24)),s=r(n(84)),l=n(85),f=n(28),d=n(86),p=r(n(31)),h=n(10),v=r(n(11)),g=n(13),b="",y=function(){return o.store.getState()};y(),o.store.subscribe(y),document.addEventListener("DOMContentLoaded",(function(){var e={name:document.getElementById("user").className};c.default(e);var t=document.getElementById("metaData").className.split("/"),n=t[0],r=t[1];u.default({module:n,annotationType:r});var o=f.getImage();i.boundPushNewImage(o),f.imageObserver(),l.evaluationObserver(),d.questionObserver()})),AFRAME.registerComponent("raycaster-listen",{init:function(){this.el.addEventListener("raycaster-intersected",(function(e){var t=e.detail.intersection.point;if(![t.x,t.y].every((function(e){return 0===e}))&&(b=e.currentTarget.id)){var n=b.match(/(\d+)/);if(n){var r=+n[0];if(!["menuCoral"+r,"menuNotCoral"+r].includes(b))return;v.default(r,"hide");var o=void 0,a=document.getElementById("markerContainer"+r),u=a.getAttribute("position").x,c=a.getAttribute("position").y,s=p.default(r);b.startsWith("menuCoral")?(h.setMarkerColor(r,1),o={id:r,isCoral:1,x:u,y:c}):(h.setMarkerColor(r,0),o={id:r,isCoral:0,x:u,y:c}),-1===s?i.boundPostAnnotation(o):i.boundUpdateAnnotation(o)}}})),this.el.addEventListener("raycaster-intersected-cleared",(function(){""!==b&&(b="")}))}}),AFRAME.registerComponent("toggle-menu-listen",{init:function(){document.querySelector("[button-controls]").addEventListener("buttondown",(function(){if("true"===document.getElementById("questionPlane").getAttribute("questioned")){var e=["optionOnePlane","optionTwoPlane","optionThreePlane","optionFourPlane"].includes(b),t="postPlane"===b;if(e){var n=o.store.getState().evaluationReducer,r=n.isCurrentOptionSelected,i=n.isCurrentOptionSubmitted,u=+document.getElementById(b).className.replace("option","");i||(r?(g.resetOptionColor(),g.setOptionColor(u),a.boundChangeEvaluation(u)):(g.setOptionColor(u),a.boundSelectEvaluation(u)))}else if(t){var c=o.store.getState().evaluationReducer;r=c.isCurrentOptionSelected,i=c.isCurrentOptionSubmitted;if(!r||i)return;g.setPostColor(),a.boundPostEvaluation(),s.default()}}else{var l=b.match(/(\d+)/);if(l){var f=+l[0];["markerInner"+f,"markerBoundary"+f].includes(b)&&v.default(f,"show")}}}))}}),AFRAME.registerComponent("r2vr-message-router",{schema:{host:{type:"string",default:"localhost"},port:{type:"number",default:8080}},init:function(){var e=new WebSocket("ws://"+this.data.host+":"+this.data.port);e.onopen=function(){console.log("r2vr-message-router: Established connection with server session.")},e.onmessage=function(e){console.log(e),JSON.parse(e.data).map((function(e){var t="";if(e.id&&(t=document.querySelector("#"+e.id)),"event"==e.class)t.emit(e.message.eventName,e.message.eventDetail,e.message.bubbles);else if("update"==e.class)t.setAttribute(e.component,e.attributes,e.replaces_component);else if("remove_component"==e.class)t.removeAttribute(e.component);else if("remove_entity"==e.class)t.removeFromParent(),t.parentNode.removeChild(t);else if("remove_entity_class"==e.class){var n=document.getElementsByClassName(""+e.className);if(0===n.length)throw new Error(e.className+" does not pertain to the class of any DOM elements.");for(;n[0];)n[0].parentNode.removeChild(n[0])}else{if("add_entity"!=e.class)throw new Error("r2vr-message-router received a message of unknown class.");console.log(e.tag);if(!["box","camera","circle","cone","cursor","curvedimage","cylinder","dodecahedron","gltf-model","icosahedron","image","light","link","obj-model","octahedron","plane","ring","sky","sound","sphere","tetrahedron","text","torus-knot","torus","triangle","video","videosphere"].includes(e.tag))throw new Error(e.tag+" is not a primitive A-Frame entity.");var r=document.querySelector("a-scene");if(e.parentEntityId&&(r=document.querySelector("#"+e.parentEntityId)),!r)throw new Error(e.parentEntityId+" does not pertain to the ID of a DOM element.");var o=document.createElement("a-"+e.tag);console.log(o),o.id=e.id,e.className&&o.classList.add(""+e.className),r.appendChild(o)}}))},this.el.addEventListener("r_server_message",(function(t){e.send(t.detail)}))}})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SELECT_EVALUATION="SELECT_EVALUATION",t.CHANGE_EVALUATION="CHANGE_EVALUATION",t.POST_EVALUATION="POST_EVALUATION",t.NEW_EVALUATION="NEW_EVALUATION"},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function u(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,u)}c((r=r.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=a.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}};Object.defineProperty(t,"__esModule",{value:!0});var i=n(0),a={1:"One",2:"Two",3:"Three",4:"Four"};t.default=function(){return r(void 0,void 0,void 0,(function(){var e,t,n,r,u,c,s,l,f,d,p,h,v,g,b;return o(this,(function(o){switch(o.label){case 0:e=i.store.getState(),t=e.evaluationReducer,n=e.userReducer,r=t.evaluations,u=r.length,c=r[u-1],s=n.name,l=a[c.selectedOption],f=document.getElementById("questionPlaneText"),d=f.getAttribute("value"),p=document.getElementById("option"+l+"Text"),h=p.getAttribute("value"),v={observer:s,question:d,response:h},console.log(5,v),o.label=1;case 1:return o.trys.push([1,3,,4]),[4,fetch("https://r2vr.herokuapp.com/api/2d/evaluation",{method:"POST",body:JSON.stringify(v),headers:{"Content-Type":"application/json"}})];case 2:if(g=o.sent(),![200,201].includes(g.status))throw new Error("Unable to post evaluation!");return[3,4];case 3:throw b=o.sent(),new Error(b+" - Unable to post evaluation!");case 4:return[2]}}))}))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(13),o=n(50);t.evaluationObserver=function(){new MutationObserver((function(){r.resetOptionColor(),r.resetPostColor(),o.boundNewEvaluation()})).observe(document.getElementById("questionPlaneText"),{attributes:!0,attributeFilter:["value"]})}},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=r(n(15));t.questionObserver=function(){var e=new MutationObserver((function(){o.default(),e.disconnect()}));e.observe(document.getElementById("questionPlane"),{attributes:!0,attributeFilter:["questioned"]})}}]);