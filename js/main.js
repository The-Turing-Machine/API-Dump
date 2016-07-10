function changeNav() {
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 100) {
            $('.navbar-toggle').css('visibility', 'visible');
            $('.navbar-fixed-top').css('background', '#fff');
        }
        if ($(window).scrollTop() < 50) {
            $('.navbar-toggle').css('visibility', 'hidden');
            $('nav').css('background', 'transparent');
        }
    });
}

function hideAddressBar() {
    if (!window.location.hash) {
        if (document.height < window.outerHeight) {
            document.body.style.height = (window.outerHeight + 50) + 'px';
        }

        setTimeout(function() { window.scrollTo(0, 1); }, 50);
    }
}

$(document).ready(function() {

    window.addEventListener("load", function() {
        if (!window.pageYOffset) { hideAddressBar(); }
    });
    window.addEventListener("orientationchange", hideAddressBar);

    changeNav();

    $('.gen').click(function() {
        if($('.text').innerHTML != '')
            $('#sign').fadeIn('slow');
    });
});
