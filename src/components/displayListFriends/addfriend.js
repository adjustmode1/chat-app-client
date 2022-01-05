import React,{useState,useEffect} from 'react';
import $ from 'jquery';
import SelectorAddFriend from './selectorAddFriend';

const AddFriend = (props) => {
    const [rule,setRule] = useState(-1);
    const [friend,setFriend] = useState();
    useEffect(()=>{
        if(props.socket){
            let socket = props.socket;
            socket.on('server find user to add friend',(data)=>{
                if(data.rule!==-1){
                    setFriend(data.friend);
                }else{
                    setFriend({name:''})
                }
                setRule(data.rule);
            })
        }
    },[props.socket])
    const find = ()=>{
        let gmail = $('input#searchFriend').val();
        if(gmail.trim()===""){
            alert('vui lòng đừng để trống')
        }else{
            let socket = props.socket;
            socket.emit('find user to add friend',gmail);
        }
    }
    const close = ()=>{
        setRule(-1);
        $('input#searchFriend').val('');
    }
    return (
        <div className="modal" id="addfriend">
            <div className="modal-dialog">
                <div className="modal-content">
            
                {/* <!-- Modal Header --> */}
                <div className="modal-header">
                    <h4 className="modal-title">Thêm bạn</h4>
                    <button type="button" className="close" data-dismiss="modal" onClick={close} >&times;</button>
                </div>
            
                {/* <!-- Modal body --> */}
                <div className="modal-body">
                    <div className="input-group">
                        <input type="search" placeholder="gmail" id="searchFriend"  className="form-control border-0 bg-light" />
                    <div className="input-group-append">
                        <button id="find" type="button" className="btn btn-link text-primary" onClick={find}><i className="fa fa-search"></i></button>
                    </div>
                    </div>
                    <div className="result" style={{'textAlign':'left','padding':'4px 0'}}>
                        <SelectorAddFriend rule={rule} friend={friend}/>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default AddFriend;
