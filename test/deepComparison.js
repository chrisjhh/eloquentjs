const chai = require('chai');
const expect = chai.expect;

let obj = {here: {is: 'an'}, object: 2};

const deepEqual = function(a,b) {
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (typeof a !== 'object' || typeof b !== 'object') {
    return false;
  }
  if (Object.keys(a).length != Object.keys(b).length) {
    return false;
  }
  for (let k in a) {
    if (!(k in b)) {
      return false;
    }
  }
  for (let k in a) {
    if (!deepEqual(a[k],b[k])) {
      return false;
    }
  }
  return true;
};

describe('deepEqual', function() {
  it('identical objects', function() {
    expect(deepEqual(obj, obj)).to.be.true;
  });
  it('different objects', function() {
    expect(deepEqual(obj, {here: 1, object: 2})).to.be.false;
  });
  it('same deep values', function() {
    expect(deepEqual(obj, {here: {is: 'an'}, object: 2})).to.be.true;
  });
});

