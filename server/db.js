const Pool =require("pg").Pool;  //used to connect btw server and DB


const pool = new Pool({      //defines config for connection with DB
    user: "postgres",
    password: "mouzam",
    host:"localhost",
    port:5432,
    database: "todolist"
});

module.exports = pool;