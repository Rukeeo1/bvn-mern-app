const mongoose = require('mongoose');

const userBvnSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Empty BVN in request'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('UserBvn', userBvnSchema);
