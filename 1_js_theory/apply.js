// tags: #prototype

Function.prototype.apply = function (thisArg, args) {
  thisArg = thisArg ? Object(thisArg) : window;

  thisArg._fn_ = this;

  let result;
  if (!args) {
    result = thisArg._fn_();
  } else {
    result = thisArg._fn_(...args);
  }

  delete thisArg._fn_;
  return result;
};
