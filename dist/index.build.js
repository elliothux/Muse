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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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

var Observer = (_temp = _class = function Observer(obj) {
    var _this = this;

    _classCallCheck(this, Observer);

    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== "object") throw new TypeError('Type "Array" required!');
    (0, _index.walk)(obj, function (key, value) {
        return (0, _index.observer)(_this, key, value, function (obj, key, value) {
            return console.log('Get ' + key + ' of ' + obj + ': ' + value);
        }, function (obj, key, newValue) {
            return console.log('Set ' + key + ' of ' + obj + ': ' + newValue);
        });
    });
}, _class.from = function (obj) {
    return new Observer(obj);
}, _class.toString = function () {
    return 'Observer ' + undefined;
}, _temp);
exports.default = Observer;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getUniqueID = exports.observer = exports.walk = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _object = __webpack_require__(0);

var _object2 = _interopRequireDefault(_object);

var _array = __webpack_require__(2);

var _array2 = _interopRequireDefault(_array);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function walk(obj, fun) {
    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') throw new TypeError('Function "walk" require an "object" instead of ' + (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
    if (Array.isArray(obj)) return obj.forEach(function (item, index) {
        return fun(index, item, obj);
    });else return Object.keys(obj).forEach(function (key) {
        return fun(key, obj[key], obj);
    });
}

