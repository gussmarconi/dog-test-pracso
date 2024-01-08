const { Pool } = require('pg')
const pool = new Pool({
    host: '192.168.30.230',
    port: 5432,
    user: 'gmarconi',
    password: 'qwer1234',
    database: 'db123'
})

module.exports = pool