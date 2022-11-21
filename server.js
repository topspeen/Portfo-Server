var createError = require('http-errors');
var express = require('express');
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