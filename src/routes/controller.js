const path = require("path");
const axios = require("axios");
const logger = require('../winston/config')
const fs = require('fs')


exports.getData = async (req, res, next) => {
    res.sendFile(path.join(__dirname, "../views", "index.html"));
    logger.info('Connected to page succesfully')
    const dataLocation = path.join(__dirname, '..')
    fs.appendFileSync(dataLocation + '/logs/app.logs', "New log line after winston log" + "\n")
};
exports.randomData = async (req, res, next) => {
    await axios
        .get("http://localhost:3600")
        .then(res => {
            logger.info(`Connection from port 3500 to 3600 with statusCode: ${res.status}`)
            const dataLocation = path.join(__dirname, '..')
            fs.appendFileSync(dataLocation + '/logs/app.logs', "Writing another non-winston log after connecting to port 3600" + "\n")
        })
        .catch(error => {
            console.error(error)
            logger.error(error)
        });
    res.sendFile(path.join(__dirname, "../views", "index.html"));
};