import * as mysql from "mysql2"

export const connectionDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "login",
})

connectionDB.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});
