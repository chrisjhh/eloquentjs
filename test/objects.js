const chai = require('chai');
const expect = chai.expect;

class Vec {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }

  plus(vector) {
    return new Vec(this.x + vector.x, this.y + vector.y);
  }

  minus(vector) {
    return new Vec(this.x - vector.x, this.y - vector.y);
  }

  get length() {
    return Math.sqrt(this.x*this.x + this.y*this.y);
  }
   
}

describe('Objects', function() {
  describe('vector', function() {
    it('plus', function() {
      expect(new Vec(1,2).plus(new Vec(2,3)))
        .to.deep.equal({x: 3, y:5});
    });
    it('minus', function() {
      expect(new Vec(1,2).minus(new Vec(2,3)))
        .to.deep.equal({x: -1, y: -1});
    });
    it('length', function() {
      expect(new Vec(3,4).length).to.equal(5);
    });
  });
});