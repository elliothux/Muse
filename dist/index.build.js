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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2JhNTlkMDM1NTMyYzU2N2QyNDgiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9jcmVhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdHlwZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdHlwZXMvY2hhbmdlLmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3R5cGVzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9kaWZmL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3BhdGNoL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvb2JzZXJ2ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci9vYmplY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci91dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL29ic2VydmVyL2FycmF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvdXRpbHMvaW5kZXguanMiXSwibmFtZXMiOlsiTXVzZSIsIkNvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwiZW50cnkiLCJub2RlIiwic3RhdGUiLCJjb21wdXRlZCIsImNvbXBvbmVudFdpbGxNb3VudCIsImNvbXBvbmVudERpZE1vdW50IiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsInNob3VsZENvbXBvbmVudFVwZGF0ZSIsImNvbXBvbmVudFdpbGxVcGRhdGUiLCJjb21wb25lbnREaWRVcGRhdGUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImNvbXBvbmVudERpZENhdGNoIiwiaW5pdE9ic2VydmVyIiwiZnJvbSIsInNldHRlckNhbGxiYWNrIiwiaW5pdENvbXB1dGVkIiwibmFtZSIsImdldHRlciIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsImdldCIsIm9iaiIsImtleSIsInZhbHVlIiwib2xkVmFsdWUiLCJFcnJvciIsImRpZmZBbmRQYXRjaCIsImJlZm9yZVJlbmRlciIsInJlbmRlciIsInJlbmRlclRvIiwiYXBwZW5kQ2hpbGQiLCJvbGROb2RlIiwicGF0Y2hlcyIsImNvbnNvbGUiLCJsb2ciLCJjcmVhdGVFbGVtZW50IiwiZGlmZiIsInBhdGNoIiwidXRpbHMiLCJlbCIsImRvY3VtZW50IiwiZWxlbWVudE5hbWUiLCJjaGlsZHJlbiIsImFwcGVuZENoaWxkcmVuIiwiYXR0cmlidXRlcyIsImNyZWF0ZVRleHROb2RlIiwidGFyZ2V0IiwibWFwIiwiZm9yRWFjaCIsInNldEF0dHJpYnV0ZXMiLCJrZXlzIiwiZmlsdGVyIiwiaGFzT3duUHJvcGVydHkiLCJhdHRyTmFtZSIsInNldEF0dHJpYnV0ZSIsImF0dHJWYWx1ZSIsImluY2x1ZGVzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUF0dHJpYnV0ZSIsIm9sZEF0dHJWYWx1ZSIsImluc2VydEFmdGVyIiwibmV3RWwiLCJ0YXJnZXRFbCIsInBhcmVudEVsIiwicGFyZW50Tm9kZSIsImxhc3RDaGlsZCIsImluc2VydEJlZm9yZSIsIm5leHRTaWJsaW5nIiwiQ2hhbmdlVHlwZSIsIkV2ZW50VHlwZSIsIkV2ZW50TWFwIiwiQ2hhbmdlZCIsIkNSRUFURSIsIlJFTU9WRSIsIlJFUExBQ0UiLCJVUERBVEUiLCJTRVRfUFJPUFMiLCJSRU1PVkVfUFJPUFMiLCJBRERfRVZFTlRfTElTVEVORVIiLCJVUERBVEVfRVZFTlRfTElTVEVORVIiLCJSRU1PVkVfRVZFTlRfTElTVEVORVIiLCJyZWR1Y2UiLCJldmVudHNNYXAiLCJldmVudCIsInJlcGxhY2UiLCJlIiwidG9Mb3dlckNhc2UiLCJuZXdOb2RlIiwidHlwZSIsImlzQ2hhbmdlZCIsImRpZmZDaGlsZHJlbiIsImRpZmZBdHRyaWJ1dGVzIiwibmV3QXR0ciIsIm9sZEF0dHIiLCJwdXNoIiwibmV3Q2hpbGQiLCJvbGRDaGlsZCIsIkFycmF5IiwiTWF0aCIsIm1heCIsImxlbmd0aCIsImkiLCJwYXJlbnQiLCJpbmRleCIsImNoaWxkTm9kZXMiLCJyZW1vdmVDaGlsZCIsInJlcGxhY2VDaGlsZCIsInBhdGNoQXR0cmlidXRlcyIsImNoaWxkIiwiZWxlbWVudCIsImV2ZW50TmFtZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJPYnNlcnZlciIsIk9ic2VydmVyQXJyYXkiLCJ3YWxrIiwib2JzZXJ2ZXIiLCJnZXR0ZXJDYWxsYmFjayIsIlR5cGVFcnJvciIsInRvU3RyaW5nIiwibm9vcCIsImZ1biIsImlzQXJyYXkiLCJpdGVtIiwic2V0IiwibmV3VmFsdWUiLCJnZXRVbmlxdWVJRCIsImlkIiwiYXJyYXkiLCJpc09ic2VydmVyQXJyYXkiLCJfX3Byb3RvX18iLCJvZiIsImFyZ3MiLCJjb25jYXQiLCJhcnJheXMiLCJuZXdBcnJheSIsImNvcHlXaXRoaW4iLCJlbnRyaWVzIiwiZXZlcnkiLCJmaWxsIiwiZmluZCIsImZpbmRJbmRleCIsImluZGV4T2YiLCJqb2luIiwibGFzdEluZGV4T2YiLCJwb3AiLCJyZWR1Y2VSaWdodCIsInJldmVyc2UiLCJzaGlmdCIsInNsaWNlIiwic29tZSIsInNvcnQiLCJzcGxpY2UiLCJ0b0xvY2FsZVN0cmluZyIsInRvU291cmNlIiwidW5zaGlmdCIsInZhbHVlcyIsImZsYXR0ZW5Ob2RlIiwiZmxhdHRlbkNoaWxkcmVuIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNB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QUNmQyxNLEdBQVMsTUFBTSxDQUFFLEM7O1NBQ2pCQyxjLEdBQWlCLE1BQU0sQ0FBRSxDOztTQUN6QkMsUSxHQUFXLE1BQU0sQ0FBRSxDOztTQUNuQm5DLFEsR0FBVyxNQUFNO0FBQ2IsZUFBUSxxQkFBUjtBQUNILEs7O1NBQ0RvQyxPLEdBQVUsTUFBTSxDQUFFLEM7O1NBQ2xCQyxNLEdBQVMsTUFBTSxDQUFFLEM7O2tCQWpGQTFDLGE7Ozs7Ozs7Ozs7Ozs7QUNKckIsU0FBUzJDLFdBQVQsQ0FBcUI3SixJQUFyQixFQUEyQjtBQUN2QixRQUFJLENBQUNBLElBQUwsRUFBVztBQUNYLFFBQUlBLEtBQUsyQyxRQUFULEVBQ0kzQyxLQUFLMkMsUUFBTCxHQUFnQm1ILGdCQUFnQjlKLEtBQUsyQyxRQUFyQixDQUFoQjtBQUNKLFdBQU8zQyxJQUFQO0FBQ0g7O0FBRUQsU0FBUzhKLGVBQVQsQ0FBeUJuSCxRQUF6QixFQUFtQztBQUMvQixXQUFPLEdBQUcwRixNQUFILENBQVUsR0FBRzFGLFFBQWIsRUFDRkssR0FERSxDQUNFaEQsUUFBUTtBQUNULFlBQUksT0FBT0EsSUFBUCxLQUFnQixRQUFwQixFQUNJLE9BQU82SixZQUFZN0osSUFBWixDQUFQLENBREosS0FFSyxPQUFPQSxJQUFQO0FBQ1IsS0FMRSxFQU1Gb0QsTUFORSxDQU1LcEQsUUFBUSxDQUFDLENBQUNBLElBTmYsQ0FBUDtBQU9IOztRQUlHNkosVyxHQUFBQSxXIiwiZmlsZSI6ImluZGV4LmJ1aWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Fzc2V0cy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3YmE1OWQwMzU1MzJjNTY3ZDI0OCIsIlxuaW1wb3J0IE11c2UgZnJvbSAnLi9jb3JlJztcblxuXG5cbmV4cG9ydCB7XG4gICAgTXVzZVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vaW5kZXguanMiLCJcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIGRpZmYsIHBhdGNoIH0gZnJvbSAnLi9kb20nO1xuaW1wb3J0IHsgT2JzZXJ2ZXIsIG9ic2VydmVyLCB3YWxrIH0gZnJvbSAnLi9vYnNlcnZlcic7XG5pbXBvcnQgeyBmbGF0dGVuTm9kZSB9IGZyb20gJy4vdXRpbHMnXG5cblxuXG5jbGFzcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge31cblxuICAgIGVudHJ5ID0gbnVsbDtcbiAgICBub2RlID0gbnVsbDtcbiAgICBzdGF0ZSA9IHt9O1xuICAgIGNvbXB1dGVkID0ge307XG5cbiAgICAvLyBUT0RPOiBMaWZlQ3ljbGVcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7fTtcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHt9O1xuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKSB7fTtcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUoKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfTtcbiAgICBjb21wb25lbnRXaWxsVXBkYXRlKCkge307XG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge307XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7fTtcbiAgICBjb21wb25lbnREaWRDYXRjaCgpIHt9O1xuXG4gICAgLy8gT2JzZXJ2ZXJcbiAgICBpbml0T2JzZXJ2ZXIoKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBPYnNlcnZlci5mcm9tKFxuICAgICAgICAgICAgdGhpcy5zdGF0ZSB8fCB7fSxcbiAgICAgICAgICAgIDo6dGhpcy5zZXR0ZXJDYWxsYmFja1xuICAgICAgICApO1xuICAgIH07XG4gICAgaW5pdENvbXB1dGVkKCkge1xuICAgICAgICB3YWxrKFxuICAgICAgICAgICAgdGhpcy5jb21wdXRlZCxcbiAgICAgICAgICAgIChuYW1lLCBnZXR0ZXIsIGNvbXB1dGVkKSA9PiB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbXB1dGVkLCBuYW1lLCB7XG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGdldDogdGhpczo6Z2V0dGVyXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH1cbiAgICBzZXR0ZXJDYWxsYmFjayhvYmosIGtleSwgdmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmIChvYmogIT09IHRoaXMuc3RhdGUpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JPT00hISEnKTtcbiAgICAgICAgdGhpcy5kaWZmQW5kUGF0Y2goKTtcbiAgICB9O1xuXG4gICAgLy8gUmVuZGVyXG4gICAgYmVmb3JlUmVuZGVyKCkge1xuICAgICAgICB0aGlzLmluaXRPYnNlcnZlcigpO1xuICAgICAgICB0aGlzLmluaXRDb21wdXRlZCgpO1xuICAgIH07XG4gICAgcmVuZGVyKCkge307XG4gICAgcmVuZGVyVG8oZW50cnkpIHtcbiAgICAgICAgdGhpcy5iZWZvcmVSZW5kZXIoKTtcbiAgICAgICAgdGhpcy5ub2RlID0gZmxhdHRlbk5vZGUodGhpcy5yZW5kZXIoKSk7XG4gICAgICAgIHRoaXMuZW50cnkgPSBlbnRyeTtcbiAgICAgICAgdGhpcy5lbnRyeS5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KHRoaXMubm9kZSkpXG4gICAgfTtcbiAgICBkaWZmQW5kUGF0Y2goKSB7XG4gICAgICAgIGNvbnN0IG9sZE5vZGUgPSB0aGlzLm5vZGU7XG4gICAgICAgIHRoaXMubm9kZSA9IGZsYXR0ZW5Ob2RlKHRoaXMucmVuZGVyKCkpO1xuICAgICAgICBjb25zdCBwYXRjaGVzID0gZGlmZih0aGlzLm5vZGUsIG9sZE5vZGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhvbGROb2RlKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5ub2RlKTtcbiAgICAgICAgY29uc29sZS5sb2cocGF0Y2hlcyk7XG4gICAgICAgIHBhdGNoKHRoaXMuZW50cnksIHBhdGNoZXMpO1xuICAgIH07XG59XG5cblxuXG5leHBvcnQgZGVmYXVsdCBDb21wb25lbnQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2luZGV4LmpzIiwiXG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSAnLi9jcmVhdGUnO1xuaW1wb3J0IHsgZGlmZiB9IGZyb20gJy4vZGlmZic7XG5pbXBvcnQgeyBwYXRjaCB9IGZyb20gJy4vcGF0Y2gnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMnO1xuXG5cbmV4cG9ydCB7XG4gICAgY3JlYXRlRWxlbWVudCxcbiAgICBkaWZmLFxuICAgIHBhdGNoLFxuICAgIHV0aWxzXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS9pbmRleC5qcyIsIlxuaW1wb3J0IHsgc2V0QXR0cmlidXRlcyB9IGZyb20gJy4uL3V0aWxzJztcblxuXG5cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQobm9kZSkge1xuICAgIC8qXG4gICAgbm9kZTogU3RyaW5nIHx8IHtcbiAgICAgICAgZWxlbWVudE5hbWU6IFN0cmluZ1xuICAgICAgICBjaGlsZHJlbjogbm9kZVtdXG4gICAgICAgIGF0dHJpYnV0ZXM6IE9iamVjdFxuICAgIH1cbiAgICAqL1xuICAgIGlmICh0eXBlb2Ygbm9kZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5vZGUuZWxlbWVudE5hbWUpO1xuICAgICAgICBub2RlLmNoaWxkcmVuICYmIGFwcGVuZENoaWxkcmVuKGVsLCBub2RlLmNoaWxkcmVuKTtcbiAgICAgICAgc2V0QXR0cmlidXRlcyhlbCwgbm9kZS5hdHRyaWJ1dGVzKTtcbiAgICAgICAgcmV0dXJuIGVsO1xuICAgIH1cbiAgICBlbHNlIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShub2RlKTtcbn1cblxuXG5mdW5jdGlvbiBhcHBlbmRDaGlsZHJlbih0YXJnZXQsIGNoaWxkcmVuKSB7XG4gICAgY2hpbGRyZW4ubWFwKGNyZWF0ZUVsZW1lbnQpXG4gICAgICAgIC5mb3JFYWNoKDo6dGFyZ2V0LmFwcGVuZENoaWxkKVxufVxuXG5cblxuZXhwb3J0IHtcbiAgICBjcmVhdGVFbGVtZW50XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS9jcmVhdGUvaW5kZXguanMiLCJcbmltcG9ydCB7IEV2ZW50VHlwZSwgRXZlbnRNYXAgfSBmcm9tICcuLi90eXBlcyc7XG5cblxuXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzKHRhcmdldCwgYXR0cmlidXRlcz17fSkge1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpXG4gICAgICAgIC5maWx0ZXIoa2V5ID0+IGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoa2V5KSlcbiAgICAgICAgLmZvckVhY2goYXR0ck5hbWUgPT4gc2V0QXR0cmlidXRlKHRhcmdldCwgYXR0ck5hbWUsIGF0dHJpYnV0ZXNbYXR0ck5hbWVdKSk7XG59XG5cblxuZnVuY3Rpb24gc2V0QXR0cmlidXRlKHRhcmdldCwgYXR0ck5hbWUsIGF0dHJWYWx1ZSkge1xuICAgIGF0dHJOYW1lID09PSAnY2xhc3NOYW1lJyAmJiAoYXR0ck5hbWUgPSAnY2xhc3MnKTtcbiAgICBpZiAoRXZlbnRUeXBlLmluY2x1ZGVzKGF0dHJOYW1lKSlcbiAgICAgICAgcmV0dXJuIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgRXZlbnRNYXBbYXR0ck5hbWVdLFxuICAgICAgICAgICAgYXR0clZhbHVlXG4gICAgICAgICk7XG4gICAgdGFyZ2V0LnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKTtcbn1cblxuXG5mdW5jdGlvbiByZW1vdmVBdHRyaWJ1dGUodGFyZ2V0LCBhdHRyTmFtZSwgb2xkQXR0clZhbHVlKSB7XG4gICAgYXR0ck5hbWUgPT09ICdjbGFzc05hbWUnICYmIChhdHRyTmFtZSA9ICdjbGFzcycpO1xuICAgIGlmIChFdmVudFR5cGUuaW5jbHVkZXMoYXR0ck5hbWUpKVxuICAgICAgICByZXR1cm4gdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICBFdmVudE1hcFthdHRyTmFtZV0sXG4gICAgICAgICAgICBvbGRBdHRyVmFsdWVcbiAgICAgICAgKTtcbiAgICB0YXJnZXQucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcbn1cblxuXG5mdW5jdGlvbiBpbnNlcnRBZnRlcihuZXdFbCwgdGFyZ2V0RWwpIHtcbiAgICBjb25zdCBwYXJlbnRFbCA9IHRhcmdldEVsLnBhcmVudE5vZGU7XG4gICAgaWYgKHBhcmVudEVsLmxhc3RDaGlsZCA9PT0gdGFyZ2V0RWwpXG4gICAgICAgIHJldHVybiBwYXJlbnRFbC5hcHBlbmRDaGlsZChuZXdFbCk7XG4gICAgcmV0dXJuIHBhcmVudEVsLmluc2VydEJlZm9yZShuZXdFbCx0YXJnZXRFbC5uZXh0U2libGluZyk7XG59XG5cblxuZXhwb3J0IHtcbiAgICBzZXRBdHRyaWJ1dGVzLFxuICAgIHNldEF0dHJpYnV0ZSxcbiAgICByZW1vdmVBdHRyaWJ1dGUsXG4gICAgaW5zZXJ0QWZ0ZXJcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3V0aWxzL2luZGV4LmpzIiwiXG5pbXBvcnQgQ2hhbmdlVHlwZSBmcm9tICcuL2NoYW5nZSc7XG5pbXBvcnQgeyBFdmVudFR5cGUsIEV2ZW50TWFwIH0gZnJvbSAnLi9ldmVudHMnO1xuXG5leHBvcnQge1xuICAgIENoYW5nZVR5cGUsXG4gICAgRXZlbnRUeXBlLFxuICAgIEV2ZW50TWFwXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS90eXBlcy9pbmRleC5qcyIsIlxuY29uc3QgQ2hhbmdlZCA9IHtcbiAgICBDUkVBVEU6ICdDUkVBVEUnLFxuICAgIFJFTU9WRTogJ1JFTU9WRScsXG4gICAgUkVQTEFDRTogJ1JFUExBQ0UnLFxuICAgIFVQREFURTogJ1VQREFURScsXG5cbiAgICBTRVRfUFJPUFM6ICdTRVQgUFJPUFMnLFxuICAgIFJFTU9WRV9QUk9QUzogJ1JFTU9WRSBQUk9QUycsXG5cbiAgICBBRERfRVZFTlRfTElTVEVORVI6ICdBREQgRVZFTlQgTElTVEVORVInLFxuICAgIFVQREFURV9FVkVOVF9MSVNURU5FUjogJ1VQREFURSBFVkVOVCBMSVNURU5FUicsXG4gICAgUkVNT1ZFX0VWRU5UX0xJU1RFTkVSOiAnUkVNT1ZFIEVWRU5UIExJU1RFTkVSJyxcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgQ2hhbmdlZDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3R5cGVzL2NoYW5nZS5qcyIsIlxuY29uc3QgRXZlbnRUeXBlID0gW1xuICAgIC8vIENsaXBib2FyZCBFdmVudHNcbiAgICAnb25Db3B5JywgJ29uQ3V0JywgJ29uUGFzdGUnLFxuICAgIC8vIENvbXBvc2l0aW9uIEV2ZW50c1xuICAgICdvbkNvbXBvc2l0aW9uRW5kJywgJ29uQ29tcG9zaXRpb25TdGFydCcsICdvbkNvbXBvc2l0aW9uVXBkYXRlJyxcbiAgICAvLyBLZXlib2FyZCBFdmVudHNcbiAgICAnb25LZXlEb3duJywgJ29uS2V5UHJlc3MnLCAnb25LZXlVcCcsXG4gICAgLy8gRm9jdXMgRXZlbnRzXG4gICAgJ29uRm9jdXMnLCAnb25CbHVyJyxcbiAgICAvLyBGb3JtIEV2ZW50c1xuICAgICdvbkNoYW5nZScsICdvbklucHV0JywgJ29uSW52YWxpZCcsICdvblN1Ym1pdCcsXG4gICAgLy8gTW91c2UgRXZlbnRzXG4gICAgJ29uQ2xpY2snLCAnb25Db250ZXh0TWVudScsICdvbkRvdWJsZUNsaWNrJyxcbiAgICAnb25EcmFnJywgJ29uRHJhZ0VuZCcsICdvbkRyYWdFbnRlcicsICdvbkRyYWdFeGl0JyxcbiAgICAnb25EcmFnTGVhdmUnLCAnb25EcmFnT3ZlcicsICdvbkRyYWdTdGFydCcsXG4gICAgJ29uRHJvcCcsICdvbk1vdXNlRG93bicsICdvbk1vdXNlRW50ZXInLFxuICAgICdvbk1vdXNlTGVhdmUnLCAnb25Nb3VzZU1vdmUnLCAnb25Nb3VzZU91dCcsXG4gICAgJ29uTW91c2VPdmVyJyAsJ29uTW91c2VVcCcsXG4gICAgLy8gU2VsZWN0aW9uIEV2ZW50c1xuICAgICdvblNlbGVjdCcsXG4gICAgLy8gVG91Y2ggRXZlbnRzXG4gICAgJ29uVG91Y2hDYW5jZWwnLCAnb25Ub3VjaEVuZCcsICdvblRvdWNoTW92ZScsICdvblRvdWNoU3RhcnQnLFxuICAgIC8vIFVJIEV2ZW50c1xuICAgICdvblNjcm9sbCcsXG4gICAgLy8gV2hlZWwgRXZlbnRzXG4gICAgJ29uV2hlZWwnLFxuICAgIC8vIE1lZGlhIEV2ZW50c1xuICAgICdvbkFib3J0JywgJ29uQ2FuUGxheScsICdvbkNhblBsYXlUaHJvdWdoJyxcbiAgICAnb25EdXJhdGlvbkNoYW5nZScsICdvbkVtcHRpZWQnLCAnb25FbmNyeXB0ZWRvbkVuZGVkJyxcbiAgICAnb25FcnJvcicsICdvbkxvYWRlZERhdGEnLCAnb25Mb2FkZWRNZXRhZGF0YScsXG4gICAgJ29uTG9hZFN0YXJ0JywgJ29uUGF1c2UnLCAnb25QbGF5b25QbGF5aW5nJyxcbiAgICAnb25Qcm9ncmVzcycsICdvblJhdGVDaGFuZ2UnLCAnb25TZWVrZWQnLFxuICAgICdvblNlZWtpbmcnLCAnb25TdGFsbGVkJywgJ29uU3VzcGVuZG9uVGltZVVwZGF0ZScsXG4gICAgJ29uVm9sdW1lQ2hhbmdlJywgJ29uV2FpdGluZycsXG4gICAgLy8gSW1hZ2UgRXZlbnRzXG4gICAgJ29uTG9hZCcsICdvbkVycm9yJyxcbiAgICAvLyBBbmltYXRpb24gRXZlbnRzXG4gICAgJ29uQW5pbWF0aW9uU3RhcnQnLCAnb25BbmltYXRpb25FbmQnLCAnb25BbmltYXRpb25JdGVyYXRpb24nLFxuICAgIC8vIFRyYW5zaXRpb24gRXZlbnRzXG4gICAgJ29uVHJhbnNpdGlvbkVuZCcsXG4gICAgLy8gT3RoZXIgRXZlbnRzXG4gICAgJ29uVG9nZ2xlJ1xuXTtcblxuXG5jb25zdCBFdmVudE1hcCA9IEV2ZW50VHlwZS5yZWR1Y2UoKGV2ZW50c01hcCwgZXZlbnQpID0+IHtcbiAgICBldmVudHNNYXBbZXZlbnRdID0gZXZlbnRcbiAgICAgICAgLnJlcGxhY2UoJ29uJywgJycpXG4gICAgICAgIC5yZXBsYWNlKC9bQS1aXS9nLCBlID0+IGUudG9Mb3dlckNhc2UoKSk7XG4gICAgcmV0dXJuIGV2ZW50c01hcDtcbn0sIHt9KTtcblxuXG5leHBvcnQge1xuICAgIEV2ZW50VHlwZSxcbiAgICBFdmVudE1hcFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vdHlwZXMvZXZlbnRzLmpzIiwiXG5pbXBvcnQgeyBDaGFuZ2VUeXBlLCBFdmVudFR5cGUgfSBmcm9tICcuLi90eXBlcy9pbmRleCc7XG5cblxuXG5mdW5jdGlvbiBkaWZmKG5ld05vZGUsIG9sZE5vZGUpIHtcbiAgICAvKlxuICAgIHJldHVybiB0eXBlIFBhdGNoIHtcbiAgICAgICAgdHlwZTogQ2hhbmdlVHlwZVxuICAgICAgICBuZXdOb2RlPzogTm9kZVxuICAgICAgICBjaGlsZHJlbj86IFBhdGNoW11cbiAgICAgICAgYXR0cmlidXRlcz86IFBhdGNoW11cbiAgICB9XG4gICAgICovXG4gICAgaWYgKCFvbGROb2RlKSByZXR1cm4geyB0eXBlOiBDaGFuZ2VUeXBlLkNSRUFURSwgbmV3Tm9kZSB9O1xuICAgIGVsc2UgaWYgKCFuZXdOb2RlKSByZXR1cm4geyB0eXBlOiBDaGFuZ2VUeXBlLlJFTU9WRSB9O1xuICAgIGVsc2UgaWYgKGlzQ2hhbmdlZChuZXdOb2RlLCBvbGROb2RlKSkgcmV0dXJuIHsgdHlwZTogQ2hhbmdlVHlwZS5SRVBMQUNFLCBuZXdOb2RlIH07XG4gICAgZWxzZSBpZiAobmV3Tm9kZS5lbGVtZW50TmFtZSlcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IENoYW5nZVR5cGUuVVBEQVRFLFxuICAgICAgICAgICAgY2hpbGRyZW46IGRpZmZDaGlsZHJlbihuZXdOb2RlLCBvbGROb2RlKSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IGRpZmZBdHRyaWJ1dGVzKG5ld05vZGUsIG9sZE5vZGUpLFxuICAgICAgICB9O1xufVxuXG5mdW5jdGlvbiBpc0NoYW5nZWQobmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIHJldHVybiB0eXBlb2YgbmV3Tm9kZSAhPT0gdHlwZW9mIG9sZE5vZGUgfHxcbiAgICAgICAgdHlwZW9mIG5ld05vZGUgIT09IFwib2JqZWN0XCIgJiYgbmV3Tm9kZSAhPT0gb2xkTm9kZSB8fFxuICAgICAgICB0eXBlb2YgbmV3Tm9kZSA9PT0gXCJvYmplY3RcIiAmJiBuZXdOb2RlLmVsZW1lbnROYW1lICE9PSBvbGROb2RlLmVsZW1lbnROYW1lXG59XG5cblxuZnVuY3Rpb24gZGlmZkF0dHJpYnV0ZXMobmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIGNvbnN0IHBhdGNoZXMgID0gW107XG4gICAgY29uc3QgYXR0cmlidXRlcyA9IHsuLi5vbGROb2RlLmF0dHJpYnV0ZXMsIC4uLm5ld05vZGUuYXR0cmlidXRlc307XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcylcbiAgICAgICAgLmZvckVhY2goYXR0ck5hbWUgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmV3QXR0ciA9IG5ld05vZGUuYXR0cmlidXRlc1thdHRyTmFtZV07XG4gICAgICAgICAgICBjb25zdCBvbGRBdHRyID0gb2xkTm9kZS5hdHRyaWJ1dGVzW2F0dHJOYW1lXTtcbiAgICAgICAgICAgICFuZXdBdHRyICYmIHBhdGNoZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogQ2hhbmdlVHlwZS5SRU1PVkVfUFJPUFMsXG4gICAgICAgICAgICAgICAgdmFsdWU6IG9sZEF0dHIsIGF0dHJOYW1lXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICghb2xkQXR0ciB8fCBvbGRBdHRyICE9PSBuZXdBdHRyKSAmJiBwYXRjaGVzLnB1c2goe1xuICAgICAgICAgICAgICAgIHR5cGU6IENoYW5nZVR5cGUuU0VUX1BST1BTLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBuZXdBdHRyLCBvbGRWYWx1ZTogb2xkQXR0ciwgYXR0ck5hbWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICByZXR1cm4gcGF0Y2hlcztcbn1cblxuXG5mdW5jdGlvbiBkaWZmQ2hpbGRyZW4obmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIGNvbnN0IG5ld0NoaWxkID0gbmV3Tm9kZS5jaGlsZHJlbiB8fCBbXTtcbiAgICBjb25zdCBvbGRDaGlsZCA9IG9sZE5vZGUuY2hpbGRyZW4gfHwgW107XG4gICAgcmV0dXJuIFsuLi5BcnJheShNYXRoLm1heChcbiAgICAgICAgbmV3Q2hpbGQubGVuZ3RoLCBvbGRDaGlsZC5sZW5ndGhcbiAgICApKS5rZXlzKCldLm1hcChpID0+IGRpZmYobmV3Q2hpbGRbaV0sIG9sZENoaWxkW2ldKSk7XG59XG5cblxuZXhwb3J0IHtcbiAgICBkaWZmXG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL2RpZmYvaW5kZXguanMiLCJcbmltcG9ydCB7IENoYW5nZVR5cGUgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSAnLi4vY3JlYXRlL2luZGV4JztcbmltcG9ydCB7IHNldEF0dHJpYnV0ZSwgcmVtb3ZlQXR0cmlidXRlIH0gZnJvbSBcIi4uL3V0aWxzL2luZGV4XCI7XG5pbXBvcnQge0V2ZW50TWFwLCBFdmVudFR5cGV9IGZyb20gXCIuLi90eXBlcy9ldmVudHNcIjtcblxuXG5cbmZ1bmN0aW9uIHBhdGNoKHBhcmVudCwgcGF0Y2hlcywgaW5kZXg9MCkge1xuICAgIGlmICghcGF0Y2hlcykgcmV0dXJuO1xuICAgIGNvbnN0IGVsID0gcGFyZW50LmNoaWxkTm9kZXNbaW5kZXhdO1xuICAgIHN3aXRjaCAocGF0Y2hlcy50eXBlKSB7XG4gICAgICAgIGNhc2UgQ2hhbmdlVHlwZS5DUkVBVEU6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgbmV3Tm9kZSB9ID0gcGF0Y2hlcztcbiAgICAgICAgICAgIGNvbnN0IG5ld0VsID0gY3JlYXRlRWxlbWVudChuZXdOb2RlKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gcGFyZW50LmNoaWxkTm9kZXMubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChuZXdFbCk7XG4gICAgICAgICAgICBlbHNlIHBhcmVudC5pbnNlcnRCZWZvcmUobmV3RWwsIGVsKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQ2hhbmdlVHlwZS5SRU1PVkU6IHtcbiAgICAgICAgICAgIGlmICghZWwpIHJldHVybjtcbiAgICAgICAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChlbCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENoYW5nZVR5cGUuUkVQTEFDRToge1xuICAgICAgICAgICAgY29uc3QgeyBuZXdOb2RlIH0gPSBwYXRjaGVzO1xuICAgICAgICAgICAgY29uc3QgbmV3RWwgPSBjcmVhdGVFbGVtZW50KG5ld05vZGUpO1xuICAgICAgICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZChuZXdFbCwgZWwpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBDaGFuZ2VUeXBlLlVQREFURToge1xuICAgICAgICAgICAgY29uc3QgeyBjaGlsZHJlbiwgYXR0cmlidXRlcyB9ID0gcGF0Y2hlcztcbiAgICAgICAgICAgIHBhdGNoQXR0cmlidXRlcyhlbCwgYXR0cmlidXRlcyk7XG4gICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZCwgaW5kZXgpID0+IHBhdGNoKGVsLCBjaGlsZCwgaW5kZXgpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmZ1bmN0aW9uIHBhdGNoQXR0cmlidXRlcyhlbGVtZW50LCBhdHRyaWJ1dGVzKSB7XG4gICAgYXR0cmlidXRlcy5mb3JFYWNoKHBhdGNoID0+IHtcbiAgICAgICAgY29uc3QgeyB0eXBlLCBhdHRyTmFtZSwgdmFsdWUsIG9sZFZhbHVlIH0gPSBwYXRjaDtcbiAgICAgICAgaWYgKEV2ZW50VHlwZS5pbmNsdWRlcyhhdHRyTmFtZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50TmFtZSA9IEV2ZW50TWFwW2F0dHJOYW1lXTtcbiAgICAgICAgICAgIGlmICh0eXBlID09PSBDaGFuZ2VUeXBlLlNFVF9QUk9QUykge1xuICAgICAgICAgICAgICAgIG9sZFZhbHVlICYmIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIG9sZFZhbHVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGUgPT09IENoYW5nZVR5cGUuUkVNT1ZFX1BST1BTKVxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBvbGRWYWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gQ2hhbmdlVHlwZS5TRVRfUFJPUFMpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNldEF0dHJpYnV0ZShlbGVtZW50LCBhdHRyTmFtZSwgdmFsdWUpO1xuICAgICAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gQ2hhbmdlVHlwZS5SRU1PVkVfUFJPUFMpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlbW92ZUF0dHJpYnV0ZShlbGVtZW50LCBhdHRyTmFtZSwgdmFsdWUpXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5cbmV4cG9ydCB7XG4gICAgcGF0Y2hcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3BhdGNoL2luZGV4LmpzIiwiXG5pbXBvcnQgT2JzZXJ2ZXIgZnJvbSAnLi9vYmplY3QnO1xuaW1wb3J0IE9ic2VydmVyQXJyYXkgZnJvbSAnLi9hcnJheSc7XG5pbXBvcnQgeyB3YWxrLCBvYnNlcnZlciB9IGZyb20gJy4vdXRpbHMnO1xuXG5cbmV4cG9ydCB7XG4gICAgT2JzZXJ2ZXIsXG4gICAgT2JzZXJ2ZXJBcnJheSxcbiAgICB3YWxrLCBvYnNlcnZlclxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9vYnNlcnZlci9pbmRleC5qcyIsIlxuaW1wb3J0IHsgd2Fsaywgb2JzZXJ2ZXIgfSBmcm9tICcuLi91dGlscy9pbmRleCdcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9ic2VydmVyIHtcbiAgICBjb25zdHJ1Y3RvcihvYmosIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFjaykge1xuICAgICAgICBpZiAodHlwZW9mIG9iaiAhPT0gXCJvYmplY3RcIilcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1R5cGUgXCJPYmplY3RcIiByZXF1aXJlZCEnKTtcbiAgICAgICAgd2FsayhvYmosIChrZXksIHZhbHVlKSA9PiBvYnNlcnZlcihcbiAgICAgICAgICAgIHRoaXMsIGtleSwgdmFsdWUsXG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjayxcbiAgICAgICAgICAgIGdldHRlckNhbGxiYWNrXG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIHN0YXRpYyBmcm9tID0gKG9iaiwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2ZXIoXG4gICAgICAgICAgICBvYmosXG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjayxcbiAgICAgICAgICAgIGdldHRlckNhbGxiYWNrXG4gICAgICAgIClcbiAgICB9O1xuXG4gICAgc3RhdGljIHRvU3RyaW5nID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gYE9ic2VydmVyICR7dGhpc31gXG4gICAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvb2JzZXJ2ZXIvb2JqZWN0L2luZGV4LmpzIiwiXG5pbXBvcnQgT2JzZXJ2ZXIgZnJvbSAnLi4vb2JqZWN0JztcbmltcG9ydCBPYnNlcnZlckFycmF5IGZyb20gJy4uL2FycmF5JztcblxuXG5jb25zdCBub29wID0gKCkgPT4ge307XG5cblxuXG5mdW5jdGlvbiB3YWxrKG9iaiwgZnVuKSB7XG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBGdW5jdGlvbiBcIndhbGtcIiByZXF1aXJlIGFuIFwib2JqZWN0XCIgaW5zdGVhZCBvZiAke3R5cGVvZiBvYmp9YCk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSlcbiAgICAgICAgcmV0dXJuIG9iai5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4gZnVuKGluZGV4LCBpdGVtLCBvYmopKTtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IGZ1bihrZXksIG9ialtrZXldLCBvYmopKTtcbn1cblxuZnVuY3Rpb24gb2JzZXJ2ZXIob2JqLCBrZXksIHZhbHVlLCBzZXR0ZXJDYWxsYmFjaz1ub29wLCBnZXR0ZXJDYWxsYmFjaz1ub29wKSB7XG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBGdW5jdGlvbiBcIm9ic2VydmVyXCIgcmVxdWlyZSBhbiBcIm9iamVjdFwiIGluc3RlYWQgb2YgJHt0eXBlb2Ygb2JqfWApO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKVxuICAgICAgICB2YWx1ZSA9IE9ic2VydmVyQXJyYXkuZnJvbSh2YWx1ZSwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKTtcbiAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXG4gICAgICAgIHZhbHVlID0gT2JzZXJ2ZXIuZnJvbSh2YWx1ZSwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGdldDogKCkgPT4ge1xuICAgICAgICAgICAgZ2V0dGVyQ2FsbGJhY2sob2JqLCBrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICB9LFxuICAgICAgICBzZXQ6IG5ld1ZhbHVlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9sZFZhbHVlID0gb2JqW2tleV07XG4gICAgICAgICAgICBvYnNlcnZlcihvYmosIGtleSwgbmV3VmFsdWUsIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFjayk7XG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjayhvYmosIGtleSwgbmV3VmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0pXG59XG5cblxuY29uc3QgZ2V0VW5pcXVlSUQgPSBmdW5jdGlvbigpIHtcbiAgICBsZXQgaWQgPSAwO1xuICAgIHJldHVybiAoKCkgPT4gaWQgKyspO1xufSgpO1xuXG5cbmV4cG9ydCB7XG4gICAgd2FsayxcbiAgICBvYnNlcnZlcixcbiAgICBnZXRVbmlxdWVJRFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9vYnNlcnZlci91dGlscy9pbmRleC5qcyIsIlxuaW1wb3J0IHsgd2Fsaywgb2JzZXJ2ZXIgfSBmcm9tICcuLi91dGlscy9pbmRleCc7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPYnNlcnZlckFycmF5IHtcbiAgICBjb25zdHJ1Y3RvcihhcnJheSwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKSB7XG4gICAgICAgICFhcnJheSAmJiAoYXJyYXkgPSBbXSk7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShhcnJheSkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUeXBlIFwiQXJyYXlcIiByZXF1aXJlZCEnKTtcbiAgICAgICAgd2FsayhhcnJheSwgKGluZGV4LCBpdGVtKSA9PiBvYnNlcnZlcihcbiAgICAgICAgICAgIHRoaXMsIGluZGV4LCBpdGVtLFxuICAgICAgICAgICAgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrXG4gICAgICAgICkpO1xuICAgICAgICB0aGlzLmxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBmcm9tID0gKGFycmF5LCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZlckFycmF5KFxuICAgICAgICAgICAgYXJyYXksXG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjayxcbiAgICAgICAgICAgIGdldHRlckNhbGxiYWNrXG4gICAgICAgIClcbiAgICB9O1xuICAgIHN0YXRpYyBpc09ic2VydmVyQXJyYXkgID0gYXJyYXkgPT4ge1xuICAgICAgICByZXR1cm4gYXJyYXkuX19wcm90b19fLmNvbnN0cnVjdG9yID09PSBPYnNlcnZlckFycmF5O1xuICAgIH07XG4gICAgc3RhdGljIG9mID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZlckFycmF5KFsuLi5hcmdzXSlcbiAgICB9O1xuXG5cbiAgICBjb25jYXQgPSAoLi4uYXJyYXlzKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0FycmF5ID0gbmV3IE9ic2VydmVyQXJyYXkoKTtcbiAgICAgICAgW3RoaXMsIC4uLmFycmF5c10uZm9yRWFjaChcbiAgICAgICAgICAgIGFycmF5ID0+IGFycmF5LmZvckVhY2gobmV3QXJyYXkucHVzaClcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIG5ld0FycmF5O1xuICAgIH07XG4gICAgY29weVdpdGhpbiA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgIC8vIFRPRE9cbiAgICAgICAgcmV0dXJuIE9ic2VydmVyQXJyYXkuZnJvbShcbiAgICAgICAgICAgIEFycmF5LmZyb20odGhpcykuY29weVdpdGhpbiguLi5hcmdzKVxuICAgICAgICApXG4gICAgfTtcbiAgICBlbnRyaWVzID0gZnVuY3Rpb24gKigpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgd2hpbGUgKHRoaXNbaW5kZXhdKVxuICAgICAgICAgICAgeWllbGQgW2luZGV4KyssIHRoaXNbaW5kZXhdXTtcbiAgICB9O1xuICAgIGV2ZXJ5ID0gKCkgPT4ge307XG4gICAgZmlsbCA9ICgpID0+IHt9O1xuICAgIGZpbHRlciA9ICgpID0+IHt9O1xuICAgIGZpbmQgPSAoKSA9PiB7fTtcbiAgICBmaW5kSW5kZXggPSAoKSA9PiB7fTtcbiAgICBmb3JFYWNoID0gKCkgPT4ge307XG4gICAgaW5jbHVkZXMgPSAoKSA9PiB7fTtcbiAgICBpbmRleE9mID0gKCkgPT4ge307XG4gICAgam9pbiA9ICgpID0+IHt9O1xuICAgIGtleXMgPSAoKSA9PiB7fTtcbiAgICBsYXN0SW5kZXhPZiA9ICgpID0+IHt9O1xuICAgIG1hcCA9ICgpID0+IHt9O1xuICAgIHBvcCA9ICgpID0+IHt9O1xuICAgIHB1c2ggPSB2YWx1ZSA9PiB7XG4gICAgICAgIG9ic2VydmVyKFxuICAgICAgICAgICAgdGhpcywgdGhpcy5sZW5ndGgsIHZhbHVlLFxuICAgICAgICAgICAgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMubGVuZ3RoICsrO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICByZWR1Y2UgPSAoKSA9PiB7fTtcbiAgICByZWR1Y2VSaWdodCA9ICgpID0+IHt9O1xuICAgIHJldmVyc2UgPSAoKSA9PiB7fTtcbiAgICBzaGlmdCA9ICgpID0+IHt9O1xuICAgIHNsaWNlID0gKCkgPT4ge307XG4gICAgc29tZSA9ICgpID0+IHt9O1xuICAgIHNvcnQgPSAoKSA9PiB7fTtcbiAgICBzcGxpY2UgPSAoKSA9PiB7fTtcbiAgICB0b0xvY2FsZVN0cmluZyA9ICgpID0+IHt9O1xuICAgIHRvU291cmNlID0gKCkgPT4ge307XG4gICAgdG9TdHJpbmcgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBgT2JzZXJ2ZXJBcnJheSBbLi4uXWBcbiAgICB9O1xuICAgIHVuc2hpZnQgPSAoKSA9PiB7fTtcbiAgICB2YWx1ZXMgPSAoKSA9PiB7fTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvb2JzZXJ2ZXIvYXJyYXkvaW5kZXguanMiLCJcbmZ1bmN0aW9uIGZsYXR0ZW5Ob2RlKG5vZGUpIHtcbiAgICBpZiAoIW5vZGUpIHJldHVybjtcbiAgICBpZiAobm9kZS5jaGlsZHJlbilcbiAgICAgICAgbm9kZS5jaGlsZHJlbiA9IGZsYXR0ZW5DaGlsZHJlbihub2RlLmNoaWxkcmVuKTtcbiAgICByZXR1cm4gbm9kZVxufVxuXG5mdW5jdGlvbiBmbGF0dGVuQ2hpbGRyZW4oY2hpbGRyZW4pIHtcbiAgICByZXR1cm4gW10uY29uY2F0KC4uLmNoaWxkcmVuKVxuICAgICAgICAubWFwKG5vZGUgPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBub2RlID09PSAnb2JqZWN0JylcbiAgICAgICAgICAgICAgICByZXR1cm4gZmxhdHRlbk5vZGUobm9kZSk7XG4gICAgICAgICAgICBlbHNlIHJldHVybiBub2RlO1xuICAgICAgICB9KVxuICAgICAgICAuZmlsdGVyKG5vZGUgPT4gISFub2RlKTtcbn1cblxuXG5leHBvcnQge1xuICAgIGZsYXR0ZW5Ob2RlXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL3V0aWxzL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==