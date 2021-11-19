class BinarySearchTreeNode {
  constructor(key, value) {
    this._key = key;
    this._value = value;
    this._left = null;
    this._right = null;
    this._parent = null;
  }

  setKey(key) {
    this._key = key;
    return this;
  }

  getKey() {
    return this._key;
  }

  setValue(value) {
    this._value = value;
    return this;
  }

  getValue() {
    return this._value;
  }

  setLeft(left) {
    if (left && !(left instanceof BinarySearchTreeNode)) {
      throw new Error("setLeft expects a BinarySearchTreeNode or null");
    }

    this._left = left || null;
    return this;
  }

  getLeft() {
    return this._left;
  }

  hasLeft() {
    return this._left instanceof BinarySearchTreeNode;
  }

  setRight(right) {
    if (right && !(right instanceof BinarySearchTreeNode)) {
      throw new Error("setRight expects a BinarySearchTreeNode or null");
    }

    this._right = right || null;
    return this;
  }

  getRight() {
    return this._right;
  }

  hasRight() {
    return this._right instanceof BinarySearchTreeNode;
  }

  setParent(parent) {
    if (parent && !(parent instanceof BinarySearchTreeNode)) {
      throw new Error("setParent expects a BinarySearchTreeNode or null");
    }

    this._parent = parent || null;
    return this;
  }

  getParent() {
    return this._parent;
  }

  hasParent() {
    return this._parent instanceof BinarySearchTreeNode;
  }

  isRoot() {
    return this._parent === null;
  }

  isLeaf() {
    return !this.hasLeft() && !this.hasRight();
  }
}

class BinarySearchTree {
  constructor() {
    this._root = null;
    this._count = 0;
  }

  insert(key, value) {
    const newNode = new BinarySearchTreeNode(key, value);
    const insertRecursive = (current) => {
      if (key < current.getKey()) {
        if (current.hasLeft()) {
          insertRecursive(current.getLeft());
        } else {
          current.setLeft(newNode.setParent(current));
          this._count += 1;
        }
      } else if (key > current.getKey()) {
        if (current.hasRight()) {
          insertRecursive(current.getRight());
        } else {
          current.setRight(newNode.setParent(current));
          this._count += 1;
        }
      } else {
        current.setValue(value);
      }
    };

    if (this._root === null) {
      this._root = newNode;
      this._count += 1;
    } else {
      insertRecursive(this._root);
    }

    return newNode;
  }

  has(key) {
    const hasRecursive = (current) => {
      if (current === null) {
        return false;
      }

      if (key === current.getKey()) {
        return true;
      }

      if (key < current.getKey()) {
        return hasRecursive(current.getLeft());
      }

      return hasRecursive(current.getRight());
    };

    return hasRecursive(this._root);
  }

  find(key) {
    const findRecursive = (current) => {
      if (current === null) {
        return null;
      }

      if (key === current.getKey()) {
        return current;
      }

      if (key < current.getKey()) {
        return findRecursive(current.getLeft());
      }

      return findRecursive(current.getRight());
    };

    return findRecursive(this._root);
  }

  /**
   * Finds the node with max key (most right) in the tree
   */
  max(current = this._root) {
    if (current === null) {
      return null;
    }

    if (current.hasRight()) {
      return this.max(current.getRight());
    }

    return current;
  }

  /**
   * Finds the node with min key (most left) in the tree
   */
  min(current = this._root) {
    if (current === null) {
      return null;
    }

    if (current.hasLeft()) {
      return this.min(current.getLeft());
    }

    return current;
  }

  /**
   * Returns the node with the biggest key less or equal to k
   */
  lowerBound(k, includeEqual = true) {
    let lowerBound = null;

    const lowerBoundRecursive = (current) => {
      if (current === null) {
        return lowerBound;
      }

      const currentKey = current.getKey();
      if (currentKey < k || (includeEqual && currentKey === k)) {
        if (lowerBound === null || lowerBound.getKey() <= currentKey) {
          lowerBound = current;
        }
        return lowerBoundRecursive(current.getRight());
      }

      return lowerBoundRecursive(current.getLeft());
    };

    return lowerBoundRecursive(this._root);
  }

