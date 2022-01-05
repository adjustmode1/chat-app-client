import React from 'react';
import avt from './../../accsets/img/avt.png';
import Rule from './rule';
import Control from './controlgroup';
const TagMember = (props) => {
    let contl = (props.rulehost !==2 && props.owner != props.gmail && props.rule !=0)? <Control socket={props.socket} room={props.room} gmail={props.gmail} rulehost={props.rulehost} rule={props.rule}/>:"";
    return (
        <div className="tag-member">
            <div className="left">
                <img src={avt} className="rounded-circle"/>
                <div className="text">
                    <div className="name">{props.name}</div>
                    <Rule rule={props.rule}/>
                </div>
            </div>
            {contl}
        </div>
    )
}

export default TagMember;
