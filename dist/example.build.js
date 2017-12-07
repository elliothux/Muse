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
exports.removeAttribute = exports.setAttribute = exports.setAttributes = undefined;

var _events = __webpack_require__(9);

function setAttributes(target) {
    var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    Object.keys(attributes).filter(function (key) {
        return attributes.hasOwnProperty(key);
    }).forEach(function (attrName) {
        return setAttribute(target, attrName, attributes[attrName]);
    });
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

exports.setAttributes = setAttributes;
exports.setAttribute = setAttribute;
exports.removeAttribute = removeAttribute;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getUniqueID = exports.observer = exports.walk = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _object = __webpack_require__(4);

var _object2 = _interopRequireDefault(_object);

var _array = __webpack_require__(5);

var _array2 = _interopRequireDefault(_array);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noop = function noop() {};

function walk(obj, fun) {
    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') throw new TypeError('Function "walk" require an "object" instead of ' + (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
    if (Array.isArray(obj)) return obj.forEach(function (item, index) {
        return fun(index, item, obj);
    });else return Object.keys(obj).forEach(function (key) {
        return fun(key, obj[key], obj);
    });
}

function observer(obj, key, value) {
    var setterCallback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;
    var getterCallback = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : noop;

    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') throw new TypeError('Function "observer" require an "object" instead of ' + (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));

    if (Array.isArray(value)) value = _array2.default.from(value);else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === "object") value = _object2.default.from(value);

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function get() {
            getterCallback(obj, key, value);
            return value;
        },
        set: function set(newValue) {
            var oldValue = obj[key];
            observer(obj, key, newValue, setterCallback, getterCallback);
            setterCallback(obj, key, newValue, oldValue);
        }
    });
}

var getUniqueID = function () {
    var id = 0;
    return function () {
        return id++;
    };
}();

exports.walk = walk;
exports.observer = observer;
exports.getUniqueID = getUniqueID;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createElement = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _utils = __webpack_require__(0);

function createElement(node) {
    /*
    node: String || {
        elementName: String
        children: node[]
        attributes: Object
    }
    */
    if ((typeof node === 'undefined' ? 'undefined' : _typeof(node)) === 'object') {
        var el = document.createElement(node.elementName);
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ChangeType = undefined;

var _change = __webpack_require__(11);

var _change2 = _interopRequireDefault(_change);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.ChangeType = _change2.default;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _class, _temp;

var _index = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Observer = (_temp = _class = function Observer(obj, setterCallback, getterCallback) {
    var _this = this;

    _classCallCheck(this, Observer);

    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== "object") throw new TypeError('Type "Object" required!');
    (0, _index.walk)(obj, function (key, value) {
        return (0, _index.observer)(_this, key, value, setterCallback, getterCallback);
    });
}, _class.from = function (obj, setterCallback, getterCallback) {
    return new Observer(obj, setterCallback, getterCallback);
}, _class.toString = function () {
    return 'Observer ' + undefined;
}, _temp);
exports.default = Observer;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _class, _temp, _initialiseProps;

var _index = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObserverArray = (_temp = _class = function ObserverArray(array, setterCallback, getterCallback) {
    var _this = this;

    _classCallCheck(this, ObserverArray);

    _initialiseProps.call(this);

    !array && (array = []);
    if (!Array.isArray(array)) throw new TypeError('Type "Array" required!');
    (0, _index.walk)(array, function (index, item) {
        return (0, _index.observer)(_this, index, item, setterCallback, getterCallback);
    });
    this.length = array.length;
}, _class.from = function (array, setterCallback, getterCallback) {
    return new ObserverArray(array, setterCallback, getterCallback);
}, _class.isObserverArray = function (array) {
    return array.__proto__.constructor === ObserverArray;
}, _class.of = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return new ObserverArray([].concat(args));
}, _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.concat = function () {
        for (var _len2 = arguments.length, arrays = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            arrays[_key2] = arguments[_key2];
        }

        var newArray = new ObserverArray();
        [_this2].concat(arrays).forEach(function (array) {
            return array.forEach(newArray.push);
        });
        return newArray;
    };

    this.copyWithin = function () {
        var _Array$from;

        // TODO
        return ObserverArray.from((_Array$from = Array.from(_this2)).copyWithin.apply(_Array$from, arguments));
    };

    this.entries = /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var index;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        index = 0;

                    case 1:
                        if (!this[index]) {
                            _context.next = 6;
                            break;
                        }

                        _context.next = 4;
                        return [index++, this[index]];

                    case 4:
                        _context.next = 1;
                        break;

                    case 6:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    });

    this.every = function () {};

    this.fill = function () {};

    this.filter = function () {};

    this.find = function () {};

    this.findIndex = function () {};

    this.forEach = function () {};

    this.includes = function () {};

    this.indexOf = function () {};

    this.join = function () {};

    this.keys = function () {};

    this.lastIndexOf = function () {};

    this.map = function () {};

    this.pop = function () {};

    this.push = function (value) {
        (0, _index.observer)(_this2, _this2.length, value, setterCallback, getterCallback);
        _this2.length++;
        return value;
    };

    this.reduce = function () {};

    this.reduceRight = function () {};

    this.reverse = function () {};

    this.shift = function () {};

    this.slice = function () {};

    this.some = function () {};

    this.sort = function () {};

    this.splice = function () {};

    this.toLocaleString = function () {};

    this.toSource = function () {};

    this.toString = function () {
        return 'ObserverArray [...]';
    };

    this.unshift = function () {};

    this.values = function () {};
}, _temp);
exports.default = ObserverArray;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Component = undefined;

var _core = __webpack_require__(7);

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Component = _core2.default;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = __webpack_require__(8);

var _observer = __webpack_require__(13);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = function () {
    function Component() {
        _classCallCheck(this, Component);

        this.entry = null;
        this.node = null;
        this.state = {};
        this.computed = {};
    }

    _createClass(Component, [{
        key: 'componentWillMount',


        // TODO: LifeCycle
        value: function componentWillMount() {}
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps() {}
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            return true;
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate() {}
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {}
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {}
    }, {
        key: 'componentDidCatch',
        value: function componentDidCatch() {}
    }, {
        key: 'initObserver',


        // Observer
        value: function initObserver() {
            this.state = _observer.Observer.from(this.state || {}, this.setterCallback.bind(this));
        }
    }, {
        key: 'initComputed',
        value: function initComputed() {
            var _this = this;

            (0, _observer.walk)(this.computed, function (name, getter, computed) {
                Object.defineProperty(computed, name, {
                    enumerable: true,
                    configurable: false,
                    get: getter.bind(_this)
                });
            });
        }
    }, {
        key: 'setterCallback',
        value: function setterCallback(obj, key, value, oldValue) {
            if (obj !== this.state) throw new Error('BOOM!!!');
            this.diffAndPatch();
        }
    }, {
        key: 'beforeRender',


        // Render
        value: function beforeRender() {
            this.initObserver();
            this.initComputed();
        }
    }, {
        key: 'render',
        value: function render() {}
    }, {
        key: 'renderTo',
        value: function renderTo(entry) {
            this.beforeRender();
            this.node = this.render();
            this.entry = entry;
            this.entry.appendChild((0, _dom.createElement)(this.node));
        }
    }, {
        key: 'diffAndPatch',
        value: function diffAndPatch() {
            var oldNode = this.node;
            this.node = this.render();
            var patches = (0, _dom.diff)(this.node, oldNode);
            (0, _dom.patch)(this.entry, patches);
        }
    }]);

    return Component;
}();

