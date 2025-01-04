const Booking = require("../model/booking.model.js");

const checkBookingSlot = async (date, time) => {
  try {
    const exsistingBooking = await Booking.findOne({
      date,
      time,
    });
    if (exsistingBooking) {
      return false;
    }
    return true;
  } catch (error) {
    console.log("error in checkBookingSlot", error);
  }
};

module.exports = { checkBookingSlot };
