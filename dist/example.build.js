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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
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
        this.node = this.render();
        this.entry = entry;
        console.log(this.node);
        this.entry.appendChild((0, _dom.createElement)(this.node));
    }
    diffAndPatch() {
        const oldNode = this.node;
        this.node = this.render();
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

var _diff = __webpack_require__(6);

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
        if (node.children) {
            // node.children = [].concat(...node.children).filter(node => !!node);
            appendChildren(el, node.children);
        }
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

var _events = __webpack_require__(5);

function setAttributes(target, attributes = {}) {
    Object.keys(attributes).filter(key => attributes.hasOwnProperty(key)).forEach(attrName => setAttribute(target, attrName, attributes[attrName]));
}

function setAttribute(target, attrName, attrValue) {
    attrName === 'className' && (attrName = 'class');
    if (_events.eventTypes.includes(attrName)) return target.addEventListener(_events.eventMap[attrName], attrValue);
    target.setAttribute(attrName, attrValue);
}

function removeAttribute(target, attrName, oldAttrValue) {
    attrName === 'className' && (attrName = 'class');
    if (_events.eventTypes.includes(attrName)) return target.addEventListener(_events.eventMap[attrName], oldAttrValue);
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

const eventTypes = [
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

const eventMap = eventTypes.reduce((eventsMap, event) => {
    eventsMap[event] = event.replace('on', '').replace(/[A-Z]/, e => e.toLowerCase());
    return eventsMap;
}, {});

exports.eventTypes = eventTypes;
exports.eventMap = eventMap;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.diff = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _index = __webpack_require__(7);

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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ChangeType = undefined;

var _change = __webpack_require__(8);

var _change2 = _interopRequireDefault(_change);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.ChangeType = _change2.default;

/***/ }),
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.patch = undefined;

var _types = __webpack_require__(7);

var _index = __webpack_require__(3);

var _index2 = __webpack_require__(4);

function patch(parent, patches, index = 0) {
    if (!patches) return;
    const el = parent.childNodes[index];
    if (!el) return;
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
                elementName: 'p',
                attributes: {},
                children: ['My name is ', this.state.name, '.']
            }, {
                elementName: 'p',
                attributes: {},
                children: ['I\'m ', this.state.age, ' years old', this.computed.isAgeOdd ? {
                    elementName: 'span',
                    attributes: {},
                    children: ['and it\'s an odd number.']
                } : null]
            }, {
                elementName: 'p',
                attributes: {},
                children: ['I can those programming languages:']
            }, {
                elementName: 'ul',
                attributes: {},
                children: [Array.from(this.state.langs).map(((lang, index) => ({
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2Q0NTQ4NDYxYjQzNDg3OWYwYTIiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9jcmVhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdXRpbHMvZXZlbnRzLmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL2RpZmYvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdHlwZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdHlwZXMvY2hhbmdlLmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3BhdGNoL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvb2JzZXJ2ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci9vYmplY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci91dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL29ic2VydmVyL2FycmF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL2V4YW1wbGUvaW5kZXguanMiXSwibmFtZXMiOlsiTXVzZSIsIkNvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwiZW50cnkiLCJub2RlIiwic3RhdGUiLCJjb21wdXRlZCIsImNvbXBvbmVudFdpbGxNb3VudCIsImNvbXBvbmVudERpZE1vdW50IiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsInNob3VsZENvbXBvbmVudFVwZGF0ZSIsImNvbXBvbmVudFdpbGxVcGRhdGUiLCJjb21wb25lbnREaWRVcGRhdGUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImNvbXBvbmVudERpZENhdGNoIiwiaW5pdE9ic2VydmVyIiwiZnJvbSIsInNldHRlckNhbGxiYWNrIiwiaW5pdENvbXB1dGVkIiwibmFtZSIsImdldHRlciIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsImdldCIsIm9iaiIsImtleSIsInZhbHVlIiwib2xkVmFsdWUiLCJFcnJvciIsImRpZmZBbmRQYXRjaCIsImJlZm9yZVJlbmRlciIsInJlbmRlciIsInJlbmRlclRvIiwiY29uc29sZSIsImxvZyIsImFwcGVuZENoaWxkIiwib2xkTm9kZSIsInBhdGNoZXMiLCJjcmVhdGVFbGVtZW50IiwiZGlmZiIsInBhdGNoIiwidXRpbHMiLCJlbCIsImRvY3VtZW50IiwiZWxlbWVudE5hbWUiLCJjaGlsZHJlbiIsImFwcGVuZENoaWxkcmVuIiwiYXR0cmlidXRlcyIsImNyZWF0ZVRleHROb2RlIiwidGFyZ2V0IiwibWFwIiwiZm9yRWFjaCIsInNldEF0dHJpYnV0ZXMiLCJrZXlzIiwiZmlsdGVyIiwiaGFzT3duUHJvcGVydHkiLCJhdHRyTmFtZSIsInNldEF0dHJpYnV0ZSIsImF0dHJWYWx1ZSIsImluY2x1ZGVzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUF0dHJpYnV0ZSIsIm9sZEF0dHJWYWx1ZSIsImluc2VydEFmdGVyIiwibmV3RWwiLCJ0YXJnZXRFbCIsInBhcmVudEVsIiwicGFyZW50Tm9kZSIsImxhc3RDaGlsZCIsImluc2VydEJlZm9yZSIsIm5leHRTaWJsaW5nIiwiZXZlbnRUeXBlcyIsImV2ZW50TWFwIiwicmVkdWNlIiwiZXZlbnRzTWFwIiwiZXZlbnQiLCJyZXBsYWNlIiwiZSIsInRvTG93ZXJDYXNlIiwibmV3Tm9kZSIsInR5cGUiLCJDUkVBVEUiLCJSRU1PVkUiLCJpc0NoYW5nZWQiLCJSRVBMQUNFIiwiVVBEQVRFIiwiZGlmZkNoaWxkcmVuIiwiZGlmZkF0dHJpYnV0ZXMiLCJuZXdBdHRyIiwib2xkQXR0ciIsInB1c2giLCJSRU1PVkVfUFJPUFMiLCJTRVRfUFJPUFMiLCJBcnJheSIsIk1hdGgiLCJtYXgiLCJsZW5ndGgiLCJpIiwiQ2hhbmdlVHlwZSIsIkNoYW5nZWQiLCJwYXJlbnQiLCJpbmRleCIsImNoaWxkTm9kZXMiLCJyZW1vdmVDaGlsZCIsInJlcGxhY2VDaGlsZCIsInBhdGNoQXR0cmlidXRlcyIsImNoaWxkIiwiZWxlbWVudCIsIk9ic2VydmVyIiwiT2JzZXJ2ZXJBcnJheSIsIndhbGsiLCJvYnNlcnZlciIsImdldHRlckNhbGxiYWNrIiwiVHlwZUVycm9yIiwidG9TdHJpbmciLCJub29wIiwiZnVuIiwiaXNBcnJheSIsIml0ZW0iLCJzZXQiLCJuZXdWYWx1ZSIsImdldFVuaXF1ZUlEIiwiaWQiLCJhcnJheSIsImlzT2JzZXJ2ZXJBcnJheSIsIl9fcHJvdG9fXyIsIm9mIiwiYXJncyIsImNvbmNhdCIsImFycmF5cyIsIm5ld0FycmF5IiwiY29weVdpdGhpbiIsImVudHJpZXMiLCJldmVyeSIsImZpbGwiLCJmaW5kIiwiZmluZEluZGV4IiwiaW5kZXhPZiIsImpvaW4iLCJsYXN0SW5kZXhPZiIsInBvcCIsInJlZHVjZVJpZ2h0IiwicmV2ZXJzZSIsInNoaWZ0Iiwic2xpY2UiLCJzb21lIiwic29ydCIsInNwbGljZSIsInRvTG9jYWxlU3RyaW5nIiwidG9Tb3VyY2UiLCJ1bnNoaWZ0IiwidmFsdWVzIiwiQXBwIiwiYWdlIiwibGFuZ3MiLCJpc0FnZU9kZCIsImhhbmRsZUNsaWNrIiwibGFuZyIsImFwcCIsImdldEVsZW1lbnRCeUlkIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNqRUE7Ozs7OztRQUtJQSxJOzs7Ozs7Ozs7Ozs7O0FDTEo7O0FBQ0E7O0lBSU1DLFMsR0FBTixNQUFNQSxTQUFOLENBQWdCO0FBQ1pDLGtCQUFjO0FBQUEsYUFFZEMsS0FGYyxHQUVOLElBRk07QUFBQSxhQUdkQyxJQUhjLEdBR1AsSUFITztBQUFBLGFBSWRDLEtBSmMsR0FJTixFQUpNO0FBQUEsYUFLZEMsUUFMYyxHQUtILEVBTEc7QUFBRTs7QUFPaEI7QUFDQUMseUJBQXFCLENBQUU7QUFDdkJDLHdCQUFvQixDQUFFO0FBQ3RCQyxnQ0FBNEIsQ0FBRTtBQUM5QkMsNEJBQXdCO0FBQ3BCLGVBQU8sSUFBUDtBQUNIO0FBQ0RDLDBCQUFzQixDQUFFO0FBQ3hCQyx5QkFBcUIsQ0FBRTtBQUN2QkMsMkJBQXVCLENBQUU7QUFDekJDLHdCQUFvQixDQUFFOztBQUV0QjtBQUNBQyxtQkFBZTtBQUNYLGFBQUtWLEtBQUwsR0FBYSxtQkFBU1csSUFBVCxDQUNULEtBQUtYLEtBQUwsSUFBYyxFQURMLEVBRVAsS0FBS1ksY0FGRSxNQUVQLElBRk8sRUFBYjtBQUlIO0FBQ0RDLG1CQUFlO0FBQ1gsNEJBQ0ksS0FBS1osUUFEVCxFQUVJLENBQUNhLElBQUQsRUFBT0MsTUFBUCxFQUFlZCxRQUFmLEtBQTRCO0FBQ3hCZSxtQkFBT0MsY0FBUCxDQUFzQmhCLFFBQXRCLEVBQWdDYSxJQUFoQyxFQUFzQztBQUNsQ0ksNEJBQVksSUFEc0I7QUFFbENDLDhCQUFjLEtBRm9CO0FBR2xDQyxxQkFBV0wsTUFBWCxNQUFLLElBQUw7QUFIa0MsYUFBdEM7QUFLSCxTQVJMO0FBVUg7QUFDREgsbUJBQWVTLEdBQWYsRUFBb0JDLEdBQXBCLEVBQXlCQyxLQUF6QixFQUFnQ0MsUUFBaEMsRUFBMEM7QUFDdEMsWUFBSUgsUUFBUSxLQUFLckIsS0FBakIsRUFDSSxNQUFNLElBQUl5QixLQUFKLENBQVUsU0FBVixDQUFOO0FBQ0osYUFBS0MsWUFBTDtBQUNIOztBQUVEO0FBQ0FDLG1CQUFlO0FBQ1gsYUFBS2pCLFlBQUw7QUFDQSxhQUFLRyxZQUFMO0FBQ0g7QUFDRGUsYUFBUyxDQUFFO0FBQ1hDLGFBQVMvQixLQUFULEVBQWdCO0FBQ1osYUFBSzZCLFlBQUw7QUFDQSxhQUFLNUIsSUFBTCxHQUFZLEtBQUs2QixNQUFMLEVBQVo7QUFDQSxhQUFLOUIsS0FBTCxHQUFhQSxLQUFiO0FBQ0FnQyxnQkFBUUMsR0FBUixDQUFZLEtBQUtoQyxJQUFqQjtBQUNBLGFBQUtELEtBQUwsQ0FBV2tDLFdBQVgsQ0FBdUIsd0JBQWMsS0FBS2pDLElBQW5CLENBQXZCO0FBQ0g7QUFDRDJCLG1CQUFlO0FBQ1gsY0FBTU8sVUFBVSxLQUFLbEMsSUFBckI7QUFDQSxhQUFLQSxJQUFMLEdBQVksS0FBSzZCLE1BQUwsRUFBWjtBQUNBLGNBQU1NLFVBQVUsZUFBSyxLQUFLbkMsSUFBVixFQUFnQmtDLE9BQWhCLENBQWhCO0FBQ0FILGdCQUFRQyxHQUFSLENBQVlFLE9BQVo7QUFDQUgsZ0JBQVFDLEdBQVIsQ0FBWSxLQUFLaEMsSUFBakI7QUFDQStCLGdCQUFRQyxHQUFSLENBQVlHLE9BQVo7QUFDQSx3QkFBTSxLQUFLcEMsS0FBWCxFQUFrQm9DLE9BQWxCO0FBQ0g7QUFsRVcsQztrQkF1RUR0QyxTOzs7Ozs7Ozs7Ozs7OztBQzVFZjs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O1FBSUl1QyxhO1FBQ0FDLEk7UUFDQUMsSztRQUNBQyxLOzs7Ozs7Ozs7Ozs7OztBQ1ZKOztBQUlBLFNBQVNILGFBQVQsQ0FBdUJwQyxJQUF2QixFQUE2QjtBQUN6Qjs7Ozs7OztBQU9BLFFBQUksT0FBT0EsSUFBUCxLQUFnQixRQUFwQixFQUE4QjtBQUMxQixjQUFNd0MsS0FBS0MsU0FBU0wsYUFBVCxDQUF1QnBDLEtBQUswQyxXQUE1QixDQUFYO0FBQ0EsWUFBSTFDLEtBQUsyQyxRQUFULEVBQW1CO0FBQ2Y7QUFDQUMsMkJBQWVKLEVBQWYsRUFBbUJ4QyxLQUFLMkMsUUFBeEI7QUFDSDtBQUNELGtDQUFjSCxFQUFkLEVBQWtCeEMsS0FBSzZDLFVBQXZCO0FBQ0EsZUFBT0wsRUFBUDtBQUNILEtBUkQsTUFTSyxPQUFPQyxTQUFTSyxjQUFULENBQXdCOUMsSUFBeEIsQ0FBUDtBQUNSOztBQUdELFNBQVM0QyxjQUFULENBQXdCRyxNQUF4QixFQUFnQ0osUUFBaEMsRUFBMEM7QUFDdENBLGFBQVNLLEdBQVQsQ0FBYVosYUFBYixFQUNLYSxPQURMLENBQ2VGLE9BQU9kLFdBRHRCLE1BQ2VjLE1BRGY7QUFFSDs7UUFLR1gsYSxHQUFBQSxhOzs7Ozs7Ozs7Ozs7OztBQ2pDSjs7QUFJQSxTQUFTYyxhQUFULENBQXVCSCxNQUF2QixFQUErQkYsYUFBVyxFQUExQyxFQUE4QztBQUMxQzVCLFdBQU9rQyxJQUFQLENBQVlOLFVBQVosRUFDS08sTUFETCxDQUNZN0IsT0FBT3NCLFdBQVdRLGNBQVgsQ0FBMEI5QixHQUExQixDQURuQixFQUVLMEIsT0FGTCxDQUVhSyxZQUFZQyxhQUFhUixNQUFiLEVBQXFCTyxRQUFyQixFQUErQlQsV0FBV1MsUUFBWCxDQUEvQixDQUZ6QjtBQUdIOztBQUdELFNBQVNDLFlBQVQsQ0FBc0JSLE1BQXRCLEVBQThCTyxRQUE5QixFQUF3Q0UsU0FBeEMsRUFBbUQ7QUFDL0NGLGlCQUFhLFdBQWIsS0FBNkJBLFdBQVcsT0FBeEM7QUFDQSxRQUFJLG1CQUFXRyxRQUFYLENBQW9CSCxRQUFwQixDQUFKLEVBQ0ksT0FBT1AsT0FBT1csZ0JBQVAsQ0FDSCxpQkFBU0osUUFBVCxDQURHLEVBRUhFLFNBRkcsQ0FBUDtBQUlKVCxXQUFPUSxZQUFQLENBQW9CRCxRQUFwQixFQUE4QkUsU0FBOUI7QUFDSDs7QUFHRCxTQUFTRyxlQUFULENBQXlCWixNQUF6QixFQUFpQ08sUUFBakMsRUFBMkNNLFlBQTNDLEVBQXlEO0FBQ3JETixpQkFBYSxXQUFiLEtBQTZCQSxXQUFXLE9BQXhDO0FBQ0EsUUFBSSxtQkFBV0csUUFBWCxDQUFvQkgsUUFBcEIsQ0FBSixFQUNJLE9BQU9QLE9BQU9XLGdCQUFQLENBQ0gsaUJBQVNKLFFBQVQsQ0FERyxFQUVITSxZQUZHLENBQVA7QUFJSmIsV0FBT1ksZUFBUCxDQUF1QkwsUUFBdkI7QUFDSDs7QUFHRCxTQUFTTyxXQUFULENBQXFCQyxLQUFyQixFQUE0QkMsUUFBNUIsRUFBc0M7QUFDbEMsVUFBTUMsV0FBV0QsU0FBU0UsVUFBMUI7QUFDQSxRQUFJRCxTQUFTRSxTQUFULEtBQXVCSCxRQUEzQixFQUNJLE9BQU9DLFNBQVMvQixXQUFULENBQXFCNkIsS0FBckIsQ0FBUDtBQUNKLFdBQU9FLFNBQVNHLFlBQVQsQ0FBc0JMLEtBQXRCLEVBQTRCQyxTQUFTSyxXQUFyQyxDQUFQO0FBQ0g7O1FBSUdsQixhLEdBQUFBLGE7UUFDQUssWSxHQUFBQSxZO1FBQ0FJLGUsR0FBQUEsZTtRQUNBRSxXLEdBQUFBLFc7Ozs7Ozs7Ozs7Ozs7QUM3Q0osTUFBTVEsYUFBYTtBQUNmO0FBQ0EsUUFGZSxFQUVMLE9BRkssRUFFSSxTQUZKO0FBR2Y7QUFDQSxrQkFKZSxFQUlLLG9CQUpMLEVBSTJCLHFCQUozQjtBQUtmO0FBQ0EsV0FOZSxFQU1GLFlBTkUsRUFNWSxTQU5aO0FBT2Y7QUFDQSxTQVJlLEVBUUosUUFSSTtBQVNmO0FBQ0EsVUFWZSxFQVVILFNBVkcsRUFVUSxXQVZSLEVBVXFCLFVBVnJCO0FBV2Y7QUFDQSxTQVplLEVBWUosZUFaSSxFQVlhLGVBWmIsRUFhZixRQWJlLEVBYUwsV0FiSyxFQWFRLGFBYlIsRUFhdUIsWUFidkIsRUFjZixhQWRlLEVBY0EsWUFkQSxFQWNjLGFBZGQsRUFlZixRQWZlLEVBZUwsYUFmSyxFQWVVLGNBZlYsRUFnQmYsY0FoQmUsRUFnQkMsYUFoQkQsRUFnQmdCLFlBaEJoQixFQWlCZixhQWpCZSxFQWlCQSxXQWpCQTtBQWtCZjtBQUNBLFVBbkJlO0FBb0JmO0FBQ0EsZUFyQmUsRUFxQkUsWUFyQkYsRUFxQmdCLGFBckJoQixFQXFCK0IsY0FyQi9CO0FBc0JmO0FBQ0EsVUF2QmU7QUF3QmY7QUFDQSxTQXpCZTtBQTBCZjtBQUNBLFNBM0JlLEVBMkJKLFdBM0JJLEVBMkJTLGtCQTNCVCxFQTRCZixrQkE1QmUsRUE0QkssV0E1QkwsRUE0QmtCLG9CQTVCbEIsRUE2QmYsU0E3QmUsRUE2QkosY0E3QkksRUE2Qlksa0JBN0JaLEVBOEJmLGFBOUJlLEVBOEJBLFNBOUJBLEVBOEJXLGlCQTlCWCxFQStCZixZQS9CZSxFQStCRCxjQS9CQyxFQStCZSxVQS9CZixFQWdDZixXQWhDZSxFQWdDRixXQWhDRSxFQWdDVyx1QkFoQ1gsRUFpQ2YsZ0JBakNlLEVBaUNHLFdBakNIO0FBa0NmO0FBQ0EsUUFuQ2UsRUFtQ0wsU0FuQ0s7QUFvQ2Y7QUFDQSxrQkFyQ2UsRUFxQ0ssZ0JBckNMLEVBcUN1QixzQkFyQ3ZCO0FBc0NmO0FBQ0EsaUJBdkNlO0FBd0NmO0FBQ0EsVUF6Q2UsQ0FBbkI7O0FBNkNBLE1BQU1DLFdBQVdELFdBQVdFLE1BQVgsQ0FBa0IsQ0FBQ0MsU0FBRCxFQUFZQyxLQUFaLEtBQXNCO0FBQ3JERCxjQUFVQyxLQUFWLElBQW1CQSxNQUNkQyxPQURjLENBQ04sSUFETSxFQUNBLEVBREEsRUFFZEEsT0FGYyxDQUVOLE9BRk0sRUFFR0MsS0FBS0EsRUFBRUMsV0FBRixFQUZSLENBQW5CO0FBR0EsV0FBT0osU0FBUDtBQUNILENBTGdCLEVBS2QsRUFMYyxDQUFqQjs7UUFTSUgsVSxHQUFBQSxVO1FBQ0FDLFEsR0FBQUEsUTs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZESjs7QUFJQSxTQUFTakMsSUFBVCxDQUFjd0MsT0FBZCxFQUF1QjNDLE9BQXZCLEVBQWdDO0FBQzVCOzs7Ozs7OztBQVFBLFFBQUksQ0FBQ0EsT0FBTCxFQUFjLE9BQU8sRUFBRTRDLE1BQU0sa0JBQVdDLE1BQW5CLEVBQTJCRixPQUEzQixFQUFQLENBQWQsS0FDSyxJQUFJLENBQUNBLE9BQUwsRUFBYyxPQUFPLEVBQUVDLE1BQU0sa0JBQVdFLE1BQW5CLEVBQVAsQ0FBZCxLQUNBLElBQUlDLFVBQVVKLE9BQVYsRUFBbUIzQyxPQUFuQixDQUFKLEVBQWlDLE9BQU8sRUFBRTRDLE1BQU0sa0JBQVdJLE9BQW5CLEVBQTRCTCxPQUE1QixFQUFQLENBQWpDLEtBQ0EsSUFBSUEsUUFBUW5DLFdBQVosRUFDRCxPQUFPO0FBQ0hvQyxjQUFNLGtCQUFXSyxNQURkO0FBRUh4QyxrQkFBVXlDLGFBQWFQLE9BQWIsRUFBc0IzQyxPQUF0QixDQUZQO0FBR0hXLG9CQUFZd0MsZUFBZVIsT0FBZixFQUF3QjNDLE9BQXhCO0FBSFQsS0FBUDtBQUtQOztBQUVELFNBQVMrQyxTQUFULENBQW1CSixPQUFuQixFQUE0QjNDLE9BQTVCLEVBQXFDO0FBQ2pDLFdBQU8sT0FBTzJDLE9BQVAsS0FBbUIsT0FBTzNDLE9BQTFCLElBQ0gsT0FBTzJDLE9BQVAsS0FBbUIsUUFBbkIsSUFBK0JBLFlBQVkzQyxPQUR4QyxJQUVILE9BQU8yQyxPQUFQLEtBQW1CLFFBQW5CLElBQStCQSxRQUFRbkMsV0FBUixLQUF3QlIsUUFBUVEsV0FGbkU7QUFHSDs7QUFFRCxTQUFTMkMsY0FBVCxDQUF3QlIsT0FBeEIsRUFBaUMzQyxPQUFqQyxFQUEwQztBQUN0QyxVQUFNQyxVQUFXLEVBQWpCO0FBQ0EsVUFBTVUsMEJBQWlCWCxRQUFRVyxVQUF6QixFQUF3Q2dDLFFBQVFoQyxVQUFoRCxDQUFOO0FBQ0E1QixXQUFPa0MsSUFBUCxDQUFZTixVQUFaLEVBQXdCRyxHQUF4QixDQUE0Qk0sWUFBWTtBQUNwQyxjQUFNZ0MsVUFBVVQsUUFBUWhDLFVBQVIsQ0FBbUJTLFFBQW5CLENBQWhCO0FBQ0EsY0FBTWlDLFVBQVVyRCxRQUFRVyxVQUFSLENBQW1CUyxRQUFuQixDQUFoQjtBQUNBLFNBQUNnQyxPQUFELElBQVluRCxRQUFRcUQsSUFBUixDQUFhO0FBQ3JCVixrQkFBTSxrQkFBV1csWUFESTtBQUVyQmpFLG1CQUFPK0QsT0FGYyxFQUVMakM7QUFGSyxTQUFiLENBQVo7QUFJQSxTQUFDLENBQUNpQyxPQUFELElBQVlBLFlBQVlELE9BQXpCLEtBQXFDbkQsUUFBUXFELElBQVIsQ0FBYTtBQUM5Q1Ysa0JBQU0sa0JBQVdZLFNBRDZCO0FBRTlDbEUsbUJBQU84RCxPQUZ1QyxFQUU5QmhDO0FBRjhCLFNBQWIsQ0FBckM7QUFJSCxLQVhEO0FBWUEsV0FBT25CLE9BQVA7QUFDSDs7QUFHRCxTQUFTaUQsWUFBVCxDQUFzQlAsT0FBdEIsRUFBK0IzQyxPQUEvQixFQUF3QztBQUNwQyxXQUFPLENBQUMsR0FBR3lELE1BQU1DLEtBQUtDLEdBQUwsQ0FDYmhCLFFBQVFsQyxRQUFSLENBQWlCbUQsTUFESixFQUViNUQsUUFBUVMsUUFBUixDQUFpQm1ELE1BRkosQ0FBTixFQUdSM0MsSUFIUSxFQUFKLEVBR0lILEdBSEosQ0FHUStDLEtBQUsxRCxLQUFLd0MsUUFBUWxDLFFBQVIsQ0FBaUJvRCxDQUFqQixDQUFMLEVBQTBCN0QsUUFBUVMsUUFBUixDQUFpQm9ELENBQWpCLENBQTFCLENBSGIsQ0FBUDtBQUlIOztRQUlHMUQsSSxHQUFBQSxJOzs7Ozs7Ozs7Ozs7OztBQzFESjs7Ozs7O1FBSUkyRCxVOzs7Ozs7Ozs7Ozs7O0FDSkosTUFBTUMsVUFBVTtBQUNabEIsWUFBUSxRQURJO0FBRVpDLFlBQVEsUUFGSTtBQUdaRSxhQUFTLFNBSEc7QUFJWkMsWUFBUSxRQUpJO0FBS1pPLGVBQVcsV0FMQztBQU1aRCxrQkFBYztBQU5GLENBQWhCOztrQkFVZVEsTzs7Ozs7Ozs7Ozs7Ozs7QUNWZjs7QUFDQTs7QUFDQTs7QUFJQSxTQUFTM0QsS0FBVCxDQUFlNEQsTUFBZixFQUF1Qi9ELE9BQXZCLEVBQWdDZ0UsUUFBTSxDQUF0QyxFQUF5QztBQUNyQyxRQUFJLENBQUNoRSxPQUFMLEVBQWM7QUFDZCxVQUFNSyxLQUFLMEQsT0FBT0UsVUFBUCxDQUFrQkQsS0FBbEIsQ0FBWDtBQUNBLFFBQUksQ0FBQzNELEVBQUwsRUFBUztBQUNULFlBQVFMLFFBQVEyQyxJQUFoQjtBQUNJLGFBQUssa0JBQVdDLE1BQWhCO0FBQXdCO0FBQ3BCLHNCQUFNLEVBQUVGLE9BQUYsS0FBYzFDLE9BQXBCO0FBQ0Esc0JBQU0yQixRQUFRLDBCQUFjZSxPQUFkLENBQWQ7QUFDQSxvQkFBSXNCLFVBQVVELE9BQU9FLFVBQVAsQ0FBa0JOLE1BQWhDLEVBQ0lJLE9BQU9qRSxXQUFQLENBQW1CNkIsS0FBbkIsRUFESixLQUVLb0MsT0FBTy9CLFlBQVAsQ0FBb0JMLEtBQXBCLEVBQTJCdEIsRUFBM0I7QUFDTDtBQUNIO0FBQ0QsYUFBSyxrQkFBV3dDLE1BQWhCO0FBQXdCO0FBQ3BCa0IsdUJBQU9HLFdBQVAsQ0FBbUI3RCxFQUFuQjtBQUNBO0FBQ0g7QUFDRCxhQUFLLGtCQUFXMEMsT0FBaEI7QUFBeUI7QUFDckIsc0JBQU0sRUFBRUwsT0FBRixLQUFjMUMsT0FBcEI7QUFDQSxzQkFBTTJCLFFBQVEsMEJBQWNlLE9BQWQsQ0FBZDtBQUNBcUIsdUJBQU9JLFlBQVAsQ0FBb0J4QyxLQUFwQixFQUEyQnRCLEVBQTNCO0FBQ0E7QUFDSDtBQUNELGFBQUssa0JBQVcyQyxNQUFoQjtBQUF3QjtBQUNwQixzQkFBTSxFQUFFeEMsUUFBRixFQUFZRSxVQUFaLEtBQTJCVixPQUFqQztBQUNBb0UsZ0NBQWdCL0QsRUFBaEIsRUFBb0JLLFVBQXBCO0FBQ0FGLHlCQUFTTSxPQUFULENBQWlCLENBQUN1RCxLQUFELEVBQVFMLEtBQVIsS0FBa0I3RCxNQUFNRSxFQUFOLEVBQVVnRSxLQUFWLEVBQWlCTCxLQUFqQixDQUFuQztBQUNBO0FBQ0g7QUF4Qkw7QUEwQkg7O0FBRUQsU0FBU0ksZUFBVCxDQUF5QkUsT0FBekIsRUFBa0M1RCxVQUFsQyxFQUE4QztBQUMxQ0EsZUFBV0ksT0FBWCxDQUFtQlgsU0FBUztBQUN4QixjQUFNLEVBQUV3QyxJQUFGLEVBQVF4QixRQUFSLEVBQWtCOUIsS0FBbEIsS0FBNEJjLEtBQWxDO0FBQ0EsWUFBSXdDLFNBQVMsa0JBQVdZLFNBQXhCLEVBQ0ksMEJBQWFlLE9BQWIsRUFBc0JuRCxRQUF0QixFQUFnQzlCLEtBQWhDLEVBREosS0FFSyxJQUFJc0QsU0FBUyxrQkFBV1csWUFBeEIsRUFDRCw2QkFBZ0JnQixPQUFoQixFQUF5Qm5ELFFBQXpCLEVBQW1DOUIsS0FBbkM7QUFDUCxLQU5EO0FBT0g7O1FBSUdjLEssR0FBQUEsSzs7Ozs7Ozs7Ozs7Ozs7QUNsREo7Ozs7QUFDQTs7OztBQUNBOzs7O1FBSUlvRSxRO1FBQ0FDLGE7UUFDQUMsSTtRQUFNQyxROzs7Ozs7Ozs7Ozs7Ozs7O0FDUlY7O0lBSXFCSCxRLHFCQUFOLE1BQU1BLFFBQU4sQ0FBZTtBQUMxQjVHLGdCQUFZd0IsR0FBWixFQUFpQlQsY0FBakIsRUFBaUNpRyxjQUFqQyxFQUFpRDtBQUM3QyxZQUFJLE9BQU94RixHQUFQLEtBQWUsUUFBbkIsRUFDSSxNQUFNLElBQUl5RixTQUFKLENBQWMseUJBQWQsQ0FBTjtBQUNKLHlCQUFLekYsR0FBTCxFQUFVLENBQUNDLEdBQUQsRUFBTUMsS0FBTixLQUFnQixxQkFDdEIsSUFEc0IsRUFDaEJELEdBRGdCLEVBQ1hDLEtBRFcsRUFFdEJYLGNBRnNCLEVBR3RCaUcsY0FIc0IsQ0FBMUI7QUFLSDs7QUFUeUIsQyxTQVduQmxHLEksR0FBTyxDQUFDVSxHQUFELEVBQU1ULGNBQU4sRUFBc0JpRyxjQUF0QixLQUF5QztBQUNuRCxXQUFPLElBQUlKLFFBQUosQ0FDSHBGLEdBREcsRUFFSFQsY0FGRyxFQUdIaUcsY0FIRyxDQUFQO0FBS0gsQyxTQUVNRSxRLEdBQVcsTUFBTTtBQUNwQixXQUFRLFlBQUQsU0FBaUIsRUFBeEI7QUFDSCxDO2tCQXJCZ0JOLFE7Ozs7Ozs7Ozs7Ozs7O0FDSnJCOzs7O0FBQ0E7Ozs7OztBQUdBLE1BQU1PLE9BQU8sTUFBTSxDQUFFLENBQXJCOztBQUlBLFNBQVNMLElBQVQsQ0FBY3RGLEdBQWQsRUFBbUI0RixHQUFuQixFQUF3QjtBQUNwQixRQUFJLE9BQU81RixHQUFQLEtBQWUsUUFBbkIsRUFDSSxNQUFNLElBQUl5RixTQUFKLENBQWUsa0RBQWlELE9BQU96RixHQUFJLEVBQTNFLENBQU47QUFDSixRQUFJcUUsTUFBTXdCLE9BQU4sQ0FBYzdGLEdBQWQsQ0FBSixFQUNJLE9BQU9BLElBQUkyQixPQUFKLENBQVksQ0FBQ21FLElBQUQsRUFBT2pCLEtBQVAsS0FBaUJlLElBQUlmLEtBQUosRUFBV2lCLElBQVgsRUFBaUI5RixHQUFqQixDQUE3QixDQUFQLENBREosS0FHSSxPQUFPTCxPQUFPa0MsSUFBUCxDQUFZN0IsR0FBWixFQUFpQjJCLE9BQWpCLENBQXlCMUIsT0FBTzJGLElBQUkzRixHQUFKLEVBQVNELElBQUlDLEdBQUosQ0FBVCxFQUFtQkQsR0FBbkIsQ0FBaEMsQ0FBUDtBQUNQOztBQUVELFNBQVN1RixRQUFULENBQWtCdkYsR0FBbEIsRUFBdUJDLEdBQXZCLEVBQTRCQyxLQUE1QixFQUFtQ1gsaUJBQWVvRyxJQUFsRCxFQUF3REgsaUJBQWVHLElBQXZFLEVBQTZFO0FBQ3pFLFFBQUksT0FBTzNGLEdBQVAsS0FBZSxRQUFuQixFQUNJLE1BQU0sSUFBSXlGLFNBQUosQ0FBZSxzREFBcUQsT0FBT3pGLEdBQUksRUFBL0UsQ0FBTjs7QUFFSixRQUFJcUUsTUFBTXdCLE9BQU4sQ0FBYzNGLEtBQWQsQ0FBSixFQUNJQSxRQUFRLGdCQUFjWixJQUFkLENBQW1CWSxLQUFuQixFQUEwQlgsY0FBMUIsRUFBMENpRyxjQUExQyxDQUFSLENBREosS0FFSyxJQUFJLE9BQU90RixLQUFQLEtBQWlCLFFBQXJCLEVBQ0RBLFFBQVEsaUJBQVNaLElBQVQsQ0FBY1ksS0FBZCxFQUFxQlgsY0FBckIsRUFBcUNpRyxjQUFyQyxDQUFSOztBQUVKN0YsV0FBT0MsY0FBUCxDQUFzQkksR0FBdEIsRUFBMkJDLEdBQTNCLEVBQWdDO0FBQzVCSixvQkFBWSxJQURnQjtBQUU1QkMsc0JBQWMsSUFGYztBQUc1QkMsYUFBSyxNQUFNO0FBQ1B5RiwyQkFBZXhGLEdBQWYsRUFBb0JDLEdBQXBCLEVBQXlCQyxLQUF6QjtBQUNBLG1CQUFPQSxLQUFQO0FBQ0gsU0FOMkI7QUFPNUI2RixhQUFLQyxZQUFZO0FBQ2Isa0JBQU03RixXQUFXSCxJQUFJQyxHQUFKLENBQWpCO0FBQ0FzRixxQkFBU3ZGLEdBQVQsRUFBY0MsR0FBZCxFQUFtQitGLFFBQW5CLEVBQTZCekcsY0FBN0IsRUFBNkNpRyxjQUE3QztBQUNBakcsMkJBQWVTLEdBQWYsRUFBb0JDLEdBQXBCLEVBQXlCK0YsUUFBekIsRUFBbUM3RixRQUFuQztBQUNIO0FBWDJCLEtBQWhDO0FBYUg7O0FBR0QsTUFBTThGLGNBQWMsWUFBVztBQUMzQixRQUFJQyxLQUFLLENBQVQ7QUFDQSxXQUFRLE1BQU1BLElBQWQ7QUFDSCxDQUhtQixFQUFwQjs7UUFPSVosSSxHQUFBQSxJO1FBQ0FDLFEsR0FBQUEsUTtRQUNBVSxXLEdBQUFBLFc7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuREo7O0lBSXFCWixhLHFCQUFOLE1BQU1BLGFBQU4sQ0FBb0I7QUFDL0I3RyxnQkFBWTJILEtBQVosRUFBbUI1RyxjQUFuQixFQUFtQ2lHLGNBQW5DLEVBQW1EO0FBQUE7O0FBQy9DLFNBQUNXLEtBQUQsS0FBV0EsUUFBUSxFQUFuQjtBQUNBLFlBQUksQ0FBQzlCLE1BQU13QixPQUFOLENBQWNNLEtBQWQsQ0FBTCxFQUNJLE1BQU0sSUFBSVYsU0FBSixDQUFjLHdCQUFkLENBQU47QUFDSix5QkFBS1UsS0FBTCxFQUFZLENBQUN0QixLQUFELEVBQVFpQixJQUFSLEtBQWlCLHFCQUN6QixJQUR5QixFQUNuQmpCLEtBRG1CLEVBQ1ppQixJQURZLEVBRXpCdkcsY0FGeUIsRUFFVGlHLGNBRlMsQ0FBN0I7QUFJQSxhQUFLaEIsTUFBTCxHQUFjMkIsTUFBTTNCLE1BQXBCO0FBQ0g7O0FBVjhCLEMsU0FheEJsRixJLEdBQU8sQ0FBQzZHLEtBQUQsRUFBUTVHLGNBQVIsRUFBd0JpRyxjQUF4QixLQUEyQztBQUNyRCxXQUFPLElBQUlILGFBQUosQ0FDSGMsS0FERyxFQUVINUcsY0FGRyxFQUdIaUcsY0FIRyxDQUFQO0FBS0gsQyxTQUNNWSxlLEdBQW1CRCxTQUFTO0FBQy9CLFdBQU9BLE1BQU1FLFNBQU4sQ0FBZ0I3SCxXQUFoQixLQUFnQzZHLGFBQXZDO0FBQ0gsQyxTQUNNaUIsRSxHQUFLLENBQUMsR0FBR0MsSUFBSixLQUFhO0FBQ3JCLFdBQU8sSUFBSWxCLGFBQUosQ0FBa0IsQ0FBQyxHQUFHa0IsSUFBSixDQUFsQixDQUFQO0FBQ0gsQztTQUdEQyxNLEdBQVMsQ0FBQyxHQUFHQyxNQUFKLEtBQWU7QUFDcEIsY0FBTUMsV0FBVyxJQUFJckIsYUFBSixFQUFqQjtBQUNBLFNBQUMsSUFBRCxFQUFPLEdBQUdvQixNQUFWLEVBQWtCOUUsT0FBbEIsQ0FDSXdFLFNBQVNBLE1BQU14RSxPQUFOLENBQWMrRSxTQUFTeEMsSUFBdkIsQ0FEYjtBQUdBLGVBQU93QyxRQUFQO0FBQ0gsSzs7U0FDREMsVSxHQUFhLENBQUMsR0FBR0osSUFBSixLQUFhO0FBQ3RCO0FBQ0EsZUFBT2xCLGNBQWMvRixJQUFkLENBQ0grRSxNQUFNL0UsSUFBTixDQUFXLElBQVgsRUFBaUJxSCxVQUFqQixDQUE0QixHQUFHSixJQUEvQixDQURHLENBQVA7QUFHSCxLOztTQUNESyxPLEdBQVUsYUFBYTtBQUNuQixZQUFJL0IsUUFBUSxDQUFaO0FBQ0EsZUFBTyxLQUFLQSxLQUFMLENBQVAsRUFDSSxNQUFNLENBQUNBLE9BQUQsRUFBVSxLQUFLQSxLQUFMLENBQVYsQ0FBTjtBQUNQLEs7O1NBQ0RnQyxLLEdBQVEsTUFBTSxDQUFFLEM7O1NBQ2hCQyxJLEdBQU8sTUFBTSxDQUFFLEM7O1NBQ2ZoRixNLEdBQVMsTUFBTSxDQUFFLEM7O1NBQ2pCaUYsSSxHQUFPLE1BQU0sQ0FBRSxDOztTQUNmQyxTLEdBQVksTUFBTSxDQUFFLEM7O1NBQ3BCckYsTyxHQUFVLE1BQU0sQ0FBRSxDOztTQUNsQlEsUSxHQUFXLE1BQU0sQ0FBRSxDOztTQUNuQjhFLE8sR0FBVSxNQUFNLENBQUUsQzs7U0FDbEJDLEksR0FBTyxNQUFNLENBQUUsQzs7U0FDZnJGLEksR0FBTyxNQUFNLENBQUUsQzs7U0FDZnNGLFcsR0FBYyxNQUFNLENBQUUsQzs7U0FDdEJ6RixHLEdBQU0sTUFBTSxDQUFFLEM7O1NBQ2QwRixHLEdBQU0sTUFBTSxDQUFFLEM7O1NBQ2RsRCxJLEdBQU9oRSxTQUFTO0FBQ1osNkJBQ0ksSUFESixFQUNVLEtBQUtzRSxNQURmLEVBQ3VCdEUsS0FEdkIsRUFFSVgsY0FGSixFQUVvQmlHLGNBRnBCO0FBSUEsYUFBS2hCLE1BQUw7QUFDQSxlQUFPdEUsS0FBUDtBQUNILEs7O1NBQ0QrQyxNLEdBQVMsTUFBTSxDQUFFLEM7O1NBQ2pCb0UsVyxHQUFjLE1BQU0sQ0FBRSxDOztTQUN0QkMsTyxHQUFVLE1BQU0sQ0FBRSxDOztTQUNsQkMsSyxHQUFRLE1BQU0sQ0FBRSxDOztTQUNoQkMsSyxHQUFRLE1BQU0sQ0FBRSxDOztTQUNoQkMsSSxHQUFPLE1BQU0sQ0FBRSxDOztTQUNmQyxJLEdBQU8sTUFBTSxDQUFFLEM7O1NBQ2ZDLE0sR0FBUyxNQUFNLENBQUUsQzs7U0FDakJDLGMsR0FBaUIsTUFBTSxDQUFFLEM7O1NBQ3pCQyxRLEdBQVcsTUFBTSxDQUFFLEM7O1NBQ25CbkMsUSxHQUFXLE1BQU07QUFDYixlQUFRLHFCQUFSO0FBQ0gsSzs7U0FDRG9DLE8sR0FBVSxNQUFNLENBQUUsQzs7U0FDbEJDLE0sR0FBUyxNQUFNLENBQUUsQzs7a0JBakZBMUMsYTs7Ozs7Ozs7O0FDSnJCOztJQUlNMkMsRyxHQUFOLE1BQU1BLEdBQU4scUJBQXVCO0FBQUE7QUFBQTs7QUFBQSw0Q0FDbkJySixLQURtQixHQUNYO0FBQ0pjLGtCQUFNLEtBREY7QUFFSndJLGlCQUFLLEVBRkQ7QUFHSkMsbUJBQU8sQ0FDSCxZQURHLEVBRUgsUUFGRyxFQUdILE1BSEcsRUFJSCxPQUpHO0FBSEgsU0FEVyxPQVluQnRKLFFBWm1CLEdBWVI7QUFDUHVKLHVCQUFXO0FBQ1AsdUJBQU8sS0FBS3hKLEtBQUwsQ0FBV3NKLEdBQVgsR0FBaUIsQ0FBakIsS0FBdUIsQ0FBOUI7QUFDSDtBQUhNLFNBWlEsT0FrQm5CRyxXQWxCbUIsR0FrQkwsTUFBTTtBQUNoQixpQkFBS3pKLEtBQUwsQ0FBV3NKLEdBQVg7QUFDSCxTQXBCa0I7QUFBQTs7QUFzQm5CMUgsYUFBUztBQUFFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMENBR1ksS0FBSzVCLEtBQUwsQ0FBV2MsSUFIdkI7QUFBQTtBQUFBO0FBQUE7QUFBQSxvQ0FLTSxLQUFLZCxLQUFMLENBQVdzSixHQUxqQixnQkFNVyxLQUFLckosUUFBTCxDQUFjdUosUUFOekI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsc0NBVTJCLEtBQUt4SixLQUFMLENBQVd1SixLQVZ0QztBQUFBO0FBQUE7QUFBQSwrQkFVOENHLElBVjlDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw2QkFZYyxLQUFLRDtBQVpuQjtBQUFBO0FBQUE7QUFBQTtBQWNUO0FBcENpQixDOzs7QUF5Q3ZCLE1BQU1FLE1BQU0sSUFBSU4sR0FBSixFQUFaO0FBQ0FNLElBQUk5SCxRQUFKLENBQWFXLFNBQVNvSCxjQUFULENBQXdCLE1BQXhCLENBQWIsRSIsImZpbGUiOiJleGFtcGxlLmJ1aWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Fzc2V0cy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgM2Q0NTQ4NDYxYjQzNDg3OWYwYTIiLCJcbmltcG9ydCBNdXNlIGZyb20gJy4vY29yZSc7XG5cblxuXG5leHBvcnQge1xuICAgIE11c2Vcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2luZGV4LmpzIiwiXG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBkaWZmLCBwYXRjaCB9IGZyb20gJy4vZG9tJztcbmltcG9ydCB7IE9ic2VydmVyLCBvYnNlcnZlciwgd2FsayB9IGZyb20gJy4vb2JzZXJ2ZXInO1xuXG5cblxuY2xhc3MgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBlbnRyeSA9IG51bGw7XG4gICAgbm9kZSA9IG51bGw7XG4gICAgc3RhdGUgPSB7fTtcbiAgICBjb21wdXRlZCA9IHt9O1xuXG4gICAgLy8gVE9ETzogTGlmZUN5Y2xlXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge307XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7fTtcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKCkge307XG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH07XG4gICAgY29tcG9uZW50V2lsbFVwZGF0ZSgpIHt9O1xuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHt9O1xuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge307XG4gICAgY29tcG9uZW50RGlkQ2F0Y2goKSB7fTtcblxuICAgIC8vIE9ic2VydmVyXG4gICAgaW5pdE9ic2VydmVyKCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gT2JzZXJ2ZXIuZnJvbShcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgfHwge30sXG4gICAgICAgICAgICA6OnRoaXMuc2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKTtcbiAgICB9O1xuICAgIGluaXRDb21wdXRlZCgpIHtcbiAgICAgICAgd2FsayhcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZWQsXG4gICAgICAgICAgICAobmFtZSwgZ2V0dGVyLCBjb21wdXRlZCkgPT4ge1xuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb21wdXRlZCwgbmFtZSwge1xuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBnZXQ6IHRoaXM6OmdldHRlclxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9XG4gICAgc2V0dGVyQ2FsbGJhY2sob2JqLCBrZXksIHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAob2JqICE9PSB0aGlzLnN0YXRlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCT09NISEhJyk7XG4gICAgICAgIHRoaXMuZGlmZkFuZFBhdGNoKCk7XG4gICAgfTtcblxuICAgIC8vIFJlbmRlclxuICAgIGJlZm9yZVJlbmRlcigpIHtcbiAgICAgICAgdGhpcy5pbml0T2JzZXJ2ZXIoKTtcbiAgICAgICAgdGhpcy5pbml0Q29tcHV0ZWQoKTtcbiAgICB9O1xuICAgIHJlbmRlcigpIHt9O1xuICAgIHJlbmRlclRvKGVudHJ5KSB7XG4gICAgICAgIHRoaXMuYmVmb3JlUmVuZGVyKCk7XG4gICAgICAgIHRoaXMubm9kZSA9IHRoaXMucmVuZGVyKCk7XG4gICAgICAgIHRoaXMuZW50cnkgPSBlbnRyeTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5ub2RlKVxuICAgICAgICB0aGlzLmVudHJ5LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQodGhpcy5ub2RlKSlcbiAgICB9O1xuICAgIGRpZmZBbmRQYXRjaCgpIHtcbiAgICAgICAgY29uc3Qgb2xkTm9kZSA9IHRoaXMubm9kZTtcbiAgICAgICAgdGhpcy5ub2RlID0gdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgY29uc3QgcGF0Y2hlcyA9IGRpZmYodGhpcy5ub2RlLCBvbGROb2RlKTtcbiAgICAgICAgY29uc29sZS5sb2cob2xkTm9kZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubm9kZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHBhdGNoZXMpO1xuICAgICAgICBwYXRjaCh0aGlzLmVudHJ5LCBwYXRjaGVzKTtcbiAgICB9O1xufVxuXG5cblxuZXhwb3J0IGRlZmF1bHQgQ29tcG9uZW50O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9pbmRleC5qcyIsIlxuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gJy4vY3JlYXRlJztcbmltcG9ydCB7IGRpZmYgfSBmcm9tICcuL2RpZmYnO1xuaW1wb3J0IHsgcGF0Y2ggfSBmcm9tICcuL3BhdGNoJztcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzJztcblxuXG5leHBvcnQge1xuICAgIGNyZWF0ZUVsZW1lbnQsXG4gICAgZGlmZixcbiAgICBwYXRjaCxcbiAgICB1dGlsc1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vaW5kZXguanMiLCJcbmltcG9ydCB7IHNldEF0dHJpYnV0ZXMgfSBmcm9tICcuLi91dGlscyc7XG5cblxuXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KG5vZGUpIHtcbiAgICAvKlxuICAgIG5vZGU6IFN0cmluZyB8fCB7XG4gICAgICAgIGVsZW1lbnROYW1lOiBTdHJpbmdcbiAgICAgICAgY2hpbGRyZW46IG5vZGVbXVxuICAgICAgICBhdHRyaWJ1dGVzOiBPYmplY3RcbiAgICB9XG4gICAgKi9cbiAgICBpZiAodHlwZW9mIG5vZGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChub2RlLmVsZW1lbnROYW1lKTtcbiAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIC8vIG5vZGUuY2hpbGRyZW4gPSBbXS5jb25jYXQoLi4ubm9kZS5jaGlsZHJlbikuZmlsdGVyKG5vZGUgPT4gISFub2RlKTtcbiAgICAgICAgICAgIGFwcGVuZENoaWxkcmVuKGVsLCBub2RlLmNoaWxkcmVuKTtcbiAgICAgICAgfVxuICAgICAgICBzZXRBdHRyaWJ1dGVzKGVsLCBub2RlLmF0dHJpYnV0ZXMpO1xuICAgICAgICByZXR1cm4gZWw7XG4gICAgfVxuICAgIGVsc2UgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG5vZGUpO1xufVxuXG5cbmZ1bmN0aW9uIGFwcGVuZENoaWxkcmVuKHRhcmdldCwgY2hpbGRyZW4pIHtcbiAgICBjaGlsZHJlbi5tYXAoY3JlYXRlRWxlbWVudClcbiAgICAgICAgLmZvckVhY2goOjp0YXJnZXQuYXBwZW5kQ2hpbGQpXG59XG5cblxuXG5leHBvcnQge1xuICAgIGNyZWF0ZUVsZW1lbnRcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL2NyZWF0ZS9pbmRleC5qcyIsIlxuaW1wb3J0IHsgZXZlbnRUeXBlcywgZXZlbnRNYXAgfSBmcm9tICcuL2V2ZW50cyc7XG5cblxuXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzKHRhcmdldCwgYXR0cmlidXRlcz17fSkge1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpXG4gICAgICAgIC5maWx0ZXIoa2V5ID0+IGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoa2V5KSlcbiAgICAgICAgLmZvckVhY2goYXR0ck5hbWUgPT4gc2V0QXR0cmlidXRlKHRhcmdldCwgYXR0ck5hbWUsIGF0dHJpYnV0ZXNbYXR0ck5hbWVdKSk7XG59XG5cblxuZnVuY3Rpb24gc2V0QXR0cmlidXRlKHRhcmdldCwgYXR0ck5hbWUsIGF0dHJWYWx1ZSkge1xuICAgIGF0dHJOYW1lID09PSAnY2xhc3NOYW1lJyAmJiAoYXR0ck5hbWUgPSAnY2xhc3MnKTtcbiAgICBpZiAoZXZlbnRUeXBlcy5pbmNsdWRlcyhhdHRyTmFtZSkpXG4gICAgICAgIHJldHVybiB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgIGV2ZW50TWFwW2F0dHJOYW1lXSxcbiAgICAgICAgICAgIGF0dHJWYWx1ZVxuICAgICAgICApO1xuICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGF0dHJWYWx1ZSk7XG59XG5cblxuZnVuY3Rpb24gcmVtb3ZlQXR0cmlidXRlKHRhcmdldCwgYXR0ck5hbWUsIG9sZEF0dHJWYWx1ZSkge1xuICAgIGF0dHJOYW1lID09PSAnY2xhc3NOYW1lJyAmJiAoYXR0ck5hbWUgPSAnY2xhc3MnKTtcbiAgICBpZiAoZXZlbnRUeXBlcy5pbmNsdWRlcyhhdHRyTmFtZSkpXG4gICAgICAgIHJldHVybiB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgIGV2ZW50TWFwW2F0dHJOYW1lXSxcbiAgICAgICAgICAgIG9sZEF0dHJWYWx1ZVxuICAgICAgICApO1xuICAgIHRhcmdldC5yZW1vdmVBdHRyaWJ1dGUoYXR0ck5hbWUpO1xufVxuXG5cbmZ1bmN0aW9uIGluc2VydEFmdGVyKG5ld0VsLCB0YXJnZXRFbCkge1xuICAgIGNvbnN0IHBhcmVudEVsID0gdGFyZ2V0RWwucGFyZW50Tm9kZTtcbiAgICBpZiAocGFyZW50RWwubGFzdENoaWxkID09PSB0YXJnZXRFbClcbiAgICAgICAgcmV0dXJuIHBhcmVudEVsLmFwcGVuZENoaWxkKG5ld0VsKTtcbiAgICByZXR1cm4gcGFyZW50RWwuaW5zZXJ0QmVmb3JlKG5ld0VsLHRhcmdldEVsLm5leHRTaWJsaW5nKTtcbn1cblxuXG5leHBvcnQge1xuICAgIHNldEF0dHJpYnV0ZXMsXG4gICAgc2V0QXR0cmlidXRlLFxuICAgIHJlbW92ZUF0dHJpYnV0ZSxcbiAgICBpbnNlcnRBZnRlclxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vdXRpbHMvaW5kZXguanMiLCJcbmNvbnN0IGV2ZW50VHlwZXMgPSBbXG4gICAgLy8gQ2xpcGJvYXJkIEV2ZW50c1xuICAgICdvbkNvcHknLCAnb25DdXQnLCAnb25QYXN0ZScsXG4gICAgLy8gQ29tcG9zaXRpb24gRXZlbnRzXG4gICAgJ29uQ29tcG9zaXRpb25FbmQnLCAnb25Db21wb3NpdGlvblN0YXJ0JywgJ29uQ29tcG9zaXRpb25VcGRhdGUnLFxuICAgIC8vIEtleWJvYXJkIEV2ZW50c1xuICAgICdvbktleURvd24nLCAnb25LZXlQcmVzcycsICdvbktleVVwJyxcbiAgICAvLyBGb2N1cyBFdmVudHNcbiAgICAnb25Gb2N1cycsICdvbkJsdXInLFxuICAgIC8vIEZvcm0gRXZlbnRzXG4gICAgJ29uQ2hhbmdlJywgJ29uSW5wdXQnLCAnb25JbnZhbGlkJywgJ29uU3VibWl0JyxcbiAgICAvLyBNb3VzZSBFdmVudHNcbiAgICAnb25DbGljaycsICdvbkNvbnRleHRNZW51JywgJ29uRG91YmxlQ2xpY2snLFxuICAgICdvbkRyYWcnLCAnb25EcmFnRW5kJywgJ29uRHJhZ0VudGVyJywgJ29uRHJhZ0V4aXQnLFxuICAgICdvbkRyYWdMZWF2ZScsICdvbkRyYWdPdmVyJywgJ29uRHJhZ1N0YXJ0JyxcbiAgICAnb25Ecm9wJywgJ29uTW91c2VEb3duJywgJ29uTW91c2VFbnRlcicsXG4gICAgJ29uTW91c2VMZWF2ZScsICdvbk1vdXNlTW92ZScsICdvbk1vdXNlT3V0JyxcbiAgICAnb25Nb3VzZU92ZXInICwnb25Nb3VzZVVwJyxcbiAgICAvLyBTZWxlY3Rpb24gRXZlbnRzXG4gICAgJ29uU2VsZWN0JyxcbiAgICAvLyBUb3VjaCBFdmVudHNcbiAgICAnb25Ub3VjaENhbmNlbCcsICdvblRvdWNoRW5kJywgJ29uVG91Y2hNb3ZlJywgJ29uVG91Y2hTdGFydCcsXG4gICAgLy8gVUkgRXZlbnRzXG4gICAgJ29uU2Nyb2xsJyxcbiAgICAvLyBXaGVlbCBFdmVudHNcbiAgICAnb25XaGVlbCcsXG4gICAgLy8gTWVkaWEgRXZlbnRzXG4gICAgJ29uQWJvcnQnLCAnb25DYW5QbGF5JywgJ29uQ2FuUGxheVRocm91Z2gnLFxuICAgICdvbkR1cmF0aW9uQ2hhbmdlJywgJ29uRW1wdGllZCcsICdvbkVuY3J5cHRlZG9uRW5kZWQnLFxuICAgICdvbkVycm9yJywgJ29uTG9hZGVkRGF0YScsICdvbkxvYWRlZE1ldGFkYXRhJyxcbiAgICAnb25Mb2FkU3RhcnQnLCAnb25QYXVzZScsICdvblBsYXlvblBsYXlpbmcnLFxuICAgICdvblByb2dyZXNzJywgJ29uUmF0ZUNoYW5nZScsICdvblNlZWtlZCcsXG4gICAgJ29uU2Vla2luZycsICdvblN0YWxsZWQnLCAnb25TdXNwZW5kb25UaW1lVXBkYXRlJyxcbiAgICAnb25Wb2x1bWVDaGFuZ2UnLCAnb25XYWl0aW5nJyxcbiAgICAvLyBJbWFnZSBFdmVudHNcbiAgICAnb25Mb2FkJywgJ29uRXJyb3InLFxuICAgIC8vIEFuaW1hdGlvbiBFdmVudHNcbiAgICAnb25BbmltYXRpb25TdGFydCcsICdvbkFuaW1hdGlvbkVuZCcsICdvbkFuaW1hdGlvbkl0ZXJhdGlvbicsXG4gICAgLy8gVHJhbnNpdGlvbiBFdmVudHNcbiAgICAnb25UcmFuc2l0aW9uRW5kJyxcbiAgICAvLyBPdGhlciBFdmVudHNcbiAgICAnb25Ub2dnbGUnXG5dO1xuXG5cbmNvbnN0IGV2ZW50TWFwID0gZXZlbnRUeXBlcy5yZWR1Y2UoKGV2ZW50c01hcCwgZXZlbnQpID0+IHtcbiAgICBldmVudHNNYXBbZXZlbnRdID0gZXZlbnRcbiAgICAgICAgLnJlcGxhY2UoJ29uJywgJycpXG4gICAgICAgIC5yZXBsYWNlKC9bQS1aXS8sIGUgPT4gZS50b0xvd2VyQ2FzZSgpKTtcbiAgICByZXR1cm4gZXZlbnRzTWFwO1xufSwge30pO1xuXG5cbmV4cG9ydCB7XG4gICAgZXZlbnRUeXBlcyxcbiAgICBldmVudE1hcFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vdXRpbHMvZXZlbnRzLmpzIiwiXG5pbXBvcnQgeyBDaGFuZ2VUeXBlIH0gZnJvbSAnLi4vdHlwZXMvaW5kZXgnO1xuXG5cblxuZnVuY3Rpb24gZGlmZihuZXdOb2RlLCBvbGROb2RlKSB7XG4gICAgLypcbiAgICByZXR1cm4gdHlwZSBQYXRjaCB7XG4gICAgICAgIHR5cGU6IENoYW5nZVR5cGVcbiAgICAgICAgbmV3Tm9kZT86IE5vZGVcbiAgICAgICAgY2hpbGRyZW4/OiBQYXRjaFtdXG4gICAgICAgIGF0dHJpYnV0ZXM/OiBQYXRjaFtdXG4gICAgfVxuICAgICAqL1xuICAgIGlmICghb2xkTm9kZSkgcmV0dXJuIHsgdHlwZTogQ2hhbmdlVHlwZS5DUkVBVEUsIG5ld05vZGUgfTtcbiAgICBlbHNlIGlmICghbmV3Tm9kZSkgcmV0dXJuIHsgdHlwZTogQ2hhbmdlVHlwZS5SRU1PVkUgfTtcbiAgICBlbHNlIGlmIChpc0NoYW5nZWQobmV3Tm9kZSwgb2xkTm9kZSkpIHJldHVybiB7IHR5cGU6IENoYW5nZVR5cGUuUkVQTEFDRSwgbmV3Tm9kZSB9O1xuICAgIGVsc2UgaWYgKG5ld05vZGUuZWxlbWVudE5hbWUpXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlLlVQREFURSxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBkaWZmQ2hpbGRyZW4obmV3Tm9kZSwgb2xkTm9kZSksXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBkaWZmQXR0cmlidXRlcyhuZXdOb2RlLCBvbGROb2RlKVxuICAgICAgICB9O1xufVxuXG5mdW5jdGlvbiBpc0NoYW5nZWQobmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIHJldHVybiB0eXBlb2YgbmV3Tm9kZSAhPT0gdHlwZW9mIG9sZE5vZGUgfHxcbiAgICAgICAgdHlwZW9mIG5ld05vZGUgIT09IFwib2JqZWN0XCIgJiYgbmV3Tm9kZSAhPT0gb2xkTm9kZSB8fFxuICAgICAgICB0eXBlb2YgbmV3Tm9kZSA9PT0gXCJvYmplY3RcIiAmJiBuZXdOb2RlLmVsZW1lbnROYW1lICE9PSBvbGROb2RlLmVsZW1lbnROYW1lO1xufVxuXG5mdW5jdGlvbiBkaWZmQXR0cmlidXRlcyhuZXdOb2RlLCBvbGROb2RlKSB7XG4gICAgY29uc3QgcGF0Y2hlcyAgPSBbXTtcbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gey4uLm9sZE5vZGUuYXR0cmlidXRlcywgLi4ubmV3Tm9kZS5hdHRyaWJ1dGVzfTtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5tYXAoYXR0ck5hbWUgPT4ge1xuICAgICAgICBjb25zdCBuZXdBdHRyID0gbmV3Tm9kZS5hdHRyaWJ1dGVzW2F0dHJOYW1lXTtcbiAgICAgICAgY29uc3Qgb2xkQXR0ciA9IG9sZE5vZGUuYXR0cmlidXRlc1thdHRyTmFtZV07XG4gICAgICAgICFuZXdBdHRyICYmIHBhdGNoZXMucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlLlJFTU9WRV9QUk9QUyxcbiAgICAgICAgICAgIHZhbHVlOiBvbGRBdHRyLCBhdHRyTmFtZVxuICAgICAgICB9KTtcbiAgICAgICAgKCFvbGRBdHRyIHx8IG9sZEF0dHIgIT09IG5ld0F0dHIpICYmIHBhdGNoZXMucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlLlNFVF9QUk9QUyxcbiAgICAgICAgICAgIHZhbHVlOiBuZXdBdHRyLCBhdHRyTmFtZVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gcGF0Y2hlcztcbn1cblxuXG5mdW5jdGlvbiBkaWZmQ2hpbGRyZW4obmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIHJldHVybiBbLi4uQXJyYXkoTWF0aC5tYXgoXG4gICAgICAgIG5ld05vZGUuY2hpbGRyZW4ubGVuZ3RoLFxuICAgICAgICBvbGROb2RlLmNoaWxkcmVuLmxlbmd0aFxuICAgICkpLmtleXMoKV0ubWFwKGkgPT4gZGlmZihuZXdOb2RlLmNoaWxkcmVuW2ldLCBvbGROb2RlLmNoaWxkcmVuW2ldKSk7XG59XG5cblxuZXhwb3J0IHtcbiAgICBkaWZmXG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL2RpZmYvaW5kZXguanMiLCJcbmltcG9ydCBDaGFuZ2VUeXBlIGZyb20gJy4vY2hhbmdlJztcblxuXG5leHBvcnQge1xuICAgIENoYW5nZVR5cGVcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3R5cGVzL2luZGV4LmpzIiwiXG5jb25zdCBDaGFuZ2VkID0ge1xuICAgIENSRUFURTogJ0NSRUFURScsXG4gICAgUkVNT1ZFOiAnUkVNT1ZFJyxcbiAgICBSRVBMQUNFOiAnUkVQTEFDRScsXG4gICAgVVBEQVRFOiAnVVBEQVRFJyxcbiAgICBTRVRfUFJPUFM6ICdTRVQgUFJPUFMnLFxuICAgIFJFTU9WRV9QUk9QUzogJ1JFTU9WRSBQUk9QUydcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgQ2hhbmdlZDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3R5cGVzL2NoYW5nZS5qcyIsIlxuaW1wb3J0IHsgQ2hhbmdlVHlwZSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tICcuLi9jcmVhdGUvaW5kZXgnO1xuaW1wb3J0IHsgc2V0QXR0cmlidXRlLCByZW1vdmVBdHRyaWJ1dGUgfSBmcm9tIFwiLi4vdXRpbHMvaW5kZXhcIjtcblxuXG5cbmZ1bmN0aW9uIHBhdGNoKHBhcmVudCwgcGF0Y2hlcywgaW5kZXg9MCkge1xuICAgIGlmICghcGF0Y2hlcykgcmV0dXJuO1xuICAgIGNvbnN0IGVsID0gcGFyZW50LmNoaWxkTm9kZXNbaW5kZXhdO1xuICAgIGlmICghZWwpIHJldHVybjtcbiAgICBzd2l0Y2ggKHBhdGNoZXMudHlwZSkge1xuICAgICAgICBjYXNlIENoYW5nZVR5cGUuQ1JFQVRFOiB7XG4gICAgICAgICAgICBjb25zdCB7IG5ld05vZGUgfSA9IHBhdGNoZXM7XG4gICAgICAgICAgICBjb25zdCBuZXdFbCA9IGNyZWF0ZUVsZW1lbnQobmV3Tm9kZSk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IHBhcmVudC5jaGlsZE5vZGVzLmxlbmd0aClcbiAgICAgICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQobmV3RWwpO1xuICAgICAgICAgICAgZWxzZSBwYXJlbnQuaW5zZXJ0QmVmb3JlKG5ld0VsLCBlbCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENoYW5nZVR5cGUuUkVNT1ZFOiB7XG4gICAgICAgICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBDaGFuZ2VUeXBlLlJFUExBQ0U6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgbmV3Tm9kZSB9ID0gcGF0Y2hlcztcbiAgICAgICAgICAgIGNvbnN0IG5ld0VsID0gY3JlYXRlRWxlbWVudChuZXdOb2RlKTtcbiAgICAgICAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQobmV3RWwsIGVsKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQ2hhbmdlVHlwZS5VUERBVEU6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgY2hpbGRyZW4sIGF0dHJpYnV0ZXMgfSA9IHBhdGNoZXM7XG4gICAgICAgICAgICBwYXRjaEF0dHJpYnV0ZXMoZWwsIGF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQsIGluZGV4KSA9PiBwYXRjaChlbCwgY2hpbGQsIGluZGV4KSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcGF0Y2hBdHRyaWJ1dGVzKGVsZW1lbnQsIGF0dHJpYnV0ZXMpIHtcbiAgICBhdHRyaWJ1dGVzLmZvckVhY2gocGF0Y2ggPT4ge1xuICAgICAgICBjb25zdCB7IHR5cGUsIGF0dHJOYW1lLCB2YWx1ZSB9ID0gcGF0Y2g7XG4gICAgICAgIGlmICh0eXBlID09PSBDaGFuZ2VUeXBlLlNFVF9QUk9QUylcbiAgICAgICAgICAgIHNldEF0dHJpYnV0ZShlbGVtZW50LCBhdHRyTmFtZSwgdmFsdWUpO1xuICAgICAgICBlbHNlIGlmICh0eXBlID09PSBDaGFuZ2VUeXBlLlJFTU9WRV9QUk9QUylcbiAgICAgICAgICAgIHJlbW92ZUF0dHJpYnV0ZShlbGVtZW50LCBhdHRyTmFtZSwgdmFsdWUpXG4gICAgfSlcbn1cblxuXG5leHBvcnQge1xuICAgIHBhdGNoXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS9wYXRjaC9pbmRleC5qcyIsIlxuaW1wb3J0IE9ic2VydmVyIGZyb20gJy4vb2JqZWN0JztcbmltcG9ydCBPYnNlcnZlckFycmF5IGZyb20gJy4vYXJyYXknO1xuaW1wb3J0IHsgd2Fsaywgb2JzZXJ2ZXIgfSBmcm9tICcuL3V0aWxzJztcblxuXG5leHBvcnQge1xuICAgIE9ic2VydmVyLFxuICAgIE9ic2VydmVyQXJyYXksXG4gICAgd2Fsaywgb2JzZXJ2ZXJcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvb2JzZXJ2ZXIvaW5kZXguanMiLCJcbmltcG9ydCB7IHdhbGssIG9ic2VydmVyIH0gZnJvbSAnLi4vdXRpbHMvaW5kZXgnXG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPYnNlcnZlciB7XG4gICAgY29uc3RydWN0b3Iob2JqLCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUeXBlIFwiT2JqZWN0XCIgcmVxdWlyZWQhJyk7XG4gICAgICAgIHdhbGsob2JqLCAoa2V5LCB2YWx1ZSkgPT4gb2JzZXJ2ZXIoXG4gICAgICAgICAgICB0aGlzLCBrZXksIHZhbHVlLFxuICAgICAgICAgICAgc2V0dGVyQ2FsbGJhY2ssXG4gICAgICAgICAgICBnZXR0ZXJDYWxsYmFja1xuICAgICAgICApKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZnJvbSA9IChvYmosIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFjaykgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmVyKFxuICAgICAgICAgICAgb2JqLFxuICAgICAgICAgICAgc2V0dGVyQ2FsbGJhY2ssXG4gICAgICAgICAgICBnZXR0ZXJDYWxsYmFja1xuICAgICAgICApXG4gICAgfTtcblxuICAgIHN0YXRpYyB0b1N0cmluZyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGBPYnNlcnZlciAke3RoaXN9YFxuICAgIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL29ic2VydmVyL29iamVjdC9pbmRleC5qcyIsIlxuaW1wb3J0IE9ic2VydmVyIGZyb20gJy4uL29iamVjdCc7XG5pbXBvcnQgT2JzZXJ2ZXJBcnJheSBmcm9tICcuLi9hcnJheSc7XG5cblxuY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xuXG5cblxuZnVuY3Rpb24gd2FsayhvYmosIGZ1bikge1xuICAgIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JylcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRnVuY3Rpb24gXCJ3YWxrXCIgcmVxdWlyZSBhbiBcIm9iamVjdFwiIGluc3RlYWQgb2YgJHt0eXBlb2Ygb2JqfWApO1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpXG4gICAgICAgIHJldHVybiBvYmouZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IGZ1bihpbmRleCwgaXRlbSwgb2JqKSk7XG4gICAgZWxzZVxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiBmdW4oa2V5LCBvYmpba2V5XSwgb2JqKSk7XG59XG5cbmZ1bmN0aW9uIG9ic2VydmVyKG9iaiwga2V5LCB2YWx1ZSwgc2V0dGVyQ2FsbGJhY2s9bm9vcCwgZ2V0dGVyQ2FsbGJhY2s9bm9vcCkge1xuICAgIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JylcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRnVuY3Rpb24gXCJvYnNlcnZlclwiIHJlcXVpcmUgYW4gXCJvYmplY3RcIiBpbnN0ZWFkIG9mICR7dHlwZW9mIG9ian1gKTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSlcbiAgICAgICAgdmFsdWUgPSBPYnNlcnZlckFycmF5LmZyb20odmFsdWUsIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFjayk7XG4gICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKVxuICAgICAgICB2YWx1ZSA9IE9ic2VydmVyLmZyb20odmFsdWUsIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFjayk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBnZXQ6ICgpID0+IHtcbiAgICAgICAgICAgIGdldHRlckNhbGxiYWNrKG9iaiwga2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWVcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBuZXdWYWx1ZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvbGRWYWx1ZSA9IG9ialtrZXldO1xuICAgICAgICAgICAgb2JzZXJ2ZXIob2JqLCBrZXksIG5ld1ZhbHVlLCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spO1xuICAgICAgICAgICAgc2V0dGVyQ2FsbGJhY2sob2JqLCBrZXksIG5ld1ZhbHVlLCBvbGRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5cbmNvbnN0IGdldFVuaXF1ZUlEID0gZnVuY3Rpb24oKSB7XG4gICAgbGV0IGlkID0gMDtcbiAgICByZXR1cm4gKCgpID0+IGlkICsrKTtcbn0oKTtcblxuXG5leHBvcnQge1xuICAgIHdhbGssXG4gICAgb2JzZXJ2ZXIsXG4gICAgZ2V0VW5pcXVlSURcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvb2JzZXJ2ZXIvdXRpbHMvaW5kZXguanMiLCJcbmltcG9ydCB7IHdhbGssIG9ic2VydmVyIH0gZnJvbSAnLi4vdXRpbHMvaW5kZXgnO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2JzZXJ2ZXJBcnJheSB7XG4gICAgY29uc3RydWN0b3IoYXJyYXksIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFjaykge1xuICAgICAgICAhYXJyYXkgJiYgKGFycmF5ID0gW10pO1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyYXkpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVHlwZSBcIkFycmF5XCIgcmVxdWlyZWQhJyk7XG4gICAgICAgIHdhbGsoYXJyYXksIChpbmRleCwgaXRlbSkgPT4gb2JzZXJ2ZXIoXG4gICAgICAgICAgICB0aGlzLCBpbmRleCwgaXRlbSxcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFja1xuICAgICAgICApKTtcbiAgICAgICAgdGhpcy5sZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgZnJvbSA9IChhcnJheSwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2ZXJBcnJheShcbiAgICAgICAgICAgIGFycmF5LFxuICAgICAgICAgICAgc2V0dGVyQ2FsbGJhY2ssXG4gICAgICAgICAgICBnZXR0ZXJDYWxsYmFja1xuICAgICAgICApXG4gICAgfTtcbiAgICBzdGF0aWMgaXNPYnNlcnZlckFycmF5ICA9IGFycmF5ID0+IHtcbiAgICAgICAgcmV0dXJuIGFycmF5Ll9fcHJvdG9fXy5jb25zdHJ1Y3RvciA9PT0gT2JzZXJ2ZXJBcnJheTtcbiAgICB9O1xuICAgIHN0YXRpYyBvZiA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2ZXJBcnJheShbLi4uYXJnc10pXG4gICAgfTtcblxuXG4gICAgY29uY2F0ID0gKC4uLmFycmF5cykgPT4ge1xuICAgICAgICBjb25zdCBuZXdBcnJheSA9IG5ldyBPYnNlcnZlckFycmF5KCk7XG4gICAgICAgIFt0aGlzLCAuLi5hcnJheXNdLmZvckVhY2goXG4gICAgICAgICAgICBhcnJheSA9PiBhcnJheS5mb3JFYWNoKG5ld0FycmF5LnB1c2gpXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBuZXdBcnJheTtcbiAgICB9O1xuICAgIGNvcHlXaXRoaW4gPSAoLi4uYXJncykgPT4ge1xuICAgICAgICAvLyBUT0RPXG4gICAgICAgIHJldHVybiBPYnNlcnZlckFycmF5LmZyb20oXG4gICAgICAgICAgICBBcnJheS5mcm9tKHRoaXMpLmNvcHlXaXRoaW4oLi4uYXJncylcbiAgICAgICAgKVxuICAgIH07XG4gICAgZW50cmllcyA9IGZ1bmN0aW9uICooKSB7XG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIHdoaWxlICh0aGlzW2luZGV4XSlcbiAgICAgICAgICAgIHlpZWxkIFtpbmRleCsrLCB0aGlzW2luZGV4XV07XG4gICAgfTtcbiAgICBldmVyeSA9ICgpID0+IHt9O1xuICAgIGZpbGwgPSAoKSA9PiB7fTtcbiAgICBmaWx0ZXIgPSAoKSA9PiB7fTtcbiAgICBmaW5kID0gKCkgPT4ge307XG4gICAgZmluZEluZGV4ID0gKCkgPT4ge307XG4gICAgZm9yRWFjaCA9ICgpID0+IHt9O1xuICAgIGluY2x1ZGVzID0gKCkgPT4ge307XG4gICAgaW5kZXhPZiA9ICgpID0+IHt9O1xuICAgIGpvaW4gPSAoKSA9PiB7fTtcbiAgICBrZXlzID0gKCkgPT4ge307XG4gICAgbGFzdEluZGV4T2YgPSAoKSA9PiB7fTtcbiAgICBtYXAgPSAoKSA9PiB7fTtcbiAgICBwb3AgPSAoKSA9PiB7fTtcbiAgICBwdXNoID0gdmFsdWUgPT4ge1xuICAgICAgICBvYnNlcnZlcihcbiAgICAgICAgICAgIHRoaXMsIHRoaXMubGVuZ3RoLCB2YWx1ZSxcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFja1xuICAgICAgICApO1xuICAgICAgICB0aGlzLmxlbmd0aCArKztcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gICAgcmVkdWNlID0gKCkgPT4ge307XG4gICAgcmVkdWNlUmlnaHQgPSAoKSA9PiB7fTtcbiAgICByZXZlcnNlID0gKCkgPT4ge307XG4gICAgc2hpZnQgPSAoKSA9PiB7fTtcbiAgICBzbGljZSA9ICgpID0+IHt9O1xuICAgIHNvbWUgPSAoKSA9PiB7fTtcbiAgICBzb3J0ID0gKCkgPT4ge307XG4gICAgc3BsaWNlID0gKCkgPT4ge307XG4gICAgdG9Mb2NhbGVTdHJpbmcgPSAoKSA9PiB7fTtcbiAgICB0b1NvdXJjZSA9ICgpID0+IHt9O1xuICAgIHRvU3RyaW5nID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gYE9ic2VydmVyQXJyYXkgWy4uLl1gXG4gICAgfTtcbiAgICB1bnNoaWZ0ID0gKCkgPT4ge307XG4gICAgdmFsdWVzID0gKCkgPT4ge307XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL29ic2VydmVyL2FycmF5L2luZGV4LmpzIiwiXG5pbXBvcnQgeyBNdXNlIH0gZnJvbSAnLi4vaW5kZXgnO1xuXG5cblxuY2xhc3MgQXBwIGV4dGVuZHMgTXVzZSB7XG4gICAgc3RhdGUgPSB7XG4gICAgICAgIG5hbWU6ICdKb2UnLFxuICAgICAgICBhZ2U6IDIyLFxuICAgICAgICBsYW5nczogW1xuICAgICAgICAgICAgJ0phdmFTY3JpcHQnLFxuICAgICAgICAgICAgJ1B5dGhvbicsXG4gICAgICAgICAgICAnUnVzdCcsXG4gICAgICAgICAgICAnU2NhbGEnXG4gICAgICAgIF1cbiAgICB9XG5cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgICAgaXNBZ2VPZGQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5hZ2UgJSAyICE9PSAwXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zdGF0ZS5hZ2UgKys7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkgeyByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGgxPkhlbGxvITwvaDE+XG4gICAgICAgICAgICA8cD5NeSBuYW1lIGlzIHt0aGlzLnN0YXRlLm5hbWV9LjwvcD5cbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIEknbSB7dGhpcy5zdGF0ZS5hZ2V9IHllYXJzIG9sZFxuICAgICAgICAgICAgICAgIDxzcGFuIGlmPXt0aGlzLmNvbXB1dGVkLmlzQWdlT2RkfT5hbmQgaXQncyBhbiBvZGQgbnVtYmVyLjwvc3Bhbj5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDxwPkkgY2FuIHRob3NlIHByb2dyYW1taW5nIGxhbmd1YWdlczo8L3A+XG4gICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgPGxpIGZvcj17KGxhbmcsIGluZGV4KSBpbiB0aGlzLnN0YXRlLmxhbmdzfT57bGFuZ308L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+Q2xpY2sgTWU8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgKX1cbn1cblxuXG5cbmNvbnN0IGFwcCA9IG5ldyBBcHAoKTtcbmFwcC5yZW5kZXJUbyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2V4YW1wbGUvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9