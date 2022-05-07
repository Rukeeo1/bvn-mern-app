const express = require('express');
const router = express.Router();
const { getUserBvn, setUserBvn, updateUserBvn, deleteUserBvn  } = require('../Controller/UserBvnController');


router.route('/').get(getUserBvn).post(setUserBvn);
router.route('/:id').delete(deleteUserBvn).put(updateUserBvn);

router.get('/', getUserBvn);
router.post('/', setUserBvn);
router.put('/:id', updateUserBvn);
router.delete('/:id', deleteUserBvn);

module.exports = router;
