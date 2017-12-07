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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Muse = undefined;

var _core = __webpack_require__(1);

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Muse = _core2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dom = __webpack_require__(2);

var _observer = __webpack_require__(10);

let Component = class Component {
    constructor() {
        this.entry = null;
        this.node = null;
        this.state = {};
        this.computed = {};
    }

    // TODO: LifeCycle
    componentWillMount() {}
    componentDidMount() {}
    componentWillReceiveProps() {}
    shouldComponentUpdate() {
        return true;
    }
    componentWillUpdate() {}
    componentDidUpdate() {}
    componentWillUnmount() {}
    componentDidCatch() {}

    // Observer
    initObserver() {
        this.state = _observer.Observer.from(this.state || {}, this.setterCallback.bind(this));
    }
    initComputed() {
        (0, _observer.walk)(this.computed, (name, getter, computed) => {
            Object.defineProperty(computed, name, {
                enumerable: true,
                configurable: false,
                get: getter.bind(this)
            });
        });
    }
    setterCallback(obj, key, value, oldValue) {
        if (obj !== this.state) throw new Error('BOOM!!!');
        this.diffAndPatch();
    }

    // Render
    beforeRender() {
        this.initObserver();
        this.initComputed();
    }
    render() {}
    renderTo(entry) {
        this.beforeRender();
        this.node = this.render();
        this.entry = entry;
        console.log(this.node);
        this.entry.appendChild((0, _dom.createElement)(this.node));
    }
    diffAndPatch() {
        const oldNode = this.node;
        this.node = this.render();
        const patches = (0, _dom.diff)(this.node, oldNode);
        console.log(oldNode);
        console.log(this.node);
        console.log(patches);
        (0, _dom.patch)(this.entry, patches);
    }
};
exports.default = Component;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.utils = exports.patch = exports.diff = exports.createElement = undefined;

var _create = __webpack_require__(3);

var _diff = __webpack_require__(6);

var _patch = __webpack_require__(9);

var _utils = __webpack_require__(4);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.createElement = _create.createElement;
exports.diff = _diff.diff;
exports.patch = _patch.patch;
exports.utils = _utils2.default;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createElement = undefined;

var _utils = __webpack_require__(4);

function createElement(node) {
    /*
    node: String || {
        elementName: String
        children: node[]
        attributes: Object
    }
    */
    if (typeof node === 'object') {
        const el = document.createElement(node.elementName);
        if (node.children) {
            // node.children = [].concat(...node.children).filter(node => !!node);
            appendChildren(el, node.children);
        }
        (0, _utils.setAttributes)(el, node.attributes);
        return el;
    } else return document.createTextNode(node);
}

function appendChildren(target, children) {
    children.map(createElement).forEach(target.appendChild.bind(target));
}

exports.createElement = createElement;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.insertAfter = exports.removeAttribute = exports.setAttribute = exports.setAttributes = undefined;

var _events = __webpack_require__(5);

function setAttributes(target, attributes = {}) {
    Object.keys(attributes).filter(key => attributes.hasOwnProperty(key)).forEach(attrName => setAttribute(target, attrName, attributes[attrName]));
}

function setAttribute(target, attrName, attrValue) {
    attrName === 'className' && (attrName = 'class');
    if (_events.eventTypes.includes(attrName)) return target.addEventListener(_events.eventMap[attrName], attrValue);
    target.setAttribute(attrName, attrValue);
}

function removeAttribute(target, attrName, oldAttrValue) {
    attrName === 'className' && (attrName = 'class');
    if (_events.eventTypes.includes(attrName)) return target.addEventListener(_events.eventMap[attrName], oldAttrValue);
    target.removeAttribute(attrName);
}

function insertAfter(newEl, targetEl) {
    const parentEl = targetEl.parentNode;
    if (parentEl.lastChild === targetEl) return parentEl.appendChild(newEl);
    return parentEl.insertBefore(newEl, targetEl.nextSibling);
}

exports.setAttributes = setAttributes;
exports.setAttribute = setAttribute;
exports.removeAttribute = removeAttribute;
exports.insertAfter = insertAfter;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

const eventTypes = [
// Clipboard Events
'onCopy', 'onCut', 'onPaste',
// Composition Events
'onCompositionEnd', 'onCompositionStart', 'onCompositionUpdate',
// Keyboard Events
'onKeyDown', 'onKeyPress', 'onKeyUp',
// Focus Events
'onFocus', 'onBlur',
// Form Events
'onChange', 'onInput', 'onInvalid', 'onSubmit',
// Mouse Events
'onClick', 'onContextMenu', 'onDoubleClick', 'onDrag', 'onDragEnd', 'onDragEnter', 'onDragExit', 'onDragLeave', 'onDragOver', 'onDragStart', 'onDrop', 'onMouseDown', 'onMouseEnter', 'onMouseLeave', 'onMouseMove', 'onMouseOut', 'onMouseOver', 'onMouseUp',
// Selection Events
'onSelect',
// Touch Events
'onTouchCancel', 'onTouchEnd', 'onTouchMove', 'onTouchStart',
// UI Events
'onScroll',
// Wheel Events
'onWheel',
// Media Events
'onAbort', 'onCanPlay', 'onCanPlayThrough', 'onDurationChange', 'onEmptied', 'onEncryptedonEnded', 'onError', 'onLoadedData', 'onLoadedMetadata', 'onLoadStart', 'onPause', 'onPlayonPlaying', 'onProgress', 'onRateChange', 'onSeeked', 'onSeeking', 'onStalled', 'onSuspendonTimeUpdate', 'onVolumeChange', 'onWaiting',
// Image Events
'onLoad', 'onError',
// Animation Events
'onAnimationStart', 'onAnimationEnd', 'onAnimationIteration',
// Transition Events
'onTransitionEnd',
// Other Events
'onToggle'];

const eventMap = eventTypes.reduce((eventsMap, event) => {
    eventsMap[event] = event.replace('on', '').replace(/[A-Z]/, e => e.toLowerCase());
    return eventsMap;
}, {});

exports.eventTypes = eventTypes;
exports.eventMap = eventMap;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.diff = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _index = __webpack_require__(7);

function diff(newNode, oldNode) {
    /*
    return type Patch {
        type: ChangeType
        newNode?: Node
        children?: Patch[]
        attributes?: Patch[]
    }
     */
    if (!oldNode) return { type: _index.ChangeType.CREATE, newNode };else if (!newNode) return { type: _index.ChangeType.REMOVE };else if (isChanged(newNode, oldNode)) return { type: _index.ChangeType.REPLACE, newNode };else if (newNode.elementName) return {
        type: _index.ChangeType.UPDATE,
        children: diffChildren(newNode, oldNode),
        attributes: diffAttributes(newNode, oldNode)
    };
}

function isChanged(newNode, oldNode) {
    return typeof newNode !== typeof oldNode || typeof newNode !== "object" && newNode !== oldNode || typeof newNode === "object" && newNode.elementName !== oldNode.elementName;
}

