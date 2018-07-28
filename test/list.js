const chai = require('chai');
const expect = chai.expect;

const prepend = function(element, list=null) {
  return {value: element, rest: list};
};
  
const arrayToList = function(array) {
  let head = {rest: null};
  let tail = head;
  for (let i of array) {
    tail.rest = {value: i, rest: null};
    tail = tail.rest;
  }
  return head.rest;
};
  
const listToArray = function(list) {
  let head = list;
  let array = [];
  while (head) {
    array.push(head.value);
    head = head.rest;
  }
  return array;
};
  
const nth = function(list, n) {
  if (!list) {
    return undefined;
  }
  if (n === 0) {
    return list.value;
  }
  return nth(list.rest, n-1);
};

describe('Lists', function() {
  it('arrayToList',function() {
    expect(arrayToList([10, 20])).to.deep.equal({value: 10, rest: {value: 20, rest: null}});
  });
  it('listToArray', function() {
    expect(listToArray(arrayToList([10, 20, 30])))
      .to.deep.equal([10, 20, 30]);
  });
  it('prepend', function() {
    expect(prepend(10, prepend(20, null)))
      .to.deep.equal({value: 10, rest: {value: 20, rest: null}});
  });
  it('nth', function() {
    expect(nth(arrayToList([10, 20, 30]), 1)).to.be.equal(20);
  });
});
