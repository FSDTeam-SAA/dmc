import mongoose from 'mongoose';
import { Announcement } from './model.js';
import { Dealer } from '../model.js';

// ✅ VERIFY DEALER ID
export const verifyDealerId = async (req, res, next) => {
  try {
    const { dealerId } = req.body;

    if (!dealerId) {
      return res.status(400).json({
        success: false,
        message: 'dealerId is required'
      });
    }

    const dealer = await Dealer.findOne({ dealerId });

    if (!dealer) {
      return res.status(404).json({
        success: false,
        message: 'Dealer not found',
        exists: false
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Dealer verified successfully',
      exists: true,
      data: {
        dealerId: dealer.dealerId,
        dealerName: dealer.dealerName,
        email: dealer.email
      }
    });
  } catch (err) {
    next(err);
  }
};

// ✅ CREATE
export const createAnnouncement = async (req, res, next) => {
  try {
    const {
      dealerId,
      auction,
      vin,
      vehicleYear,
      mileage,
      interiorChoice,
      model,
      series,
      floorPrice,
      announcement,
      remarks
    } = req.body;

    // Basic required validation
    if (
      !dealerId ||
      !auction ||
      !vin ||
      !vehicleYear ||
      mileage === undefined ||
      !interiorChoice ||
      !model ||
      !series ||
      floorPrice === undefined ||
      !announcement
    ) {
      return res.status(400).json({
        success: false,
        message:
          'dealerId, auction, vin, vehicleYear, mileage, interiorChoice, model, series, floorPrice, announcement are required'
      });
    }

    const doc = await Announcement.create({
      dealerId,
      auction,
      vin,
      vehicleYear,
      mileage,
      interiorChoice,
      model,
      series,
      floorPrice,
      announcement,
      remarks
    });

    return res.status(201).json({
      success: true,
      message: 'Announcement created successfully',
      data: doc
    });
  } catch (err) {
    next(err);
  }
};

// ✅ GET ALL (pagination + filters)
export const getAllAnnouncements = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const limit = Math.min(
      Math.max(parseInt(req.query.limit || '10', 10), 1),
      100
    );
    const skip = (page - 1) * limit;

    const filter = {};

    // Optional filters
    if (req.query.dealerId) filter.dealerId = req.query.dealerId;
    if (req.query.auction) filter.auction = req.query.auction;
    if (req.query.vin) filter.vin = req.query.vin;

    const [data, total] = await Promise.all([
      Announcement.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Announcement.countDocuments(filter)
    ]);

    return res.status(200).json({
      success: true,
      message: 'Announcements fetched successfully',
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1
      }
    });
  } catch (err) {
    next(err);
  }
};

// ✅ GET BY ID
export const getAnnouncementById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid announcement id'
      });
    }

    const doc = await Announcement.findById(id);

    if (!doc) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Announcement fetched successfully',
      data: doc
    });
  } catch (err) {
    next(err);
  }
};

// ✅ DASHBOARD TOTALS: announcements + dealers
export const getDashboardTotals = async (req, res, next) => {
  try {
    const [totalDealers, totalAnnouncements] = await Promise.all([
      Dealer.countDocuments(),
      Announcement.countDocuments()
    ]);

    return res.status(200).json({
      success: true,
      message: 'Dashboard totals fetched successfully',
      data: {
        totalDealers,
        totalAnnouncements
      }
    });
  } catch (err) {
    next(err);
  }
};
