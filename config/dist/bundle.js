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
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
function deleteTask(allTasks, taskIdToRemove) {
  var updatedTasks = Object.fromEntries(Object.entries(allTasks).filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
      taskId = _ref2[0];
    return taskId !== taskIdToRemove;
  }));
  if (Object.keys(updatedTasks).length === 0) {
    allTasks = {};
  } else {
    allTasks = updatedTasks;
  }
  chrome.storage.local.set({
    tasks: allTasks
  }, function () {});
}
chrome.alarms.onAlarm.addListener(function (alarm) {
  var alarmName = alarm.name;
  if (alarmName.endsWith('_deletion_alarm')) {
    var taskId = alarmName.split('_')[0];
    chrome.storage.local.get({
      tasks: {}
    }, function (result) {
      var existingTasks = result.tasks || {};
      deleteTask(existingTasks, taskId);
    });
  }
});
chrome.alarms.onAlarm.addListener(function (alarm) {
  chrome.storage.local.get('tasks').then(function (result) {
    var existingTasks = result || {};
    var foundTask = existingTasks.tasks[alarm.name];
    if (Object.keys(existingTasks).length !== 0 && foundTask && !foundTask.recentlyDeleted) {
      var notification = {
        type: 'basic',
        iconUrl: chrome.runtime.getURL('../images/logo128x128.png'),
        title: "Your task ".concat(foundTask.title, " is due"),
        message: foundTask.description
      };
      chrome.notifications.create(alarm.name, notification);
    }
  });
});
chrome.contextMenus.onClicked.addListener(function (info) {
  if (info.menuItemId === 'add-note') {
    alert('You clicked the custom menu item!');
  }
});
chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === 'install') {
    chrome.storage.local.set({
      allowedSites: []
    }, function () {});
    chrome.storage.local.set({
      allowedURLs: []
    }, function () {});
    chrome.storage.local.set({
      allowedStringMatches: []
    }, function () {});
    chrome.storage.local.set({
      allowedRegex: defaultRegexList
    }, function () {});
    chrome.storage.local.set({
      allLastTitles: {}
    }, function () {});
  }
});
function createContextMenu() {
  chrome.contextMenus.create({
    id: 'addNote',
    title: 'Hawk 2 - Add text to Notes',
    contexts: ['selection']
  });
}
function setDueDate(daysToAdd) {
  var dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + daysToAdd); // Add days based on the input
  return dueDate.toISOString();
}
function addNewNote(title, content, tags) {
  var noteId = Date.now().toString();
  var note = {
    id: noteId,
    title: title,
    content: content,
    due: setDueDate(7),
    scheduledDeletion: '',
    recentlyDeleted: false,
    tags: tags
  };
  chrome.storage.local.get({
    notes: []
  }, function (data) {
    var existingNotes = data.notes;
    existingNotes.push(note);
    chrome.storage.local.set({
      notes: existingNotes
    }, function () {});
  });
}

// Listen for when the tab's url changes and send a message to popup.js
/* eslint-disable no-unused-vars */
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.url) {
    chrome.runtime.sendMessage({
      type: 'URL_UPDATED',
      url: changeInfo.url
    });
  }
});
/* eslint-enable no-unused-vars */

