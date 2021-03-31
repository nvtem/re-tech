(function() {

    $('.btn-scroll-to-top').click(function() {
        slowScrollTo(0);
    });

    $('.btn-scroll-to-contacts').click(function() {
        slowScrollTo($('.section-contacts').offset().top - 80);
    });

    $('.btn-show-modal-window-2').click(function() {
        $(".modal-window-overlay").fadeIn(200);
        $('.modal-window-2').delay(150).fadeIn(200);
    });

    $('.btn-show-modal-window-3').click(function() {
        $('.feedback-form-3 .subject').val(
            $($(this).parents()[2]).find('.name').text()
        );

        $(".modal-window-overlay").fadeIn(200);
        $('.modal-window-3').delay(150).fadeIn(200);
    });

    $(".modal-window-overlay, .modal-window .close-btn, .modal-window-form-ok .btn-ok").click(function() {
        $('.modal-window').fadeOut(200);
        $(".modal-window-overlay").delay(150).fadeOut(200);
    });

    $.validate({
        borderColorOnError: "#FF1A00",
        scrollToTopOnError: false,
        validateOnBlur: false
    });

    $('.feedback-form-1').ajaxForm(function(response){
        showResponseWindow(response);
    });

    $('.feedback-form-2').ajaxForm(function(response) {
        $(".modal-window-2").fadeOut("fast");

        showResponseWindow(response);
    });

    $('.feedback-form-3').ajaxForm(function(response) {
        $(".modal-window-3").fadeOut("fast");

        showResponseWindow(response);
    });

    $('.menu a, .mobile-menu a').click(function(e) {
        if ($(this).is('.mobile-menu a')) {
            $('.mobile-menu').hide("slide", { direction: "right" }, 200);
            $('.mobile-menu-overlay').hide();
        }

        let selector = $(e.target).attr('href').replace('#', '.');
        if (selector === '.section-top-slider') {
            slowScrollTo(0);
        } else {
            let scrollTarget = $(selector);
            slowScrollTo(scrollTarget.offset().top - 80);
        }

        e.preventDefault()
    });

    $('.mobile-menu-open-btn').click(function(e) {
        $('.mobile-menu').show("slide", { direction: "right" }, 200);
        $('.mobile-menu-overlay').fadeIn(200);
        e.preventDefault();
    });

    $('.mobile-menu-overlay, .mobile-menu .close-btn').click(function(e) {
        $('.mobile-menu').hide("slide", { direction: "right" }, 200);
        $('.mobile-menu-overlay').fadeOut(200);
        e.preventDefault();
    });

    $(window).scroll(function () {
        scrollPos = $(window).scrollTop();

        showOrHideHeader();
        
        oldScrollPos = scrollPos;
    });

    //==================================================================================================================

    let scrollPos = $(window).scrollTop();
    let oldScrollPos = $(window).scrollTop();

    initDiscountTimer();

    $('.feedback-form-2 .phone').mask("+7 (999) 999-9999");
    $('.feedback-form-3 .phone').mask("+7 (999) 999-9999");

    $(".section-faq .accordion").accordion({
        collapsible: true,
        heightStyle: "content"
    });

    $('.section-top-slider').slick({
        dots: true,
        dotsClass: 'top-slider-dots',
        arrows: true,
        prevArrow: '<a href="#" class="arrow arrow-prev"></a>',
        nextArrow: '<a href="#" class="arrow arrow-next"></a>',
        autoplay: false,
        autoplaySpeed: 3000
    });

    $('.slider-testimonials-1').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: '.slider-testimonials-2'
    });

    $('.slider-testimonials-2').slick({
        arrows: false,
        asNavFor: '.slider-testimonials-1',
        slidesToShow: 3,
        slidesToScroll: 1,
        focusOnSelect: true,
        centerMode: true,
        centerPadding: 0
    });

    $(window).on('load', function() {
        $('.laptop-comparison').twentytwenty({
            no_overlay: true,
            click_to_move: true
        });

        new ScrollProgressHandler(
            [
                [0,                                                 function() { setActiveMenuItem('Главная'); }],
                [$('.section-services').offset().top,               function() { setActiveMenuItem('Услуги'); }],
                [$('.section-guarantee').offset().top,              function() { setActiveMenuItem('Гарантии'); }],
                [$('.section-hdd-repair-discount').offset().top,    function() { setActiveMenuItem('Акции'); }],
                [$('.section-counters').offset().top,               function() { setActiveMenuItem('О нас'); }],
                [$('.section-faq').offset().top,                    function() { setActiveMenuItem('FAQ'); }],
                [$('.section-some-services').offset().top,          function() { setActiveMenuItem('Оформить заявку'); }],
                [$('.section-contacts').offset().top,               function() { setActiveMenuItem('Контакты'); }],
            ],
            $(window).height() / 2
        );

        new ScrollProgressHandler([
            [0,    function() { $('.btn-scroll-to-top').fadeOut(500); } ],
            [300,  function() { $('.btn-scroll-to-top').fadeIn(500); } ]
        ], 0);

        new WOW().init();
        new WOW({
            boxClass: 'wow-counter-number',
            callback: startCounter
        }).init();
    });

    //==================================================================================================================

    function ScrollProgressHandler(waypoints, offset) {
        this.waypoints = waypoints;
        this.offset = offset;
        this.currentWaypoint = -1;

        this.handle = function() {
            let wp = -1;
            for (let i = 0; i < this.waypoints.length; i++) {
                let offset = typeof(this.offset) == 'function' ? this.offset() : this.offset;
                if (scrollPos + offset > this.waypoints[i][0])
                    wp = i;
                else
                    break;
            }

            if (wp === -1) {
                this.currentWaypoint = -1;
            } else if (wp !== this.currentWaypoint) {
                this.currentWaypoint = wp;
                this.waypoints[wp][1]();
            }
        };

        this.handle();

        let classInstance = this;
        $(window).scroll(function() {
            classInstance.handle();
        });
    }

    function getScrollDirection() {
        let dir;

        if (scrollPos > oldScrollPos)
            dir = 'DOWN';
        else if (scrollPos < oldScrollPos)
            dir = 'UP';
        else if (scrollPos === oldScrollPos)
            dir = '-';

        return dir;
    }

    function slowScrollTo(pos) {
        $('html, body').stop(true, false).animate({
            scrollTop: pos}, 500
        );
    }

    function setActiveMenuItem(item) {
        $('.menu a, .mobile-menu a').removeClass('active');
        $(".menu a:contains(" + item + "), .mobile-menu a:contains(" + item + ")").addClass('active');
    }

    function showResponseWindow(response) {
        let msg = (response === 'OK') ?
            'Заявка отправлена! Мы свяжемся с Вами в ближайшее время.' :
            'Ошибка! Проверьте правильность заполнения полей.';

        $('.modal-window-form-ok .msg').text(msg);
        $(".modal-window-overlay").fadeIn(200);
        $('.modal-window-form-ok').delay(200).fadeIn(200);
    }

    function startCounter(elem) {
        let endVal = elem.attributes['data-counter-endval'].value;
        const options = {
            separator: '',
            duration: 3
        };
        (new CountUp(elem, endVal, options)).start();
    }

    function initDiscountTimer () {
        // необходимо задать одну из констант
        // если задана END_TIME, таймер истекает в заданное время
        // если задана DURATION, таймер стартует в момент первого посещения сайта и истекает через заданное количество секунд

        //const END_TIME = Date.parse('30 Sep 2019') / 1000;
        const DURATION = 72 * 3600;

        let currentTime = Math.floor(Date.now() / 1000);

        if (typeof (END_TIME) !== 'undefined')
            localStorage.discountTimerEndTime = END_TIME;
        else if (!localStorage.discountTimerEndTime)
            localStorage.discountTimerEndTime = currentTime + DURATION;

        let remainingTime = localStorage.discountTimerEndTime - currentTime;

        let hours = Math.floor(remainingTime / 3600);
        let minutes = Math.floor((remainingTime % 3600) / 60);
        let seconds = remainingTime % 60;

        let timer = new easytimer.Timer();
        timer.start({countdown: true, startValues: {hours: hours, minutes: minutes, seconds: seconds}});
        timer.addEventListener('secondsUpdated', function () {
            $('.section-hdd-repair-discount .timer .seconds').html(((timer.getTimeValues().seconds < 10) ? '0' : '') + timer.getTimeValues().seconds);
            $('.section-hdd-repair-discount .timer .minutes').html(((timer.getTimeValues().minutes < 10) ? '0' : '') + timer.getTimeValues().minutes);
            $('.section-hdd-repair-discount .timer .hours').html(((timer.getTimeValues().hours < 10) ? '0' : '') + timer.getTimeValues().hours);
            $('.section-hdd-repair-discount .timer .days').html(((timer.getTimeValues().days < 10) ? '0' : '') + timer.getTimeValues().days);
        });
    }

    function showOrHideHeader() {
        let dir = getScrollDirection();

        if (dir === 'DOWN' && scrollPos > 60 && !$('.header').hasClass('header-sticky'))
            $('.header').addClass('header-sticky');
        else if (dir === 'UP' && $('.header').hasClass('header-sticky'))
            $('.header').removeClass('header-sticky');

        oldScrollPos = scrollPos;
    }

}());