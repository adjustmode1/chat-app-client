import React from 'react';
import { connect } from 'react-redux';
import AddGroup from './addgroup';
import Selector from './selector';

const DisplayGroups = (props) => {
    let group = props.groups.map((el,index)=>{
        return <Selector key={`selectgroup${index}`} path="groups" room={el.id_group} name={el.name} gmail="" rule={el.rule==0}/> 
        // return <Selector key={`selectgroup${index}`} path="groups" gmail="" rule={false} room={el.id_group} name={el.name}/> 
    })
    return (
        <div>
            <div className="header" style={{'padding':'14px 16px'}}>
                    Tất cả nhóm
                </div>   
 
                <div className="body">
                    <i className="fas fa-user-plus" data-toggle="modal" data-target="#addgroup"></i>
                    <AddGroup socket={props.isLogin.socket} friends={props.friends}/>
                </div>
                <div className="list">
                    {group} 
                </div>
        </div>
    )
}

const mapProps = (state)=>{
    return{
        isLogin:state.isLogin,
        groups:state.groups,
        friends:state.friends
    }
}

export default connect(mapProps,null)(DisplayGroups);