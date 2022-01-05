import * as actions from './../constraints/messages';
const messages = [];

const messagesReducer = (state=messages,action)=>{
    let newstate;
    switch (action.type) {
        case actions.listMessages:
            newstate = [... action.messages];
            return newstate;
        case actions.addMessages:
            newstate = [...state, action.messages];
            return newstate;
        case actions.updateStatusMessages:
            newstate = [...state];
            newstate.map(el=>{
                if(el.id_mess===action.id){
                    el.status = false;
                }
            })
            return newstate;
        default:
            return state;
    }
}

export default messagesReducer;