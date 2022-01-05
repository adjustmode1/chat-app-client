import './index.scss';
import avt from './../../accsets/img/avt.png';
import React,{useEffect,useState} from 'react';
import {connect} from 'react-redux';
import {Route,Link,Switch,useHistory,useRouteMatch} from 'react-router-dom';
import { useCookies,Cookies} from 'react-cookie';

//constraint
import * as actions from './../../actions/login';
import * as friendsAction from './../../actions/friends';
import * as groupsAction from './../../actions/groups';
import * as messagesAction from './../../actions/texting';
import * as acceptAction from './../../actions/accept';
import * as requestAction from './../../actions/request';
import * as textingAction from './../../actions/texting';
import * as selectedAction from './../../actions/selected';
import * as messagesActions from './../../actions/messages';
import * as infoAction from './../../actions/info';

//components
import Info from './../../components/info/info';

//pages
import DisplayMessages from './../../components/displayMessages/displaymessages';
import ContentMessages from './../../components/contentMessages/contentMessages';
import ContentMessagesF from './../../components/contentMessages/contentMessagesF';
import ContentMessagesG from './../../components/contentMessages/contentMessagesG';
import ContentMessagesMg from './../../components/contentMessages/contentMessagesMg';
import DisplayListFriends from './../../components/displayListFriends/displayListFriends';
import DisplayGroups from './../../components/displayGroups/displayGroups';
const PageNull = ()=>{
    return <div></div>
}
const Index = (props) => {
    let history = useHistory();
    const [socket,setSocket] = useState(props.isLogin.socket);
    let [cookie,setCooke,removeCookie] = useCookies(['chat_token']);
    useEffect(()=>{
        if(!props.isLogin.state){
            history.push('/login')
        }
        if(socket){
            socket.emit('hello',props.info.gmail);
            socket.emit('list message');
            socket.emit('list friend');
            socket.emit('list request friend');
            socket.emit('list accept friend');
            socket.emit('list group');
        }
        return ()=>{
            localStorage.removeItem('messages');
            localStorage.removeItem('info');
        }
    },[])  
    useEffect(() => {
        if(socket){
            socket.on('no auth',(data)=>{
                history.push({
                    pathname:'/login',
                    state:{
                        message:'Vui lòng đăng nhập lại',
                        status:400
                    }
                });
            })   
            socket.on('disconnect',data=>{
                socket.emit('hello',props.info.gmail);
            })
            socket.on('server list message',(data)=>{
                let list = [];
                data.map((el,index)=>{
                    list.push(el);
                })
                props.listTexting(list);
            })
            socket.on('server list friend',(data)=>{
                props.listFriend(data);
            })
            socket.on('server list group',(data)=>{
                props.listGroup(data);
            });
            socket.on('server list request friend',(data)=>{
                props.setListRequest(data.result);
            })
            socket.on('server list accept friend',(data)=>{
                props.setListAccept(data.result);
            })
            socket.on('server cancel request add friend',(data)=>{
                if(data.type==="request"){
                    props.deleteRequest(data.gmail);
                }
                if(data.type==="accept"){
                    props.deleteAccept(data.gmail);
                }
            })
            socket.on('server cancel accept add friend',(data)=>{
                if(data.type==="request"){
                    props.deleteRequest(data.gmail);
                }
                if(data.type==="accept"){
                    props.deleteAccept(data.gmail);
                }
            })
            socket.on('server accept add friend',(data)=>{
                if(data.type==="request"){
                    props.deleteRequest(data.friend.owner);
                    props.addFriend(data.friend);
                }
                if(data.type==="accept"){
                    props.deleteAccept(data.friend.gmail);
                    props.addFriend(data.friend);
                }
            })
            socket.on('server request add friend',(data)=>{
                if(data.type==="request"){
                    props.addRequest(data.user);
                }
                if(data.type==="accept"){
                    props.addAccept(data.user);
                }
            })
            socket.on('server block friend',data=>{
                if(data!=""&&data!='error'){
                    props.blockFriend(data);
                }
            })
            socket.on('server unblock friend',data=>{
                if(data!=""&&data!='error'){
                    props.unBlockFriend(data);
                }
            })
            socket.on('server delete friend',data=>{
                if(data!=""&&data!='error'){
                    props.deleteFriend(data);
                    history.push('/'+history.location.pathname.split('/')[1]);
                }
            })
            props.isLogin.socket.on('server list messages',(data)=>{
                props.listMessages(data);
            })
            props.isLogin.socket.on('server send messages',data=>{
                if(data === 'error'){
                    return alert('bạn đã bị chặn');
                }else{
                    props.isLogin.socket.emit('list messages',data);
                }
            });
            props.isLogin.socket.on('server send messages group',data=>{
                if(data === 'error'){
                    return alert('bạn đã bị chặn');
                }else{
                    props.isLogin.socket.emit('list messages',data);
                }
            });
            props.isLogin.socket.on('server delete group',(data)=>{
                if(data!=""&&data!='error'){
                    props.deleteGroup(data);
                    history.push('/'+history.location.pathname.split('/')[1]);
                }
            });
            props.isLogin.socket.on('server leave group gmail',(data)=>{
                if(data!=""&&data!='error'){
                    props.deleteGroup(data);
                    history.push('/'+history.location.pathname.split('/')[1]);
                }
            })
            props.isLogin.socket.on('server main leave group',(data)=>{
                if(data!=""&&data!='error'){
                    props.deleteGroup(data);
                }
            })
            props.isLogin.socket.on('server create group',(data)=>{
                if(data!=""&&data!='error'){
                    props.isLogin.socket.emit('list group');
                    props.isLogin.socket.emit('hello',props.info.gmail);
                }
            })
            props.isLogin.socket.on('server delete all messages',(data)=>{
                if(data!=""&&data!='error'){
                    props.listMessages([]);
                    props.deleteTexting(data);
                }
            })
            props.isLogin.socket.on('server update info',data=>{
                if(data){
                    props.updateInfo(data);
                }
            })
            props.isLogin.socket.on('server add member gmail',data=>{
                props.createGroup(data);
                props.isLogin.socket.emit('hello',props.info.gmail);
            })
            props.isLogin.socket.on('server kick out group gmail',data=>{
                console.log('đã xóa')
                props.deleteGroup(data.room);
                props.isLogin.socket.emit('hello',props.info.gmail);
            })
        }
    }, [socket])
    const signOut = ()=>{
        removeCookie('chat_token');
        localStorage.removeItem('chat_token');
        props.Logout();
        history.push('/login')
    }

    const ItemLink = ({label,to,exact})=>{
        let match = useRouteMatch({
            path:to,
            exact
        });
        let cls = match? "nav-item active":"nav-item";
        return  <li className={cls}>
                    <Link className="nav-link" to={to}>{label}</Link>
                </li>
    }
    return (
        <div className="container-fluid pl-0" >
            <div className="row">
                <div className="col-lg-1 col-md-2 col-sm-12 control" style={{'paddingRight':'0px'}}>
                    <nav className="menu">
                        {/* Links  */}
                        <ul className="navbar-nav control ">
                            <li className="nav-item logo" data-toggle="modal" data-target="#infor" style={{'cursor': 'pointer'}}>
                                <img src={avt} className="rounded-circle"/>
                            </li>
                            <ItemLink label={<i className='far fa-comments'></i>} to="/messages" exact={false} />
                            <ItemLink label={<i className="far fa-address-book"></i>} to="/listfriends" exact={false} />
                            <ItemLink label={<i className="fas fa-users"></i>} to="/groups" exact={false} />
                            <li className="nav-item" style={{'cursor':'pointer','color':'#007bff'}} onClick={signOut}>
                                <span><i className="fas fa-sign-out-alt"></i></span>
                            </li>
                        </ul>
                    </nav>
                    <Info socket={props.isLogin.socket} info={props.info}/>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-12 display">
                    <Switch>
                        <Route path="/listfriends" exact={false} >
                            <DisplayListFriends socket={socket} />
                        </Route>
                        <Route path="/groups" exact={false} >
                            <DisplayGroups socket={socket} />
                        </Route>
                        <Route path="/" exact={false} >
                            <DisplayMessages socket={socket} />
                        </Route>
                    </Switch>
                </div>
                <div className="col-lg-9 col-md-8 col-sm-12 content">
                    <Switch>
                        <Route path="/messages/m/:name" exact={true} >
                            <ContentMessages socket={socket} />
                        </Route>                       
                        <Route path="/listfriends/:name" exact={true} >
                            <ContentMessagesF socket={socket} />
                        </Route>                       
                        <Route path="/groups/:name" exact={true} >
                            <ContentMessagesG socket={socket} />
                        </Route>                       
                        <Route path="/messages/g/:name" exact={true} >
                            <ContentMessagesMg socket={socket} />
                        </Route>                       
                        <Route path="" exact={true} >
                            <PageNull />
                        </Route>                        
                    </Switch>
                </div>
            </div>
        </div>
    )
}

