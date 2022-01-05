import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import BlackList from './blacklist';
import ListFriend from './listfriend';
import ListRequest from './listrequest';
import ListAccept from './listaccept';

const ShowList = (props) => {
    const [black,setBlack] = useState([]);
    useEffect(()=>{
        let blacklist = [];
        props.friends.map(el=>{
            if(el.rule){
                blacklist.push(el);
            }
        })
        setBlack(blacklist);
    },[props.friends])
    switch (props.status) {
        case 1:
            return <BlackList list={black}/>
        case 2:
            return <ListRequest list={props.request}/>
        case 3:
            return <ListAccept list={props.accept}/>
        default:
            return <ListFriend list={props.friends}/>
    }
}

const mapProps = (state)=>{
    return{
        friends:state.friends,
        request:state.request_friend,
        accept:state.accept_friend,
        isLogin:state.isLogin
    }
}

export default connect(mapProps,null)(ShowList);
