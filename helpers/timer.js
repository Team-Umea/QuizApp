class Timer {
  constructor(intervalTime, callback) {
    this.intervalTime = intervalTime;
    this.callback = callback;
    this.intervalId = null;
    this.remainingTime = intervalTime;
  }

  start() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      this.callback();
      this.reset();
    }, this.intervalTime);
  }

  reset() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.start();
    }
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }
}

module.exports = { Timer };
