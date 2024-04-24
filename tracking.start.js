function sendHttp(url, data) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    const body = JSON.stringify(data);
    xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 201) {
        console.log(JSON.parse(xhr.responseText));
    } else {
        console.log(`Error: ${xhr.status}`);
    }
    };
    xhr.send(body);
}    
let gameStart = false;
const URL = 'https://socket-be.netphim.site/history/';
document.querySelector("#root > div.bg-gray-e6 > div > div > div:nth-child(2) > div.mt-3.grid.grid-cols-2.gap-8 > div:nth-child(1) > div > div > div:nth-child(2)")
        .children[1]
        .addEventListener('DOMSubtreeModified', function(e) {
            let time = e.target.nodeValue;
            if (time) {
                let [minus, second] = time.split(':');
                if (second != '00') {
                    if (minus == '01' || minus == "00") {
                        console.log('time', time);
    
                    }
                }
            }
            
        //     if (time) {
        //         [minus, second] = time.split(':');
                
        //         if (minus && second) {
        //             spinId = document.querySelector("#root > div.bg-gray-e6 > div > div > div:nth-child(2) > div.mt-3.grid.grid-cols-2.gap-8 > div:nth-child(1) > div > div > div:nth-child(1)")
        // .children[1].children[0].innerText.slice(1);

        // let xuThisGame = document.querySelector("#root > div.bg-gray-e6 > div > div > div:nth-child(2) > div.mt-3.grid.grid-cols-2.gap-8 > div:nth-child(1) > div > div > div:nth-child(3)")
        // .children[1].children[0].innerText;
        //             let game = {
        //                 "spinId" : spinId,
        //                 "time" : time,
        //                 "xuThisGame" : xuThisGame
        //             }
        //             console.log('game start', game);
        //             // status start
        //             // sendHttp(`${URL}start`, game)
        //         }
        //     }
            
        });