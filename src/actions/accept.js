import * as actions from './../constraints/accept';

export const setAccept = (listAccept)=>{
    return{
        type:actions.setAccept,
        listAccept
    }
}

export const deleteAccept = (gmail)=>{
    return{
        type:actions.deleteAccept,
        gmail
    }
}

export const addAccept = (user)=>{
    return{
        type:actions.addAccept,
        user
    }
}