exports.default = Component;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.utils = exports.patch = exports.diff = exports.createElement = undefined;

var _create = __webpack_require__(2);

var _diff = __webpack_require__(10);

var _patch = __webpack_require__(12);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.createElement = _create.createElement;
exports.diff = _diff.diff;
exports.patch = _patch.patch;
exports.utils = _utils2.default;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var eventTypes = [
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

var eventMap = eventTypes.reduce(function (eventsMap, event) {
    eventsMap[event] = event.replace('on', '').replace(/[A-Z]/, function (e) {
        return e.toLowerCase();
    });
    return eventsMap;
}, {});

exports.eventTypes = eventTypes;
exports.eventMap = eventMap;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.diff = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _index = __webpack_require__(3);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function diff(newNode, oldNode) {
    /*
    return type Patch {
        type: ChangeType
        newNode?: Node
        children?: Patch[]
        attributes?: Patch[]
    }
     */
    if (!oldNode) return { type: _index.ChangeType.CREATE, newNode: newNode };else if (!newNode) return { type: _index.ChangeType.REMOVE };else if (isChanged(newNode, oldNode)) return { type: _index.ChangeType.REPLACE, newNode: newNode };else if (newNode.elementName) return {
        type: _index.ChangeType.UPDATE,
        children: diffChildren(newNode, oldNode),
        attributes: diffAttributes(newNode, oldNode)
    };
}

function isChanged(newNode, oldNode) {
    return (typeof newNode === "undefined" ? "undefined" : _typeof(newNode)) !== (typeof oldNode === "undefined" ? "undefined" : _typeof(oldNode)) || (typeof newNode === "undefined" ? "undefined" : _typeof(newNode)) !== "object" && newNode !== oldNode || (typeof newNode === "undefined" ? "undefined" : _typeof(newNode)) === "object" && newNode.elementName !== oldNode.elementName;
}

function diffAttributes(newNode, oldNode) {
    var patches = [];
    var attributes = _extends({}, oldNode.attributes, newNode.attributes);
    Object.keys(attributes).map(function (attrName) {
        var newAttr = newNode.attributes[attrName];
        var oldAttr = oldNode.attributes[attrName];
        !newAttr && patches.push({
            type: _index.ChangeType.REMOVE_PROPS,
            value: oldAttr, attrName: attrName
        });
        (!oldAttr || oldAttr !== newAttr) && patches.push({
            type: _index.ChangeType.SET_PROPS,
            value: newAttr, attrName: attrName
        });
    });
    return patches;
}

function diffChildren(newNode, oldNode) {
    return [].concat(_toConsumableArray(Array(Math.max(newNode.children.length, oldNode.children.length)).keys())).map(function (i) {
        return diff(newNode.children[i], oldNode.children[i]);
    });
}

exports.diff = diff;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var Changed = {
    CREATE: 'CREATE',
    REMOVE: 'REMOVE',
    REPLACE: 'REPLACE',
    UPDATE: 'UPDATE',
    SET_PROPS: 'SET PROPS',
    REMOVE_PROPS: 'REMOVE PROPS'
};

exports.default = Changed;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.patch = undefined;

var _types = __webpack_require__(3);

var _index = __webpack_require__(2);

var _index2 = __webpack_require__(0);

function patch(parent, patches) {
    var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    if (!patches) return;
    var el = parent.childNodes[index];
    switch (patches.type) {
        case _types.ChangeType.CREATE:
            {
                var newNode = patches.newNode;

                var newEl = (0, _index.createElement)(newNode);
                parent.appendChild(newEl);
                break;
            }
        case _types.ChangeType.REMOVE:
            {
                parent.removeChild(el);
                break;
            }
        case _types.ChangeType.REPLACE:
            {
                var _newNode = patches.newNode;

                var _newEl = (0, _index.createElement)(_newNode);
                parent.replaceChild(_newEl, el);
                break;
            }
        case _types.ChangeType.UPDATE:
            {
                var children = patches.children,
                    attributes = patches.attributes;

                patchAttributes(el, attributes);
                children.forEach(function (child, index) {
                    return patch(el, child, index);
                });
                break;
            }
    }
}

function patchAttributes(element, attributes) {
    attributes.forEach(function (patch) {
        var type = patch.type,
            attrName = patch.attrName,
            value = patch.value;

        if (type === _types.ChangeType.SET_PROPS) (0, _index2.setAttribute)(element, attrName, value);else if (type === _types.ChangeType.REMOVE_PROPS) (0, _index2.removeAttribute)(element, attrName, value);
    });
}

exports.patch = patch;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.observer = exports.walk = exports.ObserverArray = exports.Observer = undefined;

var _object = __webpack_require__(4);

var _object2 = _interopRequireDefault(_object);

var _array = __webpack_require__(5);

var _array2 = _interopRequireDefault(_array);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Observer = _object2.default;
exports.ObserverArray = _array2.default;
exports.walk = _utils.walk;
exports.observer = _utils.observer;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = __webpack_require__(6);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
    _inherits(App, _Component);

    function App() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, App);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = App.__proto__ || Object.getPrototypeOf(App)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            name: 'Joe',
            age: 22
        }, _this.computed = {
            canDrive: function canDrive() {
                return this.state.age % 2 === 0;
            }
        }, _this.handleClick = function () {
            _this.state.age++;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            return {
                elementName: 'div',
                attributes: {},
                children: [{
                    elementName: 'p',
                    attributes: {},
                    children: ['I\'m ', this.state.name, '.']
                }, {
                    elementName: 'p',
                    attributes: {},
                    children: ['I\'m ', this.state.age, ' years old.']
                }, {
                    elementName: 'p',
                    attributes: {},
                    children: ['I ', this.computed.canDrive ? 'can' : 'can not', ' Drive']
                }, {
                    elementName: 'button',
                    attributes: {
                        onClick: this.handleClick
                    },
                    children: ['Click Me']
                }]
            };
        }
    }]);

    return App;
}(_index.Component);

