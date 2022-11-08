// 输入是 1,2,3,5,7,8,10 输出要求是 1~3 5 7~8 10

function continuous(...args) {
  let out = "";
  let mark = false;
  for (let i = 0; i < args.length; i++) {
    out += args[i];

    while (i + 1 < args.length && args[i + 1] === args[i] + 1) {
      i++;
      mark = true;
    }
    if (mark === true) {
      mark = false;
      out = out + "~" + args[i];
    }
    out += " ";
  }

  return out.trim();
}

console.log(continuous(1, 2, 3, 5, 7, 8, 10));

// 将48位的时间位图格式化成字符串

// 要求：写一个函数timeBitmapToRanges，将下述规则描述的时间位图转换成一个选中时间区间的数组。

// 规则描述：

// 将一天24小时按每半小划分成48段，我们用一个位图表示选中的时间区间，例如110000000000000000000000000000000000000000000000， 表示第一个半小时和第二个半小时被选中了，其余时间段都没有被选中，也就是对应00:00~01:00这个时间区间。一个位图中可能有多个不连续的 时间区间被选中，例如110010000000000000000000000000000000000000000000，表示00:00-1:00和02:00-02:30这两个时间区间被选中了。

// 示例输入："110010000000000000000000000000000000000000000000"

// 示例输出：["00:00~01:00", "02:00~02:30"]

function transfer(loc) {
  if (loc < 0 || loc > 48) return -1;
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
    ranges = transfer(i) + "~"; // reset ranges
    while (i + 1 < 48 && timeString[i + 1] === "1") {
      i++;
    }
    ranges += transfer(++i);
    out.push(ranges);
  }
  return out;
}

console.log(
  timeBitmapToRanges("110010000000000000000000000000000000000000011101")
);
