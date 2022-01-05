import React,{useState} from 'react';
import { connect } from 'react-redux';
import './displaymessages.scss';
import Selector from './selector';

const DisplayMessages = (props) => {
    const [messages,setMessages] = useState();
    let list = props.texting.map((el,index)=>{
        if(!el.isgroup){
            return <Selector key={`selectormessages${index}`} path="messages/m" gmail={el.gmail} rule={el.rule} room={el.id_group} name={el.name} isgroup={false}/> 
        }else{
            return <Selector key={`selectormessages${index}`} path="messages/g" gmail="" rule={el.rule} room={el.id_group} name={el.name} isgroup={true}/>  
        }
    })
    return (
        <div>
            <div className="header" style={{'padding':'14px 16px'}}>
                Tất cả tin nhắn
            </div>     
            <div className="list">
                {list}
            </div>
        </div>
    )
}
const mapProps = (state)=>{
    return{
        texting:state.texting,
        isLogin:state.isLogin
    }
}

export default connect(mapProps,null)(DisplayMessages);
