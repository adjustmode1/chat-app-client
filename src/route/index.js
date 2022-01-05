//components
// import Info from './../components/info/info';
import DisplayMessages from './../components/displayMessages/displaymessages';
import DisplayContent from '../components/contentMessages/contentMessages';
import DisplayListFriends from '../components/displayListFriends/displayListFriends';
import DisplayGroups from '../components/displayGroups/displayGroups';

const PageNull = ()=>{
    return <div></div>
}

export const display = [
    {
        path:'/listfriends',
        exact:false,
        component:()=><DisplayListFriends/>
    },
    {
        path:'/groups',
        exact:false,
        component:()=><DisplayGroups />
    },
    {
        path:'/',
        exact:false,
        component:()=><DisplayMessages />
    }
];

export const content = [
    {
        path:'/messages/:idroom',
        exact:true,
        component:()=><DisplayContent />
    },
    {
        path:'/groups/:idroom',
        exact:true,
        component:()=><DisplayContent />
    },
    {
        path:'/listfriends/:idroom',
        exact:true,
        component:()=><DisplayContent />
    },
    {
        path:'',
        exact:true,
        component:()=><PageNull/>
    }
];