function observer(obj, key, value, getterCallback, setterCallback) {
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
            observer(obj, key, newValue);
            setterCallback(obj, key, newValue);
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
exports.default = undefined;

var _class, _temp, _initialiseProps;

var _index = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var setterCallback = function setterCallback(obj, key, value) {
    return console.log('Get ' + key + ' of ' + obj + ': ' + value);
};
var getterCallback = function getterCallback(obj, key, newValue) {
    return console.log('Set ' + key + ' of ' + obj + ': ' + newValue);
};

var ObserverArray = (_temp = _class = function ObserverArray(array) {
    var _this = this;

    _classCallCheck(this, ObserverArray);

    _initialiseProps.call(this);

    !array && (array = []);
    if (!Array.isArray(array)) throw new TypeError('Type "Array" required!');
    (0, _index.walk)(array, function (index, item) {
        return (0, _index.observer)(_this, index, item, setterCallback, getterCallback);
    });
    this.length = array.length;
}, _class.from = function (array) {
    return new ObserverArray(array);
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _core = __webpack_require__(4);

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    Component: _core2.default
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _moDom = __webpack_require__(5);

var _index = __webpack_require__(6);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = function Component() {
    var _this = this;

    _classCallCheck(this, Component);

    this.renderTo = function (entry) {
        _this.entry = entry;
        _this.entry.appendChild(DOM.createElement(_this.render()));
    };
};

exports.default = Component;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

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


function setAttributes(target, attributes) {
    Object.keys(attributes).filter(function (key) {
        return attributes.hasOwnProperty(key);
    }).forEach(function (attrName) {
        return setAttribute(target, attrName, attributes[attrName]);
    });
}

function setAttribute(target, attrName, attrValue) {
    attrName === 'className' && (attrName = 'class');
    target.setAttribute(attrName, attrValue);
}

function removeAttribute(target, attrName) {
    attrName === 'className' && (attrName = 'class');
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
exports.createElement = undefined;

var _utils = __webpack_require__(0);

function createElement(node) {
    // node: String || {
    //     elementName: String
    //     children: node[]
    //     attributes: Object
    // }
    if (typeof node === "string") return document.createTextNode(node);
    var el = document.createElement(node.elementName);
    node.children && appendChildren(el, node.children);
    (0, _utils.setAttributes)(el, node.attributes);
    return el;
}

function appendChildren(target, children) {
    children.map(createElement).forEach(target.appendChild.bind(target));
}

exports.createElement = createElement;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ChangeType = undefined;

var _change = __webpack_require__(4);

var _change2 = _interopRequireDefault(_change);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.ChangeType = _change2.default;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.diff = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _index = __webpack_require__(2);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function diff(newNode, oldNode) {
    // return type Patch {
    //     type: ChangeType
    //     newNode?: Node
    //     children?: Patch[]
    //     attributes?: Patch[]
    // }
    if (!oldNode) return { type: _index.ChangeType.CREATE, newNode: newNode };else if (!newNode) return { type: _index.ChangeType.REMOVE };else if (isChanged(newNode, oldNode)) return { type: _index.ChangeType.REPLACE, newNode: newNode };else if (newNode.elementName) return {
        type: _index.ChangeType.UPDATE,
        children: diffChildren(newNode, oldNode),
        attributes: diffAttributes(newNode, oldNode)
    };
}

function isChanged(newNode, oldNode) {
    return (typeof newNode === "undefined" ? "undefined" : _typeof(newNode)) !== (typeof oldNode === "undefined" ? "undefined" : _typeof(oldNode)) || typeof newNode === "string" && newNode !== oldNode || typeof newNode !== "string" && newNode.elementName !== oldNode.elementName;
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
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.patch = undefined;

var _types = __webpack_require__(2);

var _index = __webpack_require__(1);

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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.utils = exports.patch = exports.diff = exports.createElement = undefined;

var _create = __webpack_require__(1);

var _diff = __webpack_require__(3);

var _patch = __webpack_require__(5);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.createElement = _create.createElement;
exports.diff = _diff.diff;
exports.patch = _patch.patch;
exports.utils = _utils2.default;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTc0ZGFkODdmZjE1MjBkMmUyNjIiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY3JlYXRlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3R5cGVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2RpZmYvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vdHlwZXMvY2hhbmdlLmpzIiwid2VicGFjazovLy8uL3BhdGNoL2luZGV4LmpzIiwid2VicGFjazovLy8uL2luZGV4LmpzIl0sIm5hbWVzIjpbInNldEF0dHJpYnV0ZXMiLCJ0YXJnZXQiLCJhdHRyaWJ1dGVzIiwiT2JqZWN0Iiwia2V5cyIsImZpbHRlciIsImhhc093blByb3BlcnR5Iiwia2V5IiwiZm9yRWFjaCIsInNldEF0dHJpYnV0ZSIsImF0dHJOYW1lIiwiYXR0clZhbHVlIiwicmVtb3ZlQXR0cmlidXRlIiwiY3JlYXRlRWxlbWVudCIsIm5vZGUiLCJkb2N1bWVudCIsImNyZWF0ZVRleHROb2RlIiwiZWwiLCJlbGVtZW50TmFtZSIsImNoaWxkcmVuIiwiYXBwZW5kQ2hpbGRyZW4iLCJtYXAiLCJhcHBlbmRDaGlsZCIsImJpbmQiLCJDaGFuZ2VUeXBlIiwiZGlmZiIsIm5ld05vZGUiLCJvbGROb2RlIiwidHlwZSIsIkNSRUFURSIsIlJFTU9WRSIsImlzQ2hhbmdlZCIsIlJFUExBQ0UiLCJVUERBVEUiLCJkaWZmQ2hpbGRyZW4iLCJkaWZmQXR0cmlidXRlcyIsInBhdGNoZXMiLCJuZXdBdHRyIiwib2xkQXR0ciIsInB1c2giLCJSRU1PVkVfUFJPUFMiLCJ2YWx1ZSIsIlNFVF9QUk9QUyIsIkFycmF5IiwiTWF0aCIsIm1heCIsImxlbmd0aCIsImkiLCJDaGFuZ2VkIiwicGF0Y2giLCJwYXJlbnQiLCJpbmRleCIsImNoaWxkTm9kZXMiLCJuZXdFbCIsInJlbW92ZUNoaWxkIiwicmVwbGFjZUNoaWxkIiwicGF0Y2hBdHRyaWJ1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SXBDLGE7UUFDQVksSTtRQUNBd0IsSztRQUNBVSxLIiwiZmlsZSI6ImluZGV4LmJ1aWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Fzc2V0cy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA2KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlNzRkYWQ4N2ZmMTUyMGQyZTI2MiIsIlxuXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzKHRhcmdldCwgYXR0cmlidXRlcykge1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpXG4gICAgICAgIC5maWx0ZXIoa2V5ID0+IGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoa2V5KSlcbiAgICAgICAgLmZvckVhY2goYXR0ck5hbWUgPT4gc2V0QXR0cmlidXRlKHRhcmdldCwgYXR0ck5hbWUsIGF0dHJpYnV0ZXNbYXR0ck5hbWVdKSk7XG59XG5cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZSh0YXJnZXQsIGF0dHJOYW1lLCBhdHRyVmFsdWUpIHtcbiAgICBhdHRyTmFtZSA9PT0gJ2NsYXNzTmFtZScgJiYgKGF0dHJOYW1lID0gJ2NsYXNzJyk7XG4gICAgdGFyZ2V0LnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQXR0cmlidXRlKHRhcmdldCwgYXR0ck5hbWUpIHtcbiAgICBhdHRyTmFtZSA9PT0gJ2NsYXNzTmFtZScgJiYgKGF0dHJOYW1lID0gJ2NsYXNzJyk7XG4gICAgdGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZShhdHRyTmFtZSk7XG59XG5cblxuZXhwb3J0IHtcbiAgICBzZXRBdHRyaWJ1dGVzLFxuICAgIHNldEF0dHJpYnV0ZSxcbiAgICByZW1vdmVBdHRyaWJ1dGVcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3V0aWxzL2luZGV4LmpzIiwiXG5pbXBvcnQgeyBzZXRBdHRyaWJ1dGVzLCBzZXRBdHRyaWJ1dGUgfSBmcm9tICcuLi91dGlscyc7XG5cblxuXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KG5vZGUpIHtcbiAgICAvLyBub2RlOiBTdHJpbmcgfHwge1xuICAgIC8vICAgICBlbGVtZW50TmFtZTogU3RyaW5nXG4gICAgLy8gICAgIGNoaWxkcmVuOiBub2RlW11cbiAgICAvLyAgICAgYXR0cmlidXRlczogT2JqZWN0XG4gICAgLy8gfVxuICAgIGlmICh0eXBlb2Ygbm9kZSA9PT0gXCJzdHJpbmdcIilcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG5vZGUpO1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChub2RlLmVsZW1lbnROYW1lKTtcbiAgICBub2RlLmNoaWxkcmVuICYmIGFwcGVuZENoaWxkcmVuKGVsLCBub2RlLmNoaWxkcmVuKTtcbiAgICBzZXRBdHRyaWJ1dGVzKGVsLCBub2RlLmF0dHJpYnV0ZXMpO1xuICAgIHJldHVybiBlbDtcbn1cblxuXG5mdW5jdGlvbiBhcHBlbmRDaGlsZHJlbih0YXJnZXQsIGNoaWxkcmVuKSB7XG4gICAgY2hpbGRyZW4ubWFwKGNyZWF0ZUVsZW1lbnQpXG4gICAgICAgIC5mb3JFYWNoKHRhcmdldC5hcHBlbmRDaGlsZC5iaW5kKHRhcmdldCkpXG59XG5cblxuZXhwb3J0IHtcbiAgICBjcmVhdGVFbGVtZW50XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jcmVhdGUvaW5kZXguanMiLCJcbmltcG9ydCBDaGFuZ2VUeXBlIGZyb20gJy4vY2hhbmdlJztcblxuXG5leHBvcnQge1xuICAgIENoYW5nZVR5cGVcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3R5cGVzL2luZGV4LmpzIiwiXG5pbXBvcnQgeyBDaGFuZ2VUeXBlIH0gZnJvbSAnLi4vdHlwZXMvaW5kZXgnO1xuXG5cblxuZnVuY3Rpb24gZGlmZihuZXdOb2RlLCBvbGROb2RlKSB7XG4gICAgLy8gcmV0dXJuIHR5cGUgUGF0Y2gge1xuICAgIC8vICAgICB0eXBlOiBDaGFuZ2VUeXBlXG4gICAgLy8gICAgIG5ld05vZGU/OiBOb2RlXG4gICAgLy8gICAgIGNoaWxkcmVuPzogUGF0Y2hbXVxuICAgIC8vICAgICBhdHRyaWJ1dGVzPzogUGF0Y2hbXVxuICAgIC8vIH1cbiAgICBpZiAoIW9sZE5vZGUpIHJldHVybiB7IHR5cGU6IENoYW5nZVR5cGUuQ1JFQVRFLCBuZXdOb2RlIH07XG4gICAgZWxzZSBpZiAoIW5ld05vZGUpIHJldHVybiB7IHR5cGU6IENoYW5nZVR5cGUuUkVNT1ZFIH07XG4gICAgZWxzZSBpZiAoaXNDaGFuZ2VkKG5ld05vZGUsIG9sZE5vZGUpKSByZXR1cm4geyB0eXBlOiBDaGFuZ2VUeXBlLlJFUExBQ0UsIG5ld05vZGUgfTtcbiAgICBlbHNlIGlmIChuZXdOb2RlLmVsZW1lbnROYW1lKVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogQ2hhbmdlVHlwZS5VUERBVEUsXG4gICAgICAgICAgICBjaGlsZHJlbjogZGlmZkNoaWxkcmVuKG5ld05vZGUsIG9sZE5vZGUpLFxuICAgICAgICAgICAgYXR0cmlidXRlczogZGlmZkF0dHJpYnV0ZXMobmV3Tm9kZSwgb2xkTm9kZSlcbiAgICAgICAgfTtcbn1cblxuZnVuY3Rpb24gaXNDaGFuZ2VkKG5ld05vZGUsIG9sZE5vZGUpIHtcbiAgICByZXR1cm4gdHlwZW9mIG5ld05vZGUgIT09IHR5cGVvZiBvbGROb2RlIHx8XG4gICAgICAgIHR5cGVvZiBuZXdOb2RlID09PSBcInN0cmluZ1wiICYmIG5ld05vZGUgIT09IG9sZE5vZGUgfHxcbiAgICAgICAgdHlwZW9mIG5ld05vZGUgIT09IFwic3RyaW5nXCIgJiYgbmV3Tm9kZS5lbGVtZW50TmFtZSAhPT0gb2xkTm9kZS5lbGVtZW50TmFtZTtcbn1cblxuZnVuY3Rpb24gZGlmZkF0dHJpYnV0ZXMobmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIGNvbnN0IHBhdGNoZXMgID0gW107XG4gICAgY29uc3QgYXR0cmlidXRlcyA9IHsuLi5vbGROb2RlLmF0dHJpYnV0ZXMsIC4uLm5ld05vZGUuYXR0cmlidXRlc307XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykubWFwKGF0dHJOYW1lID0+IHtcbiAgICAgICAgY29uc3QgbmV3QXR0ciA9IG5ld05vZGUuYXR0cmlidXRlc1thdHRyTmFtZV07XG4gICAgICAgIGNvbnN0IG9sZEF0dHIgPSBvbGROb2RlLmF0dHJpYnV0ZXNbYXR0ck5hbWVdO1xuICAgICAgICAhbmV3QXR0ciAmJiBwYXRjaGVzLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogQ2hhbmdlVHlwZS5SRU1PVkVfUFJPUFMsXG4gICAgICAgICAgICB2YWx1ZTogb2xkQXR0ciwgYXR0ck5hbWVcbiAgICAgICAgfSk7XG4gICAgICAgICghb2xkQXR0ciB8fCBvbGRBdHRyICE9PSBuZXdBdHRyKSAmJiBwYXRjaGVzLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogQ2hhbmdlVHlwZS5TRVRfUFJPUFMsXG4gICAgICAgICAgICB2YWx1ZTogbmV3QXR0ciwgYXR0ck5hbWVcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHBhdGNoZXM7XG59XG5cblxuZnVuY3Rpb24gZGlmZkNoaWxkcmVuKG5ld05vZGUsIG9sZE5vZGUpIHtcbiAgICByZXR1cm4gWy4uLkFycmF5KE1hdGgubWF4KFxuICAgICAgICBuZXdOb2RlLmNoaWxkcmVuLmxlbmd0aCxcbiAgICAgICAgb2xkTm9kZS5jaGlsZHJlbi5sZW5ndGhcbiAgICApKS5rZXlzKCldLm1hcChpID0+IGRpZmYobmV3Tm9kZS5jaGlsZHJlbltpXSwgb2xkTm9kZS5jaGlsZHJlbltpXSkpO1xufVxuXG5cbmV4cG9ydCB7XG4gICAgZGlmZlxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9kaWZmL2luZGV4LmpzIiwiXG5jb25zdCBDaGFuZ2VkID0ge1xuICAgIENSRUFURTogJ0NSRUFURScsXG4gICAgUkVNT1ZFOiAnUkVNT1ZFJyxcbiAgICBSRVBMQUNFOiAnUkVQTEFDRScsXG4gICAgVVBEQVRFOiAnVVBEQVRFJyxcbiAgICBTRVRfUFJPUFM6ICdTRVQgUFJPUFMnLFxuICAgIFJFTU9WRV9QUk9QUzogJ1JFTU9WRSBQUk9QUydcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgQ2hhbmdlZDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3R5cGVzL2NoYW5nZS5qcyIsIlxuaW1wb3J0IHsgQ2hhbmdlVHlwZSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tICcuLi9jcmVhdGUvaW5kZXgnO1xuaW1wb3J0IHsgc2V0QXR0cmlidXRlLCByZW1vdmVBdHRyaWJ1dGUgfSBmcm9tIFwiLi4vdXRpbHMvaW5kZXhcIjtcblxuXG5cbmZ1bmN0aW9uIHBhdGNoKHBhcmVudCwgcGF0Y2hlcywgaW5kZXg9MCkge1xuICAgIGlmICghcGF0Y2hlcykgcmV0dXJuO1xuICAgIGNvbnN0IGVsID0gcGFyZW50LmNoaWxkTm9kZXNbaW5kZXhdO1xuICAgIHN3aXRjaCAocGF0Y2hlcy50eXBlKSB7XG4gICAgICAgIGNhc2UgQ2hhbmdlVHlwZS5DUkVBVEU6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgbmV3Tm9kZSB9ID0gcGF0Y2hlcztcbiAgICAgICAgICAgIGNvbnN0IG5ld0VsID0gY3JlYXRlRWxlbWVudChuZXdOb2RlKTtcbiAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChuZXdFbCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENoYW5nZVR5cGUuUkVNT1ZFOiB7XG4gICAgICAgICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBDaGFuZ2VUeXBlLlJFUExBQ0U6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgbmV3Tm9kZSB9ID0gcGF0Y2hlcztcbiAgICAgICAgICAgIGNvbnN0IG5ld0VsID0gY3JlYXRlRWxlbWVudChuZXdOb2RlKTtcbiAgICAgICAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQobmV3RWwsIGVsKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQ2hhbmdlVHlwZS5VUERBVEU6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgY2hpbGRyZW4sIGF0dHJpYnV0ZXMgfSA9IHBhdGNoZXM7XG4gICAgICAgICAgICBwYXRjaEF0dHJpYnV0ZXMoZWwsIGF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQsIGluZGV4KSA9PiBwYXRjaChlbCwgY2hpbGQsIGluZGV4KSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcGF0Y2hBdHRyaWJ1dGVzKGVsZW1lbnQsIGF0dHJpYnV0ZXMpIHtcbiAgICBhdHRyaWJ1dGVzLmZvckVhY2gocGF0Y2ggPT4ge1xuICAgICAgICBjb25zdCB7IHR5cGUsIGF0dHJOYW1lLCB2YWx1ZSB9ID0gcGF0Y2g7XG4gICAgICAgIGlmICh0eXBlID09PSBDaGFuZ2VUeXBlLlNFVF9QUk9QUylcbiAgICAgICAgICAgIHNldEF0dHJpYnV0ZShlbGVtZW50LCBhdHRyTmFtZSwgdmFsdWUpO1xuICAgICAgICBlbHNlIGlmICh0eXBlID09PSBDaGFuZ2VUeXBlLlJFTU9WRV9QUk9QUylcbiAgICAgICAgICAgIHJlbW92ZUF0dHJpYnV0ZShlbGVtZW50LCBhdHRyTmFtZSwgdmFsdWUpXG4gICAgfSlcbn1cblxuXG5leHBvcnQge1xuICAgIHBhdGNoXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYXRjaC9pbmRleC5qcyIsIlxuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gJy4vY3JlYXRlJztcbmltcG9ydCB7IGRpZmYgfSBmcm9tICcuL2RpZmYnO1xuaW1wb3J0IHsgcGF0Y2ggfSBmcm9tICcuL3BhdGNoJztcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzJztcblxuXG5leHBvcnQge1xuICAgIGNyZWF0ZUVsZW1lbnQsXG4gICAgZGlmZixcbiAgICBwYXRjaCxcbiAgICB1dGlsc1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ObserverArray = exports.Observer = undefined;

var _object = __webpack_require__(0);

var _object2 = _interopRequireDefault(_object);

var _array = __webpack_require__(2);

var _array2 = _interopRequireDefault(_array);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Observer = _object2.default;
exports.ObserverArray = _array2.default;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTM0MTExYTUxZTQ4NmRiOTEyMDUiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci9vYmplY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci91dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL29ic2VydmVyL2FycmF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvcmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19tby1kb21AMC4wLjFAbW8tZG9tL2Rpc3QvaW5kZXguYnVpbGQuanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9vYnNlcnZlci9pbmRleC5qcyJdLCJuYW1lcyI6WyJPYnNlcnZlciIsIm9iaiIsIlR5cGVFcnJvciIsImtleSIsInZhbHVlIiwiY29uc29sZSIsImxvZyIsIm5ld1ZhbHVlIiwiZnJvbSIsInRvU3RyaW5nIiwid2FsayIsImZ1biIsIkFycmF5IiwiaXNBcnJheSIsImZvckVhY2giLCJpdGVtIiwiaW5kZXgiLCJPYmplY3QiLCJrZXlzIiwib2JzZXJ2ZXIiLCJnZXR0ZXJDYWxsYmFjayIsInNldHRlckNhbGxiYWNrIiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwiZ2V0Iiwic2V0IiwiZ2V0VW5pcXVlSUQiLCJpZCIsIk9ic2VydmVyQXJyYXkiLCJhcnJheSIsImxlbmd0aCIsImlzT2JzZXJ2ZXJBcnJheSIsIl9fcHJvdG9fXyIsImNvbnN0cnVjdG9yIiwib2YiLCJhcmdzIiwiY29uY2F0IiwiYXJyYXlzIiwibmV3QXJyYXkiLCJwdXNoIiwiY29weVdpdGhpbiIsImVudHJpZXMiLCJldmVyeSIsImZpbGwiLCJmaWx0ZXIiLCJmaW5kIiwiZmluZEluZGV4IiwiaW5jbHVkZXMiLCJpbmRleE9mIiwiam9pbiIsImxhc3RJbmRleE9mIiwibWFwIiwicG9wIiwicmVkdWNlIiwicmVkdWNlUmlnaHQiLCJyZXZlcnNlIiwic2hpZnQiLCJzbGljZSIsInNvbWUiLCJzb3J0Iiwic3BsaWNlIiwidG9Mb2NhbGVTdHJpbmciLCJ0b1NvdXJjZSIsInVuc2hpZnQiLCJ2YWx1ZXMiLCJDb21wb25lbnQiLCJyZW5kZXJUbyIsImVudHJ5IiwiYXBwZW5kQ2hpbGQiLCJET00iLCJjcmVhdGVFbGVtZW50IiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzREE7Ozs7SUFJcUJBLFEscUJBQ2pCLGtCQUFZQyxHQUFaLEVBQWlCO0FBQUE7O0FBQUE7O0FBQ2IsUUFBSSxRQUFPQSxHQUFQLHlDQUFPQSxHQUFQLE9BQWUsUUFBbkIsRUFDSSxNQUFNLElBQUlDLFNBQUosQ0FBYyx3QkFBZCxDQUFOO0FBQ0oscUJBQUtELEdBQUwsRUFBVSxVQUFDRSxHQUFELEVBQU1DLEtBQU47QUFBQSxlQUFnQiw0QkFDaEJELEdBRGdCLEVBQ1hDLEtBRFcsRUFFdEIsVUFBQ0gsR0FBRCxFQUFNRSxHQUFOLEVBQVdDLEtBQVg7QUFBQSxtQkFBcUJDLFFBQVFDLEdBQVIsVUFBbUJILEdBQW5CLFlBQTZCRixHQUE3QixVQUFxQ0csS0FBckMsQ0FBckI7QUFBQSxTQUZzQixFQUd0QixVQUFDSCxHQUFELEVBQU1F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Q0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLE9BQU87QUFDUDtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNHQUFzRztBQUN0RyxLQUFLO0FBQ0w7O0FBRUE7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsc0NBQXNDLHVDQUF1QyxnQkFBZ0I7O0FBRTdGO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU87QUFDUDtBQUNBLDJDQUEyQyxjQUFjLHV0aEI7Ozs7Ozs7Ozs7Ozs7O0FDblZ6RDs7OztBQUNBOzs7Ozs7UUFLSWxFLFE7UUFDQTZCLGEiLCJmaWxlIjoiaW5kZXguYnVpbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYXNzZXRzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGUzNDExMWE1MWU0ODZkYjkxMjA1IiwiXG5cbmltcG9ydCB7IHdhbGssIG9ic2VydmVyIH0gZnJvbSAnLi4vdXRpbHMvaW5kZXgnXG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPYnNlcnZlciB7XG4gICAgY29uc3RydWN0b3Iob2JqKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JqICE9PSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVHlwZSBcIkFycmF5XCIgcmVxdWlyZWQhJyk7XG4gICAgICAgIHdhbGsob2JqLCAoa2V5LCB2YWx1ZSkgPT4gb2JzZXJ2ZXIoXG4gICAgICAgICAgICB0aGlzLCBrZXksIHZhbHVlLFxuICAgICAgICAgICAgKG9iaiwga2V5LCB2YWx1ZSkgPT4gY29uc29sZS5sb2coYEdldCAke2tleX0gb2YgJHtvYmp9OiAke3ZhbHVlfWApLFxuICAgICAgICAgICAgKG9iaiwga2V5LCBuZXdWYWx1ZSkgPT4gY29uc29sZS5sb2coYFNldCAke2tleX0gb2YgJHtvYmp9OiAke25ld1ZhbHVlfWApXG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIHN0YXRpYyBmcm9tID0gb2JqID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZlcihvYmopXG4gICAgfTtcblxuICAgIHN0YXRpYyB0b1N0cmluZyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGBPYnNlcnZlciAke3RoaXN9YFxuICAgIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL29ic2VydmVyL29iamVjdC9pbmRleC5qcyIsIlxuaW1wb3J0IE9ic2VydmVyIGZyb20gJy4uL29iamVjdCc7XG5pbXBvcnQgT2JzZXJ2ZXJBcnJheSBmcm9tICcuLi9hcnJheSc7XG5cblxuXG5mdW5jdGlvbiB3YWxrKG9iaiwgZnVuKSB7XG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBGdW5jdGlvbiBcIndhbGtcIiByZXF1aXJlIGFuIFwib2JqZWN0XCIgaW5zdGVhZCBvZiAke3R5cGVvZiBvYmp9YCk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSlcbiAgICAgICAgcmV0dXJuIG9iai5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4gZnVuKGluZGV4LCBpdGVtLCBvYmopKTtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IGZ1bihrZXksIG9ialtrZXldLCBvYmopKTtcbn1cblxuZnVuY3Rpb24gb2JzZXJ2ZXIob2JqLCBrZXksIHZhbHVlLCBnZXR0ZXJDYWxsYmFjaywgc2V0dGVyQ2FsbGJhY2spIHtcbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEZ1bmN0aW9uIFwib2JzZXJ2ZXJcIiByZXF1aXJlIGFuIFwib2JqZWN0XCIgaW5zdGVhZCBvZiAke3R5cGVvZiBvYmp9YCk7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpXG4gICAgICAgIHZhbHVlID0gT2JzZXJ2ZXJBcnJheS5mcm9tKHZhbHVlKTtcbiAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXG4gICAgICAgIHZhbHVlID0gT2JzZXJ2ZXIuZnJvbSh2YWx1ZSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBnZXQ6ICgpID0+IHtcbiAgICAgICAgICAgIGdldHRlckNhbGxiYWNrKG9iaiwga2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWVcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBuZXdWYWx1ZSA9PiB7XG4gICAgICAgICAgICBvYnNlcnZlcihvYmosIGtleSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgc2V0dGVyQ2FsbGJhY2sob2JqLCBrZXksIG5ld1ZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0pXG59XG5cblxuY29uc3QgZ2V0VW5pcXVlSUQgPSBmdW5jdGlvbigpIHtcbiAgICBsZXQgaWQgPSAwO1xuICAgIHJldHVybiAoKCkgPT4gaWQgKyspO1xufSgpO1xuXG5cbmV4cG9ydCB7XG4gICAgd2FsayxcbiAgICBvYnNlcnZlcixcbiAgICBnZXRVbmlxdWVJRFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9vYnNlcnZlci91dGlscy9pbmRleC5qcyIsIlxuaW1wb3J0IHsgd2Fsaywgb2JzZXJ2ZXIgfSBmcm9tICcuLi91dGlscy9pbmRleCc7XG5cblxuXG5jb25zdCBzZXR0ZXJDYWxsYmFjayA9IChvYmosIGtleSwgdmFsdWUpID0+IGNvbnNvbGUubG9nKGBHZXQgJHtrZXl9IG9mICR7b2JqfTogJHt2YWx1ZX1gKTtcbmNvbnN0IGdldHRlckNhbGxiYWNrID0gKG9iaiwga2V5LCBuZXdWYWx1ZSkgPT4gY29uc29sZS5sb2coYFNldCAke2tleX0gb2YgJHtvYmp9OiAke25ld1ZhbHVlfWApXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2JzZXJ2ZXJBcnJheSB7XG4gICAgY29uc3RydWN0b3IoYXJyYXkpIHtcbiAgICAgICAgIWFycmF5ICYmIChhcnJheSA9IFtdKTtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGFycmF5KSlcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1R5cGUgXCJBcnJheVwiIHJlcXVpcmVkIScpO1xuICAgICAgICB3YWxrKGFycmF5LCAoaW5kZXgsIGl0ZW0pID0+IG9ic2VydmVyKFxuICAgICAgICAgICAgdGhpcywgaW5kZXgsIGl0ZW0sXG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKSk7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIH1cblxuICAgIHN0YXRpYyBmcm9tID0gYXJyYXkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmVyQXJyYXkoYXJyYXkpXG4gICAgfTtcbiAgICBzdGF0aWMgaXNPYnNlcnZlckFycmF5ICA9IGFycmF5ID0+IHtcbiAgICAgICAgcmV0dXJuIGFycmF5Ll9fcHJvdG9fXy5jb25zdHJ1Y3RvciA9PT0gT2JzZXJ2ZXJBcnJheTtcbiAgICB9O1xuICAgIHN0YXRpYyBvZiA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2ZXJBcnJheShbLi4uYXJnc10pXG4gICAgfTtcblxuICAgIGNvbmNhdCA9ICguLi5hcnJheXMpID0+IHtcbiAgICAgICAgY29uc3QgbmV3QXJyYXkgPSBuZXcgT2JzZXJ2ZXJBcnJheSgpO1xuICAgICAgICBbdGhpcywgLi4uYXJyYXlzXS5mb3JFYWNoKFxuICAgICAgICAgICAgYXJyYXkgPT4gYXJyYXkuZm9yRWFjaChuZXdBcnJheS5wdXNoKVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gbmV3QXJyYXk7XG4gICAgfTtcbiAgICBjb3B5V2l0aGluID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgLy8gVE9ET1xuICAgICAgICByZXR1cm4gT2JzZXJ2ZXJBcnJheS5mcm9tKFxuICAgICAgICAgICAgQXJyYXkuZnJvbSh0aGlzKS5jb3B5V2l0aGluKC4uLmFyZ3MpXG4gICAgICAgIClcbiAgICB9O1xuICAgIGVudHJpZXMgPSBmdW5jdGlvbiAqKCkge1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICB3aGlsZSAodGhpc1tpbmRleF0pXG4gICAgICAgICAgICB5aWVsZCBbaW5kZXgrKywgdGhpc1tpbmRleF1dO1xuICAgIH07XG4gICAgZXZlcnkgPSAoKSA9PiB7fTtcbiAgICBmaWxsID0gKCkgPT4ge307XG4gICAgZmlsdGVyID0gKCkgPT4ge307XG4gICAgZmluZCA9ICgpID0+IHt9O1xuICAgIGZpbmRJbmRleCA9ICgpID0+IHt9O1xuICAgIGZvckVhY2ggPSAoKSA9PiB7fTtcbiAgICBpbmNsdWRlcyA9ICgpID0+IHt9O1xuICAgIGluZGV4T2YgPSAoKSA9PiB7fTtcbiAgICBqb2luID0gKCkgPT4ge307XG4gICAga2V5cyA9ICgpID0+IHt9O1xuICAgIGxhc3RJbmRleE9mID0gKCkgPT4ge307XG4gICAgbWFwID0gKCkgPT4ge307XG4gICAgcG9wID0gKCkgPT4ge307XG4gICAgcHVzaCA9IHZhbHVlID0+IHtcbiAgICAgICAgb2JzZXJ2ZXIoXG4gICAgICAgICAgICB0aGlzLCB0aGlzLmxlbmd0aCwgdmFsdWUsXG4gICAgICAgICAgICBzZXR0ZXJDYWxsYmFjaywgZ2V0dGVyQ2FsbGJhY2tcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5sZW5ndGggKys7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIHJlZHVjZSA9ICgpID0+IHt9O1xuICAgIHJlZHVjZVJpZ2h0ID0gKCkgPT4ge307XG4gICAgcmV2ZXJzZSA9ICgpID0+IHt9O1xuICAgIHNoaWZ0ID0gKCkgPT4ge307XG4gICAgc2xpY2UgPSAoKSA9PiB7fTtcbiAgICBzb21lID0gKCkgPT4ge307XG4gICAgc29ydCA9ICgpID0+IHt9O1xuICAgIHNwbGljZSA9ICgpID0+IHt9O1xuICAgIHRvTG9jYWxlU3RyaW5nID0gKCkgPT4ge307XG4gICAgdG9Tb3VyY2UgPSAoKSA9PiB7fTtcbiAgICB0b1N0cmluZyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGBPYnNlcnZlckFycmF5IFsuLi5dYFxuICAgIH07XG4gICAgdW5zaGlmdCA9ICgpID0+IHt9O1xuICAgIHZhbHVlcyA9ICgpID0+IHt9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29yZS9vYnNlcnZlci9hcnJheS9pbmRleC5qcyIsIlxuaW1wb3J0IENvbXBvbmVudCBmcm9tICcuL2NvcmUnO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIENvbXBvbmVudFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vaW5kZXguanMiLCJcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tICdtby1kb20nO1xuaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tICcuL29ic2VydmVyL2luZGV4JztcblxuXG5cblxuY2xhc3MgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIH1cblxuICAgIHJlbmRlclRvID0gKGVudHJ5KSA9PiB7XG4gICAgICAgIHRoaXMuZW50cnkgPSBlbnRyeTtcbiAgICAgICAgdGhpcy5lbnRyeS5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIERPTS5jcmVhdGVFbGVtZW50KHRoaXMucmVuZGVyKCkpXG4gICAgICAgIClcbiAgICB9XG59XG5cblxuXG5leHBvcnQgZGVmYXVsdCBDb21wb25lbnQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3JlL2luZGV4LmpzIiwiLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHRpOiBtb2R1bGVJZCxcbi8qKioqKiovIFx0XHRcdGw6IGZhbHNlLFxuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge31cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cbi8qKioqKiovXG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbi8qKioqKiovIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4vKioqKioqLyBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuLyoqKioqKi8gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuLyoqKioqKi8gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuLyoqKioqKi8gXHRcdFx0XHRnZXQ6IGdldHRlclxuLyoqKioqKi8gXHRcdFx0fSk7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4vKioqKioqLyBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4vKioqKioqLyBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuLyoqKioqKi8gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4vKioqKioqLyBcdFx0cmV0dXJuIGdldHRlcjtcbi8qKioqKiovIFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9hc3NldHMvXCI7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNik7XG4vKioqKioqLyB9KVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIChbXG4vKiAwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxuXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzKHRhcmdldCwgYXR0cmlidXRlcykge1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHJldHVybiBhdHRyaWJ1dGVzLmhhc093blByb3BlcnR5KGtleSk7XG4gICAgfSkuZm9yRWFjaChmdW5jdGlvbiAoYXR0ck5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHNldEF0dHJpYnV0ZSh0YXJnZXQsIGF0dHJOYW1lLCBhdHRyaWJ1dGVzW2F0dHJOYW1lXSk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZSh0YXJnZXQsIGF0dHJOYW1lLCBhdHRyVmFsdWUpIHtcbiAgICBhdHRyTmFtZSA9PT0gJ2NsYXNzTmFtZScgJiYgKGF0dHJOYW1lID0gJ2NsYXNzJyk7XG4gICAgdGFyZ2V0LnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQXR0cmlidXRlKHRhcmdldCwgYXR0ck5hbWUpIHtcbiAgICBhdHRyTmFtZSA9PT0gJ2NsYXNzTmFtZScgJiYgKGF0dHJOYW1lID0gJ2NsYXNzJyk7XG4gICAgdGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZShhdHRyTmFtZSk7XG59XG5cbmV4cG9ydHMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5leHBvcnRzLnNldEF0dHJpYnV0ZSA9IHNldEF0dHJpYnV0ZTtcbmV4cG9ydHMucmVtb3ZlQXR0cmlidXRlID0gcmVtb3ZlQXR0cmlidXRlO1xuXG4vKioqLyB9KSxcbi8qIDEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5jcmVhdGVFbGVtZW50ID0gdW5kZWZpbmVkO1xuXG52YXIgX3V0aWxzID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudChub2RlKSB7XG4gICAgLy8gbm9kZTogU3RyaW5nIHx8IHtcbiAgICAvLyAgICAgZWxlbWVudE5hbWU6IFN0cmluZ1xuICAgIC8vICAgICBjaGlsZHJlbjogbm9kZVtdXG4gICAgLy8gICAgIGF0dHJpYnV0ZXM6IE9iamVjdFxuICAgIC8vIH1cbiAgICBpZiAodHlwZW9mIG5vZGUgPT09IFwic3RyaW5nXCIpIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShub2RlKTtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5vZGUuZWxlbWVudE5hbWUpO1xuICAgIG5vZGUuY2hpbGRyZW4gJiYgYXBwZW5kQ2hpbGRyZW4oZWwsIG5vZGUuY2hpbGRyZW4pO1xuICAgICgwLCBfdXRpbHMuc2V0QXR0cmlidXRlcykoZWwsIG5vZGUuYXR0cmlidXRlcyk7XG4gICAgcmV0dXJuIGVsO1xufVxuXG5mdW5jdGlvbiBhcHBlbmRDaGlsZHJlbih0YXJnZXQsIGNoaWxkcmVuKSB7XG4gICAgY2hpbGRyZW4ubWFwKGNyZWF0ZUVsZW1lbnQpLmZvckVhY2godGFyZ2V0LmFwcGVuZENoaWxkLmJpbmQodGFyZ2V0KSk7XG59XG5cbmV4cG9ydHMuY3JlYXRlRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQ7XG5cbi8qKiovIH0pLFxuLyogMiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkNoYW5nZVR5cGUgPSB1bmRlZmluZWQ7XG5cbnZhciBfY2hhbmdlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KTtcblxudmFyIF9jaGFuZ2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2hhbmdlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5DaGFuZ2VUeXBlID0gX2NoYW5nZTIuZGVmYXVsdDtcblxuLyoqKi8gfSksXG4vKiAzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGlmZiA9IHVuZGVmaW5lZDtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG52YXIgX2luZGV4ID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfSBlbHNlIHsgcmV0dXJuIEFycmF5LmZyb20oYXJyKTsgfSB9XG5cbmZ1bmN0aW9uIGRpZmYobmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIC8vIHJldHVybiB0eXBlIFBhdGNoIHtcbiAgICAvLyAgICAgdHlwZTogQ2hhbmdlVHlwZVxuICAgIC8vICAgICBuZXdOb2RlPzogTm9kZVxuICAgIC8vICAgICBjaGlsZHJlbj86IFBhdGNoW11cbiAgICAvLyAgICAgYXR0cmlidXRlcz86IFBhdGNoW11cbiAgICAvLyB9XG4gICAgaWYgKCFvbGROb2RlKSByZXR1cm4geyB0eXBlOiBfaW5kZXguQ2hhbmdlVHlwZS5DUkVBVEUsIG5ld05vZGU6IG5ld05vZGUgfTtlbHNlIGlmICghbmV3Tm9kZSkgcmV0dXJuIHsgdHlwZTogX2luZGV4LkNoYW5nZVR5cGUuUkVNT1ZFIH07ZWxzZSBpZiAoaXNDaGFuZ2VkKG5ld05vZGUsIG9sZE5vZGUpKSByZXR1cm4geyB0eXBlOiBfaW5kZXguQ2hhbmdlVHlwZS5SRVBMQUNFLCBuZXdOb2RlOiBuZXdOb2RlIH07ZWxzZSBpZiAobmV3Tm9kZS5lbGVtZW50TmFtZSkgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogX2luZGV4LkNoYW5nZVR5cGUuVVBEQVRFLFxuICAgICAgICBjaGlsZHJlbjogZGlmZkNoaWxkcmVuKG5ld05vZGUsIG9sZE5vZGUpLFxuICAgICAgICBhdHRyaWJ1dGVzOiBkaWZmQXR0cmlidXRlcyhuZXdOb2RlLCBvbGROb2RlKVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGlzQ2hhbmdlZChuZXdOb2RlLCBvbGROb2RlKSB7XG4gICAgcmV0dXJuICh0eXBlb2YgbmV3Tm9kZSA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG5ld05vZGUpKSAhPT0gKHR5cGVvZiBvbGROb2RlID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2xkTm9kZSkpIHx8IHR5cGVvZiBuZXdOb2RlID09PSBcInN0cmluZ1wiICYmIG5ld05vZGUgIT09IG9sZE5vZGUgfHwgdHlwZW9mIG5ld05vZGUgIT09IFwic3RyaW5nXCIgJiYgbmV3Tm9kZS5lbGVtZW50TmFtZSAhPT0gb2xkTm9kZS5lbGVtZW50TmFtZTtcbn1cblxuZnVuY3Rpb24gZGlmZkF0dHJpYnV0ZXMobmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIHZhciBwYXRjaGVzID0gW107XG4gICAgdmFyIGF0dHJpYnV0ZXMgPSBfZXh0ZW5kcyh7fSwgb2xkTm9kZS5hdHRyaWJ1dGVzLCBuZXdOb2RlLmF0dHJpYnV0ZXMpO1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLm1hcChmdW5jdGlvbiAoYXR0ck5hbWUpIHtcbiAgICAgICAgdmFyIG5ld0F0dHIgPSBuZXdOb2RlLmF0dHJpYnV0ZXNbYXR0ck5hbWVdO1xuICAgICAgICB2YXIgb2xkQXR0ciA9IG9sZE5vZGUuYXR0cmlidXRlc1thdHRyTmFtZV07XG4gICAgICAgICFuZXdBdHRyICYmIHBhdGNoZXMucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiBfaW5kZXguQ2hhbmdlVHlwZS5SRU1PVkVfUFJPUFMsXG4gICAgICAgICAgICB2YWx1ZTogb2xkQXR0ciwgYXR0ck5hbWU6IGF0dHJOYW1lXG4gICAgICAgIH0pO1xuICAgICAgICAoIW9sZEF0dHIgfHwgb2xkQXR0ciAhPT0gbmV3QXR0cikgJiYgcGF0Y2hlcy5wdXNoKHtcbiAgICAgICAgICAgIHR5cGU6IF9pbmRleC5DaGFuZ2VUeXBlLlNFVF9QUk9QUyxcbiAgICAgICAgICAgIHZhbHVlOiBuZXdBdHRyLCBhdHRyTmFtZTogYXR0ck5hbWVcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHBhdGNoZXM7XG59XG5cbmZ1bmN0aW9uIGRpZmZDaGlsZHJlbihuZXdOb2RlLCBvbGROb2RlKSB7XG4gICAgcmV0dXJuIFtdLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkoQXJyYXkoTWF0aC5tYXgobmV3Tm9kZS5jaGlsZHJlbi5sZW5ndGgsIG9sZE5vZGUuY2hpbGRyZW4ubGVuZ3RoKSkua2V5cygpKSkubWFwKGZ1bmN0aW9uIChpKSB7XG4gICAgICAgIHJldHVybiBkaWZmKG5ld05vZGUuY2hpbGRyZW5baV0sIG9sZE5vZGUuY2hpbGRyZW5baV0pO1xuICAgIH0pO1xufVxuXG5leHBvcnRzLmRpZmYgPSBkaWZmO1xuXG4vKioqLyB9KSxcbi8qIDQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgQ2hhbmdlZCA9IHtcbiAgICBDUkVBVEU6ICdDUkVBVEUnLFxuICAgIFJFTU9WRTogJ1JFTU9WRScsXG4gICAgUkVQTEFDRTogJ1JFUExBQ0UnLFxuICAgIFVQREFURTogJ1VQREFURScsXG4gICAgU0VUX1BST1BTOiAnU0VUIFBST1BTJyxcbiAgICBSRU1PVkVfUFJPUFM6ICdSRU1PVkUgUFJPUFMnXG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBDaGFuZ2VkO1xuXG4vKioqLyB9KSxcbi8qIDUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5wYXRjaCA9IHVuZGVmaW5lZDtcblxudmFyIF90eXBlcyA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfaW5kZXggPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2luZGV4MiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbmZ1bmN0aW9uIHBhdGNoKHBhcmVudCwgcGF0Y2hlcykge1xuICAgIHZhciBpbmRleCA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogMDtcblxuICAgIGlmICghcGF0Y2hlcykgcmV0dXJuO1xuICAgIHZhciBlbCA9IHBhcmVudC5jaGlsZE5vZGVzW2luZGV4XTtcbiAgICBzd2l0Y2ggKHBhdGNoZXMudHlwZSkge1xuICAgICAgICBjYXNlIF90eXBlcy5DaGFuZ2VUeXBlLkNSRUFURTpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3Tm9kZSA9IHBhdGNoZXMubmV3Tm9kZTtcblxuICAgICAgICAgICAgICAgIHZhciBuZXdFbCA9ICgwLCBfaW5kZXguY3JlYXRlRWxlbWVudCkobmV3Tm9kZSk7XG4gICAgICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKG5ld0VsKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgY2FzZSBfdHlwZXMuQ2hhbmdlVHlwZS5SRU1PVkU6XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgY2FzZSBfdHlwZXMuQ2hhbmdlVHlwZS5SRVBMQUNFOlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBfbmV3Tm9kZSA9IHBhdGNoZXMubmV3Tm9kZTtcblxuICAgICAgICAgICAgICAgIHZhciBfbmV3RWwgPSAoMCwgX2luZGV4LmNyZWF0ZUVsZW1lbnQpKF9uZXdOb2RlKTtcbiAgICAgICAgICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKF9uZXdFbCwgZWwpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICBjYXNlIF90eXBlcy5DaGFuZ2VUeXBlLlVQREFURTpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRyZW4gPSBwYXRjaGVzLmNoaWxkcmVuLFxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzID0gcGF0Y2hlcy5hdHRyaWJ1dGVzO1xuXG4gICAgICAgICAgICAgICAgcGF0Y2hBdHRyaWJ1dGVzKGVsLCBhdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhdGNoKGVsLCBjaGlsZCwgaW5kZXgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcGF0Y2hBdHRyaWJ1dGVzKGVsZW1lbnQsIGF0dHJpYnV0ZXMpIHtcbiAgICBhdHRyaWJ1dGVzLmZvckVhY2goZnVuY3Rpb24gKHBhdGNoKSB7XG4gICAgICAgIHZhciB0eXBlID0gcGF0Y2gudHlwZSxcbiAgICAgICAgICAgIGF0dHJOYW1lID0gcGF0Y2guYXR0ck5hbWUsXG4gICAgICAgICAgICB2YWx1ZSA9IHBhdGNoLnZhbHVlO1xuXG4gICAgICAgIGlmICh0eXBlID09PSBfdHlwZXMuQ2hhbmdlVHlwZS5TRVRfUFJPUFMpICgwLCBfaW5kZXgyLnNldEF0dHJpYnV0ZSkoZWxlbWVudCwgYXR0ck5hbWUsIHZhbHVlKTtlbHNlIGlmICh0eXBlID09PSBfdHlwZXMuQ2hhbmdlVHlwZS5SRU1PVkVfUFJPUFMpICgwLCBfaW5kZXgyLnJlbW92ZUF0dHJpYnV0ZSkoZWxlbWVudCwgYXR0ck5hbWUsIHZhbHVlKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0cy5wYXRjaCA9IHBhdGNoO1xuXG4vKioqLyB9KSxcbi8qIDYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy51dGlscyA9IGV4cG9ydHMucGF0Y2ggPSBleHBvcnRzLmRpZmYgPSBleHBvcnRzLmNyZWF0ZUVsZW1lbnQgPSB1bmRlZmluZWQ7XG5cbnZhciBfY3JlYXRlID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9kaWZmID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9wYXRjaCA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cbnZhciBfdXRpbHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX3V0aWxzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWxzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5jcmVhdGVFbGVtZW50ID0gX2NyZWF0ZS5jcmVhdGVFbGVtZW50O1xuZXhwb3J0cy5kaWZmID0gX2RpZmYuZGlmZjtcbmV4cG9ydHMucGF0Y2ggPSBfcGF0Y2gucGF0Y2g7XG5leHBvcnRzLnV0aWxzID0gX3V0aWxzMi5kZWZhdWx0O1xuXG4vKioqLyB9KVxuLyoqKioqKi8gXSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbmRsWW5CaFkyczZMeTh2ZDJWaWNHRmpheTlpYjI5MGMzUnlZWEFnWlRjMFpHRmtPRGRtWmpFMU1qQmtNbVV5TmpJaUxDSjNaV0p3WVdOck9pOHZMeTR2ZFhScGJITXZhVzVrWlhndWFuTWlMQ0ozWldKd1lXTnJPaTh2THk0dlkzSmxZWFJsTDJsdVpHVjRMbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMM1I1Y0dWekwybHVaR1Y0TG1weklpd2lkMlZpY0dGamF6b3ZMeTh1TDJScFptWXZhVzVrWlhndWFuTWlMQ0ozWldKd1lXTnJPaTh2THk0dmRIbHdaWE12WTJoaGJtZGxMbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMM0JoZEdOb0wybHVaR1Y0TG1weklpd2lkMlZpY0dGamF6b3ZMeTh1TDJsdVpHVjRMbXB6SWwwc0ltNWhiV1Z6SWpwYkluTmxkRUYwZEhKcFluVjBaWE1pTENKMFlYSm5aWFFpTENKaGRIUnlhV0oxZEdWeklpd2lUMkpxWldOMElpd2lhMlY1Y3lJc0ltWnBiSFJsY2lJc0ltaGhjMDkzYmxCeWIzQmxjblI1SWl3aWEyVjVJaXdpWm05eVJXRmphQ0lzSW5ObGRFRjBkSEpwWW5WMFpTSXNJbUYwZEhKT1lXMWxJaXdpWVhSMGNsWmhiSFZsSWl3aWNtVnRiM1psUVhSMGNtbGlkWFJsSWl3aVkzSmxZWFJsUld4bGJXVnVkQ0lzSW01dlpHVWlMQ0prYjJOMWJXVnVkQ0lzSW1OeVpXRjBaVlJsZUhST2IyUmxJaXdpWld3aUxDSmxiR1Z0Wlc1MFRtRnRaU0lzSW1Ob2FXeGtjbVZ1SWl3aVlYQndaVzVrUTJocGJHUnlaVzRpTENKdFlYQWlMQ0poY0hCbGJtUkRhR2xzWkNJc0ltSnBibVFpTENKRGFHRnVaMlZVZVhCbElpd2laR2xtWmlJc0ltNWxkMDV2WkdVaUxDSnZiR1JPYjJSbElpd2lkSGx3WlNJc0lrTlNSVUZVUlNJc0lsSkZUVTlXUlNJc0ltbHpRMmhoYm1kbFpDSXNJbEpGVUV4QlEwVWlMQ0pWVUVSQlZFVWlMQ0prYVdabVEyaHBiR1J5Wlc0aUxDSmthV1ptUVhSMGNtbGlkWFJsY3lJc0luQmhkR05vWlhNaUxDSnVaWGRCZEhSeUlpd2liMnhrUVhSMGNpSXNJbkIxYzJnaUxDSlNSVTFQVmtWZlVGSlBVRk1pTENKMllXeDFaU0lzSWxORlZGOVFVazlRVXlJc0lrRnljbUY1SWl3aVRXRjBhQ0lzSW0xaGVDSXNJbXhsYm1kMGFDSXNJbWtpTENKRGFHRnVaMlZrSWl3aWNHRjBZMmdpTENKd1lYSmxiblFpTENKcGJtUmxlQ0lzSW1Ob2FXeGtUbTlrWlhNaUxDSnVaWGRGYkNJc0luSmxiVzkyWlVOb2FXeGtJaXdpY21Wd2JHRmpaVU5vYVd4a0lpd2ljR0YwWTJoQmRIUnlhV0oxZEdWeklpd2lZMmhwYkdRaUxDSmxiR1Z0Wlc1MElpd2lkWFJwYkhNaVhTd2liV0Z3Y0dsdVozTWlPaUk3UVVGQlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVRzN08wRkJSMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1lVRkJTenRCUVVOTU8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc2JVTkJRVEpDTERCQ1FVRXdRaXhGUVVGRk8wRkJRM1pFTEhsRFFVRnBReXhsUVVGbE8wRkJRMmhFTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQkxEaEVRVUZ6UkN3clJFRkJLMFE3TzBGQlJYSklPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdPenM3T3pzN096czdPenM3TzBGRE0wUkJMRk5CUVZOQkxHRkJRVlFzUTBGQmRVSkRMRTFCUVhaQ0xFVkJRU3RDUXl4VlFVRXZRaXhGUVVFeVF6dEJRVU4yUTBNc1YwRkJUME1zU1VGQlVDeERRVUZaUml4VlFVRmFMRVZCUTB0SExFMUJSRXdzUTBGRFdUdEJRVUZCTEdWQlFVOUlMRmRCUVZkSkxHTkJRVmdzUTBGQk1FSkRMRWRCUVRGQ0xFTkJRVkE3UVVGQlFTeExRVVJhTEVWQlJVdERMRTlCUmt3c1EwRkZZVHRCUVVGQkxHVkJRVmxETEdGQlFXRlNMRTFCUVdJc1JVRkJjVUpUTEZGQlFYSkNMRVZCUVN0Q1VpeFhRVUZYVVN4UlFVRllMRU5CUVM5Q0xFTkJRVm83UVVGQlFTeExRVVppTzBGQlIwZzdPMEZCUlVRc1UwRkJVMFFzV1VGQlZDeERRVUZ6UWxJc1RVRkJkRUlzUlVGQk9FSlRMRkZCUVRsQ0xFVkJRWGREUXl4VFFVRjRReXhGUVVGdFJEdEJRVU12UTBRc2FVSkJRV0VzVjBGQllpeExRVUUyUWtFc1YwRkJWeXhQUVVGNFF6dEJRVU5CVkN4WFFVRlBVU3haUVVGUUxFTkJRVzlDUXl4UlFVRndRaXhGUVVFNFFrTXNVMEZCT1VJN1FVRkRTRHM3UVVGRlJDeFRRVUZUUXl4bFFVRlVMRU5CUVhsQ1dDeE5RVUY2UWl4RlFVRnBRMU1zVVVGQmFrTXNSVUZCTWtNN1FVRkRka05CTEdsQ1FVRmhMRmRCUVdJc1MwRkJOa0pCTEZkQlFWY3NUMEZCZUVNN1FVRkRRVlFzVjBGQlQxY3NaVUZCVUN4RFFVRjFRa1lzVVVGQmRrSTdRVUZEU0RzN1VVRkpSMVlzWVN4SFFVRkJRU3hoTzFGQlEwRlRMRmtzUjBGQlFVRXNXVHRSUVVOQlJ5eGxMRWRCUVVGQkxHVTdPenM3T3pzN096czdPenM3TzBGRGNrSktPenRCUVVsQkxGTkJRVk5ETEdGQlFWUXNRMEZCZFVKRExFbEJRWFpDTEVWQlFUWkNPMEZCUTNwQ08wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4UlFVRkpMRTlCUVU5QkxFbEJRVkFzUzBGQlowSXNVVUZCY0VJc1JVRkRTU3hQUVVGUFF5eFRRVUZUUXl4alFVRlVMRU5CUVhkQ1JpeEpRVUY0UWl4RFFVRlFPMEZCUTBvc1VVRkJUVWNzUzBGQlMwWXNVMEZCVTBZc1lVRkJWQ3hEUVVGMVFrTXNTMEZCUzBrc1YwRkJOVUlzUTBGQldEdEJRVU5CU2l4VFFVRkxTeXhSUVVGTUxFbEJRV2xDUXl4bFFVRmxTQ3hGUVVGbUxFVkJRVzFDU0N4TFFVRkxTeXhSUVVGNFFpeERRVUZxUWp0QlFVTkJMRGhDUVVGalJpeEZRVUZrTEVWQlFXdENTQ3hMUVVGTFdpeFZRVUYyUWp0QlFVTkJMRmRCUVU5bExFVkJRVkE3UVVGRFNEczdRVUZIUkN4VFFVRlRSeXhqUVVGVUxFTkJRWGRDYmtJc1RVRkJlRUlzUlVGQlowTnJRaXhSUVVGb1F5eEZRVUV3UXp0QlFVTjBRMEVzWVVGQlUwVXNSMEZCVkN4RFFVRmhVaXhoUVVGaUxFVkJRMHRNTEU5QlJFd3NRMEZEWVZBc1QwRkJUM0ZDTEZkQlFWQXNRMEZCYlVKRExFbEJRVzVDTEVOQlFYZENkRUlzVFVGQmVFSXNRMEZFWWp0QlFVVklPenRSUVVsSFdTeGhMRWRCUVVGQkxHRTdPenM3T3pzN096czdPenM3TzBGRE1VSktPenM3T3pzN1VVRkpTVmNzVlRzN096czdPenM3T3pzN096czdPenM3TzBGRFNrbzdPenM3UVVGSlFTeFRRVUZUUXl4SlFVRlVMRU5CUVdORExFOUJRV1FzUlVGQmRVSkRMRTlCUVhaQ0xFVkJRV2RETzBGQlF6VkNPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEZGQlFVa3NRMEZCUTBFc1QwRkJUQ3hGUVVGakxFOUJRVThzUlVGQlJVTXNUVUZCVFN4clFrRkJWME1zVFVGQmJrSXNSVUZCTWtKSUxHZENRVUV6UWl4RlFVRlFMRU5CUVdRc1MwRkRTeXhKUVVGSkxFTkJRVU5CTEU5QlFVd3NSVUZCWXl4UFFVRlBMRVZCUVVWRkxFMUJRVTBzYTBKQlFWZEZMRTFCUVc1Q0xFVkJRVkFzUTBGQlpDeExRVU5CTEVsQlFVbERMRlZCUVZWTUxFOUJRVllzUlVGQmJVSkRMRTlCUVc1Q0xFTkJRVW9zUlVGQmFVTXNUMEZCVHl4RlFVRkZReXhOUVVGTkxHdENRVUZYU1N4UFFVRnVRaXhGUVVFMFFrNHNaMEpCUVRWQ0xFVkJRVkFzUTBGQmFrTXNTMEZEUVN4SlFVRkpRU3hSUVVGUlVpeFhRVUZhTEVWQlEwUXNUMEZCVHp0QlFVTklWU3hqUVVGTkxHdENRVUZYU3l4TlFVUmtPMEZCUlVoa0xHdENRVUZWWlN4aFFVRmhVaXhQUVVGaUxFVkJRWE5DUXl4UFFVRjBRaXhEUVVaUU8wRkJSMGg2UWl4dlFrRkJXV2xETEdWQlFXVlVMRTlCUVdZc1JVRkJkMEpETEU5QlFYaENPMEZCU0ZRc1MwRkJVRHRCUVV0UU96dEJRVVZFTEZOQlFWTkpMRk5CUVZRc1EwRkJiVUpNTEU5QlFXNUNMRVZCUVRSQ1F5eFBRVUUxUWl4RlFVRnhRenRCUVVOcVF5eFhRVUZQTEZGQlFVOUVMRTlCUVZBc2VVTkJRVTlCTEU5QlFWQXNaVUZCTUVKRExFOUJRVEZDTEhsRFFVRXdRa0VzVDBGQk1VSXNUVUZEU0N4UFFVRlBSQ3hQUVVGUUxFdEJRVzFDTEZGQlFXNUNMRWxCUVN0Q1FTeFpRVUZaUXl4UFFVUjRReXhKUVVWSUxFOUJRVTlFTEU5QlFWQXNTMEZCYlVJc1VVRkJia0lzU1VGQkswSkJMRkZCUVZGU0xGZEJRVklzUzBGQmQwSlRMRkZCUVZGVUxGZEJSbTVGTzBGQlIwZzdPMEZCUlVRc1UwRkJVMmxDTEdOQlFWUXNRMEZCZDBKVUxFOUJRWGhDTEVWQlFXbERReXhQUVVGcVF5eEZRVUV3UXp0QlFVTjBReXhSUVVGTlV5eFZRVUZYTEVWQlFXcENPMEZCUTBFc1VVRkJUV3hETERCQ1FVRnBRbmxDTEZGQlFWRjZRaXhWUVVGNlFpeEZRVUYzUTNkQ0xGRkJRVkY0UWl4VlFVRm9SQ3hEUVVGT08wRkJRMEZETEZkQlFVOURMRWxCUVZBc1EwRkJXVVlzVlVGQldpeEZRVUYzUW0xQ0xFZEJRWGhDTEVOQlFUUkNMRzlDUVVGWk8wRkJRM0JETEZsQlFVMW5RaXhWUVVGVldDeFJRVUZSZUVJc1ZVRkJVaXhEUVVGdFFsRXNVVUZCYmtJc1EwRkJhRUk3UVVGRFFTeFpRVUZOTkVJc1ZVRkJWVmdzVVVGQlVYcENMRlZCUVZJc1EwRkJiVUpSTEZGQlFXNUNMRU5CUVdoQ08wRkJRMEVzVTBGQlF6SkNMRTlCUVVRc1NVRkJXVVFzVVVGQlVVY3NTVUZCVWl4RFFVRmhPMEZCUTNKQ1dDeHJRa0ZCVFN4clFrRkJWMWtzV1VGRVNUdEJRVVZ5UWtNc2JVSkJRVTlJTEU5QlJtTXNSVUZGVERWQ08wRkJSa3NzVTBGQllpeERRVUZhTzBGQlNVRXNVMEZCUXl4RFFVRkRORUlzVDBGQlJDeEpRVUZaUVN4WlFVRlpSQ3hQUVVGNlFpeExRVUZ4UTBRc1VVRkJVVWNzU1VGQlVpeERRVUZoTzBGQlF6bERXQ3hyUWtGQlRTeHJRa0ZCVjJNc1UwRkVOa0k3UVVGRk9VTkVMRzFDUVVGUFNpeFBRVVoxUXl4RlFVVTVRak5DTzBGQlJqaENMRk5CUVdJc1EwRkJja003UVVGSlNDeExRVmhFTzBGQldVRXNWMEZCVHpCQ0xFOUJRVkE3UVVGRFNEczdRVUZIUkN4VFFVRlRSaXhaUVVGVUxFTkJRWE5DVWl4UFFVRjBRaXhGUVVFclFrTXNUMEZCTDBJc1JVRkJkME03UVVGRGNFTXNWMEZCVHl3MlFrRkJTV2RDTEUxQlFVMURMRXRCUVV0RExFZEJRVXdzUTBGRFltNUNMRkZCUVZGUUxGRkJRVklzUTBGQmFVSXlRaXhOUVVSS0xFVkJSV0p1UWl4UlFVRlJVaXhSUVVGU0xFTkJRV2xDTWtJc1RVRkdTaXhEUVVGT0xFVkJSMUl4UXl4SlFVaFJMRVZCUVVvc1IwRkhTV2xDTEVkQlNFb3NRMEZIVVR0QlFVRkJMR1ZCUVV0SkxFdEJRVXRETEZGQlFWRlFMRkZCUVZJc1EwRkJhVUkwUWl4RFFVRnFRaXhEUVVGTUxFVkJRVEJDY0VJc1VVRkJVVklzVVVGQlVpeERRVUZwUWpSQ0xFTkJRV3BDTEVOQlFURkNMRU5CUVV3N1FVRkJRU3hMUVVoU0xFTkJRVkE3UVVGSlNEczdVVUZKUjNSQ0xFa3NSMEZCUVVFc1NUczdPenM3T3pzN096czdPenRCUTNoRVNpeEpRVUZOZFVJc1ZVRkJWVHRCUVVOYWJrSXNXVUZCVVN4UlFVUkpPMEZCUlZwRExGbEJRVkVzVVVGR1NUdEJRVWRhUlN4aFFVRlRMRk5CU0VjN1FVRkpXa01zV1VGQlVTeFJRVXBKTzBGQlMxcFRMR1ZCUVZjc1YwRk1RenRCUVUxYVJpeHJRa0ZCWXp0QlFVNUdMRU5CUVdoQ096dHJRa0ZWWlZFc1R6czdPenM3T3pzN096czdPenM3UVVOV1pqczdRVUZEUVRzN1FVRkRRVHM3UVVGSlFTeFRRVUZUUXl4TFFVRlVMRU5CUVdWRExFMUJRV1lzUlVGQmRVSmtMRTlCUVhaQ0xFVkJRWGxETzBGQlFVRXNVVUZCVkdVc1MwRkJVeXgxUlVGQlNDeERRVUZIT3p0QlFVTnlReXhSUVVGSkxFTkJRVU5tTEU5QlFVd3NSVUZCWXp0QlFVTmtMRkZCUVUxdVFpeExRVUZMYVVNc1QwRkJUMFVzVlVGQlVDeERRVUZyUWtRc1MwRkJiRUlzUTBGQldEdEJRVU5CTEZsQlFWRm1MRkZCUVZGU0xFbEJRV2hDTzBGQlEwa3NZVUZCU3l4clFrRkJWME1zVFVGQmFFSTdRVUZCZDBJN1FVRkJRU3h2UWtGRFdrZ3NUMEZFV1N4SFFVTkJWU3hQUVVSQkxFTkJRMXBXTEU5QlJGazdPMEZCUlhCQ0xHOUNRVUZOTWtJc1VVRkJVU3d3UWtGQll6TkNMRTlCUVdRc1EwRkJaRHRCUVVOQmQwSXNkVUpCUVU4MVFpeFhRVUZRTEVOQlFXMUNLMElzUzBGQmJrSTdRVUZEUVR0QlFVTklPMEZCUTBRc1lVRkJTeXhyUWtGQlYzWkNMRTFCUVdoQ08wRkJRWGRDTzBGQlEzQkNiMElzZFVKQlFVOUpMRmRCUVZBc1EwRkJiVUp5UXl4RlFVRnVRanRCUVVOQk8wRkJRMGc3UVVGRFJDeGhRVUZMTEd0Q1FVRlhaU3hQUVVGb1FqdEJRVUY1UWp0QlFVRkJMRzlDUVVOaVRpeFJRVVJoTEVkQlEwUlZMRTlCUkVNc1EwRkRZbFlzVDBGRVlUczdRVUZGY2tJc2IwSkJRVTB5UWl4VFFVRlJMREJDUVVGak0wSXNVVUZCWkN4RFFVRmtPMEZCUTBGM1FpeDFRa0ZCVDBzc1dVRkJVQ3hEUVVGdlFrWXNUVUZCY0VJc1JVRkJNa0p3UXl4RlFVRXpRanRCUVVOQk8wRkJRMGc3UVVGRFJDeGhRVUZMTEd0Q1FVRlhaMElzVFVGQmFFSTdRVUZCZDBJN1FVRkJRU3h2UWtGRFdtUXNVVUZFV1N4SFFVTmhhVUlzVDBGRVlpeERRVU5hYWtJc1VVRkVXVHRCUVVGQkxHOUNRVU5HYWtJc1ZVRkVSU3hIUVVOaGEwTXNUMEZFWWl4RFFVTkdiRU1zVlVGRVJUczdRVUZGY0VKelJDeG5RMEZCWjBKMlF5eEZRVUZvUWl4RlFVRnZRbVlzVlVGQmNFSTdRVUZEUVdsQ0xIbENRVUZUV0N4UFFVRlVMRU5CUVdsQ0xGVkJRVU5wUkN4TFFVRkVMRVZCUVZGT0xFdEJRVkk3UVVGQlFTd3lRa0ZCYTBKR0xFMUJRVTFvUXl4RlFVRk9MRVZCUVZWM1F5eExRVUZXTEVWQlFXbENUaXhMUVVGcVFpeERRVUZzUWp0QlFVRkJMR2xDUVVGcVFqdEJRVU5CTzBGQlEwZzdRVUYwUWt3N1FVRjNRa2c3TzBGQlJVUXNVMEZCVTBzc1pVRkJWQ3hEUVVGNVFrVXNUMEZCZWtJc1JVRkJhME40UkN4VlFVRnNReXhGUVVFNFF6dEJRVU14UTBFc1pVRkJWMDBzVDBGQldDeERRVUZ0UWl4cFFrRkJVenRCUVVGQkxGbEJRMmhDYjBJc1NVRkVaMElzUjBGRFZYRkNMRXRCUkZZc1EwRkRhRUp5UWl4SlFVUm5RanRCUVVGQkxGbEJRMVpzUWl4UlFVUlZMRWRCUTFWMVF5eExRVVJXTEVOQlExWjJReXhSUVVSVk8wRkJRVUVzV1VGRFFTdENMRXRCUkVFc1IwRkRWVkVzUzBGRVZpeERRVU5CVWl4TFFVUkJPenRCUVVWNFFpeFpRVUZKWWl4VFFVRlRMR3RDUVVGWFl5eFRRVUY0UWl4RlFVTkpMREJDUVVGaFowSXNUMEZCWWl4RlFVRnpRbWhFTEZGQlFYUkNMRVZCUVdkREswSXNTMEZCYUVNc1JVRkVTaXhMUVVWTExFbEJRVWxpTEZOQlFWTXNhMEpCUVZkWkxGbEJRWGhDTEVWQlEwUXNOa0pCUVdkQ2EwSXNUMEZCYUVJc1JVRkJlVUpvUkN4UlFVRjZRaXhGUVVGdFF5dENMRXRCUVc1RE8wRkJRMUFzUzBGT1JEdEJRVTlJT3p0UlFVbEhVU3hMTEVkQlFVRkJMRXM3T3pzN096czdPenM3T3pzN08wRkRMME5LT3p0QlFVTkJPenRCUVVOQk96dEJRVU5CT3pzN096czdVVUZKU1hCRExHRTdVVUZEUVZrc1NUdFJRVU5CZDBJc1N6dFJRVU5CVlN4TElpd2labWxzWlNJNkltbHVaR1Y0TG1KMWFXeGtMbXB6SWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUlGeDBMeThnVkdobElHMXZaSFZzWlNCallXTm9aVnh1SUZ4MGRtRnlJR2x1YzNSaGJHeGxaRTF2WkhWc1pYTWdQU0I3ZlR0Y2JseHVJRngwTHk4Z1ZHaGxJSEpsY1hWcGNtVWdablZ1WTNScGIyNWNiaUJjZEdaMWJtTjBhVzl1SUY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4b2JXOWtkV3hsU1dRcElIdGNibHh1SUZ4MFhIUXZMeUJEYUdWamF5QnBaaUJ0YjJSMWJHVWdhWE1nYVc0Z1kyRmphR1ZjYmlCY2RGeDBhV1lvYVc1emRHRnNiR1ZrVFc5a2RXeGxjMXR0YjJSMWJHVkpaRjBwSUh0Y2JpQmNkRngwWEhSeVpYUjFjbTRnYVc1emRHRnNiR1ZrVFc5a2RXeGxjMXR0YjJSMWJHVkpaRjB1Wlhod2IzSjBjenRjYmlCY2RGeDBmVnh1SUZ4MFhIUXZMeUJEY21WaGRHVWdZU0J1WlhjZ2JXOWtkV3hsSUNoaGJtUWdjSFYwSUdsMElHbHVkRzhnZEdobElHTmhZMmhsS1Z4dUlGeDBYSFIyWVhJZ2JXOWtkV3hsSUQwZ2FXNXpkR0ZzYkdWa1RXOWtkV3hsYzF0dGIyUjFiR1ZKWkYwZ1BTQjdYRzRnWEhSY2RGeDBhVG9nYlc5a2RXeGxTV1FzWEc0Z1hIUmNkRngwYkRvZ1ptRnNjMlVzWEc0Z1hIUmNkRngwWlhod2IzSjBjem9nZTMxY2JpQmNkRngwZlR0Y2JseHVJRngwWEhRdkx5QkZlR1ZqZFhSbElIUm9aU0J0YjJSMWJHVWdablZ1WTNScGIyNWNiaUJjZEZ4MGJXOWtkV3hsYzF0dGIyUjFiR1ZKWkYwdVkyRnNiQ2h0YjJSMWJHVXVaWGh3YjNKMGN5d2diVzlrZFd4bExDQnRiMlIxYkdVdVpYaHdiM0owY3l3Z1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5azdYRzVjYmlCY2RGeDBMeThnUm14aFp5QjBhR1VnYlc5a2RXeGxJR0Z6SUd4dllXUmxaRnh1SUZ4MFhIUnRiMlIxYkdVdWJDQTlJSFJ5ZFdVN1hHNWNiaUJjZEZ4MEx5OGdVbVYwZFhKdUlIUm9aU0JsZUhCdmNuUnpJRzltSUhSb1pTQnRiMlIxYkdWY2JpQmNkRngwY21WMGRYSnVJRzF2WkhWc1pTNWxlSEJ2Y25Sek8xeHVJRngwZlZ4dVhHNWNiaUJjZEM4dklHVjRjRzl6WlNCMGFHVWdiVzlrZFd4bGN5QnZZbXBsWTNRZ0tGOWZkMlZpY0dGamExOXRiMlIxYkdWelgxOHBYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxtMGdQU0J0YjJSMWJHVnpPMXh1WEc0Z1hIUXZMeUJsZUhCdmMyVWdkR2hsSUcxdlpIVnNaU0JqWVdOb1pWeHVJRngwWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1aklEMGdhVzV6ZEdGc2JHVmtUVzlrZFd4bGN6dGNibHh1SUZ4MEx5OGdaR1ZtYVc1bElHZGxkSFJsY2lCbWRXNWpkR2x2YmlCbWIzSWdhR0Z5Ylc5dWVTQmxlSEJ2Y25SelhHNGdYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG1RZ1BTQm1kVzVqZEdsdmJpaGxlSEJ2Y25SekxDQnVZVzFsTENCblpYUjBaWElwSUh0Y2JpQmNkRngwYVdZb0lWOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVieWhsZUhCdmNuUnpMQ0J1WVcxbEtTa2dlMXh1SUZ4MFhIUmNkRTlpYW1WamRDNWtaV1pwYm1WUWNtOXdaWEowZVNobGVIQnZjblJ6TENCdVlXMWxMQ0I3WEc0Z1hIUmNkRngwWEhSamIyNW1hV2QxY21GaWJHVTZJR1poYkhObExGeHVJRngwWEhSY2RGeDBaVzUxYldWeVlXSnNaVG9nZEhKMVpTeGNiaUJjZEZ4MFhIUmNkR2RsZERvZ1oyVjBkR1Z5WEc0Z1hIUmNkRngwZlNrN1hHNGdYSFJjZEgxY2JpQmNkSDA3WEc1Y2JpQmNkQzh2SUdkbGRFUmxabUYxYkhSRmVIQnZjblFnWm5WdVkzUnBiMjRnWm05eUlHTnZiWEJoZEdsaWFXeHBkSGtnZDJsMGFDQnViMjR0YUdGeWJXOXVlU0J0YjJSMWJHVnpYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxtNGdQU0JtZFc1amRHbHZiaWh0YjJSMWJHVXBJSHRjYmlCY2RGeDBkbUZ5SUdkbGRIUmxjaUE5SUcxdlpIVnNaU0FtSmlCdGIyUjFiR1V1WDE5bGMwMXZaSFZzWlNBL1hHNGdYSFJjZEZ4MFpuVnVZM1JwYjI0Z1oyVjBSR1ZtWVhWc2RDZ3BJSHNnY21WMGRYSnVJRzF2WkhWc1pWc25aR1ZtWVhWc2RDZGRPeUI5SURwY2JpQmNkRngwWEhSbWRXNWpkR2x2YmlCblpYUk5iMlIxYkdWRmVIQnZjblJ6S0NrZ2V5QnlaWFIxY200Z2JXOWtkV3hsT3lCOU8xeHVJRngwWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxtUW9aMlYwZEdWeUxDQW5ZU2NzSUdkbGRIUmxjaWs3WEc0Z1hIUmNkSEpsZEhWeWJpQm5aWFIwWlhJN1hHNGdYSFI5TzF4dVhHNGdYSFF2THlCUFltcGxZM1F1Y0hKdmRHOTBlWEJsTG1oaGMwOTNibEJ5YjNCbGNuUjVMbU5oYkd4Y2JpQmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1YnlBOUlHWjFibU4wYVc5dUtHOWlhbVZqZEN3Z2NISnZjR1Z5ZEhrcElIc2djbVYwZFhKdUlFOWlhbVZqZEM1d2NtOTBiM1I1Y0dVdWFHRnpUM2R1VUhKdmNHVnlkSGt1WTJGc2JDaHZZbXBsWTNRc0lIQnliM0JsY25SNUtUc2dmVHRjYmx4dUlGeDBMeThnWDE5M1pXSndZV05yWDNCMVlteHBZMTl3WVhSb1gxOWNiaUJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWNDQTlJRndpTDJGemMyVjBjeTljSWp0Y2JseHVJRngwTHk4Z1RHOWhaQ0JsYm5SeWVTQnRiMlIxYkdVZ1lXNWtJSEpsZEhWeWJpQmxlSEJ2Y25SelhHNGdYSFJ5WlhSMWNtNGdYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeWhmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG5NZ1BTQTJLVHRjYmx4dVhHNWNiaTh2SUZkRlFsQkJRMHNnUms5UFZFVlNJQzh2WEc0dkx5QjNaV0p3WVdOckwySnZiM1J6ZEhKaGNDQmxOelJrWVdRNE4yWm1NVFV5TUdReVpUSTJNaUlzSWx4dVhHNW1kVzVqZEdsdmJpQnpaWFJCZEhSeWFXSjFkR1Z6S0hSaGNtZGxkQ3dnWVhSMGNtbGlkWFJsY3lrZ2UxeHVJQ0FnSUU5aWFtVmpkQzVyWlhsektHRjBkSEpwWW5WMFpYTXBYRzRnSUNBZ0lDQWdJQzVtYVd4MFpYSW9hMlY1SUQwK0lHRjBkSEpwWW5WMFpYTXVhR0Z6VDNkdVVISnZjR1Z5ZEhrb2EyVjVLU2xjYmlBZ0lDQWdJQ0FnTG1admNrVmhZMmdvWVhSMGNrNWhiV1VnUFQ0Z2MyVjBRWFIwY21saWRYUmxLSFJoY21kbGRDd2dZWFIwY2s1aGJXVXNJR0YwZEhKcFluVjBaWE5iWVhSMGNrNWhiV1ZkS1NrN1hHNTlYRzVjYm1aMWJtTjBhVzl1SUhObGRFRjBkSEpwWW5WMFpTaDBZWEpuWlhRc0lHRjBkSEpPWVcxbExDQmhkSFJ5Vm1Gc2RXVXBJSHRjYmlBZ0lDQmhkSFJ5VG1GdFpTQTlQVDBnSjJOc1lYTnpUbUZ0WlNjZ0ppWWdLR0YwZEhKT1lXMWxJRDBnSjJOc1lYTnpKeWs3WEc0Z0lDQWdkR0Z5WjJWMExuTmxkRUYwZEhKcFluVjBaU2hoZEhSeVRtRnRaU3dnWVhSMGNsWmhiSFZsS1R0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnY21WdGIzWmxRWFIwY21saWRYUmxLSFJoY21kbGRDd2dZWFIwY2s1aGJXVXBJSHRjYmlBZ0lDQmhkSFJ5VG1GdFpTQTlQVDBnSjJOc1lYTnpUbUZ0WlNjZ0ppWWdLR0YwZEhKT1lXMWxJRDBnSjJOc1lYTnpKeWs3WEc0Z0lDQWdkR0Z5WjJWMExuSmxiVzkyWlVGMGRISnBZblYwWlNoaGRIUnlUbUZ0WlNrN1hHNTlYRzVjYmx4dVpYaHdiM0owSUh0Y2JpQWdJQ0J6WlhSQmRIUnlhV0oxZEdWekxGeHVJQ0FnSUhObGRFRjBkSEpwWW5WMFpTeGNiaUFnSUNCeVpXMXZkbVZCZEhSeWFXSjFkR1ZjYm4xY2JseHVYRzVjYmk4dklGZEZRbEJCUTBzZ1JrOVBWRVZTSUM4dlhHNHZMeUF1TDNWMGFXeHpMMmx1WkdWNExtcHpJaXdpWEc1cGJYQnZjblFnZXlCelpYUkJkSFJ5YVdKMWRHVnpMQ0J6WlhSQmRIUnlhV0oxZEdVZ2ZTQm1jbTl0SUNjdUxpOTFkR2xzY3ljN1hHNWNibHh1WEc1bWRXNWpkR2x2YmlCamNtVmhkR1ZGYkdWdFpXNTBLRzV2WkdVcElIdGNiaUFnSUNBdkx5QnViMlJsT2lCVGRISnBibWNnZkh3Z2UxeHVJQ0FnSUM4dklDQWdJQ0JsYkdWdFpXNTBUbUZ0WlRvZ1UzUnlhVzVuWEc0Z0lDQWdMeThnSUNBZ0lHTm9hV3hrY21WdU9pQnViMlJsVzExY2JpQWdJQ0F2THlBZ0lDQWdZWFIwY21saWRYUmxjem9nVDJKcVpXTjBYRzRnSUNBZ0x5OGdmVnh1SUNBZ0lHbG1JQ2gwZVhCbGIyWWdibTlrWlNBOVBUMGdYQ0p6ZEhKcGJtZGNJaWxjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJR1J2WTNWdFpXNTBMbU55WldGMFpWUmxlSFJPYjJSbEtHNXZaR1VwTzF4dUlDQWdJR052Ym5OMElHVnNJRDBnWkc5amRXMWxiblF1WTNKbFlYUmxSV3hsYldWdWRDaHViMlJsTG1Wc1pXMWxiblJPWVcxbEtUdGNiaUFnSUNCdWIyUmxMbU5vYVd4a2NtVnVJQ1ltSUdGd2NHVnVaRU5vYVd4a2NtVnVLR1ZzTENCdWIyUmxMbU5vYVd4a2NtVnVLVHRjYmlBZ0lDQnpaWFJCZEhSeWFXSjFkR1Z6S0dWc0xDQnViMlJsTG1GMGRISnBZblYwWlhNcE8xeHVJQ0FnSUhKbGRIVnliaUJsYkR0Y2JuMWNibHh1WEc1bWRXNWpkR2x2YmlCaGNIQmxibVJEYUdsc1pISmxiaWgwWVhKblpYUXNJR05vYVd4a2NtVnVLU0I3WEc0Z0lDQWdZMmhwYkdSeVpXNHViV0Z3S0dOeVpXRjBaVVZzWlcxbGJuUXBYRzRnSUNBZ0lDQWdJQzVtYjNKRllXTm9LSFJoY21kbGRDNWhjSEJsYm1SRGFHbHNaQzVpYVc1a0tIUmhjbWRsZENrcFhHNTlYRzVjYmx4dVpYaHdiM0owSUh0Y2JpQWdJQ0JqY21WaGRHVkZiR1Z0Wlc1MFhHNTlYRzVjYmx4dVhHNHZMeUJYUlVKUVFVTkxJRVpQVDFSRlVpQXZMMXh1THk4Z0xpOWpjbVZoZEdVdmFXNWtaWGd1YW5NaUxDSmNibWx0Y0c5eWRDQkRhR0Z1WjJWVWVYQmxJR1p5YjIwZ0p5NHZZMmhoYm1kbEp6dGNibHh1WEc1bGVIQnZjblFnZTF4dUlDQWdJRU5vWVc1blpWUjVjR1ZjYm4xY2JseHVYRzVjYmk4dklGZEZRbEJCUTBzZ1JrOVBWRVZTSUM4dlhHNHZMeUF1TDNSNWNHVnpMMmx1WkdWNExtcHpJaXdpWEc1cGJYQnZjblFnZXlCRGFHRnVaMlZVZVhCbElIMGdabkp2YlNBbkxpNHZkSGx3WlhNdmFXNWtaWGduTzF4dVhHNWNibHh1Wm5WdVkzUnBiMjRnWkdsbVppaHVaWGRPYjJSbExDQnZiR1JPYjJSbEtTQjdYRzRnSUNBZ0x5OGdjbVYwZFhKdUlIUjVjR1VnVUdGMFkyZ2dlMXh1SUNBZ0lDOHZJQ0FnSUNCMGVYQmxPaUJEYUdGdVoyVlVlWEJsWEc0Z0lDQWdMeThnSUNBZ0lHNWxkMDV2WkdVL09pQk9iMlJsWEc0Z0lDQWdMeThnSUNBZ0lHTm9hV3hrY21WdVB6b2dVR0YwWTJoYlhWeHVJQ0FnSUM4dklDQWdJQ0JoZEhSeWFXSjFkR1Z6UHpvZ1VHRjBZMmhiWFZ4dUlDQWdJQzh2SUgxY2JpQWdJQ0JwWmlBb0lXOXNaRTV2WkdVcElISmxkSFZ5YmlCN0lIUjVjR1U2SUVOb1lXNW5aVlI1Y0dVdVExSkZRVlJGTENCdVpYZE9iMlJsSUgwN1hHNGdJQ0FnWld4elpTQnBaaUFvSVc1bGQwNXZaR1VwSUhKbGRIVnliaUI3SUhSNWNHVTZJRU5vWVc1blpWUjVjR1V1VWtWTlQxWkZJSDA3WEc0Z0lDQWdaV3h6WlNCcFppQW9hWE5EYUdGdVoyVmtLRzVsZDA1dlpHVXNJRzlzWkU1dlpHVXBLU0J5WlhSMWNtNGdleUIwZVhCbE9pQkRhR0Z1WjJWVWVYQmxMbEpGVUV4QlEwVXNJRzVsZDA1dlpHVWdmVHRjYmlBZ0lDQmxiSE5sSUdsbUlDaHVaWGRPYjJSbExtVnNaVzFsYm5ST1lXMWxLVnh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2RIbHdaVG9nUTJoaGJtZGxWSGx3WlM1VlVFUkJWRVVzWEc0Z0lDQWdJQ0FnSUNBZ0lDQmphR2xzWkhKbGJqb2daR2xtWmtOb2FXeGtjbVZ1S0c1bGQwNXZaR1VzSUc5c1pFNXZaR1VwTEZ4dUlDQWdJQ0FnSUNBZ0lDQWdZWFIwY21saWRYUmxjem9nWkdsbVprRjBkSEpwWW5WMFpYTW9ibVYzVG05a1pTd2diMnhrVG05a1pTbGNiaUFnSUNBZ0lDQWdmVHRjYm4xY2JseHVablZ1WTNScGIyNGdhWE5EYUdGdVoyVmtLRzVsZDA1dlpHVXNJRzlzWkU1dlpHVXBJSHRjYmlBZ0lDQnlaWFIxY200Z2RIbHdaVzltSUc1bGQwNXZaR1VnSVQwOUlIUjVjR1Z2WmlCdmJHUk9iMlJsSUh4OFhHNGdJQ0FnSUNBZ0lIUjVjR1Z2WmlCdVpYZE9iMlJsSUQwOVBTQmNJbk4wY21sdVoxd2lJQ1ltSUc1bGQwNXZaR1VnSVQwOUlHOXNaRTV2WkdVZ2ZIeGNiaUFnSUNBZ0lDQWdkSGx3Wlc5bUlHNWxkMDV2WkdVZ0lUMDlJRndpYzNSeWFXNW5YQ0lnSmlZZ2JtVjNUbTlrWlM1bGJHVnRaVzUwVG1GdFpTQWhQVDBnYjJ4a1RtOWtaUzVsYkdWdFpXNTBUbUZ0WlR0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnWkdsbVprRjBkSEpwWW5WMFpYTW9ibVYzVG05a1pTd2diMnhrVG05a1pTa2dlMXh1SUNBZ0lHTnZibk4wSUhCaGRHTm9aWE1nSUQwZ1cxMDdYRzRnSUNBZ1kyOXVjM1FnWVhSMGNtbGlkWFJsY3lBOUlIc3VMaTV2YkdST2IyUmxMbUYwZEhKcFluVjBaWE1zSUM0dUxtNWxkMDV2WkdVdVlYUjBjbWxpZFhSbGMzMDdYRzRnSUNBZ1QySnFaV04wTG10bGVYTW9ZWFIwY21saWRYUmxjeWt1YldGd0tHRjBkSEpPWVcxbElEMCtJSHRjYmlBZ0lDQWdJQ0FnWTI5dWMzUWdibVYzUVhSMGNpQTlJRzVsZDA1dlpHVXVZWFIwY21saWRYUmxjMXRoZEhSeVRtRnRaVjA3WEc0Z0lDQWdJQ0FnSUdOdmJuTjBJRzlzWkVGMGRISWdQU0J2YkdST2IyUmxMbUYwZEhKcFluVjBaWE5iWVhSMGNrNWhiV1ZkTzF4dUlDQWdJQ0FnSUNBaGJtVjNRWFIwY2lBbUppQndZWFJqYUdWekxuQjFjMmdvZTF4dUlDQWdJQ0FnSUNBZ0lDQWdkSGx3WlRvZ1EyaGhibWRsVkhsd1pTNVNSVTFQVmtWZlVGSlBVRk1zWEc0Z0lDQWdJQ0FnSUNBZ0lDQjJZV3gxWlRvZ2IyeGtRWFIwY2l3Z1lYUjBjazVoYldWY2JpQWdJQ0FnSUNBZ2ZTazdYRzRnSUNBZ0lDQWdJQ2doYjJ4a1FYUjBjaUI4ZkNCdmJHUkJkSFJ5SUNFOVBTQnVaWGRCZEhSeUtTQW1KaUJ3WVhSamFHVnpMbkIxYzJnb2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnZEhsd1pUb2dRMmhoYm1kbFZIbHdaUzVUUlZSZlVGSlBVRk1zWEc0Z0lDQWdJQ0FnSUNBZ0lDQjJZV3gxWlRvZ2JtVjNRWFIwY2l3Z1lYUjBjazVoYldWY2JpQWdJQ0FnSUNBZ2ZTazdYRzRnSUNBZ2ZTazdYRzRnSUNBZ2NtVjBkWEp1SUhCaGRHTm9aWE03WEc1OVhHNWNibHh1Wm5WdVkzUnBiMjRnWkdsbVprTm9hV3hrY21WdUtHNWxkMDV2WkdVc0lHOXNaRTV2WkdVcElIdGNiaUFnSUNCeVpYUjFjbTRnV3k0dUxrRnljbUY1S0UxaGRHZ3ViV0Y0S0Z4dUlDQWdJQ0FnSUNCdVpYZE9iMlJsTG1Ob2FXeGtjbVZ1TG14bGJtZDBhQ3hjYmlBZ0lDQWdJQ0FnYjJ4a1RtOWtaUzVqYUdsc1pISmxiaTVzWlc1bmRHaGNiaUFnSUNBcEtTNXJaWGx6S0NsZExtMWhjQ2hwSUQwK0lHUnBabVlvYm1WM1RtOWtaUzVqYUdsc1pISmxibHRwWFN3Z2IyeGtUbTlrWlM1amFHbHNaSEpsYmx0cFhTa3BPMXh1ZlZ4dVhHNWNibVY0Y0c5eWRDQjdYRzRnSUNBZ1pHbG1abHh1ZlZ4dVhHNWNibHh1WEc0dkx5QlhSVUpRUVVOTElFWlBUMVJGVWlBdkwxeHVMeThnTGk5a2FXWm1MMmx1WkdWNExtcHpJaXdpWEc1amIyNXpkQ0JEYUdGdVoyVmtJRDBnZTF4dUlDQWdJRU5TUlVGVVJUb2dKME5TUlVGVVJTY3NYRzRnSUNBZ1VrVk5UMVpGT2lBblVrVk5UMVpGSnl4Y2JpQWdJQ0JTUlZCTVFVTkZPaUFuVWtWUVRFRkRSU2NzWEc0Z0lDQWdWVkJFUVZSRk9pQW5WVkJFUVZSRkp5eGNiaUFnSUNCVFJWUmZVRkpQVUZNNklDZFRSVlFnVUZKUFVGTW5MRnh1SUNBZ0lGSkZUVTlXUlY5UVVrOVFVem9nSjFKRlRVOVdSU0JRVWs5UVV5ZGNibjA3WEc1Y2JseHVaWGh3YjNKMElHUmxabUYxYkhRZ1EyaGhibWRsWkR0Y2JseHVYRzVjYmk4dklGZEZRbEJCUTBzZ1JrOVBWRVZTSUM4dlhHNHZMeUF1TDNSNWNHVnpMMk5vWVc1blpTNXFjeUlzSWx4dWFXMXdiM0owSUhzZ1EyaGhibWRsVkhsd1pTQjlJR1p5YjIwZ0p5NHVMM1I1Y0dWekp6dGNibWx0Y0c5eWRDQjdJR055WldGMFpVVnNaVzFsYm5RZ2ZTQm1jbTl0SUNjdUxpOWpjbVZoZEdVdmFXNWtaWGduTzF4dWFXMXdiM0owSUhzZ2MyVjBRWFIwY21saWRYUmxMQ0J5WlcxdmRtVkJkSFJ5YVdKMWRHVWdmU0JtY205dElGd2lMaTR2ZFhScGJITXZhVzVrWlhoY0lqdGNibHh1WEc1Y2JtWjFibU4wYVc5dUlIQmhkR05vS0hCaGNtVnVkQ3dnY0dGMFkyaGxjeXdnYVc1a1pYZzlNQ2tnZTF4dUlDQWdJR2xtSUNnaGNHRjBZMmhsY3lrZ2NtVjBkWEp1TzF4dUlDQWdJR052Ym5OMElHVnNJRDBnY0dGeVpXNTBMbU5vYVd4a1RtOWtaWE5iYVc1a1pYaGRPMXh1SUNBZ0lITjNhWFJqYUNBb2NHRjBZMmhsY3k1MGVYQmxLU0I3WEc0Z0lDQWdJQ0FnSUdOaGMyVWdRMmhoYm1kbFZIbHdaUzVEVWtWQlZFVTZJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHTnZibk4wSUhzZ2JtVjNUbTlrWlNCOUlEMGdjR0YwWTJobGN6dGNiaUFnSUNBZ0lDQWdJQ0FnSUdOdmJuTjBJRzVsZDBWc0lEMGdZM0psWVhSbFJXeGxiV1Z1ZENodVpYZE9iMlJsS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSEJoY21WdWRDNWhjSEJsYm1SRGFHbHNaQ2h1WlhkRmJDazdYRzRnSUNBZ0lDQWdJQ0FnSUNCaWNtVmhhenRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNCallYTmxJRU5vWVc1blpWUjVjR1V1VWtWTlQxWkZPaUI3WEc0Z0lDQWdJQ0FnSUNBZ0lDQndZWEpsYm5RdWNtVnRiM1psUTJocGJHUW9aV3dwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdZbkpsWVdzN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdZMkZ6WlNCRGFHRnVaMlZVZVhCbExsSkZVRXhCUTBVNklIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdOdmJuTjBJSHNnYm1WM1RtOWtaU0I5SUQwZ2NHRjBZMmhsY3p0Y2JpQWdJQ0FnSUNBZ0lDQWdJR052Ym5OMElHNWxkMFZzSUQwZ1kzSmxZWFJsUld4bGJXVnVkQ2h1WlhkT2IyUmxLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIQmhjbVZ1ZEM1eVpYQnNZV05sUTJocGJHUW9ibVYzUld3c0lHVnNLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHSnlaV0ZyTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lHTmhjMlVnUTJoaGJtZGxWSGx3WlM1VlVFUkJWRVU2SUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR052Ym5OMElIc2dZMmhwYkdSeVpXNHNJR0YwZEhKcFluVjBaWE1nZlNBOUlIQmhkR05vWlhNN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J3WVhSamFFRjBkSEpwWW5WMFpYTW9aV3dzSUdGMGRISnBZblYwWlhNcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnWTJocGJHUnlaVzR1Wm05eVJXRmphQ2dvWTJocGJHUXNJR2x1WkdWNEtTQTlQaUJ3WVhSamFDaGxiQ3dnWTJocGJHUXNJR2x1WkdWNEtTazdYRzRnSUNBZ0lDQWdJQ0FnSUNCaWNtVmhhenRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJSDFjYm4xY2JseHVablZ1WTNScGIyNGdjR0YwWTJoQmRIUnlhV0oxZEdWektHVnNaVzFsYm5Rc0lHRjBkSEpwWW5WMFpYTXBJSHRjYmlBZ0lDQmhkSFJ5YVdKMWRHVnpMbVp2Y2tWaFkyZ29jR0YwWTJnZ1BUNGdlMXh1SUNBZ0lDQWdJQ0JqYjI1emRDQjdJSFI1Y0dVc0lHRjBkSEpPWVcxbExDQjJZV3gxWlNCOUlEMGdjR0YwWTJnN1hHNGdJQ0FnSUNBZ0lHbG1JQ2gwZVhCbElEMDlQU0JEYUdGdVoyVlVlWEJsTGxORlZGOVFVazlRVXlsY2JpQWdJQ0FnSUNBZ0lDQWdJSE5sZEVGMGRISnBZblYwWlNobGJHVnRaVzUwTENCaGRIUnlUbUZ0WlN3Z2RtRnNkV1VwTzF4dUlDQWdJQ0FnSUNCbGJITmxJR2xtSUNoMGVYQmxJRDA5UFNCRGFHRnVaMlZVZVhCbExsSkZUVTlXUlY5UVVrOVFVeWxjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxiVzkyWlVGMGRISnBZblYwWlNobGJHVnRaVzUwTENCaGRIUnlUbUZ0WlN3Z2RtRnNkV1VwWEc0Z0lDQWdmU2xjYm4xY2JseHVYRzVsZUhCdmNuUWdlMXh1SUNBZ0lIQmhkR05vWEc1OVhHNWNibHh1WEc0dkx5QlhSVUpRUVVOTElFWlBUMVJGVWlBdkwxeHVMeThnTGk5d1lYUmphQzlwYm1SbGVDNXFjeUlzSWx4dWFXMXdiM0owSUhzZ1kzSmxZWFJsUld4bGJXVnVkQ0I5SUdaeWIyMGdKeTR2WTNKbFlYUmxKenRjYm1sdGNHOXlkQ0I3SUdScFptWWdmU0JtY205dElDY3VMMlJwWm1Zbk8xeHVhVzF3YjNKMElIc2djR0YwWTJnZ2ZTQm1jbTl0SUNjdUwzQmhkR05vSnp0Y2JtbHRjRzl5ZENCMWRHbHNjeUJtY205dElDY3VMM1YwYVd4ekp6dGNibHh1WEc1bGVIQnZjblFnZTF4dUlDQWdJR055WldGMFpVVnNaVzFsYm5Rc1hHNGdJQ0FnWkdsbVppeGNiaUFnSUNCd1lYUmphQ3hjYmlBZ0lDQjFkR2xzYzF4dWZWeHVYRzVjYmx4dUx5OGdWMFZDVUVGRFN5QkdUMDlVUlZJZ0x5OWNiaTh2SUM0dmFXNWtaWGd1YW5NaVhTd2ljMjkxY21ObFVtOXZkQ0k2SWlKOVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19tby1kb21AMC4wLjFAbW8tZG9tL2Rpc3QvaW5kZXguYnVpbGQuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG5pbXBvcnQgT2JzZXJ2ZXIgZnJvbSAnLi9vYmplY3QnO1xuaW1wb3J0IE9ic2VydmVyQXJyYXkgZnJvbSAnLi9hcnJheSc7XG5cblxuXG5leHBvcnQge1xuICAgIE9ic2VydmVyLFxuICAgIE9ic2VydmVyQXJyYXlcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmUvb2JzZXJ2ZXIvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9