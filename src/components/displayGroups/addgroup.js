import React,{useEffect, useState} from 'react';
import avt from './../../accsets/img/avt.png';
import './displaygroup.scss';
import $ from 'jquery';
import AlertError from '../alerterror';
const AddGroup = (props) => {
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
    let list = friend.map((el,index)=>{
        return <li key={`selectaddgroup${index}`} className="list-group-item tag-friend-item" >
                    <input type="checkbox" name="checkfriend" id={el.gmail}/>
                    <label className="tag-friend" data-choose="radiob" htmlFor={el.gmail}>
                        <img src={avt} className="rounded-circle"/>
                        <div className="text">{el.name}</div>
                    </label>
                </li>
    })
    const createGroup = ()=>{
        let name = $('input#namegroup').val();
        let select = $('input[name=checkfriend]:checked');
        let selected = [];
        select.map(el=>{
            selected.push(select[el].id)
        })
        if(name==''){
            setError(1);
            setMessage('vui lòng nhập tên');
        }else{
            if(selected.length===0){
                setError(1);
                setMessage('vui lòng chọn thành viên');
            }else{
                console.log(selected)
                clear();
                props.socket.emit('create group',{name,friends:selected});
                window.$('#addgroup').modal("hide");
            }
        }
    }
    const clear = ()=>{
        setError(0);
        setMessage('');
        setSearch('');
        $('input#namegroup').val('');
    }
    return (
        <div className="modal" id="addgroup">
            <div className="modal-dialog">
                <div className="modal-content">
            
                {/* <!-- Modal Header --> */}
                <div className="modal-header">
                    <h4 className="modal-title">Tạo nhóm</h4>
                    <button type="button" className="close" data-dismiss="modal" onClick={clear}>&times;</button>
                </div>
            
                {/* <!-- Modal body --> */}
                <div className="modal-body" style={{'textAlign': 'left'}}>
                    <AlertError error={error} message={message}/>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"><i className="fas fa-pen"></i></span>
                        </div>
                        <input type="text" className="form-control" autoComplete="off" placeholder="Tên nhóm" id="namegroup" aria-label="NameGroup" aria-describedby="basic-addon1" />
                    </div>
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
            
                {/* <!-- Modal footer --> */}
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={createGroup}>Xác nhận</button>
                </div>
            
                </div>
            </div>
        </div>
    )
}

export default AddGroup;
