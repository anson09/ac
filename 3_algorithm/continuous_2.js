// 将48位的时间位图格式化成字符串

// 要求：写一个函数timeBitmapToRanges，将下述规则描述的时间位图转换成一个选中时间区间的数组。

// 规则描述：

// 将一天24小时按每半小划分成48段，我们用一个位图表示选中的时间区间，例如110000000000000000000000000000000000000000000000， 表示第一个半小时和第二个半小时被选中了，其余时间段都没有被选中，也就是对应00:00~01:00这个时间区间。一个位图中可能有多个不连续的 时间区间被选中，例如110010000000000000000000000000000000000000000000，表示00:00-1:00和02:00-02:30这两个时间区间被选中了。

// 示例输入："110010000000000000000000000000000000000000000000"

// 示例输出：["00:00~01:00", "02:00~02:30"]

function _transfer(loc) {
  if (loc < 0 || loc > 48) return null; // 下标只有 0-47，但需支持 48 取 24:00 计算
  let hour = Math.floor(loc / 2)
    .toString()
    .padStart(2, "0");
  let min = loc % 2 === 1 ? "30" : "00";
  return hour + ":" + min;
}

function timeBitmapToRanges(timeString) {
  let out = [];
  let ranges = "";

  for (let i = 0; i < timeString.length; i++) {
    if (timeString[i] !== "1") continue;
    ranges = _transfer(i) + "~"; // reset ranges
    while (i + 1 < 48 && timeString[i + 1] === "1") {
      i++;
    }
    ranges += _transfer(++i); //经过 while 后 ++i 未到 48 位时值必是 0，可以取 endtime 并 continue 一位
    out.push(ranges);
  }
  return out;
}

/* test code */
const assert = require("node:assert/strict");

assert.deepEqual(
  timeBitmapToRanges("110010000000000000000000000000000000000000011101"),
  ["00:00~01:00", "02:00~02:30", "21:30~23:00", "23:30~24:00"]
);
