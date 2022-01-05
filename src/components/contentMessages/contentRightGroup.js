import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import TagMember from './tagmember';
import RenameGroup from './renameGroup';
import AddMember from './addmember';
import avt from './../../accsets/img/avt.png';
import * as selectedActions from './../../actions/selected';
const ContentRightGroup = (props) => {
    useEffect(()=>{
            let socket = props.isLogin.socket;
            socket.emit('list member',props.selected.room);
    },[])
    useEffect(()=>{
        let socket = props.isLogin.socket;
        socket.on('server list member', (data)=>{
            props.setListMember(data);
        })
        socket.on('server add member',data=>{
            if(data!=''&&data!='error'){
                socket.emit('list member',props.selected.room);
            }
        })
        props.isLogin.socket.on('server leave group',(data)=>{
            if(data!=""&&data!='error'){
                socket.emit('list member',props.selected.room);
            }
        })
        socket.on('server kick out group',data=>{
            if(data!=''&&data!='error'){
                socket.emit('list member',props.selected.room);
            }
        })
        socket.on('server grant permission',data=>{
            if(data!=''&&data!='error'){
                socket.emit('list member',props.selected.room);
            }
        })

    },[props.isLogin.socket])
    let count = Object.keys(props.selected.member).length;
    let rule = 2;
    Object.keys(props.selected.member).map((el,index)=>{
        if(props.selected.member[el].gmail === props.info.gmail){
            rule = props.selected.member[el].rule;
        }
    })
    let tag =  Object.keys(props.selected.member).map((key,index)=>{
        let el = props.selected.member[key];
        return <TagMember key={`tagmember${index}`} socket={props.isLogin.socket} room={props.selected.room} rulehost={rule} owner={props.info.gmail} name={el.name} gmail={el.gmail} rule={el.rule}/>;
    })
    const deleteGroup = ()=>{
        props.isLogin.socket.emit('delete group',props.selected.room);
    }
    const leaveGroup = ()=>{
        props.isLogin.socket.emit('leave group',props.selected.room);
    }
    const addMemberGroup = ()=>{

    }
    let del = rule===0? <li className="list-group-item" onClick={deleteGroup}>xóa nhóm</li>:"";
    let addmember = rule===0||rule===1?  <li className="list-group-item"  data-toggle="modal" data-target="#addmember">Thêm thành viên</li>:"";
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
            <RenameGroup socket={props.isLogin.socket} />
            <AddMember member={props.selected.member} room={props.selected.room} friends={props.friends} socket={props.isLogin.socket} />
            <div className="content-right__control">
                <ul className="list-group">
                    <li className="list-group-item" data-toggle="modal" data-target="#rename">Đổi tên nhóm</li>
                    {addmember}
                    <li className="list-group-item" href="#listfriend" data-toggle="collapse">
                        {count} Thành viên
                    </li>
                    <li className="list-group-item" style={{'padding':'0'}}>
                        <div id="listfriend" className="collapse">
                            {tag}
                        </div>
                    </li>
                    <li className="list-group-item" onClick={leaveGroup}>Rời nhóm</li>
                    {del}
                    <li className="list-group-item">xóa lịch sử trò chuyện</li>
                </ul>
            </div>
        </div>
    )
}

const mapProps = (state,props)=>{
    return{
        info:state.info,
        isLogin:state.isLogin,
        selected:state.selected,
        friends:state.friends
    }
}

const mapAction = (dispatch)=>{
    return{
        setListMember: (member)=>{
            dispatch(selectedActions.setListMember(member));
        }
    }
}

export default connect(mapProps,mapAction)(ContentRightGroup);