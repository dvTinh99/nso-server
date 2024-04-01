import User from '../models/user.model.js'


async function getAll() {
    return new Promise((resolve, reject) => {
        User.users(function (err, result, fields) {
            if (err) reject(err);
            // console.log(JSON.stringify(result));
            resolve(JSON.stringify(result));
        });
    });
}
export {
    getAll
}