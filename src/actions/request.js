import * as actions from './../constraints/request';

export const setRequest = (listRequest)=>{
    return{
        type:actions.setRequest,
        listRequest
    }
}

export const deleteRequest = (gmail)=>{
    return{
        type:actions.deleteRequest,
        gmail
    }
}
export const addRequest = (user)=>{
    return{
        type:actions.addRequest,
        user
    }
}