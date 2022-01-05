import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import './forgetpass.scss';
import avatar from './../../accsets/img/logo-app.png';
import $ from 'jquery';
import {Post} from './../../helper/axios';

//components
import AlertError from './../../components/alerterror';
import AlertSuccess from './../../components/alertsuccess';
import Loader from './../../components/loader/loader';

const Forgetpass = (props) => {
        const [error,setError]= useState(0);
        const [wait,setWait]= useState(false);
        const [message,setMessage]= useState('');
        const [success,setSuccess]= useState(0);
        const [cookie,setCookies,removeCookie] = useCookies(['chat_session']);

        const history = useHistory();
        const change_form = ()=>{
            $('.form2').toggle()
            $('.form1').toggle()
            setError(0);
            setSuccess(0);
        }
        const btn_send = (e)=>{
            e.preventDefault();
            let gmail = $('input#gmail').val();
            let password = $('input#pass').val();
            let repass = $('input#repass').val();
            if(gmail.search(/@/)===-1){
                setError(1);
                setMessage('Gmail không hợp lệ');
                return;
            }
            if(password != repass){
                setError(1);
                setMessage('Mật khẩu nhập lại không giống');
                return;               
            }
            setWait(true);
            Post('/forget',{gmail,password})
                .then(res=>{
                    setWait(false);
                    switch(res.status){
                        case 200:
                            setCookies('chat_session',res.data.data);
                            change_form();
                            break;
                        case 204:
                            setError(1);
                            setMessage('Tài khoản không tồn tại');
                            break;             
                        case 209:
                            setError(1);
                            setMessage(res.data.data);
                            break;
                    }
                })
                .catch(err=>{
                    setWait(false);
                    if(err.status === 400){
                        setError(1);
                        setMessage('Kiểm tra lại dữ liệu gửi');
                    }
                    if(err.status === 500){
                        setError(1);
                        setMessage('Server Error');    
                    }
                })
        }
        const btn_accept = (e)=>{
            e.preventDefault();
            let code = $('input#code').val();
            if(code === ''){
                setError(1);
                setMessage('không được để trống');      
                return;                        
            }
            setWait(true);
            Post('/accept',{code},{'chat_session':cookie.chat_session})
                .then(res=>{
                    setWait(false);
                    switch(res.status){
                        case 200:
                            setError(0);
                            setMessage('Đổi mật khẩu thành công');  
                            setSuccess(1);
                            removeCookie('chat_session');
                            change_form();
                            break;
                        case 204:
                            setError(1);
                            setMessage('Lỗi dữ liệu vui lòng thực hiện lại');  
                            break;
                        case 209:
                            setError(1);
                            setMessage(res.data.data);
                            break;
                    }                    
                })
                .catch(err=>{  
                    setWait(false);               
                    setError(1);
                    setMessage('lỗi server');        
                    console.log('accept err:',err)
                }) 
        }
        return (
            <div className="container">
            <Loader turnon={wait}/>
            <div className="row">
                <div className="forget col-lg-6">
                    <div className="logo"><img src={avatar} alt=""/></div>
                    <AlertError error={error}  message={message}/>
                    <AlertSuccess success={success} message={message} />
                    <form id="login" className="form">
                        <div className="form1">
                            <div className="form-group form-style">
                                <input type="text" placeholder=" " className="form-control" id="gmail" required />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="form-group form-style">
                                <input type="password" placeholder=" " className="form-control" id="pass" required />
                                <label htmlFor="password">Mật khẩu mới</label>
                            </div>
                            <div className="form-group form-style">
                                <input type="password" placeholder=" " className="form-control" id="repass" required />
                                <label htmlFor="password">Nhập lại mật khẩu</label>
                            </div>
                            <button type="submit" className="btn btn-primary w-100" onClick={btn_send} >Xác nhận</button>
                        </div>
                        <div className="form2">
                                <i className="fas fa-arrow-left back-ward" onClick={change_form}></i>
                                <div className="form-group form-style">
                                    <input type="text" placeholder=" " className="form-control" id="code" required />
                                    <label htmlFor="repassword">Nhập mã xác nhận</label>
                                </div>
                                <button type="submit" className="btn btn-success w-100 mt-1" onClick={btn_accept}>Xác nhận</button>                                
                        </div>
                        <div className="control">
                            <Link to="/login">đăng nhập</Link>
                            <Link to="/register">đăng ký</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Forgetpass;
