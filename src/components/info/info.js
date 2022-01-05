import React,{useState,useEffect} from 'react';
import avt from './../../accsets/img/avt.png';
import './info.scss';
import $ from 'jquery';
import AlertError from '../alerterror';
const Info = (props) => {
    const [error,setError]= useState(0);
    const [messageError,setMessageError]= useState('');
    useEffect(() => {
        $('input[name=name]').val(props.info.name);
        $('input[name=address]').val(props.info.address);
        $('input[name=phone_number]').val(props.info.phone_number);
        $('input[name=birthday]').val(props.info.birthday);
        if(props.info.sex){
            $('input#nam').attr('checked',true)
            $('input#nu').attr('checked',false)
        }else{
            $('input#nu').attr('checked',true)
            $('input#nam').attr('checked',false)
        }
    }, [])
    const change=()=>{
        let name = $('input[name=name]').val();
        let address = $('input[name=address]').val();
        let phone_number = $('input[name=phone_number]').val();
        let birthday = $('input[name=birthday]').val();
        let sex = $('input[name=sex]:checked')[0].id==='nam';
        if(name === '' ||birthday === '' ||address === '' ||phone_number === '' ){
            setError(1);
            setMessageError('vui lòng đừng bỏ trống');
            return;
        }
        if(name.search(/\d/g) !== -1){
            setError(1);
            setMessageError('tên định dạng sai');      
            return;          
        }                   
        let old = (new Date().getFullYear() - new Date(birthday).getFullYear());
        if( old < 10){
            setError(1);
            setMessageError('tuổi không hợp lệ phải hơn 10 tuổi');
            return;                
        }
        if(phone_number.search(/^0\d{9,}/g) === -1 || (phone_number.length < 10 || phone_number.length > 15)){
            setError(1);
            setMessageError('định dạng số điện thoại sai');      
            return;          
        }
        props.socket.emit('update info',{
            name,
            birthday,
            address,
            phone_number,
            sex
        });
    }
    return (
        <div className="modal" id="infor" >
            <div className="modal-dialog">
                <div className="modal-content">
                {/* <!-- Modal Header --> */}
                <div className="modal-header">
                    <h4 className="modal-title">Cập nhật thông tin</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
            
                {/* <!-- Modal body --> */}
                <div className="modal-body">
                    <div className="modal-body__infor">
                    <AlertError error={error} message={messageError}/>
                        <div className="head">
                            <img src={avt} className="rounded-circle"/>
                            <div className="name">
                                <span>{props.info.name}</span>
                            </div>
                        </div>
                        <form>
                            <div className="form-group">
                                <label htmlFor="username">Username:</label>
                                <input type="text" className="form-control" placeholder="Username" name="name"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="username">Địa chỉ:</label>
                                <input type="text" className="form-control" placeholder="Username" name="address" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="username">Số điện thoại:</label>
                                <input type="text" className="form-control" placeholder="Username" name="phone_number"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="birdthday">Ngày Sinh:</label>
                                <input type="date" className="form-control" name="birthday" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="birdth-day">Giới Tính:</label>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" className="custom-control-input" id="nam" name="sex" />
                                    <label className="custom-control-label" htmlFor="nam" >Nam</label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" className="custom-control-input" id="nu" name="sex"/>
                                    <label className="custom-control-label" htmlFor="nu">Nữ</label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            
                {/* <!-- Modal footer --> */}
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={change}>Xác nhận</button>
                </div>
            
                </div>
            </div>
        </div>
    )
}

export default Info;