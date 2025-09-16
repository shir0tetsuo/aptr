/*

    This is not production-ready

*/

// server application module
const express = require('express')

// extended features
const bparse = require('body-parser') //https://codeforgeek.com/handle-get-post-request-express-4/
const cookies = require('cookie-parser') //https://stackoverflow.com/questions/16209145/how-to-set-cookie-in-node-js-using-express-framework

// fs
const ff = require('fs')
const fs = require('fs').promises;
const path = require('path');

// server decl
const server = express();
const port = 8156;

// include json
server.use(bparse.urlencoded({ extended: true }));
server.use(bparse.json());
server.use(express.json());

// cookies
server.use(cookies())

// Serve static content from /static
server.use('/static', express.static(path.resolve('./static')))
server.use('/favicon.ico', express.static(path.resolve('./favicon.ico')))
server.use('/robots.txt', express.static(path.resolve('./robots.txt')))

// private configuration
require("dotenv").config();

// the start time of the application
let application_start = new Date();

/**
 * Read file from fs like from `'/private'`
 * 
 * @param {string} filePath 
 * @returns {string} file data => `data.toString()`
 */
async function readFile(filePath) {
    try {
      const data = await fs.readFile(filePath);
      return data.toString()
    } catch (error) {
      console.error(`Read Error: ${error.message}`);
    }
}

server.get('/', async(req, res) => {

    page = await readFile('./factory/test_page.html')

    res.status(200).send(page)
})



/*

  #################################################################################
    Start Server Listener (END)
  #################################################################################

*/
server.listen(
    port,
    () => console.log(`Connection open @ localhost:${port}`)
)