const Booking = require("./model/booking.model");
const { checkBookingSlot } = require("./utils/bookingUtils.js");
const bookingSchema = require("./validator/bookingValidate.js");

const getBookingDetails = async (req, res, next) => {
  try {
    const bookings = await Booking.find();

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

const getBookingDetailsById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Missing Id",
      });
    }
    const bookings = await Booking.findById(id);

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

const newBooking = async (req, res, next) => {
  try {
    const { bookingDetails } = req.body;
    console.log(bookingDetails);
    // Validate Bookings
    const { error, value } = bookingSchema.validate(bookingDetails);
    if (error) {
      console.log(error.details[0].message);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    // Check Booking
    const slotIsAvailable = await checkBookingSlot(
      bookingDetails.date,
      bookingDetails.time
    );

    if (!slotIsAvailable) {
      return res.status(400).json({
        success: false,
        message: "Slot already Booked",
      });
    }

    // Create Booking
    const newBooking = new Booking(bookingDetails);
    await newBooking.save();

    res.status(200).json({
      success: true,
      data: newBooking,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBooking = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Missing Id",
      });
    }
    await Booking.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Booking Deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBookingDetails,
  newBooking,
  deleteBooking,
  getBookingDetailsById,
};
