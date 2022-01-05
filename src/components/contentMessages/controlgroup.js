import React from 'react';
import { connect } from 'react-redux';

const Control = (props) => {
    const changeleader = ()=>{
        props.socket.emit('change leader group',{room:props.room,gmail:props.gmail});
        console.log('đã đổi trưởng nhóm')
    }

    const changedeputy = ()=>{
        props.socket.emit('change deputy group',{room:props.room,gmail:props.gmail});
        console.log('đã đổi phó nhóm')
    }

    const kickout = ()=>{
        props.socket.emit('kick out group',{room:props.room,gmail:props.gmail});
    }
    switch (props.rulehost) {
        case 0:
            if(props.rule ===1){
                return  <div className="right" >
                            <i className="fas fa-ellipsis-h dot_control"></i>
                            <ul className="list-group overflow_control">
                                <li className="list-group-item" onClick={changeleader}>Thêm trưởng nhóm</li>
                                <li className="list-group-item" onClick={kickout}>mởi ra khỏi nhóm</li>
                            </ul>
                        </div>
            }else{
                return  <div className="right" >
                            <i className="fas fa-ellipsis-h dot_control"></i>
                            <ul className="list-group overflow_control">
                                <li className="list-group-item" onClick={changeleader}>Thêm trưởng nhóm</li>
                                <li className="list-group-item" onClick={changedeputy}>Thêm phó nhóm</li>
                                <li className="list-group-item" onClick={kickout}>mởi ra khỏi nhóm</li>
                            </ul>
                        </div>
            }

        case 1:
            return  <div className="right" >
                        <i className="fas fa-ellipsis-h dot_control"></i>
                        <ul className="list-group overflow_control">
                            <li className="list-group-item" onClick={kickout}>mởi ra khỏi nhóm</li>
                        </ul>
                    </div>
        default:
            return "";
    }
}

const mapProps = (state)=>{
    return{
        info:state.info
    }
}

export default connect(mapProps,null)(Control);
