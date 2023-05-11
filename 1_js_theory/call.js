// tags: #prototype

Function.prototype.call = function (thisArg, ...args) {
  // when thisArg is null or undeinfed, thisArg refer to window in non-strict mode
  // when thisArg is primitive type, thisArg will be wrapped by Object()
  thisArg = thisArg ? Object(thisArg) : window;

  // this in prototype refer to the caller function
  thisArg._fn_ = this;

  const result = thisArg._fn_(...args);
  delete thisArg._fn_;
  return result;
};
