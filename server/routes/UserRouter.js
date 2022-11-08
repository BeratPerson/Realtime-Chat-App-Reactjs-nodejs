const express = require("express");

const router = express.Router();
const { getUsers ,deleteUser,saveUser,getUser,searchUser} = require('../controllers/UserController.js');



router.get('/', getUsers);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.post('/', saveUser);
router.post('/usersearch', searchUser);


module.exports = router;