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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjM1NTE2OTY0M2NlNmNkMjIzMDAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9jcmVhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdHlwZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdHlwZXMvY2hhbmdlLmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3R5cGVzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9kaWZmL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3BhdGNoL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvb2JzZXJ2ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci9vYmplY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci91dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL29ic2VydmVyL2FycmF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZXhhbXBsZS9pbmRleC5qcyJdLCJuYW1lcyI6WyJNdXNlIiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJlbnRyeSIsIm5vZGUiLCJzdGF0ZSIsImNvbXB1dGVkIiwiY29tcG9uZW50V2lsbE1vdW50IiwiY29tcG9uZW50RGlkTW91bnQiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwic2hvdWxkQ29tcG9uZW50VXBkYXRlIiwiY29tcG9uZW50V2lsbFVwZGF0ZSIsImNvbXBvbmVudERpZFVwZGF0ZSIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwiY29tcG9uZW50RGlkQ2F0Y2giLCJpbml0T2JzZXJ2ZXIiLCJmcm9tIiwic2V0dGVyQ2FsbGJhY2siLCJpbml0Q29tcHV0ZWQiLCJuYW1lIiwiZ2V0dGVyIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwiZ2V0Iiwib2JqIiwia2V5IiwidmFsdWUiLCJvbGRWYWx1ZSIsIkVycm9yIiwiZGlmZkFuZFBhdGNoIiwiYmVmb3JlUmVuZGVyIiwicmVuZGVyIiwicmVuZGVyVG8iLCJhcHBlbmRDaGlsZCIsIm9sZE5vZGUiLCJwYXRjaGVzIiwiY3JlYXRlRWxlbWVudCIsImRpZmYiLCJwYXRjaCIsInV0aWxzIiwiZWwiLCJkb2N1bWVudCIsImVsZW1lbnROYW1lIiwiY2hpbGRyZW4iLCJhcHBlbmRDaGlsZHJlbiIsImF0dHJpYnV0ZXMiLCJjcmVhdGVUZXh0Tm9kZSIsInRhcmdldCIsIm1hcCIsImZvckVhY2giLCJzZXRBdHRyaWJ1dGVzIiwia2V5cyIsImZpbHRlciIsImhhc093blByb3BlcnR5IiwiYXR0ck5hbWUiLCJzZXRBdHRyaWJ1dGUiLCJhdHRyVmFsdWUiLCJpbmNsdWRlcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVBdHRyaWJ1dGUiLCJvbGRBdHRyVmFsdWUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaW5zZXJ0QWZ0ZXIiLCJuZXdFbCIsInRhcmdldEVsIiwicGFyZW50RWwiLCJwYXJlbnROb2RlIiwibGFzdENoaWxkIiwiaW5zZXJ0QmVmb3JlIiwibmV4dFNpYmxpbmciLCJDaGFuZ2VUeXBlIiwiRXZlbnRUeXBlIiwiRXZlbnRNYXAiLCJDaGFuZ2VkIiwiQ1JFQVRFIiwiUkVNT1ZFIiwiUkVQTEFDRSIsIlVQREFURSIsIlNFVF9QUk9QUyIsIlVQREFURV9QUk9QUyIsIlJFTU9WRV9QUk9QUyIsIkFERF9FVkVOVF9MSVNURU5FUiIsIlVQREFURV9FVkVOVF9MSVNURU5FUiIsIlJFTU9WRV9FVkVOVF9MSVNURU5FUiIsInJlZHVjZSIsImV2ZW50c01hcCIsImV2ZW50IiwicmVwbGFjZSIsImUiLCJ0b0xvd2VyQ2FzZSIsIm5ld05vZGUiLCJ0eXBlIiwiaXNDaGFuZ2VkIiwiZGlmZkNoaWxkcmVuIiwiZGlmZkF0dHJpYnV0ZXMiLCJuZXdBdHRyIiwib2xkQXR0ciIsInVuZGVmaW5lZCIsInB1c2giLCJuZXdDaGlsZCIsIm9sZENoaWxkIiwiQXJyYXkiLCJNYXRoIiwibWF4IiwibGVuZ3RoIiwiaSIsInBhcmVudCIsImluZGV4IiwiY2hpbGROb2RlcyIsInJlbW92ZUNoaWxkIiwicmVwbGFjZUNoaWxkIiwicGF0Y2hBdHRyaWJ1dGVzIiwiY2hpbGQiLCJlbGVtZW50IiwiaXNFdmVudCIsImV2ZW50TmFtZSIsIk9ic2VydmVyIiwiT2JzZXJ2ZXJBcnJheSIsIndhbGsiLCJvYnNlcnZlciIsImdldHRlckNhbGxiYWNrIiwiVHlwZUVycm9yIiwidG9TdHJpbmciLCJub29wIiwiZnVuIiwiaXNBcnJheSIsIml0ZW0iLCJzZXQiLCJuZXdWYWx1ZSIsImdldFVuaXF1ZUlEIiwiaWQiLCJhcnJheSIsImlzT2JzZXJ2ZXJBcnJheSIsIl9fcHJvdG9fXyIsIm9mIiwiYXJncyIsImNvbmNhdCIsImFycmF5cyIsIm5ld0FycmF5IiwiY29weVdpdGhpbiIsImVudHJpZXMiLCJldmVyeSIsImZpbGwiLCJmaW5kIiwiZmluZEluZGV4IiwiaW5kZXhPZiIsImpvaW4iLCJsYXN0SW5kZXhPZiIsInBvcCIsInJlZHVjZVJpZ2h0IiwicmV2ZXJzZSIsInNoaWZ0Iiwic2xpY2UiLCJzb21lIiwic29ydCIsInNwbGljZSIsInRvTG9jYWxlU3RyaW5nIiwidG9Tb3VyY2UiLCJ1bnNoaWZ0IiwidmFsdWVzIiwiZmxhdHRlbk5vZGUiLCJmbGF0dGVuQ2hpbGRyZW4iLCJBcHAiLCJhZ2UiLCJsYW5ncyIsInNob3dIZWxsbyIsImlzQWdlT2RkIiwiaGFuZGxlQ2xpY2siLCJsYW5nIiwiYXBwIiwiZ2V0RWxlbWVudEJ5SWQiXSwibWFwcGluZ3MiOiI7QUFB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QUFBQSxvQ0FhTSxLQUFLZCxLQUFMLENBQVdnSyxHQWJqQixnQkFjVyxLQUFLL0osUUFBTCxDQUFja0ssUUFkekI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsc0NBa0JrQixLQUFLbkssS0FBTCxDQUFXaUssS0FsQjdCO0FBQUE7QUFBQTtBQUFBLCtCQWtCcUNJLElBbEJyQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsNkJBb0JjLEtBQUtEO0FBcEJuQjtBQUFBO0FBQUE7QUFBQTtBQXNCVDtBQTdDaUIsQzs7O0FBa0R2QixNQUFNRSxNQUFNLElBQUlQLEdBQUosRUFBWjtBQUNBTyxJQUFJekksUUFBSixDQUFhUyxTQUFTaUksY0FBVCxDQUF3QixNQUF4QixDQUFiLEUiLCJmaWxlIjoiZXhhbXBsZS5idWlsZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9hc3NldHMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDIzNTUxNjk2NDNjZTZjZDIyMzAwIiwiXG5pbXBvcnQgTXVzZSBmcm9tICcuL2NvcmUnO1xuXG5cblxuZXhwb3J0IHtcbiAgICBNdXNlXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9pbmRleC5qcyIsIlxuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgZGlmZiwgcGF0Y2ggfSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgeyBPYnNlcnZlciwgb2JzZXJ2ZXIsIHdhbGsgfSBmcm9tICcuL29ic2VydmVyJztcbmltcG9ydCB7IGZsYXR0ZW5Ob2RlIH0gZnJvbSAnLi91dGlscydcblxuXG5cbmNsYXNzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgZW50cnkgPSBudWxsO1xuICAgIG5vZGUgPSBudWxsO1xuICAgIHN0YXRlID0ge307XG4gICAgY29tcHV0ZWQgPSB7fTtcblxuICAgIC8vIFRPRE86IExpZmVDeWNsZVxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHt9O1xuICAgIGNvbXBvbmVudERpZE1vdW50KCkge307XG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcygpIHt9O1xuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9O1xuICAgIGNvbXBvbmVudFdpbGxVcGRhdGUoKSB7fTtcbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7fTtcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHt9O1xuICAgIGNvbXBvbmVudERpZENhdGNoKCkge307XG5cbiAgICAvLyBPYnNlcnZlclxuICAgIGluaXRPYnNlcnZlcigpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IE9ic2VydmVyLmZyb20oXG4gICAgICAgICAgICB0aGlzLnN0YXRlIHx8IHt9LFxuICAgICAgICAgICAgOjp0aGlzLnNldHRlckNhbGxiYWNrXG4gICAgICAgICk7XG4gICAgfTtcbiAgICBpbml0Q29tcHV0ZWQoKSB7XG4gICAgICAgIHdhbGsoXG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVkLFxuICAgICAgICAgICAgKG5hbWUsIGdldHRlciwgY29tcHV0ZWQpID0+IHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29tcHV0ZWQsIG5hbWUsIHtcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgZ2V0OiB0aGlzOjpnZXR0ZXJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgfVxuICAgIHNldHRlckNhbGxiYWNrKG9iaiwga2V5LCB2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKG9iaiAhPT0gdGhpcy5zdGF0ZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQk9PTSEhIScpO1xuICAgICAgICB0aGlzLmRpZmZBbmRQYXRjaCgpO1xuICAgIH07XG5cbiAgICAvLyBSZW5kZXJcbiAgICBiZWZvcmVSZW5kZXIoKSB7XG4gICAgICAgIHRoaXMuaW5pdE9ic2VydmVyKCk7XG4gICAgICAgIHRoaXMuaW5pdENvbXB1dGVkKCk7XG4gICAgfTtcbiAgICByZW5kZXIoKSB7fTtcbiAgICByZW5kZXJUbyhlbnRyeSkge1xuICAgICAgICB0aGlzLmJlZm9yZVJlbmRlcigpO1xuICAgICAgICB0aGlzLm5vZGUgPSBmbGF0dGVuTm9kZSh0aGlzLnJlbmRlcigpKTtcbiAgICAgICAgdGhpcy5lbnRyeSA9IGVudHJ5O1xuICAgICAgICB0aGlzLmVudHJ5LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQodGhpcy5ub2RlKSlcbiAgICB9O1xuICAgIGRpZmZBbmRQYXRjaCgpIHtcbiAgICAgICAgY29uc3Qgb2xkTm9kZSA9IHRoaXMubm9kZTtcbiAgICAgICAgdGhpcy5ub2RlID0gZmxhdHRlbk5vZGUodGhpcy5yZW5kZXIoKSk7XG4gICAgICAgIGNvbnN0IHBhdGNoZXMgPSBkaWZmKHRoaXMubm9kZSwgb2xkTm9kZSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG9sZE5vZGUpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLm5vZGUpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhwYXRjaGVzKTtcbiAgICAgICAgcGF0Y2godGhpcy5lbnRyeSwgcGF0Y2hlcyk7XG4gICAgfTtcbn1cblxuXG5cbmV4cG9ydCBkZWZhdWx0IENvbXBvbmVudDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvaW5kZXguanMiLCJcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tICcuL2NyZWF0ZSc7XG5pbXBvcnQgeyBkaWZmIH0gZnJvbSAnLi9kaWZmJztcbmltcG9ydCB7IHBhdGNoIH0gZnJvbSAnLi9wYXRjaCc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XG5cblxuZXhwb3J0IHtcbiAgICBjcmVhdGVFbGVtZW50LFxuICAgIGRpZmYsXG4gICAgcGF0Y2gsXG4gICAgdXRpbHNcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL2luZGV4LmpzIiwiXG5pbXBvcnQgeyBzZXRBdHRyaWJ1dGVzIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5cblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudChub2RlKSB7XG4gICAgLypcbiAgICBub2RlOiBTdHJpbmcgfHwge1xuICAgICAgICBlbGVtZW50TmFtZTogU3RyaW5nXG4gICAgICAgIGNoaWxkcmVuOiBub2RlW11cbiAgICAgICAgYXR0cmlidXRlczogT2JqZWN0XG4gICAgfVxuICAgICovXG4gICAgaWYgKHR5cGVvZiBub2RlID09PSAnb2JqZWN0Jykge1xuICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobm9kZS5lbGVtZW50TmFtZSk7XG4gICAgICAgIG5vZGUuY2hpbGRyZW4gJiYgYXBwZW5kQ2hpbGRyZW4oZWwsIG5vZGUuY2hpbGRyZW4pO1xuICAgICAgICBzZXRBdHRyaWJ1dGVzKGVsLCBub2RlLmF0dHJpYnV0ZXMpO1xuICAgICAgICByZXR1cm4gZWw7XG4gICAgfVxuICAgIGVsc2UgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG5vZGUpO1xufVxuXG5cbmZ1bmN0aW9uIGFwcGVuZENoaWxkcmVuKHRhcmdldCwgY2hpbGRyZW4pIHtcbiAgICBjaGlsZHJlbi5tYXAoY3JlYXRlRWxlbWVudClcbiAgICAgICAgLmZvckVhY2goOjp0YXJnZXQuYXBwZW5kQ2hpbGQpXG59XG5cblxuXG5leHBvcnQge1xuICAgIGNyZWF0ZUVsZW1lbnRcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL2NyZWF0ZS9pbmRleC5qcyIsIlxuaW1wb3J0IHsgRXZlbnRUeXBlLCBFdmVudE1hcCB9IGZyb20gJy4uL3R5cGVzJztcblxuXG5cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXModGFyZ2V0LCBhdHRyaWJ1dGVzPXt9KSB7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcylcbiAgICAgICAgLmZpbHRlcihrZXkgPT4gYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICAuZm9yRWFjaChhdHRyTmFtZSA9PiBzZXRBdHRyaWJ1dGUodGFyZ2V0LCBhdHRyTmFtZSwgYXR0cmlidXRlc1thdHRyTmFtZV0pKTtcbn1cblxuXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGUodGFyZ2V0LCBhdHRyTmFtZSwgYXR0clZhbHVlKSB7XG4gICAgYXR0ck5hbWUgPT09ICdjbGFzc05hbWUnICYmIChhdHRyTmFtZSA9ICdjbGFzcycpO1xuICAgIGlmIChFdmVudFR5cGUuaW5jbHVkZXMoYXR0ck5hbWUpKVxuICAgICAgICByZXR1cm4gdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICBFdmVudE1hcFthdHRyTmFtZV0sXG4gICAgICAgICAgICBhdHRyVmFsdWVcbiAgICAgICAgKTtcbiAgICBpZiAoYXR0ck5hbWUgPT09ICdjaGVja2VkJylcbiAgICAgICAgcmV0dXJuIHRhcmdldFthdHRyTmFtZV0gPSBhdHRyVmFsdWU7XG4gICAgdGFyZ2V0LnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKTtcbn1cblxuXG5mdW5jdGlvbiByZW1vdmVBdHRyaWJ1dGUodGFyZ2V0LCBhdHRyTmFtZSwgb2xkQXR0clZhbHVlKSB7XG4gICAgYXR0ck5hbWUgPT09ICdjbGFzc05hbWUnICYmIChhdHRyTmFtZSA9ICdjbGFzcycpO1xuICAgIGlmIChFdmVudFR5cGUuaW5jbHVkZXMoYXR0ck5hbWUpKVxuICAgICAgICByZXR1cm4gdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICBFdmVudE1hcFthdHRyTmFtZV0sXG4gICAgICAgICAgICBvbGRBdHRyVmFsdWVcbiAgICAgICAgKTtcbiAgICB0YXJnZXQucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcbn1cblxuXG5mdW5jdGlvbiBpbnNlcnRBZnRlcihuZXdFbCwgdGFyZ2V0RWwpIHtcbiAgICBjb25zdCBwYXJlbnRFbCA9IHRhcmdldEVsLnBhcmVudE5vZGU7XG4gICAgaWYgKHBhcmVudEVsLmxhc3RDaGlsZCA9PT0gdGFyZ2V0RWwpXG4gICAgICAgIHJldHVybiBwYXJlbnRFbC5hcHBlbmRDaGlsZChuZXdFbCk7XG4gICAgcmV0dXJuIHBhcmVudEVsLmluc2VydEJlZm9yZShuZXdFbCx0YXJnZXRFbC5uZXh0U2libGluZyk7XG59XG5cblxuZXhwb3J0IHtcbiAgICBzZXRBdHRyaWJ1dGVzLFxuICAgIHNldEF0dHJpYnV0ZSxcbiAgICByZW1vdmVBdHRyaWJ1dGUsXG4gICAgaW5zZXJ0QWZ0ZXJcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3V0aWxzL2luZGV4LmpzIiwiXG5pbXBvcnQgQ2hhbmdlVHlwZSBmcm9tICcuL2NoYW5nZSc7XG5pbXBvcnQgeyBFdmVudFR5cGUsIEV2ZW50TWFwIH0gZnJvbSAnLi9ldmVudHMnO1xuXG5leHBvcnQge1xuICAgIENoYW5nZVR5cGUsXG4gICAgRXZlbnRUeXBlLFxuICAgIEV2ZW50TWFwXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS90eXBlcy9pbmRleC5qcyIsIlxuY29uc3QgQ2hhbmdlZCA9IHtcbiAgICBDUkVBVEU6ICdDUkVBVEUnLFxuICAgIFJFTU9WRTogJ1JFTU9WRScsXG4gICAgUkVQTEFDRTogJ1JFUExBQ0UnLFxuICAgIFVQREFURTogJ1VQREFURScsXG5cbiAgICBTRVRfUFJPUFM6ICdTRVQgUFJPUFMnLFxuICAgIFVQREFURV9QUk9QUzogJ1VQREFURSBQUk9QUycsXG4gICAgUkVNT1ZFX1BST1BTOiAnUkVNT1ZFIFBST1BTJyxcblxuICAgIC8vIFRPRE9cbiAgICBBRERfRVZFTlRfTElTVEVORVI6ICdBREQgRVZFTlQgTElTVEVORVInLFxuICAgIFVQREFURV9FVkVOVF9MSVNURU5FUjogJ1VQREFURSBFVkVOVCBMSVNURU5FUicsXG4gICAgUkVNT1ZFX0VWRU5UX0xJU1RFTkVSOiAnUkVNT1ZFIEVWRU5UIExJU1RFTkVSJyxcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgQ2hhbmdlZDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3R5cGVzL2NoYW5nZS5qcyIsIlxuY29uc3QgRXZlbnRUeXBlID0gW1xuICAgIC8vIENsaXBib2FyZCBFdmVudHNcbiAgICAnb25Db3B5JywgJ29uQ3V0JywgJ29uUGFzdGUnLFxuICAgIC8vIENvbXBvc2l0aW9uIEV2ZW50c1xuICAgICdvbkNvbXBvc2l0aW9uRW5kJywgJ29uQ29tcG9zaXRpb25TdGFydCcsICdvbkNvbXBvc2l0aW9uVXBkYXRlJyxcbiAgICAvLyBLZXlib2FyZCBFdmVudHNcbiAgICAnb25LZXlEb3duJywgJ29uS2V5UHJlc3MnLCAnb25LZXlVcCcsXG4gICAgLy8gRm9jdXMgRXZlbnRzXG4gICAgJ29uRm9jdXMnLCAnb25CbHVyJyxcbiAgICAvLyBGb3JtIEV2ZW50c1xuICAgICdvbkNoYW5nZScsICdvbklucHV0JywgJ29uSW52YWxpZCcsICdvblN1Ym1pdCcsXG4gICAgLy8gTW91c2UgRXZlbnRzXG4gICAgJ29uQ2xpY2snLCAnb25Db250ZXh0TWVudScsICdvbkRvdWJsZUNsaWNrJyxcbiAgICAnb25EcmFnJywgJ29uRHJhZ0VuZCcsICdvbkRyYWdFbnRlcicsICdvbkRyYWdFeGl0JyxcbiAgICAnb25EcmFnTGVhdmUnLCAnb25EcmFnT3ZlcicsICdvbkRyYWdTdGFydCcsXG4gICAgJ29uRHJvcCcsICdvbk1vdXNlRG93bicsICdvbk1vdXNlRW50ZXInLFxuICAgICdvbk1vdXNlTGVhdmUnLCAnb25Nb3VzZU1vdmUnLCAnb25Nb3VzZU91dCcsXG4gICAgJ29uTW91c2VPdmVyJyAsJ29uTW91c2VVcCcsXG4gICAgLy8gU2VsZWN0aW9uIEV2ZW50c1xuICAgICdvblNlbGVjdCcsXG4gICAgLy8gVG91Y2ggRXZlbnRzXG4gICAgJ29uVG91Y2hDYW5jZWwnLCAnb25Ub3VjaEVuZCcsICdvblRvdWNoTW92ZScsICdvblRvdWNoU3RhcnQnLFxuICAgIC8vIFVJIEV2ZW50c1xuICAgICdvblNjcm9sbCcsXG4gICAgLy8gV2hlZWwgRXZlbnRzXG4gICAgJ29uV2hlZWwnLFxuICAgIC8vIE1lZGlhIEV2ZW50c1xuICAgICdvbkFib3J0JywgJ29uQ2FuUGxheScsICdvbkNhblBsYXlUaHJvdWdoJyxcbiAgICAnb25EdXJhdGlvbkNoYW5nZScsICdvbkVtcHRpZWQnLCAnb25FbmNyeXB0ZWRvbkVuZGVkJyxcbiAgICAnb25FcnJvcicsICdvbkxvYWRlZERhdGEnLCAnb25Mb2FkZWRNZXRhZGF0YScsXG4gICAgJ29uTG9hZFN0YXJ0JywgJ29uUGF1c2UnLCAnb25QbGF5b25QbGF5aW5nJyxcbiAgICAnb25Qcm9ncmVzcycsICdvblJhdGVDaGFuZ2UnLCAnb25TZWVrZWQnLFxuICAgICdvblNlZWtpbmcnLCAnb25TdGFsbGVkJywgJ29uU3VzcGVuZG9uVGltZVVwZGF0ZScsXG4gICAgJ29uVm9sdW1lQ2hhbmdlJywgJ29uV2FpdGluZycsXG4gICAgLy8gSW1hZ2UgRXZlbnRzXG4gICAgJ29uTG9hZCcsICdvbkVycm9yJyxcbiAgICAvLyBBbmltYXRpb24gRXZlbnRzXG4gICAgJ29uQW5pbWF0aW9uU3RhcnQnLCAnb25BbmltYXRpb25FbmQnLCAnb25BbmltYXRpb25JdGVyYXRpb24nLFxuICAgIC8vIFRyYW5zaXRpb24gRXZlbnRzXG4gICAgJ29uVHJhbnNpdGlvbkVuZCcsXG4gICAgLy8gT3RoZXIgRXZlbnRzXG4gICAgJ29uVG9nZ2xlJ1xuXTtcblxuXG5jb25zdCBFdmVudE1hcCA9IEV2ZW50VHlwZS5yZWR1Y2UoKGV2ZW50c01hcCwgZXZlbnQpID0+IHtcbiAgICBldmVudHNNYXBbZXZlbnRdID0gZXZlbnRcbiAgICAgICAgLnJlcGxhY2UoJ29uJywgJycpXG4gICAgICAgIC5yZXBsYWNlKC9bQS1aXS9nLCBlID0+IGUudG9Mb3dlckNhc2UoKSk7XG4gICAgcmV0dXJuIGV2ZW50c01hcDtcbn0sIHt9KTtcblxuXG5leHBvcnQge1xuICAgIEV2ZW50VHlwZSxcbiAgICBFdmVudE1hcFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vdHlwZXMvZXZlbnRzLmpzIiwiXG5pbXBvcnQgeyBDaGFuZ2VUeXBlLCBFdmVudFR5cGUgfSBmcm9tICcuLi90eXBlcy9pbmRleCc7XG5cblxuXG5mdW5jdGlvbiBkaWZmKG5ld05vZGUsIG9sZE5vZGUpIHtcbiAgICAvKlxuICAgIHJldHVybiB0eXBlIFBhdGNoIHtcbiAgICAgICAgdHlwZTogQ2hhbmdlVHlwZVxuICAgICAgICBuZXdOb2RlPzogTm9kZVxuICAgICAgICBjaGlsZHJlbj86IFBhdGNoW11cbiAgICAgICAgYXR0cmlidXRlcz86IFBhdGNoW11cbiAgICB9XG4gICAgICovXG4gICAgaWYgKCFvbGROb2RlKSByZXR1cm4geyB0eXBlOiBDaGFuZ2VUeXBlLkNSRUFURSwgbmV3Tm9kZSB9O1xuICAgIGVsc2UgaWYgKCFuZXdOb2RlKSByZXR1cm4geyB0eXBlOiBDaGFuZ2VUeXBlLlJFTU9WRSB9O1xuICAgIGVsc2UgaWYgKGlzQ2hhbmdlZChuZXdOb2RlLCBvbGROb2RlKSkgcmV0dXJuIHsgdHlwZTogQ2hhbmdlVHlwZS5SRVBMQUNFLCBuZXdOb2RlIH07XG4gICAgZWxzZSBpZiAobmV3Tm9kZS5lbGVtZW50TmFtZSlcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IENoYW5nZVR5cGUuVVBEQVRFLFxuICAgICAgICAgICAgY2hpbGRyZW46IGRpZmZDaGlsZHJlbihuZXdOb2RlLCBvbGROb2RlKSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IGRpZmZBdHRyaWJ1dGVzKG5ld05vZGUsIG9sZE5vZGUpLFxuICAgICAgICB9O1xufVxuXG5mdW5jdGlvbiBpc0NoYW5nZWQobmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIHJldHVybiB0eXBlb2YgbmV3Tm9kZSAhPT0gdHlwZW9mIG9sZE5vZGUgfHxcbiAgICAgICAgdHlwZW9mIG5ld05vZGUgIT09IFwib2JqZWN0XCIgJiYgbmV3Tm9kZSAhPT0gb2xkTm9kZSB8fFxuICAgICAgICB0eXBlb2YgbmV3Tm9kZSA9PT0gXCJvYmplY3RcIiAmJiBuZXdOb2RlLmVsZW1lbnROYW1lICE9PSBvbGROb2RlLmVsZW1lbnROYW1lXG59XG5cblxuZnVuY3Rpb24gZGlmZkF0dHJpYnV0ZXMobmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIGNvbnN0IHBhdGNoZXMgID0gW107XG4gICAgY29uc3QgYXR0cmlidXRlcyA9IHsuLi5vbGROb2RlLmF0dHJpYnV0ZXMsIC4uLm5ld05vZGUuYXR0cmlidXRlc307XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcylcbiAgICAgICAgLmZvckVhY2goYXR0ck5hbWUgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmV3QXR0ciA9IG5ld05vZGUuYXR0cmlidXRlc1thdHRyTmFtZV07XG4gICAgICAgICAgICBjb25zdCBvbGRBdHRyID0gb2xkTm9kZS5hdHRyaWJ1dGVzW2F0dHJOYW1lXTtcbiAgICAgICAgICAgIGlmIChuZXdBdHRyID09PSB1bmRlZmluZWQgJiYgb2xkQXR0ciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHJldHVybiBwYXRjaGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlLlJFTU9WRV9QUk9QUyxcbiAgICAgICAgICAgICAgICAgICAgb2xkVmFsdWU6IG9sZEF0dHIsIGF0dHJOYW1lXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAob2xkQXR0ciA9PT0gdW5kZWZpbmVkICYmIG5ld0F0dHIgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICByZXR1cm4gcGF0Y2hlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogQ2hhbmdlVHlwZS5TRVRfUFJPUFMsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBuZXdBdHRyLCBhdHRyTmFtZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKG5ld0F0dHIgIT09IHVuZGVmaW5lZCAmJiBvbGRBdHRyICE9PSB1bmRlZmluZWQgJiYgb2xkQXR0ciAhPT0gbmV3QXR0cilcbiAgICAgICAgICAgICAgICByZXR1cm4gcGF0Y2hlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogQ2hhbmdlVHlwZS5VUERBVEVfUFJPUFMsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBuZXdBdHRyLCBvbGRWYWx1ZTogb2xkQXR0ciwgYXR0ck5hbWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgcmV0dXJuIHBhdGNoZXM7XG59XG5cblxuZnVuY3Rpb24gZGlmZkNoaWxkcmVuKG5ld05vZGUsIG9sZE5vZGUpIHtcbiAgICBjb25zdCBuZXdDaGlsZCA9IG5ld05vZGUuY2hpbGRyZW4gfHwgW107XG4gICAgY29uc3Qgb2xkQ2hpbGQgPSBvbGROb2RlLmNoaWxkcmVuIHx8IFtdO1xuICAgIHJldHVybiBbLi4uQXJyYXkoTWF0aC5tYXgoXG4gICAgICAgIG5ld0NoaWxkLmxlbmd0aCwgb2xkQ2hpbGQubGVuZ3RoXG4gICAgKSkua2V5cygpXS5tYXAoaSA9PiBkaWZmKG5ld0NoaWxkW2ldLCBvbGRDaGlsZFtpXSkpO1xufVxuXG5cbmV4cG9ydCB7XG4gICAgZGlmZlxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS9kaWZmL2luZGV4LmpzIiwiXG5pbXBvcnQgeyBDaGFuZ2VUeXBlIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gJy4uL2NyZWF0ZS9pbmRleCc7XG5pbXBvcnQgeyBzZXRBdHRyaWJ1dGUsIHJlbW92ZUF0dHJpYnV0ZSB9IGZyb20gXCIuLi91dGlscy9pbmRleFwiO1xuaW1wb3J0IHtFdmVudE1hcCwgRXZlbnRUeXBlfSBmcm9tIFwiLi4vdHlwZXMvZXZlbnRzXCI7XG5cblxuXG5mdW5jdGlvbiBwYXRjaChwYXJlbnQsIHBhdGNoZXMsIGluZGV4PTApIHtcbiAgICBpZiAoIXBhdGNoZXMpIHJldHVybjtcbiAgICBjb25zdCBlbCA9IHBhcmVudC5jaGlsZE5vZGVzW2luZGV4XTtcbiAgICBzd2l0Y2ggKHBhdGNoZXMudHlwZSkge1xuICAgICAgICBjYXNlIENoYW5nZVR5cGUuQ1JFQVRFOiB7XG4gICAgICAgICAgICBjb25zdCB7IG5ld05vZGUgfSA9IHBhdGNoZXM7XG4gICAgICAgICAgICBjb25zdCBuZXdFbCA9IGNyZWF0ZUVsZW1lbnQobmV3Tm9kZSk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IHBhcmVudC5jaGlsZE5vZGVzLmxlbmd0aClcbiAgICAgICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQobmV3RWwpO1xuICAgICAgICAgICAgZWxzZSBwYXJlbnQuaW5zZXJ0QmVmb3JlKG5ld0VsLCBlbCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENoYW5nZVR5cGUuUkVNT1ZFOiB7XG4gICAgICAgICAgICBpZiAoIWVsKSByZXR1cm47XG4gICAgICAgICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBDaGFuZ2VUeXBlLlJFUExBQ0U6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgbmV3Tm9kZSB9ID0gcGF0Y2hlcztcbiAgICAgICAgICAgIGNvbnN0IG5ld0VsID0gY3JlYXRlRWxlbWVudChuZXdOb2RlKTtcbiAgICAgICAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQobmV3RWwsIGVsKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQ2hhbmdlVHlwZS5VUERBVEU6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgY2hpbGRyZW4sIGF0dHJpYnV0ZXMgfSA9IHBhdGNoZXM7XG4gICAgICAgICAgICBwYXRjaEF0dHJpYnV0ZXMoZWwsIGF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQsIGluZGV4KSA9PiBwYXRjaChlbCwgY2hpbGQsIGluZGV4KSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5mdW5jdGlvbiBwYXRjaEF0dHJpYnV0ZXMoZWxlbWVudCwgYXR0cmlidXRlcykge1xuICAgIGF0dHJpYnV0ZXMuZm9yRWFjaChwYXRjaCA9PiB7XG4gICAgICAgIGNvbnN0IHsgdHlwZSwgYXR0ck5hbWUsIHZhbHVlLCBvbGRWYWx1ZSB9ID0gcGF0Y2g7XG4gICAgICAgIGNvbnN0IGlzRXZlbnQgPSBFdmVudFR5cGUuaW5jbHVkZXMoYXR0ck5hbWUpO1xuICAgICAgICBjb25zdCBldmVudE5hbWUgPSBpc0V2ZW50ICYmIEV2ZW50TWFwW2F0dHJOYW1lXTtcblxuICAgICAgICAvLyAhaXNFdmVudCAmJiBjb25zb2xlLmxvZyh0eXBlLCBhdHRyTmFtZSwgdmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgICAgaWYgKHR5cGUgPT09IENoYW5nZVR5cGUuU0VUX1BST1BTKVxuICAgICAgICAgICAgcmV0dXJuIGlzRXZlbnQgP1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIHZhbHVlKSA6XG4gICAgICAgICAgICAgICAgc2V0QXR0cmlidXRlKGVsZW1lbnQsIGF0dHJOYW1lLCB2YWx1ZSk7XG4gICAgICAgIGlmICh0eXBlID09PSBDaGFuZ2VUeXBlLlJFTU9WRV9QUk9QUylcbiAgICAgICAgICAgIHJldHVybiBpc0V2ZW50ID9cbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBvbGRWYWx1ZSkgOlxuICAgICAgICAgICAgICAgIHJlbW92ZUF0dHJpYnV0ZShlbGVtZW50LCBhdHRyTmFtZSwgdmFsdWUpO1xuICAgICAgICBpZiAodHlwZSA9PT0gQ2hhbmdlVHlwZS5VUERBVEVfUFJPUFMpIHtcbiAgICAgICAgICAgIGlmIChpc0V2ZW50KSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgb2xkVmFsdWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXRBdHRyaWJ1dGUoZWxlbWVudCwgYXR0ck5hbWUsIHZhbHVlLCBvbGRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5cbmV4cG9ydCB7XG4gICAgcGF0Y2hcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3BhdGNoL2luZGV4LmpzIiwiXG5pbXBvcnQgT2JzZXJ2ZXIgZnJvbSAnLi9vYmplY3QnO1xuaW1wb3J0IE9ic2VydmVyQXJyYXkgZnJvbSAnLi9hcnJheSc7XG5pbXBvcnQgeyB3YWxrLCBvYnNlcnZlciB9IGZyb20gJy4vdXRpbHMnO1xuXG5cbmV4cG9ydCB7XG4gICAgT2JzZXJ2ZXIsXG4gICAgT2JzZXJ2ZXJBcnJheSxcbiAgICB3YWxrLCBvYnNlcnZlclxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9vYnNlcnZlci9pbmRleC5qcyIsIlxuaW1wb3J0IHsgd2Fsaywgb2JzZXJ2ZXIgfSBmcm9tICcuLi91dGlscy9pbmRleCdcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9ic2VydmVyIHtcbiAgICBjb25zdHJ1Y3RvcihvYmosIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFjaykge1xuICAgICAgICBpZiAodHlwZW9mIG9iaiAhPT0gXCJvYmplY3RcIilcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1R5cGUgXCJPYmplY3RcIiByZXF1aXJlZCEnKTtcbiAgICAgICAgd2FsayhvYmosIChrZXksIHZhbHVlKSA9PiBvYnNlcnZlcihcbiAgICAgICAgICAgIHRoaXMsIGtleSwgdmFsdWUsXG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjayxcbiAgICAgICAgICAgIGdldHRlckNhbGxiYWNrXG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIHN0YXRpYyBmcm9tID0gKG9iaiwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2ZXIoXG4gICAgICAgICAgICBvYmosXG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjayxcbiAgICAgICAgICAgIGdldHRlckNhbGxiYWNrXG4gICAgICAgIClcbiAgICB9O1xuXG4gICAgc3RhdGljIHRvU3RyaW5nID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gYE9ic2VydmVyICR7dGhpc31gXG4gICAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvb2JzZXJ2ZXIvb2JqZWN0L2luZGV4LmpzIiwiXG5pbXBvcnQgT2JzZXJ2ZXIgZnJvbSAnLi4vb2JqZWN0JztcbmltcG9ydCBPYnNlcnZlckFycmF5IGZyb20gJy4uL2FycmF5JztcblxuXG5jb25zdCBub29wID0gKCkgPT4ge307XG5cblxuXG5mdW5jdGlvbiB3YWxrKG9iaiwgZnVuKSB7XG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBGdW5jdGlvbiBcIndhbGtcIiByZXF1aXJlIGFuIFwib2JqZWN0XCIgaW5zdGVhZCBvZiAke3R5cGVvZiBvYmp9YCk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSlcbiAgICAgICAgcmV0dXJuIG9iai5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4gZnVuKGluZGV4LCBpdGVtLCBvYmopKTtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IGZ1bihrZXksIG9ialtrZXldLCBvYmopKTtcbn1cblxuZnVuY3Rpb24gb2JzZXJ2ZXIob2JqLCBrZXksIHZhbHVlLCBzZXR0ZXJDYWxsYmFjaz1ub29wLCBnZXR0ZXJDYWxsYmFjaz1ub29wKSB7XG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBGdW5jdGlvbiBcIm9ic2VydmVyXCIgcmVxdWlyZSBhbiBcIm9iamVjdFwiIGluc3RlYWQgb2YgJHt0eXBlb2Ygb2JqfWApO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKVxuICAgICAgICB2YWx1ZSA9IE9ic2VydmVyQXJyYXkuZnJvbSh2YWx1ZSwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKTtcbiAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXG4gICAgICAgIHZhbHVlID0gT2JzZXJ2ZXIuZnJvbSh2YWx1ZSwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGdldDogKCkgPT4ge1xuICAgICAgICAgICAgZ2V0dGVyQ2FsbGJhY2sob2JqLCBrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICB9LFxuICAgICAgICBzZXQ6IG5ld1ZhbHVlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9sZFZhbHVlID0gb2JqW2tleV07XG4gICAgICAgICAgICBvYnNlcnZlcihvYmosIGtleSwgbmV3VmFsdWUsIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFjayk7XG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjayhvYmosIGtleSwgbmV3VmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0pXG59XG5cblxuY29uc3QgZ2V0VW5pcXVlSUQgPSBmdW5jdGlvbigpIHtcbiAgICBsZXQgaWQgPSAwO1xuICAgIHJldHVybiAoKCkgPT4gaWQgKyspO1xufSgpO1xuXG5cbmV4cG9ydCB7XG4gICAgd2FsayxcbiAgICBvYnNlcnZlcixcbiAgICBnZXRVbmlxdWVJRFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9vYnNlcnZlci91dGlscy9pbmRleC5qcyIsIlxuaW1wb3J0IHsgd2Fsaywgb2JzZXJ2ZXIgfSBmcm9tICcuLi91dGlscy9pbmRleCc7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPYnNlcnZlckFycmF5IHtcbiAgICBjb25zdHJ1Y3RvcihhcnJheSwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKSB7XG4gICAgICAgICFhcnJheSAmJiAoYXJyYXkgPSBbXSk7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShhcnJheSkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUeXBlIFwiQXJyYXlcIiByZXF1aXJlZCEnKTtcbiAgICAgICAgd2FsayhhcnJheSwgKGluZGV4LCBpdGVtKSA9PiBvYnNlcnZlcihcbiAgICAgICAgICAgIHRoaXMsIGluZGV4LCBpdGVtLFxuICAgICAgICAgICAgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrXG4gICAgICAgICkpO1xuICAgICAgICB0aGlzLmxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBmcm9tID0gKGFycmF5LCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZlckFycmF5KFxuICAgICAgICAgICAgYXJyYXksXG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjayxcbiAgICAgICAgICAgIGdldHRlckNhbGxiYWNrXG4gICAgICAgIClcbiAgICB9O1xuICAgIHN0YXRpYyBpc09ic2VydmVyQXJyYXkgID0gYXJyYXkgPT4ge1xuICAgICAgICByZXR1cm4gYXJyYXkuX19wcm90b19fLmNvbnN0cnVjdG9yID09PSBPYnNlcnZlckFycmF5O1xuICAgIH07XG4gICAgc3RhdGljIG9mID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZlckFycmF5KFsuLi5hcmdzXSlcbiAgICB9O1xuXG5cbiAgICBjb25jYXQgPSAoLi4uYXJyYXlzKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0FycmF5ID0gbmV3IE9ic2VydmVyQXJyYXkoKTtcbiAgICAgICAgW3RoaXMsIC4uLmFycmF5c10uZm9yRWFjaChcbiAgICAgICAgICAgIGFycmF5ID0+IGFycmF5LmZvckVhY2gobmV3QXJyYXkucHVzaClcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIG5ld0FycmF5O1xuICAgIH07XG4gICAgY29weVdpdGhpbiA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgIC8vIFRPRE9cbiAgICAgICAgcmV0dXJuIE9ic2VydmVyQXJyYXkuZnJvbShcbiAgICAgICAgICAgIEFycmF5LmZyb20odGhpcykuY29weVdpdGhpbiguLi5hcmdzKVxuICAgICAgICApXG4gICAgfTtcbiAgICBlbnRyaWVzID0gZnVuY3Rpb24gKigpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgd2hpbGUgKHRoaXNbaW5kZXhdKVxuICAgICAgICAgICAgeWllbGQgW2luZGV4KyssIHRoaXNbaW5kZXhdXTtcbiAgICB9O1xuICAgIGV2ZXJ5ID0gKCkgPT4ge307XG4gICAgZmlsbCA9ICgpID0+IHt9O1xuICAgIGZpbHRlciA9ICgpID0+IHt9O1xuICAgIGZpbmQgPSAoKSA9PiB7fTtcbiAgICBmaW5kSW5kZXggPSAoKSA9PiB7fTtcbiAgICBmb3JFYWNoID0gKCkgPT4ge307XG4gICAgaW5jbHVkZXMgPSAoKSA9PiB7fTtcbiAgICBpbmRleE9mID0gKCkgPT4ge307XG4gICAgam9pbiA9ICgpID0+IHt9O1xuICAgIGtleXMgPSAoKSA9PiB7fTtcbiAgICBsYXN0SW5kZXhPZiA9ICgpID0+IHt9O1xuICAgIG1hcCA9ICgpID0+IHt9O1xuICAgIHBvcCA9ICgpID0+IHt9O1xuICAgIHB1c2ggPSB2YWx1ZSA9PiB7XG4gICAgICAgIG9ic2VydmVyKFxuICAgICAgICAgICAgdGhpcywgdGhpcy5sZW5ndGgsIHZhbHVlLFxuICAgICAgICAgICAgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMubGVuZ3RoICsrO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICByZWR1Y2UgPSAoKSA9PiB7fTtcbiAgICByZWR1Y2VSaWdodCA9ICgpID0+IHt9O1xuICAgIHJldmVyc2UgPSAoKSA9PiB7fTtcbiAgICBzaGlmdCA9ICgpID0+IHt9O1xuICAgIHNsaWNlID0gKCkgPT4ge307XG4gICAgc29tZSA9ICgpID0+IHt9O1xuICAgIHNvcnQgPSAoKSA9PiB7fTtcbiAgICBzcGxpY2UgPSAoKSA9PiB7fTtcbiAgICB0b0xvY2FsZVN0cmluZyA9ICgpID0+IHt9O1xuICAgIHRvU291cmNlID0gKCkgPT4ge307XG4gICAgdG9TdHJpbmcgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBgT2JzZXJ2ZXJBcnJheSBbLi4uXWBcbiAgICB9O1xuICAgIHVuc2hpZnQgPSAoKSA9PiB7fTtcbiAgICB2YWx1ZXMgPSAoKSA9PiB7fTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvb2JzZXJ2ZXIvYXJyYXkvaW5kZXguanMiLCJcbmZ1bmN0aW9uIGZsYXR0ZW5Ob2RlKG5vZGUpIHtcbiAgICBpZiAoIW5vZGUpIHJldHVybjtcbiAgICBpZiAobm9kZS5jaGlsZHJlbilcbiAgICAgICAgbm9kZS5jaGlsZHJlbiA9IGZsYXR0ZW5DaGlsZHJlbihub2RlLmNoaWxkcmVuKTtcbiAgICByZXR1cm4gbm9kZVxufVxuXG5mdW5jdGlvbiBmbGF0dGVuQ2hpbGRyZW4oY2hpbGRyZW4pIHtcbiAgICByZXR1cm4gW10uY29uY2F0KC4uLmNoaWxkcmVuKVxuICAgICAgICAubWFwKG5vZGUgPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBub2RlID09PSAnb2JqZWN0JylcbiAgICAgICAgICAgICAgICByZXR1cm4gZmxhdHRlbk5vZGUobm9kZSk7XG4gICAgICAgICAgICBlbHNlIHJldHVybiBub2RlO1xuICAgICAgICB9KVxuICAgICAgICAuZmlsdGVyKG5vZGUgPT4gISFub2RlKTtcbn1cblxuXG5leHBvcnQge1xuICAgIGZsYXR0ZW5Ob2RlXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL3V0aWxzL2luZGV4LmpzIiwiXG5pbXBvcnQgeyBNdXNlIH0gZnJvbSAnLi4vaW5kZXgnO1xuXG5cblxuY2xhc3MgQXBwIGV4dGVuZHMgTXVzZSB7XG4gICAgc3RhdGUgPSB7XG4gICAgICAgIG5hbWU6ICdKb2UnLFxuICAgICAgICBhZ2U6IDIyLFxuICAgICAgICBsYW5nczogW1xuICAgICAgICAgICAgJ0phdmFTY3JpcHQnLFxuICAgICAgICAgICAgJ1B5dGhvbicsXG4gICAgICAgICAgICAnUnVzdCcsXG4gICAgICAgICAgICAnU2NhbGEnXG4gICAgICAgIF0sXG4gICAgICAgIHNob3dIZWxsbzogdHJ1ZVxuICAgIH1cblxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgICBpc0FnZU9kZCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmFnZSAlIDIgIT09IDBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnN0YXRlLmFnZSArKztcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7IHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8aDEgaWY9e3RoaXMuc3RhdGUuc2hvd0hlbGxvfT5IZWxsbyE8L2gxPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICBtb2RlbD17dGhpcy5zdGF0ZS5uYW1lfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgbW9kZWw9e3RoaXMuc3RhdGUuc2hvd0hlbGxvfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxwPk15IG5hbWUgaXMge3RoaXMuc3RhdGUubmFtZX0uPC9wPlxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgSSdtIHt0aGlzLnN0YXRlLmFnZX0geWVhcnMgb2xkXG4gICAgICAgICAgICAgICAgPHNwYW4gaWY9e3RoaXMuY29tcHV0ZWQuaXNBZ2VPZGR9PiBhbmQgaXQncyBhbiBvZGQgbnVtYmVyLjwvc3Bhbj5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDxwPkFuZCBJIGNhbiB0aG9zZSBwcm9ncmFtbWluZyBsYW5ndWFnZXM6PC9wPlxuICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgIDxsaSBmb3I9e2xhbmcgaW4gdGhpcy5zdGF0ZS5sYW5nc30+e2xhbmd9PC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9PkNsaWNrIE1lPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICl9XG59XG5cblxuXG5jb25zdCBhcHAgPSBuZXcgQXBwKCk7XG5hcHAucmVuZGVyVG8oZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9leGFtcGxlL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==