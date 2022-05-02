const { ListNode } = require('../extensions/list-node.js');

let _last = list => list && (!list.next ? list : _last(list.next));

// const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
 class Queue {
  _head = null;

  getUnderlyingList = () => this._head;

  enqueue = (value) => { // O(n)
    if (!this._head)
      this._head = new ListNode(value);
    else
      _last(this._head).next = new ListNode(value);
  };

  dequeue = () => {
    let node = this._head;
    this._head = node && node.next;
    return node && node.value;
  }
}

module.exports = {
  Queue
};
