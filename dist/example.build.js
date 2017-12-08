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
                    onChange: e => {
                        this.state.showHello = !!e.target.checked;

                        (() => console.log(this.state.showHello))(e);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTRjZjlhZDE1ZDQ3MThiOTBiYWQiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9jcmVhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdHlwZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdHlwZXMvY2hhbmdlLmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3R5cGVzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9kaWZmL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3BhdGNoL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvb2JzZXJ2ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci9vYmplY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci91dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL29ic2VydmVyL2FycmF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZXhhbXBsZS9pbmRleC5qcyJdLCJuYW1lcyI6WyJNdXNlIiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJlbnRyeSIsIm5vZGUiLCJzdGF0ZSIsImNvbXB1dGVkIiwiY29tcG9uZW50V2lsbE1vdW50IiwiY29tcG9uZW50RGlkTW91bnQiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwic2hvdWxkQ29tcG9uZW50VXBkYXRlIiwiY29tcG9uZW50V2lsbFVwZGF0ZSIsImNvbXBvbmVudERpZFVwZGF0ZSIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwiY29tcG9uZW50RGlkQ2F0Y2giLCJpbml0T2JzZXJ2ZXIiLCJmcm9tIiwic2V0dGVyQ2FsbGJhY2siLCJpbml0Q29tcHV0ZWQiLCJuYW1lIiwiZ2V0dGVyIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwiZ2V0Iiwib2JqIiwia2V5IiwidmFsdWUiLCJvbGRWYWx1ZSIsIkVycm9yIiwiZGlmZkFuZFBhdGNoIiwiYmVmb3JlUmVuZGVyIiwicmVuZGVyIiwicmVuZGVyVG8iLCJhcHBlbmRDaGlsZCIsIm9sZE5vZGUiLCJwYXRjaGVzIiwiY3JlYXRlRWxlbWVudCIsImRpZmYiLCJwYXRjaCIsInV0aWxzIiwiZWwiLCJkb2N1bWVudCIsImVsZW1lbnROYW1lIiwiY2hpbGRyZW4iLCJhcHBlbmRDaGlsZHJlbiIsImF0dHJpYnV0ZXMiLCJjcmVhdGVUZXh0Tm9kZSIsInRhcmdldCIsIm1hcCIsImZvckVhY2giLCJzZXRBdHRyaWJ1dGVzIiwia2V5cyIsImZpbHRlciIsImhhc093blByb3BlcnR5IiwiYXR0ck5hbWUiLCJzZXRBdHRyaWJ1dGUiLCJhdHRyVmFsdWUiLCJpbmNsdWRlcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVBdHRyaWJ1dGUiLCJvbGRBdHRyVmFsdWUiLCJpbnNlcnRBZnRlciIsIm5ld0VsIiwidGFyZ2V0RWwiLCJwYXJlbnRFbCIsInBhcmVudE5vZGUiLCJsYXN0Q2hpbGQiLCJpbnNlcnRCZWZvcmUiLCJuZXh0U2libGluZyIsIkNoYW5nZVR5cGUiLCJFdmVudFR5cGUiLCJFdmVudE1hcCIsIkNoYW5nZWQiLCJDUkVBVEUiLCJSRU1PVkUiLCJSRVBMQUNFIiwiVVBEQVRFIiwiU0VUX1BST1BTIiwiUkVNT1ZFX1BST1BTIiwiQUREX0VWRU5UX0xJU1RFTkVSIiwiVVBEQVRFX0VWRU5UX0xJU1RFTkVSIiwiUkVNT1ZFX0VWRU5UX0xJU1RFTkVSIiwicmVkdWNlIiwiZXZlbnRzTWFwIiwiZXZlbnQiLCJyZXBsYWNlIiwiZSIsInRvTG93ZXJDYXNlIiwibmV3Tm9kZSIsInR5cGUiLCJpc0NoYW5nZWQiLCJkaWZmQ2hpbGRyZW4iLCJkaWZmQXR0cmlidXRlcyIsImRpZmZFdmVudHMiLCJldmVudE5hbWUiLCJuZXdIYW5kbGVyIiwib2xkSGFuZGxlciIsInB1c2giLCJuZXdBdHRyIiwib2xkQXR0ciIsIm5ld0NoaWxkIiwib2xkQ2hpbGQiLCJBcnJheSIsIk1hdGgiLCJtYXgiLCJsZW5ndGgiLCJpIiwicGFyZW50IiwiaW5kZXgiLCJjaGlsZE5vZGVzIiwicmVtb3ZlQ2hpbGQiLCJyZXBsYWNlQ2hpbGQiLCJldmVudHMiLCJwYXRjaEF0dHJpYnV0ZXMiLCJjaGlsZCIsInBhdGNoRXZlbnRzIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImVsZW1lbnQiLCJPYnNlcnZlciIsIk9ic2VydmVyQXJyYXkiLCJ3YWxrIiwib2JzZXJ2ZXIiLCJnZXR0ZXJDYWxsYmFjayIsIlR5cGVFcnJvciIsInRvU3RyaW5nIiwibm9vcCIsImZ1biIsImlzQXJyYXkiLCJpdGVtIiwic2V0IiwibmV3VmFsdWUiLCJnZXRVbmlxdWVJRCIsImlkIiwiYXJyYXkiLCJpc09ic2VydmVyQXJyYXkiLCJfX3Byb3RvX18iLCJvZiIsImFyZ3MiLCJjb25jYXQiLCJhcnJheXMiLCJuZXdBcnJheSIsImNvcHlXaXRoaW4iLCJlbnRyaWVzIiwiZXZlcnkiLCJmaWxsIiwiZmluZCIsImZpbmRJbmRleCIsImluZGV4T2YiLCJqb2luIiwibGFzdEluZGV4T2YiLCJwb3AiLCJyZWR1Y2VSaWdodCIsInJldmVyc2UiLCJzaGlmdCIsInNsaWNlIiwic29tZSIsInNvcnQiLCJzcGxpY2UiLCJ0b0xvY2FsZVN0cmluZyIsInRvU291cmNlIiwidW5zaGlmdCIsInZhbHVlcyIsImZsYXR0ZW5Ob2RlIiwiZmxhdHRlbkNoaWxkcmVuIiwiQXBwIiwiYWdlIiwibGFuZ3MiLCJzaG93SGVsbG8iLCJpc0FnZU9kZCIsImhhbmRsZUNsaWNrIiwiY29uc29sZSIsImxvZyIsImxhbmci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QTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBDQVlZLEtBQUtwSyxLQUFMLENBQVdjLElBWnZCO0FBQUE7QUFBQTtBQUFBO0FBQUEsb0NBY00sS0FBS2QsS0FBTCxDQUFXa0ssR0FkakIsZ0JBZVcsS0FBS2pLLFFBQUwsQ0FBY29LLFFBZnpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHNDQW1Ca0IsS0FBS3JLLEtBQUwsQ0FBV21LLEtBbkI3QjtBQUFBO0FBQUE7QUFBQSwrQkFtQnFDTSxJQW5CckM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDZCQXFCYyxLQUFLSDtBQXJCbkI7QUFBQTtBQUFBO0FBQUE7QUF1QlQ7QUE5Q2lCLEM7OztBQW1EdkIsTUFBTUksTUFBTSxJQUFJVCxHQUFKLEVBQVo7QUFDQVMsSUFBSTdJLFFBQUosQ0FBYVMsU0FBU3FJLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBYixFIiwiZmlsZSI6ImV4YW1wbGUuYnVpbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYXNzZXRzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBhNGNmOWFkMTVkNDcxOGI5MGJhZCIsIlxuaW1wb3J0IE11c2UgZnJvbSAnLi9jb3JlJztcblxuXG5cbmV4cG9ydCB7XG4gICAgTXVzZVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vaW5kZXguanMiLCJcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIGRpZmYsIHBhdGNoIH0gZnJvbSAnLi9kb20nO1xuaW1wb3J0IHsgT2JzZXJ2ZXIsIG9ic2VydmVyLCB3YWxrIH0gZnJvbSAnLi9vYnNlcnZlcic7XG5pbXBvcnQgeyBmbGF0dGVuTm9kZSB9IGZyb20gJy4vdXRpbHMnXG5cblxuXG5jbGFzcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge31cblxuICAgIGVudHJ5ID0gbnVsbDtcbiAgICBub2RlID0gbnVsbDtcbiAgICBzdGF0ZSA9IHt9O1xuICAgIGNvbXB1dGVkID0ge307XG5cbiAgICAvLyBUT0RPOiBMaWZlQ3ljbGVcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7fTtcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHt9O1xuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKSB7fTtcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUoKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfTtcbiAgICBjb21wb25lbnRXaWxsVXBkYXRlKCkge307XG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge307XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7fTtcbiAgICBjb21wb25lbnREaWRDYXRjaCgpIHt9O1xuXG4gICAgLy8gT2JzZXJ2ZXJcbiAgICBpbml0T2JzZXJ2ZXIoKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBPYnNlcnZlci5mcm9tKFxuICAgICAgICAgICAgdGhpcy5zdGF0ZSB8fCB7fSxcbiAgICAgICAgICAgIDo6dGhpcy5zZXR0ZXJDYWxsYmFja1xuICAgICAgICApO1xuICAgIH07XG4gICAgaW5pdENvbXB1dGVkKCkge1xuICAgICAgICB3YWxrKFxuICAgICAgICAgICAgdGhpcy5jb21wdXRlZCxcbiAgICAgICAgICAgIChuYW1lLCBnZXR0ZXIsIGNvbXB1dGVkKSA9PiB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbXB1dGVkLCBuYW1lLCB7XG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGdldDogdGhpczo6Z2V0dGVyXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH1cbiAgICBzZXR0ZXJDYWxsYmFjayhvYmosIGtleSwgdmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmIChvYmogIT09IHRoaXMuc3RhdGUpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JPT00hISEnKTtcbiAgICAgICAgdGhpcy5kaWZmQW5kUGF0Y2goKTtcbiAgICB9O1xuXG4gICAgLy8gUmVuZGVyXG4gICAgYmVmb3JlUmVuZGVyKCkge1xuICAgICAgICB0aGlzLmluaXRPYnNlcnZlcigpO1xuICAgICAgICB0aGlzLmluaXRDb21wdXRlZCgpO1xuICAgIH07XG4gICAgcmVuZGVyKCkge307XG4gICAgcmVuZGVyVG8oZW50cnkpIHtcbiAgICAgICAgdGhpcy5iZWZvcmVSZW5kZXIoKTtcbiAgICAgICAgdGhpcy5ub2RlID0gZmxhdHRlbk5vZGUodGhpcy5yZW5kZXIoKSk7XG4gICAgICAgIHRoaXMuZW50cnkgPSBlbnRyeTtcbiAgICAgICAgdGhpcy5lbnRyeS5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KHRoaXMubm9kZSkpXG4gICAgfTtcbiAgICBkaWZmQW5kUGF0Y2goKSB7XG4gICAgICAgIGNvbnN0IG9sZE5vZGUgPSB0aGlzLm5vZGU7XG4gICAgICAgIHRoaXMubm9kZSA9IGZsYXR0ZW5Ob2RlKHRoaXMucmVuZGVyKCkpO1xuICAgICAgICBjb25zdCBwYXRjaGVzID0gZGlmZih0aGlzLm5vZGUsIG9sZE5vZGUpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhvbGROb2RlKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5ub2RlKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cocGF0Y2hlcyk7XG4gICAgICAgIHBhdGNoKHRoaXMuZW50cnksIHBhdGNoZXMpO1xuICAgIH07XG59XG5cblxuXG5leHBvcnQgZGVmYXVsdCBDb21wb25lbnQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2luZGV4LmpzIiwiXG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSAnLi9jcmVhdGUnO1xuaW1wb3J0IHsgZGlmZiB9IGZyb20gJy4vZGlmZic7XG5pbXBvcnQgeyBwYXRjaCB9IGZyb20gJy4vcGF0Y2gnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMnO1xuXG5cbmV4cG9ydCB7XG4gICAgY3JlYXRlRWxlbWVudCxcbiAgICBkaWZmLFxuICAgIHBhdGNoLFxuICAgIHV0aWxzXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS9pbmRleC5qcyIsIlxuaW1wb3J0IHsgc2V0QXR0cmlidXRlcyB9IGZyb20gJy4uL3V0aWxzJztcblxuXG5cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQobm9kZSkge1xuICAgIC8qXG4gICAgbm9kZTogU3RyaW5nIHx8IHtcbiAgICAgICAgZWxlbWVudE5hbWU6IFN0cmluZ1xuICAgICAgICBjaGlsZHJlbjogbm9kZVtdXG4gICAgICAgIGF0dHJpYnV0ZXM6IE9iamVjdFxuICAgIH1cbiAgICAqL1xuICAgIGlmICh0eXBlb2Ygbm9kZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5vZGUuZWxlbWVudE5hbWUpO1xuICAgICAgICBub2RlLmNoaWxkcmVuICYmIGFwcGVuZENoaWxkcmVuKGVsLCBub2RlLmNoaWxkcmVuKTtcbiAgICAgICAgc2V0QXR0cmlidXRlcyhlbCwgbm9kZS5hdHRyaWJ1dGVzKTtcbiAgICAgICAgcmV0dXJuIGVsO1xuICAgIH1cbiAgICBlbHNlIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShub2RlKTtcbn1cblxuXG5mdW5jdGlvbiBhcHBlbmRDaGlsZHJlbih0YXJnZXQsIGNoaWxkcmVuKSB7XG4gICAgY2hpbGRyZW4ubWFwKGNyZWF0ZUVsZW1lbnQpXG4gICAgICAgIC5mb3JFYWNoKDo6dGFyZ2V0LmFwcGVuZENoaWxkKVxufVxuXG5cblxuZXhwb3J0IHtcbiAgICBjcmVhdGVFbGVtZW50XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS9jcmVhdGUvaW5kZXguanMiLCJcbmltcG9ydCB7IEV2ZW50VHlwZSwgRXZlbnRNYXAgfSBmcm9tICcuLi90eXBlcyc7XG5cblxuXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzKHRhcmdldCwgYXR0cmlidXRlcz17fSkge1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpXG4gICAgICAgIC5maWx0ZXIoa2V5ID0+IGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoa2V5KSlcbiAgICAgICAgLmZvckVhY2goYXR0ck5hbWUgPT4gc2V0QXR0cmlidXRlKHRhcmdldCwgYXR0ck5hbWUsIGF0dHJpYnV0ZXNbYXR0ck5hbWVdKSk7XG59XG5cblxuZnVuY3Rpb24gc2V0QXR0cmlidXRlKHRhcmdldCwgYXR0ck5hbWUsIGF0dHJWYWx1ZSkge1xuICAgIGF0dHJOYW1lID09PSAnY2xhc3NOYW1lJyAmJiAoYXR0ck5hbWUgPSAnY2xhc3MnKTtcbiAgICBpZiAoRXZlbnRUeXBlLmluY2x1ZGVzKGF0dHJOYW1lKSlcbiAgICAgICAgcmV0dXJuIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgRXZlbnRNYXBbYXR0ck5hbWVdLFxuICAgICAgICAgICAgYXR0clZhbHVlXG4gICAgICAgICk7XG4gICAgdGFyZ2V0LnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKTtcbn1cblxuXG5mdW5jdGlvbiByZW1vdmVBdHRyaWJ1dGUodGFyZ2V0LCBhdHRyTmFtZSwgb2xkQXR0clZhbHVlKSB7XG4gICAgYXR0ck5hbWUgPT09ICdjbGFzc05hbWUnICYmIChhdHRyTmFtZSA9ICdjbGFzcycpO1xuICAgIGlmIChFdmVudFR5cGUuaW5jbHVkZXMoYXR0ck5hbWUpKVxuICAgICAgICByZXR1cm4gdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICBFdmVudE1hcFthdHRyTmFtZV0sXG4gICAgICAgICAgICBvbGRBdHRyVmFsdWVcbiAgICAgICAgKTtcbiAgICB0YXJnZXQucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcbn1cblxuXG5mdW5jdGlvbiBpbnNlcnRBZnRlcihuZXdFbCwgdGFyZ2V0RWwpIHtcbiAgICBjb25zdCBwYXJlbnRFbCA9IHRhcmdldEVsLnBhcmVudE5vZGU7XG4gICAgaWYgKHBhcmVudEVsLmxhc3RDaGlsZCA9PT0gdGFyZ2V0RWwpXG4gICAgICAgIHJldHVybiBwYXJlbnRFbC5hcHBlbmRDaGlsZChuZXdFbCk7XG4gICAgcmV0dXJuIHBhcmVudEVsLmluc2VydEJlZm9yZShuZXdFbCx0YXJnZXRFbC5uZXh0U2libGluZyk7XG59XG5cblxuZXhwb3J0IHtcbiAgICBzZXRBdHRyaWJ1dGVzLFxuICAgIHNldEF0dHJpYnV0ZSxcbiAgICByZW1vdmVBdHRyaWJ1dGUsXG4gICAgaW5zZXJ0QWZ0ZXJcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3V0aWxzL2luZGV4LmpzIiwiXG5pbXBvcnQgQ2hhbmdlVHlwZSBmcm9tICcuL2NoYW5nZSc7XG5pbXBvcnQgeyBFdmVudFR5cGUsIEV2ZW50TWFwIH0gZnJvbSAnLi9ldmVudHMnO1xuXG5leHBvcnQge1xuICAgIENoYW5nZVR5cGUsXG4gICAgRXZlbnRUeXBlLFxuICAgIEV2ZW50TWFwXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS90eXBlcy9pbmRleC5qcyIsIlxuY29uc3QgQ2hhbmdlZCA9IHtcbiAgICBDUkVBVEU6ICdDUkVBVEUnLFxuICAgIFJFTU9WRTogJ1JFTU9WRScsXG4gICAgUkVQTEFDRTogJ1JFUExBQ0UnLFxuICAgIFVQREFURTogJ1VQREFURScsXG5cbiAgICBTRVRfUFJPUFM6ICdTRVQgUFJPUFMnLFxuICAgIFJFTU9WRV9QUk9QUzogJ1JFTU9WRSBQUk9QUycsXG5cbiAgICBBRERfRVZFTlRfTElTVEVORVI6ICdBREQgRVZFTlQgTElTVEVORVInLFxuICAgIFVQREFURV9FVkVOVF9MSVNURU5FUjogJ1VQREFURSBFVkVOVCBMSVNURU5FUicsXG4gICAgUkVNT1ZFX0VWRU5UX0xJU1RFTkVSOiAnUkVNT1ZFIEVWRU5UIExJU1RFTkVSJyxcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgQ2hhbmdlZDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3R5cGVzL2NoYW5nZS5qcyIsIlxuY29uc3QgRXZlbnRUeXBlID0gW1xuICAgIC8vIENsaXBib2FyZCBFdmVudHNcbiAgICAnb25Db3B5JywgJ29uQ3V0JywgJ29uUGFzdGUnLFxuICAgIC8vIENvbXBvc2l0aW9uIEV2ZW50c1xuICAgICdvbkNvbXBvc2l0aW9uRW5kJywgJ29uQ29tcG9zaXRpb25TdGFydCcsICdvbkNvbXBvc2l0aW9uVXBkYXRlJyxcbiAgICAvLyBLZXlib2FyZCBFdmVudHNcbiAgICAnb25LZXlEb3duJywgJ29uS2V5UHJlc3MnLCAnb25LZXlVcCcsXG4gICAgLy8gRm9jdXMgRXZlbnRzXG4gICAgJ29uRm9jdXMnLCAnb25CbHVyJyxcbiAgICAvLyBGb3JtIEV2ZW50c1xuICAgICdvbkNoYW5nZScsICdvbklucHV0JywgJ29uSW52YWxpZCcsICdvblN1Ym1pdCcsXG4gICAgLy8gTW91c2UgRXZlbnRzXG4gICAgJ29uQ2xpY2snLCAnb25Db250ZXh0TWVudScsICdvbkRvdWJsZUNsaWNrJyxcbiAgICAnb25EcmFnJywgJ29uRHJhZ0VuZCcsICdvbkRyYWdFbnRlcicsICdvbkRyYWdFeGl0JyxcbiAgICAnb25EcmFnTGVhdmUnLCAnb25EcmFnT3ZlcicsICdvbkRyYWdTdGFydCcsXG4gICAgJ29uRHJvcCcsICdvbk1vdXNlRG93bicsICdvbk1vdXNlRW50ZXInLFxuICAgICdvbk1vdXNlTGVhdmUnLCAnb25Nb3VzZU1vdmUnLCAnb25Nb3VzZU91dCcsXG4gICAgJ29uTW91c2VPdmVyJyAsJ29uTW91c2VVcCcsXG4gICAgLy8gU2VsZWN0aW9uIEV2ZW50c1xuICAgICdvblNlbGVjdCcsXG4gICAgLy8gVG91Y2ggRXZlbnRzXG4gICAgJ29uVG91Y2hDYW5jZWwnLCAnb25Ub3VjaEVuZCcsICdvblRvdWNoTW92ZScsICdvblRvdWNoU3RhcnQnLFxuICAgIC8vIFVJIEV2ZW50c1xuICAgICdvblNjcm9sbCcsXG4gICAgLy8gV2hlZWwgRXZlbnRzXG4gICAgJ29uV2hlZWwnLFxuICAgIC8vIE1lZGlhIEV2ZW50c1xuICAgICdvbkFib3J0JywgJ29uQ2FuUGxheScsICdvbkNhblBsYXlUaHJvdWdoJyxcbiAgICAnb25EdXJhdGlvbkNoYW5nZScsICdvbkVtcHRpZWQnLCAnb25FbmNyeXB0ZWRvbkVuZGVkJyxcbiAgICAnb25FcnJvcicsICdvbkxvYWRlZERhdGEnLCAnb25Mb2FkZWRNZXRhZGF0YScsXG4gICAgJ29uTG9hZFN0YXJ0JywgJ29uUGF1c2UnLCAnb25QbGF5b25QbGF5aW5nJyxcbiAgICAnb25Qcm9ncmVzcycsICdvblJhdGVDaGFuZ2UnLCAnb25TZWVrZWQnLFxuICAgICdvblNlZWtpbmcnLCAnb25TdGFsbGVkJywgJ29uU3VzcGVuZG9uVGltZVVwZGF0ZScsXG4gICAgJ29uVm9sdW1lQ2hhbmdlJywgJ29uV2FpdGluZycsXG4gICAgLy8gSW1hZ2UgRXZlbnRzXG4gICAgJ29uTG9hZCcsICdvbkVycm9yJyxcbiAgICAvLyBBbmltYXRpb24gRXZlbnRzXG4gICAgJ29uQW5pbWF0aW9uU3RhcnQnLCAnb25BbmltYXRpb25FbmQnLCAnb25BbmltYXRpb25JdGVyYXRpb24nLFxuICAgIC8vIFRyYW5zaXRpb24gRXZlbnRzXG4gICAgJ29uVHJhbnNpdGlvbkVuZCcsXG4gICAgLy8gT3RoZXIgRXZlbnRzXG4gICAgJ29uVG9nZ2xlJ1xuXTtcblxuXG5jb25zdCBFdmVudE1hcCA9IEV2ZW50VHlwZS5yZWR1Y2UoKGV2ZW50c01hcCwgZXZlbnQpID0+IHtcbiAgICBldmVudHNNYXBbZXZlbnRdID0gZXZlbnRcbiAgICAgICAgLnJlcGxhY2UoJ29uJywgJycpXG4gICAgICAgIC5yZXBsYWNlKC9bQS1aXS9nLCBlID0+IGUudG9Mb3dlckNhc2UoKSk7XG4gICAgcmV0dXJuIGV2ZW50c01hcDtcbn0sIHt9KTtcblxuXG5leHBvcnQge1xuICAgIEV2ZW50VHlwZSxcbiAgICBFdmVudE1hcFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vdHlwZXMvZXZlbnRzLmpzIiwiXG5pbXBvcnQgeyBDaGFuZ2VUeXBlLCBFdmVudFR5cGUgfSBmcm9tICcuLi90eXBlcy9pbmRleCc7XG5cblxuXG5mdW5jdGlvbiBkaWZmKG5ld05vZGUsIG9sZE5vZGUpIHtcbiAgICAvKlxuICAgIHJldHVybiB0eXBlIFBhdGNoIHtcbiAgICAgICAgdHlwZTogQ2hhbmdlVHlwZVxuICAgICAgICBuZXdOb2RlPzogTm9kZVxuICAgICAgICBjaGlsZHJlbj86IFBhdGNoW11cbiAgICAgICAgYXR0cmlidXRlcz86IFBhdGNoW11cbiAgICB9XG4gICAgICovXG4gICAgaWYgKCFvbGROb2RlKSByZXR1cm4geyB0eXBlOiBDaGFuZ2VUeXBlLkNSRUFURSwgbmV3Tm9kZSB9O1xuICAgIGVsc2UgaWYgKCFuZXdOb2RlKSByZXR1cm4geyB0eXBlOiBDaGFuZ2VUeXBlLlJFTU9WRSB9O1xuICAgIGVsc2UgaWYgKGlzQ2hhbmdlZChuZXdOb2RlLCBvbGROb2RlKSkgcmV0dXJuIHsgdHlwZTogQ2hhbmdlVHlwZS5SRVBMQUNFLCBuZXdOb2RlIH07XG4gICAgZWxzZSBpZiAobmV3Tm9kZS5lbGVtZW50TmFtZSlcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IENoYW5nZVR5cGUuVVBEQVRFLFxuICAgICAgICAgICAgY2hpbGRyZW46IGRpZmZDaGlsZHJlbihuZXdOb2RlLCBvbGROb2RlKSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IGRpZmZBdHRyaWJ1dGVzKG5ld05vZGUsIG9sZE5vZGUpLFxuICAgICAgICAgICAgLy8gZXZlbnRzOiBkaWZmRXZlbnRzKG5ld05vZGUsIG9sZE5vZGUpXG4gICAgICAgIH07XG59XG5cbmZ1bmN0aW9uIGlzQ2hhbmdlZChuZXdOb2RlLCBvbGROb2RlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBuZXdOb2RlICE9PSB0eXBlb2Ygb2xkTm9kZSB8fFxuICAgICAgICB0eXBlb2YgbmV3Tm9kZSAhPT0gXCJvYmplY3RcIiAmJiBuZXdOb2RlICE9PSBvbGROb2RlIHx8XG4gICAgICAgIHR5cGVvZiBuZXdOb2RlID09PSBcIm9iamVjdFwiICYmIG5ld05vZGUuZWxlbWVudE5hbWUgIT09IG9sZE5vZGUuZWxlbWVudE5hbWVcbn1cblxuXG5mdW5jdGlvbiBkaWZmRXZlbnRzKG5ld05vZGUsIG9sZE5vZGUpIHtcbiAgICBjb25zdCBwYXRjaGVzICA9IFtdO1xuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSB7Li4ub2xkTm9kZS5hdHRyaWJ1dGVzLCAuLi5uZXdOb2RlLmF0dHJpYnV0ZXN9O1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpXG4gICAgICAgIC5maWx0ZXIoYXR0ck5hbWUgPT4gRXZlbnRUeXBlLmluY2x1ZGVzKGF0dHJOYW1lKSlcbiAgICAgICAgLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0hhbmRsZXIgPSBuZXdOb2RlLmF0dHJpYnV0ZXNbZXZlbnROYW1lXTtcbiAgICAgICAgICAgIGNvbnN0IG9sZEhhbmRsZXIgPSBvbGROb2RlLmF0dHJpYnV0ZXNbZXZlbnROYW1lXTtcbiAgICAgICAgICAgIGlmICghbmV3SGFuZGxlcilcbiAgICAgICAgICAgICAgICByZXR1cm4gcGF0Y2hlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogQ2hhbmdlVHlwZS5SRU1PVkVfRVZFTlRfTElTVEVORVIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBvbGRIYW5kbGVyLCBldmVudE5hbWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGVsc2UgaWYgKCFvbGRIYW5kbGVyKVxuICAgICAgICAgICAgICAgIHBhdGNoZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IENoYW5nZVR5cGUuQUREX0VWRU5UX0xJU1RFTkVSLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbmV3SGFuZGxlciwgZXZlbnROYW1lXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlbHNlIHBhdGNoZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IENoYW5nZVR5cGUuVVBEQVRFX0VWRU5UX0xJU1RFTkVSLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbmV3SGFuZGxlciwgb2xkVmFsdWU6IG9sZEhhbmRsZXIsIGV2ZW50TmFtZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICByZXR1cm4gcGF0Y2hlcztcbn1cblxuZnVuY3Rpb24gZGlmZkF0dHJpYnV0ZXMobmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIGNvbnN0IHBhdGNoZXMgID0gW107XG4gICAgY29uc3QgYXR0cmlidXRlcyA9IHsuLi5vbGROb2RlLmF0dHJpYnV0ZXMsIC4uLm5ld05vZGUuYXR0cmlidXRlc307XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcylcbiAgICAgICAgLmZvckVhY2goYXR0ck5hbWUgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmV3QXR0ciA9IG5ld05vZGUuYXR0cmlidXRlc1thdHRyTmFtZV07XG4gICAgICAgICAgICBjb25zdCBvbGRBdHRyID0gb2xkTm9kZS5hdHRyaWJ1dGVzW2F0dHJOYW1lXTtcbiAgICAgICAgICAgICFuZXdBdHRyICYmIHBhdGNoZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogQ2hhbmdlVHlwZS5SRU1PVkVfUFJPUFMsXG4gICAgICAgICAgICAgICAgdmFsdWU6IG9sZEF0dHIsIGF0dHJOYW1lXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICghb2xkQXR0ciB8fCBvbGRBdHRyICE9PSBuZXdBdHRyKSAmJiBwYXRjaGVzLnB1c2goe1xuICAgICAgICAgICAgICAgIHR5cGU6IENoYW5nZVR5cGUuU0VUX1BST1BTLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBuZXdBdHRyLCBvbGRWYWx1ZTogb2xkQXR0ciwgYXR0ck5hbWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICByZXR1cm4gcGF0Y2hlcztcbn1cblxuXG5mdW5jdGlvbiBkaWZmQ2hpbGRyZW4obmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIGNvbnN0IG5ld0NoaWxkID0gbmV3Tm9kZS5jaGlsZHJlbiB8fCBbXTtcbiAgICBjb25zdCBvbGRDaGlsZCA9IG9sZE5vZGUuY2hpbGRyZW4gfHwgW107XG4gICAgcmV0dXJuIFsuLi5BcnJheShNYXRoLm1heChcbiAgICAgICAgbmV3Q2hpbGQubGVuZ3RoLCBvbGRDaGlsZC5sZW5ndGhcbiAgICApKS5rZXlzKCldLm1hcChpID0+IGRpZmYobmV3Q2hpbGRbaV0sIG9sZENoaWxkW2ldKSk7XG59XG5cblxuZXhwb3J0IHtcbiAgICBkaWZmXG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL2RpZmYvaW5kZXguanMiLCJcbmltcG9ydCB7IENoYW5nZVR5cGUgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSAnLi4vY3JlYXRlL2luZGV4JztcbmltcG9ydCB7IHNldEF0dHJpYnV0ZSwgcmVtb3ZlQXR0cmlidXRlIH0gZnJvbSBcIi4uL3V0aWxzL2luZGV4XCI7XG5pbXBvcnQge0V2ZW50TWFwLCBFdmVudFR5cGV9IGZyb20gXCIuLi90eXBlcy9ldmVudHNcIjtcblxuXG5cbmZ1bmN0aW9uIHBhdGNoKHBhcmVudCwgcGF0Y2hlcywgaW5kZXg9MCkge1xuICAgIGlmICghcGF0Y2hlcykgcmV0dXJuO1xuICAgIGNvbnN0IGVsID0gcGFyZW50LmNoaWxkTm9kZXNbaW5kZXhdO1xuICAgIHN3aXRjaCAocGF0Y2hlcy50eXBlKSB7XG4gICAgICAgIGNhc2UgQ2hhbmdlVHlwZS5DUkVBVEU6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgbmV3Tm9kZSB9ID0gcGF0Y2hlcztcbiAgICAgICAgICAgIGNvbnN0IG5ld0VsID0gY3JlYXRlRWxlbWVudChuZXdOb2RlKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gcGFyZW50LmNoaWxkTm9kZXMubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChuZXdFbCk7XG4gICAgICAgICAgICBlbHNlIHBhcmVudC5pbnNlcnRCZWZvcmUobmV3RWwsIGVsKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQ2hhbmdlVHlwZS5SRU1PVkU6IHtcbiAgICAgICAgICAgIGlmICghZWwpIHJldHVybjtcbiAgICAgICAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChlbCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENoYW5nZVR5cGUuUkVQTEFDRToge1xuICAgICAgICAgICAgY29uc3QgeyBuZXdOb2RlIH0gPSBwYXRjaGVzO1xuICAgICAgICAgICAgY29uc3QgbmV3RWwgPSBjcmVhdGVFbGVtZW50KG5ld05vZGUpO1xuICAgICAgICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZChuZXdFbCwgZWwpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBDaGFuZ2VUeXBlLlVQREFURToge1xuICAgICAgICAgICAgY29uc3QgeyBjaGlsZHJlbiwgYXR0cmlidXRlcywgZXZlbnRzIH0gPSBwYXRjaGVzO1xuICAgICAgICAgICAgcGF0Y2hBdHRyaWJ1dGVzKGVsLCBhdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgIC8vIHBhdGNoRXZlbnRzKGVsLCBldmVudHMpO1xuICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQsIGluZGV4KSA9PiBwYXRjaChlbCwgY2hpbGQsIGluZGV4KSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcGF0Y2hFdmVudHMoZWwsIGV2ZW50cykge1xuICAgIGV2ZW50cy5mb3JFYWNoKHBhdGNoID0+IHtcbiAgICAgICAgY29uc3QgeyB0eXBlLCB2YWx1ZSwgb2xkVmFsdWUsIGV2ZW50TmFtZSB9ID0gcGF0Y2g7XG4gICAgICAgIGlmICh0eXBlID09PSBDaGFuZ2VUeXBlLkFERF9FVkVOVF9MSVNURU5FUilcbiAgICAgICAgICAgIHJldHVybiBlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgdmFsdWUpO1xuICAgICAgICBpZiAodHlwZSA9PT0gQ2hhbmdlVHlwZS5SRU1PVkVfRVZFTlRfTElTVEVORVIpXG4gICAgICAgICAgICByZXR1cm4gZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIG9sZFZhbHVlKTtcbiAgICAgICAgaWYgKHR5cGUgPT09IENoYW5nZVR5cGUuVVBEQVRFX0VWRU5UX0xJU1RFTkVSKSB7XG4gICAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgb2xkVmFsdWUpO1xuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHBhdGNoQXR0cmlidXRlcyhlbGVtZW50LCBhdHRyaWJ1dGVzKSB7XG4gICAgYXR0cmlidXRlcy5mb3JFYWNoKHBhdGNoID0+IHtcbiAgICAgICAgY29uc3QgeyB0eXBlLCBhdHRyTmFtZSwgdmFsdWUsIG9sZFZhbHVlIH0gPSBwYXRjaDtcbiAgICAgICAgaWYgKEV2ZW50VHlwZS5pbmNsdWRlcyhhdHRyTmFtZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50TmFtZSA9IEV2ZW50TWFwW2F0dHJOYW1lXTtcbiAgICAgICAgICAgIGlmICh0eXBlID09PSBDaGFuZ2VUeXBlLlNFVF9QUk9QUykge1xuICAgICAgICAgICAgICAgIG9sZFZhbHVlICYmIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIG9sZFZhbHVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGUgPT09IENoYW5nZVR5cGUuUkVNT1ZFX1BST1BTKVxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBvbGRWYWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gQ2hhbmdlVHlwZS5TRVRfUFJPUFMpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNldEF0dHJpYnV0ZShlbGVtZW50LCBhdHRyTmFtZSwgdmFsdWUpO1xuICAgICAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gQ2hhbmdlVHlwZS5SRU1PVkVfUFJPUFMpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlbW92ZUF0dHJpYnV0ZShlbGVtZW50LCBhdHRyTmFtZSwgdmFsdWUpXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5cbmV4cG9ydCB7XG4gICAgcGF0Y2hcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3BhdGNoL2luZGV4LmpzIiwiXG5pbXBvcnQgT2JzZXJ2ZXIgZnJvbSAnLi9vYmplY3QnO1xuaW1wb3J0IE9ic2VydmVyQXJyYXkgZnJvbSAnLi9hcnJheSc7XG5pbXBvcnQgeyB3YWxrLCBvYnNlcnZlciB9IGZyb20gJy4vdXRpbHMnO1xuXG5cbmV4cG9ydCB7XG4gICAgT2JzZXJ2ZXIsXG4gICAgT2JzZXJ2ZXJBcnJheSxcbiAgICB3YWxrLCBvYnNlcnZlclxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9vYnNlcnZlci9pbmRleC5qcyIsIlxuaW1wb3J0IHsgd2Fsaywgb2JzZXJ2ZXIgfSBmcm9tICcuLi91dGlscy9pbmRleCdcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9ic2VydmVyIHtcbiAgICBjb25zdHJ1Y3RvcihvYmosIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFjaykge1xuICAgICAgICBpZiAodHlwZW9mIG9iaiAhPT0gXCJvYmplY3RcIilcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1R5cGUgXCJPYmplY3RcIiByZXF1aXJlZCEnKTtcbiAgICAgICAgd2FsayhvYmosIChrZXksIHZhbHVlKSA9PiBvYnNlcnZlcihcbiAgICAgICAgICAgIHRoaXMsIGtleSwgdmFsdWUsXG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjayxcbiAgICAgICAgICAgIGdldHRlckNhbGxiYWNrXG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIHN0YXRpYyBmcm9tID0gKG9iaiwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2ZXIoXG4gICAgICAgICAgICBvYmosXG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjayxcbiAgICAgICAgICAgIGdldHRlckNhbGxiYWNrXG4gICAgICAgIClcbiAgICB9O1xuXG4gICAgc3RhdGljIHRvU3RyaW5nID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gYE9ic2VydmVyICR7dGhpc31gXG4gICAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvb2JzZXJ2ZXIvb2JqZWN0L2luZGV4LmpzIiwiXG5pbXBvcnQgT2JzZXJ2ZXIgZnJvbSAnLi4vb2JqZWN0JztcbmltcG9ydCBPYnNlcnZlckFycmF5IGZyb20gJy4uL2FycmF5JztcblxuXG5jb25zdCBub29wID0gKCkgPT4ge307XG5cblxuXG5mdW5jdGlvbiB3YWxrKG9iaiwgZnVuKSB7XG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBGdW5jdGlvbiBcIndhbGtcIiByZXF1aXJlIGFuIFwib2JqZWN0XCIgaW5zdGVhZCBvZiAke3R5cGVvZiBvYmp9YCk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSlcbiAgICAgICAgcmV0dXJuIG9iai5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4gZnVuKGluZGV4LCBpdGVtLCBvYmopKTtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IGZ1bihrZXksIG9ialtrZXldLCBvYmopKTtcbn1cblxuZnVuY3Rpb24gb2JzZXJ2ZXIob2JqLCBrZXksIHZhbHVlLCBzZXR0ZXJDYWxsYmFjaz1ub29wLCBnZXR0ZXJDYWxsYmFjaz1ub29wKSB7XG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBGdW5jdGlvbiBcIm9ic2VydmVyXCIgcmVxdWlyZSBhbiBcIm9iamVjdFwiIGluc3RlYWQgb2YgJHt0eXBlb2Ygb2JqfWApO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKVxuICAgICAgICB2YWx1ZSA9IE9ic2VydmVyQXJyYXkuZnJvbSh2YWx1ZSwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKTtcbiAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXG4gICAgICAgIHZhbHVlID0gT2JzZXJ2ZXIuZnJvbSh2YWx1ZSwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGdldDogKCkgPT4ge1xuICAgICAgICAgICAgZ2V0dGVyQ2FsbGJhY2sob2JqLCBrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICB9LFxuICAgICAgICBzZXQ6IG5ld1ZhbHVlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9sZFZhbHVlID0gb2JqW2tleV07XG4gICAgICAgICAgICBvYnNlcnZlcihvYmosIGtleSwgbmV3VmFsdWUsIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFjayk7XG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjayhvYmosIGtleSwgbmV3VmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0pXG59XG5cblxuY29uc3QgZ2V0VW5pcXVlSUQgPSBmdW5jdGlvbigpIHtcbiAgICBsZXQgaWQgPSAwO1xuICAgIHJldHVybiAoKCkgPT4gaWQgKyspO1xufSgpO1xuXG5cbmV4cG9ydCB7XG4gICAgd2FsayxcbiAgICBvYnNlcnZlcixcbiAgICBnZXRVbmlxdWVJRFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9vYnNlcnZlci91dGlscy9pbmRleC5qcyIsIlxuaW1wb3J0IHsgd2Fsaywgb2JzZXJ2ZXIgfSBmcm9tICcuLi91dGlscy9pbmRleCc7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPYnNlcnZlckFycmF5IHtcbiAgICBjb25zdHJ1Y3RvcihhcnJheSwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKSB7XG4gICAgICAgICFhcnJheSAmJiAoYXJyYXkgPSBbXSk7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShhcnJheSkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUeXBlIFwiQXJyYXlcIiByZXF1aXJlZCEnKTtcbiAgICAgICAgd2FsayhhcnJheSwgKGluZGV4LCBpdGVtKSA9PiBvYnNlcnZlcihcbiAgICAgICAgICAgIHRoaXMsIGluZGV4LCBpdGVtLFxuICAgICAgICAgICAgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrXG4gICAgICAgICkpO1xuICAgICAgICB0aGlzLmxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBmcm9tID0gKGFycmF5LCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZlckFycmF5KFxuICAgICAgICAgICAgYXJyYXksXG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjayxcbiAgICAgICAgICAgIGdldHRlckNhbGxiYWNrXG4gICAgICAgIClcbiAgICB9O1xuICAgIHN0YXRpYyBpc09ic2VydmVyQXJyYXkgID0gYXJyYXkgPT4ge1xuICAgICAgICByZXR1cm4gYXJyYXkuX19wcm90b19fLmNvbnN0cnVjdG9yID09PSBPYnNlcnZlckFycmF5O1xuICAgIH07XG4gICAgc3RhdGljIG9mID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZlckFycmF5KFsuLi5hcmdzXSlcbiAgICB9O1xuXG5cbiAgICBjb25jYXQgPSAoLi4uYXJyYXlzKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0FycmF5ID0gbmV3IE9ic2VydmVyQXJyYXkoKTtcbiAgICAgICAgW3RoaXMsIC4uLmFycmF5c10uZm9yRWFjaChcbiAgICAgICAgICAgIGFycmF5ID0+IGFycmF5LmZvckVhY2gobmV3QXJyYXkucHVzaClcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIG5ld0FycmF5O1xuICAgIH07XG4gICAgY29weVdpdGhpbiA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgIC8vIFRPRE9cbiAgICAgICAgcmV0dXJuIE9ic2VydmVyQXJyYXkuZnJvbShcbiAgICAgICAgICAgIEFycmF5LmZyb20odGhpcykuY29weVdpdGhpbiguLi5hcmdzKVxuICAgICAgICApXG4gICAgfTtcbiAgICBlbnRyaWVzID0gZnVuY3Rpb24gKigpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgd2hpbGUgKHRoaXNbaW5kZXhdKVxuICAgICAgICAgICAgeWllbGQgW2luZGV4KyssIHRoaXNbaW5kZXhdXTtcbiAgICB9O1xuICAgIGV2ZXJ5ID0gKCkgPT4ge307XG4gICAgZmlsbCA9ICgpID0+IHt9O1xuICAgIGZpbHRlciA9ICgpID0+IHt9O1xuICAgIGZpbmQgPSAoKSA9PiB7fTtcbiAgICBmaW5kSW5kZXggPSAoKSA9PiB7fTtcbiAgICBmb3JFYWNoID0gKCkgPT4ge307XG4gICAgaW5jbHVkZXMgPSAoKSA9PiB7fTtcbiAgICBpbmRleE9mID0gKCkgPT4ge307XG4gICAgam9pbiA9ICgpID0+IHt9O1xuICAgIGtleXMgPSAoKSA9PiB7fTtcbiAgICBsYXN0SW5kZXhPZiA9ICgpID0+IHt9O1xuICAgIG1hcCA9ICgpID0+IHt9O1xuICAgIHBvcCA9ICgpID0+IHt9O1xuICAgIHB1c2ggPSB2YWx1ZSA9PiB7XG4gICAgICAgIG9ic2VydmVyKFxuICAgICAgICAgICAgdGhpcywgdGhpcy5sZW5ndGgsIHZhbHVlLFxuICAgICAgICAgICAgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMubGVuZ3RoICsrO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICByZWR1Y2UgPSAoKSA9PiB7fTtcbiAgICByZWR1Y2VSaWdodCA9ICgpID0+IHt9O1xuICAgIHJldmVyc2UgPSAoKSA9PiB7fTtcbiAgICBzaGlmdCA9ICgpID0+IHt9O1xuICAgIHNsaWNlID0gKCkgPT4ge307XG4gICAgc29tZSA9ICgpID0+IHt9O1xuICAgIHNvcnQgPSAoKSA9PiB7fTtcbiAgICBzcGxpY2UgPSAoKSA9PiB7fTtcbiAgICB0b0xvY2FsZVN0cmluZyA9ICgpID0+IHt9O1xuICAgIHRvU291cmNlID0gKCkgPT4ge307XG4gICAgdG9TdHJpbmcgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBgT2JzZXJ2ZXJBcnJheSBbLi4uXWBcbiAgICB9O1xuICAgIHVuc2hpZnQgPSAoKSA9PiB7fTtcbiAgICB2YWx1ZXMgPSAoKSA9PiB7fTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvb2JzZXJ2ZXIvYXJyYXkvaW5kZXguanMiLCJcbmZ1bmN0aW9uIGZsYXR0ZW5Ob2RlKG5vZGUpIHtcbiAgICBpZiAoIW5vZGUpIHJldHVybjtcbiAgICBpZiAobm9kZS5jaGlsZHJlbilcbiAgICAgICAgbm9kZS5jaGlsZHJlbiA9IGZsYXR0ZW5DaGlsZHJlbihub2RlLmNoaWxkcmVuKTtcbiAgICByZXR1cm4gbm9kZVxufVxuXG5mdW5jdGlvbiBmbGF0dGVuQ2hpbGRyZW4oY2hpbGRyZW4pIHtcbiAgICByZXR1cm4gW10uY29uY2F0KC4uLmNoaWxkcmVuKVxuICAgICAgICAubWFwKG5vZGUgPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBub2RlID09PSAnb2JqZWN0JylcbiAgICAgICAgICAgICAgICByZXR1cm4gZmxhdHRlbk5vZGUobm9kZSk7XG4gICAgICAgICAgICBlbHNlIHJldHVybiBub2RlO1xuICAgICAgICB9KVxuICAgICAgICAuZmlsdGVyKG5vZGUgPT4gISFub2RlKTtcbn1cblxuXG5leHBvcnQge1xuICAgIGZsYXR0ZW5Ob2RlXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL3V0aWxzL2luZGV4LmpzIiwiXG5pbXBvcnQgeyBNdXNlIH0gZnJvbSAnLi4vaW5kZXgnO1xuXG5cblxuY2xhc3MgQXBwIGV4dGVuZHMgTXVzZSB7XG4gICAgc3RhdGUgPSB7XG4gICAgICAgIG5hbWU6ICdKb2UnLFxuICAgICAgICBhZ2U6IDIyLFxuICAgICAgICBsYW5nczogW1xuICAgICAgICAgICAgJ0phdmFTY3JpcHQnLFxuICAgICAgICAgICAgJ1B5dGhvbicsXG4gICAgICAgICAgICAnUnVzdCcsXG4gICAgICAgICAgICAnU2NhbGEnXG4gICAgICAgIF0sXG4gICAgICAgIHNob3dIZWxsbzogdHJ1ZVxuICAgIH1cblxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgICBpc0FnZU9kZCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmFnZSAlIDIgIT09IDBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnN0YXRlLmFnZSArKztcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7IHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8aDEgaWY9e3RoaXMuc3RhdGUuc2hvd0hlbGxvfT5IZWxsbyE8L2gxPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICBtb2RlbD17dGhpcy5zdGF0ZS5uYW1lfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgbW9kZWw9e3RoaXMuc3RhdGUuc2hvd0hlbGxvfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PiBjb25zb2xlLmxvZyh0aGlzLnN0YXRlLnNob3dIZWxsbyl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHA+TXkgbmFtZSBpcyB7dGhpcy5zdGF0ZS5uYW1lfS48L3A+XG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBJJ20ge3RoaXMuc3RhdGUuYWdlfSB5ZWFycyBvbGRcbiAgICAgICAgICAgICAgICA8c3BhbiBpZj17dGhpcy5jb21wdXRlZC5pc0FnZU9kZH0+IGFuZCBpdCdzIGFuIG9kZCBudW1iZXIuPC9zcGFuPlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPHA+QW5kIEkgY2FuIHRob3NlIHByb2dyYW1taW5nIGxhbmd1YWdlczo8L3A+XG4gICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgPGxpIGZvcj17bGFuZyBpbiB0aGlzLnN0YXRlLmxhbmdzfT57bGFuZ308L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+Q2xpY2sgTWU8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgKX1cbn1cblxuXG5cbmNvbnN0IGFwcCA9IG5ldyBBcHAoKTtcbmFwcC5yZW5kZXJUbyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2V4YW1wbGUvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9