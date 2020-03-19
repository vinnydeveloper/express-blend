const fs = require('fs')

function logDB(req, res, next){
    fs.appendFileSync('logDB.txt', "Foi criado um registro pela url: " + req.url)
    next();
}

module.exports = logDB