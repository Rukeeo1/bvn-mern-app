const express = require('express');
const router = express.Router();
const {
  getUserBvn,
  setUserBvn,
  updateUserBvn,
  deleteUserBvn,
} = require('../Controller/UserBvnController');

router.route('/').get(getUserBvn).post(setUserBvn);
router.route('/:id').delete(deleteUserBvn).put(updateUserBvn);

module.exports = router;
