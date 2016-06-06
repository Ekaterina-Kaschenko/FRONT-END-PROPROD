var sum, sub, mul, div, rem, calculations, calculate, isNumeric, isValidOperation;

sum = function(a, b) { return a + b; };
sub = function(a, b) { return a - b; };
mul = function(a, b) { return a * b; };
div = function(a, b) { return a / b; };
rem = function(a, b) { return a % b; };
calculations = {
  '+': sum,
  '-': sub,
  '*': mul,
  '/': div,
  '%': rem
};

calculate = function(operation, a, b) {
  if (!isValidOperation(operation))   { return 'Error, unsupported operation!'; }
  if (!isNumeric(a) || !isNumeric(b)) { return 'Error, operands should be numbers!'; }

  return calculations[operation](a, b);
};

isNumeric = function(n) {
  return typeof n === 'number';
};

isValidOperation = function(operation) {
  return Object.keys(calculations).indexOf(operation) + 1;
};
