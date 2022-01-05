import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import avt from './../../accsets/img/avt.png';

const SelectorAddFriend = (props) => {
    const [rule,setRule] = useState(-1);
    const accept = ()=>{
        if(props.isLogin.socket){
            let socket = props.isLogin.socket;
            let gmail = props.friend.owner;
            socket.emit('accept add friend',gmail);
            setRule(-1);
        }
    }
    const request = ()=>{
        if(props.isLogin.socket){
            let socket = props.isLogin.socket;
            let gmail = props.friend.gmail;
            socket.emit('request add friend',gmail);
            setRule(3);
        }
    }
    useEffect(()=>{
        setRule(props.rule);
    },[props.rule])
    switch (rule) {
        case 0:
            return (
                <div className="selector addfriend">
                    <div className="content">
                        <img src={avt} alt="" className="rounded-circle"/>
                        <span>{props.friend.name}</span>      
                    </div>          
                    <div className="control">
                        <button type="button" className="btn btn-success" onClick={request}>Gửi</button>
                    </div>
                </div>  
            )
        case 1:
           return (
            <div className="selector addfriend">
                <div className="content">
                    <img src={avt} alt="" className="rounded-circle"/>
                    <span>{props.friend.name}</span>      
                </div>          
                <div className="control">
                <div className="show" >Đã Kết bạn</div>
                </div>
            </div>  
           );
        case 2:
            return (
                <div className="selector addfriend">
                <div className="content">
                    <img src={avt} alt="" className="rounded-circle"/>
                    <span>{props.friend.name}</span>      
                </div>          
                <div className="control">
                    <button type="button" className="btn btn-success" onClick={accept}>Đồng ý</button>
                </div>
            </div>            
            );
        case 3:
            return (
                <div className="selector addfriend">
                    <div className="content">
                        <img src={avt} alt="" className="rounded-circle"/>
                        <span>{props.friend.name}</span>      
                    </div>          
                    <div className="control">
                        <div className="show" >Đang yêu cầu</div>
                    </div>
                </div>   
            );
        default:
            return <div>Không tìm thấy</div>;
    }
}

SelectorAddFriend.defaultProps = {
    rule:0,
    friend:{
        name:''
    }
}

const mapProps = (state)=>{
    return{
        isLogin:state.isLogin
    }
}
export default connect(mapProps,null)(SelectorAddFriend);