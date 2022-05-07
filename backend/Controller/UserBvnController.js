const asyncHandler = require('express-async-handler');
const UserBvn = require('../Models/userBvnModel');

const getUserBvn = asyncHandler(async (req, res) => {
  const userBvns = await UserBvn.find();

  res.status(200).json(userBvns);
});

const setUserBvn = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Empty BVN in request');
  }

  const userbvn = UserBvn.create({
    text: req.body.text,
  });

  res.status(200).json(userbvn);
});

const updateUserBvn = asyncHandler(async (req, res) => {
  const userbvn = await UserBvn.findById(req.params.id);

  if (!userbvn) {
    res.status(400);
    throw new Error('Empty BVN in request');
  }

  const updatedUserBvn = await UserBvn.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedUserBvn);
});

const deleteUserBvn = asyncHandler(async (req, res) => {
  const userbvn = await UserBvn.findById(req.params.id);

  if (!userbvn) {
    res.status(400);
    throw new Error('Empty BVN in request');
  }

  await userbvn.remove();

  res.status(200).json({
    id: req.params.id,
  });
});
 
module.exports = {
  getUserBvn,
  setUserBvn,
  updateUserBvn,
  deleteUserBvn,
};
