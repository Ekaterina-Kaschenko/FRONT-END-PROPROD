(function (global) {

  describe('Calculator', function () {
    describe('Sum function', function () {
      it('should be defined', function () {
        expect(global.sum).toBeDefined();
      });
      it('should sum two numbers', function () {
        expect(global.sum(1, 2)).toEqual(3);
        expect(global.sum(11, 0)).toEqual(11);
      });
    });

    describe('Substruction function', function () {
      it('should be defined', function () {
        expect(global.sub).toBeDefined();
      });
      it('should substract the second argument from the first', function () {
        expect(global.sub(10, 2)).toEqual(8);
        expect(global.sub(11, 0)).toEqual(11);
      });
    });

    describe('Multiplication function', function () {
      it('should be defined', function () {
        expect(global.mul).toBeDefined();
      });
      it('should multiply two numbers', function () {
        expect(global.mul(4, 5)).toEqual(20);
        expect(global.mul(11, 0)).toEqual(0);
      });
    });

    describe('Devision function', function () {
      it('should be defined', function () {
        expect(global.div).toBeDefined();
      });
      it('should devide first argument by the second', function () {
        expect(global.div(20, 5)).toEqual(4);
        expect(global.div(20, 0)).toEqual(Infinity);
      });
    });

    describe('Remainder function', function () {
      it('should be defined', function () {
        expect(global.rem).toBeDefined();
      });
      it('should devide first argument by the second', function () {
        expect(global.rem(22, 5)).toEqual(2);
        expect(global.rem(-23, 5)).toEqual(-3);
      });
    });

    describe('Calculations object', function () {
      it('should be defined', function () {
        expect(global.calculations).toBeDefined();
      });
      it('must contain method for sum', function () {
        expect(global.calculations['+']).toBeDefined();
        expect(global.calculations['+'](1, 2)).toEqual(3);
      });
      it('must contain method for re', function () {
        expect(global.calculations['-']).toBeDefined();
        expect(global.calculations['-'](10, 2)).toEqual(8);
      });
      it('must contain method for multiplication', function () {
        expect(global.calculations['*']).toBeDefined();
        expect(global.calculations['*'](4, 5)).toEqual(20);
      });
      it('must contain method for devision', function () {
        expect(global.calculations['/']).toBeDefined();
        expect(global.calculations['/'](20, 5)).toEqual(4);
      });
      it('must contain method for take remainder', function () {
        expect(global.calculations['%']).toBeDefined();
        expect(global.calculations['%'](22, 5)).toEqual(2);
      });
    });

    describe('Calculate function', function () {
      it('should be defined', function () {
        expect(global.calculate).toBeDefined();
      });
      it('must return error if operation is wrong', function () {
        expect(global.calculate('^', 1, 2)).toEqual('Error, unsupported operation!');
        expect(global.calculate('+-', 1, 2)).toEqual('Error, unsupported operation!');
      });
      it('must return error if operands are wrong', function () {
        expect(global.calculate('+', '1', 2)).toEqual('Error, operands should be numbers!');
        expect(global.calculate('+', 1, '2')).toEqual('Error, operands should be numbers!');
        expect(global.calculate('+', false, 2)).toEqual('Error, operands should be numbers!');
        expect(global.calculate('+', {}, 2)).toEqual('Error, operands should be numbers!');
        expect(global.calculate('+', null, 2)).toEqual('Error, operands should be numbers!');
        expect(global.calculate('+', undefined, 2)).toEqual('Error, operands should be numbers!');
      });
      it('must perform sum operation', function () {
        expect(global.calculate('+', 1, 2)).toEqual(3);
      });
      it('must perform substracting operation', function () {
        expect(global.calculate('-', 10, 2)).toEqual(8);
      });
      it('must perform multiplication operation', function () {
        expect(global.calculate('*', 4, 5)).toEqual(20);
      });
      it('must perform devision operation', function () {
        expect(global.calculate('/', 20, 5)).toEqual(4);
      });
      it('must perform take remainder operation', function () {
        expect(global.calculate('%', 22, 5)).toEqual(2);
      });
    });
  });


})(this);