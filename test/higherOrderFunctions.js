const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

const flatten = function(array) {
  // Code here
};

const loop = function(value,test,update,body) {
  // Code here
};

const every = function(array, test) {
  // Code here
};

describe('Higher Order Functions', function() {

  describe("Flattening", function() {
    it('Should flatten array', function() {
      let arrays = [[1, 2, 3], [4,5], [6]];
      expect(flatten(arrays)).to.equal([1, 2, 3, 4, 5, 6]);
    });
  });

  describe('Loop', function() {
    it('Should produce expected output', function() {
      let stub = sinon.stub(console, "log");
      try {
        loop(3, n => n > 0, n => n -1, console.log);
      } finally {
        stub.restore();
      }
      expect(stub.callCount).to.equal(3);
      expect(stub.getCall(0).calledWith(3)).to.be.true;
      expect(stub.getCall(1).calledWith(2)).to.be.true;
      expect(stub.getCall(2).calledWith(1)).to.be.true;
    });
  });

  describe('every', function() {
    it('Should work as expected', function() {
      expect(every([1, 3, 5], n => n < 10)).to.be.true;
      expect(every([2, 4, 16], n => n < 10)).to.be.false;
      expect(every([], n => n < 10)).to.be.true;
    });
  });
  
});