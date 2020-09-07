/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/js/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./typescript/3d/training3d.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./typescript/3d/training3d.ts":
/*!*************************************!*\
  !*** ./typescript/3d/training3d.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar menu_options_1 = __importDefault(__webpack_require__(/*! ../shared/user-interface/menu-options */ \"./typescript/shared/user-interface/menu-options.ts\"));\r\nvar image_1 = __importDefault(__webpack_require__(/*! ../shared/helpers/image */ \"./typescript/shared/helpers/image.ts\"));\r\nvar marker_color_1 = __importDefault(__webpack_require__(/*! ../shared/user-interface/marker-color */ \"./typescript/shared/user-interface/marker-color.ts\"));\r\nvar intersectedElId = '';\r\ndocument.addEventListener('DOMContentLoaded', function () {\r\n    image_1.default();\r\n});\r\nAFRAME.registerComponent('raycaster-listen', {\r\n    init: function () {\r\n        this.el.addEventListener('raycaster-intersected', function (e) {\r\n            var _a = e.detail.intersection.point, x = _a.x, y = _a.y, z = _a.z;\r\n            if ([x, y, z].every(function (coordinate) { return coordinate === 0; }))\r\n                return;\r\n            intersectedElId = e.currentTarget.id;\r\n            if (!intersectedElId)\r\n                return;\r\n            var matches = intersectedElId.match(/(\\d+)/);\r\n            if (matches) {\r\n                var id = +matches[0];\r\n                var isMenuOptionSelected = [\r\n                    \"menuCoral\" + id,\r\n                    \"menuNotCoral\" + id,\r\n                ].includes(intersectedElId);\r\n                if (!isMenuOptionSelected)\r\n                    return;\r\n                menu_options_1.default(id, 'hide');\r\n                intersectedElId.startsWith('menuCoral')\r\n                    ? marker_color_1.default(id, 1)\r\n                    : marker_color_1.default(id, 0);\r\n            }\r\n        });\r\n        this.el.addEventListener('raycaster-intersected-cleared', function () {\r\n            if (intersectedElId === '')\r\n                return;\r\n            intersectedElId = '';\r\n        });\r\n    },\r\n});\r\nAFRAME.registerComponent('toggle-menu-listen', {\r\n    init: function () {\r\n        var controlsEl = document.querySelector('[button-controls]');\r\n        controlsEl.addEventListener('buttondown', function () {\r\n            var matches = intersectedElId.match(/(\\d+)/);\r\n            if (matches) {\r\n                var id = +matches[0];\r\n                var isMarkerIntersected = [\r\n                    \"markerInner\" + id,\r\n                    \"markerBoundary\" + id,\r\n                ].includes(intersectedElId);\r\n                if (isMarkerIntersected) {\r\n                    menu_options_1.default(id, 'show');\r\n                }\r\n            }\r\n        });\r\n    },\r\n});\r\n/* WebSocket */\r\nAFRAME.registerComponent('r2vr-message-router', {\r\n    schema: {\r\n        host: { type: 'string', default: 'localhost' },\r\n        port: { type: 'number', default: 8080 },\r\n    },\r\n    init: function () {\r\n        var ws = new WebSocket('ws://' + this.data.host + ':' + this.data.port);\r\n        ws.onopen = function () {\r\n            console.log('r2vr-message-router: Established connection with server session.');\r\n        };\r\n        ws.onmessage = function (msg) {\r\n            console.log(msg);\r\n            var payload = JSON.parse(msg.data);\r\n            // Assume payload is a list of events\r\n            payload.map(function (r2vr_message) {\r\n                var target = '';\r\n                if (r2vr_message.id) {\r\n                    target = document.querySelector('#' + r2vr_message.id);\r\n                    console.log(77, target, r2vr_message.id);\r\n                }\r\n                if (r2vr_message.class == 'event') {\r\n                    target.emit(r2vr_message.message.eventName, r2vr_message.message.eventDetail, r2vr_message.message.bubbles);\r\n                }\r\n                else if (r2vr_message.class == 'update') {\r\n                    console.log(555, target, r2vr_message.id, r2vr_message.component);\r\n                    target.setAttribute(r2vr_message.component, r2vr_message.attributes, r2vr_message.replaces_component);\r\n                }\r\n                // TODO: else if 'check'\r\n                else if (r2vr_message.class == 'remove_component') {\r\n                    target.removeAttribute(r2vr_message.component);\r\n                }\r\n                else if (r2vr_message.class == 'remove_entity') {\r\n                    target.removeFromParent();\r\n                    target.parentNode.removeChild(target);\r\n                }\r\n                else if (r2vr_message.class == 'remove_entity_class') {\r\n                    var els = (document.getElementsByClassName(\"\" + r2vr_message.className));\r\n                    if (els.length === 0) {\r\n                        throw new Error(r2vr_message.className + \" does not pertain to the class of any DOM elements.\");\r\n                    }\r\n                    while (els[0]) {\r\n                        els[0].parentNode.removeChild(els[0]);\r\n                    }\r\n                }\r\n                else if (r2vr_message.class == 'add_entity') {\r\n                    console.log(r2vr_message.tag);\r\n                    var validEntities = [\r\n                        'box',\r\n                        'camera',\r\n                        'circle',\r\n                        'cone',\r\n                        'cursor',\r\n                        'curvedimage',\r\n                        'cylinder',\r\n                        'dodecahedron',\r\n                        'gltf-model',\r\n                        'icosahedron',\r\n                        'image',\r\n                        'light',\r\n                        'link',\r\n                        'obj-model',\r\n                        'octahedron',\r\n                        'plane',\r\n                        'ring',\r\n                        'sky',\r\n                        'sound',\r\n                        'sphere',\r\n                        'tetrahedron',\r\n                        'text',\r\n                        'torus-knot',\r\n                        'torus',\r\n                        'triangle',\r\n                        'video',\r\n                        'videosphere',\r\n                    ];\r\n                    var isValidEntity = validEntities.includes(r2vr_message.tag);\r\n                    if (!isValidEntity) {\r\n                        throw new Error(r2vr_message.tag + \" is not a primitive A-Frame entity.\");\r\n                    }\r\n                    var parentEl = document.querySelector('a-scene');\r\n                    if (r2vr_message.parentEntityId) {\r\n                        parentEl = document.querySelector(\"#\" + r2vr_message.parentEntityId);\r\n                    }\r\n                    if (!parentEl) {\r\n                        throw new Error(r2vr_message.parentEntityId + \" does not pertain to the ID of a DOM element.\");\r\n                    }\r\n                    var entityEl = document.createElement(\"a-\" + r2vr_message.tag);\r\n                    console.log(entityEl);\r\n                    entityEl.id = r2vr_message.id;\r\n                    if (r2vr_message.className) {\r\n                        entityEl.classList.add(\"\" + r2vr_message.className);\r\n                    }\r\n                    parentEl.appendChild(entityEl);\r\n                }\r\n                else {\r\n                    throw new Error('r2vr-message-router received a message of unknown class.');\r\n                }\r\n            });\r\n        };\r\n        function handle_r_server_message(event) {\r\n            ws.send(event.detail);\r\n        }\r\n        this.el.addEventListener('r_server_message', handle_r_server_message);\r\n    },\r\n});\r\n\n\n//# sourceURL=webpack:///./typescript/3d/training3d.ts?");

