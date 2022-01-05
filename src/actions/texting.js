import * as actions from '../constraints/texting';

export const listTexting = (messages)=>{
    return{
        type:actions.listTexting,
        messages
    }
}
export const addListTexting = (messages)=>{
    return{
        type:actions.addListTexting,
        messages
    }
}

export const addTexting = (messages)=>{
    return{
        type:actions.addTexting,
        messages
    }
}

export const updateNameTexting = (room,name)=>{
    return{
        type:actions.updateNameTexting,
        room,name
    }
}

export const deleteTexting = (gmail)=>{
    return{
        type:actions.deleteTexting,
        gmail
    }
}

export const deleteGroupTexting = (room)=>{
    return{
        type:actions.deleteTexting,
        room
    }
}

export const updateStatusTexting = (gmail,status)=>{
    return{
        type:actions.updateStatusTexting,
        gmail,status
    }
}