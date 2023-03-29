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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 103);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var core = __webpack_require__(4);
var hide = __webpack_require__(16);
var redefine = __webpack_require__(11);
var ctx = __webpack_require__(20);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(44)('wks');
var uid = __webpack_require__(29);
var Symbol = __webpack_require__(5).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 5 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(1)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(13);
var IE8_DOM_DEFINE = __webpack_require__(65);
var toPrimitive = __webpack_require__(25);
var dP = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(22);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(18);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var fails = __webpack_require__(1);
var defined = __webpack_require__(18);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var hide = __webpack_require__(16);
var has = __webpack_require__(17);
var SRC = __webpack_require__(29)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(4).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(1);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(31);
var defined = __webpack_require__(18);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(0);
var core = __webpack_require__(4);
var fails = __webpack_require__(1);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var createDesc = __webpack_require__(28);
module.exports = __webpack_require__(6) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(3)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(16)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(30);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(20);
var IObject = __webpack_require__(31);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(8);
var asc = __webpack_require__(59);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

///////////////////////////////////////////////////////////////////////////////
//
// Licensed under the Apache License, Version 2.0  ( the  "License" );  you may 
// not use this file except in compliance with the License.  You may  obtain  a 
// copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required  by  applicable  law  or  agreed  to  in  writing,  software 
// distributed under the License is distributed on an "AS  IS"  BASIS,  WITHOUT
// WARRANTIES OR CONDITIONS  OF  ANY  KIND, either express or implied.  See the 
// License for the specific  language  governing  permissions  and  limitations 
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const Generator = __webpack_require__(241);
const Constant = __webpack_require__(242);
const Iterator = __webpack_require__(243);
//-----------------------------------------------------------------------------
//  Implementation of EnumerableConstructor interface
//-----------------------------------------------------------------------------
/**
* Converts any Iterable<T> object into LINQ-able object
* @param TSource An Array, Map, Set, String or other Iterable object.
*/
function getEnumerable(TSource) {
    return new EnumerableImpl(TSource);
}
exports.default = getEnumerable;
exports.AsEnumerable = getEnumerable;
exports.asEnumerable = getEnumerable;
exports.From = getEnumerable;
exports.from = getEnumerable;
/**
* Generates <count> of <T> elements starting with <start>. T is any
* type which could be cast to number: number, enum, etc.
* @param start First value in sequence.
* @param count Number of elements to iteratel.
* @example
*     var sum = Range(0, 7).Sum();
*/
function getRange(start, count) {
    return new EnumerableImpl(undefined, Generator.Range, [start, count]);
}
exports.range = getRange;
exports.Range = getRange;
/**
* Repeat element <start> of type T <count> of times.
* @param start First value in sequence.
* @param count Number of elements to iteratel.
* @example
*     var sum = Repeat("v", 7);
*/
function getRepeat(value, count) {
    return new EnumerableImpl(undefined, Generator.Repeat, [value, count]);
}
exports.repeat = getRepeat;
exports.Repeat = getRepeat;
//-----------------------------------------------------------------------------
//  Enumerable Implementation
//-----------------------------------------------------------------------------
class EnumerableImpl {
    constructor(target, factory, arg) {
        this._target = target;
        this._factory = factory;
        this._factoryArg = arg;
        // JavaScript naming convention
        this['aggregate'] = this.Aggregate;
        this['all'] = this.All;
        this['any'] = this.Any;
        this['average'] = this.Average;
        this['chunkBy'] = this.ChunkBy;
        this['contains'] = this.Contains;
        this['count'] = this.Count;
        this['max'] = this.Max;
        this['min'] = this.Min;
        this['elementAt'] = this.ElementAt;
        this['elementAtOrDefault'] = this.ElementAtOrDefault;
        this['first'] = this.First;
        this['firstOrDefault'] = this.FirstOrDefault;
        this['last'] = this.Last;
        this['lastOrDefault'] = this.LastOrDefault;
        this['sequenceEqual'] = this.SequenceEqual;
        this['single'] = this.Single;
        this['singleOrDefault'] = this.SingleOrDefault;
        this['sum'] = this.Sum;
        this['toArray'] = this.ToArray;
        this['toMap'] = this.ToMap;
        this['toDictionary'] = this.ToDictionary;
        this['defaultIfEmpty'] = this.DefaultIfEmpty;
        this['concat'] = this.Concat;
        this['distinct'] = this.Distinct;
        this['except'] = this.Except;
        this['groupBy'] = this.GroupBy;
        this['groupJoin'] = this.GroupJoin;
        this['intersect'] = this.Intersect;
        this['join'] = this.Join;
        this['ofType'] = this.OfType;
        this['orderBy'] = this.OrderBy;
        this['orderByDescend'] = this.OrderByDescending;
        this['range'] = this.Range;
        this['repeat'] = this.Repeat;
        this['reverse'] = this.Reverse;
        this['select'] = this.Select;
        this['selectMany'] = this.SelectMany;
        this['skip'] = this.Skip;
        this['skipWhile'] = this.SkipWhile;
        this['take'] = this.Take;
        this['takeWhile'] = this.TakeWhile;
        this['union'] = this.Union;
        this['where'] = this.Where;
        this['zip'] = this.Zip;
    }
    ///////////////////////////////////////////////////////////////////////////
    /** Returns JavaScript iterator */
    [Symbol.iterator]() {
        return (null != this._factory) ? this._factory.apply(this, this._factoryArg)
            : this._target[Symbol.iterator]();
    }
    /** Returns C# style enumerator */
    GetEnumerator() {
        return new Iterator.CSharpEnumerator(this[Symbol.iterator]());
    }
    Aggregate(alpha, beta = Constant.selfFn, gamma = Constant.selfFn) {
        let zero;
        let method;
        let selector;
        if (Constant.CONST_FUNCTION === typeof alpha) {
            method = alpha;
            selector = beta;
        }
        else {
            zero = alpha;
            method = beta;
            selector = gamma;
        }
        let result = zero;
        for (let value of this) {
            if (!result)
                result = Constant.getDefaultVal(typeof (value));
            result = method(result, value);
        }
        return selector(result);
    }
    All(predicate = Constant.trueFn) {
        for (let value of this) {
            if (!predicate(value)) {
                return false;
            }
        }
        return true;
    }
    Any(predicate) {
        let iterator;
        // Check if at least one exist
        if (!predicate && (iterator = this[Symbol.iterator]())) {
            return !iterator.next().done;
        }
        // Check if any satisfy the criteria
        for (let value of this) {
            if (predicate(value)) {
                return true;
            }
        }
        return false;
    }
    Average(func = Constant.selfFn) {
        let sum = 0, count = 0;
        for (let value of this) {
            sum += func(value);
            count++;
        }
        return sum / count;
    }
    Contains(value, equal = (a, b) => a === b) {
        for (let item of this) {
            if (equal(item, value)) {
                return true;
            }
        }
        return false;
    }
    Count(predicate) {
        let count = 0;
        if (predicate) {
            for (let value of this) {
                if (predicate(value)) {
                    count++;
                }
            }
        }
        else if (this._target && this._target[Constant.CONST_LENGTH]) {
            count = this._target[Constant.CONST_LENGTH];
        }
        else {
            for (let value of this) {
                count++;
            }
        }
        return count;
    }
    Max(transform = Constant.selfFn) {
        let value, max, hasValue = false;
        for (let item of this) {
            value = transform(item);
            if (hasValue) {
                if (max < value)
                    max = value;
            }
            else {
                max = value;
                hasValue = true;
            }
        }
        if (!hasValue)
            throw Constant.CONST_NO_ELEMENTS;
        return max;
    }
    Min(transform = Constant.selfFn) {
        let value, min, hasValue = false;
        for (let item of this) {
            value = transform(item);
            if (hasValue) {
                if (min > value)
                    min = value;
            }
            else {
                min = value;
                hasValue = true;
            }
        }
        if (!hasValue)
            throw Constant.CONST_NO_ELEMENTS;
        return min;
    }
    ElementAt(index) {
        if (Array.isArray(this._target)) {
            if (0 > index ||
                this._target[Constant.CONST_LENGTH] <= index) {
                throw Constant.CONST_OUTOFRANGE;
            }
            return this._target[index];
        }
        let count = 0;
        for (let value of this) {
            if (index > count++) {
                continue;
            }
            return value;
        }
        throw Constant.CONST_OUTOFRANGE;
    }
    ElementAtOrDefault(index) {
        if (Array.isArray(this._target)) {
            let length = this._target[Constant.CONST_LENGTH];
            if (0 > index || length <= index) {
                let value = this._target[0];
                return 0 < length
                    ? Constant.getDefaultVal(typeof (value), value)
                    : undefined;
            }
            return this._target[index];
        }
        let value, count = 0;
        for (let item of this) {
            if (index === count++) {
                return item;
            }
            value = item;
        }
        return Constant.getDefaultVal(typeof value, value); // Last good value
    }
    First(predicate = Constant.trueFn) {
        for (let value of this) {
            if (predicate(value)) {
                return value;
            }
        }
        throw Constant.CONST_NOTHING_FOUND;
    }
    FirstOrDefault(predicate = Constant.trueFn) {
        let value;
        for (let item of this) {
            value = item;
            if (predicate(item)) {
                return item;
            }
        }
        return Constant.getDefaultVal(typeof value); // Last good value
    }
    Last(predicate = Constant.trueFn) {
        let value, found = false;
        for (let item of this) {
            if (predicate(item)) {
                value = item;
                found = true;
            }
        }
        if (!found) {
            throw Constant.CONST_NOTHING_FOUND;
        }
        return value;
    }
    LastOrDefault(predicate = Constant.trueFn) {
        let value, lastKnown, found = false;
        for (let item of this) {
            if (predicate(item)) {
                value = item;
                found = true;
            }
            lastKnown = item;
        }
        return (found) ? value : Constant.getDefaultVal(typeof lastKnown);
    }
    SequenceEqual(other, equal = (a, b) => a === b) {
        let res1, res2;
        let it1 = this[Symbol.iterator]();
        let it2 = other[Symbol.iterator]();
        while (true) {
            res1 = it1.next();
            res2 = it2.next();
            if (res1.done && res2.done)
                return true;
            if ((res1.done != res2.done) || !equal(res1.value, res2.value)) {
                return false;
            }
        }
        ;
    }
    Single(predicate = Constant.trueFn) {
        let value, hasValue = false;
        for (let item of this) {
            if (predicate(item)) {
                if (!hasValue) {
                    value = item;
                    hasValue = true;
                }
                else {
                    throw Constant.CONST_TOO_MANY;
                }
            }
        }
        if (hasValue)
            return value;
        throw Constant.CONST_NOTHING_FOUND;
    }
    SingleOrDefault(predicate = Constant.trueFn) {
        let value, lastKnown, hasValue = false;
        for (let item of this) {
            if (predicate(item)) {
                if (!hasValue) {
                    value = item;
                    hasValue = true;
                }
                else {
                    throw Constant.CONST_TOO_MANY;
                }
            }
            lastKnown = item;
        }
        return (hasValue) ? value : Constant.getDefaultVal(typeof lastKnown);
    }
    Sum(transform = Constant.selfFn) {
        let sum = 0;
        for (let value of this) {
            sum += transform(value);
        }
        return sum;
    }
    ToArray() {
        let array = [];
        for (let value of this) {
            array.push(value);
        }
        return array;
    }
    ToMap(keySelector, elementSelector = Constant.selfFn) {
        let dictionary = new Map();
        for (let value of this) {
            dictionary.set(keySelector(value), elementSelector(value));
        }
        return dictionary;
    }
    ToDictionary(keySelector, elementSelector = Constant.selfFn) {
        let dictionary = new Map();
        for (let value of this) {
            dictionary.set(keySelector(value), elementSelector(value));
        }
        return dictionary;
    }
    Cast() {
        // TODO: Remove any once TypeScript 2.0 out
        return this;
    }
    //-------------------------------------------------------------------------
    //  Deferred execution methods
    //-------------------------------------------------------------------------
    DefaultIfEmpty(defaultValue = undefined) {
        return new EnumerableImpl(undefined, Generator.DefaultIfEmpty, [this, defaultValue]);
    }
    Concat(second) {
        return new EnumerableImpl(undefined, Generator.Concat, [this, second]);
    }
    ChunkBy(keySelect, elementSelector = Constant.selfFn, resultSelector = (a, b) => b) {
        return new EnumerableImpl(undefined, Generator.ChunkBy, [this, keySelect, elementSelector, resultSelector]);
    }
    Distinct(keySelector) {
        if (keySelector)
            return new EnumerableImpl(undefined, Generator.Distinct, [this, keySelector]);
        return new EnumerableImpl(undefined, Generator.DistinctFast, [this]);
    }
    Except(other, keySelector) {
        return new EnumerableImpl(undefined, Generator.Intersect, [this, Constant.getKeys(other, keySelector), true, keySelector]);
    }
    GroupBy(selKey, selElement = Constant.selfFn, selResult = Constant.defGrouping) {
        let map = Constant.getKeyedMap(this, selKey, selElement);
        return new EnumerableImpl(undefined, Generator.GroupBy, [map, selResult]);
    }
    GroupJoin(inner, oKeySelect, iKeySelect, resultSelector = Constant.defGrouping) {
        return new EnumerableImpl(undefined, Generator.GroupJoin, [this, oKeySelect, resultSelector,
            Constant.getKeyedMapFast(inner, iKeySelect)]);
    }
    Intersect(other, keySelector) {
        return new EnumerableImpl(undefined, Generator.Intersect, [this,
            Constant.getKeys(other, keySelector),
            false, keySelector]);
    }
    Join(inner, oSelector, iSelector, transform) {
        return new EnumerableImpl(undefined, Generator.Join, [this, oSelector, transform, Constant.getKeyedMapFast(inner, iSelector)]);
    }
    OfType(obj) {
        let typeName;
        switch (obj) {
            case Number:
                typeName = Constant.CONST_NUMBER;
                break;
            case Boolean:
                typeName = Constant.CONST_BOOLEAN;
                break;
            case String:
                typeName = Constant.CONST_STRING;
                break;
            case Symbol:
                typeName = Constant.CONST_SYMBOL;
                break;
            default:
                typeName = undefined;
        }
        return new EnumerableImpl(undefined, Generator.OfType, [this, obj, typeName]);
    }
    OrderBy(keySelect, equal) {
        return new OrderedLinq(this, (array) => Generator.Forward(array), keySelect, equal);
    }
    OrderByDescending(keySelect, equal) {
        return new OrderedLinq(this, (array) => Generator.Reverse(array), keySelect, equal, true);
    }
    Range(start, count) {
        return new EnumerableImpl(undefined, Generator.Range, [start, count]);
    }
    Repeat(element, count) {
        return new EnumerableImpl(undefined, Generator.Repeat, [element, count]);
    }
    Reverse() {
        let array = Array.isArray(this._target)
            ? this._target : this.ToArray();
        return new EnumerableImpl(undefined, Generator.Reverse, [array]);
    }
    Select(transform) {
        return new EnumerableImpl(undefined, Generator.Select, [this, transform]);
    }
    SelectMany(selector = Constant.selfFn, result = (x, s) => s) {
        return new EnumerableImpl(undefined, Generator.SelectMany, [this, selector, result]);
    }
    Skip(skip) {
        return new EnumerableImpl(undefined, Generator.Skip, [this, skip]);
    }
    SkipWhile(predicate) {
        return new EnumerableImpl(undefined, Generator.SkipWhile, [this, predicate]);
    }
    Take(take) {
        return new EnumerableImpl(undefined, Generator.TakeWhile, [this, (a, n) => take > n]);
    }
    TakeWhile(predicate) {
        return new EnumerableImpl(undefined, Generator.TakeWhile, [this, predicate]);
    }
    Union(second, keySelector) {
        if (keySelector)
            return new EnumerableImpl(undefined, Generator.Union, [this, second, keySelector]);
        return new EnumerableImpl(undefined, Generator.UnionFast, [this, second]);
    }
    Where(predicate = Constant.trueFn) {
        return new EnumerableImpl(undefined, Generator.Where, [this, predicate]);
    }
    Zip(second, func) {
        return new EnumerableImpl(undefined, Generator.Zip, [this, second, func]);
    }
}
class OrderedLinq extends EnumerableImpl {
    constructor(target, factory, keySelect, equal, reversed = false) {
        super(target, factory);
        this.reversed = reversed;
        if (keySelect) {
            this.comparer = equal ? (a, b) => equal(keySelect(a), keySelect(b))
                : (a, b) => Constant.defCompare(keySelect(a), keySelect(b));
        }
        else {
            this.comparer = equal;
        }
        this['thenBy'] = this.ThenBy;
        this['thenByDescending'] = this.ThenByDescending;
    }
    [Symbol.iterator]() {
        if (!this._factoryArg) {
            this._factoryArg = this._target.ToArray();
            if (this.comparer) {
                this._factoryArg.sort(this.comparer);
            }
            else {
                this._factoryArg.sort();
            }
        }
        return this._factory(this._factoryArg);
    }
    ThenBy(keySelect, equal) {
        if (!keySelect && !equal)
            return this;
        var compare = keySelect ? equal ? (a, b) => equal(keySelect(a), keySelect(b))
            : (a, b) => Constant.defCompare(keySelect(a), keySelect(b))
            : equal;
        if (!this.comparer) {
            this.comparer = compare;
        }
        else {
            let superEqual = this.comparer;
            this.comparer = (a, b) => {
                let result = superEqual(a, b);
                return (0 != result) ? result : this.reversed ? -compare(a, b) : compare(a, b);
            };
        }
        return this;
    }
    ThenByDescending(keySelect, equal) {
        if (!keySelect && !equal)
            return this;
        var compare = keySelect ? equal ? (a, b) => equal(keySelect(a), keySelect(b))
            : (a, b) => Constant.defCompare(keySelect(a), keySelect(b))
            : equal;
        if (!this.comparer) {
            this.comparer = compare;
        }
        else {
            let superEqual = this.comparer;
            this.comparer = (a, b) => {
                let result = superEqual(a, b);
                return (0 != result) ? result : this.reversed ? compare(a, b) : -compare(a, b);
            };
        }
        return this;
    }
}
/** Copyright (c) ENikS.  All rights reserved. */
//# sourceMappingURL=linq.js.map

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(2);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(29)('meta');
var isObject = __webpack_require__(2);
var has = __webpack_require__(17);
var setDesc = __webpack_require__(7).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(1)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(68);
var enumBugKeys = __webpack_require__(48);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(21);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(22);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(13);
var dPs = __webpack_require__(69);
var enumBugKeys = __webpack_require__(48);
var IE_PROTO = __webpack_require__(47)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(66)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(70).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(7).f;
var has = __webpack_require__(17);
var TAG = __webpack_require__(3)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 36 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(21);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(68);
var hiddenKeys = __webpack_require__(48).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(36);
var createDesc = __webpack_require__(28);
var toIObject = __webpack_require__(14);
var toPrimitive = __webpack_require__(25);
var has = __webpack_require__(17);
var IE8_DOM_DEFINE = __webpack_require__(65);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(72);
var test = {};
test[__webpack_require__(3)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(11)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var defined = __webpack_require__(18);
var fails = __webpack_require__(1);
var spaces = __webpack_require__(51);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(80)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(55)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__(16);
var redefine = __webpack_require__(11);
var fails = __webpack_require__(1);
var defined = __webpack_require__(18);
var wks = __webpack_require__(3);

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(14);
var toLength = __webpack_require__(8);
var toAbsoluteIndex = __webpack_require__(32);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(44)('keys');
var uid = __webpack_require__(29);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 48 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 49 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(17);
var toObject = __webpack_require__(9);
var IE_PROTO = __webpack_require__(47)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2);
var setPrototypeOf = __webpack_require__(73).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),
/* 53 */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),
/* 54 */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(45);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(11);
var hide = __webpack_require__(16);
var Iterators = __webpack_require__(34);
var $iterCreate = __webpack_require__(173);
var setToStringTag = __webpack_require__(35);
var getPrototypeOf = __webpack_require__(50);
var ITERATOR = __webpack_require__(3)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(57);
var defined = __webpack_require__(18);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(2);
var cof = __webpack_require__(21);
var MATCH = __webpack_require__(3)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(3)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(208);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(5);
var dP = __webpack_require__(7);
var DESCRIPTORS = __webpack_require__(6);
var SPECIES = __webpack_require__(3)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(13);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DraftResult; });
var DraftResult = /** @class */ (function () {
    function DraftResult(pickNumber, player, teamDefinition, price) {
        if (price === void 0) { price = 0; }
        this.pickNumber = pickNumber;
        this.player = player;
        this.teamDefinition = teamDefinition;
        this.price = price;
    }
    return DraftResult;
}());

