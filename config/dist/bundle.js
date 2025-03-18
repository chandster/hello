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
/** @ignore */
const ENTRIES = 'ENTRIES';
/** @ignore */
const KEYS = 'KEYS';
/** @ignore */
const VALUES = 'VALUES';
/** @ignore */
const LEAF = '';
/**
 * @private
 */
class TreeIterator {
    constructor(set, type) {
        const node = set._tree;
        const keys = Array.from(node.keys());
        this.set = set;
        this._type = type;
        this._path = keys.length > 0 ? [{ node, keys }] : [];
    }
    next() {
        const value = this.dive();
        this.backtrack();
        return value;
    }
    dive() {
        if (this._path.length === 0) {
            return { done: true, value: undefined };
        }
        const { node, keys } = last$1(this._path);
        if (last$1(keys) === LEAF) {
            return { done: false, value: this.result() };
        }
        const child = node.get(last$1(keys));
        this._path.push({ node: child, keys: Array.from(child.keys()) });
        return this.dive();
    }
    backtrack() {
        if (this._path.length === 0) {
            return;
        }
        const keys = last$1(this._path).keys;
        keys.pop();
        if (keys.length > 0) {
            return;
        }
        this._path.pop();
        this.backtrack();
    }
    key() {
        return this.set._prefix + this._path
            .map(({ keys }) => last$1(keys))
            .filter(key => key !== LEAF)
            .join('');
    }
    value() {
        return last$1(this._path).node.get(LEAF);
    }
    result() {
        switch (this._type) {
            case VALUES: return this.value();
            case KEYS: return this.key();
            default: return [this.key(), this.value()];
        }
    }
    [Symbol.iterator]() {
        return this;
    }
}
const last$1 = (array) => {
    return array[array.length - 1];
};

/* eslint-disable no-labels */
/**
 * @ignore
 */
