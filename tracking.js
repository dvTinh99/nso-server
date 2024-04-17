
import puppeteer from 'puppeteer';

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  
(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: true,

  });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://dctk.me/');
//   sleep(10000);
    let value = await page.evaluate(() => {
      let gameStart = false;
      let spinId = '';
      const URL = 'https://socket-be.netphim.site/history/';
      document.querySelector("#root > div.bg-gray-e6 > div > div > div:nth-child(2) > div.mt-3.grid.grid-cols-2.gap-8 > div:nth-child(1) > div > div > div:nth-child(3)")
          .children[1]
          .addEventListener('DOMSubtreeModified', function(e) {
      
              //status [init
              let xuThisGame = e.target;
      
              spinId = document.querySelector("#root > div.bg-gray-e6 > div > div > div:nth-child(2) > div.mt-3.grid.grid-cols-2.gap-8 > div:nth-child(1) > div > div > div:nth-child(1)")
              .children[1].children[0].innerText.slice(1);
      
              gameStart = false;
              let game = {
                  "xuThisGame" : xuThisGame.nodeValue,
                  "spinId" : spinId,
              }
              sendHttp(`${URL}create`, game)
              console.log('game init', game);
      
          })
      
      document.querySelector("#root > div.bg-gray-e6 > div > div > div:nth-child(2) > div.mt-3.grid.grid-cols-2.gap-8 > div:nth-child(1) > div > div > div:nth-child(2)")
              .children[1]
              .addEventListener('DOMSubtreeModified', function(e) {
                  let time = e.target.nodeValue;
                  if (time) {
                      [minus, second] = time.split(':');
                      
                      if (!gameStart && minus && second) {
                          spinId = document.querySelector("#root > div.bg-gray-e6 > div > div > div:nth-child(2) > div.mt-3.grid.grid-cols-2.gap-8 > div:nth-child(1) > div > div > div:nth-child(1)")
              .children[1].children[0].innerText.slice(1);
      
              let xuThisGame = document.querySelector("#root > div.bg-gray-e6 > div > div > div:nth-child(2) > div.mt-3.grid.grid-cols-2.gap-8 > div:nth-child(1) > div > div > div:nth-child(3)")
              .children[1].children[0].innerText;
                          let game = {
                              "spinId" : spinId,
                              "time" : time,
                              "xuThisGame" : xuThisGame
                          }
                          console.log('game start', game);
                          // status start
                          gameStart = true;
                          sendHttp(`${URL}start`, game)
                      }
                  }
                  
              });
      
      document.querySelector("#root > div.bg-gray-e6 > div > div > div:nth-child(2) > div.mt-3.grid.grid-cols-2.gap-8 > div:nth-child(1) > div > div > div:nth-child(6)")
          .children[1].addEventListener('DOMSubtreeModified', function(e) { 
      
              gameStart = false;
              // event end 
              let people = e.target.nodeValue
      
              let xuLastGame = document.querySelector("#root > div.bg-gray-e6 > div > div > div:nth-child(2) > div.mt-3.grid.grid-cols-2.gap-8 > div:nth-child(1) > div > div > div:nth-child(4)")
                      .children[1].childNodes[0].innerText;
      
              let rateLastgame = document.querySelector("#root > div.bg-gray-e6 > div > div > div:nth-child(2) > div.mt-3.grid.grid-cols-2.gap-8 > div:nth-child(1) > div > div > div:nth-child(5)")
                      .children[1].childNodes[0].innerText;
      
              spinId = document.querySelector("#root > div.bg-gray-e6 > div > div > div:nth-child(2) > div.mt-3.grid.grid-cols-2.gap-8 > div:nth-child(1) > div > div > div:nth-child(1)")
              .children[1].children[0].innerText.slice(1);
      
              let game = {
                  "spinId" : parseInt(spinId - 1),
                  "rate" : rateLastgame,
                  "xu" : xuLastGame,
                  "people" : people,
              }
              sendHttp(`${URL}end`, game)
              console.log('game end', game); 
          });
      
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
      
    });



    console.log('value', value);
    

//   await browser.close();
})();