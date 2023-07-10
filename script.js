const dotenv = require('dotenv');
dotenv.config();
const emails = require('./assets/mails.json');

const validateEnv = require('./lib/utils/validateEnv');
const writeLogs = require('./lib/utils/writeLogs');
const runBulkEmailScript = require('./lib/runBulkScript');
const configurations = require('./config.json');

validateEnv();

(async () => {

    const result = await runBulkEmailScript(
        emails,
        configurations
    );

    const failed = result.filter((el) => el.status == 'rejected');
    const success = result.filter((el) => el.status == 'fulfilled')

    await writeLogs(JSON.stringify(failed), 'logs/failed_logs.json');
    await writeLogs(JSON.stringify(success), 'logs/success_logs.json');

    console.log(
        "\x1b[33m", `Total Tasks: ${emails.length}`
    )
    console.info(
        "\x1b[33m",`Success: ${success.length}`
    );
    console.log(
        "\x1b[33m", `Failed: ${failed.length}`
    );
    console.log("\x1b[35m",'.........')
    process.exit(1);
})()

