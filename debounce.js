// 防抖
function debounce(fn, time) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...arguments), time);
  };
}

// 截流
function throttle(fn, time) {
  let canRun = true;
  return function () {
    if (!canRun) return;
    canRun = false;
    timeout = setTimeout(() => {
      fn(...arguments);
      canRun = true;
    }, time);
  };
}
