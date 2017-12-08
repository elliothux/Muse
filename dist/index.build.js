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

var _utils = __webpack_require__(14);

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
        this.node = (0, _utils.flattenNode)(this.render());
        this.entry = entry;
        this.entry.appendChild((0, _dom.createElement)(this.node));
    }
    diffAndPatch() {
        const oldNode = this.node;
        this.node = (0, _utils.flattenNode)(this.render());
        const patches = (0, _dom.diff)(this.node, oldNode);
        // console.log(oldNode);
        // console.log(this.node);
        // console.log(patches);
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

var _diff = __webpack_require__(8);

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
        node.children && appendChildren(el, node.children);
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

var _types = __webpack_require__(5);

function setAttributes(target, attributes = {}) {
    Object.keys(attributes).filter(key => attributes.hasOwnProperty(key)).forEach(attrName => setAttribute(target, attrName, attributes[attrName]));
}

function setAttribute(target, attrName, attrValue) {
    attrName === 'className' && (attrName = 'class');
    if (_types.EventType.includes(attrName)) return target.addEventListener(_types.EventMap[attrName], attrValue);
    target.setAttribute(attrName, attrValue);
}

function removeAttribute(target, attrName, oldAttrValue) {
    attrName === 'className' && (attrName = 'class');
    if (_types.EventType.includes(attrName)) return target.addEventListener(_types.EventMap[attrName], oldAttrValue);
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
exports.EventMap = exports.EventType = exports.ChangeType = undefined;

var _change = __webpack_require__(6);

var _change2 = _interopRequireDefault(_change);

var _events = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.ChangeType = _change2.default;
exports.EventType = _events.EventType;
exports.EventMap = _events.EventMap;

/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

const EventType = [
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

const EventMap = EventType.reduce((eventsMap, event) => {
    eventsMap[event] = event.replace('on', '').replace(/[A-Z]/, e => e.toLowerCase());
    return eventsMap;
}, {});

exports.EventType = EventType;
exports.EventMap = EventMap;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.diff = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _index = __webpack_require__(5);

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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.patch = undefined;

var _types = __webpack_require__(5);

var _index = __webpack_require__(3);

var _index2 = __webpack_require__(4);

function patch(parent, patches, index = 0) {
    if (!patches) return;
    const el = parent.childNodes[index];
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
                if (!el) return;
                console.log(parent);
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

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function flattenNode(node) {
    if (!node) return;
    if (node.children) node.children = flattenChildren(node.children);
    return node;
}

function flattenChildren(children) {
    return [].concat(...children).map(node => {
        if (typeof node === 'object') return flattenNode(node);else return node;
    }).filter(node => !!node);
}

exports.flattenNode = flattenNode;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODliY2YxNjk4YTY4MGRhYmYxYTEiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9jcmVhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdHlwZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdHlwZXMvY2hhbmdlLmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3R5cGVzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9kaWZmL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3BhdGNoL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvb2JzZXJ2ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci9vYmplY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci91dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL29ic2VydmVyL2FycmF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvdXRpbHMvaW5kZXguanMiXSwibmFtZXMiOlsiTXVzZSIsIkNvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwiZW50cnkiLCJub2RlIiwic3RhdGUiLCJjb21wdXRlZCIsImNvbXBvbmVudFdpbGxNb3VudCIsImNvbXBvbmVudERpZE1vdW50IiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsInNob3VsZENvbXBvbmVudFVwZGF0ZSIsImNvbXBvbmVudFdpbGxVcGRhdGUiLCJjb21wb25lbnREaWRVcGRhdGUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImNvbXBvbmVudERpZENhdGNoIiwiaW5pdE9ic2VydmVyIiwiZnJvbSIsInNldHRlckNhbGxiYWNrIiwiaW5pdENvbXB1dGVkIiwibmFtZSIsImdldHRlciIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsImdldCIsIm9iaiIsImtleSIsInZhbHVlIiwib2xkVmFsdWUiLCJFcnJvciIsImRpZmZBbmRQYXRjaCIsImJlZm9yZVJlbmRlciIsInJlbmRlciIsInJlbmRlclRvIiwiY29uc29sZSIsImxvZyIsImFwcGVuZENoaWxkIiwib2xkTm9kZSIsInBhdGNoZXMiLCJjcmVhdGVFbGVtZW50IiwiZGlmZiIsInBhdGNoIiwidXRpbHMiLCJlbCIsImRvY3VtZW50IiwiZWxlbWVudE5hbWUiLCJjaGlsZHJlbiIsImFwcGVuZENoaWxkcmVuIiwiYXR0cmlidXRlcyIsImNyZWF0ZVRleHROb2RlIiwidGFyZ2V0IiwibWFwIiwiZm9yRWFjaCIsInNldEF0dHJpYnV0ZXMiLCJrZXlzIiwiZmlsdGVyIiwiaGFzT3duUHJvcGVydHkiLCJhdHRyTmFtZSIsInNldEF0dHJpYnV0ZSIsImF0dHJWYWx1ZSIsImluY2x1ZGVzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUF0dHJpYnV0ZSIsIm9sZEF0dHJWYWx1ZSIsImluc2VydEFmdGVyIiwibmV3RWwiLCJ0YXJnZXRFbCIsInBhcmVudEVsIiwicGFyZW50Tm9kZSIsImxhc3RDaGlsZCIsImluc2VydEJlZm9yZSIsIm5leHRTaWJsaW5nIiwiQ2hhbmdlVHlwZSIsIkV2ZW50VHlwZSIsIkV2ZW50TWFwIiwiQ2hhbmdlZCIsIkNSRUFURSIsIlJFTU9WRSIsIlJFUExBQ0UiLCJVUERBVEUiLCJTRVRfUFJPUFMiLCJSRU1PVkVfUFJPUFMiLCJyZWR1Y2UiLCJldmVudHNNYXAiLCJldmVudCIsInJlcGxhY2UiLCJlIiwidG9Mb3dlckNhc2UiLCJuZXdOb2RlIiwidHlwZSIsImlzQ2hhbmdlZCIsImRpZmZDaGlsZHJlbiIsImRpZmZBdHRyaWJ1dGVzIiwibmV3QXR0ciIsIm9sZEF0dHIiLCJwdXNoIiwiQXJyYXkiLCJNYXRoIiwibWF4IiwibGVuZ3RoIiwiaSIsInBhcmVudCIsImluZGV4IiwiY2hpbGROb2RlcyIsInJlbW92ZUNoaWxkIiwicmVwbGFjZUNoaWxkIiwicGF0Y2hBdHRyaWJ1dGVzIiwiY2hpbGQiLCJlbGVtZW50IiwiT2JzZXJ2ZXIiLCJPYnNlcnZlckFycmF5Iiwid2FsayIsIm9ic2VydmVyIiwiZ2V0dGVyQ2FsbGJhY2siLCJUeXBlRXJyb3IiLCJ0b1N0cmluZyIsIm5vb3AiLCJmdW4iLCJpc0FycmF5IiwiaXRlbSIsInNldCIsIm5ld1ZhbHVlIiwiZ2V0VW5pcXVlSUQiLCJpZCIsImFycmF5IiwiaXNPYnNlcnZlckFycmF5IiwiX19wcm90b19fIiwib2YiLCJhcmdzIiwiY29uY2F0IiwiYXJyYXlzIiwibmV3QXJyYXkiLCJjb3B5V2l0aGluIiwiZW50cmllcyIsImV2ZXJ5IiwiZmlsbCIsImZpbmQiLCJmaW5kSW5kZXgiLCJpbmRleE9mIiwiam9pbiIsImxhc3RJbmRleE9mIiwicG9wIiwicmVkdWNlUmlnaHQiLCJyZXZlcnNlIiwic2hpZnQiLCJzbGljZSIsInNvbWUiLCJzb3J0Iiwic3BsaWNlIiwidG9Mb2NhbGVTdHJpbmciLCJ0b1NvdXJjZSIsInVuc2hpZnQiLCJ2YWx1ZXMiLCJmbGF0dGVuTm9kZSIsImZsYXR0ZW5DaGlsZHJlbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZE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dWlsZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9hc3NldHMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgODliY2YxNjk4YTY4MGRhYmYxYTEiLCJcbmltcG9ydCBNdXNlIGZyb20gJy4vY29yZSc7XG5cblxuXG5leHBvcnQge1xuICAgIE11c2Vcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2luZGV4LmpzIiwiXG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBkaWZmLCBwYXRjaCB9IGZyb20gJy4vZG9tJztcbmltcG9ydCB7IE9ic2VydmVyLCBvYnNlcnZlciwgd2FsayB9IGZyb20gJy4vb2JzZXJ2ZXInO1xuaW1wb3J0IHsgZmxhdHRlbk5vZGUgfSBmcm9tICcuL3V0aWxzJ1xuXG5cblxuY2xhc3MgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBlbnRyeSA9IG51bGw7XG4gICAgbm9kZSA9IG51bGw7XG4gICAgc3RhdGUgPSB7fTtcbiAgICBjb21wdXRlZCA9IHt9O1xuXG4gICAgLy8gVE9ETzogTGlmZUN5Y2xlXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge307XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7fTtcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKCkge307XG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH07XG4gICAgY29tcG9uZW50V2lsbFVwZGF0ZSgpIHt9O1xuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHt9O1xuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge307XG4gICAgY29tcG9uZW50RGlkQ2F0Y2goKSB7fTtcblxuICAgIC8vIE9ic2VydmVyXG4gICAgaW5pdE9ic2VydmVyKCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gT2JzZXJ2ZXIuZnJvbShcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgfHwge30sXG4gICAgICAgICAgICA6OnRoaXMuc2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKTtcbiAgICB9O1xuICAgIGluaXRDb21wdXRlZCgpIHtcbiAgICAgICAgd2FsayhcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZWQsXG4gICAgICAgICAgICAobmFtZSwgZ2V0dGVyLCBjb21wdXRlZCkgPT4ge1xuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb21wdXRlZCwgbmFtZSwge1xuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBnZXQ6IHRoaXM6OmdldHRlclxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9XG4gICAgc2V0dGVyQ2FsbGJhY2sob2JqLCBrZXksIHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAob2JqICE9PSB0aGlzLnN0YXRlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCT09NISEhJyk7XG4gICAgICAgIHRoaXMuZGlmZkFuZFBhdGNoKCk7XG4gICAgfTtcblxuICAgIC8vIFJlbmRlclxuICAgIGJlZm9yZVJlbmRlcigpIHtcbiAgICAgICAgdGhpcy5pbml0T2JzZXJ2ZXIoKTtcbiAgICAgICAgdGhpcy5pbml0Q29tcHV0ZWQoKTtcbiAgICB9O1xuICAgIHJlbmRlcigpIHt9O1xuICAgIHJlbmRlclRvKGVudHJ5KSB7XG4gICAgICAgIHRoaXMuYmVmb3JlUmVuZGVyKCk7XG4gICAgICAgIHRoaXMubm9kZSA9IGZsYXR0ZW5Ob2RlKHRoaXMucmVuZGVyKCkpO1xuICAgICAgICB0aGlzLmVudHJ5ID0gZW50cnk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubm9kZSlcbiAgICAgICAgdGhpcy5lbnRyeS5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KHRoaXMubm9kZSkpXG4gICAgfTtcbiAgICBkaWZmQW5kUGF0Y2goKSB7XG4gICAgICAgIGNvbnN0IG9sZE5vZGUgPSB0aGlzLm5vZGU7XG4gICAgICAgIHRoaXMubm9kZSA9IGZsYXR0ZW5Ob2RlKHRoaXMucmVuZGVyKCkpO1xuICAgICAgICBjb25zdCBwYXRjaGVzID0gZGlmZih0aGlzLm5vZGUsIG9sZE5vZGUpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhvbGROb2RlKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5ub2RlKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cocGF0Y2hlcyk7XG4gICAgICAgIHBhdGNoKHRoaXMuZW50cnksIHBhdGNoZXMpO1xuICAgIH07XG59XG5cblxuXG5leHBvcnQgZGVmYXVsdCBDb21wb25lbnQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2luZGV4LmpzIiwiXG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSAnLi9jcmVhdGUnO1xuaW1wb3J0IHsgZGlmZiB9IGZyb20gJy4vZGlmZic7XG5pbXBvcnQgeyBwYXRjaCB9IGZyb20gJy4vcGF0Y2gnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMnO1xuXG5cbmV4cG9ydCB7XG4gICAgY3JlYXRlRWxlbWVudCxcbiAgICBkaWZmLFxuICAgIHBhdGNoLFxuICAgIHV0aWxzXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS9pbmRleC5qcyIsIlxuaW1wb3J0IHsgc2V0QXR0cmlidXRlcyB9IGZyb20gJy4uL3V0aWxzJztcblxuXG5cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQobm9kZSkge1xuICAgIC8qXG4gICAgbm9kZTogU3RyaW5nIHx8IHtcbiAgICAgICAgZWxlbWVudE5hbWU6IFN0cmluZ1xuICAgICAgICBjaGlsZHJlbjogbm9kZVtdXG4gICAgICAgIGF0dHJpYnV0ZXM6IE9iamVjdFxuICAgIH1cbiAgICAqL1xuICAgIGlmICh0eXBlb2Ygbm9kZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5vZGUuZWxlbWVudE5hbWUpO1xuICAgICAgICBub2RlLmNoaWxkcmVuICYmIGFwcGVuZENoaWxkcmVuKGVsLCBub2RlLmNoaWxkcmVuKTtcbiAgICAgICAgc2V0QXR0cmlidXRlcyhlbCwgbm9kZS5hdHRyaWJ1dGVzKTtcbiAgICAgICAgcmV0dXJuIGVsO1xuICAgIH1cbiAgICBlbHNlIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShub2RlKTtcbn1cblxuXG5mdW5jdGlvbiBhcHBlbmRDaGlsZHJlbih0YXJnZXQsIGNoaWxkcmVuKSB7XG4gICAgY2hpbGRyZW4ubWFwKGNyZWF0ZUVsZW1lbnQpXG4gICAgICAgIC5mb3JFYWNoKDo6dGFyZ2V0LmFwcGVuZENoaWxkKVxufVxuXG5cblxuZXhwb3J0IHtcbiAgICBjcmVhdGVFbGVtZW50XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS9jcmVhdGUvaW5kZXguanMiLCJcbmltcG9ydCB7IEV2ZW50VHlwZSwgRXZlbnRNYXAgfSBmcm9tICcuLi90eXBlcyc7XG5cblxuXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzKHRhcmdldCwgYXR0cmlidXRlcz17fSkge1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpXG4gICAgICAgIC5maWx0ZXIoa2V5ID0+IGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoa2V5KSlcbiAgICAgICAgLmZvckVhY2goYXR0ck5hbWUgPT4gc2V0QXR0cmlidXRlKHRhcmdldCwgYXR0ck5hbWUsIGF0dHJpYnV0ZXNbYXR0ck5hbWVdKSk7XG59XG5cblxuZnVuY3Rpb24gc2V0QXR0cmlidXRlKHRhcmdldCwgYXR0ck5hbWUsIGF0dHJWYWx1ZSkge1xuICAgIGF0dHJOYW1lID09PSAnY2xhc3NOYW1lJyAmJiAoYXR0ck5hbWUgPSAnY2xhc3MnKTtcbiAgICBpZiAoRXZlbnRUeXBlLmluY2x1ZGVzKGF0dHJOYW1lKSlcbiAgICAgICAgcmV0dXJuIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgRXZlbnRNYXBbYXR0ck5hbWVdLFxuICAgICAgICAgICAgYXR0clZhbHVlXG4gICAgICAgICk7XG4gICAgdGFyZ2V0LnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKTtcbn1cblxuXG5mdW5jdGlvbiByZW1vdmVBdHRyaWJ1dGUodGFyZ2V0LCBhdHRyTmFtZSwgb2xkQXR0clZhbHVlKSB7XG4gICAgYXR0ck5hbWUgPT09ICdjbGFzc05hbWUnICYmIChhdHRyTmFtZSA9ICdjbGFzcycpO1xuICAgIGlmIChFdmVudFR5cGUuaW5jbHVkZXMoYXR0ck5hbWUpKVxuICAgICAgICByZXR1cm4gdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICBFdmVudE1hcFthdHRyTmFtZV0sXG4gICAgICAgICAgICBvbGRBdHRyVmFsdWVcbiAgICAgICAgKTtcbiAgICB0YXJnZXQucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcbn1cblxuXG5mdW5jdGlvbiBpbnNlcnRBZnRlcihuZXdFbCwgdGFyZ2V0RWwpIHtcbiAgICBjb25zdCBwYXJlbnRFbCA9IHRhcmdldEVsLnBhcmVudE5vZGU7XG4gICAgaWYgKHBhcmVudEVsLmxhc3RDaGlsZCA9PT0gdGFyZ2V0RWwpXG4gICAgICAgIHJldHVybiBwYXJlbnRFbC5hcHBlbmRDaGlsZChuZXdFbCk7XG4gICAgcmV0dXJuIHBhcmVudEVsLmluc2VydEJlZm9yZShuZXdFbCx0YXJnZXRFbC5uZXh0U2libGluZyk7XG59XG5cblxuZXhwb3J0IHtcbiAgICBzZXRBdHRyaWJ1dGVzLFxuICAgIHNldEF0dHJpYnV0ZSxcbiAgICByZW1vdmVBdHRyaWJ1dGUsXG4gICAgaW5zZXJ0QWZ0ZXJcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3V0aWxzL2luZGV4LmpzIiwiXG5pbXBvcnQgQ2hhbmdlVHlwZSBmcm9tICcuL2NoYW5nZSc7XG5pbXBvcnQgeyBFdmVudFR5cGUsIEV2ZW50TWFwIH0gZnJvbSAnLi9ldmVudHMnO1xuXG5leHBvcnQge1xuICAgIENoYW5nZVR5cGUsXG4gICAgRXZlbnRUeXBlLFxuICAgIEV2ZW50TWFwXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS90eXBlcy9pbmRleC5qcyIsIlxuY29uc3QgQ2hhbmdlZCA9IHtcbiAgICBDUkVBVEU6ICdDUkVBVEUnLFxuICAgIFJFTU9WRTogJ1JFTU9WRScsXG4gICAgUkVQTEFDRTogJ1JFUExBQ0UnLFxuICAgIFVQREFURTogJ1VQREFURScsXG4gICAgU0VUX1BST1BTOiAnU0VUIFBST1BTJyxcbiAgICBSRU1PVkVfUFJPUFM6ICdSRU1PVkUgUFJPUFMnXG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IENoYW5nZWQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS90eXBlcy9jaGFuZ2UuanMiLCJcbmNvbnN0IEV2ZW50VHlwZSA9IFtcbiAgICAvLyBDbGlwYm9hcmQgRXZlbnRzXG4gICAgJ29uQ29weScsICdvbkN1dCcsICdvblBhc3RlJyxcbiAgICAvLyBDb21wb3NpdGlvbiBFdmVudHNcbiAgICAnb25Db21wb3NpdGlvbkVuZCcsICdvbkNvbXBvc2l0aW9uU3RhcnQnLCAnb25Db21wb3NpdGlvblVwZGF0ZScsXG4gICAgLy8gS2V5Ym9hcmQgRXZlbnRzXG4gICAgJ29uS2V5RG93bicsICdvbktleVByZXNzJywgJ29uS2V5VXAnLFxuICAgIC8vIEZvY3VzIEV2ZW50c1xuICAgICdvbkZvY3VzJywgJ29uQmx1cicsXG4gICAgLy8gRm9ybSBFdmVudHNcbiAgICAnb25DaGFuZ2UnLCAnb25JbnB1dCcsICdvbkludmFsaWQnLCAnb25TdWJtaXQnLFxuICAgIC8vIE1vdXNlIEV2ZW50c1xuICAgICdvbkNsaWNrJywgJ29uQ29udGV4dE1lbnUnLCAnb25Eb3VibGVDbGljaycsXG4gICAgJ29uRHJhZycsICdvbkRyYWdFbmQnLCAnb25EcmFnRW50ZXInLCAnb25EcmFnRXhpdCcsXG4gICAgJ29uRHJhZ0xlYXZlJywgJ29uRHJhZ092ZXInLCAnb25EcmFnU3RhcnQnLFxuICAgICdvbkRyb3AnLCAnb25Nb3VzZURvd24nLCAnb25Nb3VzZUVudGVyJyxcbiAgICAnb25Nb3VzZUxlYXZlJywgJ29uTW91c2VNb3ZlJywgJ29uTW91c2VPdXQnLFxuICAgICdvbk1vdXNlT3ZlcicgLCdvbk1vdXNlVXAnLFxuICAgIC8vIFNlbGVjdGlvbiBFdmVudHNcbiAgICAnb25TZWxlY3QnLFxuICAgIC8vIFRvdWNoIEV2ZW50c1xuICAgICdvblRvdWNoQ2FuY2VsJywgJ29uVG91Y2hFbmQnLCAnb25Ub3VjaE1vdmUnLCAnb25Ub3VjaFN0YXJ0JyxcbiAgICAvLyBVSSBFdmVudHNcbiAgICAnb25TY3JvbGwnLFxuICAgIC8vIFdoZWVsIEV2ZW50c1xuICAgICdvbldoZWVsJyxcbiAgICAvLyBNZWRpYSBFdmVudHNcbiAgICAnb25BYm9ydCcsICdvbkNhblBsYXknLCAnb25DYW5QbGF5VGhyb3VnaCcsXG4gICAgJ29uRHVyYXRpb25DaGFuZ2UnLCAnb25FbXB0aWVkJywgJ29uRW5jcnlwdGVkb25FbmRlZCcsXG4gICAgJ29uRXJyb3InLCAnb25Mb2FkZWREYXRhJywgJ29uTG9hZGVkTWV0YWRhdGEnLFxuICAgICdvbkxvYWRTdGFydCcsICdvblBhdXNlJywgJ29uUGxheW9uUGxheWluZycsXG4gICAgJ29uUHJvZ3Jlc3MnLCAnb25SYXRlQ2hhbmdlJywgJ29uU2Vla2VkJyxcbiAgICAnb25TZWVraW5nJywgJ29uU3RhbGxlZCcsICdvblN1c3BlbmRvblRpbWVVcGRhdGUnLFxuICAgICdvblZvbHVtZUNoYW5nZScsICdvbldhaXRpbmcnLFxuICAgIC8vIEltYWdlIEV2ZW50c1xuICAgICdvbkxvYWQnLCAnb25FcnJvcicsXG4gICAgLy8gQW5pbWF0aW9uIEV2ZW50c1xuICAgICdvbkFuaW1hdGlvblN0YXJ0JywgJ29uQW5pbWF0aW9uRW5kJywgJ29uQW5pbWF0aW9uSXRlcmF0aW9uJyxcbiAgICAvLyBUcmFuc2l0aW9uIEV2ZW50c1xuICAgICdvblRyYW5zaXRpb25FbmQnLFxuICAgIC8vIE90aGVyIEV2ZW50c1xuICAgICdvblRvZ2dsZSdcbl07XG5cblxuY29uc3QgRXZlbnRNYXAgPSBFdmVudFR5cGUucmVkdWNlKChldmVudHNNYXAsIGV2ZW50KSA9PiB7XG4gICAgZXZlbnRzTWFwW2V2ZW50XSA9IGV2ZW50XG4gICAgICAgIC5yZXBsYWNlKCdvbicsICcnKVxuICAgICAgICAucmVwbGFjZSgvW0EtWl0vLCBlID0+IGUudG9Mb3dlckNhc2UoKSk7XG4gICAgcmV0dXJuIGV2ZW50c01hcDtcbn0sIHt9KTtcblxuXG5leHBvcnQge1xuICAgIEV2ZW50VHlwZSxcbiAgICBFdmVudE1hcFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vdHlwZXMvZXZlbnRzLmpzIiwiXG5pbXBvcnQgeyBDaGFuZ2VUeXBlIH0gZnJvbSAnLi4vdHlwZXMvaW5kZXgnO1xuXG5cblxuZnVuY3Rpb24gZGlmZihuZXdOb2RlLCBvbGROb2RlKSB7XG4gICAgLypcbiAgICByZXR1cm4gdHlwZSBQYXRjaCB7XG4gICAgICAgIHR5cGU6IENoYW5nZVR5cGVcbiAgICAgICAgbmV3Tm9kZT86IE5vZGVcbiAgICAgICAgY2hpbGRyZW4/OiBQYXRjaFtdXG4gICAgICAgIGF0dHJpYnV0ZXM/OiBQYXRjaFtdXG4gICAgfVxuICAgICAqL1xuICAgIGlmICghb2xkTm9kZSkgcmV0dXJuIHsgdHlwZTogQ2hhbmdlVHlwZS5DUkVBVEUsIG5ld05vZGUgfTtcbiAgICBlbHNlIGlmICghbmV3Tm9kZSkgcmV0dXJuIHsgdHlwZTogQ2hhbmdlVHlwZS5SRU1PVkUgfTtcbiAgICBlbHNlIGlmIChpc0NoYW5nZWQobmV3Tm9kZSwgb2xkTm9kZSkpIHJldHVybiB7IHR5cGU6IENoYW5nZVR5cGUuUkVQTEFDRSwgbmV3Tm9kZSB9O1xuICAgIGVsc2UgaWYgKG5ld05vZGUuZWxlbWVudE5hbWUpXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlLlVQREFURSxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBkaWZmQ2hpbGRyZW4obmV3Tm9kZSwgb2xkTm9kZSksXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBkaWZmQXR0cmlidXRlcyhuZXdOb2RlLCBvbGROb2RlKVxuICAgICAgICB9O1xufVxuXG5mdW5jdGlvbiBpc0NoYW5nZWQobmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIHJldHVybiB0eXBlb2YgbmV3Tm9kZSAhPT0gdHlwZW9mIG9sZE5vZGUgfHxcbiAgICAgICAgdHlwZW9mIG5ld05vZGUgIT09IFwib2JqZWN0XCIgJiYgbmV3Tm9kZSAhPT0gb2xkTm9kZSB8fFxuICAgICAgICB0eXBlb2YgbmV3Tm9kZSA9PT0gXCJvYmplY3RcIiAmJiBuZXdOb2RlLmVsZW1lbnROYW1lICE9PSBvbGROb2RlLmVsZW1lbnROYW1lO1xufVxuXG5mdW5jdGlvbiBkaWZmQXR0cmlidXRlcyhuZXdOb2RlLCBvbGROb2RlKSB7XG4gICAgY29uc3QgcGF0Y2hlcyAgPSBbXTtcbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gey4uLm9sZE5vZGUuYXR0cmlidXRlcywgLi4ubmV3Tm9kZS5hdHRyaWJ1dGVzfTtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5tYXAoYXR0ck5hbWUgPT4ge1xuICAgICAgICBjb25zdCBuZXdBdHRyID0gbmV3Tm9kZS5hdHRyaWJ1dGVzW2F0dHJOYW1lXTtcbiAgICAgICAgY29uc3Qgb2xkQXR0ciA9IG9sZE5vZGUuYXR0cmlidXRlc1thdHRyTmFtZV07XG4gICAgICAgICFuZXdBdHRyICYmIHBhdGNoZXMucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlLlJFTU9WRV9QUk9QUyxcbiAgICAgICAgICAgIHZhbHVlOiBvbGRBdHRyLCBhdHRyTmFtZVxuICAgICAgICB9KTtcbiAgICAgICAgKCFvbGRBdHRyIHx8IG9sZEF0dHIgIT09IG5ld0F0dHIpICYmIHBhdGNoZXMucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlLlNFVF9QUk9QUyxcbiAgICAgICAgICAgIHZhbHVlOiBuZXdBdHRyLCBhdHRyTmFtZVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gcGF0Y2hlcztcbn1cblxuXG5mdW5jdGlvbiBkaWZmQ2hpbGRyZW4obmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIHJldHVybiBbLi4uQXJyYXkoTWF0aC5tYXgoXG4gICAgICAgIG5ld05vZGUuY2hpbGRyZW4ubGVuZ3RoLFxuICAgICAgICBvbGROb2RlLmNoaWxkcmVuLmxlbmd0aFxuICAgICkpLmtleXMoKV0ubWFwKGkgPT4gZGlmZihuZXdOb2RlLmNoaWxkcmVuW2ldLCBvbGROb2RlLmNoaWxkcmVuW2ldKSk7XG59XG5cblxuZXhwb3J0IHtcbiAgICBkaWZmXG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL2RpZmYvaW5kZXguanMiLCJcbmltcG9ydCB7IENoYW5nZVR5cGUgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSAnLi4vY3JlYXRlL2luZGV4JztcbmltcG9ydCB7IHNldEF0dHJpYnV0ZSwgcmVtb3ZlQXR0cmlidXRlIH0gZnJvbSBcIi4uL3V0aWxzL2luZGV4XCI7XG5cblxuXG5mdW5jdGlvbiBwYXRjaChwYXJlbnQsIHBhdGNoZXMsIGluZGV4PTApIHtcbiAgICBpZiAoIXBhdGNoZXMpIHJldHVybjtcbiAgICBjb25zdCBlbCA9IHBhcmVudC5jaGlsZE5vZGVzW2luZGV4XTtcbiAgICBzd2l0Y2ggKHBhdGNoZXMudHlwZSkge1xuICAgICAgICBjYXNlIENoYW5nZVR5cGUuQ1JFQVRFOiB7XG4gICAgICAgICAgICBjb25zdCB7IG5ld05vZGUgfSA9IHBhdGNoZXM7XG4gICAgICAgICAgICBjb25zdCBuZXdFbCA9IGNyZWF0ZUVsZW1lbnQobmV3Tm9kZSk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IHBhcmVudC5jaGlsZE5vZGVzLmxlbmd0aClcbiAgICAgICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQobmV3RWwpO1xuICAgICAgICAgICAgZWxzZSBwYXJlbnQuaW5zZXJ0QmVmb3JlKG5ld0VsLCBlbCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENoYW5nZVR5cGUuUkVNT1ZFOiB7XG4gICAgICAgICAgICBpZiAoIWVsKSByZXR1cm47XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwYXJlbnQpO1xuICAgICAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQ2hhbmdlVHlwZS5SRVBMQUNFOiB7XG4gICAgICAgICAgICBjb25zdCB7IG5ld05vZGUgfSA9IHBhdGNoZXM7XG4gICAgICAgICAgICBjb25zdCBuZXdFbCA9IGNyZWF0ZUVsZW1lbnQobmV3Tm9kZSk7XG4gICAgICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKG5ld0VsLCBlbCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENoYW5nZVR5cGUuVVBEQVRFOiB7XG4gICAgICAgICAgICBjb25zdCB7IGNoaWxkcmVuLCBhdHRyaWJ1dGVzIH0gPSBwYXRjaGVzO1xuICAgICAgICAgICAgcGF0Y2hBdHRyaWJ1dGVzKGVsLCBhdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goKGNoaWxkLCBpbmRleCkgPT4gcGF0Y2goZWwsIGNoaWxkLCBpbmRleCkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBhdGNoQXR0cmlidXRlcyhlbGVtZW50LCBhdHRyaWJ1dGVzKSB7XG4gICAgYXR0cmlidXRlcy5mb3JFYWNoKHBhdGNoID0+IHtcbiAgICAgICAgY29uc3QgeyB0eXBlLCBhdHRyTmFtZSwgdmFsdWUgfSA9IHBhdGNoO1xuICAgICAgICBpZiAodHlwZSA9PT0gQ2hhbmdlVHlwZS5TRVRfUFJPUFMpXG4gICAgICAgICAgICBzZXRBdHRyaWJ1dGUoZWxlbWVudCwgYXR0ck5hbWUsIHZhbHVlKTtcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gQ2hhbmdlVHlwZS5SRU1PVkVfUFJPUFMpXG4gICAgICAgICAgICByZW1vdmVBdHRyaWJ1dGUoZWxlbWVudCwgYXR0ck5hbWUsIHZhbHVlKVxuICAgIH0pXG59XG5cblxuZXhwb3J0IHtcbiAgICBwYXRjaFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vcGF0Y2gvaW5kZXguanMiLCJcbmltcG9ydCBPYnNlcnZlciBmcm9tICcuL29iamVjdCc7XG5pbXBvcnQgT2JzZXJ2ZXJBcnJheSBmcm9tICcuL2FycmF5JztcbmltcG9ydCB7IHdhbGssIG9ic2VydmVyIH0gZnJvbSAnLi91dGlscyc7XG5cblxuZXhwb3J0IHtcbiAgICBPYnNlcnZlcixcbiAgICBPYnNlcnZlckFycmF5LFxuICAgIHdhbGssIG9ic2VydmVyXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL29ic2VydmVyL2luZGV4LmpzIiwiXG5pbXBvcnQgeyB3YWxrLCBvYnNlcnZlciB9IGZyb20gJy4uL3V0aWxzL2luZGV4J1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2JzZXJ2ZXIge1xuICAgIGNvbnN0cnVjdG9yKG9iaiwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JqICE9PSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVHlwZSBcIk9iamVjdFwiIHJlcXVpcmVkIScpO1xuICAgICAgICB3YWxrKG9iaiwgKGtleSwgdmFsdWUpID0+IG9ic2VydmVyKFxuICAgICAgICAgICAgdGhpcywga2V5LCB2YWx1ZSxcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrLFxuICAgICAgICAgICAgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGZyb20gPSAob2JqLCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZlcihcbiAgICAgICAgICAgIG9iaixcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrLFxuICAgICAgICAgICAgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKVxuICAgIH07XG5cbiAgICBzdGF0aWMgdG9TdHJpbmcgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBgT2JzZXJ2ZXIgJHt0aGlzfWBcbiAgICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9vYnNlcnZlci9vYmplY3QvaW5kZXguanMiLCJcbmltcG9ydCBPYnNlcnZlciBmcm9tICcuLi9vYmplY3QnO1xuaW1wb3J0IE9ic2VydmVyQXJyYXkgZnJvbSAnLi4vYXJyYXknO1xuXG5cbmNvbnN0IG5vb3AgPSAoKSA9PiB7fTtcblxuXG5cbmZ1bmN0aW9uIHdhbGsob2JqLCBmdW4pIHtcbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEZ1bmN0aW9uIFwid2Fsa1wiIHJlcXVpcmUgYW4gXCJvYmplY3RcIiBpbnN0ZWFkIG9mICR7dHlwZW9mIG9ian1gKTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKVxuICAgICAgICByZXR1cm4gb2JqLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiBmdW4oaW5kZXgsIGl0ZW0sIG9iaikpO1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4gZnVuKGtleSwgb2JqW2tleV0sIG9iaikpO1xufVxuXG5mdW5jdGlvbiBvYnNlcnZlcihvYmosIGtleSwgdmFsdWUsIHNldHRlckNhbGxiYWNrPW5vb3AsIGdldHRlckNhbGxiYWNrPW5vb3ApIHtcbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEZ1bmN0aW9uIFwib2JzZXJ2ZXJcIiByZXF1aXJlIGFuIFwib2JqZWN0XCIgaW5zdGVhZCBvZiAke3R5cGVvZiBvYmp9YCk7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpXG4gICAgICAgIHZhbHVlID0gT2JzZXJ2ZXJBcnJheS5mcm9tKHZhbHVlLCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spO1xuICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgdmFsdWUgPSBPYnNlcnZlci5mcm9tKHZhbHVlLCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgICAgICBnZXR0ZXJDYWxsYmFjayhvYmosIGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgICAgIH0sXG4gICAgICAgIHNldDogbmV3VmFsdWUgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSBvYmpba2V5XTtcbiAgICAgICAgICAgIG9ic2VydmVyKG9iaiwga2V5LCBuZXdWYWx1ZSwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKTtcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrKG9iaiwga2V5LCBuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICB9XG4gICAgfSlcbn1cblxuXG5jb25zdCBnZXRVbmlxdWVJRCA9IGZ1bmN0aW9uKCkge1xuICAgIGxldCBpZCA9IDA7XG4gICAgcmV0dXJuICgoKSA9PiBpZCArKyk7XG59KCk7XG5cblxuZXhwb3J0IHtcbiAgICB3YWxrLFxuICAgIG9ic2VydmVyLFxuICAgIGdldFVuaXF1ZUlEXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL29ic2VydmVyL3V0aWxzL2luZGV4LmpzIiwiXG5pbXBvcnQgeyB3YWxrLCBvYnNlcnZlciB9IGZyb20gJy4uL3V0aWxzL2luZGV4JztcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9ic2VydmVyQXJyYXkge1xuICAgIGNvbnN0cnVjdG9yKGFycmF5LCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spIHtcbiAgICAgICAgIWFycmF5ICYmIChhcnJheSA9IFtdKTtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGFycmF5KSlcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1R5cGUgXCJBcnJheVwiIHJlcXVpcmVkIScpO1xuICAgICAgICB3YWxrKGFycmF5LCAoaW5kZXgsIGl0ZW0pID0+IG9ic2VydmVyKFxuICAgICAgICAgICAgdGhpcywgaW5kZXgsIGl0ZW0sXG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKSk7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGZyb20gPSAoYXJyYXksIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFjaykgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmVyQXJyYXkoXG4gICAgICAgICAgICBhcnJheSxcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrLFxuICAgICAgICAgICAgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKVxuICAgIH07XG4gICAgc3RhdGljIGlzT2JzZXJ2ZXJBcnJheSAgPSBhcnJheSA9PiB7XG4gICAgICAgIHJldHVybiBhcnJheS5fX3Byb3RvX18uY29uc3RydWN0b3IgPT09IE9ic2VydmVyQXJyYXk7XG4gICAgfTtcbiAgICBzdGF0aWMgb2YgPSAoLi4uYXJncykgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmVyQXJyYXkoWy4uLmFyZ3NdKVxuICAgIH07XG5cblxuICAgIGNvbmNhdCA9ICguLi5hcnJheXMpID0+IHtcbiAgICAgICAgY29uc3QgbmV3QXJyYXkgPSBuZXcgT2JzZXJ2ZXJBcnJheSgpO1xuICAgICAgICBbdGhpcywgLi4uYXJyYXlzXS5mb3JFYWNoKFxuICAgICAgICAgICAgYXJyYXkgPT4gYXJyYXkuZm9yRWFjaChuZXdBcnJheS5wdXNoKVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gbmV3QXJyYXk7XG4gICAgfTtcbiAgICBjb3B5V2l0aGluID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgLy8gVE9ET1xuICAgICAgICByZXR1cm4gT2JzZXJ2ZXJBcnJheS5mcm9tKFxuICAgICAgICAgICAgQXJyYXkuZnJvbSh0aGlzKS5jb3B5V2l0aGluKC4uLmFyZ3MpXG4gICAgICAgIClcbiAgICB9O1xuICAgIGVudHJpZXMgPSBmdW5jdGlvbiAqKCkge1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICB3aGlsZSAodGhpc1tpbmRleF0pXG4gICAgICAgICAgICB5aWVsZCBbaW5kZXgrKywgdGhpc1tpbmRleF1dO1xuICAgIH07XG4gICAgZXZlcnkgPSAoKSA9PiB7fTtcbiAgICBmaWxsID0gKCkgPT4ge307XG4gICAgZmlsdGVyID0gKCkgPT4ge307XG4gICAgZmluZCA9ICgpID0+IHt9O1xuICAgIGZpbmRJbmRleCA9ICgpID0+IHt9O1xuICAgIGZvckVhY2ggPSAoKSA9PiB7fTtcbiAgICBpbmNsdWRlcyA9ICgpID0+IHt9O1xuICAgIGluZGV4T2YgPSAoKSA9PiB7fTtcbiAgICBqb2luID0gKCkgPT4ge307XG4gICAga2V5cyA9ICgpID0+IHt9O1xuICAgIGxhc3RJbmRleE9mID0gKCkgPT4ge307XG4gICAgbWFwID0gKCkgPT4ge307XG4gICAgcG9wID0gKCkgPT4ge307XG4gICAgcHVzaCA9IHZhbHVlID0+IHtcbiAgICAgICAgb2JzZXJ2ZXIoXG4gICAgICAgICAgICB0aGlzLCB0aGlzLmxlbmd0aCwgdmFsdWUsXG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5sZW5ndGggKys7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIHJlZHVjZSA9ICgpID0+IHt9O1xuICAgIHJlZHVjZVJpZ2h0ID0gKCkgPT4ge307XG4gICAgcmV2ZXJzZSA9ICgpID0+IHt9O1xuICAgIHNoaWZ0ID0gKCkgPT4ge307XG4gICAgc2xpY2UgPSAoKSA9PiB7fTtcbiAgICBzb21lID0gKCkgPT4ge307XG4gICAgc29ydCA9ICgpID0+IHt9O1xuICAgIHNwbGljZSA9ICgpID0+IHt9O1xuICAgIHRvTG9jYWxlU3RyaW5nID0gKCkgPT4ge307XG4gICAgdG9Tb3VyY2UgPSAoKSA9PiB7fTtcbiAgICB0b1N0cmluZyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGBPYnNlcnZlckFycmF5IFsuLi5dYFxuICAgIH07XG4gICAgdW5zaGlmdCA9ICgpID0+IHt9O1xuICAgIHZhbHVlcyA9ICgpID0+IHt9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9vYnNlcnZlci9hcnJheS9pbmRleC5qcyIsIlxuZnVuY3Rpb24gZmxhdHRlbk5vZGUobm9kZSkge1xuICAgIGlmICghbm9kZSkgcmV0dXJuO1xuICAgIGlmIChub2RlLmNoaWxkcmVuKVxuICAgICAgICBub2RlLmNoaWxkcmVuID0gZmxhdHRlbkNoaWxkcmVuKG5vZGUuY2hpbGRyZW4pO1xuICAgIHJldHVybiBub2RlXG59XG5cbmZ1bmN0aW9uIGZsYXR0ZW5DaGlsZHJlbihjaGlsZHJlbikge1xuICAgIHJldHVybiBbXS5jb25jYXQoLi4uY2hpbGRyZW4pXG4gICAgICAgIC5tYXAobm9kZSA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG5vZGUgPT09ICdvYmplY3QnKVxuICAgICAgICAgICAgICAgIHJldHVybiBmbGF0dGVuTm9kZShub2RlKTtcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuIG5vZGU7XG4gICAgICAgIH0pXG4gICAgICAgIC5maWx0ZXIobm9kZSA9PiAhIW5vZGUpO1xufVxuXG5cbmV4cG9ydCB7XG4gICAgZmxhdHRlbk5vZGVcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvdXRpbHMvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9