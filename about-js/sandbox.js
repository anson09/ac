// part 1
function withedYourCode(code) {
  code = "with(globalObj) {" + code + "}";
  return new Function("globalObj", code);
}

// 可访问全局作用域的白名单列表
const access_white_list = ["Math", "Date", "console"];

// 待执行程序
const code = `
      console.log(Date)
      Math.random()
      global.href = 1
      func(foo)
  `;

// 执行上下文对象
const ctx = {
  func: (variable) => {
    console.log(variable);
  },
  foo: "foo",
};

// 执行上下文对象的代理对象
const ctxProxy = new Proxy(ctx, {
  has: (target, prop) => {
    // has 可以拦截 with 代码块中任意属性的访问,
    // 返回true表示在with scope中取值，with scope取不到返回undefined，返回false表示with scope没有，去向父域查找
    if (access_white_list.includes(prop)) {
      // 在可访问的白名单内，可继续向上查找
      return target.hasOwnProperty(prop);
    }
    if (!target.hasOwnProperty(prop)) {
      throw new Error(`Invalid expression - ${prop}! You can not do that!`);
    }
    return true;
  },
});

function sandbox(code, ctx) {
  withedYourCode(code).call(ctx, ctx); // 将 this 指向手动构造的全局代理对象
}

sandbox(code, ctxProxy);

// - - - - - - - - -
// part 2
// 创建一个 iframe 对象，取出其中的原生浏览器全局对象作为沙箱的全局对象
class iframeProxy {
  constructor(sharedState) {
    const iframe = document.createElement("iframe", { url: "about:blank" });
    document.body.appendChild(iframe);
    const sandboxGlobal = iframe.contentWindow; // 沙箱运行时的全局对象

    return new Proxy(sandboxGlobal, {
      has: (target, prop) => {
        if (sharedState.includes(prop)) {
          // 如果属性存在于共享的全局状态中，则让其沿着作用域在外层查找
          return false;
        }
        if (!target.hasOwnProperty(prop)) {
          throw new Error(`Invalid expression - ${prop}! You can not do that!`);
        }
        return true;
      },
    });
  }
}

const browserCode = `
  console.log(history == window.history)
  window.abc = 'sandbox'
  Object.prototype.toString = () => {
      console.log('Traped!')
  }
  console.log(window.abc)
`;

const sharedGlobal = ["history"]; // 希望与外部执行环境共享的全局对象

const browserProxy = new iframeProxy(sharedGlobal);

sandbox(browserCode, browserProxy);
