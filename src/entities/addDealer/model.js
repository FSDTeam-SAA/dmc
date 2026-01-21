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
      
      trim: true,
      
    },
    address: {
      type: String,
      
      trim: true,
      uppercase: true,
    
     
      
    },
    age:{
      type:String

    },
  },
  { timestamps: true } // createdAt, updatedAt
);

export const Dealer = mongoose.model("Dealer", dealerSchema);
