import * as actions from './../constraints/request';
const request_friend = [];

const requestReducer = (state = request_friend,action)=>{
    let newstate;
    switch (action.type) {
        case actions.setRequest:
            newstate = [...action.listRequest];
            return newstate;
        case actions.deleteRequest:
            newstate = [...state];
            newstate.map((el,index)=>{
                if(el.gmail === action.gmail){
                    newstate.splice(index,1);
                }
            })
            console.log(newstate)
            return newstate;
        case actions.addRequest:
            newstate = [...state];
            newstate.push(action.user);
            return newstate;
        default:
            return state;
    }
}

export default requestReducer;