const { createPool } = require("mysql2");

console.log("env", process.env.DB_HOST);

const db_config = {
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  multipleStatements: true,
};

let connection = createPool(db_config);

// - Establish a new connection
connection.getConnection(function (err: any) {
  if (err) {
    console.log(
      "\n\t *** Cannot establish a connection with the database. ***"
    );

    connection = reconnect(connection);
  } else {
    console.log("\n\t *** New connection established with the database. ***");
  }
});

// //- Reconnection function
function reconnect(connection: any) {
  console.log("\n New connection tentative...");

  //- Destroy the current connection variable
  if (connection) connection.releaseConnection();

  //- Create a new one
  connection = createPool(db_config);

  //- Try to reconnect
  connection.connect(function (err: any) {
    if (err) {
      //- Try to connect every 2 seconds.
      setTimeout(reconnect, 2000);
    } else {
      console.log("\n\t *** New connection established with the database. ***");
      return connection;
    }
  });
}

// //- Error listener
connection.on("error", function (err: any) {
  //- The server close the connection.
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    console.log(
      "/!\\ Cannot establish a connection with the database. /!\\ (" +
        err.code +
        ")"
    );
    connection = reconnect(connection);
  }

  //- Connection in closing
  else if (err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT") {
    console.log(
      "/!\\ Cannot establish a connection with the database. /!\\ (" +
        err.code +
        ")"
    );
    connection = reconnect(connection);
  }

  //- Fatal error : connection variable must be recreated
  else if (err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
    console.log(
      "/!\\ Cannot establish a connection with the database. /!\\ (" +
        err.code +
        ")"
    );
    connection = reconnect(connection);
  }

  //- Error because a connection is already being established
  else if (err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE") {
    console.log(
      "/!\\ Cannot establish a connection with the database. /!\\ (" +
        err.code +
        ")"
    );
  }

  //- Anything else
  else {
    console.log(
      "/!\\ Cannot establish a connection with the database. /!\\ (" +
        err.code +
        ")"
    );
    connection = reconnect(connection);
  }
});

module.exports = connection.promise();
