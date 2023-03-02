const cluster = require('cluster');
const os = require('os');
const express = require('express');


const numCPUs = os.cpus().length;


if (cluster.isMaster) {
    console.log(`Master process is running with PID ${process.pid}`);
    
    // Create worker threads based on the number of CPUs
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  
    // Listen for workers being online
    cluster.on('online', (worker) => {
      console.log(`Worker process ${worker.process.pid} is online`);
    });
  
    // Listen for workers exiting
    cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker process ${worker.process.pid} has exited with code ${code} and signal ${signal}`);
      console.log('Starting a new worker');
      cluster.fork();
    });
  } else {
    const app = express();
  
    app.get('/', (req, res) => {
      res.send(`Hello from worker ${process.pid}`);
    });
  
    app.listen(3000, () => {
      console.log(`Worker process ${process.pid} is listening on port 3000`);
    });