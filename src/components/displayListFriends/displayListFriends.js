import React,{useState} from 'react';
import { connect } from 'react-redux';
import AddFriend from './addfriend';
import ShowList from './showlist';
import './displayListFriends.scss';
import $ from 'jquery';
const DisplayListFriends = (props) => {
    const [status,setStatus] = useState(0);
    const changeList = (st)=>{
        switch (st) {
            case 1:
                $('span.name_list').text("Danh sách đen");
                setStatus(1);
                break;
            case 2:
                $('span.name_list').text("Yêu cầu kết bạn");
                setStatus(2);
                break;
            case 3:
                $('span.name_list').text("Lời mời kết bạn");
                setStatus(3);
                break;
            default:
                $('span.name_list').text("Danh sách bạn");
                setStatus(0);
                break;
        }
    }
    return (
        <div>
            <div className="group-input">
                <button className="search-btn"><i className="fas fa-search" ></i></button>
                    <input type="text" placeholder="tìm kiếm"/>
            </div>

            <div className="header">
                <div className="tag" onClick={()=>{
                    changeList(1)
                }}>
                    <i className="fas fa-users" style={{'backgroundColor': 'black'}}></i> Danh sách đen
                </div>
                <div className="tag" onClick={
                    ()=>{changeList(0)}
                }>
                    <i className="fas fa-users" style={{'backgroundColor': 'purple'}}></i> Danh sách bạn
                </div>
                <div className="tag" onClick={
                    ()=>{changeList(2)}
                }>
                    <i className="fas fa-users" style={{'backgroundColor': 'green'}}></i> Yêu cầu kết bạn
                </div>
                <div className="tag" onClick={
                    ()=>{changeList(3)}
                }>
                    <i className="fas fa-users" style={{'backgroundColor': 'blue'}}></i> Lời mời kết bạn
                </div>
            </div>    
            <div className="body">
                <span style={{'float':'left'}} className="name_list" >Danh sách bạn</span>
                <i className="fas fa-user-plus" data-toggle="modal" data-target="#addfriend"></i>
                <AddFriend socket={props.isLogin.socket}/>
            </div>
            <ShowList status={status}/>
        </div>
    )
}
const mapProps = (state)=>{
    return{
        isLogin:state.isLogin
    }
}

export default connect(mapProps,null)(DisplayListFriends);