//# sourceMappingURL=draft.result.js.map

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(5);
var has = __webpack_require__(17);
var DESCRIPTORS = __webpack_require__(6);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(11);
var META = __webpack_require__(26).KEY;
var $fails = __webpack_require__(1);
var shared = __webpack_require__(44);
var setToStringTag = __webpack_require__(35);
var uid = __webpack_require__(29);
var wks = __webpack_require__(3);
var wksExt = __webpack_require__(67);
var wksDefine = __webpack_require__(106);
var enumKeys = __webpack_require__(107);
var isArray = __webpack_require__(37);
var anObject = __webpack_require__(13);
var isObject = __webpack_require__(2);
var toIObject = __webpack_require__(14);
var toPrimitive = __webpack_require__(25);
var createDesc = __webpack_require__(28);
var _create = __webpack_require__(33);
var gOPNExt = __webpack_require__(71);
var $GOPD = __webpack_require__(39);
var $DP = __webpack_require__(7);
var $keys = __webpack_require__(27);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(38).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(36).f = $propertyIsEnumerable;
  __webpack_require__(49).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(45)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(16)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(1)(function () {
  return Object.defineProperty(__webpack_require__(66)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2);
var document = __webpack_require__(5).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(3);


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(17);
var toIObject = __webpack_require__(14);
var arrayIndexOf = __webpack_require__(46)(false);
var IE_PROTO = __webpack_require__(47)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var anObject = __webpack_require__(13);
var getKeys = __webpack_require__(27);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(5).document;
module.exports = document && document.documentElement;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(14);
var gOPN = __webpack_require__(38).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(21);
var TAG = __webpack_require__(3)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(2);
var anObject = __webpack_require__(13);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(20)(Function.call, __webpack_require__(39).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(5).parseInt;
var $trim = __webpack_require__(41).trim;
var ws = __webpack_require__(51);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(5).parseFloat;
var $trim = __webpack_require__(41).trim;

module.exports = 1 / $parseFloat(__webpack_require__(51) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(21);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(22);
var defined = __webpack_require__(18);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(2);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),
/* 79 */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(22);
var defined = __webpack_require__(18);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(43)('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(43)('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(43)('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(43)('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = __webpack_require__(57);
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(13);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(34);
var ITERATOR = __webpack_require__(3)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(7);
var createDesc = __webpack_require__(28);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(72);
var ITERATOR = __webpack_require__(3)('iterator');
var Iterators = __webpack_require__(34);
module.exports = __webpack_require__(4).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(3)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(30);
var toObject = __webpack_require__(9);
var IObject = __webpack_require__(31);
var toLength = __webpack_require__(8);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(19);
var step = __webpack_require__(92);
var Iterators = __webpack_require__(34);
var toIObject = __webpack_require__(14);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(55)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 92 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(6) && /./g.flags != 'g') __webpack_require__(7).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(61)
});


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(91);
var getKeys = __webpack_require__(27);
var redefine = __webpack_require__(11);
var global = __webpack_require__(5);
var hide = __webpack_require__(16);
var Iterators = __webpack_require__(34);
var wks = __webpack_require__(3);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(7).f;
var create = __webpack_require__(33);
var redefineAll = __webpack_require__(96);
var ctx = __webpack_require__(20);
var anInstance = __webpack_require__(97);
var forOf = __webpack_require__(98);
var $iterDefine = __webpack_require__(55);
var step = __webpack_require__(92);
var setSpecies = __webpack_require__(60);
var DESCRIPTORS = __webpack_require__(6);
var fastKey = __webpack_require__(26).fastKey;
var validate = __webpack_require__(62);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(11);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 97 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(20);
var call = __webpack_require__(85);
var isArrayIter = __webpack_require__(86);
var anObject = __webpack_require__(13);
var toLength = __webpack_require__(8);
var getIterFn = __webpack_require__(88);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(5);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(11);
var redefineAll = __webpack_require__(96);
var meta = __webpack_require__(26);
var forOf = __webpack_require__(98);
var anInstance = __webpack_require__(97);
var isObject = __webpack_require__(2);
var fails = __webpack_require__(1);
var $iterDetect = __webpack_require__(89);
var setToStringTag = __webpack_require__(35);
var inheritIfRequired = __webpack_require__(52);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = __webpack_require__(37);
var isObject = __webpack_require__(2);
var toLength = __webpack_require__(8);
var ctx = __webpack_require__(20);
var IS_CONCAT_SPREADABLE = __webpack_require__(3)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;


/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return H2HResultMatchupCalculator; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__h2hresult_matchup__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_linq_es2015__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_linq_es2015___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_linq_es2015__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__categories__ = __webpack_require__(245);



var H2HResultMatchupCalculator = /** @class */ (function () {
    function H2HResultMatchupCalculator() {
    }
    H2HResultMatchupCalculator.prototype.GetOpponentId = function (week, teamId, leagueSize) {
        var interval = leagueSize - 1;
        var weekInterval = week % interval;
        if (teamId == leagueSize) {
            return ((weekInterval % 2) == 1) ?
                leagueSize / 2 + (weekInterval + 1) / 2 :
                (weekInterval + 2) / 2;
        }
        var opponentId = (2 + weekInterval) % (interval) - teamId;
        while (opponentId <= 0) {
            opponentId += interval;
        }
        if (opponentId == teamId) {
            return +leagueSize;
        }
        return opponentId;
    };
    H2HResultMatchupCalculator.prototype.GetMatchupWeek = function (week, leagueSize, draft) {
        var taken = new Array();
        var matchups = new Array();
        for (var i = 1; i <= leagueSize; i++) {
            if (taken.includes(i))
                continue;
            var opponent = this.GetOpponentId(week, i, leagueSize);
            taken.push(opponent);
            taken.push(i);
            var team1stats = new Object();
            var team2stats = new Object();
            draft.categories.forEach(function (element) {
                team1stats[element.name] = 0;
                team2stats[element.name] = 0;
            });
            var matchup = new __WEBPACK_IMPORTED_MODULE_0__h2hresult_matchup__["a" /* H2hResultMatchup */](team1stats, team2stats, i, opponent, week, 0, 0);
            matchups.push(matchup);
        }
        return matchups;
    };
    H2HResultMatchupCalculator.prototype.UpdateMatchupProduction = function (weeklyMatchup, weeklyProduction, categories, projectedPick) {
        var weeklyProductionFiltered = __WEBPACK_IMPORTED_MODULE_1_linq_es2015__["asEnumerable"](weeklyProduction)
            .Where(function (p) { return +p.teamDefinition.id == +weeklyMatchup.team1; });
        weeklyMatchup.team1score = 0;
        weeklyMatchup.team2score = 0;
        weeklyMatchup.team1RatioElements = new Object();
        weeklyMatchup.team2RatioElements = new Object();
        if (weeklyProductionFiltered.Any()) {
            var _loop_1 = function (key) {
                //console.log(key);
                translatedKey = __WEBPACK_IMPORTED_MODULE_1_linq_es2015__["asEnumerable"](__WEBPACK_IMPORTED_MODULE_2__categories__["a" /* Categories */].list).FirstOrDefault(function (c) { return c.name == key; }).property;
                if (weeklyProductionFiltered.First().player.statistics[translatedKey]) {
                    weeklyMatchup.teamStats1[key] = weeklyProductionFiltered.First().player.statistics[translatedKey];
                }
            };
            var translatedKey;
            for (var key in weeklyMatchup.teamStats1) {
                _loop_1(key);
            }
            weeklyMatchup.team1RatioElements["FG"] = weeklyProductionFiltered.First().player.statistics["FGM"] ||
                (weeklyProductionFiltered.First().player.statistics["FGA"] * weeklyProductionFiltered.First().player.statistics["FG"]);
            weeklyMatchup.team1RatioElements["FGA"] = weeklyProductionFiltered.First().player.statistics["FGA"];
            weeklyMatchup.team1RatioElements["FT"] = weeklyProductionFiltered.First().player.statistics["FTM"] ||
                (weeklyProductionFiltered.First().player.statistics["FTA"] * weeklyProductionFiltered.First().player.statistics["FT"]);
            weeklyMatchup.team1RatioElements["FTA"] = weeklyProductionFiltered.First().player.statistics["FTA"];
            weeklyMatchup.team1RatioElements["AST"] = weeklyProductionFiltered.First().player.statistics["AST"] ||
                (weeklyProductionFiltered.First().player.statistics["TO"] * weeklyProductionFiltered.First().player.statistics["ATO"]);
            weeklyMatchup.team1RatioElements["TO"] = weeklyProductionFiltered.First().player.statistics["TO"];
        }
        weeklyProductionFiltered = __WEBPACK_IMPORTED_MODULE_1_linq_es2015__["asEnumerable"](weeklyProduction)
            .Where(function (p) { return +p.teamDefinition.id == weeklyMatchup.team2; });
        var _loop_2 = function (key) {
            //console.log(key);
            translatedKey = __WEBPACK_IMPORTED_MODULE_1_linq_es2015__["asEnumerable"](__WEBPACK_IMPORTED_MODULE_2__categories__["a" /* Categories */].list).FirstOrDefault(function (c) { return c.name == key; }).property;
            if (weeklyProductionFiltered.Any() && weeklyProductionFiltered.First().player.statistics[translatedKey]) {
                weeklyMatchup.teamStats2[key] = weeklyProductionFiltered.First().player.statistics[translatedKey];
            }
        };
        var translatedKey;
        for (var key in weeklyMatchup.teamStats2) {
            _loop_2(key);
        }
        // if( weeklyMatchup.team1score > 4 && weeklyMatchup.team1score < 7 || weeklyMatchup.team1score > 4 && weeklyMatchup.team1score < 7){
        //     // debug
        //     console.log(weeklyMatchup.team1score);
        //     console.log(weeklyMatchup.team2score);
        // }
        if (weeklyProductionFiltered.Any()) {
            weeklyMatchup.team2RatioElements["FG"] = weeklyProductionFiltered.First().player.statistics["FGM"] ||
                (weeklyProductionFiltered.First().player.statistics["FGA"] * weeklyProductionFiltered.First().player.statistics["FG"]);
            weeklyMatchup.team2RatioElements["FGA"] = weeklyProductionFiltered.First().player.statistics["FGA"];
            weeklyMatchup.team2RatioElements["FT"] = weeklyProductionFiltered.First().player.statistics["FTM"] ||
                (weeklyProductionFiltered.First().player.statistics["FTA"] * weeklyProductionFiltered.First().player.statistics["FT"]);
            weeklyMatchup.team2RatioElements["FTA"] = weeklyProductionFiltered.First().player.statistics["FTA"];
            weeklyMatchup.team2RatioElements["AST"] = weeklyProductionFiltered.First().player.statistics["AST"] ||
                (weeklyProductionFiltered.First().player.statistics["TO"] * weeklyProductionFiltered.First().player.statistics["ATO"]);
            weeklyMatchup.team2RatioElements["TO"] = weeklyProductionFiltered.First().player.statistics["TO"];
            weeklyMatchup.team2RatioElements["C3PM"] = weeklyProductionFiltered.First().player.statistics["C3PM"];
            weeklyMatchup.team2RatioElements["C3PA"] = weeklyProductionFiltered.First().player.statistics["C3PMA"];
            weeklyMatchup.team2RatioElements["STL"] = weeklyProductionFiltered.First().player.statistics["STL"];
            weeklyMatchup.team2RatioElements["C2PM"] = weeklyProductionFiltered.First().player.statistics["C2PM"];
            weeklyMatchup.team2RatioElements["C2PA"] = weeklyProductionFiltered.First().player.statistics["C2PMA"];
        }
        weeklyMatchup = this.SetRatios(weeklyMatchup);
        var _loop_3 = function (key) {
            cat = categories.filter(function (c) { return c.name == key; })[0];
            if (weeklyMatchup.teamStats2[key] == weeklyMatchup.teamStats1[key]) {
                if (projectedPick) {
                    weeklyMatchup.team1score = weeklyMatchup.team1score + 0.5;
                    weeklyMatchup.team2score = weeklyMatchup.team2score + 0.5;
                }
            }
            else if (((weeklyMatchup.teamStats2[key] < weeklyMatchup.teamStats1[key]) && cat.negative == false)
                || ((weeklyMatchup.teamStats2[key] > weeklyMatchup.teamStats1[key]) && cat.negative == true)) {
                weeklyMatchup.team1score++;
            }
            else {
                weeklyMatchup.team2score++;
            }
        };
        var cat;
        for (var key in weeklyMatchup.teamStats2) {
            _loop_3(key);
        }
        return weeklyMatchup;
    };
    H2HResultMatchupCalculator.prototype.SetRatios = function (matchup) {
        if (matchup.teamStats1["FG%"]) {
            matchup.teamStats1["FG%"] = !matchup.team1RatioElements.FGA ? 0 : matchup.team1RatioElements.FG / matchup.team1RatioElements.FGA;
        }
        if (matchup.teamStats1["FT%"]) {
            matchup.teamStats1["FT%"] = !matchup.team1RatioElements.FTA ? 0 : matchup.team1RatioElements.FT / matchup.team1RatioElements.FTA;
        }
        // matchup.teamStats1.ATO = !matchup.team1RatioElements.TO ? 0 : matchup.team1RatioElements.AST / matchup.team1RatioElements.TO;
        // matchup.teamStats1.AFG_ = !matchup.team1RatioElements.FGA || !matchup.team1RatioElements.C3PM ? 0 : (matchup.team1RatioElements.FG + 0.5 * matchup.team1RatioElements.C3PM) / matchup.team1RatioElements.FGA;
        // matchup.teamStats1.C3PA_FGA = !matchup.team1RatioElements.FGA || !matchup.team1RatioElements.C3PA ? 0 : matchup.team1RatioElements.C3PA / matchup.team1RatioElements.FGA;
        // matchup.teamStats1.C3P_ = !matchup.team1RatioElements.C3PA || !matchup.team1RatioElements.C3PM ? 0 : matchup.team1RatioElements.C3PM / matchup.team1RatioElements.C3PA;
        // matchup.teamStats1.C2P_ = !matchup.team1RatioElements.C2PA || !matchup.team1RatioElements.C2PM ? 0 : matchup.team1RatioElements.C2PM / matchup.team1RatioElements.C2PA;
        // matchup.teamStats1.S_TO = !matchup.team1RatioElements.TO ? 0 : matchup.team1RatioElements.STL / matchup.team1RatioElements.TO;
        if (matchup.teamStats2["FG%"]) {
            matchup.teamStats2["FG%"] = !matchup.team2RatioElements.FGA ? 0 : matchup.team2RatioElements.FG / matchup.team2RatioElements.FGA;
        }
        if (matchup.teamStats2["FT%"]) {
            matchup.teamStats2["FT%"] = !matchup.team2RatioElements.FTA ? 0 : matchup.team2RatioElements.FT / matchup.team2RatioElements.FTA;
        }
        // matchup.teamStats2.FG_ = !matchup.team2RatioElements.FGA ? 0 : matchup.team2RatioElements.FG / matchup.team2RatioElements.FGA;
        // matchup.teamStats2.AFG_ = !matchup.team2RatioElements.FGA || !matchup.team2RatioElements.C3PM ? 0 : (matchup.team2RatioElements.FG + 0.5 * matchup.team2RatioElements.C3PM) / matchup.team2RatioElements.FGA;
        // matchup.teamStats2.C3PA_FGA = !matchup.team2RatioElements.FGA || !matchup.team2RatioElements.C3PA ? 0 : matchup.team2RatioElements.C3PA / matchup.team2RatioElements.FGA;
        // matchup.teamStats2.C3P_ = !matchup.team2RatioElements.C3PA || !matchup.team2RatioElements.C3PM ? 0 : matchup.team2RatioElements.C3PM / matchup.team2RatioElements.C3PA;
        // matchup.teamStats2.FT_ = !matchup.team2RatioElements.FTA || !matchup.team2RatioElements.FTM ? 0 : matchup.team2RatioElements.FTM / matchup.team2RatioElements.FTA;
        // matchup.teamStats2.C2P_ = !matchup.team2RatioElements.C2PA || !matchup.team2RatioElements.C2PM ? 0 : matchup.team2RatioElements.C2PM / matchup.team2RatioElements.C2PA;
        // matchup.teamStats2.ATO = !matchup.team2RatioElements.TO ? 0 : matchup.team2RatioElements.AST / matchup.team2RatioElements.TO;
        // matchup.teamStats2.S_TO = !matchup.team2RatioElements.TO ? 0 : matchup.team2RatioElements.STL / matchup.team2RatioElements.TO;
        return matchup;
    };
    return H2HResultMatchupCalculator;
}());

//# sourceMappingURL=h2hresult.matchup.calculator.js.map

/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return H2hResultMatchup; });
var H2hResultMatchup = /** @class */ (function () {
    function H2hResultMatchup(teamStats1, teamStats2, team1, team2, week, team1standing, team2standing) {
        this.teamStats1 = teamStats1;
        this.teamStats2 = teamStats2;
        this.team1 = team1;
        this.team2 = team2;
        this.week = week;
        this.team1standing = team1standing;
        this.team2standing = team2standing;
    }
    return H2hResultMatchup;
}());

