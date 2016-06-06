function sum() {
  var result = 0;
  var i;
  for (i = 0; i < arguments.length; i++) { result += arguments[i]; }
  return result;
}
console.log(sum(1, 2, 3, 4));
console.log(sum(10, 20, 30));
console.log(sum(5, 10));
