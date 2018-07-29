const chai = require('chai');
const expect = chai.expect;

let output = '';

const divisibleBy = n => x => x % n === 0;
const fizz = divisibleBy(3);
const buzz = divisibleBy(5);
const fizzBuzz = n =>
  (fizz(n) ? 'Fizz' : '') + (buzz(n) ? 'Buzz' : '');

for (let i=1; i<=100; ++i) {
  output += (fizzBuzz(i) || i) + '\n';
}

describe('FizzBuzz', function() {
  it('check output', function() {
    let expected = '';
    for (var i=1; i<=100; ++i) {
      let special = '';
      if (i % 3 === 0) {
        special = 'Fizz';
      }
      if (i % 5 === 0) {
        special += 'Buzz';
      }
      expected += (special || i) + '\n';
    }
    expect(output).to.equal(expected);
  });
});