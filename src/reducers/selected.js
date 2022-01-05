import * as actions from './../constraints/selected';
const selected = {
    room:'',
    name:'',
    isgroup:false,
    gmail:'',
    rule:'',
    member:{}
};

const selectedReducer = (state = selected,action)=>{
    let newstate;
    switch (action.type) {
        case actions.select:
            newstate = {...action.selected};
            return newstate;
        case actions.changeName:
            newstate = {... state}
            newstate.name = action.name;
            return newstate;
        case actions.setListMember:
            newstate = {...state};
            newstate.member = {}
            action.member.map((el,index)=>{
                newstate.member[el.gmail] = el;
            })
            return newstate;
        case actions.updateStatusSelected:
            newstate = {... state};
            newstate.rule = action.status;
            return newstate;
        default:
            return state;
    }
}

export default selectedReducer;