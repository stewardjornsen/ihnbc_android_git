// JavaScript Document
/*
 */

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {




        // app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        // console.log('Received Event: ' + id);
    }
};




$(document).ready(function (e) {
    
    
    //LOAD HEADER
    $.get('data/pages/panel.html', {}, function (html) {
        $.mobile.pageContainer.prepend(html);
        $("#mypanel").panel();
    });
    //LOAD FOOTER
    $.get('data/pages/footer.html', {}, function (html) {
        $.mobile.pageContainer.append(html);
    });
    
    data = "";

    //var json = http://localhost/rough.php;
    //$.getJSON('data/rough.php', function(r_data){

    if (navigator.onLine) {
        $('#navigator_status').html('<i class="fa fa-signal"></i> Data On');
    } else {
        $('#navigator_status').html('<i class="fa fa-plane"></i> Please turn on data to get current updates');
    }
    var j = "tall";
    $.getJSON('data/data.json', function (r_data) {
        j = "short";
        //console.log(j);
        data = r_data[0];
        localStorage.setItem('ihnbc_data', JSON.stringify(data));
        var current_event = true;
        var slider = '<div id="revolutionSlider" class="slider rev_slider" data-plugin-revolution-slider data-plugin-options=\'{"gridwidth": 1170, "sliderLayout":"fullscreen", "fullScreenOffset": "0"}\'><ul>';


        $.each(data.event, function (i, obj) {
            //console.log(obj.date);

            //GET UPCOMING EVENT

            if (eventdate(obj.date) && current_event == true) {
                $('#recent_event, #recent_event_1').hide().append('<h2 class="mb-sm">Upcoming Event: </h2><img src="data/designs/' +
                        obj.photo + '" class="img-responsive" />').fadeIn('slow');
                $('#recent_event_title').fadeIn('slow');
                current_event = false;
            }



//            $('#ihnbc_calender_box').append('<div class="feature-box"><div class="feature-box-icon"><i class="fa fa-calendar"></i></div><div class="feature-box-info"><h4 class="heading-primary mb-none">' + obj.title + ' <small> <i class="fa fa-calendar"></i> ' + obj.date + '</small></h4>\n\
//                    <!--<p class="tall">Date: ' + obj.date + ' | Time: ' + obj.time + '</p>--> \n\
//                        <a class="img-thumbnail img-thumbnail-hover-icon mb-xs mr-xs" href="data/designs/' + obj.photo + '">\n\
//                            <img class="img-responsive" src="data/designs/' + obj.photo + '" alt="' + obj.title + '" width="110" height="110">\n\
//                        </a>\n\
//                    \n\
//                    </div></div>');

            $('#ihnbc_calender_box').append('<div class="row">\n\
                                        <div class="col-xs-12">\n\
                                         <h4 class="heading-primary mb-none">\n\
                                        <a class="" href="data/designs/' + obj.photo + '">\n\
                                        ' + obj.title + '</a> </h4>\n\
                                            <small> <i class="fa fa-calendar"></i> ' + obj.date + '</small>\
                                        </div>\
                                </div><hr class="solid mt-sm mb-sm" />');

            slider += ' \n\
                        <li data-transition="fade">\n\
                        <img src="data/designs/' + obj.photo + '"  \n\
                        alt="" data-bgposition="center center"  \n\
                        data-bgfit="cover"   \n\
                        data-bgrepeat="no-repeat"   \n\
                        class="rev-slidebg"></li> \n\
                        \n\
                        ';



        });

        slider += ' </ul> </div>';

        $('#event_sliders').append(slider);
        $('#revolutionSlider').revolution({
            sliderType: "standard",
            sliderLayout: "auto",
            delay: 15000,
            navigation: {
                arrows: {enable: true}
            },
            gridwidth: 1230,
            gridheight: 720
        });

        $('.owl-carousel').owlCarousel({
            autoplay: true,
            autoplayTimeout: 10000,
            items: 1,
            loop: false,
            nav: true,
            dots: true,
            lazyload: true,
            margin: 0
        });
        $('.popup').magnificPopup({
            type: "image"
        });



    });




    function eventdate(event_date) {
        var now = new Date();
        var date = now.getDate();
        var month = now.getMonth();
        var year = now.getFullYear();
        var now_num = new Date(year, month, date);
        //console.log(now_num.toString());
        var now_time = (now_num.valueOf());

        //var event_date = "2016-07-29";
        var n_dt = event_date.split("-");
        var then = new Date(n_dt[0], n_dt[1], n_dt[2]);
        var then_num = then.valueOf();
        //console.log(then.toString());
        var then_time = (then.valueOf());

        //COMPARE DATES
        //console.log(now_time);
        //console.log(then_time);
        //console.log(then_time >= now_time);
        return (then_time >= now_time);
    }

    if (localStorage.getItem('ihnbc_data')) {
        //console.log(	$.parseJSON(localStorage.getItem('ihnbc_data')) );
    }


    $.get('data/pages/header.html', {}, function (header) {
        $('[data-role="page"]').prepend(header);
    });
    //$('.ui-content').prepend(' <div style="margin: 140px"></div>');

    // $('#people').text('Hello World');
});