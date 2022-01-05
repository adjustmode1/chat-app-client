import React from 'react';
import avt from './../../accsets/img/avt.png';

const Message = (props) => {
    let cls = props.me? "message me":"message";
    let name = props.me? "":props.name;
    let data = props.status? props.data:"Tin nhắn đã bị thu hồi";
    const cancelMess = ()=>{
        props.socket.emit('cancel messages',{id_mess:props.id_mess,room:props.room});
    }

    let overflow = props.me&&props.status? <div className="overflow">
                <span title="thu hồi" style={{'cursor':'pointer'}} onClick={cancelMess}><i className="fas fa-times-circle"></i></span>
            </div>:"";
    return (
        <div className={cls}>
            <img className="rounded-circle" src={avt} alt=""/>
            <div className="box">
                <div className="data">
                    <div className="name">{name}</div>
                    <div className="mess">{data}</div>
                    <div className="time">{props.time}</div>
                </div>
            </div>
            {overflow}
        </div>
    )
}

export default Message;
