/* jshint esnext:true */

function ListNode(value) {
  this.prev = null;
  this.next = null;
  this.value = value;
}

export default function DoublyLinkedList() {
  this.length = 0;
  this.first = null;
  this.last = null;
};

DoublyLinkedList.prototype = {
  append(value) {
    var node = new ListNode(value);

    if (this.first === null) {
      node.prev = node;
      node.next = node;
      this.first = node;
      this.last = node;
    } else {
      node.prev = this.last;
      node.next = this.first;
      this.first.prev = node;
      this.last.next = node;
      this.last = node;
    }

    this.length++;

    return node;
  },

  remove(node) {
    var prev = node.prev;
    var next = node.next;
    node.next = null;
    node.prev = null;

    if (node === this.first && node === this.last) {
      this.first = null;
      this.last = null
    }
    prev.next = next;
    next.prev = prev;

    if (node === this.first) {
      this.first = next;
    }

    if (node === this.last) {
      this.last = prev;
    }

    this.length--;
  },

  clone() {
    var clone = new DoublyLinkedList();
    this.forEach(function(value) {
      clone.append(value);
    });

    return clone;
  },

  clear() {
    while (this.first) {
      this.remove(this.first);
    }
  },

  forEach(callback) {
    var current = this.first;
    do {
      if (!current) { continue; }

      callback(current.value);
      current = current.next;
    } while (current !== this.first);
  },

  toArray() {
    var array = [];
    var current = this.first;

    do {
      if (!current) { continue; }

      array.push(current.value);
      current = current.next;
    } while (current !== this.first);

    return array;
  }
};

DoublyLinkedList.fromArray = function(array) {
  var list = new DoublyLinkedList();
  for (var i = 0, l = array.length; i < l; i++) {
    list.append(array[i]);
  }

  return list;
}
