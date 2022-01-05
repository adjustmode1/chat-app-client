import * as actions from './../constraints/groups';

export const listGroups = (groups)=>{
    return{
        type:actions.listGroups,
        groups
    }
}

export const changNameGroup = (room,name)=>{
    return{
        type:actions.changeNameGroup,
        room,name
    }
}

export const deleteGroup = (room)=>{
    return{
        type:actions.deleteGroup,
        room
    }
}

export const addGroup = (group)=>{
    return{
        type:actions.addGroup,
        group
    }
}