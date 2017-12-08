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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
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

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(0);

let App = class App extends _index.Muse {
    constructor(...args) {
        var _temp;

        return _temp = super(...args), this.state = {
            name: 'Joe',
            age: 22,
            langs: ['JavaScript', 'Python', 'Rust', 'Scala']
        }, this.computed = {
            isAgeOdd() {
                return this.state.age % 2 !== 0;
            }
        }, this.handleClick = () => {
            this.state.age++;
        }, _temp;
    }

    render() {
        return {
            elementName: 'div',
            attributes: {},
            children: [{
                elementName: 'h1',
                attributes: {},
                children: ['Hello!']
            }, {
                elementName: 'input',
                attributes: {
                    type: 'password',
                    value: this.state.name,
                    onKeyUp: e => {
                        this.state.name = e.target.value;

                        (() => console.log(this.state.name))(e);
                    }
                },
                children: null
            }, {
                elementName: 'p',
                attributes: {},
                children: ['My name is ', this.state.name, '.']
            }, {
                elementName: 'p',
                attributes: {},
                children: ['I\'m ', this.state.age, ' years old', this.computed.isAgeOdd ? {
                    elementName: 'span',
                    attributes: {},
                    children: [' and it\'s an odd number.']
                } : null]
            }, {
                elementName: 'p',
                attributes: {},
                children: ['And I can those programming languages:']
            }, {
                elementName: 'ul',
                attributes: {},
                children: [Array.from(this.state.langs).map((lang => ({
                    elementName: 'li',
                    attributes: {},
                    children: [lang]
                })).bind(this))]
            }, {
                elementName: 'button',
                attributes: {
                    onClick: this.handleClick
                },
                children: ['Click Me']
            }]
        };
    }
};


