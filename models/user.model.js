import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address:  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: Number, required: true },
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  orders:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order"
    } 
  ]
},{ timestamps: true });

UserSchema.pre("save",async (next)=>{
  if(!this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
})

const User = new mongoose.model("User", UserSchema);

export default User;
