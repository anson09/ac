// tags: #debounce #closure #hot

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
  let canRun = true;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      canRun = true;
    }, time);
    if (!canRun) return;
    canRun = false;
    fn(...arguments);
  };
}
