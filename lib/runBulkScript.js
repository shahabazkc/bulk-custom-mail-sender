const getTemplateMessage = require('../assets/getTemplateMsg');
const sendEmail = require('./utils/sendEmail');
const WorkHandler = require('./handler/workHandler');

const runBulkEmailScript = async (emails = [], configuration = {}) => {

    async function executor(mail) {
        try {
            const { message, recipients, subject, attachments } = getTemplateMessage(mail);
            return await sendEmail({ message, recipients, subject, attachments });
        } catch (error) {
            return Promise.reject({
                ...mail,
                error
            })
        }
    };
    const workHandler = WorkHandler.getInstance(configuration, executor);
    return await workHandler.executeTasks(emails)
}

module.exports = runBulkEmailScript;