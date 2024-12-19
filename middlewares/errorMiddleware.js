const logger = require('../logger');

function errorHandler(err, req, res, next) {
    logger.error(`Error occurred: ${err.message}`)
    res.status(500).json({ error: 'Internal Server Error'})
}

module.exports = errorHandler;