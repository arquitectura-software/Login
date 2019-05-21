const mysql = require("mysql");

connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Ident"
});

let passengerModel = {};
passengerModel.getpassengers = callback => {
  if (connection) {
    connection.query("SELECT * FROM passengers ORDER BY id", (err, rows) => {
      if (err) {
        throw err;
      } else {
        callback(null, rows);
      }
    });
  }
};

passengerModel.insertPassengers = (passengerData, callback) => {
  if (connection) {
    connection.query(
      "INSERT INTO passengers SET ?",
      passengerData,
      (err, result) => {
        if (err) {
          throw err;
        } else {
          callback(null, {
            insertId: result.insertId
          });
        }
      }
    );
  }
};

passengerModel.updatePassengers = (passengerData, callback) => {
  if (connection) {
    const sql = `
        UPDATE passengers SET
        id_user = ${connection.escape(passengerData.id_user)},
        birthdate = ${connection.escape(passengerData.birthdate)},
        email = ${connection.escape(passengerData.email)},
        phone = ${connection.escape(passengerData.phone)}
        WHERE id = ${connection.escape(passengerData.id)}`;

    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        callback(null, {
          message: "success"
        });
      }
    });
  }
};

passengerModel.deletePassengers = (id, callback) => {
  if (connection) {
    let sql = `
      SELECT * FROM passengers WHERE id = ${connection.escape(id)}`;
    connection.query(sql, (err, row) => {
      if (row) {
        let sql = `DELETE FROM passengers WHERE id = ${id}`;
        connection.query(sql, (err, result) => {
          if (err) {
            throw err
          } else {
            callback(null, {
              "message": "deleted"
            })
          }
        })
      } else {
        callback(null, {
          "message": "not exists"
        })
      }
    })
  }
};

module.exports = passengerModel;
