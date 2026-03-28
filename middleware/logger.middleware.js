const {v4: uuidv4} = require('uuid')

const generateLogId = (req,res,next) => {
    const id = uuidv4();
    res.logId = id;
    next();
}

module.exports = {generateLogId}