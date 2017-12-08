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
            langs: ['JavaScript', 'Python', 'Rust', 'Scala'],
            showHello: true
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
            children: [this.state.showHello ? {
                elementName: 'h1',
                attributes: {},
                children: ['Hello!']
            } : null, {
                elementName: 'input',
                attributes: {
                    type: 'password',
                    value: this.state.name,
                    onChange: e => this.state.name = e.target.value
                },
                children: null
            }, {
                elementName: 'input',
                attributes: {
                    type: 'checkbox',
                    checked: !!this.state.showHello,
                    onChange: e => this.state.showHello = !!e.target.checked
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjQzNmI1YmYxZWU3OWExMGFmMWQiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9jcmVhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdHlwZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdHlwZXMvY2hhbmdlLmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3R5cGVzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9kaWZmL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3BhdGNoL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvb2JzZXJ2ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci9vYmplY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci91dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL29ic2VydmVyL2FycmF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZXhhbXBsZS9pbmRleC5qcyJdLCJuYW1lcyI6WyJNdXNlIiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJlbnRyeSIsIm5vZGUiLCJzdGF0ZSIsImNvbXB1dGVkIiwiY29tcG9uZW50V2lsbE1vdW50IiwiY29tcG9uZW50RGlkTW91bnQiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwic2hvdWxkQ29tcG9uZW50VXBkYXRlIiwiY29tcG9uZW50V2lsbFVwZGF0ZSIsImNvbXBvbmVudERpZFVwZGF0ZSIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwiY29tcG9uZW50RGlkQ2F0Y2giLCJpbml0T2JzZXJ2ZXIiLCJmcm9tIiwic2V0dGVyQ2FsbGJhY2siLCJpbml0Q29tcHV0ZWQiLCJuYW1lIiwiZ2V0dGVyIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwiZ2V0Iiwib2JqIiwia2V5IiwidmFsdWUiLCJvbGRWYWx1ZSIsIkVycm9yIiwiZGlmZkFuZFBhdGNoIiwiYmVmb3JlUmVuZGVyIiwicmVuZGVyIiwicmVuZGVyVG8iLCJhcHBlbmRDaGlsZCIsIm9sZE5vZGUiLCJwYXRjaGVzIiwiY3JlYXRlRWxlbWVudCIsImRpZmYiLCJwYXRjaCIsInV0aWxzIiwiZWwiLCJkb2N1bWVudCIsImVsZW1lbnROYW1lIiwiY2hpbGRyZW4iLCJhcHBlbmRDaGlsZHJlbiIsImF0dHJpYnV0ZXMiLCJjcmVhdGVUZXh0Tm9kZSIsInRhcmdldCIsIm1hcCIsImZvckVhY2giLCJzZXRBdHRyaWJ1dGVzIiwia2V5cyIsImZpbHRlciIsImhhc093blByb3BlcnR5IiwiYXR0ck5hbWUiLCJzZXRBdHRyaWJ1dGUiLCJhdHRyVmFsdWUiLCJpbmNsdWRlcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVBdHRyaWJ1dGUiLCJvbGRBdHRyVmFsdWUiLCJpbnNlcnRBZnRlciIsIm5ld0VsIiwidGFyZ2V0RWwiLCJwYXJlbnRFbCIsInBhcmVudE5vZGUiLCJsYXN0Q2hpbGQiLCJpbnNlcnRCZWZvcmUiLCJuZXh0U2libGluZyIsIkNoYW5nZVR5cGUiLCJFdmVudFR5cGUiLCJFdmVudE1hcCIsIkNoYW5nZWQiLCJDUkVBVEUiLCJSRU1PVkUiLCJSRVBMQUNFIiwiVVBEQVRFIiwiU0VUX1BST1BTIiwiUkVNT1ZFX1BST1BTIiwiQUREX0VWRU5UX0xJU1RFTkVSIiwiVVBEQVRFX0VWRU5UX0xJU1RFTkVSIiwiUkVNT1ZFX0VWRU5UX0xJU1RFTkVSIiwicmVkdWNlIiwiZXZlbnRzTWFwIiwiZXZlbnQiLCJyZXBsYWNlIiwiZSIsInRvTG93ZXJDYXNlIiwibmV3Tm9kZSIsInR5cGUiLCJpc0NoYW5nZWQiLCJkaWZmQ2hpbGRyZW4iLCJkaWZmQXR0cmlidXRlcyIsImV2ZW50cyIsImRpZmZFdmVudHMiLCJldmVudE5hbWUiLCJuZXdIYW5kbGVyIiwib2xkSGFuZGxlciIsInB1c2giLCJuZXdBdHRyIiwib2xkQXR0ciIsIm5ld0NoaWxkIiwib2xkQ2hpbGQiLCJBcnJheSIsIk1hdGgiLCJtYXgiLCJsZW5ndGgiLCJpIiwicGFyZW50IiwiaW5kZXgiLCJjaGlsZE5vZGVzIiwicmVtb3ZlQ2hpbGQiLCJyZXBsYWNlQ2hpbGQiLCJwYXRjaEF0dHJpYnV0ZXMiLCJwYXRjaEV2ZW50cyIsImNoaWxkIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImVsZW1lbnQiLCJPYnNlcnZlciIsIk9ic2VydmVyQXJyYXkiLCJ3YWxrIiwib2JzZXJ2ZXIiLCJnZXR0ZXJDYWxsYmFjayIsIlR5cGVFcnJvciIsInRvU3RyaW5nIiwibm9vcCIsImZ1biIsImlzQXJyYXkiLCJpdGVtIiwic2V0IiwibmV3VmFsdWUiLCJnZXRVbmlxdWVJRCIsImlkIiwiYXJyYXkiLCJpc09ic2VydmVyQXJyYXkiLCJfX3Byb3RvX18iLCJvZiIsImFyZ3MiLCJjb25jYXQiLCJhcnJheXMiLCJuZXdBcnJheSIsImNvcHlXaXRoaW4iLCJlbnRyaWVzIiwiZXZlcnkiLCJmaWxsIiwiZmluZCIsImZpbmRJbmRleCIsImluZGV4T2YiLCJqb2luIiwibGFzdEluZGV4T2YiLCJwb3AiLCJyZWR1Y2VSaWdodCIsInJldmVyc2UiLCJzaGlmdCIsInNsaWNlIiwic29tZSIsInNvcnQiLCJzcGxpY2UiLCJ0b0xvY2FsZVN0cmluZyIsInRvU291cmNlIiwidW5zaGlmdCIsInZhbHVlcyIsImZsYXR0ZW5Ob2RlIiwiZmxhdHRlbkNoaWxkcmVuIiwiQXBwIiwiYWdlIiwibGFuZ3MiLCJzaG93SGVsbG8iLCJpc0FnZU9kZCIsImhhbmRsZUNsaWNrIiwibGFuZyIsImFwcCIsImdldEVsZW1l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QUkzSSxRQUFKLENBQWFTLFNBQVNtSSxjQUFULENBQXdCLE1BQXhCLENBQWIsRSIsImZpbGUiOiJleGFtcGxlLmJ1aWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Fzc2V0cy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxNSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZjQzNmI1YmYxZWU3OWExMGFmMWQiLCJcbmltcG9ydCBNdXNlIGZyb20gJy4vY29yZSc7XG5cblxuXG5leHBvcnQge1xuICAgIE11c2Vcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2luZGV4LmpzIiwiXG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBkaWZmLCBwYXRjaCB9IGZyb20gJy4vZG9tJztcbmltcG9ydCB7IE9ic2VydmVyLCBvYnNlcnZlciwgd2FsayB9IGZyb20gJy4vb2JzZXJ2ZXInO1xuaW1wb3J0IHsgZmxhdHRlbk5vZGUgfSBmcm9tICcuL3V0aWxzJ1xuXG5cblxuY2xhc3MgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBlbnRyeSA9IG51bGw7XG4gICAgbm9kZSA9IG51bGw7XG4gICAgc3RhdGUgPSB7fTtcbiAgICBjb21wdXRlZCA9IHt9O1xuXG4gICAgLy8gVE9ETzogTGlmZUN5Y2xlXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge307XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7fTtcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKCkge307XG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH07XG4gICAgY29tcG9uZW50V2lsbFVwZGF0ZSgpIHt9O1xuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHt9O1xuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge307XG4gICAgY29tcG9uZW50RGlkQ2F0Y2goKSB7fTtcblxuICAgIC8vIE9ic2VydmVyXG4gICAgaW5pdE9ic2VydmVyKCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gT2JzZXJ2ZXIuZnJvbShcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgfHwge30sXG4gICAgICAgICAgICA6OnRoaXMuc2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKTtcbiAgICB9O1xuICAgIGluaXRDb21wdXRlZCgpIHtcbiAgICAgICAgd2FsayhcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZWQsXG4gICAgICAgICAgICAobmFtZSwgZ2V0dGVyLCBjb21wdXRlZCkgPT4ge1xuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb21wdXRlZCwgbmFtZSwge1xuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBnZXQ6IHRoaXM6OmdldHRlclxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9XG4gICAgc2V0dGVyQ2FsbGJhY2sob2JqLCBrZXksIHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAob2JqICE9PSB0aGlzLnN0YXRlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCT09NISEhJyk7XG4gICAgICAgIHRoaXMuZGlmZkFuZFBhdGNoKCk7XG4gICAgfTtcblxuICAgIC8vIFJlbmRlclxuICAgIGJlZm9yZVJlbmRlcigpIHtcbiAgICAgICAgdGhpcy5pbml0T2JzZXJ2ZXIoKTtcbiAgICAgICAgdGhpcy5pbml0Q29tcHV0ZWQoKTtcbiAgICB9O1xuICAgIHJlbmRlcigpIHt9O1xuICAgIHJlbmRlclRvKGVudHJ5KSB7XG4gICAgICAgIHRoaXMuYmVmb3JlUmVuZGVyKCk7XG4gICAgICAgIHRoaXMubm9kZSA9IGZsYXR0ZW5Ob2RlKHRoaXMucmVuZGVyKCkpO1xuICAgICAgICB0aGlzLmVudHJ5ID0gZW50cnk7XG4gICAgICAgIHRoaXMuZW50cnkuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudCh0aGlzLm5vZGUpKVxuICAgIH07XG4gICAgZGlmZkFuZFBhdGNoKCkge1xuICAgICAgICBjb25zdCBvbGROb2RlID0gdGhpcy5ub2RlO1xuICAgICAgICB0aGlzLm5vZGUgPSBmbGF0dGVuTm9kZSh0aGlzLnJlbmRlcigpKTtcbiAgICAgICAgY29uc3QgcGF0Y2hlcyA9IGRpZmYodGhpcy5ub2RlLCBvbGROb2RlKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cob2xkTm9kZSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMubm9kZSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHBhdGNoZXMpO1xuICAgICAgICBwYXRjaCh0aGlzLmVudHJ5LCBwYXRjaGVzKTtcbiAgICB9O1xufVxuXG5cblxuZXhwb3J0IGRlZmF1bHQgQ29tcG9uZW50O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9pbmRleC5qcyIsIlxuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gJy4vY3JlYXRlJztcbmltcG9ydCB7IGRpZmYgfSBmcm9tICcuL2RpZmYnO1xuaW1wb3J0IHsgcGF0Y2ggfSBmcm9tICcuL3BhdGNoJztcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzJztcblxuXG5leHBvcnQge1xuICAgIGNyZWF0ZUVsZW1lbnQsXG4gICAgZGlmZixcbiAgICBwYXRjaCxcbiAgICB1dGlsc1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vaW5kZXguanMiLCJcbmltcG9ydCB7IHNldEF0dHJpYnV0ZXMgfSBmcm9tICcuLi91dGlscyc7XG5cblxuXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KG5vZGUpIHtcbiAgICAvKlxuICAgIG5vZGU6IFN0cmluZyB8fCB7XG4gICAgICAgIGVsZW1lbnROYW1lOiBTdHJpbmdcbiAgICAgICAgY2hpbGRyZW46IG5vZGVbXVxuICAgICAgICBhdHRyaWJ1dGVzOiBPYmplY3RcbiAgICB9XG4gICAgKi9cbiAgICBpZiAodHlwZW9mIG5vZGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChub2RlLmVsZW1lbnROYW1lKTtcbiAgICAgICAgbm9kZS5jaGlsZHJlbiAmJiBhcHBlbmRDaGlsZHJlbihlbCwgbm9kZS5jaGlsZHJlbik7XG4gICAgICAgIHNldEF0dHJpYnV0ZXMoZWwsIG5vZGUuYXR0cmlidXRlcyk7XG4gICAgICAgIHJldHVybiBlbDtcbiAgICB9XG4gICAgZWxzZSByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobm9kZSk7XG59XG5cblxuZnVuY3Rpb24gYXBwZW5kQ2hpbGRyZW4odGFyZ2V0LCBjaGlsZHJlbikge1xuICAgIGNoaWxkcmVuLm1hcChjcmVhdGVFbGVtZW50KVxuICAgICAgICAuZm9yRWFjaCg6OnRhcmdldC5hcHBlbmRDaGlsZClcbn1cblxuXG5cbmV4cG9ydCB7XG4gICAgY3JlYXRlRWxlbWVudFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vY3JlYXRlL2luZGV4LmpzIiwiXG5pbXBvcnQgeyBFdmVudFR5cGUsIEV2ZW50TWFwIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5cblxuZnVuY3Rpb24gc2V0QXR0cmlidXRlcyh0YXJnZXQsIGF0dHJpYnV0ZXM9e30pIHtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKVxuICAgICAgICAuZmlsdGVyKGtleSA9PiBhdHRyaWJ1dGVzLmhhc093blByb3BlcnR5KGtleSkpXG4gICAgICAgIC5mb3JFYWNoKGF0dHJOYW1lID0+IHNldEF0dHJpYnV0ZSh0YXJnZXQsIGF0dHJOYW1lLCBhdHRyaWJ1dGVzW2F0dHJOYW1lXSkpO1xufVxuXG5cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZSh0YXJnZXQsIGF0dHJOYW1lLCBhdHRyVmFsdWUpIHtcbiAgICBhdHRyTmFtZSA9PT0gJ2NsYXNzTmFtZScgJiYgKGF0dHJOYW1lID0gJ2NsYXNzJyk7XG4gICAgaWYgKEV2ZW50VHlwZS5pbmNsdWRlcyhhdHRyTmFtZSkpXG4gICAgICAgIHJldHVybiB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgIEV2ZW50TWFwW2F0dHJOYW1lXSxcbiAgICAgICAgICAgIGF0dHJWYWx1ZVxuICAgICAgICApO1xuICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGF0dHJWYWx1ZSk7XG59XG5cblxuZnVuY3Rpb24gcmVtb3ZlQXR0cmlidXRlKHRhcmdldCwgYXR0ck5hbWUsIG9sZEF0dHJWYWx1ZSkge1xuICAgIGF0dHJOYW1lID09PSAnY2xhc3NOYW1lJyAmJiAoYXR0ck5hbWUgPSAnY2xhc3MnKTtcbiAgICBpZiAoRXZlbnRUeXBlLmluY2x1ZGVzKGF0dHJOYW1lKSlcbiAgICAgICAgcmV0dXJuIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgRXZlbnRNYXBbYXR0ck5hbWVdLFxuICAgICAgICAgICAgb2xkQXR0clZhbHVlXG4gICAgICAgICk7XG4gICAgdGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZShhdHRyTmFtZSk7XG59XG5cblxuZnVuY3Rpb24gaW5zZXJ0QWZ0ZXIobmV3RWwsIHRhcmdldEVsKSB7XG4gICAgY29uc3QgcGFyZW50RWwgPSB0YXJnZXRFbC5wYXJlbnROb2RlO1xuICAgIGlmIChwYXJlbnRFbC5sYXN0Q2hpbGQgPT09IHRhcmdldEVsKVxuICAgICAgICByZXR1cm4gcGFyZW50RWwuYXBwZW5kQ2hpbGQobmV3RWwpO1xuICAgIHJldHVybiBwYXJlbnRFbC5pbnNlcnRCZWZvcmUobmV3RWwsdGFyZ2V0RWwubmV4dFNpYmxpbmcpO1xufVxuXG5cbmV4cG9ydCB7XG4gICAgc2V0QXR0cmlidXRlcyxcbiAgICBzZXRBdHRyaWJ1dGUsXG4gICAgcmVtb3ZlQXR0cmlidXRlLFxuICAgIGluc2VydEFmdGVyXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS91dGlscy9pbmRleC5qcyIsIlxuaW1wb3J0IENoYW5nZVR5cGUgZnJvbSAnLi9jaGFuZ2UnO1xuaW1wb3J0IHsgRXZlbnRUeXBlLCBFdmVudE1hcCB9IGZyb20gJy4vZXZlbnRzJztcblxuZXhwb3J0IHtcbiAgICBDaGFuZ2VUeXBlLFxuICAgIEV2ZW50VHlwZSxcbiAgICBFdmVudE1hcFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vdHlwZXMvaW5kZXguanMiLCJcbmNvbnN0IENoYW5nZWQgPSB7XG4gICAgQ1JFQVRFOiAnQ1JFQVRFJyxcbiAgICBSRU1PVkU6ICdSRU1PVkUnLFxuICAgIFJFUExBQ0U6ICdSRVBMQUNFJyxcbiAgICBVUERBVEU6ICdVUERBVEUnLFxuXG4gICAgU0VUX1BST1BTOiAnU0VUIFBST1BTJyxcbiAgICBSRU1PVkVfUFJPUFM6ICdSRU1PVkUgUFJPUFMnLFxuXG4gICAgQUREX0VWRU5UX0xJU1RFTkVSOiAnQUREIEVWRU5UIExJU1RFTkVSJyxcbiAgICBVUERBVEVfRVZFTlRfTElTVEVORVI6ICdVUERBVEUgRVZFTlQgTElTVEVORVInLFxuICAgIFJFTU9WRV9FVkVOVF9MSVNURU5FUjogJ1JFTU9WRSBFVkVOVCBMSVNURU5FUicsXG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IENoYW5nZWQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS90eXBlcy9jaGFuZ2UuanMiLCJcbmNvbnN0IEV2ZW50VHlwZSA9IFtcbiAgICAvLyBDbGlwYm9hcmQgRXZlbnRzXG4gICAgJ29uQ29weScsICdvbkN1dCcsICdvblBhc3RlJyxcbiAgICAvLyBDb21wb3NpdGlvbiBFdmVudHNcbiAgICAnb25Db21wb3NpdGlvbkVuZCcsICdvbkNvbXBvc2l0aW9uU3RhcnQnLCAnb25Db21wb3NpdGlvblVwZGF0ZScsXG4gICAgLy8gS2V5Ym9hcmQgRXZlbnRzXG4gICAgJ29uS2V5RG93bicsICdvbktleVByZXNzJywgJ29uS2V5VXAnLFxuICAgIC8vIEZvY3VzIEV2ZW50c1xuICAgICdvbkZvY3VzJywgJ29uQmx1cicsXG4gICAgLy8gRm9ybSBFdmVudHNcbiAgICAnb25DaGFuZ2UnLCAnb25JbnB1dCcsICdvbkludmFsaWQnLCAnb25TdWJtaXQnLFxuICAgIC8vIE1vdXNlIEV2ZW50c1xuICAgICdvbkNsaWNrJywgJ29uQ29udGV4dE1lbnUnLCAnb25Eb3VibGVDbGljaycsXG4gICAgJ29uRHJhZycsICdvbkRyYWdFbmQnLCAnb25EcmFnRW50ZXInLCAnb25EcmFnRXhpdCcsXG4gICAgJ29uRHJhZ0xlYXZlJywgJ29uRHJhZ092ZXInLCAnb25EcmFnU3RhcnQnLFxuICAgICdvbkRyb3AnLCAnb25Nb3VzZURvd24nLCAnb25Nb3VzZUVudGVyJyxcbiAgICAnb25Nb3VzZUxlYXZlJywgJ29uTW91c2VNb3ZlJywgJ29uTW91c2VPdXQnLFxuICAgICdvbk1vdXNlT3ZlcicgLCdvbk1vdXNlVXAnLFxuICAgIC8vIFNlbGVjdGlvbiBFdmVudHNcbiAgICAnb25TZWxlY3QnLFxuICAgIC8vIFRvdWNoIEV2ZW50c1xuICAgICdvblRvdWNoQ2FuY2VsJywgJ29uVG91Y2hFbmQnLCAnb25Ub3VjaE1vdmUnLCAnb25Ub3VjaFN0YXJ0JyxcbiAgICAvLyBVSSBFdmVudHNcbiAgICAnb25TY3JvbGwnLFxuICAgIC8vIFdoZWVsIEV2ZW50c1xuICAgICdvbldoZWVsJyxcbiAgICAvLyBNZWRpYSBFdmVudHNcbiAgICAnb25BYm9ydCcsICdvbkNhblBsYXknLCAnb25DYW5QbGF5VGhyb3VnaCcsXG4gICAgJ29uRHVyYXRpb25DaGFuZ2UnLCAnb25FbXB0aWVkJywgJ29uRW5jcnlwdGVkb25FbmRlZCcsXG4gICAgJ29uRXJyb3InLCAnb25Mb2FkZWREYXRhJywgJ29uTG9hZGVkTWV0YWRhdGEnLFxuICAgICdvbkxvYWRTdGFydCcsICdvblBhdXNlJywgJ29uUGxheW9uUGxheWluZycsXG4gICAgJ29uUHJvZ3Jlc3MnLCAnb25SYXRlQ2hhbmdlJywgJ29uU2Vla2VkJyxcbiAgICAnb25TZWVraW5nJywgJ29uU3RhbGxlZCcsICdvblN1c3BlbmRvblRpbWVVcGRhdGUnLFxuICAgICdvblZvbHVtZUNoYW5nZScsICdvbldhaXRpbmcnLFxuICAgIC8vIEltYWdlIEV2ZW50c1xuICAgICdvbkxvYWQnLCAnb25FcnJvcicsXG4gICAgLy8gQW5pbWF0aW9uIEV2ZW50c1xuICAgICdvbkFuaW1hdGlvblN0YXJ0JywgJ29uQW5pbWF0aW9uRW5kJywgJ29uQW5pbWF0aW9uSXRlcmF0aW9uJyxcbiAgICAvLyBUcmFuc2l0aW9uIEV2ZW50c1xuICAgICdvblRyYW5zaXRpb25FbmQnLFxuICAgIC8vIE90aGVyIEV2ZW50c1xuICAgICdvblRvZ2dsZSdcbl07XG5cblxuY29uc3QgRXZlbnRNYXAgPSBFdmVudFR5cGUucmVkdWNlKChldmVudHNNYXAsIGV2ZW50KSA9PiB7XG4gICAgZXZlbnRzTWFwW2V2ZW50XSA9IGV2ZW50XG4gICAgICAgIC5yZXBsYWNlKCdvbicsICcnKVxuICAgICAgICAucmVwbGFjZSgvW0EtWl0vZywgZSA9PiBlLnRvTG93ZXJDYXNlKCkpO1xuICAgIHJldHVybiBldmVudHNNYXA7XG59LCB7fSk7XG5cblxuZXhwb3J0IHtcbiAgICBFdmVudFR5cGUsXG4gICAgRXZlbnRNYXBcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3R5cGVzL2V2ZW50cy5qcyIsIlxuaW1wb3J0IHsgQ2hhbmdlVHlwZSwgRXZlbnRUeXBlIH0gZnJvbSAnLi4vdHlwZXMvaW5kZXgnO1xuXG5cblxuZnVuY3Rpb24gZGlmZihuZXdOb2RlLCBvbGROb2RlKSB7XG4gICAgLypcbiAgICByZXR1cm4gdHlwZSBQYXRjaCB7XG4gICAgICAgIHR5cGU6IENoYW5nZVR5cGVcbiAgICAgICAgbmV3Tm9kZT86IE5vZGVcbiAgICAgICAgY2hpbGRyZW4/OiBQYXRjaFtdXG4gICAgICAgIGF0dHJpYnV0ZXM/OiBQYXRjaFtdXG4gICAgfVxuICAgICAqL1xuICAgIGlmICghb2xkTm9kZSkgcmV0dXJuIHsgdHlwZTogQ2hhbmdlVHlwZS5DUkVBVEUsIG5ld05vZGUgfTtcbiAgICBlbHNlIGlmICghbmV3Tm9kZSkgcmV0dXJuIHsgdHlwZTogQ2hhbmdlVHlwZS5SRU1PVkUgfTtcbiAgICBlbHNlIGlmIChpc0NoYW5nZWQobmV3Tm9kZSwgb2xkTm9kZSkpIHJldHVybiB7IHR5cGU6IENoYW5nZVR5cGUuUkVQTEFDRSwgbmV3Tm9kZSB9O1xuICAgIGVsc2UgaWYgKG5ld05vZGUuZWxlbWVudE5hbWUpXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlLlVQREFURSxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBkaWZmQ2hpbGRyZW4obmV3Tm9kZSwgb2xkTm9kZSksXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBkaWZmQXR0cmlidXRlcyhuZXdOb2RlLCBvbGROb2RlKSxcbiAgICAgICAgICAgIGV2ZW50czogZGlmZkV2ZW50cyhuZXdOb2RlLCBvbGROb2RlKVxuICAgICAgICB9O1xufVxuXG5mdW5jdGlvbiBpc0NoYW5nZWQobmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIHJldHVybiB0eXBlb2YgbmV3Tm9kZSAhPT0gdHlwZW9mIG9sZE5vZGUgfHxcbiAgICAgICAgdHlwZW9mIG5ld05vZGUgIT09IFwib2JqZWN0XCIgJiYgbmV3Tm9kZSAhPT0gb2xkTm9kZSB8fFxuICAgICAgICB0eXBlb2YgbmV3Tm9kZSA9PT0gXCJvYmplY3RcIiAmJiBuZXdOb2RlLmVsZW1lbnROYW1lICE9PSBvbGROb2RlLmVsZW1lbnROYW1lXG59XG5cblxuZnVuY3Rpb24gZGlmZkV2ZW50cyhuZXdOb2RlLCBvbGROb2RlKSB7XG4gICAgY29uc3QgcGF0Y2hlcyAgPSBbXTtcbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gey4uLm9sZE5vZGUuYXR0cmlidXRlcywgLi4ubmV3Tm9kZS5hdHRyaWJ1dGVzfTtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKVxuICAgICAgICAuZmlsdGVyKGF0dHJOYW1lID0+IEV2ZW50VHlwZS5pbmNsdWRlcyhhdHRyTmFtZSkpXG4gICAgICAgIC5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXdIYW5kbGVyID0gbmV3Tm9kZS5hdHRyaWJ1dGVzW2V2ZW50TmFtZV07XG4gICAgICAgICAgICBjb25zdCBvbGRIYW5kbGVyID0gb2xkTm9kZS5hdHRyaWJ1dGVzW2V2ZW50TmFtZV07XG4gICAgICAgICAgICBpZiAoIW5ld0hhbmRsZXIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhdGNoZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IENoYW5nZVR5cGUuUkVNT1ZFX0VWRU5UX0xJU1RFTkVSLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogb2xkSGFuZGxlciwgZXZlbnROYW1lXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlbHNlIGlmICghb2xkSGFuZGxlcilcbiAgICAgICAgICAgICAgICBwYXRjaGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlLkFERF9FVkVOVF9MSVNURU5FUixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG5ld0hhbmRsZXIsIGV2ZW50TmFtZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZWxzZSBwYXRjaGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlLlVQREFURV9FVkVOVF9MSVNURU5FUixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG5ld0hhbmRsZXIsIG9sZFZhbHVlOiBvbGRIYW5kbGVyLCBldmVudE5hbWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgcmV0dXJuIHBhdGNoZXM7XG59XG5cbmZ1bmN0aW9uIGRpZmZBdHRyaWJ1dGVzKG5ld05vZGUsIG9sZE5vZGUpIHtcbiAgICBjb25zdCBwYXRjaGVzICA9IFtdO1xuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSB7Li4ub2xkTm9kZS5hdHRyaWJ1dGVzLCAuLi5uZXdOb2RlLmF0dHJpYnV0ZXN9O1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpXG4gICAgICAgIC5maWx0ZXIoYXR0ck5hbWUgPT4gIUV2ZW50VHlwZS5pbmNsdWRlcyhhdHRyTmFtZSkpXG4gICAgICAgIC5mb3JFYWNoKGF0dHJOYW1lID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0F0dHIgPSBuZXdOb2RlLmF0dHJpYnV0ZXNbYXR0ck5hbWVdO1xuICAgICAgICAgICAgY29uc3Qgb2xkQXR0ciA9IG9sZE5vZGUuYXR0cmlidXRlc1thdHRyTmFtZV07XG4gICAgICAgICAgICAhbmV3QXR0ciAmJiBwYXRjaGVzLnB1c2goe1xuICAgICAgICAgICAgICAgIHR5cGU6IENoYW5nZVR5cGUuUkVNT1ZFX1BST1BTLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBvbGRBdHRyLCBhdHRyTmFtZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAoIW9sZEF0dHIgfHwgb2xkQXR0ciAhPT0gbmV3QXR0cikgJiYgcGF0Y2hlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlLlNFVF9QUk9QUyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogbmV3QXR0ciwgYXR0ck5hbWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICByZXR1cm4gcGF0Y2hlcztcbn1cblxuXG5mdW5jdGlvbiBkaWZmQ2hpbGRyZW4obmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIGNvbnN0IG5ld0NoaWxkID0gbmV3Tm9kZS5jaGlsZHJlbiB8fCBbXTtcbiAgICBjb25zdCBvbGRDaGlsZCA9IG9sZE5vZGUuY2hpbGRyZW4gfHwgW107XG4gICAgcmV0dXJuIFsuLi5BcnJheShNYXRoLm1heChcbiAgICAgICAgbmV3Q2hpbGQubGVuZ3RoLCBvbGRDaGlsZC5sZW5ndGhcbiAgICApKS5rZXlzKCldLm1hcChpID0+IGRpZmYobmV3Q2hpbGRbaV0sIG9sZENoaWxkW2ldKSk7XG59XG5cblxuZXhwb3J0IHtcbiAgICBkaWZmXG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL2RpZmYvaW5kZXguanMiLCJcbmltcG9ydCB7IENoYW5nZVR5cGUgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSAnLi4vY3JlYXRlL2luZGV4JztcbmltcG9ydCB7IHNldEF0dHJpYnV0ZSwgcmVtb3ZlQXR0cmlidXRlIH0gZnJvbSBcIi4uL3V0aWxzL2luZGV4XCI7XG5cblxuXG5mdW5jdGlvbiBwYXRjaChwYXJlbnQsIHBhdGNoZXMsIGluZGV4PTApIHtcbiAgICBpZiAoIXBhdGNoZXMpIHJldHVybjtcbiAgICBjb25zdCBlbCA9IHBhcmVudC5jaGlsZE5vZGVzW2luZGV4XTtcbiAgICBzd2l0Y2ggKHBhdGNoZXMudHlwZSkge1xuICAgICAgICBjYXNlIENoYW5nZVR5cGUuQ1JFQVRFOiB7XG4gICAgICAgICAgICBjb25zdCB7IG5ld05vZGUgfSA9IHBhdGNoZXM7XG4gICAgICAgICAgICBjb25zdCBuZXdFbCA9IGNyZWF0ZUVsZW1lbnQobmV3Tm9kZSk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IHBhcmVudC5jaGlsZE5vZGVzLmxlbmd0aClcbiAgICAgICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQobmV3RWwpO1xuICAgICAgICAgICAgZWxzZSBwYXJlbnQuaW5zZXJ0QmVmb3JlKG5ld0VsLCBlbCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENoYW5nZVR5cGUuUkVNT1ZFOiB7XG4gICAgICAgICAgICBpZiAoIWVsKSByZXR1cm47XG4gICAgICAgICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBDaGFuZ2VUeXBlLlJFUExBQ0U6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgbmV3Tm9kZSB9ID0gcGF0Y2hlcztcbiAgICAgICAgICAgIGNvbnN0IG5ld0VsID0gY3JlYXRlRWxlbWVudChuZXdOb2RlKTtcbiAgICAgICAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQobmV3RWwsIGVsKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQ2hhbmdlVHlwZS5VUERBVEU6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgY2hpbGRyZW4sIGF0dHJpYnV0ZXMsIGV2ZW50cyB9ID0gcGF0Y2hlcztcbiAgICAgICAgICAgIHBhdGNoQXR0cmlidXRlcyhlbCwgYXR0cmlidXRlcyk7XG4gICAgICAgICAgICBwYXRjaEV2ZW50cyhlbCwgZXZlbnRzKTtcbiAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goKGNoaWxkLCBpbmRleCkgPT4gcGF0Y2goZWwsIGNoaWxkLCBpbmRleCkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBhdGNoRXZlbnRzKGVsLCBldmVudHMpIHtcbiAgICBldmVudHMuZm9yRWFjaChwYXRjaCA9PiB7XG4gICAgICAgIGNvbnN0IHsgdHlwZSwgdmFsdWUsIG9sZFZhbHVlLCBldmVudE5hbWUgfSA9IHBhdGNoO1xuICAgICAgICBpZiAodHlwZSA9PT0gQ2hhbmdlVHlwZS5BRERfRVZFTlRfTElTVEVORVIpXG4gICAgICAgICAgICByZXR1cm4gZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIHZhbHVlKTtcbiAgICAgICAgaWYgKHR5cGUgPT09IENoYW5nZVR5cGUuUkVNT1ZFX0VWRU5UX0xJU1RFTkVSKVxuICAgICAgICAgICAgcmV0dXJuIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBvbGRWYWx1ZSk7XG4gICAgICAgIGlmICh0eXBlID09PSBDaGFuZ2VUeXBlLlVQREFURV9FVkVOVF9MSVNURU5FUikge1xuICAgICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIG9sZFZhbHVlKTtcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5mdW5jdGlvbiBwYXRjaEF0dHJpYnV0ZXMoZWxlbWVudCwgYXR0cmlidXRlcykge1xuICAgIGF0dHJpYnV0ZXMuZm9yRWFjaChwYXRjaCA9PiB7XG4gICAgICAgIGNvbnN0IHsgdHlwZSwgYXR0ck5hbWUsIHZhbHVlIH0gPSBwYXRjaDtcbiAgICAgICAgaWYgKHR5cGUgPT09IENoYW5nZVR5cGUuU0VUX1BST1BTKVxuICAgICAgICAgICAgc2V0QXR0cmlidXRlKGVsZW1lbnQsIGF0dHJOYW1lLCB2YWx1ZSk7XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT09IENoYW5nZVR5cGUuUkVNT1ZFX1BST1BTKVxuICAgICAgICAgICAgcmVtb3ZlQXR0cmlidXRlKGVsZW1lbnQsIGF0dHJOYW1lLCB2YWx1ZSlcbiAgICB9KVxufVxuXG5cbmV4cG9ydCB7XG4gICAgcGF0Y2hcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3BhdGNoL2luZGV4LmpzIiwiXG5pbXBvcnQgT2JzZXJ2ZXIgZnJvbSAnLi9vYmplY3QnO1xuaW1wb3J0IE9ic2VydmVyQXJyYXkgZnJvbSAnLi9hcnJheSc7XG5pbXBvcnQgeyB3YWxrLCBvYnNlcnZlciB9IGZyb20gJy4vdXRpbHMnO1xuXG5cbmV4cG9ydCB7XG4gICAgT2JzZXJ2ZXIsXG4gICAgT2JzZXJ2ZXJBcnJheSxcbiAgICB3YWxrLCBvYnNlcnZlclxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9vYnNlcnZlci9pbmRleC5qcyIsIlxuaW1wb3J0IHsgd2Fsaywgb2JzZXJ2ZXIgfSBmcm9tICcuLi91dGlscy9pbmRleCdcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9ic2VydmVyIHtcbiAgICBjb25zdHJ1Y3RvcihvYmosIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFjaykge1xuICAgICAgICBpZiAodHlwZW9mIG9iaiAhPT0gXCJvYmplY3RcIilcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1R5cGUgXCJPYmplY3RcIiByZXF1aXJlZCEnKTtcbiAgICAgICAgd2FsayhvYmosIChrZXksIHZhbHVlKSA9PiBvYnNlcnZlcihcbiAgICAgICAgICAgIHRoaXMsIGtleSwgdmFsdWUsXG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjayxcbiAgICAgICAgICAgIGdldHRlckNhbGxiYWNrXG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIHN0YXRpYyBmcm9tID0gKG9iaiwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2ZXIoXG4gICAgICAgICAgICBvYmosXG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjayxcbiAgICAgICAgICAgIGdldHRlckNhbGxiYWNrXG4gICAgICAgIClcbiAgICB9O1xuXG4gICAgc3RhdGljIHRvU3RyaW5nID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gYE9ic2VydmVyICR7dGhpc31gXG4gICAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvb2JzZXJ2ZXIvb2JqZWN0L2luZGV4LmpzIiwiXG5pbXBvcnQgT2JzZXJ2ZXIgZnJvbSAnLi4vb2JqZWN0JztcbmltcG9ydCBPYnNlcnZlckFycmF5IGZyb20gJy4uL2FycmF5JztcblxuXG5jb25zdCBub29wID0gKCkgPT4ge307XG5cblxuXG5mdW5jdGlvbiB3YWxrKG9iaiwgZnVuKSB7XG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBGdW5jdGlvbiBcIndhbGtcIiByZXF1aXJlIGFuIFwib2JqZWN0XCIgaW5zdGVhZCBvZiAke3R5cGVvZiBvYmp9YCk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSlcbiAgICAgICAgcmV0dXJuIG9iai5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4gZnVuKGluZGV4LCBpdGVtLCBvYmopKTtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IGZ1bihrZXksIG9ialtrZXldLCBvYmopKTtcbn1cblxuZnVuY3Rpb24gb2JzZXJ2ZXIob2JqLCBrZXksIHZhbHVlLCBzZXR0ZXJDYWxsYmFjaz1ub29wLCBnZXR0ZXJDYWxsYmFjaz1ub29wKSB7XG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBGdW5jdGlvbiBcIm9ic2VydmVyXCIgcmVxdWlyZSBhbiBcIm9iamVjdFwiIGluc3RlYWQgb2YgJHt0eXBlb2Ygb2JqfWApO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKVxuICAgICAgICB2YWx1ZSA9IE9ic2VydmVyQXJyYXkuZnJvbSh2YWx1ZSwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKTtcbiAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXG4gICAgICAgIHZhbHVlID0gT2JzZXJ2ZXIuZnJvbSh2YWx1ZSwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGdldDogKCkgPT4ge1xuICAgICAgICAgICAgZ2V0dGVyQ2FsbGJhY2sob2JqLCBrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICB9LFxuICAgICAgICBzZXQ6IG5ld1ZhbHVlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9sZFZhbHVlID0gb2JqW2tleV07XG4gICAgICAgICAgICBvYnNlcnZlcihvYmosIGtleSwgbmV3VmFsdWUsIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFjayk7XG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjayhvYmosIGtleSwgbmV3VmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0pXG59XG5cblxuY29uc3QgZ2V0VW5pcXVlSUQgPSBmdW5jdGlvbigpIHtcbiAgICBsZXQgaWQgPSAwO1xuICAgIHJldHVybiAoKCkgPT4gaWQgKyspO1xufSgpO1xuXG5cbmV4cG9ydCB7XG4gICAgd2FsayxcbiAgICBvYnNlcnZlcixcbiAgICBnZXRVbmlxdWVJRFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9vYnNlcnZlci91dGlscy9pbmRleC5qcyIsIlxuaW1wb3J0IHsgd2Fsaywgb2JzZXJ2ZXIgfSBmcm9tICcuLi91dGlscy9pbmRleCc7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPYnNlcnZlckFycmF5IHtcbiAgICBjb25zdHJ1Y3RvcihhcnJheSwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKSB7XG4gICAgICAgICFhcnJheSAmJiAoYXJyYXkgPSBbXSk7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShhcnJheSkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUeXBlIFwiQXJyYXlcIiByZXF1aXJlZCEnKTtcbiAgICAgICAgd2FsayhhcnJheSwgKGluZGV4LCBpdGVtKSA9PiBvYnNlcnZlcihcbiAgICAgICAgICAgIHRoaXMsIGluZGV4LCBpdGVtLFxuICAgICAgICAgICAgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrXG4gICAgICAgICkpO1xuICAgICAgICB0aGlzLmxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBmcm9tID0gKGFycmF5LCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZlckFycmF5KFxuICAgICAgICAgICAgYXJyYXksXG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjayxcbiAgICAgICAgICAgIGdldHRlckNhbGxiYWNrXG4gICAgICAgIClcbiAgICB9O1xuICAgIHN0YXRpYyBpc09ic2VydmVyQXJyYXkgID0gYXJyYXkgPT4ge1xuICAgICAgICByZXR1cm4gYXJyYXkuX19wcm90b19fLmNvbnN0cnVjdG9yID09PSBPYnNlcnZlckFycmF5O1xuICAgIH07XG4gICAgc3RhdGljIG9mID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZlckFycmF5KFsuLi5hcmdzXSlcbiAgICB9O1xuXG5cbiAgICBjb25jYXQgPSAoLi4uYXJyYXlzKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0FycmF5ID0gbmV3IE9ic2VydmVyQXJyYXkoKTtcbiAgICAgICAgW3RoaXMsIC4uLmFycmF5c10uZm9yRWFjaChcbiAgICAgICAgICAgIGFycmF5ID0+IGFycmF5LmZvckVhY2gobmV3QXJyYXkucHVzaClcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIG5ld0FycmF5O1xuICAgIH07XG4gICAgY29weVdpdGhpbiA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgIC8vIFRPRE9cbiAgICAgICAgcmV0dXJuIE9ic2VydmVyQXJyYXkuZnJvbShcbiAgICAgICAgICAgIEFycmF5LmZyb20odGhpcykuY29weVdpdGhpbiguLi5hcmdzKVxuICAgICAgICApXG4gICAgfTtcbiAgICBlbnRyaWVzID0gZnVuY3Rpb24gKigpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgd2hpbGUgKHRoaXNbaW5kZXhdKVxuICAgICAgICAgICAgeWllbGQgW2luZGV4KyssIHRoaXNbaW5kZXhdXTtcbiAgICB9O1xuICAgIGV2ZXJ5ID0gKCkgPT4ge307XG4gICAgZmlsbCA9ICgpID0+IHt9O1xuICAgIGZpbHRlciA9ICgpID0+IHt9O1xuICAgIGZpbmQgPSAoKSA9PiB7fTtcbiAgICBmaW5kSW5kZXggPSAoKSA9PiB7fTtcbiAgICBmb3JFYWNoID0gKCkgPT4ge307XG4gICAgaW5jbHVkZXMgPSAoKSA9PiB7fTtcbiAgICBpbmRleE9mID0gKCkgPT4ge307XG4gICAgam9pbiA9ICgpID0+IHt9O1xuICAgIGtleXMgPSAoKSA9PiB7fTtcbiAgICBsYXN0SW5kZXhPZiA9ICgpID0+IHt9O1xuICAgIG1hcCA9ICgpID0+IHt9O1xuICAgIHBvcCA9ICgpID0+IHt9O1xuICAgIHB1c2ggPSB2YWx1ZSA9PiB7XG4gICAgICAgIG9ic2VydmVyKFxuICAgICAgICAgICAgdGhpcywgdGhpcy5sZW5ndGgsIHZhbHVlLFxuICAgICAgICAgICAgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMubGVuZ3RoICsrO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICByZWR1Y2UgPSAoKSA9PiB7fTtcbiAgICByZWR1Y2VSaWdodCA9ICgpID0+IHt9O1xuICAgIHJldmVyc2UgPSAoKSA9PiB7fTtcbiAgICBzaGlmdCA9ICgpID0+IHt9O1xuICAgIHNsaWNlID0gKCkgPT4ge307XG4gICAgc29tZSA9ICgpID0+IHt9O1xuICAgIHNvcnQgPSAoKSA9PiB7fTtcbiAgICBzcGxpY2UgPSAoKSA9PiB7fTtcbiAgICB0b0xvY2FsZVN0cmluZyA9ICgpID0+IHt9O1xuICAgIHRvU291cmNlID0gKCkgPT4ge307XG4gICAgdG9TdHJpbmcgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBgT2JzZXJ2ZXJBcnJheSBbLi4uXWBcbiAgICB9O1xuICAgIHVuc2hpZnQgPSAoKSA9PiB7fTtcbiAgICB2YWx1ZXMgPSAoKSA9PiB7fTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvb2JzZXJ2ZXIvYXJyYXkvaW5kZXguanMiLCJcbmZ1bmN0aW9uIGZsYXR0ZW5Ob2RlKG5vZGUpIHtcbiAgICBpZiAoIW5vZGUpIHJldHVybjtcbiAgICBpZiAobm9kZS5jaGlsZHJlbilcbiAgICAgICAgbm9kZS5jaGlsZHJlbiA9IGZsYXR0ZW5DaGlsZHJlbihub2RlLmNoaWxkcmVuKTtcbiAgICByZXR1cm4gbm9kZVxufVxuXG5mdW5jdGlvbiBmbGF0dGVuQ2hpbGRyZW4oY2hpbGRyZW4pIHtcbiAgICByZXR1cm4gW10uY29uY2F0KC4uLmNoaWxkcmVuKVxuICAgICAgICAubWFwKG5vZGUgPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBub2RlID09PSAnb2JqZWN0JylcbiAgICAgICAgICAgICAgICByZXR1cm4gZmxhdHRlbk5vZGUobm9kZSk7XG4gICAgICAgICAgICBlbHNlIHJldHVybiBub2RlO1xuICAgICAgICB9KVxuICAgICAgICAuZmlsdGVyKG5vZGUgPT4gISFub2RlKTtcbn1cblxuXG5leHBvcnQge1xuICAgIGZsYXR0ZW5Ob2RlXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL3V0aWxzL2luZGV4LmpzIiwiXG5pbXBvcnQgeyBNdXNlIH0gZnJvbSAnLi4vaW5kZXgnO1xuXG5cblxuY2xhc3MgQXBwIGV4dGVuZHMgTXVzZSB7XG4gICAgc3RhdGUgPSB7XG4gICAgICAgIG5hbWU6ICdKb2UnLFxuICAgICAgICBhZ2U6IDIyLFxuICAgICAgICBsYW5nczogW1xuICAgICAgICAgICAgJ0phdmFTY3JpcHQnLFxuICAgICAgICAgICAgJ1B5dGhvbicsXG4gICAgICAgICAgICAnUnVzdCcsXG4gICAgICAgICAgICAnU2NhbGEnXG4gICAgICAgIF0sXG4gICAgICAgIHNob3dIZWxsbzogdHJ1ZVxuICAgIH1cblxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgICBpc0FnZU9kZCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmFnZSAlIDIgIT09IDBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnN0YXRlLmFnZSArKztcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7IHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8aDEgaWY9e3RoaXMuc3RhdGUuc2hvd0hlbGxvfT5IZWxsbyE8L2gxPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICBtb2RlbD17dGhpcy5zdGF0ZS5uYW1lfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBtb2RlbD17dGhpcy5zdGF0ZS5zaG93SGVsbG99Lz5cbiAgICAgICAgICAgIDxwPk15IG5hbWUgaXMge3RoaXMuc3RhdGUubmFtZX0uPC9wPlxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgSSdtIHt0aGlzLnN0YXRlLmFnZX0geWVhcnMgb2xkXG4gICAgICAgICAgICAgICAgPHNwYW4gaWY9e3RoaXMuY29tcHV0ZWQuaXNBZ2VPZGR9PiBhbmQgaXQncyBhbiBvZGQgbnVtYmVyLjwvc3Bhbj5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDxwPkFuZCBJIGNhbiB0aG9zZSBwcm9ncmFtbWluZyBsYW5ndWFnZXM6PC9wPlxuICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgIDxsaSBmb3I9e2xhbmcgaW4gdGhpcy5zdGF0ZS5sYW5nc30+e2xhbmd9PC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9PkNsaWNrIE1lPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICl9XG59XG5cblxuXG5jb25zdCBhcHAgPSBuZXcgQXBwKCk7XG5hcHAucmVuZGVyVG8oZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9leGFtcGxlL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==