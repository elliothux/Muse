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
                    onChange: e => {
                        this.state.name = e.target.value;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2RkM2I3MzY4M2ViMzM4MmI0NjEiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9jcmVhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdHlwZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdHlwZXMvY2hhbmdlLmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3R5cGVzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9kaWZmL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3BhdGNoL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvb2JzZXJ2ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci9vYmplY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci91dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL29ic2VydmVyL2FycmF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZXhhbXBsZS9pbmRleC5qcyJdLCJuYW1lcyI6WyJNdXNlIiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJlbnRyeSIsIm5vZGUiLCJzdGF0ZSIsImNvbXB1dGVkIiwiY29tcG9uZW50V2lsbE1vdW50IiwiY29tcG9uZW50RGlkTW91bnQiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwic2hvdWxkQ29tcG9uZW50VXBkYXRlIiwiY29tcG9uZW50V2lsbFVwZGF0ZSIsImNvbXBvbmVudERpZFVwZGF0ZSIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwiY29tcG9uZW50RGlkQ2F0Y2giLCJpbml0T2JzZXJ2ZXIiLCJmcm9tIiwic2V0dGVyQ2FsbGJhY2siLCJpbml0Q29tcHV0ZWQiLCJuYW1lIiwiZ2V0dGVyIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwiZ2V0Iiwib2JqIiwia2V5IiwidmFsdWUiLCJvbGRWYWx1ZSIsIkVycm9yIiwiZGlmZkFuZFBhdGNoIiwiYmVmb3JlUmVuZGVyIiwicmVuZGVyIiwicmVuZGVyVG8iLCJhcHBlbmRDaGlsZCIsIm9sZE5vZGUiLCJwYXRjaGVzIiwiY3JlYXRlRWxlbWVudCIsImRpZmYiLCJwYXRjaCIsInV0aWxzIiwiZWwiLCJkb2N1bWVudCIsImVsZW1lbnROYW1lIiwiY2hpbGRyZW4iLCJhcHBlbmRDaGlsZHJlbiIsImF0dHJpYnV0ZXMiLCJjcmVhdGVUZXh0Tm9kZSIsInRhcmdldCIsIm1hcCIsImZvckVhY2giLCJzZXRBdHRyaWJ1dGVzIiwia2V5cyIsImZpbHRlciIsImhhc093blByb3BlcnR5IiwiYXR0ck5hbWUiLCJzZXRBdHRyaWJ1dGUiLCJhdHRyVmFsdWUiLCJpbmNsdWRlcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVBdHRyaWJ1dGUiLCJvbGRBdHRyVmFsdWUiLCJpbnNlcnRBZnRlciIsIm5ld0VsIiwidGFyZ2V0RWwiLCJwYXJlbnRFbCIsInBhcmVudE5vZGUiLCJsYXN0Q2hpbGQiLCJpbnNlcnRCZWZvcmUiLCJuZXh0U2libGluZyIsIkNoYW5nZVR5cGUiLCJFdmVudFR5cGUiLCJFdmVudE1hcCIsIkNoYW5nZWQiLCJDUkVBVEUiLCJSRU1PVkUiLCJSRVBMQUNFIiwiVVBEQVRFIiwiU0VUX1BST1BTIiwiUkVNT1ZFX1BST1BTIiwicmVkdWNlIiwiZXZlbnRzTWFwIiwiZXZlbnQiLCJyZXBsYWNlIiwiZSIsInRvTG93ZXJDYXNlIiwibmV3Tm9kZSIsInR5cGUiLCJpc0NoYW5nZWQiLCJkaWZmQ2hpbGRyZW4iLCJkaWZmQXR0cmlidXRlcyIsIm5ld0F0dHIiLCJvbGRBdHRyIiwicHVzaCIsIm5ld0NoaWxkIiwib2xkQ2hpbGQiLCJBcnJheSIsIk1hdGgiLCJtYXgiLCJsZW5ndGgiLCJpIiwicGFyZW50IiwiaW5kZXgiLCJjaGlsZE5vZGVzIiwicmVtb3ZlQ2hpbGQiLCJyZXBsYWNlQ2hpbGQiLCJwYXRjaEF0dHJpYnV0ZXMiLCJjaGlsZCIsImVsZW1lbnQiLCJPYnNlcnZlciIsIk9ic2VydmVyQXJyYXkiLCJ3YWxrIiwib2JzZXJ2ZXIiLCJnZXR0ZXJDYWxsYmFjayIsIlR5cGVFcnJvciIsInRvU3RyaW5nIiwibm9vcCIsImZ1biIsImlzQXJyYXkiLCJpdGVtIiwic2V0IiwibmV3VmFsdWUiLCJnZXRVbmlxdWVJRCIsImlkIiwiYXJyYXkiLCJpc09ic2VydmVyQXJyYXkiLCJfX3Byb3RvX18iLCJvZiIsImFyZ3MiLCJjb25jYXQiLCJhcnJheXMiLCJuZXdBcnJheSIsImNvcHlXaXRoaW4iLCJlbnRyaWVzIiwiZXZlcnkiLCJmaWxsIiwiZmluZCIsImZpbmRJbmRleCIsImluZGV4T2YiLCJqb2luIiwibGFzdEluZGV4T2YiLCJwb3AiLCJyZWR1Y2VSaWdodCIsInJldmVyc2UiLCJzaGlmdCIsInNsaWNlIiwic29tZSIsInNvcnQiLCJzcGxpY2UiLCJ0b0xvY2FsZVN0cmluZyIsInRvU291cmNlIiwidW5zaGlmdCIsInZhbHVlcyIsImZsYXR0ZW5Ob2RlIiwiZmxhdHRlbkNoaWxkcmVuIiwiQXBwIiwiYWdlIiwibGFuZ3MiLCJpc0FnZU9kZCIsImhhbmRsZUNsaWNrIiwibGFuZyIsImFwcCIsImdldEVsZW1lbnRCeUlkIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtB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QixNQUFNRSxNQUFNLElBQUlOLEdBQUosRUFBWjtBQUNBTSxJQUFJaEksUUFBSixDQUFhUyxTQUFTd0gsY0FBVCxDQUF3QixNQUF4QixDQUFiLEUiLCJmaWxlIjoiZXhhbXBsZS5idWlsZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9hc3NldHMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGNkZDNiNzM2ODNlYjMzODJiNDYxIiwiXG5pbXBvcnQgTXVzZSBmcm9tICcuL2NvcmUnO1xuXG5cblxuZXhwb3J0IHtcbiAgICBNdXNlXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9pbmRleC5qcyIsIlxuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgZGlmZiwgcGF0Y2ggfSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgeyBPYnNlcnZlciwgb2JzZXJ2ZXIsIHdhbGsgfSBmcm9tICcuL29ic2VydmVyJztcbmltcG9ydCB7IGZsYXR0ZW5Ob2RlIH0gZnJvbSAnLi91dGlscydcblxuXG5cbmNsYXNzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgZW50cnkgPSBudWxsO1xuICAgIG5vZGUgPSBudWxsO1xuICAgIHN0YXRlID0ge307XG4gICAgY29tcHV0ZWQgPSB7fTtcblxuICAgIC8vIFRPRE86IExpZmVDeWNsZVxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHt9O1xuICAgIGNvbXBvbmVudERpZE1vdW50KCkge307XG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcygpIHt9O1xuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9O1xuICAgIGNvbXBvbmVudFdpbGxVcGRhdGUoKSB7fTtcbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7fTtcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHt9O1xuICAgIGNvbXBvbmVudERpZENhdGNoKCkge307XG5cbiAgICAvLyBPYnNlcnZlclxuICAgIGluaXRPYnNlcnZlcigpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IE9ic2VydmVyLmZyb20oXG4gICAgICAgICAgICB0aGlzLnN0YXRlIHx8IHt9LFxuICAgICAgICAgICAgOjp0aGlzLnNldHRlckNhbGxiYWNrXG4gICAgICAgICk7XG4gICAgfTtcbiAgICBpbml0Q29tcHV0ZWQoKSB7XG4gICAgICAgIHdhbGsoXG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVkLFxuICAgICAgICAgICAgKG5hbWUsIGdldHRlciwgY29tcHV0ZWQpID0+IHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29tcHV0ZWQsIG5hbWUsIHtcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgZ2V0OiB0aGlzOjpnZXR0ZXJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgfVxuICAgIHNldHRlckNhbGxiYWNrKG9iaiwga2V5LCB2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKG9iaiAhPT0gdGhpcy5zdGF0ZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQk9PTSEhIScpO1xuICAgICAgICB0aGlzLmRpZmZBbmRQYXRjaCgpO1xuICAgIH07XG5cbiAgICAvLyBSZW5kZXJcbiAgICBiZWZvcmVSZW5kZXIoKSB7XG4gICAgICAgIHRoaXMuaW5pdE9ic2VydmVyKCk7XG4gICAgICAgIHRoaXMuaW5pdENvbXB1dGVkKCk7XG4gICAgfTtcbiAgICByZW5kZXIoKSB7fTtcbiAgICByZW5kZXJUbyhlbnRyeSkge1xuICAgICAgICB0aGlzLmJlZm9yZVJlbmRlcigpO1xuICAgICAgICB0aGlzLm5vZGUgPSBmbGF0dGVuTm9kZSh0aGlzLnJlbmRlcigpKTtcbiAgICAgICAgdGhpcy5lbnRyeSA9IGVudHJ5O1xuICAgICAgICB0aGlzLmVudHJ5LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQodGhpcy5ub2RlKSlcbiAgICB9O1xuICAgIGRpZmZBbmRQYXRjaCgpIHtcbiAgICAgICAgY29uc3Qgb2xkTm9kZSA9IHRoaXMubm9kZTtcbiAgICAgICAgdGhpcy5ub2RlID0gZmxhdHRlbk5vZGUodGhpcy5yZW5kZXIoKSk7XG4gICAgICAgIGNvbnN0IHBhdGNoZXMgPSBkaWZmKHRoaXMubm9kZSwgb2xkTm9kZSk7XG4gICAgICAgIHBhdGNoKHRoaXMuZW50cnksIHBhdGNoZXMpO1xuICAgIH07XG59XG5cblxuXG5leHBvcnQgZGVmYXVsdCBDb21wb25lbnQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2luZGV4LmpzIiwiXG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSAnLi9jcmVhdGUnO1xuaW1wb3J0IHsgZGlmZiB9IGZyb20gJy4vZGlmZic7XG5pbXBvcnQgeyBwYXRjaCB9IGZyb20gJy4vcGF0Y2gnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMnO1xuXG5cbmV4cG9ydCB7XG4gICAgY3JlYXRlRWxlbWVudCxcbiAgICBkaWZmLFxuICAgIHBhdGNoLFxuICAgIHV0aWxzXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS9pbmRleC5qcyIsIlxuaW1wb3J0IHsgc2V0QXR0cmlidXRlcyB9IGZyb20gJy4uL3V0aWxzJztcblxuXG5cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQobm9kZSkge1xuICAgIC8qXG4gICAgbm9kZTogU3RyaW5nIHx8IHtcbiAgICAgICAgZWxlbWVudE5hbWU6IFN0cmluZ1xuICAgICAgICBjaGlsZHJlbjogbm9kZVtdXG4gICAgICAgIGF0dHJpYnV0ZXM6IE9iamVjdFxuICAgIH1cbiAgICAqL1xuICAgIGlmICh0eXBlb2Ygbm9kZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5vZGUuZWxlbWVudE5hbWUpO1xuICAgICAgICBub2RlLmNoaWxkcmVuICYmIGFwcGVuZENoaWxkcmVuKGVsLCBub2RlLmNoaWxkcmVuKTtcbiAgICAgICAgc2V0QXR0cmlidXRlcyhlbCwgbm9kZS5hdHRyaWJ1dGVzKTtcbiAgICAgICAgcmV0dXJuIGVsO1xuICAgIH1cbiAgICBlbHNlIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShub2RlKTtcbn1cblxuXG5mdW5jdGlvbiBhcHBlbmRDaGlsZHJlbih0YXJnZXQsIGNoaWxkcmVuKSB7XG4gICAgY2hpbGRyZW4ubWFwKGNyZWF0ZUVsZW1lbnQpXG4gICAgICAgIC5mb3JFYWNoKDo6dGFyZ2V0LmFwcGVuZENoaWxkKVxufVxuXG5cblxuZXhwb3J0IHtcbiAgICBjcmVhdGVFbGVtZW50XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS9jcmVhdGUvaW5kZXguanMiLCJcbmltcG9ydCB7IEV2ZW50VHlwZSwgRXZlbnRNYXAgfSBmcm9tICcuLi90eXBlcyc7XG5cblxuXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzKHRhcmdldCwgYXR0cmlidXRlcz17fSkge1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpXG4gICAgICAgIC5maWx0ZXIoa2V5ID0+IGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoa2V5KSlcbiAgICAgICAgLmZvckVhY2goYXR0ck5hbWUgPT4gc2V0QXR0cmlidXRlKHRhcmdldCwgYXR0ck5hbWUsIGF0dHJpYnV0ZXNbYXR0ck5hbWVdKSk7XG59XG5cblxuZnVuY3Rpb24gc2V0QXR0cmlidXRlKHRhcmdldCwgYXR0ck5hbWUsIGF0dHJWYWx1ZSkge1xuICAgIGF0dHJOYW1lID09PSAnY2xhc3NOYW1lJyAmJiAoYXR0ck5hbWUgPSAnY2xhc3MnKTtcbiAgICBpZiAoRXZlbnRUeXBlLmluY2x1ZGVzKGF0dHJOYW1lKSlcbiAgICAgICAgcmV0dXJuIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgRXZlbnRNYXBbYXR0ck5hbWVdLFxuICAgICAgICAgICAgYXR0clZhbHVlXG4gICAgICAgICk7XG4gICAgdGFyZ2V0LnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKTtcbn1cblxuXG5mdW5jdGlvbiByZW1vdmVBdHRyaWJ1dGUodGFyZ2V0LCBhdHRyTmFtZSwgb2xkQXR0clZhbHVlKSB7XG4gICAgYXR0ck5hbWUgPT09ICdjbGFzc05hbWUnICYmIChhdHRyTmFtZSA9ICdjbGFzcycpO1xuICAgIGlmIChFdmVudFR5cGUuaW5jbHVkZXMoYXR0ck5hbWUpKVxuICAgICAgICByZXR1cm4gdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICBFdmVudE1hcFthdHRyTmFtZV0sXG4gICAgICAgICAgICBvbGRBdHRyVmFsdWVcbiAgICAgICAgKTtcbiAgICB0YXJnZXQucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcbn1cblxuXG5mdW5jdGlvbiBpbnNlcnRBZnRlcihuZXdFbCwgdGFyZ2V0RWwpIHtcbiAgICBjb25zdCBwYXJlbnRFbCA9IHRhcmdldEVsLnBhcmVudE5vZGU7XG4gICAgaWYgKHBhcmVudEVsLmxhc3RDaGlsZCA9PT0gdGFyZ2V0RWwpXG4gICAgICAgIHJldHVybiBwYXJlbnRFbC5hcHBlbmRDaGlsZChuZXdFbCk7XG4gICAgcmV0dXJuIHBhcmVudEVsLmluc2VydEJlZm9yZShuZXdFbCx0YXJnZXRFbC5uZXh0U2libGluZyk7XG59XG5cblxuZXhwb3J0IHtcbiAgICBzZXRBdHRyaWJ1dGVzLFxuICAgIHNldEF0dHJpYnV0ZSxcbiAgICByZW1vdmVBdHRyaWJ1dGUsXG4gICAgaW5zZXJ0QWZ0ZXJcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3V0aWxzL2luZGV4LmpzIiwiXG5pbXBvcnQgQ2hhbmdlVHlwZSBmcm9tICcuL2NoYW5nZSc7XG5pbXBvcnQgeyBFdmVudFR5cGUsIEV2ZW50TWFwIH0gZnJvbSAnLi9ldmVudHMnO1xuXG5leHBvcnQge1xuICAgIENoYW5nZVR5cGUsXG4gICAgRXZlbnRUeXBlLFxuICAgIEV2ZW50TWFwXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS90eXBlcy9pbmRleC5qcyIsIlxuY29uc3QgQ2hhbmdlZCA9IHtcbiAgICBDUkVBVEU6ICdDUkVBVEUnLFxuICAgIFJFTU9WRTogJ1JFTU9WRScsXG4gICAgUkVQTEFDRTogJ1JFUExBQ0UnLFxuICAgIFVQREFURTogJ1VQREFURScsXG4gICAgU0VUX1BST1BTOiAnU0VUIFBST1BTJyxcbiAgICBSRU1PVkVfUFJPUFM6ICdSRU1PVkUgUFJPUFMnXG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IENoYW5nZWQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS90eXBlcy9jaGFuZ2UuanMiLCJcbmNvbnN0IEV2ZW50VHlwZSA9IFtcbiAgICAvLyBDbGlwYm9hcmQgRXZlbnRzXG4gICAgJ29uQ29weScsICdvbkN1dCcsICdvblBhc3RlJyxcbiAgICAvLyBDb21wb3NpdGlvbiBFdmVudHNcbiAgICAnb25Db21wb3NpdGlvbkVuZCcsICdvbkNvbXBvc2l0aW9uU3RhcnQnLCAnb25Db21wb3NpdGlvblVwZGF0ZScsXG4gICAgLy8gS2V5Ym9hcmQgRXZlbnRzXG4gICAgJ29uS2V5RG93bicsICdvbktleVByZXNzJywgJ29uS2V5VXAnLFxuICAgIC8vIEZvY3VzIEV2ZW50c1xuICAgICdvbkZvY3VzJywgJ29uQmx1cicsXG4gICAgLy8gRm9ybSBFdmVudHNcbiAgICAnb25DaGFuZ2UnLCAnb25JbnB1dCcsICdvbkludmFsaWQnLCAnb25TdWJtaXQnLFxuICAgIC8vIE1vdXNlIEV2ZW50c1xuICAgICdvbkNsaWNrJywgJ29uQ29udGV4dE1lbnUnLCAnb25Eb3VibGVDbGljaycsXG4gICAgJ29uRHJhZycsICdvbkRyYWdFbmQnLCAnb25EcmFnRW50ZXInLCAnb25EcmFnRXhpdCcsXG4gICAgJ29uRHJhZ0xlYXZlJywgJ29uRHJhZ092ZXInLCAnb25EcmFnU3RhcnQnLFxuICAgICdvbkRyb3AnLCAnb25Nb3VzZURvd24nLCAnb25Nb3VzZUVudGVyJyxcbiAgICAnb25Nb3VzZUxlYXZlJywgJ29uTW91c2VNb3ZlJywgJ29uTW91c2VPdXQnLFxuICAgICdvbk1vdXNlT3ZlcicgLCdvbk1vdXNlVXAnLFxuICAgIC8vIFNlbGVjdGlvbiBFdmVudHNcbiAgICAnb25TZWxlY3QnLFxuICAgIC8vIFRvdWNoIEV2ZW50c1xuICAgICdvblRvdWNoQ2FuY2VsJywgJ29uVG91Y2hFbmQnLCAnb25Ub3VjaE1vdmUnLCAnb25Ub3VjaFN0YXJ0JyxcbiAgICAvLyBVSSBFdmVudHNcbiAgICAnb25TY3JvbGwnLFxuICAgIC8vIFdoZWVsIEV2ZW50c1xuICAgICdvbldoZWVsJyxcbiAgICAvLyBNZWRpYSBFdmVudHNcbiAgICAnb25BYm9ydCcsICdvbkNhblBsYXknLCAnb25DYW5QbGF5VGhyb3VnaCcsXG4gICAgJ29uRHVyYXRpb25DaGFuZ2UnLCAnb25FbXB0aWVkJywgJ29uRW5jcnlwdGVkb25FbmRlZCcsXG4gICAgJ29uRXJyb3InLCAnb25Mb2FkZWREYXRhJywgJ29uTG9hZGVkTWV0YWRhdGEnLFxuICAgICdvbkxvYWRTdGFydCcsICdvblBhdXNlJywgJ29uUGxheW9uUGxheWluZycsXG4gICAgJ29uUHJvZ3Jlc3MnLCAnb25SYXRlQ2hhbmdlJywgJ29uU2Vla2VkJyxcbiAgICAnb25TZWVraW5nJywgJ29uU3RhbGxlZCcsICdvblN1c3BlbmRvblRpbWVVcGRhdGUnLFxuICAgICdvblZvbHVtZUNoYW5nZScsICdvbldhaXRpbmcnLFxuICAgIC8vIEltYWdlIEV2ZW50c1xuICAgICdvbkxvYWQnLCAnb25FcnJvcicsXG4gICAgLy8gQW5pbWF0aW9uIEV2ZW50c1xuICAgICdvbkFuaW1hdGlvblN0YXJ0JywgJ29uQW5pbWF0aW9uRW5kJywgJ29uQW5pbWF0aW9uSXRlcmF0aW9uJyxcbiAgICAvLyBUcmFuc2l0aW9uIEV2ZW50c1xuICAgICdvblRyYW5zaXRpb25FbmQnLFxuICAgIC8vIE90aGVyIEV2ZW50c1xuICAgICdvblRvZ2dsZSdcbl07XG5cblxuY29uc3QgRXZlbnRNYXAgPSBFdmVudFR5cGUucmVkdWNlKChldmVudHNNYXAsIGV2ZW50KSA9PiB7XG4gICAgZXZlbnRzTWFwW2V2ZW50XSA9IGV2ZW50XG4gICAgICAgIC5yZXBsYWNlKCdvbicsICcnKVxuICAgICAgICAucmVwbGFjZSgvW0EtWl0vZywgZSA9PiBlLnRvTG93ZXJDYXNlKCkpO1xuICAgIHJldHVybiBldmVudHNNYXA7XG59LCB7fSk7XG5cblxuZXhwb3J0IHtcbiAgICBFdmVudFR5cGUsXG4gICAgRXZlbnRNYXBcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3R5cGVzL2V2ZW50cy5qcyIsIlxuaW1wb3J0IHsgQ2hhbmdlVHlwZSB9IGZyb20gJy4uL3R5cGVzL2luZGV4JztcblxuXG5cbmZ1bmN0aW9uIGRpZmYobmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIC8qXG4gICAgcmV0dXJuIHR5cGUgUGF0Y2gge1xuICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlXG4gICAgICAgIG5ld05vZGU/OiBOb2RlXG4gICAgICAgIGNoaWxkcmVuPzogUGF0Y2hbXVxuICAgICAgICBhdHRyaWJ1dGVzPzogUGF0Y2hbXVxuICAgIH1cbiAgICAgKi9cbiAgICBpZiAoIW9sZE5vZGUpIHJldHVybiB7IHR5cGU6IENoYW5nZVR5cGUuQ1JFQVRFLCBuZXdOb2RlIH07XG4gICAgZWxzZSBpZiAoIW5ld05vZGUpIHJldHVybiB7IHR5cGU6IENoYW5nZVR5cGUuUkVNT1ZFIH07XG4gICAgZWxzZSBpZiAoaXNDaGFuZ2VkKG5ld05vZGUsIG9sZE5vZGUpKSByZXR1cm4geyB0eXBlOiBDaGFuZ2VUeXBlLlJFUExBQ0UsIG5ld05vZGUgfTtcbiAgICBlbHNlIGlmIChuZXdOb2RlLmVsZW1lbnROYW1lKVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogQ2hhbmdlVHlwZS5VUERBVEUsXG4gICAgICAgICAgICBjaGlsZHJlbjogZGlmZkNoaWxkcmVuKG5ld05vZGUsIG9sZE5vZGUpLFxuICAgICAgICAgICAgYXR0cmlidXRlczogZGlmZkF0dHJpYnV0ZXMobmV3Tm9kZSwgb2xkTm9kZSlcbiAgICAgICAgfTtcbn1cblxuZnVuY3Rpb24gaXNDaGFuZ2VkKG5ld05vZGUsIG9sZE5vZGUpIHtcbiAgICByZXR1cm4gdHlwZW9mIG5ld05vZGUgIT09IHR5cGVvZiBvbGROb2RlIHx8XG4gICAgICAgIHR5cGVvZiBuZXdOb2RlICE9PSBcIm9iamVjdFwiICYmIG5ld05vZGUgIT09IG9sZE5vZGUgfHxcbiAgICAgICAgdHlwZW9mIG5ld05vZGUgPT09IFwib2JqZWN0XCIgJiYgbmV3Tm9kZS5lbGVtZW50TmFtZSAhPT0gb2xkTm9kZS5lbGVtZW50TmFtZTtcbn1cblxuZnVuY3Rpb24gZGlmZkF0dHJpYnV0ZXMobmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIGNvbnN0IHBhdGNoZXMgID0gW107XG4gICAgY29uc3QgYXR0cmlidXRlcyA9IHsuLi5vbGROb2RlLmF0dHJpYnV0ZXMsIC4uLm5ld05vZGUuYXR0cmlidXRlc307XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykubWFwKGF0dHJOYW1lID0+IHtcbiAgICAgICAgY29uc3QgbmV3QXR0ciA9IG5ld05vZGUuYXR0cmlidXRlc1thdHRyTmFtZV07XG4gICAgICAgIGNvbnN0IG9sZEF0dHIgPSBvbGROb2RlLmF0dHJpYnV0ZXNbYXR0ck5hbWVdO1xuICAgICAgICAhbmV3QXR0ciAmJiBwYXRjaGVzLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogQ2hhbmdlVHlwZS5SRU1PVkVfUFJPUFMsXG4gICAgICAgICAgICB2YWx1ZTogb2xkQXR0ciwgYXR0ck5hbWVcbiAgICAgICAgfSk7XG4gICAgICAgICghb2xkQXR0ciB8fCBvbGRBdHRyICE9PSBuZXdBdHRyKSAmJiBwYXRjaGVzLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogQ2hhbmdlVHlwZS5TRVRfUFJPUFMsXG4gICAgICAgICAgICB2YWx1ZTogbmV3QXR0ciwgYXR0ck5hbWVcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHBhdGNoZXM7XG59XG5cblxuZnVuY3Rpb24gZGlmZkNoaWxkcmVuKG5ld05vZGUsIG9sZE5vZGUpIHtcbiAgICBjb25zdCBuZXdDaGlsZCA9IG5ld05vZGUuY2hpbGRyZW4gfHwgW107XG4gICAgY29uc3Qgb2xkQ2hpbGQgPSBvbGROb2RlLmNoaWxkcmVuIHx8IFtdO1xuICAgIHJldHVybiBbLi4uQXJyYXkoTWF0aC5tYXgoXG4gICAgICAgIG5ld0NoaWxkLmxlbmd0aCwgb2xkQ2hpbGQubGVuZ3RoXG4gICAgKSkua2V5cygpXS5tYXAoaSA9PiBkaWZmKG5ld0NoaWxkW2ldLCBvbGRDaGlsZFtpXSkpO1xufVxuXG5cbmV4cG9ydCB7XG4gICAgZGlmZlxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS9kaWZmL2luZGV4LmpzIiwiXG5pbXBvcnQgeyBDaGFuZ2VUeXBlIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gJy4uL2NyZWF0ZS9pbmRleCc7XG5pbXBvcnQgeyBzZXRBdHRyaWJ1dGUsIHJlbW92ZUF0dHJpYnV0ZSB9IGZyb20gXCIuLi91dGlscy9pbmRleFwiO1xuXG5cblxuZnVuY3Rpb24gcGF0Y2gocGFyZW50LCBwYXRjaGVzLCBpbmRleD0wKSB7XG4gICAgaWYgKCFwYXRjaGVzKSByZXR1cm47XG4gICAgY29uc3QgZWwgPSBwYXJlbnQuY2hpbGROb2Rlc1tpbmRleF07XG4gICAgc3dpdGNoIChwYXRjaGVzLnR5cGUpIHtcbiAgICAgICAgY2FzZSBDaGFuZ2VUeXBlLkNSRUFURToge1xuICAgICAgICAgICAgY29uc3QgeyBuZXdOb2RlIH0gPSBwYXRjaGVzO1xuICAgICAgICAgICAgY29uc3QgbmV3RWwgPSBjcmVhdGVFbGVtZW50KG5ld05vZGUpO1xuICAgICAgICAgICAgaWYgKGluZGV4ID09PSBwYXJlbnQuY2hpbGROb2Rlcy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKG5ld0VsKTtcbiAgICAgICAgICAgIGVsc2UgcGFyZW50Lmluc2VydEJlZm9yZShuZXdFbCwgZWwpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBDaGFuZ2VUeXBlLlJFTU9WRToge1xuICAgICAgICAgICAgaWYgKCFlbCkgcmV0dXJuO1xuICAgICAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQ2hhbmdlVHlwZS5SRVBMQUNFOiB7XG4gICAgICAgICAgICBjb25zdCB7IG5ld05vZGUgfSA9IHBhdGNoZXM7XG4gICAgICAgICAgICBjb25zdCBuZXdFbCA9IGNyZWF0ZUVsZW1lbnQobmV3Tm9kZSk7XG4gICAgICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKG5ld0VsLCBlbCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENoYW5nZVR5cGUuVVBEQVRFOiB7XG4gICAgICAgICAgICBjb25zdCB7IGNoaWxkcmVuLCBhdHRyaWJ1dGVzIH0gPSBwYXRjaGVzO1xuICAgICAgICAgICAgcGF0Y2hBdHRyaWJ1dGVzKGVsLCBhdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goKGNoaWxkLCBpbmRleCkgPT4gcGF0Y2goZWwsIGNoaWxkLCBpbmRleCkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBhdGNoQXR0cmlidXRlcyhlbGVtZW50LCBhdHRyaWJ1dGVzKSB7XG4gICAgYXR0cmlidXRlcy5mb3JFYWNoKHBhdGNoID0+IHtcbiAgICAgICAgY29uc3QgeyB0eXBlLCBhdHRyTmFtZSwgdmFsdWUgfSA9IHBhdGNoO1xuICAgICAgICBpZiAodHlwZSA9PT0gQ2hhbmdlVHlwZS5TRVRfUFJPUFMpXG4gICAgICAgICAgICBzZXRBdHRyaWJ1dGUoZWxlbWVudCwgYXR0ck5hbWUsIHZhbHVlKTtcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gQ2hhbmdlVHlwZS5SRU1PVkVfUFJPUFMpXG4gICAgICAgICAgICByZW1vdmVBdHRyaWJ1dGUoZWxlbWVudCwgYXR0ck5hbWUsIHZhbHVlKVxuICAgIH0pXG59XG5cblxuZXhwb3J0IHtcbiAgICBwYXRjaFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vcGF0Y2gvaW5kZXguanMiLCJcbmltcG9ydCBPYnNlcnZlciBmcm9tICcuL29iamVjdCc7XG5pbXBvcnQgT2JzZXJ2ZXJBcnJheSBmcm9tICcuL2FycmF5JztcbmltcG9ydCB7IHdhbGssIG9ic2VydmVyIH0gZnJvbSAnLi91dGlscyc7XG5cblxuZXhwb3J0IHtcbiAgICBPYnNlcnZlcixcbiAgICBPYnNlcnZlckFycmF5LFxuICAgIHdhbGssIG9ic2VydmVyXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL29ic2VydmVyL2luZGV4LmpzIiwiXG5pbXBvcnQgeyB3YWxrLCBvYnNlcnZlciB9IGZyb20gJy4uL3V0aWxzL2luZGV4J1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2JzZXJ2ZXIge1xuICAgIGNvbnN0cnVjdG9yKG9iaiwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JqICE9PSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVHlwZSBcIk9iamVjdFwiIHJlcXVpcmVkIScpO1xuICAgICAgICB3YWxrKG9iaiwgKGtleSwgdmFsdWUpID0+IG9ic2VydmVyKFxuICAgICAgICAgICAgdGhpcywga2V5LCB2YWx1ZSxcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrLFxuICAgICAgICAgICAgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGZyb20gPSAob2JqLCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZlcihcbiAgICAgICAgICAgIG9iaixcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrLFxuICAgICAgICAgICAgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKVxuICAgIH07XG5cbiAgICBzdGF0aWMgdG9TdHJpbmcgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBgT2JzZXJ2ZXIgJHt0aGlzfWBcbiAgICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9vYnNlcnZlci9vYmplY3QvaW5kZXguanMiLCJcbmltcG9ydCBPYnNlcnZlciBmcm9tICcuLi9vYmplY3QnO1xuaW1wb3J0IE9ic2VydmVyQXJyYXkgZnJvbSAnLi4vYXJyYXknO1xuXG5cbmNvbnN0IG5vb3AgPSAoKSA9PiB7fTtcblxuXG5cbmZ1bmN0aW9uIHdhbGsob2JqLCBmdW4pIHtcbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEZ1bmN0aW9uIFwid2Fsa1wiIHJlcXVpcmUgYW4gXCJvYmplY3RcIiBpbnN0ZWFkIG9mICR7dHlwZW9mIG9ian1gKTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKVxuICAgICAgICByZXR1cm4gb2JqLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiBmdW4oaW5kZXgsIGl0ZW0sIG9iaikpO1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4gZnVuKGtleSwgb2JqW2tleV0sIG9iaikpO1xufVxuXG5mdW5jdGlvbiBvYnNlcnZlcihvYmosIGtleSwgdmFsdWUsIHNldHRlckNhbGxiYWNrPW5vb3AsIGdldHRlckNhbGxiYWNrPW5vb3ApIHtcbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEZ1bmN0aW9uIFwib2JzZXJ2ZXJcIiByZXF1aXJlIGFuIFwib2JqZWN0XCIgaW5zdGVhZCBvZiAke3R5cGVvZiBvYmp9YCk7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpXG4gICAgICAgIHZhbHVlID0gT2JzZXJ2ZXJBcnJheS5mcm9tKHZhbHVlLCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spO1xuICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgdmFsdWUgPSBPYnNlcnZlci5mcm9tKHZhbHVlLCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgICAgICBnZXR0ZXJDYWxsYmFjayhvYmosIGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgICAgIH0sXG4gICAgICAgIHNldDogbmV3VmFsdWUgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSBvYmpba2V5XTtcbiAgICAgICAgICAgIG9ic2VydmVyKG9iaiwga2V5LCBuZXdWYWx1ZSwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKTtcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrKG9iaiwga2V5LCBuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICB9XG4gICAgfSlcbn1cblxuXG5jb25zdCBnZXRVbmlxdWVJRCA9IGZ1bmN0aW9uKCkge1xuICAgIGxldCBpZCA9IDA7XG4gICAgcmV0dXJuICgoKSA9PiBpZCArKyk7XG59KCk7XG5cblxuZXhwb3J0IHtcbiAgICB3YWxrLFxuICAgIG9ic2VydmVyLFxuICAgIGdldFVuaXF1ZUlEXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL29ic2VydmVyL3V0aWxzL2luZGV4LmpzIiwiXG5pbXBvcnQgeyB3YWxrLCBvYnNlcnZlciB9IGZyb20gJy4uL3V0aWxzL2luZGV4JztcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9ic2VydmVyQXJyYXkge1xuICAgIGNvbnN0cnVjdG9yKGFycmF5LCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spIHtcbiAgICAgICAgIWFycmF5ICYmIChhcnJheSA9IFtdKTtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGFycmF5KSlcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1R5cGUgXCJBcnJheVwiIHJlcXVpcmVkIScpO1xuICAgICAgICB3YWxrKGFycmF5LCAoaW5kZXgsIGl0ZW0pID0+IG9ic2VydmVyKFxuICAgICAgICAgICAgdGhpcywgaW5kZXgsIGl0ZW0sXG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKSk7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGZyb20gPSAoYXJyYXksIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFjaykgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmVyQXJyYXkoXG4gICAgICAgICAgICBhcnJheSxcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrLFxuICAgICAgICAgICAgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKVxuICAgIH07XG4gICAgc3RhdGljIGlzT2JzZXJ2ZXJBcnJheSAgPSBhcnJheSA9PiB7XG4gICAgICAgIHJldHVybiBhcnJheS5fX3Byb3RvX18uY29uc3RydWN0b3IgPT09IE9ic2VydmVyQXJyYXk7XG4gICAgfTtcbiAgICBzdGF0aWMgb2YgPSAoLi4uYXJncykgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmVyQXJyYXkoWy4uLmFyZ3NdKVxuICAgIH07XG5cblxuICAgIGNvbmNhdCA9ICguLi5hcnJheXMpID0+IHtcbiAgICAgICAgY29uc3QgbmV3QXJyYXkgPSBuZXcgT2JzZXJ2ZXJBcnJheSgpO1xuICAgICAgICBbdGhpcywgLi4uYXJyYXlzXS5mb3JFYWNoKFxuICAgICAgICAgICAgYXJyYXkgPT4gYXJyYXkuZm9yRWFjaChuZXdBcnJheS5wdXNoKVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gbmV3QXJyYXk7XG4gICAgfTtcbiAgICBjb3B5V2l0aGluID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgLy8gVE9ET1xuICAgICAgICByZXR1cm4gT2JzZXJ2ZXJBcnJheS5mcm9tKFxuICAgICAgICAgICAgQXJyYXkuZnJvbSh0aGlzKS5jb3B5V2l0aGluKC4uLmFyZ3MpXG4gICAgICAgIClcbiAgICB9O1xuICAgIGVudHJpZXMgPSBmdW5jdGlvbiAqKCkge1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICB3aGlsZSAodGhpc1tpbmRleF0pXG4gICAgICAgICAgICB5aWVsZCBbaW5kZXgrKywgdGhpc1tpbmRleF1dO1xuICAgIH07XG4gICAgZXZlcnkgPSAoKSA9PiB7fTtcbiAgICBmaWxsID0gKCkgPT4ge307XG4gICAgZmlsdGVyID0gKCkgPT4ge307XG4gICAgZmluZCA9ICgpID0+IHt9O1xuICAgIGZpbmRJbmRleCA9ICgpID0+IHt9O1xuICAgIGZvckVhY2ggPSAoKSA9PiB7fTtcbiAgICBpbmNsdWRlcyA9ICgpID0+IHt9O1xuICAgIGluZGV4T2YgPSAoKSA9PiB7fTtcbiAgICBqb2luID0gKCkgPT4ge307XG4gICAga2V5cyA9ICgpID0+IHt9O1xuICAgIGxhc3RJbmRleE9mID0gKCkgPT4ge307XG4gICAgbWFwID0gKCkgPT4ge307XG4gICAgcG9wID0gKCkgPT4ge307XG4gICAgcHVzaCA9IHZhbHVlID0+IHtcbiAgICAgICAgb2JzZXJ2ZXIoXG4gICAgICAgICAgICB0aGlzLCB0aGlzLmxlbmd0aCwgdmFsdWUsXG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5sZW5ndGggKys7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIHJlZHVjZSA9ICgpID0+IHt9O1xuICAgIHJlZHVjZVJpZ2h0ID0gKCkgPT4ge307XG4gICAgcmV2ZXJzZSA9ICgpID0+IHt9O1xuICAgIHNoaWZ0ID0gKCkgPT4ge307XG4gICAgc2xpY2UgPSAoKSA9PiB7fTtcbiAgICBzb21lID0gKCkgPT4ge307XG4gICAgc29ydCA9ICgpID0+IHt9O1xuICAgIHNwbGljZSA9ICgpID0+IHt9O1xuICAgIHRvTG9jYWxlU3RyaW5nID0gKCkgPT4ge307XG4gICAgdG9Tb3VyY2UgPSAoKSA9PiB7fTtcbiAgICB0b1N0cmluZyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGBPYnNlcnZlckFycmF5IFsuLi5dYFxuICAgIH07XG4gICAgdW5zaGlmdCA9ICgpID0+IHt9O1xuICAgIHZhbHVlcyA9ICgpID0+IHt9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9vYnNlcnZlci9hcnJheS9pbmRleC5qcyIsIlxuZnVuY3Rpb24gZmxhdHRlbk5vZGUobm9kZSkge1xuICAgIGlmICghbm9kZSkgcmV0dXJuO1xuICAgIGlmIChub2RlLmNoaWxkcmVuKVxuICAgICAgICBub2RlLmNoaWxkcmVuID0gZmxhdHRlbkNoaWxkcmVuKG5vZGUuY2hpbGRyZW4pO1xuICAgIHJldHVybiBub2RlXG59XG5cbmZ1bmN0aW9uIGZsYXR0ZW5DaGlsZHJlbihjaGlsZHJlbikge1xuICAgIHJldHVybiBbXS5jb25jYXQoLi4uY2hpbGRyZW4pXG4gICAgICAgIC5tYXAobm9kZSA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG5vZGUgPT09ICdvYmplY3QnKVxuICAgICAgICAgICAgICAgIHJldHVybiBmbGF0dGVuTm9kZShub2RlKTtcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuIG5vZGU7XG4gICAgICAgIH0pXG4gICAgICAgIC5maWx0ZXIobm9kZSA9PiAhIW5vZGUpO1xufVxuXG5cbmV4cG9ydCB7XG4gICAgZmxhdHRlbk5vZGVcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvdXRpbHMvaW5kZXguanMiLCJcbmltcG9ydCB7IE11c2UgfSBmcm9tICcuLi9pbmRleCc7XG5cblxuXG5jbGFzcyBBcHAgZXh0ZW5kcyBNdXNlIHtcbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgbmFtZTogJ0pvZScsXG4gICAgICAgIGFnZTogMjIsXG4gICAgICAgIGxhbmdzOiBbXG4gICAgICAgICAgICAnSmF2YVNjcmlwdCcsXG4gICAgICAgICAgICAnUHl0aG9uJyxcbiAgICAgICAgICAgICdSdXN0JyxcbiAgICAgICAgICAgICdTY2FsYSdcbiAgICAgICAgXVxuICAgIH1cblxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgICBpc0FnZU9kZCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmFnZSAlIDIgIT09IDBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnN0YXRlLmFnZSArKztcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7IHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8aDE+SGVsbG8hPC9oMT5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICBtb2RlbD17dGhpcy5zdGF0ZS5uYW1lfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxwPk15IG5hbWUgaXMge3RoaXMuc3RhdGUubmFtZX0uPC9wPlxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgSSdtIHt0aGlzLnN0YXRlLmFnZX0geWVhcnMgb2xkXG4gICAgICAgICAgICAgICAgPHNwYW4gaWY9e3RoaXMuY29tcHV0ZWQuaXNBZ2VPZGR9PiBhbmQgaXQncyBhbiBvZGQgbnVtYmVyLjwvc3Bhbj5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDxwPkFuZCBJIGNhbiB0aG9zZSBwcm9ncmFtbWluZyBsYW5ndWFnZXM6PC9wPlxuICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgIDxsaSBmb3I9e2xhbmcgaW4gdGhpcy5zdGF0ZS5sYW5nc30+e2xhbmd9PC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9PkNsaWNrIE1lPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICl9XG59XG5cblxuXG5jb25zdCBhcHAgPSBuZXcgQXBwKCk7XG5hcHAucmVuZGVyVG8oZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9leGFtcGxlL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==