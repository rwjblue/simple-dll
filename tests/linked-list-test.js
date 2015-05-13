/* globals QUnit */
import DLL from 'simple-dll';

var list;
QUnit.module('DLL', {
  beforeEach: function() {
    list = new DLL();
  },

  afterEach: function() {
    list = null;
  }
});

test('can append items', function(assert) {
  list.append(42);

  assert.equal(list.length, 1);
  assert.deepEqual(list.toArray(), [42]);
});

test('returns the newly created node', function(assert) {
  var node = list.append(42);

  assert.equal(node.value, 42);
});

test('can iterate nodes with forEach', function(assert) {
  var node1 = list.append(42);
  var node2 = list.append(52);
  var node3 = list.append(62);
  var node4 = list.append(72);


  var array = [];
  list.forEach(function(value) {
    array.push(value);
  });

  assert.deepEqual(array, [42,52,62,72]);
});

test('can remove a middle node', function(assert) {
  list.append(42);
  list.append(52);
  var node = list.append(62);
  list.append(72);

  list.remove(node);

  assert.deepEqual(list.toArray(), [42,52,72]);
});

test('can remove the first node', function(assert) {
  var node = list.append(42);
  list.append(52);
  list.append(62);
  list.append(72);

  list.remove(node);

  assert.deepEqual(list.toArray(), [52,62,72]);
});

test('can remove the last node', function(assert) {
  list.append(42);
  list.append(52);
  list.append(62);
  var node = list.append(72);

  list.remove(node);

  assert.deepEqual(list.toArray(), [42,52,62]);
});

test('can remove all nodes', function(assert) {
  var node1 = list.append(42);
  var node2 = list.append(52);
  var node3 = list.append(62);
  var node4 = list.append(72);

  list.remove(node1);
  list.remove(node2);
  list.remove(node3);
  list.remove(node4);

  assert.deepEqual(list.toArray(), []);
});
