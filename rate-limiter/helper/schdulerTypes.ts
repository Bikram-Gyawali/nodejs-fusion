
const fasterScheduler = new RequestScheduler({
    requestsPerInterval: 100,
    intervalTime: 1000,
  });
  const slowerScheduler = new RequestScheduler({
    requestsPerInterval: 20,
    intervalTime: 5000,
  });