const mongoose = require("mongoose");
const app = require('./app');
const port = 3800;


mongoose.connect("mongodb://127.0.0.1:27017/EthTransactions", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(port, () => {
        console.log('Server running on => http://localhost:' + port);
    })
});