// Listen for when the user changes tabs and send a message to popup.js
chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    if (tab && tab.url) {
      chrome.runtime.sendMessage({
        type: 'TAB_CHANGED',
        url: tab.url
      });
    }
  });
});
chrome.contextMenus.onClicked.addListener(function (info) {
  if (info.menuItemId === 'addNote') {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      var currentTitle = tabs[0].title;
      var selectedText = "".concat(currentTitle, " ").concat(info.selectionText);
      var title = selectedText.length > 10 ? "".concat(selectedText.substring(0, 15), "...") : selectedText;
      addNewNote(title, selectedText, {});
    });
  }
});
chrome.runtime.onInstalled.addListener(function () {
  createContextMenu();
});
chrome.runtime.onInstalled.addListener(function () {
  chrome.sidePanel.setPanelBehavior({
    openPanelOnActionClick: true
  })["catch"](console.error);
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IscUJBQXFCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixxQkFBcUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IscUJBQXFCO0FBQ3ZDO0FBQ0Esc0RBQXNEO0FBQ3RELHNCQUFzQixxQkFBcUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9GQUFvRixtQkFBbUI7QUFDdkc7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixxQkFBcUI7QUFDdkM7QUFDQSxpREFBaUQ7QUFDakQsc0JBQXNCLHFCQUFxQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsVUFBVTtBQUN2RTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCxVQUFVO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsd0JBQXdCO0FBQ3JEO0FBQ0EsaUZBQWlGLFVBQVU7QUFDM0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFFBQVE7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksa0JBQWtCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsZ0dBQWdHO0FBQzFHLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsMkJBQTJCO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsMkNBQTJDO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FB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QUFDLElBQUksRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxLQUFLLENBQUM7RUFFNzNCLElBQU1DLGVBQWUsR0FBRztJQUN0QkMsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQztJQUM1QkMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDO0lBQ3RCQyxPQUFPLEVBQUUsSUFBSTtJQUNiQyxXQUFXLEVBQUUsU0FBYkEsV0FBV0EsQ0FBR0MsSUFBSSxFQUFFQyxVQUFVO01BQUEsT0FDNUJQLFNBQVMsQ0FBQ1EsUUFBUSxDQUFDRixJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUdBLElBQUksQ0FBQ0csV0FBVyxDQUFDLENBQUM7SUFBQTtJQUN0REMsYUFBYSxFQUFF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O0VBQzNDeUQsaUJBQWlCLENBQUMsQ0FBQztBQUNyQixDQUFDLENBQUM7QUFFRjdJLE1BQU0sQ0FBQ2tGLE9BQU8sQ0FBQ2tELFdBQVcsQ0FBQ2hELFdBQVcsQ0FBQyxZQUFNO0VBQzNDcEYsTUFBTSxDQUFDOEssU0FBUyxDQUFDQyxnQkFBZ0IsQ0FBQztJQUFFQyxzQkFBc0IsRUFBRTtFQUFLLENBQUMsQ0FBQyxTQUFNLENBQUNsTCxPQUFPLENBQUNtTCxLQUFLLENBQUM7QUFDMUYsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oYXdrLy4vbm9kZV9tb2R1bGVzL21pbmlzZWFyY2gvZGlzdC9lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9oYXdrL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2hhd2svd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2hhd2svd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9oYXdrL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vaGF3ay8uL3NyYy9iYWNrZ3JvdW5kL2JhY2tncm91bmQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlLCBTdXBwcmVzc2VkRXJyb3IsIFN5bWJvbCAqL1xyXG5cclxuXHJcbnZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxudHlwZW9mIFN1cHByZXNzZWRFcnJvciA9PT0gXCJmdW5jdGlvblwiID8gU3VwcHJlc3NlZEVycm9yIDogZnVuY3Rpb24gKGVycm9yLCBzdXBwcmVzc2VkLCBtZXNzYWdlKSB7XHJcbiAgICB2YXIgZSA9IG5ldyBFcnJvcihtZXNzYWdlKTtcclxuICAgIHJldHVybiBlLm5hbWUgPSBcIlN1cHByZXNzZWRFcnJvclwiLCBlLmVycm9yID0gZXJyb3IsIGUuc3VwcHJlc3NlZCA9IHN1cHByZXNzZWQsIGU7XHJcbn07XG5cbi8qKiBAaWdub3JlICovXG52YXIgRU5UUklFUyA9ICdFTlRSSUVTJztcbi8qKiBAaWdub3JlICovXG52YXIgS0VZUyA9ICdLRVlTJztcbi8qKiBAaWdub3JlICovXG52YXIgVkFMVUVTID0gJ1ZBTFVFUyc7XG4vKiogQGlnbm9yZSAqL1xudmFyIExFQUYgPSAnJztcbi8qKlxuICogQHByaXZhdGVcbiAqL1xudmFyIFRyZWVJdGVyYXRvciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUcmVlSXRlcmF0b3Ioc2V0LCB0eXBlKSB7XG4gICAgICAgIHZhciBub2RlID0gc2V0Ll90cmVlO1xuICAgICAgICB2YXIga2V5cyA9IEFycmF5LmZyb20obm9kZS5rZXlzKCkpO1xuICAgICAgICB0aGlzLnNldCA9IHNldDtcbiAgICAgICAgdGhpcy5fdHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuX3BhdGggPSBrZXlzLmxlbmd0aCA+IDAgPyBbeyBub2RlOiBub2RlLCBrZXlzOiBrZXlzIH1dIDogW107XG4gICAgfVxuICAgIFRyZWVJdGVyYXRvci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5kaXZlKCk7XG4gICAgICAgIHRoaXMuYmFja3RyYWNrKCk7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIFRyZWVJdGVyYXRvci5wcm90b3R5cGUuZGl2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3BhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4geyBkb25lOiB0cnVlLCB2YWx1ZTogdW5kZWZpbmVkIH07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIF9hID0gbGFzdCQxKHRoaXMuX3BhdGgpLCBub2RlID0gX2Eubm9kZSwga2V5cyA9IF9hLmtleXM7XG4gICAgICAgIGlmIChsYXN0JDEoa2V5cykgPT09IExFQUYpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGRvbmU6IGZhbHNlLCB2YWx1ZTogdGhpcy5yZXN1bHQoKSB9O1xuICAgICAgICB9XG4gICAgICAgIHZhciBjaGlsZCA9IG5vZGUuZ2V0KGxhc3QkMShrZXlzKSk7XG4gICAgICAgIHRoaXMuX3BhdGgucHVzaCh7IG5vZGU6IGNoaWxkLCBrZXlzOiBBcnJheS5mcm9tKGNoaWxkLmtleXMoKSkgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmRpdmUoKTtcbiAgICB9O1xuICAgIFRyZWVJdGVyYXRvci5wcm90b3R5cGUuYmFja3RyYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fcGF0aC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIga2V5cyA9IGxhc3QkMSh0aGlzLl9wYXRoKS5rZXlzO1xuICAgICAgICBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcGF0aC5wb3AoKTtcbiAgICAgICAgdGhpcy5iYWNrdHJhY2soKTtcbiAgICB9O1xuICAgIFRyZWVJdGVyYXRvci5wcm90b3R5cGUua2V5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXQuX3ByZWZpeCArIHRoaXMuX3BhdGhcbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICB2YXIga2V5cyA9IF9hLmtleXM7XG4gICAgICAgICAgICByZXR1cm4gbGFzdCQxKGtleXMpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBrZXkgIT09IExFQUY7IH0pXG4gICAgICAgICAgICAuam9pbignJyk7XG4gICAgfTtcbiAgICBUcmVlSXRlcmF0b3IucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbGFzdCQxKHRoaXMuX3BhdGgpLm5vZGUuZ2V0KExFQUYpO1xuICAgIH07XG4gICAgVHJlZUl0ZXJhdG9yLnByb3RvdHlwZS5yZXN1bHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5fdHlwZSkge1xuICAgICAgICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiB0aGlzLnZhbHVlKCk7XG4gICAgICAgICAgICBjYXNlIEtFWVM6IHJldHVybiB0aGlzLmtleSgpO1xuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIFt0aGlzLmtleSgpLCB0aGlzLnZhbHVlKCldO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBUcmVlSXRlcmF0b3IucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgcmV0dXJuIFRyZWVJdGVyYXRvcjtcbn0oKSk7XG52YXIgbGFzdCQxID0gZnVuY3Rpb24gKGFycmF5KSB7XG4gICAgcmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdO1xufTtcblxuLyoqXG4gKiBAaWdub3JlXG4gKi9cbnZhciBmdXp6eVNlYXJjaCA9IGZ1bmN0aW9uIChub2RlLCBxdWVyeSwgbWF4RGlzdGFuY2UpIHtcbiAgICB2YXIgcmVzdWx0cyA9IG5ldyBNYXAoKTtcbiAgICBpZiAocXVlcnkgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgLy8gTnVtYmVyIG9mIGNvbHVtbnMgaW4gdGhlIExldmVuc2h0ZWluIG1hdHJpeC5cbiAgICB2YXIgbiA9IHF1ZXJ5Lmxlbmd0aCArIDE7XG4gICAgLy8gTWF0Y2hpbmcgdGVybXMgY2FuIG5ldmVyIGJlIGxvbmdlciB0aGFuIE4gKyBtYXhEaXN0YW5jZS5cbiAgICB2YXIgbSA9IG4gKyBtYXhEaXN0YW5jZTtcbiAgICAvLyBGaWxsIGZpcnN0IG1hdHJpeCByb3cgYW5kIGNvbHVtbiB3aXRoIG51bWJlcnM6IDAgMSAyIDMgLi4uXG4gICAgdmFyIG1hdHJpeCA9IG5ldyBVaW50OEFycmF5KG0gKiBuKS5maWxsKG1heERpc3RhbmNlICsgMSk7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBuOyArK2opXG4gICAgICAgIG1hdHJpeFtqXSA9IGo7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBtOyArK2kpXG4gICAgICAgIG1hdHJpeFtpICogbl0gPSBpO1xuICAgIHJlY3Vyc2Uobm9kZSwgcXVlcnksIG1heERpc3RhbmNlLCByZXN1bHRzLCBtYXRyaXgsIDEsIG4sICcnKTtcbiAgICByZXR1cm4gcmVzdWx0cztcbn07XG4vLyBNb2RpZmllZCB2ZXJzaW9uIG9mIGh0dHA6Ly9zdGV2ZWhhbm92LmNhL2Jsb2cvP2lkPTExNFxuLy8gVGhpcyBidWlsZHMgYSBMZXZlbnNodGVpbiBtYXRyaXggZm9yIGEgZ2l2ZW4gcXVlcnkgYW5kIGNvbnRpbnVvdXNseSB1cGRhdGVzXG4vLyBpdCBmb3Igbm9kZXMgaW4gdGhlIHJhZGl4IHRyZWUgdGhhdCBmYWxsIHdpdGhpbiB0aGUgZ2l2ZW4gbWF4aW11bSBlZGl0XG4vLyBkaXN0YW5jZS4gS2VlcGluZyB0aGUgc2FtZSBtYXRyaXggYXJvdW5kIGlzIGJlbmVmaWNpYWwgZXNwZWNpYWxseSBmb3IgbGFyZ2VyXG4vLyBlZGl0IGRpc3RhbmNlcy5cbi8vXG4vLyAgICAgICAgICAgayAgIGEgICB0ICAgZSAgIDwtLSBxdWVyeVxuLy8gICAgICAgMCAgIDEgICAyICAgMyAgIDRcbi8vICAgYyAgIDEgICAxICAgMiAgIDMgICA0XG4vLyAgIGEgICAyICAgMiAgIDEgICAyICAgM1xuLy8gICB0ICAgMyAgIDMgICAyICAgMSAgWzJdICA8LS0gZWRpdCBkaXN0YW5jZVxuLy8gICBeXG4vLyAgIF4gdGVybSBpbiByYWRpeCB0cmVlLCByb3dzIGFyZSBhZGRlZCBhbmQgcmVtb3ZlZCBhcyBuZWVkZWRcbnZhciByZWN1cnNlID0gZnVuY3Rpb24gKG5vZGUsIHF1ZXJ5LCBtYXhEaXN0YW5jZSwgcmVzdWx0cywgbWF0cml4LCBtLCBuLCBwcmVmaXgpIHtcbiAgICB2YXIgZV8xLCBfYTtcbiAgICB2YXIgb2Zmc2V0ID0gbSAqIG47XG4gICAgdHJ5IHtcbiAgICAgICAga2V5OiBmb3IgKHZhciBfYiA9IF9fdmFsdWVzKG5vZGUua2V5cygpKSwgX2MgPSBfYi5uZXh0KCk7ICFfYy5kb25lOyBfYyA9IF9iLm5leHQoKSkge1xuICAgICAgICAgICAgdmFyIGtleSA9IF9jLnZhbHVlO1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gTEVBRikge1xuICAgICAgICAgICAgICAgIC8vIFdlJ3ZlIHJlYWNoZWQgYSBsZWFmIG5vZGUuIENoZWNrIGlmIHRoZSBlZGl0IGRpc3RhbmNlIGFjY2VwdGFibGUgYW5kXG4gICAgICAgICAgICAgICAgLy8gc3RvcmUgdGhlIHJlc3VsdCBpZiBpdCBpcy5cbiAgICAgICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSBtYXRyaXhbb2Zmc2V0IC0gMV07XG4gICAgICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDw9IG1heERpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMuc2V0KHByZWZpeCwgW25vZGUuZ2V0KGtleSksIGRpc3RhbmNlXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gSXRlcmF0ZSBvdmVyIGFsbCBjaGFyYWN0ZXJzIGluIHRoZSBrZXkuIFVwZGF0ZSB0aGUgTGV2ZW5zaHRlaW4gbWF0cml4XG4gICAgICAgICAgICAgICAgLy8gYW5kIGNoZWNrIGlmIHRoZSBtaW5pbXVtIGRpc3RhbmNlIGluIHRoZSBsYXN0IHJvdyBpcyBzdGlsbCB3aXRoaW4gdGhlXG4gICAgICAgICAgICAgICAgLy8gbWF4aW11bSBlZGl0IGRpc3RhbmNlLiBJZiBpdCBpcywgd2UgY2FuIHJlY3Vyc2Ugb3ZlciBhbGwgY2hpbGQgbm9kZXMuXG4gICAgICAgICAgICAgICAgdmFyIGkgPSBtO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHBvcyA9IDA7IHBvcyA8IGtleS5sZW5ndGg7ICsrcG9zLCArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNoYXIgPSBrZXlbcG9zXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoaXNSb3dPZmZzZXQgPSBuICogaTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByZXZSb3dPZmZzZXQgPSB0aGlzUm93T2Zmc2V0IC0gbjtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IHRoZSBmaXJzdCBjb2x1bW4gYmFzZWQgb24gdGhlIHByZXZpb3VzIHJvdywgYW5kIGluaXRpYWxpemUgdGhlXG4gICAgICAgICAgICAgICAgICAgIC8vIG1pbmltdW0gZGlzdGFuY2UgaW4gdGhlIGN1cnJlbnQgcm93LlxuICAgICAgICAgICAgICAgICAgICB2YXIgbWluRGlzdGFuY2UgPSBtYXRyaXhbdGhpc1Jvd09mZnNldF07XG4gICAgICAgICAgICAgICAgICAgIHZhciBqbWluID0gTWF0aC5tYXgoMCwgaSAtIG1heERpc3RhbmNlIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBqbWF4ID0gTWF0aC5taW4obiAtIDEsIGkgKyBtYXhEaXN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIEl0ZXJhdGUgb3ZlciByZW1haW5pbmcgY29sdW1ucyAoY2hhcmFjdGVycyBpbiB0aGUgcXVlcnkpLlxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gam1pbjsgaiA8IGptYXg7ICsraikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRpZmZlcmVudCA9IGNoYXIgIT09IHF1ZXJ5W2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSXQgbWlnaHQgbWFrZSBzZW5zZSB0byBvbmx5IHJlYWQgdGhlIG1hdHJpeCBwb3NpdGlvbnMgdXNlZCBmb3JcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlbGV0aW9uL2luc2VydGlvbiBpZiB0aGUgY2hhcmFjdGVycyBhcmUgZGlmZmVyZW50LiBCdXQgd2Ugd2FudCB0b1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYXZvaWQgY29uZGl0aW9uYWwgcmVhZHMgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcnBsID0gbWF0cml4W3ByZXZSb3dPZmZzZXQgKyBqXSArICtkaWZmZXJlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGVsID0gbWF0cml4W3ByZXZSb3dPZmZzZXQgKyBqICsgMV0gKyAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlucyA9IG1hdHJpeFt0aGlzUm93T2Zmc2V0ICsgal0gKyAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRpc3QgPSBtYXRyaXhbdGhpc1Jvd09mZnNldCArIGogKyAxXSA9IE1hdGgubWluKHJwbCwgZGVsLCBpbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpc3QgPCBtaW5EaXN0YW5jZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5EaXN0YW5jZSA9IGRpc3Q7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gQmVjYXVzZSBkaXN0YW5jZSB3aWxsIG5ldmVyIGRlY3JlYXNlLCB3ZSBjYW4gc3RvcC4gVGhlcmUgd2lsbCBiZSBub1xuICAgICAgICAgICAgICAgICAgICAvLyBtYXRjaGluZyBjaGlsZCBub2Rlcy5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1pbkRpc3RhbmNlID4gbWF4RGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlIGtleTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZWN1cnNlKG5vZGUuZ2V0KGtleSksIHF1ZXJ5LCBtYXhEaXN0YW5jZSwgcmVzdWx0cywgbWF0cml4LCBpLCBuLCBwcmVmaXggKyBrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlXzFfMSkgeyBlXzEgPSB7IGVycm9yOiBlXzFfMSB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoX2MgJiYgIV9jLmRvbmUgJiYgKF9hID0gX2IucmV0dXJuKSkgX2EuY2FsbChfYik7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfVxuICAgIH1cbn07XG5cbi8qKlxuICogQSBjbGFzcyBpbXBsZW1lbnRpbmcgdGhlIHNhbWUgaW50ZXJmYWNlIGFzIGEgc3RhbmRhcmQgSmF2YVNjcmlwdFxuICogW2BNYXBgXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9NYXApXG4gKiB3aXRoIHN0cmluZyBrZXlzLCBidXQgYWRkaW5nIHN1cHBvcnQgZm9yIGVmZmljaWVudGx5IHNlYXJjaGluZyBlbnRyaWVzIHdpdGhcbiAqIHByZWZpeCBvciBmdXp6eSBzZWFyY2guIFRoaXMgY2xhc3MgaXMgdXNlZCBpbnRlcm5hbGx5IGJ5IHtAbGluayBNaW5pU2VhcmNofVxuICogYXMgdGhlIGludmVydGVkIGluZGV4IGRhdGEgc3RydWN0dXJlLiBUaGUgaW1wbGVtZW50YXRpb24gaXMgYSByYWRpeCB0cmVlXG4gKiAoY29tcHJlc3NlZCBwcmVmaXggdHJlZSkuXG4gKlxuICogU2luY2UgdGhpcyBjbGFzcyBjYW4gYmUgb2YgZ2VuZXJhbCB1dGlsaXR5IGJleW9uZCBfTWluaVNlYXJjaF8sIGl0IGlzXG4gKiBleHBvcnRlZCBieSB0aGUgYG1pbmlzZWFyY2hgIHBhY2thZ2UgYW5kIGNhbiBiZSBpbXBvcnRlZCAob3IgcmVxdWlyZWQpIGFzXG4gKiBgbWluaXNlYXJjaC9TZWFyY2hhYmxlTWFwYC5cbiAqXG4gKiBAdHlwZVBhcmFtIFQgIFRoZSB0eXBlIG9mIHRoZSB2YWx1ZXMgc3RvcmVkIGluIHRoZSBtYXAuXG4gKi9cbnZhciBTZWFyY2hhYmxlTWFwID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpcyBub3JtYWxseSBjYWxsZWQgd2l0aG91dCBhcmd1bWVudHMsIGNyZWF0aW5nIGFuIGVtcHR5XG4gICAgICogbWFwLiBJbiBvcmRlciB0byBjcmVhdGUgYSB7QGxpbmsgU2VhcmNoYWJsZU1hcH0gZnJvbSBhbiBpdGVyYWJsZSBvciBmcm9tIGFuXG4gICAgICogb2JqZWN0LCBjaGVjayB7QGxpbmsgU2VhcmNoYWJsZU1hcC5mcm9tfSBhbmQge0BsaW5rXG4gICAgICogU2VhcmNoYWJsZU1hcC5mcm9tT2JqZWN0fS5cbiAgICAgKlxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBhcmd1bWVudHMgYXJlIGZvciBpbnRlcm5hbCB1c2UsIHdoZW4gY3JlYXRpbmcgZGVyaXZlZFxuICAgICAqIG11dGFibGUgdmlld3Mgb2YgYSBtYXAgYXQgYSBwcmVmaXguXG4gICAgICovXG4gICAgZnVuY3Rpb24gU2VhcmNoYWJsZU1hcCh0cmVlLCBwcmVmaXgpIHtcbiAgICAgICAgaWYgKHRyZWUgPT09IHZvaWQgMCkgeyB0cmVlID0gbmV3IE1hcCgpOyB9XG4gICAgICAgIGlmIChwcmVmaXggPT09IHZvaWQgMCkgeyBwcmVmaXggPSAnJzsgfVxuICAgICAgICB0aGlzLl9zaXplID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLl90cmVlID0gdHJlZTtcbiAgICAgICAgdGhpcy5fcHJlZml4ID0gcHJlZml4O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuZCByZXR1cm5zIGEgbXV0YWJsZSB2aWV3IG9mIHRoaXMge0BsaW5rIFNlYXJjaGFibGVNYXB9LFxuICAgICAqIGNvbnRhaW5pbmcgb25seSBlbnRyaWVzIHRoYXQgc2hhcmUgdGhlIGdpdmVuIHByZWZpeC5cbiAgICAgKlxuICAgICAqICMjIyBVc2FnZTpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiBsZXQgbWFwID0gbmV3IFNlYXJjaGFibGVNYXAoKVxuICAgICAqIG1hcC5zZXQoXCJ1bmljb3JuXCIsIDEpXG4gICAgICogbWFwLnNldChcInVuaXZlcnNlXCIsIDIpXG4gICAgICogbWFwLnNldChcInVuaXZlcnNpdHlcIiwgMylcbiAgICAgKiBtYXAuc2V0KFwidW5pcXVlXCIsIDQpXG4gICAgICogbWFwLnNldChcImhlbGxvXCIsIDUpXG4gICAgICpcbiAgICAgKiBsZXQgdW5pID0gbWFwLmF0UHJlZml4KFwidW5pXCIpXG4gICAgICogdW5pLmdldChcInVuaXF1ZVwiKSAvLyA9PiA0XG4gICAgICogdW5pLmdldChcInVuaWNvcm5cIikgLy8gPT4gMVxuICAgICAqIHVuaS5nZXQoXCJoZWxsb1wiKSAvLyA9PiB1bmRlZmluZWRcbiAgICAgKlxuICAgICAqIGxldCB1bml2ZXIgPSBtYXAuYXRQcmVmaXgoXCJ1bml2ZXJcIilcbiAgICAgKiB1bml2ZXIuZ2V0KFwidW5pcXVlXCIpIC8vID0+IHVuZGVmaW5lZFxuICAgICAqIHVuaXZlci5nZXQoXCJ1bml2ZXJzZVwiKSAvLyA9PiAyXG4gICAgICogdW5pdmVyLmdldChcInVuaXZlcnNpdHlcIikgLy8gPT4gM1xuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogQHBhcmFtIHByZWZpeCAgVGhlIHByZWZpeFxuICAgICAqIEByZXR1cm4gQSB7QGxpbmsgU2VhcmNoYWJsZU1hcH0gcmVwcmVzZW50aW5nIGEgbXV0YWJsZSB2aWV3IG9mIHRoZSBvcmlnaW5hbFxuICAgICAqIE1hcCBhdCB0aGUgZ2l2ZW4gcHJlZml4XG4gICAgICovXG4gICAgU2VhcmNoYWJsZU1hcC5wcm90b3R5cGUuYXRQcmVmaXggPSBmdW5jdGlvbiAocHJlZml4KSB7XG4gICAgICAgIHZhciBlXzEsIF9hO1xuICAgICAgICBpZiAoIXByZWZpeC5zdGFydHNXaXRoKHRoaXMuX3ByZWZpeCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzbWF0Y2hlZCBwcmVmaXgnKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgX2IgPSBfX3JlYWQodHJhY2tEb3duKHRoaXMuX3RyZWUsIHByZWZpeC5zbGljZSh0aGlzLl9wcmVmaXgubGVuZ3RoKSksIDIpLCBub2RlID0gX2JbMF0sIHBhdGggPSBfYlsxXTtcbiAgICAgICAgaWYgKG5vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFyIF9jID0gX19yZWFkKGxhc3QocGF0aCksIDIpLCBwYXJlbnROb2RlID0gX2NbMF0sIGtleSA9IF9jWzFdO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBfZCA9IF9fdmFsdWVzKHBhcmVudE5vZGUua2V5cygpKSwgX2UgPSBfZC5uZXh0KCk7ICFfZS5kb25lOyBfZSA9IF9kLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgayA9IF9lLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoayAhPT0gTEVBRiAmJiBrLnN0YXJ0c1dpdGgoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGVfMSA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVfMS5zZXQoay5zbGljZShrZXkubGVuZ3RoKSwgcGFyZW50Tm9kZS5nZXQoaykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hhYmxlTWFwKG5vZGVfMSwgcHJlZml4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlXzFfMSkgeyBlXzEgPSB7IGVycm9yOiBlXzFfMSB9OyB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoX2UgJiYgIV9lLmRvbmUgJiYgKF9hID0gX2QucmV0dXJuKSkgX2EuY2FsbChfZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaGFibGVNYXAobm9kZSwgcHJlZml4KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTWFwL2NsZWFyXG4gICAgICovXG4gICAgU2VhcmNoYWJsZU1hcC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3NpemUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuX3RyZWUuY2xlYXIoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTWFwL2RlbGV0ZVxuICAgICAqIEBwYXJhbSBrZXkgIEtleSB0byBkZWxldGVcbiAgICAgKi9cbiAgICBTZWFyY2hhYmxlTWFwLnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHRoaXMuX3NpemUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiByZW1vdmUodGhpcy5fdHJlZSwga2V5KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTWFwL2VudHJpZXNcbiAgICAgKiBAcmV0dXJuIEFuIGl0ZXJhdG9yIGl0ZXJhdGluZyB0aHJvdWdoIGBba2V5LCB2YWx1ZV1gIGVudHJpZXMuXG4gICAgICovXG4gICAgU2VhcmNoYWJsZU1hcC5wcm90b3R5cGUuZW50cmllcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUcmVlSXRlcmF0b3IodGhpcywgRU5UUklFUyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hcC9mb3JFYWNoXG4gICAgICogQHBhcmFtIGZuICBJdGVyYXRpb24gZnVuY3Rpb25cbiAgICAgKi9cbiAgICBTZWFyY2hhYmxlTWFwLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgIHZhciBlXzIsIF9hO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2IgPSBfX3ZhbHVlcyh0aGlzKSwgX2MgPSBfYi5uZXh0KCk7ICFfYy5kb25lOyBfYyA9IF9iLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciBfZCA9IF9fcmVhZChfYy52YWx1ZSwgMiksIGtleSA9IF9kWzBdLCB2YWx1ZSA9IF9kWzFdO1xuICAgICAgICAgICAgICAgIGZuKGtleSwgdmFsdWUsIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlXzJfMSkgeyBlXzIgPSB7IGVycm9yOiBlXzJfMSB9OyB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoX2MgJiYgIV9jLmRvbmUgJiYgKF9hID0gX2IucmV0dXJuKSkgX2EuY2FsbChfYik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMikgdGhyb3cgZV8yLmVycm9yOyB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBNYXAgb2YgYWxsIHRoZSBlbnRyaWVzIHRoYXQgaGF2ZSBhIGtleSB3aXRoaW4gdGhlIGdpdmVuIGVkaXRcbiAgICAgKiBkaXN0YW5jZSBmcm9tIHRoZSBzZWFyY2gga2V5LiBUaGUga2V5cyBvZiB0aGUgcmV0dXJuZWQgTWFwIGFyZSB0aGUgbWF0Y2hpbmdcbiAgICAgKiBrZXlzLCB3aGlsZSB0aGUgdmFsdWVzIGFyZSB0d28tZWxlbWVudCBhcnJheXMgd2hlcmUgdGhlIGZpcnN0IGVsZW1lbnQgaXNcbiAgICAgKiB0aGUgdmFsdWUgYXNzb2NpYXRlZCB0byB0aGUga2V5LCBhbmQgdGhlIHNlY29uZCBpcyB0aGUgZWRpdCBkaXN0YW5jZSBvZiB0aGVcbiAgICAgKiBrZXkgdG8gdGhlIHNlYXJjaCBrZXkuXG4gICAgICpcbiAgICAgKiAjIyMgVXNhZ2U6XG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogbGV0IG1hcCA9IG5ldyBTZWFyY2hhYmxlTWFwKClcbiAgICAgKiBtYXAuc2V0KCdoZWxsbycsICd3b3JsZCcpXG4gICAgICogbWFwLnNldCgnaGVsbCcsICd5ZWFoJylcbiAgICAgKiBtYXAuc2V0KCdjaWFvJywgJ21vbmRvJylcbiAgICAgKlxuICAgICAqIC8vIEdldCBhbGwgZW50cmllcyB0aGF0IG1hdGNoIHRoZSBrZXkgJ2hhbGxvJyB3aXRoIGEgbWF4aW11bSBlZGl0IGRpc3RhbmNlIG9mIDJcbiAgICAgKiBtYXAuZnV6enlHZXQoJ2hhbGxvJywgMilcbiAgICAgKiAvLyA9PiBNYXAoMikgeyAnaGVsbG8nID0+IFsnd29ybGQnLCAxXSwgJ2hlbGwnID0+IFsneWVhaCcsIDJdIH1cbiAgICAgKlxuICAgICAqIC8vIEluIHRoZSBleGFtcGxlLCB0aGUgXCJoZWxsb1wiIGtleSBoYXMgdmFsdWUgXCJ3b3JsZFwiIGFuZCBlZGl0IGRpc3RhbmNlIG9mIDFcbiAgICAgKiAvLyAoY2hhbmdlIFwiZVwiIHRvIFwiYVwiKSwgdGhlIGtleSBcImhlbGxcIiBoYXMgdmFsdWUgXCJ5ZWFoXCIgYW5kIGVkaXQgZGlzdGFuY2Ugb2YgMlxuICAgICAqIC8vIChjaGFuZ2UgXCJlXCIgdG8gXCJhXCIsIGRlbGV0ZSBcIm9cIilcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBwYXJhbSBrZXkgIFRoZSBzZWFyY2gga2V5XG4gICAgICogQHBhcmFtIG1heEVkaXREaXN0YW5jZSAgVGhlIG1heGltdW0gZWRpdCBkaXN0YW5jZSAoTGV2ZW5zaHRlaW4pXG4gICAgICogQHJldHVybiBBIE1hcCBvZiB0aGUgbWF0Y2hpbmcga2V5cyB0byB0aGVpciB2YWx1ZSBhbmQgZWRpdCBkaXN0YW5jZVxuICAgICAqL1xuICAgIFNlYXJjaGFibGVNYXAucHJvdG90eXBlLmZ1enp5R2V0ID0gZnVuY3Rpb24gKGtleSwgbWF4RWRpdERpc3RhbmNlKSB7XG4gICAgICAgIHJldHVybiBmdXp6eVNlYXJjaCh0aGlzLl90cmVlLCBrZXksIG1heEVkaXREaXN0YW5jZSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hcC9nZXRcbiAgICAgKiBAcGFyYW0ga2V5ICBLZXkgdG8gZ2V0XG4gICAgICogQHJldHVybiBWYWx1ZSBhc3NvY2lhdGVkIHRvIHRoZSBrZXksIG9yIGB1bmRlZmluZWRgIGlmIHRoZSBrZXkgaXMgbm90XG4gICAgICogZm91bmQuXG4gICAgICovXG4gICAgU2VhcmNoYWJsZU1hcC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB2YXIgbm9kZSA9IGxvb2t1cCh0aGlzLl90cmVlLCBrZXkpO1xuICAgICAgICByZXR1cm4gbm9kZSAhPT0gdW5kZWZpbmVkID8gbm9kZS5nZXQoTEVBRikgOiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hcC9oYXNcbiAgICAgKiBAcGFyYW0ga2V5ICBLZXlcbiAgICAgKiBAcmV0dXJuIFRydWUgaWYgdGhlIGtleSBpcyBpbiB0aGUgbWFwLCBmYWxzZSBvdGhlcndpc2VcbiAgICAgKi9cbiAgICBTZWFyY2hhYmxlTWFwLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHZhciBub2RlID0gbG9va3VwKHRoaXMuX3RyZWUsIGtleSk7XG4gICAgICAgIHJldHVybiBub2RlICE9PSB1bmRlZmluZWQgJiYgbm9kZS5oYXMoTEVBRik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hcC9rZXlzXG4gICAgICogQHJldHVybiBBbiBgSXRlcmFibGVgIGl0ZXJhdGluZyB0aHJvdWdoIGtleXNcbiAgICAgKi9cbiAgICBTZWFyY2hhYmxlTWFwLnByb3RvdHlwZS5rZXlzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IFRyZWVJdGVyYXRvcih0aGlzLCBLRVlTKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTWFwL3NldFxuICAgICAqIEBwYXJhbSBrZXkgIEtleSB0byBzZXRcbiAgICAgKiBAcGFyYW0gdmFsdWUgIFZhbHVlIHRvIGFzc29jaWF0ZSB0byB0aGUga2V5XG4gICAgICogQHJldHVybiBUaGUge0BsaW5rIFNlYXJjaGFibGVNYXB9IGl0c2VsZiwgdG8gYWxsb3cgY2hhaW5pbmdcbiAgICAgKi9cbiAgICBTZWFyY2hhYmxlTWFwLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIGtleSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigna2V5IG11c3QgYmUgYSBzdHJpbmcnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zaXplID0gdW5kZWZpbmVkO1xuICAgICAgICB2YXIgbm9kZSA9IGNyZWF0ZVBhdGgodGhpcy5fdHJlZSwga2V5KTtcbiAgICAgICAgbm9kZS5zZXQoTEVBRiwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTZWFyY2hhYmxlTWFwLnByb3RvdHlwZSwgXCJzaXplXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTWFwL3NpemVcbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3NpemUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qKiBAaWdub3JlICovXG4gICAgICAgICAgICB0aGlzLl9zaXplID0gMDtcbiAgICAgICAgICAgIHZhciBpdGVyID0gdGhpcy5lbnRyaWVzKCk7XG4gICAgICAgICAgICB3aGlsZSAoIWl0ZXIubmV4dCgpLmRvbmUpXG4gICAgICAgICAgICAgICAgdGhpcy5fc2l6ZSArPSAxO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSB2YWx1ZSBhdCB0aGUgZ2l2ZW4ga2V5IHVzaW5nIHRoZSBwcm92aWRlZCBmdW5jdGlvbi4gVGhlIGZ1bmN0aW9uXG4gICAgICogaXMgY2FsbGVkIHdpdGggdGhlIGN1cnJlbnQgdmFsdWUgYXQgdGhlIGtleSwgYW5kIGl0cyByZXR1cm4gdmFsdWUgaXMgdXNlZCBhc1xuICAgICAqIHRoZSBuZXcgdmFsdWUgdG8gYmUgc2V0LlxuICAgICAqXG4gICAgICogIyMjIEV4YW1wbGU6XG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogLy8gSW5jcmVtZW50IHRoZSBjdXJyZW50IHZhbHVlIGJ5IG9uZVxuICAgICAqIHNlYXJjaGFibGVNYXAudXBkYXRlKCdzb21la2V5JywgKGN1cnJlbnRWYWx1ZSkgPT4gY3VycmVudFZhbHVlID09IG51bGwgPyAwIDogY3VycmVudFZhbHVlICsgMSlcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIElmIHRoZSB2YWx1ZSBhdCB0aGUgZ2l2ZW4ga2V5IGlzIG9yIHdpbGwgYmUgYW4gb2JqZWN0LCBpdCBtaWdodCBub3QgcmVxdWlyZVxuICAgICAqIHJlLWFzc2lnbm1lbnQuIEluIHRoYXQgY2FzZSBpdCBpcyBiZXR0ZXIgdG8gdXNlIGBmZXRjaCgpYCwgYmVjYXVzZSBpdCBpc1xuICAgICAqIGZhc3Rlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBrZXkgIFRoZSBrZXkgdG8gdXBkYXRlXG4gICAgICogQHBhcmFtIGZuICBUaGUgZnVuY3Rpb24gdXNlZCB0byBjb21wdXRlIHRoZSBuZXcgdmFsdWUgZnJvbSB0aGUgY3VycmVudCBvbmVcbiAgICAgKiBAcmV0dXJuIFRoZSB7QGxpbmsgU2VhcmNoYWJsZU1hcH0gaXRzZWxmLCB0byBhbGxvdyBjaGFpbmluZ1xuICAgICAqL1xuICAgIFNlYXJjaGFibGVNYXAucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChrZXksIGZuKSB7XG4gICAgICAgIGlmICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdrZXkgbXVzdCBiZSBhIHN0cmluZycpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NpemUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHZhciBub2RlID0gY3JlYXRlUGF0aCh0aGlzLl90cmVlLCBrZXkpO1xuICAgICAgICBub2RlLnNldChMRUFGLCBmbihub2RlLmdldChMRUFGKSkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEZldGNoZXMgdGhlIHZhbHVlIG9mIHRoZSBnaXZlbiBrZXkuIElmIHRoZSB2YWx1ZSBkb2VzIG5vdCBleGlzdCwgY2FsbHMgdGhlXG4gICAgICogZ2l2ZW4gZnVuY3Rpb24gdG8gY3JlYXRlIGEgbmV3IHZhbHVlLCB3aGljaCBpcyBpbnNlcnRlZCBhdCB0aGUgZ2l2ZW4ga2V5XG4gICAgICogYW5kIHN1YnNlcXVlbnRseSByZXR1cm5lZC5cbiAgICAgKlxuICAgICAqICMjIyBFeGFtcGxlOlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIGNvbnN0IG1hcCA9IHNlYXJjaGFibGVNYXAuZmV0Y2goJ3NvbWVrZXknLCAoKSA9PiBuZXcgTWFwKCkpXG4gICAgICogbWFwLnNldCgnZm9vJywgJ2JhcicpXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAcGFyYW0ga2V5ICBUaGUga2V5IHRvIHVwZGF0ZVxuICAgICAqIEBwYXJhbSBkZWZhdWx0VmFsdWUgIEEgZnVuY3Rpb24gdGhhdCBjcmVhdGVzIGEgbmV3IHZhbHVlIGlmIHRoZSBrZXkgZG9lcyBub3QgZXhpc3RcbiAgICAgKiBAcmV0dXJuIFRoZSBleGlzdGluZyBvciBuZXcgdmFsdWUgYXQgdGhlIGdpdmVuIGtleVxuICAgICAqL1xuICAgIFNlYXJjaGFibGVNYXAucHJvdG90eXBlLmZldGNoID0gZnVuY3Rpb24gKGtleSwgaW5pdGlhbCkge1xuICAgICAgICBpZiAodHlwZW9mIGtleSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigna2V5IG11c3QgYmUgYSBzdHJpbmcnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zaXplID0gdW5kZWZpbmVkO1xuICAgICAgICB2YXIgbm9kZSA9IGNyZWF0ZVBhdGgodGhpcy5fdHJlZSwga2V5KTtcbiAgICAgICAgdmFyIHZhbHVlID0gbm9kZS5nZXQoTEVBRik7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBub2RlLnNldChMRUFGLCB2YWx1ZSA9IGluaXRpYWwoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9NYXAvdmFsdWVzXG4gICAgICogQHJldHVybiBBbiBgSXRlcmFibGVgIGl0ZXJhdGluZyB0aHJvdWdoIHZhbHVlcy5cbiAgICAgKi9cbiAgICBTZWFyY2hhYmxlTWFwLnByb3RvdHlwZS52YWx1ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVHJlZUl0ZXJhdG9yKHRoaXMsIFZBTFVFUyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hcC9AQGl0ZXJhdG9yXG4gICAgICovXG4gICAgU2VhcmNoYWJsZU1hcC5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW50cmllcygpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHtAbGluayBTZWFyY2hhYmxlTWFwfSBmcm9tIGFuIGBJdGVyYWJsZWAgb2YgZW50cmllc1xuICAgICAqXG4gICAgICogQHBhcmFtIGVudHJpZXMgIEVudHJpZXMgdG8gYmUgaW5zZXJ0ZWQgaW4gdGhlIHtAbGluayBTZWFyY2hhYmxlTWFwfVxuICAgICAqIEByZXR1cm4gQSBuZXcge0BsaW5rIFNlYXJjaGFibGVNYXB9IHdpdGggdGhlIGdpdmVuIGVudHJpZXNcbiAgICAgKi9cbiAgICBTZWFyY2hhYmxlTWFwLmZyb20gPSBmdW5jdGlvbiAoZW50cmllcykge1xuICAgICAgICB2YXIgZV8zLCBfYTtcbiAgICAgICAgdmFyIHRyZWUgPSBuZXcgU2VhcmNoYWJsZU1hcCgpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgZW50cmllc18xID0gX192YWx1ZXMoZW50cmllcyksIGVudHJpZXNfMV8xID0gZW50cmllc18xLm5leHQoKTsgIWVudHJpZXNfMV8xLmRvbmU7IGVudHJpZXNfMV8xID0gZW50cmllc18xLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciBfYiA9IF9fcmVhZChlbnRyaWVzXzFfMS52YWx1ZSwgMiksIGtleSA9IF9iWzBdLCB2YWx1ZSA9IF9iWzFdO1xuICAgICAgICAgICAgICAgIHRyZWUuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlXzNfMSkgeyBlXzMgPSB7IGVycm9yOiBlXzNfMSB9OyB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoZW50cmllc18xXzEgJiYgIWVudHJpZXNfMV8xLmRvbmUgJiYgKF9hID0gZW50cmllc18xLnJldHVybikpIF9hLmNhbGwoZW50cmllc18xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8zKSB0aHJvdyBlXzMuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJlZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSB7QGxpbmsgU2VhcmNoYWJsZU1hcH0gZnJvbSB0aGUgaXRlcmFibGUgcHJvcGVydGllcyBvZiBhIEphdmFTY3JpcHQgb2JqZWN0XG4gICAgICpcbiAgICAgKiBAcGFyYW0gb2JqZWN0ICBPYmplY3Qgb2YgZW50cmllcyBmb3IgdGhlIHtAbGluayBTZWFyY2hhYmxlTWFwfVxuICAgICAqIEByZXR1cm4gQSBuZXcge0BsaW5rIFNlYXJjaGFibGVNYXB9IHdpdGggdGhlIGdpdmVuIGVudHJpZXNcbiAgICAgKi9cbiAgICBTZWFyY2hhYmxlTWFwLmZyb21PYmplY3QgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgICAgIHJldHVybiBTZWFyY2hhYmxlTWFwLmZyb20oT2JqZWN0LmVudHJpZXMob2JqZWN0KSk7XG4gICAgfTtcbiAgICByZXR1cm4gU2VhcmNoYWJsZU1hcDtcbn0oKSk7XG52YXIgdHJhY2tEb3duID0gZnVuY3Rpb24gKHRyZWUsIGtleSwgcGF0aCkge1xuICAgIHZhciBlXzQsIF9hO1xuICAgIGlmIChwYXRoID09PSB2b2lkIDApIHsgcGF0aCA9IFtdOyB9XG4gICAgaWYgKGtleS5sZW5ndGggPT09IDAgfHwgdHJlZSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBbdHJlZSwgcGF0aF07XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9iID0gX192YWx1ZXModHJlZS5rZXlzKCkpLCBfYyA9IF9iLm5leHQoKTsgIV9jLmRvbmU7IF9jID0gX2IubmV4dCgpKSB7XG4gICAgICAgICAgICB2YXIgayA9IF9jLnZhbHVlO1xuICAgICAgICAgICAgaWYgKGsgIT09IExFQUYgJiYga2V5LnN0YXJ0c1dpdGgoaykpIHtcbiAgICAgICAgICAgICAgICBwYXRoLnB1c2goW3RyZWUsIGtdKTsgLy8gcGVyZm9ybWFuY2U6IHVwZGF0ZSBpbiBwbGFjZVxuICAgICAgICAgICAgICAgIHJldHVybiB0cmFja0Rvd24odHJlZS5nZXQoayksIGtleS5zbGljZShrLmxlbmd0aCksIHBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlXzRfMSkgeyBlXzQgPSB7IGVycm9yOiBlXzRfMSB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoX2MgJiYgIV9jLmRvbmUgJiYgKF9hID0gX2IucmV0dXJuKSkgX2EuY2FsbChfYik7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlXzQpIHRocm93IGVfNC5lcnJvcjsgfVxuICAgIH1cbiAgICBwYXRoLnB1c2goW3RyZWUsIGtleV0pOyAvLyBwZXJmb3JtYW5jZTogdXBkYXRlIGluIHBsYWNlXG4gICAgcmV0dXJuIHRyYWNrRG93bih1bmRlZmluZWQsICcnLCBwYXRoKTtcbn07XG52YXIgbG9va3VwID0gZnVuY3Rpb24gKHRyZWUsIGtleSkge1xuICAgIHZhciBlXzUsIF9hO1xuICAgIGlmIChrZXkubGVuZ3RoID09PSAwIHx8IHRyZWUgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdHJlZTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgX2IgPSBfX3ZhbHVlcyh0cmVlLmtleXMoKSksIF9jID0gX2IubmV4dCgpOyAhX2MuZG9uZTsgX2MgPSBfYi5uZXh0KCkpIHtcbiAgICAgICAgICAgIHZhciBrID0gX2MudmFsdWU7XG4gICAgICAgICAgICBpZiAoayAhPT0gTEVBRiAmJiBrZXkuc3RhcnRzV2l0aChrKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBsb29rdXAodHJlZS5nZXQoayksIGtleS5zbGljZShrLmxlbmd0aCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlXzVfMSkgeyBlXzUgPSB7IGVycm9yOiBlXzVfMSB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoX2MgJiYgIV9jLmRvbmUgJiYgKF9hID0gX2IucmV0dXJuKSkgX2EuY2FsbChfYik7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlXzUpIHRocm93IGVfNS5lcnJvcjsgfVxuICAgIH1cbn07XG4vLyBDcmVhdGUgYSBwYXRoIGluIHRoZSByYWRpeCB0cmVlIGZvciB0aGUgZ2l2ZW4ga2V5LCBhbmQgcmV0dXJucyB0aGUgZGVlcGVzdFxuLy8gbm9kZS4gVGhpcyBmdW5jdGlvbiBpcyBpbiB0aGUgaG90IHBhdGggZm9yIGluZGV4aW5nLiBJdCBhdm9pZHMgdW5uZWNlc3Nhcnlcbi8vIHN0cmluZyBvcGVyYXRpb25zIGFuZCByZWN1cnNpb24gZm9yIHBlcmZvcm1hbmNlLlxudmFyIGNyZWF0ZVBhdGggPSBmdW5jdGlvbiAobm9kZSwga2V5KSB7XG4gICAgdmFyIGVfNiwgX2E7XG4gICAgdmFyIGtleUxlbmd0aCA9IGtleS5sZW5ndGg7XG4gICAgb3V0ZXI6IGZvciAodmFyIHBvcyA9IDA7IG5vZGUgJiYgcG9zIDwga2V5TGVuZ3RoOykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2IgPSAoZV82ID0gdm9pZCAwLCBfX3ZhbHVlcyhub2RlLmtleXMoKSkpLCBfYyA9IF9iLm5leHQoKTsgIV9jLmRvbmU7IF9jID0gX2IubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGsgPSBfYy52YWx1ZTtcbiAgICAgICAgICAgICAgICAvLyBDaGVjayB3aGV0aGVyIHRoaXMga2V5IGlzIGEgY2FuZGlkYXRlOiB0aGUgZmlyc3QgY2hhcmFjdGVycyBtdXN0IG1hdGNoLlxuICAgICAgICAgICAgICAgIGlmIChrICE9PSBMRUFGICYmIGtleVtwb3NdID09PSBrWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsZW4gPSBNYXRoLm1pbihrZXlMZW5ndGggLSBwb3MsIGsubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gQWR2YW5jZSBvZmZzZXQgdG8gdGhlIHBvaW50IHdoZXJlIGtleSBhbmQgayBubyBsb25nZXIgbWF0Y2guXG4gICAgICAgICAgICAgICAgICAgIHZhciBvZmZzZXQgPSAxO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAob2Zmc2V0IDwgbGVuICYmIGtleVtwb3MgKyBvZmZzZXRdID09PSBrW29mZnNldF0pXG4gICAgICAgICAgICAgICAgICAgICAgICArK29mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNoaWxkXzEgPSBub2RlLmdldChrKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9mZnNldCA9PT0gay5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSBleGlzdGluZyBrZXkgaXMgc2hvcnRlciB0aGFuIHRoZSBrZXkgd2UgbmVlZCB0byBjcmVhdGUuXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gY2hpbGRfMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBhcnRpYWwgbWF0Y2g6IHdlIG5lZWQgdG8gaW5zZXJ0IGFuIGludGVybWVkaWF0ZSBub2RlIHRvIGNvbnRhaW5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJvdGggdGhlIGV4aXN0aW5nIHN1YnRyZWUgYW5kIHRoZSBuZXcgbm9kZS5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnRlcm1lZGlhdGUgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnRlcm1lZGlhdGUuc2V0KGsuc2xpY2Uob2Zmc2V0KSwgY2hpbGRfMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnNldChrZXkuc2xpY2UocG9zLCBwb3MgKyBvZmZzZXQpLCBpbnRlcm1lZGlhdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5kZWxldGUoayk7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gaW50ZXJtZWRpYXRlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHBvcyArPSBvZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlIG91dGVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV82XzEpIHsgZV82ID0geyBlcnJvcjogZV82XzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKF9jICYmICFfYy5kb25lICYmIChfYSA9IF9iLnJldHVybikpIF9hLmNhbGwoX2IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzYpIHRocm93IGVfNi5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgICAgIC8vIENyZWF0ZSBhIGZpbmFsIGNoaWxkIG5vZGUgdG8gY29udGFpbiB0aGUgZmluYWwgc3VmZml4IG9mIHRoZSBrZXkuXG4gICAgICAgIHZhciBjaGlsZCA9IG5ldyBNYXAoKTtcbiAgICAgICAgbm9kZS5zZXQoa2V5LnNsaWNlKHBvcyksIGNoaWxkKTtcbiAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbn07XG52YXIgcmVtb3ZlID0gZnVuY3Rpb24gKHRyZWUsIGtleSkge1xuICAgIHZhciBfYSA9IF9fcmVhZCh0cmFja0Rvd24odHJlZSwga2V5KSwgMiksIG5vZGUgPSBfYVswXSwgcGF0aCA9IF9hWzFdO1xuICAgIGlmIChub2RlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBub2RlLmRlbGV0ZShMRUFGKTtcbiAgICBpZiAobm9kZS5zaXplID09PSAwKSB7XG4gICAgICAgIGNsZWFudXAocGF0aCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKG5vZGUuc2l6ZSA9PT0gMSkge1xuICAgICAgICB2YXIgX2IgPSBfX3JlYWQobm9kZS5lbnRyaWVzKCkubmV4dCgpLnZhbHVlLCAyKSwga2V5XzEgPSBfYlswXSwgdmFsdWUgPSBfYlsxXTtcbiAgICAgICAgbWVyZ2UocGF0aCwga2V5XzEsIHZhbHVlKTtcbiAgICB9XG59O1xudmFyIGNsZWFudXAgPSBmdW5jdGlvbiAocGF0aCkge1xuICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBfYSA9IF9fcmVhZChsYXN0KHBhdGgpLCAyKSwgbm9kZSA9IF9hWzBdLCBrZXkgPSBfYVsxXTtcbiAgICBub2RlLmRlbGV0ZShrZXkpO1xuICAgIGlmIChub2RlLnNpemUgPT09IDApIHtcbiAgICAgICAgY2xlYW51cChwYXRoLnNsaWNlKDAsIC0xKSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKG5vZGUuc2l6ZSA9PT0gMSkge1xuICAgICAgICB2YXIgX2IgPSBfX3JlYWQobm9kZS5lbnRyaWVzKCkubmV4dCgpLnZhbHVlLCAyKSwga2V5XzIgPSBfYlswXSwgdmFsdWUgPSBfYlsxXTtcbiAgICAgICAgaWYgKGtleV8yICE9PSBMRUFGKSB7XG4gICAgICAgICAgICBtZXJnZShwYXRoLnNsaWNlKDAsIC0xKSwga2V5XzIsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG52YXIgbWVyZ2UgPSBmdW5jdGlvbiAocGF0aCwga2V5LCB2YWx1ZSkge1xuICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBfYSA9IF9fcmVhZChsYXN0KHBhdGgpLCAyKSwgbm9kZSA9IF9hWzBdLCBub2RlS2V5ID0gX2FbMV07XG4gICAgbm9kZS5zZXQobm9kZUtleSArIGtleSwgdmFsdWUpO1xuICAgIG5vZGUuZGVsZXRlKG5vZGVLZXkpO1xufTtcbnZhciBsYXN0ID0gZnVuY3Rpb24gKGFycmF5KSB7XG4gICAgcmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdO1xufTtcblxudmFyIF9hO1xudmFyIE9SID0gJ29yJztcbnZhciBBTkQgPSAnYW5kJztcbnZhciBBTkRfTk9UID0gJ2FuZF9ub3QnO1xuLyoqXG4gKiB7QGxpbmsgTWluaVNlYXJjaH0gaXMgdGhlIG1haW4gZW50cnlwb2ludCBjbGFzcywgaW1wbGVtZW50aW5nIGEgZnVsbC10ZXh0XG4gKiBzZWFyY2ggZW5naW5lIGluIG1lbW9yeS5cbiAqXG4gKiBAdHlwZVBhcmFtIFQgIFRoZSB0eXBlIG9mIHRoZSBkb2N1bWVudHMgYmVpbmcgaW5kZXhlZC5cbiAqXG4gKiAjIyMgQmFzaWMgZXhhbXBsZTpcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBjb25zdCBkb2N1bWVudHMgPSBbXG4gKiAgIHtcbiAqICAgICBpZDogMSxcbiAqICAgICB0aXRsZTogJ01vYnkgRGljaycsXG4gKiAgICAgdGV4dDogJ0NhbGwgbWUgSXNobWFlbC4gU29tZSB5ZWFycyBhZ28uLi4nLFxuICogICAgIGNhdGVnb3J5OiAnZmljdGlvbidcbiAqICAgfSxcbiAqICAge1xuICogICAgIGlkOiAyLFxuICogICAgIHRpdGxlOiAnWmVuIGFuZCB0aGUgQXJ0IG9mIE1vdG9yY3ljbGUgTWFpbnRlbmFuY2UnLFxuICogICAgIHRleHQ6ICdJIGNhbiBzZWUgYnkgbXkgd2F0Y2guLi4nLFxuICogICAgIGNhdGVnb3J5OiAnZmljdGlvbidcbiAqICAgfSxcbiAqICAge1xuICogICAgIGlkOiAzLFxuICogICAgIHRpdGxlOiAnTmV1cm9tYW5jZXInLFxuICogICAgIHRleHQ6ICdUaGUgc2t5IGFib3ZlIHRoZSBwb3J0IHdhcy4uLicsXG4gKiAgICAgY2F0ZWdvcnk6ICdmaWN0aW9uJ1xuICogICB9LFxuICogICB7XG4gKiAgICAgaWQ6IDQsXG4gKiAgICAgdGl0bGU6ICdaZW4gYW5kIHRoZSBBcnQgb2YgQXJjaGVyeScsXG4gKiAgICAgdGV4dDogJ0F0IGZpcnN0IHNpZ2h0IGl0IG11c3Qgc2VlbS4uLicsXG4gKiAgICAgY2F0ZWdvcnk6ICdub24tZmljdGlvbidcbiAqICAgfSxcbiAqICAgLy8gLi4uYW5kIG1vcmVcbiAqIF1cbiAqXG4gKiAvLyBDcmVhdGUgYSBzZWFyY2ggZW5naW5lIHRoYXQgaW5kZXhlcyB0aGUgJ3RpdGxlJyBhbmQgJ3RleHQnIGZpZWxkcyBmb3JcbiAqIC8vIGZ1bGwtdGV4dCBzZWFyY2guIFNlYXJjaCByZXN1bHRzIHdpbGwgaW5jbHVkZSAndGl0bGUnIGFuZCAnY2F0ZWdvcnknIChwbHVzIHRoZVxuICogLy8gaWQgZmllbGQsIHRoYXQgaXMgYWx3YXlzIHN0b3JlZCBhbmQgcmV0dXJuZWQpXG4gKiBjb25zdCBtaW5pU2VhcmNoID0gbmV3IE1pbmlTZWFyY2goe1xuICogICBmaWVsZHM6IFsndGl0bGUnLCAndGV4dCddLFxuICogICBzdG9yZUZpZWxkczogWyd0aXRsZScsICdjYXRlZ29yeSddXG4gKiB9KVxuICpcbiAqIC8vIEFkZCBkb2N1bWVudHMgdG8gdGhlIGluZGV4XG4gKiBtaW5pU2VhcmNoLmFkZEFsbChkb2N1bWVudHMpXG4gKlxuICogLy8gU2VhcmNoIGZvciBkb2N1bWVudHM6XG4gKiBsZXQgcmVzdWx0cyA9IG1pbmlTZWFyY2guc2VhcmNoKCd6ZW4gYXJ0IG1vdG9yY3ljbGUnKVxuICogLy8gPT4gW1xuICogLy8gICB7IGlkOiAyLCB0aXRsZTogJ1plbiBhbmQgdGhlIEFydCBvZiBNb3RvcmN5Y2xlIE1haW50ZW5hbmNlJywgY2F0ZWdvcnk6ICdmaWN0aW9uJywgc2NvcmU6IDIuNzcyNTggfSxcbiAqIC8vICAgeyBpZDogNCwgdGl0bGU6ICdaZW4gYW5kIHRoZSBBcnQgb2YgQXJjaGVyeScsIGNhdGVnb3J5OiAnbm9uLWZpY3Rpb24nLCBzY29yZTogMS4zODYyOSB9XG4gKiAvLyBdXG4gKiBgYGBcbiAqL1xudmFyIE1pbmlTZWFyY2ggPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgIENvbmZpZ3VyYXRpb24gb3B0aW9uc1xuICAgICAqXG4gICAgICogIyMjIEV4YW1wbGVzOlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIC8vIENyZWF0ZSBhIHNlYXJjaCBlbmdpbmUgdGhhdCBpbmRleGVzIHRoZSAndGl0bGUnIGFuZCAndGV4dCcgZmllbGRzIG9mIHlvdXJcbiAgICAgKiAvLyBkb2N1bWVudHM6XG4gICAgICogY29uc3QgbWluaVNlYXJjaCA9IG5ldyBNaW5pU2VhcmNoKHsgZmllbGRzOiBbJ3RpdGxlJywgJ3RleHQnXSB9KVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogIyMjIElEIEZpZWxkOlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIC8vIFlvdXIgZG9jdW1lbnRzIGFyZSBhc3N1bWVkIHRvIGluY2x1ZGUgYSB1bmlxdWUgJ2lkJyBmaWVsZCwgYnV0IGlmIHlvdSB3YW50XG4gICAgICogLy8gdG8gdXNlIGEgZGlmZmVyZW50IGZpZWxkIGZvciBkb2N1bWVudCBpZGVudGlmaWNhdGlvbiwgeW91IGNhbiBzZXQgdGhlXG4gICAgICogLy8gJ2lkRmllbGQnIG9wdGlvbjpcbiAgICAgKiBjb25zdCBtaW5pU2VhcmNoID0gbmV3IE1pbmlTZWFyY2goeyBpZEZpZWxkOiAna2V5JywgZmllbGRzOiBbJ3RpdGxlJywgJ3RleHQnXSB9KVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogIyMjIE9wdGlvbnMgYW5kIGRlZmF1bHRzOlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIC8vIFRoZSBmdWxsIHNldCBvZiBvcHRpb25zIChoZXJlIHdpdGggdGhlaXIgZGVmYXVsdCB2YWx1ZSkgaXM6XG4gICAgICogY29uc3QgbWluaVNlYXJjaCA9IG5ldyBNaW5pU2VhcmNoKHtcbiAgICAgKiAgIC8vIGlkRmllbGQ6IGZpZWxkIHRoYXQgdW5pcXVlbHkgaWRlbnRpZmllcyBhIGRvY3VtZW50XG4gICAgICogICBpZEZpZWxkOiAnaWQnLFxuICAgICAqXG4gICAgICogICAvLyBleHRyYWN0RmllbGQ6IGZ1bmN0aW9uIHVzZWQgdG8gZ2V0IHRoZSB2YWx1ZSBvZiBhIGZpZWxkIGluIGEgZG9jdW1lbnQuXG4gICAgICogICAvLyBCeSBkZWZhdWx0LCBpdCBhc3N1bWVzIHRoZSBkb2N1bWVudCBpcyBhIGZsYXQgb2JqZWN0IHdpdGggZmllbGQgbmFtZXMgYXNcbiAgICAgKiAgIC8vIHByb3BlcnR5IGtleXMgYW5kIGZpZWxkIHZhbHVlcyBhcyBzdHJpbmcgcHJvcGVydHkgdmFsdWVzLCBidXQgY3VzdG9tIGxvZ2ljXG4gICAgICogICAvLyBjYW4gYmUgaW1wbGVtZW50ZWQgYnkgc2V0dGluZyB0aGlzIG9wdGlvbiB0byBhIGN1c3RvbSBleHRyYWN0b3IgZnVuY3Rpb24uXG4gICAgICogICBleHRyYWN0RmllbGQ6IChkb2N1bWVudCwgZmllbGROYW1lKSA9PiBkb2N1bWVudFtmaWVsZE5hbWVdLFxuICAgICAqXG4gICAgICogICAvLyB0b2tlbml6ZTogZnVuY3Rpb24gdXNlZCB0byBzcGxpdCBmaWVsZHMgaW50byBpbmRpdmlkdWFsIHRlcm1zLiBCeVxuICAgICAqICAgLy8gZGVmYXVsdCwgaXQgaXMgYWxzbyB1c2VkIHRvIHRva2VuaXplIHNlYXJjaCBxdWVyaWVzLCB1bmxlc3MgYSBzcGVjaWZpY1xuICAgICAqICAgLy8gYHRva2VuaXplYCBzZWFyY2ggb3B0aW9uIGlzIHN1cHBsaWVkLiBXaGVuIHRva2VuaXppbmcgYW4gaW5kZXhlZCBmaWVsZCxcbiAgICAgKiAgIC8vIHRoZSBmaWVsZCBuYW1lIGlzIHBhc3NlZCBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50LlxuICAgICAqICAgdG9rZW5pemU6IChzdHJpbmcsIF9maWVsZE5hbWUpID0+IHN0cmluZy5zcGxpdChTUEFDRV9PUl9QVU5DVFVBVElPTiksXG4gICAgICpcbiAgICAgKiAgIC8vIHByb2Nlc3NUZXJtOiBmdW5jdGlvbiB1c2VkIHRvIHByb2Nlc3MgZWFjaCB0b2tlbml6ZWQgdGVybSBiZWZvcmVcbiAgICAgKiAgIC8vIGluZGV4aW5nLiBJdCBjYW4gYmUgdXNlZCBmb3Igc3RlbW1pbmcgYW5kIG5vcm1hbGl6YXRpb24uIFJldHVybiBhIGZhbHN5XG4gICAgICogICAvLyB2YWx1ZSBpbiBvcmRlciB0byBkaXNjYXJkIGEgdGVybS4gQnkgZGVmYXVsdCwgaXQgaXMgYWxzbyB1c2VkIHRvIHByb2Nlc3NcbiAgICAgKiAgIC8vIHNlYXJjaCBxdWVyaWVzLCB1bmxlc3MgYSBzcGVjaWZpYyBgcHJvY2Vzc1Rlcm1gIG9wdGlvbiBpcyBzdXBwbGllZCBhcyBhXG4gICAgICogICAvLyBzZWFyY2ggb3B0aW9uLiBXaGVuIHByb2Nlc3NpbmcgYSB0ZXJtIGZyb20gYSBpbmRleGVkIGZpZWxkLCB0aGUgZmllbGRcbiAgICAgKiAgIC8vIG5hbWUgaXMgcGFzc2VkIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQuXG4gICAgICogICBwcm9jZXNzVGVybTogKHRlcm0sIF9maWVsZE5hbWUpID0+IHRlcm0udG9Mb3dlckNhc2UoKSxcbiAgICAgKlxuICAgICAqICAgLy8gc2VhcmNoT3B0aW9uczogZGVmYXVsdCBzZWFyY2ggb3B0aW9ucywgc2VlIHRoZSBgc2VhcmNoYCBtZXRob2QgZm9yXG4gICAgICogICAvLyBkZXRhaWxzXG4gICAgICogICBzZWFyY2hPcHRpb25zOiB1bmRlZmluZWQsXG4gICAgICpcbiAgICAgKiAgIC8vIGZpZWxkczogZG9jdW1lbnQgZmllbGRzIHRvIGJlIGluZGV4ZWQuIE1hbmRhdG9yeSwgYnV0IG5vdCBzZXQgYnkgZGVmYXVsdFxuICAgICAqICAgZmllbGRzOiB1bmRlZmluZWRcbiAgICAgKlxuICAgICAqICAgLy8gc3RvcmVGaWVsZHM6IGRvY3VtZW50IGZpZWxkcyB0byBiZSBzdG9yZWQgYW5kIHJldHVybmVkIGFzIHBhcnQgb2YgdGhlXG4gICAgICogICAvLyBzZWFyY2ggcmVzdWx0cy5cbiAgICAgKiAgIHN0b3JlRmllbGRzOiBbXVxuICAgICAqIH0pXG4gICAgICogYGBgXG4gICAgICovXG4gICAgZnVuY3Rpb24gTWluaVNlYXJjaChvcHRpb25zKSB7XG4gICAgICAgIGlmICgob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmZpZWxkcykgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaW5pU2VhcmNoOiBvcHRpb24gXCJmaWVsZHNcIiBtdXN0IGJlIHByb3ZpZGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGF1dG9WYWN1dW0gPSAob3B0aW9ucy5hdXRvVmFjdXVtID09IG51bGwgfHwgb3B0aW9ucy5hdXRvVmFjdXVtID09PSB0cnVlKSA/IGRlZmF1bHRBdXRvVmFjdXVtT3B0aW9ucyA6IG9wdGlvbnMuYXV0b1ZhY3V1bTtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IF9fYXNzaWduKF9fYXNzaWduKF9fYXNzaWduKHt9LCBkZWZhdWx0T3B0aW9ucyksIG9wdGlvbnMpLCB7IGF1dG9WYWN1dW06IGF1dG9WYWN1dW0sIHNlYXJjaE9wdGlvbnM6IF9fYXNzaWduKF9fYXNzaWduKHt9LCBkZWZhdWx0U2VhcmNoT3B0aW9ucyksIChvcHRpb25zLnNlYXJjaE9wdGlvbnMgfHwge30pKSwgYXV0b1N1Z2dlc3RPcHRpb25zOiBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZGVmYXVsdEF1dG9TdWdnZXN0T3B0aW9ucyksIChvcHRpb25zLmF1dG9TdWdnZXN0T3B0aW9ucyB8fCB7fSkpIH0pO1xuICAgICAgICB0aGlzLl9pbmRleCA9IG5ldyBTZWFyY2hhYmxlTWFwKCk7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50Q291bnQgPSAwO1xuICAgICAgICB0aGlzLl9kb2N1bWVudElkcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5faWRUb1Nob3J0SWQgPSBuZXcgTWFwKCk7XG4gICAgICAgIC8vIEZpZWxkcyBhcmUgZGVmaW5lZCBkdXJpbmcgaW5pdGlhbGl6YXRpb24sIGRvbid0IGNoYW5nZSwgYXJlIGZldyBpblxuICAgICAgICAvLyBudW1iZXIsIHJhcmVseSBuZWVkIGl0ZXJhdGluZyBvdmVyLCBhbmQgaGF2ZSBzdHJpbmcga2V5cy4gVGhlcmVmb3JlIGluXG4gICAgICAgIC8vIHRoaXMgY2FzZSBhbiBvYmplY3QgaXMgYSBiZXR0ZXIgY2FuZGlkYXRlIHRoYW4gYSBNYXAgdG8gc3RvcmUgdGhlIG1hcHBpbmdcbiAgICAgICAgLy8gZnJvbSBmaWVsZCBrZXkgdG8gSUQuXG4gICAgICAgIHRoaXMuX2ZpZWxkSWRzID0ge307XG4gICAgICAgIHRoaXMuX2ZpZWxkTGVuZ3RoID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLl9hdmdGaWVsZExlbmd0aCA9IFtdO1xuICAgICAgICB0aGlzLl9uZXh0SWQgPSAwO1xuICAgICAgICB0aGlzLl9zdG9yZWRGaWVsZHMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuX2RpcnRDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRWYWN1dW0gPSBudWxsO1xuICAgICAgICB0aGlzLl9lbnF1ZXVlZFZhY3V1bSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2VucXVldWVkVmFjdXVtQ29uZGl0aW9ucyA9IGRlZmF1bHRWYWN1dW1Db25kaXRpb25zO1xuICAgICAgICB0aGlzLmFkZEZpZWxkcyh0aGlzLl9vcHRpb25zLmZpZWxkcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBkb2N1bWVudCB0byB0aGUgaW5kZXhcbiAgICAgKlxuICAgICAqIEBwYXJhbSBkb2N1bWVudCAgVGhlIGRvY3VtZW50IHRvIGJlIGluZGV4ZWRcbiAgICAgKi9cbiAgICBNaW5pU2VhcmNoLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoZG9jdW1lbnQpIHtcbiAgICAgICAgdmFyIGVfMSwgX2EsIGVfMiwgX2IsIGVfMywgX2M7XG4gICAgICAgIHZhciBfZCA9IHRoaXMuX29wdGlvbnMsIGV4dHJhY3RGaWVsZCA9IF9kLmV4dHJhY3RGaWVsZCwgdG9rZW5pemUgPSBfZC50b2tlbml6ZSwgcHJvY2Vzc1Rlcm0gPSBfZC5wcm9jZXNzVGVybSwgZmllbGRzID0gX2QuZmllbGRzLCBpZEZpZWxkID0gX2QuaWRGaWVsZDtcbiAgICAgICAgdmFyIGlkID0gZXh0cmFjdEZpZWxkKGRvY3VtZW50LCBpZEZpZWxkKTtcbiAgICAgICAgaWYgKGlkID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pbmlTZWFyY2g6IGRvY3VtZW50IGRvZXMgbm90IGhhdmUgSUQgZmllbGQgXFxcIlwiLmNvbmNhdChpZEZpZWxkLCBcIlxcXCJcIikpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9pZFRvU2hvcnRJZC5oYXMoaWQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaW5pU2VhcmNoOiBkdXBsaWNhdGUgSUQgXCIuY29uY2F0KGlkKSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNob3J0RG9jdW1lbnRJZCA9IHRoaXMuYWRkRG9jdW1lbnRJZChpZCk7XG4gICAgICAgIHRoaXMuc2F2ZVN0b3JlZEZpZWxkcyhzaG9ydERvY3VtZW50SWQsIGRvY3VtZW50KTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIGZpZWxkc18xID0gX192YWx1ZXMoZmllbGRzKSwgZmllbGRzXzFfMSA9IGZpZWxkc18xLm5leHQoKTsgIWZpZWxkc18xXzEuZG9uZTsgZmllbGRzXzFfMSA9IGZpZWxkc18xLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciBmaWVsZCA9IGZpZWxkc18xXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgdmFyIGZpZWxkVmFsdWUgPSBleHRyYWN0RmllbGQoZG9jdW1lbnQsIGZpZWxkKTtcbiAgICAgICAgICAgICAgICBpZiAoZmllbGRWYWx1ZSA9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB2YXIgdG9rZW5zID0gdG9rZW5pemUoZmllbGRWYWx1ZS50b1N0cmluZygpLCBmaWVsZCk7XG4gICAgICAgICAgICAgICAgdmFyIGZpZWxkSWQgPSB0aGlzLl9maWVsZElkc1tmaWVsZF07XG4gICAgICAgICAgICAgICAgdmFyIHVuaXF1ZVRlcm1zID0gbmV3IFNldCh0b2tlbnMpLnNpemU7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRGaWVsZExlbmd0aChzaG9ydERvY3VtZW50SWQsIGZpZWxkSWQsIHRoaXMuX2RvY3VtZW50Q291bnQgLSAxLCB1bmlxdWVUZXJtcyk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgdG9rZW5zXzEgPSAoZV8yID0gdm9pZCAwLCBfX3ZhbHVlcyh0b2tlbnMpKSwgdG9rZW5zXzFfMSA9IHRva2Vuc18xLm5leHQoKTsgIXRva2Vuc18xXzEuZG9uZTsgdG9rZW5zXzFfMSA9IHRva2Vuc18xLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRlcm0gPSB0b2tlbnNfMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NlZFRlcm0gPSBwcm9jZXNzVGVybSh0ZXJtLCBmaWVsZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9jZXNzZWRUZXJtKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHByb2Nlc3NlZFRlcm1fMSA9IChlXzMgPSB2b2lkIDAsIF9fdmFsdWVzKHByb2Nlc3NlZFRlcm0pKSwgcHJvY2Vzc2VkVGVybV8xXzEgPSBwcm9jZXNzZWRUZXJtXzEubmV4dCgpOyAhcHJvY2Vzc2VkVGVybV8xXzEuZG9uZTsgcHJvY2Vzc2VkVGVybV8xXzEgPSBwcm9jZXNzZWRUZXJtXzEubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IHByb2Nlc3NlZFRlcm1fMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRUZXJtKGZpZWxkSWQsIHNob3J0RG9jdW1lbnRJZCwgdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVfM18xKSB7IGVfMyA9IHsgZXJyb3I6IGVfM18xIH07IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzZWRUZXJtXzFfMSAmJiAhcHJvY2Vzc2VkVGVybV8xXzEuZG9uZSAmJiAoX2MgPSBwcm9jZXNzZWRUZXJtXzEucmV0dXJuKSkgX2MuY2FsbChwcm9jZXNzZWRUZXJtXzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8zKSB0aHJvdyBlXzMuZXJyb3I7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChwcm9jZXNzZWRUZXJtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRUZXJtKGZpZWxkSWQsIHNob3J0RG9jdW1lbnRJZCwgcHJvY2Vzc2VkVGVybSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVfMl8xKSB7IGVfMiA9IHsgZXJyb3I6IGVfMl8xIH07IH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbnNfMV8xICYmICF0b2tlbnNfMV8xLmRvbmUgJiYgKF9iID0gdG9rZW5zXzEucmV0dXJuKSkgX2IuY2FsbCh0b2tlbnNfMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzIpIHRocm93IGVfMi5lcnJvcjsgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV8xXzEpIHsgZV8xID0geyBlcnJvcjogZV8xXzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKGZpZWxkc18xXzEgJiYgIWZpZWxkc18xXzEuZG9uZSAmJiAoX2EgPSBmaWVsZHNfMS5yZXR1cm4pKSBfYS5jYWxsKGZpZWxkc18xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogQWRkcyBhbGwgdGhlIGdpdmVuIGRvY3VtZW50cyB0byB0aGUgaW5kZXhcbiAgICAgKlxuICAgICAqIEBwYXJhbSBkb2N1bWVudHMgIEFuIGFycmF5IG9mIGRvY3VtZW50cyB0byBiZSBpbmRleGVkXG4gICAgICovXG4gICAgTWluaVNlYXJjaC5wcm90b3R5cGUuYWRkQWxsID0gZnVuY3Rpb24gKGRvY3VtZW50cykge1xuICAgICAgICB2YXIgZV80LCBfYTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIGRvY3VtZW50c18xID0gX192YWx1ZXMoZG9jdW1lbnRzKSwgZG9jdW1lbnRzXzFfMSA9IGRvY3VtZW50c18xLm5leHQoKTsgIWRvY3VtZW50c18xXzEuZG9uZTsgZG9jdW1lbnRzXzFfMSA9IGRvY3VtZW50c18xLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciBkb2N1bWVudF8xID0gZG9jdW1lbnRzXzFfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZChkb2N1bWVudF8xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV80XzEpIHsgZV80ID0geyBlcnJvcjogZV80XzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50c18xXzEgJiYgIWRvY3VtZW50c18xXzEuZG9uZSAmJiAoX2EgPSBkb2N1bWVudHNfMS5yZXR1cm4pKSBfYS5jYWxsKGRvY3VtZW50c18xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV80KSB0aHJvdyBlXzQuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogQWRkcyBhbGwgdGhlIGdpdmVuIGRvY3VtZW50cyB0byB0aGUgaW5kZXggYXN5bmNocm9ub3VzbHkuXG4gICAgICpcbiAgICAgKiBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzICh0byBgdW5kZWZpbmVkYCkgd2hlbiB0aGUgaW5kZXhpbmcgaXMgZG9uZS5cbiAgICAgKiBUaGlzIG1ldGhvZCBpcyB1c2VmdWwgd2hlbiBpbmRleCBtYW55IGRvY3VtZW50cywgdG8gYXZvaWQgYmxvY2tpbmcgdGhlIG1haW5cbiAgICAgKiB0aHJlYWQuIFRoZSBpbmRleGluZyBpcyBwZXJmb3JtZWQgYXN5bmNocm9ub3VzbHkgYW5kIGluIGNodW5rcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBkb2N1bWVudHMgIEFuIGFycmF5IG9mIGRvY3VtZW50cyB0byBiZSBpbmRleGVkXG4gICAgICogQHBhcmFtIG9wdGlvbnMgIENvbmZpZ3VyYXRpb24gb3B0aW9uc1xuICAgICAqIEByZXR1cm4gQSBwcm9taXNlIHJlc29sdmluZyB0byBgdW5kZWZpbmVkYCB3aGVuIHRoZSBpbmRleGluZyBpcyBkb25lXG4gICAgICovXG4gICAgTWluaVNlYXJjaC5wcm90b3R5cGUuYWRkQWxsQXN5bmMgPSBmdW5jdGlvbiAoZG9jdW1lbnRzLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIHZhciBfYSA9IG9wdGlvbnMuY2h1bmtTaXplLCBjaHVua1NpemUgPSBfYSA9PT0gdm9pZCAwID8gMTAgOiBfYTtcbiAgICAgICAgdmFyIGFjYyA9IHsgY2h1bms6IFtdLCBwcm9taXNlOiBQcm9taXNlLnJlc29sdmUoKSB9O1xuICAgICAgICB2YXIgX2IgPSBkb2N1bWVudHMucmVkdWNlKGZ1bmN0aW9uIChfYSwgZG9jdW1lbnQsIGkpIHtcbiAgICAgICAgICAgIHZhciBjaHVuayA9IF9hLmNodW5rLCBwcm9taXNlID0gX2EucHJvbWlzZTtcbiAgICAgICAgICAgIGNodW5rLnB1c2goZG9jdW1lbnQpO1xuICAgICAgICAgICAgaWYgKChpICsgMSkgJSBjaHVua1NpemUgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBjaHVuazogW10sXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2U6IHByb21pc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJldHVybiBzZXRUaW1lb3V0KHJlc29sdmUsIDApOyB9KTsgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLmFkZEFsbChjaHVuayk7IH0pXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGNodW5rOiBjaHVuaywgcHJvbWlzZTogcHJvbWlzZSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBhY2MpLCBjaHVuayA9IF9iLmNodW5rLCBwcm9taXNlID0gX2IucHJvbWlzZTtcbiAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5hZGRBbGwoY2h1bmspOyB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIGdpdmVuIGRvY3VtZW50IGZyb20gdGhlIGluZGV4LlxuICAgICAqXG4gICAgICogVGhlIGRvY3VtZW50IHRvIHJlbW92ZSBtdXN0IE5PVCBoYXZlIGNoYW5nZWQgYmV0d2VlbiBpbmRleGluZyBhbmQgcmVtb3ZhbCxcbiAgICAgKiBvdGhlcndpc2UgdGhlIGluZGV4IHdpbGwgYmUgY29ycnVwdGVkLlxuICAgICAqXG4gICAgICogVGhpcyBtZXRob2QgcmVxdWlyZXMgcGFzc2luZyB0aGUgZnVsbCBkb2N1bWVudCB0byBiZSByZW1vdmVkIChub3QganVzdCB0aGVcbiAgICAgKiBJRCksIGFuZCBpbW1lZGlhdGVseSByZW1vdmVzIHRoZSBkb2N1bWVudCBmcm9tIHRoZSBpbnZlcnRlZCBpbmRleCwgYWxsb3dpbmdcbiAgICAgKiBtZW1vcnkgdG8gYmUgcmVsZWFzZWQuIEEgY29udmVuaWVudCBhbHRlcm5hdGl2ZSBpcyB7QGxpbmtcbiAgICAgKiBNaW5pU2VhcmNoI2Rpc2NhcmR9LCB3aGljaCBuZWVkcyBvbmx5IHRoZSBkb2N1bWVudCBJRCwgYW5kIGhhcyB0aGUgc2FtZVxuICAgICAqIHZpc2libGUgZWZmZWN0LCBidXQgZGVsYXlzIGNsZWFuaW5nIHVwIHRoZSBpbmRleCB1bnRpbCB0aGUgbmV4dCB2YWN1dW1pbmcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZG9jdW1lbnQgIFRoZSBkb2N1bWVudCB0byBiZSByZW1vdmVkXG4gICAgICovXG4gICAgTWluaVNlYXJjaC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGRvY3VtZW50KSB7XG4gICAgICAgIHZhciBlXzUsIF9hLCBlXzYsIF9iLCBlXzcsIF9jO1xuICAgICAgICB2YXIgX2QgPSB0aGlzLl9vcHRpb25zLCB0b2tlbml6ZSA9IF9kLnRva2VuaXplLCBwcm9jZXNzVGVybSA9IF9kLnByb2Nlc3NUZXJtLCBleHRyYWN0RmllbGQgPSBfZC5leHRyYWN0RmllbGQsIGZpZWxkcyA9IF9kLmZpZWxkcywgaWRGaWVsZCA9IF9kLmlkRmllbGQ7XG4gICAgICAgIHZhciBpZCA9IGV4dHJhY3RGaWVsZChkb2N1bWVudCwgaWRGaWVsZCk7XG4gICAgICAgIGlmIChpZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaW5pU2VhcmNoOiBkb2N1bWVudCBkb2VzIG5vdCBoYXZlIElEIGZpZWxkIFxcXCJcIi5jb25jYXQoaWRGaWVsZCwgXCJcXFwiXCIpKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2hvcnRJZCA9IHRoaXMuX2lkVG9TaG9ydElkLmdldChpZCk7XG4gICAgICAgIGlmIChzaG9ydElkID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pbmlTZWFyY2g6IGNhbm5vdCByZW1vdmUgZG9jdW1lbnQgd2l0aCBJRCBcIi5jb25jYXQoaWQsIFwiOiBpdCBpcyBub3QgaW4gdGhlIGluZGV4XCIpKTtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgZmllbGRzXzIgPSBfX3ZhbHVlcyhmaWVsZHMpLCBmaWVsZHNfMl8xID0gZmllbGRzXzIubmV4dCgpOyAhZmllbGRzXzJfMS5kb25lOyBmaWVsZHNfMl8xID0gZmllbGRzXzIubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpZWxkID0gZmllbGRzXzJfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICB2YXIgZmllbGRWYWx1ZSA9IGV4dHJhY3RGaWVsZChkb2N1bWVudCwgZmllbGQpO1xuICAgICAgICAgICAgICAgIGlmIChmaWVsZFZhbHVlID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIHZhciB0b2tlbnMgPSB0b2tlbml6ZShmaWVsZFZhbHVlLnRvU3RyaW5nKCksIGZpZWxkKTtcbiAgICAgICAgICAgICAgICB2YXIgZmllbGRJZCA9IHRoaXMuX2ZpZWxkSWRzW2ZpZWxkXTtcbiAgICAgICAgICAgICAgICB2YXIgdW5pcXVlVGVybXMgPSBuZXcgU2V0KHRva2Vucykuc2l6ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUZpZWxkTGVuZ3RoKHNob3J0SWQsIGZpZWxkSWQsIHRoaXMuX2RvY3VtZW50Q291bnQsIHVuaXF1ZVRlcm1zKTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB0b2tlbnNfMiA9IChlXzYgPSB2b2lkIDAsIF9fdmFsdWVzKHRva2VucykpLCB0b2tlbnNfMl8xID0gdG9rZW5zXzIubmV4dCgpOyAhdG9rZW5zXzJfMS5kb25lOyB0b2tlbnNfMl8xID0gdG9rZW5zXzIubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGVybSA9IHRva2Vuc18yXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvY2Vzc2VkVGVybSA9IHByb2Nlc3NUZXJtKHRlcm0sIGZpZWxkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHByb2Nlc3NlZFRlcm0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcHJvY2Vzc2VkVGVybV8yID0gKGVfNyA9IHZvaWQgMCwgX192YWx1ZXMocHJvY2Vzc2VkVGVybSkpLCBwcm9jZXNzZWRUZXJtXzJfMSA9IHByb2Nlc3NlZFRlcm1fMi5uZXh0KCk7ICFwcm9jZXNzZWRUZXJtXzJfMS5kb25lOyBwcm9jZXNzZWRUZXJtXzJfMSA9IHByb2Nlc3NlZFRlcm1fMi5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ID0gcHJvY2Vzc2VkVGVybV8yXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVRlcm0oZmllbGRJZCwgc2hvcnRJZCwgdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVfN18xKSB7IGVfNyA9IHsgZXJyb3I6IGVfN18xIH07IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzZWRUZXJtXzJfMSAmJiAhcHJvY2Vzc2VkVGVybV8yXzEuZG9uZSAmJiAoX2MgPSBwcm9jZXNzZWRUZXJtXzIucmV0dXJuKSkgX2MuY2FsbChwcm9jZXNzZWRUZXJtXzIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV83KSB0aHJvdyBlXzcuZXJyb3I7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChwcm9jZXNzZWRUZXJtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVUZXJtKGZpZWxkSWQsIHNob3J0SWQsIHByb2Nlc3NlZFRlcm0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlXzZfMSkgeyBlXzYgPSB7IGVycm9yOiBlXzZfMSB9OyB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW5zXzJfMSAmJiAhdG9rZW5zXzJfMS5kb25lICYmIChfYiA9IHRva2Vuc18yLnJldHVybikpIF9iLmNhbGwodG9rZW5zXzIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV82KSB0aHJvdyBlXzYuZXJyb3I7IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfNV8xKSB7IGVfNSA9IHsgZXJyb3I6IGVfNV8xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChmaWVsZHNfMl8xICYmICFmaWVsZHNfMl8xLmRvbmUgJiYgKF9hID0gZmllbGRzXzIucmV0dXJuKSkgX2EuY2FsbChmaWVsZHNfMik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfNSkgdGhyb3cgZV81LmVycm9yOyB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3RvcmVkRmllbGRzLmRlbGV0ZShzaG9ydElkKTtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnRJZHMuZGVsZXRlKHNob3J0SWQpO1xuICAgICAgICB0aGlzLl9pZFRvU2hvcnRJZC5kZWxldGUoaWQpO1xuICAgICAgICB0aGlzLl9maWVsZExlbmd0aC5kZWxldGUoc2hvcnRJZCk7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50Q291bnQgLT0gMTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWxsIHRoZSBnaXZlbiBkb2N1bWVudHMgZnJvbSB0aGUgaW5kZXguIElmIGNhbGxlZCB3aXRoIG5vIGFyZ3VtZW50cyxcbiAgICAgKiBpdCByZW1vdmVzIF9hbGxfIGRvY3VtZW50cyBmcm9tIHRoZSBpbmRleC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBkb2N1bWVudHMgIFRoZSBkb2N1bWVudHMgdG8gYmUgcmVtb3ZlZC4gSWYgdGhpcyBhcmd1bWVudCBpcyBvbWl0dGVkLFxuICAgICAqIGFsbCBkb2N1bWVudHMgYXJlIHJlbW92ZWQuIE5vdGUgdGhhdCwgZm9yIHJlbW92aW5nIGFsbCBkb2N1bWVudHMsIGl0IGlzXG4gICAgICogbW9yZSBlZmZpY2llbnQgdG8gY2FsbCB0aGlzIG1ldGhvZCB3aXRoIG5vIGFyZ3VtZW50cyB0aGFuIHRvIHBhc3MgYWxsXG4gICAgICogZG9jdW1lbnRzLlxuICAgICAqL1xuICAgIE1pbmlTZWFyY2gucHJvdG90eXBlLnJlbW92ZUFsbCA9IGZ1bmN0aW9uIChkb2N1bWVudHMpIHtcbiAgICAgICAgdmFyIGVfOCwgX2E7XG4gICAgICAgIGlmIChkb2N1bWVudHMpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgZG9jdW1lbnRzXzIgPSBfX3ZhbHVlcyhkb2N1bWVudHMpLCBkb2N1bWVudHNfMl8xID0gZG9jdW1lbnRzXzIubmV4dCgpOyAhZG9jdW1lbnRzXzJfMS5kb25lOyBkb2N1bWVudHNfMl8xID0gZG9jdW1lbnRzXzIubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkb2N1bWVudF8yID0gZG9jdW1lbnRzXzJfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoZG9jdW1lbnRfMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVfOF8xKSB7IGVfOCA9IHsgZXJyb3I6IGVfOF8xIH07IH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudHNfMl8xICYmICFkb2N1bWVudHNfMl8xLmRvbmUgJiYgKF9hID0gZG9jdW1lbnRzXzIucmV0dXJuKSkgX2EuY2FsbChkb2N1bWVudHNfMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV84KSB0aHJvdyBlXzguZXJyb3I7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBkb2N1bWVudHMgdG8gYmUgcHJlc2VudC4gT21pdCB0aGUgYXJndW1lbnQgdG8gcmVtb3ZlIGFsbCBkb2N1bWVudHMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9pbmRleCA9IG5ldyBTZWFyY2hhYmxlTWFwKCk7XG4gICAgICAgICAgICB0aGlzLl9kb2N1bWVudENvdW50ID0gMDtcbiAgICAgICAgICAgIHRoaXMuX2RvY3VtZW50SWRzID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgdGhpcy5faWRUb1Nob3J0SWQgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICB0aGlzLl9maWVsZExlbmd0aCA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgIHRoaXMuX2F2Z0ZpZWxkTGVuZ3RoID0gW107XG4gICAgICAgICAgICB0aGlzLl9zdG9yZWRGaWVsZHMgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICB0aGlzLl9uZXh0SWQgPSAwO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBEaXNjYXJkcyB0aGUgZG9jdW1lbnQgd2l0aCB0aGUgZ2l2ZW4gSUQsIHNvIGl0IHdvbid0IGFwcGVhciBpbiBzZWFyY2ggcmVzdWx0c1xuICAgICAqXG4gICAgICogSXQgaGFzIHRoZSBzYW1lIHZpc2libGUgZWZmZWN0IG9mIHtAbGluayBNaW5pU2VhcmNoLnJlbW92ZX0gKGJvdGggY2F1c2UgdGhlXG4gICAgICogZG9jdW1lbnQgdG8gc3RvcCBhcHBlYXJpbmcgaW4gc2VhcmNoZXMpLCBidXQgYSBkaWZmZXJlbnQgZWZmZWN0IG9uIHRoZVxuICAgICAqIGludGVybmFsIGRhdGEgc3RydWN0dXJlczpcbiAgICAgKlxuICAgICAqICAgLSB7QGxpbmsgTWluaVNlYXJjaCNyZW1vdmV9IHJlcXVpcmVzIHBhc3NpbmcgdGhlIGZ1bGwgZG9jdW1lbnQgdG8gYmVcbiAgICAgKiAgIHJlbW92ZWQgYXMgYXJndW1lbnQsIGFuZCByZW1vdmVzIGl0IGZyb20gdGhlIGludmVydGVkIGluZGV4IGltbWVkaWF0ZWx5LlxuICAgICAqXG4gICAgICogICAtIHtAbGluayBNaW5pU2VhcmNoI2Rpc2NhcmR9IGluc3RlYWQgb25seSBuZWVkcyB0aGUgZG9jdW1lbnQgSUQsIGFuZFxuICAgICAqICAgd29ya3MgYnkgbWFya2luZyB0aGUgY3VycmVudCB2ZXJzaW9uIG9mIHRoZSBkb2N1bWVudCBhcyBkaXNjYXJkZWQsIHNvIGl0XG4gICAgICogICBpcyBpbW1lZGlhdGVseSBpZ25vcmVkIGJ5IHNlYXJjaGVzLiBUaGlzIGlzIGZhc3RlciBhbmQgbW9yZSBjb252ZW5pZW50XG4gICAgICogICB0aGFuIHtAbGluayBNaW5pU2VhcmNoI3JlbW92ZX0sIGJ1dCB0aGUgaW5kZXggaXMgbm90IGltbWVkaWF0ZWx5XG4gICAgICogICBtb2RpZmllZC4gVG8gdGFrZSBjYXJlIG9mIHRoYXQsIHZhY3V1bWluZyBpcyBwZXJmb3JtZWQgYWZ0ZXIgYSBjZXJ0YWluXG4gICAgICogICBudW1iZXIgb2YgZG9jdW1lbnRzIGFyZSBkaXNjYXJkZWQsIGNsZWFuaW5nIHVwIHRoZSBpbmRleCBhbmQgYWxsb3dpbmdcbiAgICAgKiAgIG1lbW9yeSB0byBiZSByZWxlYXNlZC5cbiAgICAgKlxuICAgICAqIEFmdGVyIGRpc2NhcmRpbmcgYSBkb2N1bWVudCwgaXQgaXMgcG9zc2libGUgdG8gcmUtYWRkIGEgbmV3IHZlcnNpb24sIGFuZFxuICAgICAqIG9ubHkgdGhlIG5ldyB2ZXJzaW9uIHdpbGwgYXBwZWFyIGluIHNlYXJjaGVzLiBJbiBvdGhlciB3b3JkcywgZGlzY2FyZGluZ1xuICAgICAqIGFuZCByZS1hZGRpbmcgYSBkb2N1bWVudCB3b3JrcyBleGFjdGx5IGxpa2UgcmVtb3ZpbmcgYW5kIHJlLWFkZGluZyBpdC4gVGhlXG4gICAgICoge0BsaW5rIE1pbmlTZWFyY2gucmVwbGFjZX0gbWV0aG9kIGNhbiBhbHNvIGJlIHVzZWQgdG8gcmVwbGFjZSBhIGRvY3VtZW50XG4gICAgICogd2l0aCBhIG5ldyB2ZXJzaW9uLlxuICAgICAqXG4gICAgICogIyMjIyBEZXRhaWxzIGFib3V0IHZhY3V1bWluZ1xuICAgICAqXG4gICAgICogUmVwZXRpdGUgY2FsbHMgdG8gdGhpcyBtZXRob2Qgd291bGQgbGVhdmUgb2Jzb2xldGUgZG9jdW1lbnQgcmVmZXJlbmNlcyBpblxuICAgICAqIHRoZSBpbmRleCwgaW52aXNpYmxlIHRvIHNlYXJjaGVzLiBUd28gbWVjaGFuaXNtcyB0YWtlIGNhcmUgb2YgY2xlYW5pbmcgdXA6XG4gICAgICogY2xlYW4gdXAgZHVyaW5nIHNlYXJjaCwgYW5kIHZhY3V1bWluZy5cbiAgICAgKlxuICAgICAqICAgLSBVcG9uIHNlYXJjaCwgd2hlbmV2ZXIgYSBkaXNjYXJkZWQgSUQgaXMgZm91bmQgKGFuZCBpZ25vcmVkIGZvciB0aGVcbiAgICAgKiAgIHJlc3VsdHMpLCByZWZlcmVuY2VzIHRvIHRoZSBkaXNjYXJkZWQgZG9jdW1lbnQgYXJlIHJlbW92ZWQgZnJvbSB0aGVcbiAgICAgKiAgIGludmVydGVkIGluZGV4IGVudHJpZXMgZm9yIHRoZSBzZWFyY2ggdGVybXMuIFRoaXMgZW5zdXJlcyB0aGF0IHN1YnNlcXVlbnRcbiAgICAgKiAgIHNlYXJjaGVzIGZvciB0aGUgc2FtZSB0ZXJtcyBkbyBub3QgbmVlZCB0byBza2lwIHRoZXNlIG9ic29sZXRlIHJlZmVyZW5jZXNcbiAgICAgKiAgIGFnYWluLlxuICAgICAqXG4gICAgICogICAtIEluIGFkZGl0aW9uLCB2YWN1dW1pbmcgaXMgcGVyZm9ybWVkIGF1dG9tYXRpY2FsbHkgYnkgZGVmYXVsdCAoc2VlIHRoZVxuICAgICAqICAgYGF1dG9WYWN1dW1gIGZpZWxkIGluIHtAbGluayBPcHRpb25zfSkgYWZ0ZXIgYSBjZXJ0YWluIG51bWJlciBvZlxuICAgICAqICAgZG9jdW1lbnRzIGFyZSBkaXNjYXJkZWQuIFZhY3V1bWluZyB0cmF2ZXJzZXMgYWxsIHRlcm1zIGluIHRoZSBpbmRleCxcbiAgICAgKiAgIGNsZWFuaW5nIHVwIGFsbCByZWZlcmVuY2VzIHRvIGRpc2NhcmRlZCBkb2N1bWVudHMuIFZhY3V1bWluZyBjYW4gYWxzbyBiZVxuICAgICAqICAgdHJpZ2dlcmVkIG1hbnVhbGx5IGJ5IGNhbGxpbmcge0BsaW5rIE1pbmlTZWFyY2gjdmFjdXVtfS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpZCAgVGhlIElEIG9mIHRoZSBkb2N1bWVudCB0byBiZSBkaXNjYXJkZWRcbiAgICAgKi9cbiAgICBNaW5pU2VhcmNoLnByb3RvdHlwZS5kaXNjYXJkID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBzaG9ydElkID0gdGhpcy5faWRUb1Nob3J0SWQuZ2V0KGlkKTtcbiAgICAgICAgaWYgKHNob3J0SWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWluaVNlYXJjaDogY2Fubm90IGRpc2NhcmQgZG9jdW1lbnQgd2l0aCBJRCBcIi5jb25jYXQoaWQsIFwiOiBpdCBpcyBub3QgaW4gdGhlIGluZGV4XCIpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pZFRvU2hvcnRJZC5kZWxldGUoaWQpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudElkcy5kZWxldGUoc2hvcnRJZCk7XG4gICAgICAgIHRoaXMuX3N0b3JlZEZpZWxkcy5kZWxldGUoc2hvcnRJZCk7XG4gICAgICAgICh0aGlzLl9maWVsZExlbmd0aC5nZXQoc2hvcnRJZCkgfHwgW10pLmZvckVhY2goZnVuY3Rpb24gKGZpZWxkTGVuZ3RoLCBmaWVsZElkKSB7XG4gICAgICAgICAgICBfdGhpcy5yZW1vdmVGaWVsZExlbmd0aChzaG9ydElkLCBmaWVsZElkLCBfdGhpcy5fZG9jdW1lbnRDb3VudCwgZmllbGRMZW5ndGgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fZmllbGRMZW5ndGguZGVsZXRlKHNob3J0SWQpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudENvdW50IC09IDE7XG4gICAgICAgIHRoaXMuX2RpcnRDb3VudCArPSAxO1xuICAgICAgICB0aGlzLm1heWJlQXV0b1ZhY3V1bSgpO1xuICAgIH07XG4gICAgTWluaVNlYXJjaC5wcm90b3R5cGUubWF5YmVBdXRvVmFjdXVtID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5hdXRvVmFjdXVtID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBfYSA9IHRoaXMuX29wdGlvbnMuYXV0b1ZhY3V1bSwgbWluRGlydEZhY3RvciA9IF9hLm1pbkRpcnRGYWN0b3IsIG1pbkRpcnRDb3VudCA9IF9hLm1pbkRpcnRDb3VudCwgYmF0Y2hTaXplID0gX2EuYmF0Y2hTaXplLCBiYXRjaFdhaXQgPSBfYS5iYXRjaFdhaXQ7XG4gICAgICAgIHRoaXMuY29uZGl0aW9uYWxWYWN1dW0oeyBiYXRjaFNpemU6IGJhdGNoU2l6ZSwgYmF0Y2hXYWl0OiBiYXRjaFdhaXQgfSwgeyBtaW5EaXJ0Q291bnQ6IG1pbkRpcnRDb3VudCwgbWluRGlydEZhY3RvcjogbWluRGlydEZhY3RvciB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIERpc2NhcmRzIHRoZSBkb2N1bWVudHMgd2l0aCB0aGUgZ2l2ZW4gSURzLCBzbyB0aGV5IHdvbid0IGFwcGVhciBpbiBzZWFyY2hcbiAgICAgKiByZXN1bHRzXG4gICAgICpcbiAgICAgKiBJdCBpcyBlcXVpdmFsZW50IHRvIGNhbGxpbmcge0BsaW5rIE1pbmlTZWFyY2gjZGlzY2FyZH0gZm9yIGFsbCB0aGUgZ2l2ZW5cbiAgICAgKiBJRHMsIGJ1dCB3aXRoIHRoZSBvcHRpbWl6YXRpb24gb2YgdHJpZ2dlcmluZyBhdCBtb3N0IG9uZSBhdXRvbWF0aWNcbiAgICAgKiB2YWN1dW1pbmcgYXQgdGhlIGVuZC5cbiAgICAgKlxuICAgICAqIE5vdGU6IHRvIHJlbW92ZSBhbGwgZG9jdW1lbnRzIGZyb20gdGhlIGluZGV4LCBpdCBpcyBmYXN0ZXIgYW5kIG1vcmVcbiAgICAgKiBjb252ZW5pZW50IHRvIGNhbGwge0BsaW5rIE1pbmlTZWFyY2gucmVtb3ZlQWxsfSB3aXRoIG5vIGFyZ3VtZW50LCBpbnN0ZWFkXG4gICAgICogb2YgcGFzc2luZyBhbGwgSURzIHRvIHRoaXMgbWV0aG9kLlxuICAgICAqL1xuICAgIE1pbmlTZWFyY2gucHJvdG90eXBlLmRpc2NhcmRBbGwgPSBmdW5jdGlvbiAoaWRzKSB7XG4gICAgICAgIHZhciBlXzksIF9hO1xuICAgICAgICB2YXIgYXV0b1ZhY3V1bSA9IHRoaXMuX29wdGlvbnMuYXV0b1ZhY3V1bTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuYXV0b1ZhY3V1bSA9IGZhbHNlO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpZHNfMSA9IF9fdmFsdWVzKGlkcyksIGlkc18xXzEgPSBpZHNfMS5uZXh0KCk7ICFpZHNfMV8xLmRvbmU7IGlkc18xXzEgPSBpZHNfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlkID0gaWRzXzFfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNjYXJkKGlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZV85XzEpIHsgZV85ID0geyBlcnJvcjogZV85XzEgfTsgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlkc18xXzEgJiYgIWlkc18xXzEuZG9uZSAmJiAoX2EgPSBpZHNfMS5yZXR1cm4pKSBfYS5jYWxsKGlkc18xKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzkpIHRocm93IGVfOS5lcnJvcjsgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5hdXRvVmFjdXVtID0gYXV0b1ZhY3V1bTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1heWJlQXV0b1ZhY3V1bSgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSXQgcmVwbGFjZXMgYW4gZXhpc3RpbmcgZG9jdW1lbnQgd2l0aCB0aGUgZ2l2ZW4gdXBkYXRlZCB2ZXJzaW9uXG4gICAgICpcbiAgICAgKiBJdCB3b3JrcyBieSBkaXNjYXJkaW5nIHRoZSBjdXJyZW50IHZlcnNpb24gYW5kIGFkZGluZyB0aGUgdXBkYXRlZCBvbmUsIHNvXG4gICAgICogaXQgaXMgZnVuY3Rpb25hbGx5IGVxdWl2YWxlbnQgdG8gY2FsbGluZyB7QGxpbmsgTWluaVNlYXJjaCNkaXNjYXJkfVxuICAgICAqIGZvbGxvd2VkIGJ5IHtAbGluayBNaW5pU2VhcmNoI2FkZH0uIFRoZSBJRCBvZiB0aGUgdXBkYXRlZCBkb2N1bWVudCBzaG91bGRcbiAgICAgKiBiZSB0aGUgc2FtZSBhcyB0aGUgb3JpZ2luYWwgb25lLlxuICAgICAqXG4gICAgICogU2luY2UgaXQgdXNlcyB7QGxpbmsgTWluaVNlYXJjaCNkaXNjYXJkfSBpbnRlcm5hbGx5LCB0aGlzIG1ldGhvZCByZWxpZXMgb25cbiAgICAgKiB2YWN1dW1pbmcgdG8gY2xlYW4gdXAgb2Jzb2xldGUgZG9jdW1lbnQgcmVmZXJlbmNlcyBmcm9tIHRoZSBpbmRleCwgYWxsb3dpbmdcbiAgICAgKiBtZW1vcnkgdG8gYmUgcmVsZWFzZWQgKHNlZSB7QGxpbmsgTWluaVNlYXJjaCNkaXNjYXJkfSkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdXBkYXRlZERvY3VtZW50ICBUaGUgdXBkYXRlZCBkb2N1bWVudCB0byByZXBsYWNlIHRoZSBvbGQgdmVyc2lvblxuICAgICAqIHdpdGhcbiAgICAgKi9cbiAgICBNaW5pU2VhcmNoLnByb3RvdHlwZS5yZXBsYWNlID0gZnVuY3Rpb24gKHVwZGF0ZWREb2N1bWVudCkge1xuICAgICAgICB2YXIgX2EgPSB0aGlzLl9vcHRpb25zLCBpZEZpZWxkID0gX2EuaWRGaWVsZCwgZXh0cmFjdEZpZWxkID0gX2EuZXh0cmFjdEZpZWxkO1xuICAgICAgICB2YXIgaWQgPSBleHRyYWN0RmllbGQodXBkYXRlZERvY3VtZW50LCBpZEZpZWxkKTtcbiAgICAgICAgdGhpcy5kaXNjYXJkKGlkKTtcbiAgICAgICAgdGhpcy5hZGQodXBkYXRlZERvY3VtZW50KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRyaWdnZXJzIGEgbWFudWFsIHZhY3V1bWluZywgY2xlYW5pbmcgdXAgcmVmZXJlbmNlcyB0byBkaXNjYXJkZWQgZG9jdW1lbnRzXG4gICAgICogZnJvbSB0aGUgaW52ZXJ0ZWQgaW5kZXhcbiAgICAgKlxuICAgICAqIFZhY3V1bWluZyBpcyBvbmx5IHVzZWZ1bCBmb3IgYXBwbGljYXRpb25zIHRoYXQgdXNlIHRoZSB7QGxpbmtcbiAgICAgKiBNaW5pU2VhcmNoI2Rpc2NhcmR9IG9yIHtAbGluayBNaW5pU2VhcmNoI3JlcGxhY2V9IG1ldGhvZHMuXG4gICAgICpcbiAgICAgKiBCeSBkZWZhdWx0LCB2YWN1dW1pbmcgaXMgcGVyZm9ybWVkIGF1dG9tYXRpY2FsbHkgd2hlbiBuZWVkZWQgKGNvbnRyb2xsZWQgYnlcbiAgICAgKiB0aGUgYGF1dG9WYWN1dW1gIGZpZWxkIGluIHtAbGluayBPcHRpb25zfSksIHNvIHRoZXJlIGlzIHVzdWFsbHkgbm8gbmVlZCB0b1xuICAgICAqIGNhbGwgdGhpcyBtZXRob2QsIHVubGVzcyBvbmUgd2FudHMgdG8gbWFrZSBzdXJlIHRvIHBlcmZvcm0gdmFjdXVtaW5nIGF0IGFcbiAgICAgKiBzcGVjaWZpYyBtb21lbnQuXG4gICAgICpcbiAgICAgKiBWYWN1dW1pbmcgdHJhdmVyc2VzIGFsbCB0ZXJtcyBpbiB0aGUgaW52ZXJ0ZWQgaW5kZXggaW4gYmF0Y2hlcywgYW5kIGNsZWFuc1xuICAgICAqIHVwIHJlZmVyZW5jZXMgdG8gZGlzY2FyZGVkIGRvY3VtZW50cyBmcm9tIHRoZSBwb3N0aW5nIGxpc3QsIGFsbG93aW5nIG1lbW9yeVxuICAgICAqIHRvIGJlIHJlbGVhc2VkLlxuICAgICAqXG4gICAgICogVGhlIG1ldGhvZCB0YWtlcyBhbiBvcHRpb25hbCBvYmplY3QgYXMgYXJndW1lbnQgd2l0aCB0aGUgZm9sbG93aW5nIGtleXM6XG4gICAgICpcbiAgICAgKiAgIC0gYGJhdGNoU2l6ZWA6IHRoZSBzaXplIG9mIGVhY2ggYmF0Y2ggKDEwMDAgYnkgZGVmYXVsdClcbiAgICAgKlxuICAgICAqICAgLSBgYmF0Y2hXYWl0YDogdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gd2FpdCBiZXR3ZWVuIGJhdGNoZXMgKDEwIGJ5XG4gICAgICogICBkZWZhdWx0KVxuICAgICAqXG4gICAgICogT24gbGFyZ2UgaW5kZXhlcywgdmFjdXVtaW5nIGNvdWxkIGhhdmUgYSBub24tbmVnbGlnaWJsZSBjb3N0OiBiYXRjaGluZ1xuICAgICAqIGF2b2lkcyBibG9ja2luZyB0aGUgdGhyZWFkIGZvciBsb25nLCBkaWx1dGluZyB0aGlzIGNvc3Qgc28gdGhhdCBpdCBpcyBub3RcbiAgICAgKiBuZWdhdGl2ZWx5IGFmZmVjdGluZyB0aGUgYXBwbGljYXRpb24uIE5vbmV0aGVsZXNzLCB0aGlzIG1ldGhvZCBzaG91bGQgb25seVxuICAgICAqIGJlIGNhbGxlZCB3aGVuIG5lY2Vzc2FyeSwgYW5kIHJlbHlpbmcgb24gYXV0b21hdGljIHZhY3V1bWluZyBpcyB1c3VhbGx5XG4gICAgICogYmV0dGVyLlxuICAgICAqXG4gICAgICogSXQgcmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyAodG8gdW5kZWZpbmVkKSB3aGVuIHRoZSBjbGVhbiB1cCBpc1xuICAgICAqIGNvbXBsZXRlZC4gSWYgdmFjdXVtaW5nIGlzIGFscmVhZHkgb25nb2luZyBhdCB0aGUgdGltZSB0aGlzIG1ldGhvZCBpc1xuICAgICAqIGNhbGxlZCwgYSBuZXcgb25lIGlzIGVucXVldWVkIGltbWVkaWF0ZWx5IGFmdGVyIHRoZSBvbmdvaW5nIG9uZSwgYW5kIGFcbiAgICAgKiBjb3JyZXNwb25kaW5nIHByb21pc2UgaXMgcmV0dXJuZWQuIEhvd2V2ZXIsIG5vIG1vcmUgdGhhbiBvbmUgdmFjdXVtaW5nIGlzXG4gICAgICogZW5xdWV1ZWQgb24gdG9wIG9mIHRoZSBvbmdvaW5nIG9uZSwgZXZlbiBpZiB0aGlzIG1ldGhvZCBpcyBjYWxsZWQgbW9yZVxuICAgICAqIHRpbWVzIChlbnF1ZXVpbmcgbXVsdGlwbGUgb25lcyB3b3VsZCBiZSB1c2VsZXNzKS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zICBDb25maWd1cmF0aW9uIG9wdGlvbnMgZm9yIHRoZSBiYXRjaCBzaXplIGFuZCBkZWxheS4gU2VlXG4gICAgICoge0BsaW5rIFZhY3V1bU9wdGlvbnN9LlxuICAgICAqL1xuICAgIE1pbmlTZWFyY2gucHJvdG90eXBlLnZhY3V1bSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmRpdGlvbmFsVmFjdXVtKG9wdGlvbnMpO1xuICAgIH07XG4gICAgTWluaVNlYXJjaC5wcm90b3R5cGUuY29uZGl0aW9uYWxWYWN1dW0gPSBmdW5jdGlvbiAob3B0aW9ucywgY29uZGl0aW9ucykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAvLyBJZiBhIHZhY3V1bSBpcyBhbHJlYWR5IG9uZ29pbmcsIHNjaGVkdWxlIGFub3RoZXIgYXMgc29vbiBhcyBpdCBmaW5pc2hlcyxcbiAgICAgICAgLy8gdW5sZXNzIHRoZXJlJ3MgYWxyZWFkeSBvbmUgZW5xdWV1ZWQuIElmIG9uZSB3YXMgYWxyZWFkeSBlbnF1ZXVlZCwgZG8gbm90XG4gICAgICAgIC8vIGVucXVldWUgYW5vdGhlciBvbiB0b3AsIGJ1dCBtYWtlIHN1cmUgdGhhdCB0aGUgY29uZGl0aW9ucyBhcmUgdGhlXG4gICAgICAgIC8vIGJyb2FkZXN0LlxuICAgICAgICBpZiAodGhpcy5fY3VycmVudFZhY3V1bSkge1xuICAgICAgICAgICAgdGhpcy5fZW5xdWV1ZWRWYWN1dW1Db25kaXRpb25zID0gdGhpcy5fZW5xdWV1ZWRWYWN1dW1Db25kaXRpb25zICYmIGNvbmRpdGlvbnM7XG4gICAgICAgICAgICBpZiAodGhpcy5fZW5xdWV1ZWRWYWN1dW0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbnF1ZXVlZFZhY3V1bTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2VucXVldWVkVmFjdXVtID0gdGhpcy5fY3VycmVudFZhY3V1bS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29uZGl0aW9ucyA9IF90aGlzLl9lbnF1ZXVlZFZhY3V1bUNvbmRpdGlvbnM7XG4gICAgICAgICAgICAgICAgX3RoaXMuX2VucXVldWVkVmFjdXVtQ29uZGl0aW9ucyA9IGRlZmF1bHRWYWN1dW1Db25kaXRpb25zO1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5wZXJmb3JtVmFjdXVtaW5nKG9wdGlvbnMsIGNvbmRpdGlvbnMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZW5xdWV1ZWRWYWN1dW07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudmFjdXVtQ29uZGl0aW9uc01ldChjb25kaXRpb25zKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jdXJyZW50VmFjdXVtID0gdGhpcy5wZXJmb3JtVmFjdXVtaW5nKG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFZhY3V1bTtcbiAgICB9O1xuICAgIE1pbmlTZWFyY2gucHJvdG90eXBlLnBlcmZvcm1WYWN1dW1pbmcgPSBmdW5jdGlvbiAob3B0aW9ucywgY29uZGl0aW9ucykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaW5pdGlhbERpcnRDb3VudCwgYmF0Y2hTaXplLCBiYXRjaFdhaXRfMSwgaSwgX2EsIF9iLCBfYywgdGVybSwgZmllbGRzRGF0YSwgZmllbGRzRGF0YV8xLCBmaWVsZHNEYXRhXzFfMSwgX2QsIGZpZWxkSWQsIGZpZWxkSW5kZXgsIGZpZWxkSW5kZXhfMSwgZmllbGRJbmRleF8xXzEsIF9lLCBzaG9ydElkLCBlXzEwXzE7XG4gICAgICAgICAgICB2YXIgZV8xMCwgX2YsIGVfMTEsIF9nLCBlXzEyLCBfaDtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2opIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9qLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxEaXJ0Q291bnQgPSB0aGlzLl9kaXJ0Q291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMudmFjdXVtQ29uZGl0aW9uc01ldChjb25kaXRpb25zKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgMTBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmF0Y2hTaXplID0gb3B0aW9ucy5iYXRjaFNpemUgfHwgZGVmYXVsdFZhY3V1bU9wdGlvbnMuYmF0Y2hTaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmF0Y2hXYWl0XzEgPSBvcHRpb25zLmJhdGNoV2FpdCB8fCBkZWZhdWx0VmFjdXVtT3B0aW9ucy5iYXRjaFdhaXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9qLmxhYmVsID0gMTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2oudHJ5cy5wdXNoKFsxLCA3LCA4LCA5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYSA9IF9fdmFsdWVzKHRoaXMuX2luZGV4KSwgX2IgPSBfYS5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfai5sYWJlbCA9IDI7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIV9iLmRvbmUpIHJldHVybiBbMyAvKmJyZWFrKi8sIDZdO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MgPSBfX3JlYWQoX2IudmFsdWUsIDIpLCB0ZXJtID0gX2NbMF0sIGZpZWxkc0RhdGEgPSBfY1sxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChmaWVsZHNEYXRhXzEgPSAoZV8xMSA9IHZvaWQgMCwgX192YWx1ZXMoZmllbGRzRGF0YSkpLCBmaWVsZHNEYXRhXzFfMSA9IGZpZWxkc0RhdGFfMS5uZXh0KCk7ICFmaWVsZHNEYXRhXzFfMS5kb25lOyBmaWVsZHNEYXRhXzFfMSA9IGZpZWxkc0RhdGFfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2QgPSBfX3JlYWQoZmllbGRzRGF0YV8xXzEudmFsdWUsIDIpLCBmaWVsZElkID0gX2RbMF0sIGZpZWxkSW5kZXggPSBfZFsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoZmllbGRJbmRleF8xID0gKGVfMTIgPSB2b2lkIDAsIF9fdmFsdWVzKGZpZWxkSW5kZXgpKSwgZmllbGRJbmRleF8xXzEgPSBmaWVsZEluZGV4XzEubmV4dCgpOyAhZmllbGRJbmRleF8xXzEuZG9uZTsgZmllbGRJbmRleF8xXzEgPSBmaWVsZEluZGV4XzEubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2UgPSBfX3JlYWQoZmllbGRJbmRleF8xXzEudmFsdWUsIDEpLCBzaG9ydElkID0gX2VbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RvY3VtZW50SWRzLmhhcyhzaG9ydElkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkSW5kZXguc2l6ZSA8PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkc0RhdGEuZGVsZXRlKGZpZWxkSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRJbmRleC5kZWxldGUoc2hvcnRJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlXzEyXzEpIHsgZV8xMiA9IHsgZXJyb3I6IGVfMTJfMSB9OyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmllbGRJbmRleF8xXzEgJiYgIWZpZWxkSW5kZXhfMV8xLmRvbmUgJiYgKF9oID0gZmllbGRJbmRleF8xLnJldHVybikpIF9oLmNhbGwoZmllbGRJbmRleF8xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xMikgdGhyb3cgZV8xMi5lcnJvcjsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVfMTFfMSkgeyBlXzExID0geyBlcnJvcjogZV8xMV8xIH07IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWVsZHNEYXRhXzFfMSAmJiAhZmllbGRzRGF0YV8xXzEuZG9uZSAmJiAoX2cgPSBmaWVsZHNEYXRhXzEucmV0dXJuKSkgX2cuY2FsbChmaWVsZHNEYXRhXzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMTEpIHRocm93IGVfMTEuZXJyb3I7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pbmRleC5nZXQodGVybSkuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2luZGV4LmRlbGV0ZSh0ZXJtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGkgJSBiYXRjaFNpemUgPT09IDApKSByZXR1cm4gWzMgLypicmVhayovLCA0XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJldHVybiBzZXRUaW1lb3V0KHJlc29sdmUsIGJhdGNoV2FpdF8xKTsgfSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBfai5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfai5sYWJlbCA9IDQ7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9qLmxhYmVsID0gNTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgX2IgPSBfYS5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCAyXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OiByZXR1cm4gWzMgLypicmVhayovLCA5XTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICAgICAgZV8xMF8xID0gX2ouc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZV8xMCA9IHsgZXJyb3I6IGVfMTBfMSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgOV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9iICYmICFfYi5kb25lICYmIChfZiA9IF9hLnJldHVybikpIF9mLmNhbGwoX2EpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzEwKSB0aHJvdyBlXzEwLmVycm9yOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzcgLyplbmRmaW5hbGx5Ki9dO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kaXJ0Q291bnQgLT0gaW5pdGlhbERpcnRDb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9qLmxhYmVsID0gMTA7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTA6IFxuICAgICAgICAgICAgICAgICAgICAvLyBNYWtlIHRoZSBuZXh0IGxpbmVzIGFsd2F5cyBhc3luYywgc28gdGhleSBleGVjdXRlIGFmdGVyIHRoaXMgZnVuY3Rpb24gcmV0dXJuc1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBudWxsXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1ha2UgdGhlIG5leHQgbGluZXMgYWx3YXlzIGFzeW5jLCBzbyB0aGV5IGV4ZWN1dGUgYWZ0ZXIgdGhpcyBmdW5jdGlvbiByZXR1cm5zXG4gICAgICAgICAgICAgICAgICAgICAgICBfai5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50VmFjdXVtID0gdGhpcy5fZW5xdWV1ZWRWYWN1dW07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbnF1ZXVlZFZhY3V1bSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgTWluaVNlYXJjaC5wcm90b3R5cGUudmFjdXVtQ29uZGl0aW9uc01ldCA9IGZ1bmN0aW9uIChjb25kaXRpb25zKSB7XG4gICAgICAgIGlmIChjb25kaXRpb25zID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBtaW5EaXJ0Q291bnQgPSBjb25kaXRpb25zLm1pbkRpcnRDb3VudCwgbWluRGlydEZhY3RvciA9IGNvbmRpdGlvbnMubWluRGlydEZhY3RvcjtcbiAgICAgICAgbWluRGlydENvdW50ID0gbWluRGlydENvdW50IHx8IGRlZmF1bHRBdXRvVmFjdXVtT3B0aW9ucy5taW5EaXJ0Q291bnQ7XG4gICAgICAgIG1pbkRpcnRGYWN0b3IgPSBtaW5EaXJ0RmFjdG9yIHx8IGRlZmF1bHRBdXRvVmFjdXVtT3B0aW9ucy5taW5EaXJ0RmFjdG9yO1xuICAgICAgICByZXR1cm4gdGhpcy5kaXJ0Q291bnQgPj0gbWluRGlydENvdW50ICYmIHRoaXMuZGlydEZhY3RvciA+PSBtaW5EaXJ0RmFjdG9yO1xuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1pbmlTZWFyY2gucHJvdG90eXBlLCBcImlzVmFjdXVtaW5nXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElzIGB0cnVlYCBpZiBhIHZhY3V1bWluZyBvcGVyYXRpb24gaXMgb25nb2luZywgYGZhbHNlYCBvdGhlcndpc2VcbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRWYWN1dW0gIT0gbnVsbDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNaW5pU2VhcmNoLnByb3RvdHlwZSwgXCJkaXJ0Q291bnRcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG51bWJlciBvZiBkb2N1bWVudHMgZGlzY2FyZGVkIHNpbmNlIHRoZSBtb3N0IHJlY2VudCB2YWN1dW1pbmdcbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RpcnRDb3VudDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNaW5pU2VhcmNoLnByb3RvdHlwZSwgXCJkaXJ0RmFjdG9yXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgbnVtYmVyIGJldHdlZW4gMCBhbmQgMSBnaXZpbmcgYW4gaW5kaWNhdGlvbiBhYm91dCB0aGUgcHJvcG9ydGlvbiBvZlxuICAgICAgICAgKiBkb2N1bWVudHMgdGhhdCBhcmUgZGlzY2FyZGVkLCBhbmQgY2FuIHRoZXJlZm9yZSBiZSBjbGVhbmVkIHVwIGJ5IHZhY3V1bWluZy5cbiAgICAgICAgICogQSB2YWx1ZSBjbG9zZSB0byAwIG1lYW5zIHRoYXQgdGhlIGluZGV4IGlzIHJlbGF0aXZlbHkgY2xlYW4sIHdoaWxlIGEgaGlnaGVyXG4gICAgICAgICAqIHZhbHVlIG1lYW5zIHRoYXQgdGhlIGluZGV4IGlzIHJlbGF0aXZlbHkgZGlydHksIGFuZCB2YWN1dW1pbmcgY291bGQgcmVsZWFzZVxuICAgICAgICAgKiBtZW1vcnkuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kaXJ0Q291bnQgLyAoMSArIHRoaXMuX2RvY3VtZW50Q291bnQgKyB0aGlzLl9kaXJ0Q291bnQpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgYSBkb2N1bWVudCB3aXRoIHRoZSBnaXZlbiBJRCBpcyBwcmVzZW50IGluIHRoZSBpbmRleCBhbmRcbiAgICAgKiBhdmFpbGFibGUgZm9yIHNlYXJjaCwgYGZhbHNlYCBvdGhlcndpc2VcbiAgICAgKlxuICAgICAqIEBwYXJhbSBpZCAgVGhlIGRvY3VtZW50IElEXG4gICAgICovXG4gICAgTWluaVNlYXJjaC5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZFRvU2hvcnRJZC5oYXMoaWQpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgc3RvcmVkIGZpZWxkcyAoYXMgY29uZmlndXJlZCBpbiB0aGUgYHN0b3JlRmllbGRzYCBjb25zdHJ1Y3RvclxuICAgICAqIG9wdGlvbikgZm9yIHRoZSBnaXZlbiBkb2N1bWVudCBJRC4gUmV0dXJucyBgdW5kZWZpbmVkYCBpZiB0aGUgZG9jdW1lbnQgaXNcbiAgICAgKiBub3QgcHJlc2VudCBpbiB0aGUgaW5kZXguXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWQgIFRoZSBkb2N1bWVudCBJRFxuICAgICAqL1xuICAgIE1pbmlTZWFyY2gucHJvdG90eXBlLmdldFN0b3JlZEZpZWxkcyA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICB2YXIgc2hvcnRJZCA9IHRoaXMuX2lkVG9TaG9ydElkLmdldChpZCk7XG4gICAgICAgIGlmIChzaG9ydElkID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0b3JlZEZpZWxkcy5nZXQoc2hvcnRJZCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTZWFyY2ggZm9yIGRvY3VtZW50cyBtYXRjaGluZyB0aGUgZ2l2ZW4gc2VhcmNoIHF1ZXJ5LlxuICAgICAqXG4gICAgICogVGhlIHJlc3VsdCBpcyBhIGxpc3Qgb2Ygc2NvcmVkIGRvY3VtZW50IElEcyBtYXRjaGluZyB0aGUgcXVlcnksIHNvcnRlZCBieVxuICAgICAqIGRlc2NlbmRpbmcgc2NvcmUsIGFuZCBlYWNoIGluY2x1ZGluZyBkYXRhIGFib3V0IHdoaWNoIHRlcm1zIHdlcmUgbWF0Y2hlZCBhbmRcbiAgICAgKiBpbiB3aGljaCBmaWVsZHMuXG4gICAgICpcbiAgICAgKiAjIyMgQmFzaWMgdXNhZ2U6XG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogLy8gU2VhcmNoIGZvciBcInplbiBhcnQgbW90b3JjeWNsZVwiIHdpdGggZGVmYXVsdCBvcHRpb25zOiB0ZXJtcyBoYXZlIHRvIG1hdGNoXG4gICAgICogLy8gZXhhY3RseSwgYW5kIGluZGl2aWR1YWwgdGVybXMgYXJlIGpvaW5lZCB3aXRoIE9SXG4gICAgICogbWluaVNlYXJjaC5zZWFyY2goJ3plbiBhcnQgbW90b3JjeWNsZScpXG4gICAgICogLy8gPT4gWyB7IGlkOiAyLCBzY29yZTogMi43NzI1OCwgbWF0Y2g6IHsgLi4uIH0gfSwgeyBpZDogNCwgc2NvcmU6IDEuMzg2MjksIG1hdGNoOiB7IC4uLiB9IH0gXVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogIyMjIFJlc3RyaWN0IHNlYXJjaCB0byBzcGVjaWZpYyBmaWVsZHM6XG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogLy8gU2VhcmNoIG9ubHkgaW4gdGhlICd0aXRsZScgZmllbGRcbiAgICAgKiBtaW5pU2VhcmNoLnNlYXJjaCgnemVuJywgeyBmaWVsZHM6IFsndGl0bGUnXSB9KVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogIyMjIEZpZWxkIGJvb3N0aW5nOlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIC8vIEJvb3N0IGEgZmllbGRcbiAgICAgKiBtaW5pU2VhcmNoLnNlYXJjaCgnemVuJywgeyBib29zdDogeyB0aXRsZTogMiB9IH0pXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiAjIyMgUHJlZml4IHNlYXJjaDpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiAvLyBTZWFyY2ggZm9yIFwibW90b1wiIHdpdGggcHJlZml4IHNlYXJjaCAoaXQgd2lsbCBtYXRjaCBkb2N1bWVudHNcbiAgICAgKiAvLyBjb250YWluaW5nIHRlcm1zIHRoYXQgc3RhcnQgd2l0aCBcIm1vdG9cIiBvciBcIm5ldXJvXCIpXG4gICAgICogbWluaVNlYXJjaC5zZWFyY2goJ21vdG8gbmV1cm8nLCB7IHByZWZpeDogdHJ1ZSB9KVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogIyMjIEZ1enp5IHNlYXJjaDpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiAvLyBTZWFyY2ggZm9yIFwiaXNtYWVsXCIgd2l0aCBmdXp6eSBzZWFyY2ggKGl0IHdpbGwgbWF0Y2ggZG9jdW1lbnRzIGNvbnRhaW5pbmdcbiAgICAgKiAvLyB0ZXJtcyBzaW1pbGFyIHRvIFwiaXNtYWVsXCIsIHdpdGggYSBtYXhpbXVtIGVkaXQgZGlzdGFuY2Ugb2YgMC4yIHRlcm0ubGVuZ3RoXG4gICAgICogLy8gKHJvdW5kZWQgdG8gbmVhcmVzdCBpbnRlZ2VyKVxuICAgICAqIG1pbmlTZWFyY2guc2VhcmNoKCdpc21hZWwnLCB7IGZ1enp5OiAwLjIgfSlcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqICMjIyBDb21iaW5pbmcgc3RyYXRlZ2llczpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiAvLyBNaXggb2YgZXhhY3QgbWF0Y2gsIHByZWZpeCBzZWFyY2gsIGFuZCBmdXp6eSBzZWFyY2hcbiAgICAgKiBtaW5pU2VhcmNoLnNlYXJjaCgnaXNtYWVsIG1vYicsIHtcbiAgICAgKiAgcHJlZml4OiB0cnVlLFxuICAgICAqICBmdXp6eTogMC4yXG4gICAgICogfSlcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqICMjIyBBZHZhbmNlZCBwcmVmaXggYW5kIGZ1enp5IHNlYXJjaDpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiAvLyBQZXJmb3JtIGZ1enp5IGFuZCBwcmVmaXggc2VhcmNoIGRlcGVuZGluZyBvbiB0aGUgc2VhcmNoIHRlcm0uIEhlcmVcbiAgICAgKiAvLyBwZXJmb3JtaW5nIHByZWZpeCBhbmQgZnV6enkgc2VhcmNoIG9ubHkgb24gdGVybXMgbG9uZ2VyIHRoYW4gMyBjaGFyYWN0ZXJzXG4gICAgICogbWluaVNlYXJjaC5zZWFyY2goJ2lzbWFlbCBtb2InLCB7XG4gICAgICogIHByZWZpeDogdGVybSA9PiB0ZXJtLmxlbmd0aCA+IDNcbiAgICAgKiAgZnV6enk6IHRlcm0gPT4gdGVybS5sZW5ndGggPiAzID8gMC4yIDogbnVsbFxuICAgICAqIH0pXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiAjIyMgQ29tYmluZSB3aXRoIEFORDpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiAvLyBDb21iaW5lIHNlYXJjaCB0ZXJtcyB3aXRoIEFORCAodG8gbWF0Y2ggb25seSBkb2N1bWVudHMgdGhhdCBjb250YWluIGJvdGhcbiAgICAgKiAvLyBcIm1vdG9yY3ljbGVcIiBhbmQgXCJhcnRcIilcbiAgICAgKiBtaW5pU2VhcmNoLnNlYXJjaCgnbW90b3JjeWNsZSBhcnQnLCB7IGNvbWJpbmVXaXRoOiAnQU5EJyB9KVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogIyMjIENvbWJpbmUgd2l0aCBBTkRfTk9UOlxuICAgICAqXG4gICAgICogVGhlcmUgaXMgYWxzbyBhbiBBTkRfTk9UIGNvbWJpbmF0b3IsIHRoYXQgZmluZHMgZG9jdW1lbnRzIHRoYXQgbWF0Y2ggdGhlXG4gICAgICogZmlyc3QgdGVybSwgYnV0IGRvIG5vdCBtYXRjaCBhbnkgb2YgdGhlIG90aGVyIHRlcm1zLiBUaGlzIGNvbWJpbmF0b3IgaXNcbiAgICAgKiByYXJlbHkgdXNlZnVsIHdpdGggc2ltcGxlIHF1ZXJpZXMsIGFuZCBpcyBtZWFudCB0byBiZSB1c2VkIHdpdGggYWR2YW5jZWRcbiAgICAgKiBxdWVyeSBjb21iaW5hdGlvbnMgKHNlZSBsYXRlciBmb3IgbW9yZSBkZXRhaWxzKS5cbiAgICAgKlxuICAgICAqICMjIyBGaWx0ZXJpbmcgcmVzdWx0czpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiAvLyBGaWx0ZXIgb25seSByZXN1bHRzIGluIHRoZSAnZmljdGlvbicgY2F0ZWdvcnkgKGFzc3VtaW5nIHRoYXQgJ2NhdGVnb3J5J1xuICAgICAqIC8vIGlzIGEgc3RvcmVkIGZpZWxkKVxuICAgICAqIG1pbmlTZWFyY2guc2VhcmNoKCdtb3RvcmN5Y2xlIGFydCcsIHtcbiAgICAgKiAgIGZpbHRlcjogKHJlc3VsdCkgPT4gcmVzdWx0LmNhdGVnb3J5ID09PSAnZmljdGlvbidcbiAgICAgKiB9KVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogIyMjIFdpbGRjYXJkIHF1ZXJ5XG4gICAgICpcbiAgICAgKiBTZWFyY2hpbmcgZm9yIGFuIGVtcHR5IHN0cmluZyAoYXNzdW1pbmcgdGhlIGRlZmF1bHQgdG9rZW5pemVyKSByZXR1cm5zIG5vXG4gICAgICogcmVzdWx0cy4gU29tZXRpbWVzIHRob3VnaCwgb25lIG5lZWRzIHRvIG1hdGNoIGFsbCBkb2N1bWVudHMsIGxpa2UgaW4gYVxuICAgICAqIFwid2lsZGNhcmRcIiBzZWFyY2guIFRoaXMgaXMgcG9zc2libGUgYnkgcGFzc2luZyB0aGUgc3BlY2lhbCB2YWx1ZVxuICAgICAqIHtAbGluayBNaW5pU2VhcmNoLndpbGRjYXJkfSBhcyB0aGUgcXVlcnk6XG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogLy8gUmV0dXJuIHNlYXJjaCByZXN1bHRzIGZvciBhbGwgZG9jdW1lbnRzXG4gICAgICogbWluaVNlYXJjaC5zZWFyY2goTWluaVNlYXJjaC53aWxkY2FyZClcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIE5vdGUgdGhhdCBzZWFyY2ggb3B0aW9ucyBzdWNoIGFzIGBmaWx0ZXJgIGFuZCBgYm9vc3REb2N1bWVudGAgYXJlIHN0aWxsXG4gICAgICogYXBwbGllZCwgaW5mbHVlbmNpbmcgd2hpY2ggcmVzdWx0cyBhcmUgcmV0dXJuZWQsIGFuZCB0aGVpciBvcmRlcjpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiAvLyBSZXR1cm4gc2VhcmNoIHJlc3VsdHMgZm9yIGFsbCBkb2N1bWVudHMgaW4gdGhlICdmaWN0aW9uJyBjYXRlZ29yeVxuICAgICAqIG1pbmlTZWFyY2guc2VhcmNoKE1pbmlTZWFyY2gud2lsZGNhcmQsIHtcbiAgICAgKiAgIGZpbHRlcjogKHJlc3VsdCkgPT4gcmVzdWx0LmNhdGVnb3J5ID09PSAnZmljdGlvbidcbiAgICAgKiB9KVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogIyMjIEFkdmFuY2VkIGNvbWJpbmF0aW9uIG9mIHF1ZXJpZXM6XG4gICAgICpcbiAgICAgKiBJdCBpcyBwb3NzaWJsZSB0byBjb21iaW5lIGRpZmZlcmVudCBzdWJxdWVyaWVzIHdpdGggT1IsIEFORCwgYW5kIEFORF9OT1QsXG4gICAgICogYW5kIGV2ZW4gd2l0aCBkaWZmZXJlbnQgc2VhcmNoIG9wdGlvbnMsIGJ5IHBhc3NpbmcgYSBxdWVyeSBleHByZXNzaW9uXG4gICAgICogdHJlZSBvYmplY3QgYXMgdGhlIGZpcnN0IGFyZ3VtZW50LCBpbnN0ZWFkIG9mIGEgc3RyaW5nLlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIC8vIFNlYXJjaCBmb3IgZG9jdW1lbnRzIHRoYXQgY29udGFpbiBcInplblwiIGFuZCAoXCJtb3RvcmN5Y2xlXCIgb3IgXCJhcmNoZXJ5XCIpXG4gICAgICogbWluaVNlYXJjaC5zZWFyY2goe1xuICAgICAqICAgY29tYmluZVdpdGg6ICdBTkQnLFxuICAgICAqICAgcXVlcmllczogW1xuICAgICAqICAgICAnemVuJyxcbiAgICAgKiAgICAge1xuICAgICAqICAgICAgIGNvbWJpbmVXaXRoOiAnT1InLFxuICAgICAqICAgICAgIHF1ZXJpZXM6IFsnbW90b3JjeWNsZScsICdhcmNoZXJ5J11cbiAgICAgKiAgICAgfVxuICAgICAqICAgXVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiAvLyBTZWFyY2ggZm9yIGRvY3VtZW50cyB0aGF0IGNvbnRhaW4gKFwiYXBwbGVcIiBvciBcInBlYXJcIikgYnV0IG5vdCBcImp1aWNlXCIgYW5kXG4gICAgICogLy8gbm90IFwidHJlZVwiXG4gICAgICogbWluaVNlYXJjaC5zZWFyY2goe1xuICAgICAqICAgY29tYmluZVdpdGg6ICdBTkRfTk9UJyxcbiAgICAgKiAgIHF1ZXJpZXM6IFtcbiAgICAgKiAgICAge1xuICAgICAqICAgICAgIGNvbWJpbmVXaXRoOiAnT1InLFxuICAgICAqICAgICAgIHF1ZXJpZXM6IFsnYXBwbGUnLCAncGVhciddXG4gICAgICogICAgIH0sXG4gICAgICogICAgICdqdWljZScsXG4gICAgICogICAgICd0cmVlJ1xuICAgICAqICAgXVxuICAgICAqIH0pXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBFYWNoIG5vZGUgaW4gdGhlIGV4cHJlc3Npb24gdHJlZSBjYW4gYmUgZWl0aGVyIGEgc3RyaW5nLCBvciBhbiBvYmplY3QgdGhhdFxuICAgICAqIHN1cHBvcnRzIGFsbCB7QGxpbmsgU2VhcmNoT3B0aW9uc30gZmllbGRzLCBwbHVzIGEgYHF1ZXJpZXNgIGFycmF5IGZpZWxkIGZvclxuICAgICAqIHN1YnF1ZXJpZXMuXG4gICAgICpcbiAgICAgKiBOb3RlIHRoYXQsIHdoaWxlIHRoaXMgY2FuIGJlY29tZSBjb21wbGljYXRlZCB0byBkbyBieSBoYW5kIGZvciBjb21wbGV4IG9yXG4gICAgICogZGVlcGx5IG5lc3RlZCBxdWVyaWVzLCBpdCBwcm92aWRlcyBhIGZvcm1hbGl6ZWQgZXhwcmVzc2lvbiB0cmVlIEFQSSBmb3JcbiAgICAgKiBleHRlcm5hbCBsaWJyYXJpZXMgdGhhdCBpbXBsZW1lbnQgYSBwYXJzZXIgZm9yIGN1c3RvbSBxdWVyeSBsYW5ndWFnZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcXVlcnkgIFNlYXJjaCBxdWVyeVxuICAgICAqIEBwYXJhbSBvcHRpb25zICBTZWFyY2ggb3B0aW9ucy4gRWFjaCBvcHRpb24sIGlmIG5vdCBnaXZlbiwgZGVmYXVsdHMgdG8gdGhlIGNvcnJlc3BvbmRpbmcgdmFsdWUgb2YgYHNlYXJjaE9wdGlvbnNgIGdpdmVuIHRvIHRoZSBjb25zdHJ1Y3Rvciwgb3IgdG8gdGhlIGxpYnJhcnkgZGVmYXVsdC5cbiAgICAgKi9cbiAgICBNaW5pU2VhcmNoLnByb3RvdHlwZS5zZWFyY2ggPSBmdW5jdGlvbiAocXVlcnksIHNlYXJjaE9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGVfMTMsIF9hO1xuICAgICAgICBpZiAoc2VhcmNoT3B0aW9ucyA9PT0gdm9pZCAwKSB7IHNlYXJjaE9wdGlvbnMgPSB7fTsgfVxuICAgICAgICB2YXIgcmF3UmVzdWx0cyA9IHRoaXMuZXhlY3V0ZVF1ZXJ5KHF1ZXJ5LCBzZWFyY2hPcHRpb25zKTtcbiAgICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIHJhd1Jlc3VsdHNfMSA9IF9fdmFsdWVzKHJhd1Jlc3VsdHMpLCByYXdSZXN1bHRzXzFfMSA9IHJhd1Jlc3VsdHNfMS5uZXh0KCk7ICFyYXdSZXN1bHRzXzFfMS5kb25lOyByYXdSZXN1bHRzXzFfMSA9IHJhd1Jlc3VsdHNfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2IgPSBfX3JlYWQocmF3UmVzdWx0c18xXzEudmFsdWUsIDIpLCBkb2NJZCA9IF9iWzBdLCBfYyA9IF9iWzFdLCBzY29yZSA9IF9jLnNjb3JlLCB0ZXJtcyA9IF9jLnRlcm1zLCBtYXRjaCA9IF9jLm1hdGNoO1xuICAgICAgICAgICAgICAgIC8vIHRlcm1zIGFyZSB0aGUgbWF0Y2hlZCBxdWVyeSB0ZXJtcywgd2hpY2ggd2lsbCBiZSByZXR1cm5lZCB0byB0aGUgdXNlclxuICAgICAgICAgICAgICAgIC8vIGFzIHF1ZXJ5VGVybXMuIFRoZSBxdWFsaXR5IGlzIGNhbGN1bGF0ZWQgYmFzZWQgb24gdGhlbSwgYXMgb3Bwb3NlZCB0b1xuICAgICAgICAgICAgICAgIC8vIHRoZSBtYXRjaGVkIHRlcm1zIGluIHRoZSBkb2N1bWVudCAod2hpY2ggY2FuIGJlIGRpZmZlcmVudCBkdWUgdG9cbiAgICAgICAgICAgICAgICAvLyBwcmVmaXggYW5kIGZ1enp5IG1hdGNoKVxuICAgICAgICAgICAgICAgIHZhciBxdWFsaXR5ID0gdGVybXMubGVuZ3RoIHx8IDE7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHRoaXMuX2RvY3VtZW50SWRzLmdldChkb2NJZCksXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlOiBzY29yZSAqIHF1YWxpdHksXG4gICAgICAgICAgICAgICAgICAgIHRlcm1zOiBPYmplY3Qua2V5cyhtYXRjaCksXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5VGVybXM6IHRlcm1zLFxuICAgICAgICAgICAgICAgICAgICBtYXRjaDogbWF0Y2hcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ocmVzdWx0LCB0aGlzLl9zdG9yZWRGaWVsZHMuZ2V0KGRvY0lkKSk7XG4gICAgICAgICAgICAgICAgaWYgKHNlYXJjaE9wdGlvbnMuZmlsdGVyID09IG51bGwgfHwgc2VhcmNoT3B0aW9ucy5maWx0ZXIocmVzdWx0KSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfMTNfMSkgeyBlXzEzID0geyBlcnJvcjogZV8xM18xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChyYXdSZXN1bHRzXzFfMSAmJiAhcmF3UmVzdWx0c18xXzEuZG9uZSAmJiAoX2EgPSByYXdSZXN1bHRzXzEucmV0dXJuKSkgX2EuY2FsbChyYXdSZXN1bHRzXzEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzEzKSB0aHJvdyBlXzEzLmVycm9yOyB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgaXQncyBhIHdpbGRjYXJkIHF1ZXJ5LCBhbmQgbm8gZG9jdW1lbnQgYm9vc3QgaXMgYXBwbGllZCwgc2tpcCBzb3J0aW5nXG4gICAgICAgIC8vIHRoZSByZXN1bHRzLCBhcyBhbGwgcmVzdWx0cyBoYXZlIHRoZSBzYW1lIHNjb3JlIG9mIDFcbiAgICAgICAgaWYgKHF1ZXJ5ID09PSBNaW5pU2VhcmNoLndpbGRjYXJkICYmXG4gICAgICAgICAgICBzZWFyY2hPcHRpb25zLmJvb3N0RG9jdW1lbnQgPT0gbnVsbCAmJlxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5zZWFyY2hPcHRpb25zLmJvb3N0RG9jdW1lbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0cy5zb3J0KGJ5U2NvcmUpO1xuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFByb3ZpZGUgc3VnZ2VzdGlvbnMgZm9yIHRoZSBnaXZlbiBzZWFyY2ggcXVlcnlcbiAgICAgKlxuICAgICAqIFRoZSByZXN1bHQgaXMgYSBsaXN0IG9mIHN1Z2dlc3RlZCBtb2RpZmllZCBzZWFyY2ggcXVlcmllcywgZGVyaXZlZCBmcm9tIHRoZVxuICAgICAqIGdpdmVuIHNlYXJjaCBxdWVyeSwgZWFjaCB3aXRoIGEgcmVsZXZhbmNlIHNjb3JlLCBzb3J0ZWQgYnkgZGVzY2VuZGluZyBzY29yZS5cbiAgICAgKlxuICAgICAqIEJ5IGRlZmF1bHQsIGl0IHVzZXMgdGhlIHNhbWUgb3B0aW9ucyB1c2VkIGZvciBzZWFyY2gsIGV4Y2VwdCB0aGF0IGJ5XG4gICAgICogZGVmYXVsdCBpdCBwZXJmb3JtcyBwcmVmaXggc2VhcmNoIG9uIHRoZSBsYXN0IHRlcm0gb2YgdGhlIHF1ZXJ5LCBhbmRcbiAgICAgKiBjb21iaW5lIHRlcm1zIHdpdGggYCdBTkQnYCAocmVxdWlyaW5nIGFsbCBxdWVyeSB0ZXJtcyB0byBtYXRjaCkuIEN1c3RvbVxuICAgICAqIG9wdGlvbnMgY2FuIGJlIHBhc3NlZCBhcyBhIHNlY29uZCBhcmd1bWVudC4gRGVmYXVsdHMgY2FuIGJlIGNoYW5nZWQgdXBvblxuICAgICAqIGNhbGxpbmcgdGhlIHtAbGluayBNaW5pU2VhcmNofSBjb25zdHJ1Y3RvciwgYnkgcGFzc2luZyBhXG4gICAgICogYGF1dG9TdWdnZXN0T3B0aW9uc2Agb3B0aW9uLlxuICAgICAqXG4gICAgICogIyMjIEJhc2ljIHVzYWdlOlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIC8vIEdldCBzdWdnZXN0aW9ucyBmb3IgJ25ldXJvJzpcbiAgICAgKiBtaW5pU2VhcmNoLmF1dG9TdWdnZXN0KCduZXVybycpXG4gICAgICogLy8gPT4gWyB7IHN1Z2dlc3Rpb246ICduZXVyb21hbmNlcicsIHRlcm1zOiBbICduZXVyb21hbmNlcicgXSwgc2NvcmU6IDAuNDYyNDAgfSBdXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiAjIyMgTXVsdGlwbGUgd29yZHM6XG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogLy8gR2V0IHN1Z2dlc3Rpb25zIGZvciAnemVuIGFyJzpcbiAgICAgKiBtaW5pU2VhcmNoLmF1dG9TdWdnZXN0KCd6ZW4gYXInKVxuICAgICAqIC8vID0+IFtcbiAgICAgKiAvLyAgeyBzdWdnZXN0aW9uOiAnemVuIGFyY2hlcnkgYXJ0JywgdGVybXM6IFsgJ3plbicsICdhcmNoZXJ5JywgJ2FydCcgXSwgc2NvcmU6IDEuNzMzMzIgfSxcbiAgICAgKiAvLyAgeyBzdWdnZXN0aW9uOiAnemVuIGFydCcsIHRlcm1zOiBbICd6ZW4nLCAnYXJ0JyBdLCBzY29yZTogMS4yMTMxMyB9XG4gICAgICogLy8gXVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogIyMjIEZ1enp5IHN1Z2dlc3Rpb25zOlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIC8vIENvcnJlY3Qgc3BlbGxpbmcgbWlzdGFrZXMgdXNpbmcgZnV6enkgc2VhcmNoOlxuICAgICAqIG1pbmlTZWFyY2guYXV0b1N1Z2dlc3QoJ25lcm9tYW5jZXInLCB7IGZ1enp5OiAwLjIgfSlcbiAgICAgKiAvLyA9PiBbIHsgc3VnZ2VzdGlvbjogJ25ldXJvbWFuY2VyJywgdGVybXM6IFsgJ25ldXJvbWFuY2VyJyBdLCBzY29yZTogMS4wMzk5OCB9IF1cbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqICMjIyBGaWx0ZXJpbmc6XG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogLy8gR2V0IHN1Z2dlc3Rpb25zIGZvciAnemVuIGFyJywgYnV0IG9ubHkgd2l0aGluIHRoZSAnZmljdGlvbicgY2F0ZWdvcnlcbiAgICAgKiAvLyAoYXNzdW1pbmcgdGhhdCAnY2F0ZWdvcnknIGlzIGEgc3RvcmVkIGZpZWxkKTpcbiAgICAgKiBtaW5pU2VhcmNoLmF1dG9TdWdnZXN0KCd6ZW4gYXInLCB7XG4gICAgICogICBmaWx0ZXI6IChyZXN1bHQpID0+IHJlc3VsdC5jYXRlZ29yeSA9PT0gJ2ZpY3Rpb24nXG4gICAgICogfSlcbiAgICAgKiAvLyA9PiBbXG4gICAgICogLy8gIHsgc3VnZ2VzdGlvbjogJ3plbiBhcmNoZXJ5IGFydCcsIHRlcm1zOiBbICd6ZW4nLCAnYXJjaGVyeScsICdhcnQnIF0sIHNjb3JlOiAxLjczMzMyIH0sXG4gICAgICogLy8gIHsgc3VnZ2VzdGlvbjogJ3plbiBhcnQnLCB0ZXJtczogWyAnemVuJywgJ2FydCcgXSwgc2NvcmU6IDEuMjEzMTMgfVxuICAgICAqIC8vIF1cbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBwYXJhbSBxdWVyeVN0cmluZyAgUXVlcnkgc3RyaW5nIHRvIGJlIGV4cGFuZGVkIGludG8gc3VnZ2VzdGlvbnNcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAgU2VhcmNoIG9wdGlvbnMuIFRoZSBzdXBwb3J0ZWQgb3B0aW9ucyBhbmQgZGVmYXVsdCB2YWx1ZXNcbiAgICAgKiBhcmUgdGhlIHNhbWUgYXMgZm9yIHRoZSB7QGxpbmsgTWluaVNlYXJjaCNzZWFyY2h9IG1ldGhvZCwgZXhjZXB0IHRoYXQgYnlcbiAgICAgKiBkZWZhdWx0IHByZWZpeCBzZWFyY2ggaXMgcGVyZm9ybWVkIG9uIHRoZSBsYXN0IHRlcm0gaW4gdGhlIHF1ZXJ5LCBhbmQgdGVybXNcbiAgICAgKiBhcmUgY29tYmluZWQgd2l0aCBgJ0FORCdgLlxuICAgICAqIEByZXR1cm4gIEEgc29ydGVkIGFycmF5IG9mIHN1Z2dlc3Rpb25zIHNvcnRlZCBieSByZWxldmFuY2Ugc2NvcmUuXG4gICAgICovXG4gICAgTWluaVNlYXJjaC5wcm90b3R5cGUuYXV0b1N1Z2dlc3QgPSBmdW5jdGlvbiAocXVlcnlTdHJpbmcsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGVfMTQsIF9hLCBlXzE1LCBfYjtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAgICAgb3B0aW9ucyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCB0aGlzLl9vcHRpb25zLmF1dG9TdWdnZXN0T3B0aW9ucyksIG9wdGlvbnMpO1xuICAgICAgICB2YXIgc3VnZ2VzdGlvbnMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfYyA9IF9fdmFsdWVzKHRoaXMuc2VhcmNoKHF1ZXJ5U3RyaW5nLCBvcHRpb25zKSksIF9kID0gX2MubmV4dCgpOyAhX2QuZG9uZTsgX2QgPSBfYy5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2UgPSBfZC52YWx1ZSwgc2NvcmUgPSBfZS5zY29yZSwgdGVybXMgPSBfZS50ZXJtcztcbiAgICAgICAgICAgICAgICB2YXIgcGhyYXNlID0gdGVybXMuam9pbignICcpO1xuICAgICAgICAgICAgICAgIHZhciBzdWdnZXN0aW9uID0gc3VnZ2VzdGlvbnMuZ2V0KHBocmFzZSk7XG4gICAgICAgICAgICAgICAgaWYgKHN1Z2dlc3Rpb24gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBzdWdnZXN0aW9uLnNjb3JlICs9IHNjb3JlO1xuICAgICAgICAgICAgICAgICAgICBzdWdnZXN0aW9uLmNvdW50ICs9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdWdnZXN0aW9ucy5zZXQocGhyYXNlLCB7IHNjb3JlOiBzY29yZSwgdGVybXM6IHRlcm1zLCBjb3VudDogMSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfMTRfMSkgeyBlXzE0ID0geyBlcnJvcjogZV8xNF8xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChfZCAmJiAhX2QuZG9uZSAmJiAoX2EgPSBfYy5yZXR1cm4pKSBfYS5jYWxsKF9jKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xNCkgdGhyb3cgZV8xNC5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgICAgIHZhciByZXN1bHRzID0gW107XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBzdWdnZXN0aW9uc18xID0gX192YWx1ZXMoc3VnZ2VzdGlvbnMpLCBzdWdnZXN0aW9uc18xXzEgPSBzdWdnZXN0aW9uc18xLm5leHQoKTsgIXN1Z2dlc3Rpb25zXzFfMS5kb25lOyBzdWdnZXN0aW9uc18xXzEgPSBzdWdnZXN0aW9uc18xLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciBfZiA9IF9fcmVhZChzdWdnZXN0aW9uc18xXzEudmFsdWUsIDIpLCBzdWdnZXN0aW9uID0gX2ZbMF0sIF9nID0gX2ZbMV0sIHNjb3JlID0gX2cuc2NvcmUsIHRlcm1zID0gX2cudGVybXMsIGNvdW50ID0gX2cuY291bnQ7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHsgc3VnZ2VzdGlvbjogc3VnZ2VzdGlvbiwgdGVybXM6IHRlcm1zLCBzY29yZTogc2NvcmUgLyBjb3VudCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV8xNV8xKSB7IGVfMTUgPSB7IGVycm9yOiBlXzE1XzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1Z2dlc3Rpb25zXzFfMSAmJiAhc3VnZ2VzdGlvbnNfMV8xLmRvbmUgJiYgKF9iID0gc3VnZ2VzdGlvbnNfMS5yZXR1cm4pKSBfYi5jYWxsKHN1Z2dlc3Rpb25zXzEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzE1KSB0aHJvdyBlXzE1LmVycm9yOyB9XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0cy5zb3J0KGJ5U2NvcmUpO1xuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNaW5pU2VhcmNoLnByb3RvdHlwZSwgXCJkb2N1bWVudENvdW50XCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRvdGFsIG51bWJlciBvZiBkb2N1bWVudHMgYXZhaWxhYmxlIHRvIHNlYXJjaFxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZG9jdW1lbnRDb3VudDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNaW5pU2VhcmNoLnByb3RvdHlwZSwgXCJ0ZXJtQ291bnRcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogTnVtYmVyIG9mIHRlcm1zIGluIHRoZSBpbmRleFxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faW5kZXguc2l6ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIERlc2VyaWFsaXplcyBhIEpTT04gaW5kZXggKHNlcmlhbGl6ZWQgd2l0aCBgSlNPTi5zdHJpbmdpZnkobWluaVNlYXJjaClgKVxuICAgICAqIGFuZCBpbnN0YW50aWF0ZXMgYSBNaW5pU2VhcmNoIGluc3RhbmNlLiBJdCBzaG91bGQgYmUgZ2l2ZW4gdGhlIHNhbWUgb3B0aW9uc1xuICAgICAqIG9yaWdpbmFsbHkgdXNlZCB3aGVuIHNlcmlhbGl6aW5nIHRoZSBpbmRleC5cbiAgICAgKlxuICAgICAqICMjIyBVc2FnZTpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiAvLyBJZiB0aGUgaW5kZXggd2FzIHNlcmlhbGl6ZWQgd2l0aDpcbiAgICAgKiBsZXQgbWluaVNlYXJjaCA9IG5ldyBNaW5pU2VhcmNoKHsgZmllbGRzOiBbJ3RpdGxlJywgJ3RleHQnXSB9KVxuICAgICAqIG1pbmlTZWFyY2guYWRkQWxsKGRvY3VtZW50cylcbiAgICAgKlxuICAgICAqIGNvbnN0IGpzb24gPSBKU09OLnN0cmluZ2lmeShtaW5pU2VhcmNoKVxuICAgICAqIC8vIEl0IGNhbiBsYXRlciBiZSBkZXNlcmlhbGl6ZWQgbGlrZSB0aGlzOlxuICAgICAqIG1pbmlTZWFyY2ggPSBNaW5pU2VhcmNoLmxvYWRKU09OKGpzb24sIHsgZmllbGRzOiBbJ3RpdGxlJywgJ3RleHQnXSB9KVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogQHBhcmFtIGpzb24gIEpTT04tc2VyaWFsaXplZCBpbmRleFxuICAgICAqIEBwYXJhbSBvcHRpb25zICBjb25maWd1cmF0aW9uIG9wdGlvbnMsIHNhbWUgYXMgdGhlIGNvbnN0cnVjdG9yXG4gICAgICogQHJldHVybiBBbiBpbnN0YW5jZSBvZiBNaW5pU2VhcmNoIGRlc2VyaWFsaXplZCBmcm9tIHRoZSBnaXZlbiBKU09OLlxuICAgICAqL1xuICAgIE1pbmlTZWFyY2gubG9hZEpTT04gPSBmdW5jdGlvbiAoanNvbiwgb3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pbmlTZWFyY2g6IGxvYWRKU09OIHNob3VsZCBiZSBnaXZlbiB0aGUgc2FtZSBvcHRpb25zIHVzZWQgd2hlbiBzZXJpYWxpemluZyB0aGUgaW5kZXgnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5sb2FkSlMoSlNPTi5wYXJzZShqc29uKSwgb3B0aW9ucyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IHZhbHVlIG9mIGFuIG9wdGlvbi4gSXQgd2lsbCB0aHJvdyBhbiBlcnJvciBpZiBubyBvcHRpb25cbiAgICAgKiB3aXRoIHRoZSBnaXZlbiBuYW1lIGV4aXN0cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25OYW1lICBOYW1lIG9mIHRoZSBvcHRpb25cbiAgICAgKiBAcmV0dXJuIFRoZSBkZWZhdWx0IHZhbHVlIG9mIHRoZSBnaXZlbiBvcHRpb25cbiAgICAgKlxuICAgICAqICMjIyBVc2FnZTpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiAvLyBHZXQgZGVmYXVsdCB0b2tlbml6ZXJcbiAgICAgKiBNaW5pU2VhcmNoLmdldERlZmF1bHQoJ3Rva2VuaXplJylcbiAgICAgKlxuICAgICAqIC8vIEdldCBkZWZhdWx0IHRlcm0gcHJvY2Vzc29yXG4gICAgICogTWluaVNlYXJjaC5nZXREZWZhdWx0KCdwcm9jZXNzVGVybScpXG4gICAgICpcbiAgICAgKiAvLyBVbmtub3duIG9wdGlvbnMgd2lsbCB0aHJvdyBhbiBlcnJvclxuICAgICAqIE1pbmlTZWFyY2guZ2V0RGVmYXVsdCgnbm90RXhpc3RpbmcnKVxuICAgICAqIC8vID0+IHRocm93cyAnTWluaVNlYXJjaDogdW5rbm93biBvcHRpb24gXCJub3RFeGlzdGluZ1wiJ1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIE1pbmlTZWFyY2guZ2V0RGVmYXVsdCA9IGZ1bmN0aW9uIChvcHRpb25OYW1lKSB7XG4gICAgICAgIGlmIChkZWZhdWx0T3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShvcHRpb25OYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuIGdldE93blByb3BlcnR5KGRlZmF1bHRPcHRpb25zLCBvcHRpb25OYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pbmlTZWFyY2g6IHVua25vd24gb3B0aW9uIFxcXCJcIi5jb25jYXQob3B0aW9uTmFtZSwgXCJcXFwiXCIpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIE1pbmlTZWFyY2gubG9hZEpTID0gZnVuY3Rpb24gKGpzLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBlXzE2LCBfYSwgZV8xNywgX2IsIGVfMTgsIF9jO1xuICAgICAgICB2YXIgaW5kZXggPSBqcy5pbmRleCwgZG9jdW1lbnRDb3VudCA9IGpzLmRvY3VtZW50Q291bnQsIG5leHRJZCA9IGpzLm5leHRJZCwgZG9jdW1lbnRJZHMgPSBqcy5kb2N1bWVudElkcywgZmllbGRJZHMgPSBqcy5maWVsZElkcywgZmllbGRMZW5ndGggPSBqcy5maWVsZExlbmd0aCwgYXZlcmFnZUZpZWxkTGVuZ3RoID0ganMuYXZlcmFnZUZpZWxkTGVuZ3RoLCBzdG9yZWRGaWVsZHMgPSBqcy5zdG9yZWRGaWVsZHMsIGRpcnRDb3VudCA9IGpzLmRpcnRDb3VudCwgc2VyaWFsaXphdGlvblZlcnNpb24gPSBqcy5zZXJpYWxpemF0aW9uVmVyc2lvbjtcbiAgICAgICAgaWYgKHNlcmlhbGl6YXRpb25WZXJzaW9uICE9PSAxICYmIHNlcmlhbGl6YXRpb25WZXJzaW9uICE9PSAyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pbmlTZWFyY2g6IGNhbm5vdCBkZXNlcmlhbGl6ZSBhbiBpbmRleCBjcmVhdGVkIHdpdGggYW4gaW5jb21wYXRpYmxlIHZlcnNpb24nKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbWluaVNlYXJjaCA9IG5ldyBNaW5pU2VhcmNoKG9wdGlvbnMpO1xuICAgICAgICBtaW5pU2VhcmNoLl9kb2N1bWVudENvdW50ID0gZG9jdW1lbnRDb3VudDtcbiAgICAgICAgbWluaVNlYXJjaC5fbmV4dElkID0gbmV4dElkO1xuICAgICAgICBtaW5pU2VhcmNoLl9kb2N1bWVudElkcyA9IG9iamVjdFRvTnVtZXJpY01hcChkb2N1bWVudElkcyk7XG4gICAgICAgIG1pbmlTZWFyY2guX2lkVG9TaG9ydElkID0gbmV3IE1hcCgpO1xuICAgICAgICBtaW5pU2VhcmNoLl9maWVsZElkcyA9IGZpZWxkSWRzO1xuICAgICAgICBtaW5pU2VhcmNoLl9maWVsZExlbmd0aCA9IG9iamVjdFRvTnVtZXJpY01hcChmaWVsZExlbmd0aCk7XG4gICAgICAgIG1pbmlTZWFyY2guX2F2Z0ZpZWxkTGVuZ3RoID0gYXZlcmFnZUZpZWxkTGVuZ3RoO1xuICAgICAgICBtaW5pU2VhcmNoLl9zdG9yZWRGaWVsZHMgPSBvYmplY3RUb051bWVyaWNNYXAoc3RvcmVkRmllbGRzKTtcbiAgICAgICAgbWluaVNlYXJjaC5fZGlydENvdW50ID0gZGlydENvdW50IHx8IDA7XG4gICAgICAgIG1pbmlTZWFyY2guX2luZGV4ID0gbmV3IFNlYXJjaGFibGVNYXAoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIF9kID0gX192YWx1ZXMobWluaVNlYXJjaC5fZG9jdW1lbnRJZHMpLCBfZSA9IF9kLm5leHQoKTsgIV9lLmRvbmU7IF9lID0gX2QubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9mID0gX19yZWFkKF9lLnZhbHVlLCAyKSwgc2hvcnRJZCA9IF9mWzBdLCBpZCA9IF9mWzFdO1xuICAgICAgICAgICAgICAgIG1pbmlTZWFyY2guX2lkVG9TaG9ydElkLnNldChpZCwgc2hvcnRJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfMTZfMSkgeyBlXzE2ID0geyBlcnJvcjogZV8xNl8xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChfZSAmJiAhX2UuZG9uZSAmJiAoX2EgPSBfZC5yZXR1cm4pKSBfYS5jYWxsKF9kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xNikgdGhyb3cgZV8xNi5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpbmRleF8xID0gX192YWx1ZXMoaW5kZXgpLCBpbmRleF8xXzEgPSBpbmRleF8xLm5leHQoKTsgIWluZGV4XzFfMS5kb25lOyBpbmRleF8xXzEgPSBpbmRleF8xLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciBfZyA9IF9fcmVhZChpbmRleF8xXzEudmFsdWUsIDIpLCB0ZXJtID0gX2dbMF0sIGRhdGEgPSBfZ1sxXTtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaCA9IChlXzE4ID0gdm9pZCAwLCBfX3ZhbHVlcyhPYmplY3Qua2V5cyhkYXRhKSkpLCBfaiA9IF9oLm5leHQoKTsgIV9qLmRvbmU7IF9qID0gX2gubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmllbGRJZCA9IF9qLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4RW50cnkgPSBkYXRhW2ZpZWxkSWRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVmVyc2lvbiAxIHVzZWQgdG8gbmVzdCB0aGUgaW5kZXggZW50cnkgaW5zaWRlIGEgZmllbGQgY2FsbGVkIGRzXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VyaWFsaXphdGlvblZlcnNpb24gPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleEVudHJ5ID0gaW5kZXhFbnRyeS5kcztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFNYXAuc2V0KHBhcnNlSW50KGZpZWxkSWQsIDEwKSwgb2JqZWN0VG9OdW1lcmljTWFwKGluZGV4RW50cnkpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZV8xOF8xKSB7IGVfMTggPSB7IGVycm9yOiBlXzE4XzEgfTsgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9qICYmICFfai5kb25lICYmIChfYyA9IF9oLnJldHVybikpIF9jLmNhbGwoX2gpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xOCkgdGhyb3cgZV8xOC5lcnJvcjsgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtaW5pU2VhcmNoLl9pbmRleC5zZXQodGVybSwgZGF0YU1hcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfMTdfMSkgeyBlXzE3ID0geyBlcnJvcjogZV8xN18xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChpbmRleF8xXzEgJiYgIWluZGV4XzFfMS5kb25lICYmIChfYiA9IGluZGV4XzEucmV0dXJuKSkgX2IuY2FsbChpbmRleF8xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xNykgdGhyb3cgZV8xNy5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtaW5pU2VhcmNoO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIE1pbmlTZWFyY2gucHJvdG90eXBlLmV4ZWN1dGVRdWVyeSA9IGZ1bmN0aW9uIChxdWVyeSwgc2VhcmNoT3B0aW9ucykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoc2VhcmNoT3B0aW9ucyA9PT0gdm9pZCAwKSB7IHNlYXJjaE9wdGlvbnMgPSB7fTsgfVxuICAgICAgICBpZiAocXVlcnkgPT09IE1pbmlTZWFyY2gud2lsZGNhcmQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGVXaWxkY2FyZFF1ZXJ5KHNlYXJjaE9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgcXVlcnkgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB2YXIgb3B0aW9uc18xID0gX19hc3NpZ24oX19hc3NpZ24oX19hc3NpZ24oe30sIHNlYXJjaE9wdGlvbnMpLCBxdWVyeSksIHsgcXVlcmllczogdW5kZWZpbmVkIH0pO1xuICAgICAgICAgICAgdmFyIHJlc3VsdHNfMSA9IHF1ZXJ5LnF1ZXJpZXMubWFwKGZ1bmN0aW9uIChzdWJxdWVyeSkgeyByZXR1cm4gX3RoaXMuZXhlY3V0ZVF1ZXJ5KHN1YnF1ZXJ5LCBvcHRpb25zXzEpOyB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbWJpbmVSZXN1bHRzKHJlc3VsdHNfMSwgb3B0aW9uc18xLmNvbWJpbmVXaXRoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgX2EgPSB0aGlzLl9vcHRpb25zLCB0b2tlbml6ZSA9IF9hLnRva2VuaXplLCBwcm9jZXNzVGVybSA9IF9hLnByb2Nlc3NUZXJtLCBnbG9iYWxTZWFyY2hPcHRpb25zID0gX2Euc2VhcmNoT3B0aW9ucztcbiAgICAgICAgdmFyIG9wdGlvbnMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7IHRva2VuaXplOiB0b2tlbml6ZSwgcHJvY2Vzc1Rlcm06IHByb2Nlc3NUZXJtIH0sIGdsb2JhbFNlYXJjaE9wdGlvbnMpLCBzZWFyY2hPcHRpb25zKTtcbiAgICAgICAgdmFyIHNlYXJjaFRva2VuaXplID0gb3B0aW9ucy50b2tlbml6ZSwgc2VhcmNoUHJvY2Vzc1Rlcm0gPSBvcHRpb25zLnByb2Nlc3NUZXJtO1xuICAgICAgICB2YXIgdGVybXMgPSBzZWFyY2hUb2tlbml6ZShxdWVyeSlcbiAgICAgICAgICAgIC5mbGF0TWFwKGZ1bmN0aW9uICh0ZXJtKSB7IHJldHVybiBzZWFyY2hQcm9jZXNzVGVybSh0ZXJtKTsgfSlcbiAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKHRlcm0pIHsgcmV0dXJuICEhdGVybTsgfSk7XG4gICAgICAgIHZhciBxdWVyaWVzID0gdGVybXMubWFwKHRlcm1Ub1F1ZXJ5U3BlYyhvcHRpb25zKSk7XG4gICAgICAgIHZhciByZXN1bHRzID0gcXVlcmllcy5tYXAoZnVuY3Rpb24gKHF1ZXJ5KSB7IHJldHVybiBfdGhpcy5leGVjdXRlUXVlcnlTcGVjKHF1ZXJ5LCBvcHRpb25zKTsgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbWJpbmVSZXN1bHRzKHJlc3VsdHMsIG9wdGlvbnMuY29tYmluZVdpdGgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIE1pbmlTZWFyY2gucHJvdG90eXBlLmV4ZWN1dGVRdWVyeVNwZWMgPSBmdW5jdGlvbiAocXVlcnksIHNlYXJjaE9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGVfMTksIF9hLCBlXzIwLCBfYjtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgdGhpcy5fb3B0aW9ucy5zZWFyY2hPcHRpb25zKSwgc2VhcmNoT3B0aW9ucyk7XG4gICAgICAgIHZhciBib29zdHMgPSAob3B0aW9ucy5maWVsZHMgfHwgdGhpcy5fb3B0aW9ucy5maWVsZHMpLnJlZHVjZShmdW5jdGlvbiAoYm9vc3RzLCBmaWVsZCkge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgcmV0dXJuIChfX2Fzc2lnbihfX2Fzc2lnbih7fSwgYm9vc3RzKSwgKF9hID0ge30sIF9hW2ZpZWxkXSA9IGdldE93blByb3BlcnR5KG9wdGlvbnMuYm9vc3QsIGZpZWxkKSB8fCAxLCBfYSkpKTtcbiAgICAgICAgfSwge30pO1xuICAgICAgICB2YXIgYm9vc3REb2N1bWVudCA9IG9wdGlvbnMuYm9vc3REb2N1bWVudCwgd2VpZ2h0cyA9IG9wdGlvbnMud2VpZ2h0cywgbWF4RnV6enkgPSBvcHRpb25zLm1heEZ1enp5LCBibTI1cGFyYW1zID0gb3B0aW9ucy5ibTI1O1xuICAgICAgICB2YXIgX2MgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZGVmYXVsdFNlYXJjaE9wdGlvbnMud2VpZ2h0cyksIHdlaWdodHMpLCBmdXp6eVdlaWdodCA9IF9jLmZ1enp5LCBwcmVmaXhXZWlnaHQgPSBfYy5wcmVmaXg7XG4gICAgICAgIHZhciBkYXRhID0gdGhpcy5faW5kZXguZ2V0KHF1ZXJ5LnRlcm0pO1xuICAgICAgICB2YXIgcmVzdWx0cyA9IHRoaXMudGVybVJlc3VsdHMocXVlcnkudGVybSwgcXVlcnkudGVybSwgMSwgZGF0YSwgYm9vc3RzLCBib29zdERvY3VtZW50LCBibTI1cGFyYW1zKTtcbiAgICAgICAgdmFyIHByZWZpeE1hdGNoZXM7XG4gICAgICAgIHZhciBmdXp6eU1hdGNoZXM7XG4gICAgICAgIGlmIChxdWVyeS5wcmVmaXgpIHtcbiAgICAgICAgICAgIHByZWZpeE1hdGNoZXMgPSB0aGlzLl9pbmRleC5hdFByZWZpeChxdWVyeS50ZXJtKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocXVlcnkuZnV6enkpIHtcbiAgICAgICAgICAgIHZhciBmdXp6eSA9IChxdWVyeS5mdXp6eSA9PT0gdHJ1ZSkgPyAwLjIgOiBxdWVyeS5mdXp6eTtcbiAgICAgICAgICAgIHZhciBtYXhEaXN0YW5jZSA9IGZ1enp5IDwgMSA/IE1hdGgubWluKG1heEZ1enp5LCBNYXRoLnJvdW5kKHF1ZXJ5LnRlcm0ubGVuZ3RoICogZnV6enkpKSA6IGZ1enp5O1xuICAgICAgICAgICAgaWYgKG1heERpc3RhbmNlKVxuICAgICAgICAgICAgICAgIGZ1enp5TWF0Y2hlcyA9IHRoaXMuX2luZGV4LmZ1enp5R2V0KHF1ZXJ5LnRlcm0sIG1heERpc3RhbmNlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJlZml4TWF0Y2hlcykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBwcmVmaXhNYXRjaGVzXzEgPSBfX3ZhbHVlcyhwcmVmaXhNYXRjaGVzKSwgcHJlZml4TWF0Y2hlc18xXzEgPSBwcmVmaXhNYXRjaGVzXzEubmV4dCgpOyAhcHJlZml4TWF0Y2hlc18xXzEuZG9uZTsgcHJlZml4TWF0Y2hlc18xXzEgPSBwcmVmaXhNYXRjaGVzXzEubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfZCA9IF9fcmVhZChwcmVmaXhNYXRjaGVzXzFfMS52YWx1ZSwgMiksIHRlcm0gPSBfZFswXSwgZGF0YV8xID0gX2RbMV07XG4gICAgICAgICAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IHRlcm0ubGVuZ3RoIC0gcXVlcnkudGVybS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9IC8vIFNraXAgZXhhY3QgbWF0Y2guXG4gICAgICAgICAgICAgICAgICAgIC8vIERlbGV0ZSB0aGUgdGVybSBmcm9tIGZ1enp5IHJlc3VsdHMgKGlmIHByZXNlbnQpIGlmIGl0IGlzIGFsc28gYVxuICAgICAgICAgICAgICAgICAgICAvLyBwcmVmaXggcmVzdWx0LiBUaGlzIGVudHJ5IHdpbGwgYWx3YXlzIGJlIHNjb3JlZCBhcyBhIHByZWZpeCByZXN1bHQuXG4gICAgICAgICAgICAgICAgICAgIGZ1enp5TWF0Y2hlcyA9PT0gbnVsbCB8fCBmdXp6eU1hdGNoZXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGZ1enp5TWF0Y2hlcy5kZWxldGUodGVybSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdlaWdodCBncmFkdWFsbHkgYXBwcm9hY2hlcyAwIGFzIGRpc3RhbmNlIGdvZXMgdG8gaW5maW5pdHksIHdpdGggdGhlXG4gICAgICAgICAgICAgICAgICAgIC8vIHdlaWdodCBmb3IgdGhlIGh5cG90aGV0aWNhbCBkaXN0YW5jZSAwIGJlaW5nIGVxdWFsIHRvIHByZWZpeFdlaWdodC5cbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlIHJhdGUgb2YgY2hhbmdlIGlzIG11Y2ggbG93ZXIgdGhhbiB0aGF0IG9mIGZ1enp5IG1hdGNoZXMgdG9cbiAgICAgICAgICAgICAgICAgICAgLy8gYWNjb3VudCBmb3IgdGhlIGZhY3QgdGhhdCBwcmVmaXggbWF0Y2hlcyBzdGF5IG1vcmUgcmVsZXZhbnQgdGhhblxuICAgICAgICAgICAgICAgICAgICAvLyBmdXp6eSBtYXRjaGVzIGZvciBsb25nZXIgZGlzdGFuY2VzLlxuICAgICAgICAgICAgICAgICAgICB2YXIgd2VpZ2h0ID0gcHJlZml4V2VpZ2h0ICogdGVybS5sZW5ndGggLyAodGVybS5sZW5ndGggKyAwLjMgKiBkaXN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVybVJlc3VsdHMocXVlcnkudGVybSwgdGVybSwgd2VpZ2h0LCBkYXRhXzEsIGJvb3N0cywgYm9vc3REb2N1bWVudCwgYm0yNXBhcmFtcywgcmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVfMTlfMSkgeyBlXzE5ID0geyBlcnJvcjogZV8xOV8xIH07IH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmVmaXhNYXRjaGVzXzFfMSAmJiAhcHJlZml4TWF0Y2hlc18xXzEuZG9uZSAmJiAoX2EgPSBwcmVmaXhNYXRjaGVzXzEucmV0dXJuKSkgX2EuY2FsbChwcmVmaXhNYXRjaGVzXzEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMTkpIHRocm93IGVfMTkuZXJyb3I7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZnV6enlNYXRjaGVzKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIF9lID0gX192YWx1ZXMoZnV6enlNYXRjaGVzLmtleXMoKSksIF9mID0gX2UubmV4dCgpOyAhX2YuZG9uZTsgX2YgPSBfZS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRlcm0gPSBfZi52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9nID0gX19yZWFkKGZ1enp5TWF0Y2hlcy5nZXQodGVybSksIDIpLCBkYXRhXzIgPSBfZ1swXSwgZGlzdGFuY2UgPSBfZ1sxXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH0gLy8gU2tpcCBleGFjdCBtYXRjaC5cbiAgICAgICAgICAgICAgICAgICAgLy8gV2VpZ2h0IGdyYWR1YWxseSBhcHByb2FjaGVzIDAgYXMgZGlzdGFuY2UgZ29lcyB0byBpbmZpbml0eSwgd2l0aCB0aGVcbiAgICAgICAgICAgICAgICAgICAgLy8gd2VpZ2h0IGZvciB0aGUgaHlwb3RoZXRpY2FsIGRpc3RhbmNlIDAgYmVpbmcgZXF1YWwgdG8gZnV6enlXZWlnaHQuXG4gICAgICAgICAgICAgICAgICAgIHZhciB3ZWlnaHQgPSBmdXp6eVdlaWdodCAqIHRlcm0ubGVuZ3RoIC8gKHRlcm0ubGVuZ3RoICsgZGlzdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlcm1SZXN1bHRzKHF1ZXJ5LnRlcm0sIHRlcm0sIHdlaWdodCwgZGF0YV8yLCBib29zdHMsIGJvb3N0RG9jdW1lbnQsIGJtMjVwYXJhbXMsIHJlc3VsdHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlXzIwXzEpIHsgZV8yMCA9IHsgZXJyb3I6IGVfMjBfMSB9OyB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoX2YgJiYgIV9mLmRvbmUgJiYgKF9iID0gX2UucmV0dXJuKSkgX2IuY2FsbChfZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8yMCkgdGhyb3cgZV8yMC5lcnJvcjsgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIE1pbmlTZWFyY2gucHJvdG90eXBlLmV4ZWN1dGVXaWxkY2FyZFF1ZXJ5ID0gZnVuY3Rpb24gKHNlYXJjaE9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGVfMjEsIF9hO1xuICAgICAgICB2YXIgcmVzdWx0cyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgdGhpcy5fb3B0aW9ucy5zZWFyY2hPcHRpb25zKSwgc2VhcmNoT3B0aW9ucyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfYiA9IF9fdmFsdWVzKHRoaXMuX2RvY3VtZW50SWRzKSwgX2MgPSBfYi5uZXh0KCk7ICFfYy5kb25lOyBfYyA9IF9iLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciBfZCA9IF9fcmVhZChfYy52YWx1ZSwgMiksIHNob3J0SWQgPSBfZFswXSwgaWQgPSBfZFsxXTtcbiAgICAgICAgICAgICAgICB2YXIgc2NvcmUgPSBvcHRpb25zLmJvb3N0RG9jdW1lbnQgPyBvcHRpb25zLmJvb3N0RG9jdW1lbnQoaWQsICcnLCB0aGlzLl9zdG9yZWRGaWVsZHMuZ2V0KHNob3J0SWQpKSA6IDE7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5zZXQoc2hvcnRJZCwge1xuICAgICAgICAgICAgICAgICAgICBzY29yZTogc2NvcmUsXG4gICAgICAgICAgICAgICAgICAgIHRlcm1zOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2g6IHt9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfMjFfMSkgeyBlXzIxID0geyBlcnJvcjogZV8yMV8xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChfYyAmJiAhX2MuZG9uZSAmJiAoX2EgPSBfYi5yZXR1cm4pKSBfYS5jYWxsKF9iKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8yMSkgdGhyb3cgZV8yMS5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIE1pbmlTZWFyY2gucHJvdG90eXBlLmNvbWJpbmVSZXN1bHRzID0gZnVuY3Rpb24gKHJlc3VsdHMsIGNvbWJpbmVXaXRoKSB7XG4gICAgICAgIGlmIChjb21iaW5lV2l0aCA9PT0gdm9pZCAwKSB7IGNvbWJpbmVXaXRoID0gT1I7IH1cbiAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE1hcCgpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBvcGVyYXRvciA9IGNvbWJpbmVXaXRoLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHJldHVybiByZXN1bHRzLnJlZHVjZShjb21iaW5hdG9yc1tvcGVyYXRvcl0pIHx8IG5ldyBNYXAoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEFsbG93cyBzZXJpYWxpemF0aW9uIG9mIHRoZSBpbmRleCB0byBKU09OLCB0byBwb3NzaWJseSBzdG9yZSBpdCBhbmQgbGF0ZXJcbiAgICAgKiBkZXNlcmlhbGl6ZSBpdCB3aXRoIHtAbGluayBNaW5pU2VhcmNoLmxvYWRKU09OfS5cbiAgICAgKlxuICAgICAqIE5vcm1hbGx5IG9uZSBkb2VzIG5vdCBkaXJlY3RseSBjYWxsIHRoaXMgbWV0aG9kLCBidXQgcmF0aGVyIGNhbGwgdGhlXG4gICAgICogc3RhbmRhcmQgSmF2YVNjcmlwdCBgSlNPTi5zdHJpbmdpZnkoKWAgcGFzc2luZyB0aGUge0BsaW5rIE1pbmlTZWFyY2h9XG4gICAgICogaW5zdGFuY2UsIGFuZCBKYXZhU2NyaXB0IHdpbGwgaW50ZXJuYWxseSBjYWxsIHRoaXMgbWV0aG9kLiBVcG9uXG4gICAgICogZGVzZXJpYWxpemF0aW9uLCBvbmUgbXVzdCBwYXNzIHRvIHtAbGluayBNaW5pU2VhcmNoLmxvYWRKU09OfSB0aGUgc2FtZVxuICAgICAqIG9wdGlvbnMgdXNlZCB0byBjcmVhdGUgdGhlIG9yaWdpbmFsIGluc3RhbmNlIHRoYXQgd2FzIHNlcmlhbGl6ZWQuXG4gICAgICpcbiAgICAgKiAjIyMgVXNhZ2U6XG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogLy8gU2VyaWFsaXplIHRoZSBpbmRleDpcbiAgICAgKiBsZXQgbWluaVNlYXJjaCA9IG5ldyBNaW5pU2VhcmNoKHsgZmllbGRzOiBbJ3RpdGxlJywgJ3RleHQnXSB9KVxuICAgICAqIG1pbmlTZWFyY2guYWRkQWxsKGRvY3VtZW50cylcbiAgICAgKiBjb25zdCBqc29uID0gSlNPTi5zdHJpbmdpZnkobWluaVNlYXJjaClcbiAgICAgKlxuICAgICAqIC8vIExhdGVyLCB0byBkZXNlcmlhbGl6ZSBpdDpcbiAgICAgKiBtaW5pU2VhcmNoID0gTWluaVNlYXJjaC5sb2FkSlNPTihqc29uLCB7IGZpZWxkczogWyd0aXRsZScsICd0ZXh0J10gfSlcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEByZXR1cm4gQSBwbGFpbi1vYmplY3Qgc2VyaWFsaXphYmxlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBzZWFyY2ggaW5kZXguXG4gICAgICovXG4gICAgTWluaVNlYXJjaC5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZV8yMiwgX2EsIGVfMjMsIF9iO1xuICAgICAgICB2YXIgaW5kZXggPSBbXTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIF9jID0gX192YWx1ZXModGhpcy5faW5kZXgpLCBfZCA9IF9jLm5leHQoKTsgIV9kLmRvbmU7IF9kID0gX2MubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9lID0gX19yZWFkKF9kLnZhbHVlLCAyKSwgdGVybSA9IF9lWzBdLCBmaWVsZEluZGV4ID0gX2VbMV07XG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB7fTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBmaWVsZEluZGV4XzIgPSAoZV8yMyA9IHZvaWQgMCwgX192YWx1ZXMoZmllbGRJbmRleCkpLCBmaWVsZEluZGV4XzJfMSA9IGZpZWxkSW5kZXhfMi5uZXh0KCk7ICFmaWVsZEluZGV4XzJfMS5kb25lOyBmaWVsZEluZGV4XzJfMSA9IGZpZWxkSW5kZXhfMi5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfZiA9IF9fcmVhZChmaWVsZEluZGV4XzJfMS52YWx1ZSwgMiksIGZpZWxkSWQgPSBfZlswXSwgZnJlcXMgPSBfZlsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbZmllbGRJZF0gPSBPYmplY3QuZnJvbUVudHJpZXMoZnJlcXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlXzIzXzEpIHsgZV8yMyA9IHsgZXJyb3I6IGVfMjNfMSB9OyB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmllbGRJbmRleF8yXzEgJiYgIWZpZWxkSW5kZXhfMl8xLmRvbmUgJiYgKF9iID0gZmllbGRJbmRleF8yLnJldHVybikpIF9iLmNhbGwoZmllbGRJbmRleF8yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMjMpIHRocm93IGVfMjMuZXJyb3I7IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5kZXgucHVzaChbdGVybSwgZGF0YV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlXzIyXzEpIHsgZV8yMiA9IHsgZXJyb3I6IGVfMjJfMSB9OyB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoX2QgJiYgIV9kLmRvbmUgJiYgKF9hID0gX2MucmV0dXJuKSkgX2EuY2FsbChfYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMjIpIHRocm93IGVfMjIuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZG9jdW1lbnRDb3VudDogdGhpcy5fZG9jdW1lbnRDb3VudCxcbiAgICAgICAgICAgIG5leHRJZDogdGhpcy5fbmV4dElkLFxuICAgICAgICAgICAgZG9jdW1lbnRJZHM6IE9iamVjdC5mcm9tRW50cmllcyh0aGlzLl9kb2N1bWVudElkcyksXG4gICAgICAgICAgICBmaWVsZElkczogdGhpcy5fZmllbGRJZHMsXG4gICAgICAgICAgICBmaWVsZExlbmd0aDogT2JqZWN0LmZyb21FbnRyaWVzKHRoaXMuX2ZpZWxkTGVuZ3RoKSxcbiAgICAgICAgICAgIGF2ZXJhZ2VGaWVsZExlbmd0aDogdGhpcy5fYXZnRmllbGRMZW5ndGgsXG4gICAgICAgICAgICBzdG9yZWRGaWVsZHM6IE9iamVjdC5mcm9tRW50cmllcyh0aGlzLl9zdG9yZWRGaWVsZHMpLFxuICAgICAgICAgICAgZGlydENvdW50OiB0aGlzLl9kaXJ0Q291bnQsXG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICBzZXJpYWxpemF0aW9uVmVyc2lvbjogMlxuICAgICAgICB9O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIE1pbmlTZWFyY2gucHJvdG90eXBlLnRlcm1SZXN1bHRzID0gZnVuY3Rpb24gKHNvdXJjZVRlcm0sIGRlcml2ZWRUZXJtLCB0ZXJtV2VpZ2h0LCBmaWVsZFRlcm1EYXRhLCBmaWVsZEJvb3N0cywgYm9vc3REb2N1bWVudEZuLCBibTI1cGFyYW1zLCByZXN1bHRzKSB7XG4gICAgICAgIHZhciBlXzI0LCBfYSwgZV8yNSwgX2IsIF9jO1xuICAgICAgICBpZiAocmVzdWx0cyA9PT0gdm9pZCAwKSB7IHJlc3VsdHMgPSBuZXcgTWFwKCk7IH1cbiAgICAgICAgaWYgKGZpZWxkVGVybURhdGEgPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2QgPSBfX3ZhbHVlcyhPYmplY3Qua2V5cyhmaWVsZEJvb3N0cykpLCBfZSA9IF9kLm5leHQoKTsgIV9lLmRvbmU7IF9lID0gX2QubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpZWxkID0gX2UudmFsdWU7XG4gICAgICAgICAgICAgICAgdmFyIGZpZWxkQm9vc3QgPSBmaWVsZEJvb3N0c1tmaWVsZF07XG4gICAgICAgICAgICAgICAgdmFyIGZpZWxkSWQgPSB0aGlzLl9maWVsZElkc1tmaWVsZF07XG4gICAgICAgICAgICAgICAgdmFyIGZpZWxkVGVybUZyZXFzID0gZmllbGRUZXJtRGF0YS5nZXQoZmllbGRJZCk7XG4gICAgICAgICAgICAgICAgaWYgKGZpZWxkVGVybUZyZXFzID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIHZhciBtYXRjaGluZ0ZpZWxkcyA9IGZpZWxkVGVybUZyZXFzLnNpemU7XG4gICAgICAgICAgICAgICAgdmFyIGF2Z0ZpZWxkTGVuZ3RoID0gdGhpcy5fYXZnRmllbGRMZW5ndGhbZmllbGRJZF07XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2YgPSAoZV8yNSA9IHZvaWQgMCwgX192YWx1ZXMoZmllbGRUZXJtRnJlcXMua2V5cygpKSksIF9nID0gX2YubmV4dCgpOyAhX2cuZG9uZTsgX2cgPSBfZi5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkb2NJZCA9IF9nLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9kb2N1bWVudElkcy5oYXMoZG9jSWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVUZXJtKGZpZWxkSWQsIGRvY0lkLCBkZXJpdmVkVGVybSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hpbmdGaWVsZHMgLT0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkb2NCb29zdCA9IGJvb3N0RG9jdW1lbnRGbiA/IGJvb3N0RG9jdW1lbnRGbih0aGlzLl9kb2N1bWVudElkcy5nZXQoZG9jSWQpLCBkZXJpdmVkVGVybSwgdGhpcy5fc3RvcmVkRmllbGRzLmdldChkb2NJZCkpIDogMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZG9jQm9vc3QpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGVybUZyZXEgPSBmaWVsZFRlcm1GcmVxcy5nZXQoZG9jSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpZWxkTGVuZ3RoID0gdGhpcy5fZmllbGRMZW5ndGguZ2V0KGRvY0lkKVtmaWVsZElkXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5PVEU6IFRoZSB0b3RhbCBudW1iZXIgb2YgZmllbGRzIGlzIHNldCB0byB0aGUgbnVtYmVyIG9mIGRvY3VtZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYHRoaXMuX2RvY3VtZW50Q291bnRgLiBJdCBjb3VsZCBhbHNvIG1ha2Ugc2Vuc2UgdG8gdXNlIHRoZSBudW1iZXIgb2ZcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRvY3VtZW50cyB3aGVyZSB0aGUgY3VycmVudCBmaWVsZCBpcyBub24tYmxhbmsgYXMgYSBub3JtYWxpemF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBmYWN0b3IuIFRoaXMgd2lsbCBtYWtlIGEgZGlmZmVyZW5jZSBpbiBzY29yaW5nIGlmIHRoZSBmaWVsZCBpcyByYXJlbHlcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHByZXNlbnQuIFRoaXMgaXMgY3VycmVudGx5IG5vdCBzdXBwb3J0ZWQsIGFuZCBtYXkgcmVxdWlyZSBmdXJ0aGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhbmFseXNpcyB0byBzZWUgaWYgaXQgaXMgYSB2YWxpZCB1c2UgY2FzZS5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYXdTY29yZSA9IGNhbGNCTTI1U2NvcmUodGVybUZyZXEsIG1hdGNoaW5nRmllbGRzLCB0aGlzLl9kb2N1bWVudENvdW50LCBmaWVsZExlbmd0aCwgYXZnRmllbGRMZW5ndGgsIGJtMjVwYXJhbXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHdlaWdodGVkU2NvcmUgPSB0ZXJtV2VpZ2h0ICogZmllbGRCb29zdCAqIGRvY0Jvb3N0ICogcmF3U2NvcmU7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gcmVzdWx0cy5nZXQoZG9jSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zY29yZSArPSB3ZWlnaHRlZFNjb3JlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnblVuaXF1ZVRlcm0ocmVzdWx0LnRlcm1zLCBzb3VyY2VUZXJtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWF0Y2ggPSBnZXRPd25Qcm9wZXJ0eShyZXN1bHQubWF0Y2gsIGRlcml2ZWRUZXJtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2gucHVzaChmaWVsZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQubWF0Y2hbZGVyaXZlZFRlcm1dID0gW2ZpZWxkXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnNldChkb2NJZCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29yZTogd2VpZ2h0ZWRTY29yZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVybXM6IFtzb3VyY2VUZXJtXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2g6IChfYyA9IHt9LCBfY1tkZXJpdmVkVGVybV0gPSBbZmllbGRdLCBfYylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZV8yNV8xKSB7IGVfMjUgPSB7IGVycm9yOiBlXzI1XzEgfTsgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9nICYmICFfZy5kb25lICYmIChfYiA9IF9mLnJldHVybikpIF9iLmNhbGwoX2YpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8yNSkgdGhyb3cgZV8yNS5lcnJvcjsgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV8yNF8xKSB7IGVfMjQgPSB7IGVycm9yOiBlXzI0XzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKF9lICYmICFfZS5kb25lICYmIChfYSA9IF9kLnJldHVybikpIF9hLmNhbGwoX2QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzI0KSB0aHJvdyBlXzI0LmVycm9yOyB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgTWluaVNlYXJjaC5wcm90b3R5cGUuYWRkVGVybSA9IGZ1bmN0aW9uIChmaWVsZElkLCBkb2N1bWVudElkLCB0ZXJtKSB7XG4gICAgICAgIHZhciBpbmRleERhdGEgPSB0aGlzLl9pbmRleC5mZXRjaCh0ZXJtLCBjcmVhdGVNYXApO1xuICAgICAgICB2YXIgZmllbGRJbmRleCA9IGluZGV4RGF0YS5nZXQoZmllbGRJZCk7XG4gICAgICAgIGlmIChmaWVsZEluZGV4ID09IG51bGwpIHtcbiAgICAgICAgICAgIGZpZWxkSW5kZXggPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICBmaWVsZEluZGV4LnNldChkb2N1bWVudElkLCAxKTtcbiAgICAgICAgICAgIGluZGV4RGF0YS5zZXQoZmllbGRJZCwgZmllbGRJbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgZG9jcyA9IGZpZWxkSW5kZXguZ2V0KGRvY3VtZW50SWQpO1xuICAgICAgICAgICAgZmllbGRJbmRleC5zZXQoZG9jdW1lbnRJZCwgKGRvY3MgfHwgMCkgKyAxKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIE1pbmlTZWFyY2gucHJvdG90eXBlLnJlbW92ZVRlcm0gPSBmdW5jdGlvbiAoZmllbGRJZCwgZG9jdW1lbnRJZCwgdGVybSkge1xuICAgICAgICBpZiAoIXRoaXMuX2luZGV4Lmhhcyh0ZXJtKSkge1xuICAgICAgICAgICAgdGhpcy53YXJuRG9jdW1lbnRDaGFuZ2VkKGRvY3VtZW50SWQsIGZpZWxkSWQsIHRlcm0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmRleERhdGEgPSB0aGlzLl9pbmRleC5mZXRjaCh0ZXJtLCBjcmVhdGVNYXApO1xuICAgICAgICB2YXIgZmllbGRJbmRleCA9IGluZGV4RGF0YS5nZXQoZmllbGRJZCk7XG4gICAgICAgIGlmIChmaWVsZEluZGV4ID09IG51bGwgfHwgZmllbGRJbmRleC5nZXQoZG9jdW1lbnRJZCkgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy53YXJuRG9jdW1lbnRDaGFuZ2VkKGRvY3VtZW50SWQsIGZpZWxkSWQsIHRlcm0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGZpZWxkSW5kZXguZ2V0KGRvY3VtZW50SWQpIDw9IDEpIHtcbiAgICAgICAgICAgIGlmIChmaWVsZEluZGV4LnNpemUgPD0gMSkge1xuICAgICAgICAgICAgICAgIGluZGV4RGF0YS5kZWxldGUoZmllbGRJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmaWVsZEluZGV4LmRlbGV0ZShkb2N1bWVudElkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZpZWxkSW5kZXguc2V0KGRvY3VtZW50SWQsIGZpZWxkSW5kZXguZ2V0KGRvY3VtZW50SWQpIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2luZGV4LmdldCh0ZXJtKS5zaXplID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9pbmRleC5kZWxldGUodGVybSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBNaW5pU2VhcmNoLnByb3RvdHlwZS53YXJuRG9jdW1lbnRDaGFuZ2VkID0gZnVuY3Rpb24gKHNob3J0RG9jdW1lbnRJZCwgZmllbGRJZCwgdGVybSkge1xuICAgICAgICB2YXIgZV8yNiwgX2E7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfYiA9IF9fdmFsdWVzKE9iamVjdC5rZXlzKHRoaXMuX2ZpZWxkSWRzKSksIF9jID0gX2IubmV4dCgpOyAhX2MuZG9uZTsgX2MgPSBfYi5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmllbGROYW1lID0gX2MudmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2ZpZWxkSWRzW2ZpZWxkTmFtZV0gPT09IGZpZWxkSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5sb2dnZXIoJ3dhcm4nLCBcIk1pbmlTZWFyY2g6IGRvY3VtZW50IHdpdGggSUQgXCIuY29uY2F0KHRoaXMuX2RvY3VtZW50SWRzLmdldChzaG9ydERvY3VtZW50SWQpLCBcIiBoYXMgY2hhbmdlZCBiZWZvcmUgcmVtb3ZhbDogdGVybSBcXFwiXCIpLmNvbmNhdCh0ZXJtLCBcIlxcXCIgd2FzIG5vdCBwcmVzZW50IGluIGZpZWxkIFxcXCJcIikuY29uY2F0KGZpZWxkTmFtZSwgXCJcXFwiLiBSZW1vdmluZyBhIGRvY3VtZW50IGFmdGVyIGl0IGhhcyBjaGFuZ2VkIGNhbiBjb3JydXB0IHRoZSBpbmRleCFcIiksICd2ZXJzaW9uX2NvbmZsaWN0Jyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfMjZfMSkgeyBlXzI2ID0geyBlcnJvcjogZV8yNl8xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChfYyAmJiAhX2MuZG9uZSAmJiAoX2EgPSBfYi5yZXR1cm4pKSBfYS5jYWxsKF9iKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8yNikgdGhyb3cgZV8yNi5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgTWluaVNlYXJjaC5wcm90b3R5cGUuYWRkRG9jdW1lbnRJZCA9IGZ1bmN0aW9uIChkb2N1bWVudElkKSB7XG4gICAgICAgIHZhciBzaG9ydERvY3VtZW50SWQgPSB0aGlzLl9uZXh0SWQ7XG4gICAgICAgIHRoaXMuX2lkVG9TaG9ydElkLnNldChkb2N1bWVudElkLCBzaG9ydERvY3VtZW50SWQpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudElkcy5zZXQoc2hvcnREb2N1bWVudElkLCBkb2N1bWVudElkKTtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnRDb3VudCArPSAxO1xuICAgICAgICB0aGlzLl9uZXh0SWQgKz0gMTtcbiAgICAgICAgcmV0dXJuIHNob3J0RG9jdW1lbnRJZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBNaW5pU2VhcmNoLnByb3RvdHlwZS5hZGRGaWVsZHMgPSBmdW5jdGlvbiAoZmllbGRzKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmllbGRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLl9maWVsZElkc1tmaWVsZHNbaV1dID0gaTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIE1pbmlTZWFyY2gucHJvdG90eXBlLmFkZEZpZWxkTGVuZ3RoID0gZnVuY3Rpb24gKGRvY3VtZW50SWQsIGZpZWxkSWQsIGNvdW50LCBsZW5ndGgpIHtcbiAgICAgICAgdmFyIGZpZWxkTGVuZ3RocyA9IHRoaXMuX2ZpZWxkTGVuZ3RoLmdldChkb2N1bWVudElkKTtcbiAgICAgICAgaWYgKGZpZWxkTGVuZ3RocyA9PSBudWxsKVxuICAgICAgICAgICAgdGhpcy5fZmllbGRMZW5ndGguc2V0KGRvY3VtZW50SWQsIGZpZWxkTGVuZ3RocyA9IFtdKTtcbiAgICAgICAgZmllbGRMZW5ndGhzW2ZpZWxkSWRdID0gbGVuZ3RoO1xuICAgICAgICB2YXIgYXZlcmFnZUZpZWxkTGVuZ3RoID0gdGhpcy5fYXZnRmllbGRMZW5ndGhbZmllbGRJZF0gfHwgMDtcbiAgICAgICAgdmFyIHRvdGFsRmllbGRMZW5ndGggPSAoYXZlcmFnZUZpZWxkTGVuZ3RoICogY291bnQpICsgbGVuZ3RoO1xuICAgICAgICB0aGlzLl9hdmdGaWVsZExlbmd0aFtmaWVsZElkXSA9IHRvdGFsRmllbGRMZW5ndGggLyAoY291bnQgKyAxKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBNaW5pU2VhcmNoLnByb3RvdHlwZS5yZW1vdmVGaWVsZExlbmd0aCA9IGZ1bmN0aW9uIChkb2N1bWVudElkLCBmaWVsZElkLCBjb3VudCwgbGVuZ3RoKSB7XG4gICAgICAgIGlmIChjb3VudCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5fYXZnRmllbGRMZW5ndGhbZmllbGRJZF0gPSAwO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0b3RhbEZpZWxkTGVuZ3RoID0gKHRoaXMuX2F2Z0ZpZWxkTGVuZ3RoW2ZpZWxkSWRdICogY291bnQpIC0gbGVuZ3RoO1xuICAgICAgICB0aGlzLl9hdmdGaWVsZExlbmd0aFtmaWVsZElkXSA9IHRvdGFsRmllbGRMZW5ndGggLyAoY291bnQgLSAxKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBNaW5pU2VhcmNoLnByb3RvdHlwZS5zYXZlU3RvcmVkRmllbGRzID0gZnVuY3Rpb24gKGRvY3VtZW50SWQsIGRvYykge1xuICAgICAgICB2YXIgZV8yNywgX2E7XG4gICAgICAgIHZhciBfYiA9IHRoaXMuX29wdGlvbnMsIHN0b3JlRmllbGRzID0gX2Iuc3RvcmVGaWVsZHMsIGV4dHJhY3RGaWVsZCA9IF9iLmV4dHJhY3RGaWVsZDtcbiAgICAgICAgaWYgKHN0b3JlRmllbGRzID09IG51bGwgfHwgc3RvcmVGaWVsZHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRvY3VtZW50RmllbGRzID0gdGhpcy5fc3RvcmVkRmllbGRzLmdldChkb2N1bWVudElkKTtcbiAgICAgICAgaWYgKGRvY3VtZW50RmllbGRzID09IG51bGwpXG4gICAgICAgICAgICB0aGlzLl9zdG9yZWRGaWVsZHMuc2V0KGRvY3VtZW50SWQsIGRvY3VtZW50RmllbGRzID0ge30pO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgc3RvcmVGaWVsZHNfMSA9IF9fdmFsdWVzKHN0b3JlRmllbGRzKSwgc3RvcmVGaWVsZHNfMV8xID0gc3RvcmVGaWVsZHNfMS5uZXh0KCk7ICFzdG9yZUZpZWxkc18xXzEuZG9uZTsgc3RvcmVGaWVsZHNfMV8xID0gc3RvcmVGaWVsZHNfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmllbGROYW1lID0gc3RvcmVGaWVsZHNfMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgIHZhciBmaWVsZFZhbHVlID0gZXh0cmFjdEZpZWxkKGRvYywgZmllbGROYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAoZmllbGRWYWx1ZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudEZpZWxkc1tmaWVsZE5hbWVdID0gZmllbGRWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV8yN18xKSB7IGVfMjcgPSB7IGVycm9yOiBlXzI3XzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0b3JlRmllbGRzXzFfMSAmJiAhc3RvcmVGaWVsZHNfMV8xLmRvbmUgJiYgKF9hID0gc3RvcmVGaWVsZHNfMS5yZXR1cm4pKSBfYS5jYWxsKHN0b3JlRmllbGRzXzEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzI3KSB0aHJvdyBlXzI3LmVycm9yOyB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRoZSBzcGVjaWFsIHdpbGRjYXJkIHN5bWJvbCB0aGF0IGNhbiBiZSBwYXNzZWQgdG8ge0BsaW5rIE1pbmlTZWFyY2gjc2VhcmNofVxuICAgICAqIHRvIG1hdGNoIGFsbCBkb2N1bWVudHNcbiAgICAgKi9cbiAgICBNaW5pU2VhcmNoLndpbGRjYXJkID0gU3ltYm9sKCcqJyk7XG4gICAgcmV0dXJuIE1pbmlTZWFyY2g7XG59KCkpO1xudmFyIGdldE93blByb3BlcnR5ID0gZnVuY3Rpb24gKG9iamVjdCwgcHJvcGVydHkpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpID8gb2JqZWN0W3Byb3BlcnR5XSA6IHVuZGVmaW5lZDtcbn07XG52YXIgY29tYmluYXRvcnMgPSAoX2EgPSB7fSxcbiAgICBfYVtPUl0gPSBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICB2YXIgZV8yOCwgX2E7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfYiA9IF9fdmFsdWVzKGIua2V5cygpKSwgX2MgPSBfYi5uZXh0KCk7ICFfYy5kb25lOyBfYyA9IF9iLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciBkb2NJZCA9IF9jLnZhbHVlO1xuICAgICAgICAgICAgICAgIHZhciBleGlzdGluZyA9IGEuZ2V0KGRvY0lkKTtcbiAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBhLnNldChkb2NJZCwgYi5nZXQoZG9jSWQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfZCA9IGIuZ2V0KGRvY0lkKSwgc2NvcmUgPSBfZC5zY29yZSwgdGVybXMgPSBfZC50ZXJtcywgbWF0Y2ggPSBfZC5tYXRjaDtcbiAgICAgICAgICAgICAgICAgICAgZXhpc3Rpbmcuc2NvcmUgPSBleGlzdGluZy5zY29yZSArIHNjb3JlO1xuICAgICAgICAgICAgICAgICAgICBleGlzdGluZy5tYXRjaCA9IE9iamVjdC5hc3NpZ24oZXhpc3RpbmcubWF0Y2gsIG1hdGNoKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzaWduVW5pcXVlVGVybXMoZXhpc3RpbmcudGVybXMsIHRlcm1zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfMjhfMSkgeyBlXzI4ID0geyBlcnJvcjogZV8yOF8xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChfYyAmJiAhX2MuZG9uZSAmJiAoX2EgPSBfYi5yZXR1cm4pKSBfYS5jYWxsKF9iKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8yOCkgdGhyb3cgZV8yOC5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhO1xuICAgIH0sXG4gICAgX2FbQU5EXSA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHZhciBlXzI5LCBfYTtcbiAgICAgICAgdmFyIGNvbWJpbmVkID0gbmV3IE1hcCgpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2IgPSBfX3ZhbHVlcyhiLmtleXMoKSksIF9jID0gX2IubmV4dCgpOyAhX2MuZG9uZTsgX2MgPSBfYi5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZG9jSWQgPSBfYy52YWx1ZTtcbiAgICAgICAgICAgICAgICB2YXIgZXhpc3RpbmcgPSBhLmdldChkb2NJZCk7XG4gICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIHZhciBfZCA9IGIuZ2V0KGRvY0lkKSwgc2NvcmUgPSBfZC5zY29yZSwgdGVybXMgPSBfZC50ZXJtcywgbWF0Y2ggPSBfZC5tYXRjaDtcbiAgICAgICAgICAgICAgICBhc3NpZ25VbmlxdWVUZXJtcyhleGlzdGluZy50ZXJtcywgdGVybXMpO1xuICAgICAgICAgICAgICAgIGNvbWJpbmVkLnNldChkb2NJZCwge1xuICAgICAgICAgICAgICAgICAgICBzY29yZTogZXhpc3Rpbmcuc2NvcmUgKyBzY29yZSxcbiAgICAgICAgICAgICAgICAgICAgdGVybXM6IGV4aXN0aW5nLnRlcm1zLFxuICAgICAgICAgICAgICAgICAgICBtYXRjaDogT2JqZWN0LmFzc2lnbihleGlzdGluZy5tYXRjaCwgbWF0Y2gpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfMjlfMSkgeyBlXzI5ID0geyBlcnJvcjogZV8yOV8xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChfYyAmJiAhX2MuZG9uZSAmJiAoX2EgPSBfYi5yZXR1cm4pKSBfYS5jYWxsKF9iKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8yOSkgdGhyb3cgZV8yOS5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb21iaW5lZDtcbiAgICB9LFxuICAgIF9hW0FORF9OT1RdID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgdmFyIGVfMzAsIF9hO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2IgPSBfX3ZhbHVlcyhiLmtleXMoKSksIF9jID0gX2IubmV4dCgpOyAhX2MuZG9uZTsgX2MgPSBfYi5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZG9jSWQgPSBfYy52YWx1ZTtcbiAgICAgICAgICAgICAgICBhLmRlbGV0ZShkb2NJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfMzBfMSkgeyBlXzMwID0geyBlcnJvcjogZV8zMF8xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChfYyAmJiAhX2MuZG9uZSAmJiAoX2EgPSBfYi5yZXR1cm4pKSBfYS5jYWxsKF9iKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8zMCkgdGhyb3cgZV8zMC5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhO1xuICAgIH0sXG4gICAgX2EpO1xudmFyIGRlZmF1bHRCTTI1cGFyYW1zID0geyBrOiAxLjIsIGI6IDAuNywgZDogMC41IH07XG52YXIgY2FsY0JNMjVTY29yZSA9IGZ1bmN0aW9uICh0ZXJtRnJlcSwgbWF0Y2hpbmdDb3VudCwgdG90YWxDb3VudCwgZmllbGRMZW5ndGgsIGF2Z0ZpZWxkTGVuZ3RoLCBibTI1cGFyYW1zKSB7XG4gICAgdmFyIGsgPSBibTI1cGFyYW1zLmssIGIgPSBibTI1cGFyYW1zLmIsIGQgPSBibTI1cGFyYW1zLmQ7XG4gICAgdmFyIGludkRvY0ZyZXEgPSBNYXRoLmxvZygxICsgKHRvdGFsQ291bnQgLSBtYXRjaGluZ0NvdW50ICsgMC41KSAvIChtYXRjaGluZ0NvdW50ICsgMC41KSk7XG4gICAgcmV0dXJuIGludkRvY0ZyZXEgKiAoZCArIHRlcm1GcmVxICogKGsgKyAxKSAvICh0ZXJtRnJlcSArIGsgKiAoMSAtIGIgKyBiICogZmllbGRMZW5ndGggLyBhdmdGaWVsZExlbmd0aCkpKTtcbn07XG52YXIgdGVybVRvUXVlcnlTcGVjID0gZnVuY3Rpb24gKG9wdGlvbnMpIHsgcmV0dXJuIGZ1bmN0aW9uICh0ZXJtLCBpLCB0ZXJtcykge1xuICAgIHZhciBmdXp6eSA9ICh0eXBlb2Ygb3B0aW9ucy5mdXp6eSA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgPyBvcHRpb25zLmZ1enp5KHRlcm0sIGksIHRlcm1zKVxuICAgICAgICA6IChvcHRpb25zLmZ1enp5IHx8IGZhbHNlKTtcbiAgICB2YXIgcHJlZml4ID0gKHR5cGVvZiBvcHRpb25zLnByZWZpeCA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgPyBvcHRpb25zLnByZWZpeCh0ZXJtLCBpLCB0ZXJtcylcbiAgICAgICAgOiAob3B0aW9ucy5wcmVmaXggPT09IHRydWUpO1xuICAgIHJldHVybiB7IHRlcm06IHRlcm0sIGZ1enp5OiBmdXp6eSwgcHJlZml4OiBwcmVmaXggfTtcbn07IH07XG52YXIgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgaWRGaWVsZDogJ2lkJyxcbiAgICBleHRyYWN0RmllbGQ6IGZ1bmN0aW9uIChkb2N1bWVudCwgZmllbGROYW1lKSB7IHJldHVybiBkb2N1bWVudFtmaWVsZE5hbWVdOyB9LFxuICAgIHRva2VuaXplOiBmdW5jdGlvbiAodGV4dCkgeyByZXR1cm4gdGV4dC5zcGxpdChTUEFDRV9PUl9QVU5DVFVBVElPTik7IH0sXG4gICAgcHJvY2Vzc1Rlcm06IGZ1bmN0aW9uICh0ZXJtKSB7IHJldHVybiB0ZXJtLnRvTG93ZXJDYXNlKCk7IH0sXG4gICAgZmllbGRzOiB1bmRlZmluZWQsXG4gICAgc2VhcmNoT3B0aW9uczogdW5kZWZpbmVkLFxuICAgIHN0b3JlRmllbGRzOiBbXSxcbiAgICBsb2dnZXI6IGZ1bmN0aW9uIChsZXZlbCwgbWVzc2FnZSkge1xuICAgICAgICBpZiAodHlwZW9mIChjb25zb2xlID09PSBudWxsIHx8IGNvbnNvbGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbnNvbGVbbGV2ZWxdKSA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgIGNvbnNvbGVbbGV2ZWxdKG1lc3NhZ2UpO1xuICAgIH0sXG4gICAgYXV0b1ZhY3V1bTogdHJ1ZVxufTtcbnZhciBkZWZhdWx0U2VhcmNoT3B0aW9ucyA9IHtcbiAgICBjb21iaW5lV2l0aDogT1IsXG4gICAgcHJlZml4OiBmYWxzZSxcbiAgICBmdXp6eTogZmFsc2UsXG4gICAgbWF4RnV6enk6IDYsXG4gICAgYm9vc3Q6IHt9LFxuICAgIHdlaWdodHM6IHsgZnV6enk6IDAuNDUsIHByZWZpeDogMC4zNzUgfSxcbiAgICBibTI1OiBkZWZhdWx0Qk0yNXBhcmFtc1xufTtcbnZhciBkZWZhdWx0QXV0b1N1Z2dlc3RPcHRpb25zID0ge1xuICAgIGNvbWJpbmVXaXRoOiBBTkQsXG4gICAgcHJlZml4OiBmdW5jdGlvbiAodGVybSwgaSwgdGVybXMpIHtcbiAgICAgICAgcmV0dXJuIGkgPT09IHRlcm1zLmxlbmd0aCAtIDE7XG4gICAgfVxufTtcbnZhciBkZWZhdWx0VmFjdXVtT3B0aW9ucyA9IHsgYmF0Y2hTaXplOiAxMDAwLCBiYXRjaFdhaXQ6IDEwIH07XG52YXIgZGVmYXVsdFZhY3V1bUNvbmRpdGlvbnMgPSB7IG1pbkRpcnRGYWN0b3I6IDAuMSwgbWluRGlydENvdW50OiAyMCB9O1xudmFyIGRlZmF1bHRBdXRvVmFjdXVtT3B0aW9ucyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBkZWZhdWx0VmFjdXVtT3B0aW9ucyksIGRlZmF1bHRWYWN1dW1Db25kaXRpb25zKTtcbnZhciBhc3NpZ25VbmlxdWVUZXJtID0gZnVuY3Rpb24gKHRhcmdldCwgdGVybSkge1xuICAgIC8vIEF2b2lkIGFkZGluZyBkdXBsaWNhdGUgdGVybXMuXG4gICAgaWYgKCF0YXJnZXQuaW5jbHVkZXModGVybSkpXG4gICAgICAgIHRhcmdldC5wdXNoKHRlcm0pO1xufTtcbnZhciBhc3NpZ25VbmlxdWVUZXJtcyA9IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuICAgIHZhciBlXzMxLCBfYTtcbiAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBzb3VyY2VfMSA9IF9fdmFsdWVzKHNvdXJjZSksIHNvdXJjZV8xXzEgPSBzb3VyY2VfMS5uZXh0KCk7ICFzb3VyY2VfMV8xLmRvbmU7IHNvdXJjZV8xXzEgPSBzb3VyY2VfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgIHZhciB0ZXJtID0gc291cmNlXzFfMS52YWx1ZTtcbiAgICAgICAgICAgIC8vIEF2b2lkIGFkZGluZyBkdXBsaWNhdGUgdGVybXMuXG4gICAgICAgICAgICBpZiAoIXRhcmdldC5pbmNsdWRlcyh0ZXJtKSlcbiAgICAgICAgICAgICAgICB0YXJnZXQucHVzaCh0ZXJtKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoZV8zMV8xKSB7IGVfMzEgPSB7IGVycm9yOiBlXzMxXzEgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHNvdXJjZV8xXzEgJiYgIXNvdXJjZV8xXzEuZG9uZSAmJiAoX2EgPSBzb3VyY2VfMS5yZXR1cm4pKSBfYS5jYWxsKHNvdXJjZV8xKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMzEpIHRocm93IGVfMzEuZXJyb3I7IH1cbiAgICB9XG59O1xudmFyIGJ5U2NvcmUgPSBmdW5jdGlvbiAoX2EsIF9iKSB7XG4gICAgdmFyIGEgPSBfYS5zY29yZTtcbiAgICB2YXIgYiA9IF9iLnNjb3JlO1xuICAgIHJldHVybiBiIC0gYTtcbn07XG52YXIgY3JlYXRlTWFwID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE1hcCgpOyB9O1xudmFyIG9iamVjdFRvTnVtZXJpY01hcCA9IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICB2YXIgZV8zMiwgX2E7XG4gICAgdmFyIG1hcCA9IG5ldyBNYXAoKTtcbiAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBfYiA9IF9fdmFsdWVzKE9iamVjdC5rZXlzKG9iamVjdCkpLCBfYyA9IF9iLm5leHQoKTsgIV9jLmRvbmU7IF9jID0gX2IubmV4dCgpKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gX2MudmFsdWU7XG4gICAgICAgICAgICBtYXAuc2V0KHBhcnNlSW50KGtleSwgMTApLCBvYmplY3Rba2V5XSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGVfMzJfMSkgeyBlXzMyID0geyBlcnJvcjogZV8zMl8xIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChfYyAmJiAhX2MuZG9uZSAmJiAoX2EgPSBfYi5yZXR1cm4pKSBfYS5jYWxsKF9iKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMzIpIHRocm93IGVfMzIuZXJyb3I7IH1cbiAgICB9XG4gICAgcmV0dXJuIG1hcDtcbn07XG4vLyBUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBtYXRjaGVzIGFueSBVbmljb2RlIHNwYWNlIG9yIHB1bmN0dWF0aW9uIGNoYXJhY3RlclxuLy8gQWRhcHRlZCBmcm9tIGh0dHBzOi8vdW5pY29kZS5vcmcvY2xkci91dGlsaXR5L2xpc3QtdW5pY29kZXNldC5qc3A/YT0lNUNwJTdCWiU3RCU1Q3AlN0JQJTdEJmFiYj1vbiZjPW9uJmVzYz1vblxudmFyIFNQQUNFX09SX1BVTkNUVUFUSU9OID0gL1tcXG5cXHIgLSMlLSosLS86Oz9AWy1cXF1fe31cXHUwMEEwXFx1MDBBMVxcdTAwQTdcXHUwMEFCXFx1MDBCNlxcdTAwQjdcXHUwMEJCXFx1MDBCRlxcdTAzN0VcXHUwMzg3XFx1MDU1QS1cXHUwNTVGXFx1MDU4OVxcdTA1OEFcXHUwNUJFXFx1MDVDMFxcdTA1QzNcXHUwNUM2XFx1MDVGM1xcdTA1RjRcXHUwNjA5XFx1MDYwQVxcdTA2MENcXHUwNjBEXFx1MDYxQlxcdTA2MUVcXHUwNjFGXFx1MDY2QS1cXHUwNjZEXFx1MDZENFxcdTA3MDAtXFx1MDcwRFxcdTA3RjctXFx1MDdGOVxcdTA4MzAtXFx1MDgzRVxcdTA4NUVcXHUwOTY0XFx1MDk2NVxcdTA5NzBcXHUwOUZEXFx1MEE3NlxcdTBBRjBcXHUwQzc3XFx1MEM4NFxcdTBERjRcXHUwRTRGXFx1MEU1QVxcdTBFNUJcXHUwRjA0LVxcdTBGMTJcXHUwRjE0XFx1MEYzQS1cXHUwRjNEXFx1MEY4NVxcdTBGRDAtXFx1MEZENFxcdTBGRDlcXHUwRkRBXFx1MTA0QS1cXHUxMDRGXFx1MTBGQlxcdTEzNjAtXFx1MTM2OFxcdTE0MDBcXHUxNjZFXFx1MTY4MFxcdTE2OUJcXHUxNjlDXFx1MTZFQi1cXHUxNkVEXFx1MTczNVxcdTE3MzZcXHUxN0Q0LVxcdTE3RDZcXHUxN0Q4LVxcdTE3REFcXHUxODAwLVxcdTE4MEFcXHUxOTQ0XFx1MTk0NVxcdTFBMUVcXHUxQTFGXFx1MUFBMC1cXHUxQUE2XFx1MUFBOC1cXHUxQUFEXFx1MUI1QS1cXHUxQjYwXFx1MUJGQy1cXHUxQkZGXFx1MUMzQi1cXHUxQzNGXFx1MUM3RVxcdTFDN0ZcXHUxQ0MwLVxcdTFDQzdcXHUxQ0QzXFx1MjAwMC1cXHUyMDBBXFx1MjAxMC1cXHUyMDI5XFx1MjAyRi1cXHUyMDQzXFx1MjA0NS1cXHUyMDUxXFx1MjA1My1cXHUyMDVGXFx1MjA3RFxcdTIwN0VcXHUyMDhEXFx1MjA4RVxcdTIzMDgtXFx1MjMwQlxcdTIzMjlcXHUyMzJBXFx1Mjc2OC1cXHUyNzc1XFx1MjdDNVxcdTI3QzZcXHUyN0U2LVxcdTI3RUZcXHUyOTgzLVxcdTI5OThcXHUyOUQ4LVxcdTI5REJcXHUyOUZDXFx1MjlGRFxcdTJDRjktXFx1MkNGQ1xcdTJDRkVcXHUyQ0ZGXFx1MkQ3MFxcdTJFMDAtXFx1MkUyRVxcdTJFMzAtXFx1MkU0RlxcdTMwMDAtXFx1MzAwM1xcdTMwMDgtXFx1MzAxMVxcdTMwMTQtXFx1MzAxRlxcdTMwMzBcXHUzMDNEXFx1MzBBMFxcdTMwRkJcXHVBNEZFXFx1QTRGRlxcdUE2MEQtXFx1QTYwRlxcdUE2NzNcXHVBNjdFXFx1QTZGMi1cXHVBNkY3XFx1QTg3NC1cXHVBODc3XFx1QThDRVxcdUE4Q0ZcXHVBOEY4LVxcdUE4RkFcXHVBOEZDXFx1QTkyRVxcdUE5MkZcXHVBOTVGXFx1QTlDMS1cXHVBOUNEXFx1QTlERVxcdUE5REZcXHVBQTVDLVxcdUFBNUZcXHVBQURFXFx1QUFERlxcdUFBRjBcXHVBQUYxXFx1QUJFQlxcdUZEM0VcXHVGRDNGXFx1RkUxMC1cXHVGRTE5XFx1RkUzMC1cXHVGRTUyXFx1RkU1NC1cXHVGRTYxXFx1RkU2M1xcdUZFNjhcXHVGRTZBXFx1RkU2QlxcdUZGMDEtXFx1RkYwM1xcdUZGMDUtXFx1RkYwQVxcdUZGMEMtXFx1RkYwRlxcdUZGMUFcXHVGRjFCXFx1RkYxRlxcdUZGMjBcXHVGRjNCLVxcdUZGM0RcXHVGRjNGXFx1RkY1QlxcdUZGNURcXHVGRjVGLVxcdUZGNjVdKy91O1xuXG5leHBvcnQgeyBNaW5pU2VhcmNoIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcFxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKiBlc2xpbnQtZGlzYWJsZSAqL1xyXG5pbXBvcnQgTWluaVNlYXJjaCBmcm9tIFwibWluaXNlYXJjaFwiO1xyXG4gXHJcbi8qKlxyXG4gKiBDb25zdGFudHNcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogTE9DQUxfSU5ERVhfSUQ6IEtleSBmb3Igc3RvcmluZyB0aGUgc2VhcmNoIGluZGV4IGluIENocm9tZSdzIGxvY2FsIHN0b3JhZ2VcclxuICovXHJcbmV4cG9ydCBjb25zdCBMT0NBTF9JTkRFWF9JRCA9IFwibG9jYWxTZWFyY2hJbmRleFwiO1xyXG4gXHJcbi8qKlxyXG4gKiBEZWJ1ZyBVdGlsaXRpZXNcclxuICogLS0tLS0tLS0tLS0tLS1cclxuICogRnVuY3Rpb25zIGZvciBkZWJ1Z2dpbmcgYW5kIGRldmVsb3BtZW50LlxyXG4gKi9cclxuZnVuY3Rpb24gZXhwb3J0U3RvcmFnZVRvRmlsZSgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiU3RhcnRpbmcgZXhwb3J0Li4uXCIpO1xyXG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KExPQ0FMX0lOREVYX0lELCBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJSZXRyaWV2ZWQgZGF0YTpcIiwgZGF0YSk7XHJcbiAgICAgICAgY29uc3QganNvblN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGRhdGEsIG51bGwsIDIpO1xyXG4gICAgICAgIGNvbnN0IGRhdGFVcmwgPSAnZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCwnICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoanNvblN0cmluZykpKTtcclxuICAgICAgICBcclxuICAgICAgICBjaHJvbWUuZG93bmxvYWRzLmRvd25sb2FkKHtcclxuICAgICAgICAgICAgdXJsOiBkYXRhVXJsLFxyXG4gICAgICAgICAgICBmaWxlbmFtZTogJ2hhd2tfaW5kZXhfYmFja3VwLmpzb24nLFxyXG4gICAgICAgICAgICBzYXZlQXM6IHRydWVcclxuICAgICAgICB9LCAoZG93bmxvYWRJZCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRvd25sb2FkIHN0YXJ0ZWQgd2l0aCBJRDpcIiwgZG93bmxvYWRJZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy8gTWFrZSBleHBvcnQgZnVuY3Rpb24gYXZhaWxhYmxlIGdsb2JhbGx5XHJcbmdsb2JhbFRoaXMuZXhwb3J0SW5kZXggPSBleHBvcnRTdG9yYWdlVG9GaWxlO1xyXG5cclxuLy8gQWxzbyBhZGQgdG8gY2hyb21lIG9iamVjdCBmb3Igc2VydmljZSB3b3JrZXIgY29udGV4dFxyXG5jaHJvbWUuZXhwb3J0SW5kZXggPSBleHBvcnRTdG9yYWdlVG9GaWxlO1xyXG5cclxuLyoqXHJcbiAqIFNlYXJjaCBJbmRleCBNYW5hZ2VtZW50XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogSGFuZGxlcyBjcmVhdGluZywgbG9hZGluZywgYW5kIG1haW50YWluaW5nIHRoZSBzZWFyY2ggaW5kZXguXHJcbiAqL1xyXG5jb25zdCBjcmVhdGVJbmRleCA9IChleGlzdGluZ0luZGV4KT0+IHtcclxuICBsZXQgc3RvcFdvcmRzID0gWydpJywnbWUnLCdteScsJ215c2VsZicsJ3dlJywnb3VyJywnb3VycycsJ291cnNlbHZlcycsJ3lvdScsJ3lvdXInLCd5b3VycycsJ3lvdXJzZWxmJywneW91cnNlbHZlcycsJ2hlJywnaGltJywnaGlzJywnaGltc2VsZicsJ3NoZScsJ2hlcicsJ2hlcnMnLCdoZXJzZWxmJywnaXQnLCdpdHMnLCdpdHNlbGYnLCd0aGV5JywndGhlbScsJ3RoZWlyJywndGhlaXJzJywndGhlbXNlbHZlcycsJ3doYXQnLCd3aGljaCcsJ3dobycsJ3dob20nLCd0aGlzJywndGhhdCcsJ3RoZXNlJywndGhvc2UnLCdhbScsJ2lzJywnYXJlJywnd2FzJywnd2VyZScsJ2JlJywnYmVlbicsJ2JlaW5nJywnaGF2ZScsJ2hhcycsJ2hhZCcsJ2hhdmluZycsJ2RvJywnZG9lcycsJ2RpZCcsJ2RvaW5nJywnYScsJ2FuJywndGhlJywnYW5kJywnYnV0JywnaWYnLCdvcicsJ2JlY2F1c2UnLCdhcycsJ3VudGlsJywnd2hpbGUnLCdvZicsJ2F0JywnYnknLCdmb3InLCd3aXRoJywnYWJvdXQnLCdhZ2FpbnN0JywnYmV0d2VlbicsJ2ludG8nLCd0aHJvdWdoJywnZHVyaW5nJywnYmVmb3JlJywnYWZ0ZXInLCdhYm92ZScsJ2JlbG93JywndG8nLCdmcm9tJywndXAnLCdkb3duJywnaW4nLCdvdXQnLCdvbicsJ29mZicsJ292ZXInLCd1bmRlcicsJ2FnYWluJywnZnVydGhlcicsJ3RoZW4nLCdvbmNlJywnaGVyZScsJ3RoZXJlJywnd2hlbicsJ3doZXJlJywnd2h5JywnaG93JywnYWxsJywnYW55JywnYm90aCcsJ2VhY2gnLCdmZXcnLCdtb3JlJywnbW9zdCcsJ290aGVyJywnc29tZScsJ3N1Y2gnLCdubycsJ25vcicsJ25vdCcsJ29ubHknLCdvd24nLCdzYW1lJywnc28nLCd0aGFuJywndG9vJywndmVyeScsJ3MnLCd0JywnY2FuJywnd2lsbCcsJ2p1c3QnLCdkb24nLCdzaG91bGQnLCdub3cnXVxyXG4gXHJcbiAgY29uc3QgaW5kZXhEZXNjcmlwdG9yID0ge1xyXG4gICAgZmllbGRzOiBbJ3RpdGxlJywgJ2FsbFRleHQnXSxcclxuICAgIHN0b3JlRmllbGRzOiBbJ3RpdGxlJ10sXHJcbiAgICBpZEZpZWxkOiAnaWQnLFxyXG4gICAgcHJvY2Vzc1Rlcm06ICh0ZXJtLCBfZmllbGROYW1lKSA9PlxyXG4gICAgICBzdG9wV29yZHMuaW5jbHVkZXModGVybSkgPyBudWxsIDogdGVybS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgc2VhcmNoT3B0aW9uczoge1xyXG4gICAgICBwcm9jZXNzVGVybTogKHRlcm0pID0+IHRlcm0udG9Mb3dlckNhc2UoKVxyXG4gICAgfVxyXG4gIH07XHJcbiAgbGV0IGluZGV4ZXIgPSB1bmRlZmluZWQ7XHJcbiAgaWYoZXhpc3RpbmdJbmRleCA9PT0gdW5kZWZpbmVkKXtcclxuICAgIGluZGV4ZXIgPSBuZXcgTWluaVNlYXJjaChpbmRleERlc2NyaXB0b3IpO1xyXG4gIH1lbHNle1xyXG4gICAgaW5kZXhlciA9IE1pbmlTZWFyY2gubG9hZEpTT04oZXhpc3RpbmdJbmRleCxpbmRleERlc2NyaXB0b3IpO1xyXG4gIH1cclxuICByZXR1cm4gaW5kZXhlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIFN0b3JhZ2UgSW50ZXJmYWNlXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS1cclxuICogTWFuYWdlcyByZWFkaW5nL3dyaXRpbmcgdGhlIGluZGV4IGZyb20gQ2hyb21lJ3MgbG9jYWwgc3RvcmFnZS5cclxuICovXHJcbmNvbnN0IGdldFN0b3JlZEluZGV4ID0gKGNiKT0+e1xyXG4gIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChMT0NBTF9JTkRFWF9JRCwgKGRhdGEpPT57Y2IoZGF0YVtMT0NBTF9JTkRFWF9JRF0pfSk7XHJcbn1cclxuIFxyXG5jb25zdCBzdG9yZUluZGV4ID0gKGluZGV4RGF0YSkgPT4ge1xyXG4gIGNvbnN0IGRhdGEgPSB7XHJcbiAgICBbTE9DQUxfSU5ERVhfSURdOiBpbmRleERhdGFcclxuICB9XHJcbiAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KGRhdGEsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc29sZS5sb2coJ0luZGV4IGRhdGEgc2F2ZWRbJytkYXRhLmxlbmd0aCsnXScpO1xyXG4gIH0pO1xyXG59XHJcbiBcclxuLyoqXHJcbiAqIEluZGV4IEFjY2VzcyBhbmQgTWFuaXB1bGF0aW9uXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBGdW5jdGlvbnMgZm9yIHJldHJpZXZpbmcsIGFkZGluZywgYW5kIHVwZGF0aW5nIGluZGV4ZWQgZG9jdW1lbnRzLlxyXG4gKi9cclxuY29uc3QgZ2V0SW5kZXggPSAoKT0+IHtcclxuICBpZighY2hyb21lLmluZGV4ZXIpe1xyXG4gICAgaW5pdGlhbGlzZUluZGV4ZXIoKTtcclxuICB9XHJcbiAgcmV0dXJuIGNocm9tZS5pbmRleGVyO1xyXG59XHJcblxyXG4vKipcclxuICogVE9ETzogSW1wbGVtZW50IHRoaXMgZnVuY3Rpb24gdG8gcmVwbGFjZSB0aGUgaW5kZXhlciBkYXRhXHJcbiAqL1xyXG5jb25zdCByZXBsYWNlSW5kZXhlckRhdGEgPSAoKSA9PiB7XHJcbiBcclxuIFxyXG59XHJcblxyXG5jb25zdCBhZGRUb0luZGV4ID0gKGRvY3VtZW50KT0+IHtcclxuICBsZXQgaWR4ID0gZ2V0SW5kZXgoKTtcclxuICBpZihpZHgpe1xyXG4gICAgY29uc29sZS50aW1lKFwiSW5kZXhpbmcgRG9jOlwiICsgZG9jdW1lbnQuaWQpO1xyXG4gICAgaWYoaWR4Lmhhcyhkb2N1bWVudC5pZCkpe1xyXG4gICAgICBpZHgucmVwbGFjZShkb2N1bWVudCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiUmVwbGFjaW5nIGRvYyBpbiB0aGUgaW5kZXhcIik7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgaWR4LmFkZChkb2N1bWVudCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiQWRkaW5nIG5ldyBkb2MgaW4gdGhlIGluZGV4XCIpO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS50aW1lRW5kKFwiSW5kZXhpbmcgRG9jOlwiICsgZG9jdW1lbnQuaWQpO1xyXG4gICAgY29uc29sZS50aW1lKFwiU3RvcmluZyB0aGUgd2hvbGUgSW5kZXhcIik7XHJcbiAgICBsZXQgZGF0YSA9IEpTT04uc3RyaW5naWZ5KGlkeCk7XHJcbiAgICBzdG9yZUluZGV4KGRhdGEpO1xyXG4gICAgY29uc29sZS50aW1lRW5kKFwiU3RvcmluZyB0aGUgd2hvbGUgSW5kZXhcIik7XHJcbiAgfVxyXG59XHJcbiBcclxuLyoqXHJcbiAqIFNlYXJjaCBhbmQgUmVzdWx0cyBQcm9jZXNzaW5nXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBIYW5kbGVzIHF1ZXJ5aW5nIHRoZSBpbmRleCBhbmQgZm9ybWF0dGluZyByZXN1bHRzLlxyXG4gKi9cclxuY29uc3Qgc2VhcmNoID0gKGRvY3VtZW50LCBvcHRpb25zKSA9PiB7XHJcbiAgbGV0IGlkeCA9IGdldEluZGV4KCk7XHJcbiAgcmV0dXJuIGlkeC5zZWFyY2goZG9jdW1lbnQpO1xyXG59XHJcblxyXG5jb25zdCBzZW5kUmVzdWx0cyA9IChzZWFyY2hRdWVyeSwgc2VuZFJlc3BvbnNlKT0+e1xyXG4gIGxldCBzZWFyY2hSZXN1bHRzID0gIHNlYXJjaChzZWFyY2hRdWVyeSwgbnVsbCk7XHJcbiAgbGV0IHN1Z2dlc3Rpb25zID0gW107XHJcbiAgZm9yKGxldCBpPTA7aTxzZWFyY2hSZXN1bHRzLmxlbmd0aCAmJiBpPDU7aSsrKXtcclxuICAgIHN1Z2dlc3Rpb25zLnB1c2goe2NvbnRlbnQ6c2VhcmNoUmVzdWx0c1tpXS5pZCxkZXNjcmlwdGlvbjpyZW1vdmVTcGVjaWFsQ2hhcmFjdGVycyhzZWFyY2hSZXN1bHRzW2ldLnRpdGxlKX0pO1xyXG4gICAgY29uc29sZS5sb2coe2NvbnRlbnQ6c2VhcmNoUmVzdWx0c1tpXS5pZCxkZXNjcmlwdGlvbjpzZWFyY2hSZXN1bHRzW2ldLnRpdGxlfSk7XHJcbiAgfVxyXG4gIGNvbnNvbGUubG9nKFwibnVtYmVycyBvZiBzdWdnZXN0aW9uczpcIiArIHN1Z2dlc3Rpb25zLmxlbmd0aCk7XHJcbiAgc2VuZFJlc3BvbnNlKHN1Z2dlc3Rpb25zKTtcclxufVxyXG4gXHJcbi8qKlxyXG4gKiBNZXNzYWdlIEhhbmRsaW5nXHJcbiAqIC0tLS0tLS0tLS0tLS0tLVxyXG4gKiBQcm9jZXNzZXMgbWVzc2FnZXMgZnJvbSBjb250ZW50IHNjcmlwdHMgYW5kIHRoZSBwb3B1cC5cclxuICovXHJcbmNvbnN0IGluZGV4aW5nTGlzdGVuZXIgPSAocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcclxuICAgIGlmICgocmVxdWVzdC5mcm9tID09PSAncG9wdXAnKSAmJiAocmVxdWVzdC5zdWJqZWN0ID09PSAnaW5kZXhlckRhdGEnKSkge1xyXG4gICAgICAgIHNlbmRSZXNwb25zZShjaHJvbWUuc3RvcmVkSW5kZXgpO1xyXG4gICAgfSBlbHNlIGlmICgocmVxdWVzdC5mcm9tID09PSAncG9wdXAnKSAmJiAocmVxdWVzdC5zdWJqZWN0ID09PSAnc2V0SW5kZXhlckRhdGEnKSkge1xyXG4gICAgICAgIGxldCBpc1N1Y2Nlc3NmdWwgPSByZXBsYWNlSW5kZXhlckRhdGEocmVxdWVzdC5jb250ZW50KTtcclxuICAgIH0gZWxzZSBpZiAocmVxdWVzdC5hY3Rpb24gPT09ICdleHBvcnRJbmRleCcpIHtcclxuICAgICAgICBleHBvcnRTdG9yYWdlVG9GaWxlKCk7XHJcbiAgICAgICAgc2VuZFJlc3BvbnNlKHtzdGF0dXM6ICdleHBvcnRpbmcnfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFkZFRvSW5kZXgocmVxdWVzdC5kb2N1bWVudCk7XHJcbiAgICAgICAgc2VuZFJlc3BvbnNlKFwiT0s6SW5kZXhlZFwiKTtcclxuICAgIH1cclxufVxyXG4gXHJcbi8qKlxyXG4gKiBJbml0aWFsaXphdGlvblxyXG4gKiAtLS0tLS0tLS0tLS0tXHJcbiAqIFNldHMgdXAgdGhlIGV4dGVuc2lvbiBhbmQgc2VhcmNoIGluZGV4ZXIuXHJcbiAqL1xyXG5jb25zdCBpbml0aWFsaXNlSW5kZXhlciA9ICgpPT4ge1xyXG4gIGNvbnN0IGluaXRpYWxpc2VJbmRleGVyQXN5bmMgPShpbmRleGVyRGF0YSkgPT4ge1xyXG4gICAgaWYoaW5kZXhlckRhdGEgJiYgaW5kZXhlckRhdGEubGVuZ3RoID4gMCl7XHJcbiAgICAgIGNocm9tZS5zdG9yZWRJbmRleCA9IGluZGV4ZXJEYXRhO1xyXG4gICAgfVxyXG4gICAgY2hyb21lLmluZGV4ZXIgID0gY3JlYXRlSW5kZXgoY2hyb21lLnN0b3JlZEluZGV4KTtcclxuICB9XHJcbiAgZ2V0U3RvcmVkSW5kZXgoaW5pdGlhbGlzZUluZGV4ZXJBc3luYyk7XHJcbn1cclxuIFxyXG4vKipcclxuICogVXRpbGl0eSBGdW5jdGlvbnNcclxuICogLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuY29uc3QgcmVtb3ZlU3BlY2lhbENoYXJhY3RlcnMgPSAoc3RyaW5nVG9CZVNhbml0aXplZCk9PntcclxuICBsZXQgc3BlY2lhbENoYXJzID0gXCIhQCMkXiYlKis9W11cXC97fXw6PD4/LC5cIjtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNwZWNpYWxDaGFycy5sZW5ndGg7IGkrKykge1xyXG4gICAgc3RyaW5nVG9CZVNhbml0aXplZCA9IHN0cmluZ1RvQmVTYW5pdGl6ZWQucmVwbGFjZShuZXcgUmVnRXhwKFwiXFxcXFwiICsgc3BlY2lhbENoYXJzW2ldLCBcImdpXCIpLCBcIlwiKTtcclxuICB9XHJcbiAgcmV0dXJuIHN0cmluZ1RvQmVTYW5pdGl6ZWQ7XHJcbn1cclxuXHJcbi8vIEluaXRpYWxpemUgZXh0ZW5zaW9uIGFuZCBzZXQgdXAgbGlzdGVuZXJzXHJcbmluaXRpYWxpc2VJbmRleGVyKCk7XHJcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihpbmRleGluZ0xpc3RlbmVyKTtcclxuIFxyXG5jaHJvbWUub21uaWJveC5vbklucHV0Q2hhbmdlZC5hZGRMaXN0ZW5lcigodGV4dCxzdWdnZXN0KSA9PiB7XHJcbiAgc2VuZFJlc3VsdHModGV4dCxzdWdnZXN0KTtcclxufSk7XHJcbiBcclxuY2hyb21lLm9tbmlib3gub25JbnB1dEVudGVyZWQuYWRkTGlzdGVuZXIoKHRleHQsIE9uSW5wdXRFbnRlcmVkRGlzcG9zaXRpb24pID0+IHtcclxuICBjaHJvbWUudGFicy51cGRhdGUoe3VybDp0ZXh0fSk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBkZWxldGVUYXNrKGFsbFRhc2tzLCB0YXNrSWRUb1JlbW92ZSkge1xyXG4gIGNvbnN0IHVwZGF0ZWRUYXNrcyA9IE9iamVjdC5mcm9tRW50cmllcyhcclxuICAgIE9iamVjdC5lbnRyaWVzKGFsbFRhc2tzKS5maWx0ZXIoKFt0YXNrSWRdKSA9PiB0YXNrSWQgIT09IHRhc2tJZFRvUmVtb3ZlKSxcclxuICApO1xyXG4gIGlmIChPYmplY3Qua2V5cyh1cGRhdGVkVGFza3MpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgYWxsVGFza3MgPSB7fTtcclxuICB9IGVsc2Uge1xyXG4gICAgYWxsVGFza3MgPSB1cGRhdGVkVGFza3M7XHJcbiAgfVxyXG4gIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7IHRhc2tzOiBhbGxUYXNrcyB9LCAoKSA9PiB7fSk7XHJcbn1cclxuXHJcbmNocm9tZS5hbGFybXMub25BbGFybS5hZGRMaXN0ZW5lcigoYWxhcm0pID0+IHtcclxuICBjb25zdCBhbGFybU5hbWUgPSBhbGFybS5uYW1lO1xyXG4gIGlmIChhbGFybU5hbWUuZW5kc1dpdGgoJ19kZWxldGlvbl9hbGFybScpKSB7XHJcbiAgICBjb25zdCB0YXNrSWQgPSBhbGFybU5hbWUuc3BsaXQoJ18nKVswXTtcclxuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCh7IHRhc2tzOiB7fSB9LCAocmVzdWx0KSA9PiB7XHJcbiAgICAgIGNvbnN0IGV4aXN0aW5nVGFza3MgPSByZXN1bHQudGFza3MgfHwge307XHJcbiAgICAgIGRlbGV0ZVRhc2soZXhpc3RpbmdUYXNrcywgdGFza0lkKTtcclxuICAgIH0pO1xyXG4gIH1cclxufSk7XHJcblxyXG5jaHJvbWUuYWxhcm1zLm9uQWxhcm0uYWRkTGlzdGVuZXIoKGFsYXJtKSA9PiB7XHJcbiAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCd0YXNrcycpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgY29uc3QgZXhpc3RpbmdUYXNrcyA9IHJlc3VsdCB8fCB7fTtcclxuICAgIGNvbnN0IGZvdW5kVGFzayA9IGV4aXN0aW5nVGFza3MudGFza3NbYWxhcm0ubmFtZV07XHJcbiAgICBpZiAoT2JqZWN0LmtleXMoZXhpc3RpbmdUYXNrcykubGVuZ3RoICE9PSAwICYmIGZvdW5kVGFzayAmJiAhZm91bmRUYXNrLnJlY2VudGx5RGVsZXRlZCkge1xyXG4gICAgICBjb25zdCBub3RpZmljYXRpb24gPSB7XHJcbiAgICAgICAgdHlwZTogJ2Jhc2ljJyxcclxuICAgICAgICBpY29uVXJsOiBjaHJvbWUucnVudGltZS5nZXRVUkwoJy4uL2ltYWdlcy9sb2dvMTI4eDEyOC5wbmcnKSxcclxuICAgICAgICB0aXRsZTogYFlvdXIgdGFzayAke2ZvdW5kVGFzay50aXRsZX0gaXMgZHVlYCxcclxuICAgICAgICBtZXNzYWdlOiBmb3VuZFRhc2suZGVzY3JpcHRpb24sXHJcbiAgICAgIH07XHJcbiAgICAgIGNocm9tZS5ub3RpZmljYXRpb25zLmNyZWF0ZShhbGFybS5uYW1lLCBub3RpZmljYXRpb24pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59KTtcclxuXHJcbmNocm9tZS5jb250ZXh0TWVudXMub25DbGlja2VkLmFkZExpc3RlbmVyKChpbmZvKSA9PiB7XHJcbiAgaWYgKGluZm8ubWVudUl0ZW1JZCA9PT0gJ2FkZC1ub3RlJykge1xyXG4gICAgYWxlcnQoJ1lvdSBjbGlja2VkIHRoZSBjdXN0b20gbWVudSBpdGVtIScpO1xyXG4gIH1cclxufSk7XHJcblxyXG5jaHJvbWUucnVudGltZS5vbkluc3RhbGxlZC5hZGRMaXN0ZW5lcigoZGV0YWlscykgPT4ge1xyXG4gIGlmIChkZXRhaWxzLnJlYXNvbiA9PT0gJ2luc3RhbGwnKSB7XHJcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyBhbGxvd2VkU2l0ZXM6IFtdIH0sICgpID0+IHtcclxuICAgIH0pO1xyXG5cclxuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7IGFsbG93ZWRVUkxzOiBbXSB9LCAoKSA9PiB7fSk7XHJcblxyXG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgYWxsb3dlZFN0cmluZ01hdGNoZXM6IFtdIH0sICgpID0+IHt9KTtcclxuXHJcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyBhbGxvd2VkUmVnZXg6IGRlZmF1bHRSZWdleExpc3QgfSwgKCkgPT4ge30pO1xyXG5cclxuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7IGFsbExhc3RUaXRsZXM6IHt9IH0sICgpID0+IHt9KTtcclxuICB9XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlQ29udGV4dE1lbnUoKSB7XHJcbiAgY2hyb21lLmNvbnRleHRNZW51cy5jcmVhdGUoe1xyXG4gICAgaWQ6ICdhZGROb3RlJyxcclxuICAgIHRpdGxlOiAnSGF3ayAyIC0gQWRkIHRleHQgdG8gTm90ZXMnLFxyXG4gICAgY29udGV4dHM6IFsnc2VsZWN0aW9uJ10sXHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldER1ZURhdGUoZGF5c1RvQWRkKSB7XHJcbiAgY29uc3QgZHVlRGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgZHVlRGF0ZS5zZXREYXRlKGR1ZURhdGUuZ2V0RGF0ZSgpICsgZGF5c1RvQWRkKTsgLy8gQWRkIGRheXMgYmFzZWQgb24gdGhlIGlucHV0XHJcbiAgcmV0dXJuIGR1ZURhdGUudG9JU09TdHJpbmcoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkTmV3Tm90ZSh0aXRsZSwgY29udGVudCwgdGFncykge1xyXG4gIGNvbnN0IG5vdGVJZCA9IERhdGUubm93KCkudG9TdHJpbmcoKTtcclxuICBjb25zdCBub3RlID0ge1xyXG4gICAgaWQ6IG5vdGVJZCxcclxuICAgIHRpdGxlLFxyXG4gICAgY29udGVudCxcclxuICAgIGR1ZTogc2V0RHVlRGF0ZSg3KSxcclxuICAgIHNjaGVkdWxlZERlbGV0aW9uOiAnJyxcclxuICAgIHJlY2VudGx5RGVsZXRlZDogZmFsc2UsXHJcbiAgICB0YWdzLFxyXG4gIH07XHJcbiAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KHsgbm90ZXM6IFtdIH0sIChkYXRhKSA9PiB7XHJcbiAgICBjb25zdCBleGlzdGluZ05vdGVzID0gZGF0YS5ub3RlcztcclxuXHJcbiAgICBleGlzdGluZ05vdGVzLnB1c2gobm90ZSk7XHJcblxyXG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgbm90ZXM6IGV4aXN0aW5nTm90ZXMgfSwgKCkgPT4ge1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8vIExpc3RlbiBmb3Igd2hlbiB0aGUgdGFiJ3MgdXJsIGNoYW5nZXMgYW5kIHNlbmQgYSBtZXNzYWdlIHRvIHBvcHVwLmpzXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXHJcbmNocm9tZS50YWJzLm9uVXBkYXRlZC5hZGRMaXN0ZW5lcigodGFiSWQsIGNoYW5nZUluZm8sIHRhYikgPT4ge1xyXG4gIGlmIChjaGFuZ2VJbmZvLnVybCkge1xyXG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyB0eXBlOiAnVVJMX1VQREFURUQnLCB1cmw6IGNoYW5nZUluZm8udXJsIH0pO1xyXG4gIH1cclxufSk7XHJcbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuXHJcbi8vIExpc3RlbiBmb3Igd2hlbiB0aGUgdXNlciBjaGFuZ2VzIHRhYnMgYW5kIHNlbmQgYSBtZXNzYWdlIHRvIHBvcHVwLmpzXHJcbmNocm9tZS50YWJzLm9uQWN0aXZhdGVkLmFkZExpc3RlbmVyKChhY3RpdmVJbmZvKSA9PiB7XHJcbiAgY2hyb21lLnRhYnMuZ2V0KGFjdGl2ZUluZm8udGFiSWQsICh0YWIpID0+IHtcclxuICAgIGlmICh0YWIgJiYgdGFiLnVybCkge1xyXG4gICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7IHR5cGU6ICdUQUJfQ0hBTkdFRCcsIHVybDogdGFiLnVybCB9KTtcclxuICAgIH1cclxuICB9KTtcclxufSk7XHJcblxyXG5jaHJvbWUuY29udGV4dE1lbnVzLm9uQ2xpY2tlZC5hZGRMaXN0ZW5lcigoaW5mbykgPT4ge1xyXG4gIGlmIChpbmZvLm1lbnVJdGVtSWQgPT09ICdhZGROb3RlJykge1xyXG4gICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgKHRhYnMpID0+IHtcclxuICAgICAgY29uc3QgY3VycmVudFRpdGxlID0gdGFic1swXS50aXRsZTtcclxuICAgICAgY29uc3Qgc2VsZWN0ZWRUZXh0ID0gYCR7Y3VycmVudFRpdGxlfSAke2luZm8uc2VsZWN0aW9uVGV4dH1gO1xyXG4gICAgICBjb25zdCB0aXRsZSA9IHNlbGVjdGVkVGV4dC5sZW5ndGggPiAxMCA/IGAke3NlbGVjdGVkVGV4dC5zdWJzdHJpbmcoMCwgMTUpfS4uLmAgOiBzZWxlY3RlZFRleHQ7XHJcbiAgICAgIGFkZE5ld05vdGUodGl0bGUsIHNlbGVjdGVkVGV4dCwge30pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59KTtcclxuXHJcbmNocm9tZS5ydW50aW1lLm9uSW5zdGFsbGVkLmFkZExpc3RlbmVyKCgpID0+IHtcclxuICBjcmVhdGVDb250ZXh0TWVudSgpO1xyXG59KTtcclxuXHJcbmNocm9tZS5ydW50aW1lLm9uSW5zdGFsbGVkLmFkZExpc3RlbmVyKCgpID0+IHtcclxuICBjaHJvbWUuc2lkZVBhbmVsLnNldFBhbmVsQmVoYXZpb3IoeyBvcGVuUGFuZWxPbkFjdGlvbkNsaWNrOiB0cnVlIH0pLmNhdGNoKGNvbnNvbGUuZXJyb3IpO1xyXG59KTsiXSwibmFtZXMiOlsiTWluaVNlYXJjaCIsIkxPQ0FMX0lOREVYX0lEIiwiZXhwb3J0U3RvcmFnZVRvRmlsZSIsImNvbnNvbGUiLCJsb2ciLCJjaHJvbWUiLCJzdG9yYWdlIiwibG9jYWwiLCJnZXQiLCJkYXRhIiwianNvblN0cmluZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJkYXRhVXJsIiwiYnRvYSIsInVuZXNjYXBlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiZG93bmxvYWRzIiwiZG93bmxvYWQiLCJ1cmwiLCJmaWxlbmFtZSIsInNhdmVBcyIsImRvd25sb2FkSWQiLCJnbG9iYWxUaGlzIiwiZXhwb3J0SW5kZXgiLCJjcmVhdGVJbmRleCIsImV4aXN0aW5nSW5kZXgiLCJzdG9wV29yZHMiLCJpbmRleERlc2NyaXB0b3IiLCJmaWVsZHMiLCJzdG9yZUZpZWxkcyIsImlkRmllbGQiLCJwcm9jZXNzVGVybSIsInRlcm0iLCJfZmllbGROYW1lIiwiaW5jbHVkZXMiLCJ0b0xvd2VyQ2FzZSIsInNlYXJjaE9wdGlvbnMiLCJpbmRleGVyIiwidW5kZWZpbmVkIiwibG9hZEpTT04iLCJnZXRTdG9yZWRJbmRleCIsImNiIiwic3RvcmVJbmRleCIsImluZGV4RGF0YSIsIl9kZWZpbmVQcm9wZXJ0eSIsInNldCIsImxlbmd0aCIsImdldEluZGV4IiwiaW5pdGlhbGlzZUluZGV4ZXIiLCJyZXBsYWNlSW5kZXhlckRhdGEiLCJhZGRUb0luZGV4IiwiZG9jdW1lbnQiLCJpZHgiLCJ0aW1lIiwiaWQiLCJoYXMiLCJyZXBsYWNlIiwiYWRkIiwidGltZUVuZCIsInNlYXJjaCIsIm9wdGlvbnMiLCJzZW5kUmVzdWx0cyIsInNlYXJjaFF1ZXJ5Iiwic2VuZFJlc3BvbnNlIiwic2VhcmNoUmVzdWx0cyIsInN1Z2dlc3Rpb25zIiwiaSIsInB1c2giLCJjb250ZW50IiwiZGVzY3JpcHRpb24iLCJyZW1vdmVTcGVjaWFsQ2hhcmFjdGVycyIsInRpdGxlIiwiaW5kZXhpbmdMaXN0ZW5lciIsInJlcXVlc3QiLCJzZW5kZXIiLCJmcm9tIiwic3ViamVjdCIsInN0b3JlZEluZGV4IiwiaXNTdWNjZXNzZnVsIiwiYWN0aW9uIiwic3RhdHVzIiwiaW5pdGlhbGlzZUluZGV4ZXJBc3luYyIsImluZGV4ZXJEYXRhIiwic3RyaW5nVG9CZVNhbml0aXplZCIsInNwZWNpYWxDaGFycyIsIlJlZ0V4cCIsInJ1bnRpbWUiLCJvbk1lc3NhZ2UiLCJhZGRMaXN0ZW5lciIsIm9tbmlib3giLCJvbklucHV0Q2hhbmdlZCIsInRleHQiLCJzdWdnZXN0Iiwib25JbnB1dEVudGVyZWQiLCJPbklucHV0RW50ZXJlZERpc3Bvc2l0aW9uIiwidGFicyIsInVwZGF0ZSIsImRlbGV0ZVRhc2siLCJhbGxUYXNrcyIsInRhc2tJZFRvUmVtb3ZlIiwidXBkYXRlZFRhc2tzIiwiT2JqZWN0IiwiZnJvbUVudHJpZXMiLCJlbnRyaWVzIiwiZmlsdGVyIiwiX3JlZiIsIl9yZWYyIiwiX3NsaWNlZFRvQXJyYXkiLCJ0YXNrSWQiLCJrZXlzIiwidGFza3MiLCJhbGFybXMiLCJvbkFsYXJtIiwiYWxhcm0iLCJhbGFybU5hbWUiLCJuYW1lIiwiZW5kc1dpdGgiLCJzcGxpdCIsInJlc3VsdCIsImV4aXN0aW5nVGFza3MiLCJ0aGVuIiwiZm91bmRUYXNrIiwicmVjZW50bHlEZWxldGVkIiwibm90aWZpY2F0aW9uIiwidHlwZSIsImljb25VcmwiLCJnZXRVUkwiLCJjb25jYXQiLCJtZXNzYWdlIiwibm90aWZpY2F0aW9ucyIsImNyZWF0ZSIsImNvbnRleHRNZW51cyIsIm9uQ2xpY2tlZCIsImluZm8iLCJtZW51SXRlbUlkIiwiYWxlcnQiLCJvbkluc3RhbGxlZCIsImRldGFpbHMiLCJyZWFzb24iLCJhbGxvd2VkU2l0ZXMiLCJhbGxvd2VkVVJMcyIsImFsbG93ZWRTdHJpbmdNYXRjaGVzIiwiYWxsb3dlZFJlZ2V4IiwiZGVmYXVsdFJlZ2V4TGlzdCIsImFsbExhc3RUaXRsZXMiLCJjcmVhdGVDb250ZXh0TWVudSIsImNvbnRleHRzIiwic2V0RHVlRGF0ZSIsImRheXNUb0FkZCIsImR1ZURhdGUiLCJEYXRlIiwic2V0RGF0ZSIsImdldERhdGUiLCJ0b0lTT1N0cmluZyIsImFkZE5ld05vdGUiLCJ0YWdzIiwibm90ZUlkIiwibm93IiwidG9TdHJpbmciLCJub3RlIiwiZHVlIiwic2NoZWR1bGVkRGVsZXRpb24iLCJub3RlcyIsImV4aXN0aW5nTm90ZXMiLCJvblVwZGF0ZWQiLCJ0YWJJZCIsImNoYW5nZUluZm8iLCJ0YWIiLCJzZW5kTWVzc2FnZSIsIm9uQWN0aXZhdGVkIiwiYWN0aXZlSW5mbyIsInF1ZXJ5IiwiYWN0aXZlIiwiY3VycmVudFdpbmRvdyIsImN1cnJlbnRUaXRsZSIsInNlbGVjdGVkVGV4dCIsInNlbGVjdGlvblRleHQiLCJzdWJzdHJpbmciLCJzaWRlUGFuZWwiLCJzZXRQYW5lbEJlaGF2aW9yIiwib3BlblBhbmVsT25BY3Rpb25DbGljayIsImVycm9yIl0sInNvdXJjZVJvb3QiOiIifQ==