function diffAttributes(newNode, oldNode) {
    const patches = [];
    const attributes = _extends({}, oldNode.attributes, newNode.attributes);
    Object.keys(attributes).map(attrName => {
        const newAttr = newNode.attributes[attrName];
        const oldAttr = oldNode.attributes[attrName];
        !newAttr && patches.push({
            type: _index.ChangeType.REMOVE_PROPS,
            value: oldAttr, attrName
        });
        (!oldAttr || oldAttr !== newAttr) && patches.push({
            type: _index.ChangeType.SET_PROPS,
            value: newAttr, attrName
        });
    });
    return patches;
}

function diffChildren(newNode, oldNode) {
    return [...Array(Math.max(newNode.children.length, oldNode.children.length)).keys()].map(i => diff(newNode.children[i], oldNode.children[i]));
}

exports.diff = diff;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ChangeType = undefined;

var _change = __webpack_require__(8);

var _change2 = _interopRequireDefault(_change);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.ChangeType = _change2.default;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

const Changed = {
    CREATE: 'CREATE',
    REMOVE: 'REMOVE',
    REPLACE: 'REPLACE',
    UPDATE: 'UPDATE',
    SET_PROPS: 'SET PROPS',
    REMOVE_PROPS: 'REMOVE PROPS'
};

exports.default = Changed;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.patch = undefined;

var _types = __webpack_require__(7);

var _index = __webpack_require__(3);

var _index2 = __webpack_require__(4);

function patch(parent, patches, index = 0) {
    if (!patches) return;
    const el = parent.childNodes[index];
    if (!el) return;
    switch (patches.type) {
        case _types.ChangeType.CREATE:
            {
                const { newNode } = patches;
                const newEl = (0, _index.createElement)(newNode);
                if (index === parent.childNodes.length) parent.appendChild(newEl);else parent.insertBefore(newEl, el);
                break;
            }
        case _types.ChangeType.REMOVE:
            {
                parent.removeChild(el);
                break;
            }
        case _types.ChangeType.REPLACE:
            {
                const { newNode } = patches;
                const newEl = (0, _index.createElement)(newNode);
                parent.replaceChild(newEl, el);
                break;
            }
        case _types.ChangeType.UPDATE:
            {
                const { children, attributes } = patches;
                patchAttributes(el, attributes);
                children.forEach((child, index) => patch(el, child, index));
                break;
            }
    }
}

function patchAttributes(element, attributes) {
    attributes.forEach(patch => {
        const { type, attrName, value } = patch;
        if (type === _types.ChangeType.SET_PROPS) (0, _index2.setAttribute)(element, attrName, value);else if (type === _types.ChangeType.REMOVE_PROPS) (0, _index2.removeAttribute)(element, attrName, value);
    });
}

exports.patch = patch;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.observer = exports.walk = exports.ObserverArray = exports.Observer = undefined;

var _object = __webpack_require__(11);

var _object2 = _interopRequireDefault(_object);

var _array = __webpack_require__(13);

var _array2 = _interopRequireDefault(_array);

var _utils = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Observer = _object2.default;
exports.ObserverArray = _array2.default;
exports.walk = _utils.walk;
exports.observer = _utils.observer;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _class, _temp;

var _index = __webpack_require__(12);

let Observer = (_temp = _class = class Observer {
    constructor(obj, setterCallback, getterCallback) {
        if (typeof obj !== "object") throw new TypeError('Type "Object" required!');
        (0, _index.walk)(obj, (key, value) => (0, _index.observer)(this, key, value, setterCallback, getterCallback));
    }

}, _class.from = (obj, setterCallback, getterCallback) => {
    return new Observer(obj, setterCallback, getterCallback);
}, _class.toString = () => {
    return `Observer ${undefined}`;
}, _temp);
exports.default = Observer;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getUniqueID = exports.observer = exports.walk = undefined;

var _object = __webpack_require__(11);

var _object2 = _interopRequireDefault(_object);

var _array = __webpack_require__(13);

var _array2 = _interopRequireDefault(_array);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const noop = () => {};

function walk(obj, fun) {
    if (typeof obj !== 'object') throw new TypeError(`Function "walk" require an "object" instead of ${typeof obj}`);
    if (Array.isArray(obj)) return obj.forEach((item, index) => fun(index, item, obj));else return Object.keys(obj).forEach(key => fun(key, obj[key], obj));
}

function observer(obj, key, value, setterCallback = noop, getterCallback = noop) {
    if (typeof obj !== 'object') throw new TypeError(`Function "observer" require an "object" instead of ${typeof obj}`);

    if (Array.isArray(value)) value = _array2.default.from(value, setterCallback, getterCallback);else if (typeof value === "object") value = _object2.default.from(value, setterCallback, getterCallback);

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: () => {
            getterCallback(obj, key, value);
            return value;
        },
        set: newValue => {
            const oldValue = obj[key];
            observer(obj, key, newValue, setterCallback, getterCallback);
            setterCallback(obj, key, newValue, oldValue);
        }
    });
}

const getUniqueID = function () {
    let id = 0;
    return () => id++;
}();

exports.walk = walk;
exports.observer = observer;
exports.getUniqueID = getUniqueID;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _class, _temp, _initialiseProps;

var _index = __webpack_require__(12);

