class WorkHandler {
    constructor({ customRules }, taskExecutor) {
        this.customRules = customRules;
        this.executeTask = taskExecutor;
    }

    static getInstance(customRules, taskExecutor) {
        if (!WorkHandler.instance) {
            WorkHandler.instance = new WorkHandler(customRules, taskExecutor);
        }
        return WorkHandler.instance;
    }

    async executeTasks(tasks) {
        const maxPromiseBatch = this.customRules.maxPromiseBatch || 10;
        const maxBatchSize = this.customRules.maxBatchSize || tasks.length;

        const taskBatches = this.splitIntoBatches(tasks, maxBatchSize);
        return await this.executeBatches(taskBatches, maxPromiseBatch);
    }

    splitIntoBatches(tasks, batchSize) {
        const taskBatches = [];
        let currentBatch = [];

        for (let i = 0; i < tasks.length; i++) {
            currentBatch.push(tasks[i]);

            if (currentBatch.length === batchSize) {
                taskBatches.push(currentBatch);
                currentBatch = [];
            }
        }

        if (currentBatch.length > 0) {
            taskBatches.push(currentBatch);
        }

        return taskBatches;
    }

    async executeBatches(taskBatches = [], maxPromiseBatch) {
        const results = [];

        console.log("\x1b[33m",'Total batches count: ', taskBatches.length);

        for (const [index, batch] of taskBatches.entries()) {
            const promises = [];
            console.log("\x1b[33m",`Batch ${index + 1} - ${taskBatches.length} tasks processing...\n`);

            for (const task of batch) {
                promises.push(this.executeTask(task));

                if (promises.length === maxPromiseBatch) {
                    const batchResults = await Promise.allSettled(promises);
                    results.push(...batchResults);
                    promises.length = 0; // Reset the promises array
                }

            }
            if (promises.length > 0) {
                const batchResults = await Promise.allSettled(promises);
                results.push(...batchResults);
            }
            console.log("\x1b[33m",`Batch ${index + 1} completed`);
            await this.delay(this.customRules.sendDelay || 0);
        }

        console.log("\x1b[32m",`All Batches completed`);
        return results;
    }

    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = WorkHandler