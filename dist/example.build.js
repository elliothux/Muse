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
                    type: 'text',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDA5N2ViNWFlZGMzMDA5MmI4MzkiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9jcmVhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdHlwZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdHlwZXMvY2hhbmdlLmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3R5cGVzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9kaWZmL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3BhdGNoL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvb2JzZXJ2ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci9vYmplY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci91dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL29ic2VydmVyL2FycmF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZXhhbXBsZS9pbmRleC5qcyJdLCJuYW1lcyI6WyJNdXNlIiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJlbnRyeSIsIm5vZGUiLCJzdGF0ZSIsImNvbXB1dGVkIiwiY29tcG9uZW50V2lsbE1vdW50IiwiY29tcG9uZW50RGlkTW91bnQiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwic2hvdWxkQ29tcG9uZW50VXBkYXRlIiwiY29tcG9uZW50V2lsbFVwZGF0ZSIsImNvbXBvbmVudERpZFVwZGF0ZSIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwiY29tcG9uZW50RGlkQ2F0Y2giLCJpbml0T2JzZXJ2ZXIiLCJmcm9tIiwic2V0dGVyQ2FsbGJhY2siLCJpbml0Q29tcHV0ZWQiLCJuYW1lIiwiZ2V0dGVyIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwiZ2V0Iiwib2JqIiwia2V5IiwidmFsdWUiLCJvbGRWYWx1ZSIsIkVycm9yIiwiZGlmZkFuZFBhdGNoIiwiYmVmb3JlUmVuZGVyIiwicmVuZGVyIiwicmVuZGVyVG8iLCJhcHBlbmRDaGlsZCIsIm9sZE5vZGUiLCJwYXRjaGVzIiwiY29uc29sZSIsImxvZyIsImNyZWF0ZUVsZW1lbnQiLCJkaWZmIiwicGF0Y2giLCJ1dGlscyIsImVsIiwiZG9jdW1lbnQiLCJlbGVtZW50TmFtZSIsImNoaWxkcmVuIiwiYXBwZW5kQ2hpbGRyZW4iLCJhdHRyaWJ1dGVzIiwiY3JlYXRlVGV4dE5vZGUiLCJ0YXJnZXQiLCJtYXAiLCJmb3JFYWNoIiwic2V0QXR0cmlidXRlcyIsImtleXMiLCJmaWx0ZXIiLCJoYXNPd25Qcm9wZXJ0eSIsImF0dHJOYW1lIiwic2V0QXR0cmlidXRlIiwiYXR0clZhbHVlIiwiaW5jbHVkZXMiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlQXR0cmlidXRlIiwib2xkQXR0clZhbHVlIiwiaW5zZXJ0QWZ0ZXIiLCJuZXdFbCIsInRhcmdldEVsIiwicGFyZW50RWwiLCJwYXJlbnROb2RlIiwibGFzdENoaWxkIiwiaW5zZXJ0QmVmb3JlIiwibmV4dFNpYmxpbmciLCJDaGFuZ2VUeXBlIiwiRXZlbnRUeXBlIiwiRXZlbnRNYXAiLCJDaGFuZ2VkIiwiQ1JFQVRFIiwiUkVNT1ZFIiwiUkVQTEFDRSIsIlVQREFURSIsIlNFVF9QUk9QUyIsIlJFTU9WRV9QUk9QUyIsIkFERF9FVkVOVF9MSVNURU5FUiIsIlVQREFURV9FVkVOVF9MSVNURU5FUiIsIlJFTU9WRV9FVkVOVF9MSVNURU5FUiIsInJlZHVjZSIsImV2ZW50c01hcCIsImV2ZW50IiwicmVwbGFjZSIsImUiLCJ0b0xvd2VyQ2FzZSIsIm5ld05vZGUiLCJ0eXBlIiwiaXNDaGFuZ2VkIiwiZGlmZkNoaWxkcmVuIiwiZGlmZkF0dHJpYnV0ZXMiLCJldmVudHMiLCJkaWZmRXZlbnRzIiwiZXZlbnROYW1lIiwibmV3SGFuZGxlciIsIm9sZEhhbmRsZXIiLCJwdXNoIiwibmV3QXR0ciIsIm9sZEF0dHIiLCJuZXdDaGlsZCIsIm9sZENoaWxkIiwiQXJyYXkiLCJNYXRoIiwibWF4IiwibGVuZ3RoIiwiaSIsInBhcmVudCIsImluZGV4IiwiY2hpbGROb2RlcyIsInJlbW92ZUNoaWxkIiwicmVwbGFjZUNoaWxkIiwicGF0Y2hBdHRyaWJ1dGVzIiwicGF0Y2hFdmVudHMiLCJjaGlsZCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJlbGVtZW50IiwiT2JzZXJ2ZXIiLCJPYnNlcnZlckFycmF5Iiwid2FsayIsIm9ic2VydmVyIiwiZ2V0dGVyQ2FsbGJhY2siLCJUeXBlRXJyb3IiLCJ0b1N0cmluZyIsIm5vb3AiLCJmdW4iLCJpc0FycmF5IiwiaXRlbSIsInNldCIsIm5ld1ZhbHVlIiwiZ2V0VW5pcXVlSUQiLCJpZCIsImFycmF5IiwiaXNPYnNlcnZlckFycmF5IiwiX19wcm90b19fIiwib2YiLCJhcmdzIiwiY29uY2F0IiwiYXJyYXlzIiwibmV3QXJyYXkiLCJjb3B5V2l0aGluIiwiZW50cmllcyIsImV2ZXJ5IiwiZmlsbCIsImZpbmQiLCJmaW5kSW5kZXgiLCJpbmRleE9mIiwiam9pbiIsImxhc3RJbmRleE9mIiwicG9wIiwicmVkdWNlUmlnaHQiLCJyZXZlcnNlIiwic2hpZnQiLCJzbGljZSIsInNvbWUiLCJzb3J0Iiwic3BsaWNlIiwidG9Mb2NhbGVTdHJpbmciLCJ0b1NvdXJjZSIsInVuc2hpZnQiLCJ2YWx1ZXMiLCJmbGF0dGVuTm9kZSIsImZsYXR0ZW5DaGlsZHJlbiIsIkFwcCIsImFnZSIsImxhbmdzIiwiaXNBZ2VPZGQiLCJoYW5kbGVDbGljayIsImxhbmciLCJhcHAiLCJnZXRF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QUosQ0FBYVcsU0FBU2tJLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBYixFIiwiZmlsZSI6ImV4YW1wbGUuYnVpbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYXNzZXRzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0MDk3ZWI1YWVkYzMwMDkyYjgzOSIsIlxuaW1wb3J0IE11c2UgZnJvbSAnLi9jb3JlJztcblxuXG5cbmV4cG9ydCB7XG4gICAgTXVzZVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vaW5kZXguanMiLCJcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIGRpZmYsIHBhdGNoIH0gZnJvbSAnLi9kb20nO1xuaW1wb3J0IHsgT2JzZXJ2ZXIsIG9ic2VydmVyLCB3YWxrIH0gZnJvbSAnLi9vYnNlcnZlcic7XG5pbXBvcnQgeyBmbGF0dGVuTm9kZSB9IGZyb20gJy4vdXRpbHMnXG5cblxuXG5jbGFzcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge31cblxuICAgIGVudHJ5ID0gbnVsbDtcbiAgICBub2RlID0gbnVsbDtcbiAgICBzdGF0ZSA9IHt9O1xuICAgIGNvbXB1dGVkID0ge307XG5cbiAgICAvLyBUT0RPOiBMaWZlQ3ljbGVcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7fTtcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHt9O1xuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKSB7fTtcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUoKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfTtcbiAgICBjb21wb25lbnRXaWxsVXBkYXRlKCkge307XG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge307XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7fTtcbiAgICBjb21wb25lbnREaWRDYXRjaCgpIHt9O1xuXG4gICAgLy8gT2JzZXJ2ZXJcbiAgICBpbml0T2JzZXJ2ZXIoKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBPYnNlcnZlci5mcm9tKFxuICAgICAgICAgICAgdGhpcy5zdGF0ZSB8fCB7fSxcbiAgICAgICAgICAgIDo6dGhpcy5zZXR0ZXJDYWxsYmFja1xuICAgICAgICApO1xuICAgIH07XG4gICAgaW5pdENvbXB1dGVkKCkge1xuICAgICAgICB3YWxrKFxuICAgICAgICAgICAgdGhpcy5jb21wdXRlZCxcbiAgICAgICAgICAgIChuYW1lLCBnZXR0ZXIsIGNvbXB1dGVkKSA9PiB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbXB1dGVkLCBuYW1lLCB7XG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGdldDogdGhpczo6Z2V0dGVyXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH1cbiAgICBzZXR0ZXJDYWxsYmFjayhvYmosIGtleSwgdmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmIChvYmogIT09IHRoaXMuc3RhdGUpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JPT00hISEnKTtcbiAgICAgICAgdGhpcy5kaWZmQW5kUGF0Y2goKTtcbiAgICB9O1xuXG4gICAgLy8gUmVuZGVyXG4gICAgYmVmb3JlUmVuZGVyKCkge1xuICAgICAgICB0aGlzLmluaXRPYnNlcnZlcigpO1xuICAgICAgICB0aGlzLmluaXRDb21wdXRlZCgpO1xuICAgIH07XG4gICAgcmVuZGVyKCkge307XG4gICAgcmVuZGVyVG8oZW50cnkpIHtcbiAgICAgICAgdGhpcy5iZWZvcmVSZW5kZXIoKTtcbiAgICAgICAgdGhpcy5ub2RlID0gZmxhdHRlbk5vZGUodGhpcy5yZW5kZXIoKSk7XG4gICAgICAgIHRoaXMuZW50cnkgPSBlbnRyeTtcbiAgICAgICAgdGhpcy5lbnRyeS5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KHRoaXMubm9kZSkpXG4gICAgfTtcbiAgICBkaWZmQW5kUGF0Y2goKSB7XG4gICAgICAgIGNvbnN0IG9sZE5vZGUgPSB0aGlzLm5vZGU7XG4gICAgICAgIHRoaXMubm9kZSA9IGZsYXR0ZW5Ob2RlKHRoaXMucmVuZGVyKCkpO1xuICAgICAgICBjb25zdCBwYXRjaGVzID0gZGlmZih0aGlzLm5vZGUsIG9sZE5vZGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhvbGROb2RlKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5ub2RlKTtcbiAgICAgICAgY29uc29sZS5sb2cocGF0Y2hlcyk7XG4gICAgICAgIHBhdGNoKHRoaXMuZW50cnksIHBhdGNoZXMpO1xuICAgIH07XG59XG5cblxuXG5leHBvcnQgZGVmYXVsdCBDb21wb25lbnQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2luZGV4LmpzIiwiXG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSAnLi9jcmVhdGUnO1xuaW1wb3J0IHsgZGlmZiB9IGZyb20gJy4vZGlmZic7XG5pbXBvcnQgeyBwYXRjaCB9IGZyb20gJy4vcGF0Y2gnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMnO1xuXG5cbmV4cG9ydCB7XG4gICAgY3JlYXRlRWxlbWVudCxcbiAgICBkaWZmLFxuICAgIHBhdGNoLFxuICAgIHV0aWxzXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS9pbmRleC5qcyIsIlxuaW1wb3J0IHsgc2V0QXR0cmlidXRlcyB9IGZyb20gJy4uL3V0aWxzJztcblxuXG5cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQobm9kZSkge1xuICAgIC8qXG4gICAgbm9kZTogU3RyaW5nIHx8IHtcbiAgICAgICAgZWxlbWVudE5hbWU6IFN0cmluZ1xuICAgICAgICBjaGlsZHJlbjogbm9kZVtdXG4gICAgICAgIGF0dHJpYnV0ZXM6IE9iamVjdFxuICAgIH1cbiAgICAqL1xuICAgIGlmICh0eXBlb2Ygbm9kZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5vZGUuZWxlbWVudE5hbWUpO1xuICAgICAgICBub2RlLmNoaWxkcmVuICYmIGFwcGVuZENoaWxkcmVuKGVsLCBub2RlLmNoaWxkcmVuKTtcbiAgICAgICAgc2V0QXR0cmlidXRlcyhlbCwgbm9kZS5hdHRyaWJ1dGVzKTtcbiAgICAgICAgcmV0dXJuIGVsO1xuICAgIH1cbiAgICBlbHNlIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShub2RlKTtcbn1cblxuXG5mdW5jdGlvbiBhcHBlbmRDaGlsZHJlbih0YXJnZXQsIGNoaWxkcmVuKSB7XG4gICAgY2hpbGRyZW4ubWFwKGNyZWF0ZUVsZW1lbnQpXG4gICAgICAgIC5mb3JFYWNoKDo6dGFyZ2V0LmFwcGVuZENoaWxkKVxufVxuXG5cblxuZXhwb3J0IHtcbiAgICBjcmVhdGVFbGVtZW50XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS9jcmVhdGUvaW5kZXguanMiLCJcbmltcG9ydCB7IEV2ZW50VHlwZSwgRXZlbnRNYXAgfSBmcm9tICcuLi90eXBlcyc7XG5cblxuXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzKHRhcmdldCwgYXR0cmlidXRlcz17fSkge1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpXG4gICAgICAgIC5maWx0ZXIoa2V5ID0+IGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoa2V5KSlcbiAgICAgICAgLmZvckVhY2goYXR0ck5hbWUgPT4gc2V0QXR0cmlidXRlKHRhcmdldCwgYXR0ck5hbWUsIGF0dHJpYnV0ZXNbYXR0ck5hbWVdKSk7XG59XG5cblxuZnVuY3Rpb24gc2V0QXR0cmlidXRlKHRhcmdldCwgYXR0ck5hbWUsIGF0dHJWYWx1ZSkge1xuICAgIGF0dHJOYW1lID09PSAnY2xhc3NOYW1lJyAmJiAoYXR0ck5hbWUgPSAnY2xhc3MnKTtcbiAgICBpZiAoRXZlbnRUeXBlLmluY2x1ZGVzKGF0dHJOYW1lKSlcbiAgICAgICAgcmV0dXJuIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgRXZlbnRNYXBbYXR0ck5hbWVdLFxuICAgICAgICAgICAgYXR0clZhbHVlXG4gICAgICAgICk7XG4gICAgdGFyZ2V0LnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKTtcbn1cblxuXG5mdW5jdGlvbiByZW1vdmVBdHRyaWJ1dGUodGFyZ2V0LCBhdHRyTmFtZSwgb2xkQXR0clZhbHVlKSB7XG4gICAgYXR0ck5hbWUgPT09ICdjbGFzc05hbWUnICYmIChhdHRyTmFtZSA9ICdjbGFzcycpO1xuICAgIGlmIChFdmVudFR5cGUuaW5jbHVkZXMoYXR0ck5hbWUpKVxuICAgICAgICByZXR1cm4gdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICBFdmVudE1hcFthdHRyTmFtZV0sXG4gICAgICAgICAgICBvbGRBdHRyVmFsdWVcbiAgICAgICAgKTtcbiAgICB0YXJnZXQucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcbn1cblxuXG5mdW5jdGlvbiBpbnNlcnRBZnRlcihuZXdFbCwgdGFyZ2V0RWwpIHtcbiAgICBjb25zdCBwYXJlbnRFbCA9IHRhcmdldEVsLnBhcmVudE5vZGU7XG4gICAgaWYgKHBhcmVudEVsLmxhc3RDaGlsZCA9PT0gdGFyZ2V0RWwpXG4gICAgICAgIHJldHVybiBwYXJlbnRFbC5hcHBlbmRDaGlsZChuZXdFbCk7XG4gICAgcmV0dXJuIHBhcmVudEVsLmluc2VydEJlZm9yZShuZXdFbCx0YXJnZXRFbC5uZXh0U2libGluZyk7XG59XG5cblxuZXhwb3J0IHtcbiAgICBzZXRBdHRyaWJ1dGVzLFxuICAgIHNldEF0dHJpYnV0ZSxcbiAgICByZW1vdmVBdHRyaWJ1dGUsXG4gICAgaW5zZXJ0QWZ0ZXJcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3V0aWxzL2luZGV4LmpzIiwiXG5pbXBvcnQgQ2hhbmdlVHlwZSBmcm9tICcuL2NoYW5nZSc7XG5pbXBvcnQgeyBFdmVudFR5cGUsIEV2ZW50TWFwIH0gZnJvbSAnLi9ldmVudHMnO1xuXG5leHBvcnQge1xuICAgIENoYW5nZVR5cGUsXG4gICAgRXZlbnRUeXBlLFxuICAgIEV2ZW50TWFwXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS90eXBlcy9pbmRleC5qcyIsIlxuY29uc3QgQ2hhbmdlZCA9IHtcbiAgICBDUkVBVEU6ICdDUkVBVEUnLFxuICAgIFJFTU9WRTogJ1JFTU9WRScsXG4gICAgUkVQTEFDRTogJ1JFUExBQ0UnLFxuICAgIFVQREFURTogJ1VQREFURScsXG5cbiAgICBTRVRfUFJPUFM6ICdTRVQgUFJPUFMnLFxuICAgIFJFTU9WRV9QUk9QUzogJ1JFTU9WRSBQUk9QUycsXG5cbiAgICBBRERfRVZFTlRfTElTVEVORVI6ICdBREQgRVZFTlQgTElTVEVORVInLFxuICAgIFVQREFURV9FVkVOVF9MSVNURU5FUjogJ1VQREFURSBFVkVOVCBMSVNURU5FUicsXG4gICAgUkVNT1ZFX0VWRU5UX0xJU1RFTkVSOiAnUkVNT1ZFIEVWRU5UIExJU1RFTkVSJyxcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgQ2hhbmdlZDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3R5cGVzL2NoYW5nZS5qcyIsIlxuY29uc3QgRXZlbnRUeXBlID0gW1xuICAgIC8vIENsaXBib2FyZCBFdmVudHNcbiAgICAnb25Db3B5JywgJ29uQ3V0JywgJ29uUGFzdGUnLFxuICAgIC8vIENvbXBvc2l0aW9uIEV2ZW50c1xuICAgICdvbkNvbXBvc2l0aW9uRW5kJywgJ29uQ29tcG9zaXRpb25TdGFydCcsICdvbkNvbXBvc2l0aW9uVXBkYXRlJyxcbiAgICAvLyBLZXlib2FyZCBFdmVudHNcbiAgICAnb25LZXlEb3duJywgJ29uS2V5UHJlc3MnLCAnb25LZXlVcCcsXG4gICAgLy8gRm9jdXMgRXZlbnRzXG4gICAgJ29uRm9jdXMnLCAnb25CbHVyJyxcbiAgICAvLyBGb3JtIEV2ZW50c1xuICAgICdvbkNoYW5nZScsICdvbklucHV0JywgJ29uSW52YWxpZCcsICdvblN1Ym1pdCcsXG4gICAgLy8gTW91c2UgRXZlbnRzXG4gICAgJ29uQ2xpY2snLCAnb25Db250ZXh0TWVudScsICdvbkRvdWJsZUNsaWNrJyxcbiAgICAnb25EcmFnJywgJ29uRHJhZ0VuZCcsICdvbkRyYWdFbnRlcicsICdvbkRyYWdFeGl0JyxcbiAgICAnb25EcmFnTGVhdmUnLCAnb25EcmFnT3ZlcicsICdvbkRyYWdTdGFydCcsXG4gICAgJ29uRHJvcCcsICdvbk1vdXNlRG93bicsICdvbk1vdXNlRW50ZXInLFxuICAgICdvbk1vdXNlTGVhdmUnLCAnb25Nb3VzZU1vdmUnLCAnb25Nb3VzZU91dCcsXG4gICAgJ29uTW91c2VPdmVyJyAsJ29uTW91c2VVcCcsXG4gICAgLy8gU2VsZWN0aW9uIEV2ZW50c1xuICAgICdvblNlbGVjdCcsXG4gICAgLy8gVG91Y2ggRXZlbnRzXG4gICAgJ29uVG91Y2hDYW5jZWwnLCAnb25Ub3VjaEVuZCcsICdvblRvdWNoTW92ZScsICdvblRvdWNoU3RhcnQnLFxuICAgIC8vIFVJIEV2ZW50c1xuICAgICdvblNjcm9sbCcsXG4gICAgLy8gV2hlZWwgRXZlbnRzXG4gICAgJ29uV2hlZWwnLFxuICAgIC8vIE1lZGlhIEV2ZW50c1xuICAgICdvbkFib3J0JywgJ29uQ2FuUGxheScsICdvbkNhblBsYXlUaHJvdWdoJyxcbiAgICAnb25EdXJhdGlvbkNoYW5nZScsICdvbkVtcHRpZWQnLCAnb25FbmNyeXB0ZWRvbkVuZGVkJyxcbiAgICAnb25FcnJvcicsICdvbkxvYWRlZERhdGEnLCAnb25Mb2FkZWRNZXRhZGF0YScsXG4gICAgJ29uTG9hZFN0YXJ0JywgJ29uUGF1c2UnLCAnb25QbGF5b25QbGF5aW5nJyxcbiAgICAnb25Qcm9ncmVzcycsICdvblJhdGVDaGFuZ2UnLCAnb25TZWVrZWQnLFxuICAgICdvblNlZWtpbmcnLCAnb25TdGFsbGVkJywgJ29uU3VzcGVuZG9uVGltZVVwZGF0ZScsXG4gICAgJ29uVm9sdW1lQ2hhbmdlJywgJ29uV2FpdGluZycsXG4gICAgLy8gSW1hZ2UgRXZlbnRzXG4gICAgJ29uTG9hZCcsICdvbkVycm9yJyxcbiAgICAvLyBBbmltYXRpb24gRXZlbnRzXG4gICAgJ29uQW5pbWF0aW9uU3RhcnQnLCAnb25BbmltYXRpb25FbmQnLCAnb25BbmltYXRpb25JdGVyYXRpb24nLFxuICAgIC8vIFRyYW5zaXRpb24gRXZlbnRzXG4gICAgJ29uVHJhbnNpdGlvbkVuZCcsXG4gICAgLy8gT3RoZXIgRXZlbnRzXG4gICAgJ29uVG9nZ2xlJ1xuXTtcblxuXG5jb25zdCBFdmVudE1hcCA9IEV2ZW50VHlwZS5yZWR1Y2UoKGV2ZW50c01hcCwgZXZlbnQpID0+IHtcbiAgICBldmVudHNNYXBbZXZlbnRdID0gZXZlbnRcbiAgICAgICAgLnJlcGxhY2UoJ29uJywgJycpXG4gICAgICAgIC5yZXBsYWNlKC9bQS1aXS9nLCBlID0+IGUudG9Mb3dlckNhc2UoKSk7XG4gICAgcmV0dXJuIGV2ZW50c01hcDtcbn0sIHt9KTtcblxuXG5leHBvcnQge1xuICAgIEV2ZW50VHlwZSxcbiAgICBFdmVudE1hcFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vdHlwZXMvZXZlbnRzLmpzIiwiXG5pbXBvcnQgeyBDaGFuZ2VUeXBlLCBFdmVudFR5cGUgfSBmcm9tICcuLi90eXBlcy9pbmRleCc7XG5cblxuXG5mdW5jdGlvbiBkaWZmKG5ld05vZGUsIG9sZE5vZGUpIHtcbiAgICAvKlxuICAgIHJldHVybiB0eXBlIFBhdGNoIHtcbiAgICAgICAgdHlwZTogQ2hhbmdlVHlwZVxuICAgICAgICBuZXdOb2RlPzogTm9kZVxuICAgICAgICBjaGlsZHJlbj86IFBhdGNoW11cbiAgICAgICAgYXR0cmlidXRlcz86IFBhdGNoW11cbiAgICB9XG4gICAgICovXG4gICAgaWYgKCFvbGROb2RlKSByZXR1cm4geyB0eXBlOiBDaGFuZ2VUeXBlLkNSRUFURSwgbmV3Tm9kZSB9O1xuICAgIGVsc2UgaWYgKCFuZXdOb2RlKSByZXR1cm4geyB0eXBlOiBDaGFuZ2VUeXBlLlJFTU9WRSB9O1xuICAgIGVsc2UgaWYgKGlzQ2hhbmdlZChuZXdOb2RlLCBvbGROb2RlKSkgcmV0dXJuIHsgdHlwZTogQ2hhbmdlVHlwZS5SRVBMQUNFLCBuZXdOb2RlIH07XG4gICAgZWxzZSBpZiAobmV3Tm9kZS5lbGVtZW50TmFtZSlcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IENoYW5nZVR5cGUuVVBEQVRFLFxuICAgICAgICAgICAgY2hpbGRyZW46IGRpZmZDaGlsZHJlbihuZXdOb2RlLCBvbGROb2RlKSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IGRpZmZBdHRyaWJ1dGVzKG5ld05vZGUsIG9sZE5vZGUpLFxuICAgICAgICAgICAgZXZlbnRzOiBkaWZmRXZlbnRzKG5ld05vZGUsIG9sZE5vZGUpXG4gICAgICAgIH07XG59XG5cbmZ1bmN0aW9uIGlzQ2hhbmdlZChuZXdOb2RlLCBvbGROb2RlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBuZXdOb2RlICE9PSB0eXBlb2Ygb2xkTm9kZSB8fFxuICAgICAgICB0eXBlb2YgbmV3Tm9kZSAhPT0gXCJvYmplY3RcIiAmJiBuZXdOb2RlICE9PSBvbGROb2RlIHx8XG4gICAgICAgIHR5cGVvZiBuZXdOb2RlID09PSBcIm9iamVjdFwiICYmIG5ld05vZGUuZWxlbWVudE5hbWUgIT09IG9sZE5vZGUuZWxlbWVudE5hbWVcbn1cblxuXG5mdW5jdGlvbiBkaWZmRXZlbnRzKG5ld05vZGUsIG9sZE5vZGUpIHtcbiAgICBjb25zdCBwYXRjaGVzICA9IFtdO1xuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSB7Li4ub2xkTm9kZS5hdHRyaWJ1dGVzLCAuLi5uZXdOb2RlLmF0dHJpYnV0ZXN9O1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpXG4gICAgICAgIC5maWx0ZXIoYXR0ck5hbWUgPT4gRXZlbnRUeXBlLmluY2x1ZGVzKGF0dHJOYW1lKSlcbiAgICAgICAgLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0hhbmRsZXIgPSBuZXdOb2RlLmF0dHJpYnV0ZXNbZXZlbnROYW1lXTtcbiAgICAgICAgICAgIGNvbnN0IG9sZEhhbmRsZXIgPSBvbGROb2RlLmF0dHJpYnV0ZXNbZXZlbnROYW1lXTtcbiAgICAgICAgICAgIGlmICghbmV3SGFuZGxlcilcbiAgICAgICAgICAgICAgICByZXR1cm4gcGF0Y2hlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogQ2hhbmdlVHlwZS5SRU1PVkVfRVZFTlRfTElTVEVORVIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBvbGRIYW5kbGVyLCBldmVudE5hbWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGVsc2UgaWYgKCFvbGRIYW5kbGVyKVxuICAgICAgICAgICAgICAgIHBhdGNoZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IENoYW5nZVR5cGUuQUREX0VWRU5UX0xJU1RFTkVSLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbmV3SGFuZGxlciwgZXZlbnROYW1lXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlbHNlIHBhdGNoZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IENoYW5nZVR5cGUuVVBEQVRFX0VWRU5UX0xJU1RFTkVSLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbmV3SGFuZGxlciwgb2xkVmFsdWU6IG9sZEhhbmRsZXIsIGV2ZW50TmFtZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICByZXR1cm4gcGF0Y2hlcztcbn1cblxuZnVuY3Rpb24gZGlmZkF0dHJpYnV0ZXMobmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIGNvbnN0IHBhdGNoZXMgID0gW107XG4gICAgY29uc3QgYXR0cmlidXRlcyA9IHsuLi5vbGROb2RlLmF0dHJpYnV0ZXMsIC4uLm5ld05vZGUuYXR0cmlidXRlc307XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcylcbiAgICAgICAgLmZpbHRlcihhdHRyTmFtZSA9PiAhRXZlbnRUeXBlLmluY2x1ZGVzKGF0dHJOYW1lKSlcbiAgICAgICAgLmZvckVhY2goYXR0ck5hbWUgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmV3QXR0ciA9IG5ld05vZGUuYXR0cmlidXRlc1thdHRyTmFtZV07XG4gICAgICAgICAgICBjb25zdCBvbGRBdHRyID0gb2xkTm9kZS5hdHRyaWJ1dGVzW2F0dHJOYW1lXTtcbiAgICAgICAgICAgICFuZXdBdHRyICYmIHBhdGNoZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogQ2hhbmdlVHlwZS5SRU1PVkVfUFJPUFMsXG4gICAgICAgICAgICAgICAgdmFsdWU6IG9sZEF0dHIsIGF0dHJOYW1lXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICghb2xkQXR0ciB8fCBvbGRBdHRyICE9PSBuZXdBdHRyKSAmJiBwYXRjaGVzLnB1c2goe1xuICAgICAgICAgICAgICAgIHR5cGU6IENoYW5nZVR5cGUuU0VUX1BST1BTLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBuZXdBdHRyLCBhdHRyTmFtZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIHJldHVybiBwYXRjaGVzO1xufVxuXG5cbmZ1bmN0aW9uIGRpZmZDaGlsZHJlbihuZXdOb2RlLCBvbGROb2RlKSB7XG4gICAgY29uc3QgbmV3Q2hpbGQgPSBuZXdOb2RlLmNoaWxkcmVuIHx8IFtdO1xuICAgIGNvbnN0IG9sZENoaWxkID0gb2xkTm9kZS5jaGlsZHJlbiB8fCBbXTtcbiAgICByZXR1cm4gWy4uLkFycmF5KE1hdGgubWF4KFxuICAgICAgICBuZXdDaGlsZC5sZW5ndGgsIG9sZENoaWxkLmxlbmd0aFxuICAgICkpLmtleXMoKV0ubWFwKGkgPT4gZGlmZihuZXdDaGlsZFtpXSwgb2xkQ2hpbGRbaV0pKTtcbn1cblxuXG5leHBvcnQge1xuICAgIGRpZmZcbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vZGlmZi9pbmRleC5qcyIsIlxuaW1wb3J0IHsgQ2hhbmdlVHlwZSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tICcuLi9jcmVhdGUvaW5kZXgnO1xuaW1wb3J0IHsgc2V0QXR0cmlidXRlLCByZW1vdmVBdHRyaWJ1dGUgfSBmcm9tIFwiLi4vdXRpbHMvaW5kZXhcIjtcblxuXG5cbmZ1bmN0aW9uIHBhdGNoKHBhcmVudCwgcGF0Y2hlcywgaW5kZXg9MCkge1xuICAgIGlmICghcGF0Y2hlcykgcmV0dXJuO1xuICAgIGNvbnN0IGVsID0gcGFyZW50LmNoaWxkTm9kZXNbaW5kZXhdO1xuICAgIHN3aXRjaCAocGF0Y2hlcy50eXBlKSB7XG4gICAgICAgIGNhc2UgQ2hhbmdlVHlwZS5DUkVBVEU6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgbmV3Tm9kZSB9ID0gcGF0Y2hlcztcbiAgICAgICAgICAgIGNvbnN0IG5ld0VsID0gY3JlYXRlRWxlbWVudChuZXdOb2RlKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gcGFyZW50LmNoaWxkTm9kZXMubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChuZXdFbCk7XG4gICAgICAgICAgICBlbHNlIHBhcmVudC5pbnNlcnRCZWZvcmUobmV3RWwsIGVsKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQ2hhbmdlVHlwZS5SRU1PVkU6IHtcbiAgICAgICAgICAgIGlmICghZWwpIHJldHVybjtcbiAgICAgICAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChlbCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENoYW5nZVR5cGUuUkVQTEFDRToge1xuICAgICAgICAgICAgY29uc3QgeyBuZXdOb2RlIH0gPSBwYXRjaGVzO1xuICAgICAgICAgICAgY29uc3QgbmV3RWwgPSBjcmVhdGVFbGVtZW50KG5ld05vZGUpO1xuICAgICAgICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZChuZXdFbCwgZWwpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBDaGFuZ2VUeXBlLlVQREFURToge1xuICAgICAgICAgICAgY29uc3QgeyBjaGlsZHJlbiwgYXR0cmlidXRlcywgZXZlbnRzIH0gPSBwYXRjaGVzO1xuICAgICAgICAgICAgcGF0Y2hBdHRyaWJ1dGVzKGVsLCBhdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgIHBhdGNoRXZlbnRzKGVsLCBldmVudHMpO1xuICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQsIGluZGV4KSA9PiBwYXRjaChlbCwgY2hpbGQsIGluZGV4KSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcGF0Y2hFdmVudHMoZWwsIGV2ZW50cykge1xuICAgIGV2ZW50cy5mb3JFYWNoKHBhdGNoID0+IHtcbiAgICAgICAgY29uc3QgeyB0eXBlLCB2YWx1ZSwgb2xkVmFsdWUsIGV2ZW50TmFtZSB9ID0gcGF0Y2g7XG4gICAgICAgIGlmICh0eXBlID09PSBDaGFuZ2VUeXBlLkFERF9FVkVOVF9MSVNURU5FUilcbiAgICAgICAgICAgIHJldHVybiBlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgdmFsdWUpO1xuICAgICAgICBpZiAodHlwZSA9PT0gQ2hhbmdlVHlwZS5SRU1PVkVfRVZFTlRfTElTVEVORVIpXG4gICAgICAgICAgICByZXR1cm4gZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIG9sZFZhbHVlKTtcbiAgICAgICAgaWYgKHR5cGUgPT09IENoYW5nZVR5cGUuVVBEQVRFX0VWRU5UX0xJU1RFTkVSKSB7XG4gICAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgb2xkVmFsdWUpO1xuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHBhdGNoQXR0cmlidXRlcyhlbGVtZW50LCBhdHRyaWJ1dGVzKSB7XG4gICAgYXR0cmlidXRlcy5mb3JFYWNoKHBhdGNoID0+IHtcbiAgICAgICAgY29uc3QgeyB0eXBlLCBhdHRyTmFtZSwgdmFsdWUgfSA9IHBhdGNoO1xuICAgICAgICBpZiAodHlwZSA9PT0gQ2hhbmdlVHlwZS5TRVRfUFJPUFMpXG4gICAgICAgICAgICBzZXRBdHRyaWJ1dGUoZWxlbWVudCwgYXR0ck5hbWUsIHZhbHVlKTtcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gQ2hhbmdlVHlwZS5SRU1PVkVfUFJPUFMpXG4gICAgICAgICAgICByZW1vdmVBdHRyaWJ1dGUoZWxlbWVudCwgYXR0ck5hbWUsIHZhbHVlKVxuICAgIH0pXG59XG5cblxuZXhwb3J0IHtcbiAgICBwYXRjaFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vcGF0Y2gvaW5kZXguanMiLCJcbmltcG9ydCBPYnNlcnZlciBmcm9tICcuL29iamVjdCc7XG5pbXBvcnQgT2JzZXJ2ZXJBcnJheSBmcm9tICcuL2FycmF5JztcbmltcG9ydCB7IHdhbGssIG9ic2VydmVyIH0gZnJvbSAnLi91dGlscyc7XG5cblxuZXhwb3J0IHtcbiAgICBPYnNlcnZlcixcbiAgICBPYnNlcnZlckFycmF5LFxuICAgIHdhbGssIG9ic2VydmVyXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL29ic2VydmVyL2luZGV4LmpzIiwiXG5pbXBvcnQgeyB3YWxrLCBvYnNlcnZlciB9IGZyb20gJy4uL3V0aWxzL2luZGV4J1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2JzZXJ2ZXIge1xuICAgIGNvbnN0cnVjdG9yKG9iaiwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JqICE9PSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVHlwZSBcIk9iamVjdFwiIHJlcXVpcmVkIScpO1xuICAgICAgICB3YWxrKG9iaiwgKGtleSwgdmFsdWUpID0+IG9ic2VydmVyKFxuICAgICAgICAgICAgdGhpcywga2V5LCB2YWx1ZSxcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrLFxuICAgICAgICAgICAgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGZyb20gPSAob2JqLCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZlcihcbiAgICAgICAgICAgIG9iaixcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrLFxuICAgICAgICAgICAgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKVxuICAgIH07XG5cbiAgICBzdGF0aWMgdG9TdHJpbmcgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBgT2JzZXJ2ZXIgJHt0aGlzfWBcbiAgICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9vYnNlcnZlci9vYmplY3QvaW5kZXguanMiLCJcbmltcG9ydCBPYnNlcnZlciBmcm9tICcuLi9vYmplY3QnO1xuaW1wb3J0IE9ic2VydmVyQXJyYXkgZnJvbSAnLi4vYXJyYXknO1xuXG5cbmNvbnN0IG5vb3AgPSAoKSA9PiB7fTtcblxuXG5cbmZ1bmN0aW9uIHdhbGsob2JqLCBmdW4pIHtcbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEZ1bmN0aW9uIFwid2Fsa1wiIHJlcXVpcmUgYW4gXCJvYmplY3RcIiBpbnN0ZWFkIG9mICR7dHlwZW9mIG9ian1gKTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKVxuICAgICAgICByZXR1cm4gb2JqLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiBmdW4oaW5kZXgsIGl0ZW0sIG9iaikpO1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4gZnVuKGtleSwgb2JqW2tleV0sIG9iaikpO1xufVxuXG5mdW5jdGlvbiBvYnNlcnZlcihvYmosIGtleSwgdmFsdWUsIHNldHRlckNhbGxiYWNrPW5vb3AsIGdldHRlckNhbGxiYWNrPW5vb3ApIHtcbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEZ1bmN0aW9uIFwib2JzZXJ2ZXJcIiByZXF1aXJlIGFuIFwib2JqZWN0XCIgaW5zdGVhZCBvZiAke3R5cGVvZiBvYmp9YCk7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpXG4gICAgICAgIHZhbHVlID0gT2JzZXJ2ZXJBcnJheS5mcm9tKHZhbHVlLCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spO1xuICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgdmFsdWUgPSBPYnNlcnZlci5mcm9tKHZhbHVlLCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgICAgICBnZXR0ZXJDYWxsYmFjayhvYmosIGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgICAgIH0sXG4gICAgICAgIHNldDogbmV3VmFsdWUgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSBvYmpba2V5XTtcbiAgICAgICAgICAgIG9ic2VydmVyKG9iaiwga2V5LCBuZXdWYWx1ZSwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKTtcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrKG9iaiwga2V5LCBuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICB9XG4gICAgfSlcbn1cblxuXG5jb25zdCBnZXRVbmlxdWVJRCA9IGZ1bmN0aW9uKCkge1xuICAgIGxldCBpZCA9IDA7XG4gICAgcmV0dXJuICgoKSA9PiBpZCArKyk7XG59KCk7XG5cblxuZXhwb3J0IHtcbiAgICB3YWxrLFxuICAgIG9ic2VydmVyLFxuICAgIGdldFVuaXF1ZUlEXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL29ic2VydmVyL3V0aWxzL2luZGV4LmpzIiwiXG5pbXBvcnQgeyB3YWxrLCBvYnNlcnZlciB9IGZyb20gJy4uL3V0aWxzL2luZGV4JztcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9ic2VydmVyQXJyYXkge1xuICAgIGNvbnN0cnVjdG9yKGFycmF5LCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spIHtcbiAgICAgICAgIWFycmF5ICYmIChhcnJheSA9IFtdKTtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGFycmF5KSlcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1R5cGUgXCJBcnJheVwiIHJlcXVpcmVkIScpO1xuICAgICAgICB3YWxrKGFycmF5LCAoaW5kZXgsIGl0ZW0pID0+IG9ic2VydmVyKFxuICAgICAgICAgICAgdGhpcywgaW5kZXgsIGl0ZW0sXG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKSk7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGZyb20gPSAoYXJyYXksIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFjaykgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmVyQXJyYXkoXG4gICAgICAgICAgICBhcnJheSxcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrLFxuICAgICAgICAgICAgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKVxuICAgIH07XG4gICAgc3RhdGljIGlzT2JzZXJ2ZXJBcnJheSAgPSBhcnJheSA9PiB7XG4gICAgICAgIHJldHVybiBhcnJheS5fX3Byb3RvX18uY29uc3RydWN0b3IgPT09IE9ic2VydmVyQXJyYXk7XG4gICAgfTtcbiAgICBzdGF0aWMgb2YgPSAoLi4uYXJncykgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmVyQXJyYXkoWy4uLmFyZ3NdKVxuICAgIH07XG5cblxuICAgIGNvbmNhdCA9ICguLi5hcnJheXMpID0+IHtcbiAgICAgICAgY29uc3QgbmV3QXJyYXkgPSBuZXcgT2JzZXJ2ZXJBcnJheSgpO1xuICAgICAgICBbdGhpcywgLi4uYXJyYXlzXS5mb3JFYWNoKFxuICAgICAgICAgICAgYXJyYXkgPT4gYXJyYXkuZm9yRWFjaChuZXdBcnJheS5wdXNoKVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gbmV3QXJyYXk7XG4gICAgfTtcbiAgICBjb3B5V2l0aGluID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgLy8gVE9ET1xuICAgICAgICByZXR1cm4gT2JzZXJ2ZXJBcnJheS5mcm9tKFxuICAgICAgICAgICAgQXJyYXkuZnJvbSh0aGlzKS5jb3B5V2l0aGluKC4uLmFyZ3MpXG4gICAgICAgIClcbiAgICB9O1xuICAgIGVudHJpZXMgPSBmdW5jdGlvbiAqKCkge1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICB3aGlsZSAodGhpc1tpbmRleF0pXG4gICAgICAgICAgICB5aWVsZCBbaW5kZXgrKywgdGhpc1tpbmRleF1dO1xuICAgIH07XG4gICAgZXZlcnkgPSAoKSA9PiB7fTtcbiAgICBmaWxsID0gKCkgPT4ge307XG4gICAgZmlsdGVyID0gKCkgPT4ge307XG4gICAgZmluZCA9ICgpID0+IHt9O1xuICAgIGZpbmRJbmRleCA9ICgpID0+IHt9O1xuICAgIGZvckVhY2ggPSAoKSA9PiB7fTtcbiAgICBpbmNsdWRlcyA9ICgpID0+IHt9O1xuICAgIGluZGV4T2YgPSAoKSA9PiB7fTtcbiAgICBqb2luID0gKCkgPT4ge307XG4gICAga2V5cyA9ICgpID0+IHt9O1xuICAgIGxhc3RJbmRleE9mID0gKCkgPT4ge307XG4gICAgbWFwID0gKCkgPT4ge307XG4gICAgcG9wID0gKCkgPT4ge307XG4gICAgcHVzaCA9IHZhbHVlID0+IHtcbiAgICAgICAgb2JzZXJ2ZXIoXG4gICAgICAgICAgICB0aGlzLCB0aGlzLmxlbmd0aCwgdmFsdWUsXG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5sZW5ndGggKys7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIHJlZHVjZSA9ICgpID0+IHt9O1xuICAgIHJlZHVjZVJpZ2h0ID0gKCkgPT4ge307XG4gICAgcmV2ZXJzZSA9ICgpID0+IHt9O1xuICAgIHNoaWZ0ID0gKCkgPT4ge307XG4gICAgc2xpY2UgPSAoKSA9PiB7fTtcbiAgICBzb21lID0gKCkgPT4ge307XG4gICAgc29ydCA9ICgpID0+IHt9O1xuICAgIHNwbGljZSA9ICgpID0+IHt9O1xuICAgIHRvTG9jYWxlU3RyaW5nID0gKCkgPT4ge307XG4gICAgdG9Tb3VyY2UgPSAoKSA9PiB7fTtcbiAgICB0b1N0cmluZyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGBPYnNlcnZlckFycmF5IFsuLi5dYFxuICAgIH07XG4gICAgdW5zaGlmdCA9ICgpID0+IHt9O1xuICAgIHZhbHVlcyA9ICgpID0+IHt9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9vYnNlcnZlci9hcnJheS9pbmRleC5qcyIsIlxuZnVuY3Rpb24gZmxhdHRlbk5vZGUobm9kZSkge1xuICAgIGlmICghbm9kZSkgcmV0dXJuO1xuICAgIGlmIChub2RlLmNoaWxkcmVuKVxuICAgICAgICBub2RlLmNoaWxkcmVuID0gZmxhdHRlbkNoaWxkcmVuKG5vZGUuY2hpbGRyZW4pO1xuICAgIHJldHVybiBub2RlXG59XG5cbmZ1bmN0aW9uIGZsYXR0ZW5DaGlsZHJlbihjaGlsZHJlbikge1xuICAgIHJldHVybiBbXS5jb25jYXQoLi4uY2hpbGRyZW4pXG4gICAgICAgIC5tYXAobm9kZSA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG5vZGUgPT09ICdvYmplY3QnKVxuICAgICAgICAgICAgICAgIHJldHVybiBmbGF0dGVuTm9kZShub2RlKTtcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuIG5vZGU7XG4gICAgICAgIH0pXG4gICAgICAgIC5maWx0ZXIobm9kZSA9PiAhIW5vZGUpO1xufVxuXG5cbmV4cG9ydCB7XG4gICAgZmxhdHRlbk5vZGVcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvdXRpbHMvaW5kZXguanMiLCJcbmltcG9ydCB7IE11c2UgfSBmcm9tICcuLi9pbmRleCc7XG5cblxuXG5jbGFzcyBBcHAgZXh0ZW5kcyBNdXNlIHtcbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgbmFtZTogJ0pvZScsXG4gICAgICAgIGFnZTogMjIsXG4gICAgICAgIGxhbmdzOiBbXG4gICAgICAgICAgICAnSmF2YVNjcmlwdCcsXG4gICAgICAgICAgICAnUHl0aG9uJyxcbiAgICAgICAgICAgICdSdXN0JyxcbiAgICAgICAgICAgICdTY2FsYSdcbiAgICAgICAgXVxuICAgIH1cblxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgICBpc0FnZU9kZCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmFnZSAlIDIgIT09IDBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnN0YXRlLmFnZSArKztcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7IHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8aDE+SGVsbG8hPC9oMT5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICBtb2RlbD17dGhpcy5zdGF0ZS5uYW1lfVxuICAgICAgICAgICAgICAgIG9uS2V5VXA9eygpID0+IGNvbnNvbGUubG9nKHRoaXMuc3RhdGUubmFtZSl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHA+TXkgbmFtZSBpcyB7dGhpcy5zdGF0ZS5uYW1lfS48L3A+XG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBJJ20ge3RoaXMuc3RhdGUuYWdlfSB5ZWFycyBvbGRcbiAgICAgICAgICAgICAgICA8c3BhbiBpZj17dGhpcy5jb21wdXRlZC5pc0FnZU9kZH0+IGFuZCBpdCdzIGFuIG9kZCBudW1iZXIuPC9zcGFuPlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPHA+QW5kIEkgY2FuIHRob3NlIHByb2dyYW1taW5nIGxhbmd1YWdlczo8L3A+XG4gICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgPGxpIGZvcj17bGFuZyBpbiB0aGlzLnN0YXRlLmxhbmdzfT57bGFuZ308L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+Q2xpY2sgTWU8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgKX1cbn1cblxuXG5cbmNvbnN0IGFwcCA9IG5ldyBBcHAoKTtcbmFwcC5yZW5kZXJUbyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2V4YW1wbGUvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9