$(function () {

    $("#start-link").click(function () {
        $('html, body').animate({
            scrollTop: $("#start").offset().top
        }, 1000);
    })

    $("#what-is-link, #arrow-start, #what-is-start, #hackweek9").click(function () {
        $('html, body').animate({
            scrollTop: $("#what-is").offset().top
        }, 1000);
    })

    $("#people-link").click(function () {
        $('html, body').animate({
            scrollTop: $("#people").offset().top
        }, 1000);
    })

    $("#agenda-link, #agenda-start").click(function () {
        $('html, body').animate({
            scrollTop: $("#agenda").offset().top
        }, 1000);
    })

    $("#projects-link, #projects-start").click(function () {
        $('html, body').animate({
            scrollTop: $("#projects").offset().top
        }, 1000);
    })

    $("#where-link, #where-start").click(function () {
        $('html, body').animate({
            scrollTop: $("#where").offset().top
        }, 1000);
    })

    $("#terminal-btn").click(function () {
        toggle_terminal()
    })

    $("#terminal-bottom-bar-tab-close").click(function () {
        toggle_terminal()
    })

    $(document).keydown(function(e){
        if (e.keyCode == 0 || e.keyCode == 94 || e.keyCode == 54 || e.keyCode == 176 || e.keyCode == 160) {
            e.preventDefault();
            toggle_terminal()
        }
    })

    /* agenda */

    $("#monday .agenda-item .day-number").on('mouseover click', function(event) {
        event.stopPropagation()
        slidein_agenda_day($('#monday-content'), 0 * 200)
    })
    $("#tuesday .agenda-item .day-number").on('mouseover click', function(event) {
        event.stopPropagation()
        slidein_agenda_day($('#tuesday-content'), 1 * 200)
    })
    $("#wednesday .agenda-item .day-number").on('mouseover click', function(event) {
        event.stopPropagation()
        slidein_agenda_day($('#wednesday-content'), 2 * 200)
    })
    $("#thursday .agenda-item .day-number").on('mouseover click', function(event) {
        event.stopPropagation()
        slidein_agenda_day($('#thursday-content'), 3 * 200)
    })
    $("#friday .agenda-item .day-number").on('mouseover click', function(event) {
        event.stopPropagation()
        slidein_agenda_day($('#friday-content'), 4 * 200)
    })


    function set_agenda_location(loc) {
        if ( agenda_content[loc] == undefined ) {
            loc = "nuremberg"
        }
        var converter = new Showdown.converter();
        $('#monday-content .agenda-details').html(converter.makeHtml(agenda_content[loc].monday))
        $('#tuesday-content .agenda-details').html(converter.makeHtml(agenda_content[loc].tuesday))
        $('#wednesday-content .agenda-details').html(converter.makeHtml(agenda_content[loc].wednesday))
        $('#thursday-content .agenda-details').html(converter.makeHtml(agenda_content[loc].thursday))
        $('#friday-content .agenda-details').html(converter.makeHtml(agenda_content[loc].friday))
        $("#agenda-offices span").removeClass('current')
        $("#agenda-" + loc + "-link").addClass('current')
        $.cookie("agenda-location", loc)
        $('.agenda-details').stop().css('opacity', '0')
        $('.agenda-details').stop().animate({
            'opacity': 1
        }, 800);
    }


    $("#agenda").click(function () {
        $(".agenda-day-content").stop().animate({
            'width': '0px', 'opacity': 0
        }, 800);
    })

    $(".agenda-city-link").click(function (event) {
        event.stopPropagation()
        var city = $(this).attr('id').replace("agenda-", "").replace("-link", "")
        set_agenda_location(city)
    })

    if ($.cookie("agenda-location")) {
        set_agenda_location($.cookie("agenda-location"))
    } else {
        set_agenda_location('nuremberg')
    }

    /* auto open current agenda day */
    var today = new Date();
    if( today.getMonth()+1 == 4 && today.getYear() == 113) {
        if (today.getDate() == 8) slidein_agenda_day($('#monday-content'))
        if (today.getDate() == 9) slidein_agenda_day($('#tuesday-content'))
        if (today.getDate() == 10) slidein_agenda_day($('#wednesday-content'))
        if (today.getDate() == 11) slidein_agenda_day($('#thursday-content'))
        if (today.getDate() == 12) slidein_agenda_day($('#friday-content'))
    }


    function slidein_agenda_day(element, offset) {
        if (element.css('width') == "0px") {
            $("#agenda-content").stop().animate({
                'left': (0 - offset) + 'px'
            }, 800);
            $(".agenda-day-content").stop().animate({
                'width': '0px', 'opacity': 0
            }, 800);
            element.css({ width: 0, 'opacity': 0 })
                .show()
                .stop().animate({
                    'width': '400px', 'opacity': 1, 'margin-left': '30px'
                }, 800);
        }
    }


    /* project page actions */

    function project_unlock() {
        window.clearInterval(circle_rotation)
        $('#build_wheel_03').off('click');
        $("#build_wheel_01").rotate({ animateTo: 0})
        $("#build_wheel_02").rotate({ animateTo: 0})
        $('#lock, #line_01, #line_02, #line_03').fadeIn('slow');
        //$('#wheel_01').fadeIn();
        //$('#wheel_02').fadeIn();
        //$('#wheel_03').fadeIn();
        //$('#build_wheel_01').fadeOut();
        //$('#build_wheel_02').fadeOut();
        //$('#build_wheel_03').fadeOut();
        //$('#solid_wheel').fadeOut();
    }

    /* rotate lib: http://code.google.com/p/jqueryrotate/wiki/Examples */
    var angle = 0
    var angle2 = 0
    var angle3 = 0
    var circle_rotation = setInterval(function () {
        angle += 1
        angle2 -= 1
        $("#build_wheel_01").rotate(angle)
        $("#build_wheel_02").rotate(angle2)
        if ( angle%360 == 0 ) angle = 0
        if ( angle2%360 == 0 ) angle2 = 0
        if (angle3 == 270) project_unlock()
    }, 90);

    $("#build_wheel_03").click(function (event) {
        angle3 +=90;
        $(this).rotate({ animateTo: angle3})
        if ( angle3%360 == 0 ) angle3 = 0
    })



    /* where page actions */
    $(".location").on('mouseover click', function(event) {
        $(".location-zoom").fadeOut()
        $("#" + $(this).attr('id') + "-zoom").fadeIn()
    })

    $(".location-zoom").on('mouseleave', function(event) {
        $(".location-zoom").fadeOut()
    })



    window.toggle_terminal = function() {
        if ($('#terminal').is(":visible")) {
            $('#terminal').slideUp('fast');
            $('#wterm').find('div:last form input').blur()
        } else {
            $('#terminal').slideDown('fast');
            $('#wterm').find('div:last form input').focus()
        }

    }

    $(window).scroll(function () {

        /* hide - unhide navigation, arrow, terminal button on first page */
        if (!$('#navigation').is(":visible") && $(window).scrollTop() >= $('#what-is').height()/1.5) {
            $('#navigation').fadeIn()
            $('#terminal-btn').fadeIn()
            $('#arrow-start').fadeOut()

        }
        if ($('#navigation').is(":visible") && $(window).scrollTop() < $('#what-is').height()/1.5) {
            $('#navigation').fadeOut()
            //$('#terminal-btn').fadeOut()
            $('#arrow-start').fadeIn()
        }


        /* people page text scroll animation */
        if ($(window).scrollTop() > $('#people').position().top - $('#people').height() &&
            $(window).scrollTop() < $('#people').position().top + 2 * $('#people').height()) {
            var percent_scrolled_out = Math.abs(($(window).scrollTop() - $('#people').position().top) / $('#people').height())
            $('.project-instructions').css({'opacity': 1 - percent_scrolled_out * 3})
        }

        /* where page text scroll animation */
        if ($(window).scrollTop() > $('#where').position().top - $('#where').height()) {
            var percent_scrolled_out = Math.abs(($(window).scrollTop() - $('#where').position().top) / $('#where').height())
            $('#where-title').css({'opacity': 1 - percent_scrolled_out/2,
                right: (percent_scrolled_out * -500) - 40})
        }

        /* set active page in navigation menu */
        if ($(window).scrollTop() > $('#where').position().top - $('#where').height() / 2) {
            $('#navigation li').removeClass('active')
            $('#where-link').addClass('active')
        } else if ($(window).scrollTop() > $('#people').position().top - $('#people').height() / 2) {
            $('#navigation li').removeClass('active')
            $('#people-link').addClass('active')
        } else if ($(window).scrollTop() > $('#projects').position().top - $('#projects').height() / 2) {
            $('#navigation li').removeClass('active')
            $('#projects-link').addClass('active')
        } else if ($(window).scrollTop() > $('#agenda').position().top - $('#agenda').height() / 2) {
            $('#navigation li').removeClass('active')
            $('#agenda-link').addClass('active')
        } else if ($(window).scrollTop() > $('#what-is-link').position().top - $('#what-is-link').height() / 2) {
            $('#navigation li').removeClass('active')
            $('#what-is-link').addClass('active')
        }

        /* invert navigation color */
        $('#navigation li').each(function (index) {
            $(this).removeClass('invert')
            if (($(this).position().top + $(this).height() > $("#people").position().top - $(window).scrollTop()) &&
                ($(this).position().top + $(this).height() < $("#people").position().top - $(window).scrollTop() + $('#people').height())) {
                $(this).addClass('invert')
            }
            if (($(this).position().top + $(this).height() > $("#what-is").position().top - $(window).scrollTop()) &&
                ($(this).position().top + $(this).height() < $("#what-is").position().top - $(window).scrollTop() + $('#what-is').height())) {
                $(this).addClass('invert')
            }
        });

        /* invert terminal link color */
        $('#terminal-btn').removeClass('invert')
        if (($('#terminal-btn').position().top + $('#terminal-btn').height()/2 > $("#start").position().top - $(window).scrollTop()) &&
                ($('#terminal-btn').position().top + $('#terminal-btn').height()/2 < $("#start").position().top - $(window).scrollTop() + $('#start').height())) {
            $('#terminal-btn').addClass('invert')
        }
        if (($('#terminal-btn').position().top + $('#terminal-btn').height()/2 > $("#what-is").position().top - $(window).scrollTop()) &&
            ($('#terminal-btn').position().top + $('#terminal-btn').height()/2 < $("#what-is").position().top - $(window).scrollTop() + $('#what-is').height())) {
            $('#terminal-btn').addClass('invert')
        }
    })


    /* start page text initial animation */
    if ($(window).scrollTop() == 0) {
        $("#hackweek9-text").css({ top: - 600 })
        $("#hackweek9-text").animate({
            top: 0
        }, 800);

        $("#hackweek9-img").css({ left: $(window).width() })
        $("#hackweek9-img").delay(200).animate({
            left: 0, top: 0
        }, 600);

        $("#pay-off").css({ right: $(window).width() })
        $("#pay-off").delay(1200).animate({
            right: '50%'
        }, 800);

        $("#start-menu").delay(1000).fadeIn()

    } else {
        $("#start-menu").show()
    }



  // Setup terminal
  $('#wterm').wterm({
      WELCOME_MESSAGE: "<span class='welcome-message'>Welcome to Hack Week 9! Have a lot of fun...<span><br><span class='welcome-message'>See 'help' for more information on a specific command.<span>",
      PS1:             "geeko@hackweek:~ >",
      NOT_FOUND:       "Sorry me and my chameleon friends have never heard about CMD before :-(",
      WIDTH:           "80%",
      HEIGHT:          "500px"
  });

});




