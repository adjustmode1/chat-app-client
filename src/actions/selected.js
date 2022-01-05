import * as actions from './../constraints/selected';

export const select = (selected)=>{
    return{
        type:actions.select,
        selected
    }
}

export const changeName = (room,name) =>{
    return{
        type:actions.changeName,
        room,name
    }
}

export const setListMember = (member)=>{
    return{
        type:actions.setListMember,
        member
    }
}
export const updateStatusSelected = (gmail,status)=>{
    return{
        type:actions.updateStatusSelected,
        gmail,status
    }
}