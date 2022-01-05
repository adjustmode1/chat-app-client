import * as actions from './../constraints/login';


export const Loggin = (token)=>{
    return {
        type: actions.login,
        token
    }
}

export const Logout = ()=>{
    return {
        type: actions.logout,
        token:null
    }
}