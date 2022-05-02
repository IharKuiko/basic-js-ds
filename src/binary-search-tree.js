const { Node } = require('../extensions/list-tree.js');

let _next = (data, node) => (node.data >data ? 'left' : 'right');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  _root = null;

  root = () => this._root;

  toArray = (node=this._root) =>
    (!node ? [] : [...this.toArray(node.left), node.data, ...this.toArray(node.right)]);

  has = data => Boolean( this.find(data) );

  find = (data, node=this._root) => (!node || (node.data === data) ? node :
                                     this.find(data, node[ _next(data, node) ]));

  min = (node=this._root) => node && (!node.left ? node.data : this.min(node.left));
  max = (node=this._root) => node && (!node.right ? node.data : this.max(node.right));

  add = (data, node=this._root) => {
    if (!node)
      this._root = new Node(data);
    else {
      let k = _next(data, node);
      if (!node[k])
        node[k] = new Node(data);
      else
        this.add(data, node[k]);
    }
  }

  remove = (data, node=this._root, parent=null) => {
    if (!node)
      return;
    else if (node.data !== data)
      return this.remove(data, node[ _next(data, node) ], node);
    else {
      let subtree, {left, right} = node;
      if (!left || !right)
        subtree = left || right || null;
      else if (!left.right)
        subtree = Object.assign(left, {right});
      else {
        let prev = this.max(left);
        subtree = Object.assign(new Node(prev), {left, right});
        this.remove(prev, left, subtree);
      }
      if (!parent)
        this._root = subtree;
      else
        parent[ _next(data, parent) ] = subtree;
    }
  }
}

module.exports = {
  BinarySearchTree
};