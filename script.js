const breakLength = document.getElementById('break-length');
const breakLengthUp = document.getElementById('break-increment');
const breakLengthDown = document.getElementById('break-decrement');
const sessionLength = document.getElementById('session-length');
const sessionLengthUp = document.getElementById('session-increment');
const sessionLengthDown = document.getElementById('session-decrement');
const startStopBtn = document.getElementById('start_stop');
const resetBtn = document.getElementById('reset');
const timerLabel = document.getElementById('timer-label');
const timeLeft = document.getElementById('time-left');
const audio = document.getElementById('beep');

let breakValue = 5;
let sessionValue = 1;
let start = false;
let seconds = 0;
let session = true;
let minutes = sessionValue;

mouseDown(breakLengthUp, breakValueUp);
mouseDown(breakLengthDown, breakValueDown);
mouseDown(sessionLengthUp, sessionValueUp);
mouseDown(sessionLengthDown, sessionValueDown);
mouseDown(startStopBtn, startStop);
mouseDown(resetBtn, reset);

function mouseDown( element, callback ) {
    element.addEventListener('mousedown', callback);
}
function pad(digit) {
    return (digit < 10) ? '0' + digit.toString() : digit.toString();
}
function enableBtn( button, enable ) {
    button.disabled = !enable;
}
function breakValueUp() {
    breakValue++;

    if ( breakLengthDown.disabled )  {
        enableBtn( breakLengthDown, true);
    }

    if ( checkLength( breakValue ) ) {
        setBreakValueHTML( breakValue );
        if ( !session ) {
            setMinNSec( breakValue );
        }
        setTimeHTML( breakValue );
    } else {
        breakValue--;
        enableBtn( breakLengthUp, false );
    }
}
function breakValueDown() {
    breakValue--;

    if ( breakLengthUp.disabled ) {
        enableBtn( breakLengthUp, true );
    }

    if ( checkLength( breakValue ) ) {
        setBreakValueHTML( breakValue );
        if( !session ) {
            setMinNSec( breakValue );
        }
        setTimeHTML( breakValue );
    } else {
        breakValue++;
        enableBtn( breakLengthDown, false );
    }
}
function sessionValueUp() {
    sessionValue++;

    if ( sessionLengthDown.disabled ) {
        enableBtn( sessionLengthDown, true );
    }

    if ( checkLength( sessionValue ) ) {
        setSessionValueHTML( sessionValue );
        setTimeHTML( sessionValue );
        if ( session ) {
            setMinNSec( sessionValue );
        }
    } else {
        sessionValue--;
        enableBtn( sessionLengthUp, false );
    }
}
function sessionValueDown() {
    sessionValue--;

    if ( sessionLengthUp.disabled ) {
        enableBtn( sessionLengthUp, true );
    }

    if ( checkLength( sessionValue ) ) {
        setSessionValueHTML( sessionValue );
        setTimeHTML( sessionValue );
        if ( session ) {
            setMinNSec( sessionValue );
        }
    } else {
        sessionValue++;
        enableBtn( sessionLengthDown, false );
    }
}
function checkLength( value ) {
    return value > 0 && value <= 60;
}
function setBreakValueHTML( value ) {
    breakLength.innerHTML = value.toString();
}
function setSessionValueHTML( value ) {
    sessionLength.innerHTML = value.toString();
}
function setSessionLabel( value ) {
    if(value) {
        timerLabel.innerHTML = "Session";
    } else {
        timerLabel.innerHTML = "Break";
    }
}
function setTimeHTML( minutes, seconds = 0 ) {
    timeLeft.innerHTML = `${pad(minutes)}:${pad(seconds)}`;
}
function setTimerStyle( color ) {
    timerLabel.style.color = color;
    timeLeft.style.color = color;
}
function setMinNSec( minValue, secValue = 0) {
    minutes = minValue;
    seconds = secValue;
}
function enableLengthBtns( value ) {
    if ( value ) {
        enableBtn(breakLengthUp, value);
        enableBtn(breakLengthDown, value);
        enableBtn(sessionLengthUp, value);
        enableBtn(sessionLengthDown, value);
    } else {
        enableBtn(breakLengthUp, value);
        enableBtn(breakLengthDown, value);
        enableBtn(sessionLengthUp, value);
        enableBtn(sessionLengthDown, value);
    }
}
function sessionOrBreak( value ) {
    if ( value === -1 ) {
        session = !session;
        setSessionLabel( session );
        if ( session ) {
            minutes = sessionValue - 1;
        } else {
            minutes = breakValue - 1;
        }
        audio.play();
    }
}
function timer() {
    if ( start ) {

        if( seconds === 0) {

            if ( session ) {
                minutes--;
                sessionOrBreak(minutes);
            } else  {
                minutes--;
                sessionOrBreak(minutes);
            }

            seconds = 60;
        }
        seconds--;

        if ( minutes === 0 && seconds === 59 ) {
            setTimerStyle("#c0392b");
        }
        if ( minutes > 0 && seconds === 59 ) {
            setTimerStyle("inherit");
        }

        setTimeHTML( minutes, seconds );

    }
}
function startStop() {
    if ( !start ) {
        enableLengthBtns( start );
        start = true;
    } else {
        enableLengthBtns( start );
        start = false;
    }
}
function reset() {
    if (breakValue !== 5) {
        breakValue = 5;
        setBreakValueHTML(breakValue);
    }
    if (sessionValue !== 25) {
        sessionValue = 25;
        seconds = 0;
        setSessionValueHTML(sessionValue);
    }
    start = false;
    audio.pause();
    audio.currentTime = 0;
    setMinNSec( sessionValue );
    setTimeHTML( sessionValue, seconds);
    setTimerStyle("inherit");
}
function onStartup() {
    setBreakValueHTML(breakValue);
    setSessionValueHTML(sessionValue);
    setSessionLabel(true);
    setTimeHTML( sessionValue, seconds );
    setInterval( timer, 1000);
}

onStartup();
