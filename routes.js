const router = require("express").Router();
const {
  getBookingDetails,
  newBooking,
  deleteBooking,
  getBookingDetailsById,
} = require("./controller");

router.get("/", getBookingDetails);
router.get("/:id", getBookingDetailsById);
router.post("/", newBooking);
router.delete("/", deleteBooking);

module.exports = router;
