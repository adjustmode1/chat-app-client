import React from 'react';
import avt from './../../accsets/img/avt.png';
import {connect} from 'react-redux';

const SelectorRequest = (props) => {
    const cancel = ()=>{
        if(props.isLogin.socket){
            let socket = props.isLogin.socket;
            let gmail = props.gmail;
            socket.emit('cancel request add friend',gmail);
        }
    }
    return (
        <div className="selector request">
            <div className="content">
                <img src={avt} alt="" className="rounded-circle"/>
                <span>{props.name}</span>      
            </div>          
            <div className="control">
                <button type="button" className="btn btn-danger" onClick={cancel}>Hủy</button>
            </div>
        </div>   
    )
}

const mapProps = (state)=>{
    return{
        isLogin:state.isLogin
    }
}

export default connect(mapProps)(SelectorRequest);