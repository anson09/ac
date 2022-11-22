// question：循环A-Z当超过26个字母时输出AA...AZ...BA..

//* A=0，Z=25，则任何进制下AA无法表示26
//* 于是调整A=1，Z=26，AA=1*26+1。没有0，26进制
function getChar(num) {
  return String.fromCharCode(num + 64);
}

function getByteCode(num) {
  const bytes = [];
  do {
    //* 取余范围0-25，需转变为1-26，那么用0代表26，同时高位减1
    let remainder = num % 26;
    let highByteMinus = 0;
    if (remainder === 0) {
      highByteMinus = 1;
      remainder = 26;
    }
    bytes.unshift(remainder);

    num = Math.floor(num / 26) - highByteMinus;
  } while (num !== 0);
  return bytes;
}

//* 从1开始计数
function generator(num) {
  const list = [];
  for (let i = 1; i <= num; i++) {
    list.push(
      getByteCode(i)
        .map((j) => getChar(j))
        .join("")
    );
  }
  return list;
}

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question(`生成数量（输入数字）:`, (num) => {
  console.log(generator(num));
  readline.close();
});
