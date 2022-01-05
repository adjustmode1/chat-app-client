import * as actions from './../constraints/friends';

export const listFriend = (listfriend)=>{
    return{
        type:actions.listFriend,
        listfriend
    }
}

export const changNameFriend = (room,name)=>{
    return{
        type:actions.chaneNameFriend,
        room,name
    }
}

export const addFriend = (friend)=>{
    return{
        type:actions.addFriend,
        friend
    }
}

export const deleteFriend= (gmail)=>{
    return{
        type:actions.deleteFriend,
        gmail
    }
}

export const updateStatusFriend = (gmail,status)=>{
    return{
        type:actions.updateStatusFriend,
        gmail,status
    }
}