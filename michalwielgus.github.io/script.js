
$(window).load(function(){

    $('#preloader').delay('600').fadeOut('slow',function(){$(this).remove();});
    setSliderHeight();
    setArticleHeight();
    $(window).resize(setArticleHeight());

    $(window).resize(function(){
        wysokosc = setSliderHeight();
        move_value = setMoveValue(wysokosc);
        $('#slider ul').animate({top: move_value[id-1]},0);
    });

    $(window).resize(function(){
    wysokosc = $('.sb-slider li[id=s1]').height();
    $('section#slider').css("height", wysokosc);
    });

    

    $('nav#main-menu-list ul >li').mouseenter(function () {
    $(this).animate({
        backgroundColor: "#aa0000",
        color: "#fff"
    }, 300);

}).mouseleave(function () {
     $(this).animate({
        backgroundColor: "#fff",
        color: "#000"
    }, 300);


});

 $('.more a').mouseenter(function () {
    $(this).css({borderBottom: '3px solid #aa0000'}).animate({
        borderWidth: 3
    }, 100);
}).mouseleave(function () {
     $(this).animate({
        borderWidth: 1
    }, 100);
});

    $('div#nav-dots span').click(function(){
        var id = $(this).attr('id');
        wysokosc = setSliderHeight();
        move_value = setMoveValue(wysokosc);
        $('div#nav-dots span').removeClass('nav-dot-current');
        $(this).addClass('nav-dot-current');
        $('#slider ul').animate({top: move_value[id-1]},500);
        });


    

     function setSliderHeight(){
        var szerokosc = $(window).width();
        if(szerokosc < 591) {
            var wysokosc = $('div.slider-obrazek img').height();
            wysokosc = wysokosc + 100;
           $('ul.sb-slider li').css('height', wysokosc);          
        }
        else {
            wysokosc = $('.sb-slider li[id=s1]').height();  
        }

        $('section#slider').css("height", wysokosc);
        return wysokosc;
        
        
    }

    function setMoveValue(wysokosc){
        var move_value = [];
        move_value[0] = 0;
        move_value[1] = -wysokosc;
        move_value[2] = -wysokosc*2;
        move_value[3] = -wysokosc*3;
        move_value[4] = -wysokosc*4;   
        return move_value;   
    }

    function setArticleHeight(){
        var maxheight = 0;
        $('article').each(function(){
            maxheight = ($(this).height() > maxheight ? $(this).height() : maxheight);
        });
        $('article').css('height', maxheight);
    }
});