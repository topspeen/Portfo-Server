var createError = require('http-errors');
var express = require('express');
var axios = require('axios');
let dataFromCMC;
let metaDataFromCMC;
let dataFromCoinGecko;
//1. Import coingecko-api
const CoinGecko = require('coingecko-api');

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

//3. Make calls
var func = async() => {
    let data = await CoinGeckoClient.coins.all();
    dataFromCoinGecko = await data.data;
    console.log(data)
};
setInterval(() => func(), 60000);

const cors = require('cors');

var app = express();

app.use(express.json());

var corsOptions = {
    origin: 'http://localhost:3000 ',
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));




// fetch data from CMC;
// var data_config = {
//     method: 'get',
//     url: 'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=1,2,74,1027,6636,1839',
//     headers: {
//         'X-CMC_PRO_API_KEY': '69e3b39b-71c3-4c16-bf79-12a42a042a25',
//         'Accept': 'application/json',
//         'Accept-Encoding': 'deflate, gzip'
//     }
// };
// fetch data from Coingecko;
// var dataFromCoinGecko_config = {
//     method: 'get',
//     url: 'https: //api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=7d',
//     headers: {
//         'Accept': 'application/json',
//         'Accept-Encoding': 'deflate, gzip'
//     }
// };

// axios(dataFromCoinGecko_config)
//     .then(function(response) {
//         dataFromCoinGecko = response.data;
//     }).then(function(response) {
//         // console.log(JSON.stringify(dataFromCMC));
//     }).catch(function(error) {
//         console.log(error);
//     }).then(function() {

//     });

// fetch metaData from CMC;
// var metaData_config = {
//     method: 'get',
//     url: 'https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?id=1,2,74,1027,6636,1839',
//     headers: {
//         'X-CMC_PRO_API_KEY': '69e3b39b-71c3-4c16-bf79-12a42a042a25',
//         'Accept': 'application/json',
//         'Accept-Encoding': 'deflate, gzip'
//     }
// };



// setInterval(function() {
// axios(metaData_config)
//     .then(function(response) {
//         metaDataFromCMC = response.data;
//     }).then(function(response) {
//         // console.log(JSON.stringify(metaDataFromCMC.data[2]));
//     }).catch(function(error) {
//         console.log(error);
//     }).then(function() {

//     });

// axios(data_config)
//     .then(function(response) {
//         dataFromCMC = response.data;
//     }).then(function(response) {
//         // console.log(JSON.stringify(dataFromCMC));
//     }).catch(function(error) {
//         console.log(error);
//     }).then(function() {

//     });

// }, 60000);

// send data to ReactApp
app.get('/', (req, res) => {
    res.json(dataFromCMC);
})

// send metaData to ReactApp
app.get('/meta', (req, res) => {
        res.json(metaDataFromCMC);
    })
    // send metaData to ReactApp
app.get('/top', (req, res) => {
    res.json(dataFromCoinGecko);
})

app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ error: err });
});


module.exports = app;