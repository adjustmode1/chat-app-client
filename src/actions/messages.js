import * as actions from './../constraints/messages';
export const listMessages = (messages)=>{
    return{
        type:actions.listMessages,
        messages
    }
}
export const addMessages = (messages)=>{
    return{
        type:actions.addMessages,
        messages
    }
}

export const updateStatusMessages = (id)=>{
    return{
        type:actions.updateStatusMessages,
        id
    }
}
