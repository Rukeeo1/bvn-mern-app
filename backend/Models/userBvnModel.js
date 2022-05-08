const mongoose = require('mongoose');

const userBvnSchema = mongoose.Schema(
  {
    bvn: {
      type: String,
      required: [true, 'Empty BVN in request'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('UserBvn', userBvnSchema);
