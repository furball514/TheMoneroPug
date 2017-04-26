$(document).ready(function() {

var a = 0;
var b = 1;
var c = 0;

  var currency = 'usd';
  $('h5').hide();
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
      $('p, #change').removeClass('success')
      $('p, #change').addClass('danger');   
    } else if (change.charAt(0) === '+') {
      $('p').html('We\'re going to the moon!');
      $('p, #change').removeClass('danger')
      $('p, #change').addClass('success');   
    } else {
      $('p').html('');
      $('p, #change').removeClass('success')
      $('p, #change').removeClass('danger');   
    }
    $('h6').text('last updated: ' + new Date(data.timestamp * 1000).toString());
    //console.log(data.timestamp);
    /*$.getJSON('http://www.convert-unix-time.com/api?timestamp='+ data.timestamp,function(time){
      //console.log(time);
    });*/
  });

  $('#button').click(function() {
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
 //------------------------------------------------------
 //var defId = 753252;
  var id = 753252; /* temporary fix*/
  
  function fallback(){ id = localStorage.id;
    if (id == undefined || id === ''){
    id = 753252;
    console.log(id);}    /* fallback may fail. yet to test.*/
     var random = Math.floor(Math.random() * 1400 + 1); /* should change ?*/ /* temporary */
     //only for xmr spec
     $.ajax({
      url: 'http://bitcointalkapi.appspot.com/v1/topics/' + id + '?pageId=' + random ,
      dataType: 'json',
      success: function(data) {
        var pageN = data.numberPages; /* pageNumbers ?*/
        var pageNtoo = data.pages.length + 1;
        $.ajax({
      url: 'http://bitcointalkapi.appspot.com/v1/topics/' + id + '?pageId=' + pageN ,
      dataType: 'json',
      success: function(data) {
        var pc = data.postCount;
        for (var q = 0;q<data.requestedPage.posts.length;q++){
        $('section').append('<a href="' + 'https://bitcointalk.org/index.php?topic=' + id + '.' + pc + '" target="_blank">' + 'btctalk:' + '</a> &nbsp;' + '<p>' + data.requestedPage.posts[q].content + ' -' + data.requestedPage.posts[q].poster + '</p> <br>');
        }
      },
      error: function(data) {
        console.log('error');
        $.ajax({
      url: 'http://bitcointalkapi.appspot.com/v1/topics/' + id + '?pageId=' + pageNtoo,
      dataType: 'json',
      success: function(data) {
        var pc = data.postCount;
        for (var j = 0;j<data.requestedPage.posts.length;j++){
        $('section').append('<a href="' + 'https://bitcointalk.org/index.php?topic=' + id + '.' + pc + '" target="_blank">' + 'btctalk:' + '</a> &nbsp;' + '<p>' + data.requestedPage.posts[j].content + ' -' + data.requestedPage.posts[j].poster + '</p> <br>');
        } /* new changes to html display . untested*/
      },
      error: function(data) {
        console.log('error');
        $('h5').show();
        setTimeout(function(){$('h5').hide();},2000);
        //alert('BitcoinTalk API failed,showing r/xmrtrader instead.');
        setTimeout(rxmrtrader, 1000);
        $('b').show();   
        $('b').click(function(){
          b++; rxmrtrader();
        });   
      }
    });        
      }
    });  
      },
      error: function(data) {
        console.log('error');
        $('h5').show();
        setTimeout(function(){$('h5').hide();},2000);
        //alert('BitcoinTalk API failed,showing r/xmrtrader instead.');
        setTimeout(rxmrtrader, 1000);
        $('b').show();
        $('b').click(function(){
          b++; rxmrtrader();
        });  
      }
    });     }
  /* set new fallback http://bitcointalkapi.appspot.com/v1/topics/753252/pages/1422 (data.posts)(no requestedPage) */
  function btcTalk() {
    id = localStorage.id;
    if (id == undefined || id === ''){
    id = 753252;
    console.log(id);
  }
    $.ajax({
      url: 'http://bitcointalkapi.appspot.com/v1/topics/' + id + '?pageId=latest',
      dataType: 'json',
      success: function(data) {
        console.log(data);
        $('h5').hide();
        var pc = data.postCount;
        for (var p = 0;p<data.requestedPage.posts.length;p++){
        $('section').append('<a href="' + 'https://bitcointalk.org/index.php?topic=' + id + '.' + pc + '" target="_blank">' + 'btctalk:' + '</a> &nbsp;' + '<p>' + data.requestedPage.posts[p].content + ' -' + data.requestedPage.posts[p].poster + '</p> <br>');
        }
      },
      error: function(data) {
        console.log('error');
        fallback();
      }
    });
  }

  function rxmr() {
    $.getJSON('http://www.reddit.com/r/monero/new.json?sort=new', function(data) {
      $('section').html('r/Monero:&nbsp;' + '<a href="' + data.data.children[a].data.url + '" target="_blank">' + data.data.children[a].data.title + '</a>' + '<br>' + data.data.children[a].data.selftext);
      //console.log(data);
    });
  }

  function rxmrtrader() {
    $.getJSON('http://www.reddit.com/r/xmrtrader/new.json?sort=new', function(data) {
      //console.log(data);
      $('section').html('r/xmrtrader:&nbsp;' + '<a href="' + data.data.children[b].data.url + '" target="_blank">' + data.data.children[b].data.title + '</a>' + '<br>' + data.data.children[b].data.selftext);
    });
  }

  function stacknews() {
    $.getJSON('https://api.stackexchange.com/2.2/questions?site=monero.stackexchange&key=pBB66N00y6UB2taxSwd0mg((', function(data) {
      $('section').html('monero.stackexchange:&nbsp;' + '<a href="' + data.items[c].link + '" target="_blank">' + data.items[c].title + '</a>' + '<br>');
      //console.log(data);
    });
  }
  
   function troll() {
    $.ajax({
      url: 'https://cactus-library.glitch.me',
      dataType: 'json',
      success: function (data){
          $('section').html('tb: ' + data[data.length - 1]);
      },
      error: function () {
         console.log('error');
        setTimeout(rxmrtrader, 1000);
        $('b').show();
        $('b').click(function(){
          b++; rxmrtrader();
        });  
      }
    });
  }
  
  //var defSetting = 'btc';
  var setting;
  function check(){
  setting = localStorage.mySetting;
  if (setting == undefined || (setting != 'btc' && setting != 'rxmr' && setting != 'rxmrtrader' && setting != 'stack')){
  	setting = 'btc';
  }
}
  check();

  if(setting === 'btc'){
    $('b').hide();
  }
  else {
    $('b').show();
  }

  function rerender(){
  switch (setting) {
    case 'btc':
      btcTalk();
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
  console.log('rendered')
}
rerender();

$('b').click(function(){
  check();
  switch(setting){
    case 'rxmr':
      a++; rerender();
      break;
    case 'rxmrtrader':
      b++; rerender();
      break;
    case 'stack':
      c++; rerender();
      break;
  }
});

  $('#settings').click(function() {
  if (chrome.runtime.openOptionsPage) {
    // New way to open options pages, if supported (Chrome 42+).
    chrome.runtime.openOptionsPage();
  } else {
    // Reasonable fallback.
    window.open(chrome.runtime.getURL('/setting/options.html'));
  }
});});

/*$('h5').show();
        setTimeout(function(){$('h5').hide();},2000);
        //alert('BitcoinTalk API failed,showing r/xmrtrader instead.');
        setTimeout(rxmrtrader, 1000);*/
