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

    this.map = function (exec) {
        return Array.from(_this2).map(exec);
    };

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
            age: 22,
            list: ['JavaScript', 'Python', 'Rust', 'Scala']
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
                    elementName: 'ul',
                    attributes: {},
                    children: [Array.from(this.state.list).map(function (lang, index) {
                        return {
                            elementName: 'li',
                            attributes: {
                                key: index
                            },
                            children: [lang]
                        };
                    }.bind(this))]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjUxOTFkNjUwYzUxNmFjNzhjMGUiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci91dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9jcmVhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9kb20vdHlwZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci9vYmplY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci9hcnJheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3V0aWxzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9kaWZmL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvZG9tL3R5cGVzL2NoYW5nZS5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2RvbS9wYXRjaC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL29ic2VydmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL2V4YW1wbGUvaW5kZXguanMiXSwibmFtZXMiOlsic2V0QXR0cmlidXRlcyIsInRhcmdldCIsImF0dHJpYnV0ZXMiLCJPYmplY3QiLCJrZXlzIiwiZmlsdGVyIiwiaGFzT3duUHJvcGVydHkiLCJrZXkiLCJmb3JFYWNoIiwic2V0QXR0cmlidXRlIiwiYXR0ck5hbWUiLCJhdHRyVmFsdWUiLCJpbmNsdWRlcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVBdHRyaWJ1dGUiLCJvbGRBdHRyVmFsdWUiLCJpbnNlcnRBZnRlciIsIm5ld0VsIiwidGFyZ2V0RWwiLCJwYXJlbnRFbCIsInBhcmVudE5vZGUiLCJsYXN0Q2hpbGQiLCJhcHBlbmRDaGlsZCIsImluc2VydEJlZm9yZSIsIm5leHRTaWJsaW5nIiwibm9vcCIsIndhbGsiLCJvYmoiLCJmdW4iLCJUeXBlRXJyb3IiLCJBcnJheSIsImlzQXJyYXkiLCJpdGVtIiwiaW5kZXgiLCJvYnNlcnZlciIsInZhbHVlIiwic2V0dGVyQ2FsbGJhY2siLCJnZXR0ZXJDYWxsYmFjayIsImZyb20iLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJnZXQiLCJzZXQiLCJvbGRWYWx1ZSIsIm5ld1ZhbHVlIiwiZ2V0VW5pcXVlSUQiLCJpZCIsImNyZWF0ZUVsZW1lbnQiLCJub2RlIiwiZWwiLCJkb2N1bWVudCIsImVsZW1lbnROYW1lIiwiY2hpbGRyZW4iLCJhcHBlbmRDaGlsZHJlbiIsImNyZWF0ZVRleHROb2RlIiwibWFwIiwiQ2hhbmdlVHlwZSIsIk9ic2VydmVyIiwidG9TdHJpbmciLCJPYnNlcnZlckFycmF5IiwiYXJyYXkiLCJsZW5ndGgiLCJpc09ic2VydmVyQXJyYXkiLCJfX3Byb3RvX18iLCJjb25zdHJ1Y3RvciIsIm9mIiwiYXJncyIsImNvbmNhdCIsImFycmF5cyIsIm5ld0FycmF5IiwicHVzaCIsImNvcHlXaXRoaW4iLCJlbnRyaWVzIiwiZXZlcnkiLCJmaWxsIiwiZmluZCIsImZpbmRJbmRleCIsImluZGV4T2YiLCJqb2luIiwibGFzdEluZGV4T2YiLCJleGVjIiwicG9wIiwicmVkdWNlIiwicmVkdWNlUmlnaHQiLCJyZXZlcnNlIiwic2hpZnQiLCJzbGljZSIsInNvbWUiLCJzb3J0Iiwic3BsaWNlIiwidG9Mb2NhbGVTdHJpbmciLCJ0b1NvdXJjZSIsInVuc2hpZnQiLCJ2YWx1ZXMiLCJDb21wb25lbnQiLCJlbnRyeSIsInN0YXRlIiwiY29tcHV0ZWQiLCJuYW1lIiwiZ2V0dGVyIiwiRXJyb3IiLCJkaWZmQW5kUGF0Y2giLCJpbml0T2JzZXJ2ZXIiLCJpbml0Q29tcHV0ZWQiLCJiZWZvcmVSZW5kZXIiLCJyZW5kZXIiLCJvbGROb2RlIiwicGF0Y2hlcyIsImNvbnNvbGUiLCJsb2ciLCJkaWZmIiwicGF0Y2giLCJ1dGlscyIsImV2ZW50VHlwZXMiLCJldmVudE1hcCIsImV2ZW50c01hcCIsImV2ZW50IiwicmVwbGFjZSIsImUiLCJ0b0xvd2VyQ2FzZSIsIm5ld05vZGUiLCJ0eXBlIiwiQ1JFQVRFIiwiUkVNT1ZFIiwiaXNDaGFuZ2VkIiwiUkVQTEFDRSIsIlVQREFURSIsImRpZmZDaGlsZHJlbiIsImRpZmZBdHRyaWJ1dGVzIiwibmV3QXR0ciIsIm9sZEF0dHIiLCJSRU1PVkVfUFJPUFMiLCJTRVRfUFJPUFMiLCJNYXRoIiwibWF4IiwiaSIsIkNoYW5nZWQiLCJwYXJlbnQiLCJjaGlsZE5vZGVzIiwicmVtb3ZlQ2hpbGQiLCJyZXBsYWNlQ2hpbGQiLCJwYXRjaEF0dHJpYnV0ZXMiLCJjaGlsZCIsImVsZW1lbnQiLCJBcHAiLCJhZ2UiLCJsaXN0IiwiY2FuRHJpdmUiLCJoYW5kbGVDbGljayIsImxhbmciLCJhcHAiLCJyZW5kZXJUbyIsImdldEVsZW1lbnRCeUlkIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzVEQTs7QUFJQSxTQUFTQSxhQUFULENBQXVCQyxNQUF2QixFQUE4QztBQUFBLFFBQWZDLFVBQWUsdUVBQUosRUFBSTs7QUFDMUNDLFdBQU9D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V2lELEdBSGhCO0FBQUE7QUFBQTtBQUFBO0FBQUEseUNBSWdCLEtBQUtoRCxRQUFMLENBQWNrRCxRQUo5QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMENBTzJCLEtBQUtuRCxLQUFMLENBQVdrRCxJQVB0QztBQUFBO0FBQUE7QUFBQTtBQUFBLHFDQVFVbEg7QUFSVjtBQUFBLHVDQVNHcUgsSUFUSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQ0FZVSxLQUFLRDtBQVpmO0FBQUE7QUFBQTtBQUFBO0FBZVQ7Ozs7OztBQUtOLElBQU1FLE1BQU0sSUFBSU4sR0FBSixFQUFaO0FBQ0FNLElBQUlDLFFBQUosQ0FBYXJHLFNBQVNzRyxjQUFULENBQXdCLE1BQXhCLENBQWIsRSIsImZpbGUiOiJleGFtcGxlLmJ1aWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Fzc2V0cy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMjUxOTFkNjUwYzUxNmFjNzhjMGUiLCJcbmltcG9ydCB7IGV2ZW50VHlwZXMsIGV2ZW50TWFwIH0gZnJvbSAnLi9ldmVudHMnO1xuXG5cblxuZnVuY3Rpb24gc2V0QXR0cmlidXRlcyh0YXJnZXQsIGF0dHJpYnV0ZXM9e30pIHtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKVxuICAgICAgICAuZmlsdGVyKGtleSA9PiBhdHRyaWJ1dGVzLmhhc093blByb3BlcnR5KGtleSkpXG4gICAgICAgIC5mb3JFYWNoKGF0dHJOYW1lID0+IHNldEF0dHJpYnV0ZSh0YXJnZXQsIGF0dHJOYW1lLCBhdHRyaWJ1dGVzW2F0dHJOYW1lXSkpO1xufVxuXG5cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZSh0YXJnZXQsIGF0dHJOYW1lLCBhdHRyVmFsdWUpIHtcbiAgICBhdHRyTmFtZSA9PT0gJ2NsYXNzTmFtZScgJiYgKGF0dHJOYW1lID0gJ2NsYXNzJyk7XG4gICAgaWYgKGV2ZW50VHlwZXMuaW5jbHVkZXMoYXR0ck5hbWUpKVxuICAgICAgICByZXR1cm4gdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICBldmVudE1hcFthdHRyTmFtZV0sXG4gICAgICAgICAgICBhdHRyVmFsdWVcbiAgICAgICAgKTtcbiAgICB0YXJnZXQuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsdWUpO1xufVxuXG5cbmZ1bmN0aW9uIHJlbW92ZUF0dHJpYnV0ZSh0YXJnZXQsIGF0dHJOYW1lLCBvbGRBdHRyVmFsdWUpIHtcbiAgICBhdHRyTmFtZSA9PT0gJ2NsYXNzTmFtZScgJiYgKGF0dHJOYW1lID0gJ2NsYXNzJyk7XG4gICAgaWYgKGV2ZW50VHlwZXMuaW5jbHVkZXMoYXR0ck5hbWUpKVxuICAgICAgICByZXR1cm4gdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICBldmVudE1hcFthdHRyTmFtZV0sXG4gICAgICAgICAgICBvbGRBdHRyVmFsdWVcbiAgICAgICAgKTtcbiAgICB0YXJnZXQucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcbn1cblxuXG5mdW5jdGlvbiBpbnNlcnRBZnRlcihuZXdFbCwgdGFyZ2V0RWwpIHtcbiAgICBjb25zdCBwYXJlbnRFbCA9IHRhcmdldEVsLnBhcmVudE5vZGU7XG4gICAgaWYgKHBhcmVudEVsLmxhc3RDaGlsZCA9PT0gdGFyZ2V0RWwpXG4gICAgICAgIHJldHVybiBwYXJlbnRFbC5hcHBlbmRDaGlsZChuZXdFbCk7XG4gICAgcmV0dXJuIHBhcmVudEVsLmluc2VydEJlZm9yZShuZXdFbCx0YXJnZXRFbC5uZXh0U2libGluZyk7XG59XG5cblxuZXhwb3J0IHtcbiAgICBzZXRBdHRyaWJ1dGVzLFxuICAgIHNldEF0dHJpYnV0ZSxcbiAgICByZW1vdmVBdHRyaWJ1dGUsXG4gICAgaW5zZXJ0QWZ0ZXJcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3V0aWxzL2luZGV4LmpzIiwiXG5pbXBvcnQgT2JzZXJ2ZXIgZnJvbSAnLi4vb2JqZWN0JztcbmltcG9ydCBPYnNlcnZlckFycmF5IGZyb20gJy4uL2FycmF5JztcblxuXG5jb25zdCBub29wID0gKCkgPT4ge307XG5cblxuXG5mdW5jdGlvbiB3YWxrKG9iaiwgZnVuKSB7XG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBGdW5jdGlvbiBcIndhbGtcIiByZXF1aXJlIGFuIFwib2JqZWN0XCIgaW5zdGVhZCBvZiAke3R5cGVvZiBvYmp9YCk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSlcbiAgICAgICAgcmV0dXJuIG9iai5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4gZnVuKGluZGV4LCBpdGVtLCBvYmopKTtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IGZ1bihrZXksIG9ialtrZXldLCBvYmopKTtcbn1cblxuZnVuY3Rpb24gb2JzZXJ2ZXIob2JqLCBrZXksIHZhbHVlLCBzZXR0ZXJDYWxsYmFjaz1ub29wLCBnZXR0ZXJDYWxsYmFjaz1ub29wKSB7XG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBGdW5jdGlvbiBcIm9ic2VydmVyXCIgcmVxdWlyZSBhbiBcIm9iamVjdFwiIGluc3RlYWQgb2YgJHt0eXBlb2Ygb2JqfWApO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKVxuICAgICAgICB2YWx1ZSA9IE9ic2VydmVyQXJyYXkuZnJvbSh2YWx1ZSk7XG4gICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKVxuICAgICAgICB2YWx1ZSA9IE9ic2VydmVyLmZyb20odmFsdWUpO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgICAgICBnZXR0ZXJDYWxsYmFjayhvYmosIGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgICAgIH0sXG4gICAgICAgIHNldDogbmV3VmFsdWUgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSBvYmpba2V5XTtcbiAgICAgICAgICAgIG9ic2VydmVyKG9iaiwga2V5LCBuZXdWYWx1ZSwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKTtcbiAgICAgICAgICAgIHNldHRlckNhbGxiYWNrKG9iaiwga2V5LCBuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICB9XG4gICAgfSlcbn1cblxuXG5jb25zdCBnZXRVbmlxdWVJRCA9IGZ1bmN0aW9uKCkge1xuICAgIGxldCBpZCA9IDA7XG4gICAgcmV0dXJuICgoKSA9PiBpZCArKyk7XG59KCk7XG5cblxuZXhwb3J0IHtcbiAgICB3YWxrLFxuICAgIG9ic2VydmVyLFxuICAgIGdldFVuaXF1ZUlEXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL29ic2VydmVyL3V0aWxzL2luZGV4LmpzIiwiXG5pbXBvcnQgeyBzZXRBdHRyaWJ1dGVzIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5cblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudChub2RlKSB7XG4gICAgLypcbiAgICBub2RlOiBTdHJpbmcgfHwge1xuICAgICAgICBlbGVtZW50TmFtZTogU3RyaW5nXG4gICAgICAgIGNoaWxkcmVuOiBub2RlW11cbiAgICAgICAgYXR0cmlidXRlczogT2JqZWN0XG4gICAgfVxuICAgICovXG4gICAgaWYgKHR5cGVvZiBub2RlID09PSAnb2JqZWN0Jykge1xuICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobm9kZS5lbGVtZW50TmFtZSk7XG4gICAgICAgIG5vZGUuY2hpbGRyZW4gJiYgYXBwZW5kQ2hpbGRyZW4oZWwsIG5vZGUuY2hpbGRyZW4pO1xuICAgICAgICBzZXRBdHRyaWJ1dGVzKGVsLCBub2RlLmF0dHJpYnV0ZXMpO1xuICAgICAgICByZXR1cm4gZWw7XG4gICAgfVxuICAgIGVsc2UgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG5vZGUpO1xufVxuXG5cbmZ1bmN0aW9uIGFwcGVuZENoaWxkcmVuKHRhcmdldCwgY2hpbGRyZW4pIHtcbiAgICBjaGlsZHJlbi5tYXAoY3JlYXRlRWxlbWVudClcbiAgICAgICAgLmZvckVhY2goOjp0YXJnZXQuYXBwZW5kQ2hpbGQpXG59XG5cblxuXG5leHBvcnQge1xuICAgIGNyZWF0ZUVsZW1lbnRcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL2NyZWF0ZS9pbmRleC5qcyIsIlxuaW1wb3J0IENoYW5nZVR5cGUgZnJvbSAnLi9jaGFuZ2UnO1xuXG5cbmV4cG9ydCB7XG4gICAgQ2hhbmdlVHlwZVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9kb20vdHlwZXMvaW5kZXguanMiLCJcbmltcG9ydCB7IHdhbGssIG9ic2VydmVyIH0gZnJvbSAnLi4vdXRpbHMvaW5kZXgnXG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPYnNlcnZlciB7XG4gICAgY29uc3RydWN0b3Iob2JqLCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUeXBlIFwiT2JqZWN0XCIgcmVxdWlyZWQhJyk7XG4gICAgICAgIHdhbGsob2JqLCAoa2V5LCB2YWx1ZSkgPT4gb2JzZXJ2ZXIoXG4gICAgICAgICAgICB0aGlzLCBrZXksIHZhbHVlLFxuICAgICAgICAgICAgc2V0dGVyQ2FsbGJhY2ssXG4gICAgICAgICAgICBnZXR0ZXJDYWxsYmFja1xuICAgICAgICApKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZnJvbSA9IChvYmosIHNldHRlckNhbGxiYWNrLCBnZXR0ZXJDYWxsYmFjaykgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmVyKFxuICAgICAgICAgICAgb2JqLFxuICAgICAgICAgICAgc2V0dGVyQ2FsbGJhY2ssXG4gICAgICAgICAgICBnZXR0ZXJDYWxsYmFja1xuICAgICAgICApXG4gICAgfTtcblxuICAgIHN0YXRpYyB0b1N0cmluZyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGBPYnNlcnZlciAke3RoaXN9YFxuICAgIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL29ic2VydmVyL29iamVjdC9pbmRleC5qcyIsIlxuaW1wb3J0IHsgd2Fsaywgb2JzZXJ2ZXIgfSBmcm9tICcuLi91dGlscy9pbmRleCc7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPYnNlcnZlckFycmF5IHtcbiAgICBjb25zdHJ1Y3RvcihhcnJheSwgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrKSB7XG4gICAgICAgICFhcnJheSAmJiAoYXJyYXkgPSBbXSk7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShhcnJheSkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUeXBlIFwiQXJyYXlcIiByZXF1aXJlZCEnKTtcbiAgICAgICAgd2FsayhhcnJheSwgKGluZGV4LCBpdGVtKSA9PiBvYnNlcnZlcihcbiAgICAgICAgICAgIHRoaXMsIGluZGV4LCBpdGVtLFxuICAgICAgICAgICAgc2V0dGVyQ2FsbGJhY2ssIGdldHRlckNhbGxiYWNrXG4gICAgICAgICkpO1xuICAgICAgICB0aGlzLmxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBmcm9tID0gKGFycmF5LCBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2spID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZlckFycmF5KFxuICAgICAgICAgICAgYXJyYXksXG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjayxcbiAgICAgICAgICAgIGdldHRlckNhbGxiYWNrXG4gICAgICAgIClcbiAgICB9O1xuICAgIHN0YXRpYyBpc09ic2VydmVyQXJyYXkgID0gYXJyYXkgPT4ge1xuICAgICAgICByZXR1cm4gYXJyYXkuX19wcm90b19fLmNvbnN0cnVjdG9yID09PSBPYnNlcnZlckFycmF5O1xuICAgIH07XG4gICAgc3RhdGljIG9mID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZlckFycmF5KFsuLi5hcmdzXSlcbiAgICB9O1xuXG5cbiAgICBjb25jYXQgPSAoLi4uYXJyYXlzKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0FycmF5ID0gbmV3IE9ic2VydmVyQXJyYXkoKTtcbiAgICAgICAgW3RoaXMsIC4uLmFycmF5c10uZm9yRWFjaChcbiAgICAgICAgICAgIGFycmF5ID0+IGFycmF5LmZvckVhY2gobmV3QXJyYXkucHVzaClcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIG5ld0FycmF5O1xuICAgIH07XG4gICAgY29weVdpdGhpbiA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgIC8vIFRPRE9cbiAgICAgICAgcmV0dXJuIE9ic2VydmVyQXJyYXkuZnJvbShcbiAgICAgICAgICAgIEFycmF5LmZyb20odGhpcykuY29weVdpdGhpbiguLi5hcmdzKVxuICAgICAgICApXG4gICAgfTtcbiAgICBlbnRyaWVzID0gZnVuY3Rpb24gKigpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgd2hpbGUgKHRoaXNbaW5kZXhdKVxuICAgICAgICAgICAgeWllbGQgW2luZGV4KyssIHRoaXNbaW5kZXhdXTtcbiAgICB9O1xuICAgIGV2ZXJ5ID0gKCkgPT4ge307XG4gICAgZmlsbCA9ICgpID0+IHt9O1xuICAgIGZpbHRlciA9ICgpID0+IHt9O1xuICAgIGZpbmQgPSAoKSA9PiB7fTtcbiAgICBmaW5kSW5kZXggPSAoKSA9PiB7fTtcbiAgICBmb3JFYWNoID0gKCkgPT4ge307XG4gICAgaW5jbHVkZXMgPSAoKSA9PiB7fTtcbiAgICBpbmRleE9mID0gKCkgPT4ge307XG4gICAgam9pbiA9ICgpID0+IHt9O1xuICAgIGtleXMgPSAoKSA9PiB7fTtcbiAgICBsYXN0SW5kZXhPZiA9ICgpID0+IHt9O1xuICAgIG1hcCA9IChleGVjKSA9PiB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMpLm1hcChleGVjKVxuICAgIH07XG4gICAgcG9wID0gKCkgPT4ge307XG4gICAgcHVzaCA9IHZhbHVlID0+IHtcbiAgICAgICAgb2JzZXJ2ZXIoXG4gICAgICAgICAgICB0aGlzLCB0aGlzLmxlbmd0aCwgdmFsdWUsXG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5sZW5ndGggKys7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIHJlZHVjZSA9ICgpID0+IHt9O1xuICAgIHJlZHVjZVJpZ2h0ID0gKCkgPT4ge307XG4gICAgcmV2ZXJzZSA9ICgpID0+IHt9O1xuICAgIHNoaWZ0ID0gKCkgPT4ge307XG4gICAgc2xpY2UgPSAoKSA9PiB7fTtcbiAgICBzb21lID0gKCkgPT4ge307XG4gICAgc29ydCA9ICgpID0+IHt9O1xuICAgIHNwbGljZSA9ICgpID0+IHt9O1xuICAgIHRvTG9jYWxlU3RyaW5nID0gKCkgPT4ge307XG4gICAgdG9Tb3VyY2UgPSAoKSA9PiB7fTtcbiAgICB0b1N0cmluZyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGBPYnNlcnZlckFycmF5IFsuLi5dYFxuICAgIH07XG4gICAgdW5zaGlmdCA9ICgpID0+IHt9O1xuICAgIHZhbHVlcyA9ICgpID0+IHt9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9vYnNlcnZlci9hcnJheS9pbmRleC5qcyIsIlxuaW1wb3J0IENvbXBvbmVudCBmcm9tICcuL2NvcmUnO1xuXG5cblxuZXhwb3J0IHtcbiAgICBDb21wb25lbnRcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2luZGV4LmpzIiwiXG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBkaWZmLCBwYXRjaCB9IGZyb20gJy4vZG9tJztcbmltcG9ydCB7IE9ic2VydmVyLCBvYnNlcnZlciwgd2FsayB9IGZyb20gJy4vb2JzZXJ2ZXInO1xuXG5cblxuY2xhc3MgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBlbnRyeSA9IG51bGw7XG4gICAgbm9kZSA9IG51bGw7XG4gICAgc3RhdGUgPSB7fTtcbiAgICBjb21wdXRlZCA9IHt9O1xuXG4gICAgLy8gVE9ETzogTGlmZUN5Y2xlXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge307XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7fTtcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKCkge307XG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH07XG4gICAgY29tcG9uZW50V2lsbFVwZGF0ZSgpIHt9O1xuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHt9O1xuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge307XG4gICAgY29tcG9uZW50RGlkQ2F0Y2goKSB7fTtcblxuICAgIC8vIE9ic2VydmVyXG4gICAgaW5pdE9ic2VydmVyKCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gT2JzZXJ2ZXIuZnJvbShcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgfHwge30sXG4gICAgICAgICAgICA6OnRoaXMuc2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKTtcbiAgICB9O1xuICAgIGluaXRDb21wdXRlZCgpIHtcbiAgICAgICAgd2FsayhcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZWQsXG4gICAgICAgICAgICAobmFtZSwgZ2V0dGVyLCBjb21wdXRlZCkgPT4ge1xuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb21wdXRlZCwgbmFtZSwge1xuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBnZXQ6IHRoaXM6OmdldHRlclxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9XG4gICAgc2V0dGVyQ2FsbGJhY2sob2JqLCBrZXksIHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAob2JqICE9PSB0aGlzLnN0YXRlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCT09NISEhJyk7XG4gICAgICAgIHRoaXMuZGlmZkFuZFBhdGNoKCk7XG4gICAgfTtcblxuICAgIC8vIFJlbmRlclxuICAgIGJlZm9yZVJlbmRlcigpIHtcbiAgICAgICAgdGhpcy5pbml0T2JzZXJ2ZXIoKTtcbiAgICAgICAgdGhpcy5pbml0Q29tcHV0ZWQoKTtcbiAgICB9O1xuICAgIHJlbmRlcigpIHt9O1xuICAgIHJlbmRlclRvKGVudHJ5KSB7XG4gICAgICAgIHRoaXMuYmVmb3JlUmVuZGVyKCk7XG4gICAgICAgIHRoaXMubm9kZSA9IHRoaXMucmVuZGVyKCk7XG4gICAgICAgIHRoaXMuZW50cnkgPSBlbnRyeTtcbiAgICAgICAgdGhpcy5lbnRyeS5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KHRoaXMubm9kZSkpXG4gICAgfTtcbiAgICBkaWZmQW5kUGF0Y2goKSB7XG4gICAgICAgIGNvbnN0IG9sZE5vZGUgPSB0aGlzLm5vZGU7XG4gICAgICAgIHRoaXMubm9kZSA9IHRoaXMucmVuZGVyKCk7XG4gICAgICAgIGNvbnN0IHBhdGNoZXMgPSBkaWZmKHRoaXMubm9kZSwgb2xkTm9kZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKG9sZE5vZGUpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5vZGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhwYXRjaGVzKTtcbiAgICAgICAgcGF0Y2godGhpcy5lbnRyeSwgcGF0Y2hlcyk7XG4gICAgfTtcbn1cblxuXG5cbmV4cG9ydCBkZWZhdWx0IENvbXBvbmVudDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvaW5kZXguanMiLCJcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tICcuL2NyZWF0ZSc7XG5pbXBvcnQgeyBkaWZmIH0gZnJvbSAnLi9kaWZmJztcbmltcG9ydCB7IHBhdGNoIH0gZnJvbSAnLi9wYXRjaCc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XG5cblxuZXhwb3J0IHtcbiAgICBjcmVhdGVFbGVtZW50LFxuICAgIGRpZmYsXG4gICAgcGF0Y2gsXG4gICAgdXRpbHNcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL2luZGV4LmpzIiwiXG5jb25zdCBldmVudFR5cGVzID0gW1xuICAgIC8vIENsaXBib2FyZCBFdmVudHNcbiAgICAnb25Db3B5JywgJ29uQ3V0JywgJ29uUGFzdGUnLFxuICAgIC8vIENvbXBvc2l0aW9uIEV2ZW50c1xuICAgICdvbkNvbXBvc2l0aW9uRW5kJywgJ29uQ29tcG9zaXRpb25TdGFydCcsICdvbkNvbXBvc2l0aW9uVXBkYXRlJyxcbiAgICAvLyBLZXlib2FyZCBFdmVudHNcbiAgICAnb25LZXlEb3duJywgJ29uS2V5UHJlc3MnLCAnb25LZXlVcCcsXG4gICAgLy8gRm9jdXMgRXZlbnRzXG4gICAgJ29uRm9jdXMnLCAnb25CbHVyJyxcbiAgICAvLyBGb3JtIEV2ZW50c1xuICAgICdvbkNoYW5nZScsICdvbklucHV0JywgJ29uSW52YWxpZCcsICdvblN1Ym1pdCcsXG4gICAgLy8gTW91c2UgRXZlbnRzXG4gICAgJ29uQ2xpY2snLCAnb25Db250ZXh0TWVudScsICdvbkRvdWJsZUNsaWNrJyxcbiAgICAnb25EcmFnJywgJ29uRHJhZ0VuZCcsICdvbkRyYWdFbnRlcicsICdvbkRyYWdFeGl0JyxcbiAgICAnb25EcmFnTGVhdmUnLCAnb25EcmFnT3ZlcicsICdvbkRyYWdTdGFydCcsXG4gICAgJ29uRHJvcCcsICdvbk1vdXNlRG93bicsICdvbk1vdXNlRW50ZXInLFxuICAgICdvbk1vdXNlTGVhdmUnLCAnb25Nb3VzZU1vdmUnLCAnb25Nb3VzZU91dCcsXG4gICAgJ29uTW91c2VPdmVyJyAsJ29uTW91c2VVcCcsXG4gICAgLy8gU2VsZWN0aW9uIEV2ZW50c1xuICAgICdvblNlbGVjdCcsXG4gICAgLy8gVG91Y2ggRXZlbnRzXG4gICAgJ29uVG91Y2hDYW5jZWwnLCAnb25Ub3VjaEVuZCcsICdvblRvdWNoTW92ZScsICdvblRvdWNoU3RhcnQnLFxuICAgIC8vIFVJIEV2ZW50c1xuICAgICdvblNjcm9sbCcsXG4gICAgLy8gV2hlZWwgRXZlbnRzXG4gICAgJ29uV2hlZWwnLFxuICAgIC8vIE1lZGlhIEV2ZW50c1xuICAgICdvbkFib3J0JywgJ29uQ2FuUGxheScsICdvbkNhblBsYXlUaHJvdWdoJyxcbiAgICAnb25EdXJhdGlvbkNoYW5nZScsICdvbkVtcHRpZWQnLCAnb25FbmNyeXB0ZWRvbkVuZGVkJyxcbiAgICAnb25FcnJvcicsICdvbkxvYWRlZERhdGEnLCAnb25Mb2FkZWRNZXRhZGF0YScsXG4gICAgJ29uTG9hZFN0YXJ0JywgJ29uUGF1c2UnLCAnb25QbGF5b25QbGF5aW5nJyxcbiAgICAnb25Qcm9ncmVzcycsICdvblJhdGVDaGFuZ2UnLCAnb25TZWVrZWQnLFxuICAgICdvblNlZWtpbmcnLCAnb25TdGFsbGVkJywgJ29uU3VzcGVuZG9uVGltZVVwZGF0ZScsXG4gICAgJ29uVm9sdW1lQ2hhbmdlJywgJ29uV2FpdGluZycsXG4gICAgLy8gSW1hZ2UgRXZlbnRzXG4gICAgJ29uTG9hZCcsICdvbkVycm9yJyxcbiAgICAvLyBBbmltYXRpb24gRXZlbnRzXG4gICAgJ29uQW5pbWF0aW9uU3RhcnQnLCAnb25BbmltYXRpb25FbmQnLCAnb25BbmltYXRpb25JdGVyYXRpb24nLFxuICAgIC8vIFRyYW5zaXRpb24gRXZlbnRzXG4gICAgJ29uVHJhbnNpdGlvbkVuZCcsXG4gICAgLy8gT3RoZXIgRXZlbnRzXG4gICAgJ29uVG9nZ2xlJ1xuXTtcblxuXG5jb25zdCBldmVudE1hcCA9IGV2ZW50VHlwZXMucmVkdWNlKChldmVudHNNYXAsIGV2ZW50KSA9PiB7XG4gICAgZXZlbnRzTWFwW2V2ZW50XSA9IGV2ZW50XG4gICAgICAgIC5yZXBsYWNlKCdvbicsICcnKVxuICAgICAgICAucmVwbGFjZSgvW0EtWl0vLCBlID0+IGUudG9Mb3dlckNhc2UoKSk7XG4gICAgcmV0dXJuIGV2ZW50c01hcDtcbn0sIHt9KTtcblxuXG5leHBvcnQge1xuICAgIGV2ZW50VHlwZXMsXG4gICAgZXZlbnRNYXBcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3V0aWxzL2V2ZW50cy5qcyIsIlxuaW1wb3J0IHsgQ2hhbmdlVHlwZSB9IGZyb20gJy4uL3R5cGVzL2luZGV4JztcblxuXG5cbmZ1bmN0aW9uIGRpZmYobmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIC8qXG4gICAgcmV0dXJuIHR5cGUgUGF0Y2gge1xuICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlXG4gICAgICAgIG5ld05vZGU/OiBOb2RlXG4gICAgICAgIGNoaWxkcmVuPzogUGF0Y2hbXVxuICAgICAgICBhdHRyaWJ1dGVzPzogUGF0Y2hbXVxuICAgIH1cbiAgICAgKi9cbiAgICBpZiAoIW9sZE5vZGUpIHJldHVybiB7IHR5cGU6IENoYW5nZVR5cGUuQ1JFQVRFLCBuZXdOb2RlIH07XG4gICAgZWxzZSBpZiAoIW5ld05vZGUpIHJldHVybiB7IHR5cGU6IENoYW5nZVR5cGUuUkVNT1ZFIH07XG4gICAgZWxzZSBpZiAoaXNDaGFuZ2VkKG5ld05vZGUsIG9sZE5vZGUpKSByZXR1cm4geyB0eXBlOiBDaGFuZ2VUeXBlLlJFUExBQ0UsIG5ld05vZGUgfTtcbiAgICBlbHNlIGlmIChuZXdOb2RlLmVsZW1lbnROYW1lKVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogQ2hhbmdlVHlwZS5VUERBVEUsXG4gICAgICAgICAgICBjaGlsZHJlbjogZGlmZkNoaWxkcmVuKG5ld05vZGUsIG9sZE5vZGUpLFxuICAgICAgICAgICAgYXR0cmlidXRlczogZGlmZkF0dHJpYnV0ZXMobmV3Tm9kZSwgb2xkTm9kZSlcbiAgICAgICAgfTtcbn1cblxuZnVuY3Rpb24gaXNDaGFuZ2VkKG5ld05vZGUsIG9sZE5vZGUpIHtcbiAgICByZXR1cm4gdHlwZW9mIG5ld05vZGUgIT09IHR5cGVvZiBvbGROb2RlIHx8XG4gICAgICAgIHR5cGVvZiBuZXdOb2RlICE9PSBcIm9iamVjdFwiICYmIG5ld05vZGUgIT09IG9sZE5vZGUgfHxcbiAgICAgICAgdHlwZW9mIG5ld05vZGUgPT09IFwib2JqZWN0XCIgJiYgbmV3Tm9kZS5lbGVtZW50TmFtZSAhPT0gb2xkTm9kZS5lbGVtZW50TmFtZTtcbn1cblxuZnVuY3Rpb24gZGlmZkF0dHJpYnV0ZXMobmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIGNvbnN0IHBhdGNoZXMgID0gW107XG4gICAgY29uc3QgYXR0cmlidXRlcyA9IHsuLi5vbGROb2RlLmF0dHJpYnV0ZXMsIC4uLm5ld05vZGUuYXR0cmlidXRlc307XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykubWFwKGF0dHJOYW1lID0+IHtcbiAgICAgICAgY29uc3QgbmV3QXR0ciA9IG5ld05vZGUuYXR0cmlidXRlc1thdHRyTmFtZV07XG4gICAgICAgIGNvbnN0IG9sZEF0dHIgPSBvbGROb2RlLmF0dHJpYnV0ZXNbYXR0ck5hbWVdO1xuICAgICAgICAhbmV3QXR0ciAmJiBwYXRjaGVzLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogQ2hhbmdlVHlwZS5SRU1PVkVfUFJPUFMsXG4gICAgICAgICAgICB2YWx1ZTogb2xkQXR0ciwgYXR0ck5hbWVcbiAgICAgICAgfSk7XG4gICAgICAgICghb2xkQXR0ciB8fCBvbGRBdHRyICE9PSBuZXdBdHRyKSAmJiBwYXRjaGVzLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogQ2hhbmdlVHlwZS5TRVRfUFJPUFMsXG4gICAgICAgICAgICB2YWx1ZTogbmV3QXR0ciwgYXR0ck5hbWVcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHBhdGNoZXM7XG59XG5cblxuZnVuY3Rpb24gZGlmZkNoaWxkcmVuKG5ld05vZGUsIG9sZE5vZGUpIHtcbiAgICByZXR1cm4gWy4uLkFycmF5KE1hdGgubWF4KFxuICAgICAgICBuZXdOb2RlLmNoaWxkcmVuLmxlbmd0aCxcbiAgICAgICAgb2xkTm9kZS5jaGlsZHJlbi5sZW5ndGhcbiAgICApKS5rZXlzKCldLm1hcChpID0+IGRpZmYobmV3Tm9kZS5jaGlsZHJlbltpXSwgb2xkTm9kZS5jaGlsZHJlbltpXSkpO1xufVxuXG5cbmV4cG9ydCB7XG4gICAgZGlmZlxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS9kaWZmL2luZGV4LmpzIiwiXG5jb25zdCBDaGFuZ2VkID0ge1xuICAgIENSRUFURTogJ0NSRUFURScsXG4gICAgUkVNT1ZFOiAnUkVNT1ZFJyxcbiAgICBSRVBMQUNFOiAnUkVQTEFDRScsXG4gICAgVVBEQVRFOiAnVVBEQVRFJyxcbiAgICBTRVRfUFJPUFM6ICdTRVQgUFJPUFMnLFxuICAgIFJFTU9WRV9QUk9QUzogJ1JFTU9WRSBQUk9QUydcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgQ2hhbmdlZDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvZG9tL3R5cGVzL2NoYW5nZS5qcyIsIlxuaW1wb3J0IHsgQ2hhbmdlVHlwZSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tICcuLi9jcmVhdGUvaW5kZXgnO1xuaW1wb3J0IHsgc2V0QXR0cmlidXRlLCByZW1vdmVBdHRyaWJ1dGUgfSBmcm9tIFwiLi4vdXRpbHMvaW5kZXhcIjtcblxuXG5cbmZ1bmN0aW9uIHBhdGNoKHBhcmVudCwgcGF0Y2hlcywgaW5kZXg9MCkge1xuICAgIGlmICghcGF0Y2hlcykgcmV0dXJuO1xuICAgIGNvbnN0IGVsID0gcGFyZW50LmNoaWxkTm9kZXNbaW5kZXhdO1xuICAgIGlmICghZWwpIHJldHVybjtcbiAgICBzd2l0Y2ggKHBhdGNoZXMudHlwZSkge1xuICAgICAgICBjYXNlIENoYW5nZVR5cGUuQ1JFQVRFOiB7XG4gICAgICAgICAgICBjb25zdCB7IG5ld05vZGUgfSA9IHBhdGNoZXM7XG4gICAgICAgICAgICBjb25zdCBuZXdFbCA9IGNyZWF0ZUVsZW1lbnQobmV3Tm9kZSk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IHBhcmVudC5jaGlsZE5vZGVzLmxlbmd0aClcbiAgICAgICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQobmV3RWwpO1xuICAgICAgICAgICAgZWxzZSBwYXJlbnQuaW5zZXJ0QmVmb3JlKG5ld0VsLCBlbCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENoYW5nZVR5cGUuUkVNT1ZFOiB7XG4gICAgICAgICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBDaGFuZ2VUeXBlLlJFUExBQ0U6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgbmV3Tm9kZSB9ID0gcGF0Y2hlcztcbiAgICAgICAgICAgIGNvbnN0IG5ld0VsID0gY3JlYXRlRWxlbWVudChuZXdOb2RlKTtcbiAgICAgICAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQobmV3RWwsIGVsKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQ2hhbmdlVHlwZS5VUERBVEU6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgY2hpbGRyZW4sIGF0dHJpYnV0ZXMgfSA9IHBhdGNoZXM7XG4gICAgICAgICAgICBwYXRjaEF0dHJpYnV0ZXMoZWwsIGF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQsIGluZGV4KSA9PiBwYXRjaChlbCwgY2hpbGQsIGluZGV4KSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcGF0Y2hBdHRyaWJ1dGVzKGVsZW1lbnQsIGF0dHJpYnV0ZXMpIHtcbiAgICBhdHRyaWJ1dGVzLmZvckVhY2gocGF0Y2ggPT4ge1xuICAgICAgICBjb25zdCB7IHR5cGUsIGF0dHJOYW1lLCB2YWx1ZSB9ID0gcGF0Y2g7XG4gICAgICAgIGlmICh0eXBlID09PSBDaGFuZ2VUeXBlLlNFVF9QUk9QUylcbiAgICAgICAgICAgIHNldEF0dHJpYnV0ZShlbGVtZW50LCBhdHRyTmFtZSwgdmFsdWUpO1xuICAgICAgICBlbHNlIGlmICh0eXBlID09PSBDaGFuZ2VUeXBlLlJFTU9WRV9QUk9QUylcbiAgICAgICAgICAgIHJlbW92ZUF0dHJpYnV0ZShlbGVtZW50LCBhdHRyTmFtZSwgdmFsdWUpXG4gICAgfSlcbn1cblxuXG5leHBvcnQge1xuICAgIHBhdGNoXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2RvbS9wYXRjaC9pbmRleC5qcyIsIlxuaW1wb3J0IE9ic2VydmVyIGZyb20gJy4vb2JqZWN0JztcbmltcG9ydCBPYnNlcnZlckFycmF5IGZyb20gJy4vYXJyYXknO1xuaW1wb3J0IHsgd2Fsaywgb2JzZXJ2ZXIgfSBmcm9tICcuL3V0aWxzJztcblxuXG5leHBvcnQge1xuICAgIE9ic2VydmVyLFxuICAgIE9ic2VydmVyQXJyYXksXG4gICAgd2Fsaywgb2JzZXJ2ZXJcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvb2JzZXJ2ZXIvaW5kZXguanMiLCJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4uL2luZGV4JztcblxuXG5cbmNsYXNzIEFwcCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGUgPSB7XG4gICAgICAgIG5hbWU6ICdKb2UnLFxuICAgICAgICBhZ2U6IDIyLFxuICAgICAgICBsaXN0OiBbXG4gICAgICAgICAgICAnSmF2YVNjcmlwdCcsXG4gICAgICAgICAgICAnUHl0aG9uJyxcbiAgICAgICAgICAgICdSdXN0JyxcbiAgICAgICAgICAgICdTY2FsYSdcbiAgICAgICAgXVxuICAgIH1cblxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgICBjYW5Ecml2ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmFnZSAlIDIgPT09IDBcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc3RhdGUuYWdlICsrO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHsgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIHsvKjxwIGlmPXt0aGlzLmNvbXB1dGVkLmNhbkRyaXZlfT5JJ20ge3RoaXMuc3RhdGUubmFtZX0uPC9wPiovfVxuICAgICAgICAgICAgPHA+SSdtIHt0aGlzLnN0YXRlLmFnZX0geWVhcnMgb2xkLjwvcD5cbiAgICAgICAgICAgIDxwPkkgY2FuIDxzcGFuIGlmPXt0aGlzLmNvbXB1dGVkLmNhbkRyaXZlfT5ub3Q8L3NwYW4+IERyaXZlPC9wPlxuICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgIDxsaVxuICAgICAgICAgICAgICAgICAgICBmb3I9eyhsYW5nLCBpbmRleCkgaW4gdGhpcy5zdGF0ZS5saXN0fVxuICAgICAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgID57bGFuZ308L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfVxuICAgICAgICAgICAgPkNsaWNrIE1lPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICl9XG59XG5cblxuXG5jb25zdCBhcHAgPSBuZXcgQXBwKCk7XG5hcHAucmVuZGVyVG8oZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9leGFtcGxlL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==