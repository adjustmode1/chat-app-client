import * as actions from './../constraints/login';
import io from 'socket.io-client';
var isLogin = {
    state:false,
    socket:null
};

const loginReducer = (state = isLogin,action)=>{
    switch (action.type){
        case actions.login:
            const socket = io('http://localhost:3500',{
                auth:{
                    token:action.token
                }
            });
            return {
                state:true,
                socket
            };
        case actions.logout:
            if(state.socket != null){
                state.socket.disconnect();
            }
            return {
                state:false,
                socket:null
            };
        default:
            return state;
    }
}

export default loginReducer;