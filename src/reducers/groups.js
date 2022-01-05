import * as actions from './../constraints/groups';
const groups = [];

const groupsReducer = (state = groups,action)=>{
    let newstate;
    switch (action.type) {
        case actions.listGroups:
            newstate = [...action.groups];
            return newstate;
        case actions.changeNameGroup:
            newstate = [... state];
            newstate.map(el=>{
                if(el.id_group === action.room){
                    el.name = action.name
                }
            })
            return newstate;
        case actions.deleteGroup:
            newstate = [... state];
            newstate.map((el,index)=>{
                if(el.id_group === action.room){
                    newstate.splice(index,1);
                }
            })
            return newstate;
        case actions.addGroup:
            newstate = [... state];
            newstate.push(action.group);
            console.log(newstate)
            return newstate;
        default:
            return state;
    }
}

export default  groupsReducer;