//# sourceMappingURL=h2hresult.matchup.js.map

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(104);


/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es7_array__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es7_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es7_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__app_dashboard_team__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__app_dashboard_team_players_adapter__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__app_dashboard_h2hresult_h2hresult_calculator__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__app_dashboard_h2hresult_h2hresult_schedule__ = __webpack_require__(249);


















var customPostMessage = postMessage;
//let combinationFinder: PlayerCombinationsFinder;
var teamRankingCalculator;
var h2HResultCalculator;
var leagueCalendar;
var draft;
var h2hResult;
var myMatchups;
onmessage = function (event) {
    if (event.data.command == "initialize") {
        leagueCalendar = //LeagueCalendarAdapter.adapt(
            event.data.leagueCalendar; //);
        h2HResultCalculator = new __WEBPACK_IMPORTED_MODULE_16__app_dashboard_h2hresult_h2hresult_calculator__["a" /* H2HResultCalculator */](leagueCalendar);
        draft = event.data.draft;
    }
    if (event.data.command == "recalculate") {
        console.time("combination calculations");
        // we need: calendar, team list, player rankings, 
        var teamPlayers = __WEBPACK_IMPORTED_MODULE_15__app_dashboard_team_players_adapter__["a" /* TeamPlayersAdapter */].adapt(event.data.teamPlayers);
        var selectedTeamPlayers = teamPlayers.playersOf(event.data.selectedTeamDefinitionId);
        var playersToPick = event.data.playersToPick;
        var puntCategories = event.data.puntCategories;
        var calculateFor = event.data.calculateFor;
        var draftResults = event.data.draftResults;
        //let combinations = combinationFinder.combine(playersToPick, selectedTeamPlayers, puntCategories, calculateFor);
        var teams_1 = Array();
        event.data.teamDefinitions.forEach(function (teamDefinition) {
            //const players = teamPlayers.playersOf(teamDefinition.id);
            //const teamRanking = teamRankingCalculator.calculate(players, puntCategories);
            var team = new __WEBPACK_IMPORTED_MODULE_14__app_dashboard_team__["a" /* Team */](null, null);
            team.id = teamDefinition.id;
            team.name = teamDefinition.name;
            teams_1.push(team);
        });
        // calculate current standings
        h2hResult = h2HResultCalculator.calculateH2HResult(event.data.teamDefinitions, null, leagueCalendar, JSON.parse(JSON.stringify(draftResults)), event.data.selectedTeamDefinitionId, draft);
        myMatchups = (new __WEBPACK_IMPORTED_MODULE_17__app_dashboard_h2hresult_h2hresult_schedule__["a" /* Schedule */]()).CreateSchedule(h2hResult, +draft.teamId, teams_1);
        // // we need to add h2h rankings to each (or top 100?) players from the ranking
        var limit = 20;
        var calculatedPlayers = 0;
        for (var i = 0; i < playersToPick.length; i++) {
            if (playersToPick[i].picked || playersToPick[i].exclude //|| !playersToPick[i].seasonScoreProjections
            ) {
                playersToPick[i].h2hResult = null;
                playersToPick[i].projectedResult = null;
                continue;
            }
            calculatedPlayers++;
            if (calculatedPlayers > limit && !playersToPick[i].target)
                continue;
            playersToPick[i].h2hResult = h2HResultCalculator.calculateH2HResult(event.data.teamDefinitions, playersToPick[i], leagueCalendar, JSON.parse(JSON.stringify(draftResults)), event.data.selectedTeamDefinitionId, draft);
        }
        //let interalTeamRankings = teamRankingCalculator.calculateInternal(teams, puntCategories);
        //interalTeamRankings = interalTeamRankings.sort((t1, t2) => t2.ranking.totalPoints - t1.ranking.totalPoints);
        // teams.sort((t1, t2) => t1.ranking.place - t2.ranking.place).forEach((team, index) => {
        //     if (!index) return;
        //     if (teams[index].ranking.place <= teams[index - 1].ranking.place) {
        //          teams[index].ranking.place = teams[index - 1].ranking.place + 1;
        //     }
        // });
        console.timeEnd("combination calculations");
        customPostMessage({
            combinations: playersToPick,
            myMatchups: myMatchups,
            h2hresult: h2hResult,
            teams: teams_1
        });
    }
};
//# sourceMappingURL=web-worker.js.map

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(64);
__webpack_require__(40);
module.exports = __webpack_require__(4).Symbol;


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var core = __webpack_require__(4);
var LIBRARY = __webpack_require__(45);
var wksExt = __webpack_require__(67);
var defineProperty = __webpack_require__(7).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(27);
var gOPS = __webpack_require__(49);
var pIE = __webpack_require__(36);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(64);
__webpack_require__(109);
__webpack_require__(110);
__webpack_require__(111);
__webpack_require__(112);
__webpack_require__(113);
__webpack_require__(114);
__webpack_require__(115);
__webpack_require__(116);
__webpack_require__(117);
__webpack_require__(118);
__webpack_require__(119);
__webpack_require__(120);
__webpack_require__(121);
__webpack_require__(122);
__webpack_require__(124);
__webpack_require__(126);
__webpack_require__(40);

module.exports = __webpack_require__(4).Object;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(33) });


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperty: __webpack_require__(7).f });


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperties: __webpack_require__(69) });


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(14);
var $getOwnPropertyDescriptor = __webpack_require__(39).f;

