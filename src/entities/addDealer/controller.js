import mongoose from "mongoose";
import { Dealer } from "./model.js";


// helper: duplicate key nice message
const handleDuplicate = (err, res) => {
  if (err?.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    return res.status(409).json({
      success: false,
      message: `Duplicate value for ${field}`,
      error: err.keyValue,
    });
  }
  return null;
};

// ✅ CREATE
export const createDealer = async (req, res, next) => {
  try {
    const { dealerId, dealerName, email, contact,address,age } = req.body;

    if (!dealerId || !dealerName || !email || !contact) {
      return res.status(400).json({
        success: false,
        message: "dealerId, dealerName, email, contact, vin are required",
      });
    }

    const dealer = await Dealer.create({ dealerId, dealerName, email ,contact,address,age});

    return res.status(201).json({
      success: true,
      message: "Dealer created successfully",
      data: dealer,
    });
  } catch (err) {
    if (handleDuplicate(err, res)) return;
    next(err);
  }
};

// ✅ GET ALL (pagination + optional search)
export const getAllDealers = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || "10", 10), 1), 100);
    const skip = (page - 1) * limit;

    const filter = {};

    if (req.query.search) {
      const s = req.query.search.trim();
      filter.$or = [
        { dealerName: { $regex: s, $options: "i" } },
        { dealerId: { $regex: s, $options: "i" } },
        { email: { $regex: s, $options: "i" } },
        { vin: { $regex: s, $options: "i" } },
      ];
    }

    const [data, total] = await Promise.all([
      Dealer.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Dealer.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      message: "Dealers fetched successfully",
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ✅ GET EACH (by Mongo _id)
export const getDealerById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid dealer id" });
    }

    const dealer = await Dealer.findById(id);

    if (!dealer) {
      return res.status(404).json({ success: false, message: "Dealer not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Dealer fetched successfully",
      data: dealer,
    });
  } catch (err) {
    next(err);
  }
};

// ✅ UPDATE (PUT = replace fields you send)
export const updateDealerPut = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid dealer id" });
    }

    const updated = await Dealer.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Dealer not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Dealer updated successfully",
      data: updated,
    });
  } catch (err) {
    if (handleDuplicate(err, res)) return;
    next(err);
  }
};

// ✅ PATCH (partial update)
export const updateDealerPatch = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid dealer id" });
    }

    const updated = await Dealer.findByIdAndUpdate(id, { $set: req.body }, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Dealer not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Dealer patched successfully",
      data: updated,
    });
  } catch (err) {
    if (handleDuplicate(err, res)) return;
    next(err);
  }
};

// ✅ DELETE
export const deleteDealer = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid dealer id" });
    }

    const deleted = await Dealer.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Dealer not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Dealer deleted successfully",
      data: deleted,
    });
  } catch (err) {
    next(err);
  }
};
