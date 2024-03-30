import express from 'express';
let app = express();
let port = process.env.PORT || 3000;


app.listen(port);

// setInterval(countDown, 1000);
var timeInSecs = 120;
var ticker;

function startTimer(secs) {

    
    timeInSecs = parseInt(secs);
    ticker = setInterval(tick, 1000); 
}

async function tick( ) {
    var secs = timeInSecs;
    if (secs == 15) {
        
    }
    if (secs > 0) {
    timeInSecs--; 
} else {
    clearInterval(ticker);
    startTimer(16); // 4 minutes in seconds
}

    var mins = Math.floor(secs/60);
    secs %= 60;
    var pretty = ( (mins < 10) ? "0" : "" ) + mins + ":" + ( (secs < 10) ? "0" : "" ) + secs;

    const updateSecond = doc(db, "second", "second");

}

// export default startTimer;
// startTimer(16); // 4 minutes in seconds

// getCities();
// console.log('RESTful API server started on: ' + port);
