var RrTsdi =
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = staticImplements;
function staticImplements() {
    return function (constructor) { };
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__public_api__ = __webpack_require__(2);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Injector", function() { return __WEBPACK_IMPORTED_MODULE_0__public_api__["a"]; });



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__injector__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__injector__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__static_implements__ = __webpack_require__(0);
/* unused harmony namespace reexport */




/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Injector; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__static_implements__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ItemType;
(function (ItemType) {
    ItemType[ItemType["VALUE"] = 0] = "VALUE";
    ItemType[ItemType["CLASS"] = 1] = "CLASS";
    ItemType[ItemType["SERVICE"] = 2] = "SERVICE";
})(ItemType || (ItemType = {}));
var Injector = /** @class */ (function () {
    function Injector() {
        this.injectRepository = {};
        this.resolveRecursionCounter = 0;
    }
    Injector_1 = Injector;
    Injector.prototype.registerValue = function (name, valueItem) {
        this.register(name, valueItem, ItemType.VALUE);
    };
    Injector.prototype.registerClass = function (name, classItem) {
        this.register(name, classItem, ItemType.CLASS);
    };
    Injector.prototype.registerService = function (name, serviceItem) {
        this.register(name, serviceItem, ItemType.SERVICE);
    };
    Injector.prototype.get = function (name) {
        var injectRepositoryEntry, injectList = [], itemType, i, item;
        injectRepositoryEntry = this.getInjectRepositoryEntry(name);
        if (injectRepositoryEntry.resolveCache) {
            return injectRepositoryEntry.resolveCache;
        }
        item = injectRepositoryEntry.item;
        itemType = injectRepositoryEntry.itemType;
        this.resolveRecursionInc();
        for (i = 0; item && item.$inject && (i < item.$inject.length); i++) {
            injectList.push(this.get(item.$inject[i]));
        }
        switch (itemType) {
            case ItemType.VALUE:
                injectRepositoryEntry.resolveCache = item;
                break;
            case ItemType.CLASS:
                injectRepositoryEntry.resolveCache = Injector_1.injectDependencies(item, injectList);
                break;
            case ItemType.SERVICE:
                injectRepositoryEntry.resolveCache = Injector_1.injectDependenciesAndInstantiate(item, injectList);
                break;
        }
        this.resolveRecursionDec();
        return injectRepositoryEntry.resolveCache;
    };
    Injector.prototype.register = function (name, item, itemType) {
        if (typeof this.injectRepository[name] !== 'undefined') {
            throw Injector_1.MULTIPLE_REGISTER_EXCEPTION;
        }
        this.injectRepository[name] = {
            itemType: itemType,
            item: item,
            resolveCache: null
        };
    };
    Injector.prototype.resolveRecursionInc = function () {
        this.resolveRecursionCounter++;
        if (this.resolveRecursionCounter >= Injector_1.RESOLVE_RECURSION_LIMIT) {
            throw Injector_1.RESOLVE_RECURSION_LIMIT_EXCEED_EXCEPTION;
        }
    };
    Injector.prototype.resolveRecursionDec = function () {
        this.resolveRecursionCounter--;
    };
    Injector.prototype.getInjectRepositoryEntry = function (name) {
        var injectRepositoryEntry;
        injectRepositoryEntry = this.injectRepository[name];
        if (typeof injectRepositoryEntry === 'undefined') {
            throw Injector_1.UNABLE_TO_FIND_ITEM_EXCEPTION + name;
        }
        return injectRepositoryEntry;
    };
    Injector.injectDependenciesAndInstantiate = function (item, injectList) {
        var i = injectList, r;
        switch (injectList.length) {
            case 0:
                r = new item();
                break;
            case 1:
                r = new item(i[0]);
                break;
            case 2:
                r = new item(i[0], i[1]);
                break;
            case 3:
                r = new item(i[0], i[1], i[2]);
                break;
            case 4:
                r = new item(i[0], i[1], i[2], i[3]);
                break;
            case 5:
                r = new item(i[0], i[1], i[2], i[3], i[4]);
                break;
            case 6:
                r = new item(i[0], i[1], i[2], i[3], i[4], i[5]);
                break;
            case 7:
                r = new item(i[0], i[1], i[2], i[3], i[4], i[5], i[6]);
                break;
            case 8:
                r = new item(i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7]);
                break;
            case 9:
                r = new item(i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8]);
                break;
            case 10:
                r = new item(i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9]);
                break;
            case 11:
                r = new item(i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9], i[10]);
                break;
            case 12:
                r = new item(i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9], i[10], i[11]);
                break;
            default: throw Injector_1.TO_MANY_INJECTIONS_EXCEPTION;
        }
        return r;
    };
    Injector.injectDependencies = function (item, injectList) {
        var i = injectList, r;
        switch (injectList.length) {
            case 0:
                r = item();
                break;
            case 1:
                r = item(i[0]);
                break;
            case 2:
                r = item(i[0], i[1]);
                break;
            case 3:
                r = item(i[0], i[1], i[2]);
                break;
            case 4:
                r = item(i[0], i[1], i[2], i[3]);
                break;
            case 5:
                r = item(i[0], i[1], i[2], i[3], i[4]);
                break;
            case 6:
                r = item(i[0], i[1], i[2], i[3], i[4], i[5]);
                break;
            case 7:
                r = item(i[0], i[1], i[2], i[3], i[4], i[5], i[6]);
                break;
            case 8:
                r = item(i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7]);
                break;
            case 9:
                r = item(i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8]);
                break;
            case 10:
                r = item(i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9]);
                break;
            case 11:
                r = item(i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9], i[10]);
                break;
            case 12:
                r = item(i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9], i[10], i[11]);
                break;
            default: throw Injector_1.TO_MANY_INJECTIONS_EXCEPTION;
        }
        return r;
    };
    Injector.RESOLVE_RECURSION_LIMIT = 20;
    Injector.RESOLVE_RECURSION_LIMIT_EXCEED_EXCEPTION = 'Injector - resolve recursion limit exceed';
    Injector.MULTIPLE_REGISTER_EXCEPTION = 'Injector - multiple register calls for the same name';
    Injector.UNABLE_TO_FIND_ITEM_EXCEPTION = 'Injector - unable to find factory/service for given name: ';
    Injector.TO_MANY_INJECTIONS_EXCEPTION = 'Injector - to many injections';
    Injector = Injector_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__static_implements__["a" /* default */])()
    ], Injector);
    return Injector;
    var Injector_1;
}());



