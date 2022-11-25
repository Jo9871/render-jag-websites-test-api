import mongoose from "mongoose";

function makeNewConnection(uri) {
  const db = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  db.on("error", function (error) {
    console.log(`MongoDB :: Connection ${this.name} ${JSON.stringify(error)}`);
    db.close().catch(() =>
      console.log(`MongoDB :: Failed to close connection ${this.name}`)
    );
  });

  db.on("connected", function () {
    mongoose.set("debug", function (col, method, query, doc) {
      // console.log(`MongoDB :: ${this.conn.name} ${col}.${method}(${JSON.stringify(query)},${JSON.stringify(doc)})`);
    });
    console.log(`MongoDB :: Connected ${this.name}`);
  });

  db.on("disconnected", function () {
    console.log(`MongoDB :: Disconnected ${this.name}`);
  });

  return db;
}

export const tescoConnection = makeNewConnection(
  "mongodb+srv://FinancialWebsite:FinancialWebsite@financialwebsite.0sdnz.mongodb.net/tesco-work?authSource=admin&replicaSet=atlas-wvslbm-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"
);

// module.exports = {
//     transactionsConnection,
//     listsConnection
// };
