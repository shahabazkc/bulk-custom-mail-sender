
const path = require('path');

const getTemplateMessage = (data = { email: [], template: 1 }) => {
    let attachments = [];

    // You can make custom logic and update the template based on your requirements

    let message = `Test Message - Template ${data.template}`;
    let subject = `Test Subject - ${data.template}`;


    if (data.template % 2 == 0) attachments.push(addAttachment('test.txt'));
    else attachments.push(addAttachment('test.html'))

    return {
        message: message,
        recipients: data.email,
        subject: subject,
        attachments: attachments
    }
}


const addAttachment = (fileName = '') => {
    const fileExtension = path.extname(fileName).toLowerCase();
    let contentType = '';

    switch (fileExtension) {
        case '.pdf':
            contentType = 'application/pdf';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        // Add more cases for other file extensions if needed
        default:
            contentType = 'application/octet-stream'; // Default content type
    }

    return {
        filename: fileName,
        path: path.join('assets/attachments', fileName),
        contentType: contentType,
    };
};


module.exports = getTemplateMessage;