__webpack_require__(15)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(9);
var $getPrototypeOf = __webpack_require__(50);

__webpack_require__(15)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(9);
var $keys = __webpack_require__(27);

__webpack_require__(15)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(15)('getOwnPropertyNames', function () {
  return __webpack_require__(71).f;
});


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(2);
var meta = __webpack_require__(26).onFreeze;

__webpack_require__(15)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(2);
var meta = __webpack_require__(26).onFreeze;

__webpack_require__(15)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(2);
var meta = __webpack_require__(26).onFreeze;

__webpack_require__(15)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(2);

__webpack_require__(15)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(2);

__webpack_require__(15)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(2);

__webpack_require__(15)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(123) });


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(27);
var gOPS = __webpack_require__(49);
var pIE = __webpack_require__(36);
var toObject = __webpack_require__(9);
var IObject = __webpack_require__(31);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(1)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { is: __webpack_require__(125) });


/***/ }),
/* 125 */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(73).set });


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(128);
__webpack_require__(131);
__webpack_require__(132);
module.exports = __webpack_require__(4).Function;


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(0);

$export($export.P, 'Function', { bind: __webpack_require__(129) });


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(30);
var isObject = __webpack_require__(2);
var invoke = __webpack_require__(130);
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),
/* 130 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(6) && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(2);
var getPrototypeOf = __webpack_require__(50);
var HAS_INSTANCE = __webpack_require__(3)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(7).f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(134);
module.exports = __webpack_require__(4).parseInt;


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(74);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(136);
module.exports = __webpack_require__(4).parseFloat;


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(75);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(138);
__webpack_require__(139);
__webpack_require__(140);
__webpack_require__(141);
__webpack_require__(142);
__webpack_require__(143);
__webpack_require__(144);
__webpack_require__(145);
__webpack_require__(146);
__webpack_require__(147);
__webpack_require__(148);
__webpack_require__(149);
module.exports = __webpack_require__(4).Number;


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(5);
var has = __webpack_require__(17);
var cof = __webpack_require__(21);
var inheritIfRequired = __webpack_require__(52);
var toPrimitive = __webpack_require__(25);
var fails = __webpack_require__(1);
var gOPN = __webpack_require__(38).f;
var gOPD = __webpack_require__(39).f;
var dP = __webpack_require__(7).f;
var $trim = __webpack_require__(41).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(33)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(6) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(11)(global, NUMBER, $Number);
}


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toInteger = __webpack_require__(22);
var aNumberValue = __webpack_require__(76);
var repeat = __webpack_require__(77);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(1)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $fails = __webpack_require__(1);
var aNumberValue = __webpack_require__(76);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(0);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(0);
var _isFinite = __webpack_require__(5).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', { isInteger: __webpack_require__(78) });


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(0);
var isInteger = __webpack_require__(78);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(75);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(74);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(151);
__webpack_require__(152);
__webpack_require__(153);
__webpack_require__(154);
__webpack_require__(155);
__webpack_require__(156);
__webpack_require__(157);
__webpack_require__(158);
__webpack_require__(160);
__webpack_require__(161);
__webpack_require__(162);
__webpack_require__(163);
__webpack_require__(164);
__webpack_require__(165);
__webpack_require__(166);
__webpack_require__(167);
__webpack_require__(168);
module.exports = __webpack_require__(4).Math;


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(0);
var log1p = __webpack_require__(79);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(0);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(0);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(0);
var sign = __webpack_require__(53);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(0);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(0);
var $expm1 = __webpack_require__(54);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { fround: __webpack_require__(159) });


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(53);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(0);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(0);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(1)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { log1p: __webpack_require__(79) });


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { sign: __webpack_require__(53) });


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(54);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(1)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(54);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(170);
__webpack_require__(171);
__webpack_require__(172);
__webpack_require__(42);
__webpack_require__(174);
__webpack_require__(175);
__webpack_require__(176);
__webpack_require__(177);
__webpack_require__(178);
__webpack_require__(179);
__webpack_require__(180);
__webpack_require__(181);
__webpack_require__(182);
__webpack_require__(183);
__webpack_require__(184);
__webpack_require__(185);
__webpack_require__(186);
__webpack_require__(187);
__webpack_require__(188);
__webpack_require__(189);
__webpack_require__(190);
__webpack_require__(191);
__webpack_require__(81);
__webpack_require__(82);
__webpack_require__(83);
__webpack_require__(84);
module.exports = __webpack_require__(4).String;


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toAbsoluteIndex = __webpack_require__(32);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(14);
var toLength = __webpack_require__(8);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(41)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(33);
var descriptor = __webpack_require__(28);
var setToStringTag = __webpack_require__(35);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(16)(IteratorPrototype, __webpack_require__(3)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $at = __webpack_require__(80)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(8);
var context = __webpack_require__(56);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(58)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(0);
var context = __webpack_require__(56);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(58)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(77)
});


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(8);
var context = __webpack_require__(56);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(58)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(10)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(10)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(10)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(10)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(10)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(10)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(10)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(10)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(10)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(10)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(10)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(10)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(10)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(193);
__webpack_require__(194);
__webpack_require__(195);
__webpack_require__(197);
__webpack_require__(198);
module.exports = Date;


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(0);

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(25);

$export($export.P + $export.F * __webpack_require__(1)(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(0);
var toISOString = __webpack_require__(196);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = __webpack_require__(1);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(11)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(3)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(16)(proto, TO_PRIMITIVE, __webpack_require__(199));


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(13);
var toPrimitive = __webpack_require__(25);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(42);
__webpack_require__(201);
__webpack_require__(202);
__webpack_require__(203);
__webpack_require__(204);
__webpack_require__(205);
__webpack_require__(206);
__webpack_require__(207);
__webpack_require__(209);
__webpack_require__(210);
__webpack_require__(211);
__webpack_require__(212);
__webpack_require__(213);
__webpack_require__(214);
__webpack_require__(215);
__webpack_require__(216);
__webpack_require__(217);
__webpack_require__(219);
__webpack_require__(221);
__webpack_require__(222);
__webpack_require__(223);
__webpack_require__(91);
module.exports = __webpack_require__(4).Array;


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(0);

$export($export.S, 'Array', { isArray: __webpack_require__(37) });


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(20);
var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var call = __webpack_require__(85);
var isArrayIter = __webpack_require__(86);
var toLength = __webpack_require__(8);
var createProperty = __webpack_require__(87);
var getIterFn = __webpack_require__(88);

$export($export.S + $export.F * !__webpack_require__(89)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var createProperty = __webpack_require__(87);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(1)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export = __webpack_require__(0);
var toIObject = __webpack_require__(14);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(31) != Object || !__webpack_require__(12)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var html = __webpack_require__(70);
var cof = __webpack_require__(21);
var toAbsoluteIndex = __webpack_require__(32);
var toLength = __webpack_require__(8);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(1)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var aFunction = __webpack_require__(30);
var toObject = __webpack_require__(9);
var fails = __webpack_require__(1);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(12)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $forEach = __webpack_require__(23)(0);
var STRICT = __webpack_require__(12)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2);
var isArray = __webpack_require__(37);
var SPECIES = __webpack_require__(3)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $map = __webpack_require__(23)(1);

$export($export.P + $export.F * !__webpack_require__(12)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $filter = __webpack_require__(23)(2);

$export($export.P + $export.F * !__webpack_require__(12)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $some = __webpack_require__(23)(3);

$export($export.P + $export.F * !__webpack_require__(12)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $every = __webpack_require__(23)(4);

$export($export.P + $export.F * !__webpack_require__(12)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(90);

$export($export.P + $export.F * !__webpack_require__(12)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(90);

$export($export.P + $export.F * !__webpack_require__(12)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $indexOf = __webpack_require__(46)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(12)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(14);
var toInteger = __webpack_require__(22);
var toLength = __webpack_require__(8);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(12)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { copyWithin: __webpack_require__(218) });

__webpack_require__(19)('copyWithin');


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(9);
var toAbsoluteIndex = __webpack_require__(32);
var toLength = __webpack_require__(8);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { fill: __webpack_require__(220) });

__webpack_require__(19)('fill');


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(9);
var toAbsoluteIndex = __webpack_require__(32);
var toLength = __webpack_require__(8);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(23)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(19)(KEY);


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(23)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(19)(KEY);


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(60)('Array');


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(225);
__webpack_require__(226);
__webpack_require__(93);
__webpack_require__(81);
__webpack_require__(82);
__webpack_require__(83);
__webpack_require__(84);
module.exports = __webpack_require__(4).RegExp;


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var inheritIfRequired = __webpack_require__(52);
var dP = __webpack_require__(7).f;
var gOPN = __webpack_require__(38).f;
var isRegExp = __webpack_require__(57);
var $flags = __webpack_require__(61);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(6) && (!CORRECT_NEW || __webpack_require__(1)(function () {
  re2[__webpack_require__(3)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(11)(global, 'RegExp', $RegExp);
}

__webpack_require__(60)('RegExp');


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(93);
var anObject = __webpack_require__(13);
var $flags = __webpack_require__(61);
var DESCRIPTORS = __webpack_require__(6);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(11)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(1)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(40);
__webpack_require__(42);
__webpack_require__(94);
__webpack_require__(228);
module.exports = __webpack_require__(4).Map;


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(95);
var validate = __webpack_require__(62);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(99)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(40);
__webpack_require__(42);
__webpack_require__(94);
__webpack_require__(230);
module.exports = __webpack_require__(4).Set;


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(95);
var validate = __webpack_require__(62);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(99)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(232);
__webpack_require__(233);
__webpack_require__(234);
module.exports = __webpack_require__(4).Array;


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(0);
var $includes = __webpack_require__(46)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(19)('includes');


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(100);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(8);
var aFunction = __webpack_require__(30);
var arraySpeciesCreate = __webpack_require__(59);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(19)('flatMap');


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(100);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(8);
var toInteger = __webpack_require__(22);
var arraySpeciesCreate = __webpack_require__(59);

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

__webpack_require__(19)('flatten');


/***/ }),
/* 235 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Team; });
var Team = /** @class */ (function () {
    function Team(players, ranking) {
        this.players = players;
        this.ranking = ranking;
    }
    return Team;
}());

//# sourceMappingURL=team.js.map

/***/ }),
/* 236 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamPlayersAdapter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__team_players__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__draft_result_draft_result__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__team_definition__ = __webpack_require__(238);



var TeamPlayersAdapter = /** @class */ (function () {
    function TeamPlayersAdapter() {
    }
    TeamPlayersAdapter.adapt = function (teamsPlayerJsonRepresentation) {
        var players = new Array();
        teamsPlayerJsonRepresentation.players.forEach(function (player) {
            players.push(player);
        });
        var draftResults = new Array();
        teamsPlayerJsonRepresentation.draftResult.forEach(function (draftResult) {
            draftResults.push(new __WEBPACK_IMPORTED_MODULE_1__draft_result_draft_result__["a" /* DraftResult */](draftResult.pickNumber, draftResult.player, new __WEBPACK_IMPORTED_MODULE_2__team_definition__["a" /* TeamDefinition */](draftResult.teamDefinition.id, draftResult.teamDefinition.name)));
        });
        var teamPlayers = new __WEBPACK_IMPORTED_MODULE_0__team_players__["a" /* TeamPlayers */](players);
        teamPlayers.refreshPicks(draftResults);
        return teamPlayers;
    };
    return TeamPlayersAdapter;
}());

//# sourceMappingURL=team.players.adapter.js.map

/***/ }),
/* 237 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamPlayers; });
var TeamPlayers = /** @class */ (function () {
    function TeamPlayers(players) {
        this.players = players;
        this.draftResult = new Array();
        this.pickedPlayerIds = new Array();
    }
    TeamPlayers.prototype.refreshPicks = function (draftResult) {
        this.draftResult = draftResult;
        this.pickedPlayerIds = draftResult.map(function (x) { return x.player.id; });
    };
    TeamPlayers.prototype.playersOf = function (teamId) {
        var teamPicks = this.draftResult
            .filter(function (x) { return x.teamDefinition.id == teamId; })
            .map(function (x) { return x.player.id; });
        return this.players.filter(function (x) { return teamPicks.includes(x.id); });
    };
    return TeamPlayers;
}());

//# sourceMappingURL=team.players.js.map

/***/ }),
/* 238 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamDefinition; });
var TeamDefinition = /** @class */ (function () {
    function TeamDefinition(id, name) {
        this.id = id;
        this.name = name;
    }
    return TeamDefinition;
}());

//# sourceMappingURL=team.definition.js.map

