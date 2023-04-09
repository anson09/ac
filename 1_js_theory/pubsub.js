// tags: #event #design-mode #hot

class PubSub {
  #evts = {};

  on(e, cb) {
    if (!e || !cb) return;
    this.#evts[e] ? this.#evts[e].push(cb) : (this.#evts[e] = [cb]);
  }

  once(e, cb) {
    if (!e || !cb) return;
    const wrapper = (...params) => {
      cb(...params);
      this.off(e, wrapper);
    };
    this.on(e, wrapper);
  }

  off(e, cb) {
    if (!this.#has(e) || !cb) return;
    if (cb === "*") {
      delete this.#evts[e];
      return;
    }
    this.#evts[e] = this.#evts[e].filter((i) => i !== cb);
    !this.#evts[e].length && delete this.#evts[e];
  }

  emit(e, ...params) {
    if (!this.#has(e)) return;
    this.#evts[e].forEach((i) => i(...params));
  }

  #has(e) {
    return this.#evts[e];
  }

  get debug() {
    return this.#evts;
  }
}

/* test code */
const assert = require("node:assert/strict");

const pubsub = new PubSub();

pubsub.on("event", () => {
  assert.ok(true);
});

pubsub.once("event", () => {
  assert.ok(true);
});

assert.equal(pubsub.debug.event.length, 2);

pubsub.emit("event");
assert.equal(pubsub.debug.event.length, 1);

pubsub.off("event", "*");
assert.equal(pubsub.debug.event, undefined);
