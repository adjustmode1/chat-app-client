import * as actions from './../constraints/info';
const info = {};
// {
//      gmail,
//      username,
//      address,
//      phone_number,
//      birthday,
//      sex
// }
const infoReducer = (state = info, action)=>{
    let newstate = {...state};
    switch (action.type) {
        case actions.updateInfo:
            newstate = {...action.info};
            localStorage.setItem('info',newstate);
            return newstate;
        default:
            return newstate;
    }
}

export default infoReducer;