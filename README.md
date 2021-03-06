Crypto Market Monitor
==============

The goal of the Crypto Market Monitor Project is to make market data more accessible.
One challenge to anyone wishing to do anything with bitcoin market data
 (and any other cryptocurrency data), 
is the variety of markets. Each has their own api and data format. The Market Monitor project
makes it easy to get data from many exchanges from one source in a 
standardized format. We are planning on adding support for additional exchanges, 
and additional currency pairs in the near future.

Disclaimer: This software and its associated data is provided as is, 
with no guarantee of validity or accuracy.

BroadcastServer
===============

Broadcasts cryptocurrency market data.

[NPM module] (https://www.npmjs.org/package/market-monitor)

For example usage, see [btc.marketmonitor.io] (http://btc.marketmonitor.io)

If there is any data you'd like to see added or any comments or critiques of our current
data streams, please open an issue. We are always looking for feedback and any improvements
we can make.


Url: http://api.marketmonitor.io:80


Getting Started
============

Install Socket.io:

    // using npm
    npm install socket.io-client --save
    
    // using bower
    bower install socket.io-client --save
    
    // or load from cdn
    <script src="https://cdn.socket.io/socket.io-1.0.6.js"></script>
    

Then connect to a channel:

    
     var trade = io('http://api.marketmonitor.io:80/BTC/USD/trades');
     trade.on('trade', function(trade) {
       console.log('Trade:', trade);
     });
  


Socket.io Channels
===============

### Trades ###
Emits a trade event whenever a trade occurs and passes the associated trade data.<br />
**/BTC/USD/trades**<br />
Event: 'trade'<br />
Data Format:

    {
      exchange: String,
      date: Date,
      price: Number,
      amount: Number,
      currency: 'BTC',
      tCurrency: 'USD',
      exchangeTradeID: String
    }
 
----------

### Market Summary Statistics ###
Emits an object containing market summary statistics.<br />
**/BTC/USD/summary**<br />
Event: 'update'<br />
Data Format:

    {
      vwap: Number,
      volume: Number,
      high: Number,
      low: Number,
      variance: Number,
      standardDeviation: Number,
      coefficientOfVariation: Number,
      range: Number,
      numTrades: Number
    }

----------

### Price Over Time Chart Data ###
Emits an array of datapoints useful for making price over time charts.<br />
**/BTC/USD/priceCharts/:timeframe**<br />
Where timeframe is the timeframe of each datapoint. Options:<br />
oneMinute<br />
fiveMinutes<br />
fifteenMinutes<br />
oneHour<br />
Event: 'update'<br />

    [
      {
        date; Date,
        high: Number,
        low: Number,
        open: Number,
        close: Number,
        vwap: Number,
        volume: Number,
        numTrades: Number
      }
    ]


----------

### Price Distribution Chart Data ###
Emits an array of datapoints useful for making price distribution charts<br />
**/BTC/USD/priceDistribution**<br />
Event: 'update'<br />
Data Format:

    [
      {
        exchange: String,
        price: Number,
        volume: Number
      },
      ...
    ]


Endpoints in progress
==========

<p>These endpoints are intended to give details or particular statistics including 
highs, lows, averages, and percentiles. Current values are recalculated every 30
seconds and daily values are used for highs, lows, and averages.</p>
**/BTC/USD/standardDeviation**<br />
**/BTC/USD/coefficientOfVariation**<br />
**/BTC/USD/range**<br />
**/BTC/USD/volume**<br />

Currently Supported Markets
================
- Bitstamp
- BTC-e
- hitbtc
- Bitfinex
