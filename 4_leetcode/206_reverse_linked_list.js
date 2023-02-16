// https://leetcode.cn/problems/reverse-linked-list/

// version 1
// time: 68ms
var reverseList = function (head) {
  if (!head) return null;
  let root;
  traverse(null, head);
  return root;

  function traverse(pre, cur) {
    if (!cur) {
      root = pre;
      return;
    }
    traverse(cur, cur.next);
    cur.next = pre;
  }
};

// version 2
// time: 64ms | beat: 66%
var reverseList = function (head) {
  if (!head) return null;
  let pre = null;
  let cur = head;
  let next = head.next;
  while (cur) {
    cur.next = pre;
    pre = cur;
    cur = next;
    next = next?.next;
  }
  return pre;
};

/* test code */
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

function generateList(arr) {
  let root = new ListNode(arr[0]);
  let cur = root;
  for (let i = 1; i < arr.length; i++) {
    cur.next = new ListNode(arr[i]);
    cur = cur.next;
  }
  return root;
}

const list = reverseList(generateList([1, 2, 3, 4, 5]));

debugger;
