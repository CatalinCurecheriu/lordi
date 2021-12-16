$(document).ready(function(){

    $("#slideshow > div:gt(0)").hide();
    
    var buttons = "";
    
    var slidesl = $('.slideitem').length
    var d = "";
    for (var i = 1; i < slidesl; i++) {
      d = d+"";
    }	
    var dots = "" + d + "";
    
    $("#slideshow").append(dots).append(buttons);
    var interval = setInterval(slide, 6000);
    
    function intslide(func) {
        if (func == 'start') { 
         interval = setInterval(slide, 6000);
        } else {
            clearInterval(interval);		
            }
    }
    
    function slide() {
            sact('next', 0, 1200);
    }
        
    function sact(a, ix, it) {
            var currentSlide = $('.current');
            var nextSlide = currentSlide.next('.slideitem');
            var prevSlide = currentSlide.prev('.slideitem');
                var reqSlide = $('.slideitem').eq(ix);
    
                var currentDot = $('.active-dot');
              var nextDot = currentDot.next();
              var prevDot = currentDot.prev();
                var reqDot = $('.dot').eq(ix);
            
            if (nextSlide.length == 0) {
                  nextDot = $('.dot').first();
                nextSlide = $('.slideitem').first();
                }
    
            if (prevSlide.length == 0) {
                  prevDot = $('.dot').last();
                prevSlide = $('.slideitem').last();
                }
                
            if (a == 'next') {
                var Slide = nextSlide;
                var Dot = nextDot;
                }
                else if (a == 'prev') {
                    var Slide = prevSlide;
                    var Dot = prevDot;
                    }
                    else {
                        var Slide = reqSlide;
                        var Dot = reqDot;
                        }
    
            currentSlide.fadeOut(it).removeClass('current');
            Slide.fadeIn(it).addClass('current');
            
            currentDot.removeClass('active-dot');
            Dot.addClass('active-dot');
    }	
    
    $('.next').on('click', function(){
            intslide('stop');						
            sact('next', 0, 400);
            intslide('start');						
        });//next
    
    $('.prev').on('click', function(){
            intslide('stop');						
            sact('prev', 0, 400);
            intslide('start');						
        });//prev
    
    $('.dot').on('click', function(){
            intslide('stop');
            var index  = $(this).index();
            sact('dot', index, 400);
            intslide('start');						
        });//prev
    //slideshow
    });







    // global vars
var players = [],
current = 0;

// YouTube iFrame API Ready
function onYouTubeIframeAPIReady() {

$('[data-trailer]').each(function() {

    var player,
    id = $(this).data('trailer');

    $(this).html('<iframe id="player_' + id + '" src="https://www.youtube.com/embed/' + id + '?enablejsapi=1&autohide=1&showinfo=0&theme=light" frameborder="0" allowfullscreen></iframe>');

    player = new YT.Player('player_' + id, {
        events: {
            'onStateChange': onPlayerStateChange
        }
    });

    players.push(player);

});

}
// Test For Donald
// YouTube On Player State Change
function onPlayerStateChange(event) {

var player = players[current];

switch(event.data) {

    case YT.PlayerState.ENDED:
        player.stopVideo();
        player.seekTo(0);
        $('.card-movie--playing').removeClass('card-movie--playing');
        $('[data-play]').removeClass('is-playing');
;        break;

}

}

$(function() {

$('[data-play]').on('click', function() {

    var $card = $('.card-movie--active'),
        player = players[$card.index()];

    if ($card.hasClass('card-movie--playing')) {
        $(this).toggleClass('is-playing');
        player.pauseVideo();
    } else {
        $(this).toggleClass('is-playing');
        player.playVideo();
    }

    $card.toggleClass('card-movie--playing');

});

$('[data-navigation] li').on('click', function() {

    // remove current stuff
    players[current].pauseVideo();
    $('.card-movie:eq(' + current + ')').removeClass('card-movie--playing card-movie--active');
    $('[data-play]').removeClass('is-playing');
     // assign new current
    current = $(this).index();
    $(this).addClass('is-active').siblings().removeClass('is-active');
    $('.card-movie:eq(' + current + ')').addClass('card-movie--active');

});

});