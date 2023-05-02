const sqlite3 = require('sqlite3')

let db = new sqlite3.Database('./models/database.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the chinook database.');
  });




module.exports = db;

