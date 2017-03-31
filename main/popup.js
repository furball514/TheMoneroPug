$(document).ready(function() {

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
    $('h6').text(data.timestamp);
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
  var id;
  
  function fallback(){ id = localStorage.id;
    if (id == undefined || id === ''){
    id = 753252;
    console.log(id);}
     var random = Math.floor(Math.random() * 1400 + 1); 
     //only for xmr spec
     $.ajax({
      url: 'http://bitcointalkapi.appspot.com/v1/topics/' + id + '?pageId=' + random ,
      dataType: 'json',
      success: function(data) {
        var pageN = data.pageNumbers;
        var pageNtoo = data.pages.length + 1;
        $.ajax({
      url: 'http://bitcointalkapi.appspot.com/v1/topics/' + id + '?pageId=' + pageN ,
      dataType: 'json',
      success: function(data) {
        var pc = data.postCount;
        for (var q = 0;q<data.posts.length;q++){
        $('section').append('<a href="' + 'https://bitcointalk.org/index.php?topic=' + id + '.' + pc + '">' + data.posts[q].content + '</a>' + ' -' + data.posts[q].poster);
        }
      },
      error: function(data) {
        console.log('error');
        $.ajax({
      url: 'http://bitcointalkapi.appspot.com/v1/topics/' + id + '?pageId=' + pageNtoo,
      dataType: 'json',
      success: function(data) {
        var pc = data.postCount;
        for (var j = 0;j<data.posts.length;j++){
        $('section').append('<a href="' + 'https://bitcointalk.org/index.php?topic=' + id + '.' + pc + '">' + data.posts[j].content + '</a>' + ' -' + data.posts[j].poster);
        }
      },
      error: function(data) {
        console.log('error');
        $('h5').show();
        setTimeout(function(){$('h5').hide();},2000);
        //alert('BitcoinTalk API failed,showing r/xmrtrader instead.');
        setTimeout(rxmrtrader, 1000)      
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
      }
    });     }
  
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
        for (var p = 0;p<data.posts.length;p++){
        $('section').append('<a href="' + 'https://bitcointalk.org/index.php?topic=' + id + '.' + pc + '">' + data.posts[p].content + '</a>' + ' -' + data.posts[p].poster);
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
      $('section').append('r/Monero:&nbsp;' + '<a href="' + data.data.children[0].data.url + '" target="_blank">' + data.data.children[0].data.title + '</a>' + '<br>' + data.data.children[0].data.selftext);
      //console.log(data);
    });
  }

  function rxmrtrader() {
    $.getJSON('http://www.reddit.com/r/xmrtrader/new.json?sort=new', function(data) {
      //console.log(data);
      $('section').append('r/xmrtrader:&nbsp;' + '<a href="' + data.data.children[1].data.url + '" target="_blank">' + data.data.children[1].data.title + '</a>' + '<br>' + data.data.children[1].data.selftext);
    });
  }

  function stacknews() {
    $.getJSON('https://api.stackexchange.com/2.2/questions?site=monero.stackexchange&key=pBB66N00y6UB2taxSwd0mg((', function(data) {
      $('section').append('monero.stackexchange:&nbsp;' + '<a href="' + data.items[0].link + '" target="_blank">' + data.items[0].title + '</a>' + '<br>');
      //console.log(data);
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
