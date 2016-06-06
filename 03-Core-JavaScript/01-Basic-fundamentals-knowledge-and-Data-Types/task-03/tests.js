(function (global) {
  describe('MultiplicationTable', function () {
    describe('MultiplyTableToArray function', function () {
      it('should be defined', function () {
        expect(global.multiplyTableToArray).toBeDefined();
      });
      it('must return error if argument is not a number!', function () {
        expect(global.multiplyTableToArray(false)).toEqual('Error, argument is not a number!');
        expect(global.multiplyTableToArray('0abc')).toEqual('Error, argument is not a number!');
      });
      it('should return array', function () {
        expect(Array.isArray(global.multiplyTableToArray(3))).toEqual(true);
      });
      it('returned array must contain 9 elements', function () {
        expect(global.multiplyTableToArray(3).length).toEqual(9);
      });
      it('must return right elemtns', function () {
        expect(global.multiplyTableToArray(5)).toEqual([5, 10, 15, 20, 25, 30, 35, 40, 45]);
      });
    });

    describe('MultiplyTable function', function () {
      it('should be defined', function () {
        expect(global.multiplyTable).toBeDefined();
      });
      it('must return error if on of arguments is not a number!', function () {
        expect(global.multiplyTable()).toEqual('Error, one of arguments is not a number!');
        expect(global.multiplyTable('1abc', 2, 3)).toEqual('Error, one of arguments is not a number!');
        expect(global.multiplyTable(1, '2def', 3)).toEqual('Error, one of arguments is not a number!');
        expect(global.multiplyTable(1, 2, '3ghi')).toEqual('Error, one of arguments is not a number!');
      });
      it('should return an array', function () {
        expect(Array.isArray(global.multiplyTable(3, 5, 4))).toEqual(true);
      });
      it('return array should have right length', function () {
        expect(global.multiplyTable(3, 5, 4).length).toEqual(5);
      });
      it('return array should contain right arrays', function () {
        expect(global.multiplyTable(1, 1, 3)).toEqual([[null, 1, 2, 3], [1, 1, 2, 3], [2, 2, 4, 6], [3, 3, 6, 9]]);
      });
    });
    describe('MultiplyView function', function () {
      it('should be defined', function () {
        expect(global.multiplyView).toBeDefined();
      });
      it('must return error if on of arguments is not an array!', function () {
        expect(global.multiplyView()).toEqual('Error, argument is not an array!');
        expect(global.multiplyView('')).toEqual('Error, argument is not an array!');
      });
      it('should return a string', function () {
        expect(typeof global.multiplyView(global.multiplyTable(3, 5, 4))).toEqual('string');
      });
      it('return value should consists "\\n"', function () {
        expect(global.multiplyView(global.multiplyTable(3, 5, 4)).indexOf('\n')).not.toEqual(-1);
      });
      it('return right string', function () {
        expect(global.multiplyView(global.multiplyTable(3, 5, 4))).toEqual(' 3 4 5 6\n5 15 20 25 30\n6 18 24 30 36\n7 21 28 35 42\n8 24 32 40 48');
      });
    });
  });
})(this);