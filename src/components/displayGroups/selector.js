import React from 'react';
import { connect } from 'react-redux';
import avt from './../../accsets/img/avt.png';
import { useHistory } from 'react-router';
import * as action from './../../actions/selected';
const Selector = (props) => {
    const history = useHistory();
    const openMessages = ()=>{
        let selected = {
            room:props.room,
            gmail:props.gmail,
            rule:props.rule,
            name:props.name,
            member:[],
            isgroup:true
        }
        if(history.location.pathname!='/'+props.path+'/'+props.name){
            props.select(selected);
            history.push('/'+props.path+'/'+props.name);
        }
    }
    return (
        <div className="selector" onClick={openMessages}>
            <img src={avt} alt="" className="rounded-circle"/>
            <span>{props.name}</span>
        </div>  
    )
}

// const mapProps = (state,props)=>{
//     return{
//         selected:state.selected
//     }
// }

const mapAction = (dispatch)=>{
    return{
        select:(selected)=>{
            dispatch(action.select(selected))
        }
    }
}

export default connect(null,mapAction)(Selector);