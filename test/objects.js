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

class Group {
  constructor() {
    this.contents = [];
  }
  has(value) {
    return this.contents.includes(value);
  }
  add(value)  {
    if (!this.has(value)) {
      this.contents.push(value);
    }
  }
  delete(value) {
    let i = this.contents.indexOf(value);
    if (i !== -1) {
      this.contents = this.contents.slice(0,i)
        .concat(this.contents.slice(i+1));
    }
  }
  static from(iterable) {
    let group = new Group();
    for (let v of iterable) {
      group.add(v);
    }
    return group;
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
  describe.only('group', function(){
    it('constructor and has', function() {
      let group = Group.from([10, 20]);
      expect(group.has(10)).to.be.true;
      expect(group.has(30)).to.be.false;
    });
    it('add and delete', function() {
      let group = Group.from([10, 20]);
      group.add(10);
      group.delete(10);
      expect(group.has(10)).to.be.false;
    });
  });
});