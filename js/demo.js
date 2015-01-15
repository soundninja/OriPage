$(document).ready(function () {
    $(".phone").css('display', 'none');
    $("#retry").css('display', 'none');

    var tracking = false;

    function toggleTrack() {
        if (tracking) {
            stopTacking();
        } else {
            trackMouse();
        }
    }

    function trackMouse() {
        tracking = true;
        $("#outer").mousemove(function (event) {

            var parentOffset = $("#outer").offset();
            var relX = event.pageX - parentOffset.left;
            var relY = event.pageY - parentOffset.top;

            var phone = $(".phone");

            relX = relX - (phone.width() / 2);
            relY = relY - (phone.height() / 2);

            phone.css("left", relX + 'px');
            phone.css("top", relY + 'px');
        });
    }

    function stopTracking() {
        tracking = false;
        $("#outer").off('mousemove');
    }


    var things = {
        thing1: {
            url: "url(/img/demo/taraholdall.png)",
            price: 200
        },
        thing2: {
            url: "url(/img/demo/saffianosatchel.png)",
            price: 200
        },
        thing3: {
            url: "url(/img/demo/wovencrossbody.png)",
            price: 200
        },
        thing4: {
            url: "url(/img/demo/classicleather.png)",
            price: 200
        },
        thing5: {
            url: "url(/img/demo/redlace.png)",
            price: 200
        },
        thing6: {
            url: "url(/img/demo/blacklace.png)",
            price: 200
        },
        thing7: {
            url: "url(/img/demo/plungeV.png)",
            price: 200
        },
        thing8: {
            url: "url(/img/demo/whitecutout.png)",
            price: 200
        }
    }
    for (var key in things) {
        $("#" + key).data("image", things[key].url);
        $("#" + key).data("price", things[key].price);
    }

    $("#outer").mouseenter(function () {
        $('#explain').fadeIn('fast', 0);
        $(".phone").css('margin-left', 0);
        $("#outer").css("cursor", "crosshair");
        $('.things').removeAttr('disabled');
        $(".phone").fadeIn('fast', 0);
        $("#retry").fadeOut('fast', 0);
        trackMouse();
    });


    $("#outer").mouseleave(function () {
        $('.phone').fadeOut('fast', 0);
        $('.phone').find('.screen').css('background', '');
        $("#retry").fadeOut('fast', 0);
    });

    $(".things").click(function (event) {
        if ($('.things').attr('disabled') == "disabled") {
            return false;
        }

        stopTracking();
        $("#outer").css("cursor", "default");
        $('#explain').fadeOut('fast', 0);

        var phone = $(".phone");
        var id = $(this);

        phone.animate({
            top: '18%',
            left: '50%',
            marginLeft: '-90px'
        }, 600);
        phone.find('.screen').css('background', $(this).data("image") + "center center no-repeat");
        $('.things').attr('disabled', 'disabled');
        $("#retry").fadeIn('fast', 0);
        event.stopPropagation();

        $("#outer").click(function (event) {
            phone.css('margin-left',0);
            $('.things').removeAttr('disabled');
            $('#explain').fadeIn('fast', 0);
            $("#outer").css("cursor", "crosshair");
            phone.find('.screen').css('background', '');
            $("#retry").fadeOut('fast', 0);
            trackMouse();
        })
    });

    //    $("#thing1").click(function (event) {
    //        stopTracking();
    //        $("#outer").css("cursor", "default");
    //
    //        var phone = $(".phone");
    //        phone.animate({
    //            top: '18%',
    //            left: '50%'
    //        }, 600);
    //        phone.addClass('hit');
    //        phone.find('.screen').css('background', 'url(/img/demo/taraholdall.png) center center no-repeat');
    //        event.stopPropagation();
    //
    //        $("#outer").click(function (event) {
    //            phone.removeClass('hit');
    //            phone.find('.screen').css('background', '');
    //            trackMouse();
    //        })
    //    });
    $("#outer").on('click', '.phone:not(.hit)', function (event) {
        $(".screen").html("<p class ='miss'>Try Again</p>");
        $("p.miss").addClass("missed");
        setTimeout(function () {
            $("p.miss").remove();
            $("p.miss").removeClass("missed");
        }, 600);
    });
});