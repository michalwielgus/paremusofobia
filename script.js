$(document).ready(function(){
    //var speed = 600;
    /* 
    // Ustawienie preloadera, wysokości slidera i artykułu
    */
    //setArticleHeight();


    /*
        Aktualizowanie pozycji elementu slidera i wysokosci slidera/artykułu
        przy zmianie rozmiaru okna.
    */
    $(window).resize(function(){
        spotifySetHeight()
        wysokosc = setSliderHeight();
        setMagicLine();
        setTracklistHeight();
        changeToBurgerMenu();
        addOrRemoveMagicLineAndShowOrHideMenu();

        move_value = setMoveValue(wysokosc);
        id = $('.nav-dot-current').attr('id');
        $('#slider ul').animate({top: move_value[id-1]},0);
    });

    /*
        Jeśli istnieje social-bar ustawia pozycje na fixed przy doscrollowaniu
        do niego.
    */
    if($(".social-bar")[0]){
        var socialBarOffset = $(".social-bar").offset().top;
        $(window).scroll(function(){
            
            if( socialBarOffset < $(this).scrollTop()) {
                $(".social-bar").addClass('social-bar-fixed');
            } else {
                $(".social-bar").removeClass('social-bar-fixed');
            }
        });
    }
    /* 
        Wyrównanie wysokości playera spotify do wysokości playera youtube
    */
    spotifySetHeight();
  
    /* 
        Obsługa otwierania/zamykania burgera
    */
    changeToBurgerMenu();

    $(".burger img").click(function(){

        if($('.burger img').hasClass('open')) {
            $(".menu-list-news").hide('bind');
            $('.burger img').removeClass('open');
        } else {
            $(".menu-list-news").show('bind');
            $('.burger img').addClass('open');
        }
    });



    /* 
        Ustawianie wysokości diva z tracklistą w zależności od wielkości ekranu.
    */
        setTracklistHeight();

    /* 
        Obsługa przesunięcia pozycji slidera do danego elementu.
    */
    $('div#nav-dots span').click(function(){
        var id = $(this).attr('id');
        wysokosc = setSliderHeight();
        move_value = setMoveValue(wysokosc);
        $('div#nav-dots span').removeClass('nav-dot-current');
        $(this).addClass('nav-dot-current');
        $('#slider ul').animate({top: move_value[id-1]},500);
        });

    var id_pozycji_automat = 1

    setInterval(function(){
        wysokosc = setSliderHeight();
        move_value = setMoveValue(wysokosc);
        $('div#nav-dots span').removeClass('nav-dot-current');
         $('span[id='+ id_pozycji_automat +']').addClass('nav-dot-current');
        $('#slider ul').animate({top: move_value[id_pozycji_automat-1]},500);

        if(id_pozycji_automat >= 5) {
            id_pozycji_automat = 1;
        } else {
            id_pozycji_automat++;
        }
        $('div#nav-dots span').click(function(){
            id_pozycji_automat = $(this).attr('id');
        });
    }, 5000);
       

    /* 
        Obsługa magicline w menu głównym.
    */

    
    /* 
        Klikając dokument zamknij burger menu
    */
        $(document).click(function(event){
            event.stopPropagation();
            if($('.menu-list-news').is(':visible') && !$(event.target).hasClass('img-burger')) {
                $(".menu-list-news").hide('bind'); 
            } else {
            }

        }); 
    
    /* 
        Obsługa strzałeczek w kalendarzu.
    */
    var calendarElementWidth = $("#calendar-container li").innerWidth();
    var calendarUlWidth = $("#calendar-container ul").innerWidth();
    var currentUlPosition = $("#calendar-container ul").css('left');
    currentUlPosition = parseFloat(currentUlPosition);
    var allItems = $("#calendar-container ul").children().length;
    var visibleItems = Math.floor(calendarUlWidth/calendarElementWidth);
    
    $(".right-arrow").click(function(){
        if(((allItems - visibleItems) * -calendarElementWidth) < currentUlPosition ){
            currentUlPosition -= calendarElementWidth;
            $("#calendar-container ul").animate({
                left: currentUlPosition
            }, 100);
        }
    });

    $(".left-arrow").click(function(){
        if(currentUlPosition < 0) {
            currentUlPosition += calendarElementWidth;
            $("#calendar-container ul").animate({
                left: currentUlPosition
            }, 100);
        }
    });

    /*
        Funkcje
    */
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

    function setSliderHeight(){
        var szerokosc = $('.width-checker').width();
        var wysokosc = $('div.slider-obrazek img').height();
        if(szerokosc <= 600) {
            
            wysokosc = wysokosc + 100;
                   
        }
        $('ul.sb-slider li').css('height', wysokosc);   
        $('section#slider').css("height", wysokosc);
        return wysokosc;    
    }
    function setTracklistHeight() {
        var tracklistH3Height = $(".tracklisth3").height();
        if($('.width-checker').width() > 1024){
        $(".summary-tracklist").css("height", $(".summary-image").height()); 
        
        var summaryImageHeight = $(".summary-image").height();
        var minusTracklitH3 = summaryImageHeight - tracklistH3Height - 50;
        $(".tracklist-container").css("height", minusTracklitH3);
        }
        else {
            $(".summary-tracklist").css("height",$(".tracklist-container ol").height() + tracklistH3Height + 80);
            $(".tracklist-container").css("height",$(".tracklist-container ol").height() + 50);
        }
    }

    function setMagicLine() {
            if($('#magic-line')[0]) {
            var $magicLine = $("#magic-line");
            var magicLineWidth = $("#menu li.current_page_item a").width();
            $magicLine
                .width(magicLineWidth)
                .css("left", $("#menu li.current_page_item a").position().left +  parseInt($("#menu li.current_page_item a").css('padding-left')))
                .data("origLeft", $magicLine.position().left)
                .data("origWidth", $magicLine.width());
                
            $("#menu li a").hover(function() {
                $el = $(this);

                leftPos = $el.position().left + parseInt($el.css('padding-left'));
                newWidth = $el.width();
                
                $magicLine.stop().animate({
                    left: leftPos,
                    width: newWidth
                });
            }, function() {
                $magicLine.stop().animate({
                    left: $magicLine.data("origLeft"),
                    width: $magicLine.data("origWidth")
                });    
            });
        }
    }

    function changeToBurgerMenu() {
        if($("#main-menu-list")[0] && ($('.width-checker').width() <=768)) {
            $("#main-menu-list").addClass('menu-list-news');
        }
        else {
            $("#main-menu-list").removeClass('menu-list-news');
        }
    }

    function addOrRemoveMagicLineAndShowOrHideMenu() {
        if($('.width-checker').width() > 768){
            if(!($('#magic-line')[0])){
                $("#menu").append("<li id='magic-line'></li>");
            }
            $("#main-menu-list").show('bind');
        }
        else {
            $("#main-menu-list").hide('bind');
            if($('#magic-line')[0]) {
                $('#magic-line').remove();
            }
        }
    }
    function spotifySetHeight() {
        if($("#playlist")[0]) {
        $('#playlist').css('height', $('#video').height());
    }
    }

    $(window).load(function(){
    setMagicLine();
    addOrRemoveMagicLineAndShowOrHideMenu();
});
});