/***/ }),
/* 239 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return H2HResultCalculator; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__h2hresult__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__team_ranking__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__h2hresult_h2hresult_matchup_calculator__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__h2hresult_h2hresult_playoffs__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__h2hresult_h2hresult_cat_calculator__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__draft_result_draft_result__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_linq_es2015__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_linq_es2015___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_linq_es2015__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__draft_result_draft_result_item__ = __webpack_require__(248);








var H2HResultCalculator = /** @class */ (function () {
    function H2HResultCalculator(leagueCalendar) {
        this.leagueCalendar = leagueCalendar;
        this.addDays = function (date, days) {
            var dat = new Date(date.valueOf());
            dat.setDate(dat.getDate() + days);
            return dat;
        };
        this.h2HResultCatCalculator = new __WEBPACK_IMPORTED_MODULE_4__h2hresult_h2hresult_cat_calculator__["a" /* H2HResultCatCalculator */]();
        this.h2HResultMatchupCalculator = new __WEBPACK_IMPORTED_MODULE_2__h2hresult_h2hresult_matchup_calculator__["a" /* H2HResultMatchupCalculator */]();
    }
    H2HResultCalculator.prototype.calculateH2HResult = function (teams, player, calendarAggregated, draftResults, myTeamId, draftData) {
        // console.log(player.name + ' ' + new Date());
        var _this = this;
        var h2HResultPlayoffs = new __WEBPACK_IMPORTED_MODULE_3__h2hresult_h2hresult_playoffs__["a" /* H2HResultPlayoffs */]();
        if (!draftData.endWeek)
            draftData.endWeek = 24;
        if (!draftData.playoffSize)
            draftData.playoffSize = 6;
        var calculationWeek = 1;
        var playoffSize = draftData.playoffSize || 6;
        var playoffsWeeks = (playoffSize > 4 ? 3 : (playoffSize > 2 ? 2 : 1)) || 3;
        var leagueLastRsWeek = ((draftData.endWeek || 24) - playoffsWeeks);
        var matchupList = new Array();
        var result = new __WEBPACK_IMPORTED_MODULE_0__h2hresult__["a" /* H2HResult */]();
        this.draft = draftData;
        // if calculating result for a free player - adding him to my team
        var myTeam = teams.filter(function (x) { return x.id == myTeamId; })[0];
        var projectedDraftResult;
        if (player != null) {
            if (myTeam.players == null) {
                myTeam.players = new Array();
            }
            myTeam.players.push(player);
            projectedDraftResult = new __WEBPACK_IMPORTED_MODULE_5__draft_result_draft_result__["a" /* DraftResult */](draftResults.results.length + 1, player, myTeam, 0);
            draftResults.results.push(projectedDraftResult);
        }
        teams.forEach(function (rankingTeam) {
            var t = new __WEBPACK_IMPORTED_MODULE_1__team_ranking__["a" /* TeamRanking */]();
            t.loses = new Object();
            t.wins = new Object();
            t.ties = new Object();
            t.totals = new Object();
            t.loses["total"] = 0;
            t.wins["total"] = 0;
            t.ties["total"] = 0;
            _this.draft.categories.forEach(function (c) {
                t.loses[c.name] = 0;
                t.wins[c.name] = 0;
                t.ties[c.name] = 0;
                t.totals[c.name] = 0;
            });
            t.team = rankingTeam;
            result.ranking.push(t);
        });
        while (calculationWeek <= leagueLastRsWeek) {
            var weekMatchups = this.h2HResultMatchupCalculator.GetMatchupWeek(calculationWeek, this.draft.leagueSize, this.draft);
            // get total weekly ranks
            try {
                var weeklyProduction = this.GetWeeklyProduction(JSON.parse(JSON.stringify(draftResults.results)), 
                //this.circularJson.parse(this.circularJson.stringify(draftResults)),
                calendarAggregated.filter(function (c) { return c.week == calculationWeek; }), calculationWeek, this.draft.categories);
                // // calculate matchup results
                for (var i = 0; i < weekMatchups.length; i++) {
                    weekMatchups[i] = this.h2HResultMatchupCalculator.UpdateMatchupProduction(weekMatchups[i], weeklyProduction, this.draft.categories, (player != null));
                    matchupList.push(weekMatchups[i]);
                }
                calculationWeek++;
            }
            catch (e) {
                console.log(e + ' ' + calculationWeek);
            }
        }
        result.CalculateStandings(matchupList, this.draft);
        if (player != null) {
            var myTeamResult = result.ranking.filter(function (x) { return x.team.id == myTeamId; })[0].totalPoints;
            player.projectedResult = myTeamResult;
            player.projectedResultCalculated = true;
            myTeam.players.splice(myTeam.players.findIndex(function (x) { return x.id == player.id; }), 1);
            draftResults.results.splice(draftResults.results.findIndex(function (r) { return r == projectedDraftResult; }), 1);
        }
        else {
            result.playerResult = 999;
            // add playoffs
            h2HResultPlayoffs = new __WEBPACK_IMPORTED_MODULE_3__h2hresult_h2hresult_playoffs__["a" /* H2HResultPlayoffs */]();
            var teamPlayoffGames_1 = new Object();
            var teamPlayoffsGameAvg_1 = 0;
            for (i = 0; i < playoffsWeeks; i++) {
                var playoffWeeklyCalendar = calendarAggregated.filter(function (c) { return c.week == calculationWeek; });
                var weeklyProduction = this.GetWeeklyProduction(JSON.parse(JSON.stringify(draftResults.results)), 
                //draftResults,
                playoffWeeklyCalendar, calculationWeek, this.draft.categories);
                h2HResultPlayoffs.GetPlayoffTreeRound(calculationWeek, weeklyProduction, result.ranking, playoffSize, this.draft, player != null);
                __WEBPACK_IMPORTED_MODULE_6_linq_es2015__["asEnumerable"](playoffWeeklyCalendar)
                    .GroupBy(function (c) { return c.team1; }).ToArray().forEach(function (t) {
                    if (!teamPlayoffGames_1[t.key]) {
                        teamPlayoffGames_1[t.key] = new Object();
                        teamPlayoffGames_1[t.key]["text"] = "";
                        teamPlayoffGames_1[t.key]["total"] = 0;
                    }
                    teamPlayoffGames_1[t.key][calculationWeek] = t["length"];
                    teamPlayoffGames_1[t.key]["total"] += t["length"];
                    teamPlayoffGames_1[t.key]["text"] = teamPlayoffGames_1[t.key]["text"] + "week: "
                        + calculationWeek + " - " + t["length"] + " games / ";
                    teamPlayoffsGameAvg_1 += t["length"];
                });
                calculationWeek++;
            }
            result.teamPlayoffGameAverage = teamPlayoffsGameAvg_1 / 30;
            result.teamPlayoffGames = teamPlayoffGames_1;
            result.playoffMatchups = h2HResultPlayoffs.playoffTree;
        }
        return result;
    };
    H2HResultCalculator.prototype.GetWeeklyProduction = function (draftResults, innerCalendarAggregated, leagueCurrentWeek, cats) {
        var gamesPlayed = 0;
        var startDate = new Date();
        var endDate = this.nextDay(new Date(), 0);
        var slots = new Array();
        var resultList = new Array();
        var weeklyRankings = new Array();
        draftResults.forEach(function (result, index) {
            resultList.push(new __WEBPACK_IMPORTED_MODULE_7__draft_result_draft_result_item__["a" /* DraftResultItem */](result, 0, 0));
        });
        // opty
        // if(draftResults){
        // return draftResults;
        // }
        var newDate = new Date(endDate.toDateString());
        if (innerCalendarAggregated != null && innerCalendarAggregated.length > 0) {
            startDate = __WEBPACK_IMPORTED_MODULE_6_linq_es2015__["asEnumerable"](innerCalendarAggregated).OrderBy(function (cal) { return cal.date; }).First().date;
            endDate = __WEBPACK_IMPORTED_MODULE_6_linq_es2015__["asEnumerable"](innerCalendarAggregated).OrderBy(function (cal) { return cal.date; }).Last().date;
        }
        if (startDate < new Date() && endDate >= newDate) {
            startDate = newDate;
        }
        while (new Date(startDate) <= new Date(endDate)) {
            slots.length = 0;
            for (var i = 0; i < resultList.length; i++) {
                var p = resultList[i].result.player;
                if (this.CheckIfTeamPlays(p.team, startDate, innerCalendarAggregated)
                    && this.CheckSlotLimit(resultList[i].result.teamDefinition.name, slots, this.draft.activeTeamSize)) {
                    resultList[i].slots = resultList[i].slots + 1;
                }
            }
            startDate = this.addDays(startDate, 1);
        }
        for (var i = 0; i < resultList.length; i++) {
            resultList[i].week = leagueCurrentWeek;
            resultList[i].result.player = this.h2HResultCatCalculator.MultiplyRankingValues(resultList[i]);
        }
        weeklyRankings.push(resultList);
        //console.time("group weekly");
        var grouped = this.h2HResultCatCalculator.GroupWeeklyProduction(resultList);
        //console.timeEnd("group weekly");
        return grouped;
    };
    H2HResultCalculator.prototype.CheckIfTeamPlays = function (team, dt, innerCalendarAggregated) {
        var retValue = __WEBPACK_IMPORTED_MODULE_6_linq_es2015__["asEnumerable"](innerCalendarAggregated)
            .Where(function (c) { return c.team1.toUpperCase() == team.toUpperCase() && new Date(c.date).getTime() == new Date(dt).getTime(); });
        return retValue.Any();
    };
    H2HResultCalculator.prototype.nextDay = function (d, dow) {
        d.setDate(d.getDate() + (dow + (7 - d.getDay())) % 7);
        return d;
    };
    H2HResultCalculator.prototype.CheckSlotLimit = function (o, slots, activeTeamSize) {
        var slot = __WEBPACK_IMPORTED_MODULE_6_linq_es2015__["asEnumerable"](slots).Where(function (row) { return row.team == o; });
        if (!slot.Any()) {
            var ob = { team: o, count: 1 };
            slots.push(ob);
            return true;
        }
        slot.First().count = slot.First().count + 1;
        return slot.First().count <= activeTeamSize;
    };
    H2HResultCalculator.prototype.GroupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };
    ;
    return H2HResultCalculator;
}());

//# sourceMappingURL=h2hresult.calculator.js.map

/***/ }),
/* 240 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return H2HResult; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_linq_es2015__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_linq_es2015___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_linq_es2015__);

var H2HResult = /** @class */ (function () {
    function H2HResult() {
        this.ranking = new Array();
        this.rsMatchups = new Array();
        this.playoffMatchups = new Array();
        this.playerResult = 0;
    }
    H2HResult.prototype.CalculateStandings = function (matchups, draft) {
        // odpalamy z zerami, potem uzupelniamy po kolei kategorie i totals, idąc po matchupach
        var _this = this;
        this.rsMatchups = matchups;
        matchups.forEach(function (m) {
            var team1 = __WEBPACK_IMPORTED_MODULE_0_linq_es2015__["asEnumerable"](_this.ranking).FirstOrDefault(function (r) { return r.team.id == m.team1.toString(); });
            var team2 = __WEBPACK_IMPORTED_MODULE_0_linq_es2015__["asEnumerable"](_this.ranking).FirstOrDefault(function (r) { return r.team.id == m.team2.toString(); });
            team1.ratioElements = team1.ratioElements || new Object();
            team2.ratioElements = team2.ratioElements || new Object();
            draft.categories.forEach(function (e) {
                if (!team1.totals)
                    team1.totals = new Object();
                if (!team1.totals[e.name])
                    team1.totals[e.name] = m.teamStats1[e.name];
                else
                    team1.totals[e.name] += m.teamStats1[e.name];
                if (!team2.totals)
                    team1.totals = new Object();
                if (!team2.totals[e.name])
                    team2.totals[e.name] = m.teamStats2[e.name];
                else
                    team2.totals[e.name] += m.teamStats2[e.name];
                try {
                    if (m.teamStats1[e.name] == m.teamStats2[e.name]) {
                        team1.ties[e.name]++;
                        team2.ties[e.name]++;
                        team1.ties["total"]++;
                        team2.ties["total"]++;
                    }
                    else if ((m.teamStats1[e.name] > m.teamStats2[e.name] && !e.negative)
                        || (m.teamStats1[e.name] < m.teamStats2[e.name] && e.negative)) {
                        team1.wins[e.name]++;
                        team2.loses[e.name]++;
                        team1.wins["total"]++;
                        team2.loses["total"]++;
                    }
                    else {
                        team1.loses[e.name]++;
                        team2.wins[e.name]++;
                        team1.loses["total"]++;
                        team2.wins["total"]++;
                    }
                }
                catch (err) {
                    console.log(err);
                    console.log(m.team1);
                    console.log(m.team2);
                }
            });
            team1.ratioElements["FG"] = (team1.ratioElements["FG"] || 0) + m.team1RatioElements["FG"];
            team1.ratioElements["FGA"] = (team1.ratioElements["FGA"] || 0) + m.team1RatioElements["FGA"];
            team1.ratioElements["FT"] = (team1.ratioElements["FT"] || 0) + m.team1RatioElements["FT"];
            team1.ratioElements["FTA"] = (team1.ratioElements["FTA"] || 0) + m.team1RatioElements["FTA"];
            team1.ratioElements["AST"] = (team1.ratioElements["AST"] || 0) + m.team1RatioElements["AST"];
            team1.ratioElements["TO"] = (team1.ratioElements["TO"] || 0) + m.team1RatioElements["TO"];
            team2.ratioElements["FG"] = (team2.ratioElements["FG"] || 0) + m.team2RatioElements["FG"];
            team2.ratioElements["FGA"] = (team2.ratioElements["FGA"] || 0) + m.team2RatioElements["FGA"];
            team2.ratioElements["FT"] = (team2.ratioElements["FT"] || 0) + m.team2RatioElements["FT"];
            team2.ratioElements["FTA"] = (team2.ratioElements["FTA"] || 0) + m.team2RatioElements["FTA"];
            team2.ratioElements["AST"] = (team2.ratioElements["AST"] || 0) + m.team2RatioElements["AST"];
            team2.ratioElements["TO"] = (team2.ratioElements["TO"] || 0) + m.team2RatioElements["TO"];
        });
        this.ranking.forEach(function (r) {
            r.totalPoints = (r.wins["total"] + r.ties["total"] / 2);
            r.percentage = Math.round(r.totalPoints / (r.wins["total"] + r.ties["total"] + r.loses["total"]) * 100) / 100;
            if (r.totals["FG%"]) {
                r.totals["FG%"] = !r.ratioElements["FGA"] ? 0 : Math.round(100 * r.ratioElements["FG"] / r.ratioElements["FGA"]) / 100;
            }
            if (r.totals["FT%"]) {
                r.totals["FT%"] = !r.ratioElements["FTA"] ? 0 : Math.round(100 * r.ratioElements["FT"] / r.ratioElements["FTA"]) / 100;
            }
            if (r.totals["ATO"]) {
                r.totals["ATO"] = !r.ratioElements["TO"] ? 0 : Math.round(100 * r.ratioElements["AST"] / r.ratioElements["TO"]) / 100;
            }
        });
        this.ranking = this.ranking.sort(function (a, b) { return b.percentage - a.percentage; });
        var place = 0;
        this.ranking.forEach(function (r) {
            r.place = ++place;
        });
    };
    return H2HResult;
}());

//# sourceMappingURL=h2hresult.js.map

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

