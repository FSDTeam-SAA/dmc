import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    // 🔹 Dealer / Vehicle Info
    dealerId: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    auction: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    vin: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      index: true,
      minlength: 11,
      maxlength: 17,
    },
    vehicleYear: {
      type: Number,
      required: true,
      min: 1950,
      max: new Date().getFullYear() + 1,
    },
    mileage: {
      type: Number,
      required: true,
      min: 0,
    },
    interiorChoice: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    series: {
      type: String,
      required: true,
      trim: true,
    },

    // 🔹 Pricing & Notes
    floorPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    announcement: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    remarks: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const Announcement = mongoose.model(
  "Announcement",
  announcementSchema
);
