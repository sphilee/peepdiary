/**
 * Created by donghyukpark on 2017. 5. 3..
 */

function detectswipe(el, func) {
    swipe_det = new Object();
    swipe_det.sX = 0;
    swipe_det.sY = 0;
    swipe_det.eX = 0;
    swipe_det.eY = 0;
    var min_x = 30;  //min x swipe for horizontal swipe
    var max_x = 30;  //max x difference for vertical swipe
    var min_y = 50;  //min y swipe for vertical swipe
    var max_y = 60;  //max y difference for horizontal swipe
    var direc = "";
    ele = document.getElementById(el);
    ele.addEventListener('touchstart', function (e) {
        var t = e.touches[0];
        swipe_det.sX = t.screenX;
        swipe_det.sY = t.screenY;
    }, false);
    ele.addEventListener('touchmove', function (e) {
        e.preventDefault();
        var t = e.touches[0];
        swipe_det.eX = t.screenX;
        swipe_det.eY = t.screenY;
    }, false);
    ele.addEventListener('touchend', function (e) {
        //horizontal detection
        if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y) && (swipe_det.eX > 0)))) {
            if (swipe_det.eX > swipe_det.sX) direc = "r";
            else direc = "l";
        }
        //vertical detection
        else if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x) && (swipe_det.eY > 0)))) {
            if (swipe_det.eY > swipe_det.sY) direc = "d";
            else direc = "u";
        }

        if (direc != "") {
            if (typeof func == 'function') func(el, direc);
        }
        direc = "";
        swipe_det.sX = 0;
        swipe_det.sY = 0;
        swipe_det.eX = 0;
        swipe_det.eY = 0;
    }, false);
}

function myfunction(el, d) {
    if(d=='l'){
        $('#calendar').fullCalendar('next');
    }
    else if(d=='r'){
    $('#calendar').fullCalendar('prev');
    }
}

$(document).ready(function () {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    /*  className colors

     className: default(transparent), important(red), chill(pink), success(green), info(blue)

     */


    /* initialize the external events
     -----------------------------------------------------------------*/

    $('#external-events div.external-event').each(function () {

        // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
        // it doesn't need to have a start or end
        var eventObject = {
            title: $.trim($(this).text()) // use the element's text as the event title
        };

        // store the Event Object in the DOM element so we can get to it later
        $(this).data('eventObject', eventObject);

        // make the event draggable using jQuery UI
        $(this).draggable({
            zIndex: 999,
            revert: true,      // will cause the event to go back to its
            revertDuration: 0  //  original position after the drag
        });

    });


    /* initialize the calendar
     -----------------------------------------------------------------*/
    var heightA = $('#contents').height() - $(".div_list_head").height() - $(".ul_list_tab").height();

    var calendar = $('#calendar').fullCalendar({
            header: {
                left: 'title',
                right: 'prev,next today'
            },
            height: heightA,
            editable: true,
            firstDay: 0, //  1(Monday) this can be changed to 0(Sunday) for the USA system
            selectable: true,
            defaultView: 'month',

            axisFormat: 'h:mm',
            columnFormat: {
                month: 'ddd',    // Mon
                week: 'ddd d', // Mon 7
                day: 'dddd M/d',  // Monday 9/7
                agendaDay: 'dddd d'
            },
            titleFormat: {
                month: 'MMMM yyyy', // September 2009
                week: "MMMM yyyy", // September 2009
                day: 'MMMM yyyy'                  // Tuesday, Sep 8, 2009
            },
            allDaySlot: false,
            selectHelper: true,
            select: function (start, end, allDay) {
                // Get the modal
                var subDate = Math.ceil((start.getTime() - date.getTime()) / 86400000);
                var subDateName;
                var dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
                if (subDate < -1)
                    subDateName = Math.abs(subDate) + "일 전";
                else if (subDate == -1)
                    subDateName = "어제";
                else if (subDate == 1)
                    subDateName = "내일";
                else if (subDate == 0)
                    subDateName = "오늘";
                else
                    subDateName = subDate + "일 후";

                $('#p_modal_date').text(start.getFullYear() + "." + (start.getMonth() + 1) + "." + start.getDate() + " " + dayNames[start.getDay()] + " / " + subDateName);
                $('#myModal').modal("show");
            },
            droppable: true, // this allows things to be dropped onto the calendar !!!
            drop: function (date, allDay) { // this function is called when something is dropped

                // retrieve the dropped element's stored Event Object
                var originalEventObject = $(this).data('eventObject');

                // we need to copy it, so that multiple events don't have a reference to the same object
                var copiedEventObject = $.extend({}, originalEventObject);

                // assign it the date that was reported
                copiedEventObject.start = date;
                copiedEventObject.allDay = allDay;

                // render the event on the calendar
                // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

                // is the "remove after drop" checkbox checked?
                if ($('#drop-remove').is(':checked')) {
                    // if so, remove the element from the "Draggable Events" list
                    $(this).remove();
                }

            },

        })
    ;
    detectswipe('calendar', myfunction);
});