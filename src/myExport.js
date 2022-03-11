var XLSX = require("xlsx");
var workbook = XLSX.readFile("demo.xlsx", {
  type: "binary",
  cellDates: true,
  dateNF: "dd/mm/yyyy",
});
var fs = require("fs");
var sheet_name_list = workbook.SheetNames;
console.log(sheet_name_list); // getting as Sheet1

sheet_name_list.forEach(function (y) {
  var worksheet = workbook.Sheets[y];
  //getting the complete sheet
  // console.log(worksheet);

  var headers = {};
  var data = [];
  for (z in worksheet) {
    if (z[0] === "!") continue;
    //parse out the column, row, and value
    var col = z.substring(0, 1);
    // console.log(col);

    var row = parseInt(z.substring(1));
    // console.log(row);

    var value = worksheet[z].v;
    // console.log(value);

    //store header names
    if (row == 1) {
      headers[col] = value;
      // storing the header names
      continue;
    }

    if (!data[row]) data[row] = {};
    data[row][headers[col]] = value;
  }
  //drop those first two rows which are empty
  data.shift();
  data.shift();
  fs.appendFile("contratTchad2022.json", JSON.stringify(data), function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
  console.log(data);
});
