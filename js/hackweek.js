$(function () {

    $("#start-link").click(function () {
        $('html, body').animate({
            scrollTop: $("#start").offset().top
        }, 1000);
    })

    $("#what-is-link, #arrow-start").click(function () {
        $('html, body').animate({
            scrollTop: $("#what-is").offset().top
        }, 1000);
    })

    $("#projects-link").click(function () {
        $('html, body').animate({
            scrollTop: $("#projects").offset().top
        }, 1000);
    })

    $("#agenda-link").click(function () {
        $('html, body').animate({
            scrollTop: $("#agenda").offset().top
        }, 1000);
    })

    $("#join-link").click(function () {
        $('html, body').animate({
            scrollTop: $("#join").offset().top
        }, 1000);
    })

    $("#where-link").click(function () {
        $('html, body').animate({
            scrollTop: $("#where").offset().top
        }, 1000);
    })

    $(".terminal-btn").click(function () {
        toggle_terminal()
    })

    $(document).keydown(function(e){
        if (e.keyCode == 0 || e.keyCode == 94 || e.keyCode == 176) {
            toggle_terminal()
        }
    })


    function toggle_terminal() {
        if ($('#terminal').is(":visible")) {
            $('#terminal').slideUp('fast');
        } else {
            $('#terminal').slideDown('fast');
        }
    }

    $(window).scroll(function () {

        /* hide - unhide navigation */
        if (!$('#navigation').is(":visible") && $(window).scrollTop() >= $('#what-is').height()/2) {
            $('#navigation').fadeIn()
            $('#arrow-start').fadeOut()

        }
        if ($('#navigation').is(":visible") && $(window).scrollTop() < $('#what-is').height()/2) {
            $('#navigation').fadeOut()
            $('#arrow-start').fadeIn()
        }

        /* start page text scroll animation */
        if ($(window).scrollTop() <= $('#start').height()) {
            var percent_scrolled_out = $(window).scrollTop() / $('#start').height()
            var lines = ["1", "2", "3", "4"]
            lines.forEach(function (entry) {
                var element = $("#claim-line" + entry)
                element.css({ top: $(window).scrollTop() + percent_scrolled_out * ($('#start').height() / 2 - element.position().top),
                    'opacity': 1 - percent_scrolled_out });
            });
        }
    })


    /* start page text initial animation */
    if ($(window).scrollTop() == 0) {
        $("#claim-line1").css({ top: -600 })
        $("#claim-line1").animate({
            top: 0
        }, 1000);

        $("#claim-line2").css({ left: $(window).width() })
        $("#claim-line2").animate({
            left: 0, top: 0
        }, 1000);

        $("#claim-line3").css({ right: $(window).width() })
        $("#claim-line3").animate({
            left: 0, top: 0
        }, 1000);

        $("#claim-line4").css({ bottom: -600 })
        $("#claim-line4").animate({
            top: 0
        }, 1000);
    }



  // Setup terminal
  $('#wterm').wterm();
});