const mapProps = (state,props)=>{
    return{
        info:state.info,
        isLogin:state.isLogin,
        groups:state.groups,
        texting:state.texting,
        request:state.request_friend,
        accept:state.accept_friend,
        selected:state.selected
    }
}

const mapAction = (dispatch) =>{
    return{
        Logout:(state)=>{
            dispatch(actions.Logout(state))
        },
        listFriend:(friends)=>{
            dispatch(friendsAction.listFriend(friends));
        },
        listGroup:(group)=>{
            dispatch(groupsAction.listGroups(group));
        },
        addListTexting:(messages)=>{
            dispatch(messagesAction.addListTexting(messages));
        },
        addTexting:(messages)=>{
            dispatch(messagesAction.addTexting(messages));
        },
        listTexting:(messages)=>{
            dispatch(messagesAction.listTexting(messages))
        },
        setListRequest:(request)=>{
            dispatch(requestAction.setRequest(request));
        },
        setListAccept:(accept)=>{
            dispatch(acceptAction.setAccept(accept));
        },
        deleteRequest:(gmail)=>{
            dispatch(requestAction.deleteRequest(gmail));
        },
        deleteAccept:(gmail)=>{
            dispatch(acceptAction.deleteAccept(gmail));
        },
        addFriend:(friend)=>{
            dispatch(friendsAction.addFriend(friend));
        },
        addAccept:(user)=>{
            dispatch(acceptAction.addAccept(user));
        },
        addRequest:(user)=>{
            dispatch(requestAction.addRequest(user));
        },
        blockFriend:(gmail)=>{
            dispatch(textingAction.updateStatusTexting(gmail,true));
            dispatch(selectedAction.updateStatusSelected(gmail,true));
            dispatch(friendsAction.updateStatusFriend(gmail,true));
        },
        unBlockFriend:(gmail)=>{
            dispatch(textingAction.updateStatusTexting(gmail,false));
            dispatch(selectedAction.updateStatusSelected(gmail,false));
            dispatch(friendsAction.updateStatusFriend(gmail,false));
        },
        deleteFriend:(gmail)=>{
            dispatch(textingAction.deleteTexting(gmail));
            dispatch(friendsAction.deleteFriend(gmail));
        },
        deleteTexting:(group)=>{
            dispatch(textingAction.deleteGroupTexting(group))
        },
        listMessages: (messages)=>{
            dispatch(messagesActions.listMessages(messages));
        },
        addMessages:(messages)=>{
            dispatch(messagesActions.addMessages(messages));
        },
        deleteGroup:(group)=>{
            dispatch(groupsAction.deleteGroup(group));
            dispatch(textingAction.deleteGroupTexting(group))
        },
        createGroup:(group)=>{
            dispatch(groupsAction.addGroup(group))
        },
        updateInfo: (info)=>{
            dispatch(infoAction.updateInfo(info))
        }
    }
}

export default connect(mapProps,mapAction)(Index);
