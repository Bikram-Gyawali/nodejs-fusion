class RequestScheduler {
  private queuedRequests = 0;
  private totalRequests = 0;
  private readonly requestsPerInterval: number;
  private readonly intervalTime: number;
  private readonly debugMode: boolean;
  constructor({
    requestsPerInterval,
    intervalTime,
    debugMode = false,
  }: {
    requestsPerInterval: number;
    intervalTime: number;
    debugMode?: boolean;
  }) {
    this.requestsPerInterval = requestsPerInterval;
    this.intervalTime = intervalTime;
    this.debugMode = debugMode;
    if (debugMode) {
      console.time("RequestScheduler");
    }
  }
  public async schedule(request: Function) {
    let timeout = 0;
    if (this.queuedRequests >= this.requestsPerInterval) {
      timeout = this.intervalTime;
      this.queuedRequests = 0;
      if (this.debugMode) {
        console.info(
          "\x1b[36m%s\x1b[0m", // this makes our log a cyan color!
          `--- RequestScheduler: Wait ${timeout}ms ---`
        );
      }
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        this.queuedRequests++;
        this.totalRequests++;
        if (this.debugMode) {
          console.timeLog(
            "RequestScheduler",
            `#${this.totalRequests} ${request.name}`
          );
        }
        resolve(request());
      }, timeout);
    });
  }
}
