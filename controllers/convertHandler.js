function ConvertHandler() {

  const validUnits = {
    gal: 'gallons',
    L: 'liters',
    lbs: 'pounds',
    kg: 'kilograms',
    mi: 'miles',
    km: 'kilometers',
  }

  const lowAlphRange = 97;
  const highAlphRange = 122;
  
  this.getNum = function(input) {
    let numEnd = -1;

    for (let i = input.length - 1; i > -1; i--) {
      const cVal = input[i].toLowerCase().charCodeAt();

      if (cVal < lowAlphRange || cVal > highAlphRange) {
        if (input[i] === ' '|| Number.isNaN(Number(input[i]))) {
          throw Error('A unit must be preceded by an integer');
        }
        numEnd = i + 1;
        break
      }
    }

    if (numEnd === -1) {
      return 1; 
    }

    let num = input.slice(0, numEnd);

    if (!Number.isNaN(Number(num))) {
      return Number(num);
    }

    let frac = num.indexOf('/');

    num = Number(num.slice(0, frac) / num.slice(frac + 1));

    if (Number.isNaN(num)) {
      throw Error('NaN')
    }

    return num;
  };
  
  this.getUnit = function(input) {
    let unit = '';

    for (let i = input.length - 1; i > input.length - 4 && i > -1; i--) {
      const cVal = input[i].toLowerCase().charCodeAt();

      if (cVal < lowAlphRange || cVal > highAlphRange) {
        break;
      }

      unit = `${String.fromCharCode(cVal)}${unit}`;
    }

    if (!validUnits[unit] && unit !== 'l') {
      throw Error('invalid unit');
    }
    
    return unit !== 'l' ? unit : 'L';
  };
  
  this.getReturnUnit = function(initUnit) {
    if (initUnit === 'gal') {
      return 'L';
    }

    if (initUnit === 'L') {
      return 'gal';
    }

    if (initUnit === 'lbs') {
      return 'kg';
    }

    if (initUnit === 'kg') {
      return 'lbs';
    }

    if (initUnit === 'mi') {
      return 'km';
    }

    if (initUnit === 'km') {
      return 'mi';
    }
  };

  this.spellOutUnit = function(unit) {
    return validUnits[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    if (initUnit === 'gal') {
      return Number((initNum * galToL).toFixed(5));
    }

    if (initUnit === 'L') {
      return Number((initNum / galToL).toFixed(5));
    }

    if (initUnit === 'lbs') {
      return Number((initNum * lbsToKg).toFixed(5));
    }

    if (initUnit === 'kg') {
      return Number((initNum / lbsToKg).toFixed(5));
    }

    if (initUnit === 'mi') {
      return Number((initNum * miToKm).toFixed(5));
    }

    if (initUnit === 'km') {
      return Number((initNum / miToKm).toFixed(5));
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
  };
  
}

module.exports = ConvertHandler;
