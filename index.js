var request = require('request')

const BASE_URL = "https://parkera.karlskrona.se/api";
// Endpoints
const CHECK_SESSION = "/checksession";
const LOGIN = "/Login";
const NEW_PASSWORD = "/newpassword";
const CARS = "/Cars";
const ADD_CAR = "/AddCar";
const GET_PARKER = "/GetParker";
const HISTORY = "/History";
const PARKING = "/Parking";
const ZONE_ITEMS = "/ZoneItems";
const START_PARKING = "/Startparking";
const START_PERIOD = "/Startperiod";

const APP_VER = "1.1";

var sessionToken = null;

function performRequest(endpoint, data, callback) {
	if(data == null) { data = {}; }
	data.customer = 1;
	data.appver = APP_VER;
	data.session = sessionToken;
	request({
		url: BASE_URL + endpoint,
		method: 'POST',
		form: data
	}, function(error, response, body) {
		var data = JSON.parse(body);
		var err = null;
		if(data.status.status != 'OK') {
			err = data.status;
		}
		if(data.session) {
			sessionToken = data.session;
		}
		return callback(err, JSON.parse(body));
	});
}

function checkSession(callback) {
	performRequest(CHECK_SESSION, {
		type: 'verify'
	}, callback);
}

function login(phoneNumber, pinCode, callback) {
	performRequest(LOGIN, {
		user: phoneNumber, password: pinCode
	}, callback);
}

function newPassword(phoneNumber, callback) {
	performRequest(NEW_PASSWORD, {
		phone: phoneNumber
	}, callback);
}

function getCars(callback) {
	performRequest(CARS, null, callback);
}

function addCar(regNumber, callback) {
	performRequest(ADD_CAR, {
		operation: 'new',
		regno: regNumber
	}, callback);
}

function deleteCar(carNumber, callback) {
	performRequest(ADD_CAR, {
		operation: 'delete',
		carno: carNumber
	}, callback);
}

function getParker( callback) {
	performRequest(GET_PARKER, null, callback);
}

function getHistory(pageSize, page, endDate, startDate, callback) {
	performRequest(HISTORY, {
		pagesize: pageSize,
		page: page,
		enddate: endDate,
		startdate: startDate
	}, callback);
}

function getZoneItems( callback) {
	performRequest(ZONE_ITEMS, null, callback);
}

function startParking(carNumber, zone, callback) {
	performRequest(START_PARKING, {
		carno: carNumber,
		zone: zone,
		limit: 0
	}, callback);
}

function stopParking(parkingNumber, callback) {
	performRequest(PARKING, {
		type: 'zone',
		operation: 'stop',
		parkingno: parkingNumber
	}, callback);
}

function startPeriod(carNumber, zone, startDate, recurring, callback) {
	performRequest(START_PERIOD, {
		carno: carNumber,
		zone: zone,
		startdate: startDate,
		recurring: recurring
	}, callback);
}

module.exports = {
	login: login,
	checkSession: checkSession,
	newPassword: newPassword,
	getCars: getCars,
	addCar: addCar,
	getParker: getParker,
	getHistory: getHistory,
	getZoneItems: getZoneItems,
	startParking: startParking,
	stopParking: stopParking,
	startPeriod: startPeriod
};