/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTNiNGQxZmNlMmM3NzQ5MDJkODEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YXRpYy1pbXBsZW1lbnRzLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHVibGljLWFwaS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5qZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDN0RjO0lBQ1osTUFBTSxDQUFDLFVBQUMsV0FBYyxJQUFNLENBQUM7QUFDL0IsQ0FBQzs7Ozs7Ozs7Ozs7QUNGNEI7Ozs7Ozs7Ozs7OztBQ0E0QztBQUNyQzs7Ozs7Ozs7Ozs7Ozs7OztBQ0RlO0FBYW5ELElBQUssUUFJSjtBQUpELFdBQUssUUFBUTtJQUNYLHlDQUFLO0lBQ0wseUNBQUs7SUFDTCw2Q0FBTztBQUNULENBQUMsRUFKSSxRQUFRLEtBQVIsUUFBUSxRQUlaO0FBU0Q7SUFLRTtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLHVCQUF1QixHQUFHLENBQUMsQ0FBQztJQUNuQyxDQUFDO2lCQVJVLFFBQVE7SUFnQlosZ0NBQWEsR0FBcEIsVUFBcUIsSUFBWSxF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QyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDO1lBQzlDLEtBQUssQ0FBQztnQkFBRSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDO1lBQ3BELEtBQUssQ0FBQztnQkFBRSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUFDLEtBQUssQ0FBQztZQUMxRCxLQUFLLENBQUM7Z0JBQUUsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDO1lBQ2hFLEtBQUssQ0FBQztnQkFBRSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDO1lBQ3RFLEtBQUssQ0FBQztnQkFBRSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUFDLEtBQUssQ0FBQztZQUM1RSxLQUFLLENBQUM7Z0JBQUUsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDO1lBQ2xGLEtBQUssRUFBRTtnQkFBRSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDO1lBQ3pGLEtBQUssRUFBRTtnQkFBRSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUFDLEtBQUssQ0FBQztZQUNoRyxLQUFLLEVBQUU7Z0JBQUUsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDO1lBQ3ZHLFNBQVMsTUFBTSxVQUFRLENBQUMsNEJBQTRCLENBQUM7UUFDdkQsQ0FBQztRQUVELE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRWMsMkJBQWtCLEdBQWpDLFVBQWtDLElBQVMsRUFBRSxVQUFpQjtRQUM1RCxJQUNFLENBQUMsR0FBUSxVQUFVLEVBQ25CLENBQU0sQ0FBQztRQUVULE1BQU0sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzFCLEtBQUssQ0FBQztnQkFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7Z0JBQUMsS0FBSyxDQUFDO1lBQzFCLEtBQUssQ0FBQztnQkFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUFDLEtBQUssQ0FBQztZQUM5QixLQUFLLENBQUM7Z0JBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDO1lBQ3BDLEtBQUssQ0FBQztnQkFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDO1lBQzFDLEtBQUssQ0FBQztnQkFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUFDLEtBQUssQ0FBQztZQUNoRCxLQUFLLENBQUM7Z0JBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDO1lBQ3RELEtBQUssQ0FBQztnQkFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDO1lBQzVELEtBQUssQ0FBQztnQkFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUFDLEtBQUssQ0FBQztZQUNsRSxLQUFLLENBQUM7Z0JBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDO1lBQ3hFLEtBQUssQ0FBQztnQkFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDO1lBQzlFLEtBQUssRUFBRTtnQkFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUFDLEtBQUssQ0FBQztZQUNyRixLQUFLLEVBQUU7Z0JBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDO1lBQzVGLEtBQUssRUFBRTtnQkFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDO1lBQ25HLFNBQVMsTUFBTSxVQUFRLENBQUMsNEJBQTRCLENBQUM7UUFDdkQsQ0FBQztRQUVELE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBMUljLGdDQUF1QixHQUFXLEVBQUUsQ0FBQztJQUNyQyxpREFBd0MsR0FBVywyQ0FBMkMsQ0FBQztJQUMvRixvQ0FBMkIsR0FBVyxzREFBc0QsQ0FBQztJQUM3RixzQ0FBNkIsR0FBVyw0REFBNEQsQ0FBQztJQUNyRyxxQ0FBNEIsR0FBVywrQkFBK0IsQ0FBQztJQWQzRSxRQUFRO1FBRHBCLDJFQUFnQixFQUFrQjtPQUN0QixRQUFRLENBc0pwQjtJQUFELGVBQUM7O0NBQUE7QUF0Sm9CIiwiZmlsZSI6InJyLXRzZGktdjEuMC4wLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZTNiNGQxZmNlMmM3NzQ5MDJkODEiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdGF0aWNJbXBsZW1lbnRzPFQ+KCkge1xyXG4gIHJldHVybiAoY29uc3RydWN0b3I6IFQpID0+IHt9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3N0YXRpYy1pbXBsZW1lbnRzLnRzIiwiZXhwb3J0ICogZnJvbSAnLi9wdWJsaWMtYXBpJztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LnRzIiwiZXhwb3J0IHsgSW5qZWN0b3IsIEluamVjdG9ySW50ZXJmYWNlLCBJbmplY3RvclN0YXRpYyB9IGZyb20gJy4vaW5qZWN0b3InO1xyXG5leHBvcnQgKiBmcm9tICcuL3N0YXRpYy1pbXBsZW1lbnRzJztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3B1YmxpYy1hcGkudHMiLCJpbXBvcnQgc3RhdGljSW1wbGVtZW50cyBmcm9tICcuL3N0YXRpYy1pbXBsZW1lbnRzJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSW5qZWN0b3JJbnRlcmZhY2Uge1xyXG4gIHJlZ2lzdGVyVmFsdWUobmFtZTogc3RyaW5nLCB2YWx1ZUl0ZW06IGFueSk6IHZvaWQ7XHJcbiAgcmVnaXN0ZXJDbGFzcyhuYW1lOiBzdHJpbmcsIGNsYXNzSXRlbTogYW55KTogdm9pZDtcclxuICByZWdpc3RlclNlcnZpY2UobmFtZTogc3RyaW5nLCBzZXJ2aWNlSXRlbTogYW55KTogdm9pZDtcclxuICBnZXQobmFtZTogc3RyaW5nKTogYW55XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSW5qZWN0b3JTdGF0aWMge1xyXG4gIG5ldygpOiBJbmplY3RvckludGVyZmFjZTtcclxufVxyXG5cclxuZW51bSBJdGVtVHlwZSB7XHJcbiAgVkFMVUUsXHJcbiAgQ0xBU1MsXHJcbiAgU0VSVklDRVxyXG59XHJcblxyXG5pbnRlcmZhY2UgSW5qZWN0UmVwb3NpdG9yeUVudHJ5SW50ZXJmYWNlIHtcclxuICBpdGVtOiBhbnksXHJcbiAgaXRlbVR5cGU6IEl0ZW1UeXBlLFxyXG4gIHJlc29sdmVDYWNoZTogYW55XHJcbn1cclxuXHJcbkBzdGF0aWNJbXBsZW1lbnRzPEluamVjdG9yU3RhdGljPigpXHJcbmV4cG9ydCBjbGFzcyBJbmplY3RvciBpbXBsZW1lbnRzIEluamVjdG9ySW50ZXJmYWNlIHtcclxuXHJcbiAgcHJpdmF0ZSBpbmplY3RSZXBvc2l0b3J5OiB7IFtuYW1lOiBzdHJpbmddOiBJbmplY3RSZXBvc2l0b3J5RW50cnlJbnRlcmZhY2UgfTtcclxuICBwcml2YXRlIHJlc29sdmVSZWN1cnNpb25Db3VudGVyOiBudW1iZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yICgpIHtcclxuICAgIHRoaXMuaW5qZWN0UmVwb3NpdG9yeSA9IHt9O1xyXG4gICAgdGhpcy5yZXNvbHZlUmVjdXJzaW9uQ291bnRlciA9IDA7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0YXRpYyBSRVNPTFZFX1JFQ1VSU0lPTl9MSU1JVDogbnVtYmVyID0gMjA7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgUkVTT0xWRV9SRUNVUlNJT05fTElNSVRfRVhDRUVEX0VYQ0VQVElPTjogc3RyaW5nID0gJ0luamVjdG9yIC0gcmVzb2x2ZSByZWN1cnNpb24gbGltaXQgZXhjZWVkJztcclxuICBwcml2YXRlIHN0YXRpYyBNVUxUSVBMRV9SRUdJU1RFUl9FWENFUFRJT046IHN0cmluZyA9ICdJbmplY3RvciAtIG11bHRpcGxlIHJlZ2lzdGVyIGNhbGxzIGZvciB0aGUgc2FtZSBuYW1lJztcclxuICBwcml2YXRlIHN0YXRpYyBVTkFCTEVfVE9fRklORF9JVEVNX0VYQ0VQVElPTjogc3RyaW5nID0gJ0luamVjdG9yIC0gdW5hYmxlIHRvIGZpbmQgZmFjdG9yeS9zZXJ2aWNlIGZvciBnaXZlbiBuYW1lOiAnO1xyXG4gIHByaXZhdGUgc3RhdGljIFRPX01BTllfSU5KRUNUSU9OU19FWENFUFRJT046IHN0cmluZyA9ICdJbmplY3RvciAtIHRvIG1hbnkgaW5qZWN0aW9ucyc7XHJcbiAgXHJcbiAgcHVibGljIHJlZ2lzdGVyVmFsdWUobmFtZTogc3RyaW5nLCB2YWx1ZUl0ZW06IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5yZWdpc3RlcihuYW1lLCB2YWx1ZUl0ZW0sIEl0ZW1UeXBlLlZBTFVFKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWdpc3RlckNsYXNzKG5hbWU6IHN0cmluZywgY2xhc3NJdGVtOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMucmVnaXN0ZXIobmFtZSwgY2xhc3NJdGVtLCBJdGVtVHlwZS5DTEFTUyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVnaXN0ZXJTZXJ2aWNlKG5hbWU6IHN0cmluZywgc2VydmljZUl0ZW06IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5yZWdpc3RlcihuYW1lLCBzZXJ2aWNlSXRlbSwgSXRlbVR5cGUuU0VSVklDRSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0KG5hbWU6IHN0cmluZyk6IGFueSB7XHJcbiAgICBsZXQgXHJcbiAgICAgIGluamVjdFJlcG9zaXRvcnlFbnRyeTogSW5qZWN0UmVwb3NpdG9yeUVudHJ5SW50ZXJmYWNlLCBcclxuICAgICAgaW5qZWN0TGlzdDogYW55W10gPSBbXSxcclxuICAgICAgaXRlbVR5cGU6IEl0ZW1UeXBlLFxyXG4gICAgICBpOiBudW1iZXIsIFxyXG4gICAgICBpdGVtOiBhbnk7XHJcbiAgICAgIFxyXG4gICAgaW5qZWN0UmVwb3NpdG9yeUVudHJ5ID0gdGhpcy5nZXRJbmplY3RSZXBvc2l0b3J5RW50cnkobmFtZSk7XHJcbiAgICBpZiAoaW5qZWN0UmVwb3NpdG9yeUVudHJ5LnJlc29sdmVDYWNoZSkge1xyXG4gICAgICByZXR1cm4gaW5qZWN0UmVwb3NpdG9yeUVudHJ5LnJlc29sdmVDYWNoZTtcclxuICAgIH1cclxuXHJcbiAgICBpdGVtID0gaW5qZWN0UmVwb3NpdG9yeUVudHJ5Lml0ZW07XHJcbiAgICBpdGVtVHlwZSA9IGluamVjdFJlcG9zaXRvcnlFbnRyeS5pdGVtVHlwZTtcclxuXHJcbiAgICB0aGlzLnJlc29sdmVSZWN1cnNpb25JbmMoKTtcclxuICAgIGZvciAoaSA9IDA7IGl0ZW0gJiYgaXRlbS4kaW5qZWN0ICYmIChpIDwgaXRlbS4kaW5qZWN0Lmxlbmd0aCk7IGkrKykge1xyXG4gICAgICBpbmplY3RMaXN0LnB1c2goXHJcbiAgICAgICAgdGhpcy5nZXQoaXRlbS4kaW5qZWN0W2ldKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgc3dpdGNoIChpdGVtVHlwZSkge1xyXG4gICAgICBjYXNlIEl0ZW1UeXBlLlZBTFVFOlxyXG4gICAgICAgIGluamVjdFJlcG9zaXRvcnlFbnRyeS5yZXNvbHZlQ2FjaGUgPSBpdGVtO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEl0ZW1UeXBlLkNMQVNTOlxyXG4gICAgICAgIGluamVjdFJlcG9zaXRvcnlFbnRyeS5yZXNvbHZlQ2FjaGUgPSBJbmplY3Rvci5pbmplY3REZXBlbmRlbmNpZXMoaXRlbSwgaW5qZWN0TGlzdCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgSXRlbVR5cGUuU0VSVklDRTpcclxuICAgICAgICBpbmplY3RSZXBvc2l0b3J5RW50cnkucmVzb2x2ZUNhY2hlID0gSW5qZWN0b3IuaW5qZWN0RGVwZW5kZW5jaWVzQW5kSW5zdGFudGlhdGUoaXRlbSwgaW5qZWN0TGlzdCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlc29sdmVSZWN1cnNpb25EZWMoKTtcclxuXHJcbiAgICByZXR1cm4gaW5qZWN0UmVwb3NpdG9yeUVudHJ5LnJlc29sdmVDYWNoZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVnaXN0ZXIobmFtZTogc3RyaW5nLCBpdGVtOiBhbnksIGl0ZW1UeXBlOiBJdGVtVHlwZSk6IHZvaWQge1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLmluamVjdFJlcG9zaXRvcnlbbmFtZV0gIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHRocm93IEluamVjdG9yLk1VTFRJUExFX1JFR0lTVEVSX0VYQ0VQVElPTjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmluamVjdFJlcG9zaXRvcnlbbmFtZV0gPSB7XHJcbiAgICAgIGl0ZW1UeXBlOiBpdGVtVHlwZSxcclxuICAgICAgaXRlbTogaXRlbSxcclxuICAgICAgcmVzb2x2ZUNhY2hlOiBudWxsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZXNvbHZlUmVjdXJzaW9uSW5jKCk6IHZvaWQge1xyXG4gICAgdGhpcy5yZXNvbHZlUmVjdXJzaW9uQ291bnRlcisrO1xyXG4gICAgaWYgKHRoaXMucmVzb2x2ZVJlY3Vyc2lvbkNvdW50ZXIgPj0gSW5qZWN0b3IuUkVTT0xWRV9SRUNVUlNJT05fTElNSVQpIHtcclxuICAgICAgdGhyb3cgSW5qZWN0b3IuUkVTT0xWRV9SRUNVUlNJT05fTElNSVRfRVhDRUVEX0VYQ0VQVElPTjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVzb2x2ZVJlY3Vyc2lvbkRlYygpOiB2b2lkIHtcclxuICAgIHRoaXMucmVzb2x2ZVJlY3Vyc2lvbkNvdW50ZXItLTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0SW5qZWN0UmVwb3NpdG9yeUVudHJ5KG5hbWU6IHN0cmluZyk6IEluamVjdFJlcG9zaXRvcnlFbnRyeUludGVyZmFjZSB7XHJcbiAgICBsZXQgaW5qZWN0UmVwb3NpdG9yeUVudHJ5OiBJbmplY3RSZXBvc2l0b3J5RW50cnlJbnRlcmZhY2U7XHJcblxyXG4gICAgaW5qZWN0UmVwb3NpdG9yeUVudHJ5ID0gdGhpcy5pbmplY3RSZXBvc2l0b3J5W25hbWVdO1xyXG4gICAgaWYgKHR5cGVvZiBpbmplY3RSZXBvc2l0b3J5RW50cnkgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHRocm93IEluamVjdG9yLlVOQUJMRV9UT19GSU5EX0lURU1fRVhDRVBUSU9OICsgbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaW5qZWN0UmVwb3NpdG9yeUVudHJ5O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdGF0aWMgaW5qZWN0RGVwZW5kZW5jaWVzQW5kSW5zdGFudGlhdGUoaXRlbTogYW55LCBpbmplY3RMaXN0OiBhbnlbXSk6IGFueSB7XHJcbiAgICBsZXRcclxuICAgICAgaTogYW55ID0gaW5qZWN0TGlzdCxcclxuICAgICAgcjogYW55O1xyXG5cclxuICAgIHN3aXRjaCAoaW5qZWN0TGlzdC5sZW5ndGgpIHtcclxuICAgICAgY2FzZSAwOiByID0gbmV3IGl0ZW0oKTsgYnJlYWs7XHJcbiAgICAgIGNhc2UgMTogciA9IG5ldyBpdGVtKGlbMF0pOyBicmVhaztcclxuICAgICAgY2FzZSAyOiByID0gbmV3IGl0ZW0oaVswXSwgaVsxXSk7IGJyZWFrO1xyXG4gICAgICBjYXNlIDM6IHIgPSBuZXcgaXRlbShpWzBdLCBpWzFdLCBpWzJdKTsgYnJlYWs7XHJcbiAgICAgIGNhc2UgNDogciA9IG5ldyBpdGVtKGlbMF0sIGlbMV0sIGlbMl0sIGlbM10pOyBicmVhaztcclxuICAgICAgY2FzZSA1OiByID0gbmV3IGl0ZW0oaVswXSwgaVsxXSwgaVsyXSwgaVszXSwgaVs0XSk7IGJyZWFrO1xyXG4gICAgICBjYXNlIDY6IHIgPSBuZXcgaXRlbShpWzBdLCBpWzFdLCBpWzJdLCBpWzNdLCBpWzRdLCBpWzVdKTsgYnJlYWs7XHJcbiAgICAgIGNhc2UgNzogciA9IG5ldyBpdGVtKGlbMF0sIGlbMV0sIGlbMl0sIGlbM10sIGlbNF0sIGlbNV0sIGlbNl0pOyBicmVhaztcclxuICAgICAgY2FzZSA4OiByID0gbmV3IGl0ZW0oaVswXSwgaVsxXSwgaVsyXSwgaVszXSwgaVs0XSwgaVs1XSwgaVs2XSwgaVs3XSk7IGJyZWFrO1xyXG4gICAgICBjYXNlIDk6IHIgPSBuZXcgaXRlbShpWzBdLCBpWzFdLCBpWzJdLCBpWzNdLCBpWzRdLCBpWzVdLCBpWzZdLCBpWzddLCBpWzhdKTsgYnJlYWs7XHJcbiAgICAgIGNhc2UgMTA6IHIgPSBuZXcgaXRlbShpWzBdLCBpWzFdLCBpWzJdLCBpWzNdLCBpWzRdLCBpWzVdLCBpWzZdLCBpWzddLCBpWzhdLCBpWzldKTsgYnJlYWs7XHJcbiAgICAgIGNhc2UgMTE6IHIgPSBuZXcgaXRlbShpWzBdLCBpWzFdLCBpWzJdLCBpWzNdLCBpWzRdLCBpWzVdLCBpWzZdLCBpWzddLCBpWzhdLCBpWzldLCBpWzEwXSk7IGJyZWFrO1xyXG4gICAgICBjYXNlIDEyOiByID0gbmV3IGl0ZW0oaVswXSwgaVsxXSwgaVsyXSwgaVszXSwgaVs0XSwgaVs1XSwgaVs2XSwgaVs3XSwgaVs4XSwgaVs5XSwgaVsxMF0sIGlbMTFdKTsgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6IHRocm93IEluamVjdG9yLlRPX01BTllfSU5KRUNUSU9OU19FWENFUFRJT047XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHI7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0YXRpYyBpbmplY3REZXBlbmRlbmNpZXMoaXRlbTogYW55LCBpbmplY3RMaXN0OiBhbnlbXSk6IGFueSB7XHJcbiAgICBsZXRcclxuICAgICAgaTogYW55ID0gaW5qZWN0TGlzdCxcclxuICAgICAgcjogYW55O1xyXG5cclxuICAgIHN3aXRjaCAoaW5qZWN0TGlzdC5sZW5ndGgpIHtcclxuICAgICAgY2FzZSAwOiByID0gaXRlbSgpOyBicmVhaztcclxuICAgICAgY2FzZSAxOiByID0gaXRlbShpWzBdKTsgYnJlYWs7XHJcbiAgICAgIGNhc2UgMjogciA9IGl0ZW0oaVswXSwgaVsxXSk7IGJyZWFrO1xyXG4gICAgICBjYXNlIDM6IHIgPSBpdGVtKGlbMF0sIGlbMV0sIGlbMl0pOyBicmVhaztcclxuICAgICAgY2FzZSA0OiByID0gaXRlbShpWzBdLCBpWzFdLCBpWzJdLCBpWzNdKTsgYnJlYWs7XHJcbiAgICAgIGNhc2UgNTogciA9IGl0ZW0oaVswXSwgaVsxXSwgaVsyXSwgaVszXSwgaVs0XSk7IGJyZWFrO1xyXG4gICAgICBjYXNlIDY6IHIgPSBpdGVtKGlbMF0sIGlbMV0sIGlbMl0sIGlbM10sIGlbNF0sIGlbNV0pOyBicmVhaztcclxuICAgICAgY2FzZSA3OiByID0gaXRlbShpWzBdLCBpWzFdLCBpWzJdLCBpWzNdLCBpWzRdLCBpWzVdLCBpWzZdKTsgYnJlYWs7XHJcbiAgICAgIGNhc2UgODogciA9IGl0ZW0oaVswXSwgaVsxXSwgaVsyXSwgaVszXSwgaVs0XSwgaVs1XSwgaVs2XSwgaVs3XSk7IGJyZWFrO1xyXG4gICAgICBjYXNlIDk6IHIgPSBpdGVtKGlbMF0sIGlbMV0sIGlbMl0sIGlbM10sIGlbNF0sIGlbNV0sIGlbNl0sIGlbN10sIGlbOF0pOyBicmVhaztcclxuICAgICAgY2FzZSAxMDogciA9IGl0ZW0oaVswXSwgaVsxXSwgaVsyXSwgaVszXSwgaVs0XSwgaVs1XSwgaVs2XSwgaVs3XSwgaVs4XSwgaVs5XSk7IGJyZWFrO1xyXG4gICAgICBjYXNlIDExOiByID0gaXRlbShpWzBdLCBpWzFdLCBpWzJdLCBpWzNdLCBpWzRdLCBpWzVdLCBpWzZdLCBpWzddLCBpWzhdLCBpWzldLCBpWzEwXSk7IGJyZWFrO1xyXG4gICAgICBjYXNlIDEyOiByID0gaXRlbShpWzBdLCBpWzFdLCBpWzJdLCBpWzNdLCBpWzRdLCBpWzVdLCBpWzZdLCBpWzddLCBpWzhdLCBpWzldLCBpWzEwXSwgaVsxMV0pOyBicmVhaztcclxuICAgICAgZGVmYXVsdDogdGhyb3cgSW5qZWN0b3IuVE9fTUFOWV9JTkpFQ1RJT05TX0VYQ0VQVElPTjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcjtcclxuICB9XHJcblxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmplY3Rvci50cyJdLCJzb3VyY2VSb290IjoiIn0=