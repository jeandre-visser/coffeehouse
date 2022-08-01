const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: '5432',
  database: 'coffeehouse'
});

pool.query(`
SELECT *
FROM items
LIMIT 5;
`)
.then(res => {
  console.log(res);
})
.catch(err => console.error('query error', err.stack));
