// const xlsx = require("xlsx")
// const fs = require('fs');

// //Read Excel file 
// const wb = xlsx.readFile('register.xlsx')



// //Below command represents all sheets names present in respective excel 
// //Read file from workbook(wb) 
// console.log(wb.SheetNames)

// //to read particular sheet from excel. will get string response 
// const ws = wb.Sheets['register']
// // const ws = wb.Sheets['endpoints']
// // const ws = wb.Sheets['headers']

// //Read data and convert it into JSON 
// const jsonData = xlsx.utils.sheet_to_json(ws)

// //Replace newlines and tabs in JSON string before writing to file
// // const jsonString = JSON.stringify(jsonData, null, 2).replace(/\n|\r|\t/g, '');

// // Write the JSON data to a file
// fs.writeFile('cypress/fixtures/body.json', JSON.stringify(jsonData,null,2).replace(/\\r\\n|\r|\n/g, ""), (err) => {
//   if (err) throw err;
//   console.log('File written successfully!');
// });

const csv = require('csvtojson')
const fs = require('fs')

const csvFolder = 'csvFiles';
const jsonFolder = 'cypress/fixtures/json';

// const csvFilePath = 'registerServer.csv'
// const jsonFilePath = 'cypress/fixtures/requestBody.json'

fs.readdir(csvFolder, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.forEach((file) => {
    const csvFilePath = `${csvFolder}/${file}`;
    const jsonFilePath = `${jsonFolder}/${file.replace('.csv', '.json')}`;

    csv()
      .fromFile(csvFilePath)
      .then((jsonArray) => {
        const jsonData = JSON.stringify(jsonArray, null, 2);
        fs.writeFile(jsonFilePath, jsonData, (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(`JSON file ${jsonFilePath} created successfully`);
        });
      })
      .catch((err) => {
        console.error(`Error converting CSV file ${csvFilePath} to JSON: ${err}`);
      });
  });
});

   