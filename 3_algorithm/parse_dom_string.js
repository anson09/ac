// tags: #parser

// parse dom string to json tree

function getToken(str, loc) {
  if (str[loc++] !== "<") {
    console.error(`token begin at ${loc} is ${str[i]} not <`);
    return;
  }

  let token = "";
  // type - enum
  //  0 - start
  //  1 - end
  //  2 - self close
  let type = 0;

  // rewind
  if (str[loc++] === "/") type = 1;
  else loc--;

  while (loc < str.length) {
    if (str[loc] === ">") {
      // moving cursor to next tag start
      loc++;
      break;
    } else if (str[loc] === "/") {
      type = 2;
    } else {
      token += str[loc];
    }

    loc++;
  }

  return {
    token,
    type,
    loc,
  };
}

function parseDomString(str) {
  let loc = 0;
  let root;
  const stack = [];

  const createNode = (token) => ({
    name: token,
    children: null,
  });

  while (loc < str.length) {
    const meta = getToken(str, loc);
    loc = meta.loc;

    if (meta.type === 0) {
      if (!stack.length) {
        root = createNode(meta.token);
        stack.push(root);
      } else {
        const node = createNode(meta.token);
        if (!stack.at(-1).children) stack.at(-1).children = [];
        stack.at(-1).children.push(node);
        stack.push(node);
      }
    } else if (meta.type === 1) {
      const { name } = stack.pop();
      if (name !== meta.token) {
        console.error(
          `tag before ${meta.loc} is ${meta.token} mismatch ${name}`
        );
        return;
      }
    } else if (meta.type === 2) {
      if (!stack.at(-1).children) stack.at(-1).children = [];
      stack.at(-1).children.push(createNode(meta.token));
    } else {
      console.error(`tag type - ${meta.type} is undefined`);
      return;
    }
  }

  return root;
}

/* test code */
const assert = require("node:assert/strict");

const str = `<xml><div><p><a/></p><p></p></div></xml>`;

assert.deepEqual(parseDomString(str), {
  name: "xml",
  children: [
    {
      name: "div",
      children: [
        {
          name: "p",
          children: [
            {
              name: "a",
              children: null,
            },
          ],
        },
        {
          name: "p",
          children: null,
        },
      ],
    },
  ],
});