const app = new App();
app.renderTo(document.getElementById('root'));

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDYwM2I2M2M2NDMxNjdlZDZkZDEiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9jcmVhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdHlwZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdHlwZXMvY2hhbmdlLmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3R5cGVzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9kaWZmL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3BhdGNoL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvb2JzZXJ2ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci9vYmplY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci91dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL29ic2VydmVyL2FycmF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZXhhbXBsZS9pbmRleC5qcyJdLCJuYW1lcyI6WyJNdXNlIiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJlbnRyeSIsIm5vZGUiLCJzdGF0ZSIsImNvbXB1dGVkIiwiY29tcG9uZW50V2lsbE1vdW50IiwiY29tcG9uZW50RGlkTW91bnQiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwic2hvdWxkQ29tcG9uZW50VXBkYXRlIiwiY29tcG9uZW50V2lsbFVwZGF0ZSIsImNvbXBvbmVudERpZFVwZGF0ZSIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwiY29tcG9uZW50RGlkQ2F0Y2giLCJpbml0T2JzZXJ2ZXIiLCJmcm9tIiwic2V0dGVyQ2FsbGJhY2siLCJpbml0Q29tcHV0ZWQiLCJuYW1lIiwiZ2V0dGVyIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwiZ2V0Iiwib2JqIiwia2V5IiwidmFsdWUiLCJvbGRWYWx1ZSIsIkVycm9yIiwiZGlmZkFuZFBhdGNoIiwiYmVmb3JlUmVuZGVyIiwicmVuZGVyIiwicmVuZGVyVG8iLCJhcHBlbmRDaGlsZCIsIm9sZE5vZGUiLCJwYXRjaGVzIiwiY3JlYXRlRWxlbWVudCIsImRpZmYiLCJwYXRjaCIsInV0aWxzIiwiZWwiLCJkb2N1bWVudCIsImVsZW1lbnROYW1lIiwiY2hpbGRyZW4iLCJhcHBlbmRDaGlsZHJlbiIsImF0dHJpYnV0ZXMiLCJjcmVhdGVUZXh0Tm9kZSIsInRhcmdldCIsIm1hcCIsImZvckVhY2giLCJzZXRBdHRyaWJ1dGVzIiwia2V5cyIsImZpbHRlciIsImhhc093blByb3BlcnR5IiwiYXR0ck5hbWUiLCJzZXRBdHRyaWJ1dGUiLCJhdHRyVmFsdWUiLCJpbmNsdWRlcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVBdHRyaWJ1dGUiLCJvbGRBdHRyVmFsdWUiLCJpbnNlcnRBZnRlciIsIm5ld0VsIiwidGFyZ2V0RWwiLCJwYXJlbnRFbCIsInBhcmVudE5vZGUiLCJsYXN0Q2hpbGQiLCJpbnNlcnRCZWZvcmUiLCJuZXh0U2libGluZyIsIkNoYW5nZVR5cGUiLCJFdmVudFR5cGUiLCJFdmVudE1hcCIsIkNoYW5nZWQiLCJDUkVBVEUiLCJSRU1PVkUiLCJSRVBMQUNFIiwiVVBEQVRFIiwiU0VUX1BST1BTIiwiUkVNT1ZFX1BST1BTIiwiQUREX0VWRU5UX0xJU1RFTkVSIiwiVVBEQVRFX0VWRU5UX0xJU1RFTkVSIiwiUkVNT1ZFX0VWRU5UX0xJU1RFTkVSIiwicmVkdWNlIiwiZXZlbnRzTWFwIiwiZXZlbnQiLCJyZXBsYWNlIiwiZSIsInRvTG93ZXJDYXNlIiwibmV3Tm9kZSIsInR5cGUiLCJpc0NoYW5nZWQiLCJkaWZmQ2hpbGRyZW4iLCJkaWZmQXR0cmlidXRlcyIsImV2ZW50cyIsImRpZmZFdmVudHMiLCJldmVudE5hbWUiLCJuZXdIYW5kbGVyIiwib2xkSGFuZGxlciIsInB1c2giLCJuZXdBdHRyIiwib2xkQXR0ciIsIm5ld0NoaWxkIiwib2xkQ2hpbGQiLCJBcnJheSIsIk1hdGgiLCJtYXgiLCJsZW5ndGgiLCJpIiwicGFyZW50IiwiaW5kZXgiLCJjaGlsZE5vZGVzIiwicmVtb3ZlQ2hpbGQiLCJyZXBsYWNlQ2hpbGQiLCJwYXRjaEF0dHJpYnV0ZXMiLCJwYXRjaEV2ZW50cyIsImNoaWxkIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImVsZW1lbnQiLCJPYnNlcnZlciIsIk9ic2VydmVyQXJyYXkiLCJ3YWxrIiwib2JzZXJ2ZXIiLCJnZXR0ZXJDYWxsYmFjayIsIlR5cGVFcnJvciIsInRvU3RyaW5nIiwibm9vcCIsImZ1biIsImlzQXJyYXkiLCJpdGVtIiwic2V0IiwibmV3VmFsdWUiLCJnZXRVbmlxdWVJRCIsImlkIiwiYXJyYXkiLCJpc09ic2VydmVyQXJyYXkiLCJfX3Byb3RvX18iLCJvZiIsImFyZ3MiLCJjb25jYXQiLCJhcnJheXMiLCJuZXdBcnJheSIsImNvcHlXaXRoaW4iLCJlbnRyaWVzIiwiZXZlcnkiLCJmaWxsIiwiZmluZCIsImZpbmRJbmRleCIsImluZGV4T2YiLCJqb2luIiwibGFzdEluZGV4T2YiLCJwb3AiLCJyZWR1Y2VSaWdodCIsInJldmVyc2UiLCJzaGlmdCIsInNsaWNlIiwic29tZSIsInNvcnQiLCJzcGxpY2UiLCJ0b0xvY2FsZVN0cmluZyIsInRvU291cmNlIiwidW5zaGlmdCIsInZhbHVlcyIsImZsYXR0ZW5Ob2RlIiwiZmxhdHRlbkNoaWxkcmVuIiwiQXBwIiwiYWdlIiwibGFuZ3MiLCJpc0FnZU9kZCIsImhhbmRsZUNsaWNrIiwiY29uc29sZSIsImxvZyIsImxhbmciLCJhcHAiLCJnZXRF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IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9hc3NldHMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDA2MDNiNjNjNjQzMTY3ZWQ2ZGQxIiwiXG5pbXBvcnQgTXVzZSBmcm9tICcuL2NvcmUnO1xuXG5cblxuZXhwb3J0IHtcbiAgICBNdXNlXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9pbmRleC5qcyIsIlxuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgZGlmZiwgcGF0Y2ggfSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgeyBPYnNlcnZlciwgb2JzZXJ2ZXIsIHdhbGsgfSBmcm9tICcuL29ic2VydmVyJztcbmltcG9ydCB7IGZsYXR0ZW5Ob2RlIH0gZnJvbSAnLi91dGlscydcblxuXG5cbmNsYXNzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgZW50cnkgPSBudWxsO1xuICAgIG5vZGUgPSBudWxsO1xuICAgIHN0YXRlID0ge307XG4gICAgY29tcHV0ZWQgPSB7fTtcblxuICAgIC8vIFRPRE86IExpZmVDeWNsZVxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHt9O1xuICAgIGNvbXBvbmVudERpZE1vdW50KCkge307XG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcygpIHt9O1xuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9O1xuICAgIGNvbXBvbmVudFdpbGxVcGRhdGUoKSB7fTtcbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7fTtcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHt9O1xuICAgIGNvbXBvbmVudERpZENhdGNoKCkge307XG5cbiAgICAvLyBPYnNlcnZlclxuICAgIGluaXRPYnNlcnZlcigpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IE9ic2VydmVyLmZyb20oXG4gICAgICAgICAgICB0aGlzLnN0YXRlIHx8IHt9LFxuICAgICAgICAgICAgOjp0aGlzLnNldHRlckNhbGxiYWNrXG4gICAgICAgICk7XG4gICAgfTtcbiAgICBpbml0Q29tcHV0ZWQoKSB7XG4gICAgICAgIHdhbGsoXG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVkLFxuICAgICAgICAgICAgKG5hbWUsIGdldHRlciwgY29tcHV0ZWQpID0+IHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29tcHV0ZWQsIG5hbWUsIHtcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgZ2V0OiB0aGlzOjpnZXR0ZXJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgfVxuICAgIHNldHRlckNhbGxiYWNrKG9iaiwga2V5LCB2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKG9iaiAhPT0gdGhpcy5zdGF0ZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQk9PTSEhIScpO1xuICAgICAgICB0aGlzLmRpZmZBbmRQYXRjaCgpO1xuICAgIH07XG5cbiAgICAvLyBSZW5kZXJcbiAgICBiZWZvcmVSZW5kZXIoKSB7XG4gICAgICAgIHRoaXMuaW5pdE9ic2VydmVyKCk7XG4gICAgICAgIHRoaXMuaW5pdENvbXB1dGVkKCk7XG4gICAgfTtcbiAgICByZW5kZXIoKSB7fTtcbiAgICByZW5kZXJUbyhlbnRyeSkge1xuICAgICAgICB0aGlzLmJlZm9yZVJlbmRlcigpO1xuICAgICAgICB0aGlzLm5vZGUgPSBmbGF0dGVuTm9kZSh0aGlzLnJlbmRlcigpKTtcbiAgICAgICAgdGhpcy5lbnRyeSA9IGVudHJ5O1xuICAgICAgICB0aGlzLmVudHJ5LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQodGhpcy5ub2RlKSlcbiAgICB9O1xuICAgIGRpZmZBbmRQYXRjaCgpIHtcbiAgICAgICAgY29uc3Qgb2xkTm9kZSA9IHRoaXMubm9kZTtcbiAgICAgICAgdGhpcy5ub2RlID0gZmxhdHRlbk5vZGUodGhpcy5yZW5kZXIoKSk7XG4gICAgICAgIGNvbnN0IHBhdGNoZXMgPSBkaWZmKHRoaXMubm9kZSwgb2xkTm9kZSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG9sZE5vZGUpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLm5vZGUpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhwYXRjaGVzKTtcbiAgICAgICAgcGF0Y2godGhpcy5lbnRyeSwgcGF0Y2hlcyk7XG4gICAgfTtcbn1cblxuXG5cbmV4cG9ydCBkZWZhdWx0IENvbXBvbmVudDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvaW5kZXguanMiLCJcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tICcuL2NyZWF0ZSc7XG5pbXBvcnQgeyBkaWZmIH0gZnJvbSAnLi9kaWZmJztcbmltcG9ydCB7IHBhdGNoIH0gZnJvbSAnLi9wYXRjaCc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XG5cblxuZXhwb3J0IHtcbiAgICBjcmVhdGVFbGVtZW50LFxuICAgIGRpZmYsXG4gICAgcGF0Y2gsXG4gICAgdXRpbHNcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL2luZGV4LmpzIiwiXG5pbXBvcnQgeyBzZXRBdHRyaWJ1dGVzIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5cblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudChub2RlKSB7XG4gICAgLypcbiAgICBub2RlOiBTdHJpbmcgfHwge1xuICAgICAgICBlbGVtZW50TmFtZTogU3RyaW5nXG4gICAgICAgIGNoaWxkcmVuOiBub2RlW11cbiAgICAgICAgYXR0cmlidXRlczogT2JqZWN0XG4gICAgfVxuICAgICovXG4gICAgaWYgKHR5cGVvZiBub2RlID09PSAnb2JqZWN0Jykge1xuICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobm9kZS5lbGVtZW50TmFtZSk7XG4gICAgICAgIG5vZGUuY2hpbGRyZW4gJiYgYXBwZW5kQ2hpbGRyZW4oZWwsIG5vZGUuY2hpbGRyZW4pO1xuICAgICAgICBzZXRBdHRyaWJ1dGVzKGVsLCBub2RlLmF0dHJpYnV0ZXMpO1xuICAgICAgICByZXR1cm4gZWw7XG4gICAgfVxuICAgIGVsc2UgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG5vZGUpO1xufVxuXG5cbmZ1bmN0aW9uIGFwcGVuZENoaWxkcmVuKHRhcmdldCwgY2hpbGRyZW4pIHtcbiAgICBjaGlsZHJlbi5tYXAoY3JlYXRlRWxlbWVudClcbiAgICAgICAgLmZvckVhY2goOjp0YXJnZXQuYXBwZW5kQ2hpbGQpXG59XG5cblxuXG5leHBvcnQge1xuICAgIGNyZWF0ZUVsZW1lbnRcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL2NyZWF0ZS9pbmRleC5qcyIsIlxuaW1wb3J0IHsgRXZlbnRUeXBlLCBFdmVudE1hcCB9IGZyb20gJy4uL3R5cGVzJztcblxuXG5cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXModGFyZ2V0LCBhdHRyaWJ1dGVzPXt9KSB7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcylcbiAgICAgICAgLmZpbHRlcihrZXkgPT4gYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICAuZm9yRWFjaChhdHRyTmFtZSA9PiBzZXRBdHRyaWJ1dGUodGFyZ2V0LCBhdHRyTmFtZSwgYXR0cmlidXRlc1thdHRyTmFtZV0pKTtcbn1cblxuXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGUodGFyZ2V0LCBhdHRyTmFtZSwgYXR0clZhbHVlKSB7XG4gICAgYXR0ck5hbWUgPT09ICdjbGFzc05hbWUnICYmIChhdHRyTmFtZSA9ICdjbGFzcycpO1xuICAgIGlmIChFdmVudFR5cGUuaW5jbHVkZXMoYXR0ck5hbWUpKVxuICAgICAgICByZXR1cm4gdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICBFdmVudE1hcFthdHRyTmFtZV0sXG4gICAgICAgICAgICBhdHRyVmFsdWVcbiAgICAgICAgKTtcbiAgICB0YXJnZXQuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsdWUpO1xufVxuXG5cbmZ1bmN0aW9uIHJlbW92ZUF0dHJpYnV0ZSh0YXJnZXQsIGF0dHJOYW1lLCBvbGRBdHRyVmFsdWUpIHtcbiAgICBhdHRyTmFtZSA9PT0gJ2NsYXNzTmFtZScgJiYgKGF0dHJOYW1lID0gJ2NsYXNzJyk7XG4gICAgaWYgKEV2ZW50VHlwZS5pbmNsdWRlcyhhdHRyTmFtZSkpXG4gICAgICAgIHJldHVybiB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgIEV2ZW50TWFwW2F0dHJOYW1lXSxcbiAgICAgICAgICAgIG9sZEF0dHJWYWx1ZVxuICAgICAgICApO1xuICAgIHRhcmdldC5yZW1vdmVBdHRyaWJ1dGUoYXR0ck5hbWUpO1xufVxuXG5cbmZ1bmN0aW9uIGluc2VydEFmdGVyKG5ld0VsLCB0YXJnZXRFbCkge1xuICAgIGNvbnN0IHBhcmVudEVsID0gdGFyZ2V0RWwucGFyZW50Tm9kZTtcbiAgICBpZiAocGFyZW50RWwubGFzdENoaWxkID09PSB0YXJnZXRFbClcbiAgICAgICAgcmV0dXJuIHBhcmVudEVsLmFwcGVuZENoaWxkKG5ld0VsKTtcbiAgICByZXR1cm4gcGFyZW50RWwuaW5zZXJ0QmVmb3JlKG5ld0VsLHRhcmdldEVsLm5leHRTaWJsaW5nKTtcbn1cblxuXG5leHBvcnQge1xuICAgIHNldEF0dHJpYnV0ZXMsXG4gICAgc2V0QXR0cmlidXRlLFxuICAgIHJlbW92ZUF0dHJpYnV0ZSxcbiAgICBpbnNlcnRBZnRlclxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vdXRpbHMvaW5kZXguanMiLCJcbmltcG9ydCBDaGFuZ2VUeXBlIGZyb20gJy4vY2hhbmdlJztcbmltcG9ydCB7IEV2ZW50VHlwZSwgRXZlbnRNYXAgfSBmcm9tICcuL2V2ZW50cyc7XG5cbmV4cG9ydCB7XG4gICAgQ2hhbmdlVHlwZSxcbiAgICBFdmVudFR5cGUsXG4gICAgRXZlbnRNYXBcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3R5cGVzL2luZGV4LmpzIiwiXG5jb25zdCBDaGFuZ2VkID0ge1xuICAgIENSRUFURTogJ0NSRUFURScsXG4gICAgUkVNT1ZFOiAnUkVNT1ZFJyxcbiAgICBSRVBMQUNFOiAnUkVQTEFDRScsXG4gICAgVVBEQVRFOiAnVVBEQVRFJyxcblxuICAgIFNFVF9QUk9QUzogJ1NFVCBQUk9QUycsXG4gICAgUkVNT1ZFX1BST1BTOiAnUkVNT1ZFIFBST1BTJyxcblxuICAgIEFERF9FVkVOVF9MSVNURU5FUjogJ0FERCBFVkVOVCBMSVNURU5FUicsXG4gICAgVVBEQVRFX0VWRU5UX0xJU1RFTkVSOiAnVVBEQVRFIEVWRU5UIExJU1RFTkVSJyxcbiAgICBSRU1PVkVfRVZFTlRfTElTVEVORVI6ICdSRU1PVkUgRVZFTlQgTElTVEVORVInLFxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBDaGFuZ2VkO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vdHlwZXMvY2hhbmdlLmpzIiwiXG5jb25zdCBFdmVudFR5cGUgPSBbXG4gICAgLy8gQ2xpcGJvYXJkIEV2ZW50c1xuICAgICdvbkNvcHknLCAnb25DdXQnLCAnb25QYXN0ZScsXG4gICAgLy8gQ29tcG9zaXRpb24gRXZlbnRzXG4gICAgJ29uQ29tcG9zaXRpb25FbmQnLCAnb25Db21wb3NpdGlvblN0YXJ0JywgJ29uQ29tcG9zaXRpb25VcGRhdGUnLFxuICAgIC8vIEtleWJvYXJkIEV2ZW50c1xuICAgICdvbktleURvd24nLCAnb25LZXlQcmVzcycsICdvbktleVVwJyxcbiAgICAvLyBGb2N1cyBFdmVudHNcbiAgICAnb25Gb2N1cycsICdvbkJsdXInLFxuICAgIC8vIEZvcm0gRXZlbnRzXG4gICAgJ29uQ2hhbmdlJywgJ29uSW5wdXQnLCAnb25JbnZhbGlkJywgJ29uU3VibWl0JyxcbiAgICAvLyBNb3VzZSBFdmVudHNcbiAgICAnb25DbGljaycsICdvbkNvbnRleHRNZW51JywgJ29uRG91YmxlQ2xpY2snLFxuICAgICdvbkRyYWcnLCAnb25EcmFnRW5kJywgJ29uRHJhZ0VudGVyJywgJ29uRHJhZ0V4aXQnLFxuICAgICdvbkRyYWdMZWF2ZScsICdvbkRyYWdPdmVyJywgJ29uRHJhZ1N0YXJ0JyxcbiAgICAnb25Ecm9wJywgJ29uTW91c2VEb3duJywgJ29uTW91c2VFbnRlcicsXG4gICAgJ29uTW91c2VMZWF2ZScsICdvbk1vdXNlTW92ZScsICdvbk1vdXNlT3V0JyxcbiAgICAnb25Nb3VzZU92ZXInICwnb25Nb3VzZVVwJyxcbiAgICAvLyBTZWxlY3Rpb24gRXZlbnRzXG4gICAgJ29uU2VsZWN0JyxcbiAgICAvLyBUb3VjaCBFdmVudHNcbiAgICAnb25Ub3VjaENhbmNlbCcsICdvblRvdWNoRW5kJywgJ29uVG91Y2hNb3ZlJywgJ29uVG91Y2hTdGFydCcsXG4gICAgLy8gVUkgRXZlbnRzXG4gICAgJ29uU2Nyb2xsJyxcbiAgICAvLyBXaGVlbCBFdmVudHNcbiAgICAnb25XaGVlbCcsXG4gICAgLy8gTWVkaWEgRXZlbnRzXG4gICAgJ29uQWJvcnQnLCAnb25DYW5QbGF5JywgJ29uQ2FuUGxheVRocm91Z2gnLFxuICAgICdvbkR1cmF0aW9uQ2hhbmdlJywgJ29uRW1wdGllZCcsICdvbkVuY3J5cHRlZG9uRW5kZWQnLFxuICAgICdvbkVycm9yJywgJ29uTG9hZGVkRGF0YScsICdvbkxvYWRlZE1ldGFkYXRhJyxcbiAgICAnb25Mb2FkU3RhcnQnLCAnb25QYXVzZScsICdvblBsYXlvblBsYXlpbmcnLFxuICAgICdvblByb2dyZXNzJywgJ29uUmF0ZUNoYW5nZScsICdvblNlZWtlZCcsXG4gICAgJ29uU2Vla2luZycsICdvblN0YWxsZWQnLCAnb25TdXNwZW5kb25UaW1lVXBkYXRlJyxcbiAgICAnb25Wb2x1bWVDaGFuZ2UnLCAnb25XYWl0aW5nJyxcbiAgICAvLyBJbWFnZSBFdmVudHNcbiAgICAnb25Mb2FkJywgJ29uRXJyb3InLFxuICAgIC8vIEFuaW1hdGlvbiBFdmVudHNcbiAgICAnb25BbmltYXRpb25TdGFydCcsICdvbkFuaW1hdGlvbkVuZCcsICdvbkFuaW1hdGlvbkl0ZXJhdGlvbicsXG4gICAgLy8gVHJhbnNpdGlvbiBFdmVudHNcbiAgICAnb25UcmFuc2l0aW9uRW5kJyxcbiAgICAvLyBPdGhlciBFdmVudHNcbiAgICAnb25Ub2dnbGUnXG5dO1xuXG5cbmNvbnN0IEV2ZW50TWFwID0gRXZlbnRUeXBlLnJlZHVjZSgoZXZlbnRzTWFwLCBldmVudCkgPT4ge1xuICAgIGV2ZW50c01hcFtldmVudF0gPSBldmVudFxuICAgICAgICAucmVwbGFjZSgnb24nLCAnJylcbiAgICAgICAgLnJlcGxhY2UoL1tBLVpdL2csIGUgPT4gZS50b0xvd2VyQ2FzZSgpKTtcbiAgICByZXR1cm4gZXZlbnRzTWFwO1xufSwge30pO1xuXG5cbmV4cG9ydCB7XG4gICAgRXZlbnRUeXBlLFxuICAgIEV2ZW50TWFwXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS90eXBlcy9ldmVudHMuanMiLCJcbmltcG9ydCB7IENoYW5nZVR5cGUsIEV2ZW50VHlwZSB9IGZyb20gJy4uL3R5cGVzL2luZGV4JztcblxuXG5cbmZ1bmN0aW9uIGRpZmYobmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIC8qXG4gICAgcmV0dXJuIHR5cGUgUGF0Y2gge1xuICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlXG4gICAgICAgIG5ld05vZGU/OiBOb2RlXG4gICAgICAgIGNoaWxkcmVuPzogUGF0Y2hbXVxuICAgICAgICBhdHRyaWJ1dGVzPzogUGF0Y2hbXVxuICAgIH1cbiAgICAgKi9cbiAgICBpZiAoIW9sZE5vZGUpIHJldHVybiB7IHR5cGU6IENoYW5nZVR5cGUuQ1JFQVRFLCBuZXdOb2RlIH07XG4gICAgZWxzZSBpZiAoIW5ld05vZGUpIHJldHVybiB7IHR5cGU6IENoYW5nZVR5cGUuUkVNT1ZFIH07XG4gICAgZWxzZSBpZiAoaXNDaGFuZ2VkKG5ld05vZGUsIG9sZE5vZGUpKSByZXR1cm4geyB0eXBlOiBDaGFuZ2VUeXBlLlJFUExBQ0UsIG5ld05vZGUgfTtcbiAgICBlbHNlIGlmIChuZXdOb2RlLmVsZW1lbnROYW1lKVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogQ2hhbmdlVHlwZS5VUERBVEUsXG4gICAgICAgICAgICBjaGlsZHJlbjogZGlmZkNoaWxkcmVuKG5ld05vZGUsIG9sZE5vZGUpLFxuICAgICAgICAgICAgYXR0cmlidXRlczogZGlmZkF0dHJpYnV0ZXMobmV3Tm9kZSwgb2xkTm9kZSksXG4gICAgICAgICAgICBldmVudHM6IGRpZmZFdmVudHMobmV3Tm9kZSwgb2xkTm9kZSlcbiAgICAgICAgfTtcbn1cblxuZnVuY3Rpb24gaXNDaGFuZ2VkKG5ld05vZGUsIG9sZE5vZGUpIHtcbiAgICByZXR1cm4gdHlwZW9mIG5ld05vZGUgIT09IHR5cGVvZiBvbGROb2RlIHx8XG4gICAgICAgIHR5cGVvZiBuZXdOb2RlICE9PSBcIm9iamVjdFwiICYmIG5ld05vZGUgIT09IG9sZE5vZGUgfHxcbiAgICAgICAgdHlwZW9mIG5ld05vZGUgPT09IFwib2JqZWN0XCIgJiYgbmV3Tm9kZS5lbGVtZW50TmFtZSAhPT0gb2xkTm9kZS5lbGVtZW50TmFtZVxufVxuXG5cbmZ1bmN0aW9uIGRpZmZFdmVudHMobmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIGNvbnN0IHBhdGNoZXMgID0gW107XG4gICAgY29uc3QgYXR0cmlidXRlcyA9IHsuLi5vbGROb2RlLmF0dHJpYnV0ZXMsIC4uLm5ld05vZGUuYXR0cmlidXRlc307XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcylcbiAgICAgICAgLmZpbHRlcihhdHRyTmFtZSA9PiBFdmVudFR5cGUuaW5jbHVkZXMoYXR0ck5hbWUpKVxuICAgICAgICAuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmV3SGFuZGxlciA9IG5ld05vZGUuYXR0cmlidXRlc1tldmVudE5hbWVdO1xuICAgICAgICAgICAgY29uc3Qgb2xkSGFuZGxlciA9IG9sZE5vZGUuYXR0cmlidXRlc1tldmVudE5hbWVdO1xuICAgICAgICAgICAgaWYgKCFuZXdIYW5kbGVyKVxuICAgICAgICAgICAgICAgIHJldHVybiBwYXRjaGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlLlJFTU9WRV9FVkVOVF9MSVNURU5FUixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG9sZEhhbmRsZXIsIGV2ZW50TmFtZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZWxzZSBpZiAoIW9sZEhhbmRsZXIpXG4gICAgICAgICAgICAgICAgcGF0Y2hlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogQ2hhbmdlVHlwZS5BRERfRVZFTlRfTElTVEVORVIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBuZXdIYW5kbGVyLCBldmVudE5hbWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGVsc2UgcGF0Y2hlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogQ2hhbmdlVHlwZS5VUERBVEVfRVZFTlRfTElTVEVORVIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBuZXdIYW5kbGVyLCBvbGRWYWx1ZTogb2xkSGFuZGxlciwgZXZlbnROYW1lXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIHJldHVybiBwYXRjaGVzO1xufVxuXG5mdW5jdGlvbiBkaWZmQXR0cmlidXRlcyhuZXdOb2RlLCBvbGROb2RlKSB7XG4gICAgY29uc3QgcGF0Y2hlcyAgPSBbXTtcbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gey4uLm9sZE5vZGUuYXR0cmlidXRlcywgLi4ubmV3Tm9kZS5hdHRyaWJ1dGVzfTtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKVxuICAgICAgICAuZmlsdGVyKGF0dHJOYW1lID0+ICFFdmVudFR5cGUuaW5jbHVkZXMoYXR0ck5hbWUpKVxuICAgICAgICAuZm9yRWFjaChhdHRyTmFtZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXdBdHRyID0gbmV3Tm9kZS5hdHRyaWJ1dGVzW2F0dHJOYW1lXTtcbiAgICAgICAgICAgIGNvbnN0IG9sZEF0dHIgPSBvbGROb2RlLmF0dHJpYnV0ZXNbYXR0ck5hbWVdO1xuICAgICAgICAgICAgIW5ld0F0dHIgJiYgcGF0Y2hlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlLlJFTU9WRV9QUk9QUyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogb2xkQXR0ciwgYXR0ck5hbWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgKCFvbGRBdHRyIHx8IG9sZEF0dHIgIT09IG5ld0F0dHIpICYmIHBhdGNoZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogQ2hhbmdlVHlwZS5TRVRfUFJPUFMsXG4gICAgICAgICAgICAgICAgdmFsdWU6IG5ld0F0dHIsIGF0dHJOYW1lXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgcmV0dXJuIHBhdGNoZXM7XG59XG5cblxuZnVuY3Rpb24gZGlmZkNoaWxkcmVuKG5ld05vZGUsIG9sZE5vZGUpIHtcbiAgICBjb25zdCBuZXdDaGlsZCA9IG5ld05vZGUuY2hpbGRyZW4gfHwgW107XG4gICAgY29uc3Qgb2xkQ2hpbGQgPSBvbGROb2RlLmNoaWxkcmVuIHx8IFtdO1xuICAgIHJldHVybiBbLi4uQXJyYXkoTWF0aC5tYXgoXG4gICAgICAgIG5ld0NoaWxkLmxlbmd0aCwgb2xkQ2hpbGQubGVuZ3RoXG4gICAgKSkua2V5cygpXS5tYXAoaSA9PiBkaWZmKG5ld0NoaWxkW2ldLCBvbGRDaGlsZFtpXSkpO1xufVxuXG5cbmV4cG9ydCB7XG4gICAgZGlmZlxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS9kaWZmL2luZGV4LmpzIiwiXG5pbXBvcnQgeyBDaGFuZ2VUeXBlIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gJy4uL2NyZWF0ZS9pbmRleCc7XG5pbXBvcnQgeyBzZXRBdHRyaWJ1dGUsIHJlbW92ZUF0dHJpYnV0ZSB9IGZyb20gXCIuLi91dGlscy9pbmRleFwiO1xuXG5cblxuZnVuY3Rpb24gcGF0Y2gocGFyZW50LCBwYXRjaGVzLCBpbmRleD0wKSB7XG4gICAgaWYgKCFwYXRjaGVzKSByZXR1cm47XG4gICAgY29uc3QgZWwgPSBwYXJlbnQuY2hpbGROb2Rlc1tpbmRleF07XG4gICAgc3dpdGNoIChwYXRjaGVzLnR5cGUpIHtcbiAgICAgICAgY2FzZSBDaGFuZ2VUeXBlLkNSRUFURToge1xuICAgICAgICAgICAgY29uc3QgeyBuZXdOb2RlIH0gPSBwYXRjaGVzO1xuICAgICAgICAgICAgY29uc3QgbmV3RWwgPSBjcmVhdGVFbGVtZW50KG5ld05vZGUpO1xuICAgICAgICAgICAgaWYgKGluZGV4ID09PSBwYXJlbnQuY2hpbGROb2Rlcy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKG5ld0VsKTtcbiAgICAgICAgICAgIGVsc2UgcGFyZW50Lmluc2VydEJlZm9yZShuZXdFbCwgZWwpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBDaGFuZ2VUeXBlLlJFTU9WRToge1xuICAgICAgICAgICAgaWYgKCFlbCkgcmV0dXJuO1xuICAgICAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQ2hhbmdlVHlwZS5SRVBMQUNFOiB7XG4gICAgICAgICAgICBjb25zdCB7IG5ld05vZGUgfSA9IHBhdGNoZXM7XG4gICAgICAgICAgICBjb25zdCBuZXdFbCA9IGNyZWF0ZUVsZW1lbnQobmV3Tm9kZSk7XG4gICAgICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKG5ld0VsLCBlbCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENoYW5nZVR5cGUuVVBEQVRFOiB7XG4gICAgICAgICAgICBjb25zdCB7IGNoaWxkcmVuLCBhdHRyaWJ1dGVzLCBldmVudHMgfSA9IHBhdGNoZXM7XG4gICAgICAgICAgICBwYXRjaEF0dHJpYnV0ZXMoZWwsIGF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgcGF0Y2hFdmVudHMoZWwsIGV2ZW50cyk7XG4gICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZCwgaW5kZXgpID0+IHBhdGNoKGVsLCBjaGlsZCwgaW5kZXgpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBwYXRjaEV2ZW50cyhlbCwgZXZlbnRzKSB7XG4gICAgZXZlbnRzLmZvckVhY2gocGF0Y2ggPT4ge1xuICAgICAgICBjb25zdCB7IHR5cGUsIHZhbHVlLCBvbGRWYWx1ZSwgZXZlbnROYW1lIH0gPSBwYXRjaDtcbiAgICAgICAgaWYgKHR5cGUgPT09IENoYW5nZVR5cGUuQUREX0VWRU5UX0xJU1RFTkVSKVxuICAgICAgICAgICAgcmV0dXJuIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCB2YWx1ZSk7XG4gICAgICAgIGlmICh0eXBlID09PSBDaGFuZ2VUeXBlLlJFTU9WRV9FVkVOVF9MSVNURU5FUilcbiAgICAgICAgICAgIHJldHVybiBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgb2xkVmFsdWUpO1xuICAgICAgICBpZiAodHlwZSA9PT0gQ2hhbmdlVHlwZS5VUERBVEVfRVZFTlRfTElTVEVORVIpIHtcbiAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBvbGRWYWx1ZSk7XG4gICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gcGF0Y2hBdHRyaWJ1dGVzKGVsZW1lbnQsIGF0dHJpYnV0ZXMpIHtcbiAgICBhdHRyaWJ1dGVzLmZvckVhY2gocGF0Y2ggPT4ge1xuICAgICAgICBjb25zdCB7IHR5cGUsIGF0dHJOYW1lLCB2YWx1ZSB9ID0gcGF0Y2g7XG4gICAgICAgIGlmICh0eXBlID09PSBDaGFuZ2VUeXBlLlNFVF9QUk9QUylcbiAgICAgICAgICAgIHNldEF0dHJpYnV0ZShlbGVtZW50LCBhdHRyTmFtZSwgdmFsdWUpO1xuICAgICAgICBlbHNlIGlmICh0eXBlID09PSBDaGFuZ2VUeXBlLlJFTU9WRV9QUk9QUylcbiAgICAgICAgICAgIHJlbW92ZUF0dHJpYnV0ZShlbGVtZW50LCBhdHRyTmFtZSwgdmFsdWUpXG4gICAgfSlcbn1cblxuXG5leHBvcnQge1xuICAgIHBhdGNoXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS9wYXRjaC9pbmRleC5qcyIsIlxuaW1wb3J0IE9ic2VydmVyIGZyb20gJy4vb2JqZWN0JztcbmltcG9ydCBPYnNlcnZlckFycmF5IGZyb20gJy4vYXJyYXknO1xuaW1wb3J0IHsgd2Fsaywgb2JzZXJ2ZXIgfSBmcm9tICcuL3V0aWxzJztcblxuXG5leHBvcnQge1xuICAgIE9ic2VydmVyLFxuICAgIE9ic2VydmVyQXJyYXksXG4gICAgd2Fsaywgb2JzZXJ2ZXJcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvb2JzZXJ2ZXIvaW5kZXguanMiLCJcbmltcG9ydCB7IHdhbGssIG9ic2VydmVyIH0gZnJvbSAnLi4vdXRpbHMvaW5kZXgnXG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPYnNlcnZlciB7XG4gICAgY29uc3RydWN0b3Iob2JqLCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUeXBlIFwiT2JqZWN0XCIgcmVxdWlyZWQhJyk7XG4gICAgICAgIHdhbGsob2JqLCAoa2V5LCB2YWx1ZSkgPT4gb2JzZXJ2ZXIoXG4gICAgICAgICAgICB0aGlzLCBrZXksIHZhbHVlLFxuICAgICAgICAgICAgc2V0dGVyQ2FsbGJhY2ssXG4gICAgICAgICAgICBnZXR0ZXJDYWxsYmFja1xuICAgICAgICApKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZnJvbSA9IChvYmosIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFjaykgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmVyKFxuICAgICAgICAgICAgb2JqLFxuICAgICAgICAgICAgc2V0dGVyQ2FsbGJhY2ssXG4gICAgICAgICAgICBnZXR0ZXJDYWxsYmFja1xuICAgICAgICApXG4gICAgfTtcblxuICAgIHN0YXRpYyB0b1N0cmluZyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGBPYnNlcnZlciAke3RoaXN9YFxuICAgIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL29ic2VydmVyL29iamVjdC9pbmRleC5qcyIsIlxuaW1wb3J0IE9ic2VydmVyIGZyb20gJy4uL29iamVjdCc7XG5pbXBvcnQgT2JzZXJ2ZXJBcnJheSBmcm9tICcuLi9hcnJheSc7XG5cblxuY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xuXG5cblxuZnVuY3Rpb24gd2FsayhvYmosIGZ1bikge1xuICAgIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JylcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRnVuY3Rpb24gXCJ3YWxrXCIgcmVxdWlyZSBhbiBcIm9iamVjdFwiIGluc3RlYWQgb2YgJHt0eXBlb2Ygb2JqfWApO1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpXG4gICAgICAgIHJldHVybiBvYmouZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IGZ1bihpbmRleCwgaXRlbSwgb2JqKSk7XG4gICAgZWxzZVxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiBmdW4oa2V5LCBvYmpba2V5XSwgb2JqKSk7XG59XG5cbmZ1bmN0aW9uIG9ic2VydmVyKG9iaiwga2V5LCB2YWx1ZSwgc2V0dGVyQ2FsbGJhY2s9bm9vcCwgZ2V0dGVyQ2FsbGJhY2s9bm9vcCkge1xuICAgIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JylcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRnVuY3Rpb24gXCJvYnNlcnZlclwiIHJlcXVpcmUgYW4gXCJvYmplY3RcIiBpbnN0ZWFkIG9mICR7dHlwZW9mIG9ian1gKTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSlcbiAgICAgICAgdmFsdWUgPSBPYnNlcnZlckFycmF5LmZyb20odmFsdWUsIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFjayk7XG4gICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKVxuICAgICAgICB2YWx1ZSA9IE9ic2VydmVyLmZyb20odmFsdWUsIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFjayk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBnZXQ6ICgpID0+IHtcbiAgICAgICAgICAgIGdldHRlckNhbGxiYWNrKG9iaiwga2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWVcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBuZXdWYWx1ZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvbGRWYWx1ZSA9IG9ialtrZXldO1xuICAgICAgICAgICAgb2JzZXJ2ZXIob2JqLCBrZXksIG5ld1ZhbHVlLCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spO1xuICAgICAgICAgICAgc2V0dGVyQ2FsbGJhY2sob2JqLCBrZXksIG5ld1ZhbHVlLCBvbGRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5cbmNvbnN0IGdldFVuaXF1ZUlEID0gZnVuY3Rpb24oKSB7XG4gICAgbGV0IGlkID0gMDtcbiAgICByZXR1cm4gKCgpID0+IGlkICsrKTtcbn0oKTtcblxuXG5leHBvcnQge1xuICAgIHdhbGssXG4gICAgb2JzZXJ2ZXIsXG4gICAgZ2V0VW5pcXVlSURcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvb2JzZXJ2ZXIvdXRpbHMvaW5kZXguanMiLCJcbmltcG9ydCB7IHdhbGssIG9ic2VydmVyIH0gZnJvbSAnLi4vdXRpbHMvaW5kZXgnO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2JzZXJ2ZXJBcnJheSB7XG4gICAgY29uc3RydWN0b3IoYXJyYXksIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFjaykge1xuICAgICAgICAhYXJyYXkgJiYgKGFycmF5ID0gW10pO1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyYXkpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVHlwZSBcIkFycmF5XCIgcmVxdWlyZWQhJyk7XG4gICAgICAgIHdhbGsoYXJyYXksIChpbmRleCwgaXRlbSkgPT4gb2JzZXJ2ZXIoXG4gICAgICAgICAgICB0aGlzLCBpbmRleCwgaXRlbSxcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFja1xuICAgICAgICApKTtcbiAgICAgICAgdGhpcy5sZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgZnJvbSA9IChhcnJheSwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2ZXJBcnJheShcbiAgICAgICAgICAgIGFycmF5LFxuICAgICAgICAgICAgc2V0dGVyQ2FsbGJhY2ssXG4gICAgICAgICAgICBnZXR0ZXJDYWxsYmFja1xuICAgICAgICApXG4gICAgfTtcbiAgICBzdGF0aWMgaXNPYnNlcnZlckFycmF5ICA9IGFycmF5ID0+IHtcbiAgICAgICAgcmV0dXJuIGFycmF5Ll9fcHJvdG9fXy5jb25zdHJ1Y3RvciA9PT0gT2JzZXJ2ZXJBcnJheTtcbiAgICB9O1xuICAgIHN0YXRpYyBvZiA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2ZXJBcnJheShbLi4uYXJnc10pXG4gICAgfTtcblxuXG4gICAgY29uY2F0ID0gKC4uLmFycmF5cykgPT4ge1xuICAgICAgICBjb25zdCBuZXdBcnJheSA9IG5ldyBPYnNlcnZlckFycmF5KCk7XG4gICAgICAgIFt0aGlzLCAuLi5hcnJheXNdLmZvckVhY2goXG4gICAgICAgICAgICBhcnJheSA9PiBhcnJheS5mb3JFYWNoKG5ld0FycmF5LnB1c2gpXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBuZXdBcnJheTtcbiAgICB9O1xuICAgIGNvcHlXaXRoaW4gPSAoLi4uYXJncykgPT4ge1xuICAgICAgICAvLyBUT0RPXG4gICAgICAgIHJldHVybiBPYnNlcnZlckFycmF5LmZyb20oXG4gICAgICAgICAgICBBcnJheS5mcm9tKHRoaXMpLmNvcHlXaXRoaW4oLi4uYXJncylcbiAgICAgICAgKVxuICAgIH07XG4gICAgZW50cmllcyA9IGZ1bmN0aW9uICooKSB7XG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIHdoaWxlICh0aGlzW2luZGV4XSlcbiAgICAgICAgICAgIHlpZWxkIFtpbmRleCsrLCB0aGlzW2luZGV4XV07XG4gICAgfTtcbiAgICBldmVyeSA9ICgpID0+IHt9O1xuICAgIGZpbGwgPSAoKSA9PiB7fTtcbiAgICBmaWx0ZXIgPSAoKSA9PiB7fTtcbiAgICBmaW5kID0gKCkgPT4ge307XG4gICAgZmluZEluZGV4ID0gKCkgPT4ge307XG4gICAgZm9yRWFjaCA9ICgpID0+IHt9O1xuICAgIGluY2x1ZGVzID0gKCkgPT4ge307XG4gICAgaW5kZXhPZiA9ICgpID0+IHt9O1xuICAgIGpvaW4gPSAoKSA9PiB7fTtcbiAgICBrZXlzID0gKCkgPT4ge307XG4gICAgbGFzdEluZGV4T2YgPSAoKSA9PiB7fTtcbiAgICBtYXAgPSAoKSA9PiB7fTtcbiAgICBwb3AgPSAoKSA9PiB7fTtcbiAgICBwdXNoID0gdmFsdWUgPT4ge1xuICAgICAgICBvYnNlcnZlcihcbiAgICAgICAgICAgIHRoaXMsIHRoaXMubGVuZ3RoLCB2YWx1ZSxcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFja1xuICAgICAgICApO1xuICAgICAgICB0aGlzLmxlbmd0aCArKztcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gICAgcmVkdWNlID0gKCkgPT4ge307XG4gICAgcmVkdWNlUmlnaHQgPSAoKSA9PiB7fTtcbiAgICByZXZlcnNlID0gKCkgPT4ge307XG4gICAgc2hpZnQgPSAoKSA9PiB7fTtcbiAgICBzbGljZSA9ICgpID0+IHt9O1xuICAgIHNvbWUgPSAoKSA9PiB7fTtcbiAgICBzb3J0ID0gKCkgPT4ge307XG4gICAgc3BsaWNlID0gKCkgPT4ge307XG4gICAgdG9Mb2NhbGVTdHJpbmcgPSAoKSA9PiB7fTtcbiAgICB0b1NvdXJjZSA9ICgpID0+IHt9O1xuICAgIHRvU3RyaW5nID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gYE9ic2VydmVyQXJyYXkgWy4uLl1gXG4gICAgfTtcbiAgICB1bnNoaWZ0ID0gKCkgPT4ge307XG4gICAgdmFsdWVzID0gKCkgPT4ge307XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL29ic2VydmVyL2FycmF5L2luZGV4LmpzIiwiXG5mdW5jdGlvbiBmbGF0dGVuTm9kZShub2RlKSB7XG4gICAgaWYgKCFub2RlKSByZXR1cm47XG4gICAgaWYgKG5vZGUuY2hpbGRyZW4pXG4gICAgICAgIG5vZGUuY2hpbGRyZW4gPSBmbGF0dGVuQ2hpbGRyZW4obm9kZS5jaGlsZHJlbik7XG4gICAgcmV0dXJuIG5vZGVcbn1cblxuZnVuY3Rpb24gZmxhdHRlbkNoaWxkcmVuKGNoaWxkcmVuKSB7XG4gICAgcmV0dXJuIFtdLmNvbmNhdCguLi5jaGlsZHJlbilcbiAgICAgICAgLm1hcChub2RlID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygbm9kZSA9PT0gJ29iamVjdCcpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZsYXR0ZW5Ob2RlKG5vZGUpO1xuICAgICAgICAgICAgZWxzZSByZXR1cm4gbm9kZTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZpbHRlcihub2RlID0+ICEhbm9kZSk7XG59XG5cblxuZXhwb3J0IHtcbiAgICBmbGF0dGVuTm9kZVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS91dGlscy9pbmRleC5qcyIsIlxuaW1wb3J0IHsgTXVzZSB9IGZyb20gJy4uL2luZGV4JztcblxuXG5cbmNsYXNzIEFwcCBleHRlbmRzIE11c2Uge1xuICAgIHN0YXRlID0ge1xuICAgICAgICBuYW1lOiAnSm9lJyxcbiAgICAgICAgYWdlOiAyMixcbiAgICAgICAgbGFuZ3M6IFtcbiAgICAgICAgICAgICdKYXZhU2NyaXB0JyxcbiAgICAgICAgICAgICdQeXRob24nLFxuICAgICAgICAgICAgJ1J1c3QnLFxuICAgICAgICAgICAgJ1NjYWxhJ1xuICAgICAgICBdXG4gICAgfVxuXG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICAgIGlzQWdlT2RkKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuYWdlICUgMiAhPT0gMFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc3RhdGUuYWdlICsrO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHsgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxoMT5IZWxsbyE8L2gxPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICBtb2RlbD17dGhpcy5zdGF0ZS5uYW1lfVxuICAgICAgICAgICAgICAgIG9uS2V5VXA9eygpID0+IGNvbnNvbGUubG9nKHRoaXMuc3RhdGUubmFtZSl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHA+TXkgbmFtZSBpcyB7dGhpcy5zdGF0ZS5uYW1lfS48L3A+XG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBJJ20ge3RoaXMuc3RhdGUuYWdlfSB5ZWFycyBvbGRcbiAgICAgICAgICAgICAgICA8c3BhbiBpZj17dGhpcy5jb21wdXRlZC5pc0FnZU9kZH0+IGFuZCBpdCdzIGFuIG9kZCBudW1iZXIuPC9zcGFuPlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPHA+QW5kIEkgY2FuIHRob3NlIHByb2dyYW1taW5nIGxhbmd1YWdlczo8L3A+XG4gICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgPGxpIGZvcj17bGFuZyBpbiB0aGlzLnN0YXRlLmxhbmdzfT57bGFuZ308L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+Q2xpY2sgTWU8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgKX1cbn1cblxuXG5cbmNvbnN0IGFwcCA9IG5ldyBBcHAoKTtcbmFwcC5yZW5kZXJUbyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2V4YW1wbGUvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9