import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import './register.scss';
import avatar from './../../accsets/img/logo-app.png';
import {Post} from './../../helper/axios';
import {useCookies} from 'react-cookie';
import $ from 'jquery';
//components
import AlertError from './../../components/alerterror';
import Loader from './../../components/loader/loader';

const Register = (props) => {
        const [error,setError]= useState(0);
        const [wait,setWait]= useState(false);
        const [messageError,setMessageError]= useState('');
        const [cookie,setCookies,removeCookie] = useCookies(['chat_session']);

        const history = useHistory();
        const change_form = ()=>{
            $('.form2').toggle()
            $('.form1').toggle()
            setError(0)
        }
        const btn_register = (e)=>{
            e.preventDefault();
            let gmail = $('input#gmail').val();
            let password = $('input#pass').val();
            let name = $('input#name').val();
            let birthday = $('input#birthday').val();
            let address = $('input#address').val();
            let phone = $('input#phone').val();
            if(gmail === '' ||password === '' ||name === '' ||birthday === '' ||address === '' ||phone === '' ){
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
            if(gmail.search('@') === -1){
                setError(1);
                setMessageError('định dạng mail sai');      
                return;    
            }
            if(phone.search(/^0\d{9,}/g) === -1 || (phone.length < 10 || phone.length > 15)){
                setError(1);
                setMessageError('định dạng số điện thoại sai');      
                return;          
            }
            setWait(true);
            setError(0);
            Post('/register',{
                gmail,
                password,
                name,
                birthday,
                address,
                phone
            })
                .then(res=>{
                    setWait(false);
                    if(res.status === 200){
                        setCookies('chat_session',res.data.data);
                        change_form();  
                    }else{
                        setError(1);
                        setMessageError('Mail đã được sử dụng');       
                    }
                })
                .catch(err=>{
                    setWait(false);
                    if(err.status === 400){
                        setError(1);
                        setMessageError('Mail không hợp lệ');     
                    }else{
                        setError(1);
                        setMessageError('Server Error');                  
                    }
                })
        }
        const btn_accept = (e)=>{
            e.preventDefault();
            let code = $('input#code').val();
            if(code === ''){
                setError(1);
                setMessageError('không được để trống');      
                return;                        
            }
            setWait(true);
            Post('/accept',{code},{'chat_session':cookie.chat_session})
                .then(res=>{
                    setWait(false);
                    switch(res.status){
                        case 200:
                            removeCookie('chat_session')
                            history.push({
                                pathname:'/login',
                                state:{
                                    status:200,
                                    message:'Đăng ký thành công'
                                }
                            })
                            break;
                        case 204:
                        case 209:
                            setError(1);
                            setMessageError(res.data.data);
                            break;
                        default:
                            break;
                    }
                })
                .catch(err=>{  
                    setWait(false);              
                    setError(1);
                    setMessageError(err.data.data);        
                    console.log('accept err:',err)
                }) 

        }
        return (
            <div className="container">
                <Loader turnon={wait}/>
                <div className="row">
                    <div className="register col-lg-6">
                        <div className="logo"><img src={avatar} alt=""/></div>
                        <AlertError error={error} message={messageError}/>
                        <form id="register" className="form">
                            <div className="form1">
                                <div className="form-group form-style">
                                    <input type="text" placeholder=" " className="form-control" id='gmail' required />
                                    <label htmlFor="gmail">Gmail</label>
                                </div>
                                <div className="form-group form-style">
                                    <input type="password" placeholder=" " className="form-control" id="pass" required />
                                    <label htmlFor="password">Mật khẩu</label>
                                </div>
                                <div className="form-group form-style">
                                    <input type="text" placeholder=" " className="form-control" id="name" required />
                                    <label htmlFor="repassword">Họ và Tên</label>
                                </div>
                                <div className="form-group form-style">
                                    <input type="date" className="form-control" id="birthday"/>
                                    <label htmlFor="birth-day">Ngày Sinh</label>
                                </div>
                                <div className="form-group form-style">
                                    <input type="text" placeholder=" " className="form-control" id="address" required />
                                    <label htmlFor="repassword">Địa chỉ</label>
                                </div>
                                <div className="form-group form-style">
                                    <input type="text" placeholder=" " className="form-control" id="phone" required />
                                    <label htmlFor="repassword">Số điện thoại</label>
                                </div>
                                <button type="submit" className="btn btn-success w-100 mt-1 btn_register" onClick={btn_register}>Đăng ký</button>
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
                                <Link to="/login">Đăng nhập</Link>
                                <Link to="/forget">Quên mật khẩu</Link>
                            </div>
                        </form>
                    </div>
                </div>             
            </div>          
        )
}

export default Register;