///////////////////////////////////////////////////////////////////////////////
//
// Licensed under the Apache License, Version 2.0  ( the  "License" );  you may 
// not use this file except in compliance with the License.  You may  obtain  a 
// copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required  by  applicable  law  or  agreed  to  in  writing,  software 
// distributed under the License is distributed on an "AS  IS"  BASIS,  WITHOUT
// WARRANTIES OR CONDITIONS  OF  ANY  KIND, either express or implied.  See the 
// License for the specific  language  governing  permissions  and  limitations 
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
function* Forward(target) {
    yield* target;
}
exports.Forward = Forward;
function* Reverse(target) {
    for (let i = target.length - 1; i >= 0; i--) {
        yield target[i];
    }
}
exports.Reverse = Reverse;
function* Select(target, transform) {
    let index = 0;
    for (let value of target) {
        yield transform(value, index++);
    }
}
exports.Select = Select;
function* DefaultIfEmpty(target, defaultValue) {
    let iterator = target[Symbol.iterator]();
    let result = iterator.next();
    if (result.done) {
        yield defaultValue;
    }
    else {
        yield* target;
    }
}
exports.DefaultIfEmpty = DefaultIfEmpty;
function* ChunkBy(target, keySelect, elementSelector, resultSelector) {
    let key, box, i = 0;
    for (let value of target) {
        let newKey = keySelect(value, i++);
        if (key !== newKey && box) {
            yield resultSelector(key, box);
            box = undefined;
        }
        if (!box) {
            box = new Array();
        }
        key = newKey;
        box.push(elementSelector(value));
    }
    if (box) {
        yield resultSelector(key, box);
    }
}
exports.ChunkBy = ChunkBy;
function* Distinct(target, keySelector) {
    let set = new Set();
    for (let value of target) {
        let key = keySelector(value);
        if (set.has(key))
            continue;
        set.add(key);
        yield value;
    }
}
exports.Distinct = Distinct;
function* DistinctFast(target) {
    let set = new Set();
    for (let value of target) {
        if (set.has(value))
            continue;
        set.add(value);
        yield value;
    }
}
exports.DistinctFast = DistinctFast;
function* OfType(target, obj, typeName) {
    if (typeName) {
        for (let value of target) {
            if (typeName == typeof (value)) {
                yield value;
            }
            else if (value instanceof obj) {
                yield value;
            }
        }
    }
    else {
        for (let value of target) {
            if (value instanceof obj) {
                yield value;
            }
        }
    }
}
exports.OfType = OfType;
function* Where(target, predicate) {
    let index = 0;
    for (let value of target) {
        if (!predicate(value, index++))
            continue;
        yield value;
    }
}
exports.Where = Where;
function* Skip(target, skip) {
    let index = 0;
    for (let value of target) {
        if (skip > index++)
            continue;
        yield value;
    }
}
exports.Skip = Skip;
function* SkipWhile(target, predicate) {
    let index = 0, skipped = false;
    for (let value of target) {
        if (!skipped && !(skipped = !predicate(value, index++)))
            continue;
        yield value;
    }
}
exports.SkipWhile = SkipWhile;
function* TakeWhile(target, predicate) {
    let index = 0;
    for (let value of target) {
        if (!predicate(value, index++))
            break;
        yield value;
    }
}
exports.TakeWhile = TakeWhile;
function* Intersect(target, exceptions, condition, keySelect) {
    if (keySelect) {
        for (let value of target) {
            if (condition == exceptions.has(keySelect(value)))
                continue;
            yield value;
        }
    }
    else {
        for (let value of target) {
            if (condition == exceptions.has(value))
                continue;
            yield value;
        }
    }
}
exports.Intersect = Intersect;
function* Repeat(value, count) {
    for (let i = 0; i < count; i++) {
        yield value;
    }
}
exports.Repeat = Repeat;
function* Range(value, count) {
    let current = value;
    for (let i = 0; i < count; i++) {
        yield current;
        current++;
    }
}
exports.Range = Range;
function* Union(first, second, keySelector) {
    let set = new Set();
    for (let value of first) {
        let key = keySelector(value);
        if (set.has(key))
            continue;
        set.add(key);
        yield value;
    }
    for (let value of second) {
        let key = keySelector(value);
        if (set.has(key))
            continue;
        set.add(key);
        yield value;
    }
}
exports.Union = Union;
function* UnionFast(first, second) {
    let set = new Set();
    for (let value of first) {
        if (set.has(value))
            continue;
        set.add(value);
        yield value;
    }
    for (let value of second) {
        if (set.has(value))
            continue;
        set.add(value);
        yield value;
    }
}
exports.UnionFast = UnionFast;
function* Join(target, oKeySelect, transform, map) {
    for (let value of target) {
        let key = oKeySelect(value);
        if (!key)
            continue;
        let innerSet = map.get(key);
        if (!innerSet)
            continue;
        for (let inner of innerSet) {
            yield transform(value, inner);
        }
    }
}
exports.Join = Join;
function* GroupJoin(target, oKeySelect, transform, map) {
    for (let value of target) {
        let innerSet = undefined;
        let key = oKeySelect(value);
        if (key) {
            innerSet = map.get(key);
        }
        yield transform(value, innerSet);
    }
}
exports.GroupJoin = GroupJoin;
function* GroupBy(map, resultSelect) {
    for (let key of map.keys()) {
        yield resultSelect(key, map.get(key));
    }
}
exports.GroupBy = GroupBy;
function* SelectMany(target, selector, transform) {
    let index = 0;
    for (let item of target) {
        for (let collectionItem of selector(item, index++)) {
            yield transform(item, collectionItem);
        }
    }
}
exports.SelectMany = SelectMany;
function* Concat(target, second) {
    yield* target;
    yield* second;
}
exports.Concat = Concat;
function* Zip(first, second, transform, _index = 0) {
    let iteratorOne = first[Symbol.iterator]();
    let iteratorTwo = second[Symbol.iterator]();
    let retOne, retTwo;
    while (!(retOne = iteratorOne.next()).done && !(retTwo = iteratorTwo.next()).done) {
        yield transform(retOne.value, retTwo.value);
    }
}
exports.Zip = Zip;
/** Copyright (c) ENikS.  All rights reserved. */
//# sourceMappingURL=generators.js.map

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

///////////////////////////////////////////////////////////////////////////////
//
// Licensed under the Apache License, Version 2.0  ( the  "License" );  you may 
// not use this file except in compliance with the License.  You may  obtain  a 
// copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required  by  applicable  law  or  agreed  to  in  writing,  software 
// distributed under the License is distributed on an "AS  IS"  BASIS,  WITHOUT
// WARRANTIES OR CONDITIONS  OF  ANY  KIND, either express or implied.  See the 
// License for the specific  language  governing  permissions  and  limitations 
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
//-----------------------------------------------------------------------------
// Utility Functions
//-----------------------------------------------------------------------------
/** Default predicate, always true */
exports.trueFn = () => true;
/** Default transformer, returns self */
exports.selfFn = (o) => o;
/** Default Grouping */
exports.defGrouping = (a, b) => {
    if (!b[exports.CONST_KEY]) {
        b[exports.CONST_KEY] = a;
    }
    return b;
};
exports.defCompare = (a, b) => {
    return a == b ? 0 : a > b ? 1 : -1;
};
/** Returns default value for the type */
function getDefaultVal(type, value = undefined) {
    if (typeof type !== exports.CONST_STRING)
        throw new TypeError(exports.CONST_NO_STRING);
    // Handle simple types (primitives and plain function/object)
    switch (type) {
        case exports.CONST_BOOLEAN: return false;
        case exports.CONST_NUMBER: return 0;
        case exports.CONST_OBJECT: return null === value ? null : undefined;
        case exports.CONST_STRING: return exports.CONST_EMPTY_STRING;
        case exports.CONST_SYMBOL: return Symbol();
    }
    return undefined;
}
exports.getDefaultVal = getDefaultVal;
/** Returns a map of element bsed on extracted keys  **/
function getKeyedMap(iterable, keySelector, selElement = exports.selfFn) {
    let map = new Map();
    for (let value of iterable) {
        let key = keySelector(value);
        if (!key)
            continue;
        let group = map.get(key);
        if (!group) {
            group = [];
            map.set(key, group);
        }
        group.push(selElement(value));
    }
    return map;
}
exports.getKeyedMap = getKeyedMap;
function getKeyedMapFast(iterable, keySelector) {
    let map = new Map();
    for (let value of iterable) {
        let key = keySelector(value);
        if (!key)
            continue;
        let group = map.get(key);
        if (!group) {
            group = [];
            map.set(key, group);
        }
        group.push(value);
    }
    return map;
}
exports.getKeyedMapFast = getKeyedMapFast;
function getKeys(iterable, keySelector) {
    let set = new Set();
    if (keySelector) {
        for (let value of iterable) {
            let key = keySelector(value);
            if (!key)
                continue;
            set.add(key);
        }
    }
    else {
        for (let value of iterable) {
            if (!value)
                continue;
            set.add(value);
        }
    }
    return set;
}
exports.getKeys = getKeys;
//-----------------------------------------------------------------------------
//  Constants
//-----------------------------------------------------------------------------
exports.CONST_INVALID_KEY = "Key selector returned undefined Key";
exports.CONST_NO_STRING = "Type must be a string.";
exports.CONST_DUPLICATE = "Object already has property [key]";
exports.CONST_NOTHING_FOUND = "No element satisfies the condition in predicate";
exports.CONST_NO_ELEMENTS = "The source sequence is empty.";
exports.CONST_TOO_MANY = "More than one element satisfies the condition in predicate.";
exports.CONST_OUTOFRANGE = "Argument Out Of Range";
exports.CONST_KEY = "key";
exports.CONST_UNDEFINED = "undefined";
exports.CONST_LENGTH = "length";
exports.CONST_FUNCTION = "function";
exports.CONST_BOOLEAN = "boolean";
exports.CONST_NUMBER = "number";
exports.CONST_OBJECT = "object";
exports.CONST_STRING = "string";
exports.CONST_SYMBOL = "symbol";
exports.CONST_EMPTY_STRING = "";
/** Copyright (c) ENikS.  All rights reserved. */
//# sourceMappingURL=utilities.js.map

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

///////////////////////////////////////////////////////////////////////////////
//
// Licensed under the Apache License, Version 2.0  ( the  "License" );  you may 
// not use this file except in compliance with the License.  You may  obtain  a 
// copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required  by  applicable  law  or  agreed  to  in  writing,  software 
// distributed under the License is distributed on an "AS  IS"  BASIS,  WITHOUT
// WARRANTIES OR CONDITIONS  OF  ANY  KIND, either express or implied.  See the 
// License for the specific  language  governing  permissions  and  limitations 
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
//-----------------------------------------------------------------------------
//  CSharp Enumerator implementation
//-----------------------------------------------------------------------------
//  Gets Iterator and turns it into CSharpEnumerator 
class CSharpEnumerator {
    constructor(sourceIterator) {
        this._iterator = sourceIterator;
    }
    /** Gets the current element in the collection. */
    get Current() {
        return this._result.value;
    }
    /** Advances the enumerator to the next element of the collection.*/
    MoveNext() {
        this._result = this._iterator.next();
        return !this._result.done;
    }
    /** Sets the enumerator to its initial position, which is before the first
    * element in the collection. */
    Reset() {
        throw "JavaScript iterators could not be Reset";
    }
}
exports.CSharpEnumerator = CSharpEnumerator;
/** Copyright (c) ENikS.  All rights reserved. */
//# sourceMappingURL=iterators.js.map

/***/ }),
/* 244 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export CategoryValue */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamRanking; });
var CategoryValue = /** @class */ (function () {
    function CategoryValue(category, value) {
        this.category = category;
        this.value = value;
    }
    return CategoryValue;
}());

var TeamRanking = /** @class */ (function () {
    function TeamRanking() {
    }
    return TeamRanking;
}());

//# sourceMappingURL=team.ranking.js.map

/***/ }),
/* 245 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Categories; });
var Categories = /** @class */ (function () {
    function Categories() {
    }
    Categories.filter = function (id) {
        return this.list.filter(function (x) { return x.id == id; })[0];
    };
    Categories.hasValue = function (category) {
        return this.valueList.some(function (x) { return x.categoryName == category.name; });
    };
    Categories.value = function (category) {
        return this.valueList.filter(function (x) { return x.categoryName == category.name; })[0];
    };
    Categories.valueList = Array({ categoryName: "PTS", valueName: "vPts", valueProperty: "vPts" }, { categoryName: "3P", valueName: "v3P", valueProperty: "vC3PM" }, { categoryName: "REB", valueName: "vREB", valueProperty: "vReb" }, { categoryName: "AST", valueName: "vAST", valueProperty: "vAst" }, { categoryName: "STL", valueName: "vSTL", valueProperty: "vStl" }, { categoryName: "BLK", valueName: "vBLK", valueProperty: "vBlk" }, { categoryName: "FG%", valueName: "vFG%", valueProperty: "vFg" }, { categoryName: "FT%", valueName: "vFT%", valueProperty: "vFt" }, { categoryName: "TO", valueName: "vTO", valueProperty: "vTo" }, { categoryName: "A/TO", valueName: "vA/TO", valueProperty: "vAto" });
    Categories.list = Array({ id: 1, name: "PTS", description: "Points", property: "PTS", negative: false, ratio: false }, { id: 2, name: "3P", description: "3 pointers made", property: "C3PM", negative: false, ratio: false }, { id: 3, name: "REB", description: "Rebounds", property: "REB", negative: false, ratio: false }, { id: 4, name: "AST", description: "Assists", property: "AST", negative: false, ratio: false }, { id: 5, name: "STL", description: "Steals", property: "STL", negative: false, ratio: false }, { id: 6, name: "BLK", description: "Blocks", property: "BLK", negative: false, ratio: false }, { id: 7, name: "FG%", description: "Field Goal %", property: "FG_", negative: false, ratio: true }, { id: 8, name: "FT%", description: "Free Throw %", property: "FT_", negative: false, ratio: true }, { id: 9, name: "TO", description: "Turnovers", property: "TO", negative: true, ratio: false }, { id: 10, name: "3P%", description: "Threes %", property: "C3P_", negative: false, ratio: true }, { id: 11, name: "2P%", description: "Twos %", property: "C2P_", negative: false, ratio: true }, { id: 12, name: "AFG%", description: "Adjusted FG%", property: "AFG_", negative: false, ratio: true }, { id: 13, name: "DREB", description: "Defensive Rebounds", property: "DREB", negative: false, ratio: false }, { id: 14, name: "OREB", description: "Offensive Rebounds", property: "OREB", negative: false, ratio: false }, { id: 15, name: "DD", description: "Double Doubles", property: "DD", negative: false, ratio: false }, { id: 16, name: "TD", description: "Triple Doubles", property: "TD", negative: false, ratio: false }, { id: 17, name: "FG", description: "Field goals made", property: "FGM", negative: false, ratio: false }, { id: 18, name: "FGA", description: "Field goals attempted", property: "FGA", negative: false, ratio: false }, { id: 19, name: "FGM", description: "Field goals missed", property: "FGMS", negative: false, ratio: false }, { id: 20, name: "PF", description: "Fouls", property: "PF", negative: true, ratio: false }, { id: 21, name: "FT", description: "Free throws made", property: "FTM", negative: false, ratio: false }, { id: 22, name: "FTA", description: "Free throws attempted", property: "FTA", negative: false, ratio: false }, { id: 23, name: "FTM", description: "Free throws missed", property: "FTMS", negative: false, ratio: false }, { id: 24, name: "MIN", description: "Minutes", property: "M", negative: false, ratio: false }, { id: 25, name: "3PA", description: "3 pointers attempted", property: "FG3A", negative: false, ratio: false }, { id: 26, name: "3PM", description: "3 pointers missed", property: "FG3MS", negative: true, ratio: false }, { id: 27, name: "2P", description: "2 pointers made", property: "FG2M", negative: false, ratio: false }, { id: 28, name: "2PA", description: "2 pointers attempted", property: "FG2A", negative: false, ratio: false }, { id: 29, name: "A/TO", description: "Assist to Turnovers", property: "ATO", negative: false, ratio: true }, { id: 30, name: "NFT", description: "Net Free Throws", property: "NETFT", negative: false, ratio: false }, { id: 31, name: "TO/48", description: "Turnovers/48", property: "TRN48", negative: true, ratio: false }, { id: 32, name: "PT3/48", description: "Threes/48", property: "C3PM48", negative: false, ratio: false }, { id: 33, name: "DPG", description: "DPG (blk+stl+dr)", property: "DPG", negative: false, ratio: false }, { id: 34, name: "PPG", description: "PPG", property: "PTS", negative: false, ratio: false }, { id: 35, name: "S+B", description: "Steals+Blocks", property: "S_B", negative: false, ratio: false }, { id: 36, name: "PTS/48", description: "Points/48", property: "PTS48", negative: false, ratio: false }, { id: 37, name: "S/T", description: "Steals to Turnvers", property: "S_TO", negative: false, ratio: false }, { id: 38, name: "A-TO", description: "Assists - Turnovers", property: "A_TO", negative: false, ratio: false }, { id: 39, name: "TECH", description: "Technicals", property: "T", negative: true, ratio: false }, { id: 40, name: "PT3A/FGA", description: "3a/fga", property: "C3PA_FGA", negative: false, ratio: true }, { id: 41, name: "GS", description: "Games started", property: "GS", negative: false, ratio: false }, { id: 42, name: "FO", description: "Fouled out", property: "FO", negative: false, ratio: false }, { id: 43, name: "EJECT", description: "Ejections", property: "EJ", negative: true, ratio: false }, { id: 44, name: "FL", description: "Flagrants", property: "FL", negative: true, ratio: false }, { id: 45, name: "MPG", description: "Minutes per game", property: "MINS_strng", negative: true, ratio: false });
    return Categories;
}());

