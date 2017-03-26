$(document).ready(function() {

  var currency = 'usd';

  $('.round').click(function() {
    $('.full').toggle();
  });

  $.getJSON('https://api.cryptonator.com/api/ticker/xmr-usd', function(data) {
    var price = data.ticker.price;
    var volume = data.ticker.volume;
    var change = data.ticker.change;
    var i = price.indexOf('.');
    var j = volume.indexOf('.');
    var fullPrice = price.substr(i + 3, price.length);
    var fullVolume = volume.substr(j + 3, volume.length);
    var roundedPrice = price.replace(fullPrice, '');
    var roundedVolume = volume.replace(fullVolume, '');
    $('#price').html(roundedPrice + '<span class="full">' + fullPrice + '</span>' + '&nbsp;' + currency.toUpperCase());
    $('#volume').html(roundedVolume + '<span class="full">' + fullVolume + '</span>' + '&nbsp;' + currency.toUpperCase());
    $('#change').html(change);
    if (change.charAt(0) === '-') {
      $('p').html('BOOHOO!');
    } else if (change.charAt(0) === '+') {
      $('p').html('We\'re going to the moon!');
    } else {
      $('p').html('');
    }
    $('h6').text(data.timestamp);
    //console.log(data.timestamp);
    /*$.getJSON('http://www.convert-unix-time.com/api?timestamp='+ data.timestamp,function(time){
      //console.log(time);
    });*/
  });

  $('button').click(function() {
    if (currency === 'usd') {
      currency = 'btc';
    } else if (currency === 'btc') {
      currency = 'usd';
    }
    $.getJSON('https://api.cryptonator.com/api/ticker/xmr-' + currency, function(data) {
      var price = data.ticker.price;
      var volume = data.ticker.volume;
      var change = data.ticker.change;
      var i = price.indexOf('.');
      var j = volume.indexOf('.');
      var fullPrice = price.substr(i + 3, price.length);
      var fullVolume = volume.substr(j + 3, volume.length);
      var roundedPrice = price.replace(fullPrice, '');
      var roundedVolume = volume.replace(fullVolume, '');
      $('#price').html(roundedPrice + '<span class="full">' + fullPrice + '</span>' + '&nbsp;' + currency.toUpperCase());
      $('#volume').html(roundedVolume + '<span class="full">' + fullVolume + '</span>' + '&nbsp;' + currency.toUpperCase());
      $('#change').html(change);
    });
  });

  function poloNews() {};

  function rxmr() {};

  function rxmrtrader() {};

  function stacknews() {};

  var setting;
  switch (setting) {
    case 'polo':
      poloNews();
      break;
    case 'rxmr':
      rxmr();
      break;
    case 'rxmrtrader':
      rxmrtrader();
      break;
    case 'stack':
      stacknews();
      break;
  }
});