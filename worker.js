var XLSX = require("xlsx");

process.on('message', (message) => {
    // israel code xlsx here
    const workbook = XLSX.readFile('./data/hebrew_dataset.xlsx');
    console.log("workbook: ",workbook)
    const sheetName = workbook.SheetNames[0];
    console.log("sheetName: ",sheetName)
    const worksheet = workbook.Sheets[sheetName];
    console.log("worksheet: ",worksheet)
    const result = XLSX.utils.sheet_to_json(worksheet);
    console.log("result: ", result)
    process.send({ result })
});
