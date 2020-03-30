"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var Company_1 = require("./modules/Company");
var app = express();
var company = new Company_1.Company('Meow Meow meow meow');
app.get('/', function (req, res) {
    res.send('Hail Enhydra!');
});
app.get('/api/employees', function (req, res) {
    res.send(company.getAllEmployees());
});
app.get('/api/allsalaries', function (req, res) {
    res.send(company.getAllSalaries());
});
app.get('/api/history', function (req, res) {
    res.send(company.getHistory());
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
