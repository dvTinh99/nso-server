import express from 'express';
let app = express();
let port = process.env.PORT || 3000;

import firebase from './firebase.js';
import { getFirestore, serverTimestamp, collection, getDoc, doc, updateDoc } from 'firebase/firestore';

app.listen(port);

const db = getFirestore();

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
        const random = doc(db, "second", "second");

        await updateDoc(random, {
            random: String(Math.floor(Math.random() * 1000000000) + 1)
        });
        
    }
    if (secs > 0) {
    timeInSecs--; 
} else {
    clearInterval(ticker);
    // startTimer(16); // 4 minutes in seconds
}

    var mins = Math.floor(secs/60);
    secs %= 60;
    var pretty = ( (mins < 10) ? "0" : "" ) + mins + ":" + ( (secs < 10) ? "0" : "" ) + secs;

    const updateSecond = doc(db, "second", "second");

    await updateDoc(updateSecond, {
        second: pretty
    });
}

// startTimer(16); // 4 minutes in seconds

// getCities();
// console.log('RESTful API server started on: ' + port);
