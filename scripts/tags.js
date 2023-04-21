const fs = require("fs");
const path = require("path");
const readline = require("readline");

const baseDir = path.resolve(__dirname + "/../") + "/";
const targetDirs = [
  "1_js_theory",
  "2_data_structure",
  "3_algorithm",
  "4_leetcode",
].map((dir) => baseDir + dir);

const TAG_MAKER = "// tags: ";
const fileTagsMap = {};

function checker(filename, str) {
  if (
    str.startsWith(TAG_MAKER) &&
    str
      .slice(TAG_MAKER.length)
      .split(" ")
      .every((tag) => /^#[\w-]+$/.test(tag))
  )
    fileTagsMap[filename] = str;
  else console.error(filename, "->", str);
}

const dirsQueue = [];
const filesQueue = [];
function watcher(event, ...rest) {
  Promise.all(dirsQueue).then(() => {
    Promise.all(filesQueue).then(() => event(...rest));
  });
}

targetDirs.forEach((targetDir) =>
  dirsQueue.push(
    new Promise((resolve, reject) => {
      fs.readdir(targetDir, (err, files) => {
        if (err) {
          console.error(err);
          reject(err);
        }

        files.forEach((file) =>
          filesQueue.push(
            new Promise((resolve) => {
              const fullPath = targetDir + "/" + file;
              const rl = readline.createInterface({
                input: fs.createReadStream(fullPath),
              });

              rl.on("line", (line) => {
                checker(file, line);
                rl.removeAllListeners();
                rl.close();
                resolve();
              });
            })
          )
        );

        resolve();
      });
    })
  )
);

function classify(map) {
  const tags = {};
  Object.values(map).forEach((str) =>
    str
      .slice(TAG_MAKER.length)
      .split(" ")
      .forEach((tag) => (tags[tag] ? tags[tag]++ : (tags[tag] = 1)))
  );

  const tagsCloud = Object.entries(tags)
    .sort((a, b) => b[1] - a[1])
    .map((v) => `\`${v[0]}\``)
    .join(" ");

  console.log(tagsCloud);
}

watcher(classify, fileTagsMap);
