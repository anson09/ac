// 防抖
function debounce(fn, time) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...arguments), time);
  };
}

function debounceLeadingEdge(fn, time) {
  let timeout;
  return function () {
    if (!timeout) {
      fn(...arguments);
    }
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
    }, time);
  };
}
