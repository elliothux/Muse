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
                    children: ['I\'m ', this.state.age, ' years old.']
                }, {
                    elementName: 'p',
                    attributes: {},
                    children: ['I can ', this.computed.canDrive ? {
                        elementName: 'span',
                        attributes: {},
                        children: ['not']
                    } : null, ' Drive']
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjQ2MDc3YjU1N2JkZDM4ZWZlMjYiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci91dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9jcmVhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdHlwZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci9vYmplY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci9hcnJheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3V0aWxzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9kaWZmL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3R5cGVzL2NoYW5nZS5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9wYXRjaC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL29ic2VydmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL2V4YW1wbGUvaW5kZXguanMiXSwibmFtZXMiOlsic2V0QXR0cmlidXRlcyIsInRhcmdldCIsImF0dHJpYnV0ZXMiLCJPYmplY3QiLCJrZXlzIiwiZmlsdGVyIiwiaGFzT3duUHJvcGVydHkiLCJrZXkiLCJmb3JFYWNoIiwic2V0QXR0cmlidXRlIiwiYXR0ck5hbWUiLCJhdHRyVmFsdWUiLCJpbmNsdWRlcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVBdHRyaWJ1dGUiLCJvbGRBdHRyVmFsdWUiLCJpbnNlcnRBZnRlciIsIm5ld0VsIiwidGFyZ2V0RWwiLCJwYXJlbnRFbCIsInBhcmVudE5vZGUiLCJsYXN0Q2hpbGQiLCJhcHBlbmRDaGlsZCIsImluc2VydEJlZm9yZSIsIm5leHRTaWJsaW5nIiwibm9vcCIsIndhbGsiLCJvYmoiLCJmdW4iLCJUeXBlRXJyb3IiLCJBcnJheSIsImlzQXJyYXkiLCJpdGVtIiwiaW5kZXgiLCJvYnNlcnZlciIsInZhbHVlIiwic2V0dGVyQ2FsbGJhY2siLCJnZXR0ZXJDYWxsYmFjayIsImZyb20iLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJnZXQiLCJzZXQiLCJvbGRWYWx1ZSIsIm5ld1ZhbHVlIiwiZ2V0VW5pcXVlSUQiLCJpZCIsImNyZWF0ZUVsZW1lbnQiLCJub2RlIiwiZWwiLCJkb2N1bWVudCIsImVsZW1lbnROYW1lIiwiY2hpbGRyZW4iLCJhcHBlbmRDaGlsZHJlbiIsImNyZWF0ZVRleHROb2RlIiwibWFwIiwiQ2hhbmdlVHlwZSIsIk9ic2VydmVyIiwidG9TdHJpbmciLCJPYnNlcnZlckFycmF5IiwiYXJyYXkiLCJsZW5ndGgiLCJpc09ic2VydmVyQXJyYXkiLCJfX3Byb3RvX18iLCJjb25zdHJ1Y3RvciIsIm9mIiwiYXJncyIsImNvbmNhdCIsImFycmF5cyIsIm5ld0FycmF5IiwicHVzaCIsImNvcHlXaXRoaW4iLCJlbnRyaWVzIiwiZXZlcnkiLCJmaWxsIiwiZmluZCIsImZpbmRJbmRleCIsImluZGV4T2YiLCJqb2luIiwibGFzdEluZGV4T2YiLCJwb3AiLCJyZWR1Y2UiLCJyZWR1Y2VSaWdodCIsInJldmVyc2UiLCJzaGlmdCIsInNsaWNlIiwic29tZSIsInNvcnQiLCJzcGxpY2UiLCJ0b0xvY2FsZVN0cmluZyIsInRvU291cmNlIiwidW5zaGlmdCIsInZhbHVlcyIsIkNvbXBvbmVudCIsImVudHJ5Iiwic3RhdGUiLCJjb21wdXRlZCIsIm5hbWUiLCJnZXR0ZXIiLCJFcnJvciIsImRpZmZBbmRQYXRjaCIsImluaXRPYnNlcnZlciIsImluaXRDb21wdXRlZCIsImJlZm9yZVJlbmRlciIsInJlbmRlciIsIm9sZE5vZGUiLCJwYXRjaGVzIiwiY29uc29sZSIsImxvZyIsImRpZmYiLCJwYXRjaCIsInV0aWxzIiwiZXZlbnRUeXBlcyIsImV2ZW50TWFwIiwiZXZlbnRzTWFwIiwiZXZlbnQiLCJyZXBsYWNlIiwiZSIsInRvTG93ZXJDYXNlIiwibmV3Tm9kZSIsInR5cGUiLCJDUkVBVEUiLCJSRU1PVkUiLCJpc0NoYW5nZWQiLCJSRVBMQUNFIiwiVVBEQVRFIiwiZGlmZkNoaWxkcmVuIiwiZGlmZkF0dHJpYnV0ZXMiLCJuZXdBdHRyIiwib2xkQXR0ciIsIlJFTU9WRV9QUk9QUyIsIlNFVF9QUk9QUyIsIk1hdGgiLCJtYXgiLCJpIiwiQ2hhbmdlZCIsInBhcmVudCIsImNoaWxkTm9kZXMiLCJyZW1vdmVDaGlsZCIsInJlcGxhY2VDaGlsZCIsInBhdGNoQXR0cmlidXRlcyIsImNoaWxkIiwiZWxlbWVudCIsIkFwcCIsImFnZSIsImNhbkRyaXZlIiwiaGFuZGxlQ2xpY2siLCJhcHAiLCJyZW5kZXJUbyIsImdldEVsZW1lbnRCeUlkIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzVEQTs7QUFJQSxTQUFTQSxhQUFULENBQXVCQyxNQUF2QixFQUE4QztBQUFBLFFBQWZDLFVBQWUsdUVBQUosRUFBSTs7QUFDMUNDLFdBQU9DLElBQVAsQ0FBWUYsVUFBWixFQUNL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QUtOLElBQU1DLE1BQU0sSUFBSUosR0FBSixFQUFaO0FBQ0FJLElBQUlDLFFBQUosQ0FBYWxHLFNBQVNtRyxjQUFULENBQXdCLE1BQXhCLENBQWIsRSIsImZpbGUiOiJleGFtcGxlLmJ1aWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Fzc2V0cy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMjQ2MDc3YjU1N2JkZDM4ZWZlMjYiLCJcbmltcG9ydCB7IGV2ZW50VHlwZXMsIGV2ZW50TWFwIH0gZnJvbSAnLi9ldmVudHMnO1xuXG5cblxuZnVuY3Rpb24gc2V0QXR0cmlidXRlcyh0YXJnZXQsIGF0dHJpYnV0ZXM9e30pIHtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKVxuICAgICAgICAuZmlsdGVyKGtleSA9PiBhdHRyaWJ1dGVzLmhhc093blByb3BlcnR5KGtleSkpXG4gICAgICAgIC5mb3JFYWNoKGF0dHJOYW1lID0+IHNldEF0dHJpYnV0ZSh0YXJnZXQsIGF0dHJOYW1lLCBhdHRyaWJ1dGVzW2F0dHJOYW1lXSkpO1xufVxuXG5cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZSh0YXJnZXQsIGF0dHJOYW1lLCBhdHRyVmFsdWUpIHtcbiAgICBhdHRyTmFtZSA9PT0gJ2NsYXNzTmFtZScgJiYgKGF0dHJOYW1lID0gJ2NsYXNzJyk7XG4gICAgaWYgKGV2ZW50VHlwZXMuaW5jbHVkZXMoYXR0ck5hbWUpKVxuICAgICAgICByZXR1cm4gdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICBldmVudE1hcFthdHRyTmFtZV0sXG4gICAgICAgICAgICBhdHRyVmFsdWVcbiAgICAgICAgKTtcbiAgICB0YXJnZXQuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsdWUpO1xufVxuXG5cbmZ1bmN0aW9uIHJlbW92ZUF0dHJpYnV0ZSh0YXJnZXQsIGF0dHJOYW1lLCBvbGRBdHRyVmFsdWUpIHtcbiAgICBhdHRyTmFtZSA9PT0gJ2NsYXNzTmFtZScgJiYgKGF0dHJOYW1lID0gJ2NsYXNzJyk7XG4gICAgaWYgKGV2ZW50VHlwZXMuaW5jbHVkZXMoYXR0ck5hbWUpKVxuICAgICAgICByZXR1cm4gdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICBldmVudE1hcFthdHRyTmFtZV0sXG4gICAgICAgICAgICBvbGRBdHRyVmFsdWVcbiAgICAgICAgKTtcbiAgICB0YXJnZXQucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcbn1cblxuXG5mdW5jdGlvbiBpbnNlcnRBZnRlcihuZXdFbCwgdGFyZ2V0RWwpIHtcbiAgICBjb25zdCBwYXJlbnRFbCA9IHRhcmdldEVsLnBhcmVudE5vZGU7XG4gICAgaWYgKHBhcmVudEVsLmxhc3RDaGlsZCA9PT0gdGFyZ2V0RWwpXG4gICAgICAgIHJldHVybiBwYXJlbnRFbC5hcHBlbmRDaGlsZChuZXdFbCk7XG4gICAgcmV0dXJuIHBhcmVudEVsLmluc2VydEJlZm9yZShuZXdFbCx0YXJnZXRFbC5uZXh0U2libGluZyk7XG59XG5cblxuZXhwb3J0IHtcbiAgICBzZXRBdHRyaWJ1dGVzLFxuICAgIHNldEF0dHJpYnV0ZSxcbiAgICByZW1vdmVBdHRyaWJ1dGUsXG4gICAgaW5zZXJ0QWZ0ZXJcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3V0aWxzL2luZGV4LmpzIiwiXG5pbXBvcnQgT2JzZXJ2ZXIgZnJvbSAnLi4vb2JqZWN0JztcbmltcG9ydCBPYnNlcnZlckFycmF5IGZyb20gJy4uL2FycmF5JztcblxuXG5jb25zdCBub29wID0gKCkgPT4ge307XG5cblxuXG5mdW5jdGlvbiB3YWxrKG9iaiwgZnVuKSB7XG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBGdW5jdGlvbiBcIndhbGtcIiByZXF1aXJlIGFuIFwib2JqZWN0XCIgaW5zdGVhZCBvZiAke3R5cGVvZiBvYmp9YCk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSlcbiAgICAgICAgcmV0dXJuIG9iai5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4gZnVuKGluZGV4LCBpdGVtLCBvYmopKTtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IGZ1bihrZXksIG9ialtrZXldLCBvYmopKTtcbn1cblxuZnVuY3Rpb24gb2JzZXJ2ZXIob2JqLCBrZXksIHZhbHVlLCBzZXR0ZXJDYWxsYmFjaz1ub29wLCBnZXR0ZXJDYWxsYmFjaz1ub29wKSB7XG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBGdW5jdGlvbiBcIm9ic2VydmVyXCIgcmVxdWlyZSBhbiBcIm9iamVjdFwiIGluc3RlYWQgb2YgJHt0eXBlb2Ygb2JqfWApO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKVxuICAgICAgICB2YWx1ZSA9IE9ic2VydmVyQXJyYXkuZnJvbSh2YWx1ZSk7XG4gICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKVxuICAgICAgICB2YWx1ZSA9IE9ic2VydmVyLmZyb20odmFsdWUpO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgICAgICBnZXR0ZXJDYWxsYmFjayhvYmosIGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgICAgIH0sXG4gICAgICAgIHNldDogbmV3VmFsdWUgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSBvYmpba2V5XTtcbiAgICAgICAgICAgIG9ic2VydmVyKG9iaiwga2V5LCBuZXdWYWx1ZSwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKTtcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrKG9iaiwga2V5LCBuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICB9XG4gICAgfSlcbn1cblxuXG5jb25zdCBnZXRVbmlxdWVJRCA9IGZ1bmN0aW9uKCkge1xuICAgIGxldCBpZCA9IDA7XG4gICAgcmV0dXJuICgoKSA9PiBpZCArKyk7XG59KCk7XG5cblxuZXhwb3J0IHtcbiAgICB3YWxrLFxuICAgIG9ic2VydmVyLFxuICAgIGdldFVuaXF1ZUlEXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL29ic2VydmVyL3V0aWxzL2luZGV4LmpzIiwiXG5pbXBvcnQgeyBzZXRBdHRyaWJ1dGVzIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5cblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudChub2RlKSB7XG4gICAgLypcbiAgICBub2RlOiBTdHJpbmcgfHwge1xuICAgICAgICBlbGVtZW50TmFtZTogU3RyaW5nXG4gICAgICAgIGNoaWxkcmVuOiBub2RlW11cbiAgICAgICAgYXR0cmlidXRlczogT2JqZWN0XG4gICAgfVxuICAgICovXG4gICAgaWYgKHR5cGVvZiBub2RlID09PSAnb2JqZWN0Jykge1xuICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobm9kZS5lbGVtZW50TmFtZSk7XG4gICAgICAgIG5vZGUuY2hpbGRyZW4gJiYgYXBwZW5kQ2hpbGRyZW4oZWwsIG5vZGUuY2hpbGRyZW4pO1xuICAgICAgICBzZXRBdHRyaWJ1dGVzKGVsLCBub2RlLmF0dHJpYnV0ZXMpO1xuICAgICAgICByZXR1cm4gZWw7XG4gICAgfVxuICAgIGVsc2UgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG5vZGUpO1xufVxuXG5cbmZ1bmN0aW9uIGFwcGVuZENoaWxkcmVuKHRhcmdldCwgY2hpbGRyZW4pIHtcbiAgICBjaGlsZHJlbi5tYXAoY3JlYXRlRWxlbWVudClcbiAgICAgICAgLmZvckVhY2goOjp0YXJnZXQuYXBwZW5kQ2hpbGQpXG59XG5cblxuXG5leHBvcnQge1xuICAgIGNyZWF0ZUVsZW1lbnRcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL2NyZWF0ZS9pbmRleC5qcyIsIlxuaW1wb3J0IENoYW5nZVR5cGUgZnJvbSAnLi9jaGFuZ2UnO1xuXG5cbmV4cG9ydCB7XG4gICAgQ2hhbmdlVHlwZVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vdHlwZXMvaW5kZXguanMiLCJcbmltcG9ydCB7IHdhbGssIG9ic2VydmVyIH0gZnJvbSAnLi4vdXRpbHMvaW5kZXgnXG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPYnNlcnZlciB7XG4gICAgY29uc3RydWN0b3Iob2JqLCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUeXBlIFwiT2JqZWN0XCIgcmVxdWlyZWQhJyk7XG4gICAgICAgIHdhbGsob2JqLCAoa2V5LCB2YWx1ZSkgPT4gb2JzZXJ2ZXIoXG4gICAgICAgICAgICB0aGlzLCBrZXksIHZhbHVlLFxuICAgICAgICAgICAgc2V0dGVyQ2FsbGJhY2ssXG4gICAgICAgICAgICBnZXR0ZXJDYWxsYmFja1xuICAgICAgICApKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZnJvbSA9IChvYmosIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFjaykgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmVyKFxuICAgICAgICAgICAgb2JqLFxuICAgICAgICAgICAgc2V0dGVyQ2FsbGJhY2ssXG4gICAgICAgICAgICBnZXR0ZXJDYWxsYmFja1xuICAgICAgICApXG4gICAgfTtcblxuICAgIHN0YXRpYyB0b1N0cmluZyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGBPYnNlcnZlciAke3RoaXN9YFxuICAgIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL29ic2VydmVyL29iamVjdC9pbmRleC5qcyIsIlxuaW1wb3J0IHsgd2Fsaywgb2JzZXJ2ZXIgfSBmcm9tICcuLi91dGlscy9pbmRleCc7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPYnNlcnZlckFycmF5IHtcbiAgICBjb25zdHJ1Y3RvcihhcnJheSwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKSB7XG4gICAgICAgICFhcnJheSAmJiAoYXJyYXkgPSBbXSk7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShhcnJheSkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUeXBlIFwiQXJyYXlcIiByZXF1aXJlZCEnKTtcbiAgICAgICAgd2FsayhhcnJheSwgKGluZGV4LCBpdGVtKSA9PiBvYnNlcnZlcihcbiAgICAgICAgICAgIHRoaXMsIGluZGV4LCBpdGVtLFxuICAgICAgICAgICAgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrXG4gICAgICAgICkpO1xuICAgICAgICB0aGlzLmxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBmcm9tID0gKGFycmF5LCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZlckFycmF5KFxuICAgICAgICAgICAgYXJyYXksXG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjayxcbiAgICAgICAgICAgIGdldHRlckNhbGxiYWNrXG4gICAgICAgIClcbiAgICB9O1xuICAgIHN0YXRpYyBpc09ic2VydmVyQXJyYXkgID0gYXJyYXkgPT4ge1xuICAgICAgICByZXR1cm4gYXJyYXkuX19wcm90b19fLmNvbnN0cnVjdG9yID09PSBPYnNlcnZlckFycmF5O1xuICAgIH07XG4gICAgc3RhdGljIG9mID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZlckFycmF5KFsuLi5hcmdzXSlcbiAgICB9O1xuXG5cbiAgICBjb25jYXQgPSAoLi4uYXJyYXlzKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0FycmF5ID0gbmV3IE9ic2VydmVyQXJyYXkoKTtcbiAgICAgICAgW3RoaXMsIC4uLmFycmF5c10uZm9yRWFjaChcbiAgICAgICAgICAgIGFycmF5ID0+IGFycmF5LmZvckVhY2gobmV3QXJyYXkucHVzaClcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIG5ld0FycmF5O1xuICAgIH07XG4gICAgY29weVdpdGhpbiA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgIC8vIFRPRE9cbiAgICAgICAgcmV0dXJuIE9ic2VydmVyQXJyYXkuZnJvbShcbiAgICAgICAgICAgIEFycmF5LmZyb20odGhpcykuY29weVdpdGhpbiguLi5hcmdzKVxuICAgICAgICApXG4gICAgfTtcbiAgICBlbnRyaWVzID0gZnVuY3Rpb24gKigpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgd2hpbGUgKHRoaXNbaW5kZXhdKVxuICAgICAgICAgICAgeWllbGQgW2luZGV4KyssIHRoaXNbaW5kZXhdXTtcbiAgICB9O1xuICAgIGV2ZXJ5ID0gKCkgPT4ge307XG4gICAgZmlsbCA9ICgpID0+IHt9O1xuICAgIGZpbHRlciA9ICgpID0+IHt9O1xuICAgIGZpbmQgPSAoKSA9PiB7fTtcbiAgICBmaW5kSW5kZXggPSAoKSA9PiB7fTtcbiAgICBmb3JFYWNoID0gKCkgPT4ge307XG4gICAgaW5jbHVkZXMgPSAoKSA9PiB7fTtcbiAgICBpbmRleE9mID0gKCkgPT4ge307XG4gICAgam9pbiA9ICgpID0+IHt9O1xuICAgIGtleXMgPSAoKSA9PiB7fTtcbiAgICBsYXN0SW5kZXhPZiA9ICgpID0+IHt9O1xuICAgIG1hcCA9ICgpID0+IHt9O1xuICAgIHBvcCA9ICgpID0+IHt9O1xuICAgIHB1c2ggPSB2YWx1ZSA9PiB7XG4gICAgICAgIG9ic2VydmVyKFxuICAgICAgICAgICAgdGhpcywgdGhpcy5sZW5ndGgsIHZhbHVlLFxuICAgICAgICAgICAgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMubGVuZ3RoICsrO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICByZWR1Y2UgPSAoKSA9PiB7fTtcbiAgICByZWR1Y2VSaWdodCA9ICgpID0+IHt9O1xuICAgIHJldmVyc2UgPSAoKSA9PiB7fTtcbiAgICBzaGlmdCA9ICgpID0+IHt9O1xuICAgIHNsaWNlID0gKCkgPT4ge307XG4gICAgc29tZSA9ICgpID0+IHt9O1xuICAgIHNvcnQgPSAoKSA9PiB7fTtcbiAgICBzcGxpY2UgPSAoKSA9PiB7fTtcbiAgICB0b0xvY2FsZVN0cmluZyA9ICgpID0+IHt9O1xuICAgIHRvU291cmNlID0gKCkgPT4ge307XG4gICAgdG9TdHJpbmcgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBgT2JzZXJ2ZXJBcnJheSBbLi4uXWBcbiAgICB9O1xuICAgIHVuc2hpZnQgPSAoKSA9PiB7fTtcbiAgICB2YWx1ZXMgPSAoKSA9PiB7fTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvb2JzZXJ2ZXIvYXJyYXkvaW5kZXguanMiLCJcbmltcG9ydCBDb21wb25lbnQgZnJvbSAnLi9jb3JlJztcblxuXG5cbmV4cG9ydCB7XG4gICAgQ29tcG9uZW50XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9pbmRleC5qcyIsIlxuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgZGlmZiwgcGF0Y2ggfSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgeyBPYnNlcnZlciwgb2JzZXJ2ZXIsIHdhbGsgfSBmcm9tICcuL29ic2VydmVyJztcblxuXG5cbmNsYXNzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgZW50cnkgPSBudWxsO1xuICAgIG5vZGUgPSBudWxsO1xuICAgIHN0YXRlID0ge307XG4gICAgY29tcHV0ZWQgPSB7fTtcblxuICAgIC8vIFRPRE86IExpZmVDeWNsZVxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHt9O1xuICAgIGNvbXBvbmVudERpZE1vdW50KCkge307XG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcygpIHt9O1xuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9O1xuICAgIGNvbXBvbmVudFdpbGxVcGRhdGUoKSB7fTtcbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7fTtcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHt9O1xuICAgIGNvbXBvbmVudERpZENhdGNoKCkge307XG5cbiAgICAvLyBPYnNlcnZlclxuICAgIGluaXRPYnNlcnZlcigpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IE9ic2VydmVyLmZyb20oXG4gICAgICAgICAgICB0aGlzLnN0YXRlIHx8IHt9LFxuICAgICAgICAgICAgOjp0aGlzLnNldHRlckNhbGxiYWNrXG4gICAgICAgICk7XG4gICAgfTtcbiAgICBpbml0Q29tcHV0ZWQoKSB7XG4gICAgICAgIHdhbGsoXG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVkLFxuICAgICAgICAgICAgKG5hbWUsIGdldHRlciwgY29tcHV0ZWQpID0+IHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29tcHV0ZWQsIG5hbWUsIHtcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgZ2V0OiB0aGlzOjpnZXR0ZXJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgfVxuICAgIHNldHRlckNhbGxiYWNrKG9iaiwga2V5LCB2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKG9iaiAhPT0gdGhpcy5zdGF0ZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQk9PTSEhIScpO1xuICAgICAgICB0aGlzLmRpZmZBbmRQYXRjaCgpO1xuICAgIH07XG5cbiAgICAvLyBSZW5kZXJcbiAgICBiZWZvcmVSZW5kZXIoKSB7XG4gICAgICAgIHRoaXMuaW5pdE9ic2VydmVyKCk7XG4gICAgICAgIHRoaXMuaW5pdENvbXB1dGVkKCk7XG4gICAgfTtcbiAgICByZW5kZXIoKSB7fTtcbiAgICByZW5kZXJUbyhlbnRyeSkge1xuICAgICAgICB0aGlzLmJlZm9yZVJlbmRlcigpO1xuICAgICAgICB0aGlzLm5vZGUgPSB0aGlzLnJlbmRlcigpO1xuICAgICAgICB0aGlzLmVudHJ5ID0gZW50cnk7XG4gICAgICAgIHRoaXMuZW50cnkuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudCh0aGlzLm5vZGUpKVxuICAgIH07XG4gICAgZGlmZkFuZFBhdGNoKCkge1xuICAgICAgICBjb25zdCBvbGROb2RlID0gdGhpcy5ub2RlO1xuICAgICAgICB0aGlzLm5vZGUgPSB0aGlzLnJlbmRlcigpO1xuICAgICAgICBjb25zdCBwYXRjaGVzID0gZGlmZih0aGlzLm5vZGUsIG9sZE5vZGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhvbGROb2RlKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5ub2RlKTtcbiAgICAgICAgY29uc29sZS5sb2cocGF0Y2hlcyk7XG4gICAgICAgIHBhdGNoKHRoaXMuZW50cnksIHBhdGNoZXMpO1xuICAgIH07XG59XG5cblxuXG5leHBvcnQgZGVmYXVsdCBDb21wb25lbnQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2luZGV4LmpzIiwiXG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSAnLi9jcmVhdGUnO1xuaW1wb3J0IHsgZGlmZiB9IGZyb20gJy4vZGlmZic7XG5pbXBvcnQgeyBwYXRjaCB9IGZyb20gJy4vcGF0Y2gnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMnO1xuXG5cbmV4cG9ydCB7XG4gICAgY3JlYXRlRWxlbWVudCxcbiAgICBkaWZmLFxuICAgIHBhdGNoLFxuICAgIHV0aWxzXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS9pbmRleC5qcyIsIlxuY29uc3QgZXZlbnRUeXBlcyA9IFtcbiAgICAvLyBDbGlwYm9hcmQgRXZlbnRzXG4gICAgJ29uQ29weScsICdvbkN1dCcsICdvblBhc3RlJyxcbiAgICAvLyBDb21wb3NpdGlvbiBFdmVudHNcbiAgICAnb25Db21wb3NpdGlvbkVuZCcsICdvbkNvbXBvc2l0aW9uU3RhcnQnLCAnb25Db21wb3NpdGlvblVwZGF0ZScsXG4gICAgLy8gS2V5Ym9hcmQgRXZlbnRzXG4gICAgJ29uS2V5RG93bicsICdvbktleVByZXNzJywgJ29uS2V5VXAnLFxuICAgIC8vIEZvY3VzIEV2ZW50c1xuICAgICdvbkZvY3VzJywgJ29uQmx1cicsXG4gICAgLy8gRm9ybSBFdmVudHNcbiAgICAnb25DaGFuZ2UnLCAnb25JbnB1dCcsICdvbkludmFsaWQnLCAnb25TdWJtaXQnLFxuICAgIC8vIE1vdXNlIEV2ZW50c1xuICAgICdvbkNsaWNrJywgJ29uQ29udGV4dE1lbnUnLCAnb25Eb3VibGVDbGljaycsXG4gICAgJ29uRHJhZycsICdvbkRyYWdFbmQnLCAnb25EcmFnRW50ZXInLCAnb25EcmFnRXhpdCcsXG4gICAgJ29uRHJhZ0xlYXZlJywgJ29uRHJhZ092ZXInLCAnb25EcmFnU3RhcnQnLFxuICAgICdvbkRyb3AnLCAnb25Nb3VzZURvd24nLCAnb25Nb3VzZUVudGVyJyxcbiAgICAnb25Nb3VzZUxlYXZlJywgJ29uTW91c2VNb3ZlJywgJ29uTW91c2VPdXQnLFxuICAgICdvbk1vdXNlT3ZlcicgLCdvbk1vdXNlVXAnLFxuICAgIC8vIFNlbGVjdGlvbiBFdmVudHNcbiAgICAnb25TZWxlY3QnLFxuICAgIC8vIFRvdWNoIEV2ZW50c1xuICAgICdvblRvdWNoQ2FuY2VsJywgJ29uVG91Y2hFbmQnLCAnb25Ub3VjaE1vdmUnLCAnb25Ub3VjaFN0YXJ0JyxcbiAgICAvLyBVSSBFdmVudHNcbiAgICAnb25TY3JvbGwnLFxuICAgIC8vIFdoZWVsIEV2ZW50c1xuICAgICdvbldoZWVsJyxcbiAgICAvLyBNZWRpYSBFdmVudHNcbiAgICAnb25BYm9ydCcsICdvbkNhblBsYXknLCAnb25DYW5QbGF5VGhyb3VnaCcsXG4gICAgJ29uRHVyYXRpb25DaGFuZ2UnLCAnb25FbXB0aWVkJywgJ29uRW5jcnlwdGVkb25FbmRlZCcsXG4gICAgJ29uRXJyb3InLCAnb25Mb2FkZWREYXRhJywgJ29uTG9hZGVkTWV0YWRhdGEnLFxuICAgICdvbkxvYWRTdGFydCcsICdvblBhdXNlJywgJ29uUGxheW9uUGxheWluZycsXG4gICAgJ29uUHJvZ3Jlc3MnLCAnb25SYXRlQ2hhbmdlJywgJ29uU2Vla2VkJyxcbiAgICAnb25TZWVraW5nJywgJ29uU3RhbGxlZCcsICdvblN1c3BlbmRvblRpbWVVcGRhdGUnLFxuICAgICdvblZvbHVtZUNoYW5nZScsICdvbldhaXRpbmcnLFxuICAgIC8vIEltYWdlIEV2ZW50c1xuICAgICdvbkxvYWQnLCAnb25FcnJvcicsXG4gICAgLy8gQW5pbWF0aW9uIEV2ZW50c1xuICAgICdvbkFuaW1hdGlvblN0YXJ0JywgJ29uQW5pbWF0aW9uRW5kJywgJ29uQW5pbWF0aW9uSXRlcmF0aW9uJyxcbiAgICAvLyBUcmFuc2l0aW9uIEV2ZW50c1xuICAgICdvblRyYW5zaXRpb25FbmQnLFxuICAgIC8vIE90aGVyIEV2ZW50c1xuICAgICdvblRvZ2dsZSdcbl07XG5cblxuY29uc3QgZXZlbnRNYXAgPSBldmVudFR5cGVzLnJlZHVjZSgoZXZlbnRzTWFwLCBldmVudCkgPT4ge1xuICAgIGV2ZW50c01hcFtldmVudF0gPSBldmVudFxuICAgICAgICAucmVwbGFjZSgnb24nLCAnJylcbiAgICAgICAgLnJlcGxhY2UoL1tBLVpdLywgZSA9PiBlLnRvTG93ZXJDYXNlKCkpO1xuICAgIHJldHVybiBldmVudHNNYXA7XG59LCB7fSk7XG5cblxuZXhwb3J0IHtcbiAgICBldmVudFR5cGVzLFxuICAgIGV2ZW50TWFwXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS91dGlscy9ldmVudHMuanMiLCJcbmltcG9ydCB7IENoYW5nZVR5cGUgfSBmcm9tICcuLi90eXBlcy9pbmRleCc7XG5cblxuXG5mdW5jdGlvbiBkaWZmKG5ld05vZGUsIG9sZE5vZGUpIHtcbiAgICAvKlxuICAgIHJldHVybiB0eXBlIFBhdGNoIHtcbiAgICAgICAgdHlwZTogQ2hhbmdlVHlwZVxuICAgICAgICBuZXdOb2RlPzogTm9kZVxuICAgICAgICBjaGlsZHJlbj86IFBhdGNoW11cbiAgICAgICAgYXR0cmlidXRlcz86IFBhdGNoW11cbiAgICB9XG4gICAgICovXG4gICAgaWYgKCFvbGROb2RlKSByZXR1cm4geyB0eXBlOiBDaGFuZ2VUeXBlLkNSRUFURSwgbmV3Tm9kZSB9O1xuICAgIGVsc2UgaWYgKCFuZXdOb2RlKSByZXR1cm4geyB0eXBlOiBDaGFuZ2VUeXBlLlJFTU9WRSB9O1xuICAgIGVsc2UgaWYgKGlzQ2hhbmdlZChuZXdOb2RlLCBvbGROb2RlKSkgcmV0dXJuIHsgdHlwZTogQ2hhbmdlVHlwZS5SRVBMQUNFLCBuZXdOb2RlIH07XG4gICAgZWxzZSBpZiAobmV3Tm9kZS5lbGVtZW50TmFtZSlcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IENoYW5nZVR5cGUuVVBEQVRFLFxuICAgICAgICAgICAgY2hpbGRyZW46IGRpZmZDaGlsZHJlbihuZXdOb2RlLCBvbGROb2RlKSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IGRpZmZBdHRyaWJ1dGVzKG5ld05vZGUsIG9sZE5vZGUpXG4gICAgICAgIH07XG59XG5cbmZ1bmN0aW9uIGlzQ2hhbmdlZChuZXdOb2RlLCBvbGROb2RlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBuZXdOb2RlICE9PSB0eXBlb2Ygb2xkTm9kZSB8fFxuICAgICAgICB0eXBlb2YgbmV3Tm9kZSAhPT0gXCJvYmplY3RcIiAmJiBuZXdOb2RlICE9PSBvbGROb2RlIHx8XG4gICAgICAgIHR5cGVvZiBuZXdOb2RlID09PSBcIm9iamVjdFwiICYmIG5ld05vZGUuZWxlbWVudE5hbWUgIT09IG9sZE5vZGUuZWxlbWVudE5hbWU7XG59XG5cbmZ1bmN0aW9uIGRpZmZBdHRyaWJ1dGVzKG5ld05vZGUsIG9sZE5vZGUpIHtcbiAgICBjb25zdCBwYXRjaGVzICA9IFtdO1xuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSB7Li4ub2xkTm9kZS5hdHRyaWJ1dGVzLCAuLi5uZXdOb2RlLmF0dHJpYnV0ZXN9O1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLm1hcChhdHRyTmFtZSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0F0dHIgPSBuZXdOb2RlLmF0dHJpYnV0ZXNbYXR0ck5hbWVdO1xuICAgICAgICBjb25zdCBvbGRBdHRyID0gb2xkTm9kZS5hdHRyaWJ1dGVzW2F0dHJOYW1lXTtcbiAgICAgICAgIW5ld0F0dHIgJiYgcGF0Y2hlcy5wdXNoKHtcbiAgICAgICAgICAgIHR5cGU6IENoYW5nZVR5cGUuUkVNT1ZFX1BST1BTLFxuICAgICAgICAgICAgdmFsdWU6IG9sZEF0dHIsIGF0dHJOYW1lXG4gICAgICAgIH0pO1xuICAgICAgICAoIW9sZEF0dHIgfHwgb2xkQXR0ciAhPT0gbmV3QXR0cikgJiYgcGF0Y2hlcy5wdXNoKHtcbiAgICAgICAgICAgIHR5cGU6IENoYW5nZVR5cGUuU0VUX1BST1BTLFxuICAgICAgICAgICAgdmFsdWU6IG5ld0F0dHIsIGF0dHJOYW1lXG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBwYXRjaGVzO1xufVxuXG5cbmZ1bmN0aW9uIGRpZmZDaGlsZHJlbihuZXdOb2RlLCBvbGROb2RlKSB7XG4gICAgcmV0dXJuIFsuLi5BcnJheShNYXRoLm1heChcbiAgICAgICAgbmV3Tm9kZS5jaGlsZHJlbi5sZW5ndGgsXG4gICAgICAgIG9sZE5vZGUuY2hpbGRyZW4ubGVuZ3RoXG4gICAgKSkua2V5cygpXS5tYXAoaSA9PiBkaWZmKG5ld05vZGUuY2hpbGRyZW5baV0sIG9sZE5vZGUuY2hpbGRyZW5baV0pKTtcbn1cblxuXG5leHBvcnQge1xuICAgIGRpZmZcbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vZGlmZi9pbmRleC5qcyIsIlxuY29uc3QgQ2hhbmdlZCA9IHtcbiAgICBDUkVBVEU6ICdDUkVBVEUnLFxuICAgIFJFTU9WRTogJ1JFTU9WRScsXG4gICAgUkVQTEFDRTogJ1JFUExBQ0UnLFxuICAgIFVQREFURTogJ1VQREFURScsXG4gICAgU0VUX1BST1BTOiAnU0VUIFBST1BTJyxcbiAgICBSRU1PVkVfUFJPUFM6ICdSRU1PVkUgUFJPUFMnXG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IENoYW5nZWQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS90eXBlcy9jaGFuZ2UuanMiLCJcbmltcG9ydCB7IENoYW5nZVR5cGUgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSAnLi4vY3JlYXRlL2luZGV4JztcbmltcG9ydCB7IHNldEF0dHJpYnV0ZSwgcmVtb3ZlQXR0cmlidXRlIH0gZnJvbSBcIi4uL3V0aWxzL2luZGV4XCI7XG5cblxuXG5mdW5jdGlvbiBwYXRjaChwYXJlbnQsIHBhdGNoZXMsIGluZGV4PTApIHtcbiAgICBpZiAoIXBhdGNoZXMpIHJldHVybjtcbiAgICBjb25zdCBlbCA9IHBhcmVudC5jaGlsZE5vZGVzW2luZGV4XTtcbiAgICBpZiAoIWVsKSByZXR1cm47XG4gICAgc3dpdGNoIChwYXRjaGVzLnR5cGUpIHtcbiAgICAgICAgY2FzZSBDaGFuZ2VUeXBlLkNSRUFURToge1xuICAgICAgICAgICAgY29uc3QgeyBuZXdOb2RlIH0gPSBwYXRjaGVzO1xuICAgICAgICAgICAgY29uc3QgbmV3RWwgPSBjcmVhdGVFbGVtZW50KG5ld05vZGUpO1xuICAgICAgICAgICAgaWYgKGluZGV4ID09PSBwYXJlbnQuY2hpbGROb2Rlcy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKG5ld0VsKTtcbiAgICAgICAgICAgIGVsc2UgcGFyZW50Lmluc2VydEJlZm9yZShuZXdFbCwgZWwpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBDaGFuZ2VUeXBlLlJFTU9WRToge1xuICAgICAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQ2hhbmdlVHlwZS5SRVBMQUNFOiB7XG4gICAgICAgICAgICBjb25zdCB7IG5ld05vZGUgfSA9IHBhdGNoZXM7XG4gICAgICAgICAgICBjb25zdCBuZXdFbCA9IGNyZWF0ZUVsZW1lbnQobmV3Tm9kZSk7XG4gICAgICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKG5ld0VsLCBlbCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENoYW5nZVR5cGUuVVBEQVRFOiB7XG4gICAgICAgICAgICBjb25zdCB7IGNoaWxkcmVuLCBhdHRyaWJ1dGVzIH0gPSBwYXRjaGVzO1xuICAgICAgICAgICAgcGF0Y2hBdHRyaWJ1dGVzKGVsLCBhdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goKGNoaWxkLCBpbmRleCkgPT4gcGF0Y2goZWwsIGNoaWxkLCBpbmRleCkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBhdGNoQXR0cmlidXRlcyhlbGVtZW50LCBhdHRyaWJ1dGVzKSB7XG4gICAgYXR0cmlidXRlcy5mb3JFYWNoKHBhdGNoID0+IHtcbiAgICAgICAgY29uc3QgeyB0eXBlLCBhdHRyTmFtZSwgdmFsdWUgfSA9IHBhdGNoO1xuICAgICAgICBpZiAodHlwZSA9PT0gQ2hhbmdlVHlwZS5TRVRfUFJPUFMpXG4gICAgICAgICAgICBzZXRBdHRyaWJ1dGUoZWxlbWVudCwgYXR0ck5hbWUsIHZhbHVlKTtcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gQ2hhbmdlVHlwZS5SRU1PVkVfUFJPUFMpXG4gICAgICAgICAgICByZW1vdmVBdHRyaWJ1dGUoZWxlbWVudCwgYXR0ck5hbWUsIHZhbHVlKVxuICAgIH0pXG59XG5cblxuZXhwb3J0IHtcbiAgICBwYXRjaFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vcGF0Y2gvaW5kZXguanMiLCJcbmltcG9ydCBPYnNlcnZlciBmcm9tICcuL29iamVjdCc7XG5pbXBvcnQgT2JzZXJ2ZXJBcnJheSBmcm9tICcuL2FycmF5JztcbmltcG9ydCB7IHdhbGssIG9ic2VydmVyIH0gZnJvbSAnLi91dGlscyc7XG5cblxuZXhwb3J0IHtcbiAgICBPYnNlcnZlcixcbiAgICBPYnNlcnZlckFycmF5LFxuICAgIHdhbGssIG9ic2VydmVyXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL29ic2VydmVyL2luZGV4LmpzIiwiXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuLi9pbmRleCc7XG5cblxuXG5jbGFzcyBBcHAgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHN0YXRlID0ge1xuICAgICAgICBuYW1lOiAnSm9lJyxcbiAgICAgICAgYWdlOiAyMlxuICAgIH1cblxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgICBjYW5Ecml2ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmFnZSAlIDIgPT09IDBcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc3RhdGUuYWdlICsrO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHsgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIHsvKjxwIGlmPXt0aGlzLmNvbXB1dGVkLmNhbkRyaXZlfT5JJ20ge3RoaXMuc3RhdGUubmFtZX0uPC9wPiovfVxuICAgICAgICAgICAgPHA+SSdtIHt0aGlzLnN0YXRlLmFnZX0geWVhcnMgb2xkLjwvcD5cbiAgICAgICAgICAgIDxwPkkgY2FuIDxzcGFuIGlmPXt0aGlzLmNvbXB1dGVkLmNhbkRyaXZlfT5ub3Q8L3NwYW4+IERyaXZlPC9wPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XG4gICAgICAgICAgICA+Q2xpY2sgTWU8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgKX1cbn1cblxuXG5cbmNvbnN0IGFwcCA9IG5ldyBBcHAoKTtcbmFwcC5yZW5kZXJUbyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2V4YW1wbGUvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9