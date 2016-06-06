var formValidator = (function () {
  var message = function(message) {
    alert(message);
  };

  return {
    validateLength: function () {
      var $inputs         = document.querySelectorAll('input[type="text"]');
      var inputsLength    = $inputs.length;
      var maxLetterLength = 3;

      for (var i = 0; i < inputsLength; i++) {
        if ($inputs[i].value.length >= maxLetterLength) {
          message('Success');
        } else {
          message('Error');
        }
      }
      return false;
    }
  };
})();

var registerForm = document.getElementById('registerForm');
registerForm.onsubmit = formValidator.validateLength;
