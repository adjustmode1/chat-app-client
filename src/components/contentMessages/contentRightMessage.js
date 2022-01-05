import React from 'react';
import { connect } from 'react-redux';
import avt from './../../accsets/img/avt.png';
import Rename from './rename';
import Control from './controlmessages';
 const ContentRightMessage = (props) => {
    return (
        <div className="col-lg-3 col-md-3 col-sm-12 content-right" style={{'display':'none'}}>
            <div className="content-right__header">
                Thông tin hội thoại
            </div>
            <div className="content-right__info">
                <img src={avt} className="rounded-circle content-right__info--img"/>
                <div className="content-right__info--name">
                    {props.selected.name}
                </div>
            </div>
            <Rename gmail={props.selected.gmail} socket={props.isLogin.socket}/>
            <div className="content-right__control">
                <Control gmail={props.selected.gmail} room={props.selected.room} rule={props.selected.rule} socket={props.isLogin.socket}/>
            </div>
        </div>
    )
}

const mapProps = (state)=>{
    return{
        isLogin:state.isLogin,
        selected:state.selected
    }
}

export default connect(mapProps,null)(ContentRightMessage);