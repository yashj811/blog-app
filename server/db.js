const mongoose = require("mongoose");

const db = mongoose.connect(
  process.env.DATABASE,
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
  () => {
    console.log("DB connected...");
  }
);

module.export = db;
