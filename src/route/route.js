
//views
import Login from '../pages/login/login';
import Index from '../pages/index/index';
import Register from '../pages/register/register';
import Forgetpass from '../pages/forgetpass/forgetpass';

const routes = [
    {
        path:'/login',
        exact:true,
        component: ()=> <Login />
    },
    {
        path:'/register',
        exact:true,
        component: ()=><Register/>
    },
    {
        path:'/forget',
        exact:true,
        component: ()=><Forgetpass/>
    },
    {
        path:'/',
        exact:false,
        component:()=> <Index />
    }
]

export default routes;