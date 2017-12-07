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
exports.insertAfter = exports.removeAttribute = exports.setAttribute = exports.setAttributes = undefined;

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

function insertAfter(newEl, targetEl) {
    var parentEl = targetEl.parentNode;
    if (parentEl.lastChild === targetEl) return parentEl.appendChild(newEl);
    return parentEl.insertBefore(newEl, targetEl.nextSibling);
}

exports.setAttributes = setAttributes;
exports.setAttribute = setAttribute;
exports.removeAttribute = removeAttribute;
exports.insertAfter = insertAfter;

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
            console.log(oldNode);
            console.log(this.node);
            console.log(patches);
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
    if (!el) return;
    switch (patches.type) {
        case _types.ChangeType.CREATE:
            {
                var newNode = patches.newNode;

                var newEl = (0, _index.createElement)(newNode);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjQ2MDc3YjU1N2JkZDM4ZWZlMjYiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci91dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9jcmVhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdHlwZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci9vYmplY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci9hcnJheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3V0aWxzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9kaWZmL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3R5cGVzL2NoYW5nZS5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9wYXRjaC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL29ic2VydmVyL2luZGV4LmpzIl0sIm5hbWVzIjpbInNldEF0dHJpYnV0ZXMiLCJ0YXJnZXQiLCJhdHRyaWJ1dGVzIiwiT2JqZWN0Iiwia2V5cyIsImZpbHRlciIsImhhc093blByb3BlcnR5Iiwia2V5IiwiZm9yRWFjaCIsInNldEF0dHJpYnV0ZSIsImF0dHJOYW1lIiwiYXR0clZhbHVlIiwiaW5jbHVkZXMiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlQXR0cmlidXRlIiwib2xkQXR0clZhbHVlIiwiaW5zZXJ0QWZ0ZXIiLCJuZXdFbCIsInRhcmdldEVsIiwicGFyZW50RWwiLCJwYXJlbnROb2RlIiwibGFzdENoaWxkIiwiYXBwZW5kQ2hpbGQiLCJpbnNlcnRCZWZvcmUiLCJuZXh0U2libGluZyIsIm5vb3AiLCJ3YWxrIiwib2JqIiwiZnVuIiwiVHlwZUVycm9yIiwiQXJyYXkiLCJpc0FycmF5IiwiaXRlbSIsImluZGV4Iiwib2JzZXJ2ZXIiLCJ2YWx1ZSIsInNldHRlckNhbGxiYWNrIiwiZ2V0dGVyQ2FsbGJhY2siLCJmcm9tIiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwiZ2V0Iiwic2V0Iiwib2xkVmFsdWUiLCJuZXdWYWx1ZSIsImdldFVuaXF1ZUlEIiwiaWQiLCJjcmVhdGVFbGVtZW50Iiwibm9kZSIsImVsIiwiZG9jdW1lbnQiLCJlbGVtZW50TmFtZSIsImNoaWxkcmVuIiwiYXBwZW5kQ2hpbGRyZW4iLCJjcmVhdGVUZXh0Tm9kZSIsIm1hcCIsIkNoYW5nZVR5cGUiLCJPYnNlcnZlciIsInRvU3RyaW5nIiwiT2JzZXJ2ZXJBcnJheSIsImFycmF5IiwibGVuZ3RoIiwiaXNPYnNlcnZlckFycmF5IiwiX19wcm90b19fIiwiY29uc3RydWN0b3IiLCJvZiIsImFyZ3MiLCJjb25jYXQiLCJhcnJheXMiLCJuZXdBcnJheSIsInB1c2giLCJjb3B5V2l0aGluIiwiZW50cmllcyIsImV2ZXJ5IiwiZmlsbCIsImZpbmQiLCJmaW5kSW5kZXgiLCJpbmRleE9mIiwiam9pbiIsImxhc3RJbmRleE9mIiwicG9wIiwicmVkdWNlIiwicmVkdWNlUmlnaHQiLCJyZXZlcnNlIiwic2hpZnQiLCJzbGljZSIsInNvbWUiLCJzb3J0Iiwic3BsaWNlIiwidG9Mb2NhbGVTdHJpbmciLCJ0b1NvdXJjZSIsInVuc2hpZnQiLCJ2YWx1ZXMiLCJDb21wb25lbnQiLCJlbnRyeSIsInN0YXRlIiwiY29tcHV0ZWQiLCJuYW1lIiwiZ2V0dGVyIiwiRXJyb3IiLCJkaWZmQW5kUGF0Y2giLCJpbml0T2JzZXJ2ZXIiLCJpbml0Q29tcHV0ZWQiLCJiZWZvcmVSZW5kZXIiLCJyZW5kZXIiLCJvbGROb2RlIiwicGF0Y2hlcyIsImNvbnNvbGUiLCJsb2ciLCJkaWZmIiwicGF0Y2giLCJ1dGlscyIsImV2ZW50VHlwZXMiLCJldmVudE1hcCIsImV2ZW50c01hcCIsImV2ZW50IiwicmVwbGFjZSIsImUiLCJ0b0xvd2VyQ2FzZSIsIm5ld05vZGUiLCJ0eXBlIiwiQ1JFQVRFIiwiUkVNT1ZFIiwiaXNDaGFuZ2VkIiwiUkVQTEFDRSIsIlVQREFURSIsImRpZmZDaGlsZHJlbiIsImRpZmZBdHRyaWJ1dGVzIiwibmV3QXR0ciIsIm9sZEF0dHIiLCJSRU1PVkVfUFJPUFMiLCJTRVRfUFJPUFMiLCJNYXRoIiwibWF4IiwiaSIsIkNoYW5nZWQiLCJwYXJlbnQiLCJjaGlsZE5vZGVzIiwicmVtb3ZlQ2hpbGQiLCJyZXBsYWNlQ2hpbGQiLCJwYXRjaEF0dHJpYnV0ZXMiLCJjaGlsZCIsImVsZW1lbnQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDNURBOztBQUlBLFNBQVNBLGFBQVQsQ0FBdUJDLE1BQXZCLEVBQThDO0FBQUEsUUFBZkMsVUFBZSx1RUFBSixFQUFJOztBQUMxQ0MsV0FBT0MsSUFBUCxDQUFZRixVQUFaLEVBQ0tHLE1BREwsQ0FDWTtBQUFBLGVBQU9ILFdBQVdJLGNBQVgsQ0FBMEJDLEdBQTFCLENBQVA7QUFBQSxLQURaLEVBRUtDLE9BRkwsQ0FFYTtBQUFBLGVBQVlDLGFBQWFSLE1BQWIsRUFBcUJTLFFBQXJCLEVBQStCUixXQUFXUSxRQUFYLENBQS9CLENBQVo7QUFBQSxLQUZiO0FBR0g7O0FBR0QsU0FBU0QsWUFBVCxDQUFzQlIsTUFBdEIsRUFBOEJTLFFBQTlCLEVBQXdDQyxTQUF4QyxFQUFtRDtBQUMvQ0QsaUJBQWEsV0FBYixLQUE2QkEsV0FBVyxPQUF4QztBQUNBLFFBQUksbUJBQVdFLFFBQVgsQ0FBb0JGLFFBQXBCLENBQUosRUFDSSxPQUFPVCxPQUFPWSxnQkFBUCxDQUNILGlCQUFTSCxRQUFULENBREcsRUFFSEMsU0FGRyxDQUFQO0FBSUpWLFdBQU9RLFlBQVAsQ0FBb0JDLFFBQXBCLEVBQThCQyxTQUE5QjtBQUNIOztBQUdELFNBQVNHLGVBQVQsQ0FBeUJiLE1BQXpCLEVBQWlDUyxRQUFqQyxFQUEyQ0ssWUFBM0MsRUFBeUQ7QUFDckRMLGlCQUFhLFdBQWIsS0FBNkJBLFdBQVcsT0FBeEM7QUFDQSxRQUFJLG1CQUFXRSxRQUFYLENBQW9CRixRQUFwQixDQUFKLEVBQ0ksT0FBT1QsT0FBT1ksZ0JBQVAsQ0FDSCxpQkFBU0gsUUFBVCxDQURHLEVBRUhLLFlBRkcsQ0FBUDtBQUlKZCxXQUFPYSxlQUFQLENBQXVCSixRQUF2QjtBQUNIOztBQUdELFNBQVNNLFdBQVQsQ0FBcUJDLEtBQXJCLEVBQTRCQyxRQUE1QixFQUFzQztBQUNsQyxRQUFNQyxXQUFXRCxTQUFTRSxVQUExQjtBQUNBLFFBQUlELFNBQVNFLFNBQVQsS0FBdUJILFFBQTNCLEVBQ0ksT0FBT0MsU0FBU0csV0FBVCxDQUFxQkwsS0FBckIsQ0FBUDtBQUNKLFdBQU9FLFNBQVNJLFlBQVQsQ0FBc0JOLEtBQXRCLEVBQTRCQyxTQUFTTSxXQUFyQyxDQUFQO0FBQ0g7O1FBSUd4QixhLEdBQUFBLGE7UUFDQVMsWSxHQUFBQSxZO1FBQ0FLLGUsR0FBQUEsZTtRQUNBRSxXLEdBQUFBLFc7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3Q0o7Ozs7QUFDQTs7Ozs7O0FBR0EsSUFBTVMsT0FBTyxTQUFQQSxJQUFPLEdBQU0sQ0FBRSxDQUFyQjs7QUFJQSxTQUFTQyxJQUFULENBQWNDLEdBQWQsRUFBbUJDLEdBQW5CLEVBQXdCO0FBQ3BCLFFBQUksUUFBT0QsR0FBUCx5Q0FBT0EsR0FBUCxPQUFlLFFBQW5CLEVBQ0ksTUFBTSxJQUFJRSxTQUFKLDZEQUF1RUYsR0FBdkUseUNBQXVFQSxHQUF2RSxHQUFOO0FBQ0osUUFBSUcsTUFBTUMsT0FBTixDQUFjSixHQUFkLENBQUosRUFDSSxPQUFPQSxJQUFJbkIsT0FBSixDQUFZLFVBQUN3QixJQUFELEVBQU9DLEtBQVA7QUFBQSxlQUFpQkwsSUFBSUssS0FBSixFQUFXRCxJQUFYLEVBQWlCTCxHQUFqQixDQUFqQjtBQUFBLEtBQVosQ0FBUCxDQURKLEtBR0ksT0FBT3hCLE9BQU9DLElBQVAsQ0FBWXVCLEdBQVosRUFBaUJuQixPQUFqQixDQUF5QjtBQUFBLGVBQU9vQixJQUFJckIsR0FBSixFQUFTb0IsSUFBSXBCLEdBQUosQ0FBVCxFQUFtQm9CLEdBQW5CLENBQVA7QUFBQSxLQUF6QixDQUFQO0FBQ1A7O0FBRUQsU0FBU08sUUFBVCxDQUFrQlAsR0FBbEIsRUFBdUJwQixHQUF2QixFQUE0QjRCLEtBQTVCLEVBQTZFO0FBQUEsUUFBMUNDLGNBQTBDLHVFQUEzQlgsSUFBMkI7QUFBQSxRQUFyQlksY0FBcUIsdUVBQU5aLElBQU07O0FBQ3pFLFFBQUksUUFBT0UsR0FBUCx5Q0FBT0EsR0FBUCxPQUFlLFFBQW5CLEVBQ0ksTUFBTSxJQUFJRSxTQUFKLGlFQUEyRUYsR0FBM0UseUNBQTJFQSxHQUEzRSxHQUFOOztBQUVKLFFBQUlHLE1BQU1DLE9BQU4sQ0FBY0ksS0FBZCxDQUFKLEVBQ0lBLFFBQVEsZ0JBQWNHLElBQWQsQ0FBbUJILEtBQW5CLENBQVIsQ0FESixLQUVLLElBQUksUUFBT0EsS0FBUCx5Q0FBT0EsS0FBUCxPQUFpQixRQUFyQixFQUNEQSxRQUFRLGlCQUFTRyxJQUFULENBQWNILEtBQWQsQ0FBUjs7QUFFSmhDLFdBQU9vQyxjQUFQLENBQXNCWixHQUF0QixFQUEyQnBCLEdBQTNCLEVBQWdDO0FBQzVCaUMsb0JBQVksSUFEZ0I7QUFFNUJDLHNCQUFjLElBRmM7QUFHNUJDLGFBQUssZUFBTTtBQUNQTCwyQkFBZVYsR0FBZixFQUFvQnBCLEdBQXBCLEVBQXlCNEIsS0FBekI7QUFDQSxtQkFBT0EsS0FBUDtBQUNILFNBTjJCO0FBTzVCUSxhQUFLLHVCQUFZO0FBQ2IsZ0JBQU1DLFdBQVdqQixJQUFJcEIsR0FBSixDQUFqQjtBQUNBMkIscUJBQVNQLEdBQVQsRUFBY3BCLEdBQWQsRUFBbUJzQyxRQUFuQixFQUE2QlQsY0FBN0IsRUFBNkNDLGNBQTdDO0FBQ0FELDJCQUFlVCxHQUFmLEVBQW9CcEIsR0FBcEIsRUFBeUJzQyxRQUF6QixFQUFtQ0QsUUFBbkM7QUFDSDtBQVgyQixLQUFoQztBQWFIOztBQUdELElBQU1FLGNBQWMsWUFBVztBQUMzQixRQUFJQyxLQUFLLENBQVQ7QUFDQSxXQUFRO0FBQUEsZUFBTUEsSUFBTjtBQUFBLEtBQVI7QUFDSCxDQUhtQixFQUFwQjs7UUFPSXJCLEksR0FBQUEsSTtRQUNBUSxRLEdBQUFBLFE7UUFDQVksVyxHQUFBQSxXOzs7Ozs7Ozs7Ozs7Ozs7O0FDbkRKOztBQUlBLFNBQVNFLGFBQVQsQ0FBdUJDLElBQXZCLEVBQTZCO0FBQ3pCOzs7Ozs7O0FBT0EsUUFBSSxRQUFPQSxJQUFQLHlDQUFPQSxJQUFQLE9BQWdCLFFBQXBCLEVBQThCO0FBQzFCLFlBQU1DLEtBQUtDLFNBQVNILGFBQVQsQ0FBdUJDLEtBQUtHLFdBQTVCLENBQVg7QUFDQUgsYUFBS0ksUUFBTCxJQUFpQkMsZUFBZUosRUFBZixFQUFtQkQsS0FBS0ksUUFBeEIsQ0FBakI7QUFDQSxrQ0FBY0gsRUFBZCxFQUFrQkQsS0FBSy9DLFVBQXZCO0FBQ0EsZUFBT2dELEVBQVA7QUFDSCxLQUxELE1BTUssT0FBT0MsU0FBU0ksY0FBVCxDQUF3Qk4sSUFBeEIsQ0FBUDtBQUNSOztBQUdELFNBQVNLLGNBQVQsQ0FBd0JyRCxNQUF4QixFQUFnQ29ELFFBQWhDLEVBQTBDO0FBQ3RDQSxhQUFTRyxHQUFULENBQWFSLGFBQWIsRUFDS3hDLE9BREwsQ0FDZVAsT0FBT3FCLFdBRHRCLE1BQ2VyQixNQURmO0FBRUg7O1FBS0crQyxhLEdBQUFBLGE7Ozs7Ozs7Ozs7Ozs7O0FDOUJKOzs7Ozs7UUFJSVMsVTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSko7Ozs7SUFJcUJDLFEscUJBQ2pCLGtCQUFZL0IsR0FBWixFQUFpQlMsY0FBakIsRUFBaUNDLGNBQWpDLEVBQWlEO0FBQUE7O0FBQUE7O0FBQzdDLFFBQUksUUFBT1YsR0FBUCx5Q0FBT0EsR0FBUCxPQUFlLFFBQW5CLEVBQ0ksTUFBTSxJQUFJRSxTQUFKLENBQWMseUJBQWQsQ0FBTjtBQUNKLHFCQUFLRixHQUFMLEVBQVUsVUFBQ3BCLEdBQUQsRUFBTTRCLEtBQU47QUFBQSxlQUFnQiw0QkFDaEI1QixHQURnQixFQUNYNEIsS0FEVyxFQUV0QkMsY0FGc0IsRUFHdEJDLGNBSHNCLENBQWhCO0FBQUEsS0FBVjtBQUtILEMsU0FFTUMsSSxHQUFPLFVBQUNYLEdBQUQsRUFBTVMsY0FBTixFQUFzQkMsY0FBdEIsRUFBeUM7QUFDbkQsV0FBTyxJQUFJcUIsUUFBSixDQUNIL0IsR0FERyxFQUVIUyxjQUZHLEVBR0hDLGNBSEcsQ0FBUDtBQUtILEMsU0FFTXNCLFEsR0FBVyxZQUFNO0FBQ3BCO0FBQ0gsQztrQkFyQmdCRCxROzs7Ozs7Ozs7Ozs7Ozs7O0FDSnJCOzs7O0lBSXFCRSxhLHFCQUNqQix1QkFBWUMsS0FBWixFQUFtQnpCLGNBQW5CLEVBQW1DQyxjQUFuQyxFQUFtRDtBQUFBOztBQUFBOztBQUFBOztBQUMvQyxLQUFDd0IsS0FBRCxLQUFXQSxRQUFRLEVBQW5CO0FBQ0EsUUFBSSxDQUFDL0IsTUFBTUMsT0FBTixDQUFjOEIsS0FBZCxDQUFMLEVBQ0ksTUFBTSxJQUFJaEMsU0FBSixDQUFjLHdCQUFkLENBQU47QUFDSixxQkFBS2dDLEtBQUwsRUFBWSxVQUFDNUIsS0FBRCxFQUFRRCxJQUFSO0FBQUEsZUFBaUIsNEJBQ25CQyxLQURtQixFQUNaRCxJQURZLEVBRXpCSSxjQUZ5QixFQUVUQyxjQUZTLENBQWpCO0FBQUEsS0FBWjtBQUlBLFNBQUt5QixNQUFMLEdBQWNELE1BQU1DLE1BQXBCO0FBQ0gsQyxTQUdNeEIsSSxHQUFPLFVBQUN1QixLQUFELEVBQVF6QixjQUFSLEVBQXdCQyxjQUF4QixFQUEyQztBQUNyRCxXQUFPLElBQUl1QixhQUFKLENBQ0hDLEtBREcsRUFFSHpCLGNBRkcsRUFHSEMsY0FIRyxDQUFQO0FBS0gsQyxTQUNNMEIsZSxHQUFtQixpQkFBUztBQUMvQixXQUFPRixNQUFNRyxTQUFOLENBQWdCQyxXQUFoQixLQUFnQ0wsYUFBdkM7QUFDSCxDLFNBQ01NLEUsR0FBSyxZQUFhO0FBQUEsc0NBQVRDLElBQVM7QUFBVEEsWUFBUztBQUFBOztBQUNyQixXQUFPLElBQUlQLGFBQUosV0FBc0JPLElBQXRCLEVBQVA7QUFDSCxDOzs7U0FHREMsTSxHQUFTLFlBQWU7QUFBQSwyQ0FBWEMsTUFBVztBQUFYQSxrQkFBVztBQUFBOztBQUNwQixZQUFNQyxXQUFXLElBQUlWLGFBQUosRUFBakI7QUFDQSx3QkFBVVMsTUFBVixFQUFrQjdELE9BQWxCLENBQ0k7QUFBQSxtQkFBU3FELE1BQU1yRCxPQUFOLENBQWM4RCxTQUFTQyxJQUF2QixDQUFUO0FBQUEsU0FESjtBQUdBLGVBQU9ELFFBQVA7QUFDSCxLOztTQUNERSxVLEdBQWEsWUFBYTtBQUFBOztBQUN0QjtBQUNBLGVBQU9aLGNBQWN0QixJQUFkLENBQ0gscUJBQU1BLElBQU4sVUFBaUJrQyxVQUFqQiw4QkFERyxDQUFQO0FBR0gsSzs7U0FDREMsTyx3Q0FBVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDRnhDLDZCQURFLEdBQ00sQ0FETjs7QUFBQTtBQUFBLDZCQUVDLEtBQUtBLEtBQUwsQ0FGRDtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLCtCQUdJLENBQUNBLE9BQUQsRUFBVSxLQUFLQSxLQUFMLENBQVYsQ0FISjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSzs7U0FLVnlDLEssR0FBUSxZQUFNLENBQUUsQzs7U0FDaEJDLEksR0FBTyxZQUFNLENBQUUsQzs7U0FDZnRFLE0sR0FBUyxZQUFNLENBQUUsQzs7U0FDakJ1RSxJLEdBQU8sWUFBTSxDQUFFLEM7O1NBQ2ZDLFMsR0FBWSxZQUFNLENBQUUsQzs7U0FDcEJyRSxPLEdBQVUsWUFBTSxDQUFFLEM7O1NBQ2xCSSxRLEdBQVcsWUFBTSxDQUFFLEM7O1NBQ25Ca0UsTyxHQUFVLFlBQU0sQ0FBRSxDOztTQUNsQkMsSSxHQUFPLFlBQU0sQ0FBRSxDOztTQUNmM0UsSSxHQUFPLFlBQU0sQ0FBRSxDOztTQUNmNEUsVyxHQUFjLFlBQU0sQ0FBRSxDOztTQUN0QnhCLEcsR0FBTSxZQUFNLENBQUUsQzs7U0FDZHlCLEcsR0FBTSxZQUFNLENBQUUsQzs7U0FDZFYsSSxHQUFPLGlCQUFTO0FBQ1oscUNBQ1UsT0FBS1QsTUFEZixFQUN1QjNCLEtBRHZCLEVBRUlDLGNBRkosRUFFb0JDLGNBRnBCO0FBSUEsZUFBS3lCLE1BQUw7QUFDQSxlQUFPM0IsS0FBUDtBQUNILEs7O1NBQ0QrQyxNLEdBQVMsWUFBTSxDQUFFLEM7O1NBQ2pCQyxXLEdBQWMsWUFBTSxDQUFFLEM7O1NBQ3RCQyxPLEdBQVUsWUFBTSxDQUFFLEM7O1NBQ2xCQyxLLEdBQVEsWUFBTSxDQUFFLEM7O1NBQ2hCQyxLLEdBQVEsWUFBTSxDQUFFLEM7O1NBQ2hCQyxJLEdBQU8sWUFBTSxDQUFFLEM7O1NBQ2ZDLEksR0FBTyxZQUFNLENBQUUsQzs7U0FDZkMsTSxHQUFTLFlBQU0sQ0FBRSxDOztTQUNqQkMsYyxHQUFpQixZQUFNLENBQUUsQzs7U0FDekJDLFEsR0FBVyxZQUFNLENBQUUsQzs7U0FDbkJoQyxRLEdBQVcsWUFBTTtBQUNiO0FBQ0gsSzs7U0FDRGlDLE8sR0FBVSxZQUFNLENBQUUsQzs7U0FDbEJDLE0sR0FBUyxZQUFNLENBQUUsQzs7a0JBakZBakMsYTs7Ozs7Ozs7Ozs7Ozs7QUNKckI7Ozs7OztRQUtJa0MsUzs7Ozs7Ozs7Ozs7Ozs7O0FDTEo7O0FBQ0E7Ozs7SUFJTUEsUztBQUNGLHlCQUFjO0FBQUE7O0FBQUEsYUFFZEMsS0FGYyxHQUVOLElBRk07QUFBQSxhQUdkOUMsSUFIYyxHQUdQLElBSE87QUFBQSxhQUlkK0MsS0FKYyxHQUlOLEVBSk07QUFBQSxhQUtkQyxRQUxjLEdBS0gsRUFMRztBQUFFOzs7Ozs7QUFPaEI7NkNBQ3FCLENBQUU7Ozs0Q0FDSCxDQUFFOzs7b0RBQ00sQ0FBRTs7O2dEQUNOO0FBQ3BCLG1CQUFPLElBQVA7QUFDSDs7OzhDQUNxQixDQUFFOzs7NkNBQ0gsQ0FBRTs7OytDQUNBLENBQUU7Ozs0Q0FDTCxDQUFFOzs7OztBQUV0Qjt1Q0FDZTtBQUNYLGlCQUFLRCxLQUFMLEdBQWEsbUJBQVMxRCxJQUFULENBQ1QsS0FBSzBELEtBQUwsSUFBYyxFQURMLEVBRVAsS0FBSzVELGNBRkUsTUFFUCxJQUZPLEVBQWI7QUFJSDs7O3VDQUNjO0FBQUE7O0FBQ1gsZ0NBQ0ksS0FBSzZELFFBRFQsRUFFSSxVQUFDQyxJQUFELEVBQU9DLE1BQVAsRUFBZUYsUUFBZixFQUE0QjtBQUN4QjlGLHVCQUFPb0MsY0FBUCxDQUFzQjBELFFBQXRCLEVBQWdDQyxJQUFoQyxFQUFzQztBQUNsQzFELGdDQUFZLElBRHNCO0FBRWxDQyxrQ0FBYyxLQUZvQjtBQUdsQ0MseUJBQVd5RCxNQUFYO0FBSGtDLGlCQUF0QztBQUtILGFBUkw7QUFVSDs7O3VDQUNjeEUsRyxFQUFLcEIsRyxFQUFLNEIsSyxFQUFPUyxRLEVBQVU7QUFDdEMsZ0JBQUlqQixRQUFRLEtBQUtxRSxLQUFqQixFQUNJLE1BQU0sSUFBSUksS0FBSixDQUFVLFNBQVYsQ0FBTjtBQUNKLGlCQUFLQyxZQUFMO0FBQ0g7Ozs7O0FBRUQ7dUNBQ2U7QUFDWCxpQkFBS0MsWUFBTDtBQUNBLGlCQUFLQyxZQUFMO0FBQ0g7OztpQ0FDUSxDQUFFOzs7aUNBQ0ZSLEssRUFBTztBQUNaLGlCQUFLUyxZQUFMO0FBQ0EsaUJBQUt2RCxJQUFMLEdBQVksS0FBS3dELE1BQUwsRUFBWjtBQUNBLGlCQUFLVixLQUFMLEdBQWFBLEtBQWI7QUFDQSxpQkFBS0EsS0FBTCxDQUFXekUsV0FBWCxDQUF1Qix3QkFBYyxLQUFLMkIsSUFBbkIsQ0FBdkI7QUFDSDs7O3VDQUNjO0FBQ1gsZ0JBQU15RCxVQUFVLEtBQUt6RCxJQUFyQjtBQUNBLGlCQUFLQSxJQUFMLEdBQVksS0FBS3dELE1BQUwsRUFBWjtBQUNBLGdCQUFNRSxVQUFVLGVBQUssS0FBSzFELElBQVYsRUFBZ0J5RCxPQUFoQixDQUFoQjtBQUNBRSxvQkFBUUMsR0FBUixDQUFZSCxPQUFaO0FBQ0FFLG9CQUFRQyxHQUFSLENBQVksS0FBSzVELElBQWpCO0FBQ0EyRCxvQkFBUUMsR0FBUixDQUFZRixPQUFaO0FBQ0EsNEJBQU0sS0FBS1osS0FBWCxFQUFrQlksT0FBbEI7QUFDSDs7Ozs7O2tCQUtVYixTOzs7Ozs7Ozs7Ozs7OztBQzNFZjs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O1FBSUk5QyxhO1FBQ0E4RCxJO1FBQ0FDLEs7UUFDQUMsSzs7Ozs7Ozs7Ozs7OztBQ1ZKLElBQU1DLGFBQWE7QUFDZjtBQUNBLFFBRmUsRUFFTCxPQUZLLEVBRUksU0FGSjtBQUdmO0FBQ0Esa0JBSmUsRUFJSyxvQkFKTCxFQUkyQixxQkFKM0I7QUFLZjtBQUNBLFdBTmUsRUFNRixZQU5FLEVBTVksU0FOWjtBQU9mO0FBQ0EsU0FSZSxFQVFKLFFBUkk7QUFTZjtBQUNBLFVBVmUsRUFVSCxTQVZHLEVBVVEsV0FWUixFQVVxQixVQVZyQjtBQVdmO0FBQ0EsU0FaZSxFQVlKLGVBWkksRUFZYSxlQVpiLEVBYWYsUUFiZSxFQWFMLFdBYkssRUFhUSxhQWJSLEVBYXVCLFlBYnZCLEVBY2YsYUFkZSxFQWNBLFlBZEEsRUFjYyxhQWRkLEVBZWYsUUFmZSxFQWVMLGFBZkssRUFlVSxjQWZWLEVBZ0JmLGNBaEJlLEVBZ0JDLGFBaEJELEVBZ0JnQixZQWhCaEIsRUFpQmYsYUFqQmUsRUFpQkEsV0FqQkE7QUFrQmY7QUFDQSxVQW5CZTtBQW9CZjtBQUNBLGVBckJlLEVBcUJFLFlBckJGLEVBcUJnQixhQXJCaEIsRUFxQitCLGNBckIvQjtBQXNCZjtBQUNBLFVBdkJlO0FBd0JmO0FBQ0EsU0F6QmU7QUEwQmY7QUFDQSxTQTNCZSxFQTJCSixXQTNCSSxFQTJCUyxrQkEzQlQsRUE0QmYsa0JBNUJlLEVBNEJLLFdBNUJMLEVBNEJrQixvQkE1QmxCLEVBNkJmLFNBN0JlLEVBNkJKLGNBN0JJLEVBNkJZLGtCQTdCWixFQThCZixhQTlCZSxFQThCQSxTQTlCQSxFQThCVyxpQkE5QlgsRUErQmYsWUEvQmUsRUErQkQsY0EvQkMsRUErQmUsVUEvQmYsRUFnQ2YsV0FoQ2UsRUFnQ0YsV0FoQ0UsRUFnQ1csdUJBaENYLEVBaUNmLGdCQWpDZSxFQWlDRyxXQWpDSDtBQWtDZjtBQUNBLFFBbkNlLEVBbUNMLFNBbkNLO0FBb0NmO0FBQ0Esa0JBckNlLEVBcUNLLGdCQXJDTCxFQXFDdUIsc0JBckN2QjtBQXNDZjtBQUNBLGlCQXZDZTtBQXdDZjtBQUNBLFVBekNlLENBQW5COztBQTZDQSxJQUFNQyxXQUFXRCxXQUFXL0IsTUFBWCxDQUFrQixVQUFDaUMsU0FBRCxFQUFZQyxLQUFaLEVBQXNCO0FBQ3JERCxjQUFVQyxLQUFWLElBQW1CQSxNQUNkQyxPQURjLENBQ04sSUFETSxFQUNBLEVBREEsRUFFZEEsT0FGYyxDQUVOLE9BRk0sRUFFRztBQUFBLGVBQUtDLEVBQUVDLFdBQUYsRUFBTDtBQUFBLEtBRkgsQ0FBbkI7QUFHQSxXQUFPSixTQUFQO0FBQ0gsQ0FMZ0IsRUFLZCxFQUxjLENBQWpCOztRQVNJRixVLEdBQUFBLFU7UUFDQUMsUSxHQUFBQSxROzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2REo7Ozs7QUFJQSxTQUFTSixJQUFULENBQWNVLE9BQWQsRUFBdUJkLE9BQXZCLEVBQWdDO0FBQzVCOzs7Ozs7OztBQVFBLFFBQUksQ0FBQ0EsT0FBTCxFQUFjLE9BQU8sRUFBRWUsTUFBTSxrQkFBV0MsTUFBbkIsRUFBMkJGLGdCQUEzQixFQUFQLENBQWQsS0FDSyxJQUFJLENBQUNBLE9BQUwsRUFBYyxPQUFPLEVBQUVDLE1BQU0sa0JBQVdFLE1BQW5CLEVBQVAsQ0FBZCxLQUNBLElBQUlDLFVBQVVKLE9BQVYsRUFBbUJkLE9BQW5CLENBQUosRUFBaUMsT0FBTyxFQUFFZSxNQUFNLGtCQUFXSSxPQUFuQixFQUE0QkwsZ0JBQTVCLEVBQVAsQ0FBakMsS0FDQSxJQUFJQSxRQUFRcEUsV0FBWixFQUNELE9BQU87QUFDSHFFLGNBQU0sa0JBQVdLLE1BRGQ7QUFFSHpFLGtCQUFVMEUsYUFBYVAsT0FBYixFQUFzQmQsT0FBdEIsQ0FGUDtBQUdIeEcsb0JBQVk4SCxlQUFlUixPQUFmLEVBQXdCZCxPQUF4QjtBQUhULEtBQVA7QUFLUDs7QUFFRCxTQUFTa0IsU0FBVCxDQUFtQkosT0FBbkIsRUFBNEJkLE9BQTVCLEVBQXFDO0FBQ2pDLFdBQU8sUUFBT2MsT0FBUCx5Q0FBT0EsT0FBUCxlQUEwQmQsT0FBMUIseUNBQTBCQSxPQUExQixNQUNILFFBQU9jLE9BQVAseUNBQU9BLE9BQVAsT0FBbUIsUUFBbkIsSUFBK0JBLFlBQVlkLE9BRHhDLElBRUgsUUFBT2MsT0FBUCx5Q0FBT0EsT0FBUCxPQUFtQixRQUFuQixJQUErQkEsUUFBUXBFLFdBQVIsS0FBd0JzRCxRQUFRdEQsV0FGbkU7QUFHSDs7QUFFRCxTQUFTNEUsY0FBVCxDQUF3QlIsT0FBeEIsRUFBaUNkLE9BQWpDLEVBQTBDO0FBQ3RDLFFBQU1DLFVBQVcsRUFBakI7QUFDQSxRQUFNekcsMEJBQWlCd0csUUFBUXhHLFVBQXpCLEVBQXdDc0gsUUFBUXRILFVBQWhELENBQU47QUFDQUMsV0FBT0MsSUFBUCxDQUFZRixVQUFaLEVBQXdCc0QsR0FBeEIsQ0FBNEIsb0JBQVk7QUFDcEMsWUFBTXlFLFVBQVVULFFBQVF0SCxVQUFSLENBQW1CUSxRQUFuQixDQUFoQjtBQUNBLFlBQU13SCxVQUFVeEIsUUFBUXhHLFVBQVIsQ0FBbUJRLFFBQW5CLENBQWhCO0FBQ0EsU0FBQ3VILE9BQUQsSUFBWXRCLFFBQVFwQyxJQUFSLENBQWE7QUFDckJrRCxrQkFBTSxrQkFBV1UsWUFESTtBQUVyQmhHLG1CQUFPK0YsT0FGYyxFQUVMeEg7QUFGSyxTQUFiLENBQVo7QUFJQSxTQUFDLENBQUN3SCxPQUFELElBQVlBLFlBQVlELE9BQXpCLEtBQXFDdEIsUUFBUXBDLElBQVIsQ0FBYTtBQUM5Q2tELGtCQUFNLGtCQUFXVyxTQUQ2QjtBQUU5Q2pHLG1CQUFPOEYsT0FGdUMsRUFFOUJ2SDtBQUY4QixTQUFiLENBQXJDO0FBSUgsS0FYRDtBQVlBLFdBQU9pRyxPQUFQO0FBQ0g7O0FBR0QsU0FBU29CLFlBQVQsQ0FBc0JQLE9BQXRCLEVBQStCZCxPQUEvQixFQUF3QztBQUNwQyxXQUFPLDZCQUFJNUUsTUFBTXVHLEtBQUtDLEdBQUwsQ0FDYmQsUUFBUW5FLFFBQVIsQ0FBaUJTLE1BREosRUFFYjRDLFFBQVFyRCxRQUFSLENBQWlCUyxNQUZKLENBQU4sRUFHUjFELElBSFEsRUFBSixHQUdJb0QsR0FISixDQUdRO0FBQUEsZUFBS3NELEtBQUtVLFFBQVFuRSxRQUFSLENBQWlCa0YsQ0FBakIsQ0FBTCxFQUEwQjdCLFFBQVFyRCxRQUFSLENBQWlCa0YsQ0FBakIsQ0FBMUIsQ0FBTDtBQUFBLEtBSFIsQ0FBUDtBQUlIOztRQUlHekIsSSxHQUFBQSxJOzs7Ozs7Ozs7Ozs7O0FDMURKLElBQU0wQixVQUFVO0FBQ1pkLFlBQVEsUUFESTtBQUVaQyxZQUFRLFFBRkk7QUFHWkUsYUFBUyxTQUhHO0FBSVpDLFlBQVEsUUFKSTtBQUtaTSxlQUFXLFdBTEM7QUFNWkQsa0JBQWM7QUFORixDQUFoQjs7a0JBVWVLLE87Ozs7Ozs7Ozs7Ozs7O0FDVmY7O0FBQ0E7O0FBQ0E7O0FBSUEsU0FBU3pCLEtBQVQsQ0FBZTBCLE1BQWYsRUFBdUI5QixPQUF2QixFQUF5QztBQUFBLFFBQVQxRSxLQUFTLHVFQUFILENBQUc7O0FBQ3JDLFFBQUksQ0FBQzBFLE9BQUwsRUFBYztBQUNkLFFBQU16RCxLQUFLdUYsT0FBT0MsVUFBUCxDQUFrQnpHLEtBQWxCLENBQVg7QUFDQSxRQUFJLENBQUNpQixFQUFMLEVBQVM7QUFDVCxZQUFReUQsUUFBUWMsSUFBaEI7QUFDSSxhQUFLLGtCQUFXQyxNQUFoQjtBQUF3QjtBQUFBLG9CQUNaRixPQURZLEdBQ0FiLE9BREEsQ0FDWmEsT0FEWTs7QUFFcEIsb0JBQU12RyxRQUFRLDBCQUFjdUcsT0FBZCxDQUFkO0FBQ0Esb0JBQUl2RixVQUFVd0csT0FBT0MsVUFBUCxDQUFrQjVFLE1BQWhDLEVBQ0kyRSxPQUFPbkgsV0FBUCxDQUFtQkwsS0FBbkIsRUFESixLQUVLd0gsT0FBT2xILFlBQVAsQ0FBb0JOLEtBQXBCLEVBQTJCaUMsRUFBM0I7QUFDTDtBQUNIO0FBQ0QsYUFBSyxrQkFBV3lFLE1BQWhCO0FBQXdCO0FBQ3BCYyx1QkFBT0UsV0FBUCxDQUFtQnpGLEVBQW5CO0FBQ0E7QUFDSDtBQUNELGFBQUssa0JBQVcyRSxPQUFoQjtBQUF5QjtBQUFBLG9CQUNiTCxRQURhLEdBQ0RiLE9BREMsQ0FDYmEsT0FEYTs7QUFFckIsb0JBQU12RyxTQUFRLDBCQUFjdUcsUUFBZCxDQUFkO0FBQ0FpQix1QkFBT0csWUFBUCxDQUFvQjNILE1BQXBCLEVBQTJCaUMsRUFBM0I7QUFDQTtBQUNIO0FBQ0QsYUFBSyxrQkFBVzRFLE1BQWhCO0FBQXdCO0FBQUEsb0JBQ1p6RSxRQURZLEdBQ2FzRCxPQURiLENBQ1p0RCxRQURZO0FBQUEsb0JBQ0ZuRCxVQURFLEdBQ2F5RyxPQURiLENBQ0Z6RyxVQURFOztBQUVwQjJJLGdDQUFnQjNGLEVBQWhCLEVBQW9CaEQsVUFBcEI7QUFDQW1ELHlCQUFTN0MsT0FBVCxDQUFpQixVQUFDc0ksS0FBRCxFQUFRN0csS0FBUjtBQUFBLDJCQUFrQjhFLE1BQU03RCxFQUFOLEVBQVU0RixLQUFWLEVBQWlCN0csS0FBakIsQ0FBbEI7QUFBQSxpQkFBakI7QUFDQTtBQUNIO0FBeEJMO0FBMEJIOztBQUVELFNBQVM0RyxlQUFULENBQXlCRSxPQUF6QixFQUFrQzdJLFVBQWxDLEVBQThDO0FBQzFDQSxlQUFXTSxPQUFYLENBQW1CLGlCQUFTO0FBQUEsWUFDaEJpSCxJQURnQixHQUNVVixLQURWLENBQ2hCVSxJQURnQjtBQUFBLFlBQ1YvRyxRQURVLEdBQ1VxRyxLQURWLENBQ1ZyRyxRQURVO0FBQUEsWUFDQXlCLEtBREEsR0FDVTRFLEtBRFYsQ0FDQTVFLEtBREE7O0FBRXhCLFlBQUlzRixTQUFTLGtCQUFXVyxTQUF4QixFQUNJLDBCQUFhVyxPQUFiLEVBQXNCckksUUFBdEIsRUFBZ0N5QixLQUFoQyxFQURKLEtBRUssSUFBSXNGLFNBQVMsa0JBQVdVLFlBQXhCLEVBQ0QsNkJBQWdCWSxPQUFoQixFQUF5QnJJLFFBQXpCLEVBQW1DeUIsS0FBbkM7QUFDUCxLQU5EO0FBT0g7O1FBSUc0RSxLLEdBQUFBLEs7Ozs7Ozs7Ozs7Ozs7O0FDbERKOzs7O0FBQ0E7Ozs7QUFDQTs7OztRQUlJckQsUTtRQUNBRSxhO1FBQ0FsQyxJO1FBQU1RLFEiLCJmaWxlIjoiaW5kZXguYnVpbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYXNzZXRzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDYpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDI0NjA3N2I1NTdiZGQzOGVmZTI2IiwiXG5pbXBvcnQgeyBldmVudFR5cGVzLCBldmVudE1hcCB9IGZyb20gJy4vZXZlbnRzJztcblxuXG5cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXModGFyZ2V0LCBhdHRyaWJ1dGVzPXt9KSB7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcylcbiAgICAgICAgLmZpbHRlcihrZXkgPT4gYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICAuZm9yRWFjaChhdHRyTmFtZSA9PiBzZXRBdHRyaWJ1dGUodGFyZ2V0LCBhdHRyTmFtZSwgYXR0cmlidXRlc1thdHRyTmFtZV0pKTtcbn1cblxuXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGUodGFyZ2V0LCBhdHRyTmFtZSwgYXR0clZhbHVlKSB7XG4gICAgYXR0ck5hbWUgPT09ICdjbGFzc05hbWUnICYmIChhdHRyTmFtZSA9ICdjbGFzcycpO1xuICAgIGlmIChldmVudFR5cGVzLmluY2x1ZGVzKGF0dHJOYW1lKSlcbiAgICAgICAgcmV0dXJuIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgZXZlbnRNYXBbYXR0ck5hbWVdLFxuICAgICAgICAgICAgYXR0clZhbHVlXG4gICAgICAgICk7XG4gICAgdGFyZ2V0LnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKTtcbn1cblxuXG5mdW5jdGlvbiByZW1vdmVBdHRyaWJ1dGUodGFyZ2V0LCBhdHRyTmFtZSwgb2xkQXR0clZhbHVlKSB7XG4gICAgYXR0ck5hbWUgPT09ICdjbGFzc05hbWUnICYmIChhdHRyTmFtZSA9ICdjbGFzcycpO1xuICAgIGlmIChldmVudFR5cGVzLmluY2x1ZGVzKGF0dHJOYW1lKSlcbiAgICAgICAgcmV0dXJuIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgZXZlbnRNYXBbYXR0ck5hbWVdLFxuICAgICAgICAgICAgb2xkQXR0clZhbHVlXG4gICAgICAgICk7XG4gICAgdGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZShhdHRyTmFtZSk7XG59XG5cblxuZnVuY3Rpb24gaW5zZXJ0QWZ0ZXIobmV3RWwsIHRhcmdldEVsKSB7XG4gICAgY29uc3QgcGFyZW50RWwgPSB0YXJnZXRFbC5wYXJlbnROb2RlO1xuICAgIGlmIChwYXJlbnRFbC5sYXN0Q2hpbGQgPT09IHRhcmdldEVsKVxuICAgICAgICByZXR1cm4gcGFyZW50RWwuYXBwZW5kQ2hpbGQobmV3RWwpO1xuICAgIHJldHVybiBwYXJlbnRFbC5pbnNlcnRCZWZvcmUobmV3RWwsdGFyZ2V0RWwubmV4dFNpYmxpbmcpO1xufVxuXG5cbmV4cG9ydCB7XG4gICAgc2V0QXR0cmlidXRlcyxcbiAgICBzZXRBdHRyaWJ1dGUsXG4gICAgcmVtb3ZlQXR0cmlidXRlLFxuICAgIGluc2VydEFmdGVyXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS91dGlscy9pbmRleC5qcyIsIlxuaW1wb3J0IE9ic2VydmVyIGZyb20gJy4uL29iamVjdCc7XG5pbXBvcnQgT2JzZXJ2ZXJBcnJheSBmcm9tICcuLi9hcnJheSc7XG5cblxuY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xuXG5cblxuZnVuY3Rpb24gd2FsayhvYmosIGZ1bikge1xuICAgIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JylcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRnVuY3Rpb24gXCJ3YWxrXCIgcmVxdWlyZSBhbiBcIm9iamVjdFwiIGluc3RlYWQgb2YgJHt0eXBlb2Ygb2JqfWApO1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpXG4gICAgICAgIHJldHVybiBvYmouZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IGZ1bihpbmRleCwgaXRlbSwgb2JqKSk7XG4gICAgZWxzZVxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiBmdW4oa2V5LCBvYmpba2V5XSwgb2JqKSk7XG59XG5cbmZ1bmN0aW9uIG9ic2VydmVyKG9iaiwga2V5LCB2YWx1ZSwgc2V0dGVyQ2FsbGJhY2s9bm9vcCwgZ2V0dGVyQ2FsbGJhY2s9bm9vcCkge1xuICAgIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JylcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRnVuY3Rpb24gXCJvYnNlcnZlclwiIHJlcXVpcmUgYW4gXCJvYmplY3RcIiBpbnN0ZWFkIG9mICR7dHlwZW9mIG9ian1gKTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSlcbiAgICAgICAgdmFsdWUgPSBPYnNlcnZlckFycmF5LmZyb20odmFsdWUpO1xuICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgdmFsdWUgPSBPYnNlcnZlci5mcm9tKHZhbHVlKTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGdldDogKCkgPT4ge1xuICAgICAgICAgICAgZ2V0dGVyQ2FsbGJhY2sob2JqLCBrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICB9LFxuICAgICAgICBzZXQ6IG5ld1ZhbHVlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9sZFZhbHVlID0gb2JqW2tleV07XG4gICAgICAgICAgICBvYnNlcnZlcihvYmosIGtleSwgbmV3VmFsdWUsIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFjayk7XG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjayhvYmosIGtleSwgbmV3VmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0pXG59XG5cblxuY29uc3QgZ2V0VW5pcXVlSUQgPSBmdW5jdGlvbigpIHtcbiAgICBsZXQgaWQgPSAwO1xuICAgIHJldHVybiAoKCkgPT4gaWQgKyspO1xufSgpO1xuXG5cbmV4cG9ydCB7XG4gICAgd2FsayxcbiAgICBvYnNlcnZlcixcbiAgICBnZXRVbmlxdWVJRFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9vYnNlcnZlci91dGlscy9pbmRleC5qcyIsIlxuaW1wb3J0IHsgc2V0QXR0cmlidXRlcyB9IGZyb20gJy4uL3V0aWxzJztcblxuXG5cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQobm9kZSkge1xuICAgIC8qXG4gICAgbm9kZTogU3RyaW5nIHx8IHtcbiAgICAgICAgZWxlbWVudE5hbWU6IFN0cmluZ1xuICAgICAgICBjaGlsZHJlbjogbm9kZVtdXG4gICAgICAgIGF0dHJpYnV0ZXM6IE9iamVjdFxuICAgIH1cbiAgICAqL1xuICAgIGlmICh0eXBlb2Ygbm9kZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5vZGUuZWxlbWVudE5hbWUpO1xuICAgICAgICBub2RlLmNoaWxkcmVuICYmIGFwcGVuZENoaWxkcmVuKGVsLCBub2RlLmNoaWxkcmVuKTtcbiAgICAgICAgc2V0QXR0cmlidXRlcyhlbCwgbm9kZS5hdHRyaWJ1dGVzKTtcbiAgICAgICAgcmV0dXJuIGVsO1xuICAgIH1cbiAgICBlbHNlIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShub2RlKTtcbn1cblxuXG5mdW5jdGlvbiBhcHBlbmRDaGlsZHJlbih0YXJnZXQsIGNoaWxkcmVuKSB7XG4gICAgY2hpbGRyZW4ubWFwKGNyZWF0ZUVsZW1lbnQpXG4gICAgICAgIC5mb3JFYWNoKDo6dGFyZ2V0LmFwcGVuZENoaWxkKVxufVxuXG5cblxuZXhwb3J0IHtcbiAgICBjcmVhdGVFbGVtZW50XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS9jcmVhdGUvaW5kZXguanMiLCJcbmltcG9ydCBDaGFuZ2VUeXBlIGZyb20gJy4vY2hhbmdlJztcblxuXG5leHBvcnQge1xuICAgIENoYW5nZVR5cGVcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3R5cGVzL2luZGV4LmpzIiwiXG5pbXBvcnQgeyB3YWxrLCBvYnNlcnZlciB9IGZyb20gJy4uL3V0aWxzL2luZGV4J1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2JzZXJ2ZXIge1xuICAgIGNvbnN0cnVjdG9yKG9iaiwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JqICE9PSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVHlwZSBcIk9iamVjdFwiIHJlcXVpcmVkIScpO1xuICAgICAgICB3YWxrKG9iaiwgKGtleSwgdmFsdWUpID0+IG9ic2VydmVyKFxuICAgICAgICAgICAgdGhpcywga2V5LCB2YWx1ZSxcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrLFxuICAgICAgICAgICAgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGZyb20gPSAob2JqLCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZlcihcbiAgICAgICAgICAgIG9iaixcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrLFxuICAgICAgICAgICAgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKVxuICAgIH07XG5cbiAgICBzdGF0aWMgdG9TdHJpbmcgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBgT2JzZXJ2ZXIgJHt0aGlzfWBcbiAgICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9vYnNlcnZlci9vYmplY3QvaW5kZXguanMiLCJcbmltcG9ydCB7IHdhbGssIG9ic2VydmVyIH0gZnJvbSAnLi4vdXRpbHMvaW5kZXgnO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2JzZXJ2ZXJBcnJheSB7XG4gICAgY29uc3RydWN0b3IoYXJyYXksIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFjaykge1xuICAgICAgICAhYXJyYXkgJiYgKGFycmF5ID0gW10pO1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyYXkpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVHlwZSBcIkFycmF5XCIgcmVxdWlyZWQhJyk7XG4gICAgICAgIHdhbGsoYXJyYXksIChpbmRleCwgaXRlbSkgPT4gb2JzZXJ2ZXIoXG4gICAgICAgICAgICB0aGlzLCBpbmRleCwgaXRlbSxcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFja1xuICAgICAgICApKTtcbiAgICAgICAgdGhpcy5sZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgZnJvbSA9IChhcnJheSwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2ZXJBcnJheShcbiAgICAgICAgICAgIGFycmF5LFxuICAgICAgICAgICAgc2V0dGVyQ2FsbGJhY2ssXG4gICAgICAgICAgICBnZXR0ZXJDYWxsYmFja1xuICAgICAgICApXG4gICAgfTtcbiAgICBzdGF0aWMgaXNPYnNlcnZlckFycmF5ICA9IGFycmF5ID0+IHtcbiAgICAgICAgcmV0dXJuIGFycmF5Ll9fcHJvdG9fXy5jb25zdHJ1Y3RvciA9PT0gT2JzZXJ2ZXJBcnJheTtcbiAgICB9O1xuICAgIHN0YXRpYyBvZiA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2ZXJBcnJheShbLi4uYXJnc10pXG4gICAgfTtcblxuXG4gICAgY29uY2F0ID0gKC4uLmFycmF5cykgPT4ge1xuICAgICAgICBjb25zdCBuZXdBcnJheSA9IG5ldyBPYnNlcnZlckFycmF5KCk7XG4gICAgICAgIFt0aGlzLCAuLi5hcnJheXNdLmZvckVhY2goXG4gICAgICAgICAgICBhcnJheSA9PiBhcnJheS5mb3JFYWNoKG5ld0FycmF5LnB1c2gpXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBuZXdBcnJheTtcbiAgICB9O1xuICAgIGNvcHlXaXRoaW4gPSAoLi4uYXJncykgPT4ge1xuICAgICAgICAvLyBUT0RPXG4gICAgICAgIHJldHVybiBPYnNlcnZlckFycmF5LmZyb20oXG4gICAgICAgICAgICBBcnJheS5mcm9tKHRoaXMpLmNvcHlXaXRoaW4oLi4uYXJncylcbiAgICAgICAgKVxuICAgIH07XG4gICAgZW50cmllcyA9IGZ1bmN0aW9uICooKSB7XG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIHdoaWxlICh0aGlzW2luZGV4XSlcbiAgICAgICAgICAgIHlpZWxkIFtpbmRleCsrLCB0aGlzW2luZGV4XV07XG4gICAgfTtcbiAgICBldmVyeSA9ICgpID0+IHt9O1xuICAgIGZpbGwgPSAoKSA9PiB7fTtcbiAgICBmaWx0ZXIgPSAoKSA9PiB7fTtcbiAgICBmaW5kID0gKCkgPT4ge307XG4gICAgZmluZEluZGV4ID0gKCkgPT4ge307XG4gICAgZm9yRWFjaCA9ICgpID0+IHt9O1xuICAgIGluY2x1ZGVzID0gKCkgPT4ge307XG4gICAgaW5kZXhPZiA9ICgpID0+IHt9O1xuICAgIGpvaW4gPSAoKSA9PiB7fTtcbiAgICBrZXlzID0gKCkgPT4ge307XG4gICAgbGFzdEluZGV4T2YgPSAoKSA9PiB7fTtcbiAgICBtYXAgPSAoKSA9PiB7fTtcbiAgICBwb3AgPSAoKSA9PiB7fTtcbiAgICBwdXNoID0gdmFsdWUgPT4ge1xuICAgICAgICBvYnNlcnZlcihcbiAgICAgICAgICAgIHRoaXMsIHRoaXMubGVuZ3RoLCB2YWx1ZSxcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFja1xuICAgICAgICApO1xuICAgICAgICB0aGlzLmxlbmd0aCArKztcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gICAgcmVkdWNlID0gKCkgPT4ge307XG4gICAgcmVkdWNlUmlnaHQgPSAoKSA9PiB7fTtcbiAgICByZXZlcnNlID0gKCkgPT4ge307XG4gICAgc2hpZnQgPSAoKSA9PiB7fTtcbiAgICBzbGljZSA9ICgpID0+IHt9O1xuICAgIHNvbWUgPSAoKSA9PiB7fTtcbiAgICBzb3J0ID0gKCkgPT4ge307XG4gICAgc3BsaWNlID0gKCkgPT4ge307XG4gICAgdG9Mb2NhbGVTdHJpbmcgPSAoKSA9PiB7fTtcbiAgICB0b1NvdXJjZSA9ICgpID0+IHt9O1xuICAgIHRvU3RyaW5nID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gYE9ic2VydmVyQXJyYXkgWy4uLl1gXG4gICAgfTtcbiAgICB1bnNoaWZ0ID0gKCkgPT4ge307XG4gICAgdmFsdWVzID0gKCkgPT4ge307XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL29ic2VydmVyL2FycmF5L2luZGV4LmpzIiwiXG5pbXBvcnQgQ29tcG9uZW50IGZyb20gJy4vY29yZSc7XG5cblxuXG5leHBvcnQge1xuICAgIENvbXBvbmVudFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vaW5kZXguanMiLCJcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIGRpZmYsIHBhdGNoIH0gZnJvbSAnLi9kb20nO1xuaW1wb3J0IHsgT2JzZXJ2ZXIsIG9ic2VydmVyLCB3YWxrIH0gZnJvbSAnLi9vYnNlcnZlcic7XG5cblxuXG5jbGFzcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge31cblxuICAgIGVudHJ5ID0gbnVsbDtcbiAgICBub2RlID0gbnVsbDtcbiAgICBzdGF0ZSA9IHt9O1xuICAgIGNvbXB1dGVkID0ge307XG5cbiAgICAvLyBUT0RPOiBMaWZlQ3ljbGVcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7fTtcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHt9O1xuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKSB7fTtcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUoKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfTtcbiAgICBjb21wb25lbnRXaWxsVXBkYXRlKCkge307XG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge307XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7fTtcbiAgICBjb21wb25lbnREaWRDYXRjaCgpIHt9O1xuXG4gICAgLy8gT2JzZXJ2ZXJcbiAgICBpbml0T2JzZXJ2ZXIoKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBPYnNlcnZlci5mcm9tKFxuICAgICAgICAgICAgdGhpcy5zdGF0ZSB8fCB7fSxcbiAgICAgICAgICAgIDo6dGhpcy5zZXR0ZXJDYWxsYmFja1xuICAgICAgICApO1xuICAgIH07XG4gICAgaW5pdENvbXB1dGVkKCkge1xuICAgICAgICB3YWxrKFxuICAgICAgICAgICAgdGhpcy5jb21wdXRlZCxcbiAgICAgICAgICAgIChuYW1lLCBnZXR0ZXIsIGNvbXB1dGVkKSA9PiB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbXB1dGVkLCBuYW1lLCB7XG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGdldDogdGhpczo6Z2V0dGVyXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH1cbiAgICBzZXR0ZXJDYWxsYmFjayhvYmosIGtleSwgdmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmIChvYmogIT09IHRoaXMuc3RhdGUpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JPT00hISEnKTtcbiAgICAgICAgdGhpcy5kaWZmQW5kUGF0Y2goKTtcbiAgICB9O1xuXG4gICAgLy8gUmVuZGVyXG4gICAgYmVmb3JlUmVuZGVyKCkge1xuICAgICAgICB0aGlzLmluaXRPYnNlcnZlcigpO1xuICAgICAgICB0aGlzLmluaXRDb21wdXRlZCgpO1xuICAgIH07XG4gICAgcmVuZGVyKCkge307XG4gICAgcmVuZGVyVG8oZW50cnkpIHtcbiAgICAgICAgdGhpcy5iZWZvcmVSZW5kZXIoKTtcbiAgICAgICAgdGhpcy5ub2RlID0gdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgdGhpcy5lbnRyeSA9IGVudHJ5O1xuICAgICAgICB0aGlzLmVudHJ5LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQodGhpcy5ub2RlKSlcbiAgICB9O1xuICAgIGRpZmZBbmRQYXRjaCgpIHtcbiAgICAgICAgY29uc3Qgb2xkTm9kZSA9IHRoaXMubm9kZTtcbiAgICAgICAgdGhpcy5ub2RlID0gdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgY29uc3QgcGF0Y2hlcyA9IGRpZmYodGhpcy5ub2RlLCBvbGROb2RlKTtcbiAgICAgICAgY29uc29sZS5sb2cob2xkTm9kZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubm9kZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHBhdGNoZXMpO1xuICAgICAgICBwYXRjaCh0aGlzLmVudHJ5LCBwYXRjaGVzKTtcbiAgICB9O1xufVxuXG5cblxuZXhwb3J0IGRlZmF1bHQgQ29tcG9uZW50O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9pbmRleC5qcyIsIlxuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gJy4vY3JlYXRlJztcbmltcG9ydCB7IGRpZmYgfSBmcm9tICcuL2RpZmYnO1xuaW1wb3J0IHsgcGF0Y2ggfSBmcm9tICcuL3BhdGNoJztcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzJztcblxuXG5leHBvcnQge1xuICAgIGNyZWF0ZUVsZW1lbnQsXG4gICAgZGlmZixcbiAgICBwYXRjaCxcbiAgICB1dGlsc1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vaW5kZXguanMiLCJcbmNvbnN0IGV2ZW50VHlwZXMgPSBbXG4gICAgLy8gQ2xpcGJvYXJkIEV2ZW50c1xuICAgICdvbkNvcHknLCAnb25DdXQnLCAnb25QYXN0ZScsXG4gICAgLy8gQ29tcG9zaXRpb24gRXZlbnRzXG4gICAgJ29uQ29tcG9zaXRpb25FbmQnLCAnb25Db21wb3NpdGlvblN0YXJ0JywgJ29uQ29tcG9zaXRpb25VcGRhdGUnLFxuICAgIC8vIEtleWJvYXJkIEV2ZW50c1xuICAgICdvbktleURvd24nLCAnb25LZXlQcmVzcycsICdvbktleVVwJyxcbiAgICAvLyBGb2N1cyBFdmVudHNcbiAgICAnb25Gb2N1cycsICdvbkJsdXInLFxuICAgIC8vIEZvcm0gRXZlbnRzXG4gICAgJ29uQ2hhbmdlJywgJ29uSW5wdXQnLCAnb25JbnZhbGlkJywgJ29uU3VibWl0JyxcbiAgICAvLyBNb3VzZSBFdmVudHNcbiAgICAnb25DbGljaycsICdvbkNvbnRleHRNZW51JywgJ29uRG91YmxlQ2xpY2snLFxuICAgICdvbkRyYWcnLCAnb25EcmFnRW5kJywgJ29uRHJhZ0VudGVyJywgJ29uRHJhZ0V4aXQnLFxuICAgICdvbkRyYWdMZWF2ZScsICdvbkRyYWdPdmVyJywgJ29uRHJhZ1N0YXJ0JyxcbiAgICAnb25Ecm9wJywgJ29uTW91c2VEb3duJywgJ29uTW91c2VFbnRlcicsXG4gICAgJ29uTW91c2VMZWF2ZScsICdvbk1vdXNlTW92ZScsICdvbk1vdXNlT3V0JyxcbiAgICAnb25Nb3VzZU92ZXInICwnb25Nb3VzZVVwJyxcbiAgICAvLyBTZWxlY3Rpb24gRXZlbnRzXG4gICAgJ29uU2VsZWN0JyxcbiAgICAvLyBUb3VjaCBFdmVudHNcbiAgICAnb25Ub3VjaENhbmNlbCcsICdvblRvdWNoRW5kJywgJ29uVG91Y2hNb3ZlJywgJ29uVG91Y2hTdGFydCcsXG4gICAgLy8gVUkgRXZlbnRzXG4gICAgJ29uU2Nyb2xsJyxcbiAgICAvLyBXaGVlbCBFdmVudHNcbiAgICAnb25XaGVlbCcsXG4gICAgLy8gTWVkaWEgRXZlbnRzXG4gICAgJ29uQWJvcnQnLCAnb25DYW5QbGF5JywgJ29uQ2FuUGxheVRocm91Z2gnLFxuICAgICdvbkR1cmF0aW9uQ2hhbmdlJywgJ29uRW1wdGllZCcsICdvbkVuY3J5cHRlZG9uRW5kZWQnLFxuICAgICdvbkVycm9yJywgJ29uTG9hZGVkRGF0YScsICdvbkxvYWRlZE1ldGFkYXRhJyxcbiAgICAnb25Mb2FkU3RhcnQnLCAnb25QYXVzZScsICdvblBsYXlvblBsYXlpbmcnLFxuICAgICdvblByb2dyZXNzJywgJ29uUmF0ZUNoYW5nZScsICdvblNlZWtlZCcsXG4gICAgJ29uU2Vla2luZycsICdvblN0YWxsZWQnLCAnb25TdXNwZW5kb25UaW1lVXBkYXRlJyxcbiAgICAnb25Wb2x1bWVDaGFuZ2UnLCAnb25XYWl0aW5nJyxcbiAgICAvLyBJbWFnZSBFdmVudHNcbiAgICAnb25Mb2FkJywgJ29uRXJyb3InLFxuICAgIC8vIEFuaW1hdGlvbiBFdmVudHNcbiAgICAnb25BbmltYXRpb25TdGFydCcsICdvbkFuaW1hdGlvbkVuZCcsICdvbkFuaW1hdGlvbkl0ZXJhdGlvbicsXG4gICAgLy8gVHJhbnNpdGlvbiBFdmVudHNcbiAgICAnb25UcmFuc2l0aW9uRW5kJyxcbiAgICAvLyBPdGhlciBFdmVudHNcbiAgICAnb25Ub2dnbGUnXG5dO1xuXG5cbmNvbnN0IGV2ZW50TWFwID0gZXZlbnRUeXBlcy5yZWR1Y2UoKGV2ZW50c01hcCwgZXZlbnQpID0+IHtcbiAgICBldmVudHNNYXBbZXZlbnRdID0gZXZlbnRcbiAgICAgICAgLnJlcGxhY2UoJ29uJywgJycpXG4gICAgICAgIC5yZXBsYWNlKC9bQS1aXS8sIGUgPT4gZS50b0xvd2VyQ2FzZSgpKTtcbiAgICByZXR1cm4gZXZlbnRzTWFwO1xufSwge30pO1xuXG5cbmV4cG9ydCB7XG4gICAgZXZlbnRUeXBlcyxcbiAgICBldmVudE1hcFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vdXRpbHMvZXZlbnRzLmpzIiwiXG5pbXBvcnQgeyBDaGFuZ2VUeXBlIH0gZnJvbSAnLi4vdHlwZXMvaW5kZXgnO1xuXG5cblxuZnVuY3Rpb24gZGlmZihuZXdOb2RlLCBvbGROb2RlKSB7XG4gICAgLypcbiAgICByZXR1cm4gdHlwZSBQYXRjaCB7XG4gICAgICAgIHR5cGU6IENoYW5nZVR5cGVcbiAgICAgICAgbmV3Tm9kZT86IE5vZGVcbiAgICAgICAgY2hpbGRyZW4/OiBQYXRjaFtdXG4gICAgICAgIGF0dHJpYnV0ZXM/OiBQYXRjaFtdXG4gICAgfVxuICAgICAqL1xuICAgIGlmICghb2xkTm9kZSkgcmV0dXJuIHsgdHlwZTogQ2hhbmdlVHlwZS5DUkVBVEUsIG5ld05vZGUgfTtcbiAgICBlbHNlIGlmICghbmV3Tm9kZSkgcmV0dXJuIHsgdHlwZTogQ2hhbmdlVHlwZS5SRU1PVkUgfTtcbiAgICBlbHNlIGlmIChpc0NoYW5nZWQobmV3Tm9kZSwgb2xkTm9kZSkpIHJldHVybiB7IHR5cGU6IENoYW5nZVR5cGUuUkVQTEFDRSwgbmV3Tm9kZSB9O1xuICAgIGVsc2UgaWYgKG5ld05vZGUuZWxlbWVudE5hbWUpXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlLlVQREFURSxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBkaWZmQ2hpbGRyZW4obmV3Tm9kZSwgb2xkTm9kZSksXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBkaWZmQXR0cmlidXRlcyhuZXdOb2RlLCBvbGROb2RlKVxuICAgICAgICB9O1xufVxuXG5mdW5jdGlvbiBpc0NoYW5nZWQobmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIHJldHVybiB0eXBlb2YgbmV3Tm9kZSAhPT0gdHlwZW9mIG9sZE5vZGUgfHxcbiAgICAgICAgdHlwZW9mIG5ld05vZGUgIT09IFwib2JqZWN0XCIgJiYgbmV3Tm9kZSAhPT0gb2xkTm9kZSB8fFxuICAgICAgICB0eXBlb2YgbmV3Tm9kZSA9PT0gXCJvYmplY3RcIiAmJiBuZXdOb2RlLmVsZW1lbnROYW1lICE9PSBvbGROb2RlLmVsZW1lbnROYW1lO1xufVxuXG5mdW5jdGlvbiBkaWZmQXR0cmlidXRlcyhuZXdOb2RlLCBvbGROb2RlKSB7XG4gICAgY29uc3QgcGF0Y2hlcyAgPSBbXTtcbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gey4uLm9sZE5vZGUuYXR0cmlidXRlcywgLi4ubmV3Tm9kZS5hdHRyaWJ1dGVzfTtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5tYXAoYXR0ck5hbWUgPT4ge1xuICAgICAgICBjb25zdCBuZXdBdHRyID0gbmV3Tm9kZS5hdHRyaWJ1dGVzW2F0dHJOYW1lXTtcbiAgICAgICAgY29uc3Qgb2xkQXR0ciA9IG9sZE5vZGUuYXR0cmlidXRlc1thdHRyTmFtZV07XG4gICAgICAgICFuZXdBdHRyICYmIHBhdGNoZXMucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlLlJFTU9WRV9QUk9QUyxcbiAgICAgICAgICAgIHZhbHVlOiBvbGRBdHRyLCBhdHRyTmFtZVxuICAgICAgICB9KTtcbiAgICAgICAgKCFvbGRBdHRyIHx8IG9sZEF0dHIgIT09IG5ld0F0dHIpICYmIHBhdGNoZXMucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlLlNFVF9QUk9QUyxcbiAgICAgICAgICAgIHZhbHVlOiBuZXdBdHRyLCBhdHRyTmFtZVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gcGF0Y2hlcztcbn1cblxuXG5mdW5jdGlvbiBkaWZmQ2hpbGRyZW4obmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIHJldHVybiBbLi4uQXJyYXkoTWF0aC5tYXgoXG4gICAgICAgIG5ld05vZGUuY2hpbGRyZW4ubGVuZ3RoLFxuICAgICAgICBvbGROb2RlLmNoaWxkcmVuLmxlbmd0aFxuICAgICkpLmtleXMoKV0ubWFwKGkgPT4gZGlmZihuZXdOb2RlLmNoaWxkcmVuW2ldLCBvbGROb2RlLmNoaWxkcmVuW2ldKSk7XG59XG5cblxuZXhwb3J0IHtcbiAgICBkaWZmXG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL2RpZmYvaW5kZXguanMiLCJcbmNvbnN0IENoYW5nZWQgPSB7XG4gICAgQ1JFQVRFOiAnQ1JFQVRFJyxcbiAgICBSRU1PVkU6ICdSRU1PVkUnLFxuICAgIFJFUExBQ0U6ICdSRVBMQUNFJyxcbiAgICBVUERBVEU6ICdVUERBVEUnLFxuICAgIFNFVF9QUk9QUzogJ1NFVCBQUk9QUycsXG4gICAgUkVNT1ZFX1BST1BTOiAnUkVNT1ZFIFBST1BTJ1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBDaGFuZ2VkO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vdHlwZXMvY2hhbmdlLmpzIiwiXG5pbXBvcnQgeyBDaGFuZ2VUeXBlIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gJy4uL2NyZWF0ZS9pbmRleCc7XG5pbXBvcnQgeyBzZXRBdHRyaWJ1dGUsIHJlbW92ZUF0dHJpYnV0ZSB9IGZyb20gXCIuLi91dGlscy9pbmRleFwiO1xuXG5cblxuZnVuY3Rpb24gcGF0Y2gocGFyZW50LCBwYXRjaGVzLCBpbmRleD0wKSB7XG4gICAgaWYgKCFwYXRjaGVzKSByZXR1cm47XG4gICAgY29uc3QgZWwgPSBwYXJlbnQuY2hpbGROb2Rlc1tpbmRleF07XG4gICAgaWYgKCFlbCkgcmV0dXJuO1xuICAgIHN3aXRjaCAocGF0Y2hlcy50eXBlKSB7XG4gICAgICAgIGNhc2UgQ2hhbmdlVHlwZS5DUkVBVEU6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgbmV3Tm9kZSB9ID0gcGF0Y2hlcztcbiAgICAgICAgICAgIGNvbnN0IG5ld0VsID0gY3JlYXRlRWxlbWVudChuZXdOb2RlKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gcGFyZW50LmNoaWxkTm9kZXMubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChuZXdFbCk7XG4gICAgICAgICAgICBlbHNlIHBhcmVudC5pbnNlcnRCZWZvcmUobmV3RWwsIGVsKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQ2hhbmdlVHlwZS5SRU1PVkU6IHtcbiAgICAgICAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChlbCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENoYW5nZVR5cGUuUkVQTEFDRToge1xuICAgICAgICAgICAgY29uc3QgeyBuZXdOb2RlIH0gPSBwYXRjaGVzO1xuICAgICAgICAgICAgY29uc3QgbmV3RWwgPSBjcmVhdGVFbGVtZW50KG5ld05vZGUpO1xuICAgICAgICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZChuZXdFbCwgZWwpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBDaGFuZ2VUeXBlLlVQREFURToge1xuICAgICAgICAgICAgY29uc3QgeyBjaGlsZHJlbiwgYXR0cmlidXRlcyB9ID0gcGF0Y2hlcztcbiAgICAgICAgICAgIHBhdGNoQXR0cmlidXRlcyhlbCwgYXR0cmlidXRlcyk7XG4gICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZCwgaW5kZXgpID0+IHBhdGNoKGVsLCBjaGlsZCwgaW5kZXgpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBwYXRjaEF0dHJpYnV0ZXMoZWxlbWVudCwgYXR0cmlidXRlcykge1xuICAgIGF0dHJpYnV0ZXMuZm9yRWFjaChwYXRjaCA9PiB7XG4gICAgICAgIGNvbnN0IHsgdHlwZSwgYXR0ck5hbWUsIHZhbHVlIH0gPSBwYXRjaDtcbiAgICAgICAgaWYgKHR5cGUgPT09IENoYW5nZVR5cGUuU0VUX1BST1BTKVxuICAgICAgICAgICAgc2V0QXR0cmlidXRlKGVsZW1lbnQsIGF0dHJOYW1lLCB2YWx1ZSk7XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT09IENoYW5nZVR5cGUuUkVNT1ZFX1BST1BTKVxuICAgICAgICAgICAgcmVtb3ZlQXR0cmlidXRlKGVsZW1lbnQsIGF0dHJOYW1lLCB2YWx1ZSlcbiAgICB9KVxufVxuXG5cbmV4cG9ydCB7XG4gICAgcGF0Y2hcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3BhdGNoL2luZGV4LmpzIiwiXG5pbXBvcnQgT2JzZXJ2ZXIgZnJvbSAnLi9vYmplY3QnO1xuaW1wb3J0IE9ic2VydmVyQXJyYXkgZnJvbSAnLi9hcnJheSc7XG5pbXBvcnQgeyB3YWxrLCBvYnNlcnZlciB9IGZyb20gJy4vdXRpbHMnO1xuXG5cbmV4cG9ydCB7XG4gICAgT2JzZXJ2ZXIsXG4gICAgT2JzZXJ2ZXJBcnJheSxcbiAgICB3YWxrLCBvYnNlcnZlclxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9vYnNlcnZlci9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=