//# sourceMappingURL=categories.js.map

/***/ }),
/* 246 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return H2HResultPlayoffs; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__h2hresult_h2hresult_matchup__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_linq_es2015__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_linq_es2015___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_linq_es2015__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__h2hresult_h2hresult_matchup_calculator__ = __webpack_require__(101);



var H2HResultPlayoffs = /** @class */ (function () {
    function H2HResultPlayoffs() {
        this.playoffMatchups = new Array();
        this.playoffTree = new Array();
        this.h2HResultMatchupCalculator = new __WEBPACK_IMPORTED_MODULE_2__h2hresult_h2hresult_matchup_calculator__["a" /* H2HResultMatchupCalculator */]();
    }
    H2HResultPlayoffs.prototype.GetPlayoffMatchups = function (standings, playoffSize, week, draft) {
        var treeSize = 2;
        while (treeSize < playoffSize) {
            treeSize = treeSize * 2;
        }
        var tree = new Array(treeSize / 2);
        standings = __WEBPACK_IMPORTED_MODULE_1_linq_es2015__["AsEnumerable"](standings).OrderByDescending(function (x) { return x.totalPoints; }).ToArray();
        var teamstats = new Object();
        draft.categories.forEach(function (element) {
            teamstats[element.name] = 0;
        });
        if (tree.length == 2) {
            tree[0] = new __WEBPACK_IMPORTED_MODULE_0__h2hresult_h2hresult_matchup__["a" /* H2hResultMatchup */](JSON.parse(JSON.stringify(teamstats)), JSON.parse(JSON.stringify(teamstats)), +standings[0].team.id, +standings[3].team.id, week, +standings[0].totalPoints, +standings[3].totalPoints);
            tree[1] = new __WEBPACK_IMPORTED_MODULE_0__h2hresult_h2hresult_matchup__["a" /* H2hResultMatchup */](JSON.parse(JSON.stringify(teamstats)), JSON.parse(JSON.stringify(teamstats)), +standings[2].team.id, +standings[1].team.id, week, +standings[2].totalPoints, +standings[1].totalPoints);
        }
        else {
            tree[0] = new __WEBPACK_IMPORTED_MODULE_0__h2hresult_h2hresult_matchup__["a" /* H2hResultMatchup */](JSON.parse(JSON.stringify(teamstats)), JSON.parse(JSON.stringify(teamstats)), +standings[0].team.id, null, week, +standings[0].totalPoints, 0);
            tree[1] = new __WEBPACK_IMPORTED_MODULE_0__h2hresult_h2hresult_matchup__["a" /* H2hResultMatchup */](JSON.parse(JSON.stringify(teamstats)), JSON.parse(JSON.stringify(teamstats)), +standings[3].team.id, +standings[4].team.id, week, +standings[3].totalPoints, +standings[4].totalPoints);
            tree[2] = new __WEBPACK_IMPORTED_MODULE_0__h2hresult_h2hresult_matchup__["a" /* H2hResultMatchup */](JSON.parse(JSON.stringify(teamstats)), JSON.parse(JSON.stringify(teamstats)), +standings[2].team.id, +standings[5].team.id, week, +standings[2].totalPoints, +standings[5].totalPoints);
            tree[3] = new __WEBPACK_IMPORTED_MODULE_0__h2hresult_h2hresult_matchup__["a" /* H2hResultMatchup */](JSON.parse(JSON.stringify(teamstats)), JSON.parse(JSON.stringify(teamstats)), null, +standings[1].team.id, week, 0, +standings[1].totalPoints);
            if (playoffSize == 8) {
                tree[0].team2 = +standings[7].team.id;
                tree[3].team1 = +standings[6].team.id;
            }
        }
        return tree;
    };
    H2HResultPlayoffs.prototype.GetPlayoffTreeRound = function (week, weeklyProduction, standings, playoffSize, draft, projectedPck) {
        var _this = this;
        var previousRound = this.playoffTree.filter(function (x) { return x.week == week - 1; });
        if (!previousRound && this.playoffTree) {
            console.log("error while building a playoff tree. No previous round calculated");
            return;
        }
        var tree = (previousRound && previousRound.length) ? this.GetPreviousRoundWinners(previousRound, draft) : this.GetPlayoffMatchups(standings, playoffSize, week, draft);
        tree.forEach(function (matchup) { matchup = _this.h2HResultMatchupCalculator.UpdateMatchupProduction(matchup, weeklyProduction, draft.categories, projectedPck); });
        this.playoffTree = this.playoffTree.concat(tree);
    };
    H2HResultPlayoffs.prototype.GetPreviousRoundWinners = function (previousRound, draft) {
        var teamstats = new Object();
        draft.categories.forEach(function (element) {
            teamstats[element.name] = 0;
        });
        var winners = new Array();
        var week = previousRound[0].week + 1;
        for (var i = 0; i < previousRound.length; i = i + 2) {
            var m1winner = previousRound[i].team1score > previousRound[i].team2score
                || previousRound[i].team1score == previousRound[i].team2score
                    && previousRound[i].team1standing > previousRound[i].team2standing ?
                previousRound[i].team1 : previousRound[i].team2;
            var m1winnerRS = previousRound[i].team1score > previousRound[i].team2score
                || previousRound[i].team1score == previousRound[i].team2score
                    && previousRound[i].team1standing > previousRound[i].team2standing ?
                previousRound[i].team1standing : previousRound[i].team2standing;
            var m2winner = previousRound[i + 1].team1score > previousRound[i + 1].team2score
                || previousRound[i + 1].team1score == previousRound[i + 1].team2score
                    && previousRound[i + 1].team1standing > previousRound[i + 1].team2standing ?
                previousRound[i + 1].team1 : previousRound[i + 1].team2;
            var m2winnerRS = previousRound[i + 1].team1score > previousRound[i + 1].team2score
                || previousRound[i + 1].team1score == previousRound[i + 1].team2score
                    && previousRound[i + 1].team1standing > previousRound[i + 1].team2standing ?
                previousRound[i + 1].team1standing : previousRound[i + 1].team2standing;
            winners.push(new __WEBPACK_IMPORTED_MODULE_0__h2hresult_h2hresult_matchup__["a" /* H2hResultMatchup */](JSON.parse(JSON.stringify(teamstats)), JSON.parse(JSON.stringify(teamstats)), m1winner, m2winner, week, m1winnerRS, m2winnerRS));
        }
        return winners;
    };
    return H2HResultPlayoffs;
}());

//# sourceMappingURL=h2hresult.playoffs.js.map

