const express = require('express')
const randomize = express()
const randomizeport = 3600
const logger = require('../../winston/config')
const fs = require('fs');
const path = require("path");
const opentelemetry = require('@opentelemetry/api')

randomize.get('/', (req, res, next) => {
    const dataLocation = path.join(__dirname, '..', '..')
    const random = Math.floor(Math.random() * 100)
    const currentspan = opentelemetry.trace.getSpan(opentelemetry.context.active());
    const trace = currentspan._spanContext.traceId
    const span = currentspan._spanContext.spanId
    res.json(['Your new random number is ', random]);
    logger.info('Generated number is ' + random)
    fs.appendFileSync(dataLocation + '/logs/app.logs', "Writing non json log" + "\n")
    const timeNow = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    fs.appendFileSync(dataLocation + '/views/data/data.txt', timeNow + ' Your generated random number at this time is ' + random + "\n");
    logger.info('Generated number ' + random + ' has been written to data.txt file.')
    fs.appendFileSync(dataLocation + '/logs/app.logs', "Writing another line of non json log " + `trace.id: ${trace}` + ` span.id: ${span}` + "\n")

});

randomize.listen(randomizeport, () => {
    logger.info(`Randomize app listening on port ${randomizeport}`)
})