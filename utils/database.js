const { MongoClient } = require("mongodb");

let database;

const mongoConnect = (callback) => {
  const uri = "mongodb://localhost:27017/";
  const client = MongoClient.connect(uri)
    .then((client) => {
      database = client.db("artisan");
      console.log("Connected");
      callback();
    })
    .catch((err) => console.log(err));
};

const getDB = () => {
  if (database) {
    return database;
  }
  throw new Error("Error connecting to the db");
};

module.exports = { mongoConnect, getDB };
