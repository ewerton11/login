import * as mysql from "mysql2"

export const connectionDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "login",
})

connectionDB.connect(function (err) {
  if (err) {
    console.error("Error connecting: " + err.stack)
    return
  }
  console.log("Connected as id " + connectionDB.threadId)
})
