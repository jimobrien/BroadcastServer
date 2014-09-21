var tradeListenerUrl = 'http://QuoteServer.azurewebsites.net:80';

// Set up server
var port = process.env.PORT || 3000;
var server = require('http').Server();
var io = require('socket.io')(server);
server.listen(port, function() {
  console.log('listening on port', port);
});

////////////////////
// Channels       //
////////////////////

// Trades
var tradeListener = require('socket.io-client')(tradeListenerUrl);
tradeListener.on('trade', function(data) {
  io.of('/BTC/USD/trades').emit('trade', data);
});

// Volatility
var varianceData = require('./db/varianceData');
varianceData.on('update', function(data) {
  io.of('/BTC/USD/volatility').emit('update', data);
});
io.of('BTC/USD/volatility').on('connection', function(socket) {
  socket.emit('update', varianceData.get());
});

// Volume
var volumeData = require('./db/volumeData');
volumeData.on('update', function(data) {
  io.of('/BTC/USD/volume').emit('update', data);
});
io.of('/BTC/USD/volume').on('connection', function(socket) {
  socket.emit('update', volumeData.get());
});

// Summary Data
var summaryData = require('./db/summaryData');
summaryData.on('update', function(data) {
  io.of('BTC/USD/summary').emit('update', data);
});
io.of('BTC/USD/summary').on('connection', function(socket) {
  socket.emit('update', summaryData.get());
});

// Range
var rangeData = require('./db/rangeData');
rangeData.on('update', function(data) {
  io.of('BTC/USD/range').emit('update', data);
});
io.of('BTC/USD/range').on('connection', function(socket) {
  socket.emit('update', rangeData.get());
});

// Price Distribution
var priceDistribution = require('./db/priceDistribution');
priceDistribution.on('update', function(data) {
  io.of('BTC/USD/priceDistribution').emit('update', data);
});
io.of('BTC/USD/priceDistribution').on('connection', function(socket) {
  socket.emit('update', priceDistribution.get());
});

// One Minute Price Chart
var oneMinutePriceChart = require('./db/priceCharts/oneMinute');
oneMinutePriceChart.on('update', function(data) {
  io.of('BTC/USD/priceCharts/oneMinute').emit('update', data);
});
io.of('BTC/USD/priceCharts/oneMinute').on('connection', function(socket) {
  socket.emit('update', oneMinutePriceChart.get());
});
