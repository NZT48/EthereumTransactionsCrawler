const express = require('express');
const controller = require('./controller');
const router = express.Router();


router.get('/', controller.getStartPage);

router.get('/wallet_transactions/:mongo_obj_id', controller.getWalletTransactionsFromDB)

router.post('/get', controller.newWalletTransactions);

module.exports = router;