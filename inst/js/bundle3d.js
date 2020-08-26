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
/******/ 	return __webpack_require__(__webpack_require__.s = "./typescript/3d/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./typescript/3d/index.ts":
/*!********************************!*\
  !*** ./typescript/3d/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n// @ts-nocheck\r\n// https://unpkg.com/aframe-look-at-component@0.5.1/index.js\r\nvar debug = AFRAME.utils.debug;\r\nvar coordinates = AFRAME.utils.coordinates;\r\nvar warn = debug('components:look-at:warn');\r\nvar isCoordinates = coordinates.isCoordinate || coordinates.isCoordinates;\r\ndelete AFRAME.components['look-at'];\r\n/**\r\n * Look-at component.\r\n *\r\n * Modifies rotation to either track another entity OR do a one-time turn towards a position\r\n * vector.\r\n *\r\n * If tracking an object via setting the component value via a selector, look-at will register\r\n * a behavior to the scene to update rotation on every tick.\r\n */\r\nAFRAME.registerComponent('look-at', {\r\n    schema: {\r\n        default: '',\r\n        parse: function (value) {\r\n            // A static position to look at.\r\n            if (isCoordinates(value) || typeof value === 'object') {\r\n                return coordinates.parse(value);\r\n            }\r\n            // A selector to a target entity.\r\n            return value;\r\n        },\r\n        stringify: function (data) {\r\n            if (typeof data === 'object') {\r\n                return coordinates.stringify(data);\r\n            }\r\n            return data;\r\n        },\r\n    },\r\n    init: function () {\r\n        this.target3D = null;\r\n        this.vector = new THREE.Vector3();\r\n    },\r\n    /**\r\n     * If tracking an object, this will be called on every tick.\r\n     * If looking at a position vector, this will only be called once (until further updates).\r\n     */\r\n    update: function () {\r\n        var self = this;\r\n        var target = self.data;\r\n        var object3D = self.el.object3D;\r\n        var targetEl;\r\n        // No longer looking at anything (i.e., look-at=\"\").\r\n        if (!target ||\r\n            (typeof target === 'object' && !Object.keys(target).length)) {\r\n            return self.remove();\r\n        }\r\n        // Look at a position.\r\n        if (typeof target === 'object') {\r\n            return object3D.lookAt(new THREE.Vector3(target.x, target.y, target.z));\r\n        }\r\n        // Assume target is a string.\r\n        // Query for the element, grab its object3D, then register a behavior on the scene to\r\n        // track the target on every tick.\r\n        targetEl = self.el.sceneEl.querySelector(target);\r\n        if (!targetEl) {\r\n            warn('\"' + target + '\" does not point to a valid entity to look-at');\r\n            return;\r\n        }\r\n        if (!targetEl.hasLoaded) {\r\n            return targetEl.addEventListener('loaded', function () {\r\n                self.beginTracking(targetEl);\r\n            });\r\n        }\r\n        return self.beginTracking(targetEl);\r\n    },\r\n    tick: function (t) {\r\n        // Track target object position. Depends on parent object keeping global transforms up\r\n        // to state with updateMatrixWorld(). In practice, this is handled by the renderer.\r\n        var target;\r\n        var target3D = this.target3D;\r\n        var object3D = this.el.object3D;\r\n        var vector = this.vector;\r\n        if (target3D) {\r\n            target = object3D.parent.worldToLocal(target3D.getWorldPosition());\r\n            if (this.el.getObject3D('camera')) {\r\n                // Flip the vector to -z, looking away from target for camera entities. When using\r\n                // lookat from THREE camera objects, this is applied for you, but since the camera is\r\n                // nested into a Object3D, we need to apply this manually.\r\n                vector.subVectors(object3D.position, target).add(object3D.position);\r\n            }\r\n            else {\r\n                vector = target;\r\n            }\r\n            object3D.lookAt(vector);\r\n        }\r\n    },\r\n    beginTracking: function (targetEl) {\r\n        this.target3D = targetEl.object3D;\r\n    },\r\n});\r\n// TODO: consider moving (look-at) higher\r\n// AFRAME.registerComponent('btn-down', {\r\n//   init: function () {\r\n//     console.log(8, 'btn-down registered');\r\n//     const controlsEl = document.querySelector('[button-controls]');\r\n//     // Detect buttons selected in WebVR\r\n//     controlsEl.addEventListener('buttondown', (e) => {\r\n//       const el = this.el;\r\n//       if (el.className === 'box') console.log(88, e.target, el, el.className);\r\n//       this.el.setAttribute('material', 'color', 'red');\r\n//     });\r\n//   },\r\n// });\r\n// TODO: Refactor below\r\nvar intersectedEl = '';\r\nAFRAME.registerComponent('raycaster-listen', {\r\n    init: function () {\r\n        this.el.addEventListener('raycaster-intersected', function (evt) {\r\n            intersectedEl = evt.currentTarget.id;\r\n            var matches = intersectedEl.match(/(\\d+)/);\r\n            if (matches) {\r\n                var id = matches[0];\r\n                var coralOption = document.querySelector(\"#menuCoral\" + id);\r\n                var notCoralOption = document.querySelector(\"#menuNotCoral\" + id);\r\n                if (coralOption.getAttribute('visible') &&\r\n                    notCoralOption.getAttribute('visible')) {\r\n                    coralOption.setAttribute('visible', false);\r\n                    notCoralOption.setAttribute('visible', false);\r\n                }\r\n            }\r\n            console.log(1, 'intersected', intersectedEl);\r\n        });\r\n        this.el.addEventListener('raycaster-intersected-cleared', function (evt) {\r\n            intersectedEl = '';\r\n            console.log(2, 'intersected-cleared', intersectedEl);\r\n        });\r\n    },\r\n});\r\nAFRAME.registerComponent('toggle-menu-listen', {\r\n    init: function () {\r\n        var controlsEl = document.querySelector('[button-controls]');\r\n        controlsEl.addEventListener('buttondown', function () {\r\n            // console.log(5, intersectedEl);\r\n            var matches = intersectedEl.match(/(\\d+)/);\r\n            if (matches) {\r\n                var id = matches[0];\r\n                var isMarkerIntersected = [\r\n                    \"markerInner\" + id,\r\n                    \"markerBoundary\" + id,\r\n                ].includes(intersectedEl);\r\n                var coralOption = document.querySelector(\"#menuCoral\" + id);\r\n                var notCoralOption = document.querySelector(\"#menuNotCoral\" + id);\r\n                if (!coralOption.getAttribute('visible') &&\r\n                    !notCoralOption.getAttribute('visible') &&\r\n                    isMarkerIntersected) {\r\n                    coralOption.setAttribute('visible', true);\r\n                    notCoralOption.setAttribute('visible', true);\r\n                }\r\n            }\r\n        });\r\n    },\r\n});\r\n\n\n//# sourceURL=webpack:///./typescript/3d/index.ts?");

/***/ })

/******/ });