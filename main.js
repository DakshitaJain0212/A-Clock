// switching to stopwatch and timer

$(".back-btn").click(function(){
    // hide all other wrappers
    $(".outer-wrapper > div").slideUp();
    // show clock wrapper
    $(".clock").slideDown();
    // update type text
    $(".type").html("Clock");
});

$(".stopwatch-btn").click(function(){
    // hide all other wrappers
    $(".outer-wrapper > div").slideUp();
    // show stopwatch wrapper
    $(".stopwatch").slideDown();
    // update type text
    $(".type").html("Stopwatch");
});

$(".timer-btn").click(function(){
    // hide all other wrappers
    $(".outer-wrapper > div").slideUp();
    // show timer wrapper
    $(".timer").slideDown();
    // update type text
    $(".type").html("Timer");
});
// Clock

const addTrallingZeros = (nums) =>{
    return nums < 10 ? "0"+ nums : nums ; 
}
const updateTime = () =>{
    const time = new Date;
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let ampm = hours >= 12 ? "PM" : "AM";
    let otherampm = hours>= 12 ? "PM" : "AM";

//converting 24 hours into 12 
hours = hours % 12 || 12 ; 

//add trailling zeroes if less than 10 
hours = addTrallingZeros(hours);
minutes = addTrallingZeros(minutes);
seconds = addTrallingZeros(seconds);

$("#hour").html(hours);
$("#min").html(minutes);
$("#sec").html(seconds);
$("#ampm").html(ampm);
$(".other-ampm").html(otherampm);
}

// call the function on page load
updateTime();

// call function after every seconds (to run the second) 
setInterval(updateTime, 1000);





// StopWatch

let stopwatchHours = 0,
    stopwatchMinutes = 0,
    stopwatchSeconds = 0,
    stopwatchMiliseconds = 0,
    stopwatchRunning = false,
    laps = 0,
    stopwatchInterval;
    
const stopwatch = ()=>{
    // increse miliseconds by one
    stopwatchMiliseconds++;

    if(stopwatchMiliseconds === 100){
        // if stopwatch miliseconds equals to 100 increse one second and set milisecond as 0
        stopwatchSeconds++;
        stopwatchMiliseconds = 0 ;
    }

    if(stopwatchSeconds === 60){
        // same with minutes
        stopwatchMinutes++;
        stopwatchSeconds = 0;
    }

    if(stopwatchMinutes === 60){
        // same with hours
        stopwatchHours++;
        stopwatchMinutes = 0;
    }

    // show the value on document
$("#stopwatch-hour").html(addTrallingZeros(stopwatchHours));
$("#stopwatch-min").html(addTrallingZeros(stopwatchMinutes));
$("#stopwatch-sec").html(addTrallingZeros(stopwatchSeconds));
$("#stopwatch-ms").html(addTrallingZeros(stopwatchMiliseconds));
}

// function to start stopwatch
const startStopwatch = () =>{
    if(!stopwatchRunning){
        // if stopwatch not already running
        stopwatchInterval = setInterval(stopwatch, 10);
        stopwatchRunning = true;
    }
}

const stopStopwatch = () =>{
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
}

// reset stopwatch function
const resetStopwatch = () =>{
    // clear  interval and set all values to default
    clearInterval(stopwatchInterval);
    stopwatchHours = 0;
    stopwatchMinutes = 0;
    stopwatchSeconds = 0;
    stopwatchMiliseconds = 0;
    stopwatchRunning = false;
    laps = 0;

    // update values on document to 0
    $("#stopwatch-hour").html("00");
    $("#stopwatch-min").html("00");
    $("#stopwatch-sec").html("00");
    $("#stopwatch-ms").html("00");
    $(".laps").html("");
}

// start stopwatch by start button
$(".start-stopwatch").click(function(){
    startStopwatch();

    // hide start button and show lap button
$(".start-stopwatch").hide();
$(".lap-stopwatch").show();
});

$(".reset-stopwatch").click(function(){
    resetStopwatch();

    $(".start-stopwatch").show();
    $(".lap-stopwatch").hide();
});

$(".lap-stopwatch").click(function(){
    // on lap button click
    laps++;
    // remove active class
    $(".lap").removeClass("active");
    $(".laps").prepend(
        `<div class = "lap active">
        <p>lap ${laps}</p>
        <p>
        ${addTrallingZeros(stopwatchHours)} : ${addTrallingZeros(stopwatchMinutes)} : ${addTrallingZeros(stopwatchSeconds)} : ${addTrallingZeros(stopwatchMiliseconds)}`
    );

});






// Timer

let time = 0,
    timerHours = 0,
    timerMinutes = 0,
    timerSeconds = 0,
    timerMiliseconds = 0,
    timerInterval;

const getTime = () => {
    time = prompt("Enter time in minutes");
    // convert time to seconds
    time = time * 60;
// update time default
setTime();
}

const setTime = () =>{

timerHours = Math.floor(time / 3600);
timerMinutes = Math.floor((time % 3600) / 60);
timerSeconds = Math.floor(time % 60);

// show user entered time on document 
$("#timer-hour").html(addTrallingZeros(timerHours));
$("#timer-min").html(addTrallingZeros(timerMinutes));
$("#timer-sec").html(addTrallingZeros(timerSeconds));
$("#timer-ms").html(addTrallingZeros(timerMiliseconds));
}

const timer = () => {
    timerMiliseconds--;
    if(timerMiliseconds === -1){
        timerMiliseconds = 99;
        timerSeconds--;
    }
    if(timerSeconds === -1){
        timerSeconds = 59;
        timerMinutes--;
    }
    if(timerMinutes === -1){
        timerMinutes = 59;
        timerHours--;
    }

// update time
$("#timer-hour").html(addTrallingZeros(timerHours));
$("#timer-min").html(addTrallingZeros(timerMinutes));
$("#timer-sec").html(addTrallingZeros(timerSeconds));
$("#timer-ms").html(addTrallingZeros(timerMiliseconds));

// check time up on every interval
timeUp();
}

const startTimer = () => {
    // before starting check if valid time given
    if((timerHours === 0) && (timerMinutes === 0) && (timerSeconds === 0) && (timerMiliseconds === 0)){
        // if values are zeros then get time
        getTime();
    }else{
        // start timer
        timerInterval = setInterval(timer , 10);
        $(".start-timer").hide();
        $(".stop-timer").show();
    }
}

const stopTimer = () =>{
    clearInterval(timerInterval);
    $(".start-timer").show();
    $(".stop-timer").hide();
}

const timeupTimer = () =>{
    stopTimer();
    time = 0;
    setTime();
}
const timeUp = () =>{
    if(timerHours===0 && timerMinutes===0 && timerSeconds===0 &&timerMiliseconds=== 0){
        timeupTimer();
        alert("Time's Up");
    }
}

const resetTimer = () =>{
    stopTimer();
    time = 0;
    timerHours = 0;
    timerMinutes = 0;
    timerSeconds = 0;
    timerMiliseconds = 0;

    // update values on document to 0
    $("#timer-hour").html("00");
    $("#timer-min").html("00");
    $("#timer-sec").html("00");
    $("#timer-ms").html("00");
}

$(".start-timer").click(function(){
    startTimer();
});

$(".stop-timer").click(function(){
    stopTimer();
});

$(".reset-timer").click(function(){
    resetTimer();
});

