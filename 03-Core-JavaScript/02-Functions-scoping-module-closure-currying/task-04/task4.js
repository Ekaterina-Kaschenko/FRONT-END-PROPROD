// replace it with your module
var dt = (function () {
  var rows = [], columns = [];

  return{
    addRow: function () {
      for (var i = 0; i < arguments.length; i++) { rows.push(arguments[i]); }
      return this;
    },
    addColumns: function () {
      for (var i = 0; i < arguments.length; i++) { columns.push(arguments[i]); }
      return this;
    },
    addRows: function () {
      for (var i = 0; i < arguments.length; i++) {
        for (var j = 0; j < arguments[i].length; j++) { rows.push(arguments[i][j]); }
      }
      return this;
    },
    sort: function (column) {
      var sorted = [];
      rows.map(function (row) {
        if (row.indexOf('c' + column) + 1) { sorted.push(row); }
      });
      return sorted;
    },
    map: function (updater) {
      return rows.map(function (row, index) {
        return updater(row, index);
      });
    },
    getData: function (getter) {
      var data = [];
      for (var i = 0; i < columns.length; i++) {
        for (var j = 0; j < rows.length; j++) {
          data[columns[i]] = rows[i];
        }
      }
      return getter.bind(data)();
    }
  };
})();


// !!! code below not supposed to be changed !!!
// !!! use it to check that your module's API works correctly !!!

// build DataTable
dt.addColumns('c1', 'c2', 'c3')
    .addRow('val1_c1', 'val1_c2', 'val1_c3')
    .addRow('val2_c1', 'val2_c2', 'val2_c3')
    .addRows(
        ['val4_c1', 'val4_c2', 'val4_c3'],
        ['val3_c1', 'val3_c2', 'val3_c3']
    );

// sort data ascending by second column

dt.sort(2);
// update rows by calling Array.prototype.map

 dt.map(function (value, index) {
     return value + "_i" + index;
 });

// print JSON

 dt.getData(function () {
     console.log(this);
 });
