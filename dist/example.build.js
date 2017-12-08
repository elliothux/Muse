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
    eventsMap[event] = event.replace('on', '').replace(/[A-Z]/, e => e.toLowerCase());
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
    return [...Array(Math.max(newNode.children.length, oldNode.children.length)).keys()].map(i => diff(newNode.children[i], oldNode.children[i]));
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
                        this.state.name = VALUE;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODliY2YxNjk4YTY4MGRhYmYxYTEiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9jcmVhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdHlwZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdHlwZXMvY2hhbmdlLmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3R5cGVzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9kaWZmL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3BhdGNoL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvb2JzZXJ2ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci9vYmplY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci91dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL29ic2VydmVyL2FycmF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZXhhbXBsZS9pbmRleC5qcyJdLCJuYW1lcyI6WyJNdXNlIiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJlbnRyeSIsIm5vZGUiLCJzdGF0ZSIsImNvbXB1dGVkIiwiY29tcG9uZW50V2lsbE1vdW50IiwiY29tcG9uZW50RGlkTW91bnQiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwic2hvdWxkQ29tcG9uZW50VXBkYXRlIiwiY29tcG9uZW50V2lsbFVwZGF0ZSIsImNvbXBvbmVudERpZFVwZGF0ZSIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwiY29tcG9uZW50RGlkQ2F0Y2giLCJpbml0T2JzZXJ2ZXIiLCJmcm9tIiwic2V0dGVyQ2FsbGJhY2siLCJpbml0Q29tcHV0ZWQiLCJuYW1lIiwiZ2V0dGVyIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwiZ2V0Iiwib2JqIiwia2V5IiwidmFsdWUiLCJvbGRWYWx1ZSIsIkVycm9yIiwiZGlmZkFuZFBhdGNoIiwiYmVmb3JlUmVuZGVyIiwicmVuZGVyIiwicmVuZGVyVG8iLCJjb25zb2xlIiwibG9nIiwiYXBwZW5kQ2hpbGQiLCJvbGROb2RlIiwicGF0Y2hlcyIsImNyZWF0ZUVsZW1lbnQiLCJkaWZmIiwicGF0Y2giLCJ1dGlscyIsImVsIiwiZG9jdW1lbnQiLCJlbGVtZW50TmFtZSIsImNoaWxkcmVuIiwiYXBwZW5kQ2hpbGRyZW4iLCJhdHRyaWJ1dGVzIiwiY3JlYXRlVGV4dE5vZGUiLCJ0YXJnZXQiLCJtYXAiLCJmb3JFYWNoIiwic2V0QXR0cmlidXRlcyIsImtleXMiLCJmaWx0ZXIiLCJoYXNPd25Qcm9wZXJ0eSIsImF0dHJOYW1lIiwic2V0QXR0cmlidXRlIiwiYXR0clZhbHVlIiwiaW5jbHVkZXMiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlQXR0cmlidXRlIiwib2xkQXR0clZhbHVlIiwiaW5zZXJ0QWZ0ZXIiLCJuZXdFbCIsInRhcmdldEVsIiwicGFyZW50RWwiLCJwYXJlbnROb2RlIiwibGFzdENoaWxkIiwiaW5zZXJ0QmVmb3JlIiwibmV4dFNpYmxpbmciLCJDaGFuZ2VUeXBlIiwiRXZlbnRUeXBlIiwiRXZlbnRNYXAiLCJDaGFuZ2VkIiwiQ1JFQVRFIiwiUkVNT1ZFIiwiUkVQTEFDRSIsIlVQREFURSIsIlNFVF9QUk9QUyIsIlJFTU9WRV9QUk9QUyIsInJlZHVjZSIsImV2ZW50c01hcCIsImV2ZW50IiwicmVwbGFjZSIsImUiLCJ0b0xvd2VyQ2FzZSIsIm5ld05vZGUiLCJ0eXBlIiwiaXNDaGFuZ2VkIiwiZGlmZkNoaWxkcmVuIiwiZGlmZkF0dHJpYnV0ZXMiLCJuZXdBdHRyIiwib2xkQXR0ciIsInB1c2giLCJBcnJheSIsIk1hdGgiLCJtYXgiLCJsZW5ndGgiLCJpIiwicGFyZW50IiwiaW5kZXgiLCJjaGlsZE5vZGVzIiwicmVtb3ZlQ2hpbGQiLCJyZXBsYWNlQ2hpbGQiLCJwYXRjaEF0dHJpYnV0ZXMiLCJjaGlsZCIsImVsZW1lbnQiLCJPYnNlcnZlciIsIk9ic2VydmVyQXJyYXkiLCJ3YWxrIiwib2JzZXJ2ZXIiLCJnZXR0ZXJDYWxsYmFjayIsIlR5cGVFcnJvciIsInRvU3RyaW5nIiwibm9vcCIsImZ1biIsImlzQXJyYXkiLCJpdGVtIiwic2V0IiwibmV3VmFsdWUiLCJnZXRVbmlxdWVJRCIsImlkIiwiYXJyYXkiLCJpc09ic2VydmVyQXJyYXkiLCJfX3Byb3RvX18iLCJvZiIsImFyZ3MiLCJjb25jYXQiLCJhcnJheXMiLCJuZXdBcnJheSIsImNvcHlXaXRoaW4iLCJlbnRyaWVzIiwiZXZlcnkiLCJmaWxsIiwiZmluZCIsImZpbmRJbmRleCIsImluZGV4T2YiLCJqb2luIiwibGFzdEluZGV4T2YiLCJwb3AiLCJyZWR1Y2VSaWdodCIsInJldmVyc2UiLCJzaGlmdCIsInNsaWNlIiwic29tZSIsInNvcnQiLCJzcGxpY2UiLCJ0b0xvY2FsZVN0cmluZyIsInRvU291cmNlIiwidW5zaGlmdCIsInZhbHVlcyIsImZsYXR0ZW5Ob2RlIiwiZmxhdHRlbkNoaWxkcmVuIiwiQXBwIiwiYWdlIiwibGFuZ3MiLCJpc0FnZU9kZCIsImhhbmRsZUNsaWNrIiwibGFuZyIsImFwcCIsImdldEVsZW1lbnRCeUlkIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFLRDtBQWJuQjtBQUFBO0FBQUE7QUFBQTtBQWVUO0FBckNpQixDOzs7QUEwQ3ZCLE1BQU1FLE1BQU0sSUFBSU4sR0FBSixFQUFaO0FBQ0FNLElBQUloSSxRQUFKLENBQWFXLFNBQVNzSCxjQUFULENBQXdCLE1BQXhCLENBQWIsRSIsImZpbGUiOiJleGFtcGxlLmJ1aWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Fzc2V0cy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxNSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgODliY2YxNjk4YTY4MGRhYmYxYTEiLCJcbmltcG9ydCBNdXNlIGZyb20gJy4vY29yZSc7XG5cblxuXG5leHBvcnQge1xuICAgIE11c2Vcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2luZGV4LmpzIiwiXG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBkaWZmLCBwYXRjaCB9IGZyb20gJy4vZG9tJztcbmltcG9ydCB7IE9ic2VydmVyLCBvYnNlcnZlciwgd2FsayB9IGZyb20gJy4vb2JzZXJ2ZXInO1xuaW1wb3J0IHsgZmxhdHRlbk5vZGUgfSBmcm9tICcuL3V0aWxzJ1xuXG5cblxuY2xhc3MgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBlbnRyeSA9IG51bGw7XG4gICAgbm9kZSA9IG51bGw7XG4gICAgc3RhdGUgPSB7fTtcbiAgICBjb21wdXRlZCA9IHt9O1xuXG4gICAgLy8gVE9ETzogTGlmZUN5Y2xlXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge307XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7fTtcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKCkge307XG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH07XG4gICAgY29tcG9uZW50V2lsbFVwZGF0ZSgpIHt9O1xuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHt9O1xuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge307XG4gICAgY29tcG9uZW50RGlkQ2F0Y2goKSB7fTtcblxuICAgIC8vIE9ic2VydmVyXG4gICAgaW5pdE9ic2VydmVyKCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gT2JzZXJ2ZXIuZnJvbShcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgfHwge30sXG4gICAgICAgICAgICA6OnRoaXMuc2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKTtcbiAgICB9O1xuICAgIGluaXRDb21wdXRlZCgpIHtcbiAgICAgICAgd2FsayhcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZWQsXG4gICAgICAgICAgICAobmFtZSwgZ2V0dGVyLCBjb21wdXRlZCkgPT4ge1xuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb21wdXRlZCwgbmFtZSwge1xuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBnZXQ6IHRoaXM6OmdldHRlclxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9XG4gICAgc2V0dGVyQ2FsbGJhY2sob2JqLCBrZXksIHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAob2JqICE9PSB0aGlzLnN0YXRlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCT09NISEhJyk7XG4gICAgICAgIHRoaXMuZGlmZkFuZFBhdGNoKCk7XG4gICAgfTtcblxuICAgIC8vIFJlbmRlclxuICAgIGJlZm9yZVJlbmRlcigpIHtcbiAgICAgICAgdGhpcy5pbml0T2JzZXJ2ZXIoKTtcbiAgICAgICAgdGhpcy5pbml0Q29tcHV0ZWQoKTtcbiAgICB9O1xuICAgIHJlbmRlcigpIHt9O1xuICAgIHJlbmRlclRvKGVudHJ5KSB7XG4gICAgICAgIHRoaXMuYmVmb3JlUmVuZGVyKCk7XG4gICAgICAgIHRoaXMubm9kZSA9IGZsYXR0ZW5Ob2RlKHRoaXMucmVuZGVyKCkpO1xuICAgICAgICB0aGlzLmVudHJ5ID0gZW50cnk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubm9kZSlcbiAgICAgICAgdGhpcy5lbnRyeS5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KHRoaXMubm9kZSkpXG4gICAgfTtcbiAgICBkaWZmQW5kUGF0Y2goKSB7XG4gICAgICAgIGNvbnN0IG9sZE5vZGUgPSB0aGlzLm5vZGU7XG4gICAgICAgIHRoaXMubm9kZSA9IGZsYXR0ZW5Ob2RlKHRoaXMucmVuZGVyKCkpO1xuICAgICAgICBjb25zdCBwYXRjaGVzID0gZGlmZih0aGlzLm5vZGUsIG9sZE5vZGUpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhvbGROb2RlKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5ub2RlKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cocGF0Y2hlcyk7XG4gICAgICAgIHBhdGNoKHRoaXMuZW50cnksIHBhdGNoZXMpO1xuICAgIH07XG59XG5cblxuXG5leHBvcnQgZGVmYXVsdCBDb21wb25lbnQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2luZGV4LmpzIiwiXG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSAnLi9jcmVhdGUnO1xuaW1wb3J0IHsgZGlmZiB9IGZyb20gJy4vZGlmZic7XG5pbXBvcnQgeyBwYXRjaCB9IGZyb20gJy4vcGF0Y2gnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMnO1xuXG5cbmV4cG9ydCB7XG4gICAgY3JlYXRlRWxlbWVudCxcbiAgICBkaWZmLFxuICAgIHBhdGNoLFxuICAgIHV0aWxzXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS9pbmRleC5qcyIsIlxuaW1wb3J0IHsgc2V0QXR0cmlidXRlcyB9IGZyb20gJy4uL3V0aWxzJztcblxuXG5cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQobm9kZSkge1xuICAgIC8qXG4gICAgbm9kZTogU3RyaW5nIHx8IHtcbiAgICAgICAgZWxlbWVudE5hbWU6IFN0cmluZ1xuICAgICAgICBjaGlsZHJlbjogbm9kZVtdXG4gICAgICAgIGF0dHJpYnV0ZXM6IE9iamVjdFxuICAgIH1cbiAgICAqL1xuICAgIGlmICh0eXBlb2Ygbm9kZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5vZGUuZWxlbWVudE5hbWUpO1xuICAgICAgICBub2RlLmNoaWxkcmVuICYmIGFwcGVuZENoaWxkcmVuKGVsLCBub2RlLmNoaWxkcmVuKTtcbiAgICAgICAgc2V0QXR0cmlidXRlcyhlbCwgbm9kZS5hdHRyaWJ1dGVzKTtcbiAgICAgICAgcmV0dXJuIGVsO1xuICAgIH1cbiAgICBlbHNlIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShub2RlKTtcbn1cblxuXG5mdW5jdGlvbiBhcHBlbmRDaGlsZHJlbih0YXJnZXQsIGNoaWxkcmVuKSB7XG4gICAgY2hpbGRyZW4ubWFwKGNyZWF0ZUVsZW1lbnQpXG4gICAgICAgIC5mb3JFYWNoKDo6dGFyZ2V0LmFwcGVuZENoaWxkKVxufVxuXG5cblxuZXhwb3J0IHtcbiAgICBjcmVhdGVFbGVtZW50XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS9jcmVhdGUvaW5kZXguanMiLCJcbmltcG9ydCB7IEV2ZW50VHlwZSwgRXZlbnRNYXAgfSBmcm9tICcuLi90eXBlcyc7XG5cblxuXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzKHRhcmdldCwgYXR0cmlidXRlcz17fSkge1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpXG4gICAgICAgIC5maWx0ZXIoa2V5ID0+IGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoa2V5KSlcbiAgICAgICAgLmZvckVhY2goYXR0ck5hbWUgPT4gc2V0QXR0cmlidXRlKHRhcmdldCwgYXR0ck5hbWUsIGF0dHJpYnV0ZXNbYXR0ck5hbWVdKSk7XG59XG5cblxuZnVuY3Rpb24gc2V0QXR0cmlidXRlKHRhcmdldCwgYXR0ck5hbWUsIGF0dHJWYWx1ZSkge1xuICAgIGF0dHJOYW1lID09PSAnY2xhc3NOYW1lJyAmJiAoYXR0ck5hbWUgPSAnY2xhc3MnKTtcbiAgICBpZiAoRXZlbnRUeXBlLmluY2x1ZGVzKGF0dHJOYW1lKSlcbiAgICAgICAgcmV0dXJuIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgRXZlbnRNYXBbYXR0ck5hbWVdLFxuICAgICAgICAgICAgYXR0clZhbHVlXG4gICAgICAgICk7XG4gICAgdGFyZ2V0LnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKTtcbn1cblxuXG5mdW5jdGlvbiByZW1vdmVBdHRyaWJ1dGUodGFyZ2V0LCBhdHRyTmFtZSwgb2xkQXR0clZhbHVlKSB7XG4gICAgYXR0ck5hbWUgPT09ICdjbGFzc05hbWUnICYmIChhdHRyTmFtZSA9ICdjbGFzcycpO1xuICAgIGlmIChFdmVudFR5cGUuaW5jbHVkZXMoYXR0ck5hbWUpKVxuICAgICAgICByZXR1cm4gdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICBFdmVudE1hcFthdHRyTmFtZV0sXG4gICAgICAgICAgICBvbGRBdHRyVmFsdWVcbiAgICAgICAgKTtcbiAgICB0YXJnZXQucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcbn1cblxuXG5mdW5jdGlvbiBpbnNlcnRBZnRlcihuZXdFbCwgdGFyZ2V0RWwpIHtcbiAgICBjb25zdCBwYXJlbnRFbCA9IHRhcmdldEVsLnBhcmVudE5vZGU7XG4gICAgaWYgKHBhcmVudEVsLmxhc3RDaGlsZCA9PT0gdGFyZ2V0RWwpXG4gICAgICAgIHJldHVybiBwYXJlbnRFbC5hcHBlbmRDaGlsZChuZXdFbCk7XG4gICAgcmV0dXJuIHBhcmVudEVsLmluc2VydEJlZm9yZShuZXdFbCx0YXJnZXRFbC5uZXh0U2libGluZyk7XG59XG5cblxuZXhwb3J0IHtcbiAgICBzZXRBdHRyaWJ1dGVzLFxuICAgIHNldEF0dHJpYnV0ZSxcbiAgICByZW1vdmVBdHRyaWJ1dGUsXG4gICAgaW5zZXJ0QWZ0ZXJcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3V0aWxzL2luZGV4LmpzIiwiXG5pbXBvcnQgQ2hhbmdlVHlwZSBmcm9tICcuL2NoYW5nZSc7XG5pbXBvcnQgeyBFdmVudFR5cGUsIEV2ZW50TWFwIH0gZnJvbSAnLi9ldmVudHMnO1xuXG5leHBvcnQge1xuICAgIENoYW5nZVR5cGUsXG4gICAgRXZlbnRUeXBlLFxuICAgIEV2ZW50TWFwXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS90eXBlcy9pbmRleC5qcyIsIlxuY29uc3QgQ2hhbmdlZCA9IHtcbiAgICBDUkVBVEU6ICdDUkVBVEUnLFxuICAgIFJFTU9WRTogJ1JFTU9WRScsXG4gICAgUkVQTEFDRTogJ1JFUExBQ0UnLFxuICAgIFVQREFURTogJ1VQREFURScsXG4gICAgU0VUX1BST1BTOiAnU0VUIFBST1BTJyxcbiAgICBSRU1PVkVfUFJPUFM6ICdSRU1PVkUgUFJPUFMnXG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IENoYW5nZWQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS90eXBlcy9jaGFuZ2UuanMiLCJcbmNvbnN0IEV2ZW50VHlwZSA9IFtcbiAgICAvLyBDbGlwYm9hcmQgRXZlbnRzXG4gICAgJ29uQ29weScsICdvbkN1dCcsICdvblBhc3RlJyxcbiAgICAvLyBDb21wb3NpdGlvbiBFdmVudHNcbiAgICAnb25Db21wb3NpdGlvbkVuZCcsICdvbkNvbXBvc2l0aW9uU3RhcnQnLCAnb25Db21wb3NpdGlvblVwZGF0ZScsXG4gICAgLy8gS2V5Ym9hcmQgRXZlbnRzXG4gICAgJ29uS2V5RG93bicsICdvbktleVByZXNzJywgJ29uS2V5VXAnLFxuICAgIC8vIEZvY3VzIEV2ZW50c1xuICAgICdvbkZvY3VzJywgJ29uQmx1cicsXG4gICAgLy8gRm9ybSBFdmVudHNcbiAgICAnb25DaGFuZ2UnLCAnb25JbnB1dCcsICdvbkludmFsaWQnLCAnb25TdWJtaXQnLFxuICAgIC8vIE1vdXNlIEV2ZW50c1xuICAgICdvbkNsaWNrJywgJ29uQ29udGV4dE1lbnUnLCAnb25Eb3VibGVDbGljaycsXG4gICAgJ29uRHJhZycsICdvbkRyYWdFbmQnLCAnb25EcmFnRW50ZXInLCAnb25EcmFnRXhpdCcsXG4gICAgJ29uRHJhZ0xlYXZlJywgJ29uRHJhZ092ZXInLCAnb25EcmFnU3RhcnQnLFxuICAgICdvbkRyb3AnLCAnb25Nb3VzZURvd24nLCAnb25Nb3VzZUVudGVyJyxcbiAgICAnb25Nb3VzZUxlYXZlJywgJ29uTW91c2VNb3ZlJywgJ29uTW91c2VPdXQnLFxuICAgICdvbk1vdXNlT3ZlcicgLCdvbk1vdXNlVXAnLFxuICAgIC8vIFNlbGVjdGlvbiBFdmVudHNcbiAgICAnb25TZWxlY3QnLFxuICAgIC8vIFRvdWNoIEV2ZW50c1xuICAgICdvblRvdWNoQ2FuY2VsJywgJ29uVG91Y2hFbmQnLCAnb25Ub3VjaE1vdmUnLCAnb25Ub3VjaFN0YXJ0JyxcbiAgICAvLyBVSSBFdmVudHNcbiAgICAnb25TY3JvbGwnLFxuICAgIC8vIFdoZWVsIEV2ZW50c1xuICAgICdvbldoZWVsJyxcbiAgICAvLyBNZWRpYSBFdmVudHNcbiAgICAnb25BYm9ydCcsICdvbkNhblBsYXknLCAnb25DYW5QbGF5VGhyb3VnaCcsXG4gICAgJ29uRHVyYXRpb25DaGFuZ2UnLCAnb25FbXB0aWVkJywgJ29uRW5jcnlwdGVkb25FbmRlZCcsXG4gICAgJ29uRXJyb3InLCAnb25Mb2FkZWREYXRhJywgJ29uTG9hZGVkTWV0YWRhdGEnLFxuICAgICdvbkxvYWRTdGFydCcsICdvblBhdXNlJywgJ29uUGxheW9uUGxheWluZycsXG4gICAgJ29uUHJvZ3Jlc3MnLCAnb25SYXRlQ2hhbmdlJywgJ29uU2Vla2VkJyxcbiAgICAnb25TZWVraW5nJywgJ29uU3RhbGxlZCcsICdvblN1c3BlbmRvblRpbWVVcGRhdGUnLFxuICAgICdvblZvbHVtZUNoYW5nZScsICdvbldhaXRpbmcnLFxuICAgIC8vIEltYWdlIEV2ZW50c1xuICAgICdvbkxvYWQnLCAnb25FcnJvcicsXG4gICAgLy8gQW5pbWF0aW9uIEV2ZW50c1xuICAgICdvbkFuaW1hdGlvblN0YXJ0JywgJ29uQW5pbWF0aW9uRW5kJywgJ29uQW5pbWF0aW9uSXRlcmF0aW9uJyxcbiAgICAvLyBUcmFuc2l0aW9uIEV2ZW50c1xuICAgICdvblRyYW5zaXRpb25FbmQnLFxuICAgIC8vIE90aGVyIEV2ZW50c1xuICAgICdvblRvZ2dsZSdcbl07XG5cblxuY29uc3QgRXZlbnRNYXAgPSBFdmVudFR5cGUucmVkdWNlKChldmVudHNNYXAsIGV2ZW50KSA9PiB7XG4gICAgZXZlbnRzTWFwW2V2ZW50XSA9IGV2ZW50XG4gICAgICAgIC5yZXBsYWNlKCdvbicsICcnKVxuICAgICAgICAucmVwbGFjZSgvW0EtWl0vLCBlID0+IGUudG9Mb3dlckNhc2UoKSk7XG4gICAgcmV0dXJuIGV2ZW50c01hcDtcbn0sIHt9KTtcblxuXG5leHBvcnQge1xuICAgIEV2ZW50VHlwZSxcbiAgICBFdmVudE1hcFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vdHlwZXMvZXZlbnRzLmpzIiwiXG5pbXBvcnQgeyBDaGFuZ2VUeXBlIH0gZnJvbSAnLi4vdHlwZXMvaW5kZXgnO1xuXG5cblxuZnVuY3Rpb24gZGlmZihuZXdOb2RlLCBvbGROb2RlKSB7XG4gICAgLypcbiAgICByZXR1cm4gdHlwZSBQYXRjaCB7XG4gICAgICAgIHR5cGU6IENoYW5nZVR5cGVcbiAgICAgICAgbmV3Tm9kZT86IE5vZGVcbiAgICAgICAgY2hpbGRyZW4/OiBQYXRjaFtdXG4gICAgICAgIGF0dHJpYnV0ZXM/OiBQYXRjaFtdXG4gICAgfVxuICAgICAqL1xuICAgIGlmICghb2xkTm9kZSkgcmV0dXJuIHsgdHlwZTogQ2hhbmdlVHlwZS5DUkVBVEUsIG5ld05vZGUgfTtcbiAgICBlbHNlIGlmICghbmV3Tm9kZSkgcmV0dXJuIHsgdHlwZTogQ2hhbmdlVHlwZS5SRU1PVkUgfTtcbiAgICBlbHNlIGlmIChpc0NoYW5nZWQobmV3Tm9kZSwgb2xkTm9kZSkpIHJldHVybiB7IHR5cGU6IENoYW5nZVR5cGUuUkVQTEFDRSwgbmV3Tm9kZSB9O1xuICAgIGVsc2UgaWYgKG5ld05vZGUuZWxlbWVudE5hbWUpXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlLlVQREFURSxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBkaWZmQ2hpbGRyZW4obmV3Tm9kZSwgb2xkTm9kZSksXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBkaWZmQXR0cmlidXRlcyhuZXdOb2RlLCBvbGROb2RlKVxuICAgICAgICB9O1xufVxuXG5mdW5jdGlvbiBpc0NoYW5nZWQobmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIHJldHVybiB0eXBlb2YgbmV3Tm9kZSAhPT0gdHlwZW9mIG9sZE5vZGUgfHxcbiAgICAgICAgdHlwZW9mIG5ld05vZGUgIT09IFwib2JqZWN0XCIgJiYgbmV3Tm9kZSAhPT0gb2xkTm9kZSB8fFxuICAgICAgICB0eXBlb2YgbmV3Tm9kZSA9PT0gXCJvYmplY3RcIiAmJiBuZXdOb2RlLmVsZW1lbnROYW1lICE9PSBvbGROb2RlLmVsZW1lbnROYW1lO1xufVxuXG5mdW5jdGlvbiBkaWZmQXR0cmlidXRlcyhuZXdOb2RlLCBvbGROb2RlKSB7XG4gICAgY29uc3QgcGF0Y2hlcyAgPSBbXTtcbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gey4uLm9sZE5vZGUuYXR0cmlidXRlcywgLi4ubmV3Tm9kZS5hdHRyaWJ1dGVzfTtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5tYXAoYXR0ck5hbWUgPT4ge1xuICAgICAgICBjb25zdCBuZXdBdHRyID0gbmV3Tm9kZS5hdHRyaWJ1dGVzW2F0dHJOYW1lXTtcbiAgICAgICAgY29uc3Qgb2xkQXR0ciA9IG9sZE5vZGUuYXR0cmlidXRlc1thdHRyTmFtZV07XG4gICAgICAgICFuZXdBdHRyICYmIHBhdGNoZXMucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlLlJFTU9WRV9QUk9QUyxcbiAgICAgICAgICAgIHZhbHVlOiBvbGRBdHRyLCBhdHRyTmFtZVxuICAgICAgICB9KTtcbiAgICAgICAgKCFvbGRBdHRyIHx8IG9sZEF0dHIgIT09IG5ld0F0dHIpICYmIHBhdGNoZXMucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlLlNFVF9QUk9QUyxcbiAgICAgICAgICAgIHZhbHVlOiBuZXdBdHRyLCBhdHRyTmFtZVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gcGF0Y2hlcztcbn1cblxuXG5mdW5jdGlvbiBkaWZmQ2hpbGRyZW4obmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIHJldHVybiBbLi4uQXJyYXkoTWF0aC5tYXgoXG4gICAgICAgIG5ld05vZGUuY2hpbGRyZW4ubGVuZ3RoLFxuICAgICAgICBvbGROb2RlLmNoaWxkcmVuLmxlbmd0aFxuICAgICkpLmtleXMoKV0ubWFwKGkgPT4gZGlmZihuZXdOb2RlLmNoaWxkcmVuW2ldLCBvbGROb2RlLmNoaWxkcmVuW2ldKSk7XG59XG5cblxuZXhwb3J0IHtcbiAgICBkaWZmXG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL2RpZmYvaW5kZXguanMiLCJcbmltcG9ydCB7IENoYW5nZVR5cGUgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSAnLi4vY3JlYXRlL2luZGV4JztcbmltcG9ydCB7IHNldEF0dHJpYnV0ZSwgcmVtb3ZlQXR0cmlidXRlIH0gZnJvbSBcIi4uL3V0aWxzL2luZGV4XCI7XG5cblxuXG5mdW5jdGlvbiBwYXRjaChwYXJlbnQsIHBhdGNoZXMsIGluZGV4PTApIHtcbiAgICBpZiAoIXBhdGNoZXMpIHJldHVybjtcbiAgICBjb25zdCBlbCA9IHBhcmVudC5jaGlsZE5vZGVzW2luZGV4XTtcbiAgICBzd2l0Y2ggKHBhdGNoZXMudHlwZSkge1xuICAgICAgICBjYXNlIENoYW5nZVR5cGUuQ1JFQVRFOiB7XG4gICAgICAgICAgICBjb25zdCB7IG5ld05vZGUgfSA9IHBhdGNoZXM7XG4gICAgICAgICAgICBjb25zdCBuZXdFbCA9IGNyZWF0ZUVsZW1lbnQobmV3Tm9kZSk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IHBhcmVudC5jaGlsZE5vZGVzLmxlbmd0aClcbiAgICAgICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQobmV3RWwpO1xuICAgICAgICAgICAgZWxzZSBwYXJlbnQuaW5zZXJ0QmVmb3JlKG5ld0VsLCBlbCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENoYW5nZVR5cGUuUkVNT1ZFOiB7XG4gICAgICAgICAgICBpZiAoIWVsKSByZXR1cm47XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwYXJlbnQpO1xuICAgICAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQ2hhbmdlVHlwZS5SRVBMQUNFOiB7XG4gICAgICAgICAgICBjb25zdCB7IG5ld05vZGUgfSA9IHBhdGNoZXM7XG4gICAgICAgICAgICBjb25zdCBuZXdFbCA9IGNyZWF0ZUVsZW1lbnQobmV3Tm9kZSk7XG4gICAgICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKG5ld0VsLCBlbCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENoYW5nZVR5cGUuVVBEQVRFOiB7XG4gICAgICAgICAgICBjb25zdCB7IGNoaWxkcmVuLCBhdHRyaWJ1dGVzIH0gPSBwYXRjaGVzO1xuICAgICAgICAgICAgcGF0Y2hBdHRyaWJ1dGVzKGVsLCBhdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goKGNoaWxkLCBpbmRleCkgPT4gcGF0Y2goZWwsIGNoaWxkLCBpbmRleCkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBhdGNoQXR0cmlidXRlcyhlbGVtZW50LCBhdHRyaWJ1dGVzKSB7XG4gICAgYXR0cmlidXRlcy5mb3JFYWNoKHBhdGNoID0+IHtcbiAgICAgICAgY29uc3QgeyB0eXBlLCBhdHRyTmFtZSwgdmFsdWUgfSA9IHBhdGNoO1xuICAgICAgICBpZiAodHlwZSA9PT0gQ2hhbmdlVHlwZS5TRVRfUFJPUFMpXG4gICAgICAgICAgICBzZXRBdHRyaWJ1dGUoZWxlbWVudCwgYXR0ck5hbWUsIHZhbHVlKTtcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gQ2hhbmdlVHlwZS5SRU1PVkVfUFJPUFMpXG4gICAgICAgICAgICByZW1vdmVBdHRyaWJ1dGUoZWxlbWVudCwgYXR0ck5hbWUsIHZhbHVlKVxuICAgIH0pXG59XG5cblxuZXhwb3J0IHtcbiAgICBwYXRjaFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vcGF0Y2gvaW5kZXguanMiLCJcbmltcG9ydCBPYnNlcnZlciBmcm9tICcuL29iamVjdCc7XG5pbXBvcnQgT2JzZXJ2ZXJBcnJheSBmcm9tICcuL2FycmF5JztcbmltcG9ydCB7IHdhbGssIG9ic2VydmVyIH0gZnJvbSAnLi91dGlscyc7XG5cblxuZXhwb3J0IHtcbiAgICBPYnNlcnZlcixcbiAgICBPYnNlcnZlckFycmF5LFxuICAgIHdhbGssIG9ic2VydmVyXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL29ic2VydmVyL2luZGV4LmpzIiwiXG5pbXBvcnQgeyB3YWxrLCBvYnNlcnZlciB9IGZyb20gJy4uL3V0aWxzL2luZGV4J1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2JzZXJ2ZXIge1xuICAgIGNvbnN0cnVjdG9yKG9iaiwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JqICE9PSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVHlwZSBcIk9iamVjdFwiIHJlcXVpcmVkIScpO1xuICAgICAgICB3YWxrKG9iaiwgKGtleSwgdmFsdWUpID0+IG9ic2VydmVyKFxuICAgICAgICAgICAgdGhpcywga2V5LCB2YWx1ZSxcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrLFxuICAgICAgICAgICAgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGZyb20gPSAob2JqLCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZlcihcbiAgICAgICAgICAgIG9iaixcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrLFxuICAgICAgICAgICAgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKVxuICAgIH07XG5cbiAgICBzdGF0aWMgdG9TdHJpbmcgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBgT2JzZXJ2ZXIgJHt0aGlzfWBcbiAgICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9vYnNlcnZlci9vYmplY3QvaW5kZXguanMiLCJcbmltcG9ydCBPYnNlcnZlciBmcm9tICcuLi9vYmplY3QnO1xuaW1wb3J0IE9ic2VydmVyQXJyYXkgZnJvbSAnLi4vYXJyYXknO1xuXG5cbmNvbnN0IG5vb3AgPSAoKSA9PiB7fTtcblxuXG5cbmZ1bmN0aW9uIHdhbGsob2JqLCBmdW4pIHtcbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEZ1bmN0aW9uIFwid2Fsa1wiIHJlcXVpcmUgYW4gXCJvYmplY3RcIiBpbnN0ZWFkIG9mICR7dHlwZW9mIG9ian1gKTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKVxuICAgICAgICByZXR1cm4gb2JqLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiBmdW4oaW5kZXgsIGl0ZW0sIG9iaikpO1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4gZnVuKGtleSwgb2JqW2tleV0sIG9iaikpO1xufVxuXG5mdW5jdGlvbiBvYnNlcnZlcihvYmosIGtleSwgdmFsdWUsIHNldHRlckNhbGxiYWNrPW5vb3AsIGdldHRlckNhbGxiYWNrPW5vb3ApIHtcbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEZ1bmN0aW9uIFwib2JzZXJ2ZXJcIiByZXF1aXJlIGFuIFwib2JqZWN0XCIgaW5zdGVhZCBvZiAke3R5cGVvZiBvYmp9YCk7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpXG4gICAgICAgIHZhbHVlID0gT2JzZXJ2ZXJBcnJheS5mcm9tKHZhbHVlLCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spO1xuICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgdmFsdWUgPSBPYnNlcnZlci5mcm9tKHZhbHVlLCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgICAgICBnZXR0ZXJDYWxsYmFjayhvYmosIGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgICAgIH0sXG4gICAgICAgIHNldDogbmV3VmFsdWUgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSBvYmpba2V5XTtcbiAgICAgICAgICAgIG9ic2VydmVyKG9iaiwga2V5LCBuZXdWYWx1ZSwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKTtcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrKG9iaiwga2V5LCBuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICB9XG4gICAgfSlcbn1cblxuXG5jb25zdCBnZXRVbmlxdWVJRCA9IGZ1bmN0aW9uKCkge1xuICAgIGxldCBpZCA9IDA7XG4gICAgcmV0dXJuICgoKSA9PiBpZCArKyk7XG59KCk7XG5cblxuZXhwb3J0IHtcbiAgICB3YWxrLFxuICAgIG9ic2VydmVyLFxuICAgIGdldFVuaXF1ZUlEXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL29ic2VydmVyL3V0aWxzL2luZGV4LmpzIiwiXG5pbXBvcnQgeyB3YWxrLCBvYnNlcnZlciB9IGZyb20gJy4uL3V0aWxzL2luZGV4JztcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9ic2VydmVyQXJyYXkge1xuICAgIGNvbnN0cnVjdG9yKGFycmF5LCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spIHtcbiAgICAgICAgIWFycmF5ICYmIChhcnJheSA9IFtdKTtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGFycmF5KSlcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1R5cGUgXCJBcnJheVwiIHJlcXVpcmVkIScpO1xuICAgICAgICB3YWxrKGFycmF5LCAoaW5kZXgsIGl0ZW0pID0+IG9ic2VydmVyKFxuICAgICAgICAgICAgdGhpcywgaW5kZXgsIGl0ZW0sXG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKSk7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGZyb20gPSAoYXJyYXksIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFjaykgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmVyQXJyYXkoXG4gICAgICAgICAgICBhcnJheSxcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrLFxuICAgICAgICAgICAgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKVxuICAgIH07XG4gICAgc3RhdGljIGlzT2JzZXJ2ZXJBcnJheSAgPSBhcnJheSA9PiB7XG4gICAgICAgIHJldHVybiBhcnJheS5fX3Byb3RvX18uY29uc3RydWN0b3IgPT09IE9ic2VydmVyQXJyYXk7XG4gICAgfTtcbiAgICBzdGF0aWMgb2YgPSAoLi4uYXJncykgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmVyQXJyYXkoWy4uLmFyZ3NdKVxuICAgIH07XG5cblxuICAgIGNvbmNhdCA9ICguLi5hcnJheXMpID0+IHtcbiAgICAgICAgY29uc3QgbmV3QXJyYXkgPSBuZXcgT2JzZXJ2ZXJBcnJheSgpO1xuICAgICAgICBbdGhpcywgLi4uYXJyYXlzXS5mb3JFYWNoKFxuICAgICAgICAgICAgYXJyYXkgPT4gYXJyYXkuZm9yRWFjaChuZXdBcnJheS5wdXNoKVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gbmV3QXJyYXk7XG4gICAgfTtcbiAgICBjb3B5V2l0aGluID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgLy8gVE9ET1xuICAgICAgICByZXR1cm4gT2JzZXJ2ZXJBcnJheS5mcm9tKFxuICAgICAgICAgICAgQXJyYXkuZnJvbSh0aGlzKS5jb3B5V2l0aGluKC4uLmFyZ3MpXG4gICAgICAgIClcbiAgICB9O1xuICAgIGVudHJpZXMgPSBmdW5jdGlvbiAqKCkge1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICB3aGlsZSAodGhpc1tpbmRleF0pXG4gICAgICAgICAgICB5aWVsZCBbaW5kZXgrKywgdGhpc1tpbmRleF1dO1xuICAgIH07XG4gICAgZXZlcnkgPSAoKSA9PiB7fTtcbiAgICBmaWxsID0gKCkgPT4ge307XG4gICAgZmlsdGVyID0gKCkgPT4ge307XG4gICAgZmluZCA9ICgpID0+IHt9O1xuICAgIGZpbmRJbmRleCA9ICgpID0+IHt9O1xuICAgIGZvckVhY2ggPSAoKSA9PiB7fTtcbiAgICBpbmNsdWRlcyA9ICgpID0+IHt9O1xuICAgIGluZGV4T2YgPSAoKSA9PiB7fTtcbiAgICBqb2luID0gKCkgPT4ge307XG4gICAga2V5cyA9ICgpID0+IHt9O1xuICAgIGxhc3RJbmRleE9mID0gKCkgPT4ge307XG4gICAgbWFwID0gKCkgPT4ge307XG4gICAgcG9wID0gKCkgPT4ge307XG4gICAgcHVzaCA9IHZhbHVlID0+IHtcbiAgICAgICAgb2JzZXJ2ZXIoXG4gICAgICAgICAgICB0aGlzLCB0aGlzLmxlbmd0aCwgdmFsdWUsXG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5sZW5ndGggKys7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIHJlZHVjZSA9ICgpID0+IHt9O1xuICAgIHJlZHVjZVJpZ2h0ID0gKCkgPT4ge307XG4gICAgcmV2ZXJzZSA9ICgpID0+IHt9O1xuICAgIHNoaWZ0ID0gKCkgPT4ge307XG4gICAgc2xpY2UgPSAoKSA9PiB7fTtcbiAgICBzb21lID0gKCkgPT4ge307XG4gICAgc29ydCA9ICgpID0+IHt9O1xuICAgIHNwbGljZSA9ICgpID0+IHt9O1xuICAgIHRvTG9jYWxlU3RyaW5nID0gKCkgPT4ge307XG4gICAgdG9Tb3VyY2UgPSAoKSA9PiB7fTtcbiAgICB0b1N0cmluZyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGBPYnNlcnZlckFycmF5IFsuLi5dYFxuICAgIH07XG4gICAgdW5zaGlmdCA9ICgpID0+IHt9O1xuICAgIHZhbHVlcyA9ICgpID0+IHt9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9vYnNlcnZlci9hcnJheS9pbmRleC5qcyIsIlxuZnVuY3Rpb24gZmxhdHRlbk5vZGUobm9kZSkge1xuICAgIGlmICghbm9kZSkgcmV0dXJuO1xuICAgIGlmIChub2RlLmNoaWxkcmVuKVxuICAgICAgICBub2RlLmNoaWxkcmVuID0gZmxhdHRlbkNoaWxkcmVuKG5vZGUuY2hpbGRyZW4pO1xuICAgIHJldHVybiBub2RlXG59XG5cbmZ1bmN0aW9uIGZsYXR0ZW5DaGlsZHJlbihjaGlsZHJlbikge1xuICAgIHJldHVybiBbXS5jb25jYXQoLi4uY2hpbGRyZW4pXG4gICAgICAgIC5tYXAobm9kZSA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG5vZGUgPT09ICdvYmplY3QnKVxuICAgICAgICAgICAgICAgIHJldHVybiBmbGF0dGVuTm9kZShub2RlKTtcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuIG5vZGU7XG4gICAgICAgIH0pXG4gICAgICAgIC5maWx0ZXIobm9kZSA9PiAhIW5vZGUpO1xufVxuXG5cbmV4cG9ydCB7XG4gICAgZmxhdHRlbk5vZGVcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvdXRpbHMvaW5kZXguanMiLCJcbmltcG9ydCB7IE11c2UgfSBmcm9tICcuLi9pbmRleCc7XG5cblxuXG5jbGFzcyBBcHAgZXh0ZW5kcyBNdXNlIHtcbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgbmFtZTogJ0pvZScsXG4gICAgICAgIGFnZTogMjIsXG4gICAgICAgIGxhbmdzOiBbXG4gICAgICAgICAgICAnSmF2YVNjcmlwdCcsXG4gICAgICAgICAgICAnUHl0aG9uJyxcbiAgICAgICAgICAgICdSdXN0JyxcbiAgICAgICAgICAgICdTY2FsYSdcbiAgICAgICAgXVxuICAgIH1cblxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgICBpc0FnZU9kZCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmFnZSAlIDIgIT09IDBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnN0YXRlLmFnZSArKztcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7IHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8aDE+SGVsbG8hPC9oMT5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG1vZGVsPXt0aGlzLnN0YXRlLm5hbWV9Lz5cbiAgICAgICAgICAgIDxwPk15IG5hbWUgaXMge3RoaXMuc3RhdGUubmFtZX0uPC9wPlxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgSSdtIHt0aGlzLnN0YXRlLmFnZX0geWVhcnMgb2xkXG4gICAgICAgICAgICAgICAgPHNwYW4gaWY9e3RoaXMuY29tcHV0ZWQuaXNBZ2VPZGR9PiBhbmQgaXQncyBhbiBvZGQgbnVtYmVyLjwvc3Bhbj5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDxwPkFuZCBJIGNhbiB0aG9zZSBwcm9ncmFtbWluZyBsYW5ndWFnZXM6PC9wPlxuICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgIDxsaSBmb3I9e2xhbmcgaW4gdGhpcy5zdGF0ZS5sYW5nc30+e2xhbmd9PC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9PkNsaWNrIE1lPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICl9XG59XG5cblxuXG5jb25zdCBhcHAgPSBuZXcgQXBwKCk7XG5hcHAucmVuZGVyVG8oZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9leGFtcGxlL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==