/***/ }),
/* 247 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return H2HResultCatCalculator; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__draft_result_draft_result__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_linq_es2015__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_linq_es2015___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_linq_es2015__);


var H2HResultCatCalculator = /** @class */ (function () {
    function H2HResultCatCalculator() {
    }
    H2HResultCatCalculator.prototype.JoinStatLines = function (baseLine, addedLine) {
        baseLine.statistics.M = (baseLine.statistics.M | 0) + (addedLine.statistics.M | 0);
        baseLine.statistics.FGM = (baseLine.statistics.FGM | 0) + (addedLine.statistics.FGM | 0);
        baseLine.statistics.FGA = (baseLine.statistics.FGA | 0) + (addedLine.statistics.FGA | 0);
        baseLine.statistics.C3PA = (baseLine.statistics.C3PA | 0) + (addedLine.statistics.C3PA | 0);
        baseLine.statistics.FGMS = (baseLine.statistics.FGMS | 0) + (addedLine.statistics.FGMS | 0);
        baseLine.statistics.C3PM48 = (baseLine.statistics.C3PM48 | 0) + (addedLine.statistics.C3PM48 | 0);
        baseLine.statistics.C3PM = (baseLine.statistics.C3PM | 0) + (addedLine.statistics.C3PM | 0);
        baseLine.statistics.C3PMS = (baseLine.statistics.C3PMS | 0) + (addedLine.statistics.C3PMS | 0);
        baseLine.statistics.FTA = (baseLine.statistics.FTA | 0) + (addedLine.statistics.FTA | 0);
        baseLine.statistics.FTM = (baseLine.statistics.FTM | 0) + (addedLine.statistics.FTM | 0);
        baseLine.statistics.FTMS = (baseLine.statistics.FTMS | 0) + (addedLine.statistics.FTMS | 0);
        baseLine.statistics.NETFT = (baseLine.statistics.NETFT | 0) + (addedLine.statistics.NETFT | 0);
        baseLine.statistics.C2PA = (baseLine.statistics.C2PA | 0) + (addedLine.statistics.C2PA | 0);
        baseLine.statistics.C2PM = (baseLine.statistics.C2PM | 0) + (addedLine.statistics.C2PM | 0);
        baseLine.statistics.REB = (baseLine.statistics.REB | 0) + (addedLine.statistics.REB | 0);
        baseLine.statistics.OREB = (baseLine.statistics.OREB | 0) + (addedLine.statistics.OREB | 0);
        baseLine.statistics.DREB = (baseLine.statistics.DREB | 0) + (addedLine.statistics.DREB | 0);
        baseLine.statistics.BLK = (baseLine.statistics.BLK | 0) + (addedLine.statistics.BLK | 0);
        baseLine.statistics.SB = (baseLine.statistics.SB | 0) + (addedLine.statistics.SB | 0);
        baseLine.statistics.PTS48 = (baseLine.statistics.PTS48 | 0) + (addedLine.statistics.PTS48 | 0);
        baseLine.statistics.DPG = (baseLine.statistics.DPG | 0) + (addedLine.statistics.DPG | 0);
        baseLine.statistics.A_TO = (baseLine.statistics.A_TO | 0) + (addedLine.statistics.A_TO | 0);
        baseLine.statistics.TO = (baseLine.statistics.TO | 0) + (addedLine.statistics.TO | 0);
        baseLine.statistics.AST = (baseLine.statistics.AST | 0) + (addedLine.statistics.AST | 0);
        baseLine.statistics.STL = (baseLine.statistics.STL | 0) + (addedLine.statistics.STL | 0);
        baseLine.statistics.TRN48 = (baseLine.statistics.TRN48 | 0) + (addedLine.statistics.TRN48 | 0);
        baseLine.statistics.PF = (baseLine.statistics.PF | 0) + (addedLine.statistics.PF | 0);
        baseLine.statistics.PTS = (baseLine.statistics.PTS | 0) + (addedLine.statistics.PTS | 0);
        baseLine.statistics.T = (baseLine.statistics.T | 0) + (addedLine.statistics.T | 0);
        baseLine.statistics.DD = (baseLine.statistics.DD | 0) + (addedLine.statistics.DD | 0);
        baseLine.statistics.TD = (baseLine.statistics.TD | 0) + (addedLine.statistics.TD | 0);
        baseLine.statistics.EJ = (baseLine.statistics.EJ | 0) + (addedLine.statistics.EJ | 0);
        baseLine.statistics.FL = (baseLine.statistics.FL | 0) + (addedLine.statistics.FL | 0);
        baseLine.statistics.GS = (baseLine.statistics.GS | 0) + (addedLine.statistics.GS | 0);
        return baseLine;
    };
    H2HResultCatCalculator.prototype.MultiplyRankingValues = function (rankingList) {
        var rankingPlayer = rankingList.result.player;
        var ranking = rankingPlayer.statistics;
        if (ranking.M)
            ranking.M = ranking.M * rankingList.slots;
        if (ranking.C3PA)
            ranking.C3PA = Math.round(ranking.C3PA * rankingList.slots);
        else {
            ranking.C3PA = Math.round(ranking.FGA * ranking.C3PA_FGA);
        }
        if (ranking.FGA)
            ranking.FGA = Math.round(ranking.FGA * rankingList.slots);
        if (ranking.FGM)
            ranking.FGM = Math.round(ranking.FGM * rankingList.slots);
        else if (ranking.FG_) {
            ranking.FGM = Math.round(ranking.FGA * ranking.FG_);
        }
        if (ranking.FGMS)
            ranking.FGMS = Math.round(ranking.FGMS * rankingList.slots);
        if (ranking.C3PM48)
            ranking.C3PM48 = Math.round(ranking.C3PM48 * rankingList.slots);
        if (ranking.C3PM)
            ranking.C3PM = Math.round(ranking.C3PM * rankingList.slots);
        else {
            ranking.C3PM = Math.round(ranking.C3PA * ranking.C3P_);
        }
        if (ranking.C3PMS)
            ranking.C3PMS = Math.round(ranking.C3PMS * rankingList.slots);
        if (ranking.FTA)
            ranking.FTA = Math.round(ranking.FTA * rankingList.slots);
        if (ranking.FTM)
            ranking.FTM = Math.round(ranking.FTM * rankingList.slots);
        else
            ranking.FTM = Math.round(ranking.FTA * ranking.FT_);
        if (ranking.FTMS)
            ranking.FTMS = Math.round(ranking.FTMS * rankingList.slots);
        if (ranking.NETFT)
            ranking.NETFT = Math.round(ranking.NETFT * rankingList.slots);
        if (ranking.C2PA)
            ranking.C2PA = Math.round(ranking.C2PA * rankingList.slots);
        if (ranking.C2PM)
            ranking.C2PM = Math.round(ranking.C2PM * rankingList.slots);
        else
            ranking.C2PM = Math.round(ranking.C2PA * ranking.C2P_);
        if (ranking.REB)
            ranking.REB = Math.round(ranking.REB * rankingList.slots);
        if (ranking.OREB)
            ranking.OREB = Math.round(ranking.OREB * rankingList.slots);
        if (ranking.DREB)
            ranking.DREB = Math.round(ranking.DREB * rankingList.slots);
        if (ranking.BLK)
            ranking.BLK = Math.round(ranking.BLK * rankingList.slots);
        if (ranking.SB)
            ranking.SB = Math.round(ranking.SB * rankingList.slots);
        if (ranking.PTS48)
            ranking.PTS48 = Math.round(ranking.PTS48 * rankingList.slots);
        if (ranking.DPG)
            ranking.DPG = Math.round(ranking.DPG * rankingList.slots);
        if (ranking.A_TO)
            ranking.A_TO = Math.round(ranking.A_TO * rankingList.slots);
        if (ranking.TO)
            ranking.TO = Math.round(ranking.TO * rankingList.slots);
        if (ranking.AST)
            ranking.AST = Math.round(ranking.AST * rankingList.slots);
        else {
            ranking.AST = Math.round(ranking.TO * ranking.ATO);
        }
        if (ranking.STL)
            ranking.STL = Math.round(ranking.STL * rankingList.slots);
        else {
            ranking.STL = Math.round(ranking.TO * ranking.S_TO);
        }
        if (ranking.TRN48)
            ranking.TRN48 = Math.round(ranking.TRN48 * rankingList.slots);
        if (ranking.PF)
            ranking.PF = Math.round(ranking.PF * rankingList.slots);
        if (ranking.PTS)
            ranking.PTS = Math.round(ranking.PTS * rankingList.slots);
        if (ranking.T)
            ranking.T = Math.round(ranking.T * rankingList.slots);
        if (ranking.DD)
            ranking.DD = Math.round(ranking.DD * rankingList.slots);
        if (ranking.TD)
            ranking.TD = Math.round(ranking.TD * rankingList.slots);
        if (ranking.EJ)
            ranking.EJ = Math.round(ranking.EJ * rankingList.slots);
        if (ranking.FL)
            ranking.FL = Math.round(ranking.FL * rankingList.slots);
        if (ranking.GS)
            ranking.GS = Math.round(ranking.GS * rankingList.slots);
        if (ranking.FO)
            ranking.FO = Math.round(ranking.FO * rankingList.slots);
        return rankingPlayer;
    };
    H2HResultCatCalculator.prototype.GroupWeeklyProduction = function (ranking) {
        var retValue = __WEBPACK_IMPORTED_MODULE_1_linq_es2015__["asEnumerable"](ranking).GroupBy(function (r) { return r.result.teamDefinition.id; }, function (r) { return r; }, function (team, results) {
            var teamPlayers = __WEBPACK_IMPORTED_MODULE_1_linq_es2015__["asEnumerable"](results).Select(function (r) { return r.result.player; });
            var basePlayer = teamPlayers.First();
            var basePick = results[0].result;
            if (teamPlayers.Count() > 1) {
                if (basePlayer.statistics.M != null)
                    basePlayer.statistics.M = teamPlayers.Sum(function (p) { return p.statistics.M || 0; });
                if (basePlayer.statistics.FGM != null)
                    basePlayer.statistics.FGM = teamPlayers.Sum(function (p) { return p.statistics.FGM || 0; });
                if (basePlayer.statistics.FGA != null)
                    basePlayer.statistics.FGA = teamPlayers.Sum(function (p) { return p.statistics.FGA || 0; });
                if (basePlayer.statistics.C3PA != null)
                    basePlayer.statistics.C3PA = teamPlayers.Sum(function (p) { return p.statistics.C3PA || 0; });
                if (basePlayer.statistics.FGMS != null)
                    basePlayer.statistics.FGMS = teamPlayers.Sum(function (p) { return p.statistics.FGMS || 0; });
                if (basePlayer.statistics.C3PM48 != null)
                    basePlayer.statistics.C3PM48 = teamPlayers.Sum(function (p) { return p.statistics.C3PM48 || 0; });
                if (basePlayer.statistics.C3PM != null)
                    basePlayer.statistics.C3PM = teamPlayers.Sum(function (p) { return p.statistics.C3PM || 0; });
                if (basePlayer.statistics.C3PMS != null)
                    basePlayer.statistics.C3PMS = teamPlayers.Sum(function (p) { return p.statistics.C3PMS || 0; });
                if (basePlayer.statistics.FTA != null)
                    basePlayer.statistics.FTA = teamPlayers.Sum(function (p) { return p.statistics.FTA || 0; });
                if (basePlayer.statistics.FTM != null)
                    basePlayer.statistics.FTM = teamPlayers.Sum(function (p) { return p.statistics.FTM || 0; });
                if (basePlayer.statistics.FTMS != null)
                    basePlayer.statistics.FTMS = teamPlayers.Sum(function (p) { return p.statistics.FTMS || 0; });
                if (basePlayer.statistics.C2PM != null)
                    basePlayer.statistics.C2PM = teamPlayers.Sum(function (p) { return p.statistics.C2PM || 0; });
                if (basePlayer.statistics.REB != null)
                    basePlayer.statistics.REB = teamPlayers.Sum(function (p) { return p.statistics.REB || 0; });
                if (basePlayer.statistics.OREB != null)
                    basePlayer.statistics.OREB = teamPlayers.Sum(function (p) { return p.statistics.OREB || 0; });
                if (basePlayer.statistics.DREB != null)
                    basePlayer.statistics.DREB = teamPlayers.Sum(function (p) { return p.statistics.DREB || 0; });
                if (basePlayer.statistics.C2PA != null)
                    basePlayer.statistics.C2PA = teamPlayers.Sum(function (p) { return p.statistics.C2PA || 0; });
                if (basePlayer.statistics.BLK != null)
                    basePlayer.statistics.BLK = teamPlayers.Sum(function (p) { return p.statistics.BLK || 0; });
                if (basePlayer.statistics.NETFT != null)
                    basePlayer.statistics.NETFT = teamPlayers.Sum(function (p) { return p.statistics.NETFT || 0; });
                if (basePlayer.statistics.SB != null)
                    basePlayer.statistics.SB = teamPlayers.Sum(function (p) { return p.statistics.SB || 0; });
                if (basePlayer.statistics.PTS48 != null)
                    basePlayer.statistics.PTS48 = teamPlayers.Sum(function (p) { return p.statistics.PTS48 || 0; });
                if (basePlayer.statistics.DPG != null)
                    basePlayer.statistics.DPG = teamPlayers.Sum(function (p) { return p.statistics.DPG || 0; });
                if (basePlayer.statistics.A_TO != null)
                    basePlayer.statistics.A_TO = teamPlayers.Sum(function (p) { return p.statistics.A_TO || 0; });
                if (basePlayer.statistics.TO != null)
                    basePlayer.statistics.TO = teamPlayers.Sum(function (p) { return p.statistics.TO || 0; });
                if (basePlayer.statistics.AST != null)
                    basePlayer.statistics.AST = teamPlayers.Sum(function (p) { return p.statistics.AST || 0; });
                if (basePlayer.statistics.STL != null)
                    basePlayer.statistics.STL = teamPlayers.Sum(function (p) { return p.statistics.STL || 0; });
                if (basePlayer.statistics.TRN48 != null)
                    basePlayer.statistics.TRN48 = teamPlayers.Sum(function (p) { return p.statistics.TRN48 || 0; });
                if (basePlayer.statistics.PF != null)
                    basePlayer.statistics.PF = teamPlayers.Sum(function (p) { return p.statistics.PF || 0; });
                if (basePlayer.statistics.PTS != null)
                    basePlayer.statistics.PTS = teamPlayers.Sum(function (p) { return p.statistics.PTS || 0; });
                if (basePlayer.statistics.T != null)
                    basePlayer.statistics.T = teamPlayers.Sum(function (p) { return p.statistics.T || 0; });
                if (basePlayer.statistics.DD != null)
                    basePlayer.statistics.DD = teamPlayers.Sum(function (p) { return p.statistics.DD || 0; });
                if (basePlayer.statistics.TD != null)
                    basePlayer.statistics.TD = teamPlayers.Sum(function (p) { return p.statistics.TD || 0; });
                if (basePlayer.statistics.EJ != null)
                    basePlayer.statistics.EJ = teamPlayers.Sum(function (p) { return p.statistics.EJ || 0; });
                if (basePlayer.statistics.FL != null)
                    basePlayer.statistics.FL = teamPlayers.Sum(function (p) { return p.statistics.FL || 0; });
                if (basePlayer.statistics.GS != null)
                    basePlayer.statistics.GS = teamPlayers.Sum(function (p) { return p.statistics.GS || 0; });
            }
            return new __WEBPACK_IMPORTED_MODULE_0__draft_result_draft_result__["a" /* DraftResult */](basePick.pickNumber, basePlayer, basePick.teamDefinition, basePick.price); //{ picknumber: basePick.pickNumber, player: basePlayer, teamDefinition: team, price: null };// 
        });
        //return retValue.Select(r => r.);
        var weekByTeamTS = new Array();
        retValue.ToArray().forEach(function (res) {
            weekByTeamTS.push(res);
        });
        // ranking.forEach(element => {
        //     var currentDraftResult = Enumerable.asEnumerable(weekByTeamTS)
        //         .FirstOrDefault(r => r.teamDefinition.name == element.result.teamDefinition.name);
        //     if(!currentDraftResult){
        //         currentDraftResult = element.result;
        //         //currentDraftResult.player = this.MultiplyRankingValues(currentDraftResult);
        //         weekByTeamTS.push(currentDraftResult);
        //     }
        //     else {
        //         currentDraftResult.player = this.JoinStatLines(
        //             currentDraftResult.player,
        //             //this.MultiplyRankingValues(
        //                 element.result.player//)
        //         );
        //     }
        // });
        return weekByTeamTS;
    };
    return H2HResultCatCalculator;
}());

//# sourceMappingURL=h2hresult.cat.calculator.js.map

/***/ }),
/* 248 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DraftResultItem; });
var DraftResultItem = /** @class */ (function () {
    function DraftResultItem(result, slots, week) {
        this.result = result;
        this.slots = slots;
        this.week = week;
    }
    return DraftResultItem;
}());

//# sourceMappingURL=draft.result.item.js.map

/***/ }),
/* 249 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Schedule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__h2hresult_schedule_week__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_linq_es2015__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_linq_es2015___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_linq_es2015__);


var Schedule = /** @class */ (function () {
    function Schedule() {
    }
    Schedule.prototype.CreateSchedule = function (h2hResult, myTeam, teams) {
        this.weeks = __WEBPACK_IMPORTED_MODULE_1_linq_es2015__["asEnumerable"](h2hResult.rsMatchups)
            .Where(function (m) { return m.team1 == myTeam || m.team2 == myTeam; }).OrderBy(function (m) { return m.week; })
            .Select(function (m) {
            return new __WEBPACK_IMPORTED_MODULE_0__h2hresult_schedule_week__["a" /* ScheduleWeek */](m.team1, m.team2, m.team1score, m.team2score, m.week, myTeam, teams);
        }).ToArray()
            .concat(__WEBPACK_IMPORTED_MODULE_1_linq_es2015__["asEnumerable"](h2hResult.playoffMatchups)
            .Where(function (m) { return (m.team1 == myTeam || m.team2 == myTeam) && m.team1 != null && m.team2 != null; }).OrderBy(function (m) { return m.week; }).Select(function (m) {
            return new __WEBPACK_IMPORTED_MODULE_0__h2hresult_schedule_week__["a" /* ScheduleWeek */](m.team1, m.team2, m.team1score, m.team2score, m.week, myTeam, teams);
        }).ToArray());
        return this.weeks;
    };
    return Schedule;
}());

//# sourceMappingURL=h2hresult.schedule.js.map

/***/ }),
/* 250 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScheduleWeek; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_linq_es2015__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_linq_es2015___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_linq_es2015__);

var ScheduleWeek = /** @class */ (function () {
    function ScheduleWeek(team1, team2, team1score, team2score, week, myTeam, teams) {
        this.week = week;
        this.myScore = (team1 == myTeam) ? team1score : team2score;
        this.opponentScore = (team1 != myTeam) ? team1score : team2score;
        this.opponent = (team1 == myTeam) ?
            __WEBPACK_IMPORTED_MODULE_0_linq_es2015__["asEnumerable"](teams).First(function (t) { return +t.id == team2; }).name :
            __WEBPACK_IMPORTED_MODULE_0_linq_es2015__["asEnumerable"](teams).Any(function (t) { return +t.id == team1; }) ?
                __WEBPACK_IMPORTED_MODULE_0_linq_es2015__["asEnumerable"](teams).First(function (t) { return +t.id == team1; }).name :
                null;
        this.result = (this.myScore > this.opponentScore) ? 'Win' :
            (this.myScore < this.opponentScore) ? 'Loss' : 'Tie';
    }
    return ScheduleWeek;
}());

//# sourceMappingURL=h2hresult.schedule.week.js.map

/***/ })
/******/ ]);
//# sourceMappingURL=web-worker.bundle.js.map