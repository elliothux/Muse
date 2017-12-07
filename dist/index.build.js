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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjgzMTc3M2VkMDJjY2VkZDQ2ZDkiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci91dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9jcmVhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdHlwZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci9vYmplY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci9hcnJheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3V0aWxzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9kaWZmL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3R5cGVzL2NoYW5nZS5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9wYXRjaC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL29ic2VydmVyL2luZGV4LmpzIl0sIm5hbWVzIjpbInNldEF0dHJpYnV0ZXMiLCJ0YXJnZXQiLCJhdHRyaWJ1dGVzIiwiT2JqZWN0Iiwia2V5cyIsImZpbHRlciIsImhhc093blByb3BlcnR5Iiwia2V5IiwiZm9yRWFjaCIsInNldEF0dHJpYnV0ZSIsImF0dHJOYW1lIiwiYXR0clZhbHVlIiwiaW5jbHVkZXMiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlQXR0cmlidXRlIiwib2xkQXR0clZhbHVlIiwibm9vcCIsIndhbGsiLCJvYmoiLCJmdW4iLCJUeXBlRXJyb3IiLCJBcnJheSIsImlzQXJyYXkiLCJpdGVtIiwiaW5kZXgiLCJvYnNlcnZlciIsInZhbHVlIiwic2V0dGVyQ2FsbGJhY2siLCJnZXR0ZXJDYWxsYmFjayIsImZyb20iLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJnZXQiLCJzZXQiLCJvbGRWYWx1ZSIsIm5ld1ZhbHVlIiwiZ2V0VW5pcXVlSUQiLCJpZCIsImNyZWF0ZUVsZW1lbnQiLCJub2RlIiwiZWwiLCJkb2N1bWVudCIsImVsZW1lbnROYW1lIiwiY2hpbGRyZW4iLCJhcHBlbmRDaGlsZHJlbiIsImNyZWF0ZVRleHROb2RlIiwibWFwIiwiYXBwZW5kQ2hpbGQiLCJDaGFuZ2VUeXBlIiwiT2JzZXJ2ZXIiLCJ0b1N0cmluZyIsIk9ic2VydmVyQXJyYXkiLCJhcnJheSIsImxlbmd0aCIsImlzT2JzZXJ2ZXJBcnJheSIsIl9fcHJvdG9fXyIsImNvbnN0cnVjdG9yIiwib2YiLCJhcmdzIiwiY29uY2F0IiwiYXJyYXlzIiwibmV3QXJyYXkiLCJwdXNoIiwiY29weVdpdGhpbiIsImVudHJpZXMiLCJldmVyeSIsImZpbGwiLCJmaW5kIiwiZmluZEluZGV4IiwiaW5kZXhPZiIsImpvaW4iLCJsYXN0SW5kZXhPZiIsInBvcCIsInJlZHVjZSIsInJlZHVjZVJpZ2h0IiwicmV2ZXJzZSIsInNoaWZ0Iiwic2xpY2UiLCJzb21lIiwic29ydCIsInNwbGljZSIsInRvTG9jYWxlU3RyaW5nIiwidG9Tb3VyY2UiLCJ1bnNoaWZ0IiwidmFsdWVzIiwiQ29tcG9uZW50IiwiZW50cnkiLCJzdGF0ZSIsImNvbXB1dGVkIiwibmFtZSIsImdldHRlciIsIkVycm9yIiwiZGlmZkFuZFBhdGNoIiwiaW5pdE9ic2VydmVyIiwiaW5pdENvbXB1dGVkIiwiYmVmb3JlUmVuZGVyIiwicmVuZGVyIiwib2xkTm9kZSIsInBhdGNoZXMiLCJkaWZmIiwicGF0Y2giLCJ1dGlscyIsImV2ZW50VHlwZXMiLCJldmVudE1hcCIsImV2ZW50c01hcCIsImV2ZW50IiwicmVwbGFjZSIsImUiLCJ0b0xvd2VyQ2FzZSIsIm5ld05vZGUiLCJ0eXBlIiwiQ1JFQVRFIiwiUkVNT1ZFIiwiaXNDaGFuZ2VkIiwiUkVQTEFDRSIsIlVQREFURSIsImRpZmZDaGlsZHJlbiIsImRpZmZBdHRyaWJ1dGVzIiwibmV3QXR0ciIsIm9sZEF0dHIiLCJSRU1PVkVfUFJPUFMiLCJTRVRfUFJPUFMiLCJNYXRoIiwibWF4IiwiaSIsIkNoYW5nZWQiLCJwYXJlbnQiLCJjaGlsZE5vZGVzIiwibmV3RWwiLCJyZW1vdmVDaGlsZCIsInJlcGxhY2VDaGlsZCIsInBhdGNoQXR0cmlidXRlcyIsImNoaWxkIiwiZWxlbWVudCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM1REE7O0FBSUEsU0FBU0EsYUFBVCxDQUF1QkMsTUFBdkIsRUFBOEM7QUFBQSxRQUFmQyxVQUFlLHVFQUFKLEVBQUk7O0FBQzFDQyxXQUFPQyxJQUFQLENBQVlGLFVBQVosRUFDS0csTUFETCxDQUNZO0FBQUEsZUFBT0gsV0FBV0ksY0FBWCxDQUEwQkMsR0FBMUIsQ0FBUDtBQUFBLEtBRFosRUFFS0MsT0FGTCxDQUVhO0FBQUEsZUFBWUMsYUFBYVIsTUFBYixFQUFxQlMsUUFBckIsRUFBK0JSLFdBQVdRLFFBQVgsQ0FBL0IsQ0FBWjtBQUFBLEtBRmI7QUFHSDs7QUFHRCxTQUFTRCxZQUFULENBQXNCUixNQUF0QixFQUE4QlMsUUFBOUIsRUFBd0NDLFNB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REU7O0FBRXBCa0ksZ0NBQWdCM0YsRUFBaEIsRUFBb0J2QyxVQUFwQjtBQUNBMEMseUJBQVNwQyxPQUFULENBQWlCLFVBQUM2SCxLQUFELEVBQVE3RyxLQUFSO0FBQUEsMkJBQWtCNkUsTUFBTTVELEVBQU4sRUFBVTRGLEtBQVYsRUFBaUI3RyxLQUFqQixDQUFsQjtBQUFBLGlCQUFqQjtBQUNBO0FBQ0g7QUF0Qkw7QUF3Qkg7O0FBRUQsU0FBUzRHLGVBQVQsQ0FBeUJFLE9BQXpCLEVBQWtDcEksVUFBbEMsRUFBOEM7QUFDMUNBLGVBQVdNLE9BQVgsQ0FBbUIsaUJBQVM7QUFBQSxZQUNoQnVHLElBRGdCLEdBQ1VWLEtBRFYsQ0FDaEJVLElBRGdCO0FBQUEsWUFDVnJHLFFBRFUsR0FDVTJGLEtBRFYsQ0FDVjNGLFFBRFU7QUFBQSxZQUNBZ0IsS0FEQSxHQUNVMkUsS0FEVixDQUNBM0UsS0FEQTs7QUFFeEIsWUFBSXFGLFNBQVMsa0JBQVdXLFNBQXhCLEVBQ0ksMEJBQWFZLE9BQWIsRUFBc0I1SCxRQUF0QixFQUFnQ2dCLEtBQWhDLEVBREosS0FFSyxJQUFJcUYsU0FBUyxrQkFBV1UsWUFBeEIsRUFDRCw2QkFBZ0JhLE9BQWhCLEVBQXlCNUgsUUFBekIsRUFBbUNnQixLQUFuQztBQUNQLEtBTkQ7QUFPSDs7UUFJRzJFLEssR0FBQUEsSzs7Ozs7Ozs7Ozs7Ozs7QUMvQ0o7Ozs7QUFDQTs7OztBQUNBOzs7O1FBSUluRCxRO1FBQ0FFLGE7UUFDQW5DLEk7UUFBTVEsUSIsImZpbGUiOiJpbmRleC5idWlsZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9hc3NldHMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMjgzMTc3M2VkMDJjY2VkZDQ2ZDkiLCJcbmltcG9ydCB7IGV2ZW50VHlwZXMsIGV2ZW50TWFwIH0gZnJvbSAnLi9ldmVudHMnO1xuXG5cblxuZnVuY3Rpb24gc2V0QXR0cmlidXRlcyh0YXJnZXQsIGF0dHJpYnV0ZXM9e30pIHtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKVxuICAgICAgICAuZmlsdGVyKGtleSA9PiBhdHRyaWJ1dGVzLmhhc093blByb3BlcnR5KGtleSkpXG4gICAgICAgIC5mb3JFYWNoKGF0dHJOYW1lID0+IHNldEF0dHJpYnV0ZSh0YXJnZXQsIGF0dHJOYW1lLCBhdHRyaWJ1dGVzW2F0dHJOYW1lXSkpO1xufVxuXG5cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZSh0YXJnZXQsIGF0dHJOYW1lLCBhdHRyVmFsdWUpIHtcbiAgICBhdHRyTmFtZSA9PT0gJ2NsYXNzTmFtZScgJiYgKGF0dHJOYW1lID0gJ2NsYXNzJyk7XG4gICAgaWYgKGV2ZW50VHlwZXMuaW5jbHVkZXMoYXR0ck5hbWUpKVxuICAgICAgICByZXR1cm4gdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICBldmVudE1hcFthdHRyTmFtZV0sXG4gICAgICAgICAgICBhdHRyVmFsdWVcbiAgICAgICAgKTtcbiAgICB0YXJnZXQuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsdWUpO1xufVxuXG5cbmZ1bmN0aW9uIHJlbW92ZUF0dHJpYnV0ZSh0YXJnZXQsIGF0dHJOYW1lLCBvbGRBdHRyVmFsdWUpIHtcbiAgICBhdHRyTmFtZSA9PT0gJ2NsYXNzTmFtZScgJiYgKGF0dHJOYW1lID0gJ2NsYXNzJyk7XG4gICAgaWYgKGV2ZW50VHlwZXMuaW5jbHVkZXMoYXR0ck5hbWUpKVxuICAgICAgICByZXR1cm4gdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICBldmVudE1hcFthdHRyTmFtZV0sXG4gICAgICAgICAgICBvbGRBdHRyVmFsdWVcbiAgICAgICAgKTtcbiAgICB0YXJnZXQucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcbn1cblxuXG5cbmV4cG9ydCB7XG4gICAgc2V0QXR0cmlidXRlcyxcbiAgICBzZXRBdHRyaWJ1dGUsXG4gICAgcmVtb3ZlQXR0cmlidXRlXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS91dGlscy9pbmRleC5qcyIsIlxuaW1wb3J0IE9ic2VydmVyIGZyb20gJy4uL29iamVjdCc7XG5pbXBvcnQgT2JzZXJ2ZXJBcnJheSBmcm9tICcuLi9hcnJheSc7XG5cblxuY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xuXG5cblxuZnVuY3Rpb24gd2FsayhvYmosIGZ1bikge1xuICAgIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JylcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRnVuY3Rpb24gXCJ3YWxrXCIgcmVxdWlyZSBhbiBcIm9iamVjdFwiIGluc3RlYWQgb2YgJHt0eXBlb2Ygb2JqfWApO1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpXG4gICAgICAgIHJldHVybiBvYmouZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IGZ1bihpbmRleCwgaXRlbSwgb2JqKSk7XG4gICAgZWxzZVxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiBmdW4oa2V5LCBvYmpba2V5XSwgb2JqKSk7XG59XG5cbmZ1bmN0aW9uIG9ic2VydmVyKG9iaiwga2V5LCB2YWx1ZSwgc2V0dGVyQ2FsbGJhY2s9bm9vcCwgZ2V0dGVyQ2FsbGJhY2s9bm9vcCkge1xuICAgIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JylcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRnVuY3Rpb24gXCJvYnNlcnZlclwiIHJlcXVpcmUgYW4gXCJvYmplY3RcIiBpbnN0ZWFkIG9mICR7dHlwZW9mIG9ian1gKTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSlcbiAgICAgICAgdmFsdWUgPSBPYnNlcnZlckFycmF5LmZyb20odmFsdWUpO1xuICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgdmFsdWUgPSBPYnNlcnZlci5mcm9tKHZhbHVlKTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGdldDogKCkgPT4ge1xuICAgICAgICAgICAgZ2V0dGVyQ2FsbGJhY2sob2JqLCBrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICB9LFxuICAgICAgICBzZXQ6IG5ld1ZhbHVlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9sZFZhbHVlID0gb2JqW2tleV07XG4gICAgICAgICAgICBvYnNlcnZlcihvYmosIGtleSwgbmV3VmFsdWUsIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFjayk7XG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjayhvYmosIGtleSwgbmV3VmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0pXG59XG5cblxuY29uc3QgZ2V0VW5pcXVlSUQgPSBmdW5jdGlvbigpIHtcbiAgICBsZXQgaWQgPSAwO1xuICAgIHJldHVybiAoKCkgPT4gaWQgKyspO1xufSgpO1xuXG5cbmV4cG9ydCB7XG4gICAgd2FsayxcbiAgICBvYnNlcnZlcixcbiAgICBnZXRVbmlxdWVJRFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9vYnNlcnZlci91dGlscy9pbmRleC5qcyIsIlxuaW1wb3J0IHsgc2V0QXR0cmlidXRlcyB9IGZyb20gJy4uL3V0aWxzJztcblxuXG5cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQobm9kZSkge1xuICAgIC8qXG4gICAgbm9kZTogU3RyaW5nIHx8IHtcbiAgICAgICAgZWxlbWVudE5hbWU6IFN0cmluZ1xuICAgICAgICBjaGlsZHJlbjogbm9kZVtdXG4gICAgICAgIGF0dHJpYnV0ZXM6IE9iamVjdFxuICAgIH1cbiAgICAqL1xuICAgIGlmICh0eXBlb2Ygbm9kZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5vZGUuZWxlbWVudE5hbWUpO1xuICAgICAgICBub2RlLmNoaWxkcmVuICYmIGFwcGVuZENoaWxkcmVuKGVsLCBub2RlLmNoaWxkcmVuKTtcbiAgICAgICAgc2V0QXR0cmlidXRlcyhlbCwgbm9kZS5hdHRyaWJ1dGVzKTtcbiAgICAgICAgcmV0dXJuIGVsO1xuICAgIH1cbiAgICBlbHNlIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShub2RlKTtcbn1cblxuXG5mdW5jdGlvbiBhcHBlbmRDaGlsZHJlbih0YXJnZXQsIGNoaWxkcmVuKSB7XG4gICAgY2hpbGRyZW4ubWFwKGNyZWF0ZUVsZW1lbnQpXG4gICAgICAgIC5mb3JFYWNoKDo6dGFyZ2V0LmFwcGVuZENoaWxkKVxufVxuXG5cblxuZXhwb3J0IHtcbiAgICBjcmVhdGVFbGVtZW50XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS9jcmVhdGUvaW5kZXguanMiLCJcbmltcG9ydCBDaGFuZ2VUeXBlIGZyb20gJy4vY2hhbmdlJztcblxuXG5leHBvcnQge1xuICAgIENoYW5nZVR5cGVcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3R5cGVzL2luZGV4LmpzIiwiXG5pbXBvcnQgeyB3YWxrLCBvYnNlcnZlciB9IGZyb20gJy4uL3V0aWxzL2luZGV4J1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2JzZXJ2ZXIge1xuICAgIGNvbnN0cnVjdG9yKG9iaiwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JqICE9PSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVHlwZSBcIk9iamVjdFwiIHJlcXVpcmVkIScpO1xuICAgICAgICB3YWxrKG9iaiwgKGtleSwgdmFsdWUpID0+IG9ic2VydmVyKFxuICAgICAgICAgICAgdGhpcywga2V5LCB2YWx1ZSxcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrLFxuICAgICAgICAgICAgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGZyb20gPSAob2JqLCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZlcihcbiAgICAgICAgICAgIG9iaixcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrLFxuICAgICAgICAgICAgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKVxuICAgIH07XG5cbiAgICBzdGF0aWMgdG9TdHJpbmcgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBgT2JzZXJ2ZXIgJHt0aGlzfWBcbiAgICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9vYnNlcnZlci9vYmplY3QvaW5kZXguanMiLCJcbmltcG9ydCB7IHdhbGssIG9ic2VydmVyIH0gZnJvbSAnLi4vdXRpbHMvaW5kZXgnO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2JzZXJ2ZXJBcnJheSB7XG4gICAgY29uc3RydWN0b3IoYXJyYXksIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFjaykge1xuICAgICAgICAhYXJyYXkgJiYgKGFycmF5ID0gW10pO1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyYXkpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVHlwZSBcIkFycmF5XCIgcmVxdWlyZWQhJyk7XG4gICAgICAgIHdhbGsoYXJyYXksIChpbmRleCwgaXRlbSkgPT4gb2JzZXJ2ZXIoXG4gICAgICAgICAgICB0aGlzLCBpbmRleCwgaXRlbSxcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFja1xuICAgICAgICApKTtcbiAgICAgICAgdGhpcy5sZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgZnJvbSA9IChhcnJheSwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2ZXJBcnJheShcbiAgICAgICAgICAgIGFycmF5LFxuICAgICAgICAgICAgc2V0dGVyQ2FsbGJhY2ssXG4gICAgICAgICAgICBnZXR0ZXJDYWxsYmFja1xuICAgICAgICApXG4gICAgfTtcbiAgICBzdGF0aWMgaXNPYnNlcnZlckFycmF5ICA9IGFycmF5ID0+IHtcbiAgICAgICAgcmV0dXJuIGFycmF5Ll9fcHJvdG9fXy5jb25zdHJ1Y3RvciA9PT0gT2JzZXJ2ZXJBcnJheTtcbiAgICB9O1xuICAgIHN0YXRpYyBvZiA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2ZXJBcnJheShbLi4uYXJnc10pXG4gICAgfTtcblxuXG4gICAgY29uY2F0ID0gKC4uLmFycmF5cykgPT4ge1xuICAgICAgICBjb25zdCBuZXdBcnJheSA9IG5ldyBPYnNlcnZlckFycmF5KCk7XG4gICAgICAgIFt0aGlzLCAuLi5hcnJheXNdLmZvckVhY2goXG4gICAgICAgICAgICBhcnJheSA9PiBhcnJheS5mb3JFYWNoKG5ld0FycmF5LnB1c2gpXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBuZXdBcnJheTtcbiAgICB9O1xuICAgIGNvcHlXaXRoaW4gPSAoLi4uYXJncykgPT4ge1xuICAgICAgICAvLyBUT0RPXG4gICAgICAgIHJldHVybiBPYnNlcnZlckFycmF5LmZyb20oXG4gICAgICAgICAgICBBcnJheS5mcm9tKHRoaXMpLmNvcHlXaXRoaW4oLi4uYXJncylcbiAgICAgICAgKVxuICAgIH07XG4gICAgZW50cmllcyA9IGZ1bmN0aW9uICooKSB7XG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIHdoaWxlICh0aGlzW2luZGV4XSlcbiAgICAgICAgICAgIHlpZWxkIFtpbmRleCsrLCB0aGlzW2luZGV4XV07XG4gICAgfTtcbiAgICBldmVyeSA9ICgpID0+IHt9O1xuICAgIGZpbGwgPSAoKSA9PiB7fTtcbiAgICBmaWx0ZXIgPSAoKSA9PiB7fTtcbiAgICBmaW5kID0gKCkgPT4ge307XG4gICAgZmluZEluZGV4ID0gKCkgPT4ge307XG4gICAgZm9yRWFjaCA9ICgpID0+IHt9O1xuICAgIGluY2x1ZGVzID0gKCkgPT4ge307XG4gICAgaW5kZXhPZiA9ICgpID0+IHt9O1xuICAgIGpvaW4gPSAoKSA9PiB7fTtcbiAgICBrZXlzID0gKCkgPT4ge307XG4gICAgbGFzdEluZGV4T2YgPSAoKSA9PiB7fTtcbiAgICBtYXAgPSAoKSA9PiB7fTtcbiAgICBwb3AgPSAoKSA9PiB7fTtcbiAgICBwdXNoID0gdmFsdWUgPT4ge1xuICAgICAgICBvYnNlcnZlcihcbiAgICAgICAgICAgIHRoaXMsIHRoaXMubGVuZ3RoLCB2YWx1ZSxcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFja1xuICAgICAgICApO1xuICAgICAgICB0aGlzLmxlbmd0aCArKztcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gICAgcmVkdWNlID0gKCkgPT4ge307XG4gICAgcmVkdWNlUmlnaHQgPSAoKSA9PiB7fTtcbiAgICByZXZlcnNlID0gKCkgPT4ge307XG4gICAgc2hpZnQgPSAoKSA9PiB7fTtcbiAgICBzbGljZSA9ICgpID0+IHt9O1xuICAgIHNvbWUgPSAoKSA9PiB7fTtcbiAgICBzb3J0ID0gKCkgPT4ge307XG4gICAgc3BsaWNlID0gKCkgPT4ge307XG4gICAgdG9Mb2NhbGVTdHJpbmcgPSAoKSA9PiB7fTtcbiAgICB0b1NvdXJjZSA9ICgpID0+IHt9O1xuICAgIHRvU3RyaW5nID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gYE9ic2VydmVyQXJyYXkgWy4uLl1gXG4gICAgfTtcbiAgICB1bnNoaWZ0ID0gKCkgPT4ge307XG4gICAgdmFsdWVzID0gKCkgPT4ge307XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL29ic2VydmVyL2FycmF5L2luZGV4LmpzIiwiXG5pbXBvcnQgQ29tcG9uZW50IGZyb20gJy4vY29yZSc7XG5cblxuXG5leHBvcnQge1xuICAgIENvbXBvbmVudFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vaW5kZXguanMiLCJcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIGRpZmYsIHBhdGNoIH0gZnJvbSAnLi9kb20nO1xuaW1wb3J0IHsgT2JzZXJ2ZXIsIG9ic2VydmVyLCB3YWxrIH0gZnJvbSAnLi9vYnNlcnZlcic7XG5cblxuXG5jbGFzcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge31cblxuICAgIGVudHJ5ID0gbnVsbDtcbiAgICBub2RlID0gbnVsbDtcbiAgICBzdGF0ZSA9IHt9O1xuICAgIGNvbXB1dGVkID0ge307XG5cbiAgICAvLyBUT0RPOiBMaWZlQ3ljbGVcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7fTtcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHt9O1xuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKSB7fTtcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUoKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfTtcbiAgICBjb21wb25lbnRXaWxsVXBkYXRlKCkge307XG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge307XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7fTtcbiAgICBjb21wb25lbnREaWRDYXRjaCgpIHt9O1xuXG4gICAgLy8gT2JzZXJ2ZXJcbiAgICBpbml0T2JzZXJ2ZXIoKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBPYnNlcnZlci5mcm9tKFxuICAgICAgICAgICAgdGhpcy5zdGF0ZSB8fCB7fSxcbiAgICAgICAgICAgIDo6dGhpcy5zZXR0ZXJDYWxsYmFja1xuICAgICAgICApO1xuICAgIH07XG4gICAgaW5pdENvbXB1dGVkKCkge1xuICAgICAgICB3YWxrKFxuICAgICAgICAgICAgdGhpcy5jb21wdXRlZCxcbiAgICAgICAgICAgIChuYW1lLCBnZXR0ZXIsIGNvbXB1dGVkKSA9PiB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbXB1dGVkLCBuYW1lLCB7XG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGdldDogdGhpczo6Z2V0dGVyXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH1cbiAgICBzZXR0ZXJDYWxsYmFjayhvYmosIGtleSwgdmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmIChvYmogIT09IHRoaXMuc3RhdGUpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JPT00hISEnKTtcbiAgICAgICAgdGhpcy5kaWZmQW5kUGF0Y2goKTtcbiAgICB9O1xuXG4gICAgLy8gUmVuZGVyXG4gICAgYmVmb3JlUmVuZGVyKCkge1xuICAgICAgICB0aGlzLmluaXRPYnNlcnZlcigpO1xuICAgICAgICB0aGlzLmluaXRDb21wdXRlZCgpO1xuICAgIH07XG4gICAgcmVuZGVyKCkge307XG4gICAgcmVuZGVyVG8oZW50cnkpIHtcbiAgICAgICAgdGhpcy5iZWZvcmVSZW5kZXIoKTtcbiAgICAgICAgdGhpcy5ub2RlID0gdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgdGhpcy5lbnRyeSA9IGVudHJ5O1xuICAgICAgICB0aGlzLmVudHJ5LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQodGhpcy5ub2RlKSlcbiAgICB9O1xuICAgIGRpZmZBbmRQYXRjaCgpIHtcbiAgICAgICAgY29uc3Qgb2xkTm9kZSA9IHRoaXMubm9kZTtcbiAgICAgICAgdGhpcy5ub2RlID0gdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgY29uc3QgcGF0Y2hlcyA9IGRpZmYodGhpcy5ub2RlLCBvbGROb2RlKTtcbiAgICAgICAgcGF0Y2godGhpcy5lbnRyeSwgcGF0Y2hlcyk7XG4gICAgfTtcbn1cblxuXG5cbmV4cG9ydCBkZWZhdWx0IENvbXBvbmVudDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvaW5kZXguanMiLCJcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tICcuL2NyZWF0ZSc7XG5pbXBvcnQgeyBkaWZmIH0gZnJvbSAnLi9kaWZmJztcbmltcG9ydCB7IHBhdGNoIH0gZnJvbSAnLi9wYXRjaCc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XG5cblxuZXhwb3J0IHtcbiAgICBjcmVhdGVFbGVtZW50LFxuICAgIGRpZmYsXG4gICAgcGF0Y2gsXG4gICAgdXRpbHNcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL2luZGV4LmpzIiwiXG5jb25zdCBldmVudFR5cGVzID0gW1xuICAgIC8vIENsaXBib2FyZCBFdmVudHNcbiAgICAnb25Db3B5JywgJ29uQ3V0JywgJ29uUGFzdGUnLFxuICAgIC8vIENvbXBvc2l0aW9uIEV2ZW50c1xuICAgICdvbkNvbXBvc2l0aW9uRW5kJywgJ29uQ29tcG9zaXRpb25TdGFydCcsICdvbkNvbXBvc2l0aW9uVXBkYXRlJyxcbiAgICAvLyBLZXlib2FyZCBFdmVudHNcbiAgICAnb25LZXlEb3duJywgJ29uS2V5UHJlc3MnLCAnb25LZXlVcCcsXG4gICAgLy8gRm9jdXMgRXZlbnRzXG4gICAgJ29uRm9jdXMnLCAnb25CbHVyJyxcbiAgICAvLyBGb3JtIEV2ZW50c1xuICAgICdvbkNoYW5nZScsICdvbklucHV0JywgJ29uSW52YWxpZCcsICdvblN1Ym1pdCcsXG4gICAgLy8gTW91c2UgRXZlbnRzXG4gICAgJ29uQ2xpY2snLCAnb25Db250ZXh0TWVudScsICdvbkRvdWJsZUNsaWNrJyxcbiAgICAnb25EcmFnJywgJ29uRHJhZ0VuZCcsICdvbkRyYWdFbnRlcicsICdvbkRyYWdFeGl0JyxcbiAgICAnb25EcmFnTGVhdmUnLCAnb25EcmFnT3ZlcicsICdvbkRyYWdTdGFydCcsXG4gICAgJ29uRHJvcCcsICdvbk1vdXNlRG93bicsICdvbk1vdXNlRW50ZXInLFxuICAgICdvbk1vdXNlTGVhdmUnLCAnb25Nb3VzZU1vdmUnLCAnb25Nb3VzZU91dCcsXG4gICAgJ29uTW91c2VPdmVyJyAsJ29uTW91c2VVcCcsXG4gICAgLy8gU2VsZWN0aW9uIEV2ZW50c1xuICAgICdvblNlbGVjdCcsXG4gICAgLy8gVG91Y2ggRXZlbnRzXG4gICAgJ29uVG91Y2hDYW5jZWwnLCAnb25Ub3VjaEVuZCcsICdvblRvdWNoTW92ZScsICdvblRvdWNoU3RhcnQnLFxuICAgIC8vIFVJIEV2ZW50c1xuICAgICdvblNjcm9sbCcsXG4gICAgLy8gV2hlZWwgRXZlbnRzXG4gICAgJ29uV2hlZWwnLFxuICAgIC8vIE1lZGlhIEV2ZW50c1xuICAgICdvbkFib3J0JywgJ29uQ2FuUGxheScsICdvbkNhblBsYXlUaHJvdWdoJyxcbiAgICAnb25EdXJhdGlvbkNoYW5nZScsICdvbkVtcHRpZWQnLCAnb25FbmNyeXB0ZWRvbkVuZGVkJyxcbiAgICAnb25FcnJvcicsICdvbkxvYWRlZERhdGEnLCAnb25Mb2FkZWRNZXRhZGF0YScsXG4gICAgJ29uTG9hZFN0YXJ0JywgJ29uUGF1c2UnLCAnb25QbGF5b25QbGF5aW5nJyxcbiAgICAnb25Qcm9ncmVzcycsICdvblJhdGVDaGFuZ2UnLCAnb25TZWVrZWQnLFxuICAgICdvblNlZWtpbmcnLCAnb25TdGFsbGVkJywgJ29uU3VzcGVuZG9uVGltZVVwZGF0ZScsXG4gICAgJ29uVm9sdW1lQ2hhbmdlJywgJ29uV2FpdGluZycsXG4gICAgLy8gSW1hZ2UgRXZlbnRzXG4gICAgJ29uTG9hZCcsICdvbkVycm9yJyxcbiAgICAvLyBBbmltYXRpb24gRXZlbnRzXG4gICAgJ29uQW5pbWF0aW9uU3RhcnQnLCAnb25BbmltYXRpb25FbmQnLCAnb25BbmltYXRpb25JdGVyYXRpb24nLFxuICAgIC8vIFRyYW5zaXRpb24gRXZlbnRzXG4gICAgJ29uVHJhbnNpdGlvbkVuZCcsXG4gICAgLy8gT3RoZXIgRXZlbnRzXG4gICAgJ29uVG9nZ2xlJ1xuXTtcblxuXG5jb25zdCBldmVudE1hcCA9IGV2ZW50VHlwZXMucmVkdWNlKChldmVudHNNYXAsIGV2ZW50KSA9PiB7XG4gICAgZXZlbnRzTWFwW2V2ZW50XSA9IGV2ZW50XG4gICAgICAgIC5yZXBsYWNlKCdvbicsICcnKVxuICAgICAgICAucmVwbGFjZSgvW0EtWl0vLCBlID0+IGUudG9Mb3dlckNhc2UoKSk7XG4gICAgcmV0dXJuIGV2ZW50c01hcDtcbn0sIHt9KTtcblxuXG5leHBvcnQge1xuICAgIGV2ZW50VHlwZXMsXG4gICAgZXZlbnRNYXBcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3V0aWxzL2V2ZW50cy5qcyIsIlxuaW1wb3J0IHsgQ2hhbmdlVHlwZSB9IGZyb20gJy4uL3R5cGVzL2luZGV4JztcblxuXG5cbmZ1bmN0aW9uIGRpZmYobmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIC8qXG4gICAgcmV0dXJuIHR5cGUgUGF0Y2gge1xuICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlXG4gICAgICAgIG5ld05vZGU/OiBOb2RlXG4gICAgICAgIGNoaWxkcmVuPzogUGF0Y2hbXVxuICAgICAgICBhdHRyaWJ1dGVzPzogUGF0Y2hbXVxuICAgIH1cbiAgICAgKi9cbiAgICBpZiAoIW9sZE5vZGUpIHJldHVybiB7IHR5cGU6IENoYW5nZVR5cGUuQ1JFQVRFLCBuZXdOb2RlIH07XG4gICAgZWxzZSBpZiAoIW5ld05vZGUpIHJldHVybiB7IHR5cGU6IENoYW5nZVR5cGUuUkVNT1ZFIH07XG4gICAgZWxzZSBpZiAoaXNDaGFuZ2VkKG5ld05vZGUsIG9sZE5vZGUpKSByZXR1cm4geyB0eXBlOiBDaGFuZ2VUeXBlLlJFUExBQ0UsIG5ld05vZGUgfTtcbiAgICBlbHNlIGlmIChuZXdOb2RlLmVsZW1lbnROYW1lKVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogQ2hhbmdlVHlwZS5VUERBVEUsXG4gICAgICAgICAgICBjaGlsZHJlbjogZGlmZkNoaWxkcmVuKG5ld05vZGUsIG9sZE5vZGUpLFxuICAgICAgICAgICAgYXR0cmlidXRlczogZGlmZkF0dHJpYnV0ZXMobmV3Tm9kZSwgb2xkTm9kZSlcbiAgICAgICAgfTtcbn1cblxuZnVuY3Rpb24gaXNDaGFuZ2VkKG5ld05vZGUsIG9sZE5vZGUpIHtcbiAgICByZXR1cm4gdHlwZW9mIG5ld05vZGUgIT09IHR5cGVvZiBvbGROb2RlIHx8XG4gICAgICAgIHR5cGVvZiBuZXdOb2RlICE9PSBcIm9iamVjdFwiICYmIG5ld05vZGUgIT09IG9sZE5vZGUgfHxcbiAgICAgICAgdHlwZW9mIG5ld05vZGUgPT09IFwib2JqZWN0XCIgJiYgbmV3Tm9kZS5lbGVtZW50TmFtZSAhPT0gb2xkTm9kZS5lbGVtZW50TmFtZTtcbn1cblxuZnVuY3Rpb24gZGlmZkF0dHJpYnV0ZXMobmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIGNvbnN0IHBhdGNoZXMgID0gW107XG4gICAgY29uc3QgYXR0cmlidXRlcyA9IHsuLi5vbGROb2RlLmF0dHJpYnV0ZXMsIC4uLm5ld05vZGUuYXR0cmlidXRlc307XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykubWFwKGF0dHJOYW1lID0+IHtcbiAgICAgICAgY29uc3QgbmV3QXR0ciA9IG5ld05vZGUuYXR0cmlidXRlc1thdHRyTmFtZV07XG4gICAgICAgIGNvbnN0IG9sZEF0dHIgPSBvbGROb2RlLmF0dHJpYnV0ZXNbYXR0ck5hbWVdO1xuICAgICAgICAhbmV3QXR0ciAmJiBwYXRjaGVzLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogQ2hhbmdlVHlwZS5SRU1PVkVfUFJPUFMsXG4gICAgICAgICAgICB2YWx1ZTogb2xkQXR0ciwgYXR0ck5hbWVcbiAgICAgICAgfSk7XG4gICAgICAgICghb2xkQXR0ciB8fCBvbGRBdHRyICE9PSBuZXdBdHRyKSAmJiBwYXRjaGVzLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogQ2hhbmdlVHlwZS5TRVRfUFJPUFMsXG4gICAgICAgICAgICB2YWx1ZTogbmV3QXR0ciwgYXR0ck5hbWVcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHBhdGNoZXM7XG59XG5cblxuZnVuY3Rpb24gZGlmZkNoaWxkcmVuKG5ld05vZGUsIG9sZE5vZGUpIHtcbiAgICByZXR1cm4gWy4uLkFycmF5KE1hdGgubWF4KFxuICAgICAgICBuZXdOb2RlLmNoaWxkcmVuLmxlbmd0aCxcbiAgICAgICAgb2xkTm9kZS5jaGlsZHJlbi5sZW5ndGhcbiAgICApKS5rZXlzKCldLm1hcChpID0+IGRpZmYobmV3Tm9kZS5jaGlsZHJlbltpXSwgb2xkTm9kZS5jaGlsZHJlbltpXSkpO1xufVxuXG5cbmV4cG9ydCB7XG4gICAgZGlmZlxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS9kaWZmL2luZGV4LmpzIiwiXG5jb25zdCBDaGFuZ2VkID0ge1xuICAgIENSRUFURTogJ0NSRUFURScsXG4gICAgUkVNT1ZFOiAnUkVNT1ZFJyxcbiAgICBSRVBMQUNFOiAnUkVQTEFDRScsXG4gICAgVVBEQVRFOiAnVVBEQVRFJyxcbiAgICBTRVRfUFJPUFM6ICdTRVQgUFJPUFMnLFxuICAgIFJFTU9WRV9QUk9QUzogJ1JFTU9WRSBQUk9QUydcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgQ2hhbmdlZDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3R5cGVzL2NoYW5nZS5qcyIsIlxuaW1wb3J0IHsgQ2hhbmdlVHlwZSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tICcuLi9jcmVhdGUvaW5kZXgnO1xuaW1wb3J0IHsgc2V0QXR0cmlidXRlLCByZW1vdmVBdHRyaWJ1dGUgfSBmcm9tIFwiLi4vdXRpbHMvaW5kZXhcIjtcblxuXG5cbmZ1bmN0aW9uIHBhdGNoKHBhcmVudCwgcGF0Y2hlcywgaW5kZXg9MCkge1xuICAgIGlmICghcGF0Y2hlcykgcmV0dXJuO1xuICAgIGNvbnN0IGVsID0gcGFyZW50LmNoaWxkTm9kZXNbaW5kZXhdO1xuICAgIHN3aXRjaCAocGF0Y2hlcy50eXBlKSB7XG4gICAgICAgIGNhc2UgQ2hhbmdlVHlwZS5DUkVBVEU6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgbmV3Tm9kZSB9ID0gcGF0Y2hlcztcbiAgICAgICAgICAgIGNvbnN0IG5ld0VsID0gY3JlYXRlRWxlbWVudChuZXdOb2RlKTtcbiAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChuZXdFbCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENoYW5nZVR5cGUuUkVNT1ZFOiB7XG4gICAgICAgICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBDaGFuZ2VUeXBlLlJFUExBQ0U6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgbmV3Tm9kZSB9ID0gcGF0Y2hlcztcbiAgICAgICAgICAgIGNvbnN0IG5ld0VsID0gY3JlYXRlRWxlbWVudChuZXdOb2RlKTtcbiAgICAgICAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQobmV3RWwsIGVsKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQ2hhbmdlVHlwZS5VUERBVEU6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgY2hpbGRyZW4sIGF0dHJpYnV0ZXMgfSA9IHBhdGNoZXM7XG4gICAgICAgICAgICBwYXRjaEF0dHJpYnV0ZXMoZWwsIGF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQsIGluZGV4KSA9PiBwYXRjaChlbCwgY2hpbGQsIGluZGV4KSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcGF0Y2hBdHRyaWJ1dGVzKGVsZW1lbnQsIGF0dHJpYnV0ZXMpIHtcbiAgICBhdHRyaWJ1dGVzLmZvckVhY2gocGF0Y2ggPT4ge1xuICAgICAgICBjb25zdCB7IHR5cGUsIGF0dHJOYW1lLCB2YWx1ZSB9ID0gcGF0Y2g7XG4gICAgICAgIGlmICh0eXBlID09PSBDaGFuZ2VUeXBlLlNFVF9QUk9QUylcbiAgICAgICAgICAgIHNldEF0dHJpYnV0ZShlbGVtZW50LCBhdHRyTmFtZSwgdmFsdWUpO1xuICAgICAgICBlbHNlIGlmICh0eXBlID09PSBDaGFuZ2VUeXBlLlJFTU9WRV9QUk9QUylcbiAgICAgICAgICAgIHJlbW92ZUF0dHJpYnV0ZShlbGVtZW50LCBhdHRyTmFtZSwgdmFsdWUpXG4gICAgfSlcbn1cblxuXG5leHBvcnQge1xuICAgIHBhdGNoXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS9wYXRjaC9pbmRleC5qcyIsIlxuaW1wb3J0IE9ic2VydmVyIGZyb20gJy4vb2JqZWN0JztcbmltcG9ydCBPYnNlcnZlckFycmF5IGZyb20gJy4vYXJyYXknO1xuaW1wb3J0IHsgd2Fsaywgb2JzZXJ2ZXIgfSBmcm9tICcuL3V0aWxzJztcblxuXG5leHBvcnQge1xuICAgIE9ic2VydmVyLFxuICAgIE9ic2VydmVyQXJyYXksXG4gICAgd2Fsaywgb2JzZXJ2ZXJcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvb2JzZXJ2ZXIvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9