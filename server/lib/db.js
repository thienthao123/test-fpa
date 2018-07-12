var level = require('level')

var ttl = require('level-ttl')

module.exports = ttl(level('../' + process.env.db))