/***/ }),

/***/ "./typescript/shared/helpers/image.ts":
/*!********************************************!*\
  !*** ./typescript/shared/helpers/image.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar getImage = function () {\r\n    var canvas = document.getElementById('canvas');\r\n    // The image filename is found through its class\r\n    // Note: the class will be updated when the next image is called via the R console through a websocket connection between R2VR and the browser\r\n    var fullName = canvas.getAttribute('class').split('/').pop();\r\n    var nameAndExtension = fullName.split('.');\r\n    var name = nameAndExtension[0], extension = nameAndExtension[1];\r\n    var imageFile = {\r\n        fullName: fullName,\r\n        name: name,\r\n        extension: extension,\r\n        isAnnotated: false,\r\n    };\r\n    return imageFile;\r\n};\r\nvar imageObserver = function () {\r\n    var initialImage = getImage();\r\n    var annotatedImages = [];\r\n    annotatedImages.push(initialImage.name);\r\n    var mutationObserver = new MutationObserver(function () {\r\n        var newImage = getImage();\r\n        var newImageName = newImage.name;\r\n        if (!annotatedImages.includes(newImageName)) {\r\n            annotatedImages.push(newImageName);\r\n        }\r\n    });\r\n    mutationObserver.observe(document.getElementById('canvas'), {\r\n        attributes: true,\r\n        attributeFilter: ['src'],\r\n    });\r\n};\r\nexports.default = imageObserver;\r\n\n\n//# sourceURL=webpack:///./typescript/shared/helpers/image.ts?");

/***/ }),

/***/ "./typescript/shared/user-interface/marker-color.ts":
/*!**********************************************************!*\
  !*** ./typescript/shared/user-interface/marker-color.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar CORAL_COLOR = '#FF95BC';\r\nvar NOT_CORAL_COLOR = '#969696';\r\nvar setMarkerColor = function (markerId, coralBinary) {\r\n    var markerBoundary = document.getElementById(\"markerBoundary\" + markerId);\r\n    if (coralBinary === 1) {\r\n        markerBoundary === null || markerBoundary === void 0 ? void 0 : markerBoundary.setAttribute('color', CORAL_COLOR);\r\n    }\r\n    else {\r\n        markerBoundary === null || markerBoundary === void 0 ? void 0 : markerBoundary.setAttribute('color', NOT_CORAL_COLOR);\r\n    }\r\n};\r\nexports.default = setMarkerColor;\r\n\n\n//# sourceURL=webpack:///./typescript/shared/user-interface/marker-color.ts?");

/***/ }),

/***/ "./typescript/shared/user-interface/menu-options.ts":
/*!**********************************************************!*\
  !*** ./typescript/shared/user-interface/menu-options.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar displayMenuOptions = function (markerId, display) {\r\n    if (display === void 0) { display = 'hide'; }\r\n    var coralOption = document.getElementById(\"menuCoral\" + markerId);\r\n    var notCoralOption = document.getElementById(\"menuNotCoral\" + markerId);\r\n    if (display === 'show') {\r\n        coralOption.setAttribute('visible', 'true');\r\n        notCoralOption.setAttribute('visible', 'true');\r\n    }\r\n    else {\r\n        coralOption.setAttribute('visible', 'false');\r\n        notCoralOption.setAttribute('visible', 'false');\r\n    }\r\n};\r\nexports.default = displayMenuOptions;\r\n\n\n//# sourceURL=webpack:///./typescript/shared/user-interface/menu-options.ts?");

/***/ })

/******/ });