import * as actions from './../constraints/accept';
const request_friend = [];

const requestReducer = (state = request_friend,action)=>{
    let newstate;
    switch (action.type) {
        case actions.setAccept:
            newstate = [...action.listAccept];
            return newstate;
        case actions.deleteAccept:
            newstate = [...state];
            newstate.map((el,index)=>{
                if(el.gmail === action.gmail){
                    newstate.splice(index,1);
                }
            })
            return newstate;
        case actions.addAccept:
                newstate = [...state];
                newstate.push(action.user);
                return newstate;
        default:
            return state;
    }
}

export default requestReducer;