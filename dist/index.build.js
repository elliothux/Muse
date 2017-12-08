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
    REMOVE_PROPS: 'REMOVE PROPS',

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
        // events: diffEvents(newNode, oldNode)
    };
}

function isChanged(newNode, oldNode) {
    return typeof newNode !== typeof oldNode || typeof newNode !== "object" && newNode !== oldNode || typeof newNode === "object" && newNode.elementName !== oldNode.elementName;
}

function diffEvents(newNode, oldNode) {
    const patches = [];
    const attributes = _extends({}, oldNode.attributes, newNode.attributes);
    Object.keys(attributes).filter(attrName => _index.EventType.includes(attrName)).forEach(eventName => {
        const newHandler = newNode.attributes[eventName];
        const oldHandler = oldNode.attributes[eventName];
        if (!newHandler) return patches.push({
            type: _index.ChangeType.REMOVE_EVENT_LISTENER,
            value: oldHandler, eventName
        });else if (!oldHandler) patches.push({
            type: _index.ChangeType.ADD_EVENT_LISTENER,
            value: newHandler, eventName
        });else patches.push({
            type: _index.ChangeType.UPDATE_EVENT_LISTENER,
            value: newHandler, oldValue: oldHandler, eventName
        });
    });
    return patches;
}

function diffAttributes(newNode, oldNode) {
    const patches = [];
    const attributes = _extends({}, oldNode.attributes, newNode.attributes);
    Object.keys(attributes).forEach(attrName => {
        const newAttr = newNode.attributes[attrName];
        const oldAttr = oldNode.attributes[attrName];
        !newAttr && patches.push({
            type: _index.ChangeType.REMOVE_PROPS,
            value: oldAttr, attrName
        });
        (!oldAttr || oldAttr !== newAttr) && patches.push({
            type: _index.ChangeType.SET_PROPS,
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
                const { children, attributes, events } = patches;
                patchAttributes(el, attributes);
                // patchEvents(el, events);
                children.forEach((child, index) => patch(el, child, index));
                break;
            }
    }
}

function patchEvents(el, events) {
    events.forEach(patch => {
        const { type, value, oldValue, eventName } = patch;
        if (type === _types.ChangeType.ADD_EVENT_LISTENER) return el.addEventListener(eventName, value);
        if (type === _types.ChangeType.REMOVE_EVENT_LISTENER) return el.removeEventListener(eventName, oldValue);
        if (type === _types.ChangeType.UPDATE_EVENT_LISTENER) {
            el.removeEventListener(eventName, oldValue);
            el.addEventListener(eventName, value);
        }
    });
}

function patchAttributes(element, attributes) {
    attributes.forEach(patch => {
        const { type, attrName, value, oldValue } = patch;
        if (_events.EventType.includes(attrName)) {
            const eventName = _events.EventMap[attrName];
            if (type === _types.ChangeType.SET_PROPS) {
                oldValue && element.removeEventListener(eventName, oldValue);
                return element.addEventListener(eventName, value);
            }
            if (type === _types.ChangeType.REMOVE_PROPS) return element.removeEventListener(eventName, oldValue);
        } else {
            if (type === _types.ChangeType.SET_PROPS) return (0, _index2.setAttribute)(element, attrName, value);else if (type === _types.ChangeType.REMOVE_PROPS) return (0, _index2.removeAttribute)(element, attrName, value);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTRjZjlhZDE1ZDQ3MThiOTBiYWQiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9jcmVhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdHlwZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdHlwZXMvY2hhbmdlLmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3R5cGVzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9kaWZmL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3BhdGNoL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvb2JzZXJ2ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci9vYmplY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci91dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL29ic2VydmVyL2FycmF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvdXRpbHMvaW5kZXguanMiXSwibmFtZXMiOlsiTXVzZSIsIkNvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwiZW50cnkiLCJub2RlIiwic3RhdGUiLCJjb21wdXRlZCIsImNvbXBvbmVudFdpbGxNb3VudCIsImNvbXBvbmVudERpZE1vdW50IiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsInNob3VsZENvbXBvbmVudFVwZGF0ZSIsImNvbXBvbmVudFdpbGxVcGRhdGUiLCJjb21wb25lbnREaWRVcGRhdGUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImNvbXBvbmVudERpZENhdGNoIiwiaW5pdE9ic2VydmVyIiwiZnJvbSIsInNldHRlckNhbGxiYWNrIiwiaW5pdENvbXB1dGVkIiwibmFtZSIsImdldHRlciIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsImdldCIsIm9iaiIsImtleSIsInZhbHVlIiwib2xkVmFsdWUiLCJFcnJvciIsImRpZmZBbmRQYXRjaCIsImJlZm9yZVJlbmRlciIsInJlbmRlciIsInJlbmRlclRvIiwiYXBwZW5kQ2hpbGQiLCJvbGROb2RlIiwicGF0Y2hlcyIsImNyZWF0ZUVsZW1lbnQiLCJkaWZmIiwicGF0Y2giLCJ1dGlscyIsImVsIiwiZG9jdW1lbnQiLCJlbGVtZW50TmFtZSIsImNoaWxkcmVuIiwiYXBwZW5kQ2hpbGRyZW4iLCJhdHRyaWJ1dGVzIiwiY3JlYXRlVGV4dE5vZGUiLCJ0YXJnZXQiLCJtYXAiLCJmb3JFYWNoIiwic2V0QXR0cmlidXRlcyIsImtleXMiLCJmaWx0ZXIiLCJoYXNPd25Qcm9wZXJ0eSIsImF0dHJOYW1lIiwic2V0QXR0cmlidXRlIiwiYXR0clZhbHVlIiwiaW5jbHVkZXMiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlQXR0cmlidXRlIiwib2xkQXR0clZhbHVlIiwiaW5zZXJ0QWZ0ZXIiLCJuZXdFbCIsInRhcmdldEVsIiwicGFyZW50RWwiLCJwYXJlbnROb2RlIiwibGFzdENoaWxkIiwiaW5zZXJ0QmVmb3JlIiwibmV4dFNpYmxpbmciLCJDaGFuZ2VUeXBlIiwiRXZlbnRUeXBlIiwiRXZlbnRNYXAiLCJDaGFuZ2VkIiwiQ1JFQVRFIiwiUkVNT1ZFIiwiUkVQTEFDRSIsIlVQREFURSIsIlNFVF9QUk9QUyIsIlJFTU9WRV9QUk9QUyIsIkFERF9FVkVOVF9MSVNURU5FUiIsIlVQREFURV9FVkVOVF9MSVNURU5FUiIsIlJFTU9WRV9FVkVOVF9MSVNURU5FUiIsInJlZHVjZSIsImV2ZW50c01hcCIsImV2ZW50IiwicmVwbGFjZSIsImUiLCJ0b0xvd2VyQ2FzZSIsIm5ld05vZGUiLCJ0eXBlIiwiaXNDaGFuZ2VkIiwiZGlmZkNoaWxkcmVuIiwiZGlmZkF0dHJpYnV0ZXMiLCJkaWZmRXZlbnRzIiwiZXZlbnROYW1lIiwibmV3SGFuZGxlciIsIm9sZEhhbmRsZXIiLCJwdXNoIiwibmV3QXR0ciIsIm9sZEF0dHIiLCJuZXdDaGlsZCIsIm9sZENoaWxkIiwiQXJyYXkiLCJNYXRoIiwibWF4IiwibGVuZ3RoIiwiaSIsInBhcmVudCIsImluZGV4IiwiY2hpbGROb2RlcyIsInJlbW92ZUNoaWxkIiwicmVwbGFjZUNoaWxkIiwiZXZlbnRzIiwicGF0Y2hBdHRyaWJ1dGVzIiwiY2hpbGQiLCJwYXRjaEV2ZW50cyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJlbGVtZW50IiwiT2JzZXJ2ZXIiLCJPYnNlcnZlckFycmF5Iiwid2FsayIsIm9ic2VydmVyIiwiZ2V0dGVyQ2FsbGJhY2siLCJUeXBlRXJyb3IiLCJ0b1N0cmluZyIsIm5vb3AiLCJmdW4iLCJpc0FycmF5IiwiaXRlbSIsInNldCIsIm5ld1ZhbHVlIiwiZ2V0VW5pcXVlSUQiLCJpZCIsImFycmF5IiwiaXNPYnNlcnZlckFycmF5IiwiX19wcm90b19fIiwib2YiLCJhcmdzIiwiY29uY2F0IiwiYXJyYXlzIiwibmV3QXJyYXkiLCJjb3B5V2l0aGluIiwiZW50cmllcyIsImV2ZXJ5IiwiZmlsbCIsImZpbmQiLCJmaW5kSW5kZXgiLCJpbmRleE9mIiwiam9pbiIsImxhc3RJbmRleE9mIiwicG9wIiwicmVkdWNlUmlnaHQiLCJyZXZlcnNlIiwic2hpZnQiLCJzbGljZSIsInNvbWUiLCJzb3J0Iiwic3BsaWNlIiwidG9Mb2NhbGVTdHJpbmciLCJ0b1NvdXJjZSIsInVuc2hpZnQiLCJ2YWx1ZXMiLCJmbGF0dGVuTm9kZSIsImZsYXR0ZW5DaGlsZHJlbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FB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O1FBSUdnSyxXLEdBQUFBLFciLCJmaWxlIjoiaW5kZXguYnVpbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYXNzZXRzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGE0Y2Y5YWQxNWQ0NzE4YjkwYmFkIiwiXG5pbXBvcnQgTXVzZSBmcm9tICcuL2NvcmUnO1xuXG5cblxuZXhwb3J0IHtcbiAgICBNdXNlXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9pbmRleC5qcyIsIlxuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgZGlmZiwgcGF0Y2ggfSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgeyBPYnNlcnZlciwgb2JzZXJ2ZXIsIHdhbGsgfSBmcm9tICcuL29ic2VydmVyJztcbmltcG9ydCB7IGZsYXR0ZW5Ob2RlIH0gZnJvbSAnLi91dGlscydcblxuXG5cbmNsYXNzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgZW50cnkgPSBudWxsO1xuICAgIG5vZGUgPSBudWxsO1xuICAgIHN0YXRlID0ge307XG4gICAgY29tcHV0ZWQgPSB7fTtcblxuICAgIC8vIFRPRE86IExpZmVDeWNsZVxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHt9O1xuICAgIGNvbXBvbmVudERpZE1vdW50KCkge307XG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcygpIHt9O1xuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9O1xuICAgIGNvbXBvbmVudFdpbGxVcGRhdGUoKSB7fTtcbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7fTtcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHt9O1xuICAgIGNvbXBvbmVudERpZENhdGNoKCkge307XG5cbiAgICAvLyBPYnNlcnZlclxuICAgIGluaXRPYnNlcnZlcigpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IE9ic2VydmVyLmZyb20oXG4gICAgICAgICAgICB0aGlzLnN0YXRlIHx8IHt9LFxuICAgICAgICAgICAgOjp0aGlzLnNldHRlckNhbGxiYWNrXG4gICAgICAgICk7XG4gICAgfTtcbiAgICBpbml0Q29tcHV0ZWQoKSB7XG4gICAgICAgIHdhbGsoXG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVkLFxuICAgICAgICAgICAgKG5hbWUsIGdldHRlciwgY29tcHV0ZWQpID0+IHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29tcHV0ZWQsIG5hbWUsIHtcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgZ2V0OiB0aGlzOjpnZXR0ZXJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgfVxuICAgIHNldHRlckNhbGxiYWNrKG9iaiwga2V5LCB2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKG9iaiAhPT0gdGhpcy5zdGF0ZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQk9PTSEhIScpO1xuICAgICAgICB0aGlzLmRpZmZBbmRQYXRjaCgpO1xuICAgIH07XG5cbiAgICAvLyBSZW5kZXJcbiAgICBiZWZvcmVSZW5kZXIoKSB7XG4gICAgICAgIHRoaXMuaW5pdE9ic2VydmVyKCk7XG4gICAgICAgIHRoaXMuaW5pdENvbXB1dGVkKCk7XG4gICAgfTtcbiAgICByZW5kZXIoKSB7fTtcbiAgICByZW5kZXJUbyhlbnRyeSkge1xuICAgICAgICB0aGlzLmJlZm9yZVJlbmRlcigpO1xuICAgICAgICB0aGlzLm5vZGUgPSBmbGF0dGVuTm9kZSh0aGlzLnJlbmRlcigpKTtcbiAgICAgICAgdGhpcy5lbnRyeSA9IGVudHJ5O1xuICAgICAgICB0aGlzLmVudHJ5LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQodGhpcy5ub2RlKSlcbiAgICB9O1xuICAgIGRpZmZBbmRQYXRjaCgpIHtcbiAgICAgICAgY29uc3Qgb2xkTm9kZSA9IHRoaXMubm9kZTtcbiAgICAgICAgdGhpcy5ub2RlID0gZmxhdHRlbk5vZGUodGhpcy5yZW5kZXIoKSk7XG4gICAgICAgIGNvbnN0IHBhdGNoZXMgPSBkaWZmKHRoaXMubm9kZSwgb2xkTm9kZSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG9sZE5vZGUpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLm5vZGUpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhwYXRjaGVzKTtcbiAgICAgICAgcGF0Y2godGhpcy5lbnRyeSwgcGF0Y2hlcyk7XG4gICAgfTtcbn1cblxuXG5cbmV4cG9ydCBkZWZhdWx0IENvbXBvbmVudDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvaW5kZXguanMiLCJcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tICcuL2NyZWF0ZSc7XG5pbXBvcnQgeyBkaWZmIH0gZnJvbSAnLi9kaWZmJztcbmltcG9ydCB7IHBhdGNoIH0gZnJvbSAnLi9wYXRjaCc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XG5cblxuZXhwb3J0IHtcbiAgICBjcmVhdGVFbGVtZW50LFxuICAgIGRpZmYsXG4gICAgcGF0Y2gsXG4gICAgdXRpbHNcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL2luZGV4LmpzIiwiXG5pbXBvcnQgeyBzZXRBdHRyaWJ1dGVzIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5cblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudChub2RlKSB7XG4gICAgLypcbiAgICBub2RlOiBTdHJpbmcgfHwge1xuICAgICAgICBlbGVtZW50TmFtZTogU3RyaW5nXG4gICAgICAgIGNoaWxkcmVuOiBub2RlW11cbiAgICAgICAgYXR0cmlidXRlczogT2JqZWN0XG4gICAgfVxuICAgICovXG4gICAgaWYgKHR5cGVvZiBub2RlID09PSAnb2JqZWN0Jykge1xuICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobm9kZS5lbGVtZW50TmFtZSk7XG4gICAgICAgIG5vZGUuY2hpbGRyZW4gJiYgYXBwZW5kQ2hpbGRyZW4oZWwsIG5vZGUuY2hpbGRyZW4pO1xuICAgICAgICBzZXRBdHRyaWJ1dGVzKGVsLCBub2RlLmF0dHJpYnV0ZXMpO1xuICAgICAgICByZXR1cm4gZWw7XG4gICAgfVxuICAgIGVsc2UgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG5vZGUpO1xufVxuXG5cbmZ1bmN0aW9uIGFwcGVuZENoaWxkcmVuKHRhcmdldCwgY2hpbGRyZW4pIHtcbiAgICBjaGlsZHJlbi5tYXAoY3JlYXRlRWxlbWVudClcbiAgICAgICAgLmZvckVhY2goOjp0YXJnZXQuYXBwZW5kQ2hpbGQpXG59XG5cblxuXG5leHBvcnQge1xuICAgIGNyZWF0ZUVsZW1lbnRcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL2NyZWF0ZS9pbmRleC5qcyIsIlxuaW1wb3J0IHsgRXZlbnRUeXBlLCBFdmVudE1hcCB9IGZyb20gJy4uL3R5cGVzJztcblxuXG5cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXModGFyZ2V0LCBhdHRyaWJ1dGVzPXt9KSB7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcylcbiAgICAgICAgLmZpbHRlcihrZXkgPT4gYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICAuZm9yRWFjaChhdHRyTmFtZSA9PiBzZXRBdHRyaWJ1dGUodGFyZ2V0LCBhdHRyTmFtZSwgYXR0cmlidXRlc1thdHRyTmFtZV0pKTtcbn1cblxuXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGUodGFyZ2V0LCBhdHRyTmFtZSwgYXR0clZhbHVlKSB7XG4gICAgYXR0ck5hbWUgPT09ICdjbGFzc05hbWUnICYmIChhdHRyTmFtZSA9ICdjbGFzcycpO1xuICAgIGlmIChFdmVudFR5cGUuaW5jbHVkZXMoYXR0ck5hbWUpKVxuICAgICAgICByZXR1cm4gdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICBFdmVudE1hcFthdHRyTmFtZV0sXG4gICAgICAgICAgICBhdHRyVmFsdWVcbiAgICAgICAgKTtcbiAgICB0YXJnZXQuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsdWUpO1xufVxuXG5cbmZ1bmN0aW9uIHJlbW92ZUF0dHJpYnV0ZSh0YXJnZXQsIGF0dHJOYW1lLCBvbGRBdHRyVmFsdWUpIHtcbiAgICBhdHRyTmFtZSA9PT0gJ2NsYXNzTmFtZScgJiYgKGF0dHJOYW1lID0gJ2NsYXNzJyk7XG4gICAgaWYgKEV2ZW50VHlwZS5pbmNsdWRlcyhhdHRyTmFtZSkpXG4gICAgICAgIHJldHVybiB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgIEV2ZW50TWFwW2F0dHJOYW1lXSxcbiAgICAgICAgICAgIG9sZEF0dHJWYWx1ZVxuICAgICAgICApO1xuICAgIHRhcmdldC5yZW1vdmVBdHRyaWJ1dGUoYXR0ck5hbWUpO1xufVxuXG5cbmZ1bmN0aW9uIGluc2VydEFmdGVyKG5ld0VsLCB0YXJnZXRFbCkge1xuICAgIGNvbnN0IHBhcmVudEVsID0gdGFyZ2V0RWwucGFyZW50Tm9kZTtcbiAgICBpZiAocGFyZW50RWwubGFzdENoaWxkID09PSB0YXJnZXRFbClcbiAgICAgICAgcmV0dXJuIHBhcmVudEVsLmFwcGVuZENoaWxkKG5ld0VsKTtcbiAgICByZXR1cm4gcGFyZW50RWwuaW5zZXJ0QmVmb3JlKG5ld0VsLHRhcmdldEVsLm5leHRTaWJsaW5nKTtcbn1cblxuXG5leHBvcnQge1xuICAgIHNldEF0dHJpYnV0ZXMsXG4gICAgc2V0QXR0cmlidXRlLFxuICAgIHJlbW92ZUF0dHJpYnV0ZSxcbiAgICBpbnNlcnRBZnRlclxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vdXRpbHMvaW5kZXguanMiLCJcbmltcG9ydCBDaGFuZ2VUeXBlIGZyb20gJy4vY2hhbmdlJztcbmltcG9ydCB7IEV2ZW50VHlwZSwgRXZlbnRNYXAgfSBmcm9tICcuL2V2ZW50cyc7XG5cbmV4cG9ydCB7XG4gICAgQ2hhbmdlVHlwZSxcbiAgICBFdmVudFR5cGUsXG4gICAgRXZlbnRNYXBcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3R5cGVzL2luZGV4LmpzIiwiXG5jb25zdCBDaGFuZ2VkID0ge1xuICAgIENSRUFURTogJ0NSRUFURScsXG4gICAgUkVNT1ZFOiAnUkVNT1ZFJyxcbiAgICBSRVBMQUNFOiAnUkVQTEFDRScsXG4gICAgVVBEQVRFOiAnVVBEQVRFJyxcblxuICAgIFNFVF9QUk9QUzogJ1NFVCBQUk9QUycsXG4gICAgUkVNT1ZFX1BST1BTOiAnUkVNT1ZFIFBST1BTJyxcblxuICAgIEFERF9FVkVOVF9MSVNURU5FUjogJ0FERCBFVkVOVCBMSVNURU5FUicsXG4gICAgVVBEQVRFX0VWRU5UX0xJU1RFTkVSOiAnVVBEQVRFIEVWRU5UIExJU1RFTkVSJyxcbiAgICBSRU1PVkVfRVZFTlRfTElTVEVORVI6ICdSRU1PVkUgRVZFTlQgTElTVEVORVInLFxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBDaGFuZ2VkO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vdHlwZXMvY2hhbmdlLmpzIiwiXG5jb25zdCBFdmVudFR5cGUgPSBbXG4gICAgLy8gQ2xpcGJvYXJkIEV2ZW50c1xuICAgICdvbkNvcHknLCAnb25DdXQnLCAnb25QYXN0ZScsXG4gICAgLy8gQ29tcG9zaXRpb24gRXZlbnRzXG4gICAgJ29uQ29tcG9zaXRpb25FbmQnLCAnb25Db21wb3NpdGlvblN0YXJ0JywgJ29uQ29tcG9zaXRpb25VcGRhdGUnLFxuICAgIC8vIEtleWJvYXJkIEV2ZW50c1xuICAgICdvbktleURvd24nLCAnb25LZXlQcmVzcycsICdvbktleVVwJyxcbiAgICAvLyBGb2N1cyBFdmVudHNcbiAgICAnb25Gb2N1cycsICdvbkJsdXInLFxuICAgIC8vIEZvcm0gRXZlbnRzXG4gICAgJ29uQ2hhbmdlJywgJ29uSW5wdXQnLCAnb25JbnZhbGlkJywgJ29uU3VibWl0JyxcbiAgICAvLyBNb3VzZSBFdmVudHNcbiAgICAnb25DbGljaycsICdvbkNvbnRleHRNZW51JywgJ29uRG91YmxlQ2xpY2snLFxuICAgICdvbkRyYWcnLCAnb25EcmFnRW5kJywgJ29uRHJhZ0VudGVyJywgJ29uRHJhZ0V4aXQnLFxuICAgICdvbkRyYWdMZWF2ZScsICdvbkRyYWdPdmVyJywgJ29uRHJhZ1N0YXJ0JyxcbiAgICAnb25Ecm9wJywgJ29uTW91c2VEb3duJywgJ29uTW91c2VFbnRlcicsXG4gICAgJ29uTW91c2VMZWF2ZScsICdvbk1vdXNlTW92ZScsICdvbk1vdXNlT3V0JyxcbiAgICAnb25Nb3VzZU92ZXInICwnb25Nb3VzZVVwJyxcbiAgICAvLyBTZWxlY3Rpb24gRXZlbnRzXG4gICAgJ29uU2VsZWN0JyxcbiAgICAvLyBUb3VjaCBFdmVudHNcbiAgICAnb25Ub3VjaENhbmNlbCcsICdvblRvdWNoRW5kJywgJ29uVG91Y2hNb3ZlJywgJ29uVG91Y2hTdGFydCcsXG4gICAgLy8gVUkgRXZlbnRzXG4gICAgJ29uU2Nyb2xsJyxcbiAgICAvLyBXaGVlbCBFdmVudHNcbiAgICAnb25XaGVlbCcsXG4gICAgLy8gTWVkaWEgRXZlbnRzXG4gICAgJ29uQWJvcnQnLCAnb25DYW5QbGF5JywgJ29uQ2FuUGxheVRocm91Z2gnLFxuICAgICdvbkR1cmF0aW9uQ2hhbmdlJywgJ29uRW1wdGllZCcsICdvbkVuY3J5cHRlZG9uRW5kZWQnLFxuICAgICdvbkVycm9yJywgJ29uTG9hZGVkRGF0YScsICdvbkxvYWRlZE1ldGFkYXRhJyxcbiAgICAnb25Mb2FkU3RhcnQnLCAnb25QYXVzZScsICdvblBsYXlvblBsYXlpbmcnLFxuICAgICdvblByb2dyZXNzJywgJ29uUmF0ZUNoYW5nZScsICdvblNlZWtlZCcsXG4gICAgJ29uU2Vla2luZycsICdvblN0YWxsZWQnLCAnb25TdXNwZW5kb25UaW1lVXBkYXRlJyxcbiAgICAnb25Wb2x1bWVDaGFuZ2UnLCAnb25XYWl0aW5nJyxcbiAgICAvLyBJbWFnZSBFdmVudHNcbiAgICAnb25Mb2FkJywgJ29uRXJyb3InLFxuICAgIC8vIEFuaW1hdGlvbiBFdmVudHNcbiAgICAnb25BbmltYXRpb25TdGFydCcsICdvbkFuaW1hdGlvbkVuZCcsICdvbkFuaW1hdGlvbkl0ZXJhdGlvbicsXG4gICAgLy8gVHJhbnNpdGlvbiBFdmVudHNcbiAgICAnb25UcmFuc2l0aW9uRW5kJyxcbiAgICAvLyBPdGhlciBFdmVudHNcbiAgICAnb25Ub2dnbGUnXG5dO1xuXG5cbmNvbnN0IEV2ZW50TWFwID0gRXZlbnRUeXBlLnJlZHVjZSgoZXZlbnRzTWFwLCBldmVudCkgPT4ge1xuICAgIGV2ZW50c01hcFtldmVudF0gPSBldmVudFxuICAgICAgICAucmVwbGFjZSgnb24nLCAnJylcbiAgICAgICAgLnJlcGxhY2UoL1tBLVpdL2csIGUgPT4gZS50b0xvd2VyQ2FzZSgpKTtcbiAgICByZXR1cm4gZXZlbnRzTWFwO1xufSwge30pO1xuXG5cbmV4cG9ydCB7XG4gICAgRXZlbnRUeXBlLFxuICAgIEV2ZW50TWFwXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS90eXBlcy9ldmVudHMuanMiLCJcbmltcG9ydCB7IENoYW5nZVR5cGUsIEV2ZW50VHlwZSB9IGZyb20gJy4uL3R5cGVzL2luZGV4JztcblxuXG5cbmZ1bmN0aW9uIGRpZmYobmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIC8qXG4gICAgcmV0dXJuIHR5cGUgUGF0Y2gge1xuICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlXG4gICAgICAgIG5ld05vZGU/OiBOb2RlXG4gICAgICAgIGNoaWxkcmVuPzogUGF0Y2hbXVxuICAgICAgICBhdHRyaWJ1dGVzPzogUGF0Y2hbXVxuICAgIH1cbiAgICAgKi9cbiAgICBpZiAoIW9sZE5vZGUpIHJldHVybiB7IHR5cGU6IENoYW5nZVR5cGUuQ1JFQVRFLCBuZXdOb2RlIH07XG4gICAgZWxzZSBpZiAoIW5ld05vZGUpIHJldHVybiB7IHR5cGU6IENoYW5nZVR5cGUuUkVNT1ZFIH07XG4gICAgZWxzZSBpZiAoaXNDaGFuZ2VkKG5ld05vZGUsIG9sZE5vZGUpKSByZXR1cm4geyB0eXBlOiBDaGFuZ2VUeXBlLlJFUExBQ0UsIG5ld05vZGUgfTtcbiAgICBlbHNlIGlmIChuZXdOb2RlLmVsZW1lbnROYW1lKVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogQ2hhbmdlVHlwZS5VUERBVEUsXG4gICAgICAgICAgICBjaGlsZHJlbjogZGlmZkNoaWxkcmVuKG5ld05vZGUsIG9sZE5vZGUpLFxuICAgICAgICAgICAgYXR0cmlidXRlczogZGlmZkF0dHJpYnV0ZXMobmV3Tm9kZSwgb2xkTm9kZSksXG4gICAgICAgICAgICAvLyBldmVudHM6IGRpZmZFdmVudHMobmV3Tm9kZSwgb2xkTm9kZSlcbiAgICAgICAgfTtcbn1cblxuZnVuY3Rpb24gaXNDaGFuZ2VkKG5ld05vZGUsIG9sZE5vZGUpIHtcbiAgICByZXR1cm4gdHlwZW9mIG5ld05vZGUgIT09IHR5cGVvZiBvbGROb2RlIHx8XG4gICAgICAgIHR5cGVvZiBuZXdOb2RlICE9PSBcIm9iamVjdFwiICYmIG5ld05vZGUgIT09IG9sZE5vZGUgfHxcbiAgICAgICAgdHlwZW9mIG5ld05vZGUgPT09IFwib2JqZWN0XCIgJiYgbmV3Tm9kZS5lbGVtZW50TmFtZSAhPT0gb2xkTm9kZS5lbGVtZW50TmFtZVxufVxuXG5cbmZ1bmN0aW9uIGRpZmZFdmVudHMobmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIGNvbnN0IHBhdGNoZXMgID0gW107XG4gICAgY29uc3QgYXR0cmlidXRlcyA9IHsuLi5vbGROb2RlLmF0dHJpYnV0ZXMsIC4uLm5ld05vZGUuYXR0cmlidXRlc307XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcylcbiAgICAgICAgLmZpbHRlcihhdHRyTmFtZSA9PiBFdmVudFR5cGUuaW5jbHVkZXMoYXR0ck5hbWUpKVxuICAgICAgICAuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmV3SGFuZGxlciA9IG5ld05vZGUuYXR0cmlidXRlc1tldmVudE5hbWVdO1xuICAgICAgICAgICAgY29uc3Qgb2xkSGFuZGxlciA9IG9sZE5vZGUuYXR0cmlidXRlc1tldmVudE5hbWVdO1xuICAgICAgICAgICAgaWYgKCFuZXdIYW5kbGVyKVxuICAgICAgICAgICAgICAgIHJldHVybiBwYXRjaGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlLlJFTU9WRV9FVkVOVF9MSVNURU5FUixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG9sZEhhbmRsZXIsIGV2ZW50TmFtZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZWxzZSBpZiAoIW9sZEhhbmRsZXIpXG4gICAgICAgICAgICAgICAgcGF0Y2hlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogQ2hhbmdlVHlwZS5BRERfRVZFTlRfTElTVEVORVIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBuZXdIYW5kbGVyLCBldmVudE5hbWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGVsc2UgcGF0Y2hlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogQ2hhbmdlVHlwZS5VUERBVEVfRVZFTlRfTElTVEVORVIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBuZXdIYW5kbGVyLCBvbGRWYWx1ZTogb2xkSGFuZGxlciwgZXZlbnROYW1lXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIHJldHVybiBwYXRjaGVzO1xufVxuXG5mdW5jdGlvbiBkaWZmQXR0cmlidXRlcyhuZXdOb2RlLCBvbGROb2RlKSB7XG4gICAgY29uc3QgcGF0Y2hlcyAgPSBbXTtcbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gey4uLm9sZE5vZGUuYXR0cmlidXRlcywgLi4ubmV3Tm9kZS5hdHRyaWJ1dGVzfTtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKVxuICAgICAgICAuZm9yRWFjaChhdHRyTmFtZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXdBdHRyID0gbmV3Tm9kZS5hdHRyaWJ1dGVzW2F0dHJOYW1lXTtcbiAgICAgICAgICAgIGNvbnN0IG9sZEF0dHIgPSBvbGROb2RlLmF0dHJpYnV0ZXNbYXR0ck5hbWVdO1xuICAgICAgICAgICAgIW5ld0F0dHIgJiYgcGF0Y2hlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlLlJFTU9WRV9QUk9QUyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogb2xkQXR0ciwgYXR0ck5hbWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgKCFvbGRBdHRyIHx8IG9sZEF0dHIgIT09IG5ld0F0dHIpICYmIHBhdGNoZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogQ2hhbmdlVHlwZS5TRVRfUFJPUFMsXG4gICAgICAgICAgICAgICAgdmFsdWU6IG5ld0F0dHIsIG9sZFZhbHVlOiBvbGRBdHRyLCBhdHRyTmFtZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIHJldHVybiBwYXRjaGVzO1xufVxuXG5cbmZ1bmN0aW9uIGRpZmZDaGlsZHJlbihuZXdOb2RlLCBvbGROb2RlKSB7XG4gICAgY29uc3QgbmV3Q2hpbGQgPSBuZXdOb2RlLmNoaWxkcmVuIHx8IFtdO1xuICAgIGNvbnN0IG9sZENoaWxkID0gb2xkTm9kZS5jaGlsZHJlbiB8fCBbXTtcbiAgICByZXR1cm4gWy4uLkFycmF5KE1hdGgubWF4KFxuICAgICAgICBuZXdDaGlsZC5sZW5ndGgsIG9sZENoaWxkLmxlbmd0aFxuICAgICkpLmtleXMoKV0ubWFwKGkgPT4gZGlmZihuZXdDaGlsZFtpXSwgb2xkQ2hpbGRbaV0pKTtcbn1cblxuXG5leHBvcnQge1xuICAgIGRpZmZcbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vZGlmZi9pbmRleC5qcyIsIlxuaW1wb3J0IHsgQ2hhbmdlVHlwZSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tICcuLi9jcmVhdGUvaW5kZXgnO1xuaW1wb3J0IHsgc2V0QXR0cmlidXRlLCByZW1vdmVBdHRyaWJ1dGUgfSBmcm9tIFwiLi4vdXRpbHMvaW5kZXhcIjtcbmltcG9ydCB7RXZlbnRNYXAsIEV2ZW50VHlwZX0gZnJvbSBcIi4uL3R5cGVzL2V2ZW50c1wiO1xuXG5cblxuZnVuY3Rpb24gcGF0Y2gocGFyZW50LCBwYXRjaGVzLCBpbmRleD0wKSB7XG4gICAgaWYgKCFwYXRjaGVzKSByZXR1cm47XG4gICAgY29uc3QgZWwgPSBwYXJlbnQuY2hpbGROb2Rlc1tpbmRleF07XG4gICAgc3dpdGNoIChwYXRjaGVzLnR5cGUpIHtcbiAgICAgICAgY2FzZSBDaGFuZ2VUeXBlLkNSRUFURToge1xuICAgICAgICAgICAgY29uc3QgeyBuZXdOb2RlIH0gPSBwYXRjaGVzO1xuICAgICAgICAgICAgY29uc3QgbmV3RWwgPSBjcmVhdGVFbGVtZW50KG5ld05vZGUpO1xuICAgICAgICAgICAgaWYgKGluZGV4ID09PSBwYXJlbnQuY2hpbGROb2Rlcy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKG5ld0VsKTtcbiAgICAgICAgICAgIGVsc2UgcGFyZW50Lmluc2VydEJlZm9yZShuZXdFbCwgZWwpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBDaGFuZ2VUeXBlLlJFTU9WRToge1xuICAgICAgICAgICAgaWYgKCFlbCkgcmV0dXJuO1xuICAgICAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQ2hhbmdlVHlwZS5SRVBMQUNFOiB7XG4gICAgICAgICAgICBjb25zdCB7IG5ld05vZGUgfSA9IHBhdGNoZXM7XG4gICAgICAgICAgICBjb25zdCBuZXdFbCA9IGNyZWF0ZUVsZW1lbnQobmV3Tm9kZSk7XG4gICAgICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKG5ld0VsLCBlbCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENoYW5nZVR5cGUuVVBEQVRFOiB7XG4gICAgICAgICAgICBjb25zdCB7IGNoaWxkcmVuLCBhdHRyaWJ1dGVzLCBldmVudHMgfSA9IHBhdGNoZXM7XG4gICAgICAgICAgICBwYXRjaEF0dHJpYnV0ZXMoZWwsIGF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgLy8gcGF0Y2hFdmVudHMoZWwsIGV2ZW50cyk7XG4gICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZCwgaW5kZXgpID0+IHBhdGNoKGVsLCBjaGlsZCwgaW5kZXgpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBwYXRjaEV2ZW50cyhlbCwgZXZlbnRzKSB7XG4gICAgZXZlbnRzLmZvckVhY2gocGF0Y2ggPT4ge1xuICAgICAgICBjb25zdCB7IHR5cGUsIHZhbHVlLCBvbGRWYWx1ZSwgZXZlbnROYW1lIH0gPSBwYXRjaDtcbiAgICAgICAgaWYgKHR5cGUgPT09IENoYW5nZVR5cGUuQUREX0VWRU5UX0xJU1RFTkVSKVxuICAgICAgICAgICAgcmV0dXJuIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCB2YWx1ZSk7XG4gICAgICAgIGlmICh0eXBlID09PSBDaGFuZ2VUeXBlLlJFTU9WRV9FVkVOVF9MSVNURU5FUilcbiAgICAgICAgICAgIHJldHVybiBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgb2xkVmFsdWUpO1xuICAgICAgICBpZiAodHlwZSA9PT0gQ2hhbmdlVHlwZS5VUERBVEVfRVZFTlRfTElTVEVORVIpIHtcbiAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBvbGRWYWx1ZSk7XG4gICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gcGF0Y2hBdHRyaWJ1dGVzKGVsZW1lbnQsIGF0dHJpYnV0ZXMpIHtcbiAgICBhdHRyaWJ1dGVzLmZvckVhY2gocGF0Y2ggPT4ge1xuICAgICAgICBjb25zdCB7IHR5cGUsIGF0dHJOYW1lLCB2YWx1ZSwgb2xkVmFsdWUgfSA9IHBhdGNoO1xuICAgICAgICBpZiAoRXZlbnRUeXBlLmluY2x1ZGVzKGF0dHJOYW1lKSkge1xuICAgICAgICAgICAgY29uc3QgZXZlbnROYW1lID0gRXZlbnRNYXBbYXR0ck5hbWVdO1xuICAgICAgICAgICAgaWYgKHR5cGUgPT09IENoYW5nZVR5cGUuU0VUX1BST1BTKSB7XG4gICAgICAgICAgICAgICAgb2xkVmFsdWUgJiYgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgb2xkVmFsdWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gQ2hhbmdlVHlwZS5SRU1PVkVfUFJPUFMpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIG9sZFZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0eXBlID09PSBDaGFuZ2VUeXBlLlNFVF9QUk9QUylcbiAgICAgICAgICAgICAgICByZXR1cm4gc2V0QXR0cmlidXRlKGVsZW1lbnQsIGF0dHJOYW1lLCB2YWx1ZSk7XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlID09PSBDaGFuZ2VUeXBlLlJFTU9WRV9QUk9QUylcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVtb3ZlQXR0cmlidXRlKGVsZW1lbnQsIGF0dHJOYW1lLCB2YWx1ZSlcbiAgICAgICAgfVxuICAgIH0pXG59XG5cblxuZXhwb3J0IHtcbiAgICBwYXRjaFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vcGF0Y2gvaW5kZXguanMiLCJcbmltcG9ydCBPYnNlcnZlciBmcm9tICcuL29iamVjdCc7XG5pbXBvcnQgT2JzZXJ2ZXJBcnJheSBmcm9tICcuL2FycmF5JztcbmltcG9ydCB7IHdhbGssIG9ic2VydmVyIH0gZnJvbSAnLi91dGlscyc7XG5cblxuZXhwb3J0IHtcbiAgICBPYnNlcnZlcixcbiAgICBPYnNlcnZlckFycmF5LFxuICAgIHdhbGssIG9ic2VydmVyXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL29ic2VydmVyL2luZGV4LmpzIiwiXG5pbXBvcnQgeyB3YWxrLCBvYnNlcnZlciB9IGZyb20gJy4uL3V0aWxzL2luZGV4J1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2JzZXJ2ZXIge1xuICAgIGNvbnN0cnVjdG9yKG9iaiwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JqICE9PSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVHlwZSBcIk9iamVjdFwiIHJlcXVpcmVkIScpO1xuICAgICAgICB3YWxrKG9iaiwgKGtleSwgdmFsdWUpID0+IG9ic2VydmVyKFxuICAgICAgICAgICAgdGhpcywga2V5LCB2YWx1ZSxcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrLFxuICAgICAgICAgICAgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGZyb20gPSAob2JqLCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZlcihcbiAgICAgICAgICAgIG9iaixcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrLFxuICAgICAgICAgICAgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKVxuICAgIH07XG5cbiAgICBzdGF0aWMgdG9TdHJpbmcgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBgT2JzZXJ2ZXIgJHt0aGlzfWBcbiAgICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9vYnNlcnZlci9vYmplY3QvaW5kZXguanMiLCJcbmltcG9ydCBPYnNlcnZlciBmcm9tICcuLi9vYmplY3QnO1xuaW1wb3J0IE9ic2VydmVyQXJyYXkgZnJvbSAnLi4vYXJyYXknO1xuXG5cbmNvbnN0IG5vb3AgPSAoKSA9PiB7fTtcblxuXG5cbmZ1bmN0aW9uIHdhbGsob2JqLCBmdW4pIHtcbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEZ1bmN0aW9uIFwid2Fsa1wiIHJlcXVpcmUgYW4gXCJvYmplY3RcIiBpbnN0ZWFkIG9mICR7dHlwZW9mIG9ian1gKTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKVxuICAgICAgICByZXR1cm4gb2JqLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiBmdW4oaW5kZXgsIGl0ZW0sIG9iaikpO1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4gZnVuKGtleSwgb2JqW2tleV0sIG9iaikpO1xufVxuXG5mdW5jdGlvbiBvYnNlcnZlcihvYmosIGtleSwgdmFsdWUsIHNldHRlckNhbGxiYWNrPW5vb3AsIGdldHRlckNhbGxiYWNrPW5vb3ApIHtcbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEZ1bmN0aW9uIFwib2JzZXJ2ZXJcIiByZXF1aXJlIGFuIFwib2JqZWN0XCIgaW5zdGVhZCBvZiAke3R5cGVvZiBvYmp9YCk7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpXG4gICAgICAgIHZhbHVlID0gT2JzZXJ2ZXJBcnJheS5mcm9tKHZhbHVlLCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spO1xuICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgdmFsdWUgPSBPYnNlcnZlci5mcm9tKHZhbHVlLCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgICAgICBnZXR0ZXJDYWxsYmFjayhvYmosIGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgICAgIH0sXG4gICAgICAgIHNldDogbmV3VmFsdWUgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSBvYmpba2V5XTtcbiAgICAgICAgICAgIG9ic2VydmVyKG9iaiwga2V5LCBuZXdWYWx1ZSwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKTtcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrKG9iaiwga2V5LCBuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICB9XG4gICAgfSlcbn1cblxuXG5jb25zdCBnZXRVbmlxdWVJRCA9IGZ1bmN0aW9uKCkge1xuICAgIGxldCBpZCA9IDA7XG4gICAgcmV0dXJuICgoKSA9PiBpZCArKyk7XG59KCk7XG5cblxuZXhwb3J0IHtcbiAgICB3YWxrLFxuICAgIG9ic2VydmVyLFxuICAgIGdldFVuaXF1ZUlEXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL29ic2VydmVyL3V0aWxzL2luZGV4LmpzIiwiXG5pbXBvcnQgeyB3YWxrLCBvYnNlcnZlciB9IGZyb20gJy4uL3V0aWxzL2luZGV4JztcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9ic2VydmVyQXJyYXkge1xuICAgIGNvbnN0cnVjdG9yKGFycmF5LCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spIHtcbiAgICAgICAgIWFycmF5ICYmIChhcnJheSA9IFtdKTtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGFycmF5KSlcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1R5cGUgXCJBcnJheVwiIHJlcXVpcmVkIScpO1xuICAgICAgICB3YWxrKGFycmF5LCAoaW5kZXgsIGl0ZW0pID0+IG9ic2VydmVyKFxuICAgICAgICAgICAgdGhpcywgaW5kZXgsIGl0ZW0sXG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKSk7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGZyb20gPSAoYXJyYXksIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFjaykgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmVyQXJyYXkoXG4gICAgICAgICAgICBhcnJheSxcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrLFxuICAgICAgICAgICAgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKVxuICAgIH07XG4gICAgc3RhdGljIGlzT2JzZXJ2ZXJBcnJheSAgPSBhcnJheSA9PiB7XG4gICAgICAgIHJldHVybiBhcnJheS5fX3Byb3RvX18uY29uc3RydWN0b3IgPT09IE9ic2VydmVyQXJyYXk7XG4gICAgfTtcbiAgICBzdGF0aWMgb2YgPSAoLi4uYXJncykgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmVyQXJyYXkoWy4uLmFyZ3NdKVxuICAgIH07XG5cblxuICAgIGNvbmNhdCA9ICguLi5hcnJheXMpID0+IHtcbiAgICAgICAgY29uc3QgbmV3QXJyYXkgPSBuZXcgT2JzZXJ2ZXJBcnJheSgpO1xuICAgICAgICBbdGhpcywgLi4uYXJyYXlzXS5mb3JFYWNoKFxuICAgICAgICAgICAgYXJyYXkgPT4gYXJyYXkuZm9yRWFjaChuZXdBcnJheS5wdXNoKVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gbmV3QXJyYXk7XG4gICAgfTtcbiAgICBjb3B5V2l0aGluID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgLy8gVE9ET1xuICAgICAgICByZXR1cm4gT2JzZXJ2ZXJBcnJheS5mcm9tKFxuICAgICAgICAgICAgQXJyYXkuZnJvbSh0aGlzKS5jb3B5V2l0aGluKC4uLmFyZ3MpXG4gICAgICAgIClcbiAgICB9O1xuICAgIGVudHJpZXMgPSBmdW5jdGlvbiAqKCkge1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICB3aGlsZSAodGhpc1tpbmRleF0pXG4gICAgICAgICAgICB5aWVsZCBbaW5kZXgrKywgdGhpc1tpbmRleF1dO1xuICAgIH07XG4gICAgZXZlcnkgPSAoKSA9PiB7fTtcbiAgICBmaWxsID0gKCkgPT4ge307XG4gICAgZmlsdGVyID0gKCkgPT4ge307XG4gICAgZmluZCA9ICgpID0+IHt9O1xuICAgIGZpbmRJbmRleCA9ICgpID0+IHt9O1xuICAgIGZvckVhY2ggPSAoKSA9PiB7fTtcbiAgICBpbmNsdWRlcyA9ICgpID0+IHt9O1xuICAgIGluZGV4T2YgPSAoKSA9PiB7fTtcbiAgICBqb2luID0gKCkgPT4ge307XG4gICAga2V5cyA9ICgpID0+IHt9O1xuICAgIGxhc3RJbmRleE9mID0gKCkgPT4ge307XG4gICAgbWFwID0gKCkgPT4ge307XG4gICAgcG9wID0gKCkgPT4ge307XG4gICAgcHVzaCA9IHZhbHVlID0+IHtcbiAgICAgICAgb2JzZXJ2ZXIoXG4gICAgICAgICAgICB0aGlzLCB0aGlzLmxlbmd0aCwgdmFsdWUsXG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5sZW5ndGggKys7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIHJlZHVjZSA9ICgpID0+IHt9O1xuICAgIHJlZHVjZVJpZ2h0ID0gKCkgPT4ge307XG4gICAgcmV2ZXJzZSA9ICgpID0+IHt9O1xuICAgIHNoaWZ0ID0gKCkgPT4ge307XG4gICAgc2xpY2UgPSAoKSA9PiB7fTtcbiAgICBzb21lID0gKCkgPT4ge307XG4gICAgc29ydCA9ICgpID0+IHt9O1xuICAgIHNwbGljZSA9ICgpID0+IHt9O1xuICAgIHRvTG9jYWxlU3RyaW5nID0gKCkgPT4ge307XG4gICAgdG9Tb3VyY2UgPSAoKSA9PiB7fTtcbiAgICB0b1N0cmluZyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGBPYnNlcnZlckFycmF5IFsuLi5dYFxuICAgIH07XG4gICAgdW5zaGlmdCA9ICgpID0+IHt9O1xuICAgIHZhbHVlcyA9ICgpID0+IHt9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9vYnNlcnZlci9hcnJheS9pbmRleC5qcyIsIlxuZnVuY3Rpb24gZmxhdHRlbk5vZGUobm9kZSkge1xuICAgIGlmICghbm9kZSkgcmV0dXJuO1xuICAgIGlmIChub2RlLmNoaWxkcmVuKVxuICAgICAgICBub2RlLmNoaWxkcmVuID0gZmxhdHRlbkNoaWxkcmVuKG5vZGUuY2hpbGRyZW4pO1xuICAgIHJldHVybiBub2RlXG59XG5cbmZ1bmN0aW9uIGZsYXR0ZW5DaGlsZHJlbihjaGlsZHJlbikge1xuICAgIHJldHVybiBbXS5jb25jYXQoLi4uY2hpbGRyZW4pXG4gICAgICAgIC5tYXAobm9kZSA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG5vZGUgPT09ICdvYmplY3QnKVxuICAgICAgICAgICAgICAgIHJldHVybiBmbGF0dGVuTm9kZShub2RlKTtcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuIG5vZGU7XG4gICAgICAgIH0pXG4gICAgICAgIC5maWx0ZXIobm9kZSA9PiAhIW5vZGUpO1xufVxuXG5cbmV4cG9ydCB7XG4gICAgZmxhdHRlbk5vZGVcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvdXRpbHMvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9