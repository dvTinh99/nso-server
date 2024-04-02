import User from '../models/user.model.js'


async function getAll() {
    return User.users();
}
export {
    getAll
}