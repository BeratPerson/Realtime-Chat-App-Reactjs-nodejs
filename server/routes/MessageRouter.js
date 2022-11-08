const express = require("express");

const router = express.Router();
const { getMessage, getMessages, saveMessage,getAllMessagesForCurrentChat } = require('../controllers/MessageController.js');



router.get('/', getMessages);
router.get('/:id', getMessage);
router.post('/', saveMessage);
router.post('/getAllMessagesForCurrentChat', getAllMessagesForCurrentChat);


module.exports = router;