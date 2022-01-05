import React from 'react'

const ControlMessages = (props) => {
    let con = !props.rule? "chặn":"bỏ chặn";
    const change = ()=>{
        if(props.rule){
            props.socket.emit('unblock friend',{
                gmail:props.gmail
            })
        }else{
            props.socket.emit('block friend',{
                gmail:props.gmail
            })
        }
    }
    const deleteFriend = ()=>{
        props.socket.emit('delete friend',props.gmail);
    }
    const deleteAll = ()=>{
        props.socket.emit('delete all messages',props.room);
    }
    return (
        <ul className="list-group">
            <li className="list-group-item" data-toggle="modal" data-target="#rename">đổi tên gợi nhớ</li>
            <li className="list-group-item" onClick={change}>{con}</li>
            <li className="list-group-item" onClick={deleteAll}>xóa lịch sử trò chuyện</li>
            <li className="list-group-item" onClick={deleteFriend}>xóa kết bạn</li>
        </ul>
    )
}

export default ControlMessages;