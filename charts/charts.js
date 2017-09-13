$(document).ready(function() {
  //var AmCharts_path = "/charts/";
  $('p').hide();
  $('#curtain').show();
  var pro = false;
  var checked = false;
 // var dataProvider = [];
  /*$('div.content div').hide();
  $('#default').addClass('clicked');
  $("#option3").show();*/
  /*$('ul li').click(function(){
    $('ul li').removeClass('clicked');
    $(this).toggleClass('clicked');
  });*//*for (var i = 0; i < data.length; i++) {
      dataProvider.push({ 
         "date": data[i].date,
         "open": data[i].open,
         "high": data[i].high,
          "low": data[i].low,
        "close": data[i].close
        })
    }*/
  /*$('a').click(function(){
        $('div.content div').hide();
    var select = $(this).attr('href');
    console.log(select);
    $(select).fadeIn(1000);
  });
  //----------------------------------------------------------------
  $('li').click(function() {
    $('li').removeClass('clicked');
    $(this).addClass('clicked');
  });
  //---------------------------------------------------------------- 
  */
  /*
  function map (arr){
  arr.map(function(record){
    record.date *= 1000;
  })
   return record;
  }*/

function main (){
  $.getJSON('https://poloniex.com/public?command=returnChartData&currencyPair=BTC_XMR&start=1405699200&end=9999999999&period=86400', function (data) {

    data.map(function(record) {
      record.date *= 1000;
    });
    //map();
    //console.log(data);
    
    var chart = AmCharts.makeChart( "chartdiv", {
  "type": "serial",
  "valueAxes": [ {
    "position": "left"
  } ],
  "graphs": [ {
    "id": "g1",
    "balloonText": "Open:<b>[[open]]</b><br>Low:<b>[[low]]</b><br>High:<b>[[high]]</b><br>Close:<b>[[close]]</b><br>",
    "proCandlesticks": pro,
    "closeField": "close",
    "fillColors": "#117e1a",
    "highField": "high",
    "lineColor": "#117e1a",
    "lineAlpha": 1,
    "lowField": "low",
    "fillAlphas": 0.9,
    "negativeFillColors": "#7b1111",
    "negativeLineColor": "#7b1111",
    "openField": "open",
    "title": "Price:",
    "type": "candlestick",
    "valueField": "close"
  } ],
  
  "chartScrollbar": {
    "graph": "g1",
    "graphType": "line",
    "scrollbarHeight": 30
  },
  "chartCursor": {
    "valueLineEnabled": true,
    "valueLineBalloonEnabled": true
  },
  "categoryField": "date",
  "categoryAxis": {
    "parseDates": true
  },
      "dataProvider": data,/*
       "responsive": {
    "enabled": true
  },*/
  "pathToImages": "/charts/img/"
    },2000);

    chart.addListener("rendered", zoomChart);
    zoomChart();
    chart.addListener("rendered",function(e){
       //var curtain = document.getElementById("curtain");
      $('#curtain').hide();
    });
    // this method is called when chart is first inited as we listen for "dataUpdated" event
    function zoomChart() {
      // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
      chart.zoomToIndexes(chart.dataProvider.length - 10, chart.dataProvider.length - 1);
    }
  });
  console.log('mained')
  }
  main();

function checker(){
if(checked == true){
 $("#radio").prop("checked", true);
}
else if(checked == false){
$("#radio").prop("checked",false);
}
console.log('checkered');
}

  $('#radio').click(function(){
    if(pro == true || checked == true){
      pro= false;
      checked= false;
      console.log(pro + ',' + checked);
      main();
      checker();
      $('#curtain').show();
    }
    else if (pro == false || checked == false){
      pro= true;
      checked= true;
      console.log(pro + ',' + checked);
      checker();
      main();
      $('#curtain').show();
    }
  });
$('#details').click(function(){
	$(this).next().slideToggle();
});
  //----------------------------------------------------------------
/*
  $.getJSON('https://poloniex.com/public?command=returnChartData&currencyPair=BTC_XMR&start=1405699200&end=9999999999&period=300', function(data) {

    data.map(function(record) {
      record.date *= 1000;
    });

    var chart = AmCharts.makeChart("chartDiv1", {
      "type": "serial",
      "theme": "light",
      "valueAxes": [{
        "position": "left"
      }],
      "graphs": [{
        "id": "g1",
        "balloonText": "Open:<b>[[open]]</b><br>Low:<b>[[low]]</b><br>High:<b>[[high]]</b><br>Close:<b>[[close]]</b><br>",
        "closeField": "close",
        "fillColors": "#117e1a",
        "highField": "high",
        "lineColor": "#117e1a",
        "lineAlpha": 1,
        "lowField": "low",
        "fillAlphas": 0.9,
        "negativeFillColors": "#7b1111",
        "negativeLineColor": "#7b1111",
        "openField": "open",
        "title": "Price:",
        "type": "candlestick",
        "valueField": "close"
      }],
      "chartScrollbar": {
        "graph": "g1",
        "graphType": "line",
        "scrollbarHeight": 30
      },
      "chartCursor": {
        "valueLineEnabled": true,
        "valueLineBalloonEnabled": true
      },
      "categoryField": "date",
      "categoryAxis": {
        "parseDates": true
      },
      "dataProvider": data,

      "export": {
        "enabled": true,
        "position": "bottom-right"
      }
    });

    chart.addListener("rendered", zoomChart);
    zoomChart();

    // this method is called when chart is first inited as we listen for "dataUpdated" event
    function zoomChart() {
      // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
      chart.zoomToIndexes(chart.dataProvider.length - 10, chart.dataProvider.length - 1);
    }
  });
  //----------------------------------------------------------------

  $.getJSON('https://poloniex.com/public?command=returnChartData&currencyPair=BTC_XMR&start=1405699200&end=9999999999&period=900', function(data) {

    data.map(function(record) {
      record.date *= 1000;
    });

    var chart = AmCharts.makeChart("chartDiv2", {
      "type": "serial",
      "theme": "light",
      "valueAxes": [{
        "position": "left"
      }],
      "graphs": [{
        "id": "g1",
        "balloonText": "Open:<b>[[open]]</b><br>Low:<b>[[low]]</b><br>High:<b>[[high]]</b><br>Close:<b>[[close]]</b><br>",
        "closeField": "close",
        "fillColors": "#117e1a",
        "highField": "high",
        "lineColor": "#117e1a",
        "lineAlpha": 1,
        "lowField": "low",
        "fillAlphas": 0.9,
        "negativeFillColors": "#7b1111",
        "negativeLineColor": "#7b1111",
        "openField": "open",
        "title": "Price:",
        "type": "candlestick",
        "valueField": "close"
      }],
      "chartScrollbar": {
        "graph": "g1",
        "graphType": "line",
        "scrollbarHeight": 30
      },
      "chartCursor": {
        "valueLineEnabled": true,
        "valueLineBalloonEnabled": true
      },
      "categoryField": "date",
      "categoryAxis": {
        "parseDates": true
      },
      "dataProvider": data,

      "export": {
        "enabled": true,
        "position": "bottom-right"
      }
    });

    chart.addListener("rendered", zoomChart);
    zoomChart();

    // this method is called when chart is first inited as we listen for "dataUpdated" event
    function zoomChart() {
      // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
      chart.zoomToIndexes(chart.dataProvider.length - 10, chart.dataProvider.length - 1);
    }
  });
  //----------------------------------------------------------------

  $.getJSON('https://poloniex.com/public?command=returnChartData&currencyPair=BTC_XMR&start=1405699200&end=9999999999&period=7200', function(data) {

    data.map(function(record) {
      record.date *= 1000;
    });

    var chart = AmCharts.makeChart("chartDiv4", {
      "type": "serial",
      "theme": "light",
      "valueAxes": [{
        "position": "left"
      }],
      "graphs": [{
        "id": "g1",
        "balloonText": "Open:<b>[[open]]</b><br>Low:<b>[[low]]</b><br>High:<b>[[high]]</b><br>Close:<b>[[close]]</b><br>",
        "closeField": "close",
        "fillColors": "#117e1a",
        "highField": "high",
        "lineColor": "#117e1a",
        "lineAlpha": 1,
        "lowField": "low",
        "fillAlphas": 0.9,
        "negativeFillColors": "#7b1111",
        "negativeLineColor": "#7b1111",
        "openField": "open",
        "title": "Price:",
        "type": "candlestick",
        "valueField": "close"
      }],
      "chartScrollbar": {
        "graph": "g1",
        "graphType": "line",
        "scrollbarHeight": 30
      },
      "chartCursor": {
        "valueLineEnabled": true,
        "valueLineBalloonEnabled": true
      },
      "categoryField": "date",
      "categoryAxis": {
        "parseDates": true
      },
      "dataProvider": data,

      "export": {
        "enabled": true,
        "position": "bottom-right"
      }
    });

    chart.addListener("rendered", zoomChart);
    zoomChart();

    // this method is called when chart is first inited as we listen for "dataUpdated" event
    function zoomChart() {
      // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
      chart.zoomToIndexes(chart.dataProvider.length - 10, chart.dataProvider.length - 1);
    }
  });
  //----------------------------------------------------------------

  $.getJSON('https://poloniex.com/public?command=returnChartData&currencyPair=BTC_XMR&start=1405699200&end=9999999999&period=14400', function(data) {

    data.map(function(record) {
      record.date *= 1000;
    });

    var chart = AmCharts.makeChart("chartDiv5", {
      "type": "serial",
      "theme": "light",
      "valueAxes": [{
        "position": "left"
      }],
      "graphs": [{
        "id": "g1",
        "balloonText": "Open:<b>[[open]]</b><br>Low:<b>[[low]]</b><br>High:<b>[[high]]</b><br>Close:<b>[[close]]</b><br>",
        "closeField": "close",
        "fillColors": "#117e1a",
        "highField": "high",
        "lineColor": "#117e1a",
        "lineAlpha": 1,
        "lowField": "low",
        "fillAlphas": 0.9,
        "negativeFillColors": "#7b1111",
        "negativeLineColor": "#7b1111",
        "openField": "open",
        "title": "Price:",
        "type": "candlestick",
        "valueField": "close"
      }],
      "chartScrollbar": {
        "graph": "g1",
        "graphType": "line",
        "scrollbarHeight": 30
      },
      "chartCursor": {
        "valueLineEnabled": true,
        "valueLineBalloonEnabled": true
      },
      "categoryField": "date",
      "categoryAxis": {
        "parseDates": true
      },
      "dataProvider": data,

      "export": {
        "enabled": true,
        "position": "bottom-right"
      }
    });

    chart.addListener("rendered", zoomChart);
    zoomChart();

    // this method is called when chart is first inited as we listen for "dataUpdated" event
    function zoomChart() {
      // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
      chart.zoomToIndexes(chart.dataProvider.length - 10, chart.dataProvider.length - 1);
    }
  });
  //----------------------------------------------------------------

  $.getJSON('https://poloniex.com/public?command=returnChartData&currencyPair=BTC_XMR&start=1405699200&end=9999999999&period=86400', function(data) {

    data.map(function(record) {
      record.date *= 1000;
    });

    var chart = AmCharts.makeChart("chartDiv6", {
      "type": "serial",
      "theme": "light",
      "valueAxes": [{
        "position": "left"
      }],
      "graphs": [{
        "id": "g1",
        "balloonText": "Open:<b>[[open]]</b><br>Low:<b>[[low]]</b><br>High:<b>[[high]]</b><br>Close:<b>[[close]]</b><br>",
        "closeField": "close",
        "fillColors": "#117e1a",
        "highField": "high",
        "lineColor": "#117e1a",
        "lineAlpha": 1,
        "lowField": "low",
        "fillAlphas": 0.9,
        "negativeFillColors": "#7b1111",
        "negativeLineColor": "#7b1111",
        "openField": "open",
        "title": "Price:",
        "type": "candlestick",
        "valueField": "close"
      }],
      "chartScrollbar": {
        "graph": "g1",
        "graphType": "line",
        "scrollbarHeight": 30
      },
      "chartCursor": {
        "valueLineEnabled": true,
        "valueLineBalloonEnabled": true
      },
      "categoryField": "date",
      "categoryAxis": {
        "parseDates": true
      },
      "dataProvider": data,

      "export": {
        "enabled": true,
        "position": "bottom-right"
      }
    });

    chart.addListener("rendered", zoomChart);
    zoomChart();

    // this method is called when chart is first inited as we listen for "dataUpdated" event
    function zoomChart() {
      // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
      chart.zoomToIndexes(chart.dataProvider.length - 10, chart.dataProvider.length - 1);
    }
  });
  //----------------------------------------------------------------
*/
});