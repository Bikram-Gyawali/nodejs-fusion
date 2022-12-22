const schedule = require('node-schedule');

class TaskSchedule {
    constructor(taskFns, socket) {
        this.taskFns = taskFns;
        this.socket = socket;

        process.on('SIGINT', async () => {
            await schedule.gracefulShutdown();
            process.exit(0);
        });
    }

    addTask(task) {
        const {id, cron_string} = task;
        const job = schedule.scheduleJob(`job:${id}`, cron_string, () => {
            this.socket.sendTask(task);
        });
        return job;
    }

    async populateTasks() {
        const tasks = await this.taskFns.getIncomplete();
        return tasks.map(t => this.addTask(t));
    }

    clearTasks() {
        Object.keys(schedule.scheduledJobs).map(k => {
            const job = schedule.scheduledJobs[k];
            job.cancel();
        });
    }

    async rebuildSchedule() {
        this.clearTasks();
        await this.populateTasks();
    }
}

module.exports = TaskSchedule;