const fuzzySearch = (node, query, maxDistance) => {
    const results = new Map();
    if (query === undefined)
        return results;
    // Number of columns in the Levenshtein matrix.
    const n = query.length + 1;
    // Matching terms can never be longer than N + maxDistance.
    const m = n + maxDistance;
    // Fill first matrix row and column with numbers: 0 1 2 3 ...
    const matrix = new Uint8Array(m * n).fill(maxDistance + 1);
    for (let j = 0; j < n; ++j)
        matrix[j] = j;
    for (let i = 1; i < m; ++i)
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
const recurse = (node, query, maxDistance, results, matrix, m, n, prefix) => {
    const offset = m * n;
    key: for (const key of node.keys()) {
        if (key === LEAF) {
            // We've reached a leaf node. Check if the edit distance acceptable and
            // store the result if it is.
            const distance = matrix[offset - 1];
            if (distance <= maxDistance) {
                results.set(prefix, [node.get(key), distance]);
            }
        }
        else {
            // Iterate over all characters in the key. Update the Levenshtein matrix
            // and check if the minimum distance in the last row is still within the
            // maximum edit distance. If it is, we can recurse over all child nodes.
            let i = m;
            for (let pos = 0; pos < key.length; ++pos, ++i) {
                const char = key[pos];
                const thisRowOffset = n * i;
                const prevRowOffset = thisRowOffset - n;
                // Set the first column based on the previous row, and initialize the
                // minimum distance in the current row.
                let minDistance = matrix[thisRowOffset];
                const jmin = Math.max(0, i - maxDistance - 1);
                const jmax = Math.min(n - 1, i + maxDistance);
                // Iterate over remaining columns (characters in the query).
                for (let j = jmin; j < jmax; ++j) {
                    const different = char !== query[j];
                    // It might make sense to only read the matrix positions used for
                    // deletion/insertion if the characters are different. But we want to
                    // avoid conditional reads for performance reasons.
                    const rpl = matrix[prevRowOffset + j] + +different;
                    const del = matrix[prevRowOffset + j + 1] + 1;
                    const ins = matrix[thisRowOffset + j] + 1;
                    const dist = matrix[thisRowOffset + j + 1] = Math.min(rpl, del, ins);
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
};

/* eslint-disable no-labels */
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
class SearchableMap {
    /**
     * The constructor is normally called without arguments, creating an empty
     * map. In order to create a {@link SearchableMap} from an iterable or from an
     * object, check {@link SearchableMap.from} and {@link
     * SearchableMap.fromObject}.
     *
     * The constructor arguments are for internal use, when creating derived
     * mutable views of a map at a prefix.
     */
    constructor(tree = new Map(), prefix = '') {
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
    atPrefix(prefix) {
        if (!prefix.startsWith(this._prefix)) {
            throw new Error('Mismatched prefix');
        }
        const [node, path] = trackDown(this._tree, prefix.slice(this._prefix.length));
        if (node === undefined) {
            const [parentNode, key] = last(path);
            for (const k of parentNode.keys()) {
                if (k !== LEAF && k.startsWith(key)) {
                    const node = new Map();
                    node.set(k.slice(key.length), parentNode.get(k));
                    return new SearchableMap(node, prefix);
                }
            }
        }
        return new SearchableMap(node, prefix);
    }
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear
     */
    clear() {
        this._size = undefined;
        this._tree.clear();
    }
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete
     * @param key  Key to delete
     */
    delete(key) {
        this._size = undefined;
        return remove(this._tree, key);
    }
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries
     * @return An iterator iterating through `[key, value]` entries.
     */
    entries() {
        return new TreeIterator(this, ENTRIES);
    }
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach
     * @param fn  Iteration function
     */
    forEach(fn) {
        for (const [key, value] of this) {
            fn(key, value, this);
        }
    }
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
    fuzzyGet(key, maxEditDistance) {
        return fuzzySearch(this._tree, key, maxEditDistance);
    }
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get
     * @param key  Key to get
     * @return Value associated to the key, or `undefined` if the key is not
     * found.
     */
    get(key) {
        const node = lookup(this._tree, key);
        return node !== undefined ? node.get(LEAF) : undefined;
    }
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has
     * @param key  Key
     * @return True if the key is in the map, false otherwise
     */
    has(key) {
        const node = lookup(this._tree, key);
        return node !== undefined && node.has(LEAF);
    }
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys
     * @return An `Iterable` iterating through keys
     */
    keys() {
        return new TreeIterator(this, KEYS);
    }
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set
     * @param key  Key to set
     * @param value  Value to associate to the key
     * @return The {@link SearchableMap} itself, to allow chaining
     */
    set(key, value) {
        if (typeof key !== 'string') {
            throw new Error('key must be a string');
        }
        this._size = undefined;
        const node = createPath(this._tree, key);
        node.set(LEAF, value);
        return this;
    }
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size
     */
    get size() {
        if (this._size) {
            return this._size;
        }
        /** @ignore */
        this._size = 0;
        const iter = this.entries();
        while (!iter.next().done)
            this._size += 1;
        return this._size;
    }
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
    update(key, fn) {
        if (typeof key !== 'string') {
            throw new Error('key must be a string');
        }
        this._size = undefined;
        const node = createPath(this._tree, key);
        node.set(LEAF, fn(node.get(LEAF)));
        return this;
    }
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
     * @param initial  A function that creates a new value if the key does not exist
     * @return The existing or new value at the given key
     */
    fetch(key, initial) {
        if (typeof key !== 'string') {
            throw new Error('key must be a string');
        }
        this._size = undefined;
        const node = createPath(this._tree, key);
        let value = node.get(LEAF);
        if (value === undefined) {
            node.set(LEAF, value = initial());
        }
        return value;
    }
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values
     * @return An `Iterable` iterating through values.
     */
    values() {
        return new TreeIterator(this, VALUES);
    }
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/@@iterator
     */
    [Symbol.iterator]() {
        return this.entries();
    }
    /**
     * Creates a {@link SearchableMap} from an `Iterable` of entries
     *
     * @param entries  Entries to be inserted in the {@link SearchableMap}
     * @return A new {@link SearchableMap} with the given entries
     */
    static from(entries) {
        const tree = new SearchableMap();
        for (const [key, value] of entries) {
            tree.set(key, value);
        }
        return tree;
    }
    /**
     * Creates a {@link SearchableMap} from the iterable properties of a JavaScript object
     *
     * @param object  Object of entries for the {@link SearchableMap}
     * @return A new {@link SearchableMap} with the given entries
     */
    static fromObject(object) {
        return SearchableMap.from(Object.entries(object));
    }
}
const trackDown = (tree, key, path = []) => {
    if (key.length === 0 || tree == null) {
        return [tree, path];
    }
    for (const k of tree.keys()) {
        if (k !== LEAF && key.startsWith(k)) {
            path.push([tree, k]); // performance: update in place
            return trackDown(tree.get(k), key.slice(k.length), path);
        }
    }
    path.push([tree, key]); // performance: update in place
    return trackDown(undefined, '', path);
};
const lookup = (tree, key) => {
    if (key.length === 0 || tree == null) {
        return tree;
    }
    for (const k of tree.keys()) {
        if (k !== LEAF && key.startsWith(k)) {
            return lookup(tree.get(k), key.slice(k.length));
        }
    }
};
// Create a path in the radix tree for the given key, and returns the deepest
// node. This function is in the hot path for indexing. It avoids unnecessary
// string operations and recursion for performance.
const createPath = (node, key) => {
    const keyLength = key.length;
    outer: for (let pos = 0; node && pos < keyLength;) {
        for (const k of node.keys()) {
            // Check whether this key is a candidate: the first characters must match.
            if (k !== LEAF && key[pos] === k[0]) {
                const len = Math.min(keyLength - pos, k.length);
                // Advance offset to the point where key and k no longer match.
                let offset = 1;
                while (offset < len && key[pos + offset] === k[offset])
                    ++offset;
                const child = node.get(k);
                if (offset === k.length) {
                    // The existing key is shorter than the key we need to create.
                    node = child;
                }
                else {
                    // Partial match: we need to insert an intermediate node to contain
                    // both the existing subtree and the new node.
                    const intermediate = new Map();
                    intermediate.set(k.slice(offset), child);
                    node.set(key.slice(pos, pos + offset), intermediate);
                    node.delete(k);
                    node = intermediate;
                }
                pos += offset;
                continue outer;
            }
        }
        // Create a final child node to contain the final suffix of the key.
        const child = new Map();
        node.set(key.slice(pos), child);
        return child;
    }
    return node;
};
const remove = (tree, key) => {
    const [node, path] = trackDown(tree, key);
    if (node === undefined) {
        return;
    }
    node.delete(LEAF);
    if (node.size === 0) {
        cleanup(path);
    }
    else if (node.size === 1) {
        const [key, value] = node.entries().next().value;
        merge(path, key, value);
    }
};
const cleanup = (path) => {
    if (path.length === 0) {
        return;
    }
    const [node, key] = last(path);
    node.delete(key);
    if (node.size === 0) {
        cleanup(path.slice(0, -1));
    }
    else if (node.size === 1) {
        const [key, value] = node.entries().next().value;
        if (key !== LEAF) {
            merge(path.slice(0, -1), key, value);
        }
    }
};
const merge = (path, key, value) => {
    if (path.length === 0) {
        return;
    }
    const [node, nodeKey] = last(path);
    node.set(nodeKey + key, value);
    node.delete(nodeKey);
};
const last = (array) => {
    return array[array.length - 1];
};

const OR = 'or';
const AND = 'and';
const AND_NOT = 'and_not';
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
class MiniSearch {
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
    constructor(options) {
        if ((options === null || options === void 0 ? void 0 : options.fields) == null) {
            throw new Error('MiniSearch: option "fields" must be provided');
        }
        const autoVacuum = (options.autoVacuum == null || options.autoVacuum === true) ? defaultAutoVacuumOptions : options.autoVacuum;
        this._options = {
            ...defaultOptions,
            ...options,
            autoVacuum,
            searchOptions: { ...defaultSearchOptions, ...(options.searchOptions || {}) },
            autoSuggestOptions: { ...defaultAutoSuggestOptions, ...(options.autoSuggestOptions || {}) }
        };
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
    add(document) {
        const { extractField, tokenize, processTerm, fields, idField } = this._options;
        const id = extractField(document, idField);
        if (id == null) {
            throw new Error(`MiniSearch: document does not have ID field "${idField}"`);
        }
        if (this._idToShortId.has(id)) {
            throw new Error(`MiniSearch: duplicate ID ${id}`);
        }
        const shortDocumentId = this.addDocumentId(id);
        this.saveStoredFields(shortDocumentId, document);
        for (const field of fields) {
            const fieldValue = extractField(document, field);
            if (fieldValue == null)
                continue;
            const tokens = tokenize(fieldValue.toString(), field);
            const fieldId = this._fieldIds[field];
            const uniqueTerms = new Set(tokens).size;
            this.addFieldLength(shortDocumentId, fieldId, this._documentCount - 1, uniqueTerms);
            for (const term of tokens) {
                const processedTerm = processTerm(term, field);
                if (Array.isArray(processedTerm)) {
                    for (const t of processedTerm) {
                        this.addTerm(fieldId, shortDocumentId, t);
                    }
                }
                else if (processedTerm) {
                    this.addTerm(fieldId, shortDocumentId, processedTerm);
                }
            }
        }
    }
    /**
     * Adds all the given documents to the index
     *
     * @param documents  An array of documents to be indexed
     */
    addAll(documents) {
        for (const document of documents)
            this.add(document);
    }
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
    addAllAsync(documents, options = {}) {
        const { chunkSize = 10 } = options;
        const acc = { chunk: [], promise: Promise.resolve() };
        const { chunk, promise } = documents.reduce(({ chunk, promise }, document, i) => {
            chunk.push(document);
            if ((i + 1) % chunkSize === 0) {
                return {
                    chunk: [],
                    promise: promise
                        .then(() => new Promise(resolve => setTimeout(resolve, 0)))
                        .then(() => this.addAll(chunk))
                };
            }
            else {
                return { chunk, promise };
            }
        }, acc);
        return promise.then(() => this.addAll(chunk));
    }
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
    remove(document) {
        const { tokenize, processTerm, extractField, fields, idField } = this._options;
        const id = extractField(document, idField);
        if (id == null) {
            throw new Error(`MiniSearch: document does not have ID field "${idField}"`);
        }
        const shortId = this._idToShortId.get(id);
        if (shortId == null) {
            throw new Error(`MiniSearch: cannot remove document with ID ${id}: it is not in the index`);
        }
        for (const field of fields) {
            const fieldValue = extractField(document, field);
            if (fieldValue == null)
                continue;
            const tokens = tokenize(fieldValue.toString(), field);
            const fieldId = this._fieldIds[field];
            const uniqueTerms = new Set(tokens).size;
            this.removeFieldLength(shortId, fieldId, this._documentCount, uniqueTerms);
            for (const term of tokens) {
                const processedTerm = processTerm(term, field);
                if (Array.isArray(processedTerm)) {
                    for (const t of processedTerm) {
                        this.removeTerm(fieldId, shortId, t);
                    }
                }
                else if (processedTerm) {
                    this.removeTerm(fieldId, shortId, processedTerm);
                }
            }
        }
        this._storedFields.delete(shortId);
        this._documentIds.delete(shortId);
        this._idToShortId.delete(id);
        this._fieldLength.delete(shortId);
        this._documentCount -= 1;
    }
    /**
     * Removes all the given documents from the index. If called with no arguments,
     * it removes _all_ documents from the index.
     *
     * @param documents  The documents to be removed. If this argument is omitted,
     * all documents are removed. Note that, for removing all documents, it is
     * more efficient to call this method with no arguments than to pass all
     * documents.
     */
    removeAll(documents) {
        if (documents) {
            for (const document of documents)
                this.remove(document);
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
    }
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
    discard(id) {
        const shortId = this._idToShortId.get(id);
        if (shortId == null) {
            throw new Error(`MiniSearch: cannot discard document with ID ${id}: it is not in the index`);
        }
        this._idToShortId.delete(id);
        this._documentIds.delete(shortId);
        this._storedFields.delete(shortId);
        (this._fieldLength.get(shortId) || []).forEach((fieldLength, fieldId) => {
            this.removeFieldLength(shortId, fieldId, this._documentCount, fieldLength);
        });
        this._fieldLength.delete(shortId);
        this._documentCount -= 1;
        this._dirtCount += 1;
        this.maybeAutoVacuum();
    }
    maybeAutoVacuum() {
        if (this._options.autoVacuum === false) {
            return;
        }
        const { minDirtFactor, minDirtCount, batchSize, batchWait } = this._options.autoVacuum;
        this.conditionalVacuum({ batchSize, batchWait }, { minDirtCount, minDirtFactor });
    }
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
    discardAll(ids) {
        const autoVacuum = this._options.autoVacuum;
        try {
            this._options.autoVacuum = false;
            for (const id of ids) {
                this.discard(id);
            }
        }
        finally {
            this._options.autoVacuum = autoVacuum;
        }
        this.maybeAutoVacuum();
    }
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
    replace(updatedDocument) {
        const { idField, extractField } = this._options;
        const id = extractField(updatedDocument, idField);
        this.discard(id);
        this.add(updatedDocument);
    }
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
    vacuum(options = {}) {
        return this.conditionalVacuum(options);
    }
    conditionalVacuum(options, conditions) {
        // If a vacuum is already ongoing, schedule another as soon as it finishes,
        // unless there's already one enqueued. If one was already enqueued, do not
        // enqueue another on top, but make sure that the conditions are the
        // broadest.
        if (this._currentVacuum) {
            this._enqueuedVacuumConditions = this._enqueuedVacuumConditions && conditions;
            if (this._enqueuedVacuum != null) {
                return this._enqueuedVacuum;
            }
            this._enqueuedVacuum = this._currentVacuum.then(() => {
                const conditions = this._enqueuedVacuumConditions;
                this._enqueuedVacuumConditions = defaultVacuumConditions;
                return this.performVacuuming(options, conditions);
            });
            return this._enqueuedVacuum;
        }
        if (this.vacuumConditionsMet(conditions) === false) {
            return Promise.resolve();
        }
        this._currentVacuum = this.performVacuuming(options);
        return this._currentVacuum;
    }
    async performVacuuming(options, conditions) {
        const initialDirtCount = this._dirtCount;
        if (this.vacuumConditionsMet(conditions)) {
            const batchSize = options.batchSize || defaultVacuumOptions.batchSize;
            const batchWait = options.batchWait || defaultVacuumOptions.batchWait;
            let i = 1;
            for (const [term, fieldsData] of this._index) {
                for (const [fieldId, fieldIndex] of fieldsData) {
                    for (const [shortId] of fieldIndex) {
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
                if (this._index.get(term).size === 0) {
                    this._index.delete(term);
                }
                if (i % batchSize === 0) {
                    await new Promise((resolve) => setTimeout(resolve, batchWait));
                }
                i += 1;
            }
            this._dirtCount -= initialDirtCount;
        }
        // Make the next lines always async, so they execute after this function returns
        await null;
        this._currentVacuum = this._enqueuedVacuum;
        this._enqueuedVacuum = null;
    }
    vacuumConditionsMet(conditions) {
        if (conditions == null) {
            return true;
        }
        let { minDirtCount, minDirtFactor } = conditions;
        minDirtCount = minDirtCount || defaultAutoVacuumOptions.minDirtCount;
        minDirtFactor = minDirtFactor || defaultAutoVacuumOptions.minDirtFactor;
        return this.dirtCount >= minDirtCount && this.dirtFactor >= minDirtFactor;
    }
    /**
     * Is `true` if a vacuuming operation is ongoing, `false` otherwise
     */
    get isVacuuming() {
        return this._currentVacuum != null;
    }
    /**
     * The number of documents discarded since the most recent vacuuming
     */
    get dirtCount() {
        return this._dirtCount;
    }
    /**
     * A number between 0 and 1 giving an indication about the proportion of
     * documents that are discarded, and can therefore be cleaned up by vacuuming.
     * A value close to 0 means that the index is relatively clean, while a higher
     * value means that the index is relatively dirty, and vacuuming could release
     * memory.
     */
    get dirtFactor() {
        return this._dirtCount / (1 + this._documentCount + this._dirtCount);
    }
    /**
     * Returns `true` if a document with the given ID is present in the index and
     * available for search, `false` otherwise
     *
     * @param id  The document ID
     */
    has(id) {
        return this._idToShortId.has(id);
    }
    /**
     * Returns the stored fields (as configured in the `storeFields` constructor
     * option) for the given document ID. Returns `undefined` if the document is
     * not present in the index.
     *
     * @param id  The document ID
     */
    getStoredFields(id) {
        const shortId = this._idToShortId.get(id);
        if (shortId == null) {
            return undefined;
        }
        return this._storedFields.get(shortId);
    }
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
     * @param searchOptions  Search options. Each option, if not given, defaults to the corresponding value of `searchOptions` given to the constructor, or to the library default.
     */
    search(query, searchOptions = {}) {
        const { searchOptions: globalSearchOptions } = this._options;
        const searchOptionsWithDefaults = { ...globalSearchOptions, ...searchOptions };
        const rawResults = this.executeQuery(query, searchOptions);
        const results = [];
        for (const [docId, { score, terms, match }] of rawResults) {
            // terms are the matched query terms, which will be returned to the user
            // as queryTerms. The quality is calculated based on them, as opposed to
            // the matched terms in the document (which can be different due to
            // prefix and fuzzy match)
            const quality = terms.length || 1;
            const result = {
                id: this._documentIds.get(docId),
                score: score * quality,
                terms: Object.keys(match),
                queryTerms: terms,
                match
            };
            Object.assign(result, this._storedFields.get(docId));
            if (searchOptionsWithDefaults.filter == null || searchOptionsWithDefaults.filter(result)) {
                results.push(result);
            }
        }
        // If it's a wildcard query, and no document boost is applied, skip sorting
        // the results, as all results have the same score of 1
        if (query === MiniSearch.wildcard && searchOptionsWithDefaults.boostDocument == null) {
            return results;
        }
        results.sort(byScore);
        return results;
    }
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
    autoSuggest(queryString, options = {}) {
        options = { ...this._options.autoSuggestOptions, ...options };
        const suggestions = new Map();
        for (const { score, terms } of this.search(queryString, options)) {
            const phrase = terms.join(' ');
            const suggestion = suggestions.get(phrase);
            if (suggestion != null) {
                suggestion.score += score;
                suggestion.count += 1;
            }
            else {
                suggestions.set(phrase, { score, terms, count: 1 });
            }
        }
        const results = [];
        for (const [suggestion, { score, terms, count }] of suggestions) {
            results.push({ suggestion, terms, score: score / count });
        }
        results.sort(byScore);
        return results;
    }
    /**
     * Total number of documents available to search
     */
    get documentCount() {
        return this._documentCount;
    }
    /**
     * Number of terms in the index
     */
    get termCount() {
        return this._index.size;
    }
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
    static loadJSON(json, options) {
        if (options == null) {
            throw new Error('MiniSearch: loadJSON should be given the same options used when serializing the index');
        }
        return this.loadJS(JSON.parse(json), options);
    }
    /**
     * Async equivalent of {@link MiniSearch.loadJSON}
     *
     * This function is an alternative to {@link MiniSearch.loadJSON} that returns
     * a promise, and loads the index in batches, leaving pauses between them to avoid
     * blocking the main thread. It tends to be slower than the synchronous
     * version, but does not block the main thread, so it can be a better choice
     * when deserializing very large indexes.
     *
     * @param json  JSON-serialized index
     * @param options  configuration options, same as the constructor
     * @return A Promise that will resolve to an instance of MiniSearch deserialized from the given JSON.
     */
    static async loadJSONAsync(json, options) {
        if (options == null) {
            throw new Error('MiniSearch: loadJSON should be given the same options used when serializing the index');
        }
        return this.loadJSAsync(JSON.parse(json), options);
    }
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
    static getDefault(optionName) {
        if (defaultOptions.hasOwnProperty(optionName)) {
            return getOwnProperty(defaultOptions, optionName);
        }
        else {
            throw new Error(`MiniSearch: unknown option "${optionName}"`);
        }
    }
    /**
     * @ignore
     */
    static loadJS(js, options) {
        const { index, documentIds, fieldLength, storedFields, serializationVersion } = js;
        const miniSearch = this.instantiateMiniSearch(js, options);
        miniSearch._documentIds = objectToNumericMap(documentIds);
        miniSearch._fieldLength = objectToNumericMap(fieldLength);
        miniSearch._storedFields = objectToNumericMap(storedFields);
        for (const [shortId, id] of miniSearch._documentIds) {
            miniSearch._idToShortId.set(id, shortId);
        }
        for (const [term, data] of index) {
            const dataMap = new Map();
            for (const fieldId of Object.keys(data)) {
                let indexEntry = data[fieldId];
                // Version 1 used to nest the index entry inside a field called ds
                if (serializationVersion === 1) {
                    indexEntry = indexEntry.ds;
                }
                dataMap.set(parseInt(fieldId, 10), objectToNumericMap(indexEntry));
            }
            miniSearch._index.set(term, dataMap);
        }
        return miniSearch;
    }
    /**
     * @ignore
     */
    static async loadJSAsync(js, options) {
        const { index, documentIds, fieldLength, storedFields, serializationVersion } = js;
        const miniSearch = this.instantiateMiniSearch(js, options);
        miniSearch._documentIds = await objectToNumericMapAsync(documentIds);
        miniSearch._fieldLength = await objectToNumericMapAsync(fieldLength);
        miniSearch._storedFields = await objectToNumericMapAsync(storedFields);
        for (const [shortId, id] of miniSearch._documentIds) {
            miniSearch._idToShortId.set(id, shortId);
        }
        let count = 0;
        for (const [term, data] of index) {
            const dataMap = new Map();
            for (const fieldId of Object.keys(data)) {
                let indexEntry = data[fieldId];
                // Version 1 used to nest the index entry inside a field called ds
                if (serializationVersion === 1) {
                    indexEntry = indexEntry.ds;
                }
                dataMap.set(parseInt(fieldId, 10), await objectToNumericMapAsync(indexEntry));
            }
            if (++count % 1000 === 0)
                await wait(0);
            miniSearch._index.set(term, dataMap);
        }
        return miniSearch;
    }
    /**
     * @ignore
     */
    static instantiateMiniSearch(js, options) {
        const { documentCount, nextId, fieldIds, averageFieldLength, dirtCount, serializationVersion } = js;
        if (serializationVersion !== 1 && serializationVersion !== 2) {
            throw new Error('MiniSearch: cannot deserialize an index created with an incompatible version');
        }
        const miniSearch = new MiniSearch(options);
        miniSearch._documentCount = documentCount;
        miniSearch._nextId = nextId;
        miniSearch._idToShortId = new Map();
        miniSearch._fieldIds = fieldIds;
        miniSearch._avgFieldLength = averageFieldLength;
        miniSearch._dirtCount = dirtCount || 0;
        miniSearch._index = new SearchableMap();
        return miniSearch;
    }
    /**
     * @ignore
     */
    executeQuery(query, searchOptions = {}) {
        if (query === MiniSearch.wildcard) {
            return this.executeWildcardQuery(searchOptions);
        }
        if (typeof query !== 'string') {
            const options = { ...searchOptions, ...query, queries: undefined };
            const results = query.queries.map((subquery) => this.executeQuery(subquery, options));
            return this.combineResults(results, options.combineWith);
        }
        const { tokenize, processTerm, searchOptions: globalSearchOptions } = this._options;
        const options = { tokenize, processTerm, ...globalSearchOptions, ...searchOptions };
        const { tokenize: searchTokenize, processTerm: searchProcessTerm } = options;
        const terms = searchTokenize(query)
            .flatMap((term) => searchProcessTerm(term))
            .filter((term) => !!term);
        const queries = terms.map(termToQuerySpec(options));
        const results = queries.map(query => this.executeQuerySpec(query, options));
        return this.combineResults(results, options.combineWith);
    }
    /**
     * @ignore
     */
    executeQuerySpec(query, searchOptions) {
        const options = { ...this._options.searchOptions, ...searchOptions };
        const boosts = (options.fields || this._options.fields).reduce((boosts, field) => ({ ...boosts, [field]: getOwnProperty(options.boost, field) || 1 }), {});
        const { boostDocument, weights, maxFuzzy, bm25: bm25params } = options;
        const { fuzzy: fuzzyWeight, prefix: prefixWeight } = { ...defaultSearchOptions.weights, ...weights };
        const data = this._index.get(query.term);
        const results = this.termResults(query.term, query.term, 1, query.termBoost, data, boosts, boostDocument, bm25params);
        let prefixMatches;
        let fuzzyMatches;
        if (query.prefix) {
            prefixMatches = this._index.atPrefix(query.term);
        }
        if (query.fuzzy) {
            const fuzzy = (query.fuzzy === true) ? 0.2 : query.fuzzy;
            const maxDistance = fuzzy < 1 ? Math.min(maxFuzzy, Math.round(query.term.length * fuzzy)) : fuzzy;
            if (maxDistance)
                fuzzyMatches = this._index.fuzzyGet(query.term, maxDistance);
        }
        if (prefixMatches) {
            for (const [term, data] of prefixMatches) {
                const distance = term.length - query.term.length;
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
                const weight = prefixWeight * term.length / (term.length + 0.3 * distance);
                this.termResults(query.term, term, weight, query.termBoost, data, boosts, boostDocument, bm25params, results);
            }
        }
        if (fuzzyMatches) {
            for (const term of fuzzyMatches.keys()) {
                const [data, distance] = fuzzyMatches.get(term);
                if (!distance) {
                    continue;
                } // Skip exact match.
                // Weight gradually approaches 0 as distance goes to infinity, with the
                // weight for the hypothetical distance 0 being equal to fuzzyWeight.
                const weight = fuzzyWeight * term.length / (term.length + distance);
                this.termResults(query.term, term, weight, query.termBoost, data, boosts, boostDocument, bm25params, results);
            }
        }
        return results;
    }
    /**
     * @ignore
     */
    executeWildcardQuery(searchOptions) {
        const results = new Map();
        const options = { ...this._options.searchOptions, ...searchOptions };
        for (const [shortId, id] of this._documentIds) {
            const score = options.boostDocument ? options.boostDocument(id, '', this._storedFields.get(shortId)) : 1;
            results.set(shortId, {
                score,
                terms: [],
                match: {}
            });
        }
        return results;
    }
    /**
     * @ignore
     */
    combineResults(results, combineWith = OR) {
        if (results.length === 0) {
            return new Map();
        }
        const operator = combineWith.toLowerCase();
        const combinator = combinators[operator];
        if (!combinator) {
            throw new Error(`Invalid combination operator: ${combineWith}`);
        }
        return results.reduce(combinator) || new Map();
    }
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
    toJSON() {
        const index = [];
        for (const [term, fieldIndex] of this._index) {
            const data = {};
            for (const [fieldId, freqs] of fieldIndex) {
                data[fieldId] = Object.fromEntries(freqs);
            }
            index.push([term, data]);
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
            index,
            serializationVersion: 2
        };
    }
    /**
     * @ignore
     */
    termResults(sourceTerm, derivedTerm, termWeight, termBoost, fieldTermData, fieldBoosts, boostDocumentFn, bm25params, results = new Map()) {
        if (fieldTermData == null)
            return results;
        for (const field of Object.keys(fieldBoosts)) {
            const fieldBoost = fieldBoosts[field];
            const fieldId = this._fieldIds[field];
            const fieldTermFreqs = fieldTermData.get(fieldId);
            if (fieldTermFreqs == null)
                continue;
            let matchingFields = fieldTermFreqs.size;
            const avgFieldLength = this._avgFieldLength[fieldId];
            for (const docId of fieldTermFreqs.keys()) {
                if (!this._documentIds.has(docId)) {
                    this.removeTerm(fieldId, docId, derivedTerm);
                    matchingFields -= 1;
                    continue;
                }
                const docBoost = boostDocumentFn ? boostDocumentFn(this._documentIds.get(docId), derivedTerm, this._storedFields.get(docId)) : 1;
                if (!docBoost)
                    continue;
                const termFreq = fieldTermFreqs.get(docId);
                const fieldLength = this._fieldLength.get(docId)[fieldId];
                // NOTE: The total number of fields is set to the number of documents
                // `this._documentCount`. It could also make sense to use the number of
                // documents where the current field is non-blank as a normalization
                // factor. This will make a difference in scoring if the field is rarely
                // present. This is currently not supported, and may require further
                // analysis to see if it is a valid use case.
                const rawScore = calcBM25Score(termFreq, matchingFields, this._documentCount, fieldLength, avgFieldLength, bm25params);
                const weightedScore = termWeight * termBoost * fieldBoost * docBoost * rawScore;
                const result = results.get(docId);
                if (result) {
                    result.score += weightedScore;
                    assignUniqueTerm(result.terms, sourceTerm);
                    const match = getOwnProperty(result.match, derivedTerm);
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
                        match: { [derivedTerm]: [field] }
                    });
                }
            }
        }
        return results;
    }
    /**
     * @ignore
     */
    addTerm(fieldId, documentId, term) {
        const indexData = this._index.fetch(term, createMap);
        let fieldIndex = indexData.get(fieldId);
        if (fieldIndex == null) {
            fieldIndex = new Map();
            fieldIndex.set(documentId, 1);
            indexData.set(fieldId, fieldIndex);
        }
        else {
            const docs = fieldIndex.get(documentId);
            fieldIndex.set(documentId, (docs || 0) + 1);
        }
    }
    /**
     * @ignore
     */
    removeTerm(fieldId, documentId, term) {
        if (!this._index.has(term)) {
            this.warnDocumentChanged(documentId, fieldId, term);
            return;
        }
        const indexData = this._index.fetch(term, createMap);
        const fieldIndex = indexData.get(fieldId);
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
    }
    /**
     * @ignore
     */
    warnDocumentChanged(shortDocumentId, fieldId, term) {
        for (const fieldName of Object.keys(this._fieldIds)) {
            if (this._fieldIds[fieldName] === fieldId) {
                this._options.logger('warn', `MiniSearch: document with ID ${this._documentIds.get(shortDocumentId)} has changed before removal: term "${term}" was not present in field "${fieldName}". Removing a document after it has changed can corrupt the index!`, 'version_conflict');
                return;
            }
        }
    }
    /**
     * @ignore
     */
    addDocumentId(documentId) {
        const shortDocumentId = this._nextId;
        this._idToShortId.set(documentId, shortDocumentId);
        this._documentIds.set(shortDocumentId, documentId);
        this._documentCount += 1;
        this._nextId += 1;
        return shortDocumentId;
    }
    /**
     * @ignore
     */
    addFields(fields) {
        for (let i = 0; i < fields.length; i++) {
            this._fieldIds[fields[i]] = i;
        }
    }
    /**
     * @ignore
     */
    addFieldLength(documentId, fieldId, count, length) {
        let fieldLengths = this._fieldLength.get(documentId);
        if (fieldLengths == null)
            this._fieldLength.set(documentId, fieldLengths = []);
        fieldLengths[fieldId] = length;
        const averageFieldLength = this._avgFieldLength[fieldId] || 0;
        const totalFieldLength = (averageFieldLength * count) + length;
        this._avgFieldLength[fieldId] = totalFieldLength / (count + 1);
    }
    /**
     * @ignore
     */
    removeFieldLength(documentId, fieldId, count, length) {
        if (count === 1) {
            this._avgFieldLength[fieldId] = 0;
            return;
        }
        const totalFieldLength = (this._avgFieldLength[fieldId] * count) - length;
        this._avgFieldLength[fieldId] = totalFieldLength / (count - 1);
    }
    /**
     * @ignore
     */
    saveStoredFields(documentId, doc) {
        const { storeFields, extractField } = this._options;
        if (storeFields == null || storeFields.length === 0) {
            return;
        }
        let documentFields = this._storedFields.get(documentId);
        if (documentFields == null)
            this._storedFields.set(documentId, documentFields = {});
        for (const fieldName of storeFields) {
            const fieldValue = extractField(doc, fieldName);
            if (fieldValue !== undefined)
                documentFields[fieldName] = fieldValue;
        }
    }
}
/**
 * The special wildcard symbol that can be passed to {@link MiniSearch#search}
 * to match all documents
 */
MiniSearch.wildcard = Symbol('*');
const getOwnProperty = (object, property) => Object.prototype.hasOwnProperty.call(object, property) ? object[property] : undefined;
const combinators = {
    [OR]: (a, b) => {
        for (const docId of b.keys()) {
            const existing = a.get(docId);
            if (existing == null) {
                a.set(docId, b.get(docId));
            }
            else {
                const { score, terms, match } = b.get(docId);
                existing.score = existing.score + score;
                existing.match = Object.assign(existing.match, match);
                assignUniqueTerms(existing.terms, terms);
            }
        }
        return a;
    },
    [AND]: (a, b) => {
        const combined = new Map();
        for (const docId of b.keys()) {
            const existing = a.get(docId);
            if (existing == null)
                continue;
            const { score, terms, match } = b.get(docId);
            assignUniqueTerms(existing.terms, terms);
            combined.set(docId, {
                score: existing.score + score,
                terms: existing.terms,
                match: Object.assign(existing.match, match)
            });
        }
        return combined;
    },
    [AND_NOT]: (a, b) => {
        for (const docId of b.keys())
            a.delete(docId);
        return a;
    }
};
const defaultBM25params = { k: 1.2, b: 0.7, d: 0.5 };
const calcBM25Score = (termFreq, matchingCount, totalCount, fieldLength, avgFieldLength, bm25params) => {
    const { k, b, d } = bm25params;
    const invDocFreq = Math.log(1 + (totalCount - matchingCount + 0.5) / (matchingCount + 0.5));
    return invDocFreq * (d + termFreq * (k + 1) / (termFreq + k * (1 - b + b * fieldLength / avgFieldLength)));
};
const termToQuerySpec = (options) => (term, i, terms) => {
    const fuzzy = (typeof options.fuzzy === 'function')
        ? options.fuzzy(term, i, terms)
        : (options.fuzzy || false);
    const prefix = (typeof options.prefix === 'function')
        ? options.prefix(term, i, terms)
        : (options.prefix === true);
    const termBoost = (typeof options.boostTerm === 'function')
        ? options.boostTerm(term, i, terms)
        : 1;
    return { term, fuzzy, prefix, termBoost };
};
const defaultOptions = {
    idField: 'id',
    extractField: (document, fieldName) => document[fieldName],
    tokenize: (text) => text.split(SPACE_OR_PUNCTUATION),
    processTerm: (term) => term.toLowerCase(),
    fields: undefined,
    searchOptions: undefined,
    storeFields: [],
    logger: (level, message) => {
        if (typeof (console === null || console === void 0 ? void 0 : console[level]) === 'function')
            console[level](message);
    },
    autoVacuum: true
};
const defaultSearchOptions = {
    combineWith: OR,
    prefix: false,
    fuzzy: false,
    maxFuzzy: 6,
    boost: {},
    weights: { fuzzy: 0.45, prefix: 0.375 },
    bm25: defaultBM25params
};
const defaultAutoSuggestOptions = {
    combineWith: AND,
    prefix: (term, i, terms) => i === terms.length - 1
};
const defaultVacuumOptions = { batchSize: 1000, batchWait: 10 };
const defaultVacuumConditions = { minDirtFactor: 0.1, minDirtCount: 20 };
const defaultAutoVacuumOptions = { ...defaultVacuumOptions, ...defaultVacuumConditions };
const assignUniqueTerm = (target, term) => {
    // Avoid adding duplicate terms.
    if (!target.includes(term))
        target.push(term);
};
const assignUniqueTerms = (target, source) => {
    for (const term of source) {
        // Avoid adding duplicate terms.
        if (!target.includes(term))
            target.push(term);
    }
};
const byScore = ({ score: a }, { score: b }) => b - a;
const createMap = () => new Map();
const objectToNumericMap = (object) => {
    const map = new Map();
    for (const key of Object.keys(object)) {
        map.set(parseInt(key, 10), object[key]);
    }
    return map;
};
const objectToNumericMapAsync = async (object) => {
    const map = new Map();
    let count = 0;
    for (const key of Object.keys(object)) {
        map.set(parseInt(key, 10), object[key]);
        if (++count % 1000 === 0) {
            await wait(0);
        }
    }
    return map;
};
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// This regular expression matches any Unicode space, newline, or punctuation
// character
const SPACE_OR_PUNCTUATION = /[\n\r\p{Z}\p{P}]+/u;


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


/**
 * Constants
 * --------------------------
 * LOCAL_INDEX_ID: Key for storing the search index in Chrome's local storage
 */
var LOCAL_INDEX_ID = 'localSearchIndex';

/**
 * Debug Utilities
 * --------------
 * Functions for debugging and development.
 */
function exportStorageToFile() {
  console.log('Starting export...');
  chrome.storage.local.get(LOCAL_INDEX_ID, function (data) {
    console.log('Retrieved data:', data);
    var jsonString = JSON.stringify(data, null, 2);
    var dataUrl = "data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(jsonString))));
    chrome.downloads.download({
      url: dataUrl,
      filename: 'hawk_index_backup.json',
      saveAs: true
    }, function (downloadId) {
      console.log('Download started with ID:', downloadId);
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
  var indexer;
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
    console.log("Index data saved[".concat(data.length, "]"));
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
    console.time("Indexing Doc:".concat(document.id));
    if (idx.has(document.id)) {
      idx.replace(document);
      console.log('Replacing doc in the index');
    } else {
      idx.add(document);
      console.log('Adding new doc in the index');
    }
    console.timeEnd("Indexing Doc:".concat(document.id));
    console.time('Storing the whole Index');
    var data = JSON.stringify(idx);
    storeIndex(data);
    console.timeEnd('Storing the whole Index');
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
  console.log("numbers of suggestions:".concat(suggestions.length));
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
    sendResponse('OK:Indexed');
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
  var specialChars = '!@#$^&%*+=[]/{}|:<>?,.';
  var sanitizedString = stringToBeSanitized; // ✅ Create a new variable
  for (var i = 0; i < specialChars.length; i++) {
    sanitizedString = sanitizedString.replace(new RegExp("\\".concat(specialChars[i]), 'gi'), '');
  }
  return sanitizedString;
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
  var finalTasks = Object.keys(updatedTasks).length === 0 ? {} : updatedTasks; // ✅ Create new variable

  chrome.storage.local.set({
    tasks: finalTasks
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsd0JBQXdCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGtCQUFrQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGdHQUFnRztBQUMxRyxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLDJCQUEyQjtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLDJDQUEyQztBQUN0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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsWUFBWTtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLDBCQUEwQjtBQUN0RDtBQUNBO0FBQ0EsMkRBQTJEO0FBQzNEO0FBQ0EsMENBQTBDLDJCQUEyQjtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsMkJBQTJCO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELDJCQUEyQjtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakMscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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S0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUM7RUFFNy9CLElBQU1DLGVBQWUsR0FBRztJQUN0QkMsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQztJQUM1QkMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDO0lBQ3RCQyxPQUFPLEVBQUUsSUFBSTtJQUNiQyxXQUFXLEVBQUUsU0FBYkEsV0FBV0EsQ0FBR0MsSUFBSSxFQUFFQyxVQUFVO01BQUEsT0FBTVAsU0FBUyxDQUFDUSxRQUFRLENBQUNGLElBQUksQ0FBQyxHQUFHLElBQUksR0FBR0EsSUFBSSxDQUFDRyxXQUFXLENBQUMsQ0FBQztJQUFBLENBQUM7SUFDekZDLGFBQWEsRUFBRTtNQUNiTCxXQUFXLEVBQUUsU0FBYkEsV0FBV0EsQ0FBR0MsSUFBSTtRQUFBLE9BQUtBLElBQUksQ0FBQ0csV0FBVyxDQUFDLENBQUM7TUFBQTtJQUMzQztFQUNGLENBQUM7RUFDRCxJQUFJRSxPQUFPO0VBQ1gsSUFBSVosYUFBYSxLQUFLYSxTQUFTLEVBQUU7SUFDL0JELE9BQU8sR0FBRyxJQUFJdkMsa0RBQVUsQ0FBQzZCLGVBQWUsQ0FBQztFQUMzQyxDQUFDLE1BQU07SUFDTFUsT0FBTyxHQUFHdkMsa0RBQVUsQ0FBQ3lDLFFBQVEsQ0FBQ2QsYUFBYSxFQUFFRSxlQUFlLENBQUM7RUFDL0Q7RUFDQSxPQUFPVSxPQUFPO0FBQ2hCLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQU1HLGNBQWMsR0FBRyxTQUFqQkEsY0FBY0EsQ0FBSUMsRUFBRSxFQUFLO0VBQzdCdEMsTUFBTSxDQUFDQyxPQUFPLENBQUNDLEtBQUssQ0FBQ0MsR0FBRyxDQUFDUCxjQUFjLEVBQUUsVUFBQ1EsSUFBSSxFQUFLO0lBQUVrQyxFQUFFLENBQUNsQyxJQUFJLENBQUNSLGNBQWMsQ0FBQyxDQUFDO0VBQUUsQ0FBQyxDQUFDO0FBQ25GLENBQUM7QUFFRCxJQUFNMkMsVUFBVSxHQUFHLFNBQWJBLFVBQVVBLENBQUlDLFNBQVMsRUFBSztFQUNoQyxJQUFNcEMsSUFBSSxHQUFBcUMsZUFBQSxLQUNQN0MsY0FBYyxFQUFHNEMsU0FBUyxDQUM1QjtFQUNEeEMsTUFBTSxDQUFDQyxPQUFPLENBQUNDLEtBQUssQ0FBQ3dDLEdBQUcsQ0FBQ3RDLElBQUksRUFBRSxZQUFNO0lBQ25DTixPQUFPLENBQUNDLEdBQUcscUJBQUFVLE1BQUEsQ0FBcUJMLElBQUksQ0FBQ3VDLE1BQU0sTUFBRyxDQUFDO0VBQ2pELENBQUMsQ0FBQztBQUNKLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQU1DLFFBQVEsR0FBRyxTQUFYQSxRQUFRQSxDQUFBLEVBQVM7RUFDckIsSUFBSSxDQUFDNUMsTUFBTSxDQUFDa0MsT0FBTyxFQUFFO0lBQ25CVyxpQkFBaUIsQ0FBQyxDQUFDO0VBQ3JCO0VBQ0EsT0FBTzdDLE1BQU0sQ0FBQ2tDLE9BQU87QUFDdkIsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxJQUFNWSxrQkFBa0IsR0FBRyxTQUFyQkEsa0JBQWtCQSxDQUFBLEVBQVMsQ0FFakMsQ0FBQztBQUVELElBQU1DLFVBQVUsR0FBRyxTQUFiQSxVQUFVQSxDQUFJQyxRQUFRLEVBQUs7RUFDL0IsSUFBTUMsR0FBRyxHQUFHTCxRQUFRLENBQUMsQ0FBQztFQUN0QixJQUFJSyxHQUFHLEVBQUU7SUFDUG5ELE9BQU8sQ0FBQ29ELElBQUksaUJBQUF6QyxNQUFBLENBQWlCdUMsUUFBUSxDQUFDRyxFQUFFLENBQUUsQ0FBQztJQUMzQyxJQUFJRixHQUFHLENBQUNHLEdBQUcsQ0FBQ0osUUFBUSxDQUFDRyxFQUFFLENBQUMsRUFBRTtNQUN4QkYsR0FBRyxDQUFDSSxPQUFPLENBQUNMLFFBQVEsQ0FBQztNQUNyQmxELE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLDRCQUE0QixDQUFDO0lBQzNDLENBQUMsTUFBTTtNQUNMa0QsR0FBRyxDQUFDSyxHQUFHLENBQUNOLFFBQVEsQ0FBQztNQUNqQmxELE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLDZCQUE2QixDQUFDO0lBQzVDO0lBQ0FELE9BQU8sQ0FBQ3lELE9BQU8saUJBQUE5QyxNQUFBLENBQWlCdUMsUUFBUSxDQUFDRyxFQUFFLENBQUUsQ0FBQztJQUM5Q3JELE9BQU8sQ0FBQ29ELElBQUksQ0FBQyx5QkFBeUIsQ0FBQztJQUN2QyxJQUFNOUMsSUFBSSxHQUFHRSxJQUFJLENBQUNDLFNBQVMsQ0FBQzBDLEdBQUcsQ0FBQztJQUNoQ1YsVUFBVSxDQUFDbkMsSUFBSSxDQUFDO0lBQ2hCTixPQUFPLENBQUN5RCxPQUFPLENBQUMseUJBQXlCLENBQUM7RUFDNUM7QUFDRixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFNQyxNQUFNLEdBQUcsU0FBVEEsTUFBTUEsQ0FBSVIsUUFBUSxFQUFFUyxPQUFPLEVBQUs7RUFDcEMsSUFBTVIsR0FBRyxHQUFHTCxRQUFRLENBQUMsQ0FBQztFQUN0QixPQUFPSyxHQUFHLENBQUNPLE1BQU0sQ0FBQ1IsUUFBUSxDQUFDO0FBQzdCLENBQUM7QUFFRCxJQUFNVSxXQUFXLEdBQUcsU0FBZEEsV0FBV0EsQ0FBSUMsV0FBVyxFQUFFQyxZQUFZLEVBQUs7RUFDakQsSUFBTUMsYUFBYSxHQUFHTCxNQUFNLENBQUNHLFdBQVcsRUFBRSxJQUFJLENBQUM7RUFDL0MsSUFBTUcsV0FBVyxHQUFHLEVBQUU7RUFDdEIsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdGLGFBQWEsQ0FBQ2xCLE1BQU0sSUFBSW9CLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsRUFBRSxFQUFFO0lBQ3RERCxXQUFXLENBQUNFLElBQUksQ0FBQztNQUFFQyxPQUFPLEVBQUVKLGFBQWEsQ0FBQ0UsQ0FBQyxDQUFDLENBQUNaLEVBQUU7TUFBRWUsV0FBVyxFQUFFQyx1QkFBdUIsQ0FBQ04sYUFBYSxDQUFDRSxDQUFDLENBQUMsQ0FBQ0ssS0FBSztJQUFFLENBQUMsQ0FBQztJQUNoSHRFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDO01BQUVrRSxPQUFPLEVBQUVKLGFBQWEsQ0FBQ0UsQ0FBQyxDQUFDLENBQUNaLEVBQUU7TUFBRWUsV0FBVyxFQUFFTCxhQUFhLENBQUNFLENBQUMsQ0FBQyxDQUFDSztJQUFNLENBQUMsQ0FBQztFQUNwRjtFQUNBdEUsT0FBTyxDQUFDQyxHQUFHLDJCQUFBVSxNQUFBLENBQTJCcUQsV0FBVyxDQUFDbkIsTUFBTSxDQUFFLENBQUM7RUFDM0RpQixZQUFZLENBQUNFLFdBQVcsQ0FBQztBQUMzQixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFNTyxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQWdCQSxDQUFJQyxPQUFPLEVBQUVDLE1BQU0sRUFBRVgsWUFBWSxFQUFLO0VBQzFELElBQUtVLE9BQU8sQ0FBQ0UsSUFBSSxLQUFLLE9BQU8sSUFBTUYsT0FBTyxDQUFDRyxPQUFPLEtBQUssYUFBYyxFQUFFO0lBQ3JFYixZQUFZLENBQUM1RCxNQUFNLENBQUMwRSxXQUFXLENBQUM7RUFDbEMsQ0FBQyxNQUFNLElBQUtKLE9BQU8sQ0FBQ0UsSUFBSSxLQUFLLE9BQU8sSUFBTUYsT0FBTyxDQUFDRyxPQUFPLEtBQUssZ0JBQWlCLEVBQUU7SUFDL0UsSUFBTUUsWUFBWSxHQUFHN0Isa0JBQWtCLENBQUN3QixPQUFPLENBQUNMLE9BQU8sQ0FBQztFQUMxRCxDQUFDLE1BQU0sSUFBSUssT0FBTyxDQUFDTSxNQUFNLEtBQUssYUFBYSxFQUFFO0lBQzNDL0UsbUJBQW1CLENBQUMsQ0FBQztJQUNyQitELFlBQVksQ0FBQztNQUFFaUIsTUFBTSxFQUFFO0lBQVksQ0FBQyxDQUFDO0VBQ3ZDLENBQUMsTUFBTTtJQUNMOUIsVUFBVSxDQUFDdUIsT0FBTyxDQUFDdEIsUUFBUSxDQUFDO0lBQzVCWSxZQUFZLENBQUMsWUFBWSxDQUFDO0VBQzVCO0FBQ0YsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBTWYsaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFpQkEsQ0FBQSxFQUFTO0VBQzlCLElBQU1pQyxzQkFBc0IsR0FBRyxTQUF6QkEsc0JBQXNCQSxDQUFJQyxXQUFXLEVBQUs7SUFDOUMsSUFBSUEsV0FBVyxJQUFJQSxXQUFXLENBQUNwQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO01BQ3pDM0MsTUFBTSxDQUFDMEUsV0FBVyxHQUFHSyxXQUFXO0lBQ2xDO0lBQ0EvRSxNQUFNLENBQUNrQyxPQUFPLEdBQUdiLFdBQVcsQ0FBQ3JCLE1BQU0sQ0FBQzBFLFdBQVcsQ0FBQztFQUNsRCxDQUFDO0VBQ0RyQyxjQUFjLENBQUN5QyxzQkFBc0IsQ0FBQztBQUN4QyxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBTVgsdUJBQXVCLEdBQUcsU0FBMUJBLHVCQUF1QkEsQ0FBSWEsbUJBQW1CLEVBQUs7RUFDdkQsSUFBTUMsWUFBWSxHQUFHLHdCQUF3QjtFQUM3QyxJQUFJQyxlQUFlLEdBQUdGLG1CQUFtQixDQUFDLENBQUM7RUFDM0MsS0FBSyxJQUFJakIsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHa0IsWUFBWSxDQUFDdEMsTUFBTSxFQUFFb0IsQ0FBQyxFQUFFLEVBQUU7SUFDNUNtQixlQUFlLEdBQUdBLGVBQWUsQ0FBQzdCLE9BQU8sQ0FBQyxJQUFJOEIsTUFBTSxNQUFBMUUsTUFBQSxDQUFNd0UsWUFBWSxDQUFDbEIsQ0FBQyxDQUFDLEdBQUksSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO0VBQ3pGO0VBQ0EsT0FBT21CLGVBQWU7QUFDeEIsQ0FBQzs7QUFFRDtBQUNBckMsaUJBQWlCLENBQUMsQ0FBQztBQUNuQjdDLE1BQU0sQ0FBQ29GLE9BQU8sQ0FBQ0MsU0FBUyxDQUFDQyxXQUFXLENBQUNqQixnQkFBZ0IsQ0FBQztBQUV0RHJFLE1BQU0sQ0FBQ3VGLE9BQU8sQ0FBQ0MsY0FBYyxDQUFDRixXQUFXLENBQUMsVUFBQ0csSUFBSSxFQUFFQyxPQUFPLEVBQUs7RUFDM0RoQyxXQUFXLENBQUMrQixJQUFJLEVBQUVDLE9BQU8sQ0FBQztBQUM1QixDQUFDLENBQUM7QUFFRjFGLE1BQU0sQ0FBQ3VGLE9BQU8sQ0FBQ0ksY0FBYyxDQUFDTCxXQUFXLENBQUMsVUFBQ0csSUFBSSxFQUFFRyx5QkFBeUIsRUFBSztFQUM3RTVGLE1BQU0sQ0FBQzZGLElBQUksQ0FBQ0MsTUFBTSxDQUFDO0lBQUUvRSxHQUFHLEVBQUUwRTtFQUFLLENBQUMsQ0FBQztBQUNuQyxDQUFDLENBQUM7QUFFRixTQUFTTSxVQUFVQSxDQUFDQyxRQUFRLEVBQUVDLGNBQWMsRUFBRTtFQUM1QyxJQUFNQyxZQUFZLEdBQUdDLE1BQU0sQ0FBQ0MsV0FBVyxDQUNyQ0QsTUFBTSxDQUFDRSxPQUFPLENBQUNMLFFBQVEsQ0FBQyxDQUFDTSxNQUFNLENBQUMsVUFBQUMsSUFBQTtJQUFBLElBQUFDLEtBQUEsR0FBQUMsY0FBQSxDQUFBRixJQUFBO01BQUVHLE1BQU0sR0FBQUYsS0FBQTtJQUFBLE9BQU1FLE1BQU0sS0FBS1QsY0FBYztFQUFBLEVBQ3pFLENBQUM7RUFFRCxJQUFNVSxVQUFVLEdBQUdSLE1BQU0sQ0FBQ1MsSUFBSSxDQUFDVixZQUFZLENBQUMsQ0FBQ3ZELE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUd1RCxZQUFZLENBQUMsQ0FBQzs7RUFFL0VsRyxNQUFNLENBQUNDLE9BQU8sQ0FBQ0MsS0FBSyxDQUFDd0MsR0FBRyxDQUFDO0lBQUVtRSxLQUFLLEVBQUVGO0VBQVcsQ0FBQyxFQUFFLFlBQU0sQ0FBQyxDQUFDLENBQUM7QUFDM0Q7QUFFQTNHLE1BQU0sQ0FBQzhHLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDekIsV0FBVyxDQUFDLFVBQUMwQixLQUFLLEVBQUs7RUFDM0MsSUFBTUMsU0FBUyxHQUFHRCxLQUFLLENBQUNFLElBQUk7RUFDNUIsSUFBSUQsU0FBUyxDQUFDRSxRQUFRLENBQUMsaUJBQWlCLENBQUMsRUFBRTtJQUN6QyxJQUFNVCxNQUFNLEdBQUdPLFNBQVMsQ0FBQ0csS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0Q3BILE1BQU0sQ0FBQ0MsT0FBTyxDQUFDQyxLQUFLLENBQUNDLEdBQUcsQ0FBQztNQUFFMEcsS0FBSyxFQUFFLENBQUM7SUFBRSxDQUFDLEVBQUUsVUFBQ1EsTUFBTSxFQUFLO01BQ2xELElBQU1DLGFBQWEsR0FBR0QsTUFBTSxDQUFDUixLQUFLLElBQUksQ0FBQyxDQUFDO01BQ3hDZCxVQUFVLENBQUN1QixhQUFhLEVBQUVaLE1BQU0sQ0FBQztJQUNuQyxDQUFDLENBQUM7RUFDSjtBQUNGLENBQUMsQ0FBQztBQUVGMUcsTUFBTSxDQUFDOEcsTUFBTSxDQUFDQyxPQUFPLENBQUN6QixXQUFXLENBQUMsVUFBQzBCLEtBQUssRUFBSztFQUMzQ2hILE1BQU0sQ0FBQ0MsT0FBTyxDQUFDQyxLQUFLLENBQUNDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQ29ILElBQUksQ0FBQyxVQUFDRixNQUFNLEVBQUs7SUFDakQsSUFBTUMsYUFBYSxHQUFHRCxNQUFNLElBQUksQ0FBQyxDQUFDO0lBQ2xDLElBQU1HLFNBQVMsR0FBR0YsYUFBYSxDQUFDVCxLQUFLLENBQUNHLEtBQUssQ0FBQ0UsSUFBSSxDQUFDO0lBQ2pELElBQUlmLE1BQU0sQ0FBQ1MsSUFBSSxDQUFDVSxhQUFhLENBQUMsQ0FBQzNFLE1BQU0sS0FBSyxDQUFDLElBQUk2RSxTQUFTLElBQUksQ0FBQ0EsU0FBUyxDQUFDQyxlQUFlLEVBQUU7TUFDdEYsSUFBTUMsWUFBWSxHQUFHO1FBQ25CQyxJQUFJLEVBQUUsT0FBTztRQUNiQyxPQUFPLEVBQUU1SCxNQUFNLENBQUNvRixPQUFPLENBQUN5QyxNQUFNLENBQUMsMkJBQTJCLENBQUM7UUFDM0R6RCxLQUFLLGVBQUEzRCxNQUFBLENBQWUrRyxTQUFTLENBQUNwRCxLQUFLLFlBQVM7UUFDNUMwRCxPQUFPLEVBQUVOLFNBQVMsQ0FBQ3REO01BQ3JCLENBQUM7TUFDRGxFLE1BQU0sQ0FBQytILGFBQWEsQ0FBQ0MsTUFBTSxDQUFDaEIsS0FBSyxDQUFDRSxJQUFJLEVBQUVRLFlBQVksQ0FBQztJQUN2RDtFQUNGLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGMUgsTUFBTSxDQUFDaUksWUFBWSxDQUFDQyxTQUFTLENBQUM1QyxXQUFXLENBQUMsVUFBQzZDLElBQUksRUFBSztFQUNsRCxJQUFJQSxJQUFJLENBQUNDLFVBQVUsS0FBSyxVQUFVLEVBQUU7SUFDbENDLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQztFQUM1QztBQUNGLENBQUMsQ0FBQztBQUVGLFNBQVNDLGlCQUFpQkEsQ0FBQSxFQUFHO0VBQzNCdEksTUFBTSxDQUFDaUksWUFBWSxDQUFDRCxNQUFNLENBQUM7SUFDekI3RSxFQUFFLEVBQUUsU0FBUztJQUNiaUIsS0FBSyxFQUFFLDRCQUE0QjtJQUNuQ21FLFFBQVEsRUFBRSxDQUFDLFdBQVc7RUFDeEIsQ0FBQyxDQUFDO0FBQ0o7QUFFQSxTQUFTQyxVQUFVQSxDQUFDQyxTQUFTLEVBQUU7RUFDN0IsSUFBTUMsT0FBTyxHQUFHLElBQUlDLElBQUksQ0FBQyxDQUFDO0VBQzFCRCxPQUFPLENBQUNFLE9BQU8sQ0FBQ0YsT0FBTyxDQUFDRyxPQUFPLENBQUMsQ0FBQyxHQUFHSixTQUFTLENBQUMsQ0FBQyxDQUFDO0VBQ2hELE9BQU9DLE9BQU8sQ0FBQ0ksV0FBVyxDQUFDLENBQUM7QUFDOUI7QUFFQSxTQUFTQyxVQUFVQSxDQUFDM0UsS0FBSyxFQUFFSCxPQUFPLEVBQUUrRSxJQUFJLEVBQUU7RUFDeEMsSUFBTUMsTUFBTSxHQUFHTixJQUFJLENBQUNPLEdBQUcsQ0FBQyxDQUFDLENBQUNDLFFBQVEsQ0FBQyxDQUFDO0VBQ3BDLElBQU1DLElBQUksR0FBRztJQUNYakcsRUFBRSxFQUFFOEYsTUFBTTtJQUNWN0UsS0FBSyxFQUFMQSxLQUFLO0lBQ0xILE9BQU8sRUFBUEEsT0FBTztJQUNQb0YsR0FBRyxFQUFFYixVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ2xCYyxpQkFBaUIsRUFBRSxFQUFFO0lBQ3JCN0IsZUFBZSxFQUFFLEtBQUs7SUFDdEJ1QixJQUFJLEVBQUpBO0VBQ0YsQ0FBQztFQUNEaEosTUFBTSxDQUFDQyxPQUFPLENBQUNDLEtBQUssQ0FBQ0MsR0FBRyxDQUFDO0lBQUVvSixLQUFLLEVBQUU7RUFBRyxDQUFDLEVBQUUsVUFBQ25KLElBQUksRUFBSztJQUNoRCxJQUFNb0osYUFBYSxHQUFHcEosSUFBSSxDQUFDbUosS0FBSztJQUVoQ0MsYUFBYSxDQUFDeEYsSUFBSSxDQUFDb0YsSUFBSSxDQUFDO0lBRXhCcEosTUFBTSxDQUFDQyxPQUFPLENBQUNDLEtBQUssQ0FBQ3dDLEdBQUcsQ0FBQztNQUFFNkcsS0FBSyxFQUFFQztJQUFjLENBQUMsRUFBRSxZQUFNLENBQ3pELENBQUMsQ0FBQztFQUNKLENBQUMsQ0FBQztBQUNKOztBQUVBO0FBQ0E7QUFDQXhKLE1BQU0sQ0FBQzZGLElBQUksQ0FBQzRELFNBQVMsQ0FBQ25FLFdBQVcsQ0FBQyxVQUFDb0UsS0FBSyxFQUFFQyxVQUFVLEVBQUVDLEdBQUcsRUFBSztFQUM1RCxJQUFJRCxVQUFVLENBQUM1SSxHQUFHLEVBQUU7SUFDbEJmLE1BQU0sQ0FBQ29GLE9BQU8sQ0FBQ3lFLFdBQVcsQ0FBQztNQUFFbEMsSUFBSSxFQUFFLGFBQWE7TUFBRTVHLEdBQUcsRUFBRTRJLFVBQVUsQ0FBQzVJO0lBQUksQ0FBQyxDQUFDO0VBQzFFO0FBQ0YsQ0FBQyxDQUFDO0FBQ0Y7O0FBRUE7QUFDQWYsTUFBTSxDQUFDNkYsSUFBSSxDQUFDaUUsV0FBVyxDQUFDeEUsV0FBVyxDQUFDLFVBQUN5RSxVQUFVLEVBQUs7RUFDbEQvSixNQUFNLENBQUM2RixJQUFJLENBQUMxRixHQUFHLENBQUM0SixVQUFVLENBQUNMLEtBQUssRUFBRSxVQUFDRSxHQUFHLEVBQUs7SUFDekMsSUFBSUEsR0FBRyxJQUFJQSxHQUFHLENBQUM3SSxHQUFHLEVBQUU7TUFDbEJmLE1BQU0sQ0FBQ29GLE9BQU8sQ0FBQ3lFLFdBQVcsQ0FBQztRQUFFbEMsSUFBSSxFQUFFLGFBQWE7UUFBRTVHLEdBQUcsRUFBRTZJLEdBQUcsQ0FBQzdJO01BQUksQ0FBQyxDQUFDO0lBQ25FO0VBQ0YsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUZmLE1BQU0sQ0FBQ2lJLFlBQVksQ0FBQ0MsU0FBUyxDQUFDNUMsV0FBVyxDQUFDLFVBQUM2QyxJQUFJLEVBQUs7RUFDbEQsSUFBSUEsSUFBSSxDQUFDQyxVQUFVLEtBQUssU0FBUyxFQUFFO0lBQ2pDcEksTUFBTSxDQUFDNkYsSUFBSSxDQUFDbUUsS0FBSyxDQUFDO01BQUVDLE1BQU0sRUFBRSxJQUFJO01BQUVDLGFBQWEsRUFBRTtJQUFLLENBQUMsRUFBRSxVQUFDckUsSUFBSSxFQUFLO01BQ2pFLElBQU1zRSxZQUFZLEdBQUd0RSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUN6QixLQUFLO01BQ2xDLElBQU1nRyxZQUFZLE1BQUEzSixNQUFBLENBQU0wSixZQUFZLE9BQUExSixNQUFBLENBQUkwSCxJQUFJLENBQUNrQyxhQUFhLENBQUU7TUFDNUQsSUFBTWpHLEtBQUssR0FBR2dHLFlBQVksQ0FBQ3pILE1BQU0sR0FBRyxFQUFFLE1BQUFsQyxNQUFBLENBQU0ySixZQUFZLENBQUNFLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFdBQVFGLFlBQVk7TUFDN0ZyQixVQUFVLENBQUMzRSxLQUFLLEVBQUVnRyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDO0VBQ0o7QUFDRixDQUFDLENBQUM7QUFFRnBLLE1BQU0sQ0FBQ29GLE9BQU8sQ0FBQ21GLFdBQVcsQ0FBQ2pGLFdBQVcsQ0FBQyxZQUFNO0VBQzNDZ0QsaUJBQWlCLENBQUMsQ0FBQztBQUNyQixDQUFDLENBQUM7QUFFRnRJLE1BQU0sQ0FBQ29GLE9BQU8sQ0FBQ21GLFdBQVcsQ0FBQ2pGLFdBQVcsQ0FBQyxZQUFNO0VBQzNDdEYsTUFBTSxDQUFDd0ssU0FBUyxDQUFDQyxnQkFBZ0IsQ0FBQztJQUFFQyxzQkFBc0IsRUFBRTtFQUFLLENBQUMsQ0FBQyxTQUFNLENBQUM1SyxPQUFPLENBQUM2SyxLQUFLLENBQUM7QUFDMUYsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oYXdrLy4vbm9kZV9tb2R1bGVzL21pbmlzZWFyY2gvZGlzdC9lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9oYXdrL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2hhd2svd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2hhd2svd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9oYXdrL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vaGF3ay8uL3NyYy9iYWNrZ3JvdW5kL2JhY2tncm91bmQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBpZ25vcmUgKi9cbmNvbnN0IEVOVFJJRVMgPSAnRU5UUklFUyc7XG4vKiogQGlnbm9yZSAqL1xuY29uc3QgS0VZUyA9ICdLRVlTJztcbi8qKiBAaWdub3JlICovXG5jb25zdCBWQUxVRVMgPSAnVkFMVUVTJztcbi8qKiBAaWdub3JlICovXG5jb25zdCBMRUFGID0gJyc7XG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmNsYXNzIFRyZWVJdGVyYXRvciB7XG4gICAgY29uc3RydWN0b3Ioc2V0LCB0eXBlKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBzZXQuX3RyZWU7XG4gICAgICAgIGNvbnN0IGtleXMgPSBBcnJheS5mcm9tKG5vZGUua2V5cygpKTtcbiAgICAgICAgdGhpcy5zZXQgPSBzZXQ7XG4gICAgICAgIHRoaXMuX3R5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLl9wYXRoID0ga2V5cy5sZW5ndGggPiAwID8gW3sgbm9kZSwga2V5cyB9XSA6IFtdO1xuICAgIH1cbiAgICBuZXh0KCkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZGl2ZSgpO1xuICAgICAgICB0aGlzLmJhY2t0cmFjaygpO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGRpdmUoKSB7XG4gICAgICAgIGlmICh0aGlzLl9wYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgZG9uZTogdHJ1ZSwgdmFsdWU6IHVuZGVmaW5lZCB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgbm9kZSwga2V5cyB9ID0gbGFzdCQxKHRoaXMuX3BhdGgpO1xuICAgICAgICBpZiAobGFzdCQxKGtleXMpID09PSBMRUFGKSB7XG4gICAgICAgICAgICByZXR1cm4geyBkb25lOiBmYWxzZSwgdmFsdWU6IHRoaXMucmVzdWx0KCkgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjaGlsZCA9IG5vZGUuZ2V0KGxhc3QkMShrZXlzKSk7XG4gICAgICAgIHRoaXMuX3BhdGgucHVzaCh7IG5vZGU6IGNoaWxkLCBrZXlzOiBBcnJheS5mcm9tKGNoaWxkLmtleXMoKSkgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmRpdmUoKTtcbiAgICB9XG4gICAgYmFja3RyYWNrKCkge1xuICAgICAgICBpZiAodGhpcy5fcGF0aC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBrZXlzID0gbGFzdCQxKHRoaXMuX3BhdGgpLmtleXM7XG4gICAgICAgIGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXlzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wYXRoLnBvcCgpO1xuICAgICAgICB0aGlzLmJhY2t0cmFjaygpO1xuICAgIH1cbiAgICBrZXkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldC5fcHJlZml4ICsgdGhpcy5fcGF0aFxuICAgICAgICAgICAgLm1hcCgoeyBrZXlzIH0pID0+IGxhc3QkMShrZXlzKSlcbiAgICAgICAgICAgIC5maWx0ZXIoa2V5ID0+IGtleSAhPT0gTEVBRilcbiAgICAgICAgICAgIC5qb2luKCcnKTtcbiAgICB9XG4gICAgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiBsYXN0JDEodGhpcy5fcGF0aCkubm9kZS5nZXQoTEVBRik7XG4gICAgfVxuICAgIHJlc3VsdCgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLl90eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIHRoaXMudmFsdWUoKTtcbiAgICAgICAgICAgIGNhc2UgS0VZUzogcmV0dXJuIHRoaXMua2V5KCk7XG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gW3RoaXMua2V5KCksIHRoaXMudmFsdWUoKV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgW1N5bWJvbC5pdGVyYXRvcl0oKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbmNvbnN0IGxhc3QkMSA9IChhcnJheSkgPT4ge1xuICAgIHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAxXTtcbn07XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLWxhYmVscyAqL1xuLyoqXG4gKiBAaWdub3JlXG4gKi9cbmNvbnN0IGZ1enp5U2VhcmNoID0gKG5vZGUsIHF1ZXJ5LCBtYXhEaXN0YW5jZSkgPT4ge1xuICAgIGNvbnN0IHJlc3VsdHMgPSBuZXcgTWFwKCk7XG4gICAgaWYgKHF1ZXJ5ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIC8vIE51bWJlciBvZiBjb2x1bW5zIGluIHRoZSBMZXZlbnNodGVpbiBtYXRyaXguXG4gICAgY29uc3QgbiA9IHF1ZXJ5Lmxlbmd0aCArIDE7XG4gICAgLy8gTWF0Y2hpbmcgdGVybXMgY2FuIG5ldmVyIGJlIGxvbmdlciB0aGFuIE4gKyBtYXhEaXN0YW5jZS5cbiAgICBjb25zdCBtID0gbiArIG1heERpc3RhbmNlO1xuICAgIC8vIEZpbGwgZmlyc3QgbWF0cml4IHJvdyBhbmQgY29sdW1uIHdpdGggbnVtYmVyczogMCAxIDIgMyAuLi5cbiAgICBjb25zdCBtYXRyaXggPSBuZXcgVWludDhBcnJheShtICogbikuZmlsbChtYXhEaXN0YW5jZSArIDEpO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgbjsgKytqKVxuICAgICAgICBtYXRyaXhbal0gPSBqO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbTsgKytpKVxuICAgICAgICBtYXRyaXhbaSAqIG5dID0gaTtcbiAgICByZWN1cnNlKG5vZGUsIHF1ZXJ5LCBtYXhEaXN0YW5jZSwgcmVzdWx0cywgbWF0cml4LCAxLCBuLCAnJyk7XG4gICAgcmV0dXJuIHJlc3VsdHM7XG59O1xuLy8gTW9kaWZpZWQgdmVyc2lvbiBvZiBodHRwOi8vc3RldmVoYW5vdi5jYS9ibG9nLz9pZD0xMTRcbi8vIFRoaXMgYnVpbGRzIGEgTGV2ZW5zaHRlaW4gbWF0cml4IGZvciBhIGdpdmVuIHF1ZXJ5IGFuZCBjb250aW51b3VzbHkgdXBkYXRlc1xuLy8gaXQgZm9yIG5vZGVzIGluIHRoZSByYWRpeCB0cmVlIHRoYXQgZmFsbCB3aXRoaW4gdGhlIGdpdmVuIG1heGltdW0gZWRpdFxuLy8gZGlzdGFuY2UuIEtlZXBpbmcgdGhlIHNhbWUgbWF0cml4IGFyb3VuZCBpcyBiZW5lZmljaWFsIGVzcGVjaWFsbHkgZm9yIGxhcmdlclxuLy8gZWRpdCBkaXN0YW5jZXMuXG4vL1xuLy8gICAgICAgICAgIGsgICBhICAgdCAgIGUgICA8LS0gcXVlcnlcbi8vICAgICAgIDAgICAxICAgMiAgIDMgICA0XG4vLyAgIGMgICAxICAgMSAgIDIgICAzICAgNFxuLy8gICBhICAgMiAgIDIgICAxICAgMiAgIDNcbi8vICAgdCAgIDMgICAzICAgMiAgIDEgIFsyXSAgPC0tIGVkaXQgZGlzdGFuY2Vcbi8vICAgXlxuLy8gICBeIHRlcm0gaW4gcmFkaXggdHJlZSwgcm93cyBhcmUgYWRkZWQgYW5kIHJlbW92ZWQgYXMgbmVlZGVkXG5jb25zdCByZWN1cnNlID0gKG5vZGUsIHF1ZXJ5LCBtYXhEaXN0YW5jZSwgcmVzdWx0cywgbWF0cml4LCBtLCBuLCBwcmVmaXgpID0+IHtcbiAgICBjb25zdCBvZmZzZXQgPSBtICogbjtcbiAgICBrZXk6IGZvciAoY29uc3Qga2V5IG9mIG5vZGUua2V5cygpKSB7XG4gICAgICAgIGlmIChrZXkgPT09IExFQUYpIHtcbiAgICAgICAgICAgIC8vIFdlJ3ZlIHJlYWNoZWQgYSBsZWFmIG5vZGUuIENoZWNrIGlmIHRoZSBlZGl0IGRpc3RhbmNlIGFjY2VwdGFibGUgYW5kXG4gICAgICAgICAgICAvLyBzdG9yZSB0aGUgcmVzdWx0IGlmIGl0IGlzLlxuICAgICAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBtYXRyaXhbb2Zmc2V0IC0gMV07XG4gICAgICAgICAgICBpZiAoZGlzdGFuY2UgPD0gbWF4RGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnNldChwcmVmaXgsIFtub2RlLmdldChrZXkpLCBkaXN0YW5jZV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gSXRlcmF0ZSBvdmVyIGFsbCBjaGFyYWN0ZXJzIGluIHRoZSBrZXkuIFVwZGF0ZSB0aGUgTGV2ZW5zaHRlaW4gbWF0cml4XG4gICAgICAgICAgICAvLyBhbmQgY2hlY2sgaWYgdGhlIG1pbmltdW0gZGlzdGFuY2UgaW4gdGhlIGxhc3Qgcm93IGlzIHN0aWxsIHdpdGhpbiB0aGVcbiAgICAgICAgICAgIC8vIG1heGltdW0gZWRpdCBkaXN0YW5jZS4gSWYgaXQgaXMsIHdlIGNhbiByZWN1cnNlIG92ZXIgYWxsIGNoaWxkIG5vZGVzLlxuICAgICAgICAgICAgbGV0IGkgPSBtO1xuICAgICAgICAgICAgZm9yIChsZXQgcG9zID0gMDsgcG9zIDwga2V5Lmxlbmd0aDsgKytwb3MsICsraSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoYXIgPSBrZXlbcG9zXTtcbiAgICAgICAgICAgICAgICBjb25zdCB0aGlzUm93T2Zmc2V0ID0gbiAqIGk7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJldlJvd09mZnNldCA9IHRoaXNSb3dPZmZzZXQgLSBuO1xuICAgICAgICAgICAgICAgIC8vIFNldCB0aGUgZmlyc3QgY29sdW1uIGJhc2VkIG9uIHRoZSBwcmV2aW91cyByb3csIGFuZCBpbml0aWFsaXplIHRoZVxuICAgICAgICAgICAgICAgIC8vIG1pbmltdW0gZGlzdGFuY2UgaW4gdGhlIGN1cnJlbnQgcm93LlxuICAgICAgICAgICAgICAgIGxldCBtaW5EaXN0YW5jZSA9IG1hdHJpeFt0aGlzUm93T2Zmc2V0XTtcbiAgICAgICAgICAgICAgICBjb25zdCBqbWluID0gTWF0aC5tYXgoMCwgaSAtIG1heERpc3RhbmNlIC0gMSk7XG4gICAgICAgICAgICAgICAgY29uc3Qgam1heCA9IE1hdGgubWluKG4gLSAxLCBpICsgbWF4RGlzdGFuY2UpO1xuICAgICAgICAgICAgICAgIC8vIEl0ZXJhdGUgb3ZlciByZW1haW5pbmcgY29sdW1ucyAoY2hhcmFjdGVycyBpbiB0aGUgcXVlcnkpLlxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSBqbWluOyBqIDwgam1heDsgKytqKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpZmZlcmVudCA9IGNoYXIgIT09IHF1ZXJ5W2pdO1xuICAgICAgICAgICAgICAgICAgICAvLyBJdCBtaWdodCBtYWtlIHNlbnNlIHRvIG9ubHkgcmVhZCB0aGUgbWF0cml4IHBvc2l0aW9ucyB1c2VkIGZvclxuICAgICAgICAgICAgICAgICAgICAvLyBkZWxldGlvbi9pbnNlcnRpb24gaWYgdGhlIGNoYXJhY3RlcnMgYXJlIGRpZmZlcmVudC4gQnV0IHdlIHdhbnQgdG9cbiAgICAgICAgICAgICAgICAgICAgLy8gYXZvaWQgY29uZGl0aW9uYWwgcmVhZHMgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJwbCA9IG1hdHJpeFtwcmV2Um93T2Zmc2V0ICsgal0gKyArZGlmZmVyZW50O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWwgPSBtYXRyaXhbcHJldlJvd09mZnNldCArIGogKyAxXSArIDE7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlucyA9IG1hdHJpeFt0aGlzUm93T2Zmc2V0ICsgal0gKyAxO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXN0ID0gbWF0cml4W3RoaXNSb3dPZmZzZXQgKyBqICsgMV0gPSBNYXRoLm1pbihycGwsIGRlbCwgaW5zKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpc3QgPCBtaW5EaXN0YW5jZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbkRpc3RhbmNlID0gZGlzdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gQmVjYXVzZSBkaXN0YW5jZSB3aWxsIG5ldmVyIGRlY3JlYXNlLCB3ZSBjYW4gc3RvcC4gVGhlcmUgd2lsbCBiZSBub1xuICAgICAgICAgICAgICAgIC8vIG1hdGNoaW5nIGNoaWxkIG5vZGVzLlxuICAgICAgICAgICAgICAgIGlmIChtaW5EaXN0YW5jZSA+IG1heERpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlIGtleTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZWN1cnNlKG5vZGUuZ2V0KGtleSksIHF1ZXJ5LCBtYXhEaXN0YW5jZSwgcmVzdWx0cywgbWF0cml4LCBpLCBuLCBwcmVmaXggKyBrZXkpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyogZXNsaW50LWRpc2FibGUgbm8tbGFiZWxzICovXG4vKipcbiAqIEEgY2xhc3MgaW1wbGVtZW50aW5nIHRoZSBzYW1lIGludGVyZmFjZSBhcyBhIHN0YW5kYXJkIEphdmFTY3JpcHRcbiAqIFtgTWFwYF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTWFwKVxuICogd2l0aCBzdHJpbmcga2V5cywgYnV0IGFkZGluZyBzdXBwb3J0IGZvciBlZmZpY2llbnRseSBzZWFyY2hpbmcgZW50cmllcyB3aXRoXG4gKiBwcmVmaXggb3IgZnV6enkgc2VhcmNoLiBUaGlzIGNsYXNzIGlzIHVzZWQgaW50ZXJuYWxseSBieSB7QGxpbmsgTWluaVNlYXJjaH1cbiAqIGFzIHRoZSBpbnZlcnRlZCBpbmRleCBkYXRhIHN0cnVjdHVyZS4gVGhlIGltcGxlbWVudGF0aW9uIGlzIGEgcmFkaXggdHJlZVxuICogKGNvbXByZXNzZWQgcHJlZml4IHRyZWUpLlxuICpcbiAqIFNpbmNlIHRoaXMgY2xhc3MgY2FuIGJlIG9mIGdlbmVyYWwgdXRpbGl0eSBiZXlvbmQgX01pbmlTZWFyY2hfLCBpdCBpc1xuICogZXhwb3J0ZWQgYnkgdGhlIGBtaW5pc2VhcmNoYCBwYWNrYWdlIGFuZCBjYW4gYmUgaW1wb3J0ZWQgKG9yIHJlcXVpcmVkKSBhc1xuICogYG1pbmlzZWFyY2gvU2VhcmNoYWJsZU1hcGAuXG4gKlxuICogQHR5cGVQYXJhbSBUICBUaGUgdHlwZSBvZiB0aGUgdmFsdWVzIHN0b3JlZCBpbiB0aGUgbWFwLlxuICovXG5jbGFzcyBTZWFyY2hhYmxlTWFwIHtcbiAgICAvKipcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaXMgbm9ybWFsbHkgY2FsbGVkIHdpdGhvdXQgYXJndW1lbnRzLCBjcmVhdGluZyBhbiBlbXB0eVxuICAgICAqIG1hcC4gSW4gb3JkZXIgdG8gY3JlYXRlIGEge0BsaW5rIFNlYXJjaGFibGVNYXB9IGZyb20gYW4gaXRlcmFibGUgb3IgZnJvbSBhblxuICAgICAqIG9iamVjdCwgY2hlY2sge0BsaW5rIFNlYXJjaGFibGVNYXAuZnJvbX0gYW5kIHtAbGlua1xuICAgICAqIFNlYXJjaGFibGVNYXAuZnJvbU9iamVjdH0uXG4gICAgICpcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgYXJndW1lbnRzIGFyZSBmb3IgaW50ZXJuYWwgdXNlLCB3aGVuIGNyZWF0aW5nIGRlcml2ZWRcbiAgICAgKiBtdXRhYmxlIHZpZXdzIG9mIGEgbWFwIGF0IGEgcHJlZml4LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHRyZWUgPSBuZXcgTWFwKCksIHByZWZpeCA9ICcnKSB7XG4gICAgICAgIHRoaXMuX3NpemUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuX3RyZWUgPSB0cmVlO1xuICAgICAgICB0aGlzLl9wcmVmaXggPSBwcmVmaXg7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSBtdXRhYmxlIHZpZXcgb2YgdGhpcyB7QGxpbmsgU2VhcmNoYWJsZU1hcH0sXG4gICAgICogY29udGFpbmluZyBvbmx5IGVudHJpZXMgdGhhdCBzaGFyZSB0aGUgZ2l2ZW4gcHJlZml4LlxuICAgICAqXG4gICAgICogIyMjIFVzYWdlOlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIGxldCBtYXAgPSBuZXcgU2VhcmNoYWJsZU1hcCgpXG4gICAgICogbWFwLnNldChcInVuaWNvcm5cIiwgMSlcbiAgICAgKiBtYXAuc2V0KFwidW5pdmVyc2VcIiwgMilcbiAgICAgKiBtYXAuc2V0KFwidW5pdmVyc2l0eVwiLCAzKVxuICAgICAqIG1hcC5zZXQoXCJ1bmlxdWVcIiwgNClcbiAgICAgKiBtYXAuc2V0KFwiaGVsbG9cIiwgNSlcbiAgICAgKlxuICAgICAqIGxldCB1bmkgPSBtYXAuYXRQcmVmaXgoXCJ1bmlcIilcbiAgICAgKiB1bmkuZ2V0KFwidW5pcXVlXCIpIC8vID0+IDRcbiAgICAgKiB1bmkuZ2V0KFwidW5pY29yblwiKSAvLyA9PiAxXG4gICAgICogdW5pLmdldChcImhlbGxvXCIpIC8vID0+IHVuZGVmaW5lZFxuICAgICAqXG4gICAgICogbGV0IHVuaXZlciA9IG1hcC5hdFByZWZpeChcInVuaXZlclwiKVxuICAgICAqIHVuaXZlci5nZXQoXCJ1bmlxdWVcIikgLy8gPT4gdW5kZWZpbmVkXG4gICAgICogdW5pdmVyLmdldChcInVuaXZlcnNlXCIpIC8vID0+IDJcbiAgICAgKiB1bml2ZXIuZ2V0KFwidW5pdmVyc2l0eVwiKSAvLyA9PiAzXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcHJlZml4ICBUaGUgcHJlZml4XG4gICAgICogQHJldHVybiBBIHtAbGluayBTZWFyY2hhYmxlTWFwfSByZXByZXNlbnRpbmcgYSBtdXRhYmxlIHZpZXcgb2YgdGhlIG9yaWdpbmFsXG4gICAgICogTWFwIGF0IHRoZSBnaXZlbiBwcmVmaXhcbiAgICAgKi9cbiAgICBhdFByZWZpeChwcmVmaXgpIHtcbiAgICAgICAgaWYgKCFwcmVmaXguc3RhcnRzV2l0aCh0aGlzLl9wcmVmaXgpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc21hdGNoZWQgcHJlZml4Jyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgW25vZGUsIHBhdGhdID0gdHJhY2tEb3duKHRoaXMuX3RyZWUsIHByZWZpeC5zbGljZSh0aGlzLl9wcmVmaXgubGVuZ3RoKSk7XG4gICAgICAgIGlmIChub2RlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IFtwYXJlbnROb2RlLCBrZXldID0gbGFzdChwYXRoKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgayBvZiBwYXJlbnROb2RlLmtleXMoKSkge1xuICAgICAgICAgICAgICAgIGlmIChrICE9PSBMRUFGICYmIGsuc3RhcnRzV2l0aChrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0KGsuc2xpY2Uoa2V5Lmxlbmd0aCksIHBhcmVudE5vZGUuZ2V0KGspKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hhYmxlTWFwKG5vZGUsIHByZWZpeCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoYWJsZU1hcChub2RlLCBwcmVmaXgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hcC9jbGVhclxuICAgICAqL1xuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLl9zaXplID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLl90cmVlLmNsZWFyKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTWFwL2RlbGV0ZVxuICAgICAqIEBwYXJhbSBrZXkgIEtleSB0byBkZWxldGVcbiAgICAgKi9cbiAgICBkZWxldGUoa2V5KSB7XG4gICAgICAgIHRoaXMuX3NpemUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiByZW1vdmUodGhpcy5fdHJlZSwga2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9NYXAvZW50cmllc1xuICAgICAqIEByZXR1cm4gQW4gaXRlcmF0b3IgaXRlcmF0aW5nIHRocm91Z2ggYFtrZXksIHZhbHVlXWAgZW50cmllcy5cbiAgICAgKi9cbiAgICBlbnRyaWVzKCkge1xuICAgICAgICByZXR1cm4gbmV3IFRyZWVJdGVyYXRvcih0aGlzLCBFTlRSSUVTKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9NYXAvZm9yRWFjaFxuICAgICAqIEBwYXJhbSBmbiAgSXRlcmF0aW9uIGZ1bmN0aW9uXG4gICAgICovXG4gICAgZm9yRWFjaChmbikge1xuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiB0aGlzKSB7XG4gICAgICAgICAgICBmbihrZXksIHZhbHVlLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgTWFwIG9mIGFsbCB0aGUgZW50cmllcyB0aGF0IGhhdmUgYSBrZXkgd2l0aGluIHRoZSBnaXZlbiBlZGl0XG4gICAgICogZGlzdGFuY2UgZnJvbSB0aGUgc2VhcmNoIGtleS4gVGhlIGtleXMgb2YgdGhlIHJldHVybmVkIE1hcCBhcmUgdGhlIG1hdGNoaW5nXG4gICAgICoga2V5cywgd2hpbGUgdGhlIHZhbHVlcyBhcmUgdHdvLWVsZW1lbnQgYXJyYXlzIHdoZXJlIHRoZSBmaXJzdCBlbGVtZW50IGlzXG4gICAgICogdGhlIHZhbHVlIGFzc29jaWF0ZWQgdG8gdGhlIGtleSwgYW5kIHRoZSBzZWNvbmQgaXMgdGhlIGVkaXQgZGlzdGFuY2Ugb2YgdGhlXG4gICAgICoga2V5IHRvIHRoZSBzZWFyY2gga2V5LlxuICAgICAqXG4gICAgICogIyMjIFVzYWdlOlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIGxldCBtYXAgPSBuZXcgU2VhcmNoYWJsZU1hcCgpXG4gICAgICogbWFwLnNldCgnaGVsbG8nLCAnd29ybGQnKVxuICAgICAqIG1hcC5zZXQoJ2hlbGwnLCAneWVhaCcpXG4gICAgICogbWFwLnNldCgnY2lhbycsICdtb25kbycpXG4gICAgICpcbiAgICAgKiAvLyBHZXQgYWxsIGVudHJpZXMgdGhhdCBtYXRjaCB0aGUga2V5ICdoYWxsbycgd2l0aCBhIG1heGltdW0gZWRpdCBkaXN0YW5jZSBvZiAyXG4gICAgICogbWFwLmZ1enp5R2V0KCdoYWxsbycsIDIpXG4gICAgICogLy8gPT4gTWFwKDIpIHsgJ2hlbGxvJyA9PiBbJ3dvcmxkJywgMV0sICdoZWxsJyA9PiBbJ3llYWgnLCAyXSB9XG4gICAgICpcbiAgICAgKiAvLyBJbiB0aGUgZXhhbXBsZSwgdGhlIFwiaGVsbG9cIiBrZXkgaGFzIHZhbHVlIFwid29ybGRcIiBhbmQgZWRpdCBkaXN0YW5jZSBvZiAxXG4gICAgICogLy8gKGNoYW5nZSBcImVcIiB0byBcImFcIiksIHRoZSBrZXkgXCJoZWxsXCIgaGFzIHZhbHVlIFwieWVhaFwiIGFuZCBlZGl0IGRpc3RhbmNlIG9mIDJcbiAgICAgKiAvLyAoY2hhbmdlIFwiZVwiIHRvIFwiYVwiLCBkZWxldGUgXCJvXCIpXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAcGFyYW0ga2V5ICBUaGUgc2VhcmNoIGtleVxuICAgICAqIEBwYXJhbSBtYXhFZGl0RGlzdGFuY2UgIFRoZSBtYXhpbXVtIGVkaXQgZGlzdGFuY2UgKExldmVuc2h0ZWluKVxuICAgICAqIEByZXR1cm4gQSBNYXAgb2YgdGhlIG1hdGNoaW5nIGtleXMgdG8gdGhlaXIgdmFsdWUgYW5kIGVkaXQgZGlzdGFuY2VcbiAgICAgKi9cbiAgICBmdXp6eUdldChrZXksIG1heEVkaXREaXN0YW5jZSkge1xuICAgICAgICByZXR1cm4gZnV6enlTZWFyY2godGhpcy5fdHJlZSwga2V5LCBtYXhFZGl0RGlzdGFuY2UpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hcC9nZXRcbiAgICAgKiBAcGFyYW0ga2V5ICBLZXkgdG8gZ2V0XG4gICAgICogQHJldHVybiBWYWx1ZSBhc3NvY2lhdGVkIHRvIHRoZSBrZXksIG9yIGB1bmRlZmluZWRgIGlmIHRoZSBrZXkgaXMgbm90XG4gICAgICogZm91bmQuXG4gICAgICovXG4gICAgZ2V0KGtleSkge1xuICAgICAgICBjb25zdCBub2RlID0gbG9va3VwKHRoaXMuX3RyZWUsIGtleSk7XG4gICAgICAgIHJldHVybiBub2RlICE9PSB1bmRlZmluZWQgPyBub2RlLmdldChMRUFGKSA6IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9NYXAvaGFzXG4gICAgICogQHBhcmFtIGtleSAgS2V5XG4gICAgICogQHJldHVybiBUcnVlIGlmIHRoZSBrZXkgaXMgaW4gdGhlIG1hcCwgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgICovXG4gICAgaGFzKGtleSkge1xuICAgICAgICBjb25zdCBub2RlID0gbG9va3VwKHRoaXMuX3RyZWUsIGtleSk7XG4gICAgICAgIHJldHVybiBub2RlICE9PSB1bmRlZmluZWQgJiYgbm9kZS5oYXMoTEVBRik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTWFwL2tleXNcbiAgICAgKiBAcmV0dXJuIEFuIGBJdGVyYWJsZWAgaXRlcmF0aW5nIHRocm91Z2gga2V5c1xuICAgICAqL1xuICAgIGtleXMoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVHJlZUl0ZXJhdG9yKHRoaXMsIEtFWVMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hcC9zZXRcbiAgICAgKiBAcGFyYW0ga2V5ICBLZXkgdG8gc2V0XG4gICAgICogQHBhcmFtIHZhbHVlICBWYWx1ZSB0byBhc3NvY2lhdGUgdG8gdGhlIGtleVxuICAgICAqIEByZXR1cm4gVGhlIHtAbGluayBTZWFyY2hhYmxlTWFwfSBpdHNlbGYsIHRvIGFsbG93IGNoYWluaW5nXG4gICAgICovXG4gICAgc2V0KGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2tleSBtdXN0IGJlIGEgc3RyaW5nJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2l6ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3Qgbm9kZSA9IGNyZWF0ZVBhdGgodGhpcy5fdHJlZSwga2V5KTtcbiAgICAgICAgbm9kZS5zZXQoTEVBRiwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9NYXAvc2l6ZVxuICAgICAqL1xuICAgIGdldCBzaXplKCkge1xuICAgICAgICBpZiAodGhpcy5fc2l6ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gICAgICAgIH1cbiAgICAgICAgLyoqIEBpZ25vcmUgKi9cbiAgICAgICAgdGhpcy5fc2l6ZSA9IDA7XG4gICAgICAgIGNvbnN0IGl0ZXIgPSB0aGlzLmVudHJpZXMoKTtcbiAgICAgICAgd2hpbGUgKCFpdGVyLm5leHQoKS5kb25lKVxuICAgICAgICAgICAgdGhpcy5fc2l6ZSArPSAxO1xuICAgICAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgdmFsdWUgYXQgdGhlIGdpdmVuIGtleSB1c2luZyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24uIFRoZSBmdW5jdGlvblxuICAgICAqIGlzIGNhbGxlZCB3aXRoIHRoZSBjdXJyZW50IHZhbHVlIGF0IHRoZSBrZXksIGFuZCBpdHMgcmV0dXJuIHZhbHVlIGlzIHVzZWQgYXNcbiAgICAgKiB0aGUgbmV3IHZhbHVlIHRvIGJlIHNldC5cbiAgICAgKlxuICAgICAqICMjIyBFeGFtcGxlOlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIC8vIEluY3JlbWVudCB0aGUgY3VycmVudCB2YWx1ZSBieSBvbmVcbiAgICAgKiBzZWFyY2hhYmxlTWFwLnVwZGF0ZSgnc29tZWtleScsIChjdXJyZW50VmFsdWUpID0+IGN1cnJlbnRWYWx1ZSA9PSBudWxsID8gMCA6IGN1cnJlbnRWYWx1ZSArIDEpXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBJZiB0aGUgdmFsdWUgYXQgdGhlIGdpdmVuIGtleSBpcyBvciB3aWxsIGJlIGFuIG9iamVjdCwgaXQgbWlnaHQgbm90IHJlcXVpcmVcbiAgICAgKiByZS1hc3NpZ25tZW50LiBJbiB0aGF0IGNhc2UgaXQgaXMgYmV0dGVyIHRvIHVzZSBgZmV0Y2goKWAsIGJlY2F1c2UgaXQgaXNcbiAgICAgKiBmYXN0ZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ga2V5ICBUaGUga2V5IHRvIHVwZGF0ZVxuICAgICAqIEBwYXJhbSBmbiAgVGhlIGZ1bmN0aW9uIHVzZWQgdG8gY29tcHV0ZSB0aGUgbmV3IHZhbHVlIGZyb20gdGhlIGN1cnJlbnQgb25lXG4gICAgICogQHJldHVybiBUaGUge0BsaW5rIFNlYXJjaGFibGVNYXB9IGl0c2VsZiwgdG8gYWxsb3cgY2hhaW5pbmdcbiAgICAgKi9cbiAgICB1cGRhdGUoa2V5LCBmbikge1xuICAgICAgICBpZiAodHlwZW9mIGtleSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigna2V5IG11c3QgYmUgYSBzdHJpbmcnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zaXplID0gdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBub2RlID0gY3JlYXRlUGF0aCh0aGlzLl90cmVlLCBrZXkpO1xuICAgICAgICBub2RlLnNldChMRUFGLCBmbihub2RlLmdldChMRUFGKSkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogRmV0Y2hlcyB0aGUgdmFsdWUgb2YgdGhlIGdpdmVuIGtleS4gSWYgdGhlIHZhbHVlIGRvZXMgbm90IGV4aXN0LCBjYWxscyB0aGVcbiAgICAgKiBnaXZlbiBmdW5jdGlvbiB0byBjcmVhdGUgYSBuZXcgdmFsdWUsIHdoaWNoIGlzIGluc2VydGVkIGF0IHRoZSBnaXZlbiBrZXlcbiAgICAgKiBhbmQgc3Vic2VxdWVudGx5IHJldHVybmVkLlxuICAgICAqXG4gICAgICogIyMjIEV4YW1wbGU6XG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogY29uc3QgbWFwID0gc2VhcmNoYWJsZU1hcC5mZXRjaCgnc29tZWtleScsICgpID0+IG5ldyBNYXAoKSlcbiAgICAgKiBtYXAuc2V0KCdmb28nLCAnYmFyJylcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBwYXJhbSBrZXkgIFRoZSBrZXkgdG8gdXBkYXRlXG4gICAgICogQHBhcmFtIGluaXRpYWwgIEEgZnVuY3Rpb24gdGhhdCBjcmVhdGVzIGEgbmV3IHZhbHVlIGlmIHRoZSBrZXkgZG9lcyBub3QgZXhpc3RcbiAgICAgKiBAcmV0dXJuIFRoZSBleGlzdGluZyBvciBuZXcgdmFsdWUgYXQgdGhlIGdpdmVuIGtleVxuICAgICAqL1xuICAgIGZldGNoKGtleSwgaW5pdGlhbCkge1xuICAgICAgICBpZiAodHlwZW9mIGtleSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigna2V5IG11c3QgYmUgYSBzdHJpbmcnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zaXplID0gdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBub2RlID0gY3JlYXRlUGF0aCh0aGlzLl90cmVlLCBrZXkpO1xuICAgICAgICBsZXQgdmFsdWUgPSBub2RlLmdldChMRUFGKTtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG5vZGUuc2V0KExFQUYsIHZhbHVlID0gaW5pdGlhbCgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTWFwL3ZhbHVlc1xuICAgICAqIEByZXR1cm4gQW4gYEl0ZXJhYmxlYCBpdGVyYXRpbmcgdGhyb3VnaCB2YWx1ZXMuXG4gICAgICovXG4gICAgdmFsdWVzKCkge1xuICAgICAgICByZXR1cm4gbmV3IFRyZWVJdGVyYXRvcih0aGlzLCBWQUxVRVMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hcC9AQGl0ZXJhdG9yXG4gICAgICovXG4gICAgW1N5bWJvbC5pdGVyYXRvcl0oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVudHJpZXMoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHtAbGluayBTZWFyY2hhYmxlTWFwfSBmcm9tIGFuIGBJdGVyYWJsZWAgb2YgZW50cmllc1xuICAgICAqXG4gICAgICogQHBhcmFtIGVudHJpZXMgIEVudHJpZXMgdG8gYmUgaW5zZXJ0ZWQgaW4gdGhlIHtAbGluayBTZWFyY2hhYmxlTWFwfVxuICAgICAqIEByZXR1cm4gQSBuZXcge0BsaW5rIFNlYXJjaGFibGVNYXB9IHdpdGggdGhlIGdpdmVuIGVudHJpZXNcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbShlbnRyaWVzKSB7XG4gICAgICAgIGNvbnN0IHRyZWUgPSBuZXcgU2VhcmNoYWJsZU1hcCgpO1xuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBlbnRyaWVzKSB7XG4gICAgICAgICAgICB0cmVlLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJlZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHtAbGluayBTZWFyY2hhYmxlTWFwfSBmcm9tIHRoZSBpdGVyYWJsZSBwcm9wZXJ0aWVzIG9mIGEgSmF2YVNjcmlwdCBvYmplY3RcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvYmplY3QgIE9iamVjdCBvZiBlbnRyaWVzIGZvciB0aGUge0BsaW5rIFNlYXJjaGFibGVNYXB9XG4gICAgICogQHJldHVybiBBIG5ldyB7QGxpbmsgU2VhcmNoYWJsZU1hcH0gd2l0aCB0aGUgZ2l2ZW4gZW50cmllc1xuICAgICAqL1xuICAgIHN0YXRpYyBmcm9tT2JqZWN0KG9iamVjdCkge1xuICAgICAgICByZXR1cm4gU2VhcmNoYWJsZU1hcC5mcm9tKE9iamVjdC5lbnRyaWVzKG9iamVjdCkpO1xuICAgIH1cbn1cbmNvbnN0IHRyYWNrRG93biA9ICh0cmVlLCBrZXksIHBhdGggPSBbXSkgPT4ge1xuICAgIGlmIChrZXkubGVuZ3RoID09PSAwIHx8IHRyZWUgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gW3RyZWUsIHBhdGhdO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGsgb2YgdHJlZS5rZXlzKCkpIHtcbiAgICAgICAgaWYgKGsgIT09IExFQUYgJiYga2V5LnN0YXJ0c1dpdGgoaykpIHtcbiAgICAgICAgICAgIHBhdGgucHVzaChbdHJlZSwga10pOyAvLyBwZXJmb3JtYW5jZTogdXBkYXRlIGluIHBsYWNlXG4gICAgICAgICAgICByZXR1cm4gdHJhY2tEb3duKHRyZWUuZ2V0KGspLCBrZXkuc2xpY2Uoay5sZW5ndGgpLCBwYXRoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwYXRoLnB1c2goW3RyZWUsIGtleV0pOyAvLyBwZXJmb3JtYW5jZTogdXBkYXRlIGluIHBsYWNlXG4gICAgcmV0dXJuIHRyYWNrRG93bih1bmRlZmluZWQsICcnLCBwYXRoKTtcbn07XG5jb25zdCBsb29rdXAgPSAodHJlZSwga2V5KSA9PiB7XG4gICAgaWYgKGtleS5sZW5ndGggPT09IDAgfHwgdHJlZSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0cmVlO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGsgb2YgdHJlZS5rZXlzKCkpIHtcbiAgICAgICAgaWYgKGsgIT09IExFQUYgJiYga2V5LnN0YXJ0c1dpdGgoaykpIHtcbiAgICAgICAgICAgIHJldHVybiBsb29rdXAodHJlZS5nZXQoayksIGtleS5zbGljZShrLmxlbmd0aCkpO1xuICAgICAgICB9XG4gICAgfVxufTtcbi8vIENyZWF0ZSBhIHBhdGggaW4gdGhlIHJhZGl4IHRyZWUgZm9yIHRoZSBnaXZlbiBrZXksIGFuZCByZXR1cm5zIHRoZSBkZWVwZXN0XG4vLyBub2RlLiBUaGlzIGZ1bmN0aW9uIGlzIGluIHRoZSBob3QgcGF0aCBmb3IgaW5kZXhpbmcuIEl0IGF2b2lkcyB1bm5lY2Vzc2FyeVxuLy8gc3RyaW5nIG9wZXJhdGlvbnMgYW5kIHJlY3Vyc2lvbiBmb3IgcGVyZm9ybWFuY2UuXG5jb25zdCBjcmVhdGVQYXRoID0gKG5vZGUsIGtleSkgPT4ge1xuICAgIGNvbnN0IGtleUxlbmd0aCA9IGtleS5sZW5ndGg7XG4gICAgb3V0ZXI6IGZvciAobGV0IHBvcyA9IDA7IG5vZGUgJiYgcG9zIDwga2V5TGVuZ3RoOykge1xuICAgICAgICBmb3IgKGNvbnN0IGsgb2Ygbm9kZS5rZXlzKCkpIHtcbiAgICAgICAgICAgIC8vIENoZWNrIHdoZXRoZXIgdGhpcyBrZXkgaXMgYSBjYW5kaWRhdGU6IHRoZSBmaXJzdCBjaGFyYWN0ZXJzIG11c3QgbWF0Y2guXG4gICAgICAgICAgICBpZiAoayAhPT0gTEVBRiAmJiBrZXlbcG9zXSA9PT0ga1swXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxlbiA9IE1hdGgubWluKGtleUxlbmd0aCAtIHBvcywgay5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIC8vIEFkdmFuY2Ugb2Zmc2V0IHRvIHRoZSBwb2ludCB3aGVyZSBrZXkgYW5kIGsgbm8gbG9uZ2VyIG1hdGNoLlxuICAgICAgICAgICAgICAgIGxldCBvZmZzZXQgPSAxO1xuICAgICAgICAgICAgICAgIHdoaWxlIChvZmZzZXQgPCBsZW4gJiYga2V5W3BvcyArIG9mZnNldF0gPT09IGtbb2Zmc2V0XSlcbiAgICAgICAgICAgICAgICAgICAgKytvZmZzZXQ7XG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBub2RlLmdldChrKTtcbiAgICAgICAgICAgICAgICBpZiAob2Zmc2V0ID09PSBrLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgZXhpc3Rpbmcga2V5IGlzIHNob3J0ZXIgdGhhbiB0aGUga2V5IHdlIG5lZWQgdG8gY3JlYXRlLlxuICAgICAgICAgICAgICAgICAgICBub2RlID0gY2hpbGQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBQYXJ0aWFsIG1hdGNoOiB3ZSBuZWVkIHRvIGluc2VydCBhbiBpbnRlcm1lZGlhdGUgbm9kZSB0byBjb250YWluXG4gICAgICAgICAgICAgICAgICAgIC8vIGJvdGggdGhlIGV4aXN0aW5nIHN1YnRyZWUgYW5kIHRoZSBuZXcgbm9kZS5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW50ZXJtZWRpYXRlID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgICAgICAgICBpbnRlcm1lZGlhdGUuc2V0KGsuc2xpY2Uob2Zmc2V0KSwgY2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICBub2RlLnNldChrZXkuc2xpY2UocG9zLCBwb3MgKyBvZmZzZXQpLCBpbnRlcm1lZGlhdGUpO1xuICAgICAgICAgICAgICAgICAgICBub2RlLmRlbGV0ZShrKTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZSA9IGludGVybWVkaWF0ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcG9zICs9IG9mZnNldDtcbiAgICAgICAgICAgICAgICBjb250aW51ZSBvdXRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBDcmVhdGUgYSBmaW5hbCBjaGlsZCBub2RlIHRvIGNvbnRhaW4gdGhlIGZpbmFsIHN1ZmZpeCBvZiB0aGUga2V5LlxuICAgICAgICBjb25zdCBjaGlsZCA9IG5ldyBNYXAoKTtcbiAgICAgICAgbm9kZS5zZXQoa2V5LnNsaWNlKHBvcyksIGNoaWxkKTtcbiAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbn07XG5jb25zdCByZW1vdmUgPSAodHJlZSwga2V5KSA9PiB7XG4gICAgY29uc3QgW25vZGUsIHBhdGhdID0gdHJhY2tEb3duKHRyZWUsIGtleSk7XG4gICAgaWYgKG5vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIG5vZGUuZGVsZXRlKExFQUYpO1xuICAgIGlmIChub2RlLnNpemUgPT09IDApIHtcbiAgICAgICAgY2xlYW51cChwYXRoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAobm9kZS5zaXplID09PSAxKSB7XG4gICAgICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IG5vZGUuZW50cmllcygpLm5leHQoKS52YWx1ZTtcbiAgICAgICAgbWVyZ2UocGF0aCwga2V5LCB2YWx1ZSk7XG4gICAgfVxufTtcbmNvbnN0IGNsZWFudXAgPSAocGF0aCkgPT4ge1xuICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IFtub2RlLCBrZXldID0gbGFzdChwYXRoKTtcbiAgICBub2RlLmRlbGV0ZShrZXkpO1xuICAgIGlmIChub2RlLnNpemUgPT09IDApIHtcbiAgICAgICAgY2xlYW51cChwYXRoLnNsaWNlKDAsIC0xKSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKG5vZGUuc2l6ZSA9PT0gMSkge1xuICAgICAgICBjb25zdCBba2V5LCB2YWx1ZV0gPSBub2RlLmVudHJpZXMoKS5uZXh0KCkudmFsdWU7XG4gICAgICAgIGlmIChrZXkgIT09IExFQUYpIHtcbiAgICAgICAgICAgIG1lcmdlKHBhdGguc2xpY2UoMCwgLTEpLCBrZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5jb25zdCBtZXJnZSA9IChwYXRoLCBrZXksIHZhbHVlKSA9PiB7XG4gICAgaWYgKHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgW25vZGUsIG5vZGVLZXldID0gbGFzdChwYXRoKTtcbiAgICBub2RlLnNldChub2RlS2V5ICsga2V5LCB2YWx1ZSk7XG4gICAgbm9kZS5kZWxldGUobm9kZUtleSk7XG59O1xuY29uc3QgbGFzdCA9IChhcnJheSkgPT4ge1xuICAgIHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAxXTtcbn07XG5cbmNvbnN0IE9SID0gJ29yJztcbmNvbnN0IEFORCA9ICdhbmQnO1xuY29uc3QgQU5EX05PVCA9ICdhbmRfbm90Jztcbi8qKlxuICoge0BsaW5rIE1pbmlTZWFyY2h9IGlzIHRoZSBtYWluIGVudHJ5cG9pbnQgY2xhc3MsIGltcGxlbWVudGluZyBhIGZ1bGwtdGV4dFxuICogc2VhcmNoIGVuZ2luZSBpbiBtZW1vcnkuXG4gKlxuICogQHR5cGVQYXJhbSBUICBUaGUgdHlwZSBvZiB0aGUgZG9jdW1lbnRzIGJlaW5nIGluZGV4ZWQuXG4gKlxuICogIyMjIEJhc2ljIGV4YW1wbGU6XG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogY29uc3QgZG9jdW1lbnRzID0gW1xuICogICB7XG4gKiAgICAgaWQ6IDEsXG4gKiAgICAgdGl0bGU6ICdNb2J5IERpY2snLFxuICogICAgIHRleHQ6ICdDYWxsIG1lIElzaG1hZWwuIFNvbWUgeWVhcnMgYWdvLi4uJyxcbiAqICAgICBjYXRlZ29yeTogJ2ZpY3Rpb24nXG4gKiAgIH0sXG4gKiAgIHtcbiAqICAgICBpZDogMixcbiAqICAgICB0aXRsZTogJ1plbiBhbmQgdGhlIEFydCBvZiBNb3RvcmN5Y2xlIE1haW50ZW5hbmNlJyxcbiAqICAgICB0ZXh0OiAnSSBjYW4gc2VlIGJ5IG15IHdhdGNoLi4uJyxcbiAqICAgICBjYXRlZ29yeTogJ2ZpY3Rpb24nXG4gKiAgIH0sXG4gKiAgIHtcbiAqICAgICBpZDogMyxcbiAqICAgICB0aXRsZTogJ05ldXJvbWFuY2VyJyxcbiAqICAgICB0ZXh0OiAnVGhlIHNreSBhYm92ZSB0aGUgcG9ydCB3YXMuLi4nLFxuICogICAgIGNhdGVnb3J5OiAnZmljdGlvbidcbiAqICAgfSxcbiAqICAge1xuICogICAgIGlkOiA0LFxuICogICAgIHRpdGxlOiAnWmVuIGFuZCB0aGUgQXJ0IG9mIEFyY2hlcnknLFxuICogICAgIHRleHQ6ICdBdCBmaXJzdCBzaWdodCBpdCBtdXN0IHNlZW0uLi4nLFxuICogICAgIGNhdGVnb3J5OiAnbm9uLWZpY3Rpb24nXG4gKiAgIH0sXG4gKiAgIC8vIC4uLmFuZCBtb3JlXG4gKiBdXG4gKlxuICogLy8gQ3JlYXRlIGEgc2VhcmNoIGVuZ2luZSB0aGF0IGluZGV4ZXMgdGhlICd0aXRsZScgYW5kICd0ZXh0JyBmaWVsZHMgZm9yXG4gKiAvLyBmdWxsLXRleHQgc2VhcmNoLiBTZWFyY2ggcmVzdWx0cyB3aWxsIGluY2x1ZGUgJ3RpdGxlJyBhbmQgJ2NhdGVnb3J5JyAocGx1cyB0aGVcbiAqIC8vIGlkIGZpZWxkLCB0aGF0IGlzIGFsd2F5cyBzdG9yZWQgYW5kIHJldHVybmVkKVxuICogY29uc3QgbWluaVNlYXJjaCA9IG5ldyBNaW5pU2VhcmNoKHtcbiAqICAgZmllbGRzOiBbJ3RpdGxlJywgJ3RleHQnXSxcbiAqICAgc3RvcmVGaWVsZHM6IFsndGl0bGUnLCAnY2F0ZWdvcnknXVxuICogfSlcbiAqXG4gKiAvLyBBZGQgZG9jdW1lbnRzIHRvIHRoZSBpbmRleFxuICogbWluaVNlYXJjaC5hZGRBbGwoZG9jdW1lbnRzKVxuICpcbiAqIC8vIFNlYXJjaCBmb3IgZG9jdW1lbnRzOlxuICogbGV0IHJlc3VsdHMgPSBtaW5pU2VhcmNoLnNlYXJjaCgnemVuIGFydCBtb3RvcmN5Y2xlJylcbiAqIC8vID0+IFtcbiAqIC8vICAgeyBpZDogMiwgdGl0bGU6ICdaZW4gYW5kIHRoZSBBcnQgb2YgTW90b3JjeWNsZSBNYWludGVuYW5jZScsIGNhdGVnb3J5OiAnZmljdGlvbicsIHNjb3JlOiAyLjc3MjU4IH0sXG4gKiAvLyAgIHsgaWQ6IDQsIHRpdGxlOiAnWmVuIGFuZCB0aGUgQXJ0IG9mIEFyY2hlcnknLCBjYXRlZ29yeTogJ25vbi1maWN0aW9uJywgc2NvcmU6IDEuMzg2MjkgfVxuICogLy8gXVxuICogYGBgXG4gKi9cbmNsYXNzIE1pbmlTZWFyY2gge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSBvcHRpb25zICBDb25maWd1cmF0aW9uIG9wdGlvbnNcbiAgICAgKlxuICAgICAqICMjIyBFeGFtcGxlczpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiAvLyBDcmVhdGUgYSBzZWFyY2ggZW5naW5lIHRoYXQgaW5kZXhlcyB0aGUgJ3RpdGxlJyBhbmQgJ3RleHQnIGZpZWxkcyBvZiB5b3VyXG4gICAgICogLy8gZG9jdW1lbnRzOlxuICAgICAqIGNvbnN0IG1pbmlTZWFyY2ggPSBuZXcgTWluaVNlYXJjaCh7IGZpZWxkczogWyd0aXRsZScsICd0ZXh0J10gfSlcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqICMjIyBJRCBGaWVsZDpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiAvLyBZb3VyIGRvY3VtZW50cyBhcmUgYXNzdW1lZCB0byBpbmNsdWRlIGEgdW5pcXVlICdpZCcgZmllbGQsIGJ1dCBpZiB5b3Ugd2FudFxuICAgICAqIC8vIHRvIHVzZSBhIGRpZmZlcmVudCBmaWVsZCBmb3IgZG9jdW1lbnQgaWRlbnRpZmljYXRpb24sIHlvdSBjYW4gc2V0IHRoZVxuICAgICAqIC8vICdpZEZpZWxkJyBvcHRpb246XG4gICAgICogY29uc3QgbWluaVNlYXJjaCA9IG5ldyBNaW5pU2VhcmNoKHsgaWRGaWVsZDogJ2tleScsIGZpZWxkczogWyd0aXRsZScsICd0ZXh0J10gfSlcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqICMjIyBPcHRpb25zIGFuZCBkZWZhdWx0czpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiAvLyBUaGUgZnVsbCBzZXQgb2Ygb3B0aW9ucyAoaGVyZSB3aXRoIHRoZWlyIGRlZmF1bHQgdmFsdWUpIGlzOlxuICAgICAqIGNvbnN0IG1pbmlTZWFyY2ggPSBuZXcgTWluaVNlYXJjaCh7XG4gICAgICogICAvLyBpZEZpZWxkOiBmaWVsZCB0aGF0IHVuaXF1ZWx5IGlkZW50aWZpZXMgYSBkb2N1bWVudFxuICAgICAqICAgaWRGaWVsZDogJ2lkJyxcbiAgICAgKlxuICAgICAqICAgLy8gZXh0cmFjdEZpZWxkOiBmdW5jdGlvbiB1c2VkIHRvIGdldCB0aGUgdmFsdWUgb2YgYSBmaWVsZCBpbiBhIGRvY3VtZW50LlxuICAgICAqICAgLy8gQnkgZGVmYXVsdCwgaXQgYXNzdW1lcyB0aGUgZG9jdW1lbnQgaXMgYSBmbGF0IG9iamVjdCB3aXRoIGZpZWxkIG5hbWVzIGFzXG4gICAgICogICAvLyBwcm9wZXJ0eSBrZXlzIGFuZCBmaWVsZCB2YWx1ZXMgYXMgc3RyaW5nIHByb3BlcnR5IHZhbHVlcywgYnV0IGN1c3RvbSBsb2dpY1xuICAgICAqICAgLy8gY2FuIGJlIGltcGxlbWVudGVkIGJ5IHNldHRpbmcgdGhpcyBvcHRpb24gdG8gYSBjdXN0b20gZXh0cmFjdG9yIGZ1bmN0aW9uLlxuICAgICAqICAgZXh0cmFjdEZpZWxkOiAoZG9jdW1lbnQsIGZpZWxkTmFtZSkgPT4gZG9jdW1lbnRbZmllbGROYW1lXSxcbiAgICAgKlxuICAgICAqICAgLy8gdG9rZW5pemU6IGZ1bmN0aW9uIHVzZWQgdG8gc3BsaXQgZmllbGRzIGludG8gaW5kaXZpZHVhbCB0ZXJtcy4gQnlcbiAgICAgKiAgIC8vIGRlZmF1bHQsIGl0IGlzIGFsc28gdXNlZCB0byB0b2tlbml6ZSBzZWFyY2ggcXVlcmllcywgdW5sZXNzIGEgc3BlY2lmaWNcbiAgICAgKiAgIC8vIGB0b2tlbml6ZWAgc2VhcmNoIG9wdGlvbiBpcyBzdXBwbGllZC4gV2hlbiB0b2tlbml6aW5nIGFuIGluZGV4ZWQgZmllbGQsXG4gICAgICogICAvLyB0aGUgZmllbGQgbmFtZSBpcyBwYXNzZWQgYXMgdGhlIHNlY29uZCBhcmd1bWVudC5cbiAgICAgKiAgIHRva2VuaXplOiAoc3RyaW5nLCBfZmllbGROYW1lKSA9PiBzdHJpbmcuc3BsaXQoU1BBQ0VfT1JfUFVOQ1RVQVRJT04pLFxuICAgICAqXG4gICAgICogICAvLyBwcm9jZXNzVGVybTogZnVuY3Rpb24gdXNlZCB0byBwcm9jZXNzIGVhY2ggdG9rZW5pemVkIHRlcm0gYmVmb3JlXG4gICAgICogICAvLyBpbmRleGluZy4gSXQgY2FuIGJlIHVzZWQgZm9yIHN0ZW1taW5nIGFuZCBub3JtYWxpemF0aW9uLiBSZXR1cm4gYSBmYWxzeVxuICAgICAqICAgLy8gdmFsdWUgaW4gb3JkZXIgdG8gZGlzY2FyZCBhIHRlcm0uIEJ5IGRlZmF1bHQsIGl0IGlzIGFsc28gdXNlZCB0byBwcm9jZXNzXG4gICAgICogICAvLyBzZWFyY2ggcXVlcmllcywgdW5sZXNzIGEgc3BlY2lmaWMgYHByb2Nlc3NUZXJtYCBvcHRpb24gaXMgc3VwcGxpZWQgYXMgYVxuICAgICAqICAgLy8gc2VhcmNoIG9wdGlvbi4gV2hlbiBwcm9jZXNzaW5nIGEgdGVybSBmcm9tIGEgaW5kZXhlZCBmaWVsZCwgdGhlIGZpZWxkXG4gICAgICogICAvLyBuYW1lIGlzIHBhc3NlZCBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50LlxuICAgICAqICAgcHJvY2Vzc1Rlcm06ICh0ZXJtLCBfZmllbGROYW1lKSA9PiB0ZXJtLnRvTG93ZXJDYXNlKCksXG4gICAgICpcbiAgICAgKiAgIC8vIHNlYXJjaE9wdGlvbnM6IGRlZmF1bHQgc2VhcmNoIG9wdGlvbnMsIHNlZSB0aGUgYHNlYXJjaGAgbWV0aG9kIGZvclxuICAgICAqICAgLy8gZGV0YWlsc1xuICAgICAqICAgc2VhcmNoT3B0aW9uczogdW5kZWZpbmVkLFxuICAgICAqXG4gICAgICogICAvLyBmaWVsZHM6IGRvY3VtZW50IGZpZWxkcyB0byBiZSBpbmRleGVkLiBNYW5kYXRvcnksIGJ1dCBub3Qgc2V0IGJ5IGRlZmF1bHRcbiAgICAgKiAgIGZpZWxkczogdW5kZWZpbmVkXG4gICAgICpcbiAgICAgKiAgIC8vIHN0b3JlRmllbGRzOiBkb2N1bWVudCBmaWVsZHMgdG8gYmUgc3RvcmVkIGFuZCByZXR1cm5lZCBhcyBwYXJ0IG9mIHRoZVxuICAgICAqICAgLy8gc2VhcmNoIHJlc3VsdHMuXG4gICAgICogICBzdG9yZUZpZWxkczogW11cbiAgICAgKiB9KVxuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuZmllbGRzKSA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pbmlTZWFyY2g6IG9wdGlvbiBcImZpZWxkc1wiIG11c3QgYmUgcHJvdmlkZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhdXRvVmFjdXVtID0gKG9wdGlvbnMuYXV0b1ZhY3V1bSA9PSBudWxsIHx8IG9wdGlvbnMuYXV0b1ZhY3V1bSA9PT0gdHJ1ZSkgPyBkZWZhdWx0QXV0b1ZhY3V1bU9wdGlvbnMgOiBvcHRpb25zLmF1dG9WYWN1dW07XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSB7XG4gICAgICAgICAgICAuLi5kZWZhdWx0T3B0aW9ucyxcbiAgICAgICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgICAgICBhdXRvVmFjdXVtLFxuICAgICAgICAgICAgc2VhcmNoT3B0aW9uczogeyAuLi5kZWZhdWx0U2VhcmNoT3B0aW9ucywgLi4uKG9wdGlvbnMuc2VhcmNoT3B0aW9ucyB8fCB7fSkgfSxcbiAgICAgICAgICAgIGF1dG9TdWdnZXN0T3B0aW9uczogeyAuLi5kZWZhdWx0QXV0b1N1Z2dlc3RPcHRpb25zLCAuLi4ob3B0aW9ucy5hdXRvU3VnZ2VzdE9wdGlvbnMgfHwge30pIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5faW5kZXggPSBuZXcgU2VhcmNoYWJsZU1hcCgpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudENvdW50ID0gMDtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnRJZHMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuX2lkVG9TaG9ydElkID0gbmV3IE1hcCgpO1xuICAgICAgICAvLyBGaWVsZHMgYXJlIGRlZmluZWQgZHVyaW5nIGluaXRpYWxpemF0aW9uLCBkb24ndCBjaGFuZ2UsIGFyZSBmZXcgaW5cbiAgICAgICAgLy8gbnVtYmVyLCByYXJlbHkgbmVlZCBpdGVyYXRpbmcgb3ZlciwgYW5kIGhhdmUgc3RyaW5nIGtleXMuIFRoZXJlZm9yZSBpblxuICAgICAgICAvLyB0aGlzIGNhc2UgYW4gb2JqZWN0IGlzIGEgYmV0dGVyIGNhbmRpZGF0ZSB0aGFuIGEgTWFwIHRvIHN0b3JlIHRoZSBtYXBwaW5nXG4gICAgICAgIC8vIGZyb20gZmllbGQga2V5IHRvIElELlxuICAgICAgICB0aGlzLl9maWVsZElkcyA9IHt9O1xuICAgICAgICB0aGlzLl9maWVsZExlbmd0aCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5fYXZnRmllbGRMZW5ndGggPSBbXTtcbiAgICAgICAgdGhpcy5fbmV4dElkID0gMDtcbiAgICAgICAgdGhpcy5fc3RvcmVkRmllbGRzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLl9kaXJ0Q291bnQgPSAwO1xuICAgICAgICB0aGlzLl9jdXJyZW50VmFjdXVtID0gbnVsbDtcbiAgICAgICAgdGhpcy5fZW5xdWV1ZWRWYWN1dW0gPSBudWxsO1xuICAgICAgICB0aGlzLl9lbnF1ZXVlZFZhY3V1bUNvbmRpdGlvbnMgPSBkZWZhdWx0VmFjdXVtQ29uZGl0aW9ucztcbiAgICAgICAgdGhpcy5hZGRGaWVsZHModGhpcy5fb3B0aW9ucy5maWVsZHMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgZG9jdW1lbnQgdG8gdGhlIGluZGV4XG4gICAgICpcbiAgICAgKiBAcGFyYW0gZG9jdW1lbnQgIFRoZSBkb2N1bWVudCB0byBiZSBpbmRleGVkXG4gICAgICovXG4gICAgYWRkKGRvY3VtZW50KSB7XG4gICAgICAgIGNvbnN0IHsgZXh0cmFjdEZpZWxkLCB0b2tlbml6ZSwgcHJvY2Vzc1Rlcm0sIGZpZWxkcywgaWRGaWVsZCB9ID0gdGhpcy5fb3B0aW9ucztcbiAgICAgICAgY29uc3QgaWQgPSBleHRyYWN0RmllbGQoZG9jdW1lbnQsIGlkRmllbGQpO1xuICAgICAgICBpZiAoaWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNaW5pU2VhcmNoOiBkb2N1bWVudCBkb2VzIG5vdCBoYXZlIElEIGZpZWxkIFwiJHtpZEZpZWxkfVwiYCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2lkVG9TaG9ydElkLmhhcyhpZCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTWluaVNlYXJjaDogZHVwbGljYXRlIElEICR7aWR9YCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2hvcnREb2N1bWVudElkID0gdGhpcy5hZGREb2N1bWVudElkKGlkKTtcbiAgICAgICAgdGhpcy5zYXZlU3RvcmVkRmllbGRzKHNob3J0RG9jdW1lbnRJZCwgZG9jdW1lbnQpO1xuICAgICAgICBmb3IgKGNvbnN0IGZpZWxkIG9mIGZpZWxkcykge1xuICAgICAgICAgICAgY29uc3QgZmllbGRWYWx1ZSA9IGV4dHJhY3RGaWVsZChkb2N1bWVudCwgZmllbGQpO1xuICAgICAgICAgICAgaWYgKGZpZWxkVmFsdWUgPT0gbnVsbClcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGNvbnN0IHRva2VucyA9IHRva2VuaXplKGZpZWxkVmFsdWUudG9TdHJpbmcoKSwgZmllbGQpO1xuICAgICAgICAgICAgY29uc3QgZmllbGRJZCA9IHRoaXMuX2ZpZWxkSWRzW2ZpZWxkXTtcbiAgICAgICAgICAgIGNvbnN0IHVuaXF1ZVRlcm1zID0gbmV3IFNldCh0b2tlbnMpLnNpemU7XG4gICAgICAgICAgICB0aGlzLmFkZEZpZWxkTGVuZ3RoKHNob3J0RG9jdW1lbnRJZCwgZmllbGRJZCwgdGhpcy5fZG9jdW1lbnRDb3VudCAtIDEsIHVuaXF1ZVRlcm1zKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGVybSBvZiB0b2tlbnMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9jZXNzZWRUZXJtID0gcHJvY2Vzc1Rlcm0odGVybSwgZmllbGQpO1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHByb2Nlc3NlZFRlcm0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgdCBvZiBwcm9jZXNzZWRUZXJtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFRlcm0oZmllbGRJZCwgc2hvcnREb2N1bWVudElkLCB0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChwcm9jZXNzZWRUZXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkVGVybShmaWVsZElkLCBzaG9ydERvY3VtZW50SWQsIHByb2Nlc3NlZFRlcm0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGFsbCB0aGUgZ2l2ZW4gZG9jdW1lbnRzIHRvIHRoZSBpbmRleFxuICAgICAqXG4gICAgICogQHBhcmFtIGRvY3VtZW50cyAgQW4gYXJyYXkgb2YgZG9jdW1lbnRzIHRvIGJlIGluZGV4ZWRcbiAgICAgKi9cbiAgICBhZGRBbGwoZG9jdW1lbnRzKSB7XG4gICAgICAgIGZvciAoY29uc3QgZG9jdW1lbnQgb2YgZG9jdW1lbnRzKVxuICAgICAgICAgICAgdGhpcy5hZGQoZG9jdW1lbnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGFsbCB0aGUgZ2l2ZW4gZG9jdW1lbnRzIHRvIHRoZSBpbmRleCBhc3luY2hyb25vdXNseS5cbiAgICAgKlxuICAgICAqIFJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgKHRvIGB1bmRlZmluZWRgKSB3aGVuIHRoZSBpbmRleGluZyBpcyBkb25lLlxuICAgICAqIFRoaXMgbWV0aG9kIGlzIHVzZWZ1bCB3aGVuIGluZGV4IG1hbnkgZG9jdW1lbnRzLCB0byBhdm9pZCBibG9ja2luZyB0aGUgbWFpblxuICAgICAqIHRocmVhZC4gVGhlIGluZGV4aW5nIGlzIHBlcmZvcm1lZCBhc3luY2hyb25vdXNseSBhbmQgaW4gY2h1bmtzLlxuICAgICAqXG4gICAgICogQHBhcmFtIGRvY3VtZW50cyAgQW4gYXJyYXkgb2YgZG9jdW1lbnRzIHRvIGJlIGluZGV4ZWRcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAgQ29uZmlndXJhdGlvbiBvcHRpb25zXG4gICAgICogQHJldHVybiBBIHByb21pc2UgcmVzb2x2aW5nIHRvIGB1bmRlZmluZWRgIHdoZW4gdGhlIGluZGV4aW5nIGlzIGRvbmVcbiAgICAgKi9cbiAgICBhZGRBbGxBc3luYyhkb2N1bWVudHMsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBjb25zdCB7IGNodW5rU2l6ZSA9IDEwIH0gPSBvcHRpb25zO1xuICAgICAgICBjb25zdCBhY2MgPSB7IGNodW5rOiBbXSwgcHJvbWlzZTogUHJvbWlzZS5yZXNvbHZlKCkgfTtcbiAgICAgICAgY29uc3QgeyBjaHVuaywgcHJvbWlzZSB9ID0gZG9jdW1lbnRzLnJlZHVjZSgoeyBjaHVuaywgcHJvbWlzZSB9LCBkb2N1bWVudCwgaSkgPT4ge1xuICAgICAgICAgICAgY2h1bmsucHVzaChkb2N1bWVudCk7XG4gICAgICAgICAgICBpZiAoKGkgKyAxKSAlIGNodW5rU2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGNodW5rOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZTogcHJvbWlzZVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDApKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuYWRkQWxsKGNodW5rKSlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgY2h1bmssIHByb21pc2UgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgYWNjKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbigoKSA9PiB0aGlzLmFkZEFsbChjaHVuaykpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBnaXZlbiBkb2N1bWVudCBmcm9tIHRoZSBpbmRleC5cbiAgICAgKlxuICAgICAqIFRoZSBkb2N1bWVudCB0byByZW1vdmUgbXVzdCBOT1QgaGF2ZSBjaGFuZ2VkIGJldHdlZW4gaW5kZXhpbmcgYW5kIHJlbW92YWwsXG4gICAgICogb3RoZXJ3aXNlIHRoZSBpbmRleCB3aWxsIGJlIGNvcnJ1cHRlZC5cbiAgICAgKlxuICAgICAqIFRoaXMgbWV0aG9kIHJlcXVpcmVzIHBhc3NpbmcgdGhlIGZ1bGwgZG9jdW1lbnQgdG8gYmUgcmVtb3ZlZCAobm90IGp1c3QgdGhlXG4gICAgICogSUQpLCBhbmQgaW1tZWRpYXRlbHkgcmVtb3ZlcyB0aGUgZG9jdW1lbnQgZnJvbSB0aGUgaW52ZXJ0ZWQgaW5kZXgsIGFsbG93aW5nXG4gICAgICogbWVtb3J5IHRvIGJlIHJlbGVhc2VkLiBBIGNvbnZlbmllbnQgYWx0ZXJuYXRpdmUgaXMge0BsaW5rXG4gICAgICogTWluaVNlYXJjaCNkaXNjYXJkfSwgd2hpY2ggbmVlZHMgb25seSB0aGUgZG9jdW1lbnQgSUQsIGFuZCBoYXMgdGhlIHNhbWVcbiAgICAgKiB2aXNpYmxlIGVmZmVjdCwgYnV0IGRlbGF5cyBjbGVhbmluZyB1cCB0aGUgaW5kZXggdW50aWwgdGhlIG5leHQgdmFjdXVtaW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtIGRvY3VtZW50ICBUaGUgZG9jdW1lbnQgdG8gYmUgcmVtb3ZlZFxuICAgICAqL1xuICAgIHJlbW92ZShkb2N1bWVudCkge1xuICAgICAgICBjb25zdCB7IHRva2VuaXplLCBwcm9jZXNzVGVybSwgZXh0cmFjdEZpZWxkLCBmaWVsZHMsIGlkRmllbGQgfSA9IHRoaXMuX29wdGlvbnM7XG4gICAgICAgIGNvbnN0IGlkID0gZXh0cmFjdEZpZWxkKGRvY3VtZW50LCBpZEZpZWxkKTtcbiAgICAgICAgaWYgKGlkID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTWluaVNlYXJjaDogZG9jdW1lbnQgZG9lcyBub3QgaGF2ZSBJRCBmaWVsZCBcIiR7aWRGaWVsZH1cImApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNob3J0SWQgPSB0aGlzLl9pZFRvU2hvcnRJZC5nZXQoaWQpO1xuICAgICAgICBpZiAoc2hvcnRJZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE1pbmlTZWFyY2g6IGNhbm5vdCByZW1vdmUgZG9jdW1lbnQgd2l0aCBJRCAke2lkfTogaXQgaXMgbm90IGluIHRoZSBpbmRleGApO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgZmllbGQgb2YgZmllbGRzKSB7XG4gICAgICAgICAgICBjb25zdCBmaWVsZFZhbHVlID0gZXh0cmFjdEZpZWxkKGRvY3VtZW50LCBmaWVsZCk7XG4gICAgICAgICAgICBpZiAoZmllbGRWYWx1ZSA9PSBudWxsKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgY29uc3QgdG9rZW5zID0gdG9rZW5pemUoZmllbGRWYWx1ZS50b1N0cmluZygpLCBmaWVsZCk7XG4gICAgICAgICAgICBjb25zdCBmaWVsZElkID0gdGhpcy5fZmllbGRJZHNbZmllbGRdO1xuICAgICAgICAgICAgY29uc3QgdW5pcXVlVGVybXMgPSBuZXcgU2V0KHRva2Vucykuc2l6ZTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRmllbGRMZW5ndGgoc2hvcnRJZCwgZmllbGRJZCwgdGhpcy5fZG9jdW1lbnRDb3VudCwgdW5pcXVlVGVybXMpO1xuICAgICAgICAgICAgZm9yIChjb25zdCB0ZXJtIG9mIHRva2Vucykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2Nlc3NlZFRlcm0gPSBwcm9jZXNzVGVybSh0ZXJtLCBmaWVsZCk7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJvY2Vzc2VkVGVybSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCB0IG9mIHByb2Nlc3NlZFRlcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlVGVybShmaWVsZElkLCBzaG9ydElkLCB0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChwcm9jZXNzZWRUZXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlVGVybShmaWVsZElkLCBzaG9ydElkLCBwcm9jZXNzZWRUZXJtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3RvcmVkRmllbGRzLmRlbGV0ZShzaG9ydElkKTtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnRJZHMuZGVsZXRlKHNob3J0SWQpO1xuICAgICAgICB0aGlzLl9pZFRvU2hvcnRJZC5kZWxldGUoaWQpO1xuICAgICAgICB0aGlzLl9maWVsZExlbmd0aC5kZWxldGUoc2hvcnRJZCk7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50Q291bnQgLT0gMTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwgdGhlIGdpdmVuIGRvY3VtZW50cyBmcm9tIHRoZSBpbmRleC4gSWYgY2FsbGVkIHdpdGggbm8gYXJndW1lbnRzLFxuICAgICAqIGl0IHJlbW92ZXMgX2FsbF8gZG9jdW1lbnRzIGZyb20gdGhlIGluZGV4LlxuICAgICAqXG4gICAgICogQHBhcmFtIGRvY3VtZW50cyAgVGhlIGRvY3VtZW50cyB0byBiZSByZW1vdmVkLiBJZiB0aGlzIGFyZ3VtZW50IGlzIG9taXR0ZWQsXG4gICAgICogYWxsIGRvY3VtZW50cyBhcmUgcmVtb3ZlZC4gTm90ZSB0aGF0LCBmb3IgcmVtb3ZpbmcgYWxsIGRvY3VtZW50cywgaXQgaXNcbiAgICAgKiBtb3JlIGVmZmljaWVudCB0byBjYWxsIHRoaXMgbWV0aG9kIHdpdGggbm8gYXJndW1lbnRzIHRoYW4gdG8gcGFzcyBhbGxcbiAgICAgKiBkb2N1bWVudHMuXG4gICAgICovXG4gICAgcmVtb3ZlQWxsKGRvY3VtZW50cykge1xuICAgICAgICBpZiAoZG9jdW1lbnRzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGRvY3VtZW50IG9mIGRvY3VtZW50cylcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZShkb2N1bWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgZG9jdW1lbnRzIHRvIGJlIHByZXNlbnQuIE9taXQgdGhlIGFyZ3VtZW50IHRvIHJlbW92ZSBhbGwgZG9jdW1lbnRzLicpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5faW5kZXggPSBuZXcgU2VhcmNoYWJsZU1hcCgpO1xuICAgICAgICAgICAgdGhpcy5fZG9jdW1lbnRDb3VudCA9IDA7XG4gICAgICAgICAgICB0aGlzLl9kb2N1bWVudElkcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgIHRoaXMuX2lkVG9TaG9ydElkID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgdGhpcy5fZmllbGRMZW5ndGggPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICB0aGlzLl9hdmdGaWVsZExlbmd0aCA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fc3RvcmVkRmllbGRzID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgdGhpcy5fbmV4dElkID0gMDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNjYXJkcyB0aGUgZG9jdW1lbnQgd2l0aCB0aGUgZ2l2ZW4gSUQsIHNvIGl0IHdvbid0IGFwcGVhciBpbiBzZWFyY2ggcmVzdWx0c1xuICAgICAqXG4gICAgICogSXQgaGFzIHRoZSBzYW1lIHZpc2libGUgZWZmZWN0IG9mIHtAbGluayBNaW5pU2VhcmNoLnJlbW92ZX0gKGJvdGggY2F1c2UgdGhlXG4gICAgICogZG9jdW1lbnQgdG8gc3RvcCBhcHBlYXJpbmcgaW4gc2VhcmNoZXMpLCBidXQgYSBkaWZmZXJlbnQgZWZmZWN0IG9uIHRoZVxuICAgICAqIGludGVybmFsIGRhdGEgc3RydWN0dXJlczpcbiAgICAgKlxuICAgICAqICAgLSB7QGxpbmsgTWluaVNlYXJjaCNyZW1vdmV9IHJlcXVpcmVzIHBhc3NpbmcgdGhlIGZ1bGwgZG9jdW1lbnQgdG8gYmVcbiAgICAgKiAgIHJlbW92ZWQgYXMgYXJndW1lbnQsIGFuZCByZW1vdmVzIGl0IGZyb20gdGhlIGludmVydGVkIGluZGV4IGltbWVkaWF0ZWx5LlxuICAgICAqXG4gICAgICogICAtIHtAbGluayBNaW5pU2VhcmNoI2Rpc2NhcmR9IGluc3RlYWQgb25seSBuZWVkcyB0aGUgZG9jdW1lbnQgSUQsIGFuZFxuICAgICAqICAgd29ya3MgYnkgbWFya2luZyB0aGUgY3VycmVudCB2ZXJzaW9uIG9mIHRoZSBkb2N1bWVudCBhcyBkaXNjYXJkZWQsIHNvIGl0XG4gICAgICogICBpcyBpbW1lZGlhdGVseSBpZ25vcmVkIGJ5IHNlYXJjaGVzLiBUaGlzIGlzIGZhc3RlciBhbmQgbW9yZSBjb252ZW5pZW50XG4gICAgICogICB0aGFuIHtAbGluayBNaW5pU2VhcmNoI3JlbW92ZX0sIGJ1dCB0aGUgaW5kZXggaXMgbm90IGltbWVkaWF0ZWx5XG4gICAgICogICBtb2RpZmllZC4gVG8gdGFrZSBjYXJlIG9mIHRoYXQsIHZhY3V1bWluZyBpcyBwZXJmb3JtZWQgYWZ0ZXIgYSBjZXJ0YWluXG4gICAgICogICBudW1iZXIgb2YgZG9jdW1lbnRzIGFyZSBkaXNjYXJkZWQsIGNsZWFuaW5nIHVwIHRoZSBpbmRleCBhbmQgYWxsb3dpbmdcbiAgICAgKiAgIG1lbW9yeSB0byBiZSByZWxlYXNlZC5cbiAgICAgKlxuICAgICAqIEFmdGVyIGRpc2NhcmRpbmcgYSBkb2N1bWVudCwgaXQgaXMgcG9zc2libGUgdG8gcmUtYWRkIGEgbmV3IHZlcnNpb24sIGFuZFxuICAgICAqIG9ubHkgdGhlIG5ldyB2ZXJzaW9uIHdpbGwgYXBwZWFyIGluIHNlYXJjaGVzLiBJbiBvdGhlciB3b3JkcywgZGlzY2FyZGluZ1xuICAgICAqIGFuZCByZS1hZGRpbmcgYSBkb2N1bWVudCB3b3JrcyBleGFjdGx5IGxpa2UgcmVtb3ZpbmcgYW5kIHJlLWFkZGluZyBpdC4gVGhlXG4gICAgICoge0BsaW5rIE1pbmlTZWFyY2gucmVwbGFjZX0gbWV0aG9kIGNhbiBhbHNvIGJlIHVzZWQgdG8gcmVwbGFjZSBhIGRvY3VtZW50XG4gICAgICogd2l0aCBhIG5ldyB2ZXJzaW9uLlxuICAgICAqXG4gICAgICogIyMjIyBEZXRhaWxzIGFib3V0IHZhY3V1bWluZ1xuICAgICAqXG4gICAgICogUmVwZXRpdGUgY2FsbHMgdG8gdGhpcyBtZXRob2Qgd291bGQgbGVhdmUgb2Jzb2xldGUgZG9jdW1lbnQgcmVmZXJlbmNlcyBpblxuICAgICAqIHRoZSBpbmRleCwgaW52aXNpYmxlIHRvIHNlYXJjaGVzLiBUd28gbWVjaGFuaXNtcyB0YWtlIGNhcmUgb2YgY2xlYW5pbmcgdXA6XG4gICAgICogY2xlYW4gdXAgZHVyaW5nIHNlYXJjaCwgYW5kIHZhY3V1bWluZy5cbiAgICAgKlxuICAgICAqICAgLSBVcG9uIHNlYXJjaCwgd2hlbmV2ZXIgYSBkaXNjYXJkZWQgSUQgaXMgZm91bmQgKGFuZCBpZ25vcmVkIGZvciB0aGVcbiAgICAgKiAgIHJlc3VsdHMpLCByZWZlcmVuY2VzIHRvIHRoZSBkaXNjYXJkZWQgZG9jdW1lbnQgYXJlIHJlbW92ZWQgZnJvbSB0aGVcbiAgICAgKiAgIGludmVydGVkIGluZGV4IGVudHJpZXMgZm9yIHRoZSBzZWFyY2ggdGVybXMuIFRoaXMgZW5zdXJlcyB0aGF0IHN1YnNlcXVlbnRcbiAgICAgKiAgIHNlYXJjaGVzIGZvciB0aGUgc2FtZSB0ZXJtcyBkbyBub3QgbmVlZCB0byBza2lwIHRoZXNlIG9ic29sZXRlIHJlZmVyZW5jZXNcbiAgICAgKiAgIGFnYWluLlxuICAgICAqXG4gICAgICogICAtIEluIGFkZGl0aW9uLCB2YWN1dW1pbmcgaXMgcGVyZm9ybWVkIGF1dG9tYXRpY2FsbHkgYnkgZGVmYXVsdCAoc2VlIHRoZVxuICAgICAqICAgYGF1dG9WYWN1dW1gIGZpZWxkIGluIHtAbGluayBPcHRpb25zfSkgYWZ0ZXIgYSBjZXJ0YWluIG51bWJlciBvZlxuICAgICAqICAgZG9jdW1lbnRzIGFyZSBkaXNjYXJkZWQuIFZhY3V1bWluZyB0cmF2ZXJzZXMgYWxsIHRlcm1zIGluIHRoZSBpbmRleCxcbiAgICAgKiAgIGNsZWFuaW5nIHVwIGFsbCByZWZlcmVuY2VzIHRvIGRpc2NhcmRlZCBkb2N1bWVudHMuIFZhY3V1bWluZyBjYW4gYWxzbyBiZVxuICAgICAqICAgdHJpZ2dlcmVkIG1hbnVhbGx5IGJ5IGNhbGxpbmcge0BsaW5rIE1pbmlTZWFyY2gjdmFjdXVtfS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpZCAgVGhlIElEIG9mIHRoZSBkb2N1bWVudCB0byBiZSBkaXNjYXJkZWRcbiAgICAgKi9cbiAgICBkaXNjYXJkKGlkKSB7XG4gICAgICAgIGNvbnN0IHNob3J0SWQgPSB0aGlzLl9pZFRvU2hvcnRJZC5nZXQoaWQpO1xuICAgICAgICBpZiAoc2hvcnRJZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE1pbmlTZWFyY2g6IGNhbm5vdCBkaXNjYXJkIGRvY3VtZW50IHdpdGggSUQgJHtpZH06IGl0IGlzIG5vdCBpbiB0aGUgaW5kZXhgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pZFRvU2hvcnRJZC5kZWxldGUoaWQpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudElkcy5kZWxldGUoc2hvcnRJZCk7XG4gICAgICAgIHRoaXMuX3N0b3JlZEZpZWxkcy5kZWxldGUoc2hvcnRJZCk7XG4gICAgICAgICh0aGlzLl9maWVsZExlbmd0aC5nZXQoc2hvcnRJZCkgfHwgW10pLmZvckVhY2goKGZpZWxkTGVuZ3RoLCBmaWVsZElkKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUZpZWxkTGVuZ3RoKHNob3J0SWQsIGZpZWxkSWQsIHRoaXMuX2RvY3VtZW50Q291bnQsIGZpZWxkTGVuZ3RoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2ZpZWxkTGVuZ3RoLmRlbGV0ZShzaG9ydElkKTtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnRDb3VudCAtPSAxO1xuICAgICAgICB0aGlzLl9kaXJ0Q291bnQgKz0gMTtcbiAgICAgICAgdGhpcy5tYXliZUF1dG9WYWN1dW0oKTtcbiAgICB9XG4gICAgbWF5YmVBdXRvVmFjdXVtKCkge1xuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5hdXRvVmFjdXVtID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgbWluRGlydEZhY3RvciwgbWluRGlydENvdW50LCBiYXRjaFNpemUsIGJhdGNoV2FpdCB9ID0gdGhpcy5fb3B0aW9ucy5hdXRvVmFjdXVtO1xuICAgICAgICB0aGlzLmNvbmRpdGlvbmFsVmFjdXVtKHsgYmF0Y2hTaXplLCBiYXRjaFdhaXQgfSwgeyBtaW5EaXJ0Q291bnQsIG1pbkRpcnRGYWN0b3IgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc2NhcmRzIHRoZSBkb2N1bWVudHMgd2l0aCB0aGUgZ2l2ZW4gSURzLCBzbyB0aGV5IHdvbid0IGFwcGVhciBpbiBzZWFyY2hcbiAgICAgKiByZXN1bHRzXG4gICAgICpcbiAgICAgKiBJdCBpcyBlcXVpdmFsZW50IHRvIGNhbGxpbmcge0BsaW5rIE1pbmlTZWFyY2gjZGlzY2FyZH0gZm9yIGFsbCB0aGUgZ2l2ZW5cbiAgICAgKiBJRHMsIGJ1dCB3aXRoIHRoZSBvcHRpbWl6YXRpb24gb2YgdHJpZ2dlcmluZyBhdCBtb3N0IG9uZSBhdXRvbWF0aWNcbiAgICAgKiB2YWN1dW1pbmcgYXQgdGhlIGVuZC5cbiAgICAgKlxuICAgICAqIE5vdGU6IHRvIHJlbW92ZSBhbGwgZG9jdW1lbnRzIGZyb20gdGhlIGluZGV4LCBpdCBpcyBmYXN0ZXIgYW5kIG1vcmVcbiAgICAgKiBjb252ZW5pZW50IHRvIGNhbGwge0BsaW5rIE1pbmlTZWFyY2gucmVtb3ZlQWxsfSB3aXRoIG5vIGFyZ3VtZW50LCBpbnN0ZWFkXG4gICAgICogb2YgcGFzc2luZyBhbGwgSURzIHRvIHRoaXMgbWV0aG9kLlxuICAgICAqL1xuICAgIGRpc2NhcmRBbGwoaWRzKSB7XG4gICAgICAgIGNvbnN0IGF1dG9WYWN1dW0gPSB0aGlzLl9vcHRpb25zLmF1dG9WYWN1dW07XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLmF1dG9WYWN1dW0gPSBmYWxzZTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgaWQgb2YgaWRzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNjYXJkKGlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuYXV0b1ZhY3V1bSA9IGF1dG9WYWN1dW07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tYXliZUF1dG9WYWN1dW0oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSXQgcmVwbGFjZXMgYW4gZXhpc3RpbmcgZG9jdW1lbnQgd2l0aCB0aGUgZ2l2ZW4gdXBkYXRlZCB2ZXJzaW9uXG4gICAgICpcbiAgICAgKiBJdCB3b3JrcyBieSBkaXNjYXJkaW5nIHRoZSBjdXJyZW50IHZlcnNpb24gYW5kIGFkZGluZyB0aGUgdXBkYXRlZCBvbmUsIHNvXG4gICAgICogaXQgaXMgZnVuY3Rpb25hbGx5IGVxdWl2YWxlbnQgdG8gY2FsbGluZyB7QGxpbmsgTWluaVNlYXJjaCNkaXNjYXJkfVxuICAgICAqIGZvbGxvd2VkIGJ5IHtAbGluayBNaW5pU2VhcmNoI2FkZH0uIFRoZSBJRCBvZiB0aGUgdXBkYXRlZCBkb2N1bWVudCBzaG91bGRcbiAgICAgKiBiZSB0aGUgc2FtZSBhcyB0aGUgb3JpZ2luYWwgb25lLlxuICAgICAqXG4gICAgICogU2luY2UgaXQgdXNlcyB7QGxpbmsgTWluaVNlYXJjaCNkaXNjYXJkfSBpbnRlcm5hbGx5LCB0aGlzIG1ldGhvZCByZWxpZXMgb25cbiAgICAgKiB2YWN1dW1pbmcgdG8gY2xlYW4gdXAgb2Jzb2xldGUgZG9jdW1lbnQgcmVmZXJlbmNlcyBmcm9tIHRoZSBpbmRleCwgYWxsb3dpbmdcbiAgICAgKiBtZW1vcnkgdG8gYmUgcmVsZWFzZWQgKHNlZSB7QGxpbmsgTWluaVNlYXJjaCNkaXNjYXJkfSkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdXBkYXRlZERvY3VtZW50ICBUaGUgdXBkYXRlZCBkb2N1bWVudCB0byByZXBsYWNlIHRoZSBvbGQgdmVyc2lvblxuICAgICAqIHdpdGhcbiAgICAgKi9cbiAgICByZXBsYWNlKHVwZGF0ZWREb2N1bWVudCkge1xuICAgICAgICBjb25zdCB7IGlkRmllbGQsIGV4dHJhY3RGaWVsZCB9ID0gdGhpcy5fb3B0aW9ucztcbiAgICAgICAgY29uc3QgaWQgPSBleHRyYWN0RmllbGQodXBkYXRlZERvY3VtZW50LCBpZEZpZWxkKTtcbiAgICAgICAgdGhpcy5kaXNjYXJkKGlkKTtcbiAgICAgICAgdGhpcy5hZGQodXBkYXRlZERvY3VtZW50KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVHJpZ2dlcnMgYSBtYW51YWwgdmFjdXVtaW5nLCBjbGVhbmluZyB1cCByZWZlcmVuY2VzIHRvIGRpc2NhcmRlZCBkb2N1bWVudHNcbiAgICAgKiBmcm9tIHRoZSBpbnZlcnRlZCBpbmRleFxuICAgICAqXG4gICAgICogVmFjdXVtaW5nIGlzIG9ubHkgdXNlZnVsIGZvciBhcHBsaWNhdGlvbnMgdGhhdCB1c2UgdGhlIHtAbGlua1xuICAgICAqIE1pbmlTZWFyY2gjZGlzY2FyZH0gb3Ige0BsaW5rIE1pbmlTZWFyY2gjcmVwbGFjZX0gbWV0aG9kcy5cbiAgICAgKlxuICAgICAqIEJ5IGRlZmF1bHQsIHZhY3V1bWluZyBpcyBwZXJmb3JtZWQgYXV0b21hdGljYWxseSB3aGVuIG5lZWRlZCAoY29udHJvbGxlZCBieVxuICAgICAqIHRoZSBgYXV0b1ZhY3V1bWAgZmllbGQgaW4ge0BsaW5rIE9wdGlvbnN9KSwgc28gdGhlcmUgaXMgdXN1YWxseSBubyBuZWVkIHRvXG4gICAgICogY2FsbCB0aGlzIG1ldGhvZCwgdW5sZXNzIG9uZSB3YW50cyB0byBtYWtlIHN1cmUgdG8gcGVyZm9ybSB2YWN1dW1pbmcgYXQgYVxuICAgICAqIHNwZWNpZmljIG1vbWVudC5cbiAgICAgKlxuICAgICAqIFZhY3V1bWluZyB0cmF2ZXJzZXMgYWxsIHRlcm1zIGluIHRoZSBpbnZlcnRlZCBpbmRleCBpbiBiYXRjaGVzLCBhbmQgY2xlYW5zXG4gICAgICogdXAgcmVmZXJlbmNlcyB0byBkaXNjYXJkZWQgZG9jdW1lbnRzIGZyb20gdGhlIHBvc3RpbmcgbGlzdCwgYWxsb3dpbmcgbWVtb3J5XG4gICAgICogdG8gYmUgcmVsZWFzZWQuXG4gICAgICpcbiAgICAgKiBUaGUgbWV0aG9kIHRha2VzIGFuIG9wdGlvbmFsIG9iamVjdCBhcyBhcmd1bWVudCB3aXRoIHRoZSBmb2xsb3dpbmcga2V5czpcbiAgICAgKlxuICAgICAqICAgLSBgYmF0Y2hTaXplYDogdGhlIHNpemUgb2YgZWFjaCBiYXRjaCAoMTAwMCBieSBkZWZhdWx0KVxuICAgICAqXG4gICAgICogICAtIGBiYXRjaFdhaXRgOiB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byB3YWl0IGJldHdlZW4gYmF0Y2hlcyAoMTAgYnlcbiAgICAgKiAgIGRlZmF1bHQpXG4gICAgICpcbiAgICAgKiBPbiBsYXJnZSBpbmRleGVzLCB2YWN1dW1pbmcgY291bGQgaGF2ZSBhIG5vbi1uZWdsaWdpYmxlIGNvc3Q6IGJhdGNoaW5nXG4gICAgICogYXZvaWRzIGJsb2NraW5nIHRoZSB0aHJlYWQgZm9yIGxvbmcsIGRpbHV0aW5nIHRoaXMgY29zdCBzbyB0aGF0IGl0IGlzIG5vdFxuICAgICAqIG5lZ2F0aXZlbHkgYWZmZWN0aW5nIHRoZSBhcHBsaWNhdGlvbi4gTm9uZXRoZWxlc3MsIHRoaXMgbWV0aG9kIHNob3VsZCBvbmx5XG4gICAgICogYmUgY2FsbGVkIHdoZW4gbmVjZXNzYXJ5LCBhbmQgcmVseWluZyBvbiBhdXRvbWF0aWMgdmFjdXVtaW5nIGlzIHVzdWFsbHlcbiAgICAgKiBiZXR0ZXIuXG4gICAgICpcbiAgICAgKiBJdCByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzICh0byB1bmRlZmluZWQpIHdoZW4gdGhlIGNsZWFuIHVwIGlzXG4gICAgICogY29tcGxldGVkLiBJZiB2YWN1dW1pbmcgaXMgYWxyZWFkeSBvbmdvaW5nIGF0IHRoZSB0aW1lIHRoaXMgbWV0aG9kIGlzXG4gICAgICogY2FsbGVkLCBhIG5ldyBvbmUgaXMgZW5xdWV1ZWQgaW1tZWRpYXRlbHkgYWZ0ZXIgdGhlIG9uZ29pbmcgb25lLCBhbmQgYVxuICAgICAqIGNvcnJlc3BvbmRpbmcgcHJvbWlzZSBpcyByZXR1cm5lZC4gSG93ZXZlciwgbm8gbW9yZSB0aGFuIG9uZSB2YWN1dW1pbmcgaXNcbiAgICAgKiBlbnF1ZXVlZCBvbiB0b3Agb2YgdGhlIG9uZ29pbmcgb25lLCBldmVuIGlmIHRoaXMgbWV0aG9kIGlzIGNhbGxlZCBtb3JlXG4gICAgICogdGltZXMgKGVucXVldWluZyBtdWx0aXBsZSBvbmVzIHdvdWxkIGJlIHVzZWxlc3MpLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgIENvbmZpZ3VyYXRpb24gb3B0aW9ucyBmb3IgdGhlIGJhdGNoIHNpemUgYW5kIGRlbGF5LiBTZWVcbiAgICAgKiB7QGxpbmsgVmFjdXVtT3B0aW9uc30uXG4gICAgICovXG4gICAgdmFjdXVtKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25kaXRpb25hbFZhY3V1bShvcHRpb25zKTtcbiAgICB9XG4gICAgY29uZGl0aW9uYWxWYWN1dW0ob3B0aW9ucywgY29uZGl0aW9ucykge1xuICAgICAgICAvLyBJZiBhIHZhY3V1bSBpcyBhbHJlYWR5IG9uZ29pbmcsIHNjaGVkdWxlIGFub3RoZXIgYXMgc29vbiBhcyBpdCBmaW5pc2hlcyxcbiAgICAgICAgLy8gdW5sZXNzIHRoZXJlJ3MgYWxyZWFkeSBvbmUgZW5xdWV1ZWQuIElmIG9uZSB3YXMgYWxyZWFkeSBlbnF1ZXVlZCwgZG8gbm90XG4gICAgICAgIC8vIGVucXVldWUgYW5vdGhlciBvbiB0b3AsIGJ1dCBtYWtlIHN1cmUgdGhhdCB0aGUgY29uZGl0aW9ucyBhcmUgdGhlXG4gICAgICAgIC8vIGJyb2FkZXN0LlxuICAgICAgICBpZiAodGhpcy5fY3VycmVudFZhY3V1bSkge1xuICAgICAgICAgICAgdGhpcy5fZW5xdWV1ZWRWYWN1dW1Db25kaXRpb25zID0gdGhpcy5fZW5xdWV1ZWRWYWN1dW1Db25kaXRpb25zICYmIGNvbmRpdGlvbnM7XG4gICAgICAgICAgICBpZiAodGhpcy5fZW5xdWV1ZWRWYWN1dW0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbnF1ZXVlZFZhY3V1bTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2VucXVldWVkVmFjdXVtID0gdGhpcy5fY3VycmVudFZhY3V1bS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb25kaXRpb25zID0gdGhpcy5fZW5xdWV1ZWRWYWN1dW1Db25kaXRpb25zO1xuICAgICAgICAgICAgICAgIHRoaXMuX2VucXVldWVkVmFjdXVtQ29uZGl0aW9ucyA9IGRlZmF1bHRWYWN1dW1Db25kaXRpb25zO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBlcmZvcm1WYWN1dW1pbmcob3B0aW9ucywgY29uZGl0aW9ucyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbnF1ZXVlZFZhY3V1bTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy52YWN1dW1Db25kaXRpb25zTWV0KGNvbmRpdGlvbnMpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2N1cnJlbnRWYWN1dW0gPSB0aGlzLnBlcmZvcm1WYWN1dW1pbmcob3B0aW9ucyk7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50VmFjdXVtO1xuICAgIH1cbiAgICBhc3luYyBwZXJmb3JtVmFjdXVtaW5nKG9wdGlvbnMsIGNvbmRpdGlvbnMpIHtcbiAgICAgICAgY29uc3QgaW5pdGlhbERpcnRDb3VudCA9IHRoaXMuX2RpcnRDb3VudDtcbiAgICAgICAgaWYgKHRoaXMudmFjdXVtQ29uZGl0aW9uc01ldChjb25kaXRpb25zKSkge1xuICAgICAgICAgICAgY29uc3QgYmF0Y2hTaXplID0gb3B0aW9ucy5iYXRjaFNpemUgfHwgZGVmYXVsdFZhY3V1bU9wdGlvbnMuYmF0Y2hTaXplO1xuICAgICAgICAgICAgY29uc3QgYmF0Y2hXYWl0ID0gb3B0aW9ucy5iYXRjaFdhaXQgfHwgZGVmYXVsdFZhY3V1bU9wdGlvbnMuYmF0Y2hXYWl0O1xuICAgICAgICAgICAgbGV0IGkgPSAxO1xuICAgICAgICAgICAgZm9yIChjb25zdCBbdGVybSwgZmllbGRzRGF0YV0gb2YgdGhpcy5faW5kZXgpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IFtmaWVsZElkLCBmaWVsZEluZGV4XSBvZiBmaWVsZHNEYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgW3Nob3J0SWRdIG9mIGZpZWxkSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kb2N1bWVudElkcy5oYXMoc2hvcnRJZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWVsZEluZGV4LnNpemUgPD0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkc0RhdGEuZGVsZXRlKGZpZWxkSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRJbmRleC5kZWxldGUoc2hvcnRJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2luZGV4LmdldCh0ZXJtKS5zaXplID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luZGV4LmRlbGV0ZSh0ZXJtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGkgJSBiYXRjaFNpemUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgYmF0Y2hXYWl0KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2RpcnRDb3VudCAtPSBpbml0aWFsRGlydENvdW50O1xuICAgICAgICB9XG4gICAgICAgIC8vIE1ha2UgdGhlIG5leHQgbGluZXMgYWx3YXlzIGFzeW5jLCBzbyB0aGV5IGV4ZWN1dGUgYWZ0ZXIgdGhpcyBmdW5jdGlvbiByZXR1cm5zXG4gICAgICAgIGF3YWl0IG51bGw7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRWYWN1dW0gPSB0aGlzLl9lbnF1ZXVlZFZhY3V1bTtcbiAgICAgICAgdGhpcy5fZW5xdWV1ZWRWYWN1dW0gPSBudWxsO1xuICAgIH1cbiAgICB2YWN1dW1Db25kaXRpb25zTWV0KGNvbmRpdGlvbnMpIHtcbiAgICAgICAgaWYgKGNvbmRpdGlvbnMgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHsgbWluRGlydENvdW50LCBtaW5EaXJ0RmFjdG9yIH0gPSBjb25kaXRpb25zO1xuICAgICAgICBtaW5EaXJ0Q291bnQgPSBtaW5EaXJ0Q291bnQgfHwgZGVmYXVsdEF1dG9WYWN1dW1PcHRpb25zLm1pbkRpcnRDb3VudDtcbiAgICAgICAgbWluRGlydEZhY3RvciA9IG1pbkRpcnRGYWN0b3IgfHwgZGVmYXVsdEF1dG9WYWN1dW1PcHRpb25zLm1pbkRpcnRGYWN0b3I7XG4gICAgICAgIHJldHVybiB0aGlzLmRpcnRDb3VudCA+PSBtaW5EaXJ0Q291bnQgJiYgdGhpcy5kaXJ0RmFjdG9yID49IG1pbkRpcnRGYWN0b3I7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIElzIGB0cnVlYCBpZiBhIHZhY3V1bWluZyBvcGVyYXRpb24gaXMgb25nb2luZywgYGZhbHNlYCBvdGhlcndpc2VcbiAgICAgKi9cbiAgICBnZXQgaXNWYWN1dW1pbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50VmFjdXVtICE9IG51bGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBudW1iZXIgb2YgZG9jdW1lbnRzIGRpc2NhcmRlZCBzaW5jZSB0aGUgbW9zdCByZWNlbnQgdmFjdXVtaW5nXG4gICAgICovXG4gICAgZ2V0IGRpcnRDb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RpcnRDb3VudDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBudW1iZXIgYmV0d2VlbiAwIGFuZCAxIGdpdmluZyBhbiBpbmRpY2F0aW9uIGFib3V0IHRoZSBwcm9wb3J0aW9uIG9mXG4gICAgICogZG9jdW1lbnRzIHRoYXQgYXJlIGRpc2NhcmRlZCwgYW5kIGNhbiB0aGVyZWZvcmUgYmUgY2xlYW5lZCB1cCBieSB2YWN1dW1pbmcuXG4gICAgICogQSB2YWx1ZSBjbG9zZSB0byAwIG1lYW5zIHRoYXQgdGhlIGluZGV4IGlzIHJlbGF0aXZlbHkgY2xlYW4sIHdoaWxlIGEgaGlnaGVyXG4gICAgICogdmFsdWUgbWVhbnMgdGhhdCB0aGUgaW5kZXggaXMgcmVsYXRpdmVseSBkaXJ0eSwgYW5kIHZhY3V1bWluZyBjb3VsZCByZWxlYXNlXG4gICAgICogbWVtb3J5LlxuICAgICAqL1xuICAgIGdldCBkaXJ0RmFjdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlydENvdW50IC8gKDEgKyB0aGlzLl9kb2N1bWVudENvdW50ICsgdGhpcy5fZGlydENvdW50KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgYSBkb2N1bWVudCB3aXRoIHRoZSBnaXZlbiBJRCBpcyBwcmVzZW50IGluIHRoZSBpbmRleCBhbmRcbiAgICAgKiBhdmFpbGFibGUgZm9yIHNlYXJjaCwgYGZhbHNlYCBvdGhlcndpc2VcbiAgICAgKlxuICAgICAqIEBwYXJhbSBpZCAgVGhlIGRvY3VtZW50IElEXG4gICAgICovXG4gICAgaGFzKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZFRvU2hvcnRJZC5oYXMoaWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBzdG9yZWQgZmllbGRzIChhcyBjb25maWd1cmVkIGluIHRoZSBgc3RvcmVGaWVsZHNgIGNvbnN0cnVjdG9yXG4gICAgICogb3B0aW9uKSBmb3IgdGhlIGdpdmVuIGRvY3VtZW50IElELiBSZXR1cm5zIGB1bmRlZmluZWRgIGlmIHRoZSBkb2N1bWVudCBpc1xuICAgICAqIG5vdCBwcmVzZW50IGluIHRoZSBpbmRleC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpZCAgVGhlIGRvY3VtZW50IElEXG4gICAgICovXG4gICAgZ2V0U3RvcmVkRmllbGRzKGlkKSB7XG4gICAgICAgIGNvbnN0IHNob3J0SWQgPSB0aGlzLl9pZFRvU2hvcnRJZC5nZXQoaWQpO1xuICAgICAgICBpZiAoc2hvcnRJZCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9zdG9yZWRGaWVsZHMuZ2V0KHNob3J0SWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZWFyY2ggZm9yIGRvY3VtZW50cyBtYXRjaGluZyB0aGUgZ2l2ZW4gc2VhcmNoIHF1ZXJ5LlxuICAgICAqXG4gICAgICogVGhlIHJlc3VsdCBpcyBhIGxpc3Qgb2Ygc2NvcmVkIGRvY3VtZW50IElEcyBtYXRjaGluZyB0aGUgcXVlcnksIHNvcnRlZCBieVxuICAgICAqIGRlc2NlbmRpbmcgc2NvcmUsIGFuZCBlYWNoIGluY2x1ZGluZyBkYXRhIGFib3V0IHdoaWNoIHRlcm1zIHdlcmUgbWF0Y2hlZCBhbmRcbiAgICAgKiBpbiB3aGljaCBmaWVsZHMuXG4gICAgICpcbiAgICAgKiAjIyMgQmFzaWMgdXNhZ2U6XG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogLy8gU2VhcmNoIGZvciBcInplbiBhcnQgbW90b3JjeWNsZVwiIHdpdGggZGVmYXVsdCBvcHRpb25zOiB0ZXJtcyBoYXZlIHRvIG1hdGNoXG4gICAgICogLy8gZXhhY3RseSwgYW5kIGluZGl2aWR1YWwgdGVybXMgYXJlIGpvaW5lZCB3aXRoIE9SXG4gICAgICogbWluaVNlYXJjaC5zZWFyY2goJ3plbiBhcnQgbW90b3JjeWNsZScpXG4gICAgICogLy8gPT4gWyB7IGlkOiAyLCBzY29yZTogMi43NzI1OCwgbWF0Y2g6IHsgLi4uIH0gfSwgeyBpZDogNCwgc2NvcmU6IDEuMzg2MjksIG1hdGNoOiB7IC4uLiB9IH0gXVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogIyMjIFJlc3RyaWN0IHNlYXJjaCB0byBzcGVjaWZpYyBmaWVsZHM6XG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogLy8gU2VhcmNoIG9ubHkgaW4gdGhlICd0aXRsZScgZmllbGRcbiAgICAgKiBtaW5pU2VhcmNoLnNlYXJjaCgnemVuJywgeyBmaWVsZHM6IFsndGl0bGUnXSB9KVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogIyMjIEZpZWxkIGJvb3N0aW5nOlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIC8vIEJvb3N0IGEgZmllbGRcbiAgICAgKiBtaW5pU2VhcmNoLnNlYXJjaCgnemVuJywgeyBib29zdDogeyB0aXRsZTogMiB9IH0pXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiAjIyMgUHJlZml4IHNlYXJjaDpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiAvLyBTZWFyY2ggZm9yIFwibW90b1wiIHdpdGggcHJlZml4IHNlYXJjaCAoaXQgd2lsbCBtYXRjaCBkb2N1bWVudHNcbiAgICAgKiAvLyBjb250YWluaW5nIHRlcm1zIHRoYXQgc3RhcnQgd2l0aCBcIm1vdG9cIiBvciBcIm5ldXJvXCIpXG4gICAgICogbWluaVNlYXJjaC5zZWFyY2goJ21vdG8gbmV1cm8nLCB7IHByZWZpeDogdHJ1ZSB9KVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogIyMjIEZ1enp5IHNlYXJjaDpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiAvLyBTZWFyY2ggZm9yIFwiaXNtYWVsXCIgd2l0aCBmdXp6eSBzZWFyY2ggKGl0IHdpbGwgbWF0Y2ggZG9jdW1lbnRzIGNvbnRhaW5pbmdcbiAgICAgKiAvLyB0ZXJtcyBzaW1pbGFyIHRvIFwiaXNtYWVsXCIsIHdpdGggYSBtYXhpbXVtIGVkaXQgZGlzdGFuY2Ugb2YgMC4yIHRlcm0ubGVuZ3RoXG4gICAgICogLy8gKHJvdW5kZWQgdG8gbmVhcmVzdCBpbnRlZ2VyKVxuICAgICAqIG1pbmlTZWFyY2guc2VhcmNoKCdpc21hZWwnLCB7IGZ1enp5OiAwLjIgfSlcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqICMjIyBDb21iaW5pbmcgc3RyYXRlZ2llczpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiAvLyBNaXggb2YgZXhhY3QgbWF0Y2gsIHByZWZpeCBzZWFyY2gsIGFuZCBmdXp6eSBzZWFyY2hcbiAgICAgKiBtaW5pU2VhcmNoLnNlYXJjaCgnaXNtYWVsIG1vYicsIHtcbiAgICAgKiAgcHJlZml4OiB0cnVlLFxuICAgICAqICBmdXp6eTogMC4yXG4gICAgICogfSlcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqICMjIyBBZHZhbmNlZCBwcmVmaXggYW5kIGZ1enp5IHNlYXJjaDpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiAvLyBQZXJmb3JtIGZ1enp5IGFuZCBwcmVmaXggc2VhcmNoIGRlcGVuZGluZyBvbiB0aGUgc2VhcmNoIHRlcm0uIEhlcmVcbiAgICAgKiAvLyBwZXJmb3JtaW5nIHByZWZpeCBhbmQgZnV6enkgc2VhcmNoIG9ubHkgb24gdGVybXMgbG9uZ2VyIHRoYW4gMyBjaGFyYWN0ZXJzXG4gICAgICogbWluaVNlYXJjaC5zZWFyY2goJ2lzbWFlbCBtb2InLCB7XG4gICAgICogIHByZWZpeDogdGVybSA9PiB0ZXJtLmxlbmd0aCA+IDNcbiAgICAgKiAgZnV6enk6IHRlcm0gPT4gdGVybS5sZW5ndGggPiAzID8gMC4yIDogbnVsbFxuICAgICAqIH0pXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiAjIyMgQ29tYmluZSB3aXRoIEFORDpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiAvLyBDb21iaW5lIHNlYXJjaCB0ZXJtcyB3aXRoIEFORCAodG8gbWF0Y2ggb25seSBkb2N1bWVudHMgdGhhdCBjb250YWluIGJvdGhcbiAgICAgKiAvLyBcIm1vdG9yY3ljbGVcIiBhbmQgXCJhcnRcIilcbiAgICAgKiBtaW5pU2VhcmNoLnNlYXJjaCgnbW90b3JjeWNsZSBhcnQnLCB7IGNvbWJpbmVXaXRoOiAnQU5EJyB9KVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogIyMjIENvbWJpbmUgd2l0aCBBTkRfTk9UOlxuICAgICAqXG4gICAgICogVGhlcmUgaXMgYWxzbyBhbiBBTkRfTk9UIGNvbWJpbmF0b3IsIHRoYXQgZmluZHMgZG9jdW1lbnRzIHRoYXQgbWF0Y2ggdGhlXG4gICAgICogZmlyc3QgdGVybSwgYnV0IGRvIG5vdCBtYXRjaCBhbnkgb2YgdGhlIG90aGVyIHRlcm1zLiBUaGlzIGNvbWJpbmF0b3IgaXNcbiAgICAgKiByYXJlbHkgdXNlZnVsIHdpdGggc2ltcGxlIHF1ZXJpZXMsIGFuZCBpcyBtZWFudCB0byBiZSB1c2VkIHdpdGggYWR2YW5jZWRcbiAgICAgKiBxdWVyeSBjb21iaW5hdGlvbnMgKHNlZSBsYXRlciBmb3IgbW9yZSBkZXRhaWxzKS5cbiAgICAgKlxuICAgICAqICMjIyBGaWx0ZXJpbmcgcmVzdWx0czpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiAvLyBGaWx0ZXIgb25seSByZXN1bHRzIGluIHRoZSAnZmljdGlvbicgY2F0ZWdvcnkgKGFzc3VtaW5nIHRoYXQgJ2NhdGVnb3J5J1xuICAgICAqIC8vIGlzIGEgc3RvcmVkIGZpZWxkKVxuICAgICAqIG1pbmlTZWFyY2guc2VhcmNoKCdtb3RvcmN5Y2xlIGFydCcsIHtcbiAgICAgKiAgIGZpbHRlcjogKHJlc3VsdCkgPT4gcmVzdWx0LmNhdGVnb3J5ID09PSAnZmljdGlvbidcbiAgICAgKiB9KVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogIyMjIFdpbGRjYXJkIHF1ZXJ5XG4gICAgICpcbiAgICAgKiBTZWFyY2hpbmcgZm9yIGFuIGVtcHR5IHN0cmluZyAoYXNzdW1pbmcgdGhlIGRlZmF1bHQgdG9rZW5pemVyKSByZXR1cm5zIG5vXG4gICAgICogcmVzdWx0cy4gU29tZXRpbWVzIHRob3VnaCwgb25lIG5lZWRzIHRvIG1hdGNoIGFsbCBkb2N1bWVudHMsIGxpa2UgaW4gYVxuICAgICAqIFwid2lsZGNhcmRcIiBzZWFyY2guIFRoaXMgaXMgcG9zc2libGUgYnkgcGFzc2luZyB0aGUgc3BlY2lhbCB2YWx1ZVxuICAgICAqIHtAbGluayBNaW5pU2VhcmNoLndpbGRjYXJkfSBhcyB0aGUgcXVlcnk6XG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogLy8gUmV0dXJuIHNlYXJjaCByZXN1bHRzIGZvciBhbGwgZG9jdW1lbnRzXG4gICAgICogbWluaVNlYXJjaC5zZWFyY2goTWluaVNlYXJjaC53aWxkY2FyZClcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIE5vdGUgdGhhdCBzZWFyY2ggb3B0aW9ucyBzdWNoIGFzIGBmaWx0ZXJgIGFuZCBgYm9vc3REb2N1bWVudGAgYXJlIHN0aWxsXG4gICAgICogYXBwbGllZCwgaW5mbHVlbmNpbmcgd2hpY2ggcmVzdWx0cyBhcmUgcmV0dXJuZWQsIGFuZCB0aGVpciBvcmRlcjpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiAvLyBSZXR1cm4gc2VhcmNoIHJlc3VsdHMgZm9yIGFsbCBkb2N1bWVudHMgaW4gdGhlICdmaWN0aW9uJyBjYXRlZ29yeVxuICAgICAqIG1pbmlTZWFyY2guc2VhcmNoKE1pbmlTZWFyY2gud2lsZGNhcmQsIHtcbiAgICAgKiAgIGZpbHRlcjogKHJlc3VsdCkgPT4gcmVzdWx0LmNhdGVnb3J5ID09PSAnZmljdGlvbidcbiAgICAgKiB9KVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogIyMjIEFkdmFuY2VkIGNvbWJpbmF0aW9uIG9mIHF1ZXJpZXM6XG4gICAgICpcbiAgICAgKiBJdCBpcyBwb3NzaWJsZSB0byBjb21iaW5lIGRpZmZlcmVudCBzdWJxdWVyaWVzIHdpdGggT1IsIEFORCwgYW5kIEFORF9OT1QsXG4gICAgICogYW5kIGV2ZW4gd2l0aCBkaWZmZXJlbnQgc2VhcmNoIG9wdGlvbnMsIGJ5IHBhc3NpbmcgYSBxdWVyeSBleHByZXNzaW9uXG4gICAgICogdHJlZSBvYmplY3QgYXMgdGhlIGZpcnN0IGFyZ3VtZW50LCBpbnN0ZWFkIG9mIGEgc3RyaW5nLlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIC8vIFNlYXJjaCBmb3IgZG9jdW1lbnRzIHRoYXQgY29udGFpbiBcInplblwiIGFuZCAoXCJtb3RvcmN5Y2xlXCIgb3IgXCJhcmNoZXJ5XCIpXG4gICAgICogbWluaVNlYXJjaC5zZWFyY2goe1xuICAgICAqICAgY29tYmluZVdpdGg6ICdBTkQnLFxuICAgICAqICAgcXVlcmllczogW1xuICAgICAqICAgICAnemVuJyxcbiAgICAgKiAgICAge1xuICAgICAqICAgICAgIGNvbWJpbmVXaXRoOiAnT1InLFxuICAgICAqICAgICAgIHF1ZXJpZXM6IFsnbW90b3JjeWNsZScsICdhcmNoZXJ5J11cbiAgICAgKiAgICAgfVxuICAgICAqICAgXVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiAvLyBTZWFyY2ggZm9yIGRvY3VtZW50cyB0aGF0IGNvbnRhaW4gKFwiYXBwbGVcIiBvciBcInBlYXJcIikgYnV0IG5vdCBcImp1aWNlXCIgYW5kXG4gICAgICogLy8gbm90IFwidHJlZVwiXG4gICAgICogbWluaVNlYXJjaC5zZWFyY2goe1xuICAgICAqICAgY29tYmluZVdpdGg6ICdBTkRfTk9UJyxcbiAgICAgKiAgIHF1ZXJpZXM6IFtcbiAgICAgKiAgICAge1xuICAgICAqICAgICAgIGNvbWJpbmVXaXRoOiAnT1InLFxuICAgICAqICAgICAgIHF1ZXJpZXM6IFsnYXBwbGUnLCAncGVhciddXG4gICAgICogICAgIH0sXG4gICAgICogICAgICdqdWljZScsXG4gICAgICogICAgICd0cmVlJ1xuICAgICAqICAgXVxuICAgICAqIH0pXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBFYWNoIG5vZGUgaW4gdGhlIGV4cHJlc3Npb24gdHJlZSBjYW4gYmUgZWl0aGVyIGEgc3RyaW5nLCBvciBhbiBvYmplY3QgdGhhdFxuICAgICAqIHN1cHBvcnRzIGFsbCB7QGxpbmsgU2VhcmNoT3B0aW9uc30gZmllbGRzLCBwbHVzIGEgYHF1ZXJpZXNgIGFycmF5IGZpZWxkIGZvclxuICAgICAqIHN1YnF1ZXJpZXMuXG4gICAgICpcbiAgICAgKiBOb3RlIHRoYXQsIHdoaWxlIHRoaXMgY2FuIGJlY29tZSBjb21wbGljYXRlZCB0byBkbyBieSBoYW5kIGZvciBjb21wbGV4IG9yXG4gICAgICogZGVlcGx5IG5lc3RlZCBxdWVyaWVzLCBpdCBwcm92aWRlcyBhIGZvcm1hbGl6ZWQgZXhwcmVzc2lvbiB0cmVlIEFQSSBmb3JcbiAgICAgKiBleHRlcm5hbCBsaWJyYXJpZXMgdGhhdCBpbXBsZW1lbnQgYSBwYXJzZXIgZm9yIGN1c3RvbSBxdWVyeSBsYW5ndWFnZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcXVlcnkgIFNlYXJjaCBxdWVyeVxuICAgICAqIEBwYXJhbSBzZWFyY2hPcHRpb25zICBTZWFyY2ggb3B0aW9ucy4gRWFjaCBvcHRpb24sIGlmIG5vdCBnaXZlbiwgZGVmYXVsdHMgdG8gdGhlIGNvcnJlc3BvbmRpbmcgdmFsdWUgb2YgYHNlYXJjaE9wdGlvbnNgIGdpdmVuIHRvIHRoZSBjb25zdHJ1Y3Rvciwgb3IgdG8gdGhlIGxpYnJhcnkgZGVmYXVsdC5cbiAgICAgKi9cbiAgICBzZWFyY2gocXVlcnksIHNlYXJjaE9wdGlvbnMgPSB7fSkge1xuICAgICAgICBjb25zdCB7IHNlYXJjaE9wdGlvbnM6IGdsb2JhbFNlYXJjaE9wdGlvbnMgfSA9IHRoaXMuX29wdGlvbnM7XG4gICAgICAgIGNvbnN0IHNlYXJjaE9wdGlvbnNXaXRoRGVmYXVsdHMgPSB7IC4uLmdsb2JhbFNlYXJjaE9wdGlvbnMsIC4uLnNlYXJjaE9wdGlvbnMgfTtcbiAgICAgICAgY29uc3QgcmF3UmVzdWx0cyA9IHRoaXMuZXhlY3V0ZVF1ZXJ5KHF1ZXJ5LCBzZWFyY2hPcHRpb25zKTtcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IFtkb2NJZCwgeyBzY29yZSwgdGVybXMsIG1hdGNoIH1dIG9mIHJhd1Jlc3VsdHMpIHtcbiAgICAgICAgICAgIC8vIHRlcm1zIGFyZSB0aGUgbWF0Y2hlZCBxdWVyeSB0ZXJtcywgd2hpY2ggd2lsbCBiZSByZXR1cm5lZCB0byB0aGUgdXNlclxuICAgICAgICAgICAgLy8gYXMgcXVlcnlUZXJtcy4gVGhlIHF1YWxpdHkgaXMgY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGVtLCBhcyBvcHBvc2VkIHRvXG4gICAgICAgICAgICAvLyB0aGUgbWF0Y2hlZCB0ZXJtcyBpbiB0aGUgZG9jdW1lbnQgKHdoaWNoIGNhbiBiZSBkaWZmZXJlbnQgZHVlIHRvXG4gICAgICAgICAgICAvLyBwcmVmaXggYW5kIGZ1enp5IG1hdGNoKVxuICAgICAgICAgICAgY29uc3QgcXVhbGl0eSA9IHRlcm1zLmxlbmd0aCB8fCAxO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgIGlkOiB0aGlzLl9kb2N1bWVudElkcy5nZXQoZG9jSWQpLFxuICAgICAgICAgICAgICAgIHNjb3JlOiBzY29yZSAqIHF1YWxpdHksXG4gICAgICAgICAgICAgICAgdGVybXM6IE9iamVjdC5rZXlzKG1hdGNoKSxcbiAgICAgICAgICAgICAgICBxdWVyeVRlcm1zOiB0ZXJtcyxcbiAgICAgICAgICAgICAgICBtYXRjaFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ocmVzdWx0LCB0aGlzLl9zdG9yZWRGaWVsZHMuZ2V0KGRvY0lkKSk7XG4gICAgICAgICAgICBpZiAoc2VhcmNoT3B0aW9uc1dpdGhEZWZhdWx0cy5maWx0ZXIgPT0gbnVsbCB8fCBzZWFyY2hPcHRpb25zV2l0aERlZmF1bHRzLmZpbHRlcihyZXN1bHQpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgaXQncyBhIHdpbGRjYXJkIHF1ZXJ5LCBhbmQgbm8gZG9jdW1lbnQgYm9vc3QgaXMgYXBwbGllZCwgc2tpcCBzb3J0aW5nXG4gICAgICAgIC8vIHRoZSByZXN1bHRzLCBhcyBhbGwgcmVzdWx0cyBoYXZlIHRoZSBzYW1lIHNjb3JlIG9mIDFcbiAgICAgICAgaWYgKHF1ZXJ5ID09PSBNaW5pU2VhcmNoLndpbGRjYXJkICYmIHNlYXJjaE9wdGlvbnNXaXRoRGVmYXVsdHMuYm9vc3REb2N1bWVudCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgfVxuICAgICAgICByZXN1bHRzLnNvcnQoYnlTY29yZSk7XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQcm92aWRlIHN1Z2dlc3Rpb25zIGZvciB0aGUgZ2l2ZW4gc2VhcmNoIHF1ZXJ5XG4gICAgICpcbiAgICAgKiBUaGUgcmVzdWx0IGlzIGEgbGlzdCBvZiBzdWdnZXN0ZWQgbW9kaWZpZWQgc2VhcmNoIHF1ZXJpZXMsIGRlcml2ZWQgZnJvbSB0aGVcbiAgICAgKiBnaXZlbiBzZWFyY2ggcXVlcnksIGVhY2ggd2l0aCBhIHJlbGV2YW5jZSBzY29yZSwgc29ydGVkIGJ5IGRlc2NlbmRpbmcgc2NvcmUuXG4gICAgICpcbiAgICAgKiBCeSBkZWZhdWx0LCBpdCB1c2VzIHRoZSBzYW1lIG9wdGlvbnMgdXNlZCBmb3Igc2VhcmNoLCBleGNlcHQgdGhhdCBieVxuICAgICAqIGRlZmF1bHQgaXQgcGVyZm9ybXMgcHJlZml4IHNlYXJjaCBvbiB0aGUgbGFzdCB0ZXJtIG9mIHRoZSBxdWVyeSwgYW5kXG4gICAgICogY29tYmluZSB0ZXJtcyB3aXRoIGAnQU5EJ2AgKHJlcXVpcmluZyBhbGwgcXVlcnkgdGVybXMgdG8gbWF0Y2gpLiBDdXN0b21cbiAgICAgKiBvcHRpb25zIGNhbiBiZSBwYXNzZWQgYXMgYSBzZWNvbmQgYXJndW1lbnQuIERlZmF1bHRzIGNhbiBiZSBjaGFuZ2VkIHVwb25cbiAgICAgKiBjYWxsaW5nIHRoZSB7QGxpbmsgTWluaVNlYXJjaH0gY29uc3RydWN0b3IsIGJ5IHBhc3NpbmcgYVxuICAgICAqIGBhdXRvU3VnZ2VzdE9wdGlvbnNgIG9wdGlvbi5cbiAgICAgKlxuICAgICAqICMjIyBCYXNpYyB1c2FnZTpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiAvLyBHZXQgc3VnZ2VzdGlvbnMgZm9yICduZXVybyc6XG4gICAgICogbWluaVNlYXJjaC5hdXRvU3VnZ2VzdCgnbmV1cm8nKVxuICAgICAqIC8vID0+IFsgeyBzdWdnZXN0aW9uOiAnbmV1cm9tYW5jZXInLCB0ZXJtczogWyAnbmV1cm9tYW5jZXInIF0sIHNjb3JlOiAwLjQ2MjQwIH0gXVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogIyMjIE11bHRpcGxlIHdvcmRzOlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIC8vIEdldCBzdWdnZXN0aW9ucyBmb3IgJ3plbiBhcic6XG4gICAgICogbWluaVNlYXJjaC5hdXRvU3VnZ2VzdCgnemVuIGFyJylcbiAgICAgKiAvLyA9PiBbXG4gICAgICogLy8gIHsgc3VnZ2VzdGlvbjogJ3plbiBhcmNoZXJ5IGFydCcsIHRlcm1zOiBbICd6ZW4nLCAnYXJjaGVyeScsICdhcnQnIF0sIHNjb3JlOiAxLjczMzMyIH0sXG4gICAgICogLy8gIHsgc3VnZ2VzdGlvbjogJ3plbiBhcnQnLCB0ZXJtczogWyAnemVuJywgJ2FydCcgXSwgc2NvcmU6IDEuMjEzMTMgfVxuICAgICAqIC8vIF1cbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqICMjIyBGdXp6eSBzdWdnZXN0aW9uczpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiAvLyBDb3JyZWN0IHNwZWxsaW5nIG1pc3Rha2VzIHVzaW5nIGZ1enp5IHNlYXJjaDpcbiAgICAgKiBtaW5pU2VhcmNoLmF1dG9TdWdnZXN0KCduZXJvbWFuY2VyJywgeyBmdXp6eTogMC4yIH0pXG4gICAgICogLy8gPT4gWyB7IHN1Z2dlc3Rpb246ICduZXVyb21hbmNlcicsIHRlcm1zOiBbICduZXVyb21hbmNlcicgXSwgc2NvcmU6IDEuMDM5OTggfSBdXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiAjIyMgRmlsdGVyaW5nOlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIC8vIEdldCBzdWdnZXN0aW9ucyBmb3IgJ3plbiBhcicsIGJ1dCBvbmx5IHdpdGhpbiB0aGUgJ2ZpY3Rpb24nIGNhdGVnb3J5XG4gICAgICogLy8gKGFzc3VtaW5nIHRoYXQgJ2NhdGVnb3J5JyBpcyBhIHN0b3JlZCBmaWVsZCk6XG4gICAgICogbWluaVNlYXJjaC5hdXRvU3VnZ2VzdCgnemVuIGFyJywge1xuICAgICAqICAgZmlsdGVyOiAocmVzdWx0KSA9PiByZXN1bHQuY2F0ZWdvcnkgPT09ICdmaWN0aW9uJ1xuICAgICAqIH0pXG4gICAgICogLy8gPT4gW1xuICAgICAqIC8vICB7IHN1Z2dlc3Rpb246ICd6ZW4gYXJjaGVyeSBhcnQnLCB0ZXJtczogWyAnemVuJywgJ2FyY2hlcnknLCAnYXJ0JyBdLCBzY29yZTogMS43MzMzMiB9LFxuICAgICAqIC8vICB7IHN1Z2dlc3Rpb246ICd6ZW4gYXJ0JywgdGVybXM6IFsgJ3plbicsICdhcnQnIF0sIHNjb3JlOiAxLjIxMzEzIH1cbiAgICAgKiAvLyBdXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcXVlcnlTdHJpbmcgIFF1ZXJ5IHN0cmluZyB0byBiZSBleHBhbmRlZCBpbnRvIHN1Z2dlc3Rpb25zXG4gICAgICogQHBhcmFtIG9wdGlvbnMgIFNlYXJjaCBvcHRpb25zLiBUaGUgc3VwcG9ydGVkIG9wdGlvbnMgYW5kIGRlZmF1bHQgdmFsdWVzXG4gICAgICogYXJlIHRoZSBzYW1lIGFzIGZvciB0aGUge0BsaW5rIE1pbmlTZWFyY2gjc2VhcmNofSBtZXRob2QsIGV4Y2VwdCB0aGF0IGJ5XG4gICAgICogZGVmYXVsdCBwcmVmaXggc2VhcmNoIGlzIHBlcmZvcm1lZCBvbiB0aGUgbGFzdCB0ZXJtIGluIHRoZSBxdWVyeSwgYW5kIHRlcm1zXG4gICAgICogYXJlIGNvbWJpbmVkIHdpdGggYCdBTkQnYC5cbiAgICAgKiBAcmV0dXJuICBBIHNvcnRlZCBhcnJheSBvZiBzdWdnZXN0aW9ucyBzb3J0ZWQgYnkgcmVsZXZhbmNlIHNjb3JlLlxuICAgICAqL1xuICAgIGF1dG9TdWdnZXN0KHF1ZXJ5U3RyaW5nLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgb3B0aW9ucyA9IHsgLi4udGhpcy5fb3B0aW9ucy5hdXRvU3VnZ2VzdE9wdGlvbnMsIC4uLm9wdGlvbnMgfTtcbiAgICAgICAgY29uc3Qgc3VnZ2VzdGlvbnMgPSBuZXcgTWFwKCk7XG4gICAgICAgIGZvciAoY29uc3QgeyBzY29yZSwgdGVybXMgfSBvZiB0aGlzLnNlYXJjaChxdWVyeVN0cmluZywgb3B0aW9ucykpIHtcbiAgICAgICAgICAgIGNvbnN0IHBocmFzZSA9IHRlcm1zLmpvaW4oJyAnKTtcbiAgICAgICAgICAgIGNvbnN0IHN1Z2dlc3Rpb24gPSBzdWdnZXN0aW9ucy5nZXQocGhyYXNlKTtcbiAgICAgICAgICAgIGlmIChzdWdnZXN0aW9uICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBzdWdnZXN0aW9uLnNjb3JlICs9IHNjb3JlO1xuICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb24uY291bnQgKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb25zLnNldChwaHJhc2UsIHsgc2NvcmUsIHRlcm1zLCBjb3VudDogMSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXN1bHRzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgW3N1Z2dlc3Rpb24sIHsgc2NvcmUsIHRlcm1zLCBjb3VudCB9XSBvZiBzdWdnZXN0aW9ucykge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHsgc3VnZ2VzdGlvbiwgdGVybXMsIHNjb3JlOiBzY29yZSAvIGNvdW50IH0pO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdHMuc29ydChieVNjb3JlKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRvdGFsIG51bWJlciBvZiBkb2N1bWVudHMgYXZhaWxhYmxlIHRvIHNlYXJjaFxuICAgICAqL1xuICAgIGdldCBkb2N1bWVudENvdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZG9jdW1lbnRDb3VudDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTnVtYmVyIG9mIHRlcm1zIGluIHRoZSBpbmRleFxuICAgICAqL1xuICAgIGdldCB0ZXJtQ291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbmRleC5zaXplO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZXNlcmlhbGl6ZXMgYSBKU09OIGluZGV4IChzZXJpYWxpemVkIHdpdGggYEpTT04uc3RyaW5naWZ5KG1pbmlTZWFyY2gpYClcbiAgICAgKiBhbmQgaW5zdGFudGlhdGVzIGEgTWluaVNlYXJjaCBpbnN0YW5jZS4gSXQgc2hvdWxkIGJlIGdpdmVuIHRoZSBzYW1lIG9wdGlvbnNcbiAgICAgKiBvcmlnaW5hbGx5IHVzZWQgd2hlbiBzZXJpYWxpemluZyB0aGUgaW5kZXguXG4gICAgICpcbiAgICAgKiAjIyMgVXNhZ2U6XG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogLy8gSWYgdGhlIGluZGV4IHdhcyBzZXJpYWxpemVkIHdpdGg6XG4gICAgICogbGV0IG1pbmlTZWFyY2ggPSBuZXcgTWluaVNlYXJjaCh7IGZpZWxkczogWyd0aXRsZScsICd0ZXh0J10gfSlcbiAgICAgKiBtaW5pU2VhcmNoLmFkZEFsbChkb2N1bWVudHMpXG4gICAgICpcbiAgICAgKiBjb25zdCBqc29uID0gSlNPTi5zdHJpbmdpZnkobWluaVNlYXJjaClcbiAgICAgKiAvLyBJdCBjYW4gbGF0ZXIgYmUgZGVzZXJpYWxpemVkIGxpa2UgdGhpczpcbiAgICAgKiBtaW5pU2VhcmNoID0gTWluaVNlYXJjaC5sb2FkSlNPTihqc29uLCB7IGZpZWxkczogWyd0aXRsZScsICd0ZXh0J10gfSlcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBwYXJhbSBqc29uICBKU09OLXNlcmlhbGl6ZWQgaW5kZXhcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAgY29uZmlndXJhdGlvbiBvcHRpb25zLCBzYW1lIGFzIHRoZSBjb25zdHJ1Y3RvclxuICAgICAqIEByZXR1cm4gQW4gaW5zdGFuY2Ugb2YgTWluaVNlYXJjaCBkZXNlcmlhbGl6ZWQgZnJvbSB0aGUgZ2l2ZW4gSlNPTi5cbiAgICAgKi9cbiAgICBzdGF0aWMgbG9hZEpTT04oanNvbiwgb3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pbmlTZWFyY2g6IGxvYWRKU09OIHNob3VsZCBiZSBnaXZlbiB0aGUgc2FtZSBvcHRpb25zIHVzZWQgd2hlbiBzZXJpYWxpemluZyB0aGUgaW5kZXgnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5sb2FkSlMoSlNPTi5wYXJzZShqc29uKSwgb3B0aW9ucyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFzeW5jIGVxdWl2YWxlbnQgb2Yge0BsaW5rIE1pbmlTZWFyY2gubG9hZEpTT059XG4gICAgICpcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIGFuIGFsdGVybmF0aXZlIHRvIHtAbGluayBNaW5pU2VhcmNoLmxvYWRKU09OfSB0aGF0IHJldHVybnNcbiAgICAgKiBhIHByb21pc2UsIGFuZCBsb2FkcyB0aGUgaW5kZXggaW4gYmF0Y2hlcywgbGVhdmluZyBwYXVzZXMgYmV0d2VlbiB0aGVtIHRvIGF2b2lkXG4gICAgICogYmxvY2tpbmcgdGhlIG1haW4gdGhyZWFkLiBJdCB0ZW5kcyB0byBiZSBzbG93ZXIgdGhhbiB0aGUgc3luY2hyb25vdXNcbiAgICAgKiB2ZXJzaW9uLCBidXQgZG9lcyBub3QgYmxvY2sgdGhlIG1haW4gdGhyZWFkLCBzbyBpdCBjYW4gYmUgYSBiZXR0ZXIgY2hvaWNlXG4gICAgICogd2hlbiBkZXNlcmlhbGl6aW5nIHZlcnkgbGFyZ2UgaW5kZXhlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBqc29uICBKU09OLXNlcmlhbGl6ZWQgaW5kZXhcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAgY29uZmlndXJhdGlvbiBvcHRpb25zLCBzYW1lIGFzIHRoZSBjb25zdHJ1Y3RvclxuICAgICAqIEByZXR1cm4gQSBQcm9taXNlIHRoYXQgd2lsbCByZXNvbHZlIHRvIGFuIGluc3RhbmNlIG9mIE1pbmlTZWFyY2ggZGVzZXJpYWxpemVkIGZyb20gdGhlIGdpdmVuIEpTT04uXG4gICAgICovXG4gICAgc3RhdGljIGFzeW5jIGxvYWRKU09OQXN5bmMoanNvbiwgb3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pbmlTZWFyY2g6IGxvYWRKU09OIHNob3VsZCBiZSBnaXZlbiB0aGUgc2FtZSBvcHRpb25zIHVzZWQgd2hlbiBzZXJpYWxpemluZyB0aGUgaW5kZXgnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5sb2FkSlNBc3luYyhKU09OLnBhcnNlKGpzb24pLCBvcHRpb25zKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCB2YWx1ZSBvZiBhbiBvcHRpb24uIEl0IHdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgbm8gb3B0aW9uXG4gICAgICogd2l0aCB0aGUgZ2l2ZW4gbmFtZSBleGlzdHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9uTmFtZSAgTmFtZSBvZiB0aGUgb3B0aW9uXG4gICAgICogQHJldHVybiBUaGUgZGVmYXVsdCB2YWx1ZSBvZiB0aGUgZ2l2ZW4gb3B0aW9uXG4gICAgICpcbiAgICAgKiAjIyMgVXNhZ2U6XG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogLy8gR2V0IGRlZmF1bHQgdG9rZW5pemVyXG4gICAgICogTWluaVNlYXJjaC5nZXREZWZhdWx0KCd0b2tlbml6ZScpXG4gICAgICpcbiAgICAgKiAvLyBHZXQgZGVmYXVsdCB0ZXJtIHByb2Nlc3NvclxuICAgICAqIE1pbmlTZWFyY2guZ2V0RGVmYXVsdCgncHJvY2Vzc1Rlcm0nKVxuICAgICAqXG4gICAgICogLy8gVW5rbm93biBvcHRpb25zIHdpbGwgdGhyb3cgYW4gZXJyb3JcbiAgICAgKiBNaW5pU2VhcmNoLmdldERlZmF1bHQoJ25vdEV4aXN0aW5nJylcbiAgICAgKiAvLyA9PiB0aHJvd3MgJ01pbmlTZWFyY2g6IHVua25vd24gb3B0aW9uIFwibm90RXhpc3RpbmdcIidcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0RGVmYXVsdChvcHRpb25OYW1lKSB7XG4gICAgICAgIGlmIChkZWZhdWx0T3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShvcHRpb25OYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuIGdldE93blByb3BlcnR5KGRlZmF1bHRPcHRpb25zLCBvcHRpb25OYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTWluaVNlYXJjaDogdW5rbm93biBvcHRpb24gXCIke29wdGlvbk5hbWV9XCJgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgc3RhdGljIGxvYWRKUyhqcywgb3B0aW9ucykge1xuICAgICAgICBjb25zdCB7IGluZGV4LCBkb2N1bWVudElkcywgZmllbGRMZW5ndGgsIHN0b3JlZEZpZWxkcywgc2VyaWFsaXphdGlvblZlcnNpb24gfSA9IGpzO1xuICAgICAgICBjb25zdCBtaW5pU2VhcmNoID0gdGhpcy5pbnN0YW50aWF0ZU1pbmlTZWFyY2goanMsIG9wdGlvbnMpO1xuICAgICAgICBtaW5pU2VhcmNoLl9kb2N1bWVudElkcyA9IG9iamVjdFRvTnVtZXJpY01hcChkb2N1bWVudElkcyk7XG4gICAgICAgIG1pbmlTZWFyY2guX2ZpZWxkTGVuZ3RoID0gb2JqZWN0VG9OdW1lcmljTWFwKGZpZWxkTGVuZ3RoKTtcbiAgICAgICAgbWluaVNlYXJjaC5fc3RvcmVkRmllbGRzID0gb2JqZWN0VG9OdW1lcmljTWFwKHN0b3JlZEZpZWxkcyk7XG4gICAgICAgIGZvciAoY29uc3QgW3Nob3J0SWQsIGlkXSBvZiBtaW5pU2VhcmNoLl9kb2N1bWVudElkcykge1xuICAgICAgICAgICAgbWluaVNlYXJjaC5faWRUb1Nob3J0SWQuc2V0KGlkLCBzaG9ydElkKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IFt0ZXJtLCBkYXRhXSBvZiBpbmRleCkge1xuICAgICAgICAgICAgY29uc3QgZGF0YU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZmllbGRJZCBvZiBPYmplY3Qua2V5cyhkYXRhKSkge1xuICAgICAgICAgICAgICAgIGxldCBpbmRleEVudHJ5ID0gZGF0YVtmaWVsZElkXTtcbiAgICAgICAgICAgICAgICAvLyBWZXJzaW9uIDEgdXNlZCB0byBuZXN0IHRoZSBpbmRleCBlbnRyeSBpbnNpZGUgYSBmaWVsZCBjYWxsZWQgZHNcbiAgICAgICAgICAgICAgICBpZiAoc2VyaWFsaXphdGlvblZlcnNpb24gPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhFbnRyeSA9IGluZGV4RW50cnkuZHM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRhdGFNYXAuc2V0KHBhcnNlSW50KGZpZWxkSWQsIDEwKSwgb2JqZWN0VG9OdW1lcmljTWFwKGluZGV4RW50cnkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1pbmlTZWFyY2guX2luZGV4LnNldCh0ZXJtLCBkYXRhTWFwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWluaVNlYXJjaDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHN0YXRpYyBhc3luYyBsb2FkSlNBc3luYyhqcywgb3B0aW9ucykge1xuICAgICAgICBjb25zdCB7IGluZGV4LCBkb2N1bWVudElkcywgZmllbGRMZW5ndGgsIHN0b3JlZEZpZWxkcywgc2VyaWFsaXphdGlvblZlcnNpb24gfSA9IGpzO1xuICAgICAgICBjb25zdCBtaW5pU2VhcmNoID0gdGhpcy5pbnN0YW50aWF0ZU1pbmlTZWFyY2goanMsIG9wdGlvbnMpO1xuICAgICAgICBtaW5pU2VhcmNoLl9kb2N1bWVudElkcyA9IGF3YWl0IG9iamVjdFRvTnVtZXJpY01hcEFzeW5jKGRvY3VtZW50SWRzKTtcbiAgICAgICAgbWluaVNlYXJjaC5fZmllbGRMZW5ndGggPSBhd2FpdCBvYmplY3RUb051bWVyaWNNYXBBc3luYyhmaWVsZExlbmd0aCk7XG4gICAgICAgIG1pbmlTZWFyY2guX3N0b3JlZEZpZWxkcyA9IGF3YWl0IG9iamVjdFRvTnVtZXJpY01hcEFzeW5jKHN0b3JlZEZpZWxkcyk7XG4gICAgICAgIGZvciAoY29uc3QgW3Nob3J0SWQsIGlkXSBvZiBtaW5pU2VhcmNoLl9kb2N1bWVudElkcykge1xuICAgICAgICAgICAgbWluaVNlYXJjaC5faWRUb1Nob3J0SWQuc2V0KGlkLCBzaG9ydElkKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICBmb3IgKGNvbnN0IFt0ZXJtLCBkYXRhXSBvZiBpbmRleCkge1xuICAgICAgICAgICAgY29uc3QgZGF0YU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZmllbGRJZCBvZiBPYmplY3Qua2V5cyhkYXRhKSkge1xuICAgICAgICAgICAgICAgIGxldCBpbmRleEVudHJ5ID0gZGF0YVtmaWVsZElkXTtcbiAgICAgICAgICAgICAgICAvLyBWZXJzaW9uIDEgdXNlZCB0byBuZXN0IHRoZSBpbmRleCBlbnRyeSBpbnNpZGUgYSBmaWVsZCBjYWxsZWQgZHNcbiAgICAgICAgICAgICAgICBpZiAoc2VyaWFsaXphdGlvblZlcnNpb24gPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhFbnRyeSA9IGluZGV4RW50cnkuZHM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRhdGFNYXAuc2V0KHBhcnNlSW50KGZpZWxkSWQsIDEwKSwgYXdhaXQgb2JqZWN0VG9OdW1lcmljTWFwQXN5bmMoaW5kZXhFbnRyeSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCsrY291bnQgJSAxMDAwID09PSAwKVxuICAgICAgICAgICAgICAgIGF3YWl0IHdhaXQoMCk7XG4gICAgICAgICAgICBtaW5pU2VhcmNoLl9pbmRleC5zZXQodGVybSwgZGF0YU1hcCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1pbmlTZWFyY2g7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBzdGF0aWMgaW5zdGFudGlhdGVNaW5pU2VhcmNoKGpzLCBvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IHsgZG9jdW1lbnRDb3VudCwgbmV4dElkLCBmaWVsZElkcywgYXZlcmFnZUZpZWxkTGVuZ3RoLCBkaXJ0Q291bnQsIHNlcmlhbGl6YXRpb25WZXJzaW9uIH0gPSBqcztcbiAgICAgICAgaWYgKHNlcmlhbGl6YXRpb25WZXJzaW9uICE9PSAxICYmIHNlcmlhbGl6YXRpb25WZXJzaW9uICE9PSAyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pbmlTZWFyY2g6IGNhbm5vdCBkZXNlcmlhbGl6ZSBhbiBpbmRleCBjcmVhdGVkIHdpdGggYW4gaW5jb21wYXRpYmxlIHZlcnNpb24nKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtaW5pU2VhcmNoID0gbmV3IE1pbmlTZWFyY2gob3B0aW9ucyk7XG4gICAgICAgIG1pbmlTZWFyY2guX2RvY3VtZW50Q291bnQgPSBkb2N1bWVudENvdW50O1xuICAgICAgICBtaW5pU2VhcmNoLl9uZXh0SWQgPSBuZXh0SWQ7XG4gICAgICAgIG1pbmlTZWFyY2guX2lkVG9TaG9ydElkID0gbmV3IE1hcCgpO1xuICAgICAgICBtaW5pU2VhcmNoLl9maWVsZElkcyA9IGZpZWxkSWRzO1xuICAgICAgICBtaW5pU2VhcmNoLl9hdmdGaWVsZExlbmd0aCA9IGF2ZXJhZ2VGaWVsZExlbmd0aDtcbiAgICAgICAgbWluaVNlYXJjaC5fZGlydENvdW50ID0gZGlydENvdW50IHx8IDA7XG4gICAgICAgIG1pbmlTZWFyY2guX2luZGV4ID0gbmV3IFNlYXJjaGFibGVNYXAoKTtcbiAgICAgICAgcmV0dXJuIG1pbmlTZWFyY2g7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBleGVjdXRlUXVlcnkocXVlcnksIHNlYXJjaE9wdGlvbnMgPSB7fSkge1xuICAgICAgICBpZiAocXVlcnkgPT09IE1pbmlTZWFyY2gud2lsZGNhcmQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGVXaWxkY2FyZFF1ZXJ5KHNlYXJjaE9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgcXVlcnkgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0geyAuLi5zZWFyY2hPcHRpb25zLCAuLi5xdWVyeSwgcXVlcmllczogdW5kZWZpbmVkIH07XG4gICAgICAgICAgICBjb25zdCByZXN1bHRzID0gcXVlcnkucXVlcmllcy5tYXAoKHN1YnF1ZXJ5KSA9PiB0aGlzLmV4ZWN1dGVRdWVyeShzdWJxdWVyeSwgb3B0aW9ucykpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29tYmluZVJlc3VsdHMocmVzdWx0cywgb3B0aW9ucy5jb21iaW5lV2l0aCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyB0b2tlbml6ZSwgcHJvY2Vzc1Rlcm0sIHNlYXJjaE9wdGlvbnM6IGdsb2JhbFNlYXJjaE9wdGlvbnMgfSA9IHRoaXMuX29wdGlvbnM7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7IHRva2VuaXplLCBwcm9jZXNzVGVybSwgLi4uZ2xvYmFsU2VhcmNoT3B0aW9ucywgLi4uc2VhcmNoT3B0aW9ucyB9O1xuICAgICAgICBjb25zdCB7IHRva2VuaXplOiBzZWFyY2hUb2tlbml6ZSwgcHJvY2Vzc1Rlcm06IHNlYXJjaFByb2Nlc3NUZXJtIH0gPSBvcHRpb25zO1xuICAgICAgICBjb25zdCB0ZXJtcyA9IHNlYXJjaFRva2VuaXplKHF1ZXJ5KVxuICAgICAgICAgICAgLmZsYXRNYXAoKHRlcm0pID0+IHNlYXJjaFByb2Nlc3NUZXJtKHRlcm0pKVxuICAgICAgICAgICAgLmZpbHRlcigodGVybSkgPT4gISF0ZXJtKTtcbiAgICAgICAgY29uc3QgcXVlcmllcyA9IHRlcm1zLm1hcCh0ZXJtVG9RdWVyeVNwZWMob3B0aW9ucykpO1xuICAgICAgICBjb25zdCByZXN1bHRzID0gcXVlcmllcy5tYXAocXVlcnkgPT4gdGhpcy5leGVjdXRlUXVlcnlTcGVjKHF1ZXJ5LCBvcHRpb25zKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbWJpbmVSZXN1bHRzKHJlc3VsdHMsIG9wdGlvbnMuY29tYmluZVdpdGgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgZXhlY3V0ZVF1ZXJ5U3BlYyhxdWVyeSwgc2VhcmNoT3B0aW9ucykge1xuICAgICAgICBjb25zdCBvcHRpb25zID0geyAuLi50aGlzLl9vcHRpb25zLnNlYXJjaE9wdGlvbnMsIC4uLnNlYXJjaE9wdGlvbnMgfTtcbiAgICAgICAgY29uc3QgYm9vc3RzID0gKG9wdGlvbnMuZmllbGRzIHx8IHRoaXMuX29wdGlvbnMuZmllbGRzKS5yZWR1Y2UoKGJvb3N0cywgZmllbGQpID0+ICh7IC4uLmJvb3N0cywgW2ZpZWxkXTogZ2V0T3duUHJvcGVydHkob3B0aW9ucy5ib29zdCwgZmllbGQpIHx8IDEgfSksIHt9KTtcbiAgICAgICAgY29uc3QgeyBib29zdERvY3VtZW50LCB3ZWlnaHRzLCBtYXhGdXp6eSwgYm0yNTogYm0yNXBhcmFtcyB9ID0gb3B0aW9ucztcbiAgICAgICAgY29uc3QgeyBmdXp6eTogZnV6enlXZWlnaHQsIHByZWZpeDogcHJlZml4V2VpZ2h0IH0gPSB7IC4uLmRlZmF1bHRTZWFyY2hPcHRpb25zLndlaWdodHMsIC4uLndlaWdodHMgfTtcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuX2luZGV4LmdldChxdWVyeS50ZXJtKTtcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IHRoaXMudGVybVJlc3VsdHMocXVlcnkudGVybSwgcXVlcnkudGVybSwgMSwgcXVlcnkudGVybUJvb3N0LCBkYXRhLCBib29zdHMsIGJvb3N0RG9jdW1lbnQsIGJtMjVwYXJhbXMpO1xuICAgICAgICBsZXQgcHJlZml4TWF0Y2hlcztcbiAgICAgICAgbGV0IGZ1enp5TWF0Y2hlcztcbiAgICAgICAgaWYgKHF1ZXJ5LnByZWZpeCkge1xuICAgICAgICAgICAgcHJlZml4TWF0Y2hlcyA9IHRoaXMuX2luZGV4LmF0UHJlZml4KHF1ZXJ5LnRlcm0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChxdWVyeS5mdXp6eSkge1xuICAgICAgICAgICAgY29uc3QgZnV6enkgPSAocXVlcnkuZnV6enkgPT09IHRydWUpID8gMC4yIDogcXVlcnkuZnV6enk7XG4gICAgICAgICAgICBjb25zdCBtYXhEaXN0YW5jZSA9IGZ1enp5IDwgMSA/IE1hdGgubWluKG1heEZ1enp5LCBNYXRoLnJvdW5kKHF1ZXJ5LnRlcm0ubGVuZ3RoICogZnV6enkpKSA6IGZ1enp5O1xuICAgICAgICAgICAgaWYgKG1heERpc3RhbmNlKVxuICAgICAgICAgICAgICAgIGZ1enp5TWF0Y2hlcyA9IHRoaXMuX2luZGV4LmZ1enp5R2V0KHF1ZXJ5LnRlcm0sIG1heERpc3RhbmNlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJlZml4TWF0Y2hlcykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBbdGVybSwgZGF0YV0gb2YgcHJlZml4TWF0Y2hlcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpc3RhbmNlID0gdGVybS5sZW5ndGggLSBxdWVyeS50ZXJtLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBpZiAoIWRpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH0gLy8gU2tpcCBleGFjdCBtYXRjaC5cbiAgICAgICAgICAgICAgICAvLyBEZWxldGUgdGhlIHRlcm0gZnJvbSBmdXp6eSByZXN1bHRzIChpZiBwcmVzZW50KSBpZiBpdCBpcyBhbHNvIGFcbiAgICAgICAgICAgICAgICAvLyBwcmVmaXggcmVzdWx0LiBUaGlzIGVudHJ5IHdpbGwgYWx3YXlzIGJlIHNjb3JlZCBhcyBhIHByZWZpeCByZXN1bHQuXG4gICAgICAgICAgICAgICAgZnV6enlNYXRjaGVzID09PSBudWxsIHx8IGZ1enp5TWF0Y2hlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogZnV6enlNYXRjaGVzLmRlbGV0ZSh0ZXJtKTtcbiAgICAgICAgICAgICAgICAvLyBXZWlnaHQgZ3JhZHVhbGx5IGFwcHJvYWNoZXMgMCBhcyBkaXN0YW5jZSBnb2VzIHRvIGluZmluaXR5LCB3aXRoIHRoZVxuICAgICAgICAgICAgICAgIC8vIHdlaWdodCBmb3IgdGhlIGh5cG90aGV0aWNhbCBkaXN0YW5jZSAwIGJlaW5nIGVxdWFsIHRvIHByZWZpeFdlaWdodC5cbiAgICAgICAgICAgICAgICAvLyBUaGUgcmF0ZSBvZiBjaGFuZ2UgaXMgbXVjaCBsb3dlciB0aGFuIHRoYXQgb2YgZnV6enkgbWF0Y2hlcyB0b1xuICAgICAgICAgICAgICAgIC8vIGFjY291bnQgZm9yIHRoZSBmYWN0IHRoYXQgcHJlZml4IG1hdGNoZXMgc3RheSBtb3JlIHJlbGV2YW50IHRoYW5cbiAgICAgICAgICAgICAgICAvLyBmdXp6eSBtYXRjaGVzIGZvciBsb25nZXIgZGlzdGFuY2VzLlxuICAgICAgICAgICAgICAgIGNvbnN0IHdlaWdodCA9IHByZWZpeFdlaWdodCAqIHRlcm0ubGVuZ3RoIC8gKHRlcm0ubGVuZ3RoICsgMC4zICogZGlzdGFuY2UpO1xuICAgICAgICAgICAgICAgIHRoaXMudGVybVJlc3VsdHMocXVlcnkudGVybSwgdGVybSwgd2VpZ2h0LCBxdWVyeS50ZXJtQm9vc3QsIGRhdGEsIGJvb3N0cywgYm9vc3REb2N1bWVudCwgYm0yNXBhcmFtcywgcmVzdWx0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZ1enp5TWF0Y2hlcykge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0ZXJtIG9mIGZ1enp5TWF0Y2hlcy5rZXlzKCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBbZGF0YSwgZGlzdGFuY2VdID0gZnV6enlNYXRjaGVzLmdldCh0ZXJtKTtcbiAgICAgICAgICAgICAgICBpZiAoIWRpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH0gLy8gU2tpcCBleGFjdCBtYXRjaC5cbiAgICAgICAgICAgICAgICAvLyBXZWlnaHQgZ3JhZHVhbGx5IGFwcHJvYWNoZXMgMCBhcyBkaXN0YW5jZSBnb2VzIHRvIGluZmluaXR5LCB3aXRoIHRoZVxuICAgICAgICAgICAgICAgIC8vIHdlaWdodCBmb3IgdGhlIGh5cG90aGV0aWNhbCBkaXN0YW5jZSAwIGJlaW5nIGVxdWFsIHRvIGZ1enp5V2VpZ2h0LlxuICAgICAgICAgICAgICAgIGNvbnN0IHdlaWdodCA9IGZ1enp5V2VpZ2h0ICogdGVybS5sZW5ndGggLyAodGVybS5sZW5ndGggKyBkaXN0YW5jZSk7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXJtUmVzdWx0cyhxdWVyeS50ZXJtLCB0ZXJtLCB3ZWlnaHQsIHF1ZXJ5LnRlcm1Cb29zdCwgZGF0YSwgYm9vc3RzLCBib29zdERvY3VtZW50LCBibTI1cGFyYW1zLCByZXN1bHRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIGV4ZWN1dGVXaWxkY2FyZFF1ZXJ5KHNlYXJjaE9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IG5ldyBNYXAoKTtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHsgLi4udGhpcy5fb3B0aW9ucy5zZWFyY2hPcHRpb25zLCAuLi5zZWFyY2hPcHRpb25zIH07XG4gICAgICAgIGZvciAoY29uc3QgW3Nob3J0SWQsIGlkXSBvZiB0aGlzLl9kb2N1bWVudElkcykge1xuICAgICAgICAgICAgY29uc3Qgc2NvcmUgPSBvcHRpb25zLmJvb3N0RG9jdW1lbnQgPyBvcHRpb25zLmJvb3N0RG9jdW1lbnQoaWQsICcnLCB0aGlzLl9zdG9yZWRGaWVsZHMuZ2V0KHNob3J0SWQpKSA6IDE7XG4gICAgICAgICAgICByZXN1bHRzLnNldChzaG9ydElkLCB7XG4gICAgICAgICAgICAgICAgc2NvcmUsXG4gICAgICAgICAgICAgICAgdGVybXM6IFtdLFxuICAgICAgICAgICAgICAgIG1hdGNoOiB7fVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBjb21iaW5lUmVzdWx0cyhyZXN1bHRzLCBjb21iaW5lV2l0aCA9IE9SKSB7XG4gICAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBNYXAoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvcGVyYXRvciA9IGNvbWJpbmVXaXRoLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IGNvbWJpbmF0b3IgPSBjb21iaW5hdG9yc1tvcGVyYXRvcl07XG4gICAgICAgIGlmICghY29tYmluYXRvcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGNvbWJpbmF0aW9uIG9wZXJhdG9yOiAke2NvbWJpbmVXaXRofWApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzLnJlZHVjZShjb21iaW5hdG9yKSB8fCBuZXcgTWFwKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFsbG93cyBzZXJpYWxpemF0aW9uIG9mIHRoZSBpbmRleCB0byBKU09OLCB0byBwb3NzaWJseSBzdG9yZSBpdCBhbmQgbGF0ZXJcbiAgICAgKiBkZXNlcmlhbGl6ZSBpdCB3aXRoIHtAbGluayBNaW5pU2VhcmNoLmxvYWRKU09OfS5cbiAgICAgKlxuICAgICAqIE5vcm1hbGx5IG9uZSBkb2VzIG5vdCBkaXJlY3RseSBjYWxsIHRoaXMgbWV0aG9kLCBidXQgcmF0aGVyIGNhbGwgdGhlXG4gICAgICogc3RhbmRhcmQgSmF2YVNjcmlwdCBgSlNPTi5zdHJpbmdpZnkoKWAgcGFzc2luZyB0aGUge0BsaW5rIE1pbmlTZWFyY2h9XG4gICAgICogaW5zdGFuY2UsIGFuZCBKYXZhU2NyaXB0IHdpbGwgaW50ZXJuYWxseSBjYWxsIHRoaXMgbWV0aG9kLiBVcG9uXG4gICAgICogZGVzZXJpYWxpemF0aW9uLCBvbmUgbXVzdCBwYXNzIHRvIHtAbGluayBNaW5pU2VhcmNoLmxvYWRKU09OfSB0aGUgc2FtZVxuICAgICAqIG9wdGlvbnMgdXNlZCB0byBjcmVhdGUgdGhlIG9yaWdpbmFsIGluc3RhbmNlIHRoYXQgd2FzIHNlcmlhbGl6ZWQuXG4gICAgICpcbiAgICAgKiAjIyMgVXNhZ2U6XG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogLy8gU2VyaWFsaXplIHRoZSBpbmRleDpcbiAgICAgKiBsZXQgbWluaVNlYXJjaCA9IG5ldyBNaW5pU2VhcmNoKHsgZmllbGRzOiBbJ3RpdGxlJywgJ3RleHQnXSB9KVxuICAgICAqIG1pbmlTZWFyY2guYWRkQWxsKGRvY3VtZW50cylcbiAgICAgKiBjb25zdCBqc29uID0gSlNPTi5zdHJpbmdpZnkobWluaVNlYXJjaClcbiAgICAgKlxuICAgICAqIC8vIExhdGVyLCB0byBkZXNlcmlhbGl6ZSBpdDpcbiAgICAgKiBtaW5pU2VhcmNoID0gTWluaVNlYXJjaC5sb2FkSlNPTihqc29uLCB7IGZpZWxkczogWyd0aXRsZScsICd0ZXh0J10gfSlcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEByZXR1cm4gQSBwbGFpbi1vYmplY3Qgc2VyaWFsaXphYmxlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBzZWFyY2ggaW5kZXguXG4gICAgICovXG4gICAgdG9KU09OKCkge1xuICAgICAgICBjb25zdCBpbmRleCA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IFt0ZXJtLCBmaWVsZEluZGV4XSBvZiB0aGlzLl9pbmRleCkge1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHt9O1xuICAgICAgICAgICAgZm9yIChjb25zdCBbZmllbGRJZCwgZnJlcXNdIG9mIGZpZWxkSW5kZXgpIHtcbiAgICAgICAgICAgICAgICBkYXRhW2ZpZWxkSWRdID0gT2JqZWN0LmZyb21FbnRyaWVzKGZyZXFzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluZGV4LnB1c2goW3Rlcm0sIGRhdGFdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZG9jdW1lbnRDb3VudDogdGhpcy5fZG9jdW1lbnRDb3VudCxcbiAgICAgICAgICAgIG5leHRJZDogdGhpcy5fbmV4dElkLFxuICAgICAgICAgICAgZG9jdW1lbnRJZHM6IE9iamVjdC5mcm9tRW50cmllcyh0aGlzLl9kb2N1bWVudElkcyksXG4gICAgICAgICAgICBmaWVsZElkczogdGhpcy5fZmllbGRJZHMsXG4gICAgICAgICAgICBmaWVsZExlbmd0aDogT2JqZWN0LmZyb21FbnRyaWVzKHRoaXMuX2ZpZWxkTGVuZ3RoKSxcbiAgICAgICAgICAgIGF2ZXJhZ2VGaWVsZExlbmd0aDogdGhpcy5fYXZnRmllbGRMZW5ndGgsXG4gICAgICAgICAgICBzdG9yZWRGaWVsZHM6IE9iamVjdC5mcm9tRW50cmllcyh0aGlzLl9zdG9yZWRGaWVsZHMpLFxuICAgICAgICAgICAgZGlydENvdW50OiB0aGlzLl9kaXJ0Q291bnQsXG4gICAgICAgICAgICBpbmRleCxcbiAgICAgICAgICAgIHNlcmlhbGl6YXRpb25WZXJzaW9uOiAyXG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICB0ZXJtUmVzdWx0cyhzb3VyY2VUZXJtLCBkZXJpdmVkVGVybSwgdGVybVdlaWdodCwgdGVybUJvb3N0LCBmaWVsZFRlcm1EYXRhLCBmaWVsZEJvb3N0cywgYm9vc3REb2N1bWVudEZuLCBibTI1cGFyYW1zLCByZXN1bHRzID0gbmV3IE1hcCgpKSB7XG4gICAgICAgIGlmIChmaWVsZFRlcm1EYXRhID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgZm9yIChjb25zdCBmaWVsZCBvZiBPYmplY3Qua2V5cyhmaWVsZEJvb3N0cykpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkQm9vc3QgPSBmaWVsZEJvb3N0c1tmaWVsZF07XG4gICAgICAgICAgICBjb25zdCBmaWVsZElkID0gdGhpcy5fZmllbGRJZHNbZmllbGRdO1xuICAgICAgICAgICAgY29uc3QgZmllbGRUZXJtRnJlcXMgPSBmaWVsZFRlcm1EYXRhLmdldChmaWVsZElkKTtcbiAgICAgICAgICAgIGlmIChmaWVsZFRlcm1GcmVxcyA9PSBudWxsKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgbGV0IG1hdGNoaW5nRmllbGRzID0gZmllbGRUZXJtRnJlcXMuc2l6ZTtcbiAgICAgICAgICAgIGNvbnN0IGF2Z0ZpZWxkTGVuZ3RoID0gdGhpcy5fYXZnRmllbGRMZW5ndGhbZmllbGRJZF07XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGRvY0lkIG9mIGZpZWxkVGVybUZyZXFzLmtleXMoKSkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fZG9jdW1lbnRJZHMuaGFzKGRvY0lkKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVRlcm0oZmllbGRJZCwgZG9jSWQsIGRlcml2ZWRUZXJtKTtcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hpbmdGaWVsZHMgLT0gMTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGRvY0Jvb3N0ID0gYm9vc3REb2N1bWVudEZuID8gYm9vc3REb2N1bWVudEZuKHRoaXMuX2RvY3VtZW50SWRzLmdldChkb2NJZCksIGRlcml2ZWRUZXJtLCB0aGlzLl9zdG9yZWRGaWVsZHMuZ2V0KGRvY0lkKSkgOiAxO1xuICAgICAgICAgICAgICAgIGlmICghZG9jQm9vc3QpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRlcm1GcmVxID0gZmllbGRUZXJtRnJlcXMuZ2V0KGRvY0lkKTtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWVsZExlbmd0aCA9IHRoaXMuX2ZpZWxkTGVuZ3RoLmdldChkb2NJZClbZmllbGRJZF07XG4gICAgICAgICAgICAgICAgLy8gTk9URTogVGhlIHRvdGFsIG51bWJlciBvZiBmaWVsZHMgaXMgc2V0IHRvIHRoZSBudW1iZXIgb2YgZG9jdW1lbnRzXG4gICAgICAgICAgICAgICAgLy8gYHRoaXMuX2RvY3VtZW50Q291bnRgLiBJdCBjb3VsZCBhbHNvIG1ha2Ugc2Vuc2UgdG8gdXNlIHRoZSBudW1iZXIgb2ZcbiAgICAgICAgICAgICAgICAvLyBkb2N1bWVudHMgd2hlcmUgdGhlIGN1cnJlbnQgZmllbGQgaXMgbm9uLWJsYW5rIGFzIGEgbm9ybWFsaXphdGlvblxuICAgICAgICAgICAgICAgIC8vIGZhY3Rvci4gVGhpcyB3aWxsIG1ha2UgYSBkaWZmZXJlbmNlIGluIHNjb3JpbmcgaWYgdGhlIGZpZWxkIGlzIHJhcmVseVxuICAgICAgICAgICAgICAgIC8vIHByZXNlbnQuIFRoaXMgaXMgY3VycmVudGx5IG5vdCBzdXBwb3J0ZWQsIGFuZCBtYXkgcmVxdWlyZSBmdXJ0aGVyXG4gICAgICAgICAgICAgICAgLy8gYW5hbHlzaXMgdG8gc2VlIGlmIGl0IGlzIGEgdmFsaWQgdXNlIGNhc2UuXG4gICAgICAgICAgICAgICAgY29uc3QgcmF3U2NvcmUgPSBjYWxjQk0yNVNjb3JlKHRlcm1GcmVxLCBtYXRjaGluZ0ZpZWxkcywgdGhpcy5fZG9jdW1lbnRDb3VudCwgZmllbGRMZW5ndGgsIGF2Z0ZpZWxkTGVuZ3RoLCBibTI1cGFyYW1zKTtcbiAgICAgICAgICAgICAgICBjb25zdCB3ZWlnaHRlZFNjb3JlID0gdGVybVdlaWdodCAqIHRlcm1Cb29zdCAqIGZpZWxkQm9vc3QgKiBkb2NCb29zdCAqIHJhd1Njb3JlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlc3VsdHMuZ2V0KGRvY0lkKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zY29yZSArPSB3ZWlnaHRlZFNjb3JlO1xuICAgICAgICAgICAgICAgICAgICBhc3NpZ25VbmlxdWVUZXJtKHJlc3VsdC50ZXJtcywgc291cmNlVGVybSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gZ2V0T3duUHJvcGVydHkocmVzdWx0Lm1hdGNoLCBkZXJpdmVkVGVybSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2gucHVzaChmaWVsZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQubWF0Y2hbZGVyaXZlZFRlcm1dID0gW2ZpZWxkXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5zZXQoZG9jSWQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlOiB3ZWlnaHRlZFNjb3JlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVybXM6IFtzb3VyY2VUZXJtXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoOiB7IFtkZXJpdmVkVGVybV06IFtmaWVsZF0gfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBhZGRUZXJtKGZpZWxkSWQsIGRvY3VtZW50SWQsIHRlcm0pIHtcbiAgICAgICAgY29uc3QgaW5kZXhEYXRhID0gdGhpcy5faW5kZXguZmV0Y2godGVybSwgY3JlYXRlTWFwKTtcbiAgICAgICAgbGV0IGZpZWxkSW5kZXggPSBpbmRleERhdGEuZ2V0KGZpZWxkSWQpO1xuICAgICAgICBpZiAoZmllbGRJbmRleCA9PSBudWxsKSB7XG4gICAgICAgICAgICBmaWVsZEluZGV4ID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgZmllbGRJbmRleC5zZXQoZG9jdW1lbnRJZCwgMSk7XG4gICAgICAgICAgICBpbmRleERhdGEuc2V0KGZpZWxkSWQsIGZpZWxkSW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZG9jcyA9IGZpZWxkSW5kZXguZ2V0KGRvY3VtZW50SWQpO1xuICAgICAgICAgICAgZmllbGRJbmRleC5zZXQoZG9jdW1lbnRJZCwgKGRvY3MgfHwgMCkgKyAxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgcmVtb3ZlVGVybShmaWVsZElkLCBkb2N1bWVudElkLCB0ZXJtKSB7XG4gICAgICAgIGlmICghdGhpcy5faW5kZXguaGFzKHRlcm0pKSB7XG4gICAgICAgICAgICB0aGlzLndhcm5Eb2N1bWVudENoYW5nZWQoZG9jdW1lbnRJZCwgZmllbGRJZCwgdGVybSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaW5kZXhEYXRhID0gdGhpcy5faW5kZXguZmV0Y2godGVybSwgY3JlYXRlTWFwKTtcbiAgICAgICAgY29uc3QgZmllbGRJbmRleCA9IGluZGV4RGF0YS5nZXQoZmllbGRJZCk7XG4gICAgICAgIGlmIChmaWVsZEluZGV4ID09IG51bGwgfHwgZmllbGRJbmRleC5nZXQoZG9jdW1lbnRJZCkgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy53YXJuRG9jdW1lbnRDaGFuZ2VkKGRvY3VtZW50SWQsIGZpZWxkSWQsIHRlcm0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGZpZWxkSW5kZXguZ2V0KGRvY3VtZW50SWQpIDw9IDEpIHtcbiAgICAgICAgICAgIGlmIChmaWVsZEluZGV4LnNpemUgPD0gMSkge1xuICAgICAgICAgICAgICAgIGluZGV4RGF0YS5kZWxldGUoZmllbGRJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmaWVsZEluZGV4LmRlbGV0ZShkb2N1bWVudElkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZpZWxkSW5kZXguc2V0KGRvY3VtZW50SWQsIGZpZWxkSW5kZXguZ2V0KGRvY3VtZW50SWQpIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2luZGV4LmdldCh0ZXJtKS5zaXplID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9pbmRleC5kZWxldGUodGVybSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHdhcm5Eb2N1bWVudENoYW5nZWQoc2hvcnREb2N1bWVudElkLCBmaWVsZElkLCB0ZXJtKSB7XG4gICAgICAgIGZvciAoY29uc3QgZmllbGROYW1lIG9mIE9iamVjdC5rZXlzKHRoaXMuX2ZpZWxkSWRzKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2ZpZWxkSWRzW2ZpZWxkTmFtZV0gPT09IGZpZWxkSWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zLmxvZ2dlcignd2FybicsIGBNaW5pU2VhcmNoOiBkb2N1bWVudCB3aXRoIElEICR7dGhpcy5fZG9jdW1lbnRJZHMuZ2V0KHNob3J0RG9jdW1lbnRJZCl9IGhhcyBjaGFuZ2VkIGJlZm9yZSByZW1vdmFsOiB0ZXJtIFwiJHt0ZXJtfVwiIHdhcyBub3QgcHJlc2VudCBpbiBmaWVsZCBcIiR7ZmllbGROYW1lfVwiLiBSZW1vdmluZyBhIGRvY3VtZW50IGFmdGVyIGl0IGhhcyBjaGFuZ2VkIGNhbiBjb3JydXB0IHRoZSBpbmRleCFgLCAndmVyc2lvbl9jb25mbGljdCcpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgYWRkRG9jdW1lbnRJZChkb2N1bWVudElkKSB7XG4gICAgICAgIGNvbnN0IHNob3J0RG9jdW1lbnRJZCA9IHRoaXMuX25leHRJZDtcbiAgICAgICAgdGhpcy5faWRUb1Nob3J0SWQuc2V0KGRvY3VtZW50SWQsIHNob3J0RG9jdW1lbnRJZCk7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50SWRzLnNldChzaG9ydERvY3VtZW50SWQsIGRvY3VtZW50SWQpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudENvdW50ICs9IDE7XG4gICAgICAgIHRoaXMuX25leHRJZCArPSAxO1xuICAgICAgICByZXR1cm4gc2hvcnREb2N1bWVudElkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgYWRkRmllbGRzKGZpZWxkcykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpZWxkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5fZmllbGRJZHNbZmllbGRzW2ldXSA9IGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIGFkZEZpZWxkTGVuZ3RoKGRvY3VtZW50SWQsIGZpZWxkSWQsIGNvdW50LCBsZW5ndGgpIHtcbiAgICAgICAgbGV0IGZpZWxkTGVuZ3RocyA9IHRoaXMuX2ZpZWxkTGVuZ3RoLmdldChkb2N1bWVudElkKTtcbiAgICAgICAgaWYgKGZpZWxkTGVuZ3RocyA9PSBudWxsKVxuICAgICAgICAgICAgdGhpcy5fZmllbGRMZW5ndGguc2V0KGRvY3VtZW50SWQsIGZpZWxkTGVuZ3RocyA9IFtdKTtcbiAgICAgICAgZmllbGRMZW5ndGhzW2ZpZWxkSWRdID0gbGVuZ3RoO1xuICAgICAgICBjb25zdCBhdmVyYWdlRmllbGRMZW5ndGggPSB0aGlzLl9hdmdGaWVsZExlbmd0aFtmaWVsZElkXSB8fCAwO1xuICAgICAgICBjb25zdCB0b3RhbEZpZWxkTGVuZ3RoID0gKGF2ZXJhZ2VGaWVsZExlbmd0aCAqIGNvdW50KSArIGxlbmd0aDtcbiAgICAgICAgdGhpcy5fYXZnRmllbGRMZW5ndGhbZmllbGRJZF0gPSB0b3RhbEZpZWxkTGVuZ3RoIC8gKGNvdW50ICsgMSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICByZW1vdmVGaWVsZExlbmd0aChkb2N1bWVudElkLCBmaWVsZElkLCBjb3VudCwgbGVuZ3RoKSB7XG4gICAgICAgIGlmIChjb3VudCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5fYXZnRmllbGRMZW5ndGhbZmllbGRJZF0gPSAwO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRvdGFsRmllbGRMZW5ndGggPSAodGhpcy5fYXZnRmllbGRMZW5ndGhbZmllbGRJZF0gKiBjb3VudCkgLSBsZW5ndGg7XG4gICAgICAgIHRoaXMuX2F2Z0ZpZWxkTGVuZ3RoW2ZpZWxkSWRdID0gdG90YWxGaWVsZExlbmd0aCAvIChjb3VudCAtIDEpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgc2F2ZVN0b3JlZEZpZWxkcyhkb2N1bWVudElkLCBkb2MpIHtcbiAgICAgICAgY29uc3QgeyBzdG9yZUZpZWxkcywgZXh0cmFjdEZpZWxkIH0gPSB0aGlzLl9vcHRpb25zO1xuICAgICAgICBpZiAoc3RvcmVGaWVsZHMgPT0gbnVsbCB8fCBzdG9yZUZpZWxkcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZG9jdW1lbnRGaWVsZHMgPSB0aGlzLl9zdG9yZWRGaWVsZHMuZ2V0KGRvY3VtZW50SWQpO1xuICAgICAgICBpZiAoZG9jdW1lbnRGaWVsZHMgPT0gbnVsbClcbiAgICAgICAgICAgIHRoaXMuX3N0b3JlZEZpZWxkcy5zZXQoZG9jdW1lbnRJZCwgZG9jdW1lbnRGaWVsZHMgPSB7fSk7XG4gICAgICAgIGZvciAoY29uc3QgZmllbGROYW1lIG9mIHN0b3JlRmllbGRzKSB7XG4gICAgICAgICAgICBjb25zdCBmaWVsZFZhbHVlID0gZXh0cmFjdEZpZWxkKGRvYywgZmllbGROYW1lKTtcbiAgICAgICAgICAgIGlmIChmaWVsZFZhbHVlICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgZG9jdW1lbnRGaWVsZHNbZmllbGROYW1lXSA9IGZpZWxkVmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIFRoZSBzcGVjaWFsIHdpbGRjYXJkIHN5bWJvbCB0aGF0IGNhbiBiZSBwYXNzZWQgdG8ge0BsaW5rIE1pbmlTZWFyY2gjc2VhcmNofVxuICogdG8gbWF0Y2ggYWxsIGRvY3VtZW50c1xuICovXG5NaW5pU2VhcmNoLndpbGRjYXJkID0gU3ltYm9sKCcqJyk7XG5jb25zdCBnZXRPd25Qcm9wZXJ0eSA9IChvYmplY3QsIHByb3BlcnR5KSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSkgPyBvYmplY3RbcHJvcGVydHldIDogdW5kZWZpbmVkO1xuY29uc3QgY29tYmluYXRvcnMgPSB7XG4gICAgW09SXTogKGEsIGIpID0+IHtcbiAgICAgICAgZm9yIChjb25zdCBkb2NJZCBvZiBiLmtleXMoKSkge1xuICAgICAgICAgICAgY29uc3QgZXhpc3RpbmcgPSBhLmdldChkb2NJZCk7XG4gICAgICAgICAgICBpZiAoZXhpc3RpbmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGEuc2V0KGRvY0lkLCBiLmdldChkb2NJZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBzY29yZSwgdGVybXMsIG1hdGNoIH0gPSBiLmdldChkb2NJZCk7XG4gICAgICAgICAgICAgICAgZXhpc3Rpbmcuc2NvcmUgPSBleGlzdGluZy5zY29yZSArIHNjb3JlO1xuICAgICAgICAgICAgICAgIGV4aXN0aW5nLm1hdGNoID0gT2JqZWN0LmFzc2lnbihleGlzdGluZy5tYXRjaCwgbWF0Y2gpO1xuICAgICAgICAgICAgICAgIGFzc2lnblVuaXF1ZVRlcm1zKGV4aXN0aW5nLnRlcm1zLCB0ZXJtcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfSxcbiAgICBbQU5EXTogKGEsIGIpID0+IHtcbiAgICAgICAgY29uc3QgY29tYmluZWQgPSBuZXcgTWFwKCk7XG4gICAgICAgIGZvciAoY29uc3QgZG9jSWQgb2YgYi5rZXlzKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nID0gYS5nZXQoZG9jSWQpO1xuICAgICAgICAgICAgaWYgKGV4aXN0aW5nID09IG51bGwpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBjb25zdCB7IHNjb3JlLCB0ZXJtcywgbWF0Y2ggfSA9IGIuZ2V0KGRvY0lkKTtcbiAgICAgICAgICAgIGFzc2lnblVuaXF1ZVRlcm1zKGV4aXN0aW5nLnRlcm1zLCB0ZXJtcyk7XG4gICAgICAgICAgICBjb21iaW5lZC5zZXQoZG9jSWQsIHtcbiAgICAgICAgICAgICAgICBzY29yZTogZXhpc3Rpbmcuc2NvcmUgKyBzY29yZSxcbiAgICAgICAgICAgICAgICB0ZXJtczogZXhpc3RpbmcudGVybXMsXG4gICAgICAgICAgICAgICAgbWF0Y2g6IE9iamVjdC5hc3NpZ24oZXhpc3RpbmcubWF0Y2gsIG1hdGNoKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbWJpbmVkO1xuICAgIH0sXG4gICAgW0FORF9OT1RdOiAoYSwgYikgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IGRvY0lkIG9mIGIua2V5cygpKVxuICAgICAgICAgICAgYS5kZWxldGUoZG9jSWQpO1xuICAgICAgICByZXR1cm4gYTtcbiAgICB9XG59O1xuY29uc3QgZGVmYXVsdEJNMjVwYXJhbXMgPSB7IGs6IDEuMiwgYjogMC43LCBkOiAwLjUgfTtcbmNvbnN0IGNhbGNCTTI1U2NvcmUgPSAodGVybUZyZXEsIG1hdGNoaW5nQ291bnQsIHRvdGFsQ291bnQsIGZpZWxkTGVuZ3RoLCBhdmdGaWVsZExlbmd0aCwgYm0yNXBhcmFtcykgPT4ge1xuICAgIGNvbnN0IHsgaywgYiwgZCB9ID0gYm0yNXBhcmFtcztcbiAgICBjb25zdCBpbnZEb2NGcmVxID0gTWF0aC5sb2coMSArICh0b3RhbENvdW50IC0gbWF0Y2hpbmdDb3VudCArIDAuNSkgLyAobWF0Y2hpbmdDb3VudCArIDAuNSkpO1xuICAgIHJldHVybiBpbnZEb2NGcmVxICogKGQgKyB0ZXJtRnJlcSAqIChrICsgMSkgLyAodGVybUZyZXEgKyBrICogKDEgLSBiICsgYiAqIGZpZWxkTGVuZ3RoIC8gYXZnRmllbGRMZW5ndGgpKSk7XG59O1xuY29uc3QgdGVybVRvUXVlcnlTcGVjID0gKG9wdGlvbnMpID0+ICh0ZXJtLCBpLCB0ZXJtcykgPT4ge1xuICAgIGNvbnN0IGZ1enp5ID0gKHR5cGVvZiBvcHRpb25zLmZ1enp5ID09PSAnZnVuY3Rpb24nKVxuICAgICAgICA/IG9wdGlvbnMuZnV6enkodGVybSwgaSwgdGVybXMpXG4gICAgICAgIDogKG9wdGlvbnMuZnV6enkgfHwgZmFsc2UpO1xuICAgIGNvbnN0IHByZWZpeCA9ICh0eXBlb2Ygb3B0aW9ucy5wcmVmaXggPT09ICdmdW5jdGlvbicpXG4gICAgICAgID8gb3B0aW9ucy5wcmVmaXgodGVybSwgaSwgdGVybXMpXG4gICAgICAgIDogKG9wdGlvbnMucHJlZml4ID09PSB0cnVlKTtcbiAgICBjb25zdCB0ZXJtQm9vc3QgPSAodHlwZW9mIG9wdGlvbnMuYm9vc3RUZXJtID09PSAnZnVuY3Rpb24nKVxuICAgICAgICA/IG9wdGlvbnMuYm9vc3RUZXJtKHRlcm0sIGksIHRlcm1zKVxuICAgICAgICA6IDE7XG4gICAgcmV0dXJuIHsgdGVybSwgZnV6enksIHByZWZpeCwgdGVybUJvb3N0IH07XG59O1xuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgaWRGaWVsZDogJ2lkJyxcbiAgICBleHRyYWN0RmllbGQ6IChkb2N1bWVudCwgZmllbGROYW1lKSA9PiBkb2N1bWVudFtmaWVsZE5hbWVdLFxuICAgIHRva2VuaXplOiAodGV4dCkgPT4gdGV4dC5zcGxpdChTUEFDRV9PUl9QVU5DVFVBVElPTiksXG4gICAgcHJvY2Vzc1Rlcm06ICh0ZXJtKSA9PiB0ZXJtLnRvTG93ZXJDYXNlKCksXG4gICAgZmllbGRzOiB1bmRlZmluZWQsXG4gICAgc2VhcmNoT3B0aW9uczogdW5kZWZpbmVkLFxuICAgIHN0b3JlRmllbGRzOiBbXSxcbiAgICBsb2dnZXI6IChsZXZlbCwgbWVzc2FnZSkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIChjb25zb2xlID09PSBudWxsIHx8IGNvbnNvbGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbnNvbGVbbGV2ZWxdKSA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgIGNvbnNvbGVbbGV2ZWxdKG1lc3NhZ2UpO1xuICAgIH0sXG4gICAgYXV0b1ZhY3V1bTogdHJ1ZVxufTtcbmNvbnN0IGRlZmF1bHRTZWFyY2hPcHRpb25zID0ge1xuICAgIGNvbWJpbmVXaXRoOiBPUixcbiAgICBwcmVmaXg6IGZhbHNlLFxuICAgIGZ1enp5OiBmYWxzZSxcbiAgICBtYXhGdXp6eTogNixcbiAgICBib29zdDoge30sXG4gICAgd2VpZ2h0czogeyBmdXp6eTogMC40NSwgcHJlZml4OiAwLjM3NSB9LFxuICAgIGJtMjU6IGRlZmF1bHRCTTI1cGFyYW1zXG59O1xuY29uc3QgZGVmYXVsdEF1dG9TdWdnZXN0T3B0aW9ucyA9IHtcbiAgICBjb21iaW5lV2l0aDogQU5ELFxuICAgIHByZWZpeDogKHRlcm0sIGksIHRlcm1zKSA9PiBpID09PSB0ZXJtcy5sZW5ndGggLSAxXG59O1xuY29uc3QgZGVmYXVsdFZhY3V1bU9wdGlvbnMgPSB7IGJhdGNoU2l6ZTogMTAwMCwgYmF0Y2hXYWl0OiAxMCB9O1xuY29uc3QgZGVmYXVsdFZhY3V1bUNvbmRpdGlvbnMgPSB7IG1pbkRpcnRGYWN0b3I6IDAuMSwgbWluRGlydENvdW50OiAyMCB9O1xuY29uc3QgZGVmYXVsdEF1dG9WYWN1dW1PcHRpb25zID0geyAuLi5kZWZhdWx0VmFjdXVtT3B0aW9ucywgLi4uZGVmYXVsdFZhY3V1bUNvbmRpdGlvbnMgfTtcbmNvbnN0IGFzc2lnblVuaXF1ZVRlcm0gPSAodGFyZ2V0LCB0ZXJtKSA9PiB7XG4gICAgLy8gQXZvaWQgYWRkaW5nIGR1cGxpY2F0ZSB0ZXJtcy5cbiAgICBpZiAoIXRhcmdldC5pbmNsdWRlcyh0ZXJtKSlcbiAgICAgICAgdGFyZ2V0LnB1c2godGVybSk7XG59O1xuY29uc3QgYXNzaWduVW5pcXVlVGVybXMgPSAodGFyZ2V0LCBzb3VyY2UpID0+IHtcbiAgICBmb3IgKGNvbnN0IHRlcm0gb2Ygc291cmNlKSB7XG4gICAgICAgIC8vIEF2b2lkIGFkZGluZyBkdXBsaWNhdGUgdGVybXMuXG4gICAgICAgIGlmICghdGFyZ2V0LmluY2x1ZGVzKHRlcm0pKVxuICAgICAgICAgICAgdGFyZ2V0LnB1c2godGVybSk7XG4gICAgfVxufTtcbmNvbnN0IGJ5U2NvcmUgPSAoeyBzY29yZTogYSB9LCB7IHNjb3JlOiBiIH0pID0+IGIgLSBhO1xuY29uc3QgY3JlYXRlTWFwID0gKCkgPT4gbmV3IE1hcCgpO1xuY29uc3Qgb2JqZWN0VG9OdW1lcmljTWFwID0gKG9iamVjdCkgPT4ge1xuICAgIGNvbnN0IG1hcCA9IG5ldyBNYXAoKTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhvYmplY3QpKSB7XG4gICAgICAgIG1hcC5zZXQocGFyc2VJbnQoa2V5LCAxMCksIG9iamVjdFtrZXldKTtcbiAgICB9XG4gICAgcmV0dXJuIG1hcDtcbn07XG5jb25zdCBvYmplY3RUb051bWVyaWNNYXBBc3luYyA9IGFzeW5jIChvYmplY3QpID0+IHtcbiAgICBjb25zdCBtYXAgPSBuZXcgTWFwKCk7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhvYmplY3QpKSB7XG4gICAgICAgIG1hcC5zZXQocGFyc2VJbnQoa2V5LCAxMCksIG9iamVjdFtrZXldKTtcbiAgICAgICAgaWYgKCsrY291bnQgJSAxMDAwID09PSAwKSB7XG4gICAgICAgICAgICBhd2FpdCB3YWl0KDApO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtYXA7XG59O1xuY29uc3Qgd2FpdCA9IChtcykgPT4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcbi8vIFRoaXMgcmVndWxhciBleHByZXNzaW9uIG1hdGNoZXMgYW55IFVuaWNvZGUgc3BhY2UsIG5ld2xpbmUsIG9yIHB1bmN0dWF0aW9uXG4vLyBjaGFyYWN0ZXJcbmNvbnN0IFNQQUNFX09SX1BVTkNUVUFUSU9OID0gL1tcXG5cXHJcXHB7Wn1cXHB7UH1dKy91O1xuXG5leHBvcnQgeyBNaW5pU2VhcmNoIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcFxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgTWluaVNlYXJjaCBmcm9tICdtaW5pc2VhcmNoJztcclxuXHJcbi8qKlxyXG4gKiBDb25zdGFudHNcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogTE9DQUxfSU5ERVhfSUQ6IEtleSBmb3Igc3RvcmluZyB0aGUgc2VhcmNoIGluZGV4IGluIENocm9tZSdzIGxvY2FsIHN0b3JhZ2VcclxuICovXHJcbmV4cG9ydCBjb25zdCBMT0NBTF9JTkRFWF9JRCA9ICdsb2NhbFNlYXJjaEluZGV4JztcclxuXHJcbi8qKlxyXG4gKiBEZWJ1ZyBVdGlsaXRpZXNcclxuICogLS0tLS0tLS0tLS0tLS1cclxuICogRnVuY3Rpb25zIGZvciBkZWJ1Z2dpbmcgYW5kIGRldmVsb3BtZW50LlxyXG4gKi9cclxuZnVuY3Rpb24gZXhwb3J0U3RvcmFnZVRvRmlsZSgpIHtcclxuICBjb25zb2xlLmxvZygnU3RhcnRpbmcgZXhwb3J0Li4uJyk7XHJcbiAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KExPQ0FMX0lOREVYX0lELCAoZGF0YSkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coJ1JldHJpZXZlZCBkYXRhOicsIGRhdGEpO1xyXG4gICAgY29uc3QganNvblN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGRhdGEsIG51bGwsIDIpO1xyXG4gICAgY29uc3QgZGF0YVVybCA9IGBkYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LCR7YnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoanNvblN0cmluZykpKX1gO1xyXG5cclxuICAgIGNocm9tZS5kb3dubG9hZHMuZG93bmxvYWQoe1xyXG4gICAgICB1cmw6IGRhdGFVcmwsXHJcbiAgICAgIGZpbGVuYW1lOiAnaGF3a19pbmRleF9iYWNrdXAuanNvbicsXHJcbiAgICAgIHNhdmVBczogdHJ1ZSxcclxuICAgIH0sIChkb3dubG9hZElkKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdEb3dubG9hZCBzdGFydGVkIHdpdGggSUQ6JywgZG93bmxvYWRJZCk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG5cclxuLy8gTWFrZSBleHBvcnQgZnVuY3Rpb24gYXZhaWxhYmxlIGdsb2JhbGx5XHJcbmdsb2JhbFRoaXMuZXhwb3J0SW5kZXggPSBleHBvcnRTdG9yYWdlVG9GaWxlO1xyXG5cclxuLy8gQWxzbyBhZGQgdG8gY2hyb21lIG9iamVjdCBmb3Igc2VydmljZSB3b3JrZXIgY29udGV4dFxyXG5jaHJvbWUuZXhwb3J0SW5kZXggPSBleHBvcnRTdG9yYWdlVG9GaWxlO1xyXG5cclxuLyoqXHJcbiAqIFNlYXJjaCBJbmRleCBNYW5hZ2VtZW50XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogSGFuZGxlcyBjcmVhdGluZywgbG9hZGluZywgYW5kIG1haW50YWluaW5nIHRoZSBzZWFyY2ggaW5kZXguXHJcbiAqL1xyXG5jb25zdCBjcmVhdGVJbmRleCA9IChleGlzdGluZ0luZGV4KSA9PiB7XHJcbiAgY29uc3Qgc3RvcFdvcmRzID0gWydpJywgJ21lJywgJ215JywgJ215c2VsZicsICd3ZScsICdvdXInLCAnb3VycycsICdvdXJzZWx2ZXMnLCAneW91JywgJ3lvdXInLCAneW91cnMnLCAneW91cnNlbGYnLCAneW91cnNlbHZlcycsICdoZScsICdoaW0nLCAnaGlzJywgJ2hpbXNlbGYnLCAnc2hlJywgJ2hlcicsICdoZXJzJywgJ2hlcnNlbGYnLCAnaXQnLCAnaXRzJywgJ2l0c2VsZicsICd0aGV5JywgJ3RoZW0nLCAndGhlaXInLCAndGhlaXJzJywgJ3RoZW1zZWx2ZXMnLCAnd2hhdCcsICd3aGljaCcsICd3aG8nLCAnd2hvbScsICd0aGlzJywgJ3RoYXQnLCAndGhlc2UnLCAndGhvc2UnLCAnYW0nLCAnaXMnLCAnYXJlJywgJ3dhcycsICd3ZXJlJywgJ2JlJywgJ2JlZW4nLCAnYmVpbmcnLCAnaGF2ZScsICdoYXMnLCAnaGFkJywgJ2hhdmluZycsICdkbycsICdkb2VzJywgJ2RpZCcsICdkb2luZycsICdhJywgJ2FuJywgJ3RoZScsICdhbmQnLCAnYnV0JywgJ2lmJywgJ29yJywgJ2JlY2F1c2UnLCAnYXMnLCAndW50aWwnLCAnd2hpbGUnLCAnb2YnLCAnYXQnLCAnYnknLCAnZm9yJywgJ3dpdGgnLCAnYWJvdXQnLCAnYWdhaW5zdCcsICdiZXR3ZWVuJywgJ2ludG8nLCAndGhyb3VnaCcsICdkdXJpbmcnLCAnYmVmb3JlJywgJ2FmdGVyJywgJ2Fib3ZlJywgJ2JlbG93JywgJ3RvJywgJ2Zyb20nLCAndXAnLCAnZG93bicsICdpbicsICdvdXQnLCAnb24nLCAnb2ZmJywgJ292ZXInLCAndW5kZXInLCAnYWdhaW4nLCAnZnVydGhlcicsICd0aGVuJywgJ29uY2UnLCAnaGVyZScsICd0aGVyZScsICd3aGVuJywgJ3doZXJlJywgJ3doeScsICdob3cnLCAnYWxsJywgJ2FueScsICdib3RoJywgJ2VhY2gnLCAnZmV3JywgJ21vcmUnLCAnbW9zdCcsICdvdGhlcicsICdzb21lJywgJ3N1Y2gnLCAnbm8nLCAnbm9yJywgJ25vdCcsICdvbmx5JywgJ293bicsICdzYW1lJywgJ3NvJywgJ3RoYW4nLCAndG9vJywgJ3ZlcnknLCAncycsICd0JywgJ2NhbicsICd3aWxsJywgJ2p1c3QnLCAnZG9uJywgJ3Nob3VsZCcsICdub3cnXTtcclxuXHJcbiAgY29uc3QgaW5kZXhEZXNjcmlwdG9yID0ge1xyXG4gICAgZmllbGRzOiBbJ3RpdGxlJywgJ2FsbFRleHQnXSxcclxuICAgIHN0b3JlRmllbGRzOiBbJ3RpdGxlJ10sXHJcbiAgICBpZEZpZWxkOiAnaWQnLFxyXG4gICAgcHJvY2Vzc1Rlcm06ICh0ZXJtLCBfZmllbGROYW1lKSA9PiAoc3RvcFdvcmRzLmluY2x1ZGVzKHRlcm0pID8gbnVsbCA6IHRlcm0udG9Mb3dlckNhc2UoKSksXHJcbiAgICBzZWFyY2hPcHRpb25zOiB7XHJcbiAgICAgIHByb2Nlc3NUZXJtOiAodGVybSkgPT4gdGVybS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgfSxcclxuICB9O1xyXG4gIGxldCBpbmRleGVyO1xyXG4gIGlmIChleGlzdGluZ0luZGV4ID09PSB1bmRlZmluZWQpIHtcclxuICAgIGluZGV4ZXIgPSBuZXcgTWluaVNlYXJjaChpbmRleERlc2NyaXB0b3IpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBpbmRleGVyID0gTWluaVNlYXJjaC5sb2FkSlNPTihleGlzdGluZ0luZGV4LCBpbmRleERlc2NyaXB0b3IpO1xyXG4gIH1cclxuICByZXR1cm4gaW5kZXhlcjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yYWdlIEludGVyZmFjZVxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tXHJcbiAqIE1hbmFnZXMgcmVhZGluZy93cml0aW5nIHRoZSBpbmRleCBmcm9tIENocm9tZSdzIGxvY2FsIHN0b3JhZ2UuXHJcbiAqL1xyXG5jb25zdCBnZXRTdG9yZWRJbmRleCA9IChjYikgPT4ge1xyXG4gIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChMT0NBTF9JTkRFWF9JRCwgKGRhdGEpID0+IHsgY2IoZGF0YVtMT0NBTF9JTkRFWF9JRF0pOyB9KTtcclxufTtcclxuXHJcbmNvbnN0IHN0b3JlSW5kZXggPSAoaW5kZXhEYXRhKSA9PiB7XHJcbiAgY29uc3QgZGF0YSA9IHtcclxuICAgIFtMT0NBTF9JTkRFWF9JRF06IGluZGV4RGF0YSxcclxuICB9O1xyXG4gIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldChkYXRhLCAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhgSW5kZXggZGF0YSBzYXZlZFske2RhdGEubGVuZ3RofV1gKTtcclxuICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBJbmRleCBBY2Nlc3MgYW5kIE1hbmlwdWxhdGlvblxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogRnVuY3Rpb25zIGZvciByZXRyaWV2aW5nLCBhZGRpbmcsIGFuZCB1cGRhdGluZyBpbmRleGVkIGRvY3VtZW50cy5cclxuICovXHJcbmNvbnN0IGdldEluZGV4ID0gKCkgPT4ge1xyXG4gIGlmICghY2hyb21lLmluZGV4ZXIpIHtcclxuICAgIGluaXRpYWxpc2VJbmRleGVyKCk7XHJcbiAgfVxyXG4gIHJldHVybiBjaHJvbWUuaW5kZXhlcjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUT0RPOiBJbXBsZW1lbnQgdGhpcyBmdW5jdGlvbiB0byByZXBsYWNlIHRoZSBpbmRleGVyIGRhdGFcclxuICovXHJcbmNvbnN0IHJlcGxhY2VJbmRleGVyRGF0YSA9ICgpID0+IHtcclxuXHJcbn07XHJcblxyXG5jb25zdCBhZGRUb0luZGV4ID0gKGRvY3VtZW50KSA9PiB7XHJcbiAgY29uc3QgaWR4ID0gZ2V0SW5kZXgoKTtcclxuICBpZiAoaWR4KSB7XHJcbiAgICBjb25zb2xlLnRpbWUoYEluZGV4aW5nIERvYzoke2RvY3VtZW50LmlkfWApO1xyXG4gICAgaWYgKGlkeC5oYXMoZG9jdW1lbnQuaWQpKSB7XHJcbiAgICAgIGlkeC5yZXBsYWNlKGRvY3VtZW50KTtcclxuICAgICAgY29uc29sZS5sb2coJ1JlcGxhY2luZyBkb2MgaW4gdGhlIGluZGV4Jyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZHguYWRkKGRvY3VtZW50KTtcclxuICAgICAgY29uc29sZS5sb2coJ0FkZGluZyBuZXcgZG9jIGluIHRoZSBpbmRleCcpO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS50aW1lRW5kKGBJbmRleGluZyBEb2M6JHtkb2N1bWVudC5pZH1gKTtcclxuICAgIGNvbnNvbGUudGltZSgnU3RvcmluZyB0aGUgd2hvbGUgSW5kZXgnKTtcclxuICAgIGNvbnN0IGRhdGEgPSBKU09OLnN0cmluZ2lmeShpZHgpO1xyXG4gICAgc3RvcmVJbmRleChkYXRhKTtcclxuICAgIGNvbnNvbGUudGltZUVuZCgnU3RvcmluZyB0aGUgd2hvbGUgSW5kZXgnKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogU2VhcmNoIGFuZCBSZXN1bHRzIFByb2Nlc3NpbmdcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEhhbmRsZXMgcXVlcnlpbmcgdGhlIGluZGV4IGFuZCBmb3JtYXR0aW5nIHJlc3VsdHMuXHJcbiAqL1xyXG5jb25zdCBzZWFyY2ggPSAoZG9jdW1lbnQsIG9wdGlvbnMpID0+IHtcclxuICBjb25zdCBpZHggPSBnZXRJbmRleCgpO1xyXG4gIHJldHVybiBpZHguc2VhcmNoKGRvY3VtZW50KTtcclxufTtcclxuXHJcbmNvbnN0IHNlbmRSZXN1bHRzID0gKHNlYXJjaFF1ZXJ5LCBzZW5kUmVzcG9uc2UpID0+IHtcclxuICBjb25zdCBzZWFyY2hSZXN1bHRzID0gc2VhcmNoKHNlYXJjaFF1ZXJ5LCBudWxsKTtcclxuICBjb25zdCBzdWdnZXN0aW9ucyA9IFtdO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2VhcmNoUmVzdWx0cy5sZW5ndGggJiYgaSA8IDU7IGkrKykge1xyXG4gICAgc3VnZ2VzdGlvbnMucHVzaCh7IGNvbnRlbnQ6IHNlYXJjaFJlc3VsdHNbaV0uaWQsIGRlc2NyaXB0aW9uOiByZW1vdmVTcGVjaWFsQ2hhcmFjdGVycyhzZWFyY2hSZXN1bHRzW2ldLnRpdGxlKSB9KTtcclxuICAgIGNvbnNvbGUubG9nKHsgY29udGVudDogc2VhcmNoUmVzdWx0c1tpXS5pZCwgZGVzY3JpcHRpb246IHNlYXJjaFJlc3VsdHNbaV0udGl0bGUgfSk7XHJcbiAgfVxyXG4gIGNvbnNvbGUubG9nKGBudW1iZXJzIG9mIHN1Z2dlc3Rpb25zOiR7c3VnZ2VzdGlvbnMubGVuZ3RofWApO1xyXG4gIHNlbmRSZXNwb25zZShzdWdnZXN0aW9ucyk7XHJcbn07XHJcblxyXG4vKipcclxuICogTWVzc2FnZSBIYW5kbGluZ1xyXG4gKiAtLS0tLS0tLS0tLS0tLS1cclxuICogUHJvY2Vzc2VzIG1lc3NhZ2VzIGZyb20gY29udGVudCBzY3JpcHRzIGFuZCB0aGUgcG9wdXAuXHJcbiAqL1xyXG5jb25zdCBpbmRleGluZ0xpc3RlbmVyID0gKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XHJcbiAgaWYgKChyZXF1ZXN0LmZyb20gPT09ICdwb3B1cCcpICYmIChyZXF1ZXN0LnN1YmplY3QgPT09ICdpbmRleGVyRGF0YScpKSB7XHJcbiAgICBzZW5kUmVzcG9uc2UoY2hyb21lLnN0b3JlZEluZGV4KTtcclxuICB9IGVsc2UgaWYgKChyZXF1ZXN0LmZyb20gPT09ICdwb3B1cCcpICYmIChyZXF1ZXN0LnN1YmplY3QgPT09ICdzZXRJbmRleGVyRGF0YScpKSB7XHJcbiAgICBjb25zdCBpc1N1Y2Nlc3NmdWwgPSByZXBsYWNlSW5kZXhlckRhdGEocmVxdWVzdC5jb250ZW50KTtcclxuICB9IGVsc2UgaWYgKHJlcXVlc3QuYWN0aW9uID09PSAnZXhwb3J0SW5kZXgnKSB7XHJcbiAgICBleHBvcnRTdG9yYWdlVG9GaWxlKCk7XHJcbiAgICBzZW5kUmVzcG9uc2UoeyBzdGF0dXM6ICdleHBvcnRpbmcnIH0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhZGRUb0luZGV4KHJlcXVlc3QuZG9jdW1lbnQpO1xyXG4gICAgc2VuZFJlc3BvbnNlKCdPSzpJbmRleGVkJyk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemF0aW9uXHJcbiAqIC0tLS0tLS0tLS0tLS1cclxuICogU2V0cyB1cCB0aGUgZXh0ZW5zaW9uIGFuZCBzZWFyY2ggaW5kZXhlci5cclxuICovXHJcbmNvbnN0IGluaXRpYWxpc2VJbmRleGVyID0gKCkgPT4ge1xyXG4gIGNvbnN0IGluaXRpYWxpc2VJbmRleGVyQXN5bmMgPSAoaW5kZXhlckRhdGEpID0+IHtcclxuICAgIGlmIChpbmRleGVyRGF0YSAmJiBpbmRleGVyRGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNocm9tZS5zdG9yZWRJbmRleCA9IGluZGV4ZXJEYXRhO1xyXG4gICAgfVxyXG4gICAgY2hyb21lLmluZGV4ZXIgPSBjcmVhdGVJbmRleChjaHJvbWUuc3RvcmVkSW5kZXgpO1xyXG4gIH07XHJcbiAgZ2V0U3RvcmVkSW5kZXgoaW5pdGlhbGlzZUluZGV4ZXJBc3luYyk7XHJcbn07XHJcblxyXG4vKipcclxuICogVXRpbGl0eSBGdW5jdGlvbnNcclxuICogLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuY29uc3QgcmVtb3ZlU3BlY2lhbENoYXJhY3RlcnMgPSAoc3RyaW5nVG9CZVNhbml0aXplZCkgPT4ge1xyXG4gIGNvbnN0IHNwZWNpYWxDaGFycyA9ICchQCMkXiYlKis9W10ve318Ojw+PywuJztcclxuICBsZXQgc2FuaXRpemVkU3RyaW5nID0gc3RyaW5nVG9CZVNhbml0aXplZDsgLy8g4pyFIENyZWF0ZSBhIG5ldyB2YXJpYWJsZVxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3BlY2lhbENoYXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBzYW5pdGl6ZWRTdHJpbmcgPSBzYW5pdGl6ZWRTdHJpbmcucmVwbGFjZShuZXcgUmVnRXhwKGBcXFxcJHtzcGVjaWFsQ2hhcnNbaV19YCwgJ2dpJyksICcnKTtcclxuICB9XHJcbiAgcmV0dXJuIHNhbml0aXplZFN0cmluZztcclxufTtcclxuXHJcbi8vIEluaXRpYWxpemUgZXh0ZW5zaW9uIGFuZCBzZXQgdXAgbGlzdGVuZXJzXHJcbmluaXRpYWxpc2VJbmRleGVyKCk7XHJcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihpbmRleGluZ0xpc3RlbmVyKTtcclxuXHJcbmNocm9tZS5vbW5pYm94Lm9uSW5wdXRDaGFuZ2VkLmFkZExpc3RlbmVyKCh0ZXh0LCBzdWdnZXN0KSA9PiB7XHJcbiAgc2VuZFJlc3VsdHModGV4dCwgc3VnZ2VzdCk7XHJcbn0pO1xyXG5cclxuY2hyb21lLm9tbmlib3gub25JbnB1dEVudGVyZWQuYWRkTGlzdGVuZXIoKHRleHQsIE9uSW5wdXRFbnRlcmVkRGlzcG9zaXRpb24pID0+IHtcclxuICBjaHJvbWUudGFicy51cGRhdGUoeyB1cmw6IHRleHQgfSk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gZGVsZXRlVGFzayhhbGxUYXNrcywgdGFza0lkVG9SZW1vdmUpIHtcclxuICBjb25zdCB1cGRhdGVkVGFza3MgPSBPYmplY3QuZnJvbUVudHJpZXMoXHJcbiAgICBPYmplY3QuZW50cmllcyhhbGxUYXNrcykuZmlsdGVyKChbdGFza0lkXSkgPT4gdGFza0lkICE9PSB0YXNrSWRUb1JlbW92ZSksXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgZmluYWxUYXNrcyA9IE9iamVjdC5rZXlzKHVwZGF0ZWRUYXNrcykubGVuZ3RoID09PSAwID8ge30gOiB1cGRhdGVkVGFza3M7IC8vIOKchSBDcmVhdGUgbmV3IHZhcmlhYmxlXHJcblxyXG4gIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7IHRhc2tzOiBmaW5hbFRhc2tzIH0sICgpID0+IHt9KTtcclxufVxyXG5cclxuY2hyb21lLmFsYXJtcy5vbkFsYXJtLmFkZExpc3RlbmVyKChhbGFybSkgPT4ge1xyXG4gIGNvbnN0IGFsYXJtTmFtZSA9IGFsYXJtLm5hbWU7XHJcbiAgaWYgKGFsYXJtTmFtZS5lbmRzV2l0aCgnX2RlbGV0aW9uX2FsYXJtJykpIHtcclxuICAgIGNvbnN0IHRhc2tJZCA9IGFsYXJtTmFtZS5zcGxpdCgnXycpWzBdO1xyXG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KHsgdGFza3M6IHt9IH0sIChyZXN1bHQpID0+IHtcclxuICAgICAgY29uc3QgZXhpc3RpbmdUYXNrcyA9IHJlc3VsdC50YXNrcyB8fCB7fTtcclxuICAgICAgZGVsZXRlVGFzayhleGlzdGluZ1Rhc2tzLCB0YXNrSWQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59KTtcclxuXHJcbmNocm9tZS5hbGFybXMub25BbGFybS5hZGRMaXN0ZW5lcigoYWxhcm0pID0+IHtcclxuICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoJ3Rhc2tzJykudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICBjb25zdCBleGlzdGluZ1Rhc2tzID0gcmVzdWx0IHx8IHt9O1xyXG4gICAgY29uc3QgZm91bmRUYXNrID0gZXhpc3RpbmdUYXNrcy50YXNrc1thbGFybS5uYW1lXTtcclxuICAgIGlmIChPYmplY3Qua2V5cyhleGlzdGluZ1Rhc2tzKS5sZW5ndGggIT09IDAgJiYgZm91bmRUYXNrICYmICFmb3VuZFRhc2sucmVjZW50bHlEZWxldGVkKSB7XHJcbiAgICAgIGNvbnN0IG5vdGlmaWNhdGlvbiA9IHtcclxuICAgICAgICB0eXBlOiAnYmFzaWMnLFxyXG4gICAgICAgIGljb25Vcmw6IGNocm9tZS5ydW50aW1lLmdldFVSTCgnLi4vaW1hZ2VzL2xvZ28xMjh4MTI4LnBuZycpLFxyXG4gICAgICAgIHRpdGxlOiBgWW91ciB0YXNrICR7Zm91bmRUYXNrLnRpdGxlfSBpcyBkdWVgLFxyXG4gICAgICAgIG1lc3NhZ2U6IGZvdW5kVGFzay5kZXNjcmlwdGlvbixcclxuICAgICAgfTtcclxuICAgICAgY2hyb21lLm5vdGlmaWNhdGlvbnMuY3JlYXRlKGFsYXJtLm5hbWUsIG5vdGlmaWNhdGlvbik7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxuY2hyb21lLmNvbnRleHRNZW51cy5vbkNsaWNrZWQuYWRkTGlzdGVuZXIoKGluZm8pID0+IHtcclxuICBpZiAoaW5mby5tZW51SXRlbUlkID09PSAnYWRkLW5vdGUnKSB7XHJcbiAgICBhbGVydCgnWW91IGNsaWNrZWQgdGhlIGN1c3RvbSBtZW51IGl0ZW0hJyk7XHJcbiAgfVxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUNvbnRleHRNZW51KCkge1xyXG4gIGNocm9tZS5jb250ZXh0TWVudXMuY3JlYXRlKHtcclxuICAgIGlkOiAnYWRkTm90ZScsXHJcbiAgICB0aXRsZTogJ0hhd2sgMiAtIEFkZCB0ZXh0IHRvIE5vdGVzJyxcclxuICAgIGNvbnRleHRzOiBbJ3NlbGVjdGlvbiddLFxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXREdWVEYXRlKGRheXNUb0FkZCkge1xyXG4gIGNvbnN0IGR1ZURhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gIGR1ZURhdGUuc2V0RGF0ZShkdWVEYXRlLmdldERhdGUoKSArIGRheXNUb0FkZCk7IC8vIEFkZCBkYXlzIGJhc2VkIG9uIHRoZSBpbnB1dFxyXG4gIHJldHVybiBkdWVEYXRlLnRvSVNPU3RyaW5nKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZE5ld05vdGUodGl0bGUsIGNvbnRlbnQsIHRhZ3MpIHtcclxuICBjb25zdCBub3RlSWQgPSBEYXRlLm5vdygpLnRvU3RyaW5nKCk7XHJcbiAgY29uc3Qgbm90ZSA9IHtcclxuICAgIGlkOiBub3RlSWQsXHJcbiAgICB0aXRsZSxcclxuICAgIGNvbnRlbnQsXHJcbiAgICBkdWU6IHNldER1ZURhdGUoNyksXHJcbiAgICBzY2hlZHVsZWREZWxldGlvbjogJycsXHJcbiAgICByZWNlbnRseURlbGV0ZWQ6IGZhbHNlLFxyXG4gICAgdGFncyxcclxuICB9O1xyXG4gIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCh7IG5vdGVzOiBbXSB9LCAoZGF0YSkgPT4ge1xyXG4gICAgY29uc3QgZXhpc3RpbmdOb3RlcyA9IGRhdGEubm90ZXM7XHJcblxyXG4gICAgZXhpc3RpbmdOb3Rlcy5wdXNoKG5vdGUpO1xyXG5cclxuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7IG5vdGVzOiBleGlzdGluZ05vdGVzIH0sICgpID0+IHtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vLyBMaXN0ZW4gZm9yIHdoZW4gdGhlIHRhYidzIHVybCBjaGFuZ2VzIGFuZCBzZW5kIGEgbWVzc2FnZSB0byBwb3B1cC5qc1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xyXG5jaHJvbWUudGFicy5vblVwZGF0ZWQuYWRkTGlzdGVuZXIoKHRhYklkLCBjaGFuZ2VJbmZvLCB0YWIpID0+IHtcclxuICBpZiAoY2hhbmdlSW5mby51cmwpIHtcclxuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgdHlwZTogJ1VSTF9VUERBVEVEJywgdXJsOiBjaGFuZ2VJbmZvLnVybCB9KTtcclxuICB9XHJcbn0pO1xyXG4vKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXHJcblxyXG4vLyBMaXN0ZW4gZm9yIHdoZW4gdGhlIHVzZXIgY2hhbmdlcyB0YWJzIGFuZCBzZW5kIGEgbWVzc2FnZSB0byBwb3B1cC5qc1xyXG5jaHJvbWUudGFicy5vbkFjdGl2YXRlZC5hZGRMaXN0ZW5lcigoYWN0aXZlSW5mbykgPT4ge1xyXG4gIGNocm9tZS50YWJzLmdldChhY3RpdmVJbmZvLnRhYklkLCAodGFiKSA9PiB7XHJcbiAgICBpZiAodGFiICYmIHRhYi51cmwpIHtcclxuICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyB0eXBlOiAnVEFCX0NIQU5HRUQnLCB1cmw6IHRhYi51cmwgfSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxuY2hyb21lLmNvbnRleHRNZW51cy5vbkNsaWNrZWQuYWRkTGlzdGVuZXIoKGluZm8pID0+IHtcclxuICBpZiAoaW5mby5tZW51SXRlbUlkID09PSAnYWRkTm90ZScpIHtcclxuICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sICh0YWJzKSA9PiB7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRUaXRsZSA9IHRhYnNbMF0udGl0bGU7XHJcbiAgICAgIGNvbnN0IHNlbGVjdGVkVGV4dCA9IGAke2N1cnJlbnRUaXRsZX0gJHtpbmZvLnNlbGVjdGlvblRleHR9YDtcclxuICAgICAgY29uc3QgdGl0bGUgPSBzZWxlY3RlZFRleHQubGVuZ3RoID4gMTAgPyBgJHtzZWxlY3RlZFRleHQuc3Vic3RyaW5nKDAsIDE1KX0uLi5gIDogc2VsZWN0ZWRUZXh0O1xyXG4gICAgICBhZGROZXdOb3RlKHRpdGxlLCBzZWxlY3RlZFRleHQsIHt9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufSk7XHJcblxyXG5jaHJvbWUucnVudGltZS5vbkluc3RhbGxlZC5hZGRMaXN0ZW5lcigoKSA9PiB7XHJcbiAgY3JlYXRlQ29udGV4dE1lbnUoKTtcclxufSk7XHJcblxyXG5jaHJvbWUucnVudGltZS5vbkluc3RhbGxlZC5hZGRMaXN0ZW5lcigoKSA9PiB7XHJcbiAgY2hyb21lLnNpZGVQYW5lbC5zZXRQYW5lbEJlaGF2aW9yKHsgb3BlblBhbmVsT25BY3Rpb25DbGljazogdHJ1ZSB9KS5jYXRjaChjb25zb2xlLmVycm9yKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6WyJNaW5pU2VhcmNoIiwiTE9DQUxfSU5ERVhfSUQiLCJleHBvcnRTdG9yYWdlVG9GaWxlIiwiY29uc29sZSIsImxvZyIsImNocm9tZSIsInN0b3JhZ2UiLCJsb2NhbCIsImdldCIsImRhdGEiLCJqc29uU3RyaW5nIiwiSlNPTiIsInN0cmluZ2lmeSIsImRhdGFVcmwiLCJjb25jYXQiLCJidG9hIiwidW5lc2NhcGUiLCJlbmNvZGVVUklDb21wb25lbnQiLCJkb3dubG9hZHMiLCJkb3dubG9hZCIsInVybCIsImZpbGVuYW1lIiwic2F2ZUFzIiwiZG93bmxvYWRJZCIsImdsb2JhbFRoaXMiLCJleHBvcnRJbmRleCIsImNyZWF0ZUluZGV4IiwiZXhpc3RpbmdJbmRleCIsInN0b3BXb3JkcyIsImluZGV4RGVzY3JpcHRvciIsImZpZWxkcyIsInN0b3JlRmllbGRzIiwiaWRGaWVsZCIsInByb2Nlc3NUZXJtIiwidGVybSIsIl9maWVsZE5hbWUiLCJpbmNsdWRlcyIsInRvTG93ZXJDYXNlIiwic2VhcmNoT3B0aW9ucyIsImluZGV4ZXIiLCJ1bmRlZmluZWQiLCJsb2FkSlNPTiIsImdldFN0b3JlZEluZGV4IiwiY2IiLCJzdG9yZUluZGV4IiwiaW5kZXhEYXRhIiwiX2RlZmluZVByb3BlcnR5Iiwic2V0IiwibGVuZ3RoIiwiZ2V0SW5kZXgiLCJpbml0aWFsaXNlSW5kZXhlciIsInJlcGxhY2VJbmRleGVyRGF0YSIsImFkZFRvSW5kZXgiLCJkb2N1bWVudCIsImlkeCIsInRpbWUiLCJpZCIsImhhcyIsInJlcGxhY2UiLCJhZGQiLCJ0aW1lRW5kIiwic2VhcmNoIiwib3B0aW9ucyIsInNlbmRSZXN1bHRzIiwic2VhcmNoUXVlcnkiLCJzZW5kUmVzcG9uc2UiLCJzZWFyY2hSZXN1bHRzIiwic3VnZ2VzdGlvbnMiLCJpIiwicHVzaCIsImNvbnRlbnQiLCJkZXNjcmlwdGlvbiIsInJlbW92ZVNwZWNpYWxDaGFyYWN0ZXJzIiwidGl0bGUiLCJpbmRleGluZ0xpc3RlbmVyIiwicmVxdWVzdCIsInNlbmRlciIsImZyb20iLCJzdWJqZWN0Iiwic3RvcmVkSW5kZXgiLCJpc1N1Y2Nlc3NmdWwiLCJhY3Rpb24iLCJzdGF0dXMiLCJpbml0aWFsaXNlSW5kZXhlckFzeW5jIiwiaW5kZXhlckRhdGEiLCJzdHJpbmdUb0JlU2FuaXRpemVkIiwic3BlY2lhbENoYXJzIiwic2FuaXRpemVkU3RyaW5nIiwiUmVnRXhwIiwicnVudGltZSIsIm9uTWVzc2FnZSIsImFkZExpc3RlbmVyIiwib21uaWJveCIsIm9uSW5wdXRDaGFuZ2VkIiwidGV4dCIsInN1Z2dlc3QiLCJvbklucHV0RW50ZXJlZCIsIk9uSW5wdXRFbnRlcmVkRGlzcG9zaXRpb24iLCJ0YWJzIiwidXBkYXRlIiwiZGVsZXRlVGFzayIsImFsbFRhc2tzIiwidGFza0lkVG9SZW1vdmUiLCJ1cGRhdGVkVGFza3MiLCJPYmplY3QiLCJmcm9tRW50cmllcyIsImVudHJpZXMiLCJmaWx0ZXIiLCJfcmVmIiwiX3JlZjIiLCJfc2xpY2VkVG9BcnJheSIsInRhc2tJZCIsImZpbmFsVGFza3MiLCJrZXlzIiwidGFza3MiLCJhbGFybXMiLCJvbkFsYXJtIiwiYWxhcm0iLCJhbGFybU5hbWUiLCJuYW1lIiwiZW5kc1dpdGgiLCJzcGxpdCIsInJlc3VsdCIsImV4aXN0aW5nVGFza3MiLCJ0aGVuIiwiZm91bmRUYXNrIiwicmVjZW50bHlEZWxldGVkIiwibm90aWZpY2F0aW9uIiwidHlwZSIsImljb25VcmwiLCJnZXRVUkwiLCJtZXNzYWdlIiwibm90aWZpY2F0aW9ucyIsImNyZWF0ZSIsImNvbnRleHRNZW51cyIsIm9uQ2xpY2tlZCIsImluZm8iLCJtZW51SXRlbUlkIiwiYWxlcnQiLCJjcmVhdGVDb250ZXh0TWVudSIsImNvbnRleHRzIiwic2V0RHVlRGF0ZSIsImRheXNUb0FkZCIsImR1ZURhdGUiLCJEYXRlIiwic2V0RGF0ZSIsImdldERhdGUiLCJ0b0lTT1N0cmluZyIsImFkZE5ld05vdGUiLCJ0YWdzIiwibm90ZUlkIiwibm93IiwidG9TdHJpbmciLCJub3RlIiwiZHVlIiwic2NoZWR1bGVkRGVsZXRpb24iLCJub3RlcyIsImV4aXN0aW5nTm90ZXMiLCJvblVwZGF0ZWQiLCJ0YWJJZCIsImNoYW5nZUluZm8iLCJ0YWIiLCJzZW5kTWVzc2FnZSIsIm9uQWN0aXZhdGVkIiwiYWN0aXZlSW5mbyIsInF1ZXJ5IiwiYWN0aXZlIiwiY3VycmVudFdpbmRvdyIsImN1cnJlbnRUaXRsZSIsInNlbGVjdGVkVGV4dCIsInNlbGVjdGlvblRleHQiLCJzdWJzdHJpbmciLCJvbkluc3RhbGxlZCIsInNpZGVQYW5lbCIsInNldFBhbmVsQmVoYXZpb3IiLCJvcGVuUGFuZWxPbkFjdGlvbkNsaWNrIiwiZXJyb3IiXSwic291cmNlUm9vdCI6IiJ9