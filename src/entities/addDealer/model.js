import mongoose from "mongoose";

const dealerSchema = new mongoose.Schema(
  {
    dealerId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    dealerName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      index: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    contact: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      maxlength: 20,
    },
    address: {
      type: String,
      
      trim: true,
      uppercase: true,
      unique: true,
      index: true,
      
    },
    age:{
      type:String

    },
  },
  { timestamps: true } // createdAt, updatedAt
);

export const Dealer = mongoose.model("Dealer", dealerSchema);
