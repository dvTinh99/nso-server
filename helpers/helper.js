import history from '../models/history.model.js'
import GAME from '../models/game.model.js'
import User from '../models/user.model.js';
const CDResult = ["C", "Đ", "C", "Đ", "C", "Đ", "C", "Đ", "C", "Đ"];
const TKResult = ["K", "K", "K", "K", "K", "T", "T", "T", "T", "T"];
const UQResult = ["U", "", "U", "", "U", "Q", "", "Q", "", "Q"];

const STATUS_WIN = 2;
const STATUS_LOST = 1;
var lastNumber;

const win = async (spinId) => {
    let result = await history.findBySpinCode(spinId);

    
    lastNumber = result[0].result;

    if (result.length < 1) { 
        console.log('toang');
    }

    let usersWin = await GAME.findBySpinCode(spinId);

    for await (let game of usersWin) {
        let flagWin = false;
        
        let userUpdate = await User.find(game.user_id);
        userUpdate = userUpdate [0];
        if (CDResult[lastNumber] === game.bet) {

            let param = {
                xu : userUpdate.xu += (game.xu * 1.96)
            }

            User.update(param, game.user_id);
            flagWin = true;
            
        } else if (TKResult[lastNumber] === game.bet) {
            let param = {
                xu : userUpdate.xu += (game.xu * 1.96)
            }

            User.update(param, game.user_id);
            flagWin = true;
        } else if (UQResult[lastNumber] === game.bet) {
            let param = {
                xu : userUpdate.xu += (game.xu * 2.96)
            }

            User.update(param, game.user_id);
            flagWin = true;
        } else if (lastNumber == game.bet) {
            let param = {
                xu : userUpdate.xu += (game.xu * 6)
            }

            User.update(param, game.user_id);
            flagWin = true;
        }

        if (flagWin == true) {
            let param = {
                status : STATUS_WIN
            }
            GAME.update(param, game.id);
        } else {
            let param = {
                status : STATUS_LOST
            }
            GAME.update(param, game.id);
        }

    }

}

export {
    win,
}