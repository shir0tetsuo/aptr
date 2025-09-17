const { v4: uuidv4 } = require('uuid');

function newUUID() { 
    uuid = uuidv4()
    return uuid 
}

module.exports = { newUUID }