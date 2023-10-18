const { mongoose, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      match: /^.*@.*\..*$/,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
    },
    name: {
      type: String,
      minlength: 3,
    },
  },
  {
    timestamps: true,
    statics: {
      encrypPassword: async (password) => {
        if (
          !password.match(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
          )
        ) {
          throw new Error("password not valid");
        }
        const salt = await bcrypt.genSalt(15);
        return await bcrypt.hash(password, salt);
      },
      comparePassword: async (password, hash) => {
        return await bcrypt.compare(password, hash);
      },
    },
  }
);

const UserSchema = model("users", userSchema);
module.exports = UserSchema;
