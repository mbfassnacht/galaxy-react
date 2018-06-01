export default {

    secondsToTime(secs) {
        var hours = Math.floor(secs / (60 * 60));

        var divisor_for_minutes = secs % (60 * 60);
        var minutes = Math.floor(divisor_for_minutes / 60);

        var divisor_for_seconds = divisor_for_minutes % 60;
        var seconds = Math.ceil(divisor_for_seconds);

        var obj = {
            "h": hours < 10 ? '0'+ hours : hours,
            "m": minutes < 10 ? '0'+minutes : minutes,
            "s": seconds < 10 ? '0'+seconds : seconds
        };
        return obj;
    },

    fromFormattedTimeToSeconds(formattedTime, frameRate) {

        var frameFraction = 0;

        var timesArr = formattedTime.split(':');

        if (timesArr.length === 4) {
            frameFraction = parseInt(timesArr.pop(), 10) / frameRate;

            if (isNaN(frameFraction))
            {
                return false;
            }
        }

        if (timesArr.length === 3) {
            //check length of each string and is number
            for (var i=0;i<timesArr.length;i++) {
                if (timesArr[i].length != 2) {
                    return false;//err
                }
                if(isNaN( Number(timesArr[i]) ) ){
                    return false;//err
                }
                if ( 'number' !== typeof Number(timesArr[i]) ) {
                    return false;//err
                }
            }
        } else {
            return false;
        }

        var seconds = (+timesArr[0]) * 60 * 60 + (+timesArr[1]) * 60 + (+timesArr[2]) + frameFraction;
        return seconds;
    },

    formatTimeForDom(time, frameRate) {

        var formatted = this.secondsToTime(Math.floor(time));
        var time_string = formatted.h + ':' + formatted.m + ':' + formatted.s;
        var frame_string;

        if (typeof frameRate === 'number' && frameRate >= 0) {
            frame_string = '' + Math.floor((time - Math.floor(time)) * frameRate);
            if (frame_string.length < 2) {
                frame_string = '0' + frame_string;
            }
            time_string += ':' + frame_string;
        }

        return time_string;
    }
}
