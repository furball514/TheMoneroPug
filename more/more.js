$(document).ready(function(){
   var today = new Date();
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
   });
 $.getJSON('https://api.cryptonator.com/api/full/xmr-usd',function(data){
   //$('#polo').html(JSON.stringify(data)); 
 });
});