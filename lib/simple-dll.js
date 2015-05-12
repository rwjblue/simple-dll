function Node(value) {
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
    var node = new Node(value);

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

    prev.next = next;

    if (node === this.first) {
      this.first = next;
    }

    if (node === this.last) {
      this.last = prev;
    }

    this.length--;
  },

  forEach(callback) {
    var current = this.first;
    do {
      callback(current.value);
      current = current.next;
    } while (current !== this.first)
  },

  toArray() {
    var array = [];
    var current = this.first;
    do {
      array.push(current.value);
      current = current.next;
    } while (current !== this.first)

    return array;
  }
};
