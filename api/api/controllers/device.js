'use strict';

var util = require('util');
var connection;

module.exports = {
		getStatus: getStatus,
		getValue: getValue
};

function getStatus(req, res) {
	var deviceName = req.swagger.params.deviceName.value || 'unknow';
	
	dbConnection();
	connection.query('SELECT status AS solution FROM device WHERE name="'+deviceName+'"', function (error, results, fields) {
	  if (error) throw error;
	  res.json(results[0].solution);
	});
	connection.end();
}

function getValue(req, res) {
	var deviceName = req.swagger.params.deviceName.value || 'unknow';
	res.json(deviceName);
}

function dbConnection() {
	var mysql      = require('mysql');
	connection = mysql.createConnection({
	  host     : '127.0.0.1',
	  user     : 'root',
	  password : 'root',
	  database : 'HouseIoT',
	  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
	});

	connection.connect();
}