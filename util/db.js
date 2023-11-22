const mongoose = require("mongoose");
const URI = process.env.URI;

mongoose.set("strictQuery", false);

module.exports = {
  connect: () => {
    try {
      mongoose.connect(URI, {});
      console.log("db connect")
    } catch (error) {
      console.log("error")
    }
    disconnect: (done) => {
      mongoose.disconnect(done);
    };
  },
};
