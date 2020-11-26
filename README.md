# EthereumTransactionsCrawler

Web application that collects data from the Ethereum blockchain about transactions associated with a specific wallet address that the user inputs. The app gets information on the wallets (addresses) and amounts of ETH associated with transactions made to and from a certain given wallet and then store them in a MongoDB database and shows them in a simple human-readable way through a web page. The web app collects transaction data starting from a given block.

## Install & Run

```sh
git clone https://github.com/NZT48/EthereumTransactionsCrawler.git
cd EthereumTransactionsCrawler
npm install
mongod &
npm start
```

Then visit [http://localhost:3800/](http://localhost:3800/)

## To do

* [ ] Input validation
