const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please add a name"],
      },
      email: {
        type: String,
        require: [true, "Please add a email"],
        unique: true,
        trim: true,
        match: [/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/, "Please enter a valid email"],
      },
      password: {
        type: String,
        require: [true, "Please add a password"],
        minLength: [8, "Password must be up to 8 characters"],
      },
},{timestamps:true});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  });

const User = mongoose.model("User",userSchema);
module.exports = User;