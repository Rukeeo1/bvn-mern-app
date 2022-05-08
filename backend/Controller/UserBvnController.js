const asyncHandler = require('express-async-handler');
const UserBvn = require('../Models/userBvnModel');
const Joi = require('@hapi/joi');
const { authSchema } = require('../Models/validation_schema');
const sdk = require('api')('@dojahinc/v1.0#62779ea25dfa1d0034110bf6');
const axios = require('axios');
// const Flutterwave = require('flutterwave-node-v3');

console.log(sdk, '____');

// const flw = new Flutterwave(
//   process.env.FLW_PUBLIC_KEY,
//   process.env.FLW_SECRET_KEY
// );
// console.log(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY, '***');

const getUserBvn = asyncHandler(async (req, res) => {
  const userBvns = await UserBvn.find();

  res.status(200).json(userBvns);
});

const setUserBvn = asyncHandler(async (req, res) => {
  try {
    // validate bvn body

    // this should not be called authSchema... it should be bvn validatonSchema
    await authSchema.validateAsync(req.body);

    // below here, I am making an api call to doja api, get the bvn entered, and check if it's a valid bvn
    // we are using sandbox, because we can't pay for the live version at the moment,
    // the response will always be the same, irrespective of the bvn entered as long as it is valid
    const { data } = await axios({
      method: 'get',
      url: `https://sandbox.dojah.io/api/v1/kyc/bvn/full?bvn=${req.body.bvn}`,
      headers: {
        Authorization: 'test_sk_Fj448iN2sRJO74W2Y8dzhXHe8', // OCHUKO: add this to env file... it is your secret key
        AppId: `62779ea25dfa1d0034110bf6`, // OCHUKO: add this to env file it is your api key
      },
    });

    // I have created a response similar to what the require
    // things to note  are the imageDetail, bvn, message, basicDetail
    const response = {
      message: 'success',
      bvn: req.body.bvn,
      imageDetail: data.entity.image,
      basicDetail: {
        bvn: data.entity.bvn,
        date_of_birth: data.entity.date_of_birth,
        email: data.entity.email,
        enrollment_bank: data.entity.enrollment_bank,
        enrollment_branch: data.entity.enrollment_branch,
        first_name: data.entity.first_name,
        gender: data.entity.gender,
      },
    };

    // at this point, I am saving to the mongodb database, which is noSQL, I have removed the await...so it doesn't block the process
    UserBvn.create({
      ...response,
    });
    // here we send the repsonse to the user
    res.status(200).json(response);
  } catch (error) {
    // if there's error, we send error to the user... all validation errors will automatically go into the catch
    // you need to format these errrors to match what the want
    /**
     *  {
     * message: error.message,
     * bvn: req.body.bvn
     * }
     */
    res.status(error.status ?? 400).json({
      message: error.message,
      bvn: req.body.bvn,
    });
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
