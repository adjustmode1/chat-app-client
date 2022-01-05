import React,{useEffect} from 'react';
import './contentMessages.scss';
import { connect } from 'react-redux';
import avt from './../../accsets/img/avt.png';
import $ from 'jquery';
import ContentRightMessage from './contentRightMessage';
import Message from './message';
import * as messagesActions from './../../actions/messages';
const DisplayContentF = (props) => {
    useEffect(()=>{
        $('.content-right').hide();
        if($('.content-left').hasClass('col-lg-9 col-md-9 col-sm-12')){
            $('.content-left').removeClass('col-lg-9 col-md-9 col-sm-12');
            $('.content-left').addClass('col-lg-12 col-md-12 col-sm-12');
        }
        props.isLogin.socket.emit('list messages',props.selected.room);
    },[props.selected.room])

    useEffect(()=>{
        let socket =props.isLogin.socket;
        console.log(props.selected);
        socket.on('server cancel messages',data=>{
            console.log(data)
            if(data!=''&&data!='error'){
                props.updateStatusMessages(data.id_mess);
            }
        })
    },[props.selected.socket])

    const getTimeMessages = (time)=>{
        let d = new Date(time);
        return (d.getHours()+1)+':'+(d.getMinutes()+1);
    }
    const getDateMessages = (time)=>{
        let d = new Date(time);
        return d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
    }
    let list = props.messages.map((el,index)=>{
        let me = el.sender===props.info.gmail;
        let name = props.selected.name;
        if(props.selected.isgroup){
            if(Object.keys(props.selected.member).length>0){
                name = props.selected.member[el.sender].name;
            }
        }
        let before = props.messages[index-1];
        let curr = el.create_at;
        let time = getTimeMessages(curr);
        if(index===0){
            return <div  key={`messages${index}`}>
                        <div className="date"><span>{getDateMessages(curr)}</span></div>
                        <Message socket={props.isLogin.socket} room={props.selected.room} me={me} data={el.content} time={time} name={name} status={el.status} id_mess={el.id_mess}/>
                    </div>
        }else{
            let day_before = new Date(before.create_at);
            let day_curr = new Date(curr);
            if(day_before.getDate()!=day_curr.getDate()){
                return <div  key={`messages${index}`}>
                    <div className="date"><span>{getDateMessages(curr)}</span></div>
                    <Message socket={props.isLogin.socket} room={props.selected.room} me={me} data={el.content} time={time} name={name} status={el.status} id_mess={el.id_mess}/>
                </div>
            }else{
                return <Message key={`messages${index}`} room={props.selected.room} socket={props.isLogin.socket} me={me} data={el.content} time={time} name={name} status={el.status} id_mess={el.id_mess}/>
            }
        }
    })
    const openInfor = ()=>{
        $('.content-right').toggle();
        $('.content-left').toggleClass('col-lg-9 col-md-9 col-sm-12');
        $('.content-left').toggleClass('col-lg-12 col-md-12 col-sm-12');
    }
    const openSearch = ()=>{
        $('div.search').toggleClass('d-flex');
    }
    const send = ()=>{
        let mess = $('#sendmessages').val();
        let emitStr ="send messages friend";
        let room = props.selected.room;
        if(props.selected.isgroup){
            emitStr = "send messages group";
            room = props.selected.room;
        }
        if(mess!=''){
            props.isLogin.socket.emit(emitStr,{'content':mess,'id_group':room,'gmail':props.selected.gmail});
            $('#sendmessages').val('');
            console.log('đã gửi')
        }
    }
    return (
        <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 content-left">
                <div className="message__header">
                    <div className="infor">
                        <img src={avt} alt="" className="rounded-circle"/>
                        <span>{props.selected.name}</span>
                    </div>
                    <div className="search ">
                        <input type="text"/>
                        <button>tìm kiếm</button>
                    </div>
                    <div className="control-info">
                        <i className="fas fa-search search-mess" onClick={openSearch}></i>
                        <i className="fas fa-door-open open-infor"  onClick={openInfor}></i>
                    </div>
                </div>
                <div className="message__content">
                    {list}
                </div>
                <div className="message__footer">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="" id="sendmessages" autoComplete="off"/>
                        <div className="input-group-append">
                            <button className="btn btn-success" type="submit" onClick={send}><i className="fas fa-paper-plane"></i></button>
                        </div>
                    </div>
                </div>
            </div>
                {/* <Route path="/messages/m/:name" exact={true}> */}
                <ContentRightMessage/>
        </div>
    )
}
const mapProps = (state)=>{
    return{
        isLogin:state.isLogin,
        selected:state.selected,
        info:state.info,
        messages:state.messages
    }
}

const mapActions = (dispatch) =>{
    return{
        updateStatusMessages:(id)=>{
            dispatch(messagesActions.updateStatusMessages(id));
        }
    }
}

export default connect(mapProps,mapActions)(DisplayContentF);