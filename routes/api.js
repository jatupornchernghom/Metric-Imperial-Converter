'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    let initNum;
    let initUnit;

    try {
      initNum = convertHandler.getNum(req.query.input);
    } catch (e) {
      initNum = null;
    }

    try {
      initUnit = convertHandler.getUnit(req.query.input);
    } catch (e) {
      initUnit = null;
    }

    if (initNum === null && initUnit === null) {
      res.json('invalid number and unit');
      return;
    }

    if (initNum === null) {
      res.json('invalid number');
      return;
    }

    if (initUnit === null) {
      res.json('invalid unit');
      return;
    }
    const json = {
      initNum,
      initUnit,
      returnNum: convertHandler.convert(initNum, initUnit),
      returnUnit: convertHandler.getReturnUnit(initUnit),
    }
    const string = convertHandler.getString(initNum, initUnit, json.returnNum, json.returnUnit);
    json.string = string;

    res.json(json);
  })
};
