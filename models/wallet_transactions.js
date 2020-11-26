const mongoose = require('mongoose');

const wallet_transactions_schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    wallet_address: {
        type: String,
        required: true
    },
    start_block: {
        type: Object,
        required: true
    },
    end_block: {
        type: Object,
        required: true
    },
    request_timestamp: {
        type: Date,
        required: true
    },
    transactions: {
        type: Object,
        required: true
    }
});

const WalletTransactions = mongoose.model('WalletTransactions', wallet_transactions_schema);

module.exports.WalletTransactions = WalletTransactions;

module.exports.insertWalletTransactions = async function (wallet_address, start_block, end_block, request_timestamp, transactions) {
    var mongo_obj_id = new mongoose.Types.ObjectId()

    const new_wallet_transactions = new WalletTransactions({
        _id: mongo_obj_id,
        wallet_address: wallet_address,
        start_block: start_block,
        end_block: end_block,
        request_timestamp: request_timestamp,
        transactions: transactions
    });
    await new_wallet_transactions.save();

    return mongo_obj_id;
};

module.exports.getWalletTransactions = async function (mongo_obj_id) {
    let wallet_transactions = await WalletTransactions.findById(mongo_obj_id);
    return wallet_transactions;
};
