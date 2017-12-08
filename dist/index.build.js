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
        attributes: diffAttributes(newNode, oldNode),
        events: diffEvents(newNode, oldNode)
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
    Object.keys(attributes).filter(attrName => !_index.EventType.includes(attrName)).forEach(attrName => {
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
                patchEvents(el, events);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjQzNmI1YmYxZWU3OWExMGFmMWQiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9jcmVhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdHlwZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdHlwZXMvY2hhbmdlLmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3R5cGVzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9kaWZmL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3BhdGNoL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvb2JzZXJ2ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci9vYmplY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci91dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL29ic2VydmVyL2FycmF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvdXRpbHMvaW5kZXguanMiXSwibmFtZXMiOlsiTXVzZSIsIkNvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwiZW50cnkiLCJub2RlIiwic3RhdGUiLCJjb21wdXRlZCIsImNvbXBvbmVudFdpbGxNb3VudCIsImNvbXBvbmVudERpZE1vdW50IiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsInNob3VsZENvbXBvbmVudFVwZGF0ZSIsImNvbXBvbmVudFdpbGxVcGRhdGUiLCJjb21wb25lbnREaWRVcGRhdGUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImNvbXBvbmVudERpZENhdGNoIiwiaW5pdE9ic2VydmVyIiwiZnJvbSIsInNldHRlckNhbGxiYWNrIiwiaW5pdENvbXB1dGVkIiwibmFtZSIsImdldHRlciIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsImdldCIsIm9iaiIsImtleSIsInZhbHVlIiwib2xkVmFsdWUiLCJFcnJvciIsImRpZmZBbmRQYXRjaCIsImJlZm9yZVJlbmRlciIsInJlbmRlciIsInJlbmRlclRvIiwiYXBwZW5kQ2hpbGQiLCJvbGROb2RlIiwicGF0Y2hlcyIsImNyZWF0ZUVsZW1lbnQiLCJkaWZmIiwicGF0Y2giLCJ1dGlscyIsImVsIiwiZG9jdW1lbnQiLCJlbGVtZW50TmFtZSIsImNoaWxkcmVuIiwiYXBwZW5kQ2hpbGRyZW4iLCJhdHRyaWJ1dGVzIiwiY3JlYXRlVGV4dE5vZGUiLCJ0YXJnZXQiLCJtYXAiLCJmb3JFYWNoIiwic2V0QXR0cmlidXRlcyIsImtleXMiLCJmaWx0ZXIiLCJoYXNPd25Qcm9wZXJ0eSIsImF0dHJOYW1lIiwic2V0QXR0cmlidXRlIiwiYXR0clZhbHVlIiwiaW5jbHVkZXMiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlQXR0cmlidXRlIiwib2xkQXR0clZhbHVlIiwiaW5zZXJ0QWZ0ZXIiLCJuZXdFbCIsInRhcmdldEVsIiwicGFyZW50RWwiLCJwYXJlbnROb2RlIiwibGFzdENoaWxkIiwiaW5zZXJ0QmVmb3JlIiwibmV4dFNpYmxpbmciLCJDaGFuZ2VUeXBlIiwiRXZlbnRUeXBlIiwiRXZlbnRNYXAiLCJDaGFuZ2VkIiwiQ1JFQVRFIiwiUkVNT1ZFIiwiUkVQTEFDRSIsIlVQREFURSIsIlNFVF9QUk9QUyIsIlJFTU9WRV9QUk9QUyIsIkFERF9FVkVOVF9MSVNURU5FUiIsIlVQREFURV9FVkVOVF9MSVNURU5FUiIsIlJFTU9WRV9FVkVOVF9MSVNURU5FUiIsInJlZHVjZSIsImV2ZW50c01hcCIsImV2ZW50IiwicmVwbGFjZSIsImUiLCJ0b0xvd2VyQ2FzZSIsIm5ld05vZGUiLCJ0eXBlIiwiaXNDaGFuZ2VkIiwiZGlmZkNoaWxkcmVuIiwiZGlmZkF0dHJpYnV0ZXMiLCJldmVudHMiLCJkaWZmRXZlbnRzIiwiZXZlbnROYW1lIiwibmV3SGFuZGxlciIsIm9sZEhhbmRsZXIiLCJwdXNoIiwibmV3QXR0ciIsIm9sZEF0dHIiLCJuZXdDaGlsZCIsIm9sZENoaWxkIiwiQXJyYXkiLCJNYXRoIiwibWF4IiwibGVuZ3RoIiwiaSIsInBhcmVudCIsImluZGV4IiwiY2hpbGROb2RlcyIsInJlbW92ZUNoaWxkIiwicmVwbGFjZUNoaWxkIiwicGF0Y2hBdHRyaWJ1dGVzIiwicGF0Y2hFdmVudHMiLCJjaGlsZCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJlbGVtZW50IiwiT2JzZXJ2ZXIiLCJPYnNlcnZlckFycmF5Iiwid2FsayIsIm9ic2VydmVyIiwiZ2V0dGVyQ2FsbGJhY2siLCJUeXBlRXJyb3IiLCJ0b1N0cmluZyIsIm5vb3AiLCJmdW4iLCJpc0FycmF5IiwiaXRlbSIsInNldCIsIm5ld1ZhbHVlIiwiZ2V0VW5pcXVlSUQiLCJpZCIsImFycmF5IiwiaXNPYnNlcnZlckFycmF5IiwiX19wcm90b19fIiwib2YiLCJhcmdzIiwiY29uY2F0IiwiYXJyYXlzIiwibmV3QXJyYXkiLCJjb3B5V2l0aGluIiwiZW50cmllcyIsImV2ZXJ5IiwiZmlsbCIsImZpbmQiLCJmaW5kSW5kZXgiLCJpbmRleE9mIiwiam9pbiIsImxhc3RJbmRleE9mIiwicG9wIiwicmVkdWNlUmlnaHQiLCJyZXZlcnNlIiwic2hpZnQiLCJzbGljZSIsInNvbWUiLCJzb3J0Iiwic3BsaWNlIiwidG9Mb2NhbGVTdHJpbmciLCJ0b1NvdXJjZSIsInVuc2hpZnQiLCJ2YWx1ZXMiLCJmbGF0dGVuTm9kZSIsImZsYXR0ZW5DaGlsZHJlbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDakVBOzs7Ozs7UUFLSUEsSTs7Ozs7Ozs7Ozs7OztBQ0xKOztBQUNBOztBQUNBOztJQUlNQyxTLEdBQU4sTUFBTUEsU0FBTixDQUFnQjtBQUNaQyxrQkFBYztBQUFBLGFBRWRDLEtBRmMsR0FFTixJQUZNO0FBQUEsYUFHZEMsSUFIYyxHQUdQLElBSE87QUFBQSxhQUlkQyxLQUpjLEdBSU4sRUFKTTtBQUFBLGFBS2RDLFFBTGMsR0FLSCxFQUxHO0FBQUU7O0FBT2hCO0FBQ0FDLHlCQUFxQixDQUFFO0FBQ3ZCQyx3QkFBb0IsQ0FBRTtBQUN0QkMsZ0NBQTRCLENBQUU7QUFDOUJDLDRCQUF3QjtBQUNwQixlQUFPLElBQVA7QUFDSDtBQUNEQywwQkFBc0IsQ0FBRTtBQUN4QkMseUJBQXFCLENBQUU7QUFDdkJDLDJCQUF1QixDQUFFO0FBQ3pCQyx3QkFBb0IsQ0FBRTs7QUFFdEI7QUFDQUMsbUJBQWU7QUFDWCxhQUFLVixLQUFMLEdBQWEsbUJBQVNXLElBQVQsQ0FDVCxLQUFLWCxLQUFMLElBQWMsRUFETCxFQUVQLEtBQUtZLGNBRkUsTUFFUCxJQUZPLEVBQWI7QUFJSDtBQUNEQyxtQkFBZTtBQUNYLDRCQUNJLEtBQUtaLFFBRFQsRUFFSSxDQUFDYSxJQUFELEVBQU9DLE1BQVAsRUFBZWQsUUFBZixLQUE0QjtBQUN4QmUsbUJBQU9DLGNBQVAsQ0FBc0JoQixRQUF0QixFQUFnQ2EsSUFBaEMsRUFBc0M7QUFDbENJLDRCQUFZLElBRHNCO0FBRWxDQyw4QkFBYyxLQUZvQjtBQUdsQ0MscUJBQVdMLE1BQVgsTUFBSyxJQUFMO0FBSGtDLGFBQXRDO0FBS0gsU0FSTDtBQVVIO0FBQ0RILG1CQUFlUyxHQUFmLEVBQW9CQyxHQUFwQixFQUF5QkMsS0FBekIsRUFBZ0NDLFFBQWhDLEVBQTBDO0FBQ3RDLFlBQUlILFFBQVEsS0FBS3JCLEtBQWpCLEVBQ0ksTUFBTSxJQUFJeUIsS0FBSixDQUFVLFNBQVYsQ0FBTjtBQUNKLGFBQUtDLFlBQUw7QUFDSDs7QUFFRDtBQUNBQyxtQkFBZTtBQUNYLGFBQUtqQixZQUFMO0FBQ0EsYUFBS0csWUFBTDtBQUNIO0FBQ0RlLGFBQVMsQ0FBRTtBQUNYQyxhQUFTL0IsS0FBVCxFQUFnQjtBQUNaLGFBQUs2QixZQUFMO0FBQ0EsYUFBSzVCLElBQUwsR0FBWSx3QkFBWSxLQUFLNkIsTUFBTCxFQUFaLENBQVo7QUFDQSxhQUFLOUIsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsYUFBS0EsS0FBTCxDQUFXZ0MsV0FBWCxDQUF1Qix3QkFBYyxLQUFLL0IsSUFBbkIsQ0FBdkI7QUFDSDtBQUNEMkIsbUJBQWU7QUFDWCxjQUFNSyxVQUFVLEtBQUtoQyxJQUFyQjtBQUNBLGFBQUtBLElBQUwsR0FBWSx3QkFBWSxLQUFLNkIsTUFBTCxFQUFaLENBQVo7QUFDQSxjQUFNSSxVQUFVLGVBQUssS0FBS2pDLElBQVYsRUFBZ0JnQyxPQUFoQixDQUFoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUFNLEtBQUtqQyxLQUFYLEVBQWtCa0MsT0FBbEI7QUFDSDtBQWpFVyxDO2tCQXNFRHBDLFM7Ozs7Ozs7Ozs7Ozs7O0FDNUVmOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7UUFJSXFDLGE7UUFDQUMsSTtRQUNBQyxLO1FBQ0FDLEs7Ozs7Ozs7Ozs7Ozs7O0FDVko7O0FBSUEsU0FBU0gsYUFBVCxDQUF1QmxDLElBQXZCLEVBQTZCO0FBQ3pCOzs7Ozs7O0FBT0EsUUFBSSxPQUFPQSxJQUFQLEtBQWdCLFFBQXBCLEVBQThCO0FBQzFCLGNBQU1zQyxLQUFLQyxTQUFTTCxhQUFULENBQXVCbEMsS0FBS3dDLFdBQTVCLENBQVg7QUFDQXhDLGFBQUt5QyxRQUFMLElBQWlCQyxlQUFlSixFQUFmLEVBQW1CdEMsS0FBS3lDLFFBQXhCLENBQWpCO0FBQ0Esa0NBQWNILEVBQWQsRUFBa0J0QyxLQUFLMkMsVUFBdkI7QUFDQSxlQUFPTCxFQUFQO0FBQ0gsS0FMRCxNQU1LLE9BQU9DLFNBQVNLLGNBQVQsQ0FBd0I1QyxJQUF4QixDQUFQO0FBQ1I7O0FBR0QsU0FBUzBDLGNBQVQsQ0FBd0JHLE1BQXhCLEVBQWdDSixRQUFoQyxFQUEwQztBQUN0Q0EsYUFBU0ssR0FBVCxDQUFhWixhQUFiLEVBQ0thLE9BREwsQ0FDZUYsT0FBT2QsV0FEdEIsTUFDZWMsTUFEZjtBQUVIOztRQUtHWCxhLEdBQUFBLGE7Ozs7Ozs7Ozs7Ozs7O0FDOUJKOztBQUlBLFNBQVNjLGFBQVQsQ0FBdUJILE1BQXZCLEVBQStCRixhQUFXLEVBQTFDLEVBQThDO0FBQzFDMUIsV0FBT2dDLElBQVAsQ0FBWU4sVUFBWixFQUNLTyxNQURMLENBQ1kzQixPQUFPb0IsV0FBV1EsY0FBWCxDQUEwQjVCLEdBQTFCLENBRG5CLEVBRUt3QixPQUZMLENBRWFLLFlBQVlDLGFBQWFSLE1BQWIsRUFBcUJPLFFBQXJCLEVBQStCVCxXQUFXUyxRQUFYLENBQS9CLENBRnpCO0FBR0g7O0FBR0QsU0FBU0MsWUFBVCxDQUFzQlIsTUFBdEIsRUFBOEJPLFFBQTlCLEVBQXdDRSxTQUF4QyxFQUFtRDtBQUMvQ0YsaUJBQWEsV0FBYixLQUE2QkEsV0FBVyxPQUF4QztBQUNBLFFBQUksaUJBQVVHLFFBQVYsQ0FBbUJILFFBQW5CLENBQUosRUFDSSxPQUFPUCxPQUFPVyxnQkFBUCxDQUNILGdCQUFTSixRQUFULENBREcsRUFFSEUsU0FGRyxDQUFQO0FBSUpULFdBQU9RLFlBQVAsQ0FBb0JELFFBQXBCLEVBQThCRSxTQUE5QjtBQUNIOztBQUdELFNBQVNHLGVBQVQsQ0FBeUJaLE1BQXpCLEVBQWlDTyxRQUFqQyxFQUEyQ00sWUFBM0MsRUFBeUQ7QUFDckROLGlCQUFhLFdBQWIsS0FBNkJBLFdBQVcsT0FBeEM7QUFDQSxRQUFJLGlCQUFVRyxRQUFWLENBQW1CSCxRQUFuQixDQUFKLEVBQ0ksT0FBT1AsT0FBT1csZ0JBQVAsQ0FDSCxnQkFBU0osUUFBVCxDQURHLEVBRUhNLFlBRkcsQ0FBUDtBQUlKYixXQUFPWSxlQUFQLENBQXVCTCxRQUF2QjtBQUNIOztBQUdELFNBQVNPLFdBQVQsQ0FBcUJDLEtBQXJCLEVBQTRCQyxRQUE1QixFQUFzQztBQUNsQyxVQUFNQyxXQUFXRCxTQUFTRSxVQUExQjtBQUNBLFFBQUlELFNBQVNFLFNBQVQsS0FBdUJILFFBQTNCLEVBQ0ksT0FBT0MsU0FBUy9CLFdBQVQsQ0FBcUI2QixLQUFyQixDQUFQO0FBQ0osV0FBT0UsU0FBU0csWUFBVCxDQUFzQkwsS0FBdEIsRUFBNEJDLFNBQVNLLFdBQXJDLENBQVA7QUFDSDs7UUFJR2xCLGEsR0FBQUEsYTtRQUNBSyxZLEdBQUFBLFk7UUFDQUksZSxHQUFBQSxlO1FBQ0FFLFcsR0FBQUEsVzs7Ozs7Ozs7Ozs7Ozs7QUM3Q0o7Ozs7QUFDQTs7OztRQUdJUSxVO1FBQ0FDLFM7UUFDQUMsUTs7Ozs7Ozs7Ozs7OztBQ05KLE1BQU1DLFVBQVU7QUFDWkMsWUFBUSxRQURJO0FBRVpDLFlBQVEsUUFGSTtBQUdaQyxhQUFTLFNBSEc7QUFJWkMsWUFBUSxRQUpJOztBQU1aQyxlQUFXLFdBTkM7QUFPWkMsa0JBQWMsY0FQRjs7QUFTWkMsd0JBQW9CLG9CQVRSO0FBVVpDLDJCQUF1Qix1QkFWWDtBQVdaQywyQkFBdUI7QUFYWCxDQUFoQjs7a0JBZWVULE87Ozs7Ozs7Ozs7Ozs7QUNmZixNQUFNRixZQUFZO0FBQ2Q7QUFDQSxRQUZjLEVBRUosT0FGSSxFQUVLLFNBRkw7QUFHZDtBQUNBLGtCQUpjLEVBSU0sb0JBSk4sRUFJNEIscUJBSjVCO0FBS2Q7QUFDQSxXQU5jLEVBTUQsWUFOQyxFQU1hLFNBTmI7QUFPZDtBQUNBLFNBUmMsRUFRSCxRQVJHO0FBU2Q7QUFDQSxVQVZjLEVBVUYsU0FWRSxFQVVTLFdBVlQsRUFVc0IsVUFWdEI7QUFXZDtBQUNBLFNBWmMsRUFZSCxlQVpHLEVBWWMsZUFaZCxFQWFkLFFBYmMsRUFhSixXQWJJLEVBYVMsYUFiVCxFQWF3QixZQWJ4QixFQWNkLGFBZGMsRUFjQyxZQWRELEVBY2UsYUFkZixFQWVkLFFBZmMsRUFlSixhQWZJLEVBZVcsY0FmWCxFQWdCZCxjQWhCYyxFQWdCRSxhQWhCRixFQWdCaUIsWUFoQmpCLEVBaUJkLGFBakJjLEVBaUJDLFdBakJEO0FBa0JkO0FBQ0EsVUFuQmM7QUFvQmQ7QUFDQSxlQXJCYyxFQXFCRyxZQXJCSCxFQXFCaUIsYUFyQmpCLEVBcUJnQyxjQXJCaEM7QUFzQmQ7QUFDQSxVQXZCYztBQXdCZDtBQUNBLFNBekJjO0FBMEJkO0FBQ0EsU0EzQmMsRUEyQkgsV0EzQkcsRUEyQlUsa0JBM0JWLEVBNEJkLGtCQTVCYyxFQTRCTSxXQTVCTixFQTRCbUIsb0JBNUJuQixFQTZCZCxTQTdCYyxFQTZCSCxjQTdCRyxFQTZCYSxrQkE3QmIsRUE4QmQsYUE5QmMsRUE4QkMsU0E5QkQsRUE4QlksaUJBOUJaLEVBK0JkLFlBL0JjLEVBK0JBLGNBL0JBLEVBK0JnQixVQS9CaEIsRUFnQ2QsV0FoQ2MsRUFnQ0QsV0FoQ0MsRUFnQ1ksdUJBaENaLEVBaUNkLGdCQWpDYyxFQWlDSSxXQWpDSjtBQWtDZDtBQUNBLFFBbkNjLEVBbUNKLFNBbkNJO0FBb0NkO0FBQ0Esa0JBckNjLEVBcUNNLGdCQXJDTixFQXFDd0Isc0JBckN4QjtBQXNDZDtBQUNBLGlCQXZDYztBQXdDZDtBQUNBLFVBekNjLENBQWxCOztBQTZDQSxNQUFNQyxXQUFXRCxVQUFVWSxNQUFWLENBQWlCLENBQUNDLFNBQUQsRUFBWUMsS0FBWixLQUFzQjtBQUNwREQsY0FBVUMsS0FBVixJQUFtQkEsTUFDZEMsT0FEYyxDQUNOLElBRE0sRUFDQSxFQURBLEVBRWRBLE9BRmMsQ0FFTixRQUZNLEVBRUlDLEtBQUtBLEVBQUVDLFdBQUYsRUFGVCxDQUFuQjtBQUdBLFdBQU9KLFNBQVA7QUFDSCxDQUxnQixFQUtkLEVBTGMsQ0FBakI7O1FBU0liLFMsR0FBQUEsUztRQUNBQyxRLEdBQUFBLFE7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2REo7O0FBSUEsU0FBU2xDLElBQVQsQ0FBY21ELE9BQWQsRUFBdUJ0RCxPQUF2QixFQUFnQztBQUM1Qjs7Ozs7Ozs7QUFRQSxRQUFJLENBQUNBLE9BQUwsRUFBYyxPQUFPLEVBQUV1RCxNQUFNLGtCQUFXaEIsTUFBbkIsRUFBMkJlLE9BQTNCLEVBQVAsQ0FBZCxLQUNLLElBQUksQ0FBQ0EsT0FBTCxFQUFjLE9BQU8sRUFBRUMsTUFBTSxrQkFBV2YsTUFBbkIsRUFBUCxDQUFkLEtBQ0EsSUFBSWdCLFVBQVVGLE9BQVYsRUFBbUJ0RCxPQUFuQixDQUFKLEVBQWlDLE9BQU8sRUFBRXVELE1BQU0sa0JBQVdkLE9BQW5CLEVBQTRCYSxPQUE1QixFQUFQLENBQWpDLEtBQ0EsSUFBSUEsUUFBUTlDLFdBQVosRUFDRCxPQUFPO0FBQ0grQyxjQUFNLGtCQUFXYixNQURkO0FBRUhqQyxrQkFBVWdELGFBQWFILE9BQWIsRUFBc0J0RCxPQUF0QixDQUZQO0FBR0hXLG9CQUFZK0MsZUFBZUosT0FBZixFQUF3QnRELE9BQXhCLENBSFQ7QUFJSDJELGdCQUFRQyxXQUFXTixPQUFYLEVBQW9CdEQsT0FBcEI7QUFKTCxLQUFQO0FBTVA7O0FBRUQsU0FBU3dELFNBQVQsQ0FBbUJGLE9BQW5CLEVBQTRCdEQsT0FBNUIsRUFBcUM7QUFDakMsV0FBTyxPQUFPc0QsT0FBUCxLQUFtQixPQUFPdEQsT0FBMUIsSUFDSCxPQUFPc0QsT0FBUCxLQUFtQixRQUFuQixJQUErQkEsWUFBWXRELE9BRHhDLElBRUgsT0FBT3NELE9BQVAsS0FBbUIsUUFBbkIsSUFBK0JBLFFBQVE5QyxXQUFSLEtBQXdCUixRQUFRUSxXQUZuRTtBQUdIOztBQUdELFNBQVNvRCxVQUFULENBQW9CTixPQUFwQixFQUE2QnRELE9BQTdCLEVBQXNDO0FBQ2xDLFVBQU1DLFVBQVcsRUFBakI7QUFDQSxVQUFNVSwwQkFBaUJYLFFBQVFXLFVBQXpCLEVBQXdDMkMsUUFBUTNDLFVBQWhELENBQU47QUFDQTFCLFdBQU9nQyxJQUFQLENBQVlOLFVBQVosRUFDS08sTUFETCxDQUNZRSxZQUFZLGlCQUFVRyxRQUFWLENBQW1CSCxRQUFuQixDQUR4QixFQUVLTCxPQUZMLENBRWE4QyxhQUFhO0FBQ2xCLGNBQU1DLGFBQWFSLFFBQVEzQyxVQUFSLENBQW1Ca0QsU0FBbkIsQ0FBbkI7QUFDQSxjQUFNRSxhQUFhL0QsUUFBUVcsVUFBUixDQUFtQmtELFNBQW5CLENBQW5CO0FBQ0EsWUFBSSxDQUFDQyxVQUFMLEVBQ0ksT0FBTzdELFFBQVErRCxJQUFSLENBQWE7QUFDaEJULGtCQUFNLGtCQUFXUixxQkFERDtBQUVoQnZELG1CQUFPdUUsVUFGUyxFQUVHRjtBQUZILFNBQWIsQ0FBUCxDQURKLEtBS0ssSUFBSSxDQUFDRSxVQUFMLEVBQ0Q5RCxRQUFRK0QsSUFBUixDQUFhO0FBQ1RULGtCQUFNLGtCQUFXVixrQkFEUjtBQUVUckQsbUJBQU9zRSxVQUZFLEVBRVVEO0FBRlYsU0FBYixFQURDLEtBS0E1RCxRQUFRK0QsSUFBUixDQUFhO0FBQ1ZULGtCQUFNLGtCQUFXVCxxQkFEUDtBQUVWdEQsbUJBQU9zRSxVQUZHLEVBRVNyRSxVQUFVc0UsVUFGbkIsRUFFK0JGO0FBRi9CLFNBQWI7QUFJUixLQW5CTDtBQW9CQSxXQUFPNUQsT0FBUDtBQUNIOztBQUVELFNBQVN5RCxjQUFULENBQXdCSixPQUF4QixFQUFpQ3RELE9BQWpDLEVBQTBDO0FBQ3RDLFVBQU1DLFVBQVcsRUFBakI7QUFDQSxVQUFNVSwwQkFBaUJYLFFBQVFXLFVBQXpCLEVBQXdDMkMsUUFBUTNDLFVBQWhELENBQU47QUFDQTFCLFdBQU9nQyxJQUFQLENBQVlOLFVBQVosRUFDS08sTUFETCxDQUNZRSxZQUFZLENBQUMsaUJBQVVHLFFBQVYsQ0FBbUJILFFBQW5CLENBRHpCLEVBRUtMLE9BRkwsQ0FFYUssWUFBWTtBQUNqQixjQUFNNkMsVUFBVVgsUUFBUTNDLFVBQVIsQ0FBbUJTLFFBQW5CLENBQWhCO0FBQ0EsY0FBTThDLFVBQVVsRSxRQUFRVyxVQUFSLENBQW1CUyxRQUFuQixDQUFoQjtBQUNBLFNBQUM2QyxPQUFELElBQVloRSxRQUFRK0QsSUFBUixDQUFhO0FBQ3JCVCxrQkFBTSxrQkFBV1gsWUFESTtBQUVyQnBELG1CQUFPMEUsT0FGYyxFQUVMOUM7QUFGSyxTQUFiLENBQVo7QUFJQSxTQUFDLENBQUM4QyxPQUFELElBQVlBLFlBQVlELE9BQXpCLEtBQXFDaEUsUUFBUStELElBQVIsQ0FBYTtBQUM5Q1Qsa0JBQU0sa0JBQVdaLFNBRDZCO0FBRTlDbkQsbUJBQU95RSxPQUZ1QyxFQUU5QjdDO0FBRjhCLFNBQWIsQ0FBckM7QUFJSCxLQWJMO0FBY0EsV0FBT25CLE9BQVA7QUFDSDs7QUFHRCxTQUFTd0QsWUFBVCxDQUFzQkgsT0FBdEIsRUFBK0J0RCxPQUEvQixFQUF3QztBQUNwQyxVQUFNbUUsV0FBV2IsUUFBUTdDLFFBQVIsSUFBb0IsRUFBckM7QUFDQSxVQUFNMkQsV0FBV3BFLFFBQVFTLFFBQVIsSUFBb0IsRUFBckM7QUFDQSxXQUFPLENBQUMsR0FBRzRELE1BQU1DLEtBQUtDLEdBQUwsQ0FDYkosU0FBU0ssTUFESSxFQUNJSixTQUFTSSxNQURiLENBQU4sRUFFUnZELElBRlEsRUFBSixFQUVJSCxHQUZKLENBRVEyRCxLQUFLdEUsS0FBS2dFLFNBQVNNLENBQVQsQ0FBTCxFQUFrQkwsU0FBU0ssQ0FBVCxDQUFsQixDQUZiLENBQVA7QUFHSDs7UUFJR3RFLEksR0FBQUEsSTs7Ozs7Ozs7Ozs7Ozs7QUN6Rko7O0FBQ0E7O0FBQ0E7O0FBSUEsU0FBU0MsS0FBVCxDQUFlc0UsTUFBZixFQUF1QnpFLE9BQXZCLEVBQWdDMEUsUUFBTSxDQUF0QyxFQUF5QztBQUNyQyxRQUFJLENBQUMxRSxPQUFMLEVBQWM7QUFDZCxVQUFNSyxLQUFLb0UsT0FBT0UsVUFBUCxDQUFrQkQsS0FBbEIsQ0FBWDtBQUNBLFlBQVExRSxRQUFRc0QsSUFBaEI7QUFDSSxhQUFLLGtCQUFXaEIsTUFBaEI7QUFBd0I7QUFDcEIsc0JBQU0sRUFBRWUsT0FBRixLQUFjckQsT0FBcEI7QUFDQSxzQkFBTTJCLFFBQVEsMEJBQWMwQixPQUFkLENBQWQ7QUFDQSxvQkFBSXFCLFVBQVVELE9BQU9FLFVBQVAsQ0FBa0JKLE1BQWhDLEVBQ0lFLE9BQU8zRSxXQUFQLENBQW1CNkIsS0FBbkIsRUFESixLQUVLOEMsT0FBT3pDLFlBQVAsQ0FBb0JMLEtBQXBCLEVBQTJCdEIsRUFBM0I7QUFDTDtBQUNIO0FBQ0QsYUFBSyxrQkFBV2tDLE1BQWhCO0FBQXdCO0FBQ3BCLG9CQUFJLENBQUNsQyxFQUFMLEVBQVM7QUFDVG9FLHVCQUFPRyxXQUFQLENBQW1CdkUsRUFBbkI7QUFDQTtBQUNIO0FBQ0QsYUFBSyxrQkFBV21DLE9BQWhCO0FBQXlCO0FBQ3JCLHNCQUFNLEVBQUVhLE9BQUYsS0FBY3JELE9BQXBCO0FBQ0Esc0JBQU0yQixRQUFRLDBCQUFjMEIsT0FBZCxDQUFkO0FBQ0FvQix1QkFBT0ksWUFBUCxDQUFvQmxELEtBQXBCLEVBQTJCdEIsRUFBM0I7QUFDQTtBQUNIO0FBQ0QsYUFBSyxrQkFBV29DLE1BQWhCO0FBQXdCO0FBQ3BCLHNCQUFNLEVBQUVqQyxRQUFGLEVBQVlFLFVBQVosRUFBd0JnRCxNQUF4QixLQUFtQzFELE9BQXpDO0FBQ0E4RSxnQ0FBZ0J6RSxFQUFoQixFQUFvQkssVUFBcEI7QUFDQXFFLDRCQUFZMUUsRUFBWixFQUFnQnFELE1BQWhCO0FBQ0FsRCx5QkFBU00sT0FBVCxDQUFpQixDQUFDa0UsS0FBRCxFQUFRTixLQUFSLEtBQWtCdkUsTUFBTUUsRUFBTixFQUFVMkUsS0FBVixFQUFpQk4sS0FBakIsQ0FBbkM7QUFDQTtBQUNIO0FBMUJMO0FBNEJIOztBQUVELFNBQVNLLFdBQVQsQ0FBcUIxRSxFQUFyQixFQUF5QnFELE1BQXpCLEVBQWlDO0FBQzdCQSxXQUFPNUMsT0FBUCxDQUFlWCxTQUFTO0FBQ3BCLGNBQU0sRUFBRW1ELElBQUYsRUFBUS9ELEtBQVIsRUFBZUMsUUFBZixFQUF5Qm9FLFNBQXpCLEtBQXVDekQsS0FBN0M7QUFDQSxZQUFJbUQsU0FBUyxrQkFBV1Ysa0JBQXhCLEVBQ0ksT0FBT3ZDLEdBQUdrQixnQkFBSCxDQUFvQnFDLFNBQXBCLEVBQStCckUsS0FBL0IsQ0FBUDtBQUNKLFlBQUkrRCxTQUFTLGtCQUFXUixxQkFBeEIsRUFDSSxPQUFPekMsR0FBRzRFLG1CQUFILENBQXVCckIsU0FBdkIsRUFBa0NwRSxRQUFsQyxDQUFQO0FBQ0osWUFBSThELFNBQVMsa0JBQVdULHFCQUF4QixFQUErQztBQUMzQ3hDLGVBQUc0RSxtQkFBSCxDQUF1QnJCLFNBQXZCLEVBQWtDcEUsUUFBbEM7QUFDQWEsZUFBR2tCLGdCQUFILENBQW9CcUMsU0FBcEIsRUFBK0JyRSxLQUEvQjtBQUNIO0FBQ0osS0FWRDtBQVdIOztBQUVELFNBQVN1RixlQUFULENBQXlCSSxPQUF6QixFQUFrQ3hFLFVBQWxDLEVBQThDO0FBQzFDQSxlQUFXSSxPQUFYLENBQW1CWCxTQUFTO0FBQ3hCLGNBQU0sRUFBRW1ELElBQUYsRUFBUW5DLFFBQVIsRUFBa0I1QixLQUFsQixLQUE0QlksS0FBbEM7QUFDQSxZQUFJbUQsU0FBUyxrQkFBV1osU0FBeEIsRUFDSSwwQkFBYXdDLE9BQWIsRUFBc0IvRCxRQUF0QixFQUFnQzVCLEtBQWhDLEVBREosS0FFSyxJQUFJK0QsU0FBUyxrQkFBV1gsWUFBeEIsRUFDRCw2QkFBZ0J1QyxPQUFoQixFQUF5Qi9ELFFBQXpCLEVBQW1DNUIsS0FBbkM7QUFDUCxLQU5EO0FBT0g7O1FBSUdZLEssR0FBQUEsSzs7Ozs7Ozs7Ozs7Ozs7QUNqRUo7Ozs7QUFDQTs7OztBQUNBOzs7O1FBSUlnRixRO1FBQ0FDLGE7UUFDQUMsSTtRQUFNQyxROzs7Ozs7Ozs7Ozs7Ozs7O0FDUlY7O0lBSXFCSCxRLHFCQUFOLE1BQU1BLFFBQU4sQ0FBZTtBQUMxQnRILGdCQUFZd0IsR0FBWixFQUFpQlQsY0FBakIsRUFBaUMyRyxjQUFqQyxFQUFpRDtBQUM3QyxZQUFJLE9BQU9sRyxHQUFQLEtBQWUsUUFBbkIsRUFDSSxNQUFNLElBQUltRyxTQUFKLENBQWMseUJBQWQsQ0FBTjtBQUNKLHlCQUFLbkcsR0FBTCxFQUFVLENBQUNDLEdBQUQsRUFBTUMsS0FBTixLQUFnQixxQkFDdEIsSUFEc0IsRUFDaEJELEdBRGdCLEVBQ1hDLEtBRFcsRUFFdEJYLGNBRnNCLEVBR3RCMkcsY0FIc0IsQ0FBMUI7QUFLSDs7QUFUeUIsQyxTQVduQjVHLEksR0FBTyxDQUFDVSxHQUFELEVBQU1ULGNBQU4sRUFBc0IyRyxjQUF0QixLQUF5QztBQUNuRCxXQUFPLElBQUlKLFFBQUosQ0FDSDlGLEdBREcsRUFFSFQsY0FGRyxFQUdIMkcsY0FIRyxDQUFQO0FBS0gsQyxTQUVNRSxRLEdBQVcsTUFBTTtBQUNwQixXQUFRLFlBQUQsU0FBaUIsRUFBeEI7QUFDSCxDO2tCQXJCZ0JOLFE7Ozs7Ozs7Ozs7Ozs7O0FDSnJCOzs7O0FBQ0E7Ozs7OztBQUdBLE1BQU1PLE9BQU8sTUFBTSxDQUFFLENBQXJCOztBQUlBLFNBQVNMLElBQVQsQ0FBY2hHLEdBQWQsRUFBbUJzRyxHQUFuQixFQUF3QjtBQUNwQixRQUFJLE9BQU90RyxHQUFQLEtBQWUsUUFBbkIsRUFDSSxNQUFNLElBQUltRyxTQUFKLENBQWUsa0RBQWlELE9BQU9uRyxHQUFJLEVBQTNFLENBQU47QUFDSixRQUFJK0UsTUFBTXdCLE9BQU4sQ0FBY3ZHLEdBQWQsQ0FBSixFQUNJLE9BQU9BLElBQUl5QixPQUFKLENBQVksQ0FBQytFLElBQUQsRUFBT25CLEtBQVAsS0FBaUJpQixJQUFJakIsS0FBSixFQUFXbUIsSUFBWCxFQUFpQnhHLEdBQWpCLENBQTdCLENBQVAsQ0FESixLQUdJLE9BQU9MLE9BQU9nQyxJQUFQLENBQVkzQixHQUFaLEVBQWlCeUIsT0FBakIsQ0FBeUJ4QixPQUFPcUcsSUFBSXJHLEdBQUosRUFBU0QsSUFBSUMsR0FBSixDQUFULEVBQW1CRCxHQUFuQixDQUFoQyxDQUFQO0FBQ1A7O0FBRUQsU0FBU2lHLFFBQVQsQ0FBa0JqRyxHQUFsQixFQUF1QkMsR0FBdkIsRUFBNEJDLEtBQTVCLEVBQW1DWCxpQkFBZThHLElBQWxELEVBQXdESCxpQkFBZUcsSUFBdkUsRUFBNkU7QUFDekUsUUFBSSxPQUFPckcsR0FBUCxLQUFlLFFBQW5CLEVBQ0ksTUFBTSxJQUFJbUcsU0FBSixDQUFlLHNEQUFxRCxPQUFPbkcsR0FBSSxFQUEvRSxDQUFOOztBQUVKLFFBQUkrRSxNQUFNd0IsT0FBTixDQUFjckcsS0FBZCxDQUFKLEVBQ0lBLFFBQVEsZ0JBQWNaLElBQWQsQ0FBbUJZLEtBQW5CLEVBQTBCWCxjQUExQixFQUEwQzJHLGNBQTFDLENBQVIsQ0FESixLQUVLLElBQUksT0FBT2hHLEtBQVAsS0FBaUIsUUFBckIsRUFDREEsUUFBUSxpQkFBU1osSUFBVCxDQUFjWSxLQUFkLEVBQXFCWCxjQUFyQixFQUFxQzJHLGNBQXJDLENBQVI7O0FBRUp2RyxXQUFPQyxjQUFQLENBQXNCSSxHQUF0QixFQUEyQkMsR0FBM0IsRUFBZ0M7QUFDNUJKLG9CQUFZLElBRGdCO0FBRTVCQyxzQkFBYyxJQUZjO0FBRzVCQyxhQUFLLE1BQU07QUFDUG1HLDJCQUFlbEcsR0FBZixFQUFvQkMsR0FBcEIsRUFBeUJDLEtBQXpCO0FBQ0EsbUJBQU9BLEtBQVA7QUFDSCxTQU4yQjtBQU81QnVHLGFBQUtDLFlBQVk7QUFDYixrQkFBTXZHLFdBQVdILElBQUlDLEdBQUosQ0FBakI7QUFDQWdHLHFCQUFTakcsR0FBVCxFQUFjQyxHQUFkLEVBQW1CeUcsUUFBbkIsRUFBNkJuSCxjQUE3QixFQUE2QzJHLGNBQTdDO0FBQ0EzRywyQkFBZVMsR0FBZixFQUFvQkMsR0FBcEIsRUFBeUJ5RyxRQUF6QixFQUFtQ3ZHLFFBQW5DO0FBQ0g7QUFYMkIsS0FBaEM7QUFhSDs7QUFHRCxNQUFNd0csY0FBYyxZQUFXO0FBQzNCLFFBQUlDLEtBQUssQ0FBVDtBQUNBLFdBQVEsTUFBTUEsSUFBZDtBQUNILENBSG1CLEVBQXBCOztRQU9JWixJLEdBQUFBLEk7UUFDQUMsUSxHQUFBQSxRO1FBQ0FVLFcsR0FBQUEsVzs7Ozs7Ozs7Ozs7Ozs7OztBQ25ESjs7SUFJcUJaLGEscUJBQU4sTUFBTUEsYUFBTixDQUFvQjtBQUMvQnZILGdCQUFZcUksS0FBWixFQUFtQnRILGNBQW5CLEVBQW1DMkcsY0FBbkMsRUFBbUQ7QUFBQTs7QUFDL0MsU0FBQ1csS0FBRCxLQUFXQSxRQUFRLEVBQW5CO0FBQ0EsWUFBSSxDQUFDOUIsTUFBTXdCLE9BQU4sQ0FBY00sS0FBZCxDQUFMLEVBQ0ksTUFBTSxJQUFJVixTQUFKLENBQWMsd0JBQWQsQ0FBTjtBQUNKLHlCQUFLVSxLQUFMLEVBQVksQ0FBQ3hCLEtBQUQsRUFBUW1CLElBQVIsS0FBaUIscUJBQ3pCLElBRHlCLEVBQ25CbkIsS0FEbUIsRUFDWm1CLElBRFksRUFFekJqSCxjQUZ5QixFQUVUMkcsY0FGUyxDQUE3QjtBQUlBLGFBQUtoQixNQUFMLEdBQWMyQixNQUFNM0IsTUFBcEI7QUFDSDs7QUFWOEIsQyxTQWF4QjVGLEksR0FBTyxDQUFDdUgsS0FBRCxFQUFRdEgsY0FBUixFQUF3QjJHLGNBQXhCLEtBQTJDO0FBQ3JELFdBQU8sSUFBSUgsYUFBSixDQUNIYyxLQURHLEVBRUh0SCxjQUZHLEVBR0gyRyxjQUhHLENBQVA7QUFLSCxDLFNBQ01ZLGUsR0FBbUJELFNBQVM7QUFDL0IsV0FBT0EsTUFBTUUsU0FBTixDQUFnQnZJLFdBQWhCLEtBQWdDdUgsYUFBdkM7QUFDSCxDLFNBQ01pQixFLEdBQUssQ0FBQyxHQUFHQyxJQUFKLEtBQWE7QUFDckIsV0FBTyxJQUFJbEIsYUFBSixDQUFrQixDQUFDLEdBQUdrQixJQUFKLENBQWxCLENBQVA7QUFDSCxDO1NBR0RDLE0sR0FBUyxDQUFDLEdBQUdDLE1BQUosS0FBZTtBQUNwQixjQUFNQyxXQUFXLElBQUlyQixhQUFKLEVBQWpCO0FBQ0EsU0FBQyxJQUFELEVBQU8sR0FBR29CLE1BQVYsRUFBa0IxRixPQUFsQixDQUNJb0YsU0FBU0EsTUFBTXBGLE9BQU4sQ0FBYzJGLFNBQVMxQyxJQUF2QixDQURiO0FBR0EsZUFBTzBDLFFBQVA7QUFDSCxLOztTQUNEQyxVLEdBQWEsQ0FBQyxHQUFHSixJQUFKLEtBQWE7QUFDdEI7QUFDQSxlQUFPbEIsY0FBY3pHLElBQWQsQ0FDSHlGLE1BQU16RixJQUFOLENBQVcsSUFBWCxFQUFpQitILFVBQWpCLENBQTRCLEdBQUdKLElBQS9CLENBREcsQ0FBUDtBQUdILEs7O1NBQ0RLLE8sR0FBVSxhQUFhO0FBQ25CLFlBQUlqQyxRQUFRLENBQVo7QUFDQSxlQUFPLEtBQUtBLEtBQUwsQ0FBUCxFQUNJLE1BQU0sQ0FBQ0EsT0FBRCxFQUFVLEtBQUtBLEtBQUwsQ0FBVixDQUFOO0FBQ1AsSzs7U0FDRGtDLEssR0FBUSxNQUFNLENBQUUsQzs7U0FDaEJDLEksR0FBTyxNQUFNLENBQUUsQzs7U0FDZjVGLE0sR0FBUyxNQUFNLENBQUUsQzs7U0FDakI2RixJLEdBQU8sTUFBTSxDQUFFLEM7O1NBQ2ZDLFMsR0FBWSxNQUFNLENBQUUsQzs7U0FDcEJqRyxPLEdBQVUsTUFBTSxDQUFFLEM7O1NBQ2xCUSxRLEdBQVcsTUFBTSxDQUFFLEM7O1NBQ25CMEYsTyxHQUFVLE1BQU0sQ0FBRSxDOztTQUNsQkMsSSxHQUFPLE1BQU0sQ0FBRSxDOztTQUNmakcsSSxHQUFPLE1BQU0sQ0FBRSxDOztTQUNma0csVyxHQUFjLE1BQU0sQ0FBRSxDOztTQUN0QnJHLEcsR0FBTSxNQUFNLENBQUUsQzs7U0FDZHNHLEcsR0FBTSxNQUFNLENBQUUsQzs7U0FDZHBELEksR0FBT3hFLFNBQVM7QUFDWiw2QkFDSSxJQURKLEVBQ1UsS0FBS2dGLE1BRGYsRUFDdUJoRixLQUR2QixFQUVJWCxjQUZKLEVBRW9CMkcsY0FGcEI7QUFJQSxhQUFLaEIsTUFBTDtBQUNBLGVBQU9oRixLQUFQO0FBQ0gsSzs7U0FDRHdELE0sR0FBUyxNQUFNLENBQUUsQzs7U0FDakJxRSxXLEdBQWMsTUFBTSxDQUFFLEM7O1NBQ3RCQyxPLEdBQVUsTUFBTSxDQUFFLEM7O1NBQ2xCQyxLLEdBQVEsTUFBTSxDQUFFLEM7O1NBQ2hCQyxLLEdBQVEsTUFBTSxDQUFFLEM7O1NBQ2hCQyxJLEdBQU8sTUFBTSxDQUFFLEM7O1NBQ2ZDLEksR0FBTyxNQUFNLENBQUUsQzs7U0FDZkMsTSxHQUFTLE1BQU0sQ0FBRSxDOztTQUNqQkMsYyxHQUFpQixNQUFNLENBQUUsQzs7U0FDekJDLFEsR0FBVyxNQUFNLENBQUUsQzs7U0FDbkJuQyxRLEdBQVcsTUFBTTtBQUNiLGVBQVEscUJBQVI7QUFDSCxLOztTQUNEb0MsTyxHQUFVLE1BQU0sQ0FBRSxDOztTQUNsQkMsTSxHQUFTLE1BQU0sQ0FBRSxDOztrQkFqRkExQyxhOzs7Ozs7Ozs7Ozs7O0FDSnJCLFNBQVMyQyxXQUFULENBQXFCaEssSUFBckIsRUFBMkI7QUFDdkIsUUFBSSxDQUFDQSxJQUFMLEVBQVc7QUFDWCxRQUFJQSxLQUFLeUMsUUFBVCxFQUNJekMsS0FBS3lDLFFBQUwsR0FBZ0J3SCxnQkFBZ0JqSyxLQUFLeUMsUUFBckIsQ0FBaEI7QUFDSixXQUFPekMsSUFBUDtBQUNIOztBQUVELFNBQVNpSyxlQUFULENBQXlCeEgsUUFBekIsRUFBbUM7QUFDL0IsV0FBTyxHQUFHK0YsTUFBSCxDQUFVLEdBQUcvRixRQUFiLEVBQ0ZLLEdBREUsQ0FDRTlDLFFBQVE7QUFDVCxZQUFJLE9BQU9BLElBQVAsS0FBZ0IsUUFBcEIsRUFDSSxPQUFPZ0ssWUFBWWhLLElBQVosQ0FBUCxDQURKLEtBRUssT0FBT0EsSUFBUDtBQUNSLEtBTEUsRUFNRmtELE1BTkUsQ0FNS2xELFFBQVEsQ0FBQyxDQUFDQSxJQU5mLENBQVA7QUFPSDs7UUFJR2dLLFcsR0FBQUEsVyIsImZpbGUiOiJpbmRleC5idWlsZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9hc3NldHMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZjQzNmI1YmYxZWU3OWExMGFmMWQiLCJcbmltcG9ydCBNdXNlIGZyb20gJy4vY29yZSc7XG5cblxuXG5leHBvcnQge1xuICAgIE11c2Vcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2luZGV4LmpzIiwiXG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBkaWZmLCBwYXRjaCB9IGZyb20gJy4vZG9tJztcbmltcG9ydCB7IE9ic2VydmVyLCBvYnNlcnZlciwgd2FsayB9IGZyb20gJy4vb2JzZXJ2ZXInO1xuaW1wb3J0IHsgZmxhdHRlbk5vZGUgfSBmcm9tICcuL3V0aWxzJ1xuXG5cblxuY2xhc3MgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBlbnRyeSA9IG51bGw7XG4gICAgbm9kZSA9IG51bGw7XG4gICAgc3RhdGUgPSB7fTtcbiAgICBjb21wdXRlZCA9IHt9O1xuXG4gICAgLy8gVE9ETzogTGlmZUN5Y2xlXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge307XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7fTtcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKCkge307XG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH07XG4gICAgY29tcG9uZW50V2lsbFVwZGF0ZSgpIHt9O1xuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHt9O1xuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge307XG4gICAgY29tcG9uZW50RGlkQ2F0Y2goKSB7fTtcblxuICAgIC8vIE9ic2VydmVyXG4gICAgaW5pdE9ic2VydmVyKCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gT2JzZXJ2ZXIuZnJvbShcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgfHwge30sXG4gICAgICAgICAgICA6OnRoaXMuc2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKTtcbiAgICB9O1xuICAgIGluaXRDb21wdXRlZCgpIHtcbiAgICAgICAgd2FsayhcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZWQsXG4gICAgICAgICAgICAobmFtZSwgZ2V0dGVyLCBjb21wdXRlZCkgPT4ge1xuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb21wdXRlZCwgbmFtZSwge1xuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBnZXQ6IHRoaXM6OmdldHRlclxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9XG4gICAgc2V0dGVyQ2FsbGJhY2sob2JqLCBrZXksIHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAob2JqICE9PSB0aGlzLnN0YXRlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCT09NISEhJyk7XG4gICAgICAgIHRoaXMuZGlmZkFuZFBhdGNoKCk7XG4gICAgfTtcblxuICAgIC8vIFJlbmRlclxuICAgIGJlZm9yZVJlbmRlcigpIHtcbiAgICAgICAgdGhpcy5pbml0T2JzZXJ2ZXIoKTtcbiAgICAgICAgdGhpcy5pbml0Q29tcHV0ZWQoKTtcbiAgICB9O1xuICAgIHJlbmRlcigpIHt9O1xuICAgIHJlbmRlclRvKGVudHJ5KSB7XG4gICAgICAgIHRoaXMuYmVmb3JlUmVuZGVyKCk7XG4gICAgICAgIHRoaXMubm9kZSA9IGZsYXR0ZW5Ob2RlKHRoaXMucmVuZGVyKCkpO1xuICAgICAgICB0aGlzLmVudHJ5ID0gZW50cnk7XG4gICAgICAgIHRoaXMuZW50cnkuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudCh0aGlzLm5vZGUpKVxuICAgIH07XG4gICAgZGlmZkFuZFBhdGNoKCkge1xuICAgICAgICBjb25zdCBvbGROb2RlID0gdGhpcy5ub2RlO1xuICAgICAgICB0aGlzLm5vZGUgPSBmbGF0dGVuTm9kZSh0aGlzLnJlbmRlcigpKTtcbiAgICAgICAgY29uc3QgcGF0Y2hlcyA9IGRpZmYodGhpcy5ub2RlLCBvbGROb2RlKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cob2xkTm9kZSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMubm9kZSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHBhdGNoZXMpO1xuICAgICAgICBwYXRjaCh0aGlzLmVudHJ5LCBwYXRjaGVzKTtcbiAgICB9O1xufVxuXG5cblxuZXhwb3J0IGRlZmF1bHQgQ29tcG9uZW50O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9pbmRleC5qcyIsIlxuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gJy4vY3JlYXRlJztcbmltcG9ydCB7IGRpZmYgfSBmcm9tICcuL2RpZmYnO1xuaW1wb3J0IHsgcGF0Y2ggfSBmcm9tICcuL3BhdGNoJztcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzJztcblxuXG5leHBvcnQge1xuICAgIGNyZWF0ZUVsZW1lbnQsXG4gICAgZGlmZixcbiAgICBwYXRjaCxcbiAgICB1dGlsc1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vaW5kZXguanMiLCJcbmltcG9ydCB7IHNldEF0dHJpYnV0ZXMgfSBmcm9tICcuLi91dGlscyc7XG5cblxuXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KG5vZGUpIHtcbiAgICAvKlxuICAgIG5vZGU6IFN0cmluZyB8fCB7XG4gICAgICAgIGVsZW1lbnROYW1lOiBTdHJpbmdcbiAgICAgICAgY2hpbGRyZW46IG5vZGVbXVxuICAgICAgICBhdHRyaWJ1dGVzOiBPYmplY3RcbiAgICB9XG4gICAgKi9cbiAgICBpZiAodHlwZW9mIG5vZGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChub2RlLmVsZW1lbnROYW1lKTtcbiAgICAgICAgbm9kZS5jaGlsZHJlbiAmJiBhcHBlbmRDaGlsZHJlbihlbCwgbm9kZS5jaGlsZHJlbik7XG4gICAgICAgIHNldEF0dHJpYnV0ZXMoZWwsIG5vZGUuYXR0cmlidXRlcyk7XG4gICAgICAgIHJldHVybiBlbDtcbiAgICB9XG4gICAgZWxzZSByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobm9kZSk7XG59XG5cblxuZnVuY3Rpb24gYXBwZW5kQ2hpbGRyZW4odGFyZ2V0LCBjaGlsZHJlbikge1xuICAgIGNoaWxkcmVuLm1hcChjcmVhdGVFbGVtZW50KVxuICAgICAgICAuZm9yRWFjaCg6OnRhcmdldC5hcHBlbmRDaGlsZClcbn1cblxuXG5cbmV4cG9ydCB7XG4gICAgY3JlYXRlRWxlbWVudFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vY3JlYXRlL2luZGV4LmpzIiwiXG5pbXBvcnQgeyBFdmVudFR5cGUsIEV2ZW50TWFwIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5cblxuZnVuY3Rpb24gc2V0QXR0cmlidXRlcyh0YXJnZXQsIGF0dHJpYnV0ZXM9e30pIHtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKVxuICAgICAgICAuZmlsdGVyKGtleSA9PiBhdHRyaWJ1dGVzLmhhc093blByb3BlcnR5KGtleSkpXG4gICAgICAgIC5mb3JFYWNoKGF0dHJOYW1lID0+IHNldEF0dHJpYnV0ZSh0YXJnZXQsIGF0dHJOYW1lLCBhdHRyaWJ1dGVzW2F0dHJOYW1lXSkpO1xufVxuXG5cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZSh0YXJnZXQsIGF0dHJOYW1lLCBhdHRyVmFsdWUpIHtcbiAgICBhdHRyTmFtZSA9PT0gJ2NsYXNzTmFtZScgJiYgKGF0dHJOYW1lID0gJ2NsYXNzJyk7XG4gICAgaWYgKEV2ZW50VHlwZS5pbmNsdWRlcyhhdHRyTmFtZSkpXG4gICAgICAgIHJldHVybiB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgIEV2ZW50TWFwW2F0dHJOYW1lXSxcbiAgICAgICAgICAgIGF0dHJWYWx1ZVxuICAgICAgICApO1xuICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGF0dHJWYWx1ZSk7XG59XG5cblxuZnVuY3Rpb24gcmVtb3ZlQXR0cmlidXRlKHRhcmdldCwgYXR0ck5hbWUsIG9sZEF0dHJWYWx1ZSkge1xuICAgIGF0dHJOYW1lID09PSAnY2xhc3NOYW1lJyAmJiAoYXR0ck5hbWUgPSAnY2xhc3MnKTtcbiAgICBpZiAoRXZlbnRUeXBlLmluY2x1ZGVzKGF0dHJOYW1lKSlcbiAgICAgICAgcmV0dXJuIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgRXZlbnRNYXBbYXR0ck5hbWVdLFxuICAgICAgICAgICAgb2xkQXR0clZhbHVlXG4gICAgICAgICk7XG4gICAgdGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZShhdHRyTmFtZSk7XG59XG5cblxuZnVuY3Rpb24gaW5zZXJ0QWZ0ZXIobmV3RWwsIHRhcmdldEVsKSB7XG4gICAgY29uc3QgcGFyZW50RWwgPSB0YXJnZXRFbC5wYXJlbnROb2RlO1xuICAgIGlmIChwYXJlbnRFbC5sYXN0Q2hpbGQgPT09IHRhcmdldEVsKVxuICAgICAgICByZXR1cm4gcGFyZW50RWwuYXBwZW5kQ2hpbGQobmV3RWwpO1xuICAgIHJldHVybiBwYXJlbnRFbC5pbnNlcnRCZWZvcmUobmV3RWwsdGFyZ2V0RWwubmV4dFNpYmxpbmcpO1xufVxuXG5cbmV4cG9ydCB7XG4gICAgc2V0QXR0cmlidXRlcyxcbiAgICBzZXRBdHRyaWJ1dGUsXG4gICAgcmVtb3ZlQXR0cmlidXRlLFxuICAgIGluc2VydEFmdGVyXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS91dGlscy9pbmRleC5qcyIsIlxuaW1wb3J0IENoYW5nZVR5cGUgZnJvbSAnLi9jaGFuZ2UnO1xuaW1wb3J0IHsgRXZlbnRUeXBlLCBFdmVudE1hcCB9IGZyb20gJy4vZXZlbnRzJztcblxuZXhwb3J0IHtcbiAgICBDaGFuZ2VUeXBlLFxuICAgIEV2ZW50VHlwZSxcbiAgICBFdmVudE1hcFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vdHlwZXMvaW5kZXguanMiLCJcbmNvbnN0IENoYW5nZWQgPSB7XG4gICAgQ1JFQVRFOiAnQ1JFQVRFJyxcbiAgICBSRU1PVkU6ICdSRU1PVkUnLFxuICAgIFJFUExBQ0U6ICdSRVBMQUNFJyxcbiAgICBVUERBVEU6ICdVUERBVEUnLFxuXG4gICAgU0VUX1BST1BTOiAnU0VUIFBST1BTJyxcbiAgICBSRU1PVkVfUFJPUFM6ICdSRU1PVkUgUFJPUFMnLFxuXG4gICAgQUREX0VWRU5UX0xJU1RFTkVSOiAnQUREIEVWRU5UIExJU1RFTkVSJyxcbiAgICBVUERBVEVfRVZFTlRfTElTVEVORVI6ICdVUERBVEUgRVZFTlQgTElTVEVORVInLFxuICAgIFJFTU9WRV9FVkVOVF9MSVNURU5FUjogJ1JFTU9WRSBFVkVOVCBMSVNURU5FUicsXG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IENoYW5nZWQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS90eXBlcy9jaGFuZ2UuanMiLCJcbmNvbnN0IEV2ZW50VHlwZSA9IFtcbiAgICAvLyBDbGlwYm9hcmQgRXZlbnRzXG4gICAgJ29uQ29weScsICdvbkN1dCcsICdvblBhc3RlJyxcbiAgICAvLyBDb21wb3NpdGlvbiBFdmVudHNcbiAgICAnb25Db21wb3NpdGlvbkVuZCcsICdvbkNvbXBvc2l0aW9uU3RhcnQnLCAnb25Db21wb3NpdGlvblVwZGF0ZScsXG4gICAgLy8gS2V5Ym9hcmQgRXZlbnRzXG4gICAgJ29uS2V5RG93bicsICdvbktleVByZXNzJywgJ29uS2V5VXAnLFxuICAgIC8vIEZvY3VzIEV2ZW50c1xuICAgICdvbkZvY3VzJywgJ29uQmx1cicsXG4gICAgLy8gRm9ybSBFdmVudHNcbiAgICAnb25DaGFuZ2UnLCAnb25JbnB1dCcsICdvbkludmFsaWQnLCAnb25TdWJtaXQnLFxuICAgIC8vIE1vdXNlIEV2ZW50c1xuICAgICdvbkNsaWNrJywgJ29uQ29udGV4dE1lbnUnLCAnb25Eb3VibGVDbGljaycsXG4gICAgJ29uRHJhZycsICdvbkRyYWdFbmQnLCAnb25EcmFnRW50ZXInLCAnb25EcmFnRXhpdCcsXG4gICAgJ29uRHJhZ0xlYXZlJywgJ29uRHJhZ092ZXInLCAnb25EcmFnU3RhcnQnLFxuICAgICdvbkRyb3AnLCAnb25Nb3VzZURvd24nLCAnb25Nb3VzZUVudGVyJyxcbiAgICAnb25Nb3VzZUxlYXZlJywgJ29uTW91c2VNb3ZlJywgJ29uTW91c2VPdXQnLFxuICAgICdvbk1vdXNlT3ZlcicgLCdvbk1vdXNlVXAnLFxuICAgIC8vIFNlbGVjdGlvbiBFdmVudHNcbiAgICAnb25TZWxlY3QnLFxuICAgIC8vIFRvdWNoIEV2ZW50c1xuICAgICdvblRvdWNoQ2FuY2VsJywgJ29uVG91Y2hFbmQnLCAnb25Ub3VjaE1vdmUnLCAnb25Ub3VjaFN0YXJ0JyxcbiAgICAvLyBVSSBFdmVudHNcbiAgICAnb25TY3JvbGwnLFxuICAgIC8vIFdoZWVsIEV2ZW50c1xuICAgICdvbldoZWVsJyxcbiAgICAvLyBNZWRpYSBFdmVudHNcbiAgICAnb25BYm9ydCcsICdvbkNhblBsYXknLCAnb25DYW5QbGF5VGhyb3VnaCcsXG4gICAgJ29uRHVyYXRpb25DaGFuZ2UnLCAnb25FbXB0aWVkJywgJ29uRW5jcnlwdGVkb25FbmRlZCcsXG4gICAgJ29uRXJyb3InLCAnb25Mb2FkZWREYXRhJywgJ29uTG9hZGVkTWV0YWRhdGEnLFxuICAgICdvbkxvYWRTdGFydCcsICdvblBhdXNlJywgJ29uUGxheW9uUGxheWluZycsXG4gICAgJ29uUHJvZ3Jlc3MnLCAnb25SYXRlQ2hhbmdlJywgJ29uU2Vla2VkJyxcbiAgICAnb25TZWVraW5nJywgJ29uU3RhbGxlZCcsICdvblN1c3BlbmRvblRpbWVVcGRhdGUnLFxuICAgICdvblZvbHVtZUNoYW5nZScsICdvbldhaXRpbmcnLFxuICAgIC8vIEltYWdlIEV2ZW50c1xuICAgICdvbkxvYWQnLCAnb25FcnJvcicsXG4gICAgLy8gQW5pbWF0aW9uIEV2ZW50c1xuICAgICdvbkFuaW1hdGlvblN0YXJ0JywgJ29uQW5pbWF0aW9uRW5kJywgJ29uQW5pbWF0aW9uSXRlcmF0aW9uJyxcbiAgICAvLyBUcmFuc2l0aW9uIEV2ZW50c1xuICAgICdvblRyYW5zaXRpb25FbmQnLFxuICAgIC8vIE90aGVyIEV2ZW50c1xuICAgICdvblRvZ2dsZSdcbl07XG5cblxuY29uc3QgRXZlbnRNYXAgPSBFdmVudFR5cGUucmVkdWNlKChldmVudHNNYXAsIGV2ZW50KSA9PiB7XG4gICAgZXZlbnRzTWFwW2V2ZW50XSA9IGV2ZW50XG4gICAgICAgIC5yZXBsYWNlKCdvbicsICcnKVxuICAgICAgICAucmVwbGFjZSgvW0EtWl0vZywgZSA9PiBlLnRvTG93ZXJDYXNlKCkpO1xuICAgIHJldHVybiBldmVudHNNYXA7XG59LCB7fSk7XG5cblxuZXhwb3J0IHtcbiAgICBFdmVudFR5cGUsXG4gICAgRXZlbnRNYXBcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3R5cGVzL2V2ZW50cy5qcyIsIlxuaW1wb3J0IHsgQ2hhbmdlVHlwZSwgRXZlbnRUeXBlIH0gZnJvbSAnLi4vdHlwZXMvaW5kZXgnO1xuXG5cblxuZnVuY3Rpb24gZGlmZihuZXdOb2RlLCBvbGROb2RlKSB7XG4gICAgLypcbiAgICByZXR1cm4gdHlwZSBQYXRjaCB7XG4gICAgICAgIHR5cGU6IENoYW5nZVR5cGVcbiAgICAgICAgbmV3Tm9kZT86IE5vZGVcbiAgICAgICAgY2hpbGRyZW4/OiBQYXRjaFtdXG4gICAgICAgIGF0dHJpYnV0ZXM/OiBQYXRjaFtdXG4gICAgfVxuICAgICAqL1xuICAgIGlmICghb2xkTm9kZSkgcmV0dXJuIHsgdHlwZTogQ2hhbmdlVHlwZS5DUkVBVEUsIG5ld05vZGUgfTtcbiAgICBlbHNlIGlmICghbmV3Tm9kZSkgcmV0dXJuIHsgdHlwZTogQ2hhbmdlVHlwZS5SRU1PVkUgfTtcbiAgICBlbHNlIGlmIChpc0NoYW5nZWQobmV3Tm9kZSwgb2xkTm9kZSkpIHJldHVybiB7IHR5cGU6IENoYW5nZVR5cGUuUkVQTEFDRSwgbmV3Tm9kZSB9O1xuICAgIGVsc2UgaWYgKG5ld05vZGUuZWxlbWVudE5hbWUpXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlLlVQREFURSxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBkaWZmQ2hpbGRyZW4obmV3Tm9kZSwgb2xkTm9kZSksXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBkaWZmQXR0cmlidXRlcyhuZXdOb2RlLCBvbGROb2RlKSxcbiAgICAgICAgICAgIGV2ZW50czogZGlmZkV2ZW50cyhuZXdOb2RlLCBvbGROb2RlKVxuICAgICAgICB9O1xufVxuXG5mdW5jdGlvbiBpc0NoYW5nZWQobmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIHJldHVybiB0eXBlb2YgbmV3Tm9kZSAhPT0gdHlwZW9mIG9sZE5vZGUgfHxcbiAgICAgICAgdHlwZW9mIG5ld05vZGUgIT09IFwib2JqZWN0XCIgJiYgbmV3Tm9kZSAhPT0gb2xkTm9kZSB8fFxuICAgICAgICB0eXBlb2YgbmV3Tm9kZSA9PT0gXCJvYmplY3RcIiAmJiBuZXdOb2RlLmVsZW1lbnROYW1lICE9PSBvbGROb2RlLmVsZW1lbnROYW1lXG59XG5cblxuZnVuY3Rpb24gZGlmZkV2ZW50cyhuZXdOb2RlLCBvbGROb2RlKSB7XG4gICAgY29uc3QgcGF0Y2hlcyAgPSBbXTtcbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gey4uLm9sZE5vZGUuYXR0cmlidXRlcywgLi4ubmV3Tm9kZS5hdHRyaWJ1dGVzfTtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKVxuICAgICAgICAuZmlsdGVyKGF0dHJOYW1lID0+IEV2ZW50VHlwZS5pbmNsdWRlcyhhdHRyTmFtZSkpXG4gICAgICAgIC5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXdIYW5kbGVyID0gbmV3Tm9kZS5hdHRyaWJ1dGVzW2V2ZW50TmFtZV07XG4gICAgICAgICAgICBjb25zdCBvbGRIYW5kbGVyID0gb2xkTm9kZS5hdHRyaWJ1dGVzW2V2ZW50TmFtZV07XG4gICAgICAgICAgICBpZiAoIW5ld0hhbmRsZXIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhdGNoZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IENoYW5nZVR5cGUuUkVNT1ZFX0VWRU5UX0xJU1RFTkVSLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogb2xkSGFuZGxlciwgZXZlbnROYW1lXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlbHNlIGlmICghb2xkSGFuZGxlcilcbiAgICAgICAgICAgICAgICBwYXRjaGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlLkFERF9FVkVOVF9MSVNURU5FUixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG5ld0hhbmRsZXIsIGV2ZW50TmFtZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZWxzZSBwYXRjaGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlLlVQREFURV9FVkVOVF9MSVNURU5FUixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG5ld0hhbmRsZXIsIG9sZFZhbHVlOiBvbGRIYW5kbGVyLCBldmVudE5hbWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgcmV0dXJuIHBhdGNoZXM7XG59XG5cbmZ1bmN0aW9uIGRpZmZBdHRyaWJ1dGVzKG5ld05vZGUsIG9sZE5vZGUpIHtcbiAgICBjb25zdCBwYXRjaGVzICA9IFtdO1xuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSB7Li4ub2xkTm9kZS5hdHRyaWJ1dGVzLCAuLi5uZXdOb2RlLmF0dHJpYnV0ZXN9O1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpXG4gICAgICAgIC5maWx0ZXIoYXR0ck5hbWUgPT4gIUV2ZW50VHlwZS5pbmNsdWRlcyhhdHRyTmFtZSkpXG4gICAgICAgIC5mb3JFYWNoKGF0dHJOYW1lID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0F0dHIgPSBuZXdOb2RlLmF0dHJpYnV0ZXNbYXR0ck5hbWVdO1xuICAgICAgICAgICAgY29uc3Qgb2xkQXR0ciA9IG9sZE5vZGUuYXR0cmlidXRlc1thdHRyTmFtZV07XG4gICAgICAgICAgICAhbmV3QXR0ciAmJiBwYXRjaGVzLnB1c2goe1xuICAgICAgICAgICAgICAgIHR5cGU6IENoYW5nZVR5cGUuUkVNT1ZFX1BST1BTLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBvbGRBdHRyLCBhdHRyTmFtZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAoIW9sZEF0dHIgfHwgb2xkQXR0ciAhPT0gbmV3QXR0cikgJiYgcGF0Y2hlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlLlNFVF9QUk9QUyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogbmV3QXR0ciwgYXR0ck5hbWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICByZXR1cm4gcGF0Y2hlcztcbn1cblxuXG5mdW5jdGlvbiBkaWZmQ2hpbGRyZW4obmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIGNvbnN0IG5ld0NoaWxkID0gbmV3Tm9kZS5jaGlsZHJlbiB8fCBbXTtcbiAgICBjb25zdCBvbGRDaGlsZCA9IG9sZE5vZGUuY2hpbGRyZW4gfHwgW107XG4gICAgcmV0dXJuIFsuLi5BcnJheShNYXRoLm1heChcbiAgICAgICAgbmV3Q2hpbGQubGVuZ3RoLCBvbGRDaGlsZC5sZW5ndGhcbiAgICApKS5rZXlzKCldLm1hcChpID0+IGRpZmYobmV3Q2hpbGRbaV0sIG9sZENoaWxkW2ldKSk7XG59XG5cblxuZXhwb3J0IHtcbiAgICBkaWZmXG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL2RpZmYvaW5kZXguanMiLCJcbmltcG9ydCB7IENoYW5nZVR5cGUgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSAnLi4vY3JlYXRlL2luZGV4JztcbmltcG9ydCB7IHNldEF0dHJpYnV0ZSwgcmVtb3ZlQXR0cmlidXRlIH0gZnJvbSBcIi4uL3V0aWxzL2luZGV4XCI7XG5cblxuXG5mdW5jdGlvbiBwYXRjaChwYXJlbnQsIHBhdGNoZXMsIGluZGV4PTApIHtcbiAgICBpZiAoIXBhdGNoZXMpIHJldHVybjtcbiAgICBjb25zdCBlbCA9IHBhcmVudC5jaGlsZE5vZGVzW2luZGV4XTtcbiAgICBzd2l0Y2ggKHBhdGNoZXMudHlwZSkge1xuICAgICAgICBjYXNlIENoYW5nZVR5cGUuQ1JFQVRFOiB7XG4gICAgICAgICAgICBjb25zdCB7IG5ld05vZGUgfSA9IHBhdGNoZXM7XG4gICAgICAgICAgICBjb25zdCBuZXdFbCA9IGNyZWF0ZUVsZW1lbnQobmV3Tm9kZSk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IHBhcmVudC5jaGlsZE5vZGVzLmxlbmd0aClcbiAgICAgICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQobmV3RWwpO1xuICAgICAgICAgICAgZWxzZSBwYXJlbnQuaW5zZXJ0QmVmb3JlKG5ld0VsLCBlbCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENoYW5nZVR5cGUuUkVNT1ZFOiB7XG4gICAgICAgICAgICBpZiAoIWVsKSByZXR1cm47XG4gICAgICAgICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBDaGFuZ2VUeXBlLlJFUExBQ0U6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgbmV3Tm9kZSB9ID0gcGF0Y2hlcztcbiAgICAgICAgICAgIGNvbnN0IG5ld0VsID0gY3JlYXRlRWxlbWVudChuZXdOb2RlKTtcbiAgICAgICAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQobmV3RWwsIGVsKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQ2hhbmdlVHlwZS5VUERBVEU6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgY2hpbGRyZW4sIGF0dHJpYnV0ZXMsIGV2ZW50cyB9ID0gcGF0Y2hlcztcbiAgICAgICAgICAgIHBhdGNoQXR0cmlidXRlcyhlbCwgYXR0cmlidXRlcyk7XG4gICAgICAgICAgICBwYXRjaEV2ZW50cyhlbCwgZXZlbnRzKTtcbiAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goKGNoaWxkLCBpbmRleCkgPT4gcGF0Y2goZWwsIGNoaWxkLCBpbmRleCkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBhdGNoRXZlbnRzKGVsLCBldmVudHMpIHtcbiAgICBldmVudHMuZm9yRWFjaChwYXRjaCA9PiB7XG4gICAgICAgIGNvbnN0IHsgdHlwZSwgdmFsdWUsIG9sZFZhbHVlLCBldmVudE5hbWUgfSA9IHBhdGNoO1xuICAgICAgICBpZiAodHlwZSA9PT0gQ2hhbmdlVHlwZS5BRERfRVZFTlRfTElTVEVORVIpXG4gICAgICAgICAgICByZXR1cm4gZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIHZhbHVlKTtcbiAgICAgICAgaWYgKHR5cGUgPT09IENoYW5nZVR5cGUuUkVNT1ZFX0VWRU5UX0xJU1RFTkVSKVxuICAgICAgICAgICAgcmV0dXJuIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBvbGRWYWx1ZSk7XG4gICAgICAgIGlmICh0eXBlID09PSBDaGFuZ2VUeXBlLlVQREFURV9FVkVOVF9MSVNURU5FUikge1xuICAgICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIG9sZFZhbHVlKTtcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5mdW5jdGlvbiBwYXRjaEF0dHJpYnV0ZXMoZWxlbWVudCwgYXR0cmlidXRlcykge1xuICAgIGF0dHJpYnV0ZXMuZm9yRWFjaChwYXRjaCA9PiB7XG4gICAgICAgIGNvbnN0IHsgdHlwZSwgYXR0ck5hbWUsIHZhbHVlIH0gPSBwYXRjaDtcbiAgICAgICAgaWYgKHR5cGUgPT09IENoYW5nZVR5cGUuU0VUX1BST1BTKVxuICAgICAgICAgICAgc2V0QXR0cmlidXRlKGVsZW1lbnQsIGF0dHJOYW1lLCB2YWx1ZSk7XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT09IENoYW5nZVR5cGUuUkVNT1ZFX1BST1BTKVxuICAgICAgICAgICAgcmVtb3ZlQXR0cmlidXRlKGVsZW1lbnQsIGF0dHJOYW1lLCB2YWx1ZSlcbiAgICB9KVxufVxuXG5cbmV4cG9ydCB7XG4gICAgcGF0Y2hcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3BhdGNoL2luZGV4LmpzIiwiXG5pbXBvcnQgT2JzZXJ2ZXIgZnJvbSAnLi9vYmplY3QnO1xuaW1wb3J0IE9ic2VydmVyQXJyYXkgZnJvbSAnLi9hcnJheSc7XG5pbXBvcnQgeyB3YWxrLCBvYnNlcnZlciB9IGZyb20gJy4vdXRpbHMnO1xuXG5cbmV4cG9ydCB7XG4gICAgT2JzZXJ2ZXIsXG4gICAgT2JzZXJ2ZXJBcnJheSxcbiAgICB3YWxrLCBvYnNlcnZlclxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9vYnNlcnZlci9pbmRleC5qcyIsIlxuaW1wb3J0IHsgd2Fsaywgb2JzZXJ2ZXIgfSBmcm9tICcuLi91dGlscy9pbmRleCdcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9ic2VydmVyIHtcbiAgICBjb25zdHJ1Y3RvcihvYmosIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFjaykge1xuICAgICAgICBpZiAodHlwZW9mIG9iaiAhPT0gXCJvYmplY3RcIilcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1R5cGUgXCJPYmplY3RcIiByZXF1aXJlZCEnKTtcbiAgICAgICAgd2FsayhvYmosIChrZXksIHZhbHVlKSA9PiBvYnNlcnZlcihcbiAgICAgICAgICAgIHRoaXMsIGtleSwgdmFsdWUsXG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjayxcbiAgICAgICAgICAgIGdldHRlckNhbGxiYWNrXG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIHN0YXRpYyBmcm9tID0gKG9iaiwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2ZXIoXG4gICAgICAgICAgICBvYmosXG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjayxcbiAgICAgICAgICAgIGdldHRlckNhbGxiYWNrXG4gICAgICAgIClcbiAgICB9O1xuXG4gICAgc3RhdGljIHRvU3RyaW5nID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gYE9ic2VydmVyICR7dGhpc31gXG4gICAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvb2JzZXJ2ZXIvb2JqZWN0L2luZGV4LmpzIiwiXG5pbXBvcnQgT2JzZXJ2ZXIgZnJvbSAnLi4vb2JqZWN0JztcbmltcG9ydCBPYnNlcnZlckFycmF5IGZyb20gJy4uL2FycmF5JztcblxuXG5jb25zdCBub29wID0gKCkgPT4ge307XG5cblxuXG5mdW5jdGlvbiB3YWxrKG9iaiwgZnVuKSB7XG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBGdW5jdGlvbiBcIndhbGtcIiByZXF1aXJlIGFuIFwib2JqZWN0XCIgaW5zdGVhZCBvZiAke3R5cGVvZiBvYmp9YCk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSlcbiAgICAgICAgcmV0dXJuIG9iai5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4gZnVuKGluZGV4LCBpdGVtLCBvYmopKTtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IGZ1bihrZXksIG9ialtrZXldLCBvYmopKTtcbn1cblxuZnVuY3Rpb24gb2JzZXJ2ZXIob2JqLCBrZXksIHZhbHVlLCBzZXR0ZXJDYWxsYmFjaz1ub29wLCBnZXR0ZXJDYWxsYmFjaz1ub29wKSB7XG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBGdW5jdGlvbiBcIm9ic2VydmVyXCIgcmVxdWlyZSBhbiBcIm9iamVjdFwiIGluc3RlYWQgb2YgJHt0eXBlb2Ygb2JqfWApO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKVxuICAgICAgICB2YWx1ZSA9IE9ic2VydmVyQXJyYXkuZnJvbSh2YWx1ZSwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKTtcbiAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXG4gICAgICAgIHZhbHVlID0gT2JzZXJ2ZXIuZnJvbSh2YWx1ZSwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGdldDogKCkgPT4ge1xuICAgICAgICAgICAgZ2V0dGVyQ2FsbGJhY2sob2JqLCBrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICB9LFxuICAgICAgICBzZXQ6IG5ld1ZhbHVlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9sZFZhbHVlID0gb2JqW2tleV07XG4gICAgICAgICAgICBvYnNlcnZlcihvYmosIGtleSwgbmV3VmFsdWUsIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFjayk7XG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjayhvYmosIGtleSwgbmV3VmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0pXG59XG5cblxuY29uc3QgZ2V0VW5pcXVlSUQgPSBmdW5jdGlvbigpIHtcbiAgICBsZXQgaWQgPSAwO1xuICAgIHJldHVybiAoKCkgPT4gaWQgKyspO1xufSgpO1xuXG5cbmV4cG9ydCB7XG4gICAgd2FsayxcbiAgICBvYnNlcnZlcixcbiAgICBnZXRVbmlxdWVJRFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9vYnNlcnZlci91dGlscy9pbmRleC5qcyIsIlxuaW1wb3J0IHsgd2Fsaywgb2JzZXJ2ZXIgfSBmcm9tICcuLi91dGlscy9pbmRleCc7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPYnNlcnZlckFycmF5IHtcbiAgICBjb25zdHJ1Y3RvcihhcnJheSwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKSB7XG4gICAgICAgICFhcnJheSAmJiAoYXJyYXkgPSBbXSk7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShhcnJheSkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUeXBlIFwiQXJyYXlcIiByZXF1aXJlZCEnKTtcbiAgICAgICAgd2FsayhhcnJheSwgKGluZGV4LCBpdGVtKSA9PiBvYnNlcnZlcihcbiAgICAgICAgICAgIHRoaXMsIGluZGV4LCBpdGVtLFxuICAgICAgICAgICAgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrXG4gICAgICAgICkpO1xuICAgICAgICB0aGlzLmxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBmcm9tID0gKGFycmF5LCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZlckFycmF5KFxuICAgICAgICAgICAgYXJyYXksXG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjayxcbiAgICAgICAgICAgIGdldHRlckNhbGxiYWNrXG4gICAgICAgIClcbiAgICB9O1xuICAgIHN0YXRpYyBpc09ic2VydmVyQXJyYXkgID0gYXJyYXkgPT4ge1xuICAgICAgICByZXR1cm4gYXJyYXkuX19wcm90b19fLmNvbnN0cnVjdG9yID09PSBPYnNlcnZlckFycmF5O1xuICAgIH07XG4gICAgc3RhdGljIG9mID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZlckFycmF5KFsuLi5hcmdzXSlcbiAgICB9O1xuXG5cbiAgICBjb25jYXQgPSAoLi4uYXJyYXlzKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0FycmF5ID0gbmV3IE9ic2VydmVyQXJyYXkoKTtcbiAgICAgICAgW3RoaXMsIC4uLmFycmF5c10uZm9yRWFjaChcbiAgICAgICAgICAgIGFycmF5ID0+IGFycmF5LmZvckVhY2gobmV3QXJyYXkucHVzaClcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIG5ld0FycmF5O1xuICAgIH07XG4gICAgY29weVdpdGhpbiA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgIC8vIFRPRE9cbiAgICAgICAgcmV0dXJuIE9ic2VydmVyQXJyYXkuZnJvbShcbiAgICAgICAgICAgIEFycmF5LmZyb20odGhpcykuY29weVdpdGhpbiguLi5hcmdzKVxuICAgICAgICApXG4gICAgfTtcbiAgICBlbnRyaWVzID0gZnVuY3Rpb24gKigpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgd2hpbGUgKHRoaXNbaW5kZXhdKVxuICAgICAgICAgICAgeWllbGQgW2luZGV4KyssIHRoaXNbaW5kZXhdXTtcbiAgICB9O1xuICAgIGV2ZXJ5ID0gKCkgPT4ge307XG4gICAgZmlsbCA9ICgpID0+IHt9O1xuICAgIGZpbHRlciA9ICgpID0+IHt9O1xuICAgIGZpbmQgPSAoKSA9PiB7fTtcbiAgICBmaW5kSW5kZXggPSAoKSA9PiB7fTtcbiAgICBmb3JFYWNoID0gKCkgPT4ge307XG4gICAgaW5jbHVkZXMgPSAoKSA9PiB7fTtcbiAgICBpbmRleE9mID0gKCkgPT4ge307XG4gICAgam9pbiA9ICgpID0+IHt9O1xuICAgIGtleXMgPSAoKSA9PiB7fTtcbiAgICBsYXN0SW5kZXhPZiA9ICgpID0+IHt9O1xuICAgIG1hcCA9ICgpID0+IHt9O1xuICAgIHBvcCA9ICgpID0+IHt9O1xuICAgIHB1c2ggPSB2YWx1ZSA9PiB7XG4gICAgICAgIG9ic2VydmVyKFxuICAgICAgICAgICAgdGhpcywgdGhpcy5sZW5ndGgsIHZhbHVlLFxuICAgICAgICAgICAgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMubGVuZ3RoICsrO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICByZWR1Y2UgPSAoKSA9PiB7fTtcbiAgICByZWR1Y2VSaWdodCA9ICgpID0+IHt9O1xuICAgIHJldmVyc2UgPSAoKSA9PiB7fTtcbiAgICBzaGlmdCA9ICgpID0+IHt9O1xuICAgIHNsaWNlID0gKCkgPT4ge307XG4gICAgc29tZSA9ICgpID0+IHt9O1xuICAgIHNvcnQgPSAoKSA9PiB7fTtcbiAgICBzcGxpY2UgPSAoKSA9PiB7fTtcbiAgICB0b0xvY2FsZVN0cmluZyA9ICgpID0+IHt9O1xuICAgIHRvU291cmNlID0gKCkgPT4ge307XG4gICAgdG9TdHJpbmcgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBgT2JzZXJ2ZXJBcnJheSBbLi4uXWBcbiAgICB9O1xuICAgIHVuc2hpZnQgPSAoKSA9PiB7fTtcbiAgICB2YWx1ZXMgPSAoKSA9PiB7fTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvb2JzZXJ2ZXIvYXJyYXkvaW5kZXguanMiLCJcbmZ1bmN0aW9uIGZsYXR0ZW5Ob2RlKG5vZGUpIHtcbiAgICBpZiAoIW5vZGUpIHJldHVybjtcbiAgICBpZiAobm9kZS5jaGlsZHJlbilcbiAgICAgICAgbm9kZS5jaGlsZHJlbiA9IGZsYXR0ZW5DaGlsZHJlbihub2RlLmNoaWxkcmVuKTtcbiAgICByZXR1cm4gbm9kZVxufVxuXG5mdW5jdGlvbiBmbGF0dGVuQ2hpbGRyZW4oY2hpbGRyZW4pIHtcbiAgICByZXR1cm4gW10uY29uY2F0KC4uLmNoaWxkcmVuKVxuICAgICAgICAubWFwKG5vZGUgPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBub2RlID09PSAnb2JqZWN0JylcbiAgICAgICAgICAgICAgICByZXR1cm4gZmxhdHRlbk5vZGUobm9kZSk7XG4gICAgICAgICAgICBlbHNlIHJldHVybiBub2RlO1xuICAgICAgICB9KVxuICAgICAgICAuZmlsdGVyKG5vZGUgPT4gISFub2RlKTtcbn1cblxuXG5leHBvcnQge1xuICAgIGZsYXR0ZW5Ob2RlXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL3V0aWxzL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==