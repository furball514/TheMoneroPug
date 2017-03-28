$(document).ready(function(){
   /*var today = new Date();
   var time = today.setUTCHours(0,0,0,0) / 1000;
   $.getJSON('https://poloniex.com/public?command=returnChartData&currencyPair=BTC_XMR&start=' + time + '&end=9999999999&period=300',function(data){
    //$('#nator').html(JSON.stringify(data)); 
     console.log(data);
     AmCharts.makeChart( "polo", {
  "type": "serial",
  "dataProvider": data,
  "categoryField": data,
  "graphs": [ {
    "valueField": data[1].high,
    "type": "column"
  } ]
} );
   });*/
  
 $.getJSON('https://api.cryptonator.com/api/full/xmr-usd',function(data){
   //console.log(data);
   //$('#nator').html(JSON.stringify(data)); 
   $('#mk-1').text(data.ticker.markets[0].market);
   $('#mk-2').text(data.ticker.markets[1].market);
   $('#mk-3').text(data.ticker.markets[2].market);
   $('#mk-4').text(data.ticker.markets[3].market);
   $('#pr-1').text(data.ticker.markets[0].price);
   $('#pr-2').text(data.ticker.markets[1].price);
   $('#pr-3').text(data.ticker.markets[2].price);
   $('#pr-4').text(data.ticker.markets[3].price);
   $('#vl-1').text(data.ticker.markets[0].volume);
   $('#vl-2').text(data.ticker.markets[1].volume);
   $('#vl-3').text(data.ticker.markets[2].volume);
   $('#vl-4').text(data.ticker.markets[3].volume);
 });
});
