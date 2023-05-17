// tags: #math #game

/**
 * generating a mine clearance board
 * @param {number} m - row
 * @param {number} k - mines
 */
class MC {
  #board;

  constructor(m, n, k) {
    this.m = m;
    this.n = n;
    this.k = k;
    this.generate();
  }

  generate() {
    this.#board = [...Array(this.m)].map(() => Array(this.n).fill("."));
    this.#setMine();
    this.#setNumber();
  }

  #setMine() {
    const { m, n } = this;
    let { k } = this;

    for (let row = 0; row < m; row++) {
      for (let col = 0; col < n; col++) {
        if (k / (m * n - (row * n + col)) >= Math.random()) {
          this.#board[row][col] = "X";
          k--;
        }
      }
    }
  }

  #setNumber() {
    const { m, n } = this;
    for (let row = 0; row < m; row++) {
      for (let col = 0; col < n; col++) {
        if (this.#board[row][col] !== "X") {
          this.#board[row][col] = this.#mineCount(row, col);
        }
      }
    }
  }

  #mineCount(row, col) {
    let count = 0;

    if (row - 1 >= 0) {
      col - 1 >= 0 && this.#isMine(row - 1, col - 1) && count++;
      this.#isMine(row - 1, col) && count++;
      col + 1 < this.n && this.#isMine(row - 1, col + 1) && count++;
    }

    col - 1 >= 0 && this.#isMine(row, col - 1) && count++;
    col + 1 < this.n && this.#isMine(row, col + 1) && count++;

    if (row + 1 < this.m) {
      col - 1 >= 0 && this.#isMine(row + 1, col - 1) && count++;
      this.#isMine(row + 1, col) && count++;
      col + 1 < this.n && this.#isMine(row + 1, col + 1) && count++;
    }

    return count;
  }

  #isMine(row, col) {
    return this.#board[row][col] === "X";
  }

  getBoard() {
    return this.#board.map((row) => row.join(" ")).join("\n");
  }
}

const mc = new MC(10, 10, 10);
console.log(mc.getBoard());
