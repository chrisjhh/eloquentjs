const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

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

class GroupIterator {
  constructor(group) {
    this.index = -1;
    this.group = group;
  }

  next() {
    ++this.index;
    if (this.index >= this.group.contents.length) {
      return {done: true};
    }
    const value = this.group.contents[this.index];
    return {value, done: false};
  }
}

Group.prototype[Symbol.iterator] = function() {
  return new GroupIterator(this);
};

class PGroup {
  constructor(contents) {
    this.contents = contents;
  }
  has(value) {
    return this.contents.includes(value);
  }
  add(value)  {
    if (this.has(value)) {
      return this;
    }
    return new PGroup(this.contents.concat(value));
  }
  delete(value) {
    let i = this.contents.indexOf(value);
    if (i === -1) {
      return this;
    }
    return new PGroup(this.contents.slice(0,i)
      .concat(this.contents.slice(i+1)));
  }
  
}

PGroup.empty = new PGroup([]);



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
  describe('group', function(){
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
    it('should be iterable', function() {
      const stub = sinon.stub(console, 'log');
      try {
        for (let value of Group.from(["a", "b", "c"])) {
          console.log(value);
        }
      } finally {
        stub.restore();
      }
      expect(stub.callCount).to.equal(3);
      expect(stub.getCall(0).calledWith("a")).to.be.true;
      expect(stub.getCall(1).calledWith("b")).to.be.true;
      expect(stub.getCall(2).calledWith("c")).to.be.true;
    });
  });
  describe('Borrowing a method', function() {
    it('should work', function() {
      let map = {one: true, two: true, hasOwnProperty: true};

      expect(Object.prototype.hasOwnProperty.call(map,'one')).to.be.true;
    });
  });

  describe('PGroup', function() {
    it('Should work as expected', function() {
      let a = PGroup.empty.add("a");
      let ab = a.add("b");
      let b = ab.delete("a");

      expect(b.has("b")).to.be.true;
      // → true
      expect(a.has("b")).to.be.false;
      // → false
      expect(b.has("a")).to.be.false;
    });
  });
});