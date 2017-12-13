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
    @params node: String || {
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

function createComponentInstance(component) {}

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
    if (attrName === 'checked') return target[attrName] = attrValue;
    target.setAttribute(attrName, attrValue);
}

function removeAttribute(target, attrName, oldAttrValue) {
    attrName === 'className' && (attrName = 'class');
    if (_types.EventType.includes(attrName)) return target.removeEventListener(_types.EventMap[attrName], oldAttrValue);
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
    UPDATE_PROPS: 'UPDATE PROPS',
    REMOVE_PROPS: 'REMOVE PROPS',

    // TODO
    ADD_EVENT_LISTENER: 'ADD EVENT LISTENER',
    UPDATE_EVENT_LISTENER: 'UPDATE EVENT LISTENER',
    REMOVE_EVENT_LISTENER: 'REMOVE EVENT LISTENER'
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
    eventsMap[event] = event.replace('on', '').replace(/[A-Z]/g, e => e.toLowerCase());
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
    Object.keys(attributes).forEach(attrName => {
        const newAttr = newNode.attributes[attrName];
        const oldAttr = oldNode.attributes[attrName];
        if (newAttr === undefined && oldAttr !== undefined) return patches.push({
            type: _index.ChangeType.REMOVE_PROPS,
            oldValue: oldAttr, attrName
        });
        if (oldAttr === undefined && newAttr !== undefined) return patches.push({
            type: _index.ChangeType.SET_PROPS,
            value: newAttr, attrName
        });
        if (newAttr !== undefined && oldAttr !== undefined && oldAttr !== newAttr) return patches.push({
            type: _index.ChangeType.UPDATE_PROPS,
            value: newAttr, oldValue: oldAttr, attrName
        });
    });
    return patches;
}

