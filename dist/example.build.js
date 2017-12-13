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
    @params node: String || {
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

function createComponentInstance(component) {}

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

var _listItem = __webpack_require__(16);

var _listItem2 = _interopRequireDefault(_listItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let App = class App extends _index.Muse {
    constructor(...args) {
        var _temp;

        return _temp = super(...args), this.state = {
            name: 'Joe',
            age: 22,
            langs: ['JavaScript', 'Python', 'Rust', 'Scala'],
            showHello: true,
            color: ''
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
            events: {},
            children: [this.state.showHello ? {
                elementName: 'h1',
                attributes: {},
                events: {},
                children: ['Hello!']
            } : null, {
                elementName: 'input',
                attributes: {
                    type: 'password',
                    value: this.state.name,
                    onChange: e => this.state.name = e.target.value
                },
                events: {
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
                events: {
                    type: 'checkbox',
                    checked: !!this.state.showHello,
                    onChange: e => this.state.showHello = !!e.target.checked
                },
                children: null
            }, {
                elementName: 'p',
                attributes: {
                    style: { color: this.state.color }
                },
                events: {
                    style: { color: this.state.color }
                },
                children: [this.state.color]
            }, {
                elementName: 'input',
                attributes: {
                    type: 'color',
                    value: this.state.color,
                    onChange: e => this.state.color = e.target.value
                },
                events: {
                    type: 'color',
                    value: this.state.color,
                    onChange: e => this.state.color = e.target.value
                },
                children: null
            }, {
                elementName: 'p',
                attributes: {},
                events: {},
                children: ['My name is ', this.state.name, '.']
            }, {
                elementName: 'p',
                attributes: {},
                events: {},
                children: ['I\'m ', this.state.age, ' years old', this.computed.isAgeOdd ? {
                    elementName: 'span',
                    attributes: {},
                    events: {},
                    children: [' and it\'s an odd number.']
                } : null]
            }, {
                elementName: 'p',
                attributes: {},
                events: {},
                children: ['And I can those programming languages:']
            }, {
                elementName: 'ul',
                attributes: {},
                events: {},
                children: [Array.from(this.state.langs).map((lang => ({
                    elementName: 'ListItem',
                    attributes: {
                        text: lang
                    },
                    events: {
                        text: lang
                    },
                    children: null
                })).bind(this))]
            }, {
                elementName: 'button',
                attributes: {
                    onClick: this.handleClick
                },
                events: {
                    onClick: this.handleClick
                },
                children: ['Click Me']
            }]
        };
    }
};


const app = new App();
app.renderTo(document.getElementById('root'));

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = __webpack_require__(0);

let ListItem = class ListItem extends _index.Muse {
    render() {
        return {
            elementName: 'li',
            attributes: {},
            events: {},
            children: [this.props.text]
        };
    }
};
exports.default = ListItem;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWZhNzdkY2E4NDg0ZTg3MTc1NmIiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9jcmVhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdHlwZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdHlwZXMvY2hhbmdlLmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3R5cGVzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9kaWZmL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3BhdGNoL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvb2JzZXJ2ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci9vYmplY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci91dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL29ic2VydmVyL2FycmF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZXhhbXBsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9leGFtcGxlL2NvbXBvbmVudHMvbGlzdEl0ZW0uanMiXSwibmFtZXMiOlsiTXVzZSIsIkNvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwiZW50cnkiLCJub2RlIiwic3RhdGUiLCJjb21wdXRlZCIsImNvbXBvbmVudFdpbGxNb3VudCIsImNvbXBvbmVudERpZE1vdW50IiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsInNob3VsZENvbXBvbmVudFVwZGF0ZSIsImNvbXBvbmVudFdpbGxVcGRhdGUiLCJjb21wb25lbnREaWRVcGRhdGUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImNvbXBvbmVudERpZENhdGNoIiwiaW5pdE9ic2VydmVyIiwiZnJvbSIsInNldHRlckNhbGxiYWNrIiwiaW5pdENvbXB1dGVkIiwibmFtZSIsImdldHRlciIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsImdldCIsIm9iaiIsImtleSIsInZhbHVlIiwib2xkVmFsdWUiLCJFcnJvciIsImRpZmZBbmRQYXRjaCIsImJlZm9yZVJlbmRlciIsInJlbmRlciIsInJlbmRlclRvIiwiYXBwZW5kQ2hpbGQiLCJvbGROb2RlIiwicGF0Y2hlcyIsImNyZWF0ZUVsZW1lbnQiLCJkaWZmIiwicGF0Y2giLCJ1dGlscyIsImVsIiwiZG9jdW1lbnQiLCJlbGVtZW50TmFtZSIsImNoaWxkcmVuIiwiYXBwZW5kQ2hpbGRyZW4iLCJhdHRyaWJ1dGVzIiwiY3JlYXRlVGV4dE5vZGUiLCJ0YXJnZXQiLCJtYXAiLCJmb3JFYWNoIiwiY3JlYXRlQ29tcG9uZW50SW5zdGFuY2UiLCJjb21wb25lbnQiLCJzZXRBdHRyaWJ1dGVzIiwia2V5cyIsImZpbHRlciIsImhhc093blByb3BlcnR5IiwiYXR0ck5hbWUiLCJzZXRBdHRyaWJ1dGUiLCJhdHRyVmFsdWUiLCJpbmNsdWRlcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVBdHRyaWJ1dGUiLCJvbGRBdHRyVmFsdWUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaW5zZXJ0QWZ0ZXIiLCJuZXdFbCIsInRhcmdldEVsIiwicGFyZW50RWwiLCJwYXJlbnROb2RlIiwibGFzdENoaWxkIiwiaW5zZXJ0QmVmb3JlIiwibmV4dFNpYmxpbmciLCJDaGFuZ2VUeXBlIiwiRXZlbnRUeXBlIiwiRXZlbnRNYXAiLCJDaGFuZ2VkIiwiQ1JFQVRFIiwiUkVNT1ZFIiwiUkVQTEFDRSIsIlVQREFURSIsIlNFVF9QUk9QUyIsIlVQREFURV9QUk9QUyIsIlJFTU9WRV9QUk9QUyIsIkFERF9FVkVOVF9MSVNURU5FUiIsIlVQREFURV9FVkVOVF9MSVNURU5FUiIsIlJFTU9WRV9FVkVOVF9MSVNURU5FUiIsInJlZHVjZSIsImV2ZW50c01hcCIsImV2ZW50IiwicmVwbGFjZSIsImUiLCJ0b0xvd2VyQ2FzZSIsIm5ld05vZGUiLCJ0eXBlIiwiaXNDaGFuZ2VkIiwiZGlmZkNoaWxkcmVuIiwiZGlmZkF0dHJpYnV0ZXMiLCJuZXdBdHRyIiwib2xkQXR0ciIsInVuZGVmaW5lZCIsInB1c2giLCJuZXdDaGlsZCIsIm9sZENoaWxkIiwiQXJyYXkiLCJNYXRoIiwibWF4IiwibGVuZ3RoIiwiaSIsInBhcmVudCIsImluZGV4IiwiY2hpbGROb2RlcyIsInJlbW92ZUNoaWxkIiwicmVwbGFjZUNoaWxkIiwicGF0Y2hBdHRyaWJ1dGVzIiwiY2hpbGQiLCJlbGVtZW50IiwiaXNFdmVudCIsImV2ZW50TmFtZSIsIk9ic2VydmVyIiwiT2JzZXJ2ZXJBcnJheSIsIndhbGsiLCJvYnNlcnZlciIsImdldHRlckNhbGxiYWNrIiwiVHlwZUVycm9yIiwidG9TdHJpbmciLCJub29wIiwiZnVuIiwiaXNBcnJheSIsIml0ZW0iLCJzZXQiLCJuZXdWYWx1ZSIsImdldFVuaXF1ZUlEIiwiaWQiLCJhcnJheSIsImlzT2JzZXJ2ZXJBcnJheSIsIl9fcHJvdG9fXyIsIm9mIiwiYXJncyIsImNvbmNhdCIsImFycmF5cyIsIm5ld0FycmF5IiwiY29weVdpdGhpbiIsImVudHJpZXMiLCJldmVyeSIsImZpbGwiLCJmaW5kIiwiZmluZEluZGV4IiwiaW5kZXhPZiIsImpvaW4iLCJsYXN0SW5kZXhPZiIsInBvcCIsInJlZHVjZVJpZ2h0IiwicmV2ZXJzZSIsInNoaWZ0Iiwic2xpY2UiLCJzb21lIiwic29ydCIsInNwbGljZSIsInRvTG9jYWxlU3RyaW5nIiwidG9Tb3VyY2UiLCJ1bnNoaWZ0IiwidmFsdWVzIiwiZmxhdHRlbk5vZGUiLCJmbGF0dGVuQ2hpbGRyZW4iLCJBcHAiLCJhZ2UiLCJsYW5ncyIsInNob3dIZWxsbyIsImNvbG9yIiwiaXNBZ2VPZGQiLCJoYW5kbGVDbGljayIsImxhbmciLCJhcHAiLCJnZXRFbGVtZW50QnlJZCIsIkxpc3RJdGVtIiwicHJvcHMiLCJ0ZXh0Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNqRUE7Ozs7OztRQUtJQSxJOzs7Ozs7Ozs7Ozs7O0FDTEo7O0FBQ0E7O0FBQ0E7O0lBSU1DLFMsR0FBTixNQUFNQSxTQUFOLENBQWdCO0FBQ1pDLGtCQUFjO0FBQUEsYUFFZEMsS0FGYyxHQUVOLElBRk07QUFBQSxhQUdkQyxJQUhjLEdBR1AsSUFITztBQUFBLGFBSWRDLEtBSmMsR0FJTixFQUpNO0FBQUEsYUFLZEMsUUFMYyxHQUtILEVBTEc7QUFBRTs7QUFPaEI7QUFDQUMseUJBQXFCLENBQUU7QUFDdkJDLHdCQUFvQixDQUFFO0FBQ3RCQyxnQ0FBNEIsQ0FBRTtBQUM5QkMsNEJBQXdCO0FBQ3BCLGVBQU8sSUFBUDtBQUNIO0FBQ0RDLDBCQUFzQixDQUFFO0FBQ3hCQyx5QkFBcUIsQ0FBRTtBQUN2QkMsMkJBQXVCLENBQUU7QUFDekJDLHdCQUFvQixDQUFFOztBQUV0QjtBQUNBQyxtQkFBZTtBQUNYLGFBQUtWLEtBQUwsR0FBYSxtQkFBU1csSUFBVCxD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QUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHNDQW9CbUMsS0FBS3RLLEtBQUwsQ0FBV21LLEtBcEI5QztBQUFBO0FBQUE7QUFBQSw4QkFvQjJESztBQXBCM0Q7QUFBQTtBQUFBLDhCQW9CMkRBO0FBcEIzRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw2QkFzQnlCLEtBQUtEO0FBdEI5QjtBQUFBO0FBQUEsNkJBc0J5QixLQUFLQTtBQXRCOUI7QUFBQTtBQUFBO0FBQUE7QUF5Qkg7QUFsRGtCLEM7OztBQXNEdkIsTUFBTUUsTUFBTSxJQUFJUixHQUFKLEVBQVo7QUFDQVEsSUFBSTVJLFFBQUosQ0FBYVMsU0FBU29JLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBYixFOzs7Ozs7Ozs7Ozs7O0FDNURBOztJQUdNQyxRLEdBQU4sTUFBTUEsUUFBTixxQkFBNEI7QUFDeEIvSSxhQUFTO0FBQ0w7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFDUyxLQUFLZ0osS0FBTCxDQUFXQyxJQURwQjtBQUFBO0FBR0g7QUFMdUIsQztrQkFTYkYsUSIsImZpbGUiOiJleGFtcGxlLmJ1aWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Fzc2V0cy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxNSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMWZhNzdkY2E4NDg0ZTg3MTc1NmIiLCJcbmltcG9ydCBNdXNlIGZyb20gJy4vY29yZSc7XG5cblxuXG5leHBvcnQge1xuICAgIE11c2Vcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2luZGV4LmpzIiwiXG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBkaWZmLCBwYXRjaCB9IGZyb20gJy4vZG9tJztcbmltcG9ydCB7IE9ic2VydmVyLCBvYnNlcnZlciwgd2FsayB9IGZyb20gJy4vb2JzZXJ2ZXInO1xuaW1wb3J0IHsgZmxhdHRlbk5vZGUgfSBmcm9tICcuL3V0aWxzJ1xuXG5cblxuY2xhc3MgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBlbnRyeSA9IG51bGw7XG4gICAgbm9kZSA9IG51bGw7XG4gICAgc3RhdGUgPSB7fTtcbiAgICBjb21wdXRlZCA9IHt9O1xuXG4gICAgLy8gVE9ETzogTGlmZUN5Y2xlXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge307XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7fTtcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKCkge307XG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH07XG4gICAgY29tcG9uZW50V2lsbFVwZGF0ZSgpIHt9O1xuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHt9O1xuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge307XG4gICAgY29tcG9uZW50RGlkQ2F0Y2goKSB7fTtcblxuICAgIC8vIE9ic2VydmVyXG4gICAgaW5pdE9ic2VydmVyKCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gT2JzZXJ2ZXIuZnJvbShcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgfHwge30sXG4gICAgICAgICAgICA6OnRoaXMuc2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKTtcbiAgICB9O1xuICAgIGluaXRDb21wdXRlZCgpIHtcbiAgICAgICAgd2FsayhcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZWQsXG4gICAgICAgICAgICAobmFtZSwgZ2V0dGVyLCBjb21wdXRlZCkgPT4ge1xuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb21wdXRlZCwgbmFtZSwge1xuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBnZXQ6IHRoaXM6OmdldHRlclxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9XG4gICAgc2V0dGVyQ2FsbGJhY2sob2JqLCBrZXksIHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAob2JqICE9PSB0aGlzLnN0YXRlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCT09NISEhJyk7XG4gICAgICAgIHRoaXMuZGlmZkFuZFBhdGNoKCk7XG4gICAgfTtcblxuICAgIC8vIFJlbmRlclxuICAgIGJlZm9yZVJlbmRlcigpIHtcbiAgICAgICAgdGhpcy5pbml0T2JzZXJ2ZXIoKTtcbiAgICAgICAgdGhpcy5pbml0Q29tcHV0ZWQoKTtcbiAgICB9O1xuICAgIHJlbmRlcigpIHt9O1xuICAgIHJlbmRlclRvKGVudHJ5KSB7XG4gICAgICAgIHRoaXMuYmVmb3JlUmVuZGVyKCk7XG4gICAgICAgIHRoaXMubm9kZSA9IGZsYXR0ZW5Ob2RlKHRoaXMucmVuZGVyKCkpO1xuICAgICAgICB0aGlzLmVudHJ5ID0gZW50cnk7XG4gICAgICAgIHRoaXMuZW50cnkuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudCh0aGlzLm5vZGUpKVxuICAgIH07XG4gICAgZGlmZkFuZFBhdGNoKCkge1xuICAgICAgICBjb25zdCBvbGROb2RlID0gdGhpcy5ub2RlO1xuICAgICAgICB0aGlzLm5vZGUgPSBmbGF0dGVuTm9kZSh0aGlzLnJlbmRlcigpKTtcbiAgICAgICAgY29uc3QgcGF0Y2hlcyA9IGRpZmYodGhpcy5ub2RlLCBvbGROb2RlKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cob2xkTm9kZSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMubm9kZSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHBhdGNoZXMpO1xuICAgICAgICBwYXRjaCh0aGlzLmVudHJ5LCBwYXRjaGVzKTtcbiAgICB9O1xufVxuXG5cblxuZXhwb3J0IGRlZmF1bHQgQ29tcG9uZW50O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9pbmRleC5qcyIsIlxuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gJy4vY3JlYXRlJztcbmltcG9ydCB7IGRpZmYgfSBmcm9tICcuL2RpZmYnO1xuaW1wb3J0IHsgcGF0Y2ggfSBmcm9tICcuL3BhdGNoJztcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzJztcblxuXG5leHBvcnQge1xuICAgIGNyZWF0ZUVsZW1lbnQsXG4gICAgZGlmZixcbiAgICBwYXRjaCxcbiAgICB1dGlsc1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vaW5kZXguanMiLCJcbmltcG9ydCB7IHNldEF0dHJpYnV0ZXMgfSBmcm9tICcuLi91dGlscyc7XG5cblxuXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KG5vZGUpIHtcbiAgICAvKlxuICAgIEBwYXJhbXMgbm9kZTogU3RyaW5nIHx8IHtcbiAgICAgICAgZWxlbWVudE5hbWU6IFN0cmluZ1xuICAgICAgICBjaGlsZHJlbjogbm9kZVtdXG4gICAgICAgIGF0dHJpYnV0ZXM6IE9iamVjdFxuICAgIH1cbiAgICAqL1xuICAgIGlmICh0eXBlb2Ygbm9kZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5vZGUuZWxlbWVudE5hbWUpO1xuICAgICAgICBub2RlLmNoaWxkcmVuICYmIGFwcGVuZENoaWxkcmVuKGVsLCBub2RlLmNoaWxkcmVuKTtcbiAgICAgICAgc2V0QXR0cmlidXRlcyhlbCwgbm9kZS5hdHRyaWJ1dGVzKTtcbiAgICAgICAgcmV0dXJuIGVsO1xuICAgIH1cbiAgICBlbHNlIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShub2RlKTtcbn1cblxuXG5mdW5jdGlvbiBhcHBlbmRDaGlsZHJlbih0YXJnZXQsIGNoaWxkcmVuKSB7XG4gICAgY2hpbGRyZW4ubWFwKGNyZWF0ZUVsZW1lbnQpXG4gICAgICAgIC5mb3JFYWNoKDo6dGFyZ2V0LmFwcGVuZENoaWxkKVxufVxuXG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbXBvbmVudEluc3RhbmNlKGNvbXBvbmVudCkge1xuXG59XG5cblxuZXhwb3J0IHtcbiAgICBjcmVhdGVFbGVtZW50XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS9jcmVhdGUvaW5kZXguanMiLCJcbmltcG9ydCB7IEV2ZW50VHlwZSwgRXZlbnRNYXAgfSBmcm9tICcuLi90eXBlcyc7XG5cblxuXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzKHRhcmdldCwgYXR0cmlidXRlcz17fSkge1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpXG4gICAgICAgIC5maWx0ZXIoa2V5ID0+IGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoa2V5KSlcbiAgICAgICAgLmZvckVhY2goYXR0ck5hbWUgPT4gc2V0QXR0cmlidXRlKHRhcmdldCwgYXR0ck5hbWUsIGF0dHJpYnV0ZXNbYXR0ck5hbWVdKSk7XG59XG5cblxuZnVuY3Rpb24gc2V0QXR0cmlidXRlKHRhcmdldCwgYXR0ck5hbWUsIGF0dHJWYWx1ZSkge1xuICAgIGF0dHJOYW1lID09PSAnY2xhc3NOYW1lJyAmJiAoYXR0ck5hbWUgPSAnY2xhc3MnKTtcbiAgICBpZiAoRXZlbnRUeXBlLmluY2x1ZGVzKGF0dHJOYW1lKSlcbiAgICAgICAgcmV0dXJuIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgRXZlbnRNYXBbYXR0ck5hbWVdLFxuICAgICAgICAgICAgYXR0clZhbHVlXG4gICAgICAgICk7XG4gICAgaWYgKGF0dHJOYW1lID09PSAnY2hlY2tlZCcpXG4gICAgICAgIHJldHVybiB0YXJnZXRbYXR0ck5hbWVdID0gYXR0clZhbHVlO1xuICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGF0dHJWYWx1ZSk7XG59XG5cblxuZnVuY3Rpb24gcmVtb3ZlQXR0cmlidXRlKHRhcmdldCwgYXR0ck5hbWUsIG9sZEF0dHJWYWx1ZSkge1xuICAgIGF0dHJOYW1lID09PSAnY2xhc3NOYW1lJyAmJiAoYXR0ck5hbWUgPSAnY2xhc3MnKTtcbiAgICBpZiAoRXZlbnRUeXBlLmluY2x1ZGVzKGF0dHJOYW1lKSlcbiAgICAgICAgcmV0dXJuIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgRXZlbnRNYXBbYXR0ck5hbWVdLFxuICAgICAgICAgICAgb2xkQXR0clZhbHVlXG4gICAgICAgICk7XG4gICAgdGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZShhdHRyTmFtZSk7XG59XG5cblxuZnVuY3Rpb24gaW5zZXJ0QWZ0ZXIobmV3RWwsIHRhcmdldEVsKSB7XG4gICAgY29uc3QgcGFyZW50RWwgPSB0YXJnZXRFbC5wYXJlbnROb2RlO1xuICAgIGlmIChwYXJlbnRFbC5sYXN0Q2hpbGQgPT09IHRhcmdldEVsKVxuICAgICAgICByZXR1cm4gcGFyZW50RWwuYXBwZW5kQ2hpbGQobmV3RWwpO1xuICAgIHJldHVybiBwYXJlbnRFbC5pbnNlcnRCZWZvcmUobmV3RWwsdGFyZ2V0RWwubmV4dFNpYmxpbmcpO1xufVxuXG5cbmV4cG9ydCB7XG4gICAgc2V0QXR0cmlidXRlcyxcbiAgICBzZXRBdHRyaWJ1dGUsXG4gICAgcmVtb3ZlQXR0cmlidXRlLFxuICAgIGluc2VydEFmdGVyXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS91dGlscy9pbmRleC5qcyIsIlxuaW1wb3J0IENoYW5nZVR5cGUgZnJvbSAnLi9jaGFuZ2UnO1xuaW1wb3J0IHsgRXZlbnRUeXBlLCBFdmVudE1hcCB9IGZyb20gJy4vZXZlbnRzJztcblxuZXhwb3J0IHtcbiAgICBDaGFuZ2VUeXBlLFxuICAgIEV2ZW50VHlwZSxcbiAgICBFdmVudE1hcFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vdHlwZXMvaW5kZXguanMiLCJcbmNvbnN0IENoYW5nZWQgPSB7XG4gICAgQ1JFQVRFOiAnQ1JFQVRFJyxcbiAgICBSRU1PVkU6ICdSRU1PVkUnLFxuICAgIFJFUExBQ0U6ICdSRVBMQUNFJyxcbiAgICBVUERBVEU6ICdVUERBVEUnLFxuXG4gICAgU0VUX1BST1BTOiAnU0VUIFBST1BTJyxcbiAgICBVUERBVEVfUFJPUFM6ICdVUERBVEUgUFJPUFMnLFxuICAgIFJFTU9WRV9QUk9QUzogJ1JFTU9WRSBQUk9QUycsXG5cbiAgICAvLyBUT0RPXG4gICAgQUREX0VWRU5UX0xJU1RFTkVSOiAnQUREIEVWRU5UIExJU1RFTkVSJyxcbiAgICBVUERBVEVfRVZFTlRfTElTVEVORVI6ICdVUERBVEUgRVZFTlQgTElTVEVORVInLFxuICAgIFJFTU9WRV9FVkVOVF9MSVNURU5FUjogJ1JFTU9WRSBFVkVOVCBMSVNURU5FUicsXG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IENoYW5nZWQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS90eXBlcy9jaGFuZ2UuanMiLCJcbmNvbnN0IEV2ZW50VHlwZSA9IFtcbiAgICAvLyBDbGlwYm9hcmQgRXZlbnRzXG4gICAgJ29uQ29weScsICdvbkN1dCcsICdvblBhc3RlJyxcbiAgICAvLyBDb21wb3NpdGlvbiBFdmVudHNcbiAgICAnb25Db21wb3NpdGlvbkVuZCcsICdvbkNvbXBvc2l0aW9uU3RhcnQnLCAnb25Db21wb3NpdGlvblVwZGF0ZScsXG4gICAgLy8gS2V5Ym9hcmQgRXZlbnRzXG4gICAgJ29uS2V5RG93bicsICdvbktleVByZXNzJywgJ29uS2V5VXAnLFxuICAgIC8vIEZvY3VzIEV2ZW50c1xuICAgICdvbkZvY3VzJywgJ29uQmx1cicsXG4gICAgLy8gRm9ybSBFdmVudHNcbiAgICAnb25DaGFuZ2UnLCAnb25JbnB1dCcsICdvbkludmFsaWQnLCAnb25TdWJtaXQnLFxuICAgIC8vIE1vdXNlIEV2ZW50c1xuICAgICdvbkNsaWNrJywgJ29uQ29udGV4dE1lbnUnLCAnb25Eb3VibGVDbGljaycsXG4gICAgJ29uRHJhZycsICdvbkRyYWdFbmQnLCAnb25EcmFnRW50ZXInLCAnb25EcmFnRXhpdCcsXG4gICAgJ29uRHJhZ0xlYXZlJywgJ29uRHJhZ092ZXInLCAnb25EcmFnU3RhcnQnLFxuICAgICdvbkRyb3AnLCAnb25Nb3VzZURvd24nLCAnb25Nb3VzZUVudGVyJyxcbiAgICAnb25Nb3VzZUxlYXZlJywgJ29uTW91c2VNb3ZlJywgJ29uTW91c2VPdXQnLFxuICAgICdvbk1vdXNlT3ZlcicgLCdvbk1vdXNlVXAnLFxuICAgIC8vIFNlbGVjdGlvbiBFdmVudHNcbiAgICAnb25TZWxlY3QnLFxuICAgIC8vIFRvdWNoIEV2ZW50c1xuICAgICdvblRvdWNoQ2FuY2VsJywgJ29uVG91Y2hFbmQnLCAnb25Ub3VjaE1vdmUnLCAnb25Ub3VjaFN0YXJ0JyxcbiAgICAvLyBVSSBFdmVudHNcbiAgICAnb25TY3JvbGwnLFxuICAgIC8vIFdoZWVsIEV2ZW50c1xuICAgICdvbldoZWVsJyxcbiAgICAvLyBNZWRpYSBFdmVudHNcbiAgICAnb25BYm9ydCcsICdvbkNhblBsYXknLCAnb25DYW5QbGF5VGhyb3VnaCcsXG4gICAgJ29uRHVyYXRpb25DaGFuZ2UnLCAnb25FbXB0aWVkJywgJ29uRW5jcnlwdGVkb25FbmRlZCcsXG4gICAgJ29uRXJyb3InLCAnb25Mb2FkZWREYXRhJywgJ29uTG9hZGVkTWV0YWRhdGEnLFxuICAgICdvbkxvYWRTdGFydCcsICdvblBhdXNlJywgJ29uUGxheW9uUGxheWluZycsXG4gICAgJ29uUHJvZ3Jlc3MnLCAnb25SYXRlQ2hhbmdlJywgJ29uU2Vla2VkJyxcbiAgICAnb25TZWVraW5nJywgJ29uU3RhbGxlZCcsICdvblN1c3BlbmRvblRpbWVVcGRhdGUnLFxuICAgICdvblZvbHVtZUNoYW5nZScsICdvbldhaXRpbmcnLFxuICAgIC8vIEltYWdlIEV2ZW50c1xuICAgICdvbkxvYWQnLCAnb25FcnJvcicsXG4gICAgLy8gQW5pbWF0aW9uIEV2ZW50c1xuICAgICdvbkFuaW1hdGlvblN0YXJ0JywgJ29uQW5pbWF0aW9uRW5kJywgJ29uQW5pbWF0aW9uSXRlcmF0aW9uJyxcbiAgICAvLyBUcmFuc2l0aW9uIEV2ZW50c1xuICAgICdvblRyYW5zaXRpb25FbmQnLFxuICAgIC8vIE90aGVyIEV2ZW50c1xuICAgICdvblRvZ2dsZSdcbl07XG5cblxuY29uc3QgRXZlbnRNYXAgPSBFdmVudFR5cGUucmVkdWNlKChldmVudHNNYXAsIGV2ZW50KSA9PiB7XG4gICAgZXZlbnRzTWFwW2V2ZW50XSA9IGV2ZW50XG4gICAgICAgIC5yZXBsYWNlKCdvbicsICcnKVxuICAgICAgICAucmVwbGFjZSgvW0EtWl0vZywgZSA9PiBlLnRvTG93ZXJDYXNlKCkpO1xuICAgIHJldHVybiBldmVudHNNYXA7XG59LCB7fSk7XG5cblxuZXhwb3J0IHtcbiAgICBFdmVudFR5cGUsXG4gICAgRXZlbnRNYXBcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3R5cGVzL2V2ZW50cy5qcyIsIlxuaW1wb3J0IHsgQ2hhbmdlVHlwZSwgRXZlbnRUeXBlIH0gZnJvbSAnLi4vdHlwZXMvaW5kZXgnO1xuXG5cblxuZnVuY3Rpb24gZGlmZihuZXdOb2RlLCBvbGROb2RlKSB7XG4gICAgLypcbiAgICByZXR1cm4gdHlwZSBQYXRjaCB7XG4gICAgICAgIHR5cGU6IENoYW5nZVR5cGVcbiAgICAgICAgbmV3Tm9kZT86IE5vZGVcbiAgICAgICAgY2hpbGRyZW4/OiBQYXRjaFtdXG4gICAgICAgIGF0dHJpYnV0ZXM/OiBQYXRjaFtdXG4gICAgfVxuICAgICAqL1xuICAgIGlmICghb2xkTm9kZSkgcmV0dXJuIHsgdHlwZTogQ2hhbmdlVHlwZS5DUkVBVEUsIG5ld05vZGUgfTtcbiAgICBlbHNlIGlmICghbmV3Tm9kZSkgcmV0dXJuIHsgdHlwZTogQ2hhbmdlVHlwZS5SRU1PVkUgfTtcbiAgICBlbHNlIGlmIChpc0NoYW5nZWQobmV3Tm9kZSwgb2xkTm9kZSkpIHJldHVybiB7IHR5cGU6IENoYW5nZVR5cGUuUkVQTEFDRSwgbmV3Tm9kZSB9O1xuICAgIGVsc2UgaWYgKG5ld05vZGUuZWxlbWVudE5hbWUpXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlLlVQREFURSxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBkaWZmQ2hpbGRyZW4obmV3Tm9kZSwgb2xkTm9kZSksXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBkaWZmQXR0cmlidXRlcyhuZXdOb2RlLCBvbGROb2RlKSxcbiAgICAgICAgfTtcbn1cblxuZnVuY3Rpb24gaXNDaGFuZ2VkKG5ld05vZGUsIG9sZE5vZGUpIHtcbiAgICByZXR1cm4gdHlwZW9mIG5ld05vZGUgIT09IHR5cGVvZiBvbGROb2RlIHx8XG4gICAgICAgIHR5cGVvZiBuZXdOb2RlICE9PSBcIm9iamVjdFwiICYmIG5ld05vZGUgIT09IG9sZE5vZGUgfHxcbiAgICAgICAgdHlwZW9mIG5ld05vZGUgPT09IFwib2JqZWN0XCIgJiYgbmV3Tm9kZS5lbGVtZW50TmFtZSAhPT0gb2xkTm9kZS5lbGVtZW50TmFtZVxufVxuXG5cbmZ1bmN0aW9uIGRpZmZBdHRyaWJ1dGVzKG5ld05vZGUsIG9sZE5vZGUpIHtcbiAgICBjb25zdCBwYXRjaGVzICA9IFtdO1xuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSB7Li4ub2xkTm9kZS5hdHRyaWJ1dGVzLCAuLi5uZXdOb2RlLmF0dHJpYnV0ZXN9O1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpXG4gICAgICAgIC5mb3JFYWNoKGF0dHJOYW1lID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0F0dHIgPSBuZXdOb2RlLmF0dHJpYnV0ZXNbYXR0ck5hbWVdO1xuICAgICAgICAgICAgY29uc3Qgb2xkQXR0ciA9IG9sZE5vZGUuYXR0cmlidXRlc1thdHRyTmFtZV07XG4gICAgICAgICAgICBpZiAobmV3QXR0ciA9PT0gdW5kZWZpbmVkICYmIG9sZEF0dHIgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICByZXR1cm4gcGF0Y2hlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogQ2hhbmdlVHlwZS5SRU1PVkVfUFJPUFMsXG4gICAgICAgICAgICAgICAgICAgIG9sZFZhbHVlOiBvbGRBdHRyLCBhdHRyTmFtZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKG9sZEF0dHIgPT09IHVuZGVmaW5lZCAmJiBuZXdBdHRyICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhdGNoZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IENoYW5nZVR5cGUuU0VUX1BST1BTLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbmV3QXR0ciwgYXR0ck5hbWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChuZXdBdHRyICE9PSB1bmRlZmluZWQgJiYgb2xkQXR0ciAhPT0gdW5kZWZpbmVkICYmIG9sZEF0dHIgIT09IG5ld0F0dHIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhdGNoZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IENoYW5nZVR5cGUuVVBEQVRFX1BST1BTLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbmV3QXR0ciwgb2xkVmFsdWU6IG9sZEF0dHIsIGF0dHJOYW1lXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIHJldHVybiBwYXRjaGVzO1xufVxuXG5cbmZ1bmN0aW9uIGRpZmZDaGlsZHJlbihuZXdOb2RlLCBvbGROb2RlKSB7XG4gICAgY29uc3QgbmV3Q2hpbGQgPSBuZXdOb2RlLmNoaWxkcmVuIHx8IFtdO1xuICAgIGNvbnN0IG9sZENoaWxkID0gb2xkTm9kZS5jaGlsZHJlbiB8fCBbXTtcbiAgICByZXR1cm4gWy4uLkFycmF5KE1hdGgubWF4KFxuICAgICAgICBuZXdDaGlsZC5sZW5ndGgsIG9sZENoaWxkLmxlbmd0aFxuICAgICkpLmtleXMoKV0ubWFwKGkgPT4gZGlmZihuZXdDaGlsZFtpXSwgb2xkQ2hpbGRbaV0pKTtcbn1cblxuXG5leHBvcnQge1xuICAgIGRpZmZcbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vZGlmZi9pbmRleC5qcyIsIlxuaW1wb3J0IHsgQ2hhbmdlVHlwZSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tICcuLi9jcmVhdGUvaW5kZXgnO1xuaW1wb3J0IHsgc2V0QXR0cmlidXRlLCByZW1vdmVBdHRyaWJ1dGUgfSBmcm9tIFwiLi4vdXRpbHMvaW5kZXhcIjtcbmltcG9ydCB7RXZlbnRNYXAsIEV2ZW50VHlwZX0gZnJvbSBcIi4uL3R5cGVzL2V2ZW50c1wiO1xuXG5cblxuZnVuY3Rpb24gcGF0Y2gocGFyZW50LCBwYXRjaGVzLCBpbmRleD0wKSB7XG4gICAgaWYgKCFwYXRjaGVzKSByZXR1cm47XG4gICAgY29uc3QgZWwgPSBwYXJlbnQuY2hpbGROb2Rlc1tpbmRleF07XG4gICAgc3dpdGNoIChwYXRjaGVzLnR5cGUpIHtcbiAgICAgICAgY2FzZSBDaGFuZ2VUeXBlLkNSRUFURToge1xuICAgICAgICAgICAgY29uc3QgeyBuZXdOb2RlIH0gPSBwYXRjaGVzO1xuICAgICAgICAgICAgY29uc3QgbmV3RWwgPSBjcmVhdGVFbGVtZW50KG5ld05vZGUpO1xuICAgICAgICAgICAgaWYgKGluZGV4ID09PSBwYXJlbnQuY2hpbGROb2Rlcy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKG5ld0VsKTtcbiAgICAgICAgICAgIGVsc2UgcGFyZW50Lmluc2VydEJlZm9yZShuZXdFbCwgZWwpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBDaGFuZ2VUeXBlLlJFTU9WRToge1xuICAgICAgICAgICAgaWYgKCFlbCkgcmV0dXJuO1xuICAgICAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQ2hhbmdlVHlwZS5SRVBMQUNFOiB7XG4gICAgICAgICAgICBjb25zdCB7IG5ld05vZGUgfSA9IHBhdGNoZXM7XG4gICAgICAgICAgICBjb25zdCBuZXdFbCA9IGNyZWF0ZUVsZW1lbnQobmV3Tm9kZSk7XG4gICAgICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKG5ld0VsLCBlbCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENoYW5nZVR5cGUuVVBEQVRFOiB7XG4gICAgICAgICAgICBjb25zdCB7IGNoaWxkcmVuLCBhdHRyaWJ1dGVzIH0gPSBwYXRjaGVzO1xuICAgICAgICAgICAgcGF0Y2hBdHRyaWJ1dGVzKGVsLCBhdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goKGNoaWxkLCBpbmRleCkgPT4gcGF0Y2goZWwsIGNoaWxkLCBpbmRleCkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZnVuY3Rpb24gcGF0Y2hBdHRyaWJ1dGVzKGVsZW1lbnQsIGF0dHJpYnV0ZXMpIHtcbiAgICBhdHRyaWJ1dGVzLmZvckVhY2gocGF0Y2ggPT4ge1xuICAgICAgICBjb25zdCB7IHR5cGUsIGF0dHJOYW1lLCB2YWx1ZSwgb2xkVmFsdWUgfSA9IHBhdGNoO1xuICAgICAgICBjb25zdCBpc0V2ZW50ID0gRXZlbnRUeXBlLmluY2x1ZGVzKGF0dHJOYW1lKTtcbiAgICAgICAgY29uc3QgZXZlbnROYW1lID0gaXNFdmVudCAmJiBFdmVudE1hcFthdHRyTmFtZV07XG5cbiAgICAgICAgLy8gIWlzRXZlbnQgJiYgY29uc29sZS5sb2codHlwZSwgYXR0ck5hbWUsIHZhbHVlLCBvbGRWYWx1ZSk7XG4gICAgICAgIGlmICh0eXBlID09PSBDaGFuZ2VUeXBlLlNFVF9QUk9QUylcbiAgICAgICAgICAgIHJldHVybiBpc0V2ZW50ID9cbiAgICAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCB2YWx1ZSkgOlxuICAgICAgICAgICAgICAgIHNldEF0dHJpYnV0ZShlbGVtZW50LCBhdHRyTmFtZSwgdmFsdWUpO1xuICAgICAgICBpZiAodHlwZSA9PT0gQ2hhbmdlVHlwZS5SRU1PVkVfUFJPUFMpXG4gICAgICAgICAgICByZXR1cm4gaXNFdmVudCA/XG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgb2xkVmFsdWUpIDpcbiAgICAgICAgICAgICAgICByZW1vdmVBdHRyaWJ1dGUoZWxlbWVudCwgYXR0ck5hbWUsIHZhbHVlKTtcbiAgICAgICAgaWYgKHR5cGUgPT09IENoYW5nZVR5cGUuVVBEQVRFX1BST1BTKSB7XG4gICAgICAgICAgICBpZiAoaXNFdmVudCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIG9sZFZhbHVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0QXR0cmlidXRlKGVsZW1lbnQsIGF0dHJOYW1lLCB2YWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICB9XG4gICAgfSlcbn1cblxuXG5leHBvcnQge1xuICAgIHBhdGNoXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS9wYXRjaC9pbmRleC5qcyIsIlxuaW1wb3J0IE9ic2VydmVyIGZyb20gJy4vb2JqZWN0JztcbmltcG9ydCBPYnNlcnZlckFycmF5IGZyb20gJy4vYXJyYXknO1xuaW1wb3J0IHsgd2Fsaywgb2JzZXJ2ZXIgfSBmcm9tICcuL3V0aWxzJztcblxuXG5leHBvcnQge1xuICAgIE9ic2VydmVyLFxuICAgIE9ic2VydmVyQXJyYXksXG4gICAgd2Fsaywgb2JzZXJ2ZXJcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvb2JzZXJ2ZXIvaW5kZXguanMiLCJcbmltcG9ydCB7IHdhbGssIG9ic2VydmVyIH0gZnJvbSAnLi4vdXRpbHMvaW5kZXgnXG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPYnNlcnZlciB7XG4gICAgY29uc3RydWN0b3Iob2JqLCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUeXBlIFwiT2JqZWN0XCIgcmVxdWlyZWQhJyk7XG4gICAgICAgIHdhbGsob2JqLCAoa2V5LCB2YWx1ZSkgPT4gb2JzZXJ2ZXIoXG4gICAgICAgICAgICB0aGlzLCBrZXksIHZhbHVlLFxuICAgICAgICAgICAgc2V0dGVyQ2FsbGJhY2ssXG4gICAgICAgICAgICBnZXR0ZXJDYWxsYmFja1xuICAgICAgICApKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZnJvbSA9IChvYmosIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFjaykgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmVyKFxuICAgICAgICAgICAgb2JqLFxuICAgICAgICAgICAgc2V0dGVyQ2FsbGJhY2ssXG4gICAgICAgICAgICBnZXR0ZXJDYWxsYmFja1xuICAgICAgICApXG4gICAgfTtcblxuICAgIHN0YXRpYyB0b1N0cmluZyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGBPYnNlcnZlciAke3RoaXN9YFxuICAgIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL29ic2VydmVyL29iamVjdC9pbmRleC5qcyIsIlxuaW1wb3J0IE9ic2VydmVyIGZyb20gJy4uL29iamVjdCc7XG5pbXBvcnQgT2JzZXJ2ZXJBcnJheSBmcm9tICcuLi9hcnJheSc7XG5cblxuY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xuXG5cblxuZnVuY3Rpb24gd2FsayhvYmosIGZ1bikge1xuICAgIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JylcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRnVuY3Rpb24gXCJ3YWxrXCIgcmVxdWlyZSBhbiBcIm9iamVjdFwiIGluc3RlYWQgb2YgJHt0eXBlb2Ygb2JqfWApO1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpXG4gICAgICAgIHJldHVybiBvYmouZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IGZ1bihpbmRleCwgaXRlbSwgb2JqKSk7XG4gICAgZWxzZVxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiBmdW4oa2V5LCBvYmpba2V5XSwgb2JqKSk7XG59XG5cbmZ1bmN0aW9uIG9ic2VydmVyKG9iaiwga2V5LCB2YWx1ZSwgc2V0dGVyQ2FsbGJhY2s9bm9vcCwgZ2V0dGVyQ2FsbGJhY2s9bm9vcCkge1xuICAgIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JylcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRnVuY3Rpb24gXCJvYnNlcnZlclwiIHJlcXVpcmUgYW4gXCJvYmplY3RcIiBpbnN0ZWFkIG9mICR7dHlwZW9mIG9ian1gKTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSlcbiAgICAgICAgdmFsdWUgPSBPYnNlcnZlckFycmF5LmZyb20odmFsdWUsIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFjayk7XG4gICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKVxuICAgICAgICB2YWx1ZSA9IE9ic2VydmVyLmZyb20odmFsdWUsIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFjayk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBnZXQ6ICgpID0+IHtcbiAgICAgICAgICAgIGdldHRlckNhbGxiYWNrKG9iaiwga2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWVcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBuZXdWYWx1ZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvbGRWYWx1ZSA9IG9ialtrZXldO1xuICAgICAgICAgICAgb2JzZXJ2ZXIob2JqLCBrZXksIG5ld1ZhbHVlLCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spO1xuICAgICAgICAgICAgc2V0dGVyQ2FsbGJhY2sob2JqLCBrZXksIG5ld1ZhbHVlLCBvbGRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5cbmNvbnN0IGdldFVuaXF1ZUlEID0gZnVuY3Rpb24oKSB7XG4gICAgbGV0IGlkID0gMDtcbiAgICByZXR1cm4gKCgpID0+IGlkICsrKTtcbn0oKTtcblxuXG5leHBvcnQge1xuICAgIHdhbGssXG4gICAgb2JzZXJ2ZXIsXG4gICAgZ2V0VW5pcXVlSURcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvb2JzZXJ2ZXIvdXRpbHMvaW5kZXguanMiLCJcbmltcG9ydCB7IHdhbGssIG9ic2VydmVyIH0gZnJvbSAnLi4vdXRpbHMvaW5kZXgnO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2JzZXJ2ZXJBcnJheSB7XG4gICAgY29uc3RydWN0b3IoYXJyYXksIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFjaykge1xuICAgICAgICAhYXJyYXkgJiYgKGFycmF5ID0gW10pO1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyYXkpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVHlwZSBcIkFycmF5XCIgcmVxdWlyZWQhJyk7XG4gICAgICAgIHdhbGsoYXJyYXksIChpbmRleCwgaXRlbSkgPT4gb2JzZXJ2ZXIoXG4gICAgICAgICAgICB0aGlzLCBpbmRleCwgaXRlbSxcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFja1xuICAgICAgICApKTtcbiAgICAgICAgdGhpcy5sZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgZnJvbSA9IChhcnJheSwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2ZXJBcnJheShcbiAgICAgICAgICAgIGFycmF5LFxuICAgICAgICAgICAgc2V0dGVyQ2FsbGJhY2ssXG4gICAgICAgICAgICBnZXR0ZXJDYWxsYmFja1xuICAgICAgICApXG4gICAgfTtcbiAgICBzdGF0aWMgaXNPYnNlcnZlckFycmF5ICA9IGFycmF5ID0+IHtcbiAgICAgICAgcmV0dXJuIGFycmF5Ll9fcHJvdG9fXy5jb25zdHJ1Y3RvciA9PT0gT2JzZXJ2ZXJBcnJheTtcbiAgICB9O1xuICAgIHN0YXRpYyBvZiA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2ZXJBcnJheShbLi4uYXJnc10pXG4gICAgfTtcblxuXG4gICAgY29uY2F0ID0gKC4uLmFycmF5cykgPT4ge1xuICAgICAgICBjb25zdCBuZXdBcnJheSA9IG5ldyBPYnNlcnZlckFycmF5KCk7XG4gICAgICAgIFt0aGlzLCAuLi5hcnJheXNdLmZvckVhY2goXG4gICAgICAgICAgICBhcnJheSA9PiBhcnJheS5mb3JFYWNoKG5ld0FycmF5LnB1c2gpXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBuZXdBcnJheTtcbiAgICB9O1xuICAgIGNvcHlXaXRoaW4gPSAoLi4uYXJncykgPT4ge1xuICAgICAgICAvLyBUT0RPXG4gICAgICAgIHJldHVybiBPYnNlcnZlckFycmF5LmZyb20oXG4gICAgICAgICAgICBBcnJheS5mcm9tKHRoaXMpLmNvcHlXaXRoaW4oLi4uYXJncylcbiAgICAgICAgKVxuICAgIH07XG4gICAgZW50cmllcyA9IGZ1bmN0aW9uICooKSB7XG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIHdoaWxlICh0aGlzW2luZGV4XSlcbiAgICAgICAgICAgIHlpZWxkIFtpbmRleCsrLCB0aGlzW2luZGV4XV07XG4gICAgfTtcbiAgICBldmVyeSA9ICgpID0+IHt9O1xuICAgIGZpbGwgPSAoKSA9PiB7fTtcbiAgICBmaWx0ZXIgPSAoKSA9PiB7fTtcbiAgICBmaW5kID0gKCkgPT4ge307XG4gICAgZmluZEluZGV4ID0gKCkgPT4ge307XG4gICAgZm9yRWFjaCA9ICgpID0+IHt9O1xuICAgIGluY2x1ZGVzID0gKCkgPT4ge307XG4gICAgaW5kZXhPZiA9ICgpID0+IHt9O1xuICAgIGpvaW4gPSAoKSA9PiB7fTtcbiAgICBrZXlzID0gKCkgPT4ge307XG4gICAgbGFzdEluZGV4T2YgPSAoKSA9PiB7fTtcbiAgICBtYXAgPSAoKSA9PiB7fTtcbiAgICBwb3AgPSAoKSA9PiB7fTtcbiAgICBwdXNoID0gdmFsdWUgPT4ge1xuICAgICAgICBvYnNlcnZlcihcbiAgICAgICAgICAgIHRoaXMsIHRoaXMubGVuZ3RoLCB2YWx1ZSxcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFja1xuICAgICAgICApO1xuICAgICAgICB0aGlzLmxlbmd0aCArKztcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gICAgcmVkdWNlID0gKCkgPT4ge307XG4gICAgcmVkdWNlUmlnaHQgPSAoKSA9PiB7fTtcbiAgICByZXZlcnNlID0gKCkgPT4ge307XG4gICAgc2hpZnQgPSAoKSA9PiB7fTtcbiAgICBzbGljZSA9ICgpID0+IHt9O1xuICAgIHNvbWUgPSAoKSA9PiB7fTtcbiAgICBzb3J0ID0gKCkgPT4ge307XG4gICAgc3BsaWNlID0gKCkgPT4ge307XG4gICAgdG9Mb2NhbGVTdHJpbmcgPSAoKSA9PiB7fTtcbiAgICB0b1NvdXJjZSA9ICgpID0+IHt9O1xuICAgIHRvU3RyaW5nID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gYE9ic2VydmVyQXJyYXkgWy4uLl1gXG4gICAgfTtcbiAgICB1bnNoaWZ0ID0gKCkgPT4ge307XG4gICAgdmFsdWVzID0gKCkgPT4ge307XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL29ic2VydmVyL2FycmF5L2luZGV4LmpzIiwiXG5mdW5jdGlvbiBmbGF0dGVuTm9kZShub2RlKSB7XG4gICAgaWYgKCFub2RlKSByZXR1cm47XG4gICAgaWYgKG5vZGUuY2hpbGRyZW4pXG4gICAgICAgIG5vZGUuY2hpbGRyZW4gPSBmbGF0dGVuQ2hpbGRyZW4obm9kZS5jaGlsZHJlbik7XG4gICAgcmV0dXJuIG5vZGVcbn1cblxuZnVuY3Rpb24gZmxhdHRlbkNoaWxkcmVuKGNoaWxkcmVuKSB7XG4gICAgcmV0dXJuIFtdLmNvbmNhdCguLi5jaGlsZHJlbilcbiAgICAgICAgLm1hcChub2RlID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygbm9kZSA9PT0gJ29iamVjdCcpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZsYXR0ZW5Ob2RlKG5vZGUpO1xuICAgICAgICAgICAgZWxzZSByZXR1cm4gbm9kZTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZpbHRlcihub2RlID0+ICEhbm9kZSk7XG59XG5cblxuZXhwb3J0IHtcbiAgICBmbGF0dGVuTm9kZVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS91dGlscy9pbmRleC5qcyIsIlxuaW1wb3J0IHtNdXNlfSBmcm9tICcuLi9pbmRleCc7XG5pbXBvcnQgTGlzdEl0ZW0gZnJvbSAnLi9jb21wb25lbnRzL2xpc3RJdGVtJztcblxuXG5cbmNsYXNzIEFwcCBleHRlbmRzIE11c2Uge1xuICAgIHN0YXRlID0ge1xuICAgICAgICBuYW1lOiAnSm9lJyxcbiAgICAgICAgYWdlOiAyMixcbiAgICAgICAgbGFuZ3M6IFtcbiAgICAgICAgICAgICdKYXZhU2NyaXB0JyxcbiAgICAgICAgICAgICdQeXRob24nLFxuICAgICAgICAgICAgJ1J1c3QnLFxuICAgICAgICAgICAgJ1NjYWxhJ1xuICAgICAgICBdLFxuICAgICAgICBzaG93SGVsbG86IHRydWUsXG4gICAgICAgIGNvbG9yOiAnJ1xuICAgIH1cblxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgICBpc0FnZU9kZCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmFnZSAlIDIgIT09IDBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnN0YXRlLmFnZSsrO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGgxIGlmPXt0aGlzLnN0YXRlLnNob3dIZWxsb30+SGVsbG8hPC9oMT5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw9e3RoaXMuc3RhdGUubmFtZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICBtb2RlbD17dGhpcy5zdGF0ZS5zaG93SGVsbG99XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8cCBzdHlsZT17e2NvbG9yOiB0aGlzLnN0YXRlLmNvbG9yfX0+e3RoaXMuc3RhdGUuY29sb3J9PC9wPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY29sb3JcIiBtb2RlbD17dGhpcy5zdGF0ZS5jb2xvcn0vPlxuICAgICAgICAgICAgICAgIDxwPk15IG5hbWUgaXMge3RoaXMuc3RhdGUubmFtZX0uPC9wPlxuICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICBJJ20ge3RoaXMuc3RhdGUuYWdlfSB5ZWFycyBvbGRcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gaWY9e3RoaXMuY29tcHV0ZWQuaXNBZ2VPZGR9PiBhbmQgaXQncyBhbiBvZGQgbnVtYmVyLjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPHA+QW5kIEkgY2FuIHRob3NlIHByb2dyYW1taW5nIGxhbmd1YWdlczo8L3A+XG4gICAgICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgICAgICA8TGlzdEl0ZW0gZm9yPXtsYW5nIGluIHRoaXMuc3RhdGUubGFuZ3N9IHRleHQ9e2xhbmd9Lz5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+Q2xpY2sgTWU8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuXG5cbmNvbnN0IGFwcCA9IG5ldyBBcHAoKTtcbmFwcC5yZW5kZXJUbyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2V4YW1wbGUvaW5kZXguanMiLCJcbmltcG9ydCB7TXVzZX0gZnJvbSAnLi4vLi4vaW5kZXgnO1xuXG5cbmNsYXNzIExpc3RJdGVtIGV4dGVuZHMgTXVzZSB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGxpPnt0aGlzLnByb3BzLnRleHR9PC9saT5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBMaXN0SXRlbTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2V4YW1wbGUvY29tcG9uZW50cy9saXN0SXRlbS5qcyJdLCJzb3VyY2VSb290IjoiIn0=