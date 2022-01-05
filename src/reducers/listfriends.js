import * as actions from '../constraints/friends';
const friends = [];
// {
//     owner,
//     gmail,
//     name,
//     rule,
//     id_group
// }
const friendsReducer = (state = friends,action)=>{
    let newstate;
    switch (action.type) {
        case actions.listFriend:
            newstate = [...action.listfriend]
            return newstate;
        case actions.addFriend:
            newstate = [...state];
            newstate.push(action.friend)
            return newstate;
        case actions.deleteFriend:
            newstate = [...state];
            newstate.map((el,index)=>{
                if(el.gmail === action.gmail){
                    newstate.splice(index,1);
                }
            })
            return newstate;    
        case actions.chaneNameFriend:
            newstate = [... state];
            newstate.map((el,index)=>{
                if(el.id_group === action.room){
                    el.name = action.name;
                }
            })
            return newstate;
        case actions.updateStatusFriend:
            newstate = [... state];
            newstate.map((el,index)=>{
                if(el.gmail === action.gmail){
                    el.rule = action.status;
                }
            })
            return newstate;
        default:
            return state;
    }
}

export default friendsReducer;