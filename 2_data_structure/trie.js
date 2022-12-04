class TrieNode {
  constructor(char) {
    this._char = char;
    this._isEndOfWord = false;
    this._parent = null;
    this._children = new Map();
  }

  isRoot() {
    return this._char === "";
  }

  getChar() {
    return this._char;
  }

  setParent(parentNode) {
    this._parent = parentNode;
    return this;
  }

  getParent() {
    return this._parent;
  }

  setEndOfWord(isEndOfWord) {
    this._isEndOfWord = isEndOfWord;
    return this;
  }

  isEndOfWord() {
    return this._isEndOfWord;
  }

  addChild(char) {
    const childNode = new TrieNode(char);
    childNode.setParent(this);
    this._children.set(char, childNode);
    return this;
  }

  removeChild(char) {
    return this._children.delete(char);
  }

  getChild(char) {
    return this._children.get(char) || null;
  }

  hasChild(char) {
    return this._children.has(char);
  }

  children() {
    return this._children;
  }

  childrenCount() {
    return this._children.size;
  }
}

class Trie {
  constructor() {
    this._root = new TrieNode("");
    this._nodesCount = 1; // root node
    this._wordsCount = 0;
  }

  insert(value) {
    if (value === undefined || value === null) {
      return this;
    }

    const word = value.toString();
    let currentNode = this._root;
    for (let i = 0; i < word.length; i += 1) {
      if (!currentNode.hasChild(word[i])) {
        currentNode.addChild(word[i]);
        this._nodesCount += 1;
      }
      currentNode = currentNode.getChild(word[i]);
    }

    if (!currentNode.isEndOfWord()) {
      currentNode.setEndOfWord(true);
      this._wordsCount += 1;
    }

    return this;
  }

  has(value) {
    if (value === undefined || value === null) {
      return false;
    }

    const word = value.toString();
    let currentNode = this._root;
    for (let i = 0; i < word.length; i += 1) {
      if (!currentNode.hasChild(word[i])) {
        return false;
      }
      currentNode = currentNode.getChild(word[i]);
    }

    if (!currentNode.isEndOfWord()) {
      return false;
    }

    return true;
  }

  find(value) {
    if (value === undefined || value === null) {
      return null;
    }

    const word = value.toString();
    let currentNode = this._root;

    for (let i = 0; i < word.length; i += 1) {
      if (!currentNode.hasChild(word[i])) {
        return null;
      }
      currentNode = currentNode.getChild(word[i]);
    }

    if (!currentNode.isEndOfWord()) {
      return null;
    }

    return currentNode;
  }

  remove(value) {
    if (value === undefined || value === null) {
      return null;
    }

    const word = value.toString();
    let currentNode = this._root;

    for (let i = 0; i < word.length; i += 1) {
      if (!currentNode.hasChild(word[i])) {
        return null;
      }
      currentNode = currentNode.getChild(word[i]);
    }

    if (!currentNode.isEndOfWord()) {
      return null;
    }

    // word could be empty string
    if (currentNode.childrenCount() > 0 || currentNode.isRoot()) {
      currentNode.setEndOfWord(false);
      this._wordsCount -= 1;
      return word;
    }

    do {
      currentNode.getParent().removeChild(currentNode.getChar());
      this._nodesCount -= 1;
      currentNode = currentNode.getParent();
    } while (
      currentNode.childrenCount() === 0 &&
      !currentNode.isEndOfWord() &&
      !currentNode.isRoot()
    );

    this._wordsCount -= 1;
    return word;
  }

  forEach(cb) {
    if (typeof cb !== "function") {
      throw new Error("Trie.forEach expects a callback function");
    }

    const forEachRecursive = (node = this._root, word = "") => {
      if (node.isEndOfWord()) {
        cb(word);
      }

      node.children().forEach((child) => {
        forEachRecursive(child, word + child.getChar());
      });
    };

    return forEachRecursive();
  }

  toArray() {
    const result = [];
    this.forEach((word) => result.push(word));
    return result;
  }

  nodesCount() {
    return this._nodesCount;
  }

  wordsCount() {
    return this._wordsCount;
  }

  clear() {
    this._root = new TrieNode("");
    this._nodesCount = 1;
    this._wordsCount = 0;
  }

  static fromArray(values) {
    const trie = new Trie();
    values.forEach((value) => trie.insert(value));
    return trie;
  }
}

/* test code */
const assert = require("node:assert/strict");

const dictionary = new Trie();
dictionary.insert("hi").insert("hit");
dictionary.remove("hit");

assert.equal(dictionary.has("hit"), false);
assert.equal(dictionary.has("hi"), true);
assert.ifError(dictionary.remove("h"));