let ObserverArray = (_temp = _class = class ObserverArray {
    constructor(array, setterCallback, getterCallback) {
        _initialiseProps.call(this);

        !array && (array = []);
        if (!Array.isArray(array)) throw new TypeError('Type "Array" required!');
        (0, _index.walk)(array, (index, item) => (0, _index.observer)(this, index, item, setterCallback, getterCallback));
        this.length = array.length;
    }

}, _class.from = (array, setterCallback, getterCallback) => {
    return new ObserverArray(array, setterCallback, getterCallback);
}, _class.isObserverArray = array => {
    return array.__proto__.constructor === ObserverArray;
}, _class.of = (...args) => {
    return new ObserverArray([...args]);
}, _initialiseProps = function () {
    this.concat = (...arrays) => {
        const newArray = new ObserverArray();
        [this, ...arrays].forEach(array => array.forEach(newArray.push));
        return newArray;
    };

    this.copyWithin = (...args) => {
        // TODO
        return ObserverArray.from(Array.from(this).copyWithin(...args));
    };

    this.entries = function* () {
        let index = 0;
        while (this[index]) yield [index++, this[index]];
    };

    this.every = () => {};

    this.fill = () => {};

    this.filter = () => {};

    this.find = () => {};

    this.findIndex = () => {};

    this.forEach = () => {};

    this.includes = () => {};

    this.indexOf = () => {};

    this.join = () => {};

    this.keys = () => {};

    this.lastIndexOf = () => {};

    this.map = () => {};

    this.pop = () => {};

    this.push = value => {
        (0, _index.observer)(this, this.length, value, setterCallback, getterCallback);
        this.length++;
        return value;
    };

    this.reduce = () => {};

    this.reduceRight = () => {};

    this.reverse = () => {};

    this.shift = () => {};

    this.slice = () => {};

    this.some = () => {};

    this.sort = () => {};

    this.splice = () => {};

    this.toLocaleString = () => {};

    this.toSource = () => {};

    this.toString = () => {
        return `ObserverArray [...]`;
    };

    this.unshift = () => {};

    this.values = () => {};
}, _temp);
exports.default = ObserverArray;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2Q0NTQ4NDYxYjQzNDg3OWYwYTIiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9jcmVhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdXRpbHMvZXZlbnRzLmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL2RpZmYvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdHlwZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdHlwZXMvY2hhbmdlLmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3BhdGNoL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvb2JzZXJ2ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci9vYmplY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci91dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL29ic2VydmVyL2FycmF5L2luZGV4LmpzIl0sIm5hbWVzIjpbIk11c2UiLCJDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsImVudHJ5Iiwibm9kZSIsInN0YXRlIiwiY29tcHV0ZWQiLCJjb21wb25lbnRXaWxsTW91bnQiLCJjb21wb25lbnREaWRNb3VudCIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJzaG91bGRDb21wb25lbnRVcGRhdGUiLCJjb21wb25lbnRXaWxsVXBkYXRlIiwiY29tcG9uZW50RGlkVXBkYXRlIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJjb21wb25lbnREaWRDYXRjaCIsImluaXRPYnNlcnZlciIsImZyb20iLCJzZXR0ZXJDYWxsYmFjayIsImluaXRDb21wdXRlZCIsIm5hbWUiLCJnZXR0ZXIiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJnZXQiLCJvYmoiLCJrZXkiLCJ2YWx1ZSIsIm9sZFZhbHVlIiwiRXJyb3IiLCJkaWZmQW5kUGF0Y2giLCJiZWZvcmVSZW5kZXIiLCJyZW5kZXIiLCJyZW5kZXJUbyIsImNvbnNvbGUiLCJsb2ciLCJhcHBlbmRDaGlsZCIsIm9sZE5vZGUiLCJwYXRjaGVzIiwiY3JlYXRlRWxlbWVudCIsImRpZmYiLCJwYXRjaCIsInV0aWxzIiwiZWwiLCJkb2N1bWVudCIsImVsZW1lbnROYW1lIiwiY2hpbGRyZW4iLCJhcHBlbmRDaGlsZHJlbiIsImF0dHJpYnV0ZXMiLCJjcmVhdGVUZXh0Tm9kZSIsInRhcmdldCIsIm1hcCIsImZvckVhY2giLCJzZXRBdHRyaWJ1dGVzIiwia2V5cyIsImZpbHRlciIsImhhc093blByb3BlcnR5IiwiYXR0ck5hbWUiLCJzZXRBdHRyaWJ1dGUiLCJhdHRyVmFsdWUiLCJpbmNsdWRlcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVBdHRyaWJ1dGUiLCJvbGRBdHRyVmFsdWUiLCJpbnNlcnRBZnRlciIsIm5ld0VsIiwidGFyZ2V0RWwiLCJwYXJlbnRFbCIsInBhcmVudE5vZGUiLCJsYXN0Q2hpbGQiLCJpbnNlcnRCZWZvcmUiLCJuZXh0U2libGluZyIsImV2ZW50VHlwZXMiLCJldmVudE1hcCIsInJlZHVjZSIsImV2ZW50c01hcCIsImV2ZW50IiwicmVwbGFjZSIsImUiLCJ0b0xvd2VyQ2FzZSIsIm5ld05vZGUiLCJ0eXBlIiwiQ1JFQVRFIiwiUkVNT1ZFIiwiaXNDaGFuZ2VkIiwiUkVQTEFDRSIsIlVQREFURSIsImRpZmZDaGlsZHJlbiIsImRpZmZBdHRyaWJ1dGVzIiwibmV3QXR0ciIsIm9sZEF0dHIiLCJwdXNoIiwiUkVNT1ZFX1BST1BTIiwiU0VUX1BST1BTIiwiQXJyYXkiLCJNYXRoIiwibWF4IiwibGVuZ3RoIiwiaSIsIkNoYW5nZVR5cGUiLCJDaGFuZ2VkIiwicGFyZW50IiwiaW5kZXgiLCJjaGlsZE5vZGVzIiwicmVtb3ZlQ2hpbGQiLCJyZXBsYWNlQ2hpbGQiLCJwYXRjaEF0dHJpYnV0ZXMiLCJjaGlsZCIsImVsZW1lbnQiLCJPYnNlcnZlciIsIk9ic2VydmVyQXJyYXkiLCJ3YWxrIiwib2JzZXJ2ZXIiLCJnZXR0ZXJDYWxsYmFjayIsIlR5cGVFcnJvciIsInRvU3RyaW5nIiwibm9vcCIsImZ1biIsImlzQXJyYXkiLCJpdGVtIiwic2V0IiwibmV3VmFsdWUiLCJnZXRVbmlxdWVJRCIsImlkIiwiYXJyYXkiLCJpc09ic2VydmVyQXJyYXkiLCJfX3Byb3RvX18iLCJvZiIsImFyZ3MiLCJjb25jYXQiLCJhcnJheXMiLCJuZXdBcnJheSIsImNvcHlXaXRoaW4iLCJlbnRyaWVzIiwiZXZlcnkiLCJmaWxsIiwiZmluZCIsImZpbmRJbmRleCIsImluZGV4T2YiLCJqb2luIiwibGFzdEluZGV4T2YiLCJwb3AiLCJyZWR1Y2VSaWdodCIsInJldmVyc2UiLCJzaGlmdCIsInNsaWNlIiwic29tZSIsInNvcnQiLCJzcGxpY2UiLCJ0b0xvY2FsZVN0cmluZyIsInRvU291cmNlIiwidW5zaGlmdCIsInZhbHVlcyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7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T3RFLEtBQVA7QUFDSCxLOztTQUNEK0MsTSxHQUFTLE1BQU0sQ0FBRSxDOztTQUNqQm9FLFcsR0FBYyxNQUFNLENBQUUsQzs7U0FDdEJDLE8sR0FBVSxNQUFNLENBQUUsQzs7U0FDbEJDLEssR0FBUSxNQUFNLENBQUUsQzs7U0FDaEJDLEssR0FBUSxNQUFNLENBQUUsQzs7U0FDaEJDLEksR0FBTyxNQUFNLENBQUUsQzs7U0FDZkMsSSxHQUFPLE1BQU0sQ0FBRSxDOztTQUNmQyxNLEdBQVMsTUFBTSxDQUFFLEM7O1NBQ2pCQyxjLEdBQWlCLE1BQU0sQ0FBRSxDOztTQUN6QkMsUSxHQUFXLE1BQU0sQ0FBRSxDOztTQUNuQm5DLFEsR0FBVyxNQUFNO0FBQ2IsZUFBUSxxQkFBUjtBQUNILEs7O1NBQ0RvQyxPLEdBQVUsTUFBTSxDQUFFLEM7O1NBQ2xCQyxNLEdBQVMsTUFBTSxDQUFFLEM7O2tCQWpGQTFDLGEiLCJmaWxlIjoiaW5kZXguYnVpbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYXNzZXRzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDNkNDU0ODQ2MWI0MzQ4NzlmMGEyIiwiXG5pbXBvcnQgTXVzZSBmcm9tICcuL2NvcmUnO1xuXG5cblxuZXhwb3J0IHtcbiAgICBNdXNlXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9pbmRleC5qcyIsIlxuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgZGlmZiwgcGF0Y2ggfSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgeyBPYnNlcnZlciwgb2JzZXJ2ZXIsIHdhbGsgfSBmcm9tICcuL29ic2VydmVyJztcblxuXG5cbmNsYXNzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgZW50cnkgPSBudWxsO1xuICAgIG5vZGUgPSBudWxsO1xuICAgIHN0YXRlID0ge307XG4gICAgY29tcHV0ZWQgPSB7fTtcblxuICAgIC8vIFRPRE86IExpZmVDeWNsZVxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHt9O1xuICAgIGNvbXBvbmVudERpZE1vdW50KCkge307XG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcygpIHt9O1xuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9O1xuICAgIGNvbXBvbmVudFdpbGxVcGRhdGUoKSB7fTtcbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7fTtcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHt9O1xuICAgIGNvbXBvbmVudERpZENhdGNoKCkge307XG5cbiAgICAvLyBPYnNlcnZlclxuICAgIGluaXRPYnNlcnZlcigpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IE9ic2VydmVyLmZyb20oXG4gICAgICAgICAgICB0aGlzLnN0YXRlIHx8IHt9LFxuICAgICAgICAgICAgOjp0aGlzLnNldHRlckNhbGxiYWNrXG4gICAgICAgICk7XG4gICAgfTtcbiAgICBpbml0Q29tcHV0ZWQoKSB7XG4gICAgICAgIHdhbGsoXG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVkLFxuICAgICAgICAgICAgKG5hbWUsIGdldHRlciwgY29tcHV0ZWQpID0+IHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29tcHV0ZWQsIG5hbWUsIHtcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgZ2V0OiB0aGlzOjpnZXR0ZXJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgfVxuICAgIHNldHRlckNhbGxiYWNrKG9iaiwga2V5LCB2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKG9iaiAhPT0gdGhpcy5zdGF0ZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQk9PTSEhIScpO1xuICAgICAgICB0aGlzLmRpZmZBbmRQYXRjaCgpO1xuICAgIH07XG5cbiAgICAvLyBSZW5kZXJcbiAgICBiZWZvcmVSZW5kZXIoKSB7XG4gICAgICAgIHRoaXMuaW5pdE9ic2VydmVyKCk7XG4gICAgICAgIHRoaXMuaW5pdENvbXB1dGVkKCk7XG4gICAgfTtcbiAgICByZW5kZXIoKSB7fTtcbiAgICByZW5kZXJUbyhlbnRyeSkge1xuICAgICAgICB0aGlzLmJlZm9yZVJlbmRlcigpO1xuICAgICAgICB0aGlzLm5vZGUgPSB0aGlzLnJlbmRlcigpO1xuICAgICAgICB0aGlzLmVudHJ5ID0gZW50cnk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubm9kZSlcbiAgICAgICAgdGhpcy5lbnRyeS5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KHRoaXMubm9kZSkpXG4gICAgfTtcbiAgICBkaWZmQW5kUGF0Y2goKSB7XG4gICAgICAgIGNvbnN0IG9sZE5vZGUgPSB0aGlzLm5vZGU7XG4gICAgICAgIHRoaXMubm9kZSA9IHRoaXMucmVuZGVyKCk7XG4gICAgICAgIGNvbnN0IHBhdGNoZXMgPSBkaWZmKHRoaXMubm9kZSwgb2xkTm9kZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKG9sZE5vZGUpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5vZGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhwYXRjaGVzKTtcbiAgICAgICAgcGF0Y2godGhpcy5lbnRyeSwgcGF0Y2hlcyk7XG4gICAgfTtcbn1cblxuXG5cbmV4cG9ydCBkZWZhdWx0IENvbXBvbmVudDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvaW5kZXguanMiLCJcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tICcuL2NyZWF0ZSc7XG5pbXBvcnQgeyBkaWZmIH0gZnJvbSAnLi9kaWZmJztcbmltcG9ydCB7IHBhdGNoIH0gZnJvbSAnLi9wYXRjaCc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XG5cblxuZXhwb3J0IHtcbiAgICBjcmVhdGVFbGVtZW50LFxuICAgIGRpZmYsXG4gICAgcGF0Y2gsXG4gICAgdXRpbHNcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL2luZGV4LmpzIiwiXG5pbXBvcnQgeyBzZXRBdHRyaWJ1dGVzIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5cblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudChub2RlKSB7XG4gICAgLypcbiAgICBub2RlOiBTdHJpbmcgfHwge1xuICAgICAgICBlbGVtZW50TmFtZTogU3RyaW5nXG4gICAgICAgIGNoaWxkcmVuOiBub2RlW11cbiAgICAgICAgYXR0cmlidXRlczogT2JqZWN0XG4gICAgfVxuICAgICovXG4gICAgaWYgKHR5cGVvZiBub2RlID09PSAnb2JqZWN0Jykge1xuICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobm9kZS5lbGVtZW50TmFtZSk7XG4gICAgICAgIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAvLyBub2RlLmNoaWxkcmVuID0gW10uY29uY2F0KC4uLm5vZGUuY2hpbGRyZW4pLmZpbHRlcihub2RlID0+ICEhbm9kZSk7XG4gICAgICAgICAgICBhcHBlbmRDaGlsZHJlbihlbCwgbm9kZS5jaGlsZHJlbik7XG4gICAgICAgIH1cbiAgICAgICAgc2V0QXR0cmlidXRlcyhlbCwgbm9kZS5hdHRyaWJ1dGVzKTtcbiAgICAgICAgcmV0dXJuIGVsO1xuICAgIH1cbiAgICBlbHNlIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShub2RlKTtcbn1cblxuXG5mdW5jdGlvbiBhcHBlbmRDaGlsZHJlbih0YXJnZXQsIGNoaWxkcmVuKSB7XG4gICAgY2hpbGRyZW4ubWFwKGNyZWF0ZUVsZW1lbnQpXG4gICAgICAgIC5mb3JFYWNoKDo6dGFyZ2V0LmFwcGVuZENoaWxkKVxufVxuXG5cblxuZXhwb3J0IHtcbiAgICBjcmVhdGVFbGVtZW50XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS9jcmVhdGUvaW5kZXguanMiLCJcbmltcG9ydCB7IGV2ZW50VHlwZXMsIGV2ZW50TWFwIH0gZnJvbSAnLi9ldmVudHMnO1xuXG5cblxuZnVuY3Rpb24gc2V0QXR0cmlidXRlcyh0YXJnZXQsIGF0dHJpYnV0ZXM9e30pIHtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKVxuICAgICAgICAuZmlsdGVyKGtleSA9PiBhdHRyaWJ1dGVzLmhhc093blByb3BlcnR5KGtleSkpXG4gICAgICAgIC5mb3JFYWNoKGF0dHJOYW1lID0+IHNldEF0dHJpYnV0ZSh0YXJnZXQsIGF0dHJOYW1lLCBhdHRyaWJ1dGVzW2F0dHJOYW1lXSkpO1xufVxuXG5cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZSh0YXJnZXQsIGF0dHJOYW1lLCBhdHRyVmFsdWUpIHtcbiAgICBhdHRyTmFtZSA9PT0gJ2NsYXNzTmFtZScgJiYgKGF0dHJOYW1lID0gJ2NsYXNzJyk7XG4gICAgaWYgKGV2ZW50VHlwZXMuaW5jbHVkZXMoYXR0ck5hbWUpKVxuICAgICAgICByZXR1cm4gdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICBldmVudE1hcFthdHRyTmFtZV0sXG4gICAgICAgICAgICBhdHRyVmFsdWVcbiAgICAgICAgKTtcbiAgICB0YXJnZXQuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsdWUpO1xufVxuXG5cbmZ1bmN0aW9uIHJlbW92ZUF0dHJpYnV0ZSh0YXJnZXQsIGF0dHJOYW1lLCBvbGRBdHRyVmFsdWUpIHtcbiAgICBhdHRyTmFtZSA9PT0gJ2NsYXNzTmFtZScgJiYgKGF0dHJOYW1lID0gJ2NsYXNzJyk7XG4gICAgaWYgKGV2ZW50VHlwZXMuaW5jbHVkZXMoYXR0ck5hbWUpKVxuICAgICAgICByZXR1cm4gdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICBldmVudE1hcFthdHRyTmFtZV0sXG4gICAgICAgICAgICBvbGRBdHRyVmFsdWVcbiAgICAgICAgKTtcbiAgICB0YXJnZXQucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcbn1cblxuXG5mdW5jdGlvbiBpbnNlcnRBZnRlcihuZXdFbCwgdGFyZ2V0RWwpIHtcbiAgICBjb25zdCBwYXJlbnRFbCA9IHRhcmdldEVsLnBhcmVudE5vZGU7XG4gICAgaWYgKHBhcmVudEVsLmxhc3RDaGlsZCA9PT0gdGFyZ2V0RWwpXG4gICAgICAgIHJldHVybiBwYXJlbnRFbC5hcHBlbmRDaGlsZChuZXdFbCk7XG4gICAgcmV0dXJuIHBhcmVudEVsLmluc2VydEJlZm9yZShuZXdFbCx0YXJnZXRFbC5uZXh0U2libGluZyk7XG59XG5cblxuZXhwb3J0IHtcbiAgICBzZXRBdHRyaWJ1dGVzLFxuICAgIHNldEF0dHJpYnV0ZSxcbiAgICByZW1vdmVBdHRyaWJ1dGUsXG4gICAgaW5zZXJ0QWZ0ZXJcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3V0aWxzL2luZGV4LmpzIiwiXG5jb25zdCBldmVudFR5cGVzID0gW1xuICAgIC8vIENsaXBib2FyZCBFdmVudHNcbiAgICAnb25Db3B5JywgJ29uQ3V0JywgJ29uUGFzdGUnLFxuICAgIC8vIENvbXBvc2l0aW9uIEV2ZW50c1xuICAgICdvbkNvbXBvc2l0aW9uRW5kJywgJ29uQ29tcG9zaXRpb25TdGFydCcsICdvbkNvbXBvc2l0aW9uVXBkYXRlJyxcbiAgICAvLyBLZXlib2FyZCBFdmVudHNcbiAgICAnb25LZXlEb3duJywgJ29uS2V5UHJlc3MnLCAnb25LZXlVcCcsXG4gICAgLy8gRm9jdXMgRXZlbnRzXG4gICAgJ29uRm9jdXMnLCAnb25CbHVyJyxcbiAgICAvLyBGb3JtIEV2ZW50c1xuICAgICdvbkNoYW5nZScsICdvbklucHV0JywgJ29uSW52YWxpZCcsICdvblN1Ym1pdCcsXG4gICAgLy8gTW91c2UgRXZlbnRzXG4gICAgJ29uQ2xpY2snLCAnb25Db250ZXh0TWVudScsICdvbkRvdWJsZUNsaWNrJyxcbiAgICAnb25EcmFnJywgJ29uRHJhZ0VuZCcsICdvbkRyYWdFbnRlcicsICdvbkRyYWdFeGl0JyxcbiAgICAnb25EcmFnTGVhdmUnLCAnb25EcmFnT3ZlcicsICdvbkRyYWdTdGFydCcsXG4gICAgJ29uRHJvcCcsICdvbk1vdXNlRG93bicsICdvbk1vdXNlRW50ZXInLFxuICAgICdvbk1vdXNlTGVhdmUnLCAnb25Nb3VzZU1vdmUnLCAnb25Nb3VzZU91dCcsXG4gICAgJ29uTW91c2VPdmVyJyAsJ29uTW91c2VVcCcsXG4gICAgLy8gU2VsZWN0aW9uIEV2ZW50c1xuICAgICdvblNlbGVjdCcsXG4gICAgLy8gVG91Y2ggRXZlbnRzXG4gICAgJ29uVG91Y2hDYW5jZWwnLCAnb25Ub3VjaEVuZCcsICdvblRvdWNoTW92ZScsICdvblRvdWNoU3RhcnQnLFxuICAgIC8vIFVJIEV2ZW50c1xuICAgICdvblNjcm9sbCcsXG4gICAgLy8gV2hlZWwgRXZlbnRzXG4gICAgJ29uV2hlZWwnLFxuICAgIC8vIE1lZGlhIEV2ZW50c1xuICAgICdvbkFib3J0JywgJ29uQ2FuUGxheScsICdvbkNhblBsYXlUaHJvdWdoJyxcbiAgICAnb25EdXJhdGlvbkNoYW5nZScsICdvbkVtcHRpZWQnLCAnb25FbmNyeXB0ZWRvbkVuZGVkJyxcbiAgICAnb25FcnJvcicsICdvbkxvYWRlZERhdGEnLCAnb25Mb2FkZWRNZXRhZGF0YScsXG4gICAgJ29uTG9hZFN0YXJ0JywgJ29uUGF1c2UnLCAnb25QbGF5b25QbGF5aW5nJyxcbiAgICAnb25Qcm9ncmVzcycsICdvblJhdGVDaGFuZ2UnLCAnb25TZWVrZWQnLFxuICAgICdvblNlZWtpbmcnLCAnb25TdGFsbGVkJywgJ29uU3VzcGVuZG9uVGltZVVwZGF0ZScsXG4gICAgJ29uVm9sdW1lQ2hhbmdlJywgJ29uV2FpdGluZycsXG4gICAgLy8gSW1hZ2UgRXZlbnRzXG4gICAgJ29uTG9hZCcsICdvbkVycm9yJyxcbiAgICAvLyBBbmltYXRpb24gRXZlbnRzXG4gICAgJ29uQW5pbWF0aW9uU3RhcnQnLCAnb25BbmltYXRpb25FbmQnLCAnb25BbmltYXRpb25JdGVyYXRpb24nLFxuICAgIC8vIFRyYW5zaXRpb24gRXZlbnRzXG4gICAgJ29uVHJhbnNpdGlvbkVuZCcsXG4gICAgLy8gT3RoZXIgRXZlbnRzXG4gICAgJ29uVG9nZ2xlJ1xuXTtcblxuXG5jb25zdCBldmVudE1hcCA9IGV2ZW50VHlwZXMucmVkdWNlKChldmVudHNNYXAsIGV2ZW50KSA9PiB7XG4gICAgZXZlbnRzTWFwW2V2ZW50XSA9IGV2ZW50XG4gICAgICAgIC5yZXBsYWNlKCdvbicsICcnKVxuICAgICAgICAucmVwbGFjZSgvW0EtWl0vLCBlID0+IGUudG9Mb3dlckNhc2UoKSk7XG4gICAgcmV0dXJuIGV2ZW50c01hcDtcbn0sIHt9KTtcblxuXG5leHBvcnQge1xuICAgIGV2ZW50VHlwZXMsXG4gICAgZXZlbnRNYXBcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3V0aWxzL2V2ZW50cy5qcyIsIlxuaW1wb3J0IHsgQ2hhbmdlVHlwZSB9IGZyb20gJy4uL3R5cGVzL2luZGV4JztcblxuXG5cbmZ1bmN0aW9uIGRpZmYobmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIC8qXG4gICAgcmV0dXJuIHR5cGUgUGF0Y2gge1xuICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlXG4gICAgICAgIG5ld05vZGU/OiBOb2RlXG4gICAgICAgIGNoaWxkcmVuPzogUGF0Y2hbXVxuICAgICAgICBhdHRyaWJ1dGVzPzogUGF0Y2hbXVxuICAgIH1cbiAgICAgKi9cbiAgICBpZiAoIW9sZE5vZGUpIHJldHVybiB7IHR5cGU6IENoYW5nZVR5cGUuQ1JFQVRFLCBuZXdOb2RlIH07XG4gICAgZWxzZSBpZiAoIW5ld05vZGUpIHJldHVybiB7IHR5cGU6IENoYW5nZVR5cGUuUkVNT1ZFIH07XG4gICAgZWxzZSBpZiAoaXNDaGFuZ2VkKG5ld05vZGUsIG9sZE5vZGUpKSByZXR1cm4geyB0eXBlOiBDaGFuZ2VUeXBlLlJFUExBQ0UsIG5ld05vZGUgfTtcbiAgICBlbHNlIGlmIChuZXdOb2RlLmVsZW1lbnROYW1lKVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogQ2hhbmdlVHlwZS5VUERBVEUsXG4gICAgICAgICAgICBjaGlsZHJlbjogZGlmZkNoaWxkcmVuKG5ld05vZGUsIG9sZE5vZGUpLFxuICAgICAgICAgICAgYXR0cmlidXRlczogZGlmZkF0dHJpYnV0ZXMobmV3Tm9kZSwgb2xkTm9kZSlcbiAgICAgICAgfTtcbn1cblxuZnVuY3Rpb24gaXNDaGFuZ2VkKG5ld05vZGUsIG9sZE5vZGUpIHtcbiAgICByZXR1cm4gdHlwZW9mIG5ld05vZGUgIT09IHR5cGVvZiBvbGROb2RlIHx8XG4gICAgICAgIHR5cGVvZiBuZXdOb2RlICE9PSBcIm9iamVjdFwiICYmIG5ld05vZGUgIT09IG9sZE5vZGUgfHxcbiAgICAgICAgdHlwZW9mIG5ld05vZGUgPT09IFwib2JqZWN0XCIgJiYgbmV3Tm9kZS5lbGVtZW50TmFtZSAhPT0gb2xkTm9kZS5lbGVtZW50TmFtZTtcbn1cblxuZnVuY3Rpb24gZGlmZkF0dHJpYnV0ZXMobmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIGNvbnN0IHBhdGNoZXMgID0gW107XG4gICAgY29uc3QgYXR0cmlidXRlcyA9IHsuLi5vbGROb2RlLmF0dHJpYnV0ZXMsIC4uLm5ld05vZGUuYXR0cmlidXRlc307XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykubWFwKGF0dHJOYW1lID0+IHtcbiAgICAgICAgY29uc3QgbmV3QXR0ciA9IG5ld05vZGUuYXR0cmlidXRlc1thdHRyTmFtZV07XG4gICAgICAgIGNvbnN0IG9sZEF0dHIgPSBvbGROb2RlLmF0dHJpYnV0ZXNbYXR0ck5hbWVdO1xuICAgICAgICAhbmV3QXR0ciAmJiBwYXRjaGVzLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogQ2hhbmdlVHlwZS5SRU1PVkVfUFJPUFMsXG4gICAgICAgICAgICB2YWx1ZTogb2xkQXR0ciwgYXR0ck5hbWVcbiAgICAgICAgfSk7XG4gICAgICAgICghb2xkQXR0ciB8fCBvbGRBdHRyICE9PSBuZXdBdHRyKSAmJiBwYXRjaGVzLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogQ2hhbmdlVHlwZS5TRVRfUFJPUFMsXG4gICAgICAgICAgICB2YWx1ZTogbmV3QXR0ciwgYXR0ck5hbWVcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHBhdGNoZXM7XG59XG5cblxuZnVuY3Rpb24gZGlmZkNoaWxkcmVuKG5ld05vZGUsIG9sZE5vZGUpIHtcbiAgICByZXR1cm4gWy4uLkFycmF5KE1hdGgubWF4KFxuICAgICAgICBuZXdOb2RlLmNoaWxkcmVuLmxlbmd0aCxcbiAgICAgICAgb2xkTm9kZS5jaGlsZHJlbi5sZW5ndGhcbiAgICApKS5rZXlzKCldLm1hcChpID0+IGRpZmYobmV3Tm9kZS5jaGlsZHJlbltpXSwgb2xkTm9kZS5jaGlsZHJlbltpXSkpO1xufVxuXG5cbmV4cG9ydCB7XG4gICAgZGlmZlxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS9kaWZmL2luZGV4LmpzIiwiXG5pbXBvcnQgQ2hhbmdlVHlwZSBmcm9tICcuL2NoYW5nZSc7XG5cblxuZXhwb3J0IHtcbiAgICBDaGFuZ2VUeXBlXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS90eXBlcy9pbmRleC5qcyIsIlxuY29uc3QgQ2hhbmdlZCA9IHtcbiAgICBDUkVBVEU6ICdDUkVBVEUnLFxuICAgIFJFTU9WRTogJ1JFTU9WRScsXG4gICAgUkVQTEFDRTogJ1JFUExBQ0UnLFxuICAgIFVQREFURTogJ1VQREFURScsXG4gICAgU0VUX1BST1BTOiAnU0VUIFBST1BTJyxcbiAgICBSRU1PVkVfUFJPUFM6ICdSRU1PVkUgUFJPUFMnXG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IENoYW5nZWQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS90eXBlcy9jaGFuZ2UuanMiLCJcbmltcG9ydCB7IENoYW5nZVR5cGUgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSAnLi4vY3JlYXRlL2luZGV4JztcbmltcG9ydCB7IHNldEF0dHJpYnV0ZSwgcmVtb3ZlQXR0cmlidXRlIH0gZnJvbSBcIi4uL3V0aWxzL2luZGV4XCI7XG5cblxuXG5mdW5jdGlvbiBwYXRjaChwYXJlbnQsIHBhdGNoZXMsIGluZGV4PTApIHtcbiAgICBpZiAoIXBhdGNoZXMpIHJldHVybjtcbiAgICBjb25zdCBlbCA9IHBhcmVudC5jaGlsZE5vZGVzW2luZGV4XTtcbiAgICBpZiAoIWVsKSByZXR1cm47XG4gICAgc3dpdGNoIChwYXRjaGVzLnR5cGUpIHtcbiAgICAgICAgY2FzZSBDaGFuZ2VUeXBlLkNSRUFURToge1xuICAgICAgICAgICAgY29uc3QgeyBuZXdOb2RlIH0gPSBwYXRjaGVzO1xuICAgICAgICAgICAgY29uc3QgbmV3RWwgPSBjcmVhdGVFbGVtZW50KG5ld05vZGUpO1xuICAgICAgICAgICAgaWYgKGluZGV4ID09PSBwYXJlbnQuY2hpbGROb2Rlcy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKG5ld0VsKTtcbiAgICAgICAgICAgIGVsc2UgcGFyZW50Lmluc2VydEJlZm9yZShuZXdFbCwgZWwpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBDaGFuZ2VUeXBlLlJFTU9WRToge1xuICAgICAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQ2hhbmdlVHlwZS5SRVBMQUNFOiB7XG4gICAgICAgICAgICBjb25zdCB7IG5ld05vZGUgfSA9IHBhdGNoZXM7XG4gICAgICAgICAgICBjb25zdCBuZXdFbCA9IGNyZWF0ZUVsZW1lbnQobmV3Tm9kZSk7XG4gICAgICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKG5ld0VsLCBlbCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENoYW5nZVR5cGUuVVBEQVRFOiB7XG4gICAgICAgICAgICBjb25zdCB7IGNoaWxkcmVuLCBhdHRyaWJ1dGVzIH0gPSBwYXRjaGVzO1xuICAgICAgICAgICAgcGF0Y2hBdHRyaWJ1dGVzKGVsLCBhdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goKGNoaWxkLCBpbmRleCkgPT4gcGF0Y2goZWwsIGNoaWxkLCBpbmRleCkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBhdGNoQXR0cmlidXRlcyhlbGVtZW50LCBhdHRyaWJ1dGVzKSB7XG4gICAgYXR0cmlidXRlcy5mb3JFYWNoKHBhdGNoID0+IHtcbiAgICAgICAgY29uc3QgeyB0eXBlLCBhdHRyTmFtZSwgdmFsdWUgfSA9IHBhdGNoO1xuICAgICAgICBpZiAodHlwZSA9PT0gQ2hhbmdlVHlwZS5TRVRfUFJPUFMpXG4gICAgICAgICAgICBzZXRBdHRyaWJ1dGUoZWxlbWVudCwgYXR0ck5hbWUsIHZhbHVlKTtcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gQ2hhbmdlVHlwZS5SRU1PVkVfUFJPUFMpXG4gICAgICAgICAgICByZW1vdmVBdHRyaWJ1dGUoZWxlbWVudCwgYXR0ck5hbWUsIHZhbHVlKVxuICAgIH0pXG59XG5cblxuZXhwb3J0IHtcbiAgICBwYXRjaFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vcGF0Y2gvaW5kZXguanMiLCJcbmltcG9ydCBPYnNlcnZlciBmcm9tICcuL29iamVjdCc7XG5pbXBvcnQgT2JzZXJ2ZXJBcnJheSBmcm9tICcuL2FycmF5JztcbmltcG9ydCB7IHdhbGssIG9ic2VydmVyIH0gZnJvbSAnLi91dGlscyc7XG5cblxuZXhwb3J0IHtcbiAgICBPYnNlcnZlcixcbiAgICBPYnNlcnZlckFycmF5LFxuICAgIHdhbGssIG9ic2VydmVyXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL29ic2VydmVyL2luZGV4LmpzIiwiXG5pbXBvcnQgeyB3YWxrLCBvYnNlcnZlciB9IGZyb20gJy4uL3V0aWxzL2luZGV4J1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2JzZXJ2ZXIge1xuICAgIGNvbnN0cnVjdG9yKG9iaiwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JqICE9PSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVHlwZSBcIk9iamVjdFwiIHJlcXVpcmVkIScpO1xuICAgICAgICB3YWxrKG9iaiwgKGtleSwgdmFsdWUpID0+IG9ic2VydmVyKFxuICAgICAgICAgICAgdGhpcywga2V5LCB2YWx1ZSxcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrLFxuICAgICAgICAgICAgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGZyb20gPSAob2JqLCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZlcihcbiAgICAgICAgICAgIG9iaixcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrLFxuICAgICAgICAgICAgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKVxuICAgIH07XG5cbiAgICBzdGF0aWMgdG9TdHJpbmcgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBgT2JzZXJ2ZXIgJHt0aGlzfWBcbiAgICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9vYnNlcnZlci9vYmplY3QvaW5kZXguanMiLCJcbmltcG9ydCBPYnNlcnZlciBmcm9tICcuLi9vYmplY3QnO1xuaW1wb3J0IE9ic2VydmVyQXJyYXkgZnJvbSAnLi4vYXJyYXknO1xuXG5cbmNvbnN0IG5vb3AgPSAoKSA9PiB7fTtcblxuXG5cbmZ1bmN0aW9uIHdhbGsob2JqLCBmdW4pIHtcbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEZ1bmN0aW9uIFwid2Fsa1wiIHJlcXVpcmUgYW4gXCJvYmplY3RcIiBpbnN0ZWFkIG9mICR7dHlwZW9mIG9ian1gKTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKVxuICAgICAgICByZXR1cm4gb2JqLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiBmdW4oaW5kZXgsIGl0ZW0sIG9iaikpO1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4gZnVuKGtleSwgb2JqW2tleV0sIG9iaikpO1xufVxuXG5mdW5jdGlvbiBvYnNlcnZlcihvYmosIGtleSwgdmFsdWUsIHNldHRlckNhbGxiYWNrPW5vb3AsIGdldHRlckNhbGxiYWNrPW5vb3ApIHtcbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEZ1bmN0aW9uIFwib2JzZXJ2ZXJcIiByZXF1aXJlIGFuIFwib2JqZWN0XCIgaW5zdGVhZCBvZiAke3R5cGVvZiBvYmp9YCk7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpXG4gICAgICAgIHZhbHVlID0gT2JzZXJ2ZXJBcnJheS5mcm9tKHZhbHVlLCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spO1xuICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgdmFsdWUgPSBPYnNlcnZlci5mcm9tKHZhbHVlLCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgICAgICBnZXR0ZXJDYWxsYmFjayhvYmosIGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgICAgIH0sXG4gICAgICAgIHNldDogbmV3VmFsdWUgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSBvYmpba2V5XTtcbiAgICAgICAgICAgIG9ic2VydmVyKG9iaiwga2V5LCBuZXdWYWx1ZSwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKTtcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrKG9iaiwga2V5LCBuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICB9XG4gICAgfSlcbn1cblxuXG5jb25zdCBnZXRVbmlxdWVJRCA9IGZ1bmN0aW9uKCkge1xuICAgIGxldCBpZCA9IDA7XG4gICAgcmV0dXJuICgoKSA9PiBpZCArKyk7XG59KCk7XG5cblxuZXhwb3J0IHtcbiAgICB3YWxrLFxuICAgIG9ic2VydmVyLFxuICAgIGdldFVuaXF1ZUlEXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL29ic2VydmVyL3V0aWxzL2luZGV4LmpzIiwiXG5pbXBvcnQgeyB3YWxrLCBvYnNlcnZlciB9IGZyb20gJy4uL3V0aWxzL2luZGV4JztcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9ic2VydmVyQXJyYXkge1xuICAgIGNvbnN0cnVjdG9yKGFycmF5LCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spIHtcbiAgICAgICAgIWFycmF5ICYmIChhcnJheSA9IFtdKTtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGFycmF5KSlcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1R5cGUgXCJBcnJheVwiIHJlcXVpcmVkIScpO1xuICAgICAgICB3YWxrKGFycmF5LCAoaW5kZXgsIGl0ZW0pID0+IG9ic2VydmVyKFxuICAgICAgICAgICAgdGhpcywgaW5kZXgsIGl0ZW0sXG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKSk7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGZyb20gPSAoYXJyYXksIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFjaykgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmVyQXJyYXkoXG4gICAgICAgICAgICBhcnJheSxcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrLFxuICAgICAgICAgICAgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKVxuICAgIH07XG4gICAgc3RhdGljIGlzT2JzZXJ2ZXJBcnJheSAgPSBhcnJheSA9PiB7XG4gICAgICAgIHJldHVybiBhcnJheS5fX3Byb3RvX18uY29uc3RydWN0b3IgPT09IE9ic2VydmVyQXJyYXk7XG4gICAgfTtcbiAgICBzdGF0aWMgb2YgPSAoLi4uYXJncykgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmVyQXJyYXkoWy4uLmFyZ3NdKVxuICAgIH07XG5cblxuICAgIGNvbmNhdCA9ICguLi5hcnJheXMpID0+IHtcbiAgICAgICAgY29uc3QgbmV3QXJyYXkgPSBuZXcgT2JzZXJ2ZXJBcnJheSgpO1xuICAgICAgICBbdGhpcywgLi4uYXJyYXlzXS5mb3JFYWNoKFxuICAgICAgICAgICAgYXJyYXkgPT4gYXJyYXkuZm9yRWFjaChuZXdBcnJheS5wdXNoKVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gbmV3QXJyYXk7XG4gICAgfTtcbiAgICBjb3B5V2l0aGluID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgLy8gVE9ET1xuICAgICAgICByZXR1cm4gT2JzZXJ2ZXJBcnJheS5mcm9tKFxuICAgICAgICAgICAgQXJyYXkuZnJvbSh0aGlzKS5jb3B5V2l0aGluKC4uLmFyZ3MpXG4gICAgICAgIClcbiAgICB9O1xuICAgIGVudHJpZXMgPSBmdW5jdGlvbiAqKCkge1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICB3aGlsZSAodGhpc1tpbmRleF0pXG4gICAgICAgICAgICB5aWVsZCBbaW5kZXgrKywgdGhpc1tpbmRleF1dO1xuICAgIH07XG4gICAgZXZlcnkgPSAoKSA9PiB7fTtcbiAgICBmaWxsID0gKCkgPT4ge307XG4gICAgZmlsdGVyID0gKCkgPT4ge307XG4gICAgZmluZCA9ICgpID0+IHt9O1xuICAgIGZpbmRJbmRleCA9ICgpID0+IHt9O1xuICAgIGZvckVhY2ggPSAoKSA9PiB7fTtcbiAgICBpbmNsdWRlcyA9ICgpID0+IHt9O1xuICAgIGluZGV4T2YgPSAoKSA9PiB7fTtcbiAgICBqb2luID0gKCkgPT4ge307XG4gICAga2V5cyA9ICgpID0+IHt9O1xuICAgIGxhc3RJbmRleE9mID0gKCkgPT4ge307XG4gICAgbWFwID0gKCkgPT4ge307XG4gICAgcG9wID0gKCkgPT4ge307XG4gICAgcHVzaCA9IHZhbHVlID0+IHtcbiAgICAgICAgb2JzZXJ2ZXIoXG4gICAgICAgICAgICB0aGlzLCB0aGlzLmxlbmd0aCwgdmFsdWUsXG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5sZW5ndGggKys7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIHJlZHVjZSA9ICgpID0+IHt9O1xuICAgIHJlZHVjZVJpZ2h0ID0gKCkgPT4ge307XG4gICAgcmV2ZXJzZSA9ICgpID0+IHt9O1xuICAgIHNoaWZ0ID0gKCkgPT4ge307XG4gICAgc2xpY2UgPSAoKSA9PiB7fTtcbiAgICBzb21lID0gKCkgPT4ge307XG4gICAgc29ydCA9ICgpID0+IHt9O1xuICAgIHNwbGljZSA9ICgpID0+IHt9O1xuICAgIHRvTG9jYWxlU3RyaW5nID0gKCkgPT4ge307XG4gICAgdG9Tb3VyY2UgPSAoKSA9PiB7fTtcbiAgICB0b1N0cmluZyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGBPYnNlcnZlckFycmF5IFsuLi5dYFxuICAgIH07XG4gICAgdW5zaGlmdCA9ICgpID0+IHt9O1xuICAgIHZhbHVlcyA9ICgpID0+IHt9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9vYnNlcnZlci9hcnJheS9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=