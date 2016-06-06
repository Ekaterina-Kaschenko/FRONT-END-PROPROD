var FormValidator;

FormValidator = (function() {
  var regexeps, regExpTest;

  function FormValidator(formid, fields) {
    var self        = this;

    this.formname   = formid;
    this.fields     = {};

    this.fieldNames = Object.keys(fields);

    this.regexps    = regexeps();
    this.hasErrors  = true;

    this.fieldNames.forEach(function(field) { self.fields[field] = document.getElementById(field); });

    this.init();
    this.submit();
  }

  regexeps = function() {
    return {
      phone: /([0-9]){10}/g,
      email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      psw: /(?=^.{7,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-z]).*/
    };
  };

  regExpTest = function(regexp, string) {
    return regexp.test(string);
  };

  FormValidator.prototype.validate = function() {
    var self = this;

    return {
      full_name: function() {
        var full_name = self.fields.full_name;

        var isValid   = full_name.value.length;

        return {
          field:   full_name,
          isValid: isValid
        };
      },
      phone: function() {
        var phone   = self.fields.phone;

        var isValid = regExpTest(self.regexps.phone, phone.value) && phone.value.length;

        return {
          field:   phone,
          isValid: isValid
        };
      },
      email: function() {
        var email   = self.fields.email;

        var isValid = regExpTest(self.regexps.email, email.value) && email.value.length;

        return {
          field:   email,
          isValid: isValid
        };
      },
      psw: function() {
        var psw     = self.fields.psw;

        var isValid = regExpTest(self.regexps.psw, psw.value) && psw.value.length >= 7;

        return {
          field:   psw,
          isValid: isValid
        };
      },
      psw_r: function() {
        var psw     = self.fields.psw;
        var psw_r   = self.fields.psw_r;

        var isValid = psw.value === psw_r.value;

        return {
          field:   psw_r,
          isValid: isValid
        };
      },
      country: function() {
        var country = self.fields.country;

        var isValid = country.value.length;

        return {
          field:   country,
          isValid: isValid
        };
      },
      postcode: function() {
        var postcode = self.fields.postcode;

        var isValid  = postcode.value.length === 5;

        return {
          field:   postcode,
          isValid: isValid
        };
      },
      add_text: function() {
        var add_text = self.fields.add_text;

        var isValid  = true;

        return {
          field:   add_text,
          isValid: isValid
        };
      }
    };
  };

  FormValidator.prototype.manageClasses = function(params) {
    if (typeof params !== 'object') { return; }

    if (params.isValid)  {
      params.field.classList.add('valid');
      params.field.classList.remove('error');
    }
    if (!params.isValid) {
      params.field.classList.add('error');
      params.field.classList.remove('valid');
    }
    return params.isValid;
  };

  FormValidator.prototype.initEvents = function() {
    var self = this;

    return {
      emailTypeEvents: function() {
        ['copy', 'cut', 'paste'].forEach(function(emailEvent) {
          self.fields.email.addEventListener(emailEvent, function(event) { event.preventDefault(); });
        });
      },
      emailSymbolsToggler: function() {
        window.addEventListener('keydown', function(event) {
          if (event.ctrlKey && (event.keyCode === 'E'.charCodeAt(0) || event.keyCode === 'R'.charCodeAt(0))) {
            self.fields.psw.setAttribute('type', event.keyCode === 'E'.charCodeAt(0) ? 'text' : 'password');
            event.preventDefault();
          }
        });
      },
      pswStrength: function() {
        var psw          = self.fields.psw;

        var $pswStrengrh = document.getElementsByClassName('psw-strength')[0];

        psw.addEventListener('keyup', function() {
          var params = {};

          if (!psw.value.length) { params.display = 'none';  }
          if (psw.value.length)  { params.display = 'block'; }

          if (psw.value.length && psw.value.length < 4)       { params.width = 25;  params.bgColor = 'red';    }
          if (psw.value.length >= 4 && psw.value.length <= 6) { params.width = 50;  params.bgColor = 'orange'; }
          if (psw.value.length >= 7)                          { params.width = 100; params.bgColor = 'green';  }

          $pswStrengrh.style.display         = params.display;
          $pswStrengrh.style.width           = params.width + '%';
          $pswStrengrh.style.backgroundColor = params.bgColor;
        });
      },
      add_textCounter: function() {
        var $charCount = document.getElementById('char-count');
        self.fields.add_text.addEventListener('keyup', function() {
          $charCount.innerHTML = self.fields.add_text.value.length;
        });
      },
      validateUpdater: function() {
        Object.keys(self.fields).map(function(field) {
          self.fields[field].addEventListener('keyup', function() { self.manageInputs(); });
        });
      }
    };
  };

  FormValidator.prototype.manageInputs = function() {
    var self       = this;
    var checker    = this.validate();

    this.hasErrors = false;

    this.fieldNames.forEach(function(field) {
      if (!self.manageClasses(checker[field]())) { self.hasErrors = true; }
    });

  };

  FormValidator.prototype.manageSubmit = function() {
    var self = this;

    document.getElementById(this.formname).addEventListener('submit', function(event) {
      event.preventDefault();

      self.manageInputs();

      if (!self.hasErrors) { alert('Successfully registered'); }
      if (self.hasErrors)  { alert('Fill all required field and verify your infromation'); }
    });
  };

  FormValidator.prototype.init = function() {
    var self       = this;
    var initEvents = Object.keys(this.initEvents());

    initEvents.forEach(function(event) { self.initEvents()[event](); });
  };

  FormValidator.prototype.submit = function() {
    this.manageSubmit();
  };

  return FormValidator;

})();

new FormValidator('r-form', {
  full_name: 'full_name',
  phone:     'phone',
  email:     'email',
  psw:       'psw',
  psw_r:     'psw_r',
  country:   'country',
  postcode:  'postcode',
  add_text:  'add_text'
});
