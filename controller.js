const request = require('request');
const wallet_transaction_model = require('./models/wallet_transactions');
const moment = require("moment");
const web3 = require('web3');
const apikey = 'DQU3P5779SQ9HI6TQZU7WM5HKA4Q5CN1TS';


module.exports.getStartPage = async function (req, res, next) {
    try {
        return res.render('startpage.ejs', {
        });
    } catch (err) {
        next(err);
    }
}

module.exports.newWalletTransactions = async function (req, res, next) {

    let options = { json: true };
    let wallet_address = req.body.wallet_address;
    let start_block = req.body.start_block;
    let end_block = '';
    let request_timestamp = new Date();
    if (req.body.latest)
        end_block = 'latest';
    else
        end_block = req.body.end_block;
    let url = 'http://api.etherscan.io/api?module=account&action=txlist&address=' + wallet_address + '&startblock=' + start_block + '&endblock=' + end_block + '&sort=desc&apikey=' + apikey;


    request(url, options, async (error, respond, body) => {
        if (error) {
            return console.log(error)
        };

        if (!error && respond.statusCode == 200) {

            const mongo_obj_id = await wallet_transaction_model.insertWalletTransactions(wallet_address, start_block, end_block, request_timestamp, body.result);

            try {
                return res.render('wallet_transactions.ejs', {
                    web3: web3,
                    moment: moment,
                    mongo_obj_id: mongo_obj_id,
                    wallet_address: wallet_address,
                    start_block: start_block,
                    end_block: end_block,
                    request_timestamp: request_timestamp,
                    transactions: body.result
                });
            } catch (err) {
                next(err);
            }
        };
    });
}

module.exports.getWalletTransactionsFromDB = async function (req, res, next) {
    try {
        let mongo_obj_id = req.params.mongo_obj_id;
        let db_wallet_transactions = await wallet_transaction_model.getWalletTransactions(mongo_obj_id);
        return res.render('wallet_transactions.ejs', {
            web3: web3,
            moment: moment,
            mongo_obj_id: db_wallet_transactions._id,
            wallet_address: db_wallet_transactions.wallet_address,
            start_block: db_wallet_transactions.start_block,
            end_block: db_wallet_transactions.end_block,
            request_timestamp: db_wallet_transactions.request_timestamp,
            transactions: db_wallet_transactions.transactions
        });
    } catch (err) {
        next(err);
    }
}