import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3500';

export const Get = (url)=>{
    return axios.get(url);
}
export const Post = (url,data = {}, config = {})=>{
    return axios.post(url,data,{
        headers:config
    });
}
export const Put = (url,data)=>{
    return axios.put(url,data);
}
export const Delete = (url)=>{
    return axios.delete(url);
}
