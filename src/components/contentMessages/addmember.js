import React,{useEffect, useState} from 'react';
import avt from './../../accsets/img/avt.png';
// import './displaygroup.scss';
import $ from 'jquery';
import AlertError from '../alerterror';
const AddMember = (props) => {
    const [friend,setFriend] = useState([]);
    const [search,setSearch] = useState('');
    const [error,setError] = useState(0);
    const [message,setMessage] = useState("");
    useEffect(()=>{
        if(search===''){
            props.friends.map(el=>{
                let li = [];
                li.push(el);
                setFriend(li);
            })
        }else{
            props.friends.map(el=>{
                let li = [];
                if(el.name.trim().search(search)!=-1){
                    li.push(el);
                }
                setFriend(li);
            })
        }
    },[search]);
    const inpSearch = (e)=>{
        setSearch(e.target.value);
    }
    const addmember = (gmail)=>{
        props.socket.emit('add member',{gmail,room:props.room})
        console.log('đã gửi')
    }
    let list = friend.map((el,index)=>{
        let control = props.member[el.gmail]? <div className='alert alert-success'>Đã có</div>:<div className='btn btn-success' onClick={()=>{
            addmember(el.gmail);
        }}>Thêm</div>;
        return <li key={`selectaddgroup${index}`} className="list-group-item tag-friend-item" >
                        <div className="tag-friend">
                            <img src={avt} alt="" className="rounded-circle"/>
                            <span>{el.name}</span>
                        </div>
                        {control}
                </li>
    })
    const clear = ()=>{
        setError(0);
        setMessage('');
        setSearch('');
        $('input#namegroup').val('');
    }
    return (
        <div className="modal" id="addmember">
            <div className="modal-dialog">
                <div className="modal-content">
            
                {/* <!-- Modal Header --> */}
                <div className="modal-header">
                    <h4 className="modal-title">Thêm thành viên</h4>
                    <button type="button" className="close" data-dismiss="modal" onClick={clear}>&times;</button>
                </div>
            
                {/* <!-- Modal body --> */}
                <div className="modal-body" style={{'textAlign': 'left'}}>
                    <AlertError error={error} message={message}/>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"><i className="fas fa-search"></i></span>
                        </div>
                        <input type="text" className="form-control" placeholder="nhập tên" aria-label="" aria-describedby="basic-addon1" name="search" onChange={inpSearch}/>
                    </div>
                    <div className="list-friend">
                        <ul className="list-group">
                            {list}
                        </ul>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default AddMember;