  /**
   * Returns the node with the smallest key bigger or equal k
   */
  upperBound(k, includeEqual = true) {
    let upperBound = null;

    const upperBoundRecursive = (current) => {
      if (current === null) {
        return upperBound;
      }

      const currentKey = current.getKey();
      if (currentKey > k || (includeEqual && currentKey === k)) {
        if (upperBound === null || upperBound.getKey() >= currentKey) {
          upperBound = current;
        }
        return upperBoundRecursive(current.getLeft());
      }

      return upperBoundRecursive(current.getRight());
    };

    return upperBoundRecursive(this._root);
  }

  root() {
    return this._root;
  }

  count() {
    return this._count;
  }

  remove(key) {
    const removeRecursively = (k, current) => {
      if (current === null) {
        return false;
      }

      if (k < current.getKey()) {
        return removeRecursively(k, current.getLeft());
      }

      if (k > current.getKey()) {
        return removeRecursively(k, current.getRight());
      }

      // current node is the node to remove

      // case 1: node has no children
      if (current.isLeaf()) {
        if (current.isRoot()) {
          this._root = null;
        } else if (k < current.getParent().getKey()) {
          current.getParent().setLeft(null);
        } else {
          current.getParent().setRight(null);
        }
        this._count -= 1;
        return true;
      }

      // case 2: node has a left child and no right child
      if (!current.hasRight()) {
        if (current.isRoot()) {
          this._root = current.getLeft();
        } else if (k < current.getParent().getKey()) {
          current.getParent().setLeft(current.getLeft());
        } else {
          current.getParent().setRight(current.getLeft());
        }
        current.getLeft().setParent(current.getParent());
        this._count -= 1;
        return true;
      }

      // case 3: node has a right child and no left child
      if (!current.hasLeft()) {
        if (current.isRoot()) {
          this._root = current.getRight();
        } else if (k < current.getParent().getKey()) {
          current.getParent().setLeft(current.getRight());
        } else {
          current.getParent().setRight(current.getRight());
        }
        current.getRight().setParent(current.getParent());
        this._count -= 1;
        return true;
      }

      // case 4: node has left and right children
      const minRight = this.min(current.getRight());
      current.setKey(minRight.getKey()).setValue(minRight.getValue());
      return removeRecursively(minRight.getKey(), minRight);
    };

    return removeRecursively(key, this._root);
  }

  traverseInOrder(cb) {
    if (typeof cb !== "function") {
      throw new Error(".traverseInOrder expects a callback function");
    }

    const traverseRecursive = (current) => {
      if (current === null) return;
      traverseRecursive(current.getLeft());
      cb(current);
      traverseRecursive(current.getRight());
    };

    traverseRecursive(this._root);
  }

  traversePreOrder(cb) {
    if (typeof cb !== "function") {
      throw new Error(".traversePreOrder expects a callback function");
    }

    const traverseRecursive = (current) => {
      if (current === null) return;
      cb(current);
      traverseRecursive(current.getLeft());
      traverseRecursive(current.getRight());
    };

    traverseRecursive(this._root);
  }

  traversePostOrder(cb) {
    if (typeof cb !== "function") {
      throw new Error(".traversePostOrder expects a callback function");
    }

    const traverseRecursive = (current) => {
      if (current === null) return;
      traverseRecursive(current.getLeft());
      traverseRecursive(current.getRight());
      cb(current);
    };

    traverseRecursive(this._root);
  }

  clear() {
    this._root = null;
    this._count = 0;
  }
}

const bst = new BinarySearchTree();
bst.insert(50, "v1");
bst.insert(80, "v2");
bst.insert(30, "v3");
bst.insert(90, "v4");
bst.insert(60, "v5");
bst.insert(40, "v6");
bst.insert(20, "v7");
console.log(bst.lowerBound(50).getKey());
