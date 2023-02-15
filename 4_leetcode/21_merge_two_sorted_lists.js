// https://leetcode.cn/problems/merge-two-sorted-lists/

// time: O(n) | 84ms
// space:O(n)
var mergeTwoLists = function (list1, list2) {
  if (!list1) return list2;
  if (!list2) return list1;
  if (list1.val <= list2.val) {
    list1.next = mergeTwoLists(list1.next, list2);
    return list1;
  } else {
    list2.next = mergeTwoLists(list1, list2.next);
    return list2;
  }
};

// time: O(n) | 64ms | beat 82%
// space: O(1)
var mergeTwoLists = function (list1, list2) {
  if (!list1) return list2;
  if (!list2) return list1;

  const root = list1.val <= list2.val ? list1 : list2;
  let cur = root;
  cur === list1 ? (list1 = list1.next) : (list2 = list2.next);

  while (list1 && list2) {
    if (list1.val <= list2.val) {
      cur.next = list1;
      list1 = list1.next;
    } else {
      cur.next = list2;
      list2 = list2.next;
    }
    cur = cur.next;
  }

  cur.next = list1 ? list1 : list2;

  return root;
};
