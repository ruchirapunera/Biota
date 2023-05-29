const fs = require('fs');
const XLSX = require('xlsx');

const read = ({file, sheet}) => {
   const buf = readFileSync(file);
   const workbook = _read(buf, { type: 'buffer' });
   const rows = utils.sheet_to_json(workbook.Sheets[sheet]);
   return rows
}

export default {
   read,
}