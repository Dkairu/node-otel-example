const express = require('express')
const app = express()
const mainport = 3500
const logger = require('../../winston/config')
const regularRoutes = require("../../routes/routes");
const path = require('path');

app.use("/public", express.static(path.join(__dirname,'../../views')));

app.use(express.urlencoded());
app.use(express.json());

app.use(regularRoutes);

logger.info("Ready to initialize servers")

app.listen(mainport, () => {
  logger.info(`Main app listening on port ${mainport}`)
})
