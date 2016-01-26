var neo4j = require('node-neo4j');
var db = new neo4j("http://FicklePiglet:WCdiwRlhygf4M6g5Itvi@ficklepiglet.sb02.stations.graphenedb.com:24789");

module.exports = db;