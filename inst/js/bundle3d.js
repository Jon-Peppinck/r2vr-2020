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
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar menu_options_1 = __importDefault(__webpack_require__(/*! ./user-interface/menu-options */ \"./typescript/3d/user-interface/menu-options.ts\"));\r\nvar intersectedElId = '';\r\nAFRAME.registerComponent('raycaster-listen', {\r\n    init: function () {\r\n        this.el.addEventListener('raycaster-intersected', function (e) {\r\n            var _a = e.detail.intersection.point, x = _a.x, y = _a.y, z = _a.z;\r\n            if ([x, y, z].every(function (coordinate) { return coordinate === 0; }))\r\n                return;\r\n            intersectedElId = e.currentTarget.id;\r\n            if (!intersectedElId)\r\n                return;\r\n            var matches = intersectedElId.match(/(\\d+)/);\r\n            if (matches) {\r\n                var id = +matches[0];\r\n                menu_options_1.default(id, 'hide');\r\n            }\r\n        });\r\n        this.el.addEventListener('raycaster-intersected-cleared', function () {\r\n            if (intersectedElId === '')\r\n                return;\r\n            intersectedElId = '';\r\n            console.log(2, 'intersected-cleared', intersectedElId);\r\n        });\r\n    },\r\n});\r\nAFRAME.registerComponent('toggle-menu-listen', {\r\n    init: function () {\r\n        var controlsEl = document.querySelector('[button-controls]');\r\n        controlsEl.addEventListener('buttondown', function () {\r\n            var matches = intersectedElId.match(/(\\d+)/);\r\n            if (matches) {\r\n                var id = +matches[0];\r\n                var isMarkerIntersected = [\r\n                    \"markerInner\" + id,\r\n                    \"markerBoundary\" + id,\r\n                ].includes(intersectedElId);\r\n                if (isMarkerIntersected) {\r\n                    menu_options_1.default(id, 'show');\r\n                }\r\n            }\r\n        });\r\n    },\r\n});\r\n\n\n//# sourceURL=webpack:///./typescript/3d/index.ts?");

/***/ }),

/***/ "./typescript/3d/user-interface/menu-options.ts":
/*!******************************************************!*\
  !*** ./typescript/3d/user-interface/menu-options.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar displayMenuOptions = function (id, display) {\r\n    if (display === void 0) { display = 'hide'; }\r\n    var coralOption = document.getElementById(\"menuCoral\" + id);\r\n    var notCoralOption = document.getElementById(\"menuNotCoral\" + id);\r\n    if (display === 'show') {\r\n        coralOption.setAttribute('visible', 'true');\r\n        notCoralOption.setAttribute('visible', 'true');\r\n    }\r\n    else {\r\n        coralOption.setAttribute('visible', 'false');\r\n        notCoralOption.setAttribute('visible', 'false');\r\n    }\r\n    // const isMenuDisplayed: boolean =\r\n    //   coralOption.getAttribute('visible') &&\r\n    //   notCoralOption.getAttribute('visible');\r\n    // console.log('ismenudisplay4:', isMenuDisplayed);\r\n    // if (isMenuDisplayed) {\r\n    //   coralOption.setAttribute('visible', 'false');\r\n    //   notCoralOption.setAttribute('visible', 'false');\r\n    // }\r\n    // if (isMenuDisplayed) {\r\n    //   coralOption.setAttribute('visible', 'false');\r\n    //   notCoralOption.setAttribute('visible', 'false');\r\n    // }\r\n    // else {\r\n    //   coralOption.setAttribute('visible', 'true');\r\n    //   notCoralOption.setAttribute('visible', 'true');\r\n    // }\r\n};\r\nexports.default = displayMenuOptions;\r\n\n\n//# sourceURL=webpack:///./typescript/3d/user-interface/menu-options.ts?");

/***/ })

/******/ });