var app = new App();
app.renderTo(document.getElementById('root'));

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjgzMTc3M2VkMDJjY2VkZDQ2ZDkiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci91dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9jcmVhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdHlwZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci9vYmplY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci9hcnJheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3V0aWxzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9kaWZmL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3R5cGVzL2NoYW5nZS5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9wYXRjaC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL29ic2VydmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL2V4YW1wbGUvaW5kZXguanMiXSwibmFtZXMiOlsic2V0QXR0cmlidXRlcyIsInRhcmdldCIsImF0dHJpYnV0ZXMiLCJPYmplY3QiLCJrZXlzIiwiZmlsdGVyIiwiaGFzT3duUHJvcGVydHkiLCJrZXkiLCJmb3JFYWNoIiwic2V0QXR0cmlidXRlIiwiYXR0ck5hbWUiLCJhdHRyVmFsdWUiLCJpbmNsdWRlcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVBdHRyaWJ1dGUiLCJvbGRBdHRyVmFsdWUiLCJub29wIiwid2FsayIsIm9iaiIsImZ1biIsIlR5cGVFcnJvciIsIkFycmF5IiwiaXNBcnJheSIsIml0ZW0iLCJpbmRleCIsIm9ic2VydmVyIiwidmFsdWUiLCJzZXR0ZXJDYWxsYmFjayIsImdldHRlckNhbGxiYWNrIiwiZnJvbSIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsImdldCIsInNldCIsIm9sZFZhbHVlIiwibmV3VmFsdWUiLCJnZXRVbmlxdWVJRCIsImlkIiwiY3JlYXRlRWxlbWVudCIsIm5vZGUiLCJlbCIsImRvY3VtZW50IiwiZWxlbWVudE5hbWUiLCJjaGlsZHJlbiIsImFwcGVuZENoaWxkcmVuIiwiY3JlYXRlVGV4dE5vZGUiLCJtYXAiLCJhcHBlbmRDaGlsZCIsIkNoYW5nZVR5cGUiLCJPYnNlcnZlciIsInRvU3RyaW5nIiwiT2JzZXJ2ZXJBcnJheSIsImFycmF5IiwibGVuZ3RoIiwiaXNPYnNlcnZlckFycmF5IiwiX19wcm90b19fIiwiY29uc3RydWN0b3IiLCJvZiIsImFyZ3MiLCJjb25jYXQiLCJhcnJheXMiLCJuZXdBcnJheSIsInB1c2giLCJjb3B5V2l0aGluIiwiZW50cmllcyIsImV2ZXJ5IiwiZmlsbCIsImZpbmQiLCJmaW5kSW5kZXgiLCJpbmRleE9mIiwiam9pbiIsImxhc3RJbmRleE9mIiwicG9wIiwicmVkdWNlIiwicmVkdWNlUmlnaHQiLCJyZXZlcnNlIiwic2hpZnQiLCJzbGljZSIsInNvbWUiLCJzb3J0Iiwic3BsaWNlIiwidG9Mb2NhbGVTdHJpbmciLCJ0b1NvdXJjZSIsInVuc2hpZnQiLCJ2YWx1ZXMiLCJDb21wb25lbnQiLCJlbnRyeSIsInN0YXRlIiwiY29tcHV0ZWQiLCJuYW1lIiwiZ2V0dGVyIiwiRXJyb3IiLCJkaWZmQW5kUGF0Y2giLCJpbml0T2JzZXJ2ZXIiLCJpbml0Q29tcHV0ZWQiLCJiZWZvcmVSZW5kZXIiLCJyZW5kZXIiLCJvbGROb2RlIiwicGF0Y2hlcyIsImRpZmYiLCJwYXRjaCIsInV0aWxzIiwiZXZlbnRUeXBlcyIsImV2ZW50TWFwIiwiZXZlbnRzTWFwIiwiZXZlbnQiLCJyZXBsYWNlIiwiZSIsInRvTG93ZXJDYXNlIiwibmV3Tm9kZSIsInR5cGUiLCJDUkVBVEUiLCJSRU1PVkUiLCJpc0NoYW5nZWQiLCJSRVBMQUNFIiwiVVBEQVRFIiwiZGlmZkNoaWxkcmVuIiwiZGlmZkF0dHJpYnV0ZXMiLCJuZXdBdHRyIiwib2xkQXR0ciIsIlJFTU9WRV9QUk9QUyIsIlNFVF9QUk9QUyIsIk1hdGgiLCJtYXgiLCJpIiwiQ2hhbmdlZCIsInBhcmVudCIsImNoaWxkTm9kZXMiLCJuZXdFbCIsInJlbW92ZUNoaWxkIiwicmVwbGFjZUNoaWxkIiwicGF0Y2hBdHRyaWJ1dGVzIiwiY2hpbGQiLCJlbGVtZW50IiwiQXBwIiwiYWdlIiwiY2FuRHJpdmUiLCJoYW5kbGVDbGljayIsImFwcCIsInJlbmRlclRvIiwiZ2V0RWxlbWVudEJ5SWQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDNURBOztBQUlBLFNBQVNBLGFBQVQsQ0FBdUJDLE1BQXZCLEVBQThDO0FBQUEsUUFBZkMsVUFBZSx1RUFBSixFQUFJOztBQUMxQ0MsV0FBT0MsSUFBUCxDQUFZRixVQUFaLEVBQ0tHLE1BREwsQ0FDWTtBQUFBLGVBQU9ILFdBQVdJLGNBQVgsQ0FBMEJDLEdBQTFCLENBQVA7QUFBQSxLQURaLEVBRUtDLE9BRkwsQ0FFYTtBQUFBLGVBQVlDLGFBQWFSLE1BQWIsRUFBcUJT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akQsS0FBTCxDQUFXZ0QsR0FBWCxHQUFpQixDQUFqQixLQUF1QixDQUE5QjtBQUNIO0FBSE0sUyxRQU9YRSxXLEdBQWMsWUFBTTtBQUNoQixrQkFBS2xELEtBQUwsQ0FBV2dELEdBQVg7QUFDSCxTOzs7OztpQ0FFUTtBQUFFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdDQUVLLEtBQUtoRCxLQUFMLENBQVdFLElBRmhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBR0ssS0FBS0YsS0FBTCxDQUFXZ0QsR0FIaEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQ0FJRyxLQUFLL0MsUUFBTCxDQUFjZ0QsUUFBZCxHQUF5QixLQUF6QixHQUFpQyxTQUpwQztBQUFBO0FBQUE7QUFBQTtBQUFBLGlDQU1VLEtBQUtDO0FBTmY7QUFBQTtBQUFBO0FBQUE7QUFTVDs7Ozs7O0FBS04sSUFBTUMsTUFBTSxJQUFJSixHQUFKLEVBQVo7QUFDQUksSUFBSUMsUUFBSixDQUFhbEcsU0FBU21HLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBYixFIiwiZmlsZSI6ImV4YW1wbGUuYnVpbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYXNzZXRzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyODMxNzczZWQwMmNjZWRkNDZkOSIsIlxuaW1wb3J0IHsgZXZlbnRUeXBlcywgZXZlbnRNYXAgfSBmcm9tICcuL2V2ZW50cyc7XG5cblxuXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzKHRhcmdldCwgYXR0cmlidXRlcz17fSkge1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpXG4gICAgICAgIC5maWx0ZXIoa2V5ID0+IGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoa2V5KSlcbiAgICAgICAgLmZvckVhY2goYXR0ck5hbWUgPT4gc2V0QXR0cmlidXRlKHRhcmdldCwgYXR0ck5hbWUsIGF0dHJpYnV0ZXNbYXR0ck5hbWVdKSk7XG59XG5cblxuZnVuY3Rpb24gc2V0QXR0cmlidXRlKHRhcmdldCwgYXR0ck5hbWUsIGF0dHJWYWx1ZSkge1xuICAgIGF0dHJOYW1lID09PSAnY2xhc3NOYW1lJyAmJiAoYXR0ck5hbWUgPSAnY2xhc3MnKTtcbiAgICBpZiAoZXZlbnRUeXBlcy5pbmNsdWRlcyhhdHRyTmFtZSkpXG4gICAgICAgIHJldHVybiB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgIGV2ZW50TWFwW2F0dHJOYW1lXSxcbiAgICAgICAgICAgIGF0dHJWYWx1ZVxuICAgICAgICApO1xuICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGF0dHJWYWx1ZSk7XG59XG5cblxuZnVuY3Rpb24gcmVtb3ZlQXR0cmlidXRlKHRhcmdldCwgYXR0ck5hbWUsIG9sZEF0dHJWYWx1ZSkge1xuICAgIGF0dHJOYW1lID09PSAnY2xhc3NOYW1lJyAmJiAoYXR0ck5hbWUgPSAnY2xhc3MnKTtcbiAgICBpZiAoZXZlbnRUeXBlcy5pbmNsdWRlcyhhdHRyTmFtZSkpXG4gICAgICAgIHJldHVybiB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgIGV2ZW50TWFwW2F0dHJOYW1lXSxcbiAgICAgICAgICAgIG9sZEF0dHJWYWx1ZVxuICAgICAgICApO1xuICAgIHRhcmdldC5yZW1vdmVBdHRyaWJ1dGUoYXR0ck5hbWUpO1xufVxuXG5cblxuZXhwb3J0IHtcbiAgICBzZXRBdHRyaWJ1dGVzLFxuICAgIHNldEF0dHJpYnV0ZSxcbiAgICByZW1vdmVBdHRyaWJ1dGVcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3V0aWxzL2luZGV4LmpzIiwiXG5pbXBvcnQgT2JzZXJ2ZXIgZnJvbSAnLi4vb2JqZWN0JztcbmltcG9ydCBPYnNlcnZlckFycmF5IGZyb20gJy4uL2FycmF5JztcblxuXG5jb25zdCBub29wID0gKCkgPT4ge307XG5cblxuXG5mdW5jdGlvbiB3YWxrKG9iaiwgZnVuKSB7XG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBGdW5jdGlvbiBcIndhbGtcIiByZXF1aXJlIGFuIFwib2JqZWN0XCIgaW5zdGVhZCBvZiAke3R5cGVvZiBvYmp9YCk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSlcbiAgICAgICAgcmV0dXJuIG9iai5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4gZnVuKGluZGV4LCBpdGVtLCBvYmopKTtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IGZ1bihrZXksIG9ialtrZXldLCBvYmopKTtcbn1cblxuZnVuY3Rpb24gb2JzZXJ2ZXIob2JqLCBrZXksIHZhbHVlLCBzZXR0ZXJDYWxsYmFjaz1ub29wLCBnZXR0ZXJDYWxsYmFjaz1ub29wKSB7XG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBGdW5jdGlvbiBcIm9ic2VydmVyXCIgcmVxdWlyZSBhbiBcIm9iamVjdFwiIGluc3RlYWQgb2YgJHt0eXBlb2Ygb2JqfWApO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKVxuICAgICAgICB2YWx1ZSA9IE9ic2VydmVyQXJyYXkuZnJvbSh2YWx1ZSk7XG4gICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKVxuICAgICAgICB2YWx1ZSA9IE9ic2VydmVyLmZyb20odmFsdWUpO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgICAgICBnZXR0ZXJDYWxsYmFjayhvYmosIGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgICAgIH0sXG4gICAgICAgIHNldDogbmV3VmFsdWUgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSBvYmpba2V5XTtcbiAgICAgICAgICAgIG9ic2VydmVyKG9iaiwga2V5LCBuZXdWYWx1ZSwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKTtcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrKG9iaiwga2V5LCBuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICB9XG4gICAgfSlcbn1cblxuXG5jb25zdCBnZXRVbmlxdWVJRCA9IGZ1bmN0aW9uKCkge1xuICAgIGxldCBpZCA9IDA7XG4gICAgcmV0dXJuICgoKSA9PiBpZCArKyk7XG59KCk7XG5cblxuZXhwb3J0IHtcbiAgICB3YWxrLFxuICAgIG9ic2VydmVyLFxuICAgIGdldFVuaXF1ZUlEXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL29ic2VydmVyL3V0aWxzL2luZGV4LmpzIiwiXG5pbXBvcnQgeyBzZXRBdHRyaWJ1dGVzIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5cblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudChub2RlKSB7XG4gICAgLypcbiAgICBub2RlOiBTdHJpbmcgfHwge1xuICAgICAgICBlbGVtZW50TmFtZTogU3RyaW5nXG4gICAgICAgIGNoaWxkcmVuOiBub2RlW11cbiAgICAgICAgYXR0cmlidXRlczogT2JqZWN0XG4gICAgfVxuICAgICovXG4gICAgaWYgKHR5cGVvZiBub2RlID09PSAnb2JqZWN0Jykge1xuICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobm9kZS5lbGVtZW50TmFtZSk7XG4gICAgICAgIG5vZGUuY2hpbGRyZW4gJiYgYXBwZW5kQ2hpbGRyZW4oZWwsIG5vZGUuY2hpbGRyZW4pO1xuICAgICAgICBzZXRBdHRyaWJ1dGVzKGVsLCBub2RlLmF0dHJpYnV0ZXMpO1xuICAgICAgICByZXR1cm4gZWw7XG4gICAgfVxuICAgIGVsc2UgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG5vZGUpO1xufVxuXG5cbmZ1bmN0aW9uIGFwcGVuZENoaWxkcmVuKHRhcmdldCwgY2hpbGRyZW4pIHtcbiAgICBjaGlsZHJlbi5tYXAoY3JlYXRlRWxlbWVudClcbiAgICAgICAgLmZvckVhY2goOjp0YXJnZXQuYXBwZW5kQ2hpbGQpXG59XG5cblxuXG5leHBvcnQge1xuICAgIGNyZWF0ZUVsZW1lbnRcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL2NyZWF0ZS9pbmRleC5qcyIsIlxuaW1wb3J0IENoYW5nZVR5cGUgZnJvbSAnLi9jaGFuZ2UnO1xuXG5cbmV4cG9ydCB7XG4gICAgQ2hhbmdlVHlwZVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vdHlwZXMvaW5kZXguanMiLCJcbmltcG9ydCB7IHdhbGssIG9ic2VydmVyIH0gZnJvbSAnLi4vdXRpbHMvaW5kZXgnXG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPYnNlcnZlciB7XG4gICAgY29uc3RydWN0b3Iob2JqLCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUeXBlIFwiT2JqZWN0XCIgcmVxdWlyZWQhJyk7XG4gICAgICAgIHdhbGsob2JqLCAoa2V5LCB2YWx1ZSkgPT4gb2JzZXJ2ZXIoXG4gICAgICAgICAgICB0aGlzLCBrZXksIHZhbHVlLFxuICAgICAgICAgICAgc2V0dGVyQ2FsbGJhY2ssXG4gICAgICAgICAgICBnZXR0ZXJDYWxsYmFja1xuICAgICAgICApKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZnJvbSA9IChvYmosIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFjaykgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmVyKFxuICAgICAgICAgICAgb2JqLFxuICAgICAgICAgICAgc2V0dGVyQ2FsbGJhY2ssXG4gICAgICAgICAgICBnZXR0ZXJDYWxsYmFja1xuICAgICAgICApXG4gICAgfTtcblxuICAgIHN0YXRpYyB0b1N0cmluZyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGBPYnNlcnZlciAke3RoaXN9YFxuICAgIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL29ic2VydmVyL29iamVjdC9pbmRleC5qcyIsIlxuaW1wb3J0IHsgd2Fsaywgb2JzZXJ2ZXIgfSBmcm9tICcuLi91dGlscy9pbmRleCc7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPYnNlcnZlckFycmF5IHtcbiAgICBjb25zdHJ1Y3RvcihhcnJheSwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKSB7XG4gICAgICAgICFhcnJheSAmJiAoYXJyYXkgPSBbXSk7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShhcnJheSkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUeXBlIFwiQXJyYXlcIiByZXF1aXJlZCEnKTtcbiAgICAgICAgd2FsayhhcnJheSwgKGluZGV4LCBpdGVtKSA9PiBvYnNlcnZlcihcbiAgICAgICAgICAgIHRoaXMsIGluZGV4LCBpdGVtLFxuICAgICAgICAgICAgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrXG4gICAgICAgICkpO1xuICAgICAgICB0aGlzLmxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBmcm9tID0gKGFycmF5LCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZlckFycmF5KFxuICAgICAgICAgICAgYXJyYXksXG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjayxcbiAgICAgICAgICAgIGdldHRlckNhbGxiYWNrXG4gICAgICAgIClcbiAgICB9O1xuICAgIHN0YXRpYyBpc09ic2VydmVyQXJyYXkgID0gYXJyYXkgPT4ge1xuICAgICAgICByZXR1cm4gYXJyYXkuX19wcm90b19fLmNvbnN0cnVjdG9yID09PSBPYnNlcnZlckFycmF5O1xuICAgIH07XG4gICAgc3RhdGljIG9mID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZlckFycmF5KFsuLi5hcmdzXSlcbiAgICB9O1xuXG5cbiAgICBjb25jYXQgPSAoLi4uYXJyYXlzKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0FycmF5ID0gbmV3IE9ic2VydmVyQXJyYXkoKTtcbiAgICAgICAgW3RoaXMsIC4uLmFycmF5c10uZm9yRWFjaChcbiAgICAgICAgICAgIGFycmF5ID0+IGFycmF5LmZvckVhY2gobmV3QXJyYXkucHVzaClcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIG5ld0FycmF5O1xuICAgIH07XG4gICAgY29weVdpdGhpbiA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgIC8vIFRPRE9cbiAgICAgICAgcmV0dXJuIE9ic2VydmVyQXJyYXkuZnJvbShcbiAgICAgICAgICAgIEFycmF5LmZyb20odGhpcykuY29weVdpdGhpbiguLi5hcmdzKVxuICAgICAgICApXG4gICAgfTtcbiAgICBlbnRyaWVzID0gZnVuY3Rpb24gKigpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgd2hpbGUgKHRoaXNbaW5kZXhdKVxuICAgICAgICAgICAgeWllbGQgW2luZGV4KyssIHRoaXNbaW5kZXhdXTtcbiAgICB9O1xuICAgIGV2ZXJ5ID0gKCkgPT4ge307XG4gICAgZmlsbCA9ICgpID0+IHt9O1xuICAgIGZpbHRlciA9ICgpID0+IHt9O1xuICAgIGZpbmQgPSAoKSA9PiB7fTtcbiAgICBmaW5kSW5kZXggPSAoKSA9PiB7fTtcbiAgICBmb3JFYWNoID0gKCkgPT4ge307XG4gICAgaW5jbHVkZXMgPSAoKSA9PiB7fTtcbiAgICBpbmRleE9mID0gKCkgPT4ge307XG4gICAgam9pbiA9ICgpID0+IHt9O1xuICAgIGtleXMgPSAoKSA9PiB7fTtcbiAgICBsYXN0SW5kZXhPZiA9ICgpID0+IHt9O1xuICAgIG1hcCA9ICgpID0+IHt9O1xuICAgIHBvcCA9ICgpID0+IHt9O1xuICAgIHB1c2ggPSB2YWx1ZSA9PiB7XG4gICAgICAgIG9ic2VydmVyKFxuICAgICAgICAgICAgdGhpcywgdGhpcy5sZW5ndGgsIHZhbHVlLFxuICAgICAgICAgICAgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMubGVuZ3RoICsrO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICByZWR1Y2UgPSAoKSA9PiB7fTtcbiAgICByZWR1Y2VSaWdodCA9ICgpID0+IHt9O1xuICAgIHJldmVyc2UgPSAoKSA9PiB7fTtcbiAgICBzaGlmdCA9ICgpID0+IHt9O1xuICAgIHNsaWNlID0gKCkgPT4ge307XG4gICAgc29tZSA9ICgpID0+IHt9O1xuICAgIHNvcnQgPSAoKSA9PiB7fTtcbiAgICBzcGxpY2UgPSAoKSA9PiB7fTtcbiAgICB0b0xvY2FsZVN0cmluZyA9ICgpID0+IHt9O1xuICAgIHRvU291cmNlID0gKCkgPT4ge307XG4gICAgdG9TdHJpbmcgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBgT2JzZXJ2ZXJBcnJheSBbLi4uXWBcbiAgICB9O1xuICAgIHVuc2hpZnQgPSAoKSA9PiB7fTtcbiAgICB2YWx1ZXMgPSAoKSA9PiB7fTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvb2JzZXJ2ZXIvYXJyYXkvaW5kZXguanMiLCJcbmltcG9ydCBDb21wb25lbnQgZnJvbSAnLi9jb3JlJztcblxuXG5cbmV4cG9ydCB7XG4gICAgQ29tcG9uZW50XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9pbmRleC5qcyIsIlxuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgZGlmZiwgcGF0Y2ggfSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgeyBPYnNlcnZlciwgb2JzZXJ2ZXIsIHdhbGsgfSBmcm9tICcuL29ic2VydmVyJztcblxuXG5cbmNsYXNzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgZW50cnkgPSBudWxsO1xuICAgIG5vZGUgPSBudWxsO1xuICAgIHN0YXRlID0ge307XG4gICAgY29tcHV0ZWQgPSB7fTtcblxuICAgIC8vIFRPRE86IExpZmVDeWNsZVxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHt9O1xuICAgIGNvbXBvbmVudERpZE1vdW50KCkge307XG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcygpIHt9O1xuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9O1xuICAgIGNvbXBvbmVudFdpbGxVcGRhdGUoKSB7fTtcbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7fTtcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHt9O1xuICAgIGNvbXBvbmVudERpZENhdGNoKCkge307XG5cbiAgICAvLyBPYnNlcnZlclxuICAgIGluaXRPYnNlcnZlcigpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IE9ic2VydmVyLmZyb20oXG4gICAgICAgICAgICB0aGlzLnN0YXRlIHx8IHt9LFxuICAgICAgICAgICAgOjp0aGlzLnNldHRlckNhbGxiYWNrXG4gICAgICAgICk7XG4gICAgfTtcbiAgICBpbml0Q29tcHV0ZWQoKSB7XG4gICAgICAgIHdhbGsoXG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVkLFxuICAgICAgICAgICAgKG5hbWUsIGdldHRlciwgY29tcHV0ZWQpID0+IHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29tcHV0ZWQsIG5hbWUsIHtcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgZ2V0OiB0aGlzOjpnZXR0ZXJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgfVxuICAgIHNldHRlckNhbGxiYWNrKG9iaiwga2V5LCB2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKG9iaiAhPT0gdGhpcy5zdGF0ZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQk9PTSEhIScpO1xuICAgICAgICB0aGlzLmRpZmZBbmRQYXRjaCgpO1xuICAgIH07XG5cbiAgICAvLyBSZW5kZXJcbiAgICBiZWZvcmVSZW5kZXIoKSB7XG4gICAgICAgIHRoaXMuaW5pdE9ic2VydmVyKCk7XG4gICAgICAgIHRoaXMuaW5pdENvbXB1dGVkKCk7XG4gICAgfTtcbiAgICByZW5kZXIoKSB7fTtcbiAgICByZW5kZXJUbyhlbnRyeSkge1xuICAgICAgICB0aGlzLmJlZm9yZVJlbmRlcigpO1xuICAgICAgICB0aGlzLm5vZGUgPSB0aGlzLnJlbmRlcigpO1xuICAgICAgICB0aGlzLmVudHJ5ID0gZW50cnk7XG4gICAgICAgIHRoaXMuZW50cnkuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudCh0aGlzLm5vZGUpKVxuICAgIH07XG4gICAgZGlmZkFuZFBhdGNoKCkge1xuICAgICAgICBjb25zdCBvbGROb2RlID0gdGhpcy5ub2RlO1xuICAgICAgICB0aGlzLm5vZGUgPSB0aGlzLnJlbmRlcigpO1xuICAgICAgICBjb25zdCBwYXRjaGVzID0gZGlmZih0aGlzLm5vZGUsIG9sZE5vZGUpO1xuICAgICAgICBwYXRjaCh0aGlzLmVudHJ5LCBwYXRjaGVzKTtcbiAgICB9O1xufVxuXG5cblxuZXhwb3J0IGRlZmF1bHQgQ29tcG9uZW50O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9pbmRleC5qcyIsIlxuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gJy4vY3JlYXRlJztcbmltcG9ydCB7IGRpZmYgfSBmcm9tICcuL2RpZmYnO1xuaW1wb3J0IHsgcGF0Y2ggfSBmcm9tICcuL3BhdGNoJztcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzJztcblxuXG5leHBvcnQge1xuICAgIGNyZWF0ZUVsZW1lbnQsXG4gICAgZGlmZixcbiAgICBwYXRjaCxcbiAgICB1dGlsc1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vaW5kZXguanMiLCJcbmNvbnN0IGV2ZW50VHlwZXMgPSBbXG4gICAgLy8gQ2xpcGJvYXJkIEV2ZW50c1xuICAgICdvbkNvcHknLCAnb25DdXQnLCAnb25QYXN0ZScsXG4gICAgLy8gQ29tcG9zaXRpb24gRXZlbnRzXG4gICAgJ29uQ29tcG9zaXRpb25FbmQnLCAnb25Db21wb3NpdGlvblN0YXJ0JywgJ29uQ29tcG9zaXRpb25VcGRhdGUnLFxuICAgIC8vIEtleWJvYXJkIEV2ZW50c1xuICAgICdvbktleURvd24nLCAnb25LZXlQcmVzcycsICdvbktleVVwJyxcbiAgICAvLyBGb2N1cyBFdmVudHNcbiAgICAnb25Gb2N1cycsICdvbkJsdXInLFxuICAgIC8vIEZvcm0gRXZlbnRzXG4gICAgJ29uQ2hhbmdlJywgJ29uSW5wdXQnLCAnb25JbnZhbGlkJywgJ29uU3VibWl0JyxcbiAgICAvLyBNb3VzZSBFdmVudHNcbiAgICAnb25DbGljaycsICdvbkNvbnRleHRNZW51JywgJ29uRG91YmxlQ2xpY2snLFxuICAgICdvbkRyYWcnLCAnb25EcmFnRW5kJywgJ29uRHJhZ0VudGVyJywgJ29uRHJhZ0V4aXQnLFxuICAgICdvbkRyYWdMZWF2ZScsICdvbkRyYWdPdmVyJywgJ29uRHJhZ1N0YXJ0JyxcbiAgICAnb25Ecm9wJywgJ29uTW91c2VEb3duJywgJ29uTW91c2VFbnRlcicsXG4gICAgJ29uTW91c2VMZWF2ZScsICdvbk1vdXNlTW92ZScsICdvbk1vdXNlT3V0JyxcbiAgICAnb25Nb3VzZU92ZXInICwnb25Nb3VzZVVwJyxcbiAgICAvLyBTZWxlY3Rpb24gRXZlbnRzXG4gICAgJ29uU2VsZWN0JyxcbiAgICAvLyBUb3VjaCBFdmVudHNcbiAgICAnb25Ub3VjaENhbmNlbCcsICdvblRvdWNoRW5kJywgJ29uVG91Y2hNb3ZlJywgJ29uVG91Y2hTdGFydCcsXG4gICAgLy8gVUkgRXZlbnRzXG4gICAgJ29uU2Nyb2xsJyxcbiAgICAvLyBXaGVlbCBFdmVudHNcbiAgICAnb25XaGVlbCcsXG4gICAgLy8gTWVkaWEgRXZlbnRzXG4gICAgJ29uQWJvcnQnLCAnb25DYW5QbGF5JywgJ29uQ2FuUGxheVRocm91Z2gnLFxuICAgICdvbkR1cmF0aW9uQ2hhbmdlJywgJ29uRW1wdGllZCcsICdvbkVuY3J5cHRlZG9uRW5kZWQnLFxuICAgICdvbkVycm9yJywgJ29uTG9hZGVkRGF0YScsICdvbkxvYWRlZE1ldGFkYXRhJyxcbiAgICAnb25Mb2FkU3RhcnQnLCAnb25QYXVzZScsICdvblBsYXlvblBsYXlpbmcnLFxuICAgICdvblByb2dyZXNzJywgJ29uUmF0ZUNoYW5nZScsICdvblNlZWtlZCcsXG4gICAgJ29uU2Vla2luZycsICdvblN0YWxsZWQnLCAnb25TdXNwZW5kb25UaW1lVXBkYXRlJyxcbiAgICAnb25Wb2x1bWVDaGFuZ2UnLCAnb25XYWl0aW5nJyxcbiAgICAvLyBJbWFnZSBFdmVudHNcbiAgICAnb25Mb2FkJywgJ29uRXJyb3InLFxuICAgIC8vIEFuaW1hdGlvbiBFdmVudHNcbiAgICAnb25BbmltYXRpb25TdGFydCcsICdvbkFuaW1hdGlvbkVuZCcsICdvbkFuaW1hdGlvbkl0ZXJhdGlvbicsXG4gICAgLy8gVHJhbnNpdGlvbiBFdmVudHNcbiAgICAnb25UcmFuc2l0aW9uRW5kJyxcbiAgICAvLyBPdGhlciBFdmVudHNcbiAgICAnb25Ub2dnbGUnXG5dO1xuXG5cbmNvbnN0IGV2ZW50TWFwID0gZXZlbnRUeXBlcy5yZWR1Y2UoKGV2ZW50c01hcCwgZXZlbnQpID0+IHtcbiAgICBldmVudHNNYXBbZXZlbnRdID0gZXZlbnRcbiAgICAgICAgLnJlcGxhY2UoJ29uJywgJycpXG4gICAgICAgIC5yZXBsYWNlKC9bQS1aXS8sIGUgPT4gZS50b0xvd2VyQ2FzZSgpKTtcbiAgICByZXR1cm4gZXZlbnRzTWFwO1xufSwge30pO1xuXG5cbmV4cG9ydCB7XG4gICAgZXZlbnRUeXBlcyxcbiAgICBldmVudE1hcFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vdXRpbHMvZXZlbnRzLmpzIiwiXG5pbXBvcnQgeyBDaGFuZ2VUeXBlIH0gZnJvbSAnLi4vdHlwZXMvaW5kZXgnO1xuXG5cblxuZnVuY3Rpb24gZGlmZihuZXdOb2RlLCBvbGROb2RlKSB7XG4gICAgLypcbiAgICByZXR1cm4gdHlwZSBQYXRjaCB7XG4gICAgICAgIHR5cGU6IENoYW5nZVR5cGVcbiAgICAgICAgbmV3Tm9kZT86IE5vZGVcbiAgICAgICAgY2hpbGRyZW4/OiBQYXRjaFtdXG4gICAgICAgIGF0dHJpYnV0ZXM/OiBQYXRjaFtdXG4gICAgfVxuICAgICAqL1xuICAgIGlmICghb2xkTm9kZSkgcmV0dXJuIHsgdHlwZTogQ2hhbmdlVHlwZS5DUkVBVEUsIG5ld05vZGUgfTtcbiAgICBlbHNlIGlmICghbmV3Tm9kZSkgcmV0dXJuIHsgdHlwZTogQ2hhbmdlVHlwZS5SRU1PVkUgfTtcbiAgICBlbHNlIGlmIChpc0NoYW5nZWQobmV3Tm9kZSwgb2xkTm9kZSkpIHJldHVybiB7IHR5cGU6IENoYW5nZVR5cGUuUkVQTEFDRSwgbmV3Tm9kZSB9O1xuICAgIGVsc2UgaWYgKG5ld05vZGUuZWxlbWVudE5hbWUpXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlLlVQREFURSxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBkaWZmQ2hpbGRyZW4obmV3Tm9kZSwgb2xkTm9kZSksXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBkaWZmQXR0cmlidXRlcyhuZXdOb2RlLCBvbGROb2RlKVxuICAgICAgICB9O1xufVxuXG5mdW5jdGlvbiBpc0NoYW5nZWQobmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIHJldHVybiB0eXBlb2YgbmV3Tm9kZSAhPT0gdHlwZW9mIG9sZE5vZGUgfHxcbiAgICAgICAgdHlwZW9mIG5ld05vZGUgIT09IFwib2JqZWN0XCIgJiYgbmV3Tm9kZSAhPT0gb2xkTm9kZSB8fFxuICAgICAgICB0eXBlb2YgbmV3Tm9kZSA9PT0gXCJvYmplY3RcIiAmJiBuZXdOb2RlLmVsZW1lbnROYW1lICE9PSBvbGROb2RlLmVsZW1lbnROYW1lO1xufVxuXG5mdW5jdGlvbiBkaWZmQXR0cmlidXRlcyhuZXdOb2RlLCBvbGROb2RlKSB7XG4gICAgY29uc3QgcGF0Y2hlcyAgPSBbXTtcbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gey4uLm9sZE5vZGUuYXR0cmlidXRlcywgLi4ubmV3Tm9kZS5hdHRyaWJ1dGVzfTtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5tYXAoYXR0ck5hbWUgPT4ge1xuICAgICAgICBjb25zdCBuZXdBdHRyID0gbmV3Tm9kZS5hdHRyaWJ1dGVzW2F0dHJOYW1lXTtcbiAgICAgICAgY29uc3Qgb2xkQXR0ciA9IG9sZE5vZGUuYXR0cmlidXRlc1thdHRyTmFtZV07XG4gICAgICAgICFuZXdBdHRyICYmIHBhdGNoZXMucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlLlJFTU9WRV9QUk9QUyxcbiAgICAgICAgICAgIHZhbHVlOiBvbGRBdHRyLCBhdHRyTmFtZVxuICAgICAgICB9KTtcbiAgICAgICAgKCFvbGRBdHRyIHx8IG9sZEF0dHIgIT09IG5ld0F0dHIpICYmIHBhdGNoZXMucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlLlNFVF9QUk9QUyxcbiAgICAgICAgICAgIHZhbHVlOiBuZXdBdHRyLCBhdHRyTmFtZVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gcGF0Y2hlcztcbn1cblxuXG5mdW5jdGlvbiBkaWZmQ2hpbGRyZW4obmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIHJldHVybiBbLi4uQXJyYXkoTWF0aC5tYXgoXG4gICAgICAgIG5ld05vZGUuY2hpbGRyZW4ubGVuZ3RoLFxuICAgICAgICBvbGROb2RlLmNoaWxkcmVuLmxlbmd0aFxuICAgICkpLmtleXMoKV0ubWFwKGkgPT4gZGlmZihuZXdOb2RlLmNoaWxkcmVuW2ldLCBvbGROb2RlLmNoaWxkcmVuW2ldKSk7XG59XG5cblxuZXhwb3J0IHtcbiAgICBkaWZmXG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL2RpZmYvaW5kZXguanMiLCJcbmNvbnN0IENoYW5nZWQgPSB7XG4gICAgQ1JFQVRFOiAnQ1JFQVRFJyxcbiAgICBSRU1PVkU6ICdSRU1PVkUnLFxuICAgIFJFUExBQ0U6ICdSRVBMQUNFJyxcbiAgICBVUERBVEU6ICdVUERBVEUnLFxuICAgIFNFVF9QUk9QUzogJ1NFVCBQUk9QUycsXG4gICAgUkVNT1ZFX1BST1BTOiAnUkVNT1ZFIFBST1BTJ1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBDaGFuZ2VkO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vdHlwZXMvY2hhbmdlLmpzIiwiXG5pbXBvcnQgeyBDaGFuZ2VUeXBlIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gJy4uL2NyZWF0ZS9pbmRleCc7XG5pbXBvcnQgeyBzZXRBdHRyaWJ1dGUsIHJlbW92ZUF0dHJpYnV0ZSB9IGZyb20gXCIuLi91dGlscy9pbmRleFwiO1xuXG5cblxuZnVuY3Rpb24gcGF0Y2gocGFyZW50LCBwYXRjaGVzLCBpbmRleD0wKSB7XG4gICAgaWYgKCFwYXRjaGVzKSByZXR1cm47XG4gICAgY29uc3QgZWwgPSBwYXJlbnQuY2hpbGROb2Rlc1tpbmRleF07XG4gICAgc3dpdGNoIChwYXRjaGVzLnR5cGUpIHtcbiAgICAgICAgY2FzZSBDaGFuZ2VUeXBlLkNSRUFURToge1xuICAgICAgICAgICAgY29uc3QgeyBuZXdOb2RlIH0gPSBwYXRjaGVzO1xuICAgICAgICAgICAgY29uc3QgbmV3RWwgPSBjcmVhdGVFbGVtZW50KG5ld05vZGUpO1xuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKG5ld0VsKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQ2hhbmdlVHlwZS5SRU1PVkU6IHtcbiAgICAgICAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChlbCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENoYW5nZVR5cGUuUkVQTEFDRToge1xuICAgICAgICAgICAgY29uc3QgeyBuZXdOb2RlIH0gPSBwYXRjaGVzO1xuICAgICAgICAgICAgY29uc3QgbmV3RWwgPSBjcmVhdGVFbGVtZW50KG5ld05vZGUpO1xuICAgICAgICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZChuZXdFbCwgZWwpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBDaGFuZ2VUeXBlLlVQREFURToge1xuICAgICAgICAgICAgY29uc3QgeyBjaGlsZHJlbiwgYXR0cmlidXRlcyB9ID0gcGF0Y2hlcztcbiAgICAgICAgICAgIHBhdGNoQXR0cmlidXRlcyhlbCwgYXR0cmlidXRlcyk7XG4gICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZCwgaW5kZXgpID0+IHBhdGNoKGVsLCBjaGlsZCwgaW5kZXgpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBwYXRjaEF0dHJpYnV0ZXMoZWxlbWVudCwgYXR0cmlidXRlcykge1xuICAgIGF0dHJpYnV0ZXMuZm9yRWFjaChwYXRjaCA9PiB7XG4gICAgICAgIGNvbnN0IHsgdHlwZSwgYXR0ck5hbWUsIHZhbHVlIH0gPSBwYXRjaDtcbiAgICAgICAgaWYgKHR5cGUgPT09IENoYW5nZVR5cGUuU0VUX1BST1BTKVxuICAgICAgICAgICAgc2V0QXR0cmlidXRlKGVsZW1lbnQsIGF0dHJOYW1lLCB2YWx1ZSk7XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT09IENoYW5nZVR5cGUuUkVNT1ZFX1BST1BTKVxuICAgICAgICAgICAgcmVtb3ZlQXR0cmlidXRlKGVsZW1lbnQsIGF0dHJOYW1lLCB2YWx1ZSlcbiAgICB9KVxufVxuXG5cbmV4cG9ydCB7XG4gICAgcGF0Y2hcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3BhdGNoL2luZGV4LmpzIiwiXG5pbXBvcnQgT2JzZXJ2ZXIgZnJvbSAnLi9vYmplY3QnO1xuaW1wb3J0IE9ic2VydmVyQXJyYXkgZnJvbSAnLi9hcnJheSc7XG5pbXBvcnQgeyB3YWxrLCBvYnNlcnZlciB9IGZyb20gJy4vdXRpbHMnO1xuXG5cbmV4cG9ydCB7XG4gICAgT2JzZXJ2ZXIsXG4gICAgT2JzZXJ2ZXJBcnJheSxcbiAgICB3YWxrLCBvYnNlcnZlclxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9vYnNlcnZlci9pbmRleC5qcyIsIlxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi4vaW5kZXgnO1xuXG5cblxuY2xhc3MgQXBwIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgbmFtZTogJ0pvZScsXG4gICAgICAgIGFnZTogMjJcbiAgICB9XG5cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgICAgY2FuRHJpdmUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5hZ2UgJSAyID09PSAwXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGhhbmRsZUNsaWNrID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnN0YXRlLmFnZSArKztcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7IHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8cD5JJ20ge3RoaXMuc3RhdGUubmFtZX0uPC9wPlxuICAgICAgICAgICAgPHA+SSdtIHt0aGlzLnN0YXRlLmFnZX0geWVhcnMgb2xkLjwvcD5cbiAgICAgICAgICAgIDxwPkkge3RoaXMuY29tcHV0ZWQuY2FuRHJpdmUgPyAnY2FuJyA6ICdjYW4gbm90J30gRHJpdmU8L3A+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja31cbiAgICAgICAgICAgID5DbGljayBNZTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICApfVxufVxuXG5cblxuY29uc3QgYXBwID0gbmV3IEFwcCgpO1xuYXBwLnJlbmRlclRvKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JykpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZXhhbXBsZS9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=