const asyncHandler = require('express-async-handler');
const UserBvn = require('../Models/userBvnModel');
const Joi = require('@hapi/joi');
const { authSchema } = require('../Models/validation_schema');

const getUserBvn = asyncHandler(async (req, res) => {
  const userBvns = await UserBvn.find();

  res.status(200).json(userBvns);
});

const setUserBvn = asyncHandler(async (req, res) => {
  try {
    const result = await authSchema.validateAsync(req.body);
    res.send(result);
    console.log(result);

    const userbvn = UserBvn.create({
      text: req.body.text,
    });

    await userbvn.save();
    res.status(200).json(userbvn);
  } catch (error) {
    if (!req.body.text) {
      res.status(400);
      throw new Error('Empty BVN in request');
    }

    if (error.isJoi === true) {
      res.status(400);
      throw new Error('Invalid BVN (Less than 11 BVN digits) in request');
    }
  }
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
