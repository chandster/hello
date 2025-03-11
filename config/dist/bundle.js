/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/minisearch/dist/es/index.js":
/*!**************************************************!*\
  !*** ./node_modules/minisearch/dist/es/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MiniSearch)
/* harmony export */ });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/** @ignore */
var ENTRIES = 'ENTRIES';
/** @ignore */
var KEYS = 'KEYS';
/** @ignore */
var VALUES = 'VALUES';
/** @ignore */
var LEAF = '';
/**
 * @private
 */
var TreeIterator = /** @class */ (function () {
    function TreeIterator(set, type) {
        var node = set._tree;
        var keys = Array.from(node.keys());
        this.set = set;
        this._type = type;
        this._path = keys.length > 0 ? [{ node: node, keys: keys }] : [];
    }
    TreeIterator.prototype.next = function () {
        var value = this.dive();
        this.backtrack();
        return value;
    };
    TreeIterator.prototype.dive = function () {
        if (this._path.length === 0) {
            return { done: true, value: undefined };
        }
        var _a = last$1(this._path), node = _a.node, keys = _a.keys;
        if (last$1(keys) === LEAF) {
            return { done: false, value: this.result() };
        }
        var child = node.get(last$1(keys));
        this._path.push({ node: child, keys: Array.from(child.keys()) });
        return this.dive();
    };
    TreeIterator.prototype.backtrack = function () {
        if (this._path.length === 0) {
            return;
        }
        var keys = last$1(this._path).keys;
        keys.pop();
        if (keys.length > 0) {
            return;
        }
        this._path.pop();
        this.backtrack();
    };
    TreeIterator.prototype.key = function () {
        return this.set._prefix + this._path
            .map(function (_a) {
            var keys = _a.keys;
            return last$1(keys);
        })
            .filter(function (key) { return key !== LEAF; })
            .join('');
    };
    TreeIterator.prototype.value = function () {
        return last$1(this._path).node.get(LEAF);
    };
    TreeIterator.prototype.result = function () {
        switch (this._type) {
            case VALUES: return this.value();
            case KEYS: return this.key();
            default: return [this.key(), this.value()];
        }
    };
    TreeIterator.prototype[Symbol.iterator] = function () {
        return this;
    };
    return TreeIterator;
}());
var last$1 = function (array) {
    return array[array.length - 1];
};

/**
 * @ignore
 */
var fuzzySearch = function (node, query, maxDistance) {
    var results = new Map();
    if (query === undefined)
        return results;
    // Number of columns in the Levenshtein matrix.
    var n = query.length + 1;
    // Matching terms can never be longer than N + maxDistance.
    var m = n + maxDistance;
    // Fill first matrix row and column with numbers: 0 1 2 3 ...
    var matrix = new Uint8Array(m * n).fill(maxDistance + 1);
    for (var j = 0; j < n; ++j)
        matrix[j] = j;
    for (var i = 1; i < m; ++i)
        matrix[i * n] = i;
    recurse(node, query, maxDistance, results, matrix, 1, n, '');
    return results;
};
// Modified version of http://stevehanov.ca/blog/?id=114
// This builds a Levenshtein matrix for a given query and continuously updates
// it for nodes in the radix tree that fall within the given maximum edit
// distance. Keeping the same matrix around is beneficial especially for larger
// edit distances.
//
//           k   a   t   e   <-- query
//       0   1   2   3   4
//   c   1   1   2   3   4
//   a   2   2   1   2   3
//   t   3   3   2   1  [2]  <-- edit distance
//   ^
//   ^ term in radix tree, rows are added and removed as needed
var recurse = function (node, query, maxDistance, results, matrix, m, n, prefix) {
    var e_1, _a;
    var offset = m * n;
    try {
        key: for (var _b = __values(node.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            if (key === LEAF) {
                // We've reached a leaf node. Check if the edit distance acceptable and
                // store the result if it is.
                var distance = matrix[offset - 1];
                if (distance <= maxDistance) {
                    results.set(prefix, [node.get(key), distance]);
                }
            }
            else {
                // Iterate over all characters in the key. Update the Levenshtein matrix
                // and check if the minimum distance in the last row is still within the
                // maximum edit distance. If it is, we can recurse over all child nodes.
                var i = m;
                for (var pos = 0; pos < key.length; ++pos, ++i) {
                    var char = key[pos];
                    var thisRowOffset = n * i;
                    var prevRowOffset = thisRowOffset - n;
                    // Set the first column based on the previous row, and initialize the
                    // minimum distance in the current row.
                    var minDistance = matrix[thisRowOffset];
                    var jmin = Math.max(0, i - maxDistance - 1);
                    var jmax = Math.min(n - 1, i + maxDistance);
                    // Iterate over remaining columns (characters in the query).
                    for (var j = jmin; j < jmax; ++j) {
                        var different = char !== query[j];
                        // It might make sense to only read the matrix positions used for
                        // deletion/insertion if the characters are different. But we want to
                        // avoid conditional reads for performance reasons.
                        var rpl = matrix[prevRowOffset + j] + +different;
                        var del = matrix[prevRowOffset + j + 1] + 1;
                        var ins = matrix[thisRowOffset + j] + 1;
                        var dist = matrix[thisRowOffset + j + 1] = Math.min(rpl, del, ins);
                        if (dist < minDistance)
                            minDistance = dist;
                    }
                    // Because distance will never decrease, we can stop. There will be no
                    // matching child nodes.
                    if (minDistance > maxDistance) {
                        continue key;
                    }
                }
                recurse(node.get(key), query, maxDistance, results, matrix, i, n, prefix + key);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
};

/**
 * A class implementing the same interface as a standard JavaScript
 * [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
 * with string keys, but adding support for efficiently searching entries with
 * prefix or fuzzy search. This class is used internally by {@link MiniSearch}
 * as the inverted index data structure. The implementation is a radix tree
 * (compressed prefix tree).
 *
 * Since this class can be of general utility beyond _MiniSearch_, it is
 * exported by the `minisearch` package and can be imported (or required) as
 * `minisearch/SearchableMap`.
 *
 * @typeParam T  The type of the values stored in the map.
 */
var SearchableMap = /** @class */ (function () {
    /**
     * The constructor is normally called without arguments, creating an empty
     * map. In order to create a {@link SearchableMap} from an iterable or from an
     * object, check {@link SearchableMap.from} and {@link
     * SearchableMap.fromObject}.
     *
     * The constructor arguments are for internal use, when creating derived
     * mutable views of a map at a prefix.
     */
    function SearchableMap(tree, prefix) {
        if (tree === void 0) { tree = new Map(); }
        if (prefix === void 0) { prefix = ''; }
        this._size = undefined;
        this._tree = tree;
        this._prefix = prefix;
    }
    /**
     * Creates and returns a mutable view of this {@link SearchableMap},
     * containing only entries that share the given prefix.
     *
     * ### Usage:
     *
     * ```javascript
     * let map = new SearchableMap()
     * map.set("unicorn", 1)
     * map.set("universe", 2)
     * map.set("university", 3)
     * map.set("unique", 4)
     * map.set("hello", 5)
     *
     * let uni = map.atPrefix("uni")
     * uni.get("unique") // => 4
     * uni.get("unicorn") // => 1
     * uni.get("hello") // => undefined
     *
     * let univer = map.atPrefix("univer")
     * univer.get("unique") // => undefined
     * univer.get("universe") // => 2
     * univer.get("university") // => 3
     * ```
     *
     * @param prefix  The prefix
     * @return A {@link SearchableMap} representing a mutable view of the original
     * Map at the given prefix
     */
    SearchableMap.prototype.atPrefix = function (prefix) {
        var e_1, _a;
        if (!prefix.startsWith(this._prefix)) {
            throw new Error('Mismatched prefix');
        }
        var _b = __read(trackDown(this._tree, prefix.slice(this._prefix.length)), 2), node = _b[0], path = _b[1];
        if (node === undefined) {
            var _c = __read(last(path), 2), parentNode = _c[0], key = _c[1];
            try {
                for (var _d = __values(parentNode.keys()), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var k = _e.value;
                    if (k !== LEAF && k.startsWith(key)) {
                        var node_1 = new Map();
                        node_1.set(k.slice(key.length), parentNode.get(k));
                        return new SearchableMap(node_1, prefix);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return new SearchableMap(node, prefix);
    };
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear
     */
    SearchableMap.prototype.clear = function () {
        this._size = undefined;
        this._tree.clear();
    };
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete
     * @param key  Key to delete
     */
    SearchableMap.prototype.delete = function (key) {
        this._size = undefined;
        return remove(this._tree, key);
    };
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries
     * @return An iterator iterating through `[key, value]` entries.
     */
    SearchableMap.prototype.entries = function () {
        return new TreeIterator(this, ENTRIES);
    };
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach
     * @param fn  Iteration function
     */
    SearchableMap.prototype.forEach = function (fn) {
        var e_2, _a;
        try {
            for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                fn(key, value, this);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    /**
     * Returns a Map of all the entries that have a key within the given edit
     * distance from the search key. The keys of the returned Map are the matching
     * keys, while the values are two-element arrays where the first element is
     * the value associated to the key, and the second is the edit distance of the
     * key to the search key.
     *
     * ### Usage:
     *
     * ```javascript
     * let map = new SearchableMap()
     * map.set('hello', 'world')
     * map.set('hell', 'yeah')
     * map.set('ciao', 'mondo')
     *
     * // Get all entries that match the key 'hallo' with a maximum edit distance of 2
     * map.fuzzyGet('hallo', 2)
     * // => Map(2) { 'hello' => ['world', 1], 'hell' => ['yeah', 2] }
     *
     * // In the example, the "hello" key has value "world" and edit distance of 1
     * // (change "e" to "a"), the key "hell" has value "yeah" and edit distance of 2
     * // (change "e" to "a", delete "o")
     * ```
     *
     * @param key  The search key
     * @param maxEditDistance  The maximum edit distance (Levenshtein)
     * @return A Map of the matching keys to their value and edit distance
     */
    SearchableMap.prototype.fuzzyGet = function (key, maxEditDistance) {
        return fuzzySearch(this._tree, key, maxEditDistance);
    };
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get
     * @param key  Key to get
     * @return Value associated to the key, or `undefined` if the key is not
     * found.
     */
    SearchableMap.prototype.get = function (key) {
        var node = lookup(this._tree, key);
        return node !== undefined ? node.get(LEAF) : undefined;
    };
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has
     * @param key  Key
     * @return True if the key is in the map, false otherwise
     */
    SearchableMap.prototype.has = function (key) {
        var node = lookup(this._tree, key);
        return node !== undefined && node.has(LEAF);
    };
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys
     * @return An `Iterable` iterating through keys
     */
    SearchableMap.prototype.keys = function () {
        return new TreeIterator(this, KEYS);
    };
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set
     * @param key  Key to set
     * @param value  Value to associate to the key
     * @return The {@link SearchableMap} itself, to allow chaining
     */
    SearchableMap.prototype.set = function (key, value) {
        if (typeof key !== 'string') {
            throw new Error('key must be a string');
        }
        this._size = undefined;
        var node = createPath(this._tree, key);
        node.set(LEAF, value);
        return this;
    };
    Object.defineProperty(SearchableMap.prototype, "size", {
        /**
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size
         */
        get: function () {
            if (this._size) {
                return this._size;
            }
            /** @ignore */
            this._size = 0;
            var iter = this.entries();
            while (!iter.next().done)
                this._size += 1;
            return this._size;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Updates the value at the given key using the provided function. The function
     * is called with the current value at the key, and its return value is used as
     * the new value to be set.
     *
     * ### Example:
     *
     * ```javascript
     * // Increment the current value by one
     * searchableMap.update('somekey', (currentValue) => currentValue == null ? 0 : currentValue + 1)
     * ```
     *
     * If the value at the given key is or will be an object, it might not require
     * re-assignment. In that case it is better to use `fetch()`, because it is
     * faster.
     *
     * @param key  The key to update
     * @param fn  The function used to compute the new value from the current one
     * @return The {@link SearchableMap} itself, to allow chaining
     */
    SearchableMap.prototype.update = function (key, fn) {
        if (typeof key !== 'string') {
            throw new Error('key must be a string');
        }
        this._size = undefined;
        var node = createPath(this._tree, key);
        node.set(LEAF, fn(node.get(LEAF)));
        return this;
    };
    /**
     * Fetches the value of the given key. If the value does not exist, calls the
     * given function to create a new value, which is inserted at the given key
     * and subsequently returned.
     *
     * ### Example:
     *
     * ```javascript
     * const map = searchableMap.fetch('somekey', () => new Map())
     * map.set('foo', 'bar')
     * ```
     *
     * @param key  The key to update
     * @param defaultValue  A function that creates a new value if the key does not exist
     * @return The existing or new value at the given key
     */
    SearchableMap.prototype.fetch = function (key, initial) {
        if (typeof key !== 'string') {
            throw new Error('key must be a string');
        }
        this._size = undefined;
        var node = createPath(this._tree, key);
        var value = node.get(LEAF);
        if (value === undefined) {
            node.set(LEAF, value = initial());
        }
        return value;
    };
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values
     * @return An `Iterable` iterating through values.
     */
    SearchableMap.prototype.values = function () {
        return new TreeIterator(this, VALUES);
    };
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/@@iterator
     */
    SearchableMap.prototype[Symbol.iterator] = function () {
        return this.entries();
    };
    /**
     * Creates a {@link SearchableMap} from an `Iterable` of entries
     *
     * @param entries  Entries to be inserted in the {@link SearchableMap}
     * @return A new {@link SearchableMap} with the given entries
     */
    SearchableMap.from = function (entries) {
        var e_3, _a;
        var tree = new SearchableMap();
        try {
            for (var entries_1 = __values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
                var _b = __read(entries_1_1.value, 2), key = _b[0], value = _b[1];
                tree.set(key, value);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (entries_1_1 && !entries_1_1.done && (_a = entries_1.return)) _a.call(entries_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return tree;
    };
    /**
     * Creates a {@link SearchableMap} from the iterable properties of a JavaScript object
     *
     * @param object  Object of entries for the {@link SearchableMap}
     * @return A new {@link SearchableMap} with the given entries
     */
    SearchableMap.fromObject = function (object) {
        return SearchableMap.from(Object.entries(object));
    };
    return SearchableMap;
}());
var trackDown = function (tree, key, path) {
    var e_4, _a;
    if (path === void 0) { path = []; }
    if (key.length === 0 || tree == null) {
        return [tree, path];
    }
    try {
        for (var _b = __values(tree.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var k = _c.value;
            if (k !== LEAF && key.startsWith(k)) {
                path.push([tree, k]); // performance: update in place
                return trackDown(tree.get(k), key.slice(k.length), path);
            }
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_4) throw e_4.error; }
    }
    path.push([tree, key]); // performance: update in place
    return trackDown(undefined, '', path);
};
var lookup = function (tree, key) {
    var e_5, _a;
    if (key.length === 0 || tree == null) {
        return tree;
    }
    try {
        for (var _b = __values(tree.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var k = _c.value;
            if (k !== LEAF && key.startsWith(k)) {
                return lookup(tree.get(k), key.slice(k.length));
            }
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_5) throw e_5.error; }
    }
};
// Create a path in the radix tree for the given key, and returns the deepest
// node. This function is in the hot path for indexing. It avoids unnecessary
// string operations and recursion for performance.
var createPath = function (node, key) {
    var e_6, _a;
    var keyLength = key.length;
    outer: for (var pos = 0; node && pos < keyLength;) {
        try {
            for (var _b = (e_6 = void 0, __values(node.keys())), _c = _b.next(); !_c.done; _c = _b.next()) {
                var k = _c.value;
                // Check whether this key is a candidate: the first characters must match.
                if (k !== LEAF && key[pos] === k[0]) {
                    var len = Math.min(keyLength - pos, k.length);
                    // Advance offset to the point where key and k no longer match.
                    var offset = 1;
                    while (offset < len && key[pos + offset] === k[offset])
                        ++offset;
                    var child_1 = node.get(k);
                    if (offset === k.length) {
                        // The existing key is shorter than the key we need to create.
                        node = child_1;
                    }
                    else {
                        // Partial match: we need to insert an intermediate node to contain
                        // both the existing subtree and the new node.
                        var intermediate = new Map();
                        intermediate.set(k.slice(offset), child_1);
                        node.set(key.slice(pos, pos + offset), intermediate);
                        node.delete(k);
                        node = intermediate;
                    }
                    pos += offset;
                    continue outer;
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_6) throw e_6.error; }
        }
        // Create a final child node to contain the final suffix of the key.
        var child = new Map();
        node.set(key.slice(pos), child);
        return child;
    }
    return node;
};
var remove = function (tree, key) {
    var _a = __read(trackDown(tree, key), 2), node = _a[0], path = _a[1];
    if (node === undefined) {
        return;
    }
    node.delete(LEAF);
    if (node.size === 0) {
        cleanup(path);
    }
    else if (node.size === 1) {
        var _b = __read(node.entries().next().value, 2), key_1 = _b[0], value = _b[1];
        merge(path, key_1, value);
    }
};
var cleanup = function (path) {
    if (path.length === 0) {
        return;
    }
    var _a = __read(last(path), 2), node = _a[0], key = _a[1];
    node.delete(key);
    if (node.size === 0) {
        cleanup(path.slice(0, -1));
    }
    else if (node.size === 1) {
        var _b = __read(node.entries().next().value, 2), key_2 = _b[0], value = _b[1];
        if (key_2 !== LEAF) {
            merge(path.slice(0, -1), key_2, value);
        }
    }
};
var merge = function (path, key, value) {
    if (path.length === 0) {
        return;
    }
    var _a = __read(last(path), 2), node = _a[0], nodeKey = _a[1];
    node.set(nodeKey + key, value);
    node.delete(nodeKey);
};
var last = function (array) {
    return array[array.length - 1];
};

var _a;
var OR = 'or';
var AND = 'and';
var AND_NOT = 'and_not';
/**
 * {@link MiniSearch} is the main entrypoint class, implementing a full-text
 * search engine in memory.
 *
 * @typeParam T  The type of the documents being indexed.
 *
 * ### Basic example:
 *
 * ```javascript
 * const documents = [
 *   {
 *     id: 1,
 *     title: 'Moby Dick',
 *     text: 'Call me Ishmael. Some years ago...',
 *     category: 'fiction'
 *   },
 *   {
 *     id: 2,
 *     title: 'Zen and the Art of Motorcycle Maintenance',
 *     text: 'I can see by my watch...',
 *     category: 'fiction'
 *   },
 *   {
 *     id: 3,
 *     title: 'Neuromancer',
 *     text: 'The sky above the port was...',
 *     category: 'fiction'
 *   },
 *   {
 *     id: 4,
 *     title: 'Zen and the Art of Archery',
 *     text: 'At first sight it must seem...',
 *     category: 'non-fiction'
 *   },
 *   // ...and more
 * ]
 *
 * // Create a search engine that indexes the 'title' and 'text' fields for
 * // full-text search. Search results will include 'title' and 'category' (plus the
 * // id field, that is always stored and returned)
 * const miniSearch = new MiniSearch({
 *   fields: ['title', 'text'],
 *   storeFields: ['title', 'category']
 * })
 *
 * // Add documents to the index
 * miniSearch.addAll(documents)
 *
 * // Search for documents:
 * let results = miniSearch.search('zen art motorcycle')
 * // => [
 * //   { id: 2, title: 'Zen and the Art of Motorcycle Maintenance', category: 'fiction', score: 2.77258 },
 * //   { id: 4, title: 'Zen and the Art of Archery', category: 'non-fiction', score: 1.38629 }
 * // ]
 * ```
 */
var MiniSearch = /** @class */ (function () {
    /**
     * @param options  Configuration options
     *
     * ### Examples:
     *
     * ```javascript
     * // Create a search engine that indexes the 'title' and 'text' fields of your
     * // documents:
     * const miniSearch = new MiniSearch({ fields: ['title', 'text'] })
     * ```
     *
     * ### ID Field:
     *
     * ```javascript
     * // Your documents are assumed to include a unique 'id' field, but if you want
     * // to use a different field for document identification, you can set the
     * // 'idField' option:
     * const miniSearch = new MiniSearch({ idField: 'key', fields: ['title', 'text'] })
     * ```
     *
     * ### Options and defaults:
     *
     * ```javascript
     * // The full set of options (here with their default value) is:
     * const miniSearch = new MiniSearch({
     *   // idField: field that uniquely identifies a document
     *   idField: 'id',
     *
     *   // extractField: function used to get the value of a field in a document.
     *   // By default, it assumes the document is a flat object with field names as
     *   // property keys and field values as string property values, but custom logic
     *   // can be implemented by setting this option to a custom extractor function.
     *   extractField: (document, fieldName) => document[fieldName],
     *
     *   // tokenize: function used to split fields into individual terms. By
     *   // default, it is also used to tokenize search queries, unless a specific
     *   // `tokenize` search option is supplied. When tokenizing an indexed field,
     *   // the field name is passed as the second argument.
     *   tokenize: (string, _fieldName) => string.split(SPACE_OR_PUNCTUATION),
     *
     *   // processTerm: function used to process each tokenized term before
     *   // indexing. It can be used for stemming and normalization. Return a falsy
     *   // value in order to discard a term. By default, it is also used to process
     *   // search queries, unless a specific `processTerm` option is supplied as a
     *   // search option. When processing a term from a indexed field, the field
     *   // name is passed as the second argument.
     *   processTerm: (term, _fieldName) => term.toLowerCase(),
     *
     *   // searchOptions: default search options, see the `search` method for
     *   // details
     *   searchOptions: undefined,
     *
     *   // fields: document fields to be indexed. Mandatory, but not set by default
     *   fields: undefined
     *
     *   // storeFields: document fields to be stored and returned as part of the
     *   // search results.
     *   storeFields: []
     * })
     * ```
     */
    function MiniSearch(options) {
        if ((options === null || options === void 0 ? void 0 : options.fields) == null) {
            throw new Error('MiniSearch: option "fields" must be provided');
        }
        var autoVacuum = (options.autoVacuum == null || options.autoVacuum === true) ? defaultAutoVacuumOptions : options.autoVacuum;
        this._options = __assign(__assign(__assign({}, defaultOptions), options), { autoVacuum: autoVacuum, searchOptions: __assign(__assign({}, defaultSearchOptions), (options.searchOptions || {})), autoSuggestOptions: __assign(__assign({}, defaultAutoSuggestOptions), (options.autoSuggestOptions || {})) });
        this._index = new SearchableMap();
        this._documentCount = 0;
        this._documentIds = new Map();
        this._idToShortId = new Map();
        // Fields are defined during initialization, don't change, are few in
        // number, rarely need iterating over, and have string keys. Therefore in
        // this case an object is a better candidate than a Map to store the mapping
        // from field key to ID.
        this._fieldIds = {};
        this._fieldLength = new Map();
        this._avgFieldLength = [];
        this._nextId = 0;
        this._storedFields = new Map();
        this._dirtCount = 0;
        this._currentVacuum = null;
        this._enqueuedVacuum = null;
        this._enqueuedVacuumConditions = defaultVacuumConditions;
        this.addFields(this._options.fields);
    }
    /**
     * Adds a document to the index
     *
     * @param document  The document to be indexed
     */
    MiniSearch.prototype.add = function (document) {
        var e_1, _a, e_2, _b, e_3, _c;
        var _d = this._options, extractField = _d.extractField, tokenize = _d.tokenize, processTerm = _d.processTerm, fields = _d.fields, idField = _d.idField;
        var id = extractField(document, idField);
        if (id == null) {
            throw new Error("MiniSearch: document does not have ID field \"".concat(idField, "\""));
        }
        if (this._idToShortId.has(id)) {
            throw new Error("MiniSearch: duplicate ID ".concat(id));
        }
        var shortDocumentId = this.addDocumentId(id);
        this.saveStoredFields(shortDocumentId, document);
        try {
            for (var fields_1 = __values(fields), fields_1_1 = fields_1.next(); !fields_1_1.done; fields_1_1 = fields_1.next()) {
                var field = fields_1_1.value;
                var fieldValue = extractField(document, field);
                if (fieldValue == null)
                    continue;
                var tokens = tokenize(fieldValue.toString(), field);
                var fieldId = this._fieldIds[field];
                var uniqueTerms = new Set(tokens).size;
                this.addFieldLength(shortDocumentId, fieldId, this._documentCount - 1, uniqueTerms);
                try {
                    for (var tokens_1 = (e_2 = void 0, __values(tokens)), tokens_1_1 = tokens_1.next(); !tokens_1_1.done; tokens_1_1 = tokens_1.next()) {
                        var term = tokens_1_1.value;
                        var processedTerm = processTerm(term, field);
                        if (Array.isArray(processedTerm)) {
                            try {
                                for (var processedTerm_1 = (e_3 = void 0, __values(processedTerm)), processedTerm_1_1 = processedTerm_1.next(); !processedTerm_1_1.done; processedTerm_1_1 = processedTerm_1.next()) {
                                    var t = processedTerm_1_1.value;
                                    this.addTerm(fieldId, shortDocumentId, t);
                                }
                            }
                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                            finally {
                                try {
                                    if (processedTerm_1_1 && !processedTerm_1_1.done && (_c = processedTerm_1.return)) _c.call(processedTerm_1);
                                }
                                finally { if (e_3) throw e_3.error; }
                            }
                        }
                        else if (processedTerm) {
                            this.addTerm(fieldId, shortDocumentId, processedTerm);
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (tokens_1_1 && !tokens_1_1.done && (_b = tokens_1.return)) _b.call(tokens_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (fields_1_1 && !fields_1_1.done && (_a = fields_1.return)) _a.call(fields_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * Adds all the given documents to the index
     *
     * @param documents  An array of documents to be indexed
     */
    MiniSearch.prototype.addAll = function (documents) {
        var e_4, _a;
        try {
            for (var documents_1 = __values(documents), documents_1_1 = documents_1.next(); !documents_1_1.done; documents_1_1 = documents_1.next()) {
                var document_1 = documents_1_1.value;
                this.add(document_1);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (documents_1_1 && !documents_1_1.done && (_a = documents_1.return)) _a.call(documents_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
    };
    /**
     * Adds all the given documents to the index asynchronously.
     *
     * Returns a promise that resolves (to `undefined`) when the indexing is done.
     * This method is useful when index many documents, to avoid blocking the main
     * thread. The indexing is performed asynchronously and in chunks.
     *
     * @param documents  An array of documents to be indexed
     * @param options  Configuration options
     * @return A promise resolving to `undefined` when the indexing is done
     */
    MiniSearch.prototype.addAllAsync = function (documents, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var _a = options.chunkSize, chunkSize = _a === void 0 ? 10 : _a;
        var acc = { chunk: [], promise: Promise.resolve() };
        var _b = documents.reduce(function (_a, document, i) {
            var chunk = _a.chunk, promise = _a.promise;
            chunk.push(document);
            if ((i + 1) % chunkSize === 0) {
                return {
                    chunk: [],
                    promise: promise
                        .then(function () { return new Promise(function (resolve) { return setTimeout(resolve, 0); }); })
                        .then(function () { return _this.addAll(chunk); })
                };
            }
            else {
                return { chunk: chunk, promise: promise };
            }
        }, acc), chunk = _b.chunk, promise = _b.promise;
        return promise.then(function () { return _this.addAll(chunk); });
    };
    /**
     * Removes the given document from the index.
     *
     * The document to remove must NOT have changed between indexing and removal,
     * otherwise the index will be corrupted.
     *
     * This method requires passing the full document to be removed (not just the
     * ID), and immediately removes the document from the inverted index, allowing
     * memory to be released. A convenient alternative is {@link
     * MiniSearch#discard}, which needs only the document ID, and has the same
     * visible effect, but delays cleaning up the index until the next vacuuming.
     *
     * @param document  The document to be removed
     */
    MiniSearch.prototype.remove = function (document) {
        var e_5, _a, e_6, _b, e_7, _c;
        var _d = this._options, tokenize = _d.tokenize, processTerm = _d.processTerm, extractField = _d.extractField, fields = _d.fields, idField = _d.idField;
        var id = extractField(document, idField);
        if (id == null) {
            throw new Error("MiniSearch: document does not have ID field \"".concat(idField, "\""));
        }
        var shortId = this._idToShortId.get(id);
        if (shortId == null) {
            throw new Error("MiniSearch: cannot remove document with ID ".concat(id, ": it is not in the index"));
        }
        try {
            for (var fields_2 = __values(fields), fields_2_1 = fields_2.next(); !fields_2_1.done; fields_2_1 = fields_2.next()) {
                var field = fields_2_1.value;
                var fieldValue = extractField(document, field);
                if (fieldValue == null)
                    continue;
                var tokens = tokenize(fieldValue.toString(), field);
                var fieldId = this._fieldIds[field];
                var uniqueTerms = new Set(tokens).size;
                this.removeFieldLength(shortId, fieldId, this._documentCount, uniqueTerms);
                try {
                    for (var tokens_2 = (e_6 = void 0, __values(tokens)), tokens_2_1 = tokens_2.next(); !tokens_2_1.done; tokens_2_1 = tokens_2.next()) {
                        var term = tokens_2_1.value;
                        var processedTerm = processTerm(term, field);
                        if (Array.isArray(processedTerm)) {
                            try {
                                for (var processedTerm_2 = (e_7 = void 0, __values(processedTerm)), processedTerm_2_1 = processedTerm_2.next(); !processedTerm_2_1.done; processedTerm_2_1 = processedTerm_2.next()) {
                                    var t = processedTerm_2_1.value;
                                    this.removeTerm(fieldId, shortId, t);
                                }
                            }
                            catch (e_7_1) { e_7 = { error: e_7_1 }; }
                            finally {
                                try {
                                    if (processedTerm_2_1 && !processedTerm_2_1.done && (_c = processedTerm_2.return)) _c.call(processedTerm_2);
                                }
                                finally { if (e_7) throw e_7.error; }
                            }
                        }
                        else if (processedTerm) {
                            this.removeTerm(fieldId, shortId, processedTerm);
                        }
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (tokens_2_1 && !tokens_2_1.done && (_b = tokens_2.return)) _b.call(tokens_2);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (fields_2_1 && !fields_2_1.done && (_a = fields_2.return)) _a.call(fields_2);
            }
            finally { if (e_5) throw e_5.error; }
        }
        this._storedFields.delete(shortId);
        this._documentIds.delete(shortId);
        this._idToShortId.delete(id);
        this._fieldLength.delete(shortId);
        this._documentCount -= 1;
    };
    /**
     * Removes all the given documents from the index. If called with no arguments,
     * it removes _all_ documents from the index.
     *
     * @param documents  The documents to be removed. If this argument is omitted,
     * all documents are removed. Note that, for removing all documents, it is
     * more efficient to call this method with no arguments than to pass all
     * documents.
     */
    MiniSearch.prototype.removeAll = function (documents) {
        var e_8, _a;
        if (documents) {
            try {
                for (var documents_2 = __values(documents), documents_2_1 = documents_2.next(); !documents_2_1.done; documents_2_1 = documents_2.next()) {
                    var document_2 = documents_2_1.value;
                    this.remove(document_2);
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (documents_2_1 && !documents_2_1.done && (_a = documents_2.return)) _a.call(documents_2);
                }
                finally { if (e_8) throw e_8.error; }
            }
        }
        else if (arguments.length > 0) {
            throw new Error('Expected documents to be present. Omit the argument to remove all documents.');
        }
        else {
            this._index = new SearchableMap();
            this._documentCount = 0;
            this._documentIds = new Map();
            this._idToShortId = new Map();
            this._fieldLength = new Map();
            this._avgFieldLength = [];
            this._storedFields = new Map();
            this._nextId = 0;
        }
    };
    /**
     * Discards the document with the given ID, so it won't appear in search results
     *
     * It has the same visible effect of {@link MiniSearch.remove} (both cause the
     * document to stop appearing in searches), but a different effect on the
     * internal data structures:
     *
     *   - {@link MiniSearch#remove} requires passing the full document to be
     *   removed as argument, and removes it from the inverted index immediately.
     *
     *   - {@link MiniSearch#discard} instead only needs the document ID, and
     *   works by marking the current version of the document as discarded, so it
     *   is immediately ignored by searches. This is faster and more convenient
     *   than {@link MiniSearch#remove}, but the index is not immediately
     *   modified. To take care of that, vacuuming is performed after a certain
     *   number of documents are discarded, cleaning up the index and allowing
     *   memory to be released.
     *
     * After discarding a document, it is possible to re-add a new version, and
     * only the new version will appear in searches. In other words, discarding
     * and re-adding a document works exactly like removing and re-adding it. The
     * {@link MiniSearch.replace} method can also be used to replace a document
     * with a new version.
     *
     * #### Details about vacuuming
     *
     * Repetite calls to this method would leave obsolete document references in
     * the index, invisible to searches. Two mechanisms take care of cleaning up:
     * clean up during search, and vacuuming.
     *
     *   - Upon search, whenever a discarded ID is found (and ignored for the
     *   results), references to the discarded document are removed from the
     *   inverted index entries for the search terms. This ensures that subsequent
     *   searches for the same terms do not need to skip these obsolete references
     *   again.
     *
     *   - In addition, vacuuming is performed automatically by default (see the
     *   `autoVacuum` field in {@link Options}) after a certain number of
     *   documents are discarded. Vacuuming traverses all terms in the index,
     *   cleaning up all references to discarded documents. Vacuuming can also be
     *   triggered manually by calling {@link MiniSearch#vacuum}.
     *
     * @param id  The ID of the document to be discarded
     */
    MiniSearch.prototype.discard = function (id) {
        var _this = this;
        var shortId = this._idToShortId.get(id);
        if (shortId == null) {
            throw new Error("MiniSearch: cannot discard document with ID ".concat(id, ": it is not in the index"));
        }
        this._idToShortId.delete(id);
        this._documentIds.delete(shortId);
        this._storedFields.delete(shortId);
        (this._fieldLength.get(shortId) || []).forEach(function (fieldLength, fieldId) {
            _this.removeFieldLength(shortId, fieldId, _this._documentCount, fieldLength);
        });
        this._fieldLength.delete(shortId);
        this._documentCount -= 1;
        this._dirtCount += 1;
        this.maybeAutoVacuum();
    };
    MiniSearch.prototype.maybeAutoVacuum = function () {
        if (this._options.autoVacuum === false) {
            return;
        }
        var _a = this._options.autoVacuum, minDirtFactor = _a.minDirtFactor, minDirtCount = _a.minDirtCount, batchSize = _a.batchSize, batchWait = _a.batchWait;
        this.conditionalVacuum({ batchSize: batchSize, batchWait: batchWait }, { minDirtCount: minDirtCount, minDirtFactor: minDirtFactor });
    };
    /**
     * Discards the documents with the given IDs, so they won't appear in search
     * results
     *
     * It is equivalent to calling {@link MiniSearch#discard} for all the given
     * IDs, but with the optimization of triggering at most one automatic
     * vacuuming at the end.
     *
     * Note: to remove all documents from the index, it is faster and more
     * convenient to call {@link MiniSearch.removeAll} with no argument, instead
     * of passing all IDs to this method.
     */
    MiniSearch.prototype.discardAll = function (ids) {
        var e_9, _a;
        var autoVacuum = this._options.autoVacuum;
        try {
            this._options.autoVacuum = false;
            try {
                for (var ids_1 = __values(ids), ids_1_1 = ids_1.next(); !ids_1_1.done; ids_1_1 = ids_1.next()) {
                    var id = ids_1_1.value;
                    this.discard(id);
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (ids_1_1 && !ids_1_1.done && (_a = ids_1.return)) _a.call(ids_1);
                }
                finally { if (e_9) throw e_9.error; }
            }
        }
        finally {
            this._options.autoVacuum = autoVacuum;
        }
        this.maybeAutoVacuum();
    };
    /**
     * It replaces an existing document with the given updated version
     *
     * It works by discarding the current version and adding the updated one, so
     * it is functionally equivalent to calling {@link MiniSearch#discard}
     * followed by {@link MiniSearch#add}. The ID of the updated document should
     * be the same as the original one.
     *
     * Since it uses {@link MiniSearch#discard} internally, this method relies on
     * vacuuming to clean up obsolete document references from the index, allowing
     * memory to be released (see {@link MiniSearch#discard}).
     *
     * @param updatedDocument  The updated document to replace the old version
     * with
     */
    MiniSearch.prototype.replace = function (updatedDocument) {
        var _a = this._options, idField = _a.idField, extractField = _a.extractField;
        var id = extractField(updatedDocument, idField);
        this.discard(id);
        this.add(updatedDocument);
    };
    /**
     * Triggers a manual vacuuming, cleaning up references to discarded documents
     * from the inverted index
     *
     * Vacuuming is only useful for applications that use the {@link
     * MiniSearch#discard} or {@link MiniSearch#replace} methods.
     *
     * By default, vacuuming is performed automatically when needed (controlled by
     * the `autoVacuum` field in {@link Options}), so there is usually no need to
     * call this method, unless one wants to make sure to perform vacuuming at a
     * specific moment.
     *
     * Vacuuming traverses all terms in the inverted index in batches, and cleans
     * up references to discarded documents from the posting list, allowing memory
     * to be released.
     *
     * The method takes an optional object as argument with the following keys:
     *
     *   - `batchSize`: the size of each batch (1000 by default)
     *
     *   - `batchWait`: the number of milliseconds to wait between batches (10 by
     *   default)
     *
     * On large indexes, vacuuming could have a non-negligible cost: batching
     * avoids blocking the thread for long, diluting this cost so that it is not
     * negatively affecting the application. Nonetheless, this method should only
     * be called when necessary, and relying on automatic vacuuming is usually
     * better.
     *
     * It returns a promise that resolves (to undefined) when the clean up is
     * completed. If vacuuming is already ongoing at the time this method is
     * called, a new one is enqueued immediately after the ongoing one, and a
     * corresponding promise is returned. However, no more than one vacuuming is
     * enqueued on top of the ongoing one, even if this method is called more
     * times (enqueuing multiple ones would be useless).
     *
     * @param options  Configuration options for the batch size and delay. See
     * {@link VacuumOptions}.
     */
    MiniSearch.prototype.vacuum = function (options) {
        if (options === void 0) { options = {}; }
        return this.conditionalVacuum(options);
    };
    MiniSearch.prototype.conditionalVacuum = function (options, conditions) {
        var _this = this;
        // If a vacuum is already ongoing, schedule another as soon as it finishes,
        // unless there's already one enqueued. If one was already enqueued, do not
        // enqueue another on top, but make sure that the conditions are the
        // broadest.
        if (this._currentVacuum) {
            this._enqueuedVacuumConditions = this._enqueuedVacuumConditions && conditions;
            if (this._enqueuedVacuum != null) {
                return this._enqueuedVacuum;
            }
            this._enqueuedVacuum = this._currentVacuum.then(function () {
                var conditions = _this._enqueuedVacuumConditions;
                _this._enqueuedVacuumConditions = defaultVacuumConditions;
                return _this.performVacuuming(options, conditions);
            });
            return this._enqueuedVacuum;
        }
        if (this.vacuumConditionsMet(conditions) === false) {
            return Promise.resolve();
        }
        this._currentVacuum = this.performVacuuming(options);
        return this._currentVacuum;
    };
    MiniSearch.prototype.performVacuuming = function (options, conditions) {
        return __awaiter(this, void 0, void 0, function () {
            var initialDirtCount, batchSize, batchWait_1, i, _a, _b, _c, term, fieldsData, fieldsData_1, fieldsData_1_1, _d, fieldId, fieldIndex, fieldIndex_1, fieldIndex_1_1, _e, shortId, e_10_1;
            var e_10, _f, e_11, _g, e_12, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        initialDirtCount = this._dirtCount;
                        if (!this.vacuumConditionsMet(conditions)) return [3 /*break*/, 10];
                        batchSize = options.batchSize || defaultVacuumOptions.batchSize;
                        batchWait_1 = options.batchWait || defaultVacuumOptions.batchWait;
                        i = 1;
                        _j.label = 1;
                    case 1:
                        _j.trys.push([1, 7, 8, 9]);
                        _a = __values(this._index), _b = _a.next();
                        _j.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 6];
                        _c = __read(_b.value, 2), term = _c[0], fieldsData = _c[1];
                        try {
                            for (fieldsData_1 = (e_11 = void 0, __values(fieldsData)), fieldsData_1_1 = fieldsData_1.next(); !fieldsData_1_1.done; fieldsData_1_1 = fieldsData_1.next()) {
                                _d = __read(fieldsData_1_1.value, 2), fieldId = _d[0], fieldIndex = _d[1];
                                try {
                                    for (fieldIndex_1 = (e_12 = void 0, __values(fieldIndex)), fieldIndex_1_1 = fieldIndex_1.next(); !fieldIndex_1_1.done; fieldIndex_1_1 = fieldIndex_1.next()) {
                                        _e = __read(fieldIndex_1_1.value, 1), shortId = _e[0];
                                        if (this._documentIds.has(shortId)) {
                                            continue;
                                        }
                                        if (fieldIndex.size <= 1) {
                                            fieldsData.delete(fieldId);
                                        }
                                        else {
                                            fieldIndex.delete(shortId);
                                        }
                                    }
                                }
                                catch (e_12_1) { e_12 = { error: e_12_1 }; }
                                finally {
                                    try {
                                        if (fieldIndex_1_1 && !fieldIndex_1_1.done && (_h = fieldIndex_1.return)) _h.call(fieldIndex_1);
                                    }
                                    finally { if (e_12) throw e_12.error; }
                                }
                            }
                        }
                        catch (e_11_1) { e_11 = { error: e_11_1 }; }
                        finally {
                            try {
                                if (fieldsData_1_1 && !fieldsData_1_1.done && (_g = fieldsData_1.return)) _g.call(fieldsData_1);
                            }
                            finally { if (e_11) throw e_11.error; }
                        }
                        if (this._index.get(term).size === 0) {
                            this._index.delete(term);
                        }
                        if (!(i % batchSize === 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, batchWait_1); })];
                    case 3:
                        _j.sent();
                        _j.label = 4;
                    case 4:
                        i += 1;
                        _j.label = 5;
                    case 5:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_10_1 = _j.sent();
                        e_10 = { error: e_10_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (_b && !_b.done && (_f = _a.return)) _f.call(_a);
                        }
                        finally { if (e_10) throw e_10.error; }
                        return [7 /*endfinally*/];
                    case 9:
                        this._dirtCount -= initialDirtCount;
                        _j.label = 10;
                    case 10: 
                    // Make the next lines always async, so they execute after this function returns
                    return [4 /*yield*/, null];
                    case 11:
                        // Make the next lines always async, so they execute after this function returns
                        _j.sent();
                        this._currentVacuum = this._enqueuedVacuum;
                        this._enqueuedVacuum = null;
                        return [2 /*return*/];
                }
            });
        });
    };
    MiniSearch.prototype.vacuumConditionsMet = function (conditions) {
        if (conditions == null) {
            return true;
        }
        var minDirtCount = conditions.minDirtCount, minDirtFactor = conditions.minDirtFactor;
        minDirtCount = minDirtCount || defaultAutoVacuumOptions.minDirtCount;
        minDirtFactor = minDirtFactor || defaultAutoVacuumOptions.minDirtFactor;
        return this.dirtCount >= minDirtCount && this.dirtFactor >= minDirtFactor;
    };
    Object.defineProperty(MiniSearch.prototype, "isVacuuming", {
        /**
         * Is `true` if a vacuuming operation is ongoing, `false` otherwise
         */
        get: function () {
            return this._currentVacuum != null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MiniSearch.prototype, "dirtCount", {
        /**
         * The number of documents discarded since the most recent vacuuming
         */
        get: function () {
            return this._dirtCount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MiniSearch.prototype, "dirtFactor", {
        /**
         * A number between 0 and 1 giving an indication about the proportion of
         * documents that are discarded, and can therefore be cleaned up by vacuuming.
         * A value close to 0 means that the index is relatively clean, while a higher
         * value means that the index is relatively dirty, and vacuuming could release
         * memory.
         */
        get: function () {
            return this._dirtCount / (1 + this._documentCount + this._dirtCount);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns `true` if a document with the given ID is present in the index and
     * available for search, `false` otherwise
     *
     * @param id  The document ID
     */
    MiniSearch.prototype.has = function (id) {
        return this._idToShortId.has(id);
    };
    /**
     * Returns the stored fields (as configured in the `storeFields` constructor
     * option) for the given document ID. Returns `undefined` if the document is
     * not present in the index.
     *
     * @param id  The document ID
     */
    MiniSearch.prototype.getStoredFields = function (id) {
        var shortId = this._idToShortId.get(id);
        if (shortId == null) {
            return undefined;
        }
        return this._storedFields.get(shortId);
    };
    /**
     * Search for documents matching the given search query.
     *
     * The result is a list of scored document IDs matching the query, sorted by
     * descending score, and each including data about which terms were matched and
     * in which fields.
     *
     * ### Basic usage:
     *
     * ```javascript
     * // Search for "zen art motorcycle" with default options: terms have to match
     * // exactly, and individual terms are joined with OR
     * miniSearch.search('zen art motorcycle')
     * // => [ { id: 2, score: 2.77258, match: { ... } }, { id: 4, score: 1.38629, match: { ... } } ]
     * ```
     *
     * ### Restrict search to specific fields:
     *
     * ```javascript
     * // Search only in the 'title' field
     * miniSearch.search('zen', { fields: ['title'] })
     * ```
     *
     * ### Field boosting:
     *
     * ```javascript
     * // Boost a field
     * miniSearch.search('zen', { boost: { title: 2 } })
     * ```
     *
     * ### Prefix search:
     *
     * ```javascript
     * // Search for "moto" with prefix search (it will match documents
     * // containing terms that start with "moto" or "neuro")
     * miniSearch.search('moto neuro', { prefix: true })
     * ```
     *
     * ### Fuzzy search:
     *
     * ```javascript
     * // Search for "ismael" with fuzzy search (it will match documents containing
     * // terms similar to "ismael", with a maximum edit distance of 0.2 term.length
     * // (rounded to nearest integer)
     * miniSearch.search('ismael', { fuzzy: 0.2 })
     * ```
     *
     * ### Combining strategies:
     *
     * ```javascript
     * // Mix of exact match, prefix search, and fuzzy search
     * miniSearch.search('ismael mob', {
     *  prefix: true,
     *  fuzzy: 0.2
     * })
     * ```
     *
     * ### Advanced prefix and fuzzy search:
     *
     * ```javascript
     * // Perform fuzzy and prefix search depending on the search term. Here
     * // performing prefix and fuzzy search only on terms longer than 3 characters
     * miniSearch.search('ismael mob', {
     *  prefix: term => term.length > 3
     *  fuzzy: term => term.length > 3 ? 0.2 : null
     * })
     * ```
     *
     * ### Combine with AND:
     *
     * ```javascript
     * // Combine search terms with AND (to match only documents that contain both
     * // "motorcycle" and "art")
     * miniSearch.search('motorcycle art', { combineWith: 'AND' })
     * ```
     *
     * ### Combine with AND_NOT:
     *
     * There is also an AND_NOT combinator, that finds documents that match the
     * first term, but do not match any of the other terms. This combinator is
     * rarely useful with simple queries, and is meant to be used with advanced
     * query combinations (see later for more details).
     *
     * ### Filtering results:
     *
     * ```javascript
     * // Filter only results in the 'fiction' category (assuming that 'category'
     * // is a stored field)
     * miniSearch.search('motorcycle art', {
     *   filter: (result) => result.category === 'fiction'
     * })
     * ```
     *
     * ### Wildcard query
     *
     * Searching for an empty string (assuming the default tokenizer) returns no
     * results. Sometimes though, one needs to match all documents, like in a
     * "wildcard" search. This is possible by passing the special value
     * {@link MiniSearch.wildcard} as the query:
     *
     * ```javascript
     * // Return search results for all documents
     * miniSearch.search(MiniSearch.wildcard)
     * ```
     *
     * Note that search options such as `filter` and `boostDocument` are still
     * applied, influencing which results are returned, and their order:
     *
     * ```javascript
     * // Return search results for all documents in the 'fiction' category
     * miniSearch.search(MiniSearch.wildcard, {
     *   filter: (result) => result.category === 'fiction'
     * })
     * ```
     *
     * ### Advanced combination of queries:
     *
     * It is possible to combine different subqueries with OR, AND, and AND_NOT,
     * and even with different search options, by passing a query expression
     * tree object as the first argument, instead of a string.
     *
     * ```javascript
     * // Search for documents that contain "zen" and ("motorcycle" or "archery")
     * miniSearch.search({
     *   combineWith: 'AND',
     *   queries: [
     *     'zen',
     *     {
     *       combineWith: 'OR',
     *       queries: ['motorcycle', 'archery']
     *     }
     *   ]
     * })
     *
     * // Search for documents that contain ("apple" or "pear") but not "juice" and
     * // not "tree"
     * miniSearch.search({
     *   combineWith: 'AND_NOT',
     *   queries: [
     *     {
     *       combineWith: 'OR',
     *       queries: ['apple', 'pear']
     *     },
     *     'juice',
     *     'tree'
     *   ]
     * })
     * ```
     *
     * Each node in the expression tree can be either a string, or an object that
     * supports all {@link SearchOptions} fields, plus a `queries` array field for
     * subqueries.
     *
     * Note that, while this can become complicated to do by hand for complex or
     * deeply nested queries, it provides a formalized expression tree API for
     * external libraries that implement a parser for custom query languages.
     *
     * @param query  Search query
     * @param options  Search options. Each option, if not given, defaults to the corresponding value of `searchOptions` given to the constructor, or to the library default.
     */
    MiniSearch.prototype.search = function (query, searchOptions) {
        var e_13, _a;
        if (searchOptions === void 0) { searchOptions = {}; }
        var rawResults = this.executeQuery(query, searchOptions);
        var results = [];
        try {
            for (var rawResults_1 = __values(rawResults), rawResults_1_1 = rawResults_1.next(); !rawResults_1_1.done; rawResults_1_1 = rawResults_1.next()) {
                var _b = __read(rawResults_1_1.value, 2), docId = _b[0], _c = _b[1], score = _c.score, terms = _c.terms, match = _c.match;
                // terms are the matched query terms, which will be returned to the user
                // as queryTerms. The quality is calculated based on them, as opposed to
                // the matched terms in the document (which can be different due to
                // prefix and fuzzy match)
                var quality = terms.length || 1;
                var result = {
                    id: this._documentIds.get(docId),
                    score: score * quality,
                    terms: Object.keys(match),
                    queryTerms: terms,
                    match: match
                };
                Object.assign(result, this._storedFields.get(docId));
                if (searchOptions.filter == null || searchOptions.filter(result)) {
                    results.push(result);
                }
            }
        }
        catch (e_13_1) { e_13 = { error: e_13_1 }; }
        finally {
            try {
                if (rawResults_1_1 && !rawResults_1_1.done && (_a = rawResults_1.return)) _a.call(rawResults_1);
            }
            finally { if (e_13) throw e_13.error; }
        }
        // If it's a wildcard query, and no document boost is applied, skip sorting
        // the results, as all results have the same score of 1
        if (query === MiniSearch.wildcard &&
            searchOptions.boostDocument == null &&
            this._options.searchOptions.boostDocument == null) {
            return results;
        }
        results.sort(byScore);
        return results;
    };
    /**
     * Provide suggestions for the given search query
     *
     * The result is a list of suggested modified search queries, derived from the
     * given search query, each with a relevance score, sorted by descending score.
     *
     * By default, it uses the same options used for search, except that by
     * default it performs prefix search on the last term of the query, and
     * combine terms with `'AND'` (requiring all query terms to match). Custom
     * options can be passed as a second argument. Defaults can be changed upon
     * calling the {@link MiniSearch} constructor, by passing a
     * `autoSuggestOptions` option.
     *
     * ### Basic usage:
     *
     * ```javascript
     * // Get suggestions for 'neuro':
     * miniSearch.autoSuggest('neuro')
     * // => [ { suggestion: 'neuromancer', terms: [ 'neuromancer' ], score: 0.46240 } ]
     * ```
     *
     * ### Multiple words:
     *
     * ```javascript
     * // Get suggestions for 'zen ar':
     * miniSearch.autoSuggest('zen ar')
     * // => [
     * //  { suggestion: 'zen archery art', terms: [ 'zen', 'archery', 'art' ], score: 1.73332 },
     * //  { suggestion: 'zen art', terms: [ 'zen', 'art' ], score: 1.21313 }
     * // ]
     * ```
     *
     * ### Fuzzy suggestions:
     *
     * ```javascript
     * // Correct spelling mistakes using fuzzy search:
     * miniSearch.autoSuggest('neromancer', { fuzzy: 0.2 })
     * // => [ { suggestion: 'neuromancer', terms: [ 'neuromancer' ], score: 1.03998 } ]
     * ```
     *
     * ### Filtering:
     *
     * ```javascript
     * // Get suggestions for 'zen ar', but only within the 'fiction' category
     * // (assuming that 'category' is a stored field):
     * miniSearch.autoSuggest('zen ar', {
     *   filter: (result) => result.category === 'fiction'
     * })
     * // => [
     * //  { suggestion: 'zen archery art', terms: [ 'zen', 'archery', 'art' ], score: 1.73332 },
     * //  { suggestion: 'zen art', terms: [ 'zen', 'art' ], score: 1.21313 }
     * // ]
     * ```
     *
     * @param queryString  Query string to be expanded into suggestions
     * @param options  Search options. The supported options and default values
     * are the same as for the {@link MiniSearch#search} method, except that by
     * default prefix search is performed on the last term in the query, and terms
     * are combined with `'AND'`.
     * @return  A sorted array of suggestions sorted by relevance score.
     */
    MiniSearch.prototype.autoSuggest = function (queryString, options) {
        var e_14, _a, e_15, _b;
        if (options === void 0) { options = {}; }
        options = __assign(__assign({}, this._options.autoSuggestOptions), options);
        var suggestions = new Map();
        try {
            for (var _c = __values(this.search(queryString, options)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = _d.value, score = _e.score, terms = _e.terms;
                var phrase = terms.join(' ');
                var suggestion = suggestions.get(phrase);
                if (suggestion != null) {
                    suggestion.score += score;
                    suggestion.count += 1;
                }
                else {
                    suggestions.set(phrase, { score: score, terms: terms, count: 1 });
                }
            }
        }
        catch (e_14_1) { e_14 = { error: e_14_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_14) throw e_14.error; }
        }
        var results = [];
        try {
            for (var suggestions_1 = __values(suggestions), suggestions_1_1 = suggestions_1.next(); !suggestions_1_1.done; suggestions_1_1 = suggestions_1.next()) {
                var _f = __read(suggestions_1_1.value, 2), suggestion = _f[0], _g = _f[1], score = _g.score, terms = _g.terms, count = _g.count;
                results.push({ suggestion: suggestion, terms: terms, score: score / count });
            }
        }
        catch (e_15_1) { e_15 = { error: e_15_1 }; }
        finally {
            try {
                if (suggestions_1_1 && !suggestions_1_1.done && (_b = suggestions_1.return)) _b.call(suggestions_1);
            }
            finally { if (e_15) throw e_15.error; }
        }
        results.sort(byScore);
        return results;
    };
    Object.defineProperty(MiniSearch.prototype, "documentCount", {
        /**
         * Total number of documents available to search
         */
        get: function () {
            return this._documentCount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MiniSearch.prototype, "termCount", {
        /**
         * Number of terms in the index
         */
        get: function () {
            return this._index.size;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Deserializes a JSON index (serialized with `JSON.stringify(miniSearch)`)
     * and instantiates a MiniSearch instance. It should be given the same options
     * originally used when serializing the index.
     *
     * ### Usage:
     *
     * ```javascript
     * // If the index was serialized with:
     * let miniSearch = new MiniSearch({ fields: ['title', 'text'] })
     * miniSearch.addAll(documents)
     *
     * const json = JSON.stringify(miniSearch)
     * // It can later be deserialized like this:
     * miniSearch = MiniSearch.loadJSON(json, { fields: ['title', 'text'] })
     * ```
     *
     * @param json  JSON-serialized index
     * @param options  configuration options, same as the constructor
     * @return An instance of MiniSearch deserialized from the given JSON.
     */
    MiniSearch.loadJSON = function (json, options) {
        if (options == null) {
            throw new Error('MiniSearch: loadJSON should be given the same options used when serializing the index');
        }
        return this.loadJS(JSON.parse(json), options);
    };
    /**
     * Returns the default value of an option. It will throw an error if no option
     * with the given name exists.
     *
     * @param optionName  Name of the option
     * @return The default value of the given option
     *
     * ### Usage:
     *
     * ```javascript
     * // Get default tokenizer
     * MiniSearch.getDefault('tokenize')
     *
     * // Get default term processor
     * MiniSearch.getDefault('processTerm')
     *
     * // Unknown options will throw an error
     * MiniSearch.getDefault('notExisting')
     * // => throws 'MiniSearch: unknown option "notExisting"'
     * ```
     */
    MiniSearch.getDefault = function (optionName) {
        if (defaultOptions.hasOwnProperty(optionName)) {
            return getOwnProperty(defaultOptions, optionName);
        }
        else {
            throw new Error("MiniSearch: unknown option \"".concat(optionName, "\""));
        }
    };
    /**
     * @ignore
     */
    MiniSearch.loadJS = function (js, options) {
        var e_16, _a, e_17, _b, e_18, _c;
        var index = js.index, documentCount = js.documentCount, nextId = js.nextId, documentIds = js.documentIds, fieldIds = js.fieldIds, fieldLength = js.fieldLength, averageFieldLength = js.averageFieldLength, storedFields = js.storedFields, dirtCount = js.dirtCount, serializationVersion = js.serializationVersion;
        if (serializationVersion !== 1 && serializationVersion !== 2) {
            throw new Error('MiniSearch: cannot deserialize an index created with an incompatible version');
        }
        var miniSearch = new MiniSearch(options);
        miniSearch._documentCount = documentCount;
        miniSearch._nextId = nextId;
        miniSearch._documentIds = objectToNumericMap(documentIds);
        miniSearch._idToShortId = new Map();
        miniSearch._fieldIds = fieldIds;
        miniSearch._fieldLength = objectToNumericMap(fieldLength);
        miniSearch._avgFieldLength = averageFieldLength;
        miniSearch._storedFields = objectToNumericMap(storedFields);
        miniSearch._dirtCount = dirtCount || 0;
        miniSearch._index = new SearchableMap();
        try {
            for (var _d = __values(miniSearch._documentIds), _e = _d.next(); !_e.done; _e = _d.next()) {
                var _f = __read(_e.value, 2), shortId = _f[0], id = _f[1];
                miniSearch._idToShortId.set(id, shortId);
            }
        }
        catch (e_16_1) { e_16 = { error: e_16_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_16) throw e_16.error; }
        }
        try {
            for (var index_1 = __values(index), index_1_1 = index_1.next(); !index_1_1.done; index_1_1 = index_1.next()) {
                var _g = __read(index_1_1.value, 2), term = _g[0], data = _g[1];
                var dataMap = new Map();
                try {
                    for (var _h = (e_18 = void 0, __values(Object.keys(data))), _j = _h.next(); !_j.done; _j = _h.next()) {
                        var fieldId = _j.value;
                        var indexEntry = data[fieldId];
                        // Version 1 used to nest the index entry inside a field called ds
                        if (serializationVersion === 1) {
                            indexEntry = indexEntry.ds;
                        }
                        dataMap.set(parseInt(fieldId, 10), objectToNumericMap(indexEntry));
                    }
                }
                catch (e_18_1) { e_18 = { error: e_18_1 }; }
                finally {
                    try {
                        if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                    }
                    finally { if (e_18) throw e_18.error; }
                }
                miniSearch._index.set(term, dataMap);
            }
        }
        catch (e_17_1) { e_17 = { error: e_17_1 }; }
        finally {
            try {
                if (index_1_1 && !index_1_1.done && (_b = index_1.return)) _b.call(index_1);
            }
            finally { if (e_17) throw e_17.error; }
        }
        return miniSearch;
    };
    /**
     * @ignore
     */
    MiniSearch.prototype.executeQuery = function (query, searchOptions) {
        var _this = this;
        if (searchOptions === void 0) { searchOptions = {}; }
        if (query === MiniSearch.wildcard) {
            return this.executeWildcardQuery(searchOptions);
        }
        if (typeof query !== 'string') {
            var options_1 = __assign(__assign(__assign({}, searchOptions), query), { queries: undefined });
            var results_1 = query.queries.map(function (subquery) { return _this.executeQuery(subquery, options_1); });
            return this.combineResults(results_1, options_1.combineWith);
        }
        var _a = this._options, tokenize = _a.tokenize, processTerm = _a.processTerm, globalSearchOptions = _a.searchOptions;
        var options = __assign(__assign({ tokenize: tokenize, processTerm: processTerm }, globalSearchOptions), searchOptions);
        var searchTokenize = options.tokenize, searchProcessTerm = options.processTerm;
        var terms = searchTokenize(query)
            .flatMap(function (term) { return searchProcessTerm(term); })
            .filter(function (term) { return !!term; });
        var queries = terms.map(termToQuerySpec(options));
        var results = queries.map(function (query) { return _this.executeQuerySpec(query, options); });
        return this.combineResults(results, options.combineWith);
    };
    /**
     * @ignore
     */
    MiniSearch.prototype.executeQuerySpec = function (query, searchOptions) {
        var e_19, _a, e_20, _b;
        var options = __assign(__assign({}, this._options.searchOptions), searchOptions);
        var boosts = (options.fields || this._options.fields).reduce(function (boosts, field) {
            var _a;
            return (__assign(__assign({}, boosts), (_a = {}, _a[field] = getOwnProperty(options.boost, field) || 1, _a)));
        }, {});
        var boostDocument = options.boostDocument, weights = options.weights, maxFuzzy = options.maxFuzzy, bm25params = options.bm25;
        var _c = __assign(__assign({}, defaultSearchOptions.weights), weights), fuzzyWeight = _c.fuzzy, prefixWeight = _c.prefix;
        var data = this._index.get(query.term);
        var results = this.termResults(query.term, query.term, 1, data, boosts, boostDocument, bm25params);
        var prefixMatches;
        var fuzzyMatches;
        if (query.prefix) {
            prefixMatches = this._index.atPrefix(query.term);
        }
        if (query.fuzzy) {
            var fuzzy = (query.fuzzy === true) ? 0.2 : query.fuzzy;
            var maxDistance = fuzzy < 1 ? Math.min(maxFuzzy, Math.round(query.term.length * fuzzy)) : fuzzy;
            if (maxDistance)
                fuzzyMatches = this._index.fuzzyGet(query.term, maxDistance);
        }
        if (prefixMatches) {
            try {
                for (var prefixMatches_1 = __values(prefixMatches), prefixMatches_1_1 = prefixMatches_1.next(); !prefixMatches_1_1.done; prefixMatches_1_1 = prefixMatches_1.next()) {
                    var _d = __read(prefixMatches_1_1.value, 2), term = _d[0], data_1 = _d[1];
                    var distance = term.length - query.term.length;
                    if (!distance) {
                        continue;
                    } // Skip exact match.
                    // Delete the term from fuzzy results (if present) if it is also a
                    // prefix result. This entry will always be scored as a prefix result.
                    fuzzyMatches === null || fuzzyMatches === void 0 ? void 0 : fuzzyMatches.delete(term);
                    // Weight gradually approaches 0 as distance goes to infinity, with the
                    // weight for the hypothetical distance 0 being equal to prefixWeight.
                    // The rate of change is much lower than that of fuzzy matches to
                    // account for the fact that prefix matches stay more relevant than
                    // fuzzy matches for longer distances.
                    var weight = prefixWeight * term.length / (term.length + 0.3 * distance);
                    this.termResults(query.term, term, weight, data_1, boosts, boostDocument, bm25params, results);
                }
            }
            catch (e_19_1) { e_19 = { error: e_19_1 }; }
            finally {
                try {
                    if (prefixMatches_1_1 && !prefixMatches_1_1.done && (_a = prefixMatches_1.return)) _a.call(prefixMatches_1);
                }
                finally { if (e_19) throw e_19.error; }
            }
        }
        if (fuzzyMatches) {
            try {
                for (var _e = __values(fuzzyMatches.keys()), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var term = _f.value;
                    var _g = __read(fuzzyMatches.get(term), 2), data_2 = _g[0], distance = _g[1];
                    if (!distance) {
                        continue;
                    } // Skip exact match.
                    // Weight gradually approaches 0 as distance goes to infinity, with the
                    // weight for the hypothetical distance 0 being equal to fuzzyWeight.
                    var weight = fuzzyWeight * term.length / (term.length + distance);
                    this.termResults(query.term, term, weight, data_2, boosts, boostDocument, bm25params, results);
                }
            }
            catch (e_20_1) { e_20 = { error: e_20_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_20) throw e_20.error; }
            }
        }
        return results;
    };
    /**
     * @ignore
     */
    MiniSearch.prototype.executeWildcardQuery = function (searchOptions) {
        var e_21, _a;
        var results = new Map();
        var options = __assign(__assign({}, this._options.searchOptions), searchOptions);
        try {
            for (var _b = __values(this._documentIds), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), shortId = _d[0], id = _d[1];
                var score = options.boostDocument ? options.boostDocument(id, '', this._storedFields.get(shortId)) : 1;
                results.set(shortId, {
                    score: score,
                    terms: [],
                    match: {}
                });
            }
        }
        catch (e_21_1) { e_21 = { error: e_21_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_21) throw e_21.error; }
        }
        return results;
    };
    /**
     * @ignore
     */
    MiniSearch.prototype.combineResults = function (results, combineWith) {
        if (combineWith === void 0) { combineWith = OR; }
        if (results.length === 0) {
            return new Map();
        }
        var operator = combineWith.toLowerCase();
        return results.reduce(combinators[operator]) || new Map();
    };
    /**
     * Allows serialization of the index to JSON, to possibly store it and later
     * deserialize it with {@link MiniSearch.loadJSON}.
     *
     * Normally one does not directly call this method, but rather call the
     * standard JavaScript `JSON.stringify()` passing the {@link MiniSearch}
     * instance, and JavaScript will internally call this method. Upon
     * deserialization, one must pass to {@link MiniSearch.loadJSON} the same
     * options used to create the original instance that was serialized.
     *
     * ### Usage:
     *
     * ```javascript
     * // Serialize the index:
     * let miniSearch = new MiniSearch({ fields: ['title', 'text'] })
     * miniSearch.addAll(documents)
     * const json = JSON.stringify(miniSearch)
     *
     * // Later, to deserialize it:
     * miniSearch = MiniSearch.loadJSON(json, { fields: ['title', 'text'] })
     * ```
     *
     * @return A plain-object serializable representation of the search index.
     */
    MiniSearch.prototype.toJSON = function () {
        var e_22, _a, e_23, _b;
        var index = [];
        try {
            for (var _c = __values(this._index), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = __read(_d.value, 2), term = _e[0], fieldIndex = _e[1];
                var data = {};
                try {
                    for (var fieldIndex_2 = (e_23 = void 0, __values(fieldIndex)), fieldIndex_2_1 = fieldIndex_2.next(); !fieldIndex_2_1.done; fieldIndex_2_1 = fieldIndex_2.next()) {
                        var _f = __read(fieldIndex_2_1.value, 2), fieldId = _f[0], freqs = _f[1];
                        data[fieldId] = Object.fromEntries(freqs);
                    }
                }
                catch (e_23_1) { e_23 = { error: e_23_1 }; }
                finally {
                    try {
                        if (fieldIndex_2_1 && !fieldIndex_2_1.done && (_b = fieldIndex_2.return)) _b.call(fieldIndex_2);
                    }
                    finally { if (e_23) throw e_23.error; }
                }
                index.push([term, data]);
            }
        }
        catch (e_22_1) { e_22 = { error: e_22_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_22) throw e_22.error; }
        }
        return {
            documentCount: this._documentCount,
            nextId: this._nextId,
            documentIds: Object.fromEntries(this._documentIds),
            fieldIds: this._fieldIds,
            fieldLength: Object.fromEntries(this._fieldLength),
            averageFieldLength: this._avgFieldLength,
            storedFields: Object.fromEntries(this._storedFields),
            dirtCount: this._dirtCount,
            index: index,
            serializationVersion: 2
        };
    };
    /**
     * @ignore
     */
    MiniSearch.prototype.termResults = function (sourceTerm, derivedTerm, termWeight, fieldTermData, fieldBoosts, boostDocumentFn, bm25params, results) {
        var e_24, _a, e_25, _b, _c;
        if (results === void 0) { results = new Map(); }
        if (fieldTermData == null)
            return results;
        try {
            for (var _d = __values(Object.keys(fieldBoosts)), _e = _d.next(); !_e.done; _e = _d.next()) {
                var field = _e.value;
                var fieldBoost = fieldBoosts[field];
                var fieldId = this._fieldIds[field];
                var fieldTermFreqs = fieldTermData.get(fieldId);
                if (fieldTermFreqs == null)
                    continue;
                var matchingFields = fieldTermFreqs.size;
                var avgFieldLength = this._avgFieldLength[fieldId];
                try {
                    for (var _f = (e_25 = void 0, __values(fieldTermFreqs.keys())), _g = _f.next(); !_g.done; _g = _f.next()) {
                        var docId = _g.value;
                        if (!this._documentIds.has(docId)) {
                            this.removeTerm(fieldId, docId, derivedTerm);
                            matchingFields -= 1;
                            continue;
                        }
                        var docBoost = boostDocumentFn ? boostDocumentFn(this._documentIds.get(docId), derivedTerm, this._storedFields.get(docId)) : 1;
                        if (!docBoost)
                            continue;
                        var termFreq = fieldTermFreqs.get(docId);
                        var fieldLength = this._fieldLength.get(docId)[fieldId];
                        // NOTE: The total number of fields is set to the number of documents
                        // `this._documentCount`. It could also make sense to use the number of
                        // documents where the current field is non-blank as a normalization
                        // factor. This will make a difference in scoring if the field is rarely
                        // present. This is currently not supported, and may require further
                        // analysis to see if it is a valid use case.
                        var rawScore = calcBM25Score(termFreq, matchingFields, this._documentCount, fieldLength, avgFieldLength, bm25params);
                        var weightedScore = termWeight * fieldBoost * docBoost * rawScore;
                        var result = results.get(docId);
                        if (result) {
                            result.score += weightedScore;
                            assignUniqueTerm(result.terms, sourceTerm);
                            var match = getOwnProperty(result.match, derivedTerm);
                            if (match) {
                                match.push(field);
                            }
                            else {
                                result.match[derivedTerm] = [field];
                            }
                        }
                        else {
                            results.set(docId, {
                                score: weightedScore,
                                terms: [sourceTerm],
                                match: (_c = {}, _c[derivedTerm] = [field], _c)
                            });
                        }
                    }
                }
                catch (e_25_1) { e_25 = { error: e_25_1 }; }
                finally {
                    try {
                        if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                    }
                    finally { if (e_25) throw e_25.error; }
                }
            }
        }
        catch (e_24_1) { e_24 = { error: e_24_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_24) throw e_24.error; }
        }
        return results;
    };
    /**
     * @ignore
     */
    MiniSearch.prototype.addTerm = function (fieldId, documentId, term) {
        var indexData = this._index.fetch(term, createMap);
        var fieldIndex = indexData.get(fieldId);
        if (fieldIndex == null) {
            fieldIndex = new Map();
            fieldIndex.set(documentId, 1);
            indexData.set(fieldId, fieldIndex);
        }
        else {
            var docs = fieldIndex.get(documentId);
            fieldIndex.set(documentId, (docs || 0) + 1);
        }
    };
    /**
     * @ignore
     */
    MiniSearch.prototype.removeTerm = function (fieldId, documentId, term) {
        if (!this._index.has(term)) {
            this.warnDocumentChanged(documentId, fieldId, term);
            return;
        }
        var indexData = this._index.fetch(term, createMap);
        var fieldIndex = indexData.get(fieldId);
        if (fieldIndex == null || fieldIndex.get(documentId) == null) {
            this.warnDocumentChanged(documentId, fieldId, term);
        }
        else if (fieldIndex.get(documentId) <= 1) {
            if (fieldIndex.size <= 1) {
                indexData.delete(fieldId);
            }
            else {
                fieldIndex.delete(documentId);
            }
        }
        else {
            fieldIndex.set(documentId, fieldIndex.get(documentId) - 1);
        }
        if (this._index.get(term).size === 0) {
            this._index.delete(term);
        }
    };
    /**
     * @ignore
     */
    MiniSearch.prototype.warnDocumentChanged = function (shortDocumentId, fieldId, term) {
        var e_26, _a;
        try {
            for (var _b = __values(Object.keys(this._fieldIds)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var fieldName = _c.value;
                if (this._fieldIds[fieldName] === fieldId) {
                    this._options.logger('warn', "MiniSearch: document with ID ".concat(this._documentIds.get(shortDocumentId), " has changed before removal: term \"").concat(term, "\" was not present in field \"").concat(fieldName, "\". Removing a document after it has changed can corrupt the index!"), 'version_conflict');
                    return;
                }
            }
        }
        catch (e_26_1) { e_26 = { error: e_26_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_26) throw e_26.error; }
        }
    };
    /**
     * @ignore
     */
    MiniSearch.prototype.addDocumentId = function (documentId) {
        var shortDocumentId = this._nextId;
        this._idToShortId.set(documentId, shortDocumentId);
        this._documentIds.set(shortDocumentId, documentId);
        this._documentCount += 1;
        this._nextId += 1;
        return shortDocumentId;
    };
    /**
     * @ignore
     */
    MiniSearch.prototype.addFields = function (fields) {
        for (var i = 0; i < fields.length; i++) {
            this._fieldIds[fields[i]] = i;
        }
    };
    /**
     * @ignore
     */
    MiniSearch.prototype.addFieldLength = function (documentId, fieldId, count, length) {
        var fieldLengths = this._fieldLength.get(documentId);
        if (fieldLengths == null)
            this._fieldLength.set(documentId, fieldLengths = []);
        fieldLengths[fieldId] = length;
        var averageFieldLength = this._avgFieldLength[fieldId] || 0;
        var totalFieldLength = (averageFieldLength * count) + length;
        this._avgFieldLength[fieldId] = totalFieldLength / (count + 1);
    };
    /**
     * @ignore
     */
    MiniSearch.prototype.removeFieldLength = function (documentId, fieldId, count, length) {
        if (count === 1) {
            this._avgFieldLength[fieldId] = 0;
            return;
        }
        var totalFieldLength = (this._avgFieldLength[fieldId] * count) - length;
        this._avgFieldLength[fieldId] = totalFieldLength / (count - 1);
    };
    /**
     * @ignore
     */
    MiniSearch.prototype.saveStoredFields = function (documentId, doc) {
        var e_27, _a;
        var _b = this._options, storeFields = _b.storeFields, extractField = _b.extractField;
        if (storeFields == null || storeFields.length === 0) {
            return;
        }
        var documentFields = this._storedFields.get(documentId);
        if (documentFields == null)
            this._storedFields.set(documentId, documentFields = {});
        try {
            for (var storeFields_1 = __values(storeFields), storeFields_1_1 = storeFields_1.next(); !storeFields_1_1.done; storeFields_1_1 = storeFields_1.next()) {
                var fieldName = storeFields_1_1.value;
                var fieldValue = extractField(doc, fieldName);
                if (fieldValue !== undefined)
                    documentFields[fieldName] = fieldValue;
            }
        }
        catch (e_27_1) { e_27 = { error: e_27_1 }; }
        finally {
            try {
                if (storeFields_1_1 && !storeFields_1_1.done && (_a = storeFields_1.return)) _a.call(storeFields_1);
            }
            finally { if (e_27) throw e_27.error; }
        }
    };
    /**
     * The special wildcard symbol that can be passed to {@link MiniSearch#search}
     * to match all documents
     */
    MiniSearch.wildcard = Symbol('*');
    return MiniSearch;
}());
var getOwnProperty = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property) ? object[property] : undefined;
};
var combinators = (_a = {},
    _a[OR] = function (a, b) {
        var e_28, _a;
        try {
            for (var _b = __values(b.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var docId = _c.value;
                var existing = a.get(docId);
                if (existing == null) {
                    a.set(docId, b.get(docId));
                }
                else {
                    var _d = b.get(docId), score = _d.score, terms = _d.terms, match = _d.match;
                    existing.score = existing.score + score;
                    existing.match = Object.assign(existing.match, match);
                    assignUniqueTerms(existing.terms, terms);
                }
            }
        }
        catch (e_28_1) { e_28 = { error: e_28_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_28) throw e_28.error; }
        }
        return a;
    },
    _a[AND] = function (a, b) {
        var e_29, _a;
        var combined = new Map();
        try {
            for (var _b = __values(b.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var docId = _c.value;
                var existing = a.get(docId);
                if (existing == null)
                    continue;
                var _d = b.get(docId), score = _d.score, terms = _d.terms, match = _d.match;
                assignUniqueTerms(existing.terms, terms);
                combined.set(docId, {
                    score: existing.score + score,
                    terms: existing.terms,
                    match: Object.assign(existing.match, match)
                });
            }
        }
        catch (e_29_1) { e_29 = { error: e_29_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_29) throw e_29.error; }
        }
        return combined;
    },
    _a[AND_NOT] = function (a, b) {
        var e_30, _a;
        try {
            for (var _b = __values(b.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var docId = _c.value;
                a.delete(docId);
            }
        }
        catch (e_30_1) { e_30 = { error: e_30_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_30) throw e_30.error; }
        }
        return a;
    },
    _a);
var defaultBM25params = { k: 1.2, b: 0.7, d: 0.5 };
var calcBM25Score = function (termFreq, matchingCount, totalCount, fieldLength, avgFieldLength, bm25params) {
    var k = bm25params.k, b = bm25params.b, d = bm25params.d;
    var invDocFreq = Math.log(1 + (totalCount - matchingCount + 0.5) / (matchingCount + 0.5));
    return invDocFreq * (d + termFreq * (k + 1) / (termFreq + k * (1 - b + b * fieldLength / avgFieldLength)));
};
var termToQuerySpec = function (options) { return function (term, i, terms) {
    var fuzzy = (typeof options.fuzzy === 'function')
        ? options.fuzzy(term, i, terms)
        : (options.fuzzy || false);
    var prefix = (typeof options.prefix === 'function')
        ? options.prefix(term, i, terms)
        : (options.prefix === true);
    return { term: term, fuzzy: fuzzy, prefix: prefix };
}; };
var defaultOptions = {
    idField: 'id',
    extractField: function (document, fieldName) { return document[fieldName]; },
    tokenize: function (text) { return text.split(SPACE_OR_PUNCTUATION); },
    processTerm: function (term) { return term.toLowerCase(); },
    fields: undefined,
    searchOptions: undefined,
    storeFields: [],
    logger: function (level, message) {
        if (typeof (console === null || console === void 0 ? void 0 : console[level]) === 'function')
            console[level](message);
    },
    autoVacuum: true
};
var defaultSearchOptions = {
    combineWith: OR,
    prefix: false,
    fuzzy: false,
    maxFuzzy: 6,
    boost: {},
    weights: { fuzzy: 0.45, prefix: 0.375 },
    bm25: defaultBM25params
};
var defaultAutoSuggestOptions = {
    combineWith: AND,
    prefix: function (term, i, terms) {
        return i === terms.length - 1;
    }
};
var defaultVacuumOptions = { batchSize: 1000, batchWait: 10 };
var defaultVacuumConditions = { minDirtFactor: 0.1, minDirtCount: 20 };
var defaultAutoVacuumOptions = __assign(__assign({}, defaultVacuumOptions), defaultVacuumConditions);
var assignUniqueTerm = function (target, term) {
    // Avoid adding duplicate terms.
    if (!target.includes(term))
        target.push(term);
};
var assignUniqueTerms = function (target, source) {
    var e_31, _a;
    try {
        for (var source_1 = __values(source), source_1_1 = source_1.next(); !source_1_1.done; source_1_1 = source_1.next()) {
            var term = source_1_1.value;
            // Avoid adding duplicate terms.
            if (!target.includes(term))
                target.push(term);
        }
    }
    catch (e_31_1) { e_31 = { error: e_31_1 }; }
    finally {
        try {
            if (source_1_1 && !source_1_1.done && (_a = source_1.return)) _a.call(source_1);
        }
        finally { if (e_31) throw e_31.error; }
    }
};
var byScore = function (_a, _b) {
    var a = _a.score;
    var b = _b.score;
    return b - a;
};
var createMap = function () { return new Map(); };
var objectToNumericMap = function (object) {
    var e_32, _a;
    var map = new Map();
    try {
        for (var _b = __values(Object.keys(object)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            map.set(parseInt(key, 10), object[key]);
        }
    }
    catch (e_32_1) { e_32 = { error: e_32_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_32) throw e_32.error; }
    }
    return map;
};
// This regular expression matches any Unicode space or punctuation character
// Adapted from https://unicode.org/cldr/utility/list-unicodeset.jsp?a=%5Cp%7BZ%7D%5Cp%7BP%7D&abb=on&c=on&esc=on
var SPACE_OR_PUNCTUATION = /[\n\r -#%-*,-/:;?@[-\]_{}\u00A0\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2000-\u200A\u2010-\u2029\u202F-\u2043\u2045-\u2051\u2053-\u205F\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u3000-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]+/u;


//# sourceMappingURL=index.js.map


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**************************************!*\
  !*** ./src/background/background.js ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LOCAL_INDEX_ID: () => (/* binding */ LOCAL_INDEX_ID)
/* harmony export */ });
/* harmony import */ var minisearch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! minisearch */ "./node_modules/minisearch/dist/es/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* eslint-disable */


/**
 * Constants
 * --------------------------
 * LOCAL_INDEX_ID: Key for storing the search index in Chrome's local storage
 */
var LOCAL_INDEX_ID = "localSearchIndex";

/**
 * Debug Utilities
 * --------------
 * Functions for debugging and development.
 */
function exportStorageToFile() {
  console.log("Starting export...");
  chrome.storage.local.get(LOCAL_INDEX_ID, function (data) {
    console.log("Retrieved data:", data);
    var jsonString = JSON.stringify(data, null, 2);
    var dataUrl = 'data:application/json;base64,' + btoa(unescape(encodeURIComponent(jsonString)));
    chrome.downloads.download({
      url: dataUrl,
      filename: 'hawk_index_backup.json',
      saveAs: true
    }, function (downloadId) {
      console.log("Download started with ID:", downloadId);
    });
  });
}

// Make export function available globally
globalThis.exportIndex = exportStorageToFile;

// Also add to chrome object for service worker context
chrome.exportIndex = exportStorageToFile;

/**
 * Search Index Management
 * ----------------------
 * Handles creating, loading, and maintaining the search index.
 */
var createIndex = function createIndex(existingIndex) {
  var stopWords = ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now'];
  var indexDescriptor = {
    fields: ['title', 'allText'],
    storeFields: ['title'],
    idField: 'id',
    processTerm: function processTerm(term, _fieldName) {
      return stopWords.includes(term) ? null : term.toLowerCase();
    },
    searchOptions: {
      processTerm: function processTerm(term) {
        return term.toLowerCase();
      }
    }
  };
  var indexer = undefined;
  if (existingIndex === undefined) {
    indexer = new minisearch__WEBPACK_IMPORTED_MODULE_0__["default"](indexDescriptor);
  } else {
    indexer = minisearch__WEBPACK_IMPORTED_MODULE_0__["default"].loadJSON(existingIndex, indexDescriptor);
  }
  return indexer;
};

/**
 * Storage Interface
 * ----------------
 * Manages reading/writing the index from Chrome's local storage.
 */
var getStoredIndex = function getStoredIndex(cb) {
  chrome.storage.local.get(LOCAL_INDEX_ID, function (data) {
    cb(data[LOCAL_INDEX_ID]);
  });
};
var storeIndex = function storeIndex(indexData) {
  var data = _defineProperty({}, LOCAL_INDEX_ID, indexData);
  chrome.storage.local.set(data, function () {
    console.log('Index data saved[' + data.length + ']');
  });
};

/**
 * Index Access and Manipulation
 * ---------------------------
 * Functions for retrieving, adding, and updating indexed documents.
 */
var getIndex = function getIndex() {
  if (!chrome.indexer) {
    initialiseIndexer();
  }
  return chrome.indexer;
};

/**
 * TODO: Implement this function to replace the indexer data
 */
var replaceIndexerData = function replaceIndexerData() {};
var addToIndex = function addToIndex(document) {
  var idx = getIndex();
  if (idx) {
    console.time("Indexing Doc:" + document.id);
    if (idx.has(document.id)) {
      idx.replace(document);
      console.log("Replacing doc in the index");
    } else {
      idx.add(document);
      console.log("Adding new doc in the index");
    }
    console.timeEnd("Indexing Doc:" + document.id);
    console.time("Storing the whole Index");
    var data = JSON.stringify(idx);
    storeIndex(data);
    console.timeEnd("Storing the whole Index");
  }
};

/**
 * Search and Results Processing
 * ---------------------------
 * Handles querying the index and formatting results.
 */
var search = function search(document, options) {
  var idx = getIndex();
  return idx.search(document);
};
var sendResults = function sendResults(searchQuery, sendResponse) {
  var searchResults = search(searchQuery, null);
  var suggestions = [];
  for (var i = 0; i < searchResults.length && i < 5; i++) {
    suggestions.push({
      content: searchResults[i].id,
      description: removeSpecialCharacters(searchResults[i].title)
    });
    console.log({
      content: searchResults[i].id,
      description: searchResults[i].title
    });
  }
  console.log("numbers of suggestions:" + suggestions.length);
  sendResponse(suggestions);
};

/**
 * Message Handling
 * ---------------
 * Processes messages from content scripts and the popup.
 */
var indexingListener = function indexingListener(request, sender, sendResponse) {
  if (request.from === 'popup' && request.subject === 'indexerData') {
    sendResponse(chrome.storedIndex);
  } else if (request.from === 'popup' && request.subject === 'setIndexerData') {
    var isSuccessful = replaceIndexerData(request.content);
  } else if (request.action === 'exportIndex') {
    exportStorageToFile();
    sendResponse({
      status: 'exporting'
    });
  } else {
    addToIndex(request.document);
    sendResponse("OK:Indexed");
  }
};

/**
 * Initialization
 * -------------
 * Sets up the extension and search indexer.
 */
var initialiseIndexer = function initialiseIndexer() {
  var initialiseIndexerAsync = function initialiseIndexerAsync(indexerData) {
    if (indexerData && indexerData.length > 0) {
      chrome.storedIndex = indexerData;
    }
    chrome.indexer = createIndex(chrome.storedIndex);
  };
  getStoredIndex(initialiseIndexerAsync);
};

/**
 * Utility Functions
 * ----------------
 */
var removeSpecialCharacters = function removeSpecialCharacters(stringToBeSanitized) {
  var specialChars = "!@#$^&%*+=[]\/{}|:<>?,.";
  for (var i = 0; i < specialChars.length; i++) {
    stringToBeSanitized = stringToBeSanitized.replace(new RegExp("\\" + specialChars[i], "gi"), "");
  }
  return stringToBeSanitized;
};

// Initialize extension and set up listeners
initialiseIndexer();
chrome.runtime.onMessage.addListener(indexingListener);
chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
  sendResults(text, suggest);
});
chrome.omnibox.onInputEntered.addListener(function (text, OnInputEnteredDisposition) {
  chrome.tabs.update({
    url: text
  });
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IscUJBQXFCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixxQkFBcUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IscUJBQXFCO0FBQ3ZDO0FBQ0Esc0RBQXNEO0FBQ3RELHNCQUFzQixxQkFBcUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9GQUFvRixtQkFBbUI7QUFDdkc7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixxQkFBcUI7QUFDdkM7QUFDQSxpREFBaUQ7QUFDakQsc0JBQXNCLHFCQUFxQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsVUFBVTtBQUN2RTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCxVQUFVO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsd0JBQXdCO0FBQ3JEO0FBQ0EsaUZBQWlGLFVBQVU7QUFDM0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFFBQVE7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksa0JBQWtCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsZ0dBQWdHO0FBQzFHLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsMkJBQTJCO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsMkNBQTJDO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FB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QUksRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxLQUFLLENBQUM7RUFFNzNCLElBQU1DLGVBQWUsR0FBRztJQUN0QkMsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQztJQUM1QkMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDO0lBQ3RCQyxPQUFPLEVBQUUsSUFBSTtJQUNiQyxXQUFXLEVBQUUsU0FBYkEsV0FBV0EsQ0FBR0MsSUFBSSxFQUFFQyxVQUFVO01BQUEsT0FDNUJQLFNBQVMsQ0FBQ1EsUUFBUSxDQUFDRixJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUdBLElBQUksQ0FBQ0csV0FBVyxDQUFDLENBQUM7SUFBQTtJQUN0REMsYUFBYSxFQUFFO01BQ2JM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NUMsS0FBSyxJQUFJbEIsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHa0IsWUFBWSxDQUFDdEMsTUFBTSxFQUFFb0IsQ0FBQyxFQUFFLEVBQUU7SUFDNUNpQixtQkFBbUIsR0FBR0EsbUJBQW1CLENBQUMzQixPQUFPLENBQUMsSUFBSTZCLE1BQU0sQ0FBQyxJQUFJLEdBQUdELFlBQVksQ0FBQ2xCLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztFQUNqRztFQUNBLE9BQU9pQixtQkFBbUI7QUFDNUIsQ0FBQzs7QUFFRDtBQUNBbkMsaUJBQWlCLENBQUMsQ0FBQztBQUNuQjVDLE1BQU0sQ0FBQ2tGLE9BQU8sQ0FBQ0MsU0FBUyxDQUFDQyxXQUFXLENBQUNoQixnQkFBZ0IsQ0FBQztBQUV0RHBFLE1BQU0sQ0FBQ3FGLE9BQU8sQ0FBQ0MsY0FBYyxDQUFDRixXQUFXLENBQUMsVUFBQ0csSUFBSSxFQUFDQyxPQUFPLEVBQUs7RUFDMUQvQixXQUFXLENBQUM4QixJQUFJLEVBQUNDLE9BQU8sQ0FBQztBQUMzQixDQUFDLENBQUM7QUFFRnhGLE1BQU0sQ0FBQ3FGLE9BQU8sQ0FBQ0ksY0FBYyxDQUFDTCxXQUFXLENBQUMsVUFBQ0csSUFBSSxFQUFFRyx5QkFBeUIsRUFBSztFQUM3RTFGLE1BQU0sQ0FBQzJGLElBQUksQ0FBQ0MsTUFBTSxDQUFDO0lBQUM5RSxHQUFHLEVBQUN5RTtFQUFJLENBQUMsQ0FBQztBQUNoQyxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2hhd2svLi9ub2RlX21vZHVsZXMvbWluaXNlYXJjaC9kaXN0L2VzL2luZGV4LmpzIiwid2VicGFjazovL2hhd2svd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vaGF3ay93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vaGF3ay93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2hhd2svd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9oYXdrLy4vc3JjL2JhY2tncm91bmQvYmFja2dyb3VuZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UsIFN1cHByZXNzZWRFcnJvciwgU3ltYm9sICovXHJcblxyXG5cclxudmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG50eXBlb2YgU3VwcHJlc3NlZEVycm9yID09PSBcImZ1bmN0aW9uXCIgPyBTdXBwcmVzc2VkRXJyb3IgOiBmdW5jdGlvbiAoZXJyb3IsIHN1cHByZXNzZWQsIG1lc3NhZ2UpIHtcclxuICAgIHZhciBlID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgcmV0dXJuIGUubmFtZSA9IFwiU3VwcHJlc3NlZEVycm9yXCIsIGUuZXJyb3IgPSBlcnJvciwgZS5zdXBwcmVzc2VkID0gc3VwcHJlc3NlZCwgZTtcclxufTtcblxuLyoqIEBpZ25vcmUgKi9cbnZhciBFTlRSSUVTID0gJ0VOVFJJRVMnO1xuLyoqIEBpZ25vcmUgKi9cbnZhciBLRVlTID0gJ0tFWVMnO1xuLyoqIEBpZ25vcmUgKi9cbnZhciBWQUxVRVMgPSAnVkFMVUVTJztcbi8qKiBAaWdub3JlICovXG52YXIgTEVBRiA9ICcnO1xuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG52YXIgVHJlZUl0ZXJhdG9yID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRyZWVJdGVyYXRvcihzZXQsIHR5cGUpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBzZXQuX3RyZWU7XG4gICAgICAgIHZhciBrZXlzID0gQXJyYXkuZnJvbShub2RlLmtleXMoKSk7XG4gICAgICAgIHRoaXMuc2V0ID0gc2V0O1xuICAgICAgICB0aGlzLl90eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5fcGF0aCA9IGtleXMubGVuZ3RoID4gMCA/IFt7IG5vZGU6IG5vZGUsIGtleXM6IGtleXMgfV0gOiBbXTtcbiAgICB9XG4gICAgVHJlZUl0ZXJhdG9yLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmRpdmUoKTtcbiAgICAgICAgdGhpcy5iYWNrdHJhY2soKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gICAgVHJlZUl0ZXJhdG9yLnByb3RvdHlwZS5kaXZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fcGF0aC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB7IGRvbmU6IHRydWUsIHZhbHVlOiB1bmRlZmluZWQgfTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgX2EgPSBsYXN0JDEodGhpcy5fcGF0aCksIG5vZGUgPSBfYS5ub2RlLCBrZXlzID0gX2Eua2V5cztcbiAgICAgICAgaWYgKGxhc3QkMShrZXlzKSA9PT0gTEVBRikge1xuICAgICAgICAgICAgcmV0dXJuIHsgZG9uZTogZmFsc2UsIHZhbHVlOiB0aGlzLnJlc3VsdCgpIH07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNoaWxkID0gbm9kZS5nZXQobGFzdCQxKGtleXMpKTtcbiAgICAgICAgdGhpcy5fcGF0aC5wdXNoKHsgbm9kZTogY2hpbGQsIGtleXM6IEFycmF5LmZyb20oY2hpbGQua2V5cygpKSB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGl2ZSgpO1xuICAgIH07XG4gICAgVHJlZUl0ZXJhdG9yLnByb3RvdHlwZS5iYWNrdHJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9wYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBrZXlzID0gbGFzdCQxKHRoaXMuX3BhdGgpLmtleXM7XG4gICAgICAgIGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXlzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wYXRoLnBvcCgpO1xuICAgICAgICB0aGlzLmJhY2t0cmFjaygpO1xuICAgIH07XG4gICAgVHJlZUl0ZXJhdG9yLnByb3RvdHlwZS5rZXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldC5fcHJlZml4ICsgdGhpcy5fcGF0aFxuICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHZhciBrZXlzID0gX2Eua2V5cztcbiAgICAgICAgICAgIHJldHVybiBsYXN0JDEoa2V5cyk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGtleSAhPT0gTEVBRjsgfSlcbiAgICAgICAgICAgIC5qb2luKCcnKTtcbiAgICB9O1xuICAgIFRyZWVJdGVyYXRvci5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBsYXN0JDEodGhpcy5fcGF0aCkubm9kZS5nZXQoTEVBRik7XG4gICAgfTtcbiAgICBUcmVlSXRlcmF0b3IucHJvdG90eXBlLnJlc3VsdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLl90eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIHRoaXMudmFsdWUoKTtcbiAgICAgICAgICAgIGNhc2UgS0VZUzogcmV0dXJuIHRoaXMua2V5KCk7XG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gW3RoaXMua2V5KCksIHRoaXMudmFsdWUoKV07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFRyZWVJdGVyYXRvci5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICByZXR1cm4gVHJlZUl0ZXJhdG9yO1xufSgpKTtcbnZhciBsYXN0JDEgPSBmdW5jdGlvbiAoYXJyYXkpIHtcbiAgICByZXR1cm4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV07XG59O1xuXG4vKipcbiAqIEBpZ25vcmVcbiAqL1xudmFyIGZ1enp5U2VhcmNoID0gZnVuY3Rpb24gKG5vZGUsIHF1ZXJ5LCBtYXhEaXN0YW5jZSkge1xuICAgIHZhciByZXN1bHRzID0gbmV3IE1hcCgpO1xuICAgIGlmIChxdWVyeSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAvLyBOdW1iZXIgb2YgY29sdW1ucyBpbiB0aGUgTGV2ZW5zaHRlaW4gbWF0cml4LlxuICAgIHZhciBuID0gcXVlcnkubGVuZ3RoICsgMTtcbiAgICAvLyBNYXRjaGluZyB0ZXJtcyBjYW4gbmV2ZXIgYmUgbG9uZ2VyIHRoYW4gTiArIG1heERpc3RhbmNlLlxuICAgIHZhciBtID0gbiArIG1heERpc3RhbmNlO1xuICAgIC8vIEZpbGwgZmlyc3QgbWF0cml4IHJvdyBhbmQgY29sdW1uIHdpdGggbnVtYmVyczogMCAxIDIgMyAuLi5cbiAgICB2YXIgbWF0cml4ID0gbmV3IFVpbnQ4QXJyYXkobSAqIG4pLmZpbGwobWF4RGlzdGFuY2UgKyAxKTtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IG47ICsrailcbiAgICAgICAgbWF0cml4W2pdID0gajtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IG07ICsraSlcbiAgICAgICAgbWF0cml4W2kgKiBuXSA9IGk7XG4gICAgcmVjdXJzZShub2RlLCBxdWVyeSwgbWF4RGlzdGFuY2UsIHJlc3VsdHMsIG1hdHJpeCwgMSwgbiwgJycpO1xuICAgIHJldHVybiByZXN1bHRzO1xufTtcbi8vIE1vZGlmaWVkIHZlcnNpb24gb2YgaHR0cDovL3N0ZXZlaGFub3YuY2EvYmxvZy8/aWQ9MTE0XG4vLyBUaGlzIGJ1aWxkcyBhIExldmVuc2h0ZWluIG1hdHJpeCBmb3IgYSBnaXZlbiBxdWVyeSBhbmQgY29udGludW91c2x5IHVwZGF0ZXNcbi8vIGl0IGZvciBub2RlcyBpbiB0aGUgcmFkaXggdHJlZSB0aGF0IGZhbGwgd2l0aGluIHRoZSBnaXZlbiBtYXhpbXVtIGVkaXRcbi8vIGRpc3RhbmNlLiBLZWVwaW5nIHRoZSBzYW1lIG1hdHJpeCBhcm91bmQgaXMgYmVuZWZpY2lhbCBlc3BlY2lhbGx5IGZvciBsYXJnZXJcbi8vIGVkaXQgZGlzdGFuY2VzLlxuLy9cbi8vICAgICAgICAgICBrICAgYSAgIHQgICBlICAgPC0tIHF1ZXJ5XG4vLyAgICAgICAwICAgMSAgIDIgICAzICAgNFxuLy8gICBjICAgMSAgIDEgICAyICAgMyAgIDRcbi8vICAgYSAgIDIgICAyICAgMSAgIDIgICAzXG4vLyAgIHQgICAzICAgMyAgIDIgICAxICBbMl0gIDwtLSBlZGl0IGRpc3RhbmNlXG4vLyAgIF5cbi8vICAgXiB0ZXJtIGluIHJhZGl4IHRyZWUsIHJvd3MgYXJlIGFkZGVkIGFuZCByZW1vdmVkIGFzIG5lZWRlZFxudmFyIHJlY3Vyc2UgPSBmdW5jdGlvbiAobm9kZSwgcXVlcnksIG1heERpc3RhbmNlLCByZXN1bHRzLCBtYXRyaXgsIG0sIG4sIHByZWZpeCkge1xuICAgIHZhciBlXzEsIF9hO1xuICAgIHZhciBvZmZzZXQgPSBtICogbjtcbiAgICB0cnkge1xuICAgICAgICBrZXk6IGZvciAodmFyIF9iID0gX192YWx1ZXMobm9kZS5rZXlzKCkpLCBfYyA9IF9iLm5leHQoKTsgIV9jLmRvbmU7IF9jID0gX2IubmV4dCgpKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gX2MudmFsdWU7XG4gICAgICAgICAgICBpZiAoa2V5ID09PSBMRUFGKSB7XG4gICAgICAgICAgICAgICAgLy8gV2UndmUgcmVhY2hlZCBhIGxlYWYgbm9kZS4gQ2hlY2sgaWYgdGhlIGVkaXQgZGlzdGFuY2UgYWNjZXB0YWJsZSBhbmRcbiAgICAgICAgICAgICAgICAvLyBzdG9yZSB0aGUgcmVzdWx0IGlmIGl0IGlzLlxuICAgICAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IG1hdHJpeFtvZmZzZXQgLSAxXTtcbiAgICAgICAgICAgICAgICBpZiAoZGlzdGFuY2UgPD0gbWF4RGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5zZXQocHJlZml4LCBbbm9kZS5nZXQoa2V5KSwgZGlzdGFuY2VdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBJdGVyYXRlIG92ZXIgYWxsIGNoYXJhY3RlcnMgaW4gdGhlIGtleS4gVXBkYXRlIHRoZSBMZXZlbnNodGVpbiBtYXRyaXhcbiAgICAgICAgICAgICAgICAvLyBhbmQgY2hlY2sgaWYgdGhlIG1pbmltdW0gZGlzdGFuY2UgaW4gdGhlIGxhc3Qgcm93IGlzIHN0aWxsIHdpdGhpbiB0aGVcbiAgICAgICAgICAgICAgICAvLyBtYXhpbXVtIGVkaXQgZGlzdGFuY2UuIElmIGl0IGlzLCB3ZSBjYW4gcmVjdXJzZSBvdmVyIGFsbCBjaGlsZCBub2Rlcy5cbiAgICAgICAgICAgICAgICB2YXIgaSA9IG07XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcG9zID0gMDsgcG9zIDwga2V5Lmxlbmd0aDsgKytwb3MsICsraSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2hhciA9IGtleVtwb3NdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGhpc1Jvd09mZnNldCA9IG4gKiBpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJldlJvd09mZnNldCA9IHRoaXNSb3dPZmZzZXQgLSBuO1xuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIGZpcnN0IGNvbHVtbiBiYXNlZCBvbiB0aGUgcHJldmlvdXMgcm93LCBhbmQgaW5pdGlhbGl6ZSB0aGVcbiAgICAgICAgICAgICAgICAgICAgLy8gbWluaW11bSBkaXN0YW5jZSBpbiB0aGUgY3VycmVudCByb3cuXG4gICAgICAgICAgICAgICAgICAgIHZhciBtaW5EaXN0YW5jZSA9IG1hdHJpeFt0aGlzUm93T2Zmc2V0XTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGptaW4gPSBNYXRoLm1heCgwLCBpIC0gbWF4RGlzdGFuY2UgLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGptYXggPSBNYXRoLm1pbihuIC0gMSwgaSArIG1heERpc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gSXRlcmF0ZSBvdmVyIHJlbWFpbmluZyBjb2x1bW5zIChjaGFyYWN0ZXJzIGluIHRoZSBxdWVyeSkuXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSBqbWluOyBqIDwgam1heDsgKytqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGlmZmVyZW50ID0gY2hhciAhPT0gcXVlcnlbal07XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJdCBtaWdodCBtYWtlIHNlbnNlIHRvIG9ubHkgcmVhZCB0aGUgbWF0cml4IHBvc2l0aW9ucyB1c2VkIGZvclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGVsZXRpb24vaW5zZXJ0aW9uIGlmIHRoZSBjaGFyYWN0ZXJzIGFyZSBkaWZmZXJlbnQuIEJ1dCB3ZSB3YW50IHRvXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhdm9pZCBjb25kaXRpb25hbCByZWFkcyBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucy5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBycGwgPSBtYXRyaXhbcHJldlJvd09mZnNldCArIGpdICsgK2RpZmZlcmVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWwgPSBtYXRyaXhbcHJldlJvd09mZnNldCArIGogKyAxXSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5zID0gbWF0cml4W3RoaXNSb3dPZmZzZXQgKyBqXSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGlzdCA9IG1hdHJpeFt0aGlzUm93T2Zmc2V0ICsgaiArIDFdID0gTWF0aC5taW4ocnBsLCBkZWwsIGlucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlzdCA8IG1pbkRpc3RhbmNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbkRpc3RhbmNlID0gZGlzdDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBCZWNhdXNlIGRpc3RhbmNlIHdpbGwgbmV2ZXIgZGVjcmVhc2UsIHdlIGNhbiBzdG9wLiBUaGVyZSB3aWxsIGJlIG5vXG4gICAgICAgICAgICAgICAgICAgIC8vIG1hdGNoaW5nIGNoaWxkIG5vZGVzLlxuICAgICAgICAgICAgICAgICAgICBpZiAobWluRGlzdGFuY2UgPiBtYXhEaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWUga2V5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlY3Vyc2Uobm9kZS5nZXQoa2V5KSwgcXVlcnksIG1heERpc3RhbmNlLCByZXN1bHRzLCBtYXRyaXgsIGksIG4sIHByZWZpeCArIGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChfYyAmJiAhX2MuZG9uZSAmJiAoX2EgPSBfYi5yZXR1cm4pKSBfYS5jYWxsKF9iKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9XG4gICAgfVxufTtcblxuLyoqXG4gKiBBIGNsYXNzIGltcGxlbWVudGluZyB0aGUgc2FtZSBpbnRlcmZhY2UgYXMgYSBzdGFuZGFyZCBKYXZhU2NyaXB0XG4gKiBbYE1hcGBdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hcClcbiAqIHdpdGggc3RyaW5nIGtleXMsIGJ1dCBhZGRpbmcgc3VwcG9ydCBmb3IgZWZmaWNpZW50bHkgc2VhcmNoaW5nIGVudHJpZXMgd2l0aFxuICogcHJlZml4IG9yIGZ1enp5IHNlYXJjaC4gVGhpcyBjbGFzcyBpcyB1c2VkIGludGVybmFsbHkgYnkge0BsaW5rIE1pbmlTZWFyY2h9XG4gKiBhcyB0aGUgaW52ZXJ0ZWQgaW5kZXggZGF0YSBzdHJ1Y3R1cmUuIFRoZSBpbXBsZW1lbnRhdGlvbiBpcyBhIHJhZGl4IHRyZWVcbiAqIChjb21wcmVzc2VkIHByZWZpeCB0cmVlKS5cbiAqXG4gKiBTaW5jZSB0aGlzIGNsYXNzIGNhbiBiZSBvZiBnZW5lcmFsIHV0aWxpdHkgYmV5b25kIF9NaW5pU2VhcmNoXywgaXQgaXNcbiAqIGV4cG9ydGVkIGJ5IHRoZSBgbWluaXNlYXJjaGAgcGFja2FnZSBhbmQgY2FuIGJlIGltcG9ydGVkIChvciByZXF1aXJlZCkgYXNcbiAqIGBtaW5pc2VhcmNoL1NlYXJjaGFibGVNYXBgLlxuICpcbiAqIEB0eXBlUGFyYW0gVCAgVGhlIHR5cGUgb2YgdGhlIHZhbHVlcyBzdG9yZWQgaW4gdGhlIG1hcC5cbiAqL1xudmFyIFNlYXJjaGFibGVNYXAgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGlzIG5vcm1hbGx5IGNhbGxlZCB3aXRob3V0IGFyZ3VtZW50cywgY3JlYXRpbmcgYW4gZW1wdHlcbiAgICAgKiBtYXAuIEluIG9yZGVyIHRvIGNyZWF0ZSBhIHtAbGluayBTZWFyY2hhYmxlTWFwfSBmcm9tIGFuIGl0ZXJhYmxlIG9yIGZyb20gYW5cbiAgICAgKiBvYmplY3QsIGNoZWNrIHtAbGluayBTZWFyY2hhYmxlTWFwLmZyb219IGFuZCB7QGxpbmtcbiAgICAgKiBTZWFyY2hhYmxlTWFwLmZyb21PYmplY3R9LlxuICAgICAqXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGFyZ3VtZW50cyBhcmUgZm9yIGludGVybmFsIHVzZSwgd2hlbiBjcmVhdGluZyBkZXJpdmVkXG4gICAgICogbXV0YWJsZSB2aWV3cyBvZiBhIG1hcCBhdCBhIHByZWZpeC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBTZWFyY2hhYmxlTWFwKHRyZWUsIHByZWZpeCkge1xuICAgICAgICBpZiAodHJlZSA9PT0gdm9pZCAwKSB7IHRyZWUgPSBuZXcgTWFwKCk7IH1cbiAgICAgICAgaWYgKHByZWZpeCA9PT0gdm9pZCAwKSB7IHByZWZpeCA9ICcnOyB9XG4gICAgICAgIHRoaXMuX3NpemUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuX3RyZWUgPSB0cmVlO1xuICAgICAgICB0aGlzLl9wcmVmaXggPSBwcmVmaXg7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSBtdXRhYmxlIHZpZXcgb2YgdGhpcyB7QGxpbmsgU2VhcmNoYWJsZU1hcH0sXG4gICAgICogY29udGFpbmluZyBvbmx5IGVudHJpZXMgdGhhdCBzaGFyZSB0aGUgZ2l2ZW4gcHJlZml4LlxuICAgICAqXG4gICAgICogIyMjIFVzYWdlOlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIGxldCBtYXAgPSBuZXcgU2VhcmNoYWJsZU1hcCgpXG4gICAgICogbWFwLnNldChcInVuaWNvcm5cIiwgMSlcbiAgICAgKiBtYXAuc2V0KFwidW5pdmVyc2VcIiwgMilcbiAgICAgKiBtYXAuc2V0KFwidW5pdmVyc2l0eVwiLCAzKVxuICAgICAqIG1hcC5zZXQoXCJ1bmlxdWVcIiwgNClcbiAgICAgKiBtYXAuc2V0KFwiaGVsbG9cIiwgNSlcbiAgICAgKlxuICAgICAqIGxldCB1bmkgPSBtYXAuYXRQcmVmaXgoXCJ1bmlcIilcbiAgICAgKiB1bmkuZ2V0KFwidW5pcXVlXCIpIC8vID0+IDRcbiAgICAgKiB1bmkuZ2V0KFwidW5pY29yblwiKSAvLyA9PiAxXG4gICAgICogdW5pLmdldChcImhlbGxvXCIpIC8vID0+IHVuZGVmaW5lZFxuICAgICAqXG4gICAgICogbGV0IHVuaXZlciA9IG1hcC5hdFByZWZpeChcInVuaXZlclwiKVxuICAgICAqIHVuaXZlci5nZXQoXCJ1bmlxdWVcIikgLy8gPT4gdW5kZWZpbmVkXG4gICAgICogdW5pdmVyLmdldChcInVuaXZlcnNlXCIpIC8vID0+IDJcbiAgICAgKiB1bml2ZXIuZ2V0KFwidW5pdmVyc2l0eVwiKSAvLyA9PiAzXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcHJlZml4ICBUaGUgcHJlZml4XG4gICAgICogQHJldHVybiBBIHtAbGluayBTZWFyY2hhYmxlTWFwfSByZXByZXNlbnRpbmcgYSBtdXRhYmxlIHZpZXcgb2YgdGhlIG9yaWdpbmFsXG4gICAgICogTWFwIGF0IHRoZSBnaXZlbiBwcmVmaXhcbiAgICAgKi9cbiAgICBTZWFyY2hhYmxlTWFwLnByb3RvdHlwZS5hdFByZWZpeCA9IGZ1bmN0aW9uIChwcmVmaXgpIHtcbiAgICAgICAgdmFyIGVfMSwgX2E7XG4gICAgICAgIGlmICghcHJlZml4LnN0YXJ0c1dpdGgodGhpcy5fcHJlZml4KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNtYXRjaGVkIHByZWZpeCcpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBfYiA9IF9fcmVhZCh0cmFja0Rvd24odGhpcy5fdHJlZSwgcHJlZml4LnNsaWNlKHRoaXMuX3ByZWZpeC5sZW5ndGgpKSwgMiksIG5vZGUgPSBfYlswXSwgcGF0aCA9IF9iWzFdO1xuICAgICAgICBpZiAobm9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgX2MgPSBfX3JlYWQobGFzdChwYXRoKSwgMiksIHBhcmVudE5vZGUgPSBfY1swXSwga2V5ID0gX2NbMV07XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIF9kID0gX192YWx1ZXMocGFyZW50Tm9kZS5rZXlzKCkpLCBfZSA9IF9kLm5leHQoKTsgIV9lLmRvbmU7IF9lID0gX2QubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBrID0gX2UudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrICE9PSBMRUFGICYmIGsuc3RhcnRzV2l0aChrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZV8xID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZV8xLnNldChrLnNsaWNlKGtleS5sZW5ndGgpLCBwYXJlbnROb2RlLmdldChrKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFNlYXJjaGFibGVNYXAobm9kZV8xLCBwcmVmaXgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfZSAmJiAhX2UuZG9uZSAmJiAoX2EgPSBfZC5yZXR1cm4pKSBfYS5jYWxsKF9kKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoYWJsZU1hcChub2RlLCBwcmVmaXgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9NYXAvY2xlYXJcbiAgICAgKi9cbiAgICBTZWFyY2hhYmxlTWFwLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fc2l6ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5fdHJlZS5jbGVhcigpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9NYXAvZGVsZXRlXG4gICAgICogQHBhcmFtIGtleSAgS2V5IHRvIGRlbGV0ZVxuICAgICAqL1xuICAgIFNlYXJjaGFibGVNYXAucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgdGhpcy5fc2l6ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIHJlbW92ZSh0aGlzLl90cmVlLCBrZXkpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9NYXAvZW50cmllc1xuICAgICAqIEByZXR1cm4gQW4gaXRlcmF0b3IgaXRlcmF0aW5nIHRocm91Z2ggYFtrZXksIHZhbHVlXWAgZW50cmllcy5cbiAgICAgKi9cbiAgICBTZWFyY2hhYmxlTWFwLnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IFRyZWVJdGVyYXRvcih0aGlzLCBFTlRSSUVTKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTWFwL2ZvckVhY2hcbiAgICAgKiBAcGFyYW0gZm4gIEl0ZXJhdGlvbiBmdW5jdGlvblxuICAgICAqL1xuICAgIFNlYXJjaGFibGVNYXAucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgdmFyIGVfMiwgX2E7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfYiA9IF9fdmFsdWVzKHRoaXMpLCBfYyA9IF9iLm5leHQoKTsgIV9jLmRvbmU7IF9jID0gX2IubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9kID0gX19yZWFkKF9jLnZhbHVlLCAyKSwga2V5ID0gX2RbMF0sIHZhbHVlID0gX2RbMV07XG4gICAgICAgICAgICAgICAgZm4oa2V5LCB2YWx1ZSwgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfMl8xKSB7IGVfMiA9IHsgZXJyb3I6IGVfMl8xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChfYyAmJiAhX2MuZG9uZSAmJiAoX2EgPSBfYi5yZXR1cm4pKSBfYS5jYWxsKF9iKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8yKSB0aHJvdyBlXzIuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIE1hcCBvZiBhbGwgdGhlIGVudHJpZXMgdGhhdCBoYXZlIGEga2V5IHdpdGhpbiB0aGUgZ2l2ZW4gZWRpdFxuICAgICAqIGRpc3RhbmNlIGZyb20gdGhlIHNlYXJjaCBrZXkuIFRoZSBrZXlzIG9mIHRoZSByZXR1cm5lZCBNYXAgYXJlIHRoZSBtYXRjaGluZ1xuICAgICAqIGtleXMsIHdoaWxlIHRoZSB2YWx1ZXMgYXJlIHR3by1lbGVtZW50IGFycmF5cyB3aGVyZSB0aGUgZmlyc3QgZWxlbWVudCBpc1xuICAgICAqIHRoZSB2YWx1ZSBhc3NvY2lhdGVkIHRvIHRoZSBrZXksIGFuZCB0aGUgc2Vjb25kIGlzIHRoZSBlZGl0IGRpc3RhbmNlIG9mIHRoZVxuICAgICAqIGtleSB0byB0aGUgc2VhcmNoIGtleS5cbiAgICAgKlxuICAgICAqICMjIyBVc2FnZTpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiBsZXQgbWFwID0gbmV3IFNlYXJjaGFibGVNYXAoKVxuICAgICAqIG1hcC5zZXQoJ2hlbGxvJywgJ3dvcmxkJylcbiAgICAgKiBtYXAuc2V0KCdoZWxsJywgJ3llYWgnKVxuICAgICAqIG1hcC5zZXQoJ2NpYW8nLCAnbW9uZG8nKVxuICAgICAqXG4gICAgICogLy8gR2V0IGFsbCBlbnRyaWVzIHRoYXQgbWF0Y2ggdGhlIGtleSAnaGFsbG8nIHdpdGggYSBtYXhpbXVtIGVkaXQgZGlzdGFuY2Ugb2YgMlxuICAgICAqIG1hcC5mdXp6eUdldCgnaGFsbG8nLCAyKVxuICAgICAqIC8vID0+IE1hcCgyKSB7ICdoZWxsbycgPT4gWyd3b3JsZCcsIDFdLCAnaGVsbCcgPT4gWyd5ZWFoJywgMl0gfVxuICAgICAqXG4gICAgICogLy8gSW4gdGhlIGV4YW1wbGUsIHRoZSBcImhlbGxvXCIga2V5IGhhcyB2YWx1ZSBcIndvcmxkXCIgYW5kIGVkaXQgZGlzdGFuY2Ugb2YgMVxuICAgICAqIC8vIChjaGFuZ2UgXCJlXCIgdG8gXCJhXCIpLCB0aGUga2V5IFwiaGVsbFwiIGhhcyB2YWx1ZSBcInllYWhcIiBhbmQgZWRpdCBkaXN0YW5jZSBvZiAyXG4gICAgICogLy8gKGNoYW5nZSBcImVcIiB0byBcImFcIiwgZGVsZXRlIFwib1wiKVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogQHBhcmFtIGtleSAgVGhlIHNlYXJjaCBrZXlcbiAgICAgKiBAcGFyYW0gbWF4RWRpdERpc3RhbmNlICBUaGUgbWF4aW11bSBlZGl0IGRpc3RhbmNlIChMZXZlbnNodGVpbilcbiAgICAgKiBAcmV0dXJuIEEgTWFwIG9mIHRoZSBtYXRjaGluZyBrZXlzIHRvIHRoZWlyIHZhbHVlIGFuZCBlZGl0IGRpc3RhbmNlXG4gICAgICovXG4gICAgU2VhcmNoYWJsZU1hcC5wcm90b3R5cGUuZnV6enlHZXQgPSBmdW5jdGlvbiAoa2V5LCBtYXhFZGl0RGlzdGFuY2UpIHtcbiAgICAgICAgcmV0dXJuIGZ1enp5U2VhcmNoKHRoaXMuX3RyZWUsIGtleSwgbWF4RWRpdERpc3RhbmNlKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTWFwL2dldFxuICAgICAqIEBwYXJhbSBrZXkgIEtleSB0byBnZXRcbiAgICAgKiBAcmV0dXJuIFZhbHVlIGFzc29jaWF0ZWQgdG8gdGhlIGtleSwgb3IgYHVuZGVmaW5lZGAgaWYgdGhlIGtleSBpcyBub3RcbiAgICAgKiBmb3VuZC5cbiAgICAgKi9cbiAgICBTZWFyY2hhYmxlTWFwLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHZhciBub2RlID0gbG9va3VwKHRoaXMuX3RyZWUsIGtleSk7XG4gICAgICAgIHJldHVybiBub2RlICE9PSB1bmRlZmluZWQgPyBub2RlLmdldChMRUFGKSA6IHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTWFwL2hhc1xuICAgICAqIEBwYXJhbSBrZXkgIEtleVxuICAgICAqIEByZXR1cm4gVHJ1ZSBpZiB0aGUga2V5IGlzIGluIHRoZSBtYXAsIGZhbHNlIG90aGVyd2lzZVxuICAgICAqL1xuICAgIFNlYXJjaGFibGVNYXAucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBsb29rdXAodGhpcy5fdHJlZSwga2V5KTtcbiAgICAgICAgcmV0dXJuIG5vZGUgIT09IHVuZGVmaW5lZCAmJiBub2RlLmhhcyhMRUFGKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTWFwL2tleXNcbiAgICAgKiBAcmV0dXJuIEFuIGBJdGVyYWJsZWAgaXRlcmF0aW5nIHRocm91Z2gga2V5c1xuICAgICAqL1xuICAgIFNlYXJjaGFibGVNYXAucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVHJlZUl0ZXJhdG9yKHRoaXMsIEtFWVMpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9NYXAvc2V0XG4gICAgICogQHBhcmFtIGtleSAgS2V5IHRvIHNldFxuICAgICAqIEBwYXJhbSB2YWx1ZSAgVmFsdWUgdG8gYXNzb2NpYXRlIHRvIHRoZSBrZXlcbiAgICAgKiBAcmV0dXJuIFRoZSB7QGxpbmsgU2VhcmNoYWJsZU1hcH0gaXRzZWxmLCB0byBhbGxvdyBjaGFpbmluZ1xuICAgICAqL1xuICAgIFNlYXJjaGFibGVNYXAucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdrZXkgbXVzdCBiZSBhIHN0cmluZycpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NpemUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHZhciBub2RlID0gY3JlYXRlUGF0aCh0aGlzLl90cmVlLCBrZXkpO1xuICAgICAgICBub2RlLnNldChMRUFGLCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNlYXJjaGFibGVNYXAucHJvdG90eXBlLCBcInNpemVcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9NYXAvc2l6ZVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fc2l6ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zaXplO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyoqIEBpZ25vcmUgKi9cbiAgICAgICAgICAgIHRoaXMuX3NpemUgPSAwO1xuICAgICAgICAgICAgdmFyIGl0ZXIgPSB0aGlzLmVudHJpZXMoKTtcbiAgICAgICAgICAgIHdoaWxlICghaXRlci5uZXh0KCkuZG9uZSlcbiAgICAgICAgICAgICAgICB0aGlzLl9zaXplICs9IDE7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIHZhbHVlIGF0IHRoZSBnaXZlbiBrZXkgdXNpbmcgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uLiBUaGUgZnVuY3Rpb25cbiAgICAgKiBpcyBjYWxsZWQgd2l0aCB0aGUgY3VycmVudCB2YWx1ZSBhdCB0aGUga2V5LCBhbmQgaXRzIHJldHVybiB2YWx1ZSBpcyB1c2VkIGFzXG4gICAgICogdGhlIG5ldyB2YWx1ZSB0byBiZSBzZXQuXG4gICAgICpcbiAgICAgKiAjIyMgRXhhbXBsZTpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiAvLyBJbmNyZW1lbnQgdGhlIGN1cnJlbnQgdmFsdWUgYnkgb25lXG4gICAgICogc2VhcmNoYWJsZU1hcC51cGRhdGUoJ3NvbWVrZXknLCAoY3VycmVudFZhbHVlKSA9PiBjdXJyZW50VmFsdWUgPT0gbnVsbCA/IDAgOiBjdXJyZW50VmFsdWUgKyAxKVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogSWYgdGhlIHZhbHVlIGF0IHRoZSBnaXZlbiBrZXkgaXMgb3Igd2lsbCBiZSBhbiBvYmplY3QsIGl0IG1pZ2h0IG5vdCByZXF1aXJlXG4gICAgICogcmUtYXNzaWdubWVudC4gSW4gdGhhdCBjYXNlIGl0IGlzIGJldHRlciB0byB1c2UgYGZldGNoKClgLCBiZWNhdXNlIGl0IGlzXG4gICAgICogZmFzdGVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIGtleSAgVGhlIGtleSB0byB1cGRhdGVcbiAgICAgKiBAcGFyYW0gZm4gIFRoZSBmdW5jdGlvbiB1c2VkIHRvIGNvbXB1dGUgdGhlIG5ldyB2YWx1ZSBmcm9tIHRoZSBjdXJyZW50IG9uZVxuICAgICAqIEByZXR1cm4gVGhlIHtAbGluayBTZWFyY2hhYmxlTWFwfSBpdHNlbGYsIHRvIGFsbG93IGNoYWluaW5nXG4gICAgICovXG4gICAgU2VhcmNoYWJsZU1hcC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGtleSwgZm4pIHtcbiAgICAgICAgaWYgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2tleSBtdXN0IGJlIGEgc3RyaW5nJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2l6ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdmFyIG5vZGUgPSBjcmVhdGVQYXRoKHRoaXMuX3RyZWUsIGtleSk7XG4gICAgICAgIG5vZGUuc2V0KExFQUYsIGZuKG5vZGUuZ2V0KExFQUYpKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRmV0Y2hlcyB0aGUgdmFsdWUgb2YgdGhlIGdpdmVuIGtleS4gSWYgdGhlIHZhbHVlIGRvZXMgbm90IGV4aXN0LCBjYWxscyB0aGVcbiAgICAgKiBnaXZlbiBmdW5jdGlvbiB0byBjcmVhdGUgYSBuZXcgdmFsdWUsIHdoaWNoIGlzIGluc2VydGVkIGF0IHRoZSBnaXZlbiBrZXlcbiAgICAgKiBhbmQgc3Vic2VxdWVudGx5IHJldHVybmVkLlxuICAgICAqXG4gICAgICogIyMjIEV4YW1wbGU6XG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogY29uc3QgbWFwID0gc2VhcmNoYWJsZU1hcC5mZXRjaCgnc29tZWtleScsICgpID0+IG5ldyBNYXAoKSlcbiAgICAgKiBtYXAuc2V0KCdmb28nLCAnYmFyJylcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBwYXJhbSBrZXkgIFRoZSBrZXkgdG8gdXBkYXRlXG4gICAgICogQHBhcmFtIGRlZmF1bHRWYWx1ZSAgQSBmdW5jdGlvbiB0aGF0IGNyZWF0ZXMgYSBuZXcgdmFsdWUgaWYgdGhlIGtleSBkb2VzIG5vdCBleGlzdFxuICAgICAqIEByZXR1cm4gVGhlIGV4aXN0aW5nIG9yIG5ldyB2YWx1ZSBhdCB0aGUgZ2l2ZW4ga2V5XG4gICAgICovXG4gICAgU2VhcmNoYWJsZU1hcC5wcm90b3R5cGUuZmV0Y2ggPSBmdW5jdGlvbiAoa2V5LCBpbml0aWFsKSB7XG4gICAgICAgIGlmICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdrZXkgbXVzdCBiZSBhIHN0cmluZycpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NpemUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHZhciBub2RlID0gY3JlYXRlUGF0aCh0aGlzLl90cmVlLCBrZXkpO1xuICAgICAgICB2YXIgdmFsdWUgPSBub2RlLmdldChMRUFGKTtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG5vZGUuc2V0KExFQUYsIHZhbHVlID0gaW5pdGlhbCgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hcC92YWx1ZXNcbiAgICAgKiBAcmV0dXJuIEFuIGBJdGVyYWJsZWAgaXRlcmF0aW5nIHRocm91Z2ggdmFsdWVzLlxuICAgICAqL1xuICAgIFNlYXJjaGFibGVNYXAucHJvdG90eXBlLnZhbHVlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUcmVlSXRlcmF0b3IodGhpcywgVkFMVUVTKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTWFwL0BAaXRlcmF0b3JcbiAgICAgKi9cbiAgICBTZWFyY2hhYmxlTWFwLnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbnRyaWVzKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEge0BsaW5rIFNlYXJjaGFibGVNYXB9IGZyb20gYW4gYEl0ZXJhYmxlYCBvZiBlbnRyaWVzXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZW50cmllcyAgRW50cmllcyB0byBiZSBpbnNlcnRlZCBpbiB0aGUge0BsaW5rIFNlYXJjaGFibGVNYXB9XG4gICAgICogQHJldHVybiBBIG5ldyB7QGxpbmsgU2VhcmNoYWJsZU1hcH0gd2l0aCB0aGUgZ2l2ZW4gZW50cmllc1xuICAgICAqL1xuICAgIFNlYXJjaGFibGVNYXAuZnJvbSA9IGZ1bmN0aW9uIChlbnRyaWVzKSB7XG4gICAgICAgIHZhciBlXzMsIF9hO1xuICAgICAgICB2YXIgdHJlZSA9IG5ldyBTZWFyY2hhYmxlTWFwKCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBlbnRyaWVzXzEgPSBfX3ZhbHVlcyhlbnRyaWVzKSwgZW50cmllc18xXzEgPSBlbnRyaWVzXzEubmV4dCgpOyAhZW50cmllc18xXzEuZG9uZTsgZW50cmllc18xXzEgPSBlbnRyaWVzXzEubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9iID0gX19yZWFkKGVudHJpZXNfMV8xLnZhbHVlLCAyKSwga2V5ID0gX2JbMF0sIHZhbHVlID0gX2JbMV07XG4gICAgICAgICAgICAgICAgdHJlZS5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfM18xKSB7IGVfMyA9IHsgZXJyb3I6IGVfM18xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChlbnRyaWVzXzFfMSAmJiAhZW50cmllc18xXzEuZG9uZSAmJiAoX2EgPSBlbnRyaWVzXzEucmV0dXJuKSkgX2EuY2FsbChlbnRyaWVzXzEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzMpIHRocm93IGVfMy5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cmVlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHtAbGluayBTZWFyY2hhYmxlTWFwfSBmcm9tIHRoZSBpdGVyYWJsZSBwcm9wZXJ0aWVzIG9mIGEgSmF2YVNjcmlwdCBvYmplY3RcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvYmplY3QgIE9iamVjdCBvZiBlbnRyaWVzIGZvciB0aGUge0BsaW5rIFNlYXJjaGFibGVNYXB9XG4gICAgICogQHJldHVybiBBIG5ldyB7QGxpbmsgU2VhcmNoYWJsZU1hcH0gd2l0aCB0aGUgZ2l2ZW4gZW50cmllc1xuICAgICAqL1xuICAgIFNlYXJjaGFibGVNYXAuZnJvbU9iamVjdCA9IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIFNlYXJjaGFibGVNYXAuZnJvbShPYmplY3QuZW50cmllcyhvYmplY3QpKTtcbiAgICB9O1xuICAgIHJldHVybiBTZWFyY2hhYmxlTWFwO1xufSgpKTtcbnZhciB0cmFja0Rvd24gPSBmdW5jdGlvbiAodHJlZSwga2V5LCBwYXRoKSB7XG4gICAgdmFyIGVfNCwgX2E7XG4gICAgaWYgKHBhdGggPT09IHZvaWQgMCkgeyBwYXRoID0gW107IH1cbiAgICBpZiAoa2V5Lmxlbmd0aCA9PT0gMCB8fCB0cmVlID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIFt0cmVlLCBwYXRoXTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgX2IgPSBfX3ZhbHVlcyh0cmVlLmtleXMoKSksIF9jID0gX2IubmV4dCgpOyAhX2MuZG9uZTsgX2MgPSBfYi5uZXh0KCkpIHtcbiAgICAgICAgICAgIHZhciBrID0gX2MudmFsdWU7XG4gICAgICAgICAgICBpZiAoayAhPT0gTEVBRiAmJiBrZXkuc3RhcnRzV2l0aChrKSkge1xuICAgICAgICAgICAgICAgIHBhdGgucHVzaChbdHJlZSwga10pOyAvLyBwZXJmb3JtYW5jZTogdXBkYXRlIGluIHBsYWNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyYWNrRG93bih0cmVlLmdldChrKSwga2V5LnNsaWNlKGsubGVuZ3RoKSwgcGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGVfNF8xKSB7IGVfNCA9IHsgZXJyb3I6IGVfNF8xIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChfYyAmJiAhX2MuZG9uZSAmJiAoX2EgPSBfYi5yZXR1cm4pKSBfYS5jYWxsKF9iKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGVfNCkgdGhyb3cgZV80LmVycm9yOyB9XG4gICAgfVxuICAgIHBhdGgucHVzaChbdHJlZSwga2V5XSk7IC8vIHBlcmZvcm1hbmNlOiB1cGRhdGUgaW4gcGxhY2VcbiAgICByZXR1cm4gdHJhY2tEb3duKHVuZGVmaW5lZCwgJycsIHBhdGgpO1xufTtcbnZhciBsb29rdXAgPSBmdW5jdGlvbiAodHJlZSwga2V5KSB7XG4gICAgdmFyIGVfNSwgX2E7XG4gICAgaWYgKGtleS5sZW5ndGggPT09IDAgfHwgdHJlZSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0cmVlO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBfYiA9IF9fdmFsdWVzKHRyZWUua2V5cygpKSwgX2MgPSBfYi5uZXh0KCk7ICFfYy5kb25lOyBfYyA9IF9iLm5leHQoKSkge1xuICAgICAgICAgICAgdmFyIGsgPSBfYy52YWx1ZTtcbiAgICAgICAgICAgIGlmIChrICE9PSBMRUFGICYmIGtleS5zdGFydHNXaXRoKGspKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxvb2t1cCh0cmVlLmdldChrKSwga2V5LnNsaWNlKGsubGVuZ3RoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGVfNV8xKSB7IGVfNSA9IHsgZXJyb3I6IGVfNV8xIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChfYyAmJiAhX2MuZG9uZSAmJiAoX2EgPSBfYi5yZXR1cm4pKSBfYS5jYWxsKF9iKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGVfNSkgdGhyb3cgZV81LmVycm9yOyB9XG4gICAgfVxufTtcbi8vIENyZWF0ZSBhIHBhdGggaW4gdGhlIHJhZGl4IHRyZWUgZm9yIHRoZSBnaXZlbiBrZXksIGFuZCByZXR1cm5zIHRoZSBkZWVwZXN0XG4vLyBub2RlLiBUaGlzIGZ1bmN0aW9uIGlzIGluIHRoZSBob3QgcGF0aCBmb3IgaW5kZXhpbmcuIEl0IGF2b2lkcyB1bm5lY2Vzc2FyeVxuLy8gc3RyaW5nIG9wZXJhdGlvbnMgYW5kIHJlY3Vyc2lvbiBmb3IgcGVyZm9ybWFuY2UuXG52YXIgY3JlYXRlUGF0aCA9IGZ1bmN0aW9uIChub2RlLCBrZXkpIHtcbiAgICB2YXIgZV82LCBfYTtcbiAgICB2YXIga2V5TGVuZ3RoID0ga2V5Lmxlbmd0aDtcbiAgICBvdXRlcjogZm9yICh2YXIgcG9zID0gMDsgbm9kZSAmJiBwb3MgPCBrZXlMZW5ndGg7KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfYiA9IChlXzYgPSB2b2lkIDAsIF9fdmFsdWVzKG5vZGUua2V5cygpKSksIF9jID0gX2IubmV4dCgpOyAhX2MuZG9uZTsgX2MgPSBfYi5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgayA9IF9jLnZhbHVlO1xuICAgICAgICAgICAgICAgIC8vIENoZWNrIHdoZXRoZXIgdGhpcyBrZXkgaXMgYSBjYW5kaWRhdGU6IHRoZSBmaXJzdCBjaGFyYWN0ZXJzIG11c3QgbWF0Y2guXG4gICAgICAgICAgICAgICAgaWYgKGsgIT09IExFQUYgJiYga2V5W3Bvc10gPT09IGtbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxlbiA9IE1hdGgubWluKGtleUxlbmd0aCAtIHBvcywgay5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAvLyBBZHZhbmNlIG9mZnNldCB0byB0aGUgcG9pbnQgd2hlcmUga2V5IGFuZCBrIG5vIGxvbmdlciBtYXRjaC5cbiAgICAgICAgICAgICAgICAgICAgdmFyIG9mZnNldCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChvZmZzZXQgPCBsZW4gJiYga2V5W3BvcyArIG9mZnNldF0gPT09IGtbb2Zmc2V0XSlcbiAgICAgICAgICAgICAgICAgICAgICAgICsrb2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2hpbGRfMSA9IG5vZGUuZ2V0KGspO1xuICAgICAgICAgICAgICAgICAgICBpZiAob2Zmc2V0ID09PSBrLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIGV4aXN0aW5nIGtleSBpcyBzaG9ydGVyIHRoYW4gdGhlIGtleSB3ZSBuZWVkIHRvIGNyZWF0ZS5cbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSBjaGlsZF8xO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUGFydGlhbCBtYXRjaDogd2UgbmVlZCB0byBpbnNlcnQgYW4gaW50ZXJtZWRpYXRlIG5vZGUgdG8gY29udGFpblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYm90aCB0aGUgZXhpc3Rpbmcgc3VidHJlZSBhbmQgdGhlIG5ldyBub2RlLlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGludGVybWVkaWF0ZSA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGludGVybWVkaWF0ZS5zZXQoay5zbGljZShvZmZzZXQpLCBjaGlsZF8xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0KGtleS5zbGljZShwb3MsIHBvcyArIG9mZnNldCksIGludGVybWVkaWF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmRlbGV0ZShrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSBpbnRlcm1lZGlhdGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcG9zICs9IG9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWUgb3V0ZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlXzZfMSkgeyBlXzYgPSB7IGVycm9yOiBlXzZfMSB9OyB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoX2MgJiYgIV9jLmRvbmUgJiYgKF9hID0gX2IucmV0dXJuKSkgX2EuY2FsbChfYik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfNikgdGhyb3cgZV82LmVycm9yOyB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ3JlYXRlIGEgZmluYWwgY2hpbGQgbm9kZSB0byBjb250YWluIHRoZSBmaW5hbCBzdWZmaXggb2YgdGhlIGtleS5cbiAgICAgICAgdmFyIGNoaWxkID0gbmV3IE1hcCgpO1xuICAgICAgICBub2RlLnNldChrZXkuc2xpY2UocG9zKSwgY2hpbGQpO1xuICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xufTtcbnZhciByZW1vdmUgPSBmdW5jdGlvbiAodHJlZSwga2V5KSB7XG4gICAgdmFyIF9hID0gX19yZWFkKHRyYWNrRG93bih0cmVlLCBrZXkpLCAyKSwgbm9kZSA9IF9hWzBdLCBwYXRoID0gX2FbMV07XG4gICAgaWYgKG5vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIG5vZGUuZGVsZXRlKExFQUYpO1xuICAgIGlmIChub2RlLnNpemUgPT09IDApIHtcbiAgICAgICAgY2xlYW51cChwYXRoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAobm9kZS5zaXplID09PSAxKSB7XG4gICAgICAgIHZhciBfYiA9IF9fcmVhZChub2RlLmVudHJpZXMoKS5uZXh0KCkudmFsdWUsIDIpLCBrZXlfMSA9IF9iWzBdLCB2YWx1ZSA9IF9iWzFdO1xuICAgICAgICBtZXJnZShwYXRoLCBrZXlfMSwgdmFsdWUpO1xuICAgIH1cbn07XG52YXIgY2xlYW51cCA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgaWYgKHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIF9hID0gX19yZWFkKGxhc3QocGF0aCksIDIpLCBub2RlID0gX2FbMF0sIGtleSA9IF9hWzFdO1xuICAgIG5vZGUuZGVsZXRlKGtleSk7XG4gICAgaWYgKG5vZGUuc2l6ZSA9PT0gMCkge1xuICAgICAgICBjbGVhbnVwKHBhdGguc2xpY2UoMCwgLTEpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAobm9kZS5zaXplID09PSAxKSB7XG4gICAgICAgIHZhciBfYiA9IF9fcmVhZChub2RlLmVudHJpZXMoKS5uZXh0KCkudmFsdWUsIDIpLCBrZXlfMiA9IF9iWzBdLCB2YWx1ZSA9IF9iWzFdO1xuICAgICAgICBpZiAoa2V5XzIgIT09IExFQUYpIHtcbiAgICAgICAgICAgIG1lcmdlKHBhdGguc2xpY2UoMCwgLTEpLCBrZXlfMiwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxufTtcbnZhciBtZXJnZSA9IGZ1bmN0aW9uIChwYXRoLCBrZXksIHZhbHVlKSB7XG4gICAgaWYgKHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIF9hID0gX19yZWFkKGxhc3QocGF0aCksIDIpLCBub2RlID0gX2FbMF0sIG5vZGVLZXkgPSBfYVsxXTtcbiAgICBub2RlLnNldChub2RlS2V5ICsga2V5LCB2YWx1ZSk7XG4gICAgbm9kZS5kZWxldGUobm9kZUtleSk7XG59O1xudmFyIGxhc3QgPSBmdW5jdGlvbiAoYXJyYXkpIHtcbiAgICByZXR1cm4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV07XG59O1xuXG52YXIgX2E7XG52YXIgT1IgPSAnb3InO1xudmFyIEFORCA9ICdhbmQnO1xudmFyIEFORF9OT1QgPSAnYW5kX25vdCc7XG4vKipcbiAqIHtAbGluayBNaW5pU2VhcmNofSBpcyB0aGUgbWFpbiBlbnRyeXBvaW50IGNsYXNzLCBpbXBsZW1lbnRpbmcgYSBmdWxsLXRleHRcbiAqIHNlYXJjaCBlbmdpbmUgaW4gbWVtb3J5LlxuICpcbiAqIEB0eXBlUGFyYW0gVCAgVGhlIHR5cGUgb2YgdGhlIGRvY3VtZW50cyBiZWluZyBpbmRleGVkLlxuICpcbiAqICMjIyBCYXNpYyBleGFtcGxlOlxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIGNvbnN0IGRvY3VtZW50cyA9IFtcbiAqICAge1xuICogICAgIGlkOiAxLFxuICogICAgIHRpdGxlOiAnTW9ieSBEaWNrJyxcbiAqICAgICB0ZXh0OiAnQ2FsbCBtZSBJc2htYWVsLiBTb21lIHllYXJzIGFnby4uLicsXG4gKiAgICAgY2F0ZWdvcnk6ICdmaWN0aW9uJ1xuICogICB9LFxuICogICB7XG4gKiAgICAgaWQ6IDIsXG4gKiAgICAgdGl0bGU6ICdaZW4gYW5kIHRoZSBBcnQgb2YgTW90b3JjeWNsZSBNYWludGVuYW5jZScsXG4gKiAgICAgdGV4dDogJ0kgY2FuIHNlZSBieSBteSB3YXRjaC4uLicsXG4gKiAgICAgY2F0ZWdvcnk6ICdmaWN0aW9uJ1xuICogICB9LFxuICogICB7XG4gKiAgICAgaWQ6IDMsXG4gKiAgICAgdGl0bGU6ICdOZXVyb21hbmNlcicsXG4gKiAgICAgdGV4dDogJ1RoZSBza3kgYWJvdmUgdGhlIHBvcnQgd2FzLi4uJyxcbiAqICAgICBjYXRlZ29yeTogJ2ZpY3Rpb24nXG4gKiAgIH0sXG4gKiAgIHtcbiAqICAgICBpZDogNCxcbiAqICAgICB0aXRsZTogJ1plbiBhbmQgdGhlIEFydCBvZiBBcmNoZXJ5JyxcbiAqICAgICB0ZXh0OiAnQXQgZmlyc3Qgc2lnaHQgaXQgbXVzdCBzZWVtLi4uJyxcbiAqICAgICBjYXRlZ29yeTogJ25vbi1maWN0aW9uJ1xuICogICB9LFxuICogICAvLyAuLi5hbmQgbW9yZVxuICogXVxuICpcbiAqIC8vIENyZWF0ZSBhIHNlYXJjaCBlbmdpbmUgdGhhdCBpbmRleGVzIHRoZSAndGl0bGUnIGFuZCAndGV4dCcgZmllbGRzIGZvclxuICogLy8gZnVsbC10ZXh0IHNlYXJjaC4gU2VhcmNoIHJlc3VsdHMgd2lsbCBpbmNsdWRlICd0aXRsZScgYW5kICdjYXRlZ29yeScgKHBsdXMgdGhlXG4gKiAvLyBpZCBmaWVsZCwgdGhhdCBpcyBhbHdheXMgc3RvcmVkIGFuZCByZXR1cm5lZClcbiAqIGNvbnN0IG1pbmlTZWFyY2ggPSBuZXcgTWluaVNlYXJjaCh7XG4gKiAgIGZpZWxkczogWyd0aXRsZScsICd0ZXh0J10sXG4gKiAgIHN0b3JlRmllbGRzOiBbJ3RpdGxlJywgJ2NhdGVnb3J5J11cbiAqIH0pXG4gKlxuICogLy8gQWRkIGRvY3VtZW50cyB0byB0aGUgaW5kZXhcbiAqIG1pbmlTZWFyY2guYWRkQWxsKGRvY3VtZW50cylcbiAqXG4gKiAvLyBTZWFyY2ggZm9yIGRvY3VtZW50czpcbiAqIGxldCByZXN1bHRzID0gbWluaVNlYXJjaC5zZWFyY2goJ3plbiBhcnQgbW90b3JjeWNsZScpXG4gKiAvLyA9PiBbXG4gKiAvLyAgIHsgaWQ6IDIsIHRpdGxlOiAnWmVuIGFuZCB0aGUgQXJ0IG9mIE1vdG9yY3ljbGUgTWFpbnRlbmFuY2UnLCBjYXRlZ29yeTogJ2ZpY3Rpb24nLCBzY29yZTogMi43NzI1OCB9LFxuICogLy8gICB7IGlkOiA0LCB0aXRsZTogJ1plbiBhbmQgdGhlIEFydCBvZiBBcmNoZXJ5JywgY2F0ZWdvcnk6ICdub24tZmljdGlvbicsIHNjb3JlOiAxLjM4NjI5IH1cbiAqIC8vIF1cbiAqIGBgYFxuICovXG52YXIgTWluaVNlYXJjaCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAgQ29uZmlndXJhdGlvbiBvcHRpb25zXG4gICAgICpcbiAgICAgKiAjIyMgRXhhbXBsZXM6XG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogLy8gQ3JlYXRlIGEgc2VhcmNoIGVuZ2luZSB0aGF0IGluZGV4ZXMgdGhlICd0aXRsZScgYW5kICd0ZXh0JyBmaWVsZHMgb2YgeW91clxuICAgICAqIC8vIGRvY3VtZW50czpcbiAgICAgKiBjb25zdCBtaW5pU2VhcmNoID0gbmV3IE1pbmlTZWFyY2goeyBmaWVsZHM6IFsndGl0bGUnLCAndGV4dCddIH0pXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiAjIyMgSUQgRmllbGQ6XG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogLy8gWW91ciBkb2N1bWVudHMgYXJlIGFzc3VtZWQgdG8gaW5jbHVkZSBhIHVuaXF1ZSAnaWQnIGZpZWxkLCBidXQgaWYgeW91IHdhbnRcbiAgICAgKiAvLyB0byB1c2UgYSBkaWZmZXJlbnQgZmllbGQgZm9yIGRvY3VtZW50IGlkZW50aWZpY2F0aW9uLCB5b3UgY2FuIHNldCB0aGVcbiAgICAgKiAvLyAnaWRGaWVsZCcgb3B0aW9uOlxuICAgICAqIGNvbnN0IG1pbmlTZWFyY2ggPSBuZXcgTWluaVNlYXJjaCh7IGlkRmllbGQ6ICdrZXknLCBmaWVsZHM6IFsndGl0bGUnLCAndGV4dCddIH0pXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiAjIyMgT3B0aW9ucyBhbmQgZGVmYXVsdHM6XG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogLy8gVGhlIGZ1bGwgc2V0IG9mIG9wdGlvbnMgKGhlcmUgd2l0aCB0aGVpciBkZWZhdWx0IHZhbHVlKSBpczpcbiAgICAgKiBjb25zdCBtaW5pU2VhcmNoID0gbmV3IE1pbmlTZWFyY2goe1xuICAgICAqICAgLy8gaWRGaWVsZDogZmllbGQgdGhhdCB1bmlxdWVseSBpZGVudGlmaWVzIGEgZG9jdW1lbnRcbiAgICAgKiAgIGlkRmllbGQ6ICdpZCcsXG4gICAgICpcbiAgICAgKiAgIC8vIGV4dHJhY3RGaWVsZDogZnVuY3Rpb24gdXNlZCB0byBnZXQgdGhlIHZhbHVlIG9mIGEgZmllbGQgaW4gYSBkb2N1bWVudC5cbiAgICAgKiAgIC8vIEJ5IGRlZmF1bHQsIGl0IGFzc3VtZXMgdGhlIGRvY3VtZW50IGlzIGEgZmxhdCBvYmplY3Qgd2l0aCBmaWVsZCBuYW1lcyBhc1xuICAgICAqICAgLy8gcHJvcGVydHkga2V5cyBhbmQgZmllbGQgdmFsdWVzIGFzIHN0cmluZyBwcm9wZXJ0eSB2YWx1ZXMsIGJ1dCBjdXN0b20gbG9naWNcbiAgICAgKiAgIC8vIGNhbiBiZSBpbXBsZW1lbnRlZCBieSBzZXR0aW5nIHRoaXMgb3B0aW9uIHRvIGEgY3VzdG9tIGV4dHJhY3RvciBmdW5jdGlvbi5cbiAgICAgKiAgIGV4dHJhY3RGaWVsZDogKGRvY3VtZW50LCBmaWVsZE5hbWUpID0+IGRvY3VtZW50W2ZpZWxkTmFtZV0sXG4gICAgICpcbiAgICAgKiAgIC8vIHRva2VuaXplOiBmdW5jdGlvbiB1c2VkIHRvIHNwbGl0IGZpZWxkcyBpbnRvIGluZGl2aWR1YWwgdGVybXMuIEJ5XG4gICAgICogICAvLyBkZWZhdWx0LCBpdCBpcyBhbHNvIHVzZWQgdG8gdG9rZW5pemUgc2VhcmNoIHF1ZXJpZXMsIHVubGVzcyBhIHNwZWNpZmljXG4gICAgICogICAvLyBgdG9rZW5pemVgIHNlYXJjaCBvcHRpb24gaXMgc3VwcGxpZWQuIFdoZW4gdG9rZW5pemluZyBhbiBpbmRleGVkIGZpZWxkLFxuICAgICAqICAgLy8gdGhlIGZpZWxkIG5hbWUgaXMgcGFzc2VkIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQuXG4gICAgICogICB0b2tlbml6ZTogKHN0cmluZywgX2ZpZWxkTmFtZSkgPT4gc3RyaW5nLnNwbGl0KFNQQUNFX09SX1BVTkNUVUFUSU9OKSxcbiAgICAgKlxuICAgICAqICAgLy8gcHJvY2Vzc1Rlcm06IGZ1bmN0aW9uIHVzZWQgdG8gcHJvY2VzcyBlYWNoIHRva2VuaXplZCB0ZXJtIGJlZm9yZVxuICAgICAqICAgLy8gaW5kZXhpbmcuIEl0IGNhbiBiZSB1c2VkIGZvciBzdGVtbWluZyBhbmQgbm9ybWFsaXphdGlvbi4gUmV0dXJuIGEgZmFsc3lcbiAgICAgKiAgIC8vIHZhbHVlIGluIG9yZGVyIHRvIGRpc2NhcmQgYSB0ZXJtLiBCeSBkZWZhdWx0LCBpdCBpcyBhbHNvIHVzZWQgdG8gcHJvY2Vzc1xuICAgICAqICAgLy8gc2VhcmNoIHF1ZXJpZXMsIHVubGVzcyBhIHNwZWNpZmljIGBwcm9jZXNzVGVybWAgb3B0aW9uIGlzIHN1cHBsaWVkIGFzIGFcbiAgICAgKiAgIC8vIHNlYXJjaCBvcHRpb24uIFdoZW4gcHJvY2Vzc2luZyBhIHRlcm0gZnJvbSBhIGluZGV4ZWQgZmllbGQsIHRoZSBmaWVsZFxuICAgICAqICAgLy8gbmFtZSBpcyBwYXNzZWQgYXMgdGhlIHNlY29uZCBhcmd1bWVudC5cbiAgICAgKiAgIHByb2Nlc3NUZXJtOiAodGVybSwgX2ZpZWxkTmFtZSkgPT4gdGVybS50b0xvd2VyQ2FzZSgpLFxuICAgICAqXG4gICAgICogICAvLyBzZWFyY2hPcHRpb25zOiBkZWZhdWx0IHNlYXJjaCBvcHRpb25zLCBzZWUgdGhlIGBzZWFyY2hgIG1ldGhvZCBmb3JcbiAgICAgKiAgIC8vIGRldGFpbHNcbiAgICAgKiAgIHNlYXJjaE9wdGlvbnM6IHVuZGVmaW5lZCxcbiAgICAgKlxuICAgICAqICAgLy8gZmllbGRzOiBkb2N1bWVudCBmaWVsZHMgdG8gYmUgaW5kZXhlZC4gTWFuZGF0b3J5LCBidXQgbm90IHNldCBieSBkZWZhdWx0XG4gICAgICogICBmaWVsZHM6IHVuZGVmaW5lZFxuICAgICAqXG4gICAgICogICAvLyBzdG9yZUZpZWxkczogZG9jdW1lbnQgZmllbGRzIHRvIGJlIHN0b3JlZCBhbmQgcmV0dXJuZWQgYXMgcGFydCBvZiB0aGVcbiAgICAgKiAgIC8vIHNlYXJjaCByZXN1bHRzLlxuICAgICAqICAgc3RvcmVGaWVsZHM6IFtdXG4gICAgICogfSlcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBNaW5pU2VhcmNoKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuZmllbGRzKSA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pbmlTZWFyY2g6IG9wdGlvbiBcImZpZWxkc1wiIG11c3QgYmUgcHJvdmlkZWQnKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYXV0b1ZhY3V1bSA9IChvcHRpb25zLmF1dG9WYWN1dW0gPT0gbnVsbCB8fCBvcHRpb25zLmF1dG9WYWN1dW0gPT09IHRydWUpID8gZGVmYXVsdEF1dG9WYWN1dW1PcHRpb25zIDogb3B0aW9ucy5hdXRvVmFjdXVtO1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gX19hc3NpZ24oX19hc3NpZ24oX19hc3NpZ24oe30sIGRlZmF1bHRPcHRpb25zKSwgb3B0aW9ucyksIHsgYXV0b1ZhY3V1bTogYXV0b1ZhY3V1bSwgc2VhcmNoT3B0aW9uczogX19hc3NpZ24oX19hc3NpZ24oe30sIGRlZmF1bHRTZWFyY2hPcHRpb25zKSwgKG9wdGlvbnMuc2VhcmNoT3B0aW9ucyB8fCB7fSkpLCBhdXRvU3VnZ2VzdE9wdGlvbnM6IF9fYXNzaWduKF9fYXNzaWduKHt9LCBkZWZhdWx0QXV0b1N1Z2dlc3RPcHRpb25zKSwgKG9wdGlvbnMuYXV0b1N1Z2dlc3RPcHRpb25zIHx8IHt9KSkgfSk7XG4gICAgICAgIHRoaXMuX2luZGV4ID0gbmV3IFNlYXJjaGFibGVNYXAoKTtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnRDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50SWRzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLl9pZFRvU2hvcnRJZCA9IG5ldyBNYXAoKTtcbiAgICAgICAgLy8gRmllbGRzIGFyZSBkZWZpbmVkIGR1cmluZyBpbml0aWFsaXphdGlvbiwgZG9uJ3QgY2hhbmdlLCBhcmUgZmV3IGluXG4gICAgICAgIC8vIG51bWJlciwgcmFyZWx5IG5lZWQgaXRlcmF0aW5nIG92ZXIsIGFuZCBoYXZlIHN0cmluZyBrZXlzLiBUaGVyZWZvcmUgaW5cbiAgICAgICAgLy8gdGhpcyBjYXNlIGFuIG9iamVjdCBpcyBhIGJldHRlciBjYW5kaWRhdGUgdGhhbiBhIE1hcCB0byBzdG9yZSB0aGUgbWFwcGluZ1xuICAgICAgICAvLyBmcm9tIGZpZWxkIGtleSB0byBJRC5cbiAgICAgICAgdGhpcy5fZmllbGRJZHMgPSB7fTtcbiAgICAgICAgdGhpcy5fZmllbGRMZW5ndGggPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuX2F2Z0ZpZWxkTGVuZ3RoID0gW107XG4gICAgICAgIHRoaXMuX25leHRJZCA9IDA7XG4gICAgICAgIHRoaXMuX3N0b3JlZEZpZWxkcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5fZGlydENvdW50ID0gMDtcbiAgICAgICAgdGhpcy5fY3VycmVudFZhY3V1bSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2VucXVldWVkVmFjdXVtID0gbnVsbDtcbiAgICAgICAgdGhpcy5fZW5xdWV1ZWRWYWN1dW1Db25kaXRpb25zID0gZGVmYXVsdFZhY3V1bUNvbmRpdGlvbnM7XG4gICAgICAgIHRoaXMuYWRkRmllbGRzKHRoaXMuX29wdGlvbnMuZmllbGRzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhIGRvY3VtZW50IHRvIHRoZSBpbmRleFxuICAgICAqXG4gICAgICogQHBhcmFtIGRvY3VtZW50ICBUaGUgZG9jdW1lbnQgdG8gYmUgaW5kZXhlZFxuICAgICAqL1xuICAgIE1pbmlTZWFyY2gucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChkb2N1bWVudCkge1xuICAgICAgICB2YXIgZV8xLCBfYSwgZV8yLCBfYiwgZV8zLCBfYztcbiAgICAgICAgdmFyIF9kID0gdGhpcy5fb3B0aW9ucywgZXh0cmFjdEZpZWxkID0gX2QuZXh0cmFjdEZpZWxkLCB0b2tlbml6ZSA9IF9kLnRva2VuaXplLCBwcm9jZXNzVGVybSA9IF9kLnByb2Nlc3NUZXJtLCBmaWVsZHMgPSBfZC5maWVsZHMsIGlkRmllbGQgPSBfZC5pZEZpZWxkO1xuICAgICAgICB2YXIgaWQgPSBleHRyYWN0RmllbGQoZG9jdW1lbnQsIGlkRmllbGQpO1xuICAgICAgICBpZiAoaWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWluaVNlYXJjaDogZG9jdW1lbnQgZG9lcyBub3QgaGF2ZSBJRCBmaWVsZCBcXFwiXCIuY29uY2F0KGlkRmllbGQsIFwiXFxcIlwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2lkVG9TaG9ydElkLmhhcyhpZCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pbmlTZWFyY2g6IGR1cGxpY2F0ZSBJRCBcIi5jb25jYXQoaWQpKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2hvcnREb2N1bWVudElkID0gdGhpcy5hZGREb2N1bWVudElkKGlkKTtcbiAgICAgICAgdGhpcy5zYXZlU3RvcmVkRmllbGRzKHNob3J0RG9jdW1lbnRJZCwgZG9jdW1lbnQpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgZmllbGRzXzEgPSBfX3ZhbHVlcyhmaWVsZHMpLCBmaWVsZHNfMV8xID0gZmllbGRzXzEubmV4dCgpOyAhZmllbGRzXzFfMS5kb25lOyBmaWVsZHNfMV8xID0gZmllbGRzXzEubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpZWxkID0gZmllbGRzXzFfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICB2YXIgZmllbGRWYWx1ZSA9IGV4dHJhY3RGaWVsZChkb2N1bWVudCwgZmllbGQpO1xuICAgICAgICAgICAgICAgIGlmIChmaWVsZFZhbHVlID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIHZhciB0b2tlbnMgPSB0b2tlbml6ZShmaWVsZFZhbHVlLnRvU3RyaW5nKCksIGZpZWxkKTtcbiAgICAgICAgICAgICAgICB2YXIgZmllbGRJZCA9IHRoaXMuX2ZpZWxkSWRzW2ZpZWxkXTtcbiAgICAgICAgICAgICAgICB2YXIgdW5pcXVlVGVybXMgPSBuZXcgU2V0KHRva2Vucykuc2l6ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEZpZWxkTGVuZ3RoKHNob3J0RG9jdW1lbnRJZCwgZmllbGRJZCwgdGhpcy5fZG9jdW1lbnRDb3VudCAtIDEsIHVuaXF1ZVRlcm1zKTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB0b2tlbnNfMSA9IChlXzIgPSB2b2lkIDAsIF9fdmFsdWVzKHRva2VucykpLCB0b2tlbnNfMV8xID0gdG9rZW5zXzEubmV4dCgpOyAhdG9rZW5zXzFfMS5kb25lOyB0b2tlbnNfMV8xID0gdG9rZW5zXzEubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGVybSA9IHRva2Vuc18xXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvY2Vzc2VkVGVybSA9IHByb2Nlc3NUZXJtKHRlcm0sIGZpZWxkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHByb2Nlc3NlZFRlcm0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcHJvY2Vzc2VkVGVybV8xID0gKGVfMyA9IHZvaWQgMCwgX192YWx1ZXMocHJvY2Vzc2VkVGVybSkpLCBwcm9jZXNzZWRUZXJtXzFfMSA9IHByb2Nlc3NlZFRlcm1fMS5uZXh0KCk7ICFwcm9jZXNzZWRUZXJtXzFfMS5kb25lOyBwcm9jZXNzZWRUZXJtXzFfMSA9IHByb2Nlc3NlZFRlcm1fMS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ID0gcHJvY2Vzc2VkVGVybV8xXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFRlcm0oZmllbGRJZCwgc2hvcnREb2N1bWVudElkLCB0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZV8zXzEpIHsgZV8zID0geyBlcnJvcjogZV8zXzEgfTsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb2Nlc3NlZFRlcm1fMV8xICYmICFwcm9jZXNzZWRUZXJtXzFfMS5kb25lICYmIChfYyA9IHByb2Nlc3NlZFRlcm1fMS5yZXR1cm4pKSBfYy5jYWxsKHByb2Nlc3NlZFRlcm1fMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzMpIHRocm93IGVfMy5lcnJvcjsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHByb2Nlc3NlZFRlcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFRlcm0oZmllbGRJZCwgc2hvcnREb2N1bWVudElkLCBwcm9jZXNzZWRUZXJtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZV8yXzEpIHsgZV8yID0geyBlcnJvcjogZV8yXzEgfTsgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRva2Vuc18xXzEgJiYgIXRva2Vuc18xXzEuZG9uZSAmJiAoX2IgPSB0b2tlbnNfMS5yZXR1cm4pKSBfYi5jYWxsKHRva2Vuc18xKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMikgdGhyb3cgZV8yLmVycm9yOyB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlXzFfMSkgeyBlXzEgPSB7IGVycm9yOiBlXzFfMSB9OyB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoZmllbGRzXzFfMSAmJiAhZmllbGRzXzFfMS5kb25lICYmIChfYSA9IGZpZWxkc18xLnJldHVybikpIF9hLmNhbGwoZmllbGRzXzEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBZGRzIGFsbCB0aGUgZ2l2ZW4gZG9jdW1lbnRzIHRvIHRoZSBpbmRleFxuICAgICAqXG4gICAgICogQHBhcmFtIGRvY3VtZW50cyAgQW4gYXJyYXkgb2YgZG9jdW1lbnRzIHRvIGJlIGluZGV4ZWRcbiAgICAgKi9cbiAgICBNaW5pU2VhcmNoLnByb3RvdHlwZS5hZGRBbGwgPSBmdW5jdGlvbiAoZG9jdW1lbnRzKSB7XG4gICAgICAgIHZhciBlXzQsIF9hO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgZG9jdW1lbnRzXzEgPSBfX3ZhbHVlcyhkb2N1bWVudHMpLCBkb2N1bWVudHNfMV8xID0gZG9jdW1lbnRzXzEubmV4dCgpOyAhZG9jdW1lbnRzXzFfMS5kb25lOyBkb2N1bWVudHNfMV8xID0gZG9jdW1lbnRzXzEubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRvY3VtZW50XzEgPSBkb2N1bWVudHNfMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkKGRvY3VtZW50XzEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlXzRfMSkgeyBlXzQgPSB7IGVycm9yOiBlXzRfMSB9OyB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnRzXzFfMSAmJiAhZG9jdW1lbnRzXzFfMS5kb25lICYmIChfYSA9IGRvY3VtZW50c18xLnJldHVybikpIF9hLmNhbGwoZG9jdW1lbnRzXzEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzQpIHRocm93IGVfNC5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBZGRzIGFsbCB0aGUgZ2l2ZW4gZG9jdW1lbnRzIHRvIHRoZSBpbmRleCBhc3luY2hyb25vdXNseS5cbiAgICAgKlxuICAgICAqIFJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgKHRvIGB1bmRlZmluZWRgKSB3aGVuIHRoZSBpbmRleGluZyBpcyBkb25lLlxuICAgICAqIFRoaXMgbWV0aG9kIGlzIHVzZWZ1bCB3aGVuIGluZGV4IG1hbnkgZG9jdW1lbnRzLCB0byBhdm9pZCBibG9ja2luZyB0aGUgbWFpblxuICAgICAqIHRocmVhZC4gVGhlIGluZGV4aW5nIGlzIHBlcmZvcm1lZCBhc3luY2hyb25vdXNseSBhbmQgaW4gY2h1bmtzLlxuICAgICAqXG4gICAgICogQHBhcmFtIGRvY3VtZW50cyAgQW4gYXJyYXkgb2YgZG9jdW1lbnRzIHRvIGJlIGluZGV4ZWRcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAgQ29uZmlndXJhdGlvbiBvcHRpb25zXG4gICAgICogQHJldHVybiBBIHByb21pc2UgcmVzb2x2aW5nIHRvIGB1bmRlZmluZWRgIHdoZW4gdGhlIGluZGV4aW5nIGlzIGRvbmVcbiAgICAgKi9cbiAgICBNaW5pU2VhcmNoLnByb3RvdHlwZS5hZGRBbGxBc3luYyA9IGZ1bmN0aW9uIChkb2N1bWVudHMsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAgICAgdmFyIF9hID0gb3B0aW9ucy5jaHVua1NpemUsIGNodW5rU2l6ZSA9IF9hID09PSB2b2lkIDAgPyAxMCA6IF9hO1xuICAgICAgICB2YXIgYWNjID0geyBjaHVuazogW10sIHByb21pc2U6IFByb21pc2UucmVzb2x2ZSgpIH07XG4gICAgICAgIHZhciBfYiA9IGRvY3VtZW50cy5yZWR1Y2UoZnVuY3Rpb24gKF9hLCBkb2N1bWVudCwgaSkge1xuICAgICAgICAgICAgdmFyIGNodW5rID0gX2EuY2h1bmssIHByb21pc2UgPSBfYS5wcm9taXNlO1xuICAgICAgICAgICAgY2h1bmsucHVzaChkb2N1bWVudCk7XG4gICAgICAgICAgICBpZiAoKGkgKyAxKSAlIGNodW5rU2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGNodW5rOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZTogcHJvbWlzZVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmV0dXJuIHNldFRpbWVvdXQocmVzb2x2ZSwgMCk7IH0pOyB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuYWRkQWxsKGNodW5rKTsgfSlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgY2h1bms6IGNodW5rLCBwcm9taXNlOiBwcm9taXNlIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGFjYyksIGNodW5rID0gX2IuY2h1bmssIHByb21pc2UgPSBfYi5wcm9taXNlO1xuICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLmFkZEFsbChjaHVuayk7IH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgZ2l2ZW4gZG9jdW1lbnQgZnJvbSB0aGUgaW5kZXguXG4gICAgICpcbiAgICAgKiBUaGUgZG9jdW1lbnQgdG8gcmVtb3ZlIG11c3QgTk9UIGhhdmUgY2hhbmdlZCBiZXR3ZWVuIGluZGV4aW5nIGFuZCByZW1vdmFsLFxuICAgICAqIG90aGVyd2lzZSB0aGUgaW5kZXggd2lsbCBiZSBjb3JydXB0ZWQuXG4gICAgICpcbiAgICAgKiBUaGlzIG1ldGhvZCByZXF1aXJlcyBwYXNzaW5nIHRoZSBmdWxsIGRvY3VtZW50IHRvIGJlIHJlbW92ZWQgKG5vdCBqdXN0IHRoZVxuICAgICAqIElEKSwgYW5kIGltbWVkaWF0ZWx5IHJlbW92ZXMgdGhlIGRvY3VtZW50IGZyb20gdGhlIGludmVydGVkIGluZGV4LCBhbGxvd2luZ1xuICAgICAqIG1lbW9yeSB0byBiZSByZWxlYXNlZC4gQSBjb252ZW5pZW50IGFsdGVybmF0aXZlIGlzIHtAbGlua1xuICAgICAqIE1pbmlTZWFyY2gjZGlzY2FyZH0sIHdoaWNoIG5lZWRzIG9ubHkgdGhlIGRvY3VtZW50IElELCBhbmQgaGFzIHRoZSBzYW1lXG4gICAgICogdmlzaWJsZSBlZmZlY3QsIGJ1dCBkZWxheXMgY2xlYW5pbmcgdXAgdGhlIGluZGV4IHVudGlsIHRoZSBuZXh0IHZhY3V1bWluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBkb2N1bWVudCAgVGhlIGRvY3VtZW50IHRvIGJlIHJlbW92ZWRcbiAgICAgKi9cbiAgICBNaW5pU2VhcmNoLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoZG9jdW1lbnQpIHtcbiAgICAgICAgdmFyIGVfNSwgX2EsIGVfNiwgX2IsIGVfNywgX2M7XG4gICAgICAgIHZhciBfZCA9IHRoaXMuX29wdGlvbnMsIHRva2VuaXplID0gX2QudG9rZW5pemUsIHByb2Nlc3NUZXJtID0gX2QucHJvY2Vzc1Rlcm0sIGV4dHJhY3RGaWVsZCA9IF9kLmV4dHJhY3RGaWVsZCwgZmllbGRzID0gX2QuZmllbGRzLCBpZEZpZWxkID0gX2QuaWRGaWVsZDtcbiAgICAgICAgdmFyIGlkID0gZXh0cmFjdEZpZWxkKGRvY3VtZW50LCBpZEZpZWxkKTtcbiAgICAgICAgaWYgKGlkID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pbmlTZWFyY2g6IGRvY3VtZW50IGRvZXMgbm90IGhhdmUgSUQgZmllbGQgXFxcIlwiLmNvbmNhdChpZEZpZWxkLCBcIlxcXCJcIikpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzaG9ydElkID0gdGhpcy5faWRUb1Nob3J0SWQuZ2V0KGlkKTtcbiAgICAgICAgaWYgKHNob3J0SWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWluaVNlYXJjaDogY2Fubm90IHJlbW92ZSBkb2N1bWVudCB3aXRoIElEIFwiLmNvbmNhdChpZCwgXCI6IGl0IGlzIG5vdCBpbiB0aGUgaW5kZXhcIikpO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBmaWVsZHNfMiA9IF9fdmFsdWVzKGZpZWxkcyksIGZpZWxkc18yXzEgPSBmaWVsZHNfMi5uZXh0KCk7ICFmaWVsZHNfMl8xLmRvbmU7IGZpZWxkc18yXzEgPSBmaWVsZHNfMi5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmllbGQgPSBmaWVsZHNfMl8xLnZhbHVlO1xuICAgICAgICAgICAgICAgIHZhciBmaWVsZFZhbHVlID0gZXh0cmFjdEZpZWxkKGRvY3VtZW50LCBmaWVsZCk7XG4gICAgICAgICAgICAgICAgaWYgKGZpZWxkVmFsdWUgPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgdmFyIHRva2VucyA9IHRva2VuaXplKGZpZWxkVmFsdWUudG9TdHJpbmcoKSwgZmllbGQpO1xuICAgICAgICAgICAgICAgIHZhciBmaWVsZElkID0gdGhpcy5fZmllbGRJZHNbZmllbGRdO1xuICAgICAgICAgICAgICAgIHZhciB1bmlxdWVUZXJtcyA9IG5ldyBTZXQodG9rZW5zKS5zaXplO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRmllbGRMZW5ndGgoc2hvcnRJZCwgZmllbGRJZCwgdGhpcy5fZG9jdW1lbnRDb3VudCwgdW5pcXVlVGVybXMpO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHRva2Vuc18yID0gKGVfNiA9IHZvaWQgMCwgX192YWx1ZXModG9rZW5zKSksIHRva2Vuc18yXzEgPSB0b2tlbnNfMi5uZXh0KCk7ICF0b2tlbnNfMl8xLmRvbmU7IHRva2Vuc18yXzEgPSB0b2tlbnNfMi5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ZXJtID0gdG9rZW5zXzJfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9jZXNzZWRUZXJtID0gcHJvY2Vzc1Rlcm0odGVybSwgZmllbGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJvY2Vzc2VkVGVybSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBwcm9jZXNzZWRUZXJtXzIgPSAoZV83ID0gdm9pZCAwLCBfX3ZhbHVlcyhwcm9jZXNzZWRUZXJtKSksIHByb2Nlc3NlZFRlcm1fMl8xID0gcHJvY2Vzc2VkVGVybV8yLm5leHQoKTsgIXByb2Nlc3NlZFRlcm1fMl8xLmRvbmU7IHByb2Nlc3NlZFRlcm1fMl8xID0gcHJvY2Vzc2VkVGVybV8yLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSBwcm9jZXNzZWRUZXJtXzJfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlVGVybShmaWVsZElkLCBzaG9ydElkLCB0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZV83XzEpIHsgZV83ID0geyBlcnJvcjogZV83XzEgfTsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb2Nlc3NlZFRlcm1fMl8xICYmICFwcm9jZXNzZWRUZXJtXzJfMS5kb25lICYmIChfYyA9IHByb2Nlc3NlZFRlcm1fMi5yZXR1cm4pKSBfYy5jYWxsKHByb2Nlc3NlZFRlcm1fMik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzcpIHRocm93IGVfNy5lcnJvcjsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHByb2Nlc3NlZFRlcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVRlcm0oZmllbGRJZCwgc2hvcnRJZCwgcHJvY2Vzc2VkVGVybSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVfNl8xKSB7IGVfNiA9IHsgZXJyb3I6IGVfNl8xIH07IH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbnNfMl8xICYmICF0b2tlbnNfMl8xLmRvbmUgJiYgKF9iID0gdG9rZW5zXzIucmV0dXJuKSkgX2IuY2FsbCh0b2tlbnNfMik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzYpIHRocm93IGVfNi5lcnJvcjsgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV81XzEpIHsgZV81ID0geyBlcnJvcjogZV81XzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKGZpZWxkc18yXzEgJiYgIWZpZWxkc18yXzEuZG9uZSAmJiAoX2EgPSBmaWVsZHNfMi5yZXR1cm4pKSBfYS5jYWxsKGZpZWxkc18yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV81KSB0aHJvdyBlXzUuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdG9yZWRGaWVsZHMuZGVsZXRlKHNob3J0SWQpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudElkcy5kZWxldGUoc2hvcnRJZCk7XG4gICAgICAgIHRoaXMuX2lkVG9TaG9ydElkLmRlbGV0ZShpZCk7XG4gICAgICAgIHRoaXMuX2ZpZWxkTGVuZ3RoLmRlbGV0ZShzaG9ydElkKTtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnRDb3VudCAtPSAxO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwgdGhlIGdpdmVuIGRvY3VtZW50cyBmcm9tIHRoZSBpbmRleC4gSWYgY2FsbGVkIHdpdGggbm8gYXJndW1lbnRzLFxuICAgICAqIGl0IHJlbW92ZXMgX2FsbF8gZG9jdW1lbnRzIGZyb20gdGhlIGluZGV4LlxuICAgICAqXG4gICAgICogQHBhcmFtIGRvY3VtZW50cyAgVGhlIGRvY3VtZW50cyB0byBiZSByZW1vdmVkLiBJZiB0aGlzIGFyZ3VtZW50IGlzIG9taXR0ZWQsXG4gICAgICogYWxsIGRvY3VtZW50cyBhcmUgcmVtb3ZlZC4gTm90ZSB0aGF0LCBmb3IgcmVtb3ZpbmcgYWxsIGRvY3VtZW50cywgaXQgaXNcbiAgICAgKiBtb3JlIGVmZmljaWVudCB0byBjYWxsIHRoaXMgbWV0aG9kIHdpdGggbm8gYXJndW1lbnRzIHRoYW4gdG8gcGFzcyBhbGxcbiAgICAgKiBkb2N1bWVudHMuXG4gICAgICovXG4gICAgTWluaVNlYXJjaC5wcm90b3R5cGUucmVtb3ZlQWxsID0gZnVuY3Rpb24gKGRvY3VtZW50cykge1xuICAgICAgICB2YXIgZV84LCBfYTtcbiAgICAgICAgaWYgKGRvY3VtZW50cykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBkb2N1bWVudHNfMiA9IF9fdmFsdWVzKGRvY3VtZW50cyksIGRvY3VtZW50c18yXzEgPSBkb2N1bWVudHNfMi5uZXh0KCk7ICFkb2N1bWVudHNfMl8xLmRvbmU7IGRvY3VtZW50c18yXzEgPSBkb2N1bWVudHNfMi5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRvY3VtZW50XzIgPSBkb2N1bWVudHNfMl8xLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZShkb2N1bWVudF8yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZV84XzEpIHsgZV84ID0geyBlcnJvcjogZV84XzEgfTsgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50c18yXzEgJiYgIWRvY3VtZW50c18yXzEuZG9uZSAmJiAoX2EgPSBkb2N1bWVudHNfMi5yZXR1cm4pKSBfYS5jYWxsKGRvY3VtZW50c18yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzgpIHRocm93IGVfOC5lcnJvcjsgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGRvY3VtZW50cyB0byBiZSBwcmVzZW50LiBPbWl0IHRoZSBhcmd1bWVudCB0byByZW1vdmUgYWxsIGRvY3VtZW50cy4nKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2luZGV4ID0gbmV3IFNlYXJjaGFibGVNYXAoKTtcbiAgICAgICAgICAgIHRoaXMuX2RvY3VtZW50Q291bnQgPSAwO1xuICAgICAgICAgICAgdGhpcy5fZG9jdW1lbnRJZHMgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICB0aGlzLl9pZFRvU2hvcnRJZCA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgIHRoaXMuX2ZpZWxkTGVuZ3RoID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgdGhpcy5fYXZnRmllbGRMZW5ndGggPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3N0b3JlZEZpZWxkcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgIHRoaXMuX25leHRJZCA9IDA7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIERpc2NhcmRzIHRoZSBkb2N1bWVudCB3aXRoIHRoZSBnaXZlbiBJRCwgc28gaXQgd29uJ3QgYXBwZWFyIGluIHNlYXJjaCByZXN1bHRzXG4gICAgICpcbiAgICAgKiBJdCBoYXMgdGhlIHNhbWUgdmlzaWJsZSBlZmZlY3Qgb2Yge0BsaW5rIE1pbmlTZWFyY2gucmVtb3ZlfSAoYm90aCBjYXVzZSB0aGVcbiAgICAgKiBkb2N1bWVudCB0byBzdG9wIGFwcGVhcmluZyBpbiBzZWFyY2hlcyksIGJ1dCBhIGRpZmZlcmVudCBlZmZlY3Qgb24gdGhlXG4gICAgICogaW50ZXJuYWwgZGF0YSBzdHJ1Y3R1cmVzOlxuICAgICAqXG4gICAgICogICAtIHtAbGluayBNaW5pU2VhcmNoI3JlbW92ZX0gcmVxdWlyZXMgcGFzc2luZyB0aGUgZnVsbCBkb2N1bWVudCB0byBiZVxuICAgICAqICAgcmVtb3ZlZCBhcyBhcmd1bWVudCwgYW5kIHJlbW92ZXMgaXQgZnJvbSB0aGUgaW52ZXJ0ZWQgaW5kZXggaW1tZWRpYXRlbHkuXG4gICAgICpcbiAgICAgKiAgIC0ge0BsaW5rIE1pbmlTZWFyY2gjZGlzY2FyZH0gaW5zdGVhZCBvbmx5IG5lZWRzIHRoZSBkb2N1bWVudCBJRCwgYW5kXG4gICAgICogICB3b3JrcyBieSBtYXJraW5nIHRoZSBjdXJyZW50IHZlcnNpb24gb2YgdGhlIGRvY3VtZW50IGFzIGRpc2NhcmRlZCwgc28gaXRcbiAgICAgKiAgIGlzIGltbWVkaWF0ZWx5IGlnbm9yZWQgYnkgc2VhcmNoZXMuIFRoaXMgaXMgZmFzdGVyIGFuZCBtb3JlIGNvbnZlbmllbnRcbiAgICAgKiAgIHRoYW4ge0BsaW5rIE1pbmlTZWFyY2gjcmVtb3ZlfSwgYnV0IHRoZSBpbmRleCBpcyBub3QgaW1tZWRpYXRlbHlcbiAgICAgKiAgIG1vZGlmaWVkLiBUbyB0YWtlIGNhcmUgb2YgdGhhdCwgdmFjdXVtaW5nIGlzIHBlcmZvcm1lZCBhZnRlciBhIGNlcnRhaW5cbiAgICAgKiAgIG51bWJlciBvZiBkb2N1bWVudHMgYXJlIGRpc2NhcmRlZCwgY2xlYW5pbmcgdXAgdGhlIGluZGV4IGFuZCBhbGxvd2luZ1xuICAgICAqICAgbWVtb3J5IHRvIGJlIHJlbGVhc2VkLlxuICAgICAqXG4gICAgICogQWZ0ZXIgZGlzY2FyZGluZyBhIGRvY3VtZW50LCBpdCBpcyBwb3NzaWJsZSB0byByZS1hZGQgYSBuZXcgdmVyc2lvbiwgYW5kXG4gICAgICogb25seSB0aGUgbmV3IHZlcnNpb24gd2lsbCBhcHBlYXIgaW4gc2VhcmNoZXMuIEluIG90aGVyIHdvcmRzLCBkaXNjYXJkaW5nXG4gICAgICogYW5kIHJlLWFkZGluZyBhIGRvY3VtZW50IHdvcmtzIGV4YWN0bHkgbGlrZSByZW1vdmluZyBhbmQgcmUtYWRkaW5nIGl0LiBUaGVcbiAgICAgKiB7QGxpbmsgTWluaVNlYXJjaC5yZXBsYWNlfSBtZXRob2QgY2FuIGFsc28gYmUgdXNlZCB0byByZXBsYWNlIGEgZG9jdW1lbnRcbiAgICAgKiB3aXRoIGEgbmV3IHZlcnNpb24uXG4gICAgICpcbiAgICAgKiAjIyMjIERldGFpbHMgYWJvdXQgdmFjdXVtaW5nXG4gICAgICpcbiAgICAgKiBSZXBldGl0ZSBjYWxscyB0byB0aGlzIG1ldGhvZCB3b3VsZCBsZWF2ZSBvYnNvbGV0ZSBkb2N1bWVudCByZWZlcmVuY2VzIGluXG4gICAgICogdGhlIGluZGV4LCBpbnZpc2libGUgdG8gc2VhcmNoZXMuIFR3byBtZWNoYW5pc21zIHRha2UgY2FyZSBvZiBjbGVhbmluZyB1cDpcbiAgICAgKiBjbGVhbiB1cCBkdXJpbmcgc2VhcmNoLCBhbmQgdmFjdXVtaW5nLlxuICAgICAqXG4gICAgICogICAtIFVwb24gc2VhcmNoLCB3aGVuZXZlciBhIGRpc2NhcmRlZCBJRCBpcyBmb3VuZCAoYW5kIGlnbm9yZWQgZm9yIHRoZVxuICAgICAqICAgcmVzdWx0cyksIHJlZmVyZW5jZXMgdG8gdGhlIGRpc2NhcmRlZCBkb2N1bWVudCBhcmUgcmVtb3ZlZCBmcm9tIHRoZVxuICAgICAqICAgaW52ZXJ0ZWQgaW5kZXggZW50cmllcyBmb3IgdGhlIHNlYXJjaCB0ZXJtcy4gVGhpcyBlbnN1cmVzIHRoYXQgc3Vic2VxdWVudFxuICAgICAqICAgc2VhcmNoZXMgZm9yIHRoZSBzYW1lIHRlcm1zIGRvIG5vdCBuZWVkIHRvIHNraXAgdGhlc2Ugb2Jzb2xldGUgcmVmZXJlbmNlc1xuICAgICAqICAgYWdhaW4uXG4gICAgICpcbiAgICAgKiAgIC0gSW4gYWRkaXRpb24sIHZhY3V1bWluZyBpcyBwZXJmb3JtZWQgYXV0b21hdGljYWxseSBieSBkZWZhdWx0IChzZWUgdGhlXG4gICAgICogICBgYXV0b1ZhY3V1bWAgZmllbGQgaW4ge0BsaW5rIE9wdGlvbnN9KSBhZnRlciBhIGNlcnRhaW4gbnVtYmVyIG9mXG4gICAgICogICBkb2N1bWVudHMgYXJlIGRpc2NhcmRlZC4gVmFjdXVtaW5nIHRyYXZlcnNlcyBhbGwgdGVybXMgaW4gdGhlIGluZGV4LFxuICAgICAqICAgY2xlYW5pbmcgdXAgYWxsIHJlZmVyZW5jZXMgdG8gZGlzY2FyZGVkIGRvY3VtZW50cy4gVmFjdXVtaW5nIGNhbiBhbHNvIGJlXG4gICAgICogICB0cmlnZ2VyZWQgbWFudWFsbHkgYnkgY2FsbGluZyB7QGxpbmsgTWluaVNlYXJjaCN2YWN1dW19LlxuICAgICAqXG4gICAgICogQHBhcmFtIGlkICBUaGUgSUQgb2YgdGhlIGRvY3VtZW50IHRvIGJlIGRpc2NhcmRlZFxuICAgICAqL1xuICAgIE1pbmlTZWFyY2gucHJvdG90eXBlLmRpc2NhcmQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHNob3J0SWQgPSB0aGlzLl9pZFRvU2hvcnRJZC5nZXQoaWQpO1xuICAgICAgICBpZiAoc2hvcnRJZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaW5pU2VhcmNoOiBjYW5ub3QgZGlzY2FyZCBkb2N1bWVudCB3aXRoIElEIFwiLmNvbmNhdChpZCwgXCI6IGl0IGlzIG5vdCBpbiB0aGUgaW5kZXhcIikpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lkVG9TaG9ydElkLmRlbGV0ZShpZCk7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50SWRzLmRlbGV0ZShzaG9ydElkKTtcbiAgICAgICAgdGhpcy5fc3RvcmVkRmllbGRzLmRlbGV0ZShzaG9ydElkKTtcbiAgICAgICAgKHRoaXMuX2ZpZWxkTGVuZ3RoLmdldChzaG9ydElkKSB8fCBbXSkuZm9yRWFjaChmdW5jdGlvbiAoZmllbGRMZW5ndGgsIGZpZWxkSWQpIHtcbiAgICAgICAgICAgIF90aGlzLnJlbW92ZUZpZWxkTGVuZ3RoKHNob3J0SWQsIGZpZWxkSWQsIF90aGlzLl9kb2N1bWVudENvdW50LCBmaWVsZExlbmd0aCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9maWVsZExlbmd0aC5kZWxldGUoc2hvcnRJZCk7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50Q291bnQgLT0gMTtcbiAgICAgICAgdGhpcy5fZGlydENvdW50ICs9IDE7XG4gICAgICAgIHRoaXMubWF5YmVBdXRvVmFjdXVtKCk7XG4gICAgfTtcbiAgICBNaW5pU2VhcmNoLnByb3RvdHlwZS5tYXliZUF1dG9WYWN1dW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmF1dG9WYWN1dW0gPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIF9hID0gdGhpcy5fb3B0aW9ucy5hdXRvVmFjdXVtLCBtaW5EaXJ0RmFjdG9yID0gX2EubWluRGlydEZhY3RvciwgbWluRGlydENvdW50ID0gX2EubWluRGlydENvdW50LCBiYXRjaFNpemUgPSBfYS5iYXRjaFNpemUsIGJhdGNoV2FpdCA9IF9hLmJhdGNoV2FpdDtcbiAgICAgICAgdGhpcy5jb25kaXRpb25hbFZhY3V1bSh7IGJhdGNoU2l6ZTogYmF0Y2hTaXplLCBiYXRjaFdhaXQ6IGJhdGNoV2FpdCB9LCB7IG1pbkRpcnRDb3VudDogbWluRGlydENvdW50LCBtaW5EaXJ0RmFjdG9yOiBtaW5EaXJ0RmFjdG9yIH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRGlzY2FyZHMgdGhlIGRvY3VtZW50cyB3aXRoIHRoZSBnaXZlbiBJRHMsIHNvIHRoZXkgd29uJ3QgYXBwZWFyIGluIHNlYXJjaFxuICAgICAqIHJlc3VsdHNcbiAgICAgKlxuICAgICAqIEl0IGlzIGVxdWl2YWxlbnQgdG8gY2FsbGluZyB7QGxpbmsgTWluaVNlYXJjaCNkaXNjYXJkfSBmb3IgYWxsIHRoZSBnaXZlblxuICAgICAqIElEcywgYnV0IHdpdGggdGhlIG9wdGltaXphdGlvbiBvZiB0cmlnZ2VyaW5nIGF0IG1vc3Qgb25lIGF1dG9tYXRpY1xuICAgICAqIHZhY3V1bWluZyBhdCB0aGUgZW5kLlxuICAgICAqXG4gICAgICogTm90ZTogdG8gcmVtb3ZlIGFsbCBkb2N1bWVudHMgZnJvbSB0aGUgaW5kZXgsIGl0IGlzIGZhc3RlciBhbmQgbW9yZVxuICAgICAqIGNvbnZlbmllbnQgdG8gY2FsbCB7QGxpbmsgTWluaVNlYXJjaC5yZW1vdmVBbGx9IHdpdGggbm8gYXJndW1lbnQsIGluc3RlYWRcbiAgICAgKiBvZiBwYXNzaW5nIGFsbCBJRHMgdG8gdGhpcyBtZXRob2QuXG4gICAgICovXG4gICAgTWluaVNlYXJjaC5wcm90b3R5cGUuZGlzY2FyZEFsbCA9IGZ1bmN0aW9uIChpZHMpIHtcbiAgICAgICAgdmFyIGVfOSwgX2E7XG4gICAgICAgIHZhciBhdXRvVmFjdXVtID0gdGhpcy5fb3B0aW9ucy5hdXRvVmFjdXVtO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5hdXRvVmFjdXVtID0gZmFsc2U7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGlkc18xID0gX192YWx1ZXMoaWRzKSwgaWRzXzFfMSA9IGlkc18xLm5leHQoKTsgIWlkc18xXzEuZG9uZTsgaWRzXzFfMSA9IGlkc18xLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaWQgPSBpZHNfMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc2NhcmQoaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlXzlfMSkgeyBlXzkgPSB7IGVycm9yOiBlXzlfMSB9OyB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaWRzXzFfMSAmJiAhaWRzXzFfMS5kb25lICYmIChfYSA9IGlkc18xLnJldHVybikpIF9hLmNhbGwoaWRzXzEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfOSkgdGhyb3cgZV85LmVycm9yOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLmF1dG9WYWN1dW0gPSBhdXRvVmFjdXVtO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubWF5YmVBdXRvVmFjdXVtKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJdCByZXBsYWNlcyBhbiBleGlzdGluZyBkb2N1bWVudCB3aXRoIHRoZSBnaXZlbiB1cGRhdGVkIHZlcnNpb25cbiAgICAgKlxuICAgICAqIEl0IHdvcmtzIGJ5IGRpc2NhcmRpbmcgdGhlIGN1cnJlbnQgdmVyc2lvbiBhbmQgYWRkaW5nIHRoZSB1cGRhdGVkIG9uZSwgc29cbiAgICAgKiBpdCBpcyBmdW5jdGlvbmFsbHkgZXF1aXZhbGVudCB0byBjYWxsaW5nIHtAbGluayBNaW5pU2VhcmNoI2Rpc2NhcmR9XG4gICAgICogZm9sbG93ZWQgYnkge0BsaW5rIE1pbmlTZWFyY2gjYWRkfS4gVGhlIElEIG9mIHRoZSB1cGRhdGVkIGRvY3VtZW50IHNob3VsZFxuICAgICAqIGJlIHRoZSBzYW1lIGFzIHRoZSBvcmlnaW5hbCBvbmUuXG4gICAgICpcbiAgICAgKiBTaW5jZSBpdCB1c2VzIHtAbGluayBNaW5pU2VhcmNoI2Rpc2NhcmR9IGludGVybmFsbHksIHRoaXMgbWV0aG9kIHJlbGllcyBvblxuICAgICAqIHZhY3V1bWluZyB0byBjbGVhbiB1cCBvYnNvbGV0ZSBkb2N1bWVudCByZWZlcmVuY2VzIGZyb20gdGhlIGluZGV4LCBhbGxvd2luZ1xuICAgICAqIG1lbW9yeSB0byBiZSByZWxlYXNlZCAoc2VlIHtAbGluayBNaW5pU2VhcmNoI2Rpc2NhcmR9KS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB1cGRhdGVkRG9jdW1lbnQgIFRoZSB1cGRhdGVkIGRvY3VtZW50IHRvIHJlcGxhY2UgdGhlIG9sZCB2ZXJzaW9uXG4gICAgICogd2l0aFxuICAgICAqL1xuICAgIE1pbmlTZWFyY2gucHJvdG90eXBlLnJlcGxhY2UgPSBmdW5jdGlvbiAodXBkYXRlZERvY3VtZW50KSB7XG4gICAgICAgIHZhciBfYSA9IHRoaXMuX29wdGlvbnMsIGlkRmllbGQgPSBfYS5pZEZpZWxkLCBleHRyYWN0RmllbGQgPSBfYS5leHRyYWN0RmllbGQ7XG4gICAgICAgIHZhciBpZCA9IGV4dHJhY3RGaWVsZCh1cGRhdGVkRG9jdW1lbnQsIGlkRmllbGQpO1xuICAgICAgICB0aGlzLmRpc2NhcmQoaWQpO1xuICAgICAgICB0aGlzLmFkZCh1cGRhdGVkRG9jdW1lbnQpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVHJpZ2dlcnMgYSBtYW51YWwgdmFjdXVtaW5nLCBjbGVhbmluZyB1cCByZWZlcmVuY2VzIHRvIGRpc2NhcmRlZCBkb2N1bWVudHNcbiAgICAgKiBmcm9tIHRoZSBpbnZlcnRlZCBpbmRleFxuICAgICAqXG4gICAgICogVmFjdXVtaW5nIGlzIG9ubHkgdXNlZnVsIGZvciBhcHBsaWNhdGlvbnMgdGhhdCB1c2UgdGhlIHtAbGlua1xuICAgICAqIE1pbmlTZWFyY2gjZGlzY2FyZH0gb3Ige0BsaW5rIE1pbmlTZWFyY2gjcmVwbGFjZX0gbWV0aG9kcy5cbiAgICAgKlxuICAgICAqIEJ5IGRlZmF1bHQsIHZhY3V1bWluZyBpcyBwZXJmb3JtZWQgYXV0b21hdGljYWxseSB3aGVuIG5lZWRlZCAoY29udHJvbGxlZCBieVxuICAgICAqIHRoZSBgYXV0b1ZhY3V1bWAgZmllbGQgaW4ge0BsaW5rIE9wdGlvbnN9KSwgc28gdGhlcmUgaXMgdXN1YWxseSBubyBuZWVkIHRvXG4gICAgICogY2FsbCB0aGlzIG1ldGhvZCwgdW5sZXNzIG9uZSB3YW50cyB0byBtYWtlIHN1cmUgdG8gcGVyZm9ybSB2YWN1dW1pbmcgYXQgYVxuICAgICAqIHNwZWNpZmljIG1vbWVudC5cbiAgICAgKlxuICAgICAqIFZhY3V1bWluZyB0cmF2ZXJzZXMgYWxsIHRlcm1zIGluIHRoZSBpbnZlcnRlZCBpbmRleCBpbiBiYXRjaGVzLCBhbmQgY2xlYW5zXG4gICAgICogdXAgcmVmZXJlbmNlcyB0byBkaXNjYXJkZWQgZG9jdW1lbnRzIGZyb20gdGhlIHBvc3RpbmcgbGlzdCwgYWxsb3dpbmcgbWVtb3J5XG4gICAgICogdG8gYmUgcmVsZWFzZWQuXG4gICAgICpcbiAgICAgKiBUaGUgbWV0aG9kIHRha2VzIGFuIG9wdGlvbmFsIG9iamVjdCBhcyBhcmd1bWVudCB3aXRoIHRoZSBmb2xsb3dpbmcga2V5czpcbiAgICAgKlxuICAgICAqICAgLSBgYmF0Y2hTaXplYDogdGhlIHNpemUgb2YgZWFjaCBiYXRjaCAoMTAwMCBieSBkZWZhdWx0KVxuICAgICAqXG4gICAgICogICAtIGBiYXRjaFdhaXRgOiB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byB3YWl0IGJldHdlZW4gYmF0Y2hlcyAoMTAgYnlcbiAgICAgKiAgIGRlZmF1bHQpXG4gICAgICpcbiAgICAgKiBPbiBsYXJnZSBpbmRleGVzLCB2YWN1dW1pbmcgY291bGQgaGF2ZSBhIG5vbi1uZWdsaWdpYmxlIGNvc3Q6IGJhdGNoaW5nXG4gICAgICogYXZvaWRzIGJsb2NraW5nIHRoZSB0aHJlYWQgZm9yIGxvbmcsIGRpbHV0aW5nIHRoaXMgY29zdCBzbyB0aGF0IGl0IGlzIG5vdFxuICAgICAqIG5lZ2F0aXZlbHkgYWZmZWN0aW5nIHRoZSBhcHBsaWNhdGlvbi4gTm9uZXRoZWxlc3MsIHRoaXMgbWV0aG9kIHNob3VsZCBvbmx5XG4gICAgICogYmUgY2FsbGVkIHdoZW4gbmVjZXNzYXJ5LCBhbmQgcmVseWluZyBvbiBhdXRvbWF0aWMgdmFjdXVtaW5nIGlzIHVzdWFsbHlcbiAgICAgKiBiZXR0ZXIuXG4gICAgICpcbiAgICAgKiBJdCByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzICh0byB1bmRlZmluZWQpIHdoZW4gdGhlIGNsZWFuIHVwIGlzXG4gICAgICogY29tcGxldGVkLiBJZiB2YWN1dW1pbmcgaXMgYWxyZWFkeSBvbmdvaW5nIGF0IHRoZSB0aW1lIHRoaXMgbWV0aG9kIGlzXG4gICAgICogY2FsbGVkLCBhIG5ldyBvbmUgaXMgZW5xdWV1ZWQgaW1tZWRpYXRlbHkgYWZ0ZXIgdGhlIG9uZ29pbmcgb25lLCBhbmQgYVxuICAgICAqIGNvcnJlc3BvbmRpbmcgcHJvbWlzZSBpcyByZXR1cm5lZC4gSG93ZXZlciwgbm8gbW9yZSB0aGFuIG9uZSB2YWN1dW1pbmcgaXNcbiAgICAgKiBlbnF1ZXVlZCBvbiB0b3Agb2YgdGhlIG9uZ29pbmcgb25lLCBldmVuIGlmIHRoaXMgbWV0aG9kIGlzIGNhbGxlZCBtb3JlXG4gICAgICogdGltZXMgKGVucXVldWluZyBtdWx0aXBsZSBvbmVzIHdvdWxkIGJlIHVzZWxlc3MpLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgIENvbmZpZ3VyYXRpb24gb3B0aW9ucyBmb3IgdGhlIGJhdGNoIHNpemUgYW5kIGRlbGF5LiBTZWVcbiAgICAgKiB7QGxpbmsgVmFjdXVtT3B0aW9uc30uXG4gICAgICovXG4gICAgTWluaVNlYXJjaC5wcm90b3R5cGUudmFjdXVtID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZGl0aW9uYWxWYWN1dW0ob3B0aW9ucyk7XG4gICAgfTtcbiAgICBNaW5pU2VhcmNoLnByb3RvdHlwZS5jb25kaXRpb25hbFZhY3V1bSA9IGZ1bmN0aW9uIChvcHRpb25zLCBjb25kaXRpb25zKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIC8vIElmIGEgdmFjdXVtIGlzIGFscmVhZHkgb25nb2luZywgc2NoZWR1bGUgYW5vdGhlciBhcyBzb29uIGFzIGl0IGZpbmlzaGVzLFxuICAgICAgICAvLyB1bmxlc3MgdGhlcmUncyBhbHJlYWR5IG9uZSBlbnF1ZXVlZC4gSWYgb25lIHdhcyBhbHJlYWR5IGVucXVldWVkLCBkbyBub3RcbiAgICAgICAgLy8gZW5xdWV1ZSBhbm90aGVyIG9uIHRvcCwgYnV0IG1ha2Ugc3VyZSB0aGF0IHRoZSBjb25kaXRpb25zIGFyZSB0aGVcbiAgICAgICAgLy8gYnJvYWRlc3QuXG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50VmFjdXVtKSB7XG4gICAgICAgICAgICB0aGlzLl9lbnF1ZXVlZFZhY3V1bUNvbmRpdGlvbnMgPSB0aGlzLl9lbnF1ZXVlZFZhY3V1bUNvbmRpdGlvbnMgJiYgY29uZGl0aW9ucztcbiAgICAgICAgICAgIGlmICh0aGlzLl9lbnF1ZXVlZFZhY3V1bSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VucXVldWVkVmFjdXVtO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZW5xdWV1ZWRWYWN1dW0gPSB0aGlzLl9jdXJyZW50VmFjdXVtLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBjb25kaXRpb25zID0gX3RoaXMuX2VucXVldWVkVmFjdXVtQ29uZGl0aW9ucztcbiAgICAgICAgICAgICAgICBfdGhpcy5fZW5xdWV1ZWRWYWN1dW1Db25kaXRpb25zID0gZGVmYXVsdFZhY3V1bUNvbmRpdGlvbnM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLnBlcmZvcm1WYWN1dW1pbmcob3B0aW9ucywgY29uZGl0aW9ucyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbnF1ZXVlZFZhY3V1bTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy52YWN1dW1Db25kaXRpb25zTWV0KGNvbmRpdGlvbnMpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2N1cnJlbnRWYWN1dW0gPSB0aGlzLnBlcmZvcm1WYWN1dW1pbmcob3B0aW9ucyk7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50VmFjdXVtO1xuICAgIH07XG4gICAgTWluaVNlYXJjaC5wcm90b3R5cGUucGVyZm9ybVZhY3V1bWluZyA9IGZ1bmN0aW9uIChvcHRpb25zLCBjb25kaXRpb25zKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpbml0aWFsRGlydENvdW50LCBiYXRjaFNpemUsIGJhdGNoV2FpdF8xLCBpLCBfYSwgX2IsIF9jLCB0ZXJtLCBmaWVsZHNEYXRhLCBmaWVsZHNEYXRhXzEsIGZpZWxkc0RhdGFfMV8xLCBfZCwgZmllbGRJZCwgZmllbGRJbmRleCwgZmllbGRJbmRleF8xLCBmaWVsZEluZGV4XzFfMSwgX2UsIHNob3J0SWQsIGVfMTBfMTtcbiAgICAgICAgICAgIHZhciBlXzEwLCBfZiwgZV8xMSwgX2csIGVfMTIsIF9oO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfaikge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2oubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbERpcnRDb3VudCA9IHRoaXMuX2RpcnRDb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy52YWN1dW1Db25kaXRpb25zTWV0KGNvbmRpdGlvbnMpKSByZXR1cm4gWzMgLypicmVhayovLCAxMF07XG4gICAgICAgICAgICAgICAgICAgICAgICBiYXRjaFNpemUgPSBvcHRpb25zLmJhdGNoU2l6ZSB8fCBkZWZhdWx0VmFjdXVtT3B0aW9ucy5iYXRjaFNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYXRjaFdhaXRfMSA9IG9wdGlvbnMuYmF0Y2hXYWl0IHx8IGRlZmF1bHRWYWN1dW1PcHRpb25zLmJhdGNoV2FpdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2oubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfai50cnlzLnB1c2goWzEsIDcsIDgsIDldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gX192YWx1ZXModGhpcy5faW5kZXgpLCBfYiA9IF9hLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9qLmxhYmVsID0gMjtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhX2IuZG9uZSkgcmV0dXJuIFszIC8qYnJlYWsqLywgNl07XG4gICAgICAgICAgICAgICAgICAgICAgICBfYyA9IF9fcmVhZChfYi52YWx1ZSwgMiksIHRlcm0gPSBfY1swXSwgZmllbGRzRGF0YSA9IF9jWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGZpZWxkc0RhdGFfMSA9IChlXzExID0gdm9pZCAwLCBfX3ZhbHVlcyhmaWVsZHNEYXRhKSksIGZpZWxkc0RhdGFfMV8xID0gZmllbGRzRGF0YV8xLm5leHQoKTsgIWZpZWxkc0RhdGFfMV8xLmRvbmU7IGZpZWxkc0RhdGFfMV8xID0gZmllbGRzRGF0YV8xLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZCA9IF9fcmVhZChmaWVsZHNEYXRhXzFfMS52YWx1ZSwgMiksIGZpZWxkSWQgPSBfZFswXSwgZmllbGRJbmRleCA9IF9kWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChmaWVsZEluZGV4XzEgPSAoZV8xMiA9IHZvaWQgMCwgX192YWx1ZXMoZmllbGRJbmRleCkpLCBmaWVsZEluZGV4XzFfMSA9IGZpZWxkSW5kZXhfMS5uZXh0KCk7ICFmaWVsZEluZGV4XzFfMS5kb25lOyBmaWVsZEluZGV4XzFfMSA9IGZpZWxkSW5kZXhfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZSA9IF9fcmVhZChmaWVsZEluZGV4XzFfMS52YWx1ZSwgMSksIHNob3J0SWQgPSBfZVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZG9jdW1lbnRJZHMuaGFzKHNob3J0SWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmllbGRJbmRleC5zaXplIDw9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRzRGF0YS5kZWxldGUoZmllbGRJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZEluZGV4LmRlbGV0ZShzaG9ydElkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVfMTJfMSkgeyBlXzEyID0geyBlcnJvcjogZV8xMl8xIH07IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWVsZEluZGV4XzFfMSAmJiAhZmllbGRJbmRleF8xXzEuZG9uZSAmJiAoX2ggPSBmaWVsZEluZGV4XzEucmV0dXJuKSkgX2guY2FsbChmaWVsZEluZGV4XzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzEyKSB0aHJvdyBlXzEyLmVycm9yOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZV8xMV8xKSB7IGVfMTEgPSB7IGVycm9yOiBlXzExXzEgfTsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkc0RhdGFfMV8xICYmICFmaWVsZHNEYXRhXzFfMS5kb25lICYmIChfZyA9IGZpZWxkc0RhdGFfMS5yZXR1cm4pKSBfZy5jYWxsKGZpZWxkc0RhdGFfMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xMSkgdGhyb3cgZV8xMS5lcnJvcjsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2luZGV4LmdldCh0ZXJtKS5zaXplID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5kZXguZGVsZXRlKHRlcm0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoaSAlIGJhdGNoU2l6ZSA9PT0gMCkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmV0dXJuIHNldFRpbWVvdXQocmVzb2x2ZSwgYmF0Y2hXYWl0XzEpOyB9KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9qLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9qLmxhYmVsID0gNDtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgaSArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2oubGFiZWwgPSA1O1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYiA9IF9hLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDJdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6IHJldHVybiBbMyAvKmJyZWFrKi8sIDldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgICAgICBlXzEwXzEgPSBfai5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlXzEwID0geyBlcnJvcjogZV8xMF8xIH07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA5XTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2IgJiYgIV9iLmRvbmUgJiYgKF9mID0gX2EucmV0dXJuKSkgX2YuY2FsbChfYSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMTApIHRocm93IGVfMTAuZXJyb3I7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNyAvKmVuZGZpbmFsbHkqL107XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RpcnRDb3VudCAtPSBpbml0aWFsRGlydENvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgX2oubGFiZWwgPSAxMDtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDogXG4gICAgICAgICAgICAgICAgICAgIC8vIE1ha2UgdGhlIG5leHQgbGluZXMgYWx3YXlzIGFzeW5jLCBzbyB0aGV5IGV4ZWN1dGUgYWZ0ZXIgdGhpcyBmdW5jdGlvbiByZXR1cm5zXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIG51bGxdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDExOlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTWFrZSB0aGUgbmV4dCBsaW5lcyBhbHdheXMgYXN5bmMsIHNvIHRoZXkgZXhlY3V0ZSBhZnRlciB0aGlzIGZ1bmN0aW9uIHJldHVybnNcbiAgICAgICAgICAgICAgICAgICAgICAgIF9qLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRWYWN1dW0gPSB0aGlzLl9lbnF1ZXVlZFZhY3V1bTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2VucXVldWVkVmFjdXVtID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBNaW5pU2VhcmNoLnByb3RvdHlwZS52YWN1dW1Db25kaXRpb25zTWV0ID0gZnVuY3Rpb24gKGNvbmRpdGlvbnMpIHtcbiAgICAgICAgaWYgKGNvbmRpdGlvbnMgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG1pbkRpcnRDb3VudCA9IGNvbmRpdGlvbnMubWluRGlydENvdW50LCBtaW5EaXJ0RmFjdG9yID0gY29uZGl0aW9ucy5taW5EaXJ0RmFjdG9yO1xuICAgICAgICBtaW5EaXJ0Q291bnQgPSBtaW5EaXJ0Q291bnQgfHwgZGVmYXVsdEF1dG9WYWN1dW1PcHRpb25zLm1pbkRpcnRDb3VudDtcbiAgICAgICAgbWluRGlydEZhY3RvciA9IG1pbkRpcnRGYWN0b3IgfHwgZGVmYXVsdEF1dG9WYWN1dW1PcHRpb25zLm1pbkRpcnRGYWN0b3I7XG4gICAgICAgIHJldHVybiB0aGlzLmRpcnRDb3VudCA+PSBtaW5EaXJ0Q291bnQgJiYgdGhpcy5kaXJ0RmFjdG9yID49IG1pbkRpcnRGYWN0b3I7XG4gICAgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTWluaVNlYXJjaC5wcm90b3R5cGUsIFwiaXNWYWN1dW1pbmdcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogSXMgYHRydWVgIGlmIGEgdmFjdXVtaW5nIG9wZXJhdGlvbiBpcyBvbmdvaW5nLCBgZmFsc2VgIG90aGVyd2lzZVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFZhY3V1bSAhPSBudWxsO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1pbmlTZWFyY2gucHJvdG90eXBlLCBcImRpcnRDb3VudFwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbnVtYmVyIG9mIGRvY3VtZW50cyBkaXNjYXJkZWQgc2luY2UgdGhlIG1vc3QgcmVjZW50IHZhY3V1bWluZ1xuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGlydENvdW50O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1pbmlTZWFyY2gucHJvdG90eXBlLCBcImRpcnRGYWN0b3JcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogQSBudW1iZXIgYmV0d2VlbiAwIGFuZCAxIGdpdmluZyBhbiBpbmRpY2F0aW9uIGFib3V0IHRoZSBwcm9wb3J0aW9uIG9mXG4gICAgICAgICAqIGRvY3VtZW50cyB0aGF0IGFyZSBkaXNjYXJkZWQsIGFuZCBjYW4gdGhlcmVmb3JlIGJlIGNsZWFuZWQgdXAgYnkgdmFjdXVtaW5nLlxuICAgICAgICAgKiBBIHZhbHVlIGNsb3NlIHRvIDAgbWVhbnMgdGhhdCB0aGUgaW5kZXggaXMgcmVsYXRpdmVseSBjbGVhbiwgd2hpbGUgYSBoaWdoZXJcbiAgICAgICAgICogdmFsdWUgbWVhbnMgdGhhdCB0aGUgaW5kZXggaXMgcmVsYXRpdmVseSBkaXJ0eSwgYW5kIHZhY3V1bWluZyBjb3VsZCByZWxlYXNlXG4gICAgICAgICAqIG1lbW9yeS5cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RpcnRDb3VudCAvICgxICsgdGhpcy5fZG9jdW1lbnRDb3VudCArIHRoaXMuX2RpcnRDb3VudCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGB0cnVlYCBpZiBhIGRvY3VtZW50IHdpdGggdGhlIGdpdmVuIElEIGlzIHByZXNlbnQgaW4gdGhlIGluZGV4IGFuZFxuICAgICAqIGF2YWlsYWJsZSBmb3Igc2VhcmNoLCBgZmFsc2VgIG90aGVyd2lzZVxuICAgICAqXG4gICAgICogQHBhcmFtIGlkICBUaGUgZG9jdW1lbnQgSURcbiAgICAgKi9cbiAgICBNaW5pU2VhcmNoLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkVG9TaG9ydElkLmhhcyhpZCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBzdG9yZWQgZmllbGRzIChhcyBjb25maWd1cmVkIGluIHRoZSBgc3RvcmVGaWVsZHNgIGNvbnN0cnVjdG9yXG4gICAgICogb3B0aW9uKSBmb3IgdGhlIGdpdmVuIGRvY3VtZW50IElELiBSZXR1cm5zIGB1bmRlZmluZWRgIGlmIHRoZSBkb2N1bWVudCBpc1xuICAgICAqIG5vdCBwcmVzZW50IGluIHRoZSBpbmRleC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpZCAgVGhlIGRvY3VtZW50IElEXG4gICAgICovXG4gICAgTWluaVNlYXJjaC5wcm90b3R5cGUuZ2V0U3RvcmVkRmllbGRzID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHZhciBzaG9ydElkID0gdGhpcy5faWRUb1Nob3J0SWQuZ2V0KGlkKTtcbiAgICAgICAgaWYgKHNob3J0SWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fc3RvcmVkRmllbGRzLmdldChzaG9ydElkKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNlYXJjaCBmb3IgZG9jdW1lbnRzIG1hdGNoaW5nIHRoZSBnaXZlbiBzZWFyY2ggcXVlcnkuXG4gICAgICpcbiAgICAgKiBUaGUgcmVzdWx0IGlzIGEgbGlzdCBvZiBzY29yZWQgZG9jdW1lbnQgSURzIG1hdGNoaW5nIHRoZSBxdWVyeSwgc29ydGVkIGJ5XG4gICAgICogZGVzY2VuZGluZyBzY29yZSwgYW5kIGVhY2ggaW5jbHVkaW5nIGRhdGEgYWJvdXQgd2hpY2ggdGVybXMgd2VyZSBtYXRjaGVkIGFuZFxuICAgICAqIGluIHdoaWNoIGZpZWxkcy5cbiAgICAgKlxuICAgICAqICMjIyBCYXNpYyB1c2FnZTpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiAvLyBTZWFyY2ggZm9yIFwiemVuIGFydCBtb3RvcmN5Y2xlXCIgd2l0aCBkZWZhdWx0IG9wdGlvbnM6IHRlcm1zIGhhdmUgdG8gbWF0Y2hcbiAgICAgKiAvLyBleGFjdGx5LCBhbmQgaW5kaXZpZHVhbCB0ZXJtcyBhcmUgam9pbmVkIHdpdGggT1JcbiAgICAgKiBtaW5pU2VhcmNoLnNlYXJjaCgnemVuIGFydCBtb3RvcmN5Y2xlJylcbiAgICAgKiAvLyA9PiBbIHsgaWQ6IDIsIHNjb3JlOiAyLjc3MjU4LCBtYXRjaDogeyAuLi4gfSB9LCB7IGlkOiA0LCBzY29yZTogMS4zODYyOSwgbWF0Y2g6IHsgLi4uIH0gfSBdXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiAjIyMgUmVzdHJpY3Qgc2VhcmNoIHRvIHNwZWNpZmljIGZpZWxkczpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiAvLyBTZWFyY2ggb25seSBpbiB0aGUgJ3RpdGxlJyBmaWVsZFxuICAgICAqIG1pbmlTZWFyY2guc2VhcmNoKCd6ZW4nLCB7IGZpZWxkczogWyd0aXRsZSddIH0pXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiAjIyMgRmllbGQgYm9vc3Rpbmc6XG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogLy8gQm9vc3QgYSBmaWVsZFxuICAgICAqIG1pbmlTZWFyY2guc2VhcmNoKCd6ZW4nLCB7IGJvb3N0OiB7IHRpdGxlOiAyIH0gfSlcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqICMjIyBQcmVmaXggc2VhcmNoOlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIC8vIFNlYXJjaCBmb3IgXCJtb3RvXCIgd2l0aCBwcmVmaXggc2VhcmNoIChpdCB3aWxsIG1hdGNoIGRvY3VtZW50c1xuICAgICAqIC8vIGNvbnRhaW5pbmcgdGVybXMgdGhhdCBzdGFydCB3aXRoIFwibW90b1wiIG9yIFwibmV1cm9cIilcbiAgICAgKiBtaW5pU2VhcmNoLnNlYXJjaCgnbW90byBuZXVybycsIHsgcHJlZml4OiB0cnVlIH0pXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiAjIyMgRnV6enkgc2VhcmNoOlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIC8vIFNlYXJjaCBmb3IgXCJpc21hZWxcIiB3aXRoIGZ1enp5IHNlYXJjaCAoaXQgd2lsbCBtYXRjaCBkb2N1bWVudHMgY29udGFpbmluZ1xuICAgICAqIC8vIHRlcm1zIHNpbWlsYXIgdG8gXCJpc21hZWxcIiwgd2l0aCBhIG1heGltdW0gZWRpdCBkaXN0YW5jZSBvZiAwLjIgdGVybS5sZW5ndGhcbiAgICAgKiAvLyAocm91bmRlZCB0byBuZWFyZXN0IGludGVnZXIpXG4gICAgICogbWluaVNlYXJjaC5zZWFyY2goJ2lzbWFlbCcsIHsgZnV6enk6IDAuMiB9KVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogIyMjIENvbWJpbmluZyBzdHJhdGVnaWVzOlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIC8vIE1peCBvZiBleGFjdCBtYXRjaCwgcHJlZml4IHNlYXJjaCwgYW5kIGZ1enp5IHNlYXJjaFxuICAgICAqIG1pbmlTZWFyY2guc2VhcmNoKCdpc21hZWwgbW9iJywge1xuICAgICAqICBwcmVmaXg6IHRydWUsXG4gICAgICogIGZ1enp5OiAwLjJcbiAgICAgKiB9KVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogIyMjIEFkdmFuY2VkIHByZWZpeCBhbmQgZnV6enkgc2VhcmNoOlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIC8vIFBlcmZvcm0gZnV6enkgYW5kIHByZWZpeCBzZWFyY2ggZGVwZW5kaW5nIG9uIHRoZSBzZWFyY2ggdGVybS4gSGVyZVxuICAgICAqIC8vIHBlcmZvcm1pbmcgcHJlZml4IGFuZCBmdXp6eSBzZWFyY2ggb25seSBvbiB0ZXJtcyBsb25nZXIgdGhhbiAzIGNoYXJhY3RlcnNcbiAgICAgKiBtaW5pU2VhcmNoLnNlYXJjaCgnaXNtYWVsIG1vYicsIHtcbiAgICAgKiAgcHJlZml4OiB0ZXJtID0+IHRlcm0ubGVuZ3RoID4gM1xuICAgICAqICBmdXp6eTogdGVybSA9PiB0ZXJtLmxlbmd0aCA+IDMgPyAwLjIgOiBudWxsXG4gICAgICogfSlcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqICMjIyBDb21iaW5lIHdpdGggQU5EOlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIC8vIENvbWJpbmUgc2VhcmNoIHRlcm1zIHdpdGggQU5EICh0byBtYXRjaCBvbmx5IGRvY3VtZW50cyB0aGF0IGNvbnRhaW4gYm90aFxuICAgICAqIC8vIFwibW90b3JjeWNsZVwiIGFuZCBcImFydFwiKVxuICAgICAqIG1pbmlTZWFyY2guc2VhcmNoKCdtb3RvcmN5Y2xlIGFydCcsIHsgY29tYmluZVdpdGg6ICdBTkQnIH0pXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiAjIyMgQ29tYmluZSB3aXRoIEFORF9OT1Q6XG4gICAgICpcbiAgICAgKiBUaGVyZSBpcyBhbHNvIGFuIEFORF9OT1QgY29tYmluYXRvciwgdGhhdCBmaW5kcyBkb2N1bWVudHMgdGhhdCBtYXRjaCB0aGVcbiAgICAgKiBmaXJzdCB0ZXJtLCBidXQgZG8gbm90IG1hdGNoIGFueSBvZiB0aGUgb3RoZXIgdGVybXMuIFRoaXMgY29tYmluYXRvciBpc1xuICAgICAqIHJhcmVseSB1c2VmdWwgd2l0aCBzaW1wbGUgcXVlcmllcywgYW5kIGlzIG1lYW50IHRvIGJlIHVzZWQgd2l0aCBhZHZhbmNlZFxuICAgICAqIHF1ZXJ5IGNvbWJpbmF0aW9ucyAoc2VlIGxhdGVyIGZvciBtb3JlIGRldGFpbHMpLlxuICAgICAqXG4gICAgICogIyMjIEZpbHRlcmluZyByZXN1bHRzOlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIC8vIEZpbHRlciBvbmx5IHJlc3VsdHMgaW4gdGhlICdmaWN0aW9uJyBjYXRlZ29yeSAoYXNzdW1pbmcgdGhhdCAnY2F0ZWdvcnknXG4gICAgICogLy8gaXMgYSBzdG9yZWQgZmllbGQpXG4gICAgICogbWluaVNlYXJjaC5zZWFyY2goJ21vdG9yY3ljbGUgYXJ0Jywge1xuICAgICAqICAgZmlsdGVyOiAocmVzdWx0KSA9PiByZXN1bHQuY2F0ZWdvcnkgPT09ICdmaWN0aW9uJ1xuICAgICAqIH0pXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiAjIyMgV2lsZGNhcmQgcXVlcnlcbiAgICAgKlxuICAgICAqIFNlYXJjaGluZyBmb3IgYW4gZW1wdHkgc3RyaW5nIChhc3N1bWluZyB0aGUgZGVmYXVsdCB0b2tlbml6ZXIpIHJldHVybnMgbm9cbiAgICAgKiByZXN1bHRzLiBTb21ldGltZXMgdGhvdWdoLCBvbmUgbmVlZHMgdG8gbWF0Y2ggYWxsIGRvY3VtZW50cywgbGlrZSBpbiBhXG4gICAgICogXCJ3aWxkY2FyZFwiIHNlYXJjaC4gVGhpcyBpcyBwb3NzaWJsZSBieSBwYXNzaW5nIHRoZSBzcGVjaWFsIHZhbHVlXG4gICAgICoge0BsaW5rIE1pbmlTZWFyY2gud2lsZGNhcmR9IGFzIHRoZSBxdWVyeTpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiAvLyBSZXR1cm4gc2VhcmNoIHJlc3VsdHMgZm9yIGFsbCBkb2N1bWVudHNcbiAgICAgKiBtaW5pU2VhcmNoLnNlYXJjaChNaW5pU2VhcmNoLndpbGRjYXJkKVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogTm90ZSB0aGF0IHNlYXJjaCBvcHRpb25zIHN1Y2ggYXMgYGZpbHRlcmAgYW5kIGBib29zdERvY3VtZW50YCBhcmUgc3RpbGxcbiAgICAgKiBhcHBsaWVkLCBpbmZsdWVuY2luZyB3aGljaCByZXN1bHRzIGFyZSByZXR1cm5lZCwgYW5kIHRoZWlyIG9yZGVyOlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIC8vIFJldHVybiBzZWFyY2ggcmVzdWx0cyBmb3IgYWxsIGRvY3VtZW50cyBpbiB0aGUgJ2ZpY3Rpb24nIGNhdGVnb3J5XG4gICAgICogbWluaVNlYXJjaC5zZWFyY2goTWluaVNlYXJjaC53aWxkY2FyZCwge1xuICAgICAqICAgZmlsdGVyOiAocmVzdWx0KSA9PiByZXN1bHQuY2F0ZWdvcnkgPT09ICdmaWN0aW9uJ1xuICAgICAqIH0pXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiAjIyMgQWR2YW5jZWQgY29tYmluYXRpb24gb2YgcXVlcmllczpcbiAgICAgKlxuICAgICAqIEl0IGlzIHBvc3NpYmxlIHRvIGNvbWJpbmUgZGlmZmVyZW50IHN1YnF1ZXJpZXMgd2l0aCBPUiwgQU5ELCBhbmQgQU5EX05PVCxcbiAgICAgKiBhbmQgZXZlbiB3aXRoIGRpZmZlcmVudCBzZWFyY2ggb3B0aW9ucywgYnkgcGFzc2luZyBhIHF1ZXJ5IGV4cHJlc3Npb25cbiAgICAgKiB0cmVlIG9iamVjdCBhcyB0aGUgZmlyc3QgYXJndW1lbnQsIGluc3RlYWQgb2YgYSBzdHJpbmcuXG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogLy8gU2VhcmNoIGZvciBkb2N1bWVudHMgdGhhdCBjb250YWluIFwiemVuXCIgYW5kIChcIm1vdG9yY3ljbGVcIiBvciBcImFyY2hlcnlcIilcbiAgICAgKiBtaW5pU2VhcmNoLnNlYXJjaCh7XG4gICAgICogICBjb21iaW5lV2l0aDogJ0FORCcsXG4gICAgICogICBxdWVyaWVzOiBbXG4gICAgICogICAgICd6ZW4nLFxuICAgICAqICAgICB7XG4gICAgICogICAgICAgY29tYmluZVdpdGg6ICdPUicsXG4gICAgICogICAgICAgcXVlcmllczogWydtb3RvcmN5Y2xlJywgJ2FyY2hlcnknXVxuICAgICAqICAgICB9XG4gICAgICogICBdXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIC8vIFNlYXJjaCBmb3IgZG9jdW1lbnRzIHRoYXQgY29udGFpbiAoXCJhcHBsZVwiIG9yIFwicGVhclwiKSBidXQgbm90IFwianVpY2VcIiBhbmRcbiAgICAgKiAvLyBub3QgXCJ0cmVlXCJcbiAgICAgKiBtaW5pU2VhcmNoLnNlYXJjaCh7XG4gICAgICogICBjb21iaW5lV2l0aDogJ0FORF9OT1QnLFxuICAgICAqICAgcXVlcmllczogW1xuICAgICAqICAgICB7XG4gICAgICogICAgICAgY29tYmluZVdpdGg6ICdPUicsXG4gICAgICogICAgICAgcXVlcmllczogWydhcHBsZScsICdwZWFyJ11cbiAgICAgKiAgICAgfSxcbiAgICAgKiAgICAgJ2p1aWNlJyxcbiAgICAgKiAgICAgJ3RyZWUnXG4gICAgICogICBdXG4gICAgICogfSlcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEVhY2ggbm9kZSBpbiB0aGUgZXhwcmVzc2lvbiB0cmVlIGNhbiBiZSBlaXRoZXIgYSBzdHJpbmcsIG9yIGFuIG9iamVjdCB0aGF0XG4gICAgICogc3VwcG9ydHMgYWxsIHtAbGluayBTZWFyY2hPcHRpb25zfSBmaWVsZHMsIHBsdXMgYSBgcXVlcmllc2AgYXJyYXkgZmllbGQgZm9yXG4gICAgICogc3VicXVlcmllcy5cbiAgICAgKlxuICAgICAqIE5vdGUgdGhhdCwgd2hpbGUgdGhpcyBjYW4gYmVjb21lIGNvbXBsaWNhdGVkIHRvIGRvIGJ5IGhhbmQgZm9yIGNvbXBsZXggb3JcbiAgICAgKiBkZWVwbHkgbmVzdGVkIHF1ZXJpZXMsIGl0IHByb3ZpZGVzIGEgZm9ybWFsaXplZCBleHByZXNzaW9uIHRyZWUgQVBJIGZvclxuICAgICAqIGV4dGVybmFsIGxpYnJhcmllcyB0aGF0IGltcGxlbWVudCBhIHBhcnNlciBmb3IgY3VzdG9tIHF1ZXJ5IGxhbmd1YWdlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBxdWVyeSAgU2VhcmNoIHF1ZXJ5XG4gICAgICogQHBhcmFtIG9wdGlvbnMgIFNlYXJjaCBvcHRpb25zLiBFYWNoIG9wdGlvbiwgaWYgbm90IGdpdmVuLCBkZWZhdWx0cyB0byB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZSBvZiBgc2VhcmNoT3B0aW9uc2AgZ2l2ZW4gdG8gdGhlIGNvbnN0cnVjdG9yLCBvciB0byB0aGUgbGlicmFyeSBkZWZhdWx0LlxuICAgICAqL1xuICAgIE1pbmlTZWFyY2gucHJvdG90eXBlLnNlYXJjaCA9IGZ1bmN0aW9uIChxdWVyeSwgc2VhcmNoT3B0aW9ucykge1xuICAgICAgICB2YXIgZV8xMywgX2E7XG4gICAgICAgIGlmIChzZWFyY2hPcHRpb25zID09PSB2b2lkIDApIHsgc2VhcmNoT3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIHZhciByYXdSZXN1bHRzID0gdGhpcy5leGVjdXRlUXVlcnkocXVlcnksIHNlYXJjaE9wdGlvbnMpO1xuICAgICAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgcmF3UmVzdWx0c18xID0gX192YWx1ZXMocmF3UmVzdWx0cyksIHJhd1Jlc3VsdHNfMV8xID0gcmF3UmVzdWx0c18xLm5leHQoKTsgIXJhd1Jlc3VsdHNfMV8xLmRvbmU7IHJhd1Jlc3VsdHNfMV8xID0gcmF3UmVzdWx0c18xLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciBfYiA9IF9fcmVhZChyYXdSZXN1bHRzXzFfMS52YWx1ZSwgMiksIGRvY0lkID0gX2JbMF0sIF9jID0gX2JbMV0sIHNjb3JlID0gX2Muc2NvcmUsIHRlcm1zID0gX2MudGVybXMsIG1hdGNoID0gX2MubWF0Y2g7XG4gICAgICAgICAgICAgICAgLy8gdGVybXMgYXJlIHRoZSBtYXRjaGVkIHF1ZXJ5IHRlcm1zLCB3aGljaCB3aWxsIGJlIHJldHVybmVkIHRvIHRoZSB1c2VyXG4gICAgICAgICAgICAgICAgLy8gYXMgcXVlcnlUZXJtcy4gVGhlIHF1YWxpdHkgaXMgY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGVtLCBhcyBvcHBvc2VkIHRvXG4gICAgICAgICAgICAgICAgLy8gdGhlIG1hdGNoZWQgdGVybXMgaW4gdGhlIGRvY3VtZW50ICh3aGljaCBjYW4gYmUgZGlmZmVyZW50IGR1ZSB0b1xuICAgICAgICAgICAgICAgIC8vIHByZWZpeCBhbmQgZnV6enkgbWF0Y2gpXG4gICAgICAgICAgICAgICAgdmFyIHF1YWxpdHkgPSB0ZXJtcy5sZW5ndGggfHwgMTtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgICAgICBpZDogdGhpcy5fZG9jdW1lbnRJZHMuZ2V0KGRvY0lkKSxcbiAgICAgICAgICAgICAgICAgICAgc2NvcmU6IHNjb3JlICogcXVhbGl0eSxcbiAgICAgICAgICAgICAgICAgICAgdGVybXM6IE9iamVjdC5rZXlzKG1hdGNoKSxcbiAgICAgICAgICAgICAgICAgICAgcXVlcnlUZXJtczogdGVybXMsXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoOiBtYXRjaFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihyZXN1bHQsIHRoaXMuX3N0b3JlZEZpZWxkcy5nZXQoZG9jSWQpKTtcbiAgICAgICAgICAgICAgICBpZiAoc2VhcmNoT3B0aW9ucy5maWx0ZXIgPT0gbnVsbCB8fCBzZWFyY2hPcHRpb25zLmZpbHRlcihyZXN1bHQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV8xM18xKSB7IGVfMTMgPSB7IGVycm9yOiBlXzEzXzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKHJhd1Jlc3VsdHNfMV8xICYmICFyYXdSZXN1bHRzXzFfMS5kb25lICYmIChfYSA9IHJhd1Jlc3VsdHNfMS5yZXR1cm4pKSBfYS5jYWxsKHJhd1Jlc3VsdHNfMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMTMpIHRocm93IGVfMTMuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgICAgICAvLyBJZiBpdCdzIGEgd2lsZGNhcmQgcXVlcnksIGFuZCBubyBkb2N1bWVudCBib29zdCBpcyBhcHBsaWVkLCBza2lwIHNvcnRpbmdcbiAgICAgICAgLy8gdGhlIHJlc3VsdHMsIGFzIGFsbCByZXN1bHRzIGhhdmUgdGhlIHNhbWUgc2NvcmUgb2YgMVxuICAgICAgICBpZiAocXVlcnkgPT09IE1pbmlTZWFyY2gud2lsZGNhcmQgJiZcbiAgICAgICAgICAgIHNlYXJjaE9wdGlvbnMuYm9vc3REb2N1bWVudCA9PSBudWxsICYmXG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLnNlYXJjaE9wdGlvbnMuYm9vc3REb2N1bWVudCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgfVxuICAgICAgICByZXN1bHRzLnNvcnQoYnlTY29yZSk7XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUHJvdmlkZSBzdWdnZXN0aW9ucyBmb3IgdGhlIGdpdmVuIHNlYXJjaCBxdWVyeVxuICAgICAqXG4gICAgICogVGhlIHJlc3VsdCBpcyBhIGxpc3Qgb2Ygc3VnZ2VzdGVkIG1vZGlmaWVkIHNlYXJjaCBxdWVyaWVzLCBkZXJpdmVkIGZyb20gdGhlXG4gICAgICogZ2l2ZW4gc2VhcmNoIHF1ZXJ5LCBlYWNoIHdpdGggYSByZWxldmFuY2Ugc2NvcmUsIHNvcnRlZCBieSBkZXNjZW5kaW5nIHNjb3JlLlxuICAgICAqXG4gICAgICogQnkgZGVmYXVsdCwgaXQgdXNlcyB0aGUgc2FtZSBvcHRpb25zIHVzZWQgZm9yIHNlYXJjaCwgZXhjZXB0IHRoYXQgYnlcbiAgICAgKiBkZWZhdWx0IGl0IHBlcmZvcm1zIHByZWZpeCBzZWFyY2ggb24gdGhlIGxhc3QgdGVybSBvZiB0aGUgcXVlcnksIGFuZFxuICAgICAqIGNvbWJpbmUgdGVybXMgd2l0aCBgJ0FORCdgIChyZXF1aXJpbmcgYWxsIHF1ZXJ5IHRlcm1zIHRvIG1hdGNoKS4gQ3VzdG9tXG4gICAgICogb3B0aW9ucyBjYW4gYmUgcGFzc2VkIGFzIGEgc2Vjb25kIGFyZ3VtZW50LiBEZWZhdWx0cyBjYW4gYmUgY2hhbmdlZCB1cG9uXG4gICAgICogY2FsbGluZyB0aGUge0BsaW5rIE1pbmlTZWFyY2h9IGNvbnN0cnVjdG9yLCBieSBwYXNzaW5nIGFcbiAgICAgKiBgYXV0b1N1Z2dlc3RPcHRpb25zYCBvcHRpb24uXG4gICAgICpcbiAgICAgKiAjIyMgQmFzaWMgdXNhZ2U6XG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogLy8gR2V0IHN1Z2dlc3Rpb25zIGZvciAnbmV1cm8nOlxuICAgICAqIG1pbmlTZWFyY2guYXV0b1N1Z2dlc3QoJ25ldXJvJylcbiAgICAgKiAvLyA9PiBbIHsgc3VnZ2VzdGlvbjogJ25ldXJvbWFuY2VyJywgdGVybXM6IFsgJ25ldXJvbWFuY2VyJyBdLCBzY29yZTogMC40NjI0MCB9IF1cbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqICMjIyBNdWx0aXBsZSB3b3JkczpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiAvLyBHZXQgc3VnZ2VzdGlvbnMgZm9yICd6ZW4gYXInOlxuICAgICAqIG1pbmlTZWFyY2guYXV0b1N1Z2dlc3QoJ3plbiBhcicpXG4gICAgICogLy8gPT4gW1xuICAgICAqIC8vICB7IHN1Z2dlc3Rpb246ICd6ZW4gYXJjaGVyeSBhcnQnLCB0ZXJtczogWyAnemVuJywgJ2FyY2hlcnknLCAnYXJ0JyBdLCBzY29yZTogMS43MzMzMiB9LFxuICAgICAqIC8vICB7IHN1Z2dlc3Rpb246ICd6ZW4gYXJ0JywgdGVybXM6IFsgJ3plbicsICdhcnQnIF0sIHNjb3JlOiAxLjIxMzEzIH1cbiAgICAgKiAvLyBdXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiAjIyMgRnV6enkgc3VnZ2VzdGlvbnM6XG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogLy8gQ29ycmVjdCBzcGVsbGluZyBtaXN0YWtlcyB1c2luZyBmdXp6eSBzZWFyY2g6XG4gICAgICogbWluaVNlYXJjaC5hdXRvU3VnZ2VzdCgnbmVyb21hbmNlcicsIHsgZnV6enk6IDAuMiB9KVxuICAgICAqIC8vID0+IFsgeyBzdWdnZXN0aW9uOiAnbmV1cm9tYW5jZXInLCB0ZXJtczogWyAnbmV1cm9tYW5jZXInIF0sIHNjb3JlOiAxLjAzOTk4IH0gXVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogIyMjIEZpbHRlcmluZzpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiAvLyBHZXQgc3VnZ2VzdGlvbnMgZm9yICd6ZW4gYXInLCBidXQgb25seSB3aXRoaW4gdGhlICdmaWN0aW9uJyBjYXRlZ29yeVxuICAgICAqIC8vIChhc3N1bWluZyB0aGF0ICdjYXRlZ29yeScgaXMgYSBzdG9yZWQgZmllbGQpOlxuICAgICAqIG1pbmlTZWFyY2guYXV0b1N1Z2dlc3QoJ3plbiBhcicsIHtcbiAgICAgKiAgIGZpbHRlcjogKHJlc3VsdCkgPT4gcmVzdWx0LmNhdGVnb3J5ID09PSAnZmljdGlvbidcbiAgICAgKiB9KVxuICAgICAqIC8vID0+IFtcbiAgICAgKiAvLyAgeyBzdWdnZXN0aW9uOiAnemVuIGFyY2hlcnkgYXJ0JywgdGVybXM6IFsgJ3plbicsICdhcmNoZXJ5JywgJ2FydCcgXSwgc2NvcmU6IDEuNzMzMzIgfSxcbiAgICAgKiAvLyAgeyBzdWdnZXN0aW9uOiAnemVuIGFydCcsIHRlcm1zOiBbICd6ZW4nLCAnYXJ0JyBdLCBzY29yZTogMS4yMTMxMyB9XG4gICAgICogLy8gXVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogQHBhcmFtIHF1ZXJ5U3RyaW5nICBRdWVyeSBzdHJpbmcgdG8gYmUgZXhwYW5kZWQgaW50byBzdWdnZXN0aW9uc1xuICAgICAqIEBwYXJhbSBvcHRpb25zICBTZWFyY2ggb3B0aW9ucy4gVGhlIHN1cHBvcnRlZCBvcHRpb25zIGFuZCBkZWZhdWx0IHZhbHVlc1xuICAgICAqIGFyZSB0aGUgc2FtZSBhcyBmb3IgdGhlIHtAbGluayBNaW5pU2VhcmNoI3NlYXJjaH0gbWV0aG9kLCBleGNlcHQgdGhhdCBieVxuICAgICAqIGRlZmF1bHQgcHJlZml4IHNlYXJjaCBpcyBwZXJmb3JtZWQgb24gdGhlIGxhc3QgdGVybSBpbiB0aGUgcXVlcnksIGFuZCB0ZXJtc1xuICAgICAqIGFyZSBjb21iaW5lZCB3aXRoIGAnQU5EJ2AuXG4gICAgICogQHJldHVybiAgQSBzb3J0ZWQgYXJyYXkgb2Ygc3VnZ2VzdGlvbnMgc29ydGVkIGJ5IHJlbGV2YW5jZSBzY29yZS5cbiAgICAgKi9cbiAgICBNaW5pU2VhcmNoLnByb3RvdHlwZS5hdXRvU3VnZ2VzdCA9IGZ1bmN0aW9uIChxdWVyeVN0cmluZywgb3B0aW9ucykge1xuICAgICAgICB2YXIgZV8xNCwgX2EsIGVfMTUsIF9iO1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgICAgICBvcHRpb25zID0gX19hc3NpZ24oX19hc3NpZ24oe30sIHRoaXMuX29wdGlvbnMuYXV0b1N1Z2dlc3RPcHRpb25zKSwgb3B0aW9ucyk7XG4gICAgICAgIHZhciBzdWdnZXN0aW9ucyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIF9jID0gX192YWx1ZXModGhpcy5zZWFyY2gocXVlcnlTdHJpbmcsIG9wdGlvbnMpKSwgX2QgPSBfYy5uZXh0KCk7ICFfZC5kb25lOyBfZCA9IF9jLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciBfZSA9IF9kLnZhbHVlLCBzY29yZSA9IF9lLnNjb3JlLCB0ZXJtcyA9IF9lLnRlcm1zO1xuICAgICAgICAgICAgICAgIHZhciBwaHJhc2UgPSB0ZXJtcy5qb2luKCcgJyk7XG4gICAgICAgICAgICAgICAgdmFyIHN1Z2dlc3Rpb24gPSBzdWdnZXN0aW9ucy5nZXQocGhyYXNlKTtcbiAgICAgICAgICAgICAgICBpZiAoc3VnZ2VzdGlvbiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb24uc2NvcmUgKz0gc2NvcmU7XG4gICAgICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb24uY291bnQgKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb25zLnNldChwaHJhc2UsIHsgc2NvcmU6IHNjb3JlLCB0ZXJtczogdGVybXMsIGNvdW50OiAxIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV8xNF8xKSB7IGVfMTQgPSB7IGVycm9yOiBlXzE0XzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKF9kICYmICFfZC5kb25lICYmIChfYSA9IF9jLnJldHVybikpIF9hLmNhbGwoX2MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzE0KSB0aHJvdyBlXzE0LmVycm9yOyB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIHN1Z2dlc3Rpb25zXzEgPSBfX3ZhbHVlcyhzdWdnZXN0aW9ucyksIHN1Z2dlc3Rpb25zXzFfMSA9IHN1Z2dlc3Rpb25zXzEubmV4dCgpOyAhc3VnZ2VzdGlvbnNfMV8xLmRvbmU7IHN1Z2dlc3Rpb25zXzFfMSA9IHN1Z2dlc3Rpb25zXzEubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9mID0gX19yZWFkKHN1Z2dlc3Rpb25zXzFfMS52YWx1ZSwgMiksIHN1Z2dlc3Rpb24gPSBfZlswXSwgX2cgPSBfZlsxXSwgc2NvcmUgPSBfZy5zY29yZSwgdGVybXMgPSBfZy50ZXJtcywgY291bnQgPSBfZy5jb3VudDtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goeyBzdWdnZXN0aW9uOiBzdWdnZXN0aW9uLCB0ZXJtczogdGVybXMsIHNjb3JlOiBzY29yZSAvIGNvdW50IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlXzE1XzEpIHsgZV8xNSA9IHsgZXJyb3I6IGVfMTVfMSB9OyB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoc3VnZ2VzdGlvbnNfMV8xICYmICFzdWdnZXN0aW9uc18xXzEuZG9uZSAmJiAoX2IgPSBzdWdnZXN0aW9uc18xLnJldHVybikpIF9iLmNhbGwoc3VnZ2VzdGlvbnNfMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMTUpIHRocm93IGVfMTUuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgICAgICByZXN1bHRzLnNvcnQoYnlTY29yZSk7XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1pbmlTZWFyY2gucHJvdG90eXBlLCBcImRvY3VtZW50Q291bnRcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogVG90YWwgbnVtYmVyIG9mIGRvY3VtZW50cyBhdmFpbGFibGUgdG8gc2VhcmNoXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kb2N1bWVudENvdW50O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1pbmlTZWFyY2gucHJvdG90eXBlLCBcInRlcm1Db3VudFwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBOdW1iZXIgb2YgdGVybXMgaW4gdGhlIGluZGV4XG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbmRleC5zaXplO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogRGVzZXJpYWxpemVzIGEgSlNPTiBpbmRleCAoc2VyaWFsaXplZCB3aXRoIGBKU09OLnN0cmluZ2lmeShtaW5pU2VhcmNoKWApXG4gICAgICogYW5kIGluc3RhbnRpYXRlcyBhIE1pbmlTZWFyY2ggaW5zdGFuY2UuIEl0IHNob3VsZCBiZSBnaXZlbiB0aGUgc2FtZSBvcHRpb25zXG4gICAgICogb3JpZ2luYWxseSB1c2VkIHdoZW4gc2VyaWFsaXppbmcgdGhlIGluZGV4LlxuICAgICAqXG4gICAgICogIyMjIFVzYWdlOlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIC8vIElmIHRoZSBpbmRleCB3YXMgc2VyaWFsaXplZCB3aXRoOlxuICAgICAqIGxldCBtaW5pU2VhcmNoID0gbmV3IE1pbmlTZWFyY2goeyBmaWVsZHM6IFsndGl0bGUnLCAndGV4dCddIH0pXG4gICAgICogbWluaVNlYXJjaC5hZGRBbGwoZG9jdW1lbnRzKVxuICAgICAqXG4gICAgICogY29uc3QganNvbiA9IEpTT04uc3RyaW5naWZ5KG1pbmlTZWFyY2gpXG4gICAgICogLy8gSXQgY2FuIGxhdGVyIGJlIGRlc2VyaWFsaXplZCBsaWtlIHRoaXM6XG4gICAgICogbWluaVNlYXJjaCA9IE1pbmlTZWFyY2gubG9hZEpTT04oanNvbiwgeyBmaWVsZHM6IFsndGl0bGUnLCAndGV4dCddIH0pXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAcGFyYW0ganNvbiAgSlNPTi1zZXJpYWxpemVkIGluZGV4XG4gICAgICogQHBhcmFtIG9wdGlvbnMgIGNvbmZpZ3VyYXRpb24gb3B0aW9ucywgc2FtZSBhcyB0aGUgY29uc3RydWN0b3JcbiAgICAgKiBAcmV0dXJuIEFuIGluc3RhbmNlIG9mIE1pbmlTZWFyY2ggZGVzZXJpYWxpemVkIGZyb20gdGhlIGdpdmVuIEpTT04uXG4gICAgICovXG4gICAgTWluaVNlYXJjaC5sb2FkSlNPTiA9IGZ1bmN0aW9uIChqc29uLCBvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWluaVNlYXJjaDogbG9hZEpTT04gc2hvdWxkIGJlIGdpdmVuIHRoZSBzYW1lIG9wdGlvbnMgdXNlZCB3aGVuIHNlcmlhbGl6aW5nIHRoZSBpbmRleCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRKUyhKU09OLnBhcnNlKGpzb24pLCBvcHRpb25zKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgdmFsdWUgb2YgYW4gb3B0aW9uLiBJdCB3aWxsIHRocm93IGFuIGVycm9yIGlmIG5vIG9wdGlvblxuICAgICAqIHdpdGggdGhlIGdpdmVuIG5hbWUgZXhpc3RzLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbk5hbWUgIE5hbWUgb2YgdGhlIG9wdGlvblxuICAgICAqIEByZXR1cm4gVGhlIGRlZmF1bHQgdmFsdWUgb2YgdGhlIGdpdmVuIG9wdGlvblxuICAgICAqXG4gICAgICogIyMjIFVzYWdlOlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIC8vIEdldCBkZWZhdWx0IHRva2VuaXplclxuICAgICAqIE1pbmlTZWFyY2guZ2V0RGVmYXVsdCgndG9rZW5pemUnKVxuICAgICAqXG4gICAgICogLy8gR2V0IGRlZmF1bHQgdGVybSBwcm9jZXNzb3JcbiAgICAgKiBNaW5pU2VhcmNoLmdldERlZmF1bHQoJ3Byb2Nlc3NUZXJtJylcbiAgICAgKlxuICAgICAqIC8vIFVua25vd24gb3B0aW9ucyB3aWxsIHRocm93IGFuIGVycm9yXG4gICAgICogTWluaVNlYXJjaC5nZXREZWZhdWx0KCdub3RFeGlzdGluZycpXG4gICAgICogLy8gPT4gdGhyb3dzICdNaW5pU2VhcmNoOiB1bmtub3duIG9wdGlvbiBcIm5vdEV4aXN0aW5nXCInXG4gICAgICogYGBgXG4gICAgICovXG4gICAgTWluaVNlYXJjaC5nZXREZWZhdWx0ID0gZnVuY3Rpb24gKG9wdGlvbk5hbWUpIHtcbiAgICAgICAgaWYgKGRlZmF1bHRPcHRpb25zLmhhc093blByb3BlcnR5KG9wdGlvbk5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0T3duUHJvcGVydHkoZGVmYXVsdE9wdGlvbnMsIG9wdGlvbk5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWluaVNlYXJjaDogdW5rbm93biBvcHRpb24gXFxcIlwiLmNvbmNhdChvcHRpb25OYW1lLCBcIlxcXCJcIikpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgTWluaVNlYXJjaC5sb2FkSlMgPSBmdW5jdGlvbiAoanMsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGVfMTYsIF9hLCBlXzE3LCBfYiwgZV8xOCwgX2M7XG4gICAgICAgIHZhciBpbmRleCA9IGpzLmluZGV4LCBkb2N1bWVudENvdW50ID0ganMuZG9jdW1lbnRDb3VudCwgbmV4dElkID0ganMubmV4dElkLCBkb2N1bWVudElkcyA9IGpzLmRvY3VtZW50SWRzLCBmaWVsZElkcyA9IGpzLmZpZWxkSWRzLCBmaWVsZExlbmd0aCA9IGpzLmZpZWxkTGVuZ3RoLCBhdmVyYWdlRmllbGRMZW5ndGggPSBqcy5hdmVyYWdlRmllbGRMZW5ndGgsIHN0b3JlZEZpZWxkcyA9IGpzLnN0b3JlZEZpZWxkcywgZGlydENvdW50ID0ganMuZGlydENvdW50LCBzZXJpYWxpemF0aW9uVmVyc2lvbiA9IGpzLnNlcmlhbGl6YXRpb25WZXJzaW9uO1xuICAgICAgICBpZiAoc2VyaWFsaXphdGlvblZlcnNpb24gIT09IDEgJiYgc2VyaWFsaXphdGlvblZlcnNpb24gIT09IDIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWluaVNlYXJjaDogY2Fubm90IGRlc2VyaWFsaXplIGFuIGluZGV4IGNyZWF0ZWQgd2l0aCBhbiBpbmNvbXBhdGlibGUgdmVyc2lvbicpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBtaW5pU2VhcmNoID0gbmV3IE1pbmlTZWFyY2gob3B0aW9ucyk7XG4gICAgICAgIG1pbmlTZWFyY2guX2RvY3VtZW50Q291bnQgPSBkb2N1bWVudENvdW50O1xuICAgICAgICBtaW5pU2VhcmNoLl9uZXh0SWQgPSBuZXh0SWQ7XG4gICAgICAgIG1pbmlTZWFyY2guX2RvY3VtZW50SWRzID0gb2JqZWN0VG9OdW1lcmljTWFwKGRvY3VtZW50SWRzKTtcbiAgICAgICAgbWluaVNlYXJjaC5faWRUb1Nob3J0SWQgPSBuZXcgTWFwKCk7XG4gICAgICAgIG1pbmlTZWFyY2guX2ZpZWxkSWRzID0gZmllbGRJZHM7XG4gICAgICAgIG1pbmlTZWFyY2guX2ZpZWxkTGVuZ3RoID0gb2JqZWN0VG9OdW1lcmljTWFwKGZpZWxkTGVuZ3RoKTtcbiAgICAgICAgbWluaVNlYXJjaC5fYXZnRmllbGRMZW5ndGggPSBhdmVyYWdlRmllbGRMZW5ndGg7XG4gICAgICAgIG1pbmlTZWFyY2guX3N0b3JlZEZpZWxkcyA9IG9iamVjdFRvTnVtZXJpY01hcChzdG9yZWRGaWVsZHMpO1xuICAgICAgICBtaW5pU2VhcmNoLl9kaXJ0Q291bnQgPSBkaXJ0Q291bnQgfHwgMDtcbiAgICAgICAgbWluaVNlYXJjaC5faW5kZXggPSBuZXcgU2VhcmNoYWJsZU1hcCgpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2QgPSBfX3ZhbHVlcyhtaW5pU2VhcmNoLl9kb2N1bWVudElkcyksIF9lID0gX2QubmV4dCgpOyAhX2UuZG9uZTsgX2UgPSBfZC5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2YgPSBfX3JlYWQoX2UudmFsdWUsIDIpLCBzaG9ydElkID0gX2ZbMF0sIGlkID0gX2ZbMV07XG4gICAgICAgICAgICAgICAgbWluaVNlYXJjaC5faWRUb1Nob3J0SWQuc2V0KGlkLCBzaG9ydElkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV8xNl8xKSB7IGVfMTYgPSB7IGVycm9yOiBlXzE2XzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKF9lICYmICFfZS5kb25lICYmIChfYSA9IF9kLnJldHVybikpIF9hLmNhbGwoX2QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzE2KSB0aHJvdyBlXzE2LmVycm9yOyB9XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIGluZGV4XzEgPSBfX3ZhbHVlcyhpbmRleCksIGluZGV4XzFfMSA9IGluZGV4XzEubmV4dCgpOyAhaW5kZXhfMV8xLmRvbmU7IGluZGV4XzFfMSA9IGluZGV4XzEubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9nID0gX19yZWFkKGluZGV4XzFfMS52YWx1ZSwgMiksIHRlcm0gPSBfZ1swXSwgZGF0YSA9IF9nWzFdO1xuICAgICAgICAgICAgICAgIHZhciBkYXRhTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9oID0gKGVfMTggPSB2b2lkIDAsIF9fdmFsdWVzKE9iamVjdC5rZXlzKGRhdGEpKSksIF9qID0gX2gubmV4dCgpOyAhX2ouZG9uZTsgX2ogPSBfaC5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWVsZElkID0gX2oudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXhFbnRyeSA9IGRhdGFbZmllbGRJZF07XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBWZXJzaW9uIDEgdXNlZCB0byBuZXN0IHRoZSBpbmRleCBlbnRyeSBpbnNpZGUgYSBmaWVsZCBjYWxsZWQgZHNcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZXJpYWxpemF0aW9uVmVyc2lvbiA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4RW50cnkgPSBpbmRleEVudHJ5LmRzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YU1hcC5zZXQocGFyc2VJbnQoZmllbGRJZCwgMTApLCBvYmplY3RUb051bWVyaWNNYXAoaW5kZXhFbnRyeSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlXzE4XzEpIHsgZV8xOCA9IHsgZXJyb3I6IGVfMThfMSB9OyB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2ogJiYgIV9qLmRvbmUgJiYgKF9jID0gX2gucmV0dXJuKSkgX2MuY2FsbChfaCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzE4KSB0aHJvdyBlXzE4LmVycm9yOyB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG1pbmlTZWFyY2guX2luZGV4LnNldCh0ZXJtLCBkYXRhTWFwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV8xN18xKSB7IGVfMTcgPSB7IGVycm9yOiBlXzE3XzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4XzFfMSAmJiAhaW5kZXhfMV8xLmRvbmUgJiYgKF9iID0gaW5kZXhfMS5yZXR1cm4pKSBfYi5jYWxsKGluZGV4XzEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzE3KSB0aHJvdyBlXzE3LmVycm9yOyB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1pbmlTZWFyY2g7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgTWluaVNlYXJjaC5wcm90b3R5cGUuZXhlY3V0ZVF1ZXJ5ID0gZnVuY3Rpb24gKHF1ZXJ5LCBzZWFyY2hPcHRpb25zKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmIChzZWFyY2hPcHRpb25zID09PSB2b2lkIDApIHsgc2VhcmNoT3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIGlmIChxdWVyeSA9PT0gTWluaVNlYXJjaC53aWxkY2FyZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZVdpbGRjYXJkUXVlcnkoc2VhcmNoT3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBxdWVyeSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHZhciBvcHRpb25zXzEgPSBfX2Fzc2lnbihfX2Fzc2lnbihfX2Fzc2lnbih7fSwgc2VhcmNoT3B0aW9ucyksIHF1ZXJ5KSwgeyBxdWVyaWVzOiB1bmRlZmluZWQgfSk7XG4gICAgICAgICAgICB2YXIgcmVzdWx0c18xID0gcXVlcnkucXVlcmllcy5tYXAoZnVuY3Rpb24gKHN1YnF1ZXJ5KSB7IHJldHVybiBfdGhpcy5leGVjdXRlUXVlcnkoc3VicXVlcnksIG9wdGlvbnNfMSk7IH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29tYmluZVJlc3VsdHMocmVzdWx0c18xLCBvcHRpb25zXzEuY29tYmluZVdpdGgpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBfYSA9IHRoaXMuX29wdGlvbnMsIHRva2VuaXplID0gX2EudG9rZW5pemUsIHByb2Nlc3NUZXJtID0gX2EucHJvY2Vzc1Rlcm0sIGdsb2JhbFNlYXJjaE9wdGlvbnMgPSBfYS5zZWFyY2hPcHRpb25zO1xuICAgICAgICB2YXIgb3B0aW9ucyA9IF9fYXNzaWduKF9fYXNzaWduKHsgdG9rZW5pemU6IHRva2VuaXplLCBwcm9jZXNzVGVybTogcHJvY2Vzc1Rlcm0gfSwgZ2xvYmFsU2VhcmNoT3B0aW9ucyksIHNlYXJjaE9wdGlvbnMpO1xuICAgICAgICB2YXIgc2VhcmNoVG9rZW5pemUgPSBvcHRpb25zLnRva2VuaXplLCBzZWFyY2hQcm9jZXNzVGVybSA9IG9wdGlvbnMucHJvY2Vzc1Rlcm07XG4gICAgICAgIHZhciB0ZXJtcyA9IHNlYXJjaFRva2VuaXplKHF1ZXJ5KVxuICAgICAgICAgICAgLmZsYXRNYXAoZnVuY3Rpb24gKHRlcm0pIHsgcmV0dXJuIHNlYXJjaFByb2Nlc3NUZXJtKHRlcm0pOyB9KVxuICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAodGVybSkgeyByZXR1cm4gISF0ZXJtOyB9KTtcbiAgICAgICAgdmFyIHF1ZXJpZXMgPSB0ZXJtcy5tYXAodGVybVRvUXVlcnlTcGVjKG9wdGlvbnMpKTtcbiAgICAgICAgdmFyIHJlc3VsdHMgPSBxdWVyaWVzLm1hcChmdW5jdGlvbiAocXVlcnkpIHsgcmV0dXJuIF90aGlzLmV4ZWN1dGVRdWVyeVNwZWMocXVlcnksIG9wdGlvbnMpOyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tYmluZVJlc3VsdHMocmVzdWx0cywgb3B0aW9ucy5jb21iaW5lV2l0aCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgTWluaVNlYXJjaC5wcm90b3R5cGUuZXhlY3V0ZVF1ZXJ5U3BlYyA9IGZ1bmN0aW9uIChxdWVyeSwgc2VhcmNoT3B0aW9ucykge1xuICAgICAgICB2YXIgZV8xOSwgX2EsIGVfMjAsIF9iO1xuICAgICAgICB2YXIgb3B0aW9ucyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCB0aGlzLl9vcHRpb25zLnNlYXJjaE9wdGlvbnMpLCBzZWFyY2hPcHRpb25zKTtcbiAgICAgICAgdmFyIGJvb3N0cyA9IChvcHRpb25zLmZpZWxkcyB8fCB0aGlzLl9vcHRpb25zLmZpZWxkcykucmVkdWNlKGZ1bmN0aW9uIChib29zdHMsIGZpZWxkKSB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICByZXR1cm4gKF9fYXNzaWduKF9fYXNzaWduKHt9LCBib29zdHMpLCAoX2EgPSB7fSwgX2FbZmllbGRdID0gZ2V0T3duUHJvcGVydHkob3B0aW9ucy5ib29zdCwgZmllbGQpIHx8IDEsIF9hKSkpO1xuICAgICAgICB9LCB7fSk7XG4gICAgICAgIHZhciBib29zdERvY3VtZW50ID0gb3B0aW9ucy5ib29zdERvY3VtZW50LCB3ZWlnaHRzID0gb3B0aW9ucy53ZWlnaHRzLCBtYXhGdXp6eSA9IG9wdGlvbnMubWF4RnV6enksIGJtMjVwYXJhbXMgPSBvcHRpb25zLmJtMjU7XG4gICAgICAgIHZhciBfYyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBkZWZhdWx0U2VhcmNoT3B0aW9ucy53ZWlnaHRzKSwgd2VpZ2h0cyksIGZ1enp5V2VpZ2h0ID0gX2MuZnV6enksIHByZWZpeFdlaWdodCA9IF9jLnByZWZpeDtcbiAgICAgICAgdmFyIGRhdGEgPSB0aGlzLl9pbmRleC5nZXQocXVlcnkudGVybSk7XG4gICAgICAgIHZhciByZXN1bHRzID0gdGhpcy50ZXJtUmVzdWx0cyhxdWVyeS50ZXJtLCBxdWVyeS50ZXJtLCAxLCBkYXRhLCBib29zdHMsIGJvb3N0RG9jdW1lbnQsIGJtMjVwYXJhbXMpO1xuICAgICAgICB2YXIgcHJlZml4TWF0Y2hlcztcbiAgICAgICAgdmFyIGZ1enp5TWF0Y2hlcztcbiAgICAgICAgaWYgKHF1ZXJ5LnByZWZpeCkge1xuICAgICAgICAgICAgcHJlZml4TWF0Y2hlcyA9IHRoaXMuX2luZGV4LmF0UHJlZml4KHF1ZXJ5LnRlcm0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChxdWVyeS5mdXp6eSkge1xuICAgICAgICAgICAgdmFyIGZ1enp5ID0gKHF1ZXJ5LmZ1enp5ID09PSB0cnVlKSA/IDAuMiA6IHF1ZXJ5LmZ1enp5O1xuICAgICAgICAgICAgdmFyIG1heERpc3RhbmNlID0gZnV6enkgPCAxID8gTWF0aC5taW4obWF4RnV6enksIE1hdGgucm91bmQocXVlcnkudGVybS5sZW5ndGggKiBmdXp6eSkpIDogZnV6enk7XG4gICAgICAgICAgICBpZiAobWF4RGlzdGFuY2UpXG4gICAgICAgICAgICAgICAgZnV6enlNYXRjaGVzID0gdGhpcy5faW5kZXguZnV6enlHZXQocXVlcnkudGVybSwgbWF4RGlzdGFuY2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcmVmaXhNYXRjaGVzKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHByZWZpeE1hdGNoZXNfMSA9IF9fdmFsdWVzKHByZWZpeE1hdGNoZXMpLCBwcmVmaXhNYXRjaGVzXzFfMSA9IHByZWZpeE1hdGNoZXNfMS5uZXh0KCk7ICFwcmVmaXhNYXRjaGVzXzFfMS5kb25lOyBwcmVmaXhNYXRjaGVzXzFfMSA9IHByZWZpeE1hdGNoZXNfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9kID0gX19yZWFkKHByZWZpeE1hdGNoZXNfMV8xLnZhbHVlLCAyKSwgdGVybSA9IF9kWzBdLCBkYXRhXzEgPSBfZFsxXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gdGVybS5sZW5ndGggLSBxdWVyeS50ZXJtLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH0gLy8gU2tpcCBleGFjdCBtYXRjaC5cbiAgICAgICAgICAgICAgICAgICAgLy8gRGVsZXRlIHRoZSB0ZXJtIGZyb20gZnV6enkgcmVzdWx0cyAoaWYgcHJlc2VudCkgaWYgaXQgaXMgYWxzbyBhXG4gICAgICAgICAgICAgICAgICAgIC8vIHByZWZpeCByZXN1bHQuIFRoaXMgZW50cnkgd2lsbCBhbHdheXMgYmUgc2NvcmVkIGFzIGEgcHJlZml4IHJlc3VsdC5cbiAgICAgICAgICAgICAgICAgICAgZnV6enlNYXRjaGVzID09PSBudWxsIHx8IGZ1enp5TWF0Y2hlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogZnV6enlNYXRjaGVzLmRlbGV0ZSh0ZXJtKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gV2VpZ2h0IGdyYWR1YWxseSBhcHByb2FjaGVzIDAgYXMgZGlzdGFuY2UgZ29lcyB0byBpbmZpbml0eSwgd2l0aCB0aGVcbiAgICAgICAgICAgICAgICAgICAgLy8gd2VpZ2h0IGZvciB0aGUgaHlwb3RoZXRpY2FsIGRpc3RhbmNlIDAgYmVpbmcgZXF1YWwgdG8gcHJlZml4V2VpZ2h0LlxuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgcmF0ZSBvZiBjaGFuZ2UgaXMgbXVjaCBsb3dlciB0aGFuIHRoYXQgb2YgZnV6enkgbWF0Y2hlcyB0b1xuICAgICAgICAgICAgICAgICAgICAvLyBhY2NvdW50IGZvciB0aGUgZmFjdCB0aGF0IHByZWZpeCBtYXRjaGVzIHN0YXkgbW9yZSByZWxldmFudCB0aGFuXG4gICAgICAgICAgICAgICAgICAgIC8vIGZ1enp5IG1hdGNoZXMgZm9yIGxvbmdlciBkaXN0YW5jZXMuXG4gICAgICAgICAgICAgICAgICAgIHZhciB3ZWlnaHQgPSBwcmVmaXhXZWlnaHQgKiB0ZXJtLmxlbmd0aCAvICh0ZXJtLmxlbmd0aCArIDAuMyAqIGRpc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXJtUmVzdWx0cyhxdWVyeS50ZXJtLCB0ZXJtLCB3ZWlnaHQsIGRhdGFfMSwgYm9vc3RzLCBib29zdERvY3VtZW50LCBibTI1cGFyYW1zLCByZXN1bHRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZV8xOV8xKSB7IGVfMTkgPSB7IGVycm9yOiBlXzE5XzEgfTsgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZWZpeE1hdGNoZXNfMV8xICYmICFwcmVmaXhNYXRjaGVzXzFfMS5kb25lICYmIChfYSA9IHByZWZpeE1hdGNoZXNfMS5yZXR1cm4pKSBfYS5jYWxsKHByZWZpeE1hdGNoZXNfMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xOSkgdGhyb3cgZV8xOS5lcnJvcjsgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChmdXp6eU1hdGNoZXMpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgX2UgPSBfX3ZhbHVlcyhmdXp6eU1hdGNoZXMua2V5cygpKSwgX2YgPSBfZS5uZXh0KCk7ICFfZi5kb25lOyBfZiA9IF9lLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGVybSA9IF9mLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgX2cgPSBfX3JlYWQoZnV6enlNYXRjaGVzLmdldCh0ZXJtKSwgMiksIGRhdGFfMiA9IF9nWzBdLCBkaXN0YW5jZSA9IF9nWzFdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWRpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfSAvLyBTa2lwIGV4YWN0IG1hdGNoLlxuICAgICAgICAgICAgICAgICAgICAvLyBXZWlnaHQgZ3JhZHVhbGx5IGFwcHJvYWNoZXMgMCBhcyBkaXN0YW5jZSBnb2VzIHRvIGluZmluaXR5LCB3aXRoIHRoZVxuICAgICAgICAgICAgICAgICAgICAvLyB3ZWlnaHQgZm9yIHRoZSBoeXBvdGhldGljYWwgZGlzdGFuY2UgMCBiZWluZyBlcXVhbCB0byBmdXp6eVdlaWdodC5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHdlaWdodCA9IGZ1enp5V2VpZ2h0ICogdGVybS5sZW5ndGggLyAodGVybS5sZW5ndGggKyBkaXN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVybVJlc3VsdHMocXVlcnkudGVybSwgdGVybSwgd2VpZ2h0LCBkYXRhXzIsIGJvb3N0cywgYm9vc3REb2N1bWVudCwgYm0yNXBhcmFtcywgcmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVfMjBfMSkgeyBlXzIwID0geyBlcnJvcjogZV8yMF8xIH07IH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfZiAmJiAhX2YuZG9uZSAmJiAoX2IgPSBfZS5yZXR1cm4pKSBfYi5jYWxsKF9lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzIwKSB0aHJvdyBlXzIwLmVycm9yOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgTWluaVNlYXJjaC5wcm90b3R5cGUuZXhlY3V0ZVdpbGRjYXJkUXVlcnkgPSBmdW5jdGlvbiAoc2VhcmNoT3B0aW9ucykge1xuICAgICAgICB2YXIgZV8yMSwgX2E7XG4gICAgICAgIHZhciByZXN1bHRzID0gbmV3IE1hcCgpO1xuICAgICAgICB2YXIgb3B0aW9ucyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCB0aGlzLl9vcHRpb25zLnNlYXJjaE9wdGlvbnMpLCBzZWFyY2hPcHRpb25zKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIF9iID0gX192YWx1ZXModGhpcy5fZG9jdW1lbnRJZHMpLCBfYyA9IF9iLm5leHQoKTsgIV9jLmRvbmU7IF9jID0gX2IubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9kID0gX19yZWFkKF9jLnZhbHVlLCAyKSwgc2hvcnRJZCA9IF9kWzBdLCBpZCA9IF9kWzFdO1xuICAgICAgICAgICAgICAgIHZhciBzY29yZSA9IG9wdGlvbnMuYm9vc3REb2N1bWVudCA/IG9wdGlvbnMuYm9vc3REb2N1bWVudChpZCwgJycsIHRoaXMuX3N0b3JlZEZpZWxkcy5nZXQoc2hvcnRJZCkpIDogMTtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnNldChzaG9ydElkLCB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3JlOiBzY29yZSxcbiAgICAgICAgICAgICAgICAgICAgdGVybXM6IFtdLFxuICAgICAgICAgICAgICAgICAgICBtYXRjaDoge31cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV8yMV8xKSB7IGVfMjEgPSB7IGVycm9yOiBlXzIxXzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKF9jICYmICFfYy5kb25lICYmIChfYSA9IF9iLnJldHVybikpIF9hLmNhbGwoX2IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzIxKSB0aHJvdyBlXzIxLmVycm9yOyB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgTWluaVNlYXJjaC5wcm90b3R5cGUuY29tYmluZVJlc3VsdHMgPSBmdW5jdGlvbiAocmVzdWx0cywgY29tYmluZVdpdGgpIHtcbiAgICAgICAgaWYgKGNvbWJpbmVXaXRoID09PSB2b2lkIDApIHsgY29tYmluZVdpdGggPSBPUjsgfVxuICAgICAgICBpZiAocmVzdWx0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTWFwKCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG9wZXJhdG9yID0gY29tYmluZVdpdGgudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdHMucmVkdWNlKGNvbWJpbmF0b3JzW29wZXJhdG9yXSkgfHwgbmV3IE1hcCgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQWxsb3dzIHNlcmlhbGl6YXRpb24gb2YgdGhlIGluZGV4IHRvIEpTT04sIHRvIHBvc3NpYmx5IHN0b3JlIGl0IGFuZCBsYXRlclxuICAgICAqIGRlc2VyaWFsaXplIGl0IHdpdGgge0BsaW5rIE1pbmlTZWFyY2gubG9hZEpTT059LlxuICAgICAqXG4gICAgICogTm9ybWFsbHkgb25lIGRvZXMgbm90IGRpcmVjdGx5IGNhbGwgdGhpcyBtZXRob2QsIGJ1dCByYXRoZXIgY2FsbCB0aGVcbiAgICAgKiBzdGFuZGFyZCBKYXZhU2NyaXB0IGBKU09OLnN0cmluZ2lmeSgpYCBwYXNzaW5nIHRoZSB7QGxpbmsgTWluaVNlYXJjaH1cbiAgICAgKiBpbnN0YW5jZSwgYW5kIEphdmFTY3JpcHQgd2lsbCBpbnRlcm5hbGx5IGNhbGwgdGhpcyBtZXRob2QuIFVwb25cbiAgICAgKiBkZXNlcmlhbGl6YXRpb24sIG9uZSBtdXN0IHBhc3MgdG8ge0BsaW5rIE1pbmlTZWFyY2gubG9hZEpTT059IHRoZSBzYW1lXG4gICAgICogb3B0aW9ucyB1c2VkIHRvIGNyZWF0ZSB0aGUgb3JpZ2luYWwgaW5zdGFuY2UgdGhhdCB3YXMgc2VyaWFsaXplZC5cbiAgICAgKlxuICAgICAqICMjIyBVc2FnZTpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiAvLyBTZXJpYWxpemUgdGhlIGluZGV4OlxuICAgICAqIGxldCBtaW5pU2VhcmNoID0gbmV3IE1pbmlTZWFyY2goeyBmaWVsZHM6IFsndGl0bGUnLCAndGV4dCddIH0pXG4gICAgICogbWluaVNlYXJjaC5hZGRBbGwoZG9jdW1lbnRzKVxuICAgICAqIGNvbnN0IGpzb24gPSBKU09OLnN0cmluZ2lmeShtaW5pU2VhcmNoKVxuICAgICAqXG4gICAgICogLy8gTGF0ZXIsIHRvIGRlc2VyaWFsaXplIGl0OlxuICAgICAqIG1pbmlTZWFyY2ggPSBNaW5pU2VhcmNoLmxvYWRKU09OKGpzb24sIHsgZmllbGRzOiBbJ3RpdGxlJywgJ3RleHQnXSB9KVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogQHJldHVybiBBIHBsYWluLW9iamVjdCBzZXJpYWxpemFibGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIHNlYXJjaCBpbmRleC5cbiAgICAgKi9cbiAgICBNaW5pU2VhcmNoLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlXzIyLCBfYSwgZV8yMywgX2I7XG4gICAgICAgIHZhciBpbmRleCA9IFtdO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2MgPSBfX3ZhbHVlcyh0aGlzLl9pbmRleCksIF9kID0gX2MubmV4dCgpOyAhX2QuZG9uZTsgX2QgPSBfYy5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2UgPSBfX3JlYWQoX2QudmFsdWUsIDIpLCB0ZXJtID0gX2VbMF0sIGZpZWxkSW5kZXggPSBfZVsxXTtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHt9O1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGZpZWxkSW5kZXhfMiA9IChlXzIzID0gdm9pZCAwLCBfX3ZhbHVlcyhmaWVsZEluZGV4KSksIGZpZWxkSW5kZXhfMl8xID0gZmllbGRJbmRleF8yLm5leHQoKTsgIWZpZWxkSW5kZXhfMl8xLmRvbmU7IGZpZWxkSW5kZXhfMl8xID0gZmllbGRJbmRleF8yLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9mID0gX19yZWFkKGZpZWxkSW5kZXhfMl8xLnZhbHVlLCAyKSwgZmllbGRJZCA9IF9mWzBdLCBmcmVxcyA9IF9mWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtmaWVsZElkXSA9IE9iamVjdC5mcm9tRW50cmllcyhmcmVxcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVfMjNfMSkgeyBlXzIzID0geyBlcnJvcjogZV8yM18xIH07IH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWVsZEluZGV4XzJfMSAmJiAhZmllbGRJbmRleF8yXzEuZG9uZSAmJiAoX2IgPSBmaWVsZEluZGV4XzIucmV0dXJuKSkgX2IuY2FsbChmaWVsZEluZGV4XzIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8yMykgdGhyb3cgZV8yMy5lcnJvcjsgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpbmRleC5wdXNoKFt0ZXJtLCBkYXRhXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfMjJfMSkgeyBlXzIyID0geyBlcnJvcjogZV8yMl8xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChfZCAmJiAhX2QuZG9uZSAmJiAoX2EgPSBfYy5yZXR1cm4pKSBfYS5jYWxsKF9jKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8yMikgdGhyb3cgZV8yMi5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkb2N1bWVudENvdW50OiB0aGlzLl9kb2N1bWVudENvdW50LFxuICAgICAgICAgICAgbmV4dElkOiB0aGlzLl9uZXh0SWQsXG4gICAgICAgICAgICBkb2N1bWVudElkczogT2JqZWN0LmZyb21FbnRyaWVzKHRoaXMuX2RvY3VtZW50SWRzKSxcbiAgICAgICAgICAgIGZpZWxkSWRzOiB0aGlzLl9maWVsZElkcyxcbiAgICAgICAgICAgIGZpZWxkTGVuZ3RoOiBPYmplY3QuZnJvbUVudHJpZXModGhpcy5fZmllbGRMZW5ndGgpLFxuICAgICAgICAgICAgYXZlcmFnZUZpZWxkTGVuZ3RoOiB0aGlzLl9hdmdGaWVsZExlbmd0aCxcbiAgICAgICAgICAgIHN0b3JlZEZpZWxkczogT2JqZWN0LmZyb21FbnRyaWVzKHRoaXMuX3N0b3JlZEZpZWxkcyksXG4gICAgICAgICAgICBkaXJ0Q291bnQ6IHRoaXMuX2RpcnRDb3VudCxcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIHNlcmlhbGl6YXRpb25WZXJzaW9uOiAyXG4gICAgICAgIH07XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgTWluaVNlYXJjaC5wcm90b3R5cGUudGVybVJlc3VsdHMgPSBmdW5jdGlvbiAoc291cmNlVGVybSwgZGVyaXZlZFRlcm0sIHRlcm1XZWlnaHQsIGZpZWxkVGVybURhdGEsIGZpZWxkQm9vc3RzLCBib29zdERvY3VtZW50Rm4sIGJtMjVwYXJhbXMsIHJlc3VsdHMpIHtcbiAgICAgICAgdmFyIGVfMjQsIF9hLCBlXzI1LCBfYiwgX2M7XG4gICAgICAgIGlmIChyZXN1bHRzID09PSB2b2lkIDApIHsgcmVzdWx0cyA9IG5ldyBNYXAoKTsgfVxuICAgICAgICBpZiAoZmllbGRUZXJtRGF0YSA9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfZCA9IF9fdmFsdWVzKE9iamVjdC5rZXlzKGZpZWxkQm9vc3RzKSksIF9lID0gX2QubmV4dCgpOyAhX2UuZG9uZTsgX2UgPSBfZC5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmllbGQgPSBfZS52YWx1ZTtcbiAgICAgICAgICAgICAgICB2YXIgZmllbGRCb29zdCA9IGZpZWxkQm9vc3RzW2ZpZWxkXTtcbiAgICAgICAgICAgICAgICB2YXIgZmllbGRJZCA9IHRoaXMuX2ZpZWxkSWRzW2ZpZWxkXTtcbiAgICAgICAgICAgICAgICB2YXIgZmllbGRUZXJtRnJlcXMgPSBmaWVsZFRlcm1EYXRhLmdldChmaWVsZElkKTtcbiAgICAgICAgICAgICAgICBpZiAoZmllbGRUZXJtRnJlcXMgPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgdmFyIG1hdGNoaW5nRmllbGRzID0gZmllbGRUZXJtRnJlcXMuc2l6ZTtcbiAgICAgICAgICAgICAgICB2YXIgYXZnRmllbGRMZW5ndGggPSB0aGlzLl9hdmdGaWVsZExlbmd0aFtmaWVsZElkXTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfZiA9IChlXzI1ID0gdm9pZCAwLCBfX3ZhbHVlcyhmaWVsZFRlcm1GcmVxcy5rZXlzKCkpKSwgX2cgPSBfZi5uZXh0KCk7ICFfZy5kb25lOyBfZyA9IF9mLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRvY0lkID0gX2cudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2RvY3VtZW50SWRzLmhhcyhkb2NJZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVRlcm0oZmllbGRJZCwgZG9jSWQsIGRlcml2ZWRUZXJtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGluZ0ZpZWxkcyAtPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRvY0Jvb3N0ID0gYm9vc3REb2N1bWVudEZuID8gYm9vc3REb2N1bWVudEZuKHRoaXMuX2RvY3VtZW50SWRzLmdldChkb2NJZCksIGRlcml2ZWRUZXJtLCB0aGlzLl9zdG9yZWRGaWVsZHMuZ2V0KGRvY0lkKSkgOiAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkb2NCb29zdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ZXJtRnJlcSA9IGZpZWxkVGVybUZyZXFzLmdldChkb2NJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmllbGRMZW5ndGggPSB0aGlzLl9maWVsZExlbmd0aC5nZXQoZG9jSWQpW2ZpZWxkSWRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTk9URTogVGhlIHRvdGFsIG51bWJlciBvZiBmaWVsZHMgaXMgc2V0IHRvIHRoZSBudW1iZXIgb2YgZG9jdW1lbnRzXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBgdGhpcy5fZG9jdW1lbnRDb3VudGAuIEl0IGNvdWxkIGFsc28gbWFrZSBzZW5zZSB0byB1c2UgdGhlIG51bWJlciBvZlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZG9jdW1lbnRzIHdoZXJlIHRoZSBjdXJyZW50IGZpZWxkIGlzIG5vbi1ibGFuayBhcyBhIG5vcm1hbGl6YXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZhY3Rvci4gVGhpcyB3aWxsIG1ha2UgYSBkaWZmZXJlbmNlIGluIHNjb3JpbmcgaWYgdGhlIGZpZWxkIGlzIHJhcmVseVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJlc2VudC4gVGhpcyBpcyBjdXJyZW50bHkgbm90IHN1cHBvcnRlZCwgYW5kIG1heSByZXF1aXJlIGZ1cnRoZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFuYWx5c2lzIHRvIHNlZSBpZiBpdCBpcyBhIHZhbGlkIHVzZSBjYXNlLlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhd1Njb3JlID0gY2FsY0JNMjVTY29yZSh0ZXJtRnJlcSwgbWF0Y2hpbmdGaWVsZHMsIHRoaXMuX2RvY3VtZW50Q291bnQsIGZpZWxkTGVuZ3RoLCBhdmdGaWVsZExlbmd0aCwgYm0yNXBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgd2VpZ2h0ZWRTY29yZSA9IHRlcm1XZWlnaHQgKiBmaWVsZEJvb3N0ICogZG9jQm9vc3QgKiByYXdTY29yZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSByZXN1bHRzLmdldChkb2NJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnNjb3JlICs9IHdlaWdodGVkU2NvcmU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduVW5pcXVlVGVybShyZXN1bHQudGVybXMsIHNvdXJjZVRlcm0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYXRjaCA9IGdldE93blByb3BlcnR5KHJlc3VsdC5tYXRjaCwgZGVyaXZlZFRlcm0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaC5wdXNoKGZpZWxkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5tYXRjaFtkZXJpdmVkVGVybV0gPSBbZmllbGRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHMuc2V0KGRvY0lkLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlOiB3ZWlnaHRlZFNjb3JlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXJtczogW3NvdXJjZVRlcm1dLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaDogKF9jID0ge30sIF9jW2Rlcml2ZWRUZXJtXSA9IFtmaWVsZF0sIF9jKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlXzI1XzEpIHsgZV8yNSA9IHsgZXJyb3I6IGVfMjVfMSB9OyB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2cgJiYgIV9nLmRvbmUgJiYgKF9iID0gX2YucmV0dXJuKSkgX2IuY2FsbChfZik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzI1KSB0aHJvdyBlXzI1LmVycm9yOyB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlXzI0XzEpIHsgZV8yNCA9IHsgZXJyb3I6IGVfMjRfMSB9OyB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoX2UgJiYgIV9lLmRvbmUgJiYgKF9hID0gX2QucmV0dXJuKSkgX2EuY2FsbChfZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMjQpIHRocm93IGVfMjQuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBNaW5pU2VhcmNoLnByb3RvdHlwZS5hZGRUZXJtID0gZnVuY3Rpb24gKGZpZWxkSWQsIGRvY3VtZW50SWQsIHRlcm0pIHtcbiAgICAgICAgdmFyIGluZGV4RGF0YSA9IHRoaXMuX2luZGV4LmZldGNoKHRlcm0sIGNyZWF0ZU1hcCk7XG4gICAgICAgIHZhciBmaWVsZEluZGV4ID0gaW5kZXhEYXRhLmdldChmaWVsZElkKTtcbiAgICAgICAgaWYgKGZpZWxkSW5kZXggPT0gbnVsbCkge1xuICAgICAgICAgICAgZmllbGRJbmRleCA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgIGZpZWxkSW5kZXguc2V0KGRvY3VtZW50SWQsIDEpO1xuICAgICAgICAgICAgaW5kZXhEYXRhLnNldChmaWVsZElkLCBmaWVsZEluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBkb2NzID0gZmllbGRJbmRleC5nZXQoZG9jdW1lbnRJZCk7XG4gICAgICAgICAgICBmaWVsZEluZGV4LnNldChkb2N1bWVudElkLCAoZG9jcyB8fCAwKSArIDEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgTWluaVNlYXJjaC5wcm90b3R5cGUucmVtb3ZlVGVybSA9IGZ1bmN0aW9uIChmaWVsZElkLCBkb2N1bWVudElkLCB0ZXJtKSB7XG4gICAgICAgIGlmICghdGhpcy5faW5kZXguaGFzKHRlcm0pKSB7XG4gICAgICAgICAgICB0aGlzLndhcm5Eb2N1bWVudENoYW5nZWQoZG9jdW1lbnRJZCwgZmllbGRJZCwgdGVybSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluZGV4RGF0YSA9IHRoaXMuX2luZGV4LmZldGNoKHRlcm0sIGNyZWF0ZU1hcCk7XG4gICAgICAgIHZhciBmaWVsZEluZGV4ID0gaW5kZXhEYXRhLmdldChmaWVsZElkKTtcbiAgICAgICAgaWYgKGZpZWxkSW5kZXggPT0gbnVsbCB8fCBmaWVsZEluZGV4LmdldChkb2N1bWVudElkKSA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLndhcm5Eb2N1bWVudENoYW5nZWQoZG9jdW1lbnRJZCwgZmllbGRJZCwgdGVybSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZmllbGRJbmRleC5nZXQoZG9jdW1lbnRJZCkgPD0gMSkge1xuICAgICAgICAgICAgaWYgKGZpZWxkSW5kZXguc2l6ZSA8PSAxKSB7XG4gICAgICAgICAgICAgICAgaW5kZXhEYXRhLmRlbGV0ZShmaWVsZElkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZpZWxkSW5kZXguZGVsZXRlKGRvY3VtZW50SWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZmllbGRJbmRleC5zZXQoZG9jdW1lbnRJZCwgZmllbGRJbmRleC5nZXQoZG9jdW1lbnRJZCkgLSAxKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5faW5kZXguZ2V0KHRlcm0pLnNpemUgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2luZGV4LmRlbGV0ZSh0ZXJtKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIE1pbmlTZWFyY2gucHJvdG90eXBlLndhcm5Eb2N1bWVudENoYW5nZWQgPSBmdW5jdGlvbiAoc2hvcnREb2N1bWVudElkLCBmaWVsZElkLCB0ZXJtKSB7XG4gICAgICAgIHZhciBlXzI2LCBfYTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIF9iID0gX192YWx1ZXMoT2JqZWN0LmtleXModGhpcy5fZmllbGRJZHMpKSwgX2MgPSBfYi5uZXh0KCk7ICFfYy5kb25lOyBfYyA9IF9iLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciBmaWVsZE5hbWUgPSBfYy52YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZmllbGRJZHNbZmllbGROYW1lXSA9PT0gZmllbGRJZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zLmxvZ2dlcignd2FybicsIFwiTWluaVNlYXJjaDogZG9jdW1lbnQgd2l0aCBJRCBcIi5jb25jYXQodGhpcy5fZG9jdW1lbnRJZHMuZ2V0KHNob3J0RG9jdW1lbnRJZCksIFwiIGhhcyBjaGFuZ2VkIGJlZm9yZSByZW1vdmFsOiB0ZXJtIFxcXCJcIikuY29uY2F0KHRlcm0sIFwiXFxcIiB3YXMgbm90IHByZXNlbnQgaW4gZmllbGQgXFxcIlwiKS5jb25jYXQoZmllbGROYW1lLCBcIlxcXCIuIFJlbW92aW5nIGEgZG9jdW1lbnQgYWZ0ZXIgaXQgaGFzIGNoYW5nZWQgY2FuIGNvcnJ1cHQgdGhlIGluZGV4IVwiKSwgJ3ZlcnNpb25fY29uZmxpY3QnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV8yNl8xKSB7IGVfMjYgPSB7IGVycm9yOiBlXzI2XzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKF9jICYmICFfYy5kb25lICYmIChfYSA9IF9iLnJldHVybikpIF9hLmNhbGwoX2IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzI2KSB0aHJvdyBlXzI2LmVycm9yOyB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBNaW5pU2VhcmNoLnByb3RvdHlwZS5hZGREb2N1bWVudElkID0gZnVuY3Rpb24gKGRvY3VtZW50SWQpIHtcbiAgICAgICAgdmFyIHNob3J0RG9jdW1lbnRJZCA9IHRoaXMuX25leHRJZDtcbiAgICAgICAgdGhpcy5faWRUb1Nob3J0SWQuc2V0KGRvY3VtZW50SWQsIHNob3J0RG9jdW1lbnRJZCk7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50SWRzLnNldChzaG9ydERvY3VtZW50SWQsIGRvY3VtZW50SWQpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudENvdW50ICs9IDE7XG4gICAgICAgIHRoaXMuX25leHRJZCArPSAxO1xuICAgICAgICByZXR1cm4gc2hvcnREb2N1bWVudElkO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIE1pbmlTZWFyY2gucHJvdG90eXBlLmFkZEZpZWxkcyA9IGZ1bmN0aW9uIChmaWVsZHMpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWVsZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpZWxkSWRzW2ZpZWxkc1tpXV0gPSBpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgTWluaVNlYXJjaC5wcm90b3R5cGUuYWRkRmllbGRMZW5ndGggPSBmdW5jdGlvbiAoZG9jdW1lbnRJZCwgZmllbGRJZCwgY291bnQsIGxlbmd0aCkge1xuICAgICAgICB2YXIgZmllbGRMZW5ndGhzID0gdGhpcy5fZmllbGRMZW5ndGguZ2V0KGRvY3VtZW50SWQpO1xuICAgICAgICBpZiAoZmllbGRMZW5ndGhzID09IG51bGwpXG4gICAgICAgICAgICB0aGlzLl9maWVsZExlbmd0aC5zZXQoZG9jdW1lbnRJZCwgZmllbGRMZW5ndGhzID0gW10pO1xuICAgICAgICBmaWVsZExlbmd0aHNbZmllbGRJZF0gPSBsZW5ndGg7XG4gICAgICAgIHZhciBhdmVyYWdlRmllbGRMZW5ndGggPSB0aGlzLl9hdmdGaWVsZExlbmd0aFtmaWVsZElkXSB8fCAwO1xuICAgICAgICB2YXIgdG90YWxGaWVsZExlbmd0aCA9IChhdmVyYWdlRmllbGRMZW5ndGggKiBjb3VudCkgKyBsZW5ndGg7XG4gICAgICAgIHRoaXMuX2F2Z0ZpZWxkTGVuZ3RoW2ZpZWxkSWRdID0gdG90YWxGaWVsZExlbmd0aCAvIChjb3VudCArIDEpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIE1pbmlTZWFyY2gucHJvdG90eXBlLnJlbW92ZUZpZWxkTGVuZ3RoID0gZnVuY3Rpb24gKGRvY3VtZW50SWQsIGZpZWxkSWQsIGNvdW50LCBsZW5ndGgpIHtcbiAgICAgICAgaWYgKGNvdW50ID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLl9hdmdGaWVsZExlbmd0aFtmaWVsZElkXSA9IDA7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRvdGFsRmllbGRMZW5ndGggPSAodGhpcy5fYXZnRmllbGRMZW5ndGhbZmllbGRJZF0gKiBjb3VudCkgLSBsZW5ndGg7XG4gICAgICAgIHRoaXMuX2F2Z0ZpZWxkTGVuZ3RoW2ZpZWxkSWRdID0gdG90YWxGaWVsZExlbmd0aCAvIChjb3VudCAtIDEpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIE1pbmlTZWFyY2gucHJvdG90eXBlLnNhdmVTdG9yZWRGaWVsZHMgPSBmdW5jdGlvbiAoZG9jdW1lbnRJZCwgZG9jKSB7XG4gICAgICAgIHZhciBlXzI3LCBfYTtcbiAgICAgICAgdmFyIF9iID0gdGhpcy5fb3B0aW9ucywgc3RvcmVGaWVsZHMgPSBfYi5zdG9yZUZpZWxkcywgZXh0cmFjdEZpZWxkID0gX2IuZXh0cmFjdEZpZWxkO1xuICAgICAgICBpZiAoc3RvcmVGaWVsZHMgPT0gbnVsbCB8fCBzdG9yZUZpZWxkcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZG9jdW1lbnRGaWVsZHMgPSB0aGlzLl9zdG9yZWRGaWVsZHMuZ2V0KGRvY3VtZW50SWQpO1xuICAgICAgICBpZiAoZG9jdW1lbnRGaWVsZHMgPT0gbnVsbClcbiAgICAgICAgICAgIHRoaXMuX3N0b3JlZEZpZWxkcy5zZXQoZG9jdW1lbnRJZCwgZG9jdW1lbnRGaWVsZHMgPSB7fSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBzdG9yZUZpZWxkc18xID0gX192YWx1ZXMoc3RvcmVGaWVsZHMpLCBzdG9yZUZpZWxkc18xXzEgPSBzdG9yZUZpZWxkc18xLm5leHQoKTsgIXN0b3JlRmllbGRzXzFfMS5kb25lOyBzdG9yZUZpZWxkc18xXzEgPSBzdG9yZUZpZWxkc18xLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciBmaWVsZE5hbWUgPSBzdG9yZUZpZWxkc18xXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgdmFyIGZpZWxkVmFsdWUgPSBleHRyYWN0RmllbGQoZG9jLCBmaWVsZE5hbWUpO1xuICAgICAgICAgICAgICAgIGlmIChmaWVsZFZhbHVlICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50RmllbGRzW2ZpZWxkTmFtZV0gPSBmaWVsZFZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlXzI3XzEpIHsgZV8yNyA9IHsgZXJyb3I6IGVfMjdfMSB9OyB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoc3RvcmVGaWVsZHNfMV8xICYmICFzdG9yZUZpZWxkc18xXzEuZG9uZSAmJiAoX2EgPSBzdG9yZUZpZWxkc18xLnJldHVybikpIF9hLmNhbGwoc3RvcmVGaWVsZHNfMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMjcpIHRocm93IGVfMjcuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhlIHNwZWNpYWwgd2lsZGNhcmQgc3ltYm9sIHRoYXQgY2FuIGJlIHBhc3NlZCB0byB7QGxpbmsgTWluaVNlYXJjaCNzZWFyY2h9XG4gICAgICogdG8gbWF0Y2ggYWxsIGRvY3VtZW50c1xuICAgICAqL1xuICAgIE1pbmlTZWFyY2gud2lsZGNhcmQgPSBTeW1ib2woJyonKTtcbiAgICByZXR1cm4gTWluaVNlYXJjaDtcbn0oKSk7XG52YXIgZ2V0T3duUHJvcGVydHkgPSBmdW5jdGlvbiAob2JqZWN0LCBwcm9wZXJ0eSkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSkgPyBvYmplY3RbcHJvcGVydHldIDogdW5kZWZpbmVkO1xufTtcbnZhciBjb21iaW5hdG9ycyA9IChfYSA9IHt9LFxuICAgIF9hW09SXSA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHZhciBlXzI4LCBfYTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIF9iID0gX192YWx1ZXMoYi5rZXlzKCkpLCBfYyA9IF9iLm5leHQoKTsgIV9jLmRvbmU7IF9jID0gX2IubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRvY0lkID0gX2MudmFsdWU7XG4gICAgICAgICAgICAgICAgdmFyIGV4aXN0aW5nID0gYS5nZXQoZG9jSWQpO1xuICAgICAgICAgICAgICAgIGlmIChleGlzdGluZyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGEuc2V0KGRvY0lkLCBiLmdldChkb2NJZCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9kID0gYi5nZXQoZG9jSWQpLCBzY29yZSA9IF9kLnNjb3JlLCB0ZXJtcyA9IF9kLnRlcm1zLCBtYXRjaCA9IF9kLm1hdGNoO1xuICAgICAgICAgICAgICAgICAgICBleGlzdGluZy5zY29yZSA9IGV4aXN0aW5nLnNjb3JlICsgc2NvcmU7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nLm1hdGNoID0gT2JqZWN0LmFzc2lnbihleGlzdGluZy5tYXRjaCwgbWF0Y2gpO1xuICAgICAgICAgICAgICAgICAgICBhc3NpZ25VbmlxdWVUZXJtcyhleGlzdGluZy50ZXJtcywgdGVybXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV8yOF8xKSB7IGVfMjggPSB7IGVycm9yOiBlXzI4XzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKF9jICYmICFfYy5kb25lICYmIChfYSA9IF9iLnJldHVybikpIF9hLmNhbGwoX2IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzI4KSB0aHJvdyBlXzI4LmVycm9yOyB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfSxcbiAgICBfYVtBTkRdID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgdmFyIGVfMjksIF9hO1xuICAgICAgICB2YXIgY29tYmluZWQgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfYiA9IF9fdmFsdWVzKGIua2V5cygpKSwgX2MgPSBfYi5uZXh0KCk7ICFfYy5kb25lOyBfYyA9IF9iLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciBkb2NJZCA9IF9jLnZhbHVlO1xuICAgICAgICAgICAgICAgIHZhciBleGlzdGluZyA9IGEuZ2V0KGRvY0lkKTtcbiAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmcgPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgdmFyIF9kID0gYi5nZXQoZG9jSWQpLCBzY29yZSA9IF9kLnNjb3JlLCB0ZXJtcyA9IF9kLnRlcm1zLCBtYXRjaCA9IF9kLm1hdGNoO1xuICAgICAgICAgICAgICAgIGFzc2lnblVuaXF1ZVRlcm1zKGV4aXN0aW5nLnRlcm1zLCB0ZXJtcyk7XG4gICAgICAgICAgICAgICAgY29tYmluZWQuc2V0KGRvY0lkLCB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3JlOiBleGlzdGluZy5zY29yZSArIHNjb3JlLFxuICAgICAgICAgICAgICAgICAgICB0ZXJtczogZXhpc3RpbmcudGVybXMsXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoOiBPYmplY3QuYXNzaWduKGV4aXN0aW5nLm1hdGNoLCBtYXRjaClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV8yOV8xKSB7IGVfMjkgPSB7IGVycm9yOiBlXzI5XzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKF9jICYmICFfYy5kb25lICYmIChfYSA9IF9iLnJldHVybikpIF9hLmNhbGwoX2IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzI5KSB0aHJvdyBlXzI5LmVycm9yOyB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbWJpbmVkO1xuICAgIH0sXG4gICAgX2FbQU5EX05PVF0gPSBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICB2YXIgZV8zMCwgX2E7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfYiA9IF9fdmFsdWVzKGIua2V5cygpKSwgX2MgPSBfYi5uZXh0KCk7ICFfYy5kb25lOyBfYyA9IF9iLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciBkb2NJZCA9IF9jLnZhbHVlO1xuICAgICAgICAgICAgICAgIGEuZGVsZXRlKGRvY0lkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV8zMF8xKSB7IGVfMzAgPSB7IGVycm9yOiBlXzMwXzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKF9jICYmICFfYy5kb25lICYmIChfYSA9IF9iLnJldHVybikpIF9hLmNhbGwoX2IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzMwKSB0aHJvdyBlXzMwLmVycm9yOyB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfSxcbiAgICBfYSk7XG52YXIgZGVmYXVsdEJNMjVwYXJhbXMgPSB7IGs6IDEuMiwgYjogMC43LCBkOiAwLjUgfTtcbnZhciBjYWxjQk0yNVNjb3JlID0gZnVuY3Rpb24gKHRlcm1GcmVxLCBtYXRjaGluZ0NvdW50LCB0b3RhbENvdW50LCBmaWVsZExlbmd0aCwgYXZnRmllbGRMZW5ndGgsIGJtMjVwYXJhbXMpIHtcbiAgICB2YXIgayA9IGJtMjVwYXJhbXMuaywgYiA9IGJtMjVwYXJhbXMuYiwgZCA9IGJtMjVwYXJhbXMuZDtcbiAgICB2YXIgaW52RG9jRnJlcSA9IE1hdGgubG9nKDEgKyAodG90YWxDb3VudCAtIG1hdGNoaW5nQ291bnQgKyAwLjUpIC8gKG1hdGNoaW5nQ291bnQgKyAwLjUpKTtcbiAgICByZXR1cm4gaW52RG9jRnJlcSAqIChkICsgdGVybUZyZXEgKiAoayArIDEpIC8gKHRlcm1GcmVxICsgayAqICgxIC0gYiArIGIgKiBmaWVsZExlbmd0aCAvIGF2Z0ZpZWxkTGVuZ3RoKSkpO1xufTtcbnZhciB0ZXJtVG9RdWVyeVNwZWMgPSBmdW5jdGlvbiAob3B0aW9ucykgeyByZXR1cm4gZnVuY3Rpb24gKHRlcm0sIGksIHRlcm1zKSB7XG4gICAgdmFyIGZ1enp5ID0gKHR5cGVvZiBvcHRpb25zLmZ1enp5ID09PSAnZnVuY3Rpb24nKVxuICAgICAgICA/IG9wdGlvbnMuZnV6enkodGVybSwgaSwgdGVybXMpXG4gICAgICAgIDogKG9wdGlvbnMuZnV6enkgfHwgZmFsc2UpO1xuICAgIHZhciBwcmVmaXggPSAodHlwZW9mIG9wdGlvbnMucHJlZml4ID09PSAnZnVuY3Rpb24nKVxuICAgICAgICA/IG9wdGlvbnMucHJlZml4KHRlcm0sIGksIHRlcm1zKVxuICAgICAgICA6IChvcHRpb25zLnByZWZpeCA9PT0gdHJ1ZSk7XG4gICAgcmV0dXJuIHsgdGVybTogdGVybSwgZnV6enk6IGZ1enp5LCBwcmVmaXg6IHByZWZpeCB9O1xufTsgfTtcbnZhciBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICBpZEZpZWxkOiAnaWQnLFxuICAgIGV4dHJhY3RGaWVsZDogZnVuY3Rpb24gKGRvY3VtZW50LCBmaWVsZE5hbWUpIHsgcmV0dXJuIGRvY3VtZW50W2ZpZWxkTmFtZV07IH0sXG4gICAgdG9rZW5pemU6IGZ1bmN0aW9uICh0ZXh0KSB7IHJldHVybiB0ZXh0LnNwbGl0KFNQQUNFX09SX1BVTkNUVUFUSU9OKTsgfSxcbiAgICBwcm9jZXNzVGVybTogZnVuY3Rpb24gKHRlcm0pIHsgcmV0dXJuIHRlcm0udG9Mb3dlckNhc2UoKTsgfSxcbiAgICBmaWVsZHM6IHVuZGVmaW5lZCxcbiAgICBzZWFyY2hPcHRpb25zOiB1bmRlZmluZWQsXG4gICAgc3RvcmVGaWVsZHM6IFtdLFxuICAgIGxvZ2dlcjogZnVuY3Rpb24gKGxldmVsLCBtZXNzYWdlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKGNvbnNvbGUgPT09IG51bGwgfHwgY29uc29sZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29uc29sZVtsZXZlbF0pID09PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgY29uc29sZVtsZXZlbF0obWVzc2FnZSk7XG4gICAgfSxcbiAgICBhdXRvVmFjdXVtOiB0cnVlXG59O1xudmFyIGRlZmF1bHRTZWFyY2hPcHRpb25zID0ge1xuICAgIGNvbWJpbmVXaXRoOiBPUixcbiAgICBwcmVmaXg6IGZhbHNlLFxuICAgIGZ1enp5OiBmYWxzZSxcbiAgICBtYXhGdXp6eTogNixcbiAgICBib29zdDoge30sXG4gICAgd2VpZ2h0czogeyBmdXp6eTogMC40NSwgcHJlZml4OiAwLjM3NSB9LFxuICAgIGJtMjU6IGRlZmF1bHRCTTI1cGFyYW1zXG59O1xudmFyIGRlZmF1bHRBdXRvU3VnZ2VzdE9wdGlvbnMgPSB7XG4gICAgY29tYmluZVdpdGg6IEFORCxcbiAgICBwcmVmaXg6IGZ1bmN0aW9uICh0ZXJtLCBpLCB0ZXJtcykge1xuICAgICAgICByZXR1cm4gaSA9PT0gdGVybXMubGVuZ3RoIC0gMTtcbiAgICB9XG59O1xudmFyIGRlZmF1bHRWYWN1dW1PcHRpb25zID0geyBiYXRjaFNpemU6IDEwMDAsIGJhdGNoV2FpdDogMTAgfTtcbnZhciBkZWZhdWx0VmFjdXVtQ29uZGl0aW9ucyA9IHsgbWluRGlydEZhY3RvcjogMC4xLCBtaW5EaXJ0Q291bnQ6IDIwIH07XG52YXIgZGVmYXVsdEF1dG9WYWN1dW1PcHRpb25zID0gX19hc3NpZ24oX19hc3NpZ24oe30sIGRlZmF1bHRWYWN1dW1PcHRpb25zKSwgZGVmYXVsdFZhY3V1bUNvbmRpdGlvbnMpO1xudmFyIGFzc2lnblVuaXF1ZVRlcm0gPSBmdW5jdGlvbiAodGFyZ2V0LCB0ZXJtKSB7XG4gICAgLy8gQXZvaWQgYWRkaW5nIGR1cGxpY2F0ZSB0ZXJtcy5cbiAgICBpZiAoIXRhcmdldC5pbmNsdWRlcyh0ZXJtKSlcbiAgICAgICAgdGFyZ2V0LnB1c2godGVybSk7XG59O1xudmFyIGFzc2lnblVuaXF1ZVRlcm1zID0gZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG4gICAgdmFyIGVfMzEsIF9hO1xuICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIHNvdXJjZV8xID0gX192YWx1ZXMoc291cmNlKSwgc291cmNlXzFfMSA9IHNvdXJjZV8xLm5leHQoKTsgIXNvdXJjZV8xXzEuZG9uZTsgc291cmNlXzFfMSA9IHNvdXJjZV8xLm5leHQoKSkge1xuICAgICAgICAgICAgdmFyIHRlcm0gPSBzb3VyY2VfMV8xLnZhbHVlO1xuICAgICAgICAgICAgLy8gQXZvaWQgYWRkaW5nIGR1cGxpY2F0ZSB0ZXJtcy5cbiAgICAgICAgICAgIGlmICghdGFyZ2V0LmluY2x1ZGVzKHRlcm0pKVxuICAgICAgICAgICAgICAgIHRhcmdldC5wdXNoKHRlcm0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlXzMxXzEpIHsgZV8zMSA9IHsgZXJyb3I6IGVfMzFfMSB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoc291cmNlXzFfMSAmJiAhc291cmNlXzFfMS5kb25lICYmIChfYSA9IHNvdXJjZV8xLnJldHVybikpIF9hLmNhbGwoc291cmNlXzEpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZV8zMSkgdGhyb3cgZV8zMS5lcnJvcjsgfVxuICAgIH1cbn07XG52YXIgYnlTY29yZSA9IGZ1bmN0aW9uIChfYSwgX2IpIHtcbiAgICB2YXIgYSA9IF9hLnNjb3JlO1xuICAgIHZhciBiID0gX2Iuc2NvcmU7XG4gICAgcmV0dXJuIGIgLSBhO1xufTtcbnZhciBjcmVhdGVNYXAgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTWFwKCk7IH07XG52YXIgb2JqZWN0VG9OdW1lcmljTWFwID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICAgIHZhciBlXzMyLCBfYTtcbiAgICB2YXIgbWFwID0gbmV3IE1hcCgpO1xuICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9iID0gX192YWx1ZXMoT2JqZWN0LmtleXMob2JqZWN0KSksIF9jID0gX2IubmV4dCgpOyAhX2MuZG9uZTsgX2MgPSBfYi5uZXh0KCkpIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBfYy52YWx1ZTtcbiAgICAgICAgICAgIG1hcC5zZXQocGFyc2VJbnQoa2V5LCAxMCksIG9iamVjdFtrZXldKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoZV8zMl8xKSB7IGVfMzIgPSB7IGVycm9yOiBlXzMyXzEgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKF9jICYmICFfYy5kb25lICYmIChfYSA9IF9iLnJldHVybikpIF9hLmNhbGwoX2IpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZV8zMikgdGhyb3cgZV8zMi5lcnJvcjsgfVxuICAgIH1cbiAgICByZXR1cm4gbWFwO1xufTtcbi8vIFRoaXMgcmVndWxhciBleHByZXNzaW9uIG1hdGNoZXMgYW55IFVuaWNvZGUgc3BhY2Ugb3IgcHVuY3R1YXRpb24gY2hhcmFjdGVyXG4vLyBBZGFwdGVkIGZyb20gaHR0cHM6Ly91bmljb2RlLm9yZy9jbGRyL3V0aWxpdHkvbGlzdC11bmljb2Rlc2V0LmpzcD9hPSU1Q3AlN0JaJTdEJTVDcCU3QlAlN0QmYWJiPW9uJmM9b24mZXNjPW9uXG52YXIgU1BBQ0VfT1JfUFVOQ1RVQVRJT04gPSAvW1xcblxcciAtIyUtKiwtLzo7P0BbLVxcXV97fVxcdTAwQTBcXHUwMEExXFx1MDBBN1xcdTAwQUJcXHUwMEI2XFx1MDBCN1xcdTAwQkJcXHUwMEJGXFx1MDM3RVxcdTAzODdcXHUwNTVBLVxcdTA1NUZcXHUwNTg5XFx1MDU4QVxcdTA1QkVcXHUwNUMwXFx1MDVDM1xcdTA1QzZcXHUwNUYzXFx1MDVGNFxcdTA2MDlcXHUwNjBBXFx1MDYwQ1xcdTA2MERcXHUwNjFCXFx1MDYxRVxcdTA2MUZcXHUwNjZBLVxcdTA2NkRcXHUwNkQ0XFx1MDcwMC1cXHUwNzBEXFx1MDdGNy1cXHUwN0Y5XFx1MDgzMC1cXHUwODNFXFx1MDg1RVxcdTA5NjRcXHUwOTY1XFx1MDk3MFxcdTA5RkRcXHUwQTc2XFx1MEFGMFxcdTBDNzdcXHUwQzg0XFx1MERGNFxcdTBFNEZcXHUwRTVBXFx1MEU1QlxcdTBGMDQtXFx1MEYxMlxcdTBGMTRcXHUwRjNBLVxcdTBGM0RcXHUwRjg1XFx1MEZEMC1cXHUwRkQ0XFx1MEZEOVxcdTBGREFcXHUxMDRBLVxcdTEwNEZcXHUxMEZCXFx1MTM2MC1cXHUxMzY4XFx1MTQwMFxcdTE2NkVcXHUxNjgwXFx1MTY5QlxcdTE2OUNcXHUxNkVCLVxcdTE2RURcXHUxNzM1XFx1MTczNlxcdTE3RDQtXFx1MTdENlxcdTE3RDgtXFx1MTdEQVxcdTE4MDAtXFx1MTgwQVxcdTE5NDRcXHUxOTQ1XFx1MUExRVxcdTFBMUZcXHUxQUEwLVxcdTFBQTZcXHUxQUE4LVxcdTFBQURcXHUxQjVBLVxcdTFCNjBcXHUxQkZDLVxcdTFCRkZcXHUxQzNCLVxcdTFDM0ZcXHUxQzdFXFx1MUM3RlxcdTFDQzAtXFx1MUNDN1xcdTFDRDNcXHUyMDAwLVxcdTIwMEFcXHUyMDEwLVxcdTIwMjlcXHUyMDJGLVxcdTIwNDNcXHUyMDQ1LVxcdTIwNTFcXHUyMDUzLVxcdTIwNUZcXHUyMDdEXFx1MjA3RVxcdTIwOERcXHUyMDhFXFx1MjMwOC1cXHUyMzBCXFx1MjMyOVxcdTIzMkFcXHUyNzY4LVxcdTI3NzVcXHUyN0M1XFx1MjdDNlxcdTI3RTYtXFx1MjdFRlxcdTI5ODMtXFx1Mjk5OFxcdTI5RDgtXFx1MjlEQlxcdTI5RkNcXHUyOUZEXFx1MkNGOS1cXHUyQ0ZDXFx1MkNGRVxcdTJDRkZcXHUyRDcwXFx1MkUwMC1cXHUyRTJFXFx1MkUzMC1cXHUyRTRGXFx1MzAwMC1cXHUzMDAzXFx1MzAwOC1cXHUzMDExXFx1MzAxNC1cXHUzMDFGXFx1MzAzMFxcdTMwM0RcXHUzMEEwXFx1MzBGQlxcdUE0RkVcXHVBNEZGXFx1QTYwRC1cXHVBNjBGXFx1QTY3M1xcdUE2N0VcXHVBNkYyLVxcdUE2RjdcXHVBODc0LVxcdUE4NzdcXHVBOENFXFx1QThDRlxcdUE4RjgtXFx1QThGQVxcdUE4RkNcXHVBOTJFXFx1QTkyRlxcdUE5NUZcXHVBOUMxLVxcdUE5Q0RcXHVBOURFXFx1QTlERlxcdUFBNUMtXFx1QUE1RlxcdUFBREVcXHVBQURGXFx1QUFGMFxcdUFBRjFcXHVBQkVCXFx1RkQzRVxcdUZEM0ZcXHVGRTEwLVxcdUZFMTlcXHVGRTMwLVxcdUZFNTJcXHVGRTU0LVxcdUZFNjFcXHVGRTYzXFx1RkU2OFxcdUZFNkFcXHVGRTZCXFx1RkYwMS1cXHVGRjAzXFx1RkYwNS1cXHVGRjBBXFx1RkYwQy1cXHVGRjBGXFx1RkYxQVxcdUZGMUJcXHVGRjFGXFx1RkYyMFxcdUZGM0ItXFx1RkYzRFxcdUZGM0ZcXHVGRjVCXFx1RkY1RFxcdUZGNUYtXFx1RkY2NV0rL3U7XG5cbmV4cG9ydCB7IE1pbmlTZWFyY2ggYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qIGVzbGludC1kaXNhYmxlICovXHJcbmltcG9ydCBNaW5pU2VhcmNoIGZyb20gXCJtaW5pc2VhcmNoXCI7XHJcbiBcclxuLyoqXHJcbiAqIENvbnN0YW50c1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBMT0NBTF9JTkRFWF9JRDogS2V5IGZvciBzdG9yaW5nIHRoZSBzZWFyY2ggaW5kZXggaW4gQ2hyb21lJ3MgbG9jYWwgc3RvcmFnZVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IExPQ0FMX0lOREVYX0lEID0gXCJsb2NhbFNlYXJjaEluZGV4XCI7XHJcbiBcclxuLyoqXHJcbiAqIERlYnVnIFV0aWxpdGllc1xyXG4gKiAtLS0tLS0tLS0tLS0tLVxyXG4gKiBGdW5jdGlvbnMgZm9yIGRlYnVnZ2luZyBhbmQgZGV2ZWxvcG1lbnQuXHJcbiAqL1xyXG5mdW5jdGlvbiBleHBvcnRTdG9yYWdlVG9GaWxlKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJTdGFydGluZyBleHBvcnQuLi5cIik7XHJcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoTE9DQUxfSU5ERVhfSUQsIGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlJldHJpZXZlZCBkYXRhOlwiLCBkYXRhKTtcclxuICAgICAgICBjb25zdCBqc29uU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMik7XHJcbiAgICAgICAgY29uc3QgZGF0YVVybCA9ICdkYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LCcgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChqc29uU3RyaW5nKSkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNocm9tZS5kb3dubG9hZHMuZG93bmxvYWQoe1xyXG4gICAgICAgICAgICB1cmw6IGRhdGFVcmwsXHJcbiAgICAgICAgICAgIGZpbGVuYW1lOiAnaGF3a19pbmRleF9iYWNrdXAuanNvbicsXHJcbiAgICAgICAgICAgIHNhdmVBczogdHJ1ZVxyXG4gICAgICAgIH0sIChkb3dubG9hZElkKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRG93bmxvYWQgc3RhcnRlZCB3aXRoIElEOlwiLCBkb3dubG9hZElkKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vLyBNYWtlIGV4cG9ydCBmdW5jdGlvbiBhdmFpbGFibGUgZ2xvYmFsbHlcclxuZ2xvYmFsVGhpcy5leHBvcnRJbmRleCA9IGV4cG9ydFN0b3JhZ2VUb0ZpbGU7XHJcblxyXG4vLyBBbHNvIGFkZCB0byBjaHJvbWUgb2JqZWN0IGZvciBzZXJ2aWNlIHdvcmtlciBjb250ZXh0XHJcbmNocm9tZS5leHBvcnRJbmRleCA9IGV4cG9ydFN0b3JhZ2VUb0ZpbGU7XHJcblxyXG4vKipcclxuICogU2VhcmNoIEluZGV4IE1hbmFnZW1lbnRcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBIYW5kbGVzIGNyZWF0aW5nLCBsb2FkaW5nLCBhbmQgbWFpbnRhaW5pbmcgdGhlIHNlYXJjaCBpbmRleC5cclxuICovXHJcbmNvbnN0IGNyZWF0ZUluZGV4ID0gKGV4aXN0aW5nSW5kZXgpPT4ge1xyXG4gIGxldCBzdG9wV29yZHMgPSBbJ2knLCdtZScsJ215JywnbXlzZWxmJywnd2UnLCdvdXInLCdvdXJzJywnb3Vyc2VsdmVzJywneW91JywneW91cicsJ3lvdXJzJywneW91cnNlbGYnLCd5b3Vyc2VsdmVzJywnaGUnLCdoaW0nLCdoaXMnLCdoaW1zZWxmJywnc2hlJywnaGVyJywnaGVycycsJ2hlcnNlbGYnLCdpdCcsJ2l0cycsJ2l0c2VsZicsJ3RoZXknLCd0aGVtJywndGhlaXInLCd0aGVpcnMnLCd0aGVtc2VsdmVzJywnd2hhdCcsJ3doaWNoJywnd2hvJywnd2hvbScsJ3RoaXMnLCd0aGF0JywndGhlc2UnLCd0aG9zZScsJ2FtJywnaXMnLCdhcmUnLCd3YXMnLCd3ZXJlJywnYmUnLCdiZWVuJywnYmVpbmcnLCdoYXZlJywnaGFzJywnaGFkJywnaGF2aW5nJywnZG8nLCdkb2VzJywnZGlkJywnZG9pbmcnLCdhJywnYW4nLCd0aGUnLCdhbmQnLCdidXQnLCdpZicsJ29yJywnYmVjYXVzZScsJ2FzJywndW50aWwnLCd3aGlsZScsJ29mJywnYXQnLCdieScsJ2ZvcicsJ3dpdGgnLCdhYm91dCcsJ2FnYWluc3QnLCdiZXR3ZWVuJywnaW50bycsJ3Rocm91Z2gnLCdkdXJpbmcnLCdiZWZvcmUnLCdhZnRlcicsJ2Fib3ZlJywnYmVsb3cnLCd0bycsJ2Zyb20nLCd1cCcsJ2Rvd24nLCdpbicsJ291dCcsJ29uJywnb2ZmJywnb3ZlcicsJ3VuZGVyJywnYWdhaW4nLCdmdXJ0aGVyJywndGhlbicsJ29uY2UnLCdoZXJlJywndGhlcmUnLCd3aGVuJywnd2hlcmUnLCd3aHknLCdob3cnLCdhbGwnLCdhbnknLCdib3RoJywnZWFjaCcsJ2ZldycsJ21vcmUnLCdtb3N0Jywnb3RoZXInLCdzb21lJywnc3VjaCcsJ25vJywnbm9yJywnbm90Jywnb25seScsJ293bicsJ3NhbWUnLCdzbycsJ3RoYW4nLCd0b28nLCd2ZXJ5JywncycsJ3QnLCdjYW4nLCd3aWxsJywnanVzdCcsJ2RvbicsJ3Nob3VsZCcsJ25vdyddXHJcbiBcclxuICBjb25zdCBpbmRleERlc2NyaXB0b3IgPSB7XHJcbiAgICBmaWVsZHM6IFsndGl0bGUnLCAnYWxsVGV4dCddLFxyXG4gICAgc3RvcmVGaWVsZHM6IFsndGl0bGUnXSxcclxuICAgIGlkRmllbGQ6ICdpZCcsXHJcbiAgICBwcm9jZXNzVGVybTogKHRlcm0sIF9maWVsZE5hbWUpID0+XHJcbiAgICAgIHN0b3BXb3Jkcy5pbmNsdWRlcyh0ZXJtKSA/IG51bGwgOiB0ZXJtLnRvTG93ZXJDYXNlKCksXHJcbiAgICBzZWFyY2hPcHRpb25zOiB7XHJcbiAgICAgIHByb2Nlc3NUZXJtOiAodGVybSkgPT4gdGVybS50b0xvd2VyQ2FzZSgpXHJcbiAgICB9XHJcbiAgfTtcclxuICBsZXQgaW5kZXhlciA9IHVuZGVmaW5lZDtcclxuICBpZihleGlzdGluZ0luZGV4ID09PSB1bmRlZmluZWQpe1xyXG4gICAgaW5kZXhlciA9IG5ldyBNaW5pU2VhcmNoKGluZGV4RGVzY3JpcHRvcik7XHJcbiAgfWVsc2V7XHJcbiAgICBpbmRleGVyID0gTWluaVNlYXJjaC5sb2FkSlNPTihleGlzdGluZ0luZGV4LGluZGV4RGVzY3JpcHRvcik7XHJcbiAgfVxyXG4gIHJldHVybiBpbmRleGVyO1xyXG59XHJcblxyXG4vKipcclxuICogU3RvcmFnZSBJbnRlcmZhY2VcclxuICogLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBNYW5hZ2VzIHJlYWRpbmcvd3JpdGluZyB0aGUgaW5kZXggZnJvbSBDaHJvbWUncyBsb2NhbCBzdG9yYWdlLlxyXG4gKi9cclxuY29uc3QgZ2V0U3RvcmVkSW5kZXggPSAoY2IpPT57XHJcbiAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KExPQ0FMX0lOREVYX0lELCAoZGF0YSk9PntjYihkYXRhW0xPQ0FMX0lOREVYX0lEXSl9KTtcclxufVxyXG4gXHJcbmNvbnN0IHN0b3JlSW5kZXggPSAoaW5kZXhEYXRhKSA9PiB7XHJcbiAgY29uc3QgZGF0YSA9IHtcclxuICAgIFtMT0NBTF9JTkRFWF9JRF06IGluZGV4RGF0YVxyXG4gIH1cclxuICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoZGF0YSwgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zb2xlLmxvZygnSW5kZXggZGF0YSBzYXZlZFsnK2RhdGEubGVuZ3RoKyddJyk7XHJcbiAgfSk7XHJcbn1cclxuIFxyXG4vKipcclxuICogSW5kZXggQWNjZXNzIGFuZCBNYW5pcHVsYXRpb25cclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEZ1bmN0aW9ucyBmb3IgcmV0cmlldmluZywgYWRkaW5nLCBhbmQgdXBkYXRpbmcgaW5kZXhlZCBkb2N1bWVudHMuXHJcbiAqL1xyXG5jb25zdCBnZXRJbmRleCA9ICgpPT4ge1xyXG4gIGlmKCFjaHJvbWUuaW5kZXhlcil7XHJcbiAgICBpbml0aWFsaXNlSW5kZXhlcigpO1xyXG4gIH1cclxuICByZXR1cm4gY2hyb21lLmluZGV4ZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUT0RPOiBJbXBsZW1lbnQgdGhpcyBmdW5jdGlvbiB0byByZXBsYWNlIHRoZSBpbmRleGVyIGRhdGFcclxuICovXHJcbmNvbnN0IHJlcGxhY2VJbmRleGVyRGF0YSA9ICgpID0+IHtcclxuIFxyXG4gXHJcbn1cclxuXHJcbmNvbnN0IGFkZFRvSW5kZXggPSAoZG9jdW1lbnQpPT4ge1xyXG4gIGxldCBpZHggPSBnZXRJbmRleCgpO1xyXG4gIGlmKGlkeCl7XHJcbiAgICBjb25zb2xlLnRpbWUoXCJJbmRleGluZyBEb2M6XCIgKyBkb2N1bWVudC5pZCk7XHJcbiAgICBpZihpZHguaGFzKGRvY3VtZW50LmlkKSl7XHJcbiAgICAgIGlkeC5yZXBsYWNlKGRvY3VtZW50KTtcclxuICAgICAgY29uc29sZS5sb2coXCJSZXBsYWNpbmcgZG9jIGluIHRoZSBpbmRleFwiKTtcclxuICAgIH1lbHNle1xyXG4gICAgICBpZHguYWRkKGRvY3VtZW50KTtcclxuICAgICAgY29uc29sZS5sb2coXCJBZGRpbmcgbmV3IGRvYyBpbiB0aGUgaW5kZXhcIik7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLnRpbWVFbmQoXCJJbmRleGluZyBEb2M6XCIgKyBkb2N1bWVudC5pZCk7XHJcbiAgICBjb25zb2xlLnRpbWUoXCJTdG9yaW5nIHRoZSB3aG9sZSBJbmRleFwiKTtcclxuICAgIGxldCBkYXRhID0gSlNPTi5zdHJpbmdpZnkoaWR4KTtcclxuICAgIHN0b3JlSW5kZXgoZGF0YSk7XHJcbiAgICBjb25zb2xlLnRpbWVFbmQoXCJTdG9yaW5nIHRoZSB3aG9sZSBJbmRleFwiKTtcclxuICB9XHJcbn1cclxuIFxyXG4vKipcclxuICogU2VhcmNoIGFuZCBSZXN1bHRzIFByb2Nlc3NpbmdcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEhhbmRsZXMgcXVlcnlpbmcgdGhlIGluZGV4IGFuZCBmb3JtYXR0aW5nIHJlc3VsdHMuXHJcbiAqL1xyXG5jb25zdCBzZWFyY2ggPSAoZG9jdW1lbnQsIG9wdGlvbnMpID0+IHtcclxuICBsZXQgaWR4ID0gZ2V0SW5kZXgoKTtcclxuICByZXR1cm4gaWR4LnNlYXJjaChkb2N1bWVudCk7XHJcbn1cclxuXHJcbmNvbnN0IHNlbmRSZXN1bHRzID0gKHNlYXJjaFF1ZXJ5LCBzZW5kUmVzcG9uc2UpPT57XHJcbiAgbGV0IHNlYXJjaFJlc3VsdHMgPSAgc2VhcmNoKHNlYXJjaFF1ZXJ5LCBudWxsKTtcclxuICBsZXQgc3VnZ2VzdGlvbnMgPSBbXTtcclxuICBmb3IobGV0IGk9MDtpPHNlYXJjaFJlc3VsdHMubGVuZ3RoICYmIGk8NTtpKyspe1xyXG4gICAgc3VnZ2VzdGlvbnMucHVzaCh7Y29udGVudDpzZWFyY2hSZXN1bHRzW2ldLmlkLGRlc2NyaXB0aW9uOnJlbW92ZVNwZWNpYWxDaGFyYWN0ZXJzKHNlYXJjaFJlc3VsdHNbaV0udGl0bGUpfSk7XHJcbiAgICBjb25zb2xlLmxvZyh7Y29udGVudDpzZWFyY2hSZXN1bHRzW2ldLmlkLGRlc2NyaXB0aW9uOnNlYXJjaFJlc3VsdHNbaV0udGl0bGV9KTtcclxuICB9XHJcbiAgY29uc29sZS5sb2coXCJudW1iZXJzIG9mIHN1Z2dlc3Rpb25zOlwiICsgc3VnZ2VzdGlvbnMubGVuZ3RoKTtcclxuICBzZW5kUmVzcG9uc2Uoc3VnZ2VzdGlvbnMpO1xyXG59XHJcbiBcclxuLyoqXHJcbiAqIE1lc3NhZ2UgSGFuZGxpbmdcclxuICogLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFByb2Nlc3NlcyBtZXNzYWdlcyBmcm9tIGNvbnRlbnQgc2NyaXB0cyBhbmQgdGhlIHBvcHVwLlxyXG4gKi9cclxuY29uc3QgaW5kZXhpbmdMaXN0ZW5lciA9IChyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xyXG4gICAgaWYgKChyZXF1ZXN0LmZyb20gPT09ICdwb3B1cCcpICYmIChyZXF1ZXN0LnN1YmplY3QgPT09ICdpbmRleGVyRGF0YScpKSB7XHJcbiAgICAgICAgc2VuZFJlc3BvbnNlKGNocm9tZS5zdG9yZWRJbmRleCk7XHJcbiAgICB9IGVsc2UgaWYgKChyZXF1ZXN0LmZyb20gPT09ICdwb3B1cCcpICYmIChyZXF1ZXN0LnN1YmplY3QgPT09ICdzZXRJbmRleGVyRGF0YScpKSB7XHJcbiAgICAgICAgbGV0IGlzU3VjY2Vzc2Z1bCA9IHJlcGxhY2VJbmRleGVyRGF0YShyZXF1ZXN0LmNvbnRlbnQpO1xyXG4gICAgfSBlbHNlIGlmIChyZXF1ZXN0LmFjdGlvbiA9PT0gJ2V4cG9ydEluZGV4Jykge1xyXG4gICAgICAgIGV4cG9ydFN0b3JhZ2VUb0ZpbGUoKTtcclxuICAgICAgICBzZW5kUmVzcG9uc2Uoe3N0YXR1czogJ2V4cG9ydGluZyd9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWRkVG9JbmRleChyZXF1ZXN0LmRvY3VtZW50KTtcclxuICAgICAgICBzZW5kUmVzcG9uc2UoXCJPSzpJbmRleGVkXCIpO1xyXG4gICAgfVxyXG59XHJcbiBcclxuLyoqXHJcbiAqIEluaXRpYWxpemF0aW9uXHJcbiAqIC0tLS0tLS0tLS0tLS1cclxuICogU2V0cyB1cCB0aGUgZXh0ZW5zaW9uIGFuZCBzZWFyY2ggaW5kZXhlci5cclxuICovXHJcbmNvbnN0IGluaXRpYWxpc2VJbmRleGVyID0gKCk9PiB7XHJcbiAgY29uc3QgaW5pdGlhbGlzZUluZGV4ZXJBc3luYyA9KGluZGV4ZXJEYXRhKSA9PiB7XHJcbiAgICBpZihpbmRleGVyRGF0YSAmJiBpbmRleGVyRGF0YS5sZW5ndGggPiAwKXtcclxuICAgICAgY2hyb21lLnN0b3JlZEluZGV4ID0gaW5kZXhlckRhdGE7XHJcbiAgICB9XHJcbiAgICBjaHJvbWUuaW5kZXhlciAgPSBjcmVhdGVJbmRleChjaHJvbWUuc3RvcmVkSW5kZXgpO1xyXG4gIH1cclxuICBnZXRTdG9yZWRJbmRleChpbml0aWFsaXNlSW5kZXhlckFzeW5jKTtcclxufVxyXG4gXHJcbi8qKlxyXG4gKiBVdGlsaXR5IEZ1bmN0aW9uc1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1xyXG5jb25zdCByZW1vdmVTcGVjaWFsQ2hhcmFjdGVycyA9IChzdHJpbmdUb0JlU2FuaXRpemVkKT0+e1xyXG4gIGxldCBzcGVjaWFsQ2hhcnMgPSBcIiFAIyReJiUqKz1bXVxcL3t9fDo8Pj8sLlwiO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3BlY2lhbENoYXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBzdHJpbmdUb0JlU2FuaXRpemVkID0gc3RyaW5nVG9CZVNhbml0aXplZC5yZXBsYWNlKG5ldyBSZWdFeHAoXCJcXFxcXCIgKyBzcGVjaWFsQ2hhcnNbaV0sIFwiZ2lcIiksIFwiXCIpO1xyXG4gIH1cclxuICByZXR1cm4gc3RyaW5nVG9CZVNhbml0aXplZDtcclxufVxyXG5cclxuLy8gSW5pdGlhbGl6ZSBleHRlbnNpb24gYW5kIHNldCB1cCBsaXN0ZW5lcnNcclxuaW5pdGlhbGlzZUluZGV4ZXIoKTtcclxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGluZGV4aW5nTGlzdGVuZXIpO1xyXG4gXHJcbmNocm9tZS5vbW5pYm94Lm9uSW5wdXRDaGFuZ2VkLmFkZExpc3RlbmVyKCh0ZXh0LHN1Z2dlc3QpID0+IHtcclxuICBzZW5kUmVzdWx0cyh0ZXh0LHN1Z2dlc3QpO1xyXG59KTtcclxuIFxyXG5jaHJvbWUub21uaWJveC5vbklucHV0RW50ZXJlZC5hZGRMaXN0ZW5lcigodGV4dCwgT25JbnB1dEVudGVyZWREaXNwb3NpdGlvbikgPT4ge1xyXG4gIGNocm9tZS50YWJzLnVwZGF0ZSh7dXJsOnRleHR9KTtcclxufSk7Il0sIm5hbWVzIjpbIk1pbmlTZWFyY2giLCJMT0NBTF9JTkRFWF9JRCIsImV4cG9ydFN0b3JhZ2VUb0ZpbGUiLCJjb25zb2xlIiwibG9nIiwiY2hyb21lIiwic3RvcmFnZSIsImxvY2FsIiwiZ2V0IiwiZGF0YSIsImpzb25TdHJpbmciLCJKU09OIiwic3RyaW5naWZ5IiwiZGF0YVVybCIsImJ0b2EiLCJ1bmVzY2FwZSIsImVuY29kZVVSSUNvbXBvbmVudCIsImRvd25sb2FkcyIsImRvd25sb2FkIiwidXJsIiwiZmlsZW5hbWUiLCJzYXZlQXMiLCJkb3dubG9hZElkIiwiZ2xvYmFsVGhpcyIsImV4cG9ydEluZGV4IiwiY3JlYXRlSW5kZXgiLCJleGlzdGluZ0luZGV4Iiwic3RvcFdvcmRzIiwiaW5kZXhEZXNjcmlwdG9yIiwiZmllbGRzIiwic3RvcmVGaWVsZHMiLCJpZEZpZWxkIiwicHJvY2Vzc1Rlcm0iLCJ0ZXJtIiwiX2ZpZWxkTmFtZSIsImluY2x1ZGVzIiwidG9Mb3dlckNhc2UiLCJzZWFyY2hPcHRpb25zIiwiaW5kZXhlciIsInVuZGVmaW5lZCIsImxvYWRKU09OIiwiZ2V0U3RvcmVkSW5kZXgiLCJjYiIsInN0b3JlSW5kZXgiLCJpbmRleERhdGEiLCJfZGVmaW5lUHJvcGVydHkiLCJzZXQiLCJsZW5ndGgiLCJnZXRJbmRleCIsImluaXRpYWxpc2VJbmRleGVyIiwicmVwbGFjZUluZGV4ZXJEYXRhIiwiYWRkVG9JbmRleCIsImRvY3VtZW50IiwiaWR4IiwidGltZSIsImlkIiwiaGFzIiwicmVwbGFjZSIsImFkZCIsInRpbWVFbmQiLCJzZWFyY2giLCJvcHRpb25zIiwic2VuZFJlc3VsdHMiLCJzZWFyY2hRdWVyeSIsInNlbmRSZXNwb25zZSIsInNlYXJjaFJlc3VsdHMiLCJzdWdnZXN0aW9ucyIsImkiLCJwdXNoIiwiY29udGVudCIsImRlc2NyaXB0aW9uIiwicmVtb3ZlU3BlY2lhbENoYXJhY3RlcnMiLCJ0aXRsZSIsImluZGV4aW5nTGlzdGVuZXIiLCJyZXF1ZXN0Iiwic2VuZGVyIiwiZnJvbSIsInN1YmplY3QiLCJzdG9yZWRJbmRleCIsImlzU3VjY2Vzc2Z1bCIsImFjdGlvbiIsInN0YXR1cyIsImluaXRpYWxpc2VJbmRleGVyQXN5bmMiLCJpbmRleGVyRGF0YSIsInN0cmluZ1RvQmVTYW5pdGl6ZWQiLCJzcGVjaWFsQ2hhcnMiLCJSZWdFeHAiLCJydW50aW1lIiwib25NZXNzYWdlIiwiYWRkTGlzdGVuZXIiLCJvbW5pYm94Iiwib25JbnB1dENoYW5nZWQiLCJ0ZXh0Iiwic3VnZ2VzdCIsIm9uSW5wdXRFbnRlcmVkIiwiT25JbnB1dEVudGVyZWREaXNwb3NpdGlvbiIsInRhYnMiLCJ1cGRhdGUiXSwic291cmNlUm9vdCI6IiJ9