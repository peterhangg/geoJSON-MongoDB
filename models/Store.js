const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");

const StoreSchema = new mongoose.Schema({
  storeId: {
    type: String,
    required: [true, "Store ID must be added"],
    unique: true,
    trim: true,
    maxlength: [10, "Store ID must be less than 10 chars"]
  },
  address: {
    type: String,
    required: [true, "Please add an address!"]
  },
  location: {
    type: {
      type: String, 
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere"
    },
    formattedAddress: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// Geocode & create location middleware
StoreSchema.pre("save", async function(next) {
  // this will return us metadata of the provided address (ex: city, state, zipcode, long/lat, etc)
  const loc = await geocoder.geocode(this.address);
  // passing in our response to location of our schema
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress
  }

  // Prevent address to be saved into DB
  this.address = undefined;
  next();
});

module.exports = mongoose.model("Store", StoreSchema);