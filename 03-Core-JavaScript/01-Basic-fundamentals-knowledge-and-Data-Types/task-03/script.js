var multiplyTableToArray, multiplyView, isNumeric, multiplyTable;

multiplyTableToArray = function (number) {
  if (!isNumeric(number)) {
    return 'Error, argument is not a number!';
  }
  var result = [];
  for (var i = 1; i <= 9; i++) {
    result.push(number * i);
  }
  return result;
};

isNumeric = function (n) {
  return typeof n === 'number';
};

multiplyTable = function (number1, number2, size) {
  if (!isNumeric(number1) || !isNumeric(number2) || !isNumeric(size)) {
    return 'Error, one of arguments is not a number!';
  }

  var matrix = [];
  var i, j;
  for (i = 0; i <= size; i++) {
    matrix.push([]);
  }
  for (i = 0; i <= size; i++) {
    matrix[i].push(i === 0 ? null : number2++);
    for (j = 1; j < matrix.length; j++) {
      if (i === 0) {
        matrix[i].push(number1++);
      }
      if (i !== 0) {
        matrix[i].push(matrix[i][0] * matrix[0][j]);
      }
    }
  }
  return matrix;
};

multiplyView = function (matrix) {
  if (!Array.isArray(matrix)) {
    return 'Error, argument is not an array!';
  }
  return matrix.join('\n').replace(/,/g, ' ');
};
