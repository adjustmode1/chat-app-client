import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import './login.scss';
import avatar from './../../accsets/img/logo-app.png';
import {Post} from './../../helper/axios';
import {connect} from 'react-redux';
import $ from 'jquery';
import io from 'socket.io-client';
//components
import AlertError from './../../components/alerterror';
import AlertSuccess from './../../components/alertsuccess';
import Loader from './../../components/loader/loader';
import * as actions from './../../actions/login';
import * as infoAction from './../../actions/info';
const Login = (props) => {
        const [loginError,setLoginError]= useState(0);
        const [success,setSuccess]= useState(0);
        const [wait,setWait]= useState(false);

        const [message,setMessage]= useState('');
        const [cookie,setCookie] = useCookies(['chat_token']);

        const history = useHistory();
        useEffect(()=>{
            if(history.location.state){
                const state = history.location.state;
                if(state.status === 200){
                    setLoginError(0);
                    setMessage(state.message);
                    setSuccess(1);
                }else{
                    setSuccess(0);
                    setMessage(state.message);
                    setLoginError(1);                    
                }
            }
            // let url = `/login`;
            // let config = {
            //     'chat_token':cookie.chat_token||localStorage.getItem('chat_token')||''
            // }
            // Post(url,{},config)
            //     .then(res=>{
            //         if(res.status === 200){
            //             setCookie('chat_token',config.chat_token);
            //             localStorage.setItem('chat_token',config.chat_token);
            //             props.Login(cookie.chat_token);
            //             history.push('/messages');
            //         }
            //     }) 
            return ()=>{
                
            }
        },[]);
        const login_btn = (e)=>{
            e.preventDefault();
            let gmailInp = $('input#gmail').val();
            let passwordInp = $('input#password').val();
            let url = `/login`;
            let data = {
                gmail:gmailInp,
                password:passwordInp
            }
            if(gmailInp === '' || passwordInp === ''){
                setSuccess(0);
                setLoginError(1);
                setMessage('vui lòng đừng bỏ trống');
                return;
            }            
            if(gmailInp.search(/@/) === -1){
                setSuccess(0);
                setLoginError(1);
                setMessage('Gmail không hợp lệ');
            }else{
                setWait(true)
                Post(url,data)
                .then(res=>{
                    if(res.status === 200){
                        localStorage.setItem('chat_token',res.data.code);
                        setCookie('chat_token',res.data.code);
                        props.updateInfo(res.data.data);
                        props.Login(res.data.code);
                        history.push('/messages');
                    }else{
                        setLoginError(1);
                        setMessage('Tên tài khoản hoặc mật khẩu không đúng');
                    }
                    setWait(false)  
                })
                .catch(err=>{
                    setWait(false)  
                    setSuccess(0);
                    setLoginError(1);
                    if(err.status === 400){
                        setLoginError(1);
                        setMessage('Dữ liệu không hợp lệ');                            
                    }else{
                        setLoginError(1);
                        setMessage('Lỗi server');                    
                        console.log(err)
                    }

                })              
            }
        }
        return (
            <div className="container">
            <div className="row w-100">
                <Loader turnon={wait} />
                <div className="login col-lg-6">
                    <div className="logo"><img src={avatar} alt=""/></div>
                    <AlertError error={loginError} message={message}/>
                    <AlertSuccess success={success} message={message}/>
                    <form id="login" className="form">
                        <div className="form-group form-style">
                            <input type="text" placeholder=" " className="form-control" name="emailInp" id="gmail" required />
                            <label htmlFor="email">Gmail</label>
                        </div>
                        <div className="form-group form-style">
                            <input type="password" placeholder=" " className="form-control" name="passwordInp" id="password" required />
                            <label htmlFor="password">Mật khẩu</label>
                        </div>
                        <button type="submit" className="btn btn-primary w-100" onClick={login_btn}>Đăng nhập</button>
                        <button type="submit" className="btn btn-success w-100 mt-1" onClick={()=>{history.push('/register')}}>Đăng ký</button>
                        <div className="forget-pass w-100">
                            <Link to="/forget">Quên mật khẩu</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

const mapProps = (state,props)=>{
    return {
        isLogin:state.isLogin
    }
}

const mapAction = (dispatch) =>{
    return {
        Login: (token)=>{
            dispatch(actions.Loggin(token));
        },
        updateInfo: (info)=>{
            dispatch(infoAction.updateInfo(info))
        }
    }
}

export default connect(mapProps,mapAction)(Login);