function diffChildren(newNode, oldNode) {
    const newChild = newNode.children || [];
    const oldChild = oldNode.children || [];
    return [...Array(Math.max(newChild.length, oldChild.length)).keys()].map(i => diff(newChild[i], oldChild[i]));
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

var _events = __webpack_require__(7);

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
        const { type, attrName, value, oldValue } = patch;
        const isEvent = _events.EventType.includes(attrName);
        const eventName = isEvent && _events.EventMap[attrName];

        // !isEvent && console.log(type, attrName, value, oldValue);
        if (type === _types.ChangeType.SET_PROPS) return isEvent ? element.addEventListener(eventName, value) : (0, _index2.setAttribute)(element, attrName, value);
        if (type === _types.ChangeType.REMOVE_PROPS) return isEvent ? element.removeEventListener(eventName, oldValue) : (0, _index2.removeAttribute)(element, attrName, value);
        if (type === _types.ChangeType.UPDATE_PROPS) {
            if (isEvent) {
                element.removeEventListener(eventName, oldValue);
                return element.addEventListener(eventName, value);
            }
            (0, _index2.setAttribute)(element, attrName, value, oldValue);
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWZhNzdkY2E4NDg0ZTg3MTc1NmIiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9jcmVhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdHlwZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdHlwZXMvY2hhbmdlLmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3R5cGVzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9kaWZmL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3BhdGNoL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvb2JzZXJ2ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci9vYmplY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci91dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL29ic2VydmVyL2FycmF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvdXRpbHMvaW5kZXguanMiXSwibmFtZXMiOlsiTXVzZSIsIkNvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwiZW50cnkiLCJub2RlIiwic3RhdGUiLCJjb21wdXRlZCIsImNvbXBvbmVudFdpbGxNb3VudCIsImNvbXBvbmVudERpZE1vdW50IiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsInNob3VsZENvbXBvbmVudFVwZGF0ZSIsImNvbXBvbmVudFdpbGxVcGRhdGUiLCJjb21wb25lbnREaWRVcGRhdGUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImNvbXBvbmVudERpZENhdGNoIiwiaW5pdE9ic2VydmVyIiwiZnJvbSIsInNldHRlckNhbGxiYWNrIiwiaW5pdENvbXB1dGVkIiwibmFtZSIsImdldHRlciIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsImdldCIsIm9iaiIsImtleSIsInZhbHVlIiwib2xkVmFsdWUiLCJFcnJvciIsImRpZmZBbmRQYXRjaCIsImJlZm9yZVJlbmRlciIsInJlbmRlciIsInJlbmRlclRvIiwiYXBwZW5kQ2hpbGQiLCJvbGROb2RlIiwicGF0Y2hlcyIsImNyZWF0ZUVsZW1lbnQiLCJkaWZmIiwicGF0Y2giLCJ1dGlscyIsImVsIiwiZG9jdW1lbnQiLCJlbGVtZW50TmFtZSIsImNoaWxkcmVuIiwiYXBwZW5kQ2hpbGRyZW4iLCJhdHRyaWJ1dGVzIiwiY3JlYXRlVGV4dE5vZGUiLCJ0YXJnZXQiLCJtYXAiLCJmb3JFYWNoIiwiY3JlYXRlQ29tcG9uZW50SW5zdGFuY2UiLCJjb21wb25lbnQiLCJzZXRBdHRyaWJ1dGVzIiwia2V5cyIsImZpbHRlciIsImhhc093blByb3BlcnR5IiwiYXR0ck5hbWUiLCJzZXRBdHRyaWJ1dGUiLCJhdHRyVmFsdWUiLCJpbmNsdWRlcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVBdHRyaWJ1dGUiLCJvbGRBdHRyVmFsdWUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaW5zZXJ0QWZ0ZXIiLCJuZXdFbCIsInRhcmdldEVsIiwicGFyZW50RWwiLCJwYXJlbnROb2RlIiwibGFzdENoaWxkIiwiaW5zZXJ0QmVmb3JlIiwibmV4dFNpYmxpbmciLCJDaGFuZ2VUeXBlIiwiRXZlbnRUeXBlIiwiRXZlbnRNYXAiLCJDaGFuZ2VkIiwiQ1JFQVRFIiwiUkVNT1ZFIiwiUkVQTEFDRSIsIlVQREFURSIsIlNFVF9QUk9QUyIsIlVQREFURV9QUk9QUyIsIlJFTU9WRV9QUk9QUyIsIkFERF9FVkVOVF9MSVNURU5FUiIsIlVQREFURV9FVkVOVF9MSVNURU5FUiIsIlJFTU9WRV9FVkVOVF9MSVNURU5FUiIsInJlZHVjZSIsImV2ZW50c01hcCIsImV2ZW50IiwicmVwbGFjZSIsImUiLCJ0b0xvd2VyQ2FzZSIsIm5ld05vZGUiLCJ0eXBlIiwiaXNDaGFuZ2VkIiwiZGlmZkNoaWxkcmVuIiwiZGlmZkF0dHJpYnV0ZXMiLCJuZXdBdHRyIiwib2xkQXR0ciIsInVuZGVmaW5lZCIsInB1c2giLCJuZXdDaGlsZCIsIm9sZENoaWxkIiwiQXJyYXkiLCJNYXRoIiwibWF4IiwibGVuZ3RoIiwiaSIsInBhcmVudCIsImluZGV4IiwiY2hpbGROb2RlcyIsInJlbW92ZUNoaWxkIiwicmVwbGFjZUNoaWxkIiwicGF0Y2hBdHRyaWJ1dGVzIiwiY2hpbGQiLCJlbGVtZW50IiwiaXNFdmVudCIsImV2ZW50TmFtZSIsIk9ic2VydmVyIiwiT2JzZXJ2ZXJBcnJheSIsIndhbGsiLCJvYnNlcnZlciIsImdldHRlckNhbGxiYWNrIiwiVHlwZUVycm9yIiwidG9TdHJpbmciLCJub29wIiwiZnVuIiwiaXNBcnJheSIsIml0ZW0iLCJzZXQiLCJuZXdWYWx1ZSIsImdldFVuaXF1ZUlEIiwiaWQiLCJhcnJheSIsImlzT2JzZXJ2ZXJBcnJheSIsIl9fcHJvdG9fXyIsIm9mIiwiYXJncyIsImNvbmNhdCIsImFycmF5cyIsIm5ld0FycmF5IiwiY29weVdpdGhpbiIsImVudHJpZXMiLCJldmVyeSIsImZpbGwiLCJmaW5kIiwiZmluZEluZGV4IiwiaW5kZXhPZiIsImpvaW4iLCJsYXN0SW5kZXhPZiIsInBvcCIsInJlZHVjZVJpZ2h0IiwicmV2ZXJzZSIsInNoaWZ0Iiwic2xpY2UiLCJzb21lIiwic29ydCIsInNwbGljZSIsInRvTG9jYWxlU3RyaW5nIiwidG9Tb3VyY2UiLCJ1bnNoaWZ0IiwidmFsdWVzIiwiZmxhdHRlbk5vZGUiLCJmbGF0dGVuQ2hpbGRyZW4iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7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T2dLLFlBQVloSyxJQUFaLENBQVAsQ0FESixLQUVLLE9BQU9BLElBQVA7QUFDUixLQUxFLEVBTUZvRCxNQU5FLENBTUtwRCxRQUFRLENBQUMsQ0FBQ0EsSUFOZixDQUFQO0FBT0g7O1FBSUdnSyxXLEdBQUFBLFciLCJmaWxlIjoiaW5kZXguYnVpbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYXNzZXRzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDFmYTc3ZGNhODQ4NGU4NzE3NTZiIiwiXG5pbXBvcnQgTXVzZSBmcm9tICcuL2NvcmUnO1xuXG5cblxuZXhwb3J0IHtcbiAgICBNdXNlXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9pbmRleC5qcyIsIlxuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgZGlmZiwgcGF0Y2ggfSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgeyBPYnNlcnZlciwgb2JzZXJ2ZXIsIHdhbGsgfSBmcm9tICcuL29ic2VydmVyJztcbmltcG9ydCB7IGZsYXR0ZW5Ob2RlIH0gZnJvbSAnLi91dGlscydcblxuXG5cbmNsYXNzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgZW50cnkgPSBudWxsO1xuICAgIG5vZGUgPSBudWxsO1xuICAgIHN0YXRlID0ge307XG4gICAgY29tcHV0ZWQgPSB7fTtcblxuICAgIC8vIFRPRE86IExpZmVDeWNsZVxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHt9O1xuICAgIGNvbXBvbmVudERpZE1vdW50KCkge307XG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcygpIHt9O1xuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9O1xuICAgIGNvbXBvbmVudFdpbGxVcGRhdGUoKSB7fTtcbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7fTtcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHt9O1xuICAgIGNvbXBvbmVudERpZENhdGNoKCkge307XG5cbiAgICAvLyBPYnNlcnZlclxuICAgIGluaXRPYnNlcnZlcigpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IE9ic2VydmVyLmZyb20oXG4gICAgICAgICAgICB0aGlzLnN0YXRlIHx8IHt9LFxuICAgICAgICAgICAgOjp0aGlzLnNldHRlckNhbGxiYWNrXG4gICAgICAgICk7XG4gICAgfTtcbiAgICBpbml0Q29tcHV0ZWQoKSB7XG4gICAgICAgIHdhbGsoXG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVkLFxuICAgICAgICAgICAgKG5hbWUsIGdldHRlciwgY29tcHV0ZWQpID0+IHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29tcHV0ZWQsIG5hbWUsIHtcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgZ2V0OiB0aGlzOjpnZXR0ZXJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgfVxuICAgIHNldHRlckNhbGxiYWNrKG9iaiwga2V5LCB2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKG9iaiAhPT0gdGhpcy5zdGF0ZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQk9PTSEhIScpO1xuICAgICAgICB0aGlzLmRpZmZBbmRQYXRjaCgpO1xuICAgIH07XG5cbiAgICAvLyBSZW5kZXJcbiAgICBiZWZvcmVSZW5kZXIoKSB7XG4gICAgICAgIHRoaXMuaW5pdE9ic2VydmVyKCk7XG4gICAgICAgIHRoaXMuaW5pdENvbXB1dGVkKCk7XG4gICAgfTtcbiAgICByZW5kZXIoKSB7fTtcbiAgICByZW5kZXJUbyhlbnRyeSkge1xuICAgICAgICB0aGlzLmJlZm9yZVJlbmRlcigpO1xuICAgICAgICB0aGlzLm5vZGUgPSBmbGF0dGVuTm9kZSh0aGlzLnJlbmRlcigpKTtcbiAgICAgICAgdGhpcy5lbnRyeSA9IGVudHJ5O1xuICAgICAgICB0aGlzLmVudHJ5LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQodGhpcy5ub2RlKSlcbiAgICB9O1xuICAgIGRpZmZBbmRQYXRjaCgpIHtcbiAgICAgICAgY29uc3Qgb2xkTm9kZSA9IHRoaXMubm9kZTtcbiAgICAgICAgdGhpcy5ub2RlID0gZmxhdHRlbk5vZGUodGhpcy5yZW5kZXIoKSk7XG4gICAgICAgIGNvbnN0IHBhdGNoZXMgPSBkaWZmKHRoaXMubm9kZSwgb2xkTm9kZSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG9sZE5vZGUpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLm5vZGUpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhwYXRjaGVzKTtcbiAgICAgICAgcGF0Y2godGhpcy5lbnRyeSwgcGF0Y2hlcyk7XG4gICAgfTtcbn1cblxuXG5cbmV4cG9ydCBkZWZhdWx0IENvbXBvbmVudDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvaW5kZXguanMiLCJcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tICcuL2NyZWF0ZSc7XG5pbXBvcnQgeyBkaWZmIH0gZnJvbSAnLi9kaWZmJztcbmltcG9ydCB7IHBhdGNoIH0gZnJvbSAnLi9wYXRjaCc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XG5cblxuZXhwb3J0IHtcbiAgICBjcmVhdGVFbGVtZW50LFxuICAgIGRpZmYsXG4gICAgcGF0Y2gsXG4gICAgdXRpbHNcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL2luZGV4LmpzIiwiXG5pbXBvcnQgeyBzZXRBdHRyaWJ1dGVzIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5cblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudChub2RlKSB7XG4gICAgLypcbiAgICBAcGFyYW1zIG5vZGU6IFN0cmluZyB8fCB7XG4gICAgICAgIGVsZW1lbnROYW1lOiBTdHJpbmdcbiAgICAgICAgY2hpbGRyZW46IG5vZGVbXVxuICAgICAgICBhdHRyaWJ1dGVzOiBPYmplY3RcbiAgICB9XG4gICAgKi9cbiAgICBpZiAodHlwZW9mIG5vZGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChub2RlLmVsZW1lbnROYW1lKTtcbiAgICAgICAgbm9kZS5jaGlsZHJlbiAmJiBhcHBlbmRDaGlsZHJlbihlbCwgbm9kZS5jaGlsZHJlbik7XG4gICAgICAgIHNldEF0dHJpYnV0ZXMoZWwsIG5vZGUuYXR0cmlidXRlcyk7XG4gICAgICAgIHJldHVybiBlbDtcbiAgICB9XG4gICAgZWxzZSByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobm9kZSk7XG59XG5cblxuZnVuY3Rpb24gYXBwZW5kQ2hpbGRyZW4odGFyZ2V0LCBjaGlsZHJlbikge1xuICAgIGNoaWxkcmVuLm1hcChjcmVhdGVFbGVtZW50KVxuICAgICAgICAuZm9yRWFjaCg6OnRhcmdldC5hcHBlbmRDaGlsZClcbn1cblxuXG5mdW5jdGlvbiBjcmVhdGVDb21wb25lbnRJbnN0YW5jZShjb21wb25lbnQpIHtcblxufVxuXG5cbmV4cG9ydCB7XG4gICAgY3JlYXRlRWxlbWVudFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vY3JlYXRlL2luZGV4LmpzIiwiXG5pbXBvcnQgeyBFdmVudFR5cGUsIEV2ZW50TWFwIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5cblxuZnVuY3Rpb24gc2V0QXR0cmlidXRlcyh0YXJnZXQsIGF0dHJpYnV0ZXM9e30pIHtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKVxuICAgICAgICAuZmlsdGVyKGtleSA9PiBhdHRyaWJ1dGVzLmhhc093blByb3BlcnR5KGtleSkpXG4gICAgICAgIC5mb3JFYWNoKGF0dHJOYW1lID0+IHNldEF0dHJpYnV0ZSh0YXJnZXQsIGF0dHJOYW1lLCBhdHRyaWJ1dGVzW2F0dHJOYW1lXSkpO1xufVxuXG5cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZSh0YXJnZXQsIGF0dHJOYW1lLCBhdHRyVmFsdWUpIHtcbiAgICBhdHRyTmFtZSA9PT0gJ2NsYXNzTmFtZScgJiYgKGF0dHJOYW1lID0gJ2NsYXNzJyk7XG4gICAgaWYgKEV2ZW50VHlwZS5pbmNsdWRlcyhhdHRyTmFtZSkpXG4gICAgICAgIHJldHVybiB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgIEV2ZW50TWFwW2F0dHJOYW1lXSxcbiAgICAgICAgICAgIGF0dHJWYWx1ZVxuICAgICAgICApO1xuICAgIGlmIChhdHRyTmFtZSA9PT0gJ2NoZWNrZWQnKVxuICAgICAgICByZXR1cm4gdGFyZ2V0W2F0dHJOYW1lXSA9IGF0dHJWYWx1ZTtcbiAgICB0YXJnZXQuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsdWUpO1xufVxuXG5cbmZ1bmN0aW9uIHJlbW92ZUF0dHJpYnV0ZSh0YXJnZXQsIGF0dHJOYW1lLCBvbGRBdHRyVmFsdWUpIHtcbiAgICBhdHRyTmFtZSA9PT0gJ2NsYXNzTmFtZScgJiYgKGF0dHJOYW1lID0gJ2NsYXNzJyk7XG4gICAgaWYgKEV2ZW50VHlwZS5pbmNsdWRlcyhhdHRyTmFtZSkpXG4gICAgICAgIHJldHVybiB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgIEV2ZW50TWFwW2F0dHJOYW1lXSxcbiAgICAgICAgICAgIG9sZEF0dHJWYWx1ZVxuICAgICAgICApO1xuICAgIHRhcmdldC5yZW1vdmVBdHRyaWJ1dGUoYXR0ck5hbWUpO1xufVxuXG5cbmZ1bmN0aW9uIGluc2VydEFmdGVyKG5ld0VsLCB0YXJnZXRFbCkge1xuICAgIGNvbnN0IHBhcmVudEVsID0gdGFyZ2V0RWwucGFyZW50Tm9kZTtcbiAgICBpZiAocGFyZW50RWwubGFzdENoaWxkID09PSB0YXJnZXRFbClcbiAgICAgICAgcmV0dXJuIHBhcmVudEVsLmFwcGVuZENoaWxkKG5ld0VsKTtcbiAgICByZXR1cm4gcGFyZW50RWwuaW5zZXJ0QmVmb3JlKG5ld0VsLHRhcmdldEVsLm5leHRTaWJsaW5nKTtcbn1cblxuXG5leHBvcnQge1xuICAgIHNldEF0dHJpYnV0ZXMsXG4gICAgc2V0QXR0cmlidXRlLFxuICAgIHJlbW92ZUF0dHJpYnV0ZSxcbiAgICBpbnNlcnRBZnRlclxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vdXRpbHMvaW5kZXguanMiLCJcbmltcG9ydCBDaGFuZ2VUeXBlIGZyb20gJy4vY2hhbmdlJztcbmltcG9ydCB7IEV2ZW50VHlwZSwgRXZlbnRNYXAgfSBmcm9tICcuL2V2ZW50cyc7XG5cbmV4cG9ydCB7XG4gICAgQ2hhbmdlVHlwZSxcbiAgICBFdmVudFR5cGUsXG4gICAgRXZlbnRNYXBcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3R5cGVzL2luZGV4LmpzIiwiXG5jb25zdCBDaGFuZ2VkID0ge1xuICAgIENSRUFURTogJ0NSRUFURScsXG4gICAgUkVNT1ZFOiAnUkVNT1ZFJyxcbiAgICBSRVBMQUNFOiAnUkVQTEFDRScsXG4gICAgVVBEQVRFOiAnVVBEQVRFJyxcblxuICAgIFNFVF9QUk9QUzogJ1NFVCBQUk9QUycsXG4gICAgVVBEQVRFX1BST1BTOiAnVVBEQVRFIFBST1BTJyxcbiAgICBSRU1PVkVfUFJPUFM6ICdSRU1PVkUgUFJPUFMnLFxuXG4gICAgLy8gVE9ET1xuICAgIEFERF9FVkVOVF9MSVNURU5FUjogJ0FERCBFVkVOVCBMSVNURU5FUicsXG4gICAgVVBEQVRFX0VWRU5UX0xJU1RFTkVSOiAnVVBEQVRFIEVWRU5UIExJU1RFTkVSJyxcbiAgICBSRU1PVkVfRVZFTlRfTElTVEVORVI6ICdSRU1PVkUgRVZFTlQgTElTVEVORVInLFxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBDaGFuZ2VkO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vdHlwZXMvY2hhbmdlLmpzIiwiXG5jb25zdCBFdmVudFR5cGUgPSBbXG4gICAgLy8gQ2xpcGJvYXJkIEV2ZW50c1xuICAgICdvbkNvcHknLCAnb25DdXQnLCAnb25QYXN0ZScsXG4gICAgLy8gQ29tcG9zaXRpb24gRXZlbnRzXG4gICAgJ29uQ29tcG9zaXRpb25FbmQnLCAnb25Db21wb3NpdGlvblN0YXJ0JywgJ29uQ29tcG9zaXRpb25VcGRhdGUnLFxuICAgIC8vIEtleWJvYXJkIEV2ZW50c1xuICAgICdvbktleURvd24nLCAnb25LZXlQcmVzcycsICdvbktleVVwJyxcbiAgICAvLyBGb2N1cyBFdmVudHNcbiAgICAnb25Gb2N1cycsICdvbkJsdXInLFxuICAgIC8vIEZvcm0gRXZlbnRzXG4gICAgJ29uQ2hhbmdlJywgJ29uSW5wdXQnLCAnb25JbnZhbGlkJywgJ29uU3VibWl0JyxcbiAgICAvLyBNb3VzZSBFdmVudHNcbiAgICAnb25DbGljaycsICdvbkNvbnRleHRNZW51JywgJ29uRG91YmxlQ2xpY2snLFxuICAgICdvbkRyYWcnLCAnb25EcmFnRW5kJywgJ29uRHJhZ0VudGVyJywgJ29uRHJhZ0V4aXQnLFxuICAgICdvbkRyYWdMZWF2ZScsICdvbkRyYWdPdmVyJywgJ29uRHJhZ1N0YXJ0JyxcbiAgICAnb25Ecm9wJywgJ29uTW91c2VEb3duJywgJ29uTW91c2VFbnRlcicsXG4gICAgJ29uTW91c2VMZWF2ZScsICdvbk1vdXNlTW92ZScsICdvbk1vdXNlT3V0JyxcbiAgICAnb25Nb3VzZU92ZXInICwnb25Nb3VzZVVwJyxcbiAgICAvLyBTZWxlY3Rpb24gRXZlbnRzXG4gICAgJ29uU2VsZWN0JyxcbiAgICAvLyBUb3VjaCBFdmVudHNcbiAgICAnb25Ub3VjaENhbmNlbCcsICdvblRvdWNoRW5kJywgJ29uVG91Y2hNb3ZlJywgJ29uVG91Y2hTdGFydCcsXG4gICAgLy8gVUkgRXZlbnRzXG4gICAgJ29uU2Nyb2xsJyxcbiAgICAvLyBXaGVlbCBFdmVudHNcbiAgICAnb25XaGVlbCcsXG4gICAgLy8gTWVkaWEgRXZlbnRzXG4gICAgJ29uQWJvcnQnLCAnb25DYW5QbGF5JywgJ29uQ2FuUGxheVRocm91Z2gnLFxuICAgICdvbkR1cmF0aW9uQ2hhbmdlJywgJ29uRW1wdGllZCcsICdvbkVuY3J5cHRlZG9uRW5kZWQnLFxuICAgICdvbkVycm9yJywgJ29uTG9hZGVkRGF0YScsICdvbkxvYWRlZE1ldGFkYXRhJyxcbiAgICAnb25Mb2FkU3RhcnQnLCAnb25QYXVzZScsICdvblBsYXlvblBsYXlpbmcnLFxuICAgICdvblByb2dyZXNzJywgJ29uUmF0ZUNoYW5nZScsICdvblNlZWtlZCcsXG4gICAgJ29uU2Vla2luZycsICdvblN0YWxsZWQnLCAnb25TdXNwZW5kb25UaW1lVXBkYXRlJyxcbiAgICAnb25Wb2x1bWVDaGFuZ2UnLCAnb25XYWl0aW5nJyxcbiAgICAvLyBJbWFnZSBFdmVudHNcbiAgICAnb25Mb2FkJywgJ29uRXJyb3InLFxuICAgIC8vIEFuaW1hdGlvbiBFdmVudHNcbiAgICAnb25BbmltYXRpb25TdGFydCcsICdvbkFuaW1hdGlvbkVuZCcsICdvbkFuaW1hdGlvbkl0ZXJhdGlvbicsXG4gICAgLy8gVHJhbnNpdGlvbiBFdmVudHNcbiAgICAnb25UcmFuc2l0aW9uRW5kJyxcbiAgICAvLyBPdGhlciBFdmVudHNcbiAgICAnb25Ub2dnbGUnXG5dO1xuXG5cbmNvbnN0IEV2ZW50TWFwID0gRXZlbnRUeXBlLnJlZHVjZSgoZXZlbnRzTWFwLCBldmVudCkgPT4ge1xuICAgIGV2ZW50c01hcFtldmVudF0gPSBldmVudFxuICAgICAgICAucmVwbGFjZSgnb24nLCAnJylcbiAgICAgICAgLnJlcGxhY2UoL1tBLVpdL2csIGUgPT4gZS50b0xvd2VyQ2FzZSgpKTtcbiAgICByZXR1cm4gZXZlbnRzTWFwO1xufSwge30pO1xuXG5cbmV4cG9ydCB7XG4gICAgRXZlbnRUeXBlLFxuICAgIEV2ZW50TWFwXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS90eXBlcy9ldmVudHMuanMiLCJcbmltcG9ydCB7IENoYW5nZVR5cGUsIEV2ZW50VHlwZSB9IGZyb20gJy4uL3R5cGVzL2luZGV4JztcblxuXG5cbmZ1bmN0aW9uIGRpZmYobmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIC8qXG4gICAgcmV0dXJuIHR5cGUgUGF0Y2gge1xuICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlXG4gICAgICAgIG5ld05vZGU/OiBOb2RlXG4gICAgICAgIGNoaWxkcmVuPzogUGF0Y2hbXVxuICAgICAgICBhdHRyaWJ1dGVzPzogUGF0Y2hbXVxuICAgIH1cbiAgICAgKi9cbiAgICBpZiAoIW9sZE5vZGUpIHJldHVybiB7IHR5cGU6IENoYW5nZVR5cGUuQ1JFQVRFLCBuZXdOb2RlIH07XG4gICAgZWxzZSBpZiAoIW5ld05vZGUpIHJldHVybiB7IHR5cGU6IENoYW5nZVR5cGUuUkVNT1ZFIH07XG4gICAgZWxzZSBpZiAoaXNDaGFuZ2VkKG5ld05vZGUsIG9sZE5vZGUpKSByZXR1cm4geyB0eXBlOiBDaGFuZ2VUeXBlLlJFUExBQ0UsIG5ld05vZGUgfTtcbiAgICBlbHNlIGlmIChuZXdOb2RlLmVsZW1lbnROYW1lKVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogQ2hhbmdlVHlwZS5VUERBVEUsXG4gICAgICAgICAgICBjaGlsZHJlbjogZGlmZkNoaWxkcmVuKG5ld05vZGUsIG9sZE5vZGUpLFxuICAgICAgICAgICAgYXR0cmlidXRlczogZGlmZkF0dHJpYnV0ZXMobmV3Tm9kZSwgb2xkTm9kZSksXG4gICAgICAgIH07XG59XG5cbmZ1bmN0aW9uIGlzQ2hhbmdlZChuZXdOb2RlLCBvbGROb2RlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBuZXdOb2RlICE9PSB0eXBlb2Ygb2xkTm9kZSB8fFxuICAgICAgICB0eXBlb2YgbmV3Tm9kZSAhPT0gXCJvYmplY3RcIiAmJiBuZXdOb2RlICE9PSBvbGROb2RlIHx8XG4gICAgICAgIHR5cGVvZiBuZXdOb2RlID09PSBcIm9iamVjdFwiICYmIG5ld05vZGUuZWxlbWVudE5hbWUgIT09IG9sZE5vZGUuZWxlbWVudE5hbWVcbn1cblxuXG5mdW5jdGlvbiBkaWZmQXR0cmlidXRlcyhuZXdOb2RlLCBvbGROb2RlKSB7XG4gICAgY29uc3QgcGF0Y2hlcyAgPSBbXTtcbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gey4uLm9sZE5vZGUuYXR0cmlidXRlcywgLi4ubmV3Tm9kZS5hdHRyaWJ1dGVzfTtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKVxuICAgICAgICAuZm9yRWFjaChhdHRyTmFtZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXdBdHRyID0gbmV3Tm9kZS5hdHRyaWJ1dGVzW2F0dHJOYW1lXTtcbiAgICAgICAgICAgIGNvbnN0IG9sZEF0dHIgPSBvbGROb2RlLmF0dHJpYnV0ZXNbYXR0ck5hbWVdO1xuICAgICAgICAgICAgaWYgKG5ld0F0dHIgPT09IHVuZGVmaW5lZCAmJiBvbGRBdHRyICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhdGNoZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IENoYW5nZVR5cGUuUkVNT1ZFX1BST1BTLFxuICAgICAgICAgICAgICAgICAgICBvbGRWYWx1ZTogb2xkQXR0ciwgYXR0ck5hbWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChvbGRBdHRyID09PSB1bmRlZmluZWQgJiYgbmV3QXR0ciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHJldHVybiBwYXRjaGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlLlNFVF9QUk9QUyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG5ld0F0dHIsIGF0dHJOYW1lXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAobmV3QXR0ciAhPT0gdW5kZWZpbmVkICYmIG9sZEF0dHIgIT09IHVuZGVmaW5lZCAmJiBvbGRBdHRyICE9PSBuZXdBdHRyKVxuICAgICAgICAgICAgICAgIHJldHVybiBwYXRjaGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlLlVQREFURV9QUk9QUyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG5ld0F0dHIsIG9sZFZhbHVlOiBvbGRBdHRyLCBhdHRyTmFtZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICByZXR1cm4gcGF0Y2hlcztcbn1cblxuXG5mdW5jdGlvbiBkaWZmQ2hpbGRyZW4obmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIGNvbnN0IG5ld0NoaWxkID0gbmV3Tm9kZS5jaGlsZHJlbiB8fCBbXTtcbiAgICBjb25zdCBvbGRDaGlsZCA9IG9sZE5vZGUuY2hpbGRyZW4gfHwgW107XG4gICAgcmV0dXJuIFsuLi5BcnJheShNYXRoLm1heChcbiAgICAgICAgbmV3Q2hpbGQubGVuZ3RoLCBvbGRDaGlsZC5sZW5ndGhcbiAgICApKS5rZXlzKCldLm1hcChpID0+IGRpZmYobmV3Q2hpbGRbaV0sIG9sZENoaWxkW2ldKSk7XG59XG5cblxuZXhwb3J0IHtcbiAgICBkaWZmXG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL2RpZmYvaW5kZXguanMiLCJcbmltcG9ydCB7IENoYW5nZVR5cGUgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSAnLi4vY3JlYXRlL2luZGV4JztcbmltcG9ydCB7IHNldEF0dHJpYnV0ZSwgcmVtb3ZlQXR0cmlidXRlIH0gZnJvbSBcIi4uL3V0aWxzL2luZGV4XCI7XG5pbXBvcnQge0V2ZW50TWFwLCBFdmVudFR5cGV9IGZyb20gXCIuLi90eXBlcy9ldmVudHNcIjtcblxuXG5cbmZ1bmN0aW9uIHBhdGNoKHBhcmVudCwgcGF0Y2hlcywgaW5kZXg9MCkge1xuICAgIGlmICghcGF0Y2hlcykgcmV0dXJuO1xuICAgIGNvbnN0IGVsID0gcGFyZW50LmNoaWxkTm9kZXNbaW5kZXhdO1xuICAgIHN3aXRjaCAocGF0Y2hlcy50eXBlKSB7XG4gICAgICAgIGNhc2UgQ2hhbmdlVHlwZS5DUkVBVEU6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgbmV3Tm9kZSB9ID0gcGF0Y2hlcztcbiAgICAgICAgICAgIGNvbnN0IG5ld0VsID0gY3JlYXRlRWxlbWVudChuZXdOb2RlKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gcGFyZW50LmNoaWxkTm9kZXMubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChuZXdFbCk7XG4gICAgICAgICAgICBlbHNlIHBhcmVudC5pbnNlcnRCZWZvcmUobmV3RWwsIGVsKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQ2hhbmdlVHlwZS5SRU1PVkU6IHtcbiAgICAgICAgICAgIGlmICghZWwpIHJldHVybjtcbiAgICAgICAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChlbCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENoYW5nZVR5cGUuUkVQTEFDRToge1xuICAgICAgICAgICAgY29uc3QgeyBuZXdOb2RlIH0gPSBwYXRjaGVzO1xuICAgICAgICAgICAgY29uc3QgbmV3RWwgPSBjcmVhdGVFbGVtZW50KG5ld05vZGUpO1xuICAgICAgICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZChuZXdFbCwgZWwpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBDaGFuZ2VUeXBlLlVQREFURToge1xuICAgICAgICAgICAgY29uc3QgeyBjaGlsZHJlbiwgYXR0cmlidXRlcyB9ID0gcGF0Y2hlcztcbiAgICAgICAgICAgIHBhdGNoQXR0cmlidXRlcyhlbCwgYXR0cmlidXRlcyk7XG4gICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZCwgaW5kZXgpID0+IHBhdGNoKGVsLCBjaGlsZCwgaW5kZXgpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmZ1bmN0aW9uIHBhdGNoQXR0cmlidXRlcyhlbGVtZW50LCBhdHRyaWJ1dGVzKSB7XG4gICAgYXR0cmlidXRlcy5mb3JFYWNoKHBhdGNoID0+IHtcbiAgICAgICAgY29uc3QgeyB0eXBlLCBhdHRyTmFtZSwgdmFsdWUsIG9sZFZhbHVlIH0gPSBwYXRjaDtcbiAgICAgICAgY29uc3QgaXNFdmVudCA9IEV2ZW50VHlwZS5pbmNsdWRlcyhhdHRyTmFtZSk7XG4gICAgICAgIGNvbnN0IGV2ZW50TmFtZSA9IGlzRXZlbnQgJiYgRXZlbnRNYXBbYXR0ck5hbWVdO1xuXG4gICAgICAgIC8vICFpc0V2ZW50ICYmIGNvbnNvbGUubG9nKHR5cGUsIGF0dHJOYW1lLCB2YWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICBpZiAodHlwZSA9PT0gQ2hhbmdlVHlwZS5TRVRfUFJPUFMpXG4gICAgICAgICAgICByZXR1cm4gaXNFdmVudCA/XG4gICAgICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgdmFsdWUpIDpcbiAgICAgICAgICAgICAgICBzZXRBdHRyaWJ1dGUoZWxlbWVudCwgYXR0ck5hbWUsIHZhbHVlKTtcbiAgICAgICAgaWYgKHR5cGUgPT09IENoYW5nZVR5cGUuUkVNT1ZFX1BST1BTKVxuICAgICAgICAgICAgcmV0dXJuIGlzRXZlbnQgP1xuICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIG9sZFZhbHVlKSA6XG4gICAgICAgICAgICAgICAgcmVtb3ZlQXR0cmlidXRlKGVsZW1lbnQsIGF0dHJOYW1lLCB2YWx1ZSk7XG4gICAgICAgIGlmICh0eXBlID09PSBDaGFuZ2VUeXBlLlVQREFURV9QUk9QUykge1xuICAgICAgICAgICAgaWYgKGlzRXZlbnQpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBvbGRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldEF0dHJpYnV0ZShlbGVtZW50LCBhdHRyTmFtZSwgdmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0pXG59XG5cblxuZXhwb3J0IHtcbiAgICBwYXRjaFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vcGF0Y2gvaW5kZXguanMiLCJcbmltcG9ydCBPYnNlcnZlciBmcm9tICcuL29iamVjdCc7XG5pbXBvcnQgT2JzZXJ2ZXJBcnJheSBmcm9tICcuL2FycmF5JztcbmltcG9ydCB7IHdhbGssIG9ic2VydmVyIH0gZnJvbSAnLi91dGlscyc7XG5cblxuZXhwb3J0IHtcbiAgICBPYnNlcnZlcixcbiAgICBPYnNlcnZlckFycmF5LFxuICAgIHdhbGssIG9ic2VydmVyXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL29ic2VydmVyL2luZGV4LmpzIiwiXG5pbXBvcnQgeyB3YWxrLCBvYnNlcnZlciB9IGZyb20gJy4uL3V0aWxzL2luZGV4J1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2JzZXJ2ZXIge1xuICAgIGNvbnN0cnVjdG9yKG9iaiwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JqICE9PSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVHlwZSBcIk9iamVjdFwiIHJlcXVpcmVkIScpO1xuICAgICAgICB3YWxrKG9iaiwgKGtleSwgdmFsdWUpID0+IG9ic2VydmVyKFxuICAgICAgICAgICAgdGhpcywga2V5LCB2YWx1ZSxcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrLFxuICAgICAgICAgICAgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGZyb20gPSAob2JqLCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZlcihcbiAgICAgICAgICAgIG9iaixcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrLFxuICAgICAgICAgICAgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKVxuICAgIH07XG5cbiAgICBzdGF0aWMgdG9TdHJpbmcgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBgT2JzZXJ2ZXIgJHt0aGlzfWBcbiAgICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9vYnNlcnZlci9vYmplY3QvaW5kZXguanMiLCJcbmltcG9ydCBPYnNlcnZlciBmcm9tICcuLi9vYmplY3QnO1xuaW1wb3J0IE9ic2VydmVyQXJyYXkgZnJvbSAnLi4vYXJyYXknO1xuXG5cbmNvbnN0IG5vb3AgPSAoKSA9PiB7fTtcblxuXG5cbmZ1bmN0aW9uIHdhbGsob2JqLCBmdW4pIHtcbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEZ1bmN0aW9uIFwid2Fsa1wiIHJlcXVpcmUgYW4gXCJvYmplY3RcIiBpbnN0ZWFkIG9mICR7dHlwZW9mIG9ian1gKTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKVxuICAgICAgICByZXR1cm4gb2JqLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiBmdW4oaW5kZXgsIGl0ZW0sIG9iaikpO1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4gZnVuKGtleSwgb2JqW2tleV0sIG9iaikpO1xufVxuXG5mdW5jdGlvbiBvYnNlcnZlcihvYmosIGtleSwgdmFsdWUsIHNldHRlckNhbGxiYWNrPW5vb3AsIGdldHRlckNhbGxiYWNrPW5vb3ApIHtcbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEZ1bmN0aW9uIFwib2JzZXJ2ZXJcIiByZXF1aXJlIGFuIFwib2JqZWN0XCIgaW5zdGVhZCBvZiAke3R5cGVvZiBvYmp9YCk7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpXG4gICAgICAgIHZhbHVlID0gT2JzZXJ2ZXJBcnJheS5mcm9tKHZhbHVlLCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spO1xuICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgdmFsdWUgPSBPYnNlcnZlci5mcm9tKHZhbHVlLCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgICAgICBnZXR0ZXJDYWxsYmFjayhvYmosIGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgICAgIH0sXG4gICAgICAgIHNldDogbmV3VmFsdWUgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSBvYmpba2V5XTtcbiAgICAgICAgICAgIG9ic2VydmVyKG9iaiwga2V5LCBuZXdWYWx1ZSwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKTtcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrKG9iaiwga2V5LCBuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICB9XG4gICAgfSlcbn1cblxuXG5jb25zdCBnZXRVbmlxdWVJRCA9IGZ1bmN0aW9uKCkge1xuICAgIGxldCBpZCA9IDA7XG4gICAgcmV0dXJuICgoKSA9PiBpZCArKyk7XG59KCk7XG5cblxuZXhwb3J0IHtcbiAgICB3YWxrLFxuICAgIG9ic2VydmVyLFxuICAgIGdldFVuaXF1ZUlEXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL29ic2VydmVyL3V0aWxzL2luZGV4LmpzIiwiXG5pbXBvcnQgeyB3YWxrLCBvYnNlcnZlciB9IGZyb20gJy4uL3V0aWxzL2luZGV4JztcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9ic2VydmVyQXJyYXkge1xuICAgIGNvbnN0cnVjdG9yKGFycmF5LCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spIHtcbiAgICAgICAgIWFycmF5ICYmIChhcnJheSA9IFtdKTtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGFycmF5KSlcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1R5cGUgXCJBcnJheVwiIHJlcXVpcmVkIScpO1xuICAgICAgICB3YWxrKGFycmF5LCAoaW5kZXgsIGl0ZW0pID0+IG9ic2VydmVyKFxuICAgICAgICAgICAgdGhpcywgaW5kZXgsIGl0ZW0sXG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKSk7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGZyb20gPSAoYXJyYXksIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFjaykgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmVyQXJyYXkoXG4gICAgICAgICAgICBhcnJheSxcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrLFxuICAgICAgICAgICAgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKVxuICAgIH07XG4gICAgc3RhdGljIGlzT2JzZXJ2ZXJBcnJheSAgPSBhcnJheSA9PiB7XG4gICAgICAgIHJldHVybiBhcnJheS5fX3Byb3RvX18uY29uc3RydWN0b3IgPT09IE9ic2VydmVyQXJyYXk7XG4gICAgfTtcbiAgICBzdGF0aWMgb2YgPSAoLi4uYXJncykgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmVyQXJyYXkoWy4uLmFyZ3NdKVxuICAgIH07XG5cblxuICAgIGNvbmNhdCA9ICguLi5hcnJheXMpID0+IHtcbiAgICAgICAgY29uc3QgbmV3QXJyYXkgPSBuZXcgT2JzZXJ2ZXJBcnJheSgpO1xuICAgICAgICBbdGhpcywgLi4uYXJyYXlzXS5mb3JFYWNoKFxuICAgICAgICAgICAgYXJyYXkgPT4gYXJyYXkuZm9yRWFjaChuZXdBcnJheS5wdXNoKVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gbmV3QXJyYXk7XG4gICAgfTtcbiAgICBjb3B5V2l0aGluID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgLy8gVE9ET1xuICAgICAgICByZXR1cm4gT2JzZXJ2ZXJBcnJheS5mcm9tKFxuICAgICAgICAgICAgQXJyYXkuZnJvbSh0aGlzKS5jb3B5V2l0aGluKC4uLmFyZ3MpXG4gICAgICAgIClcbiAgICB9O1xuICAgIGVudHJpZXMgPSBmdW5jdGlvbiAqKCkge1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICB3aGlsZSAodGhpc1tpbmRleF0pXG4gICAgICAgICAgICB5aWVsZCBbaW5kZXgrKywgdGhpc1tpbmRleF1dO1xuICAgIH07XG4gICAgZXZlcnkgPSAoKSA9PiB7fTtcbiAgICBmaWxsID0gKCkgPT4ge307XG4gICAgZmlsdGVyID0gKCkgPT4ge307XG4gICAgZmluZCA9ICgpID0+IHt9O1xuICAgIGZpbmRJbmRleCA9ICgpID0+IHt9O1xuICAgIGZvckVhY2ggPSAoKSA9PiB7fTtcbiAgICBpbmNsdWRlcyA9ICgpID0+IHt9O1xuICAgIGluZGV4T2YgPSAoKSA9PiB7fTtcbiAgICBqb2luID0gKCkgPT4ge307XG4gICAga2V5cyA9ICgpID0+IHt9O1xuICAgIGxhc3RJbmRleE9mID0gKCkgPT4ge307XG4gICAgbWFwID0gKCkgPT4ge307XG4gICAgcG9wID0gKCkgPT4ge307XG4gICAgcHVzaCA9IHZhbHVlID0+IHtcbiAgICAgICAgb2JzZXJ2ZXIoXG4gICAgICAgICAgICB0aGlzLCB0aGlzLmxlbmd0aCwgdmFsdWUsXG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5sZW5ndGggKys7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIHJlZHVjZSA9ICgpID0+IHt9O1xuICAgIHJlZHVjZVJpZ2h0ID0gKCkgPT4ge307XG4gICAgcmV2ZXJzZSA9ICgpID0+IHt9O1xuICAgIHNoaWZ0ID0gKCkgPT4ge307XG4gICAgc2xpY2UgPSAoKSA9PiB7fTtcbiAgICBzb21lID0gKCkgPT4ge307XG4gICAgc29ydCA9ICgpID0+IHt9O1xuICAgIHNwbGljZSA9ICgpID0+IHt9O1xuICAgIHRvTG9jYWxlU3RyaW5nID0gKCkgPT4ge307XG4gICAgdG9Tb3VyY2UgPSAoKSA9PiB7fTtcbiAgICB0b1N0cmluZyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGBPYnNlcnZlckFycmF5IFsuLi5dYFxuICAgIH07XG4gICAgdW5zaGlmdCA9ICgpID0+IHt9O1xuICAgIHZhbHVlcyA9ICgpID0+IHt9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9vYnNlcnZlci9hcnJheS9pbmRleC5qcyIsIlxuZnVuY3Rpb24gZmxhdHRlbk5vZGUobm9kZSkge1xuICAgIGlmICghbm9kZSkgcmV0dXJuO1xuICAgIGlmIChub2RlLmNoaWxkcmVuKVxuICAgICAgICBub2RlLmNoaWxkcmVuID0gZmxhdHRlbkNoaWxkcmVuKG5vZGUuY2hpbGRyZW4pO1xuICAgIHJldHVybiBub2RlXG59XG5cbmZ1bmN0aW9uIGZsYXR0ZW5DaGlsZHJlbihjaGlsZHJlbikge1xuICAgIHJldHVybiBbXS5jb25jYXQoLi4uY2hpbGRyZW4pXG4gICAgICAgIC5tYXAobm9kZSA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG5vZGUgPT09ICdvYmplY3QnKVxuICAgICAgICAgICAgICAgIHJldHVybiBmbGF0dGVuTm9kZShub2RlKTtcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuIG5vZGU7XG4gICAgICAgIH0pXG4gICAgICAgIC5maWx0ZXIobm9kZSA9PiAhIW5vZGUpO1xufVxuXG5cbmV4cG9ydCB7XG4gICAgZmxhdHRlbk5vZGVcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvdXRpbHMvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9