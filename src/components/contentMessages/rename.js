import React,{useState,useEffect} from 'react';
import $ from 'jquery';
import AlertError from '../alerterror';
import { connect } from 'react-redux';
import * as selectedActions from './../../actions/selected';
import * as textingActions from './../../actions/texting';
import * as friendsActions from './../../actions/friends';
const Rename = (props) => {
    const [error,setError] = useState(0);
    const [message,setMessage] = useState("");
    useEffect(()=>{
        if(props.socket){
            let socket = props.socket;
            socket.on('server change name friend',(data)=>{
                if(data === 1){
                    let name = $('input#nameuser').val();
                    props.changeName(props.selected.room,name);
                    clear();
                }
            })
        }
    },[props.socket])
    const changeName = ()=>{
        let name = $('input#nameuser').val();
        if(props.socket){
            let socket = props.socket;
            let gmail = props.gmail;
            if(name.trim()===''){
                setError(1);
                setMessage('Vui lòng đừng bỏ trống');
            }else{
                if(name === props.selected.name){
                    setError(1);
                    setMessage('Vui lòng chọn tên khác tên cũ');
                }else{
                    socket.emit('change name friend',{gmail,name});
                    window.$('#rename').modal("hide");
                }
            }
        }
    }
    const clear = ()=>{
        $('input#nameuser').val('');
        setError(0);
    }
    return (
        <div className="modal" id="rename">
            <div className="modal-dialog">
                <div className="modal-content">
                {/* <!-- Modal Header --> */}
                <div className="modal-header">
                    <h4 className="modal-title">Đổi tên gợi nhớ</h4>
                    <button type="button" className="close" data-dismiss="modal" onClick={clear}>&times;</button>
                </div>
            
                {/* <!-- Modal body --> */}
                <div className="modal-body" style={{'textAlign':'center'}}>
                    
                    <AlertError error={error} message={message}/>
                    <div className="text" style={{"margin":'5px 0'}}>
                        Tên gợi nhớ chỉ hiển thị với bạn
                    </div>
                    <input type="text" className="input-group" id="nameuser"/>
                </div>
            
                {/* <!-- Modal footer --> */}
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={changeName}>Xác nhận</button>
                </div>
            
                </div>
            </div>
        </div>
    )
}
const mapProps = (state) =>{
    return{
        selected: state.selected
    }
}
const mapActions = (dispatch) =>{
    return{
        changeName: (room,name) =>{
            dispatch(textingActions.updateNameTexting(room,name));
            dispatch(selectedActions.changeName(room,name));
            dispatch(friendsActions.changNameFriend(room,name));
        }
    }
}

export default connect(mapProps,mapActions)(Rename);