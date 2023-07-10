const util = require('util');
const fs = require('fs');

const writeFileAsync = util.promisify(fs.writeFile);

async function writeLogs(logs, dir) {
    try {
        await writeFileAsync(dir, logs);
    } catch (error) {
        throw error
    }
}

module.exports = writeLogs