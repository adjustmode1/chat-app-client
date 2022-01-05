import * as actions from '../constraints/texting';

const messages = [];
// {
//     id_group,
//     gmail,
//     name,
//     rule
// }
const messagesReducer = (state = messages,action)=>{
    let newstate;
    switch (action.type) {
        case actions.listTexting:
            newstate = [...action.messages];
            return newstate;
        case actions.addListTexting:
            newstate = [... state];
            action.messages.map((el,index)=>{
                newstate.push(el);
            })
            return newstate;
        case actions.addTexting:
            newstate = [... state];
            newstate.push(action.messages);
            return newstate;
        case actions.updateNameTexting:
            newstate = [... state];
            newstate.map((el,index)=>{
                if(el.id_group === action.room){
                    el.name = action.name;
                }
            })
            return newstate;
        case actions.deleteTexting:
            newstate = [...state];
            newstate.map((el,index)=>{
                if(el.gmail === action.gmail){
                    newstate.splice(index,1);
                }
            })
            return newstate;
        case actions.deleteGroupTexting:
            console.log('đang xóa')
            newstate = [...state];
            newstate.map((el,index)=>{
                if(el.id_group === action.room){
                    newstate.splice(index,1);
                }
            })
            return newstate;
        case actions.updateStatusTexting:
                newstate = [... state];
                newstate.map(el=>{
                    if(el.gmail === action.gmail){
                        el.rule = action.status;
                    }
                })
                return newstate;
        default:
            return state;
    }
}

export default messagesReducer;