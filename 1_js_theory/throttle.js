// tags: #throttle #closure #hot

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

function throttleLeadingEdge(fn, time) {
  let canRun = true;
  return function () {
    if (!canRun) return;
    canRun = false;
    fn(...arguments);
    timeout = setTimeout(() => {
      canRun = true;
    }, time);
  };
}
